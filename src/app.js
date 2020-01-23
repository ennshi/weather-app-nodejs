const path = require('path');
const express = require('express');
const hbs = require('hbs');


const port = process.env.PORT | 3000;
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
    res.send({
        title: 'hello'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page doesn\'t exist'
    });
});


app.listen(port, () => console.log(`The server is up on the port ${port}`));


