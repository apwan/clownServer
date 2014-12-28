window.Modernizr = function(t, e, n) {
    function i(t) {
        b.cssText = t
    }
    function s(t, e) {
        return i(S.join(t + ";") + (e || ""))
    }
    function o(t, e) {
        return typeof t === e
    }
    function r(t, e) {
        return !!~("" + t).indexOf(e)
    }
    function a(t, e) {
        for (var i in t) {
            var s = t[i];
            if (!r(s, "-") && b[s] !== n)
                return "pfx" == e ? s : !0
        }
        return !1
    }
    function l(t, e, i) {
        for (var s in t) {
            var r = e[t[s]];
            if (r !== n)
                return i === !1 ? t[s] : o(r, "function") ? r.bind(i || e) : r
        }
        return !1
    }
    function c(t, e, n) {
        var i = t.charAt(0).toUpperCase() + t.slice(1), s = (t + " " + T.join(i + " ") + i).split(" ");
        return o(e, "string") || o(e, "undefined") ? a(s, e) : (s = (t + " " + w.join(i + " ") + i).split(" "), l(s, e, n))
    }
    var u, d, h, p = "2.6.2", f = {}, m = !0, g = e.documentElement, v = "modernizr", y = e.createElement(v), b = y.style, S = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")), E = "Webkit Moz O ms", T = E.split(" "), w = E.toLowerCase().split(" "), _ = {svg: "http://www.w3.org/2000/svg"}, k = {}, L = [], C = L.slice, x = function(t, n, i, s) {
        var o, r, a, l, c = e.createElement("div"), u = e.body, d = u || e.createElement("body");
        if (parseInt(i, 10))
            for (; i--; )
                a = e.createElement("div"), a.id = s ? s[i] : v + (i + 1), c.appendChild(a);
        return o = ["&#173;", '<style id="s', v, '">', t, "</style>"].join(""), c.id = v, (u ? c : d).innerHTML += o, d.appendChild(c), u || (d.style.background = "", d.style.overflow = "hidden", l = g.style.overflow, g.style.overflow = "hidden", g.appendChild(d)), r = n(c, t), u ? c.parentNode.removeChild(c) : (d.parentNode.removeChild(d), g.style.overflow = l), !!r
    }, A = {}.hasOwnProperty;
    h = o(A, "undefined") || o(A.call, "undefined") ? function(t, e) {
        return e in t && o(t.constructor.prototype[e], "undefined")
    } : function(t, e) {
        return A.call(t, e)
    }, Function.prototype.bind || (Function.prototype.bind = function(t) {
        var e = this;
        if ("function" != typeof e)
            throw new TypeError;
        var n = C.call(arguments, 1), i = function() {
            if (this instanceof i) {
                var s = function() {
                };
                s.prototype = e.prototype;
                var o = new s, r = e.apply(o, n.concat(C.call(arguments)));
                return Object(r) === r ? r : o
            }
            return e.apply(t, n.concat(C.call(arguments)))
        };
        return i
    }), k.touch = function() {
        var n;
        return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? n = !0 : x(["@media (", S.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(t) {
            n = 9 === t.offsetTop
        }), n
    }, k.history = function() {
        return !!t.history && !!history.pushState
    }, k.rgba = function() {
        return i("background-color:rgba(150,255,150,.5)"), r(b.backgroundColor, "rgba")
    }, k.backgroundsize = function() {
        return c("backgroundSize")
    }, k.opacity = function() {
        return s("opacity:.55"), /^0.55$/.test(b.opacity)
    }, k.cssanimations = function() {
        return c("animationName")
    }, k.csstransforms = function() {
        return !!c("transform")
    }, k.csstransforms3d = function() {
        var t = !!c("perspective");
        return t && "webkitPerspective" in g.style && x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e) {
            t = 9 === e.offsetLeft && 3 === e.offsetHeight
        }), t
    }, k.csstransitions = function() {
        return c("transition")
    }, k.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0
        } catch (t) {
            return !1
        }
    }, k.applicationcache = function() {
        return !!t.applicationCache
    }, k.svg = function() {
        return !!e.createElementNS && !!e.createElementNS(_.svg, "svg").createSVGRect
    };
    for (var I in k)
        h(k, I) && (d = I.toLowerCase(), f[d] = k[I](), L.push((f[d] ? "" : "no-") + d));
    return f.addTest = function(t, e) {
        if ("object" == typeof t)
            for (var i in t)
                h(t, i) && f.addTest(i, t[i]);
        else {
            if (t = t.toLowerCase(), f[t] !== n)
                return f;
            e = "function" == typeof e ? e() : e, "undefined" != typeof m && m && (g.className += " mz-" + (e ? "" : "no-") + t), f[t] = e
        }
        return f
    }, i(""), y = u = null, f._version = p, f._prefixes = S, f._domPrefixes = w, f._cssomPrefixes = T, f.testProp = function(t) {
        return a([t])
    }, f.testAllProps = c, f.testStyles = x, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (m ? " mz-js mz-" + L.join(" mz-") : ""), f
}(this, this.document), function(t, e) {
    function n(t, e) {
        var n = t.createElement("p"), i = t.getElementsByTagName("head")[0] || t.documentElement;
        return n.innerHTML = "x<style>" + e + "</style>", i.insertBefore(n.lastChild, i.firstChild)
    }
    function i() {
        var t = T.elements;
        return "string" == typeof t ? t.split(" ") : t
    }
    function s(t) {
        var e = E[t[b]];
        return e || (e = {}, S++, t[b] = S, E[S] = e), e
    }
    function o(t, n, i) {
        if (n || (n = e), m)
            return n.createElement(t);
        i || (i = s(n));
        var o;
        return o = i.cache[t] ? i.cache[t].cloneNode() : y.test(t) ? (i.cache[t] = i.createElem(t)).cloneNode() : i.createElem(t), o.canHaveChildren && !v.test(t) ? i.frag.appendChild(o) : o
    }
    function r(t, n) {
        if (t || (t = e), m)
            return t.createDocumentFragment();
        n = n || s(t);
        for (var o = n.frag.cloneNode(), r = 0, a = i(), l = a.length; l > r; r++)
            o.createElement(a[r]);
        return o
    }
    function a(t, e) {
        e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(n) {
            return T.shivMethods ? o(n, t, e) : e.createElem(n)
        }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function(t) {
            return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
        }) + ");return n}")(T, e.frag)
    }
    function l(t) {
        t || (t = e);
        var i = s(t);
        return T.shivCSS && !f && !i.hasCSS && (i.hasCSS = !!n(t, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), m || a(t, i), t
    }
    function c(t) {
        for (var e, n = t.getElementsByTagName("*"), s = n.length, o = RegExp("^(?:" + i().join("|") + ")$", "i"), r = []; s--; )
            e = n[s], o.test(e.nodeName) && r.push(e.applyElement(u(e)));
        return r
    }
    function u(t) {
        for (var e, n = t.attributes, i = n.length, s = t.ownerDocument.createElement(_ + ":" + t.nodeName); i--; )
            e = n[i], e.specified && s.setAttribute(e.nodeName, e.nodeValue);
        return s.style.cssText = t.style.cssText, s
    }
    function d(t) {
        for (var e, n = t.split("{"), s = n.length, o = RegExp("(^|[\\s,>+~])(" + i().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), r = "$1" + _ + "\\:$2"; s--; )
            e = n[s] = n[s].split("}"), e[e.length - 1] = e[e.length - 1].replace(o, r), n[s] = e.join("}");
        return n.join("{")
    }
    function h(t) {
        for (var e = t.length; e--; )
            t[e].removeNode()
    }
    function p(t) {
        function e() {
            clearTimeout(r._removeSheetTimer), i && i.removeNode(!0), i = null
        }
        var i, o, r = s(t), a = t.namespaces, l = t.parentWindow;
        return !k || t.printShived ? t : ("undefined" == typeof a[_] && a.add(_), l.attachEvent("onbeforeprint", function() {
            e();
            for (var s, r, a, l = t.styleSheets, u = [], h = l.length, p = Array(h); h--; )
                p[h] = l[h];
            for (; a = p.pop(); )
                if (!a.disabled && w.test(a.media)) {
                    try {
                        s = a.imports, r = s.length
                    } catch (f) {
                        r = 0
                    }
                    for (h = 0; r > h; h++)
                        p.push(s[h]);
                    try {
                        u.push(a.cssText)
                    } catch (f) {
                    }
                }
            u = d(u.reverse().join("")), o = c(t), i = n(t, u)
        }), l.attachEvent("onafterprint", function() {
            h(o), clearTimeout(r._removeSheetTimer), r._removeSheetTimer = setTimeout(e, 500)
        }), t.printShived = !0, t)
    }
    var f, m, g = t.html5 || {}, v = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, y = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i, b = "_html5shiv", S = 0, E = {};
    !function() {
        try {
            var t = e.createElement("a");
            t.innerHTML = "<xyz></xyz>", f = "hidden" in t, m = 1 == t.childNodes.length || function() {
                e.createElement("a");
                var t = e.createDocumentFragment();
                return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
            }()
        } catch (n) {
            f = !0, m = !0
        }
    }();
    var T = {elements: g.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS: g.shivCSS !== !1,supportsUnknownElements: m,shivMethods: g.shivMethods !== !1,type: "default",shivDocument: l,createElement: o,createDocumentFragment: r};
    t.html5 = T, l(e);
    var w = /^$|\b(?:all|print)\b/, _ = "html5shiv", k = !m && function() {
        var n = e.documentElement;
        return "undefined" != typeof e.namespaces && "undefined" != typeof e.parentWindow && "undefined" != typeof n.applyElement && "undefined" != typeof n.removeNode && "undefined" != typeof t.attachEvent
    }();
    T.type += " print", T.shivPrint = p, p(e)
}(this, document), Modernizr.addTest("fullscreen", function() {
    for (var t = 0; t < Modernizr._domPrefixes.length; t++)
        if (document[Modernizr._domPrefixes[t].toLowerCase() + "CancelFullScreen"])
            return !0;
    return !!document.cancelFullScreen || !1
}), function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document)
            throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function n(t) {
        var e = t.length, n = se.type(t);
        return "function" === n || se.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }
    function i(t, e, n) {
        if (se.isFunction(e))
            return se.grep(t, function(t, i) {
                return !!e.call(t, i, t) !== n
            });
        if (e.nodeType)
            return se.grep(t, function(t) {
                return t === e !== n
            });
        if ("string" == typeof e) {
            if (he.test(e))
                return se.filter(e, t, n);
            e = se.filter(e, t)
        }
        return se.grep(t, function(t) {
            return se.inArray(t, e) >= 0 !== n
        })
    }
    function s(t, e) {
        do
            t = t[e];
        while (t && 1 !== t.nodeType);
        return t
    }
    function o(t) {
        var e = Se[t] = {};
        return se.each(t.match(be) || [], function(t, n) {
            e[n] = !0
        }), e
    }
    function r() {
        fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (fe.detachEvent("onreadystatechange", a), t.detachEvent("onload", a))
    }
    function a() {
        (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (r(), se.ready())
    }
    function l(t, e, n) {
        if (void 0 === n && 1 === t.nodeType) {
            var i = "data-" + e.replace(ke, "-$1").toLowerCase();
            if (n = t.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : _e.test(n) ? se.parseJSON(n) : n
                } catch (s) {
                }
                se.data(t, e, n)
            } else
                n = void 0
        }
        return n
    }
    function c(t) {
        var e;
        for (e in t)
            if (("data" !== e || !se.isEmptyObject(t[e])) && "toJSON" !== e)
                return !1;
        return !0
    }
    function u(t, e, n, i) {
        if (se.acceptData(t)) {
            var s, o, r = se.expando, a = t.nodeType, l = a ? se.cache : t, c = a ? t[r] : t[r] && r;
            if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof e)
                return c || (c = a ? t[r] = q.pop() || se.guid++ : r), l[c] || (l[c] = a ? {} : {toJSON: se.noop}), ("object" == typeof e || "function" == typeof e) && (i ? l[c] = se.extend(l[c], e) : l[c].data = se.extend(l[c].data, e)), o = l[c], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[se.camelCase(e)] = n), "string" == typeof e ? (s = o[e], null == s && (s = o[se.camelCase(e)])) : s = o, s
        }
    }
    function d(t, e, n) {
        if (se.acceptData(t)) {
            var i, s, o = t.nodeType, r = o ? se.cache : t, a = o ? t[se.expando] : se.expando;
            if (r[a]) {
                if (e && (i = n ? r[a] : r[a].data)) {
                    se.isArray(e) ? e = e.concat(se.map(e, se.camelCase)) : e in i ? e = [e] : (e = se.camelCase(e), e = e in i ? [e] : e.split(" ")), s = e.length;
                    for (; s--; )
                        delete i[e[s]];
                    if (n ? !c(i) : !se.isEmptyObject(i))
                        return
                }
                (n || (delete r[a].data, c(r[a]))) && (o ? se.cleanData([t], !0) : ne.deleteExpando || r != r.window ? delete r[a] : r[a] = null)
            }
        }
    }
    function h() {
        return !0
    }
    function p() {
        return !1
    }
    function f() {
        try {
            return fe.activeElement
        } catch (t) {
        }
    }
    function m(t) {
        var e = Pe.split("|"), n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length; )
                n.createElement(e.pop());
        return n
    }
    function g(t, e) {
        var n, i, s = 0, o = typeof t.getElementsByTagName !== we ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== we ? t.querySelectorAll(e || "*") : void 0;
        if (!o)
            for (o = [], n = t.childNodes || t; null != (i = n[s]); s++)
                !e || se.nodeName(i, e) ? o.push(i) : se.merge(o, g(i, e));
        return void 0 === e || e && se.nodeName(t, e) ? se.merge([t], o) : o
    }
    function v(t) {
        Ie.test(t.type) && (t.defaultChecked = t.checked)
    }
    function y(t, e) {
        return se.nodeName(t, "table") && se.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }
    function b(t) {
        return t.type = (null !== se.find.attr(t, "type")) + "/" + t.type, t
    }
    function S(t) {
        var e = Xe.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }
    function E(t, e) {
        for (var n, i = 0; null != (n = t[i]); i++)
            se._data(n, "globalEval", !e || se._data(e[i], "globalEval"))
    }
    function T(t, e) {
        if (1 === e.nodeType && se.hasData(t)) {
            var n, i, s, o = se._data(t), r = se._data(e, o), a = o.events;
            if (a) {
                delete r.handle, r.events = {};
                for (n in a)
                    for (i = 0, s = a[n].length; s > i; i++)
                        se.event.add(e, n, a[n][i])
            }
            r.data && (r.data = se.extend({}, r.data))
        }
    }
    function w(t, e) {
        var n, i, s;
        if (1 === e.nodeType) {
            if (n = e.nodeName.toLowerCase(), !ne.noCloneEvent && e[se.expando]) {
                s = se._data(e);
                for (i in s.events)
                    se.removeEvent(e, i, s.handle);
                e.removeAttribute(se.expando)
            }
            "script" === n && e.text !== t.text ? (b(e).text = t.text, S(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), ne.html5Clone && t.innerHTML && !se.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Ie.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
        }
    }
    function _(e, n) {
        var i, s = se(n.createElement(e)).appendTo(n.body), o = t.getDefaultComputedStyle && (i = t.getDefaultComputedStyle(s[0])) ? i.display : se.css(s[0], "display");
        return s.detach(), o
    }
    function k(t) {
        var e = fe, n = Qe[t];
        return n || (n = _(t, e), "none" !== n && n || (Ze = (Ze || se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Ze[0].contentWindow || Ze[0].contentDocument).document, e.write(), e.close(), n = _(t, e), Ze.detach()), Qe[t] = n), n
    }
    function L(t, e) {
        return {get: function() {
                var n = t();
                if (null != n)
                    return n ? void delete this.get : (this.get = e).apply(this, arguments)
            }}
    }
    function C(t, e) {
        if (e in t)
            return e;
        for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, s = pn.length; s--; )
            if (e = pn[s] + n, e in t)
                return e;
        return i
    }
    function x(t, e) {
        for (var n, i, s, o = [], r = 0, a = t.length; a > r; r++)
            i = t[r], i.style && (o[r] = se._data(i, "olddisplay"), n = i.style.display, e ? (o[r] || "none" !== n || (i.style.display = ""), "" === i.style.display && xe(i) && (o[r] = se._data(i, "olddisplay", k(i.nodeName)))) : (s = xe(i), (n && "none" !== n || !s) && se._data(i, "olddisplay", s ? n : se.css(i, "display"))));
        for (r = 0; a > r; r++)
            i = t[r], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[r] || "" : "none"));
        return t
    }
    function A(t, e, n) {
        var i = cn.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }
    function I(t, e, n, i, s) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > o; o += 2)
            "margin" === n && (r += se.css(t, n + Ce[o], !0, s)), i ? ("content" === n && (r -= se.css(t, "padding" + Ce[o], !0, s)), "margin" !== n && (r -= se.css(t, "border" + Ce[o] + "Width", !0, s))) : (r += se.css(t, "padding" + Ce[o], !0, s), "padding" !== n && (r += se.css(t, "border" + Ce[o] + "Width", !0, s)));
        return r
    }
    function D(t, e, n) {
        var i = !0, s = "width" === e ? t.offsetWidth : t.offsetHeight, o = tn(t), r = ne.boxSizing && "border-box" === se.css(t, "boxSizing", !1, o);
        if (0 >= s || null == s) {
            if (s = en(t, e, o), (0 > s || null == s) && (s = t.style[e]), sn.test(s))
                return s;
            i = r && (ne.boxSizingReliable() || s === t.style[e]), s = parseFloat(s) || 0
        }
        return s + I(t, e, n || (r ? "border" : "content"), i, o) + "px"
    }
    function M(t, e, n, i, s) {
        return new M.prototype.init(t, e, n, i, s)
    }
    function R() {
        return setTimeout(function() {
            fn = void 0
        }), fn = se.now()
    }
    function N(t, e) {
        var n, i = {height: t}, s = 0;
        for (e = e ? 1 : 0; 4 > s; s += 2 - e)
            n = Ce[s], i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }
    function O(t, e, n) {
        for (var i, s = (Sn[e] || []).concat(Sn["*"]), o = 0, r = s.length; r > o; o++)
            if (i = s[o].call(n, e, t))
                return i
    }
    function P(t, e, n) {
        var i, s, o, r, a, l, c, u, d = this, h = {}, p = t.style, f = t.nodeType && xe(t), m = se._data(t, "fxshow");
        n.queue || (a = se._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
            a.unqueued || l()
        }), a.unqueued++, d.always(function() {
            d.always(function() {
                a.unqueued--, se.queue(t, "fx").length || a.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = se.css(t, "display"), u = "none" === c ? se._data(t, "olddisplay") || k(t.nodeName) : c, "inline" === u && "none" === se.css(t, "float") && (ne.inlineBlockNeedsLayout && "inline" !== k(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", ne.shrinkWrapBlocks() || d.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (i in e)
            if (s = e[i], gn.exec(s)) {
                if (delete e[i], o = o || "toggle" === s, s === (f ? "hide" : "show")) {
                    if ("show" !== s || !m || void 0 === m[i])
                        continue;
                    f = !0
                }
                h[i] = m && m[i] || se.style(t, i)
            } else
                c = void 0;
        if (se.isEmptyObject(h))
            "inline" === ("none" === c ? k(t.nodeName) : c) && (p.display = c);
        else {
            m ? "hidden" in m && (f = m.hidden) : m = se._data(t, "fxshow", {}), o && (m.hidden = !f), f ? se(t).show() : d.done(function() {
                se(t).hide()
            }), d.done(function() {
                var e;
                se._removeData(t, "fxshow");
                for (e in h)
                    se.style(t, e, h[e])
            });
            for (i in h)
                r = O(f ? m[i] : 0, i, d), i in m || (m[i] = r.start, f && (r.end = r.start, r.start = "width" === i || "height" === i ? 1 : 0))
        }
    }
    function $(t, e) {
        var n, i, s, o, r;
        for (n in t)
            if (i = se.camelCase(n), s = e[i], o = t[n], se.isArray(o) && (s = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), r = se.cssHooks[i], r && "expand" in r) {
                o = r.expand(o), delete t[i];
                for (n in o)
                    n in t || (t[n] = o[n], e[n] = s)
            } else
                e[i] = s
    }
    function j(t, e, n) {
        var i, s, o = 0, r = bn.length, a = se.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (s)
                return !1;
            for (var e = fn || R(), n = Math.max(0, c.startTime + c.duration - e), i = n / c.duration || 0, o = 1 - i, r = 0, l = c.tweens.length; l > r; r++)
                c.tweens[r].run(o);
            return a.notifyWith(t, [c, o, n]), 1 > o && l ? n : (a.resolveWith(t, [c]), !1)
        }, c = a.promise({elem: t,props: se.extend({}, e),opts: se.extend(!0, {specialEasing: {}}, n),originalProperties: e,originalOptions: n,startTime: fn || R(),duration: n.duration,tweens: [],createTween: function(e, n) {
                var i = se.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
                return c.tweens.push(i), i
            },stop: function(e) {
                var n = 0, i = e ? c.tweens.length : 0;
                if (s)
                    return this;
                for (s = !0; i > n; n++)
                    c.tweens[n].run(1);
                return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
            }}), u = c.props;
        for ($(u, c.opts.specialEasing); r > o; o++)
            if (i = bn[o].call(c, t, u, c.opts))
                return i;
        return se.map(u, O, c), se.isFunction(c.opts.start) && c.opts.start.call(t, c), se.fx.timer(se.extend(l, {elem: t,anim: c,queue: c.opts.queue})), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }
    function U(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var i, s = 0, o = e.toLowerCase().match(be) || [];
            if (se.isFunction(n))
                for (; i = o[s++]; )
                    "+" === i.charAt(0) ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
        }
    }
    function H(t, e, n, i) {
        function s(a) {
            var l;
            return o[a] = !0, se.each(t[a] || [], function(t, a) {
                var c = a(e, n, i);
                return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
            }), l
        }
        var o = {}, r = t === Vn;
        return s(e.dataTypes[0]) || !o["*"] && s("*")
    }
    function B(t, e) {
        var n, i, s = se.ajaxSettings.flatOptions || {};
        for (i in e)
            void 0 !== e[i] && ((s[i] ? t : n || (n = {}))[i] = e[i]);
        return n && se.extend(!0, t, n), t
    }
    function F(t, e, n) {
        for (var i, s, o, r, a = t.contents, l = t.dataTypes; "*" === l[0]; )
            l.shift(), void 0 === s && (s = t.mimeType || e.getResponseHeader("Content-Type"));
        if (s)
            for (r in a)
                if (a[r] && a[r].test(s)) {
                    l.unshift(r);
                    break
                }
        if (l[0] in n)
            o = l[0];
        else {
            for (r in n) {
                if (!l[0] || t.converters[r + " " + l[0]]) {
                    o = r;
                    break
                }
                i || (i = r)
            }
            o = o || i
        }
        return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
    }
    function z(t, e, n, i) {
        var s, o, r, a, l, c = {}, u = t.dataTypes.slice();
        if (u[1])
            for (r in t.converters)
                c[r.toLowerCase()] = t.converters[r];
        for (o = u.shift(); o; )
            if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift())
                if ("*" === o)
                    o = l;
                else if ("*" !== l && l !== o) {
                    if (r = c[l + " " + o] || c["* " + o], !r)
                        for (s in c)
                            if (a = s.split(" "), a[1] === o && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                                r === !0 ? r = c[s] : c[s] !== !0 && (o = a[0], u.unshift(a[1]));
                                break
                            }
                    if (r !== !0)
                        if (r && t["throws"])
                            e = r(e);
                        else
                            try {
                                e = r(e)
                            } catch (d) {
                                return {state: "parsererror",error: r ? d : "No conversion from " + l + " to " + o}
                            }
                }
        return {state: "success",data: e}
    }
    function V(t, e, n, i) {
        var s;
        if (se.isArray(e))
            se.each(e, function(e, s) {
                n || qn.test(t) ? i(t, s) : V(t + "[" + ("object" == typeof s ? e : "") + "]", s, n, i)
            });
        else if (n || "object" !== se.type(e))
            i(t, e);
        else
            for (s in e)
                V(t + "[" + s + "]", e[s], n, i)
    }
    function W() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {
        }
    }
    function Y() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }
    function X(t) {
        return se.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var q = [], G = q.slice, J = q.concat, K = q.push, Z = q.indexOf, Q = {}, te = Q.toString, ee = Q.hasOwnProperty, ne = {}, ie = "1.11.1", se = function(t, e) {
        return new se.fn.init(t, e)
    }, oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, re = /^-ms-/, ae = /-([\da-z])/gi, le = function(t, e) {
        return e.toUpperCase()
    };
    se.fn = se.prototype = {jquery: ie,constructor: se,selector: "",length: 0,toArray: function() {
            return G.call(this)
        },get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : G.call(this)
        },pushStack: function(t) {
            var e = se.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },each: function(t, e) {
            return se.each(this, t, e)
        },map: function(t) {
            return this.pushStack(se.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },slice: function() {
            return this.pushStack(G.apply(this, arguments))
        },first: function() {
            return this.eq(0)
        },last: function() {
            return this.eq(-1)
        },eq: function(t) {
            var e = this.length, n = +t + (0 > t ? e : 0);
            return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
        },end: function() {
            return this.prevObject || this.constructor(null)
        },push: K,sort: q.sort,splice: q.splice}, se.extend = se.fn.extend = function() {
        var t, e, n, i, s, o, r = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof r && (c = r, r = arguments[a] || {}, a++), "object" == typeof r || se.isFunction(r) || (r = {}), a === l && (r = this, a--); l > a; a++)
            if (null != (s = arguments[a]))
                for (i in s)
                    t = r[i], n = s[i], r !== n && (c && n && (se.isPlainObject(n) || (e = se.isArray(n))) ? (e ? (e = !1, o = t && se.isArray(t) ? t : []) : o = t && se.isPlainObject(t) ? t : {}, r[i] = se.extend(c, o, n)) : void 0 !== n && (r[i] = n));
        return r
    }, se.extend({expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),isReady: !0,error: function(t) {
            throw new Error(t)
        },noop: function() {
        },isFunction: function(t) {
            return "function" === se.type(t)
        },isArray: Array.isArray || function(t) {
            return "array" === se.type(t)
        },isWindow: function(t) {
            return null != t && t == t.window
        },isNumeric: function(t) {
            return !se.isArray(t) && t - parseFloat(t) >= 0
        },isEmptyObject: function(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        },isPlainObject: function(t) {
            var e;
            if (!t || "object" !== se.type(t) || t.nodeType || se.isWindow(t))
                return !1;
            try {
                if (t.constructor && !ee.call(t, "constructor") && !ee.call(t.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            if (ne.ownLast)
                for (e in t)
                    return ee.call(t, e);
            for (e in t)
                ;
            return void 0 === e || ee.call(t, e)
        },type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Q[te.call(t)] || "object" : typeof t
        },globalEval: function(e) {
            e && se.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },camelCase: function(t) {
            return t.replace(re, "ms-").replace(ae, le)
        },nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },each: function(t, e, i) {
            var s, o = 0, r = t.length, a = n(t);
            if (i) {
                if (a)
                    for (; r > o && (s = e.apply(t[o], i), s !== !1); o++)
                        ;
                else
                    for (o in t)
                        if (s = e.apply(t[o], i), s === !1)
                            break
            } else if (a)
                for (; r > o && (s = e.call(t[o], o, t[o]), s !== !1); o++)
                    ;
            else
                for (o in t)
                    if (s = e.call(t[o], o, t[o]), s === !1)
                        break;
            return t
        },trim: function(t) {
            return null == t ? "" : (t + "").replace(oe, "")
        },makeArray: function(t, e) {
            var i = e || [];
            return null != t && (n(Object(t)) ? se.merge(i, "string" == typeof t ? [t] : t) : K.call(i, t)), i
        },inArray: function(t, e, n) {
            var i;
            if (e) {
                if (Z)
                    return Z.call(e, t, n);
                for (i = e.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in e && e[n] === t)
                        return n
            }
            return -1
        },merge: function(t, e) {
            for (var n = +e.length, i = 0, s = t.length; n > i; )
                t[s++] = e[i++];
            if (n !== n)
                for (; void 0 !== e[i]; )
                    t[s++] = e[i++];
            return t.length = s, t
        },grep: function(t, e, n) {
            for (var i, s = [], o = 0, r = t.length, a = !n; r > o; o++)
                i = !e(t[o], o), i !== a && s.push(t[o]);
            return s
        },map: function(t, e, i) {
            var s, o = 0, r = t.length, a = n(t), l = [];
            if (a)
                for (; r > o; o++)
                    s = e(t[o], o, i), null != s && l.push(s);
            else
                for (o in t)
                    s = e(t[o], o, i), null != s && l.push(s);
            return J.apply([], l)
        },guid: 1,proxy: function(t, e) {
            var n, i, s;
            return "string" == typeof e && (s = t[e], e = t, t = s), se.isFunction(t) ? (n = G.call(arguments, 2), i = function() {
                return t.apply(e || this, n.concat(G.call(arguments)))
            }, i.guid = t.guid = t.guid || se.guid++, i) : void 0
        },now: function() {
            return +new Date
        },support: ne}), se.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        Q["[object " + e + "]"] = e.toLowerCase()
    });
    var ce = function(t) {
        function e(t, e, n, i) {
            var s, o, r, a, l, c, d, p, f, m;
            if ((e ? e.ownerDocument || e : H) !== M && D(e), e = e || M, n = n || [], !t || "string" != typeof t)
                return n;
            if (1 !== (a = e.nodeType) && 9 !== a)
                return [];
            if (N && !i) {
                if (s = ye.exec(t))
                    if (r = s[1]) {
                        if (9 === a) {
                            if (o = e.getElementById(r), !o || !o.parentNode)
                                return n;
                            if (o.id === r)
                                return n.push(o), n
                        } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(r)) && j(e, o) && o.id === r)
                            return n.push(o), n
                    } else {
                        if (s[2])
                            return Q.apply(n, e.getElementsByTagName(t)), n;
                        if ((r = s[3]) && E.getElementsByClassName && e.getElementsByClassName)
                            return Q.apply(n, e.getElementsByClassName(r)), n
                    }
                if (E.qsa && (!O || !O.test(t))) {
                    if (p = d = U, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                        for (c = k(t), (d = e.getAttribute("id")) ? p = d.replace(Se, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = c.length; l--; )
                            c[l] = p + h(c[l]);
                        f = be.test(t) && u(e.parentNode) || e, m = c.join(",")
                    }
                    if (m)
                        try {
                            return Q.apply(n, f.querySelectorAll(m)), n
                        } catch (g) {
                        }finally {
                            d || e.removeAttribute("id")
                        }
                }
            }
            return C(t.replace(le, "$1"), e, n, i)
        }
        function n() {
            function t(n, i) {
                return e.push(n + " ") > T.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
            var e = [];
            return t
        }
        function i(t) {
            return t[U] = !0, t
        }
        function s(t) {
            var e = M.createElement("div");
            try {
                return !!t(e)
            } catch (n) {
                return !1
            }finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }
        function o(t, e) {
            for (var n = t.split("|"), i = t.length; i--; )
                T.attrHandle[n[i]] = e
        }
        function r(t, e) {
            var n = e && t, i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || q) - (~t.sourceIndex || q);
            if (i)
                return i;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === e)
                        return -1;
            return t ? 1 : -1
        }
        function a(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return "input" === n && e.type === t
            }
        }
        function l(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t
            }
        }
        function c(t) {
            return i(function(e) {
                return e = +e, i(function(n, i) {
                    for (var s, o = t([], n.length, e), r = o.length; r--; )
                        n[s = o[r]] && (n[s] = !(i[s] = n[s]))
                })
            })
        }
        function u(t) {
            return t && typeof t.getElementsByTagName !== X && t
        }
        function d() {
        }
        function h(t) {
            for (var e = 0, n = t.length, i = ""; n > e; e++)
                i += t[e].value;
            return i
        }
        function p(t, e, n) {
            var i = e.dir, s = n && "parentNode" === i, o = F++;
            return e.first ? function(e, n, o) {
                for (; e = e[i]; )
                    if (1 === e.nodeType || s)
                        return t(e, n, o)
            } : function(e, n, r) {
                var a, l, c = [B, o];
                if (r) {
                    for (; e = e[i]; )
                        if ((1 === e.nodeType || s) && t(e, n, r))
                            return !0
                } else
                    for (; e = e[i]; )
                        if (1 === e.nodeType || s) {
                            if (l = e[U] || (e[U] = {}), (a = l[i]) && a[0] === B && a[1] === o)
                                return c[2] = a[2];
                            if (l[i] = c, c[2] = t(e, n, r))
                                return !0
                        }
            }
        }
        function f(t) {
            return t.length > 1 ? function(e, n, i) {
                for (var s = t.length; s--; )
                    if (!t[s](e, n, i))
                        return !1;
                return !0
            } : t[0]
        }
        function m(t, n, i) {
            for (var s = 0, o = n.length; o > s; s++)
                e(t, n[s], i);
            return i
        }
        function g(t, e, n, i, s) {
            for (var o, r = [], a = 0, l = t.length, c = null != e; l > a; a++)
                (o = t[a]) && (!n || n(o, i, s)) && (r.push(o), c && e.push(a));
            return r
        }
        function v(t, e, n, s, o, r) {
            return s && !s[U] && (s = v(s)), o && !o[U] && (o = v(o, r)), i(function(i, r, a, l) {
                var c, u, d, h = [], p = [], f = r.length, v = i || m(e || "*", a.nodeType ? [a] : a, []), y = !t || !i && e ? v : g(v, h, t, a, l), b = n ? o || (i ? t : f || s) ? [] : r : y;
                if (n && n(y, b, a, l), s)
                    for (c = g(b, p), s(c, [], a, l), u = c.length; u--; )
                        (d = c[u]) && (b[p[u]] = !(y[p[u]] = d));
                if (i) {
                    if (o || t) {
                        if (o) {
                            for (c = [], u = b.length; u--; )
                                (d = b[u]) && c.push(y[u] = d);
                            o(null, b = [], c, l)
                        }
                        for (u = b.length; u--; )
                            (d = b[u]) && (c = o ? ee.call(i, d) : h[u]) > -1 && (i[c] = !(r[c] = d))
                    }
                } else
                    b = g(b === r ? b.splice(f, b.length) : b), o ? o(null, r, b, l) : Q.apply(r, b)
            })
        }
        function y(t) {
            for (var e, n, i, s = t.length, o = T.relative[t[0].type], r = o || T.relative[" "], a = o ? 1 : 0, l = p(function(t) {
                return t === e
            }, r, !0), c = p(function(t) {
                return ee.call(e, t) > -1
            }, r, !0), u = [function(t, n, i) {
                    return !o && (i || n !== x) || ((e = n).nodeType ? l(t, n, i) : c(t, n, i))
                }]; s > a; a++)
                if (n = T.relative[t[a].type])
                    u = [p(f(u), n)];
                else {
                    if (n = T.filter[t[a].type].apply(null, t[a].matches), n[U]) {
                        for (i = ++a; s > i && !T.relative[t[i].type]; i++)
                            ;
                        return v(a > 1 && f(u), a > 1 && h(t.slice(0, a - 1).concat({value: " " === t[a - 2].type ? "*" : ""})).replace(le, "$1"), n, i > a && y(t.slice(a, i)), s > i && y(t = t.slice(i)), s > i && h(t))
                    }
                    u.push(n)
                }
            return f(u)
        }
        function b(t, n) {
            var s = n.length > 0, o = t.length > 0, r = function(i, r, a, l, c) {
                var u, d, h, p = 0, f = "0", m = i && [], v = [], y = x, b = i || o && T.find.TAG("*", c), S = B += null == y ? 1 : Math.random() || .1, E = b.length;
                for (c && (x = r !== M && r); f !== E && null != (u = b[f]); f++) {
                    if (o && u) {
                        for (d = 0; h = t[d++]; )
                            if (h(u, r, a)) {
                                l.push(u);
                                break
                            }
                        c && (B = S)
                    }
                    s && ((u = !h && u) && p--, i && m.push(u))
                }
                if (p += f, s && f !== p) {
                    for (d = 0; h = n[d++]; )
                        h(m, v, r, a);
                    if (i) {
                        if (p > 0)
                            for (; f--; )
                                m[f] || v[f] || (v[f] = K.call(l));
                        v = g(v)
                    }
                    Q.apply(l, v), c && !i && v.length > 0 && p + n.length > 1 && e.uniqueSort(l)
                }
                return c && (B = S, x = y), m
            };
            return s ? i(r) : r
        }
        var S, E, T, w, _, k, L, C, x, A, I, D, M, R, N, O, P, $, j, U = "sizzle" + -new Date, H = t.document, B = 0, F = 0, z = n(), V = n(), W = n(), Y = function(t, e) {
            return t === e && (I = !0), 0
        }, X = "undefined", q = 1 << 31, G = {}.hasOwnProperty, J = [], K = J.pop, Z = J.push, Q = J.push, te = J.slice, ee = J.indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (this[e] === t)
                    return e;
            return -1
        }, ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ie = "[\\x20\\t\\r\\n\\f]", se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", oe = se.replace("w", "w#"), re = "\\[" + ie + "*(" + se + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ie + "*\\]", ae = ":(" + se + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)", le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"), ce = new RegExp("^" + ie + "*," + ie + "*"), ue = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"), de = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"), he = new RegExp(ae), pe = new RegExp("^" + oe + "$"), fe = {ID: new RegExp("^#(" + se + ")"),CLASS: new RegExp("^\\.(" + se + ")"),TAG: new RegExp("^(" + se.replace("w", "w*") + ")"),ATTR: new RegExp("^" + re),PSEUDO: new RegExp("^" + ae),CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),bool: new RegExp("^(?:" + ne + ")$", "i"),needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")}, me = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, Se = /'|\\/g, Ee = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"), Te = function(t, e, n) {
            var i = "0x" + e - 65536;
            return i !== i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        };
        try {
            Q.apply(J = te.call(H.childNodes), H.childNodes), J[H.childNodes.length].nodeType
        } catch (we) {
            Q = {apply: J.length ? function(t, e) {
                    Z.apply(t, te.call(e))
                } : function(t, e) {
                    for (var n = t.length, i = 0; t[n++] = e[i++]; )
                        ;
                    t.length = n - 1
                }}
        }
        E = e.support = {}, _ = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, D = e.setDocument = function(t) {
            var e, n = t ? t.ownerDocument || t : H, i = n.defaultView;
            return n !== M && 9 === n.nodeType && n.documentElement ? (M = n, R = n.documentElement, N = !_(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
                D()
            }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
                D()
            })), E.attributes = s(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), E.getElementsByTagName = s(function(t) {
                return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
            }), E.getElementsByClassName = ve.test(n.getElementsByClassName) && s(function(t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), E.getById = s(function(t) {
                return R.appendChild(t).id = U, !n.getElementsByName || !n.getElementsByName(U).length
            }), E.getById ? (T.find.ID = function(t, e) {
                if (typeof e.getElementById !== X && N) {
                    var n = e.getElementById(t);
                    return n && n.parentNode ? [n] : []
                }
            }, T.filter.ID = function(t) {
                var e = t.replace(Ee, Te);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete T.find.ID, T.filter.ID = function(t) {
                var e = t.replace(Ee, Te);
                return function(t) {
                    var n = typeof t.getAttributeNode !== X && t.getAttributeNode("id");
                    return n && n.value === e
                }
            }), T.find.TAG = E.getElementsByTagName ? function(t, e) {
                return typeof e.getElementsByTagName !== X ? e.getElementsByTagName(t) : void 0
            } : function(t, e) {
                var n, i = [], s = 0, o = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; n = o[s++]; )
                        1 === n.nodeType && i.push(n);
                    return i
                }
                return o
            }, T.find.CLASS = E.getElementsByClassName && function(t, e) {
                return typeof e.getElementsByClassName !== X && N ? e.getElementsByClassName(t) : void 0
            }, P = [], O = [], (E.qsa = ve.test(n.querySelectorAll)) && (s(function(t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && O.push("[*^$]=" + ie + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || O.push("\\[" + ie + "*(?:value|" + ne + ")"), t.querySelectorAll(":checked").length || O.push(":checked")
            }), s(function(t) {
                var e = n.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && O.push("name" + ie + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), O.push(",.*:")
            })), (E.matchesSelector = ve.test($ = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && s(function(t) {
                E.disconnectedMatch = $.call(t, "div"), $.call(t, "[s!='']:x"), P.push("!=", ae)
            }), O = O.length && new RegExp(O.join("|")), P = P.length && new RegExp(P.join("|")), e = ve.test(R.compareDocumentPosition), j = e || ve.test(R.contains) ? function(t, e) {
                var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
                return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode; )
                        if (e === t)
                            return !0;
                return !1
            }, Y = e ? function(t, e) {
                if (t === e)
                    return I = !0, 0;
                var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !E.sortDetached && e.compareDocumentPosition(t) === i ? t === n || t.ownerDocument === H && j(H, t) ? -1 : e === n || e.ownerDocument === H && j(H, e) ? 1 : A ? ee.call(A, t) - ee.call(A, e) : 0 : 4 & i ? -1 : 1)
            } : function(t, e) {
                if (t === e)
                    return I = !0, 0;
                var i, s = 0, o = t.parentNode, a = e.parentNode, l = [t], c = [e];
                if (!o || !a)
                    return t === n ? -1 : e === n ? 1 : o ? -1 : a ? 1 : A ? ee.call(A, t) - ee.call(A, e) : 0;
                if (o === a)
                    return r(t, e);
                for (i = t; i = i.parentNode; )
                    l.unshift(i);
                for (i = e; i = i.parentNode; )
                    c.unshift(i);
                for (; l[s] === c[s]; )
                    s++;
                return s ? r(l[s], c[s]) : l[s] === H ? -1 : c[s] === H ? 1 : 0
            }, n) : M
        }, e.matches = function(t, n) {
            return e(t, null, null, n)
        }, e.matchesSelector = function(t, n) {
            if ((t.ownerDocument || t) !== M && D(t), n = n.replace(de, "='$1']"), !(!E.matchesSelector || !N || P && P.test(n) || O && O.test(n)))
                try {
                    var i = $.call(t, n);
                    if (i || E.disconnectedMatch || t.document && 11 !== t.document.nodeType)
                        return i
                } catch (s) {
                }
            return e(n, M, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== M && D(t), j(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== M && D(t);
            var n = T.attrHandle[e.toLowerCase()], i = n && G.call(T.attrHandle, e.toLowerCase()) ? n(t, e, !N) : void 0;
            return void 0 !== i ? i : E.attributes || !N ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, n = [], i = 0, s = 0;
            if (I = !E.detectDuplicates, A = !E.sortStable && t.slice(0), t.sort(Y), I) {
                for (; e = t[s++]; )
                    e === t[s] && (i = n.push(s));
                for (; i--; )
                    t.splice(n[i], 1)
            }
            return A = null, t
        }, w = e.getText = function(t) {
            var e, n = "", i = 0, s = t.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof t.textContent)
                        return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling)
                        n += w(t)
                } else if (3 === s || 4 === s)
                    return t.nodeValue
            } else
                for (; e = t[i++]; )
                    n += w(e);
            return n
        }, T = e.selectors = {cacheLength: 50,createPseudo: i,match: fe,attrHandle: {},find: {},relative: {">": {dir: "parentNode",first: !0}," ": {dir: "parentNode"},"+": {dir: "previousSibling",first: !0},"~": {dir: "previousSibling"}},preFilter: {ATTR: function(t) {
                    return t[1] = t[1].replace(Ee, Te), t[3] = (t[3] || t[4] || t[5] || "").replace(Ee, Te), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },PSEUDO: function(t) {
                    var e, n = !t[6] && t[2];
                    return fe.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && he.test(n) && (e = k(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                }},filter: {TAG: function(t) {
                    var e = t.replace(Ee, Te).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },CLASS: function(t) {
                    var e = z[t + " "];
                    return e || (e = new RegExp("(^|" + ie + ")" + t + "(" + ie + "|$)")) && z(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== X && t.getAttribute("class") || "")
                    })
                },ATTR: function(t, n, i) {
                    return function(s) {
                        var o = e.attr(s, t);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },CHILD: function(t, e, n, i, s) {
                    var o = "nth" !== t.slice(0, 3), r = "last" !== t.slice(-4), a = "of-type" === e;
                    return 1 === i && 0 === s ? function(t) {
                        return !!t.parentNode
                    } : function(e, n, l) {
                        var c, u, d, h, p, f, m = o !== r ? "nextSibling" : "previousSibling", g = e.parentNode, v = a && e.nodeName.toLowerCase(), y = !l && !a;
                        if (g) {
                            if (o) {
                                for (; m; ) {
                                    for (d = e; d = d[m]; )
                                        if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)
                                            return !1;
                                    f = m = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [r ? g.firstChild : g.lastChild], r && y) {
                                for (u = g[U] || (g[U] = {}), c = u[t] || [], p = c[0] === B && c[1], h = c[0] === B && c[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (h = p = 0) || f.pop(); )
                                    if (1 === d.nodeType && ++h && d === e) {
                                        u[t] = [B, p, h];
                                        break
                                    }
                            } else if (y && (c = (e[U] || (e[U] = {}))[t]) && c[0] === B)
                                h = c[1];
                            else
                                for (; (d = ++p && d && d[m] || (h = p = 0) || f.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++h || (y && ((d[U] || (d[U] = {}))[t] = [B, h]), d !== e)); )
                                    ;
                            return h -= s, h === i || h % i === 0 && h / i >= 0
                        }
                    }
                },PSEUDO: function(t, n) {
                    var s, o = T.pseudos[t] || T.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return o[U] ? o(n) : o.length > 1 ? (s = [t, t, "", n], T.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function(t, e) {
                        for (var i, s = o(t, n), r = s.length; r--; )
                            i = ee.call(t, s[r]), t[i] = !(e[i] = s[r])
                    }) : function(t) {
                        return o(t, 0, s)
                    }) : o
                }},pseudos: {not: i(function(t) {
                    var e = [], n = [], s = L(t.replace(le, "$1"));
                    return s[U] ? i(function(t, e, n, i) {
                        for (var o, r = s(t, null, i, []), a = t.length; a--; )
                            (o = r[a]) && (t[a] = !(e[a] = o))
                    }) : function(t, i, o) {
                        return e[0] = t, s(e, null, o, n), !n.pop()
                    }
                }),has: i(function(t) {
                    return function(n) {
                        return e(t, n).length > 0
                    }
                }),contains: i(function(t) {
                    return function(e) {
                        return (e.textContent || e.innerText || w(e)).indexOf(t) > -1
                    }
                }),lang: i(function(t) {
                    return pe.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(Ee, Te).toLowerCase(), function(e) {
                        var n;
                        do
                            if (n = N ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                        while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),target: function(e) {
                    var n = t.location && t.location.hash;
                    return n && n.slice(1) === e.id
                },root: function(t) {
                    return t === R
                },focus: function(t) {
                    return t === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },enabled: function(t) {
                    return t.disabled === !1
                },disabled: function(t) {
                    return t.disabled === !0
                },checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                },empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6)
                            return !1;
                    return !0
                },parent: function(t) {
                    return !T.pseudos.empty(t)
                },header: function(t) {
                    return ge.test(t.nodeName)
                },input: function(t) {
                    return me.test(t.nodeName)
                },button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },first: c(function() {
                    return [0]
                }),last: c(function(t, e) {
                    return [e - 1]
                }),eq: c(function(t, e, n) {
                    return [0 > n ? n + e : n]
                }),even: c(function(t, e) {
                    for (var n = 0; e > n; n += 2)
                        t.push(n);
                    return t
                }),odd: c(function(t, e) {
                    for (var n = 1; e > n; n += 2)
                        t.push(n);
                    return t
                }),lt: c(function(t, e, n) {
                    for (var i = 0 > n ? n + e : n; --i >= 0; )
                        t.push(i);
                    return t
                }),gt: c(function(t, e, n) {
                    for (var i = 0 > n ? n + e : n; ++i < e; )
                        t.push(i);
                    return t
                })}}, T.pseudos.nth = T.pseudos.eq;
        for (S in {radio: !0,checkbox: !0,file: !0,password: !0,image: !0})
            T.pseudos[S] = a(S);
        for (S in {submit: !0,reset: !0})
            T.pseudos[S] = l(S);
        return d.prototype = T.filters = T.pseudos, T.setFilters = new d, k = e.tokenize = function(t, n) {
            var i, s, o, r, a, l, c, u = V[t + " "];
            if (u)
                return n ? 0 : u.slice(0);
            for (a = t, l = [], c = T.preFilter; a; ) {
                (!i || (s = ce.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(o = [])), i = !1, (s = ue.exec(a)) && (i = s.shift(), o.push({value: i,type: s[0].replace(le, " ")}), a = a.slice(i.length));
                for (r in T.filter)
                    !(s = fe[r].exec(a)) || c[r] && !(s = c[r](s)) || (i = s.shift(), o.push({value: i,type: r,matches: s}), a = a.slice(i.length));
                if (!i)
                    break
            }
            return n ? a.length : a ? e.error(t) : V(t, l).slice(0)
        }, L = e.compile = function(t, e) {
            var n, i = [], s = [], o = W[t + " "];
            if (!o) {
                for (e || (e = k(t)), n = e.length; n--; )
                    o = y(e[n]), o[U] ? i.push(o) : s.push(o);
                o = W(t, b(s, i)), o.selector = t
            }
            return o
        }, C = e.select = function(t, e, n, i) {
            var s, o, r, a, l, c = "function" == typeof t && t, d = !i && k(t = c.selector || t);
            if (n = n || [], 1 === d.length) {
                if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (r = o[0]).type && E.getById && 9 === e.nodeType && N && T.relative[o[1].type]) {
                    if (e = (T.find.ID(r.matches[0].replace(Ee, Te), e) || [])[0], !e)
                        return n;
                    c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                }
                for (s = fe.needsContext.test(t) ? 0 : o.length; s-- && (r = o[s], !T.relative[a = r.type]); )
                    if ((l = T.find[a]) && (i = l(r.matches[0].replace(Ee, Te), be.test(o[0].type) && u(e.parentNode) || e))) {
                        if (o.splice(s, 1), t = i.length && h(o), !t)
                            return Q.apply(n, i), n;
                        break
                    }
            }
            return (c || L(t, d))(i, e, !N, n, be.test(t) && u(e.parentNode) || e), n
        }, E.sortStable = U.split("").sort(Y).join("") === U, E.detectDuplicates = !!I, D(), E.sortDetached = s(function(t) {
            return 1 & t.compareDocumentPosition(M.createElement("div"))
        }), s(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(t, e, n) {
            return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), E.attributes && s(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || o("value", function(t, e, n) {
            return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), s(function(t) {
            return null == t.getAttribute("disabled")
        }) || o(ne, function(t, e, n) {
            var i;
            return n ? void 0 : t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }), e
    }(t);
    se.find = ce, se.expr = ce.selectors, se.expr[":"] = se.expr.pseudos, se.unique = ce.uniqueSort, se.text = ce.getText, se.isXMLDoc = ce.isXML, se.contains = ce.contains;
    var ue = se.expr.match.needsContext, de = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, he = /^.[^:#\[\.,]*$/;
    se.filter = function(t, e, n) {
        var i = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? se.find.matchesSelector(i, t) ? [i] : [] : se.find.matches(t, se.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, se.fn.extend({find: function(t) {
            var e, n = [], i = this, s = i.length;
            if ("string" != typeof t)
                return this.pushStack(se(t).filter(function() {
                    for (e = 0; s > e; e++)
                        if (se.contains(i[e], this))
                            return !0
                }));
            for (e = 0; s > e; e++)
                se.find(t, i[e], n);
            return n = this.pushStack(s > 1 ? se.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
        },filter: function(t) {
            return this.pushStack(i(this, t || [], !1))
        },not: function(t) {
            return this.pushStack(i(this, t || [], !0))
        },is: function(t) {
            return !!i(this, "string" == typeof t && ue.test(t) ? se(t) : t || [], !1).length
        }});
    var pe, fe = t.document, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ge = se.fn.init = function(t, e) {
        var n, i;
        if (!t)
            return this;
        if ("string" == typeof t) {
            if (n = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : me.exec(t), !n || !n[1] && e)
                return !e || e.jquery ? (e || pe).find(t) : this.constructor(e).find(t);
            if (n[1]) {
                if (e = e instanceof se ? e[0] : e, se.merge(this, se.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : fe, !0)), de.test(n[1]) && se.isPlainObject(e))
                    for (n in e)
                        se.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this
            }
            if (i = fe.getElementById(n[2]), i && i.parentNode) {
                if (i.id !== n[2])
                    return pe.find(t);
                this.length = 1, this[0] = i
            }
            return this.context = fe, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : se.isFunction(t) ? "undefined" != typeof pe.ready ? pe.ready(t) : t(se) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), se.makeArray(t, this))
    };
    ge.prototype = se.fn, pe = se(fe);
    var ve = /^(?:parents|prev(?:Until|All))/, ye = {children: !0,contents: !0,next: !0,prev: !0};
    se.extend({dir: function(t, e, n) {
            for (var i = [], s = t[e]; s && 9 !== s.nodeType && (void 0 === n || 1 !== s.nodeType || !se(s).is(n)); )
                1 === s.nodeType && i.push(s), s = s[e];
            return i
        },sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling)
                1 === t.nodeType && t !== e && n.push(t);
            return n
        }}), se.fn.extend({has: function(t) {
            var e, n = se(t, this), i = n.length;
            return this.filter(function() {
                for (e = 0; i > e; e++)
                    if (se.contains(this, n[e]))
                        return !0
            })
        },closest: function(t, e) {
            for (var n, i = 0, s = this.length, o = [], r = ue.test(t) || "string" != typeof t ? se(t, e || this.context) : 0; s > i; i++)
                for (n = this[i]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (r ? r.index(n) > -1 : 1 === n.nodeType && se.find.matchesSelector(n, t))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? se.unique(o) : o)
        },index: function(t) {
            return t ? "string" == typeof t ? se.inArray(this[0], se(t)) : se.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },add: function(t, e) {
            return this.pushStack(se.unique(se.merge(this.get(), se(t, e))))
        },addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }}), se.each({parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },parents: function(t) {
            return se.dir(t, "parentNode")
        },parentsUntil: function(t, e, n) {
            return se.dir(t, "parentNode", n)
        },next: function(t) {
            return s(t, "nextSibling")
        },prev: function(t) {
            return s(t, "previousSibling")
        },nextAll: function(t) {
            return se.dir(t, "nextSibling")
        },prevAll: function(t) {
            return se.dir(t, "previousSibling")
        },nextUntil: function(t, e, n) {
            return se.dir(t, "nextSibling", n)
        },prevUntil: function(t, e, n) {
            return se.dir(t, "previousSibling", n)
        },siblings: function(t) {
            return se.sibling((t.parentNode || {}).firstChild, t)
        },children: function(t) {
            return se.sibling(t.firstChild)
        },contents: function(t) {
            return se.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : se.merge([], t.childNodes)
        }}, function(t, e) {
        se.fn[t] = function(n, i) {
            var s = se.map(this, e, n);
            return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (s = se.filter(i, s)), this.length > 1 && (ye[t] || (s = se.unique(s)), ve.test(t) && (s = s.reverse())), this.pushStack(s)
        }
    });
    var be = /\S+/g, Se = {};
    se.Callbacks = function(t) {
        t = "string" == typeof t ? Se[t] || o(t) : se.extend({}, t);
        var e, n, i, s, r, a, l = [], c = !t.once && [], u = function(o) {
            for (n = t.memory && o, i = !0, r = a || 0, a = 0, s = l.length, e = !0; l && s > r; r++)
                if (l[r].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                    n = !1;
                    break
                }
            e = !1, l && (c ? c.length && u(c.shift()) : n ? l = [] : d.disable())
        }, d = {add: function() {
                if (l) {
                    var i = l.length;
                    !function o(e) {
                        se.each(e, function(e, n) {
                            var i = se.type(n);
                            "function" === i ? t.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && o(n)
                        })
                    }(arguments), e ? s = l.length : n && (a = i, u(n))
                }
                return this
            },remove: function() {
                return l && se.each(arguments, function(t, n) {
                    for (var i; (i = se.inArray(n, l, i)) > -1; )
                        l.splice(i, 1), e && (s >= i && s--, r >= i && r--)
                }), this
            },has: function(t) {
                return t ? se.inArray(t, l) > -1 : !(!l || !l.length)
            },empty: function() {
                return l = [], s = 0, this
            },disable: function() {
                return l = c = n = void 0, this
            },disabled: function() {
                return !l
            },lock: function() {
                return c = void 0, n || d.disable(), this
            },locked: function() {
                return !c
            },fireWith: function(t, n) {
                return !l || i && !c || (n = n || [], n = [t, n.slice ? n.slice() : n], e ? c.push(n) : u(n)), this
            },fire: function() {
                return d.fireWith(this, arguments), this
            },fired: function() {
                return !!i
            }};
        return d
    }, se.extend({Deferred: function(t) {
            var e = [["resolve", "done", se.Callbacks("once memory"), "resolved"], ["reject", "fail", se.Callbacks("once memory"), "rejected"], ["notify", "progress", se.Callbacks("memory")]], n = "pending", i = {state: function() {
                    return n
                },always: function() {
                    return s.done(arguments).fail(arguments), this
                },then: function() {
                    var t = arguments;
                    return se.Deferred(function(n) {
                        se.each(e, function(e, o) {
                            var r = se.isFunction(t[e]) && t[e];
                            s[o[1]](function() {
                                var t = r && r.apply(this, arguments);
                                t && se.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, r ? [t] : arguments)
                            })
                        }), t = null
                    }).promise()
                },promise: function(t) {
                    return null != t ? se.extend(t, i) : i
                }}, s = {};
            return i.pipe = i.then, se.each(e, function(t, o) {
                var r = o[2], a = o[3];
                i[o[1]] = r.add, a && r.add(function() {
                    n = a
                }, e[1 ^ t][2].disable, e[2][2].lock), s[o[0]] = function() {
                    return s[o[0] + "With"](this === s ? i : this, arguments), this
                }, s[o[0] + "With"] = r.fireWith
            }), i.promise(s), t && t.call(s, s), s
        },when: function(t) {
            var e, n, i, s = 0, o = G.call(arguments), r = o.length, a = 1 !== r || t && se.isFunction(t.promise) ? r : 0, l = 1 === a ? t : se.Deferred(), c = function(t, n, i) {
                return function(s) {
                    n[t] = this, i[t] = arguments.length > 1 ? G.call(arguments) : s, i === e ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                }
            };
            if (r > 1)
                for (e = new Array(r), n = new Array(r), i = new Array(r); r > s; s++)
                    o[s] && se.isFunction(o[s].promise) ? o[s].promise().done(c(s, i, o)).fail(l.reject).progress(c(s, n, e)) : --a;
            return a || l.resolveWith(i, o), l.promise()
        }});
    var Ee;
    se.fn.ready = function(t) {
        return se.ready.promise().done(t), this
    }, se.extend({isReady: !1,readyWait: 1,holdReady: function(t) {
            t ? se.readyWait++ : se.ready(!0)
        },ready: function(t) {
            if (t === !0 ? !--se.readyWait : !se.isReady) {
                if (!fe.body)
                    return setTimeout(se.ready);
                se.isReady = !0, t !== !0 && --se.readyWait > 0 || (Ee.resolveWith(fe, [se]), se.fn.triggerHandler && (se(fe).triggerHandler("ready"), se(fe).off("ready")))
            }
        }}), se.ready.promise = function(e) {
        if (!Ee)
            if (Ee = se.Deferred(), "complete" === fe.readyState)
                setTimeout(se.ready);
            else if (fe.addEventListener)
                fe.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1);
            else {
                fe.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
                var n = !1;
                try {
                    n = null == t.frameElement && fe.documentElement
                } catch (i) {
                }
                n && n.doScroll && !function s() {
                    if (!se.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (t) {
                            return setTimeout(s, 50)
                        }
                        r(), se.ready()
                    }
                }()
            }
        return Ee.promise(e)
    };
    var Te, we = "undefined";
    for (Te in se(ne))
        break;
    ne.ownLast = "0" !== Te, ne.inlineBlockNeedsLayout = !1, se(function() {
        var t, e, n, i;
        n = fe.getElementsByTagName("body")[0], n && n.style && (e = fe.createElement("div"), i = fe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), typeof e.style.zoom !== we && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
    }), function() {
        var t = fe.createElement("div");
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (e) {
                ne.deleteExpando = !1
            }
        }
        t = null
    }(), se.acceptData = function(t) {
        var e = se.noData[(t.nodeName + " ").toLowerCase()], n = +t.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
    };
    var _e = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ke = /([A-Z])/g;
    se.extend({cache: {},noData: {"applet ": !0,"embed ": !0,"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData: function(t) {
            return t = t.nodeType ? se.cache[t[se.expando]] : t[se.expando], !!t && !c(t)
        },data: function(t, e, n) {
            return u(t, e, n)
        },removeData: function(t, e) {
            return d(t, e)
        },_data: function(t, e, n) {
            return u(t, e, n, !0)
        },_removeData: function(t, e) {
            return d(t, e, !0)
        }}), se.fn.extend({data: function(t, e) {
            var n, i, s, o = this[0], r = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (s = se.data(o), 1 === o.nodeType && !se._data(o, "parsedAttrs"))) {
                    for (n = r.length; n--; )
                        r[n] && (i = r[n].name, 0 === i.indexOf("data-") && (i = se.camelCase(i.slice(5)), l(o, i, s[i])));
                    se._data(o, "parsedAttrs", !0)
                }
                return s
            }
            return "object" == typeof t ? this.each(function() {
                se.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                se.data(this, t, e)
            }) : o ? l(o, t, se.data(o, t)) : void 0
        },removeData: function(t) {
            return this.each(function() {
                se.removeData(this, t)
            })
        }}), se.extend({queue: function(t, e, n) {
            var i;
            return t ? (e = (e || "fx") + "queue", i = se._data(t, e), n && (!i || se.isArray(n) ? i = se._data(t, e, se.makeArray(n)) : i.push(n)), i || []) : void 0
        },dequeue: function(t, e) {
            e = e || "fx";
            var n = se.queue(t, e), i = n.length, s = n.shift(), o = se._queueHooks(t, e), r = function() {
                se.dequeue(t, e)
            };
            "inprogress" === s && (s = n.shift(), i--), s && ("fx" === e && n.unshift("inprogress"), delete o.stop, s.call(t, r, o)), !i && o && o.empty.fire()
        },_queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return se._data(t, n) || se._data(t, n, {empty: se.Callbacks("once memory").add(function() {
                    se._removeData(t, e + "queue"), se._removeData(t, n)
                })})
        }}), se.fn.extend({queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? se.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = se.queue(this, t, e);
                se._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && se.dequeue(this, t)
            })
        },dequeue: function(t) {
            return this.each(function() {
                se.dequeue(this, t)
            })
        },clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },promise: function(t, e) {
            var n, i = 1, s = se.Deferred(), o = this, r = this.length, a = function() {
                --i || s.resolveWith(o, [o])
            };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--; )
                n = se._data(o[r], t + "queueHooks"), n && n.empty && (i++, n.empty.add(a));
            return a(), s.promise(e)
        }});
    var Le = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ce = ["Top", "Right", "Bottom", "Left"], xe = function(t, e) {
        return t = e || t, "none" === se.css(t, "display") || !se.contains(t.ownerDocument, t)
    }, Ae = se.access = function(t, e, n, i, s, o, r) {
        var a = 0, l = t.length, c = null == n;
        if ("object" === se.type(n)) {
            s = !0;
            for (a in n)
                se.access(t, e, a, n[a], !0, o, r)
        } else if (void 0 !== i && (s = !0, se.isFunction(i) || (r = !0), c && (r ? (e.call(t, i), e = null) : (c = e, e = function(t, e, n) {
            return c.call(se(t), n)
        })), e))
            for (; l > a; a++)
                e(t[a], n, r ? i : i.call(t[a], a, e(t[a], n)));
        return s ? t : c ? e.call(t) : l ? e(t[0], n) : o
    }, Ie = /^(?:checkbox|radio)$/i;
    !function() {
        var t = fe.createElement("input"), e = fe.createElement("div"), n = fe.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === e.firstChild.nodeType, ne.tbody = !e.getElementsByTagName("tbody").length, ne.htmlSerialize = !!e.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, n.appendChild(t), ne.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, n.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
            ne.noCloneEvent = !1
        }), e.cloneNode(!0).click()), null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete e.test
            } catch (i) {
                ne.deleteExpando = !1
            }
        }
    }(), function() {
        var e, n, i = fe.createElement("div");
        for (e in {submit: !0,change: !0,focusin: !0})
            n = "on" + e, (ne[e + "Bubbles"] = n in t) || (i.setAttribute(n, "t"), ne[e + "Bubbles"] = i.attributes[n].expando === !1);
        i = null
    }();
    var De = /^(?:input|select|textarea)$/i, Me = /^key/, Re = /^(?:mouse|pointer|contextmenu)|click/, Ne = /^(?:focusinfocus|focusoutblur)$/, Oe = /^([^.]*)(?:\.(.+)|)$/;
    se.event = {global: {},add: function(t, e, n, i, s) {
            var o, r, a, l, c, u, d, h, p, f, m, g = se._data(t);
            if (g) {
                for (n.handler && (l = n, n = l.handler, s = l.selector), n.guid || (n.guid = se.guid++), (r = g.events) || (r = g.events = {}), (u = g.handle) || (u = g.handle = function(t) {
                    return typeof se === we || t && se.event.triggered === t.type ? void 0 : se.event.dispatch.apply(u.elem, arguments)
                }, u.elem = t), e = (e || "").match(be) || [""], a = e.length; a--; )
                    o = Oe.exec(e[a]) || [], p = m = o[1], f = (o[2] || "").split(".").sort(), p && (c = se.event.special[p] || {}, p = (s ? c.delegateType : c.bindType) || p, c = se.event.special[p] || {}, d = se.extend({type: p,origType: m,data: i,handler: n,guid: n.guid,selector: s,needsContext: s && se.expr.match.needsContext.test(s),namespace: f.join(".")}, l), (h = r[p]) || (h = r[p] = [], h.delegateCount = 0, c.setup && c.setup.call(t, i, f, u) !== !1 || (t.addEventListener ? t.addEventListener(p, u, !1) : t.attachEvent && t.attachEvent("on" + p, u))), c.add && (c.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), s ? h.splice(h.delegateCount++, 0, d) : h.push(d), se.event.global[p] = !0);
                t = null
            }
        },remove: function(t, e, n, i, s) {
            var o, r, a, l, c, u, d, h, p, f, m, g = se.hasData(t) && se._data(t);
            if (g && (u = g.events)) {
                for (e = (e || "").match(be) || [""], c = e.length; c--; )
                    if (a = Oe.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                        for (d = se.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, h = u[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--; )
                            r = h[o], !s && m !== r.origType || n && n.guid !== r.guid || a && !a.test(r.namespace) || i && i !== r.selector && ("**" !== i || !r.selector) || (h.splice(o, 1), r.selector && h.delegateCount--, d.remove && d.remove.call(t, r));
                        l && !h.length && (d.teardown && d.teardown.call(t, f, g.handle) !== !1 || se.removeEvent(t, p, g.handle), delete u[p])
                    } else
                        for (p in u)
                            se.event.remove(t, p + e[c], n, i, !0);
                se.isEmptyObject(u) && (delete g.handle, se._removeData(t, "events"))
            }
        },trigger: function(e, n, i, s) {
            var o, r, a, l, c, u, d, h = [i || fe], p = ee.call(e, "type") ? e.type : e, f = ee.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = u = i = i || fe, 3 !== i.nodeType && 8 !== i.nodeType && !Ne.test(p + se.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), r = p.indexOf(":") < 0 && "on" + p, e = e[se.expando] ? e : new se.Event(p, "object" == typeof e && e), e.isTrigger = s ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : se.makeArray(n, [e]), c = se.event.special[p] || {}, s || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                if (!s && !c.noBubble && !se.isWindow(i)) {
                    for (l = c.delegateType || p, Ne.test(l + p) || (a = a.parentNode); a; a = a.parentNode)
                        h.push(a), u = a;
                    u === (i.ownerDocument || fe) && h.push(u.defaultView || u.parentWindow || t)
                }
                for (d = 0; (a = h[d++]) && !e.isPropagationStopped(); )
                    e.type = d > 1 ? l : c.bindType || p, o = (se._data(a, "events") || {})[e.type] && se._data(a, "handle"), o && o.apply(a, n), o = r && a[r], o && o.apply && se.acceptData(a) && (e.result = o.apply(a, n), e.result === !1 && e.preventDefault());
                if (e.type = p, !s && !e.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), n) === !1) && se.acceptData(i) && r && i[p] && !se.isWindow(i)) {
                    u = i[r], u && (i[r] = null), se.event.triggered = p;
                    try {
                        i[p]()
                    } catch (m) {
                    }
                    se.event.triggered = void 0, u && (i[r] = u)
                }
                return e.result
            }
        },dispatch: function(t) {
            t = se.event.fix(t);
            var e, n, i, s, o, r = [], a = G.call(arguments), l = (se._data(this, "events") || {})[t.type] || [], c = se.event.special[t.type] || {};
            if (a[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (r = se.event.handlers.call(this, t, l), e = 0; (s = r[e++]) && !t.isPropagationStopped(); )
                    for (t.currentTarget = s.elem, o = 0; (i = s.handlers[o++]) && !t.isImmediatePropagationStopped(); )
                        (!t.namespace_re || t.namespace_re.test(i.namespace)) && (t.handleObj = i, t.data = i.data, n = ((se.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), void 0 !== n && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },handlers: function(t, e) {
            var n, i, s, o, r = [], a = e.delegateCount, l = t.target;
            if (a && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (s = [], o = 0; a > o; o++)
                            i = e[o], n = i.selector + " ", void 0 === s[n] && (s[n] = i.needsContext ? se(n, this).index(l) >= 0 : se.find(n, this, null, [l]).length), s[n] && s.push(i);
                        s.length && r.push({elem: l,handlers: s})
                    }
            return a < e.length && r.push({elem: this,handlers: e.slice(a)}), r
        },fix: function(t) {
            if (t[se.expando])
                return t;
            var e, n, i, s = t.type, o = t, r = this.fixHooks[s];
            for (r || (this.fixHooks[s] = r = Re.test(s) ? this.mouseHooks : Me.test(s) ? this.keyHooks : {}), i = r.props ? this.props.concat(r.props) : this.props, t = new se.Event(o), e = i.length; e--; )
                n = i[e], t[n] = o[n];
            return t.target || (t.target = o.srcElement || fe), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, o) : t
        },props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks: {},keyHooks: {props: "char charCode key keyCode".split(" "),filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }},mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter: function(t, e) {
                var n, i, s, o = e.button, r = e.fromElement;
                return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || fe, s = i.documentElement, n = i.body, t.pageX = e.clientX + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s && s.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (s && s.scrollTop || n && n.scrollTop || 0) - (s && s.clientTop || n && n.clientTop || 0)), !t.relatedTarget && r && (t.relatedTarget = r === t.target ? e.toElement : r), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }},special: {load: {noBubble: !0},focus: {trigger: function() {
                    if (this !== f() && this.focus)
                        try {
                            return this.focus(), !1
                        } catch (t) {
                        }
                },delegateType: "focusin"},blur: {trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },delegateType: "focusout"},click: {trigger: function() {
                    return se.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },_default: function(t) {
                    return se.nodeName(t.target, "a")
                }},beforeunload: {postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }}},simulate: function(t, e, n, i) {
            var s = se.extend(new se.Event, n, {type: t,isSimulated: !0,originalEvent: {}});
            i ? se.event.trigger(s, null, e) : se.event.dispatch.call(e, s), s.isDefaultPrevented() && n.preventDefault()
        }}, se.removeEvent = fe.removeEventListener ? function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n, !1)
    } : function(t, e, n) {
        var i = "on" + e;
        t.detachEvent && (typeof t[i] === we && (t[i] = null), t.detachEvent(i, n))
    }, se.Event = function(t, e) {
        return this instanceof se.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? h : p) : this.type = t, e && se.extend(this, e), this.timeStamp = t && t.timeStamp || se.now(), void (this[se.expando] = !0)) : new se.Event(t, e)
    }, se.Event.prototype = {isDefaultPrevented: p,isPropagationStopped: p,isImmediatePropagationStopped: p,preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = h, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = h, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = h, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }}, se.each({mouseenter: "mouseover",mouseleave: "mouseout",pointerenter: "pointerover",pointerleave: "pointerout"}, function(t, e) {
        se.event.special[t] = {delegateType: e,bindType: e,handle: function(t) {
                var n, i = this, s = t.relatedTarget, o = t.handleObj;
                return (!s || s !== i && !se.contains(i, s)) && (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
            }}
    }), ne.submitBubbles || (se.event.special.submit = {setup: function() {
            return se.nodeName(this, "form") ? !1 : void se.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target, n = se.nodeName(e, "input") || se.nodeName(e, "button") ? e.form : void 0;
                n && !se._data(n, "submitBubbles") && (se.event.add(n, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), se._data(n, "submitBubbles", !0))
            })
        },postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && se.event.simulate("submit", this.parentNode, t, !0))
        },teardown: function() {
            return se.nodeName(this, "form") ? !1 : void se.event.remove(this, "._submit")
        }}), ne.changeBubbles || (se.event.special.change = {setup: function() {
            return De.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (se.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), se.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), se.event.simulate("change", this, t, !0)
            })), !1) : void se.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                De.test(e.nodeName) && !se._data(e, "changeBubbles") && (se.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || se.event.simulate("change", this.parentNode, t, !0)
                }), se._data(e, "changeBubbles", !0))
            })
        },handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },teardown: function() {
            return se.event.remove(this, "._change"), !De.test(this.nodeName)
        }}), ne.focusinBubbles || se.each({focus: "focusin",blur: "focusout"}, function(t, e) {
        var n = function(t) {
            se.event.simulate(e, t.target, se.event.fix(t), !0)
        };
        se.event.special[e] = {setup: function() {
                var i = this.ownerDocument || this, s = se._data(i, e);
                s || i.addEventListener(t, n, !0), se._data(i, e, (s || 0) + 1)
            },teardown: function() {
                var i = this.ownerDocument || this, s = se._data(i, e) - 1;
                s ? se._data(i, e, s) : (i.removeEventListener(t, n, !0), se._removeData(i, e))
            }}
    }), se.fn.extend({on: function(t, e, n, i, s) {
            var o, r;
            if ("object" == typeof t) {
                "string" != typeof e && (n = n || e, e = void 0);
                for (o in t)
                    this.on(o, e, n, t[o], s);
                return this
            }
            if (null == n && null == i ? (i = e, n = e = void 0) : null == i && ("string" == typeof e ? (i = n, n = void 0) : (i = n, n = e, e = void 0)), i === !1)
                i = p;
            else if (!i)
                return this;
            return 1 === s && (r = i, i = function(t) {
                return se().off(t), r.apply(this, arguments)
            }, i.guid = r.guid || (r.guid = se.guid++)), this.each(function() {
                se.event.add(this, t, i, n, e)
            })
        },one: function(t, e, n, i) {
            return this.on(t, e, n, i, 1)
        },off: function(t, e, n) {
            var i, s;
            if (t && t.preventDefault && t.handleObj)
                return i = t.handleObj, se(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof t) {
                for (s in t)
                    this.off(s, e, t[s]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (n = e, e = void 0), n === !1 && (n = p), this.each(function() {
                se.event.remove(this, t, n, e)
            })
        },trigger: function(t, e) {
            return this.each(function() {
                se.event.trigger(t, e, this)
            })
        },triggerHandler: function(t, e) {
            var n = this[0];
            return n ? se.event.trigger(t, e, n, !0) : void 0
        }});
    var Pe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", $e = / jQuery\d+="(?:null|\d+)"/g, je = new RegExp("<(?:" + Pe + ")[\\s/>]", "i"), Ue = /^\s+/, He = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Be = /<([\w:]+)/, Fe = /<tbody/i, ze = /<|&#?\w+;/, Ve = /<(?:script|style|link)/i, We = /checked\s*(?:[^=]|=\s*.checked.)/i, Ye = /^$|\/(?:java|ecma)script/i, Xe = /^true\/(.*)/, qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ge = {option: [1, "<select multiple='multiple'>", "</select>"],legend: [1, "<fieldset>", "</fieldset>"],area: [1, "<map>", "</map>"],param: [1, "<object>", "</object>"],thead: [1, "<table>", "</table>"],tr: [2, "<table><tbody>", "</tbody></table>"],col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],_default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, Je = m(fe), Ke = Je.appendChild(fe.createElement("div"));
    Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td, se.extend({clone: function(t, e, n) {
            var i, s, o, r, a, l = se.contains(t.ownerDocument, t);
            if (ne.html5Clone || se.isXMLDoc(t) || !je.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Ke.innerHTML = t.outerHTML, Ke.removeChild(o = Ke.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || se.isXMLDoc(t)))
                for (i = g(o), a = g(t), r = 0; null != (s = a[r]); ++r)
                    i[r] && w(s, i[r]);
            if (e)
                if (n)
                    for (a = a || g(t), i = i || g(o), r = 0; null != (s = a[r]); r++)
                        T(s, i[r]);
                else
                    T(t, o);
            return i = g(o, "script"), i.length > 0 && E(i, !l && g(t, "script")), i = a = s = null, o
        },buildFragment: function(t, e, n, i) {
            for (var s, o, r, a, l, c, u, d = t.length, h = m(e), p = [], f = 0; d > f; f++)
                if (o = t[f], o || 0 === o)
                    if ("object" === se.type(o))
                        se.merge(p, o.nodeType ? [o] : o);
                    else if (ze.test(o)) {
                        for (a = a || h.appendChild(e.createElement("div")), l = (Be.exec(o) || ["", ""])[1].toLowerCase(), u = Ge[l] || Ge._default, a.innerHTML = u[1] + o.replace(He, "<$1></$2>") + u[2], s = u[0]; s--; )
                            a = a.lastChild;
                        if (!ne.leadingWhitespace && Ue.test(o) && p.push(e.createTextNode(Ue.exec(o)[0])), !ne.tbody)
                            for (o = "table" !== l || Fe.test(o) ? "<table>" !== u[1] || Fe.test(o) ? 0 : a : a.firstChild, s = o && o.childNodes.length; s--; )
                                se.nodeName(c = o.childNodes[s], "tbody") && !c.childNodes.length && o.removeChild(c);
                        for (se.merge(p, a.childNodes), a.textContent = ""; a.firstChild; )
                            a.removeChild(a.firstChild);
                        a = h.lastChild
                    } else
                        p.push(e.createTextNode(o));
            for (a && h.removeChild(a), ne.appendChecked || se.grep(g(p, "input"), v), f = 0; o = p[f++]; )
                if ((!i || -1 === se.inArray(o, i)) && (r = se.contains(o.ownerDocument, o), a = g(h.appendChild(o), "script"), r && E(a), n))
                    for (s = 0; o = a[s++]; )
                        Ye.test(o.type || "") && n.push(o);
            return a = null, h
        },cleanData: function(t, e) {
            for (var n, i, s, o, r = 0, a = se.expando, l = se.cache, c = ne.deleteExpando, u = se.event.special; null != (n = t[r]); r++)
                if ((e || se.acceptData(n)) && (s = n[a], o = s && l[s])) {
                    if (o.events)
                        for (i in o.events)
                            u[i] ? se.event.remove(n, i) : se.removeEvent(n, i, o.handle);
                    l[s] && (delete l[s], c ? delete n[a] : typeof n.removeAttribute !== we ? n.removeAttribute(a) : n[a] = null, q.push(s))
                }
        }}), se.fn.extend({text: function(t) {
            return Ae(this, function(t) {
                return void 0 === t ? se.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(t))
            }, null, t, arguments.length)
        },append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.appendChild(t)
                }
            })
        },prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },remove: function(t, e) {
            for (var n, i = t ? se.filter(t, this) : this, s = 0; null != (n = i[s]); s++)
                e || 1 !== n.nodeType || se.cleanData(g(n)), n.parentNode && (e && se.contains(n.ownerDocument, n) && E(g(n, "script")), n.parentNode.removeChild(n));
            return this
        },empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && se.cleanData(g(t, !1)); t.firstChild; )
                    t.removeChild(t.firstChild);
                t.options && se.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return se.clone(this, t, e)
            })
        },html: function(t) {
            return Ae(this, function(t) {
                var e = this[0] || {}, n = 0, i = this.length;
                if (void 0 === t)
                    return 1 === e.nodeType ? e.innerHTML.replace($e, "") : void 0;
                if (!("string" != typeof t || Ve.test(t) || !ne.htmlSerialize && je.test(t) || !ne.leadingWhitespace && Ue.test(t) || Ge[(Be.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(He, "<$1></$2>");
                    try {
                        for (; i > n; n++)
                            e = this[n] || {}, 1 === e.nodeType && (se.cleanData(g(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (s) {
                    }
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, se.cleanData(g(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },detach: function(t) {
            return this.remove(t, !0)
        },domManip: function(t, e) {
            t = J.apply([], t);
            var n, i, s, o, r, a, l = 0, c = this.length, u = this, d = c - 1, h = t[0], p = se.isFunction(h);
            if (p || c > 1 && "string" == typeof h && !ne.checkClone && We.test(h))
                return this.each(function(n) {
                    var i = u.eq(n);
                    p && (t[0] = h.call(this, n, i.html())), i.domManip(t, e)
                });
            if (c && (a = se.buildFragment(t, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                for (o = se.map(g(a, "script"), b), s = o.length; c > l; l++)
                    i = a, l !== d && (i = se.clone(i, !0, !0), s && se.merge(o, g(i, "script"))), e.call(this[l], i, l);
                if (s)
                    for (r = o[o.length - 1].ownerDocument, se.map(o, S), l = 0; s > l; l++)
                        i = o[l], Ye.test(i.type || "") && !se._data(i, "globalEval") && se.contains(r, i) && (i.src ? se._evalUrl && se._evalUrl(i.src) : se.globalEval((i.text || i.textContent || i.innerHTML || "").replace(qe, "")));
                a = n = null
            }
            return this
        }}), se.each({appendTo: "append",prependTo: "prepend",insertBefore: "before",insertAfter: "after",replaceAll: "replaceWith"}, function(t, e) {
        se.fn[t] = function(t) {
            for (var n, i = 0, s = [], o = se(t), r = o.length - 1; r >= i; i++)
                n = i === r ? this : this.clone(!0), se(o[i])[e](n), K.apply(s, n.get());
            return this.pushStack(s)
        }
    });
    var Ze, Qe = {};
    !function() {
        var t;
        ne.shrinkWrapBlocks = function() {
            if (null != t)
                return t;
            t = !1;
            var e, n, i;
            return n = fe.getElementsByTagName("body")[0], n && n.style ? (e = fe.createElement("div"), i = fe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), typeof e.style.zoom !== we && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(fe.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), n.removeChild(i), t) : void 0
        }
    }();
    var tn, en, nn = /^margin/, sn = new RegExp("^(" + Le + ")(?!px)[a-z%]+$", "i"), on = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (tn = function(t) {
        return t.ownerDocument.defaultView.getComputedStyle(t, null)
    }, en = function(t, e, n) {
        var i, s, o, r, a = t.style;
        return n = n || tn(t), r = n ? n.getPropertyValue(e) || n[e] : void 0, n && ("" !== r || se.contains(t.ownerDocument, t) || (r = se.style(t, e)), sn.test(r) && nn.test(e) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = n.width, a.width = i, a.minWidth = s, a.maxWidth = o)), void 0 === r ? r : r + ""
    }) : fe.documentElement.currentStyle && (tn = function(t) {
        return t.currentStyle
    }, en = function(t, e, n) {
        var i, s, o, r, a = t.style;
        return n = n || tn(t), r = n ? n[e] : void 0, null == r && a && a[e] && (r = a[e]), sn.test(r) && !on.test(e) && (i = a.left, s = t.runtimeStyle, o = s && s.left, o && (s.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : r, r = a.pixelLeft + "px", a.left = i, o && (s.left = o)), void 0 === r ? r : r + "" || "auto"
    }), function() {
        function e() {
            var e, n, i, s;
            n = fe.getElementsByTagName("body")[0], n && n.style && (e = fe.createElement("div"), i = fe.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = r = !1, l = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, r = "4px" === (t.getComputedStyle(e, null) || {width: "4px"}).width, s = e.appendChild(fe.createElement("div")), s.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", s.style.marginRight = s.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(s, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = e.getElementsByTagName("td"), s[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === s[0].offsetHeight, a && (s[0].style.display = "", s[1].style.display = "none", a = 0 === s[0].offsetHeight), n.removeChild(i))
        }
        var n, i, s, o, r, a, l;
        n = fe.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", s = n.getElementsByTagName("a")[0], i = s && s.style, i && (i.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === i.opacity, ne.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, se.extend(ne, {reliableHiddenOffsets: function() {
                return null == a && e(), a
            },boxSizingReliable: function() {
                return null == r && e(), r
            },pixelPosition: function() {
                return null == o && e(), o
            },reliableMarginRight: function() {
                return null == l && e(), l
            }}))
    }(), se.swap = function(t, e, n, i) {
        var s, o, r = {};
        for (o in e)
            r[o] = t.style[o], t.style[o] = e[o];
        s = n.apply(t, i || []);
        for (o in e)
            t.style[o] = r[o];
        return s
    };
    var rn = /alpha\([^)]*\)/i, an = /opacity\s*=\s*([^)]*)/, ln = /^(none|table(?!-c[ea]).+)/, cn = new RegExp("^(" + Le + ")(.*)$", "i"), un = new RegExp("^([+-])=(" + Le + ")", "i"), dn = {position: "absolute",visibility: "hidden",display: "block"}, hn = {letterSpacing: "0",fontWeight: "400"}, pn = ["Webkit", "O", "Moz", "ms"];
    se.extend({cssHooks: {opacity: {get: function(t, e) {
                    if (e) {
                        var n = en(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }}},cssNumber: {columnCount: !0,fillOpacity: !0,flexGrow: !0,flexShrink: !0,fontWeight: !0,lineHeight: !0,opacity: !0,order: !0,orphans: !0,widows: !0,zIndex: !0,zoom: !0},cssProps: {"float": ne.cssFloat ? "cssFloat" : "styleFloat"},style: function(t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var s, o, r, a = se.camelCase(e), l = t.style;
                if (e = se.cssProps[a] || (se.cssProps[a] = C(l, a)), r = se.cssHooks[e] || se.cssHooks[a], void 0 === n)
                    return r && "get" in r && void 0 !== (s = r.get(t, !1, i)) ? s : l[e];
                if (o = typeof n, "string" === o && (s = un.exec(n)) && (n = (s[1] + 1) * s[2] + parseFloat(se.css(t, e)), o = "number"), null != n && n === n && ("number" !== o || se.cssNumber[a] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(r && "set" in r && void 0 === (n = r.set(t, n, i)))))
                    try {
                        l[e] = n
                    } catch (c) {
                    }
            }
        },css: function(t, e, n, i) {
            var s, o, r, a = se.camelCase(e);
            return e = se.cssProps[a] || (se.cssProps[a] = C(t.style, a)), r = se.cssHooks[e] || se.cssHooks[a], r && "get" in r && (o = r.get(t, !0, n)), void 0 === o && (o = en(t, e, i)), "normal" === o && e in hn && (o = hn[e]), "" === n || n ? (s = parseFloat(o), n === !0 || se.isNumeric(s) ? s || 0 : o) : o
        }}), se.each(["height", "width"], function(t, e) {
        se.cssHooks[e] = {get: function(t, n, i) {
                return n ? ln.test(se.css(t, "display")) && 0 === t.offsetWidth ? se.swap(t, dn, function() {
                    return D(t, e, i)
                }) : D(t, e, i) : void 0
            },set: function(t, n, i) {
                var s = i && tn(t);
                return A(t, n, i ? I(t, e, i, ne.boxSizing && "border-box" === se.css(t, "boxSizing", !1, s), s) : 0)
            }}
    }), ne.opacity || (se.cssHooks.opacity = {get: function(t, e) {
            return an.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },set: function(t, e) {
            var n = t.style, i = t.currentStyle, s = se.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "", o = i && i.filter || n.filter || "";
            n.zoom = 1, (e >= 1 || "" === e) && "" === se.trim(o.replace(rn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = rn.test(o) ? o.replace(rn, s) : o + " " + s)
        }}), se.cssHooks.marginRight = L(ne.reliableMarginRight, function(t, e) {
        return e ? se.swap(t, {display: "inline-block"}, en, [t, "marginRight"]) : void 0
    }), se.each({margin: "",padding: "",border: "Width"}, function(t, e) {
        se.cssHooks[t + e] = {expand: function(n) {
                for (var i = 0, s = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)
                    s[t + Ce[i] + e] = o[i] || o[i - 2] || o[0];
                return s
            }}, nn.test(t) || (se.cssHooks[t + e].set = A)
    }), se.fn.extend({css: function(t, e) {
            return Ae(this, function(t, e, n) {
                var i, s, o = {}, r = 0;
                if (se.isArray(e)) {
                    for (i = tn(t), s = e.length; s > r; r++)
                        o[e[r]] = se.css(t, e[r], !1, i);
                    return o
                }
                return void 0 !== n ? se.style(t, e, n) : se.css(t, e)
            }, t, e, arguments.length > 1)
        },show: function() {
            return x(this, !0)
        },hide: function() {
            return x(this)
        },toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                xe(this) ? se(this).show() : se(this).hide()
            })
        }}), se.Tween = M, M.prototype = {constructor: M,init: function(t, e, n, i, s, o) {
            this.elem = t, this.prop = n, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (se.cssNumber[n] ? "" : "px")
        },cur: function() {
            var t = M.propHooks[this.prop];
            return t && t.get ? t.get(this) : M.propHooks._default.get(this)
        },run: function(t) {
            var e, n = M.propHooks[this.prop];
            return this.pos = e = this.options.duration ? se.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
        }}, M.prototype.init.prototype = M.prototype, M.propHooks = {_default: {get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = se.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },set: function(t) {
                se.fx.step[t.prop] ? se.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[se.cssProps[t.prop]] || se.cssHooks[t.prop]) ? se.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }}}, M.propHooks.scrollTop = M.propHooks.scrollLeft = {set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }}, se.easing = {linear: function(t) {
            return t
        },swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }}, se.fx = M.prototype.init, se.fx.step = {};
    var fn, mn, gn = /^(?:toggle|show|hide)$/, vn = new RegExp("^(?:([+-])=|)(" + Le + ")([a-z%]*)$", "i"), yn = /queueHooks$/, bn = [P], Sn = {"*": [function(t, e) {
                var n = this.createTween(t, e), i = n.cur(), s = vn.exec(e), o = s && s[3] || (se.cssNumber[t] ? "" : "px"), r = (se.cssNumber[t] || "px" !== o && +i) && vn.exec(se.css(n.elem, t)), a = 1, l = 20;
                if (r && r[3] !== o) {
                    o = o || r[3], s = s || [], r = +i || 1;
                    do
                        a = a || ".5", r /= a, se.style(n.elem, t, r + o);
                    while (a !== (a = n.cur() / i) && 1 !== a && --l)
                }
                return s && (r = n.start = +r || +i || 0, n.unit = o, n.end = s[1] ? r + (s[1] + 1) * s[2] : +s[2]), n
            }]};
    se.Animation = se.extend(j, {tweener: function(t, e) {
            se.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var n, i = 0, s = t.length; s > i; i++)
                n = t[i], Sn[n] = Sn[n] || [], Sn[n].unshift(e)
        },prefilter: function(t, e) {
            e ? bn.unshift(t) : bn.push(t)
        }}), se.speed = function(t, e, n) {
        var i = t && "object" == typeof t ? se.extend({}, t) : {complete: n || !n && e || se.isFunction(t) && t,duration: t,easing: n && e || e && !se.isFunction(e) && e};
        return i.duration = se.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in se.fx.speeds ? se.fx.speeds[i.duration] : se.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            se.isFunction(i.old) && i.old.call(this), i.queue && se.dequeue(this, i.queue)
        }, i
    }, se.fn.extend({fadeTo: function(t, e, n, i) {
            return this.filter(xe).css("opacity", 0).show().end().animate({opacity: e}, t, n, i)
        },animate: function(t, e, n, i) {
            var s = se.isEmptyObject(t), o = se.speed(e, n, i), r = function() {
                var e = j(this, se.extend({}, t), o);
                (s || se._data(this, "finish")) && e.stop(!0)
            };
            return r.finish = r, s || o.queue === !1 ? this.each(r) : this.queue(o.queue, r)
        },stop: function(t, e, n) {
            var i = function(t) {
                var e = t.stop;
                delete t.stop, e(n)
            };
            return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                var e = !0, s = null != t && t + "queueHooks", o = se.timers, r = se._data(this);
                if (s)
                    r[s] && r[s].stop && i(r[s]);
                else
                    for (s in r)
                        r[s] && r[s].stop && yn.test(s) && i(r[s]);
                for (s = o.length; s--; )
                    o[s].elem !== this || null != t && o[s].queue !== t || (o[s].anim.stop(n), e = !1, o.splice(s, 1));
                (e || !n) && se.dequeue(this, t)
            })
        },finish: function(t) {
            return t !== !1 && (t = t || "fx"), this.each(function() {
                var e, n = se._data(this), i = n[t + "queue"], s = n[t + "queueHooks"], o = se.timers, r = i ? i.length : 0;
                for (n.finish = !0, se.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = o.length; e--; )
                    o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; r > e; e++)
                    i[e] && i[e].finish && i[e].finish.call(this);
                delete n.finish
            })
        }}), se.each(["toggle", "show", "hide"], function(t, e) {
        var n = se.fn[e];
        se.fn[e] = function(t, i, s) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(N(e, !0), t, i, s)
        }
    }), se.each({slideDown: N("show"),slideUp: N("hide"),slideToggle: N("toggle"),fadeIn: {opacity: "show"},fadeOut: {opacity: "hide"},fadeToggle: {opacity: "toggle"}}, function(t, e) {
        se.fn[t] = function(t, n, i) {
            return this.animate(e, t, n, i)
        }
    }), se.timers = [], se.fx.tick = function() {
        var t, e = se.timers, n = 0;
        for (fn = se.now(); n < e.length; n++)
            t = e[n], t() || e[n] !== t || e.splice(n--, 1);
        e.length || se.fx.stop(), fn = void 0
    }, se.fx.timer = function(t) {
        se.timers.push(t), t() ? se.fx.start() : se.timers.pop()
    }, se.fx.interval = 13, se.fx.start = function() {
        mn || (mn = setInterval(se.fx.tick, se.fx.interval))
    }, se.fx.stop = function() {
        clearInterval(mn), mn = null
    }, se.fx.speeds = {slow: 600,fast: 200,_default: 400}, se.fn.delay = function(t, e) {
        return t = se.fx ? se.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
            var i = setTimeout(e, t);
            n.stop = function() {
                clearTimeout(i)
            }
        })
    }, function() {
        var t, e, n, i, s;
        e = fe.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = e.getElementsByTagName("a")[0], n = fe.createElement("select"), s = n.appendChild(fe.createElement("option")), t = e.getElementsByTagName("input")[0], i.style.cssText = "top:1px", ne.getSetAttribute = "t" !== e.className, ne.style = /top/.test(i.getAttribute("style")), ne.hrefNormalized = "/a" === i.getAttribute("href"), ne.checkOn = !!t.value, ne.optSelected = s.selected, ne.enctype = !!fe.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !s.disabled, t = fe.createElement("input"), t.setAttribute("value", ""), ne.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ne.radioValue = "t" === t.value
    }();
    var En = /\r/g;
    se.fn.extend({val: function(t) {
            var e, n, i, s = this[0];
            {
                if (arguments.length)
                    return i = se.isFunction(t), this.each(function(n) {
                        var s;
                        1 === this.nodeType && (s = i ? t.call(this, n, se(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : se.isArray(s) && (s = se.map(s, function(t) {
                            return null == t ? "" : t + ""
                        })), e = se.valHooks[this.type] || se.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s))
                    });
                if (s)
                    return e = se.valHooks[s.type] || se.valHooks[s.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(s, "value")) ? n : (n = s.value, "string" == typeof n ? n.replace(En, "") : null == n ? "" : n)
            }
        }}), se.extend({valHooks: {option: {get: function(t) {
                    var e = se.find.attr(t, "value");
                    return null != e ? e : se.trim(se.text(t))
                }},select: {get: function(t) {
                    for (var e, n, i = t.options, s = t.selectedIndex, o = "select-one" === t.type || 0 > s, r = o ? null : [], a = o ? s + 1 : i.length, l = 0 > s ? a : o ? s : 0; a > l; l++)
                        if (n = i[l], !(!n.selected && l !== s || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && se.nodeName(n.parentNode, "optgroup"))) {
                            if (e = se(n).val(), o)
                                return e;
                            r.push(e)
                        }
                    return r
                },set: function(t, e) {
                    for (var n, i, s = t.options, o = se.makeArray(e), r = s.length; r--; )
                        if (i = s[r], se.inArray(se.valHooks.option.get(i), o) >= 0)
                            try {
                                i.selected = n = !0
                            } catch (a) {
                                i.scrollHeight
                            }
                        else
                            i.selected = !1;
                    return n || (t.selectedIndex = -1), s
                }}}}), se.each(["radio", "checkbox"], function() {
        se.valHooks[this] = {set: function(t, e) {
                return se.isArray(e) ? t.checked = se.inArray(se(t).val(), e) >= 0 : void 0
            }}, ne.checkOn || (se.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var Tn, wn, _n = se.expr.attrHandle, kn = /^(?:checked|selected)$/i, Ln = ne.getSetAttribute, Cn = ne.input;
    se.fn.extend({attr: function(t, e) {
            return Ae(this, se.attr, t, e, arguments.length > 1)
        },removeAttr: function(t) {
            return this.each(function() {
                se.removeAttr(this, t)
            })
        }}), se.extend({attr: function(t, e, n) {
            var i, s, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o)
                return typeof t.getAttribute === we ? se.prop(t, e, n) : (1 === o && se.isXMLDoc(t) || (e = e.toLowerCase(), i = se.attrHooks[e] || (se.expr.match.bool.test(e) ? wn : Tn)), void 0 === n ? i && "get" in i && null !== (s = i.get(t, e)) ? s : (s = se.find.attr(t, e), null == s ? void 0 : s) : null !== n ? i && "set" in i && void 0 !== (s = i.set(t, n, e)) ? s : (t.setAttribute(e, n + ""), n) : void se.removeAttr(t, e))
        },removeAttr: function(t, e) {
            var n, i, s = 0, o = e && e.match(be);
            if (o && 1 === t.nodeType)
                for (; n = o[s++]; )
                    i = se.propFix[n] || n, se.expr.match.bool.test(n) ? Cn && Ln || !kn.test(n) ? t[i] = !1 : t[se.camelCase("default-" + n)] = t[i] = !1 : se.attr(t, n, ""), t.removeAttribute(Ln ? n : i)
        },attrHooks: {type: {set: function(t, e) {
                    if (!ne.radioValue && "radio" === e && se.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }}}}), wn = {set: function(t, e, n) {
            return e === !1 ? se.removeAttr(t, n) : Cn && Ln || !kn.test(n) ? t.setAttribute(!Ln && se.propFix[n] || n, n) : t[se.camelCase("default-" + n)] = t[n] = !0, n
        }}, se.each(se.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = _n[e] || se.find.attr;
        _n[e] = Cn && Ln || !kn.test(e) ? function(t, e, i) {
            var s, o;
            return i || (o = _n[e], _n[e] = s, s = null != n(t, e, i) ? e.toLowerCase() : null, _n[e] = o), s
        } : function(t, e, n) {
            return n ? void 0 : t[se.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), Cn && Ln || (se.attrHooks.value = {set: function(t, e, n) {
            return se.nodeName(t, "input") ? void (t.defaultValue = e) : Tn && Tn.set(t, e, n)
        }}), Ln || (Tn = {set: function(t, e, n) {
            var i = t.getAttributeNode(n);
            return i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n) ? e : void 0
        }}, _n.id = _n.name = _n.coords = function(t, e, n) {
        var i;
        return n ? void 0 : (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
    }, se.valHooks.button = {get: function(t, e) {
            var n = t.getAttributeNode(e);
            return n && n.specified ? n.value : void 0
        },set: Tn.set}, se.attrHooks.contenteditable = {set: function(t, e, n) {
            Tn.set(t, "" === e ? !1 : e, n)
        }}, se.each(["width", "height"], function(t, e) {
        se.attrHooks[e] = {set: function(t, n) {
                return "" === n ? (t.setAttribute(e, "auto"), n) : void 0
            }}
    })), ne.style || (se.attrHooks.style = {get: function(t) {
            return t.style.cssText || void 0
        },set: function(t, e) {
            return t.style.cssText = e + ""
        }});
    var xn = /^(?:input|select|textarea|button|object)$/i, An = /^(?:a|area)$/i;
    se.fn.extend({prop: function(t, e) {
            return Ae(this, se.prop, t, e, arguments.length > 1)
        },removeProp: function(t) {
            return t = se.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) {
                }
            })
        }}), se.extend({propFix: {"for": "htmlFor","class": "className"},prop: function(t, e, n) {
            var i, s, o, r = t.nodeType;
            if (t && 3 !== r && 8 !== r && 2 !== r)
                return o = 1 !== r || !se.isXMLDoc(t), o && (e = se.propFix[e] || e, s = se.propHooks[e]), void 0 !== n ? s && "set" in s && void 0 !== (i = s.set(t, n, e)) ? i : t[e] = n : s && "get" in s && null !== (i = s.get(t, e)) ? i : t[e]
        },propHooks: {tabIndex: {get: function(t) {
                    var e = se.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : xn.test(t.nodeName) || An.test(t.nodeName) && t.href ? 0 : -1
                }}}}), ne.hrefNormalized || se.each(["href", "src"], function(t, e) {
        se.propHooks[e] = {get: function(t) {
                return t.getAttribute(e, 4)
            }}
    }), ne.optSelected || (se.propHooks.selected = {get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }}), se.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        se.propFix[this.toLowerCase()] = this
    }), ne.enctype || (se.propFix.enctype = "encoding");
    var In = /[\t\r\n\f]/g;
    se.fn.extend({addClass: function(t) {
            var e, n, i, s, o, r, a = 0, l = this.length, c = "string" == typeof t && t;
            if (se.isFunction(t))
                return this.each(function(e) {
                    se(this).addClass(t.call(this, e, this.className))
                });
            if (c)
                for (e = (t || "").match(be) || []; l > a; a++)
                    if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(In, " ") : " ")) {
                        for (o = 0; s = e[o++]; )
                            i.indexOf(" " + s + " ") < 0 && (i += s + " ");
                        r = se.trim(i), n.className !== r && (n.className = r)
                    }
            return this
        },removeClass: function(t) {
            var e, n, i, s, o, r, a = 0, l = this.length, c = 0 === arguments.length || "string" == typeof t && t;
            if (se.isFunction(t))
                return this.each(function(e) {
                    se(this).removeClass(t.call(this, e, this.className))
                });
            if (c)
                for (e = (t || "").match(be) || []; l > a; a++)
                    if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(In, " ") : "")) {
                        for (o = 0; s = e[o++]; )
                            for (; i.indexOf(" " + s + " ") >= 0; )
                                i = i.replace(" " + s + " ", " ");
                        r = t ? se.trim(i) : "", n.className !== r && (n.className = r)
                    }
            return this
        },toggleClass: function(t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : this.each(se.isFunction(t) ? function(n) {
                se(this).toggleClass(t.call(this, n, this.className, e), e)
            } : function() {
                if ("string" === n)
                    for (var e, i = 0, s = se(this), o = t.match(be) || []; e = o[i++]; )
                        s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                else
                    (n === we || "boolean" === n) && (this.className && se._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : se._data(this, "__className__") || "")
            })
        },hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, i = this.length; i > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(In, " ").indexOf(e) >= 0)
                    return !0;
            return !1
        }}), se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        se.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    }), se.fn.extend({hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },unbind: function(t, e) {
            return this.off(t, null, e)
        },delegate: function(t, e, n, i) {
            return this.on(e, t, n, i)
        },undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }});
    var Dn = se.now(), Mn = /\?/, Rn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    se.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse)
            return t.JSON.parse(e + "");
        var n, i = null, s = se.trim(e + "");
        return s && !se.trim(s.replace(Rn, function(t, e, s, o) {
            return n && e && (i = 0), 0 === i ? t : (n = s || e, i += !o - !s, "")
        })) ? Function("return " + s)() : se.error("Invalid JSON: " + e)
    }, se.parseXML = function(e) {
        var n, i;
        if (!e || "string" != typeof e)
            return null;
        try {
            t.DOMParser ? (i = new DOMParser, n = i.parseFromString(e, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(e))
        } catch (s) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || se.error("Invalid XML: " + e), n
    };
    var Nn, On, Pn = /#.*$/, $n = /([?&])_=[^&]*/, jn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Un = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Hn = /^(?:GET|HEAD)$/, Bn = /^\/\//, Fn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, zn = {}, Vn = {}, Wn = "*/".concat("*");
    try {
        On = location.href
    } catch (Yn) {
        On = fe.createElement("a"), On.href = "", On = On.href
    }
    Nn = Fn.exec(On.toLowerCase()) || [], se.extend({active: 0,lastModified: {},etag: {},ajaxSettings: {url: On,type: "GET",isLocal: Un.test(Nn[1]),global: !0,processData: !0,async: !0,contentType: "application/x-www-form-urlencoded; charset=UTF-8",accepts: {"*": Wn,text: "text/plain",html: "text/html",xml: "application/xml, text/xml",json: "application/json, text/javascript"},contents: {xml: /xml/,html: /html/,json: /json/},responseFields: {xml: "responseXML",text: "responseText",json: "responseJSON"},converters: {"* text": String,"text html": !0,"text json": se.parseJSON,"text xml": se.parseXML},flatOptions: {url: !0,context: !0}},ajaxSetup: function(t, e) {
            return e ? B(B(t, se.ajaxSettings), e) : B(se.ajaxSettings, t)
        },ajaxPrefilter: U(zn),ajaxTransport: U(Vn),ajax: function(t, e) {
            function n(t, e, n, i) {
                var s, u, v, y, S, T = e;
                2 !== b && (b = 2, a && clearTimeout(a), c = void 0, r = i || "", E.readyState = t > 0 ? 4 : 0, s = t >= 200 && 300 > t || 304 === t, n && (y = F(d, E, n)), y = z(d, y, E, s), s ? (d.ifModified && (S = E.getResponseHeader("Last-Modified"), S && (se.lastModified[o] = S), S = E.getResponseHeader("etag"), S && (se.etag[o] = S)), 204 === t || "HEAD" === d.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = y.state, u = y.data, v = y.error, s = !v)) : (v = T, (t || !T) && (T = "error", 0 > t && (t = 0))), E.status = t, E.statusText = (e || T) + "", s ? f.resolveWith(h, [u, T, E]) : f.rejectWith(h, [E, T, v]), E.statusCode(g), g = void 0, l && p.trigger(s ? "ajaxSuccess" : "ajaxError", [E, d, s ? u : v]), m.fireWith(h, [E, T]), l && (p.trigger("ajaxComplete", [E, d]), --se.active || se.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var i, s, o, r, a, l, c, u, d = se.ajaxSetup({}, e), h = d.context || d, p = d.context && (h.nodeType || h.jquery) ? se(h) : se.event, f = se.Deferred(), m = se.Callbacks("once memory"), g = d.statusCode || {}, v = {}, y = {}, b = 0, S = "canceled", E = {readyState: 0,getResponseHeader: function(t) {
                    var e;
                    if (2 === b) {
                        if (!u)
                            for (u = {}; e = jn.exec(r); )
                                u[e[1].toLowerCase()] = e[2];
                        e = u[t.toLowerCase()]
                    }
                    return null == e ? null : e
                },getAllResponseHeaders: function() {
                    return 2 === b ? r : null
                },setRequestHeader: function(t, e) {
                    var n = t.toLowerCase();
                    return b || (t = y[n] = y[n] || t, v[t] = e), this
                },overrideMimeType: function(t) {
                    return b || (d.mimeType = t), this
                },statusCode: function(t) {
                    var e;
                    if (t)
                        if (2 > b)
                            for (e in t)
                                g[e] = [g[e], t[e]];
                        else
                            E.always(t[E.status]);
                    return this
                },abort: function(t) {
                    var e = t || S;
                    return c && c.abort(e), n(0, e), this
                }};
            if (f.promise(E).complete = m.add, E.success = E.done, E.error = E.fail, d.url = ((t || d.url || On) + "").replace(Pn, "").replace(Bn, Nn[1] + "//"), d.type = e.method || e.type || d.method || d.type, d.dataTypes = se.trim(d.dataType || "*").toLowerCase().match(be) || [""], null == d.crossDomain && (i = Fn.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Nn[1] && i[2] === Nn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Nn[3] || ("http:" === Nn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = se.param(d.data, d.traditional)), H(zn, d, e, E), 2 === b)
                return E;
            l = d.global, l && 0 === se.active++ && se.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Hn.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Mn.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = $n.test(o) ? o.replace($n, "$1_=" + Dn++) : o + (Mn.test(o) ? "&" : "?") + "_=" + Dn++)), d.ifModified && (se.lastModified[o] && E.setRequestHeader("If-Modified-Since", se.lastModified[o]), se.etag[o] && E.setRequestHeader("If-None-Match", se.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || e.contentType) && E.setRequestHeader("Content-Type", d.contentType), E.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Wn + "; q=0.01" : "") : d.accepts["*"]);
            for (s in d.headers)
                E.setRequestHeader(s, d.headers[s]);
            if (d.beforeSend && (d.beforeSend.call(h, E, d) === !1 || 2 === b))
                return E.abort();
            S = "abort";
            for (s in {success: 1,error: 1,complete: 1})
                E[s](d[s]);
            if (c = H(Vn, d, e, E)) {
                E.readyState = 1, l && p.trigger("ajaxSend", [E, d]), d.async && d.timeout > 0 && (a = setTimeout(function() {
                    E.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, c.send(v, n)
                } catch (T) {
                    if (!(2 > b))
                        throw T;
                    n(-1, T)
                }
            } else
                n(-1, "No Transport");
            return E
        },getJSON: function(t, e, n) {
            return se.get(t, e, n, "json")
        },getScript: function(t, e) {
            return se.get(t, void 0, e, "script")
        }}), se.each(["get", "post"], function(t, e) {
        se[e] = function(t, n, i, s) {
            return se.isFunction(n) && (s = s || i, i = n, n = void 0), se.ajax({url: t,type: e,dataType: s,data: n,success: i})
        }
    }), se.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        se.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), se._evalUrl = function(t) {
        return se.ajax({url: t,type: "GET",dataType: "script",async: !1,global: !1,"throws": !0})
    }, se.fn.extend({wrapAll: function(t) {
            if (se.isFunction(t))
                return this.each(function(e) {
                    se(this).wrapAll(t.call(this, e))
                });
            if (this[0]) {
                var e = se(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType; )
                        t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },wrapInner: function(t) {
            return this.each(se.isFunction(t) ? function(e) {
                se(this).wrapInner(t.call(this, e))
            } : function() {
                var e = se(this), n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },wrap: function(t) {
            var e = se.isFunction(t);
            return this.each(function(n) {
                se(this).wrapAll(e ? t.call(this, n) : t)
            })
        },unwrap: function() {
            return this.parent().each(function() {
                se.nodeName(this, "body") || se(this).replaceWith(this.childNodes)
            }).end()
        }}), se.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (t.style && t.style.display || se.css(t, "display"))
    }, se.expr.filters.visible = function(t) {
        return !se.expr.filters.hidden(t)
    };
    var Xn = /%20/g, qn = /\[\]$/, Gn = /\r?\n/g, Jn = /^(?:submit|button|image|reset|file)$/i, Kn = /^(?:input|select|textarea|keygen)/i;
    se.param = function(t, e) {
        var n, i = [], s = function(t, e) {
            e = se.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
        };
        if (void 0 === e && (e = se.ajaxSettings && se.ajaxSettings.traditional), se.isArray(t) || t.jquery && !se.isPlainObject(t))
            se.each(t, function() {
                s(this.name, this.value)
            });
        else
            for (n in t)
                V(n, t[n], e, s);
        return i.join("&").replace(Xn, "+")
    }, se.fn.extend({serialize: function() {
            return se.param(this.serializeArray())
        },serializeArray: function() {
            return this.map(function() {
                var t = se.prop(this, "elements");
                return t ? se.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !se(this).is(":disabled") && Kn.test(this.nodeName) && !Jn.test(t) && (this.checked || !Ie.test(t))
            }).map(function(t, e) {
                var n = se(this).val();
                return null == n ? null : se.isArray(n) ? se.map(n, function(t) {
                    return {name: e.name,value: t.replace(Gn, "\r\n")}
                }) : {name: e.name,value: n.replace(Gn, "\r\n")}
            }).get()
        }}), se.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && W() || Y()
    } : W;
    var Zn = 0, Qn = {}, ti = se.ajaxSettings.xhr();
    t.ActiveXObject && se(t).on("unload", function() {
        for (var t in Qn)
            Qn[t](void 0, !0)
    }), ne.cors = !!ti && "withCredentials" in ti, ti = ne.ajax = !!ti, ti && se.ajaxTransport(function(t) {
        if (!t.crossDomain || ne.cors) {
            var e;
            return {send: function(n, i) {
                    var s, o = t.xhr(), r = ++Zn;
                    if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (s in t.xhrFields)
                            o[s] = t.xhrFields[s];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (s in n)
                        void 0 !== n[s] && o.setRequestHeader(s, n[s] + "");
                    o.send(t.hasContent && t.data || null), e = function(n, s) {
                        var a, l, c;
                        if (e && (s || 4 === o.readyState))
                            if (delete Qn[r], e = void 0, o.onreadystatechange = se.noop, s)
                                4 !== o.readyState && o.abort();
                            else {
                                c = {}, a = o.status, "string" == typeof o.responseText && (c.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (u) {
                                    l = ""
                                }
                                a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                            }
                        c && i(a, l, c, o.getAllResponseHeaders())
                    }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Qn[r] = e : e()
                },abort: function() {
                    e && e(void 0, !0)
                }}
        }
    }), se.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents: {script: /(?:java|ecma)script/},converters: {"text script": function(t) {
                return se.globalEval(t), t
            }}}), se.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), se.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, n = fe.head || se("head")[0] || fe.documentElement;
            return {send: function(i, s) {
                    e = fe.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, n) {
                        (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || s(200, "success"))
                    }, n.insertBefore(e, n.firstChild)
                },abort: function() {
                    e && e.onload(void 0, !0)
                }}
        }
    });
    var ei = [], ni = /(=)\?(?=&|$)|\?\?/;
    se.ajaxSetup({jsonp: "callback",jsonpCallback: function() {
            var t = ei.pop() || se.expando + "_" + Dn++;
            return this[t] = !0, t
        }}), se.ajaxPrefilter("json jsonp", function(e, n, i) {
        var s, o, r, a = e.jsonp !== !1 && (ni.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (s = e.jsonpCallback = se.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(ni, "$1" + s) : e.jsonp !== !1 && (e.url += (Mn.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), e.converters["script json"] = function() {
            return r || se.error(s + " was not called"), r[0]
        }, e.dataTypes[0] = "json", o = t[s], t[s] = function() {
            r = arguments
        }, i.always(function() {
            t[s] = o, e[s] && (e.jsonpCallback = n.jsonpCallback, ei.push(s)), r && se.isFunction(o) && o(r[0]), r = o = void 0
        }), "script") : void 0
    }), se.parseHTML = function(t, e, n) {
        if (!t || "string" != typeof t)
            return null;
        "boolean" == typeof e && (n = e, e = !1), e = e || fe;
        var i = de.exec(t), s = !n && [];
        return i ? [e.createElement(i[1])] : (i = se.buildFragment([t], e, s), s && s.length && se(s).remove(), se.merge([], i.childNodes))
    };
    var ii = se.fn.load;
    se.fn.load = function(t, e, n) {
        if ("string" != typeof t && ii)
            return ii.apply(this, arguments);
        var i, s, o, r = this, a = t.indexOf(" ");
        return a >= 0 && (i = se.trim(t.slice(a, t.length)), t = t.slice(0, a)), se.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), r.length > 0 && se.ajax({url: t,type: o,dataType: "html",data: e}).done(function(t) {
            s = arguments, r.html(i ? se("<div>").append(se.parseHTML(t)).find(i) : t)
        }).complete(n && function(t, e) {
            r.each(n, s || [t.responseText, e, t])
        }), this
    }, se.expr.filters.animated = function(t) {
        return se.grep(se.timers, function(e) {
            return t === e.elem
        }).length
    };
    var si = t.document.documentElement;
    se.offset = {setOffset: function(t, e, n) {
            var i, s, o, r, a, l, c, u = se.css(t, "position"), d = se(t), h = {};
            "static" === u && (t.style.position = "relative"), a = d.offset(), o = se.css(t, "top"), l = se.css(t, "left"), c = ("absolute" === u || "fixed" === u) && se.inArray("auto", [o, l]) > -1, c ? (i = d.position(), r = i.top, s = i.left) : (r = parseFloat(o) || 0, s = parseFloat(l) || 0), se.isFunction(e) && (e = e.call(t, n, a)), null != e.top && (h.top = e.top - a.top + r), null != e.left && (h.left = e.left - a.left + s), "using" in e ? e.using.call(t, h) : d.css(h)
        }}, se.fn.extend({offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    se.offset.setOffset(this, t, e)
                });
            var e, n, i = {top: 0,left: 0}, s = this[0], o = s && s.ownerDocument;
            if (o)
                return e = o.documentElement, se.contains(e, s) ? (typeof s.getBoundingClientRect !== we && (i = s.getBoundingClientRect()), n = X(o), {top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)}) : i
        },position: function() {
            if (this[0]) {
                var t, e, n = {top: 0,left: 0}, i = this[0];
                return "fixed" === se.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), se.nodeName(t[0], "html") || (n = t.offset()), n.top += se.css(t[0], "borderTopWidth", !0), n.left += se.css(t[0], "borderLeftWidth", !0)), {top: e.top - n.top - se.css(i, "marginTop", !0),left: e.left - n.left - se.css(i, "marginLeft", !0)}
            }
        },offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || si; t && !se.nodeName(t, "html") && "static" === se.css(t, "position"); )
                    t = t.offsetParent;
                return t || si
            })
        }}), se.each({scrollLeft: "pageXOffset",scrollTop: "pageYOffset"}, function(t, e) {
        var n = /Y/.test(e);
        se.fn[t] = function(i) {
            return Ae(this, function(t, i, s) {
                var o = X(t);
                return void 0 === s ? o ? e in o ? o[e] : o.document.documentElement[i] : t[i] : void (o ? o.scrollTo(n ? se(o).scrollLeft() : s, n ? s : se(o).scrollTop()) : t[i] = s)
            }, t, i, arguments.length, null)
        }
    }), se.each(["top", "left"], function(t, e) {
        se.cssHooks[e] = L(ne.pixelPosition, function(t, n) {
            return n ? (n = en(t, e), sn.test(n) ? se(t).position()[e] + "px" : n) : void 0
        })
    }), se.each({Height: "height",Width: "width"}, function(t, e) {
        se.each({padding: "inner" + t,content: e,"": "outer" + t}, function(n, i) {
            se.fn[i] = function(i, s) {
                var o = arguments.length && (n || "boolean" != typeof i), r = n || (i === !0 || s === !0 ? "margin" : "border");
                return Ae(this, function(e, n, i) {
                    var s;
                    return se.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === i ? se.css(e, n, r) : se.style(e, n, i, r)
                }, e, o ? i : void 0, o, null)
            }
        })
    }), se.fn.size = function() {
        return this.length
    }, se.fn.andSelf = se.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return se
    });
    var oi = t.jQuery, ri = t.$;
    return se.noConflict = function(e) {
        return t.$ === se && (t.$ = ri), e && t.jQuery === se && (t.jQuery = oi), se
    }, typeof e === we && (t.jQuery = t.$ = se), se
}), function(t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, i = t(document);
    t.rails = n = {linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector: "form",formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector: "input[type=file]",linkDisableSelector: "a[data-disable-with], a[data-disable]",buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",CSRFProtection: function(e) {
            var n = t('meta[name="csrf-token"]').attr("content");
            n && e.setRequestHeader("X-CSRF-Token", n)
        },refreshCSRFTokens: function() {
            var e = t("meta[name=csrf-token]").attr("content"), n = t("meta[name=csrf-param]").attr("content");
            t('form input[name="' + n + '"]').val(e)
        },fire: function(e, n, i) {
            var s = t.Event(n);
            return e.trigger(s, i), s.result !== !1
        },confirm: function(t) {
            return confirm(t)
        },ajax: function(e) {
            return t.ajax(e)
        },href: function(t) {
            return t.attr("href")
        },handleRemote: function(i) {
            var s, o, r, a, l, c, u, d;
            if (n.fire(i, "ajax:before")) {
                if (a = i.data("cross-domain"), l = a === e ? null : a, c = i.data("with-credentials") || null, u = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, i.is("form")) {
                    s = i.attr("method"), o = i.attr("action"), r = i.serializeArray();
                    var h = i.data("ujs:submit-button");
                    h && (r.push(h), i.data("ujs:submit-button", null))
                } else
                    i.is(n.inputChangeSelector) ? (s = i.data("method"), o = i.data("url"), r = i.serialize(), i.data("params") && (r = r + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (s = i.data("method") || "get", o = i.data("url"), r = i.serialize(), i.data("params") && (r = r + "&" + i.data("params"))) : (s = i.data("method"), o = n.href(i), r = i.data("params") || null);
                return d = {type: s || "GET",data: r,dataType: u,beforeSend: function(t, s) {
                        return s.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + s.accepts.script), n.fire(i, "ajax:beforeSend", [t, s]) ? void i.trigger("ajax:send", t) : !1
                    },success: function(t, e, n) {
                        i.trigger("ajax:success", [t, e, n])
                    },complete: function(t, e) {
                        i.trigger("ajax:complete", [t, e])
                    },error: function(t, e, n) {
                        i.trigger("ajax:error", [t, e, n])
                    },crossDomain: l}, c && (d.xhrFields = {withCredentials: c}), o && (d.url = o), n.ajax(d)
            }
            return !1
        },handleMethod: function(i) {
            var s = n.href(i), o = i.data("method"), r = i.attr("target"), a = t("meta[name=csrf-token]").attr("content"), l = t("meta[name=csrf-param]").attr("content"), c = t('<form method="post" action="' + s + '"></form>'), u = '<input name="_method" value="' + o + '" type="hidden" />';
            l !== e && a !== e && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), r && c.attr("target", r), c.hide().append(u).appendTo("body"), c.submit()
        },formElements: function(e, n) {
            return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
        },disableFormElements: function(e) {
            n.formElements(e, n.disableSelector).each(function() {
                n.disableFormElement(t(this))
            })
        },disableFormElement: function(t) {
            var n, i;
            n = t.is("button") ? "html" : "val", i = t.data("disable-with"), t.data("ujs:enable-with", t[n]()), i !== e && t[n](i), t.prop("disabled", !0)
        },enableFormElements: function(e) {
            n.formElements(e, n.enableSelector).each(function() {
                n.enableFormElement(t(this))
            })
        },enableFormElement: function(t) {
            var e = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
        },allowAction: function(t) {
            var e, i = t.data("confirm"), s = !1;
            return i ? (n.fire(t, "confirm") && (s = n.confirm(i), e = n.fire(t, "confirm:complete", [s])), s && e) : !0
        },blankInputs: function(e, n, i) {
            var s, o, r = t(), a = n || "input,textarea", l = e.find(a);
            return l.each(function() {
                if (s = t(this), o = s.is("input[type=checkbox],input[type=radio]") ? s.is(":checked") : s.val(), !o == !i) {
                    if (s.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + s.attr("name") + '"]').length)
                        return !0;
                    r = r.add(s)
                }
            }), r.length ? r : !1
        },nonBlankInputs: function(t, e) {
            return n.blankInputs(t, e, !0)
        },stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },disableElement: function(t) {
            var i = t.data("disable-with");
            t.data("ujs:enable-with", t.html()), i !== e && t.html(i), t.bind("click.railsDisable", function(t) {
                return n.stopEverything(t)
            })
        },enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }}, n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
        t.crossDomain || n.CSRFProtection(i)
    }), i.delegate(n.linkDisableSelector, "ajax:complete", function() {
        n.enableElement(t(this))
    }), i.delegate(n.buttonDisableSelector, "ajax:complete", function() {
        n.enableFormElement(t(this))
    }), i.delegate(n.linkClickSelector, "click.rails", function(i) {
        var s = t(this), o = s.data("method"), r = s.data("params"), a = i.metaKey || i.ctrlKey;
        if (!n.allowAction(s))
            return n.stopEverything(i);
        if (!a && s.is(n.linkDisableSelector) && n.disableElement(s), s.data("remote") !== e) {
            if (a && (!o || "GET" === o) && !r)
                return !0;
            var l = n.handleRemote(s);
            return l === !1 ? n.enableElement(s) : l.error(function() {
                n.enableElement(s)
            }), !1
        }
        return s.data("method") ? (n.handleMethod(s), !1) : void 0
    }), i.delegate(n.buttonClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i))
            return n.stopEverything(e);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var s = n.handleRemote(i);
        return s === !1 ? n.enableFormElement(i) : s.error(function() {
            n.enableFormElement(i)
        }), !1
    }), i.delegate(n.inputChangeSelector, "change.rails", function(e) {
        var i = t(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(e)
    }), i.delegate(n.formSubmitSelector, "submit.rails", function(i) {
        var s, o, r = t(this), a = r.data("remote") !== e;
        if (!n.allowAction(r))
            return n.stopEverything(i);
        if (r.attr("novalidate") == e && (s = n.blankInputs(r, n.requiredInputSelector), s && n.fire(r, "ajax:aborted:required", [s])))
            return n.stopEverything(i);
        if (a) {
            if (o = n.nonBlankInputs(r, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(r)
                }, 13);
                var l = n.fire(r, "ajax:aborted:file", [o]);
                return l || setTimeout(function() {
                    n.enableFormElements(r)
                }, 13), l
            }
            return n.handleRemote(r), !1
        }
        setTimeout(function() {
            n.disableFormElements(r)
        }, 13)
    }), i.delegate(n.formInputClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i))
            return n.stopEverything(e);
        var s = i.attr("name"), o = s ? {name: s,value: i.val()} : null;
        i.closest("form").data("ujs:submit-button", o)
    }), i.delegate(n.formSubmitSelector, "ajax:send.rails", function(e) {
        this == e.target && n.disableFormElements(t(this))
    }), i.delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
        this == e.target && n.enableFormElements(t(this))
    }), t(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery), function(t) {
    t.extend({debounce: function(t, e, n, i) {
            3 == arguments.length && "boolean" != typeof n && (i = n, n = !1);
            var s;
            return function() {
                var o = arguments;
                i = i || this, n && !s && t.apply(i, o), clearTimeout(s), s = setTimeout(function() {
                    n || t.apply(i, o), s = null
                }, e)
            }
        },throttle: function(t, e, n) {
            var i, s, o;
            return function() {
                s = arguments, o = !0, n = n || this, i || function() {
                    o ? (t.apply(n, s), o = !1, i = setTimeout(arguments.callee, e)) : i = null
                }()
            }
        }})
}(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {def: "easeOutQuad",swing: function(t, e, n, i, s) {
        return jQuery.easing[jQuery.easing.def](t, e, n, i, s)
    },easeInQuad: function(t, e, n, i, s) {
        return i * (e /= s) * e + n
    },easeOutQuad: function(t, e, n, i, s) {
        return -i * (e /= s) * (e - 2) + n
    },easeInOutQuad: function(t, e, n, i, s) {
        return (e /= s / 2) < 1 ? i / 2 * e * e + n : -i / 2 * (--e * (e - 2) - 1) + n
    },easeInCubic: function(t, e, n, i, s) {
        return i * (e /= s) * e * e + n
    },easeOutCubic: function(t, e, n, i, s) {
        return i * ((e = e / s - 1) * e * e + 1) + n
    },easeInOutCubic: function(t, e, n, i, s) {
        return (e /= s / 2) < 1 ? i / 2 * e * e * e + n : i / 2 * ((e -= 2) * e * e + 2) + n
    },easeInQuart: function(t, e, n, i, s) {
        return i * (e /= s) * e * e * e + n
    },easeOutQuart: function(t, e, n, i, s) {
        return -i * ((e = e / s - 1) * e * e * e - 1) + n
    },easeInOutQuart: function(t, e, n, i, s) {
        return (e /= s / 2) < 1 ? i / 2 * e * e * e * e + n : -i / 2 * ((e -= 2) * e * e * e - 2) + n
    },easeInQuint: function(t, e, n, i, s) {
        return i * (e /= s) * e * e * e * e + n
    },easeOutQuint: function(t, e, n, i, s) {
        return i * ((e = e / s - 1) * e * e * e * e + 1) + n
    },easeInOutQuint: function(t, e, n, i, s) {
        return (e /= s / 2) < 1 ? i / 2 * e * e * e * e * e + n : i / 2 * ((e -= 2) * e * e * e * e + 2) + n
    },easeInSine: function(t, e, n, i, s) {
        return -i * Math.cos(e / s * (Math.PI / 2)) + i + n
    },easeOutSine: function(t, e, n, i, s) {
        return i * Math.sin(e / s * (Math.PI / 2)) + n
    },easeInOutSine: function(t, e, n, i, s) {
        return -i / 2 * (Math.cos(Math.PI * e / s) - 1) + n
    },easeInExpo: function(t, e, n, i, s) {
        return 0 == e ? n : i * Math.pow(2, 10 * (e / s - 1)) + n
    },easeOutExpo: function(t, e, n, i, s) {
        return e == s ? n + i : i * (-Math.pow(2, -10 * e / s) + 1) + n
    },easeInOutExpo: function(t, e, n, i, s) {
        return 0 == e ? n : e == s ? n + i : (e /= s / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n : i / 2 * (-Math.pow(2, -10 * --e) + 2) + n
    },easeInCirc: function(t, e, n, i, s) {
        return -i * (Math.sqrt(1 - (e /= s) * e) - 1) + n
    },easeOutCirc: function(t, e, n, i, s) {
        return i * Math.sqrt(1 - (e = e / s - 1) * e) + n
    },easeInOutCirc: function(t, e, n, i, s) {
        return (e /= s / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + n : i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + n
    },easeInElastic: function(t, e, n, i, s) {
        var o = 1.70158, r = 0, a = i;
        if (0 == e)
            return n;
        if (1 == (e /= s))
            return n + i;
        if (r || (r = .3 * s), a < Math.abs(i)) {
            a = i;
            var o = r / 4
        } else
            var o = r / (2 * Math.PI) * Math.asin(i / a);
        return -(a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * s - o) * Math.PI / r)) + n
    },easeOutElastic: function(t, e, n, i, s) {
        var o = 1.70158, r = 0, a = i;
        if (0 == e)
            return n;
        if (1 == (e /= s))
            return n + i;
        if (r || (r = .3 * s), a < Math.abs(i)) {
            a = i;
            var o = r / 4
        } else
            var o = r / (2 * Math.PI) * Math.asin(i / a);
        return a * Math.pow(2, -10 * e) * Math.sin(2 * (e * s - o) * Math.PI / r) + i + n
    },easeInOutElastic: function(t, e, n, i, s) {
        var o = 1.70158, r = 0, a = i;
        if (0 == e)
            return n;
        if (2 == (e /= s / 2))
            return n + i;
        if (r || (r = .3 * s * 1.5), a < Math.abs(i)) {
            a = i;
            var o = r / 4
        } else
            var o = r / (2 * Math.PI) * Math.asin(i / a);
        return 1 > e ? -.5 * a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * s - o) * Math.PI / r) + n : a * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * s - o) * Math.PI / r) * .5 + i + n
    },easeInBack: function(t, e, n, i, s, o) {
        return void 0 == o && (o = 1.70158), i * (e /= s) * e * ((o + 1) * e - o) + n
    },easeOutBack: function(t, e, n, i, s, o) {
        return void 0 == o && (o = 1.70158), i * ((e = e / s - 1) * e * ((o + 1) * e + o) + 1) + n
    },easeInOutBack: function(t, e, n, i, s, o) {
        return void 0 == o && (o = 1.70158), (e /= s / 2) < 1 ? i / 2 * e * e * (((o *= 1.525) + 1) * e - o) + n : i / 2 * ((e -= 2) * e * (((o *= 1.525) + 1) * e + o) + 2) + n
    },easeInBounce: function(t, e, n, i, s) {
        return i - jQuery.easing.easeOutBounce(t, s - e, 0, i, s) + n
    },easeOutBounce: function(t, e, n, i, s) {
        return (e /= s) < 1 / 2.75 ? 7.5625 * i * e * e + n : 2 / 2.75 > e ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n : 2.5 / 2.75 > e ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n
    },easeInOutBounce: function(t, e, n, i, s) {
        return s / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, i, s) + n : .5 * jQuery.easing.easeOutBounce(t, 2 * e - s, 0, i, s) + .5 * i + n
    }}), function() {
    var t, e, n, i, s, o, r, a, l, c, u, d, h, p, f, m, g, v, y, b = [].slice, S = [].indexOf || function(t) {
        for (var e = 0, n = this.length; n > e; e++)
            if (e in this && this[e] === t)
                return e;
        return -1
    };
    t = jQuery, t.payment = {}, t.payment.fn = {}, t.fn.payment = function() {
        var e, n;
        return n = arguments[0], e = 2 <= arguments.length ? b.call(arguments, 1) : [], t.payment.fn[n].apply(this, e)
    }, s = /(\d{1,4})/g, i = [{type: "maestro",pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,format: s,length: [12, 13, 14, 15, 16, 17, 18, 19],cvcLength: [3],luhn: !0}, {type: "dinersclub",pattern: /^(36|38|30[0-5])/,format: s,length: [14],cvcLength: [3],luhn: !0}, {type: "laser",pattern: /^(6706|6771|6709)/,format: s,length: [16, 17, 18, 19],cvcLength: [3],luhn: !0}, {type: "jcb",pattern: /^35/,format: s,length: [16],cvcLength: [3],luhn: !0}, {type: "unionpay",pattern: /^62/,format: s,length: [16, 17, 18, 19],cvcLength: [3],luhn: !1}, {type: "discover",pattern: /^(6011|65|64[4-9]|622)/,format: s,length: [16],cvcLength: [3],luhn: !0}, {type: "mastercard",pattern: /^5[1-5]/,format: s,length: [16],cvcLength: [3],luhn: !0}, {type: "amex",pattern: /^3[47]/,format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,length: [15],cvcLength: [3, 4],luhn: !0}, {type: "visa",pattern: /^4/,format: s,length: [13, 14, 15, 16],cvcLength: [3],luhn: !0}], e = function(t) {
        var e, n, s;
        for (t = (t + "").replace(/\D/g, ""), n = 0, s = i.length; s > n; n++)
            if (e = i[n], e.pattern.test(t))
                return e
    }, n = function(t) {
        var e, n, s;
        for (n = 0, s = i.length; s > n; n++)
            if (e = i[n], e.type === t)
                return e
    }, h = function(t) {
        var e, n, i, s, o, r;
        for (i = !0, s = 0, n = (t + "").split("").reverse(), o = 0, r = n.length; r > o; o++)
            e = n[o], e = parseInt(e, 10), (i = !i) && (e *= 2), e > 9 && (e -= 9), s += e;
        return s % 10 === 0
    }, d = function(t) {
        var e;
        return null != t.prop("selectionStart") && t.prop("selectionStart") !== t.prop("selectionEnd") ? !0 : ("undefined" != typeof document && null !== document && null != (e = document.selection) && "function" == typeof e.createRange ? e.createRange().text : void 0) ? !0 : !1
    }, p = function(e) {
        return setTimeout(function() {
            var n, i;
            return n = t(e.currentTarget), i = n.val(), i = t.payment.formatCardNumber(i), n.val(i)
        })
    }, a = function(n) {
        var i, s, o, r, a, l, c;
        return o = String.fromCharCode(n.which), !/^\d+$/.test(o) || (i = t(n.currentTarget), c = i.val(), s = e(c + o), r = (c.replace(/\D/g, "") + o).length, l = 16, s && (l = s.length[s.length.length - 1]), r >= l || null != i.prop("selectionStart") && i.prop("selectionStart") !== c.length) ? void 0 : (a = s && "amex" === s.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, a.test(c) ? (n.preventDefault(), i.val(c + " " + o)) : a.test(c + o) ? (n.preventDefault(), i.val(c + o + " ")) : void 0)
    }, o = function(e) {
        var n, i;
        return n = t(e.currentTarget), i = n.val(), e.meta || null != n.prop("selectionStart") && n.prop("selectionStart") !== i.length ? void 0 : 8 === e.which && /\s\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\d?$/, ""))) : void 0
    }, l = function(e) {
        var n, i, s;
        return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), s = n.val() + i, /^\d$/.test(s) && "0" !== s && "1" !== s ? (e.preventDefault(), n.val("0" + s + " / ")) : /^\d\d$/.test(s) ? (e.preventDefault(), n.val("" + s + " / ")) : void 0) : void 0
    }, c = function(e) {
        var n, i, s;
        return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), s = n.val(), /^\d\d$/.test(s) ? n.val("" + s + " / ") : void 0) : void 0
    }, u = function(e) {
        var n, i, s;
        return i = String.fromCharCode(e.which), "/" === i ? (n = t(e.currentTarget), s = n.val(), /^\d$/.test(s) && "0" !== s ? n.val("0" + s + " / ") : void 0) : void 0
    }, r = function(e) {
        var n, i;
        if (!e.meta && (n = t(e.currentTarget), i = n.val(), 8 === e.which && (null == n.prop("selectionStart") || n.prop("selectionStart") === i.length)))
            return /\s\/\s?\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\/\s?\d?$/, ""))) : void 0
    }, v = function(t) {
        var e;
        return t.metaKey || t.ctrlKey ? !0 : 32 === t.which ? !1 : 0 === t.which ? !0 : t.which < 33 ? !0 : (e = String.fromCharCode(t.which), !!/[\d\s]/.test(e))
    }, m = function(n) {
        var i, s, o, r;
        return i = t(n.currentTarget), o = String.fromCharCode(n.which), /^\d+$/.test(o) && !d(i) ? (r = (i.val() + o).replace(/\D/g, ""), s = e(r), s ? r.length <= s.length[s.length.length - 1] : r.length <= 16) : void 0
    }, g = function(e) {
        var n, i, s;
        return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) && !d(n) ? (s = n.val() + i, s = s.replace(/\D/g, ""), s.length > 6 ? !1 : void 0) : void 0
    }, f = function(e) {
        var n, i, s;
        return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (s = n.val() + i, s.length <= 4) : void 0
    }, y = function(e) {
        var n, s, o, r, a;
        return n = t(e.currentTarget), a = n.val(), r = t.payment.cardType(a) || "unknown", n.hasClass(r) ? void 0 : (s = function() {
            var t, e, n;
            for (n = [], t = 0, e = i.length; e > t; t++)
                o = i[t], n.push(o.type);
            return n
        }(), n.removeClass("unknown"), n.removeClass(s.join(" ")), n.addClass(r), n.toggleClass("identified", "unknown" !== r), n.trigger("payment.cardType", r))
    }, t.payment.fn.formatCardCVC = function() {
        return this.payment("restrictNumeric"), this.on("keypress", f), this
    }, t.payment.fn.formatCardExpiry = function() {
        return this.payment("restrictNumeric"), this.on("keypress", g), this.on("keypress", l), this.on("keypress", u), this.on("keypress", c), this.on("keydown", r), this
    }, t.payment.fn.formatCardNumber = function() {
        return this.payment("restrictNumeric"), this.on("keypress", m), this.on("keypress", a), this.on("keydown", o), this.on("keyup", y), this.on("paste", p), this
    }, t.payment.fn.restrictNumeric = function() {
        return this.on("keypress", v), this
    }, t.payment.fn.cardExpiryVal = function() {
        return t.payment.cardExpiryVal(t(this).val())
    }, t.payment.cardExpiryVal = function(t) {
        var e, n, i, s;
        return t = t.replace(/\s/g, ""), s = t.split("/", 2), e = s[0], i = s[1], 2 === (null != i ? i.length : void 0) && /^\d+$/.test(i) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), i = n + i), e = parseInt(e, 10), i = parseInt(i, 10), {month: e,year: i}
    }, t.payment.validateCardNumber = function(t) {
        var n, i;
        return t = (t + "").replace(/\s+|-/g, ""), /^\d+$/.test(t) ? (n = e(t), n ? (i = t.length, S.call(n.length, i) >= 0 && (n.luhn === !1 || h(t))) : !1) : !1
    }, t.payment.validateCardExpiry = function(e, n) {
        var i, s, o, r;
        return "object" == typeof e && "month" in e && (r = e, e = r.month, n = r.year), e && n ? (e = t.trim(e), n = t.trim(n), /^\d+$/.test(e) && /^\d+$/.test(n) && parseInt(e, 10) <= 12 ? (2 === n.length && (o = (new Date).getFullYear(), o = o.toString().slice(0, 2), n = o + n), s = new Date(n, e), i = new Date, s.setMonth(s.getMonth() - 1), s.setMonth(s.getMonth() + 1, 1), s > i) : !1) : !1
    }, t.payment.validateCardCVC = function(e, i) {
        var s, o;
        return e = t.trim(e), /^\d+$/.test(e) ? i ? (s = e.length, S.call(null != (o = n(i)) ? o.cvcLength : void 0, s) >= 0) : e.length >= 3 && e.length <= 4 : !1
    }, t.payment.cardType = function(t) {
        var n;
        return t ? (null != (n = e(t)) ? n.type : void 0) || null : null
    }, t.payment.formatCardNumber = function(t) {
        var n, i, s, o;
        return (n = e(t)) ? (s = n.length[n.length.length - 1], t = t.replace(/\D/g, ""), t = t.slice(0, +s + 1 || 9e9), n.format.global ? null != (o = t.match(n.format)) ? o.join(" ") : void 0 : (i = n.format.exec(t), null != i && i.shift(), null != i ? i.join(" ") : void 0)) : t
    }
}.call(this), function(t) {
    t.fn.changeElementType = function(e) {
        var n = {};
        t.each(this[0].attributes, function(t, e) {
            n[e.nodeName] = e.nodeValue
        }), this.replaceWith(function() {
            return t("<" + e + "/>", n).append(t(this).contents())
        })
    }
}(jQuery), function(t, e, n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(i) {
        return n(i, t, e), i.mobile
    }) : n(t.jQuery, t, e)
}(this, document, function(t, e, n) {
    !function(t, e, n, i) {
        function s(t) {
            for (; t && "undefined" != typeof t.originalEvent; )
                t = t.originalEvent;
            return t
        }
        function o(e, n) {
            var o, r, a, l, c, u, d, h, p, f = e.type;
            if (e = t.Event(e), e.type = n, o = e.originalEvent, r = t.event.props, f.search(/^(mouse|click)/) > -1 && (r = I), o)
                for (d = r.length, l; d; )
                    l = r[--d], e[l] = o[l];
            if (f.search(/mouse(down|up)|click/) > -1 && !e.which && (e.which = 1), -1 !== f.search(/^touch/) && (a = s(o), f = a.touches, c = a.changedTouches, u = f && f.length ? f[0] : c && c.length ? c[0] : i))
                for (h = 0, p = x.length; p > h; h++)
                    l = x[h], e[l] = u[l];
            return e
        }
        function r(e) {
            for (var n, i, s = {}; e; ) {
                n = t.data(e, k);
                for (i in n)
                    n[i] && (s[i] = s.hasVirtualBinding = !0);
                e = e.parentNode
            }
            return s
        }
        function a(e, n) {
            for (var i; e; ) {
                if (i = t.data(e, k), i && (!n || i[n]))
                    return e;
                e = e.parentNode
            }
            return null
        }
        function l() {
            j = !1
        }
        function c() {
            j = !0
        }
        function u() {
            F = 0, P.length = 0, $ = !1, c()
        }
        function d() {
            l()
        }
        function h() {
            p(), M = setTimeout(function() {
                M = 0, u()
            }, t.vmouse.resetTimerDuration)
        }
        function p() {
            M && (clearTimeout(M), M = 0)
        }
        function f(e, n, i) {
            var s;
            return (i && i[e] || !i && a(n.target, e)) && (s = o(n, e), t(n.target).trigger(s)), s
        }
        function m(e) {
            var n, i = t.data(e.target, L);
            $ || F && F === i || (n = f("v" + e.type, e), n && (n.isDefaultPrevented() && e.preventDefault(), n.isPropagationStopped() && e.stopPropagation(), n.isImmediatePropagationStopped() && e.stopImmediatePropagation()))
        }
        function g(e) {
            var n, i, o, a = s(e).touches;
            a && 1 === a.length && (n = e.target, i = r(n), i.hasVirtualBinding && (F = B++, t.data(n, L, F), p(), d(), O = !1, o = s(e).touches[0], R = o.pageX, N = o.pageY, f("vmouseover", e, i), f("vmousedown", e, i)))
        }
        function v(t) {
            j || (O || f("vmousecancel", t, r(t.target)), O = !0, h())
        }
        function y(e) {
            if (!j) {
                var n = s(e).touches[0], i = O, o = t.vmouse.moveDistanceThreshold, a = r(e.target);
                O = O || Math.abs(n.pageX - R) > o || Math.abs(n.pageY - N) > o, O && !i && f("vmousecancel", e, a), f("vmousemove", e, a), h()
            }
        }
        function b(t) {
            if (!j) {
                c();
                var e, n, i = r(t.target);
                f("vmouseup", t, i), O || (e = f("vclick", t, i), e && e.isDefaultPrevented() && (n = s(t).changedTouches[0], P.push({touchID: F,x: n.clientX,y: n.clientY}), $ = !0)), f("vmouseout", t, i), O = !1, h()
            }
        }
        function S(e) {
            var n, i = t.data(e, k);
            if (i)
                for (n in i)
                    if (i[n])
                        return !0;
            return !1
        }
        function E() {
        }
        function T(e) {
            var n = e.substr(1);
            return {setup: function() {
                    S(this) || t.data(this, k, {});
                    var i = t.data(this, k);
                    i[e] = !0, D[e] = (D[e] || 0) + 1, 1 === D[e] && H.bind(n, m), t(this).bind(n, E), U && (D.touchstart = (D.touchstart || 0) + 1, 1 === D.touchstart && H.bind("touchstart", g).bind("touchend", b).bind("touchmove", y).bind("scroll", v))
                },teardown: function() {
                    --D[e], D[e] || H.unbind(n, m), U && (--D.touchstart, D.touchstart || H.unbind("touchstart", g).unbind("touchmove", y).unbind("touchend", b).unbind("scroll", v));
                    var i = t(this), s = t.data(this, k);
                    s && (s[e] = !1), i.unbind(n, E), S(this) || i.removeData(k)
                }}
        }
        var w, _, k = "virtualMouseBindings", L = "virtualTouchID", C = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), x = "clientX clientY pageX pageY screenX screenY".split(" "), A = t.event.mouseHooks ? t.event.mouseHooks.props : [], I = t.event.props.concat(A), D = {}, M = 0, R = 0, N = 0, O = !1, P = [], $ = !1, j = !1, U = "addEventListener" in n, H = t(n), B = 1, F = 0;
        for (t.vmouse = {moveDistanceThreshold: 10,clickDistanceThreshold: 10,resetTimerDuration: 1500}, _ = 0; _ < C.length; _++)
            t.event.special[C[_]] = T(C[_]);
        U && n.addEventListener("click", function(e) {
            var n, i, s, o, r, a, l = P.length, c = e.target;
            if (l)
                for (n = e.clientX, i = e.clientY, w = t.vmouse.clickDistanceThreshold, s = c; s; ) {
                    for (o = 0; l > o; o++)
                        if (r = P[o], a = 0, s === c && Math.abs(r.x - n) < w && Math.abs(r.y - i) < w || t.data(s, L) === r.touchID)
                            return e.preventDefault(), void e.stopPropagation();
                    s = s.parentNode
                }
        }, !0)
    }(t, e, n)
}), function() {
    var t = !1, e = /xyz/.test(function() {
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {
    }, Class.extend = function(n) {
        function i() {
            !t && this.init && this.init.apply(this, arguments)
        }
        var s = this.prototype;
        t = !0;
        var o = new this;
        t = !1;
        for (var r in n)
            o[r] = "function" == typeof n[r] && "function" == typeof s[r] && e.test(n[r]) ? function(t, e) {
                return function() {
                    var n = this._super;
                    this._super = s[t];
                    var i = e.apply(this, arguments);
                    return this._super = n, i
                }
            }(r, n[r]) : n[r];
        return i.prototype = o, i.constructor = i, i.extend = arguments.callee, i
    }
}(), function(t) {
    "function" == typeof define ? define(function() {
        t()
    }) : t()
}(function(t) {
    if (!Function.prototype.bind) {
        var e = Array.prototype.slice;
        Function.prototype.bind = function() {
            function t() {
                if (this instanceof t) {
                    var s = Object.create(n.prototype);
                    return n.apply(s, i.concat(e.call(arguments))), s
                }
                return n.call.apply(n, i.concat(e.call(arguments)))
            }
            var n = this;
            if ("function" != typeof n.apply || "function" != typeof n.call)
                return new TypeError;
            var i = e.call(arguments);
            return t.length = "function" == typeof n ? Math.max(n.length - i.length, 0) : 0, t
        }
    }
    var n, i, s, o, r, a = Function.prototype.call, l = Object.prototype, c = a.bind(l.hasOwnProperty);
    (r = c(l, "__defineGetter__")) && (n = a.bind(l.__defineGetter__), i = a.bind(l.__defineSetter__), s = a.bind(l.__lookupGetter__), o = a.bind(l.__lookupSetter__)), Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }), Array.prototype.forEach || (Array.prototype.forEach = function(t, e) {
        for (var n = +this.length, i = 0; n > i; i++)
            i in this && t.call(e, this[i], i, this)
    }), Array.prototype.map || (Array.prototype.map = function(t, e) {
        var n = +this.length;
        if ("function" != typeof t)
            throw new TypeError;
        for (var i = Array(n), s = 0; n > s; s++)
            s in this && (i[s] = t.call(e, this[s], s, this));
        return i
    }), Array.prototype.filter || (Array.prototype.filter = function(t, e) {
        for (var n = [], i = 0; i < this.length; i++)
            t.call(e, this[i]) && n.push(this[i]);
        return n
    }), Array.prototype.every || (Array.prototype.every = function(t, e) {
        for (var n = 0; n < this.length; n++)
            if (!t.call(e, this[n]))
                return !1;
        return !0
    }), Array.prototype.some || (Array.prototype.some = function(t, e) {
        for (var n = 0; n < this.length; n++)
            if (t.call(e, this[n]))
                return !0;
        return !1
    }), Array.prototype.reduce || (Array.prototype.reduce = function(t) {
        var e = +this.length;
        if ("function" != typeof t)
            throw new TypeError;
        if (0 === e && 1 === arguments.length)
            throw new TypeError;
        var n = 0;
        if (arguments.length >= 2)
            var i = arguments[1];
        else
            for (; ; ) {
                if (n in this) {
                    i = this[n++];
                    break
                }
                if (++n >= e)
                    throw new TypeError
            }
        for (; e > n; n++)
            n in this && (i = t.call(null, i, this[n], n, this));
        return i
    }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(t) {
        var e = +this.length;
        if ("function" != typeof t)
            throw new TypeError;
        if (0 === e && 1 === arguments.length)
            throw new TypeError;
        var n;
        if (e -= 1, arguments.length >= 2)
            n = arguments[1];
        else
            for (; ; ) {
                if (e in this) {
                    n = this[e--];
                    break
                }
                if (--e < 0)
                    throw new TypeError
            }
        for (; e >= 0; e--)
            e in this && (n = t.call(null, n, this[e], e, this));
        return n
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
        var n = this.length;
        if (!n)
            return -1;
        var i = e || 0;
        if (i >= n)
            return -1;
        for (0 > i && (i += n); n > i; i++)
            if (i in this && t === this[i])
                return i;
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(t, e) {
        var n = this.length;
        if (!n)
            return -1;
        var i = e || n;
        for (0 > i && (i += n), i = Math.min(i, n - 1); i >= 0; i--)
            if (i in this && t === this[i])
                return i;
        return -1
    }), Object.getPrototypeOf || (Object.getPrototypeOf = function(t) {
        return t.__proto__ || t.constructor.prototype
    }), Object.getOwnPropertyDescriptor || (Object.getOwnPropertyDescriptor = function(e, n) {
        if ("object" != typeof e && "function" != typeof e || null === e)
            throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + e);
        if (!c(e, n))
            return t;
        var i, a, u;
        if (i = {enumerable: !0,configurable: !0}, r) {
            var d = e.__proto__;
            if (e.__proto__ = l, a = s(e, n), u = o(e, n), e.__proto__ = d, a || u)
                return a && (i.get = a), u && (i.set = u), i
        }
        return i.value = e[n], i
    }), Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(t) {
        return Object.keys(t)
    }), Object.create || (Object.create = function(t, e) {
        var n;
        if (null === t)
            n = {__proto__: null};
        else {
            if ("object" != typeof t)
                throw new TypeError("typeof prototype[" + typeof t + "] != 'object'");
            n = function() {
            }, n.prototype = t, n = new n, n.__proto__ = t
        }
        return "undefined" != typeof e && Object.defineProperties(n, e), n
    }), Object.defineProperty || (Object.defineProperty = function(t, e, a) {
        if ("object" != typeof t && "function" != typeof t)
            throw new TypeError("Object.defineProperty called on non-object: " + t);
        if ("object" != typeof a || null === a)
            throw new TypeError("Property description must be an object: " + a);
        if (c(a, "value"))
            r && (s(t, e) || o(t, e)) && (t.__proto__ = l, delete t[e]), t[e] = a.value;
        else {
            if (!r)
                throw new TypeError("getters & setters can not be defined on this javascript engine");
            c(a, "get") && n(t, e, a.get), c(a, "set") && i(t, e, a.set)
        }
        return t
    }), Object.defineProperties || (Object.defineProperties = function(t, e) {
        for (var n in e)
            c(e, n) && Object.defineProperty(t, n, e[n]);
        return t
    }), Object.seal || (Object.seal = function(t) {
        return t
    }), Object.freeze || (Object.freeze = function(t) {
        return t
    });
    try {
        Object.freeze(function() {
        })
    } catch (u) {
        Object.freeze = function(t) {
            return function(e) {
                return "function" == typeof e ? e : t(e)
            }
        }(Object.freeze)
    }
    if (Object.preventExtensions || (Object.preventExtensions = function(t) {
        return t
    }), Object.isSealed || (Object.isSealed = function() {
        return !1
    }), Object.isFrozen || (Object.isFrozen = function() {
        return !1
    }), Object.isExtensible || (Object.isExtensible = function() {
        return !0
    }), !Object.keys) {
        var d, h = !0, p = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], f = p.length;
        for (d in {toString: null})
            h = !1;
        Object.keys = function v(t) {
            if ("object" != typeof t && "function" != typeof t || null === t)
                throw new TypeError("Object.keys called on a non-object");
            var e, v = [];
            for (e in t)
                c(t, e) && v.push(e);
            if (h)
                for (e = 0; f > e; e++) {
                    var n = p[e];
                    c(t, n) && v.push(n)
                }
            return v
        }
    }
    if (Date.prototype.toISOString || (Date.prototype.toISOString = function() {
        return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1) + "-" + this.getUTCDate() + "T" + this.getUTCHours() + ":" + this.getUTCMinutes() + ":" + this.getUTCSeconds() + "Z"
    }), Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), Date.prototype.toJSON || (Date.prototype.toJSON = function() {
        if ("function" != typeof this.toISOString)
            throw new TypeError;
        return this.toISOString()
    }), isNaN(Date.parse("T00:00")) && (Date = function(e) {
        var n, i = function(t, n, s, o, r, a, l) {
            var c = arguments.length;
            return this instanceof e ? (c = 1 === c && String(t) === t ? new e(i.parse(t)) : c >= 7 ? new e(t, n, s, o, r, a, l) : c >= 6 ? new e(t, n, s, o, r, a) : c >= 5 ? new e(t, n, s, o, r) : c >= 4 ? new e(t, n, s, o) : c >= 3 ? new e(t, n, s) : c >= 2 ? new e(t, n) : c >= 1 ? new e(t) : new e, c.constructor = i, c) : e.apply(this, arguments)
        }, s = RegExp("^(?:((?:[+-]\\d\\d)?\\d\\d\\d\\d)(?:-(\\d\\d)(?:-(\\d\\d))?)?)?(?:T(\\d\\d):(\\d\\d)(?::(\\d\\d)(?:\\.(\\d\\d\\d))?)?)?(?:Z|([+-])(\\d\\d):(\\d\\d))?$");
        for (n in e)
            i[n] = e[n];
        return i.now = e.now, i.UTC = e.UTC, i.prototype = e.prototype, i.prototype.constructor = i, i.parse = function(n) {
            var i = s.exec(n);
            if (i) {
                i.shift();
                for (var o = i[0] === t, r = 0; 10 > r; r++)
                    7 !== r && (i[r] = +(i[r] || (3 > r ? 1 : 0)), 1 === r && i[r]--);
                return o ? 1e3 * (60 * (60 * i[3] + i[4]) + i[5]) + i[6] : (o = 6e4 * (60 * i[8] + i[9]), "-" === i[6] && (o = -o), e.UTC.apply(this, i.slice(0, 7)) + o)
            }
            return e.parse.apply(this, arguments)
        }, i
    }(Date)), !String.prototype.trim) {
        var m = /^\s\s*/, g = /\s\s*$/;
        String.prototype.trim = function() {
            return String(this).replace(m, "").replace(g, "")
        }
    }
}), "undefined" == typeof document || "classList" in document.createElement("a") || !function(t) {
    var e = "classList", n = "prototype", i = (t.HTMLElement || t.Element)[n], s = Object, o = String[n].trim || function() {
        return this.replace(/^\s+|\s+$/g, "")
    }, r = Array[n].indexOf || function(t) {
        for (var e = 0, n = this.length; n > e; e++)
            if (e in this && this[e] === t)
                return e;
        return -1
    }, a = function(t, e) {
        this.name = t, this.code = DOMException[t], this.message = e
    }, l = function(t, e) {
        if ("" === e)
            throw new a("SYNTAX_ERR", "An invalid or illegal string was specified");
        if (/\s/.test(e))
            throw new a("INVALID_CHARACTER_ERR", "String contains an invalid character");
        return r.call(t, e)
    }, c = function(t) {
        for (var e = o.call(t.className), n = e ? e.split(/\s+/) : [], i = 0, s = n.length; s > i; i++)
            this.push(n[i]);
        this._updateClassName = function() {
            t.className = this.toString()
        }
    }, u = c[n] = [], d = function() {
        return new c(this)
    };
    if (a[n] = Error[n], u.item = function(t) {
        return this[t] || null
    }, u.contains = function(t) {
        return t += "", -1 !== l(this, t)
    }, u.add = function(t) {
        t += "", -1 === l(this, t) && (this.push(t), this._updateClassName())
    }, u.remove = function(t) {
        t += "";
        var e = l(this, t);
        -1 !== e && (this.splice(e, 1), this._updateClassName())
    }, u.toggle = function(t) {
        t += "", -1 === l(this, t) ? this.add(t) : this.remove(t)
    }, u.toString = function() {
        return this.join(" ")
    }, s.defineProperty) {
        var h = {get: d,enumerable: !0,configurable: !0};
        try {
            s.defineProperty(i, e, h)
        } catch (p) {
            -2146823252 === p.number && (h.enumerable = !1, s.defineProperty(i, e, h))
        }
    } else
        s[n].__defineGetter__ && i.__defineGetter__(e, d)
}(self), function(t) {
    function e() {
        p || (p = !0, l(m, function(t) {
            d(t)
        }))
    }
    function n(e, n) {
        var i = t.createElement("script");
        i.type = "text/" + (e.type || "javascript"), i.src = e.src || e, i.async = !1, i.onreadystatechange = i.onload = function() {
            var t = i.readyState;
            !n.done && (!t || /loaded|complete/.test(t)) && (n.done = !0, n())
        }, (t.body || f).appendChild(i)
    }
    function i(t, e) {
        return t.state == k ? e && e() : t.state == _ ? E.ready(t.name, e) : t.state == w ? t.onpreload.push(function() {
            i(t, e)
        }) : (t.state = _, void n(t.url, function() {
            t.state = k, e && e(), l(v[t.name], function(t) {
                d(t)
            }), r() && p && l(v.ALL, function(t) {
                d(t)
            })
        }))
    }
    function s(t) {
        void 0 === t.state && (t.state = w, t.onpreload = [], n({src: t.url,type: "cache"}, function() {
            o(t)
        }))
    }
    function o(t) {
        t.state = T, l(t.onpreload, function(t) {
            t.call()
        })
    }
    function r(t) {
        t = t || y;
        var e;
        for (var n in t) {
            if (t.hasOwnProperty(n) && t[n].state != k)
                return !1;
            e = !0
        }
        return e
    }
    function a(t) {
        return "[object Function]" == Object.prototype.toString.call(t)
    }
    function l(t, e) {
        if (t) {
            "object" == typeof t && (t = [].slice.call(t));
            for (var n = 0; n < t.length; n++)
                e.call(t, t[n], n)
        }
    }
    function c(t) {
        var e;
        if ("object" == typeof t)
            for (var n in t)
                t[n] && (e = {name: n,url: t[n]});
        else
            e = {name: u(t),url: t};
        var i = y[e.name];
        return i && i.url === e.url ? i : (y[e.name] = e, e)
    }
    function u(t) {
        var e = t.split("/"), n = e[e.length - 1], i = n.indexOf("?");
        return -1 != i ? n.substring(0, i) : n
    }
    function d(t) {
        t._done || (t(), t._done = 1)
    }
    var h, p, f = t.documentElement, m = [], g = [], v = {}, y = {}, b = t.createElement("script").async === !0 || "MozAppearance" in t.documentElement.style || window.opera, S = window.head_conf && head_conf.head || "head", E = window[S] = window[S] || function() {
        E.ready.apply(null, arguments)
    }, T = 1, w = 2, _ = 3, k = 4;
    if (E.js = b ? function() {
        var t = arguments, e = t[t.length - 1], n = {};
        return a(e) || (e = null), l(t, function(s, o) {
            s != e && (s = c(s), n[s.name] = s, i(s, e && o == t.length - 2 ? function() {
                r(n) && d(e)
            } : null))
        }), E
    } : function() {
        var t = arguments, e = [].slice.call(t, 1), n = e[0];
        return h ? (n ? (l(e, function(t) {
            a(t) || s(c(t))
        }), i(c(t[0]), a(n) ? n : function() {
            E.js.apply(null, e)
        })) : i(c(t[0])), E) : (g.push(function() {
            E.js.apply(null, t)
        }), E)
    }, E.ready = function(e, n) {
        if (e == t)
            return p ? d(n) : m.push(n), E;
        if (a(e) && (n = e, e = "ALL"), "string" != typeof e || !a(n))
            return E;
        var i = y[e];
        if (i && i.state == k || "ALL" == e && r() && p)
            return d(n), E;
        var s = v[e];
        return s ? s.push(n) : s = v[e] = [n], E
    }, E.ready(t, function() {
        r() && l(v.ALL, function(t) {
            d(t)
        }), E.feature && E.feature("domloaded", !0)
    }), window.addEventListener)
        t.addEventListener("DOMContentLoaded", e, !1), window.addEventListener("load", e, !1);
    else if (window.attachEvent) {
        t.attachEvent("onreadystatechange", function() {
            "complete" === t.readyState && e()
        });
        var L = 1;
        try {
            L = window.frameElement
        } catch (C) {
        }
        !L && f.doScroll && function() {
            try {
                f.doScroll("left"), e()
            } catch (t) {
                return void setTimeout(arguments.callee, 1)
            }
        }(), window.attachEvent("onload", e)
    }
    !t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", handler = function() {
        t.removeEventListener("DOMContentLoaded", handler, !1), t.readyState = "complete"
    }, !1)), setTimeout(function() {
        h = !0, l(g, function(t) {
            t()
        })
    }, 300)
}(document), function(t) {
    function e(t, e, n, i, s) {
        this._listener = e, this._isOnce = n, this.context = i, this._signal = t, this._priority = s || 0
    }
    var n = {VERSION: "0.6.1"};
    e.prototype = {active: !0,execute: function(t) {
            var e;
            return this.active && (e = this._listener.apply(this.context, t), this._isOnce && this.detach()), e
        },detach: function() {
            return this._signal.remove(this._listener)
        },getListener: function() {
            return this._listener
        },dispose: function() {
            this.detach(), this._destroy()
        },_destroy: function() {
            delete this._signal, delete this._isOnce, delete this._listener, delete this.context
        },isOnce: function() {
            return this._isOnce
        },toString: function() {
            return "[SignalBinding isOnce: " + this._isOnce + ", active: " + this.active + "]"
        }}, n.Signal = function() {
        this._bindings = []
    }, n.Signal.prototype = {_shouldPropagate: !0,active: !0,_registerListener: function(t, n, i, s) {
            if ("function" != typeof t)
                throw new Error("listener is a required param of add() and addOnce() and should be a Function.");
            var o, r = this._indexOfListener(t);
            if (-1 !== r) {
                if (o = this._bindings[r], o.isOnce() !== n)
                    throw new Error("You cannot add" + (n ? "" : "Once") + "() then add" + (n ? "Once" : "") + "() the same listener without removing the relationship first.")
            } else
                o = new e(this, t, n, i, s), this._addBinding(o);
            return o
        },_addBinding: function(t) {
            var e = this._bindings.length;
            do
                --e;
            while (this._bindings[e] && t._priority <= this._bindings[e]._priority);
            this._bindings.splice(e + 1, 0, t)
        },_indexOfListener: function(t) {
            for (var e = this._bindings.length; e--; )
                if (this._bindings[e]._listener === t)
                    return e;
            return -1
        },add: function(t, e, n) {
            return this._registerListener(t, !1, e, n)
        },addOnce: function(t, e, n) {
            return this._registerListener(t, !0, e, n)
        },remove: function(t) {
            if ("function" != typeof t)
                throw new Error("listener is a required param of remove() and should be a Function.");
            var e = this._indexOfListener(t);
            return -1 !== e && (this._bindings[e]._destroy(), this._bindings.splice(e, 1)), t
        },removeAll: function() {
            for (var t = this._bindings.length; t--; )
                this._bindings[t]._destroy();
            this._bindings.length = 0
        },getNumListeners: function() {
            return this._bindings.length
        },halt: function() {
            this._shouldPropagate = !1
        },dispatch: function() {
            if (this.active) {
                var t = Array.prototype.slice.call(arguments), e = this._bindings.slice(), n = this._bindings.length;
                this._shouldPropagate = !0;
                do
                    n--;
                while (e[n] && this._shouldPropagate && e[n].execute(t) !== !1)
            }
        },dispose: function() {
            this.removeAll(), delete this._bindings
        },toString: function() {
            return "[Signal active: " + this.active + " numListeners: " + this.getNumListeners() + "]"
        }}, t.signals = n
}(window || global || this);
var JSON;
JSON || (JSON = {}), function() {
    "use strict";
    function f(t) {
        return 10 > t ? "0" + t : t
    }
    function quote(t) {
        return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
            var e = meta[t];
            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + t + '"'
    }
    function str(t, e) {
        var n, i, s, o, r, a = gap, l = e[t];
        switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(t)), "function" == typeof rep && (l = rep.call(e, t, l)), typeof l) {
            case "string":
                return quote(l);
            case "number":
                return isFinite(l) ? String(l) : "null";
            case "boolean":
            case "null":
                return String(l);
            case "object":
                if (!l)
                    return "null";
                if (gap += indent, r = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                    for (o = l.length, n = 0; o > n; n += 1)
                        r[n] = str(n, l) || "null";
                    return s = 0 === r.length ? "[]" : gap ? "[\n" + gap + r.join(",\n" + gap) + "\n" + a + "]" : "[" + r.join(",") + "]", gap = a, s
                }
                if (rep && "object" == typeof rep)
                    for (o = rep.length, n = 0; o > n; n += 1)
                        "string" == typeof rep[n] && (i = rep[n], s = str(i, l), s && r.push(quote(i) + (gap ? ": " : ":") + s));
                else
                    for (i in l)
                        Object.prototype.hasOwnProperty.call(l, i) && (s = str(i, l), s && r.push(quote(i) + (gap ? ": " : ":") + s));
                return s = 0 === r.length ? "{}" : gap ? "{\n" + gap + r.join(",\n" + gap) + "\n" + a + "}" : "{" + r.join(",") + "}", gap = a, s
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b","	": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(t, e, n) {
        var i;
        if (gap = "", indent = "", "number" == typeof n)
            for (i = 0; n > i; i += 1)
                indent += " ";
        else
            "string" == typeof n && (indent = n);
        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length))
            throw new Error("JSON.stringify");
        return str("", {"": t})
    }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(t, e) {
            var n, i, s = t[e];
            if (s && "object" == typeof s)
                for (n in s)
                    Object.prototype.hasOwnProperty.call(s, n) && (i = walk(s, n), void 0 !== i ? s[n] = i : delete s[n]);
            return reviver.call(t, e, s)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), function(t) {
    function e(t, e) {
        return function(n) {
            return l(t.call(this, n), e)
        }
    }
    function n(t, e) {
        return function(n) {
            return this.lang().ordinal(t.call(this, n), e)
        }
    }
    function i() {
    }
    function s(t) {
        r(this, t)
    }
    function o(t) {
        var e = t.years || t.year || t.y || 0, n = t.months || t.month || t.M || 0, i = t.weeks || t.week || t.w || 0, s = t.days || t.day || t.d || 0, o = t.hours || t.hour || t.h || 0, r = t.minutes || t.minute || t.m || 0, a = t.seconds || t.second || t.s || 0, l = t.milliseconds || t.millisecond || t.ms || 0;
        this._input = t, this._milliseconds = +l + 1e3 * a + 6e4 * r + 36e5 * o, this._days = +s + 7 * i, this._months = +n + 12 * e, this._data = {}, this._bubble()
    }
    function r(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }
    function a(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    }
    function l(t, e) {
        for (var n = t + ""; n.length < e; )
            n = "0" + n;
        return n
    }
    function c(t, e, n, i) {
        var s, o, r = e._milliseconds, a = e._days, l = e._months;
        r && t._d.setTime(+t._d + r * n), (a || l) && (s = t.minute(), o = t.hour()), a && t.date(t.date() + a * n), l && t.month(t.month() + l * n), r && !i && $.updateOffset(t), (a || l) && (t.minute(s), t.hour(o))
    }
    function u(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function d(t, e) {
        var n, i = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), o = 0;
        for (n = 0; i > n; n++)
            ~~t[n] !== ~~e[n] && o++;
        return o + s
    }
    function h(t) {
        return t ? le[t] || t.toLowerCase().replace(/(.)s$/, "$1") : t
    }
    function p(t, e) {
        return e.abbr = t, B[t] || (B[t] = new i), B[t].set(e), B[t]
    }
    function f(t) {
        delete B[t]
    }
    function m(t) {
        if (!t)
            return $.fn._lang;
        if (!B[t] && F)
            try {
                require("./lang/" + t)
            } catch (e) {
                return $.fn._lang
            }
        return B[t] || $.fn._lang
    }
    function g(t) {
        return t.match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }
    function v(t) {
        var e, n, i = t.match(W);
        for (e = 0, n = i.length; n > e; e++)
            i[e] = he[i[e]] ? he[i[e]] : g(i[e]);
        return function(s) {
            var o = "";
            for (e = 0; n > e; e++)
                o += i[e] instanceof Function ? i[e].call(s, t) : i[e];
            return o
        }
    }
    function y(t, e) {
        return e = b(e, t.lang()), ce[e] || (ce[e] = v(e)), ce[e](t)
    }
    function b(t, e) {
        function n(t) {
            return e.longDateFormat(t) || t
        }
        for (var i = 5; i-- && (Y.lastIndex = 0, Y.test(t)); )
            t = t.replace(Y, n);
        return t
    }
    function S(t, e) {
        switch (t) {
            case "DDDD":
                return G;
            case "YYYY":
                return J;
            case "YYYYY":
                return K;
            case "S":
            case "SS":
            case "SSS":
            case "DDD":
                return q;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return Z;
            case "a":
            case "A":
                return m(e._l)._meridiemParse;
            case "X":
                return ee;
            case "Z":
            case "ZZ":
                return Q;
            case "T":
                return te;
            case "MM":
            case "DD":
            case "YY":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
                return X;
            default:
                return new RegExp(t.replace("\\", ""))
        }
    }
    function E(t) {
        var e = (Q.exec(t) || [])[0], n = (e + "").match(oe) || ["-", 0, 0], i = +(60 * n[1]) + ~~n[2];
        return "+" === n[0] ? -i : i
    }
    function T(t, e, n) {
        var i, s = n._a;
        switch (t) {
            case "M":
            case "MM":
                null != e && (s[1] = ~~e - 1);
                break;
            case "MMM":
            case "MMMM":
                i = m(n._l).monthsParse(e), null != i ? s[1] = i : n._isValid = !1;
                break;
            case "D":
            case "DD":
                null != e && (s[2] = ~~e);
                break;
            case "DDD":
            case "DDDD":
                null != e && (s[1] = 0, s[2] = ~~e);
                break;
            case "YY":
                s[0] = ~~e + (~~e > 68 ? 1900 : 2e3);
                break;
            case "YYYY":
            case "YYYYY":
                s[0] = ~~e;
                break;
            case "a":
            case "A":
                n._isPm = m(n._l).isPM(e);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                s[3] = ~~e;
                break;
            case "m":
            case "mm":
                s[4] = ~~e;
                break;
            case "s":
            case "ss":
                s[5] = ~~e;
                break;
            case "S":
            case "SS":
            case "SSS":
                s[6] = ~~(1e3 * ("0." + e));
                break;
            case "X":
                n._d = new Date(1e3 * parseFloat(e));
                break;
            case "Z":
            case "ZZ":
                n._useUTC = !0, n._tzm = E(e)
        }
        null == e && (n._isValid = !1)
    }
    function w(t) {
        var e, n, i, s = [];
        if (!t._d) {
            for (i = k(t), e = 0; 3 > e && null == t._a[e]; ++e)
                t._a[e] = s[e] = i[e];
            for (; 7 > e; e++)
                t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            s[3] += ~~((t._tzm || 0) / 60), s[4] += ~~((t._tzm || 0) % 60), n = new Date(0), t._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), t._d = n
        }
    }
    function _(t) {
        var e = t._i;
        t._d || (t._a = [e.years || e.year || e.y, e.months || e.month || e.M, e.days || e.day || e.d, e.hours || e.hour || e.h, e.minutes || e.minute || e.m, e.seconds || e.second || e.s, e.milliseconds || e.millisecond || e.ms], w(t))
    }
    function k(t) {
        var e = new Date;
        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
    }
    function L(t) {
        var e, n, i, s = m(t._l), o = "" + t._i;
        for (i = b(t._f, s).match(W), t._a = [], e = 0; e < i.length; e++)
            n = (S(i[e], t).exec(o) || [])[0], n && (o = o.slice(o.indexOf(n) + n.length)), he[i[e]] && T(i[e], n, t);
        o && (t._il = o), t._isPm && t._a[3] < 12 && (t._a[3] += 12), t._isPm === !1 && 12 === t._a[3] && (t._a[3] = 0), w(t)
    }
    function C(t) {
        var e, n, i, o, a, l = 99;
        for (o = 0; o < t._f.length; o++)
            e = r({}, t), e._f = t._f[o], L(e), n = new s(e), a = d(e._a, n.toArray()), n._il && (a += n._il.length), l > a && (l = a, i = n);
        r(t, i)
    }
    function x(t) {
        var e, n = t._i, i = ne.exec(n);
        if (i) {
            for (t._f = "YYYY-MM-DD" + (i[2] || " "), e = 0; 4 > e; e++)
                if (se[e][1].exec(n)) {
                    t._f += se[e][0];
                    break
                }
            Q.exec(n) && (t._f += " Z"), L(t)
        } else
            t._d = new Date(n)
    }
    function A(e) {
        var n = e._i, i = z.exec(n);
        n === t ? e._d = new Date : i ? e._d = new Date(+i[1]) : "string" == typeof n ? x(e) : u(n) ? (e._a = n.slice(0), w(e)) : n instanceof Date ? e._d = new Date(+n) : "object" == typeof n ? _(e) : e._d = new Date(n)
    }
    function I(t, e, n, i, s) {
        return s.relativeTime(e || 1, !!n, t, i)
    }
    function D(t, e, n) {
        var i = H(Math.abs(t) / 1e3), s = H(i / 60), o = H(s / 60), r = H(o / 24), a = H(r / 365), l = 45 > i && ["s", i] || 1 === s && ["m"] || 45 > s && ["mm", s] || 1 === o && ["h"] || 22 > o && ["hh", o] || 1 === r && ["d"] || 25 >= r && ["dd", r] || 45 >= r && ["M"] || 345 > r && ["MM", H(r / 30)] || 1 === a && ["y"] || ["yy", a];
        return l[2] = e, l[3] = t > 0, l[4] = n, I.apply({}, l)
    }
    function M(t, e, n) {
        var i, s = n - e, o = n - t.day();
        return o > s && (o -= 7), s - 7 > o && (o += 7), i = $(t).add("d", o), {week: Math.ceil(i.dayOfYear() / 7),year: i.year()}
    }
    function R(t) {
        var e = t._i, n = t._f;
        return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = m().preparse(e)), $.isMoment(e) ? (t = r({}, e), t._d = new Date(+e._d)) : n ? u(n) ? C(t) : L(t) : A(t), new s(t))
    }
    function N(t, e) {
        $.fn[t] = $.fn[t + "s"] = function(t) {
            var n = this._isUTC ? "UTC" : "";
            return null != t ? (this._d["set" + n + e](t), $.updateOffset(this), this) : this._d["get" + n + e]()
        }
    }
    function O(t) {
        $.duration.fn[t] = function() {
            return this._data[t]
        }
    }
    function P(t, e) {
        $.duration.fn["as" + t] = function() {
            return +this / e
        }
    }
    for (var $, j, U = "2.2.1", H = Math.round, B = {}, F = "undefined" != typeof module && module.exports, z = /^\/?Date\((\-?\d+)/i, V = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, W = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, X = /\d\d?/, q = /\d{1,3}/, G = /\d{3}/, J = /\d{1,4}/, K = /[+\-]?\d{1,6}/, Z = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Q = /Z|[\+\-]\d\d:?\d\d/i, te = /T/i, ee = /[\+\-]?\d+(\.\d{1,3})?/, ne = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, ie = "YYYY-MM-DDTHH:mm:ssZ", se = [["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], oe = /([\+\-]|\d\d)/gi, re = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), ae = {Milliseconds: 1,Seconds: 1e3,Minutes: 6e4,Hours: 36e5,Days: 864e5,Months: 2592e6,Years: 31536e6}, le = {ms: "millisecond",s: "second",m: "minute",h: "hour",d: "day",w: "week",W: "isoweek",M: "month",y: "year"}, ce = {}, ue = "DDD w W M D d".split(" "), de = "M D H h m s w W".split(" "), he = {M: function() {
            return this.month() + 1
        },MMM: function(t) {
            return this.lang().monthsShort(this, t)
        },MMMM: function(t) {
            return this.lang().months(this, t)
        },D: function() {
            return this.date()
        },DDD: function() {
            return this.dayOfYear()
        },d: function() {
            return this.day()
        },dd: function(t) {
            return this.lang().weekdaysMin(this, t)
        },ddd: function(t) {
            return this.lang().weekdaysShort(this, t)
        },dddd: function(t) {
            return this.lang().weekdays(this, t)
        },w: function() {
            return this.week()
        },W: function() {
            return this.isoWeek()
        },YY: function() {
            return l(this.year() % 100, 2)
        },YYYY: function() {
            return l(this.year(), 4)
        },YYYYY: function() {
            return l(this.year(), 5)
        },gg: function() {
            return l(this.weekYear() % 100, 2)
        },gggg: function() {
            return this.weekYear()
        },ggggg: function() {
            return l(this.weekYear(), 5)
        },GG: function() {
            return l(this.isoWeekYear() % 100, 2)
        },GGGG: function() {
            return this.isoWeekYear()
        },GGGGG: function() {
            return l(this.isoWeekYear(), 5)
        },e: function() {
            return this.weekday()
        },E: function() {
            return this.isoWeekday()
        },a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0)
        },A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1)
        },H: function() {
            return this.hours()
        },h: function() {
            return this.hours() % 12 || 12
        },m: function() {
            return this.minutes()
        },s: function() {
            return this.seconds()
        },S: function() {
            return ~~(this.milliseconds() / 100)
        },SS: function() {
            return l(~~(this.milliseconds() / 10), 2)
        },SSS: function() {
            return l(this.milliseconds(), 3)
        },Z: function() {
            var t = -this.zone(), e = "+";
            return 0 > t && (t = -t, e = "-"), e + l(~~(t / 60), 2) + ":" + l(~~t % 60, 2)
        },ZZ: function() {
            var t = -this.zone(), e = "+";
            return 0 > t && (t = -t, e = "-"), e + l(~~(10 * t / 6), 4)
        },z: function() {
            return this.zoneAbbr()
        },zz: function() {
            return this.zoneName()
        },X: function() {
            return this.unix()
        }}; ue.length; )
        j = ue.pop(), he[j + "o"] = n(he[j], j);
    for (; de.length; )
        j = de.pop(), he[j + j] = e(he[j], 2);
    for (he.DDDD = e(he.DDD, 3), r(i.prototype, {set: function(t) {
            var e, n;
            for (n in t)
                e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e
        },_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months: function(t) {
            return this._months[t.month()]
        },_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort: function(t) {
            return this._monthsShort[t.month()]
        },monthsParse: function(t) {
            var e, n, i;
            for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
                if (this._monthsParse[e] || (n = $.utc([2e3, e]), i = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[e] = new RegExp(i.replace(".", ""), "i")), this._monthsParse[e].test(t))
                    return e
        },_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays: function(t) {
            return this._weekdays[t.day()]
        },_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort: function(t) {
            return this._weekdaysShort[t.day()]
        },_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin: function(t) {
            return this._weekdaysMin[t.day()]
        },weekdaysParse: function(t) {
            var e, n, i;
            for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
                if (this._weekdaysParse[e] || (n = $([2e3, 1]).day(e), i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[e] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[e].test(t))
                    return e
        },_longDateFormat: {LT: "h:mm A",L: "MM/DD/YYYY",LL: "MMMM D YYYY",LLL: "MMMM D YYYY LT",LLLL: "dddd, MMMM D YYYY LT"},longDateFormat: function(t) {
            var e = this._longDateFormat[t];
            return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
                return t.slice(1)
            }), this._longDateFormat[t] = e), e
        },isPM: function(t) {
            return "p" === (t + "").toLowerCase().charAt(0)
        },_meridiemParse: /[ap]\.?m?\.?/i,meridiem: function(t, e, n) {
            return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        },_calendar: {sameDay: "[Today at] LT",nextDay: "[Tomorrow at] LT",nextWeek: "dddd [at] LT",lastDay: "[Yesterday at] LT",lastWeek: "[Last] dddd [at] LT",sameElse: "L"},calendar: function(t, e) {
            var n = this._calendar[t];
            return "function" == typeof n ? n.apply(e) : n
        },_relativeTime: {future: "in %s",past: "%s ago",s: "a few seconds",m: "a minute",mm: "%d minutes",h: "an hour",hh: "%d hours",d: "a day",dd: "%d days",M: "a month",MM: "%d months",y: "a year",yy: "%d years"},relativeTime: function(t, e, n, i) {
            var s = this._relativeTime[n];
            return "function" == typeof s ? s(t, e, n, i) : s.replace(/%d/i, t)
        },pastFuture: function(t, e) {
            var n = this._relativeTime[t > 0 ? "future" : "past"];
            return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
        },ordinal: function(t) {
            return this._ordinal.replace("%d", t)
        },_ordinal: "%d",preparse: function(t) {
            return t
        },postformat: function(t) {
            return t
        },week: function(t) {
            return M(t, this._week.dow, this._week.doy).week
        },_week: {dow: 0,doy: 6}}), $ = function(t, e, n) {
        return R({_i: t,_f: e,_l: n,_isUTC: !1})
    }, $.utc = function(t, e, n) {
        return R({_useUTC: !0,_isUTC: !0,_l: n,_i: t,_f: e}).utc()
    }, $.unix = function(t) {
        return $(1e3 * t)
    }, $.duration = function(t, e) {
        var n, i, s = $.isDuration(t), r = "number" == typeof t, a = s ? t._input : r ? {} : t, l = V.exec(t);
        return r ? e ? a[e] = t : a.milliseconds = t : l && (n = "-" === l[1] ? -1 : 1, a = {y: 0,d: ~~l[2] * n,h: ~~l[3] * n,m: ~~l[4] * n,s: ~~l[5] * n,ms: ~~l[6] * n}), i = new o(a), s && t.hasOwnProperty("_lang") && (i._lang = t._lang), i
    }, $.version = U, $.defaultFormat = ie, $.updateOffset = function() {
    }, $.lang = function(t, e) {
        return t ? (t = t.toLowerCase(), t = t.replace("_", "-"), e ? p(t, e) : null === e ? (f(t), t = "en") : B[t] || m(t), void ($.duration.fn._lang = $.fn._lang = m(t))) : $.fn._lang._abbr
    }, $.langData = function(t) {
        return t && t._lang && t._lang._abbr && (t = t._lang._abbr), m(t)
    }, $.isMoment = function(t) {
        return t instanceof s
    }, $.isDuration = function(t) {
        return t instanceof o
    }, r($.fn = s.prototype, {clone: function() {
            return $(this)
        },valueOf: function() {
            return +this._d + 6e4 * (this._offset || 0)
        },unix: function() {
            return Math.floor(+this / 1e3)
        },toString: function() {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },toDate: function() {
            return this._offset ? new Date(+this) : this._d
        },toISOString: function() {
            return y($(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },toArray: function() {
            var t = this;
            return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
        },isValid: function() {
            return null == this._isValid && (this._isValid = this._a ? !d(this._a, (this._isUTC ? $.utc(this._a) : $(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
        },invalidAt: function() {
            var t, e = this._a, n = (this._isUTC ? $.utc(this._a) : $(this._a)).toArray();
            for (t = 6; t >= 0 && e[t] === n[t]; --t)
                ;
            return t
        },utc: function() {
            return this.zone(0)
        },local: function() {
            return this.zone(0), this._isUTC = !1, this
        },format: function(t) {
            var e = y(this, t || $.defaultFormat);
            return this.lang().postformat(e)
        },add: function(t, e) {
            var n;
            return n = "string" == typeof t ? $.duration(+e, t) : $.duration(t, e), c(this, n, 1), this
        },subtract: function(t, e) {
            var n;
            return n = "string" == typeof t ? $.duration(+e, t) : $.duration(t, e), c(this, n, -1), this
        },diff: function(t, e, n) {
            var i, s, o = this._isUTC ? $(t).zone(this._offset || 0) : $(t).local(), r = 6e4 * (this.zone() - o.zone());
            return e = h(e), "year" === e || "month" === e ? (i = 432e5 * (this.daysInMonth() + o.daysInMonth()), s = 12 * (this.year() - o.year()) + (this.month() - o.month()), s += (this - $(this).startOf("month") - (o - $(o).startOf("month"))) / i, s -= 6e4 * (this.zone() - $(this).startOf("month").zone() - (o.zone() - $(o).startOf("month").zone())) / i, "year" === e && (s /= 12)) : (i = this - o, s = "second" === e ? i / 1e3 : "minute" === e ? i / 6e4 : "hour" === e ? i / 36e5 : "day" === e ? (i - r) / 864e5 : "week" === e ? (i - r) / 6048e5 : i), n ? s : a(s)
        },from: function(t, e) {
            return $.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
        },fromNow: function(t) {
            return this.from($(), t)
        },calendar: function() {
            var t = this.diff($().zone(this.zone()).startOf("day"), "days", !0), e = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(e, this))
        },isLeapYear: function() {
            var t = this.year();
            return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
        },isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
        },day: function(t) {
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t ? "string" == typeof t && (t = this.lang().weekdaysParse(t), "number" != typeof t) ? this : this.add({d: t - e}) : e
        },month: function(t) {
            var e, n = this._isUTC ? "UTC" : "";
            return null != t ? "string" == typeof t && (t = this.lang().monthsParse(t), "number" != typeof t) ? this : (e = this.date(), this.date(1), this._d["set" + n + "Month"](t), this.date(Math.min(e, this.daysInMonth())), $.updateOffset(this), this) : this._d["get" + n + "Month"]()
        },startOf: function(t) {
            switch (t = h(t)) {
                case "year":
                    this.month(0);
                case "month":
                    this.date(1);
                case "week":
                case "isoweek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === t ? this.weekday(0) : "isoweek" === t && this.isoWeekday(1), this
        },endOf: function(t) {
            return t = h(t), this.startOf(t).add("isoweek" === t ? "week" : t, 1).subtract("ms", 1)
        },isAfter: function(t, e) {
            return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) > +$(t).startOf(e)
        },isBefore: function(t, e) {
            return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) < +$(t).startOf(e)
        },isSame: function(t, e) {
            return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) === +$(t).startOf(e)
        },min: function(t) {
            return t = $.apply(null, arguments), this > t ? this : t
        },max: function(t) {
            return t = $.apply(null, arguments), t > this ? this : t
        },zone: function(t) {
            var e = this._offset || 0;
            return null == t ? this._isUTC ? e : this._d.getTimezoneOffset() : ("string" == typeof t && (t = E(t)), Math.abs(t) < 16 && (t = 60 * t), this._offset = t, this._isUTC = !0, e !== t && c(this, $.duration(e - t, "m"), 1, !0), this)
        },zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },hasAlignedHourOffset: function(t) {
            return t = t ? $(t).zone() : 0, 0 === (this.zone() - t) % 60
        },daysInMonth: function() {
            return $.utc([this.year(), this.month() + 1, 0]).date()
        },dayOfYear: function(t) {
            var e = H(($(this).startOf("day") - $(this).startOf("year")) / 864e5) + 1;
            return null == t ? e : this.add("d", t - e)
        },weekYear: function(t) {
            var e = M(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return null == t ? e : this.add("y", t - e)
        },isoWeekYear: function(t) {
            var e = M(this, 1, 4).year;
            return null == t ? e : this.add("y", t - e)
        },week: function(t) {
            var e = this.lang().week(this);
            return null == t ? e : this.add("d", 7 * (t - e))
        },isoWeek: function(t) {
            var e = M(this, 1, 4).week;
            return null == t ? e : this.add("d", 7 * (t - e))
        },weekday: function(t) {
            var e = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
            return null == t ? e : this.add("d", t - e)
        },isoWeekday: function(t) {
            return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
        },get: function(t) {
            return t = h(t), this[t.toLowerCase()]()
        },set: function(t, e) {
            t = h(t), this[t.toLowerCase()](e)
        },lang: function(e) {
            return e === t ? this._lang : (this._lang = m(e), this)
        }}), j = 0; j < re.length; j++)
        N(re[j].toLowerCase().replace(/s$/, ""), re[j]);
    N("year", "FullYear"), $.fn.days = $.fn.day, $.fn.months = $.fn.month, $.fn.weeks = $.fn.week, $.fn.isoWeeks = $.fn.isoWeek, $.fn.toJSON = $.fn.toISOString, r($.duration.fn = o.prototype, {_bubble: function() {
            var t, e, n, i, s = this._milliseconds, o = this._days, r = this._months, l = this._data;
            l.milliseconds = s % 1e3, t = a(s / 1e3), l.seconds = t % 60, e = a(t / 60), l.minutes = e % 60, n = a(e / 60), l.hours = n % 24, o += a(n / 24), l.days = o % 30, r += a(o / 30), l.months = r % 12, i = a(r / 12), l.years = i
        },weeks: function() {
            return a(this.days() / 7)
        },valueOf: function() {
            return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
        },humanize: function(t) {
            var e = +this, n = D(e, !t, this.lang());
            return t && (n = this.lang().pastFuture(e, n)), this.lang().postformat(n)
        },add: function(t, e) {
            var n = $.duration(t, e);
            return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
        },subtract: function(t, e) {
            var n = $.duration(t, e);
            return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
        },get: function(t) {
            return t = h(t), this[t.toLowerCase() + "s"]()
        },as: function(t) {
            return t = h(t), this["as" + t.charAt(0).toUpperCase() + t.slice(1) + "s"]()
        },lang: $.fn.lang});
    for (j in ae)
        ae.hasOwnProperty(j) && (P(j, ae[j]), O(j.toLowerCase()));
    P("Weeks", 6048e5), $.duration.fn.asMonths = function() {
        return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, $.lang("en", {ordinal: function(t) {
            var e = t % 10, n = 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
            return t + n
        }}), F && (module.exports = $), "undefined" == typeof ender && (this.moment = $), "function" == typeof define && define.amd && define("moment", [], function() {
        return $
    })
}.call(this), function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
}(this, function() {
    "use strict";
    function t(t, e) {
        var n, i = document.createElement(t || "div");
        for (n in e)
            i[n] = e[n];
        return i
    }
    function e(t) {
        for (var e = 1, n = arguments.length; n > e; e++)
            t.appendChild(arguments[e]);
        return t
    }
    function n(t, e, n, i) {
        var s = ["opacity", e, ~~(100 * t), n, i].join("-"), o = .01 + n / i * 100, r = Math.max(1 - (1 - t) / e * (100 - o), t), a = c.substring(0, c.indexOf("Animation")).toLowerCase(), l = a && "-" + a + "-" || "";
        return d[s] || (h.insertRule("@" + l + "keyframes " + s + "{0%{opacity:" + r + "}" + o + "%{opacity:" + t + "}" + (o + .01) + "%{opacity:1}" + (o + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + r + "}}", h.cssRules.length), d[s] = 1), s
    }
    function i(t, e) {
        var n, i, s = t.style;
        if (void 0 !== s[e])
            return e;
        for (e = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < u.length; i++)
            if (n = u[i] + e, void 0 !== s[n])
                return n
    }
    function s(t, e) {
        for (var n in e)
            t.style[i(t, n) || n] = e[n];
        return t
    }
    function o(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n)
                void 0 === t[i] && (t[i] = n[i])
        }
        return t
    }
    function r(t) {
        for (var e = {x: t.offsetLeft,y: t.offsetTop}; t = t.offsetParent; )
            e.x += t.offsetLeft, e.y += t.offsetTop;
        return e
    }
    function a(t) {
        return "undefined" == typeof this ? new a(t) : void (this.opts = o(t || {}, a.defaults, p))
    }
    function l() {
        function n(e, n) {
            return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
        }
        h.addRule(".spin-vml", "behavior:url(#default#VML)"), a.prototype.lines = function(t, i) {
            function o() {
                return s(n("group", {coordsize: c + " " + c,coordorigin: -l + " " + -l}), {width: c,height: c})
            }
            function r(t, r, a) {
                e(d, e(s(o(), {rotation: 360 / i.lines * t + "deg",left: ~~r}), e(s(n("roundrect", {arcsize: i.corners}), {width: l,height: i.width,left: i.radius,top: -i.width >> 1,filter: a}), n("fill", {color: i.color,opacity: i.opacity}), n("stroke", {opacity: 0}))))
            }
            var a, l = i.length + i.width, c = 2 * l, u = 2 * -(i.width + i.length) + "px", d = s(o(), {position: "absolute",top: u,left: u});
            if (i.shadow)
                for (a = 1; a <= i.lines; a++)
                    r(a, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (a = 1; a <= i.lines; a++)
                r(a);
            return e(t, d)
        }, a.prototype.opacity = function(t, e, n, i) {
            var s = t.firstChild;
            i = i.shadow && i.lines || 0, s && e + i < s.childNodes.length && (s = s.childNodes[e + i], s = s && s.firstChild, s = s && s.firstChild, s && (s.opacity = n))
        }
    }
    var c, u = ["webkit", "Moz", "ms", "O"], d = {}, h = function() {
        var n = t("style", {type: "text/css"});
        return e(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet
    }(), p = {lines: 12,length: 7,width: 5,radius: 10,rotate: 0,corners: 1,color: "#000",direction: 1,speed: 1,trail: 100,opacity: .25,fps: 20,zIndex: 2e9,className: "spinner",top: "auto",left: "auto",position: "relative"};
    a.defaults = {}, o(a.prototype, {spin: function(e) {
            this.stop();
            var n, i, o = this, a = o.opts, l = o.el = s(t(0, {className: a.className}), {position: a.position,width: 0,zIndex: a.zIndex}), u = a.radius + a.length + a.width;
            if (e && (e.insertBefore(l, e.firstChild || null), i = r(e), n = r(l), s(l, {left: ("auto" == a.left ? i.x - n.x + (e.offsetWidth >> 1) : parseInt(a.left, 10) + u) + "px",top: ("auto" == a.top ? i.y - n.y + (e.offsetHeight >> 1) : parseInt(a.top, 10) + u) + "px"})), l.setAttribute("role", "progressbar"), o.lines(l, o.opts), !c) {
                var d, h = 0, p = (a.lines - 1) * (1 - a.direction) / 2, f = a.fps, m = f / a.speed, g = (1 - a.opacity) / (m * a.trail / 100), v = m / a.lines;
                !function y() {
                    h++;
                    for (var t = 0; t < a.lines; t++)
                        d = Math.max(1 - (h + (a.lines - t) * v) % m * g, a.opacity), o.opacity(l, t * a.direction + p, d, a);
                    o.timeout = o.el && setTimeout(y, ~~(1e3 / f))
                }()
            }
            return o
        },stop: function() {
            var t = this.el;
            return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0), this
        },lines: function(i, o) {
            function r(e, n) {
                return s(t(), {position: "absolute",width: o.length + o.width + "px",height: o.width + "px",background: e,boxShadow: n,transformOrigin: "left",transform: "rotate(" + ~~(360 / o.lines * l + o.rotate) + "deg) translate(" + o.radius + "px,0)",borderRadius: (o.corners * o.width >> 1) + "px"})
            }
            for (var a, l = 0, u = (o.lines - 1) * (1 - o.direction) / 2; l < o.lines; l++)
                a = s(t(), {position: "absolute",top: 1 + ~(o.width / 2) + "px",transform: o.hwaccel ? "translate3d(0,0,0)" : "",opacity: o.opacity,animation: c && n(o.opacity, o.trail, u + l * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"}), o.shadow && e(a, s(r("#000", "0 0 4px #000"), {top: "2px"})), e(i, e(a, r(o.color, "0 0 1px rgba(0,0,0,.1)")));
            return i
        },opacity: function(t, e, n) {
            e < t.childNodes.length && (t.childNodes[e].style.opacity = n)
        }});
    var f = s(t("group"), {behavior: "url(#default#VML)"});
    return !i(f, "transform") && f.adj ? l() : c = i(f, "animation"), a
}), function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["spin"], e) : t.Ladda = e(t.Spinner)
}(this, function(t) {
    "use strict";
    function e(t) {
        if ("undefined" == typeof t)
            return void console.warn("Ladda button target must be defined.");
        t.querySelector(".ladda-label") || (t.innerHTML = '<span class="ladda-label">' + t.innerHTML + "</span>");
        var e = s(t), n = document.createElement("span");
        n.className = "ladda-spinner", t.appendChild(n);
        var i, o = {start: function() {
                return t.setAttribute("disabled", ""), t.setAttribute("data-loading", ""), clearTimeout(i), e.spin(n), this.setProgress(0), this
            },startAfter: function(t) {
                return clearTimeout(i), i = setTimeout(function() {
                    o.start()
                }, t), this
            },stop: function() {
                return t.removeAttribute("disabled"), t.removeAttribute("data-loading"), clearTimeout(i), i = setTimeout(function() {
                    e.stop()
                }, 1e3), this
            },toggle: function() {
                return this.isLoading() ? this.stop() : this.start(), this
            },setProgress: function(e) {
                e = Math.max(Math.min(e, 1), 0);
                var n = t.querySelector(".ladda-progress");
                0 === e && n && n.parentNode ? n.parentNode.removeChild(n) : (n || (n = document.createElement("div"), n.className = "ladda-progress", t.appendChild(n)), n.style.width = (e || 0) * t.offsetWidth + "px")
            },enable: function() {
                return this.stop(), this
            },disable: function() {
                return this.stop(), t.setAttribute("disabled", ""), this
            },isLoading: function() {
                return t.hasAttribute("data-loading")
            }};
        return r.push(o), o
    }
    function n(t, n) {
        n = n || {};
        var i = [];
        "string" == typeof t ? i = o(document.querySelectorAll(t)) : "object" == typeof t && "string" == typeof t.nodeName && (i = [t]);
        for (var s = 0, r = i.length; r > s; s++)
            !function() {
                var t = i[s];
                if ("function" == typeof t.addEventListener) {
                    var o = e(t), r = -1;
                    t.addEventListener("click", function() {
                        o.startAfter(1), "number" == typeof n.timeout && (clearTimeout(r), r = setTimeout(o.stop, n.timeout)), "function" == typeof n.callback && n.callback.apply(null, [o])
                    }, !1)
                }
            }()
    }
    function i() {
        for (var t = 0, e = r.length; e > t; t++)
            r[t].stop()
    }
    function s(e) {
        var n, i = e.offsetHeight;
        i > 32 && (i *= .8), e.hasAttribute("data-spinner-size") && (i = parseInt(e.getAttribute("data-spinner-size"), 10)), e.hasAttribute("data-spinner-color") && (n = e.getAttribute("data-spinner-color"));
        var s = 12, o = .2 * i, r = .6 * o, a = 7 > o ? 2 : 3;
        return new t({color: n || "#fff",lines: s,radius: o,length: r,width: a,zIndex: "initial",top: "auto",left: "auto",className: ""})
    }
    function o(t) {
        for (var e = [], n = 0; n < t.length; n++)
            e.push(t[n]);
        return e
    }
    var r = [];
    return {bind: n,create: e,stopAll: i}
}), function(t, e) {
    function n(t, e, n) {
        return t.addEventListener ? void t.addEventListener(e, n, !1) : void t.attachEvent("on" + e, n)
    }
    function i(t) {
        if ("keypress" == t.type) {
            var e = String.fromCharCode(t.which);
            return t.shiftKey || (e = e.toLowerCase()), e
        }
        return _[t.which] ? _[t.which] : k[t.which] ? k[t.which] : String.fromCharCode(t.which).toLowerCase()
    }
    function s(t, e) {
        return t.sort().join(",") === e.sort().join(",")
    }
    function o(t) {
        t = t || {};
        var e, n = !1;
        for (e in I)
            t[e] ? n = !0 : I[e] = 0;
        n || (R = !1)
    }
    function r(t, e, n, i, o, r) {
        var a, l, c = [], u = n.type;
        if (!x[t])
            return [];
        for ("keyup" == u && p(t) && (e = [t]), a = 0; a < x[t].length; ++a)
            if (l = x[t][a], (i || !l.seq || I[l.seq] == l.level) && u == l.action && ("keypress" == u && !n.metaKey && !n.ctrlKey || s(e, l.modifiers))) {
                var d = !i && l.combo == o, h = i && l.seq == i && l.level == r;
                (d || h) && x[t].splice(a, 1), c.push(l)
            }
        return c
    }
    function a(t) {
        var e = [];
        return t.shiftKey && e.push("shift"), t.altKey && e.push("alt"), t.ctrlKey && e.push("ctrl"), t.metaKey && e.push("meta"), e
    }
    function l(t) {
        return t.preventDefault ? void t.preventDefault() : void (t.returnValue = !1)
    }
    function c(t) {
        return t.stopPropagation ? void t.stopPropagation() : void (t.cancelBubble = !0)
    }
    function u(t, e, n, i) {
        O.stopCallback(e, e.target || e.srcElement, n, i) || t(e, n) === !1 && (l(e), c(e))
    }
    function d(t, e, n) {
        var i, s = r(t, e, n), a = {}, l = 0, c = !1;
        for (i = 0; i < s.length; ++i)
            s[i].seq && (l = Math.max(l, s[i].level));
        for (i = 0; i < s.length; ++i)
            if (s[i].seq) {
                if (s[i].level != l)
                    continue;
                c = !0, a[s[i].seq] = 1, u(s[i].callback, n, s[i].combo, s[i].seq)
            } else
                c || u(s[i].callback, n, s[i].combo);
        var d = "keypress" == n.type && M;
        n.type != R || p(t) || d || o(a), M = c && "keydown" == n.type
    }
    function h(t) {
        "number" != typeof t.which && (t.which = t.keyCode);
        var e = i(t);
        if (e)
            return "keyup" == t.type && D === e ? void (D = !1) : void O.handleKey(e, a(t), t)
    }
    function p(t) {
        return "shift" == t || "ctrl" == t || "alt" == t || "meta" == t
    }
    function f() {
        clearTimeout(w), w = setTimeout(o, 1e3)
    }
    function m() {
        if (!T) {
            T = {};
            for (var t in _)
                t > 95 && 112 > t || _.hasOwnProperty(t) && (T[_[t]] = t)
        }
        return T
    }
    function g(t, e, n) {
        return n || (n = m()[t] ? "keydown" : "keypress"), "keypress" == n && e.length && (n = "keydown"), n
    }
    function v(t, e, n, s) {
        function r(e) {
            return function() {
                R = e, ++I[t], f()
            }
        }
        function a(e) {
            u(n, e, t), "keyup" !== s && (D = i(e)), setTimeout(o, 10)
        }
        I[t] = 0;
        for (var l = 0; l < e.length; ++l) {
            var c = l + 1 === e.length, d = c ? a : r(s || b(e[l + 1]).action);
            S(e[l], d, s, t, l)
        }
    }
    function y(t) {
        return "+" === t ? ["+"] : t.split("+")
    }
    function b(t, e) {
        var n, i, s, o = [];
        for (n = y(t), s = 0; s < n.length; ++s)
            i = n[s], C[i] && (i = C[i]), e && "keypress" != e && L[i] && (i = L[i], o.push("shift")), p(i) && o.push(i);
        return e = g(i, o, e), {key: i,modifiers: o,action: e}
    }
    function S(t, e, n, i, s) {
        A[t + ":" + n] = e, t = t.replace(/\s+/g, " ");
        var o, a = t.split(" ");
        return a.length > 1 ? void v(t, a, e, n) : (o = b(t, n), x[o.key] = x[o.key] || [], r(o.key, o.modifiers, {type: o.action}, i, t, s), void x[o.key][i ? "unshift" : "push"]({callback: e,modifiers: o.modifiers,action: o.action,seq: i,level: s,combo: t}))
    }
    function E(t, e, n) {
        for (var i = 0; i < t.length; ++i)
            S(t[i], e, n)
    }
    for (var T, w, _ = {8: "backspace",9: "tab",13: "enter",16: "shift",17: "ctrl",18: "alt",20: "capslock",27: "esc",32: "space",33: "pageup",34: "pagedown",35: "end",36: "home",37: "left",38: "up",39: "right",40: "down",45: "ins",46: "del",91: "meta",93: "meta",224: "meta"}, k = {106: "*",107: "+",109: "-",110: ".",111: "/",186: ";",187: "=",188: ",",189: "-",190: ".",191: "/",192: "`",219: "[",220: "\\",221: "]",222: "'"}, L = {"~": "`","!": "1","@": "2","#": "3",$: "4","%": "5","^": "6","&": "7","*": "8","(": "9",")": "0",_: "-","+": "=",":": ";",'"': "'","<": ",",">": ".","?": "/","|": "\\"}, C = {option: "alt",command: "meta","return": "enter",escape: "esc",mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"}, x = {}, A = {}, I = {}, D = !1, M = !1, R = !1, N = 1; 20 > N; ++N)
        _[111 + N] = "f" + N;
    for (N = 0; 9 >= N; ++N)
        _[N + 96] = N;
    n(e, "keypress", h), n(e, "keydown", h), n(e, "keyup", h);
    var O = {bind: function(t, e, n) {
            return t = t instanceof Array ? t : [t], E(t, e, n), this
        },unbind: function(t, e) {
            return O.bind(t, function() {
            }, e)
        },trigger: function(t, e) {
            return A[t + ":" + e] && A[t + ":" + e]({}, t), this
        },reset: function() {
            return x = {}, A = {}, this
        },stopCallback: function(t, e) {
            return (" " + e.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == e.tagName || "SELECT" == e.tagName || "TEXTAREA" == e.tagName || e.isContentEditable
        },handleKey: d};
    t.Mousetrap = O, "function" == typeof define && define.amd && define(O)
}(window, document), function(t, e, n, i) {
    "use strict";
    function s(t, e, n) {
        return setTimeout(u(t, n), e)
    }
    function o(t, e, n) {
        return Array.isArray(t) ? (r(t, n[e], n), !0) : !1
    }
    function r(t, e, n) {
        var s;
        if (t)
            if (t.forEach)
                t.forEach(e, n);
            else if (t.length !== i)
                for (s = 0; s < t.length; )
                    e.call(n, t[s], s, t), s++;
            else
                for (s in t)
                    t.hasOwnProperty(s) && e.call(n, t[s], s, t)
    }
    function a(t, e, n) {
        for (var s = Object.keys(e), o = 0; o < s.length; )
            (!n || n && t[s[o]] === i) && (t[s[o]] = e[s[o]]), o++;
        return t
    }
    function l(t, e) {
        return a(t, e, !0)
    }
    function c(t, e, n) {
        var i, s = e.prototype;
        i = t.prototype = Object.create(s), i.constructor = t, i._super = s, n && a(i, n)
    }
    function u(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function d(t, e) {
        return typeof t == ue ? t.apply(e ? e[0] || i : i, e) : t
    }
    function h(t, e) {
        return t === i ? e : t
    }
    function p(t, e, n) {
        r(v(e), function(e) {
            t.addEventListener(e, n, !1)
        })
    }
    function f(t, e, n) {
        r(v(e), function(e) {
            t.removeEventListener(e, n, !1)
        })
    }
    function m(t, e) {
        for (; t; ) {
            if (t == e)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    function g(t, e) {
        return t.indexOf(e) > -1
    }
    function v(t) {
        return t.trim().split(/\s+/g)
    }
    function y(t, e, n) {
        if (t.indexOf && !n)
            return t.indexOf(e);
        for (var i = 0; i < t.length; ) {
            if (n && t[i][n] == e || !n && t[i] === e)
                return i;
            i++
        }
        return -1
    }
    function b(t) {
        return Array.prototype.slice.call(t, 0)
    }
    function S(t, e, n) {
        for (var i = [], s = [], o = 0; o < t.length; ) {
            var r = e ? t[o][e] : t[o];
            y(s, r) < 0 && i.push(t[o]), s[o] = r, o++
        }
        return n && (i = e ? i.sort(function(t, n) {
            return t[e] > n[e]
        }) : i.sort()), i
    }
    function E(t, e) {
        for (var n, s, o = e[0].toUpperCase() + e.slice(1), r = 0; r < le.length; ) {
            if (n = le[r], s = n ? n + o : e, s in t)
                return s;
            r++
        }
        return i
    }
    function T() {
        return fe++
    }
    function w(t) {
        var e = t.ownerDocument;
        return e.defaultView || e.parentWindow
    }
    function _(t, e) {
        var n = this;
        this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
            d(t.options.enable, [t]) && n.handler(e)
        }, this.init()
    }
    function k(t) {
        var e, n = t.options.inputClass;
        return new (e = n ? n : ve ? U : ye ? F : ge ? V : j)(t, L)
    }
    function L(t, e, n) {
        var i = n.pointers.length, s = n.changedPointers.length, o = e & _e && i - s === 0, r = e & (Le | Ce) && i - s === 0;
        n.isFirst = !!o, n.isFinal = !!r, o && (t.session = {}), n.eventType = e, C(t, n), t.emit("hammer.input", n), t.recognize(n), t.session.prevInput = n
    }
    function C(t, e) {
        var n = t.session, i = e.pointers, s = i.length;
        n.firstInput || (n.firstInput = I(e)), s > 1 && !n.firstMultiple ? n.firstMultiple = I(e) : 1 === s && (n.firstMultiple = !1);
        var o = n.firstInput, r = n.firstMultiple, a = r ? r.center : o.center, l = e.center = D(i);
        e.timeStamp = pe(), e.deltaTime = e.timeStamp - o.timeStamp, e.angle = O(a, l), e.distance = N(a, l), x(n, e), e.offsetDirection = R(e.deltaX, e.deltaY), e.scale = r ? $(r.pointers, i) : 1, e.rotation = r ? P(r.pointers, i) : 0, A(n, e);
        var c = t.element;
        m(e.srcEvent.target, c) && (c = e.srcEvent.target), e.target = c
    }
    function x(t, e) {
        var n = e.center, i = t.offsetDelta || {}, s = t.prevDelta || {}, o = t.prevInput || {};
        (e.eventType === _e || o.eventType === Le) && (s = t.prevDelta = {x: o.deltaX || 0,y: o.deltaY || 0}, i = t.offsetDelta = {x: n.x,y: n.y}), e.deltaX = s.x + (n.x - i.x), e.deltaY = s.y + (n.y - i.y)
    }
    function A(t, e) {
        var n, s, o, r, a = t.lastInterval || e, l = e.timeStamp - a.timeStamp;
        if (e.eventType != Ce && (l > we || a.velocity === i)) {
            var c = a.deltaX - e.deltaX, u = a.deltaY - e.deltaY, d = M(l, c, u);
            s = d.x, o = d.y, n = he(d.x) > he(d.y) ? d.x : d.y, r = R(c, u), t.lastInterval = e
        } else
            n = a.velocity, s = a.velocityX, o = a.velocityY, r = a.direction;
        e.velocity = n, e.velocityX = s, e.velocityY = o, e.direction = r
    }
    function I(t) {
        for (var e = [], n = 0; n < t.pointers.length; )
            e[n] = {clientX: de(t.pointers[n].clientX),clientY: de(t.pointers[n].clientY)}, n++;
        return {timeStamp: pe(),pointers: e,center: D(e),deltaX: t.deltaX,deltaY: t.deltaY}
    }
    function D(t) {
        var e = t.length;
        if (1 === e)
            return {x: de(t[0].clientX),y: de(t[0].clientY)};
        for (var n = 0, i = 0, s = 0; e > s; )
            n += t[s].clientX, i += t[s].clientY, s++;
        return {x: de(n / e),y: de(i / e)}
    }
    function M(t, e, n) {
        return {x: e / t || 0,y: n / t || 0}
    }
    function R(t, e) {
        return t === e ? xe : he(t) >= he(e) ? t > 0 ? Ae : Ie : e > 0 ? De : Me
    }
    function N(t, e, n) {
        n || (n = Pe);
        var i = e[n[0]] - t[n[0]], s = e[n[1]] - t[n[1]];
        return Math.sqrt(i * i + s * s)
    }
    function O(t, e, n) {
        n || (n = Pe);
        var i = e[n[0]] - t[n[0]], s = e[n[1]] - t[n[1]];
        return 180 * Math.atan2(s, i) / Math.PI
    }
    function P(t, e) {
        return O(e[1], e[0], $e) - O(t[1], t[0], $e)
    }
    function $(t, e) {
        return N(e[0], e[1], $e) / N(t[0], t[1], $e)
    }
    function j() {
        this.evEl = Ue, this.evWin = He, this.allow = !0, this.pressed = !1, _.apply(this, arguments)
    }
    function U() {
        this.evEl = ze, this.evWin = Ve, _.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    function H() {
        this.evTarget = Ye, this.evWin = Xe, this.started = !1, _.apply(this, arguments)
    }
    function B(t, e) {
        var n = b(t.touches), i = b(t.changedTouches);
        return e & (Le | Ce) && (n = S(n.concat(i), "identifier", !0)), [n, i]
    }
    function F() {
        this.evTarget = Ge, this.targetIds = {}, _.apply(this, arguments)
    }
    function z(t, e) {
        var n = b(t.touches), i = this.targetIds;
        if (e & (_e | ke) && 1 === n.length)
            return i[n[0].identifier] = !0, [n, n];
        var s, o, r = b(t.changedTouches), a = [], l = this.target;
        if (o = n.filter(function(t) {
            return m(t.target, l)
        }), e === _e)
            for (s = 0; s < o.length; )
                i[o[s].identifier] = !0, s++;
        for (s = 0; s < r.length; )
            i[r[s].identifier] && a.push(r[s]), e & (Le | Ce) && delete i[r[s].identifier], s++;
        return a.length ? [S(o.concat(a), "identifier", !0), a] : void 0
    }
    function V() {
        _.apply(this, arguments);
        var t = u(this.handler, this);
        this.touch = new F(this.manager, t), this.mouse = new j(this.manager, t)
    }
    function W(t, e) {
        this.manager = t, this.set(e)
    }
    function Y(t) {
        if (g(t, en))
            return en;
        var e = g(t, nn), n = g(t, sn);
        return e && n ? nn + " " + sn : e || n ? e ? nn : sn : g(t, tn) ? tn : Qe
    }
    function X(t) {
        this.id = T(), this.manager = null, this.options = l(t || {}, this.defaults), this.options.enable = h(this.options.enable, !0), this.state = on, this.simultaneous = {}, this.requireFail = []
    }
    function q(t) {
        return t & un ? "cancel" : t & ln ? "end" : t & an ? "move" : t & rn ? "start" : ""
    }
    function G(t) {
        return t == Me ? "down" : t == De ? "up" : t == Ae ? "left" : t == Ie ? "right" : ""
    }
    function J(t, e) {
        var n = e.manager;
        return n ? n.get(t) : t
    }
    function K() {
        X.apply(this, arguments)
    }
    function Z() {
        K.apply(this, arguments), this.pX = null, this.pY = null
    }
    function Q() {
        K.apply(this, arguments)
    }
    function te() {
        X.apply(this, arguments), this._timer = null, this._input = null
    }
    function ee() {
        K.apply(this, arguments)
    }
    function ne() {
        K.apply(this, arguments)
    }
    function ie() {
        X.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }
    function se(t, e) {
        return e = e || {}, e.recognizers = h(e.recognizers, se.defaults.preset), new oe(t, e)
    }
    function oe(t, e) {
        e = e || {}, this.options = l(e, se.defaults), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = t, this.input = k(this), this.touchAction = new W(this, this.options.touchAction), re(this, !0), r(e.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
    }
    function re(t, e) {
        var n = t.element;
        r(t.options.cssProps, function(t, i) {
            n.style[E(n.style, i)] = e ? t : ""
        })
    }
    function ae(t, n) {
        var i = e.createEvent("Event");
        i.initEvent(t, !0, !0), i.gesture = n, n.target.dispatchEvent(i)
    }
    var le = ["", "webkit", "moz", "MS", "ms", "o"], ce = e.createElement("div"), ue = "function", de = Math.round, he = Math.abs, pe = Date.now, fe = 1, me = /mobile|tablet|ip(ad|hone|od)|android/i, ge = "ontouchstart" in t, ve = E(t, "PointerEvent") !== i, ye = ge && me.test(navigator.userAgent), be = "touch", Se = "pen", Ee = "mouse", Te = "kinect", we = 25, _e = 1, ke = 2, Le = 4, Ce = 8, xe = 1, Ae = 2, Ie = 4, De = 8, Me = 16, Re = Ae | Ie, Ne = De | Me, Oe = Re | Ne, Pe = ["x", "y"], $e = ["clientX", "clientY"];
    _.prototype = {handler: function() {
        },init: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(w(this.element), this.evWin, this.domHandler)
        },destroy: function() {
            this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(w(this.element), this.evWin, this.domHandler)
        }};
    var je = {mousedown: _e,mousemove: ke,mouseup: Le}, Ue = "mousedown", He = "mousemove mouseup";
    c(j, _, {handler: function(t) {
            var e = je[t.type];
            e & _e && 0 === t.button && (this.pressed = !0), e & ke && 1 !== t.which && (e = Le), this.pressed && this.allow && (e & Le && (this.pressed = !1), this.callback(this.manager, e, {pointers: [t],changedPointers: [t],pointerType: Ee,srcEvent: t}))
        }});
    var Be = {pointerdown: _e,pointermove: ke,pointerup: Le,pointercancel: Ce,pointerout: Ce}, Fe = {2: be,3: Se,4: Ee,5: Te}, ze = "pointerdown", Ve = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (ze = "MSPointerDown", Ve = "MSPointerMove MSPointerUp MSPointerCancel"), c(U, _, {handler: function(t) {
            var e = this.store, n = !1, i = t.type.toLowerCase().replace("ms", ""), s = Be[i], o = Fe[t.pointerType] || t.pointerType, r = o == be, a = y(e, t.pointerId, "pointerId");
            s & _e && (0 === t.button || r) ? 0 > a && (e.push(t), a = e.length - 1) : s & (Le | Ce) && (n = !0), 0 > a || (e[a] = t, this.callback(this.manager, s, {pointers: e,changedPointers: [t],pointerType: o,srcEvent: t}), n && e.splice(a, 1))
        }});
    var We = {touchstart: _e,touchmove: ke,touchend: Le,touchcancel: Ce}, Ye = "touchstart", Xe = "touchstart touchmove touchend touchcancel";
    c(H, _, {handler: function(t) {
            var e = We[t.type];
            if (e === _e && (this.started = !0), this.started) {
                var n = B.call(this, t, e);
                e & (Le | Ce) && n[0].length - n[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {pointers: n[0],changedPointers: n[1],pointerType: be,srcEvent: t})
            }
        }});
    var qe = {touchstart: _e,touchmove: ke,touchend: Le,touchcancel: Ce}, Ge = "touchstart touchmove touchend touchcancel";
    c(F, _, {handler: function(t) {
            var e = qe[t.type], n = z.call(this, t, e);
            n && this.callback(this.manager, e, {pointers: n[0],changedPointers: n[1],pointerType: be,srcEvent: t})
        }}), c(V, _, {handler: function(t, e, n) {
            var i = n.pointerType == be, s = n.pointerType == Ee;
            if (i)
                this.mouse.allow = !1;
            else if (s && !this.mouse.allow)
                return;
            e & (Le | Ce) && (this.mouse.allow = !0), this.callback(t, e, n)
        },destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }});
    var Je = E(ce.style, "touchAction"), Ke = Je !== i, Ze = "compute", Qe = "auto", tn = "manipulation", en = "none", nn = "pan-x", sn = "pan-y";
    W.prototype = {set: function(t) {
            t == Ze && (t = this.compute()), Ke && (this.manager.element.style[Je] = t), this.actions = t.toLowerCase().trim()
        },update: function() {
            this.set(this.manager.options.touchAction)
        },compute: function() {
            var t = [];
            return r(this.manager.recognizers, function(e) {
                d(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }), Y(t.join(" "))
        },preventDefaults: function(t) {
            if (!Ke) {
                var e = t.srcEvent, n = t.offsetDirection;
                if (this.manager.session.prevented)
                    return void e.preventDefault();
                var i = this.actions, s = g(i, en), o = g(i, sn), r = g(i, nn);
                return s || o && n & Re || r && n & Ne ? this.preventSrc(e) : void 0
            }
        },preventSrc: function(t) {
            this.manager.session.prevented = !0, t.preventDefault()
        }};
    var on = 1, rn = 2, an = 4, ln = 8, cn = ln, un = 16, dn = 32;
    X.prototype = {defaults: {},set: function(t) {
            return a(this.options, t), this.manager && this.manager.touchAction.update(), this
        },recognizeWith: function(t) {
            if (o(t, "recognizeWith", this))
                return this;
            var e = this.simultaneous;
            return t = J(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
        },dropRecognizeWith: function(t) {
            return o(t, "dropRecognizeWith", this) ? this : (t = J(t, this), delete this.simultaneous[t.id], this)
        },requireFailure: function(t) {
            if (o(t, "requireFailure", this))
                return this;
            var e = this.requireFail;
            return t = J(t, this), -1 === y(e, t) && (e.push(t), t.requireFailure(this)), this
        },dropRequireFailure: function(t) {
            if (o(t, "dropRequireFailure", this))
                return this;
            t = J(t, this);
            var e = y(this.requireFail, t);
            return e > -1 && this.requireFail.splice(e, 1), this
        },hasRequireFailures: function() {
            return this.requireFail.length > 0
        },canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },emit: function(t) {
            function e(e) {
                n.manager.emit(n.options.event + (e ? q(i) : ""), t)
            }
            var n = this, i = this.state;
            ln > i && e(!0), e(), i >= ln && e(!0)
        },tryEmit: function(t) {
            return this.canEmit() ? this.emit(t) : void (this.state = dn)
        },canEmit: function() {
            for (var t = 0; t < this.requireFail.length; ) {
                if (!(this.requireFail[t].state & (dn | on)))
                    return !1;
                t++
            }
            return !0
        },recognize: function(t) {
            var e = a({}, t);
            return d(this.options.enable, [this, e]) ? (this.state & (cn | un | dn) && (this.state = on), this.state = this.process(e), void (this.state & (rn | an | ln | un) && this.tryEmit(e))) : (this.reset(), void (this.state = dn))
        },process: function() {
        },getTouchAction: function() {
        },reset: function() {
        }}, c(K, X, {defaults: {pointers: 1},attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },process: function(t) {
            var e = this.state, n = t.eventType, i = e & (rn | an), s = this.attrTest(t);
            return i && (n & Ce || !s) ? e | un : i || s ? n & Le ? e | ln : e & rn ? e | an : rn : dn
        }}), c(Z, K, {defaults: {event: "pan",threshold: 10,pointers: 1,direction: Oe},getTouchAction: function() {
            var t = this.options.direction, e = [];
            return t & Re && e.push(sn), t & Ne && e.push(nn), e
        },directionTest: function(t) {
            var e = this.options, n = !0, i = t.distance, s = t.direction, o = t.deltaX, r = t.deltaY;
            return s & e.direction || (e.direction & Re ? (s = 0 === o ? xe : 0 > o ? Ae : Ie, n = o != this.pX, i = Math.abs(t.deltaX)) : (s = 0 === r ? xe : 0 > r ? De : Me, n = r != this.pY, i = Math.abs(t.deltaY))), t.direction = s, n && i > e.threshold && s & e.direction
        },attrTest: function(t) {
            return K.prototype.attrTest.call(this, t) && (this.state & rn || !(this.state & rn) && this.directionTest(t))
        },emit: function(t) {
            this.pX = t.deltaX, this.pY = t.deltaY;
            var e = G(t.direction);
            e && this.manager.emit(this.options.event + e, t), this._super.emit.call(this, t)
        }}), c(Q, K, {defaults: {event: "pinch",threshold: 0,pointers: 2},getTouchAction: function() {
            return [en]
        },attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & rn)
        },emit: function(t) {
            if (this._super.emit.call(this, t), 1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + e, t)
            }
        }}), c(te, X, {defaults: {event: "press",pointers: 1,time: 500,threshold: 5},getTouchAction: function() {
            return [Qe]
        },process: function(t) {
            var e = this.options, n = t.pointers.length === e.pointers, i = t.distance < e.threshold, o = t.deltaTime > e.time;
            if (this._input = t, !i || !n || t.eventType & (Le | Ce) && !o)
                this.reset();
            else if (t.eventType & _e)
                this.reset(), this._timer = s(function() {
                    this.state = cn, this.tryEmit()
                }, e.time, this);
            else if (t.eventType & Le)
                return cn;
            return dn
        },reset: function() {
            clearTimeout(this._timer)
        },emit: function(t) {
            this.state === cn && (t && t.eventType & Le ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = pe(), this.manager.emit(this.options.event, this._input)))
        }}), c(ee, K, {defaults: {event: "rotate",threshold: 0,pointers: 2},getTouchAction: function() {
            return [en]
        },attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & rn)
        }}), c(ne, K, {defaults: {event: "swipe",threshold: 10,velocity: .65,direction: Re | Ne,pointers: 1},getTouchAction: function() {
            return Z.prototype.getTouchAction.call(this)
        },attrTest: function(t) {
            var e, n = this.options.direction;
            return n & (Re | Ne) ? e = t.velocity : n & Re ? e = t.velocityX : n & Ne && (e = t.velocityY), this._super.attrTest.call(this, t) && n & t.direction && t.distance > this.options.threshold && he(e) > this.options.velocity && t.eventType & Le
        },emit: function(t) {
            var e = G(t.direction);
            e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }}), c(ie, X, {defaults: {event: "tap",pointers: 1,taps: 1,interval: 300,time: 250,threshold: 2,posThreshold: 10},getTouchAction: function() {
            return [tn]
        },process: function(t) {
            var e = this.options, n = t.pointers.length === e.pointers, i = t.distance < e.threshold, o = t.deltaTime < e.time;
            if (this.reset(), t.eventType & _e && 0 === this.count)
                return this.failTimeout();
            if (i && o && n) {
                if (t.eventType != Le)
                    return this.failTimeout();
                var r = this.pTime ? t.timeStamp - this.pTime < e.interval : !0, a = !this.pCenter || N(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp, this.pCenter = t.center, a && r ? this.count += 1 : this.count = 1, this._input = t;
                var l = this.count % e.taps;
                if (0 === l)
                    return this.hasRequireFailures() ? (this._timer = s(function() {
                        this.state = cn, this.tryEmit()
                    }, e.interval, this), rn) : cn
            }
            return dn
        },failTimeout: function() {
            return this._timer = s(function() {
                this.state = dn
            }, this.options.interval, this), dn
        },reset: function() {
            clearTimeout(this._timer)
        },emit: function() {
            this.state == cn && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }}), se.VERSION = "2.0.4", se.defaults = {domEvents: !1,touchAction: Ze,enable: !0,inputTarget: null,inputClass: null,preset: [[ee, {enable: !1}], [Q, {enable: !1}, ["rotate"]], [ne, {direction: Re}], [Z, {direction: Re}, ["swipe"]], [ie], [ie, {event: "doubletap",taps: 2}, ["tap"]], [te]],cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",contentZooming: "none",userDrag: "none",tapHighlightColor: "rgba(0,0,0,0)"}};
    var hn = 1, pn = 2;
    oe.prototype = {set: function(t) {
            return a(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },stop: function(t) {
            this.session.stopped = t ? pn : hn
        },recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var n, i = this.recognizers, s = e.curRecognizer;
                (!s || s && s.state & cn) && (s = e.curRecognizer = null);
                for (var o = 0; o < i.length; )
                    n = i[o], e.stopped === pn || s && n != s && !n.canRecognizeWith(s) ? n.reset() : n.recognize(t), !s && n.state & (rn | an | ln) && (s = e.curRecognizer = n), o++
            }
        },get: function(t) {
            if (t instanceof X)
                return t;
            for (var e = this.recognizers, n = 0; n < e.length; n++)
                if (e[n].options.event == t)
                    return e[n];
            return null
        },add: function(t) {
            if (o(t, "add", this))
                return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
        },remove: function(t) {
            if (o(t, "remove", this))
                return this;
            var e = this.recognizers;
            return t = this.get(t), e.splice(y(e, t), 1), this.touchAction.update(), this
        },on: function(t, e) {
            var n = this.handlers;
            return r(v(t), function(t) {
                n[t] = n[t] || [], n[t].push(e)
            }), this
        },off: function(t, e) {
            var n = this.handlers;
            return r(v(t), function(t) {
                e ? n[t].splice(y(n[t], e), 1) : delete n[t]
            }), this
        },emit: function(t, e) {
            this.options.domEvents && ae(t, e);
            var n = this.handlers[t] && this.handlers[t].slice();
            if (n && n.length) {
                e.type = t, e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                };
                for (var i = 0; i < n.length; )
                    n[i](e), i++
            }
        },destroy: function() {
            this.element && re(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }}, a(se, {INPUT_START: _e,INPUT_MOVE: ke,INPUT_END: Le,INPUT_CANCEL: Ce,STATE_POSSIBLE: on,STATE_BEGAN: rn,STATE_CHANGED: an,STATE_ENDED: ln,STATE_RECOGNIZED: cn,STATE_CANCELLED: un,STATE_FAILED: dn,DIRECTION_NONE: xe,DIRECTION_LEFT: Ae,DIRECTION_RIGHT: Ie,DIRECTION_UP: De,DIRECTION_DOWN: Me,DIRECTION_HORIZONTAL: Re,DIRECTION_VERTICAL: Ne,DIRECTION_ALL: Oe,Manager: oe,Input: _,TouchAction: W,TouchInput: F,MouseInput: j,PointerEventInput: U,TouchMouseInput: V,SingleTouchInput: H,Recognizer: X,AttrRecognizer: K,Tap: ie,Pan: Z,Swipe: ne,Pinch: Q,Rotate: ee,Press: te,on: p,off: f,each: r,merge: l,extend: a,inherit: c,bindFn: u,prefixed: E}), typeof define == ue && define.amd ? define(function() {
        return se
    }) : "undefined" != typeof module && module.exports ? module.exports = se : t[n] = se
}(window, document, "Hammer");
var io = "undefined" == typeof module ? {} : module.exports;
!function() {
    if (function(t, e) {
        var n = t;
        n.version = "0.9.16", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function(t, i) {
            var s, o, r = n.util.parseUri(t);
            e && e.location && (r.protocol = r.protocol || e.location.protocol.slice(0, -1), r.host = r.host || (e.document ? e.document.domain : e.location.hostname), r.port = r.port || e.location.port), s = n.util.uniqueUri(r);
            var a = {host: r.host,secure: "https" == r.protocol,port: r.port || ("https" == r.protocol ? 443 : 80),query: r.query || ""};
            return n.util.merge(a, i), (a["force new connection"] || !n.sockets[s]) && (o = new n.Socket(a)), !a["force new connection"] && o && (n.sockets[s] = o), o = o || n.sockets[s], o.of(r.path.length > 1 ? r.path : "")
        }
    }("object" == typeof module ? module.exports : this.io = {}, this), function(t, e) {
        var n = t.util = {}, i = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, s = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        n.parseUri = function(t) {
            for (var e = i.exec(t || ""), n = {}, o = 14; o--; )
                n[s[o]] = e[o] || "";
            return n
        }, n.uniqueUri = function(t) {
            var n = t.protocol, i = t.host, s = t.port;
            return "document" in e ? (i = i || document.domain, s = s || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (i = i || "localhost", !s && "https" == n && (s = 443)), (n || "http") + "://" + i + ":" + (s || 80)
        }, n.query = function(t, e) {
            var i = n.chunkQuery(t || ""), s = [];
            n.merge(i, n.chunkQuery(e || ""));
            for (var o in i)
                i.hasOwnProperty(o) && s.push(o + "=" + i[o]);
            return s.length ? "?" + s.join("&") : ""
        }, n.chunkQuery = function(t) {
            for (var e, n = {}, i = t.split("&"), s = 0, o = i.length; o > s; ++s)
                e = i[s].split("="), e[0] && (n[e[0]] = e[1]);
            return n
        };
        var o = !1;
        n.load = function(t) {
            return "document" in e && "complete" === document.readyState || o ? t() : void n.on(e, "load", t, !1)
        }, n.on = function(t, e, n, i) {
            t.attachEvent ? t.attachEvent("on" + e, n) : t.addEventListener && t.addEventListener(e, n, i)
        }, n.request = function(t) {
            if (t && "undefined" != typeof XDomainRequest && !n.ua.hasCORS)
                return new XDomainRequest;
            if ("undefined" != typeof XMLHttpRequest && (!t || n.ua.hasCORS))
                return new XMLHttpRequest;
            if (!t)
                try {
                    return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (e) {
                }
            return null
        }, "undefined" != typeof window && n.load(function() {
            o = !0
        }), n.defer = function(t) {
            return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function() {
                setTimeout(t, 100)
            }) : t()
        }, n.merge = function(t, e, i, s) {
            var o, r = s || [], a = "undefined" == typeof i ? 2 : i;
            for (o in e)
                e.hasOwnProperty(o) && n.indexOf(r, o) < 0 && ("object" == typeof t[o] && a ? n.merge(t[o], e[o], a - 1, r) : (t[o] = e[o], r.push(e[o])));
            return t
        }, n.mixin = function(t, e) {
            n.merge(t.prototype, e.prototype)
        }, n.inherit = function(t, e) {
            function n() {
            }
            n.prototype = e.prototype, t.prototype = new n
        }, n.isArray = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }, n.intersect = function(t, e) {
            for (var i = [], s = t.length > e.length ? t : e, o = t.length > e.length ? e : t, r = 0, a = o.length; a > r; r++)
                ~n.indexOf(s, o[r]) && i.push(o[r]);
            return i
        }, n.indexOf = function(t, e, n) {
            for (var i = t.length, n = 0 > n ? 0 > n + i ? 0 : n + i : n || 0; i > n && t[n] !== e; n++)
                ;
            return n >= i ? -1 : n
        }, n.toArray = function(t) {
            for (var e = [], n = 0, i = t.length; i > n; n++)
                e.push(t[n]);
            return e
        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
            try {
                var t = new XMLHttpRequest
            } catch (e) {
                return !1
            }
            return void 0 != t.withCredentials
        }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
    }("undefined" != typeof io ? io : module.exports, this), function(t, e) {
        function n() {
        }
        t.EventEmitter = n, n.prototype.on = function(t, n) {
            return this.$events || (this.$events = {}), this.$events[t] ? e.util.isArray(this.$events[t]) ? this.$events[t].push(n) : this.$events[t] = [this.$events[t], n] : this.$events[t] = n, this
        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function(t, e) {
            function n() {
                i.removeListener(t, n), e.apply(this, arguments)
            }
            var i = this;
            return n.listener = e, this.on(t, n), this
        }, n.prototype.removeListener = function(t, n) {
            if (this.$events && this.$events[t]) {
                var i = this.$events[t];
                if (e.util.isArray(i)) {
                    for (var s = -1, o = 0, r = i.length; r > o; o++)
                        if (i[o] === n || i[o].listener && i[o].listener === n) {
                            s = o;
                            break
                        }
                    if (0 > s)
                        return this;
                    i.splice(s, 1), i.length || delete this.$events[t]
                } else
                    (i === n || i.listener && i.listener === n) && delete this.$events[t]
            }
            return this
        }, n.prototype.removeAllListeners = function(t) {
            return void 0 === t ? (this.$events = {}, this) : (this.$events && this.$events[t] && (this.$events[t] = null), this)
        }, n.prototype.listeners = function(t) {
            return this.$events || (this.$events = {}), this.$events[t] || (this.$events[t] = []), e.util.isArray(this.$events[t]) || (this.$events[t] = [this.$events[t]]), this.$events[t]
        }, n.prototype.emit = function(t) {
            if (!this.$events)
                return !1;
            var n = this.$events[t];
            if (!n)
                return !1;
            var i = Array.prototype.slice.call(arguments, 1);
            if ("function" == typeof n)
                n.apply(this, i);
            else {
                if (!e.util.isArray(n))
                    return !1;
                for (var s = n.slice(), o = 0, r = s.length; r > o; o++)
                    s[o].apply(this, i)
            }
            return !0
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(exports, nativeJSON) {
        function f(t) {
            return 10 > t ? "0" + t : t
        }
        function date(t) {
            return isFinite(t.valueOf()) ? t.getUTCFullYear() + "-" + f(t.getUTCMonth() + 1) + "-" + f(t.getUTCDate()) + "T" + f(t.getUTCHours()) + ":" + f(t.getUTCMinutes()) + ":" + f(t.getUTCSeconds()) + "Z" : null
        }
        function quote(t) {
            return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
                var e = meta[t];
                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + t + '"'
        }
        function str(t, e) {
            var n, i, s, o, r, a = gap, l = e[t];
            switch (l instanceof Date && (l = date(t)), "function" == typeof rep && (l = rep.call(e, t, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l)
                        return "null";
                    if (gap += indent, r = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (o = l.length, n = 0; o > n; n += 1)
                            r[n] = str(n, l) || "null";
                        return s = 0 === r.length ? "[]" : gap ? "[\n" + gap + r.join(",\n" + gap) + "\n" + a + "]" : "[" + r.join(",") + "]", gap = a, s
                    }
                    if (rep && "object" == typeof rep)
                        for (o = rep.length, n = 0; o > n; n += 1)
                            "string" == typeof rep[n] && (i = rep[n], s = str(i, l), s && r.push(quote(i) + (gap ? ": " : ":") + s));
                    else
                        for (i in l)
                            Object.prototype.hasOwnProperty.call(l, i) && (s = str(i, l), s && r.push(quote(i) + (gap ? ": " : ":") + s));
                    return s = 0 === r.length ? "{}" : gap ? "{\n" + gap + r.join(",\n" + gap) + "\n" + a + "}" : "{" + r.join(",") + "}", gap = a, s
            }
        }
        if (nativeJSON && nativeJSON.parse)
            return exports.JSON = {parse: nativeJSON.parse,stringify: nativeJSON.stringify};
        var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b","	": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, rep;
        JSON.stringify = function(t, e, n) {
            var i;
            if (gap = "", indent = "", "number" == typeof n)
                for (i = 0; n > i; i += 1)
                    indent += " ";
            else
                "string" == typeof n && (indent = n);
            if (rep = e, !e || "function" == typeof e || "object" == typeof e && "number" == typeof e.length)
                return str("", {"": t});
            throw new Error("JSON.stringify")
        }, JSON.parse = function(text, reviver) {
            function walk(t, e) {
                var n, i, s = t[e];
                if (s && "object" == typeof s)
                    for (n in s)
                        Object.prototype.hasOwnProperty.call(s, n) && (i = walk(s, n), void 0 !== i ? s[n] = i : delete s[n]);
                return reviver.call(t, e, s)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function(t, e) {
        var n = t.parser = {}, i = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"], s = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"], o = n.advice = ["reconnect"], r = e.JSON, a = e.util.indexOf;
        n.encodePacket = function(t) {
            var e = a(i, t.type), n = t.id || "", l = t.endpoint || "", c = t.ack, u = null;
            switch (t.type) {
                case "error":
                    var d = t.reason ? a(s, t.reason) : "", h = t.advice ? a(o, t.advice) : "";
                    ("" !== d || "" !== h) && (u = d + ("" !== h ? "+" + h : ""));
                    break;
                case "message":
                    "" !== t.data && (u = t.data);
                    break;
                case "event":
                    var p = {name: t.name};
                    t.args && t.args.length && (p.args = t.args), u = r.stringify(p);
                    break;
                case "json":
                    u = r.stringify(t.data);
                    break;
                case "connect":
                    t.qs && (u = t.qs);
                    break;
                case "ack":
                    u = t.ackId + (t.args && t.args.length ? "+" + r.stringify(t.args) : "")
            }
            var f = [e, n + ("data" == c ? "+" : ""), l];
            return null !== u && void 0 !== u && f.push(u), f.join(":")
        }, n.encodePayload = function(t) {
            var e = "";
            if (1 == t.length)
                return t[0];
            for (var n = 0, i = t.length; i > n; n++) {
                var s = t[n];
                e += "\ufffd" + s.length + "\ufffd" + t[n]
            }
            return e
        };
        var l = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
        n.decodePacket = function(t) {
            var e = t.match(l);
            if (!e)
                return {};
            var n = e[2] || "", t = e[5] || "", a = {type: i[e[1]],endpoint: e[4] || ""};
            switch (n && (a.id = n, a.ack = e[3] ? "data" : !0), a.type) {
                case "error":
                    var e = t.split("+");
                    a.reason = s[e[0]] || "", a.advice = o[e[1]] || "";
                    break;
                case "message":
                    a.data = t || "";
                    break;
                case "event":
                    try {
                        var c = r.parse(t);
                        a.name = c.name, a.args = c.args
                    } catch (u) {
                    }
                    a.args = a.args || [];
                    break;
                case "json":
                    try {
                        a.data = r.parse(t)
                    } catch (u) {
                    }
                    break;
                case "connect":
                    a.qs = t || "";
                    break;
                case "ack":
                    var e = t.match(/^([0-9]+)(\+)?(.*)/);
                    if (e && (a.ackId = e[1], a.args = [], e[3]))
                        try {
                            a.args = e[3] ? r.parse(e[3]) : []
                        } catch (u) {
                        }
                    break;
                case "disconnect":
                case "heartbeat":
            }
            return a
        }, n.decodePayload = function(t) {
            if ("\ufffd" == t.charAt(0)) {
                for (var e = [], i = 1, s = ""; i < t.length; i++)
                    "\ufffd" == t.charAt(i) ? (e.push(n.decodePacket(t.substr(i + 1).substr(0, s))), i += Number(s) + 1, s = "") : s += t.charAt(i);
                return e
            }
            return [n.decodePacket(t)]
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(t, e) {
        function n(t, e) {
            this.socket = t, this.sessid = e
        }
        t.Transport = n, e.util.mixin(n, e.EventEmitter), n.prototype.heartbeats = function() {
            return !0
        }, n.prototype.onData = function(t) {
            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== t) {
                var n = e.parser.decodePayload(t);
                if (n && n.length)
                    for (var i = 0, s = n.length; s > i; i++)
                        this.onPacket(n[i])
            }
            return this
        }, n.prototype.onPacket = function(t) {
            return this.socket.setHeartbeatTimeout(), "heartbeat" == t.type ? this.onHeartbeat() : ("connect" == t.type && "" == t.endpoint && this.onConnect(), "error" == t.type && "reconnect" == t.advice && (this.isOpen = !1), this.socket.onPacket(t), this)
        }, n.prototype.setCloseTimeout = function() {
            if (!this.closeTimeout) {
                var t = this;
                this.closeTimeout = setTimeout(function() {
                    t.onDisconnect()
                }, this.socket.closeTimeout)
            }
        }, n.prototype.onDisconnect = function() {
            return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
        }, n.prototype.onConnect = function() {
            return this.socket.onConnect(), this
        }, n.prototype.clearCloseTimeout = function() {
            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
        }, n.prototype.clearTimeouts = function() {
            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
        }, n.prototype.packet = function(t) {
            this.send(e.parser.encodePacket(t))
        }, n.prototype.onHeartbeat = function() {
            this.packet({type: "heartbeat"})
        }, n.prototype.onOpen = function() {
            this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
        }, n.prototype.onClose = function() {
            this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
        }, n.prototype.prepareUrl = function() {
            var t = this.socket.options;
            return this.scheme() + "://" + t.host + ":" + t.port + "/" + t.resource + "/" + e.protocol + "/" + this.name + "/" + this.sessid
        }, n.prototype.ready = function(t, e) {
            e.call(this)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(t, e, n) {
        function i(t) {
            if (this.options = {port: 80,secure: !1,document: "document" in n ? document : !1,resource: "socket.io",transports: e.transports,"connect timeout": 1e4,"try multiple transports": !0,reconnect: !0,"reconnection delay": 500,"reconnection limit": 1 / 0,"reopen delay": 3e3,"max reconnection attempts": 10,"sync disconnect on unload": !1,"auto connect": !0,"flash policy port": 10843,manualFlush: !1}, e.util.merge(this.options, t), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || e.util.ua.hasCORS)) {
                var i = this;
                e.util.on(n, "beforeunload", function() {
                    i.disconnectSync()
                }, !1)
            }
            this.options["auto connect"] && this.connect()
        }
        function s() {
        }
        t.Socket = i, e.util.mixin(i, e.EventEmitter), i.prototype.of = function(t) {
            return this.namespaces[t] || (this.namespaces[t] = new e.SocketNamespace(this, t), "" !== t && this.namespaces[t].packet({type: "connect"})), this.namespaces[t]
        }, i.prototype.publish = function() {
            this.emit.apply(this, arguments);
            var t;
            for (var e in this.namespaces)
                this.namespaces.hasOwnProperty(e) && (t = this.of(e), t.$emit.apply(t, arguments))
        }, i.prototype.handshake = function(t) {
            function n(e) {
                e instanceof Error ? (i.connecting = !1, i.onError(e.message)) : t.apply(null, e.split(":"))
            }
            var i = this, o = this.options, r = ["http" + (o.secure ? "s" : "") + ":/", o.host + ":" + o.port, o.resource, e.protocol, e.util.query(this.options.query, "t=" + +new Date)].join("/");
            if (this.isXDomain() && !e.util.ua.hasCORS) {
                var a = document.getElementsByTagName("script")[0], l = document.createElement("script");
                l.src = r + "&jsonp=" + e.j.length, a.parentNode.insertBefore(l, a), e.j.push(function(t) {
                    n(t), l.parentNode.removeChild(l)
                })
            } else {
                var c = e.util.request();
                c.open("GET", r, !0), this.isXDomain() && (c.withCredentials = !0), c.onreadystatechange = function() {
                    4 == c.readyState && (c.onreadystatechange = s, 200 == c.status ? n(c.responseText) : 403 == c.status ? i.onError(c.responseText) : (i.connecting = !1, !i.reconnecting && i.onError(c.responseText)))
                }, c.send(null)
            }
        }, i.prototype.getTransport = function(t) {
            for (var n, i = t || this.transports, s = 0; n = i[s]; s++)
                if (e.Transport[n] && e.Transport[n].check(this) && (!this.isXDomain() || e.Transport[n].xdomainCheck(this)))
                    return new e.Transport[n](this, this.sessionid);
            return null
        }, i.prototype.connect = function(t) {
            if (this.connecting)
                return this;
            var n = this;
            return n.connecting = !0, this.handshake(function(i, s, o, r) {
                function a(t) {
                    return n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(t), n.transport ? void n.transport.ready(n, function() {
                        n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
                            if (!n.connected && (n.connecting = !1, n.options["try multiple transports"])) {
                                for (var t = n.transports; t.length > 0 && t.splice(0, 1)[0] != n.transport.name; )
                                    ;
                                t.length ? a(t) : n.publish("connect_failed")
                            }
                        }, n.options["connect timeout"]))
                    }) : n.publish("connect_failed")
                }
                n.sessionid = i, n.closeTimeout = 1e3 * o, n.heartbeatTimeout = 1e3 * s, n.transports || (n.transports = n.origTransports = r ? e.util.intersect(r.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), a(n.transports), n.once("connect", function() {
                    clearTimeout(n.connectTimeoutTimer), t && "function" == typeof t && t()
                })
            }), this
        }, i.prototype.setHeartbeatTimeout = function() {
            if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                var t = this;
                this.heartbeatTimeoutTimer = setTimeout(function() {
                    t.transport.onClose()
                }, this.heartbeatTimeout)
            }
        }, i.prototype.packet = function(t) {
            return this.connected && !this.doBuffer ? this.transport.packet(t) : this.buffer.push(t), this
        }, i.prototype.setBuffer = function(t) {
            this.doBuffer = t, !t && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
        }, i.prototype.flushBuffer = function() {
            this.transport.payload(this.buffer), this.buffer = []
        }, i.prototype.disconnect = function() {
            return (this.connected || this.connecting) && (this.open && this.of("").packet({type: "disconnect"}), this.onDisconnect("booted")), this
        }, i.prototype.disconnectSync = function() {
            var t = e.util.request(), n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, e.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
            t.open("GET", n, !1), t.send(null), this.onDisconnect("booted")
        }, i.prototype.isXDomain = function() {
            var t = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
            return this.options.host !== n.location.hostname || this.options.port != t
        }, i.prototype.onConnect = function() {
            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
        }, i.prototype.onOpen = function() {
            this.open = !0
        }, i.prototype.onClose = function() {
            this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
        }, i.prototype.onPacket = function(t) {
            this.of(t.endpoint).onPacket(t)
        }, i.prototype.onError = function(t) {
            t && t.advice && "reconnect" === t.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", t && t.reason ? t.reason : t)
        }, i.prototype.onDisconnect = function(t) {
            var e = this.connected, n = this.connecting;
            this.connected = !1, this.connecting = !1, this.open = !1, (e || n) && (this.transport.close(), this.transport.clearTimeouts(), e && (this.publish("disconnect", t), "booted" != t && this.options.reconnect && !this.reconnecting && this.reconnect()))
        }, i.prototype.reconnect = function() {
            function t() {
                if (n.connected) {
                    for (var t in n.namespaces)
                        n.namespaces.hasOwnProperty(t) && "" !== t && n.namespaces[t].packet({type: "connect"});
                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                }
                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", e), n.removeListener("connect", e), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = s
            }
            function e() {
                return n.reconnecting ? n.connected ? t() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(e, 1e3) : void (n.reconnectionAttempts++ >= i ? n.redoTransports ? (n.publish("reconnect_failed"), t()) : (n.on("connect_failed", e), n.options["try multiple transports"] = !0, n.transports = n.origTransports, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < o && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(e, n.reconnectionDelay))) : void 0
            }
            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
            var n = this, i = this.options["max reconnection attempts"], s = this.options["try multiple transports"], o = this.options["reconnection limit"];
            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(e, this.reconnectionDelay), this.on("connect", e)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(t, e) {
        function n(t, e) {
            this.socket = t, this.name = e || "", this.flags = {}, this.json = new i(this, "json"), this.ackPackets = 0, this.acks = {}
        }
        function i(t, e) {
            this.namespace = t, this.name = e
        }
        t.SocketNamespace = n, e.util.mixin(n, e.EventEmitter), n.prototype.$emit = e.EventEmitter.prototype.emit, n.prototype.of = function() {
            return this.socket.of.apply(this.socket, arguments)
        }, n.prototype.packet = function(t) {
            return t.endpoint = this.name, this.socket.packet(t), this.flags = {}, this
        }, n.prototype.send = function(t, e) {
            var n = {type: this.flags.json ? "json" : "message",data: t};
            return "function" == typeof e && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = e), this.packet(n)
        }, n.prototype.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1), n = e[e.length - 1], i = {type: "event",name: t};
            return "function" == typeof n && (i.id = ++this.ackPackets, i.ack = "data", this.acks[i.id] = n, e = e.slice(0, e.length - 1)), i.args = e, this.packet(i)
        }, n.prototype.disconnect = function() {
            return "" === this.name ? this.socket.disconnect() : (this.packet({type: "disconnect"}), this.$emit("disconnect")), this
        }, n.prototype.onPacket = function(t) {
            function n() {
                i.packet({type: "ack",args: e.util.toArray(arguments),ackId: t.id})
            }
            var i = this;
            switch (t.type) {
                case "connect":
                    this.$emit("connect");
                    break;
                case "disconnect":
                    "" === this.name ? this.socket.onDisconnect(t.reason || "booted") : this.$emit("disconnect", t.reason);
                    break;
                case "message":
                case "json":
                    var s = ["message", t.data];
                    "data" == t.ack ? s.push(n) : t.ack && this.packet({type: "ack",ackId: t.id}), this.$emit.apply(this, s);
                    break;
                case "event":
                    var s = [t.name].concat(t.args);
                    "data" == t.ack && s.push(n), this.$emit.apply(this, s);
                    break;
                case "ack":
                    this.acks[t.ackId] && (this.acks[t.ackId].apply(this, t.args), delete this.acks[t.ackId]);
                    break;
                case "error":
                    t.advice ? this.socket.onError(t) : "unauthorized" == t.reason ? this.$emit("connect_failed", t.reason) : this.$emit("error", t.reason)
            }
        }, i.prototype.send = function() {
            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
        }, i.prototype.emit = function() {
            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(t, e, n) {
        function i() {
            e.Transport.apply(this, arguments)
        }
        t.websocket = i, e.util.inherit(i, e.Transport), i.prototype.name = "websocket", i.prototype.open = function() {
            var t, i = e.util.query(this.socket.options.query), s = this;
            return t || (t = n.MozWebSocket || n.WebSocket), this.websocket = new t(this.prepareUrl() + i), this.websocket.onopen = function() {
                s.onOpen(), s.socket.setBuffer(!1)
            }, this.websocket.onmessage = function(t) {
                s.onData(t.data)
            }, this.websocket.onclose = function() {
                s.onClose(), s.socket.setBuffer(!0)
            }, this.websocket.onerror = function(t) {
                s.onError(t)
            }, this
        }, i.prototype.send = e.util.ua.iDevice ? function(t) {
            var e = this;
            return setTimeout(function() {
                e.websocket.send(t)
            }, 0), this
        } : function(t) {
            return this.websocket.send(t), this
        }, i.prototype.payload = function(t) {
            for (var e = 0, n = t.length; n > e; e++)
                this.packet(t[e]);
            return this
        }, i.prototype.close = function() {
            return this.websocket.close(), this
        }, i.prototype.onError = function(t) {
            this.socket.onError(t)
        }, i.prototype.scheme = function() {
            return this.socket.options.secure ? "wss" : "ws"
        }, i.check = function() {
            return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
        }, i.xdomainCheck = function() {
            return !0
        }, e.transports.push("websocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(t, e) {
        function n() {
            e.Transport.websocket.apply(this, arguments)
        }
        t.flashsocket = n, e.util.inherit(n, e.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
            var t = this, n = arguments;
            return WebSocket.__addTask(function() {
                e.Transport.websocket.prototype.open.apply(t, n)
            }), this
        }, n.prototype.send = function() {
            var t = this, n = arguments;
            return WebSocket.__addTask(function() {
                e.Transport.websocket.prototype.send.apply(t, n)
            }), this
        }, n.prototype.close = function() {
            return WebSocket.__tasks.length = 0, e.Transport.websocket.prototype.close.call(this), this
        }, n.prototype.ready = function(t, i) {
            function s() {
                var e = t.options, s = e["flash policy port"], r = ["http" + (e.secure ? "s" : "") + ":/", e.host + ":" + e.port, e.resource, "static/flashsocket", "WebSocketMain" + (t.isXDomain() ? "Insecure" : "") + ".swf"];
                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = r.join("/")), 843 !== s && WebSocket.loadFlashPolicyFile("xmlsocket://" + e.host + ":" + s), WebSocket.__initialize(), n.loaded = !0), i.call(o)
            }
            var o = this;
            return document.body ? s() : void e.util.load(s)
        }, n.check = function() {
            return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
        }, n.xdomainCheck = function() {
            return !0
        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), e.transports.push("flashsocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window)
        var swfobject = function() {
            function t() {
                if (!z) {
                    try {
                        var t = P.getElementsByTagName("body")[0].appendChild(g("span"));
                        t.parentNode.removeChild(t)
                    } catch (e) {
                        return
                    }
                    z = !0;
                    for (var n = U.length, i = 0; n > i; i++)
                        U[i]()
                }
            }
            function e(t) {
                z ? t() : U[U.length] = t
            }
            function n(t) {
                if (typeof O.addEventListener != x)
                    O.addEventListener("load", t, !1);
                else if (typeof P.addEventListener != x)
                    P.addEventListener("load", t, !1);
                else if (typeof O.attachEvent != x)
                    v(O, "onload", t);
                else if ("function" == typeof O.onload) {
                    var e = O.onload;
                    O.onload = function() {
                        e(), t()
                    }
                } else
                    O.onload = t
            }
            function i() {
                j ? s() : o()
            }
            function s() {
                var t = P.getElementsByTagName("body")[0], e = g(A);
                e.setAttribute("type", M);
                var n = t.appendChild(e);
                if (n) {
                    var i = 0;
                    !function() {
                        if (typeof n.GetVariable != x) {
                            var s = n.GetVariable("$version");
                            s && (s = s.split(" ")[1].split(","), Y.pv = [parseInt(s[0], 10), parseInt(s[1], 10), parseInt(s[2], 10)])
                        } else if (10 > i)
                            return i++, void setTimeout(arguments.callee, 10);
                        t.removeChild(e), n = null, o()
                    }()
                } else
                    o()
            }
            function o() {
                var t = H.length;
                if (t > 0)
                    for (var e = 0; t > e; e++) {
                        var n = H[e].id, i = H[e].callbackFn, s = {success: !1,id: n};
                        if (Y.pv[0] > 0) {
                            var o = m(n);
                            if (o)
                                if (!y(H[e].swfVersion) || Y.wk && Y.wk < 312)
                                    if (H[e].expressInstall && a()) {
                                        var u = {};
                                        u.data = H[e].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
                                        for (var d = {}, h = o.getElementsByTagName("param"), p = h.length, f = 0; p > f; f++)
                                            "movie" != h[f].getAttribute("name").toLowerCase() && (d[h[f].getAttribute("name")] = h[f].getAttribute("value"));
                                        l(u, d, n, i)
                                    } else
                                        c(o), i && i(s);
                                else
                                    S(n, !0), i && (s.success = !0, s.ref = r(n), i(s))
                        } else if (S(n, !0), i) {
                            var g = r(n);
                            g && typeof g.SetVariable != x && (s.success = !0, s.ref = g), i(s)
                        }
                    }
            }
            function r(t) {
                var e = null, n = m(t);
                if (n && "OBJECT" == n.nodeName)
                    if (typeof n.SetVariable != x)
                        e = n;
                    else {
                        var i = n.getElementsByTagName(A)[0];
                        i && (e = i)
                    }
                return e
            }
            function a() {
                return !V && y("6.0.65") && (Y.win || Y.mac) && !(Y.wk && Y.wk < 312)
            }
            function l(t, e, n, i) {
                V = !0, _ = i || null, k = {success: !1,id: n};
                var s = m(n);
                if (s) {
                    "OBJECT" == s.nodeName ? (T = u(s), w = null) : (T = s, w = n), t.id = R, (typeof t.width == x || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) && (t.width = "310"), (typeof t.height == x || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) && (t.height = "137"), P.title = P.title.slice(0, 47) + " - Flash Player Installation";
                    var o = Y.ie && Y.win ? ["Active"].concat("").join("X") : "PlugIn", r = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + o + "&MMdoctitle=" + P.title;
                    if (typeof e.flashvars != x ? e.flashvars += "&" + r : e.flashvars = r, Y.ie && Y.win && 4 != s.readyState) {
                        var a = g("div");
                        n += "SWFObjectNew", a.setAttribute("id", n), s.parentNode.insertBefore(a, s), s.style.display = "none", function() {
                            4 == s.readyState ? s.parentNode.removeChild(s) : setTimeout(arguments.callee, 10)
                        }()
                    }
                    d(t, e, n)
                }
            }
            function c(t) {
                if (Y.ie && Y.win && 4 != t.readyState) {
                    var e = g("div");
                    t.parentNode.insertBefore(e, t), e.parentNode.replaceChild(u(t), e), t.style.display = "none", function() {
                        4 == t.readyState ? t.parentNode.removeChild(t) : setTimeout(arguments.callee, 10)
                    }()
                } else
                    t.parentNode.replaceChild(u(t), t)
            }
            function u(t) {
                var e = g("div");
                if (Y.win && Y.ie)
                    e.innerHTML = t.innerHTML;
                else {
                    var n = t.getElementsByTagName(A)[0];
                    if (n) {
                        var i = n.childNodes;
                        if (i)
                            for (var s = i.length, o = 0; s > o; o++)
                                (1 != i[o].nodeType || "PARAM" != i[o].nodeName) && 8 != i[o].nodeType && e.appendChild(i[o].cloneNode(!0))
                    }
                }
                return e
            }
            function d(t, e, n) {
                var i, s = m(n);
                if (Y.wk && Y.wk < 312)
                    return i;
                if (s)
                    if (typeof t.id == x && (t.id = n), Y.ie && Y.win) {
                        var o = "";
                        for (var r in t)
                            t[r] != Object.prototype[r] && ("data" == r.toLowerCase() ? e.movie = t[r] : "styleclass" == r.toLowerCase() ? o += ' class="' + t[r] + '"' : "classid" != r.toLowerCase() && (o += " " + r + '="' + t[r] + '"'));
                        var a = "";
                        for (var l in e)
                            e[l] != Object.prototype[l] && (a += '<param name="' + l + '" value="' + e[l] + '" />');
                        s.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + o + ">" + a + "</object>", B[B.length] = t.id, i = m(t.id)
                    } else {
                        var c = g(A);
                        c.setAttribute("type", M);
                        for (var u in t)
                            t[u] != Object.prototype[u] && ("styleclass" == u.toLowerCase() ? c.setAttribute("class", t[u]) : "classid" != u.toLowerCase() && c.setAttribute(u, t[u]));
                        for (var d in e)
                            e[d] != Object.prototype[d] && "movie" != d.toLowerCase() && h(c, d, e[d]);
                        s.parentNode.replaceChild(c, s), i = c
                    }
                return i
            }
            function h(t, e, n) {
                var i = g("param");
                i.setAttribute("name", e), i.setAttribute("value", n), t.appendChild(i)
            }
            function p(t) {
                var e = m(t);
                e && "OBJECT" == e.nodeName && (Y.ie && Y.win ? (e.style.display = "none", function() {
                    4 == e.readyState ? f(t) : setTimeout(arguments.callee, 10)
                }()) : e.parentNode.removeChild(e))
            }
            function f(t) {
                var e = m(t);
                if (e) {
                    for (var n in e)
                        "function" == typeof e[n] && (e[n] = null);
                    e.parentNode.removeChild(e)
                }
            }
            function m(t) {
                var e = null;
                try {
                    e = P.getElementById(t)
                } catch (n) {
                }
                return e
            }
            function g(t) {
                return P.createElement(t)
            }
            function v(t, e, n) {
                t.attachEvent(e, n), F[F.length] = [t, e, n]
            }
            function y(t) {
                var e = Y.pv, n = t.split(".");
                return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, e[0] > n[0] || e[0] == n[0] && e[1] > n[1] || e[0] == n[0] && e[1] == n[1] && e[2] >= n[2] ? !0 : !1
            }
            function b(t, e, n, i) {
                if (!Y.ie || !Y.mac) {
                    var s = P.getElementsByTagName("head")[0];
                    if (s) {
                        var o = n && "string" == typeof n ? n : "screen";
                        if (i && (L = null, C = null), !L || C != o) {
                            var r = g("style");
                            r.setAttribute("type", "text/css"), r.setAttribute("media", o), L = s.appendChild(r), Y.ie && Y.win && typeof P.styleSheets != x && P.styleSheets.length > 0 && (L = P.styleSheets[P.styleSheets.length - 1]), C = o
                        }
                        Y.ie && Y.win ? L && typeof L.addRule == A && L.addRule(t, e) : L && typeof P.createTextNode != x && L.appendChild(P.createTextNode(t + " {" + e + "}"))
                    }
                }
            }
            function S(t, e) {
                if (W) {
                    var n = e ? "visible" : "hidden";
                    z && m(t) ? m(t).style.visibility = n : b("#" + t, "visibility:" + n)
                }
            }
            function E(t) {
                var e = /[\\\"<>\.;]/, n = null != e.exec(t);
                return n && typeof encodeURIComponent != x ? encodeURIComponent(t) : t
            }
            {
                var T, w, _, k, L, C, x = "undefined", A = "object", I = "Shockwave Flash", D = "ShockwaveFlash.ShockwaveFlash", M = "application/x-shockwave-flash", R = "SWFObjectExprInst", N = "onreadystatechange", O = window, P = document, $ = navigator, j = !1, U = [i], H = [], B = [], F = [], z = !1, V = !1, W = !0, Y = function() {
                    var t = typeof P.getElementById != x && typeof P.getElementsByTagName != x && typeof P.createElement != x, e = $.userAgent.toLowerCase(), n = $.platform.toLowerCase(), i = /win/.test(n ? n : e), s = /mac/.test(n ? n : e), o = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, r = !1, a = [0, 0, 0], l = null;
                    if (typeof $.plugins != x && typeof $.plugins[I] == A)
                        l = $.plugins[I].description, l && (typeof $.mimeTypes == x || !$.mimeTypes[M] || !!$.mimeTypes[M].enabledPlugin) && (j = !0, r = !1, l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                    else if (typeof O[["Active"].concat("Object").join("X")] != x)
                        try {
                            var c = new (window[["Active"].concat("Object").join("X")])(D);
                            c && (l = c.GetVariable("$version"), l && (r = !0, l = l.split(" ")[1].split(","), a = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)]))
                        } catch (u) {
                        }
                    return {w3: t,pv: a,wk: o,ie: r,win: i,mac: s}
                }();
                !function() {
                    Y.w3 && ((typeof P.readyState != x && "complete" == P.readyState || typeof P.readyState == x && (P.getElementsByTagName("body")[0] || P.body)) && t(), z || (typeof P.addEventListener != x && P.addEventListener("DOMContentLoaded", t, !1), Y.ie && Y.win && (P.attachEvent(N, function() {
                        "complete" == P.readyState && (P.detachEvent(N, arguments.callee), t())
                    }), O == top && function() {
                        if (!z) {
                            try {
                                P.documentElement.doScroll("left")
                            } catch (e) {
                                return void setTimeout(arguments.callee, 0)
                            }
                            t()
                        }
                    }()), Y.wk && function() {
                        return z ? void 0 : /loaded|complete/.test(P.readyState) ? void t() : void setTimeout(arguments.callee, 0)
                    }(), n(t)))
                }(), function() {
                    Y.ie && Y.win && window.attachEvent("onunload", function() {
                        for (var t = F.length, e = 0; t > e; e++)
                            F[e][0].detachEvent(F[e][1], F[e][2]);
                        for (var n = B.length, i = 0; n > i; i++)
                            p(B[i]);
                        for (var s in Y)
                            Y[s] = null;
                        Y = null;
                        for (var o in swfobject)
                            swfobject[o] = null;
                        swfobject = null
                    })
                }()
            }
            return {registerObject: function(t, e, n, i) {
                    if (Y.w3 && t && e) {
                        var s = {};
                        s.id = t, s.swfVersion = e, s.expressInstall = n, s.callbackFn = i, H[H.length] = s, S(t, !1)
                    } else
                        i && i({success: !1,id: t})
                },getObjectById: function(t) {
                    return Y.w3 ? r(t) : void 0
                },embedSWF: function(t, n, i, s, o, r, c, u, h, p) {
                    var f = {success: !1,id: n};
                    Y.w3 && !(Y.wk && Y.wk < 312) && t && n && i && s && o ? (S(n, !1), e(function() {
                        i += "", s += "";
                        var e = {};
                        if (h && typeof h === A)
                            for (var m in h)
                                e[m] = h[m];
                        e.data = t, e.width = i, e.height = s;
                        var g = {};
                        if (u && typeof u === A)
                            for (var v in u)
                                g[v] = u[v];
                        if (c && typeof c === A)
                            for (var b in c)
                                typeof g.flashvars != x ? g.flashvars += "&" + b + "=" + c[b] : g.flashvars = b + "=" + c[b];
                        if (y(o)) {
                            var E = d(e, g, n);
                            e.id == n && S(n, !0), f.success = !0, f.ref = E
                        } else {
                            if (r && a())
                                return e.data = r, void l(e, g, n, p);
                            S(n, !0)
                        }
                        p && p(f)
                    })) : p && p(f)
                },switchOffAutoHideShow: function() {
                    W = !1
                },ua: Y,getFlashPlayerVersion: function() {
                    return {major: Y.pv[0],minor: Y.pv[1],release: Y.pv[2]}
                },hasFlashPlayerVersion: y,createSWF: function(t, e, n) {
                    return Y.w3 ? d(t, e, n) : void 0
                },showExpressInstall: function(t, e, n, i) {
                    Y.w3 && a() && l(t, e, n, i)
                },removeSWF: function(t) {
                    Y.w3 && p(t)
                },createCSS: function(t, e, n, i) {
                    Y.w3 && b(t, e, n, i)
                },addDomLoadEvent: e,addLoadEvent: n,getQueryParamValue: function(t) {
                    var e = P.location.search || P.location.hash;
                    if (e) {
                        if (/\?/.test(e) && (e = e.split("?")[1]), null == t)
                            return E(e);
                        for (var n = e.split("&"), i = 0; i < n.length; i++)
                            if (n[i].substring(0, n[i].indexOf("=")) == t)
                                return E(n[i].substring(n[i].indexOf("=") + 1))
                    }
                    return ""
                },expressInstallCallback: function() {
                    if (V) {
                        var t = m(R);
                        t && T && (t.parentNode.replaceChild(T, t), w && (S(w, !0), Y.ie && Y.win && (T.style.display = "block")), _ && _(k)), V = !1
                    }
                }}
        }();
    !function() {
        if ("undefined" != typeof window && !window.WebSocket) {
            var t = window.console;
            return t && t.log && t.error || (t = {log: function() {
                },error: function() {
                }}), swfobject.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && t.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(t, e, n, i, s) {
                var o = this;
                o.__id = WebSocket.__nextId++, WebSocket.__instances[o.__id] = o, o.readyState = WebSocket.CONNECTING, o.bufferedAmount = 0, o.__events = {}, e ? "string" == typeof e && (e = [e]) : e = [], setTimeout(function() {
                    WebSocket.__addTask(function() {
                        WebSocket.__flash.create(o.__id, t, e, n || null, i || 0, s || null)
                    })
                }, 0)
            }, WebSocket.prototype.send = function(t) {
                if (this.readyState == WebSocket.CONNECTING)
                    throw "INVALID_STATE_ERR: Web Socket connection has not been established";
                var e = WebSocket.__flash.send(this.__id, encodeURIComponent(t));
                return 0 > e ? !0 : (this.bufferedAmount += e, !1)
            }, WebSocket.prototype.close = function() {
                this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
            }, WebSocket.prototype.addEventListener = function(t, e) {
                t in this.__events || (this.__events[t] = []), this.__events[t].push(e)
            }, WebSocket.prototype.removeEventListener = function(t, e) {
                if (t in this.__events)
                    for (var n = this.__events[t], i = n.length - 1; i >= 0; --i)
                        if (n[i] === e) {
                            n.splice(i, 1);
                            break
                        }
            }, WebSocket.prototype.dispatchEvent = function(t) {
                for (var e = this.__events[t.type] || [], n = 0; n < e.length; ++n)
                    e[n](t);
                var i = this["on" + t.type];
                i && i(t)
            }, WebSocket.prototype.__handleEvent = function(t) {
                "readyState" in t && (this.readyState = t.readyState), "protocol" in t && (this.protocol = t.protocol);
                var e;
                if ("open" == t.type || "error" == t.type)
                    e = this.__createSimpleEvent(t.type);
                else if ("close" == t.type)
                    e = this.__createSimpleEvent("close");
                else {
                    if ("message" != t.type)
                        throw "unknown event type: " + t.type;
                    var n = decodeURIComponent(t.message);
                    e = this.__createMessageEvent("message", n)
                }
                this.dispatchEvent(e)
            }, WebSocket.prototype.__createSimpleEvent = function(t) {
                if (document.createEvent && window.Event) {
                    var e = document.createEvent("Event");
                    return e.initEvent(t, !1, !1), e
                }
                return {type: t,bubbles: !1,cancelable: !1}
            }, WebSocket.prototype.__createMessageEvent = function(t, e) {
                if (document.createEvent && window.MessageEvent && !window.opera) {
                    var n = document.createEvent("MessageEvent");
                    return n.initMessageEvent("message", !1, !1, e, null, null, window, null), n
                }
                return {type: t,data: e,bubbles: !1,cancelable: !1}
            }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(t) {
                WebSocket.__addTask(function() {
                    WebSocket.__flash.loadManualPolicyFile(t)
                })
            }, WebSocket.__initialize = function() {
                if (!WebSocket.__flash) {
                    if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION)
                        return void t.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                    var e = document.createElement("div");
                    e.id = "webSocketContainer", e.style.position = "absolute", WebSocket.__isFlashLite() ? (e.style.left = "0px", e.style.top = "0px") : (e.style.left = "-100px", e.style.top = "-100px");
                    var n = document.createElement("div");
                    n.id = "webSocketFlash", e.appendChild(n), document.body.appendChild(e), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {hasPriority: !0,swliveconnect: !0,allowScriptAccess: "always"}, null, function(e) {
                        e.success || t.error("[WebSocket] swfobject.embedSWF failed")
                    })
                }
            }, WebSocket.__onFlashInitialized = function() {
                setTimeout(function() {
                    WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                    for (var t = 0; t < WebSocket.__tasks.length; ++t)
                        WebSocket.__tasks[t]();
                    WebSocket.__tasks = []
                }, 0)
            }, WebSocket.__onFlashEvent = function() {
                return setTimeout(function() {
                    try {
                        for (var e = WebSocket.__flash.receiveEvents(), n = 0; n < e.length; ++n)
                            WebSocket.__instances[e[n].webSocketId].__handleEvent(e[n])
                    } catch (i) {
                        t.error(i)
                    }
                }, 0), !0
            }, WebSocket.__log = function(e) {
                t.log(decodeURIComponent(e))
            }, WebSocket.__error = function(e) {
                t.error(decodeURIComponent(e))
            }, WebSocket.__addTask = function(t) {
                WebSocket.__flash ? t() : WebSocket.__tasks.push(t)
            }, WebSocket.__isFlashLite = function() {
                if (!window.navigator || !window.navigator.mimeTypes)
                    return !1;
                var t = window.navigator.mimeTypes["application/x-shockwave-flash"];
                return t && t.enabledPlugin && t.enabledPlugin.filename && t.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
            }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
                WebSocket.__initialize()
            }, !1) : window.attachEvent("onload", function() {
                WebSocket.__initialize()
            })), void 0) : void t.error("Flash Player >= 10.0.0 is required.")
        }
    }(), function(t, e, n) {
        function i(t) {
            t && (e.Transport.apply(this, arguments), this.sendBuffer = [])
        }
        function s() {
        }
        t.XHR = i, e.util.inherit(i, e.Transport), i.prototype.open = function() {
            return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
        }, i.prototype.payload = function(t) {
            for (var n = [], i = 0, s = t.length; s > i; i++)
                n.push(e.parser.encodePacket(t[i]));
            this.send(e.parser.encodePayload(n))
        }, i.prototype.send = function(t) {
            return this.post(t), this
        }, i.prototype.post = function(t) {
            function e() {
                4 == this.readyState && (this.onreadystatechange = s, o.posting = !1, 200 == this.status ? o.socket.setBuffer(!1) : o.onClose())
            }
            function i() {
                this.onload = s, o.socket.setBuffer(!1)
            }
            var o = this;
            this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = i : this.sendXHR.onreadystatechange = e, this.sendXHR.send(t)
        }, i.prototype.close = function() {
            return this.onClose(), this
        }, i.prototype.request = function(t) {
            var n = e.util.request(this.socket.isXDomain()), i = e.util.query(this.socket.options.query, "t=" + +new Date);
            if (n.open(t || "GET", this.prepareUrl() + i, !0), "POST" == t)
                try {
                    n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
                } catch (s) {
                }
            return n
        }, i.prototype.scheme = function() {
            return this.socket.options.secure ? "https" : "http"
        }, i.check = function(t, i) {
            try {
                var s = e.util.request(i), o = n.XDomainRequest && s instanceof XDomainRequest, r = t && t.options && t.options.secure ? "https:" : "http:", a = n.location && r != n.location.protocol;
                if (s && (!o || !a))
                    return !0
            } catch (l) {
            }
            return !1
        }, i.xdomainCheck = function(t) {
            return i.check(t, !0)
        }
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(t, e) {
        function n() {
            e.Transport.XHR.apply(this, arguments)
        }
        t.htmlfile = n, e.util.inherit(n, e.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
            this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
            var t = this.doc.createElement("div");
            t.className = "socketio", this.doc.body.appendChild(t), this.iframe = this.doc.createElement("iframe"), t.appendChild(this.iframe);
            var n = this, i = e.util.query(this.socket.options.query, "t=" + +new Date);
            this.iframe.src = this.prepareUrl() + i, e.util.on(window, "unload", function() {
                n.destroy()
            })
        }, n.prototype._ = function(t, e) {
            t = t.replace(/\\\//g, "/"), this.onData(t);
            try {
                var n = e.getElementsByTagName("script")[0];
                n.parentNode.removeChild(n)
            } catch (i) {
            }
        }, n.prototype.destroy = function() {
            if (this.iframe) {
                try {
                    this.iframe.src = "about:blank"
                } catch (t) {
                }
                this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
            }
        }, n.prototype.close = function() {
            return this.destroy(), e.Transport.XHR.prototype.close.call(this)
        }, n.check = function(t) {
            if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window)
                try {
                    var n = new (window[["Active"].concat("Object").join("X")])("htmlfile");
                    return n && e.Transport.XHR.check(t)
                } catch (i) {
                }
            return !1
        }, n.xdomainCheck = function() {
            return !1
        }, e.transports.push("htmlfile")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(t, e, n) {
        function i() {
            e.Transport.XHR.apply(this, arguments)
        }
        function s() {
        }
        t["xhr-polling"] = i, e.util.inherit(i, e.Transport.XHR), e.util.merge(i, e.Transport.XHR), i.prototype.name = "xhr-polling", i.prototype.heartbeats = function() {
            return !1
        }, i.prototype.open = function() {
            var t = this;
            return e.Transport.XHR.prototype.open.call(t), !1
        }, i.prototype.get = function() {
            function t() {
                4 == this.readyState && (this.onreadystatechange = s, 200 == this.status ? (o.onData(this.responseText), o.get()) : o.onClose())
            }
            function e() {
                this.onload = s, this.onerror = s, o.retryCounter = 1, o.onData(this.responseText), o.get()
            }
            function i() {
                o.retryCounter++, !o.retryCounter || o.retryCounter > 3 ? o.onClose() : o.get()
            }
            if (this.isOpen) {
                var o = this;
                this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = e, this.xhr.onerror = i) : this.xhr.onreadystatechange = t, this.xhr.send(null)
            }
        }, i.prototype.onClose = function() {
            if (e.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = s;
                try {
                    this.xhr.abort()
                } catch (t) {
                }
                this.xhr = null
            }
        }, i.prototype.ready = function(t, n) {
            var i = this;
            e.util.defer(function() {
                n.call(i)
            })
        }, e.transports.push("xhr-polling")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(t, e, n) {
        function i() {
            e.Transport["xhr-polling"].apply(this, arguments), this.index = e.j.length;
            var t = this;
            e.j.push(function(e) {
                t._(e)
            })
        }
        var s = n.document && "MozAppearance" in n.document.documentElement.style;
        t["jsonp-polling"] = i, e.util.inherit(i, e.Transport["xhr-polling"]), i.prototype.name = "jsonp-polling", i.prototype.post = function(t) {
            function n() {
                i(), s.socket.setBuffer(!1)
            }
            function i() {
                s.iframe && s.form.removeChild(s.iframe);
                try {
                    r = document.createElement('<iframe name="' + s.iframeId + '">')
                } catch (t) {
                    r = document.createElement("iframe"), r.name = s.iframeId
                }
                r.id = s.iframeId, s.form.appendChild(r), s.iframe = r
            }
            var s = this, o = e.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
            if (!this.form) {
                var r, a = document.createElement("form"), l = document.createElement("textarea"), c = this.iframeId = "socketio_iframe_" + this.index;
                a.className = "socketio", a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.style.display = "none", a.target = c, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), l.name = "d", a.appendChild(l), document.body.appendChild(a), this.form = a, this.area = l
            }
            this.form.action = this.prepareUrl() + o, i(), this.area.value = e.JSON.stringify(t);
            try {
                this.form.submit()
            } catch (u) {
            }
            this.iframe.attachEvent ? r.onreadystatechange = function() {
                "complete" == s.iframe.readyState && n()
            } : this.iframe.onload = n, this.socket.setBuffer(!0)
        }, i.prototype.get = function() {
            var t = this, n = document.createElement("script"), i = e.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + i, n.onerror = function() {
                t.onClose()
            };
            var o = document.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(n, o), this.script = n, s && setTimeout(function() {
                var t = document.createElement("iframe");
                document.body.appendChild(t), document.body.removeChild(t)
            }, 100)
        }, i.prototype._ = function(t) {
            return this.onData(t), this.isOpen && this.get(), this
        }, i.prototype.ready = function(t, n) {
            var i = this;
            return s ? void e.util.load(function() {
                n.call(i)
            }) : n.call(this)
        }, i.check = function() {
            return "document" in n
        }, i.xdomainCheck = function() {
            return !0
        }, e.transports.push("jsonp-polling")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), "function" == typeof define && define.amd && define([], function() {
        return io
    })
}();
var CryptoJS = CryptoJS || function(t, e) {
    var n = {}, i = n.lib = {}, s = function() {
    }, o = i.Base = {extend: function(t) {
            s.prototype = this;
            var e = new s;
            return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                e.$super.init.apply(this, arguments)
            }), e.init.prototype = e, e.$super = this, e
        },create: function() {
            var t = this.extend();
            return t.init.apply(t, arguments), t
        },init: function() {
        },mixIn: function(t) {
            for (var e in t)
                t.hasOwnProperty(e) && (this[e] = t[e]);
            t.hasOwnProperty("toString") && (this.toString = t.toString)
        },clone: function() {
            return this.init.prototype.extend(this)
        }}, r = i.WordArray = o.extend({init: function(t, n) {
            t = this.words = t || [], this.sigBytes = n != e ? n : 4 * t.length
        },toString: function(t) {
            return (t || l).stringify(this)
        },concat: function(t) {
            var e = this.words, n = t.words, i = this.sigBytes;
            if (t = t.sigBytes, this.clamp(), i % 4)
                for (var s = 0; t > s; s++)
                    e[i + s >>> 2] |= (n[s >>> 2] >>> 24 - 8 * (s % 4) & 255) << 24 - 8 * ((i + s) % 4);
            else if (65535 < n.length)
                for (s = 0; t > s; s += 4)
                    e[i + s >>> 2] = n[s >>> 2];
            else
                e.push.apply(e, n);
            return this.sigBytes += t, this
        },clamp: function() {
            var e = this.words, n = this.sigBytes;
            e[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), e.length = t.ceil(n / 4)
        },clone: function() {
            var t = o.clone.call(this);
            return t.words = this.words.slice(0), t
        },random: function(e) {
            for (var n = [], i = 0; e > i; i += 4)
                n.push(4294967296 * t.random() | 0);
            return new r.init(n, e)
        }}), a = n.enc = {}, l = a.Hex = {stringify: function(t) {
            var e = t.words;
            t = t.sigBytes;
            for (var n = [], i = 0; t > i; i++) {
                var s = e[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
                n.push((s >>> 4).toString(16)), n.push((15 & s).toString(16))
            }
            return n.join("")
        },parse: function(t) {
            for (var e = t.length, n = [], i = 0; e > i; i += 2)
                n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - 4 * (i % 8);
            return new r.init(n, e / 2)
        }}, c = a.Latin1 = {stringify: function(t) {
            var e = t.words;
            t = t.sigBytes;
            for (var n = [], i = 0; t > i; i++)
                n.push(String.fromCharCode(e[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
            return n.join("")
        },parse: function(t) {
            for (var e = t.length, n = [], i = 0; e > i; i++)
                n[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - 8 * (i % 4);
            return new r.init(n, e)
        }}, u = a.Utf8 = {stringify: function(t) {
            try {
                return decodeURIComponent(escape(c.stringify(t)))
            } catch (e) {
                throw Error("Malformed UTF-8 data")
            }
        },parse: function(t) {
            return c.parse(unescape(encodeURIComponent(t)))
        }}, d = i.BufferedBlockAlgorithm = o.extend({reset: function() {
            this._data = new r.init, this._nDataBytes = 0
        },_append: function(t) {
            "string" == typeof t && (t = u.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
        },_process: function(e) {
            var n = this._data, i = n.words, s = n.sigBytes, o = this.blockSize, a = s / (4 * o), a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
            if (e = a * o, s = t.min(4 * e, s), e) {
                for (var l = 0; e > l; l += o)
                    this._doProcessBlock(i, l);
                l = i.splice(0, e), n.sigBytes -= s
            }
            return new r.init(l, s)
        },clone: function() {
            var t = o.clone.call(this);
            return t._data = this._data.clone(), t
        },_minBufferSize: 0});
    i.Hasher = d.extend({cfg: o.extend(),init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset()
        },reset: function() {
            d.reset.call(this), this._doReset()
        },update: function(t) {
            return this._append(t), this._process(), this
        },finalize: function(t) {
            return t && this._append(t), this._doFinalize()
        },blockSize: 16,_createHelper: function(t) {
            return function(e, n) {
                return new t.init(n).finalize(e)
            }
        },_createHmacHelper: function(t) {
            return function(e, n) {
                return new h.HMAC.init(t, n).finalize(e)
            }
        }});
    var h = n.algo = {};
    return n
}(Math);
!function(t) {
    function e(t, e, n, i, s, o, r) {
        return t = t + (e & n | ~e & i) + s + r, (t << o | t >>> 32 - o) + e
    }
    function n(t, e, n, i, s, o, r) {
        return t = t + (e & i | n & ~i) + s + r, (t << o | t >>> 32 - o) + e
    }
    function i(t, e, n, i, s, o, r) {
        return t = t + (e ^ n ^ i) + s + r, (t << o | t >>> 32 - o) + e
    }
    function s(t, e, n, i, s, o, r) {
        return t = t + (n ^ (e | ~i)) + s + r, (t << o | t >>> 32 - o) + e
    }
    for (var o = CryptoJS, r = o.lib, a = r.WordArray, l = r.Hasher, r = o.algo, c = [], u = 0; 64 > u; u++)
        c[u] = 4294967296 * t.abs(t.sin(u + 1)) | 0;
    r = r.MD5 = l.extend({_doReset: function() {
            this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878])
        },_doProcessBlock: function(t, o) {
            for (var r = 0; 16 > r; r++) {
                var a = o + r, l = t[a];
                t[a] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
            }
            var r = this._hash.words, a = t[o + 0], l = t[o + 1], u = t[o + 2], d = t[o + 3], h = t[o + 4], p = t[o + 5], f = t[o + 6], m = t[o + 7], g = t[o + 8], v = t[o + 9], y = t[o + 10], b = t[o + 11], S = t[o + 12], E = t[o + 13], T = t[o + 14], w = t[o + 15], _ = r[0], k = r[1], L = r[2], C = r[3], _ = e(_, k, L, C, a, 7, c[0]), C = e(C, _, k, L, l, 12, c[1]), L = e(L, C, _, k, u, 17, c[2]), k = e(k, L, C, _, d, 22, c[3]), _ = e(_, k, L, C, h, 7, c[4]), C = e(C, _, k, L, p, 12, c[5]), L = e(L, C, _, k, f, 17, c[6]), k = e(k, L, C, _, m, 22, c[7]), _ = e(_, k, L, C, g, 7, c[8]), C = e(C, _, k, L, v, 12, c[9]), L = e(L, C, _, k, y, 17, c[10]), k = e(k, L, C, _, b, 22, c[11]), _ = e(_, k, L, C, S, 7, c[12]), C = e(C, _, k, L, E, 12, c[13]), L = e(L, C, _, k, T, 17, c[14]), k = e(k, L, C, _, w, 22, c[15]), _ = n(_, k, L, C, l, 5, c[16]), C = n(C, _, k, L, f, 9, c[17]), L = n(L, C, _, k, b, 14, c[18]), k = n(k, L, C, _, a, 20, c[19]), _ = n(_, k, L, C, p, 5, c[20]), C = n(C, _, k, L, y, 9, c[21]), L = n(L, C, _, k, w, 14, c[22]), k = n(k, L, C, _, h, 20, c[23]), _ = n(_, k, L, C, v, 5, c[24]), C = n(C, _, k, L, T, 9, c[25]), L = n(L, C, _, k, d, 14, c[26]), k = n(k, L, C, _, g, 20, c[27]), _ = n(_, k, L, C, E, 5, c[28]), C = n(C, _, k, L, u, 9, c[29]), L = n(L, C, _, k, m, 14, c[30]), k = n(k, L, C, _, S, 20, c[31]), _ = i(_, k, L, C, p, 4, c[32]), C = i(C, _, k, L, g, 11, c[33]), L = i(L, C, _, k, b, 16, c[34]), k = i(k, L, C, _, T, 23, c[35]), _ = i(_, k, L, C, l, 4, c[36]), C = i(C, _, k, L, h, 11, c[37]), L = i(L, C, _, k, m, 16, c[38]), k = i(k, L, C, _, y, 23, c[39]), _ = i(_, k, L, C, E, 4, c[40]), C = i(C, _, k, L, a, 11, c[41]), L = i(L, C, _, k, d, 16, c[42]), k = i(k, L, C, _, f, 23, c[43]), _ = i(_, k, L, C, v, 4, c[44]), C = i(C, _, k, L, S, 11, c[45]), L = i(L, C, _, k, w, 16, c[46]), k = i(k, L, C, _, u, 23, c[47]), _ = s(_, k, L, C, a, 6, c[48]), C = s(C, _, k, L, m, 10, c[49]), L = s(L, C, _, k, T, 15, c[50]), k = s(k, L, C, _, p, 21, c[51]), _ = s(_, k, L, C, S, 6, c[52]), C = s(C, _, k, L, d, 10, c[53]), L = s(L, C, _, k, y, 15, c[54]), k = s(k, L, C, _, l, 21, c[55]), _ = s(_, k, L, C, g, 6, c[56]), C = s(C, _, k, L, w, 10, c[57]), L = s(L, C, _, k, f, 15, c[58]), k = s(k, L, C, _, E, 21, c[59]), _ = s(_, k, L, C, h, 6, c[60]), C = s(C, _, k, L, b, 10, c[61]), L = s(L, C, _, k, u, 15, c[62]), k = s(k, L, C, _, v, 21, c[63]);
            r[0] = r[0] + _ | 0, r[1] = r[1] + k | 0, r[2] = r[2] + L | 0, r[3] = r[3] + C | 0
        },_doFinalize: function() {
            var e = this._data, n = e.words, i = 8 * this._nDataBytes, s = 8 * e.sigBytes;
            n[s >>> 5] |= 128 << 24 - s % 32;
            var o = t.floor(i / 4294967296);
            for (n[(s + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[(s + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (n.length + 1), this._process(), e = this._hash, n = e.words, i = 0; 4 > i; i++)
                s = n[i], n[i] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
            return e
        },clone: function() {
            var t = l.clone.call(this);
            return t._hash = this._hash.clone(), t
        }}), o.MD5 = l._createHelper(r), o.HmacMD5 = l._createHmacHelper(r)
}(Math), function() {
    function t(t) {
        var n = {r: 0,g: 0,b: 0}, s = 1, r = !1, a = !1;
        return "string" == typeof t && (t = M(t)), "object" == typeof t && (t.hasOwnProperty("r") && t.hasOwnProperty("g") && t.hasOwnProperty("b") ? (n = e(t.r, t.g, t.b), r = !0, a = "%" === String(t.r).substr(-1) ? "prgb" : "rgb") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("v") ? (t.s = A(t.s), t.v = A(t.v), n = o(t.h, t.s, t.v), r = !0, a = "hsv") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("l") && (t.s = A(t.s), t.l = A(t.l), n = i(t.h, t.s, t.l), r = !0, a = "hsl"), t.hasOwnProperty("a") && (s = t.a)), s = T(s), {ok: r,format: t.format || a,r: j(255, U(n.r, 0)),g: j(255, U(n.g, 0)),b: j(255, U(n.b, 0)),a: s}
    }
    function e(t, e, n) {
        return {r: 255 * w(t, 255),g: 255 * w(e, 255),b: 255 * w(n, 255)}
    }
    function n(t, e, n) {
        t = w(t, 255), e = w(e, 255), n = w(n, 255);
        var i, s, o = U(t, e, n), r = j(t, e, n), a = (o + r) / 2;
        if (o == r)
            i = s = 0;
        else {
            var l = o - r;
            switch (s = a > .5 ? l / (2 - o - r) : l / (o + r), o) {
                case t:
                    i = (e - n) / l + (n > e ? 6 : 0);
                    break;
                case e:
                    i = (n - t) / l + 2;
                    break;
                case n:
                    i = (t - e) / l + 4
            }
            i /= 6
        }
        return {h: i,s: s,l: a}
    }
    function i(t, e, n) {
        function i(t, e, n) {
            return 0 > n && (n += 1), n > 1 && (n -= 1), 1 / 6 > n ? t + 6 * (e - t) * n : .5 > n ? e : 2 / 3 > n ? t + (e - t) * (2 / 3 - n) * 6 : t
        }
        var s, o, r;
        if (t = w(t, 360), e = w(e, 100), n = w(n, 100), 0 === e)
            s = o = r = n;
        else {
            var a = .5 > n ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
            s = i(l, a, t + 1 / 3), o = i(l, a, t), r = i(l, a, t - 1 / 3)
        }
        return {r: 255 * s,g: 255 * o,b: 255 * r}
    }
    function s(t, e, n) {
        t = w(t, 255), e = w(e, 255), n = w(n, 255);
        var i, s, o = U(t, e, n), r = j(t, e, n), a = o, l = o - r;
        if (s = 0 === o ? 0 : l / o, o == r)
            i = 0;
        else {
            switch (o) {
                case t:
                    i = (e - n) / l + (n > e ? 6 : 0);
                    break;
                case e:
                    i = (n - t) / l + 2;
                    break;
                case n:
                    i = (t - e) / l + 4
            }
            i /= 6
        }
        return {h: i,s: s,v: a}
    }
    function o(t, e, n) {
        t = 6 * w(t, 360), e = w(e, 100), n = w(n, 100);
        var i = P.floor(t), s = t - i, o = n * (1 - e), r = n * (1 - s * e), a = n * (1 - (1 - s) * e), l = i % 6, c = [n, r, o, o, a, n][l], u = [a, n, n, r, o, o][l], d = [o, o, a, n, n, r][l];
        return {r: 255 * c,g: 255 * u,b: 255 * d}
    }
    function r(t, e, n, i) {
        var s = [x($(t).toString(16)), x($(e).toString(16)), x($(n).toString(16))];
        return i && s[0].charAt(0) == s[0].charAt(1) && s[1].charAt(0) == s[1].charAt(1) && s[2].charAt(0) == s[2].charAt(1) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) : s.join("")
    }
    function a(t, e, n, i) {
        var s = [x(I(i)), x($(t).toString(16)), x($(e).toString(16)), x($(n).toString(16))];
        return s.join("")
    }
    function l(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.s -= e / 100, n.s = _(n.s), B(n)
    }
    function c(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.s += e / 100, n.s = _(n.s), B(n)
    }
    function u(t) {
        return B(t).desaturate(100)
    }
    function d(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.l += e / 100, n.l = _(n.l), B(n)
    }
    function h(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toRgb();
        return n.r = U(0, j(255, n.r - $(255 * -(e / 100)))), n.g = U(0, j(255, n.g - $(255 * -(e / 100)))), n.b = U(0, j(255, n.b - $(255 * -(e / 100)))), B(n)
    }
    function p(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.l -= e / 100, n.l = _(n.l), B(n)
    }
    function f(t, e) {
        var n = B(t).toHsl(), i = ($(n.h) + e) % 360;
        return n.h = 0 > i ? 360 + i : i, B(n)
    }
    function m(t) {
        var e = B(t).toHsl();
        return e.h = (e.h + 180) % 360, B(e)
    }
    function g(t) {
        var e = B(t).toHsl(), n = e.h;
        return [B(t), B({h: (n + 120) % 360,s: e.s,l: e.l}), B({h: (n + 240) % 360,s: e.s,l: e.l})]
    }
    function v(t) {
        var e = B(t).toHsl(), n = e.h;
        return [B(t), B({h: (n + 90) % 360,s: e.s,l: e.l}), B({h: (n + 180) % 360,s: e.s,l: e.l}), B({h: (n + 270) % 360,s: e.s,l: e.l})]
    }
    function y(t) {
        var e = B(t).toHsl(), n = e.h;
        return [B(t), B({h: (n + 72) % 360,s: e.s,l: e.l}), B({h: (n + 216) % 360,s: e.s,l: e.l})]
    }
    function b(t, e, n) {
        e = e || 6, n = n || 30;
        var i = B(t).toHsl(), s = 360 / n, o = [B(t)];
        for (i.h = (i.h - (s * e >> 1) + 720) % 360; --e; )
            i.h = (i.h + s) % 360, o.push(B(i));
        return o
    }
    function S(t, e) {
        e = e || 6;
        for (var n = B(t).toHsv(), i = n.h, s = n.s, o = n.v, r = [], a = 1 / e; e--; )
            r.push(B({h: i,s: s,v: o})), o = (o + a) % 1;
        return r
    }
    function E(t) {
        var e = {};
        for (var n in t)
            t.hasOwnProperty(n) && (e[t[n]] = n);
        return e
    }
    function T(t) {
        return t = parseFloat(t), (isNaN(t) || 0 > t || t > 1) && (t = 1), t
    }
    function w(t, e) {
        L(t) && (t = "100%");
        var n = C(t);
        return t = j(e, U(0, parseFloat(t))), n && (t = parseInt(t * e, 10) / 100), P.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e)
    }
    function _(t) {
        return j(1, U(0, t))
    }
    function k(t) {
        return parseInt(t, 16)
    }
    function L(t) {
        return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
    }
    function C(t) {
        return "string" == typeof t && -1 != t.indexOf("%")
    }
    function x(t) {
        return 1 == t.length ? "0" + t : "" + t
    }
    function A(t) {
        return 1 >= t && (t = 100 * t + "%"), t
    }
    function I(t) {
        return Math.round(255 * parseFloat(t)).toString(16)
    }
    function D(t) {
        return k(t) / 255
    }
    function M(t) {
        t = t.replace(R, "").replace(N, "").toLowerCase();
        var e = !1;
        if (F[t])
            t = F[t], e = !0;
        else if ("transparent" == t)
            return {r: 0,g: 0,b: 0,a: 0,format: "name"};
        var n;
        return (n = V.rgb.exec(t)) ? {r: n[1],g: n[2],b: n[3]} : (n = V.rgba.exec(t)) ? {r: n[1],g: n[2],b: n[3],a: n[4]} : (n = V.hsl.exec(t)) ? {h: n[1],s: n[2],l: n[3]} : (n = V.hsla.exec(t)) ? {h: n[1],s: n[2],l: n[3],a: n[4]} : (n = V.hsv.exec(t)) ? {h: n[1],s: n[2],v: n[3]} : (n = V.hex8.exec(t)) ? {a: D(n[1]),r: k(n[2]),g: k(n[3]),b: k(n[4]),format: e ? "name" : "hex8"} : (n = V.hex6.exec(t)) ? {r: k(n[1]),g: k(n[2]),b: k(n[3]),format: e ? "name" : "hex"} : (n = V.hex3.exec(t)) ? {r: k(n[1] + "" + n[1]),g: k(n[2] + "" + n[2]),b: k(n[3] + "" + n[3]),format: e ? "name" : "hex"} : !1
    }
    var R = /^[\s,#]+/, N = /\s+$/, O = 0, P = Math, $ = P.round, j = P.min, U = P.max, H = P.random, B = function W(e, n) {
        if (e = e ? e : "", n = n || {}, e instanceof W)
            return e;
        if (!(this instanceof W))
            return new W(e, n);
        var i = t(e);
        this._r = i.r, this._g = i.g, this._b = i.b, this._a = i.a, this._roundA = $(100 * this._a) / 100, this._format = n.format || i.format, this._gradientType = n.gradientType, this._r < 1 && (this._r = $(this._r)), this._g < 1 && (this._g = $(this._g)), this._b < 1 && (this._b = $(this._b)), this._ok = i.ok, this._tc_id = O++
    };
    B.prototype = {isDark: function() {
            return this.getBrightness() < 128
        },isLight: function() {
            return !this.isDark()
        },isValid: function() {
            return this._ok
        },getFormat: function() {
            return this._format
        },getAlpha: function() {
            return this._a
        },getBrightness: function() {
            var t = this.toRgb();
            return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3
        },setAlpha: function(t) {
            return this._a = T(t), this._roundA = $(100 * this._a) / 100, this
        },toHsv: function() {
            var t = s(this._r, this._g, this._b);
            return {h: 360 * t.h,s: t.s,v: t.v,a: this._a}
        },toHsvString: function() {
            var t = s(this._r, this._g, this._b), e = $(360 * t.h), n = $(100 * t.s), i = $(100 * t.v);
            return 1 == this._a ? "hsv(" + e + ", " + n + "%, " + i + "%)" : "hsva(" + e + ", " + n + "%, " + i + "%, " + this._roundA + ")"
        },toHsl: function() {
            var t = n(this._r, this._g, this._b);
            return {h: 360 * t.h,s: t.s,l: t.l,a: this._a}
        },toHslString: function() {
            var t = n(this._r, this._g, this._b), e = $(360 * t.h), i = $(100 * t.s), s = $(100 * t.l);
            return 1 == this._a ? "hsl(" + e + ", " + i + "%, " + s + "%)" : "hsla(" + e + ", " + i + "%, " + s + "%, " + this._roundA + ")"
        },toHex: function(t) {
            return r(this._r, this._g, this._b, t)
        },toHexString: function(t) {
            return "#" + this.toHex(t)
        },toHex8: function() {
            return a(this._r, this._g, this._b, this._a)
        },toHex8String: function() {
            return "#" + this.toHex8()
        },toRgb: function() {
            return {r: $(this._r),g: $(this._g),b: $(this._b),a: this._a}
        },toRgbString: function() {
            return 1 == this._a ? "rgb(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ")" : "rgba(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ", " + this._roundA + ")"
        },toPercentageRgb: function() {
            return {r: $(100 * w(this._r, 255)) + "%",g: $(100 * w(this._g, 255)) + "%",b: $(100 * w(this._b, 255)) + "%",a: this._a}
        },toPercentageRgbString: function() {
            return 1 == this._a ? "rgb(" + $(100 * w(this._r, 255)) + "%, " + $(100 * w(this._g, 255)) + "%, " + $(100 * w(this._b, 255)) + "%)" : "rgba(" + $(100 * w(this._r, 255)) + "%, " + $(100 * w(this._g, 255)) + "%, " + $(100 * w(this._b, 255)) + "%, " + this._roundA + ")"
        },toName: function() {
            return 0 === this._a ? "transparent" : this._a < 1 ? !1 : z[r(this._r, this._g, this._b, !0)] || !1
        },toFilter: function(t) {
            var e = "#" + a(this._r, this._g, this._b, this._a), n = e, i = this._gradientType ? "GradientType = 1, " : "";
            if (t) {
                var s = B(t);
                n = s.toHex8String()
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + i + "startColorstr=" + e + ",endColorstr=" + n + ")"
        },toString: function(t) {
            var e = !!t;
            t = t || this._format;
            var n = !1, i = this._a < 1 && this._a >= 0, s = !e && i && ("hex" === t || "hex6" === t || "hex3" === t || "name" === t);
            return s ? "name" === t && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === t && (n = this.toRgbString()), "prgb" === t && (n = this.toPercentageRgbString()), ("hex" === t || "hex6" === t) && (n = this.toHexString()), "hex3" === t && (n = this.toHexString(!0)), "hex8" === t && (n = this.toHex8String()), "name" === t && (n = this.toName()), "hsl" === t && (n = this.toHslString()), "hsv" === t && (n = this.toHsvString()), n || this.toHexString())
        },_applyModification: function(t, e) {
            var n = t.apply(null, [this].concat([].slice.call(e)));
            return this._r = n._r, this._g = n._g, this._b = n._b, this.setAlpha(n._a), this
        },lighten: function() {
            return this._applyModification(d, arguments)
        },brighten: function() {
            return this._applyModification(h, arguments)
        },darken: function() {
            return this._applyModification(p, arguments)
        },desaturate: function() {
            return this._applyModification(l, arguments)
        },saturate: function() {
            return this._applyModification(c, arguments)
        },greyscale: function() {
            return this._applyModification(u, arguments)
        },spin: function() {
            return this._applyModification(f, arguments)
        },_applyCombination: function(t, e) {
            return t.apply(null, [this].concat([].slice.call(e)))
        },analogous: function() {
            return this._applyCombination(b, arguments)
        },complement: function() {
            return this._applyCombination(m, arguments)
        },monochromatic: function() {
            return this._applyCombination(S, arguments)
        },splitcomplement: function() {
            return this._applyCombination(y, arguments)
        },triad: function() {
            return this._applyCombination(g, arguments)
        },tetrad: function() {
            return this._applyCombination(v, arguments)
        }}, B.fromRatio = function(t, e) {
        if ("object" == typeof t) {
            var n = {};
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = "a" === i ? t[i] : A(t[i]));
            t = n
        }
        return B(t, e)
    }, B.equals = function(t, e) {
        return t && e ? B(t).toRgbString() == B(e).toRgbString() : !1
    }, B.random = function() {
        return B.fromRatio({r: H(),g: H(),b: H()})
    }, B.mix = function(t, e, n) {
        n = 0 === n ? 0 : n || 50;
        var i, s = B(t).toRgb(), o = B(e).toRgb(), r = n / 100, a = 2 * r - 1, l = o.a - s.a;
        i = a * l == -1 ? a : (a + l) / (1 + a * l), i = (i + 1) / 2;
        var c = 1 - i, u = {r: o.r * i + s.r * c,g: o.g * i + s.g * c,b: o.b * i + s.b * c,a: o.a * r + s.a * (1 - r)};
        return B(u)
    }, B.readability = function(t, e) {
        var n = B(t), i = B(e), s = n.toRgb(), o = i.toRgb(), r = n.getBrightness(), a = i.getBrightness(), l = Math.max(s.r, o.r) - Math.min(s.r, o.r) + Math.max(s.g, o.g) - Math.min(s.g, o.g) + Math.max(s.b, o.b) - Math.min(s.b, o.b);
        return {brightness: Math.abs(r - a),color: l}
    }, B.isReadable = function(t, e) {
        var n = B.readability(t, e);
        return n.brightness > 125 && n.color > 500
    }, B.mostReadable = function(t, e) {
        for (var n = null, i = 0, s = !1, o = 0; o < e.length; o++) {
            var r = B.readability(t, e[o]), a = r.brightness > 125 && r.color > 500, l = 3 * (r.brightness / 125) + r.color / 500;
            (a && !s || a && s && l > i || !a && !s && l > i) && (s = a, i = l, n = B(e[o]))
        }
        return n
    };
    var F = B.names = {aliceblue: "f0f8ff",antiquewhite: "faebd7",aqua: "0ff",aquamarine: "7fffd4",azure: "f0ffff",beige: "f5f5dc",bisque: "ffe4c4",black: "000",blanchedalmond: "ffebcd",blue: "00f",blueviolet: "8a2be2",brown: "a52a2a",burlywood: "deb887",burntsienna: "ea7e5d",cadetblue: "5f9ea0",chartreuse: "7fff00",chocolate: "d2691e",coral: "ff7f50",cornflowerblue: "6495ed",cornsilk: "fff8dc",crimson: "dc143c",cyan: "0ff",darkblue: "00008b",darkcyan: "008b8b",darkgoldenrod: "b8860b",darkgray: "a9a9a9",darkgreen: "006400",darkgrey: "a9a9a9",darkkhaki: "bdb76b",darkmagenta: "8b008b",darkolivegreen: "556b2f",darkorange: "ff8c00",darkorchid: "9932cc",darkred: "8b0000",darksalmon: "e9967a",darkseagreen: "8fbc8f",darkslateblue: "483d8b",darkslategray: "2f4f4f",darkslategrey: "2f4f4f",darkturquoise: "00ced1",darkviolet: "9400d3",deeppink: "ff1493",deepskyblue: "00bfff",dimgray: "696969",dimgrey: "696969",dodgerblue: "1e90ff",firebrick: "b22222",floralwhite: "fffaf0",forestgreen: "228b22",fuchsia: "f0f",gainsboro: "dcdcdc",ghostwhite: "f8f8ff",gold: "ffd700",goldenrod: "daa520",gray: "808080",green: "008000",greenyellow: "adff2f",grey: "808080",honeydew: "f0fff0",hotpink: "ff69b4",indianred: "cd5c5c",indigo: "4b0082",ivory: "fffff0",khaki: "f0e68c",lavender: "e6e6fa",lavenderblush: "fff0f5",lawngreen: "7cfc00",lemonchiffon: "fffacd",lightblue: "add8e6",lightcoral: "f08080",lightcyan: "e0ffff",lightgoldenrodyellow: "fafad2",lightgray: "d3d3d3",lightgreen: "90ee90",lightgrey: "d3d3d3",lightpink: "ffb6c1",lightsalmon: "ffa07a",lightseagreen: "20b2aa",lightskyblue: "87cefa",lightslategray: "789",lightslategrey: "789",lightsteelblue: "b0c4de",lightyellow: "ffffe0",lime: "0f0",limegreen: "32cd32",linen: "faf0e6",magenta: "f0f",maroon: "800000",mediumaquamarine: "66cdaa",mediumblue: "0000cd",mediumorchid: "ba55d3",mediumpurple: "9370db",mediumseagreen: "3cb371",mediumslateblue: "7b68ee",mediumspringgreen: "00fa9a",mediumturquoise: "48d1cc",mediumvioletred: "c71585",midnightblue: "191970",mintcream: "f5fffa",mistyrose: "ffe4e1",moccasin: "ffe4b5",navajowhite: "ffdead",navy: "000080",oldlace: "fdf5e6",olive: "808000",olivedrab: "6b8e23",orange: "ffa500",orangered: "ff4500",orchid: "da70d6",palegoldenrod: "eee8aa",palegreen: "98fb98",paleturquoise: "afeeee",palevioletred: "db7093",papayawhip: "ffefd5",peachpuff: "ffdab9",peru: "cd853f",pink: "ffc0cb",plum: "dda0dd",powderblue: "b0e0e6",purple: "800080",red: "f00",rosybrown: "bc8f8f",royalblue: "4169e1",saddlebrown: "8b4513",salmon: "fa8072",sandybrown: "f4a460",seagreen: "2e8b57",seashell: "fff5ee",sienna: "a0522d",silver: "c0c0c0",skyblue: "87ceeb",slateblue: "6a5acd",slategray: "708090",slategrey: "708090",snow: "fffafa",springgreen: "00ff7f",steelblue: "4682b4",tan: "d2b48c",teal: "008080",thistle: "d8bfd8",tomato: "ff6347",turquoise: "40e0d0",violet: "ee82ee",wheat: "f5deb3",white: "fff",whitesmoke: "f5f5f5",yellow: "ff0",yellowgreen: "9acd32"}, z = B.hexNames = E(F), V = function() {
        var t = "[-\\+]?\\d+%?", e = "[-\\+]?\\d*\\.\\d+%?", n = "(?:" + e + ")|(?:" + t + ")", i = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?", s = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
        return {rgb: new RegExp("rgb" + i),rgba: new RegExp("rgba" + s),hsl: new RegExp("hsl" + i),hsla: new RegExp("hsla" + s),hsv: new RegExp("hsv" + i),hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}
    }();
    "undefined" != typeof module && module.exports ? module.exports = B : "function" == typeof define && define.amd ? define(function() {
        return B
    }) : window.tinycolor = B
}(), function() {
    function t(t) {
        var e = "    ";
        if (isNaN(parseInt(t)))
            e = t;
        else
            switch (t) {
                case 1:
                    e = " ";
                    break;
                case 2:
                    e = "  ";
                    break;
                case 3:
                    e = "   ";
                    break;
                case 4:
                    e = "    ";
                    break;
                case 5:
                    e = "     ";
                    break;
                case 6:
                    e = "      ";
                    break;
                case 7:
                    e = "       ";
                    break;
                case 8:
                    e = "        ";
                    break;
                case 9:
                    e = "         ";
                    break;
                case 10:
                    e = "          ";
                    break;
                case 11:
                    e = "           ";
                    break;
                case 12:
                    e = "            "
            }
        var n = ["\n"];
        for (ix = 0; 100 > ix; ix++)
            n.push(n[ix] + e);
        return n
    }
    function e() {
        this.step = "    ", this.shift = t(this.step)
    }
    function n(t, e) {
        return e - (t.replace(/\(/g, "").length - t.replace(/\)/g, "").length)
    }
    function i(t, e) {
        return t.replace(/\s{1,}/g, " ").replace(/ AND /gi, "~::~" + e + e + "AND ").replace(/ BETWEEN /gi, "~::~" + e + "BETWEEN ").replace(/ CASE /gi, "~::~" + e + "CASE ").replace(/ ELSE /gi, "~::~" + e + "ELSE ").replace(/ END /gi, "~::~" + e + "END ").replace(/ FROM /gi, "~::~FROM ").replace(/ GROUP\s{1,}BY/gi, "~::~GROUP BY ").replace(/ HAVING /gi, "~::~HAVING ").replace(/ IN /gi, " IN ").replace(/ JOIN /gi, "~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /gi, "~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /gi, "~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /gi, "~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /gi, "~::~RIGHT JOIN ").replace(/ ON /gi, "~::~" + e + "ON ").replace(/ OR /gi, "~::~" + e + e + "OR ").replace(/ ORDER\s{1,}BY/gi, "~::~ORDER BY ").replace(/ OVER /gi, "~::~" + e + "OVER ").replace(/\(\s{0,}SELECT /gi, "~::~(SELECT ").replace(/\)\s{0,}SELECT /gi, ")~::~SELECT ").replace(/ THEN /gi, " THEN~::~" + e).replace(/ UNION /gi, "~::~UNION~::~").replace(/ USING /gi, "~::~USING ").replace(/ WHEN /gi, "~::~" + e + "WHEN ").replace(/ WHERE /gi, "~::~WHERE ").replace(/ WITH /gi, "~::~WITH ").replace(/ ALL /gi, " ALL ").replace(/ AS /gi, " AS ").replace(/ ASC /gi, " ASC ").replace(/ DESC /gi, " DESC ").replace(/ DISTINCT /gi, " DISTINCT ").replace(/ EXISTS /gi, " EXISTS ").replace(/ NOT /gi, " NOT ").replace(/ NULL /gi, " NULL ").replace(/ LIKE /gi, " LIKE ").replace(/\s{0,}SELECT /gi, "SELECT ").replace(/\s{0,}UPDATE /gi, "UPDATE ").replace(/ SET /gi, " SET ").replace(/~::~{1,}/g, "~::~").split("~::~")
    }
    e.prototype.xml = function(e, n) {
        var i = e.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split("~::~"), s = i.length, o = !1, r = 0, a = "", l = 0, c = n ? t(n) : this.shift;
        for (l = 0; s > l; l++)
            i[l].search(/<!/) > -1 ? (a += c[r] + i[l], o = !0, (i[l].search(/-->/) > -1 || i[l].search(/\]>/) > -1 || i[l].search(/!DOCTYPE/) > -1) && (o = !1)) : i[l].search(/-->/) > -1 || i[l].search(/\]>/) > -1 ? (a += i[l], o = !1) : /^<\w/.exec(i[l - 1]) && /^<\/\w/.exec(i[l]) && /^<[\w:\-\.\,]+/.exec(i[l - 1]) == /^<\/[\w:\-\.\,]+/.exec(i[l])[0].replace("/", "") ? (a += i[l], o || r--) : i[l].search(/<\w/) > -1 && -1 == i[l].search(/<\//) && -1 == i[l].search(/\/>/) ? a = a += o ? i[l] : c[r++] + i[l] : i[l].search(/<\w/) > -1 && i[l].search(/<\//) > -1 ? a = a += o ? i[l] : c[r] + i[l] : i[l].search(/<\//) > -1 ? a = a += o ? i[l] : c[--r] + i[l] : i[l].search(/\/>/) > -1 ? a = a += o ? i[l] : c[r] + i[l] : a += i[l].search(/<\?/) > -1 ? c[r] + i[l] : i[l].search(/xmlns\:/) > -1 || i[l].search(/xmlns\=/) > -1 ? c[r] + i[l] : i[l];
        return "\n" == a[0] ? a.slice(1) : a
    }, e.prototype.json = function(t, e) {
        var e = e ? e : this.step;
        return "undefined" == typeof JSON ? t : "string" == typeof t ? JSON.stringify(JSON.parse(t), null, e) : "object" == typeof t ? JSON.stringify(t, null, e) : t
    }, e.prototype.css = function(e, n) {
        var i = e.replace(/\s{1,}/g, " ").replace(/\{/g, "{~::~").replace(/\}/g, "~::~}~::~").replace(/\;/g, ";~::~").replace(/\/\*/g, "~::~/*").replace(/\*\//g, "*/~::~").replace(/~::~\s{0,}~::~/g, "~::~").split("~::~"), s = i.length, o = 0, r = "", a = 0, l = n ? t(n) : this.shift;
        for (a = 0; s > a; a++)
            r += /\{/.exec(i[a]) ? l[o++] + i[a] : /\}/.exec(i[a]) ? l[--o] + i[a] : /\*\\/.exec(i[a]) ? l[o] + i[a] : l[o] + i[a];
        return r.replace(/^\n{1,}/, "")
    }, e.prototype.sql = function(e, s) {
        var o = e.replace(/\s{1,}/g, " ").replace(/\'/gi, "~::~'").split("~::~"), r = o.length, a = [], l = 0, c = this.step, u = 0, d = "", h = 0, p = s ? t(s) : this.shift;
        for (h = 0; r > h; h++)
            a = a.concat(h % 2 ? o[h] : i(o[h], c));
        for (r = a.length, h = 0; r > h; h++) {
            u = n(a[h], u), /\s{0,}\s{0,}SELECT\s{0,}/.exec(a[h]) && (a[h] = a[h].replace(/\,/g, ",\n" + c + c)), /\s{0,}\s{0,}SET\s{0,}/.exec(a[h]) && (a[h] = a[h].replace(/\,/g, ",\n" + c + c)), /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(a[h]) ? (l++, d += p[l] + a[h]) : /\'/.exec(a[h]) ? (1 > u && l && l--, d += a[h]) : (d += p[l] + a[h], 1 > u && l && l--)
        }
        return d = d.replace(/^\n{1,}/, "").replace(/\n{1,}/g, "\n")
    }, e.prototype.xmlmin = function(t, e) {
        var n = e ? t : t.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "").replace(/[ \r\n\t]{1,}xmlns/g, " xmlns");
        return n.replace(/>\s{0,}</g, "><")
    }, e.prototype.jsonmin = function(t) {
        return "undefined" == typeof JSON ? t : JSON.stringify(JSON.parse(t), null, 0)
    }, e.prototype.cssmin = function(t, e) {
        var n = e ? t : t.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");
        return n.replace(/\s{1,}/g, " ").replace(/\{\s{1,}/g, "{").replace(/\}\s{1,}/g, "}").replace(/\;\s{1,}/g, ";").replace(/\/\*\s{1,}/g, "/*").replace(/\*\/\s{1,}/g, "*/")
    }, e.prototype.sqlmin = function(t) {
        return t.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")")
    }, window.vkbeautify = new e
}(), window.SL = function(t) {
    t = t.split(".");
    for (var e = SL; t.length; ) {
        var n = t.shift();
        e[n] || (e[n] = {}), e = e[n]
    }
    return e
}, $(function() {
    function t() {
        e(), SL.settings.init(), SL.keyboard.init(), SL.pointer.init(), SL.warnings.init(), "undefined" == typeof SLConfig && (window.SLConfig = {}), n(), i(), s()
    }
    function e() {
        var t = $("html");
        t.addClass("loaded"), SL.util.device.HAS_TOUCH && t.addClass("touch"), SL.util.device.isChrome() ? t.addClass("ua-chrome") : SL.util.device.isSafari() ? t.addClass("ua-safari") : SL.util.device.isIE() && t.addClass("ua-ie")
    }
    function n() {
        "object" == typeof window.SLConfig && (SLConfig.deck && !SLConfig.deck.notes && (SLConfig.deck.notes = {}), SL.current_user = new SL.models.User(SLConfig.current_user), "object" == typeof SLConfig.deck && (SL.current_deck = new SL.models.Deck(SLConfig.deck)), "object" == typeof SLConfig.team && (SL.current_team = new SL.models.Team(SLConfig.team)))
    }
    function i() {
        if (document.querySelector(".fb-like") && ($("body").append('<div id="fb-root"></div>'), function(t, e, n) {
            var i, s = t.getElementsByTagName(e)[0];
            t.getElementById(n) || (i = t.createElement(e), i.id = n, i.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=178466085544080", s.parentNode.insertBefore(i, s))
        }(document, "script", "facebook-jssdk")), document.querySelector(".twitter-share-button") && !function(t, e, n) {
            var i, s = t.getElementsByTagName(e)[0];
            t.getElementById(n) || (i = t.createElement(e), i.id = n, i.src = "//platform.twitter.com/widgets.js", s.parentNode.insertBefore(i, s))
        }(document, "script", "twitter-wjs"), document.querySelector(".g-plusone")) {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://apis.google.com/js/plusone.js";
            var e = document.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(t, e)
        }
    }
    function s() {
        var t = $("html");
        SL.util.hideAddressBar(), t.hasClass("home index") && (SL.view = new SL.views.home.Index), SL.view = t.hasClass("home explore") ? new SL.views.home.Explore : t.hasClass("users show") ? new SL.views.users.Show : t.hasClass("decks show") ? new SL.views.decks.Show : t.hasClass("decks edit") ? new SL.editor.Editor : t.hasClass("decks edit-requires-upgrade") ? new SL.views.decks.EditRequiresUpgrade : t.hasClass("decks embed") ? new SL.views.decks.Embed : t.is(".decks.live-client") ? new SL.views.decks.LiveClient : t.is(".decks.live-server") ? new SL.views.decks.LiveServer : t.hasClass("decks speaker") ? new SL.views.decks.Speaker : t.hasClass("decks fullscreen") ? new SL.views.decks.Fullscreen : t.hasClass("teams-subscriptions-show") ? new SL.views.teams.subscriptions.Show : t.hasClass("registrations") && (t.hasClass("edit") || t.hasClass("update")) ? new SL.views.devise.Edit : t.hasClass("registrations") || t.hasClass("team_registrations") || t.hasClass("sessions") || t.hasClass("passwords") ? new SL.views.devise.All : t.hasClass("subscriptions new") || t.hasClass("subscriptions edit") ? new SL.views.subscriptions.New : t.hasClass("subscriptions show") ? new SL.views.subscriptions.Show : t.hasClass("subscriptions edit_period") ? new SL.views.subscriptions.EditPeriod : t.hasClass("teams-signup") ? new SL.views.teams.New : t.hasClass("teams edit") ? new SL.views.teams.teams.Edit : t.hasClass("teams edit_members") ? new SL.views.teams.teams.EditMembers : t.hasClass("teams show") ? new SL.views.teams.teams.Show : t.hasClass("themes edit") ? new SL.views.themes.Edit : t.hasClass("themes preview") ? new SL.views.themes.Preview : t.hasClass("pricing") ? new SL.views.statik.Pricing : t.hasClass("static") ? new SL.views.statik.All : new SL.views.Base, Placement.sync()
    }
    setTimeout(t, 1)
}), SL("models").Collection = Class.extend({init: function(t, e) {
        if (this.data = t || [], this.factory = e, this.changed = new signals.Signal, "function" == typeof this.factory) {
            var n = this.data;
            this.data = [];
            for (var i = 0, s = n.length; s > i; i++) {
                var o = n[i];
                this.data.push(o instanceof this.factory ? n[i] : new this.factory(n[i]))
            }
        }
    },find: function(t) {
        for (var e = 0, n = this.data.length; n > e; e++) {
            var i = this.data[e];
            if (i === t)
                return e
        }
        return -1
    },findByProperties: function(t) {
        for (var e = 0, n = this.data.length; n > e; e++) {
            var i = this.data[e], s = !0;
            for (var o in t)
                t.hasOwnProperty(o) && ("function" == typeof i.get ? i.get(o) != t[o] && (s = !1) : i[o] != t[o] && (s = !1));
            if (s)
                return e
        }
        return -1
    },getByProperties: function(t) {
        return this.data[this.findByProperties(t)]
    },remove: function(t) {
        for (var e, n = 0; n < this.data.length; n++)
            this.data[n] === t && (e = this.data.splice(n, 1), n--);
        e && this.changed.dispatch()
    },removeByProperties: function(t) {
        for (var e, n = this.findByProperties(t), i = 0; -1 !== n && i++ < 1e3; )
            e = this.data.splice(n, 1), n = this.findByProperties(t);
        e && this.changed.dispatch()
    },removeByIndex: function(t) {
        var e = this.data.splice(t, 1);
        return this.changed.dispatch(), e
    },create: function(t, e) {
        if (e = $.extend({prepend: !1}, e), "function" == typeof this.factory) {
            var n = new this.factory(t);
            return e.prepend ? this.unshift(n) : this.push(n), this.changed.dispatch(), n
        }
    },clear: function() {
        this.data.length = 0, this.changed.dispatch()
    },swap: function(t, e) {
        var n = "number" == typeof t && t >= 0 && t < this.size(), i = "number" == typeof e && e >= 0 && e < this.size();
        if (n && i) {
            var s = this.data[t], o = this.data[e];
            this.data[t] = o, this.data[e] = s
        }
        this.changed.dispatch()
    },shiftLeft: function(t) {
        "number" == typeof t && t > 0 && this.swap(t, t - 1)
    },shiftRight: function(t) {
        "number" == typeof t && t < this.size() - 1 && this.swap(t, t + 1)
    },at: function(t) {
        return this.data[t]
    },first: function() {
        return this.at(0)
    },last: function() {
        return this.at(this.size() - 1)
    },size: function() {
        return this.data.length
    },isEmpty: function() {
        return 0 === this.size()
    },getUniqueName: function(t, e) {
        var n = t, i = {};
        i[e] = n;
        for (var s = 2; this.get(i); )
            n = t + " " + s, i[e] = n, s += 1;
        return n
    },toJSON: function() {
        return this.map(function(t) {
            return "function" == typeof t.toJSON ? t.toJSON() : t
        })
    },destroy: function() {
        this.changed.dispose(), this.data = null
    },unshift: function(t) {
        return this.data.unshift(t)
    },push: function(t) {
        return this.data.push(t)
    },pop: function() {
        return this.data.pop()
    },map: function(t) {
        return this.data.map(t)
    },forEach: function(t) {
        return this.data.forEach(t)
    }}), SL("models").Model = Class.extend({init: function(t) {
        this.data = t || {}
    },set: function(t, e) {
        this.data[t] = e
    },get: function(t) {
        if ("string" == typeof t && /\./.test(t)) {
            for (var e = t.split("."), n = this.data; e.length && n; )
                t = e.shift(), n = n[t];
            return n
        }
        return this.data[t]
    },has: function(t) {
        var e = this.get(t);
        return !!e || e === !1 || 0 === e
    },toJSON: function() {
        return JSON.parse(JSON.stringify(this.data))
    }}), SL("models").Customer = SL.models.Model.extend({init: function(t) {
        this._super(t)
    },isTrial: function() {
        return "trialing" === this.get("subscription.status")
    },hasActiveSubscription: function() {
        return !this.get("subscription.cancel_at_period_end")
    },getNextInvoiceDate: function() {
        return this.get("next_charge")
    },getNextInvoiceSum: function() {
        return (parseFloat(this.get("next_charge_amount")) / 100).toFixed(2)
    },clone: function() {
        return new SL.models.Customer(JSON.parse(JSON.stringify(this.data)))
    }}), SL("models").Deck = SL.models.Model.extend({init: function(t) {
        this.data = t || {}, $.extend(this, this.data), this.user_settings = new SL.models.UserSettings(this.data.user.settings)
    },isPro: function() {
        return this.data.user ? !!this.data.user.pro : !1
    },isPrivate: function() {
        var t = SL.current_deck.get("visibility");
        return t === SL.models.Deck.VISIBILITY_SELF || t === SL.models.Deck.VISIBILITY_TEAM
    },getAbsoluteURL: function(t) {
        var e = document.location.protocol + "//" + document.location.host + SL.routes.DECK(this.get("user").username, this.get("slug"));
        return t && (e += "/" + t), e
    },getTokenedAbsoluteURL: function(t) {
        var e = this.getAbsoluteURL(t);
        return this.isPrivate() && (e += "?token=" + this.get("access_token")), e
    },clone: function() {
        return new SL.models.Deck(JSON.parse(JSON.stringify(this.data)))
    }}), SL("models").Deck.VISIBILITY_SELF = "self", SL("models").Deck.VISIBILITY_TEAM = "team", SL("models").Deck.VISIBILITY_ALL = "all", SL("models").Team = SL.models.Model.extend({init: function(t) {
        if (this._super(t), "object" == typeof this.data.themes)
            for (var e = 0, n = this.data.themes.length; n > e; e++)
                this.data.themes[e] = new SL.models.Theme(this.data.themes[e]);
        this.set("themes", new SL.models.Collection(this.data.themes))
    },hasThemes: function() {
        var t = this.get("themes");
        return t && t.size() > 0
    },clone: function() {
        return new SL.models.Team(JSON.parse(JSON.stringify(this.data)))
    }}), SL("models").Template = SL.models.Model.extend({init: function(t) {
        this._super(t)
    }}), SL("models").ThemeSnippet = SL.models.Model.extend({init: function(t) {
        this._super(t), this.has("title") || this.set("title", ""), this.has("template") || this.set("template", "")
    },templatize: function(t) {
        var e = this.get("template");
        return e && (e = e.split(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG).join(""), t.forEach(function(t) {
            e = e.replace(t.string, t.value || t.defaultValue)
        })), e
    },getTemplateVariables: function() {
        var t = this.get("template");
        if (t) {
            t = t.split(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG).join("");
            var e = t.match(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_REGEX);
            if (e)
                return e = e.map(function(t) {
                    var e = t.split(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_DIVIDER), n = {string: t,label: e[0] || "",defaultValue: e[1] || ""};
                    return n.label = n.label.trim(), n.defaultValue = n.defaultValue.trim(), n.label = n.label.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_OPENER, ""), n.label = n.label.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_CLOSER, ""), n.defaultValue = n.defaultValue.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_OPENER, ""), n.defaultValue = n.defaultValue.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_CLOSER, ""), n
                })
        }
        return []
    },templateHasVariables: function() {
        return this.getTemplateVariables().length > 0
    },templateHasSelection: function() {
        var t = this.get("template");
        return t ? t.indexOf(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG) > -1 : !1
    },isEmpty: function() {
        return !this.get("title") && !this.get("template")
    }}), SL.models.ThemeSnippet.TEMPLATE_VARIABLE_OPENER = "{{", SL.models.ThemeSnippet.TEMPLATE_VARIABLE_CLOSER = "}}", SL.models.ThemeSnippet.TEMPLATE_VARIABLE_DIVIDER = "::", SL.models.ThemeSnippet.TEMPLATE_VARIABLE_REGEX = /\{\{.*?\}\}/gi, SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG = "{{selection}}", SL("models").Theme = SL.models.Model.extend({init: function(t) {
        if (this._super(t), this.has("name") || this.set("name", "Untitled"), this.has("font") || this.set("font", SL.config.DEFAULT_THEME_FONT), this.has("color") || this.set("color", SL.config.DEFAULT_THEME_COLOR), this.has("transition") || this.set("transition", SL.config.DEFAULT_THEME_TRANSITION), this.has("background_transition") || this.set("background_transition", SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION), "string" == typeof this.data.snippets && this.data.snippets.length > 0)
            try {
                this.data.snippets = JSON.parse(this.data.snippets)
            } catch (e) {
                console.warn("Malformed snippets JSON")
            }
        this.set("snippets", new SL.models.Collection(this.data.snippets, SL.models.ThemeSnippet)), "string" == typeof this.data.palette && this.data.palette.length > 0 ? (this.data.palette = this.data.palette.split(","), this.data.palette = this.data.palette.map(function(t) {
            return t.trim()
        })) : this.data.palette = []
    },hasThumbnail: function() {
        return !!this.get("thumbnail_url")
    },hasJavaScript: function() {
        return !!this.get("js")
    },hasPalette: function() {
        return this.get("palette").length > 0
    },isTransitionDeprecated: function() {
        var t = this.get("transition");
        return SL.config.THEME_TRANSITIONS.some(function(e) {
            return e.id === t && e.deprecated === !0
        })
    },isBackgroundTransitionDeprecated: function() {
        var t = this.get("background_transition");
        return SL.config.THEME_BACKGROUND_TRANSITIONS.some(function(e) {
            return e.id === t && e.deprecated === !0
        })
    },clone: function() {
        return new SL.models.Theme(JSON.parse(JSON.stringify(this.toJSON())))
    },toJSON: function() {
        return {id: this.get("id"),name: this.get("name"),center: this.get("center"),rolling_links: this.get("rolling_links"),font: this.get("font"),color: this.get("color"),transition: this.get("transition"),background_transition: this.get("background_transition"),html: this.get("html"),less: this.get("less"),css: this.get("css"),js: this.get("js"),snippets: JSON.stringify(this.get("snippets").toJSON()),palette: this.get("palette").join(",")}
    }}), SL("models").Theme.fromDeck = function(t) {
    return new SL.models.Theme({id: t.theme_id,name: "",center: t.center,rolling_links: t.rolling_links,font: t.theme_font,color: t.theme_color,transition: t.transition,background_transition: t.background_transition,snippets: "",palette: []})
}, SL("models").UserSettings = SL.models.Model.extend({init: function(t) {
        this._super(t), this.has("present_controls") || this.set("present_controls", SL.config.PRESENT_CONTROLS_DEFAULT), this.has("present_upsizing") || this.set("present_upsizing", SL.config.PRESENT_UPSIZING_DEFAULT)
    },save: function(t) {
        var e = {user_settings: {}};
        return t ? t.forEach(function(t) {
            e.user_settings[t] = this.get(t)
        }.bind(this)) : e.user_settings = this.toJSON(), $.ajax({url: SL.config.AJAX_UPDATE_USER_SETTINGS,type: "PUT",data: e})
    },clone: function() {
        return new SL.models.UserSettings(JSON.parse(JSON.stringify(this.data)))
    }}), SL("models").User = Class.extend({init: function(t) {
        this.data = t || {}, $.extend(this, this.data), this.settings = new SL.models.UserSettings(this.data.settings)
    },isPro: function() {
        return !!this.pro
    },isEnterprise: function() {
        return !!this.enterprise
    },isEnterpriseManager: function() {
        return !!this.enterprise_manager
    },get: function(t) {
        return this[t]
    },set: function(t, e) {
        this[t] = e
    },has: function(t) {
        var e = this.get(t);
        return !!e || e === !1 || 0 === e
    },hasThemes: function() {
        return SL.current_team ? SL.current_team.hasThemes() : void 0
    },getThemes: function() {
        return SL.current_team ? SL.current_team.get("themes") : new SL.models.Collection
    },hasDefaultTheme: function() {
        return !!this.getDefaultTheme()
    },getDefaultTheme: function() {
        var t = this.getThemes();
        return t.getByProperties(SL.current_team ? {id: SL.current_team.get("default_theme_id")} : {id: this.default_theme_id})
    },getProfileURL: function() {
        return "/" + this.username
    }}), SL.util = {getQuery: function() {
        var t = {};
        return location.search.replace(/[A-Z0-9]+?=([\w%]*)/gi, function(e) {
            t[e.split("=").shift()] = unescape(e.split("=").pop())
        }), t
    },getMetaKeyName: function() {
        return SL.util.device.isOSX() ? "&#8984" : "CTRL"
    },escapeHTMLEntities: function(t) {
        return t = t || "", t = t.split("<").join("&lt;"), t = t.split(">").join("&gt;")
    },unescapeHTMLEntities: function(t) {
        var e = document.createElement("div");
        e.innerHTML = t || "";
        var n = 0 === e.childNodes.length ? "" : e.childNodes[0].nodeValue;
        return n || ""
    },toArray: function(t) {
        for (var e = [], n = 0, i = t.length; i > n; n++)
            e.push(t[n]);
        return e
    },skipCSSTransitions: function(t, e) {
        t = $(t ? t : "html");
        var n = typeof t.get(0);
        ("undefined" === n || "number" === n) && console.warn("Bad target for skipCSSTransitions."), t.addClass("no-transition"), setTimeout(function() {
            t.removeClass("no-transition")
        }, e || 1)
    },setupReveal: function(t) {
        if ("undefined" != typeof Reveal) {
            var e = {controls: !0,progress: !0,history: !1,mouseWheel: !1,margin: .05,autoSlideStoppable: !0,dependencies: [{src: SL.config.ASSET_URLS["reveal-plugins/markdown/marked.js"],condition: function() {
                            return !!document.querySelector(".reveal [data-markdown]")
                        }}, {src: SL.config.ASSET_URLS["reveal-plugins/markdown/markdown.js"],condition: function() {
                            return !!document.querySelector(".reveal [data-markdown]")
                        }}, {src: SL.config.ASSET_URLS["reveal-plugins/highlight/highlight.js"],async: !0,condition: function() {
                            return !!document.querySelector(".reveal pre code")
                        },callback: function() {
                            hljs.initHighlightingOnLoad()
                        }}]};
            if (SLConfig && SLConfig.deck && (e.autoSlide = SLConfig.deck.auto_slide_interval || 0, e.rollingLinks = SLConfig.deck.rolling_links, e.center = SLConfig.deck.center, e.loop = SLConfig.deck.should_loop, e.rtl = SLConfig.deck.rtl, e.transition = SLConfig.deck.transition || "default", e.backgroundTransition = SLConfig.deck.background_transition), $.extend(e, t), Reveal.initialize(e), Reveal.addEventListener("ready", function() {
                window.STATUS = window.STATUS || {}, window.STATUS.REVEAL_IS_READY = !0, $("html").addClass("reveal-is-ready")
            }), t && t.openLinksInTabs && this.openLinksInTabs($(".reveal .slides")), t && t.trackEvents && Reveal.isReady() && Reveal.getTotalSlides() > 2) {
                var n = [];
                Reveal.addEventListener("slidechanged", function() {
                    var t = Reveal.getProgress();
                    t >= .5 && !n[0] && (n[0] = !0, SL.analytics.trackPresenting("Presentation progress: 50%")), t >= 1 && !n[1] && (n[1] = !0, SL.analytics.trackPresenting("Presentation progress: 100%"))
                })
            }
            SL.util.deck.injectNotes()
        }
    },openLinksInTabs: function(t) {
        t && t.find("a").each(function() {
            var t = $(this), e = t.attr("href");
            /^#/gi.test(e) === !0 ? t.removeAttr("target") : /http|www/gi.test(e) ? t.attr("target", "_blank") : t.attr("target", "_top")
        })
    },openPopupWindow: function(t, e, n, i) {
        var s = screen.width / 2 - n / 2, o = screen.height / 2 - i / 2;
        return window.open(t, e, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + n + ", height=" + i + ", top=" + o + ", left=" + s)
    },layoutReveal: function(t, e) {
        if (clearInterval(this.revealLayoutInterval), clearTimeout(this.revealLayoutTimeout), 1 === arguments.length)
            this.revealLayoutTimeout = setTimeout(Reveal.layout, t);
        else {
            if (2 !== arguments.length)
                throw "Illegal arguments, expected (duration[, fps])";
            this.revealLayoutInterval = setInterval(Reveal.layout, e), this.revealLayoutTimeout = setTimeout(function() {
                clearInterval(this.revealLayoutInterval)
            }.bind(this), t)
        }
    },getRevealSlideBounds: function(t, e) {
        t = t || SL.editor.controllers.Markup.getCurrentSlide();
        var n = t.offset(), i = Reveal.getScale(), s = n.left * i, o = n.top * i;
        if (e) {
            var r = $(".projector").offset();
            r && (s -= r.left, o -= r.top)
        }
        return {x: s,y: o,width: t.outerWidth() * i,height: t.outerHeight() * i}
    },getRevealSlidesBounds: function(t) {
        var e = $(".reveal .slides"), n = e.offset(), i = Reveal.getScale(), s = n.left * i, o = n.top * i;
        if (t) {
            var r = $(".projector").offset();
            r && (s -= r.left, o -= r.top)
        }
        return {x: s,y: o,width: e.outerWidth() * i,height: e.outerHeight() * i}
    },getRevealElementOffset: function(t, e) {
        t = $(t);
        var n = {x: 0,y: 0};
        if (t.parents("section").length)
            for (; t.length && !t.is("section"); )
                n.x += t.get(0).offsetLeft, n.y += t.get(0).offsetTop, e && (n.x -= parseInt(t.css("margin-left"), 10), n.y -= parseInt(t.css("margin-top"), 10)), t = $(t.get(0).offsetParent);
        return n
    },getRevealElementGlobalOffset: function(t) {
        var e = $(t), n = e.closest(".reveal"), i = {x: 0,y: 0};
        if (e.length && n.length) {
            var s = Reveal.getConfig(), o = Reveal.getScale(), r = n.get(0).getBoundingClientRect(), a = {x: r.left + r.width / 2,y: r.top + r.height / 2}, l = s.width * o, c = s.height * o;
            i.x = a.x - l / 2, i.y = a.y - c / 2;
            var u = e.closest(".slides section");
            u.length && (i.y -= u.scrollTop() * o);
            var d = SL.util.getRevealElementOffset(e);
            i.x += d.x * o, i.y += d.y * o
        }
        return i
    },getRevealCounterScale: function() {
        return window.Reveal ? 2 - Reveal.getScale() : 1
    },globalToRevealCoordinate: function(t, e) {
        var n = SL.util.getRevealSlideBounds(), i = SL.util.getRevealCounterScale();
        return {x: (t - n.x) * i,y: (e - n.y) * i}
    },globalToProjectorCoordinate: function(t, e) {
        var n = {x: t,y: e}, i = $(".projector").offset();
        return i && (n.x -= i.left, n.y -= i.top), n
    },hideAddressBar: function() {
        if (SL.util.device.IS_PHONE && !/crios/gi.test(navigator.userAgent)) {
            var t = function() {
                setTimeout(function() {
                    window.scrollTo(0, 1)
                }, 10)
            };
            $(window).on("orientationchange", function() {
                t()
            }), t()
        }
    },callback: function() {
        "function" == typeof arguments[0] && arguments[0].apply(null, [].slice.call(arguments, 1))
    },getPlaceholderImage: function(t) {
        var e = "";
        return t && "function" == typeof window.btoa && (e = window.btoa(Math.random().toString()).replace(/=/g, "")), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" + e
    },isTypingEvent: function(t) {
        return $(t.target).is('input:not([type="file"]), textarea, [contenteditable]')
    }}, SL.util.user = {isLoggedIn: function() {
        return "object" == typeof SLConfig && "object" == typeof SLConfig.current_user
    },isPro: function() {
        return SL.util.user.isLoggedIn() ? SLConfig.current_user.pro : null
    },isEnterprise: function() {
        return SL.util.user.isLoggedIn() ? SLConfig.current_user.enterprise : null
    }}, SL.util.device = {HAS_TOUCH: !!("ontouchstart" in window),IS_PHONE: /iphone|ipod|android|windows\sphone/gi.test(navigator.userAgent),IS_TABLET: /ipad/gi.test(navigator.userAgent),isOSX: function() {
        return /Mac OS X/.test(navigator.userAgent)
    },isIE: function() {
        return /MSIE\s[0-9]/gi.test(navigator.userAgent) || /Trident\/7.0;(.*)rv:\d\d/.test(navigator.userAgent)
    },isChrome: function() {
        return /chrome/gi.test(navigator.userAgent)
    },isSafari: function() {
        return /safari/gi.test(navigator.userAgent) && !SL.util.device.isChrome()
    },isSafariDesktop: function() {
        return SL.util.device.isSafari() && !SL.util.device.isChrome() && !SL.util.device.IS_PHONE && !SL.util.device.IS_TABLET
    },isOpera: function() {
        return !!window.opera
    },isPhantomJS: function() {
        return /PhantomJS/gi.test(navigator.userAgent)
    },supportedByEditor: function() {
        return Modernizr.history && Modernizr.csstransforms && !SL.util.device.isOpera()
    }}, SL.util.trig = {distanceBetween: function(t, e) {
        var n = t.x - e.x, i = t.y - e.y;
        return Math.sqrt(n * n + i * i)
    },intersection: function(t, e) {
        return {width: Math.max(0, Math.min(t.x + t.width, e.x + e.width) - Math.max(t.x, e.x)),height: Math.max(0, Math.min(t.y + t.height, e.y + e.height) - Math.max(t.y, e.y))}
    },intersects: function(t, e, n) {
        "undefined" == typeof n && (n = 0);
        var i = SL.util.trig.intersection(t, e);
        return i.width > t.width * n && i.height > t.height * n
    }}, SL.util.string = {URL_REGEX: /((https?\:\/\/)|(www\.)|(\/\/))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,SCRIPT_TAG_REGEX: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,uniqueIDCount: 0,uniqueID: function(t) {
        return SL.util.string.uniqueIDCount += 1, (t || "") + SL.util.string.uniqueIDCount + "-" + Date.now()
    },slug: function(t) {
        return "string" == typeof t ? (t = SL.util.string.trim(t), t = t.toLowerCase(), t = t.replace(/-/g, " "), t = t.replace(/[^\w\s]/g, ""), t = t.replace(/\s{2,}/g, " "), t = t.replace(/\s/g, "-")) : ""
    },trim: function(t) {
        return SL.util.string.trimRight(SL.util.string.trimLeft(t))
    },trimLeft: function(t) {
        return "string" == typeof t ? t.replace(/^\s+/, "") : ""
    },trimRight: function(t) {
        return "string" == typeof t ? t.replace(/\s+$/, "") : ""
    },linkify: function(t) {
        return t && (t = t.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(t) {
            var e = t;
            return e.match("^https?://") || (e = "http://" + e), '<a href="' + e + '">' + t + "</a>"
        })), t
    },pluralize: function(t, e, n) {
        return n ? t + e : t
    },getCustomClassesFromLESS: function(t) {
        var e = (t || "").match(/\/\/=[a-z0-9-_ \t]{2,}(?=\n)?/gi);
        return e ? e.map(function(t) {
            return t = t.replace("//=", ""), t = t.trim(), t = t.toLowerCase(), t = t.replace(/\s/g, "-")
        }) : []
    }}, SL.util.validate = {name: function() {
        return []
    },slug: function(t) {
        t = t || "";
        var e = [];
        return t.length < 2 && e.push("At least 2 characters"), /\s/gi.test(t) && e.push("No spaces please"), /^[\w-_]+$/gi.test(t) || e.push("Can only contain: A-Z, 0-9, - and _"), e
    },username: function(t) {
        return SL.util.validate.slug(t)
    },team_slug: function(t) {
        return SL.util.validate.slug(t)
    },password: function(t) {
        t = t || "";
        var e = [];
        return t.length < 6 && e.push("At least 6 characters"), e
    },email: function(t) {
        t = t || "";
        var e = [];
        return /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$/gi.test(t) || e.push("Please enter a valid email"), e
    },twitterhandle: function(t) {
        t = t || "";
        var e = [];
        return t.length > 15 && e.push("15 characters max"), /\s/gi.test(t) && e.push("No spaces please"), /^[\w-_]+$/gi.test(t) || e.push("Can only contain: A-Z, 0-9 and _"), e
    },url: function(t) {
        t = t || "";
        var e = [];
        return t.length < 4 && e.push("Please enter a valid URL"), /\s/gi.test(t) && e.push("No spaces please"), e
    },decktitle: function(t) {
        t = t || "";
        var e = [];
        return 0 === t.length && e.push("Can not be empty"), e
    },deckslug: function(t) {
        t = t || "";
        var e = [];
        return 0 === t.length && e.push("Can not be empty"), e
    },google_analytics_id: function(t) {
        t = t || "";
        var e = [];
        return /\bUA-\d{4,20}-\d{1,10}\b/gi.test(t) || e.push("Please enter a valid ID"), e
    },none: function() {
        return []
    }}, SL.util.dom = {scrollIntoViewIfNeeded: function(t) {
        t && ("function" == typeof t.scrollIntoViewIfNeeded ? t.scrollIntoViewIfNeeded.apply(t, [].slice.call(arguments, 1)) : "function" == typeof t.scrollIntoView && t.scrollIntoView())
    },insertCSRF: function(t, e) {
        "undefined" == typeof e && (e = $('meta[name="csrf-token"]').attr("content")), e && (t.find('input[name="authenticity_token"]').remove(), t.append('<input name="authenticity_token" type="hidden" value="' + e + '" />'))
    }}, SL.util.html = {indent: function(t) {
        var e = vkbeautify.xml(t);
        return e = e.replace(/<pre>[\n\r\t\s]+<code/gi, "<pre><code"), e = e.replace(/<\/code>[\n\r\t\s]+<\/pre>/gi, "</code></pre>")
    },ATTR_SRC_NORMAL: "src",ATTR_SRC_SILENCED: "data-silenced-src",ATTR_SRC_NORMAL_REGEX: " src=",ATTR_SRC_SILENCED_REGEX: " data-silenced-src=",muteSources: function(t) {
        return (t || "").replace(new RegExp(SL.util.html.ATTR_SRC_NORMAL_REGEX, "gi"), SL.util.html.ATTR_SRC_SILENCED_REGEX)
    },unmuteSources: function(t) {
        return (t || "").replace(new RegExp(SL.util.html.ATTR_SRC_SILENCED_REGEX, "gi"), SL.util.html.ATTR_SRC_NORMAL_REGEX)
    },trimCode: function(t) {
        $(t).find("pre code").each(function() {
            var t = $(this).parent("pre"), e = t.html(), n = $.trim(e);
            e !== n && t.html(n)
        })
    },removeAttributes: function(t, e) {
        t = $(t);
        var n = $.map(t.get(0).attributes, function(t) {
            return t.name
        });
        "function" == typeof e && (n = n.filter(e)), $.each(n, function(e, n) {
            t.removeAttr(n)
        })
    },removeClasses: function(t, e) {
        if (t = $(t), "function" == typeof e) {
            var n = (t.attr("class") || "").split(" ").filter(e);
            t.removeClass(n.join(" "))
        } else
            t.attr("class", "")
    },findScriptTags: function(t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = SL.util.toArray(e.getElementsByTagName("script"));
        return n.map(function(t) {
            return t.outerHTML
        })
    },removeScriptTags: function(t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = SL.util.toArray(e.getElementsByTagName("script"));
        return n.forEach(function(t) {
            t.parentNode.removeChild(t)
        }), e.innerHTML
    },createSpinner: function(t) {
        return t = $.extend({lines: 12,radius: 8,length: 6,width: 3,color: "#fff",zIndex: "auto",left: "0",top: "0",className: ""}, t), new Spinner(t)
    },generateSpinners: function() {
        $(".spinner").each(function(t, e) {
            if (e.hasAttribute("data-spinner-state") === !1) {
                e.setAttribute("data-spinner-state", "spinning");
                var n = {};
                e.hasAttribute("data-spinner-color") && (n.color = e.getAttribute("data-spinner-color")), e.hasAttribute("data-spinner-lines") && (n.lines = parseInt(e.getAttribute("data-spinner-lines"), 10)), e.hasAttribute("data-spinner-width") && (n.width = parseInt(e.getAttribute("data-spinner-width"), 10)), e.hasAttribute("data-spinner-radius") && (n.radius = parseInt(e.getAttribute("data-spinner-radius"), 10)), e.hasAttribute("data-spinner-length") && (n.length = parseInt(e.getAttribute("data-spinner-length"), 10));
                var i = SL.util.html.createSpinner(n);
                i.spin(e)
            }
        })
    },createDeckThumbnail: function(t) {
        var t = {DECK_URL: t.user.username + "/" + t.slug,DECK_VIEWS: "number" == typeof t.view_count ? t.view_count : "N/A",DECK_THUMB_URL: t.thumbnail_url || SL.config.DEFAULT_DECK_THUMBNAIL,USER_URL: "/" + t.user.username,USER_NAME: t.user.name || t.user.username,USER_THUMB_URL: t.user.thumbnail_url || SL.config.DEFAULT_USER_THUMBNAIL}, e = SL.config.DECK_THUMBNAIL_TEMPLATE;
        for (var n in t)
            e = e.replace("{{" + n + "}}", t[n]);
        return $(e)
    }}, SL.util.deck = {idCounter: 1,sortInjectedStyles: function() {
        var t = $("head");
        $("#theme-css-output").appendTo(t), $("#user-css-output").appendTo(t)
    },generateIdentifiers: function() {
        $(".reveal .slides section").each(function() {
            (this.hasAttribute("data-id") === !1 || 0 === this.getAttribute("data-id").length) && this.setAttribute("data-id", CryptoJS.MD5(["slide", SL.current_user.get("id"), SL.current_deck.get("id"), Date.now(), SL.util.deck.idCounter++].join("-")).toString())
        })
    },injectNotes: function() {
        SLConfig.deck && SLConfig.deck.notes && [].forEach.call(document.querySelectorAll(".reveal .slides section"), function(t) {
            var e = SLConfig.deck.notes[t.getAttribute("data-id")];
            e && "string" == typeof e && t.setAttribute("data-notes", e)
        })
    },getBackgroundColor: function() {
        var t = $(".reveal-viewport");
        if (t.length) {
            var e = t.css("background-color");
            if (window.Reveal && window.Reveal.isReady()) {
                var n = window.Reveal.getIndices(), i = window.Reveal.getSlideBackground(n.h, n.v);
                if (i) {
                    var s = i.style.backgroundColor;
                    s && window.tinycolor(s).getAlpha() > 0 && (e = s)
                }
            }
            if (e)
                return e
        }
        return "#ffffff"
    },getBackgroundContrast: function() {
        return SL.util.color.getContrast(SL.util.deck.getBackgroundColor())
    },getBackgroundBrightness: function() {
        return SL.util.color.getBrightness(SL.util.deck.getBackgroundColor())
    }}, SL.util.color = {getContrast: function(t) {
        var e = window.tinycolor(t).toRgb(), n = (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
        return n / 255
    },getBrightness: function(t) {
        var e = window.tinycolor(t).toRgb(), n = e.r / 255 * .3 + e.g / 255 * .59 + (e.b / 255 + .11);
        return n / 2
    }}, SL.util.anim = {collapseListItem: function(t, e, n) {
        t = $(t), t.addClass("no-transition"), t.css({overflow: "hidden"}), t.animate({opacity: 0,height: 0,minHeight: 0,paddingTop: 0,paddingBottom: 0,marginTop: 0,marginBottom: 0}, {duration: n || 500,complete: e})
    }}, SL.util.selection = {moveCursorToEnd: function(t) {
        if (t) {
            t.focus();
            var e = document.createRange();
            e.selectNodeContents(t), e.collapse(!1), selection = window.getSelection(), selection.removeAllRanges(), selection.addRange(e)
        }
    },selectText: function(t) {
        var e, n;
        document.body.createTextRange ? (e = document.body.createTextRange(), e.moveToElementText(t), e.select()) : window.getSelection && (n = window.getSelection(), e = document.createRange(), e.selectNodeContents(t), n.removeAllRanges(), n.addRange(e))
    },getSelectedElement: function() {
        var t = window.getSelection();
        return t && t.anchorNode ? t.anchorNode.parentNode : null
    },getSelectedTags: function() {
        var t = SL.util.selection.getSelectedElement(), e = [];
        if (t)
            for (; t; )
                e.push(t.nodeName.toLowerCase()), t = t.parentNode;
        return e
    },getSelectedHTML: function() {
        var t;
        if (document.selection && document.selection.createRange)
            return t = document.selection.createRange(), t.htmlText;
        if (window.getSelection) {
            var e = window.getSelection();
            if (e.rangeCount > 0) {
                t = e.getRangeAt(0);
                var n = t.cloneContents(), i = document.createElement("div");
                return i.appendChild(n), i.innerHTML
            }
        }
        return ""
    }}, "undefined" != typeof window.Spinner && "undefined" != typeof SL.util && SL.util.html.generateSpinners(), SL.analytics = {CATEGORY_OTHER: "other",CATEGORY_EDITOR: "editor",CATEGORY_THEMING: "theming",CATEGORY_PRESENTING: "presenting",_track: function(t, e, n) {
        "undefined" != typeof window.ga && ga("send", "event", t, e, n)
    },track: function(t, e) {
        this._track(SL.analytics.CATEGORY_OTHER, t, e)
    },trackEditor: function(t, e) {
        this._track(SL.analytics.CATEGORY_EDITOR, t, e)
    },trackTheming: function(t, e) {
        this._track(SL.analytics.CATEGORY_THEMING, t, e)
    },trackPresenting: function(t, e) {
        this._track(SL.analytics.CATEGORY_PRESENTING, t, e)
    }}, SL.config = {SLIDE_WIDTH: 960,SLIDE_HEIGHT: 700,LOGIN_STATUS_INTERVAL: 6e4,UNSAVED_CHANGES_INTERVAL: 1500,AUTOSAVE_INTERVAL: 4e3,DECK_TITLE_MAXLENGTH: 200,SPEAKER_NOTES_MAXLENGTH: 300,MAX_IMAGE_UPLOAD_SIZE: 1e4,MAX_IMPORT_UPLOAD_SIZE: 1e5,IMPORT_SOCKET_TIMEOUT: 24e4,PRESENT_CONTROLS_DEFAULT: !0,PRESENT_UPSIZING_DEFAULT: !0,PRESENT_UPSIZING_MAX_SCALE: 10,DEFAULT_THEME_COLOR: "white-blue",DEFAULT_THEME_FONT: "montserrat",DEFAULT_THEME_TRANSITION: "slide",DEFAULT_THEME_BACKGROUND_TRANSITION: "slide",AUTO_SLIDE_OPTIONS: [2, 4, 6, 8, 10, 15, 20, 30, 40],THEME_COLORS: [{id: "white-blue"}, {id: "black-blue"}, {id: "sand-blue"}, {id: "beige-brown"}, {id: "sky-blue"}, {id: "silver-green"}, {id: "silver-blue"}, {id: "grey-blue"}, {id: "black-mint"}, {id: "black-orange"}, {id: "blue-yellow"}, {id: "forest-yellow"}, {id: "yellow-black"}, {id: "cobalt-orange"}, {id: "asphalt-orange"}, {id: "mint-beige"}, {id: "sea-yellow"}, {id: "coral-blue"}],THEME_FONTS: [{id: "montserrat",title: "Montserrat"}, {id: "league",title: "League"}, {id: "opensans",title: "Open Sans"}, {id: "josefine",title: "Josefine"}, {id: "palatino",title: "Palatino"}, {id: "news",title: "News"}, {id: "helvetica",title: "Helvetica"}, {id: "asul",title: "Asul"}, {id: "merriweather",title: "Merriweather"}, {id: "sketch",title: "Sketch"}, {id: "quicksand",title: "Quicksand"}, {id: "overpass",title: "Overpass"}],THEME_TRANSITIONS: [{id: "slide",title: "Slide"}, {id: "linear",title: "Linear",deprecated: !0}, {id: "fade",title: "Fade"}, {id: "none",title: "None"}, {id: "default",title: "Default"}, {id: "concave",title: "Concave"}, {id: "zoom",title: "Zoom"}, {id: "cube",title: "Cube",deprecated: !0}, {id: "page",title: "Page",deprecated: !0}],THEME_BACKGROUND_TRANSITIONS: [{id: "slide",title: "Slide"}, {id: "fade",title: "Fade"}, {id: "none",title: "None"}, {id: "convex",title: "Convex"}, {id: "concave",title: "Concave"}, {id: "zoom",title: "Zoom"}],BLOCKS: new SL.models.Collection([{type: "text",factory: "Text",label: "Text",icon: "type"}, {type: "image",factory: "Image",label: "Image",icon: "picture"}, {type: "shape",factory: "Shape",label: "Shape",icon: "shapes"}, {type: "iframe",factory: "Iframe",label: "Iframe",icon: "browser"}, {type: "code",factory: "Code",label: "Code",icon: "file-css"}, {type: "math",factory: "Math",label: "Math",icon: "divide"}, {type: "snippet",factory: "Snippet",label: "snippet",icon: "file-xml",hidden: !0}]),DEFAULT_DECK_THUMBNAIL: "https://s3.amazonaws.com/static.slid.es/images/default-deck-thumbnail.png",DEFAULT_USER_THUMBNAIL: "https://s3.amazonaws.com/static.slid.es/images/default-profile-picture.png",DECK_THUMBNAIL_TEMPLATE: ['<li class="deck-thumbnail">', '<div class="deck-image" style="background-image: url({{DECK_THUMB_URL}})">', '<a class="deck-link" href="{{DECK_URL}}"></a>', "</div>", '<footer class="deck-details">', '<a class="author" href="{{USER_URL}}">', '<span class="picture" style="background-image: url({{USER_THUMB_URL}})"></span>', '<span class="name">{{USER_NAME}}</span>', "</a>", '<div class="stats">', '<div>{{DECK_VIEWS}}<span class="icon i-eye"></span></div>', "</div>", "</footer>", "</li>"].join(""),AJAX_SEARCH: "/api/v1/search.json",AJAX_SEARCH_ORGANIZATION: "/api/v1/team/search.json",AJAX_CREATE_DECK: function() {
        return "/api/v1/decks.json"
    },AJAX_UPDATE_DECK: function(t) {
        return "/api/v1/decks/" + t + ".json"
    },AJAX_PUBLISH_DECK: function(t) {
        return "/api/v1/decks/" + t + "/publish.json"
    },AJAX_GET_DECK_VERSIONS: function(t) {
        return "/api/v1/decks/" + t + "/revisions.json"
    },AJAX_PREVIEW_DECK_VERSION: function(t, e, n) {
        return "/" + t + "/" + e + "/preview?revision=" + n
    },AJAX_RESTORE_DECK_VERSION: function(t, e) {
        return "/api/v1/decks/" + t + "/revisions/" + e + "/restore.json"
    },AJAX_EXPORT_DECK: function(t, e) {
        return "/" + t + "/" + e + "/export"
    },AJAX_THUMBNAIL_DECK: function(t) {
        return "/api/v1/decks/" + t + "/thumbnails.json"
    },AJAX_FORK_DECK: function(t) {
        return "/api/v1/decks/" + t + "/fork.json"
    },AJAX_KUDO_DECK: function(t) {
        return "/api/v1/decks/" + t + "/kudos/kudo.json"
    },AJAX_UNKUDO_DECK: function(t) {
        return "/api/v1/decks/" + t + "/kudos/unkudo.json"
    },AJAX_PDF_EXPORT_START: function(t) {
        return "/api/v1/decks/" + t + "/exports.json"
    },AJAX_PDF_EXPORT_LIST: function(t) {
        return "/api/v1/decks/" + t + "/exports.json"
    },AJAX_PDF_EXPORT_STATUS: function(t, e) {
        return "/api/v1/decks/" + t + "/exports/" + e + ".json"
    },AJAX_PDF_IMPORT_NEW: "/api/v1/imports.json",AJAX_PDF_IMPORT_UPLOADED: function(t) {
        return "/api/v1/imports/" + t + ".json"
    },AJAX_DROPBOX_CONNECT: "/settings/dropbox/authorize",AJAX_DROPBOX_DISCONNECT: "https://www.dropbox.com/account/security#apps",AJAX_DROPBOX_SYNC_DECK: function(t) {
        return "/api/v1/decks/" + t + "/export.json"
    },AJAX_UPDATE_ORGANIZATION: "/api/v1/team.json",AJAX_LOOKUP_ORGANIZATION: "/api/v1/team/lookup.json",AJAX_ORGANIZATION_MEMBERS_LIST: "/api/v1/team/users.json",AJAX_ORGANIZATION_MEMBER_CREATE: "/api/v1/team/users.json",AJAX_ORGANIZATION_MEMBER_DELETE: function(t) {
        return "/api/v1/team/users/" + t + ".json"
    },AJAX_ORGANIZATION_MEMBER_WELCOME: function(t) {
        return "/api/v1/team/users/" + t + "/welcome.json"
    },AJAX_THEMES_LIST: "/api/v1/themes.json",AJAX_THEMES_CREATE: "/api/v1/themes.json",AJAX_THEMES_UPDATE: function(t) {
        return "/api/v1/themes/" + t + ".json"
    },AJAX_THEMES_DELETE: function(t) {
        return "/api/v1/themes/" + t + ".json"
    },AJAX_SLIDE_TEMPLATES_LIST: "/api/v1/slide_templates.json",AJAX_SLIDE_TEMPLATES_CREATE: "/api/v1/slide_templates.json",AJAX_SLIDE_TEMPLATES_UPDATE: function(t) {
        return "/api/v1/slide_templates/" + t + ".json"
    },AJAX_SLIDE_TEMPLATES_DELETE: function(t) {
        return "/api/v1/slide_templates/" + t + ".json"
    },AJAX_TEAM_SLIDE_TEMPLATES_LIST: "/api/v1/team/slide_templates.json",AJAX_TEAM_SLIDE_TEMPLATES_CREATE: "/api/v1/team/slide_templates.json",AJAX_TEAM_SLIDE_TEMPLATES_UPDATE: function(t) {
        return "/api/v1/team/slide_templates/" + t + ".json"
    },AJAX_TEAM_SLIDE_TEMPLATES_DELETE: function(t) {
        return "/api/v1/team/slide_templates/" + t + ".json"
    },AJAX_GET_USER: function(t) {
        return "/api/v1/users/" + t + ".json"
    },AJAX_LOOKUP_USER: "/api/v1/users/lookup.json",AJAX_SERVICES_USER: "/api/v1/users/services.json",AJAX_UPDATE_USER: "/users.json",AJAX_GET_USER_SETTINGS: "/api/v1/user_settings.json",AJAX_UPDATE_USER_SETTINGS: "/api/v1/user_settings.json",AJAX_SUBSCRIPTIONS: "/subscriptions",AJAX_SUBSCRIPTIONS_STATUS: "/account/details.json",AJAX_SUBSCRIPTIONS_PRINT_RECEIPT: function(t) {
        return "/account/receipts/" + t
    },AJAX_TEAMS_CREATE: "/teams.json",AJAX_CHECK_STATUS: "/api/v1/status.json",AJAX_IMAGE_UPLOAD: "/api/v1/media.json",STREAM_ENGINE_HOST: window.location.protocol + "//stream.slides.com",STREAM_ENGINE_LIVE_NAMESPACE: "live",STREAM_ENGINE_EDITOR_NAMESPACE: "editor",S3_HOST: "https://s3.amazonaws.com/media-p.slid.es",ASSET_URLS: {"offline-v2.css": "./Slides  Edit_files/offline-v2.css","homepage-background.jpg": "./Slides  Edit_files/homepage-background.jpg","reveal-plugins/markdown/marked.js": "./Slides  Edit_files/marked.js","reveal-plugins/markdown/markdown.js": "./Slides  Edit_files/markdown.js","reveal-plugins/highlight/highlight.js": "./Slides  Edit_files/highlight.js"}}, SL.config.V1 = {DEFAULT_THEME_COLOR: "grey-blue",DEFAULT_THEME_FONT: "league",DEFAULT_THEME_TRANSITION: "linear",DEFAULT_THEME_BACKGROUND_TRANSITION: "fade",THEME_COLORS: [{id: "grey-blue"}, {id: "black-mint"}, {id: "black-orange"}, {id: "forest-yellow"}, {id: "lila-yellow"}, {id: "asphalt-orange"}, {id: "sky-blue"}, {id: "beige-brown"}, {id: "sand-grey"}, {id: "silver-green"}, {id: "silver-blue"}, {id: "cobalt-orange"}, {id: "white-blue"}, {id: "mint-beige"}, {id: "sea-yellow"}, {id: "coral-blue"}],THEME_FONTS: [{id: "league",title: "League"}, {id: "opensans",title: "Open Sans"}, {id: "josefine",title: "Josefine"}, {id: "palatino",title: "Palatino"}, {id: "news",title: "News"}, {id: "montserrat",title: "Montserrat"}, {id: "helvetica",title: "Helvetica"}, {id: "asul",title: "Asul"}, {id: "merriweather",title: "Merriweather"}, {id: "sketch",title: "Sketch"}, {id: "quicksand",title: "Quicksand"}, {id: "overpass",title: "Overpass"}]}, SL.keyboard = {init: function() {
        this.keyupConsumers = new SL.models.Collection, this.keydownConsumers = new SL.models.Collection, $(document).on("keydown", this.onDocumentKeyDown.bind(this)), $(document).on("keyup", this.onDocumentKeyUp.bind(this))
    },keydown: function(t) {
        this.keydownConsumers.push(t)
    },keyup: function(t) {
        this.keyupConsumers.push(t)
    },release: function(t) {
        this.keydownConsumers.remove(t), this.keyupConsumers.remove(t)
    },onDocumentKeyDown: function(t) {
        var e = !1;
        return this.keydownConsumers.forEach(function(n) {
            n(t) || (e = !0)
        }), e ? (t.preventDefault(), t.stopImmediatePropagation(), !1) : void 0
    },onDocumentKeyUp: function(t) {
        var e = !1;
        return this.keyupConsumers.forEach(function(n) {
            n(t) || (e = !0)
        }), e ? (t.preventDefault(), t.stopImmediatePropagation(), !1) : void 0
    }}, SL.locale = {GENERIC_ERROR: ["Oops, something went wrong", "We ran into an unexpected error", "Something's wong, can you try that again?"],WARN_UNSAVED_CHANGES: "You have unsaved changes, save first?",CLOSE: "Close",PREVIOUS: "Previous",NEXT: "Next",DECK_SAVE_SUCCESS: "Saved successfully",DECK_SAVE_ERROR: "Failed to save",NEW_SLIDE_TITLE: "Title",LEAVE_UNSAVED_DECK: "You will lose your unsaved changes.",LEAVE_UNSAVED_THEME: "You will lose your unsaved changes.",REMOVE_PRO_CONFIRM: "After the end of the current billing cycle your account will be downgraded from Pro to the Free plan.",REMOVE_PRO_SUCCESS: "Subscription canceled",DECK_RESTORE_CONFIRM: "Are you sure you want to revert to this version from {#time}?",DECK_DELETE_CONFIRM: 'Are you sure you want to delete "{#title}"?',DECK_DELETE_SUCCESS: "Deck deleted",DECK_DELETE_ERROR: "Failed to delete",DECK_VISIBILITY_CHANGE_SELF: '<div><span class="icon i-lock-stroke"></span></div><h3>Private</h3><p>Only visible to you</p>',DECK_VISIBILITY_CHANGE_TEAM: '<div><span class="icon i-users"></span></div><h3>Internal</h3><p>Visible to your team</p>',DECK_VISIBILITY_CHANGE_ALL: '<div><span class="icon i-globe"></span></div><h3>Public</h3><p>Visible to the world</p>',DECK_VISIBILITY_CHANGED_SELF: "Your deck is now private",DECK_VISIBILITY_CHANGED_TEAM: "Your deck is now internal",DECK_VISIBILITY_CHANGED_ALL: "Your deck is now public",DECK_VISIBILITY_CHANGED_ERROR: "Failed to change visibility",DECK_EDIT_INVALID_TITLE: "Please enter a valid title",DECK_EDIT_INVALID_SLUG: "Please enter a valid URL",DECK_DELETE_SLIDE_CONFIRM: "Are you sure you want to remove this slide?",DECK_IMPORT_HTML_CONFIRM: "All existing content will be replaced, continue?",EXPORT_PDF_BUTTON: "Download PDF",EXPORT_PDF_BUTTON_WORKING: "Creating PDF...",EXPORT_PDF_ERROR: "An error occured while exporting your PDF.",DECKSHARER_URL_TITLE: "Link",DECKSHARER_EMBED_TITLE: "Embed",DECKSHARER_PRIVATE_URL_NOTICE: 'This deck is private but can be shared using the secret link above. To publicly share or embed your deck, please publish it first. <a href="http://help.slides.com/knowledgebase/articles/405987-privacy" target="_blank">More info.</a>',FORM_ERROR_REQUIRED: "Required",FORM_ERROR_USERNAME_TAKEN: ["That one's already taken :(", "Sorry, that's taken too"],FORM_ERROR_ORGANIZATION_SLUG_TAKEN: ["That one's already taken :(", "Sorry, that's taken too"],BILLING_DETAILS_ERROR: "An error occured while fetching your billing details, please try again.",BILLING_DETAILS_NOHISTORY: "You haven't made any payments yet.",THEME_CREATE: "New theme",THEME_CREATE_ERROR: "Failed to create theme",THEME_SAVE_SUCCESS: "Theme saved",THEME_SAVE_ERROR: "Failed to save theme",THEME_REMOVE_CONFIRM: "Are you sure you want to delete this theme?",THEME_REMOVE_SUCCESS: "Theme removed successfully",THEME_REMOVE_ERROR: "Failed to remove theme",THEME_LIST_LOAD_ERROR: "Failed to load themes",THEME_LIST_EMPTY: 'You haven\'t created any themes yet. <a href="#" class="create-theme-button">Create one now</a>.',THEME_CSS_DESCRIPTION: "This editor supports LESS or plain CSS input. All selectors are prefixed with .reveal when saved to avoid style spillover.",THEME_HTML_DESCRIPTION: "HTML is inserted into the presentation container, meaning it lives separately from individual slides. This makes it great for things like a company logo which is constantly visible on top of the presentation.",THEME_JS_DESCRIPTION: "Scripts will be executed when a deck that uses this theme is loaded.",THEME_DEFAULT_SAVE_SUCCESS: "Default theme was changed",THEME_DEFAULT_SAVE_ERROR: "Failed to change default theme",THEME_DELETE_TOOLTIP: "Delete",THEME_EDIT_TOOLTIP: "Edit",THEME_MAKE_DEFAULT_TOOLTIP: "Make this the default theme",THEME_IS_DEFAULT_TOOLTIP: "This is the default theme",THEME_SNIPPET_DELETE_CONFIRM: "Are you sure you want to delete this snippet?",TEMPLATE_LOAD_ERROR: "Failed to load slide templates",TEMPLATE_CREATE_ERROR: "Failed to save template",TEMPLATE_DELETE_CONFIRM: "Are you sure you want to delete this template?",ORG_USERS_REMOVE_CONFIRM: 'Delete "{#name}" and all of their decks?',ORG_USERS_REMOVE_SUCCESS: "User removed successfully",ORG_USERS_REMOVE_ERROR: "Failed to remove user",ORG_USERS_INVITE_SEND_SUCCESS: "Invite email sent",ORG_USERS_INVITE_SEND_ERROR: "Failed to send invite email",ORG_USERS_LIST_EMPTY: "Couldn't find any members of this team.",ORG_USERS_LIST_LOAD_ERROR: "Failed to load user list",SEARCH_PAGINATION_PAGE: "Page",SEARCH_NO_RESULTS_FOR: 'No results for "{#term}"',SEARCH_SERVER_ERROR: "Failed to fetch search results",SEARCH_NO_TERM_ERROR: "Please enter a search term",counter: {},get: function(t, e) {
        var n = SL.locale[t];
        if ("object" == typeof n && n.length && (this.counter[t] = "number" == typeof this.counter[t] ? (this.counter[t] + 1) % n.length : 0, n = n[this.counter[t]]), "object" == typeof e)
            for (var i in e)
                n = n.replace("{#" + i + "}", e[i]);
        return "string" == typeof n ? n : ""
    }}, function(t) {
    var e = {};
    e.sync = function() {
        $("[data-placement]").each(function() {
            var t = $(this), n = t.attr("data-placement");
            "function" == typeof e[n] ? e[n](t) : console.log('No matching layout found for "' + n + '"')
        })
    }, e.hcenter = function(t) {
        var e = t.parent();
        e && t.css("left", (e.width() - t.outerWidth()) / 2)
    }, e.vcenter = function(t) {
        var e = t.parent();
        e && t.css("top", (e.height() - t.outerHeight()) / 2)
    }, e.center = function(t) {
        var e = t.parent();
        if (e) {
            var n = e.width(), i = e.height(), s = t.outerWidth(), o = t.outerHeight();
            t.css({left: (n - s) / 2,top: (i - o) / 2})
        }
    }, e.sync(), $(t).on("resize", e.sync), t.Placement = e
}(window), SL.pointer = {down: !1,downTimeout: -1,init: function() {
        $(document).on("mousedown", this.onMouseDown.bind(this)), $(document).on("mouseleave", this.onMouseLeave.bind(this)), $(document).on("mouseup", this.onMouseUp.bind(this))
    },isDown: function() {
        return this.down
    },onMouseDown: function() {
        clearTimeout(this.downTimeout), this.down = !0, this.downTimeout = setTimeout(function() {
            this.down = !1
        }.bind(this), 3e4)
    },onMouseLeave: function() {
        clearTimeout(this.downTimeout), this.down = !1
    },onMouseUp: function() {
        clearTimeout(this.downTimeout), this.down = !1
    }}, SL.routes = {PRICING: "/pricing",SIGN_IN: "/users/sign_in",SIGN_OUT: "/users/sign_out",SUBSCRIPTIONS_NEW: "/account/upgrade",SUBSCRIPTIONS_EDIT_CARD: "/account/update_billing",SUBSCRIPTIONS_EDIT_PERIOD: "/account/update_billing_period",USER: function(t) {
        return "/" + t
    },USER_EDIT: "/users/edit",DECK: function(t, e) {
        return "/" + t + "/" + e
    },DECK_NEW: function(t) {
        return "/" + t + "/new"
    },DECK_EDIT: function(t, e) {
        return "/" + t + "/" + e + "/edit"
    },DECK_EMBED: function(t, e) {
        return "/" + t + "/" + e + "/embed"
    },DECK_LIVE: function(t, e) {
        return "/" + t + "/" + e + "/live"
    },THEME_EDITOR: "/themes",BILLING_DETAILS: "/account/billing"}, SL.settings = {STORAGE_KEY: "slides-settings",STORAGE_VERSION: 1,EDITOR_AUTO_HIDE: "editorAutoHide",EDITOR_AUTO_SAVE: "editorAutoSave",init: function() {
        this.settings = {version: this.STORAGE_VERSION}, this.changed = new signals.Signal, this.restore()
    },setDefaults: function() {
        "undefined" == typeof this.settings[this.EDITOR_AUTO_HIDE] && (this.settings[this.EDITOR_AUTO_HIDE] = !1), "undefined" == typeof this.settings[this.EDITOR_AUTO_SAVE] && (this.settings[this.EDITOR_AUTO_SAVE] = !0)
    },setValue: function(t, e) {
        "object" == typeof t ? $.extend(this.settings, t) : this.settings[t] = e, this.save(), this.changed.dispatch([t])
    },getValue: function(t) {
        return this.settings[t]
    },removeValue: function(t) {
        "object" == typeof t && t.length ? t.forEach(function(t) {
            delete this.settings[t]
        }.bind(this)) : delete this.settings[t], this.save(), this.changed.dispatch([t])
    },restore: function() {
        if (Modernizr.localstorage) {
            var t = localStorage.getItem(this.STORAGE_KEY);
            if (t) {
                var e = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
                e && e.version === this.STORAGE_VERSION ? (this.settings = e, this.setDefaults(), this.changed.dispatch()) : (this.setDefaults(), this.save())
            }
        }
        this.setDefaults()
    },save: function() {
        Modernizr.localstorage && localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings))
    }}, SL.templates = {NEW_DECK_TEMPLATE: {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 250px;">', '<div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">', "<h1>Title Text</h1>", "</div>", "</div>", "</section>"].join("")},DEFAULT_TEMPLATES_DUPLICATE_INDEX: 1,DEFAULT_TEMPLATES: [{label: "Blank",html: ""}, {label: "Duplicate",html: ""}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 270px;">', '<div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">', "<h1>Title Text</h1>", "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px;">', '<div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">', "<h1>Title Text</h1>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 255px;" data-layout-method="belowPreviousBlock">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle">', "<h2>Subtitle</h2>", "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 264px;" data-layout-method="belowPreviousBlock">', '<div class="sl-block-content">', "<ul>", "<li>Bullet One</li>", "<li>Bullet Two</li>", "<li>Bullet Three</li>", "</ul>", "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 49px; top: 106px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 49px; top: 200px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis." style="text-align: left;">', "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis.</p>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 499px; top: 106px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 499px; top: 200px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis." style="text-align: left;">', "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis.</p>", "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 900px; left: 30px; top: 58px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="h1" style="font-size: 200%; text-align: left;">', "<h1>One<br>Two<br>Three</h1>", "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 79px; top: 50px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="image" style="width: 700px; height: 475px; left: 129px; top: 144px;">', '<div class="sl-block-content">', '<div class="editing-ui sl-block-overlay sl-block-placeholder"></div>', "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 430px; left: 23px; top: 87px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 430px; left: 23px; top: 161px;" data-layout-method="belowPreviousBlock">', '<div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec metus justo. Aliquam erat volutpat." style="z-index: 13; text-align: left;">', "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec metus justo. Aliquam erat volutpat.</p>", "</div>", "</div>", '<div class="sl-block" data-block-type="image" style="width: 454px; height: 641px; left: 479px; top: 29px;">', '<div class="sl-block-content">', '<div class="editing-ui sl-block-overlay sl-block-placeholder"></div>', "</div>", "</div>", "</section>"].join("")}, {html: ["<section>", '<div class="sl-block" data-block-type="image" style="width: 700px; height: 475px; left: 130px; top: 65px;">', '<div class="sl-block-content">', '<div class="editing-ui sl-block-overlay sl-block-placeholder"></div>', "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 575px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">', "<h2>Title Text</h2>", "</div>", "</div>", "</section>"].join("")}],LAYOUT_METHODS: {belowPreviousBlock: function(t, e) {
            var n = e.prev().get(0);
            n && e.css("top", n.offsetTop + n.offsetHeight)
        }},getNewDeckTemplate: function() {
        return new SL.models.Template(SL.templates.NEW_DECK_TEMPLATE)
    },getDefaultTemplates: function() {
        return new SL.models.Collection(SL.templates.DEFAULT_TEMPLATES, SL.models.Template)
    },userTemplatesLoaded: !1,userTemplatesLoading: !1,userTemplatesCallbacks: [],getUserTemplates: function(t) {
        t = t || function() {
        }, SL.templates.userTemplatesLoading === !1 && SL.templates.userTemplatesLoaded === !1 ? (SL.templates.userTemplatesLoading = !0, SL.templates.userTemplatesCallbacks.push(t), $.ajax({type: "GET",url: SL.config.AJAX_SLIDE_TEMPLATES_LIST,context: this}).done(function(t) {
            SL.templates.userTemplates = new SL.models.Collection(t.results, SL.models.Template), SL.templates.userTemplatesLoaded = !0, SL.templates.userTemplatesLoading = !1, SL.templates.userTemplatesCallbacks.forEach(function(t) {
                t.call(null, SL.templates.userTemplates)
            }), SL.templates.userTemplatesCallbacks.length = 0
        }).fail(function() {
            SL.templates.userTemplatesLoading = !1, SL.notify(SL.locale.get("TEMPLATE_LOAD_ERROR"), "negative")
        })) : SL.templates.userTemplatesLoading ? SL.templates.userTemplatesCallbacks.push(t) : t.call(null, SL.templates.userTemplates)
    },teamTemplatesLoaded: !1,teamTemplatesLoading: !1,teamTemplatesCallbacks: [],getTeamTemplates: function(t) {
        SL.current_user.isEnterprise() && (t = t || function() {
        }, SL.templates.teamTemplatesLoading === !1 && SL.templates.teamTemplatesLoaded === !1 ? (SL.templates.teamTemplatesLoading = !0, SL.templates.teamTemplatesCallbacks.push(t), $.ajax({type: "GET",url: SL.config.AJAX_TEAM_SLIDE_TEMPLATES_LIST,context: this}).done(function(t) {
            SL.templates.teamTemplates = new SL.models.Collection(t.results, SL.models.Template), SL.templates.teamTemplatesLoaded = !0, SL.templates.teamTemplatesLoading = !1, SL.templates.teamTemplatesCallbacks.forEach(function(t) {
                t.call(null, SL.templates.teamTemplates)
            }), SL.templates.teamTemplatesCallbacks.length = 0
        }).fail(function() {
            SL.templates.teamTemplatesLoading = !1, SL.notify(SL.locale.get("TEMPLATE_LOAD_ERROR"), "negative")
        })) : SL.templates.teamTemplatesLoading ? SL.templates.teamTemplatesCallbacks.push(t) : t.call(null, SL.templates.teamTemplates))
    },layoutTemplate: function(t, e) {
        t.find(".sl-block").each(function(n, i) {
            i = $(i);
            var s = i.attr("data-layout-method");
            s && "function" == typeof SL.templates.LAYOUT_METHODS[s] && (e || i.removeAttr("data-layout-method"), SL.templates.LAYOUT_METHODS[s](t, i))
        })
    },templatize: function(t, e) {
        t = $(t), e = $.extend({placeholderText: !1,zIndex: !0}, e);
        var n = SL.editor.controllers.Serialize.getSlideAsString(t, {templatize: !0,inner: !0}), i = $("<section>" + n + "</section>");
        return i.children().each(function(t, n) {
            n = $(n), n.css({"min-width": "","min-height": ""});
            var i = n.find(".sl-block-content");
            if (e.placeholderText && "text" === n.attr("data-block-type") && 1 === i.children().length) {
                var s = $(i.children()[0]);
                s.is("h1, h2") ? (s.html("Title Text"), i.attr("data-placeholder-text", "Title Text")) : s.is("p") && i.attr("data-placeholder-text", s.text().trim())
            }
            e.zIndex === !1 && i.css("z-index", "")
        }), ["class", "data-autoslide", "data-transition", "data-transition-speed", "data-background", "data-background-color", "data-background-image", "data-background-size"].forEach(function(e) {
            t.attr(e) && i.attr(e, t.attr(e))
        }), i.removeClass("past present future"), i.prop("outerHTML").trim()
    }}, SL.util.svg = {NAMESPACE: "http://www.w3.org/2000/svg",SYMBOLS: {happy: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM16 18.711c3.623 0 7.070-0.963 10-2.654-0.455 5.576-4.785 9.942-10 9.942-5.215 0-9.544-4.371-10-9.947 2.93 1.691 6.377 2.658 10 2.658zM8 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3zM20 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3z"></path>',smiley: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM22.003 19.602l2.573 1.544c-1.749 2.908-4.935 4.855-8.576 4.855s-6.827-1.946-8.576-4.855l2.573-1.544c1.224 2.036 3.454 3.398 6.003 3.398s4.779-1.362 6.003-3.398z"></path>',wondering: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM23.304 18.801l0.703 2.399-13.656 4-0.703-2.399zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',sad: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM9.997 24.398l-2.573-1.544c1.749-2.908 4.935-4.855 8.576-4.855 3.641 0 6.827 1.946 8.576 4.855l-2.573 1.544c-1.224-2.036-3.454-3.398-6.003-3.398-2.549 0-4.779 1.362-6.003 3.398z"></path>',"checkmark-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM13.52 23.383l-7.362-7.363 2.828-2.828 4.533 4.535 9.617-9.617 2.828 2.828-12.444 12.445z"></path>',"plus-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM24 18h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"></path>',"minus-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM24 18h-16v-4h16v4z"></path>',"x-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM23.914 21.086l-2.828 2.828-5.086-5.086-5.086 5.086-2.828-2.828 5.086-5.086-5.086-5.086 2.828-2.828 5.086 5.086 5.086-5.086 2.828 2.828-5.086 5.086 5.086 5.086z"></path>',denied: '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM16 4c2.59 0 4.973 0.844 6.934 2.242l-16.696 16.688c-1.398-1.961-2.238-4.344-2.238-6.93 0-6.617 5.383-12 12-12zM16 28c-2.59 0-4.973-0.844-6.934-2.242l16.696-16.688c1.398 1.961 2.238 4.344 2.238 6.93 0 6.617-5.383 12-12 12z"></path>',clock: '<path d="M16 4c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zM16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16v0zM21.422 18.578l-3.422-3.426v-7.152h-4.023v7.992c0 0.602 0.277 1.121 0.695 1.492l3.922 3.922 2.828-2.828z"></path>',"heart-stroke": '<path d="M23.113 6c2.457 0 4.492 1.82 4.836 4.188l-11.945 13.718-11.953-13.718c0.344-2.368 2.379-4.188 4.836-4.188 2.016 0 3.855 2.164 3.855 2.164l3.258 3.461 3.258-3.461c0 0 1.84-2.164 3.855-2.164zM23.113 2c-2.984 0-5.5 1.578-7.113 3.844-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891v0z"></path>',"heart-fill": '<path d="M16 5.844c-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891-2.984 0-5.5 1.578-7.113 3.844z"></path>',home: '<path d="M16 0l-16 16h4v16h24v-16h4l-16-16zM24 28h-6v-6h-4v6h-6v-14.344l8-5.656 8 5.656v14.344z"></path>',pin: '<path d="M17.070 2.93c-3.906-3.906-10.234-3.906-14.141 0-3.906 3.904-3.906 10.238 0 14.14 0.001 0 7.071 6.93 7.071 14.93 0-8 7.070-14.93 7.070-14.93 3.907-3.902 3.907-10.236 0-14.14zM10 14c-2.211 0-4-1.789-4-4s1.789-4 4-4 4 1.789 4 4-1.789 4-4 4z"></path>',user: '<path d="M12 16c-6.625 0-12 5.375-12 12 0 2.211 1.789 4 4 4h16c2.211 0 4-1.789 4-4 0-6.625-5.375-12-12-12zM6 6c0-3.314 2.686-6 6-6s6 2.686 6 6c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6z"></path>',mail: '<path d="M15.996 15.457l16.004-7.539v-3.918h-32v3.906zM16.004 19.879l-16.004-7.559v15.68h32v-15.656z"></path>',star: '<path d="M22.137 19.625l9.863-7.625h-12l-4-12-4 12h-12l9.875 7.594-3.875 12.406 10.016-7.68 9.992 7.68z"></path>',bolt: '<path d="M32 0l-24 16 6 4-14 12 24-12-6-4z"></path>',sun: '<path d="M16.001 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 7.999-3.582 7.999-8s-3.581-8-7.999-8v0zM14 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM4 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM2 14c1.105 0 2 0.895 2 2 0 1.107-0.895 2-2 2s-2-0.893-2-2c0-1.105 0.895-2 2-2zM4 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM14 30c0-1.109 0.895-2 2-2 1.108 0 2 0.891 2 2 0 1.102-0.892 2-2 2-1.105 0-2-0.898-2-2zM24 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM30 18c-1.104 0-2-0.896-2-2 0-1.107 0.896-2 2-2s2 0.893 2 2c0 1.104-0.896 2-2 2zM24 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',moon: '<path d="M24.633 22.184c-8.188 0-14.82-6.637-14.82-14.82 0-2.695 0.773-5.188 2.031-7.363-6.824 1.968-11.844 8.187-11.844 15.644 0 9.031 7.32 16.355 16.352 16.355 7.457 0 13.68-5.023 15.648-11.844-2.18 1.254-4.672 2.028-7.367 2.028z"></path>',cloud: '<path d="M24 10c-0.379 0-0.738 0.061-1.102 0.111-1.394-2.465-3.972-4.111-6.898-4.111-2.988 0-5.566 1.666-6.941 4.1-0.352-0.047-0.704-0.1-1.059-0.1-4.41 0-8 3.588-8 8 0 4.414 3.59 8 8 8h16c4.41 0 8-3.586 8-8 0-4.412-3.59-8-8-8zM24 22h-16c-2.207 0-4-1.797-4-4 0-2.193 1.941-3.885 4.004-3.945 0.008 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.929 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.793-4 4-4s4 1.795 4 4c0 2.203-1.793 4-4 4z"></path>',rain: '<path d="M23.998 6c-0.375 0-0.733 0.061-1.103 0.111-1.389-2.465-3.969-4.111-6.895-4.111-2.987 0-5.565 1.666-6.94 4.1-0.353-0.047-0.705-0.1-1.060-0.1-4.41 0-8 3.588-8 8s3.59 8 8 8h15.998c4.414 0 8-3.588 8-8s-3.586-8-8-8zM23.998 18h-15.998c-2.207 0-4-1.795-4-4 0-2.193 1.941-3.885 4.004-3.945 0.009 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.928 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.795-4 3.998-4 2.211 0 4 1.795 4 4s-1.789 4-4 4zM3.281 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.438-2.719 5.438-2.719-1.969 4.688-2.719 5.438zM11.285 29.438c-0.75 0.75-1.965 0.75-2.719 0-0.75-0.75-0.75-1.969 0-2.719 0.754-0.75 5.438-2.719 5.438-2.719s-1.965 4.688-2.719 5.438zM19.28 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.437-2.719 5.437-2.719-1.968 4.688-2.718 5.438z"></path>',umbrella: '<path d="M16 0c-8.82 0-16 7.178-16 16h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5v10c0 1.102-0.895 2-2 2-1.102 0-2-0.898-2-2h-4c0 3.309 2.695 6 6 6 3.312 0 6-2.691 6-6v-10c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.498 0.674 1.498 1.5h4c0-0.826 0.68-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-8.822-7.172-16-15.998-16z"></path>',eye: '<path d="M16 4c-8.836 0-16 11.844-16 11.844s7.164 12.156 16 12.156 16-12.156 16-12.156-7.164-11.844-16-11.844zM16 24c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4z"></path>',ribbon: '<path d="M8 20c-1.41 0-2.742-0.289-4-0.736v12.736l4-4 4 4v-12.736c-1.258 0.447-2.59 0.736-4 0.736zM0 8c0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8-4.418 0-8-3.582-8-8z"></path>',iphone: '<path d="M16 0h-8c-4.418 0-8 3.582-8 8v16c0 4.418 3.582 8 8 8h8c4.418 0 8-3.582 8-8v-16c0-4.418-3.582-8-8-8zM12 30.062c-1.139 0-2.062-0.922-2.062-2.062s0.924-2.062 2.062-2.062 2.062 0.922 2.062 2.062-0.923 2.062-2.062 2.062zM20 24h-16v-16c0-2.203 1.795-4 4-4h8c2.203 0 4 1.797 4 4v16z"></path>',camera: '<path d="M16 20c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4zM28 8l-3.289-6.643c-0.27-0.789-1.016-1.357-1.899-1.357h-5.492c-0.893 0-1.646 0.582-1.904 1.385l-3.412 6.615h-8.004c-2.209 0-4 1.791-4 4v20h32v-20c0-2.209-1.789-4-4-4zM6 16c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM20 28c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>',cog: '<path d="M32 17.969v-4l-4.781-1.992c-0.133-0.375-0.273-0.738-0.445-1.094l1.93-4.805-2.829-2.828-4.762 1.961c-0.363-0.176-0.734-0.324-1.117-0.461l-2.027-4.75h-4l-1.977 4.734c-0.398 0.141-0.781 0.289-1.16 0.469l-4.754-1.91-2.828 2.828 1.938 4.711c-0.188 0.387-0.34 0.781-0.485 1.188l-4.703 2.011v4l4.707 1.961c0.145 0.406 0.301 0.801 0.488 1.188l-1.902 4.742 2.828 2.828 4.723-1.945c0.379 0.18 0.766 0.324 1.164 0.461l2.023 4.734h4l1.98-4.758c0.379-0.141 0.754-0.289 1.113-0.461l4.797 1.922 2.828-2.828-1.969-4.773c0.168-0.359 0.305-0.723 0.438-1.094l4.782-2.039zM15.969 22c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"></path>',lock: '<path d="M14 0c-5.508 0-9.996 4.484-9.996 10v2h-4.004v14c0 3.309 2.691 6 6 6h12c3.309 0 6-2.691 6-6v-16c0-5.516-4.488-10-10-10zM11.996 24c-1.101 0-1.996-0.895-1.996-2s0.895-2 1.996-2c1.105 0 2 0.895 2 2s-0.894 2-2 2zM20 12h-11.996v-2c0-3.309 2.691-6 5.996-6 3.309 0 6 2.691 6 6v2z"></path>',unlock: '<path d="M14.004 0c-5.516 0-9.996 4.484-9.996 10h3.996c0-3.309 2.688-6 6-6 3.305 0 5.996 2.691 5.996 6v2h-20v14c0 3.309 2.695 6 6 6h12c3.305 0 6-2.691 6-6v-16c0-5.516-4.488-10-9.996-10zM12 24c-1.102 0-2-0.895-2-2s0.898-2 2-2c1.109 0 2 0.895 2 2s-0.891 2-2 2z"></path>',fork: '<path d="M20 0v3.875c0 1.602-0.625 3.109-1.754 4.238l-11.316 11.254c-1.789 1.785-2.774 4.129-2.883 6.633h-4.047l6 6 6-6h-3.957c0.105-1.438 0.684-2.773 1.711-3.805l11.316-11.25c1.891-1.89 2.93-4.398 2.93-7.070v-3.875h-4zM23.953 26c-0.109-2.504-1.098-4.848-2.887-6.641l-2.23-2.215-2.836 2.821 2.242 2.23c1.031 1.027 1.609 2.367 1.715 3.805h-3.957l6 6 6-6h-4.047z"></path>',paperclip: '<path d="M17.293 15.292l-2.829-2.829-4 4c-1.953 1.953-1.953 5.119 0 7.071 1.953 1.953 5.118 1.953 7.071 0l10.122-9.879c3.123-3.124 3.123-8.188 0-11.313-3.125-3.124-8.19-3.124-11.313 0l-11.121 10.88c-4.296 4.295-4.296 11.26 0 15.557 4.296 4.296 11.261 4.296 15.556 0l6-6-2.829-2.829-5.999 6c-2.733 2.732-7.166 2.732-9.9 0-2.733-2.732-2.733-7.166 0-9.899l11.121-10.881c1.562-1.562 4.095-1.562 5.656 0 1.563 1.563 1.563 4.097 0 5.657l-10.121 9.879c-0.391 0.391-1.023 0.391-1.414 0s-0.391-1.023 0-1.414l4-4z"></path>',facebook: '<path d="M17.996 32h-5.996v-16h-4v-5.514l4-0.002-0.007-3.248c0-4.498 1.22-7.236 6.519-7.236h4.412v5.515h-2.757c-2.064 0-2.163 0.771-2.163 2.209l-0.008 2.76h4.959l-0.584 5.514-4.37 0.002-0.004 16z"></path>',twitter: '<path d="M32 6.076c-1.177 0.522-2.443 0.875-3.771 1.034 1.355-0.813 2.396-2.099 2.887-3.632-1.269 0.752-2.674 1.299-4.169 1.593-1.198-1.276-2.904-2.073-4.792-2.073-3.626 0-6.565 2.939-6.565 6.565 0 0.515 0.058 1.016 0.17 1.496-5.456-0.274-10.294-2.888-13.532-6.86-0.565 0.97-0.889 2.097-0.889 3.301 0 2.278 1.159 4.287 2.921 5.465-1.076-0.034-2.088-0.329-2.974-0.821-0.001 0.027-0.001 0.055-0.001 0.083 0 3.181 2.263 5.834 5.266 6.437-0.551 0.15-1.131 0.23-1.73 0.23-0.423 0-0.834-0.041-1.235-0.118 0.835 2.608 3.26 4.506 6.133 4.559-2.247 1.761-5.078 2.81-8.154 2.81-0.53 0-1.052-0.031-1.566-0.092 2.905 1.863 6.356 2.95 10.064 2.95 12.076 0 18.679-10.004 18.679-18.68 0-0.285-0.006-0.568-0.019-0.849 1.283-0.926 2.396-2.082 3.276-3.398z"></path>',earth: '<path d="M27.314 4.686c3.022 3.022 4.686 7.040 4.686 11.314s-1.664 8.292-4.686 11.314c-3.022 3.022-7.040 4.686-11.314 4.686s-8.292-1.664-11.314-4.686c-3.022-3.022-4.686-7.040-4.686-11.314s1.664-8.292 4.686-11.314c3.022-3.022 7.040-4.686 11.314-4.686s8.292 1.664 11.314 4.686zM25.899 25.9c1.971-1.971 3.281-4.425 3.821-7.096-0.421 0.62-0.824 0.85-1.073-0.538-0.257-2.262-2.335-0.817-3.641-1.621-1.375 0.927-4.466-1.802-3.941 1.276 0.81 1.388 4.375-1.858 2.598 1.079-1.134 2.050-4.145 6.592-3.753 8.946 0.049 3.43-3.504 0.715-4.729-0.422-0.824-2.279-0.281-6.262-2.434-7.378-2.338-0.102-4.344-0.314-5.25-2.927-0.545-1.87 0.58-4.653 2.584-5.083 2.933-1.843 3.98 2.158 6.731 2.232 0.854-0.894 3.182-1.178 3.375-2.18-1.805-0.318 2.29-1.517-0.173-2.199-1.358 0.16-2.234 1.409-1.512 2.467-2.632 0.614-2.717-3.809-5.247-2.414-0.064 2.206-4.132 0.715-1.407 0.268 0.936-0.409-1.527-1.594-0.196-1.379 0.654-0.036 2.854-0.807 2.259-1.325 1.225-0.761 2.255 1.822 3.454-0.059 0.866-1.446-0.363-1.713-1.448-0.98-0.612-0.685 1.080-2.165 2.573-2.804 0.497-0.213 0.973-0.329 1.336-0.296 0.752 0.868 2.142 1.019 2.215-0.104-1.862-0.892-3.915-1.363-6.040-1.363-3.051 0-5.952 0.969-8.353 2.762 0.645 0.296 1.012 0.664 0.39 1.134-0.483 1.439-2.443 3.371-4.163 3.098-0.893 1.54-1.482 3.238-1.733 5.017 1.441 0.477 1.773 1.42 1.464 1.736-0.734 0.64-1.185 1.548-1.418 2.541 0.469 2.87 1.818 5.515 3.915 7.612 2.644 2.644 6.16 4.1 9.899 4.1s7.255-1.456 9.899-4.1z"></path>',globe: '<path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z"></path>',"thin-arrow-up": '<path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>',"thin-arrow-down": '<path d="M4.586 19.414l10 10c0.781 0.781 2.047 0.781 2.828 0l10-10c0.781-0.781 0.781-2.047 0-2.828s-2.047-0.781-2.828 0l-6.586 6.586v-19.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v19.172l-6.586-6.586c-0.391-0.39-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586c-0.781 0.781-0.781 2.047 0 2.828z"></path>',"thin-arrow-up-left": '<path d="M4 18c0 1.105 0.895 2 2 2s2-0.895 2-2v-7.172l16.586 16.586c0.781 0.781 2.047 0.781 2.828 0 0.391-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414l-16.586-16.586h7.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-14v14z"></path>',"thin-arrow-up-right": '<path d="M26.001 4c-0 0-0.001 0-0.001 0h-11.999c-1.105 0-2 0.895-2 2s0.895 2 2 2h7.172l-16.586 16.586c-0.781 0.781-0.781 2.047 0 2.828 0.391 0.391 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586l16.586-16.586v7.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-14h-1.999z"></path>',"thin-arrow-left": '<path d="M12.586 4.586l-10 10c-0.781 0.781-0.781 2.047 0 2.828l10 10c0.781 0.781 2.047 0.781 2.828 0s0.781-2.047 0-2.828l-6.586-6.586h19.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-19.172l6.586-6.586c0.39-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414c-0.781-0.781-2.047-0.781-2.828 0z"></path>',"thin-arrow-right": '<path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>',"thin-arrow-down-left": '<path d="M18 28c1.105 0 2-0.895 2-2s-0.895-2-2-2h-7.172l16.586-16.586c0.781-0.781 0.781-2.047 0-2.828-0.391-0.391-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586l-16.586 16.586v-7.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v14h14z"></path>',"thin-arrow-down-right": '<path d="M28 14c0-1.105-0.895-2-2-2s-2 0.895-2 2v7.172l-16.586-16.586c-0.781-0.781-2.047-0.781-2.828 0-0.391 0.391-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414l16.586 16.586h-7.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h14v-14z"></path>'},boundingBox: function(t) {
        var e;
        if ($(t).parents("body").length)
            e = t.getBBox();
        else {
            var n = t.parentNode, i = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
            i.setAttribute("width", "0"), i.setAttribute("height", "0"), i.setAttribute("style", "visibility: hidden; position: absolute; left: 0; top: 0;"), i.appendChild(t), document.body.appendChild(i), e = t.getBBox(), n ? n.appendChild(t) : i.removeChild(t), document.body.removeChild(i)
        }
        return e
    },pointsToPolygon: function(t) {
        for (var e = []; t.length >= 2; )
            e.push(t.shift() + "," + t.shift());
        return e.join(" ")
    },rect: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "rect");
        return n.setAttribute("width", t), n.setAttribute("height", e), n
    },ellipse: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "ellipse");
        return n.setAttribute("rx", t / 2), n.setAttribute("ry", e / 2), n.setAttribute("cx", t / 2), n.setAttribute("cy", e / 2), n
    },triangleUp: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([t / 2, 0, t, e, 0, e])), n
    },triangleDown: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([0, 0, t, 0, t / 2, e])), n
    },triangleLeft: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([0, e / 2, t, 0, t, e])), n
    },triangleRight: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([t, e / 2, 0, e, 0, 0])), n
    },arrowUp: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([.5 * t, 0, t, .5 * e, .7 * t, .5 * e, .7 * t, e, .3 * t, e, .3 * t, .5 * e, 0, .5 * e, .5 * t, 0])), n
    },arrowDown: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([.5 * t, e, t, .5 * e, .7 * t, .5 * e, .7 * t, 0, .3 * t, 0, .3 * t, .5 * e, 0, .5 * e, .5 * t, e])), n
    },arrowLeft: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([t, .3 * e, .5 * t, .3 * e, .5 * t, 0, 0, .5 * e, .5 * t, e, .5 * t, .7 * e, t, .7 * e, t, .3 * e])), n
    },arrowRight: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([0, .3 * e, .5 * t, .3 * e, .5 * t, 0, t, .5 * e, .5 * t, e, .5 * t, .7 * e, 0, .7 * e])), n
    },polygon: function(t, e, n) {
        var i = document.createElementNS(SL.util.svg.NAMESPACE, "polygon"), s = [];
        if (3 === n)
            s = [t / 2, 0, t, e, 0, e];
        else if (n > 3)
            for (var o = t / 2, r = e / 2, a = 0; n > a; a++) {
                var l = o + o * Math.cos(2 * Math.PI * a / n), c = r + r * Math.sin(2 * Math.PI * a / n);
                l = Math.round(10 * l) / 10, c = Math.round(10 * c) / 10, s.push(l), s.push(c)
            }
        return i.setAttribute("points", SL.util.svg.pointsToPolygon(s)), i
    },symbol: function(t) {
        var e = document.createElementNS(SL.util.svg.NAMESPACE, "g"), n = SL.util.svg.SYMBOLS[t];
        return n && (e.innerSVG = SL.util.svg.SYMBOLS[t]), e
    }}, SL.warnings = {STORAGE_KEY: "slides-last-warning-id",MESSAGE_ID: 23,init: function() {
        this.showMessage()
    },showMessage: function() {
        if (this.hasMessage() && !this.hasExpired() && SL.util.user.isLoggedIn() && Modernizr.localstorage) {
            var t = parseInt(localStorage.getItem(this.STORAGE_KEY), 10) || 0;
            if (t < this.MESSAGE_ID) {
                var e = SL.notify(this.MESSAGE_TEXT, {autoHide: !1});
                e.destroyed.add(this.hideMessage.bind(this))
            }
        }
    },hideMessage: function() {
        Modernizr.localstorage && localStorage.setItem(this.STORAGE_KEY, this.MESSAGE_ID)
    },hasMessage: function() {
        return !!this.MESSAGE_TEXT
    },hasExpired: function() {
        return this.MESSAGE_EXPIRY ? moment().diff(moment(this.MESSAGE_EXPIRY)) > 0 : !1
    }}, SL("helpers").FileUploader = Class.extend({init: function(t) {
        if (this.options = $.extend({external: !1,method: "POST"}, t), "undefined" == typeof this.options.file || "undefined" == typeof this.options.service)
            throw "File and service must be defined for FileUploader task.";
        this.timeout = -1, this.uploading = !1, this.onUploadSuccess = this.onUploadSuccess.bind(this), this.onUploadProgress = this.onUploadProgress.bind(this), this.onUploadError = this.onUploadError.bind(this), this.failed = new signals.Signal, this.succeeded = new signals.Signal, this.progressed = new signals.Signal
    },upload: function() {
        this.uploading = !0, clearTimeout(this.timeout), "number" == typeof this.options.timeout && (this.timeout = setTimeout(this.onUploadError, this.options.timeout));
        var t = new FormData;
        this.options.filename ? t.append("file", this.options.file, this.options.filename) : t.append("file", this.options.file);
        var e = this.options.csrf || document.querySelector('meta[name="csrf-token"]');
        e && !this.options.external && t.append("authenticity_token", e.getAttribute("content")), this.xhr = new XMLHttpRequest, this.xhr.onload = function() {
            if (this.options.external === !0)
                this.onUploadSuccess();
            else {
                try {
                    var t = JSON.parse(this.xhr.responseText)
                } catch (e) {
                    return this.onUploadError()
                }
                this.onUploadSuccess(t)
            }
        }.bind(this), this.xhr.onerror = this.onUploadError, this.xhr.upload.onprogress = this.onUploadProgress, this.xhr.open(this.options.method, this.options.service, !0), this.xhr.send(t)
    },isUploading: function() {
        return this.uploading
    },onUploadSuccess: function(t) {
        clearTimeout(this.timeout), this.uploading = !1, this.succeeded.dispatch(t)
    },onUploadProgress: function(t) {
        t.lengthComputable && this.progressed.dispatch(t.loaded / t.total)
    },onUploadError: function() {
        clearTimeout(this.timeout), this.uploading = !1, this.failed.dispatch()
    },destroy: function() {
        clearTimeout(this.timeout);
        var t = function() {
        };
        this.xhr.onload = t, this.xhr.onerror = t, this.xhr.upload.onprogress = t, this.xhr.abort(), this.succeeded.dispose(), this.progressed.dispose(), this.failed.dispose()
    }}), SL.helpers.Fullscreen = {enter: function(t) {
        t = t || document.body;
        var e = t.requestFullScreen || t.webkitRequestFullscreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen;
        e && e.apply(t)
    },exit: function() {
        var t = document.exitFullscreen || document.msCancelFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
        t && t.apply(document)
    },toggle: function() {
        SL.helpers.Fullscreen.isActive() ? SL.helpers.Fullscreen.exit() : SL.helpers.Fullscreen.enter()
    },isEnabled: function() {
        return !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled)
    },isActive: function() {
        return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)
    }}, SL("helpers").ImageUploader = Class.extend({init: function(t) {
        this.options = $.extend({service: SL.config.AJAX_IMAGE_UPLOAD,timeout: 9e4}, t), this.onUploadSuccess = this.onUploadSuccess.bind(this), this.onUploadProgress = this.onUploadProgress.bind(this), this.onUploadError = this.onUploadError.bind(this), this.progressed = new signals.Signal, this.succeeded = new signals.Signal, this.failed = new signals.Signal
    },upload: function(t, e) {
        return t && t.type.match(/image.*/) ? "number" == typeof t.size && t.size / 1024 > SL.config.MAX_IMAGE_UPLOAD_SIZE.maxsize ? void SL.notify("No more than " + Math.round(MAX_IMAGE_UPLOAD_SIZE / 1e3) + "mb please", "negative") : (this.fileUploader && this.fileUploader.destroy(), this.fileUploader = new SL.helpers.FileUploader({file: t,filename: e || this.options.filename,service: this.options.service,timeout: this.options.timeout}), this.fileUploader.succeeded.add(this.onUploadSuccess), this.fileUploader.progressed.add(this.onUploadProgress), this.fileUploader.failed.add(this.onUploadError), void this.fileUploader.upload()) : void SL.notify("Only image files, please")
    },isUploading: function() {
        return !(!this.fileUploader || !this.fileUploader.isUploading())
    },onUploadSuccess: function(t) {
        t && "string" == typeof t.url ? this.succeeded.dispatch(t.url) : this.failed.dispatch(), this.fileUploader.destroy(), this.fileUploader = null
    },onUploadProgress: function(t) {
        this.progressed.dispatch(t)
    },onUploadError: function() {
        this.failed.dispatch(), this.fileUploader.destroy(), this.fileUploader = null
    },destroy: function() {
        this.succeeded.dispose(), this.progressed.dispose(), this.failed.dispose(), this.fileUploader && this.fileUploader.destroy()
    }}), SL.helpers.PageLoader = {show: function(t) {
        var e = $(".page-loader");
        0 === e.length && (e = $(['<div class="page-loader">', '<div class="page-loader-inner">', '<p class="page-loader-message"></p>', '<div class="page-loader-spinner spinner"></div>', "</div>", "</div>"].join("")).appendTo(document.body)), t && e.find(".page-loader-message").html(t), e.addClass("visible")
    },hide: function() {
        $(".page-loader").removeClass("visible")
    }}, SL("helpers").PollJob = Class.extend({init: function(t) {
        this.options = $.extend({interval: 1e3,timeout: Number.MAX_VALUE,retries: Number.MAX_VALUE}, t), this.interval = -1, this.running = !1, this.poll = this.poll.bind(this), this.ended = new signals.Signal, this.polled = new signals.Signal
    },start: function() {
        this.running = !0, this.pollStart = Date.now(), this.pollTimes = 0, clearInterval(this.interval), this.interval = setInterval(this.poll, this.options.interval)
    },stop: function() {
        this.running = !1, clearInterval(this.interval)
    },poll: function() {
        this.pollTimes++, Date.now() - this.pollStart > this.options.timeout || this.pollTimes > this.options.retries ? (this.stop(), this.ended.dispatch()) : this.polled.dispatch()
    }}), SL("helpers").StreamEditor = Class.extend({init: function(t) {
        this.options = $.extend({}, t), this.statusChanged = new signals.Signal, this.messageReceived = new signals.Signal, this.socketIsDisconnected = !1, this.debugMode = !!SL.util.getQuery().debug
    },connect: function() {
        var t = SL.config.STREAM_ENGINE_HOST + "/" + SL.config.STREAM_ENGINE_EDITOR_NAMESPACE;
        this.log("socket connected", t), this.socket = io.connect(t), this.socket.on("connect", this.onSocketConnected.bind(this)), this.socket.on("disconnect", this.onSocketDisconnected.bind(this)), this.socket.on("message", this.onSocketMessage.bind(this))
    },log: function() {
        if (this.debugMode && "function" == typeof console.log.apply) {
            var t = ["Stream:"].concat(Array.prototype.slice.call(arguments));
            console.log.apply(console, t)
        }
    },setStatus: function(t) {
        this.status !== t && (this.status = t, this.statusChanged.dispatch(this.status))
    },onSocketMessage: function(t) {
        try {
            var e = JSON.parse(t.data);
            this.messageReceived.dispatch(e)
        } catch (n) {
            this.log("unable to parse streamed socket message as JSON.")
        }
        this.setStatus(SL.helpers.StreamEditor.STATUS_NONE)
    },onSocketConnected: function() {
        this.socket.emit("subscribe", {deck_id: this.options.deckID}), this.socketIsDisconnected === !0 && (this.socketIsDisconnected = !1, this.log("socket connection regained"), this.setStatus(SL.helpers.StreamEditor.STATUS_NONE))
    },onSocketDisconnected: function() {
        this.socketIsDisconnected === !1 && (this.socketIsDisconnected = !0, this.log("socket connection lost"), this.setStatus(SL.helpers.StreamEditor.STATUS_CONNECTION_LOST))
    }}), SL.helpers.StreamEditor.STATUS_NONE = "", SL.helpers.StreamEditor.STATUS_CONNECTION_LOST = "connection_lost", SL("helpers").StreamLive = Class.extend({init: function(t) {
        this.options = $.extend({reveal: window.Reveal,subscriber: !0,publisher: !1,publisherID: Date.now() + "-" + Math.round(1e6 * Math.random()),deckID: SL.current_deck.get("id")}, t), this.ready = new signals.Signal, this.stateChanged = new signals.Signal, this.statusChanged = new signals.Signal, this.subscribersChanged = new signals.Signal, this.socketIsDisconnected = !1, this.debugMode = !!SL.util.getQuery().debug
    },connect: function() {
        this.options.publisher ? this.setupPublisher() : this.setupSubscriber()
    },setupPublisher: function() {
        this.publish = this.publish.bind(this), this.publishable = !0, this.options.reveal.addEventListener("slidechanged", this.publish), this.options.reveal.addEventListener("fragmentshown", this.publish), this.options.reveal.addEventListener("fragmenthidden", this.publish), this.options.reveal.addEventListener("overviewshown", this.publish), this.options.reveal.addEventListener("overviewhidden", this.publish), this.options.reveal.addEventListener("paused", this.publish), this.options.reveal.addEventListener("resumed", this.publish), $.ajax({url: "/api/v1/decks/" + this.options.deckID + "/stream.json",type: "GET",context: this}).done(function(t) {
            this.log("found existing stream"), this.setState(JSON.parse(t.state), !0), this.setupSocket(), this.ready.dispatch()
        }).error(function() {
            this.log("no existing stream, publishing state"), this.publish(function() {
                this.setupSocket(), this.ready.dispatch()
            }.bind(this))
        })
    },setupSubscriber: function() {
        $.ajax({url: "/api/v1/decks/" + this.options.deckID + "/stream.json",type: "GET",context: this}).done(function(t) {
            this.log("found existing stream"), this.setStatus(SL.helpers.StreamLive.STATUS_NONE), this.setState(JSON.parse(t.state), !0), this.setupSocket(), this.ready.dispatch()
        }).error(function() {
            this.retryStartTime = Date.now(), this.setStatus(SL.helpers.StreamLive.STATUS_WAITING_FOR_PUBLISHER), this.log("no existing stream, retrying in " + SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL / 1e3 + "s"), setTimeout(this.setupSubscriber.bind(this), SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL)
        })
    },setupSocket: function() {
        if (this.options.subscriber) {
            var t = SL.config.STREAM_ENGINE_HOST + "/" + SL.config.STREAM_ENGINE_LIVE_NAMESPACE;
            this.log("socket connected", t), this.socket = io.connect(t), this.socket.on("connect", this.onSocketConnected.bind(this)), this.socket.on("disconnect", this.onSocketDisconnected.bind(this)), this.socket.on("message", this.onSocketStateMessage.bind(this)), this.socket.on("subscribers", this.onSocketSubscribersMessage.bind(this))
        }
    },publish: function(t, e) {
        if (this.publishable) {
            var n = this.options.reveal.getState();
            n.publisher_id = this.options.publisherID, n = $.extend(n, e), this.log("publish", n.publisher_id), $.ajax({url: "/api/v1/decks/" + this.options.deckID + "/stream.json",type: "PUT",data: {state: JSON.stringify(n)},success: t})
        }
    },log: function() {
        if (this.debugMode && "function" == typeof console.log.apply) {
            var t = "Stream (" + (this.options.publisher ? "publisher" : "subscriber") + "):", e = [t].concat(Array.prototype.slice.call(arguments));
            console.log.apply(console, e)
        }
    },setState: function(t, e) {
        this.publishable = !1, e && $(".reveal").addClass("no-transition"), this.options.reveal.setState(t), this.stateChanged.dispatch(t), setTimeout(function() {
            this.publishable = !0, e && $(".reveal").removeClass("no-transition")
        }.bind(this), 1)
    },setStatus: function(t) {
        this.status !== t && (this.status = t, this.statusChanged.dispatch(this.status))
    },getRetryStartTime: function() {
        return this.retryStartTime
    },isPublisher: function() {
        return this.options.publisher
    },onSocketStateMessage: function(t) {
        try {
            var e = JSON.parse(t.data);
            e.publisher_id != this.options.publisherID && (this.log("sync", "from: " + e.publisher_id, "to: " + this.options.publisherID), this.setState(e))
        } catch (n) {
            this.log("unable to parse streamed deck state as JSON.")
        }
        this.setStatus(SL.helpers.StreamLive.STATUS_NONE)
    },onSocketSubscribersMessage: function(t) {
        this.subscribersChanged.dispatch(t.subscribers)
    },onSocketConnected: function() {
        this.socket.emit("subscribe", {deck_id: this.options.deckID,publisher: this.options.publisher}), this.socketIsDisconnected === !0 && (this.socketIsDisconnected = !1, this.log("socket connection regained"), this.setStatus(SL.helpers.StreamLive.STATUS_NONE))
    },onSocketDisconnected: function() {
        this.socketIsDisconnected === !1 && (this.socketIsDisconnected = !0, this.log("socket connection lost"), this.setStatus(SL.helpers.StreamLive.STATUS_CONNECTION_LOST))
    }}), SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL = 2e4, SL.helpers.StreamLive.STATUS_NONE = "", SL.helpers.StreamLive.STATUS_CONNECTION_LOST = "connection_lost", SL.helpers.StreamLive.STATUS_WAITING_FOR_PUBLISHER = "waiting_for_publisher", SL.helpers.ThemeController = {paint: function(t, e) {
        e = e || {};
        var n = $(".reveal-viewport");
        if (0 === n.length || "undefined" == typeof window.Reveal)
            return !1;
        if (this.cleanup(), n.addClass("theme-font-" + t.get("font")), n.addClass("theme-color-" + t.get("color")), Reveal.configure($.extend({center: t.get("center"),rolling_links: t.get("rolling_links"),transition: t.get("transition"),backgroundTransition: t.get("background_transition")}, e)), t.get("html")) {
            var i = $("#theme-html-output");
            i.length ? i.html(t.get("html")) : $(".reveal").append('<div id="theme-html-output">' + t.get("html") + "</div>")
        } else
            $("#theme-html-output").remove();
        if (t.get("css")) {
            var s = $("#theme-css-output");
            s.length ? s.html(t.get("css")) : $("head").append('<style id="theme-css-output">' + t.get("css") + "</style>")
        } else
            $("#theme-css-output").remove();
        if (e.js !== !1)
            if (t.get("js")) {
                var o = $("#theme-js-output");
                o.text() !== t.get("js") && (o.remove(), $("body").append('<script id="theme-js-output">' + t.get("js") + "</script>"))
            } else
                $("#theme-js-output").remove();
        SL.util.deck.sortInjectedStyles()
    },cleanup: function() {
        var t = $(".reveal-viewport"), e = $(".reveal");
        t.attr("class", t.attr("class").replace(/theme\-(font|color)\-([a-z0-9-])*/gi, "")), SL.config.THEME_TRANSITIONS.forEach(function(t) {
            e.removeClass(t.id)
        })
    }}, SL("components").DeckSharer = Class.extend({DEFAULT_WIDTH: 576,DEFAULT_HEIGHT: 420,init: function(t) {
        this.theme = t, this.onLinkOutputMouseDown = this.onLinkOutputMouseDown.bind(this), this.onEmbedOutputMouseDown = this.onEmbedOutputMouseDown.bind(this), this.onStyleChanged = this.onStyleChanged.bind(this), this.onSizeChanged = this.onSizeChanged.bind(this), this.width = this.DEFAULT_WIDTH, this.height = this.DEFAULT_HEIGHT, this.style = "", this.domElement = $("<div>").addClass("decksharer")
    },build: function() {
        this.domElement.empty(), this.domElement.append(['<div class="url">', "<h3>" + SL.locale.get("DECKSHARER_URL_TITLE") + "</h3>", '<input type="text" name="url" readonly="readonly" class="input-field" />', "</div>"].join("")), this.linkOutputElement = this.domElement.find(".url input"), this.linkOutputElement.on("mousedown", this.onLinkOutputMouseDown);
        var t = '<option value="dark" selected>Dark</option><option value="light">Light</option>';
        SL.current_user.isPro() && (t += '<option value="hidden">Hidden</option>'), this.domElement.append(['<div class="embed sl-form">', "<h3>" + SL.locale.get("DECKSHARER_EMBED_TITLE") + "</h3>", '<div class="options">', '<div class="option">', "<label>Width:</label>", '<input type="text" name="width" maxlength="4" class="input-field" />', "</div>", '<div class="option">', "<label>Height:</label>", '<input type="text" name="height" maxlength="4" class="input-field" />', "</div>", '<div class="option">', "<label>Footer style:</label>", '<select class="sl-select l" name="style">', t, "</select>", "</div>", "</div>", '<textarea name="output" readonly="readonly"></textarea>', "</div>"].join("")), this.embedStyleElement = this.domElement.find(".embed .options select[name=style]"), this.embedWidthElement = this.domElement.find(".embed .options input[name=width]"), this.embedHeightElement = this.domElement.find(".embed .options input[name=height]"), this.embedOutputElement = this.domElement.find(".embed textarea"), this.embedStyleElement.on("change", this.onStyleChanged), this.embedWidthElement.on("input", this.onSizeChanged), this.embedHeightElement.on("input", this.onSizeChanged), this.embedOutputElement.on("mousedown", this.onEmbedOutputMouseDown), this.embedWidthElement.val(this.width), this.embedHeightElement.val(this.height), this.isPrivate && this.domElement.append(['<div class="note">', '<p class="note-inner">', SL.locale.get("DECKSHARER_PRIVATE_URL_NOTICE"), "</p>", "</div>"].join(""))
    },render: function(t) {
        if (t && "string" != typeof t.slug || "string" != typeof t.user.username)
            throw "Must specify username and slug of deck to embed.";
        this.data = t, this.isPrivate = "string" == typeof this.data.access_token && (this.data.visibility === SL.models.Deck.VISIBILITY_SELF || this.data.visibility === SL.models.Deck.VISIBILITY_TEAM), this.build(), this.generate()
    },appendTo: function(t) {
        $(t).append(this.domElement)
    },prependTo: function(t) {
        $(t).prepend(this.domElement)
    },generate: function() {
        var t = this.getDeckURL(), e = this.getDeckURL(!0) + "/embed", n = [];
        this.isPrivate && this.data.access_token && n.push("token=" + this.data.access_token), t += n.length ? "?" + n.join("&") : "", "string" == typeof this.style && this.style.length > 0 && n.push("style=" + this.style), e += n.length ? "?" + n.join("&") : "";
        var i = '<iframe src="' + e + '" width="' + this.width + '" height="' + this.height + '" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        this.embedOutputElement && this.embedOutputElement.text(i), this.linkOutputElement && this.linkOutputElement.val(t)
    },getDeckURL: function(t) {
        var e = this.data.slug || this.data.id, n = t ? "" : "http:";
        return n + "//" + document.location.host + SL.routes.DECK(this.data.user.username, e)
    },onEmbedOutputMouseDown: function(t) {
        t.preventDefault(), this.embedOutputElement.focus().select()
    },onLinkOutputMouseDown: function(t) {
        t.preventDefault(), this.linkOutputElement.focus().select()
    },onSizeChanged: function() {
        this.width = parseInt(this.embedWidthElement.val(), 10) || 1, this.height = parseInt(this.embedHeightElement.val(), 10) || 1, this.generate()
    },onStyleChanged: function() {
        this.style = this.embedStyleElement.val(), this.generate()
    }}), SL("components.form").Scripts = Class.extend({init: function(t) {
        this.domElement = $(t), this.render(), this.readValues(), this.renderList()
    },render: function() {
        this.valueElement = this.domElement.find(".value-holder"), this.listElement = $('<ul class="list">'), this.listElement.delegate("li .remove", "click", this.onListItemRemove.bind(this)), this.listElement.appendTo(this.domElement), this.inputWrapper = $('<div class="input-wrapper"></div>').appendTo(this.domElement), this.inputElement = $('<input type="text" placeholder="https://...">'), this.inputElement.on("keyup", this.onInputKeyUp.bind(this)), this.inputElement.appendTo(this.inputWrapper), this.submitElement = $('<div class="button outline">Add</div>'), this.submitElement.on("click", this.submitInput.bind(this)), this.submitElement.appendTo(this.inputWrapper), this.domElement.parents("form").first().on("submit", this.onFormSubmit.bind(this))
    },renderList: function() {
        this.listElement.empty(), this.values.forEach(function(t) {
            this.listElement.append(['<li class="list-item" data-value="' + t + '">', t, '<span class="icon i-x remove"></span>', "</li>"].join(""))
        }.bind(this))
    },formatValues: function() {
        for (var t = 0; t < this.values.length; t++)
            this.values[t] = SL.util.string.trim(this.values[t]), "" === this.values[t] && this.values.splice(t, 1)
    },readValues: function() {
        this.values = (this.valueElement.val() || "").split(","), this.formatValues()
    },writeValues: function() {
        this.formatValues(), this.valueElement.val(this.values.join(","))
    },addValue: function(t) {
        return t = t || "", 0 === t.search(/https\:\/\//gi) ? (this.values.push(t), this.renderList(), this.writeValues(), !0) : 0 === t.search(/http\:\/\//gi) ? (SL.notify("Script must be loaded via HTTPS", "negative"), !1) : (SL.notify("Please enter a valid script URL", "negative"), !1)
    },removeValue: function(t) {
        if ("string" == typeof t)
            for (var e = 0; e < this.values.length; e++)
                this.values[e] === t && this.values.splice(e, 1);
        else
            "number" == typeof t && this.values.splice(t, 1);
        this.renderList(), this.writeValues()
    },submitInput: function() {
        this.addValue(this.inputElement.val()) && this.inputElement.val("")
    },onListItemRemove: function(t) {
        var e = $(t.target).parent().index();
        "number" == typeof e && this.removeValue(e)
    },onInputKeyUp: function(t) {
        13 === t.keyCode && this.submitInput()
    },onFormSubmit: function(t) {
        return this.inputElement.is(":focus") ? (t.preventDefault(), !1) : void 0
    }}), SL("components").FormUnit = Class.extend({init: function(t) {
        this.domElement = $(t), this.inputElement = this.domElement.find("input"), this.errorElement = $('<div class="error">'), this.errorIcon = $('<span class="icon">!</span>').appendTo(this.errorElement), this.errorMessage = $('<p class="message">!</p>').appendTo(this.errorElement), this.validateType = this.domElement.attr("data-validate"), this.validateTimeout = -1, this.originalValue = this.inputElement.val(), this.originalError = this.domElement.attr("data-error-message"), this.asyncValidatedValue = null, this.clientErrors = [], this.serverErrors = [], this.inputElement.on("input", this.onInput.bind(this)), this.inputElement.on("change", this.onInputChange.bind(this)), this.inputElement.on("focus", this.onInputFocus.bind(this)), this.inputElement.on("blur", this.onInputBlur.bind(this)), this.inputElement.on("invalid", this.onInputInvalid.bind(this)), this.domElement.parents("form").first().on("submit", this.onFormSubmit.bind(this)), this.originalError && (this.domElement.removeClass("hidden"), this.validate(), this.inputElement.focus()), this.domElement.data("controller", this)
    },validate: function(t) {
        clearTimeout(this.validateTimeout);
        var e = this.inputElement.val();
        if ("string" != typeof e)
            return this.serverErrors = [], this.clientErrors = [], void this.render();
        if (e === this.originalValue && (this.originalValue || "password" === this.validateType) && this.originalError)
            this.clientErrors = [this.originalError];
        else if (e.length) {
            var n = SL.util.validate[this.validateType];
            "function" == typeof n ? this.clientErrors = n(e) : console.log('Could not find validation method of type "' + this.validateType + '"')
        } else
            this.clientErrors = [], t && this.isRequired() && this.clientErrors.push(SL.locale.FORM_ERROR_REQUIRED);
        return this.validateAsync(), this.render(), 0 === this.clientErrors.length && 0 === this.serverErrors.length
    },validateAsync: function() {
        if ("username" === this.validateType) {
            var t = SLConfig && SLConfig.current_user ? SLConfig.current_user.username : "", e = this.inputElement.val();
            0 === SL.util.validate.username(e).length && (t && e === t ? (this.asyncValidatedValue = t, this.serverErrors = []) : e !== this.asyncValidatedValue && $.ajax({url: SL.config.AJAX_LOOKUP_USER,type: "GET",data: {id: e},context: this,statusCode: {204: function() {
                        this.serverErrors = [SL.locale.get("FORM_ERROR_USERNAME_TAKEN")]
                    },404: function() {
                        this.serverErrors = []
                    }}}).complete(function() {
                this.render(), this.asyncValidatedValue = e
            }))
        } else if ("team_slug" === this.validateType) {
            var n = SL.current_team ? SL.current_team.get("slug") : "", i = this.inputElement.val();
            0 === SL.util.validate.team_slug(i).length && (n && i === n ? (this.asyncValidatedValue = n, this.serverErrors = []) : i !== this.asyncValidatedValue && $.ajax({url: SL.config.AJAX_LOOKUP_ORGANIZATION,type: "GET",data: {id: i},context: this,statusCode: {204: function() {
                        this.serverErrors = [SL.locale.get("FORM_ERROR_ORGANIZATION_SLUG_TAKEN")]
                    },404: function() {
                        this.serverErrors = []
                    }}}).complete(function() {
                this.render(), this.asyncValidatedValue = i
            }))
        }
    },render: function() {
        var t = this.serverErrors.concat(this.clientErrors);
        t.length ? (this.domElement.addClass("has-error"), this.errorElement.appendTo(this.domElement), this.errorMessage.text(t[0]), setTimeout(function() {
            this.errorElement.addClass("visible")
        }.bind(this), 1)) : (this.domElement.removeClass("has-error"), this.errorElement.removeClass("visible").remove())
    },format: function() {
        if ("username" === this.validateType || "team_slug" === this.validateType) {
            var t = this.inputElement.val();
            t && this.inputElement.val(this.inputElement.val().toLowerCase())
        }
        if ("url" === this.validateType) {
            var t = this.inputElement.val();
            /^http(s?):\/\//gi.test(t) === !1 && this.inputElement.val("http://" + t)
        }
    },focus: function() {
        this.inputElement.focus()
    },beforeSubmit: function() {
        return this.validate(!0), this.clientErrors.length > 0 || this.serverErrors.length > 0 ? (this.focus(), !1) : !0
    },renderImage: function() {
        var t = this.inputElement.get(0);
        if (t.files && t.files[0]) {
            var e = new FileReader;
            e.onload = function(t) {
                var e = this.domElement.find("img"), n = t.target.result;
                e.length ? e.attr("src", n) : $('<img src="' + n + '">').appendTo(this.domElement.find(".image-uploader"))
            }.bind(this), e.readAsDataURL(t.files[0])
        }
    },isRequired: function() {
        return !this.domElement.hasClass("hidden") && this.domElement.is("[data-required]")
    },isUnchanged: function() {
        return this.inputElement.val() === this.originalValue
    },onInput: function() {
        if (clearTimeout(this.validateTimeout), !SL.util.device.IS_PHONE && !SL.util.device.IS_TABLET) {
            var t = 600;
            (this.clientErrors.length || this.serverErrors.length) && (t = 300), this.validateTimeout = setTimeout(this.validate.bind(this), t)
        }
    },onInputChange: function(t) {
        this.domElement.hasClass("image") && this.renderImage(t.target), this.validate()
    },onInputFocus: function() {
        this.domElement.addClass("focused")
    },onInputBlur: function() {
        this.format(), this.domElement.removeClass("focused")
    },onInputInvalid: function(t) {
        return this.beforeSubmit(t)
    },onFormSubmit: function(t) {
        return this.beforeSubmit(t) === !1 ? (t.preventDefault(), !1) : void 0
    }}), SL("components").Header = Class.extend({init: function() {
        this.domElement = $(".global-header"), this.render(), this.bind()
    },render: function() {
        var t = this.domElement.find(".profile-button .nav-item-anchor"), e = [{label: "Profile",icon: "home",url: SL.routes.USER(SL.current_user.get("username"))}, {label: "New deck",icon: "plus",url: SL.routes.DECK_NEW(SL.current_user.get("username"))}];
        SL.current_user.isEnterpriseManager() && e.push({label: "Themes",icon: "brush",url: SL.routes.THEME_EDITOR}), e.push({label: "Settings",icon: "cog",url: SL.routes.USER_EDIT}), SL.current_user.isPro() && !SL.current_user.isEnterprise() ? e.push({label: "Billing",icon: "credit",url: SL.routes.BILLING_DETAILS}) : SL.current_user.isEnterprise() || e.push({label: "Upgrade",icon: "star",url: SL.routes.PRICING}), e.push({label: "Sign out",icon: "exit",url: SL.routes.SIGN_OUT,attributes: {rel: "nofollow","data-method": "delete"}}), this.dropdown = new SL.components.Menu({anchor: t,anchorSpacing: 10,alignment: "auto",minWidth: 160,showOnHover: !0,options: e})
    },bind: function() {
        this.domElement.find(".logo-animation").on("contextmenu", function() {
            return window.location.href = "/about#logo", !1
        }), this.domElement.hasClass("show-on-scroll") && ($(document).on("mousemove", this.onDocumentMouseMove.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this)))
    },onWindowScroll: function() {
        this.isScrolledDown = $(window).scrollTop() > 30, this.domElement.toggleClass("show", this.isScrolledDown)
    },onDocumentMouseMove: function(t) {
        if (!this.isScrolledDown) {
            var e = t.clientY;
            e > 0 && (20 > e && !this.isMouseOver ? (this.domElement.addClass("show"), this.isMouseOver = !0) : e > 80 && this.isMouseOver && 0 === $(t.target).parents(".global-header").length && (this.domElement.removeClass("show"), this.isMouseOver = !1))
        }
    }}), SL("components").Kudos = function() {
    function t() {
        $("[data-kudos-value][data-kudos-id]").each(function(t, e) {
            var n = e.getAttribute("data-kudos-id");
            n && !r[n] && (r[n] = e.getAttribute("data-kudos-value"))
        }.bind(this)), $(".kudos-trigger[data-kudos-id]").on("click", function(t) {
            var i = t.currentTarget;
            "true" === i.getAttribute("data-kudoed-by-user") ? n(i.getAttribute("data-kudos-id")) : e(i.getAttribute("data-kudos-id"))
        }.bind(this))
    }
    function e(t) {
        i(t), $.ajax({type: "POST",url: SL.config.AJAX_KUDO_DECK(t),context: this}).fail(function() {
            s(t), SL.notify(SL.locale.get("GENERIC_ERROR"))
        })
    }
    function n(t) {
        s(t), $.ajax({type: "DELETE",url: SL.config.AJAX_UNKUDO_DECK(t),context: this}).fail(function() {
            i(t), SL.notify(SL.locale.get("GENERIC_ERROR"))
        })
    }
    function i(t) {
        var e = $('.kudos-trigger[data-kudos-id="' + t + '"]');
        e.attr("data-kudoed-by-user", "true"), r[t]++, o(t, r[t]);
        var n = e.find(".kudos-icon");
        n.length && (n.removeClass("bounce"), setTimeout(function() {
            n.addClass("bounce")
        }, 1))
    }
    function s(t) {
        var e = $('.kudos-trigger[data-kudos-id="' + t + '"]');
        e.attr("data-kudoed-by-user", "false"), r[t]--, o(t, r[t]), e.find(".kudos-icon").removeClass("bounce")
    }
    function o(t, e) {
        "number" == typeof r[t] && ("number" == typeof e && (r[t] = e), e = Math.max(r[t], 0), $("[data-kudos-id][data-kudos-value]").each(function(t, n) {
            n.setAttribute("data-kudos-value", e)
        }))
    }
    var r = {};
    t()
}(), SL("components").Menu = Class.extend({init: function(t) {
        this.config = $.extend({alignment: "auto",anchorSpacing: 10,minWidth: 0,offsetX: 0,offsetY: 0,options: [],showOnHover: !1}, t), this.config.anchor = $(this.config.anchor), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.layout = this.layout.bind(this), this.toggle = this.toggle.bind(this), this.onMouseOver = this.onMouseOver.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this), this.onDocumentKeydown = this.onDocumentKeydown.bind(this), this.destroyed = new signals.Signal, this.render(), this.renderList(), this.config.anchor.length && (/(iphone|ipod|ipad|android|windows\sphone)/gi.test(navigator.userAgent) ? (this.config.anchor.addClass("menu-show-on-touch"), this.config.anchor.on("touchstart pointerdown", function(t) {
            t.preventDefault(), this.toggle()
        }.bind(this)), this.config.anchor.on("click", function(t) {
            t.preventDefault()
        }.bind(this))) : (this.config.showOnHover && (this.config.anchor.on("mouseover", this.onMouseOver), this.config.anchor.is(":hover") && this.onMouseOver()), this.config.anchor.on("click", this.toggle)))
    },render: function() {
        this.domElement = $('<div class="sl-menu">'), this.listElement = $('<div class="sl-menu-list">').appendTo(this.domElement), this.arrowElement = $('<div class="sl-menu-arrow">').appendTo(this.domElement), this.hitareaElement = $('<div class="sl-menu-hitarea">').appendTo(this.domElement), this.listElement.css("minWidth", this.config.minWidth + "px")
    },renderList: function() {
        this.config.options.forEach(function(t) {
            var e;
            e = $("string" == typeof t.url ? '<a class="sl-menu-item" href="' + t.url + '">' : '<div class="sl-menu-item">'), e.html('<span class="label">' + t.label + "</span>"), e.data("callback", t.callback), e.appendTo(this.listElement), e.on("click", function(t) {
                var e = $(t.currentTarget).data("callback");
                "function" == typeof e && e.apply(null), this.hide()
            }.bind(this)), t.icon && e.append('<span class="icon i-' + t.icon + '"></span>'), t.attributes && e.attr(t.attributes)
        }.bind(this)), this.listElement.find(".sl-menu-item:not(:last-child)").after('<div class="sl-menu-divider">')
    },bind: function() {
        $(window).on("resize scroll", this.layout), $(document).on("keydown", this.onDocumentKeydown), $(document).on("mousedown touchstart pointerdown", this.onDocumentMouseDown)
    },unbind: function() {
        $(window).off("resize scroll", this.layout), $(document).off("keydown", this.onDocumentKeydown), $(document).off("mousedown touchstart pointerdown", this.onDocumentMouseDown)
    },layout: function() {
        if (this.config.anchor.length) {
            var t = this.config.anchor.offset(), e = this.config.anchorSpacing, n = this.config.alignment, i = $(window).scrollLeft(), s = $(window).scrollTop(), o = t.left + this.config.offsetX, r = t.top + this.config.offsetY, a = this.config.anchor.outerWidth(), l = this.config.anchor.outerHeight(), c = this.domElement.outerWidth(), u = this.domElement.outerHeight(), d = c / 2, h = c / 2, p = 8;
            switch ("auto" === n && (n = t.top - (u + e + p) < s ? "b" : "t"), this.domElement.attr("data-alignment", n), n) {
                case "t":
                    o += (a - c) / 2, r -= u + e;
                    break;
                case "b":
                    o += (a - c) / 2, r += l + e;
                    break;
                case "l":
                    o -= c + e, r += (l - u) / 2;
                    break;
                case "r":
                    o += a + e, r += (l - u) / 2
            }
            switch (o = Math.min(Math.max(o, i + e), window.innerWidth + i - c - e), r = Math.min(Math.max(r, s + e), window.innerHeight + s - u - e), n) {
                case "t":
                    d = t.left - o + a / 2, h = u;
                    break;
                case "b":
                    d = t.left - o + a / 2, h = -p;
                    break;
                case "l":
                    d = c, h = t.top - r + l / 2;
                    break;
                case "r":
                    d = -p, h = t.top - r + l / 2
            }
            this.domElement.css({left: o,top: r}), this.arrowElement.css({left: d,top: h}), this.hitareaElement.css({top: -e,right: -e,bottom: -e,left: -e})
        }
    },focus: function(t) {
        var e = this.listElement.find(".focus");
        if (e.length) {
            var n = t > 0 ? e.nextAll(".sl-menu-item").first() : e.prevAll(".sl-menu-item").first();
            n.length && (e.removeClass("focus"), n.addClass("focus"))
        } else
            this.listElement.find(".sl-menu-item").first().addClass("focus")
    },show: function() {
        this.domElement.removeClass("visible").appendTo(document.body), setTimeout(function() {
            this.domElement.addClass("visible")
        }.bind(this), 1), this.config.anchor.addClass("menu-is-open"), this.layout(), this.bind()
    },hide: function() {
        this.listElement.find(".focus").removeClass("focus"), this.config.anchor.removeClass("menu-is-open"), this.domElement.detach(), this.unbind(), $(document).off("mousemove", this.onDocumentMouseMove), this.isMouseOver = !1, clearTimeout(this.hideTimeout)
    },toggle: function() {
        this.isVisible() ? this.hide() : this.show()
    },isVisible: function() {
        return this.domElement.parent().length > 0
    },destroy: function() {
        this.destroyed.dispatch(), this.destroyed.dispose(), this.domElement.remove(), this.unbind(), this.config.anchor.off("click", this.toggle), this.config.anchor.off("hover", this.toggle)
    },onDocumentKeydown: function(t) {
        if (27 === t.keyCode && (this.hide(), t.preventDefault()), 13 === t.keyCode) {
            var e = this.listElement.find(".focus");
            e.length && (e.trigger("click"), t.preventDefault())
        } else
            38 === t.keyCode ? (this.focus(-1), t.preventDefault()) : 40 === t.keyCode ? (this.focus(1), t.preventDefault()) : 9 === t.keyCode && t.shiftKey ? (this.focus(-1), t.preventDefault()) : 9 === t.keyCode && (this.focus(1), t.preventDefault())
    },onMouseOver: function() {
        this.isMouseOver || ($(document).on("mousemove", this.onDocumentMouseMove), this.hideTimeout = -1, this.isMouseOver = !0, this.show())
    },onDocumentMouseMove: function(t) {
        var e = $(t.target);
        0 === e.closest(this.domElement).length && 0 === e.closest(this.config.anchor).length ? -1 === this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(this.hide, 150)) : this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = -1)
    },onDocumentMouseDown: function(t) {
        var e = $(t.target);
        this.isVisible() && 0 === e.closest(this.domElement).length && 0 === e.closest(this.config.anchor).length && this.hide()
    }}), SL("components").Meter = Class.extend({init: function(t) {
        this.domElement = $(t), this.labelElement = $('<div class="label">').appendTo(this.domElement), this.progressElement = $('<div class="progress">').appendTo(this.domElement), this.read(), this.paint(), window.m = this
    },read: function() {
        switch (this.unit = "", this.type = this.domElement.attr("data-type"), this.value = parseInt(this.domElement.attr("data-value"), 10) || 0, this.total = parseInt(this.domElement.attr("data-total"), 10) || 0, this.type) {
            case "storage":
                var t = 1024, e = 1024 * t, n = 1024 * e;
                this.value < e && this.total < e && (this.value = Math.round(this.value / t), this.total = Math.round(this.total / t), this.unit = "KB"), this.value < n && this.total < n ? (this.value = Math.round(this.value / e), this.total = Math.round(this.total / e), this.unit = "MB") : (this.value = (this.value / n).toFixed(2), this.total = (this.total / n).toFixed(2), this.unit = "GB")
        }
    },paint: function() {
        var t = Math.min(Math.max(this.value / this.total, 0), 1) || 0;
        this.labelElement.text(this.value + " / " + this.total + " " + this.unit), this.progressElement.width(100 * t + "%"), 0 === this.total ? this.domElement.attr("data-state", "invalid") : t > .9 ? this.domElement.attr("data-state", "negative") : t > .7 ? this.domElement.attr("data-state", "warning") : this.domElement.attr("data-state", "positive")
    }}), SL.modal = function() {
    function t() {
        $(['<div class="inner edit-html">', "<h3>Edit HTML</h3>", '<div id="ace-html" class="editor"></div>', "<footer>", '<button class="button grey negative close xl">Cancel</button>', '<button class="button save-changes xl">OK</button>', "</footer>", "</div>"].join("")).appendTo(a);
        this.htmlEditor && "function" == typeof this.htmlEditor.destroy && (this.htmlEditor.destroy(), this.htmlEditor = null);
        try {
            SL.htmlEditor = ace.edit("ace-html"), SL.htmlEditor.setTheme("ace/theme/monokai"), SL.htmlEditor.setDisplayIndentGuides(!0), SL.htmlEditor.setShowPrintMargin(!1), SL.htmlEditor.getSession().setMode("ace/mode/html")
        } catch (t) {
            console.log("An error occurred while initializing the Ace editor.")
        }
        var e = SL.editor.controllers.Serialize.getSlideAsString(Reveal.getCurrentSlide(), {inner: !0,exclude: ".math-output"});
        SL.htmlEditor.env.document.setValue(SL.util.html.indent(e)), SL.htmlEditor.focus(), a.find(".save-changes").on("click", function() {
            SL.editor.controllers.Markup.writeHTMLToCurrentSlide(SL.htmlEditor.env.document.getValue()), SL.modal.close()
        })
    }
    function e() {
        $(['<div class="inner no-session">', "<h3>Session Expired</h3>", "<p>You are no longer signed in to Slides. This can happen when you leave the editor idle for too long, log out in a different tab or go offline. To continue please:</p>", "<ol>", '<li><a href="' + SL.routes.SIGN_IN + '" target="_blank">Sign in</a> to Slides from another browser tab.</li>', "<li>Come back to this tab and press the 'Retry' button.</li>", "</ol>", "<footer>", '<button class="button outline negative close l">Ignore</button>', '<button class="button retry l">Retry</button>', "</footer>", "</div>"].join("")).appendTo(a);
        a.find(".retry").on("click", function() {
            SL.editor.controllers.Session.checkLogin(!0)
        })
    }
    function n(t) {
        var e = $(['<div class="inner share-deck">', "<footer>", '<button class="button xl done close">Done</button>', "</footer>", "</div>"].join("")).appendTo(a);
        controller = new SL.components.DeckSharer, controller.prependTo(e), e.data("decksharer", controller), controller.render(t)
    }
    function i(t) {
        var e = $(['<div class="inner preview-deck">', '<div class="spinner centered"></div>', '<div class="deck"></div>', "<footer></footer>", "</div>"].join("")).appendTo(a), n = e.find(".deck").empty(), i = e.find("footer").empty();
        e.addClass("loading"), SL.util.html.generateSpinners();
        var s = $("<iframe>", {src: t.src,load: function() {
                e.removeClass("loading")
            }});
        s.appendTo(n), i.append(t.footer ? t.footer : '<button class="button close l">Close</button>')
    }
    function s(t) {
        var e = $(['<div class="inner insert-snippet">', '<h3>Insert: "' + t.snippet.get("title") + '"</h3>', '<div class="variables sl-form"></div>', "<footer>", '<button class="button outline close l">Cancel</button>', '<button class="button insert l">Insert</button>', "</footer>", "</div>"].join("")).appendTo(a), n = a.find(".insert"), i = t.snippet.getTemplateVariables(), s = e.find(".variables");
        i.forEach(function(t) {
            var e = $(['<div class="unit">', "<label>" + t.label + "</label>", '<input type="text" value="' + t.defaultValue + '">', "</div>"].join("")).appendTo(s);
            e.find("input").data("variable", t), e.find("input").on("keydown", function(t) {
                13 === t.keyCode && n.trigger("click")
            })
        }), setTimeout(function() {
            e.find("input").first().focus()
        }, 1), n.on("click", function() {
            s.find("input").each(function(t, e) {
                e = $(e), e.data("variable").value = e.val()
            }), t.callback(t.snippet.templatize(i)), SL.modal.close()
        })
    }
    function o() {
        var t = a.find(".preview-deck");
        t.find(".deck iframe").attr("src", ""), t.find(".deck").empty(), t.find("footer").empty()
    }
    function r() {
        var t = a.find(">.inner");
        t.css({left: Math.max((window.innerWidth - t.outerWidth()) / 2, 10),top: Math.max((window.innerHeight - t.outerHeight()) / 2, 10)})
    }
    var a = $('<div id="modal">').appendTo(document.body), l = $('<div id="modal-cover">').appendTo(document.body), c = $('<div id="modal-background">').appendTo(document.body), u = null, d = null;
    return $(document).on("keyup", function(t) {
        27 === t.keyCode && SL.modal.isOpen() && SL.modal.close()
    }), a.add(l).on("click", function(t) {
        t.target === this && SL.modal.close()
    }), a.on("click", ".close", function() {
        SL.modal.close()
    }), {open: function(o, l) {
            switch (a.find(">.inner").remove(), u = o, o) {
                case "edit-html":
                    t(l);
                    break;
                case "no-session":
                    e(l);
                    break;
                case "share-deck":
                    n(l);
                    break;
                case "preview-deck":
                    i(l);
                    break;
                case "insert-snippet":
                    s(l)
            }
            $("html").addClass("modal-open"), clearTimeout(d), c.show(), a.find(">.inner").removeClass("visible"), a.find("." + o).addClass("visible"), $(window).on("resize", r), r()
        },close: function() {
            $("html").removeClass("modal-open"), a.find(".save-changes").off(), a.find(".discard-changes").off(), d = setTimeout(function() {
                switch (c.hide(), a.find(">.inner").removeClass("visible"), u) {
                    case "preview-deck":
                        o()
                }
            }, 400), $(window).off("resize", r)
        },isOpen: function(t) {
            var e = $("html").hasClass("modal-open");
            return e && t && (e = a.find("." + t).hasClass("visible")), e
        }}
}(), SL.notify = function(t, e) {
    function n() {
        i(), a = setTimeout(function() {
            o.addClass("no-transition").fadeOut(600, s)
        }, e.duration)
    }
    function i() {
        clearTimeout(a), o.stop().css("opacity", "")
    }
    function s() {
        clearTimeout(a), o.remove(), r.dispatch()
    }
    0 === $(".sl-notifications").length && $(document.body).append('<div class="sl-notifications"></div>'), $(".sl-notifications>p").last().html() === t && $(".sl-notifications>p").last().remove(), "string" == typeof e && (e = {type: e}), e = $.extend({type: "",duration: 2500 + 15 * t.length,autoHide: !0}, e), "negative" === e.type && (e.duration = 1.5 * e.duration);
    var o = $("<p>").html(t).addClass(e.type).appendTo($(".sl-notifications")).on("click", s);
    e.autoHide && (o.on("mouseover", i), o.on("mouseout", n));
    var r = new signals.Signal, a = -1;
    return setTimeout(function() {
        o.addClass("show"), e.autoHide && n()
    }, 1), {domElement: o,destroy: s,destroyed: r}
}, SL("components").Prompt = Class.extend({init: function(t) {
        this.config = $.extend({type: "custom",data: null,anchor: null,title: null,optional: !0,alignment: "auto",offsetX: 0,offsetY: 0,className: null,confirmLabel: "OK",cancelLabel: "Cancel"}, t), this.onBackgroundClicked = this.onBackgroundClicked.bind(this), this.onDocumentKeydown = this.onDocumentKeydown.bind(this), this.onPromptCancelClick = this.onPromptCancelClick.bind(this), this.onPromptConfirmClick = this.onPromptConfirmClick.bind(this), this.onInputChanged = this.onInputChanged.bind(this), this.layout = this.layout.bind(this), this.confirmed = new signals.Signal, this.canceled = new signals.Signal, this.destroyed = new signals.Signal, this.render()
    },render: function() {
        this.domElement = $('<div class="sl-prompt" data-type="' + this.config.type + '">'), this.innerElement = $('<div class="inner">').appendTo(this.domElement), this.arrowElement = $('<div class="arrow">').appendTo(this.innerElement), this.config.title && (this.titleElement = $('<h3 class="title">').html(this.config.title).appendTo(this.innerElement)), this.config.className && this.domElement.addClass(this.config.className), this.config.html && this.innerElement.append(this.config.html), "select" === this.config.type ? this.renderSelect() : "list" === this.config.type ? (this.renderList(), this.renderButtons(!this.config.multiselect, this.config.multiselect)) : "input" === this.config.type && (this.renderInput(), this.renderButtons())
    },renderSelect: function() {
        this.config.data.forEach(function(t) {
            var e = $('<a class="item button outline l">').html(t.html);
            e.data("callback", t.callback), e.appendTo(this.innerElement), e.on("vclick", function(t) {
                var e = $(t.currentTarget).data("callback");
                "function" == typeof e && e.apply(null), this.destroy(), t.preventDefault()
            }.bind(this)), t.focused === !0 && e.addClass("focus"), t.selected === !0 && e.addClass("selected"), "string" == typeof t.className && e.addClass(t.className)
        }.bind(this)), this.domElement.attr("data-length", this.config.data.length)
    },renderList: function() {
        this.listElement = $('<div class="list">').appendTo(this.innerElement), this.config.data.forEach(function(t) {
            var e = $('<div class="item">');
            e.html('<span class="title">' + (t.title ? t.title : t.value) + '</span><span class="checkmark icon i-checkmark"></span>'), e.data({callback: t.callback,value: t.value}), e.appendTo(this.listElement), e.on("click", function(t) {
                var e = $(t.currentTarget), n = e.data("callback"), i = e.data("value");
                this.config.multiselect && e.toggleClass("selected"), "function" == typeof n && n.apply(null, [i, e.hasClass("selected")]), this.config.multiselect || (this.confirmed.dispatch(i), this.destroy())
            }.bind(this)), t.focused === !0 && e.addClass("focus"), t.selected === !0 && e.addClass("selected"), "string" == typeof t.className && e.addClass(t.className)
        }.bind(this))
    },renderInput: function() {
        this.config.data.multiline === !0 ? this.inputElement = $('<textarea cols="40" rows="8">') : (this.inputElement = $('<input type="text">'), "number" == typeof this.config.data.width && this.inputElement.css("width", this.config.data.width)), this.config.data.value && this.inputElement.val(this.config.data.value), this.config.data.placeholder && this.inputElement.attr("placeholder", this.config.data.placeholder), this.config.data.maxlength && this.inputElement.attr("maxlength", this.config.data.maxlength), this.inputWrapperElement = $('<div class="input-wrapper">').append(this.inputElement), this.inputWrapperElement.appendTo(this.innerElement), this.onInputChanged()
    },renderButtons: function(t, e) {
        this.footerElement = $('<div class="footer">').appendTo(this.innerElement), !e && this.config.optional && this.config.cancelLabel && this.footerElement.append('<button class="button l outline white prompt-cancel">' + this.config.cancelLabel + "</button>"), !t && this.config.confirmLabel && this.footerElement.append('<button class="button l prompt-confirm">' + this.config.confirmLabel + "</button>")
    },bind: function() {
        $(window).on("resize", this.layout), $(document).on("keydown", this.onDocumentKeydown), this.domElement.on("vclick", this.onBackgroundClicked), "hidden" !== $("html").css("overflow") && $(window).on("scroll", this.layout), this.domElement.find(".prompt-cancel").on("vclick", this.onPromptCancelClick), this.domElement.find(".prompt-confirm").on("vclick", this.onPromptConfirmClick), this.inputElement && this.inputElement.on("input", this.onInputChanged)
    },unbind: function() {
        $(window).off("resize scroll", this.layout), $(document).off("keydown", this.onDocumentKeydown), this.domElement.off("vclick", this.onBackgroundClicked), this.domElement.find(".prompt-cancel").off("vclick", this.onPromptCancelClick), this.domElement.find(".prompt-confirm").off("vclick", this.onPromptConfirmClick), this.inputElement && this.inputElement.off("input", this.onInputChanged)
    },layout: function() {
        var t = this.innerElement.outerWidth(), e = this.innerElement.outerHeight(), n = $(this.config.anchor);
        if (n.length) {
            var i = n.offset(), s = 15, o = this.config.alignment, r = $(window).scrollLeft(), a = $(window).scrollTop(), l = i.left - $(window).scrollLeft(), c = i.top - $(window).scrollTop();
            l += this.config.offsetX, c += this.config.offsetY;
            var u = n.outerWidth(), d = n.outerHeight(), h = t / 2, p = t / 2, f = 8;
            switch ("auto" === o && (o = i.top - (e + s + f) < a ? "b" : "t"), this.domElement.attr("data-alignment", o), o) {
                case "t":
                    l += (u - t) / 2, c -= e + s;
                    break;
                case "b":
                    l += (u - t) / 2, c += d + s;
                    break;
                case "l":
                    l -= t + s, c += (d - e) / 2;
                    break;
                case "r":
                    l += u + s, c += (d - e) / 2
            }
            switch (l = Math.min(Math.max(l, s), window.innerWidth - t - s), c = Math.min(Math.max(c, s), window.innerHeight - e - s), o) {
                case "t":
                    h = i.left - l - r + u / 2, p = e;
                    break;
                case "b":
                    h = i.left - l - r + u / 2, p = -f;
                    break;
                case "l":
                    h = t, p = i.top - c - a + d / 2;
                    break;
                case "r":
                    h = -f, p = i.top - c - a + d / 2
            }
            this.innerElement.css({left: l,top: c}), this.arrowElement.css({left: h,top: p}).show()
        } else
            this.innerElement.css({left: Math.round((window.innerWidth - t) / 2),top: Math.round(.4 * (window.innerHeight - e))}), this.arrowElement.hide()
    },focus: function(t) {
        var e = this.innerElement.find(".focus");
        if (e.length || (e = this.innerElement.find(".selected")), e.length) {
            var n = t > 0 ? e.next(".item") : e.prev(".item");
            n.length && (e.removeClass("focus"), n.addClass("focus"))
        } else
            this.innerElement.find(".item").first().addClass("focus")
    },show: function() {
        var t = $(this.config.anchor);
        t.length && t.addClass("focus"), this.domElement.removeClass("visible").appendTo(document.body), setTimeout(function() {
            this.domElement.addClass("visible")
        }.bind(this), 1), this.layout(), this.bind(), this.inputElement && this.inputElement.focus()
    },hide: function() {
        var t = $(this.config.anchor);
        t.length && t.removeClass("focus"), this.domElement.detach(), this.unbind()
    },getValue: function() {
        var t = void 0;
        return "input" === this.config.type && (t = this.inputElement.val()), t
    },getDOMElement: function() {
        return this.domElement
    },cancel: function() {
        if ("input" === this.config.type && this.config.data.confirmBeforeDiscard) {
            var t = this.config.data.value || "", e = this.getValue() || "";
            e !== t ? SL.prompt({title: "Discard unsaved changes?",type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Discard</h3>",selected: !0,className: "negative",callback: function() {
                            this.canceled.dispatch(this.getValue()), this.destroy()
                        }.bind(this)}]}) : (this.canceled.dispatch(this.getValue()), this.destroy())
        } else
            this.canceled.dispatch(this.getValue()), this.destroy()
    },destroy: function() {
        this.destroyed.dispatch(), this.destroyed.dispose();
        var t = $(this.config.anchor);
        t.length && t.removeClass("focus"), this.domElement.remove(), this.unbind(), this.confirmed.dispose(), this.canceled.dispose()
    },onBackgroundClicked: function(t) {
        this.config.optional && $(t.target).is(this.domElement) && (this.cancel(), t.preventDefault())
    },onPromptCancelClick: function(t) {
        this.cancel(), t.preventDefault()
    },onPromptConfirmClick: function(t) {
        this.confirmed.dispatch(this.getValue()), this.destroy(), t.preventDefault()
    },onDocumentKeydown: function(t) {
        if (27 === t.keyCode && (this.config.optional && this.cancel(), t.preventDefault()), "select" === this.config.type || "list" === this.config.type)
            if (13 === t.keyCode) {
                var e = this.innerElement.find(".focus");
                0 === e.length && (e = this.innerElement.find(".selected")), e.length && (e.trigger("click"), t.preventDefault())
            } else
                37 === t.keyCode || 38 === t.keyCode ? (this.focus(-1), t.preventDefault()) : 39 === t.keyCode || 40 === t.keyCode ? (this.focus(1), t.preventDefault()) : 9 === t.keyCode && t.shiftKey ? (this.focus(-1), t.preventDefault()) : 9 === t.keyCode && (this.focus(1), t.preventDefault());
        "input" === this.config.type && (13 !== t.keyCode || this.config.data.multiline || this.onPromptConfirmClick(t))
    },onInputChanged: function() {
        if (this.config.data.maxlength) {
            var t = this.inputWrapperElement.find(".input-status");
            0 === t.length && (t = $('<div class="input-status">').appendTo(this.inputWrapperElement));
            var e = this.inputElement.val().length, n = this.config.data.maxlength;
            t.text(e + "/" + n), t.toggleClass("negative", e > .95 * n)
        }
    }}), SL.prompt = function(t) {
    var e = new SL.components.Prompt(t);
    return e.show(), e
}, SL("components").Resizer = Class.extend({init: function(t, e) {
        this.domElement = $(t), this.revealElement = this.domElement.closest(".reveal"), this.options = $.extend({padding: 10,preserveAspectRatio: !1,useOverlay: !1}, e), this.mouse = {x: 0,y: 0}, this.mouseStart = {x: 0,y: 0}, this.origin = {x: 0,y: 0,width: 0,height: 0}, this.resizing = !1, this.domElement.length ? (this.onAnchorMouseDown = this.onAnchorMouseDown.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this), this.onElementDrop = this.onElementDrop.bind(this), this.layout = this.layout.bind(this), this.build(), this.bind(), this.layout()) : console.warn("Resizer: invalid resize target.")
    },build: function() {
        this.options.useOverlay && (this.overlay = $('<div class="editing-ui resizer-overlay"></div>').appendTo(document.body).hide()), this.anchorN = $('<div class="editing-ui resizer-anchor" data-direction="n"></div>').appendTo(document.body), this.anchorE = $('<div class="editing-ui resizer-anchor" data-direction="e"></div>').appendTo(document.body), this.anchorS = $('<div class="editing-ui resizer-anchor" data-direction="s"></div>').appendTo(document.body), this.anchorW = $('<div class="editing-ui resizer-anchor" data-direction="w"></div>').appendTo(document.body)
    },bind: function() {
        this.resizeStarted = new signals.Signal, this.resizeUpdated = new signals.Signal, this.resizeEnded = new signals.Signal, this.getAnchors().on("mousedown", this.onAnchorMouseDown), this.revealElement.on("drop", this.onElementDrop), $(document).on("keyup", this.layout), $(document).on("mouseup", this.layout), $(document).on("mousewheel", this.layout), $(document).on("DOMMouseScroll", this.layout), $(window).on("resize", this.layout)
    },layout: function() {
        if (!this.destroyIfDetached()) {
            var t = SL.util.getRevealElementGlobalOffset(this.domElement), e = Reveal.getScale(), n = parseInt(this.domElement.css("margin-right"), 10);
            marginBottom = parseInt(this.domElement.css("margin-bottom"), 10);
            var i = t.x - this.options.padding, s = t.y - this.options.padding, o = (this.domElement.width() + n) * e + 2 * this.options.padding;
            height = (this.domElement.height() + marginBottom) * e + 2 * this.options.padding;
            var r = -this.anchorN.outerWidth() / 2;
            this.anchorN.css({left: i + o / 2 + r,top: s + r}), this.anchorE.css({left: i + o + r,top: s + height / 2 + r}), this.anchorS.css({left: i + o / 2 + r,top: s + height + r}), this.anchorW.css({left: i + r,top: s + height / 2 + r}), this.overlay && this.overlay.css({left: i,top: s,width: o,height: height})
        }
    },show: function() {
        this.getAnchors().addClass("visible"), this.layout()
    },hide: function() {
        this.getAnchors().removeClass("visible")
    },destroyIfDetached: function() {
        return 0 === this.domElement.closest("body").length ? (this.destroy(), !0) : !1
    },getOptions: function() {
        return this.options
    },getAnchors: function() {
        return this.anchorN.add(this.anchorE).add(this.anchorS).add(this.anchorW)
    },isResizing: function() {
        return !!this.resizing
    },isDestroyed: function() {
        return !!this.destroyed
    },onAnchorMouseDown: function(t) {
        var e = $(t.target).attr("data-direction");
        if (e) {
            t.preventDefault(), this.resizeDirection = e, this.mouseStart.x = t.clientX, this.mouseStart.y = t.clientY;
            var n = SL.util.getRevealElementOffset(this.domElement);
            this.origin.x = n.x, this.origin.y = n.y, this.origin.width = this.domElement.width(), this.origin.height = this.domElement.height(), this.overlay && this.overlay.show(), this.resizing = !0, $(document).on("mousemove", this.onDocumentMouseMove), $(document).on("mouseup", this.onDocumentMouseUp), this.resizeStarted.dispatch()
        }
    },onDocumentMouseMove: function(t) {
        if (!this.destroyIfDetached() && (this.mouse.x = t.clientX, this.mouse.y = t.clientY, this.resizing)) {
            var e = Reveal.getScale(), n = (this.mouse.x - this.mouseStart.x) / e, i = (this.mouse.y - this.mouseStart.y) / e, s = "", o = "";
            switch (this.resizeDirection) {
                case "e":
                    s = Math.max(this.origin.width + n, 1);
                    break;
                case "w":
                    s = Math.max(this.origin.width - n, 1);
                    break;
                case "s":
                    o = Math.max(this.origin.height + i, 1);
                    break;
                case "n":
                    o = Math.max(this.origin.height - i, 1)
            }
            if (this.options.preserveAspectRatio ? ("" === s && (s = this.origin.width * (o / this.origin.height)), "" === o && (o = this.origin.height * (s / this.origin.width))) : ("" === s && (s = this.domElement.css("width")), "" === o && (o = this.domElement.css("height"))), "absolute" === this.domElement.css("position") && ("n" === this.resizeDirection || "w" === this.resizeDirection))
                switch (this.resizeDirection) {
                    case "w":
                        this.domElement.css("left", Math.round(this.origin.x + n));
                        break;
                    case "n":
                        this.domElement.css("top", Math.round(this.origin.y + i))
                }
            this.domElement.css({width: s ? s : "",height: o ? o : "",maxHeight: "none",maxWidth: "none"}), this.layout(), this.resizeUpdated.dispatch()
        }
    },onDocumentMouseUp: function() {
        this.resizing = !1, $(document).off("mousemove", this.onDocumentMouseMove), $(document).off("mouseup", this.onDocumentMouseUp), this.overlay && this.overlay.hide(), this.resizeEnded.dispatch()
    },onElementDrop: function() {
        setTimeout(this.layout, 1)
    },destroy: function() {
        this.destroyed || (this.destroyed = !0, this.resizeStarted.dispose(), this.resizeUpdated.dispose(), this.resizeEnded.dispose(), $(document).off("mousemove", this.onDocumentMouseMove), $(document).off("mouseup", this.onDocumentMouseUp), $(document).off("keyup", this.layout), $(document).off("mouseup", this.layout), $(document).off("mousewheel", this.layout), $(document).off("DOMMouseScroll", this.layout), $(window).off("resize", this.layout), this.revealElement.off("drop", this.onElementDrop), this.getAnchors().off("mousedown", this.onAnchorMouseDown), this.anchorN.remove(), this.anchorE.remove(), this.anchorS.remove(), this.anchorW.remove(), this.overlay && this.overlay.remove())
    }}), SL.components.Resizer.delegateOnHover = function(t, e, n) {
    function i() {
        c && (c.destroy(), c = null, $(document).off("mousemove", r), $(document).off("mouseup", a))
    }
    function s(t, e) {
        if (c && c.isResizing())
            return !1;
        if (c && u && !u.is(t) && i(), !c) {
            var s = {};
            $.extend(s, n), $.extend(s, e), u = $(t), c = new SL.components.Resizer(u, s), c.resizeUpdated.add(l), c.show(), $(document).on("mousemove", r), $(document).on("mouseup", a)
        }
    }
    function o(t) {
        var e = $(t.currentTarget), n = null;
        e.data("resizer-options") && (n = e.data("resizer-options")), e.data("target-element") && (e = e.data("target-element")), s(e, n)
    }
    function r(t) {
        if (c)
            if (c.isDestroyed())
                i();
            else if (!c.isResizing()) {
                var e = Reveal.getScale(), n = SL.util.getRevealElementGlobalOffset(u), s = 3 * c.getOptions().padding, o = {top: n.y - s,right: n.x + u.outerWidth(!0) * e + s,bottom: n.y + u.outerHeight(!0) * e + s,left: n.x - s};
                (t.clientX < o.left || t.clientX > o.right || t.clientY < o.top || t.clientY > o.bottom) && i()
            }
    }
    function a(t) {
        setTimeout(function() {
            r(t)
        }, 1)
    }
    function l() {
        d.dispatch(u)
    }
    t.delegate(e, "mouseover", o);
    var c = null, u = null, d = new signals.Signal;
    return {show: s,updated: d,layout: function() {
            c && c.layout()
        },destroy: function() {
            i(), d.dispose(), t.undelegate(e, "mouseover", o)
        }}
}, SL("components").ScrollShadow = Class.extend({init: function(t) {
        this.options = $.extend({threshold: 20,shadowSize: 10}, t), this.bind(), this.render(), this.layout()
    },bind: function() {
        this.layout = this.layout.bind(this), this.sync = this.sync.bind(this), $(window).on("resize", this.layout), this.options.contentElement.on("scroll", this.sync)
    },render: function() {
        this.shadowTop = $('<div class="sl-scroll-shadow-top">').appendTo(this.options.parentElement), this.shadowBottom = $('<div class="sl-scroll-shadow-bottom">').appendTo(this.options.parentElement), this.shadowTop.height(this.options.shadowSize), this.shadowBottom.height(this.options.shadowSize)
    },layout: function() {
        var t = this.options.parentElement.height(), e = this.options.footerElement ? this.options.footerElement.outerHeight() : 0, n = this.options.headerElement ? this.options.headerElement.outerHeight() : 0;
        (this.options.footerElement || this.options.headerElement) && this.options.contentElement.css("height", t - e - n), this.sync()
    },sync: function() {
        var t = this.options.footerElement ? this.options.footerElement.outerHeight() : 0, e = this.options.headerElement ? this.options.headerElement.outerHeight() : 0, n = this.options.contentElement.scrollTop(), i = this.options.contentElement.prop("scrollHeight"), s = this.options.contentElement.outerHeight(), o = i > s + this.options.threshold, r = n / (i - s);
        this.shadowTop.css({opacity: o ? r : 0,top: e}), this.shadowBottom.css({opacity: o ? 1 - r : 0,bottom: t})
    },destroy: function() {
        $(window).off("resize", this.layout), this.options.contentElement.off("scroll", this.sync), this.options = null
    }}), SL("components").Search = Class.extend({init: function(t) {
        this.config = t, this.searchForm = $(".search .search-form"), this.searchFormInput = this.searchForm.find(".search-term"), this.searchFormSubmit = this.searchForm.find(".search-submit"), this.searchResults = $(".search .search-results"), this.searchResultsHeader = this.searchResults.find("header"), this.searchResultsTitle = this.searchResults.find(".search-results-title"), this.searchResultsSorting = this.searchResults.find(".search-results-sorting"), this.searchResultsList = this.searchResults.find("ul"), this.searchFormLoader = Ladda.create(this.searchFormSubmit.get(0)), this.bind(), this.checkQuery()
    },bind: function() {
        this.searchForm.on("submit", this.onSearchFormSubmit.bind(this)), this.searchResultsSorting.find("input[type=radio]").on("click", this.onSearchSortingChange.bind(this))
    },checkQuery: function() {
        var t = SL.util.getQuery();
        t.search && !this.searchFormInput.val() && (this.searchFormInput.val(t.search), t.page ? this.search(t.search, parseInt(t.page, 10)) : this.search(t.search))
    },renderSearchResults: function(t) {
        if ($(".search").removeClass("empty"), this.searchResults.show(), this.searchResultsList.empty(), this.renderSearchPagination(t), t.results && t.results.length) {
            this.searchResultsTitle.text(t.total + " " + SL.util.string.pluralize("result", "s", t.total > 1) + ' for "' + this.searchTerm + '"');
            for (var e = 0, n = t.results.length; n > e; e++)
                this.searchResultsList.append(SL.util.html.createDeckThumbnail(t.results[e]))
        } else
            this.searchResultsTitle.text(t.error || SL.locale.get("SEARCH_NO_RESULTS_FOR", {term: this.searchTerm}))
    },renderSearchPagination: function(t) {
        "undefined" == typeof t.decks_per_page && (t.decks_per_page = 8);
        var e = Math.ceil(t.total / t.decks_per_page);
        this.searchPagination && this.searchPagination.remove(), e > 1 && (this.searchPagination = $('<div class="search-results-pagination"></div>').appendTo(this.searchResultsHeader), this.searchPagination.append('<span class="page">' + SL.locale.get("SEARCH_PAGINATION_PAGE") + " " + this.searchPage + "/" + e + "</span>"), this.searchPage > 1 && this.searchPagination.append('<button class="button outline previous">' + SL.locale.get("PREVIOUS") + "</button>"), this.searchPagination.append('<button class="button outline next">' + SL.locale.get("NEXT") + "</button>"), this.searchPagination.find("button.previous").on("click", function() {
            this.search(this.searchTerm, Math.max(this.searchPage - 1, 1))
        }.bind(this)), this.searchPagination.find("button.next").on("click", function() {
            this.search(this.searchTerm, Math.min(this.searchPage + 1, e))
        }.bind(this)))
    },search: function(t, e, n) {
        if (this.searchTerm = t || this.searchFormInput.val(), this.searchPage = e || 1, this.searchSort = n || this.searchSort, window.history && "function" == typeof window.history.replaceState) {
            var i = "?search=" + escape(this.searchTerm);
            e > 1 && (i += "&page=" + e), window.history.replaceState(null, null, "/explore" + i)
        }
        this.searchSort || (this.searchSort = this.searchResultsSorting.find("input[type=radio]:checked").val()), this.searchResultsSorting.find("input[type=radio]").prop("checked", !1), this.searchResultsSorting.find("input[type=radio][value=" + this.searchSort + "]").prop("checked", !0), this.searchTerm ? (this.searchFormLoader.start(), $.ajax({type: "GET",url: this.config.url,context: this,data: {q: this.searchTerm,page: this.searchPage,sort: this.searchSort}}).done(function(t) {
            this.renderSearchResults(t)
        }).fail(function() {
            this.renderSearchResults({error: SL.locale.get("SEARCH_SERVER_ERROR")})
        }).always(function() {
            this.searchFormLoader.stop()
        })) : SL.notify(SL.locale.get("SEARCH_NO_TERM_ERROR"))
    },sort: function(t) {
        this.search(this.searchTerm, this.searchPage, t)
    },onSearchFormSubmit: function(t) {
        return this.search(), t.preventDefault(), !1
    },onSearchSortingChange: function() {
        this.sort(this.searchResultsSorting.find("input[type=radio]:checked").val())
    }}), SL("components").TemplatesPage = Class.extend({init: function(t) {
        this.options = t || {}, this.templateSelected = new signals.Signal, this.render()
    },render: function() {
        this.domElement = $('<div class="page" data-page-id="' + this.options.id + '">'), this.bodyElement = $('<div class="page-body">').appendTo(this.domElement), this.isEditable() && (this.domElement.addClass("has-footer"), this.footerElement = $('<div class="page-footer">').appendTo(this.domElement), this.addTemplateButton = $(['<div class="add-new-template ladda-button" data-style="zoom-out" data-spinner-color="#222" data-spinner-size="32">', '<span class="icon i-plus"></span>', "<span>Save current slide</span>", "</div>"].join("")), this.addTemplateButton.appendTo(this.footerElement), this.addTemplateButton.on("click", this.onTemplateCreateClicked.bind(this)), this.addTemplateButtonLoader = Ladda.create(this.addTemplateButton.get(0))), this.options.templates.forEach(this.renderTemplate.bind(this))
    },renderTemplate: function(t, e) {
        e = $.extend({prepend: !1}, e);
        var n = $('<div class="template-item">');
        n.html(['<div class="template-item-thumb themed">', '<div class="template-item-thumb-content reveal">', '<div class="slides">', t.get("html"), "</div>", '<div class="backgrounds"></div>', "</div>", "</div>"].join("")), n.data("data-template", t), n.on("vclick", this.onTemplateSelected.bind(this, n)), t.get("label") && n.append('<span class="template-item-label">' + t.get("label") + "</span>"), e.replaceTemplateAt ? this.bodyElement.find(".template-item").eq(e.replaceTemplateAt).replaceWith(n) : e.prepend ? this.bodyElement.prepend(n) : this.bodyElement.append(n);
        var i = n.find("section").attr("data-background-color"), s = n.find("section").attr("data-background-image"), o = n.find("section").attr("data-background-size"), r = $('<div class="slide-background present template-item-thumb-background">');
        if (r.addClass(n.find(".template-item-thumb .reveal section").attr("class")), r.appendTo(n.find(".template-item-thumb .reveal>.backgrounds")), (i || s) && (i && r.css("background-color", i), s && r.css("background-image", 'url("' + s + '")'), o && r.css("background-size", o)), this.isEditable()) {
            var a = $('<div class="template-item-delete"><span class="icon i-trash-stroke"></span></div>');
            a.attr("data-tooltip", "Delete this template"), a.on("vclick", this.onTemplateDeleteClicked.bind(this, n)), a.appendTo(n)
        }
    },refresh: function() {
        if (this.isDefaultTemplates()) {
            var t = SL.templates.DEFAULT_TEMPLATES_DUPLICATE_INDEX, e = this.options.templates.at(t);
            e && (e.set("html", SL.templates.templatize(Reveal.getCurrentSlide())), this.renderTemplate(e, {replaceTemplateAt: t}))
        }
        var n = SL.view.getCurrentTheme(), i = this.bodyElement.find(".template-item");
        if (i.length)
            i.each(function(t, e) {
                var i = $(e).find(".template-item-thumb");
                i.attr("class", i.attr("class").replace(/theme\-(font|color)\-([a-z0-9-])*/gi, "")), i.addClass("theme-font-" + n.get("font")), i.addClass("theme-color-" + n.get("color")), SL.templates.layoutTemplate(i.find("section"), !0)
            }), this.bodyElement.find(".placeholder").remove();
        else {
            var s = "You haven't saved any custom templates yet.";
            this.isTeamTemplates() && (s = "All templates that you save here will be made available to everyone in your team."), this.bodyElement.html('<p class="placeholder">' + s + "</p>")
        }
    },appendTo: function(t) {
        this.domElement.appendTo(t)
    },isEditable: function() {
        return this.isUserTemplates() || this.isTeamTemplates() && SL.current_user.isEnterpriseManager()
    },isDefaultTemplates: function() {
        return "default" === this.options.id
    },isUserTemplates: function() {
        return "user" === this.options.id
    },isTeamTemplates: function() {
        return "team" === this.options.id
    },onTemplateSelected: function(t, e) {
        e.preventDefault(), this.templateSelected.dispatch(t.data("data-template"))
    },onTemplateDeleteClicked: function(t, e) {
        return e.preventDefault(), SL.prompt({anchor: $(e.target),title: SL.locale.get("TEMPLATE_DELETE_CONFIRM"),type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        var e = t.data("data-template"), n = SL.config.AJAX_SLIDE_TEMPLATES_DELETE(e.get("id"));
                        this.isTeamTemplates() && (n = SL.config.AJAX_TEAM_SLIDE_TEMPLATES_DELETE(e.get("id"))), $.ajax({type: "DELETE",url: n,context: this}).done(function() {
                            t.remove(), this.refresh()
                        })
                    }.bind(this)}]}), !1
    },onTemplateCreateClicked: function() {
        var t = SL.config.AJAX_SLIDE_TEMPLATES_CREATE;
        this.isTeamTemplates() && (t = SL.config.AJAX_TEAM_SLIDE_TEMPLATES_CREATE);
        var e = SL.templates.templatize(Reveal.getCurrentSlide());
        return this.addTemplateButtonLoader.start(), $.ajax({type: "POST",url: t,context: this,data: {slide_template: {html: e}}}).done(function(t) {
            var e = this.options.templates.create(t, {prepend: !0});
            this.renderTemplate(e, {prepend: !0}), this.refresh(), this.addTemplateButtonLoader.stop(), SL.analytics.trackEditor(this.isTeamTemplates() ? "Saved team template" : "Saved user template")
        }).fail(function() {
            this.addTemplateButtonLoader.stop(), SL.notify(SL.locale.get("TEMPLATE_CREATE_ERROR"), "negative")
        }), !1
    }}), SL("components").Templates = Class.extend({init: function(t) {
        this.options = $.extend({alignment: "",width: 450,height: 730,arrowSize: 8}, t), this.pages = [], SL.templates.getUserTemplates(), SL.templates.getTeamTemplates(), this.render(), this.bind()
    },render: function() {
        this.domElement = $('<div class="sl-templates">'), this.innerElement = $('<div class="sl-templates-inner">').appendTo(this.domElement), this.headerElement = $('<div class="sl-templates-header">').appendTo(this.innerElement), this.bodyElement = $('<div class="sl-templates-body">').appendTo(this.innerElement), this.domElement.data("instance", this)
    },renderTemplates: function() {
        this.pages = [], this.headerElement.empty(), this.bodyElement.empty();
        {
            var t = SL.templates.getDefaultTemplates();
            SL.templates.getTeamTemplates()
        }
        this.renderPage("default", "Default", t), SL.templates.getUserTemplates(function(t) {
            this.renderPage("user", "User", t)
        }.bind(this)), SL.templates.getTeamTemplates(function(t) {
            (SL.current_user.isEnterpriseManager() || !t.isEmpty()) && this.renderPage("team", "Team", t)
        }.bind(this))
    },renderPage: function(t, e, n) {
        var i = $('<div class="page-tab" data-page-id="' + t + '">' + e + "</div>");
        i.on("vclick", function() {
            this.showPage(t), SL.analytics.trackEditor("Slide templates tab clicked", t)
        }.bind(this)), i.appendTo(this.headerElement);
        var s = new SL.components.TemplatesPage({id: t,templates: n});
        s.templateSelected.add(this.onTemplateSelected.bind(this)), s.appendTo(this.bodyElement), this.pages.push(s), this.domElement.attr("data-pages-total", this.pages.length), this.showPage("default")
    },showPage: function(t) {
        this.bodyElement.find(".page").removeClass("past present future"), this.bodyElement.find('.page[data-page-id="' + t + '"]').addClass("present"), this.bodyElement.find('.page[data-page-id="' + t + '"]').prevAll().addClass("past"), this.bodyElement.find('.page[data-page-id="' + t + '"]').nextAll().addClass("future"), this.headerElement.find(".page-tab").removeClass("selected"), this.headerElement.find('.page-tab[data-page-id="' + t + '"]').addClass("selected")
    },refreshPages: function() {
        this.pages.forEach(function(t) {
            t.refresh()
        })
    },bind: function() {
        this.layout = this.layout.bind(this), this.onKeyDown = this.onKeyDown.bind(this), this.onClicked = this.onClicked.bind(this), this.domElement.on("vclick", this.onClicked)
    },layout: function() {
        var t = 10, e = this.domElement.outerWidth(), n = this.domElement.outerHeight(), i = this.options.width, s = this.options.height, o = {};
        i = Math.min(i, n - 2 * t), s = Math.min(s, n - 2 * t), this.options.anchor && (o.left = this.options.anchor.offset().left, o.top = this.options.anchor.offset().top, o.width = this.options.anchor.outerWidth(), o.height = this.options.anchor.outerHeight(), o.right = o.left + o.width, o.bottom = o.top + o.height);
        var r, a;
        this.options.anchor && "r" === this.options.alignment ? (i = Math.min(i, o.left - 2 * t), r = o.left - i - this.options.arrowSize - t, a = o.top + o.height / 2 - s / 2) : this.options.anchor && "b" === this.options.alignment ? (s = Math.min(s, o.top - 2 * t), r = o.left + o.width / 2 - i / 2, a = o.top - s - this.options.arrowSize - t) : this.options.anchor && "l" === this.options.alignment ? (i = Math.min(i, e - o.right - 2 * t), r = o.right + this.options.arrowSize + t, a = o.top + o.height / 2 - s / 2) : (r = (e - i) / 2, a = (n - s) / 2), this.innerElement.css({width: i,height: s,left: r,top: a})
    },show: function(t) {
        this.options = $.extend(this.options, t), 0 === this.pages.length && this.renderTemplates(), this.domElement.attr("data-alignment", this.options.alignment), this.domElement.appendTo(document.body), $(window).on("resize", this.layout), SL.keyboard.keydown(this.onKeyDown), this.refreshPages(), this.layout()
    },hide: function() {
        this.domElement.detach(), $(window).off("resize", this.layout), SL.keyboard.release(this.onKeyDown)
    },onTemplateSelected: function(t) {
        this.options.callback && (this.hide(), this.options.callback(t.get("html")))
    },onKeyDown: function(t) {
        return 27 === t.keyCode ? (this.hide(), !1) : !0
    },onClicked: function(t) {
        $(t.target).is(this.domElement) && (t.preventDefault(), this.hide())
    },destroy: function() {
        $(window).off("resize", this.layout), SL.keyboard.release(this.onKeyDown), this.domElement.remove()
    }}), SL("components").TextEditor = Class.extend({init: function(t) {
        this.options = $.extend({type: "",value: ""}, t), this.saved = new signals.Signal, this.canceled = new signals.Signal, this.render(), this.bind(), this.originalValue = this.options.value || "", "string" == typeof this.options.value && this.setValue(this.options.value), SL.editor.controllers.Capabilities.isTouchEditor() || this.focusInput()
    },render: function() {
        this.domElement = $('<div class="sl-text-editor">').appendTo(document.body), this.innerElement = $('<div class="sl-text-editor-inner">').appendTo(this.domElement), this.domElement.attr("data-type", this.options.type), "html" === this.options.type ? this.renderHTMLInput() : this.renderTextInput(), this.footerElement = $(['<div class="sl-text-editor-footer">', '<button class="button l outline white cancel-button">Cancel</button>', '<button class="button l positive save-button">Save</button>', "</div>"].join("")).appendTo(this.innerElement), setTimeout(function() {
            this.domElement.addClass("visible")
        }.bind(this), 1)
    },renderTextInput: function() {
        this.inputElement = $('<textarea class="sl-text-editor-input">').appendTo(this.innerElement), "code" === this.options.type && this.inputElement.tabby({tabString: "    "})
    },renderHTMLInput: function() {
        this.inputElement = $('<div class="editor sl-text-editor-input">').appendTo(this.innerElement), this.codeEditor && "function" == typeof this.codeEditor.destroy && (this.codeEditor.destroy(), this.codeEditor = null);
        try {
            this.codeEditor = ace.edit(this.inputElement.get(0)), this.codeEditor.setTheme("ace/theme/monokai"), this.codeEditor.setDisplayIndentGuides(!0), this.codeEditor.setShowPrintMargin(!1), this.codeEditor.getSession().setMode("ace/mode/html")
        } catch (t) {
            console.log("An error occurred while initializing the Ace editor.")
        }
    },bind: function() {
        this.footerElement.find(".save-button").on("click", this.save.bind(this)), this.footerElement.find(".cancel-button").on("click", this.cancel.bind(this)), this.onKeyDown = this.onKeyDown.bind(this), SL.keyboard.keydown(this.onKeyDown), this.onBackgroundClicked = this.onBackgroundClicked.bind(this), this.domElement.on("vclick", this.onBackgroundClicked)
    },save: function() {
        this.saved.dispatch(this.getValue()), this.destroy()
    },cancel: function() {
        var t = this.originalValue || "", e = this.getValue() || "";
        e !== t ? this.cancelPrompt || (this.cancelPrompt = SL.prompt({title: "Discard unsaved changes?",type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Discard</h3>",selected: !0,className: "negative",callback: function() {
                        this.canceled.dispatch(), this.destroy()
                    }.bind(this)}]}), this.cancelPrompt.destroyed.add(function() {
            this.cancelPrompt = null
        }.bind(this))) : (this.canceled.dispatch(), this.destroy())
    },focusInput: function() {
        this.codeEditor ? this.codeEditor.focus() : this.inputElement.focus()
    },setValue: function(t) {
        this.originalValue = t || "", this.codeEditor ? this.codeEditor.env.document.setValue(t) : this.inputElement.val(t)
    },getValue: function() {
        return this.codeEditor ? this.codeEditor.env.document.getValue() : this.inputElement.val()
    },onBackgroundClicked: function(t) {
        $(t.target).is(this.domElement) && (this.cancel(), t.preventDefault())
    },onKeyDown: function(t) {
        return 27 === t.keyCode ? (this.cancel(), !1) : (t.metaKey || t.ctrlKey) && 83 === t.keyCode ? (this.save(), !1) : !0
    },destroy: function() {
        this.saved.dispose(), this.canceled.dispose(), SL.keyboard.release(this.onKeyDown), this.domElement.remove()
    }}), SL("components").ThemeOptions = Class.extend({init: function(t) {
        if (!t.container)
            throw "Cannot build theme options without container";
        if (!t.model)
            throw "Cannot build theme options without model";
        this.config = $.extend({center: !0,rollingLinks: !0,colors: SL.config.THEME_COLORS,fonts: SL.config.THEME_FONTS,transitions: SL.config.THEME_TRANSITIONS,backgroundTransitions: SL.config.THEME_BACKGROUND_TRANSITIONS}, t), this.theme = t.model, this.changed = new signals.Signal, this.render(), this.updateSelection(), this.toggleDeprecatedOptions(), this.scroll()
    },render: function() {
        this.domElement = $('<div class="sl-themeoptions">').appendTo(this.config.container), "string" == typeof this.config.className && this.domElement.addClass(this.config.className), this.config.themes && this.renderThemes(), (this.config.center || this.config.rollingLinks) && this.renderOptions(), this.config.colors && this.renderColors(), this.config.fonts && this.renderFonts(), this.config.transitions && this.renderTransitions(), this.config.backgroundTransitions && this.renderBackgroundTransitions()
    },renderThemes: function() {
        if (this.config.themes && !this.config.themes.isEmpty()) {
            var t = $('<div class="section selector theme"><h3>Theme</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
            e.append(['<li data-theme="" class="custom">', '<span class="thumb-icon icon i-equalizer"></span>', '<span class="thumb-label">Custom</span>', "</li>"].join("")), this.config.themes.forEach(function(t) {
                var n = $('<li data-theme="' + t.get("id") + '"><span class="thumb-label" title="' + t.get("name") + '">' + t.get("name") + "</span></li>").appendTo(e);
                t.hasThumbnail() && n.css("background-image", 'url("' + t.get("thumbnail_url") + '")')
            }), this.domElement.find(".theme li").on("vclick", this.onThemeClicked.bind(this))
        }
    },renderOptions: function() {
        var t = $('<div class="section options"><h3>Options</h3></div>').appendTo(this.domElement), e = $('<div class="options"></div>').appendTo(t);
        this.config.center && (e.append('<div class="unit sl-checkbox outline"><input id="theme-center" value="center" type="checkbox"><label for="theme-center" data-tooltip="Center slide contents vertically (not visible while editing)" data-tooltip-maxwidth="220" data-tooltip-delay="500">Vertical centering</label></div>'), t.find("#theme-center").on("change", this.onOptionChanged.bind(this))), this.config.rollingLinks && (e.append('<div class="unit sl-checkbox outline"><input id="theme-rolling_links" value="rolling_links" type="checkbox"><label for="theme-rolling_links" data-tooltip="Use a 3D hover effect on links" data-tooltip-maxwidth="220" data-tooltip-delay="500">Rolling links</label></div>'), t.find("#theme-rolling_links").on("change", this.onOptionChanged.bind(this)))
    },renderColors: function() {
        var t = $('<div class="section selector color"><h3>Color</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
        this.config.colors.forEach(function(t) {
            var n = $('<li data-color="' + t.id + '"><div class="theme-body-color-block"></div><div class="theme-link-color-block"></div></li>');
            n.addClass("theme-color-" + t.id), n.addClass("themed"), n.appendTo(e), t.tooltip && n.attr({"data-tooltip": t.tooltip,"data-tooltip-delay": 250,"data-tooltip-maxwidth": 300}), !SL.current_user.isPro() && t.pro && n.attr("data-pro", "true")
        }.bind(this)), this.domElement.find(".color li").on("vclick", this.onColorClicked.bind(this))
    },renderFonts: function() {
        var t = $('<div class="section selector font"><h3>Typography</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
        this.config.fonts.forEach(function(t) {
            var n = $('<li data-font="' + t.id + '" data-name="' + t.title + '"><div class="themed"><h1>' + t.title + "</h1><a>Type</a></div></li>");
            n.addClass("theme-font-" + t.id), n.appendTo(e), t.tooltip && n.attr({"data-tooltip": t.tooltip,"data-tooltip-delay": 250,"data-tooltip-maxwidth": 300})
        }.bind(this)), this.domElement.find(".font li").on("vclick", this.onFontClicked.bind(this))
    },renderTransitions: function() {
        var t = $('<div class="section selector transition"><h3>Transition</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
        this.config.transitions.forEach(function(t) {
            var n = $('<li data-transition="' + t.id + '"></li>').appendTo(e);
            t.deprecated === !0 && n.addClass("deprecated")
        }.bind(this)), this.domElement.find(".transition li").on("vclick", this.onTransitionClicked.bind(this))
    },renderBackgroundTransitions: function() {
        var t = $('<div class="section selector background-transition"></div>').appendTo(this.domElement);
        t.append('<h3>Background Transition <span class="icon i-info info-icon" data-tooltip="Background transitions apply when navigating to or from a slide that has a background image or color." data-tooltip-maxwidth="250"></span></h3>'), t.append("<ul>");
        var e = t.find("ul");
        this.config.backgroundTransitions.forEach(function(t) {
            var n = $('<li data-background-transition="' + t.id + '"></li>').appendTo(e);
            t.deprecated === !0 && n.addClass("deprecated")
        }.bind(this)), this.domElement.find(".background-transition li").on("vclick", this.onBackgroundTransitionClicked.bind(this))
    },populate: function(t) {
        t && (this.theme = t, this.updateSelection(), this.toggleDeprecatedOptions(), this.scroll())
    },scroll: function() {
        var t = this.domElement.find(".background-transition li.selected").get(0), e = this.domElement.find(".transition li.selected").get(0), n = this.domElement.find(".color li.selected").get(0), i = this.domElement.find(".font li.selected").get(0);
        SL.util.dom.scrollIntoViewIfNeeded(t, !0), SL.util.dom.scrollIntoViewIfNeeded(e, !0), SL.util.dom.scrollIntoViewIfNeeded(n, !0), SL.util.dom.scrollIntoViewIfNeeded(i, !0), this.domElement.scrollTop(0)
    },updateSelection: function() {
        this.config.themes && !this.config.themes.isEmpty() && this.domElement.toggleClass("using-theme", this.theme.has("id")), this.config.center && this.domElement.find("#theme-center").prop("checked", 1 == this.theme.get("center")), this.config.rollingLinks && this.domElement.find("#theme-rolling_links").prop("checked", 1 == this.theme.get("rolling_links")), this.domElement.find(".theme li").removeClass("selected"), this.domElement.find(".theme li[data-theme=" + this.theme.get("id") + "]").addClass("selected"), 0 !== this.domElement.find(".theme li.selected").length || this.theme.has("id") || this.domElement.find('.theme li[data-theme=""]').addClass("selected"), this.domElement.find(".color li").removeClass("selected"), this.domElement.find(".color li[data-color=" + this.theme.get("color") + "]").addClass("selected"), this.domElement.find(".font li").removeClass("selected"), this.domElement.find(".font li[data-font=" + this.theme.get("font") + "]").addClass("selected"), this.domElement.find(".font li").each(function(t, e) {
            SL.util.html.removeClasses(e, function(t) {
                return t.match(/^theme\-color\-/gi)
            }), $(e).addClass("theme-color-" + this.theme.get("color"))
        }.bind(this)), this.domElement.find(".transition li").removeClass("selected"), this.domElement.find(".transition li[data-transition=" + this.theme.get("transition") + "]").addClass("selected"), this.domElement.find(".background-transition li").removeClass("selected"), this.domElement.find(".background-transition li[data-background-transition=" + this.theme.get("background_transition") + "]").addClass("selected")
    },applySelection: function() {
        SL.helpers.ThemeController.paint(this.theme, {center: !1,js: !1})
    },toggleDeprecatedOptions: function() {
        this.domElement.find(".transition .deprecated").toggle(this.theme.isTransitionDeprecated()), this.domElement.find(".background-transition .deprecated").toggle(this.theme.isBackgroundTransitionDeprecated())
    },getTheme: function() {
        return this.theme
    },onThemeClicked: function(t) {
        var e = $(t.currentTarget).data("theme");
        if (e) {
            var n = this.config.themes.getByProperties({id: e});
            n ? this.theme = n.clone() : SL.notify("Could not find theme data", "negative")
        } else
            this.theme.set("id", null), this.theme.set("js", null), this.theme.set("css", null), this.theme.set("less", null), this.theme.set("html", null);
        this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Theme option selected"), this.changed.dispatch()
    },onOptionChanged: function() {
        this.theme.set("center", this.domElement.find("#theme-center").is(":checked")), this.theme.set("rolling_links", this.domElement.find("#theme-rolling_links").is(":checked")), this.updateSelection(), this.applySelection(), this.changed.dispatch()
    },onColorClicked: function(t) {
        return t.preventDefault(), $(t.currentTarget).is("[data-pro]") ? void window.open("/pricing") : (this.theme.set("color", $(t.currentTarget).data("color")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Color option selected", this.theme.get("color")), void this.changed.dispatch())
    },onFontClicked: function(t) {
        t.preventDefault(), this.theme.set("font", $(t.currentTarget).data("font")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Font option selected", this.theme.get("font")), this.changed.dispatch()
    },onTransitionClicked: function(t) {
        t.preventDefault(), this.theme.set("transition", $(t.currentTarget).data("transition")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Transition option selected", this.theme.get("transition")), this.changed.dispatch()
    },onBackgroundTransitionClicked: function(t) {
        t.preventDefault(), this.theme.set("background_transition", $(t.currentTarget).data("background-transition")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Background transition option selected", this.theme.get("background_transition")), this.changed.dispatch()
    },destroy: function() {
        this.changed.dispose(), this.domElement.remove(), this.theme = null, this.config = null
    }}), SL.tooltip = function() {
    function t() {
        r = $("<div>").addClass("sl-tooltip"), a = $('<p class="sl-tooltip-inner">').appendTo(r), l = $('<div class="sl-tooltip-arrow">').appendTo(r), c = $('<div class="sl-tooltip-arrow-fill">').appendTo(l), e()
    }
    function e() {
        i = i.bind(this), $(document).on("keydown, mousedown", function() {
            SL.tooltip.hide()
        }), SL.util.device.IS_PHONE || SL.util.device.IS_TABLET || ($(document.body).delegate("[data-tooltip]", "mouseenter", function(t) {
            var e = $(t.currentTarget);
            if (!e.is("[no-tooltip]")) {
                var i = e.attr("data-tooltip"), s = e.attr("data-tooltip-delay"), o = e.attr("data-tooltip-align"), r = e.attr("data-tooltip-alignment"), a = e.attr("data-tooltip-maxwidth"), l = e.attr("data-tooltip-maxheight"), c = e.attr("data-tooltip-ox"), u = e.attr("data-tooltip-oy"), d = e.attr("data-tooltip-x"), h = e.attr("data-tooltip-y");
                if (i) {
                    var p = {anchor: e,align: o,alignment: r,delay: parseInt(s, 10),maxwidth: parseInt(a, 10),maxheight: parseInt(l, 10)};
                    c && (p.ox = parseFloat(c)), u && (p.oy = parseFloat(u)), d && h && (p.x = parseFloat(d), p.y = parseFloat(h), p.anchor = null), n(i, p)
                }
            }
        }), $(document.body).delegate("[data-tooltip]", "mouseleave", s))
    }
    function n(t, e) {
        if (!SL.util.device.IS_PHONE && !SL.util.device.IS_TABLET) {
            u = e || {}, clearTimeout(p);
            var s = Date.now() - f;
            if ("number" == typeof u.delay && s > 500)
                return p = setTimeout(n.bind(this, t, u), u.delay), void delete u.delay;
            r.css("opacity", 0), r.appendTo(document.body), a.html(t), r.css("max-width", u.maxwidth ? u.maxwidth : null), r.css("max-height", u.maxheight ? u.maxheight : null), u.align && r.css("text-align", u.align), i(), r.stop(!0, !0).animate({opacity: 1}, {duration: 150}), $(window).on("resize scroll", i)
        }
    }
    function i() {
        var t = $(u.anchor);
        if (t.length) {
            var e = u.alignment || "auto", n = 10, i = $(window).scrollLeft(), s = $(window).scrollTop(), o = t.offset();
            o.x = o.left, o.y = o.top, u.anchor.parents(".reveal .slides").length && "undefined" != typeof window.Reveal && (o = SL.util.getRevealElementGlobalOffset(u.anchor));
            var c = t.outerWidth(), p = t.outerHeight(), f = a.outerWidth(), m = a.outerHeight(), g = o.x - $(window).scrollLeft(), v = o.y - $(window).scrollTop(), y = f / 2, b = m / 2;
            switch ("number" == typeof u.ox && (g += u.ox), "number" == typeof u.oy && (v += u.oy), "auto" === e && (e = o.y - (m + n + d) < s ? "b" : "t"), e) {
                case "t":
                    g += (c - f) / 2, v -= m + d + h;
                    break;
                case "b":
                    g += (c - f) / 2, v += p + d + h;
                    break;
                case "l":
                    g -= f + d + h, v += (p - m) / 2;
                    break;
                case "r":
                    g += c + d + h, v += (p - m) / 2
            }
            g = Math.min(Math.max(g, n), window.innerWidth - f - n), v = Math.min(Math.max(v, n), window.innerHeight - m - n);
            var S = d + 3;
            switch (e) {
                case "t":
                    y = o.x - g - i + c / 2, b = m, y = Math.min(Math.max(y, S), f - S);
                    break;
                case "b":
                    y = o.x - g - i + c / 2, b = -d, y = Math.min(Math.max(y, S), f - S);
                    break;
                case "l":
                    y = f, b = o.y - v - s + p / 2, b = Math.min(Math.max(b, S), m - S);
                    break;
                case "r":
                    y = -d, b = o.y - v - s + p / 2, b = Math.min(Math.max(b, S), m - S)
            }
            l.css({left: Math.round(y),top: Math.round(b)}), r.css({left: Math.round(g),top: Math.round(v)}).attr("data-alignment", e)
        }
    }
    function s() {
        o() && (f = Date.now()), clearTimeout(p), r.remove().stop(!0, !0), $(window).off("resize scroll", i)
    }
    function o() {
        return r.parent().length > 0
    }
    var r, a, l, c, u, d = 6, h = 4, p = -1, f = -1;
    return t(), {show: function(t, e) {
            n(t, e)
        },hide: function() {
            s()
        },anchorTo: function(t, e, n) {
            var i = {};
            "undefined" != typeof e && (i["data-tooltip"] = e), "number" == typeof n.delay && (i["data-tooltip-delay"] = n.delay), "string" == typeof n.alignment && (i["data-tooltip-alignment"] = n.alignment), $(t).attr(i)
        }}
}(), SL("components").Tutorial = Class.extend({init: function(t) {
        this.options = $.extend({steps: []}, t), this.options.steps.forEach(function(t) {
            "undefined" == typeof t.backwards && (t.backwards = function() {
            }), "undefined" == typeof t.forwards && (t.forwards = function() {
            })
        }), this.skipped = new signals.Signal, this.finished = new signals.Signal, this.index = -1, this.render(), this.bind(), this.layout(), this.paint(), this.controlsButtons.css("width", this.controlsButtons.outerWidth() + 10)
    },render: function() {
        this.domElement = $('<div class="sl-tutorial">'), this.domElement.appendTo(document.body), this.canvas = $('<canvas class="sl-tutorial-canvas">'), this.canvas.appendTo(this.domElement), this.canvas = this.canvas.get(0), this.context = this.canvas.getContext("2d"), this.controls = $('<div class="sl-tutorial-controls">'), this.controls.appendTo(this.domElement), this.controlsInner = $('<div class="sl-tutorial-controls-inner">'), this.controlsInner.appendTo(this.controls), this.renderPagination(), this.controlsButtons = $('<div class="sl-tutorial-buttons">'), this.controlsButtons.appendTo(this.controlsInner), this.nextButton = $('<button class="button no-transition positive l sl-tutorial-next">Next</button>'), this.nextButton.appendTo(this.controlsButtons), this.skipButton = $('<button class="button no-transition outline white l sl-tutorial-skip">Skip tutorial</button>'), this.skipButton.appendTo(this.controlsButtons), this.messageElement = $('<div class="sl-tutorial-message no-transition">').hide(), this.messageElement.appendTo(this.domElement)
    },renderPagination: function() {
        this.pagination = $('<div class="sl-tutorial-pagination">'), this.pagination.appendTo(this.controlsInner), this.options.steps.forEach(function(t, e) {
            $('<li class="sl-tutorial-pagination-number">').appendTo(this.pagination).on("click", this.step.bind(this, e))
        }.bind(this))
    },updatePagination: function() {
        this.pagination.find(".sl-tutorial-pagination-number").each(function(t, e) {
            e = $(e), e.toggleClass("past", t < this.index), e.toggleClass("present", t === this.index), e.toggleClass("future", t > this.index)
        }.bind(this))
    },bind: function() {
        this.onKeyDown = this.onKeyDown.bind(this), this.onSkipClicked = this.onSkipClicked.bind(this), this.onWindowResize = this.onWindowResize.bind(this), SL.keyboard.keydown(this.onKeyDown), this.skipButton.on("click", this.onSkipClicked), this.nextButton.on("click", this.next.bind(this)), $(window).on("resize", this.onWindowResize)
    },prev: function() {
        this.step(Math.max(this.index - 1, 0))
    },next: function() {
        this.index + 1 >= this.options.steps.length ? (this.finished.dispatch(), this.destroy()) : this.step(Math.min(this.index + 1, this.options.steps.length - 1))
    },step: function(t) {
        if (this.index < t) {
            for (; this.index < t; )
                this.index += 1, this.options.steps[this.index].forwards.call(this.options.context);
            this.index + 1 === this.options.steps.length && (this.skipButton.hide(), this.nextButton.text("Get started"), this.domElement.addClass("last-step"))
        } else if (this.index > t) {
            for (this.index + 1 === this.options.steps.length && (this.skipButton.show(), this.nextButton.text("Next"), this.domElement.removeClass("last-step")); this.index > t; )
                this.options.steps[this.index].backwards.call(this.options.context), this.index -= 1;
            this.options.steps[this.index].forwards.call(this.options.context)
        }
        this.updatePagination()
    },layout: function() {
        this.width = window.innerWidth, this.height = window.innerHeight;
        if (this.cutoutElement) {
            var t = this.cutoutElement.offset();
            this.cutoutRect = {x: t.left - this.cutoutPadding,y: t.top - this.cutoutPadding,width: this.cutoutElement.outerWidth() + 2 * this.cutoutPadding,height: this.cutoutElement.outerHeight() + 2 * this.cutoutPadding}
        }
        if (this.messageElement.is(":visible")) {
            var e = 20, n = this.messageElement.outerWidth(), i = this.messageElement.outerHeight(), s = {left: (window.innerWidth - n) / 2,top: (window.innerHeight - i) / 2};
            if (this.messageOptions.anchor && this.messageOptions.alignment) {
                var o = this.messageOptions.anchor.offset(), r = this.messageOptions.anchor.outerWidth(), a = this.messageOptions.anchor.outerHeight();
                switch (this.messageOptions.alignment) {
                    case "t":
                        s.left = o.left + (r - n) / 2, s.top = o.top - i - e;
                        break;
                    case "r":
                        s.left = o.left + r + e, s.top = o.top + (a - i) / 2;
                        break;
                    case "b":
                        s.left = o.left + (r - n) / 2, s.top = o.top + a + e;
                        break;
                    case "l":
                        s.left = o.left - n - e, s.top = o.top + (a - i) / 2
                }
            }
            var l = "translate(" + Math.round(s.left) + "px," + Math.round(s.top) + "px)";
            this.messageElement.css({"-webkit-transform": l,"-moz-transform": l,"-ms-transform": l,transform: l}), setTimeout(function() {
                this.messageElement.removeClass("no-transition")
            }.bind(this), 1)
        }
    },paint: function() {
        this.canvas.width = this.width, this.canvas.height = this.height, this.context.clearRect(0, 0, this.width, this.height), this.context.fillStyle = "rgba( 0, 0, 0, 0.7 )", this.context.fillRect(0, 0, this.width, this.height), this.cutoutElement && (this.context.clearRect(this.cutoutRect.x, this.cutoutRect.y, this.cutoutRect.width, this.cutoutRect.height), this.context.strokeStyle = "#ddd", this.context.lineWidth = 1, this.context.strokeRect(this.cutoutRect.x + .5, this.cutoutRect.y + .5, this.cutoutRect.width - 1, this.cutoutRect.height - 1))
    },cutout: function(t, e) {
        e = e || {}, this.cutoutElement = t, this.cutoutPadding = e.padding || 0, this.layout(), this.paint()
    },clearCutout: function() {
        this.cutoutElement = null, this.cutoutPadding = 0, this.paint()
    },message: function(t, e) {
        this.messageOptions = $.extend({maxWidth: 320,alignment: ""}, e), this.messageElement.html(t).show(), this.messageElement.css("max-width", this.messageOptions.maxWidth), this.messageElement.attr("data-alignment", this.messageOptions.alignment), this.layout(), this.paint()
    },clearMessage: function() {
        this.messageElement.hide(), this.messageOptions = {}
    },hasNextStep: function() {
        return this.index + 1 < this.options.steps.length
    },destroy: function() {
        this.destroyed || (this.destroyed = !0, $(window).off("resize", this.onWindowResize), this.skipped.dispose(), this.finished.dispose(), SL.keyboard.release(this.onKeyDown), this.domElement.fadeOut(400, this.domElement.remove))
    },onKeyDown: function(t) {
        return 37 === t.keyCode || 8 === t.keyCode ? this.prev() : (39 === t.keyCode || 32 === t.keyCode) && this.next(), !1
    },onSkipClicked: function() {
        this.skipped.dispatch(), this.destroy()
    },onWindowResize: function() {
        this.layout(), this.paint()
    }}), SL("views").Base = Class.extend({init: function() {
        this.header = new SL.components.Header, this.setupAce(), this.handleLogos(), this.handleOutlines(), this.handleFeedback(), this.handleWindowClose(), this.handleAutoRefresh(), this.parseTimes(), this.parseLinks(), this.parseMeters(), this.parseSpinners(), this.parseNotifications(), this.parseScrollLinks(), setInterval(this.parseTimes.bind(this), 12e4)
    },setupAce: function() {
        "object" == typeof window.ace && "object" == typeof window.ace.config && "function" == typeof window.ace.config.set && ace.config.set("workerPath", "/assets")
    },handleLogos: function() {
        setTimeout(function() {
            $(".logo-animation").addClass("open")
        }, 600)
    },handleOutlines: function() {
        var t = $("<style>").appendTo("head").get(0), e = function(e) {
            t.styleSheet ? t.styleSheet.cssText = e : t.innerHTML = e
        };
        $(document).on("mousedown", function() {
            e("a, button, .sl-select, .sl-checkbox label, .radio label { outline: none !important; }")
        }), $(document).on("keydown", function() {
            e("")
        })
    },handleFeedback: function() {
        $("html").on("click", "[data-feedback-mode]", function(t) {
            var e = $(this), n = {target: this,mode: e.attr("data-feedback-mode") || "contact",position: e.attr("data-feedback-position") || "top",screenshot_enabled: e.attr("data-feedback-screenshot_enabled") || "true",smartvote_enabled: e.attr("data-feedback-smartvote-enabled") || "true",ticket_custom_fields: {}};
            SL.current_deck && (n.ticket_custom_fields["Deck ID"] = SL.current_deck.get("id"), n.ticket_custom_fields["Deck Slug"] = SL.current_deck.get("slug"), n.ticket_custom_fields["Deck Version"] = SL.current_deck.get("version"), n.ticket_custom_fields["Deck Font"] = SL.current_deck.get("theme_font"), n.ticket_custom_fields["Deck Color"] = SL.current_deck.get("theme_color"), n.ticket_custom_fields["Deck Transition"] = SL.current_deck.get("transition"), n.ticket_custom_fields["Deck Background Transition"] = SL.current_deck.get("backgroundTransition"));
            var i = e.attr("data-feedback-type");
            i && i.length && (n.ticket_custom_fields.Type = i);
            var s = e.attr("data-feedback-contact-title");
            s && s.length && (n.contact_title = s), UserVoice.push(["show", n]), t.preventDefault()
        })
    },handleWindowClose: function() {
        var t = SL.util.getQuery();
        if (t && t.autoclose && window.opener) {
            var e = parseInt(t.autoclose, 10) || 0;
            setTimeout(function() {
                try {
                    window.close()
                } catch (t) {
                }
            }, e)
        }
    },handleAutoRefresh: function() {
        var t = SL.util.getQuery();
        if (t && t.autoRefresh) {
            var e = parseInt(t.autoRefresh, 10);
            !isNaN(e) && e > 0 && setTimeout(function() {
                window.location.reload()
            }, e)
        }
    },parseTimes: function() {
        $("time.ago").each(function() {
            var t = $(this).attr("datetime");
            t && $(this).text(moment.utc(t).fromNow())
        }), $("time.date").each(function() {
            var t = $(this).attr("datetime");
            t && $(this).text(moment.utc(t).format("MMM Do, YYYY"))
        })
    },parseLinks: function() {
        $(".linkify").each(function() {
            $(this).html(SL.util.string.linkify($(this).text()))
        })
    },parseMeters: function() {
        $(".sl-meter").each(function() {
            new SL.components.Meter($(this))
        })
    },parseSpinners: function() {
        SL.util.html.generateSpinners()
    },parseNotifications: function() {
        var t = $(".flash-notification");
        t.length && SL.notify(t.remove().text(), t.attr("data-notification-type"))
    },parseScrollLinks: function() {
        $(document).delegate("a[data-scroll-to]", "click", function(t) {
            var e = t.currentTarget, n = $(e.getAttribute("href")), i = parseInt(e.getAttribute("data-scroll-to-offset"), 10), s = parseInt(e.getAttribute("data-scroll-to-duration"), 10);
            isNaN(i) && (i = -20), isNaN(s) && (s = 1e3), n.length && $("html, body").animate({scrollTop: n.offset().top + i}, s), t.preventDefault()
        })
    }}), SL("views.decks").EditRequiresUpgrade = SL.views.Base.extend({init: function() {
        this._super(), this.makePublicButton = $(".make-deck-public").first(), this.makePublicButton.on("click", this.onMakePublicClicked.bind(this)), this.makePublicLoader = Ladda.create(this.makePublicButton.get(0))
    },makeDeckPublic: function() {
        var t = {type: "POST",url: SL.config.AJAX_PUBLISH_DECK(SL.current_deck.get("id")),context: this,data: {visibility: SL.models.Deck.VISIBILITY_ALL}};
        this.makePublicLoader.start(), $.ajax(t).done(function() {
            window.location = SL.routes.DECK_EDIT(SL.current_user.get("username"), SL.current_deck.get("slug"))
        }).fail(function() {
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative"), this.makePublicLoader.stop()
        })
    },onMakePublicClicked: function(t) {
        t.preventDefault(), this.makeDeckPublic()
    }}), SL("views.decks").Embed = SL.views.Base.extend({init: function() {
        this._super(), this.footerElement = $(".embed-footer"), this.revealElement = $(".reveal"), SL.util.setupReveal({embedded: !0,openLinksInTabs: !0,trackEvents: !0}), $(window).on("resize", this.layout.bind(this)), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", this.layout.bind(this)), this.footerElement.find(".fullscreen").on("click", this.onFullScreenClicked.bind(this));
        var t = SL.util.getQuery().style;
        "hidden" !== t || SL.current_deck.isPro() || (t = null), t && $("html").attr("data-embed-style", t), Modernizr.fullscreen === !1 && this.footerElement.find(".fullscreen").hide(), this.layout()
    },layout: function() {
        this.revealElement.height(this.footerElement.is(":visible") ? window.innerHeight - $(".embed-footer").height() : "100%"), Reveal.layout()
    },onFullScreenClicked: function() {
        var t = $("html").get(0);
        return t ? (SL.helpers.Fullscreen.enter(t), !1) : void 0
    }}), SL("views.decks").Fullscreen = SL.views.Base.extend({init: function() {
        this._super(), SL.util.setupReveal({history: !navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi),openLinksInTabs: !0,trackEvents: !0})
    }}), SL("views.decks").LiveClient = SL.views.Base.extend({init: function() {
        this._super(), SL.util.setupReveal({touch: !1,history: !1,keyboard: !1,controls: !1,progress: !1,autoSlide: 0,openLinksInTabs: !0,trackEvents: !0}), this.stream = new SL.helpers.StreamLive, this.stream.ready.add(this.onStreamReady.bind(this)), this.stream.stateChanged.add(this.onStreamStateChanged.bind(this)), this.stream.statusChanged.add(this.onStreamStatusChanged.bind(this)), this.render(), this.bind(), this.setPresentControls(SL.current_deck.user_settings.get("present_controls")), this.setPresentUpsizing(SL.current_deck.user_settings.get("present_upsizing")), this.stream.connect()
    },render: function() {
        var t = SL.current_deck.get("user"), e = SL.routes.DECK(t.username, SL.current_deck.get("slug")), n = t.thumbnail_url;
        this.summaryBubble = $(['<a class="summary-bubble" href="' + e + '" target="_blank">', '<div class="summary-bubble-picture" style="background-image: url(' + n + ')"></div>', '<div class="summary-bubble-content"></div>', "</a>"].join("")).appendTo(document.body), this.summaryBubbleContent = this.summaryBubble.find(".summary-bubble-content"), this.renderUserSummary()
    },renderUserSummary: function() {
        var t = SL.current_deck.get("user");
        this.summaryBubbleContent.html(["<h4>" + SL.current_deck.get("title") + "</h4>", "<p>By " + (t.name || t.username) + "</p>"].join(""))
    },renderWaitingSummary: function() {
        this.summaryBubbleContent.html(["<h4>Waiting for presenter</h4>", '<p class="retry-status"></p>'].join("")), this.summaryBubbleRetryStatus = this.summaryBubbleContent.find(".retry-status")
    },renderConnectionLostSummary: function() {
        this.summaryBubbleContent.html(["<h4>Connection lost</h4>", "<p>Attempting to reconnect</p>"].join(""))
    },startUpdatingTimer: function() {
        var t = function() {
            if (this.summaryBubbleRetryStatus && this.summaryBubbleRetryStatus.length) {
                var t = Date.now() - this.stream.getRetryStartTime(), e = Math.ceil((SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL - t) / 1e3);
                this.summaryBubbleRetryStatus.text(isNaN(e) ? "Retrying" : e > 0 ? "Retrying in " + e + "s" : "Retrying now")
            }
        }.bind(this);
        clearInterval(this.updateTimerInterval), this.updateTimerInterval = setInterval(t, 100), t()
    },stopUpdatingTimer: function() {
        clearInterval(this.updateTimerInterval)
    },bind: function() {
        this.summaryBubble.on("mouseover", this.expandSummary.bind(this)), this.summaryBubble.on("mouseout", this.collapseSummary.bind(this))
    },expandSummary: function(t) {
        clearTimeout(this.collapseSummaryTimeout);
        var e = window.innerWidth - (this.summaryBubbleContent.find("h4, p").offset().left + 40);
        e = Math.min(e, 400), this.summaryBubbleContent.find("h4, p").css("max-width", e), this.summaryBubble.width(this.summaryBubble.height() + this.summaryBubbleContent.outerWidth()), "number" == typeof t && (this.collapseSummaryTimeout = setTimeout(this.collapseSummary.bind(this), t))
    },expandSummaryError: function() {
        this.summaryBubbleError = !0, this.expandSummary()
    },collapseSummary: function() {
        this.summaryBubbleError || (clearTimeout(this.collapseSummaryTimeout), this.summaryBubble.width(this.summaryBubble.height()))
    },setPresentControls: function(t) {
        "boolean" != typeof t && (upsizing = SL.config.PRESENT_CONTROLS_DEFAULT), this.summaryBubble.toggle(t)
    },setPresentUpsizing: function(t) {
        "boolean" != typeof t && (upsizing = SL.config.PRESENT_UPSIZING_DEFAULT), Reveal.configure({maxScale: t ? SL.config.PRESENT_UPSIZING_MAX_SCALE : 1})
    },onStreamReady: function() {
        this.expandSummary(5e3)
    },onStreamStateChanged: function(t) {
        t && "boolean" == typeof t.present_controls && this.setPresentControls(t.present_controls), t && "boolean" == typeof t.present_upsizing && this.setPresentUpsizing(t.present_upsizing)
    },onStreamStatusChanged: function(t) {
        t === SL.helpers.StreamLive.STATUS_WAITING_FOR_PUBLISHER ? (this.renderWaitingSummary(), this.expandSummaryError(), this.startUpdatingTimer()) : t === SL.helpers.StreamLive.STATUS_CONNECTION_LOST ? (this.renderConnectionLostSummary(), this.expandSummaryError(), this.stopUpdatingTimer()) : (this.summaryBubbleError = !1, this.renderUserSummary(), this.stopUpdatingTimer())
    }}), SL("views.decks").LiveServer = SL.views.Base.extend({init: function() {
        this._super(), SL.util.setupReveal({history: !0,openLinksInTabs: !0,controls: SL.current_user.settings.get("present_controls"),progress: SL.current_user.settings.get("present_controls"),maxScale: SL.current_user.settings.get("present_upsizing") ? SL.config.PRESENT_UPSIZING_MAX_SCALE : 1}), this.stream = new SL.helpers.StreamLive({publisher: !0}), this.stream.connect(), this.render()
    },render: function() {
        var t = SL.current_deck.getTokenedAbsoluteURL("live"), e = SL.current_deck.getTokenedAbsoluteURL("speaker"), n = "http://help.slides.com/knowledgebase/articles/333924", i = "http://help.slides.com/knowledgebase/articles/333923";
        this.presentationControls = $(['<aside class="presentation-controls">', '<div class="presentation-controls-content">', "<h2>Presentation Controls</h2>", '<div class="presentation-controls-section">', "<h2>Speaker View</h2>", '<p>The control panel for your presentation. Includes speaker notes, an upcoming slide preview and more. It can be used as a remote control when opened from a mobile device. <a href="' + i + '" target="_blank">Learn more.</a></p>', '<a class="button l outline" href="' + e + '" target="_blank">Open speaker view</a>', "</div>", '<div class="presentation-controls-section">', "<h2>Present Live</h2>", '<p>Share this link with your audience to have them follow along with the presentation in real-time. <a href="' + n + '" target="_blank">Learn more.</a></p>', '<input class="live-view-url input-field" type="text" value="' + t + '" readonly />', "</div>", '<div class="presentation-controls-section sl-form">', "<h2>Options</h2>", '<div class="sl-checkbox outline fullscreen-toggle">', '<input id="fullscreen-checkbox" type="checkbox">', '<label for="fullscreen-checkbox">Fullscreen</label>', "</div>", '<div class="sl-checkbox outline controls-toggle" data-tooltip="Hide the presentation control arrows and progress bar." data-tooltip-alignment="r" data-tooltip-delay="500" data-tooltip-maxwidth="250">', '<input id="controls-checkbox" type="checkbox">', '<label for="controls-checkbox">Hide controls</label>', "</div>", '<div class="sl-checkbox outline upsizing-toggle" data-tooltip="Your content is automatically scaled up to fill as much of the browser window as possible. This option disables that scaling and favors the original authored at size." data-tooltip-alignment="r" data-tooltip-delay="500" data-tooltip-maxwidth="300">', '<input id="upsizing-checkbox" type="checkbox">', '<label for="upsizing-checkbox">Disable upsizing</label>', "</div>", "</div>", "</div>", '<footer class="presentation-controls-footer">', '<button class="button xl positive start-presentation">Start presentation</button>', "</footer>", "</aside>"].join("")).appendTo(document.body), this.presentationControlsScrollShadow = new SL.components.ScrollShadow({parentElement: this.presentationControls,contentElement: this.presentationControls.find(".presentation-controls-content"),footerElement: this.presentationControls.find(".presentation-controls-footer")}), this.presentationControls.find(".live-view-url").on("mousedown", this.onLiveURLMouseDown.bind(this)), this.presentationControls.find(".fullscreen-toggle").on("click", this.onFullscreenToggled.bind(this)), this.presentationControls.find(".controls-toggle").on("click", this.onControlsToggled.bind(this)), this.presentationControls.find(".upsizing-toggle").on("click", this.onUpsizingToggled.bind(this)), this.presentationControls.find(".button.start-presentation").on("click", this.onStartPresentationClicked.bind(this)), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", this.onFullscreenChange.bind(this)), this.syncPresentationControls()
    },syncPresentationControls: function() {
        this.presentationControls.find(".fullscreen-toggle input").prop("checked", SL.helpers.Fullscreen.isActive()), this.presentationControls.find(".controls-toggle input").prop("checked", !SL.current_user.settings.get("present_controls")), this.presentationControls.find(".upsizing-toggle input").prop("checked", !SL.current_user.settings.get("present_upsizing"))
    },showStatus: function(t) {
        this.statusElement ? this.statusElement.find(".stream-status-message").html(t) : this.statusElement = $(['<div class="stream-status">', '<p class="stream-status-message">' + t + "</p>", "</div>"].join("")).appendTo(document.body)
    },clearStatus: function() {
        this.statusElement && (this.statusElement.remove(), this.statusElement = null)
    },savePresentOption: function(t) {
        this.xhrRequests = this.xhrRequests || {}, this.xhrRequests[t] && this.xhrRequests[t].abort();
        var e = {url: SL.config.AJAX_UPDATE_USER_SETTINGS,type: "PUT",context: this,data: {user_settings: {}}};
        e.data.user_settings[t] = SL.current_user.settings.get(t), this.xhrRequests[t] = $.ajax(e).always(function() {
            this.xhrRequests[t] = null
        })
    },onLiveURLMouseDown: function(t) {
        $(t.target).focus().select(), t.preventDefault()
    },onControlsToggled: function(t) {
        t.preventDefault();
        var e = !Reveal.getConfig().controls;
        SL.current_user.settings.set("present_controls", e), Reveal.configure({controls: e,progress: e}), this.syncPresentationControls(), this.savePresentOption("present_controls"), this.stream.publish(null, {present_controls: e})
    },onUpsizingToggled: function(t) {
        t.preventDefault();
        var e = Reveal.getConfig().maxScale <= 1;
        SL.current_user.settings.set("present_upsizing", e), Reveal.configure({maxScale: e ? SL.config.PRESENT_UPSIZING_MAX_SCALE : 1}), this.syncPresentationControls(), this.savePresentOption("present_upsizing"), this.stream.publish(null, {present_upsizing: e})
    },onFullscreenToggled: function(t) {
        t.preventDefault(), SL.helpers.Fullscreen.toggle()
    },onFullscreenChange: function() {
        this.syncPresentationControls(), Reveal.layout()
    },onStartPresentationClicked: function() {
        $("html").addClass("presentation-started")
    }}), SL("views.decks").Show = SL.views.Base.extend({init: function() {
        this._super(), this.summaryBubble = $(".summary-bubble"), SL.util.setupReveal({history: !0,embedded: !0,pause: !1,margin: .1,openLinksInTabs: !0,trackEvents: !0}), this.setupDisqus(), this.showSummaryTimeout = setTimeout(this.showSummary.bind(this), 1e3), this.hideSummaryTimeout = setTimeout(this.hideSummary.bind(this), 8e3), $("header .deck-promotion").length && $("header").addClass("extra-wide"), Modernizr.fullscreen === !1 && $(".deck-options .fullscreen-button").hide(), this.bind(), this.layout()
    },bind: function() {
        this.editButton = $(".deck-options .edit-button"), this.editButtonOriginalLink = this.editButton.attr("href"), $(".deck-options .fork-button").on("click", this.onForkClicked.bind(this)), $(".deck-options .share-button").on("click", this.onShareClicked.bind(this)), $(".deck-options .comment-button").on("click", this.onCommentsClicked.bind(this)), $(".deck-options .fullscreen-button").on("click", this.onFullScreenClicked.bind(this)), this.visibilityButton = $(".deck-options .visibility-button"), this.visibilityButton.on("click", this.onVisibilityClicked.bind(this)), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", Reveal.layout), this.onWindowScroll = $.debounce(this.onWindowScroll, 200), $(window).on("resize", this.layout.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this)), this.hideSummary = this.hideSummary.bind(this), Reveal.addEventListener("slidechanged", this.onSlideChanged.bind(this)), Reveal.addEventListener("fragmentshown", this.hideSummary), Reveal.addEventListener("fragmenthidden", this.hideSummary), this.summaryBubble.on("click", this.hideSummary)
    },setupDisqus: function() {
        if ($("#disqus_thread").length) {
            {
                var t = window.disqus_shortname = "slidesapp";
                window.disqus_identifier = SLConfig.deck.id
            }
            !function() {
                var e = document.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = "//" + t + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(e)
            }()
        } else
            $(".options .comment-button").hide()
    },showSummary: function() {
        this.summaryBubble && this.summaryBubble.addClass("visible")
    },hideSummary: function() {
        this.summaryBubble && (this.summaryBubble.removeClass("visible"), this.summaryBubble.on("transitionend", function() {
            $(this).remove()
        }), this.summaryBubble = null)
    },layout: function() {
        this.summaryBubble && this.summaryBubble.css("left", (window.innerWidth - this.summaryBubble.width()) / 2);
        var t = $(".reveal .playback"), e = $(".deck-kudos"), n = {opacity: 1};
        e.length && t.length && (n.marginLeft = t.offset().left + t.outerWidth() - 10), e.css(n)
    },saveVisibility: function(t) {
        var e = {type: "POST",url: SL.config.AJAX_PUBLISH_DECK(SL.current_deck.get("id")),context: this,data: {visibility: t}};
        $.ajax(e).done(function(t) {
            t.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_SELF")) : t.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_TEAM")) : t.deck.visibility === SL.models.Deck.VISIBILITY_ALL && SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ALL")), "string" == typeof t.deck.slug && SL.current_deck.set("slug", t.deck.slug), "string" == typeof t.deck.visibility && SL.current_deck.set("visibility", t.deck.visibility)
        }).fail(function() {
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative")
        })
    },onShareClicked: function() {
        return "undefined" != typeof SLConfig && "string" == typeof SLConfig.deck.user.username && "string" == typeof SLConfig.deck.slug ? SL.modal.open("share-deck", SLConfig.deck) : SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"), SL.analytics.trackPresenting("Share clicked"), !1
    },onCommentsClicked: function() {
        SL.analytics.trackPresenting("Comments clicked")
    },onFullScreenClicked: function() {
        var t = $(".reveal-viewport").get(0);
        return t ? (SL.helpers.Fullscreen.enter(t), !1) : void SL.analytics.trackPresenting("Fullscreen clicked")
    },onForkClicked: function() {
        return SL.analytics.trackPresenting("Fork clicked"), $.ajax({type: "POST",url: SL.config.AJAX_FORK_DECK(SLConfig.deck.id),context: this}).done(function() {
            window.location = SL.current_user.getProfileURL()
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        }), !1
    },onVisibilityClicked: function(t) {
        t.preventDefault();
        var e = SL.current_deck.get("visibility"), n = [];
        n.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_SELF"),selected: e === SL.models.Deck.VISIBILITY_SELF,callback: function() {
                this.saveVisibility(SL.models.Deck.VISIBILITY_SELF), SL.analytics.trackPresenting("Visibility changed", "self")
            }.bind(this)}), SL.current_user.isEnterprise() && n.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_TEAM"),selected: e === SL.models.Deck.VISIBILITY_TEAM,className: "divider",callback: function() {
                this.saveVisibility(SL.models.Deck.VISIBILITY_TEAM), SL.analytics.trackPresenting("Visibility changed", "team")
            }.bind(this)}), n.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_ALL"),selected: e === SL.models.Deck.VISIBILITY_ALL,callback: function() {
                this.saveVisibility(SL.models.Deck.VISIBILITY_ALL), SL.analytics.trackPresenting("Visibility changed", "all")
            }.bind(this)}), SL.prompt({anchor: $(t.currentTarget),type: "select",data: n}), SL.analytics.trackPresenting("Visibility menu opened")
    },onSlideChanged: function(t) {
        this.hideSummary();
        var e = "#";
        t.indexh && (e += "/" + t.indexh, t.indexv && (e += "/" + t.indexv)), this.editButton.attr("href", this.editButtonOriginalLink + e)
    },onWindowScroll: function() {
        $(window).scrollTop() > 10 && this.hideSummary()
    }}), SL("views.decks").Speaker = SL.views.Base.extend({init: function() {
        this._super(), this.notesElement = $(".speaker-controls .notes"), this.notesValue = $(".speaker-controls .notes .value"), this.timeElement = $(".speaker-controls .time"), this.timeTimerValue = $(".speaker-controls .time .timer-value"), this.timeClockValue = $(".speaker-controls .time .clock-value"), this.subscribersElement = $(".speaker-controls .subscribers"), this.subscribersValue = $(".speaker-controls .subscribers .subscribers-value"), this.currentElement = $(".current-slide"), this.upcomingElement = $(".upcoming-slide"), this.upcomingFrame = $(".upcoming-slide iframe"), this.upcomingFrame.length ? (this.upcomingFrame.on("load", this.onUpcomingFrameLoaded.bind(this)), this.upcomingFrame.attr("src", this.upcomingFrame.attr("data-src"))) : this.setup(), SL.helpers.PageLoader.show()
    },setup: function() {
        Reveal.addEventListener("ready", function() {
            this.currentReveal = window.Reveal, this.currentReveal.addEventListener("slidechanged", this.onCurrentSlideChanged.bind(this)), this.currentReveal.addEventListener("fragmentshown", this.onCurrentFragmentChanged.bind(this)), this.currentReveal.addEventListener("fragmenthidden", this.onCurrentFragmentChanged.bind(this)), this.currentReveal.addEventListener("paused", this.onCurrentPaused.bind(this)), this.currentReveal.addEventListener("resumed", this.onCurrentResumed.bind(this)), this.upcomingFrame.length && (this.upcomingReveal = this.upcomingFrame.get(0).contentWindow.Reveal, this.upcomingReveal.configure({history: !1,controls: !1,progress: !1,overview: !1,autoSlide: 0,transition: "none",backgroundTransition: "none"}), this.upcomingReveal.addEventListener("slidechanged", this.onUpcomingSlideChanged.bind(this)), this.upcomingFrame.get(0).contentWindow.document.body.className += " no-transition"), this.setupTimer(), this.setupTouch(), this.stream = new SL.helpers.StreamLive({reveal: this.currentReveal,publisher: !0}), this.stream.ready.add(this.onStreamReady.bind(this)), this.stream.subscribersChanged.add(this.onStreamSubscribersChange.bind(this)), this.stream.connect()
        }.bind(this)), SL.util.setupReveal({touch: !1,history: !1,autoSlide: 0,openLinksInTabs: !0})
    },setupTouch: function() {
        if ($("html").hasClass("speaker-mobile") && (SL.util.device.HAS_TOUCH || window.navigator.pointerEnabled)) {
            this.touchControls = $(['<div class="touch-controls">', '<div class="touch-controls-content">', '<span class="status">', "Tap or Swipe to change slide", "</span>", '<span class="slide-number"></span>', "</div>", '<div class="touch-controls-progress"></div>', "</div>"].join("")).appendTo(document.body), this.touchControlsProgress = this.touchControls.find(".touch-controls-progress"), this.touchControlsSlideNumber = this.touchControls.find(".slide-number"), this.touchControlsStatus = this.touchControls.find(".status"), setTimeout(function() {
                this.touchControls.addClass("visible")
            }.bind(this), 1e3);
            var t = new Hammer(document.body);
            t.get("swipe").set({direction: Hammer.DIRECTION_ALL}), t.get("press").set({threshold: 1e3}), t.on("swipe", function(t) {
                switch (t.direction) {
                    case Hammer.DIRECTION_LEFT:
                        this.currentReveal.right(), this.showTouchStatus("Next slide");
                        break;
                    case Hammer.DIRECTION_RIGHT:
                        this.currentReveal.left(), this.showTouchStatus("Previous slide");
                        break;
                    case Hammer.DIRECTION_UP:
                        this.currentReveal.down(), this.showTouchStatus("Next vertical slide");
                        break;
                    case Hammer.DIRECTION_DOWN:
                        this.currentReveal.up(), this.showTouchStatus("Previous vertical slide")
                }
            }.bind(this)), t.on("tap", function() {
                this.currentReveal.next(), this.showTouchStatus("Next slide")
            }.bind(this)), t.on("press", function() {
                this.currentReveal.isPaused() && (this.currentReveal.togglePause(!1), this.showTouchStatus("Resumed"))
            }.bind(this))
        }
    },setupTimer: function() {
        this.timeTimerValue.on("click", this.restartTimer.bind(this)), this.restartTimer(), setInterval(this.syncTimer.bind(this), 1e3)
    },restartTimer: function() {
        this.startTime = Date.now(), this.syncTimer()
    },sync: function() {
        setTimeout(function() {
            this.syncUpcomingSlide(), this.syncTouchControls(), this.syncNotes(), this.syncTimer()
        }.bind(this), 1)
    },syncTimer: function() {
        var t = moment();
        this.timeClockValue.html(t.format("hh:mm") + ' <span class="dim">' + t.format("A") + "<span>"), t.hour(0).minute(0).second((Date.now() - this.startTime) / 1e3);
        var e = t.format("HH") + ":", n = t.format("mm") + ":", i = t.format("ss");
        "00:" === e && (e = '<span class="dim">' + e + "</span>", "00:" === n && (n = '<span class="dim">' + n + "</span>")), this.timeTimerValue.html(e + n + i)
    },syncUpcomingSlide: function() {
        if (this.upcomingReveal) {
            var t = this.currentReveal.getIndices();
            this.upcomingReveal.slide(t.h, t.v, t.f), this.upcomingReveal.next()
        }
    },syncNotes: function() {
        var t = $(this.currentReveal.getCurrentSlide()).attr("data-notes") || "";
        t ? (this.notesElement.show(), this.notesValue.text(t), this.notesElement.removeAttr("data-note-length"), t.length < .2 * SL.config.SPEAKER_NOTES_MAXLENGTH ? this.notesElement.attr("data-note-length", "short") : t.length > .7 * SL.config.SPEAKER_NOTES_MAXLENGTH && this.notesElement.attr("data-note-length", "long")) : this.notesElement.hide()
    },syncTouchControls: function() {
        if (this.touchControls) {
            var t = this.currentReveal.getProgress();
            this.touchControlsProgress.css({"-webkit-transform": "scale(" + t + ", 1)","-moz-transform": "scale(" + t + ", 1)","-ms-transform": "scale(" + t + ", 1)",transform: "scale(" + t + ", 1)"});
            var e = $(".reveal .slides section:not(.stack)").length, n = this.currentReveal.getIndices().h + this.currentReveal.getIndices().v;
            n += $(".reveal .slides>section.present").prevAll("section").find(">section:gt(0)").length, n += 1, this.touchControlsSlideNumber.html(n + "/" + e)
        }
    },showTouchStatus: function(t) {
        clearTimeout(this.touchControlsStatusTimeout);
        var e = this.currentReveal && this.currentReveal.isPaused();
        e && (t = "Paused (tap+hold to resume)"), this.touchControlsStatus && (this.touchControlsStatus.text(t).removeClass("hidden"), e || (this.touchControlsStatusTimeout = setTimeout(function() {
            this.touchControlsStatus.addClass("hidden")
        }.bind(this), 1e3)))
    },onUpcomingFrameLoaded: function() {
        this.setup()
    },onStreamReady: function() {
        SL.helpers.PageLoader.hide(), this.sync()
    },onStreamSubscribersChange: function(t) {
        "number" == typeof this.subscriberCount && (this.subscribersValue.removeClass("flash green flash-red"), t > this.subscriberCount ? setTimeout(function() {
            this.subscribersValue.addClass("flash-green")
        }.bind(this), 1) : t < this.subscriberCount && setTimeout(function() {
            this.subscribersValue.addClass("flash-red")
        }.bind(this), 1)), this.subscriberCount = t, this.subscriberCount > 0 ? (this.subscribersValue.html('<span class="icon i-eye"></span>' + t), this.subscribersElement.addClass("visible")) : this.subscribersElement.removeClass("visible")
    },onCurrentSlideChanged: function() {
        this.sync()
    },onCurrentFragmentChanged: function() {
        this.sync()
    },onCurrentPaused: function() {
        this.pausedInstructions || (this.pausedInstructions = $('<h3 class="message-overlay">Paused. Press the "B" key to resume.</h3>'), this.pausedInstructions.appendTo(this.currentElement), this.pausedInstructions.addClass("visible"))
    },onCurrentResumed: function() {
        this.pausedInstructions && (this.pausedInstructions.remove(), this.pausedInstructions = null)
    },onUpcomingSlideChanged: function() {
    }}), SL("views.devise").All = SL.views.Base.extend({init: function() {
        this._super(), this.setupForm()
    },setupForm: function() {
        if (this.formElement = $("form"), this.formElement.length) {
            this.formElement.find(".unit[data-validate]").each(function(t, e) {
                new SL.components.FormUnit(e)
            });
            var t = this.formElement.find("button[type=submit]");
            t.length && this.formElement.on("submit", function(e) {
                if (!e.isDefaultPrevented())
                    if ($(".g-recaptcha").length && "undefined" != typeof window.grecaptcha && "function" == typeof window.grecaptcha.getResponse) {
                        if (!grecaptcha.getResponse())
                            return SL.notify("Please answer the reCAPTCHA to prove you're not a robot"), e.preventDefault(), !1
                    } else
                        Ladda.create(t.get(0)).start()
            }.bind(this))
        }
    }}), SL("views.devise").Edit = SL.views.devise.All.extend({init: function() {
        this._super(), $(".delete-account-toggle").on("click", this.onDeleteAccountToggleClicked.bind(this)), $(".delete-profile-photo").on("click", this.onDeleteProfilePhotoClicked.bind(this)), $("#user_email").on("change keyup", this.onEmailChanged.bind(this)), $("#user_password").on("change keyup", this.onNewPasswordChanged.bind(this)), this.undoAutoFill()
    },undoAutoFill: function() {
        if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0)
            var t = window.setInterval(function() {
                var e = $("input:-webkit-autofill");
                e.length > 0 && (window.clearInterval(t), e.each(function() {
                    var t = $(this).clone(!0, !0);
                    t.is("[type=password]") && t.val(""), $(this).after(t).remove();
                    var e = t.parent(".unit");
                    e.length && new SL.components.FormUnit(e)
                }))
            }, 20)
    },updatePasswordVerification: function() {
        var t = $("#user_email").parents(".unit"), e = $("#user_password").parents(".unit"), n = $("#user_current_password").parents(".unit"), i = t.data("controller"), s = e.data("controller");
        i && s && i.isUnchanged() && s.isUnchanged() ? (n.removeAttr("data-required"), n.addClass("hidden")) : (n.attr("data-required", "true"), n.removeClass("hidden"))
    },onDeleteAccountToggleClicked: function(t) {
        t.preventDefault(), $(".delete-account").toggleClass("visible")
    },onDeleteProfilePhotoClicked: function(t) {
        t.preventDefault(), $.ajax({url: SL.config.AJAX_UPDATE_USER,type: "PUT",context: this,data: {user: {profile_photo: ""}}}).done(function() {
            $(".photo-editor").attr("data-photo-type", "gravatar")
        }).fail(function() {
            SL.notify("An error occured while saving", "negative")
        })
    },onEmailChanged: function() {
        this.updatePasswordVerification()
    },onNewPasswordChanged: function() {
        this.updatePasswordVerification()
    }}), SL("views.home").Explore = SL.views.Base.extend({init: function() {
        this._super(), new SL.components.Search({url: SL.config.AJAX_SEARCH})
    }}), SL("views.home").Index = SL.views.Base.extend({MARQUEE_MIN_HEIGHT: 600,init: function() {
        this._super(), this.sharingElement = $(".marquee .sharing"), this.learnMoreButton = $(".marquee .description-cta-secondary"), this.scrollPromotion = $(".marquee .scroll-promotion"), this.scrollPromotionArrow = $(".marquee .scroll-promotion-arrow"), this.backgroundElement = $(".marquee .marquee-background"), this.setupBackground(), this.setupVideo(), this.bind(), this.startScrollPromotion()
    },setupBackground: function() {
        this.backgroundImage = $("<img>", {src: SL.config.ASSET_URLS["homepage-background.jpg"],load: this.onBackgroundLoaded.bind(this)})
    },setupVideo: function() {
        (SL.util.device.IS_PHONE || SL.util.device.IS_TABLET) && $(".features .features-item-figure").each(function() {
            var t = $(this), e = t.find(".image-wrapper"), n = t.find(".video-wrapper");
            n.length && (n.find("video").prop("controls", !0), n.appendTo(t), e.appendTo(t), t.addClass("manually-triggered"), t.find(".browser-frame").remove(), t.find(".browser-content").remove())
        }), $(".features video").each(function(t, e) {
            var n = "";
            e = $(e), e.find("span[data-src]").each(function(t, e) {
                e = $(e), n += '<source src="' + e.attr("data-src") + '" type="' + e.attr("data-type") + '">'
            }), n && e.html(n)
        })
    },bind: function() {
        this.sharingElement.on("mouseover", this.onSharingMouseOver.bind(this)), this.learnMoreButton.on("click", this.onLearnMoreClicked.bind(this)), this.scrollPromotion.on("click", this.onLearnMoreClicked.bind(this)), this.scrollPromotionArrow.on("mouseover", this.onScrollPromotionOver.bind(this)), SL.util.device.IS_PHONE || SL.util.device.IS_TABLET || (this.updateFeatureAnimations = $.debounce(this.updateFeatureAnimations, 300), $(window).on("resize", this.onWindowResize.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this))), this.trackScrolling = $.throttle(this.trackScrolling, 500), $(window).on("scroll", this.trackScrolling.bind(this))
    },trackScrolling: function() {
        this.scrollTracking = this.scrollTracking || {};
        var t = $(window).scrollTop(), e = window.innerHeight, n = $(document).height(), i = Math.max(Math.min(t / (n - e), 1), 0);
        i > .1 && !this.scrollTracking[.1] && (this.scrollTracking[.1] = !0, SL.analytics.track("Home: Scrolled", "10%")), i > .5 && !this.scrollTracking[.5] && (this.scrollTracking[.5] = !0, SL.analytics.track("Home: Scrolled", "50%")), i > .95 && !this.scrollTracking[.95] && (this.scrollTracking[.95] = !0, SL.analytics.track("Home: Scrolled", "100%"))
    },updateFeatureAnimations: function() {
        var t, e = $(window).scrollTop(), n = Number.MAX_VALUE;
        $(".features .features-item .video-wrapper, .features .features-item .animation-wrapper").each(function(i, s) {
            s = $(s);
            var o = s.offset().top, r = o - e;
            r > -100 && 500 > r && n > r && (n = r, t = s)
        }), this.activeFeature && !this.activeFeature.is(t) && this.stopFeatureAnimation(), t && !t.hasClass("playing") && (this.activeFeature = t, this.startFeatureAnimation())
    },startFeatureAnimation: function() {
        if (this.activeFeature.addClass("playing"), this.activeFeature.is(".video-wrapper"))
            this.activeFeature.find("video").get(0).play();
        else if (this.activeFeature.is(".animation-wrapper")) {
            var t = parseInt(this.activeFeature.attr("data-animation-steps"), 10), e = parseInt(this.activeFeature.attr("data-animation-duration"), 10), n = 1;
            this.activeFeature.attr("data-animation-step", n), this.activeFeatureInterval = setInterval(function() {
                n += 1, n = n > t ? 1 : n, this.activeFeature.attr("data-animation-step", n)
            }.bind(this), e / t)
        }
        SL.analytics.track("Home: Start feature animation")
    },stopFeatureAnimation: function() {
        this.activeFeature.removeClass("playing"), this.activeFeature.removeAttr("data-animation-step"), clearInterval(this.activeFeatureInterval), this.activeFeature.is(".video-wrapper") && this.activeFeature.find("video").get(0).pause()
    },startScrollPromotion: function() {
        clearInterval(this.scrollPromotionInterval), this.scrollPromotionInterval = setInterval(this.promoteScrolling.bind(this), 2500)
    },stopScrollPromotion: function() {
        clearInterval(this.scrollPromotionInterval), this.scrollPromotionInterval = null
    },promoteScrolling: function() {
        this.scrollPromotionArrow.removeClass("bounce"), setTimeout(function() {
            this.scrollPromotionArrow.addClass("bounce")
        }.bind(this), 1)
    },onScrollPromotionOver: function() {
        this.stopScrollPromotion()
    },onBackgroundLoaded: function() {
        this.backgroundElement.css("background-image", "url(" + this.backgroundImage.attr("src") + ")").addClass("show")
    },onSharingMouseOver: function() {
        this.sharingElement.hasClass("parsed") || (this.sharingElement.addClass("parsed"), this.sharingElement.html('<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fslidesapp&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=20&amp" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:20px;" allowTransparency="true"></iframe><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://slides.com" data-text="Create, present and share beautiful presentations with @slidesapp" data-count="horizontal" data-related="slidesapp"></a>'), !function(t, e, n) {
            var i, s = t.getElementsByTagName(e)[0];
            t.getElementById(n) || (i = t.createElement(e), i.id = n, i.src = "//platform.twitter.com/widgets.js", s.parentNode.insertBefore(i, s))
        }(document, "script", "twitter-wjs"))
    },onLearnMoreClicked: function() {
        SL.analytics.track("Home: Learn more clicked"), this.stopScrollPromotion()
    },onWindowResize: function() {
        this.updateFeatureAnimations()
    },onWindowScroll: function() {
        this.updateFeatureAnimations(), this.scrollPromotionInterval && this.stopScrollPromotion(), this.trackScrolling()
    }}), SL("views.statik").All = SL.views.Base.extend({init: function() {
        this._super(), $("img.click-to-expand").on("click", function() {
            $(this).toggleClass("expanded")
        })
    }}), SL("views.statik").Pricing = SL.views.statik.All.extend({init: function() {
        this._super(), $(".tier").each(this.setupTier.bind(this))
    },setupTier: function(t, e) {
        var e = $(e), n = e.find(".cta a");
        n.length && !n.hasClass("disabled") && (e.on("click", function(t) {
            t.preventDefault(), window.location = n.attr("href")
        }), e.on("mouseenter", function() {
            e.addClass("hover")
        }), e.on("mouseleave", function() {
            e.removeClass("hover")
        }))
    }}), SL("views.subscriptions").EditPeriod = SL.views.Base.extend({init: function() {
        this._super(), Ladda.bind($("#payment-form button[type=submit]").get(0))
    }}), SL("views.subscriptions").New = SL.views.Base.extend({init: function() {
        this._super(), this.onFormSubmit = this.onFormSubmit.bind(this), this.onStripeResponse = this.onStripeResponse.bind(this), this.formElement = $("#payment-form"), this.formElement.on("submit", this.onFormSubmit), this.formSubmitButton = this.formElement.find("button[type=submit]"), this.formSubmitLoader = Ladda.create(this.formSubmitButton.get(0)), $("#stripe-card-number").payment("formatCardNumber"), $("#stripe-card-cvc").payment("formatCardCVC"), $("#stripe-month").payment("restrictNumeric"), $("#stripe-year").payment("restrictNumeric"), SL.util.device.supportedByEditor() || $(".column").prepend("<section class=\"critical-error\"><h2>Not supported</h2><p>It looks like you're using a browser which isn't suported by the Slides editor. Please make sure to try the editor before upgrading.</p></section>"), $("html").hasClass("subscriptions new") && ($('input[name="subscription[billing_period]"]').on("change", this.syncSubmitButton.bind(this)), this.syncSubmitButton())
    },syncSubmitButton: function() {
        var t = this.formElement.find('input[name="subscription[billing_period]"]:checked'), e = t.attr("data-period-value"), n = t.attr("data-dollar-value"), i = this.formElement.find(".devise-note");
        0 === i.length && (i = $('<div class="devise-note">').insertAfter(this.formElement.find(".actions"))), e && n ? i.html("You are starting a <strong>" + e + "</strong> subscription and will be charged <strong>$" + n + "</strong> today.") : i.remove()
    },onFormSubmit: function(t) {
        return this.formSubmitLoader.start(), Stripe.createToken(this.formElement, this.onStripeResponse), t.preventDefault(), !1
    },onStripeResponse: function(t, e) {
        if (e.error)
            SL.notify(e.error.message, "negative"), this.formSubmitLoader.stop();
        else {
            var n = e.id;
            this.formElement.find('input[name="subscription[token]"]').remove(), this.formElement.append($('<input type="hidden" name="subscription[token]" />').val(n)), this.formElement.get(0).submit()
        }
    }}), SL("views.subscriptions").Show = SL.views.Base.extend({DOTTED_CARD_PREFIX: "&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; ",init: function() {
        this._super(), this.strings = {CONFIRM_UNSUBSCRIBE_ACTION: "Unsubscribe",CONFIRM_UNSUBSCRIBE_DESCRIPTION: SL.locale.get("REMOVE_PRO_CONFIRM")}, this.load()
    },bindLadda: function() {
        $(".column section .ladda-button").each(function(t, e) {
            e = $(e), e.data("ladda") || e.data("ladda", Ladda.create(e.get(0)))
        })
    },load: function() {
        $.ajax({url: SL.config.AJAX_SUBSCRIPTIONS_STATUS,type: "GET",context: this}).done(this.onDataLoaded).fail(this.onDataFailed)
    },onDataLoaded: function(t) {
        this.data = new SL.models.Customer(t.customer), this.render()
    },onDataFailed: function() {
        $(".billing-loader").text(SL.locale.get("BILLING_DETAILS_ERROR"))
    },render: function() {
        $(".billing-loader").remove(), this.renderDetails(), this.renderHistory(), (!SL.current_user.isEnterprise() || SL.current_user.billing_address) && this.renderAddress(), this.bindLadda()
    },renderDetails: function() {
        var t = $('<section class="billing-details"><h2>Billing details</h2></section>').appendTo(".billing-wrapper"), e = this.data.hasActiveSubscription();
        if (e) {
            if (t.append('<div class="field status"><span class="label">Status</span><span class="value">Active</span></div>'), this.data.has("active_card") && t.append('<div class="field card"><span class="label">Card</span><span class="value">' + this.DOTTED_CARD_PREFIX + this.data.get("active_card.last4") + "</span></div>"), this.data.has("subscription")) {
                var n = moment.unix(this.data.getNextInvoiceDate()).format("MMMM Do, YYYY"), i = "$" + this.data.getNextInvoiceSum();
                t.append('<div class="field payment-cycle"><span class="label">Next invoice</span><span class="value">' + i + " on " + n + "</span></div>")
            }
            t.append('<footer class="actions"><a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_CARD + '">Change credit card</a><button class="button s negative outline cancel-subscription ladda-button" data-style="expand-right" data-spinner-color="#222">' + this.strings.CONFIRM_UNSUBSCRIBE_ACTION + "</button></footer>"), this.data.get("can_change_period") && t.find(".actions").prepend('<a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_PERIOD + '">Change billing period</a>')
        } else {
            var s = moment.unix(this.data.get("subscription.current_period_end")).format("MMM Do, YYYY");
            t.append('<div class="field status"><span class="label">Status</span><span class="value">Pro until ' + s + "</span></div>"), t.append('<footer class="actions"><a class="button s outline positive" href="' + SL.routes.SUBSCRIPTIONS_NEW + '">Return to Pro</a></footer>')
        }
        this.cancelButton = $(".billing-details .cancel-subscription"), this.cancelButton.length && (this.cancelButton.on("click", this.onCancelSubscriptionClicked.bind(this)), this.cancelLoader = Ladda.create(this.cancelButton.get(0)))
    },renderHistory: function() {
        var t = $(['<section class="billing-history">', "<h2>Receipts</h2>", '<table class="sl-table"></table>', "</section>"].join("")).appendTo(".billing-wrapper"), e = t.find("table");
        if (this.data.get("can_toggle_notifications") === !0) {
            t.append(['<div class="sl-checkbox outline">', '<input type="checkbox" id="receipt-notifications">', '<label for="receipt-notifications">Send receipts via email</label>', "</div>"].join(""));
            var n = t.find("#receipt-notifications");
            n.on("change", this.onEmailNotificationChanged.bind(this)), SL.current_user.notify_on_receipt && n.prop("checked", !0)
        }
        e.html(["<tr>", '<th class="amount">Amount</th>', '<th class="date">Date</th>', '<th class="card">Card</th>', '<th class="download">PDF</th>', "</tr>"].join(""));
        var i = this.data.get("charges");
        i && i.length ? i.forEach(function(t) {
            var n = $(['<tr data-charge-id="' + t.id + '">', '<td class="amount">$' + (t.amount / 100).toFixed(2) + "</td>", '<td class="date">' + moment.unix(t.created).format("DD-MM-YYYY") + "</td>", '<td class="card">' + this.DOTTED_CARD_PREFIX + t.card.last4 + "</td>", '<td class="download">', '<form action="' + SL.config.AJAX_SUBSCRIPTIONS_PRINT_RECEIPT(t.id) + '" method="post">', '<button type="submit" class="button outline ladda-button download-button" data-style="slide-right" data-spinner-color="#222">', '<span class="icon i-download"></span>', "</button>", "</form>", "</td>", "</tr>"].join(""));
            n.appendTo(e), SL.util.dom.insertCSRF(n.find(".download form"))
        }.bind(this)) : e.replaceWith("<p>" + SL.locale.get("BILLING_DETAILS_NOHISTORY") + "</p>")
    },renderAddress: function() {
        var t = $(['<section class="billing-address">', "<h2>Billing address</h2>", '<div class="sl-form">', '<div class="unit">', '<p class="unit-description">If you wish to include a billing address on your receipts please enter it below.</p>', '<textarea class="billing-address-input" rows="4" maxlength="100">', SL.current_user.billing_address || "", "</textarea>", "</div>", '<div class="footer">', '<button class="button l positive billing-address-save">Save</button>', "</div>", "</div>", "</section>"].join("")).appendTo(".billing-wrapper");
        this.addressInputField = t.find(".billing-address-input"), this.addressSaveButton = t.find(".billing-address-save"), this.addressInputField.on("change keyup mouseup", this.checkAddress.bind(this)), this.addressSaveButton.on("click", this.saveAddress.bind(this)), this.checkAddress()
    },checkAddress: function() {
        this.addressInputField.val() === (SL.current_user.billing_address || "") ? this.addressSaveButton.hide() : this.addressSaveButton.show()
    },saveAddress: function() {
        this.billingAddressXHR && this.billingAddressXHR.abort();
        var t = this.addressInputField.val() || "";
        this.billingAddressXHR = $.ajax({url: SL.config.AJAX_UPDATE_USER,type: "PUT",context: this,data: {user: {billing_address: t}}}).done(function() {
            SL.current_user.billing_address = t, SL.notify("Billing address saved")
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        }).always(function() {
            this.billingAddressXHR = null, this.checkAddress()
        })
    },onCancelSubscriptionClicked: function(t) {
        SL.prompt({anchor: $(t.currentTarget),title: this.strings.CONFIRM_UNSUBSCRIBE_DESCRIPTION,type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Confirm</h3>",selected: !0,className: "negative",callback: function() {
                        this.cancelLoader.start(), $.ajax({url: SL.config.AJAX_SUBSCRIPTIONS,type: "DELETE",context: this}).done(this.onCancelSubscriptionSuccess).fail(this.onCancelSubscriptionError)
                    }.bind(this)}]})
    },onCancelSubscriptionSuccess: function() {
        SL.notify(SL.locale.get("REMOVE_PRO_SUCCESS")), window.location.reload()
    },onCancelSubscriptionError: function() {
        SL.notify(SL.locale.get("GENERIC_ERROR")), this.cancelLoader.stop()
    },onEmailNotificationChanged: function(t) {
        this.emailNotificationXHR && this.emailNotificationXHR.abort(), this.emailNotificationXHR = $.ajax({url: SL.config.AJAX_UPDATE_USER,type: "PUT",context: this,data: {user: {notify_on_receipt: $(t.currentTarget).is(":checked")}}}).done(function() {
            SL.notify("Notification change saved")
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        }).always(function() {
            this.emailNotificationXHR = null
        })
    }}), SL("views.teams").New = SL.views.Base.extend({init: function() {
        this._super(), this.formElement = $("#payment-form"), this.formSubmitButton = this.formElement.find("button[type=submit]"), this.formSubmitLoader = Ladda.create(this.formSubmitButton.get(0)), this.bind(), this.summarize()
    },bind: function() {
        this.summarize = this.summarize.bind(this), this.formElement.on("keydown", this.onFormKeyDown.bind(this)), this.formSubmitButton.on("click", this.onFormSubmitClicked.bind(this)), this.formElement.find("#team-name").on("input", this.onTeamNameChange.bind(this)), this.formElement.find('input[name="billing-period"]').on("change", this.summarize), $("#stripe-card-number").payment("formatCardNumber"), $("#stripe-card-cvc").payment("formatCardCVC"), $("#stripe-month").payment("restrictNumeric"), $("#stripe-year").payment("restrictNumeric"), this.formElement.find(".unit[data-validate], .unit[data-required]").each(function(t, e) {
            $(e).data("unit", new SL.components.FormUnit(e))
        })
    },summarize: function() {
        var t = this.formElement.find(".purchase-summary"), e = t.find(".message"), n = "monthly" === this.formElement.find('input[name="billing-period"]:checked').val(), i = {period: n ? "month" : "year",cost: "$" + (n ? 14 : 140)};
        e.html(["You are starting a <strong>30 day free trial</strong>. If you cancel anytime in that period you will not be charged at all.", "<br><br>After the trial you will begin paying <strong>" + i.cost + " per " + i.period + "</strong> for each team member."].join(""))
    },validate: function() {
        var t = !0;
        return this.formElement.find(".unit[data-validate], .unit[data-required]").each(function(e, n) {
            var i = $(n).data("unit");
            i.validate(!0) === !1 && (t && i.focus(), t = !1)
        }), t
    },captureData: function() {
        this.formData = {team: {name: this.formElement.find("#team-name").val(),slug: this.formElement.find("#team-slug").val()},user: {username: this.formElement.find("#user-name").val(),email: this.formElement.find("#user-email").val(),password: this.formElement.find("#user-password").val()},subscription: {billing_period: this.formElement.find('input[name="billing-period"]:checked').val()}}
    },submitToStripe: function() {
        this.validate() && (this.captureData(), this.formSubmitLoader.start(), Stripe.createToken(this.formElement, this.onStripeResponse.bind(this)))
    },submitToApp: function(t) {
        this.formData.subscription.token = t, $.ajax({type: "POST",url: SL.config.AJAX_TEAMS_CREATE,data: JSON.stringify(this.formData),dataType: "json",context: this,contentType: "application/json"}).done(function(t) {
            window.location = t.team && "string" == typeof t.team.root_url ? window.location.protocol + "//" + t.team.root_url : window.location.protocol + "//" + this.formData.team.slug + "." + window.location.host
        }).fail(function(t) {
            var e = JSON.parse(t.responseText);
            e && e.user && e.user.email && e.user.email.length ? SL.notify("Email error: " + e.user.email[0], "negative") : SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"), this.formSubmitLoader.stop()
        })
    },onStripeResponse: function(t, e) {
        e.error ? (SL.notify(e.error.message, "negative"), this.formSubmitLoader.stop()) : this.submitToApp(e.id)
    },onFormKeyDown: function(t) {
        return 13 === t.keyCode ? (this.submitToStripe(), t.preventDefault(), !1) : void 0
    },onFormSubmitClicked: function(t) {
        return this.submitToStripe(), t.preventDefault(), !1
    },onTeamNameChange: function() {
        var t = this.formElement.find("#team-name"), e = this.formElement.find("#team-slug");
        e.val(SL.util.string.slug(t.val()));
        var n = e.data("unit");
        n && n.validate()
    }}), SL("views.teams.subscriptions").Show = SL.views.subscriptions.Show.extend({init: function() {
        this._super()
    },render: function() {
        this.data.isTrial() ? (this.strings.CONFIRM_UNSUBSCRIBE_ACTION = "Delete my team", this.strings.CONFIRM_UNSUBSCRIBE_DESCRIPTION = "Your trial will be canceled immediately and this team will no longer be accessible.") : (this.strings.CONFIRM_UNSUBSCRIBE_ACTION = "End subscription", this.strings.CONFIRM_UNSUBSCRIBE_DESCRIPTION = "Your subscription will be terminated and this team will be inaccessible after the end of the current billing cycle."), this._super()
    },renderDetails: function() {
        var t = $('<section class="billing-details"><h2>Billing details</h2></section>').appendTo(".billing-wrapper"), e = this.data.hasActiveSubscription(), n = this.data.isTrial();
        if (e) {
            if (t.append(n ? '<div class="field status"><span class="label">Status</span><span class="value">Trial</span></div>' : '<div class="field status"><span class="label">Status</span><span class="value">Active</span></div>'), SL.current_team.has("user_count") && t.append('<div class="field active-users"><span class="label" data-tooltip="The current number of users that you have invited to the team." data-tooltip-maxwidth="260">Team members</span><span class="value">' + SL.current_team.get("user_count") + "</span></div>"), this.data.has("subscription.period") && t.append('<div class="field period"><span class="label">Billing period</span><span class="value">' + ("year" === this.data.get("subscription.period") ? "Yearly" : "Monthly") + "</span></div>"), this.data.has("active_card") && t.append('<div class="field card"><span class="label">Card</span><span class="value">' + this.DOTTED_CARD_PREFIX + this.data.get("active_card.last4") + "</span></div>"), this.data.has("subscription")) {
                var i = moment.unix(this.data.getNextInvoiceDate()).format("MMMM Do, YYYY"), s = n ? "First invoice" : "Next invoice", o = "$" + this.data.getNextInvoiceSum();
                t.append('<div class="field payment-cycle"><span class="label">' + s + '</span><span class="value">' + o + " on " + i + "</span></div>")
            }
            t.append('<footer class="actions"><a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_CARD + '">Change credit card</a><button class="button s negative outline cancel-subscription ladda-button" data-style="expand-right" data-spinner-color="#222">' + this.strings.CONFIRM_UNSUBSCRIBE_ACTION + "</button></footer>"), this.data.get("can_change_period") && t.find(".actions").prepend('<a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_PERIOD + '">Change billing period</a>')
        } else {
            var r = moment.unix(this.data.get("subscription.current_period_end")).format("MMM Do, YYYY");
            t.append('<div class="field status"><span class="label">Status</span><span class="value">Canceled, available until ' + r + "</span></div>")
        }
        this.cancelButton = $(".billing-details .cancel-subscription"), this.cancelButton.length && (this.cancelButton.on("click", this.onCancelSubscriptionClicked.bind(this)), this.cancelLoader = Ladda.create(this.cancelButton.get(0)))
    },onCancelSubscriptionSuccess: function() {
        SL.notify("Subscription canceled"), window.location = "http://slides.com"
    }}), SL("views.teams.teams").Edit = SL.views.Base.extend({init: function() {
        this._super(), this.render()
    },render: function() {
        if (this.formElement = $("form"), this.formElement.length) {
            this.formElement.find(".unit[data-factory]").each(function(t, e) {
                var n = null;
                $(e).attr("data-factory").split(".").forEach(function(t) {
                    n = n ? n[t] : window[t]
                }), "function" == typeof n && new n(e)
            }), this.formElement.find(".unit[data-validate]:not([data-factory])").each(function(t, e) {
                new SL.components.FormUnit(e)
            });
            var t = this.formElement.find("button[type=submit]");
            if (t.length) {
                var e = Ladda.create(t.get(0));
                this.formElement.on("submit", function(t) {
                    t.isDefaultPrevented() || e.start()
                }.bind(this))
            }
        }
    }}), SL("views.teams.teams").EditMembers = SL.views.Base.extend({init: function() {
        this._super(), this.domElement = $("section.users"), this.load()
    },bindLadda: function() {
        $(".column section .ladda-button").each(function(t, e) {
            e = $(e), e.data("ladda") || e.data("ladda", Ladda.create(e.get(0)))
        })
    },load: function() {
        $.ajax({type: "GET",url: SL.config.AJAX_ORGANIZATION_MEMBERS_LIST,context: this}).done(function(t) {
            this.userData = new SL.models.Collection, this.userLimit = t.max, t.results.forEach(function(t) {
                this.userData.push(new SL.models.User(t))
            }.bind(this))
        }).fail(function() {
            SL.notify(SL.locale.get("ORG_USERS_LIST_LOAD_ERROR"), "negative")
        }).always(this.render)
    },render: function() {
        var t = this.domElement.find(".contents");
        t.empty(), this.renderTable(t), this.renderInviteForm(t), this.syncInviteForm()
    },renderTable: function(t) {
        if (this.userData.isEmpty())
            t.html('<p class="empty-notice">' + SL.locale.get("ORG_USERS_LIST_EMPTY") + "</p>");
        else {
            var e = $('<table class="sl-table">').appendTo(t);
            e.append('<tr><th class="name">Name</th><th class="username">Username</th><th class="email">Email</th><th class="actions">Actions</th></tr>'), this.userData.forEach(this.renderUser.bind(this))
        }
    },renderInviteForm: function(t) {
        var e = $('<form class="create-user-form"><h4>Add a user to this team</h4><div class="unit text" data-validate="email" data-required><input type="text" placeholder="Email" name="email" size="35"></div><div class="unit text" data-validate="username" data-required><input type="text" placeholder="Username" name="username"></div><button type="submit" class="button positive l ladda-button create-user" data-style="zoom-out">Add</button></form>').appendTo(t), n = e.find("[name=email]"), i = e.find("[name=username]");
        e.find(".unit[data-validate]").each(function(t, e) {
            new SL.components.FormUnit(e)
        }), e.on("submit", function(t) {
            return this.createUser(), t.preventDefault(), !1
        }.bind(this)), n.on("blur", function() {
            var t = n.val(), e = i.val();
            e || 0 !== SL.util.validate.email(t).length || i.val(SL.util.string.slug(t.slice(0, t.indexOf("@"))))
        }.bind(this)), this.bindLadda()
    },renderUser: function(t) {
        var e = $("<tr>"), n = '<div class="avatar" style="background-image: url(' + t.thumbnail_url + ')"></div>';
        if (e.append("<td>" + n + (t.name || "N/A") + "</td>"), e.append('<td><a href="/' + t.username + '" target="_blank">' + t.username + "</a></td>"), e.append("<td>" + t.email + "</td>"), SL.current_user.username && SL.current_user.username !== t.username) {
            var i = $("<td>");
            i.append('<button class="button outline ladda-button remove-user" data-style="zoom-out" data-spinner-color="#222" data-tooltip="Remove this user from the team"><span class="i-trash-stroke"></span></button>'), t.registered || (i.append('<button class="button outline ladda-button welcome-user" data-style="zoom-out" data-spinner-color="#222" data-tooltip="Re-send invite email"><span class="i-mail"></span></button>'), e.addClass("disabled")), e.append(i), e.find(".welcome-user").on("click", function(n) {
                this.welcomeUser(n, t, e)
            }.bind(this)), e.find(".remove-user").on("click", function(n) {
                this.removeUser(n, t, e)
            }.bind(this))
        } else
            e.append("<td></td>");
        e.appendTo(this.domElement.find("table")), this.bindLadda()
    },syncInviteForm: function() {
        $(".team-is-full-notice").remove(), this.isTeamFull() && $(".create-user-form").append('<div class="team-is-full-notice"><h4>This team is full</h4><p>To add new members please <a href="mailto:support@slides.com" data-feedback-mode="contact" data-feedback-screenshot_enabled="false">contact support</a>.</p></div>')
    },createUser: function() {
        if (this.isTeamFull())
            return SL.notify("Your team is full, please contact support"), !1;
        var t = $(".create-user-form"), e = t.find("button.create-user").data("ladda");
        e && e.start(), $.ajax({type: "POST",url: SL.config.AJAX_ORGANIZATION_MEMBER_CREATE,data: {user: {email: t.find("[name=email]").val(),username: t.find("[name=username]").val()}},dataType: "json",context: this}).done(function(n) {
            var i = new SL.models.User(n);
            this.userData.isEmpty() ? (this.userData.push(i), this.render()) : (this.userData.push(i), this.renderUser(i)), t.find("[name=email]").val(""), t.find("[name=username]").val(""), this.syncInviteForm(), e && e.stop(), SL.notify(SL.locale.get("ORG_USERS_INVITE_SEND_SUCCESS"))
        }).fail(function(t) {
            t = $.parseJSON(t.responseText) || {}, e && e.stop(), "object" == typeof t.email && t.email.length ? SL.notify("Email error: " + t.email[0], "negative") : "object" == typeof t.username && t.username.length ? SL.notify("Username error: " + t.username[0], "negative") : SL.notify("Failed to add user", "negative")
        })
    },removeUser: function(t, e, n) {
        SL.prompt({anchor: $(t.currentTarget),title: SL.locale.get("ORG_USERS_REMOVE_CONFIRM", {name: e.name || e.username}),type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        var t = n.find(".remove-user").data("ladda");
                        t && t.start(), $.ajax({type: "DELETE",url: SL.config.AJAX_ORGANIZATION_MEMBER_DELETE(e.id),context: this}).done(function() {
                            n.remove(), this.userData.removeByProperties({id: e.id}), this.syncInviteForm(), t && t.stop(), SL.notify(SL.locale.get("ORG_USERS_REMOVE_SUCCESS"))
                        }).fail(function() {
                            t && t.stop(), SL.notify(SL.locale.get("ORG_USERS_REMOVE_ERROR"), "negative")
                        })
                    }.bind(this)}]})
    },welcomeUser: function(t, e, n) {
        var i = n.find(".welcome-user").data("ladda");
        i && i.start(), $.ajax({type: "POST",url: SL.config.AJAX_ORGANIZATION_MEMBER_WELCOME(e.id),context: this}).done(function() {
            i && i.stop(), SL.notify(SL.locale.get("ORG_USERS_INVITE_SEND_SUCCESS"))
        }).fail(function() {
            i && i.stop(), SL.notify(SL.locale.get("ORG_USERS_INVITE_SEND_ERROR"), "negative")
        })
    },isTeamFull: function() {
        return this.userLimit > 0 && this.userData.size() >= this.userLimit
    }}), SL("views.teams.teams").Show = SL.views.Base.extend({init: function() {
        this._super(), new SL.components.Search({url: SL.config.AJAX_SEARCH_ORGANIZATION})
    }}), SL("views.themes").Edit = SL.views.Base.extend({init: function() {
        this._super(), this.themeData = new SL.models.Collection, this.listElement = $(".theme-list"), this.editorElement = $(".theme-editor"), this.editorInnerElement = $(".theme-editor-inner"), this.VERSION = parseInt($(".theme-editor").attr("data-editor-version"), 10), this.load(), this.bindLadda(), this.setupPreview(), $("body").on("click", ".create-theme-button", this.onCreateThemeClicked.bind(this)), $(window).on("beforeunload", this.onWindowBeforeUnload.bind(this))
    },bindLadda: function() {
        $(".page-wrapper .ladda-button").each(function(t, e) {
            e = $(e), e.data("ladda") || e.data("ladda", Ladda.create(e.get(0)))
        })
    },setupPreview: function() {
        this.previewFrame = $(".preview .preview-frame"), this.previewReloader = $(".preview .preview-reloader"), this.previewReloader.on("click", this.reloadPreview.bind(this)), window.addEventListener("message", function(t) {
            t.data && "theme-preview-ready" === t.data.type && this.refreshPreview()
        }.bind(this))
    },load: function() {
        SL.helpers.PageLoader.show("Loading themes..."), $.ajax({type: "GET",url: SL.config.AJAX_THEMES_LIST,context: this}).done(function(t) {
            this.themeData.clear(), t.results.forEach(function(t) {
                this.themeData.push(new SL.models.Theme(t))
            }.bind(this))
        }).fail(function() {
            SL.notify(SL.locale.get("THEME_LIST_LOAD_ERROR"), "negative")
        }).always(function() {
            this.renderList(), SL.helpers.PageLoader.hide()
        })
    },renderList: function() {
        this.listElement.empty(), this.themeData.isEmpty() ? this.listElement.html('<p class="theme-list-empty">' + SL.locale.get("THEME_LIST_EMPTY") + "</p>") : (this.themeData.forEach(this.renderListItem.bind(this)), SL.view.parseTimes()), this.updateListDefault()
    },renderListItem: function(t) {
        var e = this.listElement.find('[data-theme-id="' + t.get("id") + '"]');
        if (e.length ? e.find(".theme-list-item-title").text(t.get("name")).attr("title", t.get("name")) : (e = $(['<div class="theme-list-item" data-theme-id="' + t.get("id") + '">', '<div class="theme-list-item-thumbnail"></div>', '<h2 class="theme-list-item-title" title="' + t.get("name") + '">' + t.get("name") + "</h2>", '<div class="theme-list-item-metadata">', '<div class="theme-list-item-metadata-field">Created <time class="date" datetime="' + t.get("created_at") + '"></time></div>', '<div class="theme-list-item-metadata-field">Updated <time class="ago" datetime="' + t.get("updated_at") + '"></time></div>', "</div>", '<div class="theme-list-item-controls">', '<button class="button outline l delete" data-tooltip="' + SL.locale.get("THEME_DELETE_TOOLTIP") + '">', '<span class="icon i-trash-stroke"></span>', "</button>", '<button class="button outline l edit" data-tooltip="' + SL.locale.get("THEME_EDIT_TOOLTIP") + '">', '<span class="icon i-pen-alt2"></span>', "</button>", '<button class="button outline l default" data-tooltip="' + SL.locale.get("THEME_MAKE_DEFAULT_TOOLTIP") + '">', '<span class="icon i-checkmark"></span>', "</button>", "</div>", "</div>"].join("")), e.prependTo(this.listElement)), t.hasThumbnail()) {
            var n = t.get("thumbnail_url");
            e.find(".theme-list-item-thumbnail").css("background-image", 'url("' + n + '")').attr("data-thumb-url", n)
        }
        return e.off("click").on("click", function(n) {
            $(n.target).closest(".theme-list-item-controls .delete").length ? this.removeTheme(t, null, $(n.target).closest(".theme-list-item-controls .delete")) : $(n.target).closest(".theme-list-item-controls .default").length ? e.hasClass("default") ? this.unmakeDefaultTheme() : this.makeDefaultTheme(t) : this.editTheme(t)
        }.bind(this)), e
    },refreshListItemThumb: function(t) {
        if (t && t.length) {
            var e = t.find(".theme-list-item-thumbnail"), n = e.attr("data-thumb-url");
            n && (n = n + "?" + Math.round(1e4 * Math.random()), e.css("background-image", 'url("' + n + '")'))
        }
    },updateListDefault: function() {
        this.listElement.find(".theme-list-item").each(function(t, e) {
            e = $(e), e.toggleClass("default", e.attr("data-theme-id") == SL.current_team.get("default_theme_id")), e.find(".theme-list-item-controls .default").attr("data-tooltip", SL.locale.get(e.hasClass("default") ? "THEME_IS_DEFAULT_TOOLTIP" : "THEME_MAKE_DEFAULT_TOOLTIP"))
        })
    },editTheme: function(t) {
        if (this.panel)
            return this.panel.close(function() {
                this.editTheme(t)
            }.bind(this)), !1;
        $("html").addClass("panel-open");
        var e = {};
        e = 1 === this.VERSION ? {colors: SL.config.V1.THEME_COLORS,fonts: SL.config.V1.THEME_FONTS,center: !0,rollingLinks: !0} : {colors: SL.config.THEME_COLORS,fonts: SL.config.THEME_FONTS,center: !1,rollingLinks: !1}, this.panel = new SL.views.themes.edit.Panel(this, t, e), this.panel.destroyed.add(function() {
            this.setSelectedListItem(null), $("html").removeClass("panel-open"), this.panel = null
        }.bind(this)), this.setSelectedListItem(t), this.bindLadda()
    },createTheme: function() {
        $.ajax({type: "POST",url: SL.config.AJAX_THEMES_CREATE,data: {theme: {font: SL.config.DEFAULT_THEME_FONT,color: SL.config.DEFAULT_THEME_COLOR,transition: SL.config.DEFAULT_THEME_TRANSITION,background_transition: SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION}},context: this}).done(function(t) {
            var e = new SL.models.Theme(t);
            this.themeData.isEmpty() ? (this.themeData.push(e), this.renderList(), this.makeDefaultTheme(e, null, !0)) : (this.themeData.push(e), this.renderListItem(e), SL.view.parseTimes()), this.editTheme(e)
        }).fail(function() {
            SL.notify(SL.locale.get("THEME_CREATE_ERROR"), "negative")
        })
    },saveTheme: function(t, e) {
        $.ajax({type: "PUT",url: SL.config.AJAX_THEMES_UPDATE(t.get("id")),data: {theme: t.toJSON()},context: this}).done(function(t) {
            var n = this.renderListItem(new SL.models.Theme(t));
            SL.view.parseTimes(), t && t.sanitize_messages && t.sanitize_messages.length ? SL.notify(t.sanitize_messages[0], "negative") : SL.notify(SL.locale.get("THEME_SAVE_SUCCESS")), SL.util.callback(e), setTimeout(function() {
                this.refreshListItemThumb(n)
            }.bind(this), 2500), setTimeout(function() {
                this.refreshListItemThumb(n)
            }.bind(this), 5e3)
        }).fail(function() {
            SL.notify(SL.locale.get("THEME_SAVE_ERROR"), "negative")
        })
    },removeTheme: function(t, e, n) {
        var i = this.getListItem(t);
        SL.prompt({anchor: n,title: SL.locale.get("THEME_REMOVE_CONFIRM"),type: "select",offsetX: 15,data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        var n = t.get("id");
                        $.ajax({type: "DELETE",url: SL.config.AJAX_THEMES_DELETE(n),context: this}).done(function() {
                            SL.util.anim.collapseListItem(i, function() {
                                i.remove()
                            }), SL.util.callback(e), this.themeData.removeByProperties({id: n}), this.panel && this.panel.getTheme().get("id") === n && this.panel.destroy(), SL.notify(SL.locale.get("THEME_REMOVE_SUCCESS"))
                        }).fail(function() {
                            SL.notify(SL.locale.get("THEME_REMOVE_ERROR"), "negative")
                        })
                    }.bind(this)}]})
    },makeDefaultTheme: function(t, e, n) {
        $.ajax({type: "PUT",url: SL.config.AJAX_UPDATE_ORGANIZATION,data: {team: {default_theme_id: t.get("id")}},context: this}).done(function() {
            SL.current_team.set("default_theme_id", t.get("id")), this.updateListDefault(), n || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_SUCCESS")), SL.util.callback(e)
        }).fail(function() {
            n || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_ERROR"), "negative")
        })
    },unmakeDefaultTheme: function(t, e) {
        $.ajax({type: "PUT",url: SL.config.AJAX_UPDATE_ORGANIZATION,data: {team: {default_theme_id: null}},context: this}).done(function() {
            SL.current_team.set("default_theme_id", null), this.updateListDefault(), e || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_SUCCESS")), SL.util.callback(t)
        }).fail(function() {
            e || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_ERROR"), "negative")
        })
    },getListItem: function(t) {
        return this.listElement.find('[data-theme-id="' + (t ? t.get("id") : null) + '"]')
    },setSelectedListItem: function(t) {
        this.listElement.find(".theme-list-item").removeClass("selected");
        var e = this.getListItem(t);
        e.length && e.addClass("selected")
    },refreshPreview: function(t) {
        t = t || this.previewTheme;
        var e = this.getPreviewWindow();
        e && t && (e.SL && e.SL.helpers && e.SL.helpers.ThemeController.paint(t, {center: 1 === this.VERSION}), this.previewTheme = t)
    },reloadPreview: function() {
        var t = this.getPreviewWindow();
        t && t.location.reload()
    },getPreviewWindow: function() {
        return this.previewFrame.length ? this.previewFrame.get(0).contentWindow : null
    },onWindowBeforeUnload: function() {
        return this.panel && this.panel.hasUnsavedChanges() ? SL.locale.get("LEAVE_UNSAVED_THEME") : void 0
    },onCreateThemeClicked: function(t) {
        t.preventDefault(), this.createTheme()
    }}), SL("views.themes.edit.pages").Palette = Class.extend({init: function(t, e) {
        this.editor = t, this.theme = e, this.changed = new signals.Signal, this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this), this.onListItemDelete = this.onListItemDelete.bind(this), this.onListItemMouseDown = this.onListItemMouseDown.bind(this), this.render(), this.bind()
    },render: function() {
        this.domElement = $('<div class="page" data-page-id="palette">'), this.domElement.html(['<div class="page-header">', "<h4>Color Palette</h4>", '<p>Replace the default color options that we offer throughout the deck editor with your own custom color palette. <a class="documentation-link" href="#">More info</a></p>', '<div class="documentation">', "<p>A color picker component appears in multiple places inside of the deck editor, such as when setting text or slide background color. Inside of that color picker we display a preset color palette. If you define a custom color palette here anyone using this theme will see your custom palette instead of our defaults.</p>", "<h5>Reset</h5>", "<p>If no custom colors are added here we'll show our default palette. Colors can be deleted by clicking the trash icon that appears when hovering over them with your mouse pointer.</p>", "<h5>Rearrange</h5>", "<p>Drag and drop colors in your palette to change their order.</p>", "</div>", "</div>", '<div class="page-body">', '<div class="palette-picker">', '<div class="palette-picker-api"></div>', "</div>", '<ul class="palette-list"></ul>', "</div>"].join("")), this.innerElement = this.domElement.find(".page-body"), this.pickerElement = this.domElement.find(".palette-picker"), this.pickerAPIElement = this.domElement.find(".palette-picker-api"), this.listElement = this.domElement.find(".palette-list"), this.documentationLinkElement = this.domElement.find(".page-header .documentation-link"), this.documentationElement = this.domElement.find(".page-header .documentation"), this.documentationElement.hide(), this.renderPicker(), this.renderList(), this.checkIfEmpty()
    },renderPicker: function() {
        this.pickerAPIElement.spectrum({flat: !0,showInput: !0,showButtons: !1,showInitial: !1,showPalette: !1,showSelectionPalette: !1,preferredFormat: "hex",className: "palette-picker-spectrum",move: function(t) {
                this.setPreviewColor(t.toHexString())
            }.bind(this),change: function(t) {
                this.setPreviewColor(t.toHexString())
            }.bind(this)}), this.domElement.find(".palette-picker-spectrum .sp-input-container").append('<div class="palette-picker-save-button"><span class="icon i-plus"></span>Save color</div>'), this.pickerSaveButton = this.domElement.find(".palette-picker-save-button")
    },renderList: function() {
        this.listElement.empty(), this.theme.get("palette").forEach(this.renderListItem.bind(this))
    },renderListItem: function(t) {
        var e = $('<li class="palette-list-item sl-form">');
        return e.data("color", t), e.html(['<div class="palette-list-item-color"></div>', '<div class="palette-list-item-label">' + t + "</div>", '<div class="palette-list-item-delete"><span class="icon i-trash-stroke"></span></div>'].join("")), e.appendTo(this.listElement), e.toggleClass("is-light", tinycolor(t).isLight()), e.find(".palette-list-item-color").css("background-color", t), e.find(".palette-list-item-delete").on("click", this.onListItemDelete), e.on("mousedown", this.onListItemMouseDown), e
    },bind: function() {
        this.documentationLinkElement.on("click", this.onDocumentationLinkClicked.bind(this)), this.pickerSaveButton.on("click", this.onSaveButtonClicked.bind(this))
    },appendTo: function(t) {
        this.domElement.appendTo(t)
    },setPreviewColor: function(t) {
        this.pickerSaveButton.css({color: tinycolor(t).isLight() ? "#222222" : "#ffffff",backgroundColor: t})
    },checkIfEmpty: function() {
        0 === this.listElement.find(".palette-list-item").length ? this.listElement.append('<span class="palette-list-empty">No custom colors have been added</span>') : this.listElement.find(".palette-list-empty").remove()
    },refresh: function() {
        this.pickerAPIElement.spectrum("set", "#000000"), this.pickerAPIElement.spectrum("reflow"), this.setPreviewColor("#000000")
    },persist: function() {
        var t = this.listElement.find(".palette-list-item:not(.element)").map(function() {
            return $(this).data("color")
        }).toArray();
        this.theme.set("palette", t), this.checkIfEmpty(), this.changed.dispatch()
    },destroy: function() {
        this.changed.dispose(), this.listElement.find(".palette-list-item").off(), this.editor = null, this.theme = null
    },onDocumentationLinkClicked: function(t) {
        t.preventDefault(), this.documentationElement.toggle(), this.documentationLinkElement.text(this.documentationElement.is(":visible") ? "Less info" : "More info")
    },onSaveButtonClicked: function() {
        var t = this.renderListItem(this.pickerAPIElement.spectrum("get"));
        this.listElement.prepend(t), this.persist()
    },onListItemDelete: function(t) {
        var e = $(t.target).closest(".palette-list-item");
        e.length ? (e.remove(), this.persist()) : SL.notify("An error occured while deleting this color")
    },onListItemMouseDown: function(t) {
        var e = $(t.currentTarget);
        e.length && e.is(".palette-list-item") && 0 === $(t.target).closest(".palette-list-item-delete").length && (this.dragTarget = e, this.dragGhost = e.clone().appendTo(this.listElement), this.dragGhost.addClass("drag-ghost"), this.dragTarget.addClass("drag-target"), this.dragOffsetX = t.clientX - this.dragTarget.offset().left, this.dragOffsetY = t.clientY - this.dragTarget.offset().top, this.listOffsetX = this.listElement.offset().left, this.listOffsetY = this.listElement.offset().top, this.listWidth = this.listElement.width(), this.listHeight = this.listElement.height(), this.listItemSize = this.dragTarget.outerHeight(), this.listItemCols = Math.floor(this.listWidth / this.listItemSize), $(document).on("mousemove", this.onDocumentMouseMove), $(document).on("mouseup", this.onDocumentMouseUp), this.onDocumentMouseMove(t))
    },onDocumentMouseMove: function(t) {
        t.preventDefault();
        var e = this.listElement.find(".palette-list-item"), n = t.clientX - this.listOffsetX - this.dragOffsetX, i = t.clientY - this.listOffsetY - this.dragOffsetY;
        n = Math.max(Math.min(n, this.listWidth - this.listItemSize), 0), i = Math.max(Math.min(i, this.listHeight - this.listItemSize), 0), this.dragGhost.css({left: n,top: i});
        var s = Math.round(n / this.listItemSize), o = Math.round(i / this.listItemSize);
        s = Math.max(Math.min(s, this.listItemCols), 0), o = Math.max(Math.min(o, e.length), 0);
        var r = o * this.listItemCols + s, a = $(e[r]);
        a.is(this.dragTarget) || (this.dragTarget.index() > r ? a.before(this.dragTarget) : a.after(this.dragTarget))
    },onDocumentMouseUp: function() {
        this.dragTarget.removeClass("drag-target"), this.dragGhost.remove(), $(document).off("mousemove", this.onDocumentMouseMove), $(document).off("mouseup", this.onDocumentMouseUp), this.persist()
    }}), SL("views.themes.edit.pages").Snippets = Class.extend({init: function(t, e) {
        this.editor = t, this.theme = e, this.changed = new signals.Signal, this.render(), this.bind(), this.syncMoveButtons()
    },render: function() {
        this.domElement = $('<div class="page" data-page-id="snippets">'), this.domElement.html(['<div class="page-header">', "<h4>Snippets</h4>", '<p>Snippets are small HTML templates that your team members can use as building blocks when creating decks. These templates can contain placeholder variables that are filled out at the time of insertion. <a class="documentation-link" href="#">More info</a></p>', '<div class="documentation">', "<p>Each snippet consist of two values; title and template. The title is what we'll show your teammates so try to keep it descriptive. The template is where you enter your custom HTML.</p>", "<h5>Variables</h5>", "<p>If you add placeholder variables inside of your templates the user will be prompted to fill them out. The syntax for variables is as follows:</p>", "<pre><code>{{Label Value}}</code></pre>", "<p>The string between the opening and closing brackets is considered the variable name. This name is shown when the snippet is inserted so that the author knows what value you're expecting.</p>", "<p>It's possible to define default values for variables. To do so you'll need to delimit your variable name and default value by two colon characters as shown below.</p>", "<pre><code>{{Label Value::Default value}}</code></pre>", "<h5>Example</h5>", "<p>Here's a basic example template that shows how you could create a snippet for images with captions.</p>", "<pre><code>", '&lt;div class="image-with-caption"&gt;\n', '  &lt;img src="{{Image URL}}"&gt;\n', "  &lt;p&gt;{{Caption::Untitled}}&lt;/p&gt;\n", "&lt;/div&gt;", "</code></pre>", "</div>", "</div>", '<div class="page-body">', '<ul class="snippet-list"></ul>', '<ul class="snippet-controls snippet-list-item sl-form">', '<div class="add-button-wrapper">', '<button class="button l add-button">Add Snippet <span class="icon i-plus"></span></button>', "</div>", '<div class="unit text">', "<label>Title</label>", '<input class="title-value" maxlength="200" type="text" readonly>', "</div>", '<div class="unit text">', "<label>Template</label>", '<textarea class="template-value" rows="4" readonly></textarea>', "</div>", "</ul>", "</div>"].join("")), this.innerElement = this.domElement.find(".page-body"), this.listElement = this.domElement.find(".snippet-list"), this.controlsElement = this.domElement.find(".snippet-controls"), this.addButton = this.domElement.find(".snippet-controls .add-button-wrapper"), this.documentationLinkElement = this.domElement.find(".page-header .documentation-link"), this.documentationElement = this.domElement.find(".page-header .documentation"), this.documentationElement.hide(), this.renderList()
    },renderList: function() {
        this.listElement.empty(), this.theme.get("snippets").forEach(this.renderListItem.bind(this))
    },renderListItem: function(t) {
        var e = $('<li class="snippet-list-item sl-form">');
        return e.html(['<div class="unit text">', "<label>Title</label>", '<input class="title-value" maxlength="200" value="' + t.get("title") + '" type="text" spellcheck="false">', "</div>", '<div class="unit text">', "<label>Template</label>", '<textarea class="template-value" rows="4" spellcheck="false">' + t.get("template") + "</textarea>", '<div class="status" data-tooltip="" data-tooltip-maxwidth="400" data-tooltip-align="left"><span class="icon i-info"></span></div>', "</div>", '<div class="snippet-list-item-footer">', '<button class="button outline delete-button" data-tooltip="Delete" data-tooltip-delay="1000"><snap class="icon i-trash-stroke"></snap></button>', '<button class="button outline preview-button" data-tooltip="Preview" data-tooltip-delay="1000"><snap class="icon i-eye"></snap></button>', '<button class="button outline move-up-button" data-tooltip="Move Up" data-tooltip-delay="1000"><snap class="icon i-arrow-up"></snap></button>', '<button class="button outline move-down-button" data-tooltip="Move Down" data-tooltip-delay="1000"><snap class="icon i-arrow-down"></snap></button>', "</div>"].join("")), e.appendTo(this.listElement), e.data("model", t), e.find("input, textarea").on("input", this.onSnippetChange.bind(this)), e.find("input, textarea").on("focus", this.onSnippetFocused.bind(this)), e.find(".delete-button").on("click", this.onSnippetDelete.bind(this)), e.find(".preview-button").on("click", this.onSnippetFocused.bind(this)), e.find(".move-up-button").on("click", this.onSnippetMoveUp.bind(this)), e.find(".move-down-button").on("click", this.onSnippetMoveDown.bind(this)), this.validateSnippet(e), e
    },bind: function() {
        this.addButton.on("click", this.addSnippet.bind(this)), this.documentationLinkElement.on("click", this.onDocumentationLinkClicked.bind(this))
    },appendTo: function(t) {
        this.domElement.appendTo(t), this.listElement.find(".snippet-list-item").each(function(t, e) {
            this.layoutSnippet($(e))
        }.bind(this))
    },addSnippet: function() {
        var t = this.theme.get("snippets").create(), e = this.renderListItem(t);
        e.data("model", t), e.find("input").first().focus(), setTimeout(function() {
            var t = this.domElement.prop("scrollHeight");
            t -= this.domElement.outerHeight(!0), t -= this.controlsElement.outerHeight(!0), this.domElement.scrollTop(t)
        }.bind(this), 1), this.changed.dispatch(), this.syncMoveButtons()
    },layoutSnippet: function(t) {
        var e = t.find(".template-value");
        e.attr("rows", 4);
        var n = parseFloat(e.css("line-height")), i = e.prop("scrollHeight"), s = e.prop("clientHeight");
        i > s && e.attr("rows", Math.min(Math.ceil(i / n), 10))
    },validateSnippet: function(t) {
        var e = t.data("model"), n = [], i = [], s = e.templateHasVariables(), o = e.templateHasSelection();
        if (s && o)
            i.push("Templates can not mix variables and selection tags.");
        else if (s) {
            var r = e.getTemplateVariables();
            n.push("Found " + r.length + " variables:"), r.forEach(function(t) {
                n.push(t.defaultValue ? "- " + t.label + " (default: " + t.defaultValue + ")" : "- " + t.label)
            })
        }
        i.length ? t.find(".status").addClass("negative").show().attr("data-tooltip", i.join("<br>")) : n.length ? t.find(".status").removeClass("negative").show().attr("data-tooltip", n.join("<br>")) : t.find(".status").removeClass("negative").hide()
    },previewSnippet: function(t) {
        var e = this.editor.getPreviewWindow(), n = e.$("#snippet-slide");
        0 === n.length && (n = $('<section id="snippet-slide">').appendTo(e.$(".reveal .slides"))), n.html(['<div class="sl-block" data-block-type="html" style="width: 100%; left: 0; top: 0; height: auto;">', '<div class="sl-block-content">', t.templatize(t.getTemplateVariables()), "</div>", "</div>"].join("")), e.SL.util.skipCSSTransitions(), e.Reveal.sync(), e.Reveal.slide(n.index())
    },syncSnippetOrder: function() {
        var t = this.listElement.find(".snippet-list-item"), e = this.theme.get("snippets");
        t.sort(function(t, n) {
            var i = e.find($(t).data("model")), s = e.find($(n).data("model"));
            return i - s
        }.bind(this)), t.each(function(t, e) {
            this.listElement.append(e)
        }.bind(this)), this.syncMoveButtons()
    },syncMoveButtons: function() {
        this.listElement.find(".snippet-list-item").each(function(t, e) {
            e = $(e), e.find(".move-up-button").toggleClass("disabled", e.is(":first-child")), e.find(".move-down-button").toggleClass("disabled", e.is(":last-child"))
        })
    },destroy: function() {
        this.changed.dispose(), this.listElement.find(".snippet-list-item").off().removeData("model");
        var t = this.editor.getPreviewWindow();
        t.$("#snippet-slide").remove(), t.Reveal.sync(), t.Reveal.slide(0), this.editor = null, this.theme = null
    },onDocumentationLinkClicked: function(t) {
        t.preventDefault(), this.documentationElement.toggle(), this.documentationLinkElement.text(this.documentationElement.is(":visible") ? "Less info" : "More info")
    },onSnippetFocused: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        e.length && this.previewSnippet(e.data("model"))
    },onSnippetChange: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.find(".title-value").val(), i = e.find(".template-value").val(), s = SL.util.html.findScriptTags(i);
            if (s.length > 0)
                return SL.notify("Scripts are not allowed. Please remove all script tags for this snippet to save.", "negative"), !1;
            var o = e.data("model");
            o.set("title", n), o.set("template", i), this.layoutSnippet(e), this.validateSnippet(e), this.previewSnippet(o), this.changed.dispatch()
        }
    },onSnippetDelete: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.data("model");
            n ? SL.prompt({anchor: $(t.currentTarget),title: SL.locale.get("THEME_SNIPPET_DELETE_CONFIRM"),type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Remove</h3>",selected: !0,className: "negative",callback: function() {
                            SL.util.anim.collapseListItem(e, function() {
                                e.remove(), this.syncMoveButtons()
                            }.bind(this));
                            var t = this.theme.get("snippets");
                            t.remove(e.data("model")), this.changed.dispatch()
                        }.bind(this)}]}) : SL.notify("An error occured while deleting this snippet")
        } else
            SL.notify("An error occured while deleting this snippet")
    },onSnippetMoveUp: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.data("model");
            if (n) {
                var i = this.theme.get("snippets");
                i.shiftLeft(i.find(n)), this.changed.dispatch(), this.syncSnippetOrder()
            }
        }
    },onSnippetMoveDown: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.data("model");
            if (n) {
                var i = this.theme.get("snippets");
                i.shiftRight(i.find(n)), this.changed.dispatch(), this.syncSnippetOrder()
            }
        }
    }}), SL("views.themes.edit").Panel = Class.extend({PAGES: [{name: "Settings",id: "settings",factory: "renderSettings"}, {name: "CSS",id: "css",factory: "renderCSS"}, {name: "HTML",id: "html",factory: "renderHTML"}, {name: "JS",id: "js",factory: "renderJS",condition: function() {
                return SL.current_team.get("allow_scripts")
            }}, {name: "Palette",id: "palette",factory: "renderPalette",condition: function() {
                return this.editor.VERSION > 1
            }}, {name: "Snippets",id: "snippets",factory: "renderSnippets"}],init: function(t, e, n) {
        this.editor = t, this.theme = e.clone(), this.themeOptionsConfig = n, this.previewTimeout = -1, this.destroyed = new signals.Signal, this.updatePreview = this.updatePreview.bind(this), this.paintPreview = this.paintPreview.bind(this), this.render(), this.bind(), this.showPage("settings"), this.paintPreview(), this.savedJSON = JSON.stringify(this.theme.toJSON()), this.checkUnsavedChanges()
    },render: function() {
        this.domElement = $('<div class="panel">'), this.domElement.appendTo(this.editor.editorInnerElement), this.pagesElement = $('<div class="pages">'), this.pagesElement.appendTo(this.domElement), this.renderHeader(), this.renderPages()
    },renderHeader: function() {
        this.headerElement = $('<header class="panel-header">').appendTo(this.domElement), this.tabsElement = $('<div class="page-tabs">').appendTo(this.headerElement), this.cancelButton = $('<button class="button l grey cancel-button">Close</button>').appendTo(this.headerElement), this.saveButton = $('<button class="button l positive save-button ladda-button" data-style="zoom-out">Save</button>').appendTo(this.headerElement), this.onSaveClicked = this.onSaveClicked.bind(this), this.onCancelClicked = this.onCancelClicked.bind(this), this.saveButton.on("click", this.onSaveClicked), this.cancelButton.on("click", this.onCancelClicked)
    },renderPages: function() {
        this.PAGES.forEach(function(t) {
            ("function" != typeof t.condition || t.condition.call(this)) && ($('<button class="page-tab" data-page-id="' + t.id + '">' + t.name + "</button>").on("click", this.showPage.bind(this, t.id)).appendTo(this.tabsElement), this[t.factory]())
        }.bind(this))
    },renderSettings: function() {
        this.settingsElement = $('<div class="page sl-form" data-page-id="settings">').appendTo(this.pagesElement), this.settingsElement.append('<div class="unit name" data-required><label for="">Name</label><input id="theme-name" placeholder="Theme name" type="text" value="' + (this.theme.get("name") || "Untitled") + '"></div>'), this.settingsElement.find("#theme-name").on("change", this.paintPreview), this.settingsElement.find("#theme-name").on("input", this.onNameInputChanged.bind(this)), this.renderThemeOptions()
    },renderThemeOptions: function() {
        var t = $.extend(this.themeOptionsConfig, {model: this.theme,container: this.settingsElement});
        "no-color" !== t.colors[t.colors.length - 1].id && t.colors.push({id: "no-color",tooltip: "Specifies as few color styles as possible, useful if you want to write custom CSS from the ground up."}), "no-font" !== t.fonts[t.fonts.length - 1].id && t.fonts.push({id: "no-font",title: "None",tooltip: "Specifies as few typographic styles as possible, useful if you want to write custom CSS from the ground up."}), this.themeOptions = new SL.components.ThemeOptions(t), this.themeOptions.changed.add(this.paintPreview)
    },renderCSS: function() {
        this.cssElement = $('<div class="page" data-page-id="css">').appendTo(this.pagesElement), this.cssElement.append('<div class="editor-wrapper"><div id="ace-less" class="editor"></div><div class="error"></div><div class="info" data-tooltip="' + SL.locale.get("THEME_CSS_DESCRIPTION") + '" data-tooltip-maxwidth="300" data-tooltip-align="left"><span class="icon i-info"></span></div></div>'), this.cssErrorElement = this.cssElement.find(".error");
        try {
            this.cssEditor = ace.edit("ace-less"), this.cssEditor.setTheme("ace/theme/monokai"), this.cssEditor.setDisplayIndentGuides(!0), this.cssEditor.setShowPrintMargin(!1), this.cssEditor.getSession().setMode("ace/mode/less"), this.cssEditor.env.document.setValue(this.theme.get("less") || ""), this.cssEditor.env.editor.on("change", this.onCSSInputChanged.bind(this)), this.syncCSS()
        } catch (t) {
            console.log("An error occurred while initializing the Ace CSS editor.")
        }
    },syncCSS: function() {
        var t, e = SL.util.string.getCustomClassesFromLESS(this.cssEditor.env.document.getValue());
        t = e.length ? "Found custom slide classes:<br>- " + e.join("<br>- ") + "<br><br>" + SL.locale.get("THEME_CSS_DESCRIPTION") : SL.locale.get("THEME_CSS_DESCRIPTION"), this.cssElement.find(".info").toggleClass("positive", e.length > 0), this.cssElement.find(".info").attr("data-tooltip", t)
    },renderHTML: function() {
        this.htmlElement = $('<div class="page" data-page-id="html">').appendTo(this.pagesElement), this.htmlElement.append('<div class="editor-wrapper"><div id="ace-html" class="editor"></div>', '<div class="info" data-tooltip="' + SL.locale.get("THEME_HTML_DESCRIPTION") + '" data-tooltip-maxwidth="300" data-tooltip-align="left"><span class="icon i-info"></span></div></div>');
        try {
            this.htmlEditor = ace.edit("ace-html"), this.htmlEditor.setTheme("ace/theme/monokai"), this.htmlEditor.setDisplayIndentGuides(!0), this.htmlEditor.setShowPrintMargin(!1), this.htmlEditor.getSession().setMode("ace/mode/html"), this.htmlEditor.env.document.setValue(this.theme.get("html") || ""), this.htmlEditor.env.editor.on("change", this.onHTMLInputChanged.bind(this))
        } catch (t) {
            console.log("An error occurred while initializing the Ace HTML editor.")
        }
    },renderJS: function() {
        this.jsElement = $('<div class="page" data-page-id="js">').appendTo(this.pagesElement), this.jsElement.append('<div class="editor-wrapper"><div id="ace-js" class="editor"></div>', '<div class="info" data-tooltip="' + SL.locale.get("THEME_JS_DESCRIPTION") + '" data-tooltip-maxwidth="300" data-tooltip-align="left"><span class="icon i-info"></span></div></div>');
        try {
            this.jsEditor = ace.edit("ace-js"), this.jsEditor.setTheme("ace/theme/monokai"), this.jsEditor.setDisplayIndentGuides(!0), this.jsEditor.setShowPrintMargin(!1), this.jsEditor.getSession().setMode("ace/mode/javascript"), this.jsEditor.env.document.setValue(this.theme.get("js") || ""), this.jsEditor.env.editor.on("change", this.onJSInputChanged.bind(this))
        } catch (t) {
            console.log("An error occurred while initializing the Ace JS editor.")
        }
    },renderPalette: function() {
        this.palette = new SL.views.themes.edit.pages.Palette(this.editor, this.theme), this.palette.appendTo(this.pagesElement), this.palette.changed.add(this.checkUnsavedChanges.bind(this))
    },renderSnippets: function() {
        this.snippets = new SL.views.themes.edit.pages.Snippets(this.editor, this.theme), this.snippets.appendTo(this.pagesElement), this.snippets.changed.add(this.checkUnsavedChanges.bind(this))
    },bind: function() {
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), $(document).on("keydown", this.onDocumentKeyDown)
    },showPage: function(t) {
        this.domElement.find(".page").removeClass("past present future"), this.domElement.find('.page[data-page-id="' + t + '"]').addClass("present"), this.domElement.find('.page[data-page-id="' + t + '"]').prevAll().addClass("past"), this.domElement.find('.page[data-page-id="' + t + '"]').nextAll().addClass("future"), this.domElement.find(".panel-header .page-tab").removeClass("selected"), this.domElement.find('.panel-header .page-tab[data-page-id="' + t + '"]').addClass("selected"), "css" === t && this.cssEditor ? this.cssEditor.focus() : "html" === t && this.htmlEditor ? this.htmlEditor.focus() : "js" === t && this.jsEditor ? this.jsEditor.focus() : "palette" === t && this.palette && this.palette.refresh(), setTimeout(function() {
            this.domElement.find(".page").addClass("transition")
        }.bind(this), 1), this.resetScrollPosition()
    },resetScrollPosition: function() {
        this.domElement.scrollLeft(0).scrollTop(0), this.settingsElement.scrollLeft(0).scrollTop(0)
    },updatePreview: function(t) {
        "number" != typeof t && (t = 250), clearTimeout(this.previewTimeout), this.previewTimeout = setTimeout(function() {
            this.paintPreview()
        }.bind(this), t)
    },paintPreview: function() {
        this.preprocess(function() {
            this.editor.refreshPreview(this.theme)
        }.bind(this), function() {
            this.editor.refreshPreview(this.theme)
        }.bind(this))
    },preprocess: function(t, e) {
        this.theme.set("name", this.domElement.find("#theme-name").val()), this.cssEditor && this.theme.set("less", this.cssEditor.env.document.getValue()), this.htmlEditor && this.theme.set("html", this.htmlEditor.env.document.getValue()), this.jsEditor && this.theme.set("js", this.jsEditor.env.document.getValue()), this.cssParser || (this.cssParser = new less.Parser);
        var n = this.cssEditor.env.document.getValue();
        n ? this.cssParser.parse(".reveal { " + n + " }", function(i, s) {
            if (i)
                this.cssErrorElement.addClass("visible"), this.cssErrorElement.html(i.message), SL.util.callback(e, i);
            else {
                this.cssErrorElement.removeClass("visible");
                try {
                    var o = s.toCSS()
                } catch (r) {
                    console.log(r)
                }
                if (o) {
                    var a = "";
                    o = o.replace(/@import url\(["'\s]*(http:|https:)?\/\/(.*)\);?/gi, function(t) {
                        return a += t + "\n", ""
                    }), o = a + o, this.theme.set("less", n), this.theme.set("css", o), SL.util.callback(t)
                } else
                    SL.util.callback(e)
            }
            this.checkUnsavedChanges()
        }.bind(this)) : (this.theme.set("less", ""), this.theme.set("css", ""), SL.util.callback(t)), this.checkUnsavedChanges()
    },hasUnsavedChanges: function() {
        return this.savedJSON !== JSON.stringify(this.theme.toJSON())
    },checkUnsavedChanges: function() {
        this.domElement.toggleClass("has-unsaved-changes", this.hasUnsavedChanges())
    },save: function(t) {
        var e = this.saveButton.data("ladda");
        e && e.start(), this.preprocess(function() {
            this.savedJSON = JSON.stringify(this.theme.toJSON()), this.editor.saveTheme(this.theme, function() {
                e && e.stop(), SL.util.callback(t)
            }.bind(this))
        }.bind(this), function() {
            SL.notify("Please fix all CSS errors before saving", "negative"), e && e.stop()
        }.bind(this))
    },close: function(t) {
        this.hasUnsavedChanges() ? SL.prompt({anchor: this.cancelButton,title: SL.locale.get("WARN_UNSAVED_CHANGES"),alignment: "b",type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Discard</h3>",className: "divider",callback: function() {
                        this.destroy(), SL.util.callback(t)
                    }.bind(this)}, {html: "<h3>Save</h3>",className: "positive",selected: !0,callback: function() {
                        SL.util.callback(t), this.save(this.destroy.bind(this))
                    }.bind(this)}]}) : (this.destroy(), SL.util.callback(t))
    },getTheme: function() {
        return this.theme
    },onCSSInputChanged: function() {
        this.syncCSS(), this.updatePreview()
    },onHTMLInputChanged: function() {
        this.updatePreview()
    },onJSInputChanged: function() {
        this.updatePreview(1e3)
    },onNameInputChanged: function() {
        this.theme.set("name", this.domElement.find("#theme-name").val()), this.checkUnsavedChanges()
    },onSaveClicked: function() {
        this.save()
    },onCancelClicked: function() {
        this.close()
    },onDocumentKeyDown: function(t) {
        (t.metaKey || t.ctrlKey) && 83 === t.keyCode && (this.hasUnsavedChanges() && this.save(), t.preventDefault())
    },destroy: function() {
        this.isDestroyed || (this.isDestroyed = !0, clearTimeout(this.previewTimeout), this.destroyed.dispatch(), this.destroyed.dispose(), $(document).off("keydown", this.onDocumentKeyDown), setTimeout(function() {
            this.cssEditor && (this.cssEditor.destroy(), this.cssEditor = null), this.htmlEditor && (this.htmlEditor.destroy(), this.htmlEditor = null), this.jsEditor && (this.jsEditor.destroy(), this.jsEditor = null), this.palette && (this.palette.destroy(), this.palette = null), this.snippets && (this.snippets.destroy(), this.snippets = null), this.themeOptions.destroy(), this.domElement.remove()
        }.bind(this), 500))
    }}), SL("views.themes").Preview = SL.views.Base.extend({init: function() {
        this._super(), SL.util.setupReveal({openLinksInTabs: !0}), window.parent !== window.self && window.parent.postMessage({type: "theme-preview-ready"}, window.location.origin)
    }}), SL("views.users").Show = SL.views.Base.extend({init: function() {
        this._super(), $(".decks .deck").each(function(t, e) {
            e = $(e), e.find(".edit").on("vclick", this.onEditClicked.bind(this, e)), e.find(".share").on("vclick", this.onShareClicked.bind(this, e)), e.find(".fork").on("vclick", this.onForkClicked.bind(this, e)), e.find(".clone").on("vclick", this.onCloneClicked.bind(this, e)), e.find(".delete").on("vclick", this.onDeleteClicked.bind(this, e)), e.find(".lock-icon").on("vclick", this.onVisibilityClicked.bind(this, e)), e.find(".visibility").on("vclick", this.onVisibilityClicked.bind(this, e)), e.hasClass("is-owner") && (e.find(".deck-title-value").attr({"data-tooltip": "Click to edit","data-tooltip-alignment": "l","data-tooltip-delay": 200}), e.find(".deck-title-value").on("click", this.onDeckTitleClicked.bind(this, e)), e.find(".deck-description-value").attr({"data-tooltip": "Click to edit","data-tooltip-alignment": "l","data-tooltip-delay": 200}), e.find(".deck-description-value").on("click", this.onDeckDescriptionClicked.bind(this, e)))
        }.bind(this)), $(".decks .deck .ladda-button").each(function(t, e) {
            $(e).data("ladda", Ladda.create(e))
        }), SL.util.device.IS_PHONE && $("html").addClass("is-mobile-phone"), this.showAnnouncement()
    },showAnnouncement: function() {
        if (Modernizr.localstorage && SL.current_user.isEnterpriseManager() && SL.current_team && SL.current_team.get("beta_new_editor") === !1) {
            var t = "slides-team-has-seen-new-editor-announcement";
            if (!localStorage.getItem(t)) {
                var e = $(['<section class="announcement">', "<h3>New Editor</h3>", '<p>We have released a new and greatly improved presentation editor. Have a look at the <a href="http://slides.com/news/new-editor/" target="_blank">demo presentation</a> for a quick overview.</p>', "<p>To enable the new editor, please visit the team settings page.</p>", '<a class="button positive" href="/edit#beta-features">Team settings</a>', '<a class="button grey dismiss-button">Dismiss</a>', "</section>"].join(""));
                e.find(".dismiss-button").on("click", function() {
                    e.remove(), localStorage.setItem(t, "completed")
                }), $(".main section").first().before(e)
            }
        }
    },getDeckData: function(t) {
        return {user: {username: t.attr("data-username")},id: t.attr("data-id"),slug: t.attr("data-slug"),title: t.attr("data-title"),access_token: t.attr("data-access_token"),visibility: t.attr("data-visibility")}
    },saveVisibility: function(t, e) {
        var n = this.getDeckData(t), i = {type: "POST",url: SL.config.AJAX_PUBLISH_DECK(n.id),context: this,data: {visibility: e}}, s = t.find(".visibility").data("ladda");
        s && s.start(), $.ajax(i).done(function(e) {
            e.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_SELF")) : e.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_TEAM")) : e.deck.visibility === SL.models.Deck.VISIBILITY_ALL && SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ALL")), "string" == typeof e.deck.slug && t.attr("data-slug", e.deck.slug), "string" == typeof e.deck.visibility && t.attr("data-visibility", e.deck.visibility)
        }).fail(function() {
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative")
        }).always(function() {
            s && s.stop(), t.removeClass("hover")
        })
    },cloneDeck: function(t, e) {
        var n = this.getDeckData(t);
        t.addClass("hover");
        var i = t.find(".clone.ladda-button").data("ladda");
        i && i.start(), $.ajax({type: "POST",url: SL.config.AJAX_FORK_DECK(n.id),context: this}).done(function() {
            SL.util.callback(e)
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"), i && i.stop(), t.removeClass("hover")
        })
    },onEditClicked: function(t, e) {
        e.preventDefault(), window.location = t.attr("data-url") + "/edit"
    },onDeleteClicked: function(t, e) {
        e.preventDefault(), t.addClass("hover");
        var n = this.getDeckData(t), i = SL.prompt({anchor: $(e.currentTarget),title: SL.locale.get("DECK_DELETE_CONFIRM", {title: n.title}),type: "select",data: [{html: "<h3>Cancel</h3>",callback: function() {
                        t.removeClass("hover")
                    }.bind(this)}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        t.find(".details .status").text("Deleting...");
                        var e = t.find(".delete.ladda-button").data("ladda");
                        e && e.start(), $.ajax({type: "DELETE",url: SL.config.AJAX_UPDATE_DECK(n.id),data: {},context: this}).done(function() {
                            SL.util.anim.collapseListItem(t, function() {
                                e && e.stop(), t.remove()
                            }.bind(this)), SL.notify(SL.locale.get("DECK_DELETE_SUCCESS"))
                        }).fail(function() {
                            SL.notify(SL.locale.get("DECK_DELETE_ERROR"), "negative"), e && e.stop()
                        }).always(function() {
                            t.removeClass("hover")
                        })
                    }.bind(this)}]});
        i.canceled.add(function() {
            t.removeClass("hover")
        }), SL.analytics.track("User.show: Delete deck")
    },onVisibilityClicked: function(t, e) {
        e.preventDefault(), t.addClass("hover");
        var n = this.getDeckData(t), i = [];
        i.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_SELF"),selected: n.visibility === SL.models.Deck.VISIBILITY_SELF,callback: function() {
                this.saveVisibility(t, SL.models.Deck.VISIBILITY_SELF), SL.analytics.track("User.show: Visibility changed", "self")
            }.bind(this)}), SL.current_user.isEnterprise() && i.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_TEAM"),selected: n.visibility === SL.models.Deck.VISIBILITY_TEAM,className: "divider",callback: function() {
                this.saveVisibility(t, SL.models.Deck.VISIBILITY_TEAM), SL.analytics.track("User.show: Visibility changed", "team")
            }.bind(this)}), i.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_ALL"),selected: n.visibility === SL.models.Deck.VISIBILITY_ALL,callback: function() {
                this.saveVisibility(t, SL.models.Deck.VISIBILITY_ALL), SL.analytics.track("User.show: Visibility changed", "all")
            }.bind(this)});
        var s = SL.prompt({anchor: $(e.currentTarget),type: "select",data: i});
        s.canceled.add(function() {
            t.removeClass("hover")
        }), SL.analytics.track("User.show: Visibility menu opened")
    },onShareClicked: function(t, e) {
        e.preventDefault();
        var n = this.getDeckData(t);
        return "string" != typeof n.user.username || "string" != typeof n.slug && "string" != typeof n.id ? SL.notify(SL.locale.get("GENERIC_ERROR"), "negative") : SL.modal.open("share-deck", n), !1
    },onCloneClicked: function(t, e) {
        return e.preventDefault(), this.cloneDeck(t, function() {
            window.location.reload()
        }), !1
    },onForkClicked: function(t, e) {
        return e.preventDefault(), this.cloneDeck(t, function() {
            window.location = SL.current_user.getProfileURL()
        }), !1
    },onDeckTitleClicked: function(t) {
        var e = t.find(".deck-title-value"), n = SL.prompt({anchor: e,title: "Edit deck title",type: "input",confirmLabel: "Save",data: {value: e.text(),placeholder: "Deck title...",maxlength: SL.config.DECK_TITLE_MAXLENGTH,width: 400,confirmBeforeDiscard: !0}});
        return n.confirmed.add(function(n) {
            n && "" !== n.trim() ? (e.text(n), $.ajax({url: SL.config.AJAX_UPDATE_DECK(this.getDeckData(t).id),type: "PUT",context: this,data: {deck: {title: n}}}).fail(function() {
                SL.notify("An error occured while saving your deck title", "negative")
            })) : SL.notify("Title can't be empty", "negative")
        }.bind(this)), !1
    },onDeckDescriptionClicked: function(t) {
        var e = t.find(".deck-description-value"), n = SL.prompt({anchor: e,title: "Edit deck description",type: "input",confirmLabel: "Save",data: {value: e.text(),placeholder: "A short description of this deck...",multiline: !0,confirmBeforeDiscard: !0}});
        return n.confirmed.add(function(n) {
            e.text(n), $.ajax({url: SL.config.AJAX_UPDATE_DECK(this.getDeckData(t).id),type: "PUT",context: this,data: {deck: {description: n}}}).fail(function() {
                SL.notify("An error occured while saving your deck description", "negative")
            })
        }.bind(this)), !1
    }});
