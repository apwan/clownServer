

//  es5-shim.js  //provide ECMAScript 5 support

(function(t) {
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
})),

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
}(document);



















