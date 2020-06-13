const CityListService = () => {
    const cityListSorter = (cities, search) => {
        const cityNameExact = new RegExp(`^${search}$`);
        const exactMatch = cities.filter(city => city.name.match(cityNameExact));
        const cityNameBegin = new RegExp(`^${search}([a-z]| |-)+`);
        const beginMatch = cities.filter(city => city.name.match(cityNameBegin));
        return [...exactMatch, ...beginMatch];
    };

    const showTopCityList = (cities, search) => {
        return cityListSorter(cities, search).slice(0, 5);
    };

    const showWholeCityList = (cities, search) => {
        return cityListSorter(cities, search);
    };
    const fetchCityList = (search, signal) => {
        return fetch('/weather?address=' + search, {signal})
            .then((res) => (res.json()))
            .then((data) => {
                if(data.error) {
                    throw new Error(data.error);
                }
                return data.cities;
            });
    };

    return { fetchCityList, showTopCityList, showWholeCityList };
};
export default CityListService;
