<template>
    <div id="controls">
        <button type="button" v-on:click="reverse()" class="btn orange waves-effect waves-light">Reverse</button>
        <button type="button" v-on:click="stop()" class="btn red waves-effect waves-light">Stop</button>
        <button type="button" v-on:click="play()" class="btn green waves-effect waves-light">Play</button>
    </div>
</template>

<script>
export default {
  name: 'spSignControl',
  data () {
    return {

    }
  },
  methods: {
    reverse () {
        signpostRotator.reverse();
    },
    stop () {
        signpostRotator.pause();
    },
    play () {
        signpostRotator.play();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #controls {
        position: absolute;
        right: 0;
        padding: 10px;
    }
</style>
