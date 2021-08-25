<template>
  <div id="app"
       class="app">
    <Navigation/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import "@/assets/css/_variables.scss";
@import "@/assets/css/_reset.scss";
@import "@/assets/css/_main.scss";
</style>
