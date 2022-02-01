export const isIOS = () => {
  let ua = navigator.userAgent;
  return ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0;
};
