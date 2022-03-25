<template>
  <div id="contents3" class="contents">
    <h2 class="chapter">第３章</h2>
    <div class="content-section" v-for="item in items" :key="item.id">
      <!-- タイトル -->
      <div v-if="item.contents.length > 0">
        <h2>{{ item.title }}</h2>
      </div>
      <!-- コンテンツ -->
      <div v-for="content in item.contents" :key="content.subtitle">
        <div class="content-wrapper">
          <div class="content-text">
            <p class="content-subtitle">{{ content.subtitle }}</p>
            <p>
              {{ content.text }}
            </p>
          </div>
        </div>
        <!-- 画像 -->
        <div class="slider-wrapper" v-if="isImages(content)">
          <div class="slider">
            <p class="caution">※クリックすると拡大表示されます。</p>
            <Slider
              :type="SLIDER_TYPE.ARTICLE"
              :images="content.images"
              srcKeyName="thumb_url"
              :setting="SETTING"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Slider, { SLIDER_TYPE } from "../Slides/index.vue";

  export default {
    components: {
      Slider,
    },
    props: {
      items: {
        type: Array,
      },
    },
    data: () => {
      return {
        SLIDER_TYPE,
        SETTING: {
          wheelControl: false,
          // infiniteScroll: true,
          itemsToShow: 2.1,
          breakpoints: {
            800: {
              itemsToShow: 3.1,
            },
            1200: {
              itemsToShow: 4.1,
            },
          },
        },
      };
    },
    methods: {
      isImages(content) {
        return "images" in content && content.images.length;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .contents {
    padding-top: 10.25em;
    background-image: url("~@/assets/image/background.png");
  }

  .content-section {
    padding: 8em 0;
    border-bottom: 1px solid rgba(120, 107, 88, 0.3);
    h2 {
      margin: 0;
      font-size: 2.5em;
      font-weight: normal;
      letter-spacing: 0.5em;
      padding-left: 3em;
    }
  }
  .content-wrapper {
    padding: 2em 4em;
  }

  .content-subtitle {
    font-size: 1.5em;
  }
  .content-text {
    inline-size: 42em;
    overflow-wrap: break-word;
    margin-left: auto;
    font-size: 1em;
    line-height: 1.8em;
    letter-spacing: 0.18em;
    width: 80%;
    p {
      white-space: pre-line;
    }
  }

  .chapter {
    margin: 0;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 0.5em;
    padding-left: 2.5em;
  }

  /**
  * Slider
  */

  .slider-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .slider {
    padding: 16px 0 0 16px;
    margin-top: 5em;
    width: 80%;
    background: rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 559px) {
    .contents {
      padding: 0;
    }
    .content-section {
      padding: 6em 0 2em 0;
      h2 {
        padding: 0 16px;
        letter-spacing: 0.3em;
        font-size: 30px;
      }
    }

    .content-wrapper {
      padding: 1.25em;
    }
    .content-text {
      inline-size: auto;
    }
    .slider {
      margin-top: 2em;
      width: 100%;

      .caution {
        padding-left: 8px;
      }
    }
    .chapter {
      margin-bottom: -45px;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 0.3em;
      padding: 96px 16px 0;
    }
  }
</style>
