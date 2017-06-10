import Vuex from 'vuex';
import Vue from 'vue';
import generateUUID from './uuid';

Vue.use(Vuex);

var signstore = function(socket){

    let store = new Vuex.Store({
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
            add (state, payload) {
                state.places.push(payload);
            },
            update (state, payload) {
                let p = state.places.filter((p)=>{ return p.id===payload.id});
                    p = payload;
            },
            remove (state, id) {
                let index = state.places.map(p => p.id).indexOf(id.id);
                state.places.splice(index, 1);
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

    return store;

}

export default signstore;
