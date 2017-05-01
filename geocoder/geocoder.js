var env = require('../.env');
var NodeGeocoder = require('node-geocoder');
var geolib = require('geolib');

var options = {
  provider: 'google',

  // Optional depending of the providers
  httpAdapter: 'https', // Default
  apiKey: env.google, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

// var geocoder = NodeGeocoder(options);

// // Or using Promise
// geocoder.geocode('New York, USA')
//   .then(function(res) {
//     console.log(res);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

var locations = {
  "sunderland": {
    "latitude": 54.9145215,
    "longitude": -1.3709684
  },
  "london": {
    "latitude": 51.5073509,
    "longitude": -0.1277583
  },
  "newcastle": {
    "latitude": 54.978252,
    "longitude": -1.61778
  },
  "newyork": {
    "latitude": 40.7127837,
    "longitude": -74.0059413,
  }
}

var calcDist = function(from, to) {
  console.log("From "+from+" to "+to);
  console.log("distance: "+geolib.convertUnit('mi', geolib.getDistance(locations[from], locations[to])));
  console.log("bearing: "+geolib.getBearing(locations[from], locations[to]));
  console.log("direction: "+geolib.getCompassDirection(locations[from], locations[to]).rough+" "+geolib.getCompassDirection(locations[from], locations[to]).exact);
  console.log("");
}

calcDist('sunderland', 'newcastle');
calcDist('sunderland', 'london');
calcDist('sunderland', 'newyork');