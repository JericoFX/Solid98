import { sharedConfig as N, createMemo as le, createRenderEffect as x, untrack as ne, mergeProps as m, splitProps as C, createComponent as w, Show as p, For as S, createUniqueId as q, createSignal as se, createEffect as ee, onCleanup as B, onMount as te } from "solid-js";
const re = [
  "allowfullscreen",
  "async",
  "alpha",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "adauctionheaders",
  "browsingtopics",
  "credentialless",
  "defaultchecked",
  "defaultmuted",
  "defaultselected",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback",
  "preservespitch",
  "shadowrootclonable",
  "shadowrootcustomelementregistry",
  "shadowrootdelegatesfocus",
  "shadowrootserializable",
  "sharedstoragewritable"
], oe = /* @__PURE__ */ new Set([
  "className",
  "value",
  "readOnly",
  "noValidate",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  "adAuctionHeaders",
  "allowFullscreen",
  "browsingTopics",
  "defaultChecked",
  "defaultMuted",
  "defaultSelected",
  "disablePictureInPicture",
  "disableRemotePlayback",
  "preservesPitch",
  "shadowRootClonable",
  "shadowRootCustomElementRegistry",
  "shadowRootDelegatesFocus",
  "shadowRootSerializable",
  "sharedStorageWritable",
  ...re
]), ae = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), ce = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), de = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  novalidate: {
    $: "noValidate",
    FORM: 1
  },
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  },
  adauctionheaders: {
    $: "adAuctionHeaders",
    IFRAME: 1
  },
  allowfullscreen: {
    $: "allowFullscreen",
    IFRAME: 1
  },
  browsingtopics: {
    $: "browsingTopics",
    IMG: 1
  },
  defaultchecked: {
    $: "defaultChecked",
    INPUT: 1
  },
  defaultmuted: {
    $: "defaultMuted",
    AUDIO: 1,
    VIDEO: 1
  },
  defaultselected: {
    $: "defaultSelected",
    OPTION: 1
  },
  disablepictureinpicture: {
    $: "disablePictureInPicture",
    VIDEO: 1
  },
  disableremoteplayback: {
    $: "disableRemotePlayback",
    AUDIO: 1,
    VIDEO: 1
  },
  preservespitch: {
    $: "preservesPitch",
    AUDIO: 1,
    VIDEO: 1
  },
  shadowrootclonable: {
    $: "shadowRootClonable",
    TEMPLATE: 1
  },
  shadowrootdelegatesfocus: {
    $: "shadowRootDelegatesFocus",
    TEMPLATE: 1
  },
  shadowrootserializable: {
    $: "shadowRootSerializable",
    TEMPLATE: 1
  },
  sharedstoragewritable: {
    $: "sharedStorageWritable",
    IFRAME: 1,
    IMG: 1
  }
});
function fe(i, t) {
  const e = de[i];
  return typeof e == "object" ? e[t] ? e.$ : void 0 : e;
}
const ue = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), G = (i) => le(() => i());
function he(i, t, e) {
  let s = e.length, l = t.length, n = s, a = 0, r = 0, o = t[l - 1].nextSibling, d = null;
  for (; a < l || r < n; ) {
    if (t[a] === e[r]) {
      a++, r++;
      continue;
    }
    for (; t[l - 1] === e[n - 1]; )
      l--, n--;
    if (l === a) {
      const c = n < s ? r ? e[r - 1].nextSibling : e[n - r] : o;
      for (; r < n; ) i.insertBefore(e[r++], c);
    } else if (n === r)
      for (; a < l; )
        (!d || !d.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === e[n - 1] && e[r] === t[l - 1]) {
      const c = t[--l].nextSibling;
      i.insertBefore(e[r++], t[a++].nextSibling), i.insertBefore(e[--n], c), t[l] = e[n];
    } else {
      if (!d) {
        d = /* @__PURE__ */ new Map();
        let g = r;
        for (; g < n; ) d.set(e[g], g++);
      }
      const c = d.get(t[a]);
      if (c != null)
        if (r < c && c < n) {
          let g = a, u = 1, h;
          for (; ++g < l && g < n && !((h = d.get(t[g])) == null || h !== c + u); )
            u++;
          if (u > c - r) {
            const I = t[a];
            for (; r < c; ) i.insertBefore(e[r++], I);
          } else i.replaceChild(e[r++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const U = "_$DX_DELEGATE";
function b(i, t, e, s) {
  let l;
  const n = () => {
    const r = document.createElement("template");
    return r.innerHTML = i, r.content.firstChild;
  }, a = () => (l || (l = n())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function z(i, t = window.document) {
  const e = t[U] || (t[U] = /* @__PURE__ */ new Set());
  for (let s = 0, l = i.length; s < l; s++) {
    const n = i[s];
    e.has(n) || (e.add(n), t.addEventListener(n, ye));
  }
}
function A(i, t, e) {
  L(i) || (e == null ? i.removeAttribute(t) : i.setAttribute(t, e));
}
function ge(i, t, e) {
  L(i) || (e ? i.setAttribute(t, "") : i.removeAttribute(t));
}
function P(i, t) {
  L(i) || (t == null ? i.removeAttribute("class") : i.className = t);
}
function Z(i, t, e, s) {
  if (s)
    Array.isArray(e) ? (i[`$$${t}`] = e[0], i[`$$${t}Data`] = e[1]) : i[`$$${t}`] = e;
  else if (Array.isArray(e)) {
    const l = e[0];
    i.addEventListener(t, e[0] = (n) => l.call(i, e[1], n));
  } else i.addEventListener(t, e, typeof e != "function" && e);
}
function be(i, t, e = {}) {
  const s = Object.keys(t || {}), l = Object.keys(e);
  let n, a;
  for (n = 0, a = l.length; n < a; n++) {
    const r = l[n];
    !r || r === "undefined" || t[r] || (X(i, r, !1), delete e[r]);
  }
  for (n = 0, a = s.length; n < a; n++) {
    const r = s[n], o = !!t[r];
    !r || r === "undefined" || e[r] === o || !o || (X(i, r, !0), e[r] = o);
  }
  return e;
}
function we(i, t, e) {
  if (!t) return e ? A(i, "style") : t;
  const s = i.style;
  if (typeof t == "string") return s.cssText = t;
  typeof e == "string" && (s.cssText = e = void 0), e || (e = {}), t || (t = {});
  let l, n;
  for (n in e)
    t[n] == null && s.removeProperty(n), delete e[n];
  for (n in t)
    l = t[n], l !== e[n] && (s.setProperty(n, l), e[n] = l);
  return e;
}
function y(i, t, e) {
  e != null ? i.style.setProperty(t, e) : i.style.removeProperty(t);
}
function M(i, t = {}, e, s) {
  const l = {};
  return s || x(() => l.children = H(i, t.children, l.children)), x(() => typeof t.ref == "function" && j(t.ref, i)), x(() => me(i, t, e, !0, l, !0)), l;
}
function j(i, t, e) {
  return ne(() => i(t, e));
}
function f(i, t, e, s) {
  if (e !== void 0 && !s && (s = []), typeof t != "function") return H(i, t, s, e);
  x((l) => H(i, t(), l, e), s);
}
function me(i, t, e, s, l = {}, n = !1) {
  t || (t = {});
  for (const a in l)
    if (!(a in t)) {
      if (a === "children") continue;
      l[a] = F(i, a, null, l[a], e, n, t);
    }
  for (const a in t) {
    if (a === "children")
      continue;
    const r = t[a];
    l[a] = F(i, a, r, l[a], e, n, t);
  }
}
function L(i) {
  return !!N.context && !N.done && (!i || i.isConnected);
}
function Ie(i) {
  return i.toLowerCase().replace(/-([a-z])/g, (t, e) => e.toUpperCase());
}
function X(i, t, e) {
  const s = t.trim().split(/\s+/);
  for (let l = 0, n = s.length; l < n; l++) i.classList.toggle(s[l], e);
}
function F(i, t, e, s, l, n, a) {
  let r, o, d, c, g;
  if (t === "style") return we(i, e, s);
  if (t === "classList") return be(i, e, s);
  if (e === s) return s;
  if (t === "ref")
    n || e(i);
  else if (t.slice(0, 3) === "on:") {
    const u = t.slice(3);
    s && i.removeEventListener(u, s, typeof s != "function" && s), e && i.addEventListener(u, e, typeof e != "function" && e);
  } else if (t.slice(0, 10) === "oncapture:") {
    const u = t.slice(10);
    s && i.removeEventListener(u, s, !0), e && i.addEventListener(u, e, !0);
  } else if (t.slice(0, 2) === "on") {
    const u = t.slice(2).toLowerCase(), h = ue.has(u);
    if (!h && s) {
      const I = Array.isArray(s) ? s[0] : s;
      i.removeEventListener(u, I);
    }
    (h || e) && (Z(i, u, e, h), h && z([u]));
  } else if (t.slice(0, 5) === "attr:")
    A(i, t.slice(5), e);
  else if (t.slice(0, 5) === "bool:")
    ge(i, t.slice(5), e);
  else if ((g = t.slice(0, 5) === "prop:") || (d = ae.has(t)) || (c = fe(t, i.tagName)) || (o = oe.has(t)) || (r = i.nodeName.includes("-") || "is" in a)) {
    if (g)
      t = t.slice(5), o = !0;
    else if (L(i)) return e;
    t === "class" || t === "className" ? P(i, e) : r && !o && !d ? i[Ie(t)] = e : i[c || t] = e;
  } else
    A(i, ce[t] || t, e);
  return e;
}
function ye(i) {
  if (N.registry && N.events && N.events.find(([o, d]) => d === i))
    return;
  let t = i.target;
  const e = `$$${i.type}`, s = i.target, l = i.currentTarget, n = (o) => Object.defineProperty(i, "target", {
    configurable: !0,
    value: o
  }), a = () => {
    const o = t[e];
    if (o && !t.disabled) {
      const d = t[`${e}Data`];
      if (d !== void 0 ? o.call(t, d, i) : o.call(t, i), i.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(i.target) && n(t.host), !0;
  }, r = () => {
    for (; a() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(i, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), N.registry && !N.done && (N.done = _$HY.done = !0), i.composedPath) {
    const o = i.composedPath();
    n(o[0]);
    for (let d = 0; d < o.length - 2 && (t = o[d], !!a()); d++) {
      if (t._$host) {
        t = t._$host, r();
        break;
      }
      if (t.parentNode === l)
        break;
    }
  } else r();
  n(s);
}
function H(i, t, e, s, l) {
  const n = L(i);
  if (n) {
    !e && (e = [...i.childNodes]);
    let o = [];
    for (let d = 0; d < e.length; d++) {
      const c = e[d];
      c.nodeType === 8 && c.data.slice(0, 2) === "!$" ? c.remove() : o.push(c);
    }
    e = o;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const a = typeof t, r = s !== void 0;
  if (i = r && e[0] && e[0].parentNode || i, a === "string" || a === "number") {
    if (n || a === "number" && (t = t.toString(), t === e))
      return e;
    if (r) {
      let o = e[0];
      o && o.nodeType === 3 ? o.data !== t && (o.data = t) : o = document.createTextNode(t), e = R(i, e, s, o);
    } else
      e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  } else if (t == null || a === "boolean") {
    if (n) return e;
    e = R(i, e, s);
  } else {
    if (a === "function")
      return x(() => {
        let o = t();
        for (; typeof o == "function"; ) o = o();
        e = H(i, o, e, s);
      }), () => e;
    if (Array.isArray(t)) {
      const o = [], d = e && Array.isArray(e);
      if (O(o, t, e, l))
        return x(() => e = H(i, o, e, s, !0)), () => e;
      if (n) {
        if (!o.length) return e;
        if (s === void 0) return e = [...i.childNodes];
        let c = o[0];
        if (c.parentNode !== i) return e;
        const g = [c];
        for (; (c = c.nextSibling) !== s; ) g.push(c);
        return e = g;
      }
      if (o.length === 0) {
        if (e = R(i, e, s), r) return e;
      } else d ? e.length === 0 ? J(i, o, s) : he(i, e, o) : (e && R(i), J(i, o));
      e = o;
    } else if (t.nodeType) {
      if (n && t.parentNode) return e = r ? [t] : t;
      if (Array.isArray(e)) {
        if (r) return e = R(i, e, s, t);
        R(i, e, null, t);
      } else e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild);
      e = t;
    }
  }
  return e;
}
function O(i, t, e, s) {
  let l = !1;
  for (let n = 0, a = t.length; n < a; n++) {
    let r = t[n], o = e && e[i.length], d;
    if (!(r == null || r === !0 || r === !1)) if ((d = typeof r) == "object" && r.nodeType)
      i.push(r);
    else if (Array.isArray(r))
      l = O(i, r, o) || l;
    else if (d === "function")
      if (s) {
        for (; typeof r == "function"; ) r = r();
        l = O(i, Array.isArray(r) ? r : [r], Array.isArray(o) ? o : [o]) || l;
      } else
        i.push(r), l = !0;
    else {
      const c = String(r);
      o && o.nodeType === 3 && o.data === c ? i.push(o) : i.push(document.createTextNode(c));
    }
  }
  return l;
}
function J(i, t, e = null) {
  for (let s = 0, l = t.length; s < l; s++) i.insertBefore(t[s], e);
}
function R(i, t, e, s) {
  if (e === void 0) return i.textContent = "";
  const l = s || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let a = t.length - 1; a >= 0; a--) {
      const r = t[a];
      if (l !== r) {
        const o = r.parentNode === i;
        !n && !a ? o ? i.replaceChild(l, r) : i.insertBefore(l, e) : o && r.remove();
      } else n = !0;
    }
  } else i.insertBefore(l, e);
  return [l];
}
function ie(i) {
  var t, e, s = "";
  if (typeof i == "string" || typeof i == "number") s += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var l = i.length;
    for (t = 0; t < l; t++) i[t] && (e = ie(i[t])) && (s && (s += " "), s += e);
  } else for (e in i) i[e] && (s && (s += " "), s += e);
  return s;
}
function $e() {
  for (var i, t, e = 0, s = "", l = arguments.length; e < l; e++) (i = arguments[e]) && (t = ie(i)) && (s && (s += " "), s += t);
  return s;
}
function v(...i) {
  return $e(i);
}
var pe = /* @__PURE__ */ b("<button aria-label=Help class=help>"), ve = /* @__PURE__ */ b("<button aria-label=Minimize class=minimize>"), Ce = /* @__PURE__ */ b("<button aria-label=Maximize class=maximize>"), Me = /* @__PURE__ */ b("<button aria-label=Close class=close>"), xe = /* @__PURE__ */ b("<div><div class=title-bar-text></div><div class=title-bar-controls>");
function ke(i) {
  const t = m({
    active: !0,
    showMinimize: !0,
    showMaximize: !0,
    showClose: !0,
    showHelp: !1
  }, i), [e, s] = C(t, ["title", "active", "showMinimize", "showMaximize", "showClose", "showHelp", "onClose", "onMinimize", "onMaximize", "onRestore", "onHelp", "class", "children"]);
  return (() => {
    var l = xe(), n = l.firstChild, a = n.nextSibling;
    return M(l, m({
      get class() {
        return v("title-bar", !e.active && "inactive", e.class);
      }
    }, s), !1, !0), f(n, () => e.title || e.children), f(a, w(p, {
      get when() {
        return e.showHelp;
      },
      get children() {
        var r = pe();
        return Z(r, "click", e.onHelp, !0), r;
      }
    }), null), f(a, w(p, {
      get when() {
        return e.showMinimize;
      },
      get children() {
        var r = ve();
        return Z(r, "click", e.onMinimize, !0), r;
      }
    }), null), f(a, w(p, {
      get when() {
        return e.showMaximize;
      },
      get children() {
        var r = Ce();
        return Z(r, "click", e.onMaximize, !0), r;
      }
    }), null), f(a, w(p, {
      get when() {
        return e.showClose;
      },
      get children() {
        var r = Me();
        return Z(r, "click", e.onClose, !0), r;
      }
    }), null), l;
  })();
}
z(["click"]);
var _e = /* @__PURE__ */ b("<div><div class=window-body>");
function nt(i) {
  const t = m({
    active: !0,
    resizable: !1
  }, i), [e, s] = C(t, ["title", "active", "resizable", "showMinimize", "showMaximize", "showClose", "showHelp", "onClose", "onMinimize", "onMaximize", "onRestore", "onHelp", "class", "children"]);
  return (() => {
    var l = _e(), n = l.firstChild;
    return M(l, m({
      get class() {
        return v("window", !e.active && "inactive", e.class);
      }
    }, s), !1, !0), f(l, (() => {
      var a = G(() => !!e.title);
      return () => a() && w(ke, {
        get title() {
          return e.title;
        },
        get active() {
          return e.active;
        },
        get showMinimize() {
          return e.showMinimize;
        },
        get showMaximize() {
          return e.showMaximize;
        },
        get showClose() {
          return e.showClose;
        },
        get showHelp() {
          return e.showHelp;
        },
        get onClose() {
          return e.onClose;
        },
        get onMinimize() {
          return e.onMinimize;
        },
        get onMaximize() {
          return e.onMaximize;
        },
        get onRestore() {
          return e.onRestore;
        },
        get onHelp() {
          return e.onHelp;
        }
      });
    })(), n), f(n, () => e.children), l;
  })();
}
var Ae = /* @__PURE__ */ b("<button>");
function st(i) {
  const t = m({
    variant: "normal"
  }, i), [e, s] = C(t, ["variant", "disabled", "class", "children"]);
  return (() => {
    var l = Ae();
    return M(l, m({
      get class() {
        return v(e.variant === "default" && "default", e.disabled && "disabled", e.class);
      },
      get disabled() {
        return e.disabled;
      }
    }, s), !1, !0), f(l, () => e.children), l;
  })();
}
var Q = /* @__PURE__ */ b("<div class=status-bar-field>"), De = /* @__PURE__ */ b("<div>");
function rt(i) {
  const t = m({
    fields: []
  }, i), [e, s] = C(t, ["fields", "class", "children"]);
  return (() => {
    var l = De();
    return M(l, m({
      get class() {
        return v("status-bar", e.class);
      }
    }, s), !1, !0), f(l, w(p, {
      get when() {
        return G(() => !!e.fields)() && e.fields.length > 0;
      },
      get children() {
        return w(S, {
          get each() {
            return e.fields;
          },
          children: (n) => (() => {
            var a = Q();
            return f(a, n), a;
          })()
        });
      }
    }), null), f(l, w(p, {
      get when() {
        return !e.fields || e.fields.length === 0;
      },
      get children() {
        var n = Q();
        return f(n, () => e.children), n;
      }
    }), null), l;
  })();
}
var Ne = /* @__PURE__ */ b("<div>");
function ot(i) {
  const t = m({
    stacked: !1
  }, i), [e, s] = C(t, ["stacked", "class", "children"]);
  return (() => {
    var l = Ne();
    return M(l, m({
      get class() {
        return v(e.stacked ? "field-row-stacked" : "field-row", e.class);
      }
    }, s), !1, !0), f(l, () => e.children), l;
  })();
}
var Te = /* @__PURE__ */ b("<input type=checkbox>"), Se = /* @__PURE__ */ b("<label>");
function at(i) {
  const [t, e] = C(i, ["label", "class", "id"]), s = q(), l = t.id || s;
  return [(() => {
    var n = Te();
    return A(n, "id", l), M(n, m({
      get class() {
        return t.class;
      }
    }, e), !1, !1), n;
  })(), w(p, {
    get when() {
      return t.label;
    },
    get children() {
      var n = Se();
      return A(n, "for", l), f(n, () => t.label), n;
    }
  })];
}
var ze = /* @__PURE__ */ b("<input type=radio>"), Re = /* @__PURE__ */ b("<label>");
function ct(i) {
  const [t, e] = C(i, ["label", "class", "id"]), s = q(), l = t.id || s;
  return [(() => {
    var n = ze();
    return A(n, "id", l), M(n, m({
      get class() {
        return t.class;
      }
    }, e), !1, !1), n;
  })(), w(p, {
    get when() {
      return t.label;
    },
    get children() {
      var n = Re();
      return A(n, "for", l), f(n, () => t.label), n;
    }
  })];
}
var Ze = /* @__PURE__ */ b("<select>"), Pe = /* @__PURE__ */ b("<option>");
function dt(i) {
  const t = m({
    options: []
  }, i), [e, s] = C(t, ["options", "class", "children"]);
  return (() => {
    var l = Ze();
    return M(l, m({
      get class() {
        return v(e.class);
      }
    }, s), !1, !0), f(l, w(p, {
      get when() {
        return G(() => !!e.options)() && e.options.length > 0;
      },
      get children() {
        return w(S, {
          get each() {
            return e.options;
          },
          children: (n) => (() => {
            var a = Pe();
            return f(a, () => n.label), x(() => a.selected = n.selected), x(() => a.value = n.value), a;
          })()
        });
      }
    }), null), f(l, w(p, {
      get when() {
        return !e.options || e.options.length === 0;
      },
      get children() {
        return e.children;
      }
    }), null), l;
  })();
}
var Ge = /* @__PURE__ */ b("<input type=range>");
function ft(i) {
  const t = m({
    vertical: !1,
    boxIndicator: !1,
    min: 0,
    max: 100,
    step: 1
  }, i), [e, s] = C(t, ["vertical", "boxIndicator", "class"]);
  return (() => {
    var l = Ge();
    return M(l, m({
      get class() {
        return v(e.boxIndicator && "has-box-indicator", e.vertical && "is-vertical", e.class);
      }
    }, s), !1, !1), l;
  })();
}
var Ee = /* @__PURE__ */ b("<div><div class=progress-indicator-bar>");
function ut(i) {
  const t = m({
    value: 0,
    max: 100,
    segmented: !1
  }, i), [e, s] = C(t, ["value", "max", "segmented", "class", "children"]);
  return (() => {
    var l = Ee(), n = l.firstChild;
    return M(l, m({
      get class() {
        return v("progress-indicator", e.segmented && "segmented", e.class);
      }
    }, s), !1, !0), f(l, () => e.children, null), x((a) => y(n, "width", `${Math.min(100, Math.max(0, e.value / e.max * 100))}%`)), l;
  })();
}
var je = /* @__PURE__ */ b("<div>");
function ht(i) {
  const t = m({
    interactive: !1
  }, i), [e, s] = C(t, ["interactive", "class", "children"]);
  return (() => {
    var l = je();
    return M(l, m({
      get class() {
        return v("sunken-panel", e.interactive && "interactive", e.class);
      }
    }, s), !1, !0), f(l, () => e.children), l;
  })();
}
var He = /* @__PURE__ */ b("<li><details><summary><span></span></summary><ul>"), Le = /* @__PURE__ */ b("<li><a href=#>"), Be = /* @__PURE__ */ b("<ul>");
function gt(i) {
  const t = m({
    data: []
  }, i), [e, s] = C(t, ["data", "class", "children", "onNodeClick", "onNodeDoubleClick"]), l = (n) => {
    const [a, r] = se(n.node.expanded ?? !1), o = n.node.children && n.node.children.length > 0, d = (u) => {
      u.preventDefault(), o && r(!a());
    }, c = (u) => {
      u.preventDefault(), u.stopPropagation(), e.onNodeClick && e.onNodeClick(n.node);
    }, g = (u) => {
      u.preventDefault(), u.stopPropagation(), e.onNodeDoubleClick && e.onNodeDoubleClick(n.node);
    };
    return o ? (() => {
      var u = He(), h = u.firstChild, I = h.firstChild, $ = I.firstChild, k = I.nextSibling;
      return I.$$dblclick = g, I.$$click = d, $.$$dblclick = g, $.$$click = c, y($, "cursor", "pointer"), f($, () => n.node.label), f(k, w(S, {
        get each() {
          return n.node.children;
        },
        children: (_) => w(l, {
          node: _
        })
      })), x((_) => {
        var T = a(), E = v(n.node.selected && "selected");
        return T !== _.e && (h.open = _.e = T), E !== _.t && P(I, _.t = E), _;
      }, {
        e: void 0,
        t: void 0
      }), u;
    })() : (() => {
      var u = Le(), h = u.firstChild;
      return h.$$dblclick = g, h.$$click = c, f(h, () => n.node.label), x(() => P(h, v(n.node.selected && "selected"))), u;
    })();
  };
  return (() => {
    var n = Be();
    return M(n, m({
      get class() {
        return v("tree-view", e.class);
      }
    }, s), !1, !0), f(n, w(p, {
      get when() {
        return G(() => !!e.data)() && e.data.length > 0;
      },
      get children() {
        return w(S, {
          get each() {
            return e.data;
          },
          children: (a) => w(l, {
            node: a,
            isRoot: !0
          })
        });
      }
    }), null), f(n, w(p, {
      get when() {
        return !e.data || e.data.length === 0;
      },
      get children() {
        return e.children;
      }
    }), null), n;
  })();
}
z(["click", "dblclick"]);
var Oe = /* @__PURE__ */ b("<menu role=tablist>"), We = /* @__PURE__ */ b("<li role=tab><a href=#tabs>");
function bt(i) {
  const t = m({
    multirows: !1
  }, i), [e, s] = C(t, ["multirows", "selectedTab", "onTabSelect", "class", "children"]);
  return (() => {
    var l = Oe();
    return M(l, m({
      get class() {
        return v(e.multirows && "multirows", e.class);
      }
    }, s), !1, !0), f(l, () => e.children), l;
  })();
}
function wt(i) {
  const [t, e] = C(i, ["id", "label", "selected", "onClick", "class"]);
  return (() => {
    var s = We(), l = s.firstChild;
    return M(s, m({
      get "aria-selected"() {
        return t.selected;
      },
      get class() {
        return t.class;
      }
    }, e), !1, !0), l.$$click = (n) => {
      n.preventDefault(), t.onClick?.(t.id);
    }, f(l, () => t.label), s;
  })();
}
z(["click"]);
var Ye = /* @__PURE__ */ b("<div class=title-bar-controls><button aria-label=Close>"), Ve = /* @__PURE__ */ b("<div class=title-bar><div class=title-bar-text>"), Ke = /* @__PURE__ */ b('<div class=modal-overlay style="background-color:rgba(0, 0, 0, 0.5);align-items:center;justify-content:center;z-index:1000"><div><div class=window-body>');
function mt(i) {
  const t = m({
    open: !1,
    showCloseButton: !0,
    width: "auto",
    height: "auto"
  }, i), [e, s] = C(t, ["open", "title", "onClose", "children", "class", "showCloseButton", "width", "height"]);
  let l, n;
  ee(() => {
    e.open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
  }), B(() => {
    document.body.style.overflow = "";
  });
  const a = (o) => {
    o.target === n && e.onClose && e.onClose();
  }, r = (o) => {
    o.key === "Escape" && e.onClose && e.onClose();
  };
  return te(() => {
    document.addEventListener("keydown", r), B(() => {
      document.removeEventListener("keydown", r);
    });
  }), w(p, {
    get when() {
      return e.open;
    },
    get children() {
      var o = Ke(), d = o.firstChild, c = d.firstChild;
      o.$$click = a;
      var g = n;
      typeof g == "function" ? j(g, o) : n = o, y(o, "position", "fixed"), y(o, "top", "0"), y(o, "left", "0"), y(o, "right", "0"), y(o, "bottom", "0"), y(o, "display", "flex"), d.$$click = (h) => h.stopPropagation();
      var u = l;
      return typeof u == "function" ? j(u, d) : l = d, M(d, m({
        get class() {
          return v("window", "modal-window", e.class);
        },
        get style() {
          return {
            "max-width": "90vw",
            "max-height": "90vh",
            width: typeof e.width == "number" ? `${e.width}px` : e.width,
            height: typeof e.height == "number" ? `${e.height}px` : e.height,
            overflow: "auto"
          };
        }
      }, s), !1, !0), f(d, w(p, {
        get when() {
          return e.title;
        },
        get children() {
          var h = Ve(), I = h.firstChild;
          return f(I, () => e.title), f(h, w(p, {
            get when() {
              return e.showCloseButton;
            },
            get children() {
              var $ = Ye(), k = $.firstChild;
              return Z(k, "click", e.onClose, !0), $;
            }
          }), null), h;
        }
      }), c), f(c, () => e.children), o;
    }
  });
}
z(["click"]);
var Ue = /* @__PURE__ */ b("<thead><tr>"), Xe = /* @__PURE__ */ b("<tr><td class=win98-table-empty>No data available"), Fe = /* @__PURE__ */ b("<div class=win98-table-container><table><tbody>"), Je = /* @__PURE__ */ b("<th>"), Qe = /* @__PURE__ */ b("<tr>"), qe = /* @__PURE__ */ b("<td class=win98-table-cell>");
function It(i) {
  const t = m({
    data: [],
    columns: [],
    striped: !1,
    bordered: !0,
    hoverable: !1,
    sortOrder: "asc"
  }, i), [e, s] = C(t, ["data", "columns", "striped", "bordered", "hoverable", "sortBy", "sortOrder", "onSort", "onRowClick", "onRowDoubleClick", "selectedRow", "class", "children"]), l = v("win98-table", e.striped && "win98-table-striped", e.bordered && "win98-table-bordered", e.hoverable && "win98-table-hoverable", e.class), n = (o) => {
    o.sortable && e.onSort && e.onSort(o.key);
  }, a = (o) => e.sortBy === o ? e.sortOrder === "asc" ? " ▲" : " ▼" : "", r = (o, d, c) => d.render ? d.render(o[d.key], o, c) : o[d.key];
  return (() => {
    var o = Fe(), d = o.firstChild, c = d.firstChild;
    return P(d, l), M(d, s, !1, !0), f(d, w(p, {
      get when() {
        return G(() => !!e.columns)() && e.columns.length > 0;
      },
      get children() {
        var g = Ue(), u = g.firstChild;
        return f(u, w(S, {
          get each() {
            return e.columns;
          },
          children: (h) => (() => {
            var I = Je();
            return I.$$click = () => n(h), f(I, () => h.header, null), f(I, () => a(h.key), null), x(($) => {
              var k = v("win98-table-header", h.sortable && "win98-table-sortable"), _ = h.width ? typeof h.width == "number" ? `${h.width}px` : h.width : void 0;
              return k !== $.e && P(I, $.e = k), _ !== $.t && y(I, "width", $.t = _), $;
            }, {
              e: void 0,
              t: void 0
            }), I;
          })()
        })), g;
      }
    }), c), f(c, w(p, {
      get when() {
        return G(() => !!e.data)() && e.data.length > 0;
      },
      get children() {
        return w(S, {
          get each() {
            return e.data;
          },
          children: (g, u) => (() => {
            var h = Qe();
            return h.$$dblclick = () => e.onRowDoubleClick?.(g, u()), h.$$click = () => e.onRowClick?.(g, u()), f(h, w(S, {
              get each() {
                return e.columns;
              },
              children: (I) => (() => {
                var $ = qe();
                return f($, () => r(g, I, u())), $;
              })()
            })), x(() => P(h, v("win98-table-row", e.selectedRow === u() && "win98-table-row-selected", (e.onRowClick || e.onRowDoubleClick) && "win98-table-row-clickable"))), h;
          })()
        });
      }
    }), null), f(c, w(p, {
      get when() {
        return !e.data || e.data.length === 0;
      },
      get children() {
        var g = Xe(), u = g.firstChild;
        return x(() => A(u, "colspan", e.columns?.length || 1)), g;
      }
    }), null), f(d, w(p, {
      get when() {
        return e.children;
      },
      get children() {
        return e.children;
      }
    }), null), o;
  })();
}
const yt = `
.win98-table-container {
  background: #fff;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  padding: 2px;
  overflow: auto;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Pixelated MS Sans Serif", Arial;
  font-size: 11px;
  background: #fff;
}

.win98-table-bordered {
  border: 1px solid #000;
}

.win98-table-header {
  background: silver;
  border: 1px outset silver;
  padding: 4px 8px;
  text-align: left;
  font-weight: bold;
  position: relative;
  user-select: none;
}

.win98-table-sortable {
  cursor: pointer;
}

.win98-table-sortable:hover {
  background: #dfdfdf;
}

.win98-table-sortable:active {
  border: 1px inset silver;
  background: #c0c7c8;
}

.win98-table-cell {
  padding: 4px 8px;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
}

.win98-table-row {
  background: #fff;
}

.win98-table-striped .win98-table-row:nth-child(even) {
  background: #f8f8f8;
}

.win98-table-row-clickable {
  cursor: pointer;
}

.win98-table-hoverable .win98-table-row:hover {
  background: #dfdfdf;
}

.win98-table-row-selected {
  background: navy !important;
  color: #fff;
}

.win98-table-empty {
  text-align: center;
  color: grey;
  font-style: italic;
  padding: 16px;
}
`;
z(["click", "dblclick"]);
var et = /* @__PURE__ */ b("<button style=min-width:75px>"), tt = /* @__PURE__ */ b('<div class=alert-overlay style="background-color:rgba(0, 0, 0, 0.5);align-items:center;justify-content:center;z-index:1000"><div style=min-width:300px;max-width:500px><div class=title-bar><div class=title-bar-text></div></div><div class=window-body><div class=alert-content style=align-items:flex-start;margin-bottom:20px><img style=flex-shrink:0><div class=alert-message style="font-family:&quot;Pixelated MS Sans Serif&quot;, Arial;font-size:11px;line-height:1.4;padding-top:4px"></div></div><div class=alert-buttons style=justify-content:center><button class=default style=min-width:75px>');
const it = {
  error: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNGRjAwMDAiIHN0cm9rZT0iIzgwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTAsMTAgMjIsMjIgMjIsMTAgMTAsMjIiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjMiIGhlaWdodD0iMTQiIGZpbGw9IiNGRkZGRkYiIHRyYW5zZm9ybT0icm90YXRlKDQ1IDE2IDE2KSIvPgo8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMyIgaGVpZ2h0PSIxNCIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE2IDE2KSIvPgo8L3N2Zz4K",
  warning: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSIxNiwyIDMwLDI4IDIsMjgiIGZpbGw9IiNGRkZGMDAiIHN0cm9rZT0iIzgwODAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxyZWN0IHg9IjE0LjUiIHk9IjEwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMDAwMCIvPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjI0IiByPSIyIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo=",
  question: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwMDgwRkYiIHN0cm9rZT0iIzAwNDA4MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMiA5QzEyIDcuODk1NDMgMTIuODk1NCA3IDE0IDdIMThDMTkuMTA0NiA3IDIwIDcuODk1NDMgMjAgOVYxMUMyMCAxMi4xMDQ2IDE5LjEwNDYgMTMgMTggMTNIMTZWMTVIMTQiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIyMSIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K",
  info: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwMDgwRkYiIHN0cm9rZT0iIzAwNDA4MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iOSIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxNC41IiB5PSIxNCIgd2lkdGg9IjMiIGhlaWdodD0iMTAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg=="
};
function $t(i) {
  const t = m({
    open: !1,
    type: "info",
    title: "",
    confirmText: "OK",
    cancelText: "Cancel",
    showCancel: !1
  }, i), [e, s] = C(t, ["open", "type", "title", "message", "onConfirm", "onCancel", "confirmText", "cancelText", "showCancel", "class"]);
  let l, n;
  ee(() => {
    e.open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
  }), B(() => {
    document.body.style.overflow = "";
  });
  const a = (c) => {
    c.key === "Escape" && e.onCancel ? e.onCancel() : c.key === "Enter" && e.onConfirm && e.onConfirm();
  };
  te(() => {
    document.addEventListener("keydown", a), B(() => {
      document.removeEventListener("keydown", a);
    });
  });
  const r = () => {
    switch (e.type) {
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "question":
        return "Confirm";
      case "info":
        return "Information";
      default:
        return "Alert";
    }
  }, o = () => {
    e.onConfirm && e.onConfirm();
  }, d = () => {
    e.onCancel && e.onCancel();
  };
  return w(p, {
    get when() {
      return e.open;
    },
    get children() {
      var c = tt(), g = c.firstChild, u = g.firstChild, h = u.firstChild, I = u.nextSibling, $ = I.firstChild, k = $.firstChild, _ = k.nextSibling, T = $.nextSibling, E = T.firstChild, W = n;
      typeof W == "function" ? j(W, c) : n = c, y(c, "position", "fixed"), y(c, "top", "0"), y(c, "left", "0"), y(c, "right", "0"), y(c, "bottom", "0"), y(c, "display", "flex");
      var Y = l;
      return typeof Y == "function" ? j(Y, g) : l = g, y(g, "width", "auto"), M(g, m({
        get class() {
          return v("window", "alert-dialog", e.class);
        }
      }, s), !1, !0), f(h, () => e.title || r()), y(I, "padding", "16px"), y($, "display", "flex"), y($, "gap", "16px"), y(k, "width", "32px"), y(k, "height", "32px"), f(_, () => e.message), y(T, "display", "flex"), y(T, "gap", "8px"), E.$$click = o, f(E, () => e.confirmText), f(T, w(p, {
        get when() {
          return e.showCancel;
        },
        get children() {
          var D = et();
          return D.$$click = d, f(D, () => e.cancelText), D;
        }
      }), null), x((D) => {
        var V = it[e.type], K = e.type;
        return V !== D.e && A(k, "src", D.e = V), K !== D.t && A(k, "alt", D.t = K), D;
      }, {
        e: void 0,
        t: void 0
      }), c;
    }
  });
}
const pt = (i, t) => ({
  type: "error",
  message: i,
  onConfirm: t
}), vt = (i, t) => ({
  type: "warning",
  message: i,
  onConfirm: t
}), Ct = (i, t) => ({
  type: "info",
  message: i,
  onConfirm: t
}), Mt = (i, t, e) => ({
  type: "question",
  message: i,
  onConfirm: t,
  onCancel: e,
  showCancel: !0,
  confirmText: "Yes",
  cancelText: "No"
});
z(["click"]);
export {
  $t as Alert,
  st as Button,
  at as Checkbox,
  ot as FieldRow,
  mt as Modal,
  ut as ProgressBar,
  ct as Radio,
  dt as Select,
  ft as Slider,
  rt as StatusBar,
  ht as SunkenPanel,
  wt as Tab,
  It as Table,
  bt as Tabs,
  gt as TreeView,
  nt as Window,
  ke as WindowHeader,
  v as cn,
  Mt as showConfirm,
  pt as showError,
  Ct as showInfo,
  vt as showWarning,
  yt as tableStyles
};
