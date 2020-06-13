const ForecastService = () => {
    const fetchForecast = (city) => {
        const {cityName, lat, long} = city;
        return fetch('/resultfor?long=' + long+'&lat='+lat)
            .then((res) => (res.json()))
            .then((data) => {
                return {...data, cityName};
            }).catch((e) => {});
    };
    return { fetchForecast}
};

export default ForecastService;
