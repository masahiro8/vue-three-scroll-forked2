<template>
  <div class="fotter">
    <div class="fotter-contents">
      <p class="subtitle">沖縄本土復帰50周年</p>
      <h2 class="title">OKINAWA 第32軍壕</h2>

      <p class="text">System Supported By</p>
      <p class="subtitle">BACKHAM</p>
      <p class="text">
        沖縄タイムスのコンテンツにご興味のある方は<br />
        こちらからお申し込みください
      </p>
      <div class="box">
        <img
          class="logo-image"
          src="@/assets/image/okinawa-times-plus_logo.png"
        />
      </div>
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
.fotter-contents {
  text-align: center;
  padding: 10.8125em 0;
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
  .box {
    padding: 0.5em 1em;
    margin: 0 auto;
    color: #2c2c2f;
    background: #d9dccc;
    max-width: 403px;
    margin-top: 2.8125em;
    img {
      width: 80%;
      height: auto;
    }
  }
}
@media screen and (max-width: 559px) {
  .fotter-contents {
    padding: 6.25em 0;
    color: #ffffff;
    position: relative;
    z-index: 1;
    .subtitle {
      font-size: 1.2em;
      letter-spacing: 0.4em;
    }
    .title {
      font-size: 1.8em;
      font-weight: normal;
      letter-spacing: 0.25em;
    }
    .text {
      font-size: 1em;
      letter-spacing: 0.08em;
      margin-bottom: 0;
    }
    .box {
      width: 18.75em;
    }
  }
}
</style>
