<template>
    <div class="navbar-fixed">
      <nav class="light-blue">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo" style="margin-left: 10px;">It's A Sign</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="about">About Signs</a></li>
              <li><a href="store">Ready Made Signs</a></li>
              <li><a href="print">Print My Sign</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
          </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      msg: 'Nav'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
