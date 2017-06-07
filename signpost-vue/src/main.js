import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';

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
    },
    remove (state, payload) {
      //delete signpost arm
      console.log(payload)
      state.places.splice(payload.id, 1);
      state.places.map((p)=>{
        if (p.index > payload.id) {
          p.index--;
          //signpost.move(p.id, +1);
        }
      });
      //this.commit('activate', { id: 'placeform' });
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
