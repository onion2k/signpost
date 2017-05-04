var express = require('express');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var geocoder = require('../geocoder/geocoder.module.js');

var from = {
    "placename": "sunderland",
    "location": "Sunderland, UK",
    "latitude": 54.9145215,
    "longitude": -1.3709684
}

app.use(express.static('../public'));

io.on('connection', function (socket) {
  socket.on('geocode', function (data) {
    geocoder.encode(from, [{ 'placename': 'london', 'location': 'london' }]).then((result) => {
      socket.emit('geocode', result);
    });
  });
});

server.listen(8081);
