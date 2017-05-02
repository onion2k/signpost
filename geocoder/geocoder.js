var env = require('../.env');
var NodeGeocoder = require('node-geocoder');
var geolib = require('geolib');
var jsonfile = require('jsonfile');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: env.google, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

var signpost = require('./signpost.json');
var arms = [];

var calcDist = function(from, to) {

  var toJson = jsonfile.readFileSync('./places/'+to.placename+".json", { throws: false });

  if (!toJson) {

    geocoder.geocode(to.location)
      .then(function(res) {

        to.longitude = res[0].longitude;
        to.latitude = res[0].latitude;

        jsonfile.writeFile('./places/'+to.placename+'.json', to, {spaces: 2});

        arms.push({ 
          "placename": to.location,
          "distance": Math.round(geolib.convertUnit('mi', geolib.getDistance(from, to))),
          "bearing":  geolib.getBearing(from, to),
          "direction":  geolib.getCompassDirection(from, toJson).exact
        });

      })
      .catch(function(err) {
        console.log(err);
      });

  } else {

    arms.push({ 
      "placename": to.location,
      "distance": Math.round(geolib.convertUnit('mi', geolib.getDistance(from, toJson))),
      "bearing":  geolib.getBearing(from, toJson),
      "direction":  geolib.getCompassDirection(from, toJson).exact
    });

  }

}

for (var t in signpost.to) {
    calcDist(signpost.from, signpost.to[t]);
}

jsonfile.writeFile('../src/arms.json', arms, {spaces: 2});
