const yargs = require('yargs');
const axios = require('axios');

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
var encodedAdress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}`;

axios.get(geocodeURL).then((response)=>{
  if (response.data.status ==='ZERO_RESULTS'){
    throw new Error('unable to find the address.');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.forecast.io/forecast/bd1590ed39cbd9e4c8d000060aa82ba4/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`temp: ${temperature} real temp: ${apparentTemperature}`);
}).catch((e)=>{
  if (e.code==='ENOTFOUND'){
    console.log('unable to connect');
  }
  else{
    console.log(e.message);
  }
  console.log(e)
});
