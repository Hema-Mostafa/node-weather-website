const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

// Setup handlebars engin and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ibrahim Mostafa'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query['address']

    if (!address)
        return res.send({
            error: 'You must provide an address!'
        })

    geocode(address, (error, data) => {
        if (error)
            return res.send({
                error
            })
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error)
                return res.send({
                    error
                })

            res.send({
                forecast: forecastData,
                location: data.location,
                address

            })
        })

    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ibrrahim Mostafa',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ibrahim Mostafa',
        message: 'Not Support Help yet !!',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ibrahim Mostafa',
        errorMessage: 'No Help Artical Found !'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ibrahim Mostafa',
        errorMessage: 'Page Not found'
    })
})

app.listen(port, () => {
    console.log('Server is Listing to port' + port);

})