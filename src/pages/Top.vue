<template>
  <div class="wrap-video">
    <div class="text">
      <p>沖縄本土復帰50周年</p>
      <h2>OKINAWA 第32軍壕</h2>
    </div>

    <video
      src="https://drive.google.com/uc?export=download&id=10E7B-FzMv0CJBC2csTqcrPuVwjWPZGoA"
      muted
      autoplay
      loop
    ></video>
  </div>
</template>

<style scoped>
.wrap-video {
  display: flex;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrap-video video {
  width: 100vw;
  height: 100vh;
}

.wrap-video .text {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

.wrap-video .text p {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
@media screen and (max-width: 559px) {
  .wrap-video {
    height: 100vh;
    width: 100%;
  }
}
</style>
