(function(t, e) {
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
}));

// END of jquery








