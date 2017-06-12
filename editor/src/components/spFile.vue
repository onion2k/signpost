<template>
    <div class="navbar">
      <nav class="orange">
          <div class="nav-wrapper">

            <ul id="nav-mobile" class="hide-on-med-and-down">
              <li><a v-on:click="save">Save Sign</a></li>
              <li><a  v-on:click="print">Print My Sign</a></li>
              <li><a  v-on:click="ar">AR View</a></li>
            </ul>

            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a v-on:click="newsign">New Sign</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
          </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'spFile',
  data () {
    return {

    }
  },
  methods: {
    save: function(){
      this.$store.dispatch('save', { });
    },
    print: function(){
      this.$store.dispatch('print', { });
    },
    newsign: function(){
      this.$store.dispatch('newsign', { });
    },
    ar: function(){
      //open an AR QR code modal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
