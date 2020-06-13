export const renderForecast = (forecastData) => {
    return `<h2>${forecastData.cityName}</h2>
            <div id="weather-block">
                <div id="weather">
                    <p>${forecastData.summary}</p>
                    <p>Temperature: ${Math.round(forecastData.temperature)}&#176;C</p>
                    <p>Probability of precipitation: ${(forecastData.precip_probab * 100).toFixed(0)}%</p>
                    <p>Humidity: ${(forecastData.humidity * 100).toFixed(0)}%</p>
                    <p>Wind Speed: ${Math.round(forecastData.wind_speed)} km/h</p>
                </div>
                <div id="weather-icon">
                    <img src="/images/icons/${forecastData.icon}.png" alt="${forecastData.icon}"/>
                </div>
            </div>`;
};
