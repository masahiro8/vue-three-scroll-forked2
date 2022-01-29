<template>
  <div class="InfoView" :class="isShowInfo ? 'show' : ''">
    <div class="infoView-contents">
      <h2 class="title">{{ title }}</h2>
      <p v-for="(text, index) in texts" :key="index">
        {{ text }}
      </p>

      <p v-if="images.length" class="caution">
        ※クリックすると拡大表示されます。
      </p>

      <Slider
        v-if="images.length"
        :type="SLIDER_TYPE.POPUP"
        :images="images"
        srcKeyName="thumb_url"
        :setting="SETTING"
      />
    </div>
  </div>
</template>
<script>
  import Slider, { SLIDER_TYPE } from "../Slides/index.vue";
  export default {
    data: () => {
      return {
        SLIDER_TYPE,
        SETTING: {
          wheelControl: false,
          breakpoints: {
            309: {
              itemsToShow: 2.1,
            },
          },
        },
      };
    },
    props: {
      isShowInfo: {
        type: Boolean,
        defaultValue: false,
      },
      selectedItem: {
        type: Object,
        defaultValue: {
          id: 0,
          title: "",
          images: [],
          text_1: "",
          text_2: "",
          text_3: "",
        },
      },
    },
    components: {
      Slider,
    },
    computed: {
      id() {
        return this.selectedItem?.id ?? 0;
      },
      title() {
        return this.selectedItem?.title ?? "";
      },
      images() {
        return this.selectedItem?.images ?? [];
      },
      texts() {
        const labels = ["text_1", "text_2", "text_3"];
        if (this.selectedItem) {
          const _texts = labels
            .map((label) => {
              return this.selectedItem[label] ?? "";
            })
            .filter((item) => item);
          return _texts;
        } else {
          return [];
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
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
    z-index: 99;
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
      font-size: 0.6em;
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

    .caution {
      font-size: 12px;
      margin-top: 8px;
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
      width: 95%;
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
