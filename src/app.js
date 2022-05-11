const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

const staticPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        header: 'Hello World',
        Owner: 'Debasish Ghosh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        header: 'Help Page',
        Owner: 'Debasish Ghosh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        header: 'About Us',
        Owner: 'Debasish Ghosh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address)
        return res.send({
            error: 'Please provide the address in query string'
        });

    geocode(req.query.address, (geoData, geoError) => {
        if (geoError)
            return res.send({
                error: geoError.msg
            });

        if (geoData) {
            weather(geoData.lat, geoData.long, (weatherData, weatherError) => {
                if (weatherError)
                    return res.send({
                        error: weatherError.msg
                    });

                if (weatherData)
                    return res.send({
                        forecast: `This is currently ${weatherData.temperature} degrees out. There is a ${weatherData.precip}% chance of rain and humidity is ${weatherData.humidity}.`,
                        location: geoData.place,
                        address: req.query.address
                    });
            });
        }
    });


})

app.listen(port, () => {
    console.log('App is running on port: ' + port);
})