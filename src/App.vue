<template>
  <div id="app"
       class="app">
    <navigation/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import "@/assets/css/_reset.scss";
@import "@/assets/css/_main.scss";
</style>
