import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import io from 'socket.io-client'

var socket;

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    id: '',
    places: [
      { place: 'London', title: '', active: false, id: 'london' },
      { place: 'France', title: '', active: false, id: 'france' },
      { place: 'Germany', title: '', active: false, id: 'germany' },
      { place: 'Sunderland', title: '', active: false, id: 'sunderland' }
    ],
    placeform: true
  },
  mutations: {
    activate (state, payload) {
      state.places.map((place)=>{ place.active = place.id===payload.id ? true : false; });
      state.placeform = (payload.id==='placeform') ? true : false;
    },
    remove (state, payload) {
      //delete signpost arm
      state.places.splice(payload.id, 1);
      state.places.map((p)=>{
        if (p.index > payload.id) {
          p.index--;
          //signpost.move(p.id, +1);
        }
      });
      state.placeform = true;
    }
  },
  actions: {
    geocode (state, payload) { socket.emit('geocode', payload); },
    newsign (state, payload) {
      Materialize.toast('New sign started', 3750, 'toast');
      state.state.id = generateUUID();
      // for (place of this.places) {
      //   signpost.disarm(place.id);
      // }
      state.state.places = [];
    },
    edit (state, payload)  {
      socket.emit('geocode', { place: payload.place.place, title: payload.place.title, index: payload.index, id: payload.place.id, active: true });
    },
    save (state, payload)  { socket.emit('save', payload); },
    print (state, payload) { socket.emit('print', payload); }
  }
});

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  methods: {
    load: function() {
      Materialize.toast('Sign loaded', 3750, 'toast');
    },
    add: function() {
      Materialize.toast('Arm added', 3750, 'toast');
    },
    move: function() {
      Materialize.toast('Arm moved', 3750, 'toast');
    }
  }
});


var socket = io.connect('http://localhost:8081');
    socket.emit('load', {});

    socket.on('load', function (data) {
      app.load();
    });

    socket.on('geocode', function (data) {
      var index, id;
      if (data[0].index === -1) {
        id = generateUUID();
        index = app.add(data[0].title, data[0].placename, data[0].bearing, data[0].distance, id);
      } else {
        id = data[0].id;
        index = app.move(data[0].bearing, data[0].distance, data[0].index);
      }
      //signpost.arm(data[0].title || data[0].placename, data[0].bearing, data[0].distance, index, id);
    });

    socket.on('save', function (data) {
      Materialize.toast('Sign saved', 2500, 'toast');
    });

    socket.on('print', function (data) {
      Materialize.toast('Print order received', 2500, 'toast');
    });


    function generateUUID () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
