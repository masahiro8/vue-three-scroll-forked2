<template>
  <div id="contents" class="contents">
    <div class="content-section" v-for="item in items" :key="item.id">
      <!-- タイトル -->
      <div v-if="item.contents.length > 0">
        <div class="content-wrapper">
          <h2>{{ item.title }}</h2>
        </div>
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
        <div class="slider-wrapper">
          <div class="slider">
            <Slider
              :type="SLIDER_TYPE.ARTICLE"
              :images="content.images"
              srcKeyName="src_url"
              :setting="SETTING"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Slider, { SLIDER_TYPE } from "../components/Slides/index.vue";

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
        // itemsToShow: 2.1,
        breakpoints: {
          600: {
            itemsToShow: 4.1,
          },
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.contents {
  padding-top: 10.25em;
  background-image: url("~@/assets/image/background.png");
}

.content-section {
  padding: 8em 0 0 0;
}
.content-wrapper {
  padding: 2em 4em;
}
h2 {
  margin: 0;
  font-size: 2.5em;
  font-weight: normal;
  letter-spacing: 0.5em;
}

.content-subtitle {
  font-size: 1.5em;
}
.content-text {
  inline-size: 42em;
  overflow-wrap: break-word;
  margin-left: auto;
  font-size: 1em;
  line-height: 1.625em;
  letter-spacing: 0.1875em;
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
  width: 90%;
  background: rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 559px) {
}
</style>
