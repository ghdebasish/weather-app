const request = require('request');

const geocode = (location, callback) => {
    const mapBaseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const mapAccessKey = "pk.eyJ1IjoiZ2hkZWJhc2lzaCIsImEiOiJjbDBwcWk4YzkyMHNpM2puc3loYmtqdmN0In0.3wD73D4WBqT_IfH1mAwOuQ";
    const mapURL = mapBaseURL + encodeURIComponent(location) + ".json?limit=1&access_token=" + mapAccessKey;
    // console.log(mapURL);

    request({ url: mapURL, json: true }, (error, response) => {
        if (error) {
            return callback(null, { msg: 'There are problem with network' });
        } else if (response.body.message) {
            return callback(null, { msg: response.body.message });
        }

        if (response) {
            const data = response.body;
            if (data.features.length == 0) {
                return callback(null, { msg: "Try search with different Place" });
            }

            const mapData = data.features[0];
            return callback({ place: mapData.place_name, lat: mapData.center[1], long: mapData.center[0] }, null);
        }
    })
};

module.exports = geocode;