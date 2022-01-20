<template>
  <div class="Loading">
    <div class="Loading__label">
      <div>O K I N A W A</div>
      <div>第 3 2 軍 壕</div>
    </div>
    <div class="Loading__text">Loading</div>
    <div class="Loading__line"></div>
  </div>
</template>
<script>
  export default {};
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
    height: 50%;
    font-size: 1.1em;
  }

  .Loading__text {
    color: #666;
    letter-spacing: 2px;
    font-size: 0.8em;
  }

  .Loading__line {
    width: 1px;
    height: 8%;
    background-color: #666;
    position: absolute;
    left: 50%;
    bottom: 0;
  }
</style>
