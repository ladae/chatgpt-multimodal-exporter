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
export const GM_download = (opts) => {
  if (opts && opts.onload) setTimeout(opts.onload, 10);
};
export const GM_xmlhttpRequest = (opts) => {
  if (opts && opts.onload) {
    setTimeout(() => {
      opts.onload({
        response: new Uint8Array([1, 2, 3, 4]).buffer,
        responseText: 'mock-bytes',
        responseHeaders: 'content-type: text/plain\r\n',
      });
    }, 10);
  }
};
export const GM_cookie = { list: async () => [] };
