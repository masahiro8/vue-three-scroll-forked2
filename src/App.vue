<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./pages/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>