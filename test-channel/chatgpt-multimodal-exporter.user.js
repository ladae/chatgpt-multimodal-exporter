// ==UserScript==
// @name         ChatGPT-Multimodal-Exporter TEST
// @namespace    chatgpt-multimodal-exporter-test
// @version      0.7.2.2
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
// @require      https://raw.githubusercontent.com/ladae/chatgpt-multimodal-exporter/improve_autosave_reliability_audit/release-v2.4-validation/chatgpt-multimodal-exporter.user.js
// ==/UserScript==

// TEST channel loader only. The actual exporter build is executed via @require
// inside the Tampermonkey userscript sandbox, so GM_* APIs remain available.
