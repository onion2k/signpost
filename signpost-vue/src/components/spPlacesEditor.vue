<template>
    <li class="place" v-bind:class="{ active: place.active }">
        <div class="collapsible-header" v-on:click="activate(place)" v-bind:class="{ active: place.active }">
        <i class="material-icons">label</i>{{ instanceTitle || instancePlace }}
        <span class="handle secondary-content"><i class="material-icons">reorder</i></span>
        </div>
        <div class="collapsible-body" v-bind:class="{ active: place.active }" style="overflow: auto;">
        <form id="editplace">
            <div class="form-group">
            <label for="placename">Place</label>
            <input type="text" placeholder="A place or an address" v-bind:value="instancePlace" @input="instancePlace = $event.target.value">
            </div>
            <div class="form-group">
            <label for="title">Title (Optional)</label>
            <input type="text" placeholder="Eg Allison's house" v-bind:value="instanceTitle" @input="instanceTitle = $event.target.value">
            </div>
            <button type="button" v-on:click="remove(place, index)" class="btn red waves-effect waves-light">Delete</button>
            <button type="button" v-on:click="edit(place, index)" class="btn right waves-effect waves-light">Update Place</button>
        </form>
        </div>
    </li>
</template>

<script>
export default {
    name: 'spPlacesEditor',
    props: ['place', 'index'],
    data: function(){
        return { 'instancePlace': this.place.place, 'instanceTitle': this.place.title };
    },
    computed: {
        places () {
            return this.$store.state.places
        }
    },
    methods: {
        edit(place, index) {
            place.place = this.instancePlace;
            place.title = this.instanceTitle;
            this.$store.dispatch('edit', { place: place, index: index });
        },
        remove(place, index) {
            this.$store.commit('remove', {'id': place.id});
        },
        activate(place){
            this.$store.commit('activate', {'id': place.id});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .collapsible-header {
    padding: 0;
  }
  .collapsible-header span.handle i {
    margin-right: 0;
  }
  .collapsible-body {
    padding: 0.5rem;
  }
  .collapsible-header.active {
    display: block;
  }
  .collapsible-body.active {
    display: block;
  }
  .handle {
    color: #bbb;
  }

</style>
