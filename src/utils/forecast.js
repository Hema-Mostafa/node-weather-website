const fetch = require('node-fetch')

const forecast = (latitude, longitude, callback) => {
    const apiKey = 'b0007116e10227142e0bdeee4d136bc0';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    let errorMessage = '';
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.cod === 404) {
                errorMessage = json.message + ' and status code:  ' + json.cod;
                callback(errorMessage, undefined);
            }
            else if (json.cod === 401) {
                errorMessage = json.message + ' and status code:  ' + json.cod;
                callback(errorMessage, undefined);
            }

            else if (json.cod === 400) {
                errorMessage = json.message + ' and status code:  ' + json.cod;
                callback(errorMessage, undefined);
            }
            else
                callback(undefined, 'The Current Temprture ' + json.main.temp + 'c');
        })
        .catch(err => {
            callback(err.message, undefined);
        })
}
module.exports = forecast