var express = require('express');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var geocoder = require('../geocoder/geocoder.module.js');

var geo = new geocoder();

var from = {
    "placename": "sunderland",
    "location": "Sunderland, UK",
    "latitude": 54.9145215,
    "longitude": -1.3709684
}

app.use(express.static('public'));

io.on('connection', function (socket) {
  socket.on('geocode', function (data) {
    console.log(data);
    geo.encode(from, [{ 'title': data.title, 'place': data.place }]).then((result) => {
      if (data.hasOwnProperty('index')) {
        result[0].index = data.index;
      } else {
        result[0].index = -1;
      }
      console.log(result);
      socket.emit('geocode', result);
    });
  });
});

server.listen(8081);
