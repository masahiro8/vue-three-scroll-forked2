<template>
  <div class="wrap-video">
    <div class="text">
      <p class="subtitle">沖縄本土復帰50周年</p>
      <h2 class="title">OKINAWA 第32軍壕</h2>
    </div>

    <video
      src="https://drive.google.com/uc?export=download&id=140fJvsoSwkQHxq5NWucoi0wkqhBo6rsl"
      muted
      autoplay
      loop
    ></video>
  </div>
</template>

<style lang="scss" scoped>
.wrap-video {
  display: flex;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrap-video video {
  width: 100%;
}

.wrap-video .text {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;

  .subtitle {
    font-size: 24px;
    margin: 0;
    letter-spacing: 0.435em;
  }
  .title {
    font-size: 36px;
    font-weight: normal;
    margin: 0;
    letter-spacing: 0.435em;
  }
}

@media screen and (max-width: 559px) {
  .wrap-video {
    height: 100vh;
    width: 100%;
  }
}
</style>
