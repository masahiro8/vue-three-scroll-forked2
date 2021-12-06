<template>
  <div class="Main">
    <div id="loading" class="loading"></div>
    <ThreeScene :callInfoEvent="callInfoEvent" />
    <div class="InfoView" :class="isShowInfo ? 'show' : ''"></div>
    <ScrollNavi />
    <div id="contents" class="contents"></div>
  </div>
</template>

<script>
  import ThreeScene from "../components/ThreeScene/index.vue";
  import ScrollNavi, { SECTIONS } from "../components/ScrollNavi/index";
  export default {
    name: "Home",
    data: () => {
      return {
        isShowInfo: false,
      };
    },
    components: {
      ThreeScene,
      ScrollNavi,
    },
    computed: {
      SECTIONS() {
        return SECTIONS;
      },
    },
    methods: {
      callInfoEvent({ move, progress, results }) {
        const f = results.find((item) => {
          return item.isFreeze == true;
        });
        this.isShowInfo = f && "id" in f ? true : false;
        console.log(this.isShowInfo, f, move, progress);
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

  .InfoView {
    width: 256px;
    height: 100vh;
    background-color: white;
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.3s ease-out;
    transform: translateX(256px);
    z-index: 9;
  }

  .InfoView.show {
    transform: translateX(0);
  }
</style>
