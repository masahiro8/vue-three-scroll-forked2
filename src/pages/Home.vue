<template>
  <div class="main">
    <Modal />
    <transition name="fade">
      <Loading v-if="!isCloseLoading" :progress="loadingProgress" />
    </transition>
    <Header />
    <div v-if="isLoaded">
      <Top v-if="isLoaded" :src="getHeadMovie" id="loading" class="loading" />
      <About v-if="isLoaded" id="loading" class="loading" />
      <ThreeScene
        v-if="isLoaded"
        :src="getGLTFModel"
        :callInfoEvent="callInfoEvent"
        :class="isShowModal ? 'isModal' : ''"
      />
      <InfoView
        :isShowInfo="isShowInfo"
        :selectedItem="selectedItem"
        :class="isShowModal ? 'isModal' : ''"
      />
      <ScrollNavi />
      <Contents :items="articles" :class="isShowModal ? 'isModal' : ''" />
      <Footer />
    </div>
  </div>
</template>

<script>
  import ThreeScene from "../components/ThreeScene/indexAnimate.vue";
  import ScrollNavi, { SECTIONS } from "../components/ScrollNavi/index";
  import Modal from "../components/Modal/index.vue";
  import Top from "./Top.vue";
  import About from "./About.vue";
  import Contents from "./Contents.vue";
  import Footer from "./Footer.vue";
  import InfoView from "../components/InfoView/index.vue";
  import Header from "../components/Header/index.vue";
  import Loading from "../components/Loading/index.vue";
  import { popups } from "../assets/popups";
  import { articles } from "../assets/articles";
  import { ASSETS } from "../assets/assets";
  import { loader } from "../util/loader";
  import { modal } from "../components/Modal/index.vue";

  const OBJECT_INFO = popups;

  export default {
    name: "Home",
    data: () => {
      return {
        ASSETS: {
          HEAD_MOVIE: null,
        },
        isLoaded: false,
        isCloseLoading: false,
        loadingProgress: 0,
        articles,
        item: [],
        isShowInfo: false,
        isShowModal: false,
        OBJECT_INFO,
        selectedId: null,
        showContent: false,
        postItem: "",
        hooperSettings: {
          infiniteScroll: true,
          itemsToShow: 1.3,
          breakpoints: {
            600: {
              itemsToShow: 1.5,
            },
            800: {
              itemsToShow: 2,
            },
            1200: {
              itemsToShow: 2,
            },
          },
        },
      };
    },
    async mounted() {
      this.onLoadAssets();
      modal.setCallback((result) => {
        this.isShowModal = result;
      });
    },
    components: {
      Header,
      ThreeScene,
      ScrollNavi,
      Modal,
      Top,
      About,
      Contents,
      Footer,
      InfoView,
      Loading,
    },

    computed: {
      SECTIONS() {
        return SECTIONS;
      },
      selectedItem() {
        const result = OBJECT_INFO.find((value) => {
          return value.id === this.selectedId;
        });
        return result;
      },
      getHeadMovie() {
        return this.ASSETS.HEAD_MOVIE?.src;
      },
      getGLTFModel() {
        return this.ASSETS.GLTF_MODEL?.src;
      },
    },
    methods: {
      /**
       * ローディング
       */
      async onLoadAssets() {
        const _ASSETS = await loader().getFiles(
          [ASSETS.HEAD_MOVIE, ASSETS.GLTF_MODEL],
          (progress) => {
            const total = Object.keys(progress).length * 100;
            const current = Object.keys(progress)
              .map((key) => progress[key].progress)
              .reduce((prev, current) => prev + current);
            this.loadingProgress = (current / total) * 100;
          }
        );

        this.ASSETS = {
          HEAD_MOVIE: _ASSETS.find((item) => item.key === "HEAD_MOVIE"),
          GLTF_MODEL: _ASSETS.find((item) => item.key === "GLTF_MODEL"),
        };
        this.isLoaded = true;

        setTimeout(() => {
          this.isCloseLoading = true;
        }, 3000);
      },
      openModal(image) {
        this.showContent = true;
        this.postItem = image;
      },
      closeModal() {
        this.showContent = false;
      },

      slidePrev() {
        this.$refs.carousel.slidePrev();
      },
      slideNext() {
        this.$refs.carousel.slideNext();
      },

      callInfoEvent({ results }) {
        const f = results.find((item) => {
          return item.isFreeze == true;
        });
        this.isShowInfo = f && "id" in f ? true : false;

        if (this.isShowInfo == true) {
          this.selectedId = f.id;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .isModal {
    filter: blur(10px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 2s ease-in;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: scale(1.3);
    filter: blur(10px);
  }
</style>
<style lang="scss">
  body {
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI,
      Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial,
      メイリオ, Meiryo, sans-serif;
  }
</style>
