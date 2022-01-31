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

export const EnterState = ({
  rect,
  events,
  fixLength,
  fixRange,
  callback,
  scrollCallback,
  eventCallback,
}) => {
  let isFix = false;

  // 固定時間分を拡張
  const extendBottom = fixLength + fixLength * fixRange;

  // イベント停止範囲に変換し拡張した時間で正規化
  const _events = events.map((event) => {
    const end = event.start + (fixLength * event.length) / extendBottom;
    return { ...event, end, isFreeze: false };
  });

  //スクロール固定時の値を保持
  let move = 0;

  //スクロール固定時間
  let prevProgress = 0;

  window.addEventListener("scroll", () => {
    //セクション位置
    const sectionTop = rect.top;
    const sectionBottom = rect.top + rect.height;

    //スクロール位置
    const scrollTop = window.pageYOffset;
    const scrollBottom = window.pageYOffset + window.innerHeight;

    //固定するときにスクロールの遊びを考慮する日ピクセル数
    const margin = 100;

    //状態
    let state = STATE.OVER;

    //固定ピクセル検知
    if (isFix) {
      const scrollRangeTop = rect.top;
      const scrollRangeBottom = rect.top + extendBottom - window.innerHeight;

      //移動量を正規化
      let progress =
        (scrollTop - scrollRangeTop) / (scrollRangeBottom - scrollRangeTop);

      //イベントコールバック
      let hasFreeze = false;
      for (let i = 0; i < _events.length; i++) {
        const isRange =
          _events[i].start <= progress && _events[i].end > progress;
        _events[i].isFreeze = isRange;
        if (isRange) {
          hasFreeze = true;
        }
      }

      if (!hasFreeze) {
        move += progress - (prevProgress == 0 ? progress : prevProgress);
      }

      // イベント
      const results = _events.map((event) => {
        return { id: event.id, isFreeze: event.isFreeze };
      });
      eventCallback({ move, progress, results });

      // 前後にマージンをとらないとメッシュの座標でエラーになる
      move = move < 0.05 ? 0.05 : move;
      move = move > 0.95 ? 0.95 : move;
      scrollCallback(progress, move);

      prevProgress = progress;

      if (scrollTop < scrollRangeTop || scrollTop > scrollRangeBottom) {
        isFix = false;
      }
      return;
    }

    // スクロール時
    if (!isFix) {
      if (sectionTop > scrollBottom && sectionBottom > scrollBottom) {
        state = STATE.UNDER;
      } else if (
        sectionTop < scrollBottom &&
        sectionTop > scrollTop &&
        sectionBottom > scrollBottom
      ) {
        state = STATE.ENTER_TOP;
      } else if (
        (sectionTop <= scrollTop + margin &&
          sectionTop >= scrollTop - margin) ||
        (sectionBottom <= scrollTop + window.innerHeight + margin &&
          sectionBottom >= scrollTop + window.innerHeight - margin)
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
