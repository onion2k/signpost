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
    ]
  },
  mutations: {
    activate (state, payload) {
      state.places.map((place)=>{ place.active = place.id===payload.id ? true : false; });
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
