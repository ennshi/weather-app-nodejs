const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const citiesFinder = require('./utils/allthecities');

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Now'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Info'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ error: 'Please provide a location' });
    }
    citiesFinder(req.query.address, (err, citiesList) => {
        if(err) {
            return res.send({error: err});
        }
        res.send({cities: citiesList});
    })
});

app.get('/resultfor', (req, res) => {
    if(!req.query.long || !req.query.lat) {
        return res.send({ error: 'The coordinates are not correct' });
    }
    forecast(req.query.long, req.query.lat, (err, {summary, icon, temperature, precip_probab, wind_speed, humidity}={}) => {
        if (err) {
            return res.send({ error: err });
        }
         res.send({summary,
                        icon,
                        temperature,
                        precip_probab,
                        wind_speed,
                        humidity
        });
    });

});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page doesn\'t exist'
    });
});


app.listen(port, () => console.log(`The server is up on the port ${port}`));


