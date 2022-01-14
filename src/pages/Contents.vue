<template>
  <div id="contents" class="contents">
    <div v-for="item in items" :key="item.id">
      <div class="content-text-wrapper">
        <div v-if="item.contents.length > 0" class="content-title">
          <h2>{{ item.title }}</h2>
        </div>
        <div v-for="content in item.contents" :key="content.subtitle">
          <div class="content-text">
            <p>{{ content.subtitle }}</p>
            <p>
              {{ content.text }}
            </p>
          </div>

          <div class="slider">
            <hooper :settings="hooperSettings" ref="carousel">
              <slide>
                <div>
                  <img class="slide-image" :src="content.images" />
                </div>
              </slide>
            </hooper>
            <div class="slide-button">
              <a class="slide-prev-button" @click.prevent="slidePrev"
                ><svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
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
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="21.5" cy="21.5" r="21" stroke="#786B58" />
                  <path d="m28 18 5 5H10" stroke="#786B58" /></svg
              ></a>
            </div>
          </div>
        </div>
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
        infiniteScroll: true,
        itemsToShow: 2.1,
        breakpoints: {
          600: {
            itemsToShow: 4.1,
          },
        },
      },
      items: [
        {
          id: 1,
          title: "①３２軍とは",
          contents: [
            {
              subtitle: "住民参加の防衛態勢",
              text: "３２軍が創設されたのは、１９４４年３月下旬。沖縄戦が始まる約１年前だった。沖縄や奄美など大島などの南西諸島を「防衛」するのが役割とされた。\nだが、この「防衛」は日本軍の兵士が住民を守るというものではなかった。\n４４年の８月に着任した牛島満司令官は、「一木一草ト雖モ之ヲ戦力化スベシ（一本の木、一つの草までも戦力にしなければならない）」「（地方官民が）進ンデ戦力増強ニ寄与シテ郷土ヲ防衛セシムル如ク指導スベシ（住民が進んで戦力強化に協力し、沖縄を守るように指導しなければならない）」などと訓示した。\n牛島司令官は、当初から沖縄戦が住民を巻き込んだ戦闘になることを想定。戦闘前から住民を陣地壕構築などに動員した。首里の司令部壕は、近隣にあった師範学校や県立第一中学校の生徒らが作業を手伝った。",
              images: [
                require("@/assets/image/body-image_1.jpg"),
                require("@/assets/image/body-image_2.jpg"),
                require("@/assets/image/body-image_3.jpg"),
                require("@/assets/image/body-graphic_1.png"),
              ],
            },
            {
              subtitle: "本土決戦までの時間稼ぎ",
              text: "４４年７月にサイパンが陥落し、日本の「絶対国防圏」が事実上崩壊。１０月にはフィリピン・レイテ島に米軍が上陸し、日本軍は作戦の見直しに迫られた。大本営が下した判断は、沖縄を本土決戦の準備が整うまでの時間稼ぎとして、位置づけることだった。\n大本営は１１月、３２軍から精鋭部隊の第９師団（兵力約１万４千人）を台湾に移した。だが、代わりの兵力の補充はなかった。\n４５年１月には、新たな作戦「帝国陸海軍作戦計画大綱」が天皇の裁可を受けたが、沖縄は「皇国防衛ノ為ノ縦深作戦遂行上ノ前縁（天皇が統治する国を守るため、部隊全体の作戦を進める最前線）」、米軍が上陸した場合は「極力敵ノ出血消耗ヲ図リ（できるだけ敵の戦力を消耗させる）」と位置づけられた。３２軍には、米軍を１日でも長く沖縄に踏みとどめ、戦力を消耗させる「持久戦」が求められていた。\nだが、米軍の兵力約５４万人に対し、日本軍は約１０万人。牛島司令官の想定通り、３２軍は地元住民も動員する形で、戦力を自力で増強させるしかなかった。\n防衛招集で学徒を含む１７歳～４５歳までの男子を戦闘要員で総動員するなど、住民を巻き込んだ戦闘態勢ができあがっていった。",
              images: [
                require("@/assets/image/body-image_4.jpg"),
                require("@/assets/image/body-image_5.jpg"),
                require("@/assets/image/body-image_6.jpg"),
                require("@/assets/image/body-graphic_2.png"),
              ],
            },
          ],
        },
        {
          id: 2,
          title: "司令部壕はどんな場所だったのか",
          contents: [
            {
              subtitle: "司令部壕はなぜ首里に",
              text: "沖縄戦を指揮する３２軍は、発足直後は司令部を那覇市の蚕糸試験場に置いた。同時に米軍との戦闘に備えるため、南風原町津嘉山で壕の構築を始めた。\nただ、那覇市などが被害を受けた「１０・１０空襲」（１９４４年１０月）後、より強固な壕が必要と判断。１２月、首里に新たな司令部壕を造ることになった。\nなぜ首里だったのか。沖縄戦に詳しい仲村真さんによると、兵士たちは戦時には壕内で過ごすが、戦時以外は宿舎などが必要だ。首里には師範学校や県立第一中学など多数の教育施設があり、兵士たちの駐留に活用できると考えたという。\n４５年１月には、司令部は師範学校などに移転。米軍が慶良間諸島に上陸する２日前の３月２４日、３２軍の長勇・参謀長が壕入り口に、「天ノ巌戸戦斗司令所」と書かれた木札を掲げており、本格的な運用が始まったと考えられている。",
              images: [require("@/assets/image/body-graphic_3.png")],
            },
            {
              subtitle: "壕内部には何が",
              text: "県や米軍の調査によると、壕の総延長は約１㌔。\n地上からの深さは約１５～４０㍍と推定され、五つの坑道、五つの出入り口（坑口）があった。通路は崩落防止のため木材で支えられ、寝台も置かれていた。\n戦争体験者の証言や証言録によると、壕内部は蒸し暑く、壕の奥では空気も薄かった。送風機が何台も設置され、換気用の縦杭も２カ所あったとされる。\n壕外には発電機が置かれ、電線が壕内の天井を通っていた。電球や電灯が使われ、便所や風呂も将校・幕僚と一般向けにそれぞれ２カ所が設けられていた。\n司令官室や作戦室、宿舎、炊事場など３０以上の部屋があり、約１千人が生活していたとされる。高級参謀だった八原博通氏は、戦後自身の著書で「かつての銀座の夜店もかくやと想う。二六時中煌々たる無数の電灯、千余人の将兵を収容して、さながら一大地下ホテルの観がある」と回想している。",
              images: [
                require("@/assets/image/body-image_7.jpg"),
                require("@/assets/image/body-image_8.jpg"),
                require("@/assets/image/body-image_9.jpg"),
              ],
            },
            {
              subtitle: "厳しかった壕内のルール",
              text: "３２軍は壕での生活ルールを定めていた。起床就寝、食事などの時間が定められ、壕内のガス発生時の対応なども決められていた。\n注目すべきは、外部への警戒心の高さだ。入り口には監視兵が立ち、軍属は入るのに許可証が必要で、出入り口の秘匿や偽装を促すことも求めている。\n壕内は標準語以外の使用も禁止されていた。理由はスパイを見つけるため。沖縄語で話した場合は、「スパイとみなして処分」という厳しい規定もあった。",
              images: [require("@/assets/image/body-graphic_4.png")],
            },
          ],
        },
        {
          id: 3,
          title: "司令部壕にいた人たち",
          contents: [
            {
              subtitle: "二つの留守名簿",
              text: "３２軍の司令部壕にはどんな人たちがいたのか。それを知る重要な手がかりが、二つの「留守名簿」だ。\n名簿は１９４４年末、国内外に展開する日本軍の各部隊が作成した。所属者の部隊への編入日や本籍、家族の住所や続柄、給与や役割などを明記。兵士ではなく、雑務に従事する「軍属」も記載されていた。\n３２軍は、４４年末から４５年はじめにかけて、司令部の名簿（南方）を作成。約１千人余が記載されている。\nただ、南方には徴兵検査を受けずに動員された沖縄県民が抜け落ちていた。厚生省（現厚生労働省）は７１年、生き残った人たちへ聞き取りなどをし、もう一つの名簿（沖縄）を作った。",
              images: [
                require("@/assets/image/body-image_10.jpg"),
                require("@/assets/image/body-image_11.jpg"),
              ],
            },
            {
              subtitle: "根こそぎ動員の実態",
              text: "二つの名簿を分析すると、住民や学生、女性まで戦力化する「根こそぎ動員」の実態が見えてくる。\n名簿の中で、沖縄県民は少なくとも６７６人が確認できる。残りは、他県から集められた兵士や軍属と考えられている。\n沖縄県民を詳細に分析する。性別は男性５１３人、女性１６２人、不明１人。年代別では、１４～１９歳までの１０代と２０代が４０６人で全体の６割を占めた。\n身分は、軍属が３６２人と、兵士の３１１人を上回っていた。軍属は、事務作業や馬の世話、食事の用意などさまざまな雑務で、兵士たちを支えていた。\n県民６７６人のうち、戦死者は５００人。その割合は、７割を超えていた。１４～１９歳は、２０５人中１８１人と９割近くに達した。",
              images: [require("@/assets/image/body-graphic_4.png")],
            },
            {
              subtitle: "100人を超える学徒",
              text: "留守名簿では、沖縄師範学校の６２人など、少なくとも学徒１１３人の氏名が確認されている。学生たちは、司令部壕でどんなことをしていたのだろうか。\n１９４４年１２月、３２軍司令部と県は、中等学校生徒の戦場動員を協議。４５年３月の米軍上陸目前には、県内の師範学校と中等学校の１４歳から１９歳の男子生徒は、上級生が「鉄血勤皇隊」、下級生が「通信隊」として組織化された。\n鉄血勤皇隊の一部は、３２軍の直属部隊に配属された。弾薬運搬や負傷者の搬送、破壊された道路や橋の修理などで軍を支えた。\n鉄血勤皇隊で動員された学徒の証言によると、第５坑口付近にあった発電機を冷やすため、井戸から引き上げた水を運ぶ役割や、総延長１千㍍を超える壕を掘る作業なども担った。\n女子学徒（１４歳～１９歳）は、主に看護にあたった。",
              images: [require("@/assets/image/body-image_12.jpg")],
            },
            {
              subtitle: "４分の１は女性",
              text: "留守名簿からは、県民の約４分の１が女性だったことが判明した。彼女たちの役割は何だったのか。\nその一つが炊事だ。生存者たちの話では、女性たちは、第５坑口付近の炊事場の近くで一升瓶に玄米を入れて、瓶の中を細い棒で突いて精米をしていたという。イモを洗い、切る作業をしたという人もいた。\n学徒たちが担っていた壕掘り作業を手伝い、泥にまみれて土運びをしていたという話や、芸者や遊女がいたという回想も。留守名簿には「特殊軍属」の名目で動員された女性たちの記載があり、「慰安婦」を指すとの指摘もある。\n壕内にいた女性が、日本兵の命令で、米兵やスパイ容疑をかけられた住民を殺害しようとする場面を見たという証言も残っている。",
              images: [
                require("@/assets/image/body-image_13.jpg"),
                require("@/assets/image/body-image_14.jpg"),
              ],
            },
          ],
        },
        {
          id: 4,
          title: "④ 南部撤退の判断はいかに",
          contents: [
            {
              subtitle: "追い詰められた３２軍",
              text: "４５年４月１日、沖縄本島中部の西海岸から上陸した米軍は、日本軍の飛行場を相次いで占領。わずか１週間程度で、嘉数高地（宜野湾市）北方に進出する。\nその後も、米軍は前田高地（浦添市）、シュガー・ローフ（那覇市）で日本軍との激しい戦いを制し、５月２０日ごろには３２軍の司令部がある首里に接近した。 首里での防衛が風前のともしびとなる中で、３２軍の首脳部は２１日夜、各兵団の参謀長、参謀を司令部壕に招集した。残された３２軍の兵力は約３万。これからどう戦うかを協議した。\n高級参謀・八原博通氏の回想では、集まったのは第３坑道の参謀の寝室。すぐ近くには牛島満司令官の部屋があり、席上には、パイナップルやホタテの缶詰、ぶどう酒が準備された。",
              images: [
                require("@/assets/image/body-image_15.jpg"),
                require("@/assets/image/body-image_16.jpg"),
                require("@/assets/image/body-graphic_5.png"),
              ],
            },
            {
              subtitle: "住民の命か、軍論理か",
              text: "その席で検討された案は三つ。①首里で最後まで戦う②東の知念半島に撤退③南の喜屋武半島に撤退。\n各兵団の意見は「運べない重傷者が充満しており、戦友は見捨てられない（首里での戦闘に賛成）」「数十台の車があり、軍需品も運ぶことが可能だ（撤退を支持）」などと分かれた。\n喜屋武半島は身を潜める洞窟が豊富で、海側には３０～４０㍍の崖があり、海から攻める米軍の兵士たちが登ることは困難だ。一方で、島田叡・沖縄県知事は住民が戦闘に巻き込まれる懸念から撤退に反対した。\n牛島満司令官は２２日夕、喜屋武半島への南部撤退を決断。負傷者や軍需品を南部に送るよう命令した。\nしかし、既に南部に逃げていた１０万人近い住民をどう守るのか。指示や方針が出されることはなかった。ここから約１カ月、軍民混在の戦場で、住民たちはさまよい続けることになる。\n沖縄戦で犠牲になった一般県民は約９万４千人。このうち、南部撤退後の６月に亡くなったのは約４万７千人に及ぶ。半数が、南部撤退後の犠牲者だった。",
              images: [
                require("@/assets/image/body-image_16.jpg"),
                require("@/assets/image/body-graphic_6.png"),
              ],
            },
          ],
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
<style lang="scss" scoped>
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
    width: 20vw;
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
@media screen and (max-width: 559px) {
  .content-text-wrapper {
    padding: 3.75em 1em 0;
    .content-title {
      inline-size: auto;
      margin-bottom: 1em;
      overflow-wrap: normal;
      h2 {
        margin: 0;
        font-size: 1.5em;
        font-weight: normal;
        letter-spacing: 0.4em;
        line-height: 1.3em;
      }
    }
    .content-text {
      inline-size: auto;
      margin-left: auto;
      line-height: 1.8em;
    }
  }
  .hooper {
    height: 150px;
  }
  .slider {
    margin-top: 0;
  }
  .hooper-slide {
    padding: 0.625em;
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
    justify-content: center;
    padding: 1em 0 1.5em;

    .slide-prev-button {
      margin-right: 2em;
    }
  }
}
</style>
