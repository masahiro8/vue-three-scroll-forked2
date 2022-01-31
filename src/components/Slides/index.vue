<template>
  <div class="Carousel" :class="getImageClass">
    <div class="Carousel__body">
      <Hooper ref="carousel" @slide="updateCarousel" :settings="setting">
        <Slide v-for="image in images" :key="image.id">
          <div @click="onClickContent(image)" class="Carousel__image">
            <img class="slide-image" :src="`./images/${image[srcKeyName]}`" />
          </div>
        </Slide>
      </Hooper>
    </div>
    <div class="Carousel__navi">
      <a class="Carousel__btn" @click.prevent="slidePrev"
        ><svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21.5" cy="21.5" r="21" stroke="#fff" />
          <path d="m15 18-5 5h23" stroke="#fff" />
        </svg>
      </a>
      <a class="Carousel__btn" @click.prevent="slideNext"
        ><svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21.5" cy="21.5" r="21" stroke="#fff" />
          <path d="m28 18 5 5H10" stroke="#fff" /></svg
      ></a>
    </div>
  </div>
</template>

<script>
  import { Hooper, Slide } from "hooper";
  import "hooper/dist/hooper.css";
  import { modal } from "../Modal/index.vue";

  export const SLIDER_TYPE = {
    ARTICLE: "article",
    POPUP: "popup",
  };

  export default {
    data() {
      return {
        carouselData: 0,
      };
    },
    props: {
      images: {
        type: Array,
        defaultValue: [],
      },
      srcKeyName: {
        type: String,
        defaultValue: "src",
      },
      type: {
        type: String,
        defaultValue: SLIDER_TYPE.ARTICLE,
      },
      setting: {
        type: Object,
      },
    },
    components: {
      Hooper,
      Slide,
    },
    watch: {
      carouselData() {
        this.$refs.carousel.slideTo(this.carouselData);
      },
    },
    computed: {
      getImageClass() {
        return this.type === SLIDER_TYPE.ARTICLE ? "article" : "popup";
      },
    },
    methods: {
      slidePrev() {
        this.$refs.carousel.slidePrev();
      },
      slideNext() {
        this.$refs.carousel.slideNext();
      },
      updateCarousel(payload) {
        this.myCarouselData = payload.currentSlide;
      },
      onClickContent(image) {
        modal.show(image);
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "./slider.scss";
  .Carousel {
    &.popup {
      .hooper {
        height: 140px !important;
      }
      .Carousel__image {
        width: 120px;
        height: 120px;
      }
    }
    &.article {
      .hooper {
        height: 240px !important;
      }
      .Carousel__image {
        width: 220px;
        height: 220px;
      }
    }
  }
  @media screen and (max-width: 559px) {
    .Carousel {
      &.article {
        .hooper {
          height: 180px !important;
        }
        .Carousel__image {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
</style>
