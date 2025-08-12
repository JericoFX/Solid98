import { sharedConfig as k, createMemo as W, createRenderEffect as C, untrack as X, mergeProps as $, splitProps as v, createComponent as w, Show as y, For as T, createUniqueId as G, createSignal as Y, createEffect as J, onCleanup as D, onMount as Q } from "solid-js";
const Z = [
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
], ee = /* @__PURE__ */ new Set([
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
  ...Z
]), te = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), le = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), ne = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function ie(l, t) {
  const e = ne[l];
  return typeof e == "object" ? e[t] ? e.$ : void 0 : e;
}
const re = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), P = (l) => W(() => l());
function se(l, t, e) {
  let r = e.length, n = t.length, i = r, a = 0, s = 0, o = t[n - 1].nextSibling, c = null;
  for (; a < n || s < i; ) {
    if (t[a] === e[s]) {
      a++, s++;
      continue;
    }
    for (; t[n - 1] === e[i - 1]; )
      n--, i--;
    if (n === a) {
      const d = i < r ? s ? e[s - 1].nextSibling : e[i - s] : o;
      for (; s < i; ) l.insertBefore(e[s++], d);
    } else if (i === s)
      for (; a < n; )
        (!c || !c.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === e[i - 1] && e[s] === t[n - 1]) {
      const d = t[--n].nextSibling;
      l.insertBefore(e[s++], t[a++].nextSibling), l.insertBefore(e[--i], d), t[n] = e[i];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let h = s;
        for (; h < i; ) c.set(e[h], h++);
      }
      const d = c.get(t[a]);
      if (d != null)
        if (s < d && d < i) {
          let h = a, g = 1, b;
          for (; ++h < n && h < i && !((b = c.get(t[h])) == null || b !== d + g); )
            g++;
          if (g > d - s) {
            const m = t[a];
            for (; s < d; ) l.insertBefore(e[s++], m);
          } else l.replaceChild(e[s++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const V = "_$DX_DELEGATE";
function u(l, t, e, r) {
  let n;
  const i = () => {
    const s = document.createElement("template");
    return s.innerHTML = l, s.content.firstChild;
  }, a = () => (n || (n = i())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function z(l, t = window.document) {
  const e = t[V] || (t[V] = /* @__PURE__ */ new Set());
  for (let r = 0, n = l.length; r < n; r++) {
    const i = l[r];
    e.has(i) || (e.add(i), t.addEventListener(i, ue));
  }
}
function A(l, t, e) {
  O(l) || (e == null ? l.removeAttribute(t) : l.setAttribute(t, e));
}
function oe(l, t, e) {
  O(l) || (e ? l.setAttribute(t, "") : l.removeAttribute(t));
}
function N(l, t) {
  O(l) || (t == null ? l.removeAttribute("class") : l.className = t);
}
function I(l, t, e, r) {
  if (r)
    Array.isArray(e) ? (l[`$$${t}`] = e[0], l[`$$${t}Data`] = e[1]) : l[`$$${t}`] = e;
  else if (Array.isArray(e)) {
    const n = e[0];
    l.addEventListener(t, e[0] = (i) => n.call(l, e[1], i));
  } else l.addEventListener(t, e, typeof e != "function" && e);
}
function ae(l, t, e = {}) {
  const r = Object.keys(t || {}), n = Object.keys(e);
  let i, a;
  for (i = 0, a = n.length; i < a; i++) {
    const s = n[i];
    !s || s === "undefined" || t[s] || (j(l, s, !1), delete e[s]);
  }
  for (i = 0, a = r.length; i < a; i++) {
    const s = r[i], o = !!t[s];
    !s || s === "undefined" || e[s] === o || !o || (j(l, s, !0), e[s] = o);
  }
  return e;
}
function ce(l, t, e) {
  if (!t) return e ? A(l, "style") : t;
  const r = l.style;
  if (typeof t == "string") return r.cssText = t;
  typeof e == "string" && (r.cssText = e = void 0), e || (e = {}), t || (t = {});
  let n, i;
  for (i in e)
    t[i] == null && r.removeProperty(i), delete e[i];
  for (i in t)
    n = t[i], n !== e[i] && (r.setProperty(i, n), e[i] = n);
  return e;
}
function M(l, t, e) {
  e != null ? l.style.setProperty(t, e) : l.style.removeProperty(t);
}
function _(l, t = {}, e, r) {
  const n = {};
  return r || C(() => n.children = R(l, t.children, n.children)), C(() => typeof t.ref == "function" && L(t.ref, l)), C(() => de(l, t, e, !0, n, !0)), n;
}
function L(l, t, e) {
  return X(() => l(t, e));
}
function f(l, t, e, r) {
  if (e !== void 0 && !r && (r = []), typeof t != "function") return R(l, t, r, e);
  C((n) => R(l, t(), n, e), r);
}
function de(l, t, e, r, n = {}, i = !1) {
  t || (t = {});
  for (const a in n)
    if (!(a in t)) {
      if (a === "children") continue;
      n[a] = F(l, a, null, n[a], e, i, t);
    }
  for (const a in t) {
    if (a === "children")
      continue;
    const s = t[a];
    n[a] = F(l, a, s, n[a], e, i, t);
  }
}
function O(l) {
  return !!k.context && !k.done && (!l || l.isConnected);
}
function fe(l) {
  return l.toLowerCase().replace(/-([a-z])/g, (t, e) => e.toUpperCase());
}
function j(l, t, e) {
  const r = t.trim().split(/\s+/);
  for (let n = 0, i = r.length; n < i; n++) l.classList.toggle(r[n], e);
}
function F(l, t, e, r, n, i, a) {
  let s, o, c, d, h;
  if (t === "style") return ce(l, e, r);
  if (t === "classList") return ae(l, e, r);
  if (e === r) return r;
  if (t === "ref")
    i || e(l);
  else if (t.slice(0, 3) === "on:") {
    const g = t.slice(3);
    r && l.removeEventListener(g, r, typeof r != "function" && r), e && l.addEventListener(g, e, typeof e != "function" && e);
  } else if (t.slice(0, 10) === "oncapture:") {
    const g = t.slice(10);
    r && l.removeEventListener(g, r, !0), e && l.addEventListener(g, e, !0);
  } else if (t.slice(0, 2) === "on") {
    const g = t.slice(2).toLowerCase(), b = re.has(g);
    if (!b && r) {
      const m = Array.isArray(r) ? r[0] : r;
      l.removeEventListener(g, m);
    }
    (b || e) && (I(l, g, e, b), b && z([g]));
  } else if (t.slice(0, 5) === "attr:")
    A(l, t.slice(5), e);
  else if (t.slice(0, 5) === "bool:")
    oe(l, t.slice(5), e);
  else if ((h = t.slice(0, 5) === "prop:") || (c = te.has(t)) || (d = ie(t, l.tagName)) || (o = ee.has(t)) || (s = l.nodeName.includes("-") || "is" in a)) {
    if (h)
      t = t.slice(5), o = !0;
    else if (O(l)) return e;
    t === "class" || t === "className" ? N(l, e) : s && !o && !c ? l[fe(t)] = e : l[d || t] = e;
  } else
    A(l, le[t] || t, e);
  return e;
}
function ue(l) {
  if (k.registry && k.events && k.events.find(([o, c]) => c === l))
    return;
  let t = l.target;
  const e = `$$${l.type}`, r = l.target, n = l.currentTarget, i = (o) => Object.defineProperty(l, "target", {
    configurable: !0,
    value: o
  }), a = () => {
    const o = t[e];
    if (o && !t.disabled) {
      const c = t[`${e}Data`];
      if (c !== void 0 ? o.call(t, c, l) : o.call(t, l), l.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(l.target) && i(t.host), !0;
  }, s = () => {
    for (; a() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(l, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), k.registry && !k.done && (k.done = _$HY.done = !0), l.composedPath) {
    const o = l.composedPath();
    i(o[0]);
    for (let c = 0; c < o.length - 2 && (t = o[c], !!a()); c++) {
      if (t._$host) {
        t = t._$host, s();
        break;
      }
      if (t.parentNode === n)
        break;
    }
  } else s();
  i(r);
}
function R(l, t, e, r, n) {
  const i = O(l);
  if (i) {
    !e && (e = [...l.childNodes]);
    let o = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c];
      d.nodeType === 8 && d.data.slice(0, 2) === "!$" ? d.remove() : o.push(d);
    }
    e = o;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const a = typeof t, s = r !== void 0;
  if (l = s && e[0] && e[0].parentNode || l, a === "string" || a === "number") {
    if (i || a === "number" && (t = t.toString(), t === e))
      return e;
    if (s) {
      let o = e[0];
      o && o.nodeType === 3 ? o.data !== t && (o.data = t) : o = document.createTextNode(t), e = S(l, e, r, o);
    } else
      e !== "" && typeof e == "string" ? e = l.firstChild.data = t : e = l.textContent = t;
  } else if (t == null || a === "boolean") {
    if (i) return e;
    e = S(l, e, r);
  } else {
    if (a === "function")
      return C(() => {
        let o = t();
        for (; typeof o == "function"; ) o = o();
        e = R(l, o, e, r);
      }), () => e;
    if (Array.isArray(t)) {
      const o = [], c = e && Array.isArray(e);
      if (H(o, t, e, n))
        return C(() => e = R(l, o, e, r, !0)), () => e;
      if (i) {
        if (!o.length) return e;
        if (r === void 0) return e = [...l.childNodes];
        let d = o[0];
        if (d.parentNode !== l) return e;
        const h = [d];
        for (; (d = d.nextSibling) !== r; ) h.push(d);
        return e = h;
      }
      if (o.length === 0) {
        if (e = S(l, e, r), s) return e;
      } else c ? e.length === 0 ? U(l, o, r) : se(l, e, o) : (e && S(l), U(l, o));
      e = o;
    } else if (t.nodeType) {
      if (i && t.parentNode) return e = s ? [t] : t;
      if (Array.isArray(e)) {
        if (s) return e = S(l, e, r, t);
        S(l, e, null, t);
      } else e == null || e === "" || !l.firstChild ? l.appendChild(t) : l.replaceChild(t, l.firstChild);
      e = t;
    }
  }
  return e;
}
function H(l, t, e, r) {
  let n = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let s = t[i], o = e && e[l.length], c;
    if (!(s == null || s === !0 || s === !1)) if ((c = typeof s) == "object" && s.nodeType)
      l.push(s);
    else if (Array.isArray(s))
      n = H(l, s, o) || n;
    else if (c === "function")
      if (r) {
        for (; typeof s == "function"; ) s = s();
        n = H(l, Array.isArray(s) ? s : [s], Array.isArray(o) ? o : [o]) || n;
      } else
        l.push(s), n = !0;
    else {
      const d = String(s);
      o && o.nodeType === 3 && o.data === d ? l.push(o) : l.push(document.createTextNode(d));
    }
  }
  return n;
}
function U(l, t, e = null) {
  for (let r = 0, n = t.length; r < n; r++) l.insertBefore(t[r], e);
}
function S(l, t, e, r) {
  if (e === void 0) return l.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let a = t.length - 1; a >= 0; a--) {
      const s = t[a];
      if (n !== s) {
        const o = s.parentNode === l;
        !i && !a ? o ? l.replaceChild(n, s) : l.insertBefore(n, e) : o && s.remove();
      } else i = !0;
    }
  } else l.insertBefore(n, e);
  return [n];
}
function K(l) {
  var t, e, r = "";
  if (typeof l == "string" || typeof l == "number") r += l;
  else if (typeof l == "object") if (Array.isArray(l)) {
    var n = l.length;
    for (t = 0; t < n; t++) l[t] && (e = K(l[t])) && (r && (r += " "), r += e);
  } else for (e in l) l[e] && (r && (r += " "), r += e);
  return r;
}
function he() {
  for (var l, t, e = 0, r = "", n = arguments.length; e < n; e++) (l = arguments[e]) && (t = K(l)) && (r && (r += " "), r += t);
  return r;
}
function p(...l) {
  return he(l);
}
var ge = /* @__PURE__ */ u("<button aria-label=Help class=help>"), be = /* @__PURE__ */ u("<button aria-label=Minimize class=minimize>"), we = /* @__PURE__ */ u("<button aria-label=Maximize class=maximize>"), $e = /* @__PURE__ */ u("<button aria-label=Close class=close>"), me = /* @__PURE__ */ u("<div><div class=title-bar-text></div><div class=title-bar-controls>");
function ye(l) {
  const t = $({
    active: !0,
    showMinimize: !0,
    showMaximize: !0,
    showClose: !0,
    showHelp: !1
  }, l), [e, r] = v(t, ["title", "active", "showMinimize", "showMaximize", "showClose", "showHelp", "onClose", "onMinimize", "onMaximize", "onRestore", "onHelp", "class", "children"]);
  return (() => {
    var n = me(), i = n.firstChild, a = i.nextSibling;
    return _(n, $({
      get class() {
        return p("title-bar", !e.active && "inactive", e.class);
      }
    }, r), !1, !0), f(i, () => e.title || e.children), f(a, w(y, {
      get when() {
        return e.showHelp;
      },
      get children() {
        var s = ge();
        return I(s, "click", e.onHelp, !0), s;
      }
    }), null), f(a, w(y, {
      get when() {
        return e.showMinimize;
      },
      get children() {
        var s = be();
        return I(s, "click", e.onMinimize, !0), s;
      }
    }), null), f(a, w(y, {
      get when() {
        return e.showMaximize;
      },
      get children() {
        var s = we();
        return I(s, "click", e.onMaximize, !0), s;
      }
    }), null), f(a, w(y, {
      get when() {
        return e.showClose;
      },
      get children() {
        var s = $e();
        return I(s, "click", e.onClose, !0), s;
      }
    }), null), n;
  })();
}
z(["click"]);
var pe = /* @__PURE__ */ u("<div><div class=window-body>");
function We(l) {
  const t = $({
    active: !0,
    resizable: !1
  }, l), [e, r] = v(t, ["title", "active", "resizable", "showMinimize", "showMaximize", "showClose", "showHelp", "onClose", "onMinimize", "onMaximize", "onRestore", "onHelp", "class", "children"]);
  return (() => {
    var n = pe(), i = n.firstChild;
    return _(n, $({
      get class() {
        return p("window", !e.active && "inactive", e.class);
      }
    }, r), !1, !0), f(n, (() => {
      var a = P(() => !!e.title);
      return () => a() && w(ye, {
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
    })(), i), f(i, () => e.children), n;
  })();
}
var ve = /* @__PURE__ */ u("<button>");
function Xe(l) {
  const t = $({
    variant: "normal"
  }, l), [e, r] = v(t, ["variant", "disabled", "class", "children"]);
  return (() => {
    var n = ve();
    return _(n, $({
      get class() {
        return p(e.variant === "default" && "default", e.disabled && "disabled", e.class);
      },
      get disabled() {
        return e.disabled;
      }
    }, r), !1, !0), f(n, () => e.children), n;
  })();
}
var q = /* @__PURE__ */ u("<div class=status-bar-field>"), _e = /* @__PURE__ */ u("<div>");
function Ye(l) {
  const t = $({
    fields: []
  }, l), [e, r] = v(t, ["fields", "class", "children"]);
  return (() => {
    var n = _e();
    return _(n, $({
      get class() {
        return p("status-bar", e.class);
      }
    }, r), !1, !0), f(n, w(y, {
      get when() {
        return P(() => !!e.fields)() && e.fields.length > 0;
      },
      get children() {
        return w(T, {
          get each() {
            return e.fields;
          },
          children: (i) => (() => {
            var a = q();
            return f(a, i), a;
          })()
        });
      }
    }), null), f(n, w(y, {
      get when() {
        return !e.fields || e.fields.length === 0;
      },
      get children() {
        var i = q();
        return f(i, () => e.children), i;
      }
    }), null), n;
  })();
}
var xe = /* @__PURE__ */ u("<div>");
function Je(l) {
  const t = $({
    stacked: !1
  }, l), [e, r] = v(t, ["stacked", "class", "children"]);
  return (() => {
    var n = xe();
    return _(n, $({
      get class() {
        return p(e.stacked ? "field-row-stacked" : "field-row", e.class);
      }
    }, r), !1, !0), f(n, () => e.children), n;
  })();
}
var Ce = /* @__PURE__ */ u("<input type=checkbox>"), ke = /* @__PURE__ */ u("<label>");
function Qe(l) {
  const [t, e] = v(l, ["label", "class", "id"]), r = G(), n = t.id || r;
  return [(() => {
    var i = Ce();
    return A(i, "id", n), _(i, $({
      get class() {
        return t.class;
      }
    }, e), !1, !1), i;
  })(), w(y, {
    get when() {
      return t.label;
    },
    get children() {
      var i = ke();
      return A(i, "for", n), f(i, () => t.label), i;
    }
  })];
}
var Me = /* @__PURE__ */ u("<input type=radio>"), Ae = /* @__PURE__ */ u("<label>");
function Ze(l) {
  const [t, e] = v(l, ["label", "class", "id"]), r = G(), n = t.id || r;
  return [(() => {
    var i = Me();
    return A(i, "id", n), _(i, $({
      get class() {
        return t.class;
      }
    }, e), !1, !1), i;
  })(), w(y, {
    get when() {
      return t.label;
    },
    get children() {
      var i = Ae();
      return A(i, "for", n), f(i, () => t.label), i;
    }
  })];
}
var Ee = /* @__PURE__ */ u("<select>"), Te = /* @__PURE__ */ u("<option>");
function et(l) {
  const t = $({
    options: []
  }, l), [e, r] = v(t, ["options", "class", "children"]);
  return (() => {
    var n = Ee();
    return _(n, $({
      get class() {
        return p(e.class);
      }
    }, r), !1, !0), f(n, w(y, {
      get when() {
        return P(() => !!e.options)() && e.options.length > 0;
      },
      get children() {
        return w(T, {
          get each() {
            return e.options;
          },
          children: (i) => (() => {
            var a = Te();
            return f(a, () => i.label), C(() => a.selected = i.selected), C(() => a.value = i.value), a;
          })()
        });
      }
    }), null), f(n, w(y, {
      get when() {
        return !e.options || e.options.length === 0;
      },
      get children() {
        return e.children;
      }
    }), null), n;
  })();
}
var Se = /* @__PURE__ */ u("<input type=range>");
function tt(l) {
  const t = $({
    vertical: !1,
    boxIndicator: !1,
    min: 0,
    max: 100,
    step: 1
  }, l), [e, r] = v(t, ["vertical", "boxIndicator", "class"]);
  return (() => {
    var n = Se();
    return _(n, $({
      get class() {
        return p(e.boxIndicator && "has-box-indicator", e.vertical && "is-vertical", e.class);
      }
    }, r), !1, !1), n;
  })();
}
var Ie = /* @__PURE__ */ u("<div><div class=progress-indicator-bar>");
function lt(l) {
  const t = $({
    value: 0,
    max: 100,
    segmented: !1
  }, l), [e, r] = v(t, ["value", "max", "segmented", "class", "children"]);
  return (() => {
    var n = Ie(), i = n.firstChild;
    return _(n, $({
      get class() {
        return p("progress-indicator", e.segmented && "segmented", e.class);
      }
    }, r), !1, !0), f(n, () => e.children, null), C((a) => M(i, "width", `${Math.min(100, Math.max(0, e.value / e.max * 100))}%`)), n;
  })();
}
var Ne = /* @__PURE__ */ u("<div>");
function nt(l) {
  const t = $({
    interactive: !1
  }, l), [e, r] = v(t, ["interactive", "class", "children"]);
  return (() => {
    var n = Ne();
    return _(n, $({
      get class() {
        return p("sunken-panel", e.interactive && "interactive", e.class);
      }
    }, r), !1, !0), f(n, () => e.children), n;
  })();
}
var Pe = /* @__PURE__ */ u("<li><details><summary></summary><ul>"), ze = /* @__PURE__ */ u("<li><a href=#>"), Re = /* @__PURE__ */ u("<ul>");
function it(l) {
  const t = $({
    data: []
  }, l), [e, r] = v(t, ["data", "class", "children"]), n = (i) => {
    const [a, s] = Y(i.node.expanded ?? !1), o = i.node.children && i.node.children.length > 0, c = () => {
      o && s(!a());
    };
    return o ? (() => {
      var d = Pe(), h = d.firstChild, g = h.firstChild, b = g.nextSibling;
      return g.$$click = c, f(g, () => i.node.label), f(b, w(T, {
        get each() {
          return i.node.children;
        },
        children: (m) => w(n, {
          node: m
        })
      })), C((m) => {
        var x = a(), E = p(i.node.selected && "selected");
        return x !== m.e && (h.open = m.e = x), E !== m.t && N(g, m.t = E), m;
      }, {
        e: void 0,
        t: void 0
      }), d;
    })() : (() => {
      var d = ze(), h = d.firstChild;
      return h.$$click = (g) => g.preventDefault(), f(h, () => i.node.label), C(() => N(h, p(i.node.selected && "selected"))), d;
    })();
  };
  return (() => {
    var i = Re();
    return _(i, $({
      get class() {
        return p("tree-view", e.class);
      }
    }, r), !1, !0), f(i, w(y, {
      get when() {
        return P(() => !!e.data)() && e.data.length > 0;
      },
      get children() {
        return w(T, {
          get each() {
            return e.data;
          },
          children: (a) => w(n, {
            node: a,
            isRoot: !0
          })
        });
      }
    }), null), f(i, w(y, {
      get when() {
        return !e.data || e.data.length === 0;
      },
      get children() {
        return e.children;
      }
    }), null), i;
  })();
}
z(["click"]);
var Oe = /* @__PURE__ */ u("<menu role=tablist>"), Le = /* @__PURE__ */ u("<li role=tab><a href=#tabs>");
function rt(l) {
  const t = $({
    multirows: !1
  }, l), [e, r] = v(t, ["multirows", "selectedTab", "onTabSelect", "class", "children"]);
  return (() => {
    var n = Oe();
    return _(n, $({
      get class() {
        return p(e.multirows && "multirows", e.class);
      }
    }, r), !1, !0), f(n, () => e.children), n;
  })();
}
function st(l) {
  const [t, e] = v(l, ["id", "label", "selected", "onClick", "class"]);
  return (() => {
    var r = Le(), n = r.firstChild;
    return _(r, $({
      get "aria-selected"() {
        return t.selected;
      },
      get class() {
        return t.class;
      }
    }, e), !1, !0), n.$$click = (i) => {
      i.preventDefault(), t.onClick?.(t.id);
    }, f(n, () => t.label), r;
  })();
}
z(["click"]);
var He = /* @__PURE__ */ u("<div class=title-bar-controls><button aria-label=Close>"), Be = /* @__PURE__ */ u("<div class=title-bar><div class=title-bar-text>"), De = /* @__PURE__ */ u('<div class=modal-overlay style="background-color:rgba(0, 0, 0, 0.5);align-items:center;justify-content:center;z-index:1000"><div><div class=window-body>');
function ot(l) {
  const t = $({
    open: !1,
    showCloseButton: !0,
    width: "auto",
    height: "auto"
  }, l), [e, r] = v(t, ["open", "title", "onClose", "children", "class", "showCloseButton", "width", "height"]);
  let n, i;
  J(() => {
    e.open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
  }), D(() => {
    document.body.style.overflow = "";
  });
  const a = (o) => {
    o.target === i && e.onClose && e.onClose();
  }, s = (o) => {
    o.key === "Escape" && e.onClose && e.onClose();
  };
  return Q(() => {
    document.addEventListener("keydown", s), D(() => {
      document.removeEventListener("keydown", s);
    });
  }), w(y, {
    get when() {
      return e.open;
    },
    get children() {
      var o = De(), c = o.firstChild, d = c.firstChild;
      o.$$click = a;
      var h = i;
      typeof h == "function" ? L(h, o) : i = o, M(o, "position", "fixed"), M(o, "top", "0"), M(o, "left", "0"), M(o, "right", "0"), M(o, "bottom", "0"), M(o, "display", "flex"), c.$$click = (b) => b.stopPropagation();
      var g = n;
      return typeof g == "function" ? L(g, c) : n = c, _(c, $({
        get class() {
          return p("window", "modal-window", e.class);
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
      }, r), !1, !0), f(c, w(y, {
        get when() {
          return e.title;
        },
        get children() {
          var b = Be(), m = b.firstChild;
          return f(m, () => e.title), f(b, w(y, {
            get when() {
              return e.showCloseButton;
            },
            get children() {
              var x = He(), E = x.firstChild;
              return I(E, "click", e.onClose, !0), x;
            }
          }), null), b;
        }
      }), d), f(d, () => e.children), o;
    }
  });
}
z(["click"]);
var Ve = /* @__PURE__ */ u("<thead><tr>"), je = /* @__PURE__ */ u("<tr><td class=win98-table-empty>No data available"), Fe = /* @__PURE__ */ u("<div class=win98-table-container><table><tbody>"), Ue = /* @__PURE__ */ u("<th>"), qe = /* @__PURE__ */ u("<tr>"), Ge = /* @__PURE__ */ u("<td class=win98-table-cell>");
function at(l) {
  const t = $({
    data: [],
    columns: [],
    striped: !1,
    bordered: !0,
    hoverable: !1,
    sortOrder: "asc"
  }, l), [e, r] = v(t, ["data", "columns", "striped", "bordered", "hoverable", "sortBy", "sortOrder", "onSort", "onRowClick", "selectedRow", "class", "children"]), n = p("win98-table", e.striped && "win98-table-striped", e.bordered && "win98-table-bordered", e.hoverable && "win98-table-hoverable", e.class), i = (o) => {
    o.sortable && e.onSort && e.onSort(o.key);
  }, a = (o) => e.sortBy === o ? e.sortOrder === "asc" ? " ▲" : " ▼" : "", s = (o, c, d) => c.render ? c.render(o[c.key], o, d) : o[c.key];
  return (() => {
    var o = Fe(), c = o.firstChild, d = c.firstChild;
    return N(c, n), _(c, r, !1, !0), f(c, w(y, {
      get when() {
        return P(() => !!e.columns)() && e.columns.length > 0;
      },
      get children() {
        var h = Ve(), g = h.firstChild;
        return f(g, w(T, {
          get each() {
            return e.columns;
          },
          children: (b) => (() => {
            var m = Ue();
            return m.$$click = () => i(b), f(m, () => b.header, null), f(m, () => a(b.key), null), C((x) => {
              var E = p("win98-table-header", b.sortable && "win98-table-sortable"), B = b.width ? typeof b.width == "number" ? `${b.width}px` : b.width : void 0;
              return E !== x.e && N(m, x.e = E), B !== x.t && M(m, "width", x.t = B), x;
            }, {
              e: void 0,
              t: void 0
            }), m;
          })()
        })), h;
      }
    }), d), f(d, w(y, {
      get when() {
        return P(() => !!e.data)() && e.data.length > 0;
      },
      get children() {
        return w(T, {
          get each() {
            return e.data;
          },
          children: (h, g) => (() => {
            var b = qe();
            return b.$$click = () => e.onRowClick?.(h, g()), f(b, w(T, {
              get each() {
                return e.columns;
              },
              children: (m) => (() => {
                var x = Ge();
                return f(x, () => s(h, m, g())), x;
              })()
            })), C(() => N(b, p("win98-table-row", e.selectedRow === g() && "win98-table-row-selected", e.onRowClick && "win98-table-row-clickable"))), b;
          })()
        });
      }
    }), null), f(d, w(y, {
      get when() {
        return !e.data || e.data.length === 0;
      },
      get children() {
        var h = je(), g = h.firstChild;
        return C(() => A(g, "colspan", e.columns?.length || 1)), h;
      }
    }), null), f(c, w(y, {
      get when() {
        return e.children;
      },
      get children() {
        return e.children;
      }
    }), null), o;
  })();
}
const ct = `
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
z(["click"]);
export {
  Xe as Button,
  Qe as Checkbox,
  Je as FieldRow,
  ot as Modal,
  lt as ProgressBar,
  Ze as Radio,
  et as Select,
  tt as Slider,
  Ye as StatusBar,
  nt as SunkenPanel,
  st as Tab,
  at as Table,
  rt as Tabs,
  it as TreeView,
  We as Window,
  ye as WindowHeader,
  p as cn,
  ct as tableStyles
};
