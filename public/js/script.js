const searchInput = document.getElementById('search');
const searchForm = document.getElementById('search-form');
const errorMessage = document.getElementById('error-message');
const citiesList = document.getElementById('cities-list');

let search = '';
let citiesData = [];

const UI = {
    renderingCities: (cities) => {
        cities = cities.reduce((result, city) => {
            result += `<p onclick=Cities.getCityForecast(this) data-long="${city.coordinates[0]}" 
                                data-lat="${city.coordinates[1]}" 
                                data-location="${city.name}, ${city.country}">
                                <span class="cities">${city.name}, ${city.adminCode}, ${city.country}
                                </span></p>`;
            return result;
        }, '');
        errorMessage.textContent = '';
        citiesList.innerHTML = cities;
    },

    renderingForecast(cityName, forecast) {
        citiesList.innerHTML = `<h2>${cityName}</h2>
            <div id="weather-block">
                <div id="weather">
                    <p>${forecast.summary}</p>
                    <p>Temperature: ${Math.round(forecast.temperature)}&#176;C</p>
                    <p>Probability of precipitation: ${(forecast.precip_probab * 100).toFixed(0)}%</p>
                    <p>Humidity: ${(forecast.humidity * 100).toFixed(0)}%</p>
                    <p>Wind Speed: ${Math.round(forecast.wind_speed)} km/h</p>
                </div>
                <div id="weather-icon">
                    <img src="/images/icons/${forecast.icon}.png" alt="${forecast.icon}"/>
                </div>
            </div>`;
        errorMessage.textContent = '';
        searchInput.value = '';
    },

    renderingInfo(message, namePic) {
        errorMessage.textContent = message;
        citiesList.innerHTML = `<img id="${namePic}" src="/images/${namePic}.gif" alt="${namePic}">`;
    },

    resetResults() {
        citiesList.innerHTML = '';
        errorMessage.textContent = '';
        citiesData = [];
    }
};


const Cities = {
    getCityForecast(city) {
        const name = city.getAttribute('data-location');
        const long = city.getAttribute('data-long');
        const lat = city.getAttribute('data-lat');
        fetch('/resultfor?long=' + long+'&lat='+lat).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    UI.renderingInfo(data.error, 'cloud');
                } else {
                    UI.renderingForecast(name, data);
                }
            });
        });
    },

    displayCitiesData(citiesResults, cityName, slice) {
        let cities = [...citiesResults].filter(city => city.name.match(cityName));
        if (cities.length > 5 && slice === true) cities = cities.slice(0, 5);
        if(!cities.length) {
            UI.renderingInfo('No city found', 'cloud');
        } else {
            UI.renderingCities(cities);
        }
    }
};


searchInput.addEventListener('input', () => {
    search = (searchInput.value).trim().toLowerCase().replace(/^\w/, c => c.toUpperCase());

    if (search.length === 2 || citiesData.length) {
        if(search.length === 2) {
            UI.renderingInfo('Loading...', 'sand-clock');
            fetch('/weather?address=' + search).then((res) => {
                res.json().then((data) => {
                    if (data.error) {
                        UI.renderingInfo(data.error, 'cloud');
                    } else {
                        if(search.length >= 2) {
                            citiesData = [...data.cities];
                            Cities.displayCitiesData(citiesData, search, true);
                        } else {
                            UI.resetResults();
                        }
                    }
                });
            });
        } else if (search.length > 2 && citiesData.length) {
            Cities.displayCitiesData(citiesData, search, true);
        } else {
            UI.resetResults();
        }
    } else if (search.length === 1 || !search.length) {
        UI.resetResults();
    } else {
        UI.renderingInfo('Loading...', 'sand-clock');
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const regex = new RegExp(`^${search}`);
    Cities.displayCitiesData(citiesData, regex, false);
});




