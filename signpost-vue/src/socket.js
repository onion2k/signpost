import io from 'socket.io-client'
import generateUUID from './uuid';

var signsocket = function(){

    let socket = io.connect('http://localhost:8081');

    socket.connectapp = function(app){
        this.app = app;
    }

    socket.on('load', function (data) {
        socket.app.load(data);
    });

    socket.on('geocode', function (data) {
        var index, id;
        if (data[0].index === -1) {
            id = generateUUID();
            socket.app.$store.commit('add', {
                title: data[0].title,
                place: data[0].placename,
                bearing: data[0].bearing,
                distance: data[0].distance,
                id: id
            });
        } else {
            id = data[0].id;
            //index = socket.app.move(data[0].bearing, data[0].distance, data[0].index);
            socket.app.$store.commit('update', {
                title: data[0].title,
                place: data[0].placename,
                bearing: data[0].bearing,
                distance: data[0].distance,
                index: data[0].index,
                id: data[0].id
            });
        }
        //signpost.arm(data[0].title || data[0].placename, data[0].bearing, data[0].distance, index, id);
    });

    socket.on('save', function (data) {
        Materialize.toast('Sign saved', 2500, 'toast');
    });

    socket.on('print', function (data) {
        Materialize.toast('Print order received', 2500, 'toast');
    });

    return socket;

}

export default signsocket;
