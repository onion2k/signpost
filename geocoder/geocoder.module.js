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

var calcDist = function(from, to) {

  var toJson = jsonfile.readFileSync('./places/'+to.placename+".json", { throws: false });

  console.log(to.placename);

  if (!toJson) {

    console.log("Not found");

    return geocoder.geocode(to.location)
      .then(function(res) {

        to.longitude = res[0].longitude;
        to.latitude = res[0].latitude;

        jsonfile.writeFile('./places/'+to.placename+'.json', to, {spaces: 2});

        return { 
          "placename": to.location,
          "distance": Math.round(geolib.convertUnit('mi', geolib.getDistance(from, to))),
          "bearing":  geolib.getBearing(from, to),
          "direction":  geolib.getCompassDirection(from, toJson).exact
        };

      })
      .catch(function(err) {
        console.log(err);
      });

  } else {

    console.log("Found");
    console.log(toJson);

    return Promise.resolve({ 
      "placename": to.location,
      "distance": Math.round(geolib.convertUnit('mi', geolib.getDistance(from, toJson))),
      "bearing":  geolib.getBearing(from, toJson),
      "direction":  geolib.getCompassDirection(from, toJson).exact
    });

  }

}

var encode = function(from, placelist){

  var arms = [];

  for (var t in placelist) {
      arms.push(calcDist(from, placelist[t]));
  }

  return Promise.all(arms).then(function(result){
    return result;
  })

}

module.exports = {
  encode: encode,
}
