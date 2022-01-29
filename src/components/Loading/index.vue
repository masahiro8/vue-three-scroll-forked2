<template>
  <div class="Loading">
    <div class="Loading__label">
      <div class="Loading__label__text">O K I N A W A</div>
      <div class="Loading__label__text">第 3 2 軍 壕</div>
    </div>

    <div class="Loading__progress">
      <div class="progress__bar">
        <div class="progress__current" :style="`width:${progress}%`"></div>
      </div>
      <div class="Loading__text">
        <span>{{ `${progress.toFixed(2)}%` }}</span>
      </div>
    </div>

    <div class="Loading__line"></div>
  </div>
</template>
<script>
  export default {
    props: {
      progress: {
        type: Number,
        defaultValue: 0,
      },
    },
  };
</script>
<style lang="scss" scoped>
  .Loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(30, 30, 30);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }

  .Loading__label {
    color: white;
    text-orientation: upright;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // height: 50%;
    font-size: 1.1em;
    text-align: center;
  }

  .Loading__label__text {
    margin: 8px 0;
  }

  .Loading__text {
    color: #666;
    letter-spacing: 2px;
    font-size: 0.6em;
  }

  .Loading__progress {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Loading__line {
    width: 1px;
    height: 8%;
    background-color: #666;
    position: absolute;
    left: 50%;
    bottom: 0;
  }

  .progress__bar {
    width: 100px;
    height: 2px;
    background-color: #444;
    position: relative;
    margin: 8px 0;

    .progress__current {
      height: 2px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #aaa;
    }
  }
</style>
