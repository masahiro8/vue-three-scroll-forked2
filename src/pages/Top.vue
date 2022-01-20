<template>
  <div class="wrap-video">
    <div class="text">
      <p class="subtitle">沖縄本土復帰50周年</p>
      <h2 class="title">OKINAWA 第32軍壕</h2>
    </div>
    <div v-if="src" class="movie">
      <video :src="src" muted autoplay loop></video>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      src: {
        type: String,
        defaultValue: null,
      },
    },
  };
</script>
<style lang="scss" scoped>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  .wrap-video {
    display: flex;

    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .movie {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    video {
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: auto;
      height: auto;
      min-width: 100%;
      min-height: 100%;
      transform: translate(-50%, -50%);
    }
  }

  .wrap-video .text {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    color: #ffffff;
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
  }

  @media screen and (max-width: 559px) {
    .wrap-video {
      height: 100vh;
      width: 100%;
    }
    .wrap-video .text {
      .subtitle {
        font-size: 1.2em;
        margin: 0;
        letter-spacing: 0.435em;
      }
      .title {
        font-size: 1.8em;
        font-weight: normal;
        margin: 0;
        letter-spacing: 0.25em;
      }
    }
  }
</style>
