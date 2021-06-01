const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=737afb9072b7127af44336db2c8f9822&query=${latitude}, ${longitude}`;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback("Can't connect to server", undefined);
    } else if (response.body.success === false) {
      callback(response.body.error.info, undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } =
        response.body.current;
      callback(undefined, {
        temperature,
        feelslike,
        weather_descriptions,
      });
    }
  });
};

module.exports = forcast;
