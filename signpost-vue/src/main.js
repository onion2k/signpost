import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    places: [{ place: 'London', title: '', active: false }]
  },
  mutations: {
    increment (state) {
      state.count++
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
