const req = require('request');

const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fd6ac8721e7bcc4a1a5b7804b847597e/' + encodeURI(latitude) + ',' +encodeURI(longtitude) + '?units=si';
    req({url, json: true}, (err, res) => {
        if(err){
            callback("Error to connect to darksky.net", undefined);
        } else if(res.body.error){
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {summary: res.body.daily.data[0].summary,
                temperature: res.body.currently.temperature,
                precip_probab: res.body.currently.precipProbability,
                icon: res.body.currently.icon,
                wind_speed: res.body.currently.windSpeed,
                humidity: res.body.currently.humidity
            });
        }
    });
};

module.exports = forecast;
