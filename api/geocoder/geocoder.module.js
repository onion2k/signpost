var env = require('../../.env');
var NodeGeocoder = require('node-geocoder');
var geolib = require('geolib');
var jsonfile = require('jsonfile');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: env.google, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

module.exports = class geocoder {

  constructor(){
    this.geo = NodeGeocoder(options);
  }

  calcDist(from, to){

    var toJson = jsonfile.readFileSync('./cache/places/'+to.place.replace(/\W+/g, '')+".json", { throws: false });

    if (!toJson) {

      return this.geo.geocode(to.place)
        .then(function(res) {

          to.longitude = res[0].longitude;
          to.latitude = res[0].latitude;

          jsonfile.writeFile('./cache/places/'+to.place.replace(/\W+/g, '')+'.json', to, {spaces: 2});

          var response = { 
            "title": to.title,
            "placename": to.place,
            "distance": Math.round(geolib.convertUnit('mi', geolib.getDistance(from, to))),
            "bearing":  geolib.getBearing(from, to),
            "direction":  geolib.getCompassDirection(from, to).exact
          };

          return response;

        })
        .catch(function(err) {
          console.log(err);
        });

    } else {

      return Promise.resolve({ 
        "title": to.title,
        "placename": to.place,
        "distance": Math.round(geolib.convertUnit('mi', geolib.getDistance(from, toJson))),
        "bearing":  geolib.getBearing(from, toJson),
        "direction":  geolib.getCompassDirection(from, toJson).exact
      });

    }

  }

  encode(from, placelist){

    var arms = [];

    for (var t in placelist) {
        arms.push(this.calcDist(from, placelist[t]));
    }

    return Promise.all(arms).then(function(result){
      return result;
    })

  }

}
