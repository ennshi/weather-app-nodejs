import {CitySelector} from "./CitySelector";

export const renderCityList = (cities, forecastDOMContainer) => {
    let cityListContainer = document.createElement('div');
    cities.forEach(city => {
        const cityData = {
            long: city.coordinates[0],
            lat: city.coordinates[1],
            cityName: `${city.name}, ${city.country}`
        };
        const citySelector = CitySelector.bind(null, cityData, forecastDOMContainer);
        const cityItem = document.createElement('p');
        cityItem.innerHTML = `<span class="cities">${city.name}, ${city.adminCode}, ${city.country}</span>`;
        cityItem.addEventListener('click', citySelector);
        cityListContainer.append(cityItem);
    });
    return cityListContainer;
};
