const searchInput = document.getElementById('search');
const searchForm = document.getElementById('search-form');
const errorMessage = document.getElementById('error-message');
const citiesList = document.getElementById('cities-list');

let search = '';
let citiesData = [];

const selectCity = (city) => {
    const name = city.getAttribute('data-location');
    const long = city.getAttribute('data-long');
    const lat = city.getAttribute('data-lat');
    fetch('/resultfor?long=' + long+'&lat='+lat).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                citiesList.innerHTML = `<h4>${name}</h4>
                <p>${data.summary}</p>
                <p>Temperature: ${data.temperature}&#176;C</p>
                <p>Probability of precipitation: ${data.precip_probab}%</p>
                <p>Humidity: ${data.humidity*100}%</p>
                <p>Wind Speed: ${data.wind_speed} km/h</p>
                <img src="/images/icons/${data.icon}.png" alt="${data.icon}"/>`;
            }
        });
    });
};

searchInput.addEventListener('input', () => {
    search = searchInput.value;
    fetch('/weather?address='+search).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                errorMessage.textContent = '';
                citiesData = [...data.cities];
                let cities = data.cities;
                if(cities.length > 10) cities = cities.slice(0, 10);
                cities = cities.reduce((result, city) => {
                    result += `<p onclick=selectCity(this) data-long="${city.coordinates[0]}" 
                                data-lat="${city.coordinates[1]}" 
                                data-location="${city.name}, ${city.country}">
                                ${city.name}, ${city.adminCode}, ${city.country}</p>`;
                return result}, '');
                citiesList.innerHTML = cities;
            }
        });
    });
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const regex = new RegExp(`^${search}$`);
    let cities = citiesData.filter(city => city.name.match(regex));
    cities = cities.reduce((result, city) => {
        result += `<p onclick=selectCity(this) data-long="${city.coordinates[0]}" 
                      data-lat="${city.coordinates[1]}" 
                      data-location="${city.name}, ${city.adminCode}, ${city.country}">
                      ${city.name}, ${city.adminCode}, ${city.country}</p>`;
        return result}, '');
    if(!cities.length) errorMessage.textContent = 'No city found';
    citiesList.innerHTML = cities;
});




