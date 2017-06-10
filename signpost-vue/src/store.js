import Vuex from 'vuex';
import Vue from 'vue';
import generateUUID from './uuid';

Vue.use(Vuex);

var signstore = function(socket){

    let store = new Vuex.Store({
        state: {
            id: '',
            places: [],
            placeform: true
        },
        mutations: {
            activate (state, payload) {
                state.places.map((place)=>{ place.active = place.id===payload.id ? true : false; });
                state.placeform = (payload.id==='placeform') ? true : false;
            },
            add (state, payload) {
                payload.index = state.places.length+1;
                payload.active = false;
                state.places.push(payload);
                signpost.arm(payload.title || payload.place, payload.bearing, payload.distance, payload.index, payload.id);
            },
            update (state, payload) {
                let p = state.places.filter((p)=>{ return p.id===payload.id});
                    p = payload;
                signpost.arm(payload.title || payload.place, payload.bearing, payload.distance, payload.index, payload.id);
            },
            remove (state, id) {
                let index = state.places.map(p => p.id).indexOf(id.id);
                state.places.splice(index, 1);
                state.placeform = true;
                state.places.map((p,i)=>{
                  if (i >= index) {
                    signpost.move(p.id, +1);
                  }
                })
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
            load (state, payload) {
                state.state.places = payload.places;
                for (var p in state.state.places) {
                    var place = state.state.places[p];
                    socket.emit('geocode', { place: place.place, title: place.title, index: p, id: place.id });
                }
            },
            edit (state, payload) {
                let index = state.state.places.map(p => p.id).indexOf(payload.id);
                socket.emit('geocode', { place: payload.place, title: payload.title, index: index, id: payload.id, active: true });
            },
            save (state, payload)  { socket.emit('save', payload); },
            print (state, payload) { socket.emit('print', payload); }
        }
    });

    return store;

}

export default signstore;
