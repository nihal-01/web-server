const request = require("request");

const geocode = (place, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoibmloYWxuIiwiYSI6ImNrcGF3bGZleTB5M3IzMW54YWdvem1nMHIifQ.OK8EcOwTvxo-b2ajYj5g4w&limit=1`;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback("Can't connect to server", undefined);
    } else if (response.body.features.length === 0) {
      callback("No places found for your search", undefined);
    } else {
      let [log, lat] = response.body.features[0].center;
      callback(undefined, {
        log,
        lat,
        placeName: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
