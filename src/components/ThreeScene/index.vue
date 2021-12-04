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
import * as THREE from "three";
import { Scene } from "./components/scene";
import { STATE, EnterState } from "../../util/Events";

let scene;

//固定スクロールする範囲
const fixLength = 2200;

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
  mounted() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = Scene();
    scene.init({ canvasId: "three", width, height });
    scene.animate();
    this.addPoint();

    //高さ固定
    this.goastSectionStyle = `height:${fixLength}px;`;
    this.$nextTick(() => {
      // セクション範囲
      const rect = this.$refs.three.getBoundingClientRect();
      EnterState({
        rect: rect,
        fixLength,
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
        scrollCallback: (v) => {
          scene.setMoveProgress(v);
        },
      });
    });
  },
  methods: {
    addPoint() {
      scene.addPoint({
        radius: 5,
        segments: 32,
        position: new THREE.Vector3(0.0, 0.0, 0.0),
      });

      //カメラ移動パス作成
      const positions = [
        { x: 100, y: 20, z: 50 },
        { x: 20, y: -20, z: 25 },
        { x: -20, y: -20, z: 0 },
        { x: -20, y: 20, z: 10 },
      ];
      scene.setCameraPositions(positions);

      const targetPositons = [
        { x: 5, y: 5, z: 0 },
        { x: 30, y: -5, z: 0 },
        { x: -35, y: -5, z: 0 },
      ];
      scene.setTargetPositions(targetPositons);
    },
  },
};
</script>
<style scoped>
#three {
  width: 100vw;
  height: 100vh;
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
