var env = require('../.env');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending of the providers
  httpAdapter: 'https', // Default
  apiKey: env.google, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Or using Promise
geocoder.geocode('29 champs elysée paris')
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });
