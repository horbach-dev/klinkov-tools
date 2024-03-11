
! function() {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
    new MutationObserver((e => {
      for (const r of e)
        if ("childList" === r.type)
          for (const e of r.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
    })).observe(document, {
      childList: !0,
      subtree: !0
    })
  }

  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = function(e) {
      const t = {};
      return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin", t
    }(e);
    fetch(e.href, t)
  }
}();
const e = {
    context: void 0,
    registry: void 0
  },
  t = (e, t) => e === t,
  r = Symbol("solid-proxy"),
  n = Symbol("solid-track"),
  o = {
    equals: t
  };
let i = P;
const a = 1,
  l = 2,
  s = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
  };
var c = null;
let u = null,
  d = null,
  h = null,
  p = null,
  g = 0;

function f(e, t) {
  const r = d,
    n = c,
    o = 0 === e.length,
    i = void 0 === t ? n : t,
    a = o ? s : {
      owned: null,
      cleanups: null,
      context: i ? i.context : null,
      owner: i
    },
    l = o ? e : () => e((() => w((() => E(a)))));
  c = a, d = null;
  try {
    return S(l, !0)
  } finally {
    d = r, c = n
  }
}

function v(e, t) {
  const r = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: (t = t ? Object.assign({}, o, t) : o).equals || void 0
  };
  return [M.bind(r), e => ("function" == typeof e && (e = e(r.value)), z(r, e))]
}

function m(e, t, r) {
  L(B(e, t, !1, a))
}

function b(e, t, r) {
  i = T;
  const n = B(e, t, !1, a);
  r && r.render || (n.user = !0), p ? p.push(n) : L(n)
}

function y(e, t, r) {
  r = r ? Object.assign({}, o, r) : o;
  const n = B(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, L(n), M.bind(n)
}

function w(e) {
  if (null === d) return e();
  const t = d;
  d = null;
  try {
    return e()
  } finally {
    d = t
  }
}

function _(e) {
  b((() => w(e)))
}

function k(e) {
  return null === c || (null === c.cleanups ? c.cleanups = [e] : c.cleanups.push(e)), e
}

function C() {
  return d
}

function x(e) {
  const t = y(e),
    r = y((() => N(t())));
  return r.toArray = () => {
    const e = r();
    return Array.isArray(e) ? e : null != e ? [e] : []
  }, r
}

function M() {
  if (this.sources && this.state)
    if (this.state === a) L(this);
    else {
      const e = h;
      h = null, S((() => F(this)), !1), h = e
    } if (d) {
    const e = this.observers ? this.observers.length : 0;
    d.sources ? (d.sources.push(this), d.sourceSlots.push(e)) : (d.sources = [this], d.sourceSlots = [e]), this.observers ? (this.observers.push(d), this.observerSlots.push(d.sources.length - 1)) : (this.observers = [d], this.observerSlots = [d.sources.length - 1])
  }
  return this.value
}

function z(e, t, r) {
  let n = e.value;
  return e.comparator && e.comparator(n, t) || (e.value = t, e.observers && e.observers.length && S((() => {
    for (let t = 0; t < e.observers.length; t += 1) {
      const r = e.observers[t],
        n = u && u.running;
      n && u.disposed.has(r), (n ? r.tState : r.state) || (r.pure ? h.push(r) : p.push(r), r.observers && H(r)), n || (r.state = a)
    }
    if (h.length > 1e6) throw h = [], new Error
  }), !1)), t
}

function L(e) {
  if (!e.fn) return;
  E(e);
  const t = g;
  ! function(e, t, r) {
    let n;
    const o = c,
      i = d;
    d = c = e;
    try {
      n = e.fn(t)
    } catch (l) {
      return e.pure && (e.state = a, e.owned && e.owned.forEach(E), e.owned = null), e.updatedAt = r + 1, D(l)
    } finally {
      d = i, c = o
    }(!e.updatedAt || e.updatedAt <= r) && (null != e.updatedAt && "observers" in e ? z(e, n) : e.value = n, e.updatedAt = r)
  }(e, e.value, t)
}

function B(e, t, r, n = a, o) {
  const i = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: c,
    context: c ? c.context : null,
    pure: r
  };
  return null === c || c !== s && (c.owned ? c.owned.push(i) : c.owned = [i]), i
}

function A(e) {
  if (0 === e.state) return;
  if (e.state === l) return F(e);
  if (e.suspense && w(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (;
    (e = e.owner) && (!e.updatedAt || e.updatedAt < g);) e.state && t.push(e);
  for (let r = t.length - 1; r >= 0; r--)
    if ((e = t[r]).state === a) L(e);
    else if (e.state === l) {
      const r = h;
      h = null, S((() => F(e, t[0])), !1), h = r
    }
}

function S(e, t) {
  if (h) return e();
  let r = !1;
  t || (h = []), p ? r = !0 : p = [], g++;
  try {
    const t = e();
    return function(e) {
      h && (P(h), h = null);
      if (e) return;
      const t = p;
      p = null, t.length && S((() => i(t)), !1)
    }(r), t
  } catch (n) {
    r || (p = null), h = null, D(n)
  }
}

function P(e) {
  for (let t = 0; t < e.length; t++) A(e[t])
}

function T(e) {
  let t, r = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[r++] = n : A(n)
  }
  for (t = 0; t < r; t++) A(e[t])
}

function F(e, t) {
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const n = e.sources[r];
    if (n.sources) {
      const e = n.state;
      e === a ? n !== t && (!n.updatedAt || n.updatedAt < g) && A(n) : e === l && F(n, t)
    }
  }
}

function H(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const r = e.observers[t];
    r.state || (r.state = l, r.pure ? h.push(r) : p.push(r), r.observers && H(r))
  }
}

function E(e) {
  let t;
  if (e.sources)
    for (; e.sources.length;) {
      const t = e.sources.pop(),
        r = e.sourceSlots.pop(),
        n = t.observers;
      if (n && n.length) {
        const e = n.pop(),
          o = t.observerSlots.pop();
        r < n.length && (e.sourceSlots[o] = r, n[r] = e, t.observerSlots[r] = o)
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) E(e.owned[t]);
    e.owned = null
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null
  }
  e.state = 0
}

function D(e, t = c) {
  const r = function(e) {
    return e instanceof Error ? e : new Error("string" == typeof e ? e : "Unknown error", {
      cause: e
    })
  }(e);
  throw r
}

function N(e) {
  if ("function" == typeof e && !e.length) return N(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let r = 0; r < e.length; r++) {
      const n = N(e[r]);
      Array.isArray(n) ? t.push.apply(t, n) : t.push(n)
    }
    return t
  }
  return e
}
const O = Symbol("fallback");

function V(e) {
  for (let t = 0; t < e.length; t++) e[t]()
}

function R(e, t) {
  return w((() => e(t || {})))
}
const j = e => "Stale read from <".concat(e, ">.");

function I(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return y(function(e, t, r = {}) {
    let o = [],
      i = [],
      a = [],
      l = 0,
      s = t.length > 1 ? [] : null;
    return k((() => V(a))), () => {
      let c, u, d = e() || [];
      return d[n], w((() => {
        let e, t, n, p, g, v, m, b, y, w = d.length;
        if (0 === w) 0 !== l && (V(a), a = [], o = [], i = [], l = 0, s && (s = [])), r.fallback && (o = [O], i[0] = f((e => (a[0] = e, r.fallback()))), l = 1);
        else if (0 === l) {
          for (i = new Array(w), u = 0; u < w; u++) o[u] = d[u], i[u] = f(h);
          l = w
        } else {
          for (n = new Array(w), p = new Array(w), s && (g = new Array(w)), v = 0, m = Math.min(l, w); v < m && o[v] === d[v]; v++);
          for (m = l - 1, b = w - 1; m >= v && b >= v && o[m] === d[b]; m--, b--) n[b] = i[m], p[b] = a[m], s && (g[b] = s[m]);
          for (e = new Map, t = new Array(b + 1), u = b; u >= v; u--) y = d[u], c = e.get(y), t[u] = void 0 === c ? -1 : c, e.set(y, u);
          for (c = v; c <= m; c++) y = o[c], u = e.get(y), void 0 !== u && -1 !== u ? (n[u] = i[c], p[u] = a[c], s && (g[u] = s[c]), u = t[u], e.set(y, u)) : a[c]();
          for (u = v; u < w; u++) u in n ? (i[u] = n[u], a[u] = p[u], s && (s[u] = g[u], s[u](u))) : i[u] = f(h);
          i = i.slice(0, l = w), o = d.slice(0)
        }
        return i
      }));

      function h(e) {
        if (a[u] = e, s) {
          const [e, r] = v(u);
          return s[u] = r, t(d[u], e)
        }
        return t(d[u])
      }
    }
  }((() => e.each), e.children, t || void 0))
}

function U(e) {
  const t = e.keyed,
    r = y((() => e.when), void 0, {
      equals: (e, r) => t ? e === r : !e == !r
    });
  return y((() => {
    const n = r();
    if (n) {
      const o = e.children;
      return "function" == typeof o && o.length > 0 ? w((() => o(t ? n : () => {
        if (!w(r)) throw j("Show");
        return e.when
      }))) : o
    }
    return e.fallback
  }), void 0, void 0)
}

function $(e) {
  let t = !1;
  const r = x((() => e.children)),
    n = y((() => {
      let e = r();
      Array.isArray(e) || (e = [e]);
      for (let r = 0; r < e.length; r++) {
        const n = e[r].when;
        if (n) return t = !!e[r].keyed, [r, n, e[r]]
      }
      return [-1]
    }), void 0, {
      equals: (e, r) => (t ? e[1] === r[1] : !e[1] == !r[1]) && e[2] === r[2]
    });
  return y((() => {
    const [r, o, i] = n();
    if (r < 0) return e.fallback;
    const a = i.children;
    return "function" == typeof a && a.length > 0 ? w((() => a(t ? o : () => {
      if (w(n)[0] !== r) throw j("Match");
      return i.when
    }))) : a
  }), void 0, void 0)
}

function X(e) {
  return e
}
const W = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]),
  Y = new Set(["innerHTML", "textContent", "innerText", "children"]),
  G = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for"
  }),
  Z = Object.assign(Object.create(null), {
    class: "className",
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
    }
  });
const q = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
  K = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
  };
const J = "_$DX_DELEGATE";

function Q(e, t, r) {
  try {
    let n;
    const o = () => {
          const t = document.createElement("template");
          return t.innerHTML = e, r ? t.content.firstChild.firstChild : t.content.firstChild
        },
        i = t ? () => w((() => document.importNode(n || (n = o()), !0))) : () => (n || (n = o())).cloneNode(!0);
    return i.cloneNode = i, i
  }
  catch (e) {
    console.log(e)
  }

}

function ee(e, t = window.document) {
  const r = t[J] || (t[J] = new Set);
  for (let n = 0, o = e.length; n < o; n++) {
    const o = e[n];
    r.has(o) || (r.add(o), t.addEventListener(o, ce))
  }
}

function te(e, t, r) {
  null == r ? e.removeAttribute(t) : e.setAttribute(t, r)
}

function re(e, t) {
  null == t ? e.removeAttribute("class") : e.className = t
}

function ne(e, t, r) {
  if (!t) return r ? te(e, "style") : t;
  const n = e.style;
  if ("string" == typeof t) return n.cssText = t;
  let o, i;
  for (i in "string" == typeof r && (n.cssText = r = void 0), r || (r = {}), t || (t = {}), r) null == t[i] && n.removeProperty(i), delete r[i];
  for (i in t) o = t[i], o !== r[i] && (n.setProperty(i, o), r[i] = o);
  return r
}

function oe(e, t = {}, r, n) {
  const o = {};
  return n || m((() => o.children = ue(e, t.children, o.children))), m((() => t.ref && t.ref(e))), m((() => function(e, t, r, n, o = {}, i = !1) {
    t || (t = {});
    for (const a in o)
      if (!(a in t)) {
        if ("children" === a) continue;
        o[a] = se(e, a, null, o[a], r, i)
      } for (const a in t) {
      if ("children" === a) {
        n || ue(e, t.children);
        continue
      }
      const l = t[a];
      o[a] = se(e, a, l, o[a], r, i)
    }
  }(e, t, r, !0, o, !0))), o
}

function ie(e, t, r) {
  return w((() => e(t, r)))
}

function ae(e, t, r, n) {
  if (void 0 === r || n || (n = []), "function" != typeof t) return ue(e, t, n, r);
  m((n => ue(e, t(), n, r)), n)
}

function le(e, t, r) {
  const n = t.trim().split(/\s+/);
  for (let o = 0, i = n.length; o < i; o++) e.classList.toggle(n[o], r)
}

function se(e, t, r, n, o, i) {
  let a, l, s, c, u;
  if ("style" === t) return ne(e, r, n);
  if ("classList" === t) return function(e, t, r = {}) {
    const n = Object.keys(t || {}),
      o = Object.keys(r);
    let i, a;
    for (i = 0, a = o.length; i < a; i++) {
      const n = o[i];
      n && "undefined" !== n && !t[n] && (le(e, n, !1), delete r[n])
    }
    for (i = 0, a = n.length; i < a; i++) {
      const o = n[i],
        a = !!t[o];
      o && "undefined" !== o && r[o] !== a && a && (le(e, o, !0), r[o] = a)
    }
    return r
  }(e, r, n);
  if (r === n) return n;
  if ("ref" === t) i || r(e);
  else if ("on:" === t.slice(0, 3)) {
    const o = t.slice(3);
    n && e.removeEventListener(o, n), r && e.addEventListener(o, r)
  } else if ("oncapture:" === t.slice(0, 10)) {
    const o = t.slice(10);
    n && e.removeEventListener(o, n, !0), r && e.addEventListener(o, r, !0)
  } else if ("on" === t.slice(0, 2)) {
    const o = t.slice(2).toLowerCase(),
      i = q.has(o);
    if (!i && n) {
      const t = Array.isArray(n) ? n[0] : n;
      e.removeEventListener(o, t)
    }(i || r) && (! function(e, t, r, n) {
      if (n) Array.isArray(r) ? (e["$$".concat(t)] = r[0], e["$$".concat(t, "Data")] = r[1]) : e["$$".concat(t)] = r;
      else if (Array.isArray(r)) {
        const n = r[0];
        e.addEventListener(t, r[0] = t => n.call(e, r[1], t))
      } else e.addEventListener(t, r)
    }(e, o, r, i), i && ee([o]))
  } else if ("attr:" === t.slice(0, 5)) te(e, t.slice(5), r);
  else if ((u = "prop:" === t.slice(0, 5)) || (s = Y.has(t)) || !o && ((c = function(e, t) {
    const r = Z[e];
    return "object" == typeof r ? r[t] ? r.$ : void 0 : r
  }(t, e.tagName)) || (l = W.has(t))) || (a = e.nodeName.includes("-"))) u && (t = t.slice(5), l = !0), "class" === t || "className" === t ? re(e, r) : !a || l || s ? e[c || t] = r : e[(d = t, d.toLowerCase().replace(/-([a-z])/g, ((e, t) => t.toUpperCase())))] = r;
  else {
    const n = o && t.indexOf(":") > -1 && K[t.split(":")[0]];
    n ? function(e, t, r, n) {
      null == n ? e.removeAttributeNS(t, r) : e.setAttributeNS(t, r, n)
    }(e, n, t, r) : te(e, G[t] || t, r)
  }
  var d;
  return r
}



function ce(e) {
  const t = "$$".concat(e.type);
  let r = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== r && Object.defineProperty(e, "target", {
    configurable: !0,
    value: r
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get: () => r || document
  }); r;) {
    const n = r[t];
    if (n && !r.disabled) {
      const o = r["".concat(t, "Data")];
      if (void 0 !== o ? n.call(r, o, e) : n.call(r, e), e.cancelBubble) return
    }
    r = r._$host || r.parentNode || r.host
  }
}

function ue(e, t, r, n, o) {
  for (;
    "function" == typeof r;) r = r();
  if (t === r) return r;
  const i = typeof t,
    a = void 0 !== n;
  if (e = a && r[0] && r[0].parentNode || e, "string" === i || "number" === i)
    if ("number" === i && (t = t.toString()), a) {
      let o = r[0];
      o && 3 === o.nodeType ? o.data !== t && (o.data = t) : o = document.createTextNode(t), r = pe(e, r, n, o)
    } else r = "" !== r && "string" == typeof r ? e.firstChild.data = t : e.textContent = t;
  else if (null == t || "boolean" === i) r = pe(e, r, n);
  else {
    if ("function" === i) return m((() => {
      let o = t();
      for (;
        "function" == typeof o;) o = o();
      r = ue(e, o, r, n)
    })), () => r;
    if (Array.isArray(t)) {
      const i = [],
        l = r && Array.isArray(r);
      if (de(i, t, r, o)) return m((() => r = ue(e, i, r, n, !0))), () => r;
      if (0 === i.length) {
        if (r = pe(e, r, n), a) return r
      } else l ? 0 === r.length ? he(e, i, n) : function(e, t, r) {
        let n = r.length,
          o = t.length,
          i = n,
          a = 0,
          l = 0,
          s = t[o - 1].nextSibling,
          c = null;
        for (; a < o || l < i;)
          if (t[a] !== r[l]) {
            for (; t[o - 1] === r[i - 1];) o--, i--;
            if (o === a) {
              const t = i < n ? l ? r[l - 1].nextSibling : r[i - l] : s;
              for (; l < i;) e.insertBefore(r[l++], t)
            } else if (i === l)
              for (; a < o;) c && c.has(t[a]) || t[a].remove(), a++;
            else if (t[a] === r[i - 1] && r[l] === t[o - 1]) {
              const n = t[--o].nextSibling;
              e.insertBefore(r[l++], t[a++].nextSibling), e.insertBefore(r[--i], n), t[o] = r[i]
            } else {
              if (!c) {
                c = new Map;
                let e = l;
                for (; e < i;) c.set(r[e], e++)
              }
              const n = c.get(t[a]);
              if (null != n)
                if (l < n && n < i) {
                  let s, u = a,
                    d = 1;
                  for (; ++u < o && u < i && null != (s = c.get(t[u])) && s === n + d;) d++;
                  if (d > n - l) {
                    const o = t[a];
                    for (; l < n;) e.insertBefore(r[l++], o)
                  } else e.replaceChild(r[l++], t[a++])
                } else a++;
              else t[a++].remove()
            }
          } else a++, l++
      }(e, r, i) : (r && pe(e), he(e, i));
      r = i
    } else if (t.nodeType) {
      if (Array.isArray(r)) {
        if (a) return r = pe(e, r, n, t);
        pe(e, r, null, t)
      } else null != r && "" !== r && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
      r = t
    }
  }
  return r
}

function de(e, t, r, n) {
  let o = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let a, l = t[i],
      s = r && r[i];
    if (null == l || !0 === l || !1 === l);
    else if ("object" == (a = typeof l) && l.nodeType) e.push(l);
    else if (Array.isArray(l)) o = de(e, l, s) || o;
    else if ("function" === a)
      if (n) {
        for (;
          "function" == typeof l;) l = l();
        o = de(e, Array.isArray(l) ? l : [l], Array.isArray(s) ? s : [s]) || o
      } else e.push(l), o = !0;
    else {
      const t = String(l);
      s && 3 === s.nodeType && s.data === t ? e.push(s) : e.push(document.createTextNode(t))
    }
  }
  return o
}

function he(e, t, r = null) {
  for (let n = 0, o = t.length; n < o; n++) e.insertBefore(t[n], r)
}

function pe(e, t, r, n) {
  if (void 0 === r) return e.textContent = "";
  const o = n || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const a = t[i];
      if (o !== a) {
        const t = a.parentNode === e;
        n || i ? t && a.remove() : t ? e.replaceChild(o, a) : e.insertBefore(o, r)
      } else n = !0
    }
  } else e.insertBefore(o, r);
  return [o]
}
const ge = "http://www.w3.org/2000/svg";

function fe(t) {
  const {
    useShadow: r
  } = t, n = document.createTextNode(""), o = c;
  let i;
  return b((() => {
    i || (i = function(e, t) {
      const r = c,
        n = d;
      c = e, d = null;
      try {
        return S(t, !0)
      } catch (o) {
        D(o)
      } finally {
        c = r, d = n
      }
    }(o, (() => y((() => t.children)))));
    const e = t.mount || document.body;
    if (e instanceof HTMLHeadElement) {
      const [t, r] = v(!1), n = () => r(!0);
      f((r => ae(e, (() => t() ? r() : i()), null))), k(n)
    } else {
      const o = function(e, t = !1) {
          return t ? document.createElementNS(ge, e) : document.createElement(e)
        }(t.isSVG ? "g" : "div", t.isSVG),
        a = r && o.attachShadow ? o.attachShadow({
          mode: "open"
        }) : o;
      Object.defineProperty(o, "_$host", {
        get: () => n.parentNode,
        configurable: !0
      }), ae(a, i), e.appendChild(o), t.ref && t.ref(o), k((() => e.removeChild(o)))
    }
  }), void 0, {
    render: !!!e.context
  }), n
}
const ve = Symbol("store-raw"),
  me = Symbol("store-node"),
  be = Symbol("store-has"),
  ye = Symbol("store-self");

function we(e) {
  let t = e[r];
  if (!t && (Object.defineProperty(e, r, {
    value: t = new Proxy(e, ze)
  }), !Array.isArray(e))) {
    const r = Object.keys(e),
      n = Object.getOwnPropertyDescriptors(e);
    for (let o = 0, i = r.length; o < i; o++) {
      const i = r[o];
      n[i].get && Object.defineProperty(e, i, {
        enumerable: n[i].enumerable,
        get: n[i].get.bind(t)
      })
    }
  }
  return t
}

function _e(e) {
  let t;
  return null != e && "object" == typeof e && (e[r] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}

function ke(e, t = new Set) {
  let r, n, o, i;
  if (r = null != e && e[ve]) return r;
  if (!_e(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let r = 0, i = e.length; r < i; r++) o = e[r], (n = ke(o, t)) !== o && (e[r] = n)
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const r = Object.keys(e),
      a = Object.getOwnPropertyDescriptors(e);
    for (let l = 0, s = r.length; l < s; l++) i = r[l], a[i].get || (o = e[i], (n = ke(o, t)) !== o && (e[i] = n))
  }
  return e
}

function Ce(e, t) {
  let r = e[t];
  return r || Object.defineProperty(e, t, {
    value: r = Object.create(null)
  }), r
}

function xe(e, t, r) {
  if (e[t]) return e[t];
  const [n, o] = v(r, {
    equals: !1,
    internal: !0
  });
  return n.$ = o, e[t] = n
}

function Me(e) {
  C() && xe(Ce(e, me), ye)()
}
const ze = {
  get(e, t, o) {
    if (t === ve) return e;
    if (t === r) return o;
    if (t === n) return Me(e), o;
    const i = Ce(e, me),
      a = i[t];
    let l = a ? a() : e[t];
    if (t === me || t === be || "__proto__" === t) return l;
    if (!a) {
      const r = Object.getOwnPropertyDescriptor(e, t);
      !C() || "function" == typeof l && !e.hasOwnProperty(t) || r && r.get || (l = xe(i, t, l)())
    }
    return _e(l) ? we(l) : l
  },
  has: (e, t) => t === ve || t === r || t === n || t === me || t === be || "__proto__" === t || (C() && xe(Ce(e, be), t)(), t in e),
  set: () => !0,
  deleteProperty: () => !0,
  ownKeys: function(e) {
    return Me(e), Reflect.ownKeys(e)
  },
  getOwnPropertyDescriptor: function(e, t) {
    const n = Reflect.getOwnPropertyDescriptor(e, t);
    return n && !n.get && n.configurable && t !== r && t !== me ? (delete n.value, delete n.writable, n.get = () => e[r][t], n) : n
  }
};

function Le(e, t, r, n = !1) {
  if (!n && e[t] === r) return;
  const o = e[t],
    i = e.length;
  void 0 === r ? (delete e[t], e[be] && e[be][t] && void 0 !== o && e[be][t].$()) : (e[t] = r, e[be] && e[be][t] && void 0 === o && e[be][t].$());
  let a, l = Ce(e, me);
  if ((a = xe(l, t, o)) && a.$((() => r)), Array.isArray(e) && e.length !== i) {
    for (let t = e.length; t < i; t++)(a = l[t]) && a.$();
    (a = xe(l, "length", i)) && a.$(e.length)
  }(a = l[ye]) && a.$()
}

function Be(e, t) {
  const r = Object.keys(t);
  for (let n = 0; n < r.length; n += 1) {
    const o = r[n];
    Le(e, o, t[o])
  }
}

function Ae(e, t, r = []) {
  let n, o = e;
  if (t.length > 1) {
    n = t.shift();
    const i = typeof n,
      a = Array.isArray(e);
    if (Array.isArray(n)) {
      for (let o = 0; o < n.length; o++) Ae(e, [n[o]].concat(t), r);
      return
    }
    if (a && "function" === i) {
      for (let o = 0; o < e.length; o++) n(e[o], o) && Ae(e, [o].concat(t), r);
      return
    }
    if (a && "object" === i) {
      const {
        from: o = 0,
        to: i = e.length - 1,
        by: a = 1
      } = n;
      for (let n = o; n <= i; n += a) Ae(e, [n].concat(t), r);
      return
    }
    if (t.length > 1) return void Ae(e[n], t, [n].concat(r));
    o = e[n], r = [n].concat(r)
  }
  let i = t[0];
  "function" == typeof i && (i = i(o, r), i === o) || void 0 === n && null == i || (i = ke(i), void 0 === n || _e(o) && _e(i) && !Array.isArray(i) ? Be(o, i) : Le(e, n, i))
}

function Se(...[e, t]) {
  const r = ke(e || {}),
    n = Array.isArray(r);
  return [we(r), function(...e) {
    S((() => {
      n && 1 === e.length ? function(e, t) {
        if ("function" == typeof t && (t = t(e)), t = ke(t), Array.isArray(t)) {
          if (e === t) return;
          let r = 0,
            n = t.length;
          for (; r < n; r++) {
            const n = t[r];
            e[r] !== n && Le(e, r, n)
          }
          Le(e, "length", n)
        } else Be(e, t)
      }(r, e[0]) : Ae(r, e)
    }), !1)
  }]
}
const Pe = Symbol("store-root");

function Te(e, t, r, n, o) {
  const i = t[r];
  if (e === i) return;
  const a = Array.isArray(e);
  if (r !== Pe && (!_e(e) || !_e(i) || a !== Array.isArray(i) || o && e[o] !== i[o])) return void Le(t, r, e);
  if (a) {
    if (e.length && i.length && (!n || o && e[0] && null != e[0][o])) {
      let t, r, a, l, s, c, u, d;
      for (a = 0, l = Math.min(i.length, e.length); a < l && (i[a] === e[a] || o && i[a] && e[a] && i[a][o] === e[a][o]); a++) Te(e[a], i, a, n, o);
      const h = new Array(e.length),
        p = new Map;
      for (l = i.length - 1, s = e.length - 1; l >= a && s >= a && (i[l] === e[s] || o && i[a] && e[a] && i[l][o] === e[s][o]); l--, s--) h[s] = i[l];
      if (a > s || a > l) {
        for (r = a; r <= s; r++) Le(i, r, e[r]);
        for (; r < e.length; r++) Le(i, r, h[r]), Te(e[r], i, r, n, o);
        return void(i.length > e.length && Le(i, "length", e.length))
      }
      for (u = new Array(s + 1), r = s; r >= a; r--) c = e[r], d = o && c ? c[o] : c, t = p.get(d), u[r] = void 0 === t ? -1 : t, p.set(d, r);
      for (t = a; t <= l; t++) c = i[t], d = o && c ? c[o] : c, r = p.get(d), void 0 !== r && -1 !== r && (h[r] = i[t], r = u[r], p.set(d, r));
      for (r = a; r < e.length; r++) r in h ? (Le(i, r, h[r]), Te(e[r], i, r, n, o)) : Le(i, r, e[r])
    } else
      for (let t = 0, r = e.length; t < r; t++) Te(e[t], i, t, n, o);
    return void(i.length > e.length && Le(i, "length", e.length))
  }
  const l = Object.keys(e);
  for (let c = 0, u = l.length; c < u; c++) Te(e[l[c]], i, l[c], n, o);
  const s = Object.keys(i);
  for (let c = 0, u = s.length; c < u; c++) void 0 === e[s[c]] && Le(i, s[c], void 0)
}

function Fe(e, t = {}) {
  const {
    merge: r,
    key: n = "id"
  } = t, o = ke(e);
  return e => {
    if (!_e(e) || !_e(o)) return o;
    const t = Te(o, {
      [Pe]: e
    }, Pe, r, n);
    return void 0 === t ? e : t
  }
}
let He = Date.now();

function Ee() {
  return "".concat(Date.now())
}

function De(e, t) {
  return {
    id: Ee(),
    name: "",
    color: "performance",
    content: "performance",
    size: t,
    period: e
  }
}
var Ne = Q('<svg viewBox="0 0 2500 2500"><path fill=#fdd430 d=M764.48,1050.52,1250,565l485.75,485.73,282.5-282.5L1250,0,482,768l282.49,282.5M0,1250,282.51,967.45,565,1249.94,282.49,1532.45Zm764.48,199.51L1250,1935l485.74-485.72,282.65,282.35-.14.15L1250,2500,482,1732l-.4-.4,282.91-282.12M1935,1250.12l282.51-282.51L2500,1250.1,2217.5,1532.61Z></path><path fill=#fdd430 d=M1536.52,1249.85h.12L1250,963.19,1038.13,1175h0l-24.34,24.35-50.2,50.21-.4.39.4.41L1250,1536.81l286.66-286.66.14-.16-.26-.14>');
var Oe = Q('<svg viewBox="8 8 84 84"><path fill=#F7A600 d=m69.17248,54.28325l0,-22.3572l4.4939,0l0,22.3572l-4.4939,0z></path><path fill=white d="m16.79825,60.92435l-9.63407,0l0,-22.35719l9.24666,0c4.49394,0 7.11244,2.44919 7.11244,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.1679,2.0404 3.1679,5.0249c0,4.1749 -2.9407,6.4359 -7.04723,6.4359zm-0.74311,-18.4628l-4.39706,0l0,5.1497l4.39706,0c1.90714,0 2.97424,-1.0364 2.97424,-2.5757c0,-1.5376 -1.0671,-2.574 -2.97424,-2.574zm0.29055,9.0749l-4.68761,0l0,5.4952l4.68761,0c2.03739,0 3.00589,-1.2553 3.00589,-2.7638c0,-1.5068 -0.9703,-2.7314 -3.00589,-2.7314z"></path><path fill=white d=m37.55238,51.75535l0,9.169l-4.4622,0l0,-9.169l-6.9187,-13.18819l4.8813,0l4.3002,9.01159l4.2351,-9.01159l4.8813,0l-6.917,13.18819z></path><path fill=white d="m57.20988,60.92435l-9.6341,0l0,-22.35719l9.2467,0c4.4939,0 7.1124,2.44919 7.1124,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.168,2.0404 3.168,5.0249c0,4.1749 -2.9408,6.4359 -7.0473,6.4359zm-0.7431,-18.4628l-4.3971,0l0,5.1497l4.3971,0c1.9071,0 2.9742,-1.0364 2.9742,-2.5757c0,-1.5376 -1.0671,-2.574 -2.9742,-2.574zm0.2905,9.0749l-4.6876,0l0,5.4952l4.6876,0c2.0374,0 3.0059,-1.2553 3.0059,-2.7638c0,-1.5068 -0.9685,-2.7314 -3.0059,-2.7314z"></path><path fill=white d=m88.15018,42.46155l0,18.4645l-4.4939,0l0,-18.4645l-6.0136,0l0,-3.89439l16.5211,0l0,3.89439l-6.0136,0z>');
var Ve = Q('<svg viewBox="62 62 900 900"><path d="M512.147 692C412.697 692 332.146 611.45 332.146 512C332.146 412.55 412.697 332 512.147 332C601.247 332 675.197 396.95 689.447 482H870.797C855.497 297.2 700.846 152 512.147 152C313.396 152 152.146 313.25 152.146 512C152.146 710.75 313.396 872 512.147 872C700.846 872 855.497 726.8 870.797 542H689.297C675.047 627.05 601.247 692 512.147 692Z"fill=#fff>');
var Re = Q('<svg viewBox="0 0 229 229"><path fill=#2354e6 d="M114.475154,177.475321 C79.7034538,177.475321 51.5151256,149.282841 51.5151256,114.500713 C51.5151256,79.7209602 79.7034538,51.5237291 114.475154,51.5237291 L114.475154,-0.000950201555 C51.2515057,-0.000950201555 -1.68750626e-14,51.2624237 -1.68750626e-14,114.500713 C-1.68750626e-14,177.736626 51.2515057,229 114.475154,229 C177.696428,229 228.950308,177.736626 228.950308,114.500713 L177.435183,114.500713 C177.435183,149.282841 149.246855,177.475321 114.475154,177.475321"></path><polygon fill=#17E6A1 points="114.474679 114.499287 177.434708 114.499287 177.434708 51.5246793 114.474679 51.5246793">');
var je = Q('<svg viewBox="0 0 24 24"><path fill=#24ae8f d="m7.9 12 7.1 6.5 4.5-4.1a2 1.9 0 1 1 2.9 2.6l-5.9 5.4a2.1 1.9 0 0 1-2.9 0l-8.5-7.8v4.7a2 1.9 0 1 1-4.1 0v-15a2 1.9 0 1 1 4.1 0v4.7l8.5-7.8a2.1 1.9 0 0 1 2.9 0l5.9 5.4a2 1.9 0 1 1-2.9 2.6l-4.5-4.1zm7.1-1.9a2 1.9 0 1 0 2 1.9 2 1.9 0 0 0-2-1.9z">');
var Ie = Q('<svg viewBox="0 0 2500 2500"><path d="M2459.7,1566.6l-540.6-937.7c-118.5-195.5-407.5-197.5-521.9,8.3l-567.6,975.2 c-106,178.8,25,403.3,237.1,403.3H2204C2418.1,2015.7,2578.2,1784.9,2459.7,1566.6z"fill=#3156AA></path><path d="M1680,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-457.4-794.3C971,439.7,690.3,425.1,571.8,647.6 L39.5,1568.7c-110.2,193.4,20.8,444.9,259.9,447h1131.1h482.4h286.9C1906.7,2017.8,1813.1,1866,1680,1639.4L1680,1639.4z"fill=#1972E2></path><path d="M1680.1,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-295.3-519.8l-424.2,723.6 c-106,178.8,25,403.4,237,403.4h363.9h482.4h289C1904.6,2015.7,1813.1,1866,1680.1,1639.4L1680.1,1639.4z"fill=#2B5DB8>');
var Ue = Q('<svg viewBox="0 0 24 24"><rect x=1 y=1 width=22 height=22 fill=#000></rect><rect x=6 y=6 width=4 height=4 fill=#fff></rect><rect x=14 y=6 width=4 height=4 fill=#fff></rect><rect x=10 y=10 width=4 height=4 fill=#fff></rect><rect x=6 y=14 width=4 height=4 fill=#fff></rect><rect x=14 y=14 width=4 height=4 fill=#fff>');
var $e = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#055e1c d="M0 85.333h512v341.333H0z"></path><g fill=#FFF><path d="M183.548 289.386c0 12.295 9.731 22.261 21.736 22.261h65.208c0 10.244 8.11 18.551 18.114 18.551h21.736c10.004 0 18.114-8.306 18.114-18.551v-22.261H183.548zM330.264 181.791v51.942c0 8.183-6.5 14.84-14.491 14.84v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.942h-21.735zM174.491 233.734c0 8.183-6.5 14.84-14.491 14.84v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.942H174.49v51.942z"></path><path d="M297.661 181.788h21.736v51.942h-21.736zM265.057 211.473c0 2.046-1.625 3.71-3.623 3.71-1.998 0-3.623-1.664-3.623-3.71v-29.682h-21.736v29.682c0 2.046-1.625 3.71-3.623 3.71s-3.623-1.664-3.623-3.71v-29.682h-21.736v29.682c0 14.32 11.376 25.971 25.358 25.971 5.385 0 10.38-1.733 14.491-4.677 4.11 2.944 9.106 4.677 14.491 4.677 1.084 0 2.15-.078 3.2-.215-1.54 6.499-7.255 11.345-14.068 11.345v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.943h-21.736l.002 29.682z"></path><path d="M207.093 248.57h32.601v22.261h-32.601z">');
const Xe = {
  id: "ar",
  flag: () => $e(),
  name: "العربية",
  loading: "جاري تحميل المحتوى...",
  currencyName: "أسم",
  settings: "الإعدادات",
  currency: "عملة",
  language: "لغة",
  colors: "الألوان",
  red_green: "أحمر + أخضر",
  yellow_blue: "أصفر + أزرق",
  rank: "الرتبة",
  marketcap: "القيمة السوقية",
  volume: "الحجم س24",
  price: "السعر",
  dominance: "الهيمنة",
  performance: "الاداء",
  neutral: "طبيعي",
  period_hour: "ساعة",
  period_day: "يوم",
  period_week: "أسبوع",
  period_month: "شهر",
  period_year: "سنة",
  favorites: "المفضلة",
  add_favorite: "إضافة إلى المفضلة",
  remove_favorite: "حذف من المفضلة",
  search_crypto: "البحث عن العملة الرقمية",
  bubble_size: "حجم الفقاعة",
  bubble_content: "محتوى الفقاعة",
  bubble_color: "لون الفقاعة",
  period: "الوقت",
  description: "أكثر 1000 فقاعة نشطة",
  support_my_work: "لدعم المشروع",
  window_close: "لون النافذة",
  window_toggleExpand: "تقليص التوسع",
  configuration_add: "إضافة السلة",
  configuration_edit: "تعديل السلة",
  copy: "نسخ",
  not_found: "ليس موجود في افضل 1000 عملة",
  links: "الروابط",
  exchanges: "التبادلات",
  pages: "الصفحات",
  empty_list: "القائمة فارغة",
  delete: "حذف",
  lists: "قوائم",
  show: "عرض",
  hide: "إخفاء",
  watchlist_add: "إضافة إلى قائمة المراقبة",
  add_to_list: "إضافة إلى قائمة",
  blocklist: "قائمة الحظر",
  watchlist: "قائمة المراقبة",
  watchlists: "قوائم المراقبة",
  cancel: "إلغاء",
  confirm: "تأكيد",
  trade: "تداول",
  info_tooltip: "عرض (currency) على (service)",
  trade_tooltip: "تداول (currency) على (exchange)",
  show_more: "عرض المزيد"
};
var We = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#D80027 d="M0 0h513v342H0z"></path><path fill=#FFDA44 d="m226.8 239.2-9.7-15.6-17.9 4.4 11.9-14.1-9.7-15.6 17.1 6.9 11.8-14.1-1.3 18.4 17.1 6.9-17.9 4.4zM290.6 82l-10.1 15.4 11.6 14.3-17.7-4.8-10.1 15.5-1-18.4-17.7-4.8 17.2-6.6-1-18.4 11.6 14.3zM236.2 25.4l-2 18.3 16.8 7.6-18 3.8-2 18.3-9.2-16-17.9 3.8 12.3-13.7-9.2-15.9 16.8 7.5zM292.8 161.8l-14.9 10.9 5.8 17.5-14.9-10.8-14.9 11 5.6-17.6-14.9-10.7 18.4-.1 5.6-17.6 5.8 17.5zM115 46.3l17.3 53.5h56.2l-45.4 32.9 17.3 53.5-45.4-33-45.5 33 17.4-53.5-45.5-32.9h56.3z">');
const Ye = {
  id: "zh",
  flag: () => We(),
  name: "简体中文",
  loading: "内容正在加载...",
  currencyName: "货币名称",
  settings: "设置",
  currency: "货币",
  language: "语言",
  colors: "颜色",
  red_green: "红+绿",
  yellow_blue: "黄色+蓝色",
  rank: "排名",
  marketcap: "市值",
  volume: "24小时成交量",
  price: "价格",
  dominance: "支配地位",
  performance: "性能",
  neutral: "中性",
  period_hour: "小时",
  period_day: "天",
  period_week: "周",
  period_month: "月",
  period_year: "年",
  favorites: "收藏夹",
  add_favorite: "添加到收藏夹",
  remove_favorite: "从收藏中删除",
  search_crypto: "搜索加密货币",
  bubble_size: "气泡大小",
  bubble_content: "气泡内容",
  bubble_color: "气泡颜色",
  period: "期间",
  description: "TOP1000加密货币的交互式气泡图",
  support_my_work: "支持我的工作",
  window_close: "关闭窗口",
  window_toggleExpand: "切换扩展",
  configuration_add: "添加图表",
  configuration_edit: "编辑图表",
  copy: "复制",
  not_found: "在 TOP 1000 中找不到",
  links: "链接",
  exchanges: "交流",
  pages: "页面",
  empty_list: "清单为空",
  delete: "删除",
  lists: "列表",
  show: "显示",
  hide: "隐藏",
  watchlist_add: "添加监视列表",
  add_to_list: "添加到列表",
  blocklist: "屏蔽列表",
  watchlist: "监视列表",
  watchlists: "监视列表",
  cancel: "取消",
  confirm: "确认",
  trade: "交易",
  info_tooltip: "在(service)上查看(currency)",
  trade_tooltip: "在(exchange)上交易(currency)",
  show_more: "显示更多"
};
var Ge = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#11457e d="M0 0h513v342H0z"></path><path fill=#d7141a d="M513 171v171H0l215-171z"></path><path fill=#FFF d="M513 0v171H215.185L0 0z">');
const Ze = {
  id: "cs",
  flag: () => Ge(),
  name: "Čeština",
  loading: "Obsah se načítá...",
  currencyName: "Název",
  settings: "Nastavení",
  currency: "Měna",
  language: "Jazyk",
  colors: "Barvy",
  red_green: "Červená + Zelená",
  yellow_blue: "Žlutá + Modrá",
  rank: "Pořadí",
  marketcap: "Tržní kapitalizace",
  volume: "Denní objem",
  price: "Cena",
  dominance: "Dominance",
  performance: "Výkon",
  neutral: "Neutrální",
  period_hour: "Hodina",
  period_day: "Den",
  period_week: "Týden",
  period_month: "Měsíc",
  period_year: "Rok",
  favorites: "Oblíbené",
  add_favorite: "Přidat do oblíbených",
  remove_favorite: "Odebrat z oblíbených",
  search_crypto: "Hledat kryptoměnu",
  bubble_size: "Velikost bubliny",
  bubble_content: "Obsah bubliny",
  bubble_color: "Barva bubliny",
  period: "Období",
  description: "Interaktivní bublinový graf pro prvních 1000 kryptoměn",
  support_my_work: "Podpořte mou práci",
  window_close: "Zavřít okno",
  window_toggleExpand: "Přepnout rozšíření",
  configuration_add: "Přidat graf",
  configuration_edit: "Upravit graf",
  copy: "Kopírovat",
  not_found: "Nenalezeno v prvních 1000",
  links: "Odkazy",
  exchanges: "Burzy",
  pages: "Stránky",
  empty_list: "Seznam je prázdný",
  delete: "Smazat",
  lists: "Seznamy",
  show: "Zobrazit",
  hide: "Skrýt",
  watchlist_add: "Přidat do sledovaných",
  add_to_list: "Přidat do seznamu",
  blocklist: "Blokovací seznam",
  watchlist: "Sledované",
  watchlists: "Sledované seznamy",
  cancel: "Zrušit",
  confirm: "Potvrdit",
  trade: "Obchodovat",
  info_tooltip: "Zobrazit (currency) na (service)",
  trade_tooltip: "Obchodovat s (currency) na (exchange)",
  show_more: "Zobrazit více"
};
var qe = Q('<svg class=flag viewBox="0 85.5 513 342"><path fill=#FFF d="M0 199.5h513v114H0z"></path><path fill=#cd1f2a d="M0 85.5h513v114H0z"></path><path fill=#1d4185 d="M0 312h513v114H0z">');
const Ke = {
  id: "nl",
  flag: () => qe(),
  name: "Nederlands",
  loading: "Inhoud wordt geladen...",
  currencyName: "Naam",
  settings: "Instellingen",
  currency: "Valuta",
  language: "Taal",
  colors: "Kleuren",
  red_green: "Rood + Groen",
  yellow_blue: "Geel + Blauw",
  rank: "Rang",
  marketcap: "Marktkapitalisatie",
  volume: "24h Volume",
  price: "Prijs",
  dominance: "Dominantie",
  performance: "Prestatie",
  neutral: "Neutraal",
  period_hour: "Uur",
  period_day: "Dag",
  period_week: "Week",
  period_month: "Maand",
  period_year: "Jaar",
  favorites: "Favorieten",
  add_favorite: "Toevoegen aan favorieten",
  remove_favorite: "Verwijderen uit favorieten",
  search_crypto: "Zoek cryptocurrencies",
  bubble_size: "Bubble grote",
  bubble_content: "Bubble inhoud",
  bubble_color: "Bubble kleur",
  period: "Periode",
  description: "Interactieve bubble chart TOP 1000 cryptocurrencies",
  support_my_work: "Ondersteun mijn werk",
  window_close: "Sluit venster",
  window_toggleExpand: "Meer/minder informatie",
  configuration_add: "Overzicht toevoegen",
  configuration_edit: "Overzicht bewerken",
  copy: "Kopiëren",
  not_found: "Niet gevonden in de TOP 1000",
  links: "Links",
  exchanges: "Beurzen",
  pages: "Pagina's",
  empty_list: "Lijst is leeg",
  delete: "Verwijderen",
  lists: "Lijsten",
  show: "Tonen",
  hide: "Verbergen",
  watchlist_add: "Toevoegen aan watchlist",
  add_to_list: "Toevoegen aan lijst",
  blocklist: "Blocklist",
  watchlist: "Watchlist",
  watchlists: "Watchlists",
  cancel: "Annuleren",
  confirm: "Bevestigen",
  trade: "Handelen",
  info_tooltip: "(currency) op (service) bekijken",
  trade_tooltip: "(currency) op (exchange) handelen",
  show_more: "Meer tonen"
};
var Je = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M0 0h513v342H0z"></path><path fill=#D80027 d="M0 0h513v26.3H0zM0 52.6h513v26.3H0zM0 105.2h513v26.3H0zM0 157.8h513v26.3H0zM0 210.5h513v26.3H0zM0 263.1h513v26.3H0zM0 315.7h513V342H0z"></path><path fill=#2E52B2 d="M0 0h256.5v184.1H0z"></path><path fill=#FFF d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zM104.1 138.9l-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zM160.6 138.9l-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zM216.8 138.9l-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zM43.8 75.3l-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zM156.3 75.3l-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zM212.8 75.3l-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zM43.8 24.7l-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zM100 24.7l-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zM156.3 24.7l-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zM212.8 24.7l-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z">');
const Qe = {
  id: "en",
  flag: () => Je(),
  name: "English",
  loading: "Content is loading...",
  currencyName: "Name",
  settings: "Settings",
  currency: "Currency",
  language: "Language",
  colors: "Colors",
  red_green: "Red + Green",
  yellow_blue: "Yellow + Blue",
  rank: "Rank",
  marketcap: "Market Cap",
  volume: "24h Volume",
  price: "Price",
  dominance: "Dominance",
  performance: "Performance",
  neutral: "Neutral",
  period_hour: "Hour",
  period_day: "Day",
  period_week: "Week",
  period_month: "Month",
  period_year: "Year",
  favorites: "Favorites",
  add_favorite: "Add to favorites",
  remove_favorite: "Remove from favorites",
  search_crypto: "Search cryptocurrency",
  bubble_size: "Bubble size",
  bubble_content: "Bubble content",
  bubble_color: "Bubble color",
  period: "Period",
  description: "Interactive bubble chart for the TOP 1000 cryptocurrencies",
  support_my_work: "Support my work",
  window_close: "Close window",
  window_toggleExpand: "Toggle expansion",
  configuration_add: "Add chart",
  configuration_edit: "Edit chart",
  copy: "Copy",
  not_found: "Not found in the TOP 1000",
  links: "Links",
  exchanges: "Exchanges",
  pages: "Pages",
  empty_list: "List is empty",
  delete: "Delete",
  lists: "Lists",
  show: "Show",
  hide: "Hide",
  watchlist_add: "Add Watchlist",
  add_to_list: "Add to List",
  blocklist: "Blocklist",
  watchlist: "Watchlist",
  watchlists: "Watchlists",
  cancel: "Cancel",
  confirm: "Confirm",
  trade: "Trade",
  info_tooltip: "View (currency) on (service)",
  trade_tooltip: "Trade (currency) on (exchange)",
  show_more: "Show More"
};
var et = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M171 0h171v342H171z"></path><path fill=#0052B4 d="M0 0h171v342H0z"></path><path fill=#D80027 d="M342 0h171v342H342z">');
const tt = {
  id: "fr",
  flag: () => et(),
  name: "Français",
  loading: "Le contenu est en cours de chargement...",
  currencyName: "Nom",
  settings: "Paramètres",
  currency: "Monnaie",
  language: "Langue",
  colors: "Couleurs",
  red_green: "Rouge + Vert",
  yellow_blue: "Jaune + Bleu",
  rank: "Rank",
  marketcap: "Capitalisation",
  volume: "24h Volume",
  price: "Prix",
  dominance: "Dominance",
  performance: "Performance",
  neutral: "Neutre",
  period_hour: "Heure",
  period_day: "Jour",
  period_week: "Semaine",
  period_month: "Mois",
  period_year: "Année",
  favorites: "Favoris",
  add_favorite: "Ajouter aux favoris",
  remove_favorite: "Retirer des favoris",
  search_crypto: "Rechercher crypto-monnaie",
  bubble_size: "Taille de la bulle",
  bubble_content: "Contenu de bulle",
  bubble_color: "Couleur de la bulle",
  period: "Periode",
  description: "Graphique à bulles interactif pour le TOP 1000 des crypto-monnaies",
  support_my_work: "Soutenez mon travail",
  window_close: "Fermer la fenêtre",
  window_toggleExpand: "Basculer l'expansion",
  configuration_add: "Ajouter un graphique",
  configuration_edit: "Modifier le graphique",
  copy: "Copier",
  not_found: "Non trouvé dans le TOP 1000",
  links: "Liens",
  exchanges: "Bourses",
  pages: "Pages",
  empty_list: "La liste est vide",
  delete: "Supprimer",
  lists: "Listes",
  show: "Afficher",
  hide: "Masquer",
  watchlist_add: "Ajouter à la liste de surveillance",
  add_to_list: "Ajouter à une liste",
  blocklist: "Liste noire",
  watchlist: "Liste de surveillance",
  watchlists: "Listes de surveillance",
  cancel: "Annuler",
  confirm: "Confirmer",
  trade: "Trader",
  info_tooltip: "Voir (currency) sur (service)",
  trade_tooltip: "Trader (currency) sur (exchange)",
  show_more: "Afficher plus"
};
var rt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#D80027 d="M0 0h513v342H0z"></path><path fill=#000 d="M0 0h513v114H0z"></path><path fill=#FFDA44 d="M0 228h513v114H0z">');
const nt = {
  id: "de",
  flag: () => rt(),
  name: "Deutsch",
  loading: "Inhalte werden geladen...",
  currencyName: "Name",
  settings: "Einstellungen",
  currency: "Währung",
  language: "Sprache",
  colors: "Farben",
  red_green: "Rot + Grün",
  yellow_blue: "Gelb + Blau",
  rank: "Rang",
  marketcap: "Marktkap.",
  volume: "Tagesvolumen",
  price: "Kurs",
  dominance: "Dominanz",
  performance: "Performance",
  neutral: "Neutral",
  period_hour: "Stunde",
  period_day: "Tag",
  period_week: "Woche",
  period_month: "Monat",
  period_year: "Jahr",
  favorites: "Favoriten",
  add_favorite: "Zu Favoriten hinzufügen",
  remove_favorite: "Von Favoriten entfernen",
  search_crypto: "Kryptowährung suchen",
  bubble_size: "Bubble Größe",
  bubble_content: "Bubble Inhalt",
  bubble_color: "Bubble Farbe",
  period: "Zeitraum",
  description: "Interaktiver Bubblechart für die TOP 1000 Kryptowährungen",
  support_my_work: "Unterstütze mein Projekt",
  window_close: "Dialog schließen",
  window_toggleExpand: "Dialog auf/zuklappen",
  configuration_add: "Chart hinzufügen",
  configuration_edit: "Chart bearbeiten",
  copy: "Kopieren",
  not_found: "Nicht in den TOP 1000 gefunden",
  links: "Links",
  exchanges: "Börsen",
  pages: "Seiten",
  empty_list: "Liste ist leer",
  delete: "Löschen",
  lists: "Listen",
  show: "Anzeigen",
  hide: "Ausblenden",
  watchlist_add: "Merkliste hinzufügen",
  add_to_list: "Zu einer Liste hinzufügen",
  blocklist: "Blockierliste",
  watchlist: "Merkliste",
  watchlists: "Merklisten",
  cancel: "Abbrechen",
  confirm: "Bestätigen",
  trade: "Handeln",
  info_tooltip: "(currency) auf (service) anschauen",
  trade_tooltip: "(currency) auf (exchange) handeln",
  show_more: "Mehr anzeigen"
};
var ot = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M342 0H0v341.3h512V0z"></path><path fill=#6DA544 d="M0 0h171v342H0z"></path><path fill=#D80027 d="M342 0h171v342H342z">');
const it = {
  id: "it",
  flag: () => ot(),
  name: "Italian",
  loading: "Caricamento in corso...",
  currencyName: "Nome",
  settings: "Impostazioni",
  currency: "Valuta",
  language: "Lingua",
  colors: "Colori",
  red_green: "Rosso + Verde",
  yellow_blue: "Giallo + Blu",
  rank: "Rank",
  marketcap: "Cap di mercato",
  volume: "Volume 24h",
  price: "Prezzo",
  dominance: "Dominance",
  performance: "Rendimento",
  neutral: "Neutrale",
  period_hour: "Ora",
  period_day: "Giorno",
  period_week: "Settimana",
  period_month: "Mese",
  period_year: "Anno",
  favorites: "Preferiti",
  add_favorite: "Aggiungi ai preferiti",
  remove_favorite: "Rimuovi dai preferiti",
  search_crypto: "Cerca criptovalute",
  bubble_size: "Grandezza bolla",
  bubble_content: "Contenuto bolla",
  bubble_color: "Colore bolla",
  period: "Periodo",
  description: "Grafico interattivo a bolle per le TOP 1000 criptovalute",
  support_my_work: "Supporta il mio lavoro",
  window_close: "Chiudi finestra",
  window_toggleExpand: "Espansione Toggle",
  configuration_add: "Aggiungi grafico",
  configuration_edit: "Modifica grafico",
  copy: "Copia",
  not_found: "Non si trova nella TOP 1000",
  links: "Link",
  exchanges: "Borse",
  pages: "Pagine",
  empty_list: "La lista è vuota",
  delete: "Elimina",
  lists: "Liste",
  show: "Mostra",
  hide: "Nascondi",
  watchlist_add: "Aggiungi alla lista di osservazione",
  add_to_list: "Aggiungi a una lista",
  blocklist: "Lista di blocco",
  watchlist: "Lista di osservazione",
  watchlists: "Liste di osservazione",
  cancel: "Annulla",
  confirm: "Conferma",
  trade: "Commercio",
  info_tooltip: "Visualizza (currency) su (service)",
  trade_tooltip: "Scambia (currency) su (exchange)",
  show_more: "Mostra di più"
};
var at = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M0 0h512v342H0z"></path><circle fill=#D80027 cx=256.5 cy=171 r=96>');
const lt = {
  id: "ja",
  flag: () => at(),
  name: "日本語",
  loading: "コンテンツをロード中…",
  currencyName: "名前",
  settings: "設定",
  currency: "通貨",
  language: "言語",
  colors: "カラー",
  red_green: "赤＋緑",
  yellow_blue: "黄＋青",
  rank: "順位",
  marketcap: "時価総額",
  volume: "24h 取引高",
  price: "値段",
  dominance: "占有率",
  performance: "変動率",
  neutral: "無彩色",
  period_hour: "時間",
  period_day: "日",
  period_week: "週間",
  period_month: "ヶ月",
  period_year: "年",
  favorites: "お気に入り",
  add_favorite: "お気に入りに加える",
  remove_favorite: "お気に入りから除く",
  search_crypto: "暗号通貨を探す",
  bubble_size: "バブル サイズ",
  bubble_content: "バブル コンテンツ",
  bubble_color: "バブル カラー",
  period: "期間",
  description: "トップ1000位の暗号通貨に関するインタラクティブバブルチャート",
  support_my_work: "私の仕事を支援する",
  window_close: "ウィンドウを閉じる",
  window_toggleExpand: "トグル 拡張",
  configuration_add: "チャートに加える",
  configuration_edit: "チャートを編集する",
  copy: "コピー",
  not_found: "TOP1000に入っていない",
  links: "リンク",
  exchanges: "証券取引所",
  pages: "ページ",
  empty_list: "リストは空です",
  delete: "削除",
  lists: "リスト",
  show: "表示する",
  hide: "非表示にする",
  watchlist_add: "ウォッチリストに追加",
  add_to_list: "リストに追加する",
  blocklist: "ブロックリスト",
  watchlist: "ウォッチリスト",
  watchlists: "ウォッチリスト",
  cancel: "キャンセル",
  confirm: "確認",
  trade: "取引する",
  info_tooltip: "(service)で(currency)を見る",
  trade_tooltip: "(exchange)で(currency)を取引する",
  show_more: "もっと見る"
};
var st = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M0 0h512v342H0z"></path><path fill=#6DA544 d="M0 0h513v114H0z"></path><path fill=#D80027 d="M0 227.9h513v114H0zM278.8 134.8c.1 2 8.7 26.2 4.4 39.4-6.6 20.3-15.8 21.8-19.8 24.5V134l-6.9-4.2-6.9 4.2v64.7c-4-2.7-12.4-2.4-19.8-24.5-4.3-12.7 5.7-37.3 5.8-39.2 0 0-9.5 8.1-15.8 24-5.9 14.8 1.9 49.6 29.5 54.8 2.3.4 4.7 5.6 7.2 5.6 2.1 0 4.1-5.2 6-5.5 28.4-4.6 35-41.7 29.9-55.6-5.4-14.6-13.6-23.5-13.6-23.5z"></path><path fill=#FFF opacity=.5 d="M44.6 98.9h22.3v24.4H44.6zM0 98.9h22.3v24.4H0zM89.2 98.9h22.3v24.4H89.2zM133.8 98.9h22.3v24.4h-22.3zM178.4 98.9h22.3v24.4h-22.3zM223 98.9h22.3v24.4H223zM267.7 98.9H290v24.4h-22.3zM312.3 98.9h22.3v24.4h-22.3zM356.9 98.9h22.3v24.4h-22.3zM401.5 98.9h22.3v24.4h-22.3zM446.1 98.9h22.3v24.4h-22.3zM490.7 98.9H513v24.4h-22.3zM44.6 216.9h22.3v25.5H44.6zM0 216.9h22.3v25.5H0zM89.2 216.9h22.3v25.5H89.2zM133.8 216.9h22.3v25.5h-22.3zM178.4 216.9h22.3v25.5h-22.3zM223 216.9h22.3v25.5H223zM267.7 216.9H290v25.5h-22.3zM312.3 216.9h22.3v25.5h-22.3zM356.9 216.9h22.3v25.5h-22.3zM401.5 216.9h22.3v25.5h-22.3zM446.1 216.9h22.3v25.5h-22.3zM490.7 216.9H513v25.5h-22.3z">');
const ct = {
  id: "fa",
  flag: () => st(),
  name: "فارسی",
  loading: "...در حال بارگیری محتوا",
  currencyName: "رمزارز",
  settings: "تنظیمات",
  currency: "واحد پول",
  language: "زبان",
  colors: "رنگها",
  red_green: "قرمز + سبز",
  yellow_blue: "زرد + آبی",
  rank: "رتبه بندی",
  marketcap: "سرمایه بازار",
  volume: "حجم روزانه",
  price: "قیمت",
  dominance: "تسلط",
  performance: "پرفورمنس",
  neutral: "خنثی",
  period_hour: "ساعت",
  period_day: "روز",
  period_week: "هفته",
  period_month: "ماه",
  period_year: "سال",
  favorites: "علاقه مندی ها",
  add_favorite: "افزودن به علاقه مندی ها",
  remove_favorite: "از علاقه مندی ها حذف شود",
  search_crypto: "رمز ارز را جستجو کنید",
  bubble_size: "اندازه حباب",
  bubble_content: "محتوای حباب",
  bubble_color: "رنگ حباب",
  period: "بازه زمانی",
  description: "نمودار حبابی تعاملی برای ۵۰۰ رمز ارزهای برتر",
  support_my_work: "از پروژه من حمایت کنید",
  window_close: "بستن پنجره",
  window_toggleExpand: "پنجره را باز / بسته کنید",
  configuration_add: "نمودار اضافه کنید",
  configuration_edit: "نمودار را ویرایش کنید",
  copy: "کپی",
  not_found: "در TOP 1000 یافت نشد",
  links: "پیوندها",
  exchanges: "مبادلات",
  pages: "صفحات",
  empty_list: "لیست خالی است",
  delete: "حذف",
  lists: "لیست ها",
  show: "نمایش",
  hide: "مخفی کردن",
  watchlist_add: "افزودن به لیست نظارت",
  add_to_list: "افزودن به لیست",
  blocklist: "لیست مسدود",
  watchlist: "لیست نظارت",
  watchlists: "لیست های نظارتی",
  cancel: "لغو",
  confirm: "تأیید",
  trade: "معامله",
  info_tooltip: "(currency) را در (service) مشاهده کنید",
  trade_tooltip: "(currency) را در (exchange) معامله کنید",
  show_more: "نمایش بیشتر"
};
var ut = Q('<svg class=flag viewBox="0 0 16 10"><path fill=#fff d="M0 0h16v10H0z"></path><path fill=#dc143c d="M0 5h16v5H0z">');
const dt = {
  id: "pl",
  flag: () => ut(),
  name: "Polski",
  loading: "Zawartość ładuje się...",
  currencyName: "Nazwa",
  settings: "Ustawienia",
  currency: "Waluta",
  language: "Języki",
  colors: "Kolory",
  red_green: "Czerwony + Zielony",
  yellow_blue: "Żółty + Niebieski",
  rank: "Miejsce",
  marketcap: "Kapitalizacja",
  volume: "Wolumen",
  price: "Cena",
  dominance: "Udział w rynku",
  performance: "Wydajność",
  neutral: "Neutralny",
  period_hour: "Godzina",
  period_day: "Dzień",
  period_week: "Tydzień",
  period_month: "Miesiąc",
  period_year: "Rok",
  favorites: "Ulubione",
  add_favorite: "Dodaj do ulubionych",
  remove_favorite: "Usuń z ulubionych",
  search_crypto: "Szukaj kryptowalut",
  bubble_size: "Rozmiar bąbelka",
  bubble_content: "Zawartość bąbelka",
  bubble_color: "Kolor bąbelka",
  period: "Okres",
  description: "Interaktywny wykres bąbelkowy dla TOP 1000 kryptowalut",
  support_my_work: "Wesprzyj moją pracę",
  window_close: "Zamknij okno",
  window_toggleExpand: "Rozszerzenie Toogle",
  configuration_add: "Dodaj wykres",
  configuration_edit: "Edytuj wykres",
  copy: "Kopia",
  not_found: "Nie znalazł się w TOP 1000",
  links: "Linki",
  exchanges: "Giełdy",
  pages: "Strony",
  empty_list: "Lista jest pusta",
  delete: "Usuń",
  lists: "Listy",
  show: "Pokaż",
  hide: "Ukryj",
  watchlist_add: "Dodaj do obserwowanych",
  add_to_list: "Dodaj do listy",
  blocklist: "Lista blokowanych",
  watchlist: "Lista obserwowanych",
  watchlists: "Listy obserwowanych",
  cancel: "Anuluj",
  confirm: "Potwierdź",
  trade: "Handel",
  info_tooltip: "Zobacz (currency) na (service)",
  trade_tooltip: "Handluj (currency) na (exchange)",
  show_more: "Pokaż więcej"
};
var ht = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#D80027 d="M0 85.337h512v341.326H0z"></path><path fill=#006600 d="M196.641 85.337v341.326H0V85.337z"></path><circle fill=#FFDA44 cx=196.641 cy=256 r=64></circle><path fill=#D80027 d="M160.638 224v40.001c0 19.882 16.118 36 36 36s36-16.118 36-36V224h-72z"></path><path fill=#FFF d="M196.638 276c-6.617 0-12-5.383-12-12v-16h24.001v16c-.001 6.616-5.385 12-12.001 12z">');
const pt = {
  id: "pt",
  flag: () => ht(),
  name: "Portugues",
  loading: "O conteúdo está carregando...",
  currencyName: "Nome",
  settings: "Configurações",
  currency: "Moeda",
  language: "Idioma",
  colors: "Cores",
  red_green: "Vermelho + Verde",
  yellow_blue: "Amarelo + Azul",
  rank: "Posição",
  marketcap: "Cap de Mercado",
  volume: "Volume em 24h",
  price: "Valor",
  dominance: "Dominação",
  performance: "Desempenho",
  neutral: "Neutra",
  period_hour: "Hora",
  period_day: "Dia",
  period_week: "Semana",
  period_month: "Mês",
  period_year: "Ano",
  favorites: "Favoritos",
  add_favorite: "Adicionar aos Favoritos",
  remove_favorite: "Remover dos Favoritos",
  search_crypto: "Pesquisar Criptomoeda",
  bubble_size: "Tamanho da bolha",
  bubble_content: "Conteúdo de bolha",
  bubble_color: "Cor da bolha",
  period: "Período",
  description: "Gráfico interativo para as 1000 principais criptomoedas",
  support_my_work: "Apóie meu trabalho",
  window_close: "Fechar a janela",
  window_toggleExpand: "Alternar expansão",
  configuration_add: "Adicionar gráfico",
  configuration_edit: "Editar gráfico",
  copy: "Cópiar",
  not_found: "Não encontrado no TOP 1000",
  links: "Ligações",
  exchanges: "Bolsas",
  pages: "Páginas",
  empty_list: "Lista vazia",
  delete: "Excluir",
  lists: "Listas",
  show: "Mostrar",
  hide: "Ocultar",
  watchlist_add: "Adicionar à lista de observação",
  add_to_list: "Adicionar à lista",
  blocklist: "Lista de bloqueio",
  watchlist: "Lista de observação",
  watchlists: "Listas de observação",
  cancel: "Cancelar",
  confirm: "Confirmar",
  trade: "Negociar",
  info_tooltip: "Ver (currency) em (service)",
  trade_tooltip: "Negociar (currency) em (exchange)",
  show_more: "Mostrar mais"
};
var gt = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#FFF d="M0 85.33v341.332h512V85.33z"></path><path fill=#0052B4 d="M0 85.333h512V426.67H0z"></path><path fill=#FFF d="M0 85.333h512v113.775H0z"></path><path fill=#D80027 d="M0 312.884h512v113.775H0z">');
const ft = {
  id: "ru",
  flag: () => gt(),
  name: "Русский",
  loading: "Содержание загружается...",
  currencyName: "Имя",
  settings: "Настройки",
  currency: "Валюта",
  language: "Язык",
  colors: "Цвета",
  red_green: "Красный + Зеленый",
  yellow_blue: "Желтый + синий",
  rank: "Рейтинг",
  marketcap: "Объём рынка",
  volume: "24ч Объём",
  price: "Цена",
  dominance: "Доминирование",
  performance: "Производительность",
  neutral: "Нейтральный",
  period_hour: "час",
  period_day: "день",
  period_week: "неделя",
  period_month: "месяц",
  period_year: "год",
  favorites: "Избранное",
  add_favorite: "Добавить в избранное",
  remove_favorite: "Удалить из избранное",
  search_crypto: "Поиск криптовалюты",
  bubble_size: "размер пузыря",
  bubble_content: "контент пузыря",
  bubble_color: "Цвет пузыря",
  period: "Период",
  description: "Интерактивный график пузырей для ТОП-1000 криптовалют",
  support_my_work: "Поддержите мою работу",
  window_close: "Закрыть окно",
  window_toggleExpand: "Переключение расширения",
  configuration_add: "Добавить графика",
  configuration_edit: "Редактирование графика",
  copy: "Копировать",
  not_found: "Не найдено в ТОП-1000",
  links: "Ссылки",
  exchanges: "Биржи",
  pages: "Страницы",
  empty_list: "Список пуст",
  delete: "Удалить",
  lists: "Списки",
  show: "Показать",
  hide: "Скрыть",
  watchlist_add: "Добавить в список наблюдения",
  add_to_list: "Добавить в список",
  blocklist: "Список блокировки",
  watchlist: "Список наблюдения",
  watchlists: "Списки наблюдения",
  cancel: "Отменить",
  confirm: "Подтвердить",
  trade: "Торговля",
  info_tooltip: "Просмотр (currency) на (service)",
  trade_tooltip: "Торговля (currency) на (exchange)",
  show_more: "Показать больше"
};
var vt = Q('<svg class=flag viewBox="0 0 22.5 15"><path fill=#D03433 d="M0 0h22.5v4H0V0zm0 11h22.5v4H0v-4z"></path><path fill=#FBCA46 d="M0 4h22.5v7H0V4z"></path><path fill=#A41517 d="M7.2 8.5c0 .3.3.5.6.5s.6-.2.6-.5L8.5 7H7.1l.1 1.5zM6.6 7c0-.3.2-.5.4-.5h1.5c.3 0 .5.2.5.4V7l-.1 1.5c-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-1L6.6 7z"></path><path fill=#A41517 d="M6.8 7.5h2V8h-.5l-.5 1-.5-1h-.5v-.5zM5.3 6h1v3.5h-1V6zm4 0h1v3.5h-1V6zm-2.5-.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v.2c0 .2-.1.3-.3.3H7c-.1 0-.2-.1-.2-.2v-.3z">');
const mt = {
  id: "es",
  flag: () => vt(),
  name: "Español",
  loading: "Contenido está cargando...",
  currencyName: "Nombre",
  settings: "Configuración",
  currency: "Moneda",
  language: "Idioma",
  colors: "Colores",
  red_green: "Rojo + Verde",
  yellow_blue: "Amarillo + Azul",
  rank: "Rango",
  marketcap: "Cap de Mercado",
  volume: "Volumen en 24h",
  price: "Valor",
  dominance: "Dominación",
  performance: "Rendimiento",
  neutral: "Neutral",
  period_hour: "Hora",
  period_day: "Día",
  period_week: "Semana",
  period_month: "Mes",
  period_year: "Año",
  favorites: "Favoritos",
  add_favorite: "Agregar a favoritos",
  remove_favorite: "Retirar de favoritos",
  search_crypto: "Busque Criptomoneda",
  bubble_size: "Tamaño de Burbuja",
  bubble_content: "Contenido de Burbuja",
  bubble_color: "Color de Burbuja",
  period: "Período",
  description: "Gráfico interactivo para las principales 1000 criptomonedas",
  support_my_work: "Apoya mi trabajo",
  window_close: "Cerrar ventana",
  window_toggleExpand: "Alternar Expansión",
  configuration_add: "Agregar gráfico",
  configuration_edit: "Editar gráfico",
  copy: "Copiar",
  not_found: "No se encuentra en el TOP 1000",
  links: "Enlaces",
  exchanges: "Bolsa",
  pages: "Páginas",
  empty_list: "La lista está vacía",
  delete: "Eliminar",
  lists: "Listas",
  show: "Mostrar",
  hide: "Ocultar",
  watchlist_add: "Añadir a lista de seguimiento",
  add_to_list: "Añadir a lista",
  blocklist: "Lista de bloqueados",
  watchlist: "Lista de seguimiento",
  watchlists: "Listas de seguimiento",
  cancel: "Cancelar",
  confirm: "Confirmar",
  trade: "Negociar",
  info_tooltip: "Ver (currency) en (service)",
  trade_tooltip: "Negociar (currency) en (exchange)",
  show_more: "Mostrar más"
};
var bt = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#FFF d="M0 85.334h512V426.66H0z"></path><path fill=#0052B4 d="M0 194.056h512v123.882H0z"></path><path fill=#D80027 d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z">');
const yt = {
  id: "th",
  flag: () => bt(),
  name: "ไทย",
  loading: "กำลังโหลดเนื้อหา...",
  currencyName: "ชื่อ",
  settings: "การตั้งค่า",
  currency: "สกุลเงิน",
  language: "ภาษา",
  colors: "สี",
  red_green: "สีแดง + สีเขียว",
  yellow_blue: "สีเหลือง + สีน้ำเงิน",
  rank: "อันดับ",
  marketcap: "มูลค่าตลาด",
  volume: "ปริมาณการเทรด",
  price: "ราคา",
  dominance: "ความสำคัญ",
  performance: "ผลงาน",
  neutral: "เป็นกลาง",
  period_hour: "ชั่วโมง",
  period_day: "วัน",
  period_week: "สัปดาห์",
  period_month: "เดือน",
  period_year: "ปี",
  favorites: "รายการโปรด",
  add_favorite: "เพิ่มในรายการโปรด",
  remove_favorite: "ลบออกจากรายการโปรด",
  search_crypto: "ค้นหาสกุลเงินดิจิทัล",
  bubble_size: "ขนาดบัลล์",
  bubble_content: "เนื้อหาบัลล์",
  bubble_color: "สีบัลล์",
  period: "ช่วงเวลา",
  description: "แผนภูมิบัลล์แบบอินเทอร์แอ็กทีฟสำหรับสกุลเงินดิจิทัล TOP 1000",
  support_my_work: "สนับสนุนงานของฉัน",
  window_close: "ปิดหน้าต่าง",
  window_toggleExpand: "สลับขยาย/ย่อหน้าต่าง",
  configuration_add: "เพิ่มแผนภูมิ",
  configuration_edit: "แก้ไขแผนภูมิ",
  copy: "คัดลอก",
  not_found: "ไม่พบใน TOP 1000",
  links: "ลิงก์",
  exchanges: "ตลาดซื้อขาย",
  pages: "หน้า",
  empty_list: "รายการว่างเปล่า",
  delete: "ลบ",
  lists: "รายการ",
  show: "แสดง",
  hide: "ซ่อน",
  watchlist_add: "เพิ่มลงในรายการดู",
  add_to_list: "เพิ่มลงในรายการ",
  blocklist: "รายการบล็อก",
  watchlist: "รายการดู",
  watchlists: "รายการดู",
  cancel: "ยกเลิก",
  confirm: "ยืนยัน",
  trade: "ซื้อขาย",
  info_tooltip: "ดู (currency) บน (service)",
  trade_tooltip: "ซื้อขาย (currency) บน (exchange)",
  show_more: "แสดงเพิ่มเติม"
};
var wt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#E30A17 d="M0 0h513v342H0z"></path><path fill=#FFF d="M259.7 118.6c-13.1-9.5-29-14.6-45.3-14.5-40.8 0-73.8 30.8-73.8 68.9s33.1 68.9 73.8 68.9c17.1 0 32.9-5.4 45.3-14.5-30 38.6-85.7 45.6-124.3 15.5s-45.6-85.7-15.5-124.3 85.7-45.6 124.3-15.5c5.8 4.5 11 9.8 15.5 15.5zm39.9 65.8-18.1 21.9 1.2-28.4-26.4-10.4 27.3-7.6 1.8-28.3 15.6 23.7 27.5-7.1-17.5 22 15.3 23.9-26.7-9.7z">');
const _t = {
  id: "tr",
  flag: () => wt(),
  name: "Türkçe",
  loading: "İçerik yükleniyor...",
  currencyName: "İsim",
  settings: "Ayarlar",
  currency: "Para birimi",
  language: "Dil",
  colors: "Renkler",
  red_green: "Kırmızı + Yeşil",
  yellow_blue: "Sarı + Mavi",
  rank: "Sıralama",
  marketcap: "Piyasa Değeri",
  volume: "24s Hacim",
  price: "Değer",
  dominance: "Pazar Hakimiyeti",
  performance: "Performans",
  neutral: "Nötr",
  period_hour: "Saat",
  period_day: "Gün",
  period_week: "Hafta",
  period_month: "Ay",
  period_year: "Yıl",
  favorites: "Favoriler",
  add_favorite: "Favorilere ekle",
  remove_favorite: "Favorilerden çıkar",
  search_crypto: "Kriptopara ara",
  bubble_size: "Baloncuk boyutu",
  bubble_content: "Baloncuk içeriği",
  bubble_color: "Baloncuk rengi",
  period: "Dönem",
  description: "İLK 1000 kripto para birimi için etkileşimli balon grafiği",
  support_my_work: "Çalışmalarımızı destekleyin",
  window_close: "Pencereyi kapat",
  window_toggleExpand: "Geçiş genişlet",
  configuration_add: "Grafik ekle",
  configuration_edit: "Grafik düzenle",
  copy: "Kopya",
  not_found: "İlk 1000'de bulunamadı",
  links: "Bağlantılar",
  exchanges: "Takaslar",
  pages: "Sayfalar",
  empty_list: "listesi boş",
  delete: "Sil",
  lists: "Listeler",
  show: "Göster",
  hide: "Gizle",
  watchlist_add: "İzleme listesine ekle",
  add_to_list: "Listeye ekle",
  blocklist: "Engelleme listesi",
  watchlist: "İzleme listesi",
  watchlists: "İzleme listeleri",
  cancel: "İptal",
  confirm: "Onayla",
  trade: "İşlem yap",
  info_tooltip: "(currency) için (service)'te görüntüle",
  trade_tooltip: "(currency) için (exchange) borsasında işlem yap",
  show_more: "Daha fazla göster"
};
var kt = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#FFDA44 d="M0 85.337h512v341.326H0z"></path><path fill=#338AF3 d="M0 85.337h512V256H0z">');
const Ct = {
    id: "uk",
    flag: () => kt(),
    name: "Українська",
    loading: "Завантаження контенту...",
    currencyName: "Ім'я",
    settings: "Налаштування",
    currency: "Валюта",
    language: "Мова",
    colors: "Кольори",
    red_green: "Червоний + Зелений",
    yellow_blue: "Жовтий + Синій",
    rank: "Ранг",
    marketcap: "Капіталізація",
    volume: "Обсяг за 24 години",
    price: "Ціна",
    dominance: "Домінантність",
    performance: "Динаміка",
    neutral: "Нейтрально",
    period_hour: "Година",
    period_day: "День",
    period_week: "Тиждень",
    period_month: "Місяць",
    period_year: "Рік",
    favorites: "Вибрані",
    add_favorite: "Додати до обраного",
    remove_favorite: "Видалити з обраного",
    search_crypto: "Пошук криптовалюти",
    bubble_size: "Розмір бульбашки",
    bubble_content: "Зміст бульбашки",
    bubble_color: "Колір бульбашки",
    period: "Період",
    description: "Інтерактивна діаграма бульбашок для ТОП-1000 криптовалют",
    support_my_work: "Підтримайте мою роботу",
    window_close: "Закрити вікно",
    window_toggleExpand: "Розгорнути/згорнути вікно",
    configuration_add: "Додати графік",
    configuration_edit: "Редагувати графік",
    copy: "Копіювати",
    not_found: "Не знайдено в ТОП-1000",
    links: "Посилання",
    exchanges: "Біржі",
    pages: "Сторінки",
    empty_list: "Список порожній",
    delete: "Видалити",
    lists: "Списки",
    show: "Показати",
    hide: "Сховати",
    watchlist_add: "Додати в спостереження",
    add_to_list: "Додати до списку",
    blocklist: "Блок-список",
    watchlist: "Спостереження",
    watchlists: "Списки спостереження",
    cancel: "Скасувати",
    confirm: "Підтвердити",
    trade: "Торгувати",
    info_tooltip: "Переглянути (currency) на (service)",
    trade_tooltip: "Торгувати (currency) на (exchange)",
    show_more: "Показати більше"
  },
  xt = class {};
xt.app = "Crypto Bubbles", xt.twitter = "CryptoBubbles", xt.instagram = "cryptobubbles", xt.telegram = "CryptoBubbles", xt.email = "contact@cryptobubbles.net", xt.logo = "/images/logo64.png", xt.playStore = "https://play.google.com/store/apps/details?id=net.cryptobubbles", xt.appStore = "https://apps.apple.com/app/id1599892658", xt.bubblePadding = Math.round(2 * window.devicePixelRatio), xt.bubbleBorder = Math.round(4 * window.devicePixelRatio), xt.bubbleHitbox = Math.round(4 * window.devicePixelRatio), xt.sliceFilters = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3].map((e => ({
  type: "slice",
  from: e - 99,
  to: e
}))), xt.baseCurrencies = [{
  id: "usd",
  symbol: "$",
  code: "USD"
}, {
  id: "eur",
  symbol: "€",
  code: "EUR"
}, {
  id: "rub",
  symbol: "₽",
  code: "RUB"
}, {
  id: "brl",
  symbol: "R$",
  code: "BRL"
}, {
  id: "gbp",
  symbol: "£",
  code: "GBP"
}, {
  id: "inr",
  symbol: "₹",
  code: "INR"
}, {
  id: "aud",
  symbol: "$",
  code: "AUD"
}, {
  id: "cad",
  symbol: "$",
  code: "CAD"
}, {
  id: "pln",
  symbol: "Zł",
  code: "PLN"
}, {
  id: "try",
  symbol: "₺",
  code: "TRY"
}, {
  id: "btc",
  symbol: "₿",
  code: "BTC"
}, {
  id: "eth",
  symbol: "Ξ",
  code: "ETH"
}], xt.translations = [Qe, ft, pt, tt, nt, ct, dt, mt, Ke, it, _t, Xe, yt, lt, Ye, Ct, Ze], xt.periods = ["min1", "min5", "min15", "hour", "day", "week", "month", "year"], xt.exchanges = [{
  id: "binance",
  name: "Binance",
  referralUrl: "https://www.binance.com/register?ref=BRM28YZ5",
  getSpotTradeUrl: e => "https://www.binance.com/trade/".concat(e, "?layout=pro&ref=BRM28YZ5&type=spot"),
  iconComponent: e => {
    return oe(t = Ne(), e, !0, !0), t;
    var t
  }
}, {
  id: "kucoin",
  name: "Kucoin",
  referralUrl: "https://www.kucoin.com/r/P8Neuc",
  getSpotTradeUrl: e => "https://www.kucoin.com/trade/".concat(e, "?rcode=P8Neuc"),
  iconComponent: e => {
    return oe(t = je(), e, !0, !0), t;
    var t
  }
}, {
  id: "bybit",
  name: "Bybit",
  referralUrl: "https://www.bybit.com/register?affiliate_id=46162&group_id=69922&group_type=1",
  getSpotTradeUrl: e => "https://www.bybit.com/trade/spot/".concat(e, "?affiliate_id=46162&group_id=0&group_type=1"),
  iconComponent: e => {
    return oe(t = Oe(), e, !0, !0), t;
    var t
  }
}, {
  id: "okx",
  name: "OKX",
  referralUrl: "https://www.okx.com/join/61710443",
  getSpotTradeUrl: e => "https://www.okx.com/trade-spot/".concat(e.toLowerCase(), "?channelid=61710443"),
  iconComponent: e => {
    return oe(t = Ue(), e, !0, !0), t;
    var t
  }
}, {
  id: "mexc",
  name: "MEXC",
  referralUrl: "https://www.mexc.com/register?inviteCode=mexc-1WaJ1",
  getSpotTradeUrl: e => "https://www.mexc.com/exchange/".concat(e, "?inviteCode=mexc-1WaJ1"),
  iconComponent: e => {
    return oe(t = Ie(), e, !0, !0), t;
    var t
  }
}, {
  id: "gateio",
  name: "Gate.io",
  referralUrl: "https://www.gate.io/signup/UFEQVV1c",
  getSpotTradeUrl: e => "https://www.gate.io/trade/".concat(e, "?ref=UFEQVV1c"),
  iconComponent: e => {
    return oe(t = Re(), e, !0, !0), t;
    var t
  }
}, {
  id: "coinbase",
  name: "Coinbase",
  getSpotTradeUrl: e => "https://www.coinbase.com/advanced-trade/spot/".concat(e),
  iconComponent: e => {
    return oe(t = Ve(), e, !0, !0), t;
    var t
  }
}];
let Mt = xt;

function zt(e) {
  const t = {};
  for (const r of e) t[r] = !0;
  return t
}

function Lt(e) {
  const t = [];
  for (const r in e) e[r] && t.push(r);
  return t
}
const Bt = "settings";
let At = "";
class St {
  static generateSave() {
    const e = Jt.map((e => ({
      id: e.id,
      name: e.name,
      items: Lt(e.record)
    })));
    return {
      baseCurrency: Dt().id,
      translation: Rt().id,
      configurations2: $t,
      configurationId2: Wt(),
      favoritesCMC: Lt(Gt),
      listBlock: Lt(qt),
      listsWatch: e,
      currencyFilter: Ot(),
      colors: It(),
      hideStables: er()
    }
  }
  static save(e) {
    const t = JSON.stringify(e);
    if (At !== t) try {
      localStorage.setItem(Bt, t), At = t
    } catch (r) {}
  }
  static load() {
    try {
      const e = localStorage.getItem(Bt);
      if (e) {
        const t = JSON.parse(e);
        if (t) {
          if (t.configurations2) {
            let e = !0;
            for (const r of t.configurations2)
              if (!r.name.startsWith("Chart #")) {
                e = !1;
                break
              } e && (t.configurations2 = void 0)
          }
          return t
        }
      }
    } catch (e) {}
    return null
  }
}

function Pt() {
  return {
    id: Ee(),
    name: "",
    record: {}
  }
}
const Tt = St.load(),
  Ft = (null == (Ht = Tt) ? void 0 : Ht.configurations2) && Ht.configurations2.length > 0 ? Ht.configurations2 : [De("hour", "performance"), De("day", "performance"), De("week", "performance"), De("month", "performance"), De("year", "performance"), De("day", "marketcap")];
var Ht;
const Et = Mt.baseCurrencies.find((e => e.id === (null == Tt ? void 0 : Tt.baseCurrency))) || Mt.baseCurrencies[0],
  [Dt, Nt] = v(Et),
  [Ot, Vt] = v((null == Tt ? void 0 : Tt.currencyFilter) || Mt.sliceFilters[0]),
  [Rt, jt] = v(function(e) {
    const t = Mt.translations.find((t => t.id === (null == e ? void 0 : e.translation)));
    if (t) return t;
    if (navigator.language) {
      const e = navigator.language.toLowerCase();
      for (const t of Mt.translations)
        if (e.startsWith(t.id.toLowerCase())) return t
    }
    return Qe
  }(Tt)),
  [It, Ut] = v((null == Tt ? void 0 : Tt.colors) || "red-green"),
  [$t, Xt] = Se(Ft),
  [Wt, Yt] = v(function(e, t) {
    if (null == e ? void 0 : e.configurationId2) return e.configurationId2;
    {
      let e = t.findIndex((e => "day" === e.period && "performance" === e.size));
      return -1 === e && (e = 0), t[e].id
    }
  }(Tt, Ft)),
  [Gt, Zt] = Se(function(e) {
    return (null == e ? void 0 : e.favoritesCMC) ? zt(e.favoritesCMC) : {}
  }(Tt)),
  [qt, Kt] = Se(function(e) {
    return (null == e ? void 0 : e.listBlock) ? zt(e.listBlock) : {}
  }(Tt)),
  [Jt, Qt] = Se(function(e) {
    return (null == e ? void 0 : e.listsWatch) ? e.listsWatch.map((e => ({
      id: e.id,
      name: e.name,
      record: zt(e.items)
    }))) : [Pt()]
  }(Tt)),
  [er, tr] = v((null == Tt ? void 0 : Tt.hideStables) || !1),
  [rr, nr] = Se([]),
  [or, ir] = v("bubbles"),
  [ar, lr] = v(null),
  [sr, cr] = v("loading"),
  [ur, dr] = v(null),
  [hr, pr] = v(Et),
  [gr, fr] = v("");

// FYI: подписка на изменение периода баблов
document.addEventListener('toggle-period', ({ detail }) => {
  const buttons = document.querySelectorAll('.configuration-tabs button')

  if (!!buttons && !!buttons[detail]) {

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    buttons[detail].dispatchEvent(clickEvent);
  }

  // Xt($t.length, "period", detail)
})

function vr(e, t) {
  return ""
}
async function mr(e, t) {
  return vr(e, {
    method: "GET",
    signal: null == t ? void 0 : t.signal
  }).then((e => e.json()))
}
async function br(e, t) {
  return vr(e, {
    method: "POST",
    body: t
  })
}
let yr = null;

const convertDataToBubbles = (data) => {
  const res = data.map(currency => {
    return {
      "id": currency.id,
      "name": currency.name,
      "slug": currency.slug,
      "rank": currency.cmcRank,
      "symbol": currency.symbol,
      "symbols": {
        "binance": "BTC_USDT",
        "kucoin": "BTC-USDT",
        "bybit": "BTC/USDT",
        "gateio": "BTC_USDT",
        "coinbase": "BTC-USD",
        "mexc": "BTC_USDT",
        "okx": "BTC-USDT"
      },
      "image": `get-image?id=${currency.id}`,
      "stable": false,
      "circulating_supply": currency.circulatingSupply,
      "dominance": currency.quotes[2].dominance,
      "rankDiffs": {
        "hour": 0,
        "day": 0,
        "week": 0,
        "month": 0,
        "year": 0
      },
      "cg_id": "bitcoin",
      "price": currency.quotes[2],
      "marketcap": currency.quotes[2].marketCap,
      "volume": currency.quotes[2].volume24h,
      "performance": {
        "hour": currency.quotes[2].percentChange1h,
        "min1": 0.04,
        "min5": 0.37,
        "min15": 1.23,
        "day": currency.quotes[2].percentChange24h,
        "week": currency.quotes[2].percentChange7d,
        "month": currency.quotes[2].percentChange30d,
        "year": currency.quotes[2].percentChange1y
      }
    }
  })
  return res;
}

const getData = async (count= 100) => {

  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const parsed = JSON.parse(this.response);
        resolve(convertDataToBubbles(parsed.data.cryptoCurrencyList));
      }
    };
    xhr.open(`GET`,`/get-listing?count=${count}&withLesson=true`)
    xhr.send();
  })
}

function wr(count=100) {
  yr && (yr.abort(), yr = null);
  let e = null;
  try {
    e = new AbortController
  } catch (r) {}
  yr = e;
  const t = hr();
  getData(count).then((e => {
    for (const t of e) {
      if(t.id === 99999999999){
        t.image = '/favicon.png';
      }
      else {
        t.image = `https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`, t.nameUpper = t.name.toUpperCase();
      }
    }
    Nt(t), nr(Fe(e)), cr("loaded")
  })).catch((() => {
    (null == e ? void 0 : e.signal.aborted) || (cr("loading-failed"), pr((() => Dt())))
  }))
}
class _r {
  constructor() {
    this.listeners = []
  }
  register(e) {
    this.listeners.push(e)
  }
  unregister(e) {
    this.listeners = this.listeners.filter((t => t !== e))
  }
  fire(e) {
    for (const t of this.listeners) t(e)
  }
}
const kr = "abcdefghjiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  Cr = class {
    static create(e) {
      const t = navigator.userAgent.toLowerCase(),
        r = -1 !== t.indexOf("android"),
        n = -1 !== t.indexOf("iphone") || -1 !== t.indexOf("ipad");
      this.env = e, this.isWeb = "web" === e || "pwa" === e, this.isMobile = r || n || "android" === e || "ios" === e, this.isMissingAndroidApp = "web" === e && r, this.isMissingIosApp = "web" === e && n, this.isEmbedded = window !== window.parent, this.generateId(), this.addListeners(), this.postAccess(e)
    }
    static generateId() {
      for (let e = 0; e < 6; e++) this.id += kr[Math.floor(62 * Math.random())]
    }
    static addListeners() {
      window.onCryptoBubblesBack = () => this.closeWindow(), window.addEventListener("error", (e => this.handleError(e))), window.addEventListener("keydown", (e => {
        console.log(e)
        "Escape" === e.key && this.closeWindow()
      }))
    }
    static postAccess(e) {
      const t = new FormData;
      t.append("session", this.id), t.append("isMobile", this.isMobile ? "1" : "0"), t.append("translation", Rt().id), t.append("basecurrency", Dt().id), document.referrer && t.append("referer", document.referrer);
      const r = [e, "2024-1-28-12-32"];
      t.append("env", r.join("-")), br("access.js", t)
    }
    static closeWindow() {
      return !this.closeListener || (this.closeListener(), this.closeListener = null, !1)
    }
    static handleError(e) {
      if (this.errorsLeft > 0) {
        const {
          filename: t,
          lineno: r,
          colno: n,
          message: o
        } = e;
        this.errorsLeft--, this.logAction("ERROR", "".concat(t, ":").concat(r, ":").concat(n, " ").concat(o))
      }
    }
    static logAction(e, t = null) {
      const r = new FormData;
      r.append("session", this.id), r.append("type", e), null !== t && r.append("extra", t), br("action.php", r)
    }
    static registerCloseListener(e) {
      this.closeListener && this.closeListener !== e && this.closeListener(), this.closeListener = e
    }
    static unregisterCloseListener(e) {
      this.closeListener === e && (this.closeListener = null)
    }
    static updateData() {
      wr(), this.eventUpdateData.fire()
    }
  };
Cr.eventUpdateData = new _r, Cr.errorsLeft = 3, Cr.id = "", Cr.closeListener = null;
let xr = Cr;
var Mr = Q('<svg viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z">');
const zr = e => {
  return oe(t = Mr(), e, !0, !0), t;
  var t
};
var Lr = Q("<a target=_blank rel=noopener>");

function Br(e) {
  return (t = Lr()).$$click = () => xr.logAction("CLICK_LINK", e.name), ae(t, (() => e.children)), m((r => {
    var n = e.href,
      o = e.title,
      i = e.class;
    return n !== r.e && te(t, "href", r.e = n), o !== r.t && te(t, "title", r.t = o), i !== r.a && re(t, r.a = i), r
  }), {
    e: void 0,
    t: void 0,
    a: void 0
  }), t;
  var t
}
ee(["click"]);
var Ar = Q("<span>Download App");

function Sr() {
  return R(Br, {
    class: "banner",
    get href() {
      return Mt.playStore
    },
    title: "Download App",
    name: "GooglePlay_Banner",
    get children() {
      return [Ar(), R(zr, {})]
    }
  })
}
var Pr = Q('<svg viewBox="4 4 42 42"><path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.430666 5.9902344 44 9.5595687 44 13.990234 L 44 35.990234 C 44 40.4209 40.430666 43.990234 36 43.990234 L 14 43.990234 C 9.5693339 43.990234 6 40.4209 6 35.990234 L 6 13.990234 C 6 9.5595687 9.5693339 5.9902344 14 5.9902344 z M 22.572266 11.892578 C 22.187855 11.867986 21.790969 11.952859 21.433594 12.162109 C 20.480594 12.721109 20.161703 13.947391 20.720703 14.900391 L 22.53125 17.990234 L 16.666016 28 L 12 28 C 10.896 28 10 28.896 10 30 C 10 31.104 10.896 32 12 32 L 27.412109 32 C 27.569109 31.237 27.473203 30.409531 27.033203 29.644531 L 27.029297 29.640625 C 26.642297 28.966625 26.105469 28.416 25.480469 28 L 21.302734 28 L 28.978516 14.898438 C 29.536516 13.945438 29.216672 12.720109 28.263672 12.162109 C 27.309672 11.604109 26.085344 11.923953 25.527344 12.876953 L 24.849609 14.033203 L 24.171875 12.876953 C 23.8225 12.281328 23.212949 11.933564 22.572266 11.892578 z M 28.310547 19.941406 L 27.484375 21.314453 C 26.572375 22.830453 26.542953 24.706859 27.376953 26.255859 L 33.673828 37.001953 C 34.045828 37.637953 34.713391 37.990234 35.400391 37.990234 C 35.743391 37.990234 36.092156 37.902797 36.410156 37.716797 C 37.363156 37.158797 37.682047 35.933469 37.123047 34.980469 L 35.376953 32 L 38 32 C 39.104 32 40 31.104 40 30 C 40 28.896 39.104 28 38 28 L 33.033203 28 L 28.310547 19.941406 z M 14.625 34.003906 C 14.068 33.987906 13.526719 34.074328 13.011719 34.236328 L 12.566406 34.994141 C 12.007406 35.946141 12.32825 37.172469 13.28125 37.730469 C 13.59925 37.917469 13.946063 38.005859 14.289062 38.005859 C 14.976062 38.005859 15.644578 37.650625 16.017578 37.015625 L 17.09375 35.179688 C 16.50875 34.496688 15.653859 34.033906 14.630859 34.003906 L 14.625 34.003906 z">');
const Tr = e => {
  return oe(t = Pr(), e, !0, !0), t;
  var t
};
var Fr = Q("<span>Download App");

function Hr() {
  return R(Br, {
    class: "banner",
    get href() {
      return Mt.appStore
    },
    title: "Download App",
    name: "AppStore_Banner",
    get children() {
      return [Fr(), R(Tr, {})]
    }
  })
}

function Er() {
  return R(U, {
    get when() {
      return !xr.isEmbedded
    },
    get children() {
      return R($, {
        get children() {
          return [R(X, {
            get when() {
              return xr.isMissingAndroidApp
            },
            get children() {
              return R(Sr, {})
            }
          }), R(X, {
            get when() {
              return xr.isMissingIosApp
            },
            get children() {
              return R(Hr, {})
            }
          })]
        }
      })
    }
  })
}

function Dr(...e) {
  return e.filter((e => Boolean(e))).join(" ")
}
var Nr = Q("<button>");

function Or(e) {
  return (t = Nr()).$$click = t => e.onClick(t), ae(t, (() => e.children)), m((r => {
    var n = Dr("icon-button", e.active && "active", e.hidden && "hidden", e.class),
      o = e.title,
      i = e.hidden ? -1 : void 0;
    return n !== r.e && re(t, r.e = n), o !== r.t && te(t, "title", r.t = o), i !== r.a && te(t, "tabindex", r.a = i), r
  }), {
    e: void 0,
    t: void 0,
    a: void 0
  }), t;
  var t
}
ee(["click"]);
var Vr = Q("<div class=data-updater>");

function Rr() {
  let e;
  const t = () => {
    window.clearTimeout(e), e = window.setTimeout((() => requestAnimationFrame(t)), 7e4), xr.updateData()
  };
  return (r = Vr()).addEventListener("animationiteration", t), r;
  var r
}
//custom
document.addEventListener(`updateData`,(data)=>{
  console.log('Added')
  wr(data.detail)
  ce(new CustomEvent('mousedown',{detail:data.detail/100}))
})
var jr = Q('<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z">');
const Ir = e => {
  return oe(t = jr(), e, !0, !0), t;
  var t
};
var Ur = Q('<svg width=24 height=12 viewBox="0 6 24 12"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z">');
const $r = e => {
  return oe(t = Ur(), e, !0, !0), t;
  var t
};
var Xr = Q('<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">');
const Wr = e => {
  return oe(t = Xr(), e, !0, !0), t;
  var t
};
var Yr = Q('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z">');
const Gr = e => {
  return oe(t = Yr(), e, !0, !0), t;
  var t
};
var Zr = Q('<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">');
const qr = e => {
  return oe(t = Zr(), e, !0, !0), t;
  var t
};
var Kr = Q('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">');
const Jr = e => {
  return oe(t = Kr(), e, !0, !0), t;
  var t
};
var Qr = Q("<div>");

function en(e) {
  const [t, r] = v(!1);
  let n;
  window.setTimeout((() => r(!0)), 20), b((() => {
    if (e.onClose) {
      const t = e.onClose;
      document.addEventListener("click", t), k((() => document.removeEventListener("click", t)))
    }
  }));
  const o = y((() => {
      const t = e.anchor.getBoundingClientRect(),
        r = t.x + t.width / 2,
        n = t.y + t.height / 2,
        o = r > window.innerWidth / 2,
        i = n > window.innerHeight / 2,
        a = o ? i ? [1, 0, -1, -1] : [1, 1, -1, 0] : i ? [0, 0, 0, -1] : [0, 1, 0, 0];
      return {
        left: Math.round(t.left + t.width * a[0]),
        top: Math.round(t.top + t.height * a[1]),
        transformX: "".concat(Math.round(100 * a[2]), "%"),
        transformY: "".concat(Math.round(100 * a[3]), "%"),
        sideY: i,
        width: e.width ? "inherit-from-anchor" === e.width ? t.width : e.width : void 0
      }
    })),
    i = y((() => {
      const {
        transformX: e,
        transformY: r,
        left: n,
        top: i,
        sideY: a,
        width: l
      } = o(), s = ["translate(".concat(e, ",").concat(r, ")"), "scaleY(".concat(t() ? 1 : .6, ")")], c = ["left:".concat(n, "px"), "top:".concat(i, "px"), "transform:".concat(s.join(" ")), "opacity:".concat(t() ? 1 : 0), "transform-origin:0 ".concat(a ? "100%" : "0%")];
      return l && c.push("width:".concat(l, "px")), c.join(";")
    }));
  return R(fe, {
    get children() {
      var t = Qr();
      return "function" == typeof n ? ie(n, t) : n = t, ae(t, (() => e.children)), m((r => {
        var n = Dr("popup", e.class),
          o = i();
        return n !== r.e && re(t, r.e = n), r.t = ne(t, o, r.t), r
      }), {
        e: void 0,
        t: void 0
      }), t
    }
  })
}

function tn(e) {
  const t = () => e.options[e.index];
  return R(Or, {
    class: "select-navigator",
    get hidden() {
      return !t()
    },
    get title() {
      var e;
      return null == (e = t()) ? void 0 : e.label
    },
    onClick: () => e.onChange(t().value),
    get children() {
      return e.children
    }
  })
}
var rn = Q("<button>");

function nn(e) {
  return (t = rn()).$$click = t => e.onClick(t), ae(t, (() => e.children)), m((r => {
    var n = Dr("solid-button", e.active && "active", e.class),
      o = e.title;

    return n !== r.e && re(t, r.e = n), o !== r.t && te(t, "title", r.t = o), r
  }), {
    e: void 0,
    t: void 0
  }), t;
  var t
}
ee(["click"]);
var on = Q("<fieldset><legend>");

function an(e) {
  return ae((t = on()).firstChild, (() => e.label)), ae(t, R(I, {
    get each() {
      return e.options
    },
    children: t => R(nn, {
      get active() {
        return t.value === e.value
      },
      class: "select-option",
      onClick: () => e.onChange(t.value),
      get children() {
        return [R(U, {
          keyed: !0,
          get when() {
            return t.iconComponent
          },
          children: e => R(e, {})
        }), y((() => t.label))]
      }
    })
  }), null), t;
  var t
}
var ln = Q("<div class=select-popup-content>"),
  sn = Q("<ul class=menu>"),
  cn = Q("<li><span class=grow>");

function un(e) {
  const [t, r] = v(null);

  function n(t) {
    e.onChange(t)
  }
  const o = y((() => JSON.stringify(e.value))),
    i = y((() => {
      const t = [];
      for (const r of e.children)
        for (const e of r.options) t.push(e);
      return t
    })),
    a = y((() => {
      let t = 0;
      for (const r of e.children)
        for (const e of r.options) {
          if (JSON.stringify(e.value) === o()) return {
            index: t,
            option: e
          };
          t++
        }
      return {
        index: 0,
        option: e.children[0].options[0]
      }
    })),
    l = () => e.children.length > 1 || e.children[0].options.length > 5;
  return [R(U, {
    get when() {
      return e.withNavigator
    },
    get children() {
      return R(tn, {
        get index() {
          return a().index - 1
        },
        get options() {
          return i()
        },
        onChange: n,
        get children() {
          return R(Wr, {})
        }
      })
    }
  }), R(nn, {
    get class() {
      return Dr("select-button", "".concat(e.type, "-select"), t() && "active")
    },
    onClick: e => r(e.currentTarget),
    get children() {
      return [R(U, {
        keyed: !0,
        get when() {
          return a().option.iconComponent
        },
        children: e => R(e, {})
      }), y((() => a().option.label)), R($r, {
        class: "select-button-arrow color-secondary"
      })]
    }
  }), R(U, {
    get when() {
      return e.withNavigator
    },
    get children() {
      return R(tn, {
        get index() {
          return a().index + 1
        },
        get options() {
          return i()
        },
        onChange: n,
        get children() {
          return R(Gr, {})
        }
      })
    }
  }), R(U, {
    keyed: !0,
    get when() {
      return t()
    },
    children: t => R(en, {
      get width() {
        return l() ? 600 : void 0
      },
      get class() {
        return "".concat(e.type, "-select-popup")
      },
      anchor: t,
      onClose: () => r(null),
      get children() {
        return R(U, {
          get when() {
            return l()
          },
          get fallback() {
            return ae(t = sn(), R(I, {
              get each() {
                return e.children[0].options
              },
              children: e => {
                return t = cn(), r = t.firstChild, t.$$click = () => n(e.value), ae(t, R(U, {
                  get when() {
                    return JSON.stringify(e.value) === o()
                  },
                  get fallback() {
                    return R(Jr, {})
                  },
                  get children() {
                    return R(qr, {})
                  }
                }), r), ae(r, (() => e.label)), m((() => re(t, Dr("menu-item", JSON.stringify(e.value) === o() && "selected")))), t;
                var t, r
              }
            })), t;
            var t
          },
          get children() {
            var t = ln();
            return ae(t, R(I, {
              get each() {
                return e.children
              },
              children: e => R(an, {
                get label() {
                  return e.label
                },
                get value() {
                  return o()
                },
                onChange: e => n(JSON.parse(e)),
                get options() {
                  return e.options.map((e => ({
                    ...e,
                    value: JSON.stringify(e.value)
                  })))
                }
              })
            })), t
          }
        })
      }
    })
  })]
}
ee(["click"]);
var dn = Q('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z">');
const hn = e => {
  return oe(t = dn(), e, !0, !0), t;
  var t
};
var pn = Q('<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">');
const gn = e => {
  return oe(t = pn(), e, !0, !0), t;
  var t
};
var fn = Q('<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z">');
const vn = e => {
  return oe(t = fn(), e, !0, !0), t;
  var t
};

function mn(e) {
  return "".concat(Rt().watchlist, " ").concat(e + 1)
}

function bn(e, t) {
  return e.name.trim().length > 0 ? e.name : mn(t)
}

function yn() {
  return [{
    name: Rt().favorites,
    filter: {
      type: "list",
      list: ["favorite"]
    },
    record: Gt,
    iconComponent: gn,
    toggleCurrency: e => Zt(e.id, (e => !e))
  }, ...Jt.map(((e, t) => ({
    name: bn(e, t),
    filter: {
      type: "list",
      list: ["watch", e.id]
    },
    record: e.record,
    iconComponent: vn,
    toggleCurrency: e => Qt(t, "record", e.id, (e => !e))
  }))), {
    name: Rt().blocklist,
    filter: {
      type: "list",
      list: ["block"]
    },
    record: qt,
    iconComponent: hn,
    toggleCurrency: e => Kt(e.id, (e => !e))
  }]
}
let wn = null;
if (location.hash && location.hash.length > 0) {
  const e = location.hash.substring(1).split("&").map((e => e.split("=")));
  if (e.length > 0) {
    const t = e[0];
    2 === t.length && "currencies" === t[0] && (wn = zt(t[1].split(",")))
  }
}

function _n(e) {
  return !wn || wn[e.id]
}

function kn(e) {
  return R(U, {
    when: !wn,
    get children() {
      return R(un, {
        type: "filter",
        get value() {
          return Ot()
        },
        onChange: Vt,
        get withNavigator() {
          return e.withNavigator
        },
        get children() {
          return [{
            label: Rt().pages,
            options: Mt.sliceFilters.map((e => ({
              label: "".concat(e.from, " - ").concat(e.to),
              value: e
            })))
          }, {
            label: Rt().lists,
            options: yn().map((e => ({
              label: e.name,
              value: e.filter,
              iconComponent: e.iconComponent
            })))
          }, {
            label: Rt().exchanges,
            options: Mt.exchanges.map((e => ({
              label: e.name,
              value: {
                type: "exchange",
                exchange: e.id
              },
              iconComponent: e.iconComponent
            })))
          }]
        }
      })
    }
  })
}
var Cn = Q('<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">');
const xn = e => {
  return oe(t = Cn(), e, !0, !0), t;
  var t
};
var Mn = Q('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z">');
const zn = e => {
  return oe(t = Mn(), e, !0, !0), t;
  var t
};
var Ln = Q("<div class=window-content>"),
  Bn = Q('<section><header class="flex-row gap-m">');

function An(e) {
  const [t, r] = v(!0);
  return b((() => {
    xr.registerCloseListener(e.onClose), k((() => xr.unregisterCloseListener(e.onClose)))
  })), n = Bn(), ae(o = n.firstChild, R(Or, {
    get class() {
      return Dr("expand-button", t() && "expanded")
    },
    onClick: () => r(!t()),
    get title() {
      return Rt().window_toggleExpand
    },
    get children() {
      return R(zn, {})
    }
  }), null), ae(o, (() => e.header), null), ae(o, R(Or, {
    get onClick() {
      return e.onClose
    },
    get title() {
      return Rt().window_close
    },
    get children() {
      return R(xn, {})
    }
  }), null), ae(n, R(U, {
    get when() {
      return t()
    },
    get children() {
      var t = Ln();
      return ae(t, (() => e.children)), t
    }
  }), null), m((() => re(n, Dr("window", e.class)))), n;
  var n, o
}
var Sn = Q('<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z">');
const Pn = e => {
  return oe(t = Sn(), e, !0, !0), t;
  var t
};
var Tn = Q("<button>");

function Fn(e) {
  const [t, r] = v(null);
  return [(n = Tn(), n.$$click = e => r(e.currentTarget), ae(n, (() => e.content)), m((r => {
    var o = Dr(e.solid ? "solid-button" : "icon-button", t() && "active", e.class),
      i = e.title;
    return o !== r.e && re(n, r.e = o), i !== r.t && te(n, "title", r.t = i), r
  }), {
    e: void 0,
    t: void 0
  }), n), R(U, {
    keyed: !0,
    get when() {
      return t()
    },
    children: t => R(en, {
      get width() {
        return e.popupWidth
      },
      anchor: t,
      onClose: () => r(null),
      get children() {
        return e.children
      }
    })
  })];
  var n
}
ee(["click"]);
var Hn = Q("<ul class=menu><li class=menu-item><span></span></li><li class=menu-item>");

function En(e) {
  return R(Fn, {
    get title() {
      return Rt().delete
    },
    get content() {
      return R(Pn, {})
    },
    get children() {
      var t = Hn(),
        r = t.firstChild,
        n = r.firstChild,
        o = r.nextSibling;
      return r.$$click = () => e.onDelete(), ae(r, R(Pn, {}), n), ae(n, (() => Rt().confirm)), ae(o, R(xn, {}), null), ae(o, (() => Rt().cancel), null), t
    }
  })
}
ee(["click"]);
var Dn = Q('<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z">');
const Nn = e => {
  return oe(t = Dn(), e, !0, !0), t;
  var t
};
var On = Q('<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">');
const Vn = e => {
  return oe(t = On(), e, !0, !0), t;
  var t
};
var Rn = Q('<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z">');
const jn = e => {
  return oe(t = Rn(), e, !0, !0), t;
  var t
};
var In = Q("<div><input size=1>");

function Un(e) {
  const [t, r] = v(!1);
  let n;

  function o() {
    document.execCommand("copy") && r(!0)
  }

  function i() {
    if (n) {
      const {
        value: t
      } = n;
      if (t) {
        n.select();
        try {
          navigator.clipboard.writeText(t).then((() => r(!0))).catch(o)
        } catch (e) {
          o()
        }
      }
    }
  }

  function a(t) {
    e.onInput && e.onInput(t)
  }

  function l() {
    n && (n.focus(), e.readonly && n.select())
  }
  b((() => {
    e.autoFocus && n && n.focus()
  }));
  const s = () => 0 === e.value.length;
  return (() => {
    var r = In(),
      o = r.firstChild;
    r.$$click = l, ae(r, R(U, {
      keyed: !0,
      get when() {
        return e.iconComponent
      },
      children: e => R(e, {
        class: "input-icon"
      })
    }), o), o.$$keydown = t => {
      e.onKeyDown && e.onKeyDown(t)
    }, o.addEventListener("blur", (t => {
      e.onBlur && e.onBlur(t)
    })), o.addEventListener("focus", (t => {
      e.onFocus && e.onFocus(t)
    })), o.$$input = e => a(e.currentTarget.value);
    return "function" == typeof n ? ie(n, o) : n = o, ae(r, R($, {
      get children() {
        return [R(X, {
          get when() {
            return "clear" === e.action
          },
          get children() {
            return R(Or, {
              title: "Clear",
              get hidden() {
                return s()
              },
              class: "input-action",
              get active() {
                return t()
              },
              onClick: () => a(""),
              get children() {
                return R(xn, {})
              }
            })
          }
        }), R(X, {
          get when() {
            return "copy" === e.action
          },
          get children() {
            return R(Or, {
              get title() {
                return Rt().copy
              },
              get hidden() {
                return s()
              },
              class: "input-action",
              get active() {
                return t()
              },
              onClick: i,
              get children() {
                return R(jn, {})
              }
            })
          }
        })]
      }
    }), null), m((t => {
      var n = Dr("input", e.class),
        i = e.type,
        a = e.placeholder,
        l = e.readonly;
      return n !== t.e && re(r, t.e = n), i !== t.t && te(o, "type", t.t = i), a !== t.a && te(o, "placeholder", t.a = a), l !== t.o && (o.readOnly = t.o = l), t
    }), {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), m((() => o.value = e.value)), r
  })()
}
ee(["click", "input", "keydown"]);
const $n = zt(["BTC", "ETH"]);

function Xn() {
  return R(un, {
    type: "basecurrency",
    get value() {
      return hr()
    },
    onChange: pr,
    get children() {
      return [{
        label: "Fiat",
        options: Mt.baseCurrencies.filter((e => !$n[e.code])).map((e => ({
          value: e,
          label: "".concat(e.symbol, " ").concat(e.code)
        })))
      }, {
        label: "Crypto",
        options: Mt.baseCurrencies.filter((e => $n[e.code])).map((e => ({
          value: e,
          label: "".concat(e.symbol, " ").concat(e.code)
        })))
      }]
    }
  })
}

function Wn() {
  return R(un, {
    type: "colors",
    get value() {
      console.log(this)
      return It()
    },
    onChange: Ut,
    get children() {
      return [{
        label: "",
        options: [{
          value: "red-green",
          label: Rt().red_green
        }, {
          value: "yellow-blue",
          label: Rt().yellow_blue
        }]
      }]
    }
  })
}

function Yn() {
  return R(un, {
    type: "translation",
    get value() {
      return Rt().id
    },
    onChange: function(e) {
      const t = Mt.translations.find((t => t.id === e));
      t && jt(t)
    },
    get children() {
      return [{
        label: "",
        options: Mt.translations.map((e => ({
          value: e.id,
          label: e.name,
          iconComponent: e.flag
        })))
      }]
    }
  })
}
var Gn = Q('<svg viewBox="0 0 24 24"><path d="M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z">');
const Zn = e => {
  return oe(t = Gn(), e, !0, !0), t;
  var t
};
var qn = Q('<svg viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z">');
const Kn = e => {
  return oe(t = qn(), e, !0, !0), t;
  var t
};
var Jn = Q('<svg viewBox="0 0 24 24"><path d=M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z>');
const Qn = e => {
  return oe(t = Jn(), e, !0, !0), t;
  var t
};
var eo = Q("<div class=popup-content>");

function to(e) {
  return (t = eo()).$$click = e => e.stopImmediatePropagation(), ae(t, (() => e.children)), t;
  var t
}
ee(["click"]);
var ro = Q("<p>This will import the exported data and <strong>DELETE</strong> your current data."),
  no = Q("<button class=solid-button>"),
  oo = Q("<button class=solid-button>Import");

function io() {
  const [e, t] = v(""), r = y((() => {
    try {
      const t = JSON.parse(e());
      if (null == t ? void 0 : t.translation) return t
    } catch (t) {}
    return null
  }));
  return R(to, {
    get children() {
      return [ro(), R(Un, {
        get value() {
          return e()
        },
        onInput: t,
        placeholder: "Paste exported data here"
      }), R(U, {
        keyed: !0,
        get when() {
          return r()
        },
        get fallback() {
          return ae(t = no(), (() => "" === e() ? "Data is empty" : "Data is invalid")), t;
          var t
        },
        children: e => {
          return t = oo(), r = t.firstChild, t.$$click = () => {
            St.save(e), location.reload()
          }, ae(t, R(Kn, {}), r), t;
          var t, r
        }
      })]
    }
  })
}
ee(["click"]);
var ao = Q("<p class=no-margin-bottom>Full experience"),
  lo = Q("<p>You can also generate the HTML widget for one of your lists. But currently all your lists are empty."),
  so = Q('<p class="flex-row gap-m no-margin-bottom">');

function co() {
  const e = 'width="1300px" height="700px" style="border: none;"';
  return R(to, {
    get children() {
      return [ao(), R(Un, {
        readonly: !0,
        action: "copy",
        value: '<iframe src="https://cryptobubbles.net" '.concat(e, "></iframe>")
      }), R(I, {
        get each() {
          return yn().filter((e => Lt(e.record).length > 0))
        },
        get fallback() {
          return lo()
        },
        children: t => {
          const r = Lt(t.record).join(",");
          return [(n = so(), ae(n, R(t.iconComponent, {}), null), ae(n, (() => t.name), null), n), R(Un, {
            readonly: !0,
            action: "copy",
            value: '<iframe src="https://cryptobubbles.net#currencies='.concat(r, '" ').concat(e, "></iframe>")
          })];
          var n
        }
      })]
    }
  })
}

function uo() {
  return R(un, {
    type: "hidestables",
    get value() {
      return er()
    },
    onChange: tr,
    get children() {
      return [{
        label: "",
        options: [{
          value: !1,
          label: Rt().show
        }, {
          value: !0,
          label: Rt().hide
        }]
      }]
    }
  })
}
var ho = Q('<li class=flex-row><span class="grow color-secondary">Stablecoins'),
  po = Q('<li class=settings-watchlists><div class="settings-watchlists-header flex-row color-secondary"><span></span></div><ul class=settings-watchlists-list>'),
  go = Q("<p>This contains your settings and lists. Use it as a backup or to import your data to another device."),
  fo = Q("<li class=settings-buttons>"),
  vo = Q('<ul class=settings-page><li class=flex-row><span class="grow color-secondary"></span></li><li class=flex-row><span class="grow color-secondary"></span></li><li class=flex-row><span class="grow color-secondary">'),
  mo = Q('<li class="flex-row gap-m">');

function bo() {
  return e = vo(), t = e.firstChild, r = t.firstChild, n = t.nextSibling, o = n.firstChild, i = n.nextSibling, a = i.firstChild, ae(r, (() => Rt().currency)), ae(t, R(Xn, {}), null), ae(o, (() => Rt().language)), ae(n, R(Yn, {}), null), ae(a, (() => Rt().colors)), ae(i, R(Wn, {}), null), ae(e, R(U, {
    when: !wn,
    get children() {
      return [(i = ho(), i.firstChild, ae(i, R(uo, {}), null), i), (t = po(), r = t.firstChild, n = r.firstChild, o = r.nextSibling, ae(n, (() => Rt().watchlists)), ae(r, R(Or, {
        class: "button-add",
        get title() {
          return Rt().watchlist_add
        },
        onClick: () => Qt((e => [...e, Pt()])),
        get children() {
          return R(Nn, {})
        }
      }), null), ae(o, R(I, {
        each: Jt,
        children: (e, t) => {
          return ae(r = mo(), R(Un, {
            get value() {
              return e.name
            },
            action: "clear",
            class: "grow",
            iconComponent: Vn,
            get placeholder() {
              return mn(t())
            },
            onInput: e => Qt(t(), "name", e)
          }), null), ae(r, R(En, {
            onDelete: () => function(e) {
              Qt((t => t.filter((t => t.id !== e.id)))), Vt((t => "list" === t.type && "watch" === t.list[0] && t.list[1] === e.id ? Mt.sliceFilters[0] : t))
            }(e)
          }), null), r;
          var r
        }
      })), t), (e = fo(), ae(e, R(Fn, {
        solid: !0,
        popupWidth: 400,
        get content() {
          return [R(Zn, {}), "Export settings + lists"]
        },
        get children() {
          return R(to, {
            get children() {
              return [go(), R(Un, {
                readonly: !0,
                action: "copy",
                get value() {
                  return JSON.stringify(St.generateSave())
                }
              })]
            }
          })
        }
      }), null), ae(e, R(Fn, {
        solid: !0,
        popupWidth: 400,
        get content() {
          return [R(Kn, {}), "Import settings + lists"]
        },
        get children() {
          return R(io, {})
        }
      }), null), ae(e, R(Fn, {
        solid: !0,
        popupWidth: 400,
        get content() {
          return [R(Qn, {}), "Generate HTML widget"]
        },
        get children() {
          return R(co, {})
        }
      }), null), e)];
      var e, t, r, n, o, i
    }
  }), null), e;
  var e, t, r, n, o, i, a
}
var yo = Q("<span class=grow>");

function wo(e) {
  return R(An, {
    class: "settings-window",
    get onClose() {
      return e.onClose
    },
    get header() {
      return [R(Ir, {}), (e = yo(), ae(e, (() => Rt().settings)), e)];
      var e
    },
    get children() {
      return R(bo, {})
    }
  })
}
var _o = Q("<div>");

function ko(e) {
  const [t, r] = v(""), [n, o] = v(null);
  b((() => {
    e.value ? (window.setTimeout((() => r("in")), 20), o((() => e.value))) : (r("out"), window.setTimeout((() => o(null)), 400))
  }));
  const i = y((() => e.value || n()));
  return R(U, {
    get when() {
      return i()
    },
    get children() {
      return R(fe, {
        get children() {
          var r = _o();
          return ae(r, R(e.component, {
            get value() {
              return i()
            },
            get onClose() {
              return e.onClose
            }
          })), m((() => re(r, Dr("window-host", t())))), r
        }
      })
    }
  })
}
var Co = Q('<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">');
const xo = e => {
  return oe(t = Co(), e, !0, !0), t;
  var t
};
var Mo = Q("<div><img width=24><span>");

function zo(e) {
  return t = Mo(), ae((r = t.firstChild).nextSibling, (() => e.currency.name)), m((n => {
    var o = Dr("flex-row gap-m", e.class),
      i = e.currency.image,
      a = e.currency.name,
      l = "Logo of ".concat(e.currency.name);
    return o !== n.e && re(t, n.e = o), i !== n.t && te(r, "src", n.t = i), a !== n.a && te(r, "alt", n.a = a), l !== n.o && te(r, "title", n.o = l), n
  }), {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0
  }), t;
  var t, r
}

function Lo(e) {
  switch (e.type) {
    case "list": {
      const t = function(e) {
        switch (e.list[0]) {
          case "block":
            return qt;
          case "watch": {
            const t = e.list[1],
              r = Jt.find((e => e.id === t));
            if (r) return r.record
          }
        }
        return Gt
      }(e);
      return e => t[e.id]
    }
    case "slice":
      return t => t.rank >= e.from && t.rank <= e.to;
    case "exchange":
      return t => null !== t.symbols[e.exchange];
    default:
      return e => e.rank > 0 && e.rank <= 100
  }
}

function Bo(e, t) {
  return !0 === t[e.id]
}

function Ao(e) {
  return Bo(e, qt)
}
const {
  filteredCurrencies: So,
  selectedConfiguration: Po,
  selectedCurrency: To,
  searchResults: Fo
} = f((() => ({
  filteredCurrencies: y((() => {
    if (wn) return rr.filter(_n);
    const e = Ot(),
      t = Lo(e);
    let r = t;
    return "list" !== e.type && (r = er() ? e => !e.stable && !Ao(e) && t(e) : e => !Ao(e) && t(e)), rr.filter(r)
  })),
  selectedConfiguration: y((() => {
    const e = Wt();
    return $t.find((t => t.id === e)) || $t[0]
  })),
  selectedCurrency: y((() => {
    const e = ar();
    return e && rr.find((t => t.id === e)) || null
  })),
  searchResults: () => {
    const e = gr().trim().toUpperCase(),
      t = [];
    for (const r of rr)
      if (_n(r) && (r.nameUpper.includes(e) || r.symbol.includes(e)) && (t.push(r), 10 === t.length)) break;
    return t
  }
})));
var Ho = Q('<ul class="menu search-results">'),
  Eo = Q("<p class=center>"),
  Do = Q('<li><span class="color-secondary right"></span><span class=text-secondary>');

function No(e) {
  return R(U, {
    get when() {
      return Fo().length > 0
    },
    get fallback() {
      return ae(e = Eo(), (() => Rt().not_found)), e;
      var e
    },
    get children() {
      var t = Ho();
      return t.$$mousedown = e => {
        e.preventDefault()
      }, ae(t, R(I, {
        get each() {
          return Fo()
        },
        children: (t, r) => {
          return n = Do(), o = n.firstChild, i = o.nextSibling, n.$$click = () => e.onSelect(t), o.style.setProperty("width", "2.5em"), ae(o, (() => t.rank)), ae(n, R(zo, {
            currency: t,
            class: "grow"
          }), i), ae(i, (() => t.symbol)), m((() => re(n, Dr("menu-item", r() === e.focusIndex && "focused")))), n;
          var n, o, i
        }
      })), t
    }
  })
}

function Oo() {
  return true;
}
ee(["mousedown", "click"]);
const [Vo, Ro] = v(Oo());

function jo() {
  document.activeElement instanceof HTMLElement && document.activeElement.blur()
}

function Io(e) {
  const [t, r] = v(null), [n, o] = v(0);

  function i(e) {
    lr(e.id), ir((e => "settings" === e ? "bubbles" : e));
    if (!So().some((t => e.id === t.id))) {
      const t = Mt.sliceFilters.find((t => e.rank >= t.from && e.rank <= t.to));
      t && Vt(t)
    }
    jo()
  }
  return [R(Un, {
    get value() {
      return gr()
    },
    get autoFocus() {
      return !Vo()
    },
    iconComponent: xo,
    get placeholder() {
      return Rt().search_crypto
    },
    onInput: e => {
      fr(e), o(0)
    },
    onFocus: e => {
      r(e.currentTarget.parentElement)
    },
    onBlur: () => {
      r(null), fr(""), o(0), e.onBlur && e.onBlur()
    },
    onKeyDown: e => {
      let t = !0;
      switch (e.key) {
        case "ArrowDown":
          o((e => {
            const t = e + 1;
            return t >= Fo().length ? 0 : t
          }));
          break;
        case "ArrowUp":
          o((e => {
            const t = e - 1;
            return t < 0 ? Fo().length - 1 : t
          }));
          break;
        case "Enter": {
          const e = Fo()[n()];
          e && i(e);
          break
        }
        case "Escape":
          jo();
          break;
        default:
          t = !1
      }
      t && e.preventDefault()
    }
  }), R(U, {
    keyed: !0,
    get when() {
      return t()
    },
    children: e => R(en, {
      width: "inherit-from-anchor",
      anchor: e,
      get children() {
        return R(No, {
          get focusIndex() {
            return n()
          },
          onSelect: i
        })
      }
    })
  })]
}
window.addEventListener("resize", (() => {
  Ro(Oo())
}));
var Uo = Q('<svg viewBox="0 -960 960 960"><path d=M120-200v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z>');
const $o = e => {
  return oe(t = Uo(), e, !0, !0), t;
  var t
};

function Xo() {
  const e = () => window.innerHeight / 2,
    t = () => window.scrollY >= e() / 2,
    [r, n] = v(t());

  function o() {
    n(t())
  }
  return window.addEventListener("scroll", o), k((() => {
    window.removeEventListener("scroll", o)
  })), R(Or, {
    onClick: function() {
      r() ? function() {
        try {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        } catch (e) {
          window.scrollTo(0, 0)
        }
      }() : function() {
        try {
          window.scrollBy({
            top: e(),
            behavior: "smooth"
          })
        } catch (t) {
          window.scrollBy(0, e())
        }
      }()
    },
    get active() {
      return r()
    },
    get children() {
      return R($o, {})
    }
  })
}
var Wo = Q('<div class="flex-row gap-m header-padded">'),
  Yo = Q("<header><img class=logo><h1></h1><div class=grow>");

function Go() {
  const [e, t] = v(!1), [r, n] = v(!1);
  return o = Yo(), i = o.firstChild, (a = i.nextSibling).nextSibling, ae(a, (() => Mt.app)), ae(o, R(U, {
    get when() {
      return Vo()
    },
    get fallback() {
      return R(U, {
        get when() {
          return r()
        },
        get fallback() {
          return R(Or, {
            get title() {
              return Rt().search_crypto
            },
            onClick: () => n(!0),
            get children() {
              return R(xo, {})
            }
          })
        },
        get children() {
          return R(Io, {
            onBlur: () => n(!1)
          })
        }
      })
    },
    get children() {
      return [R(Io, {}), (r = Wo(), ae(r, R(kn, {
        withNavigator: !0
      })), r), R(Xn, {}), R(Xo, {}), R(Or, {
        get active() {
          return e()
        },
        onClick: () => t((e => !e)),
        get title() {
          return Rt().settings
        },
        get children() {
          return R(Ir, {})
        }
      }), R(ko, {
        get value() {
          return e()
        },
        component: wo,
        onClose: () => t(!1)
      })];
      var r
    }
  }), null), ae(o, R(Rr, {}), null), m((e => {
    var t = Dr("header flex-row gap-m", r() && "mobile-search-open"),
      n = Mt.logo,
      a = Mt.app,
      l = "Logo of ".concat(Mt.app);
    return t !== e.e && re(o, e.e = t), n !== e.t && te(i, "src", e.t = n), a !== e.a && te(i, "alt", e.a = a), l !== e.o && te(i, "title", e.o = l), e
  }), {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0
  }), o;
  var o, i, a
}
var Zo = Q('<svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z">');
const qo = e => {
  return oe(t = Zo(), e, !0, !0), t;
  var t
};
var Ko = Q('<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z">');
const Jo = e => {
  return oe(t = Ko(), e, !0, !0), t;
  var t
};
var Qo = Q('<svg viewBox="0 0 300 271"width=24 height=24><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z">');
const ei = e => {
  return oe(t = Qo(), e, !0, !0), t;
  var t
};
var ti = Q("<div class=support-crypto><div class=support-crypto-options>"),
  ri = Q("<p class=color-secondary>Version ");
const ni = [{
  name: "BTC",
  address: "bc1q8pep7zf7txjcjrslse7crqlgr0f36fwuxnzad0"
}, {
  name: "ETH",
  address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3"
}, {
  name: "BSC",
  address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3"
}, {
  name: "SOL",
  address: "7bWCETt2r6bM7CitSahqiujAM9UR2o14QMyw3xB4QDox"
}, {
  name: "XRP",
  address: "rpeeapKyDQE9JhRPkRZA3WtzmiYCxZ3jCL"
}, {
  name: "LTC",
  address: "LX7Bzbn2aEEt64DZZzW653tkSvYBQ7cs6q"
}, {
  name: "XLM",
  address: "GALMTBOTY4FQ4GBZW5X4XH3673SWEAYB3CPMEVGTX67NNXNV6DV77BWN"
}, {
  name: "XMR",
  address: "4ARo28zbpru9PqFqd1XGSyPipH83PG38eKj9uSinwPgKMfAYKehgR5SFyrQDEN9A7VdBcUQMPnfcZARm5yNWfxXdGNeZfj6"
}];

function oi() {
  const [e, t] = v(null);
  return ae((r = ti()).firstChild, R(I, {
    each: ni,
    children: r => R(nn, {
      get active() {
        return e() === r
      },
      onClick: () => t((e => e === r ? null : r)),
      get children() {
        return r.name
      }
    })
  })), ae(r, R(U, {
    keyed: !0,
    get when() {
      return e()
    },
    get fallback() {
      return (e = ri()).firstChild, ae(e, "2024-1-28-12-32", null), e;
      var e
    },
    children: e => R(Un, {
      readonly: !0,
      action: "copy",
      get value() {
        return e.address
      }
    })
  }), null), r;
  var r
}
var ii = Q('<svg viewBox="0 0 512 512"><path d="m484.689 98.231-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z">');
const ai = e => {
  return oe(t = ii(), e, !0, !0), t;
  var t
};
var li = Q("<span class=grow>");

function si() {
  return R(Fn, {
    solid: !0,
    get content() {
      return ["Register on", R(I, {
        get each() {
          return Mt.exchanges
        },
        children: e => R(U, {
          get when() {
            return e.referralUrl
          },
          get children() {
            return R(e.iconComponent, {})
          }
        })
      })]
    },
    get children() {
      return R(I, {
        get each() {
          return Mt.exchanges
        },
        children: e => R(U, {
          keyed: !0,
          get when() {
            return e.referralUrl
          },
          children: t => R(Br, {
            class: "menu-item",
            href: t,
            get title() {
              return "Register on ".concat(e.name)
            },
            get name() {
              return "".concat(e.name, "_Register")
            },
            get children() {
              return [R(e.iconComponent, {}), (t = li(), ae(t, (() => e.name)), t), R(Gr, {})];
              var t
            }
          })
        })
      })
    }
  })
}
var ci = Q('<footer><section><p class="flex-row gap-m"><img width=32 height=32><span></span></p><h2></h2><p>Crypto Bubbles is available as a website at cryptobubbles.net and as an app for your phone.</p><p>No financial advice. Do your own research!</p><p>Ulrich Stark, 92637 Weiden, Germany<br></p><nav class="flex-row gap-m"></nav></section><section class="support-my-work flex-column gap-m"><h2>');

function ui() {
  return (() => {
    var e = ci(),
      t = e.firstChild,
      r = t.firstChild,
      n = r.firstChild,
      o = n.nextSibling,
      i = r.nextSibling,
      a = i.nextSibling.nextSibling.nextSibling;
    a.firstChild.nextSibling;
    var l = a.nextSibling,
      s = t.nextSibling,
      c = s.firstChild;
    return ae(o, (() => Mt.app)), ae(i, (() => Rt().description)), ae(a, (() => Mt.email), null), ae(l, R(U, {
      get when() {
        return xr.isWeb
      },
      get children() {
        return [R(Br, {
          class: "icon-button",
          get href() {
            return Mt.playStore
          },
          title: "Crypto Bubbles on Play Store",
          name: "GooglePlay",
          get children() {
            return R(zr, {})
          }
        }), R(Br, {
          class: "icon-button",
          get href() {
            return Mt.appStore
          },
          title: "Crypto Bubbles on App Store",
          name: "AppStore",
          get children() {
            return R(Tr, {})
          }
        })]
      }
    }), null), ae(l, R(Br, {
      class: "icon-button",
      get href() {
        return "mailto:".concat(Mt.email)
      },
      get title() {
        return "Send E-Mail to ".concat(Mt.email)
      },
      name: "Mail",
      get children() {
        return R(Jo, {})
      }
    }), null), ae(l, R(Br, {
      class: "icon-button",
      get href() {
        return "https://www.instagram.com/".concat(Mt.instagram)
      },
      get title() {
        return "@".concat(Mt.instagram, " on Instagram")
      },
      name: "Instagram",
      get children() {
        return R(qo, {})
      }
    }), null), ae(l, R(Br, {
      class: "icon-button",
      get href() {
        return "https://t.me/".concat(Mt.telegram)
      },
      get title() {
        return "@".concat(Mt.telegram, " on Telegram")
      },
      name: "Telegram",
      get children() {
        return R(ai, {})
      }
    }), null), ae(l, R(Br, {
      class: "icon-button",
      get href() {
        return "https://twitter.com/".concat(Mt.twitter)
      },
      get title() {
        return "@".concat(Mt.twitter, " on X")
      },
      name: "Twitter",
      get children() {
        return R(ei, {})
      }
    }), null), ae(c, (() => Rt().support_my_work)), ae(s, R(U, {
      get when() {
        return "ios" === xr.env
      },
      get children() {
        return R(Br, {
          class: "solid-button",
          get href() {
            return Mt.appStore
          },
          name: "AppStore_Rate",
          get children() {
            return ["Rate App on App Store ", R(Tr, {})]
          }
        })
      }
    }), null), ae(s, R(U, {
      get when() {
        return "android" === xr.env
      },
      get children() {
        return R(Br, {
          class: "solid-button",
          get href() {
            return Mt.playStore
          },
          name: "GooglePlay_Rate",
          get children() {
            return ["Rate App on Play Store ", R(zr, {})]
          }
        })
      }
    }), null), ae(s, R(Br, {
      class: "solid-button",
      get href() {
        return "https://twitter.com/intent/follow?screen_name=".concat(Mt.twitter)
      },
      name: "Twitter_Follow",
      get children() {
        return ["Follow Crypto Bubbles on ", R(ei, {})]
      }
    }), null), ae(s, R(si, {}), null), ae(s, R(oi, {}), null), m((e => {
      var t = Mt.logo,
        r = Mt.app,
        o = "Logo of ".concat(Mt.app);
      return t !== e.e && te(n, "src", e.e = t), r !== e.t && te(n, "alt", e.t = r), o !== e.a && te(n, "title", e.a = o), e
    }), {
      e: void 0,
      t: void 0,
      a: void 0
    }), e
  })()
}

function di(e) {
  lr((t => t === e ? null : e))
}

function hi(e, t) {
  e < 0 && (e = 0);
  let r = 0 === e ? 2 : 3 - Math.ceil(Math.log10(e));
  r < 0 && (r = 0), r > 10 && (r = 10), 1 === r && (r = 2), e > 1e6 && (r = 2), Number.isFinite(r) || (r = 0);
  const n = {
    style: "currency",
    currency: t.code,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: r,
    maximumFractionDigits: r
  };
  e > 1e6 && (n.notation = "compact");
  try {
    return e.toLocaleString(void 0, n)
  } catch (o) {
    return n.currencyDisplay = "symbol", e.toLocaleString(void 0, n)
  }
}

function pi(e, t) {
  if (null === e) return "-";
  e *= .01;
  const r = Math.abs(e);
  r < 5e-4 && (e = .001 * Math.sign(e));
  const n = {
    style: "percent",
    signDisplay: t ? "never" : "exceptZero",
    maximumFractionDigits: r >= 1 ? 0 : 1
  };
  return e.toLocaleString(void 0, n).replace(/\u00a0/, "")
}

function gi(e) {
  return Bo(e, Gt)
}
var fi = Q('<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z">');
const vi = e => {
  return oe(t = fi(), e, !0, !0), t;
  var t
};
var mi = Q("<ul class=menu>"),
  bi = Q("<li><span class=grow>");

function yi(e) {
  return R(U, {
    when: !wn,
    get children() {
      return R(Fn, {
        class: "button-lists",
        get title() {
          return Rt().add_to_list
        },
        get content() {
          return [R(Nn, {}), R(I, {
            get each() {
              return (() => {
                const t = [];
                Ao(e.currency) && t.push(hn), gi(e.currency) && t.push(gn);
                for (const r of Jt)
                  if (Bo(e.currency, r.record)) {
                    t.push(vn);
                    break
                  } return t
              })()
            },
            children: e => R(e, {
              class: "color-secondary"
            })
          })]
        },
        get children() {
          var t = mi();
          return ae(t, R(I, {
            get each() {
              return yn()
            },
            children: t => {
              return r = bi(), n = r.firstChild, r.$$click = r => {
                t.toggleCurrency(e.currency), r.stopImmediatePropagation()
              }, ae(r, R(t.iconComponent, {}), n), ae(n, (() => t.name)), ae(r, R(U, {
                get when() {
                  return Bo(e.currency, t.record)
                },
                get fallback() {
                  return R(Nn, {})
                },
                get children() {
                  return R(vi, {})
                }
              }), null), m((() => re(r, Dr("menu-item", Bo(e.currency, t.record) && "selected")))), r;
              var r, n
            }
          })), t
        }
      })
    }
  })
}
ee(["click"]);
var wi = Q('<svg viewBox="-7 -7 55 55"><rect x=-7 y=-7 width=55 height=55 fill=#3861fb rx=12></rect><path d="m35.124 24.5c-0.715 0.452-1.557 0.508-2.197 0.147-0.813-0.459-1.26-1.534-1.26-3.029v-4.473c0-2.16-0.854-3.697-2.282-4.112-2.42-0.705-4.24 2.256-4.924 3.368l-4.268 6.92v-8.458c-0.048-1.946-0.68-3.11-1.88-3.461-0.794-0.232-1.982-0.139-3.136 1.627l-9.562 15.354c-1.2801-2.4302-1.9475-5.1363-1.944-7.883 0-9.249 7.412-16.773 16.522-16.773s16.521 7.524 16.521 16.773c0 0.016 4e-3 0.03 5e-3 0.045 0 0.016-3e-3 0.03-2e-3 0.046 0.086 1.791-0.494 3.216-1.593 3.91zm5.261-3.999v-0.047l-1e-3 -0.046c-0.051-11.264-9.088-20.408-20.192-20.408-11.133 0-20.192 9.196-20.192 20.5 0 11.303 9.059 20.5 20.193 20.5 5.109 0 9.985-1.942 13.728-5.467 0.744-0.7 0.788-1.879 0.098-2.633-0.68394-0.7542-1.854-0.79931-2.594-0.1-3.0339 2.873-7.0536 4.4738-11.232 4.473-4.878 0-9.267-2.159-12.294-5.583l8.623-13.846v6.383c0 3.066 1.189 4.057 2.186 4.347 0.998 0.29 2.523 0.092 4.124-2.508l4.743-7.689c0.152-0.248 0.292-0.462 0.42-0.647v3.888c0 2.866 1.148 5.158 3.149 6.287 1.804 1.018 4.072 0.926 5.92-0.24 2.24-1.415 3.447-4.022 3.321-7.164z"fill=#fff>');
const _i = e => {
  return (t = wi()).firstChild, oe(t, e, !0, !0), t;
  var t
};

function ki(e) {
  return R(U, {
    keyed: !0,
    get when() {
      return e.currency.slug
    },
    children: t => R(Br, {
      href: "https://coinmarketcap.com/currencies/".concat(t),
      get title() {
        return Rt().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "CoinMarketCap")
      },
      name: "CMC",
      class: "icon-button",
      get children() {
        return R(_i, {})
      }
    })
  })
}
var Ci = Q('<svg viewBox="0 0 276 276"><path fill=#8dc63f d=M276,137.39A138,138,0,1,1,137.39,0h0A138,138,0,0,1,276,137.39Z></path><path fill=#f9e988 d=M265.65,137.44a127.63,127.63,0,1,1-128.21-127h0A127.65,127.65,0,0,1,265.65,137.44Z></path><path fill=#8dc63f d=M202.74,92.39c-9.26-2.68-18.86-6.48-28.58-10.32-.56-2.44-2.72-5.48-7.09-9.19-6.35-5.51-18.28-5.37-28.59-2.93-11.38-2.68-22.62-3.63-33.41-1C16.82,93.26,66.86,152.57,34.46,212.19c4.61,9.78,54.3,66.84,126.2,51.53,0,0-24.59-59.09,30.9-87.45C236.57,153.18,269.09,110.46,202.74,92.39Z></path><path fill=white d=M144.6,106.58a24.68,24.68,0,1,1-24.69-24.67h0a24.68,24.68,0,0,1,24.68,24.66Z></path><path fill=#222 d=M137.28,106.8a17.36,17.36,0,1,1-17.36-17.36h0A17.36,17.36,0,0,1,137.28,106.8Z></path><path fill=#8dc63f d=M233.63,142.08c-20,14.09-42.74,24.78-75,24.78-15.1,0-18.16-16-28.14-8.18-5.15,4.06-23.31,13.14-37.72,12.45S55,162,48.49,131.23C45.91,162,44.59,184.65,33,210.62c23,36.83,77.84,65.24,127.62,53C155.31,226.27,188,189.69,206.34,171c7-7.09,20.3-18.66,27.29-28.91Z>');
const xi = e => {
  return oe(t = Ci(), e, !0, !0), t;
  var t
};

function Mi(e) {
  return R(U, {
    keyed: !0,
    get when() {
      return e.currency.cg_id
    },
    children: t => R(Br, {
      href: "https://www.coingecko.com/coins/".concat(t),
      get title() {
        return Rt().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "CoinGecko")
      },
      name: "CoinGecko",
      class: "icon-button",
      get children() {
        return R(xi, {})
      }
    })
  })
}
var zi = Q("<div>"),
  Li = Q("<span class=grow>");

function Bi(e) {
  function t(t) {
    return Rt().trade_tooltip.replace("(currency)", e.currency.name).replace("(exchange)", t)
  }
  const r = y((() => {
    const t = [];
    let r = 0;
    for (const n of Mt.exchanges) {
      const o = e.currency.symbols[n.id];
      t.push({
        exchange: n,
        symbol: o
      }), o && r++
    }
    return {
      items: t,
      count: r
    }
  }));
  return R(U, {
    get when() {
      return r().count > 0
    },
    get children() {
      return R(Fn, {
        solid: !0,
        get title() {
          return t(r().items.filter((e => e.symbol)).map((e => e.exchange.name)).join(", "))
        },
        get content() {
          return [y((() => Rt().trade)), R(I, {
            get each() {
              return r().items
            },
            children: t => R(U, {
              get when() {
                return t.symbol
              },
              get fallback() {
                return R(U, {
                  get when() {
                    return e.insertUnlistedDummys
                  },
                  get children() {
                    var e = zi();
                    return e.style.setProperty("width", "24px"), e
                  }
                })
              },
              get children() {
                return R(t.exchange.iconComponent, {})
              }
            })
          })]
        },
        get children() {
          return R(I, {
            get each() {
              return r().items
            },
            children: e => R(U, {
              keyed: !0,
              get when() {
                return e.symbol
              },
              children: r => R(Br, {
                class: "menu-item",
                get href() {
                  return e.exchange.getSpotTradeUrl(r)
                },
                get title() {
                  return t(e.exchange.name)
                },
                get name() {
                  return "".concat(e.exchange.name, "_Trade")
                },
                get children() {
                  return [R(e.exchange.iconComponent, {}), (t = Li(), ae(t, (() => e.exchange.name)), t), R(Gr, {})];
                  var t
                }
              })
            })
          })
        }
      })
    }
  })
}
var Ai = Q('<div class="currency-links flex-row gap-m" style="display: none !important;">');

function Si(e) {
  return ae(t = Ai(), R(ki, {
    get currency() {
      return e.currency
    }
  }), null), ae(t, R(Mi, {
    get currency() {
      return e.currency
    }
  }), null), ae(t, R(Bi, {
    get currency() {
      return e.currency
    },
    get insertUnlistedDummys() {
      return e.tabular
    }
  }), null), t;
  var t
}

function Pi(e, t, r) {
  if (e) return e > 0 ? "yellow-blue" === t ? r ? "#16d" : "#4af" : r ? "#282" : "#3f3" : "yellow-blue" === t ? r ? "#d91" : "#fb1" : r ? "#b44" : "#f66"
}
class Ti {
  constructor(e, t) {
    this.duration = t, this.startValue = 0, this.endValue = e, this.startTime = null
  }
  get() {
    if (null === this.startTime) return this.endValue;
    {
      const e = Date.now() - this.startTime;
      if (e >= this.duration) return this.startTime = null, this.endValue;
      const t = e / this.duration;
      return function(e, t, r) {
        return e + (t - e) * r
      }(this.startValue, this.endValue, t)
    }
  }
  set(e, t = !1) {
    t ? this.startTime = null : (this.startValue = this.get(), this.startTime = Date.now()), this.endValue = e
  }
  isDone() {
    return null === this.startTime || Date.now() >= this.startTime + this.duration && (this.startTime = null, !0)
  }
}
var Fi = Q("<span class=number>");

function Hi(e) {
  const t = e.children,
    [r, n] = v(t),
    [o, i] = v(t),
    [a, l] = v(""),
    s = new Ti(t, 500);
  let c = null;
  const u = () => {
    s.isDone() ? (i(r()), l(""), c = null) : (i(s.get()), c = requestAnimationFrame(u))
  };
  b((() => {
    const t = r(),
      o = e.children;
    if (t !== o) {
      n(o), s.set(o);
      const r = o - t,
        i = Pi(e.reverseColor ? -r : r, It());
      l(i ? "color: ".concat(i) : ""), c = requestAnimationFrame(u)
    }
  })), k((() => {
    null !== c && (cancelAnimationFrame(c), c = null)
  }));
  const d = () => "currency" === e.format ? hi(o(), Dt()) : Math.round(o());
  return ae(h = Fi(), d), m((e => ne(h, a(), e))), h;
  var h
}
var Ei = Q('<svg width=24 height=12 viewBox="0 6 24 12"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z">');
const Di = e => {
  return oe(t = Ei(), e, !0, !0), t;
  var t
};
var Ni = Q('<span class="currency-rank-change flex-column">'),
  Oi = Q("<span class=currency-rank>");

function Vi(e) {
  const t = () => e.currency.rankDiffs[e.period],
    r = () => Pi(t(), It());
  return ae(n = Oi(), R(U, {
    get when() {
      return t() < 0
    },
    get children() {
      var e = Ni();
      return ae(e, (() => Math.abs(t())), null), ae(e, R($r, {}), null), m((() => null != r() ? e.style.setProperty("color", r()) : e.style.removeProperty("color"))), e
    }
  }), null), ae(n, R(U, {
    get when() {
      return t() > 0
    },
    get children() {
      var e = Ni();
      return ae(e, R(Di, {}), null), ae(e, t, null), m((() => null != r() ? e.style.setProperty("color", r()) : e.style.removeProperty("color"))), e
    }
  }), null), ae(n, R(U, {
    get when() {
      return e.animate
    },
    get fallback() {
      return e.currency.rank
    },
    get children() {
      return R(Hi, {
        format: "integer",
        reverseColor: !0,
        get children() {
          return e.currency.rank
        }
      })
    }
  }), null), n;
  var n
}

ee(["click"]);
const qi = 50;

function Qi(e, t, r) {
  return e < t ? t : e > r ? r : e
}
const ea = {
  red: 127,
  green: 127,
  blue: 127
};

function ta(e, t, r,curr) {
  if (0 === e || 0 === r) return ea;


  if(curr && curr.currency.id === 99999999999){
    return {
      red: 172,
      green: 137,
      blue: 67
    }
  }
  const n = Math.abs(e) / r,
    o = Math.min(1, Math.max(.2, n)),
    i = Math.floor(127 * (1 - o)),
    a = Math.floor(155 + 100 * o);
  return e > 0 ? "yellow-blue" === t ? {
    red: i,
    green: i + 70,
    blue: a
  } : {
    red: 28,
    green: 165,
    blue: 63
  } : "yellow-blue" === t ? {
    red: a,
    green: a,
    blue: i
  } : {
    red: 220,
    green: 93,
    blue: 77
  }
}

function ra(e) {
  return "min1" !== e && "min5" !== e && "min15" !== e
}

function na(e, t, r) {
  switch (t) {
    case "neutral":
      return 0;
    case "performance":
      return Qi(e.performance[r] || 0, -20, 20);
    case "rank-diff":
      return ra(r) ? Qi(e.rankDiffs[r], -10, 10) : 0
  }
}

function oa(e, t, r, n) {
  switch (t) {
    case "name":
      return e.name;
    case "price":
      return hi(e.price, n);
    case "marketcap":
      return hi(e.marketcap, n);
    case "volume":
      return hi(e.volume, n);
    case "performance":
      if(e.id === 99999999999) return o = '';
      return pi(e.performance[r]);
    case "rank":
      return e.rank.toString();
    case "dominance":
      if(e.id === 99999999999) return o = '';
      return o = e.dominance, "".concat((100 * o).toFixed(2), "%");
    case "rank-diff": {
      const t = ra(r) ? e.rankDiffs[r] : 0;
      return 0 === t ? "-" : t.toLocaleString(void 0, {
        signDisplay: "always"
      })
    }
  }
  var o
}

function ia(e) {
  return Math.pow(e, .8)
}

function aa(e, t, r) {
  switch (t) {
    case "marketcap":
      return ia(e.marketcap);
    case "volume":
      return ia(e.volume);
    case "performance": {
      const t = Math.abs(e.performance[r] || 0);
      return ia(Math.min(1e3, t))
    }
    case "rank-diff":
      return ra(r) ? ia(Math.abs(e.rankDiffs[r])) : 1
  }
}

function la() {
  return 2 * Math.random() - 1
}

const sa = class {
  static get(e) {
    let t = this.images[e];
    if (!t) {
      const r = document.createElement("img");
      let n = !1;
      r.addEventListener("load", (() => {
        n = !0
      })), r.src = e, t = () => n ? r : null, this.images[e] = t
    }
    return t
  }
};

sa.images = {};

let ca = sa;

class ua {
  constructor(e) {
    this.size = null, this.imageBitmap = null, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.padding = e
  }
  begin(e) {
    const t = e + 2 * this.padding;
    this.size !== t ? (this.size = t, this.canvas.width = t, this.canvas.height = t) : this.context.clearRect(0, 0, t, t)
  }
  end() {
    this.imageBitmap = null;
    try {
      createImageBitmap(this.canvas).then((e => this.imageBitmap = e)).catch((() => {}))
    } catch (e) {}
  }
  createRadialGradient(e, t, r, n, o, i) {
    return this.context.createRadialGradient(e + this.padding, t + this.padding, r, n + this.padding, o + this.padding, i)
  }
  circle(e, t, r) {
    this.context.beginPath(), this.context.arc(e + this.padding, t + this.padding, r, 0, 2 * Math.PI), this.context.closePath()
  }
  stroke(e, t) {
    this.context.lineWidth = t, this.context.strokeStyle = e, this.context.stroke()
  }
  fill(e) {
    this.context.fillStyle = e, this.context.fill()
  }
  fillText(e, t, r, n) {
    this.context.font = "".concat(Math.ceil(n), "px Arial"), this.context.fillText(e, t + this.padding, r + this.padding)
  }
  drawImage(e, t, r, n, o) {
    this.context.drawImage(e, t + this.padding, r + this.padding, n, o)
  }
  getImage() {
    return this.imageBitmap || this.canvas
  }
}

const da = new Date,
  ha = da.getDate(),
  pa = 11 === da.getMonth() && ha >= 19 && ha <= 25 ? [ca.get("/images/christmas1.png"), ca.get("/images/christmas2.png"), ca.get("/images/christmas3.png")] : [];

class ga {
  constructor(e) {
    this.lastFingerprint = "", this.radiusTween = new Ti(0, 1e3), this.color = "", this.transitionRadius = null, this.posX = 0, this.posY = 0, this.speedX = 0, this.speedY = 0, this.size = 0, this.radius = 0, this.content = "", this.visible = !1, this.latestPush = 0, this.renderFavoriteBorder = !0, this.currency = e, this.canvas = new ua(Mt.bubblePadding), this.lazyImage = ca.get(e.image)
  }
  applyForce(e, t) {
    this.speedX += e, this.speedY += t
  }
  setRadius(e, t) {
    e = Number.isFinite(e) ? e : 0, this.radiusTween.set(e, t), t || (this.transitionRadius = Math.max(e, this.radius))
  }
  setColor(e) {
    const {
      red: t,
      green: r,
      blue: n
    } = e;
    this.color = "".concat(Math.round(t), ", ").concat(Math.round(r), ", ").concat(Math.round(n))
  }
  setContent(e) {
    this.content = e
  }
  update() {
    this.radius = this.radiusTween.get(), this.visible = this.radius > 0
  }
  rerender(e) {
    const t = this.lazyImage(),
      r = Math.round(e),
      n = this.renderFavoriteBorder && gi(this.currency),
      o = "".concat(this.color, " ").concat(r, " ").concat(this.content, " ").concat(Boolean(t), " ").concat(n);
    if (o !== this.lastFingerprint) {
      this.lastFingerprint = o;
      const e = 2 * r;
      this.canvas.begin(e);
      const i = this.canvas.createRadialGradient(r, r, 0, r, r, r);
      if (i.addColorStop(0, "rgba(".concat(this.color, ", 0.03)")), i.addColorStop(.8, "rgba(".concat(this.color, ", 0.06)")), i.addColorStop(.9, "rgba(".concat(this.color,this.currency.id  === 99999999999?",4)":",0.2)")), i.addColorStop(1, "rgb(".concat(this.color, this.currency.id  === 99999999999?",1)":",0.6)")), this.canvas.circle(r, r, r), this.canvas.fill(i), n) {
        const e = "red-green" === It() ? "yellow" : "#f4a";
        console.log(this)
        this.canvas.circle(r, r, r), this.canvas.stroke(e, Mt.bubbleBorder)
      }
      const a = r > 30,
        l = r * (a ? .55 : 1.2),
        s = l * (t ? t.width / t.height : 1),
        c = .5 * (e - s),
        u = (e - l) * (a ? .14 : .5);
      if (t) this.canvas.drawImage(t, c, u, s, l);
      else {
        const e = .5 * l;
        this.canvas.circle(c + e, u + e, e), this.canvas.stroke("white", 1)
      }
      if (a) {
        this.canvas.context.textAlign = "center", this.canvas.context.fillStyle = "white";
        const t = r * (this.currency.symbol.length < 5 ? .55 : .35);
        this.canvas.fillText(this.currency.symbol, r, 1.25 * r, t);
        const n = r * (this.content.length > 8 ? .24 : .3);
        this.canvas.fillText(this.content, r, 1.65 * r, n), pa.forEach(((t, r) => {
          if ((this.currency.rank + ha + r) % 2 == 0 && this.currency.id !== 99999999999) {
            const r = t();
            r && this.canvas.context.drawImage(r, 0, 0, e, e)
          }
        }))
      }
      this.canvas.end()
    }
  }
  render(e) {
    const t = this.radius + Mt.bubblePadding,
      r = this.posX - t,
      n = this.posY - t;
    if (null !== this.transitionRadius) {
      this.rerender(this.transitionRadius);
      const o = 2 * t;
      e.drawImage(this.canvas.getImage(), r, n, o, o), this.radiusTween.isDone() && (this.transitionRadius = null)
    } else this.rerender(this.radius), e.drawImage(this.canvas.getImage(), r, n)
  }
}

class fa {
  constructor(e) {
    this.frameHandle = null, this.lastTime = null, this.elementWidth = 0, this.elementHeight = 0, this.nextContainerFill = 0, this.width = 0, this.height = 0, this.eventResize = new _r, this.eventFrame = new _r, this.frame = e => {
      this.frameHandle = null;
      let t = 0;
      null !== this.lastTime && (t = Math.min(.001 * (e - this.lastTime), .1)), this.lastTime = e, this.nextContainerFill < Date.now() && this.fillContainer(), this.eventFrame.fire(t)
    }, this.fillContainer = () => {
      this.nextContainerFill = Date.now() + 1e3;
      const e = this.container.clientWidth - 1,
        t = this.container.clientHeight - 1,
        r = Math.floor(e * window.devicePixelRatio),
        n = Math.floor(t * window.devicePixelRatio);
      this.elementWidth === e && this.elementHeight === t || (this.canvas.style.width = "".concat(e, "px"), this.canvas.style.height = "".concat(t, "px"), this.elementWidth = e, this.elementHeight = t), this.width === r && this.height === n || (this.canvas.width = r, this.canvas.height = n, this.width = r, this.height = n, this.eventResize.fire())
    }, this.canvas = e, this.container = e.parentElement, this.context = e.getContext("2d")
  }
  start() {
    window.addEventListener("resize", this.fillContainer), this.fillContainer(), this.requestFrame()
  }
  stop() {
    window.removeEventListener("resize", this.fillContainer), null !== this.frameHandle && cancelAnimationFrame(this.frameHandle)
  }
  clear() {
    const {
      context: e,
      width: t,
      height: r
    } = this;
    e.clearRect(0, 0, t, r)
  }
  requestFrame() {
    null === this.frameHandle && (this.frameHandle = requestAnimationFrame(this.frame))
  }
}

class va extends fa {
  constructor(e, t) {
    super(e), this.needsRecalculation = !1, this.recalculationCount = 0, this.latestPush = 0, this.bubbles = [], this.bubblesDict = {}, this.pointerX = -1, this.pointerY = -1, this.hoveredBubble = null, this.draggedBubble = null, this.possibleSelectedBubble = null, this.timePointerDown = 0, this.timeLastWakeUp = Date.now(), this.selectedCurrencyId = null, this.renderFavoriteBorder = !0, this.eventSelect = new _r, this.eventResize.register((() => {
      this.needsRecalculation = !0, this.requestFrame()
    })), this.eventFrame.register((e => {
      this.needsRecalculation && this.recalculcate(), this.update(e), this.render();
      const t = Date.now() - this.timeLastWakeUp,
        r = Qi(Math.round(t / 150 - 20), 0, 80);
      r > 0 ? window.setTimeout((() => this.requestFrame()), r) : this.requestFrame()
    })), this.properties = t, e.addEventListener("pointerdown", (e => this.handlePointerDown(e)), {
      passive: !1
    }), e.addEventListener("pointermove", (e => this.handlePointerMove(e))), e.addEventListener("touchmove", (e => this.handleTouchMove(e)), {
      passive: !1
    }), e.addEventListener("pointerup", (e => this.handlePointerUp(e))), e.addEventListener("pointercancel", (() => this.handlePointerCancel()))
  }
  updatePointerPosition(e) {
    this.pointerX = e.offsetX * window.devicePixelRatio, this.pointerY = e.offsetY * window.devicePixelRatio
  }
  wakeUp() {
    this.timeLastWakeUp = Date.now()
  }
  getFocusedBubble() {
    for (let e = this.bubbles.length - 1; e >= 0; e--) {
      const t = this.bubbles[e];
      if (t.visible) {
        const e = t.posX - this.pointerX,
          r = t.posY - this.pointerY,
          n = e * e + r * r,
          o = t.radius + Mt.bubbleHitbox;
        if (o * o >= n) return t
      }
    }
    return null
  }
  handlePointerDown(e) {
    e.isPrimary && (this.timePointerDown = Date.now(), this.canvas.setPointerCapture(e.pointerId), "mouse" === e.pointerType ? this.draggedBubble = this.hoveredBubble : (this.updatePointerPosition(e), this.draggedBubble = this.getFocusedBubble()), this.draggedBubble ? this.possibleSelectedBubble = this.draggedBubble : this.launchExplosion())
  }
  handlePointerMove(e) {
    if (!e.isPrimary) return;
    this.updatePointerPosition(e);
    const t = this.getFocusedBubble();
    if ("mouse" === e.pointerType) {
      this.hoveredBubble = t;
      const e = this.draggedBubble || this.hoveredBubble;
      this.canvas.style.cursor = e ? "pointer" : "auto"
    }
    this.possibleSelectedBubble !== t && (this.possibleSelectedBubble = null)
  }
  handleTouchMove(e) {
    this.draggedBubble && e.preventDefault()
  }
  handlePointerUp(e) {
    if (e.isPrimary) {
      if (this.possibleSelectedBubble) {
        if (Date.now() - this.timePointerDown < 1e3) {
          const {
            currency: e
          } = this.possibleSelectedBubble;
          this.possibleSelectedBubble = null, this.eventSelect.fire(e.id)
        }
      }
      this.draggedBubble = null
    }
  }
  handlePointerCancel() {
    this.hoveredBubble = null, this.draggedBubble = null
  }
  launchExplosion() {
    for (const e of this.bubbles) {
      const t = e.posX - this.pointerX,
        r = e.posY - this.pointerY,
        n = Math.max(1, Math.sqrt(t * t + r * r)),
        o = 5e3 / n / n;
      e.applyForce(t * o, r * o)
    }
    this.wakeUp()
  }
  update(e) {
    const t = Math.pow(.5, e),
      r = .001 * Math.min(this.width, this.height);
    for (const n of this.bubbles) n.update();
    for (let n = 0; n < this.bubbles.length; n++) {
      const e = this.bubbles[n];
      if (e.visible) {
        for (let t = n + 1; t < this.bubbles.length; t++) {
          const r = this.bubbles[t];
          if (!r.visible) continue;
          const n = e.posX - r.posX,
            o = e.posY - r.posY,
            i = Math.max(1, Math.sqrt(n * n + o * o)),
            a = e.radius + r.radius;
          if (i < a) {
            const t = 6 / i,
              l = n * t,
              s = o * t,
              c = 1 - e.radius / a,
              u = r.radius / a - 1;
            e.applyForce(l * c, s * c), r.applyForce(l * u, s * u)
          }
        }
        e.applyForce(la() * r, la() * r)
      }
    }
    if (this.draggedBubble) {
      const e = this.pointerX - this.draggedBubble.posX,
        t = this.pointerY - this.draggedBubble.posY,
        r = 5 / Math.max(1, Math.sqrt(e * e + t * t));
      this.draggedBubble.applyForce(e * r, t * r), this.wakeUp()
    }
    for (const n of this.bubbles) n.speedX *= t, n.speedY *= t, n.posX += n.speedX * e, n.posY += n.speedY * e, n.posX < n.radius && (n.posX = n.radius, n.speedX *= -.7), n.posY < n.radius && (n.posY = n.radius, n.speedY *= -.7), n.posX > this.width - n.radius && (n.posX = this.width - n.radius, n.speedX *= -.7), n.posY > this.height - n.radius && (n.posY = this.height - n.radius, n.speedY *= -.7)
  }
  renderBubbleBorder(e, t, r) {
    this.context.beginPath(), this.context.arc(e.posX, e.posY, e.radius, 0, 2 * Math.PI), this.context.closePath(), this.context.lineWidth = Mt.bubbleBorder * r, this.context.strokeStyle = t, this.context.stroke()
  }
  render() {
    this.clear();
    let e = null;
    for (const t of this.bubbles)
      if (t.renderFavoriteBorder = this.renderFavoriteBorder, t.visible) {
        if (t.currency.id === this.selectedCurrencyId) {
          e = t;
          continue
        }
        if (this.draggedBubble === t) continue;
        t.render(this.context)
      } if (this.draggedBubble ? this.draggedBubble !== e && (this.draggedBubble.render(this.context), this.renderBubbleBorder(this.draggedBubble, "white", 1)) : this.hoveredBubble && this.renderBubbleBorder(this.hoveredBubble, "white", 1), e) {
      e.render(this.context);
      const t = .5 * Math.sin(.008 * Date.now()) + .5,
        r = t + 2,
        n = "rgb(".concat(Math.floor(255 * t), ", ").concat(Math.floor(160 * t) + 95, ", 255)");
      this.renderBubbleBorder(e, n, r)
    }
  }
  recalculcate() {
    if (this.needsRecalculation = !1, 0 === this.bubbles.length) return;
    const {
      size: e,
      color: t,
      colors: r,
      period: n,
      content: o,
      baseCurrency: i
    } = this.properties, a = 0 === this.recalculationCount;
    let l = 0,
      s = 0;
    for (const d of this.bubbles) {
      const r = d.latestPush === this.latestPush;
      if (d.size = r ? aa(d.currency, e, n) : 0, d.size > 0) {
        l += d.size;
        const e = Math.abs(na(d.currency, t, n));
        e > s && (s = e)
      }
    }
    const c = this.width * this.height,
      u = 0 === l ? 0 : c / l * .6;
    for (const d of this.bubbles) {
      const e = Math.sqrt(d.size * u / Math.PI);
      d.setRadius(e, a);
      const l = na(d.currency, t, n);
      d.setColor(ta(l, r, s,d)), d.setContent(oa(d.currency, o, n, i)), d.posX = Qi(d.posX, e, this.width - e), d.posY = Qi(d.posY, e, this.height - e)
    }
    this.recalculationCount++, this.wakeUp()
  }
  setProperties(e) {
    this.properties = e, this.needsRecalculation = !0
  }
  pushCurrencies(e) {
    this.latestPush++;
    for (const t of e) {
      const {
        id: e
      } = t;
      let r = this.bubblesDict[e];
      r ? r.currency = t : (r = new ga(t), r.posX = Math.random() * this.width, r.posY = Math.random() * this.height, this.bubbles.push(r), this.bubblesDict[e] = r), r.latestPush = this.latestPush
    }
    this.recalculcate()
  }
}

var ma = Q("<div class=bubble-chart><canvas>");

function ba() {
  let e, t, r;
  const n = y((() => ({
      size: Po().size,
      color: Po().color,
      content: Po().content,
      period: Po().period,
      baseCurrency: Dt(),
      colors: It()
    }))),
    o = () => {
      if (e) {
        const t = Vo() ? 0 : 52,
          r = Math.max(document.documentElement.clientHeight, window.innerHeight),
          n = Math.floor(r - e.offsetTop - t);
        e.style.height = "".concat(n, "px")
      }
    },
    i = () => {
      r && r.wakeUp()
    };
  return _((() => {
    if (window.addEventListener("focus", i), window.addEventListener("resize", o), o(), "ios" === xr.env)
      for (let e = 0; e <= 2200; e += 400) window.setTimeout(o, e);
    t && (r = new va(t, n()), r.eventSelect.register((e => di(e))), r.start())
  })), k((() => {
    window.removeEventListener("focus", i), window.removeEventListener("resize", o), r && r.stop()
  })), b((() => {
    r && r.pushCurrencies(So())
  })), b((() => {
    r && r.setProperties(n())
  })), b((() => {
    r && (r.selectedCurrencyId = ar())
  })), b((() => {
    r && (r.renderFavoriteBorder = ! function() {
      const e = Ot();
      return "list" === e.type && "favorite" === e.list[0]
    }() && !wn)
  })), (() => {
    var r = ma(),
      n = r.firstChild;
    "function" == typeof e ? ie(e, r) : e = r;
    return "function" == typeof t ? ie(t, n) : t = n, r
  })()
}

function ya(e, t) {
  switch (e) {
    case "hour":
      return t.period_hour;
    case "day":
      return t.period_day;
    case "month":
      return t.period_month;
    case "year":
      return t.period_year;
    case "min15":
      return "15 min";
    case "min5":
      return "5 min";
    case "min1":
      return "1 min";
    default:
      return t.period_week
  }
}

function wa(e) {
  return "".concat(e.rank, " ⇅")
}

function _a(e, t) {
  const r = function(e, t) {
      switch (e.size) {
        case "marketcap":
          return t.marketcap;
        case "volume":
          return t.volume;
        case "performance":
          return ya(e.period, t);
        case "rank-diff":
          return "".concat(ya(e.period, t), " ").concat(wa(t))
      }
    }(e, t),
    n = function(e, t) {
      switch (e.content) {
        case "dominance":
          return t.dominance;
        case "marketcap":
          return t.marketcap;
        case "volume":
          return t.volume;
        case "name":
          return t.currencyName;
        case "price":
          return t.price;
        case "rank":
          return t.rank;
        case "performance":
          return ya(e.period, t);
        case "rank-diff":
          return "".concat(ya(e.period, t), " ").concat(wa(t))
      }
    }(e, t);
  return r === n ? r : "".concat(r, " & ").concat(n)
}

function ka(e) {
  const t = () => {
      console.log('ttt', $t, e)
      return $t.findIndex((t => t.id === e.value.id))
    },
    r = () => {
      const r = t(),
        n = e.value,
        o = $t[Math.max(r - 1, 0)];
      e.onClose(), Yt(o.id), Xt((e => e.filter((e => e.id !== n.id))))
    };
  return R(An, {
    class: "configuration-window",
    get onClose() {
      return e.onClose
    },
    get header() {
      return [R(Un, {
        get value() {
          return e.value.name
        },
        action: "clear",
        class: "grow",
        iconComponent: Vn,
        get placeholder() {
          return _a(e.value, Rt())
        },
        onInput: e => Xt(t(), "name", e)
      }), R(U, {
        get when() {
          return $t.length >= 2
        },
        get children() {
          return R(En, {
            onDelete: r
          })
        }
      })]
    },
    get children() {
      return [R(an, {
        get label() {
          return Rt().period
        },
        get value() {
          return e.value.period
        },
        onChange: e => {
          Xt(t(), "period", e)
        },
        get options() {
          return Mt.periods.map((e => ({
            value: e,
            label: ya(e, Rt())
          })))
        }
      }), R(an, {
        get label() {
          return Rt().bubble_size
        },
        get value() {
          return e.value.size
        },
        onChange: e => Xt(t(), "size", e),
        get options() {
          return [{
            value: "performance",
            label: Rt().performance
          }, {
            value: "rank-diff",
            label: wa(Rt())
          }, {
            value: "marketcap",
            label: Rt().marketcap
          }, {
            value: "volume",
            label: Rt().volume
          }]
        }
      }), R(an, {
        get label() {
          return Rt().bubble_content
        },
        get value() {
          return e.value.content
        },
        onChange: e => Xt(t(), "content", e),
        get options() {
          return [{
            value: "performance",
            label: Rt().performance
          }, {
            value: "rank-diff",
            label: wa(Rt())
          }, {
            value: "marketcap",
            label: Rt().marketcap
          }, {
            value: "volume",
            label: Rt().volume
          }, {
            value: "price",
            label: Rt().price
          }, {
            value: "rank",
            label: Rt().rank
          }, {
            value: "name",
            label: Rt().currencyName
          }, {
            value: "dominance",
            label: Rt().dominance
          }]
        }
      }), R(an, {
        get label() {
          return Rt().bubble_color
        },
        get value() {
          return e.value.color
        },
        onChange: e => Xt(t(), "color", e),
        get options() {
          return [{
            value: "performance",
            label: Rt().performance
          }, {
            value: "rank-diff",
            label: wa(Rt())
          }, {
            value: "neutral",
            label: Rt().neutral
          }]
        }
      })]
    }
  })
}

function Ca(e) {
  const {
    color: t,
    period: r,
    size: n
  } = e;
  let o = 0,
    i = 0;
  for (const a of So()) {
    const e = na(a, t, r),
      l = aa(a, n, r);
    if (l > 0) {
      const t = Math.sqrt(l);
      o += Math.sign(e) * t, i += t
    }
  }
  return i > 0 ? o / i : 0
}
var xa = Q("<button>");

function Ma(e) {
  let t;
  const r = () => Po().id === e.configuration.id;
  return b((() => {
    r() && t && e.onScrollTo(t)
  })), (() => {
    var n = xa();
    n.$$click = () => {
      e.onClick(e.configuration)
    };
    return "function" == typeof t ? ie(t, n) : t = n, te(n, "draggable", !0), ae(n, (() => {
      return t = e.configuration, r = Rt(), t.name && t.name.trim().length > 0 ? t.name : _a(t, r);
      var t, r
    })), m((t => {
      var o = false,
        i = Pi(Ca(e.configuration), It());

      return o !== t.e && re(n, t.e = o), i !== t.t && (null != (t.t = i) ? n.style.setProperty("border-color", i) : n.style.removeProperty("border-color")), t
    }), {
      e: void 0,
      t: void 0
    }), n
  })()
}
ee(["click"]);
var za = Q('<div class="bubble-chart-header flex-row"><div class="configuration-tabs scroll-container">');

function La() {
  let e;
  const [t, r] = v(!1), n = e => {
    Wt() === e.id ? r(!t()) : Yt(e.id)
  }, o = t => {
    e && function(e, t, r) {
      const n = {
        left: t,
        top: r,
        behavior: "smooth"
      };
      try {
        e.scrollTo(n)
      } catch (o) {
        try {
          e.scrollTo(t, r)
        } catch (i) {
          try {
            e.scroll(n)
          } catch (a) {
            try {
              e.scroll(t, r)
            } catch (l) {}
          }
        }
      }
    }(e, t.offsetLeft - 64, 0)
  }, i = () => {
    const e = De("day", "performance");
    Xt((t => [...t, e])), Yt(e.id), r(!0)
  };

  return a = za(), l = a.firstChild, "function" == typeof e ? ie(e, l) : e = l, ae(l, R(I, {
    each: $t,
    children: e => {
      return R(Ma, {
        configuration: e,
        onClick: n,
        onScrollTo: o
      })
    }
  })), ae(a, R(Or, {
    get active() {
      return t()
    },
    onClick: () => r(!t()),
    get title() {
      return Rt().configuration_edit
    },
    get children() {
      return R(Vn, {})
    }
  }), null), ae(a, R(Or, {
    onClick: i,
    get title() {
      return Rt().configuration_add
    },
    get children() {
      return R(Nn, {})
    }
  }), null), ae(a, R(ko, {
    get value() {
      return y((() => !!t()))() ? Po() : null
    },
    component: ka,
    onClose: () => r(!1)
  }), null), a;
  var a, l
}

function Ba() {
  return [R(La, {}), R(ba, {})]
}
var Aa = Q("<main>");

function Pa() {
  return R($, {
    get children() {
      return [R(X, {
        get when() {
          return Vo()
        },
        get children() {
          let e
          return [(e = Aa(), ae(e, R(Ba, {})))];
        }
      })]
    }
  })
}
class Ta extends fa {
  constructor(e) {
    super(e), this.quotes = null, this.baseCurrency = null, this.period = null, this.colors ="red-green", this.pointerX = null, this.eventFrame.register((() => this.render())), this.eventResize.register((() => this.render())), this.canvas.addEventListener("pointermove", (e => this.handlePointerUpdate(e))), this.canvas.addEventListener("pointerdown", (e => this.handlePointerUpdate(e))), this.canvas.addEventListener("pointerout", (e => this.handlePointerOut(e)))
  }
  handlePointerUpdate(e) {
    if (e.isPrimary) {
      const t = Math.round(e.offsetX * window.devicePixelRatio);
      t !== this.pointerX && (this.pointerX = t, this.render())
    }
  }
  handlePointerOut(e) {
    e.isPrimary && null !== this.pointerX && (this.pointerX = null, this.render())
  }
  drawPointOnChart(e, t, r, n) {
    const {
      context: o,
      width: i,
      height: a
    } = this, {
      x: l,
      y: s
    } = t, c = window.devicePixelRatio, u = .5 * i, d = .5 * a, h = hi(e, r);
    o.beginPath(), o.arc(l, s, 5 * c, 0, 2 * Math.PI), o.fillStyle = n, o.fill(), o.textAlign = l < u ? "left" : "right", o.fillText(h, l + (l < u ? 8 : -8) * c, s + (s < d ? -10 : 10) * c)
  }
  render() {
    const {
      quotes: e,
      baseCurrency: t,
      period: r,
      context: n,
      width: o,
      height: i,
      pointerX: a
    } = this, l = window.devicePixelRatio;
    if (this.clear(), null === t || null === r || null === e || 0 === e.length) return;
    const s = o / (e.length - 1);
    let c = e[0].p,
      u = e[0].p;
    for (const k of e) k.p > u && (u = k.p), k.p < c && (c = k.p);
    const d = u - c;
    let h = 0;
    const p = {
        x: 0,
        y: 0
      },
      g = {
        x: 0,
        y: 0
      };
    let f = null,
      v = null;
    n.beginPath();
    for (const k of e) {
      const e = k.p,
        t = (.8 - .7 * ((e - c) / d)) * i;
      e === c && (p.x = h, p.y = t), e === u && (g.x = h, g.y = t), a && !f && a < h + s / 2 && (f = {
        x: h,
        y: t
      }, v = k), 0 === h ? n.moveTo(h, t + 1) : n.lineTo(h, t + 1), h += s
    }
    n.lineWidth = 2 * l, n.strokeStyle = "white", n.lineJoin = "round", n.stroke(), n.lineTo(h, i), n.lineTo(0, i), n.closePath();
    const m = n.createLinearGradient(0, 0, 0, i);
    m.addColorStop(0, "rgba(0, 100, 255, 1)"), m.addColorStop(1, "rgba(0, 100, 255, 0)"), n.fillStyle = m, n.fill();
    const b = Math.round(20 * l);
    n.font = "".concat(b, "px Arial"), n.textBaseline = "middle";
    const y = Pi(1, this.colors) || "#47ff33",
      w = Pi(-1, this.colors) || "#f55";
    if (this.drawPointOnChart(c, p, t, w), this.drawPointOnChart(u, g, t, y), f && v) {
      const {
        p: e,
        t: a
      } = v, s = hi(e, t);
      let c = 0;
      try {
        c = n.measureText(s).width
      } catch (_) {}
      c = c || 150;
      const u = 6 * l,
        d = 4 * l,
        h = c + 2 * u,
        p = b + 2 * d,
        g = Qi(f.x - h / 2, 0, o - h),
        m = 0;
      n.strokeStyle = "#666", n.beginPath(), n.moveTo(f.x, 0), n.lineTo(f.x, i), n.closePath(), n.stroke(), n.fillStyle = "white", n.beginPath(), n.arc(f.x, f.y, 5 * l, 0, 2 * Math.PI), n.closePath(), n.fill(), n.fillStyle = "#666", n.fillRect(g, m, h, p), n.textAlign = "left", n.textBaseline = "top", n.fillStyle = "white", n.fillText(s, g + u, m + d);
      const y = new Date(1e3 * a);
      y.setSeconds(0), "week" !== r && "month" !== r || y.setMinutes(0);
      let w = y.toLocaleString();
      if ("year" === r) w = y.toLocaleDateString();
      else try {
        w = y.toLocaleString(void 0, {
          dateStyle: "medium",
          timeStyle: "short"
        })
      } catch (_) {}
      n.textAlign = "right", n.textBaseline = "bottom", n.fillStyle = "#fff", n.fillText(w, o - 6 * l, i - 6 * l)
    }
  }
}
var Fa = Q("<div><canvas></canvas><img><span class=color-secondary>");

function Ha(e) {
  let t, r, n = null;
  const [o, i] = v(null), a = () => {
    n && (n.abort(), n = null)
  }, l = () => {
    a();
    try {
      n = new AbortController
    } catch (t) {}
    mr("data/charts/".concat(e.period, "/").concat(e.currency.id, "/").concat(Dt().id.toUpperCase(), ".json"), n).then(i).catch((() => {}))
  };
  return _((() => {
    t && (r = new Ta(t), r.start()), xr.eventUpdateData.register(l)
  })), k((() => {
    r && r.stop(), xr.eventUpdateData.unregister(l), a()
  })), b((() => {
    i(null), l()
  })), b((() => {
    r && (r.quotes = o(), r.colors = It(), r.baseCurrency = Dt(), r.period = e.period, r.requestFrame())
  })), s = Fa(), c = s.firstChild, u = c.nextSibling, d = u.nextSibling, "function" == typeof t ? ie(t, c) : t = c, ae(d, (() => ya(e.period, Rt()))), m((t => {
    var r = Dr("price-chart", o() && "loaded"),
      n = e.currency.image,
      i = e.currency.name;
    return r !== t.e && re(s, t.e = r), n !== t.t && te(u, "src", t.t = n), i !== t.a && te(u, "alt", t.a = i), t
  }), {
    e: void 0,
    t: void 0,
    a: void 0
  }), s;
  var s, c, u, d
}
var Ea = Q('<span class="bubble-window-price flex-row gap-m"><span class=color-secondary>');
const Da = 1;

function Na(e) {
  const [t, r] = v(Da.toString()), n = () => {
    let r = function(e, t) {
      try {
        const t = Number.parseFloat(e);
        if (Number.isFinite(t) && !Number.isNaN(t)) return t
      } catch (r) {}
      return t
    }(t(), Da);
    return r < 0 && (r = Da), e.currency.price * r
  };
  return o = Ea(), i = o.firstChild, ae(o, R(Un, {
    get value() {
      return Da.toString()
    },
    iconComponent: Vn,
    placeholder: "Amount",
    type: "number",
    onInput: r
  }), i), ae(i, (() => "".concat(e.currency.symbol, " ="))), ae(o, R(Hi, {
    format: "currency",
    get children() {
      return n()
    }
  }), null), o;
  var o, i
}
var Oa = Q('<div class=bubble-window-details><div class="flex-column gap-s grow"><span class=text-secondary></span></div><div class="flex-column gap-s grow"><span class=text-secondary></span></div><div class="flex-column gap-s grow"><span class=text-secondary>'),
  Va = Q("<div class=bubble-window-performance>"),
  Ra = Q("<div><span class=text-secondary></span><span>");
const ja = ["hour", "day", "week", "month", "year"];

function Ia(e) {
  const t = () => {
      const {
        period: e
      } = Po();
      return "min1" === e || "min5" === e || "min15" === e ? "hour" : e
    },
    [r, n] = v(t());
  return b((() => n(t()))), R(An, {
    class: "bubble-window",
    get onClose() {
      return e.onClose
    },
    get header() {
      return [R(yi, {
        get currency() {
          return e.value
        }
      }), R(zo, {
        get currency() {
          return e.value
        },
        class: "grow"
      })]
    },
    get children() {
      return R(U, {
        keyed: !0,
        get when() {
          return e.value.id
        },
        get children() {
          return [R(Si, {
            get currency() {
              return e.value
            }
          }), R(Na, {
            get currency() {
              return e.value
            }
          }), (o = Oa(), i = o.firstChild, a = i.firstChild, l = i.nextSibling, s = l.firstChild, c = l.nextSibling, u = c.firstChild, ae(a, (() => Rt().rank)), ae(i, R(Vi, {
            animate: !0,
            get currency() {
              return e.value
            },
            get period() {
              return r()
            }
          }), null), ae(s, (() => Rt().marketcap)), ae(l, R(Hi, {
            format: "currency",
            get children() {
              return e.value.marketcap
            }
          }), null), ae(u, (() => Rt().volume)), ae(c, R(Hi, {
            format: "currency",
            get children() {
              return e.value.volume
            }
          }), null), o), R(Ha, {
            get period() {
              return r()
            },
            get currency() {
              return e.value
            }
          }), (t = Va(), ae(t, R(I, {
            each: ja,
            children: t => {
              const o = () => e.value.performance[t];
              return i = Ra(), a = i.firstChild, l = a.nextSibling, i.$$click = () => n(t), ae(a, (() => ya(t, Rt()))), ae(l, (() => pi(o(), !0))), m((e => {
                var n = Dr("flex-column grow", t === r() && "selected"),
                  a = (() => {
                    const e = Pi(o(), It(), !1),
                      t = Pi(o(), It(), !0);
                    return e && t ? "--color-light: ".concat(e, "; --color-dark: ").concat(t) : ""
                  })();
                return n !== e.e && re(i, e.e = n), e.t = ne(i, a, e.t), e
              }), {
                e: void 0,
                t: void 0
              }), i;
              var i, a, l
            }
          })), t)];
          var t, o, i, a, l, s, c, u
        }
      })
    }
  })
}
ee(["click"]);
var Ua = Q('<svg viewBox="0 0 24 24"><circle cx=7.2 cy=14.4 r=3.2></circle><circle cx=14.8 cy=18 r=2></circle><circle cx=15.2 cy=8.8 r=4.8>');
const $a = e => {
  return oe(t = Ua(), e, !0, !0), t;
  var t
};
var Xa = Q("<div class=navigation><div></div><div class=navigation-pages>");

function Wa() {
  function e(e) {
    or() !== e && (ir(e), window.scroll(0, 0))
  }
  return t = Xa(), r = t.firstChild, n = r.nextSibling, ae(r, R(kn, {})), ae(n, R(nn, {
    get active() {
      return "bubbles" === or()
    },
    onClick: () => e("bubbles"),
    get children() {
      return R($a, {})
    }
  }), null), ae(n, R(nn, {
    get active() {
      return "list" === or()
    },
    onClick: () => e("list"),
    get children() {
      return R($o, {})
    }
  }), null), ae(n, R(nn, {
    get active() {
      return "settings" === or()
    },
    onClick: () => e("settings"),
    get children() {
      return R(Ir, {})
    }
  }), null), t;
  var t, r, n
}
var Ya = Q('<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">');
const Ga = e => {
  return oe(t = Ya(), e, !0, !0), t;
  var t
};
var Za = Q("<div class=status><img class=logo width=64 height=64><span>"),
  qa = Q("<div class=status><span>No internet connection"),
  Ka = Q('<div class=status><div class="flex-column color-secondary"><span></span></div><span>');

function Ja() {
  cr("loading"), wr()
}

function Qa() {
  return R($, {
    get children() {
      return [R(X, {
        get when() {
          return "loading" === sr()
        },
        get children() {
          var e = Za(),
            t = e.firstChild;
          return ae(t.nextSibling, (() => Rt().loading)), m((e => {
            var r = Mt.logo,
              n = Mt.app,
              o = "Logo of ".concat(Mt.app);
            return r !== e.e && te(t, "src", e.e = r), n !== e.t && te(t, "alt", e.t = n), o !== e.a && te(t, "title", e.a = o), e
          }), {
            e: void 0,
            t: void 0,
            a: void 0
          }), e
        }
      }), R(X, {
        get when() {
          return "loading-failed" === sr()
        },
        get children() {
          var e = qa(),
            t = e.firstChild;
          return e.$$click = Ja, ae(e, R(Ga, {}), t), e
        }
      }), R(X, {
        get when() {
          return "loaded" === sr()
        },
        get children() {
          return R(U, {
            get when() {
              return 0 === So().length
            },
            get children() {
              return R(U, {
                keyed: !0,
                get when() {
                  return function() {
                    const e = Ot();
                    if ("list" === e.type) return yn().find((t => {
                      return r = e.list, n = t.filter.list, r.length === n.length && r.every(((e, t) => e === n[t]));
                      var r, n
                    }))
                  }()
                },
                children: e => {
                  return t = Ka(), r = t.firstChild, n = r.firstChild, o = r.nextSibling, ae(r, R(e.iconComponent, {}), n), ae(n, (() => e.name)), ae(o, (() => Rt().empty_list)), t;
                  var t, r, n, o
                }
              })
            }
          })
        }
      })]
    }
  })
}

function el() {
  return b((() => St.save(St.generateSave()))), b((() => wr())), b((() => {
    const e = Ca(Po()),
      t = Pi(e, It(), !1),
      r = Pi(e, It(), !0);
    document.documentElement.style.setProperty("--color-theme-light", t || null), document.documentElement.style.setProperty("--color-theme-dark", r || null)
  })), [R(Er, {}), R(Go, {}), R(Pa, {}), R(U, {
    get when() {
      return !Vo()
    },
    get children() {
      return R(Wa, {})
    }
  }), R(U, {
    get when() {
      return "settings" !== or() || Vo()
    },
    get children() {
      return R(Qa, {})
    }
  }), R(ko, {
    get value() {
      return To()
    },
    component: Ia,
    onClose: () => lr(null)
  })]
}
ee(["click"]);
const tl = window.matchMedia("(display-mode: standalone)").matches,
  rl = document.getElementById("bubbles-app"),
  nl = tl ? "pwa" : rl.className;
  xr.create(nl)
window.onload =  (() => {
  ! function(e, t, r, n = {}) {
    let o;
    f((n => {
      o = n, t === document ? e() : ae(t, e(), t.firstChild ? null : void 0, r)
    }), n.owner)
  }((() => R(el, {})), rl), "ios" !== xr.env && "serviceWorker" in navigator && console.log('YES')
})

