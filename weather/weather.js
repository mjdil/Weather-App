const request = require('request');

var getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.forecast.io/forecast/bd1590ed39cbd9e4c8d000060aa82ba4/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('error occured');
      } else if (response.statusCode === 400) {
        callback('cant get eror');
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};

module.exports.getWeather = getWeather;
