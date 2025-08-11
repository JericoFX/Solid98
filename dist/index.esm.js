import { sharedConfig as A, createMemo as j, createRenderEffect as p, untrack as U, mergeProps as u, splitProps as $, createComponent as g, Show as w, For as P, createUniqueId as H } from "solid-js";
const q = [
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
], G = /* @__PURE__ */ new Set([
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
  ...q
]), W = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), K = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), X = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function Y(l, t) {
  const e = X[l];
  return typeof e == "object" ? e[t] ? e.$ : void 0 : e;
}
const J = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), M = (l) => j(() => l());
function Q(l, t, e) {
  let i = e.length, n = t.length, s = i, o = 0, r = 0, a = t[n - 1].nextSibling, c = null;
  for (; o < n || r < s; ) {
    if (t[o] === e[r]) {
      o++, r++;
      continue;
    }
    for (; t[n - 1] === e[s - 1]; )
      n--, s--;
    if (n === o) {
      const d = s < i ? r ? e[r - 1].nextSibling : e[s - r] : a;
      for (; r < s; ) l.insertBefore(e[r++], d);
    } else if (s === r)
      for (; o < n; )
        (!c || !c.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === e[s - 1] && e[r] === t[n - 1]) {
      const d = t[--n].nextSibling;
      l.insertBefore(e[r++], t[o++].nextSibling), l.insertBefore(e[--s], d), t[n] = e[s];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let y = r;
        for (; y < s; ) c.set(e[y], y++);
      }
      const d = c.get(t[o]);
      if (d != null)
        if (r < d && d < s) {
          let y = o, m = 1, C;
          for (; ++y < n && y < s && !((C = c.get(t[y])) == null || C !== d + m); )
            m++;
          if (m > d - r) {
            const S = t[o];
            for (; r < d; ) l.insertBefore(e[r++], S);
          } else l.replaceChild(e[r++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const L = "_$DX_DELEGATE";
function h(l, t, e, i) {
  let n;
  const s = () => {
    const r = document.createElement("template");
    return r.innerHTML = l, r.content.firstChild;
  }, o = () => (n || (n = s())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function k(l, t = window.document) {
  const e = t[L] || (t[L] = /* @__PURE__ */ new Set());
  for (let i = 0, n = l.length; i < n; i++) {
    const s = l[i];
    e.has(s) || (e.add(s), t.addEventListener(s, se));
  }
}
function x(l, t, e) {
  I(l) || (e == null ? l.removeAttribute(t) : l.setAttribute(t, e));
}
function Z(l, t, e) {
  I(l) || (e ? l.setAttribute(t, "") : l.removeAttribute(t));
}
function B(l, t) {
  I(l) || (t == null ? l.removeAttribute("class") : l.className = t);
}
function T(l, t, e, i) {
  if (i)
    Array.isArray(e) ? (l[`$$${t}`] = e[0], l[`$$${t}Data`] = e[1]) : l[`$$${t}`] = e;
  else if (Array.isArray(e)) {
    const n = e[0];
    l.addEventListener(t, e[0] = (s) => n.call(l, e[1], s));
  } else l.addEventListener(t, e, typeof e != "function" && e);
}
function ee(l, t, e = {}) {
  const i = Object.keys(t || {}), n = Object.keys(e);
  let s, o;
  for (s = 0, o = n.length; s < o; s++) {
    const r = n[s];
    !r || r === "undefined" || t[r] || (z(l, r, !1), delete e[r]);
  }
  for (s = 0, o = i.length; s < o; s++) {
    const r = i[s], a = !!t[r];
    !r || r === "undefined" || e[r] === a || !a || (z(l, r, !0), e[r] = a);
  }
  return e;
}
function te(l, t, e) {
  if (!t) return e ? x(l, "style") : t;
  const i = l.style;
  if (typeof t == "string") return i.cssText = t;
  typeof e == "string" && (i.cssText = e = void 0), e || (e = {}), t || (t = {});
  let n, s;
  for (s in e)
    t[s] == null && i.removeProperty(s), delete e[s];
  for (s in t)
    n = t[s], n !== e[s] && (i.setProperty(s, n), e[s] = n);
  return e;
}
function V(l, t, e) {
  e != null ? l.style.setProperty(t, e) : l.style.removeProperty(t);
}
function b(l, t = {}, e, i) {
  const n = {};
  return i || p(() => n.children = E(l, t.children, n.children)), p(() => typeof t.ref == "function" && le(t.ref, l)), p(() => ne(l, t, e, !0, n, !0)), n;
}
function le(l, t, e) {
  return U(() => l(t, e));
}
function f(l, t, e, i) {
  if (e !== void 0 && !i && (i = []), typeof t != "function") return E(l, t, i, e);
  p((n) => E(l, t(), n, e), i);
}
function ne(l, t, e, i, n = {}, s = !1) {
  t || (t = {});
  for (const o in n)
    if (!(o in t)) {
      if (o === "children") continue;
      n[o] = O(l, o, null, n[o], e, s, t);
    }
  for (const o in t) {
    if (o === "children")
      continue;
    const r = t[o];
    n[o] = O(l, o, r, n[o], e, s, t);
  }
}
function I(l) {
  return !!A.context && !A.done && (!l || l.isConnected);
}
function ie(l) {
  return l.toLowerCase().replace(/-([a-z])/g, (t, e) => e.toUpperCase());
}
function z(l, t, e) {
  const i = t.trim().split(/\s+/);
  for (let n = 0, s = i.length; n < s; n++) l.classList.toggle(i[n], e);
}
function O(l, t, e, i, n, s, o) {
  let r, a, c, d, y;
  if (t === "style") return te(l, e, i);
  if (t === "classList") return ee(l, e, i);
  if (e === i) return i;
  if (t === "ref")
    s || e(l);
  else if (t.slice(0, 3) === "on:") {
    const m = t.slice(3);
    i && l.removeEventListener(m, i, typeof i != "function" && i), e && l.addEventListener(m, e, typeof e != "function" && e);
  } else if (t.slice(0, 10) === "oncapture:") {
    const m = t.slice(10);
    i && l.removeEventListener(m, i, !0), e && l.addEventListener(m, e, !0);
  } else if (t.slice(0, 2) === "on") {
    const m = t.slice(2).toLowerCase(), C = J.has(m);
    if (!C && i) {
      const S = Array.isArray(i) ? i[0] : i;
      l.removeEventListener(m, S);
    }
    (C || e) && (T(l, m, e, C), C && k([m]));
  } else if (t.slice(0, 5) === "attr:")
    x(l, t.slice(5), e);
  else if (t.slice(0, 5) === "bool:")
    Z(l, t.slice(5), e);
  else if ((y = t.slice(0, 5) === "prop:") || (c = W.has(t)) || (d = Y(t, l.tagName)) || (a = G.has(t)) || (r = l.nodeName.includes("-") || "is" in o)) {
    if (y)
      t = t.slice(5), a = !0;
    else if (I(l)) return e;
    t === "class" || t === "className" ? B(l, e) : r && !a && !c ? l[ie(t)] = e : l[d || t] = e;
  } else
    x(l, K[t] || t, e);
  return e;
}
function se(l) {
  if (A.registry && A.events && A.events.find(([a, c]) => c === l))
    return;
  let t = l.target;
  const e = `$$${l.type}`, i = l.target, n = l.currentTarget, s = (a) => Object.defineProperty(l, "target", {
    configurable: !0,
    value: a
  }), o = () => {
    const a = t[e];
    if (a && !t.disabled) {
      const c = t[`${e}Data`];
      if (c !== void 0 ? a.call(t, c, l) : a.call(t, l), l.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(l.target) && s(t.host), !0;
  }, r = () => {
    for (; o() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(l, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), A.registry && !A.done && (A.done = _$HY.done = !0), l.composedPath) {
    const a = l.composedPath();
    s(a[0]);
    for (let c = 0; c < a.length - 2 && (t = a[c], !!o()); c++) {
      if (t._$host) {
        t = t._$host, r();
        break;
      }
      if (t.parentNode === n)
        break;
    }
  } else r();
  s(i);
}
function E(l, t, e, i, n) {
  const s = I(l);
  if (s) {
    !e && (e = [...l.childNodes]);
    let a = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c];
      d.nodeType === 8 && d.data.slice(0, 2) === "!$" ? d.remove() : a.push(d);
    }
    e = a;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const o = typeof t, r = i !== void 0;
  if (l = r && e[0] && e[0].parentNode || l, o === "string" || o === "number") {
    if (s || o === "number" && (t = t.toString(), t === e))
      return e;
    if (r) {
      let a = e[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), e = v(l, e, i, a);
    } else
      e !== "" && typeof e == "string" ? e = l.firstChild.data = t : e = l.textContent = t;
  } else if (t == null || o === "boolean") {
    if (s) return e;
    e = v(l, e, i);
  } else {
    if (o === "function")
      return p(() => {
        let a = t();
        for (; typeof a == "function"; ) a = a();
        e = E(l, a, e, i);
      }), () => e;
    if (Array.isArray(t)) {
      const a = [], c = e && Array.isArray(e);
      if (N(a, t, e, n))
        return p(() => e = E(l, a, e, i, !0)), () => e;
      if (s) {
        if (!a.length) return e;
        if (i === void 0) return e = [...l.childNodes];
        let d = a[0];
        if (d.parentNode !== l) return e;
        const y = [d];
        for (; (d = d.nextSibling) !== i; ) y.push(d);
        return e = y;
      }
      if (a.length === 0) {
        if (e = v(l, e, i), r) return e;
      } else c ? e.length === 0 ? R(l, a, i) : Q(l, e, a) : (e && v(l), R(l, a));
      e = a;
    } else if (t.nodeType) {
      if (s && t.parentNode) return e = r ? [t] : t;
      if (Array.isArray(e)) {
        if (r) return e = v(l, e, i, t);
        v(l, e, null, t);
      } else e == null || e === "" || !l.firstChild ? l.appendChild(t) : l.replaceChild(t, l.firstChild);
      e = t;
    }
  }
  return e;
}
function N(l, t, e, i) {
  let n = !1;
  for (let s = 0, o = t.length; s < o; s++) {
    let r = t[s], a = e && e[l.length], c;
    if (!(r == null || r === !0 || r === !1)) if ((c = typeof r) == "object" && r.nodeType)
      l.push(r);
    else if (Array.isArray(r))
      n = N(l, r, a) || n;
    else if (c === "function")
      if (i) {
        for (; typeof r == "function"; ) r = r();
        n = N(l, Array.isArray(r) ? r : [r], Array.isArray(a) ? a : [a]) || n;
      } else
        l.push(r), n = !0;
    else {
      const d = String(r);
      a && a.nodeType === 3 && a.data === d ? l.push(a) : l.push(document.createTextNode(d));
    }
  }
  return n;
}
function R(l, t, e = null) {
  for (let i = 0, n = t.length; i < n; i++) l.insertBefore(t[i], e);
}
function v(l, t, e, i) {
  if (e === void 0) return l.textContent = "";
  const n = i || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const r = t[o];
      if (n !== r) {
        const a = r.parentNode === l;
        !s && !o ? a ? l.replaceChild(n, r) : l.insertBefore(n, e) : a && r.remove();
      } else s = !0;
    }
  } else l.insertBefore(n, e);
  return [n];
}
function F(l) {
  var t, e, i = "";
  if (typeof l == "string" || typeof l == "number") i += l;
  else if (typeof l == "object") if (Array.isArray(l)) {
    var n = l.length;
    for (t = 0; t < n; t++) l[t] && (e = F(l[t])) && (i && (i += " "), i += e);
  } else for (e in l) l[e] && (i && (i += " "), i += e);
  return i;
}
function re() {
  for (var l, t, e = 0, i = "", n = arguments.length; e < n; e++) (l = arguments[e]) && (t = F(l)) && (i && (i += " "), i += t);
  return i;
}
function _(...l) {
  return re(l);
}
var oe = /* @__PURE__ */ h("<button aria-label=Help class=help>"), ae = /* @__PURE__ */ h("<button aria-label=Minimize class=minimize>"), ce = /* @__PURE__ */ h("<button aria-label=Maximize class=maximize>"), de = /* @__PURE__ */ h("<button aria-label=Close class=close>"), fe = /* @__PURE__ */ h("<div><div class=title-bar-text></div><div class=title-bar-controls>");
function ue(l) {
  const t = u({
    active: !0,
    showMinimize: !0,
    showMaximize: !0,
    showClose: !0,
    showHelp: !1
  }, l), [e, i] = $(t, ["title", "active", "showMinimize", "showMaximize", "showClose", "showHelp", "onClose", "onMinimize", "onMaximize", "onRestore", "onHelp", "class", "children"]);
  return (() => {
    var n = fe(), s = n.firstChild, o = s.nextSibling;
    return b(n, u({
      get class() {
        return _("title-bar", !e.active && "inactive", e.class);
      }
    }, i), !1, !0), f(s, () => e.title || e.children), f(o, g(w, {
      get when() {
        return e.showHelp;
      },
      get children() {
        var r = oe();
        return T(r, "click", e.onHelp, !0), r;
      }
    }), null), f(o, g(w, {
      get when() {
        return e.showMinimize;
      },
      get children() {
        var r = ae();
        return T(r, "click", e.onMinimize, !0), r;
      }
    }), null), f(o, g(w, {
      get when() {
        return e.showMaximize;
      },
      get children() {
        var r = ce();
        return T(r, "click", e.onMaximize, !0), r;
      }
    }), null), f(o, g(w, {
      get when() {
        return e.showClose;
      },
      get children() {
        var r = de();
        return T(r, "click", e.onClose, !0), r;
      }
    }), null), n;
  })();
}
k(["click"]);
var he = /* @__PURE__ */ h("<div><div class=window-body>");
function Se(l) {
  const t = u({
    active: !0,
    resizable: !1
  }, l), [e, i] = $(t, ["title", "active", "resizable", "onClose", "onMinimize", "onMaximize", "onRestore", "class", "children"]);
  return (() => {
    var n = he(), s = n.firstChild;
    return b(n, u({
      get class() {
        return _("window", !e.active && "inactive", e.class);
      }
    }, i), !1, !0), f(n, (() => {
      var o = M(() => !!e.title);
      return () => o() && g(ue, {
        get title() {
          return e.title;
        },
        get active() {
          return e.active;
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
        }
      });
    })(), s), f(s, () => e.children), n;
  })();
}
var ge = /* @__PURE__ */ h("<button>");
function Ne(l) {
  const t = u({
    variant: "normal"
  }, l), [e, i] = $(t, ["variant", "disabled", "class", "children"]);
  return (() => {
    var n = ge();
    return b(n, u({
      get class() {
        return _(e.variant === "default" && "default", e.disabled && "disabled", e.class);
      },
      get disabled() {
        return e.disabled;
      }
    }, i), !1, !0), f(n, () => e.children), n;
  })();
}
var D = /* @__PURE__ */ h("<div class=status-bar-field>"), me = /* @__PURE__ */ h("<div>");
function ke(l) {
  const t = u({
    fields: []
  }, l), [e, i] = $(t, ["fields", "class", "children"]);
  return (() => {
    var n = me();
    return b(n, u({
      get class() {
        return _("status-bar", e.class);
      }
    }, i), !1, !0), f(n, g(w, {
      get when() {
        return M(() => !!e.fields)() && e.fields.length > 0;
      },
      get children() {
        return g(P, {
          get each() {
            return e.fields;
          },
          children: (s) => (() => {
            var o = D();
            return f(o, s), o;
          })()
        });
      }
    }), null), f(n, g(w, {
      get when() {
        return !e.fields || e.fields.length === 0;
      },
      get children() {
        var s = D();
        return f(s, () => e.children), s;
      }
    }), null), n;
  })();
}
var $e = /* @__PURE__ */ h("<div>");
function Le(l) {
  const t = u({
    stacked: !1
  }, l), [e, i] = $(t, ["stacked", "class", "children"]);
  return (() => {
    var n = $e();
    return b(n, u({
      get class() {
        return _(e.stacked ? "field-row-stacked" : "field-row", e.class);
      }
    }, i), !1, !0), f(n, () => e.children), n;
  })();
}
var be = /* @__PURE__ */ h("<input type=checkbox>"), ye = /* @__PURE__ */ h("<label>");
function ze(l) {
  const [t, e] = $(l, ["label", "class", "id"]), i = H(), n = t.id || i;
  return [(() => {
    var s = be();
    return x(s, "id", n), b(s, u({
      get class() {
        return t.class;
      }
    }, e), !1, !1), s;
  })(), g(w, {
    get when() {
      return t.label;
    },
    get children() {
      var s = ye();
      return x(s, "for", n), f(s, () => t.label), s;
    }
  })];
}
var we = /* @__PURE__ */ h("<input type=radio>"), _e = /* @__PURE__ */ h("<label>");
function Oe(l) {
  const [t, e] = $(l, ["label", "class", "id"]), i = H(), n = t.id || i;
  return [(() => {
    var s = we();
    return x(s, "id", n), b(s, u({
      get class() {
        return t.class;
      }
    }, e), !1, !1), s;
  })(), g(w, {
    get when() {
      return t.label;
    },
    get children() {
      var s = _e();
      return x(s, "for", n), f(s, () => t.label), s;
    }
  })];
}
var pe = /* @__PURE__ */ h("<select>"), Ae = /* @__PURE__ */ h("<option>");
function Re(l) {
  const t = u({
    options: []
  }, l), [e, i] = $(t, ["options", "class", "children"]);
  return (() => {
    var n = pe();
    return b(n, u({
      get class() {
        return _(e.class);
      }
    }, i), !1, !0), f(n, g(w, {
      get when() {
        return M(() => !!e.options)() && e.options.length > 0;
      },
      get children() {
        return g(P, {
          get each() {
            return e.options;
          },
          children: (s) => (() => {
            var o = Ae();
            return f(o, () => s.label), p(() => o.selected = s.selected), p(() => o.value = s.value), o;
          })()
        });
      }
    }), null), f(n, g(w, {
      get when() {
        return !e.options || e.options.length === 0;
      },
      get children() {
        return e.children;
      }
    }), null), n;
  })();
}
var Ce = /* @__PURE__ */ h("<input type=range>");
function De(l) {
  const t = u({
    vertical: !1,
    boxIndicator: !1,
    min: 0,
    max: 100,
    step: 1
  }, l), [e, i] = $(t, ["vertical", "boxIndicator", "class"]);
  return (() => {
    var n = Ce();
    return b(n, u({
      get class() {
        return _(e.boxIndicator && "has-box-indicator", e.vertical && "is-vertical", e.class);
      }
    }, i), !1, !1), n;
  })();
}
var xe = /* @__PURE__ */ h("<div><div class=progress-indicator-bar>");
function He(l) {
  const t = u({
    value: 0,
    max: 100,
    segmented: !1
  }, l), [e, i] = $(t, ["value", "max", "segmented", "class", "children"]);
  return (() => {
    var n = xe(), s = n.firstChild;
    return b(n, u({
      get class() {
        return _("progress-indicator", e.segmented && "segmented", e.class);
      }
    }, i), !1, !0), f(n, () => e.children, null), p((o) => V(s, "width", `${Math.min(100, Math.max(0, e.value / e.max * 100))}%`)), n;
  })();
}
var ve = /* @__PURE__ */ h("<div>");
function Be(l) {
  const t = u({
    interactive: !1
  }, l), [e, i] = $(t, ["interactive", "class", "children"]);
  return (() => {
    var n = ve();
    return b(n, u({
      get class() {
        return _("sunken-panel", e.interactive && "interactive", e.class);
      }
    }, i), !1, !0), f(n, () => e.children), n;
  })();
}
var Te = /* @__PURE__ */ h("<ul><li><span>"), Me = /* @__PURE__ */ h("<div>");
function Ve(l) {
  const t = u({
    data: []
  }, l), [e, i] = $(t, ["data", "class", "children"]), n = (s) => {
    const o = s.depth || 0;
    return (() => {
      var r = Te(), a = r.firstChild, c = a.firstChild;
      return V(r, "margin-left", o > 0 ? "20px" : "0"), f(c, () => s.node.label), f(a, g(w, {
        get when() {
          return M(() => !!s.node.children)() && s.node.expanded;
        },
        get children() {
          return g(P, {
            get each() {
              return s.node.children;
            },
            children: (d) => g(n, {
              node: d,
              depth: o + 1
            })
          });
        }
      }), null), p(() => B(c, _(s.node.selected && "highlighted"))), r;
    })();
  };
  return (() => {
    var s = Me();
    return b(s, u({
      get class() {
        return _("tree-view", e.class);
      }
    }, i), !1, !0), f(s, g(w, {
      get when() {
        return M(() => !!e.data)() && e.data.length > 0;
      },
      get children() {
        return g(P, {
          get each() {
            return e.data;
          },
          children: (o) => g(n, {
            node: o
          })
        });
      }
    }), null), f(s, g(w, {
      get when() {
        return !e.data || e.data.length === 0;
      },
      get children() {
        return e.children;
      }
    }), null), s;
  })();
}
var Ee = /* @__PURE__ */ h("<div role=tablist>"), Ie = /* @__PURE__ */ h("<button role=tab>");
function Fe(l) {
  const t = u({
    multirows: !1
  }, l), [e, i] = $(t, ["multirows", "selectedTab", "onTabSelect", "class", "children"]);
  return (() => {
    var n = Ee();
    return b(n, u({
      get class() {
        return _(e.multirows && "multirows", e.class);
      }
    }, i), !1, !0), f(n, () => e.children), n;
  })();
}
function je(l) {
  const [t, e] = $(l, ["id", "label", "selected", "onClick", "class"]);
  return (() => {
    var i = Ie();
    return i.$$click = () => t.onClick?.(t.id), b(i, u({
      get "aria-selected"() {
        return t.selected;
      },
      get class() {
        return _(t.selected && "selected", t.class);
      }
    }, e), !1, !0), f(i, () => t.label), i;
  })();
}
k(["click"]);
export {
  Ne as Button,
  ze as Checkbox,
  Le as FieldRow,
  He as ProgressBar,
  Oe as Radio,
  Re as Select,
  De as Slider,
  ke as StatusBar,
  Be as SunkenPanel,
  je as Tab,
  Fe as Tabs,
  Ve as TreeView,
  Se as Window,
  ue as WindowHeader,
  _ as cn
};
