const geocode = require('./geocode/geocode');
const request = require('request');
const yargs = require('yargs');
const weather = require('./weather/weather');

// argv contains final parse output when we pass it through yargs
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'adress to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  }
  if (results) {
    console.log(results.address);
    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        }
        if (weatherResults) {
          console.log(JSON.stringify(weatherResults, undefined, 2));
        }
      }
    );
  }
});
