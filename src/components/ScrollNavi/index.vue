<template>
  <div class="scrollNavi">
    <button v-if="navi.prev" @click.prevent="goPrev">Prev</button>
    <button v-if="navi.next" @click.prevent="goNext">Next</button>
  </div>
</template>
<script>
import { ScrollSequence } from "./components/util";

export const SECTIONS = {
  LOADING: { id: "loading" },
  THREE: { id: "three" },
  CONTENTS: { id: "contents" },
};

// 配列へ
const sectionIdsArray = Object.keys(SECTIONS).map((key) => {
  return SECTIONS[key].id;
});

const sectionWatch = () => {
  let currentSection;
  const callbacks = [];

  // 現在のセクションを検出
  document.addEventListener("scroll", () => {
    for (let i = 0; i < sectionIdsArray.length; i++) {
      const rect = document
        .getElementById(sectionIdsArray[i])
        .getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) {
        currentSection = sectionIdsArray[i];
      }
    }

    // current,prev,next セクション決定
    for (let i = 0; i < callbacks.length; i++) {
      const index = sectionIdsArray.findIndex((item) => {
        return item === currentSection;
      });
      const current = currentSection;
      const prev = index == 0 ? null : sectionIdsArray[index - 1];
      const next =
        index == sectionIdsArray.length ? null : sectionIdsArray[index + 1];
      callbacks[i]({ current, prev, next });
    }
  });

  // 現在のセクションidを返す
  const setCallback = (func) => {
    callbacks.push(func);
  };

  return {
    setCallback,
  };
};

const scrollAnim = ScrollSequence();
const speed = 50;
const watcher = sectionWatch();

export default {
  data: () => {
    return {
      navi: {
        current: null,
        next: null,
        prev: null,
      },
    };
  },
  mounted() {
    watcher.setCallback(({ current, prev, next }) => {
      // console.log(current, prev, next);
      this.navi = { current, prev, next };
    });
  },
  methods: {
    //次へ遷移
    async goNext() {
      await scrollAnim.scrollTo(this.navi.next, speed);
    },
    async goPrev() {
      await scrollAnim.scrollTo(this.navi.prev, speed);
    },
  },
};
</script>
<style scoped>
.scrollNavi {
  position: fixed;
  left: 50%;
  bottom: 32px;
}
</style>