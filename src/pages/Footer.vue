<template>
  <div class="fotter">
    <div class="fotter-text">
      <p class="subtitle">沖縄本土復帰50周年</p>
      <h2 class="title">OKINAWA 第32軍壕</h2>

      <p class="text">System Supported By</p>
      <p class="subtitle">BACKHAM</p>
      <p class="text">
        沖縄タイムスのコンテンツにご興味のある方は<br />
        こちらからお申し込みください
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fotter {
  background: url("~@/assets/image/background.png");
  background-size: cover;
  background-position: 50%;
  position: relative;

  &::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
.fotter-text {
  text-align: center;
  padding-top: 10.8125em;
  color: #ffffff;
  position: relative;
  z-index: 1;
  .subtitle {
    font-size: 1.5em;
    margin: 0;
    letter-spacing: 0.435em;
  }
  .title {
    font-size: 2.25em;
    font-weight: normal;
    margin: 0;
    letter-spacing: 0.435em;
  }
  .text {
    font-size: 1.125em;
    letter-spacing: 0.1em;
  }
}
</style>
