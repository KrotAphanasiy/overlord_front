const BASE64 = {
  encode(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
  },
  decode(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
  },
};

export default BASE64;
