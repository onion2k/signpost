import Vue from 'vue';
import App from './App';
import signsocket from './socket';
import signstore from './store';
import router from './router';

Vue.config.productionTip = false;

var socket = new signsocket();
var store = new signstore(socket);

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created: function(){
    socket.emit('load', {});
  },
  methods: {
    load: function(data) {
      console.log(data);
      Materialize.toast(data.id+' loaded', 3750, 'toast');
    },
    add: function(payload) {
      store.emit('add', payload)
      Materialize.toast('Arm added', 3750, 'toast');
    },
    move: function() {
      Materialize.toast('Arm moved', 3750, 'toast');
    }
  }
});

socket.connectapp(app);
