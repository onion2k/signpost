<template>
  <div class="about">
    <spNavbar></spNavbar>
    <h1>{{ msg }}</h1>
    <h2>About</h2>
    <spFooter></spFooter>
  </div>
</template>

<script>

import spNavbar from '@/components/spNavbar.vue';
import spFooter from '@/components/spFooter.vue';

export default {
  name: 'about',
  data () {
    return {
      msg: 'About'
    }
  },
  components: {
    spNavbar,
    spFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
