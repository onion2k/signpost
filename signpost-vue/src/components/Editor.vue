<template>
  <div class="main">
    <spNavbar></spNavbar>
    <div class="row">
      <div class="col s5" id="placelist" ref="placelist">
        <ul>
          <draggable :list="places" :options="{handle:'.handle'}" @change="onChange" class="dragArea">
            <spPlacesEditor v-for="(place, index) in places" v-bind:place="place" v-bind:index="index" :key="place.place"></spPlacesEditor>
          </draggable>
          <spPlacesNew></spPlacesNew>
        </ul>
      </div>
      <div class="col s7">
        <spThreeViewer></spThreeViewer>
      </div>
    </div>
    <spFooter></spFooter>
  </div>
</template>

<script>

import spNavbar from '@/components/spNavbar.vue';
import spFooter from '@/components/spFooter.vue';
import spPlacesEditor from '@/components/spPlacesEditor.vue';
import spPlacesNew from '@/components/spPlacesNew.vue';
import spThreeViewer from '@/components/spThreeViewer.vue';
import draggable from 'vuedraggable'

export default {
  name: 'editor',
  data () {
    return {
      id: '',
      place: '',
      title: ''
    }
  },
  computed: {
      places () {
          return this.$store.state.places
      }
  },
  created: function(){
    //Do nothing on create
  },
  components: {
    spNavbar,
    spFooter,
    spPlacesEditor,
    spPlacesNew,
    spThreeViewer,
    draggable
  },
  methods: {
    back: function(){
      signpostRotator.reverse();
    },
    stop: function(){
      signpostRotator.pause();
    },
    forward: function(){
      signpostRotator.play();
    },
    print: function(){

    },
    newsign: function(){
      this.$store.dispatch('new', { });
    },
    save: function(){
      this.$store.dispatch('save', { });
      //update cookie with id to load next time
    },
    load: function(data){
      if (data.id) { this.id = data.id; } else { this.id = generateUUID(); }
      this.places = data.places;
      for (p in this.places) {
        var place = this.places[p];
        socket.emit('geocode', { place: place.place, title: place.title, index: p, id: place.id });
      }
      Materialize.toast('Sign loaded', 2500, 'toast');
    },
    encode: function (event) {
      socket.emit('geocode', { place: this.place, title: this.title });
    },
    addArm: function(title, place, bearing, distance, id){
      this.places.push({ title: title, place: place, bearing: bearing, distance: distance, active: false, index: this.places.length, id: id });
      return this.places.length-1;
    },
    editArm: function(place, index){
      signpost.disarm(place.id).then(()=>{
        //TODO: Remove dependence on place.index ... find id in the array instead
        this.places[index].title = place.title;
        this.places[index].place = place.place;
        socket.emit('geocode', { place: place.place, title: place.title, index: index, id: place.id, active: true });
      });
    },
    deleteArm: function(place, index){
      signpost.disarm(place.id);
      this.$delete(this.places, index);
      this.places.map((p)=>{
        if (p.index > index) {
          //TODO: Remove dependence on place.index
          p.index--;
          signpost.move(p.id, +1);
        }
      })
      this.activateform();
    },
    moveArm: function(bearing, distance, index) {
      //TODO: Remove dependence on place.index ... find id in the array instead
      this.places[index].bearing = bearing;
      this.places[index].distance = distance;
      return index;
    },
    onChange: function(e){
      if (e.moved) {
        if (e.moved.newIndex > e.moved.oldIndex) {
          signpost.move(this.places[e.moved.newIndex].id, -1 * (e.moved.newIndex - e.moved.oldIndex));
          for (var x = e.moved.oldIndex; x < e.moved.newIndex; x++) {
            signpost.move(this.places[x].id, +1, x*0.25);
          }
        } else {
          signpost.move(this.places[e.moved.newIndex].id, -1 * (e.moved.newIndex - e.moved.oldIndex));
          var maxTime = e.moved.oldIndex - (e.moved.newIndex+1);
          for (var x = e.moved.newIndex+1; x <= e.moved.oldIndex; x++) {
            signpost.move(this.places[x].id, -1, (maxTime-x)*0.25);
          }
        }
      }
    },
    activateform: function(place){
      this.deactivate();
      this.placeform = true;
    },
    deactivate: function() {
      this.places.map((place)=>place.active = false);
      this.placeform = false;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .controls {
    position: relative;
  }
  #toast-container {
    top: 5%;
    right: 5%;
    left: auto;
  }
  .toast {
    border-radius: 5px;
    border: 2px solid #000;
  }
</style>
