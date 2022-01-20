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
  import { Scene } from "./components/scene";
  import { STATE, EnterState } from "../../util/Events";

  let scene;

  //固定スクロールする範囲
  const fixLength = 5000;

  // カメラの移動座標
  const cameraPositions = [
    { x: 100, y: 20, z: 50 },
    { x: 20, y: -20, z: 25 },
    { x: -20, y: -20, z: 0 },
    { x: -20, y: 20, z: 10 },
  ];

  // 注視点の移動座標
  const targetPositons = [
    { x: 5, y: 5, z: 0 },
    { x: 30, y: -5, z: 0 },
    { x: -35, y: -5, z: 0 },
  ];

  // イベント
  export const callbackEvents = [
    { id: 1, start: 0.05, length: 0.1 },
    { id: 2, start: 0.1, length: 0.1 },
    { id: 3, start: 0.15, length: 0.1 },
    { id: 4, start: 0.2, length: 0.1 },
    { id: 5, start: 0.25, length: 0.1 },
    { id: 6, start: 0.3, length: 0.1 },
    { id: 7, start: 0.35, length: 0.1 },
    { id: 8, start: 0.4, length: 0.1 },
    { id: 9, start: 0.45, length: 0.1 },
    { id: 10, start: 0.5, length: 0.1 },
    { id: 11, start: 0.55, length: 0.1 },
    { id: 12, start: 0.6, length: 0.1 },
    { id: 13, start: 0.65, length: 0.1 },
    { id: 14, start: 0.7, length: 0.1 },
    { id: 15, start: 0.75, length: 0.1 },
    { id: 16, start: 0.8, length: 0.1 },
    { id: 17, start: 0.85, length: 0.1 },
  ];

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
      src: {
        type: String,
      },
      callInfoEvent: {
        type: Function,
      },
    },
    mounted() {
      console.log("Three");
      const width = window.innerWidth;
      const height = window.innerHeight;

      scene = Scene();
      scene.init({ canvasId: "three", width, height });
      scene.animate();

      //ここでオブジェクトをシーンに追加
      this.addObject();

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
    methods: {
      addObject() {
        // scene.addObject({
        //   radius: 5,
        //   segments: 32,
        //   position: new THREE.Vector3(0.0, 0.0, 0.0),
        // });
        // const loader = new GLTFLoader();
        // const url = "/public/data/desk_v2.gltf";
        // loader.load(url, (data) => {
        //   const gltf = data;
        //   const object = gltf.scene;
        //   this.scene.add(object);
        // });
        scene.addGLTF(this.src);

        //カメラ移動パス作成
        scene.setCameraPositions(cameraPositions);

        //注視点パス作成
        scene.setTargetPositions(targetPositons);
      },
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
