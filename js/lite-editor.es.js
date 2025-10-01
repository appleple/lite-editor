function gn(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
function Bn(l) {
  if (Object.prototype.hasOwnProperty.call(l, "__esModule")) return l;
  var s = l.default;
  if (typeof s == "function") {
    var r = function h() {
      var u = !1;
      try {
        u = this instanceof h;
      } catch {
      }
      return u ? Reflect.construct(s, arguments, this.constructor) : s.apply(this, arguments);
    };
    r.prototype = s.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(l).forEach(function(h) {
    var u = Object.getOwnPropertyDescriptor(l, h);
    Object.defineProperty(r, h, u.get ? u : {
      enumerable: !0,
      get: function() {
        return l[h];
      }
    });
  }), r;
}
var Ft = { exports: {} }, be = {}, ye;
function Ln() {
  return ye || (ye = 1, Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(l) {
      if (this == null)
        throw new TypeError("this is null or not defined");
      var s = Object(this), r = s.length >>> 0;
      if (typeof l != "function")
        throw new TypeError("predicate must be a function");
      for (var h = arguments[1], u = 0; u < r; ) {
        var c = s[u];
        if (l.call(h, c, u, s))
          return c;
        u++;
      }
    }
  })), be;
}
var Pt, _e;
function Nn() {
  if (_e) return Pt;
  _e = 1;
  var l, s = "http://www.w3.org/1999/xhtml", r = typeof document > "u" ? void 0 : document, h = r ? r.body || r.createElement("div") : {}, u;
  h.hasAttributeNS ? u = function(_, v, T) {
    return _.hasAttributeNS(v, T);
  } : h.hasAttribute ? u = function(_, v, T) {
    return _.hasAttribute(T);
  } : u = function(_, v, T) {
    return _.getAttributeNode(v, T) != null;
  };
  var c = u;
  function o(_) {
    !l && r.createRange && (l = r.createRange(), l.selectNode(r.body));
    var v;
    return l && l.createContextualFragment ? v = l.createContextualFragment(_) : (v = r.createElement("body"), v.innerHTML = _), v.childNodes[0];
  }
  function n(_, v) {
    var T = _.nodeName, N = v.nodeName;
    return T === N ? !0 : v.actualize && T.charCodeAt(0) < 91 && /* from tag name is upper case */
    N.charCodeAt(0) > 90 ? T === N.toUpperCase() : !1;
  }
  function p(_, v) {
    return !v || v === s ? r.createElement(_) : r.createElementNS(v, _);
  }
  function y(_, v) {
    for (var T = _.firstChild; T; ) {
      var N = T.nextSibling;
      v.appendChild(T), T = N;
    }
    return v;
  }
  function x(_, v) {
    var T = v.attributes, N, k, D, I, M, j;
    for (N = T.length - 1; N >= 0; --N)
      k = T[N], D = k.name, I = k.namespaceURI, M = k.value, I ? (D = k.localName || D, j = _.getAttributeNS(I, D), j !== M && _.setAttributeNS(I, D, M)) : (j = _.getAttribute(D), j !== M && _.setAttribute(D, M));
    for (T = _.attributes, N = T.length - 1; N >= 0; --N)
      k = T[N], k.specified !== !1 && (D = k.name, I = k.namespaceURI, I ? (D = k.localName || D, c(v, I, D) || _.removeAttributeNS(I, D)) : c(v, null, D) || _.removeAttribute(D));
  }
  function L(_, v, T) {
    _[T] !== v[T] && (_[T] = v[T], _[T] ? _.setAttribute(T, "") : _.removeAttribute(T, ""));
  }
  var B = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(_, v) {
      L(_, v, "selected");
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(_, v) {
      L(_, v, "checked"), L(_, v, "disabled"), _.value !== v.value && (_.value = v.value), c(v, null, "value") || _.removeAttribute("value");
    },
    TEXTAREA: function(_, v) {
      var T = v.value;
      _.value !== T && (_.value = T);
      var N = _.firstChild;
      if (N) {
        var k = N.nodeValue;
        if (k == T || !T && k == _.placeholder)
          return;
        N.nodeValue = T;
      }
    },
    SELECT: function(_, v) {
      if (!c(v, null, "multiple")) {
        for (var T = 0, N = v.firstChild; N; ) {
          var k = N.nodeName;
          if (k && k.toUpperCase() === "OPTION") {
            if (c(N, null, "selected"))
              break;
            T++;
          }
          N = N.nextSibling;
        }
        _.selectedIndex = T;
      }
    }
  }, E = 1, A = 3, b = 8;
  function S() {
  }
  function g(_) {
    return _.id;
  }
  function w(_) {
    return function(T, N, k) {
      if (k || (k = {}), typeof N == "string")
        if (T.nodeName === "#document" || T.nodeName === "HTML") {
          var D = N;
          N = r.createElement("html"), N.innerHTML = D;
        } else
          N = o(N);
      var I = k.getNodeKey || g, M = k.onBeforeNodeAdded || S, j = k.onNodeAdded || S, ct = k.onBeforeElUpdated || S, rt = k.onElUpdated || S, pt = k.onBeforeNodeDiscarded || S, at = k.onNodeDiscarded || S, mt = k.onBeforeElChildrenUpdated || S, vt = k.childrenOnly === !0, st = {}, lt;
      function G(R) {
        lt ? lt.push(R) : lt = [R];
      }
      function Y(R, O) {
        if (R.nodeType === E)
          for (var J = R.firstChild; J; ) {
            var ht = void 0;
            O && (ht = I(J)) ? G(ht) : (at(J), J.firstChild && Y(J, O)), J = J.nextSibling;
          }
      }
      function ft(R, O, J) {
        pt(R) !== !1 && (O && O.removeChild(R), at(R), Y(R, J));
      }
      function ut(R) {
        if (R.nodeType === E)
          for (var O = R.firstChild; O; ) {
            var J = I(O);
            J && (st[J] = O), ut(O), O = O.nextSibling;
          }
      }
      ut(T);
      function bt(R) {
        j(R);
        for (var O = R.firstChild; O; ) {
          var J = O.nextSibling, ht = I(O);
          if (ht) {
            var Z = st[ht];
            Z && n(O, Z) && (O.parentNode.replaceChild(Z, O), dt(Z, O));
          }
          bt(O), O = J;
        }
      }
      function dt(R, O, J) {
        var ht = I(O), Z;
        if (ht && delete st[ht], !(N.isSameNode && N.isSameNode(T)) && !(!J && (ct(R, O) === !1 || (_(R, O), rt(R), mt(R, O) === !1)))) {
          if (R.nodeName !== "TEXTAREA") {
            var Q = O.firstChild, $ = R.firstChild, gt, nt, K, it;
            t: for (; Q; ) {
              for (K = Q.nextSibling, gt = I(Q); $; ) {
                if (nt = $.nextSibling, Q.isSameNode && Q.isSameNode($)) {
                  Q = K, $ = nt;
                  continue t;
                }
                Z = I($);
                var yt = $.nodeType, X = void 0;
                if (yt === Q.nodeType && (yt === E ? (gt ? gt !== Z && ((it = st[gt]) ? $.nextSibling === it ? X = !1 : (R.insertBefore(it, $), nt = $.nextSibling, Z ? G(Z) : ft(
                  $,
                  R,
                  !0
                  /* skip keyed nodes */
                ), $ = it) : X = !1) : Z && (X = !1), X = X !== !1 && n($, Q), X && dt($, Q)) : (yt === A || yt == b) && (X = !0, $.nodeValue = Q.nodeValue)), X) {
                  Q = K, $ = nt;
                  continue t;
                }
                Z ? G(Z) : ft(
                  $,
                  R,
                  !0
                  /* skip keyed nodes */
                ), $ = nt;
              }
              if (gt && (it = st[gt]) && n(it, Q))
                R.appendChild(it), dt(it, Q);
              else {
                var wt = M(Q);
                wt !== !1 && (wt && (Q = wt), Q.actualize && (Q = Q.actualize(R.ownerDocument || r)), R.appendChild(Q), bt(Q));
              }
              Q = K, $ = nt;
            }
            for (; $; )
              nt = $.nextSibling, (Z = I($)) ? G(Z) : ft(
                $,
                R,
                !0
                /* skip keyed nodes */
              ), $ = nt;
          }
          var i = B[R.nodeName];
          i && i(R, O);
        }
      }
      var W = T, F = W.nodeType, tt = N.nodeType;
      if (!vt) {
        if (F === E)
          tt === E ? n(T, N) || (at(T), W = y(T, p(N.nodeName, N.namespaceURI))) : W = N;
        else if (F === A || F === b) {
          if (tt === F)
            return W.nodeValue = N.nodeValue, W;
          W = N;
        }
      }
      if (W === N)
        at(T);
      else if (dt(W, N, vt), lt)
        for (var z = 0, ot = lt.length; z < ot; z++) {
          var _t = st[lt[z]];
          _t && ft(_t, _t.parentNode, !1);
        }
      return !vt && W !== T && T.parentNode && (W.actualize && (W = W.actualize(T.ownerDocument || r)), T.parentNode.replaceChild(W, T)), W;
    };
  }
  var q = w(x);
  return Pt = q, Pt;
}
var St = {}, we;
function kn() {
  if (we) return St;
  we = 1, Object.defineProperty(St, "__esModule", {
    value: !0
  });
  var l = St.matches = function(h, u) {
    for (var c = (h.document || h.ownerDocument).querySelectorAll(u), o = c.length; --o >= 0 && c.item(o) !== h; )
      ;
    return o > -1;
  };
  St.selector = function(h) {
    return document.querySelector(h);
  };
  var s = St.findAncestor = function(h, u) {
    if (typeof h.closest == "function")
      return h.closest(u) || null;
    for (; h && h !== document; ) {
      if (l(h, u))
        return h;
      h = h.parentElement;
    }
    return null;
  };
  return St.on = function(h, u, c, o) {
    var n = c.split(" ");
    n.forEach(function(p) {
      h.addEventListener(p, function(y) {
        y.target;
        var x = s(y.target, u);
        x && (y.delegateTarget = x, o(y));
      });
    });
  }, St;
}
var Ee;
function qn() {
  return Ee || (Ee = 1, (function(l, s) {
    Object.defineProperty(s, "__esModule", {
      value: !0
    });
    var r = /* @__PURE__ */ (function() {
      function E(A, b) {
        for (var S = 0; S < b.length; S++) {
          var g = b[S];
          g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(A, g.key, g);
        }
      }
      return function(A, b, S) {
        return b && E(A.prototype, b), S && E(A, S), A;
      };
    })();
    Ln();
    var h = Nn(), u = o(h), c = kn();
    function o(E) {
      return E && E.__esModule ? E : { default: E };
    }
    function n(E) {
      if (Array.isArray(E)) {
        for (var A = 0, b = Array(E.length); A < E.length; A++)
          b[A] = E[A];
        return b;
      } else
        return Array.from(E);
    }
    function p(E, A) {
      if (!(E instanceof A))
        throw new TypeError("Cannot call a class as a function");
    }
    var y = "input paste copy click change keydown keyup keypress contextmenu mouseup mousedown mousemove touchstart touchend touchmove compositionstart compositionend focus", x = "input change click", L = y.replace(/([a-z]+)/g, "[data-action-$1],") + "[data-action]", B = (function() {
      function E(A) {
        var b = this;
        p(this, E), this.atemplate = [], A && Object.keys(A).forEach(function(T) {
          b[T] = A[T];
        }), this.data || (this.data = {}), this.templates || (this.templates = []);
        for (var S = this.templates, g = S.length, w = 0, q = g; w < q; w += 1) {
          var _ = this.templates[w], v = (0, c.selector)("#" + _).innerHTML;
          this.atemplate.push({ id: _, html: v, binded: !1 });
        }
      }
      return r(E, [{
        key: "addDataBind",
        value: function(b) {
          var S = this;
          (0, c.on)(b, "[data-bind]", x, function(g) {
            var w = g.delegateTarget, q = w.getAttribute("data-bind"), _ = w.getAttribute("href"), v = w.value;
            _ && (v = v.replace("#", "")), w.getAttribute("type") === "checkbox" ? (function() {
              var T = [], N = document.querySelectorAll('[data-bind="' + q + '"]');
              [].forEach.call(N, function(k) {
                k.checked && T.push(k.value);
              });
            })() : w.getAttribute("type") !== "radio" && S.updateDataByString(q, v);
          });
        }
      }, {
        key: "addActionBind",
        value: function(b) {
          var S = this;
          (0, c.on)(b, L, y, function(g) {
            var w = g.delegateTarget, q = y.split(" "), _ = "action";
            q.forEach(function(I) {
              w.getAttribute("data-action-" + I) && g.type === I && (_ += "-" + I);
            });
            var v = w.getAttribute("data-" + _);
            if (v) {
              var T = v.replace(/\(.*?\);?/, ""), N = v.replace(/(.*?)\((.*?)\);?/, "$2"), k = N.split(",");
              if (S.e = g, S.method && S.method[T]) {
                var D;
                (D = S.method)[T].apply(D, n(k));
              } else S[T] && S[T].apply(S, n(k));
            }
          });
        }
      }, {
        key: "addTemplate",
        value: function(b, S) {
          this.atemplate.push({ id: b, html: S, binded: !1 }), this.templates.push(b);
        }
        // loadHtml() {
        //   const templates = this.templates;
        //   const promises = [];
        //   templates.forEach((template) => {
        //     const d = new $.Deferred();
        //     promises.push(d);
        //     const src = selector(`#${template}`).getAttribute('src');
        //     $.ajax({
        //       url: src,
        //       type: 'GET',
        //       dataType: 'text'
        //     }).success((data) => {
        //       selector(`#${template}`).innerHTML = data;
        //       d.resolve();
        //     });
        //   });
        //   return $.when(...promises);
        // }
      }, {
        key: "getData",
        value: function() {
          return JSON.parse(JSON.stringify(this.data));
        }
      }, {
        key: "saveData",
        value: function(b) {
          var S = JSON.stringify(this.data);
          localStorage.setItem(b, S);
        }
      }, {
        key: "setData",
        value: function(b) {
          var S = this;
          Object.keys(b).forEach(function(g) {
            typeof b[g] != "function" && (S.data[g] = b[g]);
          });
        }
      }, {
        key: "loadData",
        value: function(b) {
          var S = JSON.parse(localStorage.getItem(b));
          S && this.setData(S);
        }
      }, {
        key: "getRand",
        value: function(b, S) {
          return ~~(Math.random() * (S - b + 1)) + b;
        }
      }, {
        key: "getRandText",
        value: function(b) {
          for (var S = "", g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", w = g.length, q = 0; q < b; q += 1)
            S += g.charAt(Math.floor(this.getRand(0, w)));
          return S;
        }
      }, {
        key: "getDataFromObj",
        value: function(b, S) {
          b = b.replace(/\[([\w\-\.ぁ-んァ-ヶ亜-熙]+)\]/g, ".$1"), b = b.replace(/^\./, "");
          for (var g = b.split("."); g.length; ) {
            var w = g.shift();
            if (w in S)
              S = S[w];
            else
              return null;
          }
          return S;
        }
      }, {
        key: "getDataByString",
        value: function(b) {
          var S = this.data;
          return this.getDataFromObj(b, S);
        }
      }, {
        key: "updateDataByString",
        value: function(b, S) {
          for (var g = this.data, w = b.split("."); w.length > 1; )
            g = g[w.shift()];
          g[w.shift()] = S;
        }
      }, {
        key: "removeDataByString",
        value: function(b) {
          for (var S = this.data, g = b.split("."); g.length > 1; )
            S = S[g.shift()];
          var w = g.shift();
          w.match(/^\d+$/) ? S.splice(Number(w), 1) : delete S[w];
        }
      }, {
        key: "resolveBlock",
        value: function(b, S, g) {
          var w = this, q = b.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):touch#([\w\-\.ぁ-んァ-ヶ亜-熙]+) -->/g), _ = b.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):touchnot#([\w\-\.ぁ-んァ-ヶ亜-熙]+) -->/g), v = b.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):exist -->/g), T = b.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):empty -->/g);
          if (q)
            for (var N = 0, k = q.length; N < k; N += 1) {
              var D = q[N];
              D = D.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):touch#([\w\-\.ぁ-んァ-ヶ亜-熙]+)/, "($1):touch#($2)");
              var I = D.replace(/BEGIN/, "END"), M = new RegExp(D + "(([\\n\\r\\t]|.)*?)" + I, "g");
              b = b.replace(M, function(W, F, tt, z) {
                var ot = typeof S[F] == "function" ? S[F].apply(w) : w.getDataFromObj(F, S);
                return "" + ot === tt ? z : "";
              });
            }
          if (_)
            for (var j = 0, ct = _.length; j < ct; j += 1) {
              var rt = _[j];
              rt = rt.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):touchnot#([\w\-\.ぁ-んァ-ヶ亜-熙]+)/, "($1):touchnot#($2)");
              var pt = rt.replace(/BEGIN/, "END"), at = new RegExp(rt + "(([\\n\\r\\t]|.)*?)" + pt, "g");
              b = b.replace(at, function(W, F, tt, z) {
                var ot = typeof S[F] == "function" ? S[F].apply(w) : w.getDataFromObj(F, S);
                return "" + ot !== tt ? z : "";
              });
            }
          if (v)
            for (var mt = 0, vt = v.length; mt < vt; mt += 1) {
              var st = v[mt];
              st = st.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):exist/, "($1):exist");
              var lt = st.replace(/BEGIN/, "END"), G = new RegExp(st + "(([\\n\\r\\t]|.)*?)" + lt, "g");
              b = b.replace(G, function(W, F, tt) {
                var z = typeof S[F] == "function" ? S[F].apply(w) : w.getDataFromObj(F, S);
                return z || z === 0 ? tt : "";
              });
            }
          if (T)
            for (var Y = 0, ft = T.length; Y < ft; Y += 1) {
              var ut = T[Y];
              ut = ut.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):empty/, "($1):empty");
              var bt = ut.replace(/BEGIN/, "END"), dt = new RegExp(ut + "(([\\n\\r\\t]|.)*?)" + bt, "g");
              b = b.replace(dt, function(W, F, tt) {
                var z = typeof S[F] == "function" ? S[F].apply(w) : w.getDataFromObj(F, S);
                return !z && z !== 0 ? tt : "";
              });
            }
          return b = b.replace(/{([\w\-\.ぁ-んァ-ヶ亜-熙]+)}(\[([\w\-\.ぁ-んァ-ヶ亜-熙]+)\])*/g, function(W, F, tt, z) {
            var ot = void 0;
            if ("" + F == "i")
              ot = g;
            else if (S[F] || S[F] === 0)
              typeof S[F] == "function" ? ot = S[F].apply(w) : ot = S[F];
            else
              return z && w.convert && w.convert[z] ? w.convert[z].call(w, "") : "";
            return z && w.convert && w.convert[z] ? w.convert[z].call(w, ot) : ot;
          }), b;
        }
        /* 絶対パス形式の変数を解決*/
      }, {
        key: "resolveAbsBlock",
        value: function(b) {
          var S = this;
          return b = b.replace(/{(.*?)}/g, function(g, w) {
            var q = S.getDataByString(w);
            return typeof q < "u" ? typeof q == "function" ? q.apply(S) : q : g;
          }), b;
        }
      }, {
        key: "resolveInclude",
        value: function(b) {
          var S = /<!-- #include id="(.*?)" -->/g;
          return b = b.replace(S, function(g, w) {
            return (0, c.selector)("#" + w).innerHTML;
          }), b;
        }
      }, {
        key: "resolveWith",
        value: function(b) {
          var S = /<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):with -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+):with -->/g;
          return b = b.replace(S, function(g, w) {
            return g = g.replace(/data\-bind=['"](.*?)['"]/g, "data-bind='" + w + ".$1'"), g;
          }), b;
        }
      }, {
        key: "resolveLoop",
        value: function(b) {
          var S = /<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->/g, g = this;
          return b = b.replace(S, function(w, q, _) {
            var v = g.getDataByString(q), T = [];
            typeof v == "function" ? T = v.apply(g) : T = v;
            var N = "";
            if (T instanceof Array)
              for (var k = 0, D = T.length; k < D; k += 1)
                N += g.resolveBlock(_, T[k], k);
            return N = N.replace(/\\([^\\])/g, "$1"), N;
          }), b;
        }
      }, {
        key: "removeData",
        value: function(b) {
          var S = this.data;
          return Object.keys(S).forEach(function(g) {
            for (var w = 0, q = b.length; w < q; w += 1)
              g === b[w] && delete S[g];
          }), this;
        }
      }, {
        key: "hasLoop",
        value: function(b) {
          var S = /<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->/g;
          return !!b.match(S);
        }
      }, {
        key: "getHtml",
        value: function(b, S) {
          var g = this.atemplate.find(function(_) {
            return _.id === b;
          }), w = "";
          if (g && g.html && (w = g.html), S && (w = b), !w)
            return "";
          var q = this.data;
          for (w = this.resolveInclude(w), w = this.resolveWith(w); this.hasLoop(w); )
            w = this.resolveLoop(w);
          return w = this.resolveBlock(w, q), w = w.replace(/\\([^\\])/g, "$1"), w = this.resolveAbsBlock(w), w.replace(/^([\t ])*\n/gm, "");
        }
      }, {
        key: "update",
        value: function() {
          var b = this, S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "html", g = arguments[1], w = this.templates;
          this.beforeUpdated && this.beforeUpdated();
          for (var q = function(N, k) {
            var D = w[N], I = "#" + D, M = b.getHtml(D), j = (0, c.selector)("[data-id='" + D + "']");
            if (!j)
              (0, c.selector)(I).insertAdjacentHTML("afterend", '<div data-id="' + D + '"></div>'), S === "text" ? (0, c.selector)("[data-id='" + D + "']").innerText = M : (0, c.selector)("[data-id='" + D + "']").innerHTML = M;
            else if (S === "text")
              j.innerText = M;
            else if (g) {
              var ct = document.createElement("div");
              ct.innerHTML = M;
              var rt = ct.querySelector(g).outerHTML;
              (0, u.default)(j.querySelector(g), rt);
            } else
              (0, u.default)(j, "<div data-id='" + D + "'>" + M + "</div>");
            var pt = b.atemplate.find(function(at) {
              return at.id === D;
            });
            pt.binded || (pt.binded = !0, b.addDataBind((0, c.selector)("[data-id='" + D + "']")), b.addActionBind((0, c.selector)("[data-id='" + D + "']")));
          }, _ = 0, v = w.length; _ < v; _ += 1)
            q(_);
          return this.updateBindingData(g), this.onUpdated && this.onUpdated(g), this;
        }
      }, {
        key: "updateBindingData",
        value: function(b) {
          for (var S = this, g = this.templates, w = 0, q = g.length; w < q; w += 1) {
            var _ = g[w], v = (0, c.selector)("[data-id='" + _ + "']");
            b && (v = v.querySelector(b));
            var T = v.querySelectorAll("[data-bind]");
            [].forEach.call(T, function(k) {
              var D = S.getDataByString(k.getAttribute("data-bind"));
              k.getAttribute("type") === "checkbox" || k.getAttribute("type") === "radio" ? D === k.value && (k.checked = !0) : k.value = D;
            });
            var N = v.querySelectorAll("[data-bind-oneway]");
            [].forEach.call(N, function(k) {
              var D = S.getDataByString(k.getAttribute("data-bind-oneway"));
              k.getAttribute("type") === "checkbox" || k.getAttribute("type") === "radio" ? D === k.value && (k.checked = !0) : k.value = D;
            });
          }
          return this;
        }
      }, {
        key: "applyMethod",
        value: function(b) {
          for (var S, g = arguments.length, w = Array(g > 1 ? g - 1 : 0), q = 1; q < g; q++)
            w[q - 1] = arguments[q];
          return (S = this.method)[b].apply(S, w);
        }
      }, {
        key: "getComputedProp",
        value: function(b) {
          return this.data[b].apply(this);
        }
      }, {
        key: "remove",
        value: function(b) {
          for (var S = this.data, g = b.split("."); g.length > 1; )
            S = S[g.shift()];
          var w = g.shift();
          return w.match(/^\d+$/) ? S.splice(Number(w), 1) : delete S[w], this;
        }
      }]), E;
    })();
    s.default = B, l.exports = s.default;
  })(Ft, Ft.exports)), Ft.exports;
}
var Dn = qn();
const In = /* @__PURE__ */ gn(Dn);
var Lt = function() {
  return Lt = Object.assign || function(l) {
    for (var s, r = 1, h = arguments.length; r < h; r++) {
      s = arguments[r];
      for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (l[u] = s[u]);
    }
    return l;
  }, Lt.apply(this, arguments);
}, Cn = "~", Rn = "~~";
function ge(l, s) {
  for (var r = {}, h = {}, u = l.split(Rn), c = !1, o = 0; u.length > o; o++) {
    for (var n = u[o].split(Cn), p = 0; p < n.length; p += 2) {
      var y = n[p], x = n[p + 1], L = "&" + y + ";";
      r[L] = x, c && (r["&" + y] = x), h[x] = L;
    }
    c = !0;
  }
  return s ? { entities: Lt(Lt({}, r), s.entities), characters: Lt(Lt({}, h), s.characters) } : { entities: r, characters: h };
}
var Gt = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
}, Nt = {};
Nt.xml = ge(`lt~<~gt~>~quot~"~apos~'~amp~&`);
Nt.html4 = ge(`apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~"~amp~&~lt~<~gt~>`);
Nt.html5 = ge('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~	~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®', Nt.html4);
var On = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
}, Fn = String.fromCodePoint || function(l) {
  return String.fromCharCode(Math.floor((l - 65536) / 1024) + 55296, (l - 65536) % 1024 + 56320);
}, Un = String.prototype.codePointAt ? function(l, s) {
  return l.codePointAt(s);
} : function(l, s) {
  return (l.charCodeAt(s) - 55296) * 1024 + l.charCodeAt(s + 1) - 56320 + 65536;
}, kt = function() {
  return kt = Object.assign || function(l) {
    for (var s, r = 1, h = arguments.length; r < h; r++) {
      s = arguments[r];
      for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (l[u] = s[u]);
    }
    return l;
  }, kt.apply(this, arguments);
}, mn = kt(kt({}, Nt), { all: Nt.html5 }), Hn = {
  specialChars: /[<>'"&]/g,
  nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g,
  nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g,
  nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g,
  extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g
}, Mn = {
  mode: "specialChars",
  level: "all",
  numeric: "decimal"
};
function $n(l, s) {
  var r = Mn, h = r.mode, u = h === void 0 ? "specialChars" : h, c = r.numeric, o = c === void 0 ? "decimal" : c, n = r.level, p = n === void 0 ? "all" : n;
  if (!l)
    return "";
  var y = Hn[u], x = mn[p].characters, L = o === "hexadecimal";
  return String.prototype.replace.call(l, y, function(B) {
    var E = x[B];
    if (!E) {
      var A = B.length > 1 ? Un(B, 0) : B.charCodeAt(0);
      E = (L ? "&#x" + A.toString(16) : "&#" + A) + ";";
    }
    return E;
  });
}
var Pn = {
  scope: "body",
  level: "all"
}, Vt = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g, jt = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g, xe = {
  xml: {
    strict: Vt,
    attribute: jt,
    body: Gt.xml
  },
  html4: {
    strict: Vt,
    attribute: jt,
    body: Gt.html4
  },
  html5: {
    strict: Vt,
    attribute: jt,
    body: Gt.html5
  }
}, Gn = kt(kt({}, xe), { all: xe.html5 }), vn = String.fromCharCode, Vn = vn(65533);
function jn(l, s, r, h) {
  var u = l, c = l[l.length - 1];
  if (r && c === "=")
    u = l;
  else if (h && c !== ";")
    u = l;
  else {
    var o = s[l];
    if (o)
      u = o;
    else if (l[0] === "&" && l[1] === "#") {
      var n = l[2], p = n == "x" || n == "X" ? parseInt(l.substr(3), 16) : parseInt(l.substr(2));
      u = p >= 1114111 ? Vn : p > 65535 ? Fn(p) : vn(On[p] || p);
    }
  }
  return u;
}
function Se(l, s) {
  var r = Pn, h = r.level, u = h === void 0 ? "all" : h, c = r.scope, o = c === void 0 ? u === "xml" ? "strict" : "body" : c;
  if (!l)
    return "";
  var n = Gn[u][o], p = mn[u].entities, y = o === "attribute", x = o === "strict";
  return l.replace(n, function(L) {
    return jn(L, p, y, x);
  });
}
var zt = { exports: {} };
const zn = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
};
var Qt, Ae;
function bn() {
  if (Ae) return Qt;
  Ae = 1;
  var l = zn;
  Qt = s;
  function s(r) {
    if (r >= 55296 && r <= 57343 || r > 1114111)
      return "�";
    r in l && (r = l[r]);
    var h = "";
    return r > 65535 && (r -= 65536, h += String.fromCharCode(r >>> 10 & 1023 | 55296), r = 56320 | r & 1023), h += String.fromCharCode(r), h;
  }
  return Qt;
}
const Qn = "Á", Wn = "á", Yn = "Ă", Xn = "ă", Jn = "∾", Zn = "∿", Kn = "∾̳", tr = "Â", er = "â", nr = "´", rr = "А", sr = "а", or = "Æ", ir = "æ", ar = "⁡", cr = "𝔄", lr = "𝔞", ur = "À", hr = "à", pr = "ℵ", fr = "ℵ", dr = "Α", gr = "α", mr = "Ā", vr = "ā", br = "⨿", yr = "&", _r = "&", wr = "⩕", Er = "⩓", xr = "∧", Sr = "⩜", Ar = "⩘", Tr = "⩚", Br = "∠", Lr = "⦤", Nr = "∠", kr = "⦨", qr = "⦩", Dr = "⦪", Ir = "⦫", Cr = "⦬", Rr = "⦭", Or = "⦮", Fr = "⦯", Ur = "∡", Hr = "∟", Mr = "⊾", $r = "⦝", Pr = "∢", Gr = "Å", Vr = "⍼", jr = "Ą", zr = "ą", Qr = "𝔸", Wr = "𝕒", Yr = "⩯", Xr = "≈", Jr = "⩰", Zr = "≊", Kr = "≋", ts = "'", es = "⁡", ns = "≈", rs = "≊", ss = "Å", os = "å", is = "𝒜", as = "𝒶", cs = "≔", ls = "*", us = "≈", hs = "≍", ps = "Ã", fs = "ã", ds = "Ä", gs = "ä", ms = "∳", vs = "⨑", bs = "≌", ys = "϶", _s = "‵", ws = "∽", Es = "⋍", xs = "∖", Ss = "⫧", As = "⊽", Ts = "⌅", Bs = "⌆", Ls = "⌅", Ns = "⎵", ks = "⎶", qs = "≌", Ds = "Б", Is = "б", Cs = "„", Rs = "∵", Os = "∵", Fs = "∵", Us = "⦰", Hs = "϶", Ms = "ℬ", $s = "ℬ", Ps = "Β", Gs = "β", Vs = "ℶ", js = "≬", zs = "𝔅", Qs = "𝔟", Ws = "⋂", Ys = "◯", Xs = "⋃", Js = "⨀", Zs = "⨁", Ks = "⨂", to = "⨆", eo = "★", no = "▽", ro = "△", so = "⨄", oo = "⋁", io = "⋀", ao = "⤍", co = "⧫", lo = "▪", uo = "▴", ho = "▾", po = "◂", fo = "▸", go = "␣", mo = "▒", vo = "░", bo = "▓", yo = "█", _o = "=⃥", wo = "≡⃥", Eo = "⫭", xo = "⌐", So = "𝔹", Ao = "𝕓", To = "⊥", Bo = "⊥", Lo = "⋈", No = "⧉", ko = "┐", qo = "╕", Do = "╖", Io = "╗", Co = "┌", Ro = "╒", Oo = "╓", Fo = "╔", Uo = "─", Ho = "═", Mo = "┬", $o = "╤", Po = "╥", Go = "╦", Vo = "┴", jo = "╧", zo = "╨", Qo = "╩", Wo = "⊟", Yo = "⊞", Xo = "⊠", Jo = "┘", Zo = "╛", Ko = "╜", ti = "╝", ei = "└", ni = "╘", ri = "╙", si = "╚", oi = "│", ii = "║", ai = "┼", ci = "╪", li = "╫", ui = "╬", hi = "┤", pi = "╡", fi = "╢", di = "╣", gi = "├", mi = "╞", vi = "╟", bi = "╠", yi = "‵", _i = "˘", wi = "˘", Ei = "¦", xi = "𝒷", Si = "ℬ", Ai = "⁏", Ti = "∽", Bi = "⋍", Li = "⧅", Ni = "\\", ki = "⟈", qi = "•", Di = "•", Ii = "≎", Ci = "⪮", Ri = "≏", Oi = "≎", Fi = "≏", Ui = "Ć", Hi = "ć", Mi = "⩄", $i = "⩉", Pi = "⩋", Gi = "∩", Vi = "⋒", ji = "⩇", zi = "⩀", Qi = "ⅅ", Wi = "∩︀", Yi = "⁁", Xi = "ˇ", Ji = "ℭ", Zi = "⩍", Ki = "Č", ta = "č", ea = "Ç", na = "ç", ra = "Ĉ", sa = "ĉ", oa = "∰", ia = "⩌", aa = "⩐", ca = "Ċ", la = "ċ", ua = "¸", ha = "¸", pa = "⦲", fa = "¢", da = "·", ga = "·", ma = "𝔠", va = "ℭ", ba = "Ч", ya = "ч", _a = "✓", wa = "✓", Ea = "Χ", xa = "χ", Sa = "ˆ", Aa = "≗", Ta = "↺", Ba = "↻", La = "⊛", Na = "⊚", ka = "⊝", qa = "⊙", Da = "®", Ia = "Ⓢ", Ca = "⊖", Ra = "⊕", Oa = "⊗", Fa = "○", Ua = "⧃", Ha = "≗", Ma = "⨐", $a = "⫯", Pa = "⧂", Ga = "∲", Va = "”", ja = "’", za = "♣", Qa = "♣", Wa = ":", Ya = "∷", Xa = "⩴", Ja = "≔", Za = "≔", Ka = ",", tc = "@", ec = "∁", nc = "∘", rc = "∁", sc = "ℂ", oc = "≅", ic = "⩭", ac = "≡", cc = "∮", lc = "∯", uc = "∮", hc = "𝕔", pc = "ℂ", fc = "∐", dc = "∐", gc = "©", mc = "©", vc = "℗", bc = "∳", yc = "↵", _c = "✗", wc = "⨯", Ec = "𝒞", xc = "𝒸", Sc = "⫏", Ac = "⫑", Tc = "⫐", Bc = "⫒", Lc = "⋯", Nc = "⤸", kc = "⤵", qc = "⋞", Dc = "⋟", Ic = "↶", Cc = "⤽", Rc = "⩈", Oc = "⩆", Fc = "≍", Uc = "∪", Hc = "⋓", Mc = "⩊", $c = "⊍", Pc = "⩅", Gc = "∪︀", Vc = "↷", jc = "⤼", zc = "⋞", Qc = "⋟", Wc = "⋎", Yc = "⋏", Xc = "¤", Jc = "↶", Zc = "↷", Kc = "⋎", tl = "⋏", el = "∲", nl = "∱", rl = "⌭", sl = "†", ol = "‡", il = "ℸ", al = "↓", cl = "↡", ll = "⇓", ul = "‐", hl = "⫤", pl = "⊣", fl = "⤏", dl = "˝", gl = "Ď", ml = "ď", vl = "Д", bl = "д", yl = "‡", _l = "⇊", wl = "ⅅ", El = "ⅆ", xl = "⤑", Sl = "⩷", Al = "°", Tl = "∇", Bl = "Δ", Ll = "δ", Nl = "⦱", kl = "⥿", ql = "𝔇", Dl = "𝔡", Il = "⥥", Cl = "⇃", Rl = "⇂", Ol = "´", Fl = "˙", Ul = "˝", Hl = "`", Ml = "˜", $l = "⋄", Pl = "⋄", Gl = "⋄", Vl = "♦", jl = "♦", zl = "¨", Ql = "ⅆ", Wl = "ϝ", Yl = "⋲", Xl = "÷", Jl = "÷", Zl = "⋇", Kl = "⋇", tu = "Ђ", eu = "ђ", nu = "⌞", ru = "⌍", su = "$", ou = "𝔻", iu = "𝕕", au = "¨", cu = "˙", lu = "⃜", uu = "≐", hu = "≑", pu = "≐", fu = "∸", du = "∔", gu = "⊡", mu = "⌆", vu = "∯", bu = "¨", yu = "⇓", _u = "⇐", wu = "⇔", Eu = "⫤", xu = "⟸", Su = "⟺", Au = "⟹", Tu = "⇒", Bu = "⊨", Lu = "⇑", Nu = "⇕", ku = "∥", qu = "⤓", Du = "↓", Iu = "↓", Cu = "⇓", Ru = "⇵", Ou = "̑", Fu = "⇊", Uu = "⇃", Hu = "⇂", Mu = "⥐", $u = "⥞", Pu = "⥖", Gu = "↽", Vu = "⥟", ju = "⥗", zu = "⇁", Qu = "↧", Wu = "⊤", Yu = "⤐", Xu = "⌟", Ju = "⌌", Zu = "𝒟", Ku = "𝒹", th = "Ѕ", eh = "ѕ", nh = "⧶", rh = "Đ", sh = "đ", oh = "⋱", ih = "▿", ah = "▾", ch = "⇵", lh = "⥯", uh = "⦦", hh = "Џ", ph = "џ", fh = "⟿", dh = "É", gh = "é", mh = "⩮", vh = "Ě", bh = "ě", yh = "Ê", _h = "ê", wh = "≖", Eh = "≕", xh = "Э", Sh = "э", Ah = "⩷", Th = "Ė", Bh = "ė", Lh = "≑", Nh = "ⅇ", kh = "≒", qh = "𝔈", Dh = "𝔢", Ih = "⪚", Ch = "È", Rh = "è", Oh = "⪖", Fh = "⪘", Uh = "⪙", Hh = "∈", Mh = "⏧", $h = "ℓ", Ph = "⪕", Gh = "⪗", Vh = "Ē", jh = "ē", zh = "∅", Qh = "∅", Wh = "◻", Yh = "∅", Xh = "▫", Jh = " ", Zh = " ", Kh = " ", tp = "Ŋ", ep = "ŋ", np = " ", rp = "Ę", sp = "ę", op = "𝔼", ip = "𝕖", ap = "⋕", cp = "⧣", lp = "⩱", up = "ε", hp = "Ε", pp = "ε", fp = "ϵ", dp = "≖", gp = "≕", mp = "≂", vp = "⪖", bp = "⪕", yp = "⩵", _p = "=", wp = "≂", Ep = "≟", xp = "⇌", Sp = "≡", Ap = "⩸", Tp = "⧥", Bp = "⥱", Lp = "≓", Np = "ℯ", kp = "ℰ", qp = "≐", Dp = "⩳", Ip = "≂", Cp = "Η", Rp = "η", Op = "Ð", Fp = "ð", Up = "Ë", Hp = "ë", Mp = "€", $p = "!", Pp = "∃", Gp = "∃", Vp = "ℰ", jp = "ⅇ", zp = "ⅇ", Qp = "≒", Wp = "Ф", Yp = "ф", Xp = "♀", Jp = "ﬃ", Zp = "ﬀ", Kp = "ﬄ", tf = "𝔉", ef = "𝔣", nf = "ﬁ", rf = "◼", sf = "▪", of = "fj", af = "♭", cf = "ﬂ", lf = "▱", uf = "ƒ", hf = "𝔽", pf = "𝕗", ff = "∀", df = "∀", gf = "⋔", mf = "⫙", vf = "ℱ", bf = "⨍", yf = "½", _f = "⅓", wf = "¼", Ef = "⅕", xf = "⅙", Sf = "⅛", Af = "⅔", Tf = "⅖", Bf = "¾", Lf = "⅗", Nf = "⅜", kf = "⅘", qf = "⅚", Df = "⅝", If = "⅞", Cf = "⁄", Rf = "⌢", Of = "𝒻", Ff = "ℱ", Uf = "ǵ", Hf = "Γ", Mf = "γ", $f = "Ϝ", Pf = "ϝ", Gf = "⪆", Vf = "Ğ", jf = "ğ", zf = "Ģ", Qf = "Ĝ", Wf = "ĝ", Yf = "Г", Xf = "г", Jf = "Ġ", Zf = "ġ", Kf = "≥", td = "≧", ed = "⪌", nd = "⋛", rd = "≥", sd = "≧", od = "⩾", id = "⪩", ad = "⩾", cd = "⪀", ld = "⪂", ud = "⪄", hd = "⋛︀", pd = "⪔", fd = "𝔊", dd = "𝔤", gd = "≫", md = "⋙", vd = "⋙", bd = "ℷ", yd = "Ѓ", _d = "ѓ", wd = "⪥", Ed = "≷", xd = "⪒", Sd = "⪤", Ad = "⪊", Td = "⪊", Bd = "⪈", Ld = "≩", Nd = "⪈", kd = "≩", qd = "⋧", Dd = "𝔾", Id = "𝕘", Cd = "`", Rd = "≥", Od = "⋛", Fd = "≧", Ud = "⪢", Hd = "≷", Md = "⩾", $d = "≳", Pd = "𝒢", Gd = "ℊ", Vd = "≳", jd = "⪎", zd = "⪐", Qd = "⪧", Wd = "⩺", Yd = ">", Xd = ">", Jd = "≫", Zd = "⋗", Kd = "⦕", tg = "⩼", eg = "⪆", ng = "⥸", rg = "⋗", sg = "⋛", og = "⪌", ig = "≷", ag = "≳", cg = "≩︀", lg = "≩︀", ug = "ˇ", hg = " ", pg = "½", fg = "ℋ", dg = "Ъ", gg = "ъ", mg = "⥈", vg = "↔", bg = "⇔", yg = "↭", _g = "^", wg = "ℏ", Eg = "Ĥ", xg = "ĥ", Sg = "♥", Ag = "♥", Tg = "…", Bg = "⊹", Lg = "𝔥", Ng = "ℌ", kg = "ℋ", qg = "⤥", Dg = "⤦", Ig = "⇿", Cg = "∻", Rg = "↩", Og = "↪", Fg = "𝕙", Ug = "ℍ", Hg = "―", Mg = "─", $g = "𝒽", Pg = "ℋ", Gg = "ℏ", Vg = "Ħ", jg = "ħ", zg = "≎", Qg = "≏", Wg = "⁃", Yg = "‐", Xg = "Í", Jg = "í", Zg = "⁣", Kg = "Î", tm = "î", em = "И", nm = "и", rm = "İ", sm = "Е", om = "е", im = "¡", am = "⇔", cm = "𝔦", lm = "ℑ", um = "Ì", hm = "ì", pm = "ⅈ", fm = "⨌", dm = "∭", gm = "⧜", mm = "℩", vm = "Ĳ", bm = "ĳ", ym = "Ī", _m = "ī", wm = "ℑ", Em = "ⅈ", xm = "ℐ", Sm = "ℑ", Am = "ı", Tm = "ℑ", Bm = "⊷", Lm = "Ƶ", Nm = "⇒", km = "℅", qm = "∞", Dm = "⧝", Im = "ı", Cm = "⊺", Rm = "∫", Om = "∬", Fm = "ℤ", Um = "∫", Hm = "⊺", Mm = "⋂", $m = "⨗", Pm = "⨼", Gm = "⁣", Vm = "⁢", jm = "Ё", zm = "ё", Qm = "Į", Wm = "į", Ym = "𝕀", Xm = "𝕚", Jm = "Ι", Zm = "ι", Km = "⨼", tv = "¿", ev = "𝒾", nv = "ℐ", rv = "∈", sv = "⋵", ov = "⋹", iv = "⋴", av = "⋳", cv = "∈", lv = "⁢", uv = "Ĩ", hv = "ĩ", pv = "І", fv = "і", dv = "Ï", gv = "ï", mv = "Ĵ", vv = "ĵ", bv = "Й", yv = "й", _v = "𝔍", wv = "𝔧", Ev = "ȷ", xv = "𝕁", Sv = "𝕛", Av = "𝒥", Tv = "𝒿", Bv = "Ј", Lv = "ј", Nv = "Є", kv = "є", qv = "Κ", Dv = "κ", Iv = "ϰ", Cv = "Ķ", Rv = "ķ", Ov = "К", Fv = "к", Uv = "𝔎", Hv = "𝔨", Mv = "ĸ", $v = "Х", Pv = "х", Gv = "Ќ", Vv = "ќ", jv = "𝕂", zv = "𝕜", Qv = "𝒦", Wv = "𝓀", Yv = "⇚", Xv = "Ĺ", Jv = "ĺ", Zv = "⦴", Kv = "ℒ", tb = "Λ", eb = "λ", nb = "⟨", rb = "⟪", sb = "⦑", ob = "⟨", ib = "⪅", ab = "ℒ", cb = "«", lb = "⇤", ub = "⤟", hb = "←", pb = "↞", fb = "⇐", db = "⤝", gb = "↩", mb = "↫", vb = "⤹", bb = "⥳", yb = "↢", _b = "⤙", wb = "⤛", Eb = "⪫", xb = "⪭", Sb = "⪭︀", Ab = "⤌", Tb = "⤎", Bb = "❲", Lb = "{", Nb = "[", kb = "⦋", qb = "⦏", Db = "⦍", Ib = "Ľ", Cb = "ľ", Rb = "Ļ", Ob = "ļ", Fb = "⌈", Ub = "{", Hb = "Л", Mb = "л", $b = "⤶", Pb = "“", Gb = "„", Vb = "⥧", jb = "⥋", zb = "↲", Qb = "≤", Wb = "≦", Yb = "⟨", Xb = "⇤", Jb = "←", Zb = "←", Kb = "⇐", ty = "⇆", ey = "↢", ny = "⌈", ry = "⟦", sy = "⥡", oy = "⥙", iy = "⇃", ay = "⌊", cy = "↽", ly = "↼", uy = "⇇", hy = "↔", py = "↔", fy = "⇔", dy = "⇆", gy = "⇋", my = "↭", vy = "⥎", by = "↤", yy = "⊣", _y = "⥚", wy = "⋋", Ey = "⧏", xy = "⊲", Sy = "⊴", Ay = "⥑", Ty = "⥠", By = "⥘", Ly = "↿", Ny = "⥒", ky = "↼", qy = "⪋", Dy = "⋚", Iy = "≤", Cy = "≦", Ry = "⩽", Oy = "⪨", Fy = "⩽", Uy = "⩿", Hy = "⪁", My = "⪃", $y = "⋚︀", Py = "⪓", Gy = "⪅", Vy = "⋖", jy = "⋚", zy = "⪋", Qy = "⋚", Wy = "≦", Yy = "≶", Xy = "≶", Jy = "⪡", Zy = "≲", Ky = "⩽", t_ = "≲", e_ = "⥼", n_ = "⌊", r_ = "𝔏", s_ = "𝔩", o_ = "≶", i_ = "⪑", a_ = "⥢", c_ = "↽", l_ = "↼", u_ = "⥪", h_ = "▄", p_ = "Љ", f_ = "љ", d_ = "⇇", g_ = "≪", m_ = "⋘", v_ = "⌞", b_ = "⇚", y_ = "⥫", __ = "◺", w_ = "Ŀ", E_ = "ŀ", x_ = "⎰", S_ = "⎰", A_ = "⪉", T_ = "⪉", B_ = "⪇", L_ = "≨", N_ = "⪇", k_ = "≨", q_ = "⋦", D_ = "⟬", I_ = "⇽", C_ = "⟦", R_ = "⟵", O_ = "⟵", F_ = "⟸", U_ = "⟷", H_ = "⟷", M_ = "⟺", $_ = "⟼", P_ = "⟶", G_ = "⟶", V_ = "⟹", j_ = "↫", z_ = "↬", Q_ = "⦅", W_ = "𝕃", Y_ = "𝕝", X_ = "⨭", J_ = "⨴", Z_ = "∗", K_ = "_", tw = "↙", ew = "↘", nw = "◊", rw = "◊", sw = "⧫", ow = "(", iw = "⦓", aw = "⇆", cw = "⌟", lw = "⇋", uw = "⥭", hw = "‎", pw = "⊿", fw = "‹", dw = "𝓁", gw = "ℒ", mw = "↰", vw = "↰", bw = "≲", yw = "⪍", _w = "⪏", ww = "[", Ew = "‘", xw = "‚", Sw = "Ł", Aw = "ł", Tw = "⪦", Bw = "⩹", Lw = "<", Nw = "<", kw = "≪", qw = "⋖", Dw = "⋋", Iw = "⋉", Cw = "⥶", Rw = "⩻", Ow = "◃", Fw = "⊴", Uw = "◂", Hw = "⦖", Mw = "⥊", $w = "⥦", Pw = "≨︀", Gw = "≨︀", Vw = "¯", jw = "♂", zw = "✠", Qw = "✠", Ww = "↦", Yw = "↦", Xw = "↧", Jw = "↤", Zw = "↥", Kw = "▮", tE = "⨩", eE = "М", nE = "м", rE = "—", sE = "∺", oE = "∡", iE = " ", aE = "ℳ", cE = "𝔐", lE = "𝔪", uE = "℧", hE = "µ", pE = "*", fE = "⫰", dE = "∣", gE = "·", mE = "⊟", vE = "−", bE = "∸", yE = "⨪", _E = "∓", wE = "⫛", EE = "…", xE = "∓", SE = "⊧", AE = "𝕄", TE = "𝕞", BE = "∓", LE = "𝓂", NE = "ℳ", kE = "∾", qE = "Μ", DE = "μ", IE = "⊸", CE = "⊸", RE = "∇", OE = "Ń", FE = "ń", UE = "∠⃒", HE = "≉", ME = "⩰̸", $E = "≋̸", PE = "ŉ", GE = "≉", VE = "♮", jE = "ℕ", zE = "♮", QE = " ", WE = "≎̸", YE = "≏̸", XE = "⩃", JE = "Ň", ZE = "ň", KE = "Ņ", tx = "ņ", ex = "≇", nx = "⩭̸", rx = "⩂", sx = "Н", ox = "н", ix = "–", ax = "⤤", cx = "↗", lx = "⇗", ux = "↗", hx = "≠", px = "≐̸", fx = "​", dx = "​", gx = "​", mx = "​", vx = "≢", bx = "⤨", yx = "≂̸", _x = "≫", wx = "≪", Ex = `
`, xx = "∄", Sx = "∄", Ax = "𝔑", Tx = "𝔫", Bx = "≧̸", Lx = "≱", Nx = "≱", kx = "≧̸", qx = "⩾̸", Dx = "⩾̸", Ix = "⋙̸", Cx = "≵", Rx = "≫⃒", Ox = "≯", Fx = "≯", Ux = "≫̸", Hx = "↮", Mx = "⇎", $x = "⫲", Px = "∋", Gx = "⋼", Vx = "⋺", jx = "∋", zx = "Њ", Qx = "њ", Wx = "↚", Yx = "⇍", Xx = "‥", Jx = "≦̸", Zx = "≰", Kx = "↚", t0 = "⇍", e0 = "↮", n0 = "⇎", r0 = "≰", s0 = "≦̸", o0 = "⩽̸", i0 = "⩽̸", a0 = "≮", c0 = "⋘̸", l0 = "≴", u0 = "≪⃒", h0 = "≮", p0 = "⋪", f0 = "⋬", d0 = "≪̸", g0 = "∤", m0 = "⁠", v0 = " ", b0 = "𝕟", y0 = "ℕ", _0 = "⫬", w0 = "¬", E0 = "≢", x0 = "≭", S0 = "∦", A0 = "∉", T0 = "≠", B0 = "≂̸", L0 = "∄", N0 = "≯", k0 = "≱", q0 = "≧̸", D0 = "≫̸", I0 = "≹", C0 = "⩾̸", R0 = "≵", O0 = "≎̸", F0 = "≏̸", U0 = "∉", H0 = "⋵̸", M0 = "⋹̸", $0 = "∉", P0 = "⋷", G0 = "⋶", V0 = "⧏̸", j0 = "⋪", z0 = "⋬", Q0 = "≮", W0 = "≰", Y0 = "≸", X0 = "≪̸", J0 = "⩽̸", Z0 = "≴", K0 = "⪢̸", t1 = "⪡̸", e1 = "∌", n1 = "∌", r1 = "⋾", s1 = "⋽", o1 = "⊀", i1 = "⪯̸", a1 = "⋠", c1 = "∌", l1 = "⧐̸", u1 = "⋫", h1 = "⋭", p1 = "⊏̸", f1 = "⋢", d1 = "⊐̸", g1 = "⋣", m1 = "⊂⃒", v1 = "⊈", b1 = "⊁", y1 = "⪰̸", _1 = "⋡", w1 = "≿̸", E1 = "⊃⃒", x1 = "⊉", S1 = "≁", A1 = "≄", T1 = "≇", B1 = "≉", L1 = "∤", N1 = "∦", k1 = "∦", q1 = "⫽⃥", D1 = "∂̸", I1 = "⨔", C1 = "⊀", R1 = "⋠", O1 = "⊀", F1 = "⪯̸", U1 = "⪯̸", H1 = "⤳̸", M1 = "↛", $1 = "⇏", P1 = "↝̸", G1 = "↛", V1 = "⇏", j1 = "⋫", z1 = "⋭", Q1 = "⊁", W1 = "⋡", Y1 = "⪰̸", X1 = "𝒩", J1 = "𝓃", Z1 = "∤", K1 = "∦", tS = "≁", eS = "≄", nS = "≄", rS = "∤", sS = "∦", oS = "⋢", iS = "⋣", aS = "⊄", cS = "⫅̸", lS = "⊈", uS = "⊂⃒", hS = "⊈", pS = "⫅̸", fS = "⊁", dS = "⪰̸", gS = "⊅", mS = "⫆̸", vS = "⊉", bS = "⊃⃒", yS = "⊉", _S = "⫆̸", wS = "≹", ES = "Ñ", xS = "ñ", SS = "≸", AS = "⋪", TS = "⋬", BS = "⋫", LS = "⋭", NS = "Ν", kS = "ν", qS = "#", DS = "№", IS = " ", CS = "≍⃒", RS = "⊬", OS = "⊭", FS = "⊮", US = "⊯", HS = "≥⃒", MS = ">⃒", $S = "⤄", PS = "⧞", GS = "⤂", VS = "≤⃒", jS = "<⃒", zS = "⊴⃒", QS = "⤃", WS = "⊵⃒", YS = "∼⃒", XS = "⤣", JS = "↖", ZS = "⇖", KS = "↖", tA = "⤧", eA = "Ó", nA = "ó", rA = "⊛", sA = "Ô", oA = "ô", iA = "⊚", aA = "О", cA = "о", lA = "⊝", uA = "Ő", hA = "ő", pA = "⨸", fA = "⊙", dA = "⦼", gA = "Œ", mA = "œ", vA = "⦿", bA = "𝔒", yA = "𝔬", _A = "˛", wA = "Ò", EA = "ò", xA = "⧁", SA = "⦵", AA = "Ω", TA = "∮", BA = "↺", LA = "⦾", NA = "⦻", kA = "‾", qA = "⧀", DA = "Ō", IA = "ō", CA = "Ω", RA = "ω", OA = "Ο", FA = "ο", UA = "⦶", HA = "⊖", MA = "𝕆", $A = "𝕠", PA = "⦷", GA = "“", VA = "‘", jA = "⦹", zA = "⊕", QA = "↻", WA = "⩔", YA = "∨", XA = "⩝", JA = "ℴ", ZA = "ℴ", KA = "ª", tT = "º", eT = "⊶", nT = "⩖", rT = "⩗", sT = "⩛", oT = "Ⓢ", iT = "𝒪", aT = "ℴ", cT = "Ø", lT = "ø", uT = "⊘", hT = "Õ", pT = "õ", fT = "⨶", dT = "⨷", gT = "⊗", mT = "Ö", vT = "ö", bT = "⌽", yT = "‾", _T = "⏞", wT = "⎴", ET = "⏜", xT = "¶", ST = "∥", AT = "∥", TT = "⫳", BT = "⫽", LT = "∂", NT = "∂", kT = "П", qT = "п", DT = "%", IT = ".", CT = "‰", RT = "⊥", OT = "‱", FT = "𝔓", UT = "𝔭", HT = "Φ", MT = "φ", $T = "ϕ", PT = "ℳ", GT = "☎", VT = "Π", jT = "π", zT = "⋔", QT = "ϖ", WT = "ℏ", YT = "ℎ", XT = "ℏ", JT = "⨣", ZT = "⊞", KT = "⨢", tB = "+", eB = "∔", nB = "⨥", rB = "⩲", sB = "±", oB = "±", iB = "⨦", aB = "⨧", cB = "±", lB = "ℌ", uB = "⨕", hB = "𝕡", pB = "ℙ", fB = "£", dB = "⪷", gB = "⪻", mB = "≺", vB = "≼", bB = "⪷", yB = "≺", _B = "≼", wB = "≺", EB = "⪯", xB = "≼", SB = "≾", AB = "⪯", TB = "⪹", BB = "⪵", LB = "⋨", NB = "⪯", kB = "⪳", qB = "≾", DB = "′", IB = "″", CB = "ℙ", RB = "⪹", OB = "⪵", FB = "⋨", UB = "∏", HB = "∏", MB = "⌮", $B = "⌒", PB = "⌓", GB = "∝", VB = "∝", jB = "∷", zB = "∝", QB = "≾", WB = "⊰", YB = "𝒫", XB = "𝓅", JB = "Ψ", ZB = "ψ", KB = " ", tL = "𝔔", eL = "𝔮", nL = "⨌", rL = "𝕢", sL = "ℚ", oL = "⁗", iL = "𝒬", aL = "𝓆", cL = "ℍ", lL = "⨖", uL = "?", hL = "≟", pL = '"', fL = '"', dL = "⇛", gL = "∽̱", mL = "Ŕ", vL = "ŕ", bL = "√", yL = "⦳", _L = "⟩", wL = "⟫", EL = "⦒", xL = "⦥", SL = "⟩", AL = "»", TL = "⥵", BL = "⇥", LL = "⤠", NL = "⤳", kL = "→", qL = "↠", DL = "⇒", IL = "⤞", CL = "↪", RL = "↬", OL = "⥅", FL = "⥴", UL = "⤖", HL = "↣", ML = "↝", $L = "⤚", PL = "⤜", GL = "∶", VL = "ℚ", jL = "⤍", zL = "⤏", QL = "⤐", WL = "❳", YL = "}", XL = "]", JL = "⦌", ZL = "⦎", KL = "⦐", tN = "Ř", eN = "ř", nN = "Ŗ", rN = "ŗ", sN = "⌉", oN = "}", iN = "Р", aN = "р", cN = "⤷", lN = "⥩", uN = "”", hN = "”", pN = "↳", fN = "ℜ", dN = "ℛ", gN = "ℜ", mN = "ℝ", vN = "ℜ", bN = "▭", yN = "®", _N = "®", wN = "∋", EN = "⇋", xN = "⥯", SN = "⥽", AN = "⌋", TN = "𝔯", BN = "ℜ", LN = "⥤", NN = "⇁", kN = "⇀", qN = "⥬", DN = "Ρ", IN = "ρ", CN = "ϱ", RN = "⟩", ON = "⇥", FN = "→", UN = "→", HN = "⇒", MN = "⇄", $N = "↣", PN = "⌉", GN = "⟧", VN = "⥝", jN = "⥕", zN = "⇂", QN = "⌋", WN = "⇁", YN = "⇀", XN = "⇄", JN = "⇌", ZN = "⇉", KN = "↝", tk = "↦", ek = "⊢", nk = "⥛", rk = "⋌", sk = "⧐", ok = "⊳", ik = "⊵", ak = "⥏", ck = "⥜", lk = "⥔", uk = "↾", hk = "⥓", pk = "⇀", fk = "˚", dk = "≓", gk = "⇄", mk = "⇌", vk = "‏", bk = "⎱", yk = "⎱", _k = "⫮", wk = "⟭", Ek = "⇾", xk = "⟧", Sk = "⦆", Ak = "𝕣", Tk = "ℝ", Bk = "⨮", Lk = "⨵", Nk = "⥰", kk = ")", qk = "⦔", Dk = "⨒", Ik = "⇉", Ck = "⇛", Rk = "›", Ok = "𝓇", Fk = "ℛ", Uk = "↱", Hk = "↱", Mk = "]", $k = "’", Pk = "’", Gk = "⋌", Vk = "⋊", jk = "▹", zk = "⊵", Qk = "▸", Wk = "⧎", Yk = "⧴", Xk = "⥨", Jk = "℞", Zk = "Ś", Kk = "ś", tq = "‚", eq = "⪸", nq = "Š", rq = "š", sq = "⪼", oq = "≻", iq = "≽", aq = "⪰", cq = "⪴", lq = "Ş", uq = "ş", hq = "Ŝ", pq = "ŝ", fq = "⪺", dq = "⪶", gq = "⋩", mq = "⨓", vq = "≿", bq = "С", yq = "с", _q = "⊡", wq = "⋅", Eq = "⩦", xq = "⤥", Sq = "↘", Aq = "⇘", Tq = "↘", Bq = "§", Lq = ";", Nq = "⤩", kq = "∖", qq = "∖", Dq = "✶", Iq = "𝔖", Cq = "𝔰", Rq = "⌢", Oq = "♯", Fq = "Щ", Uq = "щ", Hq = "Ш", Mq = "ш", $q = "↓", Pq = "←", Gq = "∣", Vq = "∥", jq = "→", zq = "↑", Qq = "­", Wq = "Σ", Yq = "σ", Xq = "ς", Jq = "ς", Zq = "∼", Kq = "⩪", tD = "≃", eD = "≃", nD = "⪞", rD = "⪠", sD = "⪝", oD = "⪟", iD = "≆", aD = "⨤", cD = "⥲", lD = "←", uD = "∘", hD = "∖", pD = "⨳", fD = "⧤", dD = "∣", gD = "⌣", mD = "⪪", vD = "⪬", bD = "⪬︀", yD = "Ь", _D = "ь", wD = "⌿", ED = "⧄", xD = "/", SD = "𝕊", AD = "𝕤", TD = "♠", BD = "♠", LD = "∥", ND = "⊓", kD = "⊓︀", qD = "⊔", DD = "⊔︀", ID = "√", CD = "⊏", RD = "⊑", OD = "⊏", FD = "⊑", UD = "⊐", HD = "⊒", MD = "⊐", $D = "⊒", PD = "□", GD = "□", VD = "⊓", jD = "⊏", zD = "⊑", QD = "⊐", WD = "⊒", YD = "⊔", XD = "▪", JD = "□", ZD = "▪", KD = "→", tI = "𝒮", eI = "𝓈", nI = "∖", rI = "⌣", sI = "⋆", oI = "⋆", iI = "☆", aI = "★", cI = "ϵ", lI = "ϕ", uI = "¯", hI = "⊂", pI = "⋐", fI = "⪽", dI = "⫅", gI = "⊆", mI = "⫃", vI = "⫁", bI = "⫋", yI = "⊊", _I = "⪿", wI = "⥹", EI = "⊂", xI = "⋐", SI = "⊆", AI = "⫅", TI = "⊆", BI = "⊊", LI = "⫋", NI = "⫇", kI = "⫕", qI = "⫓", DI = "⪸", II = "≻", CI = "≽", RI = "≻", OI = "⪰", FI = "≽", UI = "≿", HI = "⪰", MI = "⪺", $I = "⪶", PI = "⋩", GI = "≿", VI = "∋", jI = "∑", zI = "∑", QI = "♪", WI = "¹", YI = "²", XI = "³", JI = "⊃", ZI = "⋑", KI = "⪾", tC = "⫘", eC = "⫆", nC = "⊇", rC = "⫄", sC = "⊃", oC = "⊇", iC = "⟉", aC = "⫗", cC = "⥻", lC = "⫂", uC = "⫌", hC = "⊋", pC = "⫀", fC = "⊃", dC = "⋑", gC = "⊇", mC = "⫆", vC = "⊋", bC = "⫌", yC = "⫈", _C = "⫔", wC = "⫖", EC = "⤦", xC = "↙", SC = "⇙", AC = "↙", TC = "⤪", BC = "ß", LC = "	", NC = "⌖", kC = "Τ", qC = "τ", DC = "⎴", IC = "Ť", CC = "ť", RC = "Ţ", OC = "ţ", FC = "Т", UC = "т", HC = "⃛", MC = "⌕", $C = "𝔗", PC = "𝔱", GC = "∴", VC = "∴", jC = "∴", zC = "Θ", QC = "θ", WC = "ϑ", YC = "ϑ", XC = "≈", JC = "∼", ZC = "  ", KC = " ", tR = " ", eR = "≈", nR = "∼", rR = "Þ", sR = "þ", oR = "˜", iR = "∼", aR = "≃", cR = "≅", lR = "≈", uR = "⨱", hR = "⊠", pR = "×", fR = "⨰", dR = "∭", gR = "⤨", mR = "⌶", vR = "⫱", bR = "⊤", yR = "𝕋", _R = "𝕥", wR = "⫚", ER = "⤩", xR = "‴", SR = "™", AR = "™", TR = "▵", BR = "▿", LR = "◃", NR = "⊴", kR = "≜", qR = "▹", DR = "⊵", IR = "◬", CR = "≜", RR = "⨺", OR = "⃛", FR = "⨹", UR = "⧍", HR = "⨻", MR = "⏢", $R = "𝒯", PR = "𝓉", GR = "Ц", VR = "ц", jR = "Ћ", zR = "ћ", QR = "Ŧ", WR = "ŧ", YR = "≬", XR = "↞", JR = "↠", ZR = "Ú", KR = "ú", t2 = "↑", e2 = "↟", n2 = "⇑", r2 = "⥉", s2 = "Ў", o2 = "ў", i2 = "Ŭ", a2 = "ŭ", c2 = "Û", l2 = "û", u2 = "У", h2 = "у", p2 = "⇅", f2 = "Ű", d2 = "ű", g2 = "⥮", m2 = "⥾", v2 = "𝔘", b2 = "𝔲", y2 = "Ù", _2 = "ù", w2 = "⥣", E2 = "↿", x2 = "↾", S2 = "▀", A2 = "⌜", T2 = "⌜", B2 = "⌏", L2 = "◸", N2 = "Ū", k2 = "ū", q2 = "¨", D2 = "_", I2 = "⏟", C2 = "⎵", R2 = "⏝", O2 = "⋃", F2 = "⊎", U2 = "Ų", H2 = "ų", M2 = "𝕌", $2 = "𝕦", P2 = "⤒", G2 = "↑", V2 = "↑", j2 = "⇑", z2 = "⇅", Q2 = "↕", W2 = "↕", Y2 = "⇕", X2 = "⥮", J2 = "↿", Z2 = "↾", K2 = "⊎", tO = "↖", eO = "↗", nO = "υ", rO = "ϒ", sO = "ϒ", oO = "Υ", iO = "υ", aO = "↥", cO = "⊥", lO = "⇈", uO = "⌝", hO = "⌝", pO = "⌎", fO = "Ů", dO = "ů", gO = "◹", mO = "𝒰", vO = "𝓊", bO = "⋰", yO = "Ũ", _O = "ũ", wO = "▵", EO = "▴", xO = "⇈", SO = "Ü", AO = "ü", TO = "⦧", BO = "⦜", LO = "ϵ", NO = "ϰ", kO = "∅", qO = "ϕ", DO = "ϖ", IO = "∝", CO = "↕", RO = "⇕", OO = "ϱ", FO = "ς", UO = "⊊︀", HO = "⫋︀", MO = "⊋︀", $O = "⫌︀", PO = "ϑ", GO = "⊲", VO = "⊳", jO = "⫨", zO = "⫫", QO = "⫩", WO = "В", YO = "в", XO = "⊢", JO = "⊨", ZO = "⊩", KO = "⊫", tF = "⫦", eF = "⊻", nF = "∨", rF = "⋁", sF = "≚", oF = "⋮", iF = "|", aF = "‖", cF = "|", lF = "‖", uF = "∣", hF = "|", pF = "❘", fF = "≀", dF = " ", gF = "𝔙", mF = "𝔳", vF = "⊲", bF = "⊂⃒", yF = "⊃⃒", _F = "𝕍", wF = "𝕧", EF = "∝", xF = "⊳", SF = "𝒱", AF = "𝓋", TF = "⫋︀", BF = "⊊︀", LF = "⫌︀", NF = "⊋︀", kF = "⊪", qF = "⦚", DF = "Ŵ", IF = "ŵ", CF = "⩟", RF = "∧", OF = "⋀", FF = "≙", UF = "℘", HF = "𝔚", MF = "𝔴", $F = "𝕎", PF = "𝕨", GF = "℘", VF = "≀", jF = "≀", zF = "𝒲", QF = "𝓌", WF = "⋂", YF = "◯", XF = "⋃", JF = "▽", ZF = "𝔛", KF = "𝔵", tU = "⟷", eU = "⟺", nU = "Ξ", rU = "ξ", sU = "⟵", oU = "⟸", iU = "⟼", aU = "⋻", cU = "⨀", lU = "𝕏", uU = "𝕩", hU = "⨁", pU = "⨂", fU = "⟶", dU = "⟹", gU = "𝒳", mU = "𝓍", vU = "⨆", bU = "⨄", yU = "△", _U = "⋁", wU = "⋀", EU = "Ý", xU = "ý", SU = "Я", AU = "я", TU = "Ŷ", BU = "ŷ", LU = "Ы", NU = "ы", kU = "¥", qU = "𝔜", DU = "𝔶", IU = "Ї", CU = "ї", RU = "𝕐", OU = "𝕪", FU = "𝒴", UU = "𝓎", HU = "Ю", MU = "ю", $U = "ÿ", PU = "Ÿ", GU = "Ź", VU = "ź", jU = "Ž", zU = "ž", QU = "З", WU = "з", YU = "Ż", XU = "ż", JU = "ℨ", ZU = "​", KU = "Ζ", t8 = "ζ", e8 = "𝔷", n8 = "ℨ", r8 = "Ж", s8 = "ж", o8 = "⇝", i8 = "𝕫", a8 = "ℤ", c8 = "𝒵", l8 = "𝓏", u8 = "‍", h8 = "‌", me = {
  Aacute: Qn,
  aacute: Wn,
  Abreve: Yn,
  abreve: Xn,
  ac: Jn,
  acd: Zn,
  acE: Kn,
  Acirc: tr,
  acirc: er,
  acute: nr,
  Acy: rr,
  acy: sr,
  AElig: or,
  aelig: ir,
  af: ar,
  Afr: cr,
  afr: lr,
  Agrave: ur,
  agrave: hr,
  alefsym: pr,
  aleph: fr,
  Alpha: dr,
  alpha: gr,
  Amacr: mr,
  amacr: vr,
  amalg: br,
  amp: yr,
  AMP: _r,
  andand: wr,
  And: Er,
  and: xr,
  andd: Sr,
  andslope: Ar,
  andv: Tr,
  ang: Br,
  ange: Lr,
  angle: Nr,
  angmsdaa: kr,
  angmsdab: qr,
  angmsdac: Dr,
  angmsdad: Ir,
  angmsdae: Cr,
  angmsdaf: Rr,
  angmsdag: Or,
  angmsdah: Fr,
  angmsd: Ur,
  angrt: Hr,
  angrtvb: Mr,
  angrtvbd: $r,
  angsph: Pr,
  angst: Gr,
  angzarr: Vr,
  Aogon: jr,
  aogon: zr,
  Aopf: Qr,
  aopf: Wr,
  apacir: Yr,
  ap: Xr,
  apE: Jr,
  ape: Zr,
  apid: Kr,
  apos: ts,
  ApplyFunction: es,
  approx: ns,
  approxeq: rs,
  Aring: ss,
  aring: os,
  Ascr: is,
  ascr: as,
  Assign: cs,
  ast: ls,
  asymp: us,
  asympeq: hs,
  Atilde: ps,
  atilde: fs,
  Auml: ds,
  auml: gs,
  awconint: ms,
  awint: vs,
  backcong: bs,
  backepsilon: ys,
  backprime: _s,
  backsim: ws,
  backsimeq: Es,
  Backslash: xs,
  Barv: Ss,
  barvee: As,
  barwed: Ts,
  Barwed: Bs,
  barwedge: Ls,
  bbrk: Ns,
  bbrktbrk: ks,
  bcong: qs,
  Bcy: Ds,
  bcy: Is,
  bdquo: Cs,
  becaus: Rs,
  because: Os,
  Because: Fs,
  bemptyv: Us,
  bepsi: Hs,
  bernou: Ms,
  Bernoullis: $s,
  Beta: Ps,
  beta: Gs,
  beth: Vs,
  between: js,
  Bfr: zs,
  bfr: Qs,
  bigcap: Ws,
  bigcirc: Ys,
  bigcup: Xs,
  bigodot: Js,
  bigoplus: Zs,
  bigotimes: Ks,
  bigsqcup: to,
  bigstar: eo,
  bigtriangledown: no,
  bigtriangleup: ro,
  biguplus: so,
  bigvee: oo,
  bigwedge: io,
  bkarow: ao,
  blacklozenge: co,
  blacksquare: lo,
  blacktriangle: uo,
  blacktriangledown: ho,
  blacktriangleleft: po,
  blacktriangleright: fo,
  blank: go,
  blk12: mo,
  blk14: vo,
  blk34: bo,
  block: yo,
  bne: _o,
  bnequiv: wo,
  bNot: Eo,
  bnot: xo,
  Bopf: So,
  bopf: Ao,
  bot: To,
  bottom: Bo,
  bowtie: Lo,
  boxbox: No,
  boxdl: ko,
  boxdL: qo,
  boxDl: Do,
  boxDL: Io,
  boxdr: Co,
  boxdR: Ro,
  boxDr: Oo,
  boxDR: Fo,
  boxh: Uo,
  boxH: Ho,
  boxhd: Mo,
  boxHd: $o,
  boxhD: Po,
  boxHD: Go,
  boxhu: Vo,
  boxHu: jo,
  boxhU: zo,
  boxHU: Qo,
  boxminus: Wo,
  boxplus: Yo,
  boxtimes: Xo,
  boxul: Jo,
  boxuL: Zo,
  boxUl: Ko,
  boxUL: ti,
  boxur: ei,
  boxuR: ni,
  boxUr: ri,
  boxUR: si,
  boxv: oi,
  boxV: ii,
  boxvh: ai,
  boxvH: ci,
  boxVh: li,
  boxVH: ui,
  boxvl: hi,
  boxvL: pi,
  boxVl: fi,
  boxVL: di,
  boxvr: gi,
  boxvR: mi,
  boxVr: vi,
  boxVR: bi,
  bprime: yi,
  breve: _i,
  Breve: wi,
  brvbar: Ei,
  bscr: xi,
  Bscr: Si,
  bsemi: Ai,
  bsim: Ti,
  bsime: Bi,
  bsolb: Li,
  bsol: Ni,
  bsolhsub: ki,
  bull: qi,
  bullet: Di,
  bump: Ii,
  bumpE: Ci,
  bumpe: Ri,
  Bumpeq: Oi,
  bumpeq: Fi,
  Cacute: Ui,
  cacute: Hi,
  capand: Mi,
  capbrcup: $i,
  capcap: Pi,
  cap: Gi,
  Cap: Vi,
  capcup: ji,
  capdot: zi,
  CapitalDifferentialD: Qi,
  caps: Wi,
  caret: Yi,
  caron: Xi,
  Cayleys: Ji,
  ccaps: Zi,
  Ccaron: Ki,
  ccaron: ta,
  Ccedil: ea,
  ccedil: na,
  Ccirc: ra,
  ccirc: sa,
  Cconint: oa,
  ccups: ia,
  ccupssm: aa,
  Cdot: ca,
  cdot: la,
  cedil: ua,
  Cedilla: ha,
  cemptyv: pa,
  cent: fa,
  centerdot: da,
  CenterDot: ga,
  cfr: ma,
  Cfr: va,
  CHcy: ba,
  chcy: ya,
  check: _a,
  checkmark: wa,
  Chi: Ea,
  chi: xa,
  circ: Sa,
  circeq: Aa,
  circlearrowleft: Ta,
  circlearrowright: Ba,
  circledast: La,
  circledcirc: Na,
  circleddash: ka,
  CircleDot: qa,
  circledR: Da,
  circledS: Ia,
  CircleMinus: Ca,
  CirclePlus: Ra,
  CircleTimes: Oa,
  cir: Fa,
  cirE: Ua,
  cire: Ha,
  cirfnint: Ma,
  cirmid: $a,
  cirscir: Pa,
  ClockwiseContourIntegral: Ga,
  CloseCurlyDoubleQuote: Va,
  CloseCurlyQuote: ja,
  clubs: za,
  clubsuit: Qa,
  colon: Wa,
  Colon: Ya,
  Colone: Xa,
  colone: Ja,
  coloneq: Za,
  comma: Ka,
  commat: tc,
  comp: ec,
  compfn: nc,
  complement: rc,
  complexes: sc,
  cong: oc,
  congdot: ic,
  Congruent: ac,
  conint: cc,
  Conint: lc,
  ContourIntegral: uc,
  copf: hc,
  Copf: pc,
  coprod: fc,
  Coproduct: dc,
  copy: gc,
  COPY: mc,
  copysr: vc,
  CounterClockwiseContourIntegral: bc,
  crarr: yc,
  cross: _c,
  Cross: wc,
  Cscr: Ec,
  cscr: xc,
  csub: Sc,
  csube: Ac,
  csup: Tc,
  csupe: Bc,
  ctdot: Lc,
  cudarrl: Nc,
  cudarrr: kc,
  cuepr: qc,
  cuesc: Dc,
  cularr: Ic,
  cularrp: Cc,
  cupbrcap: Rc,
  cupcap: Oc,
  CupCap: Fc,
  cup: Uc,
  Cup: Hc,
  cupcup: Mc,
  cupdot: $c,
  cupor: Pc,
  cups: Gc,
  curarr: Vc,
  curarrm: jc,
  curlyeqprec: zc,
  curlyeqsucc: Qc,
  curlyvee: Wc,
  curlywedge: Yc,
  curren: Xc,
  curvearrowleft: Jc,
  curvearrowright: Zc,
  cuvee: Kc,
  cuwed: tl,
  cwconint: el,
  cwint: nl,
  cylcty: rl,
  dagger: sl,
  Dagger: ol,
  daleth: il,
  darr: al,
  Darr: cl,
  dArr: ll,
  dash: ul,
  Dashv: hl,
  dashv: pl,
  dbkarow: fl,
  dblac: dl,
  Dcaron: gl,
  dcaron: ml,
  Dcy: vl,
  dcy: bl,
  ddagger: yl,
  ddarr: _l,
  DD: wl,
  dd: El,
  DDotrahd: xl,
  ddotseq: Sl,
  deg: Al,
  Del: Tl,
  Delta: Bl,
  delta: Ll,
  demptyv: Nl,
  dfisht: kl,
  Dfr: ql,
  dfr: Dl,
  dHar: Il,
  dharl: Cl,
  dharr: Rl,
  DiacriticalAcute: Ol,
  DiacriticalDot: Fl,
  DiacriticalDoubleAcute: Ul,
  DiacriticalGrave: Hl,
  DiacriticalTilde: Ml,
  diam: $l,
  diamond: Pl,
  Diamond: Gl,
  diamondsuit: Vl,
  diams: jl,
  die: zl,
  DifferentialD: Ql,
  digamma: Wl,
  disin: Yl,
  div: Xl,
  divide: Jl,
  divideontimes: Zl,
  divonx: Kl,
  DJcy: tu,
  djcy: eu,
  dlcorn: nu,
  dlcrop: ru,
  dollar: su,
  Dopf: ou,
  dopf: iu,
  Dot: au,
  dot: cu,
  DotDot: lu,
  doteq: uu,
  doteqdot: hu,
  DotEqual: pu,
  dotminus: fu,
  dotplus: du,
  dotsquare: gu,
  doublebarwedge: mu,
  DoubleContourIntegral: vu,
  DoubleDot: bu,
  DoubleDownArrow: yu,
  DoubleLeftArrow: _u,
  DoubleLeftRightArrow: wu,
  DoubleLeftTee: Eu,
  DoubleLongLeftArrow: xu,
  DoubleLongLeftRightArrow: Su,
  DoubleLongRightArrow: Au,
  DoubleRightArrow: Tu,
  DoubleRightTee: Bu,
  DoubleUpArrow: Lu,
  DoubleUpDownArrow: Nu,
  DoubleVerticalBar: ku,
  DownArrowBar: qu,
  downarrow: Du,
  DownArrow: Iu,
  Downarrow: Cu,
  DownArrowUpArrow: Ru,
  DownBreve: Ou,
  downdownarrows: Fu,
  downharpoonleft: Uu,
  downharpoonright: Hu,
  DownLeftRightVector: Mu,
  DownLeftTeeVector: $u,
  DownLeftVectorBar: Pu,
  DownLeftVector: Gu,
  DownRightTeeVector: Vu,
  DownRightVectorBar: ju,
  DownRightVector: zu,
  DownTeeArrow: Qu,
  DownTee: Wu,
  drbkarow: Yu,
  drcorn: Xu,
  drcrop: Ju,
  Dscr: Zu,
  dscr: Ku,
  DScy: th,
  dscy: eh,
  dsol: nh,
  Dstrok: rh,
  dstrok: sh,
  dtdot: oh,
  dtri: ih,
  dtrif: ah,
  duarr: ch,
  duhar: lh,
  dwangle: uh,
  DZcy: hh,
  dzcy: ph,
  dzigrarr: fh,
  Eacute: dh,
  eacute: gh,
  easter: mh,
  Ecaron: vh,
  ecaron: bh,
  Ecirc: yh,
  ecirc: _h,
  ecir: wh,
  ecolon: Eh,
  Ecy: xh,
  ecy: Sh,
  eDDot: Ah,
  Edot: Th,
  edot: Bh,
  eDot: Lh,
  ee: Nh,
  efDot: kh,
  Efr: qh,
  efr: Dh,
  eg: Ih,
  Egrave: Ch,
  egrave: Rh,
  egs: Oh,
  egsdot: Fh,
  el: Uh,
  Element: Hh,
  elinters: Mh,
  ell: $h,
  els: Ph,
  elsdot: Gh,
  Emacr: Vh,
  emacr: jh,
  empty: zh,
  emptyset: Qh,
  EmptySmallSquare: Wh,
  emptyv: Yh,
  EmptyVerySmallSquare: Xh,
  emsp13: Jh,
  emsp14: Zh,
  emsp: Kh,
  ENG: tp,
  eng: ep,
  ensp: np,
  Eogon: rp,
  eogon: sp,
  Eopf: op,
  eopf: ip,
  epar: ap,
  eparsl: cp,
  eplus: lp,
  epsi: up,
  Epsilon: hp,
  epsilon: pp,
  epsiv: fp,
  eqcirc: dp,
  eqcolon: gp,
  eqsim: mp,
  eqslantgtr: vp,
  eqslantless: bp,
  Equal: yp,
  equals: _p,
  EqualTilde: wp,
  equest: Ep,
  Equilibrium: xp,
  equiv: Sp,
  equivDD: Ap,
  eqvparsl: Tp,
  erarr: Bp,
  erDot: Lp,
  escr: Np,
  Escr: kp,
  esdot: qp,
  Esim: Dp,
  esim: Ip,
  Eta: Cp,
  eta: Rp,
  ETH: Op,
  eth: Fp,
  Euml: Up,
  euml: Hp,
  euro: Mp,
  excl: $p,
  exist: Pp,
  Exists: Gp,
  expectation: Vp,
  exponentiale: jp,
  ExponentialE: zp,
  fallingdotseq: Qp,
  Fcy: Wp,
  fcy: Yp,
  female: Xp,
  ffilig: Jp,
  fflig: Zp,
  ffllig: Kp,
  Ffr: tf,
  ffr: ef,
  filig: nf,
  FilledSmallSquare: rf,
  FilledVerySmallSquare: sf,
  fjlig: of,
  flat: af,
  fllig: cf,
  fltns: lf,
  fnof: uf,
  Fopf: hf,
  fopf: pf,
  forall: ff,
  ForAll: df,
  fork: gf,
  forkv: mf,
  Fouriertrf: vf,
  fpartint: bf,
  frac12: yf,
  frac13: _f,
  frac14: wf,
  frac15: Ef,
  frac16: xf,
  frac18: Sf,
  frac23: Af,
  frac25: Tf,
  frac34: Bf,
  frac35: Lf,
  frac38: Nf,
  frac45: kf,
  frac56: qf,
  frac58: Df,
  frac78: If,
  frasl: Cf,
  frown: Rf,
  fscr: Of,
  Fscr: Ff,
  gacute: Uf,
  Gamma: Hf,
  gamma: Mf,
  Gammad: $f,
  gammad: Pf,
  gap: Gf,
  Gbreve: Vf,
  gbreve: jf,
  Gcedil: zf,
  Gcirc: Qf,
  gcirc: Wf,
  Gcy: Yf,
  gcy: Xf,
  Gdot: Jf,
  gdot: Zf,
  ge: Kf,
  gE: td,
  gEl: ed,
  gel: nd,
  geq: rd,
  geqq: sd,
  geqslant: od,
  gescc: id,
  ges: ad,
  gesdot: cd,
  gesdoto: ld,
  gesdotol: ud,
  gesl: hd,
  gesles: pd,
  Gfr: fd,
  gfr: dd,
  gg: gd,
  Gg: md,
  ggg: vd,
  gimel: bd,
  GJcy: yd,
  gjcy: _d,
  gla: wd,
  gl: Ed,
  glE: xd,
  glj: Sd,
  gnap: Ad,
  gnapprox: Td,
  gne: Bd,
  gnE: Ld,
  gneq: Nd,
  gneqq: kd,
  gnsim: qd,
  Gopf: Dd,
  gopf: Id,
  grave: Cd,
  GreaterEqual: Rd,
  GreaterEqualLess: Od,
  GreaterFullEqual: Fd,
  GreaterGreater: Ud,
  GreaterLess: Hd,
  GreaterSlantEqual: Md,
  GreaterTilde: $d,
  Gscr: Pd,
  gscr: Gd,
  gsim: Vd,
  gsime: jd,
  gsiml: zd,
  gtcc: Qd,
  gtcir: Wd,
  gt: Yd,
  GT: Xd,
  Gt: Jd,
  gtdot: Zd,
  gtlPar: Kd,
  gtquest: tg,
  gtrapprox: eg,
  gtrarr: ng,
  gtrdot: rg,
  gtreqless: sg,
  gtreqqless: og,
  gtrless: ig,
  gtrsim: ag,
  gvertneqq: cg,
  gvnE: lg,
  Hacek: ug,
  hairsp: hg,
  half: pg,
  hamilt: fg,
  HARDcy: dg,
  hardcy: gg,
  harrcir: mg,
  harr: vg,
  hArr: bg,
  harrw: yg,
  Hat: _g,
  hbar: wg,
  Hcirc: Eg,
  hcirc: xg,
  hearts: Sg,
  heartsuit: Ag,
  hellip: Tg,
  hercon: Bg,
  hfr: Lg,
  Hfr: Ng,
  HilbertSpace: kg,
  hksearow: qg,
  hkswarow: Dg,
  hoarr: Ig,
  homtht: Cg,
  hookleftarrow: Rg,
  hookrightarrow: Og,
  hopf: Fg,
  Hopf: Ug,
  horbar: Hg,
  HorizontalLine: Mg,
  hscr: $g,
  Hscr: Pg,
  hslash: Gg,
  Hstrok: Vg,
  hstrok: jg,
  HumpDownHump: zg,
  HumpEqual: Qg,
  hybull: Wg,
  hyphen: Yg,
  Iacute: Xg,
  iacute: Jg,
  ic: Zg,
  Icirc: Kg,
  icirc: tm,
  Icy: em,
  icy: nm,
  Idot: rm,
  IEcy: sm,
  iecy: om,
  iexcl: im,
  iff: am,
  ifr: cm,
  Ifr: lm,
  Igrave: um,
  igrave: hm,
  ii: pm,
  iiiint: fm,
  iiint: dm,
  iinfin: gm,
  iiota: mm,
  IJlig: vm,
  ijlig: bm,
  Imacr: ym,
  imacr: _m,
  image: wm,
  ImaginaryI: Em,
  imagline: xm,
  imagpart: Sm,
  imath: Am,
  Im: Tm,
  imof: Bm,
  imped: Lm,
  Implies: Nm,
  incare: km,
  in: "∈",
  infin: qm,
  infintie: Dm,
  inodot: Im,
  intcal: Cm,
  int: Rm,
  Int: Om,
  integers: Fm,
  Integral: Um,
  intercal: Hm,
  Intersection: Mm,
  intlarhk: $m,
  intprod: Pm,
  InvisibleComma: Gm,
  InvisibleTimes: Vm,
  IOcy: jm,
  iocy: zm,
  Iogon: Qm,
  iogon: Wm,
  Iopf: Ym,
  iopf: Xm,
  Iota: Jm,
  iota: Zm,
  iprod: Km,
  iquest: tv,
  iscr: ev,
  Iscr: nv,
  isin: rv,
  isindot: sv,
  isinE: ov,
  isins: iv,
  isinsv: av,
  isinv: cv,
  it: lv,
  Itilde: uv,
  itilde: hv,
  Iukcy: pv,
  iukcy: fv,
  Iuml: dv,
  iuml: gv,
  Jcirc: mv,
  jcirc: vv,
  Jcy: bv,
  jcy: yv,
  Jfr: _v,
  jfr: wv,
  jmath: Ev,
  Jopf: xv,
  jopf: Sv,
  Jscr: Av,
  jscr: Tv,
  Jsercy: Bv,
  jsercy: Lv,
  Jukcy: Nv,
  jukcy: kv,
  Kappa: qv,
  kappa: Dv,
  kappav: Iv,
  Kcedil: Cv,
  kcedil: Rv,
  Kcy: Ov,
  kcy: Fv,
  Kfr: Uv,
  kfr: Hv,
  kgreen: Mv,
  KHcy: $v,
  khcy: Pv,
  KJcy: Gv,
  kjcy: Vv,
  Kopf: jv,
  kopf: zv,
  Kscr: Qv,
  kscr: Wv,
  lAarr: Yv,
  Lacute: Xv,
  lacute: Jv,
  laemptyv: Zv,
  lagran: Kv,
  Lambda: tb,
  lambda: eb,
  lang: nb,
  Lang: rb,
  langd: sb,
  langle: ob,
  lap: ib,
  Laplacetrf: ab,
  laquo: cb,
  larrb: lb,
  larrbfs: ub,
  larr: hb,
  Larr: pb,
  lArr: fb,
  larrfs: db,
  larrhk: gb,
  larrlp: mb,
  larrpl: vb,
  larrsim: bb,
  larrtl: yb,
  latail: _b,
  lAtail: wb,
  lat: Eb,
  late: xb,
  lates: Sb,
  lbarr: Ab,
  lBarr: Tb,
  lbbrk: Bb,
  lbrace: Lb,
  lbrack: Nb,
  lbrke: kb,
  lbrksld: qb,
  lbrkslu: Db,
  Lcaron: Ib,
  lcaron: Cb,
  Lcedil: Rb,
  lcedil: Ob,
  lceil: Fb,
  lcub: Ub,
  Lcy: Hb,
  lcy: Mb,
  ldca: $b,
  ldquo: Pb,
  ldquor: Gb,
  ldrdhar: Vb,
  ldrushar: jb,
  ldsh: zb,
  le: Qb,
  lE: Wb,
  LeftAngleBracket: Yb,
  LeftArrowBar: Xb,
  leftarrow: Jb,
  LeftArrow: Zb,
  Leftarrow: Kb,
  LeftArrowRightArrow: ty,
  leftarrowtail: ey,
  LeftCeiling: ny,
  LeftDoubleBracket: ry,
  LeftDownTeeVector: sy,
  LeftDownVectorBar: oy,
  LeftDownVector: iy,
  LeftFloor: ay,
  leftharpoondown: cy,
  leftharpoonup: ly,
  leftleftarrows: uy,
  leftrightarrow: hy,
  LeftRightArrow: py,
  Leftrightarrow: fy,
  leftrightarrows: dy,
  leftrightharpoons: gy,
  leftrightsquigarrow: my,
  LeftRightVector: vy,
  LeftTeeArrow: by,
  LeftTee: yy,
  LeftTeeVector: _y,
  leftthreetimes: wy,
  LeftTriangleBar: Ey,
  LeftTriangle: xy,
  LeftTriangleEqual: Sy,
  LeftUpDownVector: Ay,
  LeftUpTeeVector: Ty,
  LeftUpVectorBar: By,
  LeftUpVector: Ly,
  LeftVectorBar: Ny,
  LeftVector: ky,
  lEg: qy,
  leg: Dy,
  leq: Iy,
  leqq: Cy,
  leqslant: Ry,
  lescc: Oy,
  les: Fy,
  lesdot: Uy,
  lesdoto: Hy,
  lesdotor: My,
  lesg: $y,
  lesges: Py,
  lessapprox: Gy,
  lessdot: Vy,
  lesseqgtr: jy,
  lesseqqgtr: zy,
  LessEqualGreater: Qy,
  LessFullEqual: Wy,
  LessGreater: Yy,
  lessgtr: Xy,
  LessLess: Jy,
  lesssim: Zy,
  LessSlantEqual: Ky,
  LessTilde: t_,
  lfisht: e_,
  lfloor: n_,
  Lfr: r_,
  lfr: s_,
  lg: o_,
  lgE: i_,
  lHar: a_,
  lhard: c_,
  lharu: l_,
  lharul: u_,
  lhblk: h_,
  LJcy: p_,
  ljcy: f_,
  llarr: d_,
  ll: g_,
  Ll: m_,
  llcorner: v_,
  Lleftarrow: b_,
  llhard: y_,
  lltri: __,
  Lmidot: w_,
  lmidot: E_,
  lmoustache: x_,
  lmoust: S_,
  lnap: A_,
  lnapprox: T_,
  lne: B_,
  lnE: L_,
  lneq: N_,
  lneqq: k_,
  lnsim: q_,
  loang: D_,
  loarr: I_,
  lobrk: C_,
  longleftarrow: R_,
  LongLeftArrow: O_,
  Longleftarrow: F_,
  longleftrightarrow: U_,
  LongLeftRightArrow: H_,
  Longleftrightarrow: M_,
  longmapsto: $_,
  longrightarrow: P_,
  LongRightArrow: G_,
  Longrightarrow: V_,
  looparrowleft: j_,
  looparrowright: z_,
  lopar: Q_,
  Lopf: W_,
  lopf: Y_,
  loplus: X_,
  lotimes: J_,
  lowast: Z_,
  lowbar: K_,
  LowerLeftArrow: tw,
  LowerRightArrow: ew,
  loz: nw,
  lozenge: rw,
  lozf: sw,
  lpar: ow,
  lparlt: iw,
  lrarr: aw,
  lrcorner: cw,
  lrhar: lw,
  lrhard: uw,
  lrm: hw,
  lrtri: pw,
  lsaquo: fw,
  lscr: dw,
  Lscr: gw,
  lsh: mw,
  Lsh: vw,
  lsim: bw,
  lsime: yw,
  lsimg: _w,
  lsqb: ww,
  lsquo: Ew,
  lsquor: xw,
  Lstrok: Sw,
  lstrok: Aw,
  ltcc: Tw,
  ltcir: Bw,
  lt: Lw,
  LT: Nw,
  Lt: kw,
  ltdot: qw,
  lthree: Dw,
  ltimes: Iw,
  ltlarr: Cw,
  ltquest: Rw,
  ltri: Ow,
  ltrie: Fw,
  ltrif: Uw,
  ltrPar: Hw,
  lurdshar: Mw,
  luruhar: $w,
  lvertneqq: Pw,
  lvnE: Gw,
  macr: Vw,
  male: jw,
  malt: zw,
  maltese: Qw,
  Map: "⤅",
  map: Ww,
  mapsto: Yw,
  mapstodown: Xw,
  mapstoleft: Jw,
  mapstoup: Zw,
  marker: Kw,
  mcomma: tE,
  Mcy: eE,
  mcy: nE,
  mdash: rE,
  mDDot: sE,
  measuredangle: oE,
  MediumSpace: iE,
  Mellintrf: aE,
  Mfr: cE,
  mfr: lE,
  mho: uE,
  micro: hE,
  midast: pE,
  midcir: fE,
  mid: dE,
  middot: gE,
  minusb: mE,
  minus: vE,
  minusd: bE,
  minusdu: yE,
  MinusPlus: _E,
  mlcp: wE,
  mldr: EE,
  mnplus: xE,
  models: SE,
  Mopf: AE,
  mopf: TE,
  mp: BE,
  mscr: LE,
  Mscr: NE,
  mstpos: kE,
  Mu: qE,
  mu: DE,
  multimap: IE,
  mumap: CE,
  nabla: RE,
  Nacute: OE,
  nacute: FE,
  nang: UE,
  nap: HE,
  napE: ME,
  napid: $E,
  napos: PE,
  napprox: GE,
  natural: VE,
  naturals: jE,
  natur: zE,
  nbsp: QE,
  nbump: WE,
  nbumpe: YE,
  ncap: XE,
  Ncaron: JE,
  ncaron: ZE,
  Ncedil: KE,
  ncedil: tx,
  ncong: ex,
  ncongdot: nx,
  ncup: rx,
  Ncy: sx,
  ncy: ox,
  ndash: ix,
  nearhk: ax,
  nearr: cx,
  neArr: lx,
  nearrow: ux,
  ne: hx,
  nedot: px,
  NegativeMediumSpace: fx,
  NegativeThickSpace: dx,
  NegativeThinSpace: gx,
  NegativeVeryThinSpace: mx,
  nequiv: vx,
  nesear: bx,
  nesim: yx,
  NestedGreaterGreater: _x,
  NestedLessLess: wx,
  NewLine: Ex,
  nexist: xx,
  nexists: Sx,
  Nfr: Ax,
  nfr: Tx,
  ngE: Bx,
  nge: Lx,
  ngeq: Nx,
  ngeqq: kx,
  ngeqslant: qx,
  nges: Dx,
  nGg: Ix,
  ngsim: Cx,
  nGt: Rx,
  ngt: Ox,
  ngtr: Fx,
  nGtv: Ux,
  nharr: Hx,
  nhArr: Mx,
  nhpar: $x,
  ni: Px,
  nis: Gx,
  nisd: Vx,
  niv: jx,
  NJcy: zx,
  njcy: Qx,
  nlarr: Wx,
  nlArr: Yx,
  nldr: Xx,
  nlE: Jx,
  nle: Zx,
  nleftarrow: Kx,
  nLeftarrow: t0,
  nleftrightarrow: e0,
  nLeftrightarrow: n0,
  nleq: r0,
  nleqq: s0,
  nleqslant: o0,
  nles: i0,
  nless: a0,
  nLl: c0,
  nlsim: l0,
  nLt: u0,
  nlt: h0,
  nltri: p0,
  nltrie: f0,
  nLtv: d0,
  nmid: g0,
  NoBreak: m0,
  NonBreakingSpace: v0,
  nopf: b0,
  Nopf: y0,
  Not: _0,
  not: w0,
  NotCongruent: E0,
  NotCupCap: x0,
  NotDoubleVerticalBar: S0,
  NotElement: A0,
  NotEqual: T0,
  NotEqualTilde: B0,
  NotExists: L0,
  NotGreater: N0,
  NotGreaterEqual: k0,
  NotGreaterFullEqual: q0,
  NotGreaterGreater: D0,
  NotGreaterLess: I0,
  NotGreaterSlantEqual: C0,
  NotGreaterTilde: R0,
  NotHumpDownHump: O0,
  NotHumpEqual: F0,
  notin: U0,
  notindot: H0,
  notinE: M0,
  notinva: $0,
  notinvb: P0,
  notinvc: G0,
  NotLeftTriangleBar: V0,
  NotLeftTriangle: j0,
  NotLeftTriangleEqual: z0,
  NotLess: Q0,
  NotLessEqual: W0,
  NotLessGreater: Y0,
  NotLessLess: X0,
  NotLessSlantEqual: J0,
  NotLessTilde: Z0,
  NotNestedGreaterGreater: K0,
  NotNestedLessLess: t1,
  notni: e1,
  notniva: n1,
  notnivb: r1,
  notnivc: s1,
  NotPrecedes: o1,
  NotPrecedesEqual: i1,
  NotPrecedesSlantEqual: a1,
  NotReverseElement: c1,
  NotRightTriangleBar: l1,
  NotRightTriangle: u1,
  NotRightTriangleEqual: h1,
  NotSquareSubset: p1,
  NotSquareSubsetEqual: f1,
  NotSquareSuperset: d1,
  NotSquareSupersetEqual: g1,
  NotSubset: m1,
  NotSubsetEqual: v1,
  NotSucceeds: b1,
  NotSucceedsEqual: y1,
  NotSucceedsSlantEqual: _1,
  NotSucceedsTilde: w1,
  NotSuperset: E1,
  NotSupersetEqual: x1,
  NotTilde: S1,
  NotTildeEqual: A1,
  NotTildeFullEqual: T1,
  NotTildeTilde: B1,
  NotVerticalBar: L1,
  nparallel: N1,
  npar: k1,
  nparsl: q1,
  npart: D1,
  npolint: I1,
  npr: C1,
  nprcue: R1,
  nprec: O1,
  npreceq: F1,
  npre: U1,
  nrarrc: H1,
  nrarr: M1,
  nrArr: $1,
  nrarrw: P1,
  nrightarrow: G1,
  nRightarrow: V1,
  nrtri: j1,
  nrtrie: z1,
  nsc: Q1,
  nsccue: W1,
  nsce: Y1,
  Nscr: X1,
  nscr: J1,
  nshortmid: Z1,
  nshortparallel: K1,
  nsim: tS,
  nsime: eS,
  nsimeq: nS,
  nsmid: rS,
  nspar: sS,
  nsqsube: oS,
  nsqsupe: iS,
  nsub: aS,
  nsubE: cS,
  nsube: lS,
  nsubset: uS,
  nsubseteq: hS,
  nsubseteqq: pS,
  nsucc: fS,
  nsucceq: dS,
  nsup: gS,
  nsupE: mS,
  nsupe: vS,
  nsupset: bS,
  nsupseteq: yS,
  nsupseteqq: _S,
  ntgl: wS,
  Ntilde: ES,
  ntilde: xS,
  ntlg: SS,
  ntriangleleft: AS,
  ntrianglelefteq: TS,
  ntriangleright: BS,
  ntrianglerighteq: LS,
  Nu: NS,
  nu: kS,
  num: qS,
  numero: DS,
  numsp: IS,
  nvap: CS,
  nvdash: RS,
  nvDash: OS,
  nVdash: FS,
  nVDash: US,
  nvge: HS,
  nvgt: MS,
  nvHarr: $S,
  nvinfin: PS,
  nvlArr: GS,
  nvle: VS,
  nvlt: jS,
  nvltrie: zS,
  nvrArr: QS,
  nvrtrie: WS,
  nvsim: YS,
  nwarhk: XS,
  nwarr: JS,
  nwArr: ZS,
  nwarrow: KS,
  nwnear: tA,
  Oacute: eA,
  oacute: nA,
  oast: rA,
  Ocirc: sA,
  ocirc: oA,
  ocir: iA,
  Ocy: aA,
  ocy: cA,
  odash: lA,
  Odblac: uA,
  odblac: hA,
  odiv: pA,
  odot: fA,
  odsold: dA,
  OElig: gA,
  oelig: mA,
  ofcir: vA,
  Ofr: bA,
  ofr: yA,
  ogon: _A,
  Ograve: wA,
  ograve: EA,
  ogt: xA,
  ohbar: SA,
  ohm: AA,
  oint: TA,
  olarr: BA,
  olcir: LA,
  olcross: NA,
  oline: kA,
  olt: qA,
  Omacr: DA,
  omacr: IA,
  Omega: CA,
  omega: RA,
  Omicron: OA,
  omicron: FA,
  omid: UA,
  ominus: HA,
  Oopf: MA,
  oopf: $A,
  opar: PA,
  OpenCurlyDoubleQuote: GA,
  OpenCurlyQuote: VA,
  operp: jA,
  oplus: zA,
  orarr: QA,
  Or: WA,
  or: YA,
  ord: XA,
  order: JA,
  orderof: ZA,
  ordf: KA,
  ordm: tT,
  origof: eT,
  oror: nT,
  orslope: rT,
  orv: sT,
  oS: oT,
  Oscr: iT,
  oscr: aT,
  Oslash: cT,
  oslash: lT,
  osol: uT,
  Otilde: hT,
  otilde: pT,
  otimesas: fT,
  Otimes: dT,
  otimes: gT,
  Ouml: mT,
  ouml: vT,
  ovbar: bT,
  OverBar: yT,
  OverBrace: _T,
  OverBracket: wT,
  OverParenthesis: ET,
  para: xT,
  parallel: ST,
  par: AT,
  parsim: TT,
  parsl: BT,
  part: LT,
  PartialD: NT,
  Pcy: kT,
  pcy: qT,
  percnt: DT,
  period: IT,
  permil: CT,
  perp: RT,
  pertenk: OT,
  Pfr: FT,
  pfr: UT,
  Phi: HT,
  phi: MT,
  phiv: $T,
  phmmat: PT,
  phone: GT,
  Pi: VT,
  pi: jT,
  pitchfork: zT,
  piv: QT,
  planck: WT,
  planckh: YT,
  plankv: XT,
  plusacir: JT,
  plusb: ZT,
  pluscir: KT,
  plus: tB,
  plusdo: eB,
  plusdu: nB,
  pluse: rB,
  PlusMinus: sB,
  plusmn: oB,
  plussim: iB,
  plustwo: aB,
  pm: cB,
  Poincareplane: lB,
  pointint: uB,
  popf: hB,
  Popf: pB,
  pound: fB,
  prap: dB,
  Pr: gB,
  pr: mB,
  prcue: vB,
  precapprox: bB,
  prec: yB,
  preccurlyeq: _B,
  Precedes: wB,
  PrecedesEqual: EB,
  PrecedesSlantEqual: xB,
  PrecedesTilde: SB,
  preceq: AB,
  precnapprox: TB,
  precneqq: BB,
  precnsim: LB,
  pre: NB,
  prE: kB,
  precsim: qB,
  prime: DB,
  Prime: IB,
  primes: CB,
  prnap: RB,
  prnE: OB,
  prnsim: FB,
  prod: UB,
  Product: HB,
  profalar: MB,
  profline: $B,
  profsurf: PB,
  prop: GB,
  Proportional: VB,
  Proportion: jB,
  propto: zB,
  prsim: QB,
  prurel: WB,
  Pscr: YB,
  pscr: XB,
  Psi: JB,
  psi: ZB,
  puncsp: KB,
  Qfr: tL,
  qfr: eL,
  qint: nL,
  qopf: rL,
  Qopf: sL,
  qprime: oL,
  Qscr: iL,
  qscr: aL,
  quaternions: cL,
  quatint: lL,
  quest: uL,
  questeq: hL,
  quot: pL,
  QUOT: fL,
  rAarr: dL,
  race: gL,
  Racute: mL,
  racute: vL,
  radic: bL,
  raemptyv: yL,
  rang: _L,
  Rang: wL,
  rangd: EL,
  range: xL,
  rangle: SL,
  raquo: AL,
  rarrap: TL,
  rarrb: BL,
  rarrbfs: LL,
  rarrc: NL,
  rarr: kL,
  Rarr: qL,
  rArr: DL,
  rarrfs: IL,
  rarrhk: CL,
  rarrlp: RL,
  rarrpl: OL,
  rarrsim: FL,
  Rarrtl: UL,
  rarrtl: HL,
  rarrw: ML,
  ratail: $L,
  rAtail: PL,
  ratio: GL,
  rationals: VL,
  rbarr: jL,
  rBarr: zL,
  RBarr: QL,
  rbbrk: WL,
  rbrace: YL,
  rbrack: XL,
  rbrke: JL,
  rbrksld: ZL,
  rbrkslu: KL,
  Rcaron: tN,
  rcaron: eN,
  Rcedil: nN,
  rcedil: rN,
  rceil: sN,
  rcub: oN,
  Rcy: iN,
  rcy: aN,
  rdca: cN,
  rdldhar: lN,
  rdquo: uN,
  rdquor: hN,
  rdsh: pN,
  real: fN,
  realine: dN,
  realpart: gN,
  reals: mN,
  Re: vN,
  rect: bN,
  reg: yN,
  REG: _N,
  ReverseElement: wN,
  ReverseEquilibrium: EN,
  ReverseUpEquilibrium: xN,
  rfisht: SN,
  rfloor: AN,
  rfr: TN,
  Rfr: BN,
  rHar: LN,
  rhard: NN,
  rharu: kN,
  rharul: qN,
  Rho: DN,
  rho: IN,
  rhov: CN,
  RightAngleBracket: RN,
  RightArrowBar: ON,
  rightarrow: FN,
  RightArrow: UN,
  Rightarrow: HN,
  RightArrowLeftArrow: MN,
  rightarrowtail: $N,
  RightCeiling: PN,
  RightDoubleBracket: GN,
  RightDownTeeVector: VN,
  RightDownVectorBar: jN,
  RightDownVector: zN,
  RightFloor: QN,
  rightharpoondown: WN,
  rightharpoonup: YN,
  rightleftarrows: XN,
  rightleftharpoons: JN,
  rightrightarrows: ZN,
  rightsquigarrow: KN,
  RightTeeArrow: tk,
  RightTee: ek,
  RightTeeVector: nk,
  rightthreetimes: rk,
  RightTriangleBar: sk,
  RightTriangle: ok,
  RightTriangleEqual: ik,
  RightUpDownVector: ak,
  RightUpTeeVector: ck,
  RightUpVectorBar: lk,
  RightUpVector: uk,
  RightVectorBar: hk,
  RightVector: pk,
  ring: fk,
  risingdotseq: dk,
  rlarr: gk,
  rlhar: mk,
  rlm: vk,
  rmoustache: bk,
  rmoust: yk,
  rnmid: _k,
  roang: wk,
  roarr: Ek,
  robrk: xk,
  ropar: Sk,
  ropf: Ak,
  Ropf: Tk,
  roplus: Bk,
  rotimes: Lk,
  RoundImplies: Nk,
  rpar: kk,
  rpargt: qk,
  rppolint: Dk,
  rrarr: Ik,
  Rrightarrow: Ck,
  rsaquo: Rk,
  rscr: Ok,
  Rscr: Fk,
  rsh: Uk,
  Rsh: Hk,
  rsqb: Mk,
  rsquo: $k,
  rsquor: Pk,
  rthree: Gk,
  rtimes: Vk,
  rtri: jk,
  rtrie: zk,
  rtrif: Qk,
  rtriltri: Wk,
  RuleDelayed: Yk,
  ruluhar: Xk,
  rx: Jk,
  Sacute: Zk,
  sacute: Kk,
  sbquo: tq,
  scap: eq,
  Scaron: nq,
  scaron: rq,
  Sc: sq,
  sc: oq,
  sccue: iq,
  sce: aq,
  scE: cq,
  Scedil: lq,
  scedil: uq,
  Scirc: hq,
  scirc: pq,
  scnap: fq,
  scnE: dq,
  scnsim: gq,
  scpolint: mq,
  scsim: vq,
  Scy: bq,
  scy: yq,
  sdotb: _q,
  sdot: wq,
  sdote: Eq,
  searhk: xq,
  searr: Sq,
  seArr: Aq,
  searrow: Tq,
  sect: Bq,
  semi: Lq,
  seswar: Nq,
  setminus: kq,
  setmn: qq,
  sext: Dq,
  Sfr: Iq,
  sfr: Cq,
  sfrown: Rq,
  sharp: Oq,
  SHCHcy: Fq,
  shchcy: Uq,
  SHcy: Hq,
  shcy: Mq,
  ShortDownArrow: $q,
  ShortLeftArrow: Pq,
  shortmid: Gq,
  shortparallel: Vq,
  ShortRightArrow: jq,
  ShortUpArrow: zq,
  shy: Qq,
  Sigma: Wq,
  sigma: Yq,
  sigmaf: Xq,
  sigmav: Jq,
  sim: Zq,
  simdot: Kq,
  sime: tD,
  simeq: eD,
  simg: nD,
  simgE: rD,
  siml: sD,
  simlE: oD,
  simne: iD,
  simplus: aD,
  simrarr: cD,
  slarr: lD,
  SmallCircle: uD,
  smallsetminus: hD,
  smashp: pD,
  smeparsl: fD,
  smid: dD,
  smile: gD,
  smt: mD,
  smte: vD,
  smtes: bD,
  SOFTcy: yD,
  softcy: _D,
  solbar: wD,
  solb: ED,
  sol: xD,
  Sopf: SD,
  sopf: AD,
  spades: TD,
  spadesuit: BD,
  spar: LD,
  sqcap: ND,
  sqcaps: kD,
  sqcup: qD,
  sqcups: DD,
  Sqrt: ID,
  sqsub: CD,
  sqsube: RD,
  sqsubset: OD,
  sqsubseteq: FD,
  sqsup: UD,
  sqsupe: HD,
  sqsupset: MD,
  sqsupseteq: $D,
  square: PD,
  Square: GD,
  SquareIntersection: VD,
  SquareSubset: jD,
  SquareSubsetEqual: zD,
  SquareSuperset: QD,
  SquareSupersetEqual: WD,
  SquareUnion: YD,
  squarf: XD,
  squ: JD,
  squf: ZD,
  srarr: KD,
  Sscr: tI,
  sscr: eI,
  ssetmn: nI,
  ssmile: rI,
  sstarf: sI,
  Star: oI,
  star: iI,
  starf: aI,
  straightepsilon: cI,
  straightphi: lI,
  strns: uI,
  sub: hI,
  Sub: pI,
  subdot: fI,
  subE: dI,
  sube: gI,
  subedot: mI,
  submult: vI,
  subnE: bI,
  subne: yI,
  subplus: _I,
  subrarr: wI,
  subset: EI,
  Subset: xI,
  subseteq: SI,
  subseteqq: AI,
  SubsetEqual: TI,
  subsetneq: BI,
  subsetneqq: LI,
  subsim: NI,
  subsub: kI,
  subsup: qI,
  succapprox: DI,
  succ: II,
  succcurlyeq: CI,
  Succeeds: RI,
  SucceedsEqual: OI,
  SucceedsSlantEqual: FI,
  SucceedsTilde: UI,
  succeq: HI,
  succnapprox: MI,
  succneqq: $I,
  succnsim: PI,
  succsim: GI,
  SuchThat: VI,
  sum: jI,
  Sum: zI,
  sung: QI,
  sup1: WI,
  sup2: YI,
  sup3: XI,
  sup: JI,
  Sup: ZI,
  supdot: KI,
  supdsub: tC,
  supE: eC,
  supe: nC,
  supedot: rC,
  Superset: sC,
  SupersetEqual: oC,
  suphsol: iC,
  suphsub: aC,
  suplarr: cC,
  supmult: lC,
  supnE: uC,
  supne: hC,
  supplus: pC,
  supset: fC,
  Supset: dC,
  supseteq: gC,
  supseteqq: mC,
  supsetneq: vC,
  supsetneqq: bC,
  supsim: yC,
  supsub: _C,
  supsup: wC,
  swarhk: EC,
  swarr: xC,
  swArr: SC,
  swarrow: AC,
  swnwar: TC,
  szlig: BC,
  Tab: LC,
  target: NC,
  Tau: kC,
  tau: qC,
  tbrk: DC,
  Tcaron: IC,
  tcaron: CC,
  Tcedil: RC,
  tcedil: OC,
  Tcy: FC,
  tcy: UC,
  tdot: HC,
  telrec: MC,
  Tfr: $C,
  tfr: PC,
  there4: GC,
  therefore: VC,
  Therefore: jC,
  Theta: zC,
  theta: QC,
  thetasym: WC,
  thetav: YC,
  thickapprox: XC,
  thicksim: JC,
  ThickSpace: ZC,
  ThinSpace: KC,
  thinsp: tR,
  thkap: eR,
  thksim: nR,
  THORN: rR,
  thorn: sR,
  tilde: oR,
  Tilde: iR,
  TildeEqual: aR,
  TildeFullEqual: cR,
  TildeTilde: lR,
  timesbar: uR,
  timesb: hR,
  times: pR,
  timesd: fR,
  tint: dR,
  toea: gR,
  topbot: mR,
  topcir: vR,
  top: bR,
  Topf: yR,
  topf: _R,
  topfork: wR,
  tosa: ER,
  tprime: xR,
  trade: SR,
  TRADE: AR,
  triangle: TR,
  triangledown: BR,
  triangleleft: LR,
  trianglelefteq: NR,
  triangleq: kR,
  triangleright: qR,
  trianglerighteq: DR,
  tridot: IR,
  trie: CR,
  triminus: RR,
  TripleDot: OR,
  triplus: FR,
  trisb: UR,
  tritime: HR,
  trpezium: MR,
  Tscr: $R,
  tscr: PR,
  TScy: GR,
  tscy: VR,
  TSHcy: jR,
  tshcy: zR,
  Tstrok: QR,
  tstrok: WR,
  twixt: YR,
  twoheadleftarrow: XR,
  twoheadrightarrow: JR,
  Uacute: ZR,
  uacute: KR,
  uarr: t2,
  Uarr: e2,
  uArr: n2,
  Uarrocir: r2,
  Ubrcy: s2,
  ubrcy: o2,
  Ubreve: i2,
  ubreve: a2,
  Ucirc: c2,
  ucirc: l2,
  Ucy: u2,
  ucy: h2,
  udarr: p2,
  Udblac: f2,
  udblac: d2,
  udhar: g2,
  ufisht: m2,
  Ufr: v2,
  ufr: b2,
  Ugrave: y2,
  ugrave: _2,
  uHar: w2,
  uharl: E2,
  uharr: x2,
  uhblk: S2,
  ulcorn: A2,
  ulcorner: T2,
  ulcrop: B2,
  ultri: L2,
  Umacr: N2,
  umacr: k2,
  uml: q2,
  UnderBar: D2,
  UnderBrace: I2,
  UnderBracket: C2,
  UnderParenthesis: R2,
  Union: O2,
  UnionPlus: F2,
  Uogon: U2,
  uogon: H2,
  Uopf: M2,
  uopf: $2,
  UpArrowBar: P2,
  uparrow: G2,
  UpArrow: V2,
  Uparrow: j2,
  UpArrowDownArrow: z2,
  updownarrow: Q2,
  UpDownArrow: W2,
  Updownarrow: Y2,
  UpEquilibrium: X2,
  upharpoonleft: J2,
  upharpoonright: Z2,
  uplus: K2,
  UpperLeftArrow: tO,
  UpperRightArrow: eO,
  upsi: nO,
  Upsi: rO,
  upsih: sO,
  Upsilon: oO,
  upsilon: iO,
  UpTeeArrow: aO,
  UpTee: cO,
  upuparrows: lO,
  urcorn: uO,
  urcorner: hO,
  urcrop: pO,
  Uring: fO,
  uring: dO,
  urtri: gO,
  Uscr: mO,
  uscr: vO,
  utdot: bO,
  Utilde: yO,
  utilde: _O,
  utri: wO,
  utrif: EO,
  uuarr: xO,
  Uuml: SO,
  uuml: AO,
  uwangle: TO,
  vangrt: BO,
  varepsilon: LO,
  varkappa: NO,
  varnothing: kO,
  varphi: qO,
  varpi: DO,
  varpropto: IO,
  varr: CO,
  vArr: RO,
  varrho: OO,
  varsigma: FO,
  varsubsetneq: UO,
  varsubsetneqq: HO,
  varsupsetneq: MO,
  varsupsetneqq: $O,
  vartheta: PO,
  vartriangleleft: GO,
  vartriangleright: VO,
  vBar: jO,
  Vbar: zO,
  vBarv: QO,
  Vcy: WO,
  vcy: YO,
  vdash: XO,
  vDash: JO,
  Vdash: ZO,
  VDash: KO,
  Vdashl: tF,
  veebar: eF,
  vee: nF,
  Vee: rF,
  veeeq: sF,
  vellip: oF,
  verbar: iF,
  Verbar: aF,
  vert: cF,
  Vert: lF,
  VerticalBar: uF,
  VerticalLine: hF,
  VerticalSeparator: pF,
  VerticalTilde: fF,
  VeryThinSpace: dF,
  Vfr: gF,
  vfr: mF,
  vltri: vF,
  vnsub: bF,
  vnsup: yF,
  Vopf: _F,
  vopf: wF,
  vprop: EF,
  vrtri: xF,
  Vscr: SF,
  vscr: AF,
  vsubnE: TF,
  vsubne: BF,
  vsupnE: LF,
  vsupne: NF,
  Vvdash: kF,
  vzigzag: qF,
  Wcirc: DF,
  wcirc: IF,
  wedbar: CF,
  wedge: RF,
  Wedge: OF,
  wedgeq: FF,
  weierp: UF,
  Wfr: HF,
  wfr: MF,
  Wopf: $F,
  wopf: PF,
  wp: GF,
  wr: VF,
  wreath: jF,
  Wscr: zF,
  wscr: QF,
  xcap: WF,
  xcirc: YF,
  xcup: XF,
  xdtri: JF,
  Xfr: ZF,
  xfr: KF,
  xharr: tU,
  xhArr: eU,
  Xi: nU,
  xi: rU,
  xlarr: sU,
  xlArr: oU,
  xmap: iU,
  xnis: aU,
  xodot: cU,
  Xopf: lU,
  xopf: uU,
  xoplus: hU,
  xotime: pU,
  xrarr: fU,
  xrArr: dU,
  Xscr: gU,
  xscr: mU,
  xsqcup: vU,
  xuplus: bU,
  xutri: yU,
  xvee: _U,
  xwedge: wU,
  Yacute: EU,
  yacute: xU,
  YAcy: SU,
  yacy: AU,
  Ycirc: TU,
  ycirc: BU,
  Ycy: LU,
  ycy: NU,
  yen: kU,
  Yfr: qU,
  yfr: DU,
  YIcy: IU,
  yicy: CU,
  Yopf: RU,
  yopf: OU,
  Yscr: FU,
  yscr: UU,
  YUcy: HU,
  yucy: MU,
  yuml: $U,
  Yuml: PU,
  Zacute: GU,
  zacute: VU,
  Zcaron: jU,
  zcaron: zU,
  Zcy: QU,
  zcy: WU,
  Zdot: YU,
  zdot: XU,
  zeetrf: JU,
  ZeroWidthSpace: ZU,
  Zeta: KU,
  zeta: t8,
  zfr: e8,
  Zfr: n8,
  ZHcy: r8,
  zhcy: s8,
  zigrarr: o8,
  zopf: i8,
  Zopf: a8,
  Zscr: c8,
  zscr: l8,
  zwj: u8,
  zwnj: h8
}, p8 = "Á", f8 = "á", d8 = "Â", g8 = "â", m8 = "´", v8 = "Æ", b8 = "æ", y8 = "À", _8 = "à", w8 = "&", E8 = "&", x8 = "Å", S8 = "å", A8 = "Ã", T8 = "ã", B8 = "Ä", L8 = "ä", N8 = "¦", k8 = "Ç", q8 = "ç", D8 = "¸", I8 = "¢", C8 = "©", R8 = "©", O8 = "¤", F8 = "°", U8 = "÷", H8 = "É", M8 = "é", $8 = "Ê", P8 = "ê", G8 = "È", V8 = "è", j8 = "Ð", z8 = "ð", Q8 = "Ë", W8 = "ë", Y8 = "½", X8 = "¼", J8 = "¾", Z8 = ">", K8 = ">", tH = "Í", eH = "í", nH = "Î", rH = "î", sH = "¡", oH = "Ì", iH = "ì", aH = "¿", cH = "Ï", lH = "ï", uH = "«", hH = "<", pH = "<", fH = "¯", dH = "µ", gH = "·", mH = " ", vH = "¬", bH = "Ñ", yH = "ñ", _H = "Ó", wH = "ó", EH = "Ô", xH = "ô", SH = "Ò", AH = "ò", TH = "ª", BH = "º", LH = "Ø", NH = "ø", kH = "Õ", qH = "õ", DH = "Ö", IH = "ö", CH = "¶", RH = "±", OH = "£", FH = '"', UH = '"', HH = "»", MH = "®", $H = "®", PH = "§", GH = "­", VH = "¹", jH = "²", zH = "³", QH = "ß", WH = "Þ", YH = "þ", XH = "×", JH = "Ú", ZH = "ú", KH = "Û", tM = "û", eM = "Ù", nM = "ù", rM = "¨", sM = "Ü", oM = "ü", iM = "Ý", aM = "ý", cM = "¥", lM = "ÿ", yn = {
  Aacute: p8,
  aacute: f8,
  Acirc: d8,
  acirc: g8,
  acute: m8,
  AElig: v8,
  aelig: b8,
  Agrave: y8,
  agrave: _8,
  amp: w8,
  AMP: E8,
  Aring: x8,
  aring: S8,
  Atilde: A8,
  atilde: T8,
  Auml: B8,
  auml: L8,
  brvbar: N8,
  Ccedil: k8,
  ccedil: q8,
  cedil: D8,
  cent: I8,
  copy: C8,
  COPY: R8,
  curren: O8,
  deg: F8,
  divide: U8,
  Eacute: H8,
  eacute: M8,
  Ecirc: $8,
  ecirc: P8,
  Egrave: G8,
  egrave: V8,
  ETH: j8,
  eth: z8,
  Euml: Q8,
  euml: W8,
  frac12: Y8,
  frac14: X8,
  frac34: J8,
  gt: Z8,
  GT: K8,
  Iacute: tH,
  iacute: eH,
  Icirc: nH,
  icirc: rH,
  iexcl: sH,
  Igrave: oH,
  igrave: iH,
  iquest: aH,
  Iuml: cH,
  iuml: lH,
  laquo: uH,
  lt: hH,
  LT: pH,
  macr: fH,
  micro: dH,
  middot: gH,
  nbsp: mH,
  not: vH,
  Ntilde: bH,
  ntilde: yH,
  Oacute: _H,
  oacute: wH,
  Ocirc: EH,
  ocirc: xH,
  Ograve: SH,
  ograve: AH,
  ordf: TH,
  ordm: BH,
  Oslash: LH,
  oslash: NH,
  Otilde: kH,
  otilde: qH,
  Ouml: DH,
  ouml: IH,
  para: CH,
  plusmn: RH,
  pound: OH,
  quot: FH,
  QUOT: UH,
  raquo: HH,
  reg: MH,
  REG: $H,
  sect: PH,
  shy: GH,
  sup1: VH,
  sup2: jH,
  sup3: zH,
  szlig: QH,
  THORN: WH,
  thorn: YH,
  times: XH,
  Uacute: JH,
  uacute: ZH,
  Ucirc: KH,
  ucirc: tM,
  Ugrave: eM,
  ugrave: nM,
  uml: rM,
  Uuml: sM,
  uuml: oM,
  Yacute: iM,
  yacute: aM,
  yen: cM,
  yuml: lM
}, uM = "&", hM = "'", pM = ">", fM = "<", dM = '"', ve = {
  amp: uM,
  apos: hM,
  gt: pM,
  lt: fM,
  quot: dM
};
var Wt, Te;
function _n() {
  if (Te) return Wt;
  Te = 1, Wt = d;
  var l = bn(), s = me, r = yn, h = ve, u = 0, c = u++, o = u++, n = u++, p = u++, y = u++, x = u++, L = u++, B = u++, E = u++, A = u++, b = u++, S = u++, g = u++, w = u++, q = u++, _ = u++, v = u++, T = u++, N = u++, k = u++, D = u++, I = u++, M = u++, j = u++, ct = u++, rt = u++, pt = u++, at = u++, mt = u++, vt = u++, st = u++, lt = u++, G = u++, Y = u++, ft = u++, ut = u++, bt = u++, dt = u++, W = u++, F = u++, tt = u++, z = u++, ot = u++, _t = u++, R = u++, O = u++, J = u++, ht = u++, Z = u++, Q = u++, $ = u++, gt = u++, nt = u++, K = u++, it = u++, yt = 0, X = yt++, wt = yt++, i = yt++;
  function t(a) {
    return a === " " || a === `
` || a === "	" || a === "\f" || a === "\r";
  }
  function e(a, C) {
    return function(U) {
      U === a && (this._state = C);
    };
  }
  function f(a, C, U) {
    var H = a.toLowerCase();
    return a === H ? function(P) {
      P === H ? this._state = C : (this._state = U, this._index--);
    } : function(P) {
      P === H || P === a ? this._state = C : (this._state = U, this._index--);
    };
  }
  function m(a, C) {
    var U = a.toLowerCase();
    return function(H) {
      H === U || H === a ? this._state = C : (this._state = n, this._index--);
    };
  }
  function d(a, C) {
    this._state = c, this._buffer = "", this._sectionStart = 0, this._index = 0, this._bufferOffset = 0, this._baseState = c, this._special = X, this._cbs = C, this._running = !0, this._ended = !1, this._xmlMode = !!(a && a.xmlMode), this._decodeEntities = !!(a && a.decodeEntities);
  }
  return d.prototype._stateText = function(a) {
    a === "<" ? (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), this._state = o, this._sectionStart = this._index) : this._decodeEntities && this._special === X && a === "&" && (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), this._baseState = c, this._state = $, this._sectionStart = this._index);
  }, d.prototype._stateBeforeTagName = function(a) {
    a === "/" ? this._state = y : a === "<" ? (this._cbs.ontext(this._getSection()), this._sectionStart = this._index) : a === ">" || this._special !== X || t(a) ? this._state = c : a === "!" ? (this._state = q, this._sectionStart = this._index + 1) : a === "?" ? (this._state = v, this._sectionStart = this._index + 1) : (this._state = !this._xmlMode && (a === "s" || a === "S") ? st : n, this._sectionStart = this._index);
  }, d.prototype._stateInTagName = function(a) {
    (a === "/" || a === ">" || t(a)) && (this._emitToken("onopentagname"), this._state = B, this._index--);
  }, d.prototype._stateBeforeCloseingTagName = function(a) {
    t(a) || (a === ">" ? this._state = c : this._special !== X ? a === "s" || a === "S" ? this._state = lt : (this._state = c, this._index--) : (this._state = x, this._sectionStart = this._index));
  }, d.prototype._stateInCloseingTagName = function(a) {
    (a === ">" || t(a)) && (this._emitToken("onclosetag"), this._state = L, this._index--);
  }, d.prototype._stateAfterCloseingTagName = function(a) {
    a === ">" && (this._state = c, this._sectionStart = this._index + 1);
  }, d.prototype._stateBeforeAttributeName = function(a) {
    a === ">" ? (this._cbs.onopentagend(), this._state = c, this._sectionStart = this._index + 1) : a === "/" ? this._state = p : t(a) || (this._state = E, this._sectionStart = this._index);
  }, d.prototype._stateInSelfClosingTag = function(a) {
    a === ">" ? (this._cbs.onselfclosingtag(), this._state = c, this._sectionStart = this._index + 1) : t(a) || (this._state = B, this._index--);
  }, d.prototype._stateInAttributeName = function(a) {
    (a === "=" || a === "/" || a === ">" || t(a)) && (this._cbs.onattribname(this._getSection()), this._sectionStart = -1, this._state = A, this._index--);
  }, d.prototype._stateAfterAttributeName = function(a) {
    a === "=" ? this._state = b : a === "/" || a === ">" ? (this._cbs.onattribend(), this._state = B, this._index--) : t(a) || (this._cbs.onattribend(), this._state = E, this._sectionStart = this._index);
  }, d.prototype._stateBeforeAttributeValue = function(a) {
    a === '"' ? (this._state = S, this._sectionStart = this._index + 1) : a === "'" ? (this._state = g, this._sectionStart = this._index + 1) : t(a) || (this._state = w, this._sectionStart = this._index, this._index--);
  }, d.prototype._stateInAttributeValueDoubleQuotes = function(a) {
    a === '"' ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = B) : this._decodeEntities && a === "&" && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = $, this._sectionStart = this._index);
  }, d.prototype._stateInAttributeValueSingleQuotes = function(a) {
    a === "'" ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = B) : this._decodeEntities && a === "&" && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = $, this._sectionStart = this._index);
  }, d.prototype._stateInAttributeValueNoQuotes = function(a) {
    t(a) || a === ">" ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = B, this._index--) : this._decodeEntities && a === "&" && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = $, this._sectionStart = this._index);
  }, d.prototype._stateBeforeDeclaration = function(a) {
    this._state = a === "[" ? I : a === "-" ? T : _;
  }, d.prototype._stateInDeclaration = function(a) {
    a === ">" && (this._cbs.ondeclaration(this._getSection()), this._state = c, this._sectionStart = this._index + 1);
  }, d.prototype._stateInProcessingInstruction = function(a) {
    a === ">" && (this._cbs.onprocessinginstruction(this._getSection()), this._state = c, this._sectionStart = this._index + 1);
  }, d.prototype._stateBeforeComment = function(a) {
    a === "-" ? (this._state = N, this._sectionStart = this._index + 1) : this._state = _;
  }, d.prototype._stateInComment = function(a) {
    a === "-" && (this._state = k);
  }, d.prototype._stateAfterComment1 = function(a) {
    a === "-" ? this._state = D : this._state = N;
  }, d.prototype._stateAfterComment2 = function(a) {
    a === ">" ? (this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2)), this._state = c, this._sectionStart = this._index + 1) : a !== "-" && (this._state = N);
  }, d.prototype._stateBeforeCdata1 = f("C", M, _), d.prototype._stateBeforeCdata2 = f("D", j, _), d.prototype._stateBeforeCdata3 = f("A", ct, _), d.prototype._stateBeforeCdata4 = f("T", rt, _), d.prototype._stateBeforeCdata5 = f("A", pt, _), d.prototype._stateBeforeCdata6 = function(a) {
    a === "[" ? (this._state = at, this._sectionStart = this._index + 1) : (this._state = _, this._index--);
  }, d.prototype._stateInCdata = function(a) {
    a === "]" && (this._state = mt);
  }, d.prototype._stateAfterCdata1 = e("]", vt), d.prototype._stateAfterCdata2 = function(a) {
    a === ">" ? (this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2)), this._state = c, this._sectionStart = this._index + 1) : a !== "]" && (this._state = at);
  }, d.prototype._stateBeforeSpecial = function(a) {
    a === "c" || a === "C" ? this._state = G : a === "t" || a === "T" ? this._state = ot : (this._state = n, this._index--);
  }, d.prototype._stateBeforeSpecialEnd = function(a) {
    this._special === wt && (a === "c" || a === "C") ? this._state = dt : this._special === i && (a === "t" || a === "T") ? this._state = J : this._state = c;
  }, d.prototype._stateBeforeScript1 = m("R", Y), d.prototype._stateBeforeScript2 = m("I", ft), d.prototype._stateBeforeScript3 = m("P", ut), d.prototype._stateBeforeScript4 = m("T", bt), d.prototype._stateBeforeScript5 = function(a) {
    (a === "/" || a === ">" || t(a)) && (this._special = wt), this._state = n, this._index--;
  }, d.prototype._stateAfterScript1 = f("R", W, c), d.prototype._stateAfterScript2 = f("I", F, c), d.prototype._stateAfterScript3 = f("P", tt, c), d.prototype._stateAfterScript4 = f("T", z, c), d.prototype._stateAfterScript5 = function(a) {
    a === ">" || t(a) ? (this._special = X, this._state = x, this._sectionStart = this._index - 6, this._index--) : this._state = c;
  }, d.prototype._stateBeforeStyle1 = m("Y", _t), d.prototype._stateBeforeStyle2 = m("L", R), d.prototype._stateBeforeStyle3 = m("E", O), d.prototype._stateBeforeStyle4 = function(a) {
    (a === "/" || a === ">" || t(a)) && (this._special = i), this._state = n, this._index--;
  }, d.prototype._stateAfterStyle1 = f("Y", ht, c), d.prototype._stateAfterStyle2 = f("L", Z, c), d.prototype._stateAfterStyle3 = f("E", Q, c), d.prototype._stateAfterStyle4 = function(a) {
    a === ">" || t(a) ? (this._special = X, this._state = x, this._sectionStart = this._index - 5, this._index--) : this._state = c;
  }, d.prototype._stateBeforeEntity = f("#", gt, nt), d.prototype._stateBeforeNumericEntity = f("X", it, K), d.prototype._parseNamedEntityStrict = function() {
    if (this._sectionStart + 1 < this._index) {
      var a = this._buffer.substring(this._sectionStart + 1, this._index), C = this._xmlMode ? h : s;
      C.hasOwnProperty(a) && (this._emitPartial(C[a]), this._sectionStart = this._index + 1);
    }
  }, d.prototype._parseLegacyEntity = function() {
    var a = this._sectionStart + 1, C = this._index - a;
    for (C > 6 && (C = 6); C >= 2; ) {
      var U = this._buffer.substr(a, C);
      if (r.hasOwnProperty(U)) {
        this._emitPartial(r[U]), this._sectionStart += C + 1;
        return;
      } else
        C--;
    }
  }, d.prototype._stateInNamedEntity = function(a) {
    a === ";" ? (this._parseNamedEntityStrict(), this._sectionStart + 1 < this._index && !this._xmlMode && this._parseLegacyEntity(), this._state = this._baseState) : (a < "a" || a > "z") && (a < "A" || a > "Z") && (a < "0" || a > "9") && (this._xmlMode || this._sectionStart + 1 === this._index || (this._baseState !== c ? a !== "=" && this._parseNamedEntityStrict() : this._parseLegacyEntity()), this._state = this._baseState, this._index--);
  }, d.prototype._decodeNumericEntity = function(a, C) {
    var U = this._sectionStart + a;
    if (U !== this._index) {
      var H = this._buffer.substring(U, this._index), P = parseInt(H, C);
      this._emitPartial(l(P)), this._sectionStart = this._index;
    } else
      this._sectionStart--;
    this._state = this._baseState;
  }, d.prototype._stateInNumericEntity = function(a) {
    a === ";" ? (this._decodeNumericEntity(2, 10), this._sectionStart++) : (a < "0" || a > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(2, 10), this._index--);
  }, d.prototype._stateInHexEntity = function(a) {
    a === ";" ? (this._decodeNumericEntity(3, 16), this._sectionStart++) : (a < "a" || a > "f") && (a < "A" || a > "F") && (a < "0" || a > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(3, 16), this._index--);
  }, d.prototype._cleanup = function() {
    this._sectionStart < 0 ? (this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._running && (this._state === c ? (this._sectionStart !== this._index && this._cbs.ontext(this._buffer.substr(this._sectionStart)), this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._sectionStart === this._index ? (this._buffer = "", this._bufferOffset += this._index, this._index = 0) : (this._buffer = this._buffer.substr(this._sectionStart), this._index -= this._sectionStart, this._bufferOffset += this._sectionStart), this._sectionStart = 0);
  }, d.prototype.write = function(a) {
    this._ended && this._cbs.onerror(Error(".write() after done!")), this._buffer += a, this._parse();
  }, d.prototype._parse = function() {
    for (; this._index < this._buffer.length && this._running; ) {
      var a = this._buffer.charAt(this._index);
      this._state === c ? this._stateText(a) : this._state === o ? this._stateBeforeTagName(a) : this._state === n ? this._stateInTagName(a) : this._state === y ? this._stateBeforeCloseingTagName(a) : this._state === x ? this._stateInCloseingTagName(a) : this._state === L ? this._stateAfterCloseingTagName(a) : this._state === p ? this._stateInSelfClosingTag(a) : this._state === B ? this._stateBeforeAttributeName(a) : this._state === E ? this._stateInAttributeName(a) : this._state === A ? this._stateAfterAttributeName(a) : this._state === b ? this._stateBeforeAttributeValue(a) : this._state === S ? this._stateInAttributeValueDoubleQuotes(a) : this._state === g ? this._stateInAttributeValueSingleQuotes(a) : this._state === w ? this._stateInAttributeValueNoQuotes(a) : this._state === q ? this._stateBeforeDeclaration(a) : this._state === _ ? this._stateInDeclaration(a) : this._state === v ? this._stateInProcessingInstruction(a) : this._state === T ? this._stateBeforeComment(a) : this._state === N ? this._stateInComment(a) : this._state === k ? this._stateAfterComment1(a) : this._state === D ? this._stateAfterComment2(a) : this._state === I ? this._stateBeforeCdata1(a) : this._state === M ? this._stateBeforeCdata2(a) : this._state === j ? this._stateBeforeCdata3(a) : this._state === ct ? this._stateBeforeCdata4(a) : this._state === rt ? this._stateBeforeCdata5(a) : this._state === pt ? this._stateBeforeCdata6(a) : this._state === at ? this._stateInCdata(a) : this._state === mt ? this._stateAfterCdata1(a) : this._state === vt ? this._stateAfterCdata2(a) : this._state === st ? this._stateBeforeSpecial(a) : this._state === lt ? this._stateBeforeSpecialEnd(a) : this._state === G ? this._stateBeforeScript1(a) : this._state === Y ? this._stateBeforeScript2(a) : this._state === ft ? this._stateBeforeScript3(a) : this._state === ut ? this._stateBeforeScript4(a) : this._state === bt ? this._stateBeforeScript5(a) : this._state === dt ? this._stateAfterScript1(a) : this._state === W ? this._stateAfterScript2(a) : this._state === F ? this._stateAfterScript3(a) : this._state === tt ? this._stateAfterScript4(a) : this._state === z ? this._stateAfterScript5(a) : this._state === ot ? this._stateBeforeStyle1(a) : this._state === _t ? this._stateBeforeStyle2(a) : this._state === R ? this._stateBeforeStyle3(a) : this._state === O ? this._stateBeforeStyle4(a) : this._state === J ? this._stateAfterStyle1(a) : this._state === ht ? this._stateAfterStyle2(a) : this._state === Z ? this._stateAfterStyle3(a) : this._state === Q ? this._stateAfterStyle4(a) : this._state === $ ? this._stateBeforeEntity(a) : this._state === gt ? this._stateBeforeNumericEntity(a) : this._state === nt ? this._stateInNamedEntity(a) : this._state === K ? this._stateInNumericEntity(a) : this._state === it ? this._stateInHexEntity(a) : this._cbs.onerror(Error("unknown _state"), this._state), this._index++;
    }
    this._cleanup();
  }, d.prototype.pause = function() {
    this._running = !1;
  }, d.prototype.resume = function() {
    this._running = !0, this._index < this._buffer.length && this._parse(), this._ended && this._finish();
  }, d.prototype.end = function(a) {
    this._ended && this._cbs.onerror(Error(".end() after done!")), a && this.write(a), this._ended = !0, this._running && this._finish();
  }, d.prototype._finish = function() {
    this._sectionStart < this._index && this._handleTrailingData(), this._cbs.onend();
  }, d.prototype._handleTrailingData = function() {
    var a = this._buffer.substr(this._sectionStart);
    this._state === at || this._state === mt || this._state === vt ? this._cbs.oncdata(a) : this._state === N || this._state === k || this._state === D ? this._cbs.oncomment(a) : this._state === nt && !this._xmlMode ? (this._parseLegacyEntity(), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : this._state === K && !this._xmlMode ? (this._decodeNumericEntity(2, 10), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : this._state === it && !this._xmlMode ? (this._decodeNumericEntity(3, 16), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : this._state !== n && this._state !== B && this._state !== b && this._state !== A && this._state !== E && this._state !== g && this._state !== S && this._state !== w && this._state !== x && this._cbs.ontext(a);
  }, d.prototype.reset = function() {
    d.call(this, { xmlMode: this._xmlMode, decodeEntities: this._decodeEntities }, this._cbs);
  }, d.prototype.getAbsoluteIndex = function() {
    return this._bufferOffset + this._index;
  }, d.prototype._getSection = function() {
    return this._buffer.substring(this._sectionStart, this._index);
  }, d.prototype._emitToken = function(a) {
    this._cbs[a](this._getSection()), this._sectionStart = -1;
  }, d.prototype._emitPartial = function(a) {
    this._baseState !== c ? this._cbs.onattribdata(a) : this._cbs.ontext(a);
  }, Wt;
}
var Ut = { exports: {} }, Be;
function $t() {
  return Be || (Be = 1, typeof Object.create == "function" ? Ut.exports = function(s, r) {
    s.super_ = r, s.prototype = Object.create(r.prototype, {
      constructor: {
        value: s,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    });
  } : Ut.exports = function(s, r) {
    s.super_ = r;
    var h = function() {
    };
    h.prototype = r.prototype, s.prototype = new h(), s.prototype.constructor = s;
  }), Ut.exports;
}
var Ht = { exports: {} }, Le;
function gM() {
  if (Le) return Ht.exports;
  Le = 1;
  var l = typeof Reflect == "object" ? Reflect : null, s = l && typeof l.apply == "function" ? l.apply : function(v, T, N) {
    return Function.prototype.apply.call(v, T, N);
  }, r;
  l && typeof l.ownKeys == "function" ? r = l.ownKeys : Object.getOwnPropertySymbols ? r = function(v) {
    return Object.getOwnPropertyNames(v).concat(Object.getOwnPropertySymbols(v));
  } : r = function(v) {
    return Object.getOwnPropertyNames(v);
  };
  function h(_) {
    console && console.warn && console.warn(_);
  }
  var u = Number.isNaN || function(v) {
    return v !== v;
  };
  function c() {
    c.init.call(this);
  }
  Ht.exports = c, Ht.exports.once = g, c.EventEmitter = c, c.prototype._events = void 0, c.prototype._eventsCount = 0, c.prototype._maxListeners = void 0;
  var o = 10;
  function n(_) {
    if (typeof _ != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof _);
  }
  Object.defineProperty(c, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return o;
    },
    set: function(_) {
      if (typeof _ != "number" || _ < 0 || u(_))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + _ + ".");
      o = _;
    }
  }), c.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, c.prototype.setMaxListeners = function(v) {
    if (typeof v != "number" || v < 0 || u(v))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + v + ".");
    return this._maxListeners = v, this;
  };
  function p(_) {
    return _._maxListeners === void 0 ? c.defaultMaxListeners : _._maxListeners;
  }
  c.prototype.getMaxListeners = function() {
    return p(this);
  }, c.prototype.emit = function(v) {
    for (var T = [], N = 1; N < arguments.length; N++) T.push(arguments[N]);
    var k = v === "error", D = this._events;
    if (D !== void 0)
      k = k && D.error === void 0;
    else if (!k)
      return !1;
    if (k) {
      var I;
      if (T.length > 0 && (I = T[0]), I instanceof Error)
        throw I;
      var M = new Error("Unhandled error." + (I ? " (" + I.message + ")" : ""));
      throw M.context = I, M;
    }
    var j = D[v];
    if (j === void 0)
      return !1;
    if (typeof j == "function")
      s(j, this, T);
    else
      for (var ct = j.length, rt = A(j, ct), N = 0; N < ct; ++N)
        s(rt[N], this, T);
    return !0;
  };
  function y(_, v, T, N) {
    var k, D, I;
    if (n(T), D = _._events, D === void 0 ? (D = _._events = /* @__PURE__ */ Object.create(null), _._eventsCount = 0) : (D.newListener !== void 0 && (_.emit(
      "newListener",
      v,
      T.listener ? T.listener : T
    ), D = _._events), I = D[v]), I === void 0)
      I = D[v] = T, ++_._eventsCount;
    else if (typeof I == "function" ? I = D[v] = N ? [T, I] : [I, T] : N ? I.unshift(T) : I.push(T), k = p(_), k > 0 && I.length > k && !I.warned) {
      I.warned = !0;
      var M = new Error("Possible EventEmitter memory leak detected. " + I.length + " " + String(v) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      M.name = "MaxListenersExceededWarning", M.emitter = _, M.type = v, M.count = I.length, h(M);
    }
    return _;
  }
  c.prototype.addListener = function(v, T) {
    return y(this, v, T, !1);
  }, c.prototype.on = c.prototype.addListener, c.prototype.prependListener = function(v, T) {
    return y(this, v, T, !0);
  };
  function x() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function L(_, v, T) {
    var N = { fired: !1, wrapFn: void 0, target: _, type: v, listener: T }, k = x.bind(N);
    return k.listener = T, N.wrapFn = k, k;
  }
  c.prototype.once = function(v, T) {
    return n(T), this.on(v, L(this, v, T)), this;
  }, c.prototype.prependOnceListener = function(v, T) {
    return n(T), this.prependListener(v, L(this, v, T)), this;
  }, c.prototype.removeListener = function(v, T) {
    var N, k, D, I, M;
    if (n(T), k = this._events, k === void 0)
      return this;
    if (N = k[v], N === void 0)
      return this;
    if (N === T || N.listener === T)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete k[v], k.removeListener && this.emit("removeListener", v, N.listener || T));
    else if (typeof N != "function") {
      for (D = -1, I = N.length - 1; I >= 0; I--)
        if (N[I] === T || N[I].listener === T) {
          M = N[I].listener, D = I;
          break;
        }
      if (D < 0)
        return this;
      D === 0 ? N.shift() : b(N, D), N.length === 1 && (k[v] = N[0]), k.removeListener !== void 0 && this.emit("removeListener", v, M || T);
    }
    return this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.removeAllListeners = function(v) {
    var T, N, k;
    if (N = this._events, N === void 0)
      return this;
    if (N.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : N[v] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete N[v]), this;
    if (arguments.length === 0) {
      var D = Object.keys(N), I;
      for (k = 0; k < D.length; ++k)
        I = D[k], I !== "removeListener" && this.removeAllListeners(I);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (T = N[v], typeof T == "function")
      this.removeListener(v, T);
    else if (T !== void 0)
      for (k = T.length - 1; k >= 0; k--)
        this.removeListener(v, T[k]);
    return this;
  };
  function B(_, v, T) {
    var N = _._events;
    if (N === void 0)
      return [];
    var k = N[v];
    return k === void 0 ? [] : typeof k == "function" ? T ? [k.listener || k] : [k] : T ? S(k) : A(k, k.length);
  }
  c.prototype.listeners = function(v) {
    return B(this, v, !0);
  }, c.prototype.rawListeners = function(v) {
    return B(this, v, !1);
  }, c.listenerCount = function(_, v) {
    return typeof _.listenerCount == "function" ? _.listenerCount(v) : E.call(_, v);
  }, c.prototype.listenerCount = E;
  function E(_) {
    var v = this._events;
    if (v !== void 0) {
      var T = v[_];
      if (typeof T == "function")
        return 1;
      if (T !== void 0)
        return T.length;
    }
    return 0;
  }
  c.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function A(_, v) {
    for (var T = new Array(v), N = 0; N < v; ++N)
      T[N] = _[N];
    return T;
  }
  function b(_, v) {
    for (; v + 1 < _.length; v++)
      _[v] = _[v + 1];
    _.pop();
  }
  function S(_) {
    for (var v = new Array(_.length), T = 0; T < v.length; ++T)
      v[T] = _[T].listener || _[T];
    return v;
  }
  function g(_, v) {
    return new Promise(function(T, N) {
      function k(I) {
        _.removeListener(v, D), N(I);
      }
      function D() {
        typeof _.removeListener == "function" && _.removeListener("error", k), T([].slice.call(arguments));
      }
      q(_, v, D, { once: !0 }), v !== "error" && w(_, k, { once: !0 });
    });
  }
  function w(_, v, T) {
    typeof _.on == "function" && q(_, "error", v, T);
  }
  function q(_, v, T, N) {
    if (typeof _.on == "function")
      N.once ? _.once(v, T) : _.on(v, T);
    else if (typeof _.addEventListener == "function")
      _.addEventListener(v, function k(D) {
        N.once && _.removeEventListener(v, k), T(D);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof _);
  }
  return Ht.exports;
}
var Yt, Ne;
function wn() {
  if (Ne) return Yt;
  Ne = 1;
  var l = _n(), s = {
    input: !0,
    option: !0,
    optgroup: !0,
    select: !0,
    button: !0,
    datalist: !0,
    textarea: !0
  }, r = {
    tr: { tr: !0, th: !0, td: !0 },
    th: { th: !0 },
    td: { thead: !0, th: !0, td: !0 },
    body: { head: !0, link: !0, script: !0 },
    li: { li: !0 },
    p: { p: !0 },
    h1: { p: !0 },
    h2: { p: !0 },
    h3: { p: !0 },
    h4: { p: !0 },
    h5: { p: !0 },
    h6: { p: !0 },
    select: s,
    input: s,
    output: s,
    button: s,
    datalist: s,
    textarea: s,
    option: { option: !0 },
    optgroup: { optgroup: !0 }
  }, h = {
    __proto__: null,
    area: !0,
    base: !0,
    basefont: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    frame: !0,
    hr: !0,
    img: !0,
    input: !0,
    isindex: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
    //common self closing svg elements
    path: !0,
    circle: !0,
    ellipse: !0,
    line: !0,
    rect: !0,
    use: !0,
    stop: !0,
    polyline: !0,
    polygon: !0
  }, u = /\s|\//;
  function c(o, n) {
    this._options = n || {}, this._cbs = o || {}, this._tagname = "", this._attribname = "", this._attribvalue = "", this._attribs = null, this._stack = [], this.startIndex = 0, this.endIndex = null, this._lowerCaseTagNames = "lowerCaseTags" in this._options ? !!this._options.lowerCaseTags : !this._options.xmlMode, this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ? !!this._options.lowerCaseAttributeNames : !this._options.xmlMode, this._options.Tokenizer && (l = this._options.Tokenizer), this._tokenizer = new l(this._options, this), this._cbs.onparserinit && this._cbs.onparserinit(this);
  }
  return $t()(c, gM().EventEmitter), c.prototype._updatePosition = function(o) {
    this.endIndex === null ? this._tokenizer._sectionStart <= o ? this.startIndex = 0 : this.startIndex = this._tokenizer._sectionStart - o : this.startIndex = this.endIndex + 1, this.endIndex = this._tokenizer.getAbsoluteIndex();
  }, c.prototype.ontext = function(o) {
    this._updatePosition(1), this.endIndex--, this._cbs.ontext && this._cbs.ontext(o);
  }, c.prototype.onopentagname = function(o) {
    if (this._lowerCaseTagNames && (o = o.toLowerCase()), this._tagname = o, !this._options.xmlMode && o in r)
      for (var n; (n = this._stack[this._stack.length - 1]) in r[o]; this.onclosetag(n)) ;
    (this._options.xmlMode || !(o in h)) && this._stack.push(o), this._cbs.onopentagname && this._cbs.onopentagname(o), this._cbs.onopentag && (this._attribs = {});
  }, c.prototype.onopentagend = function() {
    this._updatePosition(1), this._attribs && (this._cbs.onopentag && this._cbs.onopentag(this._tagname, this._attribs), this._attribs = null), !this._options.xmlMode && this._cbs.onclosetag && this._tagname in h && this._cbs.onclosetag(this._tagname), this._tagname = "";
  }, c.prototype.onclosetag = function(o) {
    if (this._updatePosition(1), this._lowerCaseTagNames && (o = o.toLowerCase()), this._stack.length && (!(o in h) || this._options.xmlMode)) {
      var n = this._stack.lastIndexOf(o);
      if (n !== -1)
        if (this._cbs.onclosetag)
          for (n = this._stack.length - n; n--; ) this._cbs.onclosetag(this._stack.pop());
        else this._stack.length = n;
      else o === "p" && !this._options.xmlMode && (this.onopentagname(o), this._closeCurrentTag());
    } else !this._options.xmlMode && (o === "br" || o === "p") && (this.onopentagname(o), this._closeCurrentTag());
  }, c.prototype.onselfclosingtag = function() {
    this._options.xmlMode || this._options.recognizeSelfClosing ? this._closeCurrentTag() : this.onopentagend();
  }, c.prototype._closeCurrentTag = function() {
    var o = this._tagname;
    this.onopentagend(), this._stack[this._stack.length - 1] === o && (this._cbs.onclosetag && this._cbs.onclosetag(o), this._stack.pop());
  }, c.prototype.onattribname = function(o) {
    this._lowerCaseAttributeNames && (o = o.toLowerCase()), this._attribname = o;
  }, c.prototype.onattribdata = function(o) {
    this._attribvalue += o;
  }, c.prototype.onattribend = function() {
    this._cbs.onattribute && this._cbs.onattribute(this._attribname, this._attribvalue), this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname) && (this._attribs[this._attribname] = this._attribvalue), this._attribname = "", this._attribvalue = "";
  }, c.prototype._getInstructionName = function(o) {
    var n = o.search(u), p = n < 0 ? o : o.substr(0, n);
    return this._lowerCaseTagNames && (p = p.toLowerCase()), p;
  }, c.prototype.ondeclaration = function(o) {
    if (this._cbs.onprocessinginstruction) {
      var n = this._getInstructionName(o);
      this._cbs.onprocessinginstruction("!" + n, "!" + o);
    }
  }, c.prototype.onprocessinginstruction = function(o) {
    if (this._cbs.onprocessinginstruction) {
      var n = this._getInstructionName(o);
      this._cbs.onprocessinginstruction("?" + n, "?" + o);
    }
  }, c.prototype.oncomment = function(o) {
    this._updatePosition(4), this._cbs.oncomment && this._cbs.oncomment(o), this._cbs.oncommentend && this._cbs.oncommentend();
  }, c.prototype.oncdata = function(o) {
    this._updatePosition(1), this._options.xmlMode || this._options.recognizeCDATA ? (this._cbs.oncdatastart && this._cbs.oncdatastart(), this._cbs.ontext && this._cbs.ontext(o), this._cbs.oncdataend && this._cbs.oncdataend()) : this.oncomment("[CDATA[" + o + "]]");
  }, c.prototype.onerror = function(o) {
    this._cbs.onerror && this._cbs.onerror(o);
  }, c.prototype.onend = function() {
    if (this._cbs.onclosetag)
      for (var o = this._stack.length; o > 0; this._cbs.onclosetag(this._stack[--o])) ;
    this._cbs.onend && this._cbs.onend();
  }, c.prototype.reset = function() {
    this._cbs.onreset && this._cbs.onreset(), this._tokenizer.reset(), this._tagname = "", this._attribname = "", this._attribs = null, this._stack = [], this._cbs.onparserinit && this._cbs.onparserinit(this);
  }, c.prototype.parseComplete = function(o) {
    this.reset(), this.end(o);
  }, c.prototype.write = function(o) {
    this._tokenizer.write(o);
  }, c.prototype.end = function(o) {
    this._tokenizer.end(o);
  }, c.prototype.pause = function() {
    this._tokenizer.pause();
  }, c.prototype.resume = function() {
    this._tokenizer.resume();
  }, c.prototype.parseChunk = c.prototype.write, c.prototype.done = c.prototype.end, Yt = c, Yt;
}
var Xt, ke;
function Rt() {
  return ke || (ke = 1, Xt = {
    Text: "text",
    //Text
    Directive: "directive",
    //<? ... ?>
    Comment: "comment",
    //<!-- ... -->
    Script: "script",
    //<script> tags
    Style: "style",
    //<style> tags
    Tag: "tag",
    //Any tag
    CDATA: "cdata",
    //<![CDATA[ ... ]]>
    Doctype: "doctype",
    isTag: function(l) {
      return l.type === "tag" || l.type === "script" || l.type === "style";
    }
  }), Xt;
}
var Jt = { exports: {} }, qe;
function En() {
  if (qe) return Jt.exports;
  qe = 1, Jt.exports = {
    get firstChild() {
      var r = this.children;
      return r && r[0] || null;
    },
    get lastChild() {
      var r = this.children;
      return r && r[r.length - 1] || null;
    },
    get nodeType() {
      return s[this.type] || s.element;
    }
  };
  var l = {
    tagName: "name",
    childNodes: "children",
    parentNode: "parent",
    previousSibling: "prev",
    nextSibling: "next",
    nodeValue: "data"
  }, s = {
    element: 1,
    text: 3,
    cdata: 4,
    comment: 8
  };
  return Object.keys(l).forEach(function(r) {
  }), Jt.exports;
}
var Zt = { exports: {} }, De;
function mM() {
  if (De) return Zt.exports;
  De = 1;
  var l = En(), s = Zt.exports = Object.create(l), r = {
    tagName: "name"
  };
  return Object.keys(r).forEach(function(h) {
    var u = r[h];
    Object.defineProperty(s, h, {
      get: function() {
        return this[u] || null;
      },
      set: function(c) {
        return this[u] = c, c;
      }
    });
  }), Zt.exports;
}
var Kt, Ie;
function vM() {
  if (Ie) return Kt;
  Ie = 1;
  var l = Rt(), s = /\s+/g, r = En(), h = mM();
  function u(o, n, p) {
    typeof o == "object" ? (p = n, n = o, o = null) : typeof n == "function" && (p = n, n = c), this._callback = o, this._options = n || c, this._elementCB = p, this.dom = [], this._done = !1, this._tagStack = [], this._parser = this._parser || null;
  }
  var c = {
    normalizeWhitespace: !1,
    //Replace all whitespace with single spaces
    withStartIndices: !1,
    //Add startIndex properties to nodes
    withEndIndices: !1
    //Add endIndex properties to nodes
  };
  return u.prototype.onparserinit = function(o) {
    this._parser = o;
  }, u.prototype.onreset = function() {
    u.call(this, this._callback, this._options, this._elementCB);
  }, u.prototype.onend = function() {
    this._done || (this._done = !0, this._parser = null, this._handleCallback(null));
  }, u.prototype._handleCallback = u.prototype.onerror = function(o) {
    if (typeof this._callback == "function")
      this._callback(o, this.dom);
    else if (o) throw o;
  }, u.prototype.onclosetag = function() {
    var o = this._tagStack.pop();
    this._options.withEndIndices && (o.endIndex = this._parser.endIndex), this._elementCB && this._elementCB(o);
  }, u.prototype._createDomElement = function(o) {
    if (!this._options.withDomLvl1) return o;
    var n;
    o.type === "tag" ? n = Object.create(h) : n = Object.create(r);
    for (var p in o)
      o.hasOwnProperty(p) && (n[p] = o[p]);
    return n;
  }, u.prototype._addDomElement = function(o) {
    var n = this._tagStack[this._tagStack.length - 1], p = n ? n.children : this.dom, y = p[p.length - 1];
    o.next = null, this._options.withStartIndices && (o.startIndex = this._parser.startIndex), this._options.withEndIndices && (o.endIndex = this._parser.endIndex), y ? (o.prev = y, y.next = o) : o.prev = null, p.push(o), o.parent = n || null;
  }, u.prototype.onopentag = function(o, n) {
    var p = {
      type: o === "script" ? l.Script : o === "style" ? l.Style : l.Tag,
      name: o,
      attribs: n,
      children: []
    }, y = this._createDomElement(p);
    this._addDomElement(y), this._tagStack.push(y);
  }, u.prototype.ontext = function(o) {
    var n = this._options.normalizeWhitespace || this._options.ignoreWhitespace, p;
    if (!this._tagStack.length && this.dom.length && (p = this.dom[this.dom.length - 1]).type === l.Text)
      n ? p.data = (p.data + o).replace(s, " ") : p.data += o;
    else if (this._tagStack.length && (p = this._tagStack[this._tagStack.length - 1]) && (p = p.children[p.children.length - 1]) && p.type === l.Text)
      n ? p.data = (p.data + o).replace(s, " ") : p.data += o;
    else {
      n && (o = o.replace(s, " "));
      var y = this._createDomElement({
        data: o,
        type: l.Text
      });
      this._addDomElement(y);
    }
  }, u.prototype.oncomment = function(o) {
    var n = this._tagStack[this._tagStack.length - 1];
    if (n && n.type === l.Comment) {
      n.data += o;
      return;
    }
    var p = {
      data: o,
      type: l.Comment
    }, y = this._createDomElement(p);
    this._addDomElement(y), this._tagStack.push(y);
  }, u.prototype.oncdatastart = function() {
    var o = {
      children: [{
        data: "",
        type: l.Text
      }],
      type: l.CDATA
    }, n = this._createDomElement(o);
    this._addDomElement(n), this._tagStack.push(n);
  }, u.prototype.oncommentend = u.prototype.oncdataend = function() {
    this._tagStack.pop();
  }, u.prototype.onprocessinginstruction = function(o, n) {
    var p = this._createDomElement({
      name: o,
      data: n,
      type: l.Directive
    });
    this._addDomElement(p);
  }, Kt = u, Kt;
}
var te, Ce;
function bM() {
  if (Ce) return te;
  Ce = 1;
  var l = Ot(), s = l.DomHandler, r = l.DomUtils;
  function h(y, x) {
    this.init(y, x);
  }
  $t()(h, s), h.prototype.init = s;
  function u(y, x) {
    return r.getElementsByTagName(y, x, !0);
  }
  function c(y, x) {
    return r.getElementsByTagName(y, x, !0, 1)[0];
  }
  function o(y, x, L) {
    return r.getText(
      r.getElementsByTagName(y, x, L, 1)
    ).trim();
  }
  function n(y, x, L, B, E) {
    var A = o(L, B, E);
    A && (y[x] = A);
  }
  var p = function(y) {
    return y === "rss" || y === "feed" || y === "rdf:RDF";
  };
  return h.prototype.onend = function() {
    var y = {}, x = c(p, this.dom), L, B;
    x && (x.name === "feed" ? (B = x.children, y.type = "atom", n(y, "id", "id", B), n(y, "title", "title", B), (L = c("link", B)) && (L = L.attribs) && (L = L.href) && (y.link = L), n(y, "description", "subtitle", B), (L = o("updated", B)) && (y.updated = new Date(L)), n(y, "author", "email", B, !0), y.items = u("entry", B).map(function(E) {
      var A = {}, b;
      return E = E.children, n(A, "id", "id", E), n(A, "title", "title", E), (b = c("link", E)) && (b = b.attribs) && (b = b.href) && (A.link = b), (b = o("summary", E) || o("content", E)) && (A.description = b), (b = o("updated", E)) && (A.pubDate = new Date(b)), A;
    })) : (B = c("channel", x.children).children, y.type = x.name.substr(0, 3), y.id = "", n(y, "title", "title", B), n(y, "link", "link", B), n(y, "description", "description", B), (L = o("lastBuildDate", B)) && (y.updated = new Date(L)), n(y, "author", "managingEditor", B, !0), y.items = u("item", x.children).map(function(E) {
      var A = {}, b;
      return E = E.children, n(A, "id", "guid", E), n(A, "title", "title", E), n(A, "link", "link", E), n(A, "description", "description", E), (b = o("pubDate", E)) && (A.pubDate = new Date(b)), A;
    }))), this.dom = y, s.prototype._handleCallback.call(
      this,
      x ? null : Error("couldn't find root of feed")
    );
  }, te = h, te;
}
const yM = {}, _M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yM
}, Symbol.toStringTag, { value: "Module" })), Re = /* @__PURE__ */ Bn(_M);
var ee = {}, ne = {}, qt = {}, Oe;
function wM() {
  if (Oe) return qt;
  Oe = 1, qt.byteLength = n, qt.toByteArray = y, qt.fromByteArray = B;
  for (var l = [], s = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, c = h.length; u < c; ++u)
    l[u] = h[u], s[h.charCodeAt(u)] = u;
  s[45] = 62, s[95] = 63;
  function o(E) {
    var A = E.length;
    if (A % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var b = E.indexOf("=");
    b === -1 && (b = A);
    var S = b === A ? 0 : 4 - b % 4;
    return [b, S];
  }
  function n(E) {
    var A = o(E), b = A[0], S = A[1];
    return (b + S) * 3 / 4 - S;
  }
  function p(E, A, b) {
    return (A + b) * 3 / 4 - b;
  }
  function y(E) {
    var A, b = o(E), S = b[0], g = b[1], w = new r(p(E, S, g)), q = 0, _ = g > 0 ? S - 4 : S, v;
    for (v = 0; v < _; v += 4)
      A = s[E.charCodeAt(v)] << 18 | s[E.charCodeAt(v + 1)] << 12 | s[E.charCodeAt(v + 2)] << 6 | s[E.charCodeAt(v + 3)], w[q++] = A >> 16 & 255, w[q++] = A >> 8 & 255, w[q++] = A & 255;
    return g === 2 && (A = s[E.charCodeAt(v)] << 2 | s[E.charCodeAt(v + 1)] >> 4, w[q++] = A & 255), g === 1 && (A = s[E.charCodeAt(v)] << 10 | s[E.charCodeAt(v + 1)] << 4 | s[E.charCodeAt(v + 2)] >> 2, w[q++] = A >> 8 & 255, w[q++] = A & 255), w;
  }
  function x(E) {
    return l[E >> 18 & 63] + l[E >> 12 & 63] + l[E >> 6 & 63] + l[E & 63];
  }
  function L(E, A, b) {
    for (var S, g = [], w = A; w < b; w += 3)
      S = (E[w] << 16 & 16711680) + (E[w + 1] << 8 & 65280) + (E[w + 2] & 255), g.push(x(S));
    return g.join("");
  }
  function B(E) {
    for (var A, b = E.length, S = b % 3, g = [], w = 16383, q = 0, _ = b - S; q < _; q += w)
      g.push(L(E, q, q + w > _ ? _ : q + w));
    return S === 1 ? (A = E[b - 1], g.push(
      l[A >> 2] + l[A << 4 & 63] + "=="
    )) : S === 2 && (A = (E[b - 2] << 8) + E[b - 1], g.push(
      l[A >> 10] + l[A >> 4 & 63] + l[A << 2 & 63] + "="
    )), g.join("");
  }
  return qt;
}
var Mt = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Fe;
function EM() {
  return Fe || (Fe = 1, Mt.read = function(l, s, r, h, u) {
    var c, o, n = u * 8 - h - 1, p = (1 << n) - 1, y = p >> 1, x = -7, L = r ? u - 1 : 0, B = r ? -1 : 1, E = l[s + L];
    for (L += B, c = E & (1 << -x) - 1, E >>= -x, x += n; x > 0; c = c * 256 + l[s + L], L += B, x -= 8)
      ;
    for (o = c & (1 << -x) - 1, c >>= -x, x += h; x > 0; o = o * 256 + l[s + L], L += B, x -= 8)
      ;
    if (c === 0)
      c = 1 - y;
    else {
      if (c === p)
        return o ? NaN : (E ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, h), c = c - y;
    }
    return (E ? -1 : 1) * o * Math.pow(2, c - h);
  }, Mt.write = function(l, s, r, h, u, c) {
    var o, n, p, y = c * 8 - u - 1, x = (1 << y) - 1, L = x >> 1, B = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, E = h ? 0 : c - 1, A = h ? 1 : -1, b = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
    for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (n = isNaN(s) ? 1 : 0, o = x) : (o = Math.floor(Math.log(s) / Math.LN2), s * (p = Math.pow(2, -o)) < 1 && (o--, p *= 2), o + L >= 1 ? s += B / p : s += B * Math.pow(2, 1 - L), s * p >= 2 && (o++, p /= 2), o + L >= x ? (n = 0, o = x) : o + L >= 1 ? (n = (s * p - 1) * Math.pow(2, u), o = o + L) : (n = s * Math.pow(2, L - 1) * Math.pow(2, u), o = 0)); u >= 8; l[r + E] = n & 255, E += A, n /= 256, u -= 8)
      ;
    for (o = o << u | n, y += u; y > 0; l[r + E] = o & 255, E += A, o /= 256, y -= 8)
      ;
    l[r + E - A] |= b * 128;
  }), Mt;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Ue;
function xn() {
  return Ue || (Ue = 1, (function(l) {
    const s = wM(), r = EM(), h = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    l.Buffer = n, l.SlowBuffer = w, l.INSPECT_MAX_BYTES = 50;
    const u = 2147483647;
    l.kMaxLength = u, n.TYPED_ARRAY_SUPPORT = c(), !n.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function c() {
      try {
        const i = new Uint8Array(1), t = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(i, t), i.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(n.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (n.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(n.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (n.isBuffer(this))
          return this.byteOffset;
      }
    });
    function o(i) {
      if (i > u)
        throw new RangeError('The value "' + i + '" is invalid for option "size"');
      const t = new Uint8Array(i);
      return Object.setPrototypeOf(t, n.prototype), t;
    }
    function n(i, t, e) {
      if (typeof i == "number") {
        if (typeof t == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return L(i);
      }
      return p(i, t, e);
    }
    n.poolSize = 8192;
    function p(i, t, e) {
      if (typeof i == "string")
        return B(i, t);
      if (ArrayBuffer.isView(i))
        return A(i);
      if (i == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i
        );
      if (K(i, ArrayBuffer) || i && K(i.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (K(i, SharedArrayBuffer) || i && K(i.buffer, SharedArrayBuffer)))
        return b(i, t, e);
      if (typeof i == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const f = i.valueOf && i.valueOf();
      if (f != null && f !== i)
        return n.from(f, t, e);
      const m = S(i);
      if (m) return m;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof i[Symbol.toPrimitive] == "function")
        return n.from(i[Symbol.toPrimitive]("string"), t, e);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i
      );
    }
    n.from = function(i, t, e) {
      return p(i, t, e);
    }, Object.setPrototypeOf(n.prototype, Uint8Array.prototype), Object.setPrototypeOf(n, Uint8Array);
    function y(i) {
      if (typeof i != "number")
        throw new TypeError('"size" argument must be of type number');
      if (i < 0)
        throw new RangeError('The value "' + i + '" is invalid for option "size"');
    }
    function x(i, t, e) {
      return y(i), i <= 0 ? o(i) : t !== void 0 ? typeof e == "string" ? o(i).fill(t, e) : o(i).fill(t) : o(i);
    }
    n.alloc = function(i, t, e) {
      return x(i, t, e);
    };
    function L(i) {
      return y(i), o(i < 0 ? 0 : g(i) | 0);
    }
    n.allocUnsafe = function(i) {
      return L(i);
    }, n.allocUnsafeSlow = function(i) {
      return L(i);
    };
    function B(i, t) {
      if ((typeof t != "string" || t === "") && (t = "utf8"), !n.isEncoding(t))
        throw new TypeError("Unknown encoding: " + t);
      const e = q(i, t) | 0;
      let f = o(e);
      const m = f.write(i, t);
      return m !== e && (f = f.slice(0, m)), f;
    }
    function E(i) {
      const t = i.length < 0 ? 0 : g(i.length) | 0, e = o(t);
      for (let f = 0; f < t; f += 1)
        e[f] = i[f] & 255;
      return e;
    }
    function A(i) {
      if (K(i, Uint8Array)) {
        const t = new Uint8Array(i);
        return b(t.buffer, t.byteOffset, t.byteLength);
      }
      return E(i);
    }
    function b(i, t, e) {
      if (t < 0 || i.byteLength < t)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (i.byteLength < t + (e || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let f;
      return t === void 0 && e === void 0 ? f = new Uint8Array(i) : e === void 0 ? f = new Uint8Array(i, t) : f = new Uint8Array(i, t, e), Object.setPrototypeOf(f, n.prototype), f;
    }
    function S(i) {
      if (n.isBuffer(i)) {
        const t = g(i.length) | 0, e = o(t);
        return e.length === 0 || i.copy(e, 0, 0, t), e;
      }
      if (i.length !== void 0)
        return typeof i.length != "number" || it(i.length) ? o(0) : E(i);
      if (i.type === "Buffer" && Array.isArray(i.data))
        return E(i.data);
    }
    function g(i) {
      if (i >= u)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u.toString(16) + " bytes");
      return i | 0;
    }
    function w(i) {
      return +i != i && (i = 0), n.alloc(+i);
    }
    n.isBuffer = function(t) {
      return t != null && t._isBuffer === !0 && t !== n.prototype;
    }, n.compare = function(t, e) {
      if (K(t, Uint8Array) && (t = n.from(t, t.offset, t.byteLength)), K(e, Uint8Array) && (e = n.from(e, e.offset, e.byteLength)), !n.isBuffer(t) || !n.isBuffer(e))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (t === e) return 0;
      let f = t.length, m = e.length;
      for (let d = 0, a = Math.min(f, m); d < a; ++d)
        if (t[d] !== e[d]) {
          f = t[d], m = e[d];
          break;
        }
      return f < m ? -1 : m < f ? 1 : 0;
    }, n.isEncoding = function(t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, n.concat = function(t, e) {
      if (!Array.isArray(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (t.length === 0)
        return n.alloc(0);
      let f;
      if (e === void 0)
        for (e = 0, f = 0; f < t.length; ++f)
          e += t[f].length;
      const m = n.allocUnsafe(e);
      let d = 0;
      for (f = 0; f < t.length; ++f) {
        let a = t[f];
        if (K(a, Uint8Array))
          d + a.length > m.length ? (n.isBuffer(a) || (a = n.from(a)), a.copy(m, d)) : Uint8Array.prototype.set.call(
            m,
            a,
            d
          );
        else if (n.isBuffer(a))
          a.copy(m, d);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        d += a.length;
      }
      return m;
    };
    function q(i, t) {
      if (n.isBuffer(i))
        return i.length;
      if (ArrayBuffer.isView(i) || K(i, ArrayBuffer))
        return i.byteLength;
      if (typeof i != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof i
        );
      const e = i.length, f = arguments.length > 2 && arguments[2] === !0;
      if (!f && e === 0) return 0;
      let m = !1;
      for (; ; )
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return e;
          case "utf8":
          case "utf-8":
            return Z(i).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return e * 2;
          case "hex":
            return e >>> 1;
          case "base64":
            return gt(i).length;
          default:
            if (m)
              return f ? -1 : Z(i).length;
            t = ("" + t).toLowerCase(), m = !0;
        }
    }
    n.byteLength = q;
    function _(i, t, e) {
      let f = !1;
      if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, t >>>= 0, e <= t))
        return "";
      for (i || (i = "utf8"); ; )
        switch (i) {
          case "hex":
            return st(this, t, e);
          case "utf8":
          case "utf-8":
            return rt(this, t, e);
          case "ascii":
            return mt(this, t, e);
          case "latin1":
          case "binary":
            return vt(this, t, e);
          case "base64":
            return ct(this, t, e);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return lt(this, t, e);
          default:
            if (f) throw new TypeError("Unknown encoding: " + i);
            i = (i + "").toLowerCase(), f = !0;
        }
    }
    n.prototype._isBuffer = !0;
    function v(i, t, e) {
      const f = i[t];
      i[t] = i[e], i[e] = f;
    }
    n.prototype.swap16 = function() {
      const t = this.length;
      if (t % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let e = 0; e < t; e += 2)
        v(this, e, e + 1);
      return this;
    }, n.prototype.swap32 = function() {
      const t = this.length;
      if (t % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let e = 0; e < t; e += 4)
        v(this, e, e + 3), v(this, e + 1, e + 2);
      return this;
    }, n.prototype.swap64 = function() {
      const t = this.length;
      if (t % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let e = 0; e < t; e += 8)
        v(this, e, e + 7), v(this, e + 1, e + 6), v(this, e + 2, e + 5), v(this, e + 3, e + 4);
      return this;
    }, n.prototype.toString = function() {
      const t = this.length;
      return t === 0 ? "" : arguments.length === 0 ? rt(this, 0, t) : _.apply(this, arguments);
    }, n.prototype.toLocaleString = n.prototype.toString, n.prototype.equals = function(t) {
      if (!n.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      return this === t ? !0 : n.compare(this, t) === 0;
    }, n.prototype.inspect = function() {
      let t = "";
      const e = l.INSPECT_MAX_BYTES;
      return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">";
    }, h && (n.prototype[h] = n.prototype.inspect), n.prototype.compare = function(t, e, f, m, d) {
      if (K(t, Uint8Array) && (t = n.from(t, t.offset, t.byteLength)), !n.isBuffer(t))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
        );
      if (e === void 0 && (e = 0), f === void 0 && (f = t ? t.length : 0), m === void 0 && (m = 0), d === void 0 && (d = this.length), e < 0 || f > t.length || m < 0 || d > this.length)
        throw new RangeError("out of range index");
      if (m >= d && e >= f)
        return 0;
      if (m >= d)
        return -1;
      if (e >= f)
        return 1;
      if (e >>>= 0, f >>>= 0, m >>>= 0, d >>>= 0, this === t) return 0;
      let a = d - m, C = f - e;
      const U = Math.min(a, C), H = this.slice(m, d), P = t.slice(e, f);
      for (let V = 0; V < U; ++V)
        if (H[V] !== P[V]) {
          a = H[V], C = P[V];
          break;
        }
      return a < C ? -1 : C < a ? 1 : 0;
    };
    function T(i, t, e, f, m) {
      if (i.length === 0) return -1;
      if (typeof e == "string" ? (f = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, it(e) && (e = m ? 0 : i.length - 1), e < 0 && (e = i.length + e), e >= i.length) {
        if (m) return -1;
        e = i.length - 1;
      } else if (e < 0)
        if (m) e = 0;
        else return -1;
      if (typeof t == "string" && (t = n.from(t, f)), n.isBuffer(t))
        return t.length === 0 ? -1 : N(i, t, e, f, m);
      if (typeof t == "number")
        return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? m ? Uint8Array.prototype.indexOf.call(i, t, e) : Uint8Array.prototype.lastIndexOf.call(i, t, e) : N(i, [t], e, f, m);
      throw new TypeError("val must be string, number or Buffer");
    }
    function N(i, t, e, f, m) {
      let d = 1, a = i.length, C = t.length;
      if (f !== void 0 && (f = String(f).toLowerCase(), f === "ucs2" || f === "ucs-2" || f === "utf16le" || f === "utf-16le")) {
        if (i.length < 2 || t.length < 2)
          return -1;
        d = 2, a /= 2, C /= 2, e /= 2;
      }
      function U(P, V) {
        return d === 1 ? P[V] : P.readUInt16BE(V * d);
      }
      let H;
      if (m) {
        let P = -1;
        for (H = e; H < a; H++)
          if (U(i, H) === U(t, P === -1 ? 0 : H - P)) {
            if (P === -1 && (P = H), H - P + 1 === C) return P * d;
          } else
            P !== -1 && (H -= H - P), P = -1;
      } else
        for (e + C > a && (e = a - C), H = e; H >= 0; H--) {
          let P = !0;
          for (let V = 0; V < C; V++)
            if (U(i, H + V) !== U(t, V)) {
              P = !1;
              break;
            }
          if (P) return H;
        }
      return -1;
    }
    n.prototype.includes = function(t, e, f) {
      return this.indexOf(t, e, f) !== -1;
    }, n.prototype.indexOf = function(t, e, f) {
      return T(this, t, e, f, !0);
    }, n.prototype.lastIndexOf = function(t, e, f) {
      return T(this, t, e, f, !1);
    };
    function k(i, t, e, f) {
      e = Number(e) || 0;
      const m = i.length - e;
      f ? (f = Number(f), f > m && (f = m)) : f = m;
      const d = t.length;
      f > d / 2 && (f = d / 2);
      let a;
      for (a = 0; a < f; ++a) {
        const C = parseInt(t.substr(a * 2, 2), 16);
        if (it(C)) return a;
        i[e + a] = C;
      }
      return a;
    }
    function D(i, t, e, f) {
      return nt(Z(t, i.length - e), i, e, f);
    }
    function I(i, t, e, f) {
      return nt(Q(t), i, e, f);
    }
    function M(i, t, e, f) {
      return nt(gt(t), i, e, f);
    }
    function j(i, t, e, f) {
      return nt($(t, i.length - e), i, e, f);
    }
    n.prototype.write = function(t, e, f, m) {
      if (e === void 0)
        m = "utf8", f = this.length, e = 0;
      else if (f === void 0 && typeof e == "string")
        m = e, f = this.length, e = 0;
      else if (isFinite(e))
        e = e >>> 0, isFinite(f) ? (f = f >>> 0, m === void 0 && (m = "utf8")) : (m = f, f = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const d = this.length - e;
      if ((f === void 0 || f > d) && (f = d), t.length > 0 && (f < 0 || e < 0) || e > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      m || (m = "utf8");
      let a = !1;
      for (; ; )
        switch (m) {
          case "hex":
            return k(this, t, e, f);
          case "utf8":
          case "utf-8":
            return D(this, t, e, f);
          case "ascii":
          case "latin1":
          case "binary":
            return I(this, t, e, f);
          case "base64":
            return M(this, t, e, f);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return j(this, t, e, f);
          default:
            if (a) throw new TypeError("Unknown encoding: " + m);
            m = ("" + m).toLowerCase(), a = !0;
        }
    }, n.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function ct(i, t, e) {
      return t === 0 && e === i.length ? s.fromByteArray(i) : s.fromByteArray(i.slice(t, e));
    }
    function rt(i, t, e) {
      e = Math.min(i.length, e);
      const f = [];
      let m = t;
      for (; m < e; ) {
        const d = i[m];
        let a = null, C = d > 239 ? 4 : d > 223 ? 3 : d > 191 ? 2 : 1;
        if (m + C <= e) {
          let U, H, P, V;
          switch (C) {
            case 1:
              d < 128 && (a = d);
              break;
            case 2:
              U = i[m + 1], (U & 192) === 128 && (V = (d & 31) << 6 | U & 63, V > 127 && (a = V));
              break;
            case 3:
              U = i[m + 1], H = i[m + 2], (U & 192) === 128 && (H & 192) === 128 && (V = (d & 15) << 12 | (U & 63) << 6 | H & 63, V > 2047 && (V < 55296 || V > 57343) && (a = V));
              break;
            case 4:
              U = i[m + 1], H = i[m + 2], P = i[m + 3], (U & 192) === 128 && (H & 192) === 128 && (P & 192) === 128 && (V = (d & 15) << 18 | (U & 63) << 12 | (H & 63) << 6 | P & 63, V > 65535 && V < 1114112 && (a = V));
          }
        }
        a === null ? (a = 65533, C = 1) : a > 65535 && (a -= 65536, f.push(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023), f.push(a), m += C;
      }
      return at(f);
    }
    const pt = 4096;
    function at(i) {
      const t = i.length;
      if (t <= pt)
        return String.fromCharCode.apply(String, i);
      let e = "", f = 0;
      for (; f < t; )
        e += String.fromCharCode.apply(
          String,
          i.slice(f, f += pt)
        );
      return e;
    }
    function mt(i, t, e) {
      let f = "";
      e = Math.min(i.length, e);
      for (let m = t; m < e; ++m)
        f += String.fromCharCode(i[m] & 127);
      return f;
    }
    function vt(i, t, e) {
      let f = "";
      e = Math.min(i.length, e);
      for (let m = t; m < e; ++m)
        f += String.fromCharCode(i[m]);
      return f;
    }
    function st(i, t, e) {
      const f = i.length;
      (!t || t < 0) && (t = 0), (!e || e < 0 || e > f) && (e = f);
      let m = "";
      for (let d = t; d < e; ++d)
        m += yt[i[d]];
      return m;
    }
    function lt(i, t, e) {
      const f = i.slice(t, e);
      let m = "";
      for (let d = 0; d < f.length - 1; d += 2)
        m += String.fromCharCode(f[d] + f[d + 1] * 256);
      return m;
    }
    n.prototype.slice = function(t, e) {
      const f = this.length;
      t = ~~t, e = e === void 0 ? f : ~~e, t < 0 ? (t += f, t < 0 && (t = 0)) : t > f && (t = f), e < 0 ? (e += f, e < 0 && (e = 0)) : e > f && (e = f), e < t && (e = t);
      const m = this.subarray(t, e);
      return Object.setPrototypeOf(m, n.prototype), m;
    };
    function G(i, t, e) {
      if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint");
      if (i + t > e) throw new RangeError("Trying to access beyond buffer length");
    }
    n.prototype.readUintLE = n.prototype.readUIntLE = function(t, e, f) {
      t = t >>> 0, e = e >>> 0, f || G(t, e, this.length);
      let m = this[t], d = 1, a = 0;
      for (; ++a < e && (d *= 256); )
        m += this[t + a] * d;
      return m;
    }, n.prototype.readUintBE = n.prototype.readUIntBE = function(t, e, f) {
      t = t >>> 0, e = e >>> 0, f || G(t, e, this.length);
      let m = this[t + --e], d = 1;
      for (; e > 0 && (d *= 256); )
        m += this[t + --e] * d;
      return m;
    }, n.prototype.readUint8 = n.prototype.readUInt8 = function(t, e) {
      return t = t >>> 0, e || G(t, 1, this.length), this[t];
    }, n.prototype.readUint16LE = n.prototype.readUInt16LE = function(t, e) {
      return t = t >>> 0, e || G(t, 2, this.length), this[t] | this[t + 1] << 8;
    }, n.prototype.readUint16BE = n.prototype.readUInt16BE = function(t, e) {
      return t = t >>> 0, e || G(t, 2, this.length), this[t] << 8 | this[t + 1];
    }, n.prototype.readUint32LE = n.prototype.readUInt32LE = function(t, e) {
      return t = t >>> 0, e || G(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
    }, n.prototype.readUint32BE = n.prototype.readUInt32BE = function(t, e) {
      return t = t >>> 0, e || G(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
    }, n.prototype.readBigUInt64LE = X(function(t) {
      t = t >>> 0, R(t, "offset");
      const e = this[t], f = this[t + 7];
      (e === void 0 || f === void 0) && O(t, this.length - 8);
      const m = e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24, d = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + f * 2 ** 24;
      return BigInt(m) + (BigInt(d) << BigInt(32));
    }), n.prototype.readBigUInt64BE = X(function(t) {
      t = t >>> 0, R(t, "offset");
      const e = this[t], f = this[t + 7];
      (e === void 0 || f === void 0) && O(t, this.length - 8);
      const m = e * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t], d = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + f;
      return (BigInt(m) << BigInt(32)) + BigInt(d);
    }), n.prototype.readIntLE = function(t, e, f) {
      t = t >>> 0, e = e >>> 0, f || G(t, e, this.length);
      let m = this[t], d = 1, a = 0;
      for (; ++a < e && (d *= 256); )
        m += this[t + a] * d;
      return d *= 128, m >= d && (m -= Math.pow(2, 8 * e)), m;
    }, n.prototype.readIntBE = function(t, e, f) {
      t = t >>> 0, e = e >>> 0, f || G(t, e, this.length);
      let m = e, d = 1, a = this[t + --m];
      for (; m > 0 && (d *= 256); )
        a += this[t + --m] * d;
      return d *= 128, a >= d && (a -= Math.pow(2, 8 * e)), a;
    }, n.prototype.readInt8 = function(t, e) {
      return t = t >>> 0, e || G(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
    }, n.prototype.readInt16LE = function(t, e) {
      t = t >>> 0, e || G(t, 2, this.length);
      const f = this[t] | this[t + 1] << 8;
      return f & 32768 ? f | 4294901760 : f;
    }, n.prototype.readInt16BE = function(t, e) {
      t = t >>> 0, e || G(t, 2, this.length);
      const f = this[t + 1] | this[t] << 8;
      return f & 32768 ? f | 4294901760 : f;
    }, n.prototype.readInt32LE = function(t, e) {
      return t = t >>> 0, e || G(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
    }, n.prototype.readInt32BE = function(t, e) {
      return t = t >>> 0, e || G(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
    }, n.prototype.readBigInt64LE = X(function(t) {
      t = t >>> 0, R(t, "offset");
      const e = this[t], f = this[t + 7];
      (e === void 0 || f === void 0) && O(t, this.length - 8);
      const m = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (f << 24);
      return (BigInt(m) << BigInt(32)) + BigInt(e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24);
    }), n.prototype.readBigInt64BE = X(function(t) {
      t = t >>> 0, R(t, "offset");
      const e = this[t], f = this[t + 7];
      (e === void 0 || f === void 0) && O(t, this.length - 8);
      const m = (e << 24) + // Overflow
      this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
      return (BigInt(m) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + f);
    }), n.prototype.readFloatLE = function(t, e) {
      return t = t >>> 0, e || G(t, 4, this.length), r.read(this, t, !0, 23, 4);
    }, n.prototype.readFloatBE = function(t, e) {
      return t = t >>> 0, e || G(t, 4, this.length), r.read(this, t, !1, 23, 4);
    }, n.prototype.readDoubleLE = function(t, e) {
      return t = t >>> 0, e || G(t, 8, this.length), r.read(this, t, !0, 52, 8);
    }, n.prototype.readDoubleBE = function(t, e) {
      return t = t >>> 0, e || G(t, 8, this.length), r.read(this, t, !1, 52, 8);
    };
    function Y(i, t, e, f, m, d) {
      if (!n.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > m || t < d) throw new RangeError('"value" argument is out of bounds');
      if (e + f > i.length) throw new RangeError("Index out of range");
    }
    n.prototype.writeUintLE = n.prototype.writeUIntLE = function(t, e, f, m) {
      if (t = +t, e = e >>> 0, f = f >>> 0, !m) {
        const C = Math.pow(2, 8 * f) - 1;
        Y(this, t, e, f, C, 0);
      }
      let d = 1, a = 0;
      for (this[e] = t & 255; ++a < f && (d *= 256); )
        this[e + a] = t / d & 255;
      return e + f;
    }, n.prototype.writeUintBE = n.prototype.writeUIntBE = function(t, e, f, m) {
      if (t = +t, e = e >>> 0, f = f >>> 0, !m) {
        const C = Math.pow(2, 8 * f) - 1;
        Y(this, t, e, f, C, 0);
      }
      let d = f - 1, a = 1;
      for (this[e + d] = t & 255; --d >= 0 && (a *= 256); )
        this[e + d] = t / a & 255;
      return e + f;
    }, n.prototype.writeUint8 = n.prototype.writeUInt8 = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 1, 255, 0), this[e] = t & 255, e + 1;
    }, n.prototype.writeUint16LE = n.prototype.writeUInt16LE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 2, 65535, 0), this[e] = t & 255, this[e + 1] = t >>> 8, e + 2;
    }, n.prototype.writeUint16BE = n.prototype.writeUInt16BE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = t & 255, e + 2;
    }, n.prototype.writeUint32LE = n.prototype.writeUInt32LE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = t & 255, e + 4;
    }, n.prototype.writeUint32BE = n.prototype.writeUInt32BE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t & 255, e + 4;
    };
    function ft(i, t, e, f, m) {
      _t(t, f, m, i, e, 7);
      let d = Number(t & BigInt(4294967295));
      i[e++] = d, d = d >> 8, i[e++] = d, d = d >> 8, i[e++] = d, d = d >> 8, i[e++] = d;
      let a = Number(t >> BigInt(32) & BigInt(4294967295));
      return i[e++] = a, a = a >> 8, i[e++] = a, a = a >> 8, i[e++] = a, a = a >> 8, i[e++] = a, e;
    }
    function ut(i, t, e, f, m) {
      _t(t, f, m, i, e, 7);
      let d = Number(t & BigInt(4294967295));
      i[e + 7] = d, d = d >> 8, i[e + 6] = d, d = d >> 8, i[e + 5] = d, d = d >> 8, i[e + 4] = d;
      let a = Number(t >> BigInt(32) & BigInt(4294967295));
      return i[e + 3] = a, a = a >> 8, i[e + 2] = a, a = a >> 8, i[e + 1] = a, a = a >> 8, i[e] = a, e + 8;
    }
    n.prototype.writeBigUInt64LE = X(function(t, e = 0) {
      return ft(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
    }), n.prototype.writeBigUInt64BE = X(function(t, e = 0) {
      return ut(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
    }), n.prototype.writeIntLE = function(t, e, f, m) {
      if (t = +t, e = e >>> 0, !m) {
        const U = Math.pow(2, 8 * f - 1);
        Y(this, t, e, f, U - 1, -U);
      }
      let d = 0, a = 1, C = 0;
      for (this[e] = t & 255; ++d < f && (a *= 256); )
        t < 0 && C === 0 && this[e + d - 1] !== 0 && (C = 1), this[e + d] = (t / a >> 0) - C & 255;
      return e + f;
    }, n.prototype.writeIntBE = function(t, e, f, m) {
      if (t = +t, e = e >>> 0, !m) {
        const U = Math.pow(2, 8 * f - 1);
        Y(this, t, e, f, U - 1, -U);
      }
      let d = f - 1, a = 1, C = 0;
      for (this[e + d] = t & 255; --d >= 0 && (a *= 256); )
        t < 0 && C === 0 && this[e + d + 1] !== 0 && (C = 1), this[e + d] = (t / a >> 0) - C & 255;
      return e + f;
    }, n.prototype.writeInt8 = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = t & 255, e + 1;
    }, n.prototype.writeInt16LE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 2, 32767, -32768), this[e] = t & 255, this[e + 1] = t >>> 8, e + 2;
    }, n.prototype.writeInt16BE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = t & 255, e + 2;
    }, n.prototype.writeInt32LE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 4, 2147483647, -2147483648), this[e] = t & 255, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4;
    }, n.prototype.writeInt32BE = function(t, e, f) {
      return t = +t, e = e >>> 0, f || Y(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t & 255, e + 4;
    }, n.prototype.writeBigInt64LE = X(function(t, e = 0) {
      return ft(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), n.prototype.writeBigInt64BE = X(function(t, e = 0) {
      return ut(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function bt(i, t, e, f, m, d) {
      if (e + f > i.length) throw new RangeError("Index out of range");
      if (e < 0) throw new RangeError("Index out of range");
    }
    function dt(i, t, e, f, m) {
      return t = +t, e = e >>> 0, m || bt(i, t, e, 4), r.write(i, t, e, f, 23, 4), e + 4;
    }
    n.prototype.writeFloatLE = function(t, e, f) {
      return dt(this, t, e, !0, f);
    }, n.prototype.writeFloatBE = function(t, e, f) {
      return dt(this, t, e, !1, f);
    };
    function W(i, t, e, f, m) {
      return t = +t, e = e >>> 0, m || bt(i, t, e, 8), r.write(i, t, e, f, 52, 8), e + 8;
    }
    n.prototype.writeDoubleLE = function(t, e, f) {
      return W(this, t, e, !0, f);
    }, n.prototype.writeDoubleBE = function(t, e, f) {
      return W(this, t, e, !1, f);
    }, n.prototype.copy = function(t, e, f, m) {
      if (!n.isBuffer(t)) throw new TypeError("argument should be a Buffer");
      if (f || (f = 0), !m && m !== 0 && (m = this.length), e >= t.length && (e = t.length), e || (e = 0), m > 0 && m < f && (m = f), m === f || t.length === 0 || this.length === 0) return 0;
      if (e < 0)
        throw new RangeError("targetStart out of bounds");
      if (f < 0 || f >= this.length) throw new RangeError("Index out of range");
      if (m < 0) throw new RangeError("sourceEnd out of bounds");
      m > this.length && (m = this.length), t.length - e < m - f && (m = t.length - e + f);
      const d = m - f;
      return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, f, m) : Uint8Array.prototype.set.call(
        t,
        this.subarray(f, m),
        e
      ), d;
    }, n.prototype.fill = function(t, e, f, m) {
      if (typeof t == "string") {
        if (typeof e == "string" ? (m = e, e = 0, f = this.length) : typeof f == "string" && (m = f, f = this.length), m !== void 0 && typeof m != "string")
          throw new TypeError("encoding must be a string");
        if (typeof m == "string" && !n.isEncoding(m))
          throw new TypeError("Unknown encoding: " + m);
        if (t.length === 1) {
          const a = t.charCodeAt(0);
          (m === "utf8" && a < 128 || m === "latin1") && (t = a);
        }
      } else typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
      if (e < 0 || this.length < e || this.length < f)
        throw new RangeError("Out of range index");
      if (f <= e)
        return this;
      e = e >>> 0, f = f === void 0 ? this.length : f >>> 0, t || (t = 0);
      let d;
      if (typeof t == "number")
        for (d = e; d < f; ++d)
          this[d] = t;
      else {
        const a = n.isBuffer(t) ? t : n.from(t, m), C = a.length;
        if (C === 0)
          throw new TypeError('The value "' + t + '" is invalid for argument "value"');
        for (d = 0; d < f - e; ++d)
          this[d + e] = a[d % C];
      }
      return this;
    };
    const F = {};
    function tt(i, t, e) {
      F[i] = class extends e {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: t.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${i}]`, this.stack, delete this.name;
        }
        get code() {
          return i;
        }
        set code(m) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: m,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${i}]: ${this.message}`;
        }
      };
    }
    tt(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(i) {
        return i ? `${i} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), tt(
      "ERR_INVALID_ARG_TYPE",
      function(i, t) {
        return `The "${i}" argument must be of type number. Received type ${typeof t}`;
      },
      TypeError
    ), tt(
      "ERR_OUT_OF_RANGE",
      function(i, t, e) {
        let f = `The value of "${i}" is out of range.`, m = e;
        return Number.isInteger(e) && Math.abs(e) > 2 ** 32 ? m = z(String(e)) : typeof e == "bigint" && (m = String(e), (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) && (m = z(m)), m += "n"), f += ` It must be ${t}. Received ${m}`, f;
      },
      RangeError
    );
    function z(i) {
      let t = "", e = i.length;
      const f = i[0] === "-" ? 1 : 0;
      for (; e >= f + 4; e -= 3)
        t = `_${i.slice(e - 3, e)}${t}`;
      return `${i.slice(0, e)}${t}`;
    }
    function ot(i, t, e) {
      R(t, "offset"), (i[t] === void 0 || i[t + e] === void 0) && O(t, i.length - (e + 1));
    }
    function _t(i, t, e, f, m, d) {
      if (i > e || i < t) {
        const a = typeof t == "bigint" ? "n" : "";
        let C;
        throw t === 0 || t === BigInt(0) ? C = `>= 0${a} and < 2${a} ** ${(d + 1) * 8}${a}` : C = `>= -(2${a} ** ${(d + 1) * 8 - 1}${a}) and < 2 ** ${(d + 1) * 8 - 1}${a}`, new F.ERR_OUT_OF_RANGE("value", C, i);
      }
      ot(f, m, d);
    }
    function R(i, t) {
      if (typeof i != "number")
        throw new F.ERR_INVALID_ARG_TYPE(t, "number", i);
    }
    function O(i, t, e) {
      throw Math.floor(i) !== i ? (R(i, e), new F.ERR_OUT_OF_RANGE("offset", "an integer", i)) : t < 0 ? new F.ERR_BUFFER_OUT_OF_BOUNDS() : new F.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${t}`,
        i
      );
    }
    const J = /[^+/0-9A-Za-z-_]/g;
    function ht(i) {
      if (i = i.split("=")[0], i = i.trim().replace(J, ""), i.length < 2) return "";
      for (; i.length % 4 !== 0; )
        i = i + "=";
      return i;
    }
    function Z(i, t) {
      t = t || 1 / 0;
      let e;
      const f = i.length;
      let m = null;
      const d = [];
      for (let a = 0; a < f; ++a) {
        if (e = i.charCodeAt(a), e > 55295 && e < 57344) {
          if (!m) {
            if (e > 56319) {
              (t -= 3) > -1 && d.push(239, 191, 189);
              continue;
            } else if (a + 1 === f) {
              (t -= 3) > -1 && d.push(239, 191, 189);
              continue;
            }
            m = e;
            continue;
          }
          if (e < 56320) {
            (t -= 3) > -1 && d.push(239, 191, 189), m = e;
            continue;
          }
          e = (m - 55296 << 10 | e - 56320) + 65536;
        } else m && (t -= 3) > -1 && d.push(239, 191, 189);
        if (m = null, e < 128) {
          if ((t -= 1) < 0) break;
          d.push(e);
        } else if (e < 2048) {
          if ((t -= 2) < 0) break;
          d.push(
            e >> 6 | 192,
            e & 63 | 128
          );
        } else if (e < 65536) {
          if ((t -= 3) < 0) break;
          d.push(
            e >> 12 | 224,
            e >> 6 & 63 | 128,
            e & 63 | 128
          );
        } else if (e < 1114112) {
          if ((t -= 4) < 0) break;
          d.push(
            e >> 18 | 240,
            e >> 12 & 63 | 128,
            e >> 6 & 63 | 128,
            e & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return d;
    }
    function Q(i) {
      const t = [];
      for (let e = 0; e < i.length; ++e)
        t.push(i.charCodeAt(e) & 255);
      return t;
    }
    function $(i, t) {
      let e, f, m;
      const d = [];
      for (let a = 0; a < i.length && !((t -= 2) < 0); ++a)
        e = i.charCodeAt(a), f = e >> 8, m = e % 256, d.push(m), d.push(f);
      return d;
    }
    function gt(i) {
      return s.toByteArray(ht(i));
    }
    function nt(i, t, e, f) {
      let m;
      for (m = 0; m < f && !(m + e >= t.length || m >= i.length); ++m)
        t[m + e] = i[m];
      return m;
    }
    function K(i, t) {
      return i instanceof t || i != null && i.constructor != null && i.constructor.name != null && i.constructor.name === t.name;
    }
    function it(i) {
      return i !== i;
    }
    const yt = (function() {
      const i = "0123456789abcdef", t = new Array(256);
      for (let e = 0; e < 16; ++e) {
        const f = e * 16;
        for (let m = 0; m < 16; ++m)
          t[f + m] = i[e] + i[m];
      }
      return t;
    })();
    function X(i) {
      return typeof BigInt > "u" ? wt : i;
    }
    function wt() {
      throw new Error("BigInt not supported");
    }
  })(ne)), ne;
}
var re, He;
function xM() {
  return He || (He = 1, re = xn()), re;
}
var Me;
function SM() {
  if (Me) return ee;
  Me = 1;
  var l = xM().Buffer, s = l.isEncoding || function(g) {
    switch (g = "" + g, g && g.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function r(g) {
    if (!g) return "utf8";
    for (var w; ; )
      switch (g) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return g;
        default:
          if (w) return;
          g = ("" + g).toLowerCase(), w = !0;
      }
  }
  function h(g) {
    var w = r(g);
    if (typeof w != "string" && (l.isEncoding === s || !s(g))) throw new Error("Unknown encoding: " + g);
    return w || g;
  }
  ee.StringDecoder = u;
  function u(g) {
    this.encoding = h(g);
    var w;
    switch (this.encoding) {
      case "utf16le":
        this.text = L, this.end = B, w = 4;
        break;
      case "utf8":
        this.fillLast = p, w = 4;
        break;
      case "base64":
        this.text = E, this.end = A, w = 3;
        break;
      default:
        this.write = b, this.end = S;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = l.allocUnsafe(w);
  }
  u.prototype.write = function(g) {
    if (g.length === 0) return "";
    var w, q;
    if (this.lastNeed) {
      if (w = this.fillLast(g), w === void 0) return "";
      q = this.lastNeed, this.lastNeed = 0;
    } else
      q = 0;
    return q < g.length ? w ? w + this.text(g, q) : this.text(g, q) : w || "";
  }, u.prototype.end = x, u.prototype.text = y, u.prototype.fillLast = function(g) {
    if (this.lastNeed <= g.length)
      return g.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    g.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, g.length), this.lastNeed -= g.length;
  };
  function c(g) {
    return g <= 127 ? 0 : g >> 5 === 6 ? 2 : g >> 4 === 14 ? 3 : g >> 3 === 30 ? 4 : -1;
  }
  function o(g, w, q) {
    var _ = w.length - 1;
    if (_ < q) return 0;
    var v = c(w[_]);
    return v >= 0 ? (v > 0 && (g.lastNeed = v - 1), v) : --_ < q ? 0 : (v = c(w[_]), v >= 0 ? (v > 0 && (g.lastNeed = v - 2), v) : --_ < q ? 0 : (v = c(w[_]), v >= 0 ? (v > 0 && (v === 2 ? v = 0 : g.lastNeed = v - 3), v) : 0));
  }
  function n(g, w, q) {
    if ((w[0] & 192) !== 128)
      return g.lastNeed = 0, "�".repeat(q);
    if (g.lastNeed > 1 && w.length > 1) {
      if ((w[1] & 192) !== 128)
        return g.lastNeed = 1, "�".repeat(q + 1);
      if (g.lastNeed > 2 && w.length > 2 && (w[2] & 192) !== 128)
        return g.lastNeed = 2, "�".repeat(q + 2);
    }
  }
  function p(g) {
    var w = this.lastTotal - this.lastNeed, q = n(this, g, w);
    if (q !== void 0) return q;
    if (this.lastNeed <= g.length)
      return g.copy(this.lastChar, w, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    g.copy(this.lastChar, w, 0, g.length), this.lastNeed -= g.length;
  }
  function y(g, w) {
    var q = o(this, g, w);
    if (!this.lastNeed) return g.toString("utf8", w);
    this.lastTotal = q;
    var _ = g.length - (q - this.lastNeed);
    return g.copy(this.lastChar, 0, _), g.toString("utf8", w, _);
  }
  function x(g) {
    var w = g && g.length ? this.write(g) : "";
    return this.lastNeed ? w + "�".repeat(this.lastTotal - this.lastNeed) : w;
  }
  function L(g, w) {
    if ((g.length - w) % 2 === 0) {
      var q = g.toString("utf16le", w);
      if (q) {
        var _ = q.charCodeAt(q.length - 1);
        if (_ >= 55296 && _ <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = g[g.length - 2], this.lastChar[1] = g[g.length - 1], q.slice(0, -1);
      }
      return q;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = g[g.length - 1], g.toString("utf16le", w, g.length - 1);
  }
  function B(g) {
    var w = g && g.length ? this.write(g) : "";
    if (this.lastNeed) {
      var q = this.lastTotal - this.lastNeed;
      return w + this.lastChar.toString("utf16le", 0, q);
    }
    return w;
  }
  function E(g, w) {
    var q = (g.length - w) % 3;
    return q === 0 ? g.toString("base64", w) : (this.lastNeed = 3 - q, this.lastTotal = 3, q === 1 ? this.lastChar[0] = g[g.length - 1] : (this.lastChar[0] = g[g.length - 2], this.lastChar[1] = g[g.length - 1]), g.toString("base64", w, g.length - q));
  }
  function A(g) {
    var w = g && g.length ? this.write(g) : "";
    return this.lastNeed ? w + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : w;
  }
  function b(g) {
    return g.toString(this.encoding);
  }
  function S(g) {
    return g && g.length ? this.write(g) : "";
  }
  return ee;
}
var se, $e;
function Sn() {
  if ($e) return se;
  $e = 1, se = u;
  var l = wn(), s = Re.Writable || Re.Writable, r = SM().StringDecoder, h = xn().Buffer;
  function u(c, o) {
    var n = this._parser = new l(c, o), p = this._decoder = new r();
    s.call(this, { decodeStrings: !1 }), this.once("finish", function() {
      n.end(p.end());
    });
  }
  return $t()(u, s), s.prototype._write = function(c, o, n) {
    c instanceof h && (c = this._decoder.write(c)), this._parser.write(c), n();
  }, se;
}
var oe, Pe;
function AM() {
  if (Pe) return oe;
  Pe = 1, oe = s;
  var l = Sn();
  function s(u) {
    l.call(this, new r(this), u);
  }
  $t()(s, l), s.prototype.readable = !0;
  function r(u) {
    this.scope = u;
  }
  var h = Ot().EVENTS;
  return Object.keys(h).forEach(function(u) {
    if (h[u] === 0)
      r.prototype["on" + u] = function() {
        this.scope.emit(u);
      };
    else if (h[u] === 1)
      r.prototype["on" + u] = function(c) {
        this.scope.emit(u, c);
      };
    else if (h[u] === 2)
      r.prototype["on" + u] = function(c, o) {
        this.scope.emit(u, c, o);
      };
    else
      throw Error("wrong number of arguments!");
  }), oe;
}
var ie, Ge;
function TM() {
  if (Ge) return ie;
  Ge = 1, ie = l;
  function l(r) {
    this._cbs = r || {};
  }
  var s = Ot().EVENTS;
  return Object.keys(s).forEach(function(r) {
    if (s[r] === 0)
      r = "on" + r, l.prototype[r] = function() {
        this._cbs[r] && this._cbs[r]();
      };
    else if (s[r] === 1)
      r = "on" + r, l.prototype[r] = function(h) {
        this._cbs[r] && this._cbs[r](h);
      };
    else if (s[r] === 2)
      r = "on" + r, l.prototype[r] = function(h, u) {
        this._cbs[r] && this._cbs[r](h, u);
      };
    else
      throw Error("wrong number of arguments");
  }), ie;
}
var ae = { exports: {} }, ce = { exports: {} }, le, Ve;
function BM() {
  return Ve || (Ve = 1, le = {
    Text: "text",
    //Text
    Directive: "directive",
    //<? ... ?>
    Comment: "comment",
    //<!-- ... -->
    Script: "script",
    //<script> tags
    Style: "style",
    //<style> tags
    Tag: "tag",
    //Any tag
    CDATA: "cdata",
    //<![CDATA[ ... ]]>
    isTag: function(l) {
      return l.type === "tag" || l.type === "script" || l.type === "style";
    }
  }), le;
}
var et = {}, Dt = {}, je;
function LM() {
  if (je) return Dt;
  je = 1;
  var l = u(ve), s = c(l);
  Dt.XML = x(l, s);
  var r = u(me), h = c(r);
  Dt.HTML = x(r, h);
  function u(E) {
    return Object.keys(E).sort().reduce(function(A, b) {
      return A[E[b]] = "&" + b + ";", A;
    }, {});
  }
  function c(E) {
    var A = [], b = [];
    return Object.keys(E).forEach(function(S) {
      S.length === 1 ? A.push("\\" + S) : b.push(S);
    }), b.unshift("[" + A.join("") + "]"), new RegExp(b.join("|"), "g");
  }
  var o = /[^\0-\x7F]/g, n = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  function p(E) {
    return "&#x" + E.charCodeAt(0).toString(16).toUpperCase() + ";";
  }
  function y(E) {
    var A = E.charCodeAt(0), b = E.charCodeAt(1), S = (A - 55296) * 1024 + b - 56320 + 65536;
    return "&#x" + S.toString(16).toUpperCase() + ";";
  }
  function x(E, A) {
    function b(S) {
      return E[S];
    }
    return function(S) {
      return S.replace(A, b).replace(n, y).replace(o, p);
    };
  }
  var L = c(l);
  function B(E) {
    return E.replace(L, p).replace(n, y).replace(o, p);
  }
  return Dt.escape = B, Dt;
}
var ue, ze;
function NM() {
  if (ze) return ue;
  ze = 1;
  var l = me, s = yn, r = ve, h = bn(), u = o(r), c = o(l);
  function o(x) {
    var L = Object.keys(x).join("|"), B = y(x);
    L += "|#[xX][\\da-fA-F]+|#\\d+";
    var E = new RegExp("&(?:" + L + ");", "g");
    return function(A) {
      return String(A).replace(E, B);
    };
  }
  var n = (function() {
    for (var x = Object.keys(s).sort(p), L = Object.keys(l).sort(p), B = 0, E = 0; B < L.length; B++)
      x[E] === L[B] ? (L[B] += ";?", E++) : L[B] += ";";
    var A = new RegExp("&(?:" + L.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), b = y(l);
    function S(g) {
      return g.substr(-1) !== ";" && (g += ";"), b(g);
    }
    return function(g) {
      return String(g).replace(A, S);
    };
  })();
  function p(x, L) {
    return x < L ? 1 : -1;
  }
  function y(x) {
    return function(B) {
      return B.charAt(1) === "#" ? B.charAt(2) === "X" || B.charAt(2) === "x" ? h(parseInt(B.substr(3), 16)) : h(parseInt(B.substr(2), 10)) : x[B.slice(1, -1)];
    };
  }
  return ue = {
    XML: u,
    HTML: n,
    HTMLStrict: c
  }, ue;
}
var Qe;
function kM() {
  if (Qe) return et;
  Qe = 1;
  var l = LM(), s = NM();
  return et.decode = function(r, h) {
    return (!h || h <= 0 ? s.XML : s.HTML)(r);
  }, et.decodeStrict = function(r, h) {
    return (!h || h <= 0 ? s.XML : s.HTMLStrict)(r);
  }, et.encode = function(r, h) {
    return (!h || h <= 0 ? l.XML : l.HTML)(r);
  }, et.encodeXML = l.XML, et.encodeHTML4 = et.encodeHTML5 = et.encodeHTML = l.HTML, et.decodeXML = et.decodeXMLStrict = s.XML, et.decodeHTML4 = et.decodeHTML5 = et.decodeHTML = s.HTML, et.decodeHTML4Strict = et.decodeHTML5Strict = et.decodeHTMLStrict = s.HTMLStrict, et.escape = l.escape, et;
}
var We;
function qM() {
  if (We) return ce.exports;
  We = 1;
  var l = BM(), s = kM(), r = {
    __proto__: null,
    allowfullscreen: !0,
    async: !0,
    autofocus: !0,
    autoplay: !0,
    checked: !0,
    controls: !0,
    default: !0,
    defer: !0,
    disabled: !0,
    hidden: !0,
    ismap: !0,
    loop: !0,
    multiple: !0,
    muted: !0,
    open: !0,
    readonly: !0,
    required: !0,
    reversed: !0,
    scoped: !0,
    seamless: !0,
    selected: !0,
    typemustmatch: !0
  }, h = {
    __proto__: null,
    style: !0,
    script: !0,
    xmp: !0,
    iframe: !0,
    noembed: !0,
    noframes: !0,
    plaintext: !0,
    noscript: !0
  };
  function u(B, E) {
    if (B) {
      var A = "", b;
      for (var S in B)
        b = B[S], A && (A += " "), !b && r[S] ? A += S : A += S + '="' + (E.decodeEntities ? s.encodeXML(b) : b) + '"';
      return A;
    }
  }
  var c = {
    __proto__: null,
    area: !0,
    base: !0,
    basefont: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    frame: !0,
    hr: !0,
    img: !0,
    input: !0,
    isindex: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }, o = ce.exports = function(B, E) {
    !Array.isArray(B) && !B.cheerio && (B = [B]), E = E || {};
    for (var A = "", b = 0; b < B.length; b++) {
      var S = B[b];
      S.type === "root" ? A += o(S.children, E) : l.isTag(S) ? A += n(S, E) : S.type === l.Directive ? A += p(S) : S.type === l.Comment ? A += L(S) : S.type === l.CDATA ? A += x(S) : A += y(S, E);
    }
    return A;
  };
  function n(B, E) {
    B.name === "svg" && (E = { decodeEntities: E.decodeEntities, xmlMode: !0 });
    var A = "<" + B.name, b = u(B.attribs, E);
    return b && (A += " " + b), E.xmlMode && (!B.children || B.children.length === 0) ? A += "/>" : (A += ">", B.children && (A += o(B.children, E)), (!c[B.name] || E.xmlMode) && (A += "</" + B.name + ">")), A;
  }
  function p(B) {
    return "<" + B.data + ">";
  }
  function y(B, E) {
    var A = B.data || "";
    return E.decodeEntities && !(B.parent && B.parent.name in h) && (A = s.encodeXML(A)), A;
  }
  function x(B) {
    return "<![CDATA[" + B.children[0].data + "]]>";
  }
  function L(B) {
    return "<!--" + B.data + "-->";
  }
  return ce.exports;
}
var he, Ye;
function DM() {
  if (Ye) return he;
  Ye = 1;
  var l = Rt(), s = qM(), r = l.isTag;
  he = {
    getInnerHTML: h,
    getOuterHTML: s,
    getText: u
  };
  function h(c, o) {
    return c.children ? c.children.map(function(n) {
      return s(n, o);
    }).join("") : "";
  }
  function u(c) {
    return Array.isArray(c) ? c.map(u).join("") : r(c) ? c.name === "br" ? `
` : u(c.children) : c.type === l.CDATA ? u(c.children) : c.type === l.Text ? c.data : "";
  }
  return he;
}
var Et = {}, Xe;
function IM() {
  if (Xe) return Et;
  Xe = 1;
  var l = Et.getChildren = function(r) {
    return r.children;
  }, s = Et.getParent = function(r) {
    return r.parent;
  };
  return Et.getSiblings = function(r) {
    var h = s(r);
    return h ? l(h) : [r];
  }, Et.getAttributeValue = function(r, h) {
    return r.attribs && r.attribs[h];
  }, Et.hasAttrib = function(r, h) {
    return !!r.attribs && hasOwnProperty.call(r.attribs, h);
  }, Et.getName = function(r) {
    return r.name;
  }, Et;
}
var At = {}, Je;
function CM() {
  return Je || (Je = 1, At.removeElement = function(l) {
    if (l.prev && (l.prev.next = l.next), l.next && (l.next.prev = l.prev), l.parent) {
      var s = l.parent.children;
      s.splice(s.lastIndexOf(l), 1);
    }
  }, At.replaceElement = function(l, s) {
    var r = s.prev = l.prev;
    r && (r.next = s);
    var h = s.next = l.next;
    h && (h.prev = s);
    var u = s.parent = l.parent;
    if (u) {
      var c = u.children;
      c[c.lastIndexOf(l)] = s;
    }
  }, At.appendChild = function(l, s) {
    if (s.parent = l, l.children.push(s) !== 1) {
      var r = l.children[l.children.length - 2];
      r.next = s, s.prev = r, s.next = null;
    }
  }, At.append = function(l, s) {
    var r = l.parent, h = l.next;
    if (s.next = h, s.prev = l, l.next = s, s.parent = r, h) {
      if (h.prev = s, r) {
        var u = r.children;
        u.splice(u.lastIndexOf(h), 0, s);
      }
    } else r && r.children.push(s);
  }, At.prepend = function(l, s) {
    var r = l.parent;
    if (r) {
      var h = r.children;
      h.splice(h.lastIndexOf(l), 0, s);
    }
    l.prev && (l.prev.next = s), s.parent = r, s.prev = l.prev, s.next = l, l.prev = s;
  }), At;
}
var pe, Ze;
function RM() {
  if (Ze) return pe;
  Ze = 1;
  var l = Rt().isTag;
  pe = {
    filter: s,
    find: r,
    findOneChild: h,
    findOne: u,
    existsOne: c,
    findAll: o
  };
  function s(n, p, y, x) {
    return Array.isArray(p) || (p = [p]), (typeof x != "number" || !isFinite(x)) && (x = 1 / 0), r(n, p, y !== !1, x);
  }
  function r(n, p, y, x) {
    for (var L = [], B, E = 0, A = p.length; E < A && !(n(p[E]) && (L.push(p[E]), --x <= 0) || (B = p[E].children, y && B && B.length > 0 && (B = r(n, B, y, x), L = L.concat(B), x -= B.length, x <= 0))); E++)
      ;
    return L;
  }
  function h(n, p) {
    for (var y = 0, x = p.length; y < x; y++)
      if (n(p[y])) return p[y];
    return null;
  }
  function u(n, p) {
    for (var y = null, x = 0, L = p.length; x < L && !y; x++)
      if (l(p[x]))
        n(p[x]) ? y = p[x] : p[x].children.length > 0 && (y = u(n, p[x].children));
      else continue;
    return y;
  }
  function c(n, p) {
    for (var y = 0, x = p.length; y < x; y++)
      if (l(p[y]) && (n(p[y]) || p[y].children.length > 0 && c(n, p[y].children)))
        return !0;
    return !1;
  }
  function o(n, p) {
    for (var y = [], x = [p]; x.length; ) {
      for (var L = x.pop(), B = 0, E = L.length; B < E; B++)
        l(L[B]) && n(L[B]) && y.push(L[B]);
      for (; E-- > 0; )
        L[E].children && L[E].children.length > 0 && x.push(L[E].children);
    }
    return y;
  }
  return pe;
}
var xt = {}, Ke;
function OM() {
  if (Ke) return xt;
  Ke = 1;
  var l = Rt(), s = xt.isTag = l.isTag;
  xt.testElement = function(c, o) {
    for (var n in c)
      if (c.hasOwnProperty(n)) {
        if (n === "tag_name") {
          if (!s(o) || !c.tag_name(o.name))
            return !1;
        } else if (n === "tag_type") {
          if (!c.tag_type(o.type)) return !1;
        } else if (n === "tag_contains") {
          if (s(o) || !c.tag_contains(o.data))
            return !1;
        } else if (!o.attribs || !c[n](o.attribs[n]))
          return !1;
      }
    return !0;
  };
  var r = {
    tag_name: function(c) {
      return typeof c == "function" ? function(o) {
        return s(o) && c(o.name);
      } : c === "*" ? s : function(o) {
        return s(o) && o.name === c;
      };
    },
    tag_type: function(c) {
      return typeof c == "function" ? function(o) {
        return c(o.type);
      } : function(o) {
        return o.type === c;
      };
    },
    tag_contains: function(c) {
      return typeof c == "function" ? function(o) {
        return !s(o) && c(o.data);
      } : function(o) {
        return !s(o) && o.data === c;
      };
    }
  };
  function h(c, o) {
    return typeof o == "function" ? function(n) {
      return n.attribs && o(n.attribs[c]);
    } : function(n) {
      return n.attribs && n.attribs[c] === o;
    };
  }
  function u(c, o) {
    return function(n) {
      return c(n) || o(n);
    };
  }
  return xt.getElements = function(c, o, n, p) {
    var y = Object.keys(c).map(function(x) {
      var L = c[x];
      return x in r ? r[x](L) : h(x, L);
    });
    return y.length === 0 ? [] : this.filter(
      y.reduce(u),
      o,
      n,
      p
    );
  }, xt.getElementById = function(c, o, n) {
    return Array.isArray(o) || (o = [o]), this.findOne(h("id", c), o, n !== !1);
  }, xt.getElementsByTagName = function(c, o, n, p) {
    return this.filter(r.tag_name(c), o, n, p);
  }, xt.getElementsByTagType = function(c, o, n, p) {
    return this.filter(r.tag_type(c), o, n, p);
  }, xt;
}
var It = {}, tn;
function FM() {
  if (tn) return It;
  tn = 1, It.removeSubsets = function(r) {
    for (var h = r.length, u, c, o; --h > -1; ) {
      for (u = c = r[h], r[h] = null, o = !0; c; ) {
        if (r.indexOf(c) > -1) {
          o = !1, r.splice(h, 1);
          break;
        }
        c = c.parent;
      }
      o && (r[h] = u);
    }
    return r;
  };
  var l = {
    DISCONNECTED: 1,
    PRECEDING: 2,
    FOLLOWING: 4,
    CONTAINS: 8,
    CONTAINED_BY: 16
  }, s = It.compareDocumentPosition = function(r, h) {
    var u = [], c = [], o, n, p, y, x, L;
    if (r === h)
      return 0;
    for (o = r; o; )
      u.unshift(o), o = o.parent;
    for (o = h; o; )
      c.unshift(o), o = o.parent;
    for (L = 0; u[L] === c[L]; )
      L++;
    return L === 0 ? l.DISCONNECTED : (n = u[L - 1], p = n.children, y = u[L], x = c[L], p.indexOf(y) > p.indexOf(x) ? n === h ? l.FOLLOWING | l.CONTAINED_BY : l.FOLLOWING : n === r ? l.PRECEDING | l.CONTAINS : l.PRECEDING);
  };
  return It.uniqueSort = function(r) {
    var h = r.length, u, c;
    for (r = r.slice(); --h > -1; )
      u = r[h], c = r.indexOf(u), c > -1 && c < h && r.splice(h, 1);
    return r.sort(function(o, n) {
      var p = s(o, n);
      return p & l.PRECEDING ? -1 : p & l.FOLLOWING ? 1 : 0;
    }), r;
  }, It;
}
var en;
function UM() {
  return en || (en = 1, (function(l) {
    var s = l.exports;
    [
      DM(),
      IM(),
      CM(),
      RM(),
      OM(),
      FM()
    ].forEach(function(r) {
      Object.keys(r).forEach(function(h) {
        s[h] = r[h].bind(s);
      });
    });
  })(ae)), ae.exports;
}
var fe, nn;
function HM() {
  if (nn) return fe;
  nn = 1, fe = l;
  function l(r) {
    this._cbs = r || {}, this.events = [];
  }
  var s = Ot().EVENTS;
  return Object.keys(s).forEach(function(r) {
    if (s[r] === 0)
      r = "on" + r, l.prototype[r] = function() {
        this.events.push([r]), this._cbs[r] && this._cbs[r]();
      };
    else if (s[r] === 1)
      r = "on" + r, l.prototype[r] = function(h) {
        this.events.push([r, h]), this._cbs[r] && this._cbs[r](h);
      };
    else if (s[r] === 2)
      r = "on" + r, l.prototype[r] = function(h, u) {
        this.events.push([r, h, u]), this._cbs[r] && this._cbs[r](h, u);
      };
    else
      throw Error("wrong number of arguments");
  }), l.prototype.onreset = function() {
    this.events = [], this._cbs.onreset && this._cbs.onreset();
  }, l.prototype.restart = function() {
    this._cbs.onreset && this._cbs.onreset();
    for (var r = 0, h = this.events.length; r < h; r++)
      if (this._cbs[this.events[r][0]]) {
        var u = this.events[r].length;
        u === 1 ? this._cbs[this.events[r][0]]() : u === 2 ? this._cbs[this.events[r][0]](this.events[r][1]) : this._cbs[this.events[r][0]](this.events[r][1], this.events[r][2]);
      }
  }, fe;
}
var rn;
function Ot() {
  return rn || (rn = 1, (function(l) {
    var s = wn(), r = vM();
    function h(u, c) {
      return delete l.exports[u], l.exports[u] = c, c;
    }
    l.exports = {
      Parser: s,
      Tokenizer: _n(),
      ElementType: Rt(),
      DomHandler: r,
      get FeedHandler() {
        return h("FeedHandler", bM());
      },
      get Stream() {
        return h("Stream", AM());
      },
      get WritableStream() {
        return h("WritableStream", Sn());
      },
      get ProxyHandler() {
        return h("ProxyHandler", TM());
      },
      get DomUtils() {
        return h("DomUtils", UM());
      },
      get CollectingHandler() {
        return h("CollectingHandler", HM());
      },
      // For legacy support
      DefaultHandler: r,
      get RssHandler() {
        return h("RssHandler", this.FeedHandler);
      },
      //helper methods
      parseDOM: function(u, c) {
        var o = new r(c);
        return new s(o, c).end(u), o.dom;
      },
      parseFeed: function(u, c) {
        var o = new l.exports.FeedHandler(c);
        return new s(o, c).end(u), o.dom;
      },
      createDomStream: function(u, c, o) {
        var n = new r(u, c, o);
        return new s(n, c);
      },
      // List of all events that the parser emits
      EVENTS: {
        /* Format: eventname: number of arguments */
        attribute: 2,
        cdatastart: 0,
        cdataend: 0,
        text: 1,
        processinginstruction: 2,
        comment: 1,
        commentend: 0,
        closetag: 1,
        opentag: 2,
        opentagname: 1,
        error: 1,
        end: 0
      }
    };
  })(zt)), zt.exports;
}
var de, sn;
function MM() {
  if (sn) return de;
  sn = 1;
  var l = /* @__PURE__ */ (function() {
    function c(o, n) {
      for (var p = 0; p < n.length; p++) {
        var y = n[p];
        y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(o, y.key, y);
      }
    }
    return function(o, n, p) {
      return n && c(o.prototype, n), p && c(o, p), o;
    };
  })(), s = Ot(), r = h(s);
  function h(c) {
    return c && c.__esModule ? c : { default: c };
  }
  function u(c, o) {
    if (!(c instanceof o))
      throw new TypeError("Cannot call a class as a function");
  }
  return de = (function() {
    function c() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = o.decodeEntities, p = n === void 0 ? !0 : n;
      u(this, c), this.decodeEntities = p;
    }
    return l(c, [{
      key: "init",
      value: function() {
        this.olstack = [], this.inlineelements = ["strong", "b", "i", "em", "u", "a", "img", "code"], this.htmlblocklevelelement = ["div", "iframe", "script"], this.tabindent = "    ", this.nbsp = "\0";
      }
    }, {
      key: "parse",
      value: function(n, p) {
        var y = new r.default.DomHandler(function(L, B) {
          return L ? p(L, null) : p(null, B);
        }, { withDomLvl1: !1, withStartIndices: !1 }), x = new r.default.Parser(y, { decodeEntities: this.decodeEntities });
        x.write(n), x.end();
      }
    }, {
      key: "convert",
      value: function(n, p, y) {
        this.parse(n, (function(x, L) {
          return x ? p(x, null) : this.convertDom(L, function(B, E) {
            return B ? p(B, null) : p(null, E);
          }, y);
        }).bind(this));
      }
    }, {
      key: "convertDom",
      value: function(n, p) {
        var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, x = y.keepHtml, L = x === void 0 ? !1 : x;
        this.init(), this.walkNodes(n, { keepHtml: L }).then((function(B) {
          B || (B = "");
          var E = new RegExp(this.nbsp, "g");
          p(null, B.trim().replace(E, " "));
        }).bind(this)).catch(function(B) {
          p(B, null);
        });
      }
    }, {
      key: "walkNodes",
      value: function(n, p) {
        var y = this;
        return new Promise(function(x, L) {
          var B = [], E = function(S) {
            B.push(new Promise(function(g, w) {
              y.walkNode(g, w, p, n[S]);
            }));
          };
          for (var A in n)
            E(A);
          Promise.all(B).then(function(b) {
            x(b.join(""));
          }).catch(function(b) {
            L(b);
          });
        }).catch(function(x) {
          throw x;
        });
      }
    }, {
      key: "walkNode",
      value: function(n, p, y, x) {
        this.isText(x) ? n(this.text(x)) : this.walkNodes(x.children, y).then((function(L) {
          this.wrapNode(n, p, y, x, L);
        }).bind(this)).catch(function(L) {
          p(L);
        });
      }
    }, {
      key: "wrapNode",
      value: function(n, p, y, x, L) {
        var B = "", E = "wrap_" + x.name;
        E in this ? B = this[E](x, L) : y.keepHtml ? B = this.wrap_generic(x, L) : B = L;
        var A = this.getPreviousSiblingNonBlankText(x);
        if (A) {
          var b = this.isBlock(A);
          this.isInline(x) ? b && (B = `
` + B) : x.name !== "br" && !this.isList(x) && this.isBlock(x) && (b || (B = `
` + B));
        }
        n(B);
      }
      // handlers
    }, {
      key: "text",
      value: function(n) {
        var p = n.data;
        return p ? (this.hasAncestorOfType(n, ["code", "pre"]) || (n.prev && (this.isInline(n.prev) ? p = p.replace(/^\n+/, " ") : p = p.replace(/^\n+/, "")), n.next && (this.isInline(n.next) ? p = p.replace(/\n+$/, " ") : p = p.replace(/\n+$/, "")), p = p.replace(`
`, " ").replace(/\s+/g, " "), // if prev node is block, this node is not displayed on the same line, so left-trim
        (n.prev && this.isBlock(n.prev) || // if current node is block, this node is not displayed on the same line either, so left-trim
        n.parent && this.isBlock(n.parent) && this.isFirstChild(n)) && (p = p.replace(/^\s*/, "")), n.parent && this.isBlock(n.parent) && this.isLastChild(n) && (p = p.replace(/\s*$/, ""))), p) : "";
      }
    }, {
      key: "wrap_generic",
      value: function(n, p) {
        var y = "", x = Object.keys(n.attribs);
        for (var L in x)
          y += " " + x[L] + '="' + n.attribs[x[L]] + '"';
        return "<" + n.name + y + ">" + p.replace(/\s+/gm, " ") + "</" + n.name + ">" + (this.isHtmlBlockLevelElement(n.name) ? `
` : "");
      }
      // Block level elements
    }, {
      key: "wrap_h1",
      value: function(n, p) {
        return `
# ` + p + `
`;
      }
    }, {
      key: "wrap_h2",
      value: function(n, p) {
        return `
## ` + p + `
`;
      }
    }, {
      key: "wrap_h3",
      value: function(n, p) {
        return `
### ` + p + `
`;
      }
    }, {
      key: "wrap_h4",
      value: function(n, p) {
        return `
#### ` + p + `
`;
      }
    }, {
      key: "wrap_h5",
      value: function(n, p) {
        return `
##### ` + p + `
`;
      }
    }, {
      key: "wrap_h6",
      value: function(n, p) {
        return `
###### ` + p + `
`;
      }
    }, {
      key: "wrap_blockquote",
      value: function(n, p) {
        return `
` + p.trim().replace(/^/gm, "> ") + `
`;
      }
    }, {
      key: "wrap_pre",
      value: function(n, p) {
        return `
` + p.trim().replace(/^/gm, this.tabindent).replace(/ /g, this.nbsp) + `
`;
      }
    }, {
      key: "wrap_code",
      value: function(n, p) {
        return this.hasAncestorOfType(n, ["pre"]) ? p : "`" + p.trim() + "`";
      }
    }, {
      key: "wrap_ul",
      value: function(n, p) {
        return `
` + p.trim() + `
`;
      }
    }, {
      key: "wrap_ol",
      value: function(n, p) {
        return this.wrap_ul(n, p);
      }
    }, {
      key: "wrap_li",
      value: function(n, p) {
        var y = "* ";
        if (n.parent && n.parent.type === "tag" && n.parent.name === "ol") {
          for (var x = 1, L = n; L.prev; )
            L.prev.type === "tag" && L.prev.name === "li" && x++, L = L.prev;
          y = x + ". ";
        }
        var B = this.getFirstChildNonBlankText(n);
        if (B)
          if (this.isList(B))
            y = this.tabindent;
          else if (this.isBlock(B))
            y = `
` + y;
          else {
            var E = this.getPreviousSiblingNonBlankText(n);
            E && E.type === "tag" && E.name === "li" && this.isBlock(this.getFirstChildNonBlankText(E)) && (y = `
` + y);
          }
        return y + p.replace(/^/gm, this.tabindent).trim() + `
`;
      }
    }, {
      key: "wrap_p",
      value: function(n, p) {
        return `
` + p + `
`;
      }
    }, {
      key: "wrap_br",
      value: function() {
        return `  
`;
      }
    }, {
      key: "wrap_hr",
      value: function() {
        return `
* * *
`;
      }
      // Inline elements
    }, {
      key: "wrap_strong",
      value: function(n, p) {
        return "**" + p + "**";
      }
    }, {
      key: "wrap_b",
      value: function(n, p) {
        return this.wrap_strong(n, p);
      }
    }, {
      key: "wrap_em",
      value: function(n, p) {
        return "*" + p + "*";
      }
    }, {
      key: "wrap_i",
      value: function(n, p) {
        return this.wrap_em(n, p);
      }
    }, {
      key: "wrap_a",
      value: function(n, p) {
        var y = this.getAttrOrFalse("href", n), x = this.getAttrOrFalse("title", n);
        if (y) {
          if (y && y === p && (!x || x === ""))
            return "<" + y + ">";
          if ((y === p || y.replace(/^mailto:/, "") === p) && (!x || x === ""))
            return "<" + y.replace(/^mailto:/, "") + ">";
        } else return p;
        return "[" + p + "](" + (y || "") + (x ? ' "' + x + '"' : "") + ")";
      }
    }, {
      key: "wrap_img",
      value: function(n) {
        var p = this.getAttrOrFalse("alt", n), y = this.getAttrOrFalse("src", n), x = this.getAttrOrFalse("title", n);
        return "![" + (p || "") + "](" + (y || "") + (x ? ' "' + x + '"' : "") + ")";
      }
      // helpers
    }, {
      key: "hasAncestorOfType",
      value: function(n, p) {
        for (var y = n.parent; y; ) {
          if (p.indexOf(y.name) > -1)
            return !0;
          y = y.parent;
        }
        return !1;
      }
    }, {
      key: "isInline",
      value: function(n) {
        return n && n.type === "tag" && this.inlineelements.indexOf(n.name) >= 0;
      }
    }, {
      key: "isBlock",
      value: function(n) {
        return n && (n.type === "tag" || n.type === "script") && !this.isInline(n);
      }
    }, {
      key: "isText",
      value: function(n) {
        return n && n.type === "text";
      }
    }, {
      key: "isList",
      value: function(n) {
        return n && n.type === "tag" && (n.name === "ul" || n.name === "ol");
      }
    }, {
      key: "isHtmlBlockLevelElement",
      value: function(n) {
        return this.htmlblocklevelelement.indexOf(n) >= 0;
      }
    }, {
      key: "getPreviousSiblingNonBlankText",
      value: function(n) {
        for (var p = n, y = !0; y; ) {
          if (p && (p = p.prev), p && (p.type !== "text" || p.data.trim() !== ""))
            return p;
          if (!(p && !this.isFirstChildNonText(p)))
            break;
        }
        return null;
      }
    }, {
      key: "getFirstChildNonText",
      value: function(n) {
        for (var p = 0; p < n.children.length; ) {
          if (n.children[p] && n.children[p].type !== "text")
            return n.children[p];
          p++;
        }
        return null;
      }
    }, {
      key: "getFirstChildNonBlankText",
      value: function(n) {
        for (var p = 0; p < n.children.length; ) {
          if (n.children[p] && n.children[p].type !== "text" || n.children[p].data.trim() !== "")
            return n.children[p];
          p++;
        }
        return null;
      }
    }, {
      key: "isFirstChild",
      value: function(n) {
        return !(n && n.prev);
      }
    }, {
      key: "isFirstChildNonText",
      value: function(n) {
        return n.parent && this.getFirstChildNonText(n.parent) === n;
      }
    }, {
      key: "isLastChild",
      value: function(n) {
        return !n.next;
      }
    }, {
      key: "getAttrOrFalse",
      value: function(n, p) {
        return n in p.attribs ? p.attribs[n] : !1;
      }
    }]), c;
  })(), de;
}
var $M = MM();
const PM = /* @__PURE__ */ gn($M), on = `<div class="\\{classNames.LiteEditor\\}" data-action-mouseup="onPutCaret" data-action-keydown="onKeyDown" data-action-input="onInput" data-selector="lite-editor" contenteditable data-action-paste="onPaste" style="<!-- BEGIN showSource:exist -->display:none;<!-- END showSource:exist --><!-- BEGIN hideEditor:exist -->display:none;"<!-- END hideEditor:exist --><!-- BEGIN minHeight:exist -->min-height: {minHeight}px;<!-- END minHeight:exist --><!-- BEGIN maxHeight:exist -->max-height:{maxHeight}px;<!-- END maxHeight:exist -->">{value}</div>
<textarea class="\\{classNames.LiteEditorSource\\}" data-selector="lite-editor-source" style="<!-- BEGIN showSource:empty -->display:none;<!-- END showSource:empty --><!-- BEGIN minHeight:exist -->min-height: {minHeight}px;<!-- END minHeight:exist --><!-- BEGIN maxHeight:exist -->max-height:{maxHeight}px;<!-- END maxHeight:exist -->" {attr} data-bind-oneway="formatedValue" data-action-input="onDirectInput"></textarea>`, an = `<div class="\\{classNames.LiteEditorToolBox\\}" data-selector="lite-editor-toolbox">

	<!-- BEGIN source:exist -->
	<div class="\\{classNames.LiteEditorBtnGroupWrapRight\\}">
		<div class="\\{classNames.LiteEditorBtnGroup\\}">
			<button class="\\{classNames.LiteEditorBtn\\}<!-- BEGIN showSource:empty --> \\{classNames.LiteEditorBtnActive\\}<!-- END showSource:empty -->"
			 data-action-click="toggleSource" type="button" <!-- BEGIN showSource:empty --> disabled
				<!-- END showSource:empty -->
				<!-- BEGIN disableEditorMode:exist -->disabled
				<!-- END disableEditorMode:exist -->>
				<i class="\\{classNames.LiteEditorFontAbc\\}"></i>
			</button>
			<button class="\\{classNames.LiteEditorBtn\\}<!-- BEGIN showSource:exist --> \\{classNames.LiteEditorBtnActive\\}<!-- END showSource:exist -->"
			 data-action-click="toggleSource" type="button" <!-- BEGIN showSource:exist --> disabled
				<!-- END showSource:exist -->>
				<i class="\\{classNames.LiteEditorFontSource\\}"></i>
			</button>
		</div>
	</div>
	<!-- END source:exist -->

	<!-- BEGIN selectOptions.0:exist -->
	<div class="\\{classNames.LiteEditorSelectWrap\\}">
		<select class="\\{classNames.LiteEditorSelect\\}" <!-- BEGIN selectName:exist --> name="{selectName}"
			<!-- END selectName:exist -->data-action-change="changeOption" data-bind="selectedOption">
			<!-- BEGIN selectOptions:loop -->
			<option value="{value}">{label}</option>
			<!-- END selectOptions:loop -->
		</select>
		<!-- BEGIN extendLabel:exist -->
		<label>{extendLabel}</label>
		<input type="text" name="{selectName}[insertExtend]" class="\\{classNames.LiteEditorExtendInput\\}" data-bind="extendValue"
		/>
		<!-- END extendLabel:exist -->
	</div>
	<!-- END selectOptions.0:exist -->

	<div class="\\{classNames.LiteEditorBtnGroupWrap\\}" <!-- BEGIN hideBtns:exist --> style="display:none;"
		<!-- END hideBtns:exist -->>

		<!-- BEGIN groups:loop -->
		<div class="\\\\{classNames.LiteEditorBtnGroup\\\\}" data-selector="btn-group">
			<!-- \\BEGIN groups.{i}.items:loop -->

			<!-- \\BEGIN action:touch#redo -->
			<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}" data-action-click="redo" <!-- \\\\BEGIN canRedo:empty
			 --> disabled <!-- \\\\END canRedo:empty -->type="button">\\{label\\}</button>
			<!-- \\END action:touch#redo -->

			<!-- \\BEGIN action:touch#undo -->
			<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}" data-action-click="undo" <!-- \\\\BEGIN canUndo:empty
			 --> disabled <!-- \\\\END canUndo:empty -->type="button">\\{label\\}</button>
			<!-- \\END action:touch#undo -->

			<!-- \\BEGIN action:touch#extra -->
			<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}<!-- \\BEGIN selfClassName:exist --> \\{selfClassName\\}<!-- \\END selfClassName:exist -->"
			 data-action-click="onClick(\\{index\\})" type="button">\\{label\\}</button>
			<!-- \\END action:touch#extra -->

			<!-- \\BEGIN action:empty -->
			<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}<!-- \\BEGIN selfClassName:exist --> \\{selfClassName\\}<!-- \\END selfClassName:exist --><!-- \\BEGIN selected:exist --> \\\\\\{classNames.LiteEditorBtnActive\\\\\\}<!-- \\END selected:exist -->"
			 <!-- \\BEGIN tag:exist -->
				<!-- \\BEGIN selected:empty -->data-action-click="insertTag(\\{tag\\},\\{className\\},\\{sampleText\\})"
				<!-- \\END selected:empty -->
				<!-- \\BEGIN selected:exist -->data-action-click="unwrapTag(\\{tag\\},\\{className\\},\\{sampleText\\})"
				<!-- \\END selected:exist -->
				<!-- \\END tag:exist -->
				<!-- \\BEGIN tag:empty -->data-action-click="insertTag(span,\\{className\\},\\{sampleText\\})"
				<!-- \\END tag:empty -->
				type="button">\\{label\\}</button>
			<!-- \\END action:empty -->
			<!-- \\END groups.{i}.items:loop -->
		</div>
		<!-- END groups:loop -->
	</div>
</div>`, cn = `<div data-selector="lite-editor-tooltip">
	<!-- BEGIN tooltipLabel:exist -->
	<div class="\\{classNames.LiteEditorTooltipWrap\\}">
		<div class="\\{classNames.LiteEditorTooltipOuter\\}">
			<div class="\\{classNames.LiteEditorTooltipInner\\}">
				<div class="\\{classNames.LiteEditorTooltip\\}">
					<span class="\\{classNames.LiteEditorBtnCloseWrap\\}">
						<span class="\\{classNames.LiteEditorBtnCloseLabel\\}">\\{message.closeLabel\\}</span>
						<button type="button" data-action-click="closeTooltip()" class="\\{classNames.LiteEditorBtn\\} \\{classNames.LiteEditorBtnClose\\}">
							<i class="\\{classNames.LiteEditorFontClose\\}"></i>
						</button>
					</span>
					<!-- BEGIN linkNew:exist -->
					<h2 class="\\{classNames.LiteEditorTooltipTitle\\}">
						<i class="\\{classNames.LiteEditorFontLink\\}"></i>\\{message.addLinkTitle\\}</h2>
					<!-- END linkNew:exist -->
					<!-- BEGIN linkNew:empty -->
					<h2 class="\\{classNames.LiteEditorTooltipTitle\\}">
						<i class="\\{classNames.LiteEditorFontLink\\}"></i>\\{message.updateLinkTitle\\}</h2>
					<!-- END linkNew:empty -->
					<div class="\\{classNames.LiteEditorTooltipBody\\}">
						<table class="\\{classNames.LiteEditorTooltipTable\\}">
							<tr>
								<th>\\{message.linkLabel\\}</th>
								<td>
									<input type="text" data-bind="tooltipLabel" class="\\{classNames.LiteEditorTooltipInput\\}" data-action-keydown="preventSubmit()">
								</td>
							</tr>
							<tr>
								<th>\\{message.linkUrl\\}</th>
								<td>
									<input type="text" data-bind="tooltipUrl" class="\\{classNames.LiteEditorTooltipInput\\}" data-action-keydown="preventSubmit()">
								</td>
							</tr>
							<tr>
								<th>\\{message.targetBlank\\}</th>
								<td>
									<label>
									<input type="checkbox" data-bind="targetBlank" value="true" data-action-change="updateTargetBlank">
									\\{message.targetBlankLabel\\}
									</label>
								</td>
							</tr>

							<tr>
								<td></td>
								<td>
									<!-- BEGIN linkNew:exist -->
									<button type="button" data-action-click="insertAtag()" class="\\{classNames.LiteEditorBtn\\}">
										<i class="\\{classNames.LiteEditorFontLink\\}"></i>
										\\{message.addLink\\}
									</button>
									<!-- END linkNew:exist -->

									<!-- BEGIN linkNew:empty -->
									<button type="button" data-action-click="updateLink()" class="\\{classNames.LiteEditorBtn\\}">
										<i class="\\{classNames.LiteEditorFontUpdate\\}"></i>
										\\{message.updateLink\\}
									</button>
									<button type="button" data-action-click="removeLink()" class="\\{classNames.LiteEditorBtn\\}">
										<i class="\\{classNames.LiteEditorFontRemove\\}"></i>
										\\{message.removeLink\\}
									</button>
									<!-- END linkNew:empty -->
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END tooltipLabel:exist -->
</div>
`, GM = (l, s, r) => {
  let h;
  window.CustomEvent ? h = new CustomEvent(s, { cancelable: !0 }) : (h = document.createEvent("CustomEvent"), h.initCustomEvent(s, !1, !1, r)), l.dispatchEvent(h);
}, ln = (l) => {
  l && l.parentNode && l.parentNode.removeChild(l);
}, VM = (l, s) => {
  l.insertAdjacentHTML("beforebegin", s);
}, un = (l) => window.getSelection && window.getSelection().toString() ? window.getSelection() : document.getSelection && document.getSelection().toString() ? document.getSelection() : l && typeof l.selectionStart == "number" ? l.value.substr(l.selectionStart, l.selectionEnd - l.selectionStart) : "", jM = () => {
  if (window.getSelection) {
    const l = window.getSelection();
    if (l.getRangeAt && l.rangeCount)
      return l.getRangeAt(0);
  } else if (document.selection && document.selection.createRange)
    return document.selection.createRange();
  return null;
}, zM = (l) => {
  if (window.getSelection) {
    const s = window.getSelection();
    s.removeAllRanges(), s.addRange(l);
  } else document.selection && l.select && l.select();
}, QM = (l) => {
  let s;
  if (window.getSelection && window.getSelection().getRangeAt) {
    s = window.getSelection().getRangeAt(0), s.deleteContents();
    const r = document.createElement("div");
    r.innerHTML = l;
    let h = document.createDocumentFragment(), u;
    for (; u = r.firstChild; )
      h.appendChild(u);
    s.insertNode(h);
  } else document.selection && document.selection.createRange && (s = document.selection.createRange(), s.pasteHTML(l));
}, WM = (l) => {
  let s;
  if (window.getSelection && window.getSelection().getRangeAt) {
    const r = window.getSelection();
    s = r.getRangeAt(0), s.deleteContents();
    const h = document.createElement("div");
    h.innerHTML = l;
    const u = document.createDocumentFragment();
    let c;
    for (; c = h.firstChild; )
      u.appendChild(c);
    const o = t$(u), n = document.createRange();
    s.insertNode(o), n.setStart(o.firstChild, 0), n.setEnd(o.lastChild, o.lastChild.textContent.length), An(), r.addRange(n);
  } else document.selection && document.selection.createRange && (s = document.selection.createRange(), s.pasteHTML(l));
}, YM = (l) => {
  if (window.getSelection && window.getSelection().getRangeAt) {
    const s = window.getSelection(), r = s.getRangeAt(0), h = l.cloneNode(!0);
    let u = document.createDocumentFragment();
    l.remove(), u.appendChild(h);
    const c = u.appendChild(document.createTextNode("​")), o = document.createRange();
    r.insertNode(u), o.setStartAfter(c), o.setEndAfter(c), s.removeAllRanges(), s.addRange(o);
  }
}, hn = (l) => {
  const s = l.parentNode;
  for (; l.firstChild; )
    s.insertBefore(l.firstChild, l);
  s.removeChild(l);
}, pn = () => {
  if (window.getSelection) {
    const l = window.getSelection();
    if (l.rangeCount > 0)
      return l.getRangeAt(0).startContainer.parentNode;
  } else if (document.selection)
    return document.selection.createRange().parentElement();
}, An = () => {
  window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty();
}, Ct = (l, s) => {
  const r = l.selectionStart;
  l.value = `${l.value.substring(0, r)}${s}${l.value.substring(l.selectionEnd)}`, l.focus(), l.setSelectionRange(r, r + s.length);
}, XM = () => {
  if (window.getSelection)
    return window.getSelection().toString().length;
  if (document.selection)
    return document.selection().toString().length;
}, Bt = (l, s, r) => {
  const h = [].slice.call(l.childNodes);
  for (let u = 0, c = h.length; u < c; u++) {
    const o = h[u];
    if (o.nodeType === 3)
      if (o.length >= s) {
        const n = document.createRange(), p = window.getSelection();
        return r ? (n.setStart(o, 0), n.setEnd(o, r)) : (n.setStart(o, s), n.collapse(!0)), p.removeAllRanges(), p.addRange(n), -1;
      } else
        s -= o.length;
    else if (s = Bt(o, s), s === -1)
      return -1;
  }
  return s;
}, JM = (l) => {
  const s = [].slice.call(l.childNodes);
  for (let r = 0, h = s.length; r < h; r++) {
    const u = s[r];
    u.nodeType === 3 && (u.textContent = u.textContent.replace(/ /g, " "));
  }
}, Tt = (l) => {
  let s = 0;
  if (window.getSelection) {
    const r = window.getSelection().getRangeAt(0), h = r.cloneRange();
    h.selectNodeContents(l), h.setEnd(r.endContainer, r.endOffset), s = h.toString().length;
  } else if (document.selection && document.selection.createRange) {
    const r = document.selection.createRange(), h = document.body.createTextRange();
    h.moveToElementText(l), h.setEndPoint("EndToEnd", r), s = h.text.length;
  }
  return s;
}, ZM = (l) => {
  const s = l.childNodes, r = s.length;
  let h = 1;
  return s[r - h] ? s[r - h].tagName === "BR" : !1;
}, fn = (l) => l.replace(/(\n|\t)/g, ""), KM = () => {
  const l = window.navigator.userAgent.toLowerCase(), s = window.navigator.appVersion.toLowerCase();
  let r = "unknown";
  return l.indexOf("msie") != -1 ? s.indexOf("msie 6.") != -1 ? r = "ie6" : s.indexOf("msie 7.") != -1 ? r = "ie7" : s.indexOf("msie 8.") != -1 ? r = "ie8" : s.indexOf("msie 9.") != -1 ? r = "ie9" : s.indexOf("msie 10.") != -1 ? r = "ie10" : r = "ie" : l.indexOf("trident/7") != -1 ? r = "ie11" : l.indexOf("chrome") != -1 ? r = "chrome" : l.indexOf("safari") != -1 ? r = "safari" : l.indexOf("opera") != -1 ? r = "opera" : l.indexOf("firefox") != -1 && (r = "firefox"), r;
}, t$ = (l) => {
  let s;
  const r = l.childNodes;
  let h = 0;
  if (r && r.length) {
    for (; s = r[h++]; )
      if (s.nodeType === 1)
        return s;
  }
  return null;
}, Tn = (l, ...s) => {
  for (const r of s)
    if (r)
      for (const h of Object.keys(r)) {
        const u = r[h];
        u && typeof u == "object" && !Array.isArray(u) ? ((!l[h] || typeof l[h] != "object") && (l[h] = {}), Tn(l[h], u)) : l[h] = u;
      }
  return l;
}, dn = new PM({ decodeEntities: !1 }), e$ = [
  {
    label: '<i class="lite-editor-font-back"></i>',
    action: "undo",
    group: "action"
  },
  {
    label: '<i class="lite-editor-font-go"></i>',
    action: "redo",
    group: "action"
  },
  {
    label: '<i class="lite-editor-font-link"></i>',
    tag: "a",
    className: "",
    group: "link",
    sampleText: "link text"
  },
  {
    label: '<i class="lite-editor-font-bold"></i>',
    tag: "strong",
    className: "",
    group: "mark",
    sampleText: " "
  },
  {
    label: '<i class="lite-editor-font-italic"></i>',
    tag: "i",
    className: "",
    group: "mark",
    sampleText: " "
  },
  {
    label: '<i class="lite-editor-font-underline"></i>',
    tag: "u",
    className: "",
    group: "mark",
    sampleText: " "
  }
], n$ = {
  mode: "html",
  classNames: {
    LiteEditor: "lite-editor",
    LiteEditorSource: "lite-editor-source",
    LiteEditorBtn: "lite-editor-btn",
    LiteEditorBtnClose: "lite-editor-btn-close",
    LiteEditorBtnActive: "lite-editor-btn-active",
    LiteEditorBtnGroup: "lite-editor-btn-group",
    LiteEditorBtnGroupWrap: "lite-editor-btn-group-wrap",
    LiteEditorBtnGroupWrapRight: "lite-editor-btn-group-wrap-right",
    LiteEditorBtnCloseWrap: "lite-editor-btn-close-wrap",
    LiteEditorBtnCloseLabel: "lite-editor-btn-close-label",
    LiteEditorSelect: "lite-editor-select",
    LiteEditorSelectWrap: "lite-editor-select-wrap",
    LiteEditorToolBox: "lite-editor-toolbox",
    LiteEditorTooltip: "lite-editor-tooltip",
    LiteEditorTooltipWrap: "lite-editor-tooltip-wrap",
    LiteEditorTooltipOuter: "lite-editor-tooltip-outer",
    LiteEditorTooltipInner: "lite-editor-tooltip-inner",
    LiteEditorTooltipTable: "lite-editor-tooltip-table",
    LiteEditorTooltipTitle: "lite-editor-tooltip-title",
    LiteEditorTooltipBody: "lite-editor-tooltip-body",
    LiteEditorTooltipInput: "lite-editor-tooltip-input",
    LiteEditorExtendInput: "lite-editor-extend-input",
    LiteEditorFontLink: "lite-editor-font-link",
    LiteEditorFontRemove: "lite-editor-font-remove",
    LiteEditorFontUpdate: "lite-editor-font-update",
    LiteEditorFontClose: "lite-editor-font-close",
    LiteEditorFontSource: "lite-editor-font-source",
    LiteEditorFontAbc: "lite-editor-font-abc"
  },
  message: {
    addLinkTitle: "link",
    updateLinkTitle: "link",
    addLink: "add",
    updateLink: "update",
    removeLink: "remove",
    linkUrl: "URL",
    linkLabel: "label",
    closeLabel: "close",
    targetBlank: "target",
    targetBlankLabel: "Opens the linked page in a new window or tab"
  },
  voidElements: [
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "image",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "nextid",
    "param",
    "source",
    "track",
    "wbr"
  ],
  minHeight: 50,
  maxHeight: 400,
  decodeSource: !1,
  sourceFirst: !1,
  escapeNotRegisteredTags: !1,
  preserveSpace: !1,
  nl2br: !0,
  source: !0,
  selectOptions: [],
  selectedOption: "",
  btnOptions: e$,
  btnPosition: "top",
  relAttrForTargetBlank: "noopener noreferrer"
};
class s$ extends In {
  constructor(s, r) {
    super(), this.id = this._getUniqId();
    const h = typeof s == "string" ? document.querySelector(s) : s, u = `<div data-id='${this.id}'></div>`;
    this.data = Tn({}, n$, r), this.data.showSource = this.data.sourceFirst, this.data.disableEditorMode = !1, this.data.hideEditor = !1, this.data.tooltipLabel = "", this.data.tooltipUrl = "", this.data.tooltipClassName = "", this.data.attr = "", this.data.targetBlank = "false", this.data.linkNew = !0, r && r.btnOptions && (this.data.btnOptions = r.btnOptions), this.data.groups = this.makeBtnGroups(), this.stack = [], this.stackPosition = 0;
    let c = "", o = "";
    if (this.convert = {
      format: this.format,
      insertExtend: this.insertExtend
    }, this.data.btnPosition === "bottom" ? c = fn(`${on}${an}${cn}`) : c = fn(`${an}${on}${cn}`), this.addTemplate(this.id, c), h.value) {
      let p = h.value;
      this.data.sourceFirst ? p = h.innerHTML : p = this.makeEditableHtml(p), this.data.escapeNotRegisteredTags && (p = this.escapeNotRegisteredTags(p)), this.data.firstValue = h.value, this.data.value = p;
    }
    this.data.value && (this.data.value = this.data.value.replace(/([\\]+)/g, "$1\\\\")), h.attributes && ([].forEach.call(h.attributes, (p) => {
      o += ` ${p.nodeName}="${p.nodeValue}"`;
    }), this.data.attr = o), !this.data.selectedOption && this.data.selectOptions && this.data.selectOptions[0] && this.data.selectOptions[0].value && (this.data.selectedOption = this.data.selectOptions[0].value), VM(h, u), ln(h), this.update(), this.selector = this._getElementByQuery('[data-selector="lite-editor-source"]');
    const n = this.data.selectOptions.find((p) => p.value === this.data.selectedOption);
    n && (this.data.extendLabel = n.extendLabel, n.onSelect && n.onSelect(this)), this._fireEvent("init");
  }
  focus() {
    const { showSource: s } = this.data;
    s === !0 ? this._getElementByQuery('[data-selector="lite-editor-source"]').focus() : this._getElementByQuery('[data-selector="lite-editor"]').focus();
  }
  registerButton(s) {
    this.data.btnOptions.push(s), this.data.groups = this.makeBtnGroups(), this.update("html", '[data-selector="lite-editor-toolbox"]');
  }
  activateEditorMode() {
    this.data.disableEditorMode = !1, this.update("html", '[data-selector="lite-editor-toolbox"]');
  }
  deactivateEditorMode() {
    this.data.disableEditorMode = !0, this.update("html", '[data-selector="lite-editor-toolbox"]');
  }
  makeEditableHtml(s) {
    if (this.data.preserveSpace) {
      const r = document.createElement("div");
      r.innerHTML = s, JM(r), s = r.innerHTML;
    }
    return this.data.nl2br === !1 && s.slice(-1) === `
` && (s += "<br>"), s = s.replace(/<br>(\r\n|\r|\n)/g, "<br>"), s = s.replace(/\r\n|\r|\n/g, "<br>"), s;
  }
  makeBtnGroups() {
    const s = this.data.btnOptions, r = [];
    return s.forEach((h, u) => {
      h.index = u;
      let c = !0;
      if (h.group || (h.group = "none"), r.forEach((o) => {
        o.name === h.group && (o.items.push(h), c = !1);
      }), c) {
        const o = {
          name: h.group,
          items: [h]
        };
        r.push(o);
      }
    }), r;
  }
  _getSelf() {
    return document.querySelector(`[data-id='${this.id}']`);
  }
  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }
  _getElementByQuery(s) {
    return document.querySelector(`[data-id='${this.id}'] ${s}`);
  }
  _fireEvent(s) {
    const r = this._getElementByQuery('[data-selector="lite-editor-source"]');
    r && GM(r, s);
  }
  on(s, r) {
    this._getElementByQuery('[data-selector="lite-editor-source"]').addEventListener(s, (u) => {
      r.call(this, u);
    });
  }
  escapeNotRegisteredTags(s) {
    const r = this.data.btnOptions;
    return s = s.replace(/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/g, (h, u, c, o) => {
      const n = (c.match(/class=["|'](.*?)["|']/i) || [null, ""])[1];
      let p = !1;
      return c && (c = ` ${c}`), r.forEach((y) => {
        y.className === n && y.tag === u && (p = !0);
      }), p ? h : (/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/.exec(o) && (o = this.escapeNotRegisteredTags(o)), `&lt;${u}${c}&gt;${o}&lt;/${u}&gt;`);
    }), s.replace(/<([a-zA-Z0-9._-]+)\s?([^>]*?)\/?>/g, (h, u, c) => {
      const o = (c.match(/class=["|'](.*?)["|']/i) || [null, ""])[1];
      let n = !1;
      return c && (c = ` ${c}`), r.forEach((p) => {
        p.className === o && p.tag === u && (n = !0);
      }), n ? h : u !== "br" ? `&lt;${u}${c}&gt` : "<br>";
    });
  }
  encodeValue() {
    this.data.value = $n(this.data.value), this.update();
  }
  decodeValue() {
    this.data.value = Se(this.data.value), this.update();
  }
  hideEditor() {
    this.data.hideEditor = !0, this.update();
  }
  showEditor() {
    this.data.hideEditor = !1, this.update();
  }
  hideBtns() {
    this.data.hideBtns = !0, this.update();
  }
  showBtns() {
    this.data.hideBtns = !1, this.update();
  }
  resetStyle() {
    const r = `${un()}`.replace(/<[^>]*>/g, "");
    this._isFocused() && document.execCommand("insertText", !1, r);
  }
  insertHtml(s) {
    WM(s);
    const r = this._getElementByQuery('[data-selector="lite-editor"]');
    this.data.value = r.innerHTML;
  }
  insertHtmlAtCursor(s) {
    if (this.data.showSource) {
      const r = this._getElementByQuery('[data-selector="lite-editor-source"]');
      Ct(r, s), this.data.value = this.makeEditableHtml(r.value);
    } else {
      QM(s);
      const r = this._getElementByQuery('[data-selector="lite-editor"]');
      this.data.value = r.innerHTML;
    }
  }
  saveSelection() {
    this.selection = jM();
  }
  restoreSelection() {
    this.selection && zM(this.selection);
  }
  _isFocused() {
    return this._getElementByQuery('[data-selector="lite-editor"]') === document.activeElement;
  }
  _isVoidElement(s) {
    return this.data.voidElements.find((r) => r === s);
  }
  insertTag(s, r, h) {
    const u = this.data.groups, c = this._getElementByQuery('[data-selector="lite-editor"]'), o = this._getElementByQuery('[data-selector="lite-editor-source"]'), n = pn();
    let p = un(o);
    if (!this.data.showSource && !c.contains(n))
      return;
    if (p || (p = h), s === "a") {
      this.saveSelection(), this.showLinkDialog(`${p}`, r);
      return;
    }
    let y = "";
    r && (y = ` class="${r}"`);
    let x = `<${s}${y}>${p}</${s}>`;
    this._isVoidElement(s) && (x = `${p}<${s}>`), this.data.showSource ? this.data.mode === "markdown" ? dn.convert(x, (L, B) => {
      Ct(o, B), this.data.value = this.makeEditableHtml(o.value);
    }) : (Ct(o, x), this.data.value = this.makeEditableHtml(o.value)) : (this.insertHtml(x.replace(/\r\n|\r|\n/g, "<br>")), u.forEach((L) => {
      L.items.forEach((B) => {
        B.tag === s && B.className === r && (B.selected = !0);
      });
    }), this.update("html", '[data-selector="lite-editor-toolbox"]')), this._fireEvent("insertTag");
  }
  showLinkDialog(s, r) {
    this.data.tooltipLabel = s, this.data.tooltipClassName = r, this.data.linkNew = !0, this.update("html", '[data-selector="lite-editor-tooltip"]'), this._getElementByQuery('[data-bind="tooltipUrl"]').focus();
  }
  updateTargetBlank() {
    this.e.target.checked ? this.data.targetBlank = "true" : this.data.targetBlank = "false";
  }
  insertAtag() {
    this.restoreSelection();
    const s = this.data.tooltipLabel, r = this.data.tooltipUrl, h = this.data.tooltipClassName, u = this.data.targetBlank, c = this.data.relAttrForTargetBlank;
    let o = "";
    h && (o = ` class="${h}"`);
    const n = `<a href="${r}"${o}${u === "true" ? `target="_blank" rel="${c}"` : ""}>${s}</a>`;
    if (this.data.showSource) {
      const p = this._getElementByQuery('[data-selector="lite-editor-source"]');
      this.data.mode === "markdown" ? dn.convert(n, (y, x) => {
        Ct(p, x), this.data.value = this.makeEditableHtml(p.value);
      }) : (Ct(p, n), this.data.value = this.makeEditableHtml(p.value));
    } else
      this.insertHtml(n.replace(/\r\n|\r|\n/g, "<br>")), this.updateToolBox();
    this.closeTooltip();
  }
  onClick(s) {
    const r = parseInt(s, 10), h = this.data.btnOptions[r];
    h.onClick && h.onClick(this);
  }
  onInit(s) {
    const r = parseInt(s, 10), h = this.data.btnOptions[r], u = this._getElementByQuery(`[data-selector="btn-group"] [data-index="${s}"]`);
    h.onInit && !h.init && (h.onInit(this, u), h.init = !0);
  }
  onRender(s) {
    const r = parseInt(s, 10), h = this.data.btnOptions[r], u = this._getElementByQuery(`[data-selector="btn-group"] [data-index="${s}"]`);
    h.onRender && h.onRender(this, u);
  }
  beforeUpdated() {
    const s = this.data;
    s.canUndo = this.canUndo(), s.canRedo = this.canRedo(), s.firstValue ? (s.formatedValue = this.data.firstValue, s.firstValue = null) : s.showSource || (s.formatedValue = this.format(s.value)), s.value && (s.value = s.value.replace(/{/g, "&lcub;").replace(/}/g, "&rcub;")), this._fireEvent("prerender");
  }
  onUpdated() {
    const s = this._getElementByQuery('[data-selector="lite-editor"]'), r = this._getElementByQuery('[data-selector="lite-editor-source"]');
    this.data.btnOptions.forEach((h, u) => {
      this.onInit(u), this.onRender(u);
    }), this.data.showSource === !0 ? r.style.height = `${r.scrollHeight}px` : this.data.value = s.innerHTML, s && (this.saveSelection(), this.stopStack ? this.stopStack = !1 : `${this.stack[this.stackPosition - 1]}` != `${this.data.value}` && (this.stack = this.stack.slice(0, this.stackPosition + 1), this.stack.push(this.data.value), this.stackPosition += 1, this.data.showSource === !1 && this.selector && (this.selector.value = this.format(this.data.value))), this._fireEvent("render"));
  }
  redo() {
    this.canRedo() && (this.stackPosition += 1, this.data.value = this.stack[this.stackPosition], this.stopStack = !0, this.update(), this._fireEvent("redo"));
  }
  canRedo() {
    return this.stackPosition < this.stack.length - 1;
  }
  undo() {
    this.canUndo() && (this.stackPosition -= 1, this.data.value = this.stack[this.stackPosition], this.stopStack = !0, this.update(), this._fireEvent("undo"));
  }
  canUndo() {
    return this.stackPosition > 0;
  }
  onPaste() {
    const s = this.e, r = this._getElementByQuery('[data-selector="lite-editor"]'), h = this._getElementByQuery('[data-selector="lite-editor-source"]');
    s.preventDefault();
    let u = "";
    if (s.clipboardData ? u = s.clipboardData.getData("text/plain") : window.clipboardData && (u = window.clipboardData.getData("Text")), this._isFocused() && u) {
      this.insertHtmlAtCursor(
        u.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(\r\n|\n\r|\n|\r)/g, "<br>").replace(/ /g, "&nbsp;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
      ), this.data.value = r.innerHTML, this.data.formatedValue = this.format(this.data.value), h.value = this.data.formatedValue;
      const c = Tt(r);
      An(), Bt(r, c);
    }
    this._fireEvent("paste");
  }
  onKeyDown() {
    const s = this._getElementByQuery('[data-selector="lite-editor"]'), r = this._getElementByQuery('[data-selector="lite-editor-source"]'), h = this.e, u = Tt(s);
    if (h.ctrlKey || h.metaKey) {
      (h.which === 90 || h.keyCode === 90) && (h.preventDefault(), h.shiftKey ? this.redo() : this.undo());
      return;
    }
    if (h.keyCode !== 13) {
      this.data.value = s.innerHTML, this.onPutCaret();
      return;
    }
    const c = this.checkCaretCoordinate();
    this.insertHtmlAtCursor("<br> ");
    let o = s.innerHTML.replace(/<br> <\/(.*?)>/g, "</$1><br> ");
    ZM(s) || (o += "<br>"), s.innerHTML = o, this.data.value = o, this.data.formatedValue = this.format(this.data.value), r.value = this.data.formatedValue;
    let n = this.checkCaretCoordinate();
    s.focus(), Bt(s, u + 1), KM().indexOf("ie") === -1 && (n = this.checkCaretCoordinate()), n.y > this.data.maxHeight && (s.scrollTop += n.y - c.y), h.preventDefault();
  }
  checkCaretCoordinate() {
    const s = this._getElementByQuery('[data-selector="lite-editor"]'), r = this._getUniqId();
    this.insertHtmlAtCursor(`<span id="${r}" style="display:inline-block;"></span>`);
    const h = this._getElementByQuery(`#${r}`), u = h.getBoundingClientRect(), c = s.getBoundingClientRect(), o = {
      x: u.x - c.x,
      y: u.y - c.y
    };
    return ln(h), this.data.value = s.innerHTML, o;
  }
  onInput() {
    const s = this._getElementByQuery('[data-selector="lite-editor"]'), r = this._getElementByQuery('[data-selector="lite-editor-source"]');
    this.data.value = s.innerHTML, this.data.formatedValue = this.format(this.data.value), r.value = this.data.formatedValue;
  }
  preventSubmit() {
    const s = this.e;
    s.keyCode === 13 && s.preventDefault();
  }
  onPutCaret() {
    setTimeout(() => {
      const s = this.getSelectionNode(), r = [], h = this._getElementByQuery('[data-selector="lite-editor"]');
      if (s && s !== h) {
        r.push({ tagName: s.tagName.toLowerCase(), className: s.getAttribute("class") || "" });
        let u = s.parentElement;
        for (; u !== h && u; ) {
          const c = u.tagName.toLowerCase();
          r.push({
            tagName: c,
            className: u.getAttribute("class") || ""
          }), u = u.parentElement;
        }
      }
      this.updateToolBox(r);
    }, 1);
  }
  onDirectInput() {
    const s = this._getElementByQuery('[data-selector="lite-editor-source"]'), r = this.e.target.value;
    this.data.value = this.makeEditableHtml(r), s.style.height = `${s.scrollHeight}px`;
  }
  updateToolBox(s = []) {
    this.data.groups.forEach((h) => {
      h.items.forEach((u) => {
        u.selected = !1, s.forEach((c) => {
          u.tag === c.tagName && u.className === c.className && (u.selected = !0);
        });
      });
    }), this.saveSelection(), this.update("html", '[data-selector="lite-editor-toolbox"]');
  }
  updateTooltip(s) {
    s === null ? (this.data.linkNew = !0, this.data.tooltipLabel = "", this.data.tooltipUrl = "", this.data.targetBlank = "false") : (this.data.linkNew = !1, this.data.tooltipLabel = s.innerHTML, this.data.tooltipUrl = s.getAttribute("href"), this.savedLinkNode = s, s.getAttribute("target") === "_blank" ? this.data.targetBlank = "true" : this.data.targetBlank = "false"), this.update("html", '[data-selector="lite-editor-tooltip"]');
  }
  closeTooltip() {
    this.data.tooltipLabel = "", this.data.tooltipUrl = "", this.data.tooltipClassName = "", this.data.targetBlank = "false", this.update("html", '[data-selector="lite-editor-tooltip"]');
  }
  updateLink() {
    this.restoreSelection();
    const s = this._getElementByQuery('[data-selector="lite-editor"]'), r = Tt(s), h = this.data.tooltipLabel, u = this.data.targetBlank, c = this.data.tooltipUrl, o = this.savedLinkNode, n = this.data.relAttrForTargetBlank;
    o.setAttribute("href", c), o.innerHTML = h, u === "true" ? (o.setAttribute("target", "_blank"), o.setAttribute("rel", n)) : (o.removeAttribute("target"), o.removeAttribute("rel")), this.data.value = s.innerHTML, s.focus(), Bt(s, r), this.onPutCaret(), this.closeTooltip();
  }
  removeLink() {
    this.restoreSelection();
    const s = this._getElementByQuery('[data-selector="lite-editor"]'), r = Tt(s), h = this.savedLinkNode;
    hn(h), s.focus(), Bt(s, r), this.onPutCaret(), this.closeTooltip();
  }
  getSelectionNode() {
    const s = document.getSelection().anchorNode;
    return s.nodeType === 3 ? s.parentNode : s;
  }
  unwrapTag(s, r) {
    const h = this._getElementByQuery('[data-selector="lite-editor"]'), u = Tt(h);
    let c = pn();
    const o = XM(), n = Tt(c);
    if (c.parentElement === h && c.textContent && n === c.textContent.length && o === 0)
      YM(c);
    else {
      for (; ; ) {
        const p = c.getAttribute("class") || "";
        if (c.tagName.toLowerCase() === s && p === r) {
          s === "a" ? this.updateTooltip(c) : hn(c);
          break;
        }
        c = c.parentElement;
      }
      this.data.value = h.innerHTML, h.focus(), Bt(h, u, o);
    }
    this.onPutCaret(), this._fireEvent("unwrapTag");
  }
  changeMode(s) {
    this.data.mode = s;
  }
  toggleSource() {
    this.data.showSource = !this.data.showSource, this.data.showSource ? (this.data.formatedValue = this.format(this.data.value), this.data.groups.forEach((s) => {
      s.items.forEach((r) => {
        r.selected = !1;
      });
    })) : this.data.value && (this.data.value = this.data.value.replace(/([\\]+)/g, "$1\\")), this.update();
  }
  showSource() {
    this.data.showSource = !0, this.data.showSource && (this.data.formatedValue = this.format(this.data.value), this.data.groups.forEach((s) => {
      s.items.forEach((r) => {
        r.selected = !1;
      });
    })), this.update();
  }
  hideSource() {
    this.data.showSource = !1, this.update();
  }
  insertExtend(s) {
    return s.replace(/text_tag/g, "text_extend_tag");
  }
  format(s) {
    if (!s)
      return "";
    let r = s.replace(/<br>( *)/g, `
`).replace(/<br>/g, `
`).replace(/&nbsp;/g, " ").replace(/<script/g, "&lt;script").replace(/script>/g, "script&gt;").replace(/( +)/g, (h) => {
      const u = h.length;
      let c = "";
      for (let o = 0; o < u; o += 1)
        o % 2 === 0 ? c += " " : c += "&nbsp;";
      return c;
    });
    return r.slice(-1) === `
` && (r = r.slice(0, -1), r += "<br>"), this.data.nl2br && (r = r.replace(/\n/g, `<br>
`)), r.slice(-8) !== "<br><br>" && r.slice(-4) === "<br>" && (r = r.slice(0, -4)), this.data.decodeSource ? Se(r) : r;
  }
  changeOption() {
    const s = this.e.target.value;
    if (!s)
      return;
    const r = this.data.selectOptions.find((h) => h.value === s);
    r && (this.data.extendLabel = r.extendLabel, this.update("html", '[data-selector="lite-editor-toolbox"]'), r.onSelect && (this.data.selectedOption = r.value, r.onSelect(this)));
  }
}
export {
  s$ as default
};
