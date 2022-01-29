<template>
  <div class="header">
    <div>
      <img
        class="header-logo"
        src="@/assets/image/okinawa-times-plus_logo.png"
      />
    </div>
    <ul class="header-content">
      <li><img class="icon" src="@/assets/logo.png" /></li>
      <li class="header-text">
        <p class="subtitle">沖縄本土復帰50周年</p>
        <p class="title">知る32軍壕</p>
      </li>
    </ul>
    <div class="header-sns">
      <button class="header-btn">
        <img :src="`./images/i_twitter.png`" alt="Twitter" />
      </button>
      <button class="header-btn">
        <img :src="`./images/i_facebook.png`" alt="Facebook" />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    .header-logo {
      width: 140px;
    }

    .header-sns {
      display: flex;
      padding: 0 8px;
    }

    .header-btn {
      margin: 0 4px;
      height: 32px;
      width: 32px;
      padding: 0;
      background: none;
      border: none;

      img {
        width: 100%;
      }

      &:hover {
        cursor: pointer;
      }
    }
    .header-content {
      padding: 0;
      margin: 0;
      .icon {
        width: 34px;
      }
      li {
        float: left;
        list-style: none;
      }
      .header-text {
        margin-left: 0.875em;
        color: #786b58;
        opacity: 0.4;
        letter-spacing: 0.435em;
      }
      .subtitle {
        font-size: 9px;
        margin: 0;
        padding: 0;
      }
      .title {
        font-size: 11px;
        margin: 0;
        padding: 0;
      }
    }

    @media screen and (max-width: 559px) {
      .header-logo {
        width: 80px;
      }

      .header-content {
        .header-text {
          margin-left: 2px;
        }
        .icon {
          width: 32px;
        }
        .subtitle {
          font-size: 8px;
          letter-spacing: 0;
        }
        .title {
          font-size: 8px;
        }
      }
    }
  }
</style>
