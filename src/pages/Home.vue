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
    <Modal :val="postItem" v-show="showContent" @close="closeModal" />
    <div class="InfoView" :class="isShowInfo ? 'show' : ''">
      <div class="infoView-contents">
        <p class="number">#{{ selectedItem && selectedItem.id }}</p>
        <h2 class="title">{{ selectedItem && selectedItem.title }}</h2>
        <p class="text">{{ selectedItem && selectedItem.text_1 }}</p>
        <p class="text">{{ selectedItem && selectedItem.text_2 }}</p>
        <p class="text">{{ selectedItem && selectedItem.text_3 }}</p>
        <p>{{ selectedItem && selectedItem.image }}</p>

        <div class="slider">
          <hooper :settings="hooperSettings" ref="carousel">
            <slide>
              <div>
                <img
                  class="slide-image"
                  :src="selectedItem && selectedItem.image_url_1"
                  @click="openModal(image)"
                />
                <p class="slide-caption">
                  {{ selectedItem && selectedItem.image_caption_1 }}
                </p>
              </div>
            </slide>
            <slide>
              <div>
                <img
                  class="slide-image"
                  :src="selectedItem && selectedItem.image_url_2"
                  @click="openModal(image)"
                />
                <p class="slide-caption">
                  {{ selectedItem && selectedItem.image_caption_2 }}
                </p>
              </div>
            </slide>
            <slide>
              <div>
                <img
                  class="slide-image"
                  :src="selectedItem && selectedItem.image_url_3"
                  @click="openModal(image)"
                />
                <p class="slide-caption">
                  {{ selectedItem && selectedItem.image_caption_3 }}
                </p>
              </div>
            </slide>
            <slide>
              <div>
                <img
                  class="slide-image"
                  :src="selectedItem && selectedItem.image_url_4"
                  @click="openModal(image)"
                />
                <p class="slide-caption">
                  {{ selectedItem && selectedItem.image_caption_4 }}
                </p>
              </div>
            </slide>
            <slide>
              <video
                :src="selectedItem && selectedItem.video_url_1"
                width="256"
                height="144"
              ></video>
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
import ThreeScene from "../components/ThreeScene/index.vue";
import ScrollNavi, { SECTIONS } from "../components/ScrollNavi/index";
import Modal from "../components/Modal/index.vue";
import Top from "./Top.vue";
import About from "./About.vue";
import Contents from "./Contents.vue";
import Footer from "./Footer.vue";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

const OBJECT_INFO = [
  {
    id: 1,
    title: "発電機マーク",
    video_url_1:
      "https://drive.google.com/uc?export=download&id=1wALvMeLCCACcZFESir-7RwUhJ4WYwa0S",
  },
  {
    id: 2,
    title: "第５坑口を出たところの田んぼ",
    text_1:
      "「エイッ」「ギャー」　「エイッ」「ギャー」　第３２軍司令部壕の第５坑口から出てすぐ。首里金城町、師範学校の実習用の田んぼに、悲鳴が響いた。女性が電柱に縛られている。軍人に命じられ、代わる代わる短刀を突き立てているのも女性たちだった。最後は将校が、女性の首を日本刀で打ち落とした。\n騒ぎを聞いて、坑口には人だかりができた。その中に、鉄血勤皇師範隊員の富浜定吉さんもいた。「泣き声のような動物のような、生々しい声だった」。スパイ容疑で処刑された女性には、会ったことがあった。「艦砲で廃虚になった首里城を、方言で何かわめきながらうろついていた。戦で気がふれたと聞いた」。女性を見た人は誰もが、スパイなどできないことを知っていた。\n「沖縄タイムス連載『埋もれた戦　首里城地下３２軍壕＝２０１２年掲載＝」から",
    video_url_1:
      "https://drive.google.com/uc?export=download&id=1IfSnHIc8dxWVM2r5CmJKEcMYyph4ZS9e",
  },
  {
    id: 3,
    title: "トロッコのレール",
    text_1:
      "「我々の任務は壕掘り、陣地構築が主だった。５月２７日摩文仁へ撤退するその日まで軍司令部の壕は掘り続けられた。壕掘りも命がけだった。落盤事故や、掘り出した土石を外に運び出す作業など、砲爆下間髪を入れずトロッコを押して行くのだから容易なことではなかった」―「留魂の碑」より",
    text_2: "",
    text_3: "",
    image_url_1: require("@/assets/image/img_1363.jpeg"),
    image_caption_1: "儀間昭男 さん",

    video_url_1:
      "https://drive.google.com/uc?export=download&id=1gv1wGQQWFADs0Zq19INGA2ypgdoSAgna",
  },
  {
    id: 4,
    title: "女性たちの部屋（もんぺ姿の女性たち）、炊事場",
    text_1:
      "もともと地元の南風原で壕掘りに動員されていたが、軍に指示されるまま炊事婦として３２軍壕に来た。「中は兵隊がいっぱいで、女は少ない。本当は怖かったけど、嫌だと言ったら大変。スパイ容疑で捕まるよ」。炊事場ではイモを洗ったり切ったりしていたが、食料は徐々に減っていった。炊事婦だった大城光子さんの証言より\n\n",
    text_2:
      "「第３２軍司令部壕の中には、女性ばかりの部屋があった。「少なくとも２０人はいた。軍服やモンペを着て、狭い部屋で身を縮めるように座っていた」。鉄血勤皇師範隊に動員された大田昌秀さんは、毎日のようにその前を通った。最初は「なんで女が戦場にいるのか」と、不思議でならなかった。学友たちと「朝鮮ピーだってよ」と言い合ったが、やはり意味は分からないままだった。「沖縄タイムス連載『埋もれた戦　首里城地下３２軍壕』＝２０１２年掲載」から",
    text_3: "",
    image_url_1: require("@/assets/image/figure31.jpg"),
    image_caption_1: "炊事場の写真。米軍が旧日本軍の書類を発見した",

    video_url_1:
      "https://drive.google.com/uc?export=download&id=1IEfr3ZcCAVwMGMao3oI_cfTFUOnnSCGN",
  },
  {
    id: 5,
    title: "電灯、電球",

    video_url_1:
      "https://drive.google.com/uc?export=download&id=1FAQZulyx3FOI_DYrgVj0y2UXjGnClate",
  },
  {
    id: 6,
    title: "水が噴出",
    text_1:
      "じゃぶじゃぶと、水浸しになった坑道を思い切って歩く。下脚部はびしょ濡れになるが、覚悟しているから別に苦にならぬ」「第四、第五両坑道の分岐点の所は、水脈にあたるのか、地下水が滝のように、天井から勢いよく流下している。第五坑道の階段を降りたあたりから、出発を待つ将兵が充満している。３２軍の高級参謀だった八原博道著「沖縄決戦」から",

    video_url_1:
      "https://drive.google.com/uc?export=download&id=1uO7t-Zr9DJjlIdmIWnTmbR76laktNPO-",
  },
  {
    id: 7,
    title: "参謀室辺りの第１坑道",
    text_1:
      "（２段ベッドの）寝台があって。（壕内は）走れるくらい余裕はあった。\n「沖縄一中鉄血勤皇隊の記録上」から\n",
    text_2:
      "３月２９日夜を限りとして、陽光を見ない洞窟生活が始まった。野戦築城隊が、昼夜兼行の努力をして、首里高地北側諸坑道と、南側諸坑道との開通に成功。地下３０㍍、延長千数百㍍の大洞窟、多数の事務室や居室、かつての銀座の夜店もかくやと想う。二六時中煌々たる無数の電灯、千余人の将兵を収容して、さながら一大地下ホテルの観がある。",
    text_3:
      "\n狭くて、奥深い坑道内には、人間が充満しているから、空気の流通が悪く、酸素が稀薄だ。（略）湿度は百パーセントに近い。身体は気だるく、心気は朦朧となる。将兵の活力をそぐこと甚だしく、到底長く人間の住める場所ではない。それをしも耐え得ているのは、戦いの緊張のおかげだ。３２軍の高級参謀だった八原博道著「沖縄決戦」から\n",
    image_url_1: require("@/assets/image/b.jpg"),
    image_caption_1: "那覇市歴史博物館提供",
  },
  {
    id: 8,
    title: "第１坑道の参謀室",
    text_1:
      "ハンタン山のベトンの壕入口から両側には米俵が三俵ずつほどずっと重ねられて、その上に兵隊がゴロゴロ昼夜をわかたず寝ていた。三十メートルほど奧にいくと参謀室があった。これがこの壕の中枢で、沖縄戦の作戦本部である。電話器がずらっと並んで、十名ぐらいの参謀が、胸に金モールの参謀肩章をつけて、いそがしそうに電話をしたり、図面をひいたりしている。そこだけは電灯が煌々と輝いて、はなやいでみえた。のりのきいた白い半袖の開襟シャツにピカピカの長靴をはいた参謀たちは、眼をかがやかし、栄養たっぷりな元気な声で前線に司令をおこなっている。周囲の暗い壕の米俵の上には虚無的な顔をした兵隊たちが黙々と寝ている。十触光ぐらいの電灯が十メートルおきぐらいに赤くともっていて、そこから参謀室をみるとまるで別世界のようにうつった。元沖縄新報記者・仲本政基氏の証言「新聞人の沖縄戦記」「那覇市」資料篇第２巻中６、より",

    video_url_1:
      "https://drive.google.com/uc?export=download&id=1s7CBTXN-OaTkPr1PpV52lfFn8Ew9KkH8",
  },
  {
    id: 9,
    title: "作戦室",
    text_1: "軍司令部の壕もむし暑く、みんな半袖シャツに半ズボンの軽装だった。",
    text_2:
      "裸電球をつるした通路を２００㍍ほど進むと、南側の開口部に抜けられる。途中には右側に牛島満中将や長勇参謀長の居室があり、幕僚室や作戦会議室などの広間もあった。会議室の中からは通路が見えるが、会議中の時が多く、中をみないように小走りに通り過ぎるのだった。「沖縄一中鉄血勤皇隊の記録上」から\n",

    video_url_1:
      "https://drive.google.com/uc?export=download&id=1UuP4_6PBsX8l7FoNcNBGSnn9Sc6Lo2wN",
  },
  {
    id: 10,
    title: "アカギの木",
  },
  {
    id: 11,
    title: "第１坑口の衛兵",
    text_1:
      "通信指揮所から２０㍍と離れていないところに、軍司令部壕の北側入り口があった。そこには両側に常に衛兵が立っていて、出入りする者をチェックしているが、そこを大声で『伝令っ！』と叫びながら、いかにも前線の伝令らしく、すばやく壕内に飛び込むのである。伝令は天下御免だった。「沖縄一中鉄血勤皇隊の記録上」から",
  },
  {
    id: 12,
    title: "司令官室",
    text_1:
      "「司令官閣下の部屋は畳も敷かれて、とっても上等。普通の家みたいよ」。炊事婦だった大城光子さんは、ともに働く女性からこう聞かされた。",
    text_2:
      "司令官室の前を通りがかり、招き入れられた時には、周囲の様子が分からなくなるくらい緊張した。「君はどこの出身か」「中頭郡勝連村浜比嘉国民学校出身であります」。牛島司令官は「浜？浜？」とつぶやきながら、地図上の地名を探すそぶりだった。「うれしかったけど、早く逃げたかった」。１０代の少年たちにとって、軍首脳は雲の上の存在だった。沖縄タイムス連載『埋もれた戦　首里城地下３２軍壕』＝２０１２年掲載から",
    text_3: "",
    image_url_1: require("@/assets/image/figure18.jpg"),
    image_caption_1:
      "牛島司令官の部屋。第2坑道との交差点から第３坑道の西側に向かって撮影",
    image_url_2: require("@/assets/image/figure19.jpg"),
    image_caption_2: "牛島司令官の部屋",
  },
  {
    id: 13,
    title: "第３坑口",
    text_1: "",
    text_2: "",
    text_3: "",
    image_url_1: require("@/assets/image/figure16.png"),
    image_caption_1:
      "第3坑口。現在の城西小学校の敷地内にあり、守礼門のほぼ下あたりに位置していた",
    image_url_2: require("@/assets/image/figure17.jpg"),
    image_caption_2: "第3坑口から階段を見下ろす",
  },
  {
    id: 14,
    title: "第２坑道と第３坑道の結節点",
    text_1: "",
    text_2: "",
    text_3: "",
    image_url_1: require("@/assets/image/figure20.png"),
    image_caption_1: "第２坑道と第３坑道の交差点",
    image_url_2: require("@/assets/image/figure21.jpg"),
    image_caption_2: "第２坑道と第３坑道の交差点",
    image_url_3: require("@/assets/image/figure22.jpg"),
    image_caption_3: "",
    image_url_4: require("@/assets/image/figure23.png"),
    image_caption_4:
      "第2坑道の第32軍司令部作戦室で、日本軍が残した書類を調査する米軍",
    image_url_5: require("@/assets/image/figure24.jpg"),
    image_caption_5: "第32軍作戦室。この奥は第2坑口",
    video_url_1: "",
  },
  {
    id: 15,
    title: "第１坑道の爆破部",
    text_1: "",
    text_2: "",
    text_3: "",
    image_url_1: require("@/assets/image/figure25.jpg"),
    image_caption_1:
      "大規模な爆破部分で、第1坑道につながるが、米軍も立ち入れなかった区域",
    image_url_2: require("@/assets/image/figure29.jpg"),
    image_caption_2: "第32軍情報室(ポイント＃17)から爆破された第1坑道を見る",
  },
  {
    id: 16,
    title: "第２４師団司令部",
    image_url_1: require("@/assets/image/figure26.jpg"),
    image_caption_1: "第32軍情報室と第24師団作戦室",
    image_url_2: require("@/assets/image/figure27.jpg"),
    image_caption_2:
      "米軍は、第32軍情報室と第24師団作戦室でボードの後ろから大量の文書を見つけた",
  },
  {
    id: 17,
    title: "司令官室",
    image_url_1: require("@/assets/image/a.jpg"),
    image_caption_1:
      "４月中旬頃まで使われていたとみられる第１坑坑道中央の司令官室。那覇市歴史博物館提供",
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
    About,
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
      height: 15vh;
    }
  }
  .hooper-slide {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .slide-caption {
      font-size: 10px;
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
