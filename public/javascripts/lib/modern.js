/**
 * Created by WuYijie on 1/8/15.
 */


 window.Modernizr = function(t, e, n)
{ // First Level
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
        return t && "webkitPerspective" in g.style && x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
            function(e) {
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
}(this, this.document), 

function(t, e) { 
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
}(this, document), 

Modernizr.addTest("fullscreen", function() { 
    for (var t = 0; t < Modernizr._domPrefixes.length; t++)
        if (document[Modernizr._domPrefixes[t].toLowerCase() + "CancelFullScreen"])
            return !0;
    return !!document.cancelFullScreen || !1
}), 

function(t, e) { 
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
                    if (document.activeElement.className == 'button preview') {
                        console.log('shutdown preview successfully');
                        //return 0;
                    }
                    if (document.activeElement.className == 'button share') {
                        console.log('shutdown share successfully');
                        //return 0;
                    }
                    if (document.activeElement.className == 'button preview-controls-button preview-controls-external grey l') {
                        console.log('shutdown preview-controls successfully');
                        //return 0;
                    }
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
}), 
function(t, e) { 
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
}(jQuery), 
function(t) { 
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
}(jQuery), 

jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing,
{def: "easeOutQuad",
    swing: function(t, e, n, i, s) {
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
    }
}), 
function() {
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
}.call(this), 
function(t) {
    t.fn.changeElementType = function(e) {
        var n = {};
        t.each(this[0].attributes, function(t, e) {
            n[e.nodeName] = e.nodeValue
        }), this.replaceWith(function() {
            return t("<" + e + "/>", n).append(t(this).contents())
        })
    }
}(jQuery), 

function(t, e, n) {
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
}), 

function() {
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
}(), 

function(t) {
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
}), 

"undefined" == typeof document || "classList" in document.createElement("a") || !function(t) {
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
}(self), 


function(t) {
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
}(document), 


function(t) {
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
}(), 

function(t) {
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
}.call(this), 

function(t, e) {
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
    }(), 
    p = {lines: 12,length: 7,width: 5,radius: 10,rotate: 0,corners: 1,color: "#000",direction: 1,speed: 1,trail: 100,opacity: .25,fps: 20,zIndex: 2e9,className: "spinner",top: "auto",left: "auto",position: "relative"};
    a.defaults = {}, o(a.prototype, 
        {spin: function(e) {
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
        }
    });
    var f = s(t("group"), {behavior: "url(#default#VML)"});
    return !i(f, "transform") && f.adj ? l() : c = i(f, "animation"), a
}), 
function(t, e) {
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
}), 

function(t, e) {
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
}(window, document), 

function(t, e, n, i) {
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

/*

*/

    var le = ["", "webkit", "moz", "MS", "ms", "o"], ce = e.createElement("div"), ue = "function", de = Math.round, he = Math.abs, pe = Date.now, fe = 1, me = /mobile|tablet|ip(ad|hone|od)|android/i, ge = "ontouchstart" in t, ve = E(t, "PointerEvent") !== i, ye = ge && me.test(navigator.userAgent), be = "touch", Se = "pen", Ee = "mouse", Te = "kinect", we = 25, _e = 1, ke = 2, Le = 4, Ce = 8, xe = 1, Ae = 2, Ie = 4, De = 8, Me = 16, Re = Ae | Ie, Ne = De | Me, Oe = Re | Ne, Pe = ["x", "y"], $e = ["clientX", "clientY"];
    _.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(w(this.element), this.evWin, this.domHandler)
        },destroy: function() {
            this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(w(this.element), this.evWin, this.domHandler)
        }
    };
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

//*************
    W.prototype = {
        set: function(t) {
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
        }
    };

    var on = 1, rn = 2, an = 4, ln = 8, cn = ln, un = 16, dn = 32;
    X.prototype = {defaults: {},
        set: function(t) {
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
    }
}), 
se.VERSION = "2.0.4", se.defaults = {domEvents: !1,touchAction: Ze,enable: !0,inputTarget: null,inputClass: null,preset: [[ee, {enable: !1}], [Q, {enable: !1}, ["rotate"]], [ne, {direction: Re}], [Z, {direction: Re}, ["swipe"]], [ie], [ie, {event: "doubletap",taps: 2}, ["tap"]], [te]],cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",contentZooming: "none",userDrag: "none",tapHighlightColor: "rgba(0,0,0,0)"}};
    
    var hn = 1, pn = 2;
    oe.prototype = {
        set: function(t) {
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
        }
    }, 
    a(se, {INPUT_START: _e,INPUT_MOVE: ke,INPUT_END: Le,INPUT_CANCEL: Ce,STATE_POSSIBLE: on,STATE_BEGAN: rn,STATE_CHANGED: an,STATE_ENDED: ln,STATE_RECOGNIZED: cn,STATE_CANCELLED: un,STATE_FAILED: dn,DIRECTION_NONE: xe,DIRECTION_LEFT: Ae,DIRECTION_RIGHT: Ie,DIRECTION_UP: De,DIRECTION_DOWN: Me,DIRECTION_HORIZONTAL: Re,DIRECTION_VERTICAL: Ne,DIRECTION_ALL: Oe,Manager: oe,Input: _,TouchAction: W,TouchInput: F,MouseInput: j,PointerEventInput: U,TouchMouseInput: V,SingleTouchInput: H,Recognizer: X,AttrRecognizer: K,Tap: ie,Pan: Z,Swipe: ne,Pinch: Q,Rotate: ee,Press: te,on: p,off: f,each: r,merge: l,extend: a,inherit: c,bindFn: u,prefixed: E}), 
    typeof define == ue && define.amd ? define(function() { return se}) : "undefined" != typeof module && module.exports ? module.exports = se : t[n] = se


}(window, document, "Hammer");
