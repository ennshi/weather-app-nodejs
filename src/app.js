const path = require('path');
const express = require('express');


const port = process.env.PORT | 3000;
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);

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
        title: 'help'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        title: 'hello'
    });
});


app.listen(port, () => console.log(`The server is up on the port ${port}`));


