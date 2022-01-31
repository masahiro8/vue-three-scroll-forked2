const animationCallback = (func) => {
  const loop = () => {
    func();
    requestAnimationFrame(loop);
  };
  loop();
};

export const ScrollSequence = () => {
  let target;
  let speed = 100;

  // スクロール完了でpromise返す
  const scrollTo = (id, _speed) => {
    speed = _speed ?? 10;
    return new Promise((resolve) => {
      const section = document.getElementById(id);
      const rect = section.getBoundingClientRect();
      target = rect.top + window.pageYOffset;

      const easeOutSine = (x) => {
        return Math.sin((x * Math.PI) / 2);
      };

      let ys = [];
      for (let i = 0; i < speed; i++) {
        const y = easeOutSine(i / speed);
        const n = (target - window.pageYOffset) * y;
        ys.push(n);
      }

      update(ys, speed, window.pageYOffset, () => {
        resolve();
      });
    });
  };

  //アニメーション
  const update = (ys, speed, offset, callback) => {
    let n = 0;
    animationCallback(() => {
      if (n < speed) {
        window.scrollTo(0, offset + ys[n]);
      }
      n++;
    });
    if (speed === n) {
      callback();
    }
  };

  return {
    scrollTo,
  };
};
