const cities = require('all-the-cities');
const { getName } = require('country-list');

const citiesFinder = (cityName, callback) => {
    let result = cities.filter(city => city.name.match(cityName));
    if(result.length){
        result = result.map(city => ( { name: city.name,
                country: getName(city.country),
                adminCode: city.adminCode,
                coordinates: city.loc.coordinates
        }));
        callback(undefined, result);
    } else {
        callback('No city found', null);
    }
};

module.exports = citiesFinder;
