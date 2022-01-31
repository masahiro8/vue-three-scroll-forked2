<template>
  <div class="scrollNavi">
    <!-- <button v-if="navi.prev" @click.prevent="goPrev">Prev</button> -->
    <a class="next-button" v-if="navi.next" @click.prevent="goNext">
      <svg
        width="71"
        height="88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M70.5 35.523c0 19.343-15.67 35.023-35 35.023S.5 54.866.5 35.523C.5 16.18 16.17.5 35.5.5s35 15.68 35 35.023Z"
          stroke="#fff"
        />
        <path d="m22 44.648 13.5 13.5 13.5-13.5" stroke="#fff" />
        <path d="m22 31.763 13.5 13.5 13.5-13.5M36 14v30.553" stroke="#fff" />
      </svg>
    </a>
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
<style lang="scss" scoped>
  .scrollNavi {
    position: fixed;
    left: 50%;
    bottom: 5%;
    max-width: 71px;
    height: auto;
    transform: translate(-50%, 0);

    .next-button {
      width: 100%;
    }
  }
</style>
