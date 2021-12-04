<template>
  <div class="Main">
    <div id="loading" class="loading"></div>
    <ThreeScene />
    <ScrollNavi />
    <div id="contents" class="contents"></div>
  </div>
</template>

<script>
import ThreeScene from "../components/ThreeScene/index.vue";
import ScrollNavi, { SECTIONS } from "../components/ScrollNavi/index";
export default {
  name: "Home",
  components: {
    ThreeScene,
    ScrollNavi,
  },
  computed: {
    SECTIONS() {
      return SECTIONS;
    },
  },
};
</script>
<style scoped>
.loading {
  width: 100vw;
  height: 100vh;
  background-color: blue;
}

.contents {
  width: 100vw;
  height: 1600px;
  background-color: red;
}
</style>