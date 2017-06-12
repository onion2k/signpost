<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
  #toast-container {
    bottom: 3%;
    right: 3%;
    top: auto;
    left: auto;
  }
  .toast {
    border-radius: 5px;
    border: 2px solid #000;
  }
</style>
