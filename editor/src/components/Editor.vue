<template>
  <div class="main">
    <spNavbar></spNavbar>
    <spFile></spFile>
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
import spFile from '@/components/spFile.vue';
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
    spFile,
    spFooter,
    spPlacesEditor,
    spPlacesNew,
    spThreeViewer,
    draggable
  },
  methods: {
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
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .controls {
    position: relative;
  }
</style>
