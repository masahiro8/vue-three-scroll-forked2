<template>
  <div ref="three" class="wrapper" :style="goastSectionStyle">
    <div class="section" :class="extraClass">
      <div id="three" />
      <!-- <button class="btn1" @click.prevent="addPoint">start</button> -->
    </div>
    <div class="goastSection"></div>
  </div>
</template>
<script>
  // eslint-disable-next-line
  //import * as THREE from "three";
  // eslint-disable-next-line
  import * as THREE from "three/build/three.module";
  import { Scene } from "./components/scene_animate";
  import { STATE, EnterState } from "../../util/Events";

  let scene;

  //固定スクロールする範囲
  const fixLength = 10000;

  // イベント
  export const callbackEvents = [
    { id: 1, start: 0.025, length: 0.01 }, //2.田んぼ
    { id: 2, start: 0.045, length: 0.01 }, //1.発電機
    { id: 3, start: 0.105, length: 0.01 }, //5.電球
    { id: 4, start: 0.153, length: 0.01 }, //4.女性たちの部屋、炊事場
    { id: 5, start: 0.219, length: 0.01 }, //3.トロッコレール
    { id: 6, start: 0.348, length: 0.01 }, //6. 水が噴出
    { id: 7, start: 0.468, length: 0.01 }, //7. 参謀室辺りの第１坑道
    { id: 8, start: 0.471, length: 0.01 }, //8. 第１坑道の参謀室
    { id: 9, start: 0.481, length: 0.01 }, //9. 作戦室
    { id: 10, start: 0.547, length: 0.01 }, //16. 第２４師団司令部
    { id: 11, start: 0.589, length: 0.01 }, //15. 第１坑道の爆破部
    { id: 12, start: 0.727, length: 0.01 }, //10. アカギの木
    { id: 13, start: 0.911, length: 0.01 }, //14. 第２坑道と第３坑道の結節点
    { id: 14, start: 0.92, length: 0.01 }, //12. 司令官室
  ];

  const modelUrl = "/data/data.glb";

  export default {
    name: "ThreeScene",
    data: () => {
      return {
        initializedThree: false,
        rect: null,
        extraClass: ``,
        goastSectionStyle: ``,
      };
    },
    props: {
      callInfoEvent: {
        type: Function,
      },
    },
    mounted() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      scene = Scene();
      scene.init({
        modelUrl: modelUrl,
        canvasId: "three",
        width,
        height,
      });

      //高さ固定
      const fixRange = callbackEvents
        .map((item) => {
          return item.length;
        })
        .reduce((sum, item) => sum + item);

      const extendLength = fixLength + fixLength * fixRange;

      this.goastSectionStyle = `height:${extendLength}px;`;
      this.$nextTick(() => {
        // セクション範囲
        const rect = this.$refs.three.getBoundingClientRect();
        EnterState({
          rect: rect,
          events: callbackEvents,
          // スクロール範囲ピクセル
          fixLength,
          //固定する時間
          fixRange,
          // スクロールで固定
          callback: (state) => {
            if (state.id === STATE.ENTER_FIX.id) {
              this.extraClass = "fix";
            } else if (
              state.id === STATE.ENTER_BOTTOM.id ||
              state.id === STATE.OVER
            ) {
              this.extraClass = "fixBottom";
            } else {
              this.extraClass = "";
            }
          },
          // 3dにスクロール量を渡す
          scrollCallback: (v, d) => {
            // console.log(v, d);
            scene.setMoveProgress(d);
          },
          // イベントトリガー
          eventCallback: this.callInfoEvent,
        });
      });
    },
  };
</script>
<style scoped>
  body {
    margin: 0;
    overflow: hidden;
  }
  #three {
    width: 100%;
    height: 100%;
    /* border: 10px solid red; */
    box-sizing: border-box;
    /* transform: scaleY(-1) scaleX(-1); */
  }

  .wrapper {
    position: relative;
  }

  .section {
    position: absolute;
    top: 0;
    z-index: 1;
    transition-property: top, bottom;
    transition-duration: 0.8s, 0.8s;
    transition-timing-function: ease-out, ease-out;
  }
  .section.fix {
    position: fixed;
    bottom: 0;
  }
  .section.fixBottom {
    position: absolute;
    top: auto;
    bottom: 0;
  }

  .goastSection {
    position: relative;
    background-color: green;
  }

  .btn1 {
    position: absolute;
    top: 100px;
    left: 50%;
    z-index: 99;
  }

  .btn2 {
    position: absolute;
    bottom: 100px;
    left: 50%;
    z-index: 99;
  }
</style>
