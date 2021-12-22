<template>
  <div id="contents" class="contents">
    <div class="content-text-wrapper">
      <div class="content-title">
        <h2>吾輩は猫である吾輩は猫である吾輩は猫である吾輩は猫である</h2>
      </div>
      <div class="content-text">
        <p>
          どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。
          掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。
        </p>
      </div>
    </div>
    <div class="slider">
      <hooper :settings="hooperSettings" ref="carousel">
        <slide v-for="(image, indx) in images" :key="indx" :index="indx">
          <div>
            <img class="slide-image" :src="image.src" />
          </div>
        </slide>
      </hooper>
      <div class="slide-button">
        <a class="slide-prev-button" @click.prevent="slidePrev"
          ><svg
            width="43"
            height="43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="21.5" cy="21.5" r="21" stroke="#786B58" />
            <path d="m15 18-5 5h23" stroke="#786B58" /></svg
        ></a>
        <a class="slide-next-button" @click.prevent="slideNext"
          ><svg
            width="43"
            height="43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="21.5" cy="21.5" r="21" stroke="#786B58" />
            <path d="m28 18 5 5H10" stroke="#786B58" /></svg
        ></a>
      </div>
    </div>
  </div>
</template>
<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  data: () => {
    return {
      hooperSettings: {
        itemsToShow: 3.5,
        infiniteScroll: true,
      },
      images: [
        {
          src: require("@/assets/image/figure7-1.jpg"),
        },
        {
          src: require("@/assets/image/figure7-2.png"),
        },
        {
          src: require("@/assets/image/figure7-3.png"),
        },
      ],
    };
  },
  components: {
    Hooper,
    Slide,
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
  },
};
</script>
<style lang="scss">
.contents {
  background-image: url("~@/assets/image/background.png");
}
.content-text-wrapper {
  padding: 25.25em 4.375em 0;
  .content-title {
    inline-size: 51.4375em;
    overflow-wrap: break-word;
    margin-bottom: 5.5625em;
    h2 {
      margin: 0;
      font-size: 2.25em;
      font-weight: normal;
      letter-spacing: 0.435em;
    }
  }
  .content-text {
    inline-size: 42.3125em;
    overflow-wrap: break-word;
    margin-left: auto;
  }
}
.slider {
  margin-top: 5em;
}
.hooper-slide {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .slide-image {
    height: 100%;
    width: 20em;
  }
}
.slide-button {
  display: flex;
  justify-content: flex-end;
  padding: 1.25em 5em;
  .slide-prev-button {
    margin-right: 1.5em;
  }
}
</style>
