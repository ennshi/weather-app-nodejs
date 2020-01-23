const req = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) +'s.json?access_token=pk.eyJ1IjoiZW5uc2hpIiwiYSI6ImNrNW8yang2YzBjbHEzb21wdTZ4ZzllYW8ifQ.RpEmZRg6HNkC_3lS47apiQ&limit=1';
    req({url, json: true}, (err, res) => {
        if(err){
            callback("Error to connect to mapbox.com", undefined);
        } else if(!res.body.features.length){
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, { longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
