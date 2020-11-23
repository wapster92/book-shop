<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Home from './views/Home';
  export default {
    data() {
      return {
      }
    },
    components: {
      Home
    },
    mounted() {
      // this.$store.dispatch('GET_BOOKS', {id:[10031], page: 1})
    }
  }
</script>

<style>
  :root {
    --green: #32a852;
    --red: #cc2f34;
    --white: #fff;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .title {
    border-bottom: 1px solid #2c3e50;
  }
</style>
