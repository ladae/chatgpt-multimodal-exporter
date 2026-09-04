// ==UserScript==
// @name         ChatGPT-Multimodal-Exporter
// @namespace    chatgpt-multimodal-exporter
// @version      0.7.2
// @author       ha0xin
// @description  Export chatů ChatGPT do JSON včetně multimodálních souborů (obrázky, zvuk, sandbox soubory atd.)
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
// ==/UserScript==

(function () {
  'use strict';

  const d$3=new Set;const importCSS = async e=>{d$3.has(e)||(d$3.add(e),(t=>{typeof GM_addStyle=="function"?GM_addStyle(t):(document.head||document.documentElement).appendChild(document.createElement("style")).append(t);})(e));};

  var n$1, l$2, u$3, t$2, i$3, r$2, o$2, e$2, f$3, c$2, s$2, a$2, h$3, p$3 = {}, v$2 = [], y$3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, w$3 = Array.isArray;
  function d$2(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function g$4(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _$3(l2, u2, t2) {
    var i, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return m$2(l2, e2, i, r2, null);
  }
  function m$2(n2, t2, i, r2, o2) {
    var e2 = { type: n2, props: t2, key: i, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$3 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$2.vnode && l$2.vnode(e2), e2;
  }
  function b$2() {
    return { current: null };
  }
  function k$3(n2) {
    return n2.children;
  }
  function x$3(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function S(n2, l2) {
    if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C$2(n2) {
    var l2, u2;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
        n2.__e = n2.__c.base = u2.__e;
        break;
      }
      return C$2(n2);
    }
  }
  function M$2(n2) {
    (!n2.__d && (n2.__d = true) && i$3.push(n2) && !$$1.__r++ || r$2 != l$2.debounceRendering) && ((r$2 = l$2.debounceRendering) || o$2)($$1);
  }
  function $$1() {
    for (var n2, u2, t2, r2, o2, f2, c2, s2 = 1; i$3.length; ) i$3.length > s2 && i$3.sort(e$2), n2 = i$3.shift(), s2 = i$3.length, n2.__d && (t2 = void 0, r2 = void 0, o2 = (r2 = (u2 = n2).__v).__e, f2 = [], c2 = [], u2.__P && ((t2 = d$2({}, r2)).__v = r2.__v + 1, l$2.vnode && l$2.vnode(t2), O$1(u2.__P, t2, r2, u2.__n, u2.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f2, null == o2 ? S(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, N$1(f2, t2, c2), r2.__e = r2.__ = null, t2.__e != o2 && C$2(t2)));
    $$1.__r = 0;
  }
  function I$1(n2, l2, u2, t2, i, r2, o2, e2, f2, c2, s2) {
    var a2, h2, y2, w2, d2, g2, _2, m2 = t2 && t2.__k || v$2, b2 = l2.length;
    for (f2 = P$2(u2, l2, m2, f2, b2), a2 = 0; a2 < b2; a2++) null != (y2 = u2.__k[a2]) && (h2 = -1 == y2.__i ? p$3 : m2[y2.__i] || p$3, y2.__i = a2, g2 = O$1(n2, y2, h2, i, r2, o2, e2, f2, c2, s2), w2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && B$2(h2.ref, null, y2), s2.push(y2.ref, y2.__c || w2, y2)), null == d2 && null != w2 && (d2 = w2), (_2 = !!(4 & y2.__u)) || h2.__k === y2.__k ? f2 = A$3(y2, f2, n2, _2) : "function" == typeof y2.type && void 0 !== g2 ? f2 = g2 : w2 && (f2 = w2.nextSibling), y2.__u &= -7);
    return u2.__e = d2, f2;
  }
  function P$2(n2, l2, u2, t2, i) {
    var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i), r2 = 0; r2 < i; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = m$2(null, o2, null, null, null) : w$3(o2) ? o2 = n2.__k[r2] = m$2(k$3, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = m$2(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, -1 != (c2 = o2.__i = L$1(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i > s2 ? h2-- : i < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), D$2(e2, e2));
    return t2;
  }
  function A$3(n2, l2, u2, t2) {
    var i, r2;
    if ("function" == typeof n2.type) {
      for (i = n2.__k, r2 = 0; i && r2 < i.length; r2++) i[r2] && (i[r2].__ = n2, l2 = A$3(i[r2], l2, u2, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = S(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function H$1(n2, l2) {
    return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (w$3(n2) ? n2.some(function(n3) {
      H$1(n3, l2);
    }) : l2.push(n2)), l2;
  }
  function L$1(n2, l2, u2, t2) {
    var i, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == e2 || s2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (s2 ? 1 : 0)) {
      for (i = u2 - 1, r2 = u2 + 1; i >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i >= 0 ? i-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function T$2(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || y$3.test(l2) ? u2 : u2 + "px";
  }
  function j$2(n2, l2, u2, t2, i) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || T$2(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || T$2(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f$3, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c$2, n2.addEventListener(l2, r2 ? a$2 : s$2, r2)) : n2.removeEventListener(l2, r2 ? a$2 : s$2, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u2 ? "" : u2;
        break n;
      } catch (n3) {
      }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
    }
  }
  function F$3(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2.t) u2.t = c$2++;
        else if (u2.t < t2.u) return;
        return t2(l$2.event ? l$2.event(u2) : u2);
      }
    };
  }
  function O$1(n2, u2, t2, i, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, _2, m2, b2, S2, C2, M2, $2, P2, A2, H2, L2, T2, j2 = u2.type;
    if (null != u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$2.__b) && a2(u2);
    n: if ("function" == typeof j2) try {
      if (b2 = u2.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i, t2.__c ? m2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (S2 ? u2.__c = h2 = new j2(b2, M2) : (u2.__c = h2 = new x$3(b2, M2), h2.constructor = j2, h2.render = E$2), C2 && C2.sub(h2), h2.state || (h2.state = {}), h2.__n = i, p2 = h2.__d = true, h2.__h = [], h2._sb = []), S2 && null == h2.__s && (h2.__s = h2.state), S2 && null != j2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d$2({}, h2.__s)), d$2(h2.__s, j2.getDerivedStateFromProps(b2, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) S2 && null == j2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), S2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (S2 && null == j2.getDerivedStateFromProps && b2 !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b2, M2), u2.__v == t2.__v || !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b2, h2.__s, M2)) {
          for (u2.__v != t2.__v && (h2.props = b2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), $2 = 0; $2 < h2._sb.length; $2++) h2.__h.push(h2._sb[$2]);
          h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(b2, h2.__s, M2), S2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, _2);
        });
      }
      if (h2.context = M2, h2.props = b2, h2.__P = n2, h2.__e = false, P2 = l$2.__r, A2 = 0, S2) {
        for (h2.state = h2.__s, h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), H2 = 0; H2 < h2._sb.length; H2++) h2.__h.push(h2._sb[H2]);
        h2._sb = [];
      } else do {
        h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++A2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i = d$2(d$2({}, i), h2.getChildContext())), S2 && !p2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(v2, y2)), L2 = a2, null != a2 && a2.type === k$3 && null == a2.key && (L2 = V$1(a2.props.children)), f2 = I$1(n2, w$3(L2) ? L2 : [L2], u2, t2, i, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u2.__v = null, c2 || null != o2) if (n3.then) {
        for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
        o2[o2.indexOf(f2)] = null, u2.__e = f2;
      } else {
        for (T2 = o2.length; T2--; ) g$4(o2[T2]);
        z$2(u2);
      }
      else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || z$2(u2);
      l$2.__e(n3, u2, t2);
    }
    else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = q$2(t2.__e, u2, t2, i, r2, o2, e2, c2, s2);
    return (a2 = l$2.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function z$2(n2) {
    n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z$2);
  }
  function N$1(n2, u2, t2) {
    for (var i = 0; i < t2.length; i++) B$2(t2[i], t2[++i], t2[++i]);
    l$2.__c && l$2.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l$2.__e(n3, u3.__v);
      }
    });
  }
  function V$1(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w$3(n2) ? n2.map(V$1) : d$2({}, n2);
  }
  function q$2(u2, t2, i, r2, o2, e2, f2, c2, s2) {
    var a2, h2, v2, y2, d2, _2, m2, b2 = i.props || p$3, k2 = t2.props, x = t2.type;
    if ("svg" == x ? o2 = "http://www.w3.org/2000/svg" : "math" == x ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x && (x ? d2.localName == x : 3 == d2.nodeType)) {
        u2 = d2, e2[a2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x, k2.is && k2), c2 && (l$2.__m && l$2.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x) b2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = e2 && n$1.call(u2.childNodes), !c2 && null != e2) for (b2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) b2[(d2 = u2.attributes[a2]).name] = d2.value;
      for (a2 in b2) if (d2 = b2[a2], "children" == a2) ;
      else if ("dangerouslySetInnerHTML" == a2) v2 = d2;
      else if (!(a2 in k2)) {
        if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
        j$2(u2, a2, null, d2, o2);
      }
      for (a2 in k2) d2 = k2[a2], "children" == a2 ? y2 = d2 : "dangerouslySetInnerHTML" == a2 ? h2 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b2[a2] === d2 || j$2(u2, a2, d2, b2[a2], o2);
      if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (v2 && (u2.innerHTML = ""), I$1("template" == t2.type ? u2.content : u2, w$3(y2) ? y2 : [y2], t2, i, r2, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i.__k && S(i, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g$4(e2[a2]);
      c2 || (a2 = "value", "progress" == x && null == _2 ? u2.removeAttribute("value") : null != _2 && (_2 !== u2[a2] || "progress" == x && !_2 || "option" == x && _2 != b2[a2]) && j$2(u2, a2, _2, b2[a2], o2), a2 = "checked", null != m2 && m2 != u2[a2] && j$2(u2, a2, m2, b2[a2], o2));
    }
    return u2;
  }
  function B$2(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i = "function" == typeof n2.__u;
        i && n2.__u(), i && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$2.__e(n3, t2);
    }
  }
  function D$2(n2, u2, t2) {
    var i, r2;
    if (l$2.unmount && l$2.unmount(n2), (i = n2.ref) && (i.current && i.current != n2.__e || B$2(i, null, u2)), null != (i = n2.__c)) {
      if (i.componentWillUnmount) try {
        i.componentWillUnmount();
      } catch (n3) {
        l$2.__e(n3, u2);
      }
      i.base = i.__P = null;
    }
    if (i = n2.__k) for (r2 = 0; r2 < i.length; r2++) i[r2] && D$2(i[r2], u2, t2 || "function" != typeof n2.type);
    t2 || g$4(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E$2(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function G$1(u2, t2, i) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$2.__ && l$2.__(u2, t2), o2 = (r2 = "function" == typeof i) ? null : i && i.__k || t2.__k, e2 = [], f2 = [], O$1(t2, u2 = (!r2 && i || t2).__k = _$3(k$3, null, [u2]), o2 || p$3, p$3, t2.namespaceURI, !r2 && i ? [i] : o2 ? null : t2.firstChild ? n$1.call(t2.childNodes) : null, e2, !r2 && i ? i : o2 ? o2.__e : t2.firstChild, r2, f2), N$1(e2, u2, f2);
  }
  function J$1(n2, l2) {
    G$1(n2, l2, J$1);
  }
  function K$1(l2, u2, t2) {
    var i, r2, o2, e2, f2 = d$2({}, l2.props);
    for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
    return arguments.length > 2 && (f2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), m$2(l2.type, f2, i || l2.key, r2 || l2.ref, null);
  }
  function Q$1(n2) {
    function l2(n3) {
      var u2, t2;
      return this.getChildContext || (u2 = new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
        return t2;
      }, this.componentWillUnmount = function() {
        u2 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u2.forEach(function(n5) {
          n5.__e = true, M$2(n5);
        });
      }, this.sub = function(n4) {
        u2.add(n4);
        var l3 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u2 && u2.delete(n4), l3 && l3.call(n4);
        };
      }), n3.children;
    }
    return l2.__c = "__cC" + h$3++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
      return n3.children(l3);
    }).contextType = l2, l2;
  }
  n$1 = v$2.slice, l$2 = { __e: function(n2, l2, u2, t2) {
    for (var i, r2, o2; l2 = l2.__; ) if ((i = l2.__c) && !i.__) try {
      if ((r2 = i.constructor) && null != r2.getDerivedStateFromError && (i.setState(r2.getDerivedStateFromError(n2)), o2 = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n2, t2 || {}), o2 = i.__d), o2) return i.__E = i;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$3 = 0, t$2 = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x$3.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d$2({}, this.state), "function" == typeof n2 && (n2 = n2(d$2({}, u2), this.props)), n2 && d$2(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M$2(this));
  }, x$3.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M$2(this));
  }, x$3.prototype.render = k$3, i$3 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$2 = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, $$1.__r = 0, f$3 = /(PointerCapture)$|Capture$/i, c$2 = 0, s$2 = F$3(false), a$2 = F$3(true), h$3 = 0;
  var _GM_download = (() => typeof GM_download != "undefined" ? GM_download : void 0)();
  var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const WINDOWS_RESERVED_NAMES = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
  const sanitize = (s2) => {
    if (!s2 || typeof s2 !== "string") return "untitled";
    const rawName = s2.split(/[/\\]/).pop() || s2;
    let cleaned = rawName.replace(/[\x00-\x1f\x7f\\/:*?"<>|]+/g, "_").trim();
    const lastDot = cleaned.lastIndexOf(".");
    let stem = cleaned;
    let ext = "";
    if (lastDot > 0 && lastDot < cleaned.length - 1) {
      stem = cleaned.slice(0, lastDot);
      ext = cleaned.slice(lastDot);
    }
    stem = stem.replace(/[. ]+$/, "").trim();
    if (!stem) stem = "untitled";
    const maxStemLen = Math.max(1, 80 - ext.length);
    stem = stem.slice(0, maxStemLen).replace(/[. ]+$/, "").trim();
    if (!stem) stem = "untitled";
    cleaned = `${stem}${ext}`;
    if (WINDOWS_RESERVED_NAMES.test(cleaned)) {
      cleaned = `_${cleaned}`;
    }
    return cleaned;
  };
  function deterministicSafeFilename(originalName) {
    const extMatch = (originalName || "").match(/\.[a-zA-Z0-9_]+$/);
    const ext = extMatch ? extMatch[0] : "";
    let hash = 0;
    const str = originalName || "file";
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0").slice(0, 8);
    return `asset_${hex}${ext}`;
  }
  const isInlinePointer = (p2) => {
    if (!p2) return false;
    const prefixes = [
      "https://cdn.oaistatic.com/",
      "https://oaidalleapiprodscus.blob.core.windows.net/"
    ];
    return prefixes.some((x) => p2.startsWith(x));
  };
  function resolveSedimentPointer(p2) {
    if (!p2 || typeof p2 !== "string" || !p2.startsWith("sediment://")) return null;
    const path = p2.replace(/^sediment:\/\//, "").trim();
    const fileMatch = path.match(/file[-_][0-9a-zA-Z_-]+/i);
    if (fileMatch) return fileMatch[0];
    const uuidMatch = path.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    if (uuidMatch) return uuidMatch[0];
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0) {
      const last = segments[segments.length - 1].replace(/[?#].*$/, "");
      if (last && last.length > 3) return last;
    }
    return null;
  }
  function normalizeSandboxPointer(raw) {
    if (!raw || typeof raw !== "string") return null;
    let p2 = raw.trim();
    p2 = p2.replace(/^[`'"“”‘’(\[{<]+/, "");
    if (!p2.startsWith("sandbox:")) return null;
    p2 = p2.replace(/[`'"“”‘’()[\]{}<>.,;:!?*~_\\]+$/g, "");
    const path = p2.replace(/^sandbox:/, "").trim();
    if (!path || path === "/" || path === "/mnt/data" || path === "/mnt/data/" || !path.includes("/")) {
      return null;
    }
    if (path.endsWith("/")) {
      return null;
    }
    return `sandbox:${path}`;
  }
  const pointerToFileId = (p2) => {
    if (!p2) return "";
    if (isInlinePointer(p2)) return p2;
    if (p2.startsWith("sediment://")) {
      const resolved = resolveSedimentPointer(p2);
      if (resolved) return resolved;
      return p2.replace(/^sediment:\/\//, "");
    }
    if (p2.startsWith("file-service://")) {
      const withoutScheme = p2.replace(/^file-service:\/\//, "").trim();
      const m22 = withoutScheme.match(/file[-_][0-9a-zA-Z_-]+/i);
      return m22 ? m22[0] : withoutScheme;
    }
    const m2 = p2.match(/file[-_][0-9a-zA-Z_-]+/i);
    return m2 ? m2[0] : p2;
  };
  const fileExtFromMime = (mime) => {
    if (!mime) return "";
    const map = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/webp": ".webp",
      "image/gif": ".gif",
      "application/pdf": ".pdf",
      "text/plain": ".txt",
      "text/markdown": ".md"
    };
    if (map[mime]) return map[mime];
    if (mime.includes("/")) return `.${mime.split("/")[1]}`;
    return "";
  };
  const formatBytes = (n2) => {
    if (!n2 || isNaN(n2)) return "";
    const units = ["B", "KB", "MB", "GB"];
    let v2 = n2;
    let i = 0;
    while (v2 >= 1024 && i < units.length - 1) {
      v2 /= 1024;
      i++;
    }
    return `${v2.toFixed(v2 >= 10 || v2 % 1 === 0 ? 0 : 1)}${units[i]}`;
  };
  const sleep = (ms) => new Promise((r2) => setTimeout(r2, ms));
  const convId = () => {
    const p2 = location.pathname;
    let m2 = p2.match(/^\/c\/([0-9a-f-]+)$/i);
    if (m2) return m2[1];
    m2 = p2.match(/^\/g\/[^/]+\/c\/([0-9a-f-]+)$/i);
    return m2 ? m2[1] : "";
  };
  const projectId = () => {
    const p2 = location.pathname;
    const m2 = p2.match(/^\/g\/([^/]+)\/c\/[0-9a-f-]+$/i);
    return m2 ? m2[1] : "";
  };
  const isHostOK = () => location.host.endsWith("chatgpt.com") || location.host.endsWith("chat.openai.com");
  const BATCH_CONCURRENCY = 4;
  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = filename;
    document.body.appendChild(a2);
    a2.click();
    setTimeout(() => URL.revokeObjectURL(url), 3e3);
    a2.remove();
  }
  function saveJSON(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json"
    });
    saveBlob(blob, filename);
  }
  function gmDownload(url, filename) {
    return new Promise((resolve, reject) => {
      _GM_download({
        url,
        name: filename || "",
        onload: () => resolve(),
        onerror: (err2) => reject(err2),
        ontimeout: () => reject(new Error("timeout"))
      });
    });
  }
  function parseMimeFromHeaders(raw) {
    if (!raw) return "";
    const m2 = raw.match(/content-type:\s*([^\r\n;]+)/i);
    return m2 ? m2[1].trim() : "";
  }
  function gmFetchBlob(url, headers) {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        url,
        method: "GET",
        headers: headers || {},
        responseType: "arraybuffer",
        onload: (res) => {
          const mime = parseMimeFromHeaders(res.responseHeaders || "") || "";
          const buf = res.response || res.responseText;
          resolve({ blob: new Blob([buf], { type: mime }), mime });
        },
        onerror: (err2) => reject(new Error(err2 && err2.error ? err2.error : "gm_fetch_error")),
        ontimeout: () => reject(new Error("gm_fetch_timeout"))
      });
    });
  }
  const HAS_EXT_RE = /\.[^./\\]+$/;
  function inferFilename(name, fallbackId, mime) {
    const base = sanitize(name || "") || sanitize(fallbackId || "") || "untitled";
    const ext = fileExtFromMime(mime || "");
    if (!ext || HAS_EXT_RE.test(base)) return sanitize(base);
    return sanitize(`${base}${ext}`);
  }
  function parseRetryAfter(header) {
    if (!header) return null;
    const trimmed = header.trim();
    const seconds = Number(trimmed);
    if (!isNaN(seconds) && seconds >= 0) {
      return seconds * 1e3;
    }
    const dateMs = Date.parse(trimmed);
    if (!isNaN(dateMs)) {
      const diff = dateMs - Date.now();
      return diff > 0 ? diff : 0;
    }
    return null;
  }
  class AdaptiveRateLimiter {
    minDelayMs;
    maxDelayMs;
    currentDelayMs;
    consecutiveSuccesses = 0;
    constructor(minDelayMs = 350, maxDelayMs = 5e3) {
      this.minDelayMs = minDelayMs;
      this.maxDelayMs = maxDelayMs;
      this.currentDelayMs = minDelayMs;
    }
    recordSuccess() {
      this.consecutiveSuccesses++;
      if (this.consecutiveSuccesses >= 3 && this.currentDelayMs > this.minDelayMs) {
        this.currentDelayMs = Math.max(this.minDelayMs, this.currentDelayMs - 250);
        this.consecutiveSuccesses = 0;
      }
    }
    recordRateLimit(suggestedWaitMs) {
      this.consecutiveSuccesses = 0;
      const bump = suggestedWaitMs ? Math.min(this.maxDelayMs, suggestedWaitMs) : 2500;
      this.currentDelayMs = Math.min(this.maxDelayMs, Math.max(this.currentDelayMs * 2, bump));
    }
    async pace() {
      if (this.currentDelayMs > 0) {
        await sleep(this.currentDelayMs);
      }
    }
    getCurrentDelay() {
      return this.currentDelayMs;
    }
    reset() {
      this.currentDelayMs = this.minDelayMs;
      this.consecutiveSuccesses = 0;
    }
  }
  const globalRateLimiter = new AdaptiveRateLimiter();
  async function fetchWithRetry(url, options = {}, retries = 4, backoff = 1e3) {
    let lastError;
    for (let i = 0; i <= retries; i++) {
      try {
        const res = await fetch(url, options);
        if (res.ok) {
          globalRateLimiter.recordSuccess();
          return res;
        }
        if (res.status === 429) {
          let delayMs = parseRetryAfter(res.headers.get("Retry-After"));
          if (delayMs === null || delayMs <= 0) {
            const base = Math.max(2e3, backoff) * Math.pow(2, i);
            const jitter = Math.floor(Math.random() * 1e3);
            delayMs = Math.min(6e4, base + jitter);
          } else {
            delayMs += Math.floor(Math.random() * 500);
          }
          globalRateLimiter.recordRateLimit(delayMs);
          if (i < retries) {
            console.warn(`[fetchWithRetry] HTTP 429 received for ${url}. Waiting ${delayMs}ms before retry ${i + 1}/${retries}...`);
            await sleep(delayMs);
            continue;
          }
          return res;
        }
        if (res.status >= 500) {
          if (i < retries) {
            const delayMs = backoff * Math.pow(2, i) + Math.floor(Math.random() * 500);
            console.warn(`[fetchWithRetry] HTTP ${res.status} received for ${url}. Waiting ${delayMs}ms before retry ${i + 1}/${retries}...`);
            await sleep(delayMs);
            continue;
          }
          return res;
        }
        return res;
      } catch (e2) {
        lastError = e2;
        if (i < retries) {
          const delayMs = backoff * Math.pow(2, i) + Math.floor(Math.random() * 500);
          await sleep(delayMs);
        }
      }
    }
    throw lastError;
  }
  const styleCss = ".cgptx-mini-wrap{display:flex;flex-direction:row;align-items:center;position:relative;height:36px;gap:6px;font-family:inherit;margin:0}.cgptx-status-anchor{position:relative}#cgptx-sidebar-root[data-mode=expanded]{flex:1 1 auto;min-width:0;height:36px}#cgptx-sidebar-root[data-mode=expanded] .cgptx-mini-wrap{width:100%;gap:0}#cgptx-sidebar-root[data-mode=collapsed]{position:absolute;inset:0;pointer-events:none}#cgptx-sidebar-root[data-mode=collapsed] .cgptx-mini-wrap{width:100%;height:100%;margin:0;gap:0}#cgptx-sidebar-root[data-mode=collapsed] .cgptx-mini-badges-col{left:auto;right:4px;top:2px}.cgptx-mini-badge{font-size:12px;width:10px;height:10px;padding:0;border-radius:50%;text-indent:-9999px;border:1px solid transparent;overflow:hidden;box-shadow:none;cursor:help}.cgptx-mini-badge.ok{background:#3fd991;border-color:#a7f3d0;color:#047857}.cgptx-mini-badge.bad{background:#d43939;border-color:#fecaca;color:#b91c1c}.cgptx-mini-btn-row{display:flex;align-items:center;height:36px;gap:2px}#cgptx-sidebar-root[data-mode=expanded] .cgptx-mini-btn-row{--cgptx-slot-gap: clamp(2px, calc((100% - 144px)/5) , 12px);width:100%;justify-content:space-between;gap:0;padding-inline:var(--cgptx-slot-gap)}.cgptx-mini-btn{width:36px;height:36px;border-radius:8px;border:none;padding:0;cursor:pointer;background:transparent;color:inherit;box-shadow:none;display:flex;align-items:center;justify-content:center;font-size:16px;line-height:1;transition:background-color .15s ease,color .15s ease,opacity .15s ease}.cgptx-mini-btn:hover{transform:none;box-shadow:none}.cgptx-mini-btn:focus-visible{outline:2px solid #6ea8fe;outline-offset:-2px}.cgptx-mini-btn:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}.cgptx-modal{position:fixed;inset:0;display:block;z-index:2147483647}.cgptx-modal-box{width:100%;min-height:0;max-width:680px;max-height:85vh;background:var(--main-surface-primary, #ffffff);color:var(--text-primary, #0d0d0d);border:1px solid var(--border-light, rgba(13, 13, 13, .05));border-radius:16px;box-shadow:var(--shadow-long, rgba(0, 0, 0, .08) 0 8px 12px, rgba(0, 0, 0, .62) 0 0 1px);padding:0;display:flex;flex-direction:column;overflow:hidden;font-size:14px}.cgptx-modal-header{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 10px 10px 16px;border-bottom:1px solid var(--border-light, rgba(13, 13, 13, .05))}.cgptx-modal-title{font-weight:400;font-size:18px;color:var(--text-primary, #0d0d0d)}.cgptx-modal-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.cgptx-modal-panel{display:flex;flex:1;flex-direction:column;gap:8px;padding-block:6px 10px}.cgptx-modal-inline-actions{justify-content:flex-start}.cgptx-modal-tip{justify-content:flex-end}.cgptx-chip{padding:6px 12px;border-radius:8px;border:1px solid var(--border-light, rgba(13, 13, 13, .05));background:var(--main-surface-secondary, rgba(0, 0, 0, .04));color:var(--text-secondary, #5d5d5d);font-size:13px}.cgptx-list{flex:1;overflow:auto;border:1px solid var(--border-light, rgba(13, 13, 13, .05));border-radius:12px;background:var(--main-surface-secondary, rgba(0, 0, 0, .04))}.cgptx-list-dialog{max-height:46vh}.cgptx-item{display:grid;grid-template-columns:24px 20px 1fr;gap:12px;padding:10px 14px;border-bottom:1px solid var(--border-light, rgba(13, 13, 13, .05));align-items:center;background:var(--main-surface-primary, #fff);transition:background .15s}.cgptx-item:hover{background:var(--main-surface-secondary, rgba(0, 0, 0, .04))}.cgptx-item:last-child{border-bottom:none}.cgptx-item .title{font-weight:500;color:var(--text-primary, #0d0d0d);line-height:1.4}.cgptx-item-loading{display:flex;justify-content:center;padding:20px}.cgptx-loading-wrap{width:100%;text-align:center}.cgptx-item-error{color:#dc2626}.cgptx-group{border-bottom:1px solid var(--border-light, rgba(13, 13, 13, .05));background:var(--main-surface-primary, #fff)}.cgptx-group:last-child{border-bottom:none}.cgptx-group-header{display:grid;grid-template-columns:24px 20px 1fr auto;align-items:center;gap:10px;padding:10px 14px;background:var(--main-surface-secondary, rgba(0, 0, 0, .04));cursor:pointer;-webkit-user-select:none;user-select:none}.cgptx-group-header:hover{background:var(--main-surface-secondary, rgba(0, 0, 0, .06))}.cgptx-group-list{border-top:1px solid var(--border-light, rgba(13, 13, 13, .05))}.cgptx-arrow{font-size:12px;color:var(--text-secondary, #5d5d5d);transition:transform .2s}.group-title{font-weight:600;color:var(--text-primary, #0d0d0d)}.group-count{color:var(--text-secondary, #5d5d5d);font-size:12px;background:var(--main-surface-secondary, rgba(0, 0, 0, .08));padding:2px 6px;border-radius:4px}.cgptx-item .meta{color:var(--text-secondary, #5d5d5d);font-size:12px;display:flex;gap:8px;flex-wrap:wrap;margin-top:2px}.cgptx-settings-shell{display:flex;flex:1;min-height:0}.cgptx-settings-tablist{gap:0;padding:0}.cgptx-settings-tab-close{display:flex;align-items:center;padding:12px 10px}.cgptx-settings-tab{display:flex;align-items:center;justify-content:flex-start;min-height:36px;padding:6px 10px;margin:0 6px;border:0;border-radius:10px;background:transparent;color:var(--text-primary, #0d0d0d);font-size:14px;font-weight:400;cursor:pointer;white-space:nowrap}.cgptx-settings-tab[data-state=active]{background:var(--main-surface-secondary, rgba(0, 0, 0, .04))}.cgptx-settings-panel{padding-block:0 10px}.cgptx-settings-actions-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.cgptx-settings-number{width:84px;height:36px;border-radius:8px;border:1px solid var(--border-light, rgba(13, 13, 13, .08));background:var(--main-surface-primary, #fff);color:var(--text-primary, #0d0d0d);padding:0 10px;font-size:14px}.cgptx-settings-number:focus-visible{outline:2px solid var(--focus-color, #6ea8fe);outline-offset:1px}.cgptx-settings-number:disabled{opacity:.55}.cgptx-settings-folder{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text-secondary, #5d5d5d);font-size:12px}.cgptx-status-chip{padding:4px 10px;border-radius:999px;font-size:12px;font-weight:500;border:1px solid transparent}.cgptx-status-chip.idle{background:color-mix(in srgb,var(--main-surface-secondary, #f3f4f6) 80%,transparent);color:var(--text-secondary, #5d5d5d)}.cgptx-status-chip.checking{background:color-mix(in srgb,#3b82f6 12%,transparent);color:#2563eb}.cgptx-status-chip.saving{background:color-mix(in srgb,#10b981 12%,transparent);color:#059669}.cgptx-status-chip.error{background:color-mix(in srgb,#ef4444 12%,transparent);color:#dc2626}.cgptx-status-chip.disabled{background:color-mix(in srgb,var(--main-surface-secondary, #f3f4f6) 90%,transparent);color:var(--text-secondary, #5d5d5d)}@media(max-width:767px){.cgptx-settings-shell{flex-direction:column}.cgptx-settings-tablist{padding:0 8px 6px}.cgptx-settings-tab-close{padding:8px 2px 8px 4px}.cgptx-settings-tab{min-width:72px;justify-content:center;margin:0 2px}.cgptx-settings-folder{max-width:140px}}.cgptx-progress-wrap{display:flex;flex-direction:column;gap:6px;margin-top:4px}.cgptx-progress-track{height:8px;background:var(--main-surface-secondary, rgba(0, 0, 0, .08));border-radius:4px;overflow:hidden}.cgptx-progress-bar{height:100%;background:var(--theme-submit-btn-bg, #10a37f);width:0%;transition:width .3s ease}.cgptx-progress-text{font-size:12px;color:var(--text-secondary, #5d5d5d);text-align:right}.cgptx-checkbox-wrapper{display:inline-flex;align-items:center;gap:8px;cursor:pointer;-webkit-user-select:none;user-select:none;font-size:14px;color:var(--text-primary, #0d0d0d);transition:color .2s}.cgptx-checkbox-wrapper:hover{color:var(--text-primary, #0d0d0d)}.cgptx-checkbox-wrapper.disabled{opacity:.6;cursor:not-allowed}.cgptx-checkbox-input-wrapper{position:relative;width:18px;height:18px;display:flex;align-items:center;justify-content:center}.cgptx-checkbox-input{position:absolute;opacity:0;width:0;height:0;margin:0}.cgptx-checkbox-custom{width:18px;height:18px;border:2px solid var(--border-medium, rgba(0, 0, 0, .2));border-radius:4px;background:var(--main-surface-primary, #fff);transition:all .2s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:center}.cgptx-checkbox-wrapper:hover .cgptx-checkbox-custom{border-color:var(--text-secondary, #5d5d5d)}.cgptx-checkbox-input:focus-visible+.cgptx-checkbox-custom{box-shadow:0 0 0 2px var(--main-surface-primary, #fff),0 0 0 4px var(--focus-color, #6ea8fe)}.cgptx-checkbox-input:checked+.cgptx-checkbox-custom,.cgptx-checkbox-input:indeterminate+.cgptx-checkbox-custom{background:var(--theme-submit-btn-bg, #10a37f);border-color:var(--theme-submit-btn-bg, #10a37f)}.cgptx-checkbox-icon{width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:scale(.5);transition:all .2s cubic-bezier(.4,0,.2,1);position:absolute}.cgptx-checkbox-input:checked+.cgptx-checkbox-custom .cgptx-checkbox-icon.check{opacity:1;transform:scale(1)}.cgptx-checkbox-input:indeterminate+.cgptx-checkbox-custom .cgptx-checkbox-icon.minus{opacity:1;transform:scale(1)}.cgptx-list::-webkit-scrollbar{width:8px;height:8px}.cgptx-list::-webkit-scrollbar-track{background:transparent}.cgptx-list::-webkit-scrollbar-thumb{background:var(--border-medium, rgba(0, 0, 0, .2));border-radius:4px}.cgptx-list::-webkit-scrollbar-thumb:hover{background:var(--text-secondary, #5d5d5d)}.cgptx-mini-badges-col{position:absolute;top:2px;left:-17px;right:auto;z-index:2;display:flex;flex-direction:row;align-items:center;justify-content:center;width:10px;height:10px;gap:0;margin-bottom:0}.cgptx-mini-badge.info{background:#e0f2fe;color:#0369a1;border-color:#bae6fd}";
  importCSS(styleCss);
  var f$2 = 0;
  function u$2(e2, t2, n2, o2, i, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$2, __i: -1, __u: 0, __source: i, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l$2.vnode && l$2.vnode(l2), l2;
  }
  var t$1, r$1, u$1, i$2, o$1 = 0, f$1 = [], c$1 = l$2, e$1 = c$1.__b, a$1 = c$1.__r, v$1 = c$1.diffed, l$1 = c$1.__c, m$1 = c$1.unmount, s$1 = c$1.__;
  function p$2(n2, t2) {
    c$1.__h && c$1.__h(r$1, n2, o$1 || t2), o$1 = 0;
    var u2 = r$1.__H || (r$1.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  }
  function d$1(n2) {
    return o$1 = 1, h$2(D$1, n2);
  }
  function h$2(n2, u2, i) {
    var o2 = p$2(t$1++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [i ? i(u2) : D$1(void 0, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r$1, !r$1.__f)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        })) return !c2 || c2.call(this, n3, t2, r2);
        var i2 = o2.__c.props !== n3;
        return u3.forEach(function(n4) {
          if (n4.__N) {
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i2 = true);
          }
        }), c2 && c2.call(this, n3, t2, r2) || i2;
      };
      r$1.__f = true;
      var c2 = r$1.shouldComponentUpdate, e2 = r$1.componentWillUpdate;
      r$1.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r$1.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y$2(n2, u2) {
    var i = p$2(t$1++, 3);
    !c$1.__s && C$1(i.__H, u2) && (i.__ = n2, i.u = u2, r$1.__H.__h.push(i));
  }
  function _$2(n2, u2) {
    var i = p$2(t$1++, 4);
    !c$1.__s && C$1(i.__H, u2) && (i.__ = n2, i.u = u2, r$1.__h.push(i));
  }
  function A$2(n2) {
    return o$1 = 5, T$1(function() {
      return { current: n2 };
    }, []);
  }
  function F$2(n2, t2, r2) {
    o$1 = 6, _$2(function() {
      if ("function" == typeof n2) {
        var r3 = n2(t2());
        return function() {
          n2(null), r3 && "function" == typeof r3 && r3();
        };
      }
      if (n2) return n2.current = t2(), function() {
        return n2.current = null;
      };
    }, null == r2 ? r2 : r2.concat(n2));
  }
  function T$1(n2, r2) {
    var u2 = p$2(t$1++, 7);
    return C$1(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function q$1(n2, t2) {
    return o$1 = 8, T$1(function() {
      return n2;
    }, t2);
  }
  function x$2(n2) {
    var u2 = r$1.context[n2.__c], i = p$2(t$1++, 9);
    return i.c = n2, u2 ? (null == i.__ && (i.__ = true, u2.sub(r$1)), u2.props.value) : n2.__;
  }
  function P$1(n2, t2) {
    c$1.useDebugValue && c$1.useDebugValue(t2 ? t2(n2) : n2);
  }
  function g$3() {
    var n2 = p$2(t$1++, 11);
    if (!n2.__) {
      for (var u2 = r$1.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      var i = u2.__m || (u2.__m = [0, 0]);
      n2.__ = "P" + i[0] + "-" + i[1]++;
    }
    return n2.__;
  }
  function j$1() {
    for (var n2; n2 = f$1.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z$1), n2.__H.__h.forEach(B$1), n2.__H.__h = [];
    } catch (t2) {
      n2.__H.__h = [], c$1.__e(t2, n2.__v);
    }
  }
  c$1.__b = function(n2) {
    r$1 = null, e$1 && e$1(n2);
  }, c$1.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$1 && s$1(n2, t2);
  }, c$1.__r = function(n2) {
    a$1 && a$1(n2), t$1 = 0;
    var i = (r$1 = n2.__c).__H;
    i && (u$1 === r$1 ? (i.__h = [], r$1.__h = [], i.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i.__h.forEach(z$1), i.__h.forEach(B$1), i.__h = [], t$1 = 0)), u$1 = r$1;
  }, c$1.diffed = function(n2) {
    v$1 && v$1(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f$1.push(t2) && i$2 === c$1.requestAnimationFrame || ((i$2 = c$1.requestAnimationFrame) || w$2)(j$1)), t2.__H.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u$1 = r$1 = null;
  }, c$1.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.forEach(z$1), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B$1(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c$1.__e(r2, n3.__v);
      }
    }), l$1 && l$1(n2, t2);
  }, c$1.unmount = function(n2) {
    m$1 && m$1(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
      try {
        z$1(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c$1.__e(t2, r2.__v));
  };
  var k$2 = "function" == typeof requestAnimationFrame;
  function w$2(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k$2 && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k$2 && (t2 = requestAnimationFrame(r2));
  }
  function z$1(n2) {
    var t2 = r$1, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r$1 = t2;
  }
  function B$1(n2) {
    var t2 = r$1;
    n2.__c = n2.__(), r$1 = t2;
  }
  function C$1(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function D$1(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  const scriptRel = (function detectScriptRel() {
    const relList = typeof document !== "undefined" && document.createElement("link").relList;
    return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
  })();
  const assetsURL = function(dep) {
    return "/" + dep;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (deps && deps.length > 0) {
      let allSettled = function(promises$2) {
        return Promise.all(promises$2.map((p2) => Promise.resolve(p2).then((value$1) => ({
          status: "fulfilled",
          value: value$1
        }), (reason) => ({
          status: "rejected",
          reason
        }))));
      };
      document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
      const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
      promise = allSettled(deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
        const link2 = document.createElement("link");
        link2.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) link2.as = "script";
        link2.crossOrigin = "";
        link2.href = dep;
        if (cspNonce) link2.setAttribute("nonce", cspNonce);
        document.head.appendChild(link2);
        if (isCss) return new Promise((res, rej) => {
          link2.addEventListener("load", res);
          link2.addEventListener("error", () => rej( new Error(`Unable to preload CSS for ${dep}`)));
        });
      }));
    }
    function handlePreloadError(err$2) {
      const e$12 = new Event("vite:preloadError", { cancelable: true });
      e$12.payload = err$2;
      window.dispatchEvent(e$12);
      if (!e$12.defaultPrevented) throw err$2;
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  class Logger {
    static debugMode = false;
    static setDebug(enabled) {
      this.debugMode = enabled;
      if (enabled) {
        console.log("[ChatGPT-Exporter] Debug mode enabled");
      }
    }
    static isDebug() {
      return this.debugMode;
    }
    static info(module, ...args) {
      console.log(`[${module}]`, ...args);
    }
    static warn(module, ...args) {
      console.warn(`[${module}]`, ...args);
    }
    static error(module, ...args) {
      console.error(`[${module}]`, ...args);
    }
    static debug(module, ...args) {
      if (this.debugMode) {
        console.log(`[${module}] [DEBUG]`, ...args);
      }
    }
  }
  const Cred = (() => {
    let token = null;
    let accountId = null;
    let mainUser = null;
    let tokenSource = "";
    let accountIdSource = "";
    let lastErr = "";
    let interceptorsInitialized = false;
    const log = (key, val, source) => {
      console.log(`[Cred] ${key} captured via ${source}:`, val);
    };
    const mask = (s2, keepL = 8, keepR = 4) => {
      if (!s2) return "";
      if (s2.length <= keepL + keepR) return s2;
      return `${s2.slice(0, keepL)}…${s2.slice(-keepR)}`;
    };
    const initInterceptors = () => {
      if (interceptorsInitialized) return;
      interceptorsInitialized = true;
      const originalFetch = window.fetch;
      window.fetch = async function(_input, init) {
        if (init && init.headers) {
          captureFromHeaders(init.headers);
        }
        return originalFetch.apply(this, arguments);
      };
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(_method, _url) {
        this.addEventListener("readystatechange", () => {
          if (this.readyState === 1) ;
        });
        return originalOpen.apply(this, arguments);
      };
      const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
      XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
        if (header.toLowerCase() === "authorization") {
          updateToken(value, "Network (XHR)");
        }
        if (header.toLowerCase() === "chatgpt-account-id") {
          updateAccountId(value, "Network (XHR)");
        }
        return originalSetRequestHeader.apply(this, arguments);
      };
      console.log("[Cred] Network interceptors initialized");
    };
    const captureFromHeaders = (headers) => {
      try {
        let auth = null;
        let accId = null;
        if (headers instanceof Headers) {
          auth = headers.get("authorization") || headers.get("Authorization");
          accId = headers.get("chatgpt-account-id") || headers.get("ChatGPT-Account-Id");
        } else if (Array.isArray(headers)) {
          for (const [k2, v2] of headers) {
            if (k2.toLowerCase() === "authorization") auth = v2;
            if (k2.toLowerCase() === "chatgpt-account-id") accId = v2;
          }
        } else {
          for (const k2 in headers) {
            if (k2.toLowerCase() === "authorization") auth = headers[k2];
            if (k2.toLowerCase() === "chatgpt-account-id") accId = headers[k2];
          }
        }
        if (auth) updateToken(auth, "Network (Fetch)");
        if (accId) updateAccountId(accId, "Network (Fetch)");
      } catch (e2) {
      }
    };
    const updateToken = (rawVal, source) => {
      if (!rawVal) return;
      const clean = rawVal.replace(/^Bearer\s+/i, "").trim();
      if (!clean || clean.toLowerCase() === "undefined" || clean.toLowerCase() === "null" || clean.toLowerCase() === "dummy") return;
      if (token !== clean) {
        token = clean;
        tokenSource = source;
      }
    };
    const updateAccountId = (val, source) => {
      if (!val) return;
      const clean = val.trim();
      if (!clean || clean === "x" || clean.toLowerCase() === "undefined" || clean.toLowerCase() === "null") return;
      if (accountId !== clean) {
        accountId = clean;
        accountIdSource = source;
        log("Account ID", accountId, source);
      }
    };
    const checkPassiveSources = () => {
      const m2 = document.cookie.match(/(?:^|;\s*)_account=([^;]+)/);
      if (m2) {
        const val = decodeURIComponent(m2[1] || "").trim();
        updateAccountId(val, "Cookie");
      }
      try {
        const bs = _unsafeWindow.CLIENT_BOOTSTRAP;
        if (Logger.isDebug()) {
          console.log("[Cred] CLIENT_BOOTSTRAP raw:", bs);
        }
        Logger.debug("Cred", "CLIENT_BOOTSTRAP inspection:", {
          exists: !!bs,
          source: "unsafeWindow",
          hasUser: !!bs?.user,
          email: bs?.user?.email,
          session: !!bs?.session
        });
        if (bs) {
          if (bs.user && bs.user.email) {
            updateMainUser(bs.user.email, "CLIENT_BOOTSTRAP");
          }
          if (bs.session && bs.session.account && bs.session.account.id) {
          }
        }
      } catch (e2) {
      }
    };
    const updateMainUser = (val, source) => {
      if (!val) return;
      if (mainUser !== val) {
        mainUser = val;
        log("User", mainUser, source);
      }
    };
    const getAuthHeaders = () => {
      const h2 = new Headers();
      if (token) h2.set("authorization", `Bearer ${token}`);
      if (accountId) h2.set("chatgpt-account-id", accountId);
      return h2;
    };
    const fetchSession = async () => {
      try {
        console.log("[Cred] Attempting to fetch session active...");
        const resp = await fetch("/api/auth/session", { credentials: "include" });
        if (!resp.ok) {
          lastErr = `session ${resp.status}`;
          console.warn(`[Cred] Session fetch failed: ${resp.status}`);
          return null;
        }
        const data = await resp.json().catch(() => ({}));
        if (data && data.accessToken) {
          return data.accessToken;
        } else {
          console.warn("[Cred] Session fetch returned no accessToken", data);
        }
      } catch (e2) {
        lastErr = e2.message || "session_error";
        console.error("[Cred] Session fetch error:", e2);
      }
      return null;
    };
    const fetchAccountCheck = async () => {
      if (!token) return null;
      const url = `${location.origin}/backend-api/accounts/check/v4-2023-04-27`;
      try {
        const resp = await fetch(url, { headers: getAuthHeaders(), credentials: "include" });
        if (!resp.ok) return null;
        const data = await resp.json();
        const accounts = data.accounts || {};
        const first = Object.values(accounts).find((a2) => a2?.account?.account_id);
        if (first) return first.account.account_id;
      } catch (e2) {
      }
      return null;
    };
    const ensureViaSession = async (tries = 3) => {
      if (token) {
        if (!mainUser) await ensureUserProfile();
        return true;
      }
      checkPassiveSources();
      if (token) {
        if (!mainUser) await ensureUserProfile();
        return true;
      }
      for (let i = 0; i < tries; i++) {
        const t2 = await fetchSession();
        if (t2) {
          updateToken(t2, "Session API");
          if (!accountId) await ensureAccountId();
          if (!mainUser) await ensureUserProfile();
          return true;
        }
        if (i < tries - 1) await new Promise((r2) => setTimeout(r2, 300 * (i + 1)));
      }
      return !!token;
    };
    const ensureUserProfile = async () => {
      const { fetchCurrentUser: fetchCurrentUser2 } = await __vitePreload(async () => {
        const { fetchCurrentUser: fetchCurrentUser3 } = await Promise.resolve().then(() => api);
        return { fetchCurrentUser: fetchCurrentUser3 };
      }, void 0 );
      const user = await fetchCurrentUser2();
      if (user && user.email) {
        updateMainUser(user.email, "/backend-api/me");
      }
    };
    const ensureAccountId = async () => {
      if (accountId) return accountId;
      checkPassiveSources();
      if (accountId) return accountId;
      if (!token) await ensureViaSession(1);
      if (token) {
        const id = await fetchAccountCheck();
        if (id) updateAccountId(id, "Account API");
      }
      return accountId || "";
    };
    const ensureReady = async (timeout = 1e4) => {
      const isReady = () => !!token && !!mainUser && !!accountId;
      if (isReady()) return true;
      checkPassiveSources();
      if (isReady()) return true;
      Logger.info("Cred", "Waiting for credentials readiness (Token + Account + User)...");
      const start = Date.now();
      const p2 = ensureViaSession();
      while (Date.now() - start < timeout) {
        if (isReady()) return true;
        await new Promise((r2) => setTimeout(r2, 500));
      }
      await p2;
      return isReady();
    };
    const debugText = () => {
      const tok = token ? `${mask(token)} (${tokenSource})` : "Nezískáno";
      const acc = accountId ? `${accountId} (${accountIdSource})` : "Nezískáno";
      const usr = mainUser ? `${mainUser}` : "Nezískáno";
      const err2 = lastErr ? `
Chyba: ${lastErr}` : "";
      return `Token: ${tok}
Účet: ${acc}
User: ${usr}${err2}`;
    };
    initInterceptors();
    checkPassiveSources();
    return {
      ensureViaSession,
      ensureReady,
      ensureAccountId,
      getAuthHeaders,
      get token() {
        return token;
      },
      get accountId() {
        return accountId;
      },
      get userLabel() {
        return mainUser;
      },
      get debug() {
        return debugText();
      }
    };
  })();
  async function fetchConversation(id, projectId2) {
    if (!Cred.token) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error("Nelze získat přihlašovací údaje (accessToken)");
    }
    const headers = Cred.getAuthHeaders();
    if (projectId2) headers.set("chatgpt-project-id", projectId2);
    const url = `${location.origin}/backend-api/conversation/${id}`;
    const init = {
      method: "GET",
      credentials: "include",
      headers
    };
    let resp = await fetchWithRetry(url, init).catch(() => null);
    if (!resp) throw new Error("Síťová chyba");
    if (resp.status === 401) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error("401: Opětovné získání přihlašovacích údajů selhalo");
      const h2 = Cred.getAuthHeaders();
      if (projectId2) h2.set("chatgpt-project-id", projectId2);
      init.headers = h2;
      resp = await fetchWithRetry(url, init).catch(() => null);
      if (!resp) throw new Error("Síťová chyba (opakovaný pokus)");
    }
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`HTTP ${resp.status}: ${txt.slice(0, 200)}`);
    }
    return resp.json();
  }
  async function downloadSandboxFile({
    conversationId,
    messageId,
    sandboxPath
  }) {
    if (!Cred.token) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error("Chybí accessToken, nelze stáhnout sandbox soubor");
    }
    const headers = Cred.getAuthHeaders();
    const pid = projectId();
    if (pid) headers.set("chatgpt-project-id", pid);
    const params = new URLSearchParams({
      message_id: messageId,
      sandbox_path: sandboxPath.replace(/^sandbox:/, "")
    });
    const url = `${location.origin}/backend-api/conversation/${conversationId}/interpreter/download?${params.toString()}`;
    const maxRetries = 4;
    let dl = null;
    let lastJson = null;
    let attemptsUsed = 0;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      attemptsUsed = attempt + 1;
      const resp = await fetchWithRetry(url, { headers, credentials: "include" });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        throw new Error(`sandbox download meta ${resp.status}: ${txt.slice(0, 200)}`);
      }
      let j2;
      try {
        j2 = await resp.json();
      } catch (e2) {
        throw new Error("Metadata sandbox download nejsou JSON");
      }
      lastJson = j2;
      if (j2.download_url) {
        dl = j2.download_url;
        break;
      }
      if (j2.status === "retry") {
        if (attempt < maxRetries) {
          const waitMs = 1e3 * (attempt + 1);
          Logger.warn("API", `Sandbox vrátil {"status":"retry"} (pokus ${attemptsUsed}/${maxRetries + 1}). Čekám ${waitMs}ms před opakováním...`);
          await sleep(waitMs);
          continue;
        }
      }
    }
    if (!dl) {
      if (lastJson?.status === "retry") {
        throw new Error(`sandbox download retry vyčerpán (pokusů: ${attemptsUsed}): status="retry" (Sandbox stále připravuje soubor)`);
      }
      throw new Error(`Sandbox download_url chybí (pokusů: ${attemptsUsed}): ${JSON.stringify(lastJson).slice(0, 200)}`);
    }
    const fname = sanitize(lastJson.file_name || sandboxPath.split("/").pop() || "sandbox_file");
    await gmDownload(dl, fname);
  }
  async function downloadSandboxFileBlob({
    conversationId,
    messageId,
    sandboxPath
  }) {
    if (!Cred.token) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error("Chybí accessToken, nelze stáhnout sandbox soubor");
    }
    const headers = Cred.getAuthHeaders();
    const pid = projectId();
    if (pid) headers.set("chatgpt-project-id", pid);
    const params = new URLSearchParams({
      message_id: messageId,
      sandbox_path: sandboxPath.replace(/^sandbox:/, "")
    });
    const url = `${location.origin}/backend-api/conversation/${conversationId}/interpreter/download?${params.toString()}`;
    const maxRetries = 4;
    let dl = null;
    let lastJson = null;
    let attemptsUsed = 0;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      attemptsUsed = attempt + 1;
      const resp = await fetchWithRetry(url, { headers, credentials: "include" });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        if (txt.includes("ace_pod_expired")) {
          throw new Error(`sandbox download meta 410: ace_pod_expired (Sandbox kontejner vypršel)`);
        }
        throw new Error(`sandbox download meta ${resp.status}: ${txt.slice(0, 200)}`);
      }
      let j2;
      try {
        j2 = await resp.json();
      } catch (e2) {
        throw new Error("Metadata sandbox download nejsou JSON");
      }
      lastJson = j2;
      if (j2.download_url) {
        dl = j2.download_url;
        break;
      }
      if (j2.status === "retry") {
        if (attempt < maxRetries) {
          const waitMs = 1e3 * (attempt + 1);
          Logger.warn("API", `Sandbox vrátil {"status":"retry"} (pokus ${attemptsUsed}/${maxRetries + 1}). Čekám ${waitMs}ms před opakováním...`);
          await sleep(waitMs);
          continue;
        }
      }
    }
    if (!dl) {
      if (lastJson?.status === "retry") {
        throw new Error(`sandbox download retry vyčerpán (pokusů: ${attemptsUsed}): status="retry" (Sandbox stále připravuje soubor)`);
      }
      throw new Error(`Sandbox download_url chybí (pokusů: ${attemptsUsed}): ${JSON.stringify(lastJson).slice(0, 200)}`);
    }
    const gmHeaders = {};
    const res = await gmFetchBlob(dl, gmHeaders);
    const fname = inferFilename(
      lastJson.file_name || sandboxPath.split("/").pop() || "sandbox_file",
      sandboxPath,
      res.mime || ""
    );
    return { blob: res.blob, mime: res.mime || "", filename: fname };
  }
  async function fetchFileMeta(fileId, headers, conversationId) {
    const u2 = new URL(`${location.origin}/backend-api/files/${fileId}`);
    if (conversationId) {
      u2.searchParams.set("conversation_id", conversationId);
    }
    const resp = await fetchWithRetry(u2.toString(), { method: "GET", headers, credentials: "include" });
    if (!resp.ok) throw new Error(`meta ${resp.status}`);
    return resp.json();
  }
  async function fetchDownloadUrlOrResponse(fileId, headers, gizmoId, conversationId) {
    const makeUrl = (gid, cid) => {
      const u2 = new URL(`${location.origin}/backend-api/files/download/${fileId}`);
      u2.searchParams.set("inline", "false");
      if (cid) {
        u2.searchParams.set("conversation_id", cid);
      }
      if (gid && fileId.startsWith("file-")) {
        u2.searchParams.set("gizmo_id", gid);
      }
      return u2.toString();
    };
    let resp = await fetchWithRetry(makeUrl(gizmoId, conversationId), { method: "GET", headers, credentials: "include" });
    if (resp.status === 403 && gizmoId) {
      Logger.debug("API", `Download ${fileId} with gizmo_id returned 403, retrying without gizmo_id...`);
      const retryResp = await fetchWithRetry(makeUrl(null, conversationId), { method: "GET", headers, credentials: "include" });
      if (retryResp.ok || retryResp.status < 400) {
        resp = retryResp;
      }
    }
    if (resp.status === 403 && conversationId) {
      Logger.debug("API", `Download ${fileId} with conversation_id returned 403, retrying without conversation_id...`);
      const retryResp = await fetchWithRetry(makeUrl(null, null), { method: "GET", headers, credentials: "include" });
      if (retryResp.ok || retryResp.status < 400) {
        resp = retryResp;
      }
    }
    if (resp.status === 403 && !conversationId && Cred.currentConvId) {
      const fallbackCid = Cred.currentConvId;
      Logger.debug("API", `Download ${fileId} without conversation_id returned 403, retrying with conversation_id ${fallbackCid}...`);
      const retryResp = await fetchWithRetry(makeUrl(null, fallbackCid), { method: "GET", headers, credentials: "include" });
      if (retryResp.ok || retryResp.status < 400) {
        resp = retryResp;
      }
    }
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`download meta ${resp.status}: ${txt.slice(0, 200)}`);
    }
    const ct = resp.headers.get("content-type") || "";
    if (ct.includes("json")) {
      const j2 = await resp.json();
      if (!j2.download_url && !j2.url) {
        throw new Error(`download meta missing url: ${JSON.stringify(j2).slice(0, 200)}`);
      }
      return j2.download_url || j2.url;
    }
    return resp;
  }
  async function fetchCurrentUser() {
    if (!Cred.token) return null;
    const url = `${location.origin}/backend-api/me`;
    const headers = Cred.getAuthHeaders();
    try {
      const resp = await fetchWithRetry(url, { method: "GET", headers, credentials: "include" });
      if (!resp.ok) {
        console.warn("fetchCurrentUser failed", resp.status);
        return null;
      }
      return await resp.json();
    } catch (e2) {
      console.error("fetchCurrentUser error", e2);
      return null;
    }
  }
  const api = Object.freeze( Object.defineProperty({
    __proto__: null,
    downloadSandboxFile,
    downloadSandboxFileBlob,
    fetchConversation,
    fetchCurrentUser,
    fetchDownloadUrlOrResponse,
    fetchFileMeta
  }, Symbol.toStringTag, { value: "Module" }));
  async function listConversationsPage({
    offset = 0,
    limit = 100,
    is_archived,
    is_starred,
    order
  }) {
    if (!Cred.token) await Cred.ensureViaSession();
    const headers = Cred.getAuthHeaders();
    const qs = new URLSearchParams({
      offset: String(offset),
      limit: String(limit)
    });
    if (typeof is_archived === "boolean") qs.set("is_archived", String(is_archived));
    if (typeof is_starred === "boolean") qs.set("is_starred", String(is_starred));
    if (order) qs.set("order", order);
    const url = `${location.origin}/backend-api/conversations?${qs.toString()}`;
    const resp = await fetch(url, { headers, credentials: "include" });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`list convs ${resp.status}: ${txt.slice(0, 120)}`);
    }
    return resp.json();
  }
  async function listProjectConversations({
    projectId: projectId2,
    cursor = 0,
    limit = 50
  }) {
    if (!Cred.token) await Cred.ensureViaSession();
    const headers = Cred.getAuthHeaders();
    const url = `${location.origin}/backend-api/gizmos/${projectId2}/conversations?cursor=${cursor}&limit=${limit}`;
    const resp = await fetch(url, { headers, credentials: "include" });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`project convs ${resp.status}: ${txt.slice(0, 120)}`);
    }
    return resp.json();
  }
  async function listGizmosSidebar(cursor) {
    if (!Cred.token) await Cred.ensureViaSession();
    const headers = Cred.getAuthHeaders();
    const url = new URL(`${location.origin}/backend-api/gizmos/snorlax/sidebar`);
    url.searchParams.set("conversations_per_gizmo", "0");
    if (cursor) url.searchParams.set("cursor", cursor);
    const resp = await fetch(url.toString(), { headers, credentials: "include" });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`gizmos sidebar ${resp.status}: ${txt.slice(0, 120)}`);
    }
    return resp.json();
  }
  async function collectAllConversationTasks(progressCb) {
    const rootSet = new Set();
    const rootInfo = new Map();
    const projectMap = new Map();
    const addRoot = (id, title) => {
      if (!id) return;
      rootSet.add(id);
      if (!rootInfo.has(id)) rootInfo.set(id, { id, title: title || "" });
    };
    const ensureProject = (projectId2, projectName) => {
      if (!projectId2) return null;
      let rec = projectMap.get(projectId2);
      if (!rec) {
        rec = { projectId: projectId2, projectName: projectName || "", convs: [] };
        projectMap.set(projectId2, rec);
      } else if (projectName && !rec.projectName) {
        rec.projectName = projectName;
      }
      return rec;
    };
    const addProjectConv = (projectId2, id, title, projectName) => {
      if (!projectId2 || !id) return;
      const rec = ensureProject(projectId2, projectName);
      if (!rec) return;
      if (!rec.convs.some((x) => x.id === id)) {
        rec.convs.push({ id, title: title || "" });
      }
      if (rootSet.has(id)) {
        rootSet.delete(id);
        rootInfo.delete(id);
      }
    };
    const fetchRootBasic = async () => {
      const limit = 100;
      let offset = 0;
      while (true) {
        const page = await listConversationsPage({ offset, limit }).catch((e2) => {
          console.warn("[ChatGPT-Multimodal-Exporter] list conversations failed", e2);
          return null;
        });
        const arr = Array.isArray(page?.items) ? page.items : [];
        arr.forEach((it) => {
          if (!it || !it.id) return;
          const id = it.id;
          const projId = it.conversation_template_id || it.gizmo_id || null;
          if (projId) addProjectConv(projId, id, it.title || "");
          else addRoot(id, it.title || "");
        });
        if (progressCb) progressCb(3, `Osobní chaty: ${offset + arr.length}${page?.total ? `/${page.total}` : ""}`);
        if (!arr.length || arr.length < limit || page && page.total !== null && offset + limit >= page.total) break;
        offset += limit;
        await sleep(120);
      }
    };
    await fetchRootBasic();
    try {
      const projectIds = new Set();
      let cursor = null;
      do {
        const sidebar = await listGizmosSidebar(cursor).catch((e2) => {
          console.warn("[ChatGPT-Multimodal-Exporter] gizmos sidebar failed", e2);
          return null;
        });
        const gizmosRaw = Array.isArray(sidebar?.gizmos) ? sidebar.gizmos : [];
        const itemsRaw = Array.isArray(sidebar?.items) ? sidebar.items : [];
        const pushGizmo = (g2) => {
          if (!g2 || !g2.id) return;
          projectIds.add(g2.id);
          ensureProject(g2.id, g2.display?.name || g2.name || "");
          const convs = Array.isArray(g2.conversations) ? g2.conversations : [];
          convs.forEach((c2) => addProjectConv(g2.id, c2.id, c2.title, g2.display?.name || g2.name));
        };
        gizmosRaw.forEach((g2) => pushGizmo(g2));
        itemsRaw.forEach((it) => {
          const g2 = it?.gizmo?.gizmo || it?.gizmo || null;
          if (!g2 || !g2.id) return;
          pushGizmo(g2);
          const convs = it?.conversations?.items;
          if (Array.isArray(convs))
            convs.forEach((c2) => addProjectConv(g2.id, c2.id, c2.title, g2.display?.name || g2.name));
        });
        cursor = sidebar && sidebar.cursor ? sidebar.cursor : null;
      } while (cursor);
      for (const pid of projectIds) {
        let cursor2 = 0;
        const limit = 50;
        while (true) {
          const page = await listProjectConversations({ projectId: pid, cursor: cursor2, limit }).catch((e2) => {
            console.warn("[ChatGPT-Multimodal-Exporter] project conversations failed", e2);
            return null;
          });
          const arr = Array.isArray(page?.items) ? page.items : [];
          arr.forEach((it) => {
            if (!it || !it.id) return;
            addProjectConv(pid, it.id, it.title || "");
          });
          if (progressCb) progressCb(5, `Projekt ${pid}: ${cursor2 + arr.length}${page?.total ? `/${page.total}` : ""}`);
          if (!arr.length || arr.length < limit || page && page.total !== null && cursor2 + limit >= page.total) break;
          cursor2 += limit;
          await sleep(120);
        }
      }
    } catch (e2) {
      console.warn("[ChatGPT-Multimodal-Exporter] project list error", e2);
    }
    const rootIds = Array.from(rootSet);
    const roots = Array.from(rootInfo.values());
    const projects = Array.from(projectMap.values());
    return { rootIds, roots, projects };
  }
  async function fetchConvWithRetry(id, projectId2, retries = 3) {
    let attempt = 0;
    let lastErr = null;
    while (attempt <= retries) {
      try {
        return await fetchConversation(id, projectId2 || void 0);
      } catch (e2) {
        lastErr = e2;
        attempt++;
        if (attempt <= retries) {
          const is429 = e2?.message && e2.message.includes("429");
          const baseDelay = is429 ? 2500 : 500;
          const delay = baseDelay * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 500);
          console.warn(`[fetchConvWithRetry] Opakovaný pokus ${attempt}/${retries} pro konverzaci ${id} po ${delay}ms: ${e2?.message}`);
          await sleep(delay);
        }
      }
    }
    throw lastErr || new Error("fetch_failed");
  }
  async function fetchConversationsBatch(tasks, concurrency, progressCb, cancelRef) {
    const total = tasks.length;
    if (!total) return [];
    const results = new Array(total);
    let done = 0;
    let index = 0;
    let fatalErr = null;
    const worker = async () => {
      while (true) {
        if (cancelRef && cancelRef.cancel) return;
        if (fatalErr) return;
        const i = index++;
        if (i >= total) return;
        const t2 = tasks[i];
        try {
          const data = await fetchConvWithRetry(t2.id, t2.projectId, 2);
          results[i] = data;
          done++;
          const pct = total ? Math.round(done / total * 60) + 10 : 10;
          if (progressCb) progressCb(pct, `Export JSON: ${done}/${total}`);
        } catch (e2) {
          fatalErr = e2;
          return;
        }
      }
    };
    const n2 = Math.max(1, Math.min(concurrency || 1, total));
    const workers = [];
    for (let i = 0; i < n2; i++) workers.push(worker());
    await Promise.all(workers);
    if (fatalErr) throw fatalErr;
    return results;
  }
  const DB_NAME = "ChatGPTExporterDB";
  const STORE_NAME = "handles";
  const HANDLE_KEY = "root_dir_handle";
  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function getHandleFromDB() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(HANDLE_KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async function saveHandleToDB(handle) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(handle, HANDLE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
  async function getRootHandle() {
    try {
      const handle = await getHandleFromDB();
      return handle || null;
    } catch (e2) {
      console.warn("Failed to get handle from DB", e2);
      return null;
    }
  }
  async function pickAndSaveRootHandle() {
    const handle = await window.showDirectoryPicker();
    await saveHandleToDB(handle);
    return handle;
  }
  async function verifyPermission(handle, readWrite = false) {
    const options = {};
    if (readWrite) {
      options.mode = "readwrite";
    }
    if (await handle.queryPermission(options) === "granted") {
      return true;
    }
    if (await handle.requestPermission(options) === "granted") {
      return true;
    }
    return false;
  }
  function isTransientFsError(e2) {
    if (!e2) return false;
    const msg = e2.message || String(e2);
    return msg.includes("cached state") || msg.includes("state has changed") || msg.includes("could not be found") || e2.name === "InvalidStateError" || e2.name === "NotFoundError" || e2.name === "NoModificationAllowedError";
  }
  function isNameNotAllowedError(e2) {
    if (!e2) return false;
    const msg = e2.message || String(e2);
    return msg.includes("not allowed") || msg.includes("Name is not allowed") || e2.name === "TypeError" || e2.name === "NotAllowedError";
  }
  async function ensureFolder$1(parent, name, reacquireParent) {
    let currentParent = parent;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await currentParent.getDirectoryHandle(name, { create: true });
      } catch (e2) {
        if (attempt === 0 && isTransientFsError(e2)) {
          await new Promise((r2) => setTimeout(r2, 150));
          continue;
        }
        throw e2;
      }
    }
    return await currentParent.getDirectoryHandle(name, { create: true });
  }
  async function writeFile(parent, name, content, reacquireParent) {
    let currentParent = parent;
    let targetName = name;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const fileHandle = await currentParent.getFileHandle(targetName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        return targetName;
      } catch (e2) {
        if (targetName === name && isNameNotAllowedError(e2)) {
          const fallbackName = deterministicSafeFilename(name);
          console.warn(`[fileSystem] getFileHandle "${name}" odmítnuto (${e2.message}). Používám bezpečný fallback název "${fallbackName}".`);
          targetName = fallbackName;
          continue;
        }
        if (isTransientFsError(e2)) {
          if (reacquireParent) {
            try {
              console.warn(`[fileSystem] writeFile "${targetName}" narazil na chybu handle (${e2.message}). Znovu získávám parent handle...`);
              currentParent = await reacquireParent();
            } catch (reacquireErr) {
              console.warn("[fileSystem] Selhalo znovuzískání parent handle:", reacquireErr);
            }
          }
          if (attempt < 2) {
            await new Promise((r2) => setTimeout(r2, 150));
            continue;
          }
        }
        throw e2;
      }
    }
    return targetName;
  }
  async function fileExists(parent, name) {
    try {
      await parent.getFileHandle(name);
      return true;
    } catch (e2) {
      return false;
    }
  }
  async function readFile(parent, name) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const fileHandle2 = await parent.getFileHandle(name);
        const file2 = await fileHandle2.getFile();
        return await file2.text();
      } catch (e2) {
        if (attempt === 0 && isTransientFsError(e2)) {
          await new Promise((r2) => setTimeout(r2, 150));
          continue;
        }
        throw e2;
      }
    }
    const fileHandle = await parent.getFileHandle(name);
    const file = await fileHandle.getFile();
    return await file.text();
  }
  const STATE_FILENAME = "autosave_state.json";
  let stateCache = null;
  async function loadState(userFolder) {
    try {
      const content = await readFile(userFolder, STATE_FILENAME);
      const state = JSON.parse(content);
      if (!state.workspaces) state.workspaces = {};
      if (!state.user) state.user = { id: "", email: "" };
      Object.values(state.workspaces).forEach((ws) => {
        if (!ws.gizmos) ws.gizmos = {};
      });
      stateCache = state;
      return state;
    } catch (e2) {
      if (e2.name !== "NotFoundError") {
        Logger.warn("AutoSaveState", "Failed to load state", e2);
      }
    }
    return {
      user: { id: "", email: "" },
      workspaces: {},
      conversations: {}
    };
  }
  async function saveState(state, userFolder) {
    try {
      stateCache = state;
      await writeFile(userFolder, STATE_FILENAME, JSON.stringify(state, null, 2));
    } catch (e2) {
      Logger.error("AutoSaveState", "Failed to save state", e2);
    }
  }
  async function updateConversationState(userFolder, id, updateTime, savedAt, workspaceId, gizmoId) {
    const state = await loadState(userFolder);
    state.conversations[id] = {
      id,
      update_time: updateTime,
      saved_at: savedAt,
      workspace_id: workspaceId,
      gizmo_id: gizmoId
    };
    await saveState(state, userFolder);
  }
  async function updateWorkspaceCheckTime(userFolder, workspaceId) {
    const state = await loadState(userFolder);
    if (!state.workspaces[workspaceId]) {
      state.workspaces[workspaceId] = { id: workspaceId, last_check_time: 0, gizmos: {} };
    }
    state.workspaces[workspaceId].last_check_time = Date.now();
    await saveState(state, userFolder);
  }
  async function updateGizmoCheckTime(userFolder, workspaceId, gizmoId) {
    const state = await loadState(userFolder);
    if (!state.workspaces[workspaceId]) {
      state.workspaces[workspaceId] = { id: workspaceId, last_check_time: 0, gizmos: {} };
    }
    if (!state.workspaces[workspaceId].gizmos) {
      state.workspaces[workspaceId].gizmos = {};
    }
    state.workspaces[workspaceId].gizmos[gizmoId] = {
      id: gizmoId,
      last_check_time: Date.now()
    };
    await saveState(state, userFolder);
  }
  function collectFileCandidates(conv) {
    const mapping = conv && conv.mapping || {};
    const out = new Map();
    const convId2 = conv?.conversation_id || "";
    const gizmoId = conv?.gizmo_id || null;
    const add = (fileId, info) => {
      if (!fileId) return;
      if (out.has(fileId)) return;
      out.set(fileId, { file_id: fileId, conversation_id: convId2, gizmo_id: gizmoId, ...info });
    };
    for (const key in mapping) {
      const node = mapping[key];
      if (!node || !node.message) continue;
      const msg = node.message;
      const meta = msg.metadata || {};
      const c2 = msg.content || {};
      (meta.attachments || []).forEach((att) => {
        if (!att) return;
        const rawUrl = att.download_url || att.url;
        const cleanUrl2 = rawUrl && typeof rawUrl === "string" && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) ? rawUrl : void 0;
        let sedimentId = null;
        if (rawUrl && typeof rawUrl === "string" && rawUrl.startsWith("sediment://")) {
          sedimentId = resolveSedimentPointer(rawUrl);
        }
        const cleanAttId = att.id && typeof att.id === "string" ? pointerToFileId(att.id) : att.id;
        const cleanFileId = att.file_id && typeof att.file_id === "string" ? pointerToFileId(att.file_id) : att.file_id;
        const cleanLibId = att.library_file_id && typeof att.library_file_id === "string" ? pointerToFileId(att.library_file_id) : att.library_file_id;
        const primaryId = cleanAttId && (cleanAttId.startsWith("file-") || cleanAttId.startsWith("file_")) ? cleanAttId : cleanLibId || cleanFileId || sedimentId || cleanAttId;
        if (!primaryId) return;
        add(primaryId, {
          source: "attachment",
          candidate_type: "attachment",
          meta: att,
          message_id: msg.id,
          library_file_id: cleanLibId || null,
          name: att.name || att.file_name,
          mime_type: att.mime_type || att.mime,
          size_bytes: att.size || att.size_bytes,
          download_url: cleanUrl2
        });
      });
      const crefByFile = meta.content_references_by_file || {};
      Object.values(crefByFile).flat().forEach((ref) => {
        if (ref?.file_id) add(pointerToFileId(ref.file_id), { source: "cref", candidate_type: "cref", meta: ref, message_id: msg.id });
        if (ref?.asset_pointer) {
          const fid = pointerToFileId(ref.asset_pointer);
          add(fid, { source: "cref-pointer", candidate_type: "cref-pointer", pointer: ref.asset_pointer, meta: ref, message_id: msg.id });
        }
      });
      const n7 = meta.n7jupd_crefs_by_file || meta.n7jupd_crefs || {};
      const n7list = Array.isArray(n7) ? n7 : Object.values(n7).flat();
      n7list.forEach((ref) => {
        if (ref?.file_id) add(pointerToFileId(ref.file_id), { source: "n7jupd-cref", candidate_type: "n7jupd-cref", meta: ref, message_id: msg.id });
      });
      if (Array.isArray(c2.parts)) {
        c2.parts.forEach((part) => {
          if (part && typeof part === "object" && part.content_type && part.asset_pointer) {
            const fid = pointerToFileId(part.asset_pointer);
            add(fid, { source: part.content_type, candidate_type: part.content_type, pointer: part.asset_pointer, meta: part, message_id: msg.id });
          }
          if (part && typeof part === "object" && part.audio_asset_pointer && part.audio_asset_pointer.asset_pointer) {
            const ap = part.audio_asset_pointer;
            const fid = pointerToFileId(ap.asset_pointer);
            add(fid, { source: "voice-audio", candidate_type: "voice-audio", pointer: ap.asset_pointer, meta: ap, message_id: msg.id });
          }
        });
      }
      if (c2.content_type === "text" && Array.isArray(c2.parts)) {
        c2.parts.forEach((txt) => {
          if (typeof txt !== "string") return;
          const matches = txt.match(/\{\{file:([^}]+)\}\}/g) || [];
          matches.forEach((tok) => {
            const fid = tok.slice(7, -2);
            add(fid, { source: "inline-placeholder", candidate_type: "inline-placeholder", message_id: msg.id });
          });
          const sandboxLinks = txt.match(/sandbox:[^\s\)]+/g) || [];
          sandboxLinks.forEach((s2) => {
            const cleanS = normalizeSandboxPointer(s2);
            if (cleanS) {
              add(cleanS, { source: "sandbox-link", candidate_type: "sandbox-link", pointer: cleanS, message_id: msg.id });
            }
          });
        });
      }
    }
    return [...out.values()];
  }
  var i$1 = Symbol.for("preact-signals");
  function t() {
    if (!(s > 1)) {
      var i, t2 = false;
      while (void 0 !== h$1) {
        var r2 = h$1;
        h$1 = void 0;
        f++;
        while (void 0 !== r2) {
          var o2 = r2.o;
          r2.o = void 0;
          r2.f &= -3;
          if (!(8 & r2.f) && c(r2)) try {
            r2.c();
          } catch (r3) {
            if (!t2) {
              i = r3;
              t2 = true;
            }
          }
          r2 = o2;
        }
      }
      f = 0;
      s--;
      if (t2) throw i;
    } else s--;
  }
  function r(i) {
    if (s > 0) return i();
    s++;
    try {
      return i();
    } finally {
      t();
    }
  }
  var o = void 0;
  function n(i) {
    var t2 = o;
    o = void 0;
    try {
      return i();
    } finally {
      o = t2;
    }
  }
  var h$1 = void 0, s = 0, f = 0, v = 0;
  function e(i) {
    if (void 0 !== o) {
      var t2 = i.n;
      if (void 0 === t2 || t2.t !== o) {
        t2 = { i: 0, S: i, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 };
        if (void 0 !== o.s) o.s.n = t2;
        o.s = t2;
        i.n = t2;
        if (32 & o.f) i.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = o.s;
          t2.n = void 0;
          o.s.n = t2;
          o.s = t2;
        }
        return t2;
      }
    }
  }
  function u(i, t2) {
    this.v = i;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  u.prototype.brand = i$1;
  u.prototype.h = function() {
    return true;
  };
  u.prototype.S = function(i) {
    var t2 = this, r2 = this.t;
    if (r2 !== i && void 0 === i.e) {
      i.x = r2;
      this.t = i;
      if (void 0 !== r2) r2.e = i;
      else n(function() {
        var i2;
        null == (i2 = t2.W) || i2.call(t2);
      });
    }
  };
  u.prototype.U = function(i) {
    var t2 = this;
    if (void 0 !== this.t) {
      var r2 = i.e, o2 = i.x;
      if (void 0 !== r2) {
        r2.x = o2;
        i.e = void 0;
      }
      if (void 0 !== o2) {
        o2.e = r2;
        i.x = void 0;
      }
      if (i === this.t) {
        this.t = o2;
        if (void 0 === o2) n(function() {
          var i2;
          null == (i2 = t2.Z) || i2.call(t2);
        });
      }
    }
  };
  u.prototype.subscribe = function(i) {
    var t2 = this;
    return E$1(function() {
      var r2 = t2.value, n2 = o;
      o = void 0;
      try {
        i(r2);
      } finally {
        o = n2;
      }
    }, { name: "sub" });
  };
  u.prototype.valueOf = function() {
    return this.value;
  };
  u.prototype.toString = function() {
    return this.value + "";
  };
  u.prototype.toJSON = function() {
    return this.value;
  };
  u.prototype.peek = function() {
    var i = o;
    o = void 0;
    try {
      return this.value;
    } finally {
      o = i;
    }
  };
  Object.defineProperty(u.prototype, "value", { get: function() {
    var i = e(this);
    if (void 0 !== i) i.i = this.i;
    return this.v;
  }, set: function(i) {
    if (i !== this.v) {
      if (f > 100) throw new Error("Cycle detected");
      this.v = i;
      this.i++;
      v++;
      s++;
      try {
        for (var r2 = this.t; void 0 !== r2; r2 = r2.x) r2.t.N();
      } finally {
        t();
      }
    }
  } });
  function d(i, t2) {
    return new u(i, t2);
  }
  function c(i) {
    for (var t2 = i.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function a(i) {
    for (var t2 = i.s; void 0 !== t2; t2 = t2.n) {
      var r2 = t2.S.n;
      if (void 0 !== r2) t2.r = r2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i.s = t2;
        break;
      }
    }
  }
  function l(i) {
    var t2 = i.s, r2 = void 0;
    while (void 0 !== t2) {
      var o2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== o2) o2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = o2;
      } else r2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = o2;
    }
    i.s = r2;
  }
  function y$1(i, t2) {
    u.call(this, void 0);
    this.x = i;
    this.s = void 0;
    this.g = v - 1;
    this.f = 4;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  y$1.prototype = new u();
  y$1.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === v) return true;
    this.g = v;
    this.f |= 1;
    if (this.i > 0 && !c(this)) {
      this.f &= -2;
      return true;
    }
    var i = o;
    try {
      a(this);
      o = this;
      var t2 = this.x();
      if (16 & this.f || this.v !== t2 || 0 === this.i) {
        this.v = t2;
        this.f &= -17;
        this.i++;
      }
    } catch (i2) {
      this.v = i2;
      this.f |= 16;
      this.i++;
    }
    o = i;
    l(this);
    this.f &= -2;
    return true;
  };
  y$1.prototype.S = function(i) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
    }
    u.prototype.S.call(this, i);
  };
  y$1.prototype.U = function(i) {
    if (void 0 !== this.t) {
      u.prototype.U.call(this, i);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
      }
    }
  };
  y$1.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
    }
  };
  Object.defineProperty(y$1.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i = e(this);
    this.h();
    if (void 0 !== i) i.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function w$1(i, t2) {
    return new y$1(i, t2);
  }
  function _$1(i) {
    var r2 = i.u;
    i.u = void 0;
    if ("function" == typeof r2) {
      s++;
      var n2 = o;
      o = void 0;
      try {
        r2();
      } catch (t2) {
        i.f &= -2;
        i.f |= 8;
        b$1(i);
        throw t2;
      } finally {
        o = n2;
        t();
      }
    }
  }
  function b$1(i) {
    for (var t2 = i.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i.x = void 0;
    i.s = void 0;
    _$1(i);
  }
  function g$2(i) {
    if (o !== this) throw new Error("Out-of-order effect");
    l(this);
    o = i;
    this.f &= -2;
    if (8 & this.f) b$1(this);
    t();
  }
  function p$1(i, t2) {
    this.x = i;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
  }
  p$1.prototype.c = function() {
    var i = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t2 = this.x();
      if ("function" == typeof t2) this.u = t2;
    } finally {
      i();
    }
  };
  p$1.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    _$1(this);
    a(this);
    s++;
    var i = o;
    o = this;
    return g$2.bind(this, i);
  };
  p$1.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = h$1;
      h$1 = this;
    }
  };
  p$1.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) b$1(this);
  };
  p$1.prototype.dispose = function() {
    this.d();
  };
  function E$1(i, t2) {
    var r2 = new p$1(i, t2);
    try {
      r2.c();
    } catch (i2) {
      r2.d();
      throw i2;
    }
    var o2 = r2.d.bind(r2);
    o2[Symbol.dispose] = o2;
    return o2;
  }
  var h, p, m = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__, _ = [];
  E$1(function() {
    h = this.N;
  })();
  function g$1(i, t2) {
    l$2[i] = t2.bind(null, l$2[i] || function() {
    });
  }
  function y(i) {
    if (p) p();
    p = i && i.S();
  }
  function b(i) {
    var n2 = this, r2 = i.data, o2 = useSignal(r2);
    o2.value = r2;
    var e2 = T$1(function() {
      var i2 = n2, r3 = n2.__v;
      while (r3 = r3.__) if (r3.__c) {
        r3.__c.__$f |= 4;
        break;
      }
      var f2 = w$1(function() {
        var i3 = o2.value.value;
        return 0 === i3 ? 0 : true === i3 ? "" : i3 || "";
      }), e3 = w$1(function() {
        return !Array.isArray(f2.value) && !t$2(f2.value);
      }), u3 = E$1(function() {
        this.N = M$1;
        if (e3.value) {
          var n3 = f2.value;
          if (i2.__v && i2.__v.__e && 3 === i2.__v.__e.nodeType) i2.__v.__e.data = n3;
        }
      }), c3 = n2.__$u.d;
      n2.__$u.d = function() {
        u3();
        c3.call(this);
      };
      return [e3, f2];
    }, []), u2 = e2[0], c2 = e2[1];
    return u2.value ? c2.peek() : c2.value;
  }
  b.displayName = "ReactiveTextNode";
  Object.defineProperties(u.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: b }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  g$1("__b", function(i, n2) {
    if (m && "function" == typeof n2.type) window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent();
    if ("string" == typeof n2.type) {
      var t2, r2 = n2.props;
      for (var f2 in r2) if ("children" !== f2) {
        var o2 = r2[f2];
        if (o2 instanceof u) {
          if (!t2) n2.__np = t2 = {};
          t2[f2] = o2;
          r2[f2] = o2.peek();
        }
      }
    }
    i(n2);
  });
  g$1("__r", function(i, n2) {
    if (m && "function" == typeof n2.type) window.__PREACT_SIGNALS_DEVTOOLS__.enterComponent(n2);
    if (n2.type !== k$3) {
      y();
      var t2, f2 = n2.__c;
      if (f2) {
        f2.__$f &= -2;
        if (void 0 === (t2 = f2.__$u)) f2.__$u = t2 = (function(i2) {
          var n3;
          E$1(function() {
            n3 = this;
          });
          n3.c = function() {
            f2.__$f |= 1;
            f2.setState({});
          };
          return n3;
        })();
      }
      y(t2);
    }
    i(n2);
  });
  g$1("__e", function(i, n2, t2, r2) {
    if (m) window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent();
    y();
    i(n2, t2, r2);
  });
  g$1("diffed", function(i, n2) {
    if (m && "function" == typeof n2.type) window.__PREACT_SIGNALS_DEVTOOLS__.exitComponent();
    y();
    var t2;
    if ("string" == typeof n2.type && (t2 = n2.__e)) {
      var r2 = n2.__np, f2 = n2.props;
      if (r2) {
        var o2 = t2.U;
        if (o2) for (var e2 in o2) {
          var u2 = o2[e2];
          if (void 0 !== u2 && !(e2 in r2)) {
            u2.d();
            o2[e2] = void 0;
          }
        }
        else {
          o2 = {};
          t2.U = o2;
        }
        for (var a2 in r2) {
          var c2 = o2[a2], v2 = r2[a2];
          if (void 0 === c2) {
            c2 = k$1(t2, a2, v2, f2);
            o2[a2] = c2;
          } else c2.o(v2, f2);
        }
      }
    }
    i(n2);
  });
  function k$1(i, n2, t2, r2) {
    var f2 = n2 in i && void 0 === i.ownerSVGElement, o2 = d(t2);
    return { o: function(i2, n3) {
      o2.value = i2;
      r2 = n3;
    }, d: E$1(function() {
      this.N = M$1;
      var t3 = o2.value.value;
      if (r2[n2] !== t3) {
        r2[n2] = t3;
        if (f2) i[n2] = t3;
        else if (null != t3 && (false !== t3 || "-" === n2[4])) i.setAttribute(n2, t3);
        else i.removeAttribute(n2);
      }
    }) };
  }
  g$1("unmount", function(i, n2) {
    if ("string" == typeof n2.type) {
      var t2 = n2.__e;
      if (t2) {
        var r2 = t2.U;
        if (r2) {
          t2.U = void 0;
          for (var f2 in r2) {
            var o2 = r2[f2];
            if (o2) o2.d();
          }
        }
      }
    } else {
      var e2 = n2.__c;
      if (e2) {
        var u2 = e2.__$u;
        if (u2) {
          e2.__$u = void 0;
          u2.d();
        }
      }
    }
    i(n2);
  });
  g$1("__h", function(i, n2, t2, r2) {
    if (r2 < 3 || 9 === r2) n2.__$f |= 2;
    i(n2, t2, r2);
  });
  x$3.prototype.shouldComponentUpdate = function(i, n2) {
    var t2 = this.__$u, r2 = t2 && void 0 !== t2.s;
    for (var f2 in n2) return true;
    if (this.__f || "boolean" == typeof this.u && true === this.u) {
      var o2 = 2 & this.__$f;
      if (!(r2 || o2 || 4 & this.__$f)) return true;
      if (1 & this.__$f) return true;
    } else {
      if (!(r2 || 4 & this.__$f)) return true;
      if (3 & this.__$f) return true;
    }
    for (var e2 in i) if ("__source" !== e2 && i[e2] !== this.props[e2]) return true;
    for (var u2 in this.props) if (!(u2 in i)) return true;
    return false;
  };
  function useSignal(i, n2) {
    return d$1(function() {
      return d(i, n2);
    })[0];
  }
  var A$1 = function(i) {
    queueMicrotask(function() {
      queueMicrotask(i);
    });
  };
  function F$1() {
    r(function() {
      var i;
      while (i = _.shift()) h.call(i);
    });
  }
  function M$1() {
    if (1 === _.push(this)) (l$2.requestAnimationFrame || A$1)(F$1);
  }
  const _status = d("idle");
  const _message = d("");
  const _lastRun = d(0);
  const _nextRun = d(0);
  const _role = d("unknown");
  const _lastError = d(null);
  const _isLeader = w$1(() => _role.value === "leader");
  const autoSaveStore = {
status: _status,
    message: _message,
    lastRun: _lastRun,
    nextRun: _nextRun,
    role: _role,
    lastError: _lastError,
    isLeader: _isLeader,
setStatus(state, msg = "") {
      _status.value = state;
      _message.value = msg;
    },
    setRole(role) {
      _role.value = role;
    },
    setLastRun(time) {
      _lastRun.value = time;
    },
    setNextRun(time) {
      _nextRun.value = time;
    },
    setError(errorMsg) {
      _status.value = "error";
      _message.value = errorMsg;
      _lastError.value = errorMsg;
    },
    resetError() {
      if (_status.value === "error") {
        _status.value = "idle";
        _message.value = "";
      }
      _lastError.value = null;
    }
  };
  const STATE_LOCK_NAME = "chatgpt_exporter_state_mutex";
  const LEADER_LOCK_NAME = "chatgpt_exporter_autosave_leader";
  async function runExclusiveStateOp(callback) {
    if (!navigator.locks) {
      throw new Error("Web Locks API is not supported. AutoSave disabled.");
    }
    return navigator.locks.request(STATE_LOCK_NAME, { mode: "exclusive" }, async () => {
      try {
        return await callback();
      } catch (e2) {
        Logger.error("Mutex", "Error inside exclusive state operation", e2);
        throw e2;
      }
    });
  }
  async function tryAcquireLeader(onLeaderAcquired) {
    if (!navigator.locks) {
      throw new Error("Web Locks API is not supported. AutoSave disabled.");
    }
    const result = await navigator.locks.request(LEADER_LOCK_NAME, { ifAvailable: true }, async (lock) => {
      if (!lock) {
        return false;
      }
      Logger.info("Mutex", "Leader lock acquired. Starting AutoSave loop.");
      try {
        await onLeaderAcquired();
      } finally {
        Logger.info("Mutex", "Leader lock released.");
      }
      return true;
    });
    return result === true;
  }
  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function escapeHtmlAttr(text) {
    return escapeHtml(text).replace(/\n/g, "&#10;").replace(/\r/g, "&#13;");
  }
  function stripChatgptUtm(url) {
    try {
      const parsed = new URL(url);
      if (parsed.searchParams.has("utm_source")) {
        parsed.searchParams.delete("utm_source");
      }
      return parsed.toString();
    } catch (e2) {
      return url.replace(/([?&])utm_source=chatgpt\.com(&|$)/, (_match, p1, p2) => {
        if (p2 === "&") return p1;
        return "";
      });
    }
  }
  function getHostname(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (e2) {
      return url;
    }
  }
  function getFaviconUrl(url) {
    try {
      const parsed = new URL(url);
      return `${parsed.origin}/favicon.ico`;
    } catch (e2) {
      return "";
    }
  }
  function getThoughtsText(content) {
    if (!content) return "";
    if (Array.isArray(content.parts)) {
      return content.parts.map((part) => typeof part === "string" ? part : part?.text || part?.content || "").filter((part) => part.trim() !== "").join("\n");
    }
    if (Array.isArray(content.thoughts)) {
      return content.thoughts.map((thought) => typeof thought === "string" ? thought : thought?.text || thought?.content || "").filter((thought) => thought.trim() !== "").join("\n");
    }
    if (typeof content.thoughts === "string") {
      return content.thoughts;
    }
    if (typeof content.text === "string") {
      return content.text;
    }
    return "";
  }
  function normalizeListIndentation(text) {
    const lines = text.split("\n");
    let inFence = false;
    const fenceRegex = /^(```|~~~)/;
    const listRegex = /^([ \t\u00a0\u3000]{1,3})(\d+\.[ \t]+|[-*+][ \t]+)/;
    return lines.map((line) => {
      const trimmed = line.trimStart();
      if (fenceRegex.test(trimmed)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const match = line.match(listRegex);
      if (!match) return line;
      return line.slice(match[1].length);
    }).join("\n");
  }
  function _getDefaults() {
    return {
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      renderer: null,
      silent: false,
      tokenizer: null,
      walkTokens: null
    };
  }
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }
  var noopTest = { exec: () => null };
  function edit(regex, opt = "") {
    let source = typeof regex === "string" ? regex : regex.source;
    const obj = {
      replace: (name, val) => {
        let valSource = typeof val === "string" ? val : val.source;
        valSource = valSource.replace(other.caret, "$1");
        source = source.replace(name, valSource);
        return obj;
      },
      getRegex: () => {
        return new RegExp(source, opt);
      }
    };
    return obj;
  }
  var other = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
    htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
  };
  var newline = /^(?:[ \t]*(?:\n|$))+/;
  var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var bullet = /(?:[*+-]|\d{1,9}[.)])/;
  var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var blockText = /^[^\n]+/;
  var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
  var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var html = edit(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i"
  ).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
  var blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
  };
  var gfmTable = edit(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  ).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockGfm = {
    ...blockNormal,
    lheading: lheadingGfm,
    table: gfmTable,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
  };
  var blockPedantic = {
    ...blockNormal,
    html: edit(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  };
  var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var br = /^( {2,}|\\)\n(?!\s*$)/;
  var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var _punctuation = /[\p{P}\p{S}]/u;
  var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
  var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
  var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
  var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
  var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
  var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimUnd = edit(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu"
  ).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
  var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
  var tag = edit(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  ).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
  var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
  var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
  var inlineNormal = {
    _backpedal: noopTest,
anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
  };
  var inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
  };
  var inlineGfm = {
    ...inlineNormal,
    emStrongRDelimAst: emStrongRDelimAstGfm,
    emStrongLDelim: emStrongLDelimGfm,
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  var inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace("{2,}", "*").getRegex(),
    text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
  };
  var inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
  };
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch3) => escapeReplacements[ch3];
  function escape2(html2, encode) {
    if (encode) {
      if (other.escapeTest.test(html2)) {
        return html2.replace(other.escapeReplace, getEscapeReplacement);
      }
    } else {
      if (other.escapeTestNoEncode.test(html2)) {
        return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html2;
  }
  function cleanUrl(href) {
    try {
      href = encodeURI(href).replace(other.percentDecode, "%");
    } catch {
      return null;
    }
    return href;
  }
  function splitCells(tableRow, count) {
    const row = tableRow.replace(other.findPipe, (match, offset, str) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(other.splitPipe);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !cells.at(-1)?.trim()) {
      cells.pop();
    }
    if (count) {
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(other.slashPipe, "|");
    }
    return cells;
  }
  function rtrim(str, c2, invert) {
    const l2 = str.length;
    if (l2 === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l2) {
      const currChar = str.charAt(l2 - suffLen - 1);
      if (currChar === c2 && true) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.slice(0, l2 - suffLen);
  }
  function findClosingBracket(str, b2) {
    if (str.indexOf(b2[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b2[0]) {
        level++;
      } else if (str[i] === b2[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    if (level > 0) {
      return -2;
    }
    return -1;
  }
  function outputLink(cap, link2, raw, lexer2, rules) {
    const href = link2.href;
    const title = link2.title || null;
    const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
    lexer2.state.inLink = true;
    const token = {
      type: cap[0].charAt(0) === "!" ? "image" : "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  function indentCodeCompensation(raw, text, rules) {
    const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(rules.other.beginningSpace);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    options;
    rules;
lexer;
constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text, "\n") : text
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
          text
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text = cap[2].trim();
        if (this.rules.other.endingHash.test(text)) {
          const trimmed = rtrim(text, "#");
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
            text = trimmed.trim();
          }
        }
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: rtrim(cap[0], "\n")
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        let lines = rtrim(cap[0], "\n").split("\n");
        let raw = "";
        let text = "";
        const tokens = [];
        while (lines.length > 0) {
          let inBlockquote = false;
          const currentLines = [];
          let i;
          for (i = 0; i < lines.length; i++) {
            if (this.rules.other.blockquoteStart.test(lines[i])) {
              currentLines.push(lines[i]);
              inBlockquote = true;
            } else if (!inBlockquote) {
              currentLines.push(lines[i]);
            } else {
              break;
            }
          }
          lines = lines.slice(i);
          const currentRaw = currentLines.join("\n");
          const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
          raw = raw ? `${raw}
${currentRaw}` : currentRaw;
          text = text ? `${text}
${currentText}` : currentText;
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          this.lexer.blockTokens(currentText, tokens, true);
          this.lexer.state.top = top;
          if (lines.length === 0) {
            break;
          }
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "code") {
            break;
          } else if (lastToken?.type === "blockquote") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.blockquote(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
            break;
          } else if (lastToken?.type === "list") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.list(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
            lines = newText.substring(tokens.at(-1).raw.length).split("\n");
            continue;
          }
        }
        return {
          type: "blockquote",
          raw,
          tokens,
          text
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list2 = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = this.rules.other.listItemRegex(bull);
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          let raw = "";
          let itemContents = "";
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t2) => " ".repeat(3 * t2.length));
          let nextLine = src.split("\n", 1)[0];
          let blankLine = !line.trim();
          let indent = 0;
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimStart();
          } else if (blankLine) {
            indent = cap[1].length + 1;
          } else {
            indent = cap[2].search(this.rules.other.nonSpaceChar);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          if (blankLine && this.rules.other.blankLine.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
            const hrRegex = this.rules.other.hrRegex(indent);
            const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
            const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
            const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              let nextLineWithoutTabs;
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
                nextLineWithoutTabs = nextLine;
              } else {
                nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (htmlBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(nextLine)) {
                break;
              }
              if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLineWithoutTabs.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLineWithoutTabs.slice(indent);
            }
          }
          if (!list2.loose) {
            if (endsWithBlankLine) {
              list2.loose = true;
            } else if (this.rules.other.doubleBlankLine.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          let istask = null;
          let ischecked;
          if (this.options.gfm) {
            istask = this.rules.other.listIsTask.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
            }
          }
          list2.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list2.raw += raw;
        }
        const lastItem = list2.items.at(-1);
        if (lastItem) {
          lastItem.raw = lastItem.raw.trimEnd();
          lastItem.text = lastItem.text.trimEnd();
        } else {
          return;
        }
        list2.raw = list2.raw.trimEnd();
        for (let i = 0; i < list2.items.length; i++) {
          this.lexer.state.top = false;
          list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
          if (!list2.loose) {
            const spacers = list2.items[i].tokens.filter((t2) => t2.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => this.rules.other.anyLine.test(t2.raw));
            list2.loose = hasMultipleLineBreaks;
          }
        }
        if (list2.loose) {
          for (let i = 0; i < list2.items.length; i++) {
            list2.items[i].loose = true;
          }
        }
        return list2;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          block: true,
          raw: cap[0],
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        };
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
        const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
        return {
          type: "def",
          tag: tag2,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (!cap) {
        return;
      }
      if (!this.rules.other.tableDelimiter.test(cap[2])) {
        return;
      }
      const headers = splitCells(cap[1]);
      const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
      const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
      const item = {
        type: "table",
        raw: cap[0],
        header: [],
        align: [],
        rows: []
      };
      if (headers.length !== aligns.length) {
        return;
      }
      for (const align of aligns) {
        if (this.rules.other.tableAlignRight.test(align)) {
          item.align.push("right");
        } else if (this.rules.other.tableAlignCenter.test(align)) {
          item.align.push("center");
        } else if (this.rules.other.tableAlignLeft.test(align)) {
          item.align.push("left");
        } else {
          item.align.push(null);
        }
      }
      for (let i = 0; i < headers.length; i++) {
        item.header.push({
          text: headers[i],
          tokens: this.lexer.inline(headers[i]),
          header: true,
          align: item.align[i]
        });
      }
      for (const row of rows) {
        item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
          return {
            text: cell,
            tokens: this.lexer.inline(cell),
            header: false,
            align: item.align[i]
          };
        }));
      }
      return item;
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
        return {
          type: "paragraph",
          raw: cap[0],
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: cap[1]
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: false,
          text: cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
          if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex === -2) {
            return;
          }
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link2 = this.rules.other.pedanticHrefTitle.exec(href);
          if (link2) {
            href = link2[1];
            title = link2[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (this.rules.other.startAngleBracket.test(href)) {
          if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
          title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
        }, cap[0], this.lexer, this.rules);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
        const link2 = links[linkString.toLowerCase()];
        if (!link2) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link2, cap[0], this.lexer, this.rules);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrongLDelim.exec(src);
      if (!match) return;
      if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim) continue;
          rLength = [...rDelim].length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0) continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
          const text = raw.slice(2, -2);
          return {
            type: "strong",
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
        const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
        const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        return {
          type: "codespan",
          raw: cap[0],
          text
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
    autolink(src) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[1];
          href = "mailto:" + text;
        } else {
          text = cap[1];
          href = text;
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    url(src) {
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[0];
          href = "mailto:" + text;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
          } while (prevCapZero !== cap[0]);
          text = cap[0];
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        const escaped = this.lexer.state.inRawBlock;
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          escaped
        };
      }
    }
  };
  var _Lexer = class __Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options2) {
      this.tokens = [];
      this.tokens.links = Object.create(null);
      this.options = options2 || _defaults;
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        other,
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
static get rules() {
      return {
        block,
        inline
      };
    }
static lex(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.lex(src);
    }
static lexInline(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.inlineTokens(src);
    }
lex(src) {
      src = src.replace(other.carriageReturn, "\n");
      this.blockTokens(src, this.tokens);
      for (let i = 0; i < this.inlineQueue.length; i++) {
        const next = this.inlineQueue[i];
        this.inlineTokens(next.src, next.tokens);
      }
      this.inlineQueue = [];
      return this.tokens;
    }
    blockTokens(src, tokens = [], lastParagraphClipped = false) {
      if (this.options.pedantic) {
        src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
      }
      while (src) {
        let token;
        if (this.options.extensions?.block?.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.raw.length === 1 && lastToken !== void 0) {
            lastToken.raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if (this.options.extensions?.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          const lastToken = tokens.at(-1);
          if (lastParagraphClipped && lastToken?.type === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
      return tokens;
    }
inlineTokens(src, tokens = []) {
      let maskedSrc = src;
      let match = null;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      let keepPrevChar = false;
      let prevChar = "";
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        let token;
        if (this.options.extensions?.inline?.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.type === "text" && lastToken?.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if (this.options.extensions?.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var _Renderer = class {
    options;
    parser;
constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(token) {
      return "";
    }
    code({ text, lang, escaped }) {
      const langString = (lang || "").match(other.notSpaceStart)?.[0];
      const code = text.replace(other.endingNewline, "") + "\n";
      if (!langString) {
        return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      return `<blockquote>
${body}</blockquote>
`;
    }
    html({ text }) {
      return text;
    }
    heading({ tokens, depth }) {
      return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
    }
    hr(token) {
      return "<hr>\n";
    }
    list(token) {
      const ordered = token.ordered;
      const start = token.start;
      let body = "";
      for (let j2 = 0; j2 < token.items.length; j2++) {
        const item = token.items[j2];
        body += this.listitem(item);
      }
      const type = ordered ? "ol" : "ul";
      const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
    }
    listitem(item) {
      let itemBody = "";
      if (item.task) {
        const checkbox = this.checkbox({ checked: !!item.checked });
        if (item.loose) {
          if (item.tokens[0]?.type === "paragraph") {
            item.tokens[0].text = checkbox + " " + item.tokens[0].text;
            if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
              item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
              item.tokens[0].tokens[0].escaped = true;
            }
          } else {
            item.tokens.unshift({
              type: "text",
              raw: checkbox + " ",
              text: checkbox + " ",
              escaped: true
            });
          }
        } else {
          itemBody += checkbox + " ";
        }
      }
      itemBody += this.parser.parse(item.tokens, !!item.loose);
      return `<li>${itemBody}</li>
`;
    }
    checkbox({ checked }) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens }) {
      return `<p>${this.parser.parseInline(tokens)}</p>
`;
    }
    table(token) {
      let header = "";
      let cell = "";
      for (let j2 = 0; j2 < token.header.length; j2++) {
        cell += this.tablecell(token.header[j2]);
      }
      header += this.tablerow({ text: cell });
      let body = "";
      for (let j2 = 0; j2 < token.rows.length; j2++) {
        const row = token.rows[j2];
        cell = "";
        for (let k2 = 0; k2 < row.length; k2++) {
          cell += this.tablecell(row[k2]);
        }
        body += this.tablerow({ text: cell });
      }
      if (body) body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow({ text }) {
      return `<tr>
${text}</tr>
`;
    }
    tablecell(token) {
      const content = this.parser.parseInline(token.tokens);
      const type = token.header ? "th" : "td";
      const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
      return tag2 + content + `</${type}>
`;
    }
strong({ tokens }) {
      return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    em({ tokens }) {
      return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    codespan({ text }) {
      return `<code>${escape2(text, true)}</code>`;
    }
    br(token) {
      return "<br>";
    }
    del({ tokens }) {
      return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + escape2(title) + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image({ href, title, text, tokens }) {
      if (tokens) {
        text = this.parser.parseInline(tokens, this.parser.textRenderer);
      }
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return escape2(text);
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${escape2(title)}"`;
      }
      out += ">";
      return out;
    }
    text(token) {
      return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
    }
  };
  var _TextRenderer = class {
strong({ text }) {
      return text;
    }
    em({ text }) {
      return text;
    }
    codespan({ text }) {
      return text;
    }
    del({ text }) {
      return text;
    }
    html({ text }) {
      return text;
    }
    text({ text }) {
      return text;
    }
    link({ text }) {
      return "" + text;
    }
    image({ text }) {
      return "" + text;
    }
    br() {
      return "";
    }
  };
  var _Parser = class __Parser {
    options;
    renderer;
    textRenderer;
    constructor(options2) {
      this.options = options2 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.renderer.parser = this;
      this.textRenderer = new _TextRenderer();
    }
static parse(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parse(tokens);
    }
static parseInline(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parseInline(tokens);
    }
parse(tokens, top = true) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if (this.options.extensions?.renderers?.[anyToken.type]) {
          const genericToken = anyToken;
          const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "space": {
            out += this.renderer.space(token);
            continue;
          }
          case "hr": {
            out += this.renderer.hr(token);
            continue;
          }
          case "heading": {
            out += this.renderer.heading(token);
            continue;
          }
          case "code": {
            out += this.renderer.code(token);
            continue;
          }
          case "table": {
            out += this.renderer.table(token);
            continue;
          }
          case "blockquote": {
            out += this.renderer.blockquote(token);
            continue;
          }
          case "list": {
            out += this.renderer.list(token);
            continue;
          }
          case "html": {
            out += this.renderer.html(token);
            continue;
          }
          case "paragraph": {
            out += this.renderer.paragraph(token);
            continue;
          }
          case "text": {
            let textToken = token;
            let body = this.renderer.text(textToken);
            while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
              textToken = tokens[++i];
              body += "\n" + this.renderer.text(textToken);
            }
            if (top) {
              out += this.renderer.paragraph({
                type: "paragraph",
                raw: body,
                text: body,
                tokens: [{ type: "text", raw: body, text: body, escaped: true }]
              });
            } else {
              out += body;
            }
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
parseInline(tokens, renderer = this.renderer) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if (this.options.extensions?.renderers?.[anyToken.type]) {
          const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "escape": {
            out += renderer.text(token);
            break;
          }
          case "html": {
            out += renderer.html(token);
            break;
          }
          case "link": {
            out += renderer.link(token);
            break;
          }
          case "image": {
            out += renderer.image(token);
            break;
          }
          case "strong": {
            out += renderer.strong(token);
            break;
          }
          case "em": {
            out += renderer.em(token);
            break;
          }
          case "codespan": {
            out += renderer.codespan(token);
            break;
          }
          case "br": {
            out += renderer.br(token);
            break;
          }
          case "del": {
            out += renderer.del(token);
            break;
          }
          case "text": {
            out += renderer.text(token);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  var _Hooks = class {
    options;
    block;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    static passThroughHooks = new Set([
      "preprocess",
      "postprocess",
      "processAllTokens"
    ]);
preprocess(markdown) {
      return markdown;
    }
postprocess(html2) {
      return html2;
    }
processAllTokens(tokens) {
      return tokens;
    }
provideLexer() {
      return this.block ? _Lexer.lex : _Lexer.lexInline;
    }
provideParser() {
      return this.block ? _Parser.parse : _Parser.parseInline;
    }
  };
  var Marked = class {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args) {
      this.use(...args);
    }
walkTokens(tokens, callback) {
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(this, token));
        switch (token.type) {
          case "table": {
            const tableToken = token;
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                const tokens2 = genericToken[childTokens].flat(Infinity);
                values = values.concat(this.walkTokens(tokens2, callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            if (!(prop in renderer)) {
              throw new Error(`renderer '${prop}' does not exist`);
            }
            if (["options", "parser"].includes(prop)) {
              continue;
            }
            const rendererProp = prop;
            const rendererFunc = pack.renderer[rendererProp];
            const prevRenderer = renderer[rendererProp];
            renderer[rendererProp] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            if (!(prop in tokenizer)) {
              throw new Error(`tokenizer '${prop}' does not exist`);
            }
            if (["options", "rules", "lexer"].includes(prop)) {
              continue;
            }
            const tokenizerProp = prop;
            const tokenizerFunc = pack.tokenizer[tokenizerProp];
            const prevTokenizer = tokenizer[tokenizerProp];
            tokenizer[tokenizerProp] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            if (!(prop in hooks)) {
              throw new Error(`hook '${prop}' does not exist`);
            }
            if (["options", "block"].includes(prop)) {
              continue;
            }
            const hooksProp = prop;
            const hooksFunc = pack.hooks[hooksProp];
            const prevHook = hooks[hooksProp];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksProp] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksProp] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options2) {
      return _Lexer.lex(src, options2 ?? this.defaults);
    }
    parser(tokens, options2) {
      return _Parser.parse(tokens, options2 ?? this.defaults);
    }
    parseMarkdown(blockType) {
      const parse2 = (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        const throwError = this.onError(!!opt.silent, !!opt.async);
        if (this.defaults.async === true && origOpt.async === false) {
          return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        }
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
          opt.hooks.block = blockType;
        }
        const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
        const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
        } catch (e2) {
          return throwError(e2);
        }
      };
      return parse2;
    }
    onError(silent, async) {
      return (e2) => {
        e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape2(e2.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e2);
        }
        throw e2;
      };
    }
  };
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options2) {
    markedInstance.setOptions(options2);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  marked.options;
  marked.setOptions;
  marked.use;
  marked.walkTokens;
  marked.parseInline;
  _Parser.parse;
  _Lexer.lex;
  const ALLOWED_HTML_TAGS = new Set([
    "a",
    "abbr",
    "b",
    "blockquote",
    "br",
    "code",
    "del",
    "details",
    "div",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "span",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "u",
    "ul"
  ]);
  const DROP_HTML_TAGS = new Set(["script", "style", "iframe", "object", "embed", "link", "meta", "base"]);
  const GLOBAL_ALLOWED_ATTRS = new Set(["class", "title", "style", "role"]);
  const TAG_ALLOWED_ATTRS = {
    a: new Set(["href", "target", "rel"]),
    img: new Set(["src", "alt", "loading"]),
    th: new Set(["colspan", "rowspan", "align", "scope"]),
    td: new Set(["colspan", "rowspan", "align"])
  };
  const SAFE_DATA_IMAGE_PATTERN = /^data:image\/(png|jpe?g|gif|webp);base64,/i;
  function isSafeUrl(url, tagName) {
    const trimmed = (url || "").trim();
    if (!trimmed) return true;
    const lower = trimmed.toLowerCase();
    if (lower.startsWith("javascript:") || lower.startsWith("vbscript:")) return false;
    if (lower.startsWith("data:")) {
      return tagName === "img" && SAFE_DATA_IMAGE_PATTERN.test(lower);
    }
    if (lower.startsWith("http:") || lower.startsWith("https:") || lower.startsWith("mailto:") || lower.startsWith("tel:") || lower.startsWith("sandbox:") || lower.startsWith("//")) {
      return true;
    }
    return !/^[a-z][a-z0-9+.-]*:/.test(lower);
  }
  function isSafeStyle(style) {
    const lower = (style || "").toLowerCase();
    if (lower.includes("expression(")) return false;
    if (lower.includes("javascript:")) return false;
    if (/url\(\s*['"]?\s*javascript:/i.test(lower)) return false;
    if (/url\(\s*['"]?\s*data:text\/html/i.test(lower)) return false;
    return true;
  }
  function isAllowedAttr(tagName, attrName) {
    if (attrName.startsWith("data-")) return true;
    if (attrName.startsWith("aria-")) return true;
    if (GLOBAL_ALLOWED_ATTRS.has(attrName)) return true;
    const tagAllowed = TAG_ALLOWED_ATTRS[tagName];
    return Boolean(tagAllowed && tagAllowed.has(attrName));
  }
  function sanitizeElementAttributes(el, tagName) {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (!isAllowedAttr(tagName, name)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if ((name === "href" || name === "src") && !isSafeUrl(attr.value, tagName)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (name === "style" && !isSafeStyle(attr.value)) {
        el.removeAttribute(attr.name);
      }
    }
    if (tagName === "a" && el.getAttribute("target") === "_blank") {
      const rel = (el.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (!rel.includes("noopener")) rel.push("noopener");
      if (!rel.includes("noreferrer")) rel.push("noreferrer");
      el.setAttribute("rel", rel.join(" "));
    }
  }
  function sanitizeHtmlContent(html2) {
    if (!html2) return html2;
    if (typeof DOMParser === "undefined") return html2;
    const doc = new DOMParser().parseFromString(html2, "text/html");
    const elements = Array.from(doc.body.querySelectorAll("*"));
    for (const el of elements) {
      if (!el.parentNode) continue;
      const tagName = el.tagName.toLowerCase();
      if (!ALLOWED_HTML_TAGS.has(tagName)) {
        if (DROP_HTML_TAGS.has(tagName)) {
          el.remove();
          continue;
        }
        const parent = el.parentNode;
        if (!parent) continue;
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
        continue;
      }
      sanitizeElementAttributes(el, tagName);
    }
    return doc.body.innerHTML;
  }
  function isImageFile(name, mime) {
    if (mime && mime.startsWith("image/")) return true;
    return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name);
  }
  function findExportedAttachment(allAttachments, key) {
    return allAttachments.find(
      (att) => att.file_id === key || att.id === key || att.pointer === key
    );
  }
  function collectMessageAttachments(msg, allAttachments, textContent, inlineKeys) {
    const out = [];
    const seen2 = new Set();
    const addByKey = (key, meta2) => {
      const normalized = key ? key.replace("sediment://", "") : "";
      if (!normalized) return;
      if (inlineKeys.has(normalized) || inlineKeys.has(key)) return;
      const found = findExportedAttachment(allAttachments, normalized) || findExportedAttachment(allAttachments, key);
      if (!found) return;
      const name = found.saved_as || found.name || found.original_name || meta2?.name || meta2?.file_name || normalized;
      if (!name) return;
      const url = `attachments/${name}`;
      if (inlineKeys.has(url)) return;
      const uniq = `${found.file_id || found.id || found.pointer || normalized}:${name}`;
      if (seen2.has(uniq)) return;
      seen2.add(uniq);
      const mime = found.mime || meta2?.mime_type || meta2?.mime || "";
      out.push({
        url,
        name,
        isImage: isImageFile(name, mime)
      });
    };
    const meta = msg?.metadata || {};
    if (Array.isArray(meta.attachments)) {
      for (const att of meta.attachments) {
        if (!att?.id) continue;
        addByKey(att.id, att);
      }
    }
    const refsByFile = meta.content_references_by_file || meta.n7jupd_crefs_by_file;
    if (refsByFile && !Array.isArray(refsByFile) && typeof refsByFile === "object") {
      for (const fileId of Object.keys(refsByFile)) {
        addByKey(fileId);
      }
    }
    const refs = Array.isArray(meta.content_references) ? meta.content_references : Array.isArray(meta.n7jupd_crefs) ? meta.n7jupd_crefs : [];
    for (const ref of refs) {
      if (ref?.file_id) addByKey(ref.file_id, ref);
      if (ref?.asset_pointer) addByKey(pointerToFileId(ref.asset_pointer), ref);
    }
    const fileTokens = textContent.match(/\{\{file:([^}]+)\}\}/g) || [];
    for (const tok of fileTokens) {
      const fid = tok.slice(7, -2);
      addByKey(fid);
    }
    const sandboxLinks = textContent.match(/sandbox:[^\s)\]]+/g) || [];
    for (const link2 of sandboxLinks) {
      addByKey(link2);
    }
    return out;
  }
  function renderCitationLink(url, title, index) {
    const cleanedUrl = stripChatgptUtm(url);
    return `<a href="${escapeHtml(cleanedUrl)}" target="_blank" title="${escapeHtml(title || "")}" style="color: #10a37f; text-decoration: none; font-size: 0.8em; margin: 0 2px; background: #e0f7fa; padding: 2px 5px; border-radius: 4px;">[${index}]</a>`;
  }
  function applyCanvasUpdates(baseContent, updates) {
    let updated = baseContent;
    for (const update of updates) {
      const pattern = typeof update?.pattern === "string" ? update.pattern : "";
      if (!pattern) continue;
      const replacement = typeof update?.replacement === "string" ? update.replacement : "";
      try {
        const regex = new RegExp(pattern, "g");
        updated = updated.replace(regex, replacement);
      } catch (e2) {
        if (typeof console !== "undefined" && console.debug) {
          console.debug("Invalid canvas update pattern", pattern, e2);
        }
      }
    }
    return updated;
  }
  function renderCanvasBlock(title, content) {
    return `
    <div class="canvas-block">
        <div class="canvas-header">
            <span>${escapeHtml(title)}</span>
            <span class="canvas-badge">HTML</span>
        </div>
        <div class="canvas-body">
            ${marked.parse("```html\n" + content + "\n```")}
        </div>
    </div>`;
  }
  function getRawMessageText(msg, allAttachments) {
    if (!msg?.content) return "";
    const contentType = msg.content.content_type;
    if (contentType === "thoughts") return getThoughtsText(msg.content);
    if (contentType === "reasoning_recap") return String(msg.content.content || "");
    let textContent = "";
    if (contentType === "text" && msg.content.parts) {
      textContent = msg.content.parts.join("\n");
    } else if (contentType === "multimodal_text" && msg.content.parts) {
      for (const part of msg.content.parts) {
        if (typeof part === "string") {
          textContent += part + "\n";
        } else if (part.asset_pointer) {
          const fileId = part.asset_pointer.replace("sediment://", "");
          const found = allAttachments.find((a2) => a2.file_id === fileId || a2.id === fileId);
          if (found) {
            const filename = found.saved_as || found.name || "image.png";
            const originalName = found.original_name || found.name || "Image";
            const relPath = `attachments/${filename}`;
            textContent += `
![${originalName}](${relPath})
`;
          }
        }
      }
    } else if (typeof msg.content.text === "string") {
      textContent = msg.content.text;
    } else if (Array.isArray(msg.content.parts)) {
      textContent = msg.content.parts.map((part) => typeof part === "string" ? part : "").join("\n");
    } else if (typeof msg.content.content === "string") {
      textContent = msg.content.content;
    }
    return textContent;
  }
  function renderMessage(msg, allAttachments, canvasState) {
    const role = msg.author.role;
    let textContent = "";
    const inlineAttachmentKeys = new Set();
    const userImageItems = [];
    if (msg.content) {
      if (msg.content.content_type === "text" && msg.content.parts) {
        textContent = msg.content.parts.join("\n");
      } else if (msg.content.content_type === "text" && typeof msg.content.text === "string") {
        textContent = msg.content.text;
      } else if (msg.content.content_type === "multimodal_text" && msg.content.parts) {
        for (const part of msg.content.parts) {
          if (typeof part === "string") {
            textContent += part + "\n";
          } else if (part.asset_pointer) {
            const fileId = part.asset_pointer.replace("sediment://", "");
            const found = allAttachments.find((a2) => a2.file_id === fileId || a2.id === fileId);
            if (found) {
              const filename = found.saved_as || found.name || "image.png";
              const originalName = found.original_name || found.name || "Image";
              const relPath = `attachments/${filename}`;
              inlineAttachmentKeys.add(fileId);
              inlineAttachmentKeys.add(relPath);
              if (role === "user") {
                userImageItems.push({ url: relPath, name: originalName });
              } else {
                textContent += `
![${escapeHtml(originalName)}](${relPath})
`;
              }
            }
          }
        }
        if (role === "user" && userImageItems.length > 0) {
          const carouselItems = userImageItems.map(
            (img) => `<div class="image-card"><img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.name)}" loading="lazy" /></div>`
          ).join("");
          const carouselHtml = `
<div class="image-carousel user-images">${carouselItems}</div>
`;
          textContent += carouselHtml;
        }
      }
    }
    const attachments = collectMessageAttachments(msg, allAttachments, textContent, inlineAttachmentKeys);
    if (msg.metadata?.content_references) {
      const refs = [...msg.metadata.content_references].sort((a2, b2) => b2.start_idx - a2.start_idx);
      for (const ref of refs) {
        if (ref.type === "image_group" && ref.images) {
          const carouselItems = ref.images.map((img) => {
            const imgUrl = img.image_result?.content_url || img.image_result?.url;
            if (!imgUrl) return "";
            const pageUrl = stripChatgptUtm(img.image_result?.url || "");
            const title = img.image_result?.title || (pageUrl ? getHostname(pageUrl) : "Image");
            const favicon = pageUrl ? getFaviconUrl(pageUrl) : "";
            const sourceHtml = pageUrl ? `<a class="image-source" href="${escapeHtml(pageUrl)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(title)}">
                            ${favicon ? `<img src="${escapeHtml(favicon)}" alt="" aria-hidden="true" onerror="this.style.display='none';" />` : ""}
                            <span>${escapeHtml(title)}</span>
                        </a>` : "";
            return `<div class="image-card"><img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(title)}" loading="lazy" />${sourceHtml}</div>`;
          }).join("");
          const carouselHtml = `
<div class="image-carousel">${carouselItems}</div>
`;
          if (textContent.includes(ref.matched_text)) {
            textContent = textContent.replace(ref.matched_text, carouselHtml);
          }
        }
        if (ref.type === "webpage" || ref.type === "webpage_extended") {
          if (textContent.includes(ref.matched_text)) {
            const index = msg.metadata.content_references.indexOf(ref) + 1;
            const url = stripChatgptUtm(ref.url || "");
            if (url) {
              const citationHtml = renderCitationLink(url, ref.title || "", index);
              textContent = textContent.replace(ref.matched_text, citationHtml);
            } else {
              textContent = textContent.replace(ref.matched_text, "");
            }
          }
        }
        if (ref.type === "grouped_webpages") {
          if (textContent.includes(ref.matched_text)) {
            const items = Array.isArray(ref.items) ? ref.items : [];
            const url = stripChatgptUtm(items[0]?.url || ref.safe_urls?.[0] || "");
            const title = items[0]?.title || ref.alt || url;
            const index = msg.metadata.content_references.indexOf(ref) + 1;
            if (url) {
              const citationHtml = renderCitationLink(url, title || "", index);
              textContent = textContent.replace(ref.matched_text, citationHtml);
            } else {
              textContent = textContent.replace(ref.matched_text, "");
            }
          }
        }
        if (ref.type === "file") {
          if (textContent.includes(ref.matched_text)) {
            const fileHtml = `<span title="${escapeHtml(ref.name || "File")}" style="color: #555; font-size: 0.8em; margin: 0 2px; background: #f0f0f0; padding: 2px 5px; border-radius: 4px; border: 1px solid #ddd;">[File: ${escapeHtml(ref.name || "Attachment")}]</span>`;
            textContent = textContent.replace(ref.matched_text, fileHtml);
          }
        }
      }
    }
    if (role === "tool" && msg.content?.content_type === "multimodal_text") {
      const parts = msg.content.parts || [];
      for (const part of parts) {
        if (part.asset_pointer) {
          const fileId = part.asset_pointer.replace("sediment://", "");
          const found = allAttachments.find((a2) => a2.file_id === fileId || a2.id === fileId);
          if (found) {
            const filename = found.saved_as || found.name || "image.png";
            const originalName = found.original_name || found.name || "Generated Image";
            const relPath = `attachments/${filename}`;
            return {
              role: "assistant",
              htmlContent: `<div style="text-align:center; margin: 20px 0;"><img src="${relPath}" alt="${escapeHtml(originalName)}" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" /></div>`,
              modelSlug: msg.metadata?.model_slug,
              attachments
            };
          }
        }
      }
    }
    if (role === "assistant" && textContent.trim().startsWith("{") && textContent.includes('"referenced_image_ids":')) {
      try {
        const json = JSON.parse(textContent);
        if (json.prompt) {
          const promptHtml = `<div style="font-size: 0.9em; color: #666; font-style: italic;">
                    Generative Prompt: "${escapeHtml(json.prompt)}"
                </div>`;
          return {
            role: "assistant",
            htmlContent: promptHtml,
            modelSlug: msg.metadata?.model_slug,
            attachments
          };
        }
      } catch (e2) {
      }
    }
    if (msg.content?.content_type === "thoughts") {
      const thoughts = getThoughtsText(msg.content);
      const html2 = `
        <details style="margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px; padding: 10px;">
            <summary style="cursor: pointer; font-weight: bold; color: #666;">Reasoning Process</summary>
            <div style="margin-top: 10px; color: #444; white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${escapeHtml(thoughts)}</div>
        </details>`;
      return {
        role,
        htmlContent: html2,
        modelSlug: msg.metadata?.model_slug,
        attachments
      };
    }
    if (msg.content?.content_type === "reasoning_recap") {
      return {
        role,
        htmlContent: `<div style="font-size: 0.85em; color: #888; margin-bottom: 5px;">${escapeHtml(msg.content.content || "")}</div>`,
        modelSlug: msg.metadata?.model_slug,
        attachments
      };
    }
    if (role === "assistant" && textContent.trim().startsWith("{")) {
      try {
        const json = JSON.parse(textContent);
        if (json.name && json.type === "code/html" && json.content) {
          const name = String(json.name);
          const content = String(json.content);
          canvasState.byName[name] = content;
          canvasState.lastName = name;
          canvasState.lastContent = content;
          const canvasHtml = renderCanvasBlock(`Canvas: ${name}`, content);
          return {
            role,
            htmlContent: canvasHtml,
            modelSlug: msg.metadata?.model_slug,
            attachments
          };
        }
        if (json.updates && Array.isArray(json.updates)) {
          const baseName = canvasState.lastName;
          const baseContent = baseName ? canvasState.byName[baseName] : canvasState.lastContent;
          if (baseContent) {
            const updatedContent = applyCanvasUpdates(baseContent, json.updates);
            if (baseName) {
              canvasState.byName[baseName] = updatedContent;
            }
            canvasState.lastContent = updatedContent;
            const title = baseName ? `Canvas Updated: ${baseName}` : "Canvas Updated";
            return {
              role,
              htmlContent: renderCanvasBlock(title, updatedContent),
              modelSlug: msg.metadata?.model_slug,
              attachments
            };
          }
          const updatesHtml = `
                 <div class="canvas-update-block" style="border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px 0; background: #fafafa;">
                    <div style="padding: 8px 12px; color: #666; font-size: 0.9em;">
                        <strong>Canvas Updated</strong>
                    </div>
                    <div style="padding: 10px; font-family: monospace; font-size: 0.85em; overflow-x: auto;">
                        ${json.updates.map((u2) => `<div><span style="color: #d32f2f;">- ${escapeHtml(u2.pattern || "")}</span><br><span style="color: #388e3c;">+ ${escapeHtml(u2.replacement || "")}</span></div>`).join('<hr style="margin: 5px 0; border: 0; border-top: 1px dashed #ccc;">')}
                    </div>
                 </div>`;
          return {
            role,
            htmlContent: updatesHtml,
            modelSlug: msg.metadata?.model_slug,
            attachments
          };
        }
      } catch (e2) {
      }
    }
    const rawHtml = marked.parse(normalizeListIndentation(textContent), { async: false });
    const htmlContent = sanitizeHtmlContent(rawHtml);
    return {
      role,
      htmlContent,
      modelSlug: msg.metadata?.model_slug,
      attachments
    };
  }
  const VIRTUAL_ROOT_ID = "__root__";
  function cloneCanvasState(state) {
    return {
      lastName: state.lastName,
      lastContent: state.lastContent,
      byName: { ...state.byName }
    };
  }
  function hasRenderableContent(msg) {
    const content = msg.content;
    const contentType = content?.content_type;
    if (contentType === "text") {
      if (Array.isArray(content?.parts)) {
        return content.parts.some(
          (part) => typeof part === "string" ? part.trim() !== "" : Boolean(part)
        );
      }
      if (typeof content?.text === "string") {
        return content.text.trim() !== "";
      }
      return false;
    }
    if (contentType === "thoughts") {
      return getThoughtsText(content).trim() !== "";
    }
    if (contentType === "reasoning_recap") {
      return typeof content?.content === "string" && content.content.trim() !== "";
    }
    if (contentType === "multimodal_text") {
      return Array.isArray(content?.parts) && content.parts.length > 0;
    }
    return Boolean(content);
  }
  function shouldRenderMessage(msg) {
    if (!msg) return false;
    const isHidden = msg.metadata?.is_visually_hidden_from_conversation;
    if (isHidden) return false;
    const isLoadingMessage = msg.metadata?.is_loading_message === true;
    if (isLoadingMessage) return false;
    if (!hasRenderableContent(msg)) return false;
    if (!["user", "assistant", "tool"].includes(msg.author.role)) return false;
    if (msg.author.role === "tool") {
      const toolName = msg.author.name || "";
      const isInternalTool = toolName === "file_search" || toolName.startsWith("canmore.") || toolName.startsWith("research_kickoff_tool.") || Boolean(msg.metadata?.canvas);
      if (isInternalTool) return false;
    }
    if (msg.author.role === "assistant" && typeof msg.recipient === "string") {
      if (msg.recipient.startsWith("research_kickoff_tool.")) return false;
    }
    if (msg.content?.content_type === "model_editable_context") return false;
    return true;
  }
  function extractRenderablePathIds(conv, renderableIds) {
    const ids = [];
    let currentId = conv.current_node;
    while (currentId) {
      const node = conv.mapping[currentId];
      if (!node) break;
      if (renderableIds.has(currentId)) ids.unshift(currentId);
      if (!node.parent) break;
      currentId = node.parent;
    }
    return ids;
  }
  function buildRenderedNodes(conv, attachments) {
    const mapping = conv.mapping || {};
    const renderableIds = new Set();
    for (const node of Object.values(mapping)) {
      if (node?.message && shouldRenderMessage(node.message)) {
        renderableIds.add(node.id);
      }
    }
    const visibleParentById = {};
    for (const id of renderableIds) {
      let parentId = mapping[id]?.parent || null;
      while (parentId && !renderableIds.has(parentId)) {
        parentId = mapping[parentId]?.parent || null;
      }
      visibleParentById[id] = parentId || VIRTUAL_ROOT_ID;
    }
    const renderedNodes = [];
    const rootIds = Object.values(mapping).filter((node) => !node.parent).map((node) => node.id);
    const traverse = (nodeId, canvasState) => {
      const node = mapping[nodeId];
      if (!node) return;
      const msg = node.message;
      let nextState = canvasState;
      if (msg && renderableIds.has(nodeId)) {
        const localState = cloneCanvasState(canvasState);
        const rendered = renderMessage(msg, attachments, localState);
        renderedNodes.push({
          id: nodeId,
          parentId: visibleParentById[nodeId],
          role: rendered.role,
          htmlContent: rendered.htmlContent,
          modelSlug: rendered.modelSlug,
          attachments: rendered.attachments,
          rawText: getRawMessageText(msg, attachments)
        });
        nextState = localState;
      }
      for (const childId of node.children || []) {
        traverse(childId, cloneCanvasState(nextState));
      }
    };
    rootIds.forEach((rootId) => {
      traverse(rootId, { byName: {} });
    });
    const selectedByParent = {};
    const pathIds = extractRenderablePathIds(conv, renderableIds);
    for (const id of pathIds) {
      const parentId = visibleParentById[id] || VIRTUAL_ROOT_ID;
      selectedByParent[parentId] = id;
    }
    return { nodes: renderedNodes, selectedByParent };
  }
  function renderAttachments(atts) {
    if (atts.length === 0) return "";
    return `<div class="attachments">
        ${atts.map((a2) => {
    if (a2.isImage) {
      return `<img src="${a2.url}" alt="${escapeHtml(a2.name)}" />`;
    }
    return `<a href="${a2.url}" download="${a2.name}" class="file-attachment">📎 ${escapeHtml(a2.name)}</a>`;
  }).join("")}
    </div>`;
  }
  function renderHtmlDocument(title, renderedNodes, selectedByParent) {
    return `<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #0d0d0d;
            --user-bg: #f4f4f4;
            --border-color: #e5e5e5;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #1e1e1e;
                --text-color: #ececec;
                --user-bg: #2f2f2f;
                --border-color: #444;
            }
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding-bottom: 50px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 20px;
        }

        .header h1 {
            font-size: 1.5rem;
            margin: 0;
        }

        .message {
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
        }

        .message.user .bubble {
            background-color: var(--user-bg);
            border-radius: 20px;
            padding: 10px 20px;
            align-self: flex-end;
            max-width: 90%;
            margin-left: auto;
        }

        .message.assistant .bubble {
            background-color: transparent;
            padding: 0;
            max-width: 100%;
            align-self: flex-start;
        }
        
        .message.system .bubble {
            background-color: #fff3cd;
            color: #856404;
            border-radius: 8px;
            padding: 10px;
            font-size: 0.9em;
            text-align: center;
            align-self: center;
        }

        .message .bubble-toolbar {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 0.85em;
            color: #666;
            margin-top: 6px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-2px);
            transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .message:hover .bubble-toolbar,
        .message:focus-within .bubble-toolbar {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        @media (hover: none) {
            .message .bubble-toolbar {
                opacity: 1;
                visibility: visible;
                transform: none;
            }
        }

        .message.user .bubble-toolbar {
            align-self: flex-end;
        }

        .message.assistant .bubble-toolbar,
        .message.tool .bubble-toolbar {
            align-self: flex-start;
            flex-direction: row-reverse;
        }

        .toolbar-btn {
            border: none;
            background: transparent;
            color: inherit;
            padding: 4px;
            border-radius: 6px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s ease, color 0.15s ease;
        }

        .toolbar-btn:hover {
            background: rgba(0, 0, 0, 0.06);
        }

        @media (prefers-color-scheme: dark) {
            .toolbar-btn:hover {
                background: rgba(255, 255, 255, 0.08);
            }
        }

        .toolbar-btn:disabled {
            opacity: 0.4;
            cursor: default;
        }

        .toolbar-btn.copied {
            color: #10a37f;
        }

        .toolbar-icon {
            width: 16px;
            height: 16px;
        }

        .branch-controls {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .branch-count {
            min-width: 38px;
            text-align: center;
            font-variant-numeric: tabular-nums;
            color: #444;
        }

        @media (prefers-color-scheme: dark) {
            .branch-count {
                color: #ccc;
            }
        }

        .content p {
            margin: 0.5em 0;
        }
        .content p:first-child {
            margin-top: 0;
        }
        .content p:last-child {
            margin-bottom: 0;
        }

        .content img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 10px 0;
            display: block;
        }

        .code-block {
            border: 1px solid var(--border-color);
            border-radius: 10px;
            margin: 12px 0;
            background: transparent;
        }

        .code-block[data-collapsed="true"] {
            max-height: var(--code-max-height, 50vh);
            overflow-y: auto;
            overflow-x: hidden;
        }

        .code-block[data-collapsed="false"] {
            max-height: none;
            overflow: visible;
        }

        .code-header {
            position: sticky;
            top: 0;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 6px 10px;
            font-size: 0.85em;
            background: var(--bg-color);
            border-bottom: 1px solid var(--border-color);
        }

        .code-block[data-collapsed="false"] .code-header {
            position: static;
        }

        .code-title {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            color: #666;
            letter-spacing: 0.02em;
        }

        @media (prefers-color-scheme: dark) {
            .code-title {
                color: #aaa;
            }
        }

        .code-actions {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .code-btn {
            border: 1px solid var(--border-color);
            background: transparent;
            color: inherit;
            padding: 2px 8px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85em;
        }

        .code-btn:hover {
            background: rgba(0, 0, 0, 0.06);
        }

        @media (prefers-color-scheme: dark) {
            .code-btn:hover {
                background: rgba(255, 255, 255, 0.08);
            }
        }

        .code-btn.copied {
            color: #10a37f;
            border-color: #10a37f;
        }

        pre {
            background-color: transparent;
            border: none;
            border-radius: 0;
            padding: 12px;
            overflow-x: auto;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            font-size: 0.9em;
            margin: 0;
        }

        code {
            background-color: transparent;
            padding: 0;
            border-radius: 0;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            font-size: 0.9em;
        }

        :not(pre) > code {
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 1px 4px;
        }

        blockquote {
            border-left: 4px solid var(--border-color);
            margin: 0;
            padding-left: 16px;
            color: #777;
        }

        .image-carousel {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 10px 0;
            scroll-behavior: smooth;
        }
        .image-carousel::-webkit-scrollbar {
            height: 6px;
        }
        .image-carousel::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 3px;
        }
        .image-card {
            position: relative;
            flex-shrink: 0;
        }
        .image-card img {
            height: 200px;
            width: auto;
            object-fit: cover;
            border-radius: 8px;
            display: block;
            margin: 0;
        }

        .canvas-block {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin: 10px 0;
            overflow: hidden;
        }

        .canvas-header {
            padding: 8px 12px;
            border-bottom: 1px solid var(--border-color);
            font-weight: bold;
            font-size: 0.9em;
            display: flex;
            justify-content: space-between;
            background: var(--bg-color);
        }

        .canvas-badge {
            color: #888;
            font-weight: normal;
        }

        .canvas-body {
            padding: 0;
        }
        .image-source {
            position: absolute;
            left: 50%;
            bottom: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 4px 8px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.7);
            color: #111;
            font-size: 0.75em;
            text-decoration: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            max-width: calc(100% - 16px);
            box-sizing: border-box;
            transform: translateX(-50%);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.15s ease;
        }
        .image-card:hover .image-source,
        .image-card:focus-within .image-source {
            opacity: 1;
            pointer-events: auto;
        }
        .image-source img {
            width: 14px;
            height: 14px;
            border-radius: 3px;
            flex-shrink: 0;
        }
        .image-source span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 180px;
        }

        @media (prefers-color-scheme: dark) {
            .image-source {
                background: rgba(0, 0, 0, 0.55);
                color: #f0f0f0;
            }
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${escapeHtml(title)}</h1>
        </div>
        <div class="chat-log">
            ${renderedNodes.map((m2) => `
                <div class="message ${m2.role}" data-node-id="${escapeHtmlAttr(m2.id)}" data-parent-id="${escapeHtmlAttr(m2.parentId)}" data-raw="${escapeHtmlAttr(m2.rawText)}">
                    <div class="bubble">
                        <div class="content">
                            ${m2.htmlContent}
                        </div>
                        ${renderAttachments(m2.attachments)}
                    </div>
                    <div class="bubble-toolbar">
                        <button class="toolbar-btn" data-action="copy" title="Kopírovat původní obsah" aria-label="Kopírovat původní obsah">
                            <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor" d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z"/>
                            </svg>
                        </button>
                        <div class="branch-controls">
                            <button class="toolbar-btn" data-action="prev" title="Předchozí verze" aria-label="Předchozí verze">
                                <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                </svg>
                            </button>
                            <span class="branch-count">1/1</span>
                            <button class="toolbar-btn" data-action="next" title="Další verze" aria-label="Další verze">
                                <svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="currentColor" d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
    </div>
    <script>
        (() => {
            const ROOT_ID = ${JSON.stringify(VIRTUAL_ROOT_ID)};
            const selectedByParent = ${JSON.stringify(selectedByParent)};
            const messageEls = Array.from(document.querySelectorAll('.message[data-node-id]'));
            const childrenByParent = new Map();

            messageEls.forEach((el) => {
                const nodeId = el.dataset.nodeId || '';
                const parentId = el.dataset.parentId || ROOT_ID;
                if (!childrenByParent.has(parentId)) childrenByParent.set(parentId, []);
                childrenByParent.get(parentId).push(nodeId);
            });

            const getSelectedChild = (parentId) => {
                const children = childrenByParent.get(parentId) || [];
                if (!children.length) return null;
                const selected = selectedByParent[parentId];
                if (selected && children.includes(selected)) return selected;
                return children[0];
            };

            const updateBranchControls = () => {
                messageEls.forEach((el) => {
                    const nodeId = el.dataset.nodeId || '';
                    const parentId = el.dataset.parentId || ROOT_ID;
                    const siblings = childrenByParent.get(parentId) || [];
                    const total = siblings.length;
                    const index = Math.max(0, siblings.indexOf(nodeId));
                    const countEl = el.querySelector('.branch-count');
                    if (countEl) countEl.textContent = total ? (index + 1) + '/' + total : '1/1';
                    const prevBtn = el.querySelector('[data-action="prev"]');
                    const nextBtn = el.querySelector('[data-action="next"]');
                    if (prevBtn) prevBtn.disabled = total <= 1 || index <= 0;
                    if (nextBtn) nextBtn.disabled = total <= 1 || index >= total - 1;
                });
            };

            const updateVisibility = () => {
                const visible = new Set();
                const walk = (parentId) => {
                    const child = getSelectedChild(parentId);
                    if (!child) return;
                    visible.add(child);
                    walk(child);
                };
                walk(ROOT_ID);
                messageEls.forEach((el) => {
                    const nodeId = el.dataset.nodeId || '';
                    el.style.display = visible.has(nodeId) ? '' : 'none';
                });
                updateBranchControls();
            };

            const setCodeToggleState = (block, btn, collapsed) => {
                block.dataset.collapsed = collapsed ? 'true' : 'false';
                btn.textContent = collapsed ? 'Rozbalit' : 'Sbalit';
                btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            };

            const setupCodeBlocks = () => {
                const maxHeight = Math.round(window.innerHeight * 0.5);
                const blocks = document.querySelectorAll('pre > code');
                blocks.forEach((codeEl) => {
                    const pre = codeEl.parentElement;
                    if (!pre || pre.closest('.code-block')) return;
                    const wrapper = document.createElement('div');
                    wrapper.className = 'code-block';
                    wrapper.style.setProperty('--code-max-height', maxHeight + 'px');

                    const header = document.createElement('div');
                    header.className = 'code-header';

                    const title = document.createElement('span');
                    title.className = 'code-title';
                    const match = (codeEl.className || '').match(/language-([a-z0-9_-]+)/i);
                    title.textContent = match ? match[1].toUpperCase() : 'CODE';

                    const actions = document.createElement('div');
                    actions.className = 'code-actions';

                    const copyBtn = document.createElement('button');
                    copyBtn.type = 'button';
                    copyBtn.className = 'code-btn';
                    copyBtn.setAttribute('data-code-action', 'copy');
                    copyBtn.textContent = 'Kopírovat';

                    const toggleBtn = document.createElement('button');
                    toggleBtn.type = 'button';
                    toggleBtn.className = 'code-btn';
                    toggleBtn.setAttribute('data-code-action', 'toggle');
                    toggleBtn.textContent = 'Rozbalit';
                    toggleBtn.setAttribute('aria-expanded', 'false');

                    actions.append(copyBtn, toggleBtn);
                    header.append(title, actions);

                    pre.parentNode.insertBefore(wrapper, pre);
                    wrapper.append(header, pre);

                    const needsCollapse = pre.scrollHeight > maxHeight;
                    if (needsCollapse) {
                        setCodeToggleState(wrapper, toggleBtn, true);
                    } else {
                        wrapper.dataset.collapsed = 'false';
                        toggleBtn.hidden = true;
                    }
                });
            };

            document.addEventListener('click', (event) => {
                const btn = event.target.closest('[data-action]');
                if (!btn) return;
                const action = btn.getAttribute('data-action');
                const messageEl = btn.closest('.message');
                if (!messageEl) return;
                const nodeId = messageEl.dataset.nodeId || '';
                const parentId = messageEl.dataset.parentId || ROOT_ID;
                const siblings = childrenByParent.get(parentId) || [];
                const index = siblings.indexOf(nodeId);
                if (action === 'copy') {
                    const raw = messageEl.dataset.raw || '';
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(raw).then(() => {
                            btn.classList.add('copied');
                            setTimeout(() => btn.classList.remove('copied'), 900);
                        }).catch(() => {
                        });
                    } else {
                        const helper = document.createElement('textarea');
                        helper.value = raw;
                        helper.style.position = 'fixed';
                        helper.style.opacity = '0';
                        document.body.appendChild(helper);
                        helper.select();
                        try { document.execCommand('copy'); } catch (e) {}
                        document.body.removeChild(helper);
                        btn.classList.add('copied');
                        setTimeout(() => btn.classList.remove('copied'), 900);
                    }
                    return;
                }
                if (action === 'prev' && index > 0) {
                    selectedByParent[parentId] = siblings[index - 1];
                    updateVisibility();
                }
                if (action === 'next' && index >= 0 && index < siblings.length - 1) {
                    selectedByParent[parentId] = siblings[index + 1];
                    updateVisibility();
                }
            });

            document.addEventListener('click', (event) => {
                const btn = event.target.closest('[data-code-action]');
                if (!btn) return;
                const action = btn.getAttribute('data-code-action');
                const block = btn.closest('.code-block');
                if (!block) return;
                if (action === 'copy') {
                    const codeEl = block.querySelector('code');
                    const text = codeEl ? (codeEl.textContent || '') : '';
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(() => {
                            btn.classList.add('copied');
                            setTimeout(() => btn.classList.remove('copied'), 900);
                        }).catch(() => {
                        });
                    } else {
                        const helper = document.createElement('textarea');
                        helper.value = text;
                        helper.style.position = 'fixed';
                        helper.style.opacity = '0';
                        document.body.appendChild(helper);
                        helper.select();
                        try { document.execCommand('copy'); } catch (e) {}
                        document.body.removeChild(helper);
                        btn.classList.add('copied');
                        setTimeout(() => btn.classList.remove('copied'), 900);
                    }
                    return;
                }
                if (action === 'toggle') {
                    const collapsed = block.dataset.collapsed !== 'true';
                    setCodeToggleState(block, btn, collapsed);
                }
            });

            const normalizeWheelDelta = (event, target) => {
                const absX = Math.abs(event.deltaX || 0);
                const absY = Math.abs(event.deltaY || 0);
                let delta = absX > absY ? event.deltaX : event.deltaY;
                if (!delta) return 0;
                if (event.deltaMode === 1) delta *= 16;
                if (event.deltaMode === 2) delta *= target.clientWidth;
                return delta;
            };

            document.addEventListener('wheel', (event) => {
                if (event.ctrlKey) return;
                const target = event.target;
                if (!(target instanceof Element)) return;
                const carousel = target.closest('.image-carousel');
                if (!carousel) return;
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                if (maxScroll <= 0) return;
                const delta = normalizeWheelDelta(event, carousel);
                if (!delta) return;
                const prev = carousel.scrollLeft;
                let next = prev + delta;
                if (next < 0) next = 0;
                if (next > maxScroll) next = maxScroll;
                if (next === prev) return;
                carousel.scrollLeft = next;
                event.preventDefault();
            }, { passive: false });

            setupCodeBlocks();
            updateVisibility();
        })();
    <\/script>
</body>
</html>`;
  }
  function generateHTML(conversation, attachments) {
    const title = conversation.title || "Conversation";
    const { nodes: renderedNodes, selectedByParent } = buildRenderedNodes(conversation, attachments);
    return renderHtmlDocument(title, renderedNodes, selectedByParent);
  }
  function mergeInventoryItem(map, item) {
    const existing = map.get(item.id);
    if (existing) {
      if (!existing.scopes.includes(item.scope)) {
        existing.scopes.push(item.scope);
      }
      if (item.projectId && !existing.projectId) {
        existing.projectId = item.projectId;
      }
      if (item.workspaceId && !existing.workspaceId) {
        existing.workspaceId = item.workspaceId;
      }
      if (item.title && (!existing.title || existing.title === "New chat" || existing.title === "Bez názvu")) {
        existing.title = item.title;
      }
      if (item.update_time) {
        const existingTime = new Date(existing.update_time).getTime() || 0;
        const newTime = new Date(item.update_time).getTime() || 0;
        if (newTime > existingTime) {
          existing.update_time = item.update_time;
        }
      }
      if (item.sourceDetail && existing.sourceDetails && !existing.sourceDetails.includes(item.sourceDetail)) {
        existing.sourceDetails.push(item.sourceDetail);
      }
      return existing;
    }
    const created = {
      id: item.id,
      title: item.title || "",
      create_time: item.create_time,
      update_time: item.update_time || Date.now(),
      projectId: item.projectId,
      workspaceId: item.workspaceId,
      scopes: [item.scope],
      sourceDetails: item.sourceDetail ? [item.sourceDetail] : []
    };
    map.set(item.id, created);
    return created;
  }
  async function buildConversationInventory(options = {}) {
    const {
      includeArchived = true,
      includeProjects = true,
      progressCb
    } = options;
    const itemsMap = new Map();
    const errors = [];
    let isComplete = true;
    const scopes = {
      regular: { scope: "regular", status: "ok", count: 0 },
      projects: { scope: "project", status: "ok", count: 0, subScopeDetails: {} },
      archived: { scope: "archived", status: "ok", count: 0 }
    };
    const discoveredGizmoIds = new Set();
    Logger.info("Inventory", "Scanning regular conversations...");
    if (progressCb) progressCb("Skenování běžných konverzací...", itemsMap.size);
    let regularOffset = 0;
    const regularLimit = 100;
    while (true) {
      let page;
      try {
        page = await listConversationsPage({
          offset: regularOffset,
          limit: regularLimit,
          order: "updated"
        });
      } catch (e2) {
        const msg = `Chyba při čtení běžných konverzací (offset ${regularOffset}): ${e2?.message || String(e2)}`;
        Logger.error("Inventory", msg, e2);
        scopes.regular.status = regularOffset > 0 ? "partial" : "failed";
        scopes.regular.error = msg;
        errors.push(msg);
        isComplete = false;
        break;
      }
      const items = Array.isArray(page?.items) ? page.items : [];
      if (items.length === 0) break;
      for (const it of items) {
        if (!it || !it.id) continue;
        const gid = it.conversation_template_id || it.gizmo_id || void 0;
        if (gid) discoveredGizmoIds.add(gid);
        mergeInventoryItem(itemsMap, {
          id: it.id,
          title: it.title,
          create_time: it.create_time,
          update_time: it.update_time,
          projectId: gid,
          workspaceId: it.workspace_id,
          scope: "regular",
          sourceDetail: gid ? `regular:gizmo_${gid}` : "regular:personal"
        });
        scopes.regular.count++;
      }
      if (progressCb) progressCb(`Běžné konverzace načteno: ${itemsMap.size}`, itemsMap.size);
      if (items.length < regularLimit) break;
      if (page?.total !== void 0 && page?.total !== null && regularOffset + items.length >= page.total) {
        break;
      }
      regularOffset += regularLimit;
      await sleep(80);
    }
    if (includeProjects) {
      Logger.info("Inventory", "Scanning project conversations (gizmos)...");
      if (progressCb) progressCb("Skenování projektových konverzací...", itemsMap.size);
      const projectIds = new Set(discoveredGizmoIds);
      let sidebarCursor = null;
      let sidebarFailed = false;
      do {
        let sidebar;
        try {
          sidebar = await listGizmosSidebar(sidebarCursor);
        } catch (e2) {
          const msg = `Chyba při načítání postranního panelu gizmos (cursor: ${sidebarCursor}): ${e2?.message || String(e2)}`;
          Logger.error("Inventory", msg, e2);
          scopes.projects.error = msg;
          errors.push(msg);
          isComplete = false;
          sidebarFailed = true;
          break;
        }
        if (sidebar?.gizmos && Array.isArray(sidebar.gizmos)) {
          for (const g2 of sidebar.gizmos) {
            if (g2?.id) projectIds.add(g2.id);
          }
        }
        if (sidebar?.items && Array.isArray(sidebar.items)) {
          for (const it of sidebar.items) {
            const gid = it?.gizmo?.gizmo?.id || it?.gizmo?.id;
            if (gid) projectIds.add(gid);
          }
        }
        sidebarCursor = sidebar && sidebar.cursor ? sidebar.cursor : null;
        if (sidebarCursor) await sleep(80);
      } while (sidebarCursor);
      let projectsOkCount = 0;
      let projectsErrCount = 0;
      for (const pid of projectIds) {
        let cursor = 0;
        const limit = 50;
        let projectItemsCount = 0;
        let projectError;
        while (true) {
          let page;
          try {
            page = await listProjectConversations({ projectId: pid, cursor, limit });
          } catch (e2) {
            projectError = `Chyba načítání konverzací projektu ${pid} (cursor ${cursor}): ${e2?.message || String(e2)}`;
            Logger.warn("Inventory", projectError, e2);
            errors.push(projectError);
            isComplete = false;
            break;
          }
          const arr = Array.isArray(page?.items) ? page.items : [];
          if (arr.length === 0) break;
          for (const it of arr) {
            if (!it || !it.id) continue;
            mergeInventoryItem(itemsMap, {
              id: it.id,
              title: it.title,
              create_time: it.create_time,
              update_time: it.update_time,
              projectId: pid,
              scope: "project",
              sourceDetail: `project:${pid}`
            });
            scopes.projects.count++;
            projectItemsCount++;
          }
          if (progressCb) progressCb(`Projekt ${pid}: načteno ${projectItemsCount} chatů`, itemsMap.size);
          if (arr.length < limit) break;
          if (page?.total !== void 0 && page?.total !== null && cursor + arr.length >= page.total) {
            break;
          }
          cursor += limit;
          await sleep(80);
        }
        if (scopes.projects.subScopeDetails) {
          scopes.projects.subScopeDetails[pid] = {
            count: projectItemsCount,
            error: projectError
          };
        }
        if (projectError) {
          projectsErrCount++;
        } else {
          projectsOkCount++;
        }
      }
      if (sidebarFailed || projectsErrCount > 0) {
        scopes.projects.status = projectsOkCount > 0 || scopes.projects.count > 0 ? "partial" : "failed";
      }
    }
    if (includeArchived) {
      Logger.info("Inventory", "Scanning archived conversations...");
      if (progressCb) progressCb("Skenování archivovaných konverzací...", itemsMap.size);
      let archOffset = 0;
      const archLimit = 100;
      while (true) {
        let page;
        try {
          page = await listConversationsPage({
            offset: archOffset,
            limit: archLimit,
            is_archived: true
          });
        } catch (e2) {
          const msg = `Chyba při čtení archivovaných konverzací (offset ${archOffset}): ${e2?.message || String(e2)}`;
          Logger.warn("Inventory", msg, e2);
          scopes.archived.status = archOffset > 0 ? "partial" : "failed";
          scopes.archived.error = msg;
          errors.push(msg);
          isComplete = false;
          break;
        }
        const items = Array.isArray(page?.items) ? page.items : [];
        if (items.length === 0) break;
        for (const it of items) {
          if (!it || !it.id) continue;
          const gid = it.conversation_template_id || it.gizmo_id || void 0;
          mergeInventoryItem(itemsMap, {
            id: it.id,
            title: it.title,
            create_time: it.create_time,
            update_time: it.update_time,
            projectId: gid,
            workspaceId: it.workspace_id,
            scope: "archived",
            sourceDetail: "archived"
          });
          scopes.archived.count++;
        }
        if (progressCb) progressCb(`Archivované konverzace načteno: ${itemsMap.size}`, itemsMap.size);
        if (items.length < archLimit) break;
        if (page?.total !== void 0 && page?.total !== null && archOffset + items.length >= page.total) {
          break;
        }
        archOffset += archLimit;
        await sleep(80);
      }
    }
    Logger.info("Inventory", `Inventory completed. Total unique conversations: ${itemsMap.size}, complete: ${isComplete}`);
    return {
      timestamp: Date.now(),
      complete: isComplete,
      items: Array.from(itemsMap.values()),
      scopes,
      errors
    };
  }
  function extractHttpStatus(err2) {
    if (!err2) return null;
    const msg = typeof err2 === "string" ? err2 : err2.message || "";
    const match = msg.match(/\b(HTTP\s+)?([1-5]\d{2})\b/i);
    if (match && match[2]) {
      const code = parseInt(match[2], 10);
      if (!isNaN(code) && code >= 100 && code < 600) return code;
    }
    return null;
  }
  function isValidFilesApiId(id) {
    if (!id || typeof id !== "string") return false;
    return /^file-[a-zA-Z0-9_-]+$/.test(id);
  }
  async function downloadCandidateWithLedger(candidate, attFolder, reacquireAttFolder) {
    const convId2 = candidate.conversation_id || "";
    const messageId = candidate.message_id || null;
    const candidateType = candidate.candidate_type || candidate.source || "unknown";
    let fileId = candidate.file_id || null;
    let libraryFileId = candidate.library_file_id || null;
    const pointer = candidate.pointer || null;
    const originalRef = pointer || fileId || libraryFileId || candidate.download_url || null;
    const originalName = candidate.meta && (candidate.meta.name || candidate.meta.file_name) || candidate.name || "";
    const predictedName = originalName ? sanitize(originalName) : "";
    if (predictedName && await fileExists(attFolder, predictedName)) {
      const mime = candidate.mime_type || candidate.meta?.mime_type || candidate.meta?.mime || "application/octet-stream";
      const size = candidate.size_bytes || candidate.meta?.size_bytes || candidate.meta?.size || null;
      const entry = {
        conversation_id: convId2,
        message_id: messageId,
        candidate_type: candidateType,
        file_id: fileId,
        library_file_id: libraryFileId,
        original_ref: originalRef,
        download_method: "existing_file",
        status: "success",
        error: null,
        http_status: null,
        local_path: `attachments/${predictedName}`,
        size_bytes: size,
        mime_type: mime,
        timestamp: Date.now()
      };
      Logger.debug("AssetLedger", `Asset already exists on disk: ${predictedName}`);
      return {
        entry,
        entries: [entry],
        savedMeta: {
          pointer: pointer || "",
          file_id: fileId || "",
          original_name: originalName || predictedName,
          saved_as: predictedName,
          size_bytes: size,
          mime,
          source: candidateType,
          library_file_id: libraryFileId,
          download_method: "existing_file"
        }
      };
    }
    const entries = [];
    const recordSuccess = async (blob, mime, rawFilename, usedMethod, currentId) => {
      const safeName = sanitize(rawFilename);
      let actualSavedName = safeName;
      if (!await fileExists(attFolder, safeName)) {
        actualSavedName = await writeFile(attFolder, safeName, blob, reacquireAttFolder);
      }
      const localRelPath = `attachments/${actualSavedName}`;
      const successEntry = {
        conversation_id: convId2,
        message_id: messageId,
        candidate_type: candidateType,
        file_id: currentId || fileId,
        library_file_id: libraryFileId,
        original_ref: originalRef,
        download_method: usedMethod,
        status: "success",
        error: null,
        http_status: 200,
        local_path: localRelPath,
        size_bytes: blob.size,
        mime_type: mime,
        timestamp: Date.now()
      };
      entries.push(successEntry);
      Logger.debug("AssetLedger", `Asset uložen (${usedMethod}): ${actualSavedName}`);
      return {
        entry: successEntry,
        entries,
        savedMeta: {
          pointer: pointer || "",
          file_id: currentId || fileId || "",
          original_name: originalName || rawFilename || actualSavedName,
          saved_as: actualSavedName,
          size_bytes: blob.size,
          mime,
          source: candidateType,
          library_file_id: libraryFileId,
          download_method: usedMethod
        }
      };
    };
    const recordFailure = (method, err2, currentId = fileId) => {
      const errorMsg = err2?.message || String(err2);
      const httpStatus = extractHttpStatus(err2);
      const failEntry = {
        conversation_id: convId2,
        message_id: messageId,
        candidate_type: candidateType,
        file_id: currentId,
        library_file_id: libraryFileId,
        original_ref: originalRef,
        download_method: method,
        status: "failure",
        error: errorMsg,
        http_status: httpStatus,
        local_path: null,
        size_bytes: null,
        mime_type: candidate.mime_type || null,
        timestamp: Date.now()
      };
      entries.push(failEntry);
      Logger.warn("AssetLedger", `Asset pokus selhal (${method}, id: ${currentId || pointer}): ${errorMsg}`);
      return failEntry;
    };
    if (pointer && pointer.startsWith("sandbox:")) {
      const cleanPath = normalizeSandboxPointer(pointer);
      if (!cleanPath) {
        const failEntry = recordFailure("sandbox_interpreter", new Error("Neplatná cesta sandbox pointeru"));
        return { entry: failEntry, entries };
      }
      if (!convId2 || !messageId) {
        const failEntry = recordFailure("sandbox_interpreter", new Error("Sandbox pointer chybí conversation_id nebo message_id"));
        return { entry: failEntry, entries };
      }
      try {
        const res = await downloadSandboxFileBlob({
          conversationId: convId2,
          messageId,
          sandboxPath: cleanPath
        });
        return await recordSuccess(res.blob, res.mime, res.filename, "sandbox_interpreter", null);
      } catch (err2) {
        let errMsg = err2?.message || String(err2);
        if (errMsg.includes("ace_pod_expired")) {
          errMsg = "ace_pod_expired: Sandbox kontejner vypršel";
        }
        const failEntry = recordFailure("sandbox_interpreter", new Error(errMsg));
        return { entry: failEntry, entries };
      }
    }
    if (fileId && isInlinePointer(fileId) || pointer && isInlinePointer(pointer)) {
      const url = pointer && isInlinePointer(pointer) ? pointer : fileId;
      try {
        const res = await gmFetchBlob(url);
        const mime = res.mime || candidate.mime_type || candidate.meta?.mime_type || "";
        const fname = inferFilename(originalName, fileId || pointer || "cdn_file", mime);
        return await recordSuccess(res.blob, mime, fname, "inline_cdn", fileId);
      } catch (err2) {
        const failEntry = recordFailure("inline_cdn", err2, fileId);
        return { entry: failEntry, entries };
      }
    }
    if (fileId && fileId.startsWith("sediment://")) {
      const resolved = resolveSedimentPointer(fileId);
      if (resolved) {
        fileId = resolved;
      } else {
        const failEntry = recordFailure("primary_file_id", new Error("Nelze extrahovat file_id ze sediment:// odkazu"), fileId);
        return { entry: failEntry, entries };
      }
    }
    if (!fileId && pointer && pointer.startsWith("sediment://")) {
      const resolved = resolveSedimentPointer(pointer);
      if (resolved) {
        fileId = resolved;
      }
    }
    if (fileId && fileId.startsWith("file-service://")) {
      fileId = pointerToFileId(fileId);
    }
    if (libraryFileId && libraryFileId.startsWith("file-service://")) {
      libraryFileId = pointerToFileId(libraryFileId);
    }
    if (!fileId && pointer && pointer.startsWith("file-service://")) {
      fileId = pointerToFileId(pointer);
    }
    const tryFilesApiDownload = async (targetId, gizmoId, conversationId) => {
      if (!Cred.token) {
        const ok = await Cred.ensureViaSession();
        if (!ok) throw new Error("Chybí accessToken pro stažení souboru");
      }
      const headers = Cred.getAuthHeaders();
      const pid = candidate.project_id || Cred.projectId;
      if (pid) headers.set("chatgpt-project-id", pid);
      let lastErr = null;
      try {
        const downloadResult = await fetchDownloadUrlOrResponse(targetId, headers, gizmoId, conversationId);
        if (downloadResult instanceof Response) {
          if (!downloadResult.ok) {
            const txt = await downloadResult.text().catch(() => "");
            throw new Error(`Download HTTP ${downloadResult.status}: ${txt.slice(0, 120)}`);
          }
          const blob = await downloadResult.blob();
          const mime = candidate.mime_type || candidate.meta?.mime_type || downloadResult.headers.get("Content-Type") || "";
          const cd = downloadResult.headers.get("Content-Disposition") || "";
          const m2 = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)/i);
          const resolvedName = originalName || m2 && decodeURIComponent(m2[1]) || "";
          const filename = inferFilename(resolvedName, targetId, mime);
          return { blob, mime, filename };
        } else if (typeof downloadResult === "string") {
          const res = await gmFetchBlob(downloadResult);
          const mime = res.mime || candidate.mime_type || candidate.meta?.mime_type || "";
          const filename = inferFilename(originalName, targetId, mime);
          return { blob: res.blob, mime, filename };
        }
      } catch (e2) {
        lastErr = e2;
        Logger.debug("AssetLedger", `Download endpoint selhal pro ${targetId}: ${e2.message}, zkouším meta endpoint...`);
      }
      try {
        const meta = await fetchFileMeta(targetId, headers, conversationId);
        const dlUrl = meta?.download_url || meta?.url;
        if (dlUrl && typeof dlUrl === "string" && (dlUrl.startsWith("http://") || dlUrl.startsWith("https://"))) {
          const res = await gmFetchBlob(dlUrl);
          const mime = res.mime || meta.mime_type || candidate.mime_type || "";
          const resolvedName = originalName || meta.filename || meta.file_name || "";
          const filename = inferFilename(resolvedName, targetId, mime);
          return { blob: res.blob, mime, filename };
        }
      } catch (metaErr) {
        Logger.debug("AssetLedger", `File meta endpoint selhal pro ${targetId}: ${metaErr.message}`);
      }
      throw lastErr || new Error(`Nelze stáhnout soubor pro ID ${targetId}`);
    };
    if (fileId) {
      try {
        const res = await tryFilesApiDownload(fileId, candidate.gizmo_id, convId2);
        return await recordSuccess(res.blob, res.mime, res.filename, "primary_file_id", fileId);
      } catch (err2) {
        recordFailure("primary_file_id", err2, fileId);
      }
    }
    const altFileId = candidate.meta?.file_id && candidate.meta.file_id !== fileId ? candidate.meta.file_id : candidate.meta?.id && candidate.meta.id !== fileId && (candidate.meta.id.startsWith("file-") || candidate.meta.id.startsWith("file_")) ? candidate.meta.id : null;
    if (altFileId) {
      try {
        const res = await tryFilesApiDownload(altFileId, candidate.gizmo_id, convId2);
        return await recordSuccess(res.blob, res.mime, res.filename, "alt_file_id", altFileId);
      } catch (err2) {
        recordFailure("alt_file_id", err2, altFileId);
      }
    }
    if (libraryFileId && libraryFileId !== fileId && libraryFileId !== altFileId) {
      if (isValidFilesApiId(libraryFileId)) {
        try {
          const res = await tryFilesApiDownload(libraryFileId, null, convId2);
          return await recordSuccess(res.blob, res.mime, res.filename, "library_file_id_fallback", libraryFileId);
        } catch (err2) {
          recordFailure("library_file_id_fallback", err2, libraryFileId);
        }
      } else {
        Logger.debug("AssetLedger", `library_file_id "${libraryFileId}" není platným files API ID (fallback_not_applicable). Přeskakuji.`);
      }
    }
    if (candidate.download_url && (candidate.download_url.startsWith("http://") || candidate.download_url.startsWith("https://"))) {
      try {
        const res = await gmFetchBlob(candidate.download_url);
        const mime = res.mime || candidate.mime_type || "";
        const fname = inferFilename(originalName, fileId || "direct_file", mime);
        return await recordSuccess(res.blob, mime, fname, "direct_url", fileId);
      } catch (err2) {
        recordFailure("direct_url", err2, fileId);
      }
    }
    if (entries.length === 0) {
      recordFailure("unknown", new Error("Neplatný kandidát (chybí souborové identifikátory)"), fileId);
    }
    return {
      entry: entries[entries.length - 1],
      entries
    };
  }
  function evaluateValidationStatus(input) {
    if (input.unhandledException) {
      return "FAILED";
    }
    if (!input.inventoryReport.complete) {
      return "INCOMPLETE_INVENTORY";
    }
    if (input.failedIds.length > 0 || input.missingIds.length > 0) {
      return "INCOMPLETE_CONVERSATIONS";
    }
    if (input.failedAssets > 0) {
      return "COMPLETE_WITH_ASSET_ERRORS";
    }
    return "COMPLETE";
  }
  function computeAssetLedgerSummary(ledger) {
    const candidateStatus = new Map();
    for (const entry of ledger) {
      const key = `${entry.conversation_id}|${entry.message_id || ""}|${entry.candidate_type || ""}|${entry.original_ref || entry.file_id || ""}`;
      if (entry.status === "success") {
        candidateStatus.set(key, true);
      } else if (!candidateStatus.has(key)) {
        candidateStatus.set(key, false);
      }
    }
    let savedCandidates = 0;
    let failedCandidates = 0;
    for (const isSaved of candidateStatus.values()) {
      if (isSaved) {
        savedCandidates++;
      } else {
        failedCandidates++;
      }
    }
    return {
      total_candidate_assets: candidateStatus.size,
      saved_candidate_assets: savedCandidates,
      failed_candidate_assets: failedCandidates,
      total_download_attempts: ledger.length,
      failed_download_attempts: ledger.filter((e2) => e2.status === "failure").length
    };
  }
  function buildScanReport(params) {
    const summary = computeAssetLedgerSummary(params.assetLedger);
    const status = evaluateValidationStatus({
      inventoryReport: params.inventoryReport,
      expectedIds: params.expectedIds,
      savedIds: params.savedIds,
      failedIds: params.failedIds,
      missingIds: params.missingIds,
      failedAssets: summary.failed_candidate_assets,
      unhandledException: params.unhandledException
    });
    return {
      status,
      timestamp: Date.now(),
      scan_mode: params.scanMode,
      inventory: {
        total_found: params.inventoryReport.items.length,
        complete: params.inventoryReport.complete,
        scopes: params.inventoryReport.scopes,
        errors: params.inventoryReport.errors
      },
      conversations: {
        expected_conversation_ids: params.expectedIds,
        saved_conversation_ids: params.savedIds,
        failed_conversation_ids: params.failedIds,
        missing_conversation_ids: params.missingIds,
        details: params.chatDetails
      },
      assets: {
        total_candidate_assets: summary.total_candidate_assets,
        saved_candidate_assets: summary.saved_candidate_assets,
        failed_candidate_assets: summary.failed_candidate_assets,
        total_download_attempts: summary.total_download_attempts,
        failed_download_attempts: summary.failed_download_attempts,
        total_candidates: summary.total_candidate_assets,
        saved_count: summary.saved_candidate_assets,
        failed_count: summary.failed_candidate_assets,
        ledger: params.assetLedger
      }
    };
  }
  async function saveScanReport(userFolder, report) {
    try {
      const filename = "scan_report.json";
      await writeFile(userFolder, filename, JSON.stringify(report, null, 2));
      Logger.info("Validation", `Scan report saved to disk: ${filename} (status: ${report.status})`);
    } catch (e2) {
      Logger.error("Validation", "Failed to save scan report to disk", e2);
    }
  }
  async function saveConversationToDisk(userFolder, conv, workspaceName, categoryName, runAssetLedger) {
    const id = conv.conversation_id;
    const wsFolder = await ensureFolder$1(userFolder, workspaceName);
    const catFolder = await ensureFolder$1(wsFolder, categoryName);
    const folderName = await resolveConversationFolderName(catFolder, id);
    const convFolder = await ensureFolder$1(catFolder, folderName);
    await writeFile(convFolder, "conversation.json", JSON.stringify(conv, null, 2));
    const meta = {
      id: conv.conversation_id,
      title: conv.title,
      create_time: conv.create_time,
      update_time: conv.update_time,
      model_slug: conv.default_model_slug,
      attachments: [],
      failed_attachments: [],
      asset_ledger: []
    };
    const candidates = collectFileCandidates(conv);
    let savedAssets = 0;
    let failedAssets = 0;
    if (candidates.length > 0) {
      const attFolder = await ensureFolder$1(convFolder, "attachments");
      const reacquireAttFolder = async () => {
        return await ensureFolder$1(convFolder, "attachments");
      };
      for (const c2 of candidates) {
        const { entry, entries, savedMeta } = await downloadCandidateWithLedger(c2, attFolder, reacquireAttFolder);
        const allEntries = entries && entries.length > 0 ? entries : [entry];
        for (const e2 of allEntries) {
          if (meta.asset_ledger) meta.asset_ledger.push(e2);
          if (runAssetLedger) runAssetLedger.push(e2);
        }
        if (savedMeta) {
          meta.attachments.push(savedMeta);
          savedAssets++;
        } else {
          meta.failed_attachments.push({
            pointer: entry.original_ref || void 0,
            file_id: entry.file_id || void 0,
            library_file_id: entry.library_file_id,
            source: entry.candidate_type,
            candidate_type: entry.candidate_type,
            download_method: entry.download_method,
            error: entry.error || "unknown",
            http_status: entry.http_status
          });
          failedAssets++;
        }
      }
    }
    await writeFile(convFolder, "metadata.json", JSON.stringify(meta, null, 2));
    try {
      const htmlContent = generateHTML(conv, meta.attachments);
      await writeFile(convFolder, "conversation.html", htmlContent);
    } catch (e2) {
      Logger.warn("AutoSave", "Failed to generate HTML", e2);
    }
    return { total: candidates.length, saved: savedAssets, failed: failedAssets };
  }
  async function resolveConversationFolderName(catFolder, id) {
    let fallbackName = "";
    const entries = catFolder.entries();
    for await (const [name, handle] of entries) {
      if (!handle || handle.kind !== "directory") continue;
      if (name === id) return name;
      if (!fallbackName && name.endsWith(`_${id}`)) {
        fallbackName = name;
      }
    }
    return fallbackName || id;
  }
  async function runAutoSaveCycle(forceFullScan = false) {
    if (autoSaveStore.status.value === "saving" || autoSaveStore.status.value === "checking") return;
    const rootHandle = await getRootHandle();
    if (!rootHandle) {
      autoSaveStore.setError("Automatické ukládání není nakonfigurováno");
      return;
    }
    if (!await verifyPermission(rootHandle, true)) {
      autoSaveStore.setError("Přístup ke složce byl zamítnut");
      return;
    }
    const modeLabel = forceFullScan ? "Úplné skenování" : "Auto-save";
    autoSaveStore.setStatus("checking", `${modeLabel}: Probíhá inventarizace konverzací...`);
    Logger.info("AutoSave", `Starting ${modeLabel} cycle`);
    try {
      await runExclusiveStateOp(async () => {
        if (!Cred.userLabel) {
          throw new Error("Uživatelský email nenalezen (Strict Mode)");
        }
        const userFolder = await ensureFolder$1(rootHandle, Cred.userLabel);
        const state = await loadState(userFolder);
        if (state.user.id !== (Cred.accountId || "") || state.user.email !== Cred.userLabel) {
          state.user = {
            id: Cred.accountId || "",
            email: Cred.userLabel
          };
          await saveState(state, userFolder);
        }
        const currentWorkspaceId = Cred.accountId;
        let currentWorkspaceKey = "personal";
        if (currentWorkspaceId && currentWorkspaceId !== "personal" && currentWorkspaceId !== "x") {
          currentWorkspaceKey = currentWorkspaceId;
        }
        await updateWorkspaceCheckTime(userFolder, currentWorkspaceKey);
        const inventoryReport = await buildConversationInventory({
          includeArchived: true,
          includeProjects: true,
          progressCb: (statusText2) => {
            autoSaveStore.setStatus("checking", `${modeLabel}: ${statusText2}`);
          }
        });
        if (inventoryReport.scopes.projects.subScopeDetails) {
          for (const pid of Object.keys(inventoryReport.scopes.projects.subScopeDetails)) {
            await updateGizmoCheckTime(userFolder, currentWorkspaceKey, pid);
          }
        }
        const candidates = inventoryReport.items.filter((item) => {
          if (forceFullScan) return true;
          const local = state.conversations[item.id];
          if (!local) return true;
          const remoteTime = item.update_time ? new Date(item.update_time).getTime() : 0;
          return remoteTime > local.update_time;
        });
        const expected_conversation_ids = candidates.map((c2) => c2.id);
        const saved_conversation_ids = [];
        const failed_conversation_ids = [];
        const chatDetails = [];
        const runAssetLedger = [];
        if (candidates.length === 0) {
          const scanReport2 = buildScanReport({
            scanMode: forceFullScan ? "full" : "incremental",
            inventoryReport,
            expectedIds: [],
            savedIds: [],
            failedIds: [],
            missingIds: [],
            chatDetails: [],
            assetLedger: []
          });
          await saveScanReport(userFolder, scanReport2);
          if (scanReport2.status === "COMPLETE") {
            autoSaveStore.setStatus("idle", "Nebyly nalezeny žádné změny");
            autoSaveStore.setLastRun(Date.now());
            autoSaveStore.resetError();
          } else if (scanReport2.status === "INCOMPLETE_INVENTORY") {
            autoSaveStore.setError(`Nekompletní inventář (${inventoryReport.errors[0] || "Chyba"})`);
          } else {
            autoSaveStore.setStatus("idle", `Stav scanu: ${scanReport2.status}`);
            autoSaveStore.setLastRun(Date.now());
          }
          Logger.info("AutoSave", `Cycle finished with status ${scanReport2.status}`);
          return;
        }
        autoSaveStore.setStatus("saving", `Ukládání ${candidates.length} konverzací...`);
        Logger.info("AutoSave", `Found ${candidates.length} updates to process`);
        const REGULAR_FOLDER = "conversations";
        for (let i = 0; i < candidates.length; i++) {
          const c2 = candidates[i];
          const category = c2.projectId || REGULAR_FOLDER;
          const wsFolderName = c2.workspaceId && c2.workspaceId !== "personal" && c2.workspaceId !== "x" ? c2.workspaceId : currentWorkspaceId && currentWorkspaceId !== "personal" && currentWorkspaceId !== "x" ? currentWorkspaceId : "Personal";
          const typeStr = c2.projectId ? `[Gizmo ${c2.projectId}]` : `[${wsFolderName}]`;
          const local = state.conversations[c2.id];
          const remoteTime = c2.update_time ? new Date(c2.update_time).getTime() : 0;
          const isUpToDate = !!(local && remoteTime <= local.update_time);
          if (isUpToDate) {
            let alreadySavedOnDisk = false;
            let diskMeta = null;
            try {
              const wsFolder = await ensureFolder$1(userFolder, wsFolderName);
              const catFolder = await ensureFolder$1(wsFolder, category);
              const folderName = await resolveConversationFolderName(catFolder, c2.id);
              if (folderName) {
                const convFolder = await ensureFolder$1(catFolder, folderName);
                if (await fileExists(convFolder, "metadata.json")) {
                  const metaStr = await readFile(convFolder, "metadata.json");
                  diskMeta = JSON.parse(metaStr);
                  if (!diskMeta.failed_attachments || diskMeta.failed_attachments.length === 0) {
                    alreadySavedOnDisk = true;
                  }
                }
              }
            } catch {
              alreadySavedOnDisk = false;
            }
            if (alreadySavedOnDisk) {
              Logger.info("AutoSave", `Conversation ${c2.id} is already up to date on disk. Skipping network download.`);
              saved_conversation_ids.push(c2.id);
              chatDetails.push({
                conversation_id: c2.id,
                title: diskMeta && diskMeta.title || c2.title,
                scope: c2.scopes,
                status: "saved",
                asset_count: diskMeta?.attachments?.length || 0,
                failed_assets: 0
              });
              continue;
            }
          }
          await globalRateLimiter.pace();
          autoSaveStore.setStatus("saving", `Ukládání ${i + 1}/${candidates.length}: ${typeStr} ${c2.id}`);
          Logger.info("AutoSave", `Saving ${c2.id} to ${wsFolderName}/${category}`);
          try {
            const conv = await fetchConvWithRetry(c2.id, c2.projectId);
            const assetResults = await saveConversationToDisk(
              userFolder,
              conv,
              wsFolderName,
              category,
              runAssetLedger
            );
            await updateConversationState(
              userFolder,
              c2.id,
              new Date(c2.update_time).getTime() || Date.now(),
              Date.now(),
              wsFolderName,
              c2.projectId
            );
            saved_conversation_ids.push(c2.id);
            chatDetails.push({
              conversation_id: c2.id,
              title: conv.title || c2.title,
              scope: c2.scopes,
              status: "saved",
              asset_count: assetResults.total,
              failed_assets: assetResults.failed
            });
          } catch (chatErr) {
            const errStr = chatErr?.message || String(chatErr);
            Logger.error("AutoSave", `Chyba při ukládání konverzace ${c2.id}`, chatErr);
            failed_conversation_ids.push(c2.id);
            chatDetails.push({
              conversation_id: c2.id,
              title: c2.title,
              scope: c2.scopes,
              status: "failed",
              error: errStr
            });
          }
        }
        const missing_conversation_ids = expected_conversation_ids.filter(
          (id) => !saved_conversation_ids.includes(id) && !failed_conversation_ids.includes(id)
        );
        const scanReport = buildScanReport({
          scanMode: forceFullScan ? "full" : "incremental",
          inventoryReport,
          expectedIds: expected_conversation_ids,
          savedIds: saved_conversation_ids,
          failedIds: failed_conversation_ids,
          missingIds: missing_conversation_ids,
          chatDetails,
          assetLedger: runAssetLedger
        });
        await saveScanReport(userFolder, scanReport);
        autoSaveStore.setLastRun(Date.now());
        if (scanReport.status === "COMPLETE") {
          autoSaveStore.setStatus("idle", `Vše uloženo (${saved_conversation_ids.length} chatů, ${scanReport.assets.total_candidate_assets} souborů)`);
          autoSaveStore.resetError();
          Logger.info("AutoSave", "Cycle completed successfully (COMPLETE)");
        } else if (scanReport.status === "COMPLETE_WITH_ASSET_ERRORS") {
          autoSaveStore.setStatus("idle", `Uloženo s chybami souborů (${scanReport.assets.failed_candidate_assets} chyb)`);
          autoSaveStore.resetError();
          Logger.warn("AutoSave", "Cycle completed with asset errors (COMPLETE_WITH_ASSET_ERRORS)");
        } else if (scanReport.status === "INCOMPLETE_CONVERSATIONS") {
          autoSaveStore.setError(`Nekompletní: Selhalo ${failed_conversation_ids.length} konverzací`);
          Logger.error("AutoSave", `Cycle incomplete: ${failed_conversation_ids.length} failed, ${missing_conversation_ids.length} missing`);
        } else if (scanReport.status === "INCOMPLETE_INVENTORY") {
          autoSaveStore.setError(`Nekompletní inventář (${inventoryReport.errors[0] || "Chyba"})`);
          Logger.error("AutoSave", `Cycle incomplete inventory: ${inventoryReport.errors.join("; ")}`);
        } else {
          autoSaveStore.setError(`Běh selhal: ${scanReport.status}`);
          Logger.error("AutoSave", `Cycle failed: ${scanReport.status}`);
        }
      });
    } catch (e2) {
      Logger.error("AutoSave", "Auto-save fatal error", e2);
      autoSaveStore.setError(e2.message || "Neznámá chyba");
    }
  }
  const runAutoSave = () => runAutoSaveCycle(false);
  const runFullAutoSave = () => runAutoSaveCycle(true);
  let stopRequested = false;
  let isStarted = false;
  let interruptSleep = null;
  let currentIntervalMs = 5 * 60 * 1e3;
  async function leaderLoop() {
    Logger.info("AutoSave", "I am the Leader. Starting loop.");
    while (!stopRequested) {
      const nextRun = Date.now() + currentIntervalMs;
      autoSaveStore.setNextRun(nextRun);
      await new Promise((resolve) => {
        interruptSleep = resolve;
        setTimeout(resolve, currentIntervalMs);
      });
      interruptSleep = null;
      if (stopRequested) break;
      await runAutoSaveCycle();
    }
  }
  async function startAutoSaveLoop(intervalMs = 5 * 60 * 1e3) {
    const previousIntervalMs = currentIntervalMs;
    currentIntervalMs = intervalMs;
    if (isStarted) {
      const intervalChanged = previousIntervalMs !== intervalMs;
      if (intervalChanged && autoSaveStore.role.value === "leader" && interruptSleep) {
        Logger.info("AutoSave", `Updating interval from ${previousIntervalMs}ms to ${intervalMs}ms`);
        interruptSleep();
      }
      return;
    }
    isStarted = true;
    stopRequested = false;
    Logger.info("AutoSave", `Initializing AutoSave system...`);
    autoSaveStore.setStatus("idle", "Spouštění...");
    attemptLeaderElection();
  }
  async function attemptLeaderElection() {
    if (stopRequested) return;
    try {
      const acquired = await tryAcquireLeader(async () => {
        autoSaveStore.setRole("leader");
        try {
          await runAutoSaveCycle();
          await leaderLoop();
        } finally {
          autoSaveStore.setRole("unknown");
        }
      });
      if (!acquired) {
        autoSaveStore.setRole("standby");
        autoSaveStore.setStatus("idle", "Pohotovost: automatické ukládání provádí jiná karta");
        autoSaveStore.setNextRun(0);
        setTimeout(() => attemptLeaderElection(), 1e4);
      } else {
        if (!stopRequested) {
          setTimeout(() => attemptLeaderElection(), 1e3);
        }
      }
    } catch (e2) {
      Logger.error("AutoSave", "Election error", e2);
      setTimeout(() => attemptLeaderElection(), 1e4);
    }
  }
  function stopAutoSaveLoop() {
    stopRequested = true;
    isStarted = false;
    if (interruptSleep) {
      interruptSleep();
      interruptSleep = null;
    }
    autoSaveStore.setStatus("disabled", "Automatické ukládání vypnuto");
    Logger.info("AutoSave", "Stopping loop requested");
  }
  function useCredentialStatus() {
    const [status, setStatus] = d$1({ hasToken: false, hasAcc: false, userLabel: null, debug: "" });
    const refreshCredStatus = async () => {
      await Cred.ensureViaSession();
      await Cred.ensureAccountId();
      setStatus({
        hasToken: !!Cred.token,
        hasAcc: !!Cred.accountId,
        userLabel: Cred.userLabel,
        debug: Cred.debug
      });
    };
    y$2(() => {
      refreshCredStatus();
      const timer = setInterval(refreshCredStatus, 60 * 1e3);
      return () => clearInterval(timer);
    }, []);
    return { status, refreshCredStatus };
  }
  function useAutoSave() {
    const [state, setState] = d$1({
      status: autoSaveStore.status.value,
      message: autoSaveStore.message.value,
      lastRun: autoSaveStore.lastRun.value,
      nextRun: autoSaveStore.nextRun.value,
      role: autoSaveStore.role.value,
      isLeader: autoSaveStore.isLeader.value,
      lastError: autoSaveStore.lastError.value
    });
    y$2(() => {
      const dispose = E$1(() => {
        setState({
          status: autoSaveStore.status.value,
          message: autoSaveStore.message.value,
          lastRun: autoSaveStore.lastRun.value,
          nextRun: autoSaveStore.nextRun.value,
          role: autoSaveStore.role.value,
          isLeader: autoSaveStore.isLeader.value,
          lastError: autoSaveStore.lastError.value
        });
      });
      return dispose;
    }, []);
    return state;
  }
  function StatusPanel({ status, isOk }) {
    const title = `Token: ${status.hasToken ? "✔" : "✖"} / Account: ${status.hasAcc ? "✔" : "✖"}${status.userLabel ? ` / User: ${status.userLabel}` : ""}`;
    return u$2("div", { className: "cgptx-mini-badges-col", children: u$2(
      "div",
      {
        className: `cgptx-mini-badge ${isOk ? "ok" : "bad"}`,
        title
      }
    ) });
  }
  function g(n2, t2) {
    for (var e2 in t2) n2[e2] = t2[e2];
    return n2;
  }
  function E(n2, t2) {
    for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
    return false;
  }
  function C(n2, t2) {
    var e2 = t2(), r2 = d$1({ t: { __: e2, u: t2 } }), u2 = r2[0].t, o2 = r2[1];
    return _$2(function() {
      u2.__ = e2, u2.u = t2, x$1(u2) && o2({ t: u2 });
    }, [n2, e2, t2]), y$2(function() {
      return x$1(u2) && o2({ t: u2 }), n2(function() {
        x$1(u2) && o2({ t: u2 });
      });
    }, [n2]), e2;
  }
  function x$1(n2) {
    var t2, e2, r2 = n2.u, u2 = n2.__;
    try {
      var o2 = r2();
      return !((t2 = u2) === (e2 = o2) && (0 !== t2 || 1 / t2 == 1 / e2) || t2 != t2 && e2 != e2);
    } catch (n3) {
      return true;
    }
  }
  function R(n2) {
    n2();
  }
  function w(n2) {
    return n2;
  }
  function k() {
    return [false, R];
  }
  var I = _$2;
  function N(n2, t2) {
    this.props = n2, this.context = t2;
  }
  function M(n2, e2) {
    function r2(n3) {
      var t2 = this.props.ref, r3 = t2 == n3.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), e2 ? !e2(this.props, n3) || !r3 : E(this.props, n3);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, _$3(n2, e3);
    }
    return u2.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2.type = n2, u2;
  }
  (N.prototype = new x$3()).isPureReactComponent = true, N.prototype.shouldComponentUpdate = function(n2, t2) {
    return E(this.props, n2) || E(this.state, t2);
  };
  var T = l$2.__b;
  l$2.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T && T(n2);
  };
  var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function D(n2) {
    function t2(t3) {
      var e2 = g({}, t3);
      return delete e2.ref, n2(e2, t3.ref || null);
    }
    return t2.$$typeof = A, t2.render = n2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
  }
  var L = function(n2, t2) {
    return null == n2 ? null : H$1(H$1(n2).map(t2));
  }, O = { map: L, forEach: L, count: function(n2) {
    return n2 ? H$1(n2).length : 0;
  }, only: function(n2) {
    var t2 = H$1(n2);
    if (1 !== t2.length) throw "Children.only";
    return t2[0];
  }, toArray: H$1 }, F = l$2.__e;
  l$2.__e = function(n2, t2, e2, r2) {
    if (n2.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n2, t2);
    }
    F(n2, t2, e2, r2);
  };
  var U = l$2.unmount;
  function V(n2, t2, e2) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return V(n3, t2, e2);
    })), n2;
  }
  function W(n2, t2, e2) {
    return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return W(n3, t2, e2);
    }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
  }
  function P() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j(n2) {
    var t2 = n2.__.__c;
    return t2 && t2.__a && t2.__a(n2);
  }
  function z(n2) {
    var e2, r2, u2, o2 = null;
    function i(i2) {
      if (e2 || (e2 = n2()).then(function(n3) {
        n3 && (o2 = n3.default || n3), u2 = true;
      }, function(n3) {
        r2 = n3, u2 = true;
      }), r2) throw r2;
      if (!u2) throw e2;
      return o2 ? _$3(o2, i2) : null;
    }
    return i.displayName = "Lazy", i.__f = true, i;
  }
  function B() {
    this.i = null, this.l = null;
  }
  l$2.unmount = function(n2) {
    var t2 = n2.__c;
    t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), U && U(n2);
  }, (P.prototype = new x$3()).__c = function(n2, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.o && (r2.o = []), r2.o.push(e2);
    var u2 = j(r2.__v), o2 = false, i = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(l2) : l2());
    };
    e2.__R = i;
    var l2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n3 = r2.state.__a;
          r2.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i, i);
  }, P.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P.prototype.render = function(n2, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i = e2.__a && _$3(k$3, null, n2.fallback);
    return i && (i.__u &= -33), [_$3(k$3, null, e2.__a ? null : n2.children), i];
  };
  var H = function(n2, t2, e2) {
    if (++e2[1] === e2[0] && n2.l.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e2 = n2.i; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n2.i = e2 = e2[2];
    }
  };
  function Z(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function Y(n2) {
    var e2 = this, r2 = n2.h;
    if (e2.componentWillUnmount = function() {
      G$1(null, e2.v), e2.v = null, e2.h = null;
    }, e2.h && e2.h !== r2 && e2.componentWillUnmount(), !e2.v) {
      for (var u2 = e2.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      e2.h = r2, e2.v = { nodeType: 1, parentNode: r2, childNodes: [], __k: { __m: u2.__m }, contains: function() {
        return true;
      }, insertBefore: function(n3, t2) {
        this.childNodes.push(n3), e2.h.insertBefore(n3, t2);
      }, removeChild: function(n3) {
        this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e2.h.removeChild(n3);
      } };
    }
    G$1(_$3(Z, { context: e2.context }, n2.__v), e2.v);
  }
  function $(n2, e2) {
    var r2 = _$3(Y, { __v: n2, h: e2 });
    return r2.containerInfo = e2, r2;
  }
  (B.prototype = new x$3()).__a = function(n2) {
    var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n2);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), H(t2, n2, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, B.prototype.render = function(n2) {
    this.i = null, this.l = new Map();
    var t2 = H$1(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
    return n2.children;
  }, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
    var n2 = this;
    this.l.forEach(function(t2, e2) {
      H(n2, e2, t2);
    });
  };
  var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  function nn(n2, t2, e2) {
    return null == t2.__k && (t2.textContent = ""), G$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
  }
  function tn(n2, t2, e2) {
    return J$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
  }
  x$3.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(x$3.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n2) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
    } });
  });
  var en = l$2.event;
  function rn() {
  }
  function un() {
    return this.cancelBubble;
  }
  function on() {
    return this.defaultPrevented;
  }
  l$2.event = function(n2) {
    return en && (n2 = en(n2)), n2.persist = rn, n2.isPropagationStopped = un, n2.isDefaultPrevented = on, n2.nativeEvent = n2;
  };
  var ln$1, cn$1 = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, fn = l$2.vnode;
  l$2.vnode = function(n2) {
    "string" == typeof n2.type && (function(n3) {
      var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 === e2.indexOf("-");
      for (var i in t2) {
        var l2 = t2[i];
        if (!("value" === i && "defaultValue" in t2 && null == l2 || Q && "children" === i && "noscript" === e2 || "class" === i || "className" === i)) {
          var c2 = i.toLowerCase();
          "defaultValue" === i && "value" in t2 && null == t2.value ? i = "value" : "download" === i && true === l2 ? l2 = "" : "translate" === c2 && "no" === l2 ? l2 = false : "o" === c2[0] && "n" === c2[1] ? "ondoubleclick" === c2 ? i = "ondblclick" : "onchange" !== c2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === c2 ? i = "onfocusin" : "onblur" === c2 ? i = "onfocusout" : J.test(i) && (i = c2) : c2 = i = "oninput" : o2 && G.test(i) ? i = i.replace(K, "-$&").toLowerCase() : null === l2 && (l2 = void 0), "oninput" === c2 && u2[i = c2] && (i = "oninputCapture"), u2[i] = l2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = H$1(t2.children).forEach(function(n4) {
        n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = H$1(t2.children).forEach(function(n4) {
        n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", cn$1)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n3.props = u2;
    })(n2), n2.$$typeof = q, fn && fn(n2);
  };
  var an = l$2.__r;
  l$2.__r = function(n2) {
    an && an(n2), ln$1 = n2.__c;
  };
  var sn = l$2.diffed;
  l$2.diffed = function(n2) {
    sn && sn(n2);
    var t2 = n2.props, e2 = n2.__e;
    null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value), ln$1 = null;
  };
  var hn = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
    return ln$1.__n[n2.__c].props.value;
  }, useCallback: q$1, useContext: x$2, useDebugValue: P$1, useDeferredValue: w, useEffect: y$2, useId: g$3, useImperativeHandle: F$2, useInsertionEffect: I, useLayoutEffect: _$2, useMemo: T$1, useReducer: h$2, useRef: A$2, useState: d$1, useSyncExternalStore: C, useTransition: k } } };
  function dn(n2) {
    return _$3.bind(null, n2);
  }
  function mn(n2) {
    return !!n2 && n2.$$typeof === q;
  }
  function pn(n2) {
    return mn(n2) && n2.type === k$3;
  }
  function yn(n2) {
    return !!n2 && !!n2.displayName && ("string" == typeof n2.displayName || n2.displayName instanceof String) && n2.displayName.startsWith("Memo(");
  }
  function _n(n2) {
    return mn(n2) ? K$1.apply(null, arguments) : n2;
  }
  function bn(n2) {
    return !!n2.__k && (G$1(null, n2), true);
  }
  function Sn(n2) {
    return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
  }
  var gn = function(n2, t2) {
    return n2(t2);
  }, En = function(n2, t2) {
    return n2(t2);
  }, Cn = k$3, xn = mn, Rn = { useState: d$1, useId: g$3, useReducer: h$2, useEffect: y$2, useLayoutEffect: _$2, useInsertionEffect: I, useTransition: k, useDeferredValue: w, useSyncExternalStore: C, startTransition: R, useRef: A$2, useImperativeHandle: F$2, useMemo: T$1, useCallback: q$1, useContext: x$2, useDebugValue: P$1, version: "18.3.1", Children: O, render: nn, hydrate: tn, unmountComponentAtNode: bn, createPortal: $, createElement: _$3, createContext: Q$1, createFactory: dn, cloneElement: _n, createRef: b$2, Fragment: k$3, isValidElement: mn, isElement: xn, isFragment: pn, isMemo: yn, findDOMNode: Sn, Component: x$3, PureComponent: N, memo: M, forwardRef: D, flushSync: En, unstable_batchedUpdates: gn, StrictMode: Cn, Suspense: P, SuspenseList: B, lazy: z, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: hn };
  function __insertCSS(code) {
    if (typeof document == "undefined") return;
    let head = document.head || document.getElementsByTagName("head")[0];
    let style = document.createElement("style");
    style.type = "text/css";
    head.appendChild(style);
    style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
  }
  const getAsset = (type) => {
    switch (type) {
      case "success":
        return SuccessIcon;
      case "info":
        return InfoIcon;
      case "warning":
        return WarningIcon;
      case "error":
        return ErrorIcon;
      default:
        return null;
    }
  };
  const bars = Array(12).fill(0);
  const Loader = ({ visible, className }) => {
    return Rn.createElement("div", {
      className: [
        "sonner-loading-wrapper",
        className
      ].filter(Boolean).join(" "),
      "data-visible": visible
    }, Rn.createElement("div", {
      className: "sonner-spinner"
    }, bars.map((_2, i) => Rn.createElement("div", {
      className: "sonner-loading-bar",
      key: `spinner-bar-${i}`
    }))));
  };
  const SuccessIcon = Rn.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
  }, Rn.createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    clipRule: "evenodd"
  }));
  const WarningIcon = Rn.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    height: "20",
    width: "20"
  }, Rn.createElement("path", {
    fillRule: "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
    clipRule: "evenodd"
  }));
  const InfoIcon = Rn.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
  }, Rn.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
    clipRule: "evenodd"
  }));
  const ErrorIcon = Rn.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
  }, Rn.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }));
  const CloseIcon = Rn.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, Rn.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), Rn.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
  const useIsDocumentHidden = () => {
    const [isDocumentHidden, setIsDocumentHidden] = Rn.useState(document.hidden);
    Rn.useEffect(() => {
      const callback = () => {
        setIsDocumentHidden(document.hidden);
      };
      document.addEventListener("visibilitychange", callback);
      return () => window.removeEventListener("visibilitychange", callback);
    }, []);
    return isDocumentHidden;
  };
  let toastsCounter = 1;
  class Observer {
    constructor() {
      this.subscribe = (subscriber) => {
        this.subscribers.push(subscriber);
        return () => {
          const index = this.subscribers.indexOf(subscriber);
          this.subscribers.splice(index, 1);
        };
      };
      this.publish = (data) => {
        this.subscribers.forEach((subscriber) => subscriber(data));
      };
      this.addToast = (data) => {
        this.publish(data);
        this.toasts = [
          ...this.toasts,
          data
        ];
      };
      this.create = (data) => {
        var _data_id;
        const { message, ...rest } = data;
        const id = typeof (data == null ? void 0 : data.id) === "number" || ((_data_id = data.id) == null ? void 0 : _data_id.length) > 0 ? data.id : toastsCounter++;
        const alreadyExists = this.toasts.find((toast2) => {
          return toast2.id === id;
        });
        const dismissible = data.dismissible === void 0 ? true : data.dismissible;
        if (this.dismissedToasts.has(id)) {
          this.dismissedToasts.delete(id);
        }
        if (alreadyExists) {
          this.toasts = this.toasts.map((toast2) => {
            if (toast2.id === id) {
              this.publish({
                ...toast2,
                ...data,
                id,
                title: message
              });
              return {
                ...toast2,
                ...data,
                id,
                dismissible,
                title: message
              };
            }
            return toast2;
          });
        } else {
          this.addToast({
            title: message,
            ...rest,
            dismissible,
            id
          });
        }
        return id;
      };
      this.dismiss = (id) => {
        if (id) {
          this.dismissedToasts.add(id);
          requestAnimationFrame(() => this.subscribers.forEach((subscriber) => subscriber({
            id,
            dismiss: true
          })));
        } else {
          this.toasts.forEach((toast2) => {
            this.subscribers.forEach((subscriber) => subscriber({
              id: toast2.id,
              dismiss: true
            }));
          });
        }
        return id;
      };
      this.message = (message, data) => {
        return this.create({
          ...data,
          message
        });
      };
      this.error = (message, data) => {
        return this.create({
          ...data,
          message,
          type: "error"
        });
      };
      this.success = (message, data) => {
        return this.create({
          ...data,
          type: "success",
          message
        });
      };
      this.info = (message, data) => {
        return this.create({
          ...data,
          type: "info",
          message
        });
      };
      this.warning = (message, data) => {
        return this.create({
          ...data,
          type: "warning",
          message
        });
      };
      this.loading = (message, data) => {
        return this.create({
          ...data,
          type: "loading",
          message
        });
      };
      this.promise = (promise, data) => {
        if (!data) {
          return;
        }
        let id = void 0;
        if (data.loading !== void 0) {
          id = this.create({
            ...data,
            promise,
            type: "loading",
            message: data.loading,
            description: typeof data.description !== "function" ? data.description : void 0
          });
        }
        const p2 = Promise.resolve(promise instanceof Function ? promise() : promise);
        let shouldDismiss = id !== void 0;
        let result;
        const originalPromise = p2.then(async (response) => {
          result = [
            "resolve",
            response
          ];
          const isReactElementResponse = Rn.isValidElement(response);
          if (isReactElementResponse) {
            shouldDismiss = false;
            this.create({
              id,
              type: "default",
              message: response
            });
          } else if (isHttpResponse(response) && !response.ok) {
            shouldDismiss = false;
            const promiseData = typeof data.error === "function" ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
            const description = typeof data.description === "function" ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
            const isExtendedResult = typeof promiseData === "object" && !Rn.isValidElement(promiseData);
            const toastSettings = isExtendedResult ? promiseData : {
              message: promiseData
            };
            this.create({
              id,
              type: "error",
              description,
              ...toastSettings
            });
          } else if (response instanceof Error) {
            shouldDismiss = false;
            const promiseData = typeof data.error === "function" ? await data.error(response) : data.error;
            const description = typeof data.description === "function" ? await data.description(response) : data.description;
            const isExtendedResult = typeof promiseData === "object" && !Rn.isValidElement(promiseData);
            const toastSettings = isExtendedResult ? promiseData : {
              message: promiseData
            };
            this.create({
              id,
              type: "error",
              description,
              ...toastSettings
            });
          } else if (data.success !== void 0) {
            shouldDismiss = false;
            const promiseData = typeof data.success === "function" ? await data.success(response) : data.success;
            const description = typeof data.description === "function" ? await data.description(response) : data.description;
            const isExtendedResult = typeof promiseData === "object" && !Rn.isValidElement(promiseData);
            const toastSettings = isExtendedResult ? promiseData : {
              message: promiseData
            };
            this.create({
              id,
              type: "success",
              description,
              ...toastSettings
            });
          }
        }).catch(async (error) => {
          result = [
            "reject",
            error
          ];
          if (data.error !== void 0) {
            shouldDismiss = false;
            const promiseData = typeof data.error === "function" ? await data.error(error) : data.error;
            const description = typeof data.description === "function" ? await data.description(error) : data.description;
            const isExtendedResult = typeof promiseData === "object" && !Rn.isValidElement(promiseData);
            const toastSettings = isExtendedResult ? promiseData : {
              message: promiseData
            };
            this.create({
              id,
              type: "error",
              description,
              ...toastSettings
            });
          }
        }).finally(() => {
          if (shouldDismiss) {
            this.dismiss(id);
            id = void 0;
          }
          data.finally == null ? void 0 : data.finally.call(data);
        });
        const unwrap = () => new Promise((resolve, reject) => originalPromise.then(() => result[0] === "reject" ? reject(result[1]) : resolve(result[1])).catch(reject));
        if (typeof id !== "string" && typeof id !== "number") {
          return {
            unwrap
          };
        } else {
          return Object.assign(id, {
            unwrap
          });
        }
      };
      this.custom = (jsx, data) => {
        const id = (data == null ? void 0 : data.id) || toastsCounter++;
        this.create({
          jsx: jsx(id),
          id,
          ...data
        });
        return id;
      };
      this.getActiveToasts = () => {
        return this.toasts.filter((toast2) => !this.dismissedToasts.has(toast2.id));
      };
      this.subscribers = [];
      this.toasts = [];
      this.dismissedToasts = new Set();
    }
  }
  const ToastState = new Observer();
  const toastFunction = (message, data) => {
    const id = (data == null ? void 0 : data.id) || toastsCounter++;
    ToastState.addToast({
      title: message,
      ...data,
      id
    });
    return id;
  };
  const isHttpResponse = (data) => {
    return data && typeof data === "object" && "ok" in data && typeof data.ok === "boolean" && "status" in data && typeof data.status === "number";
  };
  const basicToast = toastFunction;
  const getHistory = () => ToastState.toasts;
  const getToasts = () => ToastState.getActiveToasts();
  const toast = Object.assign(basicToast, {
    success: ToastState.success,
    info: ToastState.info,
    warning: ToastState.warning,
    error: ToastState.error,
    custom: ToastState.custom,
    message: ToastState.message,
    promise: ToastState.promise,
    dismiss: ToastState.dismiss,
    loading: ToastState.loading
  }, {
    getHistory,
    getToasts
  });
  __insertCSS("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
  function isAction(action) {
    return action.label !== void 0;
  }
  const VISIBLE_TOASTS_AMOUNT = 3;
  const VIEWPORT_OFFSET = "24px";
  const MOBILE_VIEWPORT_OFFSET = "16px";
  const TOAST_LIFETIME = 4e3;
  const TOAST_WIDTH = 356;
  const GAP = 14;
  const SWIPE_THRESHOLD = 45;
  const TIME_BEFORE_UNMOUNT = 200;
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  function getDefaultSwipeDirections(position) {
    const [y2, x] = position.split("-");
    const directions = [];
    if (y2) {
      directions.push(y2);
    }
    if (x) {
      directions.push(x);
    }
    return directions;
  }
  const Toast = (props) => {
    var _toast_classNames, _toast_classNames1, _toast_classNames2, _toast_classNames3, _toast_classNames4, _toast_classNames5, _toast_classNames6, _toast_classNames7, _toast_classNames8;
    const { invert: ToasterInvert, toast: toast2, unstyled, interacting, setHeights, visibleToasts, heights, index, toasts, expanded, removeToast, defaultRichColors, closeButton: closeButtonFromToaster, style, cancelButtonStyle, actionButtonStyle, className = "", descriptionClassName = "", duration: durationFromToaster, position, gap, expandByDefault, classNames, icons, closeButtonAriaLabel = "Close toast" } = props;
    const [swipeDirection, setSwipeDirection] = Rn.useState(null);
    const [swipeOutDirection, setSwipeOutDirection] = Rn.useState(null);
    const [mounted, setMounted] = Rn.useState(false);
    const [removed, setRemoved] = Rn.useState(false);
    const [swiping, setSwiping] = Rn.useState(false);
    const [swipeOut, setSwipeOut] = Rn.useState(false);
    const [isSwiped, setIsSwiped] = Rn.useState(false);
    const [offsetBeforeRemove, setOffsetBeforeRemove] = Rn.useState(0);
    const [initialHeight, setInitialHeight] = Rn.useState(0);
    const remainingTime = Rn.useRef(toast2.duration || durationFromToaster || TOAST_LIFETIME);
    const dragStartTime = Rn.useRef(null);
    const toastRef = Rn.useRef(null);
    const isFront = index === 0;
    const isVisible2 = index + 1 <= visibleToasts;
    const toastType = toast2.type;
    const dismissible = toast2.dismissible !== false;
    const toastClassname = toast2.className || "";
    const toastDescriptionClassname = toast2.descriptionClassName || "";
    const heightIndex = Rn.useMemo(() => heights.findIndex((height) => height.toastId === toast2.id) || 0, [
      heights,
      toast2.id
    ]);
    const closeButton = Rn.useMemo(() => {
      var _toast_closeButton;
      return (_toast_closeButton = toast2.closeButton) != null ? _toast_closeButton : closeButtonFromToaster;
    }, [
      toast2.closeButton,
      closeButtonFromToaster
    ]);
    const duration = Rn.useMemo(() => toast2.duration || durationFromToaster || TOAST_LIFETIME, [
      toast2.duration,
      durationFromToaster
    ]);
    const closeTimerStartTimeRef = Rn.useRef(0);
    const offset = Rn.useRef(0);
    const lastCloseTimerStartTimeRef = Rn.useRef(0);
    const pointerStartRef = Rn.useRef(null);
    const [y2, x] = position.split("-");
    const toastsHeightBefore = Rn.useMemo(() => {
      return heights.reduce((prev, curr, reducerIndex) => {
        if (reducerIndex >= heightIndex) {
          return prev;
        }
        return prev + curr.height;
      }, 0);
    }, [
      heights,
      heightIndex
    ]);
    const isDocumentHidden = useIsDocumentHidden();
    const invert = toast2.invert || ToasterInvert;
    const disabled = toastType === "loading";
    offset.current = Rn.useMemo(() => heightIndex * gap + toastsHeightBefore, [
      heightIndex,
      toastsHeightBefore
    ]);
    Rn.useEffect(() => {
      remainingTime.current = duration;
    }, [
      duration
    ]);
    Rn.useEffect(() => {
      setMounted(true);
    }, []);
    Rn.useEffect(() => {
      const toastNode = toastRef.current;
      if (toastNode) {
        const height = toastNode.getBoundingClientRect().height;
        setInitialHeight(height);
        setHeights((h2) => [
          {
            toastId: toast2.id,
            height,
            position: toast2.position
          },
          ...h2
        ]);
        return () => setHeights((h2) => h2.filter((height2) => height2.toastId !== toast2.id));
      }
    }, [
      setHeights,
      toast2.id
    ]);
    Rn.useLayoutEffect(() => {
      if (!mounted) return;
      const toastNode = toastRef.current;
      const originalHeight = toastNode.style.height;
      toastNode.style.height = "auto";
      const newHeight = toastNode.getBoundingClientRect().height;
      toastNode.style.height = originalHeight;
      setInitialHeight(newHeight);
      setHeights((heights2) => {
        const alreadyExists = heights2.find((height) => height.toastId === toast2.id);
        if (!alreadyExists) {
          return [
            {
              toastId: toast2.id,
              height: newHeight,
              position: toast2.position
            },
            ...heights2
          ];
        } else {
          return heights2.map((height) => height.toastId === toast2.id ? {
            ...height,
            height: newHeight
          } : height);
        }
      });
    }, [
      mounted,
      toast2.title,
      toast2.description,
      setHeights,
      toast2.id,
      toast2.jsx,
      toast2.action,
      toast2.cancel
    ]);
    const deleteToast = Rn.useCallback(() => {
      setRemoved(true);
      setOffsetBeforeRemove(offset.current);
      setHeights((h2) => h2.filter((height) => height.toastId !== toast2.id));
      setTimeout(() => {
        removeToast(toast2);
      }, TIME_BEFORE_UNMOUNT);
    }, [
      toast2,
      removeToast,
      setHeights,
      offset
    ]);
    Rn.useEffect(() => {
      if (toast2.promise && toastType === "loading" || toast2.duration === Infinity || toast2.type === "loading") return;
      let timeoutId;
      const pauseTimer = () => {
        if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
          const elapsedTime = ( new Date()).getTime() - closeTimerStartTimeRef.current;
          remainingTime.current = remainingTime.current - elapsedTime;
        }
        lastCloseTimerStartTimeRef.current = ( new Date()).getTime();
      };
      const startTimer = () => {
        if (remainingTime.current === Infinity) return;
        closeTimerStartTimeRef.current = ( new Date()).getTime();
        timeoutId = setTimeout(() => {
          toast2.onAutoClose == null ? void 0 : toast2.onAutoClose.call(toast2, toast2);
          deleteToast();
        }, remainingTime.current);
      };
      if (expanded || interacting || isDocumentHidden) {
        pauseTimer();
      } else {
        startTimer();
      }
      return () => clearTimeout(timeoutId);
    }, [
      expanded,
      interacting,
      toast2,
      toastType,
      isDocumentHidden,
      deleteToast
    ]);
    Rn.useEffect(() => {
      if (toast2.delete) {
        deleteToast();
        toast2.onDismiss == null ? void 0 : toast2.onDismiss.call(toast2, toast2);
      }
    }, [
      deleteToast,
      toast2.delete
    ]);
    function getLoadingIcon() {
      var _toast_classNames9;
      if (icons == null ? void 0 : icons.loading) {
        var _toast_classNames12;
        return Rn.createElement("div", {
          className: cn(classNames == null ? void 0 : classNames.loader, toast2 == null ? void 0 : (_toast_classNames12 = toast2.classNames) == null ? void 0 : _toast_classNames12.loader, "sonner-loader"),
          "data-visible": toastType === "loading"
        }, icons.loading);
      }
      return Rn.createElement(Loader, {
        className: cn(classNames == null ? void 0 : classNames.loader, toast2 == null ? void 0 : (_toast_classNames9 = toast2.classNames) == null ? void 0 : _toast_classNames9.loader),
        visible: toastType === "loading"
      });
    }
    const icon = toast2.icon || (icons == null ? void 0 : icons[toastType]) || getAsset(toastType);
    var _toast_richColors, _icons_close;
    return Rn.createElement("li", {
      tabIndex: 0,
      ref: toastRef,
      className: cn(className, toastClassname, classNames == null ? void 0 : classNames.toast, toast2 == null ? void 0 : (_toast_classNames = toast2.classNames) == null ? void 0 : _toast_classNames.toast, classNames == null ? void 0 : classNames.default, classNames == null ? void 0 : classNames[toastType], toast2 == null ? void 0 : (_toast_classNames1 = toast2.classNames) == null ? void 0 : _toast_classNames1[toastType]),
      "data-sonner-toast": "",
      "data-rich-colors": (_toast_richColors = toast2.richColors) != null ? _toast_richColors : defaultRichColors,
      "data-styled": !Boolean(toast2.jsx || toast2.unstyled || unstyled),
      "data-mounted": mounted,
      "data-promise": Boolean(toast2.promise),
      "data-swiped": isSwiped,
      "data-removed": removed,
      "data-visible": isVisible2,
      "data-y-position": y2,
      "data-x-position": x,
      "data-index": index,
      "data-front": isFront,
      "data-swiping": swiping,
      "data-dismissible": dismissible,
      "data-type": toastType,
      "data-invert": invert,
      "data-swipe-out": swipeOut,
      "data-swipe-direction": swipeOutDirection,
      "data-expanded": Boolean(expanded || expandByDefault && mounted),
      "data-testid": toast2.testId,
      style: {
        "--index": index,
        "--toasts-before": index,
        "--z-index": toasts.length - index,
        "--offset": `${removed ? offsetBeforeRemove : offset.current}px`,
        "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`,
        ...style,
        ...toast2.style
      },
      onDragEnd: () => {
        setSwiping(false);
        setSwipeDirection(null);
        pointerStartRef.current = null;
      },
      onPointerDown: (event) => {
        if (event.button === 2) return;
        if (disabled || !dismissible) return;
        dragStartTime.current = new Date();
        setOffsetBeforeRemove(offset.current);
        event.target.setPointerCapture(event.pointerId);
        if (event.target.tagName === "BUTTON") return;
        setSwiping(true);
        pointerStartRef.current = {
          x: event.clientX,
          y: event.clientY
        };
      },
      onPointerUp: () => {
        var _toastRef_current, _toastRef_current1, _dragStartTime_current;
        if (swipeOut || !dismissible) return;
        pointerStartRef.current = null;
        const swipeAmountX = Number(((_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0);
        const swipeAmountY = Number(((_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0);
        const timeTaken = ( new Date()).getTime() - ((_dragStartTime_current = dragStartTime.current) == null ? void 0 : _dragStartTime_current.getTime());
        const swipeAmount = swipeDirection === "x" ? swipeAmountX : swipeAmountY;
        const velocity = Math.abs(swipeAmount) / timeTaken;
        if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
          setOffsetBeforeRemove(offset.current);
          toast2.onDismiss == null ? void 0 : toast2.onDismiss.call(toast2, toast2);
          if (swipeDirection === "x") {
            setSwipeOutDirection(swipeAmountX > 0 ? "right" : "left");
          } else {
            setSwipeOutDirection(swipeAmountY > 0 ? "down" : "up");
          }
          deleteToast();
          setSwipeOut(true);
          return;
        } else {
          var _toastRef_current2, _toastRef_current3;
          (_toastRef_current2 = toastRef.current) == null ? void 0 : _toastRef_current2.style.setProperty("--swipe-amount-x", `0px`);
          (_toastRef_current3 = toastRef.current) == null ? void 0 : _toastRef_current3.style.setProperty("--swipe-amount-y", `0px`);
        }
        setIsSwiped(false);
        setSwiping(false);
        setSwipeDirection(null);
      },
      onPointerMove: (event) => {
        var _window_getSelection, _toastRef_current, _toastRef_current1;
        if (!pointerStartRef.current || !dismissible) return;
        const isHighlighted = ((_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString().length) > 0;
        if (isHighlighted) return;
        const yDelta = event.clientY - pointerStartRef.current.y;
        const xDelta = event.clientX - pointerStartRef.current.x;
        var _props_swipeDirections;
        const swipeDirections = (_props_swipeDirections = props.swipeDirections) != null ? _props_swipeDirections : getDefaultSwipeDirections(position);
        if (!swipeDirection && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) {
          setSwipeDirection(Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y");
        }
        let swipeAmount = {
          x: 0,
          y: 0
        };
        const getDampening = (delta) => {
          const factor = Math.abs(delta) / 20;
          return 1 / (1.5 + factor);
        };
        if (swipeDirection === "y") {
          if (swipeDirections.includes("top") || swipeDirections.includes("bottom")) {
            if (swipeDirections.includes("top") && yDelta < 0 || swipeDirections.includes("bottom") && yDelta > 0) {
              swipeAmount.y = yDelta;
            } else {
              const dampenedDelta = yDelta * getDampening(yDelta);
              swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
            }
          }
        } else if (swipeDirection === "x") {
          if (swipeDirections.includes("left") || swipeDirections.includes("right")) {
            if (swipeDirections.includes("left") && xDelta < 0 || swipeDirections.includes("right") && xDelta > 0) {
              swipeAmount.x = xDelta;
            } else {
              const dampenedDelta = xDelta * getDampening(xDelta);
              swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
            }
          }
        }
        if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) {
          setIsSwiped(true);
        }
        (_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.setProperty("--swipe-amount-x", `${swipeAmount.x}px`);
        (_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.setProperty("--swipe-amount-y", `${swipeAmount.y}px`);
      }
    }, closeButton && !toast2.jsx && toastType !== "loading" ? Rn.createElement("button", {
      "aria-label": closeButtonAriaLabel,
      "data-disabled": disabled,
      "data-close-button": true,
      onClick: disabled || !dismissible ? () => {
      } : () => {
        deleteToast();
        toast2.onDismiss == null ? void 0 : toast2.onDismiss.call(toast2, toast2);
      },
      className: cn(classNames == null ? void 0 : classNames.closeButton, toast2 == null ? void 0 : (_toast_classNames2 = toast2.classNames) == null ? void 0 : _toast_classNames2.closeButton)
    }, (_icons_close = icons == null ? void 0 : icons.close) != null ? _icons_close : CloseIcon) : null, (toastType || toast2.icon || toast2.promise) && toast2.icon !== null && ((icons == null ? void 0 : icons[toastType]) !== null || toast2.icon) ? Rn.createElement("div", {
      "data-icon": "",
      className: cn(classNames == null ? void 0 : classNames.icon, toast2 == null ? void 0 : (_toast_classNames3 = toast2.classNames) == null ? void 0 : _toast_classNames3.icon)
    }, toast2.promise || toast2.type === "loading" && !toast2.icon ? toast2.icon || getLoadingIcon() : null, toast2.type !== "loading" ? icon : null) : null, Rn.createElement("div", {
      "data-content": "",
      className: cn(classNames == null ? void 0 : classNames.content, toast2 == null ? void 0 : (_toast_classNames4 = toast2.classNames) == null ? void 0 : _toast_classNames4.content)
    }, Rn.createElement("div", {
      "data-title": "",
      className: cn(classNames == null ? void 0 : classNames.title, toast2 == null ? void 0 : (_toast_classNames5 = toast2.classNames) == null ? void 0 : _toast_classNames5.title)
    }, toast2.jsx ? toast2.jsx : typeof toast2.title === "function" ? toast2.title() : toast2.title), toast2.description ? Rn.createElement("div", {
      "data-description": "",
      className: cn(descriptionClassName, toastDescriptionClassname, classNames == null ? void 0 : classNames.description, toast2 == null ? void 0 : (_toast_classNames6 = toast2.classNames) == null ? void 0 : _toast_classNames6.description)
    }, typeof toast2.description === "function" ? toast2.description() : toast2.description) : null), Rn.isValidElement(toast2.cancel) ? toast2.cancel : toast2.cancel && isAction(toast2.cancel) ? Rn.createElement("button", {
      "data-button": true,
      "data-cancel": true,
      style: toast2.cancelButtonStyle || cancelButtonStyle,
      onClick: (event) => {
        if (!isAction(toast2.cancel)) return;
        if (!dismissible) return;
        toast2.cancel.onClick == null ? void 0 : toast2.cancel.onClick.call(toast2.cancel, event);
        deleteToast();
      },
      className: cn(classNames == null ? void 0 : classNames.cancelButton, toast2 == null ? void 0 : (_toast_classNames7 = toast2.classNames) == null ? void 0 : _toast_classNames7.cancelButton)
    }, toast2.cancel.label) : null, Rn.isValidElement(toast2.action) ? toast2.action : toast2.action && isAction(toast2.action) ? Rn.createElement("button", {
      "data-button": true,
      "data-action": true,
      style: toast2.actionButtonStyle || actionButtonStyle,
      onClick: (event) => {
        if (!isAction(toast2.action)) return;
        toast2.action.onClick == null ? void 0 : toast2.action.onClick.call(toast2.action, event);
        if (event.defaultPrevented) return;
        deleteToast();
      },
      className: cn(classNames == null ? void 0 : classNames.actionButton, toast2 == null ? void 0 : (_toast_classNames8 = toast2.classNames) == null ? void 0 : _toast_classNames8.actionButton)
    }, toast2.action.label) : null);
  };
  function getDocumentDirection() {
    if (typeof window === "undefined") return "ltr";
    if (typeof document === "undefined") return "ltr";
    const dirAttribute = document.documentElement.getAttribute("dir");
    if (dirAttribute === "auto" || !dirAttribute) {
      return window.getComputedStyle(document.documentElement).direction;
    }
    return dirAttribute;
  }
  function assignOffset(defaultOffset, mobileOffset) {
    const styles = {};
    [
      defaultOffset,
      mobileOffset
    ].forEach((offset, index) => {
      const isMobile = index === 1;
      const prefix = isMobile ? "--mobile-offset" : "--offset";
      const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
      function assignAll(offset2) {
        [
          "top",
          "right",
          "bottom",
          "left"
        ].forEach((key) => {
          styles[`${prefix}-${key}`] = typeof offset2 === "number" ? `${offset2}px` : offset2;
        });
      }
      if (typeof offset === "number" || typeof offset === "string") {
        assignAll(offset);
      } else if (typeof offset === "object") {
        [
          "top",
          "right",
          "bottom",
          "left"
        ].forEach((key) => {
          if (offset[key] === void 0) {
            styles[`${prefix}-${key}`] = defaultValue;
          } else {
            styles[`${prefix}-${key}`] = typeof offset[key] === "number" ? `${offset[key]}px` : offset[key];
          }
        });
      } else {
        assignAll(defaultValue);
      }
    });
    return styles;
  }
  const Toaster$1 = Rn.forwardRef(function Toaster(props, ref) {
    const { id, invert, position = "bottom-right", hotkey = [
      "altKey",
      "KeyT"
    ], expand, closeButton, className, offset, mobileOffset, theme = "light", richColors, duration, style, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions, dir = getDocumentDirection(), gap = GAP, icons, containerAriaLabel = "Notifications" } = props;
    const [toasts, setToasts] = Rn.useState([]);
    const filteredToasts = Rn.useMemo(() => {
      if (id) {
        return toasts.filter((toast2) => toast2.toasterId === id);
      }
      return toasts.filter((toast2) => !toast2.toasterId);
    }, [
      toasts,
      id
    ]);
    const possiblePositions = Rn.useMemo(() => {
      return Array.from(new Set([
        position
      ].concat(filteredToasts.filter((toast2) => toast2.position).map((toast2) => toast2.position))));
    }, [
      filteredToasts,
      position
    ]);
    const [heights, setHeights] = Rn.useState([]);
    const [expanded, setExpanded] = Rn.useState(false);
    const [interacting, setInteracting] = Rn.useState(false);
    const [actualTheme, setActualTheme] = Rn.useState(theme !== "system" ? theme : typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "light");
    const listRef = Rn.useRef(null);
    const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    const lastFocusedElementRef = Rn.useRef(null);
    const isFocusWithinRef = Rn.useRef(false);
    const removeToast = Rn.useCallback((toastToRemove) => {
      setToasts((toasts2) => {
        var _toasts_find;
        if (!((_toasts_find = toasts2.find((toast2) => toast2.id === toastToRemove.id)) == null ? void 0 : _toasts_find.delete)) {
          ToastState.dismiss(toastToRemove.id);
        }
        return toasts2.filter(({ id: id2 }) => id2 !== toastToRemove.id);
      });
    }, []);
    Rn.useEffect(() => {
      return ToastState.subscribe((toast2) => {
        if (toast2.dismiss) {
          requestAnimationFrame(() => {
            setToasts((toasts2) => toasts2.map((t2) => t2.id === toast2.id ? {
              ...t2,
              delete: true
            } : t2));
          });
          return;
        }
        setTimeout(() => {
          Rn.flushSync(() => {
            setToasts((toasts2) => {
              const indexOfExistingToast = toasts2.findIndex((t2) => t2.id === toast2.id);
              if (indexOfExistingToast !== -1) {
                return [
                  ...toasts2.slice(0, indexOfExistingToast),
                  {
                    ...toasts2[indexOfExistingToast],
                    ...toast2
                  },
                  ...toasts2.slice(indexOfExistingToast + 1)
                ];
              }
              return [
                toast2,
                ...toasts2
              ];
            });
          });
        });
      });
    }, [
      toasts
    ]);
    Rn.useEffect(() => {
      if (theme !== "system") {
        setActualTheme(theme);
        return;
      }
      if (theme === "system") {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setActualTheme("dark");
        } else {
          setActualTheme("light");
        }
      }
      if (typeof window === "undefined") return;
      const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      try {
        darkMediaQuery.addEventListener("change", ({ matches }) => {
          if (matches) {
            setActualTheme("dark");
          } else {
            setActualTheme("light");
          }
        });
      } catch (error) {
        darkMediaQuery.addListener(({ matches }) => {
          try {
            if (matches) {
              setActualTheme("dark");
            } else {
              setActualTheme("light");
            }
          } catch (e2) {
            console.error(e2);
          }
        });
      }
    }, [
      theme
    ]);
    Rn.useEffect(() => {
      if (toasts.length <= 1) {
        setExpanded(false);
      }
    }, [
      toasts
    ]);
    Rn.useEffect(() => {
      const handleKeyDown = (event) => {
        var _listRef_current;
        const isHotkeyPressed = hotkey.every((key) => event[key] || event.code === key);
        if (isHotkeyPressed) {
          var _listRef_current1;
          setExpanded(true);
          (_listRef_current1 = listRef.current) == null ? void 0 : _listRef_current1.focus();
        }
        if (event.code === "Escape" && (document.activeElement === listRef.current || ((_listRef_current = listRef.current) == null ? void 0 : _listRef_current.contains(document.activeElement)))) {
          setExpanded(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      hotkey
    ]);
    Rn.useEffect(() => {
      if (listRef.current) {
        return () => {
          if (lastFocusedElementRef.current) {
            lastFocusedElementRef.current.focus({
              preventScroll: true
            });
            lastFocusedElementRef.current = null;
            isFocusWithinRef.current = false;
          }
        };
      }
    }, [
      listRef.current
    ]);
    return (

Rn.createElement("section", {
        ref,
        "aria-label": `${containerAriaLabel} ${hotkeyLabel}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: true
      }, possiblePositions.map((position2, index) => {
        var _heights_;
        const [y2, x] = position2.split("-");
        if (!filteredToasts.length) return null;
        return Rn.createElement("ol", {
          key: position2,
          dir: dir === "auto" ? getDocumentDirection() : dir,
          tabIndex: -1,
          ref: listRef,
          className,
          "data-sonner-toaster": true,
          "data-sonner-theme": actualTheme,
          "data-y-position": y2,
          "data-x-position": x,
          style: {
            "--front-toast-height": `${((_heights_ = heights[0]) == null ? void 0 : _heights_.height) || 0}px`,
            "--width": `${TOAST_WIDTH}px`,
            "--gap": `${gap}px`,
            ...style,
            ...assignOffset(offset, mobileOffset)
          },
          onBlur: (event) => {
            if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
              isFocusWithinRef.current = false;
              if (lastFocusedElementRef.current) {
                lastFocusedElementRef.current.focus({
                  preventScroll: true
                });
                lastFocusedElementRef.current = null;
              }
            }
          },
          onFocus: (event) => {
            const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
            if (isNotDismissible) return;
            if (!isFocusWithinRef.current) {
              isFocusWithinRef.current = true;
              lastFocusedElementRef.current = event.relatedTarget;
            }
          },
          onMouseEnter: () => setExpanded(true),
          onMouseMove: () => setExpanded(true),
          onMouseLeave: () => {
            if (!interacting) {
              setExpanded(false);
            }
          },
          onDragEnd: () => setExpanded(false),
          onPointerDown: (event) => {
            const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
            if (isNotDismissible) return;
            setInteracting(true);
          },
          onPointerUp: () => setInteracting(false)
        }, filteredToasts.filter((toast2) => !toast2.position && index === 0 || toast2.position === position2).map((toast2, index2) => {
          var _toastOptions_duration, _toastOptions_closeButton;
          return Rn.createElement(Toast, {
            key: toast2.id,
            icons,
            index: index2,
            toast: toast2,
            defaultRichColors: richColors,
            duration: (_toastOptions_duration = toastOptions == null ? void 0 : toastOptions.duration) != null ? _toastOptions_duration : duration,
            className: toastOptions == null ? void 0 : toastOptions.className,
            descriptionClassName: toastOptions == null ? void 0 : toastOptions.descriptionClassName,
            invert,
            visibleToasts,
            closeButton: (_toastOptions_closeButton = toastOptions == null ? void 0 : toastOptions.closeButton) != null ? _toastOptions_closeButton : closeButton,
            interacting,
            position: position2,
            style: toastOptions == null ? void 0 : toastOptions.style,
            unstyled: toastOptions == null ? void 0 : toastOptions.unstyled,
            classNames: toastOptions == null ? void 0 : toastOptions.classNames,
            cancelButtonStyle: toastOptions == null ? void 0 : toastOptions.cancelButtonStyle,
            actionButtonStyle: toastOptions == null ? void 0 : toastOptions.actionButtonStyle,
            closeButtonAriaLabel: toastOptions == null ? void 0 : toastOptions.closeButtonAriaLabel,
            removeToast,
            toasts: filteredToasts.filter((t2) => t2.position == toast2.position),
            heights: heights.filter((h2) => h2.position == toast2.position),
            setHeights,
            expandByDefault: expand,
            gap,
            expanded,
            swipeDirections: props.swipeDirections
          });
        }));
      }))
    );
  });
  const CHATGPT_ICON_BUTTON_CLASS = [
    "cgptx-mini-btn",
    "text-token-text-tertiary",
    "no-draggable",
    "hover:bg-token-surface-hover",
    "dark:hover:bg-token-main-surface-tertiary",
    "keyboard-focused:bg-token-surface-hover",
    "touch:h-10",
    "touch:w-10",
    "flex",
    "h-9",
    "w-9",
    "items-center",
    "justify-center",
    "rounded-lg",
    "focus:outline-none",
    "disabled:opacity-50"
  ].join(" ");
  const CHATGPT_MODAL_OVERLAY_CLASS = [
    "cgptx-modal",
    "fixed",
    "inset-0",
    "z-50",
    "before:starting:backdrop-blur-0",
    "before:absolute",
    "before:inset-0",
    "before:bg-gray-200/50",
    "before:backdrop-blur-[1px]",
    "not-motion-reduce:before:transition",
    "not-motion-reduce:before:duration-250",
    "dark:before:bg-black/50",
    "before:starting:opacity-0"
  ].join(" ");
  const CHATGPT_MODAL_GRID_CLASS = "z-50 h-full w-full overflow-y-auto grid grid-cols-[10px_1fr_10px] grid-rows-[minmax(10px,1fr)_auto_minmax(10px,1fr)] md:grid-rows-[minmax(20px,0.8fr)_auto_minmax(20px,1fr)]";
  const CHATGPT_MODAL_BOX_CLASS = "cgptx-modal-box popover bg-token-bg-primary relative col-auto col-start-2 row-auto row-start-2 h-full w-full text-start start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 rounded-2xl shadow-long flex flex-col focus:outline-hidden overflow-hidden max-h-[85vh] max-md:min-h-[60vh] md:h-[600px] md:max-w-[680px]";
  const CHATGPT_MODAL_HEADER_CLASS = "cgptx-modal-header min-h-header-height flex justify-between p-2.5 ps-4 select-none border-token-border-light border-b gap-2";
  const CHATGPT_MODAL_TITLE_CLASS = "cgptx-modal-title w-full text-lg font-normal text-token-text-primary truncate select-none";
  const CHATGPT_PANEL_CLASS = "text-token-text-primary relative flex w-full flex-col overflow-y-auto px-4 text-sm max-md:max-h-[calc(100vh-150px)] md:min-h-[380px]";
  const CHATGPT_SETTINGS_LEFT_CLOSE_BUTTON_CLASS = "flex h-9 w-9 items-center justify-center rounded-lg hover:bg-token-surface-hover dark:hover:bg-token-main-surface-tertiary keyboard-focused:bg-token-surface-hover bg-transparent";
  const CHATGPT_SECONDARY_BUTTON_CLASS = "btn relative group-focus-within/dialog:focus-visible:[outline-width:1.5px] group-focus-within/dialog:focus-visible:[outline-offset:2.5px] group-focus-within/dialog:focus-visible:[outline-style:solid] group-focus-within/dialog:focus-visible:[outline-color:var(--text-primary)] btn-secondary shrink-0";
  const CHATGPT_SWITCH_CLASS = "radix-state-checked:bg-blue-400 focus-visible:ring-token-text-primary relative box-content aspect-7/4 shrink-0 rounded-full bg-gray-200 p-[2px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:opacity-50 dark:bg-gray-600 h-4";
  const CHATGPT_SWITCH_THUMB_CLASS = "radix-state-checked:translate-x-[calc(var(--to-end-unit,1)*100%*(7/4-1))] flex aspect-square h-full items-center justify-center rounded-full bg-white transition-transform duration-100";
  function ExportJsonButton({ refreshCredStatus, onDataFetched }) {
    const [busy, setBusy] = d$1(false);
    const handleJsonExport = async () => {
      const id = convId();
      const pid = projectId();
      if (!id) {
        toast.error("Nebylo zjištěno ID chatu. Funkci použijte v konkrétním chatu (URL musí obsahovat /c/xxxx).");
        return;
      }
      setBusy(true);
      try {
        await refreshCredStatus();
        if (!Cred.token) throw new Error("Není k dispozici platný accessToken");
        const data = await fetchConversation(id, pid || void 0);
        if (onDataFetched) onDataFetched(data);
        const safeTitle = sanitize(data?.title || "");
        const filename = `${safeTitle || "chat"}_${id}.json`;
        saveJSON(data, filename);
        toast.success("Export JSON dokončen");
      } catch (e2) {
        console.error("[ChatGPT-Multimodal-Exporter] Export selhal: ", e2);
        toast.error("Export selhal: " + (e2 && e2.message ? e2.message : e2));
      } finally {
        setBusy(false);
      }
    };
    return u$2(
      "button",
      {
        id: "cgptx-mini-btn",
        className: CHATGPT_ICON_BUTTON_CLASS,
        title: "Exportovat JSON",
        "aria-label": "Exportovat JSON",
        onClick: handleJsonExport,
        disabled: busy,
        children: u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
u$2("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
u$2("polyline", { points: "7 10 12 15 17 10" }),
u$2("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
        ] })
      }
    );
  }
  async function downloadPointerOrFile(fileInfo) {
    const fileId = fileInfo.file_id;
    const pointer = fileInfo.pointer || "";
    const convId2 = fileInfo.conversation_id || "";
    const messageId = fileInfo.message_id || "";
    if (isInlinePointer(fileId) || isInlinePointer(pointer)) {
      const url = isInlinePointer(pointer) ? pointer : fileId;
      const name2 = inferFilename(
        fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || "",
        fileId || pointer,
        ""
      );
      await gmDownload(url, name2);
      return;
    }
    if (pointer && pointer.startsWith("sandbox:")) {
      if (!convId2 || !messageId) {
        console.warn("[ChatGPT-Multimodal-Exporter] sandbox pointer缺少 conversation/message id", pointer);
        return;
      }
      await downloadSandboxFile({ conversationId: convId2, messageId, sandboxPath: pointer });
      return;
    }
    if (fileInfo.download_url) {
      const fname = inferFilename(
        fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || "",
        fileId || pointer || "file",
        fileInfo.mime_type || ""
      );
      await gmDownload(fileInfo.download_url, fname);
      return;
    }
    const candidateIds = [];
    if (fileId && (fileId.startsWith("file-") || fileId.startsWith("file_"))) {
      candidateIds.push(fileId);
    }
    if (fileInfo.library_file_id && (fileInfo.library_file_id.startsWith("file-") || fileInfo.library_file_id.startsWith("file_")) && !candidateIds.includes(fileInfo.library_file_id)) {
      candidateIds.push(fileInfo.library_file_id);
    }
    if (candidateIds.length === 0) {
      if (fileId) candidateIds.push(fileId);
      if (fileInfo.library_file_id && fileInfo.library_file_id !== fileId) candidateIds.push(fileInfo.library_file_id);
    }
    if (candidateIds.length === 0) {
      console.warn("Invalid file_id, expected to start with 'file-' or 'file_'", fileId);
      return;
    }
    if (!Cred.token) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error("Chybí accessToken, nelze stáhnout soubor");
    }
    const headers = Cred.getAuthHeaders();
    const pid = projectId();
    if (pid) headers.set("chatgpt-project-id", pid);
    let resp = null;
    let downloadUrlStr = null;
    let lastErr = null;
    for (const cid of candidateIds) {
      try {
        const downloadResult = await fetchDownloadUrlOrResponse(cid, headers, fileInfo.gizmo_id, fileInfo.conversation_id);
        if (downloadResult instanceof Response) {
          resp = downloadResult;
          break;
        } else if (typeof downloadResult === "string") {
          downloadUrlStr = downloadResult;
          break;
        }
      } catch (e2) {
        lastErr = e2;
      }
    }
    if (downloadUrlStr) {
      const fname = fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || `${fileId}${fileExtFromMime("") || ""}`;
      await gmDownload(downloadUrlStr, fname);
      return;
    }
    if (!resp) {
      throw lastErr || new Error(`Nelze získat download_url; pokud je file-id správné, odkaz mohl vypršet (file_id: ${fileId})`);
    }
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`Stažení selhalo ${resp.status}: ${txt.slice(0, 120)}`);
    }
    const blob = await resp.blob();
    const cd = resp.headers.get("Content-Disposition") || "";
    const m2 = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)/i);
    const mime = fileInfo.meta && (fileInfo.meta.mime_type || fileInfo.meta.file_type) || resp.headers.get("Content-Type") || "";
    const ext = fileExtFromMime(mime) || ".bin";
    let name = fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || m2 && decodeURIComponent(m2[1]) || `${fileId}${ext}`;
    name = sanitize(name);
    saveBlob(blob, name);
  }
  async function downloadSelectedFiles(list2) {
    let okCount = 0;
    for (const info of list2) {
      try {
        await downloadPointerOrFile(info);
        okCount++;
      } catch (e2) {
        console.error("[ChatGPT-Multimodal-Exporter] Stažení selhalo", info, e2);
      }
    }
    return { ok: okCount, total: list2.length };
  }
  async function downloadPointerOrFileAsBlob(fileInfo) {
    const fileId = fileInfo.file_id;
    const pointer = fileInfo.pointer || "";
    const convId2 = fileInfo.conversation_id || "";
    const projectId2 = fileInfo.project_id || "";
    const messageId = fileInfo.message_id || "";
    if (isInlinePointer(fileId) || isInlinePointer(pointer)) {
      const url = isInlinePointer(pointer) ? pointer : fileId;
      const res = await gmFetchBlob(url);
      const mime2 = res.mime || fileInfo.meta?.mime_type || fileInfo.meta?.mime || "";
      const filename = inferFilename(
        fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || "",
        fileId || pointer,
        mime2
      );
      return { blob: res.blob, mime: mime2, filename };
    }
    if (pointer && pointer.startsWith("sandbox:")) {
      if (!convId2 || !messageId) throw new Error("Sandbox pointer postrádá conversation/message id");
      return downloadSandboxFileBlob({ conversationId: convId2, messageId, sandboxPath: pointer });
    }
    if (fileInfo.download_url) {
      const res = await gmFetchBlob(fileInfo.download_url);
      const mime2 = res.mime || fileInfo.meta?.mime_type || fileInfo.mime_type || "";
      const fname = inferFilename(
        fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || "",
        fileId || pointer || "direct_file",
        mime2
      );
      return { blob: res.blob, mime: mime2, filename: fname };
    }
    const candidateIds = [];
    if (fileId && (fileId.startsWith("file-") || fileId.startsWith("file_"))) {
      candidateIds.push(fileId);
    }
    if (fileInfo.library_file_id && (fileInfo.library_file_id.startsWith("file-") || fileInfo.library_file_id.startsWith("file_")) && !candidateIds.includes(fileInfo.library_file_id)) {
      candidateIds.push(fileInfo.library_file_id);
    }
    if (candidateIds.length === 0) {
      if (fileId) candidateIds.push(fileId);
      if (fileInfo.library_file_id && fileInfo.library_file_id !== fileId) candidateIds.push(fileInfo.library_file_id);
    }
    if (candidateIds.length === 0) {
      console.warn("Invalid file_id, expected to start with 'file-' or 'file_'", fileId);
      throw new Error("Invalid file_id");
    }
    if (!Cred.token) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error("Chybí accessToken, nelze stáhnout soubor");
    }
    const headers = Cred.getAuthHeaders();
    if (projectId2) headers.set("chatgpt-project-id", projectId2);
    let resp = null;
    let downloadUrlStr = null;
    let lastErr = null;
    for (const cid of candidateIds) {
      try {
        const downloadResult = await fetchDownloadUrlOrResponse(cid, headers, fileInfo.gizmo_id, fileInfo.conversation_id);
        if (downloadResult instanceof Response) {
          resp = downloadResult;
          break;
        } else if (typeof downloadResult === "string") {
          downloadUrlStr = downloadResult;
          break;
        }
      } catch (e2) {
        lastErr = e2;
      }
    }
    if (downloadUrlStr) {
      const res = await gmFetchBlob(downloadUrlStr);
      const mime2 = res.mime || fileInfo.meta?.mime_type || fileInfo.meta?.mime || "";
      const fname = inferFilename(
        fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || "",
        fileId,
        mime2
      );
      return {
        blob: res.blob,
        mime: mime2,
        filename: fname
      };
    }
    if (!resp) {
      throw lastErr || new Error(`Nelze získat download_url; pokud je file-id správné, odkaz mohl vypršet (file_id: ${fileId})`);
    }
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`Stažení selhalo ${resp.status}: ${txt.slice(0, 120)}`);
    }
    const blob = await resp.blob();
    const cd = resp.headers.get("Content-Disposition") || "";
    const m2 = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)/i);
    const mime = fileInfo.meta && (fileInfo.meta.mime_type || fileInfo.meta.file_type) || resp.headers.get("Content-Type") || "";
    const name = inferFilename(
      fileInfo.meta && (fileInfo.meta.name || fileInfo.meta.file_name) || m2 && decodeURIComponent(m2[1]) || "",
      fileId,
      mime
    );
    return { blob, mime, filename: name };
  }
  function Checkbox({ checked, indeterminate, onChange, label, disabled, className = "" }) {
    const inputRef = A$2(null);
    y$2(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);
    return u$2("label", { className: `cgptx-checkbox-wrapper ${disabled ? "disabled" : ""} ${className}`, children: [
u$2("div", { className: "cgptx-checkbox-input-wrapper", children: [
u$2(
          "input",
          {
            ref: inputRef,
            type: "checkbox",
            className: "cgptx-checkbox-input",
            checked,
            disabled,
            onChange: (e2) => onChange(e2.currentTarget.checked)
          }
        ),
u$2("div", { className: "cgptx-checkbox-custom", children: [
u$2("svg", { viewBox: "0 0 24 24", className: "cgptx-checkbox-icon check", children: u$2("polyline", { points: "20 6 9 17 4 12" }) }),
u$2("svg", { viewBox: "0 0 24 24", className: "cgptx-checkbox-icon minus", children: u$2("line", { x1: "5", y1: "12", x2: "19", y2: "12" }) })
        ] })
      ] }),
      label && u$2("span", { className: "cgptx-checkbox-label", children: label })
    ] });
  }
  function FilePreviewDialog({ candidates, onConfirm, onClose }) {
    const [selectedIndices, setSelectedIndices] = d$1(
      new Set(candidates.map((_2, i) => i))
    );
    const toggleSelect = (idx) => {
      const next = new Set(selectedIndices);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      setSelectedIndices(next);
    };
    const toggleAll = () => {
      if (selectedIndices.size === candidates.length) {
        setSelectedIndices( new Set());
      } else {
        setSelectedIndices(new Set(candidates.map((_2, i) => i)));
      }
    };
    const handleConfirm = () => {
      const selected = candidates.filter((_2, i) => selectedIndices.has(i));
      if (selected.length === 0) {
        toast.error("Vyberte alespoň jeden soubor");
        return;
      }
      onConfirm(selected);
      onClose();
    };
    return u$2("div", { className: CHATGPT_MODAL_OVERLAY_CLASS, onClick: (e2) => e2.target === e2.currentTarget && onClose(), children: u$2("div", { className: CHATGPT_MODAL_GRID_CLASS, children: u$2("div", { className: CHATGPT_MODAL_BOX_CLASS, children: [
u$2("div", { className: CHATGPT_MODAL_HEADER_CLASS, children: [
u$2("div", { className: CHATGPT_MODAL_TITLE_CLASS, children: [
          "Soubory ke stažení (",
          candidates.length,
          ")"
        ] }),
u$2("div", { className: "cgptx-modal-actions", children: [
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: toggleAll, children: "Vybrat vše / obrátit výběr" }),
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: handleConfirm, children: "Stáhnout vybrané" }),
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: onClose, children: "Zavřít" })
        ] })
      ] }),
u$2("div", { className: `${CHATGPT_PANEL_CLASS} cgptx-modal-panel`, children: [
u$2("div", { className: "cgptx-list", children: candidates.map((info, idx) => {
          const name = info.meta && (info.meta.name || info.meta.file_name) || info.file_id || info.pointer || "Bez názvu";
          const mime = info.meta && (info.meta.mime_type || info.meta.file_type) || info.meta && info.meta.mime || "";
          const size = info.meta?.size_bytes || info.meta?.size || info.meta?.file_size || info.meta?.file_size_bytes || null;
          const metaParts = [];
          metaParts.push(`Zdroj: ${info.source || "Neznámý"}`);
          if (info.file_id) metaParts.push(`file_id: ${info.file_id}`);
          if (info.pointer && info.pointer !== info.file_id) metaParts.push(`pointer: ${info.pointer}`);
          if (mime) metaParts.push(`mime: ${mime}`);
          if (size) metaParts.push(`Velikost: ${formatBytes(size)}`);
          return u$2("div", { className: "cgptx-item", children: [
u$2(
              Checkbox,
              {
                checked: selectedIndices.has(idx),
                onChange: () => toggleSelect(idx)
              }
            ),
u$2("div", {}),
u$2("div", { children: [
u$2("div", { className: "title", children: name }),
u$2("div", { className: "meta", children: metaParts.join(" • ") })
            ] })
          ] }, idx);
        }) }),
u$2("div", { className: "cgptx-modal-actions cgptx-modal-tip", children: u$2("div", { className: "cgptx-chip", children: "Po kliknutí na „Stáhnout vybrané“ se soubory stáhnou postupně v pořadí seznamu (včetně /files a CDN odkazů)." }) })
      ] })
    ] }) }) });
  }
  function showFilePreviewDialog(candidates, onConfirm) {
    const root = document.createElement("div");
    document.body.appendChild(root);
    const close = () => {
      G$1(null, root);
      root.remove();
    };
    G$1(_$3(FilePreviewDialog, {
      candidates,
      onConfirm,
      onClose: close
    }), root);
  }
  function DownloadFilesButton({ refreshCredStatus, cachedData, onDataFetched }) {
    const [busy, setBusy] = d$1(false);
    const handleFilesDownload = async () => {
      const id = convId();
      const pid = projectId();
      if (!id) {
        toast.error("Nebylo zjištěno ID chatu. Funkci použijte v konkrétním chatu (URL musí obsahovat /c/xxxx).");
        return;
      }
      setBusy(true);
      try {
        await refreshCredStatus();
        if (!Cred.token) throw new Error("Není k dispozici platný accessToken");
        let data = cachedData;
        if (!data || data.conversation_id !== id) {
          data = await fetchConversation(id, pid || void 0);
          if (onDataFetched) onDataFetched(data);
        }
        const cands = collectFileCandidates(data);
        if (!cands.length) {
          toast.info("Nebyly nalezeny žádné soubory ani odkazy ke stažení.");
          setBusy(false);
          return;
        }
        showFilePreviewDialog(cands, async (selected) => {
          setBusy(true);
          try {
            const res = await downloadSelectedFiles(selected);
            toast.success(`Stahování dokončeno, úspěšně ${res.ok}/${res.total}`);
          } catch (e2) {
            console.error("[ChatGPT-Multimodal-Exporter] Stažení selhalo: ", e2);
            toast.error("Stažení selhalo: " + (e2 && e2.message ? e2.message : e2));
          } finally {
            setBusy(false);
          }
        });
        setBusy(false);
      } catch (e2) {
        console.error("[ChatGPT-Multimodal-Exporter] Stažení selhalo: ", e2);
        toast.error("Stažení selhalo: " + (e2 && e2.message ? e2.message : e2));
        setBusy(false);
      }
    };
    return u$2(
      "button",
      {
        id: "cgptx-mini-btn-files",
        className: CHATGPT_ICON_BUTTON_CLASS,
        title: "Stáhnout soubory aktuálního chatu",
        "aria-label": "Stáhnout soubory aktuálního chatu",
        onClick: handleFilesDownload,
        disabled: busy,
        children: u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
u$2("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
u$2("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
u$2("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
        ] })
      }
    );
  }
  const SETTINGS_ROW_CLASS = "border-token-border-light flex min-h-15 items-center border-b py-2 last-of-type:border-none";
  const SETTINGS_TAB_CLASS = "group __menu-item hoverable gap-1.5 cgptx-settings-tab";
  function ToggleSwitch({ checked, onChange, ariaLabel, disabled = false }) {
    const state = checked ? "checked" : "unchecked";
    return u$2(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": ariaLabel,
        "data-state": state,
        className: CHATGPT_SWITCH_CLASS,
        disabled,
        onClick: () => onChange(!checked),
        children: u$2("span", { "data-state": state, className: CHATGPT_SWITCH_THUMB_CLASS })
      }
    );
  }
  function statusText(state) {
    if (state === "idle") return "Nečinný";
    if (state === "checking") return "Kontrola";
    if (state === "saving") return "Ukládání";
    if (state === "disabled") return "Vypnuto";
    return "Chyba";
  }
  function AutoSaveSettings({ status, onClose }) {
    const [loading, setLoading] = d$1(true);
    const [enabled, setEnabled] = d$1(false);
    const [intervalMinutes, setIntervalMinutes] = d$1(5);
    const [debug, setDebug] = d$1(Logger.isDebug());
    const [rootPath, setRootPath] = d$1("");
    const [activeTab, setActiveTab] = d$1("general");
    y$2(() => {
      getRootHandle().then((h2) => {
        const hasSetting = localStorage.getItem("chatgpt_exporter_autosave_enabled") !== null;
        const storedEnabled = localStorage.getItem("chatgpt_exporter_autosave_enabled") === "true";
        const storedInterval = localStorage.getItem("chatgpt_exporter_autosave_interval");
        const initialInterval = storedInterval ? parseInt(storedInterval, 10) : 5;
        const isEnabledEffectively = !!h2 && (hasSetting ? storedEnabled : true);
        setIntervalMinutes(initialInterval);
        setEnabled(isEnabledEffectively);
        setRootPath(h2 ? h2.name : "Nevybráno");
        setLoading(false);
      });
    }, []);
    const applyEnabled = async (nextEnabled) => {
      if (nextEnabled) {
        let handle = await getRootHandle();
        if (!handle) {
          const picked = await pickAndSaveRootHandle();
          if (!picked) {
            toast.info("Automatické ukládání nebylo zapnuto");
            return;
          }
          handle = picked;
          setRootPath(picked.name);
        }
        localStorage.setItem("chatgpt_exporter_autosave_enabled", "true");
        setEnabled(true);
        startAutoSaveLoop(intervalMinutes * 60 * 1e3);
        toast.success("Automatické ukládání zapnuto");
        return;
      }
      localStorage.setItem("chatgpt_exporter_autosave_enabled", "false");
      setEnabled(false);
      stopAutoSaveLoop();
      toast.info("Automatické ukládání pozastaveno");
    };
    const handleIntervalChange = (value) => {
      const nextInterval = Math.max(1, parseInt(value, 10) || 1);
      setIntervalMinutes(nextInterval);
      localStorage.setItem("chatgpt_exporter_autosave_interval", String(nextInterval));
      if (enabled) {
        startAutoSaveLoop(nextInterval * 60 * 1e3);
      }
    };
    const changeFolder = async () => {
      const h2 = await pickAndSaveRootHandle();
      if (!h2) return;
      setRootPath(h2.name);
      toast.success("Složka pro ukládání byla změněna");
      if (enabled) {
        startAutoSaveLoop(intervalMinutes * 60 * 1e3);
      }
    };
    const renderGeneralTab = () => u$2("section", { className: "relative", children: [
u$2("div", { className: "flex min-h-15 items-center py-3 border-token-border-default border-b", children: u$2("h3", { className: "w-full text-lg font-normal", children: "Automatické ukládání" }) }),
u$2("div", { className: SETTINGS_ROW_CLASS, children: u$2("div", { className: "w-full", children: [
u$2("div", { className: "flex items-center justify-between gap-3", children: [
u$2("div", { children: "Stav" }),
u$2("span", { className: `cgptx-status-chip ${status.state}`, children: statusText(status.state) })
        ] }),
        status.message && u$2("div", { className: "text-token-text-tertiary my-1 text-xs", children: status.message }),
        status.lastRun > 0 && u$2("div", { className: "text-token-text-tertiary my-1 text-xs", children: [
          "Poslední spuštění: ",
          new Date(status.lastRun).toLocaleString()
        ] })
      ] }) }),
u$2("div", { className: SETTINGS_ROW_CLASS, children: u$2("div", { className: "w-full", children: u$2("div", { className: "flex items-center justify-between gap-3", children: [
u$2("div", { children: "Automatické ukládání" }),
u$2("div", { className: "flex items-center gap-1", children: u$2(
          ToggleSwitch,
          {
            checked: enabled,
            onChange: applyEnabled,
            ariaLabel: "Automatické ukládání"
          }
        ) })
      ] }) }) }),
u$2("div", { className: SETTINGS_ROW_CLASS, children: u$2("div", { className: "w-full", children: u$2("div", { className: "flex items-center justify-between gap-3", children: [
u$2("div", { children: "Interval ukládání (minuty)" }),
u$2(
          "input",
          {
            className: "cgptx-settings-number",
            type: "number",
            min: "1",
            value: intervalMinutes,
            onChange: (e2) => handleIntervalChange(e2.target.value),
            disabled: !enabled
          }
        )
      ] }) }) }),
u$2("div", { className: SETTINGS_ROW_CLASS, children: u$2("div", { className: "w-full", children: u$2("div", { className: "flex items-center justify-between gap-3", children: [
u$2("div", { children: "Ruční úlohy" }),
u$2("div", { className: "cgptx-settings-actions-left", children: [
u$2(
            "button",
            {
              className: CHATGPT_SECONDARY_BUTTON_CLASS,
              onClick: () => {
                runAutoSave();
                toast.info("Okamžité uložení spuštěno");
              },
              disabled: status.state !== "idle" && status.state !== "error",
              title: "Spustit běžnou přírůstkovou kontrolu",
              children: "Spustit nyní"
            }
          ),
u$2(
            "button",
            {
              className: CHATGPT_SECONDARY_BUTTON_CLASS,
              onClick: () => {
                runFullAutoSave();
                toast.info("Úplné skenování spuštěno");
              },
              disabled: status.state !== "idle" && status.state !== "error",
              title: "Zkontroluje všechny chaty (pomalejší)",
              children: "Úplné skenování"
            }
          )
        ] })
      ] }) }) }),
u$2("div", { className: "text-token-text-tertiary mt-3 text-xs", children: "Změny se projeví automaticky; není třeba potvrzovat nastavení." })
    ] });
    const renderStorageTab = () => u$2("section", { className: "relative", children: [
u$2("div", { className: "flex min-h-15 items-center py-3 border-token-border-default border-b", children: u$2("h3", { className: "w-full text-lg font-normal", children: "Úložiště" }) }),
u$2("div", { className: SETTINGS_ROW_CLASS, children: u$2("div", { className: "w-full", children: [
u$2("div", { className: "flex items-center justify-between gap-3", children: [
u$2("div", { children: "Složka pro ukládání" }),
u$2("div", { className: "flex items-center gap-2", children: [
u$2("span", { className: "cgptx-settings-folder", title: rootPath, children: rootPath }),
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: changeFolder, children: "Změnit" })
          ] })
        ] }),
u$2("div", { className: "text-token-text-tertiary my-1 text-xs", children: "Doporučujeme samostatnou složku, aby se soubory nemíchaly s ručními exporty." })
      ] }) })
    ] });
    const renderAdvancedTab = () => u$2("section", { className: "relative", children: [
u$2("div", { className: "flex min-h-15 items-center py-3 border-token-border-default border-b", children: u$2("h3", { className: "w-full text-lg font-normal", children: "Pokročilé" }) }),
u$2("div", { className: SETTINGS_ROW_CLASS, children: u$2("div", { className: "w-full", children: [
u$2("div", { className: "flex items-center justify-between gap-3", children: [
u$2("div", { children: "Režim ladění (projeví se okamžitě)" }),
u$2("div", { className: "flex items-center gap-1", children: u$2(
            ToggleSwitch,
            {
              checked: debug,
              onChange: (next) => {
                setDebug(next);
                Logger.setDebug(next);
              },
              ariaLabel: "Režim ladění"
            }
          ) })
        ] }),
u$2("div", { className: "text-token-text-tertiary my-1 text-xs", children: "Po zapnutí se budou zapisovat podrobnější protokoly pro diagnostiku automatického ukládání." })
      ] }) })
    ] });
    if (loading) return null;
    return u$2("div", { className: CHATGPT_MODAL_OVERLAY_CLASS, onClick: onClose, children: u$2("div", { className: CHATGPT_MODAL_GRID_CLASS, children: u$2("div", { className: `${CHATGPT_MODAL_BOX_CLASS} cgptx-settings-dialog`, onClick: (e2) => e2.stopPropagation(), children: u$2("div", { className: "cgptx-settings-shell", children: [
u$2(
        "div",
        {
          className: "bg-token-bg-elevated-secondary flex shrink-0 flex-row select-none [--end:right] [--start:left] max-md:overflow-x-auto max-md:border-b max-md:py-1.5 md:max-w-[210px] md:min-w-[180px] md:flex-col rtl:[--end:left] rtl:[--start:right] dark:bg-black/10 cgptx-settings-tablist",
          role: "tablist",
          "aria-orientation": "vertical",
          children: [
u$2("div", { className: "cgptx-settings-tab-close", children: u$2(
              "button",
              {
                type: "button",
                className: CHATGPT_SETTINGS_LEFT_CLOSE_BUTTON_CLASS,
                "aria-label": "Zavřít nastavení automatického ukládání",
                onClick: onClose,
                children: u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
u$2("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
u$2("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ] })
              }
            ) }),
u$2(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeTab === "general",
                "data-state": activeTab === "general" ? "active" : "inactive",
                className: SETTINGS_TAB_CLASS,
                onClick: () => setActiveTab("general"),
                children: "Obecné"
              }
            ),
u$2(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeTab === "storage",
                "data-state": activeTab === "storage" ? "active" : "inactive",
                className: SETTINGS_TAB_CLASS,
                onClick: () => setActiveTab("storage"),
                children: "Úložiště"
              }
            ),
u$2(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeTab === "advanced",
                "data-state": activeTab === "advanced" ? "active" : "inactive",
                className: SETTINGS_TAB_CLASS,
                onClick: () => setActiveTab("advanced"),
                children: "Pokročilé"
              }
            )
          ]
        }
      ),
u$2("div", { className: `${CHATGPT_PANEL_CLASS} cgptx-settings-panel`, role: "tabpanel", children: [
        activeTab === "general" && renderGeneralTab(),
        activeTab === "storage" && renderStorageTab(),
        activeTab === "advanced" && renderAdvancedTab()
      ] })
    ] }) }) }) });
  }
  var ch2 = {};
  var wk = (function(c2, id, msg, transfer, cb) {
    var w2 = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
      c2 + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: "text/javascript" }))));
    w2.onmessage = function(e2) {
      var d2 = e2.data, ed = d2.$e$;
      if (ed) {
        var err2 = new Error(ed[0]);
        err2["code"] = ed[1];
        err2.stack = ed[2];
        cb(err2, null);
      } else
        cb(null, d2);
    };
    w2.postMessage(msg, transfer);
    return w2;
  });
  var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
0,
    0,
0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b2 = new u16(31);
    for (var i = 0; i < 31; ++i) {
      b2[i] = start += 1 << eb[i - 1];
    }
    var r2 = new i32(b2[30]);
    for (var i = 1; i < 30; ++i) {
      for (var j2 = b2[i]; j2 < b2[i + 1]; ++j2) {
        r2[j2] = j2 - b2[i] << 5 | i;
      }
    }
    return { b: b2, r: r2 };
  };
  var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), revfd = _b.r;
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
    var x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var hMap = (function(cd, mb, r2) {
    var s2 = cd.length;
    var i = 0;
    var l2 = new u16(mb);
    for (; i < s2; ++i) {
      if (cd[i])
        ++l2[cd[i] - 1];
    }
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
      le[i] = le[i - 1] + l2[i - 1] << 1;
    }
    var co;
    if (r2) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i = 0; i < s2; ++i) {
        if (cd[i]) {
          var sv = i << 4 | cd[i];
          var r_1 = mb - cd[i];
          var v2 = le[cd[i] - 1]++ << r_1;
          for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
            co[rev[v2] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s2);
      for (i = 0; i < s2; ++i) {
        if (cd[i]) {
          co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
    flt[i] = 8;
  for (var i = 144; i < 256; ++i)
    flt[i] = 9;
  for (var i = 256; i < 280; ++i)
    flt[i] = 7;
  for (var i = 280; i < 288; ++i)
    flt[i] = 8;
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
  var flm = hMap(flt, 9, 0);
  var fdm = hMap(fdt, 5, 0);
  var shft = function(p2) {
    return (p2 + 7) / 8 | 0;
  };
  var slc = function(v2, s2, e2) {
    if (s2 == null || s2 < 0)
      s2 = 0;
    if (e2 == null || e2 > v2.length)
      e2 = v2.length;
    return new u8(v2.subarray(s2, e2));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
];
  var err = function(ind, msg, nt) {
    var e2 = new Error(msg || ec[ind]);
    e2.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e2, err);
    if (!nt)
      throw e2;
    return e2;
  };
  var wbits = function(d2, p2, v2) {
    v2 <<= p2 & 7;
    var o2 = p2 / 8 | 0;
    d2[o2] |= v2;
    d2[o2 + 1] |= v2 >> 8;
  };
  var wbits16 = function(d2, p2, v2) {
    v2 <<= p2 & 7;
    var o2 = p2 / 8 | 0;
    d2[o2] |= v2;
    d2[o2 + 1] |= v2 >> 8;
    d2[o2 + 2] |= v2 >> 16;
  };
  var hTree = function(d2, mb) {
    var t2 = [];
    for (var i = 0; i < d2.length; ++i) {
      if (d2[i])
        t2.push({ s: i, f: d2[i] });
    }
    var s2 = t2.length;
    var t22 = t2.slice();
    if (!s2)
      return { t: et, l: 0 };
    if (s2 == 1) {
      var v2 = new u8(t2[0].s + 1);
      v2[t2[0].s] = 1;
      return { t: v2, l: 1 };
    }
    t2.sort(function(a2, b2) {
      return a2.f - b2.f;
    });
    t2.push({ s: -1, f: 25001 });
    var l2 = t2[0], r2 = t2[1], i0 = 0, i1 = 1, i2 = 2;
    t2[0] = { s: -1, f: l2.f + r2.f, l: l2, r: r2 };
    while (i1 != s2 - 1) {
      l2 = t2[t2[i0].f < t2[i2].f ? i0++ : i2++];
      r2 = t2[i0 != i1 && t2[i0].f < t2[i2].f ? i0++ : i2++];
      t2[i1++] = { s: -1, f: l2.f + r2.f, l: l2, r: r2 };
    }
    var maxSym = t22[0].s;
    for (var i = 1; i < s2; ++i) {
      if (t22[i].s > maxSym)
        maxSym = t22[i].s;
    }
    var tr = new u16(maxSym + 1);
    var mbt = ln(t2[i1 - 1], tr, 0);
    if (mbt > mb) {
      var i = 0, dt = 0;
      var lft = mbt - mb, cst = 1 << lft;
      t22.sort(function(a2, b2) {
        return tr[b2.s] - tr[a2.s] || a2.f - b2.f;
      });
      for (; i < s2; ++i) {
        var i2_1 = t22[i].s;
        if (tr[i2_1] > mb) {
          dt += cst - (1 << mbt - tr[i2_1]);
          tr[i2_1] = mb;
        } else
          break;
      }
      dt >>= lft;
      while (dt > 0) {
        var i2_2 = t22[i].s;
        if (tr[i2_2] < mb)
          dt -= 1 << mb - tr[i2_2]++ - 1;
        else
          ++i;
      }
      for (; i >= 0 && dt; --i) {
        var i2_3 = t22[i].s;
        if (tr[i2_3] == mb) {
          --tr[i2_3];
          ++dt;
        }
      }
      mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
  };
  var ln = function(n2, l2, d2) {
    return n2.s == -1 ? Math.max(ln(n2.l, l2, d2 + 1), ln(n2.r, l2, d2 + 1)) : l2[n2.s] = d2;
  };
  var lc = function(c2) {
    var s2 = c2.length;
    while (s2 && !c2[--s2])
      ;
    var cl = new u16(++s2);
    var cli = 0, cln = c2[0], cls = 1;
    var w2 = function(v2) {
      cl[cli++] = v2;
    };
    for (var i = 1; i <= s2; ++i) {
      if (c2[i] == cln && i != s2)
        ++cls;
      else {
        if (!cln && cls > 2) {
          for (; cls > 138; cls -= 138)
            w2(32754);
          if (cls > 2) {
            w2(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
            cls = 0;
          }
        } else if (cls > 3) {
          w2(cln), --cls;
          for (; cls > 6; cls -= 6)
            w2(8304);
          if (cls > 2)
            w2(cls - 3 << 5 | 8208), cls = 0;
        }
        while (cls--)
          w2(cln);
        cls = 1;
        cln = c2[i];
      }
    }
    return { c: cl.subarray(0, cli), n: s2 };
  };
  var clen = function(cf, cl) {
    var l2 = 0;
    for (var i = 0; i < cl.length; ++i)
      l2 += cf[i] * cl[i];
    return l2;
  };
  var wfblk = function(out, pos, dat) {
    var s2 = dat.length;
    var o2 = shft(pos + 2);
    out[o2] = s2 & 255;
    out[o2 + 1] = s2 >> 8;
    out[o2 + 2] = out[o2] ^ 255;
    out[o2 + 3] = out[o2 + 1] ^ 255;
    for (var i = 0; i < s2; ++i)
      out[o2 + i + 4] = dat[i];
    return (o2 + 4 + s2) * 8;
  };
  var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p2) {
    wbits(out, p2++, final);
    ++lf[256];
    var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
    var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
      ++lcfreq[lclt[i] & 31];
    for (var i = 0; i < lcdt.length; ++i)
      ++lcfreq[lcdt[i] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
      ;
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
      return wfblk(out, p2, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p2, 1 + (dtlen < ftlen)), p2 += 2;
    if (dtlen < ftlen) {
      lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
      var llm = hMap(lct, mlcb, 0);
      wbits(out, p2, nlc - 257);
      wbits(out, p2 + 5, ndc - 1);
      wbits(out, p2 + 10, nlcc - 4);
      p2 += 14;
      for (var i = 0; i < nlcc; ++i)
        wbits(out, p2 + 3 * i, lct[clim[i]]);
      p2 += 3 * nlcc;
      var lcts = [lclt, lcdt];
      for (var it = 0; it < 2; ++it) {
        var clct = lcts[it];
        for (var i = 0; i < clct.length; ++i) {
          var len = clct[i] & 31;
          wbits(out, p2, llm[len]), p2 += lct[len];
          if (len > 15)
            wbits(out, p2, clct[i] >> 5 & 127), p2 += clct[i] >> 12;
        }
      }
    } else {
      lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
      var sym = syms[i];
      if (sym > 255) {
        var len = sym >> 18 & 31;
        wbits16(out, p2, lm[len + 257]), p2 += ll[len + 257];
        if (len > 7)
          wbits(out, p2, sym >> 23 & 31), p2 += fleb[len];
        var dst = sym & 31;
        wbits16(out, p2, dm[dst]), p2 += dl[dst];
        if (dst > 3)
          wbits16(out, p2, sym >> 5 & 8191), p2 += fdeb[dst];
      } else {
        wbits16(out, p2, lm[sym]), p2 += ll[sym];
      }
    }
    wbits16(out, p2, lm[256]);
    return p2 + ll[256];
  };
  var deo = new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var et = new u8(0);
  var dflt = function(dat, lvl, plvl, pre, post, st) {
    var s2 = st.z || dat.length;
    var o2 = new u8(pre + s2 + 5 * (1 + Math.ceil(s2 / 7e3)) + post);
    var w2 = o2.subarray(pre, o2.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
      if (pos)
        w2[0] = st.r >> 3;
      var opt = deo[lvl - 1];
      var n2 = opt >> 13, c2 = opt & 8191;
      var msk_1 = (1 << plvl) - 1;
      var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
      var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
      var hsh = function(i2) {
        return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
      };
      var syms = new i32(25e3);
      var lf = new u16(288), df = new u16(32);
      var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
      for (; i + 2 < s2; ++i) {
        var hv = hsh(i);
        var imod = i & 32767, pimod = head[hv];
        prev[imod] = pimod;
        head[hv] = imod;
        if (wi <= i) {
          var rem = s2 - i;
          if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
            pos = wblk(dat, w2, 0, syms, lf, df, eb, li, bs, i - bs, pos);
            li = lc_1 = eb = 0, bs = i;
            for (var j2 = 0; j2 < 286; ++j2)
              lf[j2] = 0;
            for (var j2 = 0; j2 < 30; ++j2)
              df[j2] = 0;
          }
          var l2 = 2, d2 = 0, ch_1 = c2, dif = imod - pimod & 32767;
          if (rem > 2 && hv == hsh(i - dif)) {
            var maxn = Math.min(n2, rem) - 1;
            var maxd = Math.min(32767, i);
            var ml = Math.min(258, rem);
            while (dif <= maxd && --ch_1 && imod != pimod) {
              if (dat[i + l2] == dat[i + l2 - dif]) {
                var nl = 0;
                for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                  ;
                if (nl > l2) {
                  l2 = nl, d2 = dif;
                  if (nl > maxn)
                    break;
                  var mmd = Math.min(dif, nl - 2);
                  var md = 0;
                  for (var j2 = 0; j2 < mmd; ++j2) {
                    var ti = i - dif + j2 & 32767;
                    var pti = prev[ti];
                    var cd = ti - pti & 32767;
                    if (cd > md)
                      md = cd, pimod = ti;
                  }
                }
              }
              imod = pimod, pimod = prev[imod];
              dif += imod - pimod & 32767;
            }
          }
          if (d2) {
            syms[li++] = 268435456 | revfl[l2] << 18 | revfd[d2];
            var lin = revfl[l2] & 31, din = revfd[d2] & 31;
            eb += fleb[lin] + fdeb[din];
            ++lf[257 + lin];
            ++df[din];
            wi = i + l2;
            ++lc_1;
          } else {
            syms[li++] = dat[i];
            ++lf[dat[i]];
          }
        }
      }
      for (i = Math.max(i, wi); i < s2; ++i) {
        syms[li++] = dat[i];
        ++lf[dat[i]];
      }
      pos = wblk(dat, w2, lst, syms, lf, df, eb, li, bs, i - bs, pos);
      if (!lst) {
        st.r = pos & 7 | w2[pos / 8 | 0] << 3;
        pos -= 7;
        st.h = head, st.p = prev, st.i = i, st.w = wi;
      }
    } else {
      for (var i = st.w || 0; i < s2 + lst; i += 65535) {
        var e2 = i + 65535;
        if (e2 >= s2) {
          w2[pos / 8 | 0] = lst;
          e2 = s2;
        }
        pos = wfblk(w2, pos + 1, dat.subarray(i, e2));
      }
      st.i = s2;
    }
    return slc(o2, 0, pre + shft(pos) + post);
  };
  var crct = (function() {
    var t2 = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
      var c2 = i, k2 = 9;
      while (--k2)
        c2 = (c2 & 1 && -306674912) ^ c2 >>> 1;
      t2[i] = c2;
    }
    return t2;
  })();
  var crc = function() {
    var c2 = -1;
    return {
      p: function(d2) {
        var cr = c2;
        for (var i = 0; i < d2.length; ++i)
          cr = crct[cr & 255 ^ d2[i]] ^ cr >>> 8;
        c2 = cr;
      },
      d: function() {
        return ~c2;
      }
    };
  };
  var dopt = function(dat, opt, pre, post, st) {
    if (!st) {
      st = { l: 1 };
      if (opt.dictionary) {
        var dict = opt.dictionary.subarray(-32768);
        var newDat = new u8(dict.length + dat.length);
        newDat.set(dict);
        newDat.set(dat, dict.length);
        dat = newDat;
        st.w = dict.length;
      }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
  };
  var mrg = function(a2, b2) {
    var o2 = {};
    for (var k2 in a2)
      o2[k2] = a2[k2];
    for (var k2 in b2)
      o2[k2] = b2[k2];
    return o2;
  };
  var wcln = function(fn2, fnStr, td2) {
    var dt = fn2();
    var st = fn2.toString();
    var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
    for (var i = 0; i < dt.length; ++i) {
      var v2 = dt[i], k2 = ks[i];
      if (typeof v2 == "function") {
        fnStr += ";" + k2 + "=";
        var st_1 = v2.toString();
        if (v2.prototype) {
          if (st_1.indexOf("[native code]") != -1) {
            var spInd = st_1.indexOf(" ", 8) + 1;
            fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
          } else {
            fnStr += st_1;
            for (var t2 in v2.prototype)
              fnStr += ";" + k2 + ".prototype." + t2 + "=" + v2.prototype[t2].toString();
          }
        } else
          fnStr += st_1;
      } else
        td2[k2] = v2;
    }
    return fnStr;
  };
  var ch = [];
  var cbfs = function(v2) {
    var tl = [];
    for (var k2 in v2) {
      if (v2[k2].buffer) {
        tl.push((v2[k2] = new v2[k2].constructor(v2[k2])).buffer);
      }
    }
    return tl;
  };
  var wrkr = function(fns, init, id, cb) {
    if (!ch[id]) {
      var fnStr = "", td_1 = {}, m2 = fns.length - 1;
      for (var i = 0; i < m2; ++i)
        fnStr = wcln(fns[i], fnStr, td_1);
      ch[id] = { c: wcln(fns[m2], fnStr, td_1), e: td_1 };
    }
    var td2 = mrg({}, ch[id].e);
    return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
  };
  var bDflt = function() {
    return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
  };
  var pbf = function(msg) {
    return postMessage(msg, [msg.buffer]);
  };
  var cbify = function(dat, opts, fns, init, id, cb) {
    var w2 = wrkr(fns, init, id, function(err2, dat2) {
      w2.terminate();
      cb(err2, dat2);
    });
    w2.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function() {
      w2.terminate();
    };
  };
  var wbytes = function(d2, b2, v2) {
    for (; v2; ++b2)
      d2[b2] = v2, v2 >>>= 8;
  };
  function deflate(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    return cbify(data, opts, [
      bDflt
    ], function(ev) {
      return pbf(deflateSync(ev.data[0], ev.data[1]));
    }, 0, cb);
  }
  function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
  }
  var fltn = function(d2, p2, t2, o2) {
    for (var k2 in d2) {
      var val = d2[k2], n2 = p2 + k2, op = o2;
      if (Array.isArray(val))
        op = mrg(o2, val[1]), val = val[0];
      if (val instanceof u8)
        t2[n2] = [val, op];
      else {
        t2[n2 += "/"] = [new u8(0), op];
        fltn(val, n2, t2, o2);
      }
    }
  };
  var te = typeof TextEncoder != "undefined" && new TextEncoder();
  var td = typeof TextDecoder != "undefined" && new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e2) {
  }
  function strToU8(str, latin1) {
    var i;
    if (te)
      return te.encode(str);
    var l2 = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w2 = function(v2) {
      ar[ai++] = v2;
    };
    for (var i = 0; i < l2; ++i) {
      if (ai + 5 > ar.length) {
        var n2 = new u8(ai + 8 + (l2 - i << 1));
        n2.set(ar);
        ar = n2;
      }
      var c2 = str.charCodeAt(i);
      if (c2 < 128 || latin1)
        w2(c2);
      else if (c2 < 2048)
        w2(192 | c2 >> 6), w2(128 | c2 & 63);
      else if (c2 > 55295 && c2 < 57344)
        c2 = 65536 + (c2 & 1023 << 10) | str.charCodeAt(++i) & 1023, w2(240 | c2 >> 18), w2(128 | c2 >> 12 & 63), w2(128 | c2 >> 6 & 63), w2(128 | c2 & 63);
      else
        w2(224 | c2 >> 12), w2(128 | c2 >> 6 & 63), w2(128 | c2 & 63);
    }
    return slc(ar, 0, ai);
  }
  var exfl = function(ex) {
    var le = 0;
    if (ex) {
      for (var k2 in ex) {
        var l2 = ex[k2].length;
        if (l2 > 65535)
          err(9);
        le += l2 + 4;
      }
    }
    return le;
  };
  var wzh = function(d2, b2, f2, fn2, u2, c2, ce, co) {
    var fl2 = fn2.length, ex = f2.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d2, b2, ce != null ? 33639248 : 67324752), b2 += 4;
    if (ce != null)
      d2[b2++] = 20, d2[b2++] = f2.os;
    d2[b2] = 20, b2 += 2;
    d2[b2++] = f2.flag << 1 | (c2 < 0 && 8), d2[b2++] = u2 && 8;
    d2[b2++] = f2.compression & 255, d2[b2++] = f2.compression >> 8;
    var dt = new Date(f2.mtime == null ? Date.now() : f2.mtime), y2 = dt.getFullYear() - 1980;
    if (y2 < 0 || y2 > 119)
      err(10);
    wbytes(d2, b2, y2 << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b2 += 4;
    if (c2 != -1) {
      wbytes(d2, b2, f2.crc);
      wbytes(d2, b2 + 4, c2 < 0 ? -c2 - 2 : c2);
      wbytes(d2, b2 + 8, f2.size);
    }
    wbytes(d2, b2 + 12, fl2);
    wbytes(d2, b2 + 14, exl), b2 += 16;
    if (ce != null) {
      wbytes(d2, b2, col);
      wbytes(d2, b2 + 6, f2.attrs);
      wbytes(d2, b2 + 10, ce), b2 += 14;
    }
    d2.set(fn2, b2);
    b2 += fl2;
    if (exl) {
      for (var k2 in ex) {
        var exf = ex[k2], l2 = exf.length;
        wbytes(d2, b2, +k2);
        wbytes(d2, b2 + 2, l2);
        d2.set(exf, b2 + 4), b2 += 4 + l2;
      }
    }
    if (col)
      d2.set(co, b2), b2 += col;
    return b2;
  };
  var wzf = function(o2, b2, c2, d2, e2) {
    wbytes(o2, b2, 101010256);
    wbytes(o2, b2 + 8, c2);
    wbytes(o2, b2 + 10, c2);
    wbytes(o2, b2 + 12, d2);
    wbytes(o2, b2 + 16, e2);
  };
  function zip(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    var r2 = {};
    fltn(data, "", r2, opts);
    var k2 = Object.keys(r2);
    var lft = k2.length, o2 = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function() {
      for (var i2 = 0; i2 < term.length; ++i2)
        term[i2]();
    };
    var cbd = function(a2, b2) {
      mt(function() {
        cb(a2, b2);
      });
    };
    mt(function() {
      cbd = cb;
    });
    var cbf = function() {
      var out = new u8(tot + 22), oe = o2, cdl = tot - o2;
      tot = 0;
      for (var i2 = 0; i2 < slft; ++i2) {
        var f2 = files[i2];
        try {
          var l2 = f2.c.length;
          wzh(out, tot, f2, f2.f, f2.u, l2);
          var badd = 30 + f2.f.length + exfl(f2.extra);
          var loc = tot + badd;
          out.set(f2.c, loc);
          wzh(out, o2, f2, f2.f, f2.u, l2, tot, f2.m), o2 += 16 + badd + (f2.m ? f2.m.length : 0), tot = loc + l2;
        } catch (e2) {
          return cbd(e2, null);
        }
      }
      wzf(out, o2, files.length, cdl, oe);
      cbd(null, out);
    };
    if (!lft)
      cbf();
    var _loop_1 = function(i2) {
      var fn2 = k2[i2];
      var _a2 = r2[fn2], file = _a2[0], p2 = _a2[1];
      var c2 = crc(), size = file.length;
      c2.p(file);
      var f2 = strToU8(fn2), s2 = f2.length;
      var com = p2.comment, m2 = com && strToU8(com), ms = m2 && m2.length;
      var exl = exfl(p2.extra);
      var compression = p2.level == 0 ? 0 : 8;
      var cbl = function(e2, d2) {
        if (e2) {
          tAll();
          cbd(e2, null);
        } else {
          var l2 = d2.length;
          files[i2] = mrg(p2, {
            size,
            crc: c2.d(),
            c: d2,
            f: f2,
            m: m2,
            u: s2 != fn2.length || m2 && com.length != ms,
            compression
          });
          o2 += 30 + s2 + exl + l2;
          tot += 76 + 2 * (s2 + exl) + (ms || 0) + l2;
          if (!--lft)
            cbf();
        }
      };
      if (s2 > 65535)
        cbl(err(11, 0, 1), null);
      if (!compression)
        cbl(null, file);
      else if (size < 16e4) {
        try {
          cbl(null, deflateSync(file, p2));
        } catch (e2) {
          cbl(e2, null);
        }
      } else
        term.push(deflate(file, p2, cbl));
    };
    for (var i = 0; i < slft; ++i) {
      _loop_1(i);
    }
    return tAll;
  }
  var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn2) {
    fn2();
  };
  function buildProjectFolderNames(projects) {
    const map = new Map();
    const counts = {};
    projects.forEach((p2) => {
      const base = sanitize(p2.projectName || p2.projectId || "project");
      counts[base] = (counts[base] || 0) + 1;
    });
    projects.forEach((p2) => {
      let baseName = sanitize(p2.projectName || p2.projectId || "project");
      if (counts[baseName] > 1) {
        const stamp = p2.createdAt ? p2.createdAt.replace(/[^\d]/g, "").slice(0, 14) : "";
        if (stamp) {
          const raw = p2.projectName || baseName;
          baseName = sanitize(`${raw}_${stamp}`);
        }
      }
      map.set(p2.projectId, baseName || "project");
    });
    return map;
  }
  function ensureFolder(tree, parts) {
    let current = tree;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    return current;
  }
  async function runBatchExport({
    tasks,
    projects,
    rootIds,
    includeAttachments = true,
    concurrency = BATCH_CONCURRENCY,
    progressCb,
    cancelRef
  }) {
    if (!tasks || !tasks.length) throw new Error("Seznam úloh je prázdný");
    const zipTree = {};
    const summary = {
      exported_at: ( new Date()).toISOString(),
      total_conversations: tasks.length,
      root: { count: rootIds.length, ids: rootIds },
      projects: (projects || []).map((p2) => ({
        projectId: p2.projectId,
        projectName: p2.projectName || "",
        createdAt: p2.createdAt || "",
        count: Array.isArray(p2.convs) ? p2.convs.length : 0
      })),
      failed: { conversations: [], attachments: [] }
    };
    const folderNameByProjectId = buildProjectFolderNames(projects || []);
    const results = await fetchConversationsBatch(tasks, concurrency, progressCb, cancelRef);
    if (cancelRef && cancelRef.cancel) throw new Error("Zrušeno uživatelem");
    let idxRoot = 0;
    const projSeq = {};
    for (let i = 0; i < tasks.length; i++) {
      if (cancelRef && cancelRef.cancel) throw new Error("Zrušeno uživatelem");
      const t2 = tasks[i];
      const data = results[i];
      if (!data) {
        summary.failed.conversations.push({
          id: t2.id,
          projectId: t2.projectId || "",
          reason: "prázdné"
        });
        continue;
      }
      const isProject = !!t2.projectId;
      const folderParts = [];
      if (isProject && t2.projectId) {
        const fname = folderNameByProjectId.get(t2.projectId) || sanitize(t2.projectId || "project");
        folderParts.push(fname);
        projSeq[t2.projectId] = (projSeq[t2.projectId] || 0) + 1;
        const seq = String(projSeq[t2.projectId]).padStart(3, "0");
        const title = sanitize(data?.title || "");
        const convFolderName = `${seq}_${title || "chat"}_${t2.id}`;
        folderParts.push(convFolderName);
      } else {
        idxRoot++;
        const seq = String(idxRoot).padStart(3, "0");
        const title = sanitize(data?.title || "");
        const convFolderName = `${seq}_${title || "chat"}_${t2.id}`;
        folderParts.push(convFolderName);
      }
      const convFolder = ensureFolder(zipTree, folderParts);
      convFolder["conversation.json"] = strToU8(JSON.stringify(data, null, 2));
      const convMeta = {
        id: data.conversation_id || t2.id,
        title: data.title || "",
        create_time: data.create_time,
        update_time: data.update_time,
        model_slug: data.default_model_slug,
        attachments: [],
        failed_attachments: []
      };
      if (includeAttachments) {
        const candidates = collectFileCandidates(data).map((x) => ({
          ...x,
          project_id: t2.projectId || ""
        }));
        if (candidates.length > 0) {
          if (!convFolder["attachments"]) {
            convFolder["attachments"] = {};
          }
          const attFolder = convFolder["attachments"];
          const usedNames = new Set();
          for (const c2 of candidates) {
            if (cancelRef && cancelRef.cancel) throw new Error("Zrušeno uživatelem");
            const pointerKey = c2.pointer || c2.file_id || "";
            const originalName = c2.meta && (c2.meta.name || c2.meta.file_name) || "";
            let finalName = "";
            try {
              const res = await downloadPointerOrFileAsBlob(c2);
              finalName = res.filename || `${sanitize(pointerKey) || "file"}.bin`;
              if (usedNames.has(finalName)) {
                let cnt = 2;
                while (usedNames.has(`${cnt}_${finalName}`)) cnt++;
                finalName = `${cnt}_${finalName}`;
              }
              usedNames.add(finalName);
              const buf = await res.blob.arrayBuffer();
              attFolder[finalName] = new Uint8Array(buf);
              convMeta.attachments.push({
                pointer: c2.pointer || "",
                file_id: c2.file_id || "",
                original_name: originalName,
                saved_as: finalName,
                size_bytes: c2.meta?.size_bytes || c2.meta?.size || c2.meta?.file_size || c2.meta?.file_size_bytes || null,
                mime: res.mime || c2.meta?.mime_type || "",
                source: c2.source || ""
              });
            } catch (e2) {
              const errorMsg = e2 && e2.message ? e2.message : String(e2);
              convMeta.failed_attachments.push({
                pointer: c2.pointer || "",
                file_id: c2.file_id || "",
                error: errorMsg
              });
              summary.failed.attachments.push({
                conversation_id: data.conversation_id || t2.id,
                project_id: t2.projectId || "",
                pointer: c2.pointer || c2.file_id || "",
                error: errorMsg
              });
            }
          }
        }
      }
      convFolder["metadata.json"] = strToU8(JSON.stringify(convMeta, null, 2));
      try {
        const htmlContent = generateHTML(data, convMeta.attachments);
        convFolder["conversation.html"] = strToU8(htmlContent);
      } catch (e2) {
        console.warn("Failed to generate HTML for", t2.id, e2);
      }
      if (progressCb) progressCb(80 + Math.round((i + 1) / tasks.length * 15), `Zpracování: ${i + 1}/${tasks.length}`);
    }
    zipTree["summary.json"] = strToU8(JSON.stringify(summary, null, 2));
    if (progressCb) progressCb(98, "Komprese…");
    return new Promise((resolve, reject) => {
      zip(zipTree, { level: 6, mem: 8 }, (err2, data) => {
        if (err2) {
          reject(err2);
        } else {
          resolve(new Blob([data], { type: "application/zip" }));
        }
      });
    });
  }
  function BatchExportDialog({ onClose }) {
    const loading = useSignal(true);
    const error = useSignal(null);
    const listData = useSignal(null);
    const groups = useSignal([]);
    const selectedSet = useSignal( new Set());
    const includeAttachments = useSignal(true);
    const exporting = useSignal(false);
    const progress = useSignal(null);
    const statusText2 = useSignal("Načítání seznamu chatů…");
    const cancelRef = A$2({ cancel: false });
    const makeKey = (projectId2, id) => `${projectId2 || "root"}::${id}`;
    const parseKey = (key) => {
      const idx = key.indexOf("::");
      const pid = key.slice(0, idx);
      const id = key.slice(idx + 2);
      return { id, projectId: pid === "root" ? null : pid };
    };
    y$2(() => {
      loadData();
    }, []);
    const loadData = async () => {
      try {
        const res = await collectAllConversationTasks((pct, text) => {
          progress.value = { pct, text };
        });
        listData.value = res;
        const newGroups = [];
        const rootsList = getRootsList(res);
        if (rootsList.length) {
          newGroups.push({ label: "Bez projektu", projectId: null, items: rootsList, collapsed: false });
        }
        (res.projects || []).forEach((p2) => {
          const convs = Array.isArray(p2.convs) ? p2.convs : [];
          newGroups.push({
            label: p2.projectName || p2.projectId || "Projekt bez názvu",
            projectId: p2.projectId,
            items: convs,
            collapsed: false
          });
        });
        groups.value = newGroups;
        const initialSet = new Set();
        rootsList.forEach((it) => initialSet.add(makeKey(null, it.id)));
        (res.projects || []).forEach((p2) => {
          (p2.convs || []).forEach((c2) => initialSet.add(makeKey(p2.projectId, c2.id)));
        });
        selectedSet.value = initialSet;
        loading.value = false;
        progress.value = null;
        statusText2.value = `Celkem ${newGroups.reduce((n2, g2) => n2 + g2.items.length, 0)} chatů, vybráno ${initialSet.size}`;
      } catch (e2) {
        console.error("[ChatGPT-Multimodal-Exporter] Načtení seznamu selhalo", e2);
        error.value = e2.message || String(e2);
        statusText2.value = "Načtení seznamu selhalo";
      }
    };
    const getRootsList = (data) => {
      if (data && Array.isArray(data.roots) && data.roots.length) return data.roots;
      if (data && Array.isArray(data.rootIds) && data.rootIds.length)
        return data.rootIds.map((id) => ({ id, title: id }));
      return [];
    };
    const toggleGroupCollapse = (idx) => {
      const newGroups = [...groups.value];
      newGroups[idx].collapsed = !newGroups[idx].collapsed;
      groups.value = newGroups;
    };
    const toggleGroupSelect = (group, checked) => {
      const newSet = new Set(selectedSet.value);
      const keys = group.items.map((it) => makeKey(group.projectId, it.id));
      if (checked) {
        keys.forEach((k2) => newSet.add(k2));
      } else {
        keys.forEach((k2) => newSet.delete(k2));
      }
      selectedSet.value = newSet;
      statusText2.value = `Vybráno ${newSet.size} chatů`;
    };
    const toggleItemSelect = (key) => {
      const newSet = new Set(selectedSet.value);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      selectedSet.value = newSet;
      statusText2.value = `Vybráno ${newSet.size} chatů`;
    };
    const toggleAll = () => {
      if (!listData.value) return;
      const allKeys = [];
      groups.value.forEach((g2) => g2.items.forEach((it) => allKeys.push(makeKey(g2.projectId, it.id))));
      const allChecked = allKeys.every((k2) => selectedSet.value.has(k2));
      const newSet = new Set(selectedSet.value);
      if (allChecked) {
        allKeys.forEach((k2) => newSet.delete(k2));
      } else {
        allKeys.forEach((k2) => newSet.add(k2));
      }
      selectedSet.value = newSet;
      statusText2.value = `Vybráno ${newSet.size} chatů`;
    };
    const startExport = async () => {
      if (!listData.value) return;
      const tasks = Array.from(selectedSet.value).map((k2) => parseKey(k2)).filter((t2) => !!t2.id);
      if (!tasks.length) {
        toast.error("Vyberte alespoň jeden chat");
        return;
      }
      cancelRef.current.cancel = false;
      exporting.value = true;
      statusText2.value = "Příprava exportu…";
      progress.value = { pct: 0, text: "Příprava" };
      const projectMapForTasks = new Map();
      (listData.value.projects || []).forEach((p2) => projectMapForTasks.set(p2.projectId, p2));
      const seenProj = new Set();
      const selectedProjects = [];
      tasks.forEach((t2) => {
        if (!t2.projectId) return;
        if (seenProj.has(t2.projectId)) return;
        seenProj.add(t2.projectId);
        const p2 = projectMapForTasks.get(t2.projectId);
        if (p2) selectedProjects.push(p2);
      });
      const selectedRootIds = tasks.filter((t2) => !t2.projectId).map((t2) => t2.id);
      try {
        const blob = await runBatchExport({
          tasks,
          projects: selectedProjects,
          rootIds: selectedRootIds,
          includeAttachments: includeAttachments.value,
          concurrency: BATCH_CONCURRENCY,
          progressCb: (pct, txt) => {
            progress.value = { pct, text: txt };
          },
          cancelRef: cancelRef.current
        });
        if (cancelRef.current.cancel) {
          statusText2.value = "Zrušeno";
          toast.info("Hromadný export byl zrušen");
          return;
        }
        const ts = ( new Date()).toISOString().replace(/[:.]/g, "-");
        saveBlob(blob, `chatgpt-batch-${ts}.zip`);
        progress.value = { pct: 100, text: "Hotovo" };
        statusText2.value = "Hotovo ✅ (ZIP byl stažen)";
        toast.success("Hromadný export dokončen");
      } catch (e2) {
        console.error("[ChatGPT-Multimodal-Exporter] Hromadný export selhal", e2);
        toast.error("Hromadný export selhal: " + (e2 && e2.message ? e2.message : e2));
        statusText2.value = "Selhalo";
      } finally {
        exporting.value = false;
        cancelRef.current.cancel = false;
      }
    };
    const handleStop = () => {
      cancelRef.current.cancel = true;
      statusText2.value = "Probíhá rušení…";
    };
    return u$2("div", { className: CHATGPT_MODAL_OVERLAY_CLASS, onClick: (e2) => e2.target === e2.currentTarget && onClose(), children: u$2("div", { className: CHATGPT_MODAL_GRID_CLASS, children: u$2("div", { className: CHATGPT_MODAL_BOX_CLASS, children: [
u$2("div", { className: CHATGPT_MODAL_HEADER_CLASS, children: [
u$2("div", { className: CHATGPT_MODAL_TITLE_CLASS, children: "Hromadný export chatů (JSON + přílohy)" }),
u$2("div", { className: "cgptx-modal-actions", children: [
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: toggleAll, disabled: exporting.value || loading.value, children: "Vybrat vše / obrátit výběr" }),
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: startExport, disabled: exporting.value || loading.value, children: "Spustit export" }),
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: handleStop, disabled: !exporting.value, children: "Zastavit" }),
u$2("button", { className: CHATGPT_SECONDARY_BUTTON_CLASS, onClick: onClose, children: "Zavřít" })
        ] })
      ] }),
u$2("div", { className: `${CHATGPT_PANEL_CLASS} cgptx-modal-panel`, children: [
u$2("div", { className: "cgptx-chip", children: statusText2.value }),
u$2("div", { className: "cgptx-modal-actions cgptx-modal-inline-actions", children: u$2(
          Checkbox,
          {
            checked: includeAttachments.value,
            onChange: (checked) => includeAttachments.value = checked,
            disabled: exporting.value,
            label: "Zahrnout přílohy (ZIP)"
          }
        ) }),
u$2("div", { className: "cgptx-list cgptx-list-dialog", children: [
          loading.value && u$2("div", { className: "cgptx-item cgptx-item-loading", children: progress.value ? u$2("div", { className: "cgptx-loading-wrap", children: [
u$2("div", { children: [
              progress.value.text,
              " (",
              Math.round(progress.value.pct),
              "%)"
            ] }),
u$2("div", { className: "cgptx-progress-track", children: u$2("div", { className: "cgptx-progress-bar", style: { width: `${progress.value.pct}%` } }) })
          ] }) : u$2("div", { children: "Načítání..." }) }),
          error.value && u$2("div", { className: "cgptx-item cgptx-item-error", children: error.value }),
          !loading.value && !error.value && groups.value.map((group, gIdx) => {
            const groupKeys = group.items.map((it) => makeKey(group.projectId, it.id));
            const checkedCount = groupKeys.filter((k2) => selectedSet.value.has(k2)).length;
            const isAll = checkedCount === groupKeys.length && groupKeys.length > 0;
            const isIndeterminate = checkedCount > 0 && checkedCount < groupKeys.length;
            return u$2("div", { className: "cgptx-group", children: [
u$2("div", { className: "cgptx-group-header", children: [
u$2(
                  Checkbox,
                  {
                    checked: isAll,
                    indeterminate: isIndeterminate,
                    onChange: (checked) => toggleGroupSelect(group, checked)
                  }
                ),
u$2(
                  "span",
                  {
                    className: "cgptx-arrow",
                    onClick: () => toggleGroupCollapse(gIdx),
                    children: group.collapsed ? "▶" : "▼"
                  }
                ),
u$2("div", { className: "group-title", onClick: () => toggleGroupCollapse(gIdx), children: group.label }),
u$2("div", { className: "group-count", children: [
                  group.items.length,
                  " chatů"
                ] })
              ] }),
u$2("div", { className: "cgptx-group-list", style: { display: group.collapsed ? "none" : "block" }, children: group.items.map((item) => {
                const key = makeKey(group.projectId, item.id);
                return u$2("div", { className: "cgptx-item", children: [
u$2(
                    Checkbox,
                    {
                      checked: selectedSet.value.has(key),
                      onChange: () => toggleItemSelect(key)
                    }
                  ),
u$2("div", {}),
u$2("div", { children: u$2("div", { className: "title", children: item.title || item.id }) })
                ] }, key);
              }) })
            ] }, gIdx);
          })
        ] }),
        !loading.value && progress.value && u$2("div", { className: "cgptx-progress-wrap", children: [
u$2("div", { className: "cgptx-progress-track", children: u$2("div", { className: "cgptx-progress-bar", style: { width: `${progress.value.pct}%` } }) }),
u$2("div", { className: "cgptx-progress-text", children: [
            progress.value.text,
            " (",
            Math.round(progress.value.pct),
            "%)"
          ] })
        ] })
      ] })
    ] }) }) });
  }
  function showBatchExportDialog() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    const close = () => {
      G$1(null, root);
      root.remove();
    };
    G$1(_$3(BatchExportDialog, {
      onClose: close
    }), root);
  }
  function ActionButtons({ autoSaveState }) {
    const [showSettings, setShowSettings] = d$1(false);
    const handleBatchExport = () => {
      showBatchExportDialog();
    };
    const handleAutoSaveClick = () => {
      setShowSettings(true);
    };
    const { status, nextRun, role, message, lastError } = autoSaveState;
    const isSaving = status === "saving" || status === "checking";
    const isError = status === "error";
    const isDisabled = status === "disabled";
    const isIdle = status === "idle";
    const [timeText, setTimeText] = d$1("");
    y$2(() => {
      if (!isIdle || !nextRun || isDisabled) {
        setTimeText("");
        return;
      }
      const update = () => {
        const diff = Math.max(0, Math.ceil((nextRun - Date.now()) / 1e3));
        if (diff > 60) {
          setTimeText(`${Math.round(diff / 60)}m`);
        } else {
          setTimeText(`${diff}s`);
        }
      };
      update();
      const timer = setInterval(update, 1e3);
      return () => clearInterval(timer);
    }, [nextRun, isIdle, isDisabled]);
    let tooltip = `Nastavení automatického ukládání
Stav: ${status}`;
    if (role !== "unknown") {
      tooltip += ` (${role === "leader" ? "Leader" : "Standby"})`;
    }
    if (message) tooltip += `
${message}`;
    if (lastError) tooltip += `
Error: ${lastError}`;
    if (isDisabled) tooltip = "Automatické ukládání vypnuto";
    let iconContent;
    let btnStyle = {};
    if (isDisabled) {
      btnStyle.color = "#9ca3af";
      iconContent = u$2("div", { style: { position: "relative", width: 16, height: 16 }, children: [
u$2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { opacity: 0.5 }, children: [
u$2("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
u$2("polyline", { points: "17 21 17 13 7 13 7 21" }),
u$2("polyline", { points: "7 3 7 8 15 8" })
        ] }),
u$2(
          "svg",
          {
            width: "10",
            height: "10",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: { position: "absolute", bottom: -2, right: -2, color: "#ef4444", background: "var(--main-surface-primary, #fff)", borderRadius: "50%" },
            children: [
u$2("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
u$2("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
            ]
          }
        )
      ] });
    } else if (isError) {
      btnStyle.color = "#ef4444";
      iconContent = u$2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
u$2("circle", { cx: "12", cy: "12", r: "10" }),
u$2("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
u$2("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] });
    } else if (isSaving) {
      btnStyle.color = "#3b82f6";
      iconContent = u$2("svg", { className: "busy", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
u$2("path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
u$2("path", { d: "M3 3v5h5" }),
u$2("path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }),
u$2("path", { d: "M16 21h5v-5" })
      ] });
    } else {
      btnStyle.color = "#10b981";
      iconContent = u$2("div", { style: { position: "relative", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }, children: [
u$2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
u$2("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
u$2("polyline", { points: "17 21 17 13 7 13 7 21" }),
u$2("polyline", { points: "7 3 7 8 15 8" })
        ] }),
        timeText && u$2("span", { style: {
          position: "absolute",
          bottom: -4,
          right: -6,
          background: "#10b981",
          color: "white",
          fontSize: "9px",
          padding: "0 2px",
          borderRadius: "4px",
          fontWeight: "bold",
          lineHeight: "1",
          transform: "scale(0.9)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
        }, children: timeText })
      ] });
    }
    return u$2(k$3, { children: [
      showSettings && u$2(
        AutoSaveSettings,
        {
          status: {
            lastRun: autoSaveState.lastRun,
            state: autoSaveState.status,
            message: autoSaveState.message
          },
          onClose: () => setShowSettings(false)
        }
      ),
u$2(
        "button",
        {
          id: "cgptx-mini-btn-batch",
          className: CHATGPT_ICON_BUTTON_CLASS,
          title: "Hromadný export",
          "aria-label": "Hromadný export",
          onClick: handleBatchExport,
          children: u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: u$2("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" }) })
        }
      ),
u$2("div", { style: { position: "relative", display: "flex", alignItems: "center" }, children: u$2(
        "button",
        {
          id: "cgptx-mini-btn-autosave",
          className: CHATGPT_ICON_BUTTON_CLASS,
          title: tooltip,
          "aria-label": "Nastavení automatického ukládání",
          onClick: handleAutoSaveClick,
          style: btnStyle,
          children: iconContent
        }
      ) }),
u$2("style", { children: `
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .cgptx-mini-btn svg.busy { animation: spin 1s linear infinite; }
            ` })
    ] });
  }
  function FloatingEntry({ collapsed = false }) {
    const { status, refreshCredStatus } = useCredentialStatus();
    const autoSaveState = useAutoSave();
    const [lastConvData, setLastConvData] = d$1(null);
    const updateCache = (data) => {
      setLastConvData(data);
    };
    y$2(() => {
      getRootHandle().then(async (h2) => {
        if (h2) {
          const storedEnabled = localStorage.getItem("chatgpt_exporter_autosave_enabled");
          const isEnabled = storedEnabled === null || storedEnabled === "true";
          if (!isEnabled) {
            console.log("AutoSave is disabled by user setting.");
            return;
          }
          const credReady = await Cred.ensureReady();
          if (credReady) {
            startAutoSaveLoop();
          } else {
            console.warn("AutoSave not started: User credentials not ready");
          }
        }
      });
    }, []);
    const isOk = status.hasToken && status.hasAcc;
    return u$2("div", { className: `cgptx-mini-wrap${collapsed ? " cgptx-mini-wrap-collapsed" : ""}`, children: [
u$2(StatusPanel, { status, isOk }),
      !collapsed && u$2("div", { className: "cgptx-mini-btn-row", children: [
u$2(
          ExportJsonButton,
          {
            refreshCredStatus,
            onDataFetched: updateCache
          }
        ),
u$2(
          DownloadFilesButton,
          {
            refreshCredStatus,
            cachedData: lastConvData,
            onDataFetched: updateCache
          }
        ),
u$2(ActionButtons, { autoSaveState })
      ] })
    ] });
  }
  function Toaster2() {
    return u$2(
      Toaster$1,
      {
        position: "top-center",
        richColors: true,
        toastOptions: {
          style: {
            background: "#fff",
            border: "1px solid #e5e7eb",
            color: "#374151",
            fontSize: "14px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          },
          className: "cgptx-toast"
        }
      }
    );
  }
  const TOASTER_ROOT_ID = "cgptx-toaster-root";
  const SIDEBAR_ROOT_ID = "cgptx-sidebar-root";
  const COLLAPSED_ANCHOR_CLASS = "cgptx-status-anchor";
  let sidebarObserver = null;
  let collapsedAnchor = null;
  let sidebarPollTimer = null;
  function isVisible(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (typeof el.checkVisibility === "function") {
      return el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    }
    return el.getClientRects().length > 0;
  }
  function setCollapsedAnchor(el) {
    if (collapsedAnchor && collapsedAnchor !== el) {
      collapsedAnchor.classList.remove(COLLAPSED_ANCHOR_CLASS);
    }
    collapsedAnchor = el;
    if (collapsedAnchor) {
      collapsedAnchor.classList.add(COLLAPSED_ANCHOR_CLASS);
    }
  }
  function findOpenSidebarButton() {
    const byTestId = document.querySelector('[data-testid="open-sidebar-button"]');
    if (isVisible(byTestId)) return byTestId;
    const btns = Array.from(document.querySelectorAll("button"));
    const found = btns.find((b2) => {
      const label = `${b2.getAttribute("aria-label") || ""} ${b2.getAttribute("title") || ""}`.toLowerCase();
      return (label.includes("open sidebar") || label.includes("otevřít postranní panel")) && isVisible(b2);
    });
    return found || null;
  }
  function ensureToasterMounted() {
    if (document.getElementById(TOASTER_ROOT_ID)) return;
    const toasterRoot = document.createElement("div");
    toasterRoot.id = TOASTER_ROOT_ID;
    document.body.appendChild(toasterRoot);
    G$1(_$3(Toaster2, null), toasterRoot);
  }
  function mountFloatingEntry() {
    const sidebarHeader = document.querySelector("#sidebar-header");
    const closeSidebarBtn = sidebarHeader?.querySelector('[data-testid="close-sidebar-button"]');
    const isExpanded = !!(sidebarHeader && isVisible(closeSidebarBtn));
    const openSidebarBtn = findOpenSidebarButton();
    const existingRoot = document.getElementById(SIDEBAR_ROOT_ID);
    if (!isExpanded && !openSidebarBtn) {
      if (existingRoot) {
        existingRoot.remove();
      }
      setCollapsedAnchor(null);
      return;
    }
    const mode = isExpanded ? "expanded" : "collapsed";
    const mountParent = mode === "expanded" ? sidebarHeader : openSidebarBtn?.parentElement || openSidebarBtn;
    if (mode === "collapsed") {
      setCollapsedAnchor(mountParent);
    } else {
      setCollapsedAnchor(null);
    }
    if (existingRoot && existingRoot.parentElement === mountParent && existingRoot.getAttribute("data-mode") === mode) {
      return;
    }
    if (existingRoot) {
      existingRoot.remove();
    }
    const root = document.createElement("div");
    root.id = SIDEBAR_ROOT_ID;
    root.setAttribute("data-mode", mode);
    if (mode === "expanded" && sidebarHeader) {
      const targetContainer = closeSidebarBtn?.closest("div.flex");
      const insertTarget = targetContainer && targetContainer.parentElement === sidebarHeader ? targetContainer : null;
      if (insertTarget) {
        sidebarHeader.insertBefore(root, insertTarget);
      } else {
        sidebarHeader.appendChild(root);
      }
      G$1(_$3(FloatingEntry, { collapsed: false }), root);
      return;
    }
    mountParent.appendChild(root);
    G$1(_$3(FloatingEntry, { collapsed: true }), root);
  }
  function mountUI() {
    if (!isHostOK()) return;
    ensureToasterMounted();
    mountFloatingEntry();
    if (sidebarObserver) return;
    sidebarObserver = new MutationObserver(() => {
      mountFloatingEntry();
    });
    sidebarObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    if (sidebarPollTimer === null) {
      sidebarPollTimer = window.setInterval(() => {
        mountFloatingEntry();
      }, 250);
    }
  }
  function boot() {
    if (!isHostOK()) return;
    if (document.readyState === "complete" || document.readyState === "interactive") {
      mountUI();
    } else {
      document.addEventListener("DOMContentLoaded", mountUI);
    }
  }
  boot();

})();