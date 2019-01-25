<template>
  <div id="app" class="container">
    <bs-indicator></bs-indicator>
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2 mx-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import BsIndicator from './components/BsIndicator.vue';
  export default Vue.extend({
    name: 'game',
    components: {
      BsIndicator,
    },
  });
</script>

<style lang="scss">
  @import './scss/main.scss';

  body {
    background-color: $dark;
    color: $white;
  }
</style>