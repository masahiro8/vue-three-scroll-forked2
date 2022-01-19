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
    { id: 1, start: 0.07, length: 0.1 },
    // { id: 2, start: 0.15, length: 0.1 },
    // { id: 3, start: 0.23, length: 0.1 },
    // { id: 4, start: 0.3, length: 0.1 },
    // { id: 5, start: 0.37, length: 0.1 },
    // { id: 6, start: 0.44, length: 0.1 },
    // { id: 7, start: 0.51, length: 0.1 },
    // { id: 8, start: 0.58, length: 0.1 },
    // { id: 9, start: 0.65, length: 0.1 },
    // { id: 10, start: 0.72, length: 0.1 },
    // { id: 11, start: 0.79, length: 0.1 },
    // { id: 12, start: 0.86, length: 0.1 },
  ];

  const modelUrl = "/data/sampleAnim.glb";

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
    transform: scaleY(-1) scaleX(-1);
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
