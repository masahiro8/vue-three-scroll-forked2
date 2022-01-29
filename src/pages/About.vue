<template>
  <div class="about">
    <div class="about-contents">
      <p>
        &emsp;首里城の地下約３０㍍に、７７年前の沖縄戦で使われた旧日本軍「第３２軍」の司令部壕がある
        。現在まで公開されたことはなく、内部は謎に包まれたままだ。
      </p>
      <p>
        &emsp;米軍に追い詰められた第３２軍は、首里の司令部では徹底抗戦せず、南部に撤退して最後まで
        戦う「南部撤退」をこの場所で決断。その結果、多くの県民が戦闘に巻き込まれ、命を落とした。
      </p>
      <p>
        &emsp;壕はどういった場所で、そこにはどんな人がいたのか。第３２軍は南部にどうやって撤退し、終焉
        を迎えたのか。沖縄戦を指揮した第３２軍の中枢壕は、戦後なぜ放置されてきたのか。
      </p>
      <p>
        &emsp;第３２軍とその司令部壕に焦点を当てて、沖縄戦と戦後の沖縄社会の実相に迫っていく。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .about {
    background: url("~@/assets/image/background.png");
    background-size: cover;
    background-position: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }
  .about-contents {
    margin: auto;
    width: 58.125em;
    position: relative;
    z-index: 1;
    p {
      padding-top: 1.875em;
      font-size: 18px;
      margin: 0;
      line-height: 2.25em;
      letter-spacing: 0.4em;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 559px) {
    .about-contents {
      padding: 48px 15px 15px;
      position: relative;
      z-index: 1;
      p {
        padding-top: 1.875em;
        font-size: 18px;
        margin-right: -0.5em;
        line-height: 2.25em;
        letter-spacing: 0.28em;
        font-weight: 600;
      }
    }
  }
</style>
