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
                citiesList.innerHTML = '<img src="/images/error_cloud.gif" alt="clouds">';
            } else {
                citiesList.innerHTML = `<h2>${name}</h2>
                <div id="weather-block">
                <div id="weather">
                <p>${data.summary}</p>
                <p>Temperature: ${Math.round(data.temperature)}&#176;C</p>
                <p>Probability of precipitation: ${(data.precip_probab*100).toFixed(0)}%</p>
                <p>Humidity: ${(data.humidity*100).toFixed(0)}%</p>
                <p>Wind Speed: ${Math.round(data.wind_speed)} km/h</p>
                </div>
                <div id="weather-icon">
                <img src="/images/icons/${data.icon}.png" alt="${data.icon}"/>
                </div>
                </div>`;
                errorMessage.textContent = '';
                searchInput.value = '';
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
                citiesList.innerHTML = '<img src="/images/error_cloud.gif" alt="clouds">';
            } else {
                errorMessage.textContent = '';
                citiesData = [...data.cities];
                let cities = data.cities;
                if(cities.length > 10) cities = cities.slice(0, 10);
                cities = cities.reduce((result, city) => {
                    result += `<p onclick=selectCity(this) data-long="${city.coordinates[0]}" 
                                data-lat="${city.coordinates[1]}" 
                                data-location="${city.name}, ${city.country}">
                                <span class="cities">${city.name}, ${city.adminCode}, ${city.country}
                                </span></p>`;
                return result}, '');
                citiesList.innerHTML = cities;
            }
        });
    });
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityName = search.toLowerCase().replace(/^\w/, c => c.toUpperCase());
    const regex = new RegExp(`^${cityName}$`);
    let cities = citiesData.filter(city => city.name.match(regex));
    cities = cities.reduce((result, city) => {
        result += `<p onclick=selectCity(this) data-long="${city.coordinates[0]}" 
                      data-lat="${city.coordinates[1]}" 
                      data-location="${city.name}, ${city.country}">
                      <span class="cities">${city.name}, ${city.adminCode}, ${city.country}
                      </span></p>`;
        return result}, '');
    if(!cities.length) {
        errorMessage.textContent = 'No city found';
        citiesList.innerHTML = '<img src="/images/error_cloud.gif" alt="clouds">';
    };
    citiesList.innerHTML = cities;
    errorMessage.textContent = '';
});




