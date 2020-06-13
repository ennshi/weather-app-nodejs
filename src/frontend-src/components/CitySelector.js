import ForecastService from "../services/ForecastService";
import {renderForecast} from "./ForecastView";
export const CitySelector = async (city, forecastDOMContainer) => {
    const forecastService = ForecastService();
    try {
        const forecast = await forecastService.fetchForecast(city);
        forecastDOMContainer.innerHTML = renderForecast(forecast);
    } catch (e) {
        throw new Error(e);
    }
};
