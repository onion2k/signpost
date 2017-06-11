<template>
  <div>
    <spSignControl></spSignControl>
    <div style="min-height: 600px; padding: 0;" id="wrapper"></div>
  </div>
</template>

<script>

import spSignControl from '@/components/spSignControl.vue';

export default {
  name: 'spThreeViewer',
  components: {
    spSignControl
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
