if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis;
}
if (typeof globalThis.location === 'undefined') {
  globalThis.location = { origin: 'https://chatgpt.com', pathname: '/', host: 'chatgpt.com' };
}
if (typeof globalThis.document === 'undefined') {
  globalThis.document = { cookie: '', createElement: () => ({ click() {}, remove() {} }), body: { appendChild() {} } };
}
if (typeof globalThis.XMLHttpRequest === 'undefined') {
  globalThis.XMLHttpRequest = class {
    open() {}
    send() {}
    setRequestHeader() {}
  };
}

export const unsafeWindow = globalThis.window;
export const GM_download = () => {};
export const GM_xmlhttpRequest = () => {};
export const GM_cookie = { list: async () => [] };
