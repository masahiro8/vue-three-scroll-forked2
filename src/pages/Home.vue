<template>
  <div class="main">
    <Top id="loading" class="loading" />
    <ThreeScene :callInfoEvent="callInfoEvent" />
    <Modal :val="postItem" v-show="showContent" @close="closeModal" />
    <div class="InfoView" :class="isShowInfo ? 'show' : ''">
      <div class="infoView-contents">
        <p class="number">{{ selectedItem && selectedItem.number }}</p>
        <h2 class="title">{{ selectedItem && selectedItem.title }}</h2>
        <p class="text">{{ selectedItem && selectedItem.text }}</p>
        <p>{{ selectedItem && selectedItem.image }}</p>

        <div class="slider">
          <hooper :settings="hooperSettings" ref="carousel">
            <slide
              v-for="(image, indx) in selectedItem && selectedItem.images"
              :key="indx"
              :index="indx"
            >
              <div>
                <img
                  class="slide-image"
                  :src="image.src"
                  @click="openModal(image)"
                />
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
                <circle cx="21.5" cy="21.5" r="21" stroke="#fff" />
                <path d="m15 18-5 5h23" stroke="#fff" /></svg
            ></a>
            <a class="slide-next-button" @click.prevent="slideNext"
              ><svg
                width="43"
                height="43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="21.5" cy="21.5" r="21" stroke="#fff" />
                <path d="m28 18 5 5H10" stroke="#fff" /></svg
            ></a>
          </div>
        </div>
      </div>
    </div>

    <ScrollNavi />
    <Contents />
    <Footer />
  </div>
</template>

<script>
  import ThreeScene from "../components/ThreeScene/indexAnimate.vue";
  import ScrollNavi, { SECTIONS } from "../components/ScrollNavi/index";
  import Modal from "../components/Modal/index.vue";
  import Top from "./Top.vue";
  import Contents from "./Contents.vue";
  import Footer from "./Footer.vue";
  import { Hooper, Slide } from "hooper";
  import "hooper/dist/hooper.css";

  const OBJECT_INFO = [
    {
      id: 1,
      number: "#1",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
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
    },
    {
      id: 2,
      number: "#2",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 3,
      number: "#3",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 4,
      number: "#4",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 5,
      number: "#5",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 6,
      number: "#6",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 7,
      number: "#7",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 8,
      number: "#8",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 9,
      number: "#9",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 10,
      number: "#10",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 11,
      number: "#11",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
    {
      id: 12,
      number: "#12",
      title: "吾輩は猫である。名前はまだ無い。",
      text: "どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。",
      image: ["figure7-1.jpg", "figure7-2.jpg", "figure7-3.jpg"],
    },
  ];

  export default {
    name: "Home",
    data: () => {
      return {
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
              itemsToShow: 1.5,
            },
            1200: {
              itemsToShow: 2.1,
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
      Contents,
      Footer,
      Hooper,
      Slide,
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
    // created() {
    //   this.fetchData();
    // },

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
      border-bottom: 1px solid;
      padding-bottom: 1em;
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
        height: 15vh;
      }
    }
    .hooper-slide {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

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
