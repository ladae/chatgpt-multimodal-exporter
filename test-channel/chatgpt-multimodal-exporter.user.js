// ==UserScript==
// @name         ChatGPT-Multimodal-Exporter TEST
// @namespace    chatgpt-multimodal-exporter-test
// @version      0.7.2.1
// @author       ha0xin
// @description  TEST CHANNEL - automaticky aktualizovaný build pro live ověření
// @license      MIT
// @icon         https://chat.openai.com/favicon.ico
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @connect      oaiusercontent.com
// @grant        GM_addStyle
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/ladae/chatgpt-multimodal-exporter/improve_autosave_reliability_audit/test-channel/chatgpt-multimodal-exporter.user.js
// @downloadURL  https://raw.githubusercontent.com/ladae/chatgpt-multimodal-exporter/improve_autosave_reliability_audit/test-channel/chatgpt-multimodal-exporter.user.js
// ==/UserScript==

// Bootstrap loader for the current validated test build.
// This first channel revision loads V2.4 directly; future CI will replace this file with the tested build itself.
(async () => {
  const url = 'https://raw.githubusercontent.com/ladae/chatgpt-multimodal-exporter/improve_autosave_reliability_audit/release-v2.4-validation/chatgpt-multimodal-exporter.user.js';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`TEST channel load failed: ${res.status}`);
  let code = await res.text();
  code = code.replace(/^\/\/ ==UserScript==[\s\S]*?^\/\/ ==\/UserScript==\s*/m, '');
  (0, eval)(code);
})();
