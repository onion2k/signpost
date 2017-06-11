<template>
    <li id="newplaceform" class="" v-bind:class="{ active: placeform }">
        <div class="collapsible-header" v-on:click="activate" v-bind:class="{ active: placeform }"><i class="material-icons">location_on</i>Add a new place</div>
        <div class="collapsible-body" v-bind:class="{ active: placeform }" style="overflow: auto;">
        <form id="addplace">
            <div class="form-group">
            <label for="placename">Place</label>
            <input type="text" class="form-control" v-model="place" placeholder="Eg Sunderland, UK">
            </div>
            <div class="form-group">
            <label for="title">Title (Optional)</label>
            <input type="text" class="form-control" v-model="title" placeholder="Eg Allison's House'">
            </div>
            <button type="button" id="addnewplace" v-on:click="encode" class="btn right waves-effect waves-light">Add Place</button>
        </form>
        </div>
    </li>
</template>

<script>
export default {
    name: 'spPlacesNew',
    data: function(){
        return {
            place: '',
            title: ''
        }
    },
    computed: {
        placeform () {
            return this.$store.state.placeform
        }
    },
    methods: {
        activate() {
            this.$store.commit('activate', {'id': 'placeform'});
        },
        encode() {
            this.$store.dispatch('geocode', { place: this.place, title: this.title });
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
