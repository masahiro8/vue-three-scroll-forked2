<template>
  <div class="main">
    <Modal />
    <transition name="fade">
      <Loading v-if="!isLoaded" :progress="loadingProgress" />
    </transition>
    <div class="header">
      <ul class="header-content">
        <li><img class="icon" src="@/assets/logo.png" /></li>
        <li class="header-text">
          <p class="subtitle">沖縄本土復帰50周年</p>
          <p class="title">知る32軍壕</p>
        </li>
      </ul>
    </div>
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
          [ASSETS.HEAD_MOVIE, ASSETS.GLTF_MODEL, ASSETS.INTERVIEW_1],
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

        setTimeout(() => {
          this.isLoaded = true;
        }, 1000);
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
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    .header-content {
      width: 100%;
      overflow: auto;
      margin: 1.875em 0 0 1.875em;
      padding: 0;
      .icon {
        width: 48px;
      }
      li {
        float: left;
        list-style: none;
      }
      .header-text {
        margin-left: 0.875em;
        color: #ffffff;
        opacity: 0.4;
        letter-spacing: 0.435em;
      }
      .subtitle {
        font-size: 12px;
        margin: 0;
        padding: 0;
      }
      .title {
        font-size: 16px;
        margin: 0;
        padding: 0;
      }
    }
  }

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
