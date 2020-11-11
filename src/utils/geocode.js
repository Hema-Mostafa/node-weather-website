const fetch = require('node-fetch')

const geocode = (address, callback) => {

    const publicKey = 'pk.eyJ1IjoiaWJyYWhpbS1tb3N0YWZhIiwiYSI6ImNrZ2tvd3k4bzBqcDYycGxsc3JqejZqYngifQ.TOtT1uMYX0rx-kRZQWUWdA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${publicKey}&limit=1`;

    let errorMessage = '';

    fetch(url)
        .then(res => {
            if (res.status === 404) {
                errorMessage = res.statusText + ' ' + res.status + ' Error';
                callback(errorMessage, undefined)
            }
            else if (res.status === 401) {
                errorMessage = res.statusText + ' ' + res.status + ' Error';
                callback(errorMessage, undefined);
            }
            else if (res.status === 400) {
                errorMessage = res.statusText + ' ' + res.status + ' Error (Bad Request)';
                callback(errorMessage, undefined);
            }
            else
                return res.json()
        })
        .then(json => {
            data = {
                longitude: json.features[0].center[0],
                latitude: json.features[0].center[1],
                location: json.features[0].place_name
            }
            callback(undefined, data);
        })
        .catch(error => {
            if (errorMessage === '')
                callback(error.message, undefined);
        })
}

module.exports = geocode