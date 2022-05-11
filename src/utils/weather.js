const request = require('request');

const weatherData = (lat, long, callback) => {
    const weatherBaseURL = "http://api.weatherstack.com/";
    const weatherAccessKey = "c61ace11a373902430b2da49afa45982";
    const weatherURL = weatherBaseURL + "current?access_key=" + weatherAccessKey + "&units=m&query=" + lat + "," + long;
    // console.log(weatherURL);

    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            return callback(null, { msg: 'There are problem with network' });
        } else if (response.body.error) {
            return callback(null, { msg: response.body.error.code + " - " + response.body.error.info });
        }

        if (response) {
            return callback(response.body.current, null);
        }
    })
}

module.exports = weatherData;