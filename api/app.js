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
    geo.encode(from, [{ 'title': data.title, 'place': data.place }]).then((result) => {
      if (data.hasOwnProperty('id')) {
        result[0].id = data.id;
      }
      if (data.hasOwnProperty('index')) {
        result[0].index = data.index;
      } else {
        result[0].index = -1;
      }
      socket.emit('geocode', result);
    });
  });
  socket.on('save', function(data){
    console.log(data.id);
    socket.emit('save', { saved: true });
  });
  socket.on('load', function(){
    socket.emit('load', {
      "id": "sign1",
      "places": [{ place: 'France', index: 0, id: 'france', active: false }, { place: 'London', index: 1, id: 'london', active: false }, { place: 'Germany', index: 2, id: 'germany', active: false }, { place: 'Sunderland, UK', index: 3, id: 'sunderland', active: false }]
      }
    );
  });
  socket.on('print', function(data){
    socket.emit('print', { printing: 'PC Load Letter' });
  });
});

server.listen(8081);
