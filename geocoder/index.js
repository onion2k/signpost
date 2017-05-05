var geo = require('./geocoder.module.js');


var from = {
    "placename": "sunderland",
    "location": "Sunderland, UK",
    "latitude": 54.9145215,
    "longitude": -1.3709684
}
var places = [
    {
      "placename": "london",
      "location": "London, UK"
    },
    {
      "placename": "newcastle",
      "location": "Newcastle Upon Tyne, UK"
    },
    {
      "placename": "newyork",
      "location": "New York, USA"
    },
    {
      "placename": "paris",
      "location": "Paris, France"
    },
    {
      "placename": "rome",
      "location": "Rome, Italy"
    },
    {
      "placename": "bournemouth",
      "location": "Bournemouth, UK"
    }
];

geo.encode(from, places).then((result) => {
  console.log(result);
});