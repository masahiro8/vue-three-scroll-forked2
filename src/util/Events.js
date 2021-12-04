export const ScrollCallback = (callback) => {
  window.addEventListener("scroll", () => {
    callback(window.pageYOffset);
  });
};

export const STATE = {
  UNDER: { id: 1, label: "under" },
  ENTER_TOP: { id: 2, label: "enter_top" },
  ENTER_FIX: { id: 3, label: "enter_fix" },
  ENTER_BOTTOM: { id: 4, label: "enter_bottom" },
  OVER: { id: 4, label: "over" },
};

export const EnterState = ({ rect, fixLength, callback, scrollCallback }) => {
  let isFix = false;

  window.addEventListener("scroll", () => {
    //セクション位置
    const sectionTop = rect.top;
    const sectionBottom = rect.top + rect.height;

    //スクロール位置
    const scrollTop = window.pageYOffset;
    const scrollBottom = window.pageYOffset + window.innerHeight;

    //固定するときにスクロールの遊びを考慮する日ピクセル数
    const fixRange = 100;

    //状態
    let state = STATE.OVER;

    //固定ピクセル検知
    if (isFix) {
      const scrollRangeTop = rect.top;
      const scrollRangeBottom = rect.top + fixLength - window.innerHeight;
      //移動量を正規化
      let move =
        (scrollTop - scrollRangeTop) / (scrollRangeBottom - scrollRangeTop);

      // 前後にマージンをとらないとメッシュの座標でエラーになる
      move = move < 0.05 ? 0.05 : move;
      move = move > 0.95 ? 0.95 : move;
      scrollCallback(move);

      if (scrollTop < scrollRangeTop || scrollTop > scrollRangeBottom) {
        isFix = false;
      }
      return;
    }

    // スクロール時
    if (!isFix) {
      // console.log(
      //   "section",
      //   sectionTop,
      //   sectionBottom,
      //   "scroll",
      //   scrollTop,
      //   scrollBottom
      // );
      if (sectionTop > scrollBottom && sectionBottom > scrollBottom) {
        state = STATE.UNDER;
      } else if (
        sectionTop < scrollBottom &&
        sectionTop > scrollTop &&
        sectionBottom > scrollBottom
      ) {
        state = STATE.ENTER_TOP;
      } else if (
        (sectionTop <= scrollTop + fixRange &&
          sectionTop >= scrollTop - fixRange) ||
        (sectionBottom <= scrollTop + window.innerHeight + fixRange &&
          sectionBottom >= scrollTop + window.innerHeight - fixRange)
      ) {
        state = STATE.ENTER_FIX;
        isFix = true;
      } else if (sectionTop < scrollTop && sectionBottom > scrollTop) {
        state = STATE.ENTER_BOTTOM;
      } else if (sectionTop < scrollTop && sectionBottom < scrollTop) {
        state = STATE.OVER;
      }
    }
    callback(state);
  });
};
