<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
  import Vue from "vue";
  import VueSocialSharing from "vue-social-sharing";
  import Home from "./pages/Home.vue";
  Vue.use(VueSocialSharing);

  export default {
    name: "App",

    components: {
      Home,
    },
    created() {
      window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        window.location.reload(true);
      },
    },
  };
</script>
<style>
  body {
    margin: 0;
    padding: 0;
  }
  * {
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI,
      Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial,
      メイリオ, Meiryo, sans-serif;
  }
</style>
