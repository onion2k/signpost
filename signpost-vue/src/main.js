import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import io from 'socket.io-client'

var socket = io.connect('http://localhost:8081');
    socket.emit('load', {});

    socket.on('load', function (data) {
      console.log('Loading');
    });

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
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
      if (payload.id==='placeform') {
        state.placeform = true;
      } else {
        state.placeform = false;
      }
      socket.emit('load', {});
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
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
