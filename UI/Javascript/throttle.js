function throttle(fn, interval) {
  let lastArgs = null;
  let timer = null;

  return function (...args) {
    lastArgs = args;

    if (!timer) {
      timer = setInterval(() => {
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        } else {
          clearInterval(timer);
          timer = null;
        }
      }, interval);
    }
  };
}

function onScroll() {
  console.log("Scroll fired at", Date.now());
}

const throttledScroll = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScroll);