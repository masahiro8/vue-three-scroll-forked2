<template>
  <div class="main">
    <div class="header">
      <ul class="header-content">
        <li><img class="icon" src="@/assets/logo.png" /></li>
        <li class="header-text">
          <p class="subtitle">沖縄本土復帰50周年</p>
          <p class="title">知る32軍壕</p>
        </li>
      </ul>
    </div>
    <Top id="loading" class="loading" />
    <About id="loading" class="loading" />
    <ThreeScene :callInfoEvent="callInfoEvent" />
    <Modal
      v-if="false"
      :val="postItem"
      v-show="showContent"
      @close="closeModal"
    />
    <InfoView :isShowInfo="isShowInfo" :selectedItem="selectedItem" />
    <ScrollNavi />
    <Contents :items="articles" />
    <Footer />
  </div>
</template>

<script>
  import ThreeScene from "../components/ThreeScene/index.vue";
  import ScrollNavi, { SECTIONS } from "../components/ScrollNavi/index";
  import Modal from "../components/Modal/index.vue";
  import Top from "./Top.vue";
  import About from "./About.vue";
  import Contents from "./Contents.vue";
  import Footer from "./Footer.vue";
  import InfoView from "../components/InfoView/index.vue";
  import { popups } from "../assets/popups";
  import { articles } from "../assets/articles";

  const OBJECT_INFO = popups;

  export default {
    name: "Home",
    data: () => {
      return {
        articles,
        item: [],
        isShowInfo: false,
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
    components: {
      ThreeScene,
      ScrollNavi,
      Modal,
      Top,
      About,
      Contents,
      Footer,
      InfoView,
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
    },
    methods: {
      async fetchData() {
        const response = await fetch("/objectInfo.json");
        const json = await response.json();
        this.item = json;
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

      callInfoEvent({ move, progress, results }) {
        const f = results.find((item) => {
          return item.isFreeze == true;
        });
        this.isShowInfo = f && "id" in f ? true : false;

        console.log(this.isShowInfo, f, move, progress);
        if (this.isShowInfo == true) {
          this.selectedId = f.id;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .header {
    position: fixed; /* ヘッダーを固定する */
    top: 0; /* 上部から配置の基準位置を決める */
    left: 0; /* 左から配置の基準位置を決める */
    width: 100%; /* ヘッダーの横幅を指定する */
    z-index: 5;
    .header-content {
      width: 100%; /* コンテンツの横幅を指定する */
      overflow: auto; /* コンテンツの表示を自動に設定（スクロール） */
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
  .InfoView {
    max-width: 429px;
    width: 40vw;
    height: 100%;
    background-color: #56514b;
    color: white;
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.3s ease-out;
    transform: translateX(429px);
    z-index: 9;
    overflow: auto;
  }

  .InfoView.show {
    transform: translateX(0);
  }

  .infoView-contents {
    margin: 2em 2em 0;
    .number {
      font-size: 0.875em;
    }
    .title {
      font-size: 1.5em;
      font-weight: 400;
      line-height: 1.2em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      padding-bottom: 1em;
      margin: 0;
    }
    .text {
      font-size: 0.875em;
      // border-bottom: 1px solid;
      // padding-bottom: 1em;
      opacity: 60%;
    }
    .slide__wrapper {
      position: relative;
      width: 40%;
      margin: 0 auto;
    }
    .image {
      width: 100%;
    }
    .right-btn {
      position: absolute;
      right: 20px;
      top: 41%;
      font-size: 50px;
      font-weight: bold;
      color: #fff;
    }
    .left-btn {
      position: absolute;
      left: 20px;
      top: 41%;
      font-size: 25px;
      font-size: 50px;
      font-weight: bold;
      color: #fff;
    }

    .slider {
      margin-top: 32px;
      .hooper {
        height: 26vh;
      }
    }
    .hooper-track {
      height: 0;
    }
    .hooper-slide {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .slide-caption {
        font-size: 10px;
      }
      .slide-content-wrapper {
        text-align: center;
      }

      .slide-image {
        height: 100%;
        width: 10vw;
      }
    }
    .slide-button {
      display: flex;
      justify-content: flex-end;
      padding: 0.5em 1em;
      .slide-prev-button {
        margin-right: 1.5em;
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    .InfoView {
      width: 50vw;
      height: 100%;
    }
    ::v-deep .hooper {
      height: 15vh;
    }
    .infoView-contents {
      .hooper-slide {
        .slide-image {
          width: 18vw;
        }
      }
    }
  }
  @media screen and (max-width: 559px) {
    .InfoView {
      width: 70vw;
      height: 100%;
    }
    .infoView-contents {
      margin: 1em 1em 0;
      .number {
        font-size: 0.875em;
      }
      .title {
        font-size: 1.25em;
        padding-bottom: 0.5em;
        line-height: 1.5em;
        margin: 0;
      }
      .image {
        width: 100%;
      }
      .right-btn {
        position: absolute;
        right: 20px;
        top: 41%;
        font-size: 50px;
        font-weight: bold;
        color: #fff;
      }
      .left-btn {
        position: absolute;
        left: 20px;
        top: 41%;
        font-size: 25px;
        font-size: 50px;
        font-weight: bold;
        color: #fff;
      }

      .slider {
        margin-top: 0;
        .hooper {
          height: 15vh;
        }
      }
      .hooper-slide {
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .slide-image {
          height: 100%;
          width: 40vw;
        }
      }
      .slide-button {
        display: flex;
        justify-content: flex-end;
        padding: 0 0.5em 0.5em;
        .slide-prev-button {
          margin-right: 1.2em;
        }
      }
    }
    ::v-deep .hooper {
      height: 15vh;
    }
  }
</style>
