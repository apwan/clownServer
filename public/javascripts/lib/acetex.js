!function() {
    function e(e) {
        var t = function(e, t) {
            return o("", e, t)
        }, r = i;
        e && (i[e] || (i[e] = {}), r = i[e]), r.define && r.define.packaged || (n.original = r.define, r.define = n, r.define.packaged = !0), r.require && r.require.packaged || (o.original = r.require, r.require = t, r.require.packaged = !0)
    }
    var t = "", i = function() {
        return this
    }();

    // requirejs module
    if (t || "undefined" == typeof requirejs) {
        var n = function(e, t, i) {
            return "string" != typeof e ? void (n.original ? n.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."), console.trace())) : (2 == arguments.length && (i = t), n.modules || (n.modules = {}), n.modules[e] = i, void 0)
        }, o = function(e, t, i) {
            if ("[object Array]" === Object.prototype.toString.call(t)) {
                for (var n = [], r = 0, a = t.length; a > r; ++r) {
                    var l = s(e, t[r]);
                    if (!l && o.original)
                        return o.original.apply(window, arguments);
                    n.push(l)
                }
                i && i.apply(null, n)
            } else {
                if ("string" == typeof t) {
                    var c = s(e, t);
                    return !c && o.original ? o.original.apply(window, arguments) : (i && i(), c)
                }
                if (o.original)
                    return o.original.apply(window, arguments)
            }
        }, r = function(e, t) {
            if (-1 !== t.indexOf("!")) {
                var i = t.split("!");
                return r(e, i[0]) + "!" + r(e, i[1])
            }
            if ("." == t.charAt(0)) {
                var n = e.split("/").slice(0, -1).join("/");
                for (t = n + "/" + t; -1 !== t.indexOf(".") && o != t; ) {
                    var o = t;
                    t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                }
            }
            return t
        }, s = function(e, t) {
            t = r(e, t);
            var i = n.modules[t];
            if (!i)
                return null;
            if ("function" == typeof i) {
                var s = {}, a = {id: t,uri: "",exports: s,packaged: !0}, l = function(e, i) {
                    return o(t, e, i)
                }, c = i(l, s, a);
                return s = c || a.exports, n.modules[t] = s, s
            }
            return i
        };
        e(t)
    }

}(), define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/multi_select", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/config"], function(e, t) {
    e("./lib/fixoldbrowsers");
    var i = e("./lib/dom"), n = e("./lib/event"), o = e("./editor").Editor, r = e("./edit_session").EditSession, s = e("./undomanager").UndoManager, a = e("./virtual_renderer").VirtualRenderer, l = e("./multi_select").MultiSelect;
    e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./mode/folding/fold_mode"), e("./theme/textmate"), t.config = e("./config"), t.require = e, t.edit = function(e) {
        if ("string" == typeof e) {
            var r = e, e = document.getElementById(r);
            if (!e)
                throw "ace.edit can't find div #" + r
        }
        if (e.env && e.env.editor instanceof o)
            return e.env.editor;
        var s = t.createEditSession(i.getInnerText(e));
        e.innerHTML = "";
        var c = new o(new a(e));
        new l(c), c.setSession(s);
        var h = {document: s,editor: c,onResize: c.resize.bind(c, null)};
        return n.addListener(window, "resize", h.onResize), c.on("destroy", function() {
            n.removeListener(window, "resize", h.onResize)
        }), e.env = c.env = h, c
    }, t.createEditSession = function(e) {
        var t = new r(e, t);
        return t.setUndoManager(new s), t
    }, t.EditSession = r, t.UndoManager = s
}), define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function(e) {
    e("./regexp"), e("./es5-shim")
}), define("ace/lib/regexp", ["require", "exports", "module"], function() {
    function e(e) {
        return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
    }
    function t(e, t, i) {
        if (Array.prototype.indexOf)
            return e.indexOf(t, i);
        for (var n = i || 0; n < e.length; n++)
            if (e[n] === t)
                return n;
        return -1
    }
    var i = {exec: RegExp.prototype.exec,test: RegExp.prototype.test,match: String.prototype.match,replace: String.prototype.replace,split: String.prototype.split}, n = void 0 === i.exec.call(/()??/, "")[1], o = function() {
        var e = /^/g;
        return i.test.call(e, ""), !e.lastIndex
    }();
    o && n || (RegExp.prototype.exec = function(r) {
        var s, a, l = i.exec.apply(this, arguments);
        if ("string" == typeof r && l) {
            if (!n && l.length > 1 && t(l, "") > -1 && (a = RegExp(this.source, i.replace.call(e(this), "g", "")), i.replace.call(r.slice(l.index), a, function() {
                for (var e = 1; e < arguments.length - 2; e++)
                    void 0 === arguments[e] && (l[e] = void 0)
            })), this._xregexp && this._xregexp.captureNames)
                for (var c = 1; c < l.length; c++)
                    s = this._xregexp.captureNames[c - 1], s && (l[s] = l[c]);
            !o && this.global && !l[0].length && this.lastIndex > l.index && this.lastIndex--
        }
        return l
    }, o || (RegExp.prototype.test = function(e) {
        var t = i.exec.call(this, e);
        return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t
    }))
}), define("ace/lib/es5-shim", ["require", "exports", "module"], function() {
    function e() {
    }
    function t(e) {
        try {
            return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
        } catch (t) {
        }
    }
    function i(e) {
        return e = +e, e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
    }
    Function.prototype.bind || (Function.prototype.bind = function(t) {
        var i = this;
        if ("function" != typeof i)
            throw new TypeError("Function.prototype.bind called on incompatible " + i);
        var n = d.call(arguments, 1), o = function() {
            if (this instanceof o) {
                var e = i.apply(this, n.concat(d.call(arguments)));
                return Object(e) === e ? e : this
            }
            return i.apply(t, n.concat(d.call(arguments)))
        };
        return i.prototype && (e.prototype = i.prototype, o.prototype = new e, e.prototype = null), o
    });
    var n, o, r, s, a, l = Function.prototype.call, c = Array.prototype, h = Object.prototype, d = c.slice, u = l.bind(h.toString), p = l.bind(h.hasOwnProperty);
    if ((a = p(h, "__defineGetter__")) && (n = l.bind(h.__defineGetter__), o = l.bind(h.__defineSetter__), r = l.bind(h.__lookupGetter__), s = l.bind(h.__lookupSetter__)), 2 != [1, 2].splice(0).length)
        if (function() {
            function e(e) {
                var t = new Array(e + 2);
                return t[0] = t[1] = 0, t
            }
            var t, i = [];
            return i.splice.apply(i, e(20)), i.splice.apply(i, e(26)), t = i.length, i.splice(5, 0, "XXX"), t + 1 == i.length, t + 1 == i.length ? !0 : void 0
        }()) {
            var g = Array.prototype.splice;
            Array.prototype.splice = function(e, t) {
                return arguments.length ? g.apply(this, [void 0 === e ? 0 : e, void 0 === t ? this.length - e : t].concat(d.call(arguments, 2))) : []
            }
        } else
            Array.prototype.splice = function(e, t) {
                var i = this.length;
                e > 0 ? e > i && (e = i) : void 0 == e ? e = 0 : 0 > e && (e = Math.max(i + e, 0)), i > e + t || (t = i - e);
                var n = this.slice(e, e + t), o = d.call(arguments, 2), r = o.length;
                if (e === i)
                    r && this.push.apply(this, o);
                else {
                    var s = Math.min(t, i - e), a = e + s, l = a + r - s, c = i - a, h = i - s;
                    if (a > l)
                        for (var u = 0; c > u; ++u)
                            this[l + u] = this[a + u];
                    else if (l > a)
                        for (u = c; u--; )
                            this[l + u] = this[a + u];
                    if (r && e === h)
                        this.length = h, this.push.apply(this, o);
                    else
                        for (this.length = h + r, u = 0; r > u; ++u)
                            this[e + u] = o[u]
                }
                return n
            };
    Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" == u(e)
    });
    var m = Object("a"), f = "a" != m[0] || !(0 in m);
    if (Array.prototype.forEach || (Array.prototype.forEach = function(e) {
        var t = M(this), i = f && "[object String]" == u(this) ? this.split("") : t, n = arguments[1], o = -1, r = i.length >>> 0;
        if ("[object Function]" != u(e))
            throw new TypeError;
        for (; ++o < r; )
            o in i && e.call(n, i[o], o, t)
    }), Array.prototype.map || (Array.prototype.map = function(e) {
        var t = M(this), i = f && "[object String]" == u(this) ? this.split("") : t, n = i.length >>> 0, o = Array(n), r = arguments[1];
        if ("[object Function]" != u(e))
            throw new TypeError(e + " is not a function");
        for (var s = 0; n > s; s++)
            s in i && (o[s] = e.call(r, i[s], s, t));
        return o
    }), Array.prototype.filter || (Array.prototype.filter = function(e) {
        var t, i = M(this), n = f && "[object String]" == u(this) ? this.split("") : i, o = n.length >>> 0, r = [], s = arguments[1];
        if ("[object Function]" != u(e))
            throw new TypeError(e + " is not a function");
        for (var a = 0; o > a; a++)
            a in n && (t = n[a], e.call(s, t, a, i) && r.push(t));
        return r
    }), Array.prototype.every || (Array.prototype.every = function(e) {
        var t = M(this), i = f && "[object String]" == u(this) ? this.split("") : t, n = i.length >>> 0, o = arguments[1];
        if ("[object Function]" != u(e))
            throw new TypeError(e + " is not a function");
        for (var r = 0; n > r; r++)
            if (r in i && !e.call(o, i[r], r, t))
                return !1;
        return !0
    }), Array.prototype.some || (Array.prototype.some = function(e) {
        var t = M(this), i = f && "[object String]" == u(this) ? this.split("") : t, n = i.length >>> 0, o = arguments[1];
        if ("[object Function]" != u(e))
            throw new TypeError(e + " is not a function");
        for (var r = 0; n > r; r++)
            if (r in i && e.call(o, i[r], r, t))
                return !0;
        return !1
    }), Array.prototype.reduce || (Array.prototype.reduce = function(e) {
        var t = M(this), i = f && "[object String]" == u(this) ? this.split("") : t, n = i.length >>> 0;
        if ("[object Function]" != u(e))
            throw new TypeError(e + " is not a function");
        if (!n && 1 == arguments.length)
            throw new TypeError("reduce of empty array with no initial value");
        var o, r = 0;
        if (arguments.length >= 2)
            o = arguments[1];
        else
            for (; ; ) {
                if (r in i) {
                    o = i[r++];
                    break
                }
                if (++r >= n)
                    throw new TypeError("reduce of empty array with no initial value")
            }
        for (; n > r; r++)
            r in i && (o = e.call(void 0, o, i[r], r, t));
        return o
    }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(e) {
        var t = M(this), i = f && "[object String]" == u(this) ? this.split("") : t, n = i.length >>> 0;
        if ("[object Function]" != u(e))
            throw new TypeError(e + " is not a function");
        if (!n && 1 == arguments.length)
            throw new TypeError("reduceRight of empty array with no initial value");
        var o, r = n - 1;
        if (arguments.length >= 2)
            o = arguments[1];
        else
            for (; ; ) {
                if (r in i) {
                    o = i[r--];
                    break
                }
                if (--r < 0)
                    throw new TypeError("reduceRight of empty array with no initial value")
            }
        do
            r in this && (o = e.call(void 0, o, i[r], r, t));
        while (r--);
        return o
    }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function(e) {
        var t = f && "[object String]" == u(this) ? this.split("") : M(this), n = t.length >>> 0;
        if (!n)
            return -1;
        var o = 0;
        for (arguments.length > 1 && (o = i(arguments[1])), o = o >= 0 ? o : Math.max(0, n + o); n > o; o++)
            if (o in t && t[o] === e)
                return o;
        return -1
    }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(e) {
        var t = f && "[object String]" == u(this) ? this.split("") : M(this), n = t.length >>> 0;
        if (!n)
            return -1;
        var o = n - 1;
        for (arguments.length > 1 && (o = Math.min(o, i(arguments[1]))), o = o >= 0 ? o : n - Math.abs(o); o >= 0; o--)
            if (o in t && e === t[o])
                return o;
        return -1
    }), Object.getPrototypeOf || (Object.getPrototypeOf = function(e) {
        return e.__proto__ || (e.constructor ? e.constructor.prototype : h)
    }), !Object.getOwnPropertyDescriptor) {
        var v = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function(e, t) {
            if ("object" != typeof e && "function" != typeof e || null === e)
                throw new TypeError(v + e);
            if (p(e, t)) {
                var i, n, o;
                if (i = {enumerable: !0,configurable: !0}, a) {
                    var l = e.__proto__;
                    e.__proto__ = h;
                    var n = r(e, t), o = s(e, t);
                    if (e.__proto__ = l, n || o)
                        return n && (i.get = n), o && (i.set = o), i
                }
                return i.value = e[t], i
            }
        }
    }
    if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(e) {
        return Object.keys(e)
    }), !Object.create) {
        var b;
        b = null === Object.prototype.__proto__ ? function() {
            return {__proto__: null}
        } : function() {
            var e = {};
            for (var t in e)
                e[t] = null;
            return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
        }, Object.create = function(e, t) {
            var i;
            if (null === e)
                i = b();
            else {
                if ("object" != typeof e)
                    throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
                var n = function() {
                };
                n.prototype = e, i = new n, i.__proto__ = e
            }
            return void 0 !== t && Object.defineProperties(i, t), i
        }
    }
    if (Object.defineProperty) {
        var w = t({}), C = "undefined" == typeof document || t(document.createElement("div"));
        if (!w || !C)
            var k = Object.defineProperty
    }
    if (!Object.defineProperty || k) {
        var y = "Property description must be an object: ", E = "Object.defineProperty called on non-object: ", S = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function(e, t, i) {
            if ("object" != typeof e && "function" != typeof e || null === e)
                throw new TypeError(E + e);
            if ("object" != typeof i && "function" != typeof i || null === i)
                throw new TypeError(y + i);
            if (k)
                try {
                    return k.call(Object, e, t, i)
                } catch (l) {
                }
            if (p(i, "value"))
                if (a && (r(e, t) || s(e, t))) {
                    var c = e.__proto__;
                    e.__proto__ = h, delete e[t], e[t] = i.value, e.__proto__ = c
                } else
                    e[t] = i.value;
            else {
                if (!a)
                    throw new TypeError(S);
                p(i, "get") && n(e, t, i.get), p(i, "set") && o(e, t, i.set)
            }
            return e
        }
    }
    Object.defineProperties || (Object.defineProperties = function(e, t) {
        for (var i in t)
            p(t, i) && Object.defineProperty(e, i, t[i]);
        return e
    }), Object.seal || (Object.seal = function(e) {
        return e
    }), Object.freeze || (Object.freeze = function(e) {
        return e
    });
    try {
        Object.freeze(function() {
        })
    } catch (A) {
        Object.freeze = function(e) {
            return function(t) {
                return "function" == typeof t ? t : e(t)
            }
        }(Object.freeze)
    }
    if (Object.preventExtensions || (Object.preventExtensions = function(e) {
        return e
    }), Object.isSealed || (Object.isSealed = function() {
        return !1
    }), Object.isFrozen || (Object.isFrozen = function() {
        return !1
    }), Object.isExtensible || (Object.isExtensible = function(e) {
        if (Object(e) === e)
            throw new TypeError;
        for (var t = ""; p(e, t); )
            t += "?";
        e[t] = !0;
        var i = p(e, t);
        return delete e[t], i
    }), !Object.keys) {
        var x = !0, F = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], D = F.length;
        for (var L in {toString: null})
            x = !1;
        Object.keys = function R(e) {
            if ("object" != typeof e && "function" != typeof e || null === e)
                throw new TypeError("Object.keys called on a non-object");
            var R = [];
            for (var t in e)
                p(e, t) && R.push(t);
            if (x)
                for (var i = 0, n = D; n > i; i++) {
                    var o = F[i];
                    p(e, o) && R.push(o)
                }
            return R
        }
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    var B = "	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
    if (!String.prototype.trim || B.trim()) {
        B = "[" + B + "]";
        var T = new RegExp("^" + B + B + "*"), _ = new RegExp(B + B + "*$");
        String.prototype.trim = function() {
            return String(this).replace(T, "").replace(_, "")
        }
    }
    var M = function(e) {
        if (null == e)
            throw new TypeError("can't convert " + e + " to object");
        return Object(e)
    }
}), define("ace/lib/dom", ["require", "exports", "module"], function(e, t) {
    if ("undefined" != typeof document) {
        var i = "http://www.w3.org/1999/xhtml";
        t.getDocumentHead = function(e) {
            return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
        }, t.createElement = function(e, t) {
            return document.createElementNS ? document.createElementNS(t || i, e) : document.createElement(e)
        }, t.hasCssClass = function(e, t) {
            var i = e.className.split(/\s+/g);
            return -1 !== i.indexOf(t)
        }, t.addCssClass = function(e, i) {
            t.hasCssClass(e, i) || (e.className += " " + i)
        }, t.removeCssClass = function(e, t) {
            for (var i = e.className.split(/\s+/g); ; ) {
                var n = i.indexOf(t);
                if (-1 == n)
                    break;
                i.splice(n, 1)
            }
            e.className = i.join(" ")
        }, t.toggleCssClass = function(e, t) {
            for (var i = e.className.split(/\s+/g), n = !0; ; ) {
                var o = i.indexOf(t);
                if (-1 == o)
                    break;
                n = !1, i.splice(o, 1)
            }
            return n && i.push(t), e.className = i.join(" "), n
        }, t.setCssClass = function(e, i, n) {
            n ? t.addCssClass(e, i) : t.removeCssClass(e, i)
        }, t.hasCssString = function(e, t) {
            var i, n = 0;
            if (t = t || document, t.createStyleSheet && (i = t.styleSheets)) {
                for (; n < i.length; )
                    if (i[n++].owningElement.id === e)
                        return !0
            } else if (i = t.getElementsByTagName("style"))
                for (; n < i.length; )
                    if (i[n++].id === e)
                        return !0;
            return !1
        }, t.importCssString = function(e, n, o) {
            if (o = o || document, n && t.hasCssString(n, o))
                return null;
            var r;
            o.createStyleSheet ? (r = o.createStyleSheet(), r.cssText = e, n && (r.owningElement.id = n)) : (r = o.createElementNS ? o.createElementNS(i, "style") : o.createElement("style"), r.appendChild(o.createTextNode(e)), n && (r.id = n), t.getDocumentHead(o).appendChild(r))
        }, t.importCssStylsheet = function(e, i) {
            if (i.createStyleSheet)
                i.createStyleSheet(e);
            else {
                var n = t.createElement("link");
                n.rel = "stylesheet", n.href = e, t.getDocumentHead(i).appendChild(n)
            }
        }, t.getInnerWidth = function(e) {
            return parseInt(t.computedStyle(e, "paddingLeft"), 10) + parseInt(t.computedStyle(e, "paddingRight"), 10) + e.clientWidth
        }, t.getInnerHeight = function(e) {
            return parseInt(t.computedStyle(e, "paddingTop"), 10) + parseInt(t.computedStyle(e, "paddingBottom"), 10) + e.clientHeight
        }, void 0 !== window.pageYOffset ? (t.getPageScrollTop = function() {
            return window.pageYOffset
        }, t.getPageScrollLeft = function() {
            return window.pageXOffset
        }) : (t.getPageScrollTop = function() {
            return document.body.scrollTop
        }, t.getPageScrollLeft = function() {
            return document.body.scrollLeft
        }), t.computedStyle = window.getComputedStyle ? function(e, t) {
            return t ? (window.getComputedStyle(e, "") || {})[t] || "" : window.getComputedStyle(e, "") || {}
        } : function(e, t) {
            return t ? e.currentStyle[t] : e.currentStyle
        }, t.scrollbarWidth = function(e) {
            var i = t.createElement("ace_inner");
            i.style.width = "100%", i.style.minWidth = "0px", i.style.height = "200px", i.style.display = "block";
            var n = t.createElement("ace_outer"), o = n.style;
            o.position = "absolute", o.left = "-10000px", o.overflow = "hidden", o.width = "200px", o.minWidth = "0px", o.height = "150px", o.display = "block", n.appendChild(i);
            var r = e.documentElement;
            r.appendChild(n);
            var s = i.offsetWidth;
            o.overflow = "scroll";
            var a = i.offsetWidth;
            return s == a && (a = n.clientWidth), r.removeChild(n), s - a
        }, t.setInnerHtml = function(e, t) {
            var i = e.cloneNode(!1);
            return i.innerHTML = t, e.parentNode.replaceChild(i, e), i
        }, "textContent" in document.documentElement ? (t.setInnerText = function(e, t) {
            e.textContent = t
        }, t.getInnerText = function(e) {
            return e.textContent
        }) : (t.setInnerText = function(e, t) {
            e.innerText = t
        }, t.getInnerText = function(e) {
            return e.innerText
        }), t.getParentWindow = function(e) {
            return e.defaultView || e.parentWindow
        }
    }
}), define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent", "ace/lib/dom"], function(e, t) {
    function i(e, t, i) {
        var r = 0;
        if (r = !o.isOpera || "KeyboardEvent" in window || !o.isMac ? 0 | (t.ctrlKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.metaKey ? 8 : 0) : 0 | (t.metaKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.ctrlKey ? 8 : 0), i in n.MODIFIER_KEYS) {
            switch (n.MODIFIER_KEYS[i]) {
                case "Alt":
                    r = 2;
                    break;
                case "Shift":
                    r = 4;
                    break;
                case "Ctrl":
                    r = 1;
                    break;
                default:
                    r = 8
            }
            i = 0
        }
        return 8 & r && (91 == i || 93 == i) && (i = 0), r || i in n.FUNCTION_KEYS || i in n.PRINTABLE_KEYS ? e(t, r, i) : !1
    }
    {
        var n = e("./keys"), o = e("./useragent");
        e("./dom")
    }
    if (t.addListener = function(e, t, i) {
        if (e.addEventListener)
            return e.addEventListener(t, i, !1);
        if (e.attachEvent) {
            var n = function() {
                i(window.event)
            };
            i._wrapper = n, e.attachEvent("on" + t, n)
        }
    }, t.removeListener = function(e, t, i) {
        return e.removeEventListener ? e.removeEventListener(t, i, !1) : void (e.detachEvent && e.detachEvent("on" + t, i._wrapper || i))
    }, t.stopEvent = function(e) {
        return t.stopPropagation(e), t.preventDefault(e), !1
    }, t.stopPropagation = function(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }, t.preventDefault = function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }, t.getButton = function(e) {
        return "dblclick" == e.type ? 0 : "contextmenu" == e.type || e.ctrlKey && o.isMac ? 2 : e.preventDefault ? e.button : {1: 0,2: 2,4: 1}[e.button]
    }, t.capture = document.documentElement.setCapture ? function(e, i, n) {
        function o(s) {
            i(s), r || (r = !0, n(s)), t.removeListener(e, "mousemove", i), t.removeListener(e, "mouseup", o), t.removeListener(e, "losecapture", o), e.releaseCapture()
        }
        var r = !1;
        t.addListener(e, "mousemove", i), t.addListener(e, "mouseup", o), t.addListener(e, "losecapture", o), e.setCapture()
    } : function(e, t, i) {
        function n(e) {
            t && t(e), i && i(e), document.removeEventListener("mousemove", t, !0), document.removeEventListener("mouseup", n, !0), e.stopPropagation()
        }
        document.addEventListener("mousemove", t, !0), document.addEventListener("mouseup", n, !0)
    }, t.addMouseWheelListener = function(e, i) {
        var n = 8, o = function(e) {
            void 0 !== e.wheelDelta ? void 0 !== e.wheelDeltaX ? (e.wheelX = -e.wheelDeltaX / n, e.wheelY = -e.wheelDeltaY / n) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / n) : e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = 5 * (e.detail || 0), e.wheelY = 0) : (e.wheelX = 0, e.wheelY = 5 * (e.detail || 0)), i(e)
        };
        t.addListener(e, "DOMMouseScroll", o), t.addListener(e, "mousewheel", o)
    }, t.addMultiMouseDownListener = function(e, i, n, r) {
        var s, a, l, c = 0, h = {2: "dblclick",3: "tripleclick",4: "quadclick"};
        t.addListener(e, "mousedown", function(e) {
            if (0 != t.getButton(e))
                c = 0;
            else {
                var o = Math.abs(e.clientX - s) > 5 || Math.abs(e.clientY - a) > 5;
                (!l || o) && (c = 0), c += 1, l && clearTimeout(l), l = setTimeout(function() {
                    l = null
                }, i[c - 1] || 600)
            }
            if (1 == c && (s = e.clientX, a = e.clientY), n[r]("mousedown", e), c > 4)
                c = 0;
            else if (c > 1)
                return n[r](h[c], e)
        }), o.isOldIE && t.addListener(e, "dblclick", function(e) {
            c = 2, l && clearTimeout(l), l = setTimeout(function() {
                l = null
            }, i[c - 1] || 600), n[r]("mousedown", e), n[r](h[c], e)
        })
    }, t.addCommandKeyListener = function(e, n) {
        var r = t.addListener;
        if (o.isOldGecko || o.isOpera && !("KeyboardEvent" in window)) {
            var s = null;
            r(e, "keydown", function(e) {
                s = e.keyCode
            }), r(e, "keypress", function(e) {
                return i(n, e, s)
            })
        } else {
            var a = null;
            r(e, "keydown", function(e) {
                return a = e.keyIdentifier || e.keyCode, i(n, e, e.keyCode)
            })
        }
    }, window.postMessage && !o.isOldIE) {
        var r = 1;
        t.nextTick = function(e, i) {
            i = i || window;
            var n = "zero-timeout-message-" + r;
            t.addListener(i, "message", function o(r) {
                r.data == n && (t.stopPropagation(r), t.removeListener(i, "message", o), e())
            }), i.postMessage(n, "*")
        }
    }
    t.nextFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame, t.nextFrame = t.nextFrame ? t.nextFrame.bind(window) : function(e) {
        setTimeout(e, 17)
    }
}), define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function(e, t) {
    var i = e("./oop"), n = function() {
        var e = {MODIFIER_KEYS: {16: "Shift",17: "Ctrl",18: "Alt",224: "Meta"},KEY_MODS: {ctrl: 1,alt: 2,option: 2,shift: 4,meta: 8,command: 8,cmd: 8},FUNCTION_KEYS: {8: "Backspace",9: "Tab",13: "Return",19: "Pause",27: "Esc",32: "Space",33: "PageUp",34: "PageDown",35: "End",36: "Home",37: "Left",38: "Up",39: "Right",40: "Down",44: "Print",45: "Insert",46: "Delete",96: "Numpad0",97: "Numpad1",98: "Numpad2",99: "Numpad3",100: "Numpad4",101: "Numpad5",102: "Numpad6",103: "Numpad7",104: "Numpad8",105: "Numpad9",112: "F1",113: "F2",114: "F3",115: "F4",116: "F5",117: "F6",118: "F7",119: "F8",120: "F9",121: "F10",122: "F11",123: "F12",144: "Numlock",145: "Scrolllock"},PRINTABLE_KEYS: {32: " ",48: "0",49: "1",50: "2",51: "3",52: "4",53: "5",54: "6",55: "7",56: "8",57: "9",59: ";",61: "=",65: "a",66: "b",67: "c",68: "d",69: "e",70: "f",71: "g",72: "h",73: "i",74: "j",75: "k",76: "l",77: "m",78: "n",79: "o",80: "p",81: "q",82: "r",83: "s",84: "t",85: "u",86: "v",87: "w",88: "x",89: "y",90: "z",107: "+",109: "-",110: ".",188: ",",190: ".",191: "/",192: "`",219: "[",220: "\\",221: "]",222: "'"}};
        for (var t in e.FUNCTION_KEYS) {
            var n = e.FUNCTION_KEYS[t].toLowerCase();
            e[n] = parseInt(t, 10)
        }
        return i.mixin(e, e.MODIFIER_KEYS), i.mixin(e, e.PRINTABLE_KEYS), i.mixin(e, e.FUNCTION_KEYS), e.enter = e["return"], e.escape = e.esc, e.del = e["delete"], e[173] = "-", e
    }();
    i.mixin(t, n), t.keyCodeToString = function(e) {
        return (n[e] || String.fromCharCode(e)).toLowerCase()
    }
}), define("ace/lib/oop", ["require", "exports", "module"], function(e, t) {
    t.inherits = function() {
        var e = function() {
        };
        return function(t, i) {
            e.prototype = i.prototype, t.super_ = i.prototype, t.prototype = new e, t.prototype.constructor = t
        }
    }(), t.mixin = function(e, t) {
        for (var i in t)
            e[i] = t[i];
        return e
    }, t.implement = function(e, i) {
        t.mixin(e, i)
    }
}), define("ace/lib/useragent", ["require", "exports", "module"], function(e, t) {
    if (t.OS = {LINUX: "LINUX",MAC: "MAC",WINDOWS: "WINDOWS"}, t.getOS = function() {
        return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS
    }, "object" == typeof navigator) {
        var i = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(), n = navigator.userAgent;
        t.isWin = "win" == i, t.isMac = "mac" == i, t.isLinux = "linux" == i, t.isIE = ("Microsoft Internet Explorer" == navigator.appName || navigator.appName.indexOf("MSAppHost") >= 0) && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = window.controllers && "Gecko" === window.navigator.product, t.isOldGecko = t.isGecko && parseInt((navigator.userAgent.match(/rv\:(\d+)/) || [])[1], 10) < 4, t.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(n.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(n.split(" Chrome/")[1]) || void 0, t.isAIR = n.indexOf("AdobeAIR") >= 0, t.isIPad = n.indexOf("iPad") >= 0, t.isTouchPad = n.indexOf("TouchPad") >= 0
    }
}), define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config"], function(e, t) {
    e("./lib/fixoldbrowsers");
    var i = e("./lib/oop"), n = e("./lib/dom"), o = e("./lib/lang"), r = e("./lib/useragent"), s = e("./keyboard/textinput").TextInput, a = e("./mouse/mouse_handler").MouseHandler, l = e("./mouse/fold_handler").FoldHandler, c = e("./keyboard/keybinding").KeyBinding, h = e("./edit_session").EditSession, d = e("./search").Search, u = e("./range").Range, p = e("./lib/event_emitter").EventEmitter, g = e("./commands/command_manager").CommandManager, m = e("./commands/default_commands").commands, f = e("./config"), v = function(e, t) {
        var i = e.getContainerElement();
        this.container = i, this.renderer = e, this.commands = new g(r.isMac ? "mac" : "win", m), this.textInput = new s(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.keyBinding = new c(this), this.$mouseHandler = new a(this), new l(this), this.$blockScrolling = 0, this.$search = (new d).set({wrap: !0}), this.setSession(t || new h("")), f.resetOptions(this), f._emit("editor", this)
    };
    (function() {
        i.implement(this, p), this.setKeyboardHandler = function(e) {
            if (e)
                if ("string" == typeof e) {
                    this.$keybindingId = e;
                    var t = this;
                    f.loadModule(["keybinding", e], function(i) {
                        t.$keybindingId == e && t.keyBinding.setKeyboardHandler(i && i.handler)
                    })
                } else
                    delete this.$keybindingId, this.keyBinding.setKeyboardHandler(e);
            else
                this.keyBinding.setKeyboardHandler(null)
        }, this.getKeyboardHandler = function() {
            return this.keyBinding.getKeyboardHandler()
        }, this.setSession = function(e) {
            if (this.session != e) {
                if (this.session) {
                    var t = this.session;
                    this.session.removeEventListener("change", this.$onDocumentChange), this.session.removeEventListener("changeMode", this.$onChangeMode), this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.session.removeEventListener("changeTabSize", this.$onChangeTabSize), this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode), this.session.removeEventListener("onChangeFold", this.$onChangeFold), this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker), this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation), this.session.removeEventListener("changeOverwrite", this.$onCursorChange), this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange), this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);
                    var i = this.session.getSelection();
                    i.removeEventListener("changeCursor", this.$onCursorChange), i.removeEventListener("changeSelection", this.$onSelectionChange)
                }
                this.session = e, this.$onDocumentChange = this.onDocumentChange.bind(this), e.addEventListener("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.addEventListener("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.addEventListener("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.addEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.addEventListener("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.addEventListener("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.addEventListener("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.addEventListener("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.addEventListener("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.addEventListener("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull(), this._emit("changeSession", {session: e,oldSession: t})
            }
        }, this.getSession = function() {
            return this.session
        }, this.setValue = function(e, t) {
            return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e
        }, this.getValue = function() {
            return this.session.getValue()
        }, this.getSelection = function() {
            return this.selection
        }, this.resize = function(e) {
            this.renderer.onResize(e)
        }, this.setTheme = function(e) {
            this.renderer.setTheme(e)
        }, this.getTheme = function() {
            return this.renderer.getTheme()
        }, this.setStyle = function(e) {
            this.renderer.setStyle(e)
        }, this.unsetStyle = function(e) {
            this.renderer.unsetStyle(e)
        }, this.getFontSize = function() {
            return this.getOption("fontSize") || n.computedStyle(this.container, "fontSize")
        }, this.setFontSize = function(e) {
            this.setOption("fontSize", e)
        }, this.$highlightBrackets = function() {
            if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
                var e = this;
                this.$highlightPending = !0, setTimeout(function() {
                    e.$highlightPending = !1;
                    var t = e.session.findMatchingBracket(e.getCursorPosition());
                    if (t)
                        var i = new u(t.row, t.column, t.row, t.column + 1);
                    else if (e.session.$mode.getMatching)
                        var i = e.session.$mode.getMatching(e.session);
                    i && (e.session.$bracketHighlight = e.session.addMarker(i, "ace_bracket", "text"))
                }, 50)
            }
        }, this.focus = function() {
            var e = this;
            setTimeout(function() {
                e.textInput.focus()
            }), this.textInput.focus()
        }, this.isFocused = function() {
            return this.textInput.isFocused()
        }, this.blur = function() {
            this.textInput.blur()
        }, this.onFocus = function() {
            this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus"))
        }, this.onBlur = function() {
            this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur"))
        }, this.$cursorChange = function() {
            this.renderer.updateCursor()
        }, this.onDocumentChange = function(e) {
            var t, i = e.data, n = i.range;
            t = n.start.row == n.end.row && "insertLines" != i.action && "removeLines" != i.action ? n.end.row : 1 / 0, this.renderer.updateLines(n.start.row, t), this._emit("change", e), this.$cursorChange()
        }, this.onTokenizerUpdate = function(e) {
            var t = e.data;
            this.renderer.updateLines(t.first, t.last)
        }, this.onScrollTopChange = function() {
            this.renderer.scrollToY(this.session.getScrollTop())
        }, this.onScrollLeftChange = function() {
            this.renderer.scrollToX(this.session.getScrollLeft())
        }, this.onCursorChange = function() {
            this.$cursorChange(), this.$blockScrolling || this.renderer.scrollCursorIntoView(), this.$highlightBrackets(), this.$updateHighlightActiveLine(), this._emit("changeSelection")
        }, this.$updateHighlightActiveLine = function() {
            var e, t = this.getSession();
            if (this.$highlightActiveLine && ("line" != this.$selectionStyle || !this.selection.isMultiLine()) && (e = this.getCursorPosition()), t.$highlightLineMarker && !e)
                t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null;
            else if (!t.$highlightLineMarker && e) {
                var i = new u(e.row, e.column, e.row, 1 / 0);
                i.id = t.addMarker(i, "ace_active-line", "screenLine"), t.$highlightLineMarker = i
            } else
                e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._emit("changeBackMarker"))
        }, this.onSelectionChange = function() {
            var e = this.session;
            if (e.$selectionMarker && e.removeMarker(e.$selectionMarker), e.$selectionMarker = null, this.selection.isEmpty())
                this.$updateHighlightActiveLine();
            else {
                var t = this.selection.getRange(), i = this.getSelectionStyle();
                e.$selectionMarker = e.addMarker(t, "ace_selection", i)
            }
            var n = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
            this.session.highlight(n), this._emit("changeSelection")
        }, this.$getSelectionHighLightRegexp = function() {
            var e = this.session, t = this.getSelectionRange();
            if (!t.isEmpty() && !t.isMultiLine()) {
                var i = t.start.column - 1, n = t.end.column + 1, o = e.getLine(t.start.row), r = o.length, s = o.substring(Math.max(i, 0), Math.min(n, r));
                if (!(i >= 0 && /^[\w\d]/.test(s) || r >= n && /[\w\d]$/.test(s)) && (s = o.substring(t.start.column, t.end.column), /^[\w\d]+$/.test(s))) {
                    var a = this.$search.$assembleRegExp({wholeWord: !0,caseSensitive: !0,needle: s});
                    return a
                }
            }
        }, this.onChangeFrontMarker = function() {
            this.renderer.updateFrontMarkers()
        }, this.onChangeBackMarker = function() {
            this.renderer.updateBackMarkers()
        }, this.onChangeBreakpoint = function() {
            this.renderer.updateBreakpoints()
        }, this.onChangeAnnotation = function() {
            this.renderer.setAnnotations(this.session.getAnnotations())
        }, this.onChangeMode = function(e) {
            this.renderer.updateText(), this._emit("changeMode", e)
        }, this.onChangeWrapLimit = function() {
            this.renderer.updateFull()
        }, this.onChangeWrapMode = function() {
            this.renderer.onResize(!0)
        }, this.onChangeFold = function() {
            this.$updateHighlightActiveLine(), this.renderer.updateFull()
        }, this.getCopyText = function() {
            var e = "";
            return this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange())), this._emit("copy", e), e
        }, this.onCopy = function() {
            this.commands.exec("copy", this)
        }, this.onCut = function() {
            this.commands.exec("cut", this)
        }, this.onPaste = function(e) {
            this.$readOnly || (this._emit("paste", e), this.insert(e))
        }, this.execCommand = function(e, t) {
            this.commands.exec(e, this, t)
        }, this.insert = function(e) {
            var t = this.session, i = t.getMode(), n = this.getCursorPosition();
            if (this.getBehavioursEnabled()) {
                var o = i.transformAction(t.getState(n.row), "insertion", this, t, e);
                o && (e = o.text)
            }
            if (e = e.replace("	", this.session.getTabString()), this.selection.isEmpty()) {
                if (this.session.getOverwrite()) {
                    var r = new u.fromPoints(n, n);
                    r.end.column += e.length, this.session.remove(r)
                }
            } else
                n = this.session.remove(this.getSelectionRange()), this.clearSelection();
            this.clearSelection();
            var s = n.column, a = t.getState(n.row), l = t.getLine(n.row), c = i.checkOutdent(a, l, e), h = t.insert(n, e);
            if (o && o.selection && this.selection.setSelectionRange(2 == o.selection.length ? new u(n.row, s + o.selection[0], n.row, s + o.selection[1]) : new u(n.row + o.selection[0], o.selection[1], n.row + o.selection[2], o.selection[3])), t.getDocument().isNewLine(e)) {
                var d = i.getNextLineIndent(a, l.slice(0, n.column), t.getTabString());
                this.moveCursorTo(n.row + 1, 0);
                for (var p = t.getTabSize(), g = Number.MAX_VALUE, m = n.row + 1; m <= h.row; ++m) {
                    var f = 0;
                    l = t.getLine(m);
                    for (var v = 0; v < l.length; ++v)
                        if ("	" == l.charAt(v))
                            f += p;
                        else {
                            if (" " != l.charAt(v))
                                break;
                            f += 1
                        }
                    /[^\s]/.test(l) && (g = Math.min(f, g))
                }
                for (var m = n.row + 1; m <= h.row; ++m) {
                    var b = g;
                    l = t.getLine(m);
                    for (var v = 0; v < l.length && b > 0; ++v)
                        "	" == l.charAt(v) ? b -= p : " " == l.charAt(v) && (b -= 1);
                    t.remove(new u(m, 0, m, v))
                }
                t.indentRows(n.row + 1, h.row, d)
            }
            c && i.autoOutdent(a, t, n.row)
        }, this.onTextInput = function(e) {
            this.keyBinding.onTextInput(e)
        }, this.onCommandKey = function(e, t, i) {
            this.keyBinding.onCommandKey(e, t, i)
        }, this.setOverwrite = function(e) {
            this.session.setOverwrite(e)
        }, this.getOverwrite = function() {
            return this.session.getOverwrite()
        }, this.toggleOverwrite = function() {
            this.session.toggleOverwrite()
        }, this.setScrollSpeed = function(e) {
            this.setOption("scrollSpeed", e)
        }, this.getScrollSpeed = function() {
            return this.getOption("scrollSpeed")
        }, this.setDragDelay = function(e) {
            this.setOption("dragDelay", e)
        }, this.getDragDelay = function() {
            return this.getOption("dragDelay")
        }, this.setSelectionStyle = function(e) {
            this.setOption("selectionStyle", e)
        }, this.getSelectionStyle = function() {
            return this.getOption("selectionStyle")
        }, this.setHighlightActiveLine = function(e) {
            this.setOption("highlightActiveLine", e)
        }, this.getHighlightActiveLine = function() {
            return this.getOption("highlightActiveLine")
        }, this.setHighlightGutterLine = function(e) {
            this.setOption("highlightGutterLine", e)
        }, this.getHighlightGutterLine = function() {
            return this.getOption("highlightGutterLine")
        }, this.setHighlightSelectedWord = function(e) {
            this.setOption("highlightSelectedWord", e)
        }, this.getHighlightSelectedWord = function() {
            return this.$highlightSelectedWord
        }, this.setAnimatedScroll = function(e) {
            this.renderer.setAnimatedScroll(e)
        }, this.getAnimatedScroll = function() {
            return this.renderer.getAnimatedScroll()
        }, this.setShowInvisibles = function(e) {
            this.renderer.setShowInvisibles(e)
        }, this.getShowInvisibles = function() {
            return this.renderer.getShowInvisibles()
        }, this.setDisplayIndentGuides = function(e) {
            this.renderer.setDisplayIndentGuides(e)
        }, this.getDisplayIndentGuides = function() {
            return this.renderer.getDisplayIndentGuides()
        }, this.setShowPrintMargin = function(e) {
            this.renderer.setShowPrintMargin(e)
        }, this.getShowPrintMargin = function() {
            return this.renderer.getShowPrintMargin()
        }, this.setPrintMarginColumn = function(e) {
            this.renderer.setPrintMarginColumn(e)
        }, this.getPrintMarginColumn = function() {
            return this.renderer.getPrintMarginColumn()
        }, this.setReadOnly = function(e) {
            this.setOption("readOnly", e)
        }, this.getReadOnly = function() {
            return this.getOption("readOnly")
        }, this.setBehavioursEnabled = function(e) {
            this.setOption("behavioursEnabled", e)
        }, this.getBehavioursEnabled = function() {
            return this.getOption("behavioursEnabled")
        }, this.setWrapBehavioursEnabled = function(e) {
            this.setOption("wrapBehavioursEnabled", e)
        }, this.getWrapBehavioursEnabled = function() {
            return this.getOption("wrapBehavioursEnabled")
        }, this.setShowFoldWidgets = function(e) {
            this.setOption("showFoldWidgets", e)
        }, this.getShowFoldWidgets = function() {
            return this.getOption("showFoldWidgets")
        }, this.setFadeFoldWidgets = function(e) {
            this.setOption("fadeFoldWidgets", e)
        }, this.getFadeFoldWidgets = function() {
            return this.getOption("fadeFoldWidgets")
        }, this.remove = function(e) {
            this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
            var t = this.getSelectionRange();
            if (this.getBehavioursEnabled()) {
                var i = this.session, n = i.getState(t.start.row), o = i.getMode().transformAction(n, "deletion", this, i, t);
                o && (t = o)
            }
            this.session.remove(t), this.clearSelection()
        }, this.removeWordRight = function() {
            this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
        }, this.removeWordLeft = function() {
            this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
        }, this.removeToLineStart = function() {
            this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection()
        }, this.removeToLineEnd = function() {
            this.selection.isEmpty() && this.selection.selectLineEnd();
            var e = this.getSelectionRange();
            e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
        }, this.splitLine = function() {
            this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
            var e = this.getCursorPosition();
            this.insert("\n"), this.moveCursorToPosition(e)
        }, this.transposeLetters = function() {
            if (this.selection.isEmpty()) {
                var e = this.getCursorPosition(), t = e.column;
                if (0 !== t) {
                    var i, n, o = this.session.getLine(e.row);
                    t < o.length ? (i = o.charAt(t) + o.charAt(t - 1), n = new u(e.row, t - 1, e.row, t + 1)) : (i = o.charAt(t - 1) + o.charAt(t - 2), n = new u(e.row, t - 2, e.row, t)), this.session.replace(n, i)
                }
            }
        }, this.toLowerCase = function() {
            var e = this.getSelectionRange();
            this.selection.isEmpty() && this.selection.selectWord();
            var t = this.getSelectionRange(), i = this.session.getTextRange(t);
            this.session.replace(t, i.toLowerCase()), this.selection.setSelectionRange(e)
        }, this.toUpperCase = function() {
            var e = this.getSelectionRange();
            this.selection.isEmpty() && this.selection.selectWord();
            var t = this.getSelectionRange(), i = this.session.getTextRange(t);
            this.session.replace(t, i.toUpperCase()), this.selection.setSelectionRange(e)
        }, this.indent = function() {
            var e = this.session, t = this.getSelectionRange();
            if (!(t.start.row < t.end.row || t.start.column < t.end.column)) {
                var i;
                if (this.session.getUseSoftTabs()) {
                    var n = e.getTabSize(), r = this.getCursorPosition(), s = e.documentToScreenColumn(r.row, r.column), a = n - s % n;
                    i = o.stringRepeat(" ", a)
                } else
                    i = "	";
                return this.insert(i)
            }
            var l = this.$getSelectedRows();
            e.indentRows(l.first, l.last, "	")
        }, this.blockIndent = function() {
            var e = this.$getSelectedRows();
            this.session.indentRows(e.first, e.last, "	")
        }, this.blockOutdent = function() {
            var e = this.session.getSelection();
            this.session.outdentRows(e.getRange())
        }, this.sortLines = function() {
            var e = this.$getSelectedRows(), t = this.session, i = [];
            for (o = e.first; o <= e.last; o++)
                i.push(t.getLine(o));
            i.sort(function(e, t) {
                return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0
            });
            for (var n = new u(0, 0, 0, 0), o = e.first; o <= e.last; o++) {
                var r = t.getLine(o);
                n.start.row = o, n.end.row = o, n.end.column = r.length, t.replace(n, i[o - e.first])
            }
        }, this.toggleCommentLines = function() {
            var e = this.session.getState(this.getCursorPosition().row), t = this.$getSelectedRows();
            this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
        }, this.toggleBlockComment = function() {
            var e = this.getCursorPosition(), t = this.session.getState(e.row), i = this.getSelectionRange();
            this.session.getMode().toggleBlockComment(t, this.session, i, e)
        }, this.getNumberAt = function(e, t) {
            var i = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
            i.lastIndex = 0;
            for (var n = this.session.getLine(e); i.lastIndex < t; ) {
                var o = i.exec(n);
                if (o.index <= t && o.index + o[0].length >= t) {
                    var r = {value: o[0],start: o.index,end: o.index + o[0].length};
                    return r
                }
            }
            return null
        }, this.modifyNumber = function(e) {
            var t = this.selection.getCursor().row, i = this.selection.getCursor().column, n = new u(t, i - 1, t, i), o = this.session.getTextRange(n);
            if (!isNaN(parseFloat(o)) && isFinite(o)) {
                var r = this.getNumberAt(t, i);
                if (r) {
                    var s = r.value.indexOf(".") >= 0 ? r.start + r.value.indexOf(".") + 1 : r.end, a = r.start + r.value.length - s, l = parseFloat(r.value);
                    l *= Math.pow(10, a), e *= s !== r.end && s > i ? Math.pow(10, r.end - i - 1) : Math.pow(10, r.end - i), l += e, l /= Math.pow(10, a);
                    var c = l.toFixed(a), h = new u(t, r.start, t, r.end);
                    this.session.replace(h, c), this.moveCursorTo(t, Math.max(r.start + 1, i + c.length - r.value.length))
                }
            }
        }, this.removeLines = function() {
            var e, t = this.$getSelectedRows();
            e = 0 === t.first || t.last + 1 < this.session.getLength() ? new u(t.first, 0, t.last + 1, 0) : new u(t.first - 1, this.session.getLine(t.first - 1).length, t.last, this.session.getLine(t.last).length), this.session.remove(e), this.clearSelection()
        }, this.duplicateSelection = function() {
            var e = this.selection, t = this.session, i = e.getRange(), n = e.isBackwards();
            if (i.isEmpty()) {
                var o = i.start.row;
                t.duplicateLines(o, o)
            } else {
                var r = n ? i.start : i.end, s = t.insert(r, t.getTextRange(i), !1);
                i.start = r, i.end = s, e.setSelectionRange(i, n)
            }
        }, this.moveLinesDown = function() {
            this.$moveLines(function(e, t) {
                return this.session.moveLinesDown(e, t)
            })
        }, this.moveLinesUp = function() {
            this.$moveLines(function(e, t) {
                return this.session.moveLinesUp(e, t)
            })
        }, this.moveText = function(e, t) {
            return this.session.moveText(e, t)
        }, this.copyLinesUp = function() {
            this.$moveLines(function(e, t) {
                return this.session.duplicateLines(e, t), 0
            })
        }, this.copyLinesDown = function() {
            this.$moveLines(function(e, t) {
                return this.session.duplicateLines(e, t)
            })
        }, this.$moveLines = function(e) {
            var t = this.selection;
            if (!t.inMultiSelectMode || this.inVirtualSelectionMode) {
                var i = t.toOrientedRange(), n = this.$getSelectedRows(i), o = e.call(this, n.first, n.last);
                i.moveBy(o, 0), t.fromOrientedRange(i)
            } else {
                var r = t.rangeList.ranges;
                t.rangeList.detach(this.session);
                for (var s = r.length; s--; ) {
                    for (var a = s, n = r[s].collapseRows(), l = n.end.row, c = n.start.row; s--; ) {
                        var n = r[s].collapseRows();
                        if (!(c - n.end.row <= 1))
                            break;
                        c = n.end.row
                    }
                    s++;
                    for (var o = e.call(this, c, l); a >= s; )
                        r[a].moveBy(o, 0), a--
                }
                t.fromOrientedRange(t.ranges[0]), t.rangeList.attach(this.session)
            }
        }, this.$getSelectedRows = function() {
            var e = this.getSelectionRange().collapseRows();
            return {first: e.start.row,last: e.end.row}
        }, this.onCompositionStart = function() {
            this.renderer.showComposition(this.getCursorPosition())
        }, this.onCompositionUpdate = function(e) {
            this.renderer.setCompositionText(e)
        }, this.onCompositionEnd = function() {
            this.renderer.hideComposition()
        }, this.getFirstVisibleRow = function() {
            return this.renderer.getFirstVisibleRow()
        }, this.getLastVisibleRow = function() {
            return this.renderer.getLastVisibleRow()
        }, this.isRowVisible = function(e) {
            return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow()
        }, this.isRowFullyVisible = function(e) {
            return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow()
        }, this.$getVisibleRowCount = function() {
            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
        }, this.$moveByPage = function(e, t) {
            var i = this.renderer, n = this.renderer.layerConfig, o = e * Math.floor(n.height / n.lineHeight);
            this.$blockScrolling++, 1 == t ? this.selection.$moveSelection(function() {
                this.moveCursorBy(o, 0)
            }) : 0 == t && (this.selection.moveCursorBy(o, 0), this.selection.clearSelection()), this.$blockScrolling--;
            var r = i.scrollTop;
            i.scrollBy(0, o * n.lineHeight), null != t && i.scrollCursorIntoView(null, .5), i.animateScrolling(r)
        }, this.selectPageDown = function() {
            this.$moveByPage(1, !0)
        }, this.selectPageUp = function() {
            this.$moveByPage(-1, !0)
        }, this.gotoPageDown = function() {
            this.$moveByPage(1, !1)
        }, this.gotoPageUp = function() {
            this.$moveByPage(-1, !1)
        }, this.scrollPageDown = function() {
            this.$moveByPage(1)
        }, this.scrollPageUp = function() {
            this.$moveByPage(-1)
        }, this.scrollToRow = function(e) {
            this.renderer.scrollToRow(e)
        }, this.scrollToLine = function(e, t, i, n) {
            this.renderer.scrollToLine(e, t, i, n)
        }, this.centerSelection = function() {
            var e = this.getSelectionRange(), t = {row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)};
            this.renderer.alignCursor(t, .5)
        }, this.getCursorPosition = function() {
            return this.selection.getCursor()
        }, this.getCursorPositionScreen = function() {
            return this.session.documentToScreenPosition(this.getCursorPosition())
        }, this.getSelectionRange = function() {
            return this.selection.getRange()
        }, this.selectAll = function() {
            this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1
        }, this.clearSelection = function() {
            this.selection.clearSelection()
        }, this.moveCursorTo = function(e, t) {
            this.selection.moveCursorTo(e, t)
        }, this.moveCursorToPosition = function(e) {
            this.selection.moveCursorToPosition(e)
        }, this.jumpToMatching = function(e) {
            var t = this.getCursorPosition(), i = this.session.getBracketRange(t);
            if (!i) {
                if (i = this.find({needle: /[{}()\[\]]/g,preventScroll: !0,start: {row: t.row,column: t.column - 1}}), !i)
                    return;
                var n = i.start;
                n.row == t.row && Math.abs(n.column - t.column) < 2 && (i = this.session.getBracketRange(n))
            }
            n = i && i.cursor || n, n && (e ? i && i.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(n.row, n.column) : (this.clearSelection(), this.moveCursorTo(n.row, n.column)))
        }, this.gotoLine = function(e, t, i) {
            this.selection.clearSelection(), this.session.unfold({row: e - 1,column: t || 0}), this.$blockScrolling += 1, this.moveCursorTo(e - 1, t || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, i)
        }, this.navigateTo = function(e, t) {
            this.clearSelection(), this.moveCursorTo(e, t)
        }, this.navigateUp = function(e) {
            if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                var t = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(t)
            }
            this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(-e, 0)
        }, this.navigateDown = function(e) {
            if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                var t = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(t)
            }
            this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(e, 0)
        }, this.navigateLeft = function(e) {
            if (this.selection.isEmpty())
                for (e = e || 1; e--; )
                    this.selection.moveCursorLeft();
            else {
                var t = this.getSelectionRange().start;
                this.moveCursorToPosition(t)
            }
            this.clearSelection()
        }, this.navigateRight = function(e) {
            if (this.selection.isEmpty())
                for (e = e || 1; e--; )
                    this.selection.moveCursorRight();
            else {
                var t = this.getSelectionRange().end;
                this.moveCursorToPosition(t)
            }
            this.clearSelection()
        }, this.navigateLineStart = function() {
            this.selection.moveCursorLineStart(), this.clearSelection()
        }, this.navigateLineEnd = function() {
            this.selection.moveCursorLineEnd(), this.clearSelection()
        }, this.navigateFileEnd = function() {
            var e = this.renderer.scrollTop;
            this.selection.moveCursorFileEnd(), this.clearSelection(), this.renderer.animateScrolling(e)
        }, this.navigateFileStart = function() {
            var e = this.renderer.scrollTop;
            this.selection.moveCursorFileStart(), this.clearSelection(), this.renderer.animateScrolling(e)
        }, this.navigateWordRight = function() {
            this.selection.moveCursorWordRight(), this.clearSelection()
        }, this.navigateWordLeft = function() {
            this.selection.moveCursorWordLeft(), this.clearSelection()
        }, this.replace = function(e, t) {
            t && this.$search.set(t);
            var i = this.$search.find(this.session), n = 0;
            return i ? (this.$tryReplace(i, e) && (n = 1), null !== i && (this.selection.setSelectionRange(i), this.renderer.scrollSelectionIntoView(i.start, i.end)), n) : n
        }, this.replaceAll = function(e, t) {
            t && this.$search.set(t);
            var i = this.$search.findAll(this.session), n = 0;
            if (!i.length)
                return n;
            this.$blockScrolling += 1;
            var o = this.getSelectionRange();
            this.clearSelection(), this.selection.moveCursorTo(0, 0);
            for (var r = i.length - 1; r >= 0; --r)
                this.$tryReplace(i[r], e) && n++;
            return this.selection.setSelectionRange(o), this.$blockScrolling -= 1, n
        }, this.$tryReplace = function(e, t) {
            var i = this.session.getTextRange(e);
            return t = this.$search.replace(i, t), null !== t ? (e.end = this.session.replace(e, t), e) : null
        }, this.getLastSearchOptions = function() {
            return this.$search.getOptions()
        }, this.find = function(e, t, n) {
            t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == typeof e && i.mixin(t, e);
            var o = this.selection.getRange();
            null == t.needle && (e = this.session.getTextRange(o) || this.$search.$options.needle, e || (o = this.session.getWordRange(o.start.row, o.start.column), e = this.session.getTextRange(o)), this.$search.set({needle: e})), this.$search.set(t), t.start || this.$search.set({start: o});
            var r = this.$search.find(this.session);
            return t.preventScroll ? r : r ? (this.revealRange(r, n), r) : (t.backwards ? o.start = o.end : o.end = o.start, void this.selection.setRange(o))
        }, this.findNext = function(e, t) {
            this.find({skipCurrent: !0,backwards: !1}, e, t)
        }, this.findPrevious = function(e, t) {
            this.find(e, {skipCurrent: !0,backwards: !0}, t)
        }, this.revealRange = function(e, t) {
            this.$blockScrolling += 1, this.session.unfold(e), this.selection.setSelectionRange(e), this.$blockScrolling -= 1;
            var i = this.renderer.scrollTop;
            this.renderer.scrollSelectionIntoView(e.start, e.end, .5), 0 != t && this.renderer.animateScrolling(i)
        }, this.undo = function() {
            this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
        }, this.redo = function() {
            this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
        }, this.destroy = function() {
            this.renderer.destroy(), this._emit("destroy", this)
        }, this.setAutoScrollEditorIntoView = function(e) {
            if (e !== !1) {
                var t, i = this, n = !1;
                this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
                var o = this.$scrollAnchor;
                o.style.cssText = "position:absolute", this.container.insertBefore(o, this.container.firstChild);
                var r = this.on("changeSelection", function() {
                    n = !0
                }), s = this.renderer.on("beforeRender", function() {
                    n && (t = i.renderer.container.getBoundingClientRect())
                }), a = this.renderer.on("afterRender", function() {
                    if (n && t && i.isFocused()) {
                        var e = i.renderer, r = e.$cursorLayer.$pixelPos, s = e.layerConfig, a = r.top - s.offset;
                        n = r.top >= 0 && a + t.top < 0 ? !0 : r.top < s.height && r.top + t.top + s.lineHeight > window.innerHeight ? !1 : null, null != n && (o.style.top = a + "px", o.style.left = r.left + "px", o.style.height = s.lineHeight + "px", o.scrollIntoView(n)), n = t = null
                    }
                });
                this.setAutoScrollEditorIntoView = function(e) {
                    e !== !0 && (delete this.setAutoScrollEditorIntoView, this.removeEventListener("changeSelection", r), this.renderer.removeEventListener("afterRender", a), this.renderer.removeEventListener("beforeRender", s))
                }
            }
        }, this.$resetCursorStyle = function() {
            var e = this.$cursorStyle || "ace", t = this.renderer.$cursorLayer;
            t && (t.setSmoothBlinking("smooth" == e), t.isBlinking = !this.$readOnly && "wide" != e)
        }
    }).call(v.prototype), f.defineOptions(v.prototype, "editor", {selectionStyle: {set: function(e) {
                this.onSelectionChange(), this._emit("changeSelectionStyle", {data: e})
            },initialValue: "line"},highlightActiveLine: {set: function() {
                this.$updateHighlightActiveLine()
            },initialValue: !0},highlightSelectedWord: {set: function() {
                this.$onSelectionChange()
            },initialValue: !0},readOnly: {set: function() {
                this.$resetCursorStyle()
            },initialValue: !1},cursorStyle: {set: function() {
                this.$resetCursorStyle()
            },values: ["ace", "slim", "smooth", "wide"],initialValue: "ace"},behavioursEnabled: {initialValue: !0},wrapBehavioursEnabled: {initialValue: !0},hScrollBarAlwaysVisible: "renderer",highlightGutterLine: "renderer",animatedScroll: "renderer",showInvisibles: "renderer",showPrintMargin: "renderer",printMarginColumn: "renderer",printMargin: "renderer",fadeFoldWidgets: "renderer",showFoldWidgets: "renderer",showGutter: "renderer",displayIndentGuides: "renderer",fontSize: "renderer",fontFamily: "renderer",scrollSpeed: "$mouseHandler",dragDelay: "$mouseHandler",focusTimout: "$mouseHandler",firstLineNumber: "session",overwrite: "session",newLineMode: "session",useWorker: "session",useSoftTabs: "session",tabSize: "session",wrap: "session",foldStyle: "session"}), t.Editor = v
}), define("ace/lib/lang", ["require", "exports", "module"], function(e, t) {
    t.stringReverse = function(e) {
        return e.split("").reverse().join("")
    }, t.stringRepeat = function(e, t) {
        for (var i = ""; t > 0; )
            1 & t && (i += e), (t >>= 1) && (e += e);
        return i
    };
    var i = /^\s\s*/, n = /\s\s*$/;
    t.stringTrimLeft = function(e) {
        return e.replace(i, "")
    }, t.stringTrimRight = function(e) {
        return e.replace(n, "")
    }, t.copyObject = function(e) {
        var t = {};
        for (var i in e)
            t[i] = e[i];
        return t
    }, t.copyArray = function(e) {
        for (var t = [], i = 0, n = e.length; n > i; i++)
            t[i] = e[i] && "object" == typeof e[i] ? this.copyObject(e[i]) : e[i];
        return t
    }, t.deepCopy = function(e) {
        if ("object" != typeof e)
            return e;
        var t = e.constructor();
        for (var i in e)
            t[i] = "object" == typeof e[i] ? this.deepCopy(e[i]) : e[i];
        return t
    }, t.arrayToMap = function(e) {
        for (var t = {}, i = 0; i < e.length; i++)
            t[e[i]] = 1;
        return t
    }, t.createMap = function(e) {
        var t = Object.create(null);
        for (var i in e)
            t[i] = e[i];
        return t
    }, t.arrayRemove = function(e, t) {
        for (var i = 0; i <= e.length; i++)
            t === e[i] && e.splice(i, 1)
    }, t.escapeRegExp = function(e) {
        return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
    }, t.escapeHTML = function(e) {
        return e.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
    }, t.getMatchOffsets = function(e, t) {
        var i = [];
        return e.replace(t, function(e) {
            i.push({offset: arguments[arguments.length - 2],length: e.length})
        }), i
    }, t.deferredCall = function(e) {
        var t = null, i = function() {
            t = null, e()
        }, n = function(e) {
            return n.cancel(), t = setTimeout(i, e || 0), n
        };
        return n.schedule = n, n.call = function() {
            return this.cancel(), e(), n
        }, n.cancel = function() {
            return clearTimeout(t), t = null, n
        }, n
    }, t.delayedCall = function(e, t) {
        var i = null, n = function() {
            i = null, e()
        }, o = function(e) {
            i && clearTimeout(i), i = setTimeout(n, e || t)
        };
        return o.delay = o, o.schedule = function(e) {
            null == i && (i = setTimeout(n, e || 0))
        }, o.call = function() {
            this.cancel(), e()
        }, o.cancel = function() {
            i && clearTimeout(i), i = null
        }, o.isPending = function() {
            return i
        }, o
    }
}), define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang"], function(e, t) {
    var i = e("../lib/event"), n = e("../lib/useragent"), o = e("../lib/dom"), r = e("../lib/lang"), s = n.isChrome < 18, a = function(e, t) {
        function a(e) {
            if (!m) {
                if (D)
                    t = 0, i = e ? 0 : h.value.length - 1;
                else
                    var t = e ? 2 : 1, i = 2;
                try {
                    h.setSelectionRange(t, i)
                } catch (n) {
                }
            }
        }
        function l() {
            m || (h.value = d, n.isWebKit && k.schedule())
        }
        function c() {
            setTimeout(function() {
                f && (h.style.cssText = f, f = ""), null == t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor())
            }, 0)
        }
        var h = o.createElement("textarea");
        h.className = "ace_text-input", n.isTouchPad && h.setAttribute("x-palm-disable-auto-cap", !0), h.wrap = "off", h.autocorrect = "off", h.autocapitalize = "off", h.spellcheck = !1, h.style.bottom = "2000em", e.insertBefore(h, e.firstChild);
        var d = "", u = !1, p = !1, g = !1, m = !1, f = "", v = !0;
        try {
            var b = document.activeElement === h
        } catch (w) {
        }
        i.addListener(h, "blur", function() {
            t.onBlur(), b = !1
        }), i.addListener(h, "focus", function() {
            b = !0, t.onFocus(), a()
        }), this.focus = function() {
            h.focus()
        }, this.blur = function() {
            h.blur()
        }, this.isFocused = function() {
            return b
        };
        var C = r.delayedCall(function() {
            b && a(v)
        }), k = r.delayedCall(function() {
            m || (h.value = d, b && a())
        });
        n.isWebKit || t.addEventListener("changeSelection", function() {
            t.selection.isEmpty() != v && (v = !v, C.schedule())
        }), l(), b && t.onFocus();
        var y = function(e) {
            return 0 === e.selectionStart && e.selectionEnd === e.value.length
        };
        if (!h.setSelectionRange && h.createTextRange && (h.setSelectionRange = function(e, t) {
            var i = this.createTextRange();
            i.collapse(!0), i.moveStart("character", e), i.moveEnd("character", t), i.select()
        }, y = function(e) {
            try {
                var t = e.ownerDocument.selection.createRange()
            } catch (i) {
            }
            return t && t.parentElement() == e ? t.text == e.value : !1
        }), n.isOldIE) {
            var E = !1, S = function(e) {
                if (!E) {
                    var t = h.value;
                    if (!m && t && t != d)
                        return e && t == d[0] ? A.schedule() : (B(t), E = !0, l(), E = !1, void 0)
                }
            }, A = r.delayedCall(S);
            i.addListener(h, "propertychange", S);
            var x = {13: 1,27: 1};
            i.addListener(h, "keyup", function(e) {
                m && (!h.value || x[e.keyCode]) && setTimeout(P, 0), (h.value.charCodeAt(0) || 0) < 129 || (m ? N() : I())
            })
        }
        var F = function() {
            u ? u = !1 : p ? p = !1 : y(h) ? (t.selectAll(), a()) : D && a(t.selection.isEmpty())
        }, D = null;
        this.setInputHandler = function(e) {
            D = e
        }, this.getInputHandler = function() {
            return D
        };
        var L = !1, B = function(e) {
            D && (e = D(e), D = null), g ? (a(), e && t.onPaste(e), g = !1) : e == d[0] ? L && t.execCommand("del", {source: "ace"}) : (e.substring(0, 2) == d ? e = e.substr(2) : e[0] == d[0] ? e = e.substr(1) : e[e.length - 1] == d[0] && (e = e.slice(0, -1)), e[e.length - 1] == d[0] && (e = e.slice(0, -1)), e && t.onTextInput(e)), L && (L = !1)
        }, T = function() {
            if (!m) {
                var e = h.value;
                B(e), l()
            }
        }, _ = function(e) {
            var n = t.getCopyText();
            if (!n)
                return void i.preventDefault(e);
            var o = e.clipboardData || window.clipboardData;
            if (o && !s) {
                var r = o.setData("Text", n);
                r && (t.onCut(), i.preventDefault(e))
            }
            r || (u = !0, h.value = n, h.select(), setTimeout(function() {
                u = !1, l(), a(), t.onCut()
            }))
        }, M = function(e) {
            var n = t.getCopyText();
            if (!n)
                return void i.preventDefault(e);
            var o = e.clipboardData || window.clipboardData;
            if (o && !s) {
                var r = o.setData("Text", n);
                r && (t.onCopy(), i.preventDefault(e))
            }
            r || (p = !0, h.value = n, h.select(), setTimeout(function() {
                p = !1, l(), a(), t.onCopy()
            }))
        }, R = function(e) {
            var o = e.clipboardData || window.clipboardData;
            if (o) {
                var r = o.getData("Text");
                r && t.onPaste(r), n.isIE && setTimeout(a), i.preventDefault(e)
            } else
                h.value = "", g = !0
        };
        i.addCommandKeyListener(h, t.onCommandKey.bind(t)), i.addListener(h, "select", F), i.addListener(h, "input", T), i.addListener(h, "cut", _), i.addListener(h, "copy", M), i.addListener(h, "paste", R), !("oncut" in h && "oncopy" in h && "onpaste" in h || !i.addListener(e, "keydown", function(e) {
            if ((!n.isMac || e.metaKey) && e.ctrlKey)
                switch (e.keyCode) {
                    case 67:
                        M(e);
                        break;
                    case 86:
                        R(e);
                        break;
                    case 88:
                        _(e)
                }
        }));
        var I = function() {
            m = {}, t.onCompositionStart(), setTimeout(N, 0), t.on("mousedown", P), t.selection.isEmpty() || (t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection()), t.session.markUndoGroup()
        }, N = function() {
            if (m && (t.onCompositionUpdate(h.value), m.lastValue && t.undo(), m.lastValue = h.value.replace(/\x01/g, ""), m.lastValue)) {
                var e = t.selection.getRange();
                t.insert(m.lastValue), t.session.markUndoGroup(), m.range = t.selection.getRange(), t.selection.setRange(e), t.selection.clearSelection()
            }
        }, P = function(e) {
            var i = m;
            m = !1;
            var n = setTimeout(function() {
                var e = h.value.replace(/\x01/g, "");
                !m && e == i.lastValue && l()
            });
            D = function(e) {
                return clearTimeout(n), e = e.replace(/\x01/g, ""), e == i.lastValue ? "" : (e || i.lastValue && t.undo(), e)
            }, t.onCompositionEnd(), t.removeListener("mousedown", P), "compositionend" == e.type && t.selection.setRange(i.range)
        }, $ = r.delayedCall(N, 50);
        i.addListener(h, "compositionstart", I), i.addListener(h, n.isGecko ? "text" : "keyup", function() {
            $.schedule()
        }), i.addListener(h, "compositionend", P), this.getElement = function() {
            return h
        }, this.setReadOnly = function(e) {
            h.readOnly = e
        }, this.onContextMenu = function(e) {
            L = !0, f || (f = h.style.cssText), h.style.cssText = "z-index:100000;" + (n.isIE ? "opacity:0.1;" : ""), a(t.selection.isEmpty()), t._emit("nativecontextmenu", {target: t});
            var r = t.container.getBoundingClientRect(), s = o.computedStyle(t.container), l = r.top + (parseInt(s.borderTopWidth) || 0), d = r.left + (parseInt(r.borderLeftWidth) || 0), u = r.bottom - l - h.clientHeight, p = function(e) {
                h.style.left = e.clientX - d - 2 + "px", h.style.top = Math.min(e.clientY - l - 2, u) + "px"
            };
            p(e), "mousedown" == e.type && (t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = null), n.isWin && i.capture(t.container, p, c))
        }, this.onContextMenuClose = c, n.isGecko || i.addListener(h, "contextmenu", function(e) {
            t.textInput.onContextMenu(e), c()
        })
    };
    t.TextInput = a
}), define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop", "ace/config"], function(e, t) {
    var i = e("../lib/event"), n = e("../lib/useragent"), o = e("./default_handlers").DefaultHandlers, r = e("./default_gutter_handler").GutterHandler, s = e("./mouse_event").MouseEvent, a = e("./dragdrop").DragdropHandler, l = e("../config"), c = function(e) {
        this.editor = e, new o(this), new r(this), new a(this), i.addListener(e.container, "mousedown", function(t) {
            return e.focus(), i.preventDefault(t)
        });
        var t = e.renderer.getMouseEventTarget();
        i.addListener(t, "click", this.onMouseEvent.bind(this, "click")), i.addListener(t, "mousemove", this.onMouseMove.bind(this, "mousemove")), i.addMultiMouseDownListener(t, [300, 300, 250], this, "onMouseEvent"), i.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel"));
        var n = e.renderer.$gutter;
        i.addListener(n, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), i.addListener(n, "click", this.onMouseEvent.bind(this, "gutterclick")), i.addListener(n, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), i.addListener(n, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"))
    };
    (function() {
        this.onMouseEvent = function(e, t) {
            this.editor._emit(e, new s(t, this.editor))
        }, this.onMouseMove = function(e, t) {
            var i = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
            i && i.length && this.editor._emit(e, new s(t, this.editor))
        }, this.onMouseWheel = function(e, t) {
            var i = new s(t, this.editor);
            i.speed = 2 * this.$scrollSpeed, i.wheelX = t.wheelX, i.wheelY = t.wheelY, this.editor._emit(e, i)
        }, this.setState = function(e) {
            this.state = e
        }, this.captureMouse = function(e, t) {
            t && this.setState(t), this.x = e.x, this.y = e.y, this.isMousePressed = !0;
            var o = this.editor.renderer;
            o.$keepTextAreaAtCursor && (o.$keepTextAreaAtCursor = null);
            var r = this, s = function(e) {
                r.x = e.clientX, r.y = e.clientY
            }, a = function(e) {
                clearInterval(c), l(), r[r.state + "End"] && r[r.state + "End"](e), r.$clickSelection = null, null == o.$keepTextAreaAtCursor && (o.$keepTextAreaAtCursor = !0, o.$moveTextAreaToCursor()), r.isMousePressed = !1, r.onMouseEvent("mouseup", e)
            }, l = function() {
                r[r.state] && r[r.state]()
            };
            if (n.isOldIE && "dblclick" == e.domEvent.type)
                return setTimeout(function() {
                    a(e.domEvent)
                });
            i.capture(this.editor.container, s, a);
            var c = setInterval(l, 20)
        }
    }).call(c.prototype), l.defineOptions(c.prototype, "mouseHandler", {scrollSpeed: {initialValue: 2},dragDelay: {initialValue: 150},focusTimout: {initialValue: 0}}), t.MouseHandler = c
}), define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/useragent"], function(e, t) {
    function i(e) {
        e.$clickSelection = null;
        var t = e.editor;
        t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
        var i = ["select", "startSelect", "drag", "dragEnd", "dragWait", "dragWaitEnd", "startDrag", "focusWait"];
        i.forEach(function(t) {
            e[t] = this[t]
        }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
    }
    function n(e, t, i, n) {
        return Math.sqrt(Math.pow(i - e, 2) + Math.pow(n - t, 2))
    }
    function o(e, t) {
        if (e.start.row == e.end.row)
            var i = 2 * t.column - e.start.column - e.end.column;
        else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column)
            var i = 2 * t.row - e.start.row - e.end.row;
        else
            var i = t.column - 4;
        return 0 > i ? {cursor: e.start,anchor: e.end} : {cursor: e.end,anchor: e.start}
    }
    var r = e("../lib/dom"), s = (e("../lib/useragent"), 0);
    (function() {
        this.onMouseDown = function(e) {
            var t = e.inSelection(), i = e.getDocumentPosition();
            this.mousedownEvent = e;
            var n = this.editor, o = e.getButton();
            if (0 !== o) {
                var r = n.getSelectionRange(), s = r.isEmpty();
                return s && (n.moveCursorToPosition(i), n.selection.clearSelection()), void n.textInput.onContextMenu(e.domEvent)
            }
            return !t || n.isFocused() || (n.focus(), !this.$focusTimout || this.$clickSelection || n.inMultiSelectMode) ? (!t || this.$clickSelection || e.getShiftKey() || n.inMultiSelectMode ? this.startSelect(i) : t && (this.mousedownEvent.time = (new Date).getTime(), this.setState("dragWait")), this.captureMouse(e), e.preventDefault()) : (this.setState("focusWait"), this.captureMouse(e), e.preventDefault())
        }, this.startSelect = function(e) {
            e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y), this.mousedownEvent.getShiftKey() ? this.editor.selection.selectToPosition(e) : this.$clickSelection || (this.editor.moveCursorToPosition(e), this.editor.selection.clearSelection()), this.setState("select")
        }, this.select = function() {
            var e, t = this.editor, i = t.renderer.screenToTextCoordinates(this.x, this.y);
            if (this.$clickSelection) {
                var n = this.$clickSelection.comparePoint(i);
                if (-1 == n)
                    e = this.$clickSelection.end;
                else if (1 == n)
                    e = this.$clickSelection.start;
                else {
                    var r = o(this.$clickSelection, i);
                    i = r.cursor, e = r.anchor
                }
                t.selection.setSelectionAnchor(e.row, e.column)
            }
            t.selection.selectToPosition(i), t.renderer.scrollCursorIntoView()
        }, this.extendSelectionBy = function(e) {
            var t, i = this.editor, n = i.renderer.screenToTextCoordinates(this.x, this.y), r = i.selection[e](n.row, n.column);
            if (this.$clickSelection) {
                var s = this.$clickSelection.comparePoint(r.start), a = this.$clickSelection.comparePoint(r.end);
                if (-1 == s && 0 >= a)
                    t = this.$clickSelection.end, (r.end.row != n.row || r.end.column != n.column) && (n = r.start);
                else if (1 == a && s >= 0)
                    t = this.$clickSelection.start, (r.start.row != n.row || r.start.column != n.column) && (n = r.end);
                else if (-1 == s && 1 == a)
                    n = r.end, t = r.start;
                else {
                    var l = o(this.$clickSelection, n);
                    n = l.cursor, t = l.anchor
                }
                i.selection.setSelectionAnchor(t.row, t.column)
            }
            i.selection.selectToPosition(n), i.renderer.scrollCursorIntoView()
        }, this.startDrag = function() {
            var e = this.editor;
            this.setState("drag"), this.dragRange = e.getSelectionRange();
            var t = e.getSelectionStyle();
            this.dragSelectionMarker = e.session.addMarker(this.dragRange, "ace_selection", t), e.clearSelection(), r.addCssClass(e.container, "ace_dragging"), this.$dragKeybinding || (this.$dragKeybinding = {handleKeyboard: function(e, t, i) {
                    return "esc" == i ? {command: this.command} : void 0
                },command: {exec: function(e) {
                        var t = e.$mouseHandler;
                        t.dragCursor = null, t.dragEnd(), t.startSelect()
                    }}}), e.keyBinding.addKeyboardHandler(this.$dragKeybinding)
        }, this.focusWait = function() {
            var e = n(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y), t = (new Date).getTime();
            (e > s || t - this.mousedownEvent.time > this.$focusTimout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
        }, this.dragWait = function() {
            var e = n(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y), t = (new Date).getTime(), i = this.editor;
            e > s ? this.startSelect(this.mousedownEvent.getDocumentPosition()) : t - this.mousedownEvent.time > i.$mouseHandler.$dragDelay && this.startDrag()
        }, this.dragWaitEnd = function(e) {
            this.mousedownEvent.domEvent = e, this.startSelect()
        }, this.drag = function() {
            var e = this.editor;
            this.dragCursor = e.renderer.screenToTextCoordinates(this.x, this.y), e.moveCursorToPosition(this.dragCursor), e.renderer.scrollCursorIntoView()
        }, this.dragEnd = function(e) {
            var t = this.editor, i = this.dragCursor, n = this.dragRange;
            if (r.removeCssClass(t.container, "ace_dragging"), t.session.removeMarker(this.dragSelectionMarker), t.keyBinding.removeKeyboardHandler(this.$dragKeybinding), i) {
                if (t.clearSelection(), e && (e.ctrlKey || e.altKey)) {
                    var o = t.session, s = n;
                    s.end = o.insert(i, o.getTextRange(n)), s.start = i
                } else {
                    if (n.contains(i.row, i.column))
                        return;
                    var s = t.moveText(n, i)
                }
                s && t.selection.setSelectionRange(s)
            }
        }, this.onDoubleClick = function(e) {
            var t = e.getDocumentPosition(), i = this.editor, n = i.session, o = n.getBracketRange(t);
            return o ? (o.isEmpty() && (o.start.column--, o.end.column++), this.$clickSelection = o, this.setState("select"), void 0) : (this.$clickSelection = i.selection.getWordRange(t.row, t.column), void this.setState("selectByWords"))
        }, this.onTripleClick = function(e) {
            var t = e.getDocumentPosition(), i = this.editor;
            this.setState("selectByLines"), this.$clickSelection = i.selection.getLineRange(t.row)
        }, this.onQuadClick = function() {
            var e = this.editor;
            e.selectAll(), this.$clickSelection = e.getSelectionRange(), this.setState("null")
        }, this.onMouseWheel = function(e) {
            if (!e.getShiftKey() && !e.getAccelKey()) {
                var t = e.domEvent.timeStamp, i = t - (this.$lastScrollTime || 0), n = this.editor, o = n.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed);
                return o || 200 > i ? (this.$lastScrollTime = t, n.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
            }
        }
    }).call(i.prototype), t.DefaultHandlers = i
}), define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event"], function(e, t) {
    function i(e) {
        function t() {
            d = n.createElement("div"), d.className = "ace_gutter-tooltip", d.style.display = "none", a.container.appendChild(d)
        }
        function i() {
            d || t();
            var e = h.getDocumentPosition().row, i = l.$annotations[e];
            if (!i)
                return r();
            var n = a.session.getLength();
            if (e == n) {
                var o = a.renderer.pixelToScreenCoordinates(0, h.y).row, c = h.$pos;
                if (o > a.session.documentToScreenRow(c.row, c.column))
                    return r()
            }
            u != i && (u = i.text.join("<br/>"), d.style.display = "block", d.innerHTML = u, a.on("mousewheel", r), s(h))
        }
        function r() {
            c && (c = clearTimeout(c)), u && (d.style.display = "none", u = null, a.removeEventListener("mousewheel", r))
        }
        function s(e) {
            var t = a.renderer.$gutter.getBoundingClientRect();
            d.style.left = e.x + 15 + "px", e.y + 3 * a.renderer.lineHeight + 15 < t.bottom ? (d.style.bottom = "", d.style.top = e.y + 15 + "px") : (d.style.top = "", d.style.bottom = t.bottom - e.y + 5 + "px")
        }
        var a = e.editor, l = a.renderer.$gutterLayer;
        e.editor.setDefaultHandler("guttermousedown", function(t) {
            if (a.isFocused()) {
                var i = l.getRegion(t);
                if ("foldWidgets" != i) {
                    var n = t.getDocumentPosition().row, o = a.session.selection;
                    if (t.getShiftKey())
                        o.selectTo(n, 0);
                    else {
                        if (2 == t.domEvent.detail)
                            return a.selectAll(), t.preventDefault();
                        e.$clickSelection = a.selection.getLineRange(n)
                    }
                    return e.captureMouse(t, "selectByLines"), t.preventDefault()
                }
            }
        });
        var c, h, d, u;
        e.editor.setDefaultHandler("guttermousemove", function(t) {
            var o = t.domEvent.target || t.domEvent.srcElement;
            return n.hasCssClass(o, "ace_fold-widget") ? r() : (u && s(t), h = t, void (c || (c = setTimeout(function() {
                c = null, h && !e.isMousePressed ? i() : r()
            }, 50))))
        }), o.addListener(a.renderer.$gutter, "mouseout", function() {
            h = null, u && !c && (c = setTimeout(function() {
                c = null, r()
            }, 50))
        })
    }
    var n = e("../lib/dom"), o = e("../lib/event");
    t.GutterHandler = i
}), define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(e, t) {
    var i = e("../lib/event"), n = e("../lib/useragent"), o = t.MouseEvent = function(e, t) {
        this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
    };
    (function() {
        this.stopPropagation = function() {
            i.stopPropagation(this.domEvent), this.propagationStopped = !0
        }, this.preventDefault = function() {
            i.preventDefault(this.domEvent), this.defaultPrevented = !0
        }, this.stop = function() {
            this.stopPropagation(), this.preventDefault()
        }, this.getDocumentPosition = function() {
            return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
        }, this.inSelection = function() {
            if (null !== this.$inSelection)
                return this.$inSelection;
            var e = this.editor;
            if (e.getReadOnly())
                this.$inSelection = !1;
            else {
                var t = e.getSelectionRange();
                if (t.isEmpty())
                    this.$inSelection = !1;
                else {
                    var i = this.getDocumentPosition();
                    this.$inSelection = t.contains(i.row, i.column)
                }
            }
            return this.$inSelection
        }, this.getButton = function() {
            return i.getButton(this.domEvent)
        }, this.getShiftKey = function() {
            return this.domEvent.shiftKey
        }, this.getAccelKey = n.isMac ? function() {
            return this.domEvent.metaKey
        } : function() {
            return this.domEvent.ctrlKey
        }
    }).call(o.prototype)
}), define("ace/mouse/dragdrop", ["require", "exports", "module", "ace/lib/event"], function(e, t) {
    var i = e("../lib/event"), n = function(e) {
        function t() {
            c = d.selection.toOrientedRange(), r = d.session.addMarker(c, "ace_selection", d.getSelectionStyle()), d.clearSelection(), clearInterval(l), l = setInterval(g, 20), u = 0, i.addListener(document, "mousemove", o)
        }
        function n() {
            clearInterval(l), d.session.removeMarker(r), r = null, d.selection.fromOrientedRange(c), u = 0, i.removeListener(document, "mousemove", o)
        }
        function o() {
            null == m && (m = setTimeout(function() {
                null != m && r && n()
            }, 20))
        }
        var r, s, a, l, c, h, d = e.editor, u = 0, p = d.container;
        i.addListener(p, "dragenter", function(e) {
            if (!d.getReadOnly()) {
                var n = e.dataTransfer.types;
                if (!n || -1 !== Array.prototype.indexOf.call(n, "text/plain"))
                    return r || t(), u++, i.preventDefault(e)
            }
        }), i.addListener(p, "dragover", function(e) {
            if (!d.getReadOnly()) {
                var t = e.dataTransfer.types;
                if (!t || -1 !== Array.prototype.indexOf.call(t, "text/plain"))
                    return null !== m && (m = null), s = e.clientX, a = e.clientY, i.preventDefault(e)
            }
        });
        var g = function() {
            h = d.renderer.screenToTextCoordinates(s, a), d.moveCursorToPosition(h), d.renderer.scrollCursorIntoView()
        };
        i.addListener(p, "dragleave", function(e) {
            return u--, 0 >= u && r ? (n(), i.preventDefault(e)) : void 0
        }), i.addListener(p, "drop", function(e) {
            return r ? (c.end = d.session.insert(h, e.dataTransfer.getData("Text")), c.start = h, n(), d.focus(), i.preventDefault(e)) : void 0
        });
        var m = null
    };
    t.DragdropHandler = n
}), define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter"], function(e, t, i) {
    "no use strict";
    function n(e) {
        return e.replace(/-(.)/g, function(e, t) {
            return t.toUpperCase()
        })
    }
    var o = e("./lib/lang"), r = e("./lib/oop"), s = e("./lib/net"), a = e("./lib/event_emitter").EventEmitter, l = function() {
        return this
    }(), c = {packaged: !1,workerPath: null,modePath: null,themePath: null,basePath: "",suffix: ".js",$moduleUrls: {}};
    t.get = function(e) {
        if (!c.hasOwnProperty(e))
            throw new Error("Unknown config key: " + e);
        return c[e]
    }, t.set = function(e, t) {
        if (!c.hasOwnProperty(e))
            throw new Error("Unknown config key: " + e);
        c[e] = t
    }, t.all = function() {
        return o.copyObject(c)
    }, r.implement(t, a), t.moduleUrl = function(e, t) {
        if (c.$moduleUrls[e])
            return c.$moduleUrls[e];
        var i = e.split("/");
        t = t || i[i.length - 2] || "";
        var n = i[i.length - 1].replace(t, "").replace(/(^[\-_])|([\-_]$)/, "");
        !n && i.length > 1 && (n = i[i.length - 2]);
        var o = c[t + "Path"];
        return null == o && (o = c.basePath), o && "/" != o.slice(-1) && (o += "/"), o + t + "-" + n + this.get("suffix")
    }, t.setModuleUrl = function(e, t) {
        return c.$moduleUrls[e] = t
    }, t.$loading = {}, t.loadModule = function(i, n) {
        var o, r;
        Array.isArray(i) && (r = i[0], i = i[1]);
        try {
            o = e(i)
        } catch (a) {
        }
        if (o && !t.$loading[i])
            return n && n(o);
        if (t.$loading[i] || (t.$loading[i] = []), t.$loading[i].push(n), !(t.$loading[i].length > 1)) {
            var l = function() {
                e([i], function(e) {
                    t._emit("load.module", {name: i,module: e});
                    var n = t.$loading[i];
                    t.$loading[i] = null, n.forEach(function(t) {
                        t && t(e)
                    })
                })
            };
            return t.get("packaged") ? void s.loadScript(t.moduleUrl(i, r), l) : l()
        }
    }, t.init = function() {
        if (c.packaged = e.packaged || i.packaged || l.define && define.packaged, !l.document)
            return "";
        for (var o = {}, r = "", s = document.getElementsByTagName("script"), a = 0; a < s.length; a++) {
            var h = s[a], d = h.src || h.getAttribute("src");
            if (d) {
                for (var u = h.attributes, p = 0, g = u.length; g > p; p++) {
                    var m = u[p];
                    0 === m.name.indexOf("data-ace-") && (o[n(m.name.replace(/^data-ace-/, ""))] = m.value)
                }
                var f = d.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                f && (r = f[1])
            }
        }
        r && (o.base = o.base || r, o.packaged = !0), o.basePath = o.base, o.workerPath = o.workerPath || o.base, o.modePath = o.modePath || o.base, o.themePath = o.themePath || o.base, delete o.base;
        for (var v in o)
            "undefined" != typeof o[v] && t.set(v, o[v])
    };
    var h = {setOptions: function(e) {
            Object.keys(e).forEach(function(t) {
                this.setOption(t, e[t])
            }, this)
        },getOptions: function(e) {
            var t = {};
            return Object.keys(e).forEach(function(e) {
                t[e] = this.getOption(e)
            }, this), t
        },setOption: function(e, t) {
            if (this["$" + e] !== t) {
                var i = this.$options[e];
                return i ? i.forwardTo ? this[i.forwardTo] && this[i.forwardTo].setOption(e, t) : (i.handlesSet || (this["$" + e] = t), void (i && i.set && i.set.call(this, t))) : void 0
            }
        },getOption: function(e) {
            var t = this.$options[e];
            return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : void 0
        }}, d = {};
    t.defineOptions = function(e, t, i) {
        return e.$options || (d[t] = e.$options = {}), Object.keys(i).forEach(function(t) {
            var n = i[t];
            "string" == typeof n && (n = {forwardTo: n}), n.name || (n.name = t), e.$options[n.name] = n, "initialValue" in n && (e["$" + n.name] = n.initialValue)
        }), r.implement(e, h), this
    }, t.resetOptions = function(e) {
        Object.keys(e.$options).forEach(function(t) {
            var i = e.$options[t];
            "value" in i && e.setOption(t, i.value)
        })
    }, t.setDefaultValue = function(e, i, n) {
        var o = d[e] || (d[e] = {});
        o[i] && (o.forwardTo ? t.setDefaultValue(o.forwardTo, i, n) : o[i].value = n)
    }, t.setDefaultValues = function(e, i) {
        Object.keys(i).forEach(function(n) {
            t.setDefaultValue(e, n, i[n])
        })
    }
}), define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
    var i = e("./dom");
    t.get = function(e, t) {
        var i = new XMLHttpRequest;
        i.open("GET", e, !0), i.onreadystatechange = function() {
            4 === i.readyState && t(i.responseText)
        }, i.send(null)
    }, t.loadScript = function(e, t) {
        var n = i.getDocumentHead(), o = document.createElement("script");
        o.src = e, n.appendChild(o), o.onload = o.onreadystatechange = function(e, i) {
            (i || !o.readyState || "loaded" == o.readyState || "complete" == o.readyState) && (o = o.onload = o.onreadystatechange = null, i || t())
        }
    }
}), define("ace/lib/event_emitter", ["require", "exports", "module"], function(e, t) {
    var i = {}, n = function() {
        this.propagationStopped = !0
    }, o = function() {
        this.defaultPrevented = !0
    };
    i._emit = i._dispatchEvent = function(e, t) {
        this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
        var i = this._eventRegistry[e] || [], r = this._defaultHandlers[e];
        if (i.length || r) {
            "object" == typeof t && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = n), t.preventDefault || (t.preventDefault = o);
            for (var s = 0; s < i.length && (i[s](t, this), !t.propagationStopped); s++)
                ;
            return r && !t.defaultPrevented ? r(t, this) : void 0
        }
    }, i._signal = function(e, t) {
        var i = (this._eventRegistry || {})[e];
        if (i)
            for (var n = 0; n < i.length; n++)
                i[n](t, this)
    }, i.once = function(e, t) {
        var i = this;
        t && this.addEventListener(e, function n() {
            i.removeEventListener(e, n), t.apply(null, arguments)
        })
    }, i.setDefaultHandler = function(e, t) {
        if (this._defaultHandlers = this._defaultHandlers || {}, this._defaultHandlers[e])
            throw new Error("The default handler for '" + e + "' is already set");
        this._defaultHandlers[e] = t
    }, i.on = i.addEventListener = function(e, t, i) {
        this._eventRegistry = this._eventRegistry || {};
        var n = this._eventRegistry[e];
        return n || (n = this._eventRegistry[e] = []), -1 == n.indexOf(t) && n[i ? "unshift" : "push"](t), t
    }, i.off = i.removeListener = i.removeEventListener = function(e, t) {
        this._eventRegistry = this._eventRegistry || {};
        var i = this._eventRegistry[e];
        if (i) {
            var n = i.indexOf(t);
            -1 !== n && i.splice(n, 1)
        }
    }, i.removeAllListeners = function(e) {
        this._eventRegistry && (this._eventRegistry[e] = [])
    }, t.EventEmitter = i
}), define("ace/mouse/fold_handler", ["require", "exports", "module"], function(e, t) {
    function i(e) {
        e.on("click", function(t) {
            var i = t.getDocumentPosition(), n = e.session, o = n.getFoldAt(i.row, i.column, 1);
            o && (t.getAccelKey() ? n.removeFold(o) : n.expandFold(o), t.stop())
        }), e.on("gutterclick", function(t) {
            var i = e.renderer.$gutterLayer.getRegion(t);
            if ("foldWidgets" == i) {
                var n = t.getDocumentPosition().row, o = e.session;
                o.foldWidgets && o.foldWidgets[n] && e.session.onFoldWidgetClick(n, t), e.isFocused() || e.focus(), t.stop()
            }
        }), e.on("gutterdblclick", function(t) {
            var i = e.renderer.$gutterLayer.getRegion(t);
            if ("foldWidgets" == i) {
                var n = t.getDocumentPosition().row, o = e.session, r = o.getParentFoldRangeData(n, !0), s = r.range || r.firstRange;
                if (s) {
                    var n = s.start.row, a = o.getFoldAt(n, o.getLine(n).length, 1);
                    a ? o.removeFold(a) : (o.addFold("...", s), e.renderer.scrollCursorIntoView({row: s.start.row,column: 0}))
                }
                t.stop()
            }
        })
    }
    t.FoldHandler = i
}), define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function(e, t) {
    var i = e("../lib/keys"), n = e("../lib/event"), o = function(e) {
        this.$editor = e, this.$data = {}, this.$handlers = [], this.setDefaultHandler(e.commands)
    };
    (function() {
        this.setDefaultHandler = function(e) {
            this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0), this.$data = {editor: this.$editor}
        }, this.setKeyboardHandler = function(e) {
            var t = this.$handlers;
            if (t[t.length - 1] != e) {
                for (; t[t.length - 1] && t[t.length - 1] != this.$defaultHandler; )
                    this.removeKeyboardHandler(t[t.length - 1]);
                this.addKeyboardHandler(e, 1)
            }
        }, this.addKeyboardHandler = function(e, t) {
            if (e) {
                var i = this.$handlers.indexOf(e);
                -1 != i && this.$handlers.splice(i, 1), void 0 == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == i && e.attach && e.attach(this.$editor)
            }
        }, this.removeKeyboardHandler = function(e) {
            var t = this.$handlers.indexOf(e);
            return -1 == t ? !1 : (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0)
        }, this.getKeyboardHandler = function() {
            return this.$handlers[this.$handlers.length - 1]
        }, this.$callKeyboardHandlers = function(e, t, i, o) {
            for (var r, s = !1, a = this.$editor.commands, l = this.$handlers.length; l-- && (r = this.$handlers[l].handleKeyboard(this.$data, e, t, i, o), !(r && r.command && (s = "null" == r.command ? 1 != r.passEvent : a.exec(r.command, this.$editor, r.args, o), s && o && -1 != e && n.stopEvent(o), s))); )
                ;
            return s
        }, this.onCommandKey = function(e, t, n) {
            var o = i.keyCodeToString(n);
            this.$callKeyboardHandlers(t, o, n, e)
        }, this.onTextInput = function(e) {
            var t = this.$callKeyboardHandlers(-1, e);
            t || this.$editor.commands.exec("insertstring", this.$editor, e)
        }
    }).call(o.prototype), t.KeyBinding = o
}), define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/lang"), o = e("./config"), r = e("./lib/event_emitter").EventEmitter, s = e("./selection").Selection, a = e("./mode/text").Mode, l = e("./range").Range, c = e("./document").Document, h = e("./background_tokenizer").BackgroundTokenizer, d = e("./search_highlight").SearchHighlight, u = function(e, t) {
        this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.$foldData.toString = function() {
            return this.join("\n")
        }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof e && e.getLine || (e = new c(e)), this.setDocument(e), this.selection = new s(this), o.resetOptions(this), this.setMode(t), o._emit("session", this)
    };
    (function() {
        function t(e) {
            return 4352 > e ? !1 : e >= 4352 && 4447 >= e || e >= 4515 && 4519 >= e || e >= 4602 && 4607 >= e || e >= 9001 && 9002 >= e || e >= 11904 && 11929 >= e || e >= 11931 && 12019 >= e || e >= 12032 && 12245 >= e || e >= 12272 && 12283 >= e || e >= 12288 && 12350 >= e || e >= 12353 && 12438 >= e || e >= 12441 && 12543 >= e || e >= 12549 && 12589 >= e || e >= 12593 && 12686 >= e || e >= 12688 && 12730 >= e || e >= 12736 && 12771 >= e || e >= 12784 && 12830 >= e || e >= 12832 && 12871 >= e || e >= 12880 && 13054 >= e || e >= 13056 && 19903 >= e || e >= 19968 && 42124 >= e || e >= 42128 && 42182 >= e || e >= 43360 && 43388 >= e || e >= 44032 && 55203 >= e || e >= 55216 && 55238 >= e || e >= 55243 && 55291 >= e || e >= 63744 && 64255 >= e || e >= 65040 && 65049 >= e || e >= 65072 && 65106 >= e || e >= 65108 && 65126 >= e || e >= 65128 && 65131 >= e || e >= 65281 && 65376 >= e || e >= 65504 && 65510 >= e
        }
        i.implement(this, r), this.setDocument = function(e) {
            this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
        }, this.getDocument = function() {
            return this.doc
        }, this.$resetRowCache = function(e) {
            if (!e)
                return this.$docRowCache = [], void (this.$screenRowCache = []);
            var t = this.$docRowCache.length, i = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
            t > i && (this.$docRowCache.splice(i, t), this.$screenRowCache.splice(i, t))
        }, this.$getRowCacheIndex = function(e, t) {
            for (var i = 0, n = e.length - 1; n >= i; ) {
                var o = i + n >> 1, r = e[o];
                if (t > r)
                    i = o + 1;
                else {
                    if (!(r > t))
                        return o;
                    n = o - 1
                }
            }
            return i - 1
        }, this.resetCaches = function() {
            this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
        }, this.onChangeFold = function(e) {
            var t = e.data;
            this.$resetRowCache(t.start.row)
        }, this.onChange = function(e) {
            var t = e.data;
            this.$modified = !0, this.$resetRowCache(t.range.start.row);
            var i = this.$updateInternalDataOnChange(e);
            !this.$fromUndo && this.$undoManager && !t.ignore && (this.$deltasDoc.push(t), i && 0 != i.length && this.$deltasFold.push({action: "removeFolds",folds: i}), this.$informUndoManager.schedule()), this.bgTokenizer.$updateOnChange(t), this._emit("change", e)
        }, this.setValue = function(e) {
            this.doc.setValue(e), this.selection.moveCursorTo(0, 0), this.selection.clearSelection(), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.getUndoManager().reset()
        }, this.getValue = this.toString = function() {
            return this.doc.getValue()
        }, this.getSelection = function() {
            return this.selection
        }, this.getState = function(e) {
            return this.bgTokenizer.getState(e)
        }, this.getTokens = function(e) {
            return this.bgTokenizer.getTokens(e)
        }, this.getTokenAt = function(e, t) {
            var i, n = this.bgTokenizer.getTokens(e), o = 0;
            if (null == t)
                r = n.length - 1, o = this.getLine(e).length;
            else
                for (var r = 0; r < n.length && (o += n[r].value.length, !(o >= t)); r++)
                    ;
            return i = n[r], i ? (i.index = r, i.start = o - i.value.length, i) : null
        }, this.setUndoManager = function(e) {
            if (this.$undoManager = e, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel(), e) {
                var t = this;
                this.$syncInformUndoManager = function() {
                    t.$informUndoManager.cancel(), t.$deltasFold.length && (t.$deltas.push({group: "fold",deltas: t.$deltasFold}), t.$deltasFold = []), t.$deltasDoc.length && (t.$deltas.push({group: "doc",deltas: t.$deltasDoc}), t.$deltasDoc = []), t.$deltas.length > 0 && e.execute({action: "aceupdate",args: [t.$deltas, t]}), t.$deltas = []
                }, this.$informUndoManager = n.delayedCall(this.$syncInformUndoManager)
            }
        }, this.markUndoGroup = function() {
            this.$syncInformUndoManager && this.$syncInformUndoManager()
        }, this.$defaultUndoManager = {undo: function() {
            },redo: function() {
            },reset: function() {
            }}, this.getUndoManager = function() {
            return this.$undoManager || this.$defaultUndoManager
        }, this.getTabString = function() {
            return this.getUseSoftTabs() ? n.stringRepeat(" ", this.getTabSize()) : "	"
        }, this.setUseSoftTabs = function(e) {
            this.setOption("useSoftTabs", e)
        }, this.getUseSoftTabs = function() {
            return this.$useSoftTabs
        }, this.setTabSize = function(e) {
            this.setOption("tabSize", e)
        }, this.getTabSize = function() {
            return this.$tabSize
        }, this.isTabStop = function(e) {
            return this.$useSoftTabs && e.column % this.$tabSize == 0
        }, this.$overwrite = !1, this.setOverwrite = function(e) {
            this.setOption("overwrite", e)
        }, this.getOverwrite = function() {
            return this.$overwrite
        }, this.toggleOverwrite = function() {
            this.setOverwrite(!this.$overwrite)
        }, this.addGutterDecoration = function(e, t) {
            this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._emit("changeBreakpoint", {})
        }, this.removeGutterDecoration = function(e, t) {
            this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._emit("changeBreakpoint", {})
        }, this.getBreakpoints = function() {
            return this.$breakpoints
        }, this.setBreakpoints = function(e) {
            this.$breakpoints = [];
            for (var t = 0; t < e.length; t++)
                this.$breakpoints[e[t]] = "ace_breakpoint";
            this._emit("changeBreakpoint", {})
        }, this.clearBreakpoints = function() {
            this.$breakpoints = [], this._emit("changeBreakpoint", {})
        }, this.setBreakpoint = function(e, t) {
            void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._emit("changeBreakpoint", {})
        }, this.clearBreakpoint = function(e) {
            delete this.$breakpoints[e], this._emit("changeBreakpoint", {})
        }, this.addMarker = function(e, t, i, n) {
            var o = this.$markerId++, r = {range: e,type: i || "line",renderer: "function" == typeof i ? i : null,clazz: t,inFront: !!n,id: o};
            return n ? (this.$frontMarkers[o] = r, this._emit("changeFrontMarker")) : (this.$backMarkers[o] = r, this._emit("changeBackMarker")), o
        }, this.addDynamicMarker = function(e, t) {
            if (e.update) {
                var i = this.$markerId++;
                return e.id = i, e.inFront = !!t, t ? (this.$frontMarkers[i] = e, this._emit("changeFrontMarker")) : (this.$backMarkers[i] = e, this._emit("changeBackMarker")), e
            }
        }, this.removeMarker = function(e) {
            var t = this.$frontMarkers[e] || this.$backMarkers[e];
            if (t) {
                var i = t.inFront ? this.$frontMarkers : this.$backMarkers;
                t && (delete i[e], this._emit(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
            }
        }, this.getMarkers = function(e) {
            return e ? this.$frontMarkers : this.$backMarkers
        }, this.highlight = function(e) {
            if (!this.$searchHighlight) {
                var t = new d(null, "ace_selected-word", "text");
                this.$searchHighlight = this.addDynamicMarker(t)
            }
            this.$searchHighlight.setRegexp(e)
        }, this.highlightLines = function(e, t, i, n) {
            "number" != typeof t && (i = t, t = e), i || (i = "ace_step");
            var o = new l(e, 0, t, 1 / 0);
            return o.id = this.addMarker(o, i, "fullLine", n), o
        }, this.setAnnotations = function(e) {
            this.$annotations = e, this._emit("changeAnnotation", {})
        }, this.getAnnotations = function() {
            return this.$annotations || []
        }, this.clearAnnotations = function() {
            this.setAnnotations([])
        }, this.$detectNewLine = function(e) {
            var t = e.match(/^.*?(\r?\n)/m);
            this.$autoNewLine = t ? t[1] : "\n"
        }, this.getWordRange = function(e, t) {
            var i = this.getLine(e), n = !1;
            if (t > 0 && (n = !!i.charAt(t - 1).match(this.tokenRe)), n || (n = !!i.charAt(t).match(this.tokenRe)), n)
                var o = this.tokenRe;
            else if (/^\s+$/.test(i.slice(t - 1, t + 1)))
                var o = /\s/;
            else
                var o = this.nonTokenRe;
            var r = t;
            if (r > 0) {
                do
                    r--;
                while (r >= 0 && i.charAt(r).match(o));
                r++
            }
            for (var s = t; s < i.length && i.charAt(s).match(o); )
                s++;
            return new l(e, r, e, s)
        }, this.getAWordRange = function(e, t) {
            for (var i = this.getWordRange(e, t), n = this.getLine(i.end.row); n.charAt(i.end.column).match(/[ \t]/); )
                i.end.column += 1;
            return i
        }, this.setNewLineMode = function(e) {
            this.doc.setNewLineMode(e)
        }, this.getNewLineMode = function() {
            return this.doc.getNewLineMode()
        }, this.setUseWorker = function(e) {
            this.setOption("useWorker", e)
        }, this.getUseWorker = function() {
            return this.$useWorker
        }, this.onReloadTokenizer = function(e) {
            var t = e.data;
            this.bgTokenizer.start(t.first), this._emit("tokenizerUpdate", e)
        }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function(e) {
            if (e && "object" == typeof e) {
                if (e.getTokenizer)
                    return this.$onChangeMode(e);
                var t = e, i = t.path
            } else
                i = e || "ace/mode/text";
            return this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new a), this.$modes[i] && !t ? this.$onChangeMode(this.$modes[i]) : (this.$modeId = i, o.loadModule(["mode", i], function(e) {
                return this.$modeId === i ? this.$modes[i] && !t ? this.$onChangeMode(this.$modes[i]) : void (e && e.Mode && (e = new e.Mode(t), t || (this.$modes[i] = e, e.$id = i), this.$onChangeMode(e))) : void 0
            }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0), void 0)
        }, this.$onChangeMode = function(e, t) {
            if (this.$mode !== e) {
                this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
                var i = e.getTokenizer();
                if (void 0 !== i.addEventListener) {
                    var n = this.onReloadTokenizer.bind(this);
                    i.addEventListener("update", n)
                }
                if (this.bgTokenizer)
                    this.bgTokenizer.setTokenizer(i);
                else {
                    this.bgTokenizer = new h(i);
                    var o = this;
                    this.bgTokenizer.addEventListener("update", function(e) {
                        o._emit("tokenizerUpdate", e)
                    })
                }
                this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (this.$modeId = e.$id, this.$setFolding(e.foldingRules), this._emit("changeMode"), this.bgTokenizer.start(0))
            }
        }, this.$stopWorker = function() {
            this.$worker && this.$worker.terminate(), this.$worker = null
        }, this.$startWorker = function() {
            if ("undefined" == typeof Worker || e.noWorker)
                this.$worker = null;
            else
                try {
                    this.$worker = this.$mode.createWorker(this)
                } catch (t) {
                    console.log("Could not load worker"), console.log(t), this.$worker = null
                }
        }, this.getMode = function() {
            return this.$mode
        }, this.$scrollTop = 0, this.setScrollTop = function(e) {
            e = Math.round(Math.max(0, e)), this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e))
        }, this.getScrollTop = function() {
            return this.$scrollTop
        }, this.$scrollLeft = 0, this.setScrollLeft = function(e) {
            e = Math.round(Math.max(0, e)), this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e))
        }, this.getScrollLeft = function() {
            return this.$scrollLeft
        }, this.getScreenWidth = function() {
            return this.$computeWidth(), this.screenWidth
        }, this.$computeWidth = function(e) {
            if (this.$modified || e) {
                if (this.$modified = !1, this.$useWrapMode)
                    return this.screenWidth = this.$wrapLimit;
                for (var t = this.doc.getAllLines(), i = this.$rowLengthCache, n = 0, o = 0, r = this.$foldData[o], s = r ? r.start.row : 1 / 0, a = t.length, l = 0; a > l; l++) {
                    if (l > s) {
                        if (l = r.end.row + 1, l >= a)
                            break;
                        r = this.$foldData[o++], s = r ? r.start.row : 1 / 0
                    }
                    null == i[l] && (i[l] = this.$getStringScreenWidth(t[l])[0]), i[l] > n && (n = i[l])
                }
                this.screenWidth = n
            }
        }, this.getLine = function(e) {
            return this.doc.getLine(e)
        }, this.getLines = function(e, t) {
            return this.doc.getLines(e, t)
        }, this.getLength = function() {
            return this.doc.getLength()
        }, this.getTextRange = function(e) {
            return this.doc.getTextRange(e || this.selection.getRange())
        }, this.insert = function(e, t) {
            return this.doc.insert(e, t)
        }, this.remove = function(e) {
            return this.doc.remove(e)
        }, this.undoChanges = function(e, t) {
            if (e.length) {
                this.$fromUndo = !0;
                for (var i = null, n = e.length - 1; -1 != n; n--) {
                    var o = e[n];
                    "doc" == o.group ? (this.doc.revertDeltas(o.deltas), i = this.$getUndoSelection(o.deltas, !0, i)) : o.deltas.forEach(function(e) {
                        this.addFolds(e.folds)
                    }, this)
                }
                return this.$fromUndo = !1, i && this.$undoSelect && !t && this.selection.setSelectionRange(i), i
            }
        }, this.redoChanges = function(e, t) {
            if (e.length) {
                this.$fromUndo = !0;
                for (var i = null, n = 0; n < e.length; n++) {
                    var o = e[n];
                    "doc" == o.group && (this.doc.applyDeltas(o.deltas), i = this.$getUndoSelection(o.deltas, !1, i))
                }
                return this.$fromUndo = !1, i && this.$undoSelect && !t && this.selection.setSelectionRange(i), i
            }
        }, this.setUndoSelect = function(e) {
            this.$undoSelect = e
        }, this.$getUndoSelection = function(e, t, i) {
            function n(e) {
                var i = "insertText" === e.action || "insertLines" === e.action;
                return t ? !i : i
            }
            var o, r, s = e[0], a = !1;
            n(s) ? (o = s.range.clone(), a = !0) : (o = l.fromPoints(s.range.start, s.range.start), a = !1);
            for (var c = 1; c < e.length; c++)
                s = e[c], n(s) ? (r = s.range.start, -1 == o.compare(r.row, r.column) && o.setStart(s.range.start), r = s.range.end, 1 == o.compare(r.row, r.column) && o.setEnd(s.range.end), a = !0) : (r = s.range.start, -1 == o.compare(r.row, r.column) && (o = l.fromPoints(s.range.start, s.range.start)), a = !1);
            if (null != i) {
                var h = i.compareRange(o);
                1 == h ? o.setStart(i.start) : -1 == h && o.setEnd(i.end)
            }
            return o
        }, this.replace = function(e, t) {
            return this.doc.replace(e, t)
        }, this.moveText = function(e, t, i) {
            var n = this.getTextRange(e), o = this.getFoldsInRange(e), r = l.fromPoints(t, t);
            if (!i) {
                this.remove(e);
                var s = e.start.row - e.end.row, a = s ? -e.end.column : e.start.column - e.end.column;
                a && (r.start.row == e.end.row && r.start.column > e.end.column && (r.start.column += a), r.end.row == e.end.row && r.end.column > e.end.column && (r.end.column += a)), s && r.start.row >= e.end.row && (r.start.row += s, r.end.row += s)
            }
            if (this.insert(r.start, n), o.length) {
                var c = e.start, h = r.start, s = h.row - c.row, a = h.column - c.column;
                this.addFolds(o.map(function(e) {
                    return e = e.clone(), e.start.row == c.row && (e.start.column += a), e.end.row == c.row && (e.end.column += a), e.start.row += s, e.end.row += s, e
                }))
            }
            return r
        }, this.indentRows = function(e, t, i) {
            i = i.replace(/\t/g, this.getTabString());
            for (var n = e; t >= n; n++)
                this.insert({row: n,column: 0}, i)
        }, this.outdentRows = function(e) {
            for (var t = e.collapseRows(), i = new l(0, 0, 0, 0), n = this.getTabSize(), o = t.start.row; o <= t.end.row; ++o) {
                var r = this.getLine(o);
                i.start.row = o, i.end.row = o;
                for (var s = 0; n > s && " " == r.charAt(s); ++s)
                    ;
                n > s && "	" == r.charAt(s) ? (i.start.column = s, i.end.column = s + 1) : (i.start.column = 0, i.end.column = s), this.remove(i)
            }
        }, this.$moveLines = function(e, t, i) {
            if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), 0 > i) {
                var n = this.getRowFoldStart(e + i);
                if (0 > n)
                    return 0;
                var o = n - e
            } else if (i > 0) {
                var n = this.getRowFoldEnd(t + i);
                if (n > this.doc.getLength() - 1)
                    return 0;
                var o = n - t
            } else {
                e = this.$clipRowToDocument(e), t = this.$clipRowToDocument(t);
                var o = t - e + 1
            }
            var r = new l(e, 0, t, Number.MAX_VALUE), s = this.getFoldsInRange(r).map(function(e) {
                return e = e.clone(), e.start.row += o, e.end.row += o, e
            }), a = 0 == i ? this.doc.getLines(e, t) : this.doc.removeLines(e, t);
            return this.doc.insertLines(e + o, a), s.length && this.addFolds(s), o
        }, this.moveLinesUp = function(e, t) {
            return this.$moveLines(e, t, -1)
        }, this.moveLinesDown = function(e, t) {
            return this.$moveLines(e, t, 1)
        }, this.duplicateLines = function(e, t) {
            return this.$moveLines(e, t, 0)
        }, this.$clipRowToDocument = function(e) {
            return Math.max(0, Math.min(e, this.doc.getLength() - 1))
        }, this.$clipColumnToRow = function(e, t) {
            return 0 > t ? 0 : Math.min(this.doc.getLine(e).length, t)
        }, this.$clipPositionToDocument = function(e, t) {
            if (t = Math.max(0, t), 0 > e)
                e = 0, t = 0;
            else {
                var i = this.doc.getLength();
                e >= i ? (e = i - 1, t = this.doc.getLine(i - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
            }
            return {row: e,column: t}
        }, this.$clipRangeToDocument = function(e) {
            e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
            var t = this.doc.getLength() - 1;
            return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e
        }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {min: null,max: null}, this.setUseWrapMode = function(e) {
            if (e != this.$useWrapMode) {
                if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
                    var t = this.getLength();
                    this.$wrapData = [];
                    for (var i = 0; t > i; i++)
                        this.$wrapData.push([]);
                    this.$updateWrapData(0, t - 1)
                }
                this._emit("changeWrapMode")
            }
        }, this.getUseWrapMode = function() {
            return this.$useWrapMode
        }, this.setWrapLimitRange = function(e, t) {
            (this.$wrapLimitRange.min !== e || this.$wrapLimitRange.max !== t) && (this.$wrapLimitRange.min = e, this.$wrapLimitRange.max = t, this.$modified = !0, this._emit("changeWrapMode"))
        }, this.adjustWrapLimit = function(e, t) {
            var i = this.$wrapLimitRange;
            i.max < 0 && (i = {min: t,max: t});
            var n = this.$constrainWrapLimit(e, i.min, i.max);
            return n != this.$wrapLimit && n > 1 ? (this.$wrapLimit = n, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._emit("changeWrapLimit")), !0) : !1
        }, this.$constrainWrapLimit = function(e, t, i) {
            return t && (e = Math.max(t, e)), i && (e = Math.min(i, e)), e
        }, this.getWrapLimit = function() {
            return this.$wrapLimit
        }, this.setWrapLimit = function(e) {
            this.setWrapLimitRange(e, e)
        }, this.getWrapLimitRange = function() {
            return {min: this.$wrapLimitRange.min,max: this.$wrapLimitRange.max}
        }, this.$updateInternalDataOnChange = function(e) {
            var t, i = this.$useWrapMode, n = e.data.action, o = e.data.range.start.row, r = e.data.range.end.row, s = e.data.range.start, a = e.data.range.end, l = null;
            if (-1 != n.indexOf("Lines") ? (r = "insertLines" == n ? o + e.data.lines.length : o, t = e.data.lines ? e.data.lines.length : r - o) : t = r - o, this.$updating = !0, 0 != t)
                if (-1 != n.indexOf("remove")) {
                    this[i ? "$wrapData" : "$rowLengthCache"].splice(o, t);
                    var c = this.$foldData;
                    l = this.getFoldsInRange(e.data.range), this.removeFolds(l);
                    var h = this.getFoldLine(a.row), d = 0;
                    if (h) {
                        h.addRemoveChars(a.row, a.column, s.column - a.column), h.shiftRow(-t);
                        var u = this.getFoldLine(o);
                        u && u !== h && (u.merge(h), h = u), d = c.indexOf(h) + 1
                    }
                    for (d; d < c.length; d++) {
                        var h = c[d];
                        h.start.row >= a.row && h.shiftRow(-t)
                    }
                    r = o
                } else {
                    var p;
                    if (i) {
                        p = [o, 0];
                        for (var g = 0; t > g; g++)
                            p.push([]);
                        this.$wrapData.splice.apply(this.$wrapData, p)
                    } else
                        p = Array(t), p.unshift(o, 0), this.$rowLengthCache.splice.apply(this.$rowLengthCache, p);
                    var c = this.$foldData, h = this.getFoldLine(o), d = 0;
                    if (h) {
                        var m = h.range.compareInside(s.row, s.column);
                        0 == m ? (h = h.split(s.row, s.column), h.shiftRow(t), h.addRemoveChars(r, 0, a.column - s.column)) : -1 == m && (h.addRemoveChars(o, 0, a.column - s.column), h.shiftRow(t)), d = c.indexOf(h) + 1
                    }
                    for (d; d < c.length; d++) {
                        var h = c[d];
                        h.start.row >= o && h.shiftRow(t)
                    }
                }
            else {
                t = Math.abs(e.data.range.start.column - e.data.range.end.column), -1 != n.indexOf("remove") && (l = this.getFoldsInRange(e.data.range), this.removeFolds(l), t = -t);
                var h = this.getFoldLine(o);
                h && h.addRemoveChars(o, s.column, t)
            }
            return i && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, i ? this.$updateWrapData(o, r) : this.$updateRowLengthCache(o, r), l
        }, this.$updateRowLengthCache = function(e, t) {
            this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null
        }, this.$updateWrapData = function(e, t) {
            var i, o, r = this.doc.getAllLines(), s = this.getTabSize(), a = this.$wrapData, l = this.$wrapLimit, c = e;
            for (t = Math.min(t, r.length - 1); t >= c; )
                if (o = this.getFoldLine(c, o)) {
                    for (i = [], o.walk(function(e, t, n, o) {
                        var s;
                        if (null != e) {
                            s = this.$getDisplayTokens(e, i.length), s[0] = u;
                            for (var a = 1; a < s.length; a++)
                                s[a] = p
                        } else
                            s = this.$getDisplayTokens(r[t].substring(o, n), i.length);
                        i = i.concat(s)
                    }.bind(this), o.end.row, r[o.end.row].length + 1); 0 != i.length && i[i.length - 1] >= m; )
                        i.pop();
                    a[o.start.row] = this.$computeWrapSplits(i, l, s), c = o.end.row + 1
                } else
                    i = this.$getDisplayTokens(n.stringTrimRight(r[c])), a[c] = this.$computeWrapSplits(i, l, s), c++
        };
        var s = 1, c = 2, u = 3, p = 4, g = 9, m = 10, f = 11, v = 12;
        this.$computeWrapSplits = function(e, t) {
            function i(t) {
                var i = e.slice(r, t), o = i.length;
                i.join("").replace(/12/g, function() {
                    o -= 1
                }).replace(/2/g, function() {
                    o -= 1
                }), s += o, n.push(s), r = t
            }
            if (0 == e.length)
                return [];
            for (var n = [], o = e.length, r = 0, s = 0; o - r > t; ) {
                var a = r + t;
                if (e[a] >= m) {
                    for (; e[a] >= m; )
                        a++;
                    i(a)
                } else if (e[a] != u && e[a] != p) {
                    for (var l = Math.max(a - 10, r - 1); a > l && e[a] < u; )
                        a--;
                    for (; a > l && e[a] == g; )
                        a--;
                    a > l ? i(++a) : (a = r + t, i(a))
                } else {
                    for (a; a != r - 1 && e[a] != u; a--)
                        ;
                    if (a > r) {
                        i(a);
                        continue
                    }
                    for (a = r + t; a < e.length && e[a] == p; a++)
                        ;
                    if (a == e.length)
                        break;
                    i(a)
                }
            }
            return n
        }, this.$getDisplayTokens = function(e, i) {
            var n, o = [];
            i = i || 0;
            for (var r = 0; r < e.length; r++) {
                var a = e.charCodeAt(r);
                if (9 == a) {
                    n = this.getScreenTabSize(o.length + i), o.push(f);
                    for (var l = 1; n > l; l++)
                        o.push(v)
                } else
                    32 == a ? o.push(m) : a > 39 && 48 > a || a > 57 && 64 > a ? o.push(g) : a >= 4352 && t(a) ? o.push(s, c) : o.push(s)
            }
            return o
        }, this.$getStringScreenWidth = function(e, i, n) {
            if (0 == i)
                return [0, 0];
            null == i && (i = 1 / 0), n = n || 0;
            var o, r;
            for (r = 0; r < e.length && (o = e.charCodeAt(r), n += 9 == o ? this.getScreenTabSize(n) : o >= 4352 && t(o) ? 2 : 1, !(n > i)); r++)
                ;
            return [n, r]
        }, this.getRowLength = function(e) {
            return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1
        }, this.getScreenLastRowColumn = function(e) {
            var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
            return this.documentToScreenColumn(t.row, t.column)
        }, this.getDocumentLastRowColumn = function(e, t) {
            var i = this.documentToScreenRow(e, t);
            return this.getScreenLastRowColumn(i)
        }, this.getDocumentLastRowColumnPosition = function(e, t) {
            var i = this.documentToScreenRow(e, t);
            return this.screenToDocumentPosition(i, Number.MAX_VALUE / 10)
        }, this.getRowSplitData = function(e) {
            return this.$useWrapMode ? this.$wrapData[e] : void 0
        }, this.getScreenTabSize = function(e) {
            return this.$tabSize - e % this.$tabSize
        }, this.screenToDocumentRow = function(e, t) {
            return this.screenToDocumentPosition(e, t).row
        }, this.screenToDocumentColumn = function(e, t) {
            return this.screenToDocumentPosition(e, t).column
        }, this.screenToDocumentPosition = function(e, t) {
            if (0 > e)
                return {row: 0,column: 0};
            var i, n, o = 0, r = 0, s = 0, a = 0, l = this.$screenRowCache, c = this.$getRowCacheIndex(l, e), h = l.length;
            if (h && c >= 0)
                var s = l[c], o = this.$docRowCache[c], d = e > l[h - 1];
            else
                var d = !h;
            for (var u = this.getLength() - 1, p = this.getNextFoldLine(o), g = p ? p.start.row : 1 / 0; e >= s && (a = this.getRowLength(o), !(s + a - 1 >= e || o >= u)); )
                s += a, o++, o > g && (o = p.end.row + 1, p = this.getNextFoldLine(o, p), g = p ? p.start.row : 1 / 0), d && (this.$docRowCache.push(o), this.$screenRowCache.push(s));
            if (p && p.start.row <= o)
                i = this.getFoldDisplayLine(p), o = p.start.row;
            else {
                if (e >= s + a || o > u)
                    return {row: u,column: this.getLine(u).length};
                i = this.getLine(o), p = null
            }
            if (this.$useWrapMode) {
                var m = this.$wrapData[o];
                m && (n = m[e - s], e > s && m.length && (r = m[e - s - 1] || m[m.length - 1], i = i.substring(r)))
            }
            return r += this.$getStringScreenWidth(i, t)[1], this.$useWrapMode && r >= n && (r = n - 1), p ? p.idxToPosition(r) : {row: o,column: r}
        }, this.documentToScreenPosition = function(e, t) {
            if ("undefined" == typeof t)
                var i = this.$clipPositionToDocument(e.row, e.column);
            else
                i = this.$clipPositionToDocument(e, t);
            e = i.row, t = i.column;
            var n = 0, o = null, r = null;
            r = this.getFoldAt(e, t, 1), r && (e = r.start.row, t = r.start.column);
            var s, a = 0, l = this.$docRowCache, c = this.$getRowCacheIndex(l, e), h = l.length;
            if (h && c >= 0)
                var a = l[c], n = this.$screenRowCache[c], d = e > l[h - 1];
            else
                var d = !h;
            for (var u = this.getNextFoldLine(a), p = u ? u.start.row : 1 / 0; e > a; ) {
                if (a >= p) {
                    if (s = u.end.row + 1, s > e)
                        break;
                    u = this.getNextFoldLine(s, u), p = u ? u.start.row : 1 / 0
                } else
                    s = a + 1;
                n += this.getRowLength(a), a = s, d && (this.$docRowCache.push(a), this.$screenRowCache.push(n))
            }
            var g = "";
            if (u && a >= p ? (g = this.getFoldDisplayLine(u, e, t), o = u.start.row) : (g = this.getLine(e).substring(0, t), o = e), this.$useWrapMode) {
                for (var m = this.$wrapData[o], f = 0; g.length >= m[f]; )
                    n++, f++;
                g = g.substring(m[f - 1] || 0, g.length)
            }
            return {row: n,column: this.$getStringScreenWidth(g)[0]}
        }, this.documentToScreenColumn = function(e, t) {
            return this.documentToScreenPosition(e, t).column
        }, this.documentToScreenRow = function(e, t) {
            return this.documentToScreenPosition(e, t).row
        }, this.getScreenLength = function() {
            var e = 0, t = null;
            if (this.$useWrapMode)
                for (var i = this.$wrapData.length, n = 0, o = 0, t = this.$foldData[o++], r = t ? t.start.row : 1 / 0; i > n; )
                    e += this.$wrapData[n].length + 1, n++, n > r && (n = t.end.row + 1, t = this.$foldData[o++], r = t ? t.start.row : 1 / 0);
            else {
                e = this.getLength();
                for (var s = this.$foldData, o = 0; o < s.length; o++)
                    t = s[o], e -= t.end.row - t.start.row
            }
            return e
        }
    }).call(u.prototype), e("./edit_session/folding").Folding.call(u.prototype), e("./edit_session/bracket_match").BracketMatch.call(u.prototype), o.defineOptions(u.prototype, "session", {wrap: {set: function(e) {
                if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e) {
                    if (e) {
                        var t = "number" == typeof e ? e : null;
                        this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
                    } else
                        this.setUseWrapMode(!1);
                    this.$wrap = e
                }
            },get: function() {
                return this.getUseWrapMode() ? this.getWrapLimitRange().min || "free" : "off"
            },handlesSet: !0},firstLineNumber: {set: function() {
                this._emit("changeBreakpoint")
            },initialValue: 1},useWorker: {set: function(e) {
                this.$useWorker = e, this.$stopWorker(), e && this.$startWorker()
            },initialValue: !0},useSoftTabs: {initialValue: !0},tabSize: {set: function(e) {
                isNaN(e) || this.$tabSize === e || (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._emit("changeTabSize"))
            },initialValue: 4,handlesSet: !0},overwrite: {set: function() {
                this._emit("changeOverwrite")
            },initialValue: !1},newLineMode: {set: function(e) {
                this.doc.setNewLineMode(e)
            },get: function() {
                return this.doc.getNewLineMode()
            },handlesSet: !0}}), t.EditSession = u
}), define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/lang"), o = e("./lib/event_emitter").EventEmitter, r = e("./range").Range, s = function(e) {
        this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
        var t = this;
        this.lead.on("change", function(e) {
            t._emit("changeCursor"), t.$isEmpty || t._emit("changeSelection"), !t.$keepDesiredColumnOnChange && e.old.column != e.value.column && (t.$desiredColumn = null)
        }), this.selectionAnchor.on("change", function() {
            t.$isEmpty || t._emit("changeSelection")
        })
    };
    (function() {
        i.implement(this, o), this.isEmpty = function() {
            return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
        }, this.isMultiLine = function() {
            return this.isEmpty() ? !1 : this.getRange().isMultiLine()
        }, this.getCursor = function() {
            return this.lead.getPosition()
        }, this.setSelectionAnchor = function(e, t) {
            this.anchor.setPosition(e, t), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection"))
        }, this.getSelectionAnchor = function() {
            return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
        }, this.getSelectionLead = function() {
            return this.lead.getPosition()
        }, this.shiftSelection = function(e) {
            if (this.$isEmpty)
                return void this.moveCursorTo(this.lead.row, this.lead.column + e);
            var t = this.getSelectionAnchor(), i = this.getSelectionLead(), n = this.isBackwards();
            (!n || 0 !== t.column) && this.setSelectionAnchor(t.row, t.column + e), (n || 0 !== i.column) && this.$moveSelection(function() {
                this.moveCursorTo(i.row, i.column + e)
            })
        }, this.isBackwards = function() {
            var e = this.anchor, t = this.lead;
            return e.row > t.row || e.row == t.row && e.column > t.column
        }, this.getRange = function() {
            var e = this.anchor, t = this.lead;
            return this.isEmpty() ? r.fromPoints(t, t) : this.isBackwards() ? r.fromPoints(t, e) : r.fromPoints(e, t)
        }, this.clearSelection = function() {
            this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
        }, this.selectAll = function() {
            var e = this.doc.getLength() - 1;
            this.setSelectionAnchor(0, 0), this.moveCursorTo(e, this.doc.getLine(e).length)
        }, this.setRange = this.setSelectionRange = function(e, t) {
            t ? (this.setSelectionAnchor(e.end.row, e.end.column), this.selectTo(e.start.row, e.start.column)) : (this.setSelectionAnchor(e.start.row, e.start.column), this.selectTo(e.end.row, e.end.column)), this.$desiredColumn = null
        }, this.$moveSelection = function(e) {
            var t = this.lead;
            this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
        }, this.selectTo = function(e, t) {
            this.$moveSelection(function() {
                this.moveCursorTo(e, t)
            })
        }, this.selectToPosition = function(e) {
            this.$moveSelection(function() {
                this.moveCursorToPosition(e)
            })
        }, this.selectUp = function() {
            this.$moveSelection(this.moveCursorUp)
        }, this.selectDown = function() {
            this.$moveSelection(this.moveCursorDown)
        }, this.selectRight = function() {
            this.$moveSelection(this.moveCursorRight)
        }, this.selectLeft = function() {
            this.$moveSelection(this.moveCursorLeft)
        }, this.selectLineStart = function() {
            this.$moveSelection(this.moveCursorLineStart)
        }, this.selectLineEnd = function() {
            this.$moveSelection(this.moveCursorLineEnd)
        }, this.selectFileEnd = function() {
            this.$moveSelection(this.moveCursorFileEnd)
        }, this.selectFileStart = function() {
            this.$moveSelection(this.moveCursorFileStart)
        }, this.selectWordRight = function() {
            this.$moveSelection(this.moveCursorWordRight)
        }, this.selectWordLeft = function() {
            this.$moveSelection(this.moveCursorWordLeft)
        }, this.getWordRange = function(e, t) {
            if ("undefined" == typeof t) {
                var i = e || this.lead;
                e = i.row, t = i.column
            }
            return this.session.getWordRange(e, t)
        }, this.selectWord = function() {
            this.setSelectionRange(this.getWordRange())
        }, this.selectAWord = function() {
            var e = this.getCursor(), t = this.session.getAWordRange(e.row, e.column);
            this.setSelectionRange(t)
        }, this.getLineRange = function(e, t) {
            var i, n = "number" == typeof e ? e : this.lead.row, o = this.session.getFoldLine(n);
            return o ? (n = o.start.row, i = o.end.row) : i = n, t ? new r(n, 0, i, this.session.getLine(i).length) : new r(n, 0, i + 1, 0)
        }, this.selectLine = function() {
            this.setSelectionRange(this.getLineRange())
        }, this.moveCursorUp = function() {
            this.moveCursorBy(-1, 0)
        }, this.moveCursorDown = function() {
            this.moveCursorBy(1, 0)
        }, this.moveCursorLeft = function() {
            var e, t = this.lead.getPosition();
            if (e = this.session.getFoldAt(t.row, t.column, -1))
                this.moveCursorTo(e.start.row, e.start.column);
            else if (0 == t.column)
                t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length);
            else {
                var i = this.session.getTabSize();
                this.session.isTabStop(t) && this.doc.getLine(t.row).slice(t.column - i, t.column).split(" ").length - 1 == i ? this.moveCursorBy(0, -i) : this.moveCursorBy(0, -1)
            }
        }, this.moveCursorRight = function() {
            var e, t = this.lead.getPosition();
            if (e = this.session.getFoldAt(t.row, t.column, 1))
                this.moveCursorTo(e.end.row, e.end.column);
            else if (this.lead.column == this.doc.getLine(this.lead.row).length)
                this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
            else {
                var i = this.session.getTabSize(), t = this.lead;
                this.session.isTabStop(t) && this.doc.getLine(t.row).slice(t.column, t.column + i).split(" ").length - 1 == i ? this.moveCursorBy(0, i) : this.moveCursorBy(0, 1)
            }
        }, this.moveCursorLineStart = function() {
            var e = this.lead.row, t = this.lead.column, i = this.session.documentToScreenRow(e, t), n = this.session.screenToDocumentPosition(i, 0), o = this.session.getDisplayLine(e, null, n.row, n.column), r = o.match(/^\s*/);
            r[0].length != t && !this.session.$useEmacsStyleLineStart && (n.column += r[0].length), this.moveCursorToPosition(n)
        }, this.moveCursorLineEnd = function() {
            var e = this.lead, t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
            if (this.lead.column == t.column) {
                var i = this.session.getLine(t.row);
                if (t.column == i.length) {
                    var n = i.search(/\s+$/);
                    n > 0 && (t.column = n)
                }
            }
            this.moveCursorTo(t.row, t.column)
        }, this.moveCursorFileEnd = function() {
            var e = this.doc.getLength() - 1, t = this.doc.getLine(e).length;
            this.moveCursorTo(e, t)
        }, this.moveCursorFileStart = function() {
            this.moveCursorTo(0, 0)
        }, this.moveCursorLongWordRight = function() {
            var e, t = this.lead.row, i = this.lead.column, n = this.doc.getLine(t), o = n.substring(i);
            this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
            var r = this.session.getFoldAt(t, i, 1);
            return r ? void this.moveCursorTo(r.end.row, r.end.column) : ((e = this.session.nonTokenRe.exec(o)) && (i += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, o = n.substring(i)), i >= n.length ? (this.moveCursorTo(t, n.length), this.moveCursorRight(), t < this.doc.getLength() - 1 && this.moveCursorWordRight(), void 0) : ((e = this.session.tokenRe.exec(o)) && (i += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(t, i)))
        }, this.moveCursorLongWordLeft = function() {
            var e, t = this.lead.row, i = this.lead.column;
            if (e = this.session.getFoldAt(t, i, -1))
                return void this.moveCursorTo(e.start.row, e.start.column);
            var o = this.session.getFoldStringAt(t, i, -1);
            null == o && (o = this.doc.getLine(t).substring(0, i));
            var r, s = n.stringReverse(o);
            return this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, (r = this.session.nonTokenRe.exec(s)) && (i -= this.session.nonTokenRe.lastIndex, s = s.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), 0 >= i ? (this.moveCursorTo(t, 0), this.moveCursorLeft(), t > 0 && this.moveCursorWordLeft(), void 0) : ((r = this.session.tokenRe.exec(s)) && (i -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(t, i))
        }, this.$shortWordEndIndex = function(e) {
            var t, i, n = 0, o = /\s/, r = this.session.tokenRe;
            if (r.lastIndex = 0, t = this.session.tokenRe.exec(e))
                n = this.session.tokenRe.lastIndex;
            else {
                for (; (i = e[n]) && o.test(i); )
                    n++;
                if (1 >= n)
                    for (r.lastIndex = 0; (i = e[n]) && !r.test(i); )
                        if (r.lastIndex = 0, n++, o.test(i)) {
                            if (n > 2) {
                                n--;
                                break
                            }
                            for (; (i = e[n]) && o.test(i); )
                                n++;
                            if (n > 2)
                                break
                        }
            }
            return r.lastIndex = 0, n
        }, this.moveCursorShortWordRight = function() {
            var e = this.lead.row, t = this.lead.column, i = this.doc.getLine(e), n = i.substring(t), o = this.session.getFoldAt(e, t, 1);
            if (o)
                return this.moveCursorTo(o.end.row, o.end.column);
            if (t == i.length) {
                var r = this.doc.getLength();
                do
                    e++, n = this.doc.getLine(e);
                while (r > e && /^\s*$/.test(n));
                /^\s+/.test(n) || (n = ""), t = 0
            }
            var s = this.$shortWordEndIndex(n);
            this.moveCursorTo(e, t + s)
        }, this.moveCursorShortWordLeft = function() {
            var e, t = this.lead.row, i = this.lead.column;
            if (e = this.session.getFoldAt(t, i, -1))
                return this.moveCursorTo(e.start.row, e.start.column);
            var o = this.session.getLine(t).substring(0, i);
            if (0 == i) {
                do
                    t--, o = this.doc.getLine(t);
                while (t > 0 && /^\s*$/.test(o));
                i = o.length, /\s+$/.test(o) || (o = "")
            }
            var r = n.stringReverse(o), s = this.$shortWordEndIndex(r);
            return this.moveCursorTo(t, i - s)
        }, this.moveCursorWordRight = function() {
            this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
        }, this.moveCursorWordLeft = function() {
            this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
        }, this.moveCursorBy = function(e, t) {
            var i = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
            0 === t && (this.$desiredColumn ? i.column = this.$desiredColumn : this.$desiredColumn = i.column);
            var n = this.session.screenToDocumentPosition(i.row + e, i.column);
            this.moveCursorTo(n.row, n.column + t, 0 === t)
        }, this.moveCursorToPosition = function(e) {
            this.moveCursorTo(e.row, e.column)
        }, this.moveCursorTo = function(e, t, i) {
            var n = this.session.getFoldAt(e, t, 1);
            n && (e = n.start.row, t = n.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, i || (this.$desiredColumn = null)
        }, this.moveCursorToScreen = function(e, t, i) {
            var n = this.session.screenToDocumentPosition(e, t);
            this.moveCursorTo(n.row, n.column, i)
        }, this.detach = function() {
            this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
        }, this.fromOrientedRange = function(e) {
            this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn
        }, this.toOrientedRange = function(e) {
            var t = this.getRange();
            return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e
        }
    }).call(s.prototype), t.Selection = s
}), define("ace/range", ["require", "exports", "module"], function(e, t) {
    var i = function(e, t) {
        return e.row - t.row || e.column - t.column
    }, n = function(e, t, i, n) {
        this.start = {row: e,column: t}, this.end = {row: i,column: n}
    };
    (function() {
        this.isEqual = function(e) {
            return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column
        }, this.toString = function() {
            return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
        }, this.contains = function(e, t) {
            return 0 == this.compare(e, t)
        }, this.compareRange = function(e) {
            var t, i = e.end, n = e.start;
            return t = this.compare(i.row, i.column), 1 == t ? (t = this.compare(n.row, n.column), 1 == t ? 2 : 0 == t ? 1 : 0) : -1 == t ? -2 : (t = this.compare(n.row, n.column), -1 == t ? -1 : 1 == t ? 42 : 0)
        }, this.comparePoint = function(e) {
            return this.compare(e.row, e.column)
        }, this.containsRange = function(e) {
            return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end)
        }, this.intersects = function(e) {
            var t = this.compareRange(e);
            return -1 == t || 0 == t || 1 == t
        }, this.isEnd = function(e, t) {
            return this.end.row == e && this.end.column == t
        }, this.isStart = function(e, t) {
            return this.start.row == e && this.start.column == t
        }, this.setStart = function(e, t) {
            "object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t)
        }, this.setEnd = function(e, t) {
            "object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t)
        }, this.inside = function(e, t) {
            return 0 == this.compare(e, t) ? this.isEnd(e, t) || this.isStart(e, t) ? !1 : !0 : !1
        }, this.insideStart = function(e, t) {
            return 0 == this.compare(e, t) ? this.isEnd(e, t) ? !1 : !0 : !1
        }, this.insideEnd = function(e, t) {
            return 0 == this.compare(e, t) ? this.isStart(e, t) ? !1 : !0 : !1
        }, this.compare = function(e, t) {
            return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0
        }, this.compareStart = function(e, t) {
            return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
        }, this.compareEnd = function(e, t) {
            return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t)
        }, this.compareInside = function(e, t) {
            return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
        }, this.clipRows = function(e, t) {
            if (this.end.row > t)
                var i = {row: t + 1,column: 0};
            else if (this.end.row < e)
                var i = {row: e,column: 0};
            if (this.start.row > t)
                var o = {row: t + 1,column: 0};
            else if (this.start.row < e)
                var o = {row: e,column: 0};
            return n.fromPoints(o || this.start, i || this.end)
        }, this.extend = function(e, t) {
            var i = this.compare(e, t);
            if (0 == i)
                return this;
            if (-1 == i)
                var o = {row: e,column: t};
            else
                var r = {row: e,column: t};
            return n.fromPoints(o || this.start, r || this.end)
        }, this.isEmpty = function() {
            return this.start.row === this.end.row && this.start.column === this.end.column
        }, this.isMultiLine = function() {
            return this.start.row !== this.end.row
        }, this.clone = function() {
            return n.fromPoints(this.start, this.end)
        }, this.collapseRows = function() {
            return 0 == this.end.column ? new n(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new n(this.start.row, 0, this.end.row, 0)
        }, this.toScreenRange = function(e) {
            var t = e.documentToScreenPosition(this.start), i = e.documentToScreenPosition(this.end);
            return new n(t.row, t.column, i.row, i.column)
        }, this.moveBy = function(e, t) {
            this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t
        }
    }).call(n.prototype), n.fromPoints = function(e, t) {
        return new n(e.row, e.column, t.row, t.column)
    }, n.comparePoints = i, n.comparePoints = function(e, t) {
        return e.row - t.row || e.column - t.column
    }, t.Range = n
}), define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function(e, t) {
    var i = e("../tokenizer").Tokenizer, n = e("./text_highlight_rules").TextHighlightRules, o = e("./behaviour").Behaviour, r = e("../unicode"), s = e("../lib/lang"), a = e("../token_iterator").TokenIterator, l = e("../range").Range, c = function() {
        this.$tokenizer = new i((new n).getRules()), this.$behaviour = new o
    };
    (function() {
        this.tokenRe = new RegExp("^[" + r.packages.L + r.packages.Mn + r.packages.Mc + r.packages.Nd + r.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + r.packages.L + r.packages.Mn + r.packages.Mc + r.packages.Nd + r.packages.Pc + "\\$_]|s])+", "g"), this.getTokenizer = function() {
            return this.$tokenizer
        }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(e, t, i, n) {
            function o(e) {
                for (var t = i; n >= t; t++)
                    e(r.getLine(t), t)
            }
            var r = t.doc, a = !0, l = !0, c = 1 / 0;
            if (this.lineCommentStart) {
                if (Array.isArray(this.lineCommentStart))
                    var h = this.lineCommentStart.map(s.escapeRegExp).join("|"), d = this.lineCommentStart[0] + " ";
                else
                    var h = s.escapeRegExp(this.lineCommentStart), d = this.lineCommentStart + " ";
                h = new RegExp("^(\\s*)(?:" + h + ") ?");
                var u = function(e, t) {
                    var i = e.match(h);
                    i && r.removeInLine(t, i[1].length, i[0].length)
                }, p = function(e, t) {
                    (!a || /\S/.test(e)) && r.insertInLine({row: t,column: c}, d)
                }, g = function(e) {
                    return h.test(e)
                }
            } else {
                if (!this.blockComment)
                    return !1;
                var d = this.blockComment.start, m = this.blockComment.end, h = new RegExp("^(\\s*)(?:" + s.escapeRegExp(d) + ")"), f = new RegExp("(?:" + s.escapeRegExp(m) + ")\\s*$"), p = function(e, t) {
                    g(e, t) || (!a || /\S/.test(e)) && (r.insertInLine({row: t,column: e.length}, m), r.insertInLine({row: t,column: c}, d))
                }, u = function(e, t) {
                    var i;
                    (i = e.match(f)) && r.removeInLine(t, e.length - i[0].length, e.length), (i = e.match(h)) && r.removeInLine(t, i[1].length, i[0].length)
                }, g = function(e, i) {
                    if (h.test(e))
                        return !0;
                    for (var n = t.getTokens(i), o = 0; o < n.length; o++)
                        if ("comment" === n[o].type)
                            return !0
                }
            }
            var v = 1 / 0;
            o(function(e, t) {
                var i = e.search(/\S/);
                -1 !== i ? (c > i && (c = i), l && !g(e, t) && (l = !1)) : v > e.length && (v = e.length)
            }), 1 / 0 == c && (c = v, a = !1, l = !1), o(l ? u : p)
        }, this.toggleBlockComment = function(e, t, i, n) {
            var o = this.blockComment;
            if (o) {
                !o.start && o[0] && (o = o[0]);
                var r, s, c = new a(t, n.row, n.column), h = c.getCurrentToken(), d = (t.selection, t.selection.toOrientedRange());
                if (h && /comment/.test(h.type)) {
                    for (var u, p; h && /comment/.test(h.type); ) {
                        var g = h.value.indexOf(o.start);
                        if (-1 != g) {
                            var m = c.getCurrentTokenRow(), f = c.getCurrentTokenColumn() + g;
                            u = new l(m, f, m, f + o.start.length);
                            break
                        }
                        h = c.stepBackward()
                    }
                    for (var c = new a(t, n.row, n.column), h = c.getCurrentToken(); h && /comment/.test(h.type); ) {
                        var g = h.value.indexOf(o.end);
                        if (-1 != g) {
                            var m = c.getCurrentTokenRow(), f = c.getCurrentTokenColumn() + g;
                            p = new l(m, f, m, f + o.end.length);
                            break
                        }
                        h = c.stepForward()
                    }
                    p && t.remove(p), u && (t.remove(u), r = u.start.row, s = -o.start.length)
                } else
                    s = o.start.length, r = i.start.row, t.insert(i.end, o.end), t.insert(i.start, o.start);
                d.start.row == r && (d.start.column += s), d.end.row == r && (d.end.column += s), t.selection.fromOrientedRange(d)
            }
        }, this.getNextLineIndent = function(e, t) {
            return this.$getIndent(t)
        }, this.checkOutdent = function() {
            return !1
        }, this.autoOutdent = function() {
        }, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0]
        }, this.createWorker = function() {
            return null
        }, this.createModeDelegates = function(e) {
            if (this.$embeds) {
                this.$modes = {};
                for (var t = 0; t < this.$embeds.length; t++)
                    e[this.$embeds[t]] && (this.$modes[this.$embeds[t]] = new e[this.$embeds[t]]);
                for (var i = ["toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction"], t = 0; t < i.length; t++)
                    (function(e) {
                        var n = i[t], o = e[n];
                        e[i[t]] = function() {
                            return this.$delegator(n, arguments, o)
                        }
                    })(this)
            }
        }, this.$delegator = function(e, t, i) {
            for (var n = t[0], o = 0; o < this.$embeds.length; o++)
                if (this.$modes[this.$embeds[o]]) {
                    var r = n.split(this.$embeds[o]);
                    if (!r[0] && r[1]) {
                        t[0] = r[1];
                        var s = this.$modes[this.$embeds[o]];
                        return s[e].apply(s, t)
                    }
                }
            var a = i.apply(this, t);
            return i ? a : void 0
        }, this.transformAction = function(e, t) {
            if (this.$behaviour) {
                var i = this.$behaviour.getBehaviours();
                for (var n in i)
                    if (i[n][t]) {
                        var o = i[n][t].apply(this, arguments);
                        if (o)
                            return o
                    }
            }
        }
    }).call(c.prototype), t.Mode = c
}), define("ace/tokenizer", ["require", "exports", "module"], function(e, t) {
    var i = 1e3, n = function(e) {
        this.states = e, this.regExps = {}, this.matchMappings = {};
        for (var t in this.states) {
            for (var i = this.states[t], n = [], o = 0, r = this.matchMappings[t] = {defaultToken: "text"}, s = "g", a = 0; a < i.length; a++) {
                var l = i[a];
                if (l.defaultToken && (r.defaultToken = l.defaultToken), l.caseInsensitive && (s = "gi"), null != l.regex) {
                    l.regex instanceof RegExp && (l.regex = l.regex.toString().slice(1, -1));
                    var c = l.regex, h = new RegExp("(?:(" + c + ")|(.))").exec("a").length - 2;
                    if (Array.isArray(l.token))
                        if (1 == l.token.length || 1 == h)
                            l.token = l.token[0];
                        else {
                            if (h - 1 != l.token.length)
                                throw new Error("number of classes and regexp groups in '" + l.token + "'\n'" + l.regex + "' doesn't match\n" + (h - 1) + "!=" + l.token.length);
                            l.tokenArray = l.token, l.onMatch = this.$arrayTokens
                        }
                    else
                        "function" == typeof l.token && !l.onMatch && (l.onMatch = h > 1 ? this.$applyToken : l.token);
                    h > 1 && (/\\\d/.test(l.regex) ? c = l.regex.replace(/\\([0-9]+)/g, function(e, t) {
                        return "\\" + (parseInt(t, 10) + o + 1)
                    }) : (h = 1, c = this.removeCapturingGroups(l.regex)), !l.splitRegex && "string" != typeof l.token && (l.splitRegex = this.createSplitterRegexp(l.regex, s))), r[o] = a, o += h, n.push(c), l.onMatch || (l.onMatch = null), l.__proto__ = null
                }
            }
            this.regExps[t] = new RegExp("(" + n.join(")|(") + ")|($)", s)
        }
    };
    (function() {
        this.$applyToken = function(e) {
            var t = this.splitRegex.exec(e).slice(1), i = this.token.apply(this, t);
            if ("string" == typeof i)
                return [{type: i,value: e}];
            for (var n = [], o = 0, r = i.length; r > o; o++)
                t[o] && (n[n.length] = {type: i[o],value: t[o]});
            return n
        }, this.$arrayTokens = function(e) {
            if (!e)
                return [];
            for (var t = this.splitRegex.exec(e), i = [], n = this.tokenArray, o = 0, r = n.length; r > o; o++)
                t[o + 1] && (i[i.length] = {type: n[o],value: t[o + 1]});
            return i
        }, this.removeCapturingGroups = function(e) {
            var t = e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function(e, t) {
                return t ? "(?:" : e
            });
            return t
        }, this.createSplitterRegexp = function(e, t) {
            if (-1 != e.indexOf("(?=")) {
                var i = 0, n = !1, o = {};
                e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(e, t, r, s, a, l) {
                    return n ? n = "]" != a : a ? n = !0 : s ? (i == o.stack && (o.end = l + 1, o.stack = -1), i--) : r && (i++, 1 != r.length && (o.stack = i, o.start = l)), e
                }), null != o.end && /^\)*$/.test(e.substr(o.end)) && (e = e.substring(0, o.start) + e.substr(o.end))
            }
            return new RegExp(e, (t || "").replace("g", ""))
        }, this.getLineTokens = function(e, t) {
            if (t && "string" != typeof t) {
                var n = t.slice(0);
                t = n[0]
            } else
                var n = [];
            var o = t || "start", r = this.states[o], s = this.matchMappings[o], a = this.regExps[o];
            a.lastIndex = 0;
            for (var l, c = [], h = 0, d = {type: null,value: ""}; l = a.exec(e); ) {
                var u = s.defaultToken, p = null, g = l[0], m = a.lastIndex;
                if (m - g.length > h) {
                    var f = e.substring(h, m - g.length);
                    d.type == u ? d.value += f : (d.type && c.push(d), d = {type: u,value: f})
                }
                for (var v = 0; v < l.length - 2; v++)
                    if (void 0 !== l[v + 1]) {
                        p = r[s[v]], u = p.onMatch ? p.onMatch(g, o, n) : p.token, p.next && (o = "string" == typeof p.next ? p.next : p.next(o, n), r = this.states[o], r || (window.console && console.error && console.error(o, "doesn't exist"), o = "start", r = this.states[o]), s = this.matchMappings[o], h = m, a = this.regExps[o], a.lastIndex = m);
                        break
                    }
                if (g)
                    if ("string" == typeof u)
                        p && p.merge === !1 || d.type !== u ? (d.type && c.push(d), d = {type: u,value: g}) : d.value += g;
                    else if (u) {
                        d.type && c.push(d), d = {type: null,value: ""};
                        for (var v = 0; v < u.length; v++)
                            c.push(u[v])
                    }
                if (h == e.length)
                    break;
                if (h = m, c.length > i) {
                    d.value += e.substr(h), o = "start";
                    break
                }
            }
            return d.type && c.push(d), {tokens: c,state: n.length ? n : o}
        }
    }).call(n.prototype), t.Tokenizer = n
}), define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function(e, t) {
    var i = e("../lib/lang"), n = function() {
        this.$rules = {start: [{token: "empty_line",regex: "^$"}, {defaultToken: "text"}]}
    };
    (function() {
        this.addRules = function(e, t) {
            for (var i in e) {
                for (var n = e[i], o = 0; o < n.length; o++) {
                    var r = n[o];
                    r.next && (r.next = t + r.next)
                }
                this.$rules[t + i] = n
            }
        }, this.getRules = function() {
            return this.$rules
        }, this.embedRules = function(e, t, n, o, r) {
            var s = (new e).getRules();
            if (o)
                for (var a = 0; a < o.length; a++)
                    o[a] = t + o[a];
            else {
                o = [];
                for (var l in s)
                    o.push(t + l)
            }
            if (this.addRules(s, t), n)
                for (var c = Array.prototype[r ? "push" : "unshift"], a = 0; a < o.length; a++)
                    c.apply(this.$rules[o[a]], i.deepCopy(n));
            this.$embeds || (this.$embeds = []), this.$embeds.push(t)
        }, this.getEmbeds = function() {
            return this.$embeds
        };
        var e = function(e, t) {
            return "start" != e && t.unshift(this.nextState, e), this.nextState
        }, t = function(e, t) {
            return t[0] !== e ? "start" : (t.shift(), t.shift())
        };
        this.normalizeRules = function() {
            function i(r) {
                var s = o[r];
                s.processed = !0;
                for (var a = 0; a < s.length; a++) {
                    var l = s[a];
                    !l.regex && l.start && (l.regex = l.start, l.next || (l.next = []), l.next.push({defaultToken: l.token}, {token: l.token + ".end",regex: l.end || l.start,next: "pop"}), l.token = l.token + ".start", l.push = !0);
                    var c = l.next || l.push;
                    if (c && Array.isArray(c)) {
                        var h = l.stateName || l.token + n++;
                        o[h] = c, l.next = h, i(h)
                    } else
                        "pop" == c && (l.next = t);
                    if (l.push && (l.nextState = l.next || l.push, l.next = e, delete l.push), l.rules)
                        for (var d in l.rules)
                            o[d] ? o[d].push && o[d].push.apply(o[d], l.rules[d]) : o[d] = l.rules[d];
                    if (l.include || "string" == typeof l)
                        var u = l.include || l, p = o[u];
                    else
                        Array.isArray(l) && (p = l);
                    if (p) {
                        var g = [a, 1].concat(p);
                        l.noEscape && (g = g.filter(function(e) {
                            return !e.next
                        })), s.splice.apply(s, g), a--, p = null
                    }
                }
            }
            var n = 0, o = this.$rules;
            Object.keys(o).forEach(i)
        }, this.createKeywordMapper = function(e, t, i, n) {
            var o = Object.create(null);
            return Object.keys(e).forEach(function(t) {
                var r = e[t];
                i && (r = r.toLowerCase());
                for (var s = r.split(n || "|"), a = s.length; a--; )
                    o[s[a]] = t
            }), e = null, i ? function(e) {
                return o[e.toLowerCase()] || t
            } : function(e) {
                return o[e] || t
            }
        }, this.getKeywords = function() {
            return this.$keywords
        }
    }).call(n.prototype), t.TextHighlightRules = n
}), define("ace/mode/behaviour", ["require", "exports", "module"], function(e, t) {
    var i = function() {
        this.$behaviours = {}
    };
    (function() {
        this.add = function(e, t, i) {
            switch (void 0) {
                case this.$behaviours:
                    this.$behaviours = {};
                case this.$behaviours[e]:
                    this.$behaviours[e] = {}
            }
            this.$behaviours[e][t] = i
        }, this.addBehaviours = function(e) {
            for (var t in e)
                for (var i in e[t])
                    this.add(t, i, e[t][i])
        }, this.remove = function(e) {
            this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
        }, this.inherit = function(e, t) {
            if ("function" == typeof e)
                var i = (new e).getBehaviours(t);
            else
                var i = e.getBehaviours(t);
            this.addBehaviours(i)
        }, this.getBehaviours = function(e) {
            if (!e)
                return this.$behaviours;
            for (var t = {}, i = 0; i < e.length; i++)
                this.$behaviours[e[i]] && (t[e[i]] = this.$behaviours[e[i]]);
            return t
        }
    }).call(i.prototype), t.Behaviour = i
}), define("ace/unicode", ["require", "exports", "module"], function(e, t) {
    function i(e) {
        var i = /\w{4}/g;
        for (var n in e)
            t.packages[n] = e[n].replace(i, "\\u$&")
    }
    t.packages = {}, i({L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",Me: "0488048906DE20DD-20E020E2-20E4A670-A672",N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",Z: "002000A01680180E2000-200A20282029202F205F3000",Zs: "002000A01680180E2000-200A202F205F3000",Zl: "2028",Zp: "2029",C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",Cc: "0000-001F007F-009F",Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",Co: "E000-F8FF",Cs: "D800-DFFF",Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"})
}), define("ace/token_iterator", ["require", "exports", "module"], function(e, t) {
    var i = function(e, t, i) {
        this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
        var n = e.getTokenAt(t, i);
        this.$tokenIndex = n ? n.index : -1
    };
    (function() {
        this.stepBackward = function() {
            for (this.$tokenIndex -= 1; this.$tokenIndex < 0; ) {
                if (this.$row -= 1, this.$row < 0)
                    return this.$row = 0, null;
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
            }
            return this.$rowTokens[this.$tokenIndex]
        }, this.stepForward = function() {
            this.$tokenIndex += 1;
            for (var e; this.$tokenIndex >= this.$rowTokens.length; ) {
                if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e)
                    return this.$row = e - 1, null;
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
            }
            return this.$rowTokens[this.$tokenIndex]
        }, this.getCurrentToken = function() {
            return this.$rowTokens[this.$tokenIndex]
        }, this.getCurrentTokenRow = function() {
            return this.$row
        }, this.getCurrentTokenColumn = function() {
            var e = this.$rowTokens, t = this.$tokenIndex, i = e[t].start;
            if (void 0 !== i)
                return i;
            for (i = 0; t > 0; )
                t -= 1, i += e[t].value.length;
            return i
        }
    }).call(i.prototype), t.TokenIterator = i
}), define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/event_emitter").EventEmitter, o = e("./range").Range, r = e("./anchor").Anchor, s = function(e) {
        this.$lines = [], 0 == e.length ? this.$lines = [""] : Array.isArray(e) ? this.insertLines(0, e) : this.insert({row: 0,column: 0}, e)
    };
    (function() {
        i.implement(this, n), this.setValue = function(e) {
            var t = this.getLength();
            this.remove(new o(0, 0, t, this.getLine(t - 1).length)), this.insert({row: 0,column: 0}, e)
        }, this.getValue = function() {
            return this.getAllLines().join(this.getNewLineCharacter())
        }, this.createAnchor = function(e, t) {
            return new r(this, e, t)
        }, this.$split = 0 == "aaa".split(/a/).length ? function(e) {
            return e.replace(/\r\n|\r/g, "\n").split("\n")
        } : function(e) {
            return e.split(/\r\n|\r|\n/)
        }, this.$detectNewLine = function(e) {
            var t = e.match(/^.*?(\r\n|\r|\n)/m);
            this.$autoNewLine = t ? t[1] : "\n"
        }, this.getNewLineCharacter = function() {
            switch (this.$newLineMode) {
                case "windows":
                    return "\r\n";
                case "unix":
                    return "\n";
                default:
                    return this.$autoNewLine
            }
        }, this.$autoNewLine = "\n", this.$newLineMode = "auto", this.setNewLineMode = function(e) {
            this.$newLineMode !== e && (this.$newLineMode = e)
        }, this.getNewLineMode = function() {
            return this.$newLineMode
        }, this.isNewLine = function(e) {
            return "\r\n" == e || "\r" == e || "\n" == e
        }, this.getLine = function(e) {
            return this.$lines[e] || ""
        }, this.getLines = function(e, t) {
            return this.$lines.slice(e, t + 1)
        }, this.getAllLines = function() {
            return this.getLines(0, this.getLength())
        }, this.getLength = function() {
            return this.$lines.length
        }, this.getTextRange = function(e) {
            if (e.start.row == e.end.row)
                return this.$lines[e.start.row].substring(e.start.column, e.end.column);
            var t = this.getLines(e.start.row + 1, e.end.row - 1);
            return t.unshift((this.$lines[e.start.row] || "").substring(e.start.column)), t.push((this.$lines[e.end.row] || "").substring(0, e.end.column)), t.join(this.getNewLineCharacter())
        }, this.$clipPosition = function(e) {
            var t = this.getLength();
            return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : e.row < 0 && (e.row = 0), e
        }, this.insert = function(e, t) {
            if (!t || 0 === t.length)
                return e;
            e = this.$clipPosition(e), this.getLength() <= 1 && this.$detectNewLine(t);
            var i = this.$split(t), n = i.splice(0, 1)[0], o = 0 == i.length ? null : i.splice(i.length - 1, 1)[0];
            return e = this.insertInLine(e, n), null !== o && (e = this.insertNewLine(e), e = this.insertLines(e.row, i), e = this.insertInLine(e, o || "")), e
        }, this.insertLines = function(e, t) {
            if (0 == t.length)
                return {row: e,column: 0};
            if (t.length > 65535) {
                var i = this.insertLines(e, t.slice(65535));
                t = t.slice(0, 65535)
            }
            var n = [e, 0];
            n.push.apply(n, t), this.$lines.splice.apply(this.$lines, n);
            var r = new o(e, 0, e + t.length, 0), s = {action: "insertLines",range: r,lines: t};
            return this._emit("change", {data: s}), i || r.end
        }, this.insertNewLine = function(e) {
            e = this.$clipPosition(e);
            var t = this.$lines[e.row] || "";
            this.$lines[e.row] = t.substring(0, e.column), this.$lines.splice(e.row + 1, 0, t.substring(e.column, t.length));
            var i = {row: e.row + 1,column: 0}, n = {action: "insertText",range: o.fromPoints(e, i),text: this.getNewLineCharacter()};
            return this._emit("change", {data: n}), i
        }, this.insertInLine = function(e, t) {
            if (0 == t.length)
                return e;
            var i = this.$lines[e.row] || "";
            this.$lines[e.row] = i.substring(0, e.column) + t + i.substring(e.column);
            var n = {row: e.row,column: e.column + t.length}, r = {action: "insertText",range: o.fromPoints(e, n),text: t};
            return this._emit("change", {data: r}), n
        }, this.remove = function(e) {
            if (e.start = this.$clipPosition(e.start), e.end = this.$clipPosition(e.end), e.isEmpty())
                return e.start;
            var t = e.start.row, i = e.end.row;
            if (e.isMultiLine()) {
                var n = 0 == e.start.column ? t : t + 1, o = i - 1;
                e.end.column > 0 && this.removeInLine(i, 0, e.end.column), o >= n && this.removeLines(n, o), n != t && (this.removeInLine(t, e.start.column, this.getLine(t).length), this.removeNewLine(e.start.row))
            } else
                this.removeInLine(t, e.start.column, e.end.column);
            return e.start
        }, this.removeInLine = function(e, t, i) {
            if (t != i) {
                var n = new o(e, t, e, i), r = this.getLine(e), s = r.substring(t, i), a = r.substring(0, t) + r.substring(i, r.length);
                this.$lines.splice(e, 1, a);
                var l = {action: "removeText",range: n,text: s};
                return this._emit("change", {data: l}), n.start
            }
        }, this.removeLines = function(e, t) {
            var i = new o(e, 0, t + 1, 0), n = this.$lines.splice(e, t - e + 1), r = {action: "removeLines",range: i,nl: this.getNewLineCharacter(),lines: n};
            return this._emit("change", {data: r}), n
        }, this.removeNewLine = function(e) {
            var t = this.getLine(e), i = this.getLine(e + 1), n = new o(e, t.length, e + 1, 0), r = t + i;
            this.$lines.splice(e, 2, r);
            var s = {action: "removeText",range: n,text: this.getNewLineCharacter()};
            this._emit("change", {data: s})
        }, this.replace = function(e, t) {
            if (0 == t.length && e.isEmpty())
                return e.start;
            if (t == this.getTextRange(e))
                return e.end;
            if (this.remove(e), t)
                var i = this.insert(e.start, t);
            else
                i = e.start;
            return i
        }, this.applyDeltas = function(e) {
            for (var t = 0; t < e.length; t++) {
                var i = e[t], n = o.fromPoints(i.range.start, i.range.end);
                "insertLines" == i.action ? this.insertLines(n.start.row, i.lines) : "insertText" == i.action ? this.insert(n.start, i.text) : "removeLines" == i.action ? this.removeLines(n.start.row, n.end.row - 1) : "removeText" == i.action && this.remove(n)
            }
        }, this.revertDeltas = function(e) {
            for (var t = e.length - 1; t >= 0; t--) {
                var i = e[t], n = o.fromPoints(i.range.start, i.range.end);
                "insertLines" == i.action ? this.removeLines(n.start.row, n.end.row - 1) : "insertText" == i.action ? this.remove(n) : "removeLines" == i.action ? this.insertLines(n.start.row, i.lines) : "removeText" == i.action && this.insert(n.start, i.text)
            }
        }, this.indexToPosition = function(e, t) {
            for (var i = this.$lines || this.getAllLines(), n = this.getNewLineCharacter().length, o = t || 0, r = i.length; r > o; o++)
                if (e -= i[o].length + n, 0 > e)
                    return {row: o,column: e + i[o].length + n};
            return {row: r - 1,column: i[r - 1].length}
        }, this.positionToIndex = function(e, t) {
            for (var i = this.$lines || this.getAllLines(), n = this.getNewLineCharacter().length, o = 0, r = Math.min(e.row, i.length), s = t || 0; r > s; ++s)
                o += i[s].length;
            return o + n * s + e.column
        }
    }).call(s.prototype), t.Document = s
}), define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/event_emitter").EventEmitter, o = t.Anchor = function(e, t, i) {
        this.document = e, "undefined" == typeof i ? this.setPosition(t.row, t.column) : this.setPosition(t, i), this.$onChange = this.onChange.bind(this), e.on("change", this.$onChange)
    };
    (function() {
        i.implement(this, n), this.getPosition = function() {
            return this.$clipPositionToDocument(this.row, this.column)
        }, this.getDocument = function() {
            return this.document
        }, this.onChange = function(e) {
            var t = e.data, i = t.range;
            if ((i.start.row != i.end.row || i.start.row == this.row) && !(i.start.row > this.row || i.start.row == this.row && i.start.column > this.column)) {
                var n = this.row, o = this.column, r = i.start, s = i.end;
                "insertText" === t.action ? r.row === n && r.column <= o ? r.row === s.row ? o += s.column - r.column : (o -= r.column, n += s.row - r.row) : r.row !== s.row && r.row < n && (n += s.row - r.row) : "insertLines" === t.action ? r.row <= n && (n += s.row - r.row) : "removeText" === t.action ? r.row === n && r.column < o ? o = s.column >= o ? r.column : Math.max(0, o - (s.column - r.column)) : r.row !== s.row && r.row < n ? (s.row === n && (o = Math.max(0, o - s.column) + r.column), n -= s.row - r.row) : s.row === n && (n -= s.row - r.row, o = Math.max(0, o - s.column) + r.column) : "removeLines" == t.action && r.row <= n && (s.row <= n ? n -= s.row - r.row : (n = r.row, o = 0)), this.setPosition(n, o, !0)
            }
        }, this.setPosition = function(e, t, i) {
            var n;
            if (n = i ? {row: e,column: t} : this.$clipPositionToDocument(e, t), this.row != n.row || this.column != n.column) {
                var o = {row: this.row,column: this.column};
                this.row = n.row, this.column = n.column, this._emit("change", {old: o,value: n})
            }
        }, this.detach = function() {
            this.document.removeEventListener("change", this.$onChange)
        }, this.$clipPositionToDocument = function(e, t) {
            var i = {};
            return e >= this.document.getLength() ? (i.row = Math.max(0, this.document.getLength() - 1), i.column = this.document.getLine(i.row).length) : 0 > e ? (i.row = 0, i.column = 0) : (i.row = e, i.column = Math.min(this.document.getLine(i.row).length, Math.max(0, t))), 0 > t && (i.column = 0), i
        }
    }).call(o.prototype)
}), define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/event_emitter").EventEmitter, o = function(e) {
        this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
        var t = this;
        this.$worker = function() {
            if (t.running) {
                for (var e = new Date, i = t.currentLine, n = t.doc, o = 0, r = n.getLength(); t.currentLine < r; ) {
                    for (t.$tokenizeRow(t.currentLine); t.lines[t.currentLine]; )
                        t.currentLine++;
                    if (o++, o % 5 == 0 && new Date - e > 20)
                        return t.fireUpdateEvent(i, t.currentLine - 1), void (t.running = setTimeout(t.$worker, 20))
                }
                t.running = !1, t.fireUpdateEvent(i, r - 1)
            }
        }
    };
    (function() {
        i.implement(this, n), this.setTokenizer = function(e) {
            this.tokenizer = e, this.lines = [], this.states = [], this.start(0)
        }, this.setDocument = function(e) {
            this.doc = e, this.lines = [], this.states = [], this.stop()
        }, this.fireUpdateEvent = function(e, t) {
            var i = {first: e,last: t};
            this._emit("update", {data: i})
        }, this.start = function(e) {
            this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
        }, this.$updateOnChange = function(e) {
            var t = e.range, i = t.start.row, n = t.end.row - i;
            if (0 === n)
                this.lines[i] = null;
            else if ("removeText" == e.action || "removeLines" == e.action)
                this.lines.splice(i, n + 1, null), this.states.splice(i, n + 1, null);
            else {
                var o = Array(n + 1);
                o.unshift(i, 1), this.lines.splice.apply(this.lines, o), this.states.splice.apply(this.states, o)
            }
            this.currentLine = Math.min(i, this.currentLine, this.doc.getLength()), this.stop(), this.running = setTimeout(this.$worker, 700)
        }, this.stop = function() {
            this.running && clearTimeout(this.running), this.running = !1
        }, this.getTokens = function(e) {
            return this.lines[e] || this.$tokenizeRow(e)
        }, this.getState = function(e) {
            return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start"
        }, this.$tokenizeRow = function(e) {
            var t = this.doc.getLine(e), i = this.states[e - 1], n = this.tokenizer.getLineTokens(t, i, e);
            return this.states[e] + "" != n.state + "" ? (this.states[e] = n.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = n.tokens
        }
    }).call(o.prototype), t.BackgroundTokenizer = o
}), define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t) {
    var i = e("./lib/lang"), n = (e("./lib/oop"), e("./range").Range), o = function(e, t, i) {
        this.setRegexp(e), this.clazz = t, this.type = i || "text"
    };
    (function() {
        this.MAX_RANGES = 500, this.setRegexp = function(e) {
            this.regExp + "" != e + "" && (this.regExp = e, this.cache = [])
        }, this.update = function(e, t, o, r) {
            if (this.regExp)
                for (var s = r.firstRow, a = r.lastRow, l = s; a >= l; l++) {
                    var c = this.cache[l];
                    null == c && (c = i.getMatchOffsets(o.getLine(l), this.regExp), c.length > this.MAX_RANGES && (c = c.slice(0, this.MAX_RANGES)), c = c.map(function(e) {
                        return new n(l, e.offset, l, e.offset + e.length)
                    }), this.cache[l] = c.length ? c : "");
                    for (var h = c.length; h--; )
                        t.drawSingleLineMarker(e, c[h].toScreenRange(o), this.clazz, r, null, this.type)
                }
        }
    }).call(o.prototype), t.SearchHighlight = o
}), define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function(e, t) {
    function i() {
        this.getFoldAt = function(e, t, i) {
            var n = this.getFoldLine(e);
            if (!n)
                return null;
            for (var o = n.folds, r = 0; r < o.length; r++) {
                var s = o[r];
                if (s.range.contains(e, t)) {
                    if (1 == i && s.range.isEnd(e, t))
                        continue;
                    if (-1 == i && s.range.isStart(e, t))
                        continue;
                    return s
                }
            }
        }, this.getFoldsInRange = function(e) {
            var t = e.start, i = e.end, n = this.$foldData, o = [];
            t.column += 1, i.column -= 1;
            for (var r = 0; r < n.length; r++) {
                var s = n[r].range.compareRange(e);
                if (2 != s) {
                    if (-2 == s)
                        break;
                    for (var a = n[r].folds, l = 0; l < a.length; l++) {
                        var c = a[l];
                        if (s = c.range.compareRange(e), -2 == s)
                            break;
                        if (2 != s) {
                            if (42 == s)
                                break;
                            o.push(c)
                        }
                    }
                }
            }
            return t.column -= 1, i.column += 1, o
        }, this.getAllFolds = function() {
            function e(e) {
                t.push(e)
            }
            for (var t = [], i = this.$foldData, n = 0; n < i.length; n++)
                for (var o = 0; o < i[n].folds.length; o++)
                    e(i[n].folds[o]);
            return t
        }, this.getFoldStringAt = function(e, t, i, n) {
            if (n = n || this.getFoldLine(e), !n)
                return null;
            for (var o, r, s = {end: {column: 0}}, a = 0; a < n.folds.length; a++) {
                r = n.folds[a];
                var l = r.range.compareEnd(e, t);
                if (-1 == l) {
                    o = this.getLine(r.start.row).substring(s.end.column, r.start.column);
                    break
                }
                if (0 === l)
                    return null;
                s = r
            }
            return o || (o = this.getLine(r.start.row).substring(s.end.column)), -1 == i ? o.substring(0, t - s.end.column) : 1 == i ? o.substring(t - s.end.column) : o
        }, this.getFoldLine = function(e, t) {
            var i = this.$foldData, n = 0;
            for (t && (n = i.indexOf(t)), -1 == n && (n = 0), n; n < i.length; n++) {
                var o = i[n];
                if (o.start.row <= e && o.end.row >= e)
                    return o;
                if (o.end.row > e)
                    return null
            }
            return null
        }, this.getNextFoldLine = function(e, t) {
            var i = this.$foldData, n = 0;
            for (t && (n = i.indexOf(t)), -1 == n && (n = 0), n; n < i.length; n++) {
                var o = i[n];
                if (o.end.row >= e)
                    return o
            }
            return null
        }, this.getFoldedRowCount = function(e, t) {
            for (var i = this.$foldData, n = t - e + 1, o = 0; o < i.length; o++) {
                var r = i[o], s = r.end.row, a = r.start.row;
                if (s >= t) {
                    t > a && (a >= e ? n -= t - a : n = 0);
                    break
                }
                s >= e && (n -= a >= e ? s - a : s - e + 1)
            }
            return n
        }, this.$addFoldLine = function(e) {
            return this.$foldData.push(e), this.$foldData.sort(function(e, t) {
                return e.start.row - t.start.row
            }), e
        }, this.addFold = function(e, t) {
            var i, n = this.$foldData, s = !1;
            e instanceof r ? i = e : (i = new r(t, e), i.collapseChildren = t.collapseChildren), this.$clipRangeToDocument(i.range);
            var a = i.start.row, l = i.start.column, c = i.end.row, h = i.end.column;
            if (a == c && 2 > h - l)
                throw "The range has to be at least 2 characters width";
            var d = this.getFoldAt(a, l, 1), u = this.getFoldAt(c, h, -1);
            if (d && u == d)
                return d.addSubFold(i);
            if (d && !d.range.isStart(a, l) || u && !u.range.isEnd(c, h))
                throw "A fold can't intersect already existing fold" + i.range + d.range;
            var p = this.getFoldsInRange(i.range);
            p.length > 0 && (this.removeFolds(p), p.forEach(function(e) {
                i.addSubFold(e)
            }));
            for (var g = 0; g < n.length; g++) {
                var m = n[g];
                if (c == m.start.row) {
                    m.addFold(i), s = !0;
                    break
                }
                if (a == m.end.row) {
                    if (m.addFold(i), s = !0, !i.sameRow) {
                        var f = n[g + 1];
                        if (f && f.start.row == c) {
                            m.merge(f);
                            break
                        }
                    }
                    break
                }
                if (c <= m.start.row)
                    break
            }
            return s || (m = this.$addFoldLine(new o(this.$foldData, i))), this.$useWrapMode ? this.$updateWrapData(m.start.row, m.start.row) : this.$updateRowLengthCache(m.start.row, m.start.row), this.$modified = !0, this._emit("changeFold", {data: i}), i
        }, this.addFolds = function(e) {
            e.forEach(function(e) {
                this.addFold(e)
            }, this)
        }, this.removeFold = function(e) {
            var t = e.foldLine, i = t.start.row, n = t.end.row, o = this.$foldData, r = t.folds;
            if (1 == r.length)
                o.splice(o.indexOf(t), 1);
            else if (t.range.isEnd(e.end.row, e.end.column))
                r.pop(), t.end.row = r[r.length - 1].end.row, t.end.column = r[r.length - 1].end.column;
            else if (t.range.isStart(e.start.row, e.start.column))
                r.shift(), t.start.row = r[0].start.row, t.start.column = r[0].start.column;
            else if (e.sameRow)
                r.splice(r.indexOf(e), 1);
            else {
                var s = t.split(e.start.row, e.start.column);
                r = s.folds, r.shift(), s.start.row = r[0].start.row, s.start.column = r[0].start.column
            }
            this.$updating || (this.$useWrapMode ? this.$updateWrapData(i, n) : this.$updateRowLengthCache(i, n)), this.$modified = !0, this._emit("changeFold", {data: e})
        }, this.removeFolds = function(e) {
            for (var t = [], i = 0; i < e.length; i++)
                t.push(e[i]);
            t.forEach(function(e) {
                this.removeFold(e)
            }, this), this.$modified = !0
        }, this.expandFold = function(e) {
            this.removeFold(e), e.subFolds.forEach(function(t) {
                e.restoreRange(t), this.addFold(t)
            }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = []
        }, this.expandFolds = function(e) {
            e.forEach(function(e) {
                this.expandFold(e)
            }, this)
        }, this.unfold = function(e, t) {
            var i, o;
            if (null == e ? (i = new n(0, 0, this.getLength(), 0), t = !0) : i = "number" == typeof e ? new n(e, 0, e, this.getLine(e).length) : "row" in e ? n.fromPoints(e, e) : e, o = this.getFoldsInRange(i), t)
                this.removeFolds(o);
            else
                for (; o.length; )
                    this.expandFolds(o), o = this.getFoldsInRange(i)
        }, this.isRowFolded = function(e, t) {
            return !!this.getFoldLine(e, t)
        }, this.getRowFoldEnd = function(e, t) {
            var i = this.getFoldLine(e, t);
            return i ? i.end.row : e
        }, this.getRowFoldStart = function(e, t) {
            var i = this.getFoldLine(e, t);
            return i ? i.start.row : e
        }, this.getFoldDisplayLine = function(e, t, i, n, o) {
            null == n && (n = e.start.row, o = 0), null == t && (t = e.end.row, i = this.getLine(t).length);
            var r = this.doc, s = "";
            return e.walk(function(e, t, i, a) {
                if (!(n > t)) {
                    if (t == n) {
                        if (o > i)
                            return;
                        a = Math.max(o, a)
                    }
                    s += null != e ? e : r.getLine(t).substring(a, i)
                }
            }, t, i), s
        }, this.getDisplayLine = function(e, t, i, n) {
            var o = this.getFoldLine(e);
            if (!o) {
                var r;
                return r = this.doc.getLine(e), r.substring(n || 0, t || r.length)
            }
            return this.getFoldDisplayLine(o, e, t, i, n)
        }, this.$cloneFoldData = function() {
            var e = [];
            return e = this.$foldData.map(function(t) {
                var i = t.folds.map(function(e) {
                    return e.clone()
                });
                return new o(e, i)
            })
        }, this.toggleFold = function(e) {
            var t, i, n = this.selection, o = n.getRange();
            if (o.isEmpty()) {
                var r = o.start;
                if (t = this.getFoldAt(r.row, r.column))
                    return void this.expandFold(t);
                (i = this.findMatchingBracket(r)) ? 1 == o.comparePoint(i) ? o.end = i : (o.start = i, o.start.column++, o.end.column--) : (i = this.findMatchingBracket({row: r.row,column: r.column + 1})) ? (1 == o.comparePoint(i) ? o.end = i : o.start = i, o.start.column++) : o = this.getCommentFoldRange(r.row, r.column) || o
            } else {
                var s = this.getFoldsInRange(o);
                if (e && s.length)
                    return void this.expandFolds(s);
                1 == s.length && (t = s[0])
            }
            if (t || (t = this.getFoldAt(o.start.row, o.start.column)), t && t.range.toString() == o.toString())
                return void this.expandFold(t);
            var a = "...";
            if (!o.isMultiLine()) {
                if (a = this.getTextRange(o), a.length < 4)
                    return;
                a = a.trim().substring(0, 2) + ".."
            }
            this.addFold(a, o)
        }, this.getCommentFoldRange = function(e, t, i) {
            var o = new s(this, e, t), r = o.getCurrentToken();
            if (r && /^comment|string/.test(r.type)) {
                var a = new n, l = new RegExp(r.type.replace(/\..*/, "\\."));
                if (1 != i) {
                    do
                        r = o.stepBackward();
                    while (r && l.test(r.type));
                    o.stepForward()
                }
                if (a.start.row = o.getCurrentTokenRow(), a.start.column = o.getCurrentTokenColumn() + 2, o = new s(this, e, t), -1 != i) {
                    do
                        r = o.stepForward();
                    while (r && l.test(r.type));
                    r = o.stepBackward()
                } else
                    r = o.getCurrentToken();
                return a.end.row = o.getCurrentTokenRow(), a.end.column = o.getCurrentTokenColumn() + r.value.length - 2, a
            }
        }, this.foldAll = function(e, t, i) {
            void 0 == i && (i = 1e5);
            var n = this.foldWidgets;
            t = t || this.getLength();
            for (var o = e || 0; t > o; o++)
                if (null == n[o] && (n[o] = this.getFoldWidget(o)), "start" == n[o]) {
                    var r = this.getFoldWidgetRange(o);
                    if (r && r.end.row <= t)
                        try {
                            var s = this.addFold("...", r);
                            s.collapseChildren = i
                        } catch (a) {
                        }
                    o = r.end.row
                }
        }, this.$foldStyles = {manual: 1,markbegin: 1,markbeginend: 1}, this.$foldStyle = "markbegin", this.setFoldStyle = function(e) {
            if (!this.$foldStyles[e])
                throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
            if (this.$foldStyle != e) {
                this.$foldStyle = e, "manual" == e && this.unfold();
                var t = this.$foldMode;
                this.$setFolding(null), this.$setFolding(t)
            }
        }, this.$setFolding = function(e) {
            return this.$foldMode != e ? (this.$foldMode = e, this.removeListener("change", this.$updateFoldWidgets), this._emit("changeAnnotation"), e && "manual" != this.$foldStyle ? (this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), void 0) : void (this.foldWidgets = null)) : void 0
        }, this.getParentFoldRangeData = function(e, t) {
            var i = this.foldWidgets;
            if (!i || t && i[e])
                return {};
            for (var n, o = e - 1; o >= 0; ) {
                var r = i[o];
                if (null == r && (r = i[o] = this.getFoldWidget(o)), "start" == r) {
                    var s = this.getFoldWidgetRange(o);
                    if (n || (n = s), s && s.end.row >= e)
                        break
                }
                o--
            }
            return {range: -1 !== o && s,firstRange: n}
        }, this.onFoldWidgetClick = function(e, t) {
            var i = this.getFoldWidget(e), n = this.getLine(e);
            t = t.domEvent;
            var o = t.shiftKey, r = t.ctrlKey || t.metaKey, s = t.altKey, a = "end" === i ? -1 : 1, l = this.getFoldAt(e, -1 === a ? 0 : n.length, a);
            if (l)
                return void (o || r ? this.removeFold(l) : this.expandFold(l));
            var c = this.getFoldWidgetRange(e);
            if (c && !c.isMultiLine() && (l = this.getFoldAt(c.start.row, c.start.column, 1), l && c.isEqual(l.range)))
                return void this.removeFold(l);
            if (s) {
                var h = this.getParentFoldRangeData(e);
                if (h.range)
                    var d = h.range.start.row + 1, u = h.range.end.row;
                this.foldAll(d, u, r ? 1e4 : 0)
            } else if (o) {
                var u = c ? c.end.row : this.getLength();
                this.foldAll(e + 1, c.end.row, r ? 1e4 : 0)
            } else
                c && (r && (c.collapseChildren = 1e4), this.addFold("...", c));
            c || ((t.target || t.srcElement).className += " ace_invalid")
        }, this.updateFoldWidgets = function(e) {
            var t = e.data, i = t.range, n = i.start.row, o = i.end.row - n;
            if (0 === o)
                this.foldWidgets[n] = null;
            else if ("removeText" == t.action || "removeLines" == t.action)
                this.foldWidgets.splice(n, o + 1, null);
            else {
                var r = Array(o + 1);
                r.unshift(n, 1), this.foldWidgets.splice.apply(this.foldWidgets, r)
            }
        }
    }
    var n = e("../range").Range, o = e("./fold_line").FoldLine, r = e("./fold").Fold, s = e("../token_iterator").TokenIterator;
    t.Folding = i
}), define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function(e, t) {
    function i(e, t) {
        this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
        var i = t[t.length - 1];
        this.range = new n(t[0].start.row, t[0].start.column, i.end.row, i.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(e) {
            e.setFoldLine(this)
        }, this)
    }
    var n = e("../range").Range;
    (function() {
        this.shiftRow = function(e) {
            this.start.row += e, this.end.row += e, this.folds.forEach(function(t) {
                t.start.row += e, t.end.row += e
            })
        }, this.addFold = function(e) {
            if (e.sameRow) {
                if (e.start.row < this.startRow || e.endRow > this.endRow)
                    throw "Can't add a fold to this FoldLine as it has no connection";
                this.folds.push(e), this.folds.sort(function(e, t) {
                    return -e.range.compareEnd(t.start.row, t.start.column)
                }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
            } else if (e.start.row == this.end.row)
                this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;
            else {
                if (e.end.row != this.start.row)
                    throw "Trying to add fold to FoldRow that doesn't have a matching row";
                this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
            }
            e.foldLine = this
        }, this.containsRow = function(e) {
            return e >= this.start.row && e <= this.end.row
        }, this.walk = function(e, t, i) {
            var n, o, r, s = 0, a = this.folds, l = !0;
            null == t && (t = this.end.row, i = this.end.column);
            for (var c = 0; c < a.length; c++) {
                if (n = a[c], o = n.range.compareStart(t, i), -1 == o)
                    return void e(null, t, i, s, l);
                if (r = e(null, n.start.row, n.start.column, s, l), r = !r && e(n.placeholder, n.start.row, n.start.column, s), r || 0 == o)
                    return;
                l = !n.sameRow, s = n.end.column
            }
            e(null, t, i, s, l)
        }, this.getNextFoldTo = function(e, t) {
            for (var i, n, o = 0; o < this.folds.length; o++) {
                if (i = this.folds[o], n = i.range.compareEnd(e, t), -1 == n)
                    return {fold: i,kind: "after"};
                if (0 == n)
                    return {fold: i,kind: "inside"}
            }
            return null
        }, this.addRemoveChars = function(e, t, i) {
            var n, o, r = this.getNextFoldTo(e, t);
            if (r)
                if (n = r.fold, "inside" == r.kind && n.start.column != t && n.start.row != e)
                    window.console && window.console.log(e, t, n);
                else if (n.start.row == e) {
                    o = this.folds;
                    var s = o.indexOf(n);
                    for (0 == s && (this.start.column += i), s; s < o.length; s++) {
                        if (n = o[s], n.start.column += i, !n.sameRow)
                            return;
                        n.end.column += i
                    }
                    this.end.column += i
                }
        }, this.split = function(e, t) {
            var n = this.getNextFoldTo(e, t).fold, o = this.folds, r = this.foldData;
            if (!n)
                return null;
            var s = o.indexOf(n), a = o[s - 1];
            this.end.row = a.end.row, this.end.column = a.end.column, o = o.splice(s, o.length - s);
            var l = new i(r, o);
            return r.splice(r.indexOf(this) + 1, 0, l), l
        }, this.merge = function(e) {
            for (var t = e.folds, i = 0; i < t.length; i++)
                this.addFold(t[i]);
            var n = this.foldData;
            n.splice(n.indexOf(e), 1)
        }, this.toString = function() {
            var e = [this.range.toString() + ": ["];
            return this.folds.forEach(function(t) {
                e.push("  " + t.toString())
            }), e.push("]"), e.join("\n")
        }, this.idxToPosition = function(e) {
            for (var t, i = 0, n = 0; n < this.folds.length; n++) {
                var t = this.folds[n];
                if (e -= t.start.column - i, 0 > e)
                    return {row: t.start.row,column: t.start.column + e};
                if (e -= t.placeholder.length, 0 > e)
                    return t.start;
                i = t.end.column
            }
            return {row: this.end.row,column: this.end.column + e}
        }
    }).call(i.prototype), t.FoldLine = i
}), define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function(e, t) {
    function i(e, t) {
        e.row -= t.row, 0 == e.row && (e.column -= t.column)
    }
    function n(e, t) {
        i(e.start, t), i(e.end, t)
    }
    function o(e, t) {
        0 == e.row && (e.column += t.column), e.row += t.row
    }
    function r(e, t) {
        o(e.start, t), o(e.end, t)
    }
    var s = (e("../range").Range, e("../range_list").RangeList), a = e("../lib/oop"), l = t.Fold = function(e, t) {
        this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = []
    };
    a.inherits(l, s), function() {
        this.toString = function() {
            return '"' + this.placeholder + '" ' + this.range.toString()
        }, this.setFoldLine = function(e) {
            this.foldLine = e, this.subFolds.forEach(function(t) {
                t.setFoldLine(e)
            })
        }, this.clone = function() {
            var e = this.range.clone(), t = new l(e, this.placeholder);
            return this.subFolds.forEach(function(e) {
                t.subFolds.push(e.clone())
            }), t.collapseChildren = this.collapseChildren, t
        }, this.addSubFold = function(e) {
            if (!this.range.isEqual(e)) {
                if (!this.range.containsRange(e))
                    throw "A fold can't intersect already existing fold" + e.range + this.range;
                n(e, this.start);
                for (var t = e.start.row, i = e.start.column, o = 0, r = -1; o < this.subFolds.length && (r = this.subFolds[o].range.compare(t, i), 1 == r); o++)
                    ;
                var s = this.subFolds[o];
                if (0 == r)
                    return s.addSubFold(e);
                for (var t = e.range.end.row, i = e.range.end.column, a = o, r = -1; a < this.subFolds.length && (r = this.subFolds[a].range.compare(t, i), 1 == r); a++)
                    ;
                {
                    this.subFolds[a]
                }
                if (0 == r)
                    throw "A fold can't intersect already existing fold" + e.range + this.range;
                {
                    this.subFolds.splice(o, a - o, e)
                }
                return e.setFoldLine(this.foldLine), e
            }
        }, this.restoreRange = function(e) {
            return r(e, this.start)
        }
    }.call(l.prototype)
}), define("ace/range_list", ["require", "exports", "module", "ace/range"], function(e, t) {
    var i = e("./range").Range, n = i.comparePoints, o = function() {
        this.ranges = []
    };
    (function() {
        this.comparePoints = n, this.pointIndex = function(e, t, i) {
            for (var o = this.ranges, r = i || 0; r < o.length; r++) {
                var s = o[r], a = n(e, s.end);
                if (!(a > 0)) {
                    var l = n(e, s.start);
                    return 0 === a ? t && 0 !== l ? -r - 2 : r : l > 0 || 0 === l && !t ? r : -r - 1
                }
            }
            return -r - 1
        }, this.add = function(e) {
            var t = !e.isEmpty(), i = this.pointIndex(e.start, t);
            0 > i && (i = -i - 1);
            var n = this.pointIndex(e.end, t, i);
            return 0 > n ? n = -n - 1 : n++, this.ranges.splice(i, n - i, e)
        }, this.addList = function(e) {
            for (var t = [], i = e.length; i--; )
                t.push.call(t, this.add(e[i]));
            return t
        }, this.substractPoint = function(e) {
            var t = this.pointIndex(e);
            return t >= 0 ? this.ranges.splice(t, 1) : void 0
        }, this.merge = function() {
            var e = [], t = this.ranges;
            t = t.sort(function(e, t) {
                return n(e.start, t.start)
            });
            for (var i, o = t[0], r = 1; r < t.length; r++) {
                i = o, o = t[r];
                var s = n(i.end, o.start);
                0 > s || (0 != s || i.isEmpty() || o.isEmpty()) && (n(i.end, o.end) < 0 && (i.end.row = o.end.row, i.end.column = o.end.column), t.splice(r, 1), e.push(o), o = i, r--)
            }
            return this.ranges = t, e
        }, this.contains = function(e, t) {
            return this.pointIndex({row: e,column: t}) >= 0
        }, this.containsPoint = function(e) {
            return this.pointIndex(e) >= 0
        }, this.rangeAtPoint = function(e) {
            var t = this.pointIndex(e);
            return t >= 0 ? this.ranges[t] : void 0
        }, this.clipRows = function(e, t) {
            var i = this.ranges;
            if (i[0].start.row > t || i[i.length - 1].start.row < e)
                return [];
            var n = this.pointIndex({row: e,column: 0});
            0 > n && (n = -n - 1);
            var o = this.pointIndex({row: t,column: 0}, n);
            0 > o && (o = -o - 1);
            for (var r = [], s = n; o > s; s++)
                r.push(i[s]);
            return r
        }, this.removeAll = function() {
            return this.ranges.splice(0, this.ranges.length)
        }, this.attach = function(e) {
            this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
        }, this.detach = function() {
            this.session && (this.session.removeListener("change", this.onChange), this.session = null)
        }, this.$onChange = function(e) {
            var t = e.data.range;
            if ("i" == e.data.action[0])
                var i = t.start, n = t.end;
            else
                var n = t.start, i = t.end;
            for (var o = i.row, r = n.row, s = r - o, a = -i.column + n.column, l = this.ranges, c = 0, h = l.length; h > c; c++) {
                var d = l[c];
                if (!(d.end.row < o)) {
                    if (d.start.row > o)
                        break;
                    d.start.row == o && d.start.column >= i.column && (d.start.column += a, d.start.row += s), d.end.row == o && d.end.column >= i.column && (d.end.column == i.column && a > 0 && h - 1 > c && d.end.column > d.start.column && d.end.column == l[c + 1].start.column && (d.end.column -= a), d.end.column += a, d.end.row += s)
                }
            }
            if (0 != s && h > c)
                for (; h > c; c++) {
                    var d = l[c];
                    d.start.row += s, d.end.row += s
                }
        }
    }).call(o.prototype), t.RangeList = o
}), define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function(e, t) {
    function i() {
        this.findMatchingBracket = function(e, t) {
            if (0 == e.column)
                return null;
            var i = t || this.getLine(e.row).charAt(e.column - 1);
            if ("" == i)
                return null;
            var n = i.match(/([\(\[\{])|([\)\]\}])/);
            return n ? n[1] ? this.$findClosingBracket(n[1], e) : this.$findOpeningBracket(n[2], e) : null
        }, this.getBracketRange = function(e) {
            var t, i = this.getLine(e.row), n = !0, r = i.charAt(e.column - 1), s = r && r.match(/([\(\[\{])|([\)\]\}])/);
            if (s || (r = i.charAt(e.column), e = {row: e.row,column: e.column + 1}, s = r && r.match(/([\(\[\{])|([\)\]\}])/), n = !1), !s)
                return null;
            if (s[1]) {
                var a = this.$findClosingBracket(s[1], e);
                if (!a)
                    return null;
                t = o.fromPoints(e, a), n || (t.end.column++, t.start.column--), t.cursor = t.end
            } else {
                var a = this.$findOpeningBracket(s[2], e);
                if (!a)
                    return null;
                t = o.fromPoints(a, e), n || (t.start.column++, t.end.column--), t.cursor = t.start
            }
            return t
        }, this.$brackets = {")": "(","(": ")","]": "[","[": "]","{": "}","}": "{"}, this.$findOpeningBracket = function(e, t, i) {
            var o = this.$brackets[e], r = 1, s = new n(this, t.row, t.column), a = s.getCurrentToken();
            if (a || (a = s.stepForward()), a) {
                i || (i = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("rparen", ".paren") + ")+"));
                for (var l = t.column - s.getCurrentTokenColumn() - 2, c = a.value; ; ) {
                    for (; l >= 0; ) {
                        var h = c.charAt(l);
                        if (h == o) {
                            if (r -= 1, 0 == r)
                                return {row: s.getCurrentTokenRow(),column: l + s.getCurrentTokenColumn()}
                        } else
                            h == e && (r += 1);
                        l -= 1
                    }
                    do
                        a = s.stepBackward();
                    while (a && !i.test(a.type));
                    if (null == a)
                        break;
                    c = a.value, l = c.length - 1
                }
                return null
            }
        }, this.$findClosingBracket = function(e, t, i) {
            var o = this.$brackets[e], r = 1, s = new n(this, t.row, t.column), a = s.getCurrentToken();
            if (a || (a = s.stepForward()), a) {
                i || (i = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("lparen", ".paren") + ")+"));
                for (var l = t.column - s.getCurrentTokenColumn(); ; ) {
                    for (var c = a.value, h = c.length; h > l; ) {
                        var d = c.charAt(l);
                        if (d == o) {
                            if (r -= 1, 0 == r)
                                return {row: s.getCurrentTokenRow(),column: l + s.getCurrentTokenColumn()}
                        } else
                            d == e && (r += 1);
                        l += 1
                    }
                    do
                        a = s.stepForward();
                    while (a && !i.test(a.type));
                    if (null == a)
                        break;
                    l = 0
                }
                return null
            }
        }
    }
    var n = e("../token_iterator").TokenIterator, o = e("../range").Range;
    t.BracketMatch = i
}), define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t) {
    var i = e("./lib/lang"), n = e("./lib/oop"), o = e("./range").Range, r = function() {
        this.$options = {}
    };
    (function() {
        this.set = function(e) {
            return n.mixin(this.$options, e), this
        }, this.getOptions = function() {
            return i.copyObject(this.$options)
        }, this.setOptions = function(e) {
            this.$options = e
        }, this.find = function(e) {
            var t = this.$matchIterator(e, this.$options);
            if (!t)
                return !1;
            var i = null;
            return t.forEach(function(e, t, n) {
                if (e.start)
                    i = e;
                else {
                    var r = e.offset + (n || 0);
                    i = new o(t, r, t, r + e.length)
                }
                return !0
            }), i
        }, this.findAll = function(e) {
            var t = this.$options;
            if (!t.needle)
                return [];
            this.$assembleRegExp(t);
            var n = t.range, r = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines(), s = [], a = t.re;
            if (t.$isMultiLine)
                for (var l = a.length, c = r.length - l, h = a.offset || 0; c >= h; h++) {
                    for (var d = 0; l > d && -1 != r[h + d].search(a[d]); d++)
                        ;
                    var u = r[h], p = r[h + l - 1], g = u.match(a[0])[0].length, m = p.match(a[l - 1])[0].length;
                    s.push(new o(h, u.length - g, h + l - 1, m))
                }
            else
                for (var f = 0; f < r.length; f++)
                    for (var v = i.getMatchOffsets(r[f], a), d = 0; d < v.length; d++) {
                        var b = v[d];
                        s.push(new o(f, b.offset, f, b.offset + b.length))
                    }
            if (n) {
                for (var w = n.start.column, C = n.start.column, f = 0, d = s.length - 1; d > f && s[f].start.column < w && s[f].start.row == n.start.row; )
                    f++;
                for (; d > f && s[d].end.column > C && s[d].end.row == n.end.row; )
                    d--;
                for (s = s.slice(f, d + 1), f = 0, d = s.length; d > f; f++)
                    s[f].start.row += n.start.row, s[f].end.row += n.start.row
            }
            return s
        }, this.replace = function(e, t) {
            var i = this.$options, n = this.$assembleRegExp(i);
            if (i.$isMultiLine)
                return t;
            if (n) {
                var o = n.exec(e);
                if (!o || o[0].length != e.length)
                    return null;
                if (t = e.replace(n, t), i.preserveCase) {
                    t = t.split("");
                    for (var r = Math.min(e.length, e.length); r--; ) {
                        var s = e[r];
                        t[r] = s && s.toLowerCase() != s ? t[r].toUpperCase() : t[r].toLowerCase()
                    }
                    t = t.join("")
                }
                return t
            }
        }, this.$matchIterator = function(e, t) {
            var n = this.$assembleRegExp(t);
            if (!n)
                return !1;
            var r, s = this, a = t.backwards;
            if (t.$isMultiLine)
                var l = n.length, c = function(t, i, s) {
                    var a = t.search(n[0]);
                    if (-1 != a) {
                        for (var c = 1; l > c; c++)
                            if (t = e.getLine(i + c), -1 == t.search(n[c]))
                                return;
                        var h = t.match(n[l - 1])[0].length, d = new o(i, a, i + l - 1, h);
                        return 1 == n.offset ? (d.start.row--, d.start.column = Number.MAX_VALUE) : s && (d.start.column += s), r(d) ? !0 : void 0
                    }
                };
            else if (a)
                var c = function(e, t, o) {
                    for (var s = i.getMatchOffsets(e, n), a = s.length - 1; a >= 0; a--)
                        if (r(s[a], t, o))
                            return !0
                };
            else
                var c = function(e, t, o) {
                    for (var s = i.getMatchOffsets(e, n), a = 0; a < s.length; a++)
                        if (r(s[a], t, o))
                            return !0
                };
            return {forEach: function(i) {
                    r = i, s.$lineIterator(e, t).forEach(c)
                }}
        }, this.$assembleRegExp = function(e) {
            if (e.needle instanceof RegExp)
                return e.re = e.needle;
            var t = e.needle;
            if (!e.needle)
                return e.re = !1;
            e.regExp || (t = i.escapeRegExp(t)), e.wholeWord && (t = "\\b" + t + "\\b");
            var n = e.caseSensitive ? "g" : "gi";
            if (e.$isMultiLine = /[\n\r]/.test(t), e.$isMultiLine)
                return e.re = this.$assembleMultilineRegExp(t, n);
            try {
                var o = new RegExp(t, n)
            } catch (r) {
                o = !1
            }
            return e.re = o
        }, this.$assembleMultilineRegExp = function(e, t) {
            for (var i = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), n = [], o = 0; o < i.length; o++)
                try {
                    n.push(new RegExp(i[o], t))
                } catch (r) {
                    return !1
                }
            return "" == i[0] ? (n.shift(), n.offset = 1) : n.offset = 0, n
        }, this.$lineIterator = function(e, t) {
            var i = 1 == t.backwards, n = 0 != t.skipCurrent, o = t.range, r = t.start;
            r || (r = o ? o[i ? "end" : "start"] : e.selection.getRange()), r.start && (r = r[n != i ? "end" : "start"]);
            var s = o ? o.start.row : 0, a = o ? o.end.row : e.getLength() - 1, l = i ? function(i) {
                var n = r.row, o = e.getLine(n).substring(0, r.column);
                if (!i(o, n)) {
                    for (n--; n >= s; n--)
                        if (i(e.getLine(n), n))
                            return;
                    if (0 != t.wrap)
                        for (n = a, s = r.row; n >= s; n--)
                            if (i(e.getLine(n), n))
                                return
                }
            } : function(i) {
                var n = r.row, o = e.getLine(n).substr(r.column);
                if (!i(o, n, r.column)) {
                    for (n += 1; a >= n; n++)
                        if (i(e.getLine(n), n))
                            return;
                    if (0 != t.wrap)
                        for (n = s, a = r.row; a >= n; n++)
                            if (i(e.getLine(n), n))
                                return
                }
            };
            return {forEach: l}
        }
    }).call(r.prototype), t.Search = r
}), define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function(e, t) {
    var i = e("../lib/oop"), n = e("../keyboard/hash_handler").HashHandler, o = e("../lib/event_emitter").EventEmitter, r = function(e, t) {
        this.platform = e, this.commands = this.byName = {}, this.commmandKeyBinding = {}, this.addCommands(t), this.setDefaultHandler("exec", function(e) {
            return e.command.exec(e.editor, e.args || {})
        })
    };
    i.inherits(r, n), function() {
        i.implement(this, o), this.exec = function(e, t, i) {
            if ("string" == typeof e && (e = this.commands[e]), !e)
                return !1;
            if (t && t.$readOnly && !e.readOnly)
                return !1;
            var n = {editor: t,command: e,args: i}, o = this._emit("exec", n);
            return this._signal("afterExec", n), o === !1 ? !1 : !0
        }, this.toggleRecording = function(e) {
            return this.$inReplay ? void 0 : (e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function(e) {
                this.macro.push([e.command, e.args])
            }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0))
        }, this.replay = function(e) {
            if (!this.$inReplay && this.macro) {
                if (this.recording)
                    return this.toggleRecording(e);
                try {
                    this.$inReplay = !0, this.macro.forEach(function(t) {
                        "string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1])
                    }, this)
                }finally {
                    this.$inReplay = !1
                }
            }
        }, this.trimMacro = function(e) {
            return e.map(function(e) {
                return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e
            })
        }
    }.call(r.prototype), t.CommandManager = r
}), define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(e, t) {
    function i(e, t) {
        this.platform = t || (o.isMac ? "mac" : "win"), this.commands = {}, this.commmandKeyBinding = {}, this.addCommands(e)
    }
    var n = e("../lib/keys"), o = e("../lib/useragent");
    (function() {
        this.addCommand = function(e) {
            this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e)
        }, this.removeCommand = function(e) {
            var t = "string" == typeof e ? e : e.name;
            e = this.commands[t], delete this.commands[t];
            var i = this.commmandKeyBinding;
            for (var n in i)
                for (var o in i[n])
                    i[n][o] == e && delete i[n][o]
        }, this.bindKey = function(e, t) {
            if (e) {
                if ("function" == typeof t)
                    return void this.addCommand({exec: t,bindKey: e,name: t.name || e});
                var i = this.commmandKeyBinding;
                e.split("|").forEach(function(e) {
                    var n = this.parseKeys(e, t), o = n.hashId;
                    (i[o] || (i[o] = {}))[n.key] = t
                }, this)
            }
        }, this.addCommands = function(e) {
            e && Object.keys(e).forEach(function(t) {
                var i = e[t];
                return "string" == typeof i ? this.bindKey(i, t) : ("function" == typeof i && (i = {exec: i}), i.name || (i.name = t), this.addCommand(i), void 0)
            }, this)
        }, this.removeCommands = function(e) {
            Object.keys(e).forEach(function(t) {
                this.removeCommand(e[t])
            }, this)
        }, this.bindKeys = function(e) {
            Object.keys(e).forEach(function(t) {
                this.bindKey(t, e[t])
            }, this)
        }, this._buildKeyHash = function(e) {
            var t = e.bindKey;
            if (t) {
                var i = "string" == typeof t ? t : t[this.platform];
                this.bindKey(i, e)
            }
        }, this.parseKeys = function(e) {
            -1 != e.indexOf(" ") && (e = e.split(/\s+/).pop());
            var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e) {
                return e
            }), i = t.pop(), o = n[i];
            if (n.FUNCTION_KEYS[o])
                i = n.FUNCTION_KEYS[o].toLowerCase();
            else {
                if (!t.length)
                    return {key: i,hashId: -1};
                if (1 == t.length && "shift" == t[0])
                    return {key: i.toUpperCase(),hashId: -1}
            }
            for (var r = 0, s = t.length; s--; ) {
                var a = n.KEY_MODS[t[s]];
                if (null == a)
                    return "undefined" != typeof console && console.error("invalid modifier " + t[s] + " in " + e), !1;
                r |= a
            }
            return {key: i,hashId: r}
        }, this.findKeyCommand = function(e, t) {
            var i = this.commmandKeyBinding;
            return i[e] && i[e][t]
        }, this.handleKeyboard = function(e, t, i) {
            return {command: this.findKeyCommand(t, i)}
        }
    }).call(i.prototype), t.HashHandler = i
}), define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config"], function(e, t) {
    function i(e, t) {
        return {win: e,mac: t}
    }
    var n = e("../lib/lang"), o = e("../config");
    t.commands = [{name: "showSettingsMenu",bindKey: i("Ctrl-,", "Command-,"),exec: function(e) {
                o.loadModule("ace/ext/settings_menu", function(t) {
                    t.init(e), e.showSettingsMenu()
                })
            },readOnly: !0}, {name: "selectall",bindKey: i("Ctrl-A", "Command-A"),exec: function(e) {
                e.selectAll()
            },readOnly: !0}, {name: "centerselection",bindKey: i(null, "Ctrl-L"),exec: function(e) {
                e.centerSelection()
            },readOnly: !0}, {name: "gotoline",bindKey: i("Ctrl-L", "Command-L"),exec: function(e) {
                var t = parseInt(prompt("Enter line number:"), 10);
                isNaN(t) || e.gotoLine(t)
            },readOnly: !0}, {name: "fold",bindKey: i("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),exec: function(e) {
                e.session.toggleFold(!1)
            },readOnly: !0}, {name: "unfold",bindKey: i("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),exec: function(e) {
                e.session.toggleFold(!0)
            },readOnly: !0}, {name: "foldall",bindKey: i("Alt-0", "Command-Option-0"),exec: function(e) {
                e.session.foldAll()
            },readOnly: !0}, {name: "unfoldall",bindKey: i("Alt-Shift-0", "Command-Option-Shift-0"),exec: function(e) {
                e.session.unfold()
            },readOnly: !0}, {name: "findnext",bindKey: i("Ctrl-K", "Command-G"),exec: function(e) {
                e.findNext()
            },readOnly: !0}, {name: "findprevious",bindKey: i("Ctrl-Shift-K", "Command-Shift-G"),exec: function(e) {
                e.findPrevious()
            },readOnly: !0}, {name: "find",bindKey: i("Ctrl-F", "Command-F"),exec: function(e) {
                o.loadModule("ace/ext/searchbox", function(t) {
                    t.Search(e)
                })
            },readOnly: !0}, {name: "overwrite",bindKey: "Insert",exec: function(e) {
                e.toggleOverwrite()
            },readOnly: !0}, {name: "selecttostart",bindKey: i("Ctrl-Shift-Home", "Command-Shift-Up"),exec: function(e) {
                e.getSelection().selectFileStart()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotostart",bindKey: i("Ctrl-Home", "Command-Home|Command-Up"),exec: function(e) {
                e.navigateFileStart()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectup",bindKey: i("Shift-Up", "Shift-Up"),exec: function(e) {
                e.getSelection().selectUp()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "golineup",bindKey: i("Up", "Up|Ctrl-P"),exec: function(e, t) {
                e.navigateUp(t.times)
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selecttoend",bindKey: i("Ctrl-Shift-End", "Command-Shift-Down"),exec: function(e) {
                e.getSelection().selectFileEnd()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotoend",bindKey: i("Ctrl-End", "Command-End|Command-Down"),exec: function(e) {
                e.navigateFileEnd()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectdown",bindKey: i("Shift-Down", "Shift-Down"),exec: function(e) {
                e.getSelection().selectDown()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "golinedown",bindKey: i("Down", "Down|Ctrl-N"),exec: function(e, t) {
                e.navigateDown(t.times)
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectwordleft",bindKey: i("Ctrl-Shift-Left", "Option-Shift-Left"),exec: function(e) {
                e.getSelection().selectWordLeft()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotowordleft",bindKey: i("Ctrl-Left", "Option-Left"),exec: function(e) {
                e.navigateWordLeft()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selecttolinestart",bindKey: i("Alt-Shift-Left", "Command-Shift-Left"),exec: function(e) {
                e.getSelection().selectLineStart()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotolinestart",bindKey: i("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),exec: function(e) {
                e.navigateLineStart()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectleft",bindKey: i("Shift-Left", "Shift-Left"),exec: function(e) {
                e.getSelection().selectLeft()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotoleft",bindKey: i("Left", "Left|Ctrl-B"),exec: function(e, t) {
                e.navigateLeft(t.times)
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectwordright",bindKey: i("Ctrl-Shift-Right", "Option-Shift-Right"),exec: function(e) {
                e.getSelection().selectWordRight()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotowordright",bindKey: i("Ctrl-Right", "Option-Right"),exec: function(e) {
                e.navigateWordRight()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selecttolineend",bindKey: i("Alt-Shift-Right", "Command-Shift-Right"),exec: function(e) {
                e.getSelection().selectLineEnd()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotolineend",bindKey: i("Alt-Right|End", "Command-Right|End|Ctrl-E"),exec: function(e) {
                e.navigateLineEnd()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectright",bindKey: i("Shift-Right", "Shift-Right"),exec: function(e) {
                e.getSelection().selectRight()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "gotoright",bindKey: i("Right", "Right|Ctrl-F"),exec: function(e, t) {
                e.navigateRight(t.times)
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectpagedown",bindKey: "Shift-PageDown",exec: function(e) {
                e.selectPageDown()
            },readOnly: !0}, {name: "pagedown",bindKey: i(null, "Option-PageDown"),exec: function(e) {
                e.scrollPageDown()
            },readOnly: !0}, {name: "gotopagedown",bindKey: i("PageDown", "PageDown|Ctrl-V"),exec: function(e) {
                e.gotoPageDown()
            },readOnly: !0}, {name: "selectpageup",bindKey: "Shift-PageUp",exec: function(e) {
                e.selectPageUp()
            },readOnly: !0}, {name: "pageup",bindKey: i(null, "Option-PageUp"),exec: function(e) {
                e.scrollPageUp()
            },readOnly: !0}, {name: "gotopageup",bindKey: "PageUp",exec: function(e) {
                e.gotoPageUp()
            },readOnly: !0}, {name: "scrollup",bindKey: i("Ctrl-Up", null),exec: function(e) {
                e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight)
            },readOnly: !0}, {name: "scrolldown",bindKey: i("Ctrl-Down", null),exec: function(e) {
                e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight)
            },readOnly: !0}, {name: "selectlinestart",bindKey: "Shift-Home",exec: function(e) {
                e.getSelection().selectLineStart()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selectlineend",bindKey: "Shift-End",exec: function(e) {
                e.getSelection().selectLineEnd()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "togglerecording",bindKey: i("Ctrl-Alt-E", "Command-Option-E"),exec: function(e) {
                e.commands.toggleRecording(e)
            },readOnly: !0}, {name: "replaymacro",bindKey: i("Ctrl-Shift-E", "Command-Shift-E"),exec: function(e) {
                e.commands.replay(e)
            },readOnly: !0}, {name: "jumptomatching",bindKey: i("Ctrl-P", "Ctrl-Shift-P"),exec: function(e) {
                e.jumpToMatching()
            },multiSelectAction: "forEach",readOnly: !0}, {name: "selecttomatching",bindKey: i("Ctrl-Shift-P", null),exec: function(e) {
                e.jumpToMatching(!0)
            },multiSelectAction: "forEach",readOnly: !0}, {name: "cut",exec: function(e) {
                var t = e.getSelectionRange();
                e._emit("cut", t), e.selection.isEmpty() || (e.session.remove(t), e.clearSelection())
            },multiSelectAction: "forEach"}, {name: "removeline",bindKey: i("Ctrl-D", "Command-D"),exec: function(e) {
                e.removeLines()
            },multiSelectAction: "forEachLine"}, {name: "duplicateSelection",bindKey: i("Ctrl-Shift-D", "Command-Shift-D"),exec: function(e) {
                e.duplicateSelection()
            },multiSelectAction: "forEach"}, {name: "sortlines",bindKey: i("Ctrl-Alt-S", "Command-Alt-S"),exec: function(e) {
                e.sortLines()
            },multiSelectAction: "forEachLine"}, {name: "togglecomment",bindKey: i("Ctrl-/", "Command-/"),exec: function(e) {
                e.toggleCommentLines()
            },multiSelectAction: "forEachLine"}, {name: "toggleBlockComment",bindKey: i("Ctrl-Shift-/", "Command-Shift-/"),exec: function(e) {
                e.toggleBlockComment()
            },multiSelectAction: "forEach"}, {name: "modifyNumberUp",bindKey: i("Ctrl-Shift-Up", "Alt-Shift-Up"),exec: function(e) {
                e.modifyNumber(1)
            },multiSelectAction: "forEach"}, {name: "modifyNumberDown",bindKey: i("Ctrl-Shift-Down", "Alt-Shift-Down"),exec: function(e) {
                e.modifyNumber(-1)
            },multiSelectAction: "forEach"}, {name: "replace",bindKey: i("Ctrl-H", "Command-Option-F"),exec: function(e) {
                o.loadModule("ace/ext/searchbox", function(t) {
                    t.Search(e, !0)
                })
            }}, {name: "undo",bindKey: i("Ctrl-Z", "Command-Z"),exec: function(e) {
                e.undo()
            }}, {name: "redo",bindKey: i("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),exec: function(e) {
                e.redo()
            }}, {name: "copylinesup",bindKey: i("Alt-Shift-Up", "Command-Option-Up"),exec: function(e) {
                e.copyLinesUp()
            }}, {name: "movelinesup",bindKey: i("Alt-Up", "Option-Up"),exec: function(e) {
                e.moveLinesUp()
            }}, {name: "copylinesdown",bindKey: i("Alt-Shift-Down", "Command-Option-Down"),exec: function(e) {
                e.copyLinesDown()
            }}, {name: "movelinesdown",bindKey: i("Alt-Down", "Option-Down"),exec: function(e) {
                e.moveLinesDown()
            }}, {name: "del",bindKey: i("Delete", "Delete|Ctrl-D"),exec: function(e) {
                e.remove("right")
            },multiSelectAction: "forEach"}, {name: "backspace",bindKey: i("Command-Backspace|Option-Backspace|Shift-Backspace|Backspace", "Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),exec: function(e) {
                e.remove("left")
            },multiSelectAction: "forEach"}, {name: "removetolinestart",bindKey: i("Alt-Backspace", "Command-Backspace"),exec: function(e) {
                e.removeToLineStart()
            },multiSelectAction: "forEach"}, {name: "removetolineend",bindKey: i("Alt-Delete", "Ctrl-K"),exec: function(e) {
                e.removeToLineEnd()
            },multiSelectAction: "forEach"}, {name: "removewordleft",bindKey: i("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),exec: function(e) {
                e.removeWordLeft()
            },multiSelectAction: "forEach"}, {name: "removewordright",bindKey: i("Ctrl-Delete", "Alt-Delete"),exec: function(e) {
                e.removeWordRight()
            },multiSelectAction: "forEach"}, {name: "outdent",bindKey: i("Shift-Tab", "Shift-Tab"),exec: function(e) {
                e.blockOutdent()
            },multiSelectAction: "forEach"}, {name: "indent",bindKey: i("Tab", "Tab"),exec: function(e) {
                e.indent()
            },multiSelectAction: "forEach"}, {name: "blockoutdent",bindKey: i("Ctrl-[", "Ctrl-["),exec: function(e) {
                e.blockOutdent()
            },multiSelectAction: "forEachLine"}, {name: "blockindent",bindKey: i("Ctrl-]", "Ctrl-]"),exec: function(e) {
                e.blockIndent()
            },multiSelectAction: "forEachLine"}, {name: "insertstring",exec: function(e, t) {
                e.insert(t)
            },multiSelectAction: "forEach"}, {name: "inserttext",exec: function(e, t) {
                e.insert(n.stringRepeat(t.text || "", t.times || 1))
            },multiSelectAction: "forEach"}, {name: "splitline",bindKey: i(null, "Ctrl-O"),exec: function(e) {
                e.splitLine()
            },multiSelectAction: "forEach"}, {name: "transposeletters",bindKey: i("Ctrl-T", "Ctrl-T"),exec: function(e) {
                e.transposeLetters()
            },multiSelectAction: function(e) {
                e.transposeSelections(1)
            }}, {name: "touppercase",bindKey: i("Ctrl-U", "Ctrl-U"),exec: function(e) {
                e.toUpperCase()
            },multiSelectAction: "forEach"}, {name: "tolowercase",bindKey: i("Ctrl-Shift-U", "Ctrl-Shift-U"),exec: function(e) {
                e.toLowerCase()
            },multiSelectAction: "forEach"}]
}), define("ace/undomanager", ["require", "exports", "module"], function(e, t) {
    var i = function() {
        this.reset()
    };
    (function() {
        this.execute = function(e) {
            var t = e.args[0];
            this.$doc = e.args[1], this.$undoStack.push(t), this.$redoStack = []
        }, this.undo = function(e) {
            var t = this.$undoStack.pop(), i = null;
            return t && (i = this.$doc.undoChanges(t, e), this.$redoStack.push(t)), i
        }, this.redo = function(e) {
            var t = this.$redoStack.pop(), i = null;
            return t && (i = this.$doc.redoChanges(t, e), this.$undoStack.push(t)), i
        }, this.reset = function() {
            this.$undoStack = [], this.$redoStack = []
        }, this.hasUndo = function() {
            return this.$undoStack.length > 0
        }, this.hasRedo = function() {
            return this.$redoStack.length > 0
        }
    }).call(i.prototype), t.UndoManager = i
}), define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/renderloop", "ace/lib/event_emitter"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/dom"), o = e("./lib/event"), r = e("./lib/useragent"), s = e("./config"), a = e("./layer/gutter").Gutter, l = e("./layer/marker").Marker, c = e("./layer/text").Text, h = e("./layer/cursor").Cursor, d = e("./scrollbar").ScrollBar, u = e("./renderloop").RenderLoop, p = e("./lib/event_emitter").EventEmitter, g = ".ace_editor {position: relative;overflow: hidden;font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;font-size: 12px;line-height: normal;}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: text;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTk5MTVGREIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTk5MTVGRUIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTkxNUZCQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTkxNUZDQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SIDkjAAAAJ1JREFUeNpi/P//PwMlgImBQkB7A6qrq/+DMC55FkIGKCoq4pVnpFkgTp069f/+/fv/r1u37r+tre1/kg0A+ptn9uzZYLaRkRHpLvjw4cNXWVlZhufPnzOcO3eOdAO0tbVPAjHDmzdvGA4fPsxIsgGSkpJmv379Ynj37h2DjIyMCMkG3LhxQ/T27dsMampqDHZ2dq/pH41DxwCAAAMAFdc68dUsFZgAAAAASUVORK5CYII=\");}.ace_scrollbar {position: absolute;overflow-x: hidden;overflow-y: scroll;right: 0;top: 0;bottom: 0;}.ace_scrollbar-inner {position: absolute;width: 1px;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;}.ace_text-input.ace_composition {background: #f8f8f8;color: #111;z-index: 1000;opacity: 1;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;white-space: nowrap;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;/* setting pointer-events: auto; on node under the mouse, which changesduring scroll, will break mouse wheel scrolling in Safari */pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {color: black;font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-moz-transition: opacity 0.18s;-webkit-transition: opacity 0.18s;-o-transition: opacity 0.18s;-ms-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_cursor[style*=\"opacity: 0\"]{-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";}.ace_editor.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_line {white-space: nowrap;}.ace_marker-layer .ace_step {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;}.ace_editor.ace_dragging .ace_content {cursor: move;}.ace_gutter-tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;display: inline-block;max-width: 500px;padding: 4px;position: fixed;z-index: 300;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre-line;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget.ace_closed {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}/*** Dark version for fold widgets*/.ace_dark .ace_fold-widget {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");}.ace_dark .ace_fold-widget.ace_end {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget.ace_closed {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-moz-transition: opacity 0.4s ease 0.05s;-webkit-transition: opacity 0.4s ease 0.05s;-o-transition: opacity 0.4s ease 0.05s;-ms-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-moz-transition: opacity 0.05s ease 0.05s;-webkit-transition: opacity 0.05s ease 0.05s;-o-transition: opacity 0.05s ease 0.05s;-ms-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}";
    n.importCssString(g, "ace_editor");
    var m = function(e, t) {
        var i = this;
        this.container = e || n.createElement("div"), this.$keepTextAreaAtCursor = !r.isIE, n.addCssClass(this.container, "ace_editor"), this.setTheme(t), this.$gutter = n.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = n.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = n.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new a(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new l(this.content);
        var p = this.$textLayer = new c(this.content);
        this.canvas = p.element, this.$markerFront = new l(this.content), this.$cursorLayer = new h(this.content), this.$horizScroll = !1, this.scrollBar = new d(this.container), this.scrollBar.addEventListener("scroll", function(e) {
            i.$inScrollAnimation || i.session.setScrollTop(e.data)
        }), this.scrollTop = 0, this.scrollLeft = 0, o.addListener(this.scroller, "scroll", function() {
            var e = i.scroller.scrollLeft;
            i.scrollLeft = e, i.session.setScrollLeft(e)
        }), this.cursorPos = {row: 0,column: 0}, this.$textLayer.addEventListener("changeCharacterSize", function() {
            i.updateCharacterSize(), i.onResize(!0)
        }), this.$size = {width: 0,height: 0,scrollerHeight: 0,scrollerWidth: 0}, this.layerConfig = {width: 1,padding: 0,firstRow: 0,firstRowScreen: 0,lastRow: 0,lineHeight: 1,characterWidth: 1,minHeight: 1,maxHeight: 1,offset: 0,height: 1}, this.$loop = new u(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), s.resetOptions(this), s._emit("renderer", this)
    };
    (function() {
        this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, i.implement(this, p), this.updateCharacterSize = function() {
            this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.characterWidth = this.$textLayer.getCharacterWidth(), this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin()
        }, this.setSession = function(e) {
            this.session = e, this.scroller.className = "ace_scroller", this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), this.$loop.schedule(this.CHANGE_FULL)
        }, this.updateLines = function(e, t) {
            void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {firstRow: e,lastRow: t}, this.$changedLines.firstRow > this.layerConfig.lastRow || this.$changedLines.lastRow < this.layerConfig.firstRow || this.$loop.schedule(this.CHANGE_LINES)
        }, this.onChangeTabSize = function() {
            this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
        }, this.updateText = function() {
            this.$loop.schedule(this.CHANGE_TEXT)
        }, this.updateFull = function(e) {
            e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
        }, this.updateFontSize = function() {
            this.$textLayer.checkForSizeChanges()
        }, this.onResize = function(e, t, i, o) {
            var r = 0, s = this.$size;
            if (!(this.resizing > 2)) {
                if (this.resizing > 1 ? this.resizing++ : this.resizing = e ? 1 : 0, o || (o = n.getInnerHeight(this.container)), o && (e || s.height != o) && (s.height = o, r = this.CHANGE_SIZE, s.scrollerHeight = this.scroller.clientHeight, (e || !s.scrollerHeight) && (s.scrollerHeight = s.height, this.$horizScroll && (s.scrollerHeight -= this.scrollBar.getWidth())), this.scrollBar.setHeight(s.scrollerHeight), this.session && (this.session.setScrollTop(this.getScrollTop()), r |= this.CHANGE_FULL)), i || (i = n.getInnerWidth(this.container)), i && (e || this.resizing > 1 || s.width != i)) {
                    r = this.CHANGE_SIZE, s.width = i;
                    var t = this.$showGutter ? this.$gutter.offsetWidth : 0;
                    this.scroller.style.left = t + "px", s.scrollerWidth = Math.max(0, i - t - this.scrollBar.getWidth()), this.scroller.style.right = this.scrollBar.getWidth() + "px", (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (r |= this.CHANGE_FULL)
                }
                this.$size.scrollerHeight && (e ? this.$renderChanges(r, !0) : this.$loop.schedule(r), e && (this.$gutterLayer.$padding = null), e && delete this.resizing)
            }
        }, this.onGutterResize = function() {
            var e = this.$size.width, t = this.$showGutter ? this.$gutter.offsetWidth : 0;
            this.scroller.style.left = t + "px", this.$size.scrollerWidth = Math.max(0, e - t - this.scrollBar.getWidth()), this.session.getUseWrapMode() && this.adjustWrapLimit() && this.$loop.schedule(this.CHANGE_FULL)
        }, this.adjustWrapLimit = function() {
            var e = this.$size.scrollerWidth - 2 * this.$padding, t = Math.floor(e / this.characterWidth);
            return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
        }, this.setAnimatedScroll = function(e) {
            this.setOption("animatedScroll", e)
        }, this.getAnimatedScroll = function() {
            return this.$animatedScroll
        }, this.setShowInvisibles = function(e) {
            this.setOption("showInvisibles", e)
        }, this.getShowInvisibles = function() {
            return this.getOption("showInvisibles")
        }, this.getDisplayIndentGuides = function() {
            return this.getOption("displayIndentGuides")
        }, this.setDisplayIndentGuides = function(e) {
            this.setOption("displayIndentGuides", e)
        }, this.setShowPrintMargin = function(e) {
            this.setOption("showPrintMargin", e)
        }, this.getShowPrintMargin = function() {
            return this.getOption("showPrintMargin")
        }, this.setPrintMarginColumn = function(e) {
            this.setOption("printMarginColumn", e)
        }, this.getPrintMarginColumn = function() {
            return this.getOption("printMarginColumn")
        }, this.getShowGutter = function() {
            return this.getOption("showGutter")
        }, this.setShowGutter = function(e) {
            return this.setOption("showGutter", e)
        }, this.getFadeFoldWidgets = function() {
            return this.getOption("fadeFoldWidgets")
        }, this.setFadeFoldWidgets = function(e) {
            this.setOption("fadeFoldWidgets", e)
        }, this.setHighlightGutterLine = function(e) {
            this.setOption("highlightGutterLine", e)
        }, this.getHighlightGutterLine = function() {
            return this.getOption("highlightGutterLine")
        }, this.$updateGutterLineHighlight = function() {
            var e = this.$cursorLayer.$pixelPos, t = this.layerConfig.lineHeight;
            if (this.session.getUseWrapMode()) {
                var i = this.session.selection.getCursor();
                i.column = 0, e = this.$cursorLayer.getPixelPosition(i, !0), t *= this.session.getRowLength(i.row)
            }
            this.$gutterLineHighlight.style.top = e.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = t + "px"
        }, this.$updatePrintMargin = function() {
            if (this.$showPrintMargin || this.$printMarginEl) {
                if (!this.$printMarginEl) {
                    var e = n.createElement("div");
                    e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = n.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
                }
                var t = this.$printMarginEl.style;
                t.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
            }
        }, this.getContainerElement = function() {
            return this.container
        }, this.getMouseEventTarget = function() {
            return this.content
        }, this.getTextAreaContainer = function() {
            return this.container
        }, this.$moveTextAreaToCursor = function() {
            if (this.$keepTextAreaAtCursor) {
                var e = this.layerConfig, t = this.$cursorLayer.$pixelPos.top, i = this.$cursorLayer.$pixelPos.left;
                t -= e.offset;
                var n = this.lineHeight;
                if (!(0 > t || t > e.height - n)) {
                    var o = this.characterWidth;
                    if (this.$composition) {
                        var r = this.textarea.value.replace(/^\x01+/, "");
                        o *= this.session.$getStringScreenWidth(r)[0], n += 2, t -= 1
                    }
                    i -= this.scrollLeft, i > this.$size.scrollerWidth - o && (i = this.$size.scrollerWidth - o), i -= this.scrollBar.width, this.textarea.style.height = n + "px", this.textarea.style.width = o + "px", this.textarea.style.right = Math.max(0, this.$size.scrollerWidth - i - o) + "px", this.textarea.style.bottom = Math.max(0, this.$size.height - t - n) + "px"
                }
            }
        }, this.getFirstVisibleRow = function() {
            return this.layerConfig.firstRow
        }, this.getFirstFullyVisibleRow = function() {
            return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
        }, this.getLastFullyVisibleRow = function() {
            var e = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
            return this.layerConfig.firstRow - 1 + e
        }, this.getLastVisibleRow = function() {
            return this.layerConfig.lastRow
        }, this.$padding = null, this.setPadding = function(e) {
            this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
        }, this.getHScrollBarAlwaysVisible = function() {
            return this.$hScrollBarAlwaysVisible
        }, this.setHScrollBarAlwaysVisible = function(e) {
            this.setOption("hScrollBarAlwaysVisible", e)
        }, this.$updateScrollBar = function() {
            this.scrollBar.setInnerHeight(this.layerConfig.maxHeight), this.scrollBar.setScrollTop(this.scrollTop)
        }, this.$renderChanges = function(e, t) {
            if (t || e && this.session && this.container.offsetWidth) {
                if (this._signal("beforeRender"), (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL) && this.$computeLayerConfig(), e & this.CHANGE_H_SCROLL) {
                    this.scroller.scrollLeft = this.scrollLeft;
                    var i = this.scroller.scrollLeft;
                    this.scrollLeft = i, this.session.setScrollLeft(i), this.scroller.className = 0 == this.scrollLeft ? "ace_scroller" : "ace_scroller ace_scroll-left"
                }
                return e & this.CHANGE_FULL ? (this.$textLayer.checkForSizeChanges(), this.$updateScrollBar(), this.$textLayer.update(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this._signal("afterRender"), void 0) : e & this.CHANGE_SCROLL ? (e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this.$moveTextAreaToCursor(), this.$updateScrollBar(), this._signal("afterRender"), void 0) : (e & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig), this.$showGutter && this.$gutterLayer.update(this.layerConfig)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(this.layerConfig) : (e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER) && this.$showGutter && this.$gutterLayer.update(this.layerConfig), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig), e & this.CHANGE_SIZE && this.$updateScrollBar(), this._signal("afterRender"), void 0)
            }
        }, this.$computeLayerConfig = function() {
            if (!this.$size.scrollerHeight)
                return this.onResize(!0);
            var e = this.session, t = this.scrollTop % this.lineHeight, i = this.$size.scrollerHeight + this.lineHeight, n = this.$getLongestLine(), o = this.$hScrollBarAlwaysVisible || this.$size.scrollerWidth - n < 0, r = this.$horizScroll !== o;
            this.$horizScroll = o, r && (this.scroller.style.overflowX = o ? "scroll" : "hidden", o || this.session.setScrollLeft(0));
            var s = this.session.getScreenLength() * this.lineHeight;
            this.session.setScrollTop(Math.max(0, Math.min(this.scrollTop, s - this.$size.scrollerHeight)));
            var a, l, c = Math.ceil(i / this.lineHeight) - 1, h = Math.max(0, Math.round((this.scrollTop - t) / this.lineHeight)), d = h + c, u = this.lineHeight;
            h = e.screenToDocumentRow(h, 0);
            var p = e.getFoldLine(h);
            p && (h = p.start.row), a = e.documentToScreenRow(h, 0), l = e.getRowLength(h) * u, d = Math.min(e.screenToDocumentRow(d, 0), e.getLength() - 1), i = this.$size.scrollerHeight + e.getRowLength(d) * u + l, t = this.scrollTop - a * u, this.layerConfig = {width: n,padding: this.$padding,firstRow: h,firstRowScreen: a,lastRow: d,lineHeight: u,characterWidth: this.characterWidth,minHeight: i,maxHeight: s,offset: t,height: this.$size.scrollerHeight}, this.$gutterLayer.element.style.marginTop = -t + "px", this.content.style.marginTop = -t + "px", this.content.style.width = n + 2 * this.$padding + "px", this.content.style.height = i + "px", r && this.onResize(!0)
        }, this.$updateLines = function() {
            var e = this.$changedLines.firstRow, t = this.$changedLines.lastRow;
            this.$changedLines = null;
            var i = this.layerConfig;
            if (!(e > i.lastRow + 1 || t < i.firstRow))
                return 1 / 0 === t ? (this.$showGutter && this.$gutterLayer.update(i), void this.$textLayer.update(i)) : (this.$textLayer.updateLines(i, e, t), !0)
        }, this.$getLongestLine = function() {
            var e = this.session.getScreenWidth();
            return this.$textLayer.showInvisibles && (e += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth))
        }, this.updateFrontMarkers = function() {
            this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
        }, this.updateBackMarkers = function() {
            this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
        }, this.addGutterDecoration = function(e, t) {
            this.$gutterLayer.addGutterDecoration(e, t)
        }, this.removeGutterDecoration = function(e, t) {
            this.$gutterLayer.removeGutterDecoration(e, t)
        }, this.updateBreakpoints = function() {
            this.$loop.schedule(this.CHANGE_GUTTER)
        }, this.setAnnotations = function(e) {
            this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER)
        }, this.updateCursor = function() {
            this.$loop.schedule(this.CHANGE_CURSOR)
        }, this.hideCursor = function() {
            this.$cursorLayer.hideCursor()
        }, this.showCursor = function() {
            this.$cursorLayer.showCursor()
        }, this.scrollSelectionIntoView = function(e, t, i) {
            this.scrollCursorIntoView(e, i), this.scrollCursorIntoView(t, i)
        }, this.scrollCursorIntoView = function(e, t) {
            if (0 !== this.$size.scrollerHeight) {
                var i = this.$cursorLayer.getPixelPosition(e), n = i.left, o = i.top;
                this.scrollTop > o ? (t && (o -= t * this.$size.scrollerHeight), this.session.setScrollTop(o)) : this.scrollTop + this.$size.scrollerHeight < o + this.lineHeight && (t && (o += t * this.$size.scrollerHeight), this.session.setScrollTop(o + this.lineHeight - this.$size.scrollerHeight));
                var r = this.scrollLeft;
                r > n ? (n < this.$padding + 2 * this.layerConfig.characterWidth && (n = 0), this.session.setScrollLeft(n)) : r + this.$size.scrollerWidth < n + this.characterWidth && this.session.setScrollLeft(Math.round(n + this.characterWidth - this.$size.scrollerWidth))
            }
        }, this.getScrollTop = function() {
            return this.session.getScrollTop()
        }, this.getScrollLeft = function() {
            return this.session.getScrollLeft()
        }, this.getScrollTopRow = function() {
            return this.scrollTop / this.lineHeight
        }, this.getScrollBottomRow = function() {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
        }, this.scrollToRow = function(e) {
            this.session.setScrollTop(e * this.lineHeight)
        }, this.alignCursor = function(e, t) {
            "number" == typeof e && (e = {row: e,column: 0});
            var i = this.$cursorLayer.getPixelPosition(e), n = this.$size.scrollerHeight - this.lineHeight, o = i.top - n * (t || 0);
            return this.session.setScrollTop(o), o
        }, this.STEPS = 8, this.$calcSteps = function(e, t) {
            var i = 0, n = this.STEPS, o = [], r = function(e, t, i) {
                return i * (Math.pow(e - 1, 3) + 1) + t
            };
            for (i = 0; n > i; ++i)
                o.push(r(i / this.STEPS, e, t - e));
            return o
        }, this.scrollToLine = function(e, t, i, n) {
            var o = this.$cursorLayer.getPixelPosition({row: e,column: 0}), r = o.top;
            t && (r -= this.$size.scrollerHeight / 2);
            var s = this.scrollTop;
            this.session.setScrollTop(r), i !== !1 && this.animateScrolling(s, n)
        }, this.animateScrolling = function(e, t) {
            var i = this.scrollTop;
            if (this.$animatedScroll && Math.abs(e - i) < 1e5) {
                var n = this, o = n.$calcSteps(e, i);
                this.$inScrollAnimation = !0, clearInterval(this.$timer), n.session.setScrollTop(o.shift()), this.$timer = setInterval(function() {
                    o.length ? (n.session.setScrollTop(o.shift()), n.session.$scrollTop = i) : null != i ? (n.session.$scrollTop = -1, n.session.setScrollTop(i), i = null) : (n.$timer = clearInterval(n.$timer), n.$inScrollAnimation = !1, t && t())
                }, 10)
            }
        }, this.scrollToY = function(e) {
            this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e)
        }, this.scrollToX = function(e) {
            0 > e && (e = 0), this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL)
        }, this.scrollBy = function(e, t) {
            t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e)
        }, this.isScrollableBy = function(e, t) {
            return 0 > t && this.session.getScrollTop() >= 1 ? !0 : t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 ? !0 : void 0
        }, this.pixelToScreenCoordinates = function(e, t) {
            var i = this.scroller.getBoundingClientRect(), n = (e + this.scrollLeft - i.left - this.$padding) / this.characterWidth, o = Math.floor((t + this.scrollTop - i.top) / this.lineHeight), r = Math.round(n);
            return {row: o,column: r,side: n - r > 0 ? 1 : -1}
        }, this.screenToTextCoordinates = function(e, t) {
            var i = this.scroller.getBoundingClientRect(), n = Math.round((e + this.scrollLeft - i.left - this.$padding) / this.characterWidth), o = Math.floor((t + this.scrollTop - i.top) / this.lineHeight);
            return this.session.screenToDocumentPosition(o, Math.max(n, 0))
        }, this.textToScreenCoordinates = function(e, t) {
            var i = this.scroller.getBoundingClientRect(), n = this.session.documentToScreenPosition(e, t), o = this.$padding + Math.round(n.column * this.characterWidth), r = n.row * this.lineHeight;
            return {pageX: i.left + o - this.scrollLeft,pageY: i.top + r - this.scrollTop}
        }, this.visualizeFocus = function() {
            n.addCssClass(this.container, "ace_focus")
        }, this.visualizeBlur = function() {
            n.removeCssClass(this.container, "ace_focus")
        }, this.showComposition = function() {
            this.$composition || (this.$composition = {keepTextAreaAtCursor: this.$keepTextAreaAtCursor,cssText: this.textarea.style.cssText}), this.$keepTextAreaAtCursor = !0, n.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor()
        }, this.setCompositionText = function() {
            this.$moveTextAreaToCursor()
        }, this.hideComposition = function() {
            this.$composition && (n.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null)
        }, this.setTheme = function(e) {
            function t(e) {
                if (e.cssClass) {
                    n.importCssString(e.cssText, e.cssClass, i.container.ownerDocument), i.theme && n.removeCssClass(i.container, i.theme.cssClass), i.$theme = e.cssClass, i.theme = e, n.addCssClass(i.container, e.cssClass), n.setCssClass(i.container, "ace_dark", e.isDark);
                    var t = e.padding || 4;
                    i.$padding && t != i.$padding && i.setPadding(t), i.$size && (i.$size.width = 0, i.onResize()), i._dispatchEvent("themeLoaded", {theme: e})
                }
            }
            var i = this;
            if (this.$themeValue = e, i._dispatchEvent("themeChange", {theme: e}), e && "string" != typeof e)
                t(e);
            else {
                var o = e || "ace/theme/textmate";
                s.loadModule(["theme", o], t)
            }
        }, this.getTheme = function() {
            return this.$themeValue
        }, this.setStyle = function(e, t) {
            n.setCssClass(this.container, e, 0 != t)
        }, this.unsetStyle = function(e) {
            n.removeCssClass(this.container, e)
        }, this.destroy = function() {
            this.$textLayer.destroy(), this.$cursorLayer.destroy()
        }
    }).call(m.prototype), s.defineOptions(m.prototype, "renderer", {animatedScroll: {initialValue: !1},showInvisibles: {set: function(e) {
                this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT)
            },initialValue: !1},showPrintMargin: {set: function() {
                this.$updatePrintMargin()
            },initialValue: !0},printMarginColumn: {set: function() {
                this.$updatePrintMargin()
            },initialValue: 80},printMargin: {set: function(e) {
                "number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin()
            },get: function() {
                return this.$showPrintMargin && this.$printMarginColumn
            }},showGutter: {set: function(e) {
                this.$gutter.style.display = e ? "block" : "none", this.onGutterResize()
            },initialValue: !0},fadeFoldWidgets: {set: function(e) {
                n.setCssClass(this.$gutter, "ace_fade-fold-widgets", e)
            },initialValue: !1},showFoldWidgets: {set: function(e) {
                this.$gutterLayer.setShowFoldWidgets(e)
            },initialValue: !0},displayIndentGuides: {set: function(e) {
                this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT)
            },initialValue: !0},highlightGutterLine: {set: function(e) {
                return this.$gutterLineHighlight ? (this.$gutterLineHighlight.style.display = e ? "" : "none", void (this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight())) : (this.$gutterLineHighlight = n.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", this.$gutter.appendChild(this.$gutterLineHighlight), void 0)
            },initialValue: !1,value: !0},hScrollBarAlwaysVisible: {set: function(e) {
                this.$hScrollBarAlwaysVisible = e, (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL)
            },initialValue: !1},fontSize: {set: function(e) {
                "number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize()
            },initialValue: 12},fontFamily: {set: function(e) {
                this.container.style.fontFamily = e, this.updateFontSize()
            }}}), t.VirtualRenderer = m
}), define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function(e, t) {
    var i = e("../lib/dom"), n = e("../lib/oop"), o = e("../lib/lang"), r = e("../lib/event_emitter").EventEmitter, s = function(e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this)
    };
    (function() {
        n.implement(this, r), this.setSession = function(e) {
            this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e.on("change", this.$updateAnnotations)
        }, this.addGutterDecoration = function(e, t) {
            window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t)
        }, this.removeGutterDecoration = function(e, t) {
            window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t)
        }, this.setAnnotations = function(e) {
            this.$annotations = [];
            for (var t, i, n = 0; n < e.length; n++) {
                var r = e[n], i = r.row, t = this.$annotations[i];
                t || (t = this.$annotations[i] = {text: []});
                var s = r.text;
                s = s ? o.escapeHTML(s) : r.html || "", -1 === t.text.indexOf(s) && t.text.push(s);
                var a = r.type;
                "error" == a ? t.className = " ace_error" : "warning" == a && " ace_error" != t.className ? t.className = " ace_warning" : "info" == a && !t.className && (t.className = " ace_info")
            }
        }, this.$updateAnnotations = function(e) {
            if (this.$annotations.length) {
                var t = e.data, i = t.range, n = i.start.row, o = i.end.row - n;
                if (0 !== o)
                    if ("removeText" == t.action || "removeLines" == t.action)
                        this.$annotations.splice(n, o + 1, null);
                    else {
                        var r = Array(o + 1);
                        r.unshift(n, 1), this.$annotations.splice.apply(this.$annotations, r)
                    }
            }
        }, this.update = function(e) {
            for (var t = {className: ""}, n = [], o = e.firstRow, r = e.lastRow, s = this.session.getNextFoldLine(o), a = s ? s.start.row : 1 / 0, l = this.$showFoldWidgets && this.session.foldWidgets, c = this.session.$breakpoints, h = this.session.$decorations, d = this.session.$firstLineNumber, u = 0; o > a && (o = s.end.row + 1, s = this.session.getNextFoldLine(o, s), a = s ? s.start.row : 1 / 0), !(o > r); ) {
                var p = this.$annotations[o] || t;
                if (n.push("<div class='ace_gutter-cell ", c[o] || "", h[o] || "", p.className, "' style='height:", this.session.getRowLength(o) * e.lineHeight, "px;'>", u = o + d), l) {
                    var g = l[o];
                    null == g && (g = l[o] = this.session.getFoldWidget(o)), g && n.push("<span class='ace_fold-widget ace_", g, "start" == g && o == a && o < s.end.row ? " ace_closed" : " ace_open", "' style='height:", e.lineHeight, "px", "'></span>")
                }
                n.push("</div>"), o++
            }
            this.element = i.setInnerHtml(this.element, n.join("")), this.element.style.height = e.minHeight + "px", this.session.$useWrapMode && (u = this.session.getLength());
            var m = ("" + u).length * e.characterWidth, f = this.$padding || this.$computePadding();
            m += f.left + f.right, m !== this.gutterWidth && (this.gutterWidth = m, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", m))
        }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function(e) {
            e ? i.addCssClass(this.element, "ace_folding-enabled") : i.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null
        }, this.getShowFoldWidgets = function() {
            return this.$showFoldWidgets
        }, this.$computePadding = function() {
            if (!this.element.firstChild)
                return {left: 0,right: 0};
            var e = i.computedStyle(this.element.firstChild);
            return this.$padding = {}, this.$padding.left = parseInt(e.paddingLeft) + 1, this.$padding.right = parseInt(e.paddingRight), this.$padding
        }, this.getRegion = function(e) {
            var t = this.$padding || this.$computePadding(), i = this.element.getBoundingClientRect();
            return e.x < t.left + i.left ? "markers" : this.$showFoldWidgets && e.x > i.right - t.right ? "foldWidgets" : void 0
        }
    }).call(s.prototype), t.Gutter = s
}), define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function(e, t) {
    var i = e("../range").Range, n = e("../lib/dom"), o = function(e) {
        this.element = n.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element)
    };
    (function() {
        this.$padding = 0, this.setPadding = function(e) {
            this.$padding = e
        }, this.setSession = function(e) {
            this.session = e
        }, this.setMarkers = function(e) {
            this.markers = e
        }, this.update = function(e) {
            var e = e || this.config;
            if (e) {
                this.config = e;
                var t = [];
                for (var i in this.markers) {
                    var o = this.markers[i];
                    if (o.range) {
                        var r = o.range.clipRows(e.firstRow, e.lastRow);
                        if (!r.isEmpty())
                            if (r = r.toScreenRange(this.session), o.renderer) {
                                var s = this.$getTop(r.start.row, e), a = this.$padding + r.start.column * e.characterWidth;
                                o.renderer(t, r, a, s, e)
                            } else
                                "fullLine" == o.type ? this.drawFullLineMarker(t, r, o.clazz, e) : "screenLine" == o.type ? this.drawScreenLineMarker(t, r, o.clazz, e) : r.isMultiLine() ? "text" == o.type ? this.drawTextMarker(t, r, o.clazz, e) : this.drawMultiLineMarker(t, r, o.clazz, e) : this.drawSingleLineMarker(t, r, o.clazz + " ace_start", e)
                    } else
                        o.update(t, this, this.session, e)
                }
                this.element = n.setInnerHtml(this.element, t.join(""))
            }
        }, this.$getTop = function(e, t) {
            return (e - t.firstRowScreen) * t.lineHeight
        }, this.drawTextMarker = function(e, t, n, o) {
            var r = t.start.row, s = new i(r, t.start.column, r, this.session.getScreenLastRowColumn(r));
            for (this.drawSingleLineMarker(e, s, n + " ace_start", o, 1, "text"), r = t.end.row, s = new i(r, 0, r, t.end.column), this.drawSingleLineMarker(e, s, n, o, 0, "text"), r = t.start.row + 1; r < t.end.row; r++)
                s.start.row = r, s.end.row = r, s.end.column = this.session.getScreenLastRowColumn(r), this.drawSingleLineMarker(e, s, n, o, 1, "text")
        }, this.drawMultiLineMarker = function(e, t, i, n) {
            var o = this.$padding, r = n.lineHeight, s = this.$getTop(t.start.row, n), a = o + t.start.column * n.characterWidth;
            e.push("<div class='", i, " ace_start' style='", "height:", r, "px;", "right:0;", "top:", s, "px;", "left:", a, "px;'></div>"), s = this.$getTop(t.end.row, n);
            var l = t.end.column * n.characterWidth;
            e.push("<div class='", i, "' style='", "height:", r, "px;", "width:", l, "px;", "top:", s, "px;", "left:", o, "px;'></div>"), r = (t.end.row - t.start.row - 1) * n.lineHeight, 0 > r || (s = this.$getTop(t.start.row + 1, n), e.push("<div class='", i, "' style='", "height:", r, "px;", "right:0;", "top:", s, "px;", "left:", o, "px;'></div>"))
        }, this.drawSingleLineMarker = function(e, t, i, n, o) {
            var r = n.lineHeight, s = (t.end.column + (o || 0) - t.start.column) * n.characterWidth, a = this.$getTop(t.start.row, n), l = this.$padding + t.start.column * n.characterWidth;
            e.push("<div class='", i, "' style='", "height:", r, "px;", "width:", s, "px;", "top:", a, "px;", "left:", l, "px;'></div>")
        }, this.drawFullLineMarker = function(e, t, i, n) {
            var o = this.$getTop(t.start.row, n), r = n.lineHeight;
            t.start.row != t.end.row && (r += this.$getTop(t.end.row, n) - o), e.push("<div class='", i, "' style='", "height:", r, "px;", "top:", o, "px;", "left:0;right:0;'></div>")
        }, this.drawScreenLineMarker = function(e, t, i, n) {
            var o = this.$getTop(t.start.row, n), r = n.lineHeight;
            e.push("<div class='", i, "' style='", "height:", r, "px;", "top:", o, "px;", "left:0;right:0;'></div>")
        }
    }).call(o.prototype), t.Marker = o
}), define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function(e, t) {
    var i = e("../lib/oop"), n = e("../lib/dom"), o = e("../lib/lang"), r = e("../lib/useragent"), s = e("../lib/event_emitter").EventEmitter, a = function(e) {
        this.element = n.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$characterSize = {width: 0,height: 0}, this.checkForSizeChanges(), this.$pollSizeChanges()
    };
    (function() {
        i.implement(this, s), this.EOF_CHAR = "\xb6", this.EOL_CHAR = "\xac", this.TAB_CHAR = "\u2192", this.SPACE_CHAR = "\xb7", this.$padding = 0, this.setPadding = function(e) {
            this.$padding = e, this.element.style.padding = "0 " + e + "px"
        }, this.getLineHeight = function() {
            return this.$characterSize.height || 1
        }, this.getCharacterWidth = function() {
            return this.$characterSize.width || 1
        }, this.checkForSizeChanges = function() {
            var e = this.$measureSizes();
            if (e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                this.$measureNode.style.fontWeight = "bold";
                var t = this.$measureSizes();
                this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {data: e})
            }
        }, this.$pollSizeChanges = function() {
            var e = this;
            this.$pollSizeChangesTimer = setInterval(function() {
                e.checkForSizeChanges()
            }, 500)
        }, this.$fontStyles = {fontFamily: 1,fontSize: 1,fontWeight: 1,fontStyle: 1,lineHeight: 1}, this.$measureSizes = r.isIE || r.isOldGecko ? function() {
            var e = 1e3;
            if (!this.$measureNode) {
                var t = this.$measureNode = n.createElement("div"), i = t.style;
                if (i.width = i.height = "auto", i.left = i.top = 40 * -e + "px", i.visibility = "hidden", i.position = "fixed", i.overflow = "visible", i.whiteSpace = "nowrap", t.innerHTML = o.stringRepeat("Xy", e), this.element.ownerDocument.body)
                    this.element.ownerDocument.body.appendChild(t);
                else {
                    for (var r = this.element.parentNode; !n.hasCssClass(r, "ace_editor"); )
                        r = r.parentNode;
                    r.appendChild(t)
                }
            }
            if (!this.element.offsetWidth)
                return null;
            var i = this.$measureNode.style, s = n.computedStyle(this.element);
            for (var a in this.$fontStyles)
                i[a] = s[a];
            var l = {height: this.$measureNode.offsetHeight,width: this.$measureNode.offsetWidth / (2 * e)};
            return 0 == l.width || 0 == l.height ? null : l
        } : function() {
            if (!this.$measureNode) {
                var e = this.$measureNode = n.createElement("div"), t = e.style;
                t.width = t.height = "auto", t.left = t.top = "-100px", t.visibility = "hidden", t.position = "fixed", t.overflow = "visible", t.whiteSpace = "nowrap", e.innerHTML = "X";
                for (var i = this.element.parentNode; i && !n.hasCssClass(i, "ace_editor"); )
                    i = i.parentNode;
                if (!i)
                    return this.$measureNode = null;
                i.appendChild(e)
            }
            var o = this.$measureNode.getBoundingClientRect(), r = {height: o.height,width: o.width};
            return 0 == r.width || 0 == r.height ? null : r
        }, this.setSession = function(e) {
            this.session = e, this.$computeTabString()
        }, this.showInvisibles = !1, this.setShowInvisibles = function(e) {
            return this.showInvisibles == e ? !1 : (this.showInvisibles = e, this.$computeTabString(), !0)
        }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function(e) {
            return this.displayIndentGuides == e ? !1 : (this.displayIndentGuides = e, this.$computeTabString(), !0)
        }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
            var e = this.session.getTabSize();
            this.tabSize = e;
            for (var t = this.$tabStrings = [0], i = 1; e + 1 > i; i++)
                t.push(this.showInvisibles ? "<span class='ace_invisible'>" + this.TAB_CHAR + o.stringRepeat("\xa0", i - 1) + "</span>" : o.stringRepeat("\xa0", i));
            if (this.displayIndentGuides) {
                this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                var n = "ace_indent-guide";
                if (this.showInvisibles) {
                    n += " ace_invisible";
                    var r = o.stringRepeat(this.SPACE_CHAR, this.tabSize), s = this.TAB_CHAR + o.stringRepeat("\xa0", this.tabSize - 1)
                } else
                    var r = o.stringRepeat("\xa0", this.tabSize), s = r;
                this.$tabStrings[" "] = "<span class='" + n + "'>" + r + "</span>", this.$tabStrings["	"] = "<span class='" + n + "'>" + s + "</span>"
            }
        }, this.updateLines = function(e, t, i) {
            (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) && this.scrollLines(e), this.config = e;
            for (var o = Math.max(t, e.firstRow), r = Math.min(i, e.lastRow), s = this.element.childNodes, a = 0, l = e.firstRow; o > l; l++) {
                var c = this.session.getFoldLine(l);
                if (c) {
                    if (c.containsRow(o)) {
                        o = c.start.row;
                        break
                    }
                    l = c.end.row
                }
                a++
            }
            for (var l = o, c = this.session.getNextFoldLine(l), h = c ? c.start.row : 1 / 0; l > h && (l = c.end.row + 1, c = this.session.getNextFoldLine(l, c), h = c ? c.start.row : 1 / 0), !(l > r); ) {
                var d = s[a++];
                if (d) {
                    var u = [];
                    this.$renderLine(u, l, !this.$useLineGroups(), l == h ? c : !1), n.setInnerHtml(d, u.join(""))
                }
                l++
            }
        }, this.scrollLines = function(e) {
            var t = this.config;
            if (this.config = e, !t || t.lastRow < e.firstRow)
                return this.update(e);
            if (e.lastRow < t.firstRow)
                return this.update(e);
            var i = this.element;
            if (t.firstRow < e.firstRow)
                for (var n = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); n > 0; n--)
                    i.removeChild(i.firstChild);
            if (t.lastRow > e.lastRow)
                for (var n = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); n > 0; n--)
                    i.removeChild(i.lastChild);
            if (e.firstRow < t.firstRow) {
                var o = this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1);
                i.firstChild ? i.insertBefore(o, i.firstChild) : i.appendChild(o)
            }
            if (e.lastRow > t.lastRow) {
                var o = this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow);
                i.appendChild(o)
            }
        }, this.$renderLinesFragment = function(e, t, i) {
            for (var o = this.element.ownerDocument.createDocumentFragment(), r = t, s = this.session.getNextFoldLine(r), a = s ? s.start.row : 1 / 0; r > a && (r = s.end.row + 1, s = this.session.getNextFoldLine(r, s), a = s ? s.start.row : 1 / 0), !(r > i); ) {
                var l = n.createElement("div"), c = [];
                if (this.$renderLine(c, r, !1, r == a ? s : !1), l.innerHTML = c.join(""), this.$useLineGroups())
                    l.className = "ace_line_group", o.appendChild(l);
                else
                    for (var h = l.childNodes; h.length; )
                        o.appendChild(h[0]);
                r++
            }
            return o
        }, this.update = function(e) {
            this.config = e;
            for (var t = [], i = e.firstRow, o = e.lastRow, r = i, s = this.session.getNextFoldLine(r), a = s ? s.start.row : 1 / 0; r > a && (r = s.end.row + 1, s = this.session.getNextFoldLine(r, s), a = s ? s.start.row : 1 / 0), !(r > o); )
                this.$useLineGroups() && t.push("<div class='ace_line_group'>"), this.$renderLine(t, r, !1, r == a ? s : !1), this.$useLineGroups() && t.push("</div>"), r++;
            this.element = n.setInnerHtml(this.element, t.join(""))
        }, this.$textToken = {text: !0,rparen: !0,lparen: !0}, this.$renderToken = function(e, t, i, n) {
            var r = this, s = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g, a = function(e, i, n, s) {
                if (i)
                    return r.showInvisibles ? "<span class='ace_invisible'>" + o.stringRepeat(r.SPACE_CHAR, e.length) + "</span>" : o.stringRepeat("\xa0", e.length);
                if ("&" == e)
                    return "&#38;";
                if ("<" == e)
                    return "&#60;";
                if ("	" == e) {
                    var a = r.session.getScreenTabSize(t + s);
                    return t += a - 1, r.$tabStrings[a]
                }
                if ("\u3000" == e) {
                    var l = r.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk", c = r.showInvisibles ? r.SPACE_CHAR : "";
                    return t += 1, "<span class='" + l + "' style='width:" + 2 * r.config.characterWidth + "px'>" + c + "</span>"
                }
                return n ? "<span class='ace_invisible ace_invalid'>" + r.SPACE_CHAR + "</span>" : (t += 1, "<span class='ace_cjk' style='width:" + 2 * r.config.characterWidth + "px'>" + e + "</span>")
            }, l = n.replace(s, a);
            if (this.$textToken[i.type])
                e.push(l);
            else {
                var c = "ace_" + i.type.replace(/\./g, " ace_"), h = "";
                "fold" == i.type && (h = " style='width:" + i.value.length * this.config.characterWidth + "px;' "), e.push("<span class='", c, "'", h, ">", l, "</span>")
            }
            return t + n.length
        }, this.renderIndentGuide = function(e, t) {
            var i = t.search(this.$indentGuideRe);
            return 0 >= i ? t : " " == t[0] ? (i -= i % this.tabSize, e.push(o.stringRepeat(this.$tabStrings[" "], i / this.tabSize)), t.substr(i)) : "	" == t[0] ? (e.push(o.stringRepeat(this.$tabStrings["	"], i)), t.substr(i)) : t
        }, this.$renderWrappedLine = function(e, t, i, n) {
            for (var o = 0, r = 0, s = i[0], a = 0, l = 0; l < t.length; l++) {
                var c = t[l], h = c.value;
                if (0 == l && this.displayIndentGuides) {
                    if (o = h.length, h = this.renderIndentGuide(e, h), !h)
                        continue;
                    o -= h.length
                }
                if (o + h.length < s)
                    a = this.$renderToken(e, a, c, h), o += h.length;
                else {
                    for (; o + h.length >= s; )
                        a = this.$renderToken(e, a, c, h.substring(0, s - o)), h = h.substring(s - o), o = s, n || e.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), r++, a = 0, s = i[r] || Number.MAX_VALUE;
                    0 != h.length && (o += h.length, a = this.$renderToken(e, a, c, h))
                }
            }
        }, this.$renderSimpleLine = function(e, t) {
            var i = 0, n = t[0], o = n.value;
            this.displayIndentGuides && (o = this.renderIndentGuide(e, o)), o && (i = this.$renderToken(e, i, n, o));
            for (var r = 1; r < t.length; r++)
                n = t[r], o = n.value, i = this.$renderToken(e, i, n, o)
        }, this.$renderLine = function(e, t, i, n) {
            if (!n && 0 != n && (n = this.session.getFoldLine(t)), n)
                var o = this.$getFoldLineTokens(t, n);
            else
                var o = this.session.getTokens(t);
            if (i || e.push("<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), o.length) {
                var r = this.session.getRowSplitData(t);
                r && r.length ? this.$renderWrappedLine(e, o, r, i) : this.$renderSimpleLine(e, o)
            }
            this.showInvisibles && (n && (t = n.end.row), e.push("<span class='ace_invisible'>", t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), i || e.push("</div>")
        }, this.$getFoldLineTokens = function(e, t) {
            function i(e, t, i) {
                for (var n = 0, r = 0; r + e[n].value.length < t; )
                    if (r += e[n].value.length, n++, n == e.length)
                        return;
                if (r != t) {
                    var s = e[n].value.substring(t - r);
                    s.length > i - t && (s = s.substring(0, i - t)), o.push({type: e[n].type,value: s}), r = t + s.length, n += 1
                }
                for (; i > r && n < e.length; ) {
                    var s = e[n].value;
                    o.push(s.length + r > i ? {type: e[n].type,value: s.substring(0, i - r)} : e[n]), r += s.length, n += 1
                }
            }
            var n = this.session, o = [], r = n.getTokens(e);
            return t.walk(function(e, t, s, a, l) {
                null != e ? o.push({type: "fold",value: e}) : (l && (r = n.getTokens(t)), r.length && i(r, a, s))
            }, t.end.row, this.session.getLine(t.end.row).length), o
        }, this.$useLineGroups = function() {
            return this.session.getUseWrapMode()
        }, this.destroy = function() {
            clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode
        }
    }).call(a.prototype), t.Text = a
}), define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
    var i = e("../lib/dom"), n = function(e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), i.addCssClass(this.element, "ace_hidden-cursors")
    };
    (function() {
        this.$padding = 0, this.setPadding = function(e) {
            this.$padding = e
        }, this.setSession = function(e) {
            this.session = e
        }, this.setBlinking = function(e) {
            e != this.isBlinking && (this.isBlinking = e, this.restartTimer())
        }, this.setBlinkInterval = function(e) {
            e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer())
        }, this.setSmoothBlinking = function(e) {
            e != this.smoothBlinking && (this.smoothBlinking = e, e ? i.addCssClass(this.element, "ace_smooth-blinking") : i.removeCssClass(this.element, "ace_smooth-blinking"), this.restartTimer())
        }, this.addCursor = function() {
            var e = i.createElement("div");
            return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e
        }, this.removeCursor = function() {
            if (this.cursors.length > 1) {
                var e = this.cursors.pop();
                return e.parentNode.removeChild(e), e
            }
        }, this.hideCursor = function() {
            this.isVisible = !1, i.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
        }, this.showCursor = function() {
            this.isVisible = !0, i.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
        }, this.restartTimer = function() {
            clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking && i.removeCssClass(this.element, "ace_smooth-blinking");
            for (var e = this.cursors.length; e--; )
                this.cursors[e].style.opacity = "";
            if (this.isBlinking && this.blinkInterval && this.isVisible) {
                this.smoothBlinking && setTimeout(function() {
                    i.addCssClass(this.element, "ace_smooth-blinking")
                }.bind(this));
                var t = function() {
                    this.timeoutId = setTimeout(function() {
                        for (var e = this.cursors.length; e--; )
                            this.cursors[e].style.opacity = 0
                    }.bind(this), .6 * this.blinkInterval)
                }.bind(this);
                this.intervalId = setInterval(function() {
                    for (var e = this.cursors.length; e--; )
                        this.cursors[e].style.opacity = "";
                    t()
                }.bind(this), this.blinkInterval), t()
            }
        }, this.getPixelPosition = function(e, t) {
            if (!this.config || !this.session)
                return {left: 0,top: 0};
            e || (e = this.session.selection.getCursor());
            var i = this.session.documentToScreenPosition(e), n = this.$padding + i.column * this.config.characterWidth, o = (i.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
            return {left: n,top: o}
        }, this.update = function(e) {
            this.config = e;
            var t = this.session.$selectionMarkers, i = 0, n = 0;
            (void 0 === t || 0 === t.length) && (t = [{cursor: null}]);
            for (var i = 0, o = t.length; o > i; i++) {
                var r = this.getPixelPosition(t[i].cursor, !0);
                if (!((r.top > e.height + e.offset || r.top < -e.offset) && i > 1)) {
                    var s = (this.cursors[n++] || this.addCursor()).style;
                    s.left = r.left + "px", s.top = r.top + "px", s.width = e.characterWidth + "px", s.height = e.lineHeight + "px"
                }
            }
            for (; this.cursors.length > n; )
                this.removeCursor();
            var a = this.session.getOverwrite();
            this.$setOverwrite(a), this.$pixelPos = r, this.restartTimer()
        }, this.$setOverwrite = function(e) {
            e != this.overwrite && (this.overwrite = e, e ? i.addCssClass(this.element, "ace_overwrite-cursors") : i.removeCssClass(this.element, "ace_overwrite-cursors"))
        }, this.destroy = function() {
            clearInterval(this.intervalId), clearTimeout(this.timeoutId)
        }
    }).call(n.prototype), t.Cursor = n
}), define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function(e, t) {
    var i = e("./lib/oop"), n = e("./lib/dom"), o = e("./lib/event"), r = e("./lib/event_emitter").EventEmitter, s = function(e) {
        this.element = n.createElement("div"), this.element.className = "ace_scrollbar", this.inner = n.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), e.appendChild(this.element), this.width = n.scrollbarWidth(e.ownerDocument), this.element.style.width = (this.width || 15) + 5 + "px", o.addListener(this.element, "scroll", this.onScroll.bind(this))
    };
    (function() {
        i.implement(this, r), this.onScroll = function() {
            this.skipEvent || (this.scrollTop = this.element.scrollTop, this._emit("scroll", {data: this.scrollTop})), this.skipEvent = !1
        }, this.getWidth = function() {
            return this.width
        }, this.setHeight = function(e) {
            this.element.style.height = e + "px"
        }, this.setInnerHeight = function(e) {
            this.inner.style.height = e + "px"
        }, this.setScrollTop = function(e) {
            this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = this.element.scrollTop = e)
        }
    }).call(s.prototype), t.ScrollBar = s
}), define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function(e, t) {
    var i = e("./lib/event"), n = function(e, t) {
        this.onRender = e, this.pending = !1, this.changes = 0, this.window = t || window
    };
    (function() {
        this.schedule = function(e) {
            if (this.changes = this.changes | e, !this.pending) {
                this.pending = !0;
                var t = this;
                i.nextFrame(function() {
                    t.pending = !1;
                    for (var e; e = t.changes; )
                        t.changes = 0, t.onRender(e)
                }, this.window)
            }
        }
    }).call(n.prototype), t.RenderLoop = n
}), define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor"], function(e, t) {
    function i(e, t, i) {
        return g.$options.wrap = !0, g.$options.needle = t, g.$options.backwards = -1 == i, g.find(e)
    }
    function n(e, t) {
        return e.row == t.row && e.column == t.column
    }
    function o(e) {
        e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), t.onSessionChange.call(e, e), e.on("changeSession", t.onSessionChange.bind(e)), e.on("mousedown", c), e.commands.addCommands(u.defaultCommands), r(e)
    }
    function r(e) {
        function t() {
            n && (o.style.cursor = "", n = !1)
        }
        var i = e.textInput.getElement(), n = !1, o = e.renderer.content;
        h.addListener(i, "keydown", function(e) {
            18 != e.keyCode || e.ctrlKey || e.shiftKey || e.metaKey ? n && (o.style.cursor = "") : n || (o.style.cursor = "crosshair", n = !0)
        }), h.addListener(i, "keyup", t), h.addListener(i, "blur", t)
    }
    var s = e("./range_list").RangeList, a = e("./range").Range, l = e("./selection").Selection, c = e("./mouse/multi_select_handler").onMouseDown, h = e("./lib/event"), d = e("./lib/lang"), u = e("./commands/multi_select_commands");
    t.commands = u.defaultCommands.concat(u.multiSelectCommands);
    var p = e("./search").Search, g = new p, m = e("./edit_session").EditSession;
    (function() {
        this.getSelectionMarkers = function() {
            return this.$selectionMarkers
        }
    }).call(m.prototype), function() {
        this.ranges = null, this.rangeList = null, this.addRange = function(e, t) {
            if (e) {
                if (!this.inMultiSelectMode && 0 == this.rangeCount) {
                    var i = this.toOrientedRange();
                    if (this.rangeList.add(i), this.rangeList.add(e), 2 != this.rangeList.ranges.length)
                        return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                    this.rangeList.removeAll(), this.rangeList.add(i), this.$onAddRange(i)
                }
                e.cursor || (e.cursor = e.end);
                var n = this.rangeList.add(e);
                return this.$onAddRange(e), n.length && this.$onRemoveRange(n), this.rangeCount > 1 && !this.inMultiSelectMode && (this._emit("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
            }
        }, this.toSingleRange = function(e) {
            e = e || this.ranges[0];
            var t = this.rangeList.removeAll();
            t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
        }, this.substractPoint = function(e) {
            var t = this.rangeList.substractPoint(e);
            return t ? (this.$onRemoveRange(t), t[0]) : void 0
        }, this.mergeOverlappingRanges = function() {
            var e = this.rangeList.merge();
            e.length ? this.$onRemoveRange(e) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
        }, this.$onAddRange = function(e) {
            this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._emit("addRange", {range: e})
        }, this.$onRemoveRange = function(e) {
            if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                var t = this.rangeList.ranges.pop();
                e.push(t), this.rangeCount = 0
            }
            for (var i = e.length; i--; ) {
                var n = this.ranges.indexOf(e[i]);
                this.ranges.splice(n, 1)
            }
            this._emit("removeRange", {ranges: e}), 0 == this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._emit("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), t = t || this.ranges[0], t && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
        }, this.$initRangeList = function() {
            this.rangeList || (this.rangeList = new s, this.ranges = [], this.rangeCount = 0)
        }, this.getAllRanges = function() {
            return this.rangeList.ranges.concat()
        }, this.splitIntoLines = function() {
            if (this.rangeCount > 1) {
                var e = this.rangeList.ranges, t = e[e.length - 1], i = a.fromPoints(e[0].start, t.end);
                this.toSingleRange(), this.setSelectionRange(i, t.cursor == t.start)
            } else {
                var i = this.getRange(), n = this.isBackwards(), o = i.start.row, r = i.end.row;
                if (o == r) {
                    if (n)
                        var s = i.end, l = i.start;
                    else
                        var s = i.start, l = i.end;
                    return this.addRange(a.fromPoints(l, l)), void this.addRange(a.fromPoints(s, s))
                }
                var c = [], h = this.getLineRange(o, !0);
                h.start.column = i.start.column, c.push(h);
                for (var d = o + 1; r > d; d++)
                    c.push(this.getLineRange(d, !0));
                h = this.getLineRange(r, !0), h.end.column = i.end.column, c.push(h), c.forEach(this.addRange, this)
            }
        }, this.toggleBlockSelection = function() {
            if (this.rangeCount > 1) {
                var e = this.rangeList.ranges, t = e[e.length - 1], i = a.fromPoints(e[0].start, t.end);
                this.toSingleRange(), this.setSelectionRange(i, t.cursor == t.start)
            } else {
                var n = this.session.documentToScreenPosition(this.selectionLead), o = this.session.documentToScreenPosition(this.selectionAnchor), r = this.rectangularRangeBlock(n, o);
                r.forEach(this.addRange, this)
            }
        }, this.rectangularRangeBlock = function(e, t, i) {
            var o = [], r = e.column < t.column;
            if (r)
                var s = e.column, l = t.column;
            else
                var s = t.column, l = e.column;
            var c = e.row < t.row;
            if (c)
                var h = e.row, d = t.row;
            else
                var h = t.row, d = e.row;
            0 > s && (s = 0), 0 > h && (h = 0), h == d && (i = !0);
            for (var u = h; d >= u; u++) {
                var p = a.fromPoints(this.session.screenToDocumentPosition(u, s), this.session.screenToDocumentPosition(u, l));
                if (p.isEmpty()) {
                    if (g && n(p.end, g))
                        break;
                    var g = p.end
                }
                p.cursor = r ? p.start : p.end, o.push(p)
            }
            if (c && o.reverse(), !i) {
                for (var m = o.length - 1; o[m].isEmpty() && m > 0; )
                    m--;
                if (m > 0)
                    for (var f = 0; o[f].isEmpty(); )
                        f++;
                for (var v = m; v >= f; v--)
                    o[v].isEmpty() && o.splice(v, 1)
            }
            return o
        }
    }.call(l.prototype);
    var f = e("./editor").Editor;
    (function() {
        this.updateSelectionMarkers = function() {
            this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.addSelectionMarker = function(e) {
            e.cursor || (e.cursor = e.end);
            var t = this.getSelectionStyle();
            return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e
        }, this.removeSelectionMarker = function(e) {
            if (e.marker) {
                this.session.removeMarker(e.marker);
                var t = this.session.$selectionMarkers.indexOf(e);
                -1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
            }
        }, this.removeSelectionMarkers = function(e) {
            for (var t = this.session.$selectionMarkers, i = e.length; i--; ) {
                var n = e[i];
                if (n.marker) {
                    this.session.removeMarker(n.marker);
                    var o = t.indexOf(n);
                    -1 != o && t.splice(o, 1)
                }
            }
            this.session.selectionMarkerCount = t.length
        }, this.$onAddRange = function(e) {
            this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.$onRemoveRange = function(e) {
            this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
        }, this.$onMultiSelect = function() {
            this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(u.keyboardHandler), this.commands.on("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
        }, this.$onSingleSelect = function() {
            this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(u.keyboardHandler), this.commands.removeEventListener("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
        }, this.$onMultiSelectExec = function(e) {
            var t = e.command, i = e.editor;
            i.multiSelect && (t.multiSelectAction ? "forEach" == t.multiSelectAction ? i.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? i.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (i.exitMultiSelectMode(), t.exec(i, e.args || {})) : t.multiSelectAction(i, e.args || {}) : (t.exec(i, e.args || {}), i.multiSelect.addRange(i.multiSelect.toOrientedRange()), i.multiSelect.mergeOverlappingRanges()), e.preventDefault())
        }, this.forEachSelection = function(e, t, i) {
            if (!this.inVirtualSelectionMode) {
                var n = this.session, o = this.selection, r = o.rangeList, s = o._eventRegistry;
                o._eventRegistry = {};
                var a = new l(n);
                this.inVirtualSelectionMode = !0;
                for (var c = r.ranges.length; c--; ) {
                    if (i)
                        for (; c > 0 && r.ranges[c].start.row == r.ranges[c - 1].end.row; )
                            c--;
                    a.fromOrientedRange(r.ranges[c]), this.selection = n.selection = a, e.exec(this, t || {}), a.toOrientedRange(r.ranges[c])
                }
                a.detach(), this.selection = n.selection = o, this.inVirtualSelectionMode = !1, o._eventRegistry = s, o.mergeOverlappingRanges(), this.onCursorChange(), this.onSelectionChange()
            }
        }, this.exitMultiSelectMode = function() {
            this.inVirtualSelectionMode || this.multiSelect.toSingleRange()
        }, this.getCopyText = function() {
            var e = "";
            if (this.inMultiSelectMode) {
                for (var t = this.multiSelect.rangeList.ranges, i = [], n = 0; n < t.length; n++)
                    i.push(this.session.getTextRange(t[n]));
                var o = this.session.getDocument().getNewLineCharacter();
                e = i.join(o), e.length == (i.length - 1) * o.length && (e = "")
            } else
                this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
            return e
        }, this.onPaste = function(e) {
            if (!this.$readOnly) {
                if (this._signal("paste", e), !this.inMultiSelectMode || this.inVirtualSelectionMode)
                    return this.insert(e);
                var t = e.split(/\r\n|\r|\n/), i = this.selection.rangeList.ranges;
                if (t.length > i.length || t.length <= 2 && !t[1])
                    return this.commands.exec("insertstring", this, e);
                for (var n = i.length; n--; ) {
                    var o = i[n];
                    o.isEmpty() || this.session.remove(o), this.session.insert(o.start, t[n])
                }
            }
        }, this.findAll = function(e, t, i) {
            t = t || {}, t.needle = e || t.needle, this.$search.set(t);
            var n = this.$search.findAll(this.session);
            if (!n.length)
                return 0;
            this.$blockScrolling += 1;
            var o = this.multiSelect;
            i || o.toSingleRange(n[0]);
            for (var r = n.length; r--; )
                o.addRange(n[r], !0);
            return this.$blockScrolling -= 1, n.length
        }, this.selectMoreLines = function(e, t) {
            var i = this.selection.toOrientedRange(), n = i.cursor == i.end, o = this.session.documentToScreenPosition(i.cursor);
            this.selection.$desiredColumn && (o.column = this.selection.$desiredColumn);
            var r = this.session.screenToDocumentPosition(o.row + e, o.column);
            if (i.isEmpty())
                var s = r;
            else
                var l = this.session.documentToScreenPosition(n ? i.end : i.start), s = this.session.screenToDocumentPosition(l.row + e, l.column);
            if (n) {
                var c = a.fromPoints(r, s);
                c.cursor = c.start
            } else {
                var c = a.fromPoints(s, r);
                c.cursor = c.end
            }
            if (c.desiredColumn = o.column, this.selection.inMultiSelectMode) {
                if (t)
                    var h = i.cursor
            } else
                this.selection.addRange(i);
            this.selection.addRange(c), h && this.selection.substractPoint(h)
        }, this.transposeSelections = function(e) {
            for (var t = this.session, i = t.multiSelect, n = i.ranges, o = n.length; o--; ) {
                var r = n[o];
                if (r.isEmpty()) {
                    var s = t.getWordRange(r.start.row, r.start.column);
                    r.start.row = s.start.row, r.start.column = s.start.column, r.end.row = s.end.row, r.end.column = s.end.column
                }
            }
            i.mergeOverlappingRanges();
            for (var a = [], o = n.length; o--; ) {
                var r = n[o];
                a.unshift(t.getTextRange(r))
            }
            0 > e ? a.unshift(a.pop()) : a.push(a.shift());
            for (var o = n.length; o--; ) {
                var r = n[o], s = r.clone();
                t.replace(r, a[o]), r.start.row = s.start.row, r.start.column = s.start.column
            }
        }, this.selectMore = function(e, t) {
            var n = this.session, o = n.multiSelect, r = o.toOrientedRange();
            if (r.isEmpty()) {
                var r = n.getWordRange(r.start.row, r.start.column);
                r.cursor = r.end, this.multiSelect.addRange(r)
            }
            var s = n.getTextRange(r), a = i(n, s, e);
            a && (a.cursor = -1 == e ? a.start : a.end, this.multiSelect.addRange(a)), t && this.multiSelect.substractPoint(r.cursor)
        }, this.alignCursors = function() {
            var e = this.session, t = e.multiSelect, i = t.ranges;
            if (i.length) {
                var n = -1, o = i.filter(function(e) {
                    return e.cursor.row == n ? !0 : void (n = e.cursor.row)
                });
                t.$onRemoveRange(o);
                var r = 0, s = 1 / 0, l = i.map(function(t) {
                    var i = t.cursor, n = e.getLine(i.row), o = n.substr(i.column).search(/\S/g);
                    return -1 == o && (o = 0), i.column > r && (r = i.column), s > o && (s = o), o
                });
                i.forEach(function(t, i) {
                    var n = t.cursor, o = r - n.column, c = l[i] - s;
                    o > c ? e.insert(n, d.stringRepeat(" ", o - c)) : e.remove(new a(n.row, n.column, n.row, n.column - o + c)), t.start.column = t.end.column = r, t.start.row = t.end.row = n.row, t.cursor = t.end
                }), t.fromOrientedRange(i[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            } else {
                var c = this.selection.getRange(), h = c.start.row, u = c.end.row, p = this.session.doc.removeLines(h, u);
                p = this.$reAlignText(p), this.session.doc.insertLines(h, p), c.start.column = 0, c.end.column = p[p.length - 1].length, this.selection.setRange(c)
            }
        }, this.$reAlignText = function(e) {
            function t(e) {
                return d.stringRepeat(" ", e)
            }
            function i(e) {
                return e[2] ? t(r) + e[2] + t(s - e[2].length + a) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
            }
            function n(e) {
                return e[2] ? t(r + s - e[2].length) + e[2] + t(a, " ") + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
            }
            function o(e) {
                return e[2] ? t(r) + e[2] + t(a) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
            }
            var r, s, a, l = !0, c = !0;
            return e.map(function(e) {
                var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
                return t ? null == r ? (r = t[1].length, s = t[2].length, a = t[3].length, t) : (r + s + a != t[1].length + t[2].length + t[3].length && (c = !1), r != t[1].length && (l = !1), r > t[1].length && (r = t[1].length), s < t[2].length && (s = t[2].length), a > t[3].length && (a = t[3].length), t) : [e]
            }).map(l ? c ? n : i : o)
        }
    }).call(f.prototype), t.onSessionChange = function(e) {
        var t = e.session;
        t.multiSelect || (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t.multiSelect;
        var i = e.oldSession;
        i && (i.multiSelect.removeEventListener("addRange", this.$onAddRange), i.multiSelect.removeEventListener("removeRange", this.$onRemoveRange), i.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect), i.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect)), t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
    }, t.MultiSelect = o
}), define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event"], function(e, t) {
    function i(e, t) {
        return e.row == t.row && e.column == t.column
    }
    function n(e) {
        var t = e.domEvent, n = t.altKey, r = t.shiftKey, s = e.getAccelKey(), a = e.getButton();
        if (e.editor.inMultiSelectMode && 2 == a)
            return void e.editor.textInput.onContextMenu(e.domEvent);
        if (!s && !n)
            return void (0 == a && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode());
        var l = e.editor, c = l.selection, h = l.inMultiSelectMode, d = e.getDocumentPosition(), u = c.getCursor(), p = e.inSelection() || c.isEmpty() && i(d, u), g = e.x, m = e.y, f = function(e) {
            g = e.clientX, m = e.clientY
        }, v = function() {
            var e = l.renderer.pixelToScreenCoordinates(g, m), t = b.screenToDocumentPosition(e.row, e.column);
            i(C, e) && i(t, c.selectionLead) || (C = e, l.selection.moveCursorToPosition(t), l.selection.clearSelection(), l.renderer.scrollCursorIntoView(), l.removeSelectionMarkers(k), k = c.rectangularRangeBlock(C, w), k.forEach(l.addSelectionMarker, l), l.updateSelectionMarkers())
        }, b = l.session, w = l.renderer.pixelToScreenCoordinates(g, m), C = w;
        if (!s || r || n || 0 != a) {
            if (n && 0 == a) {
                e.stop(), h && !s ? c.toSingleRange() : !h && s && c.addRange();
                var k = [];
                r ? (w = b.documentToScreenPosition(c.lead), v()) : (c.moveCursorToPosition(d), c.clearSelection());
                var y = function() {
                    clearInterval(S), l.removeSelectionMarkers(k);
                    for (var e = 0; e < k.length; e++)
                        c.addRange(k[e])
                }, E = v;
                o.capture(l.container, f, y);
                var S = setInterval(function() {
                    E()
                }, 20);
                return e.preventDefault()
            }
        } else {
            if (!h && p)
                return;
            if (!h) {
                var A = c.toOrientedRange();
                l.addSelectionMarker(A)
            }
            var x = c.rangeList.rangeAtPoint(d);
            l.once("mouseup", function() {
                var e = c.toOrientedRange();
                x && e.isEmpty() && i(x.cursor, e.cursor) ? c.substractPoint(e.cursor) : (A && (l.removeSelectionMarker(A), c.addRange(A)), c.addRange(e))
            })
        }
    }
    var o = e("../lib/event");
    t.onMouseDown = n
}), define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function(e, t) {
    t.defaultCommands = [{name: "addCursorAbove",exec: function(e) {
                e.selectMoreLines(-1)
            },bindKey: {win: "Ctrl-Alt-Up",mac: "Ctrl-Alt-Up"},readonly: !0}, {name: "addCursorBelow",exec: function(e) {
                e.selectMoreLines(1)
            },bindKey: {win: "Ctrl-Alt-Down",mac: "Ctrl-Alt-Down"},readonly: !0}, {name: "addCursorAboveSkipCurrent",exec: function(e) {
                e.selectMoreLines(-1, !0)
            },bindKey: {win: "Ctrl-Alt-Shift-Up",mac: "Ctrl-Alt-Shift-Up"},readonly: !0}, {name: "addCursorBelowSkipCurrent",exec: function(e) {
                e.selectMoreLines(1, !0)
            },bindKey: {win: "Ctrl-Alt-Shift-Down",mac: "Ctrl-Alt-Shift-Down"},readonly: !0}, {name: "selectMoreBefore",exec: function(e) {
                e.selectMore(-1)
            },bindKey: {win: "Ctrl-Alt-Left",mac: "Ctrl-Alt-Left"},readonly: !0}, {name: "selectMoreAfter",exec: function(e) {
                e.selectMore(1)
            },bindKey: {win: "Ctrl-Alt-Right",mac: "Ctrl-Alt-Right"},readonly: !0}, {name: "selectNextBefore",exec: function(e) {
                e.selectMore(-1, !0)
            },bindKey: {win: "Ctrl-Alt-Shift-Left",mac: "Ctrl-Alt-Shift-Left"},readonly: !0}, {name: "selectNextAfter",exec: function(e) {
                e.selectMore(1, !0)
            },bindKey: {win: "Ctrl-Alt-Shift-Right",mac: "Ctrl-Alt-Shift-Right"},readonly: !0}, {name: "splitIntoLines",exec: function(e) {
                e.multiSelect.splitIntoLines()
            },bindKey: {win: "Ctrl-Alt-L",mac: "Ctrl-Alt-L"},readonly: !0}, {name: "alignCursors",exec: function(e) {
                e.alignCursors()
            },bindKey: {win: "Ctrl-Alt-A",mac: "Ctrl-Alt-A"}}], t.multiSelectCommands = [{name: "singleSelection",bindKey: "esc",exec: function(e) {
                e.exitMultiSelectMode()
            },readonly: !0,isAvailable: function(e) {
                return e && e.inMultiSelectMode
            }}];
    var i = e("../keyboard/hash_handler").HashHandler;
    t.keyboardHandler = new i(t.multiSelectCommands)
}), define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/config"], function(e, t) {
    var i = e("../lib/oop"), n = e("../lib/event_emitter").EventEmitter, o = e("../config"), r = function(t, i, n) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.onError = this.onError.bind(this);
        var r;
        if (o.get("packaged"))
            r = o.moduleUrl(i, "worker");
        else {
            var s = this.$normalizePath;
            e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), r = s(e.toUrl("ace/worker/worker.js", null, "_"));
            var a = {};
            t.forEach(function(t) {
                a[t] = s(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
            })
        }
        this.$worker = new Worker(r), this.$worker.postMessage({init: !0,tlns: a,module: i,classname: n}), this.callbackId = 1, this.callbacks = {}, this.$worker.onerror = this.onError, this.$worker.onmessage = this.onMessage
    };
    (function() {
        i.implement(this, n), this.onError = function(e) {
            throw window.console && console.log && console.log(e), e
        }, this.onMessage = function(e) {
            var t = e.data;
            switch (t.type) {
                case "log":
                    window.console && console.log && console.log.apply(console, t.data);
                    break;
                case "event":
                    this._emit(t.name, {data: t.data});
                    break;
                case "call":
                    var i = this.callbacks[t.id];
                    i && (i(t.data), delete this.callbacks[t.id])
            }
        }, this.$normalizePath = function(e) {
            return location.host ? (e = e.replace(/^[a-z]+:\/\/[^\/]+/, ""), e = location.protocol + "//" + location.host + ("/" == e.charAt(0) ? "" : location.pathname.replace(/\/[^\/]*$/, "")) + "/" + e.replace(/^[\/]+/, "")) : e
        }, this.terminate = function() {
            this._emit("terminate", {}), this.$worker.terminate(), this.$worker = null, this.$doc.removeEventListener("change", this.changeListener), this.$doc = null
        }, this.send = function(e, t) {
            this.$worker.postMessage({command: e,args: t})
        }, this.call = function(e, t, i) {
            if (i) {
                var n = this.callbackId++;
                this.callbacks[n] = i, t.push(n)
            }
            this.send(e, t)
        }, this.emit = function(e, t) {
            try {
                this.$worker.postMessage({event: e,data: {data: t.data}})
            } catch (i) {
            }
        }, this.attachToDocument = function(e) {
            this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener)
        }, this.changeListener = function(e) {
            this.deltaQueue ? this.deltaQueue.push(e.data) : (this.deltaQueue = [e.data], setTimeout(this.$sendDeltaQueue, 1))
        }, this.$sendDeltaQueue = function() {
            var e = this.deltaQueue;
            e && (this.deltaQueue = null, e.length > 20 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {data: e}))
        }
    }).call(r.prototype);
    var s = function(e, t, i) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
        var r = null, s = Object.create(n), a = this;
        this.$worker = {}, this.$worker.terminate = function() {
        }, this.$worker.postMessage = function(e) {
            a.messageBuffer.push(e), r && setTimeout(l)
        };
        var l = function() {
            var e = a.messageBuffer.shift();
            e.command ? r[e.command].apply(r, e.args) : e.event && s._emit(e.event, e.data)
        };
        s.postMessage = function(e) {
            a.onMessage({data: e})
        }, s.callback = function(e, t) {
            this.postMessage({type: "call",id: t,data: e})
        }, s.emit = function(e, t) {
            this.postMessage({type: "event",name: e,data: t})
        }, o.loadModule(["worker", t], function(e) {
            for (r = new e[i](s); a.messageBuffer.length; )
                l()
        })
    };
    s.prototype = r.prototype, t.UIWorkerClient = s, t.WorkerClient = r
}), define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function(e, t) {
    var i = e("./range").Range, n = e("./lib/event_emitter").EventEmitter, o = e("./lib/oop"), r = function(e, t, i, n, o, r) {
        var s = this;
        this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = o, this.othersClass = r, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = n, this.$onCursorChange = function() {
            setTimeout(function() {
                s.onCursorChange()
            })
        }, this.$pos = i;
        var a = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {length: -1};
        this.$undoStackDepth = a.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
    };
    (function() {
        o.implement(this, n), this.setup = function() {
            var e = this, t = this.doc, n = this.session, o = this.$pos;
            this.pos = t.createAnchor(o.row, o.column), this.markerId = n.addMarker(new i(o.row, o.column, o.row, o.column + this.length), this.mainClass, null, !1), this.pos.on("change", function(t) {
                n.removeMarker(e.markerId), e.markerId = n.addMarker(new i(t.value.row, t.value.column, t.value.row, t.value.column + e.length), e.mainClass, null, !1)
            }), this.others = [], this.$others.forEach(function(i) {
                var n = t.createAnchor(i.row, i.column);
                e.others.push(n)
            }), n.setUndoSelect(!1)
        }, this.showOtherMarkers = function() {
            if (!this.othersActive) {
                var e = this.session, t = this;
                this.othersActive = !0, this.others.forEach(function(n) {
                    n.markerId = e.addMarker(new i(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1), n.on("change", function(o) {
                        e.removeMarker(n.markerId), n.markerId = e.addMarker(new i(o.value.row, o.value.column, o.value.row, o.value.column + t.length), t.othersClass, null, !1)
                    })
                })
            }
        }, this.hideOtherMarkers = function() {
            if (this.othersActive) {
                this.othersActive = !1;
                for (var e = 0; e < this.others.length; e++)
                    this.session.removeMarker(this.others[e].markerId)
            }
        }, this.onUpdate = function(e) {
            var t = e.data, n = t.range;
            if (n.start.row === n.end.row && n.start.row === this.pos.row && !this.$updating) {
                this.$updating = !0;
                var o = "insertText" === t.action ? n.end.column - n.start.column : n.start.column - n.end.column;
                if (n.start.column >= this.pos.column && n.start.column <= this.pos.column + this.length + 1) {
                    var r = n.start.column - this.pos.column;
                    if (this.length += o, !this.session.$fromUndo) {
                        if ("insertText" === t.action)
                            for (var s = this.others.length - 1; s >= 0; s--) {
                                var a = this.others[s], l = {row: a.row,column: a.column + r};
                                a.row === n.start.row && n.start.column < a.column && (l.column += o), this.doc.insert(l, t.text)
                            }
                        else if ("removeText" === t.action)
                            for (var s = this.others.length - 1; s >= 0; s--) {
                                var a = this.others[s], l = {row: a.row,column: a.column + r};
                                a.row === n.start.row && n.start.column < a.column && (l.column += o), this.doc.remove(new i(l.row, l.column, l.row, l.column - o))
                            }
                        n.start.column === this.pos.column && "insertText" === t.action ? setTimeout(function() {
                            this.pos.setPosition(this.pos.row, this.pos.column - o);
                            for (var e = 0; e < this.others.length; e++) {
                                var t = this.others[e], i = {row: t.row,column: t.column - o};
                                t.row === n.start.row && n.start.column < t.column && (i.column += o), t.setPosition(i.row, i.column)
                            }
                        }.bind(this), 0) : n.start.column === this.pos.column && "removeText" === t.action && setTimeout(function() {
                            for (var e = 0; e < this.others.length; e++) {
                                var t = this.others[e];
                                t.row === n.start.row && n.start.column < t.column && t.setPosition(t.row, t.column - o)
                            }
                        }.bind(this), 0)
                    }
                    this.pos._emit("change", {value: this.pos});
                    for (var s = 0; s < this.others.length; s++)
                        this.others[s]._emit("change", {value: this.others[s]})
                }
                this.$updating = !1
            }
        }, this.onCursorChange = function(e) {
            if (!this.$updating) {
                var t = this.session.selection.getCursor();
                t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
            }
        }, this.detach = function() {
            this.session.removeMarker(this.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.pos.detach();
            for (var e = 0; e < this.others.length; e++)
                this.others[e].detach();
            this.session.setUndoSelect(!0)
        }, this.cancel = function() {
            if (-1 === this.$undoStackDepth)
                throw Error("Canceling placeholders only supported with undo manager attached to session.");
            for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, i = 0; t > i; i++)
                e.undo(!0)
        }
    }).call(r.prototype), t.PlaceHolder = r
}), define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function(e, t) {
    var i = e("../../range").Range, n = t.FoldMode = function() {
    };
    (function() {
        this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(e, t, i) {
            var n = e.getLine(i);
            return this.foldingStartMarker.test(n) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(n) ? "end" : ""
        }, this.getFoldWidgetRange = function() {
            return null
        }, this.indentationBlock = function(e, t, n) {
            var o = /\S/, r = e.getLine(t), s = r.search(o);
            if (-1 != s) {
                for (var a = n || r.length, l = e.getLength(), c = t, h = t; ++t < l; ) {
                    var d = e.getLine(t).search(o);
                    if (-1 != d) {
                        if (s >= d)
                            break;
                        h = t
                    }
                }
                if (h > c) {
                    var u = e.getLine(h).length;
                    return new i(c, a, h, u)
                }
            }
        }, this.openingBracketBlock = function(e, t, n, o, r) {
            var s = {row: n,column: o + 1}, a = e.$findClosingBracket(t, s, r);
            if (a) {
                var l = e.foldWidgets[a.row];
                return null == l && (l = this.getFoldWidget(e, a.row)), "start" == l && a.row > s.row && (a.row--, a.column = e.getLine(a.row).length), i.fromPoints(s, a)
            }
        }, this.closingBracketBlock = function(e, t, n, o) {
            var r = {row: n,column: o}, s = e.$findOpeningBracket(t, r);
            if (s)
                return s.column++, r.column--, i.fromPoints(s, r)
        }
    }).call(n.prototype)
}), define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
    t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm .ace_scroller {background-color: #FFFFFF;}.ace-tm .ace_cursor {border-left: 2px solid black;}.ace-tm .ace_overwrite-cursors .ace_cursor {border-left: 0px;border-bottom: 1px solid black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_markup.ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_markup.ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
    var i = e("../lib/dom");
    i.importCssString(t.cssText, t.cssClass)
}), function() {
    window.require(["ace/ace"], function(e) {
        e && e.config.init(), window.ace || (window.ace = {});
        for (var t in e)
            e.hasOwnProperty(t) && (ace[t] = e[t])
    })
}(), define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text").Mode, o = e("../tokenizer").Tokenizer, r = e("./javascript_highlight_rules").JavaScriptHighlightRules, s = e("./matching_brace_outdent").MatchingBraceOutdent, a = (e("../range").Range, e("../worker/worker_client").WorkerClient), l = e("./behaviour/cstyle").CstyleBehaviour, c = e("./folding/cstyle").FoldMode, h = function() {
        this.$tokenizer = new o((new r).getRules()), this.$outdent = new s, this.$behaviour = new l, this.foldingRules = new c
    };
    i.inherits(h, n), function() {
        this.lineCommentStart = "//", this.blockComment = {start: "/*",end: "*/"}, this.getNextLineIndent = function(e, t, i) {
            var n = this.$getIndent(t), o = this.$tokenizer.getLineTokens(t, e), r = o.tokens, s = o.state;
            if (r.length && "comment" == r[r.length - 1].type)
                return n;
            if ("start" == e || "no_regex" == e) {
                var a = t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
                a && (n += i)
            } else if ("doc-start" == e) {
                if ("start" == s || "no_regex" == s)
                    return "";
                var a = t.match(/^\s*(\/?)\*/);
                a && (a[1] && (n += " "), n += "* ")
            }
            return n
        }, this.checkOutdent = function(e, t, i) {
            return this.$outdent.checkOutdent(t, i)
        }, this.autoOutdent = function(e, t, i) {
            this.$outdent.autoOutdent(t, i)
        }, this.createWorker = function(e) {
            var t = new a(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return t.attachToDocument(e.getDocument()), t.on("jslint", function(t) {
                e.setAnnotations(t.data)
            }), t.on("terminate", function() {
                e.clearAnnotations()
            }), t
        }
    }.call(h.prototype), t.Mode = h
}), define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("./doc_comment_highlight_rules").DocCommentHighlightRules, o = e("./text_highlight_rules").TextHighlightRules, r = function() {
        var e = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword: "const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type": "const|let|var|function","constant.language": "null|Infinity|NaN|undefined","support.function": "alert","constant.language.boolean": "true|false"}, "identifier"), t = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void", i = "[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*\\b", o = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
        this.$rules = {no_regex: [{token: "comment",regex: /\/\/.*$/}, n.getStartRule("doc-start"), {token: "comment",regex: /\/\*/,next: "comment"}, {token: "string",regex: "'(?=.)",next: "qstring"}, {token: "string",regex: '"(?=.)',next: "qqstring"}, {token: "constant.numeric",regex: /0[xX][0-9a-fA-F]+\b/}, {token: "constant.numeric",regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/}, {token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"],regex: "(" + i + ")(\\.)(prototype)(\\.)(" + i + ")(\\s*)(=)",next: "function_arguments"}, {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],regex: "(" + i + ")(\\.)(" + i + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],regex: "(" + i + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"],regex: "(" + i + ")(\\.)(" + i + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next: "function_arguments"}, {token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"],regex: "(function)(\\s+)(" + i + ")(\\s*)(\\()",next: "function_arguments"}, {token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"],regex: "(" + i + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: ["text", "text", "storage.type", "text", "paren.lparen"],regex: "(:)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: "keyword",regex: "(?:" + t + ")\\b",next: "start"}, {token: ["punctuation.operator", "support.function"],regex: /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/}, {token: ["punctuation.operator", "support.function.dom"],regex: /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/}, {token: ["punctuation.operator", "support.constant"],regex: /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/}, {token: ["storage.type", "punctuation.operator", "support.function.firebug"],regex: /(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/}, {token: e,regex: i}, {token: "keyword.operator",regex: /--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,next: "start"}, {token: "punctuation.operator",regex: /\?|\:|\,|\;|\./,next: "start"}, {token: "paren.lparen",regex: /[\[({]/,next: "start"}, {token: "paren.rparen",regex: /[\])}]/}, {token: "keyword.operator",regex: /\/=?/,next: "start"}, {token: "comment",regex: /^#!.*$/}],start: [n.getStartRule("doc-start"), {token: "comment",regex: "\\/\\*",next: "comment_regex_allowed"}, {token: "comment",regex: "\\/\\/.*$",next: "start"}, {token: "string.regexp",regex: "\\/",next: "regex"}, {token: "text",regex: "\\s+|^$",next: "start"}, {token: "empty",regex: "",next: "no_regex"}],regex: [{token: "regexp.keyword.operator",regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"}, {token: "string.regexp",regex: "/\\w*",next: "no_regex"}, {token: "invalid",regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/}, {token: "constant.language.escape",regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?]/}, {token: "constant.language.delimiter",regex: /\|/}, {token: "constant.language.escape",regex: /\[\^?/,next: "regex_character_class"}, {token: "empty",regex: "$",next: "no_regex"}, {defaultToken: "string.regexp"}],regex_character_class: [{token: "regexp.keyword.operator",regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"}, {token: "constant.language.escape",regex: "]",next: "regex"}, {token: "constant.language.escape",regex: "-"}, {token: "empty",regex: "$",next: "no_regex"}, {defaultToken: "string.regexp.charachterclass"}],function_arguments: [{token: "variable.parameter",regex: i}, {token: "punctuation.operator",regex: "[, ]+"}, {token: "punctuation.operator",regex: "$"}, {token: "empty",regex: "",next: "no_regex"}],comment_regex_allowed: [{token: "comment",regex: "\\*\\/",next: "start"}, {defaultToken: "comment"}],comment: [{token: "comment",regex: "\\*\\/",next: "no_regex"}, {defaultToken: "comment"}],qqstring: [{token: "constant.language.escape",regex: o}, {token: "string",regex: "\\\\$",next: "qqstring"}, {token: "string",regex: '"|$',next: "no_regex"}, {defaultToken: "string"}],qstring: [{token: "constant.language.escape",regex: o}, {token: "string",regex: "\\\\$",next: "qstring"}, {token: "string",regex: "'|$",next: "no_regex"}, {defaultToken: "string"}]}, this.embedRules(n, "doc-", [n.getEndRule("no_regex")])
    };
    i.inherits(r, o), t.JavaScriptHighlightRules = r
}), define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text_highlight_rules").TextHighlightRules, o = function() {
        this.$rules = {start: [{token: "comment.doc.tag",regex: "@[\\w\\d_]+"}, {token: "comment.doc.tag",regex: "\\bTODO\\b"}, {defaultToken: "comment.doc"}]}
    };
    i.inherits(o, n), o.getStartRule = function(e) {
        return {token: "comment.doc",regex: "\\/\\*(?=\\*)",next: e}
    }, o.getEndRule = function(e) {
        return {token: "comment.doc",regex: "\\*\\/",next: e}
    }, t.DocCommentHighlightRules = o
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t) {
    var i = e("../range").Range, n = function() {
    };
    (function() {
        this.checkOutdent = function(e, t) {
            return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t), o = n.match(/^(\s*\})/);
            if (!o)
                return 0;
            var r = o[1].length, s = e.findMatchingBracket({row: t,column: r});
            if (!s || s.row == t)
                return 0;
            var a = this.$getIndent(e.getLine(s.row));
            e.replace(new i(t, 0, t, r - 1), a)
        }, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0]
        }
    }).call(n.prototype), t.MatchingBraceOutdent = n
}), define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t) {
    var i = e("../../lib/oop"), n = e("../behaviour").Behaviour, o = e("../../token_iterator").TokenIterator, r = e("../../lib/lang"), s = ["text", "paren.rparen", "punctuation.operator"], a = ["text", "paren.rparen", "punctuation.operator", "comment"], l = 0, c = -1, h = "", d = 0, u = -1, p = "", g = "", m = function() {
        m.isSaneInsertion = function(e, t) {
            var i = e.getCursorPosition(), n = new o(t, i.row, i.column);
            if (!this.$matchTokenType(n.getCurrentToken() || "text", s)) {
                var r = new o(t, i.row, i.column + 1);
                if (!this.$matchTokenType(r.getCurrentToken() || "text", s))
                    return !1
            }
            return n.stepForward(), n.getCurrentTokenRow() !== i.row || this.$matchTokenType(n.getCurrentToken() || "text", a)
        }, m.$matchTokenType = function(e, t) {
            return t.indexOf(e.type || e) > -1
        }, m.recordAutoInsert = function(e, t, i) {
            var n = e.getCursorPosition(), o = t.doc.getLine(n.row);
            this.isAutoInsertedClosing(n, o, h[0]) || (l = 0), c = n.row, h = i + o.substr(n.column), l++
        }, m.recordMaybeInsert = function(e, t, i) {
            var n = e.getCursorPosition(), o = t.doc.getLine(n.row);
            this.isMaybeInsertedClosing(n, o) || (d = 0), u = n.row, p = o.substr(0, n.column) + i, g = o.substr(n.column), d++
        }, m.isAutoInsertedClosing = function(e, t, i) {
            return l > 0 && e.row === c && i === h[0] && t.substr(e.column) === h
        }, m.isMaybeInsertedClosing = function(e, t) {
            return d > 0 && e.row === u && t.substr(e.column) === g && t.substr(0, e.column) == p
        }, m.popAutoInsertedClosing = function() {
            h = h.substr(1), l--
        }, m.clearMaybeInsertedClosing = function() {
            d = 0, u = -1
        }, this.add("braces", "insertion", function(e, t, i, n, o) {
            var s = i.getCursorPosition(), a = n.doc.getLine(s.row);
            if ("{" == o) {
                var l = i.getSelectionRange(), c = n.doc.getTextRange(l);
                if ("" !== c && "{" !== c && i.getWrapBehavioursEnabled())
                    return {text: "{" + c + "}",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return /[\]\}\)]/.test(a[s.column]) ? (m.recordAutoInsert(i, n, "}"), {text: "{}",selection: [1, 1]}) : (m.recordMaybeInsert(i, n, "{"), {text: "{",selection: [1, 1]})
            } else if ("}" == o) {
                var h = a.substring(s.column, s.column + 1);
                if ("}" == h) {
                    var u = n.$findOpeningBracket("}", {column: s.column + 1,row: s.row});
                    if (null !== u && m.isAutoInsertedClosing(s, a, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            } else if ("\n" == o || "\r\n" == o) {
                var p = "";
                m.isMaybeInsertedClosing(s, a) && (p = r.stringRepeat("}", d), m.clearMaybeInsertedClosing());
                var h = a.substring(s.column, s.column + 1);
                if ("}" == h || "" !== p) {
                    var g = n.findMatchingBracket({row: s.row,column: s.column}, "}");
                    if (!g)
                        return null;
                    var f = this.getNextLineIndent(e, a.substring(0, s.column), n.getTabString()), v = this.$getIndent(a);
                    return {text: "\n" + f + "\n" + v + p,selection: [1, f.length, 1, f.length]}
                }
            }
        }), this.add("braces", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "{" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.end.column, o.end.column + 1);
                if ("}" == a)
                    return o.end.column++, o;
                d--
            }
        }), this.add("parens", "insertion", function(e, t, i, n, o) {
            if ("(" == o) {
                var r = i.getSelectionRange(), s = n.doc.getTextRange(r);
                if ("" !== s && i.getWrapBehavioursEnabled())
                    return {text: "(" + s + ")",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return m.recordAutoInsert(i, n, ")"), {text: "()",selection: [1, 1]}
            } else if (")" == o) {
                var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                if (")" == c) {
                    var h = n.$findOpeningBracket(")", {column: a.column + 1,row: a.row});
                    if (null !== h && m.isAutoInsertedClosing(a, l, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            }
        }), this.add("parens", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "(" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if (")" == a)
                    return o.end.column++, o
            }
        }), this.add("brackets", "insertion", function(e, t, i, n, o) {
            if ("[" == o) {
                var r = i.getSelectionRange(), s = n.doc.getTextRange(r);
                if ("" !== s && i.getWrapBehavioursEnabled())
                    return {text: "[" + s + "]",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return m.recordAutoInsert(i, n, "]"), {text: "[]",selection: [1, 1]}
            } else if ("]" == o) {
                var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                if ("]" == c) {
                    var h = n.$findOpeningBracket("]", {column: a.column + 1,row: a.row});
                    if (null !== h && m.isAutoInsertedClosing(a, l, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            }
        }), this.add("brackets", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "[" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if ("]" == a)
                    return o.end.column++, o
            }
        }), this.add("string_dquotes", "insertion", function(e, t, i, n, o) {
            if ('"' == o || "'" == o) {
                var r = o, s = i.getSelectionRange(), a = n.doc.getTextRange(s);
                if ("" !== a && "'" !== a && '"' != a && i.getWrapBehavioursEnabled())
                    return {text: r + a + r,selection: !1};
                var l = i.getCursorPosition(), c = n.doc.getLine(l.row), h = c.substring(l.column - 1, l.column);
                if ("\\" == h)
                    return null;
                for (var d, u = n.getTokens(s.start.row), p = 0, g = -1, f = 0; f < u.length && (d = u[f], "string" == d.type ? g = -1 : 0 > g && (g = d.value.indexOf(r)), !(d.value.length + p > s.start.column)); f++)
                    p += u[f].value.length;
                if (!d || 0 > g && "comment" !== d.type && ("string" !== d.type || s.start.column !== d.value.length + p - 1 && d.value.lastIndexOf(r) === d.value.length - 1)) {
                    if (!m.isSaneInsertion(i, n))
                        return;
                    return {text: r + r,selection: [1, 1]}
                }
                if (d && "string" === d.type) {
                    var v = c.substring(l.column, l.column + 1);
                    if (v == r)
                        return {text: "",selection: [1, 1]}
                }
            }
        }), this.add("string_dquotes", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && ('"' == r || "'" == r)) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if (a == r)
                    return o.end.column++, o
            }
        })
    };
    i.inherits(m, n), t.CstyleBehaviour = m
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t) {
    var i = e("../../lib/oop"), n = (e("../../range").Range, e("./fold_mode").FoldMode), o = t.FoldMode = function(e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
    };
    i.inherits(o, n), function() {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function(e, t, i) {
            var n = e.getLine(i), o = n.match(this.foldingStartMarker);
            if (o) {
                var r = o.index;
                return o[1] ? this.openingBracketBlock(e, o[1], i, r) : e.getCommentFoldRange(i, r + o[0].length, 1)
            }
            if ("markbeginend" === t) {
                var o = n.match(this.foldingStopMarker);
                if (o) {
                    var r = o.index + o[0].length;
                    return o[1] ? this.closingBracketBlock(e, o[1], i, r) : e.getCommentFoldRange(i, r, -1)
                }
            }
        }
    }.call(o.prototype)
}), define("ace/mode/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript", "ace/mode/css", "ace/tokenizer", "ace/mode/html_highlight_rules", "ace/mode/behaviour/html", "ace/mode/folding/html"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text").Mode, o = e("./javascript").Mode, r = e("./css").Mode, s = e("../tokenizer").Tokenizer, a = e("./html_highlight_rules").HtmlHighlightRules, l = e("./behaviour/html").HtmlBehaviour, c = e("./folding/html").FoldMode, h = function() {
        var e = new a;
        this.$tokenizer = new s(e.getRules()), this.$behaviour = new l, this.$embeds = e.getEmbeds(), this.createModeDelegates({"js-": o,"css-": r}), this.foldingRules = new c
    };
    i.inherits(h, n), function() {
        this.blockComment = {start: "<!--",end: "-->"}, this.getNextLineIndent = function(e, t) {
            return this.$getIndent(t)
        }, this.checkOutdent = function() {
            return !1
        }
    }.call(h.prototype), t.Mode = h
}), define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text").Mode, o = e("../tokenizer").Tokenizer, r = e("./javascript_highlight_rules").JavaScriptHighlightRules, s = e("./matching_brace_outdent").MatchingBraceOutdent, a = (e("../range").Range, e("../worker/worker_client").WorkerClient), l = e("./behaviour/cstyle").CstyleBehaviour, c = e("./folding/cstyle").FoldMode, h = function() {
        this.$tokenizer = new o((new r).getRules()), this.$outdent = new s, this.$behaviour = new l, this.foldingRules = new c
    };
    i.inherits(h, n), function() {
        this.lineCommentStart = "//", this.blockComment = {start: "/*",end: "*/"}, this.getNextLineIndent = function(e, t, i) {
            var n = this.$getIndent(t), o = this.$tokenizer.getLineTokens(t, e), r = o.tokens, s = o.state;
            if (r.length && "comment" == r[r.length - 1].type)
                return n;
            if ("start" == e || "no_regex" == e) {
                var a = t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
                a && (n += i)
            } else if ("doc-start" == e) {
                if ("start" == s || "no_regex" == s)
                    return "";
                var a = t.match(/^\s*(\/?)\*/);
                a && (a[1] && (n += " "), n += "* ")
            }
            return n
        }, this.checkOutdent = function(e, t, i) {
            return this.$outdent.checkOutdent(t, i)
        }, this.autoOutdent = function(e, t, i) {
            this.$outdent.autoOutdent(t, i)
        }, this.createWorker = function(e) {
            var t = new a(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return t.attachToDocument(e.getDocument()), t.on("jslint", function(t) {
                e.setAnnotations(t.data)
            }), t.on("terminate", function() {
                e.clearAnnotations()
            }), t
        }
    }.call(h.prototype), t.Mode = h
}), define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("./doc_comment_highlight_rules").DocCommentHighlightRules, o = e("./text_highlight_rules").TextHighlightRules, r = function() {
        var e = this.createKeywordMapper({"variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword: "const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type": "const|let|var|function","constant.language": "null|Infinity|NaN|undefined","support.function": "alert","constant.language.boolean": "true|false"}, "identifier"), t = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void", i = "[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*\\b", o = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
        this.$rules = {no_regex: [{token: "comment",regex: /\/\/.*$/}, n.getStartRule("doc-start"), {token: "comment",regex: /\/\*/,next: "comment"}, {token: "string",regex: "'(?=.)",next: "qstring"}, {token: "string",regex: '"(?=.)',next: "qqstring"}, {token: "constant.numeric",regex: /0[xX][0-9a-fA-F]+\b/}, {token: "constant.numeric",regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/}, {token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"],regex: "(" + i + ")(\\.)(prototype)(\\.)(" + i + ")(\\s*)(=)",next: "function_arguments"}, {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],regex: "(" + i + ")(\\.)(" + i + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],regex: "(" + i + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"],regex: "(" + i + ")(\\.)(" + i + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next: "function_arguments"}, {token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"],regex: "(function)(\\s+)(" + i + ")(\\s*)(\\()",next: "function_arguments"}, {token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"],regex: "(" + i + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: ["text", "text", "storage.type", "text", "paren.lparen"],regex: "(:)(\\s*)(function)(\\s*)(\\()",next: "function_arguments"}, {token: "keyword",regex: "(?:" + t + ")\\b",next: "start"}, {token: ["punctuation.operator", "support.function"],regex: /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/}, {token: ["punctuation.operator", "support.function.dom"],regex: /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/}, {token: ["punctuation.operator", "support.constant"],regex: /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/}, {token: ["storage.type", "punctuation.operator", "support.function.firebug"],regex: /(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/}, {token: e,regex: i}, {token: "keyword.operator",regex: /--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,next: "start"}, {token: "punctuation.operator",regex: /\?|\:|\,|\;|\./,next: "start"}, {token: "paren.lparen",regex: /[\[({]/,next: "start"}, {token: "paren.rparen",regex: /[\])}]/}, {token: "keyword.operator",regex: /\/=?/,next: "start"}, {token: "comment",regex: /^#!.*$/}],start: [n.getStartRule("doc-start"), {token: "comment",regex: "\\/\\*",next: "comment_regex_allowed"}, {token: "comment",regex: "\\/\\/.*$",next: "start"}, {token: "string.regexp",regex: "\\/",next: "regex"}, {token: "text",regex: "\\s+|^$",next: "start"}, {token: "empty",regex: "",next: "no_regex"}],regex: [{token: "regexp.keyword.operator",regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"}, {token: "string.regexp",regex: "/\\w*",next: "no_regex"}, {token: "invalid",regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/}, {token: "constant.language.escape",regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?]/}, {token: "constant.language.delimiter",regex: /\|/}, {token: "constant.language.escape",regex: /\[\^?/,next: "regex_character_class"}, {token: "empty",regex: "$",next: "no_regex"}, {defaultToken: "string.regexp"}],regex_character_class: [{token: "regexp.keyword.operator",regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"}, {token: "constant.language.escape",regex: "]",next: "regex"}, {token: "constant.language.escape",regex: "-"}, {token: "empty",regex: "$",next: "no_regex"}, {defaultToken: "string.regexp.charachterclass"}],function_arguments: [{token: "variable.parameter",regex: i}, {token: "punctuation.operator",regex: "[, ]+"}, {token: "punctuation.operator",regex: "$"}, {token: "empty",regex: "",next: "no_regex"}],comment_regex_allowed: [{token: "comment",regex: "\\*\\/",next: "start"}, {defaultToken: "comment"}],comment: [{token: "comment",regex: "\\*\\/",next: "no_regex"}, {defaultToken: "comment"}],qqstring: [{token: "constant.language.escape",regex: o}, {token: "string",regex: "\\\\$",next: "qqstring"}, {token: "string",regex: '"|$',next: "no_regex"}, {defaultToken: "string"}],qstring: [{token: "constant.language.escape",regex: o}, {token: "string",regex: "\\\\$",next: "qstring"}, {token: "string",regex: "'|$",next: "no_regex"}, {defaultToken: "string"}]}, this.embedRules(n, "doc-", [n.getEndRule("no_regex")])
    };
    i.inherits(r, o), t.JavaScriptHighlightRules = r
}), define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text_highlight_rules").TextHighlightRules, o = function() {
        this.$rules = {start: [{token: "comment.doc.tag",regex: "@[\\w\\d_]+"}, {token: "comment.doc.tag",regex: "\\bTODO\\b"}, {defaultToken: "comment.doc"}]}
    };
    i.inherits(o, n), o.getStartRule = function(e) {
        return {token: "comment.doc",regex: "\\/\\*(?=\\*)",next: e}
    }, o.getEndRule = function(e) {
        return {token: "comment.doc",regex: "\\*\\/",next: e}
    }, t.DocCommentHighlightRules = o
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t) {
    var i = e("../range").Range, n = function() {
    };
    (function() {
        this.checkOutdent = function(e, t) {
            return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t), o = n.match(/^(\s*\})/);
            if (!o)
                return 0;
            var r = o[1].length, s = e.findMatchingBracket({row: t,column: r});
            if (!s || s.row == t)
                return 0;
            var a = this.$getIndent(e.getLine(s.row));
            e.replace(new i(t, 0, t, r - 1), a)
        }, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0]
        }
    }).call(n.prototype), t.MatchingBraceOutdent = n
}), define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t) {
    var i = e("../../lib/oop"), n = e("../behaviour").Behaviour, o = e("../../token_iterator").TokenIterator, r = e("../../lib/lang"), s = ["text", "paren.rparen", "punctuation.operator"], a = ["text", "paren.rparen", "punctuation.operator", "comment"], l = 0, c = -1, h = "", d = 0, u = -1, p = "", g = "", m = function() {
        m.isSaneInsertion = function(e, t) {
            var i = e.getCursorPosition(), n = new o(t, i.row, i.column);
            if (!this.$matchTokenType(n.getCurrentToken() || "text", s)) {
                var r = new o(t, i.row, i.column + 1);
                if (!this.$matchTokenType(r.getCurrentToken() || "text", s))
                    return !1
            }
            return n.stepForward(), n.getCurrentTokenRow() !== i.row || this.$matchTokenType(n.getCurrentToken() || "text", a)
        }, m.$matchTokenType = function(e, t) {
            return t.indexOf(e.type || e) > -1
        }, m.recordAutoInsert = function(e, t, i) {
            var n = e.getCursorPosition(), o = t.doc.getLine(n.row);
            this.isAutoInsertedClosing(n, o, h[0]) || (l = 0), c = n.row, h = i + o.substr(n.column), l++
        }, m.recordMaybeInsert = function(e, t, i) {
            var n = e.getCursorPosition(), o = t.doc.getLine(n.row);
            this.isMaybeInsertedClosing(n, o) || (d = 0), u = n.row, p = o.substr(0, n.column) + i, g = o.substr(n.column), d++
        }, m.isAutoInsertedClosing = function(e, t, i) {
            return l > 0 && e.row === c && i === h[0] && t.substr(e.column) === h
        }, m.isMaybeInsertedClosing = function(e, t) {
            return d > 0 && e.row === u && t.substr(e.column) === g && t.substr(0, e.column) == p
        }, m.popAutoInsertedClosing = function() {
            h = h.substr(1), l--
        }, m.clearMaybeInsertedClosing = function() {
            d = 0, u = -1
        }, this.add("braces", "insertion", function(e, t, i, n, o) {
            var s = i.getCursorPosition(), a = n.doc.getLine(s.row);
            if ("{" == o) {
                var l = i.getSelectionRange(), c = n.doc.getTextRange(l);
                if ("" !== c && "{" !== c && i.getWrapBehavioursEnabled())
                    return {text: "{" + c + "}",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return /[\]\}\)]/.test(a[s.column]) ? (m.recordAutoInsert(i, n, "}"), {text: "{}",selection: [1, 1]}) : (m.recordMaybeInsert(i, n, "{"), {text: "{",selection: [1, 1]})
            } else if ("}" == o) {
                var h = a.substring(s.column, s.column + 1);
                if ("}" == h) {
                    var u = n.$findOpeningBracket("}", {column: s.column + 1,row: s.row});
                    if (null !== u && m.isAutoInsertedClosing(s, a, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            } else if ("\n" == o || "\r\n" == o) {
                var p = "";
                m.isMaybeInsertedClosing(s, a) && (p = r.stringRepeat("}", d), m.clearMaybeInsertedClosing());
                var h = a.substring(s.column, s.column + 1);
                if ("}" == h || "" !== p) {
                    var g = n.findMatchingBracket({row: s.row,column: s.column}, "}");
                    if (!g)
                        return null;
                    var f = this.getNextLineIndent(e, a.substring(0, s.column), n.getTabString()), v = this.$getIndent(a);
                    return {text: "\n" + f + "\n" + v + p,selection: [1, f.length, 1, f.length]}
                }
            }
        }), this.add("braces", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "{" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.end.column, o.end.column + 1);
                if ("}" == a)
                    return o.end.column++, o;
                d--
            }
        }), this.add("parens", "insertion", function(e, t, i, n, o) {
            if ("(" == o) {
                var r = i.getSelectionRange(), s = n.doc.getTextRange(r);
                if ("" !== s && i.getWrapBehavioursEnabled())
                    return {text: "(" + s + ")",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return m.recordAutoInsert(i, n, ")"), {text: "()",selection: [1, 1]}
            } else if (")" == o) {
                var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                if (")" == c) {
                    var h = n.$findOpeningBracket(")", {column: a.column + 1,row: a.row});
                    if (null !== h && m.isAutoInsertedClosing(a, l, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            }
        }), this.add("parens", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "(" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if (")" == a)
                    return o.end.column++, o
            }
        }), this.add("brackets", "insertion", function(e, t, i, n, o) {
            if ("[" == o) {
                var r = i.getSelectionRange(), s = n.doc.getTextRange(r);
                if ("" !== s && i.getWrapBehavioursEnabled())
                    return {text: "[" + s + "]",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return m.recordAutoInsert(i, n, "]"), {text: "[]",selection: [1, 1]}
            } else if ("]" == o) {
                var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                if ("]" == c) {
                    var h = n.$findOpeningBracket("]", {column: a.column + 1,row: a.row});
                    if (null !== h && m.isAutoInsertedClosing(a, l, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            }
        }), this.add("brackets", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "[" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if ("]" == a)
                    return o.end.column++, o
            }
        }), this.add("string_dquotes", "insertion", function(e, t, i, n, o) {
            if ('"' == o || "'" == o) {
                var r = o, s = i.getSelectionRange(), a = n.doc.getTextRange(s);
                if ("" !== a && "'" !== a && '"' != a && i.getWrapBehavioursEnabled())
                    return {text: r + a + r,selection: !1};
                var l = i.getCursorPosition(), c = n.doc.getLine(l.row), h = c.substring(l.column - 1, l.column);
                if ("\\" == h)
                    return null;
                for (var d, u = n.getTokens(s.start.row), p = 0, g = -1, f = 0; f < u.length && (d = u[f], "string" == d.type ? g = -1 : 0 > g && (g = d.value.indexOf(r)), !(d.value.length + p > s.start.column)); f++)
                    p += u[f].value.length;
                if (!d || 0 > g && "comment" !== d.type && ("string" !== d.type || s.start.column !== d.value.length + p - 1 && d.value.lastIndexOf(r) === d.value.length - 1)) {
                    if (!m.isSaneInsertion(i, n))
                        return;
                    return {text: r + r,selection: [1, 1]}
                }
                if (d && "string" === d.type) {
                    var v = c.substring(l.column, l.column + 1);
                    if (v == r)
                        return {text: "",selection: [1, 1]}
                }
            }
        }), this.add("string_dquotes", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && ('"' == r || "'" == r)) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if (a == r)
                    return o.end.column++, o
            }
        })
    };
    i.inherits(m, n), t.CstyleBehaviour = m
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t) {
    var i = e("../../lib/oop"), n = (e("../../range").Range, e("./fold_mode").FoldMode), o = t.FoldMode = function(e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
    };
    i.inherits(o, n), function() {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function(e, t, i) {
            var n = e.getLine(i), o = n.match(this.foldingStartMarker);
            if (o) {
                var r = o.index;
                return o[1] ? this.openingBracketBlock(e, o[1], i, r) : e.getCommentFoldRange(i, r + o[0].length, 1)
            }
            if ("markbeginend" === t) {
                var o = n.match(this.foldingStopMarker);
                if (o) {
                    var r = o.index + o[0].length;
                    return o[1] ? this.closingBracketBlock(e, o[1], i, r) : e.getCommentFoldRange(i, r, -1)
                }
            }
        }
    }.call(o.prototype)
}), define("ace/mode/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/css_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text").Mode, o = e("../tokenizer").Tokenizer, r = e("./css_highlight_rules").CssHighlightRules, s = e("./matching_brace_outdent").MatchingBraceOutdent, a = e("../worker/worker_client").WorkerClient, l = e("./behaviour/css").CssBehaviour, c = e("./folding/cstyle").FoldMode, h = function() {
        this.$tokenizer = new o((new r).getRules()), this.$outdent = new s, this.$behaviour = new l, this.foldingRules = new c
    };
    i.inherits(h, n), function() {
        this.foldingRules = "cStyle", this.blockComment = {start: "/*",end: "*/"}, this.getNextLineIndent = function(e, t, i) {
            var n = this.$getIndent(t), o = this.$tokenizer.getLineTokens(t, e).tokens;
            if (o.length && "comment" == o[o.length - 1].type)
                return n;
            var r = t.match(/^.*\{\s*$/);
            return r && (n += i), n
        }, this.checkOutdent = function(e, t, i) {
            return this.$outdent.checkOutdent(t, i)
        }, this.autoOutdent = function(e, t, i) {
            this.$outdent.autoOutdent(t, i)
        }, this.createWorker = function(e) {
            var t = new a(["ace"], "ace/mode/css_worker", "Worker");
            return t.attachToDocument(e.getDocument()), t.on("csslint", function(t) {
                e.setAnnotations(t.data)
            }), t.on("terminate", function() {
                e.clearAnnotations()
            }), t
        }
    }.call(h.prototype), t.Mode = h
}), define("ace/mode/css_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("../lib/lang"), o = e("./text_highlight_rules").TextHighlightRules, r = t.supportType = "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index", s = t.supportFunction = "rgb|rgba|url|attr|counter|counters", a = t.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero", l = t.supportConstantColor = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow", c = t.supportConstantFonts = "arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace", h = t.numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))", d = t.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b", u = t.pseudoClasses = "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b", p = function() {
        var e = this.createKeywordMapper({"support.function": s,"support.constant": a,"support.type": r,"support.constant.color": l,"support.constant.fonts": c}, "text", !0), t = [{token: "comment",regex: "\\/\\*",next: "ruleset_comment"}, {token: "string",regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'}, {token: "string",regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"}, {token: ["constant.numeric", "keyword"],regex: "(" + h + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"}, {token: "constant.numeric",regex: h}, {token: "constant.numeric",regex: "#[a-f0-9]{6}"}, {token: "constant.numeric",regex: "#[a-f0-9]{3}"}, {token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"],regex: d}, {token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"],regex: u}, {token: ["support.function", "string", "support.function"],regex: "(url\\()(.*)(\\))"}, {token: e,regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}, {caseInsensitive: !0}], i = n.copyArray(t);
        i.unshift({token: "paren.rparen",regex: "\\}",next: "start"});
        var o = n.copyArray(t);
        o.unshift({token: "paren.rparen",regex: "\\}",next: "media"});
        var p = [{token: "comment",regex: ".+"}], g = n.copyArray(p);
        g.unshift({token: "comment",regex: ".*?\\*\\/",next: "start"});
        var m = n.copyArray(p);
        m.unshift({token: "comment",regex: ".*?\\*\\/",next: "media"});
        var f = n.copyArray(p);
        f.unshift({token: "comment",regex: ".*?\\*\\/",next: "ruleset"}), this.$rules = {start: [{token: "comment",regex: "\\/\\*",next: "comment"}, {token: "paren.lparen",regex: "\\{",next: "ruleset"}, {token: "string",regex: "@.*?{",next: "media"}, {token: "keyword",regex: "#[a-z0-9-_]+"}, {token: "variable",regex: "\\.[a-z0-9-_]+"}, {token: "string",regex: ":[a-z0-9-_]+"}, {token: "constant",regex: "[a-z0-9-_]+"}, {caseInsensitive: !0}],media: [{token: "comment",regex: "\\/\\*",next: "media_comment"}, {token: "paren.lparen",regex: "\\{",next: "media_ruleset"}, {token: "string",regex: "\\}",next: "start"}, {token: "keyword",regex: "#[a-z0-9-_]+"}, {token: "variable",regex: "\\.[a-z0-9-_]+"}, {token: "string",regex: ":[a-z0-9-_]+"}, {token: "constant",regex: "[a-z0-9-_]+"}, {caseInsensitive: !0}],comment: g,ruleset: i,ruleset_comment: f,media_ruleset: o,media_comment: m}
    };
    i.inherits(p, o), t.CssHighlightRules = p
}), define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
    var i = e("../../lib/oop"), n = (e("../behaviour").Behaviour, e("./cstyle").CstyleBehaviour), o = e("../../token_iterator").TokenIterator, r = function() {
        this.inherit(n), this.add("colon", "insertion", function(e, t, i, n, r) {
            if (":" === r) {
                var s = i.getCursorPosition(), a = new o(n, s.row, s.column), l = a.getCurrentToken();
                if (l && l.value.match(/\s+/) && (l = a.stepBackward()), l && "support.type" === l.type) {
                    var c = n.doc.getLine(s.row), h = c.substring(s.column, s.column + 1);
                    if (":" === h)
                        return {text: "",selection: [1, 1]};
                    if (!c.substring(s.column).match(/^\s*;/))
                        return {text: ":;",selection: [1, 1]}
                }
            }
        }), this.add("colon", "deletion", function(e, t, i, n, r) {
            var s = n.doc.getTextRange(r);
            if (!r.isMultiLine() && ":" === s) {
                var a = i.getCursorPosition(), l = new o(n, a.row, a.column), c = l.getCurrentToken();
                if (c && c.value.match(/\s+/) && (c = l.stepBackward()), c && "support.type" === c.type) {
                    var h = n.doc.getLine(r.start.row), d = h.substring(r.end.column, r.end.column + 1);
                    if (";" === d)
                        return r.end.column++, r
                }
            }
        }), this.add("semicolon", "insertion", function(e, t, i, n, o) {
            if (";" === o) {
                var r = i.getCursorPosition(), s = n.doc.getLine(r.row), a = s.substring(r.column, r.column + 1);
                if (";" === a)
                    return {text: "",selection: [1, 1]}
            }
        })
    };
    i.inherits(r, n), t.CssBehaviour = r
}), define("ace/mode/html_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/css_highlight_rules", "ace/mode/javascript_highlight_rules", "ace/mode/xml_util", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("../lib/lang"), o = e("./css_highlight_rules").CssHighlightRules, r = e("./javascript_highlight_rules").JavaScriptHighlightRules, s = e("./xml_util"), a = e("./text_highlight_rules").TextHighlightRules, l = n.createMap({a: "anchor",button: "form",form: "form",img: "image",input: "form",label: "form",script: "script",select: "form",textarea: "form",style: "style",table: "table",tbody: "table",td: "table",tfoot: "table",th: "table",tr: "table"}), c = function() {
        this.$rules = {start: [{token: "text",regex: "<\\!\\[CDATA\\[",next: "cdata"}, {token: "xml-pe",regex: "<\\?.*?\\?>"}, {token: "comment",regex: "<\\!--",next: "comment"}, {token: "xml-pe",regex: "<\\!.*?>"}, {token: "meta.tag",regex: "<(?=script\\b)",next: "script"}, {token: "meta.tag",regex: "<(?=style\\b)",next: "style"}, {token: "meta.tag",regex: "<\\/?",next: "tag"}, {token: "text",regex: "\\s+"}, {token: "constant.character.entity",regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],cdata: [{token: "text",regex: "\\]\\]>",next: "start"}],comment: [{token: "comment",regex: ".*?-->",next: "start"}, {defaultToken: "comment"}]}, s.tag(this.$rules, "tag", "start", l), s.tag(this.$rules, "style", "css-start", l), s.tag(this.$rules, "script", "js-start", l), this.embedRules(r, "js-", [{token: "comment",regex: "\\/\\/.*(?=<\\/script>)",next: "tag"}, {token: "meta.tag",regex: "<\\/(?=script)",next: "tag"}]), this.embedRules(o, "css-", [{token: "meta.tag",regex: "<\\/(?=style)",next: "tag"}])
    };
    i.inherits(c, a), t.HtmlHighlightRules = c
}), define("ace/mode/xml_util", ["require", "exports", "module"], function(e, t) {
    function i(e) {
        return [{token: "string",regex: '"',next: e + "_qqstring"}, {token: "string",regex: "'",next: e + "_qstring"}]
    }
    function n(e, t) {
        return [{token: "string",regex: e,next: t}, {token: "constant.language.escape",regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}, {defaultToken: "string"}]
    }
    t.tag = function(e, t, o, r) {
        e[t] = [{token: "text",regex: "\\s+"}, {token: r ? function(e) {
                    return r[e] ? "meta.tag.tag-name." + r[e] : "meta.tag.tag-name"
                } : "meta.tag.tag-name",regex: "[-_a-zA-Z0-9:]+",next: t + "_embed_attribute_list"}, {token: "empty",regex: "",next: t + "_embed_attribute_list"}], e[t + "_qstring"] = n("'", t + "_embed_attribute_list"), e[t + "_qqstring"] = n('"', t + "_embed_attribute_list"), e[t + "_embed_attribute_list"] = [{token: "meta.tag.r",regex: "/?>",next: o}, {token: "keyword.operator",regex: "="}, {token: "entity.other.attribute-name",regex: "[-_a-zA-Z0-9:]+"}, {token: "constant.numeric",regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"}, {token: "text",regex: "\\s+"}].concat(i(t))
    }
}), define("ace/mode/behaviour/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour/xml", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
    function i(e, t) {
        var i = !0, n = e.type.split("."), o = t.split(".");
        return o.forEach(function(e) {
            return -1 == n.indexOf(e) ? (i = !1, !1) : void 0
        }), i
    }
    var n = e("../../lib/oop"), o = e("../behaviour/xml").XmlBehaviour, r = (e("./cstyle").CstyleBehaviour, e("../../token_iterator").TokenIterator), s = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"], a = function() {
        this.inherit(o), this.add("autoclosing", "insertion", function(e, t, n, o, a) {
            if (">" == a) {
                var l = n.getCursorPosition(), c = new r(o, l.row, l.column), h = c.getCurrentToken(), d = !1;
                if (h && (i(h, "meta.tag") || i(h, "text") && h.value.match("/")))
                    d = !0;
                else
                    do
                        h = c.stepBackward();
                    while (h && (i(h, "string") || i(h, "keyword.operator") || i(h, "entity.attribute-name") || i(h, "text")));
                if (!h || !i(h, "meta.tag-name") || c.stepBackward().value.match("/"))
                    return;
                var u = h.value;
                if (d)
                    var u = u.substring(0, l.column - h.start);
                if (-1 !== s.indexOf(u))
                    return;
                return {text: "></" + u + ">",selection: [1, 1]}
            }
        })
    };
    n.inherits(a, o), t.HtmlBehaviour = a
}), define("ace/mode/behaviour/xml", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
    function i(e, t) {
        var i = !0, n = e.type.split("."), o = t.split(".");
        return o.forEach(function(e) {
            return -1 == n.indexOf(e) ? (i = !1, !1) : void 0
        }), i
    }
    var n = e("../../lib/oop"), o = e("../behaviour").Behaviour, r = e("./cstyle").CstyleBehaviour, s = e("../../token_iterator").TokenIterator, a = function() {
        this.inherit(r, ["string_dquotes"]), this.add("autoclosing", "insertion", function(e, t, n, o, r) {
            if (">" == r) {
                var a = n.getCursorPosition(), l = new s(o, a.row, a.column), c = l.getCurrentToken(), h = !1;
                if (c && (i(c, "meta.tag") || i(c, "text") && c.value.match("/")))
                    h = !0;
                else
                    do
                        c = l.stepBackward();
                    while (c && (i(c, "string") || i(c, "keyword.operator") || i(c, "entity.attribute-name") || i(c, "text")));
                if (!c || !i(c, "meta.tag-name") || l.stepBackward().value.match("/"))
                    return;
                var d = c.value;
                if (h)
                    var d = d.substring(0, a.column - c.start);
                return {text: "></" + d + ">",selection: [1, 1]}
            }
        }), this.add("autoindent", "insertion", function(e, t, i, n, o) {
            if ("\n" == o) {
                var r = i.getCursorPosition(), s = n.doc.getLine(r.row), a = s.substring(r.column, r.column + 2);
                if ("</" == a) {
                    var l = this.$getIndent(n.doc.getLine(r.row)) + n.getTabString(), c = this.$getIndent(n.doc.getLine(r.row));
                    return {text: "\n" + l + "\n" + c,selection: [1, l.length, 1, l.length]}
                }
            }
        })
    };
    n.inherits(a, o), t.XmlBehaviour = a
}), define("ace/mode/folding/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/mixed", "ace/mode/folding/xml", "ace/mode/folding/cstyle"], function(e, t) {
    var i = e("../../lib/oop"), n = e("./mixed").FoldMode, o = e("./xml").FoldMode, r = e("./cstyle").FoldMode, s = t.FoldMode = function() {
        n.call(this, new o({area: 1,base: 1,br: 1,col: 1,command: 1,embed: 1,hr: 1,img: 1,input: 1,keygen: 1,link: 1,meta: 1,param: 1,source: 1,track: 1,wbr: 1,li: 1,dt: 1,dd: 1,p: 1,rt: 1,rp: 1,optgroup: 1,option: 1,colgroup: 1,td: 1,th: 1}), {"js-": new r,"css-": new r})
    };
    i.inherits(s, n)
}), define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function(e, t) {
    var i = e("../../lib/oop"), n = e("./fold_mode").FoldMode, o = t.FoldMode = function(e, t) {
        this.defaultMode = e, this.subModes = t
    };
    i.inherits(o, n), function() {
        this.$getMode = function(e) {
            for (var t in this.subModes)
                if (0 === e.indexOf(t))
                    return this.subModes[t];
            return null
        }, this.$tryMode = function(e, t, i, n) {
            var o = this.$getMode(e);
            return o ? o.getFoldWidget(t, i, n) : ""
        }, this.getFoldWidget = function(e, t, i) {
            return this.$tryMode(e.getState(i - 1), e, t, i) || this.$tryMode(e.getState(i), e, t, i) || this.defaultMode.getFoldWidget(e, t, i)
        }, this.getFoldWidgetRange = function(e, t, i) {
            var n = this.$getMode(e.getState(i - 1));
            return n && n.getFoldWidget(e, t, i) || (n = this.$getMode(e.getState(i))), n && n.getFoldWidget(e, t, i) || (n = this.defaultMode), n.getFoldWidgetRange(e, t, i)
        }
    }.call(o.prototype)
}), define("ace/mode/folding/xml", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/range", "ace/mode/folding/fold_mode", "ace/token_iterator"], function(e, t) {
    var i = e("../../lib/oop"), n = e("../../lib/lang"), o = e("../../range").Range, r = e("./fold_mode").FoldMode, s = e("../../token_iterator").TokenIterator, a = t.FoldMode = function(e) {
        r.call(this), this.voidElements = e || {}
    };
    i.inherits(a, r), function() {
        this.getFoldWidget = function(e, t, i) {
            var n = this._getFirstTagInLine(e, i);
            return n.closing ? "markbeginend" == t ? "end" : "" : !n.tagName || this.voidElements[n.tagName.toLowerCase()] ? "" : n.selfClosing ? "" : -1 !== n.value.indexOf("/" + n.tagName) ? "" : "start"
        }, this._getFirstTagInLine = function(e, t) {
            for (var i = e.getTokens(t), o = "", r = 0; r < i.length; r++) {
                var s = i[r];
                o += 0 === s.type.indexOf("meta.tag") ? s.value : n.stringRepeat(" ", s.value.length)
            }
            return this._parseTag(o)
        }, this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/, this._parseTag = function(e) {
            var t = e.match(this.tagRe), i = 0;
            return {value: e,match: t ? t[2] : "",closing: t ? !!t[3] : !1,selfClosing: t ? !!t[5] || "/>" == t[2] : !1,tagName: t ? t[4] : "",column: t[1] ? i + t[1].length : i}
        }, this._readTagForward = function(e) {
            var t = e.getCurrentToken();
            if (!t)
                return null;
            var i, n = "";
            do
                if (0 === t.type.indexOf("meta.tag")) {
                    if (!i)
                        var i = {row: e.getCurrentTokenRow(),column: e.getCurrentTokenColumn()};
                    if (n += t.value, -1 !== n.indexOf(">")) {
                        var o = this._parseTag(n);
                        return o.start = i, o.end = {row: e.getCurrentTokenRow(),column: e.getCurrentTokenColumn() + t.value.length}, e.stepForward(), o
                    }
                }
            while (t = e.stepForward());
            return null
        }, this._readTagBackward = function(e) {
            var t = e.getCurrentToken();
            if (!t)
                return null;
            var i, n = "";
            do
                if (0 === t.type.indexOf("meta.tag") && (i || (i = {row: e.getCurrentTokenRow(),column: e.getCurrentTokenColumn() + t.value.length}), n = t.value + n, -1 !== n.indexOf("<"))) {
                    var o = this._parseTag(n);
                    return o.end = i, o.start = {row: e.getCurrentTokenRow(),column: e.getCurrentTokenColumn()}, e.stepBackward(), o
                }
            while (t = e.stepBackward());
            return null
        }, this._pop = function(e, t) {
            for (; e.length; ) {
                var i = e[e.length - 1];
                if (!t || i.tagName == t.tagName)
                    return e.pop();
                if (this.voidElements[t.tagName])
                    return;
                {
                    if (!this.voidElements[i.tagName])
                        return null;
                    e.pop()
                }
            }
        }, this.getFoldWidgetRange = function(e, t, i) {
            var n = this._getFirstTagInLine(e, i);
            if (!n.match)
                return null;
            var r, a = n.closing || n.selfClosing, l = [];
            if (a) {
                for (var c = new s(e, i, n.column + n.match.length), h = {row: i,column: n.column}; r = this._readTagBackward(c); )
                    if (r.selfClosing) {
                        if (!l.length)
                            return r.start.column += r.tagName.length + 2, r.end.column -= 2, o.fromPoints(r.start, r.end)
                    } else if (r.closing)
                        l.push(r);
                    else if (this._pop(l, r), 0 == l.length)
                        return r.start.column += r.tagName.length + 2, o.fromPoints(r.start, h)
            } else
                for (var c = new s(e, i, n.column), d = {row: i,column: n.column + n.tagName.length + 2}; r = this._readTagForward(c); )
                    if (r.selfClosing) {
                        if (!l.length)
                            return r.start.column += r.tagName.length + 2, r.end.column -= 2, o.fromPoints(r.start, r.end)
                    } else if (r.closing) {
                        if (this._pop(l, r), 0 == l.length)
                            return o.fromPoints(d, r.start)
                    } else
                        l.push(r)
        }
    }.call(a.prototype)
}), define("ace/mode/less", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/less_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function(e, t) {
    var i = e("../lib/oop"), n = e("./text").Mode, o = e("../tokenizer").Tokenizer, r = e("./less_highlight_rules").LessHighlightRules, s = e("./matching_brace_outdent").MatchingBraceOutdent, a = e("./behaviour/css").CssBehaviour, l = e("./folding/cstyle").FoldMode, c = function() {
        this.$tokenizer = new o((new r).getRules()), this.$outdent = new s, this.$behaviour = new a, this.foldingRules = new l
    };
    i.inherits(c, n), function() {
        this.lineCommentStart = "//", this.blockComment = {start: "/*",end: "*/"}, this.getNextLineIndent = function(e, t, i) {
            var n = this.$getIndent(t), o = this.$tokenizer.getLineTokens(t, e).tokens;
            if (o.length && "comment" == o[o.length - 1].type)
                return n;
            var r = t.match(/^.*\{\s*$/);
            return r && (n += i), n
        }, this.checkOutdent = function(e, t, i) {
            return this.$outdent.checkOutdent(t, i)
        }, this.autoOutdent = function(e, t, i) {
            this.$outdent.autoOutdent(t, i)
        }
    }.call(c.prototype), t.Mode = c
}), define("ace/mode/less_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function(e, t) {
    var i = e("../lib/oop"), n = e("../lib/lang"), o = e("./text_highlight_rules").TextHighlightRules, r = function() {
        var e = n.arrayToMap(function() {
            for (var e = "-webkit-|-moz-|-o-|-ms-|-svg-|-pie-|-khtml-".split("|"), t = "appearance|background-clip|background-inline-policy|background-origin|background-size|binding|border-bottom-colors|border-left-colors|border-right-colors|border-top-colors|border-end|border-end-color|border-end-style|border-end-width|border-image|border-start|border-start-color|border-start-style|border-start-width|box-align|box-direction|box-flex|box-flexgroup|box-ordinal-group|box-orient|box-pack|box-sizing|column-count|column-gap|column-width|column-rule|column-rule-width|column-rule-style|column-rule-color|float-edge|font-feature-settings|font-language-override|force-broken-image-icon|image-region|margin-end|margin-start|opacity|outline|outline-color|outline-offset|outline-radius|outline-radius-bottomleft|outline-radius-bottomright|outline-radius-topleft|outline-radius-topright|outline-style|outline-width|padding-end|padding-start|stack-sizing|tab-size|text-blink|text-decoration-color|text-decoration-line|text-decoration-style|transform|transform-origin|transition|transition-delay|transition-duration|transition-property|transition-timing-function|user-focus|user-input|user-modify|user-select|window-shadow|border-radius".split("|"), i = "azimuth|background-attachment|background-color|background-image|background-position|background-repeat|background|border-bottom-color|border-bottom-style|border-bottom-width|border-bottom|border-collapse|border-color|border-left-color|border-left-style|border-left-width|border-left|border-right-color|border-right-style|border-right-width|border-right|border-spacing|border-style|border-top-color|border-top-style|border-top-width|border-top|border-width|border|bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue-after|cue-before|cue|cursor|direction|display|elevation|empty-cells|float|font-family|font-size-adjust|font-size|font-stretch|font-style|font-variant|font-weight|font|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|marker-offset|margin|marks|max-height|max-width|min-height|min-width|opacity|orphans|outline-color|outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page|pause-after|pause-before|pause|pitch-range|pitch|play-during|position|quotes|richness|right|size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|stress|table-layout|text-align|text-decoration|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index".split("|"), n = [], o = 0, r = e.length; r > o; o++)
                Array.prototype.push.apply(n, (e[o] + t.join("|" + e[o])).split("|"));
            return Array.prototype.push.apply(n, t), Array.prototype.push.apply(n, i), n
        }()), t = n.arrayToMap("hsl|hsla|rgb|rgba|url|attr|counter|counters|lighten|darken|saturate|desaturate|fadein|fadeout|fade|spin|mix|hue|saturation|lightness|alpha|round|ceil|floor|percentage|color|iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem".split("|")), i = n.arrayToMap("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|decimal-leading-zero|decimal|default|disabled|disc|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|inactive|inherit|inline-block|inline|inset|inside|inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|keep-all|left|lighter|line-edge|line-through|line|list-item|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|solid|square|static|strict|super|sw-resize|table-footer-group|table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|zero".split("|")), o = n.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")), r = n.arrayToMap("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare|when|not|and".split("|")), s = n.arrayToMap("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp".split("|")), a = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
        this.$rules = {start: [{token: "comment",regex: "\\/\\/.*$"}, {token: "comment",regex: "\\/\\*",next: "comment"}, {token: "string",regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'}, {token: "string",regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"}, {token: "constant.numeric",regex: a + "(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"}, {token: "constant.numeric",regex: "#[a-f0-9]{6}"}, {token: "constant.numeric",regex: "#[a-f0-9]{3}"}, {token: "constant.numeric",regex: a}, {token: function(e) {
                        return r.hasOwnProperty(e) ? "keyword" : "variable"
                    },regex: "@[a-z0-9_\\-@]*\\b"}, {token: function(n) {
                        return e.hasOwnProperty(n.toLowerCase()) ? "support.type" : r.hasOwnProperty(n) ? "keyword" : i.hasOwnProperty(n) ? "constant.language" : t.hasOwnProperty(n) ? "support.function" : o.hasOwnProperty(n.toLowerCase()) ? "support.constant.color" : s.hasOwnProperty(n.toLowerCase()) ? "variable.language" : "text"
                    },regex: "\\-?[@a-z_][@a-z0-9_\\-]*"}, {token: "variable.language",regex: "#[a-z0-9-_]+"}, {token: "variable.language",regex: "\\.[a-z0-9-_]+"}, {token: "variable.language",regex: ":[a-z0-9-_]+"}, {token: "constant",regex: "[a-z0-9-_]+"}, {token: "keyword.operator",regex: "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"}, {token: "paren.lparen",regex: "[[({]"}, {token: "paren.rparen",regex: "[\\])}]"}, {token: "text",regex: "\\s+"}, {caseInsensitive: !0}],comment: [{token: "comment",regex: ".*?\\*\\/",next: "start"}, {token: "comment",regex: ".+"}]}
    };
    i.inherits(r, o), t.LessHighlightRules = r
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t) {
    var i = e("../range").Range, n = function() {
    };
    (function() {
        this.checkOutdent = function(e, t) {
            return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t), o = n.match(/^(\s*\})/);
            if (!o)
                return 0;
            var r = o[1].length, s = e.findMatchingBracket({row: t,column: r});
            if (!s || s.row == t)
                return 0;
            var a = this.$getIndent(e.getLine(s.row));
            e.replace(new i(t, 0, t, r - 1), a)
        }, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0]
        }
    }).call(n.prototype), t.MatchingBraceOutdent = n
}), define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t) {
    var i = e("../../lib/oop"), n = (e("../behaviour").Behaviour, e("./cstyle").CstyleBehaviour), o = e("../../token_iterator").TokenIterator, r = function() {
        this.inherit(n), this.add("colon", "insertion", function(e, t, i, n, r) {
            if (":" === r) {
                var s = i.getCursorPosition(), a = new o(n, s.row, s.column), l = a.getCurrentToken();
                if (l && l.value.match(/\s+/) && (l = a.stepBackward()), l && "support.type" === l.type) {
                    var c = n.doc.getLine(s.row), h = c.substring(s.column, s.column + 1);
                    if (":" === h)
                        return {text: "",selection: [1, 1]};
                    if (!c.substring(s.column).match(/^\s*;/))
                        return {text: ":;",selection: [1, 1]}
                }
            }
        }), this.add("colon", "deletion", function(e, t, i, n, r) {
            var s = n.doc.getTextRange(r);
            if (!r.isMultiLine() && ":" === s) {
                var a = i.getCursorPosition(), l = new o(n, a.row, a.column), c = l.getCurrentToken();
                if (c && c.value.match(/\s+/) && (c = l.stepBackward()), c && "support.type" === c.type) {
                    var h = n.doc.getLine(r.start.row), d = h.substring(r.end.column, r.end.column + 1);
                    if (";" === d)
                        return r.end.column++, r
                }
            }
        }), this.add("semicolon", "insertion", function(e, t, i, n, o) {
            if (";" === o) {
                var r = i.getCursorPosition(), s = n.doc.getLine(r.row), a = s.substring(r.column, r.column + 1);
                if (";" === a)
                    return {text: "",selection: [1, 1]}
            }
        })
    };
    i.inherits(r, n), t.CssBehaviour = r
}), define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t) {
    var i = e("../../lib/oop"), n = e("../behaviour").Behaviour, o = e("../../token_iterator").TokenIterator, r = e("../../lib/lang"), s = ["text", "paren.rparen", "punctuation.operator"], a = ["text", "paren.rparen", "punctuation.operator", "comment"], l = 0, c = -1, h = "", d = 0, u = -1, p = "", g = "", m = function() {
        m.isSaneInsertion = function(e, t) {
            var i = e.getCursorPosition(), n = new o(t, i.row, i.column);
            if (!this.$matchTokenType(n.getCurrentToken() || "text", s)) {
                var r = new o(t, i.row, i.column + 1);
                if (!this.$matchTokenType(r.getCurrentToken() || "text", s))
                    return !1
            }
            return n.stepForward(), n.getCurrentTokenRow() !== i.row || this.$matchTokenType(n.getCurrentToken() || "text", a)
        }, m.$matchTokenType = function(e, t) {
            return t.indexOf(e.type || e) > -1
        }, m.recordAutoInsert = function(e, t, i) {
            var n = e.getCursorPosition(), o = t.doc.getLine(n.row);
            this.isAutoInsertedClosing(n, o, h[0]) || (l = 0), c = n.row, h = i + o.substr(n.column), l++
        }, m.recordMaybeInsert = function(e, t, i) {
            var n = e.getCursorPosition(), o = t.doc.getLine(n.row);
            this.isMaybeInsertedClosing(n, o) || (d = 0), u = n.row, p = o.substr(0, n.column) + i, g = o.substr(n.column), d++
        }, m.isAutoInsertedClosing = function(e, t, i) {
            return l > 0 && e.row === c && i === h[0] && t.substr(e.column) === h
        }, m.isMaybeInsertedClosing = function(e, t) {
            return d > 0 && e.row === u && t.substr(e.column) === g && t.substr(0, e.column) == p
        }, m.popAutoInsertedClosing = function() {
            h = h.substr(1), l--
        }, m.clearMaybeInsertedClosing = function() {
            d = 0, u = -1
        }, this.add("braces", "insertion", function(e, t, i, n, o) {
            var s = i.getCursorPosition(), a = n.doc.getLine(s.row);
            if ("{" == o) {
                var l = i.getSelectionRange(), c = n.doc.getTextRange(l);
                if ("" !== c && "{" !== c && i.getWrapBehavioursEnabled())
                    return {text: "{" + c + "}",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return /[\]\}\)]/.test(a[s.column]) ? (m.recordAutoInsert(i, n, "}"), {text: "{}",selection: [1, 1]}) : (m.recordMaybeInsert(i, n, "{"), {text: "{",selection: [1, 1]})
            } else if ("}" == o) {
                var h = a.substring(s.column, s.column + 1);
                if ("}" == h) {
                    var u = n.$findOpeningBracket("}", {column: s.column + 1,row: s.row});
                    if (null !== u && m.isAutoInsertedClosing(s, a, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            } else if ("\n" == o || "\r\n" == o) {
                var p = "";
                m.isMaybeInsertedClosing(s, a) && (p = r.stringRepeat("}", d), m.clearMaybeInsertedClosing());
                var h = a.substring(s.column, s.column + 1);
                if ("}" == h || "" !== p) {
                    var g = n.findMatchingBracket({row: s.row,column: s.column}, "}");
                    if (!g)
                        return null;
                    var f = this.getNextLineIndent(e, a.substring(0, s.column), n.getTabString()), v = this.$getIndent(a);
                    return {text: "\n" + f + "\n" + v + p,selection: [1, f.length, 1, f.length]}
                }
            }
        }), this.add("braces", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "{" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.end.column, o.end.column + 1);
                if ("}" == a)
                    return o.end.column++, o;
                d--
            }
        }), this.add("parens", "insertion", function(e, t, i, n, o) {
            if ("(" == o) {
                var r = i.getSelectionRange(), s = n.doc.getTextRange(r);
                if ("" !== s && i.getWrapBehavioursEnabled())
                    return {text: "(" + s + ")",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return m.recordAutoInsert(i, n, ")"), {text: "()",selection: [1, 1]}
            } else if (")" == o) {
                var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                if (")" == c) {
                    var h = n.$findOpeningBracket(")", {column: a.column + 1,row: a.row});
                    if (null !== h && m.isAutoInsertedClosing(a, l, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            }
        }), this.add("parens", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "(" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if (")" == a)
                    return o.end.column++, o
            }
        }), this.add("brackets", "insertion", function(e, t, i, n, o) {
            if ("[" == o) {
                var r = i.getSelectionRange(), s = n.doc.getTextRange(r);
                if ("" !== s && i.getWrapBehavioursEnabled())
                    return {text: "[" + s + "]",selection: !1};
                if (m.isSaneInsertion(i, n))
                    return m.recordAutoInsert(i, n, "]"), {text: "[]",selection: [1, 1]}
            } else if ("]" == o) {
                var a = i.getCursorPosition(), l = n.doc.getLine(a.row), c = l.substring(a.column, a.column + 1);
                if ("]" == c) {
                    var h = n.$findOpeningBracket("]", {column: a.column + 1,row: a.row});
                    if (null !== h && m.isAutoInsertedClosing(a, l, o))
                        return m.popAutoInsertedClosing(), {text: "",selection: [1, 1]}
                }
            }
        }), this.add("brackets", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && "[" == r) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if ("]" == a)
                    return o.end.column++, o
            }
        }), this.add("string_dquotes", "insertion", function(e, t, i, n, o) {
            if ('"' == o || "'" == o) {
                var r = o, s = i.getSelectionRange(), a = n.doc.getTextRange(s);
                if ("" !== a && "'" !== a && '"' != a && i.getWrapBehavioursEnabled())
                    return {text: r + a + r,selection: !1};
                var l = i.getCursorPosition(), c = n.doc.getLine(l.row), h = c.substring(l.column - 1, l.column);
                if ("\\" == h)
                    return null;
                for (var d, u = n.getTokens(s.start.row), p = 0, g = -1, f = 0; f < u.length && (d = u[f], "string" == d.type ? g = -1 : 0 > g && (g = d.value.indexOf(r)), !(d.value.length + p > s.start.column)); f++)
                    p += u[f].value.length;
                if (!d || 0 > g && "comment" !== d.type && ("string" !== d.type || s.start.column !== d.value.length + p - 1 && d.value.lastIndexOf(r) === d.value.length - 1)) {
                    if (!m.isSaneInsertion(i, n))
                        return;
                    return {text: r + r,selection: [1, 1]}
                }
                if (d && "string" === d.type) {
                    var v = c.substring(l.column, l.column + 1);
                    if (v == r)
                        return {text: "",selection: [1, 1]}
                }
            }
        }), this.add("string_dquotes", "deletion", function(e, t, i, n, o) {
            var r = n.doc.getTextRange(o);
            if (!o.isMultiLine() && ('"' == r || "'" == r)) {
                var s = n.doc.getLine(o.start.row), a = s.substring(o.start.column + 1, o.start.column + 2);
                if (a == r)
                    return o.end.column++, o
            }
        })
    };
    i.inherits(m, n), t.CstyleBehaviour = m
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t) {
    var i = e("../../lib/oop"), n = (e("../../range").Range, e("./fold_mode").FoldMode), o = t.FoldMode = function(e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
    };
    i.inherits(o, n), function() {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function(e, t, i) {
            var n = e.getLine(i), o = n.match(this.foldingStartMarker);
            if (o) {
                var r = o.index;
                return o[1] ? this.openingBracketBlock(e, o[1], i, r) : e.getCommentFoldRange(i, r + o[0].length, 1)
            }
            if ("markbeginend" === t) {
                var o = n.match(this.foldingStopMarker);
                if (o) {
                    var r = o.index + o[0].length;
                    return o[1] ? this.closingBracketBlock(e, o[1], i, r) : e.getCommentFoldRange(i, r, -1)
                }
            }
        }
    }.call(o.prototype)
}), define("ace/theme/monokai", ["require", "exports", "module", "ace/lib/dom"], function(e, t) {
    t.isDark = !0, t.cssClass = "ace-monokai", t.cssText = ".ace-monokai .ace_gutter {background: #222222;color: #8F908A}.ace-monokai .ace_print-margin {width: 1px;background: #555651}.ace-monokai .ace_scroller {background-color: #191919}.ace-monokai .ace_text-layer {color: #F8F8F2}.ace-monokai .ace_cursor {border-left: 2px solid #F8F8F0}.ace-monokai .ace_overwrite-cursors .ace_cursor {border-left: 0px;border-bottom: 1px solid #F8F8F0}.ace-monokai .ace_marker-layer .ace_selection {background: #49483E}.ace-monokai.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #272822;border-radius: 2px}.ace-monokai .ace_marker-layer .ace_step {background: rgb(102, 82, 0)}.ace-monokai .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #49483E}.ace-monokai .ace_marker-layer .ace_active-line {background: #202020}.ace-monokai .ace_gutter-active-line {background-color: #272727}.ace-monokai .ace_marker-layer .ace_selected-word {border: 1px solid #49483E}.ace-monokai .ace_invisible {color: #52524d}.ace-monokai .ace_entity.ace_name.ace_tag,.ace-monokai .ace_keyword,.ace-monokai .ace_meta,.ace-monokai .ace_storage {color: #F92672}.ace-monokai .ace_constant.ace_character,.ace-monokai .ace_constant.ace_language,.ace-monokai .ace_constant.ace_numeric,.ace-monokai .ace_constant.ace_other {color: #AE81FF}.ace-monokai .ace_invalid {color: #F8F8F0;background-color: #F92672}.ace-monokai .ace_invalid.ace_deprecated {color: #F8F8F0;background-color: #AE81FF}.ace-monokai .ace_support.ace_constant,.ace-monokai .ace_support.ace_function {color: #66D9EF}.ace-monokai .ace_fold {background-color: #A6E22E;border-color: #F8F8F2}.ace-monokai .ace_storage.ace_type,.ace-monokai .ace_support.ace_class,.ace-monokai .ace_support.ace_type {font-style: italic;color: #66D9EF}.ace-monokai .ace_entity.ace_name.ace_function,.ace-monokai .ace_entity.ace_other,.ace-monokai .ace_variable {color: #A6E22E}.ace-monokai .ace_variable.ace_parameter {font-style: italic;color: #FD971F}.ace-monokai .ace_string {color: #E6DB74}.ace-monokai .ace_comment {color: #75715E}.ace-monokai .ace_markup.ace_underline {text-decoration: underline}.ace-monokai .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNQ11D6z7Bq1ar/ABCKBG6g04U2AAAAAElFTkSuQmCC) right repeat-y}";
    var i = e("../lib/dom");
    i.importCssString(t.cssText, t.cssClass)
}), 












function(e, t, i) {
    "use strict";
    function n(e, i, n, o) {
        for (var r = [], s = 0; s < e.length; s++) {
            var a = e[s];
            if (a) {
                var l = tinycolor(a), c = l.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += tinycolor.equals(i, a) ? " sp-thumb-active" : "";
                var h = l.toString(o.preferredFormat || "rgb"), d = f ? "background-color:" + l.toRgbString() : "filter:" + l.toFilter();
                r.push('<span title="' + h + '" data-color="' + l.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + d + ';" /></span>')
            } else {
                var u = "sp-clear-display";
                r.push(t("<div />").append(t('<span data-color="" style="background-color:transparent;" class="' + u + '"></span>').attr("title", o.noColorSelectedText)).html())
            }
        }
        return "<div class='sp-cf " + n + "'>" + r.join("") + "</div>"
    }
    function o() {
        for (var e = 0; e < g.length; e++)
            g[e] && g[e].hide()
    }
    function r(e, i) {
        var n = t.extend({}, p, e);
        return n.callbacks = {move: h(n.move, i),change: h(n.change, i),show: h(n.show, i),hide: h(n.hide, i),beforeShow: h(n.beforeShow, i)}, n
    }
    function s(s, l) {
        function h() {
            if (G.showPaletteOnly && (G.showPalette = !0), It.text(G.showPaletteOnly ? G.togglePaletteMoreText : G.togglePaletteLessText), G.palette) {
                ht = G.palette.slice(0), dt = t.isArray(ht[0]) ? ht : [ht], ut = {};
                for (var e = 0; e < dt.length; e++)
                    for (var i = 0; i < dt[e].length; i++) {
                        var n = tinycolor(dt[e][i]).toRgbString();
                        ut[n] = !0
                    }
            }
            Ct.toggleClass("sp-flat", V), Ct.toggleClass("sp-input-disabled", !G.showInput), Ct.toggleClass("sp-alpha-enabled", G.showAlpha), Ct.toggleClass("sp-clear-enabled", Kt), Ct.toggleClass("sp-buttons-disabled", !G.showButtons), Ct.toggleClass("sp-palette-buttons-disabled", !G.togglePaletteOnly), Ct.toggleClass("sp-palette-disabled", !G.showPalette), Ct.toggleClass("sp-selection-palette-disabled", !G.showSelectionPalette), Ct.toggleClass("sp-palette-only", G.showPaletteOnly), Ct.toggleClass("sp-initial-disabled", !G.showInitial), Ct.addClass(G.className).addClass(G.containerClassName), O()
        }
        function p() {
            function e(e) {
                return e.data && e.data.ignore ? (_(t(e.target).closest(".sp-thumb-el").data("color")), I()) : (_(t(e.target).closest(".sp-thumb-el").data("color")), I(), $(!0), G.hideAfterPaletteSelect && (V ? Z.hide(M()) : B())), !1
            }
            if (m && Ct.find("*:not(input)").attr("unselectable", "on"), h(), $t && bt.after(Ot).hide(), Kt || Mt.hide(), V)
                bt.after(Ct).hide();
            else {
                var i = "parent" === G.appendTo ? bt.parent() : t(G.appendTo);
                1 !== i.length && (i = t("body")), i.append(Ct)
            }
            C(), zt.bind("click.spectrum touchstart.spectrum", function(e) {
                wt || D(), e.stopPropagation(), t(e.target).is("input") || e.preventDefault()
            }), (bt.is(":disabled") || G.disabled === !0) && q(), Ct.click(c), Lt.change(F), Lt.bind("paste", function() {
                setTimeout(F, 1)
            }), Lt.keydown(function(e) {
                13 == e.keyCode && F()
            }), _t.text(G.cancelText), _t.addClass(G.cancelClassName), _t.bind("click.spectrum", function(e) {
                e.stopPropagation(), e.preventDefault(), B("cancel")
            }), Mt.attr("title", G.clearText), Mt.bind("click.spectrum", function(e) {
                e.stopPropagation(), e.preventDefault(), jt = !0, I(), V && $(!0)
            }), Rt.text(G.chooseText), Rt.addClass(G.chooseClassName), Rt.bind("click.spectrum", function(e) {
                e.stopPropagation(), e.preventDefault(), R() && ($(!0), B())
            }), It.text(G.showPaletteOnly ? G.togglePaletteMoreText : G.togglePaletteLessText), It.bind("click.spectrum", function(e) {
                e.stopPropagation(), e.preventDefault(), G.showPaletteOnly = !G.showPaletteOnly, G.showPaletteOnly || V || Ct.css("left", "-=" + (kt.outerWidth(!0) + 5)), h()
            }), d(Ft, function(e, t, i) {
                ct = e / nt, jt = !1, i.shiftKey && (ct = Math.round(10 * ct) / 10), I()
            }, A, x), d(St, function(e, t) {
                st = parseFloat(t / tt), jt = !1, G.showAlpha || (ct = 1), I()
            }, A, x), d(yt, function(e, t, i) {
                if (i.shiftKey) {
                    if (!ft) {
                        var n = at * Y, o = J - lt * J, r = Math.abs(e - n) > Math.abs(t - o);
                        ft = r ? "x" : "y"
                    }
                } else
                    ft = null;
                var s = !ft || "x" === ft, a = !ft || "y" === ft;
                s && (at = parseFloat(e / Y)), a && (lt = parseFloat((J - t) / J)), jt = !1, G.showAlpha || (ct = 1), I()
            }, A, x), Ut ? (_(Ut), N(), Vt = Gt || tinycolor(Ut).format, k(Ut)) : N(), V && L();
            var n = m ? "mousedown.spectrum" : "mousedown.spectrum touchstart.spectrum";
            Bt.delegate(".sp-thumb-el", n, e), Tt.delegate(".sp-thumb-el:nth-child(1)", n, {ignore: !0}, e)
        }
        function C() {
            if (j && e.localStorage) {
                try {
                    var i = e.localStorage[j].split(",#");
                    i.length > 1 && (delete e.localStorage[j], t.each(i, function(e, t) {
                        k(t)
                    }))
                } catch (n) {
                }
                try {
                    pt = e.localStorage[j].split(";")
                } catch (n) {
                }
            }
        }
        function k(i) {
            if (W) {
                var n = tinycolor(i).toRgbString();
                if (!ut[n] && -1 === t.inArray(n, pt))
                    for (pt.push(n); pt.length > gt; )
                        pt.shift();
                if (j && e.localStorage)
                    try {
                        e.localStorage[j] = pt.join(";")
                    } catch (o) {
                    }
            }
        }
        function y() {
            var e = [];
            if (G.showPalette)
                for (var t = 0; t < pt.length; t++) {
                    var i = tinycolor(pt[t]).toRgbString();
                    ut[i] || e.push(pt[t])
                }
            return e.reverse().slice(0, G.maxSelectionSize)
        }
        function E() {
            var e = M(), i = t.map(dt, function(t, i) {
                return n(t, e, "sp-palette-row sp-palette-row-" + i, G)
            });
            C(), pt && i.push(n(y(), e, "sp-palette-row sp-palette-row-selection", G)), Bt.html(i.join(""))
        }
        function S() {
            if (G.showInitial) {
                var e = qt, t = M();
                Tt.html(n([e, t], t, "sp-palette-row-initial", G))
            }
        }
        function A() {
            (0 >= J || 0 >= Y || 0 >= tt) && O(), Ct.addClass(mt), ft = null, bt.trigger("dragstart.spectrum", [M()])
        }
        function x() {
            Ct.removeClass(mt), bt.trigger("dragstop.spectrum", [M()])
        }
        function F() {
            var e = Lt.val();
            if (null !== e && "" !== e || !Kt) {
                var t = tinycolor(e);
                t.isValid() ? (_(t), $(!0)) : Lt.addClass("sp-validation-error")
            } else
                _(null), $(!0)
        }
        function D() {
            X ? B() : L()
        }
        function L() {
            var i = t.Event("beforeShow.spectrum");
            return X ? void O() : (bt.trigger(i, [M()]), void (Z.beforeShow(M()) === !1 || i.isDefaultPrevented() || (o(), X = !0, t(vt).bind("click.spectrum", B), t(e).bind("resize.spectrum", Q), Ot.addClass("sp-active"), Ct.removeClass("sp-hidden"), O(), N(), qt = M(), S(), Z.show(qt), bt.trigger("show.spectrum", [qt]))))
        }
        function B(i) {
            if ((!i || "click" != i.type || 2 != i.button) && X && !V) {
                X = !1, t(vt).unbind("click.spectrum", B), t(e).unbind("resize.spectrum", Q), Ot.removeClass("sp-active"), Ct.addClass("sp-hidden");
                var n = !tinycolor.equals(M(), qt);
                n && (Wt && "cancel" !== i ? $(!0) : T()), Z.hide(M()), bt.trigger("hide.spectrum", [M()])
            }
        }
        function T() {
            _(qt, !0)
        }
        function _(e, t) {
            if (tinycolor.equals(e, M()))
                return void N();
            var i, n;
            !e && Kt ? jt = !0 : (jt = !1, i = tinycolor(e), n = i.toHsv(), st = n.h % 360 / 360, at = n.s, lt = n.v, ct = n.a), N(), i && i.isValid() && !t && (Vt = Gt || i.getFormat())
        }
        function M(e) {
            return e = e || {}, Kt && jt ? null : tinycolor.fromRatio({h: st,s: at,v: lt,a: Math.round(100 * ct) / 100}, {format: e.format || Vt})
        }
        function R() {
            return !Lt.hasClass("sp-validation-error")
        }
        function I() {
            N(), Z.move(M()), bt.trigger("move.spectrum", [M()])
        }
        function N() {
            Lt.removeClass("sp-validation-error"), P();
            var e = tinycolor.fromRatio({h: st,s: 1,v: 1});
            yt.css("background-color", e.toHexString());
            var t = Vt;
            1 > ct && (0 !== ct || "name" !== t) && ("hex" === t || "hex3" === t || "hex6" === t || "name" === t) && (t = "rgb");
            var i = M({format: t}), n = "";
            if (Ht.removeClass("sp-clear-display"), Ht.css("background-color", "transparent"), !i && Kt)
                Ht.addClass("sp-clear-display");
            else {
                var o = i.toHexString(), r = i.toRgbString();
                if (f || 1 === i.alpha ? Ht.css("background-color", r) : (Ht.css("background-color", "transparent"), Ht.css("filter", i.toFilter())), G.showAlpha) {
                    var s = i.toRgb();
                    s.a = 0;
                    var a = tinycolor(s).toRgbString(), l = "linear-gradient(left, " + a + ", " + o + ")";
                    m ? xt.css("filter", tinycolor(a).toFilter({gradientType: 1}, o)) : (xt.css("background", "-webkit-" + l), xt.css("background", "-moz-" + l), xt.css("background", "-ms-" + l), xt.css("background", "linear-gradient(to right, " + a + ", " + o + ")"))
                }
                n = i.toString(t)
            }
            G.showInput && Lt.val(n), G.showPalette && E(), S()
        }
        function P() {
            var e = at, t = lt;
            if (Kt && jt)
                Dt.hide(), At.hide(), Et.hide();
            else {
                Dt.show(), At.show(), Et.show();
                var i = e * Y, n = J - t * J;
                i = Math.max(-et, Math.min(Y - et, i - et)), n = Math.max(-et, Math.min(J - et, n - et)), Et.css({top: n + "px",left: i + "px"});
                var o = ct * nt;
                Dt.css({left: o - ot / 2 + "px"});
                var r = st * tt;
                At.css({top: r - rt + "px"})
            }
        }
        function $(e) {
            var t = M(), i = "", n = !tinycolor.equals(t, qt);
            t && (i = t.toString(Vt), k(t)), Nt && bt.val(i), qt = t, e && n && (Z.change(t), bt.trigger("change", [t]))
        }
        function O() {
            Y = yt.width(), J = yt.height(), et = Et.height(), it = St.width(), tt = St.height(), rt = At.height(), nt = Ft.width(), ot = Dt.width(), V || (Ct.css("position", "absolute"), Ct.offset(a(Ct, zt, G))), P(), G.showPalette && E(), bt.trigger("reflow.spectrum")
        }
        function z() {
            bt.show(), zt.unbind("click.spectrum touchstart.spectrum"), Ct.remove(), Ot.remove(), g[Zt.id] = null
        }
        function H(e, n) {
            return e === i ? t.extend({}, G) : n === i ? G[e] : (G[e] = n, void h())
        }
        function U() {
            wt = !1, bt.attr("disabled", !1), zt.removeClass("sp-disabled")
        }
        function q() {
            B(), wt = !0, bt.attr("disabled", !0), zt.addClass("sp-disabled")
        }
        var G = r(l, s), V = G.flat, W = G.showSelectionPalette, j = G.localStorageKey, K = G.theme, Z = G.callbacks, Q = u(O, 10), X = !1, Y = 0, J = 0, et = 0, tt = 0, it = 0, nt = 0, ot = 0, rt = 0, st = 0, at = 0, lt = 0, ct = 1, ht = [], dt = [], ut = {}, pt = G.selectionPalette.slice(0), gt = G.maxSelectionSize, mt = "sp-dragging", ft = null, vt = s.ownerDocument, bt = (vt.body, t(s)), wt = !1, Ct = t(w, vt).addClass(K), kt = Ct.find(".sp-picker-container"), yt = Ct.find(".sp-color"), Et = Ct.find(".sp-dragger"), St = Ct.find(".sp-hue"), At = Ct.find(".sp-slider"), xt = Ct.find(".sp-alpha-inner"), Ft = Ct.find(".sp-alpha"), Dt = Ct.find(".sp-alpha-handle"), Lt = Ct.find(".sp-input"), Bt = Ct.find(".sp-palette"), Tt = Ct.find(".sp-initial"), _t = Ct.find(".sp-cancel"), Mt = Ct.find(".sp-clear"), Rt = Ct.find(".sp-choose"), It = Ct.find(".sp-palette-toggle"), Nt = bt.is("input"), Pt = Nt && v && "color" === bt.attr("type"), $t = Nt && !V, Ot = $t ? t(b).addClass(K).addClass(G.className).addClass(G.replacerClassName) : t([]), zt = $t ? Ot : bt, Ht = Ot.find(".sp-preview-inner"), Ut = G.color || Nt && bt.val(), qt = !1, Gt = G.preferredFormat, Vt = Gt, Wt = !G.showButtons || G.clickoutFiresChange, jt = !Ut, Kt = G.allowEmpty && !Pt;
        p();
        var Zt = {show: L,hide: B,toggle: D,reflow: O,option: H,enable: U,disable: q,set: function(e) {
                _(e), $()
            },get: M,destroy: z,container: Ct,saveCurrentSelection: function() {
                k(M())
            }};
        return Zt.id = g.push(Zt) - 1, Zt
    }
    function a(e, i, n) {
        var o = 0, r = e.outerWidth(), s = e.outerHeight(), a = i.outerHeight(), l = i.outerWidth(), c = e[0].ownerDocument, h = c.documentElement, d = h.clientWidth + t(c).scrollLeft(), u = h.clientHeight + t(c).scrollTop(), p = i.offset();
        return p.left -= r / 2 - l / 2 - n.offsetX, p.top += a + n.offsetY, p.left -= Math.min(p.left, p.left + r > d && d > r ? Math.abs(p.left + r - d) : 0), p.top -= Math.min(p.top, p.top + s > u && u > s ? Math.abs(s + a - o) : o), p
    }
    function l() {
    }
    function c(e) {
        e.stopPropagation()
    }
    function h(e, t) {
        var i = Array.prototype.slice, n = i.call(arguments, 2);
        return function() {
            return e.apply(t, n.concat(i.call(arguments)))
        }
    }
    function d(i, n, o, r) {
        function s(e) {
            e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.returnValue = !1
        }
        function a(e) {
            if (d) {
                if (m && document.documentMode < 9 && !e.button)
                    return c();
                var t = e.originalEvent.touches, o = t ? t[0].pageX : e.pageX, r = t ? t[0].pageY : e.pageY, a = Math.max(0, Math.min(o - u.left, g)), l = Math.max(0, Math.min(r - u.top, p));
                f && s(e), n.apply(i, [a, l, e])
            }
        }
        function l(e) {
            {
                var n = e.which ? 3 == e.which : 2 == e.button;
                e.originalEvent.touches
            }
            n || d || o.apply(i, arguments) !== !1 && (d = !0, p = t(i).height(), g = t(i).width(), u = t(i).offset(), t(h).bind(v), t(h.body).addClass("sp-dragging"), f || a(e), s(e))
        }
        function c() {
            d && (t(h).unbind(v), t(h.body).removeClass("sp-dragging"), r.apply(i, arguments)), d = !1
        }
        n = n || function() {
        }, o = o || function() {
        }, r = r || function() {
        };
        var h = i.ownerDocument || document, d = !1, u = {}, p = 0, g = 0, f = "ontouchstart" in e, v = {};
        v.selectstart = s, v.dragstart = s, v["touchmove mousemove"] = a, v["touchend mouseup"] = c, t(i).bind("touchstart mousedown", l)
    }
    function u(e, t, i) {
        var n;
        return function() {
            var o = this, r = arguments, s = function() {
                n = null, e.apply(o, r)
            };
            i && clearTimeout(n), (i || !n) && (n = setTimeout(s, t))
        }
    }
    var p = {beforeShow: l,move: l,change: l,show: l,hide: l,color: !1,flat: !1,showInput: !1,allowEmpty: !1,showButtons: !0,clickoutFiresChange: !1,showInitial: !1,showPalette: !1,showPaletteOnly: !1,hideAfterPaletteSelect: !1,togglePaletteOnly: !1,showSelectionPalette: !0,localStorageKey: !1,appendTo: "body",maxSelectionSize: 7,cancelText: "cancel",cancelClassName: "",chooseText: "choose",chooseClassName: "",togglePaletteMoreText: "more",togglePaletteLessText: "less",clearText: "Clear Color Selection",noColorSelectedText: "No Color Selected",preferredFormat: !1,className: "",containerClassName: "",replacerClassName: "",showAlpha: !1,theme: "sp-light",palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],selectionPalette: [],disabled: !1,offsetX: 0,offsetY: 0}, g = [], m = !!/msie/i.exec(e.navigator.userAgent), f = function() {
        function e(e, t) {
            return !!~("" + e).indexOf(t)
        }
        var t = document.createElement("div"), i = t.style;
        return i.cssText = "background-color:rgba(0,0,0,.5)", e(i.backgroundColor, "rgba") || e(i.backgroundColor, "hsla")
    }(), v = function() {
        var e = t("<input type='color' value='!' />")[0];
        return "color" === e.type && "!" !== e.value
    }(), b = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""), w = function() {
        var e = "";
        if (m)
            for (var t = 1; 6 >= t; t++)
                e += "<div class='sp-" + t + "'></div>";
        return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", e, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("")
    }(), C = "spectrum.id";
    t.fn.spectrum = function(e) {
        if ("string" == typeof e) {
            var i = this, n = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var o = g[t(this).data(C)];
                if (o) {
                    var r = o[e];
                    if (!r)
                        throw new Error("Spectrum: no such method: '" + e + "'");
                    "get" == e ? i = o.get() : "container" == e ? i = o.container : "option" == e ? i = o.option.apply(o, n) : "destroy" == e ? (o.destroy(), t(this).removeData(C)) : r.apply(o, n)
                }
            }), i
        }
        return this.spectrum("destroy").each(function() {
            var i = t.extend({}, e, t(this).data()), n = s(this, i);
            t(this).data(C, n.id)
        })
    }, t.fn.spectrum.load = !0, t.fn.spectrum.loadOpts = {}, t.fn.spectrum.draggable = d, t.fn.spectrum.defaults = p, t.spectrum = {}, t.spectrum.localization = {}, t.spectrum.palettes = {}, t.fn.spectrum.processNativeColorInputs = function() {
        v || t("input[type=color]").spectrum({preferredFormat: "hex6"})
    }, function() {
        function t(e) {
            var t = {r: 0,g: 0,b: 0}, n = 1, r = !1, a = !1;
            return "string" == typeof e && (e = M(e)), "object" == typeof e && (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b") ? (t = i(e.r, e.g, e.b), r = !0, a = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v") ? (e.s = B(e.s), e.v = B(e.v), t = s(e.h, e.s, e.v), r = !0, a = "hsv") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("l") && (e.s = B(e.s), e.l = B(e.l), t = o(e.h, e.s, e.l), r = !0, a = "hsl"), e.hasOwnProperty("a") && (n = e.a)), n = E(n), {ok: r,format: e.format || a,r: O(255, z(t.r, 0)),g: O(255, z(t.g, 0)),b: O(255, z(t.b, 0)),a: n}
        }
        function i(e, t, i) {
            return {r: 255 * S(e, 255),g: 255 * S(t, 255),b: 255 * S(i, 255)}
        }
        function n(e, t, i) {
            e = S(e, 255), t = S(t, 255), i = S(i, 255);
            var n, o, r = z(e, t, i), s = O(e, t, i), a = (r + s) / 2;
            if (r == s)
                n = o = 0;
            else {
                var l = r - s;
                switch (o = a > .5 ? l / (2 - r - s) : l / (r + s), r) {
                    case e:
                        n = (t - i) / l + (i > t ? 6 : 0);
                        break;
                    case t:
                        n = (i - e) / l + 2;
                        break;
                    case i:
                        n = (e - t) / l + 4
                }
                n /= 6
            }
            return {h: n,s: o,l: a}
        }
        function o(e, t, i) {
            function n(e, t, i) {
                return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? e + 6 * (t - e) * i : .5 > i ? t : 2 / 3 > i ? e + (t - e) * (2 / 3 - i) * 6 : e
            }
            var o, r, s;
            if (e = S(e, 360), t = S(t, 100), i = S(i, 100), 0 === t)
                o = r = s = i;
            else {
                var a = .5 > i ? i * (1 + t) : i + t - i * t, l = 2 * i - a;
                o = n(l, a, e + 1 / 3), r = n(l, a, e), s = n(l, a, e - 1 / 3)
            }
            return {r: 255 * o,g: 255 * r,b: 255 * s}
        }
        function r(e, t, i) {
            e = S(e, 255), t = S(t, 255), i = S(i, 255);
            var n, o, r = z(e, t, i), s = O(e, t, i), a = r, l = r - s;
            if (o = 0 === r ? 0 : l / r, r == s)
                n = 0;
            else {
                switch (r) {
                    case e:
                        n = (t - i) / l + (i > t ? 6 : 0);
                        break;
                    case t:
                        n = (i - e) / l + 2;
                        break;
                    case i:
                        n = (e - t) / l + 4
                }
                n /= 6
            }
            return {h: n,s: o,v: a}
        }
        function s(e, t, i) {
            e = 6 * S(e, 360), t = S(t, 100), i = S(i, 100);
            var n = P.floor(e), o = e - n, r = i * (1 - t), s = i * (1 - o * t), a = i * (1 - (1 - o) * t), l = n % 6, c = [i, s, r, r, a, i][l], h = [a, i, i, s, r, r][l], d = [r, r, a, i, i, s][l];
            return {r: 255 * c,g: 255 * h,b: 255 * d}
        }
        function a(e, t, i, n) {
            var o = [L($(e).toString(16)), L($(t).toString(16)), L($(i).toString(16))];
            return n && o[0].charAt(0) == o[0].charAt(1) && o[1].charAt(0) == o[1].charAt(1) && o[2].charAt(0) == o[2].charAt(1) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("")
        }
        function l(e, t, i, n) {
            var o = [L(T(n)), L($(e).toString(16)), L($(t).toString(16)), L($(i).toString(16))];
            return o.join("")
        }
        function c(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = U(e).toHsl();
            return i.s -= t / 100, i.s = A(i.s), U(i)
        }
        function h(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = U(e).toHsl();
            return i.s += t / 100, i.s = A(i.s), U(i)
        }
        function d(e) {
            return U(e).desaturate(100)
        }
        function u(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = U(e).toHsl();
            return i.l += t / 100, i.l = A(i.l), U(i)
        }
        function p(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = U(e).toRgb();
            return i.r = z(0, O(255, i.r - $(255 * -(t / 100)))), i.g = z(0, O(255, i.g - $(255 * -(t / 100)))), i.b = z(0, O(255, i.b - $(255 * -(t / 100)))), U(i)
        }
        function g(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = U(e).toHsl();
            return i.l -= t / 100, i.l = A(i.l), U(i)
        }
        function m(e, t) {
            var i = U(e).toHsl(), n = ($(i.h) + t) % 360;
            return i.h = 0 > n ? 360 + n : n, U(i)
        }
        function f(e) {
            var t = U(e).toHsl();
            return t.h = (t.h + 180) % 360, U(t)
        }
        function v(e) {
            var t = U(e).toHsl(), i = t.h;
            return [U(e), U({h: (i + 120) % 360,s: t.s,l: t.l}), U({h: (i + 240) % 360,s: t.s,l: t.l})]
        }
        function b(e) {
            var t = U(e).toHsl(), i = t.h;
            return [U(e), U({h: (i + 90) % 360,s: t.s,l: t.l}), U({h: (i + 180) % 360,s: t.s,l: t.l}), U({h: (i + 270) % 360,s: t.s,l: t.l})]
        }
        function w(e) {
            var t = U(e).toHsl(), i = t.h;
            return [U(e), U({h: (i + 72) % 360,s: t.s,l: t.l}), U({h: (i + 216) % 360,s: t.s,l: t.l})]
        }
        function C(e, t, i) {
            t = t || 6, i = i || 30;
            var n = U(e).toHsl(), o = 360 / i, r = [U(e)];
            for (n.h = (n.h - (o * t >> 1) + 720) % 360; --t; )
                n.h = (n.h + o) % 360, r.push(U(n));
            return r
        }
        function k(e, t) {
            t = t || 6;
            for (var i = U(e).toHsv(), n = i.h, o = i.s, r = i.v, s = [], a = 1 / t; t--; )
                s.push(U({h: n,s: o,v: r})), r = (r + a) % 1;
            return s
        }
        function y(e) {
            var t = {};
            for (var i in e)
                e.hasOwnProperty(i) && (t[e[i]] = i);
            return t
        }
        function E(e) {
            return e = parseFloat(e), (isNaN(e) || 0 > e || e > 1) && (e = 1), e
        }
        function S(e, t) {
            F(e) && (e = "100%");
            var i = D(e);
            return e = O(t, z(0, parseFloat(e))), i && (e = parseInt(e * t, 10) / 100), P.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t)
        }
        function A(e) {
            return O(1, z(0, e))
        }
        function x(e) {
            return parseInt(e, 16)
        }
        function F(e) {
            return "string" == typeof e && -1 != e.indexOf(".") && 1 === parseFloat(e)
        }
        function D(e) {
            return "string" == typeof e && -1 != e.indexOf("%")
        }
        function L(e) {
            return 1 == e.length ? "0" + e : "" + e
        }
        function B(e) {
            return 1 >= e && (e = 100 * e + "%"), e
        }
        function T(e) {
            return Math.round(255 * parseFloat(e)).toString(16)
        }
        function _(e) {
            return x(e) / 255
        }
        function M(e) {
            e = e.replace(R, "").replace(I, "").toLowerCase();
            var t = !1;
            if (q[e])
                e = q[e], t = !0;
            else if ("transparent" == e)
                return {r: 0,g: 0,b: 0,a: 0,format: "name"};
            var i;
            return (i = V.rgb.exec(e)) ? {r: i[1],g: i[2],b: i[3]} : (i = V.rgba.exec(e)) ? {r: i[1],g: i[2],b: i[3],a: i[4]} : (i = V.hsl.exec(e)) ? {h: i[1],s: i[2],l: i[3]} : (i = V.hsla.exec(e)) ? {h: i[1],s: i[2],l: i[3],a: i[4]} : (i = V.hsv.exec(e)) ? {h: i[1],s: i[2],v: i[3]} : (i = V.hex8.exec(e)) ? {a: _(i[1]),r: x(i[2]),g: x(i[3]),b: x(i[4]),format: t ? "name" : "hex8"} : (i = V.hex6.exec(e)) ? {r: x(i[1]),g: x(i[2]),b: x(i[3]),format: t ? "name" : "hex"} : (i = V.hex3.exec(e)) ? {r: x(i[1] + "" + i[1]),g: x(i[2] + "" + i[2]),b: x(i[3] + "" + i[3]),format: t ? "name" : "hex"} : !1
        }
        var R = /^[\s,#]+/, I = /\s+$/, N = 0, P = Math, $ = P.round, O = P.min, z = P.max, H = P.random, U = function W(e, i) {
            if (e = e ? e : "", i = i || {}, e instanceof W)
                return e;
            if (!(this instanceof W))
                return new W(e, i);
            var n = t(e);
            this._r = n.r, this._g = n.g, this._b = n.b, this._a = n.a, this._roundA = $(100 * this._a) / 100, this._format = i.format || n.format, this._gradientType = i.gradientType, this._r < 1 && (this._r = $(this._r)), this._g < 1 && (this._g = $(this._g)), this._b < 1 && (this._b = $(this._b)), this._ok = n.ok, this._tc_id = N++
        };
        U.prototype = {
            isDark: function() {
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
                var e = this.toRgb();
                return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3
            },setAlpha: function(e) {
                return this._a = E(e), this._roundA = $(100 * this._a) / 100, this
            },toHsv: function() {
                var e = r(this._r, this._g, this._b);
                return {h: 360 * e.h,s: e.s,v: e.v,a: this._a}
            },toHsvString: function() {
                var e = r(this._r, this._g, this._b), t = $(360 * e.h), i = $(100 * e.s), n = $(100 * e.v);
                return 1 == this._a ? "hsv(" + t + ", " + i + "%, " + n + "%)" : "hsva(" + t + ", " + i + "%, " + n + "%, " + this._roundA + ")"
            },toHsl: function() {
                var e = n(this._r, this._g, this._b);
                return {h: 360 * e.h,s: e.s,l: e.l,a: this._a}
            },toHslString: function() {
                var e = n(this._r, this._g, this._b), t = $(360 * e.h), i = $(100 * e.s), o = $(100 * e.l);
                return 1 == this._a ? "hsl(" + t + ", " + i + "%, " + o + "%)" : "hsla(" + t + ", " + i + "%, " + o + "%, " + this._roundA + ")"
            },toHex: function(e) {
                return a(this._r, this._g, this._b, e)
            },toHexString: function(e) {
                return "#" + this.toHex(e)
            },toHex8: function() {
                return l(this._r, this._g, this._b, this._a)
            },toHex8String: function() {
                return "#" + this.toHex8()
            },toRgb: function() {
                return {r: $(this._r),g: $(this._g),b: $(this._b),a: this._a}
            },toRgbString: function() {
                return 1 == this._a ? "rgb(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ")" : "rgba(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ", " + this._roundA + ")"
            },toPercentageRgb: function() {
                return {r: $(100 * S(this._r, 255)) + "%",g: $(100 * S(this._g, 255)) + "%",b: $(100 * S(this._b, 255)) + "%",a: this._a}
            },toPercentageRgbString: function() {
                return 1 == this._a ? "rgb(" + $(100 * S(this._r, 255)) + "%, " + $(100 * S(this._g, 255)) + "%, " + $(100 * S(this._b, 255)) + "%)" : "rgba(" + $(100 * S(this._r, 255)) + "%, " + $(100 * S(this._g, 255)) + "%, " + $(100 * S(this._b, 255)) + "%, " + this._roundA + ")"
            },toName: function() {
                return 0 === this._a ? "transparent" : this._a < 1 ? !1 : G[a(this._r, this._g, this._b, !0)] || !1
            },toFilter: function(e) {
                var t = "#" + l(this._r, this._g, this._b, this._a), i = t, n = this._gradientType ? "GradientType = 1, " : "";
                if (e) {
                    var o = U(e);
                    i = o.toHex8String()
                }
                return "progid:DXImageTransform.Microsoft.gradient(" + n + "startColorstr=" + t + ",endColorstr=" + i + ")"
            },toString: function(e) {
                var t = !!e;
                e = e || this._format;
                var i = !1, n = this._a < 1 && this._a >= 0, o = !t && n && ("hex" === e || "hex6" === e || "hex3" === e || "name" === e);
                return o ? "name" === e && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === e && (i = this.toRgbString()), "prgb" === e && (i = this.toPercentageRgbString()), ("hex" === e || "hex6" === e) && (i = this.toHexString()), "hex3" === e && (i = this.toHexString(!0)), "hex8" === e && (i = this.toHex8String()), "name" === e && (i = this.toName()), "hsl" === e && (i = this.toHslString()), "hsv" === e && (i = this.toHsvString()), i || this.toHexString())
            },_applyModification: function(e, t) {
                var i = e.apply(null, [this].concat([].slice.call(t)));
                return this._r = i._r, this._g = i._g, this._b = i._b, this.setAlpha(i._a), this
            },lighten: function() {
                return this._applyModification(u, arguments)
            },brighten: function() {
                return this._applyModification(p, arguments)
            },darken: function() {
                return this._applyModification(g, arguments)
            },desaturate: function() {
                return this._applyModification(c, arguments)
            },saturate: function() {
                return this._applyModification(h, arguments)
            },greyscale: function() {
                return this._applyModification(d, arguments)
            },spin: function() {
                return this._applyModification(m, arguments)
            },_applyCombination: function(e, t) {
                return e.apply(null, [this].concat([].slice.call(t)))
            },analogous: function() {
                return this._applyCombination(C, arguments)
            },complement: function() {
                return this._applyCombination(f, arguments)
            },monochromatic: function() {
                return this._applyCombination(k, arguments)
            },splitcomplement: function() {
                return this._applyCombination(w, arguments)
            },triad: function() {
                return this._applyCombination(v, arguments)
            },tetrad: function() {
                return this._applyCombination(b, arguments)
            }
        }, 
        U.fromRatio = function(e, t) {
            if ("object" == typeof e) {
                var i = {};
                for (var n in e)
                    e.hasOwnProperty(n) && (i[n] = "a" === n ? e[n] : B(e[n]));
                e = i
            }
            return U(e, t)
        }, 
        U.equals = function(e, t) {
            return e && t ? U(e).toRgbString() == U(t).toRgbString() : !1
        }, 
        U.random = function() {
            return U.fromRatio({r: H(),g: H(),b: H()})
        }, 
        U.mix = function(e, t, i) {
            i = 0 === i ? 0 : i || 50;
            var n, o = U(e).toRgb(), r = U(t).toRgb(), s = i / 100, a = 2 * s - 1, l = r.a - o.a;
            n = a * l == -1 ? a : (a + l) / (1 + a * l), n = (n + 1) / 2;
            var c = 1 - n, h = {r: r.r * n + o.r * c,g: r.g * n + o.g * c,b: r.b * n + o.b * c,a: r.a * s + o.a * (1 - s)};
            return U(h)
        }, 
        U.readability = function(e, t) {
            var i = U(e), n = U(t), o = i.toRgb(), r = n.toRgb(), s = i.getBrightness(), a = n.getBrightness(), l = Math.max(o.r, r.r) - Math.min(o.r, r.r) + Math.max(o.g, r.g) - Math.min(o.g, r.g) + Math.max(o.b, r.b) - Math.min(o.b, r.b);
            return {brightness: Math.abs(s - a),color: l}
        }, 
        U.isReadable = function(e, t) {
            var i = U.readability(e, t);
            return i.brightness > 125 && i.color > 500
        }, 
        U.mostReadable = function(e, t) {
            for (var i = null, n = 0, o = !1, r = 0; r < t.length; r++) {
                var s = U.readability(e, t[r]), a = s.brightness > 125 && s.color > 500, l = 3 * (s.brightness / 125) + s.color / 500;
                (a && !o || a && o && l > n || !a && !o && l > n) && (o = a, n = l, i = U(t[r]))
            }
            return i
        };
        var q = U.names = {aliceblue: "f0f8ff",antiquewhite: "faebd7",aqua: "0ff",aquamarine: "7fffd4",azure: "f0ffff",beige: "f5f5dc",bisque: "ffe4c4",black: "000",blanchedalmond: "ffebcd",blue: "00f",blueviolet: "8a2be2",brown: "a52a2a",burlywood: "deb887",burntsienna: "ea7e5d",cadetblue: "5f9ea0",chartreuse: "7fff00",chocolate: "d2691e",coral: "ff7f50",cornflowerblue: "6495ed",cornsilk: "fff8dc",crimson: "dc143c",cyan: "0ff",
            darkblue: "00008b",darkcyan: "008b8b",darkgoldenrod: "b8860b",darkgray: "a9a9a9",darkgreen: "006400",darkgrey: "a9a9a9",darkkhaki: "bdb76b",darkmagenta: "8b008b",darkolivegreen: "556b2f",darkorange: "ff8c00",darkorchid: "9932cc",darkred: "8b0000",darksalmon: "e9967a",darkseagreen: "8fbc8f",darkslateblue: "483d8b",darkslategray: "2f4f4f",darkslategrey: "2f4f4f",darkturquoise: "00ced1",darkviolet: "9400d3",deeppink: "ff1493",deepskyblue: "00bfff",
            dimgray: "696969",dimgrey: "696969",dodgerblue: "1e90ff",firebrick: "b22222",floralwhite: "fffaf0",forestgreen: "228b22",fuchsia: "f0f",gainsboro: "dcdcdc",ghostwhite: "f8f8ff",gold: "ffd700",goldenrod: "daa520",gray: "808080",green: "008000",greenyellow: "adff2f",grey: "808080",honeydew: "f0fff0",hotpink: "ff69b4",indianred: "cd5c5c",indigo: "4b0082",ivory: "fffff0",khaki: "f0e68c",lavender: "e6e6fa",lavenderblush: "fff0f5",lawngreen: "7cfc00",lemonchiffon: "fffacd",
            lightblue: "add8e6",lightcoral: "f08080",lightcyan: "e0ffff",lightgoldenrodyellow: "fafad2",lightgray: "d3d3d3",lightgreen: "90ee90",lightgrey: "d3d3d3",lightpink: "ffb6c1",lightsalmon: "ffa07a",lightseagreen: "20b2aa",lightskyblue: "87cefa",lightslategray: "789",lightslategrey: "789",lightsteelblue: "b0c4de",lightyellow: "ffffe0",lime: "0f0",limegreen: "32cd32",linen: "faf0e6",magenta: "f0f",maroon: "800000",
            mediumaquamarine: "66cdaa",mediumblue: "0000cd",mediumorchid: "ba55d3",mediumpurple: "9370db",mediumseagreen: "3cb371",mediumslateblue: "7b68ee",mediumspringgreen: "00fa9a",mediumturquoise: "48d1cc",mediumvioletred: "c71585",midnightblue: "191970",mintcream: "f5fffa",mistyrose: "ffe4e1",moccasin: "ffe4b5",navajowhite: "ffdead",navy: "000080",oldlace: "fdf5e6",olive: "808000",olivedrab: "6b8e23",
            orange: "ffa500",orangered: "ff4500",orchid: "da70d6",palegoldenrod: "eee8aa",palegreen: "98fb98",paleturquoise: "afeeee",palevioletred: "db7093",papayawhip: "ffefd5",peachpuff: "ffdab9",peru: "cd853f",pink: "ffc0cb",plum: "dda0dd",powderblue: "b0e0e6",purple: "800080",red: "f00",rosybrown: "bc8f8f",royalblue: "4169e1",saddlebrown: "8b4513",salmon: "fa8072",sandybrown: "f4a460",seagreen: "2e8b57",seashell: "fff5ee",sienna: "a0522d",silver: "c0c0c0",skyblue: "87ceeb",
            slateblue: "6a5acd",slategray: "708090",slategrey: "708090",snow: "fffafa",springgreen: "00ff7f",steelblue: "4682b4",tan: "d2b48c",teal: "008080",thistle: "d8bfd8",tomato: "ff6347",turquoise: "40e0d0",violet: "ee82ee",wheat: "f5deb3",white: "fff",whitesmoke: "f5f5f5",yellow: "ff0",yellowgreen: "9acd32"
        }, 
            G = U.hexNames = y(q), V = function() {
            var e = "[-\\+]?\\d+%?", t = "[-\\+]?\\d*\\.\\d+%?", i = "(?:" + t + ")|(?:" + e + ")", n = "[\\s|\\(]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")\\s*\\)?", o = "[\\s|\\(]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")\\s*\\)?";
            return {rgb: new RegExp("rgb" + n),rgba: new RegExp("rgba" + o),hsl: new RegExp("hsl" + n),hsla: new RegExp("hsla" + o),hsv: new RegExp("hsv" + n),hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}
        }();
        e.tinycolor = U
    }(), 
    t(function() {
        t.fn.spectrum.load && t.fn.spectrum.processNativeColorInputs()
    })
}(window, jQuery), 


function() {
    var e = !1, t = /xyz/.test(function() {
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {
    }, Class.extend = function(i) {
        function n() {
            !e && this.init && this.init.apply(this, arguments)
        }
        var o = this.prototype;
        e = !0;
        var r = new this;
        e = !1;
        for (var s in i)
            r[s] = "function" == typeof i[s] && "function" == typeof o[s] && t.test(i[s]) ? function(e, t) {
                return function() {
                    var i = this._super;
                    this._super = o[e];
                    var n = t.apply(this, arguments);
                    return this._super = i, n
                }
            }(s, i[s]) : i[s];
        return n.prototype = r, n.constructor = n, n.extend = arguments.callee, n
    }
}(), 
"undefined" == typeof document || "classList" in document.createElement("a") || !function(e) {
    var t = "classList", i = "prototype", n = (e.HTMLElement || e.Element)[i], o = Object, r = String[i].trim || function() {
        return this.replace(/^\s+|\s+$/g, "")
    }, s = Array[i].indexOf || function(e) {
        for (var t = 0, i = this.length; i > t; t++)
            if (t in this && this[t] === e)
                return t;
        return -1
    }, a = function(e, t) {
        this.name = e, this.code = DOMException[e], this.message = t
    }, l = function(e, t) {
        if ("" === t)
            throw new a("SYNTAX_ERR", "An invalid or illegal string was specified");
        if (/\s/.test(t))
            throw new a("INVALID_CHARACTER_ERR", "String contains an invalid character");
        return s.call(e, t)
    }, c = function(e) {
        for (var t = r.call(e.className), i = t ? t.split(/\s+/) : [], n = 0, o = i.length; o > n; n++)
            this.push(i[n]);
        this._updateClassName = function() {
            e.className = this.toString()
        }
    }, h = c[i] = [], d = function() {
        return new c(this)
    };
    if (a[i] = Error[i], h.item = function(e) {
        return this[e] || null
    }, h.contains = function(e) {
        return e += "", -1 !== l(this, e)
    }, h.add = function(e) {
        e += "", -1 === l(this, e) && (this.push(e), this._updateClassName())
    }, h.remove = function(e) {
        e += "";
        var t = l(this, e);
        -1 !== t && (this.splice(t, 1), this._updateClassName())
    }, h.toggle = function(e) {
        e += "", -1 === l(this, e) ? this.add(e) : this.remove(e)
    }, h.toString = function() {
        return this.join(" ")
    }, o.defineProperty) {
        var u = {get: d,enumerable: !0,configurable: !0};
        try {
            o.defineProperty(n, t, u)
        } catch (p) {
            -2146823252 === p.number && (u.enumerable = !1, o.defineProperty(n, t, u))
        }
    } else
        o[i].__defineGetter__ && n.__defineGetter__(t, d)
}(self);







// declaration by assignment

// skriv

var skriv = function() {
    return {actions: {},
       create: function(e, t) {
            function i() {
                k = k.bind(this), v = v.bind(this), b = b.bind(this), w = w.bind(this), C = C.bind(this), y = y.bind(this), n(), o(), s(), F.classList.add("loaded"), F.classList.add("disabled"), F.addEventListener("click", k, !1)
            }
            function n() {
                var e = document.createElement("div");
                e.setAttribute("contenteditable", !0), e.style.className = "skriv-enabler", e.style.position = "absolute", e.style.display = "none", e.style.width = "0px", e.style.height = "0px", document.body.appendChild(e)
            }
            function o(e) {
                x = skriv.util.extend(x, e), r(), x.autoBind ? A = setInterval(s, 500) : clearInterval(A)
            }
            function r() {
                var e = [].slice.call(F.querySelectorAll("li"));
                e.forEach(function(e) {
                    if (0 === e.childNodes.length) {
                        e.parentNode.removeChild(e);
                        var t = {}, i = Array.prototype.slice.call(e.attributes);
                        if (i.forEach(function(e) {
                            /^data\-/gi.test(e.name) && (t[e.name.replace(/^data\-/gi, "")] = e.value)
                        }), t.tags = "string" == typeof t.tags ? t.tags.split(",") : [], t.keys = "string" == typeof t.keys ? t.keys.split(",") : [], "string" == typeof t.model && /\./g.test(t.model)) {
                            for (var n = window, o = t.model.split("."); o.length; )
                                n = n[o.shift()];
                            t.model = n
                        }
                        var r;
                        if (t.command)
                            r = new skriv.actions.command(B, t), r.appendTo(F), D.push(r);
                        else if (t.model)
                            r = new t.model(B, t), r.appendTo(F), D.push(r);
                        else if ("divider" === t.id) {
                            var s = document.createElement("div");
                            s.className = "divider", F.appendChild(s), t.name && s.classList.add(t.name)
                        } else
                            console && "function" == typeof console.warn && console.warn('Action of type "' + t.id + '" could not be created.')
                    }
                }.bind(this))
            }
            function s(e) {
                var t = [];
                t = e ? [e] : Array.prototype.slice.call(document.querySelectorAll("[contenteditable]")), t.forEach(function(e) {
                    e.addEventListener("focus", v, !1), e.addEventListener("blur", b, !1), e.addEventListener("mouseup", w, !1), e.addEventListener("keyup", C, !1)
                })
            }
            function a(e) {
                var t = [];
                t = e ? [e] : Array.prototype.slice.call(document.querySelectorAll("[contenteditable]")), t.forEach(function(e) {
                    e.removeEventListener("focus", v, !1), e.removeEventListener("blur", b, !1), e.removeEventListener("mouseup", w, !1), e.removeEventListener("keyup", C, !1)
                })
            }
            function l(e) {
                e.appendChild(F)
            }
            function c() {
                F.classList.remove("disabled")
            }
            function h(e) {
                if ("undefined" == typeof e && (e = skriv.util.getSelectedElement()), e) {
                    for (var t = [], i = e; i; )
                        t.push(i.nodeName.toLowerCase()), i = i.parentNode;
                    D.forEach(function(i) {
                        i.updateSelection(e, t)
                    })
                } else
                    D.forEach(function(e) {
                        e.deselect()
                    })
            }
            function d(e, t) {
                L.dispatch(e, t)
            }
            function u() {
                D.forEach(function(e) {
                    "function" == typeof e.isOpen && e.isOpen() && e.close()
                })
            }
            function p(e) {
                E = e, S = e
            }
            function g() {
                return E
            }
            function m(e) {
                var t = null;
                return D.forEach(function(i) {
                    i.id === e && (t = i)
                }), t
            }
            function f() {
                var e;
                return D.forEach(function(t) {
                    "function" == typeof t.isOpen && t.isOpen() && (e = t)
                }), e
            }
            function v(e) {
                E = e.target, c(), document.addEventListener("keydown", y, !1)
            }
            function b() {
                h(null), document.removeEventListener("keydown", y, !1)
            }
            function w() {
                h()
            }
            function C() {
                h()
            }
            function k() {
                h()
            }
            function y(e) {
                D.forEach(function(t) {
                    (e.metaKey || e.ctrlKey) && t.updateKeyDown(e.keyCode) && e.preventDefault()
                })
            }
            if ("object" != typeof e)
                throw "A container element must be specified.";
            var E, S, A, x = skriv.util.extend({autoBind: !1}, t), F = e, D = [], L = new skriv.Signal, B = {configure: o,appendTo: l,notify: d,bind: s,unbind: a,closeActions: u,setEditor: p,getEditor: g,getAction: m,getOpenAction: f,notified: L};
            return i(), B
        }}
}();

skriv.util = {expressions: {IS_YOUTUBE_URL: /(?:www\.)?youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w\-]+)(?:&(?:amp;)?[\w\?=]*)?/gi,IS_VIMEO_URL: /(www\.)?vimeo\.com\/(\w*\/)*(([a-z]{0,2}-)?\d+)/gi,YOUTUBE_VIDEO_ID: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,VIMEO_VIDEO_ID: /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/},
    getYouTubeID: function(e) {
        if (skriv.util.expressions.IS_YOUTUBE_URL.test(e)) {
            var t = e.match(skriv.util.expressions.YOUTUBE_VIDEO_ID);
            if (t && t.length > 2)
                return t[2]
        }
    },getVimeoID: function(e) {
        if (skriv.util.expressions.IS_VIMEO_URL.test(e)) {
            var t = e.match(skriv.util.expressions.VIMEO_VIDEO_ID);
            if (t && t.length > 4)
                return t[5]
        }
    },extend: function(e, t) {
        for (var i in t)
            e[i] = t[i];
        return e
    },wrap: function(e, t) {
        t && e && (e.parentNode.appendChild(t), t.appendChild(e))
    },wrapInner: function(e, t) {
        t && e && (t.innerHTML = e.innerText || e.textContent, e.innerHTML = "", e.appendChild(t))
    },unwrap: function(e) {
        if (e && e.childNodes.length && e.parentNode) {
            for (; e.childNodes.length; )
                e.parentNode.insertBefore(e.childNodes[0], e);
            e.parentNode.removeChild(e)
        }
    },execCommand: function(e, t, i) {
        try {
            document.execCommand(e, !1, i)
        } catch (n) {
        }
    },placeCaretAtEnd: function(e) {
        if (e.focus(), "undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
            var t = document.createRange();
            t.selectNodeContents(e), t.collapse(!1);
            var i = window.getSelection();
            i.removeAllRanges(), i.addRange(t)
        } else if ("undefined" != typeof document.body.createTextRange) {
            var n = document.body.createTextRange();
            n.moveToElementText(e), n.collapse(!1), n.select()
        }
    },selectText: function(e) {
        var t, i;
        document.body.createTextRange ? (t = document.body.createTextRange(), t.moveToElementText(e), t.select()) : window.getSelection && (i = window.getSelection(), t = document.createRange(), t.selectNodeContents(e), i.removeAllRanges(), i.addRange(t))
    },getSelectedElement: function() {
        var e = window.getSelection();
        return e && e.anchorNode ? e.anchorNode.parentNode : null
    },getSelectedHTML: function() {
        var e;
        if (document.selection && document.selection.createRange)
            return e = document.selection.createRange(), e.htmlText;
        if (window.getSelection) {
            var t = window.getSelection();
            if (t.rangeCount > 0) {
                e = t.getRangeAt(0);
                var i = e.cloneContents(), n = document.createElement("div");
                return n.appendChild(i), n.innerHTML
            }
            return ""
        }
        return ""
    },getParentOfType: function(e, t) {
        for (var i = null; e && e.parentNode; )
            e.nodeName.toLowerCase() === t.toLowerCase() && (i = e), e = e.parentNode;
        return i
    }
}, skriv.Signal = function() {
    this.listeners = []
}, skriv.Signal.prototype.add = function(e) {
    this.listeners.push(e)
}, skriv.Signal.prototype.remove = function(e) {
    var t = this.listeners.indexOf(e);
    t >= 0 && this.listeners.splice(t, 1)
}, skriv.Signal.prototype.dispatch = function() {
    var e = Array.prototype.slice.call(arguments);
    this.listeners.forEach(function(t) {
        t.apply(null, e)
    })
}, skriv.actions.abstract = Class.extend({
    init: function(e, t) {
        this.core = e, this.config = t || {}, this.id = this.config.id, this.tags = this.config.tags || [], this.keys = this.config.keys || [], this.clicked = new skriv.Signal, this.build(), this.bind()
    },build: function() {
        this.domElement = document.createElement("div"), this.domElement.classList.add("action"), this.domElement.classList.add(this.id), this.config.name && this.domElement.classList.add(this.config.name), this.buttonElement = document.createElement("button"), this.domElement.appendChild(this.buttonElement), this.iconElement = document.createElement("span"), this.iconElement.className = "icon " + this.id, this.buttonElement.appendChild(this.iconElement)
    },bind: function() {
        this.buttonElement.addEventListener("mousedown", this.onMouseDown.bind(this)), this.buttonElement.addEventListener("click", this.onClick.bind(this))
    },trigger: function() {
    },appendTo: function(e) {
        e.appendChild(this.domElement)
    },hasTag: function(e) {
        var t = !1, i = this.tags;
        return "string" == typeof e && (e = [e]), e.forEach(function(e) {
            i.forEach(function(i) {
                e === i && (t = !0)
            })
        }), t
    },select: function() {
        this.domElement.classList.add("selected")
    },deselect: function() {
        this.domElement.classList.remove("selected")
    },updateSelection: function(e, t) {
        this.hasTag(t) ? this.select() : this.deselect()
    },updateKeyDown: function(e) {
        for (var t = 0, i = this.keys.length; i > t; t++)
            if (parseInt(this.keys[t], 10) === e)
                return "function" == typeof this.open ? this.open() : this.trigger(), !0;
        return !1
    },onMouseDown: function(e) {
        e.preventDefault()
    },onClick: function() {
        this.clicked.dispatch()
    }}), skriv.actions.command = skriv.actions.abstract.extend({init: function(e, t) {
        this._super(e, t), this.command = t.command
    },trigger: function() {
        skriv.util.execCommand(this.command, !1)
    },onClick: function(e) {
        this._super(e), this.trigger()
    }}), skriv.actions.popout = skriv.actions.abstract.extend({init: function(e, t) {
        this._super(e, t), this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this)
    },build: function() {
        this._super(), this.panelElement = document.createElement("div"), this.panelElement.classList.add("panel"), this.domElement.appendChild(this.panelElement)
    },bind: function() {
        this._super(), this.domElement.addEventListener("mousedown", this.onMouseDown.bind(this), !1), this.domElement.addEventListener("mouseover", this.onMouseOver.bind(this), !1), this.domElement.addEventListener("mouseout", this.onMouseOut.bind(this), !1)
    },open: function() {
        this.isOpen() || (this.domElement.classList.add("open"), document.addEventListener("mousedown", this.onDocumentMouseDown, !1), this.layout())
    },close: function() {
        this.isOpen() && (this.domElement.classList.remove("open"), document.removeEventListener("mousedown", this.onDocumentMouseDown, !1))
    },toggle: function() {
        this.isOpen() ? this.close() : this.open()
    },isOpen: function() {
        return this.domElement.classList.contains("open")
    },layout: function() {
        var e = this.panelElement.offsetWidth, t = this.buttonElement.offsetWidth, i = this.buttonElement.offsetHeight;
        this.panelElement.style.left = (t - e) / 2 + "px", this.panelElement.style.top = i + "px"
    },onClick: function(e) {
        this._super(e), this.toggle()
    },onDocumentMouseDown: function(e) {
        for (var t = e.target, i = !1; t; )
            t === this.domElement && (i = !0), t = t.parentNode;
        i || this.close()
    },onMouseDown: function(e) {
        e.preventDefault()
    },onMouseOver: function() {
        this.config.openOnHover && this.open()
    },onMouseOut: function() {
        this.config.openOnHover && this.close()
    }}), skriv.actions.dropdown = skriv.actions.popout.extend({init: function(e, t) {
        this.options = this.options || [], this._super(e, t), this.options && this.options.length > 0 && this.setValue(this.options[0].value)
    },build: function() {
        this._super(), this.domElement.style.width = "100px", this.panelElement.style.width = "140px", this.dropdownElement = document.createElement("ul"), this.panelElement.appendChild(this.dropdownElement), this.panelElement.classList.add("dropdown"), this.options.forEach(this.addOption.bind(this))
    },addOption: function(e) {
        var t = document.createElement("li");
        t.setAttribute("data-value", e.value), t.textContent = e.name, this.bindOption(t, e), this.dropdownElement.appendChild(t)
    },bindOption: function(e, t) {
        e.addEventListener("click", function(e) {
            this.setValue(e), this.close()
        }.bind(this, t.value), !1)
    },populate: function(e) {
        this.dropdownElement.innerHTML = "", this.options = e, this.options.forEach(this.addOption.bind(this))
    },cancel: function() {
    },setValue: function(e, t) {
        this.hasValue(e) && (this.selectedElement = this.dropdownElement.querySelector('[data-value="' + e + '"]'), this.config.leaveHeader || (this.buttonElement.textContent = this.selectedElement.textContent), t || this.trigger())
    },getValue: function() {
        return this.selectedElement ? this.selectedElement.getAttribute("data-value") : null
    },hasValue: function(e) {
        return !!this.dropdownElement.querySelector('[data-value="' + e + '"]')
    }
}), skriv.actions.align = skriv.actions.dropdown.extend({
    init: function(e, t) {
        t.openOnHover = !0, this.options = [{name: "Left",value: "justifyleft"}, {name: "Center",value: "justifycenter"}, {name: "Right",value: "justifyright"}, {name: "Justify",value: "justifyfull"}], this._super(e, t)
    },build: function() {
        this._super(), this.domElement.style.width = "50px", this.panelElement.style.width = "152px", this.panelElement.classList.add("single-row")
    },addOption: function(e) {
        var t = document.createElement("li");
        t.setAttribute("data-value", e.value), this.bindOption(t, e);
        var i = document.createElement("div");
        i.className = "icon " + e.value, t.appendChild(i), this.dropdownElement.appendChild(t)
    },trigger: function() {
        var e = this.getValue();
        skriv.util.execCommand(e, !1)
    },setValue: function(e, t) {
        this.hasValue(e) && (this.selectedElement = this.dropdownElement.querySelector('[data-value="' + e + '"]'), t || this.trigger())
    }
}), skriv.actions.link = skriv.actions.popout.extend({
    init: function(e, t) {
        this._super(e, t)
    },build: function() {
        this._super(), this.domElement.classList.add(this.id), this.linkInput = document.createElement("input"), this.linkInput.setAttribute("type", "text"), this.linkInput.setAttribute("placeholder", "http://"), this.panelElement.appendChild(this.linkInput), this.confirmButton = document.createElement("button"), this.confirmButton.classList.add("confirm-button"), this.confirmButton.innerHTML = "OK", this.panelElement.appendChild(this.confirmButton), this.cancelButton = document.createElement("button"), this.cancelButton.classList.add("cancel-button"), this.cancelButton.innerHTML = "Cancel", this.panelElement.appendChild(this.cancelButton), this.panelElement.style.width = "340px"
    },bind: function() {
        this._super(), this.confirmButton.addEventListener("click", this.onConfirmClicked.bind(this), !1), this.cancelButton.addEventListener("click", this.onCancelClicked.bind(this), !1), this.linkInput.addEventListener("keydown", this.onKeyDown.bind(this), !1)
    },trigger: function() {
        this.linkElement && (this.linkElement.setAttribute("href", this.linkInput.value), this.linkElement = null)
    },open: function() {
        var e = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "a");
        e || skriv.util.getSelectedHTML().length ? (this._super(), this.linkInput.value = "", e ? (this.linkElement = e, this.linkInput.value = this.linkElement.getAttribute("href")) : (skriv.util.execCommand("createLink", !1, skriv.actions.link.PLACEHOLDER), this.linkElement = document.querySelector('a[href="' + skriv.actions.link.PLACEHOLDER + '"]')), this.linkInput.focus(), this.linkInput.select()) : this.core.notify("Please select some text first")
    },close: function() {
        this._super(), this.linkElement && this.linkElement.getAttribute("href") === skriv.actions.link.PLACEHOLDER && skriv.util.unwrap(this.linkElement)
    },onClick: function(e) {
        this._super(e)
    },onConfirmClicked: function() {
        "" === this.linkInput.value ? this.close() : (this.trigger(), this.close())
    },onCancelClicked: function() {
        this.close()
    },onKeyDown: function(e) {
        13 === e.keyCode && this.onConfirmClicked(e)
    }
}), skriv.actions.link.PLACEHOLDER = "javascript:link", 
skriv.actions.unlink = skriv.actions.abstract.extend({
    init: function(e, t) {
        this._super(e, t)
    },trigger: function() {
        var e = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "a");
        e && 0 === skriv.util.getSelectedHTML().length ? skriv.util.unwrap(e) : skriv.util.execCommand("unlink", !1)
    },onClick: function(e) {
        this._super(e), this.trigger()
    }
}), skriv.actions.image = skriv.actions.popout.extend({
    init: function(e, t) {
        this._super(e, t), this.changeTab("upload")
    },build: function() {
        this._super(), this.domElement.classList.add(this.id), this.panelElement.classList.add("tabbed"), this.tabBar = document.createElement("div"), this.tabBar.className = "tab-bar", this.panelElement.appendChild(this.tabBar), this.uploadTab = document.createElement("button"), this.uploadTab.setAttribute("data-value", "upload"), this.uploadTab.textContent = "Upload", this.tabBar.appendChild(this.uploadTab), this.linkTab = document.createElement("button"), this.linkTab.setAttribute("data-value", "link"), this.linkTab.textContent = "URL", this.tabBar.appendChild(this.linkTab), this.linkSection = document.createElement("div"), this.linkSection.className = "tab-contents link-section", this.panelElement.appendChild(this.linkSection), this.linkInput = document.createElement("input"), this.linkInput.setAttribute("type", "text"), this.linkInput.setAttribute("placeholder", "Image, YouTube or Vimeo URL..."), this.linkSection.appendChild(this.linkInput), this.confirmButton = document.createElement("button"), this.confirmButton.className = "confirm-button", this.confirmButton.innerHTML = "OK", this.linkSection.appendChild(this.confirmButton), this.cancelButton = document.createElement("button"), this.cancelButton.className = "cancel-button", this.cancelButton.innerHTML = "Cancel", this.linkSection.appendChild(this.cancelButton), this.clearElement = document.createElement("div"), this.clearElement.classList.add("clear"), this.linkSection.appendChild(this.clearElement), this.uploadSection = document.createElement("div"), this.uploadSection.className = "tab-contents upload-section", this.panelElement.appendChild(this.uploadSection), this.formElement = document.createElement("div"), this.formElement.className = "file-form", this.uploadSection.appendChild(this.formElement), this.fileInput = document.createElement("input"), this.fileInput.setAttribute("type", "file"), this.formElement.appendChild(this.fileInput), this.browseWrapper = document.createElement("div"), this.browseWrapper.className = "browse", this.formElement.appendChild(this.browseWrapper), this.browseOutput = document.createElement("input"), this.browseOutput.setAttribute("type", "text"), this.browseOutput.setAttribute("readonly", "readonly"), this.browseOutput.setAttribute("disabled", "disabled"), this.browseOutput.setAttribute("placeholder", "Select image file..."), this.browseOutput.className = "browse-output", this.browseWrapper.appendChild(this.browseOutput), this.browseButton = document.createElement("button"), this.browseButton.className = "browse-button confirm-button", this.browseButton.textContent = "Browse", this.browseWrapper.appendChild(this.browseButton), this.browseClear = document.createElement("div"), this.browseClear.className = "clear", this.formElement.appendChild(this.browseClear), this.progressBar = document.createElement("div"), this.progressBar.className = "progress", this.formElement.appendChild(this.progressBar), this.progressBarInner = document.createElement("div"), this.progressBarInner.className = "inner", this.progressBar.appendChild(this.progressBarInner), this.panelElement.style.width = "340px"
    },bind: function() {
        this._super(), this.browseButton.addEventListener("click", this.onBrowseClicked.bind(this), !1), this.confirmButton.addEventListener("click", this.onConfirmClicked.bind(this), !1), this.cancelButton.addEventListener("click", this.onCancelClicked.bind(this), !1), this.linkInput.addEventListener("keydown", this.onKeyDown.bind(this), !1), this.linkTab.addEventListener("click", this.onTabClicked.bind(this), !1), this.uploadTab.addEventListener("click", this.onTabClicked.bind(this), !1), this.fileInput.addEventListener("change", this.onFileInputChange.bind(this), !1)
    },trigger: function(e) {
        if (this.imageElement) {
            if ("link" === this.currentTab) {
                var e = this.linkInput.value, t = skriv.util.getYouTubeID(e), i = skriv.util.getVimeoID(e), n = ['<iframe width="720" height="405" src="', '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'];
                t ? this.imageElement.outerHTML = n.join("https://youtube.com/embed/" + t) : i ? this.imageElement.outerHTML = n.join("https://player.vimeo.com/video/" + i) : (this.imageElement.setAttribute("src", this.linkInput.value), this.imageElement.style.display = "", this.imageElement.removeAttribute("width"), this.imageElement.removeAttribute("height"))
            } else
                e && (this.imageElement.setAttribute("src", e), this.imageElement.style.display = "", this.imageElement.removeAttribute("width"), this.imageElement.removeAttribute("height"));
            this.imageElement = null
        }
    },changeTab: function(e) {
        this.currentTab = e, "link" === e ? (this.uploadTab.classList.remove("selected"), this.uploadSection.classList.remove("visible"), this.linkTab.classList.add("selected"), this.linkSection.classList.add("visible"), this.linkInput.focus()) : (this.linkTab.classList.remove("selected"), this.linkSection.classList.remove("visible"), this.uploadTab.classList.add("selected"), this.uploadSection.classList.add("visible"))
    },open: function() {
        this._super(), this.linkInput.value = "", this.fileInput.value = "", this.browseOutput.value = "", this.panelElement.classList.remove("busy"), skriv.util.execCommand("insertImage", !1, skriv.actions.image.PLACEHOLDER), this.imageElement = document.querySelector('img[src="' + skriv.actions.image.PLACEHOLDER + '"]'), !this.imageElement && this.core.getEditor() && (this.imageElement = document.createElement("img"), this.imageElement.setAttribute("src", skriv.actions.image.PLACEHOLDER), this.core.getEditor().appendChild(this.imageElement)), this.imageElement ? this.imageElement.style.display = "none" : (this.core.notify("Please focus the editor first"), this.close())
    },close: function() {
        this._super(), this.imageElement && this.imageElement.parentNode && this.imageElement.getAttribute("src") === skriv.actions.image.PLACEHOLDER && (this.imageElement.parentNode.removeChild(this.imageElement), this.imageElement = null)
    },uploadFile: function() {
        var e = this.fileInput.files[0];
        if (!e || !e.type.match(/image.*/))
            return void this.core.notify("Only image files, please");
        if ("number" == typeof e.size && e.size / 1024 > this.config.maxsize)
            return void this.core.notify("No more than " + Math.round(this.config.maxsize / 1024) + "mb please", "negative");
        this.panelElement.classList.add("busy"), this.setProgress(0), this.browseOutput.value = e.name;
        var t = new FormData;
        t.append("file", e);
        var i = document.querySelector('meta[name="csrf-token"]');
        i && t.append("authenticity_token", i.getAttribute("content"));
        var n = new XMLHttpRequest;
        n.open("POST", this.config.endpoint), n.onload = function() {
            try {
                var e = JSON.parse(n.responseText)
            } catch (t) {
                return this.onFileUploadError()
            }
            this.onFileUploadSuccess(e)
        }.bind(this), n.onerror = this.onFileUploadError.bind(this), n.upload.onprogress = function(e) {
            this.setProgress(e.loaded / e.total * 100)
        }.bind(this), n.send(t)
    },setProgress: function(e) {
        this.progressBarInner.style.width = e + "%"
    },onFileUploadError: function(e) {
        this.close(), this.core.notify(e || "Failed to upload image", "negative")
    },onFileUploadSuccess: function(e) {
        this.trigger(e.url), this.close()
    },onFileInputChange: function() {
        this.uploadFile()
    },onBrowseClicked: function() {
        this.fileInput.click()
    },onTabClicked: function(e) {
        var t = e.target.getAttribute("data-value");
        t && this.changeTab(t)
    },onConfirmClicked: function() {
        "" === this.linkInput.value ? this.close() : (this.trigger(), this.close())
    },onCancelClicked: function() {
        this.close()
    },onClick: function(e) {
        this._super(e)
    },onKeyDown: function(e) {
        13 === e.keyCode && this.onConfirmClicked(e)
    },onMouseDown: function() {
    }
}), skriv.actions.image.PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", 
skriv.actions.foregroundColor = skriv.actions.abstract.extend({
    init: function(e, t) {
        this._super(e, t), this.colorpickerOpen = !1
    },build: function() {
        this._super(), this.domElement.classList.add(this.id), $(this.buttonElement).spectrum({color: "#ECC",showInput: !0,className: "skriv-colorpicker",showAlpha: !!this.config.alpha,showInitial: !0,showPalette: !0,showSelectionPalette: !0,maxPaletteSize: 10,preferredFormat: "hex",localStorageKey: "skriv-colors",cancelText: "Cancel",cancelClassName: "skriv-cancel-button",chooseText: "Confirm",chooseClassName: "skriv-confirm-button",offsetY: 16,show: function() {
                this.colorpickerOpen = !0
            }.bind(this),hide: function() {
                this.colorpickerOpen = !1
            }.bind(this),move: function(e) {
                this.currentColor = this.config.alpha ? e.toRgbString() : e.toHexString()
            }.bind(this),change: function(e) {
                this.currentColor = this.config.alpha ? e.toRgbString() : e.toHexString(), this.trigger()
            }.bind(this),palette: [["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)", "transparent"], ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)"], ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]]})
    },bind: function() {
        this._super()
    },trigger: function() {
        skriv.util.execCommand("forecolor", !1, this.currentColor)
    },open: function() {
        this.colorpickerOpen = !0, $(this.buttonElement).spectrum("show")
    },close: function() {
        this.colorpickerOpen = !1, $(this.buttonElement).spectrum("hide")
    },isOpen: function() {
        return this.colorpickerOpen
    },onClick: function(e) {
        this._super(e)
    }
}),

skriv.actions.backgroundColor = skriv.actions.foregroundColor.extend({
    init: function(e, t) {
        t.alpha = !0, this._super(e, t)
    },trigger: function() {
        skriv.util.execCommand("backcolor", !1, this.currentColor)
    },open: function() {
        this._super()
    }
}), skriv.actions.fontFamily = skriv.actions.dropdown.extend({
    init: function(e, t) {
        t.openOnHover = !0, this.options = [{name: "Arial",value: "arial"}, {name: "Courier New",value: "courier new"}, {name: "Georgia",value: "georgia"}, {name: "Helvetica",value: "helvetica"}, {name: "Impact",value: "impact"}, {name: "Lato",value: "Lato"}, {name: "League Gothic",value: "League Gothic"}, {name: "Times",value: "times new roman"}, {name: "Monospace",value: "monospace"}, {name: "Trebuchet",value: "trebuchet ms"}, {name: "Verdana",value: "verdana"}], this._super(e, t), [].slice.call(this.dropdownElement.querySelectorAll("li")).forEach(function(e) {
            e.style.fontFamily = e.getAttribute("data-value")
        })
    },trigger: function() {
        skriv.util.execCommand("fontName", !1, this.getValue())
    },updateSelection: function(e) {
        e && "function" == typeof window.getComputedStyle && this.setValue(window.getComputedStyle(e).getPropertyValue("font-family").replace(/(,.*)|\'|\"/g, ""), !0)
    },setValue: function(e, t) {
        this._super(e, t), this.selectedElement && (this.buttonElement.style.fontFamily = this.getValue())
    }
}), skriv.actions.fontFormat = skriv.actions.dropdown.extend({
    init: function(e, t) {
        t.openOnHover = !0, this.options = [{name: "Paragraph",value: "p"}, {name: "Pre",value: "pre"}, {name: "Code",value: "code"}, {name: "Quote",value: "blockquote"}, {name: "Heading 1",value: "h1"}, {name: "Heading 2",value: "h2"}, {name: "Heading 3",value: "h3"}], this._super(e, t)
    },trigger: function() {
        var e = this.getValue();
        if ("code" === e) {
            var t = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "pre"), i = skriv.util.getParentOfType(skriv.util.getSelectedElement(), "code");
            if (i && t)
                skriv.util.unwrap(i), skriv.util.unwrap(t);
            else {
                var n = document.getSelection();
                if (document.execCommand("insertHTML", !1, "<pre><code>" + n + " </code></pre>"), n.anchorNode && "function" == typeof n.anchorNode.querySelector) {
                    var o = n.anchorNode.querySelector("pre code");
                    o && o.focus()
                }
            }
        } else
            skriv.util.execCommand("formatBlock", !1, this.getValue())
    },updateSelection: function(e) {
        if (e)
            for (var t = e; t; )
                this.hasValue(t.nodeName.toLowerCase()) ? (this.setValue(t.nodeName.toLowerCase(), !0), t = null) : t = t.parentNode
    }
}), skriv.actions.fontSize = skriv.actions.dropdown.extend({
    init: function(e, t) {
        t.openOnHover = !0, t.leaveHeader = !0, this.options = [{name: "18px",value: "1"}, {name: "24px",value: "2"}, {name: "32px",value: "3"}, {name: "42px",value: "4"}, {name: "54px",value: "5"}, {name: "72px",value: "6"}, {name: "112px",value: "7"}], this._super(e, t)
    },build: function() {
        this._super(), this.domElement.style.width = "60px", this.panelElement.style.width = "80px", this.buttonElement.textContent = "Size"
    },trigger: function() {
        this.getValue();
        skriv.util.execCommand("fontSize", !1, this.getValue()), setTimeout(function() {
            var e = this.core.getEditor();
            e && this.options.forEach(function(t) {
                for (var i = e.querySelectorAll('font[size="' + t.value + '"]'), n = 0, o = i.length; o > n; n++)
                    i[n].removeAttribute("size"), i[n].style.fontSize = t.name
            })
        }.bind(this), 1)
    }
}),



function(e) {
    function t(t) {
        return e.less[t.split("/")[1]]
    }
    function i() {
        "development" === m.env ? (m.optimization = 0, m.watchTimer = setInterval(function() {
            m.watchMode && o(function(e, t, i, n, o) {
                t && c(t.toCSS(), n, o.lastModified)
            })
        }, m.poll)) : m.optimization = 3
    }
    function n() {
        for (var e = document.getElementsByTagName("style"), t = 0; t < e.length; t++)
            e[t].type.match(E) && new m.Parser({filename: document.location.href.replace(/#.*$/, ""),dumpLineNumbers: m.dumpLineNumbers}).parse(e[t].innerHTML || "", function(i, n) {
                var o = n.toCSS(), r = e[t];
                r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = o : r.innerHTML = o
            })
    }
    function o(e, t) {
        for (var i = 0; i < m.sheets.length; i++)
            a(m.sheets[i], e, t, m.sheets.length - (i + 1))
    }
    function r(e, t) {
        var i, n, o, r, a = s(e), l = s(t), c = "";
        if (a.hostPart !== l.hostPart)
            return "";
        for (n = Math.max(l.directories.length, a.directories.length), i = 0; n > i && l.directories[i] === a.directories[i]; i++)
            ;
        for (r = l.directories.slice(i), o = a.directories.slice(i), i = 0; i < r.length - 1; i++)
            c += "../";
        for (i = 0; i < o.length - 1; i++)
            c += o[i] + "/";
        return c
    }
    function s(e, t) {
        var i, n, o = /^((?:[a-z-]+:)?\/\/(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/, r = e.match(o), s = {}, a = [];
        if (!r)
            throw new Error("Could not parse sheet href - '" + e + "'");
        if (!r[1] || r[2]) {
            if (n = t.match(o), !n)
                throw new Error("Could not parse page url - '" + t + "'");
            r[1] = n[1], r[2] || (r[3] = n[3] + r[3])
        }
        if (r[3])
            for (a = r[3].replace("\\", "/").split("/"), i = 0; i < a.length; i++)
                ".." === a[i] && i > 0 && (a.splice(i - 1, 2), i -= 2);
        return s.hostPart = r[1], s.directories = a, s.path = r[1] + a.join("/"), s.fileUrl = s.path + (r[4] || ""), s.url = s.fileUrl + (r[5] || ""), s
    }
    function a(t, i, n, o) {
        var a, d = t.contents || {}, p = t.files || {}, f = s(t.href, e.location.href), v = f.url, b = C && C.getItem(v), w = C && C.getItem(v + ":timestamp"), k = {css: b,timestamp: w};
        a = m.relativeUrls ? m.rootpath ? t.entryPath ? s(m.rootpath + r(f.path, t.entryPath)).path : m.rootpath : f.path : m.rootpath ? m.rootpath : t.entryPath ? t.entryPath : f.path, h(v, t.type, function(e, r) {
            if (A += e.replace(/@import .+?;/gi, ""), !n && k && r && new Date(r).valueOf() === new Date(k.timestamp).valueOf())
                c(k.css, t), i(null, null, e, t, {local: !0,remaining: o}, v);
            else
                try {
                    d[v] = e, new m.Parser({optimization: m.optimization,paths: [f.path],entryPath: t.entryPath || f.path,mime: t.type,filename: v,rootpath: a,relativeUrls: t.relativeUrls,contents: d,files: p,dumpLineNumbers: m.dumpLineNumbers}).parse(e, function(n, s) {
                        if (n)
                            return g(n, v);
                        try {
                            i(n, s, e, t, {local: !1,lastModified: r,remaining: o}, v), u(document.getElementById("less-error-message:" + l(v)))
                        } catch (n) {
                            g(n, v)
                        }
                    })
                } catch (s) {
                    g(s, v)
                }
        }, function(e, t) {
            throw new Error("Couldn't load " + t + " (" + e + ")")
        })
    }
    function l(e) {
        return e.replace(/^[a-z]+:\/\/?[^\/]+/, "").replace(/^\//, "").replace(/\.[a-zA-Z]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":")
    }
    function c(e, t, i) {
        var n, o = t.href || "", r = "less:" + (t.title || l(o));
        if (null === (n = document.getElementById(r))) {
            n = document.createElement("style"), n.type = "text/css", t.media && (n.media = t.media), n.id = r;
            var s = t && t.nextSibling || null;
            (s || document.getElementsByTagName("head")[0]).parentNode.insertBefore(n, s)
        }
        if (n.styleSheet)
            try {
                n.styleSheet.cssText = e
            } catch (a) {
                throw new Error("Couldn't reassign styleSheet.cssText.")
            }
        else
            (function(e) {
                n.childNodes.length > 0 ? n.firstChild.nodeValue !== e.nodeValue && n.replaceChild(e, n.firstChild) : n.appendChild(e)
            })(document.createTextNode(e));
        if (i && C) {
            p("saving " + o + " to cache.");
            try {
                C.setItem(o, e), C.setItem(o + ":timestamp", i)
            } catch (a) {
                p("failed to save")
            }
        }
    }
    function h(e, t, i, n) {
        function o(t, i, n) {
            t.status >= 200 && t.status < 300 ? i(t.responseText, t.getResponseHeader("Last-Modified")) : "function" == typeof n && n(t.status, e)
        }
        var r = d(), s = v ? m.fileAsync : m.async;
        "function" == typeof r.overrideMimeType && r.overrideMimeType("text/css"), r.open("GET", e, s), r.setRequestHeader("Accept", t || "text/x-less, text/css; q=0.9, */*; q=0.5"), r.send(null), v && !m.fileAsync ? 0 === r.status || r.status >= 200 && r.status < 300 ? i(r.responseText) : n(r.status, e) : s ? r.onreadystatechange = function() {
            4 == r.readyState && o(r, i, n)
        } : o(r, i, n)
    }
    function d() {
        if (e.XMLHttpRequest)
            return new XMLHttpRequest;
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (t) {
            return p("browser doesn't support AJAX."), null
        }
    }
    function u(e) {
        return e && e.parentNode.removeChild(e)
    }
    function p(e) {
        "development" == m.env && "undefined" != typeof console && console.log("less: " + e)
    }
    function g(e, t) {
        var i, n, o = "less-error-message:" + l(t), r = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>', s = document.createElement("div"), a = [], h = e.filename || t, d = h.match(/([^\/]+(\?.*)?)$/)[1];
        s.id = o, s.className = "less-error-message", n = "<h3>" + (e.message || "There is an error in your .less file") + '</h3><p>in <a href="' + h + '">' + d + "</a> ";
        var u = function(e, t, i) {
            e.extract[t] && a.push(r.replace(/\{line\}/, parseInt(e.line) + (t - 1)).replace(/\{class\}/, i).replace(/\{content\}/, e.extract[t]))
        };
        e.stack ? n += "<br/>" + e.stack.split("\n").slice(1).join("<br/>") : e.extract && (u(e, 0, ""), u(e, 1, "line"), u(e, 2, ""), n += "on line " + e.line + ", column " + (e.column + 1) + ":</p><ul>" + a.join("") + "</ul>"), s.innerHTML = n, c([".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}"].join("\n"), {title: "error-message"}), s.style.cssText = ["font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px"].join(";"), "development" == m.env && (i = setInterval(function() {
            document.body && (document.getElementById(o) ? document.body.replaceChild(s, document.getElementById(o)) : document.body.insertBefore(s, document.body.firstChild), clearInterval(i))
        }, 10))
    }
    Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e) || e instanceof Array
    }), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
        for (var i = this.length >>> 0, n = 0; i > n; n++)
            n in this && e.call(t, this[n], n, this)
    }), Array.prototype.map || (Array.prototype.map = function(e) {
        for (var t = this.length >>> 0, i = new Array(t), n = arguments[1], o = 0; t > o; o++)
            o in this && (i[o] = e.call(n, this[o], o, this));
        return i
    }), Array.prototype.filter || (Array.prototype.filter = function(e) {
        for (var t = [], i = arguments[1], n = 0; n < this.length; n++)
            e.call(i, this[n]) && t.push(this[n]);
        return t
    }), Array.prototype.reduce || (Array.prototype.reduce = function(e) {
        var t = this.length >>> 0, i = 0;
        if (0 === t && 1 === arguments.length)
            throw new TypeError;
        if (arguments.length >= 2)
            var n = arguments[1];
        else
            for (; ; ) {
                if (i in this) {
                    n = this[i++];
                    break
                }
                if (++i >= t)
                    throw new TypeError
            }
        for (; t > i; i++)
            i in this && (n = e.call(null, n, this[i], i, this));
        return n
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        var t = this.length, i = arguments[1] || 0;
        if (!t)
            return -1;
        if (i >= t)
            return -1;
        for (0 > i && (i += t); t > i; i++)
            if (Object.prototype.hasOwnProperty.call(this, i) && e === this[i])
                return i;
        return -1
    }), Object.keys || (Object.keys = function(e) {
        var t = [];
        for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && t.push(i);
        return t
    }), String.prototype.trim || (String.prototype.trim = function() {
        return String(this).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    });
    var m, f;
    "object" == typeof environment && "[object Environment]" === {}.toString.call(environment) ? (m = "undefined" == typeof e ? {} : e.less = {}, f = m.tree = {}, m.mode = "rhino") : "undefined" == typeof e ? (m = exports, f = t("./tree"), m.mode = "node") : ("undefined" == typeof e.less && (e.less = {}), m = e.less, f = e.less.tree = {}, m.mode = "browser"), 
    m.Parser = function(e) {
        function i() {
            k = S[C], y = w, A = w
        }
        function n() {
            S[C] = k, w = y, A = w
        }
        function o() {
            w > A && (S[C] = S[C].slice(w - A), A = w)
        }
        function r(e) {
            var t = e.charCodeAt(0);
            return 32 === t || 10 === t || 9 === t
        }
        function s(e) {
            var t, i;
            if (e instanceof Function)
                return e.call(x.parsers);
            if ("string" == typeof e)
                t = b.charAt(w) === e ? e : null, i = 1, o();
            else {
                if (o(), !(t = e.exec(S[C])))
                    return null;
                i = t[0].length
            }
            return t ? (a(i), "string" == typeof t ? t : 1 === t.length ? t[0] : t) : void 0
        }
        function a(e) {
            for (var t = w, i = C, n = w + S[C].length, o = w += e; n > w && r(b.charAt(w)); )
                w++;
            return S[C] = S[C].slice(e + (w - o)), A = w, 0 === S[C].length && C < S.length - 1 && C++, t !== w || i !== C
        }
        function l(e, t) {
            var i = s(e);
            return i ? i : void c(t || ("string" == typeof e ? "expected '" + e + "' got '" + b.charAt(w) + "'" : "unexpected token"))
        }
        function c(e, t) {
            var i = new Error(e);
            throw i.index = w, i.type = t || "Syntax", i
        }
        function h(e) {
            return "string" == typeof e ? b.charAt(w) === e : e.test(S[C]) ? !0 : !1
        }
        function d(e, t) {
            return e.filename && t.filename && e.filename !== t.filename ? x.imports.contents[e.filename] : b
        }
        function u(e, t) {
            for (var i = e, n = -1; i >= 0 && "\n" !== t.charAt(i); i--)
                n++;
            return {line: "number" == typeof e ? (t.slice(0, e).match(/\n/g) || "").length : null,column: n}
        }
        function p(e) {
            return "browser" === m.mode || "rhino" === m.mode ? e.filename : t("path").resolve(e.filename)
        }
        function g(e, t, i) {
            return {lineNumber: u(e, t).line + 1,fileName: p(i)}
        }
        function v(e, t) {
            var i = d(e, t), n = u(e.index, i), o = n.line, r = n.column, s = i.split("\n");
            this.type = e.type || "Syntax", this.message = e.message, this.filename = e.filename || t.filename, this.index = e.index, this.line = "number" == typeof o ? o + 1 : null, this.callLine = e.call && u(e.call, i).line + 1, this.callExtract = s[u(e.call, i).line], this.stack = e.stack, this.column = r, this.extract = [s[o - 1], s[o], s[o + 1]]
        }
        var b, w, C, k, y, E, S, A, x, e = e || {};
        e.contents || (e.contents = {}), e.rootpath = e.rootpath || "", e.files || (e.files = {});
        var F = function() {
        }, D = this.imports = {paths: e.paths || [],queue: [],files: e.files,contents: e.contents,mime: e.mime,error: null,push: function(t, i) {
                var n = this;
                this.queue.push(t), m.Parser.importer(t, this.paths, function(e, o, r) {
                    n.queue.splice(n.queue.indexOf(t), 1);
                    var s = r in n.files;
                    n.files[r] = o, e && !n.error && (n.error = e), i(e, o, s), 0 === n.queue.length && F(n.error)
                }, e)
            }};
        return this.env = e = e || {}, this.optimization = "optimization" in this.env ? this.env.optimization : 1, this.env.filename = this.env.filename || null, 
        x = {imports: D,
            parse: function(i, n) {
                var o, r, a, l = null;
                if (w = C = A = E = 0, b = i.replace(/\r\n/g, "\n"), b = b.replace(/^\uFEFF/, ""), 
                    S = function(t) {
                    for (var i, n, o, r, s = 0, a = /(?:@\{[\w-]+\}|[^"'`\{\}\/\(\)\\])+/g, c = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g, h = /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`]|\\.)*)`/g, d = 0, u = t[0], p = 0; p < b.length; )
                        if (a.lastIndex = p, (i = a.exec(b)) && i.index === p && (p += i[0].length, u.push(i[0])), o = b.charAt(p), c.lastIndex = h.lastIndex = p, (i = h.exec(b)) && i.index === p)
                            p += i[0].length, u.push(i[0]);
                        else if (n || "/" !== o || (r = b.charAt(p + 1), "/" !== r && "*" !== r || !(i = c.exec(b)) || i.index !== p)) {
                            switch (o) {
                                case "{":
                                    if (!n) {
                                        d++, u.push(o);
                                        break
                                    }
                                case "}":
                                    if (!n) {
                                        d--, u.push(o), t[++s] = u = [];
                                        break
                                    }
                                case "(":
                                    if (!n) {
                                        n = !0, u.push(o);
                                        break
                                    }
                                case ")":
                                    if (n) {
                                        n = !1, u.push(o);
                                        break
                                    }
                                default:
                                    u.push(o)
                            }
                            p++
                        } else
                            p += i[0].length, u.push(i[0]);
                    return 0 != d && (l = new v({index: p - 1,type: "Parse",message: d > 0 ? "missing closing `}`" : "missing opening `{`",filename: e.filename}, e)), t.map(function(e) {
                        return e.join("")
                    })
                }([[]]), l)
                    return n(l, e);
                try {
                    o = new f.Ruleset([], s(this.parsers.primary)), o.root = !0
                } catch (c) {
                    return n(new v(c, e))
                }
                if (o.toCSS = function(i) {
                    return function(n, o) {
                        var r, s = [];
                        n = n || {}, "object" == typeof o && !Array.isArray(o) && (o = Object.keys(o).map(function(e) {
                            var t = o[e];
                            return t instanceof f.Value || (t instanceof f.Expression || (t = new f.Expression([t])), t = new f.Value([t])), new f.Rule("@" + e, t, !1, 0)
                        }), s = [new f.Ruleset(null, o)]);
                        try {
                            var a = i.call(this, {frames: s}).toCSS([], {compress: n.compress || !1,dumpLineNumbers: e.dumpLineNumbers})
                        } catch (l) {
                            throw new v(l, e)
                        }
                        if (r = x.imports.error)
                            throw r instanceof v ? r : new v(r, e);
                        return n.yuicompress && "node" === m.mode ? t("ycssmin").cssmin(a) : n.compress ? a.replace(/(\s)+/g, "$1") : a
                    }
                }(o.eval), w < b.length - 1) {
                    w = E, a = b.split("\n"), r = (b.slice(0, w).match(/\n/g) || "").length + 1;
                    for (var h = w, d = -1; h >= 0 && "\n" !== b.charAt(h); h--)
                        d++;
                    l = {type: "Parse",message: "Syntax Error on line " + r,index: w,filename: e.filename,line: r,column: d,extract: [a[r - 2], a[r - 1], a[r]]}
                }
                this.imports.queue.length > 0 ? F = function(e) {
                    e = l || e, e ? n(e) : n(null, o)
                } : n(l, o)
            },
            parsers: {
                primary: function() {
                    for (var e, t = []; (e = s(this.mixin.definition) || s(this.rule) || s(this.ruleset) || s(this.mixin.call) || s(this.comment) || s(this.directive)) || s(/^[\s\n]+/) || s(/^;+/); )
                        e && t.push(e);
                    return t
                },comment: function() {
                    var e;
                    if ("/" === b.charAt(w))
                        return "/" === b.charAt(w + 1) ? new f.Comment(s(/^\/\/.*/), !0) : (e = s(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/)) ? new f.Comment(e) : void 0
                },entities: {quoted: function() {
                        var e, t, i = w;
                        return "~" === b.charAt(i) && (i++, t = !0), '"' === b.charAt(i) || "'" === b.charAt(i) ? (t && s("~"), (e = s(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/)) ? new f.Quoted(e[0], e[1] || e[2], t) : void 0) : void 0
                    },keyword: function() {
                        var e;
                        return (e = s(/^[_A-Za-z-][_A-Za-z0-9-]*/)) ? f.colors.hasOwnProperty(e) ? new f.Color(f.colors[e].slice(1)) : new f.Keyword(e) : void 0
                    },call: function() {
                        var t, i, n, o, r = w;
                        if (t = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(S[C])) {
                            if (t = t[1], i = t.toLowerCase(), "url" === i)
                                return null;
                            if (w += t.length, "alpha" === i && (o = s(this.alpha), "undefined" != typeof o))
                                return o;
                            if (s("("), n = s(this.entities.arguments), s(")"))
                                return t ? new f.Call(t, n, r, e.filename) : void 0
                        }
                    },arguments: function() {
                        for (var e, t = []; (e = s(this.entities.assignment) || s(this.expression)) && (t.push(e), s(",")); )
                            ;
                        return t
                    },literal: function() {
                        return s(this.entities.ratio) || s(this.entities.dimension) || s(this.entities.color) || s(this.entities.quoted) || s(this.entities.unicodeDescriptor)
                    },assignment: function() {
                        var e, t;
                        return (e = s(/^\w+(?=\s?=)/i)) && s("=") && (t = s(this.entity)) ? new f.Assignment(e, t) : void 0
                    },url: function() {
                        var t;
                        if ("u" === b.charAt(w) && s(/^url\(/))
                            return t = s(this.entities.quoted) || s(this.entities.variable) || s(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "", l(")"), new f.URL(null != t.value || t instanceof f.Variable ? t : new f.Anonymous(t), e.rootpath)
                    },variable: function() {
                        var t, i = w;
                        return "@" === b.charAt(w) && (t = s(/^@@?[\w-]+/)) ? new f.Variable(t, i, e.filename) : void 0
                    },variableCurly: function() {
                        var t, i = w;
                        return "@" === b.charAt(w) && (t = s(/^@\{([\w-]+)\}/)) ? new f.Variable("@" + t[1], i, e.filename) : void 0
                    },color: function() {
                        var e;
                        return "#" === b.charAt(w) && (e = s(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/)) ? new f.Color(e[1]) : void 0
                    },dimension: function() {
                        var e, t = b.charCodeAt(w);
                        if (!(t > 57 || 43 > t || 47 === t || 44 == t))
                            return (e = s(/^([+-]?\d*\.?\d+)(px|%|em|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn|dpi|dpcm|dppx|rem|vw|vh|vmin|vm|ch)?/)) ? new f.Dimension(e[1], e[2]) : void 0
                    },ratio: function() {
                        var e, t = b.charCodeAt(w);
                        if (!(t > 57 || 48 > t))
                            return (e = s(/^(\d+\/\d+)/)) ? new f.Ratio(e[1]) : void 0
                    },unicodeDescriptor: function() {
                        var e;
                        return (e = s(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/)) ? new f.UnicodeDescriptor(e[0]) : void 0
                    },javascript: function() {
                        var e, t, i = w;
                        return "~" === b.charAt(i) && (i++, t = !0), "`" === b.charAt(i) ? (t && s("~"), (e = s(/^`([^`]*)`/)) ? new f.JavaScript(e[1], w, t) : void 0) : void 0
                    }
                },variable: function() {
                    var e;
                    return "@" === b.charAt(w) && (e = s(/^(@[\w-]+)\s*:/)) ? e[1] : void 0
                },shorthand: function() {
                    var e, t;
                    if (h(/^[@\w.%-]+\/[@\w.-]+/))
                        return i(), (e = s(this.entity)) && s("/") && (t = s(this.entity)) ? new f.Shorthand(e, t) : void n()
                },mixin: {
                    call: function() {
                        var t, o, r, a, d, u, p, g, m, v, C = [], k = [], y = [], E = w, S = b.charAt(w), A = !1;
                        if ("." === S || "#" === S) {
                            for (i(); t = s(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/); )
                                C.push(new f.Element(o, t, w)), o = s(">");
                            if (s("(")) {
                                for (u = []; a = s(this.expression); ) {
                                    if (d = null, v = a, 1 == a.value.length) {
                                        var x = a.value[0];
                                        x instanceof f.Variable && s(":") && (u.length > 0 && (p && c("Cannot mix ; and , as delimiter types"), g = !0), v = l(this.expression), d = m = x.name)
                                    }
                                    u.push(v), y.push({name: d,value: v}), s(",") || (s(";") || p) && (g && c("Cannot mix ; and , as delimiter types"), p = !0, u.length > 1 && (v = new f.Value(u)), k.push({name: m,value: v}), m = null, u = [], g = !1)
                                }
                                l(")")
                            }
                            return r = p ? k : y, s(this.important) && (A = !0), C.length > 0 && (s(";") || h("}")) ? new f.mixin.Call(C, r, E, e.filename, A) : void n()
                        }
                    },definition: function() {
                        var e, t, o, r, a, c, d = [], u = !1;
                        if (!("." !== b.charAt(w) && "#" !== b.charAt(w) || h(/^[^{]*\}/)) && (i(), t = s(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/))) {
                            e = t[1];
                            do {
                                if (s(this.comment), "." === b.charAt(w) && s(/^\.{3}/)) {
                                    u = !0, d.push({variadic: !0});
                                    break
                                }
                                if (!(r = s(this.entities.variable) || s(this.entities.literal) || s(this.entities.keyword)))
                                    break;
                                if (r instanceof f.Variable)
                                    if (s(":"))
                                        a = l(this.expression, "expected expression"), d.push({name: r.name,value: a});
                                    else {
                                        if (s(/^\.{3}/)) {
                                            d.push({name: r.name,variadic: !0}), u = !0;
                                            break
                                        }
                                        d.push({name: r.name})
                                    }
                                else
                                    d.push({value: r})
                            } while (s(",") || s(";"));
                            if (s(")") || (E = w, n()), s(this.comment), s(/^when/) && (c = l(this.conditions, "expected condition")), o = s(this.block), o)
                                return new f.mixin.Definition(e, d, o, c, u);
                            n()
                        }
                    }
                },entity: function() {
                    return s(this.entities.literal) || s(this.entities.variable) || s(this.entities.url) || s(this.entities.call) || s(this.entities.keyword) || s(this.entities.javascript) || s(this.comment)
                },end: function() {
                    return s(";") || h("}")
                },alpha: function() {
                    var e;
                    if (s(/^\(opacity=/i))
                        return (e = s(/^\d+/) || s(this.entities.variable)) ? (l(")"), new f.Alpha(e)) : void 0
                },element: function() {
                    var e, t, i;
                    return t = s(this.combinator), e = s(/^(?:\d+\.\d+|\d+)%/) || s(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || s("*") || s("&") || s(this.attribute) || s(/^\([^()@]+\)/) || s(/^[\.#](?=@)/) || s(this.entities.variableCurly), e || s("(") && (i = s(this.entities.variableCurly) || s(this.entities.variable) || s(this.selector)) && s(")") && (e = new f.Paren(i)), e ? new f.Element(t, e, w) : void 0
                },combinator: function() {
                    var e = b.charAt(w);
                    if (">" === e || "+" === e || "~" === e || "|" === e) {
                        for (w++; b.charAt(w).match(/\s/); )
                            w++;
                        return new f.Combinator(e)
                    }
                    return new f.Combinator(b.charAt(w - 1).match(/\s/) ? " " : null)
                },selector: function() {
                    var e, t, i, n = [];
                    if (s("("))
                        return e = s(this.entity), s(")") ? new f.Selector([new f.Element("", e, w)]) : null;
                    for (; (t = s(this.element)) && (i = b.charAt(w), n.push(t), "{" !== i && "}" !== i && ";" !== i && "," !== i && ")" !== i); )
                        ;
                    return n.length > 0 ? new f.Selector(n) : void 0
                },attribute: function() {
                    var e, t, i, n = "";
                    if (s("[") && ((e = s(/^(?:[_A-Za-z0-9-]|\\.)+/) || s(this.entities.quoted)) && (n = (i = s(/^[|~*$^]?=/)) && (t = s(this.entities.quoted) || s(/^[\w-]+/)) ? [e, i, t.toCSS ? t.toCSS() : t].join("") : e), s("]")))
                        return n ? "[" + n + "]" : void 0
                },block: function() {
                    var e;
                    return s("{") && (e = s(this.primary)) && s("}") ? e : void 0
                },ruleset: function() {
                    var t, o, r, a = [];
                    for (i(), e.dumpLineNumbers && (r = g(w, b, e)); (t = s(this.selector)) && (a.push(t), s(this.comment), s(",")); )
                        s(this.comment);
                    if (a.length > 0 && (o = s(this.block))) {
                        var l = new f.Ruleset(a, o, e.strictImports);
                        return e.dumpLineNumbers && (l.debugInfo = r), l
                    }
                    E = w, n()
                },rule: function() {
                    var e, t, o, r, a = b.charAt(w);
                    if (i(), "." !== a && "#" !== a && "&" !== a && (e = s(this.variable) || s(this.property))) {
                        if ("@" != e.charAt(0) && (r = /^([^@+\/'"*`(;{}-]*);/.exec(S[C])) ? (w += r[0].length - 1, t = new f.Anonymous(r[1])) : t = s("font" === e ? this.font : this.value), o = s(this.important), t && s(this.end))
                            return new f.Rule(e, t, o, y);
                        E = w, n()
                    }
                },"import": function() {
                    var t, o, r = w;
                    i();
                    var a = s(/^@import(?:-(once))?\s+/);
                    return a && (t = s(this.entities.quoted) || s(this.entities.url)) && (o = s(this.mediaFeatures), s(";")) ? new f.Import(t, D, o, "once" === a[1], r, e.rootpath) : void n()
                },mediaFeature: function() {
                    var e, t, i = [];
                    do
                        if (e = s(this.entities.keyword))
                            i.push(e);
                        else if (s("(")) {
                            if (t = s(this.property), e = s(this.entity), !s(")"))
                                return null;
                            if (t && e)
                                i.push(new f.Paren(new f.Rule(t, e, null, w, !0)));
                            else {
                                if (!e)
                                    return null;
                                i.push(new f.Paren(e))
                            }
                        }
                    while (e);
                    return i.length > 0 ? new f.Expression(i) : void 0
                },mediaFeatures: function() {
                    var e, t = [];
                    do
                        if (e = s(this.mediaFeature)) {
                            if (t.push(e), !s(","))
                                break
                        } else if ((e = s(this.entities.variable)) && (t.push(e), !s(",")))
                            break;
                    while (e);
                    return t.length > 0 ? t : null
                },media: function() {
                    var t, i, n, o;
                    return e.dumpLineNumbers && (o = g(w, b, e)), s(/^@media/) && (t = s(this.mediaFeatures), i = s(this.block)) ? (n = new f.Media(i, t), e.dumpLineNumbers && (n.debugInfo = o), n) : void 0
                },directive: function() {
                    var t, o, r, a, l, c, h;
                    if ("@" === b.charAt(w)) {
                        if (o = s(this["import"]) || s(this.media))
                            return o;
                        if (i(), t = s(/^@[a-z-]+/)) {
                            switch (a = t, "-" == t.charAt(1) && t.indexOf("-", 2) > 0 && (a = "@" + t.slice(t.indexOf("-", 2) + 1)), a) {
                                case "@font-face":
                                    l = !0;
                                    break;
                                case "@viewport":
                                case "@top-left":
                                case "@top-left-corner":
                                case "@top-center":
                                case "@top-right":
                                case "@top-right-corner":
                                case "@bottom-left":
                                case "@bottom-left-corner":
                                case "@bottom-center":
                                case "@bottom-right":
                                case "@bottom-right-corner":
                                case "@left-top":
                                case "@left-middle":
                                case "@left-bottom":
                                case "@right-top":
                                case "@right-middle":
                                case "@right-bottom":
                                    l = !0;
                                    break;
                                case "@page":
                                case "@document":
                                case "@supports":
                                case "@keyframes":
                                    l = !0, c = !0;
                                    break;
                                case "@namespace":
                                    h = !0
                            }
                            if (c && (t += " " + (s(/^[^{]+/) || "").trim()), l) {
                                if (r = s(this.block))
                                    return new f.Directive(t, r)
                            } else if ((o = s(h ? this.expression : this.entity)) && s(";")) {
                                var d = new f.Directive(t, o);
                                return e.dumpLineNumbers && (d.debugInfo = g(w, b, e)), d
                            }
                            n()
                        }
                    }
                },font: function() {
                    for (var e, t = [], i = []; e = s(this.shorthand) || s(this.entity); )
                        i.push(e);
                    if (t.push(new f.Expression(i)), s(","))
                        for (; (e = s(this.expression)) && (t.push(e), s(",")); )
                            ;
                    return new f.Value(t)
                },value: function() {
                    for (var e, t = []; (e = s(this.expression)) && (t.push(e), s(",")); )
                        ;
                    return t.length > 0 ? new f.Value(t) : void 0
                },important: function() {
                    return "!" === b.charAt(w) ? s(/^! *important/) : void 0
                },sub: function() {
                    var e;
                    return s("(") && (e = s(this.expression)) && s(")") ? e : void 0
                },multiplication: function() {
                    var e, t, i, n;
                    if (e = s(this.operand)) {
                        for (; !h(/^\/[*\/]/) && (i = s("/") || s("*")) && (t = s(this.operand)); )
                            n = new f.Operation(i, [n || e, t]);
                        return n || e
                    }
                },addition: function() {
                    var e, t, i, n;
                    if (e = s(this.multiplication)) {
                        for (; (i = s(/^[-+]\s+/) || !r(b.charAt(w - 1)) && (s("+") || s("-"))) && (t = s(this.multiplication)); )
                            n = new f.Operation(i, [n || e, t]);
                        return n || e
                    }
                },conditions: function() {
                    var e, t, i, n = w;
                    if (e = s(this.condition)) {
                        for (; s(",") && (t = s(this.condition)); )
                            i = new f.Condition("or", i || e, t, n);
                        return i || e
                    }
                },condition: function() {
                    var e, t, i, n, o = w, r = !1;
                    return s(/^not/) && (r = !0), l("("), (e = s(this.addition) || s(this.entities.keyword) || s(this.entities.quoted)) ? ((n = s(/^(?:>=|=<|[<=>])/)) ? (t = s(this.addition) || s(this.entities.keyword) || s(this.entities.quoted)) ? i = new f.Condition(n, e, t, o, r) : c("expected expression") : i = new f.Condition("=", e, new f.Keyword("true"), o, r), l(")"), s(/^and/) ? new f.Condition("and", i, s(this.condition)) : i) : void 0
                },operand: function() {
                    var e, t = b.charAt(w + 1);
                    "-" === b.charAt(w) && ("@" === t || "(" === t) && (e = s("-"));
                    var i = s(this.sub) || s(this.entities.dimension) || s(this.entities.color) || s(this.entities.variable) || s(this.entities.call);
                    return e ? new f.Operation("*", [new f.Dimension(-1), i]) : i
                },expression: function() {
                    for (var e, t = []; e = s(this.addition) || s(this.entity); )
                        t.push(e);
                    return t.length > 0 ? new f.Expression(t) : void 0
                },property: function() {
                    var e;
                    return (e = s(/^(\*?-?[_a-z0-9-]+)\s*:/)) ? e[1] : void 0
                }
            }
        }
    }, 
    ("browser" === m.mode || "rhino" === m.mode) && (m.Parser.importer = function(e, t, i, n) {
        !/^([a-z-]+:)?\//.test(e) && t.length > 0 && (e = t[0] + e), a({href: e,title: e,type: n.mime,contents: n.contents,files: n.files,rootpath: n.rootpath,entryPath: n.entryPath,relativeUrls: n.relativeUrls}, function(e, o, r, s, a, l) {
            e && "function" == typeof n.errback ? n.errback.call(null, l, t, i, n) : i.call(null, e, o, l)
        }, !0)
    }), 
    function(e) {
        function t(t) {
            return e.functions.hsla(t.h, t.s, t.l, t.a)
        }
        function i(t, i) {
            return t instanceof e.Dimension && "%" == t.unit ? parseFloat(t.value * i / 100) : n(t)
        }
        function n(t) {
            if (t instanceof e.Dimension)
                return parseFloat("%" == t.unit ? t.value / 100 : t.value);
            if ("number" == typeof t)
                return t;
            throw {error: "RuntimeError",message: "color functions take numbers as parameters"}
        }
        function o(e) {
            return Math.min(1, Math.max(0, e))
        }
        e.functions = {rgb: function(e, t, i) {
                return this.rgba(e, t, i, 1)
            },rgba: function(t, o, r, s) {
                var a = [t, o, r].map(function(e) {
                    return i(e, 256)
                });
                return s = n(s), new e.Color(a, s)
            },hsl: function(e, t, i) {
                return this.hsla(e, t, i, 1)
            },hsla: function(e, t, i, o) {
                function r(e) {
                    return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 1 > 6 * e ? a + (s - a) * e * 6 : 1 > 2 * e ? s : 2 > 3 * e ? a + (s - a) * (2 / 3 - e) * 6 : a
                }
                e = n(e) % 360 / 360, t = n(t), i = n(i), o = n(o);
                var s = .5 >= i ? i * (t + 1) : i + t - i * t, a = 2 * i - s;
                return this.rgba(255 * r(e + 1 / 3), 255 * r(e), 255 * r(e - 1 / 3), o)
            },hsv: function(e, t, i) {
                return this.hsva(e, t, i, 1)
            },hsva: function(e, t, i, o) {
                e = n(e) % 360 / 360 * 360, t = n(t), i = n(i), o = n(o);
                var r, s;
                r = Math.floor(e / 60 % 6), s = e / 60 - r;
                var a = [i, i * (1 - t), i * (1 - s * t), i * (1 - (1 - s) * t)], l = [[0, 3, 1], [2, 0, 1], [1, 0, 3], [1, 2, 0], [3, 1, 0], [0, 1, 2]];
                return this.rgba(255 * a[l[r][0]], 255 * a[l[r][1]], 255 * a[l[r][2]], o)
            },hue: function(t) {
                return new e.Dimension(Math.round(t.toHSL().h))
            },saturation: function(t) {
                return new e.Dimension(Math.round(100 * t.toHSL().s), "%")
            },lightness: function(t) {
                return new e.Dimension(Math.round(100 * t.toHSL().l), "%")
            },red: function(t) {
                return new e.Dimension(t.rgb[0])
            },green: function(t) {
                return new e.Dimension(t.rgb[1])
            },blue: function(t) {
                return new e.Dimension(t.rgb[2])
            },alpha: function(t) {
                return new e.Dimension(t.toHSL().a)
            },luma: function(t) {
                return new e.Dimension(Math.round((.2126 * (t.rgb[0] / 255) + .7152 * (t.rgb[1] / 255) + .0722 * (t.rgb[2] / 255)) * t.alpha * 100), "%")
            },saturate: function(e, i) {
                var n = e.toHSL();
                return n.s += i.value / 100, n.s = o(n.s), t(n)
            },desaturate: function(e, i) {
                var n = e.toHSL();
                return n.s -= i.value / 100, n.s = o(n.s), t(n)
            },lighten: function(e, i) {
                var n = e.toHSL();
                return n.l += i.value / 100, n.l = o(n.l), t(n)
            },darken: function(e, i) {
                var n = e.toHSL();
                return n.l -= i.value / 100, n.l = o(n.l), t(n)
            },fadein: function(e, i) {
                var n = e.toHSL();
                return n.a += i.value / 100, n.a = o(n.a), t(n)
            },fadeout: function(e, i) {
                var n = e.toHSL();
                return n.a -= i.value / 100, n.a = o(n.a), t(n)
            },fade: function(e, i) {
                var n = e.toHSL();
                return n.a = i.value / 100, n.a = o(n.a), t(n)
            },spin: function(e, i) {
                var n = e.toHSL(), o = (n.h + i.value) % 360;
                return n.h = 0 > o ? 360 + o : o, t(n)
            },mix: function(t, i, n) {
                n || (n = new e.Dimension(50));
                var o = n.value / 100, r = 2 * o - 1, s = t.toHSL().a - i.toHSL().a, a = ((r * s == -1 ? r : (r + s) / (1 + r * s)) + 1) / 2, l = 1 - a, c = [t.rgb[0] * a + i.rgb[0] * l, t.rgb[1] * a + i.rgb[1] * l, t.rgb[2] * a + i.rgb[2] * l], h = t.alpha * o + i.alpha * (1 - o);
                return new e.Color(c, h)
            },greyscale: function(t) {
                return this.desaturate(t, new e.Dimension(100))
            },contrast: function(e, t, i, n) {
                return e.rgb ? ("undefined" == typeof i && (i = this.rgba(255, 255, 255, 1)), "undefined" == typeof t && (t = this.rgba(0, 0, 0, 1)), n = "undefined" == typeof n ? .43 : n.value, (.2126 * (e.rgb[0] / 255) + .7152 * (e.rgb[1] / 255) + .0722 * (e.rgb[2] / 255)) * e.alpha < n ? i : t) : null
            },e: function(t) {
                return new e.Anonymous(t instanceof e.JavaScript ? t.evaluated : t)
            },escape: function(t) {
                return new e.Anonymous(encodeURI(t.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"))
            },"%": function(t) {
                for (var i = Array.prototype.slice.call(arguments, 1), n = t.value, o = 0; o < i.length; o++)
                    n = n.replace(/%[sda]/i, function(e) {
                        var t = e.match(/s/i) ? i[o].value : i[o].toCSS();
                        return e.match(/[A-Z]$/) ? encodeURIComponent(t) : t
                    });
                return n = n.replace(/%%/g, "%"), new e.Quoted('"' + n + '"', n)
            },unit: function(t, i) {
                return new e.Dimension(t.value, i ? i.toCSS() : "")
            },round: function(e, t) {
                var i = "undefined" == typeof t ? 0 : t.value;
                return this._math(function(e) {
                    return e.toFixed(i)
                }, e)
            },ceil: function(e) {
                return this._math(Math.ceil, e)
            },floor: function(e) {
                return this._math(Math.floor, e)
            },_math: function(t, i) {
                if (i instanceof e.Dimension)
                    return new e.Dimension(t(parseFloat(i.value)), i.unit);
                if ("number" == typeof i)
                    return t(i);
                throw {type: "Argument",message: "argument must be a number"}
            },argb: function(t) {
                return new e.Anonymous(t.toARGB())
            },percentage: function(t) {
                return new e.Dimension(100 * t.value, "%")
            },color: function(t) {
                if (t instanceof e.Quoted)
                    return new e.Color(t.value.slice(1));
                throw {type: "Argument",message: "argument must be a string"}
            },iscolor: function(t) {
                return this._isa(t, e.Color)
            },isnumber: function(t) {
                return this._isa(t, e.Dimension)
            },isstring: function(t) {
                return this._isa(t, e.Quoted)
            },iskeyword: function(t) {
                return this._isa(t, e.Keyword)
            },isurl: function(t) {
                return this._isa(t, e.URL)
            },ispixel: function(t) {
                return t instanceof e.Dimension && "px" === t.unit ? e.True : e.False
            },ispercentage: function(t) {
                return t instanceof e.Dimension && "%" === t.unit ? e.True : e.False
            },isem: function(t) {
                return t instanceof e.Dimension && "em" === t.unit ? e.True : e.False
            },_isa: function(t, i) {
                return t instanceof i ? e.True : e.False
            },multiply: function(e, t) {
                var i = e.rgb[0] * t.rgb[0] / 255, n = e.rgb[1] * t.rgb[1] / 255, o = e.rgb[2] * t.rgb[2] / 255;
                return this.rgb(i, n, o)
            },screen: function(e, t) {
                var i = 255 - (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255, n = 255 - (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255, o = 255 - (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255;
                return this.rgb(i, n, o)
            },overlay: function(e, t) {
                var i = e.rgb[0] < 128 ? 2 * e.rgb[0] * t.rgb[0] / 255 : 255 - 2 * (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255, n = e.rgb[1] < 128 ? 2 * e.rgb[1] * t.rgb[1] / 255 : 255 - 2 * (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255, o = e.rgb[2] < 128 ? 2 * e.rgb[2] * t.rgb[2] / 255 : 255 - 2 * (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255;
                return this.rgb(i, n, o)
            },softlight: function(e, t) {
                var i = t.rgb[0] * e.rgb[0] / 255, n = i + e.rgb[0] * (255 - (255 - e.rgb[0]) * (255 - t.rgb[0]) / 255 - i) / 255;
                i = t.rgb[1] * e.rgb[1] / 255;
                var o = i + e.rgb[1] * (255 - (255 - e.rgb[1]) * (255 - t.rgb[1]) / 255 - i) / 255;
                i = t.rgb[2] * e.rgb[2] / 255;
                var r = i + e.rgb[2] * (255 - (255 - e.rgb[2]) * (255 - t.rgb[2]) / 255 - i) / 255;
                return this.rgb(n, o, r)
            },hardlight: function(e, t) {
                var i = t.rgb[0] < 128 ? 2 * t.rgb[0] * e.rgb[0] / 255 : 255 - 2 * (255 - t.rgb[0]) * (255 - e.rgb[0]) / 255, n = t.rgb[1] < 128 ? 2 * t.rgb[1] * e.rgb[1] / 255 : 255 - 2 * (255 - t.rgb[1]) * (255 - e.rgb[1]) / 255, o = t.rgb[2] < 128 ? 2 * t.rgb[2] * e.rgb[2] / 255 : 255 - 2 * (255 - t.rgb[2]) * (255 - e.rgb[2]) / 255;
                return this.rgb(i, n, o)
            },difference: function(e, t) {
                var i = Math.abs(e.rgb[0] - t.rgb[0]), n = Math.abs(e.rgb[1] - t.rgb[1]), o = Math.abs(e.rgb[2] - t.rgb[2]);
                return this.rgb(i, n, o)
            },exclusion: function(e, t) {
                var i = e.rgb[0] + t.rgb[0] * (255 - e.rgb[0] - e.rgb[0]) / 255, n = e.rgb[1] + t.rgb[1] * (255 - e.rgb[1] - e.rgb[1]) / 255, o = e.rgb[2] + t.rgb[2] * (255 - e.rgb[2] - e.rgb[2]) / 255;
                return this.rgb(i, n, o)
            },average: function(e, t) {
                var i = (e.rgb[0] + t.rgb[0]) / 2, n = (e.rgb[1] + t.rgb[1]) / 2, o = (e.rgb[2] + t.rgb[2]) / 2;
                return this.rgb(i, n, o)
            },negation: function(e, t) {
                var i = 255 - Math.abs(255 - t.rgb[0] - e.rgb[0]), n = 255 - Math.abs(255 - t.rgb[1] - e.rgb[1]), o = 255 - Math.abs(255 - t.rgb[2] - e.rgb[2]);
                return this.rgb(i, n, o)
            },tint: function(e, t) {
                return this.mix(this.rgb(255, 255, 255), e, t)
            },shade: function(e, t) {
                return this.mix(this.rgb(0, 0, 0), e, t)
            }
        }
    }(t("./tree")), function(e) {
        e.colors = {aliceblue: "#f0f8ff",antiquewhite: "#faebd7",aqua: "#00ffff",aquamarine: "#7fffd4",azure: "#f0ffff",beige: "#f5f5dc",bisque: "#ffe4c4",black: "#000000",blanchedalmond: "#ffebcd",blue: "#0000ff",blueviolet: "#8a2be2",brown: "#a52a2a",burlywood: "#deb887",cadetblue: "#5f9ea0",chartreuse: "#7fff00",chocolate: "#d2691e",coral: "#ff7f50",cornflowerblue: "#6495ed",cornsilk: "#fff8dc",crimson: "#dc143c",cyan: "#00ffff",
        darkblue: "#00008b",darkcyan: "#008b8b",darkgoldenrod: "#b8860b",darkgray: "#a9a9a9",darkgrey: "#a9a9a9",darkgreen: "#006400",darkkhaki: "#bdb76b",darkmagenta: "#8b008b",darkolivegreen: "#556b2f",darkorange: "#ff8c00",darkorchid: "#9932cc",darkred: "#8b0000",darksalmon: "#e9967a",darkseagreen: "#8fbc8f",darkslateblue: "#483d8b",darkslategray: "#2f4f4f",darkslategrey: "#2f4f4f",darkturquoise: "#00ced1",darkviolet: "#9400d3",
        deeppink: "#ff1493",deepskyblue: "#00bfff",dimgray: "#696969",dimgrey: "#696969",dodgerblue: "#1e90ff",firebrick: "#b22222",floralwhite: "#fffaf0",forestgreen: "#228b22",fuchsia: "#ff00ff",gainsboro: "#dcdcdc",ghostwhite: "#f8f8ff",gold: "#ffd700",goldenrod: "#daa520",gray: "#808080",grey: "#808080",green: "#008000",greenyellow: "#adff2f",honeydew: "#f0fff0",hotpink: "#ff69b4",indianred: "#cd5c5c",indigo: "#4b0082",ivory: "#fffff0",khaki: "#f0e68c",
        lavender: "#e6e6fa",lavenderblush: "#fff0f5",lawngreen: "#7cfc00",lemonchiffon: "#fffacd",lightblue: "#add8e6",lightcoral: "#f08080",lightcyan: "#e0ffff",lightgoldenrodyellow: "#fafad2",lightgray: "#d3d3d3",lightgrey: "#d3d3d3",lightgreen: "#90ee90",lightpink: "#ffb6c1",lightsalmon: "#ffa07a",lightseagreen: "#20b2aa",lightskyblue: "#87cefa",lightslategray: "#778899",lightslategrey: "#778899",lightsteelblue: "#b0c4de",lightyellow: "#ffffe0",
        lime: "#00ff00",limegreen: "#32cd32",linen: "#faf0e6",magenta: "#ff00ff",maroon: "#800000",mediumaquamarine: "#66cdaa",mediumblue: "#0000cd",mediumorchid: "#ba55d3",mediumpurple: "#9370d8",mediumseagreen: "#3cb371",mediumslateblue: "#7b68ee",mediumspringgreen: "#00fa9a",mediumturquoise: "#48d1cc",mediumvioletred: "#c71585",midnightblue: "#191970",mintcream: "#f5fffa",mistyrose: "#ffe4e1",moccasin: "#ffe4b5",navajowhite: "#ffdead",navy: "#000080",oldlace: "#fdf5e6",
        olive: "#808000",olivedrab: "#6b8e23",orange: "#ffa500",orangered: "#ff4500",orchid: "#da70d6",palegoldenrod: "#eee8aa",palegreen: "#98fb98",paleturquoise: "#afeeee",palevioletred: "#d87093",papayawhip: "#ffefd5",peachpuff: "#ffdab9",peru: "#cd853f",pink: "#ffc0cb",plum: "#dda0dd",powderblue: "#b0e0e6",purple: "#800080",red: "#ff0000",rosybrown: "#bc8f8f",royalblue: "#4169e1",saddlebrown: "#8b4513",salmon: "#fa8072",sandybrown: "#f4a460",seagreen: "#2e8b57",seashell: "#fff5ee",
        sienna: "#a0522d",silver: "#c0c0c0",skyblue: "#87ceeb",slateblue: "#6a5acd",slategray: "#708090",slategrey: "#708090",snow: "#fffafa",springgreen: "#00ff7f",steelblue: "#4682b4",tan: "#d2b48c",teal: "#008080",thistle: "#d8bfd8",tomato: "#ff6347",turquoise: "#40e0d0",violet: "#ee82ee",wheat: "#f5deb3",white: "#ffffff",whitesmoke: "#f5f5f5",yellow: "#ffff00",yellowgreen: "#9acd32"
        }
    }(t("./tree")), function(e) {
        e.Alpha = function(e) {
            this.value = e
        }, e.Alpha.prototype = {toCSS: function() {
                return "alpha(opacity=" + (this.value.toCSS ? this.value.toCSS() : this.value) + ")"
            },eval: function(e) {
                return this.value.eval && (this.value = this.value.eval(e)), this
            }}
    }(t("../tree")), function(e) {
        e.Anonymous = function(e) {
            this.value = e.value || e
        }, e.Anonymous.prototype = {toCSS: function() {
                return this.value
            },eval: function() {
                return this
            },compare: function(e) {
                if (!e.toCSS)
                    return -1;
                var t = this.toCSS(), i = e.toCSS();
                return t === i ? 0 : i > t ? -1 : 1
            }
        }
    }(t("../tree")), function(e) {
        e.Assignment = function(e, t) {
            this.key = e, this.value = t
        }, e.Assignment.prototype = {toCSS: function() {
                return this.key + "=" + (this.value.toCSS ? this.value.toCSS() : this.value)
            },eval: function(t) {
                return this.value.eval ? new e.Assignment(this.key, this.value.eval(t)) : this
            }}
    }(t("../tree")), function(e) {
        e.Call = function(e, t, i, n) {
            this.name = e, this.args = t, this.index = i, this.filename = n
        }, e.Call.prototype = {eval: function(t) {
                var i, n = this.args.map(function(e) {
                    return e.eval(t)
                });
                if (this.name in e.functions)
                    try {
                        if (i = e.functions[this.name].apply(e.functions, n), null != i)
                            return i
                    } catch (o) {
                        throw {type: o.type || "Runtime",message: "error evaluating function `" + this.name + "`" + (o.message ? ": " + o.message : ""),index: this.index,filename: this.filename}
                    }
                return new e.Anonymous(this.name + "(" + n.map(function(e) {
                    return e.toCSS(t)
                }).join(", ") + ")")
            },toCSS: function(e) {
                return this.eval(e).toCSS()
            }
        }
    }(t("../tree")), function(e) {
        e.Color = function(e, t) {
            this.rgb = Array.isArray(e) ? e : 6 == e.length ? e.match(/.{2}/g).map(function(e) {
                return parseInt(e, 16)
            }) : e.split("").map(function(e) {
                return parseInt(e + e, 16)
            }), this.alpha = "number" == typeof t ? t : 1
        }, e.Color.prototype = {
            eval: function() {
                return this
            },toCSS: function() {
                return this.alpha < 1 ? "rgba(" + this.rgb.map(function(e) {
                    return Math.round(e)
                }).concat(this.alpha).join(", ") + ")" : "#" + this.rgb.map(function(e) {
                    return e = Math.round(e), e = (e > 255 ? 255 : 0 > e ? 0 : e).toString(16), 1 === e.length ? "0" + e : e
                }).join("")
            },operate: function(t, i) {
                var n = [];
                i instanceof e.Color || (i = i.toColor());
                for (var o = 0; 3 > o; o++)
                    n[o] = e.operate(t, this.rgb[o], i.rgb[o]);
                return new e.Color(n, this.alpha + i.alpha)
            },toHSL: function() {
                var e, t, i = this.rgb[0] / 255, n = this.rgb[1] / 255, o = this.rgb[2] / 255, r = this.alpha, s = Math.max(i, n, o), a = Math.min(i, n, o), l = (s + a) / 2, c = s - a;
                if (s === a)
                    e = t = 0;
                else {
                    switch (t = l > .5 ? c / (2 - s - a) : c / (s + a), s) {
                        case i:
                            e = (n - o) / c + (o > n ? 6 : 0);
                            break;
                        case n:
                            e = (o - i) / c + 2;
                            break;
                        case o:
                            e = (i - n) / c + 4
                    }
                    e /= 6
                }
                return {h: 360 * e,s: t,l: l,a: r}
            },toARGB: function() {
                var e = [Math.round(255 * this.alpha)].concat(this.rgb);
                return "#" + e.map(function(e) {
                    return e = Math.round(e), e = (e > 255 ? 255 : 0 > e ? 0 : e).toString(16), 1 === e.length ? "0" + e : e
                }).join("")
            },compare: function(e) {
                return e.rgb && e.rgb[0] === this.rgb[0] && e.rgb[1] === this.rgb[1] && e.rgb[2] === this.rgb[2] && e.alpha === this.alpha ? 0 : -1
            }
        }
    }(t("../tree")), function(e) {
        e.Comment = function(e, t) {
            this.value = e, this.silent = !!t
        }, e.Comment.prototype = {toCSS: function(e) {
                return e.compress ? "" : this.value
            },eval: function() {
                return this
            }}
    }(t("../tree")), function(e) {
        e.Condition = function(e, t, i, n, o) {
            this.op = e.trim(), this.lvalue = t, this.rvalue = i, this.index = n, this.negate = o
        }, e.Condition.prototype.eval = function(e) {
            var t, i = this.lvalue.eval(e), n = this.rvalue.eval(e), o = this.index, t = function(e) {
                switch (e) {
                    case "and":
                        return i && n;
                    case "or":
                        return i || n;
                    default:
                        if (i.compare)
                            t = i.compare(n);
                        else {
                            if (!n.compare)
                                throw {type: "Type",message: "Unable to perform comparison",index: o};
                            t = n.compare(i)
                        }
                        switch (t) {
                            case -1:
                                return "<" === e || "=<" === e;
                            case 0:
                                return "=" === e || ">=" === e || "=<" === e;
                            case 1:
                                return ">" === e || ">=" === e
                        }
                }
            }(this.op);
            return this.negate ? !t : t
        }
    }(t("../tree")), function(e) {
        e.Dimension = function(e, t) {
            this.value = parseFloat(e), this.unit = t || null
        }, e.Dimension.prototype = {eval: function() {
                return this
            },toColor: function() {
                return new e.Color([this.value, this.value, this.value])
            },toCSS: function() {
                var e = this.value + this.unit;
                return e
            },operate: function(t, i) {
                return new e.Dimension(e.operate(t, this.value, i.value), this.unit || i.unit)
            },compare: function(t) {
                return t instanceof e.Dimension ? t.value > this.value ? -1 : t.value < this.value ? 1 : t.unit && this.unit !== t.unit ? -1 : 0 : -1
            }
        }
    }(t("../tree")), function(e) {
        e.Directive = function(t, i) {
            this.name = t, Array.isArray(i) ? (this.ruleset = new e.Ruleset([], i), this.ruleset.allowImports = !0) : this.value = i
        }, e.Directive.prototype = {toCSS: function(e, t) {
                return this.ruleset ? (this.ruleset.root = !0, this.name + (t.compress ? "{" : " {\n  ") + this.ruleset.toCSS(e, t).trim().replace(/\n/g, "\n  ") + (t.compress ? "}" : "\n}\n")) : this.name + " " + this.value.toCSS() + ";\n"
            },eval: function(t) {
                var i = this;
                return this.ruleset && (t.frames.unshift(this), i = new e.Directive(this.name), i.ruleset = this.ruleset.eval(t), t.frames.shift()), i
            },variable: function(t) {
                return e.Ruleset.prototype.variable.call(this.ruleset, t)
            },find: function() {
                return e.Ruleset.prototype.find.apply(this.ruleset, arguments)
            },rulesets: function() {
                return e.Ruleset.prototype.rulesets.apply(this.ruleset)
            }}
    }(t("../tree")), function(e) {
        e.Element = function(t, i, n) {
            this.combinator = t instanceof e.Combinator ? t : new e.Combinator(t), this.value = "string" == typeof i ? i.trim() : i ? i : "", this.index = n
        }, e.Element.prototype.eval = function(t) {
            return new e.Element(this.combinator, this.value.eval ? this.value.eval(t) : this.value, this.index)
        }, e.Element.prototype.toCSS = function(e) {
            var t = this.value.toCSS ? this.value.toCSS(e) : this.value;
            return "" == t && "&" == this.combinator.value.charAt(0) ? "" : this.combinator.toCSS(e || {}) + t
        }, e.Combinator = function(e) {
            this.value = " " === e ? " " : e ? e.trim() : ""
        }, e.Combinator.prototype.toCSS = function(e) {
            return {"": ""," ": " ",":": " :","+": e.compress ? "+" : " + ","~": e.compress ? "~" : " ~ ",">": e.compress ? ">" : " > ","|": e.compress ? "|" : " | "}[this.value]
        }
    }(t("../tree")), function(e) {
        e.Expression = function(e) {
            this.value = e
        }, e.Expression.prototype = {eval: function(t) {
                return this.value.length > 1 ? new e.Expression(this.value.map(function(e) {
                    return e.eval(t)
                })) : 1 === this.value.length ? this.value[0].eval(t) : this
            },toCSS: function(e) {
                return this.value.map(function(t) {
                    return t.toCSS ? t.toCSS(e) : ""
                }).join(" ")
            }}
    }(t("../tree")), function(e) {
        e.Import = function(t, i, n, o, r, s) {
            var a = this;
            this.once = o, this.index = r, this._path = t, this.features = n && new e.Value(n), this.rootpath = s, this.path = t instanceof e.Quoted ? /(\.[a-z]*$)|([\?;].*)$/.test(t.value) ? t.value : t.value + ".less" : t.value.value || t.value, this.css = /css([\?;].*)?$/.test(this.path), this.css || i.push(this.path, function(t, i, n) {
                t && (t.index = r), n && a.once && (a.skip = n), a.root = i || new e.Ruleset([], [])
            })
        }, e.Import.prototype = {toCSS: function(e) {
                var t = this.features ? " " + this.features.toCSS(e) : "";
                return this.css ? ("string" == typeof this._path.value && !/^(?:[a-z-]+:|\/)/.test(this._path.value) && (this._path.value = this.rootpath + this._path.value), "@import " + this._path.toCSS() + t + ";\n") : ""
            },eval: function(t) {
                {
                    var i;
                    this.features && this.features.eval(t)
                }
                return this.skip ? [] : this.css ? this : (i = new e.Ruleset([], this.root.rules.slice(0)), i.evalImports(t), this.features ? new e.Media(i.rules, this.features.value) : i.rules)
            }}
    }(t("../tree")), function(e) {
        e.JavaScript = function(e, t, i) {
            this.escaped = i, this.expression = e, this.index = t
        }, e.JavaScript.prototype = {eval: function(t) {
                var i, n = this, o = {}, r = this.expression.replace(/@\{([\w-]+)\}/g, function(i, o) {
                    return e.jsify(new e.Variable("@" + o, n.index).eval(t))
                });
                try {
                    r = new Function("return (" + r + ")")
                } catch (s) {
                    throw {message: "JavaScript evaluation error: `" + r + "`",index: this.index}
                }
                for (var a in t.frames[0].variables())
                    o[a.slice(1)] = {value: t.frames[0].variables()[a].value,toJS: function() {
                            return this.value.eval(t).toCSS()
                        }};
                try {
                    i = r.call(o)
                } catch (s) {
                    throw {message: "JavaScript evaluation error: '" + s.name + ": " + s.message + "'",index: this.index}
                }
                return "string" == typeof i ? new e.Quoted('"' + i + '"', i, this.escaped, this.index) : new e.Anonymous(Array.isArray(i) ? i.join(", ") : i)
            }}
    }(t("../tree")), function(e) {
        e.Keyword = function(e) {
            this.value = e
        }, e.Keyword.prototype = {eval: function() {
                return this
            },toCSS: function() {
                return this.value
            },compare: function(t) {
                return t instanceof e.Keyword ? t.value === this.value ? 0 : 1 : -1
            }}, e.True = new e.Keyword("true"), e.False = new e.Keyword("false")
    }(t("../tree")), function(e) {
        e.Media = function(t, i) {
            var n = this.emptySelectors();
            this.features = new e.Value(i), this.ruleset = new e.Ruleset(n, t), this.ruleset.allowImports = !0
        }, e.Media.prototype = {toCSS: function(e, t) {
                var i = this.features.toCSS(t);
                return this.ruleset.root = 0 === e.length || e[0].multiMedia, "@media " + i + (t.compress ? "{" : " {\n  ") + this.ruleset.toCSS(e, t).trim().replace(/\n/g, "\n  ") + (t.compress ? "}" : "\n}\n")
            },eval: function(t) {
                t.mediaBlocks || (t.mediaBlocks = [], t.mediaPath = []);
                var i = new e.Media([], []);
                return this.debugInfo && (this.ruleset.debugInfo = this.debugInfo, i.debugInfo = this.debugInfo), i.features = this.features.eval(t), t.mediaPath.push(i), t.mediaBlocks.push(i), t.frames.unshift(this.ruleset), i.ruleset = this.ruleset.eval(t), t.frames.shift(), t.mediaPath.pop(), 0 === t.mediaPath.length ? i.evalTop(t) : i.evalNested(t)
            },variable: function(t) {
                return e.Ruleset.prototype.variable.call(this.ruleset, t)
            },find: function() {
                return e.Ruleset.prototype.find.apply(this.ruleset, arguments)
            },rulesets: function() {
                return e.Ruleset.prototype.rulesets.apply(this.ruleset)
            },emptySelectors: function() {
                var t = new e.Element("", "&", 0);
                return [new e.Selector([t])]
            },evalTop: function(t) {
                var i = this;
                if (t.mediaBlocks.length > 1) {
                    var n = this.emptySelectors();
                    i = new e.Ruleset(n, t.mediaBlocks), i.multiMedia = !0
                }
                return delete t.mediaBlocks, delete t.mediaPath, i
            },evalNested: function(t) {
                var i, n, o = t.mediaPath.concat([this]);
                for (i = 0; i < o.length; i++)
                    n = o[i].features instanceof e.Value ? o[i].features.value : o[i].features, o[i] = Array.isArray(n) ? n : [n];
                return this.features = new e.Value(this.permute(o).map(function(t) {
                    for (t = t.map(function(t) {
                        return t.toCSS ? t : new e.Anonymous(t)
                    }), i = t.length - 1; i > 0; i--)
                        t.splice(i, 0, new e.Anonymous("and"));
                    return new e.Expression(t)
                })), new e.Ruleset([], [])
            },permute: function(e) {
                if (0 === e.length)
                    return [];
                if (1 === e.length)
                    return e[0];
                for (var t = [], i = this.permute(e.slice(1)), n = 0; n < i.length; n++)
                    for (var o = 0; o < e[0].length; o++)
                        t.push([e[0][o]].concat(i[n]));
                return t
            },bubbleSelectors: function(t) {
                this.ruleset = new e.Ruleset(t.slice(0), [this.ruleset])
            }}
    }(t("../tree")), function(e) {
        e.mixin = {}, e.mixin.Call = function(t, i, n, o, r) {
            this.selector = new e.Selector(t), this.arguments = i, this.index = n, this.filename = o, this.important = r
        }, e.mixin.Call.prototype = {eval: function(t) {
                var i, n, o, r, s, a, l, c, h = [], d = !1;
                for (o = this.arguments && this.arguments.map(function(e) {
                    return {name: e.name,value: e.value.eval(t)}
                }), r = 0; r < t.frames.length; r++)
                    if ((i = t.frames[r].find(this.selector)).length > 0) {
                        for (c = !0, s = 0; s < i.length; s++) {
                            for (n = i[s], l = !1, a = 0; a < t.frames.length; a++)
                                if (!(n instanceof e.mixin.Definition) && n === (t.frames[a].originalRuleset || t.frames[a])) {
                                    l = !0;
                                    break
                                }
                            if (!l && n.matchArgs(o, t)) {
                                if (!n.matchCondition || n.matchCondition(o, t))
                                    try {
                                        Array.prototype.push.apply(h, n.eval(t, o, this.important).rules)
                                    } catch (u) {
                                        throw {message: u.message,index: this.index,filename: this.filename,stack: u.stack}
                                    }
                                d = !0
                            }
                        }
                        if (d)
                            return h
                    }
                throw c ? {type: "Runtime",message: "No matching definition was found for `" + this.selector.toCSS().trim() + "(" + (o ? o.map(function(e) {
                        var t = "";
                        return e.name && (t += e.name + ":"), t += e.value.toCSS ? e.value.toCSS() : "???"
                    }).join(", ") : "") + ")`",index: this.index,filename: this.filename} : {type: "Name",message: this.selector.toCSS().trim() + " is undefined",index: this.index,filename: this.filename}
            }}, e.mixin.Definition = function(t, i, n, o, r) {
            this.name = t, this.selectors = [new e.Selector([new e.Element(null, t)])], this.params = i, this.condition = o, this.variadic = r, this.arity = i.length, this.rules = n, this._lookups = {}, this.required = i.reduce(function(e, t) {
                return !t.name || t.name && !t.value ? e + 1 : e
            }, 0), this.parent = e.Ruleset.prototype, this.frames = []
        }, e.mixin.Definition.prototype = {toCSS: function() {
                return ""
            },variable: function(e) {
                return this.parent.variable.call(this, e)
            },variables: function() {
                return this.parent.variables.call(this)
            },find: function() {
                return this.parent.find.apply(this, arguments)
            },rulesets: function() {
                return this.parent.rulesets.apply(this)
            },evalParams: function(t, i, n, o) {
                var r, s, a, l, c, h, d, u, p = new e.Ruleset(null, []), g = this.params.slice(0);
                if (n)
                    for (n = n.slice(0), a = 0; a < n.length; a++)
                        if (s = n[a], h = s && s.name) {
                            for (d = !1, l = 0; l < g.length; l++)
                                if (!o[l] && h === g[l].name) {
                                    o[l] = s.value.eval(t), p.rules.unshift(new e.Rule(h, s.value.eval(t))), d = !0;
                                    break
                                }
                            if (d) {
                                n.splice(a, 1), a--;
                                continue
                            }
                            throw {type: "Runtime",message: "Named argument for " + this.name + " " + n[a].name + " not found"}
                        }
                for (u = 0, a = 0; a < g.length; a++)
                    if (!o[a]) {
                        if (s = n && n[u], h = g[a].name)
                            if (g[a].variadic && n) {
                                for (r = [], l = u; l < n.length; l++)
                                    r.push(n[l].value.eval(t));
                                p.rules.unshift(new e.Rule(h, new e.Expression(r).eval(t)))
                            } else {
                                if (c = s && s.value)
                                    c = c.eval(t);
                                else {
                                    if (!g[a].value)
                                        throw {type: "Runtime",message: "wrong number of arguments for " + this.name + " (" + n.length + " for " + this.arity + ")"};
                                    c = g[a].value.eval(i)
                                }
                                p.rules.unshift(new e.Rule(h, c)), o[a] = c
                            }
                        if (g[a].variadic && n)
                            for (l = u; l < n.length; l++)
                                o[l] = n[l].value.eval(t);
                        u++
                    }
                return p
            },eval: function(t, i, n) {
                var o, r, s = [], a = this.frames.concat(t.frames), l = this.evalParams(t, {frames: a}, i, s);
                return l.rules.unshift(new e.Rule("@arguments", new e.Expression(s).eval(t))), o = n ? this.parent.makeImportant.apply(this).rules : this.rules.slice(0), r = new e.Ruleset(null, o).eval({frames: [this, l].concat(a)}), r.originalRuleset = this, r
            },matchCondition: function(e, t) {
                return this.condition && !this.condition.eval({frames: [this.evalParams(t, {frames: this.frames.concat(t.frames)}, e, [])].concat(t.frames)}) ? !1 : !0
            },matchArgs: function(e, t) {
                var i, n = e && e.length || 0;
                if (!this.variadic) {
                    if (n < this.required)
                        return !1;
                    if (n > this.params.length)
                        return !1;
                    if (this.required > 0 && n > this.params.length)
                        return !1
                }
                i = Math.min(n, this.arity);
                for (var o = 0; i > o; o++)
                    if (!this.params[o].name && !this.params[o].variadic && e[o].value.eval(t).toCSS() != this.params[o].value.eval(t).toCSS())
                        return !1;
                return !0
            }}
    }(t("../tree")), function(e) {
        e.Operation = function(e, t) {
            this.op = e.trim(), this.operands = t
        }, e.Operation.prototype.eval = function(t) {
            var i, n = this.operands[0].eval(t), o = this.operands[1].eval(t);
            if (n instanceof e.Dimension && o instanceof e.Color) {
                if ("*" !== this.op && "+" !== this.op)
                    throw {name: "OperationError",message: "Can't substract or divide a color from a number"};
                i = o, o = n, n = i
            }
            if (!n.operate)
                throw {name: "OperationError",message: "Operation on an invalid type"};
            return n.operate(this.op, o)
        }, e.operate = function(e, t, i) {
            switch (e) {
                case "+":
                    return t + i;
                case "-":
                    return t - i;
                case "*":
                    return t * i;
                case "/":
                    return t / i
            }
        }
    }(t("../tree")), function(e) {
        e.Paren = function(e) {
            this.value = e
        }, e.Paren.prototype = {toCSS: function(e) {
                return "(" + this.value.toCSS(e) + ")"
            },eval: function(t) {
                return new e.Paren(this.value.eval(t))
            }}
    }(t("../tree")), function(e) {
        e.Quoted = function(e, t, i, n) {
            this.escaped = i, this.value = t || "", this.quote = e.charAt(0), this.index = n
        }, e.Quoted.prototype = {toCSS: function() {
                return this.escaped ? this.value : this.quote + this.value + this.quote
            },eval: function(t) {
                var i = this, n = this.value.replace(/`([^`]+)`/g, function(n, o) {
                    return new e.JavaScript(o, i.index, !0).eval(t).value
                }).replace(/@\{([\w-]+)\}/g, function(n, o) {
                    var r = new e.Variable("@" + o, i.index).eval(t);
                    return r instanceof e.Quoted ? r.value : r.toCSS()
                });
                return new e.Quoted(this.quote + n + this.quote, n, this.escaped, this.index)
            },compare: function(e) {
                if (!e.toCSS)
                    return -1;
                var t = this.toCSS(), i = e.toCSS();
                return t === i ? 0 : i > t ? -1 : 1
            }}
    }(t("../tree")), function(e) {
        e.Ratio = function(e) {
            this.value = e
        }, e.Ratio.prototype = {toCSS: function() {
                return this.value
            },eval: function() {
                return this
            }}
    }(t("../tree")), function(e) {
        e.Rule = function(t, i, n, o, r) {
            this.name = t, this.value = i instanceof e.Value ? i : new e.Value([i]), this.important = n ? " " + n.trim() : "", this.index = o, this.inline = r || !1, this.variable = "@" === t.charAt(0) ? !0 : !1
        }, e.Rule.prototype.toCSS = function(e) {
            return this.variable ? "" : this.name + (e.compress ? ":" : ": ") + this.value.toCSS(e) + this.important + (this.inline ? "" : ";")
        }, e.Rule.prototype.eval = function(t) {
            return new e.Rule(this.name, this.value.eval(t), this.important, this.index, this.inline)
        }, e.Rule.prototype.makeImportant = function() {
            return new e.Rule(this.name, this.value, "!important", this.index, this.inline)
        }, e.Shorthand = function(e, t) {
            this.a = e, this.b = t
        }, e.Shorthand.prototype = {toCSS: function(e) {
                return this.a.toCSS(e) + "/" + this.b.toCSS(e)
            },eval: function() {
                return this
            }}
    }(t("../tree")), function(e) {
        e.Ruleset = function(e, t, i) {
            this.selectors = e, this.rules = t, this._lookups = {}, this.strictImports = i
        }, e.Ruleset.prototype = {eval: function(t) {
                var i, n = this.selectors && this.selectors.map(function(e) {
                    return e.eval(t)
                }), o = new e.Ruleset(n, this.rules.slice(0), this.strictImports);
                o.originalRuleset = this, o.root = this.root, o.allowImports = this.allowImports, this.debugInfo && (o.debugInfo = this.debugInfo), t.frames.unshift(o), (o.root || o.allowImports || !o.strictImports) && o.evalImports(t);
                for (var r = 0; r < o.rules.length; r++)
                    o.rules[r] instanceof e.mixin.Definition && (o.rules[r].frames = t.frames.slice(0));
                for (var s = t.mediaBlocks && t.mediaBlocks.length || 0, r = 0; r < o.rules.length; r++)
                    o.rules[r] instanceof e.mixin.Call && (i = o.rules[r].eval(t), o.rules.splice.apply(o.rules, [r, 1].concat(i)), r += i.length - 1, o.resetCache());
                for (var a, r = 0; r < o.rules.length; r++)
                    a = o.rules[r], a instanceof e.mixin.Definition || (o.rules[r] = a.eval ? a.eval(t) : a);
                if (t.frames.shift(), t.mediaBlocks)
                    for (var r = s; r < t.mediaBlocks.length; r++)
                        t.mediaBlocks[r].bubbleSelectors(n);
                return o
            },evalImports: function(t) {
                var i, n;
                for (i = 0; i < this.rules.length; i++)
                    this.rules[i] instanceof e.Import && (n = this.rules[i].eval(t), "number" == typeof n.length ? (this.rules.splice.apply(this.rules, [i, 1].concat(n)), i += n.length - 1) : this.rules.splice(i, 1, n), this.resetCache())
            },makeImportant: function() {
                return new e.Ruleset(this.selectors, this.rules.map(function(e) {
                    return e.makeImportant ? e.makeImportant() : e
                }), this.strictImports)
            },matchArgs: function(e) {
                return !e || 0 === e.length
            },resetCache: function() {
                this._rulesets = null, this._variables = null, this._lookups = {}
            },variables: function() {
                return this._variables ? this._variables : this._variables = this.rules.reduce(function(t, i) {
                    return i instanceof e.Rule && i.variable === !0 && (t[i.name] = i), t
                }, {})
            },variable: function(e) {
                return this.variables()[e]
            },rulesets: function() {
                return this._rulesets ? this._rulesets : this._rulesets = this.rules.filter(function(t) {
                    return t instanceof e.Ruleset || t instanceof e.mixin.Definition
                })
            },find: function(t, i) {
                i = i || this;
                var n, o = [], r = t.toCSS();
                return r in this._lookups ? this._lookups[r] : (this.rulesets().forEach(function(r) {
                    if (r !== i)
                        for (var s = 0; s < r.selectors.length; s++)
                            if (n = t.match(r.selectors[s])) {
                                t.elements.length > r.selectors[s].elements.length ? Array.prototype.push.apply(o, r.find(new e.Selector(t.elements.slice(1)), i)) : o.push(r);
                                break
                            }
                }), this._lookups[r] = o)
            },toCSS: function(t, i) {
                var n, o, r, s = [], a = [], l = [], c = [], h = [];
                this.root || this.joinSelectors(h, t, this.selectors);
                for (var d = 0; d < this.rules.length; d++)
                    if (r = this.rules[d], r.rules || r instanceof e.Media)
                        c.push(r.toCSS(h, i));
                    else if (r instanceof e.Directive) {
                        var u = r.toCSS(h, i);
                        if ("@charset" === r.name) {
                            if (i.charset) {
                                r.debugInfo && (c.push(e.debugInfo(i, r)), c.push(new e.Comment("/* " + u.replace(/\n/g, "") + " */\n").toCSS(i)));
                                continue
                            }
                            i.charset = !0
                        }
                        c.push(u)
                    } else
                        r instanceof e.Comment ? r.silent || (this.root ? c.push(r.toCSS(i)) : a.push(r.toCSS(i))) : r.toCSS && !r.variable ? a.push(r.toCSS(i)) : r.value && !r.variable && a.push(r.value.toString());
                if (c = c.join(""), this.root)
                    s.push(a.join(i.compress ? "" : "\n"));
                else if (a.length > 0) {
                    o = e.debugInfo(i, this), n = h.map(function(e) {
                        return e.map(function(e) {
                            return e.toCSS(i)
                        }).join("").trim()
                    }).join(i.compress ? "," : ",\n");
                    for (var d = a.length - 1; d >= 0; d--)
                        -1 === l.indexOf(a[d]) && l.unshift(a[d]);
                    a = l, s.push(o + n + (i.compress ? "{" : " {\n  ") + a.join(i.compress ? "" : "\n  ") + (i.compress ? "}" : "\n}\n"))
                }
                return s.push(c), s.join("") + (i.compress ? "\n" : "")
            },joinSelectors: function(e, t, i) {
                for (var n = 0; n < i.length; n++)
                    this.joinSelector(e, t, i[n])
            },joinSelector: function(t, i, n) {
                var o, r, s, a, l, c, h, d, u, p, g, m, f, v, b;
                for (o = 0; o < n.elements.length; o++)
                    c = n.elements[o], "&" === c.value && (a = !0);
                if (a) {
                    for (v = [], l = [[]], o = 0; o < n.elements.length; o++)
                        if (c = n.elements[o], "&" !== c.value)
                            v.push(c);
                        else {
                            for (b = [], v.length > 0 && this.mergeElementsOnToSelectors(v, l), r = 0; r < l.length; r++)
                                if (h = l[r], 0 == i.length)
                                    h.length > 0 && (h[0].elements = h[0].elements.slice(0), h[0].elements.push(new e.Element(c.combinator, "", 0))), b.push(h);
                                else
                                    for (s = 0; s < i.length; s++)
                                        d = i[s], u = [], p = [], m = !0, h.length > 0 ? (u = h.slice(0), f = u.pop(), g = new e.Selector(f.elements.slice(0)), m = !1) : g = new e.Selector([]), d.length > 1 && (p = p.concat(d.slice(1))), d.length > 0 && (m = !1, g.elements.push(new e.Element(c.combinator, d[0].elements[0].value, 0)), g.elements = g.elements.concat(d[0].elements.slice(1))), m || u.push(g), u = u.concat(p), b.push(u);
                            l = b, v = []
                        }
                    for (v.length > 0 && this.mergeElementsOnToSelectors(v, l), o = 0; o < l.length; o++)
                        t.push(l[o])
                } else if (i.length > 0)
                    for (o = 0; o < i.length; o++)
                        t.push(i[o].concat(n));
                else
                    t.push([n])
            },mergeElementsOnToSelectors: function(t, i) {
                var n, o;
                if (0 == i.length)
                    return void i.push([new e.Selector(t)]);
                for (n = 0; n < i.length; n++)
                    o = i[n], o.length > 0 ? o[o.length - 1] = new e.Selector(o[o.length - 1].elements.concat(t)) : o.push(new e.Selector(t))
            }}
    }(t("../tree")), function(e) {
        e.Selector = function(e) {
            this.elements = e
        }, e.Selector.prototype.match = function(e) {
            var t, i, n, o, r = this.elements, s = r.length;
            if (t = e.elements.slice(e.elements.length && "&" === e.elements[0].value ? 1 : 0), i = t.length, n = Math.min(s, i), 0 === i || i > s)
                return !1;
            for (o = 0; n > o; o++)
                if (r[o].value !== t[o].value)
                    return !1;
            return !0
        }, e.Selector.prototype.eval = function(t) {
            return new e.Selector(this.elements.map(function(e) {
                return e.eval(t)
            }))
        }, e.Selector.prototype.toCSS = function(e) {
            return this._css ? this._css : (this._css = "" === this.elements[0].combinator.value ? " " : "", this._css += this.elements.map(function(t) {
                return "string" == typeof t ? " " + t.trim() : t.toCSS(e)
            }).join(""), this._css)
        }
    }(t("../tree")), function(e) {
        e.UnicodeDescriptor = function(e) {
            this.value = e
        }, e.UnicodeDescriptor.prototype = {toCSS: function() {
                return this.value
            },eval: function() {
                return this
            }}
    }(t("../tree")), function(e) {
        e.URL = function(e, t) {
            this.value = e, this.rootpath = t
        }, e.URL.prototype = {toCSS: function() {
                return "url(" + this.value.toCSS() + ")"
            },eval: function(t) {
                var i, n = this.value.eval(t);
                return "string" == typeof n.value && !/^(?:[a-z-]+:|\/)/.test(n.value) && (i = this.rootpath, n.quote || (i = i.replace(/[\(\)'"\s]/g, function(e) {
                    return "\\" + e
                })), n.value = i + n.value), new e.URL(n, this.rootpath)
            }}
    }(t("../tree")), function(e) {
        e.Value = function(e) {
            this.value = e, this.is = "value"
        }, e.Value.prototype = {eval: function(t) {
                return 1 === this.value.length ? this.value[0].eval(t) : new e.Value(this.value.map(function(e) {
                    return e.eval(t)
                }))
            },toCSS: function(e) {
                return this.value.map(function(t) {
                    return t.toCSS(e)
                }).join(e.compress ? "," : ", ")
            }}
    }(t("../tree")), function(e) {
        e.Variable = function(e, t, i) {
            this.name = e, this.index = t, this.file = i
        }, e.Variable.prototype = {eval: function(t) {
                var i, n, o = this.name;
                if (0 == o.indexOf("@@") && (o = "@" + new e.Variable(o.slice(1)).eval(t).value), this.evaluating)
                    throw {type: "Name",message: "Recursive variable definition for " + o,filename: this.file,index: this.index};
                if (this.evaluating = !0, i = e.find(t.frames, function(e) {
                    return (n = e.variable(o)) ? n.value.eval(t) : void 0
                }))
                    return this.evaluating = !1, i;
                throw {type: "Name",message: "variable " + o + " is undefined",filename: this.file,index: this.index}
            }}
    }(t("../tree")), function(e) {
        e.debugInfo = function(t, i) {
            var n = "";
            if (t.dumpLineNumbers && !t.compress)
                switch (t.dumpLineNumbers) {
                    case "comments":
                        n = e.debugInfo.asComment(i);
                        break;
                    case "mediaquery":
                        n = e.debugInfo.asMediaQuery(i);
                        break;
                    case "all":
                        n = e.debugInfo.asComment(i) + e.debugInfo.asMediaQuery(i)
                }
            return n
        }, e.debugInfo.asComment = function(e) {
            return "/* line " + e.debugInfo.lineNumber + ", " + e.debugInfo.fileName + " */\n"
        }, e.debugInfo.asMediaQuery = function(e) {
            return "@media -sass-debug-info{filename{font-family:" + ("file://" + e.debugInfo.fileName).replace(/[\/:.]/g, "\\$&") + "}line{font-family:\\00003" + e.debugInfo.lineNumber + "}}\n"
        }, e.find = function(e, t) {
            for (var i, n = 0; n < e.length; n++)
                if (i = t.call(e, e[n]))
                    return i;
            return null
        }, e.jsify = function(e) {
            return Array.isArray(e.value) && e.value.length > 1 ? "[" + e.value.map(function(e) {
                return e.toCSS(!1)
            }).join(", ") + "]" : e.toCSS(!1)
        }
    }(t("./tree"));

    var v = /^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol);
    if (m.env = m.env || ("127.0.0.1" == location.hostname || "0.0.0.0" == location.hostname || "localhost" == location.hostname || location.port.length > 0 || v ? "development" : "production"), m.async = m.async || !1, m.fileAsync = m.fileAsync || !1, m.poll = m.poll || (v ? 1e3 : 1500), m.functions)
        for (var b in m.functions)
            m.tree.functions[b] = m.functions[b];
    var w = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);
    w && (m.dumpLineNumbers = w[1]), m.watch = function() {
        return m.watchMode || (m.env = "development", i()), this.watchMode = !0
    }, m.unwatch = function() {
        return clearInterval(m.watchTimer), this.watchMode = !1
    }, /!watch/.test(location.hash) && m.watch();
    var C = null;
    if ("development" != m.env)
        try {
            C = "undefined" == typeof e.localStorage ? null : e.localStorage
        } catch (k) {
        }
    var y = document.getElementsByTagName("link"), E = /^text\/(x-)?less$/;
    m.sheets = [];
    for (var S = 0; S < y.length; S++)
        ("stylesheet/less" === y[S].rel || y[S].rel.match(/stylesheet/) && y[S].type.match(E)) && m.sheets.push(y[S]);
    var A = "";
    m.modifyVars = function(e) {
        var t = A;
        for (name in e)
            t += ("@" === name.slice(0, 1) ? "" : "@") + name + ": " + (";" === e[name].slice(-1) ? e[name] : e[name] + ";");
        (new m.Parser).parse(t, function(e, t) {
            c(t.toCSS(), m.sheets[m.sheets.length - 1])
        })
    }, m.refresh = function(e) {
        var t, i;
        t = i = new Date, o(function(e, n, o, r, s) {
            s.local ? p("loading " + r.href + " from cache.") : (p("parsed " + r.href + " successfully."), c(n.toCSS(), r, s.lastModified)), p("css for " + r.href + " generated in " + (new Date - i) + "ms"), 0 === s.remaining && p("css generated in " + (new Date - t) + "ms"), i = new Date
        }, e), n()
    }, m.refreshStyles = n, m.refresh("development" === m.env), "function" == typeof define && define.amd && define("less", [], function() {
        return m
    })
}(window), 


function(e) {
    function t(e, t, o) {
        var r = e.scrollTop;
        e.setSelectionRange ? i(e, t, o) : document.selection && n(e, t, o), e.scrollTop = r
    }
    function i(e, t, i) {
        var n = e.selectionStart, o = e.selectionEnd;
        if (n == o)
            t ? n - i.tabString == e.value.substring(n - i.tabString.length, n) ? (e.value = e.value.substring(0, n - i.tabString.length) + e.value.substring(n), e.focus(), e.setSelectionRange(n - i.tabString.length, n - i.tabString.length)) : n - i.tabString == e.value.substring(n, n + i.tabString.length) && (e.value = e.value.substring(0, n) + e.value.substring(n + i.tabString.length), e.focus(), e.setSelectionRange(n, n)) : (e.value = e.value.substring(0, n) + i.tabString + e.value.substring(n), e.focus(), e.setSelectionRange(n + i.tabString.length, n + i.tabString.length));
        else {
            for (; n < e.value.length && e.value.charAt(n).match(/[ \t]/); )
                n++;
            var r = e.value.split("\n"), s = new Array, a = 0, l = 0;
            for (var c in r)
                l = a + r[c].length, s.push({start: a,end: l,selected: n >= a && l > n || l >= o && o > a || a > n && o > l}), a = l + 1;
            var h = 0;
            for (var c in s)
                if (s[c].selected) {
                    var d = s[c].start + h;
                    t && i.tabString == e.value.substring(d, d + i.tabString.length) ? (e.value = e.value.substring(0, d) + e.value.substring(d + i.tabString.length), h -= i.tabString.length) : t || (e.value = e.value.substring(0, d) + i.tabString + e.value.substring(d), h += i.tabString.length)
                }
            e.focus();
            var u = n + (h > 0 ? i.tabString.length : 0 > h ? -i.tabString.length : 0), p = o + h;
            e.setSelectionRange(u, p)
        }
    }
    function n(t, i, n) {
        var o = document.selection.createRange();
        if (t == o.parentElement())
            if ("" == o.text)
                if (i) {
                    var r = o.getBookmark();
                    o.moveStart("character", -n.tabString.length), n.tabString == o.text ? o.text = "" : (o.moveToBookmark(r), o.moveEnd("character", n.tabString.length), n.tabString == o.text && (o.text = "")), o.collapse(!0), o.select()
                } else
                    o.text = n.tabString, o.collapse(!1), o.select();
            else {
                var s = o.text, a = s.length, l = s.split("\r\n"), c = document.body.createTextRange();
                c.moveToElementText(t), c.setEndPoint("EndToStart", o);
                var h = c.text, d = h.split("\r\n"), u = h.length, p = document.body.createTextRange();
                p.moveToElementText(t), p.setEndPoint("StartToEnd", o);
                var g = p.text, m = document.body.createTextRange();
                m.moveToElementText(t), m.setEndPoint("StartToEnd", c);
                var f = m.text, v = e(t).html();
                e("#r3").text(u + " + " + a + " + " + g.length + " = " + v.length), u + f.length < v.length ? (d.push(""), u += 2, i && n.tabString == l[0].substring(0, n.tabString.length) ? l[0] = l[0].substring(n.tabString.length) : i || (l[0] = n.tabString + l[0])) : i && n.tabString == d[d.length - 1].substring(0, n.tabString.length) ? d[d.length - 1] = d[d.length - 1].substring(n.tabString.length) : i || (d[d.length - 1] = n.tabString + d[d.length - 1]);
                for (var b = 1; b < l.length; b++)
                    i && n.tabString == l[b].substring(0, n.tabString.length) ? l[b] = l[b].substring(n.tabString.length) : i || (l[b] = n.tabString + l[b]);
                1 == d.length && 0 == u && (i && n.tabString == l[0].substring(0, n.tabString.length) ? l[0] = l[0].substring(n.tabString.length) : i || (l[0] = n.tabString + l[0])), u + a + g.length < v.length && (l.push(""), a += 2), c.text = d.join("\r\n"), o.text = l.join("\r\n");
                var w = document.body.createTextRange();
                w.moveToElementText(t), u > 0 ? w.setEndPoint("StartToEnd", c) : w.setEndPoint("StartToStart", c), w.setEndPoint("EndToEnd", o), w.select()
            }
    }
    e.fn.tabby = function(i) {
        var n = e.extend({}, e.fn.tabby.defaults, i), o = e.fn.tabby.pressed;
        return this.each(function() {
            $this = e(this);
            var i = e.meta ? e.extend({}, n, $this.data()) : n;
            $this.bind("keydown", function(n) {
                var r = e.fn.tabby.catch_kc(n);
                return 16 == r && (o.shft = !0), 17 == r && (o.ctrl = !0, setTimeout(function() {
                    e.fn.tabby.pressed.ctrl = !1
                }, 1e3)), 18 == r && (o.alt = !0, setTimeout(function() {
                    e.fn.tabby.pressed.alt = !1
                }, 1e3)), 9 != r || o.ctrl || o.alt ? void 0 : (n.preventDefault, o.last = r, setTimeout(function() {
                    e.fn.tabby.pressed.last = null
                }, 0), t(e(n.target).get(0), o.shft, i), !1)
            }).bind("keyup", function(t) {
                16 == e.fn.tabby.catch_kc(t) && (o.shft = !1)
            }).bind("blur", function(t) {
                9 == o.last && e(t.target).one("focus", function() {
                    o.last = null
                }).get(0).focus()
            })
        })
    }, e.fn.tabby.catch_kc = function(e) {
        return e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which
    }, e.fn.tabby.pressed = {shft: !1,ctrl: !1,alt: !1,last: null}, e.fn.tabby.defaults = {tabString: String.fromCharCode(9)}
}(jQuery), 

function(e) {
    var t;
    return e.event.fix = function(e) {
        return function(t) {
            return t = e.apply(this, arguments), (0 === t.type.indexOf("copy") || 0 === t.type.indexOf("paste")) && (t.clipboardData = t.originalEvent.clipboardData), t
        }
    }(e.event.fix), t = {callback: e.noop,matchType: /image.*/}, e.fn.pasteImageReader = function(i) {
        return "function" == typeof i && (i = {callback: i}), i = e.extend({}, t, i), this.each(function() {
            var t, n;
            return n = this, t = e(this), t.bind("paste", function(e) {
                var t, o;
                return o = !1, t = e.clipboardData, Array.prototype.forEach.call(t.types, function(e, r) {
                    var s, a;
                    if (!o)
                        return t.items && (e.match(i.matchType) || t.items[r].type.match(i.matchType)) ? (s = t.items[r].getAsFile(), a = new FileReader, a.onload = function(e) {
                            return i.callback.call(n, {dataURL: e.target.result,event: e,file: s,name: s.name})
                        }, a.readAsDataURL(s), o = !0) : void 0
                })
            })
        })
    }
}(jQuery), 


function() {
    var e = function(t, i) {
        var n = t.nodeType;
        if (3 == n)
            i.push(t.textContent.replace(/&/, "&amp;").replace(/</, "&lt;").replace(">", "&gt;"));
        else if (1 == n) {
            if (i.push("<", t.tagName), t.hasAttributes())
                for (var o = t.attributes, r = 0, s = o.length; s > r; ++r) {
                    var a = o.item(r);
                    i.push(" ", a.name, "='", a.value, "'")
                }
            if (t.hasChildNodes()) {
                i.push(">");
                for (var l = t.childNodes, r = 0, s = l.length; s > r; ++r)
                    e(l.item(r), i);
                i.push("</", t.tagName, ">")
            } else
                i.push("/>")
        } else {
            if (8 != n)
                throw "Error serializing XML. Unhandled node of type: " + n;
            i.push("<!--", t.nodeValue, "-->")
        }
    };
    Object.defineProperty(SVGElement.prototype, "innerHTML", {get: function() {
            for (var t = [], i = this.firstChild; i; )
                e(i, t), i = i.nextSibling;
            return t.join("")
        },set: function(e) {
            for (; this.firstChild; )
                this.removeChild(this.firstChild);
            try {
                var t = new DOMParser;
                t.async = !1, sXML = "<svg xmlns='http://www.w3.org/2000/svg'>" + e + "</svg>";
                for (var i = t.parseFromString(sXML, "text/xml").documentElement, n = i.firstChild; n; )
                    this.appendChild(this.ownerDocument.importNode(n, !0)), n = n.nextSibling
            } catch (o) {
                throw new Error("Error parsing XML string")
            }
        }
    }), Object.defineProperty(SVGElement.prototype, "innerSVG", {get: function() {
            return this.innerHTML
        },set: function(e) {
            this.innerHTML = e
        }
    })
}(), 




// katex
function(e) {
    if ("function" == typeof bootstrap)
        bootstrap("katex", e);
    else if ("object" == typeof exports)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define(e);
    else if ("undefined" != typeof ses) {
        if (!ses.ok())
            return;
        ses.makeKatex = e
    } else
        "undefined" != typeof window ? window.katex = e() : global.katex = e()
}(function() {
    return function e(t, i, n) {
        function o(s, a) {
            if (!i[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l)
                        return l(s, !0);
                    if (r)
                        return r(s, !0);
                    throw new Error("Cannot find module '" + s + "'")
                }
                var c = i[s] = {exports: {}};
                t[s][0].call(c.exports, function(e) {
                    var i = t[s][1][e];
                    return o(i ? i : e)
                }, c, c.exports, e, t, i, n)
            }
            return i[s].exports
        }
        for (var r = "function" == typeof require && require, s = 0; s < n.length; s++)
            o(n[s]);
        return o
    }({
        1: [function(e, t) {
                var i = e("./src/ParseError"), n = e("./src/buildTree"), o = e("./src/parseTree"), r = e("./src/utils"), s = function(e, t) {
                    r.clearNode(t);
                    var i = o(e), s = n(i).toNode();
                    t.appendChild(s)
                };
                "undefined" != typeof document && "CSS1Compat" !== document.compatMode && ("undefined" != typeof console && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), s = function() {
                    throw new i("KaTeX doesn't work in quirks mode.")
                });
                var a = function(e) {
                    var t = o(e);
                    return n(t).toMarkup()
                };
                t.exports = {render: s,renderToString: a,ParseError: i}
            }, {"./src/ParseError": 4,"./src/buildTree": 8,"./src/parseTree": 13,"./src/utils": 15}],
        2: [function(e, t) {
                function i(e) {
                    this._input = e
                }
                function n(e, t, i) {
                    this.text = e, this.data = t, this.position = i
                }
                var o = e("./ParseError"), r = [/^[/|@.""`0-9a-zA-Z]/, /^[*+-]/, /^[=<>:]/, /^[,;]/, /^['\^_{}]/, /^[(\[]/, /^[)\]?!]/, /^~/], s = [/^[a-zA-Z0-9`!@*()-=+\[\]'";:?\/.,]/, /^[{}]/, /^~/], a = /^\s*/, l = /^( +|\\  +)/, c = /^\\(?:[a-zA-Z]+|.)/;
                //" //some trouble
                i.prototype._innerLex = function(e, t, i) {
                    var r, s = this._input.slice(e);
                    if (i)
                        r = s.match(a)[0], e += r.length, s = s.slice(r.length);
                    else if (r = s.match(l), null !== r)
                        return new n(" ", null, e + r[0].length);
                    if (0 === s.length)
                        return new n("EOF", null, e);
                    var h;
                    if (h = s.match(c))
                        return new n(h[0], null, e + h[0].length);
                    for (var d = 0; d < t.length; d++) {
                        var u = t[d];
                        if (h = s.match(u))
                            return new n(h[0], null, e + h[0].length)
                    }
                    throw new o("Unexpected character: '" + s[0] + "'", this, e)
                };
                var h = /^(#[a-z0-9]+|[a-z]+)/i;
                i.prototype._innerLexColor = function(e) {
                    var t = this._input.slice(e), i = t.match(a)[0];
                    e += i.length, t = t.slice(i.length);
                    var r;
                    if (r = t.match(h))
                        return new n(r[0], null, e + r[0].length);
                    throw new o("Invalid color", this, e)
                };
                var d = /^(-?)\s*(\d+(?:\.\d*)?|\.\d+)\s*([a-z]{2})/;
                i.prototype._innerLexSize = function(e) {
                    var t = this._input.slice(e), i = t.match(a)[0];
                    e += i.length, t = t.slice(i.length);
                    var r;
                    if (r = t.match(d)) {
                        var s = r[3];
                        if ("em" !== s && "ex" !== s)
                            throw new o("Invalid unit: '" + s + "'", this, e);
                        return new n(r[0], {number: +(r[1] + r[2]),unit: s}, e + r[0].length)
                    }
                    throw new o("Invalid size", this, e)
                }, i.prototype._innerLexWhitespace = function(e) {
                    var t = this._input.slice(e), i = t.match(a)[0];
                    return e += i.length, new n(i, null, e)
                }, i.prototype.lex = function(e, t) {
                    return "math" === t ? this._innerLex(e, r, !0) : "text" === t ? this._innerLex(e, s, !1) : "color" === t ? this._innerLexColor(e) : "size" === t ? this._innerLexSize(e) : "whitespace" === t ? this._innerLexWhitespace(e) : void 0
                }, t.exports = i
            }, {"./ParseError": 4}],
        3: [function(e, t) {
                function i(e, t, i, n, o) {
                    this.style = e, this.color = i, this.size = t, void 0 === n && (n = e), this.parentStyle = n, void 0 === o && (o = t), this.parentSize = o
                }
                i.prototype.withStyle = function(e) {
                    return new i(e, this.size, this.color, this.style, this.size)
                }, i.prototype.withSize = function(e) {
                    return new i(this.style, e, this.color, this.style, this.size)
                }, i.prototype.withColor = function(e) {
                    return new i(this.style, this.size, e, this.style, this.size)
                }, i.prototype.reset = function() {
                    return new i(this.style, this.size, this.color, this.style, this.size)
                };
                var n = {"katex-blue": "#6495ed","katex-orange": "#ffa500","katex-pink": "#ff00af","katex-red": "#df0030","katex-green": "#28ae7b","katex-gray": "gray","katex-purple": "#9d38bd"};
                i.prototype.getColor = function() {
                    return n[this.color] || this.color
                }, t.exports = i
            }, {}],
        4: [function(e, t) {
                function i(e, t, n) {
                    var o = "KaTeX parse error: " + e;
                    if (void 0 !== t && void 0 !== n) {
                        o += " at position " + n + ": ";
                        var r = t._input;
                        r = r.slice(0, n) + "\u0332" + r.slice(n);
                        var s = Math.max(0, n - 15), a = n + 15;
                        o += r.slice(s, a)
                    }
                    var l = new Error(o);
                    return l.name = "ParseError", l.__proto__ = i.prototype, l.position = n, l
                }
                i.prototype.__proto__ = Error.prototype, t.exports = i
            }, {}],
        5: [function(e, t) {
                function i(e) {
                    this.lexer = new a(e)
                }
                function n(e, t, i) {
                    this.type = e, this.value = t, this.mode = i
                }
                function o(e, t) {
                    this.result = e, this.position = t
                }
                function r(e, t, i, n, o, r) {
                    this.result = e, this.isFunction = t, this.allowedInText = i, this.numArgs = n, this.numOptionalArgs = o, this.argTypes = r
                }
                var s = e("./functions"), a = e("./Lexer"), l = e("./symbols"), c = e("./utils"), h = e("./ParseError");
                i.prototype.expect = function(e, t) {
                    if (e.text !== t)
                        throw new h("Expected '" + t + "', got '" + e.text + "'", this.lexer, e.position)
                }, i.prototype.parse = function() {
                    var e = this.parseInput(0, "math");
                    return e.result
                }, i.prototype.parseInput = function(e, t) {
                    var i = this.parseExpression(e, t, !1, null), n = this.lexer.lex(i.position, t);
                    return this.expect(n, "EOF"), i
                }, i.prototype.parseExpression = function(e, t, i, n) {
                    for (var r = []; ; ) {
                        var s = this.lexer.lex(e, t);
                        if (null != n && s.text === n)
                            break;
                        var a = this.parseAtom(e, t);
                        if (!a)
                            break;
                        if (i && "infix" === a.result.type)
                            break;
                        r.push(a.result), e = a.position
                    }
                    return new o(this.handleInfixNodes(r, t), e)
                }, i.prototype.handleInfixNodes = function(e, t) {
                    for (var i, o, r = -1, a = 0; a < e.length; a++) {
                        var l = e[a];
                        if ("infix" === l.type) {
                            if (-1 !== r)
                                throw new h("only one infix operator per group", this.lexer, -1);
                            r = a, o = l.value.replaceWith, i = s.funcs[o]
                        }
                    }
                    if (-1 !== r) {
                        var c, d, u = e.slice(0, r), p = e.slice(r + 1);
                        c = 1 === u.length && "ordgroup" === u[0].type ? u[0] : new n("ordgroup", u, t), d = 1 === p.length && "ordgroup" === p[0].type ? p[0] : new n("ordgroup", p, t);
                        var g = i.handler(o, c, d);
                        return [new n(g.type, g, t)]
                    }
                    return e
                };
                var d = 1;
                i.prototype.handleSupSubscript = function(e, t, i, n) {
                    var o = this.parseGroup(e, t);
                    if (o) {
                        if (o.numArgs > 0) {
                            var r = s.getGreediness(o.result.result);
                            if (r > d)
                                return this.parseFunction(e, t);
                            throw new h("Got function '" + o.result.result + "' with no arguments as " + n, this.lexer, e)
                        }
                        return o.result
                    }
                    throw new h("Expected group after '" + i + "'", this.lexer, e)
                }, i.prototype.parseAtom = function(e, t) {
                    var i = this.parseImplicitGroup(e, t);
                    if ("text" === t)
                        return i;
                    var r;
                    i ? r = i.position : (r = e, i = void 0);
                    for (var s, a, l; ; ) {
                        var c = this.lexer.lex(r, t);
                        if ("^" === c.text) {
                            if (s)
                                throw new h("Double superscript", this.lexer, r);
                            l = this.handleSupSubscript(c.position, t, c.text, "superscript"), r = l.position, s = l.result
                        } else if ("_" === c.text) {
                            if (a)
                                throw new h("Double subscript", this.lexer, r);
                            l = this.handleSupSubscript(c.position, t, c.text, "subscript"), r = l.position, a = l.result
                        } else {
                            if ("'" !== c.text)
                                break;
                            var d = new n("textord", "\\prime", t), u = [d];
                            for (r = c.position; "'" === (c = this.lexer.lex(r, t)).text; )
                                u.push(d), r = c.position;
                            s = new n("ordgroup", u, t)
                        }
                    }
                    return s || a ? new o(new n("supsub", {base: i && i.result,sup: s,sub: a}, t), r) : i
                };
                var u = ["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], p = ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"];
                i.prototype.parseImplicitGroup = function(e, t) {
                    var i = this.parseSymbol(e, t);
                    if (!i || !i.result)
                        return this.parseFunction(e, t);
                    var r, s = i.result.result;
                    if ("\\left" === s) {
                        var a = this.parseFunction(e, t);
                        r = this.parseExpression(a.position, t, !1, "}");
                        var l = this.parseSymbol(r.position, t);
                        if (l && "\\right" === l.result.result) {
                            var d = this.parseFunction(r.position, t);
                            return new o(new n("leftright", {body: r.result,left: a.result.value.value,right: d.result.value.value}, t), d.position)
                        }
                        throw new h("Missing \\right", this.lexer, r.position)
                    }
                    return "\\right" === s ? null : c.contains(u, s) ? (r = this.parseExpression(i.result.position, t, !1, "}"), new o(new n("sizing", {size: "size" + (c.indexOf(u, s) + 1),value: r.result}, t), r.position)) : c.contains(p, s) ? (r = this.parseExpression(i.result.position, t, !0, "}"), new o(new n("styling", {style: s.slice(1, s.length - 5),value: r.result}, t), r.position)) : this.parseFunction(e, t)
                }, i.prototype.parseFunction = function(e, t) {
                    var i = this.parseGroup(e, t);
                    if (i) {
                        if (i.isFunction) {
                            var r = i.result.result;
                            if ("text" === t && !i.allowedInText)
                                throw new h("Can't use function '" + r + "' in text mode", this.lexer, i.position);
                            var a, l = i.result.position, c = i.numArgs + i.numOptionalArgs;
                            if (c > 0) {
                                for (var d = s.getGreediness(r), u = [r], p = [l], g = 0; c > g; g++) {
                                    var m, f = i.argTypes && i.argTypes[g];
                                    if (g < i.numOptionalArgs) {
                                        if (m = f ? this.parseSpecialGroup(l, f, t, !0) : this.parseOptionalGroup(l, t), !m) {
                                            u.push(null), p.push(l);
                                            continue
                                        }
                                    } else if (m = f ? this.parseSpecialGroup(l, f, t) : this.parseGroup(l, t), !m)
                                        throw new h("Expected group after '" + i.result.result + "'", this.lexer, l);
                                    var v;
                                    if (m.numArgs > 0) {
                                        var b = s.getGreediness(m.result.result);
                                        if (!(b > d))
                                            throw new h("Got function '" + m.result.result + "' as argument to function '" + i.result.result + "'", this.lexer, m.result.position - 1);
                                        v = this.parseFunction(l, t)
                                    } else
                                        v = m.result;
                                    u.push(v.result), p.push(v.position), l = v.position
                                }
                                u.push(p), a = s.funcs[r].handler.apply(this, u)
                            } else
                                a = s.funcs[r].handler.apply(this, [r]);
                            return new o(new n(a.type, a, t), l)
                        }
                        return i.result
                    }
                    return null
                }, i.prototype.parseSpecialGroup = function(e, t, i, s) {
                    if ("color" === t || "size" === t) {
                        var a = this.lexer.lex(e, i);
                        if (s && "[" !== a.text)
                            return null;
                        this.expect(a, s ? "[" : "{");
                        var l, c = this.lexer.lex(a.position, t);
                        l = "color" === t ? c.text : c.data;
                        var h = this.lexer.lex(c.position, i);
                        return this.expect(h, s ? "]" : "}"), new r(new o(new n(t, l, i), h.position), !1)
                    }
                    if ("text" === t) {
                        var d = this.lexer.lex(e, "whitespace");
                        e = d.position
                    }
                    return s ? this.parseOptionalGroup(e, t) : this.parseGroup(e, t)
                }, i.prototype.parseGroup = function(e, t) {
                    var i = this.lexer.lex(e, t);
                    if ("{" === i.text) {
                        var s = this.parseExpression(i.position, t, !1, "}"), a = this.lexer.lex(s.position, t);
                        return this.expect(a, "}"), new r(new o(new n("ordgroup", s.result, t), a.position), !1)
                    }
                    return this.parseSymbol(e, t)
                }, i.prototype.parseOptionalGroup = function(e, t) {
                    var i = this.lexer.lex(e, t);
                    if ("[" === i.text) {
                        var s = this.parseExpression(i.position, t, !1, "]"), a = this.lexer.lex(s.position, t);
                        return this.expect(a, "]"), new r(new o(new n("ordgroup", s.result, t), a.position), !1)
                    }
                    return null
                }, i.prototype.parseSymbol = function(e, t) {
                    var i = this.lexer.lex(e, t);
                    if (s.funcs[i.text]) {
                        var a = s.funcs[i.text], c = a.argTypes;
                        if (c) {
                            c = c.slice();
                            for (var h = 0; h < c.length; h++)
                                "original" === c[h] && (c[h] = t)
                        }
                        return new r(new o(i.text, i.position), !0, a.allowedInText, a.numArgs, a.numOptionalArgs, c)
                    }
                    return l[t][i.text] ? new r(new o(new n(l[t][i.text].group, i.text, t), i.position), !1) : null
                }, t.exports = i
            }, {"./Lexer": 2,"./ParseError": 4,"./functions": 12,"./symbols": 14,"./utils": 15}],
        6: [function(e, t) {
                function i(e, t, i, n) {
                    this.id = e, this.size = t, this.cramped = n, this.sizeMultiplier = i
                }
                i.prototype.sup = function() {
                    return p[g[this.id]]
                }, i.prototype.sub = function() {
                    return p[m[this.id]]
                }, i.prototype.fracNum = function() {
                    return p[f[this.id]]
                }, i.prototype.fracDen = function() {
                    return p[v[this.id]]
                }, i.prototype.cramp = function() {
                    return p[b[this.id]]
                }, i.prototype.cls = function() {
                    return d[this.size] + (this.cramped ? " cramped" : " uncramped")
                }, i.prototype.reset = function() {
                    return u[this.size]
                };
                var n = 0, o = 1, r = 2, s = 3, a = 4, l = 5, c = 6, h = 7, d = ["displaystyle textstyle", "textstyle", "scriptstyle", "scriptscriptstyle"], u = ["reset-textstyle", "reset-textstyle", "reset-scriptstyle", "reset-scriptscriptstyle"], p = [new i(n, 0, 1, !1), new i(o, 0, 1, !0), new i(r, 1, 1, !1), new i(s, 1, 1, !0), new i(a, 2, .7, !1), new i(l, 2, .7, !0), new i(c, 3, .5, !1), new i(h, 3, .5, !0)], g = [a, l, a, l, c, h, c, h], m = [l, l, l, l, h, h, h, h], f = [r, s, a, l, c, h, c, h], v = [s, s, l, l, h, h, h, h], b = [o, o, s, s, l, l, h, h];
                t.exports = {DISPLAY: p[n],TEXT: p[r],SCRIPT: p[a],SCRIPTSCRIPT: p[c]}
            }, {}],
        7: [function(e, t) {
                var i = e("./domTree"), n = e("./fontMetrics"), o = e("./symbols"), r = function(e, t, r, s, a) {
                    o[r][e] && o[r][e].replace && (e = o[r][e].replace);
                    var l, c = n.getCharacterMetrics(e, t);
                    return c ? l = new i.symbolNode(e, c.height, c.depth, c.italic, c.skew, a) : ("undefined" != typeof console && console.warn("No character metrics for '" + e + "' in style '" + t + "'"), l = new i.symbolNode(e, 0, 0, 0, 0, a)), s && (l.style.color = s), l
                }, s = function(e, t, i, n) {
                    return r(e, "Math-Italic", t, i, n.concat(["mathit"]))
                }, a = function(e, t, i, n) {
                    return "main" === o[t][e].font ? r(e, "Main-Regular", t, i, n) : r(e, "AMS-Regular", t, i, n.concat(["amsrm"]))
                }, l = function(e) {
                    var t = 0, i = 0, n = 0;
                    if (e.children)
                        for (var o = 0; o < e.children.length; o++)
                            e.children[o].height > t && (t = e.children[o].height), e.children[o].depth > i && (i = e.children[o].depth), e.children[o].maxFontSize > n && (n = e.children[o].maxFontSize);
                    e.height = t, e.depth = i, e.maxFontSize = n
                }, c = function(e, t, n) {
                    var o = new i.span(e, t);
                    return l(o), n && (o.style.color = n), o
                }, h = function(e) {
                    var t = new i.documentFragment(e);
                    return l(t), t
                }, d = function(e, t) {
                    var n = c([], [new i.symbolNode("\u200b")]);
                    n.style.fontSize = t / e.style.sizeMultiplier + "em";
                    var o = c(["fontsize-ensurer", "reset-" + e.size, "size5"], [n]);
                    return o
                }, u = function(e, t, n, o) {
                    var r, s, a;
                    if ("individualShift" === t) {
                        var l = e;
                        for (e = [l[0]], r = -l[0].shift - l[0].elem.depth, s = r, a = 1; a < l.length; a++) {
                            var h = -l[a].shift - s - l[a].elem.depth, u = h - (l[a - 1].elem.height + l[a - 1].elem.depth);
                            s += h, e.push({type: "kern",size: u}), e.push(l[a])
                        }
                    } else if ("top" === t) {
                        var p = n;
                        for (a = 0; a < e.length; a++)
                            p -= "kern" === e[a].type ? e[a].size : e[a].elem.height + e[a].elem.depth;
                        r = p
                    } else
                        r = "bottom" === t ? -n : "shift" === t ? -e[0].elem.depth - n : "firstBaseline" === t ? -e[0].elem.depth : 0;
                    var g = 0;
                    for (a = 0; a < e.length; a++)
                        "elem" === e[a].type && (g = Math.max(g, e[a].elem.maxFontSize));
                    var m = d(o, g), f = [];
                    for (s = r, a = 0; a < e.length; a++)
                        if ("kern" === e[a].type)
                            s += e[a].size;
                        else {
                            var v = e[a].elem, b = -v.depth - s;
                            s += v.height + v.depth;
                            var w = c([], [m, v]);
                            w.height -= b, w.depth += b, w.style.top = b + "em", f.push(w)
                        }
                    var C = c(["baseline-fix"], [m, new i.symbolNode("\u200b")]);
                    f.push(C);
                    var k = c(["vlist"], f);
                    return k.height = Math.max(s, k.height), k.depth = Math.max(-r, k.depth), k
                };
                t.exports = {makeSymbol: r,mathit: s,mathrm: a,makeSpan: c,makeFragment: h,makeVList: u}
            }, {"./domTree": 10,"./fontMetrics": 11,"./symbols": 14}],
        8: [function(e, t) {
                var i = e("./Options"), n = e("./ParseError"), o = e("./Style"), r = e("./buildCommon"), s = e("./delimiter"), a = e("./domTree"), l = e("./fontMetrics"), c = e("./utils"), h = r.makeSpan, d = function(e, t, i) {
                    for (var n = [], o = 0; o < e.length; o++) {
                        var r = e[o];
                        n.push(w(r, t, i)), i = r
                    }
                    return n
                }, u = {mathord: "mord",textord: "mord",bin: "mbin",rel: "mrel",text: "mord",open: "mopen",close: "mclose",inner: "minner",frac: "minner",spacing: "mord",punct: "mpunct",ordgroup: "mord",op: "mop",katex: "mord",overline: "mord",rule: "mord",leftright: "minner",sqrt: "mord",accent: "mord"}, p = function(e) {
                    return null == e ? u.mathord : "supsub" === e.type ? p(e.value.base) : "llap" === e.type || "rlap" === e.type ? p(e.value) : "color" === e.type ? p(e.value.value) : "sizing" === e.type ? p(e.value.value) : "styling" === e.type ? p(e.value.value) : "delimsizing" === e.type ? u[e.value.delimType] : u[e.type]
                }, g = function(e, t) {
                    return e ? "op" === e.type ? e.value.limits && t.style.size === o.DISPLAY.size : "accent" === e.type ? f(e.value.base) : null : !1
                }, m = function(e) {
                    return e ? "ordgroup" === e.type ? 1 === e.value.length ? m(e.value[0]) : e : "color" === e.type && 1 === e.value.value.length ? m(e.value.value[0]) : e : !1
                }, f = function(e) {
                    var t = m(e);
                    return "mathord" === t.type || "textord" === t.type || "bin" === t.type || "rel" === t.type || "inner" === t.type || "open" === t.type || "close" === t.type || "punct" === t.type
                }, v = {mathord: function(e, t) {
                        return r.mathit(e.value, e.mode, t.getColor(), ["mord"])
                    },textord: function(e, t) {
                        return r.mathrm(e.value, e.mode, t.getColor(), ["mord"])
                    },bin: function(e, t, i) {
                        for (var n = "mbin", o = i; o && "color" == o.type; ) {
                            var s = o.value.value;
                            o = s[s.length - 1]
                        }
                        return (!i || c.contains(["mbin", "mopen", "mrel", "mop", "mpunct"], p(o))) && (e.type = "textord", n = "mord"), r.mathrm(e.value, e.mode, t.getColor(), [n])
                    },rel: function(e, t) {
                        return r.mathrm(e.value, e.mode, t.getColor(), ["mrel"])
                    },open: function(e, t) {
                        return r.mathrm(e.value, e.mode, t.getColor(), ["mopen"])
                    },close: function(e, t) {
                        return r.mathrm(e.value, e.mode, t.getColor(), ["mclose"])
                    },inner: function(e, t) {
                        return r.mathrm(e.value, e.mode, t.getColor(), ["minner"])
                    },punct: function(e, t) {
                        return r.mathrm(e.value, e.mode, t.getColor(), ["mpunct"])
                    },ordgroup: function(e, t) {
                        return h(["mord", t.style.cls()], d(e.value, t.reset()))
                    },text: function(e, t) {
                        return h(["text", "mord", t.style.cls()], d(e.value.body, t.reset()))
                    },color: function(e, t, i) {
                        var n = d(e.value.value, t.withColor(e.value.color), i);
                        return new r.makeFragment(n)
                    },supsub: function(e, t, i) {
                        if (g(e.value.base, t))
                            return v[e.value.base.type](e, t, i);
                        var n, s, c, d, u = w(e.value.base, t.reset());
                        e.value.sup && (c = w(e.value.sup, t.withStyle(t.style.sup())), n = h([t.style.reset(), t.style.sup().cls()], [c])), e.value.sub && (d = w(e.value.sub, t.withStyle(t.style.sub())), s = h([t.style.reset(), t.style.sub().cls()], [d]));
                        var m, b;
                        f(e.value.base) ? (m = 0, b = 0) : (m = u.height - l.metrics.supDrop, b = u.depth + l.metrics.subDrop);
                        var C;
                        C = t.style === o.DISPLAY ? l.metrics.sup1 : t.style.cramped ? l.metrics.sup3 : l.metrics.sup2;
                        var k, y = o.TEXT.sizeMultiplier * t.style.sizeMultiplier, E = .5 / l.metrics.ptPerEm / y + "em";
                        if (e.value.sup)
                            if (e.value.sub) {
                                m = Math.max(m, C, c.depth + .25 * l.metrics.xHeight), b = Math.max(b, l.metrics.sub2);
                                var S = l.metrics.defaultRuleThickness;
                                if (m - c.depth - (d.height - b) < 4 * S) {
                                    b = 4 * S - (m - c.depth) + d.height;
                                    var A = .8 * l.metrics.xHeight - (m - c.depth);
                                    A > 0 && (m += A, b -= A)
                                }
                                k = r.makeVList([{type: "elem",elem: s,shift: b}, {type: "elem",elem: n,shift: -m}], "individualShift", null, t), u instanceof a.symbolNode && (k.children[0].style.marginLeft = -u.italic + "em"), k.children[0].style.marginRight = E, k.children[1].style.marginRight = E
                            } else
                                m = Math.max(m, C, c.depth + .25 * l.metrics.xHeight), k = r.makeVList([{type: "elem",elem: n}], "shift", -m, t), k.children[0].style.marginRight = E;
                        else
                            b = Math.max(b, l.metrics.sub1, d.height - .8 * l.metrics.xHeight), k = r.makeVList([{type: "elem",elem: s}], "shift", b, t), k.children[0].style.marginRight = E, u instanceof a.symbolNode && (k.children[0].style.marginLeft = -u.italic + "em");
                        return h([p(e.value.base)], [u, k])
                    },genfrac: function(e, t) {
                        var i = t.style;
                        "display" === e.value.size ? i = o.DISPLAY : "text" === e.value.size && (i = o.TEXT);
                        var n, a = i.fracNum(), c = i.fracDen(), d = w(e.value.numer, t.withStyle(a)), u = h([i.reset(), a.cls()], [d]), p = w(e.value.denom, t.withStyle(c)), g = h([i.reset(), c.cls()], [p]);
                        n = e.value.hasBarLine ? l.metrics.defaultRuleThickness / t.style.sizeMultiplier : 0;
                        var m, f, v;
                        i.size === o.DISPLAY.size ? (m = l.metrics.num1, f = n > 0 ? 3 * n : 7 * l.metrics.defaultRuleThickness, v = l.metrics.denom1) : (n > 0 ? (m = l.metrics.num2, f = n) : (m = l.metrics.num3, f = 3 * l.metrics.defaultRuleThickness), v = l.metrics.denom2);
                        var b;
                        if (0 === n) {
                            var C = m - d.depth - (p.height - v);
                            f > C && (m += .5 * (f - C), v += .5 * (f - C)), b = r.makeVList([{type: "elem",elem: g,shift: v}, {type: "elem",elem: u,shift: -m}], "individualShift", null, t)
                        } else {
                            var k = l.metrics.axisHeight;
                            m - d.depth - (k + .5 * n) < f && (m += f - (m - d.depth - (k + .5 * n))), k - .5 * n - (p.height - v) < f && (v += f - (k - .5 * n - (p.height - v)));
                            var y = h([t.style.reset(), o.TEXT.cls(), "frac-line"]);
                            y.height = n;
                            var E = -(k - .5 * n);
                            b = r.makeVList([{type: "elem",elem: g,shift: v}, {type: "elem",elem: y,shift: E}, {type: "elem",elem: u,shift: -m}], "individualShift", null, t)
                        }
                        b.height *= i.sizeMultiplier / t.style.sizeMultiplier, b.depth *= i.sizeMultiplier / t.style.sizeMultiplier;
                        var S, A = [h(["mfrac"], [b])];
                        return S = i.size === o.DISPLAY.size ? l.metrics.delim1 : l.metrics.getDelim2(i), null != e.value.leftDelim && A.unshift(s.customSizedDelim(e.value.leftDelim, S, !0, t.withStyle(i), e.mode)), null != e.value.rightDelim && A.push(s.customSizedDelim(e.value.rightDelim, S, !0, t.withStyle(i), e.mode)), h(["minner", t.style.reset(), i.cls()], A, t.getColor())
                    },spacing: function(e) {
                        if ("\\ " === e.value || "\\space" === e.value || " " === e.value || "~" === e.value)
                            return h(["mord", "mspace"], [r.mathrm(e.value, e.mode)]);
                        var t = {"\\qquad": "qquad","\\quad": "quad","\\enspace": "enspace","\\;": "thickspace","\\:": "mediumspace","\\,": "thinspace","\\!": "negativethinspace"};
                        return h(["mord", "mspace", t[e.value]])
                    },llap: function(e, t) {
                        var i = h(["inner"], [w(e.value.body, t.reset())]), n = h(["fix"], []);
                        return h(["llap", t.style.cls()], [i, n])
                    },rlap: function(e, t) {
                        var i = h(["inner"], [w(e.value.body, t.reset())]), n = h(["fix"], []);
                        return h(["rlap", t.style.cls()], [i, n])
                    },op: function(e, t) {
                        var i, n, s = !1;
                        "supsub" === e.type && (i = e.value.sup, n = e.value.sub, e = e.value.base, s = !0);
                        var a = ["\\smallint"], d = !1;
                        t.style.size === o.DISPLAY.size && e.value.symbol && !c.contains(a, e.value.body) && (d = !0);
                        var u, p = 0, g = 0;
                        if (e.value.symbol) {
                            var m = d ? "Size2-Regular" : "Size1-Regular";
                            u = r.makeSymbol(e.value.body, m, "math", t.getColor(), ["op-symbol", d ? "large-op" : "small-op", "mop"]), p = (u.height - u.depth) / 2 - l.metrics.axisHeight * t.style.sizeMultiplier, g = u.italic
                        } else {
                            for (var f = [], v = 1; v < e.value.body.length; v++)
                                f.push(r.mathrm(e.value.body[v], e.mode));
                            u = h(["mop"], f, t.getColor())
                        }
                        if (s) {
                            u = h([], [u]);
                            var b, C, k, y;
                            if (i) {
                                var E = w(i, t.withStyle(t.style.sup()));
                                b = h([t.style.reset(), t.style.sup().cls()], [E]), C = Math.max(l.metrics.bigOpSpacing1, l.metrics.bigOpSpacing3 - E.depth)
                            }
                            if (n) {
                                var S = w(n, t.withStyle(t.style.sub()));
                                k = h([t.style.reset(), t.style.sub().cls()], [S]), y = Math.max(l.metrics.bigOpSpacing2, l.metrics.bigOpSpacing4 - S.height)
                            }
                            var A, x, F;
                            if (i)
                                if (n) {
                                    if (!i && !n)
                                        return u;
                                    F = l.metrics.bigOpSpacing5 + k.height + k.depth + y + u.depth + p, A = r.makeVList([{type: "kern",size: l.metrics.bigOpSpacing5}, {type: "elem",elem: k}, {type: "kern",size: y}, {type: "elem",elem: u}, {type: "kern",size: C}, {type: "elem",elem: b}, {type: "kern",size: l.metrics.bigOpSpacing5}], "bottom", F, t), A.children[0].style.marginLeft = -g + "em", A.children[2].style.marginLeft = g + "em"
                                } else
                                    F = u.depth + p, A = r.makeVList([{type: "elem",elem: u}, {type: "kern",size: C}, {type: "elem",elem: b}, {type: "kern",size: l.metrics.bigOpSpacing5}], "bottom", F, t), A.children[1].style.marginLeft = g + "em";
                            else
                                x = u.height - p, A = r.makeVList([{type: "kern",size: l.metrics.bigOpSpacing5}, {type: "elem",elem: k}, {type: "kern",size: y}, {type: "elem",elem: u}], "top", x, t), A.children[0].style.marginLeft = -g + "em";
                            return h(["mop", "op-limits"], [A])
                        }
                        return e.value.symbol && (u.style.top = p + "em"), u
                    },katex: function(e, t) {
                        var i = h(["k"], [r.mathrm("K", e.mode)]), n = h(["a"], [r.mathrm("A", e.mode)]);
                        n.height = .75 * (n.height + .2), n.depth = .75 * (n.height - .2);
                        var o = h(["t"], [r.mathrm("T", e.mode)]), s = h(["e"], [r.mathrm("E", e.mode)]);
                        s.height = s.height - .2155, s.depth = s.depth + .2155;
                        var a = h(["x"], [r.mathrm("X", e.mode)]);
                        return h(["katex-logo"], [i, n, o, s, a], t.getColor())
                    },overline: function(e, t) {
                        var i = w(e.value.body, t.withStyle(t.style.cramp())), n = l.metrics.defaultRuleThickness / t.style.sizeMultiplier, s = h([t.style.reset(), o.TEXT.cls(), "overline-line"]);
                        s.height = n, s.maxFontSize = 1;
                        var a = r.makeVList([{type: "elem",elem: i}, {type: "kern",size: 3 * n}, {type: "elem",elem: s}, {type: "kern",size: n}], "firstBaseline", null, t);
                        return h(["overline", "mord"], [a], t.getColor())
                    },sqrt: function(e, t) {
                        var i = w(e.value.body, t.withStyle(t.style.cramp())), n = l.metrics.defaultRuleThickness / t.style.sizeMultiplier, a = h([t.style.reset(), o.TEXT.cls(), "sqrt-line"], [], t.getColor());
                        a.height = n, a.maxFontSize = 1;
                        var c = n;
                        t.style.id < o.TEXT.id && (c = l.metrics.xHeight);
                        var d = n + c / 4, u = (i.height + i.depth) * t.style.sizeMultiplier, p = u + d + n, g = h(["sqrt-sign"], [s.customSizedDelim("\\surd", p, !1, t, e.mode)], t.getColor()), m = g.height + g.depth - n;
                        m > i.height + i.depth + d && (d = (d + m - i.height - i.depth) / 2);
                        var f = -(i.height + d + n) + g.height;
                        g.style.top = f + "em", g.height -= f, g.depth += f;
                        var v;
                        return v = 0 === i.height && 0 === i.depth ? h() : r.makeVList([{type: "elem",elem: i}, {type: "kern",size: d}, {type: "elem",elem: a}, {type: "kern",size: n}], "firstBaseline", null, t), h(["sqrt", "mord"], [g, v])
                    },sizing: function(e, t, i) {
                        var n = d(e.value.value, t.withSize(e.value.size), i), o = h(["mord"], [h(["sizing", "reset-" + t.size, e.value.size, t.style.cls()], n)]), r = b[e.value.size];
                        return o.maxFontSize = r * t.style.sizeMultiplier, o
                    },styling: function(e, t, i) {
                        var n = {display: o.DISPLAY,text: o.TEXT,script: o.SCRIPT,scriptscript: o.SCRIPTSCRIPT}, r = n[e.value.style], s = d(e.value.value, t.withStyle(r), i);
                        return h([t.style.reset(), r.cls()], s)
                    },delimsizing: function(e, t) {
                        var i = e.value.value;
                        return "." === i ? h([u[e.value.delimType]]) : h([u[e.value.delimType]], [s.sizedDelim(i, e.value.size, t, e.mode)])
                    },leftright: function(e, t) {
                        for (var i = d(e.value.body, t.reset()), n = 0, o = 0, r = 0; r < i.length; r++)
                            n = Math.max(i[r].height, n), o = Math.max(i[r].depth, o);
                        n *= t.style.sizeMultiplier, o *= t.style.sizeMultiplier;
                        var a;
                        a = "." === e.value.left ? h(["nulldelimiter"]) : s.leftRightDelim(e.value.left, n, o, t, e.mode), i.unshift(a);
                        var l;
                        return l = "." === e.value.right ? h(["nulldelimiter"]) : s.leftRightDelim(e.value.right, n, o, t, e.mode), i.push(l), h(["minner", t.style.cls()], i, t.getColor())
                    },rule: function(e, t) {
                        var i = h(["mord", "rule"], [], t.getColor()), n = 0;
                        e.value.shift && (n = e.value.shift.number, "ex" === e.value.shift.unit && (n *= l.metrics.xHeight));
                        var o = e.value.width.number;
                        "ex" === e.value.width.unit && (o *= l.metrics.xHeight);
                        var r = e.value.height.number;
                        return "ex" === e.value.height.unit && (r *= l.metrics.xHeight), n /= t.style.sizeMultiplier, o /= t.style.sizeMultiplier, r /= t.style.sizeMultiplier, i.style.borderRightWidth = o + "em", i.style.borderTopWidth = r + "em", i.style.bottom = n + "em", i.width = o, i.height = r + n, i.depth = -n, i
                    },accent: function(e, t, i) {
                        var n, o = e.value.base;
                        if ("supsub" === e.type) {
                            var s = e;
                            e = s.value.base, o = e.value.base, s.value.base = o, n = w(s, t.reset(), i)
                        }
                        var a, c = w(o, t.withStyle(t.style.cramp()));
                        if (f(o)) {
                            var d = m(o), u = w(d, t.withStyle(t.style.cramp()));
                            a = u.skew
                        } else
                            a = 0;
                        var p = Math.min(c.height, l.metrics.xHeight), g = r.makeSymbol(e.value.accent, "Main-Regular", "math", t.getColor());
                        g.italic = 0;
                        var v = "\\vec" === e.value.accent ? "accent-vec" : null, b = h(["accent-body", v], [h([], [g])]);
                        b = r.makeVList([{type: "elem",elem: c}, {type: "kern",size: -p}, {type: "elem",elem: b}], "firstBaseline", null, t), b.children[1].style.marginLeft = 2 * a + "em";
                        var C = h(["mord", "accent"], [b]);
                        return n ? (n.children[0] = C, n.height = Math.max(C.height, n.height), n.classes[0] = "mord", n) : C
                    }}, b = {size1: .5,size2: .7,size3: .8,size4: .9,size5: 1,size6: 1.2,size7: 1.44,size8: 1.73,size9: 2.07,size10: 2.49}, w = function(e, t, i) {
                    if (!e)
                        return h();
                    if (v[e.type]) {
                        var o, r = v[e.type](e, t, i);
                        return t.style !== t.parentStyle && (o = t.style.sizeMultiplier / t.parentStyle.sizeMultiplier, r.height *= o, r.depth *= o), t.size !== t.parentSize && (o = b[t.size] / b[t.parentSize], r.height *= o, r.depth *= o), r
                    }
                    throw new n("Got group of unknown type: '" + e.type + "'")
                }, C = function(e) {
                    var t = new i(o.TEXT, "size5", ""), n = d(e, t), r = h(["base", t.style.cls()], n), s = h(["strut"]), a = h(["strut", "bottom"]);
                    s.style.height = r.height + "em", a.style.height = r.height + r.depth + "em", a.style.verticalAlign = -r.depth + "em";
                    var l = h(["katex"], [h(["katex-inner"], [s, a, r])]);
                    return l
                };
                t.exports = C
            }, {"./Options": 3,"./ParseError": 4,"./Style": 6,"./buildCommon": 7,"./delimiter": 9,"./domTree": 10,"./fontMetrics": 11,"./utils": 15}],
        9: [function(e, t) {
                var i = e("./ParseError"), n = e("./Style"), o = e("./buildCommon"), r = e("./fontMetrics"), s = e("./symbols"), a = e("./utils"), l = o.makeSpan, c = function(e, t) {
                    return s.math[e] && s.math[e].replace ? r.getCharacterMetrics(s.math[e].replace, t) : r.getCharacterMetrics(e, t)
                }, h = function(e, t, i) {
                    return o.makeSymbol(e, "Size" + t + "-Regular", i)
                }, d = function(e, t, i) {
                    var n = l(["style-wrap", i.style.reset(), t.cls()], [e]), o = t.sizeMultiplier / i.style.sizeMultiplier;
                    return n.height *= o, n.depth *= o, n.maxFontSize = t.sizeMultiplier, n
                }, u = function(e, t, i, n, s) {
                    var a = o.makeSymbol(e, "Main-Regular", s), l = d(a, t, n);
                    if (i) {
                        var c = (1 - n.style.sizeMultiplier / t.sizeMultiplier) * r.metrics.axisHeight;
                        l.style.top = c + "em", l.height -= c, l.depth += c
                    }
                    return l
                }, p = function(e, t, i, o, s) {
                    var a = h(e, t, s), c = d(l(["delimsizing", "size" + t], [a], o.getColor()), n.TEXT, o);
                    if (i) {
                        var u = (1 - o.style.sizeMultiplier) * r.metrics.axisHeight;
                        c.style.top = u + "em", c.height -= u, c.depth += u
                    }
                    return c
                }, g = function(e, t, i) {
                    var n;
                    "Size1-Regular" === t ? n = "delim-size1" : "Size4-Regular" === t && (n = "delim-size4");
                    var r = l(["delimsizinginner", n], [l([], [o.makeSymbol(e, t, i)])]);
                    return {type: "elem",elem: r}
                }, m = function(e, t, i, s, a) {
                    var h, u, p, m;
                    h = p = m = e, u = null;
                    var f = "Size1-Regular";
                    "\\uparrow" === e ? p = m = "\u23d0" : "\\Uparrow" === e ? p = m = "\u2016" : "\\downarrow" === e ? h = p = "\u23d0" : "\\Downarrow" === e ? h = p = "\u2016" : "\\updownarrow" === e ? (h = "\\uparrow", p = "\u23d0", m = "\\downarrow") : "\\Updownarrow" === e ? (h = "\\Uparrow", p = "\u2016", m = "\\Downarrow") : "[" === e || "\\lbrack" === e ? (h = "\u23a1", p = "\u23a2", m = "\u23a3", f = "Size4-Regular") : "]" === e || "\\rbrack" === e ? (h = "\u23a4", p = "\u23a5", m = "\u23a6", f = "Size4-Regular") : "\\lfloor" === e ? (p = h = "\u23a2", m = "\u23a3", f = "Size4-Regular") : "\\lceil" === e ? (h = "\u23a1", p = m = "\u23a2", f = "Size4-Regular") : "\\rfloor" === e ? (p = h = "\u23a5", m = "\u23a6", f = "Size4-Regular") : "\\rceil" === e ? (h = "\u23a4", p = m = "\u23a5", f = "Size4-Regular") : "(" === e ? (h = "\u239b", p = "\u239c", m = "\u239d", f = "Size4-Regular") : ")" === e ? (h = "\u239e", p = "\u239f", m = "\u23a0", f = "Size4-Regular") : "\\{" === e || "\\lbrace" === e ? (h = "\u23a7", u = "\u23a8", m = "\u23a9", p = "\u23aa", f = "Size4-Regular") : "\\}" === e || "\\rbrace" === e ? (h = "\u23ab", u = "\u23ac", m = "\u23ad", p = "\u23aa", f = "Size4-Regular") : "\\surd" === e && (h = "\ue001", m = "\u23b7", p = "\ue000", f = "Size4-Regular");
                    var v, b, w = c(h, f), C = w.height + w.depth, k = c(p, f), y = k.height + k.depth, E = c(m, f), S = E.height + E.depth;
                    null !== u && (v = c(u, f), b = v.height + v.depth);
                    var A = C + S;
                    for (null !== u && (A += b); t > A; )
                        A += y, null !== u && (A += y);
                    var x = r.metrics.axisHeight;
                    i && (x *= s.style.sizeMultiplier);
                    var F = A / 2 - x, D = [];
                    D.push(g(m, f, a));
                    var L;
                    if (null === u) {
                        var B = A - C - S, T = Math.ceil(B / y);
                        for (L = 0; T > L; L++)
                            D.push(g(p, f, a))
                    } else {
                        var _ = A / 2 - C - b / 2, M = Math.ceil(_ / y), R = A / 2 - C - b / 2, I = Math.ceil(R / y);
                        for (L = 0; M > L; L++)
                            D.push(g(p, f, a));
                        for (D.push(g(u, f, a)), L = 0; I > L; L++)
                            D.push(g(p, f, a))
                    }
                    D.push(g(h, f, a));
                    var N = o.makeVList(D, "bottom", F, s);
                    return d(l(["delimsizing", "mult"], [N], s.getColor()), n.TEXT, s)
                }, f = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "\\surd"], v = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert"], b = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash"], w = [0, 1.2, 1.8, 2.4, 3], C = function(e, t, n, o) {
                    if ("<" === e ? e = "\\langle" : ">" === e && (e = "\\rangle"), a.contains(f, e) || a.contains(b, e))
                        return p(e, t, !1, n, o);
                    if (a.contains(v, e))
                        return m(e, w[t], !1, n, o);
                    throw new i("Illegal delimiter: '" + e + "'")
                }, k = [{type: "small",style: n.SCRIPTSCRIPT}, {type: "small",style: n.SCRIPT}, {type: "small",style: n.TEXT}, {type: "large",size: 1}, {type: "large",size: 2}, {type: "large",size: 3}, {type: "large",size: 4}], y = [{type: "small",style: n.SCRIPTSCRIPT}, {type: "small",style: n.SCRIPT}, {type: "small",style: n.TEXT}, {type: "stack"}], E = [{type: "small",style: n.SCRIPTSCRIPT}, {type: "small",style: n.SCRIPT}, {type: "small",style: n.TEXT}, {type: "large",size: 1}, {type: "large",size: 2}, {type: "large",size: 3}, {type: "large",size: 4}, {type: "stack"}], S = function(e) {
                    return "small" === e.type ? "Main-Regular" : "large" === e.type ? "Size" + e.size + "-Regular" : "stack" === e.type ? "Size4-Regular" : void 0
                }, A = function(e, t, i, n) {
                    for (var o = Math.min(2, 3 - n.style.size), r = o; r < i.length && "stack" !== i[r].type; r++) {
                        var s = c(e, S(i[r])), a = s.height + s.depth;
                        if ("small" === i[r].type && (a *= i[r].style.sizeMultiplier), a > t)
                            return i[r]
                    }
                    return i[i.length - 1]
                }, x = function(e, t, i, n, o) {
                    "<" === e ? e = "\\langle" : ">" === e && (e = "\\rangle");
                    var r;
                    r = a.contains(b, e) ? k : a.contains(f, e) ? E : y;
                    var s = A(e, t, r, n);
                    return "small" === s.type ? u(e, s.style, i, n, o) : "large" === s.type ? p(e, s.size, i, n, o) : "stack" === s.type ? m(e, t, i, n, o) : void 0
                }, F = function(e, t, i, n, o) {
                    var s = r.metrics.axisHeight * n.style.sizeMultiplier, a = 901, l = 5 / r.metrics.ptPerEm, c = Math.max(t - s, i + s), h = Math.max(c / 500 * a, 2 * c - l);
                    return x(e, h, !0, n, o)
                };
                t.exports = {sizedDelim: C,customSizedDelim: x,leftRightDelim: F}
            }, {"./ParseError": 4,"./Style": 6,"./buildCommon": 7,"./fontMetrics": 11,"./symbols": 14,"./utils": 15}],

        10: [function(e, t) {
                function i(e, t, i, n, o, r) {
                    this.classes = e || [], this.children = t || [], this.height = i || 0, this.depth = n || 0, this.maxFontSize = o || 0, this.style = r || {}
                }
                function n(e, t, i, n) {
                    this.children = e || [], this.height = t || 0, this.depth = i || 0, this.maxFontSize = n || 0
                }
                function o(e, t, i, n, o, r, s) {
                    this.value = e || "", this.height = t || 0, this.depth = i || 0, this.italic = n || 0, this.skew = o || 0, this.classes = r || [], this.style = s || {}, this.maxFontSize = 0
                }
                var r = e("./utils"), s = function(e) {
                    e = e.slice();
                    for (var t = e.length - 1; t >= 0; t--)
                        e[t] || e.splice(t, 1);
                    return e.join(" ")
                };
                i.prototype.toNode = function() {
                    var e = document.createElement("span");
                    e.className = s(this.classes);
                    for (var t in this.style)
                        this.style.hasOwnProperty(t) && (e.style[t] = this.style[t]);
                    for (var i = 0; i < this.children.length; i++)
                        e.appendChild(this.children[i].toNode());
                    return e
                }, i.prototype.toMarkup = function() {
                    var e = "<span";
                    this.classes.length && (e += ' class="', e += r.escape(s(this.classes)), e += '"');
                    var t = "";
                    for (var i in this.style)
                        this.style.hasOwnProperty(i) && (t += r.hyphenate(i) + ":" + this.style[i] + ";");
                    t && (e += ' style="' + r.escape(t) + '"'), e += ">";
                    for (var n = 0; n < this.children.length; n++)
                        e += this.children[n].toMarkup();
                    return e += "</span>"
                }, n.prototype.toNode = function() {
                    for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++)
                        e.appendChild(this.children[t].toNode());
                    return e
                }, n.prototype.toMarkup = function() {
                    for (var e = "", t = 0; t < this.children.length; t++)
                        e += this.children[t].toMarkup();
                    return e
                }, o.prototype.toNode = function() {
                    var e = document.createTextNode(this.value), t = null;
                    this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = this.italic + "em"), this.classes.length > 0 && (t = t || document.createElement("span"), t.className = s(this.classes));
                    for (var i in this.style)
                        this.style.hasOwnProperty(i) && (t = t || document.createElement("span"), t.style[i] = this.style[i]);
                    return t ? (t.appendChild(e), t) : e
                }, o.prototype.toMarkup = function() {
                    var e = !1, t = "<span";
                    this.classes.length && (e = !0, t += ' class="', t += r.escape(s(this.classes)), t += '"');
                    var i = "";
                    this.italic > 0 && (i += "margin-right:" + this.italic + "em;");
                    for (var n in this.style)
                        this.style.hasOwnProperty(n) && (i += r.hyphenate(n) + ":" + this.style[n] + ";");
                    i && (e = !0, t += ' style="' + r.escape(i) + '"');
                    var o = r.escape(this.value);
                    return e ? (t += ">", t += o, t += "</span>") : o
                }, t.exports = {span: i,documentFragment: n,symbolNode: o}
            }, {"./utils": 15}],
        11: [function(e, t) {
                var i = e("./Style"), n = .431, o = 1, r = .677, s = .394, a = .444, l = .686, c = .345, h = .413, d = .363, u = .289, p = .15, g = .247, m = .386, f = .05, v = 2.39, b = 1.01, w = .81, C = .71, k = .25, y = .04, E = .111, S = .166, A = .2, x = .6, F = .1, D = 10, L = {xHeight: n,quad: o,num1: r,num2: s,num3: a,denom1: l,denom2: c,sup1: h,sup2: d,sup3: u,sub1: p,sub2: g,supDrop: m,subDrop: f,axisHeight: k,defaultRuleThickness: y,bigOpSpacing1: E,bigOpSpacing2: S,bigOpSpacing3: A,bigOpSpacing4: x,bigOpSpacing5: F,ptPerEm: D,delim1: v,getDelim2: function(e) {
                        if (e.size === i.TEXT.size)
                            return b;
                        if (e.size === i.SCRIPT.size)
                            return w;
                        if (e.size === i.SCRIPTSCRIPT.size)
                            return C;
                        throw new Error("Unexpected style size: " + e.size)
                    }}, B = {"AMS-Regular": {10003: {depth: 0,height: .69224,italic: 0,skew: 0},10016: {depth: 0,height: .69224,italic: 0,skew: 0},1008: {depth: 0,height: .43056,italic: .04028,skew: 0},107: {depth: 0,height: .68889,italic: 0,skew: 0},10731: {depth: .11111,height: .69224,italic: 0,skew: 0},10846: {depth: .19444,height: .75583,italic: 0,skew: 0},10877: {depth: .13667,height: .63667,italic: 0,skew: 0},10878: {depth: .13667,height: .63667,italic: 0,skew: 0},10885: {depth: .25583,height: .75583,italic: 0,skew: 0},10886: {depth: .25583,height: .75583,italic: 0,skew: 0},10887: {depth: .13597,height: .63597,italic: 0,skew: 0},10888: {depth: .13597,height: .63597,italic: 0,skew: 0},10889: {depth: .26167,height: .75726,italic: 0,skew: 0},10890: {depth: .26167,height: .75726,italic: 0,skew: 0},10891: {depth: .48256,height: .98256,italic: 0,skew: 0},10892: {depth: .48256,height: .98256,italic: 0,skew: 0},10901: {depth: .13667,height: .63667,italic: 0,skew: 0},10902: {depth: .13667,height: .63667,italic: 0,skew: 0},10933: {depth: .25142,height: .75726,italic: 0,skew: 0},10934: {depth: .25142,height: .75726,italic: 0,skew: 0},10935: {depth: .26167,height: .75726,italic: 0,skew: 0},10936: {depth: .26167,height: .75726,italic: 0,skew: 0},10937: {depth: .26167,height: .75726,italic: 0,skew: 0},10938: {depth: .26167,height: .75726,italic: 0,skew: 0},10949: {depth: .25583,height: .75583,italic: 0,skew: 0},10950: {depth: .25583,height: .75583,italic: 0,skew: 0},10955: {depth: .28481,height: .79383,italic: 0,skew: 0},10956: {depth: .28481,height: .79383,italic: 0,skew: 0},165: {depth: 0,height: .675,italic: .025,skew: 0},174: {depth: .15559,height: .69224,italic: 0,skew: 0},240: {depth: 0,height: .68889,italic: 0,skew: 0},295: {depth: 0,height: .68889,italic: 0,skew: 0},57350: {depth: .08167,height: .58167,italic: 0,skew: 0},57351: {depth: .08167,height: .58167,italic: 0,skew: 0},57352: {depth: .08167,height: .58167,italic: 0,skew: 0},57353: {depth: 0,height: .43056,italic: .04028,skew: 0},57356: {depth: .25142,height: .75726,italic: 0,skew: 0},57357: {depth: .25142,height: .75726,italic: 0,skew: 0},57358: {depth: .41951,height: .91951,italic: 0,skew: 0},57359: {depth: .30274,height: .79383,italic: 0,skew: 0},57360: {depth: .30274,height: .79383,italic: 0,skew: 0},57361: {depth: .41951,height: .91951,italic: 0,skew: 0},57366: {depth: .25142,height: .75726,italic: 0,skew: 0},57367: {depth: .25142,height: .75726,italic: 0,skew: 0},57368: {depth: .25142,height: .75726,italic: 0,skew: 0},57369: {depth: .25142,height: .75726,italic: 0,skew: 0},57370: {depth: .13597,height: .63597,italic: 0,skew: 0},57371: {depth: .13597,height: .63597,italic: 0,skew: 0},65: {depth: 0,height: .68889,italic: 0,skew: 0},66: {depth: 0,height: .68889,italic: 0,skew: 0},67: {depth: 0,height: .68889,italic: 0,skew: 0},68: {depth: 0,height: .68889,italic: 0,skew: 0},69: {depth: 0,height: .68889,italic: 0,skew: 0},70: {depth: 0,height: .68889,italic: 0,skew: 0},71: {depth: 0,height: .68889,italic: 0,skew: 0},710: {depth: 0,height: .825,italic: 0,skew: 0},72: {depth: 0,height: .68889,italic: 0,skew: 0},73: {depth: 0,height: .68889,italic: 0,skew: 0},732: {depth: 0,height: .9,italic: 0,skew: 0},74: {depth: .16667,height: .68889,italic: 0,skew: 0},75: {depth: 0,height: .68889,italic: 0,skew: 0},76: {depth: 0,height: .68889,italic: 0,skew: 0},77: {depth: 0,height: .68889,italic: 0,skew: 0},770: {depth: 0,height: .825,italic: 0,skew: 0},771: {depth: 0,height: .9,italic: 0,skew: 0},78: {depth: 0,height: .68889,italic: 0,skew: 0},79: {depth: .16667,height: .68889,italic: 0,skew: 0},80: {depth: 0,height: .68889,italic: 0,skew: 0},81: {depth: .16667,height: .68889,italic: 0,skew: 0},82: {depth: 0,height: .68889,italic: 0,skew: 0},8245: {depth: 0,height: .54986,italic: 0,skew: 0},83: {depth: 0,height: .68889,italic: 0,skew: 0},84: {depth: 0,height: .68889,italic: 0,skew: 0},8463: {depth: 0,height: .68889,italic: 0,skew: 0},8487: {depth: 0,height: .68889,italic: 0,skew: 0},8498: {depth: 0,height: .68889,italic: 0,skew: 0},85: {depth: 0,height: .68889,italic: 0,skew: 0},8502: {depth: 0,height: .68889,italic: 0,skew: 0},8503: {depth: 0,height: .68889,italic: 0,skew: 0},8504: {depth: 0,height: .68889,italic: 0,skew: 0},8513: {depth: 0,height: .68889,italic: 0,skew: 0},8592: {depth: -.03598,height: .46402,italic: 0,skew: 0},8594: {depth: -.03598,height: .46402,italic: 0,skew: 0},86: {depth: 0,height: .68889,italic: 0,skew: 0},8602: {depth: -.13313,height: .36687,italic: 0,skew: 0},8603: {depth: -.13313,height: .36687,italic: 0,skew: 0},8606: {depth: .01354,height: .52239,italic: 0,skew: 0},8608: {depth: .01354,height: .52239,italic: 0,skew: 0},8610: {depth: .01354,height: .52239,italic: 0,skew: 0},8611: {depth: .01354,height: .52239,italic: 0,skew: 0},8619: {depth: 0,height: .54986,italic: 0,skew: 0},8620: {depth: 0,height: .54986,italic: 0,skew: 0},8621: {depth: -.13313,height: .37788,italic: 0,skew: 0},8622: {depth: -.13313,height: .36687,italic: 0,skew: 0},8624: {depth: 0,height: .69224,italic: 0,skew: 0},8625: {depth: 0,height: .69224,italic: 0,skew: 0},8630: {depth: 0,height: .43056,italic: 0,skew: 0},8631: {depth: 0,height: .43056,italic: 0,skew: 0},8634: {depth: .08198,height: .58198,italic: 0,skew: 0},8635: {depth: .08198,height: .58198,italic: 0,skew: 0},8638: {depth: .19444,height: .69224,italic: 0,skew: 0},8639: {depth: .19444,height: .69224,italic: 0,skew: 0},8642: {depth: .19444,height: .69224,italic: 0,skew: 0},8643: {depth: .19444,height: .69224,italic: 0,skew: 0},8644: {depth: .1808,height: .675,italic: 0,skew: 0},8646: {depth: .1808,height: .675,italic: 0,skew: 0},8647: {depth: .1808,height: .675,italic: 0,skew: 0},8648: {depth: .19444,height: .69224,italic: 0,skew: 0},8649: {depth: .1808,height: .675,italic: 0,skew: 0},8650: {depth: .19444,height: .69224,italic: 0,skew: 0},8651: {depth: .01354,height: .52239,italic: 0,skew: 0},8652: {depth: .01354,height: .52239,italic: 0,skew: 0},8653: {depth: -.13313,height: .36687,italic: 0,skew: 0},8654: {depth: -.13313,height: .36687,italic: 0,skew: 0},8655: {depth: -.13313,height: .36687,italic: 0,skew: 0},8666: {depth: .13667,height: .63667,italic: 0,skew: 0},8667: {depth: .13667,height: .63667,italic: 0,skew: 0},8669: {depth: -.13313,height: .37788,italic: 0,skew: 0},87: {depth: 0,height: .68889,italic: 0,skew: 0},8705: {depth: 0,height: .825,italic: 0,skew: 0},8708: {depth: 0,height: .68889,italic: 0,skew: 0},8709: {depth: .08167,height: .58167,italic: 0,skew: 0},8717: {depth: 0,height: .43056,italic: 0,skew: 0},8722: {depth: -.03598,height: .46402,italic: 0,skew: 0},8724: {depth: .08198,height: .69224,italic: 0,skew: 0},8726: {depth: .08167,height: .58167,italic: 0,skew: 0},8733: {depth: 0,height: .69224,italic: 0,skew: 0},8736: {depth: 0,height: .69224,italic: 0,skew: 0},8737: {depth: 0,height: .69224,italic: 0,skew: 0},8738: {depth: .03517,height: .52239,italic: 0,skew: 0},8739: {depth: .08167,height: .58167,italic: 0,skew: 0},8740: {depth: .25142,height: .74111,italic: 0,skew: 0},8741: {depth: .08167,height: .58167,italic: 0,skew: 0},8742: {depth: .25142,height: .74111,italic: 0,skew: 0},8756: {depth: 0,height: .69224,italic: 0,skew: 0},8757: {depth: 0,height: .69224,italic: 0,skew: 0},8764: {depth: -.13313,height: .36687,italic: 0,skew: 0},8765: {depth: -.13313,height: .37788,italic: 0,skew: 0},8769: {depth: -.13313,height: .36687,italic: 0,skew: 0},8770: {depth: -.03625,height: .46375,italic: 0,skew: 0},8774: {depth: .30274,height: .79383,italic: 0,skew: 0},8776: {depth: -.01688,height: .48312,italic: 0,skew: 0},8778: {depth: .08167,height: .58167,italic: 0,skew: 0},8782: {depth: .06062,height: .54986,italic: 0,skew: 0},8783: {depth: .06062,height: .54986,italic: 0,skew: 0},8785: {depth: .08198,height: .58198,italic: 0,skew: 0},8786: {depth: .08198,height: .58198,italic: 0,skew: 0},8787: {depth: .08198,height: .58198,italic: 0,skew: 0},8790: {depth: 0,height: .69224,italic: 0,skew: 0},8791: {depth: .22958,height: .72958,italic: 0,skew: 0},8796: {depth: .08198,height: .91667,italic: 0,skew: 0},88: {depth: 0,height: .68889,italic: 0,skew: 0},8806: {depth: .25583,height: .75583,italic: 0,skew: 0},8807: {depth: .25583,height: .75583,italic: 0,skew: 0},8808: {depth: .25142,height: .75726,italic: 0,skew: 0},8809: {depth: .25142,height: .75726,italic: 0,skew: 0},8812: {depth: .25583,height: .75583,italic: 0,skew: 0},8814: {depth: .20576,height: .70576,italic: 0,skew: 0},8815: {depth: .20576,height: .70576,italic: 0,skew: 0},8816: {depth: .30274,height: .79383,italic: 0,skew: 0},8817: {depth: .30274,height: .79383,italic: 0,skew: 0},8818: {depth: .22958,height: .72958,italic: 0,skew: 0},8819: {depth: .22958,height: .72958,italic: 0,skew: 0},8822: {depth: .1808,height: .675,italic: 0,skew: 0},8823: {depth: .1808,height: .675,italic: 0,skew: 0},8828: {depth: .13667,height: .63667,italic: 0,skew: 0},8829: {depth: .13667,height: .63667,italic: 0,skew: 0},8830: {depth: .22958,height: .72958,italic: 0,skew: 0},8831: {depth: .22958,height: .72958,italic: 0,skew: 0},8832: {depth: .20576,height: .70576,italic: 0,skew: 0},8833: {depth: .20576,height: .70576,italic: 0,skew: 0},8840: {depth: .30274,height: .79383,italic: 0,skew: 0},8841: {depth: .30274,height: .79383,italic: 0,skew: 0},8842: {depth: .13597,height: .63597,italic: 0,skew: 0},8843: {depth: .13597,height: .63597,italic: 0,skew: 0},8847: {depth: .03517,height: .54986,italic: 0,skew: 0},8848: {depth: .03517,height: .54986,italic: 0,skew: 0},8858: {depth: .08198,height: .58198,italic: 0,skew: 0},8859: {depth: .08198,height: .58198,italic: 0,skew: 0},8861: {depth: .08198,height: .58198,italic: 0,skew: 0},8862: {depth: 0,height: .675,italic: 0,skew: 0},8863: {depth: 0,height: .675,italic: 0,skew: 0},8864: {depth: 0,height: .675,italic: 0,skew: 0},8865: {depth: 0,height: .675,italic: 0,skew: 0},8872: {depth: 0,height: .69224,italic: 0,skew: 0},8873: {depth: 0,height: .69224,italic: 0,skew: 0},8874: {depth: 0,height: .69224,italic: 0,skew: 0},8876: {depth: 0,height: .68889,italic: 0,skew: 0},8877: {depth: 0,height: .68889,italic: 0,skew: 0},8878: {depth: 0,height: .68889,italic: 0,skew: 0},8879: {depth: 0,height: .68889,italic: 0,skew: 0},8882: {depth: .03517,height: .54986,italic: 0,skew: 0},8883: {depth: .03517,height: .54986,italic: 0,skew: 0},8884: {depth: .13667,height: .63667,italic: 0,skew: 0},8885: {depth: .13667,height: .63667,italic: 0,skew: 0},8888: {depth: 0,height: .54986,italic: 0,skew: 0},8890: {depth: .19444,height: .43056,italic: 0,skew: 0},8891: {depth: .19444,height: .69224,italic: 0,skew: 0},8892: {depth: .19444,height: .69224,italic: 0,skew: 0},89: {depth: 0,height: .68889,italic: 0,skew: 0},8901: {depth: 0,height: .54986,italic: 0,skew: 0},8903: {depth: .08167,height: .58167,italic: 0,skew: 0},8905: {depth: .08167,height: .58167,italic: 0,skew: 0},8906: {depth: .08167,height: .58167,italic: 0,skew: 0},8907: {depth: 0,height: .69224,italic: 0,skew: 0},8908: {depth: 0,height: .69224,italic: 0,skew: 0},8909: {depth: -.03598,height: .46402,italic: 0,skew: 0},8910: {depth: 0,height: .54986,italic: 0,skew: 0},8911: {depth: 0,height: .54986,italic: 0,skew: 0},8912: {depth: .03517,height: .54986,italic: 0,skew: 0},8913: {depth: .03517,height: .54986,italic: 0,skew: 0},8914: {depth: 0,height: .54986,italic: 0,skew: 0},8915: {depth: 0,height: .54986,italic: 0,skew: 0},8916: {depth: 0,height: .69224,italic: 0,skew: 0},8918: {depth: .0391,height: .5391,italic: 0,skew: 0},8919: {depth: .0391,height: .5391,italic: 0,skew: 0},8920: {depth: .03517,height: .54986,italic: 0,skew: 0},8921: {depth: .03517,height: .54986,italic: 0,skew: 0},8922: {depth: .38569,height: .88569,italic: 0,skew: 0},8923: {depth: .38569,height: .88569,italic: 0,skew: 0},8926: {depth: .13667,height: .63667,italic: 0,skew: 0},8927: {depth: .13667,height: .63667,italic: 0,skew: 0},8928: {depth: .30274,height: .79383,italic: 0,skew: 0},8929: {depth: .30274,height: .79383,italic: 0,skew: 0},8934: {depth: .23222,height: .74111,italic: 0,skew: 0},8935: {depth: .23222,height: .74111,italic: 0,skew: 0},8936: {depth: .23222,height: .74111,italic: 0,skew: 0},8937: {depth: .23222,height: .74111,italic: 0,skew: 0},8938: {depth: .20576,height: .70576,italic: 0,skew: 0},8939: {depth: .20576,height: .70576,italic: 0,skew: 0},8940: {depth: .30274,height: .79383,italic: 0,skew: 0},8941: {depth: .30274,height: .79383,italic: 0,skew: 0},8994: {depth: .19444,height: .69224,italic: 0,skew: 0},8995: {depth: .19444,height: .69224,italic: 0,skew: 0},90: {depth: 0,height: .68889,italic: 0,skew: 0},9416: {depth: .15559,height: .69224,italic: 0,skew: 0},9484: {depth: 0,height: .69224,italic: 0,skew: 0},9488: {depth: 0,height: .69224,italic: 0,skew: 0},9492: {depth: 0,height: .37788,italic: 0,skew: 0},9496: {depth: 0,height: .37788,italic: 0,skew: 0},9585: {depth: .19444,height: .68889,italic: 0,skew: 0},9586: {depth: .19444,height: .74111,italic: 0,skew: 0},9632: {depth: 0,height: .675,italic: 0,skew: 0},9633: {depth: 0,height: .675,italic: 0,skew: 0},9650: {depth: 0,height: .54986,italic: 0,skew: 0},9651: {depth: 0,height: .54986,italic: 0,skew: 0},9654: {depth: .03517,height: .54986,italic: 0,skew: 0},9660: {depth: 0,height: .54986,italic: 0,skew: 0},9661: {depth: 0,height: .54986,italic: 0,skew: 0},9664: {depth: .03517,height: .54986,italic: 0,skew: 0},9674: {depth: .11111,height: .69224,italic: 0,skew: 0},9733: {depth: .19444,height: .69224,italic: 0,skew: 0},989: {depth: .08167,height: .58167,italic: 0,skew: 0}},"Main-Bold": {100: {depth: 0,height: .69444,italic: 0,skew: 0},101: {depth: 0,height: .44444,italic: 0,skew: 0},102: {depth: 0,height: .69444,italic: .10903,skew: 0},10216: {depth: .25,height: .75,italic: 0,skew: 0},10217: {depth: .25,height: .75,italic: 0,skew: 0},103: {depth: .19444,height: .44444,italic: .01597,skew: 0},104: {depth: 0,height: .69444,italic: 0,skew: 0},105: {depth: 0,height: .69444,italic: 0,skew: 0},106: {depth: .19444,height: .69444,italic: 0,skew: 0},107: {depth: 0,height: .69444,italic: 0,skew: 0},108: {depth: 0,height: .69444,italic: 0,skew: 0},10815: {depth: 0,height: .68611,italic: 0,skew: 0},109: {depth: 0,height: .44444,italic: 0,skew: 0},10927: {depth: .19667,height: .69667,italic: 0,skew: 0},10928: {depth: .19667,height: .69667,italic: 0,skew: 0},110: {depth: 0,height: .44444,italic: 0,skew: 0},111: {depth: 0,height: .44444,italic: 0,skew: 0},112: {depth: .19444,height: .44444,italic: 0,skew: 0},113: {depth: .19444,height: .44444,italic: 0,skew: 0},114: {depth: 0,height: .44444,italic: 0,skew: 0},115: {depth: 0,height: .44444,italic: 0,skew: 0},116: {depth: 0,height: .63492,italic: 0,skew: 0},117: {depth: 0,height: .44444,italic: 0,skew: 0},118: {depth: 0,height: .44444,italic: .01597,skew: 0},119: {depth: 0,height: .44444,italic: .01597,skew: 0},120: {depth: 0,height: .44444,italic: 0,skew: 0},121: {depth: .19444,height: .44444,italic: .01597,skew: 0},122: {depth: 0,height: .44444,italic: 0,skew: 0},123: {depth: .25,height: .75,italic: 0,skew: 0},124: {depth: .25,height: .75,italic: 0,skew: 0},125: {depth: .25,height: .75,italic: 0,skew: 0},126: {depth: .35,height: .34444,italic: 0,skew: 0},168: {depth: 0,height: .69444,italic: 0,skew: 0},172: {depth: 0,height: .44444,italic: 0,skew: 0},175: {depth: 0,height: .59611,italic: 0,skew: 0},176: {depth: 0,height: .69444,italic: 0,skew: 0},177: {depth: .13333,height: .63333,italic: 0,skew: 0},180: {depth: 0,height: .69444,italic: 0,skew: 0},215: {depth: .13333,height: .63333,italic: 0,skew: 0},247: {depth: .13333,height: .63333,italic: 0,skew: 0},305: {depth: 0,height: .44444,italic: 0,skew: 0},33: {depth: 0,height: .69444,italic: 0,skew: 0},34: {depth: 0,height: .69444,italic: 0,skew: 0},35: {depth: .19444,height: .69444,italic: 0,skew: 0},36: {depth: .05556,height: .75,italic: 0,skew: 0},37: {depth: .05556,height: .75,italic: 0,skew: 0},38: {depth: 0,height: .69444,italic: 0,skew: 0},39: {depth: 0,height: .69444,italic: 0,skew: 0},40: {depth: .25,height: .75,italic: 0,skew: 0},41: {depth: .25,height: .75,italic: 0,skew: 0},42: {depth: 0,height: .75,italic: 0,skew: 0},43: {depth: .13333,height: .63333,italic: 0,skew: 0},44: {depth: .19444,height: .15556,italic: 0,skew: 0},45: {depth: 0,height: .44444,italic: 0,skew: 0},46: {depth: 0,height: .15556,italic: 0,skew: 0},47: {depth: .25,height: .75,italic: 0,skew: 0},48: {depth: 0,height: .64444,italic: 0,skew: 0},49: {depth: 0,height: .64444,italic: 0,skew: 0},50: {depth: 0,height: .64444,italic: 0,skew: 0},51: {depth: 0,height: .64444,italic: 0,skew: 0},52: {depth: 0,height: .64444,italic: 0,skew: 0},53: {depth: 0,height: .64444,italic: 0,skew: 0},54: {depth: 0,height: .64444,italic: 0,skew: 0},55: {depth: 0,height: .64444,italic: 0,skew: 0},56: {depth: 0,height: .64444,italic: 0,skew: 0},567: {depth: .19444,height: .44444,italic: 0,skew: 0},57: {depth: 0,height: .64444,italic: 0,skew: 0},58: {depth: 0,height: .44444,italic: 0,skew: 0},59: {depth: .19444,height: .44444,italic: 0,skew: 0},60: {depth: .08556,height: .58556,italic: 0,skew: 0},61: {depth: -.10889,height: .39111,italic: 0,skew: 0},62: {depth: .08556,height: .58556,italic: 0,skew: 0},63: {depth: 0,height: .69444,italic: 0,skew: 0},64: {depth: 0,height: .69444,italic: 0,skew: 0},65: {depth: 0,height: .68611,italic: 0,skew: 0},66: {depth: 0,height: .68611,italic: 0,skew: 0},67: {depth: 0,height: .68611,italic: 0,skew: 0},68: {depth: 0,height: .68611,italic: 0,skew: 0},69: {depth: 0,height: .68611,italic: 0,skew: 0},70: {depth: 0,height: .68611,italic: 0,skew: 0},71: {depth: 0,height: .68611,italic: 0,skew: 0},710: {depth: 0,height: .69444,italic: 0,skew: 0},711: {depth: 0,height: .63194,italic: 0,skew: 0},713: {depth: 0,height: .59611,italic: 0,skew: 0},714: {depth: 0,height: .69444,italic: 0,skew: 0},715: {depth: 0,height: .69444,italic: 0,skew: 0},72: {depth: 0,height: .68611,italic: 0,skew: 0},728: {depth: 0,height: .69444,italic: 0,skew: 0},729: {depth: 0,height: .69444,italic: 0,skew: 0},73: {depth: 0,height: .68611,italic: 0,skew: 0},730: {depth: 0,height: .69444,italic: 0,skew: 0},732: {depth: 0,height: .69444,italic: 0,skew: 0},74: {depth: 0,height: .68611,italic: 0,skew: 0},75: {depth: 0,height: .68611,italic: 0,skew: 0},76: {depth: 0,height: .68611,italic: 0,skew: 0},768: {depth: 0,height: .69444,italic: 0,skew: 0},769: {depth: 0,height: .69444,italic: 0,skew: 0},77: {depth: 0,height: .68611,italic: 0,skew: 0},770: {depth: 0,height: .69444,italic: 0,skew: 0},771: {depth: 0,height: .69444,italic: 0,skew: 0},772: {depth: 0,height: .59611,italic: 0,skew: 0},774: {depth: 0,height: .69444,italic: 0,skew: 0},775: {depth: 0,height: .69444,italic: 0,skew: 0},776: {depth: 0,height: .69444,italic: 0,skew: 0},778: {depth: 0,height: .69444,italic: 0,skew: 0},779: {depth: 0,height: .69444,italic: 0,skew: 0},78: {depth: 0,height: .68611,italic: 0,skew: 0},780: {depth: 0,height: .63194,italic: 0,skew: 0},79: {depth: 0,height: .68611,italic: 0,skew: 0},80: {depth: 0,height: .68611,italic: 0,skew: 0},81: {depth: .19444,height: .68611,italic: 0,skew: 0},82: {depth: 0,height: .68611,italic: 0,skew: 0},8211: {depth: 0,height: .44444,italic: .03194,skew: 0},8212: {depth: 0,height: .44444,italic: .03194,skew: 0},8216: {depth: 0,height: .69444,italic: 0,skew: 0},8217: {depth: 0,height: .69444,italic: 0,skew: 0},8220: {depth: 0,height: .69444,italic: 0,skew: 0},8221: {depth: 0,height: .69444,italic: 0,skew: 0},8224: {depth: .19444,height: .69444,italic: 0,skew: 0},8225: {depth: .19444,height: .69444,italic: 0,skew: 0},824: {depth: .19444,height: .69444,italic: 0,skew: 0},8242: {depth: 0,height: .55556,italic: 0,skew: 0},83: {depth: 0,height: .68611,italic: 0,skew: 0},84: {depth: 0,height: .68611,italic: 0,skew: 0},8407: {depth: 0,height: .72444,italic: .15486,skew: 0},8463: {depth: 0,height: .69444,italic: 0,skew: 0},8465: {depth: 0,height: .69444,italic: 0,skew: 0},8467: {depth: 0,height: .69444,italic: 0,skew: 0},8472: {depth: .19444,height: .44444,italic: 0,skew: 0},8476: {depth: 0,height: .69444,italic: 0,skew: 0},85: {depth: 0,height: .68611,italic: 0,skew: 0},8501: {depth: 0,height: .69444,italic: 0,skew: 0},8592: {depth: -.10889,height: .39111,italic: 0,skew: 0},8593: {depth: .19444,height: .69444,italic: 0,skew: 0},8594: {depth: -.10889,height: .39111,italic: 0,skew: 0},8595: {depth: .19444,height: .69444,italic: 0,skew: 0},8596: {depth: -.10889,height: .39111,italic: 0,skew: 0},8597: {depth: .25,height: .75,italic: 0,skew: 0},8598: {depth: .19444,height: .69444,italic: 0,skew: 0},8599: {depth: .19444,height: .69444,italic: 0,skew: 0},86: {depth: 0,height: .68611,italic: .01597,skew: 0},8600: {depth: .19444,height: .69444,italic: 0,skew: 0},8601: {depth: .19444,height: .69444,italic: 0,skew: 0},8636: {depth: -.10889,height: .39111,italic: 0,skew: 0},8637: {depth: -.10889,height: .39111,italic: 0,skew: 0},8640: {depth: -.10889,height: .39111,italic: 0,skew: 0},8641: {depth: -.10889,height: .39111,italic: 0,skew: 0},8656: {depth: -.10889,height: .39111,italic: 0,skew: 0},8657: {depth: .19444,height: .69444,italic: 0,skew: 0},8658: {depth: -.10889,height: .39111,italic: 0,skew: 0},8659: {depth: .19444,height: .69444,italic: 0,skew: 0},8660: {depth: -.10889,height: .39111,italic: 0,skew: 0},8661: {depth: .25,height: .75,italic: 0,skew: 0},87: {depth: 0,height: .68611,italic: .01597,skew: 0},8704: {depth: 0,height: .69444,italic: 0,skew: 0},8706: {depth: 0,height: .69444,italic: .06389,skew: 0},8707: {depth: 0,height: .69444,italic: 0,skew: 0},8709: {depth: .05556,height: .75,italic: 0,skew: 0},8711: {depth: 0,height: .68611,italic: 0,skew: 0},8712: {depth: .08556,height: .58556,italic: 0,skew: 0},8715: {depth: .08556,height: .58556,italic: 0,skew: 0},8722: {depth: .13333,height: .63333,italic: 0,skew: 0},8723: {depth: .13333,height: .63333,italic: 0,skew: 0},8725: {depth: .25,height: .75,italic: 0,skew: 0},8726: {depth: .25,height: .75,italic: 0,skew: 0},8727: {depth: -.02778,height: .47222,italic: 0,skew: 0},8728: {depth: -.02639,height: .47361,italic: 0,skew: 0},8729: {depth: -.02639,height: .47361,italic: 0,skew: 0},8730: {depth: .18,height: .82,italic: 0,skew: 0},8733: {depth: 0,height: .44444,italic: 0,skew: 0},8734: {depth: 0,height: .44444,italic: 0,skew: 0},8736: {depth: 0,height: .69224,italic: 0,skew: 0},8739: {depth: .25,height: .75,italic: 0,skew: 0},8741: {depth: .25,height: .75,italic: 0,skew: 0},8743: {depth: 0,height: .55556,italic: 0,skew: 0},8744: {depth: 0,height: .55556,italic: 0,skew: 0},8745: {depth: 0,height: .55556,italic: 0,skew: 0},8746: {depth: 0,height: .55556,italic: 0,skew: 0},8747: {depth: .19444,height: .69444,italic: .12778,skew: 0},8764: {depth: -.10889,height: .39111,italic: 0,skew: 0},8768: {depth: .19444,height: .69444,italic: 0,skew: 0},8771: {depth: .00222,height: .50222,italic: 0,skew: 0},8776: {depth: .02444,height: .52444,italic: 0,skew: 0},8781: {depth: .00222,height: .50222,italic: 0,skew: 0},88: {depth: 0,height: .68611,italic: 0,skew: 0},8801: {depth: .00222,height: .50222,italic: 0,skew: 0},8804: {depth: .19667,height: .69667,italic: 0,skew: 0},8805: {depth: .19667,height: .69667,italic: 0,skew: 0},8810: {depth: .08556,height: .58556,italic: 0,skew: 0},8811: {depth: .08556,height: .58556,italic: 0,skew: 0},8826: {depth: .08556,height: .58556,italic: 0,skew: 0},8827: {depth: .08556,height: .58556,italic: 0,skew: 0},8834: {depth: .08556,height: .58556,italic: 0,skew: 0},8835: {depth: .08556,height: .58556,italic: 0,skew: 0},8838: {depth: .19667,height: .69667,italic: 0,skew: 0},8839: {depth: .19667,height: .69667,italic: 0,skew: 0},8846: {depth: 0,height: .55556,italic: 0,skew: 0},8849: {depth: .19667,height: .69667,italic: 0,skew: 0},8850: {depth: .19667,height: .69667,italic: 0,skew: 0},8851: {depth: 0,height: .55556,italic: 0,skew: 0},8852: {depth: 0,height: .55556,italic: 0,skew: 0},8853: {depth: .13333,height: .63333,italic: 0,skew: 0},8854: {depth: .13333,height: .63333,italic: 0,skew: 0},8855: {depth: .13333,height: .63333,italic: 0,skew: 0},8856: {depth: .13333,height: .63333,italic: 0,skew: 0},8857: {depth: .13333,height: .63333,italic: 0,skew: 0},8866: {depth: 0,height: .69444,italic: 0,skew: 0},8867: {depth: 0,height: .69444,italic: 0,skew: 0},8868: {depth: 0,height: .69444,italic: 0,skew: 0},8869: {depth: 0,height: .69444,italic: 0,skew: 0},89: {depth: 0,height: .68611,italic: .02875,skew: 0},8900: {depth: -.02639,height: .47361,italic: 0,skew: 0},8901: {depth: -.02639,height: .47361,italic: 0,skew: 0},8902: {depth: -.02778,height: .47222,italic: 0,skew: 0},8968: {depth: .25,height: .75,italic: 0,skew: 0},8969: {depth: .25,height: .75,italic: 0,skew: 0},8970: {depth: .25,height: .75,italic: 0,skew: 0},8971: {depth: .25,height: .75,italic: 0,skew: 0},8994: {depth: -.13889,height: .36111,italic: 0,skew: 0},8995: {depth: -.13889,height: .36111,italic: 0,skew: 0},90: {depth: 0,height: .68611,italic: 0,skew: 0},91: {depth: .25,height: .75,italic: 0,skew: 0},915: {depth: 0,height: .68611,italic: 0,skew: 0},916: {depth: 0,height: .68611,italic: 0,skew: 0},92: {depth: .25,height: .75,italic: 0,skew: 0},920: {depth: 0,height: .68611,italic: 0,skew: 0},923: {depth: 0,height: .68611,italic: 0,skew: 0},926: {depth: 0,height: .68611,italic: 0,skew: 0},928: {depth: 0,height: .68611,italic: 0,skew: 0},93: {depth: .25,height: .75,italic: 0,skew: 0},931: {depth: 0,height: .68611,italic: 0,skew: 0},933: {depth: 0,height: .68611,italic: 0,skew: 0},934: {depth: 0,height: .68611,italic: 0,skew: 0},936: {depth: 0,height: .68611,italic: 0,skew: 0},937: {depth: 0,height: .68611,italic: 0,skew: 0},94: {depth: 0,height: .69444,italic: 0,skew: 0},95: {depth: .31,height: .13444,italic: .03194,skew: 0},96: {depth: 0,height: .69444,italic: 0,skew: 0},9651: {depth: .19444,height: .69444,italic: 0,skew: 0},9657: {depth: -.02778,height: .47222,italic: 0,skew: 0},9661: {depth: .19444,height: .69444,italic: 0,skew: 0},9667: {depth: -.02778,height: .47222,italic: 0,skew: 0},97: {depth: 0,height: .44444,italic: 0,skew: 0},9711: {depth: .19444,height: .69444,italic: 0,skew: 0},98: {depth: 0,height: .69444,italic: 0,skew: 0},9824: {depth: .12963,height: .69444,italic: 0,skew: 0},9825: {depth: .12963,height: .69444,italic: 0,skew: 0},9826: {depth: .12963,height: .69444,italic: 0,skew: 0},9827: {depth: .12963,height: .69444,italic: 0,skew: 0},9837: {depth: 0,height: .75,italic: 0,skew: 0},9838: {depth: .19444,height: .69444,italic: 0,skew: 0},9839: {depth: .19444,height: .69444,italic: 0,skew: 0},99: {depth: 0,height: .44444,italic: 0,skew: 0}},"Main-Italic": {100: {depth: 0,height: .69444,italic: .10333,skew: 0},101: {depth: 0,height: .43056,italic: .07514,skew: 0},102: {depth: .19444,height: .69444,italic: .21194,skew: 0},103: {depth: .19444,height: .43056,italic: .08847,skew: 0},104: {depth: 0,height: .69444,italic: .07671,skew: 0},105: {depth: 0,height: .65536,italic: .1019,skew: 0},106: {depth: .19444,height: .65536,italic: .14467,skew: 0},107: {depth: 0,height: .69444,italic: .10764,skew: 0},108: {depth: 0,height: .69444,italic: .10333,skew: 0},109: {depth: 0,height: .43056,italic: .07671,skew: 0},110: {depth: 0,height: .43056,italic: .07671,skew: 0},111: {depth: 0,height: .43056,italic: .06312,skew: 0},112: {depth: .19444,height: .43056,italic: .06312,skew: 0},113: {depth: .19444,height: .43056,italic: .08847,skew: 0},114: {depth: 0,height: .43056,italic: .10764,skew: 0},115: {depth: 0,height: .43056,italic: .08208,skew: 0},116: {depth: 0,height: .61508,italic: .09486,skew: 0},117: {depth: 0,height: .43056,italic: .07671,skew: 0},118: {depth: 0,height: .43056,italic: .10764,skew: 0},119: {depth: 0,height: .43056,italic: .10764,skew: 0},120: {depth: 0,height: .43056,italic: .12042,skew: 0},121: {depth: .19444,height: .43056,italic: .08847,skew: 0},122: {depth: 0,height: .43056,italic: .12292,skew: 0},126: {depth: .35,height: .31786,italic: .11585,skew: 0},163: {depth: 0,height: .69444,italic: 0,skew: 0},305: {depth: 0,height: .43056,italic: .07671,skew: 0},33: {depth: 0,height: .69444,italic: .12417,skew: 0},34: {depth: 0,height: .69444,italic: .06961,skew: 0},35: {depth: .19444,height: .69444,italic: .06616,skew: 0},37: {depth: .05556,height: .75,italic: .13639,skew: 0},38: {depth: 0,height: .69444,italic: .09694,skew: 0},39: {depth: 0,height: .69444,italic: .12417,skew: 0},40: {depth: .25,height: .75,italic: .16194,skew: 0},41: {depth: .25,height: .75,italic: .03694,skew: 0},42: {depth: 0,height: .75,italic: .14917,skew: 0},43: {depth: .05667,height: .56167,italic: .03694,skew: 0},44: {depth: .19444,height: .10556,italic: 0,skew: 0},45: {depth: 0,height: .43056,italic: .02826,skew: 0},46: {depth: 0,height: .10556,italic: 0,skew: 0},47: {depth: .25,height: .75,italic: .16194,skew: 0},48: {depth: 0,height: .64444,italic: .13556,skew: 0},49: {depth: 0,height: .64444,italic: .13556,skew: 0},50: {depth: 0,height: .64444,italic: .13556,skew: 0},51: {depth: 0,height: .64444,italic: .13556,skew: 0},52: {depth: .19444,height: .64444,italic: .13556,skew: 0},53: {depth: 0,height: .64444,italic: .13556,skew: 0},54: {depth: 0,height: .64444,italic: .13556,skew: 0},55: {depth: .19444,height: .64444,italic: .13556,skew: 0},56: {depth: 0,height: .64444,italic: .13556,skew: 0},567: {depth: .19444,height: .43056,italic: .03736,skew: 0},57: {depth: 0,height: .64444,italic: .13556,skew: 0},58: {depth: 0,height: .43056,italic: .0582,skew: 0},59: {depth: .19444,height: .43056,italic: .0582,skew: 0},61: {depth: -.13313,height: .36687,italic: .06616,skew: 0},63: {depth: 0,height: .69444,italic: .1225,skew: 0},64: {depth: 0,height: .69444,italic: .09597,skew: 0},65: {depth: 0,height: .68333,italic: 0,skew: 0},66: {depth: 0,height: .68333,italic: .10257,skew: 0},67: {depth: 0,height: .68333,italic: .14528,skew: 0},68: {depth: 0,height: .68333,italic: .09403,skew: 0},69: {depth: 0,height: .68333,italic: .12028,skew: 0},70: {depth: 0,height: .68333,italic: .13305,skew: 0},71: {depth: 0,height: .68333,italic: .08722,skew: 0},72: {depth: 0,height: .68333,italic: .16389,skew: 0},73: {depth: 0,height: .68333,italic: .15806,skew: 0},74: {depth: 0,height: .68333,italic: .14028,skew: 0},75: {depth: 0,height: .68333,italic: .14528,skew: 0},76: {depth: 0,height: .68333,italic: 0,skew: 0},768: {depth: 0,height: .69444,italic: 0,skew: 0},769: {depth: 0,height: .69444,italic: .09694,skew: 0},77: {depth: 0,height: .68333,italic: .16389,skew: 0},770: {depth: 0,height: .69444,italic: .06646,skew: 0},771: {depth: 0,height: .66786,italic: .11585,skew: 0},772: {depth: 0,height: .56167,italic: .10333,skew: 0},774: {depth: 0,height: .69444,italic: .10806,skew: 0},775: {depth: 0,height: .66786,italic: .11752,skew: 0},776: {depth: 0,height: .66786,italic: .10474,skew: 0},778: {depth: 0,height: .69444,italic: 0,skew: 0},779: {depth: 0,height: .69444,italic: .1225,skew: 0},78: {depth: 0,height: .68333,italic: .16389,skew: 0},780: {depth: 0,height: .62847,italic: .08295,skew: 0},79: {depth: 0,height: .68333,italic: .09403,skew: 0},80: {depth: 0,height: .68333,italic: .10257,skew: 0},81: {depth: .19444,height: .68333,italic: .09403,skew: 0},82: {depth: 0,height: .68333,italic: .03868,skew: 0},8211: {depth: 0,height: .43056,italic: .09208,skew: 0},8212: {depth: 0,height: .43056,italic: .09208,skew: 0},8216: {depth: 0,height: .69444,italic: .12417,skew: 0},8217: {depth: 0,height: .69444,italic: .12417,skew: 0},8220: {depth: 0,height: .69444,italic: .1685,skew: 0},8221: {depth: 0,height: .69444,italic: .06961,skew: 0},83: {depth: 0,height: .68333,italic: .11972,skew: 0},84: {depth: 0,height: .68333,italic: .13305,skew: 0},8463: {depth: 0,height: .68889,italic: 0,skew: 0},85: {depth: 0,height: .68333,italic: .16389,skew: 0},86: {depth: 0,height: .68333,italic: .18361,skew: 0},87: {depth: 0,height: .68333,italic: .18361,skew: 0},88: {depth: 0,height: .68333,italic: .15806,skew: 0},89: {depth: 0,height: .68333,italic: .19383,skew: 0},90: {depth: 0,height: .68333,italic: .14528,skew: 0},91: {depth: .25,height: .75,italic: .1875,skew: 0},915: {depth: 0,height: .68333,italic: .13305,skew: 0},916: {depth: 0,height: .68333,italic: 0,skew: 0},920: {depth: 0,height: .68333,italic: .09403,skew: 0},923: {depth: 0,height: .68333,italic: 0,skew: 0},926: {depth: 0,height: .68333,italic: .15294,skew: 0},928: {depth: 0,height: .68333,italic: .16389,skew: 0},93: {depth: .25,height: .75,italic: .10528,skew: 0},931: {depth: 0,height: .68333,italic: .12028,skew: 0},933: {depth: 0,height: .68333,italic: .11111,skew: 0},934: {depth: 0,height: .68333,italic: .05986,skew: 0},936: {depth: 0,height: .68333,italic: .11111,skew: 0},937: {depth: 0,height: .68333,italic: .10257,skew: 0},94: {depth: 0,height: .69444,italic: .06646,skew: 0},95: {depth: .31,height: .12056,italic: .09208,skew: 0},97: {depth: 0,height: .43056,italic: .07671,skew: 0},98: {depth: 0,height: .69444,italic: .06312,skew: 0},99: {depth: 0,height: .43056,italic: .05653,skew: 0}},"Main-Regular": {32: {depth: -0,height: 0,italic: 0,skew: 0},160: {depth: -0,height: 0,italic: 0,skew: 0},8230: {depth: -0,height: .12,italic: 0,skew: 0},8773: {depth: -.022,height: .589,italic: 0,skew: 0},8800: {depth: .215,height: .716,italic: 0,skew: 0},8942: {depth: .03,height: .9,italic: 0,skew: 0},8943: {depth: -.19,height: .31,italic: 0,skew: 0},8945: {depth: -.1,height: .82,italic: 0,skew: 0},100: {depth: 0,height: .69444,italic: 0,skew: 0},101: {depth: 0,height: .43056,italic: 0,skew: 0},102: {depth: 0,height: .69444,italic: .07778,skew: 0},10216: {depth: .25,height: .75,italic: 0,skew: 0},10217: {depth: .25,height: .75,italic: 0,skew: 0},103: {depth: .19444,height: .43056,italic: .01389,skew: 0},104: {depth: 0,height: .69444,italic: 0,skew: 0},105: {depth: 0,height: .66786,italic: 0,skew: 0},106: {depth: .19444,height: .66786,italic: 0,skew: 0},107: {depth: 0,height: .69444,italic: 0,skew: 0},108: {depth: 0,height: .69444,italic: 0,skew: 0},10815: {depth: 0,height: .68333,italic: 0,skew: 0},109: {depth: 0,height: .43056,italic: 0,skew: 0},10927: {depth: .13597,height: .63597,italic: 0,skew: 0},10928: {depth: .13597,height: .63597,italic: 0,skew: 0},110: {depth: 0,height: .43056,italic: 0,skew: 0},111: {depth: 0,height: .43056,italic: 0,skew: 0},112: {depth: .19444,height: .43056,italic: 0,skew: 0},113: {depth: .19444,height: .43056,italic: 0,skew: 0},114: {depth: 0,height: .43056,italic: 0,skew: 0},115: {depth: 0,height: .43056,italic: 0,skew: 0},116: {depth: 0,height: .61508,italic: 0,skew: 0},117: {depth: 0,height: .43056,italic: 0,skew: 0},118: {depth: 0,height: .43056,italic: .01389,skew: 0},119: {depth: 0,height: .43056,italic: .01389,skew: 0},120: {depth: 0,height: .43056,italic: 0,skew: 0},121: {depth: .19444,height: .43056,italic: .01389,skew: 0},122: {depth: 0,height: .43056,italic: 0,skew: 0},123: {depth: .25,height: .75,italic: 0,skew: 0},124: {depth: .25,height: .75,italic: 0,skew: 0},125: {depth: .25,height: .75,italic: 0,skew: 0},126: {depth: .35,height: .31786,italic: 0,skew: 0},168: {depth: 0,height: .66786,italic: 0,skew: 0},172: {depth: 0,height: .43056,italic: 0,skew: 0},175: {depth: 0,height: .56778,italic: 0,skew: 0},176: {depth: 0,height: .69444,italic: 0,skew: 0},177: {depth: .08333,height: .58333,italic: 0,skew: 0},180: {depth: 0,height: .69444,italic: 0,skew: 0},215: {depth: .08333,height: .58333,italic: 0,skew: 0},247: {depth: .08333,height: .58333,italic: 0,skew: 0},305: {depth: 0,height: .43056,italic: 0,skew: 0},33: {depth: 0,height: .69444,italic: 0,skew: 0},34: {depth: 0,height: .69444,italic: 0,skew: 0},35: {depth: .19444,height: .69444,italic: 0,skew: 0},36: {depth: .05556,height: .75,italic: 0,skew: 0},37: {depth: .05556,height: .75,italic: 0,skew: 0},38: {depth: 0,height: .69444,italic: 0,skew: 0},39: {depth: 0,height: .69444,italic: 0,skew: 0},40: {depth: .25,height: .75,italic: 0,skew: 0},41: {depth: .25,height: .75,italic: 0,skew: 0},42: {depth: 0,height: .75,italic: 0,skew: 0},43: {depth: .08333,height: .58333,italic: 0,skew: 0},44: {depth: .19444,height: .10556,italic: 0,skew: 0},45: {depth: 0,height: .43056,italic: 0,skew: 0},46: {depth: 0,height: .10556,italic: 0,skew: 0},47: {depth: .25,height: .75,italic: 0,skew: 0},48: {depth: 0,height: .64444,italic: 0,skew: 0},49: {depth: 0,height: .64444,italic: 0,skew: 0},50: {depth: 0,height: .64444,italic: 0,skew: 0},51: {depth: 0,height: .64444,italic: 0,skew: 0},52: {depth: 0,height: .64444,italic: 0,skew: 0},53: {depth: 0,height: .64444,italic: 0,skew: 0},54: {depth: 0,height: .64444,italic: 0,skew: 0},55: {depth: 0,height: .64444,italic: 0,skew: 0},56: {depth: 0,height: .64444,italic: 0,skew: 0},567: {depth: .19444,height: .43056,italic: 0,skew: 0},57: {depth: 0,height: .64444,italic: 0,skew: 0},58: {depth: 0,height: .43056,italic: 0,skew: 0},59: {depth: .19444,height: .43056,italic: 0,skew: 0},60: {depth: .0391,height: .5391,italic: 0,skew: 0},61: {depth: -.13313,height: .36687,italic: 0,skew: 0},62: {depth: .0391,height: .5391,italic: 0,skew: 0},63: {depth: 0,height: .69444,italic: 0,skew: 0},64: {depth: 0,height: .69444,italic: 0,skew: 0},65: {depth: 0,height: .68333,italic: 0,skew: 0},66: {depth: 0,height: .68333,italic: 0,skew: 0},67: {depth: 0,height: .68333,italic: 0,skew: 0},68: {depth: 0,height: .68333,italic: 0,skew: 0},69: {depth: 0,height: .68333,italic: 0,skew: 0},70: {depth: 0,height: .68333,italic: 0,skew: 0},71: {depth: 0,height: .68333,italic: 0,skew: 0},710: {depth: 0,height: .69444,italic: 0,skew: 0},711: {depth: 0,height: .62847,italic: 0,skew: 0},713: {depth: 0,height: .56778,italic: 0,skew: 0},714: {depth: 0,height: .69444,italic: 0,skew: 0},715: {depth: 0,height: .69444,italic: 0,skew: 0},72: {depth: 0,height: .68333,italic: 0,skew: 0},728: {depth: 0,height: .69444,italic: 0,skew: 0},729: {depth: 0,height: .66786,italic: 0,skew: 0},73: {depth: 0,height: .68333,italic: 0,skew: 0},730: {depth: 0,height: .69444,italic: 0,skew: 0},732: {depth: 0,height: .66786,italic: 0,skew: 0},74: {depth: 0,height: .68333,italic: 0,skew: 0},75: {depth: 0,height: .68333,italic: 0,skew: 0},76: {depth: 0,height: .68333,italic: 0,skew: 0},768: {depth: 0,height: .69444,italic: 0,skew: 0},769: {depth: 0,height: .69444,italic: 0,skew: 0},77: {depth: 0,height: .68333,italic: 0,skew: 0},770: {depth: 0,height: .69444,italic: 0,skew: 0},771: {depth: 0,height: .66786,italic: 0,skew: 0},772: {depth: 0,height: .56778,italic: 0,skew: 0},774: {depth: 0,height: .69444,italic: 0,skew: 0},775: {depth: 0,height: .66786,italic: 0,skew: 0},776: {depth: 0,height: .66786,italic: 0,skew: 0},778: {depth: 0,height: .69444,italic: 0,skew: 0},779: {depth: 0,height: .69444,italic: 0,skew: 0},78: {depth: 0,height: .68333,italic: 0,skew: 0},780: {depth: 0,height: .62847,italic: 0,skew: 0},79: {depth: 0,height: .68333,italic: 0,skew: 0},80: {depth: 0,height: .68333,italic: 0,skew: 0},81: {depth: .19444,height: .68333,italic: 0,skew: 0},82: {depth: 0,height: .68333,italic: 0,skew: 0},8211: {depth: 0,height: .43056,italic: .02778,skew: 0},8212: {depth: 0,height: .43056,italic: .02778,skew: 0},8216: {depth: 0,height: .69444,italic: 0,skew: 0},8217: {depth: 0,height: .69444,italic: 0,skew: 0},8220: {depth: 0,height: .69444,italic: 0,skew: 0},8221: {depth: 0,height: .69444,italic: 0,skew: 0},8224: {depth: .19444,height: .69444,italic: 0,skew: 0},8225: {depth: .19444,height: .69444,italic: 0,skew: 0},824: {depth: .19444,height: .69444,italic: 0,skew: 0},8242: {depth: 0,height: .55556,italic: 0,skew: 0},83: {depth: 0,height: .68333,italic: 0,skew: 0},84: {depth: 0,height: .68333,italic: 0,skew: 0},8407: {depth: 0,height: .71444,italic: .15382,skew: 0},8463: {depth: 0,height: .68889,italic: 0,skew: 0},8465: {depth: 0,height: .69444,italic: 0,skew: 0},8467: {depth: 0,height: .69444,italic: 0,skew: .11111},8472: {depth: .19444,height: .43056,italic: 0,skew: .11111},8476: {depth: 0,height: .69444,italic: 0,skew: 0},85: {depth: 0,height: .68333,italic: 0,skew: 0},8501: {depth: 0,height: .69444,italic: 0,skew: 0},8592: {depth: -.13313,height: .36687,italic: 0,skew: 0},8593: {depth: .19444,height: .69444,italic: 0,skew: 0},8594: {depth: -.13313,height: .36687,italic: 0,skew: 0},8595: {depth: .19444,height: .69444,italic: 0,skew: 0},8596: {depth: -.13313,height: .36687,italic: 0,skew: 0},8597: {depth: .25,height: .75,italic: 0,skew: 0},8598: {depth: .19444,height: .69444,italic: 0,skew: 0},8599: {depth: .19444,height: .69444,italic: 0,skew: 0},86: {depth: 0,height: .68333,italic: .01389,skew: 0},8600: {depth: .19444,height: .69444,italic: 0,skew: 0},8601: {depth: .19444,height: .69444,italic: 0,skew: 0},8636: {depth: -.13313,height: .36687,italic: 0,skew: 0},8637: {depth: -.13313,height: .36687,italic: 0,skew: 0},8640: {depth: -.13313,height: .36687,italic: 0,skew: 0},8641: {depth: -.13313,height: .36687,italic: 0,skew: 0},8656: {depth: -.13313,height: .36687,italic: 0,skew: 0},8657: {depth: .19444,height: .69444,italic: 0,skew: 0},8658: {depth: -.13313,height: .36687,italic: 0,skew: 0},8659: {depth: .19444,height: .69444,italic: 0,skew: 0},8660: {depth: -.13313,height: .36687,italic: 0,skew: 0},8661: {depth: .25,height: .75,italic: 0,skew: 0},87: {depth: 0,height: .68333,italic: .01389,skew: 0},8704: {depth: 0,height: .69444,italic: 0,skew: 0},8706: {depth: 0,height: .69444,italic: .05556,skew: .08334},8707: {depth: 0,height: .69444,italic: 0,skew: 0},8709: {depth: .05556,height: .75,italic: 0,skew: 0},8711: {depth: 0,height: .68333,italic: 0,skew: 0},8712: {depth: .0391,height: .5391,italic: 0,skew: 0},8715: {depth: .0391,height: .5391,italic: 0,skew: 0},8722: {depth: .08333,height: .58333,italic: 0,skew: 0},8723: {depth: .08333,height: .58333,italic: 0,skew: 0},8725: {depth: .25,height: .75,italic: 0,skew: 0},8726: {depth: .25,height: .75,italic: 0,skew: 0},8727: {depth: -.03472,height: .46528,italic: 0,skew: 0},8728: {depth: -.05555,height: .44445,italic: 0,skew: 0},8729: {depth: -.05555,height: .44445,italic: 0,skew: 0},8730: {depth: .2,height: .8,italic: 0,skew: 0},8733: {depth: 0,height: .43056,italic: 0,skew: 0},8734: {depth: 0,height: .43056,italic: 0,skew: 0},8736: {depth: 0,height: .69224,italic: 0,skew: 0},8739: {depth: .25,height: .75,italic: 0,skew: 0},8741: {depth: .25,height: .75,italic: 0,skew: 0},8743: {depth: 0,height: .55556,italic: 0,skew: 0},8744: {depth: 0,height: .55556,italic: 0,skew: 0},8745: {depth: 0,height: .55556,italic: 0,skew: 0},8746: {depth: 0,height: .55556,italic: 0,skew: 0},8747: {depth: .19444,height: .69444,italic: .11111,skew: 0},8764: {depth: -.13313,height: .36687,italic: 0,skew: 0},8768: {depth: .19444,height: .69444,italic: 0,skew: 0},8771: {depth: -.03625,height: .46375,italic: 0,skew: 0},8776: {depth: -.01688,height: .48312,italic: 0,skew: 0},8781: {depth: -.03625,height: .46375,italic: 0,skew: 0},88: {depth: 0,height: .68333,italic: 0,skew: 0},8801: {depth: -.03625,height: .46375,italic: 0,skew: 0},8804: {depth: .13597,height: .63597,italic: 0,skew: 0},8805: {depth: .13597,height: .63597,italic: 0,skew: 0},8810: {depth: .0391,height: .5391,italic: 0,skew: 0},8811: {depth: .0391,height: .5391,italic: 0,skew: 0},8826: {depth: .0391,height: .5391,italic: 0,skew: 0},8827: {depth: .0391,height: .5391,italic: 0,skew: 0},8834: {depth: .0391,height: .5391,italic: 0,skew: 0},8835: {depth: .0391,height: .5391,italic: 0,skew: 0},8838: {depth: .13597,height: .63597,italic: 0,skew: 0},8839: {depth: .13597,height: .63597,italic: 0,skew: 0},8846: {depth: 0,height: .55556,italic: 0,skew: 0},8849: {depth: .13597,height: .63597,italic: 0,skew: 0},8850: {depth: .13597,height: .63597,italic: 0,skew: 0},8851: {depth: 0,height: .55556,italic: 0,skew: 0},8852: {depth: 0,height: .55556,italic: 0,skew: 0},8853: {depth: .08333,height: .58333,italic: 0,skew: 0},8854: {depth: .08333,height: .58333,italic: 0,skew: 0},8855: {depth: .08333,height: .58333,italic: 0,skew: 0},8856: {depth: .08333,height: .58333,italic: 0,skew: 0},8857: {depth: .08333,height: .58333,italic: 0,skew: 0},8866: {depth: 0,height: .69444,italic: 0,skew: 0},8867: {depth: 0,height: .69444,italic: 0,skew: 0},8868: {depth: 0,height: .69444,italic: 0,skew: 0},8869: {depth: 0,height: .69444,italic: 0,skew: 0},89: {depth: 0,height: .68333,italic: .025,skew: 0},8900: {depth: -.05555,height: .44445,italic: 0,skew: 0},8901: {depth: -.05555,height: .44445,italic: 0,skew: 0},8902: {depth: -.03472,height: .46528,italic: 0,skew: 0},8968: {depth: .25,height: .75,italic: 0,skew: 0},8969: {depth: .25,height: .75,italic: 0,skew: 0},8970: {depth: .25,height: .75,italic: 0,skew: 0},8971: {depth: .25,height: .75,italic: 0,skew: 0},8994: {depth: -.14236,height: .35764,italic: 0,skew: 0},8995: {depth: -.14236,height: .35764,italic: 0,skew: 0},90: {depth: 0,height: .68333,italic: 0,skew: 0},91: {depth: .25,height: .75,italic: 0,skew: 0},915: {depth: 0,height: .68333,italic: 0,skew: 0},916: {depth: 0,height: .68333,italic: 0,skew: 0},92: {depth: .25,height: .75,italic: 0,skew: 0},920: {depth: 0,height: .68333,italic: 0,skew: 0},923: {depth: 0,height: .68333,italic: 0,skew: 0},926: {depth: 0,height: .68333,italic: 0,skew: 0},928: {depth: 0,height: .68333,italic: 0,skew: 0},93: {depth: .25,height: .75,italic: 0,skew: 0},931: {depth: 0,height: .68333,italic: 0,skew: 0},933: {depth: 0,height: .68333,italic: 0,skew: 0},934: {depth: 0,height: .68333,italic: 0,skew: 0},936: {depth: 0,height: .68333,italic: 0,skew: 0},937: {depth: 0,height: .68333,italic: 0,skew: 0},94: {depth: 0,height: .69444,italic: 0,skew: 0},95: {depth: .31,height: .12056,italic: .02778,skew: 0},96: {depth: 0,height: .69444,italic: 0,skew: 0},9651: {depth: .19444,height: .69444,italic: 0,skew: 0},9657: {depth: -.03472,height: .46528,italic: 0,skew: 0},9661: {depth: .19444,height: .69444,italic: 0,skew: 0},9667: {depth: -.03472,height: .46528,italic: 0,skew: 0},97: {depth: 0,height: .43056,italic: 0,skew: 0},9711: {depth: .19444,height: .69444,italic: 0,skew: 0},98: {depth: 0,height: .69444,italic: 0,skew: 0},9824: {depth: .12963,height: .69444,italic: 0,skew: 0},9825: {depth: .12963,height: .69444,italic: 0,skew: 0},9826: {depth: .12963,height: .69444,italic: 0,skew: 0},9827: {depth: .12963,height: .69444,italic: 0,skew: 0},9837: {depth: 0,height: .75,italic: 0,skew: 0},9838: {depth: .19444,height: .69444,italic: 0,skew: 0},9839: {depth: .19444,height: .69444,italic: 0,skew: 0},99: {depth: 0,height: .43056,italic: 0,skew: 0}},"Math-BoldItalic": {100: {depth: 0,height: .69444,italic: 0,skew: 0},1009: {depth: .19444,height: .44444,italic: 0,skew: 0},101: {depth: 0,height: .44444,italic: 0,skew: 0},1013: {depth: 0,height: .44444,italic: 0,skew: 0},102: {depth: .19444,height: .69444,italic: .11042,skew: 0},103: {depth: .19444,height: .44444,italic: .03704,skew: 0},104: {depth: 0,height: .69444,italic: 0,skew: 0},105: {depth: 0,height: .69326,italic: 0,skew: 0},106: {depth: .19444,height: .69326,italic: .0622,skew: 0},107: {depth: 0,height: .69444,italic: .01852,skew: 0},108: {depth: 0,height: .69444,italic: .0088,skew: 0},109: {depth: 0,height: .44444,italic: 0,skew: 0},110: {depth: 0,height: .44444,italic: 0,skew: 0},111: {depth: 0,height: .44444,italic: 0,skew: 0},112: {depth: .19444,height: .44444,italic: 0,skew: 0},113: {depth: .19444,height: .44444,italic: .03704,skew: 0},114: {depth: 0,height: .44444,italic: .03194,skew: 0},115: {depth: 0,height: .44444,italic: 0,skew: 0},116: {depth: 0,height: .63492,italic: 0,skew: 0},117: {depth: 0,height: .44444,italic: 0,skew: 0},118: {depth: 0,height: .44444,italic: .03704,skew: 0},119: {depth: 0,height: .44444,italic: .02778,skew: 0},120: {depth: 0,height: .44444,italic: 0,skew: 0},121: {depth: .19444,height: .44444,italic: .03704,skew: 0},122: {depth: 0,height: .44444,italic: .04213,skew: 0},47: {depth: .19444,height: .69444,italic: 0,skew: 0},65: {depth: 0,height: .68611,italic: 0,skew: 0},66: {depth: 0,height: .68611,italic: .04835,skew: 0},67: {depth: 0,height: .68611,italic: .06979,skew: 0},68: {depth: 0,height: .68611,italic: .03194,skew: 0},69: {depth: 0,height: .68611,italic: .05451,skew: 0},70: {depth: 0,height: .68611,italic: .15972,skew: 0},71: {depth: 0,height: .68611,italic: 0,skew: 0},72: {depth: 0,height: .68611,italic: .08229,skew: 0},73: {depth: 0,height: .68611,italic: .07778,skew: 0},74: {depth: 0,height: .68611,italic: .10069,skew: 0},75: {depth: 0,height: .68611,italic: .06979,skew: 0},76: {depth: 0,height: .68611,italic: 0,skew: 0},77: {depth: 0,height: .68611,italic: .11424,skew: 0},78: {depth: 0,height: .68611,italic: .11424,skew: 0},79: {depth: 0,height: .68611,italic: .03194,skew: 0},80: {depth: 0,height: .68611,italic: .15972,skew: 0},81: {depth: .19444,height: .68611,italic: 0,skew: 0},82: {depth: 0,height: .68611,italic: .00421,skew: 0},83: {depth: 0,height: .68611,italic: .05382,skew: 0},84: {depth: 0,height: .68611,italic: .15972,skew: 0},85: {depth: 0,height: .68611,italic: .11424,skew: 0},86: {depth: 0,height: .68611,italic: .25555,skew: 0},87: {depth: 0,height: .68611,italic: .15972,skew: 0},88: {depth: 0,height: .68611,italic: .07778,skew: 0},89: {depth: 0,height: .68611,italic: .25555,skew: 0},90: {depth: 0,height: .68611,italic: .06979,skew: 0},915: {depth: 0,height: .68611,italic: .15972,skew: 0},916: {depth: 0,height: .68611,italic: 0,skew: 0},920: {depth: 0,height: .68611,italic: .03194,skew: 0},923: {depth: 0,height: .68611,italic: 0,skew: 0},926: {depth: 0,height: .68611,italic: .07458,skew: 0},928: {depth: 0,height: .68611,italic: .08229,skew: 0},931: {depth: 0,height: .68611,italic: .05451,skew: 0},933: {depth: 0,height: .68611,italic: .15972,skew: 0},934: {depth: 0,height: .68611,italic: 0,skew: 0},936: {depth: 0,height: .68611,italic: .11653,skew: 0},937: {depth: 0,height: .68611,italic: .04835,skew: 0},945: {depth: 0,height: .44444,italic: 0,skew: 0},946: {depth: .19444,height: .69444,italic: .03403,skew: 0},947: {depth: .19444,height: .44444,italic: .06389,skew: 0},948: {depth: 0,height: .69444,italic: .03819,skew: 0},949: {depth: 0,height: .44444,italic: 0,skew: 0},950: {depth: .19444,height: .69444,italic: .06215,skew: 0},951: {depth: .19444,height: .44444,italic: .03704,skew: 0},952: {depth: 0,height: .69444,italic: .03194,skew: 0},953: {depth: 0,height: .44444,italic: 0,skew: 0},954: {depth: 0,height: .44444,italic: 0,skew: 0},955: {depth: 0,height: .69444,italic: 0,skew: 0},956: {depth: .19444,height: .44444,italic: 0,skew: 0},957: {depth: 0,height: .44444,italic: .06898,skew: 0},958: {depth: .19444,height: .69444,italic: .03021,skew: 0},959: {depth: 0,height: .44444,italic: 0,skew: 0},960: {depth: 0,height: .44444,italic: .03704,skew: 0},961: {depth: .19444,height: .44444,italic: 0,skew: 0},962: {depth: .09722,height: .44444,italic: .07917,skew: 0},963: {depth: 0,height: .44444,italic: .03704,skew: 0},964: {depth: 0,height: .44444,italic: .13472,skew: 0},965: {depth: 0,height: .44444,italic: .03704,skew: 0},966: {depth: .19444,height: .44444,italic: 0,skew: 0},967: {depth: .19444,height: .44444,italic: 0,skew: 0},968: {depth: .19444,height: .69444,italic: .03704,skew: 0},969: {depth: 0,height: .44444,italic: .03704,skew: 0},97: {depth: 0,height: .44444,italic: 0,skew: 0},977: {depth: 0,height: .69444,italic: 0,skew: 0},98: {depth: 0,height: .69444,italic: 0,skew: 0},981: {depth: .19444,height: .69444,italic: 0,skew: 0},982: {depth: 0,height: .44444,italic: .03194,skew: 0},99: {depth: 0,height: .44444,italic: 0,skew: 0}},"Math-Italic": {100: {depth: 0,height: .69444,italic: 0,skew: .16667},1009: {depth: .19444,height: .43056,italic: 0,skew: .08334},101: {depth: 0,height: .43056,italic: 0,skew: .05556},1013: {depth: 0,height: .43056,italic: 0,skew: .05556},102: {depth: .19444,height: .69444,italic: .10764,skew: .16667},103: {depth: .19444,height: .43056,italic: .03588,skew: .02778},104: {depth: 0,height: .69444,italic: 0,skew: 0},105: {depth: 0,height: .65952,italic: 0,skew: 0},106: {depth: .19444,height: .65952,italic: .05724,skew: 0},107: {depth: 0,height: .69444,italic: .03148,skew: 0},108: {depth: 0,height: .69444,italic: .01968,skew: .08334},109: {depth: 0,height: .43056,italic: 0,skew: 0},110: {depth: 0,height: .43056,italic: 0,skew: 0},111: {depth: 0,height: .43056,italic: 0,skew: .05556},112: {depth: .19444,height: .43056,italic: 0,skew: .08334},113: {depth: .19444,height: .43056,italic: .03588,skew: .08334},114: {depth: 0,height: .43056,italic: .02778,skew: .05556},115: {depth: 0,height: .43056,italic: 0,skew: .05556},116: {depth: 0,height: .61508,italic: 0,skew: .08334},117: {depth: 0,height: .43056,italic: 0,skew: .02778},118: {depth: 0,height: .43056,italic: .03588,skew: .02778},119: {depth: 0,height: .43056,italic: .02691,skew: .08334},120: {depth: 0,height: .43056,italic: 0,skew: .02778},121: {depth: .19444,height: .43056,italic: .03588,skew: .05556},122: {depth: 0,height: .43056,italic: .04398,skew: .05556},47: {depth: .19444,height: .69444,italic: 0,skew: 0},65: {depth: 0,height: .68333,italic: 0,skew: .13889},66: {depth: 0,height: .68333,italic: .05017,skew: .08334},67: {depth: 0,height: .68333,italic: .07153,skew: .08334},68: {depth: 0,height: .68333,italic: .02778,skew: .05556},69: {depth: 0,height: .68333,italic: .05764,skew: .08334},70: {depth: 0,height: .68333,italic: .13889,skew: .08334},71: {depth: 0,height: .68333,italic: 0,skew: .08334},72: {depth: 0,height: .68333,italic: .08125,skew: .05556},73: {depth: 0,height: .68333,italic: .07847,skew: .11111},74: {depth: 0,height: .68333,italic: .09618,skew: .16667},75: {depth: 0,height: .68333,italic: .07153,skew: .05556},76: {depth: 0,height: .68333,italic: 0,skew: .02778},77: {depth: 0,height: .68333,italic: .10903,skew: .08334},78: {depth: 0,height: .68333,italic: .10903,skew: .08334},79: {depth: 0,height: .68333,italic: .02778,skew: .08334},80: {depth: 0,height: .68333,italic: .13889,skew: .08334},81: {depth: .19444,height: .68333,italic: 0,skew: .08334},82: {depth: 0,height: .68333,italic: .00773,skew: .08334},83: {depth: 0,height: .68333,italic: .05764,skew: .08334},84: {depth: 0,height: .68333,italic: .13889,skew: .08334},85: {depth: 0,height: .68333,italic: .10903,skew: .02778},86: {depth: 0,height: .68333,italic: .22222,skew: 0},87: {depth: 0,height: .68333,italic: .13889,skew: 0},88: {depth: 0,height: .68333,italic: .07847,skew: .08334},89: {depth: 0,height: .68333,italic: .22222,skew: 0},90: {depth: 0,height: .68333,italic: .07153,skew: .08334},915: {depth: 0,height: .68333,italic: .13889,skew: .08334},916: {depth: 0,height: .68333,italic: 0,skew: .16667},920: {depth: 0,height: .68333,italic: .02778,skew: .08334},923: {depth: 0,height: .68333,italic: 0,skew: .16667},926: {depth: 0,height: .68333,italic: .07569,skew: .08334},928: {depth: 0,height: .68333,italic: .08125,skew: .05556},931: {depth: 0,height: .68333,italic: .05764,skew: .08334},933: {depth: 0,height: .68333,italic: .13889,skew: .05556},934: {depth: 0,height: .68333,italic: 0,skew: .08334},936: {depth: 0,height: .68333,italic: .11,skew: .05556},937: {depth: 0,height: .68333,italic: .05017,skew: .08334},945: {depth: 0,height: .43056,italic: .0037,skew: .02778},946: {depth: .19444,height: .69444,italic: .05278,skew: .08334},947: {depth: .19444,height: .43056,italic: .05556,skew: 0},948: {depth: 0,height: .69444,italic: .03785,skew: .05556},949: {depth: 0,height: .43056,italic: 0,skew: .08334},950: {depth: .19444,height: .69444,italic: .07378,skew: .08334},951: {depth: .19444,height: .43056,italic: .03588,skew: .05556},952: {depth: 0,height: .69444,italic: .02778,skew: .08334},953: {depth: 0,height: .43056,italic: 0,skew: .05556},954: {depth: 0,height: .43056,italic: 0,skew: 0},955: {depth: 0,height: .69444,italic: 0,skew: 0},956: {depth: .19444,height: .43056,italic: 0,skew: .02778},957: {depth: 0,height: .43056,italic: .06366,skew: .02778},958: {depth: .19444,height: .69444,italic: .04601,skew: .11111},959: {depth: 0,height: .43056,italic: 0,skew: .05556},960: {depth: 0,height: .43056,italic: .03588,skew: 0},961: {depth: .19444,height: .43056,italic: 0,skew: .08334},962: {depth: .09722,height: .43056,italic: .07986,skew: .08334},963: {depth: 0,height: .43056,italic: .03588,skew: 0},964: {depth: 0,height: .43056,italic: .1132,skew: .02778},965: {depth: 0,height: .43056,italic: .03588,skew: .02778},966: {depth: .19444,height: .43056,italic: 0,skew: .08334},967: {depth: .19444,height: .43056,italic: 0,skew: .05556},968: {depth: .19444,height: .69444,italic: .03588,skew: .11111},969: {depth: 0,height: .43056,italic: .03588,skew: 0},97: {depth: 0,height: .43056,italic: 0,skew: 0},977: {depth: 0,height: .69444,italic: 0,skew: .08334},98: {depth: 0,height: .69444,italic: 0,skew: 0},981: {depth: .19444,height: .69444,italic: 0,skew: .08334},982: {depth: 0,height: .43056,italic: .02778,skew: 0},99: {depth: 0,height: .43056,italic: 0,skew: .05556}},"Math-Regular": {100: {depth: 0,height: .69444,italic: 0,skew: .16667},1009: {depth: .19444,height: .43056,italic: 0,skew: .08334},101: {depth: 0,height: .43056,italic: 0,skew: .05556},1013: {depth: 0,height: .43056,italic: 0,skew: .05556},102: {depth: .19444,height: .69444,italic: .10764,skew: .16667},103: {depth: .19444,height: .43056,italic: .03588,skew: .02778},104: {depth: 0,height: .69444,italic: 0,skew: 0},105: {depth: 0,height: .65952,italic: 0,skew: 0},106: {depth: .19444,height: .65952,italic: .05724,skew: 0},107: {depth: 0,height: .69444,italic: .03148,skew: 0},108: {depth: 0,height: .69444,italic: .01968,skew: .08334},109: {depth: 0,height: .43056,italic: 0,skew: 0},110: {depth: 0,height: .43056,italic: 0,skew: 0},111: {depth: 0,height: .43056,italic: 0,skew: .05556},112: {depth: .19444,height: .43056,italic: 0,skew: .08334},113: {depth: .19444,height: .43056,italic: .03588,skew: .08334},114: {depth: 0,height: .43056,italic: .02778,skew: .05556},115: {depth: 0,height: .43056,italic: 0,skew: .05556},116: {depth: 0,height: .61508,italic: 0,skew: .08334},117: {depth: 0,height: .43056,italic: 0,skew: .02778},118: {depth: 0,height: .43056,italic: .03588,skew: .02778},119: {depth: 0,height: .43056,italic: .02691,skew: .08334},120: {depth: 0,height: .43056,italic: 0,skew: .02778},121: {depth: .19444,height: .43056,italic: .03588,skew: .05556},122: {depth: 0,height: .43056,italic: .04398,skew: .05556},65: {depth: 0,height: .68333,italic: 0,skew: .13889},66: {depth: 0,height: .68333,italic: .05017,skew: .08334},67: {depth: 0,height: .68333,italic: .07153,skew: .08334},68: {depth: 0,height: .68333,italic: .02778,skew: .05556},69: {depth: 0,height: .68333,italic: .05764,skew: .08334},70: {depth: 0,height: .68333,italic: .13889,skew: .08334},71: {depth: 0,height: .68333,italic: 0,skew: .08334},72: {depth: 0,height: .68333,italic: .08125,skew: .05556},73: {depth: 0,height: .68333,italic: .07847,skew: .11111},74: {depth: 0,height: .68333,italic: .09618,skew: .16667},75: {depth: 0,height: .68333,italic: .07153,skew: .05556},76: {depth: 0,height: .68333,italic: 0,skew: .02778},77: {depth: 0,height: .68333,italic: .10903,skew: .08334},78: {depth: 0,height: .68333,italic: .10903,skew: .08334},79: {depth: 0,height: .68333,italic: .02778,skew: .08334},80: {depth: 0,height: .68333,italic: .13889,skew: .08334},81: {depth: .19444,height: .68333,italic: 0,skew: .08334},82: {depth: 0,height: .68333,italic: .00773,skew: .08334},83: {depth: 0,height: .68333,italic: .05764,skew: .08334},84: {depth: 0,height: .68333,italic: .13889,skew: .08334},85: {depth: 0,height: .68333,italic: .10903,skew: .02778},86: {depth: 0,height: .68333,italic: .22222,skew: 0},87: {depth: 0,height: .68333,italic: .13889,skew: 0},88: {depth: 0,height: .68333,italic: .07847,skew: .08334},89: {depth: 0,height: .68333,italic: .22222,skew: 0},90: {depth: 0,height: .68333,italic: .07153,skew: .08334},915: {depth: 0,height: .68333,italic: .13889,skew: .08334},916: {depth: 0,height: .68333,italic: 0,skew: .16667},920: {depth: 0,height: .68333,italic: .02778,skew: .08334},923: {depth: 0,height: .68333,italic: 0,skew: .16667},926: {depth: 0,height: .68333,italic: .07569,skew: .08334},928: {depth: 0,height: .68333,italic: .08125,skew: .05556},931: {depth: 0,height: .68333,italic: .05764,skew: .08334},933: {depth: 0,height: .68333,italic: .13889,skew: .05556},934: {depth: 0,height: .68333,italic: 0,skew: .08334},936: {depth: 0,height: .68333,italic: .11,skew: .05556},937: {depth: 0,height: .68333,italic: .05017,skew: .08334},945: {depth: 0,height: .43056,italic: .0037,skew: .02778},946: {depth: .19444,height: .69444,italic: .05278,skew: .08334},947: {depth: .19444,height: .43056,italic: .05556,skew: 0},948: {depth: 0,height: .69444,italic: .03785,skew: .05556},949: {depth: 0,height: .43056,italic: 0,skew: .08334},950: {depth: .19444,height: .69444,italic: .07378,skew: .08334},951: {depth: .19444,height: .43056,italic: .03588,skew: .05556},952: {depth: 0,height: .69444,italic: .02778,skew: .08334},953: {depth: 0,height: .43056,italic: 0,skew: .05556},954: {depth: 0,height: .43056,italic: 0,skew: 0},955: {depth: 0,height: .69444,italic: 0,skew: 0},956: {depth: .19444,height: .43056,italic: 0,skew: .02778},957: {depth: 0,height: .43056,italic: .06366,skew: .02778},958: {depth: .19444,height: .69444,italic: .04601,skew: .11111},959: {depth: 0,height: .43056,italic: 0,skew: .05556},960: {depth: 0,height: .43056,italic: .03588,skew: 0},961: {depth: .19444,height: .43056,italic: 0,skew: .08334},962: {depth: .09722,height: .43056,italic: .07986,skew: .08334},963: {depth: 0,height: .43056,italic: .03588,skew: 0},964: {depth: 0,height: .43056,italic: .1132,skew: .02778},965: {depth: 0,height: .43056,italic: .03588,skew: .02778},966: {depth: .19444,height: .43056,italic: 0,skew: .08334},967: {depth: .19444,height: .43056,italic: 0,skew: .05556},968: {depth: .19444,height: .69444,italic: .03588,skew: .11111},969: {depth: 0,height: .43056,italic: .03588,skew: 0},97: {depth: 0,height: .43056,italic: 0,skew: 0},977: {depth: 0,height: .69444,italic: 0,skew: .08334},98: {depth: 0,height: .69444,italic: 0,skew: 0},981: {depth: .19444,height: .69444,italic: 0,skew: .08334},982: {depth: 0,height: .43056,italic: .02778,skew: 0},99: {depth: 0,height: .43056,italic: 0,skew: .05556}},"Size1-Regular": {8748: {depth: .306,height: .805,italic: .19445,skew: 0},8749: {depth: .306,height: .805,italic: .19445,skew: 0},10216: {depth: .35001,height: .85,italic: 0,skew: 0},10217: {depth: .35001,height: .85,italic: 0,skew: 0},10752: {depth: .25001,height: .75,italic: 0,skew: 0},10753: {depth: .25001,height: .75,italic: 0,skew: 0},10754: {depth: .25001,height: .75,italic: 0,skew: 0},10756: {depth: .25001,height: .75,italic: 0,skew: 0},10758: {depth: .25001,height: .75,italic: 0,skew: 0},123: {depth: .35001,height: .85,italic: 0,skew: 0},125: {depth: .35001,height: .85,italic: 0,skew: 0},40: {depth: .35001,height: .85,italic: 0,skew: 0},41: {depth: .35001,height: .85,italic: 0,skew: 0},47: {depth: .35001,height: .85,italic: 0,skew: 0},710: {depth: 0,height: .72222,italic: 0,skew: 0},732: {depth: 0,height: .72222,italic: 0,skew: 0},770: {depth: 0,height: .72222,italic: 0,skew: 0},771: {depth: 0,height: .72222,italic: 0,skew: 0},8214: {depth: -99e-5,height: .601,italic: 0,skew: 0},8593: {depth: 1e-5,height: .6,italic: 0,skew: 0},8595: {depth: 1e-5,height: .6,italic: 0,skew: 0},8657: {depth: 1e-5,height: .6,italic: 0,skew: 0},8659: {depth: 1e-5,height: .6,italic: 0,skew: 0},8719: {depth: .25001,height: .75,italic: 0,skew: 0},8720: {depth: .25001,height: .75,italic: 0,skew: 0},8721: {depth: .25001,height: .75,italic: 0,skew: 0},8730: {depth: .35001,height: .85,italic: 0,skew: 0},8739: {depth: -.00599,height: .606,italic: 0,skew: 0},8741: {depth: -.00599,height: .606,italic: 0,skew: 0},8747: {depth: .30612,height: .805,italic: .19445,skew: 0},8750: {depth: .30612,height: .805,italic: .19445,skew: 0},8896: {depth: .25001,height: .75,italic: 0,skew: 0},8897: {depth: .25001,height: .75,italic: 0,skew: 0},8898: {depth: .25001,height: .75,italic: 0,skew: 0},8899: {depth: .25001,height: .75,italic: 0,skew: 0},8968: {depth: .35001,height: .85,italic: 0,skew: 0},8969: {depth: .35001,height: .85,italic: 0,skew: 0},8970: {depth: .35001,height: .85,italic: 0,skew: 0},8971: {depth: .35001,height: .85,italic: 0,skew: 0},91: {depth: .35001,height: .85,italic: 0,skew: 0},9168: {depth: -99e-5,height: .601,italic: 0,skew: 0},92: {depth: .35001,height: .85,italic: 0,skew: 0},93: {depth: .35001,height: .85,italic: 0,skew: 0}},"Size2-Regular": {8748: {depth: .862,height: 1.36,italic: .44445,skew: 0},8749: {depth: .862,height: 1.36,italic: .44445,skew: 0},10216: {depth: .65002,height: 1.15,italic: 0,skew: 0},10217: {depth: .65002,height: 1.15,italic: 0,skew: 0},10752: {depth: .55001,height: 1.05,italic: 0,skew: 0},10753: {depth: .55001,height: 1.05,italic: 0,skew: 0},10754: {depth: .55001,height: 1.05,italic: 0,skew: 0},10756: {depth: .55001,height: 1.05,italic: 0,skew: 0},10758: {depth: .55001,height: 1.05,italic: 0,skew: 0},123: {depth: .65002,height: 1.15,italic: 0,skew: 0},125: {depth: .65002,height: 1.15,italic: 0,skew: 0},40: {depth: .65002,height: 1.15,italic: 0,skew: 0},41: {depth: .65002,height: 1.15,italic: 0,skew: 0},47: {depth: .65002,height: 1.15,italic: 0,skew: 0},710: {depth: 0,height: .75,italic: 0,skew: 0},732: {depth: 0,height: .75,italic: 0,skew: 0},770: {depth: 0,height: .75,italic: 0,skew: 0},771: {depth: 0,height: .75,italic: 0,skew: 0},8719: {depth: .55001,height: 1.05,italic: 0,skew: 0},8720: {depth: .55001,height: 1.05,italic: 0,skew: 0},8721: {depth: .55001,height: 1.05,italic: 0,skew: 0},8730: {depth: .65002,height: 1.15,italic: 0,skew: 0},8747: {depth: .86225,height: 1.36,italic: .44445,skew: 0},8750: {depth: .86225,height: 1.36,italic: .44445,skew: 0},8896: {depth: .55001,height: 1.05,italic: 0,skew: 0},8897: {depth: .55001,height: 1.05,italic: 0,skew: 0},8898: {depth: .55001,height: 1.05,italic: 0,skew: 0},8899: {depth: .55001,height: 1.05,italic: 0,skew: 0},8968: {depth: .65002,height: 1.15,italic: 0,skew: 0},8969: {depth: .65002,height: 1.15,italic: 0,skew: 0},8970: {depth: .65002,height: 1.15,italic: 0,skew: 0},8971: {depth: .65002,height: 1.15,italic: 0,skew: 0},91: {depth: .65002,height: 1.15,italic: 0,skew: 0},92: {depth: .65002,height: 1.15,italic: 0,skew: 0},93: {depth: .65002,height: 1.15,italic: 0,skew: 0}},"Size3-Regular": {10216: {depth: .95003,height: 1.45,italic: 0,skew: 0},10217: {depth: .95003,height: 1.45,italic: 0,skew: 0},123: {depth: .95003,height: 1.45,italic: 0,skew: 0},125: {depth: .95003,height: 1.45,italic: 0,skew: 0},40: {depth: .95003,height: 1.45,italic: 0,skew: 0},41: {depth: .95003,height: 1.45,italic: 0,skew: 0},47: {depth: .95003,height: 1.45,italic: 0,skew: 0},710: {depth: 0,height: .75,italic: 0,skew: 0},732: {depth: 0,height: .75,italic: 0,skew: 0},770: {depth: 0,height: .75,italic: 0,skew: 0},771: {depth: 0,height: .75,italic: 0,skew: 0},8730: {depth: .95003,height: 1.45,italic: 0,skew: 0},8968: {depth: .95003,height: 1.45,italic: 0,skew: 0},8969: {depth: .95003,height: 1.45,italic: 0,skew: 0},8970: {depth: .95003,height: 1.45,italic: 0,skew: 0},8971: {depth: .95003,height: 1.45,italic: 0,skew: 0},91: {depth: .95003,height: 1.45,italic: 0,skew: 0},92: {depth: .95003,height: 1.45,italic: 0,skew: 0},93: {depth: .95003,height: 1.45,italic: 0,skew: 0}},"Size4-Regular": {10216: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},10217: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},123: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},125: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},40: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},41: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},47: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},57344: {depth: -.00499,height: .605,italic: 0,skew: 0},57345: {depth: -.00499,height: .605,italic: 0,skew: 0},57680: {depth: 0,height: .12,italic: 0,skew: 0},57681: {depth: 0,height: .12,italic: 0,skew: 0},57682: {depth: 0,height: .12,italic: 0,skew: 0},57683: {depth: 0,height: .12,italic: 0,skew: 0},710: {depth: 0,height: .825,italic: 0,skew: 0},732: {depth: 0,height: .825,italic: 0,skew: 0},770: {depth: 0,height: .825,italic: 0,skew: 0},771: {depth: 0,height: .825,italic: 0,skew: 0},8730: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},8968: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},8969: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},8970: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},8971: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},91: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},9115: {depth: .64502,height: 1.155,italic: 0,skew: 0},9116: {depth: 1e-5,height: .6,italic: 0,skew: 0},9117: {depth: .64502,height: 1.155,italic: 0,skew: 0},9118: {depth: .64502,height: 1.155,italic: 0,skew: 0},9119: {depth: 1e-5,height: .6,italic: 0,skew: 0},9120: {depth: .64502,height: 1.155,italic: 0,skew: 0},9121: {depth: .64502,height: 1.155,italic: 0,skew: 0},9122: {depth: -99e-5,height: .601,italic: 0,skew: 0},9123: {depth: .64502,height: 1.155,italic: 0,skew: 0},9124: {depth: .64502,height: 1.155,italic: 0,skew: 0},9125: {depth: -99e-5,height: .601,italic: 0,skew: 0},9126: {depth: .64502,height: 1.155,italic: 0,skew: 0},9127: {depth: 1e-5,height: .9,italic: 0,skew: 0},9128: {depth: .65002,height: 1.15,italic: 0,skew: 0},9129: {depth: .90001,height: 0,italic: 0,skew: 0},9130: {depth: 0,height: .3,italic: 0,skew: 0},9131: {depth: 1e-5,height: .9,italic: 0,skew: 0},9132: {depth: .65002,height: 1.15,italic: 0,skew: 0},9133: {depth: .90001,height: 0,italic: 0,skew: 0},9143: {depth: .88502,height: .915,italic: 0,skew: 0},92: {depth: 1.25003,height: 1.75,italic: 0,skew: 0},93: {depth: 1.25003,height: 1.75,italic: 0,skew: 0}}}, T = function(e, t) {
                    return B[t][e.charCodeAt(0)]
                };
                t.exports = {metrics: L,getCharacterMetrics: T}
            }, {"./Style": 6}],
        12: [function(e, t) {
                for (var i = e("./utils"), n = e("./ParseError"), o = {"\\sqrt": {numArgs: 1,numOptionalArgs: 1,handler: function(e, t, i, o) {
                            if (null != t)
                                throw new n("Optional arguments to \\sqrt aren't supported yet", this.lexer, o[1] - 1);
                            return {type: "sqrt",body: i}
                        }},"\\text": {numArgs: 1,argTypes: ["text"],greediness: 2,handler: function(e, t) {
                            var i;
                            return i = "ordgroup" === t.type ? t.value : [t], {type: "text",body: i}
                        }},"\\color": {numArgs: 2,allowedInText: !0,argTypes: ["color", "original"],handler: function(e, t, i) {
                            var n;
                            return n = "ordgroup" === i.type ? i.value : [i], {type: "color",color: t.value,value: n}
                        }},"\\overline": {numArgs: 1,handler: function(e, t) {
                            return {type: "overline",body: t}
                        }},"\\rule": {numArgs: 2,numOptionalArgs: 1,argTypes: ["size", "size", "size"],handler: function(e, t, i, n) {
                            return {type: "rule",shift: t && t.value,width: i.value,height: n.value}
                        }},"\\KaTeX": {numArgs: 0,handler: function() {
                            return {type: "katex"}
                        }}}, r = {"\\bigl": {type: "open",size: 1},"\\Bigl": {type: "open",size: 2},"\\biggl": {type: "open",size: 3},"\\Biggl": {type: "open",size: 4},"\\bigr": {type: "close",size: 1},"\\Bigr": {type: "close",size: 2},"\\biggr": {type: "close",size: 3},"\\Biggr": {type: "close",size: 4},"\\bigm": {type: "rel",size: 1},"\\Bigm": {type: "rel",size: 2},"\\biggm": {type: "rel",size: 3},"\\Biggm": {type: "rel",size: 4},
                        "\\big": {type: "textord",size: 1},"\\Big": {type: "textord",size: 2},"\\bigg": {type: "textord",size: 3},"\\Bigg": {type: "textord",size: 4}}, s = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "<", ">", "\\langle", "\\rangle", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."], a = [{funcs: ["\\blue", "\\orange", "\\pink", "\\red", "\\green", "\\gray", "\\purple"],
                              data: {numArgs: 1,allowedInText: !0,handler: function(e, t) {
                                var i;
                                return i = "ordgroup" === t.type ? t.value : [t], {type: "color",color: "katex-" + e.slice(1),value: i}
                            }}}, {funcs: ["\\arcsin", "\\arccos", "\\arctan", "\\arg", "\\cos", "\\cosh", "\\cot", "\\coth", "\\csc", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\tan", "\\tanh"],data: {numArgs: 0,handler: function(e) {
                                return {type: "op",limits: !1,symbol: !1,body: e}
                            }}}, {funcs: ["\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max", "\\min", "\\Pr", "\\sup"],data: {numArgs: 0,handler: function(e) {
                                return {type: "op",limits: !0,symbol: !1,body: e}
                            }}}, {funcs: ["\\int", "\\iint", "\\iiint", "\\oint"],data: {numArgs: 0,handler: function(e) {
                                return {type: "op",limits: !1,symbol: !0,body: e}
                            }}}, {funcs: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint"],data: {numArgs: 0,handler: function(e) {
                                return {type: "op",limits: !0,symbol: !0,body: e}
                            }}}, {funcs: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom"],data: {numArgs: 2,greediness: 2,handler: function(e, t, i) {
                                var n, o = null, r = null, s = "auto";
                                switch (e) {
                                    case "\\dfrac":
                                    case "\\frac":
                                    case "\\tfrac":
                                        n = !0;
                                        break;
                                    case "\\dbinom":
                                    case "\\binom":
                                    case "\\tbinom":
                                        n = !1, o = "(", r = ")";
                                        break;
                                    default:
                                        throw new Error("Unrecognized genfrac command")
                                }
                                switch (e) {
                                    case "\\dfrac":
                                    case "\\dbinom":
                                        s = "display";
                                        break;
                                    case "\\tfrac":
                                    case "\\tbinom":
                                        s = "text"
                                }
                                return {type: "genfrac",numer: t,denom: i,hasBarLine: n,leftDelim: o,rightDelim: r,size: s}
                            }
                        }
                    }, {funcs: ["\\llap", "\\rlap"],data: {numArgs: 1,allowedInText: !0,handler: function(e, t) {
                                return {type: e.slice(1),body: t}
                            }
                        }
                    }, {funcs: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg", "\\left", "\\right"],
                       data: {numArgs: 1,handler: function(e, t, o) {
                                if (!i.contains(s, t.value))
                                    throw new n("Invalid delimiter: '" + t.value + "' after '" + e + "'", this.lexer, o[1]);
                                return "\\left" === e || "\\right" === e ? {type: "leftright",value: t.value} : {type: "delimsizing",size: r[e].size,delimType: r[e].type,value: t.value}
                            }
                        }
                    }, {funcs: ["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"],data: {numArgs: 0}}, {funcs: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],data: {numArgs: 0}}, 
                    {funcs: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot"],
                       data: {numArgs: 1,handler: function(e, t) {
                                return {type: "accent",accent: e,base: t}
                            }
                        }
                    }, {funcs: ["\\over", "\\choose"],
                       data: {numArgs: 0,handler: function(e) {
                                var t;
                                switch (e) {
                                    case "\\over":
                                        t = "\\frac";
                                        break;
                                    case "\\choose":
                                        t = "\\binom";
                                        break;
                                    default:
                                        throw new Error("Unrecognized infix genfrac command")
                                }
                                return {type: "infix",replaceWith: t}
                            }}}
                            ], l = function(e, t) {
                    for (var i = 0; i < e.length; i++)
                        o[e[i]] = t
                }, c = 0; c < a.length; c++)
                    l(a[c].funcs, a[c].data);
                var h = function(e) {
                    return void 0 === o[e].greediness ? 1 : o[e].greediness
                };
                for (var d in o)
                    if (o.hasOwnProperty(d)) {
                        var u = o[d];
                        o[d] = {numArgs: u.numArgs,argTypes: u.argTypes,greediness: void 0 === u.greediness ? 1 : u.greediness,allowedInText: u.allowedInText ? u.allowedInText : !1,numOptionalArgs: void 0 === u.numOptionalArgs ? 0 : u.numOptionalArgs,handler: u.handler}
                    }
                t.exports = {funcs: o,getGreediness: h}
            }, {"./ParseError": 4,"./utils": 15}],
        13: [function(e, t) {
                var i = e("./Parser"), n = function(e) {
                    var t = new i(e);
                    return t.parse()
                };
                t.exports = n
            }, {"./Parser": 5}],
        14: [function(e, t) {
                for (var i = {math: 
                    {"`": {font: "main",group: "textord",replace: "\u2018"},"\\$": {font: "main",group: "textord",replace: "$"},"\\%": {font: "main",group: "textord",replace: "%"},"\\_": {font: "main",group: "textord",replace: "_"},"\\angle": {font: "main",group: "textord",replace: "\u2220"},"\\infty": {font: "main",group: "textord",replace: "\u221e"},"\\prime": {font: "main",group: "textord",replace: "\u2032"},"\\triangle": {font: "main",group: "textord",replace: "\u25b3"},"\\Gamma": {font: "main",group: "textord",replace: "\u0393"},"\\Delta": {font: "main",group: "textord",replace: "\u0394"},"\\Theta": {font: "main",group: "textord",replace: "\u0398"},"\\Lambda": {font: "main",group: "textord",replace: "\u039b"},"\\Xi": {font: "main",group: "textord",replace: "\u039e"},"\\Pi": {font: "main",group: "textord",replace: "\u03a0"},"\\Sigma": {font: "main",group: "textord",replace: "\u03a3"},"\\Upsilon": {font: "main",group: "textord",replace: "\u03a5"},"\\Phi": {font: "main",group: "textord",replace: "\u03a6"},"\\Psi": {font: "main",group: "textord",replace: "\u03a8"},"\\Omega": {font: "main",group: "textord",replace: "\u03a9"},"\\neg": {font: "main",group: "textord",replace: "\xac"},
                    "\\lnot": {font: "main",group: "textord",replace: "\xac"},"\\top": {font: "main",group: "textord",replace: "\u22a4"},"\\bot": {font: "main",group: "textord",replace: "\u22a5"},"\\emptyset": {font: "main",group: "textord",replace: "\u2205"},"\\varnothing": {font: "ams",group: "textord",replace: "\u2205"},"\\alpha": {font: "main",group: "mathord",replace: "\u03b1"},"\\beta": {font: "main",group: "mathord",replace: "\u03b2"},"\\gamma": {font: "main",group: "mathord",replace: "\u03b3"},"\\delta": {font: "main",group: "mathord",replace: "\u03b4"},"\\epsilon": {font: "main",group: "mathord",replace: "\u03f5"},"\\zeta": {font: "main",group: "mathord",replace: "\u03b6"},"\\eta": {font: "main",group: "mathord",replace: "\u03b7"},"\\theta": {font: "main",group: "mathord",replace: "\u03b8"},"\\iota": {font: "main",group: "mathord",replace: "\u03b9"},"\\kappa": {font: "main",group: "mathord",replace: "\u03ba"},"\\lambda": {font: "main",group: "mathord",replace: "\u03bb"},"\\mu": {font: "main",group: "mathord",replace: "\u03bc"},"\\nu": {font: "main",group: "mathord",replace: "\u03bd"},"\\xi": {font: "main",group: "mathord",replace: "\u03be"},"\\omicron": {font: "main",group: "mathord",replace: "o"},
                    "\\pi": {font: "main",group: "mathord",replace: "\u03c0"},"\\rho": {font: "main",group: "mathord",replace: "\u03c1"},"\\sigma": {font: "main",group: "mathord",replace: "\u03c3"},"\\tau": {font: "main",group: "mathord",replace: "\u03c4"},"\\upsilon": {font: "main",group: "mathord",replace: "\u03c5"},"\\phi": {font: "main",group: "mathord",replace: "\u03d5"},"\\chi": {font: "main",group: "mathord",replace: "\u03c7"},"\\psi": {font: "main",group: "mathord",replace: "\u03c8"},"\\omega": {font: "main",group: "mathord",replace: "\u03c9"},"\\varepsilon": {font: "main",group: "mathord",replace: "\u03b5"},"\\vartheta": {font: "main",group: "mathord",replace: "\u03d1"},"\\varpi": {font: "main",group: "mathord",replace: "\u03d6"},"\\varrho": {font: "main",group: "mathord",replace: "\u03f1"},"\\varsigma": {font: "main",group: "mathord",replace: "\u03c2"},"\\varphi": {font: "main",group: "mathord",replace: "\u03c6"},"*": {font: "main",group: "bin",replace: "\u2217"},"+": {font: "main",group: "bin"},"-": {font: "main",group: "bin",replace: "\u2212"},"\\cdot": {font: "main",group: "bin",replace: "\u22c5"},"\\circ": {font: "main",group: "bin",replace: "\u2218"},"\\div": {font: "main",group: "bin",replace: "\xf7"},
                    "\\pm": {font: "main",group: "bin",replace: "\xb1"},"\\times": {font: "main",group: "bin",replace: "\xd7"},"\\cap": {font: "main",group: "bin",replace: "\u2229"},"\\cup": {font: "main",group: "bin",replace: "\u222a"},"\\setminus": {font: "main",group: "bin",replace: "\u2216"},"\\land": {font: "main",group: "bin",replace: "\u2227"},"\\lor": {font: "main",group: "bin",replace: "\u2228"},"\\wedge": {font: "main",group: "bin",replace: "\u2227"},"\\vee": {font: "main",group: "bin",replace: "\u2228"},"\\surd": {font: "main",group: "textord",replace: "\u221a"},"(": {font: "main",group: "open"},"[": {font: "main",group: "open"},"\\langle": {font: "main",group: "open",replace: "\u27e8"},"\\lvert": {font: "main",group: "open",replace: "\u2223"},")": {font: "main",group: "close"},"]": {font: "main",group: "close"},"?": {font: "main",group: "close"},"!": {font: "main",group: "close"},"\\rangle": {font: "main",group: "close",replace: "\u27e9"},"\\rvert": {font: "main",group: "close",replace: "\u2223"},"=": {font: "main",group: "rel"},"<": {font: "main",group: "rel"},">": {font: "main",group: "rel"},":": {font: "main",group: "rel"},"\\approx": {font: "main",group: "rel",replace: "\u2248"},"\\cong": {font: "main",group: "rel",replace: "\u2245"},
                    "\\ge": {font: "main",group: "rel",replace: "\u2265"},"\\geq": {font: "main",group: "rel",replace: "\u2265"},"\\gets": {font: "main",group: "rel",replace: "\u2190"},"\\in": {font: "main",group: "rel",replace: "\u2208"},"\\notin": {font: "main",group: "rel",replace: "\u2209"},"\\subset": {font: "main",group: "rel",replace: "\u2282"},"\\supset": {font: "main",group: "rel",replace: "\u2283"},"\\subseteq": {font: "main",group: "rel",replace: "\u2286"},"\\supseteq": {font: "main",group: "rel",replace: "\u2287"},"\\nsubseteq": {font: "ams",group: "rel",replace: "\u2288"},"\\nsupseteq": {font: "ams",group: "rel",replace: "\u2289"},"\\models": {font: "main",group: "rel",replace: "\u22a8"},"\\leftarrow": {font: "main",group: "rel",replace: "\u2190"},"\\le": {font: "main",group: "rel",replace: "\u2264"},"\\leq": {font: "main",group: "rel",replace: "\u2264"},"\\ne": {font: "main",group: "rel",replace: "\u2260"},"\\neq": {font: "main",group: "rel",replace: "\u2260"},"\\rightarrow": {font: "main",group: "rel",replace: "\u2192"},"\\to": {font: "main",group: "rel",replace: "\u2192"},"\\ngeq": {font: "ams",group: "rel",replace: "\u2271"},"\\nleq": {font: "ams",group: "rel",replace: "\u2270"},"\\!": {font: "main",group: "spacing"},
                    "\\ ": {font: "main",group: "spacing",replace: "\xa0"},"~": {font: "main",group: "spacing",replace: "\xa0"},"\\,": {font: "main",group: "spacing"},"\\:": {font: "main",group: "spacing"},"\\;": {font: "main",group: "spacing"},"\\enspace": {font: "main",group: "spacing"},"\\qquad": {font: "main",group: "spacing"},"\\quad": {font: "main",group: "spacing"},"\\space": {font: "main",group: "spacing",replace: "\xa0"},",": {font: "main",group: "punct"},";": {font: "main",group: "punct"},"\\colon": {font: "main",group: "punct",replace: ":"},"\\barwedge": {font: "ams",group: "textord",replace: "\u22bc"},"\\veebar": {font: "ams",group: "textord",replace: "\u22bb"},"\\odot": {font: "main",group: "textord",replace: "\u2299"},"\\oplus": {font: "main",group: "textord",replace: "\u2295"},"\\otimes": {font: "main",group: "textord",replace: "\u2297"},"\\partial": {font: "main",group: "textord",replace: "\u2202"},"\\oslash": {font: "main",group: "textord",replace: "\u2298"},"\\circledcirc": {font: "ams",group: "textord",replace: "\u229a"},"\\boxdot": {font: "ams",group: "textord",replace: "\u22a1"},"\\bigtriangleup": {font: "main",group: "textord",replace: "\u25b3"},"\\bigtriangledown": {font: "main",group: "textord",replace: "\u25bd"},
                    "\\dagger": {font: "main",group: "textord",replace: "\u2020"},"\\diamond": {font: "main",group: "textord",replace: "\u22c4"},"\\star": {font: "main",group: "textord",replace: "\u22c6"},"\\triangleleft": {font: "main",group: "textord",replace: "\u25c3"},"\\triangleright": {font: "main",group: "textord",replace: "\u25b9"},"\\{": {font: "main",group: "open",replace: "{"},"\\}": {font: "main",group: "close",replace: "}"},"\\lbrace": {font: "main",group: "open",replace: "{"},"\\rbrace": {font: "main",group: "close",replace: "}"},"\\lbrack": {font: "main",group: "open",replace: "["},"\\rbrack": {font: "main",group: "close",replace: "]"},"\\lfloor": {font: "main",group: "open",replace: "\u230a"},"\\rfloor": {font: "main",group: "close",replace: "\u230b"},"\\lceil": {font: "main",group: "open",replace: "\u2308"},"\\rceil": {font: "main",group: "close",replace: "\u2309"},"\\backslash": {font: "main",group: "textord",replace: "\\"},"|": {font: "main",group: "textord",replace: "\u2223"},"\\vert": {font: "main",group: "textord",replace: "\u2223"},"\\|": {font: "main",group: "textord",replace: "\u2225"},"\\Vert": {font: "main",group: "textord",replace: "\u2225"},"\\uparrow": {font: "main",group: "textord",replace: "\u2191"},
                    "\\Uparrow": {font: "main",group: "textord",replace: "\u21d1"},"\\downarrow": {font: "main",group: "textord",replace: "\u2193"},"\\Downarrow": {font: "main",group: "textord",replace: "\u21d3"},"\\updownarrow": {font: "main",group: "textord",replace: "\u2195"},"\\Updownarrow": {font: "main",group: "textord",replace: "\u21d5"},"\\coprod": {font: "math",group: "op",replace: "\u2210"},"\\bigvee": {font: "math",group: "op",replace: "\u22c1"},"\\bigwedge": {font: "math",group: "op",replace: "\u22c0"},"\\biguplus": {font: "math",group: "op",replace: "\u2a04"},"\\bigcap": {font: "math",group: "op",replace: "\u22c2"},"\\bigcup": {font: "math",group: "op",replace: "\u22c3"},"\\int": {font: "math",group: "op",replace: "\u222b"},"\\intop": {font: "math",group: "op",replace: "\u222b"},"\\iint": {font: "math",group: "op",replace: "\u222c"},"\\iiint": {font: "math",group: "op",replace: "\u222d"},"\\prod": {font: "math",group: "op",replace: "\u220f"},"\\sum": {font: "math",group: "op",replace: "\u2211"},"\\bigotimes": {font: "math",group: "op",replace: "\u2a02"},"\\bigoplus": {font: "math",group: "op",replace: "\u2a01"},"\\bigodot": {font: "math",group: "op",replace: "\u2a00"},"\\oint": {font: "math",group: "op",replace: "\u222e"},
                       "\\bigsqcup": {font: "math",group: "op",replace: "\u2a06"},"\\smallint": {font: "math",group: "op",replace: "\u222b"},"\\ldots": {font: "main",group: "punct",replace: "\u2026"},"\\cdots": {font: "main",group: "inner",replace: "\u22ef"},"\\ddots": {font: "main",group: "inner",replace: "\u22f1"},"\\vdots": {font: "main",group: "textord",replace: "\u22ee"},"\\acute": {font: "main",group: "accent",replace: "\xb4"},"\\grave": {font: "main",group: "accent",replace: "`"},"\\ddot": {font: "main",group: "accent",replace: "\xa8"},"\\tilde": {font: "main",group: "accent",replace: "~"},"\\bar": {font: "main",group: "accent",replace: "\xaf"},"\\breve": {font: "main",group: "accent",replace: "\u02d8"},"\\check": {font: "main",group: "accent",replace: "\u02c7"},"\\hat": {font: "main",group: "accent",replace: "^"},"\\vec": {font: "main",group: "accent",replace: "\u20d7"},"\\dot": {font: "main",group: "accent",replace: "\u02d9"}},text: {"\\ ": {font: "main",group: "spacing",replace: "\xa0"}," ": {font: "main",group: "spacing",replace: "\xa0"},"~": {font: "main",group: "spacing",replace: "\xa0"}
                   }
               }, n = '0123456789/@."', o = 0; o < n.length; o++) {
                    var r = n.charAt(o);
                    i.math[r] = {font: "main",group: "textord"}
                }
                for (var s = "0123456789`!@*()-=+[]'\";:?/.,", o = 0; o < s.length; o++) {
                    var r = s.charAt(o);
                    i.text[r] = {font: "main",group: "textord"}
                }
                for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", o = 0; o < a.length; o++) {
                    var r = a.charAt(o);
                    i.math[r] = {font: "main",group: "mathord"}, i.text[r] = {font: "main",group: "textord"}
                }
                t.exports = i
            }, {}],
        15: [function(e, t) {
                function i(e) {
                    return d[e]
                }
                function n(e) {
                    return ("" + e).replace(u, i)
                }
                function o(e) {
                    r(e, "")
                }
                var r, s = Array.prototype.indexOf, a = function(e, t) {
                    if (null == e)
                        return -1;
                    if (s && e.indexOf === s)
                        return e.indexOf(t);
                    for (var i = 0, n = e.length; n > i; i++)
                        if (e[i] === t)
                            return i;
                    return -1
                }, l = function(e, t) {
                    return -1 !== a(e, t)
                }, c = /([A-Z])/g, h = function(e) {
                    return e.replace(c, "-$1").toLowerCase()
                }, d = {"&": "&amp;",">": "&gt;","<": "&lt;",'"': "&quot;","'": "&#x27;"}, u = /[&><"']/g;
                if ("undefined" != typeof document) {
                    var p = document.createElement("span");
                    r = "textContent" in p ? function(e, t) {
                        e.textContent = t
                    } : function(e, t) {
                        e.innerText = t
                    }
                }
                t.exports = {contains: l,escape: n,hyphenate: h,indexOf: a,setTextContent: r,clearNode: o}
            }, {}]
        }, {}, [1]
    )(1)
}), 

function() {
    if ("function" == typeof window.addEventListener)
        for (var e = document.querySelectorAll("pre code"), t = 0, i = e.length; i > t; t++) {
            var n = e[t];
            n.hasAttribute("data-trim") && "function" == typeof n.innerHTML.trim && (n.innerHTML = n.innerHTML.trim()), n.addEventListener("focusout", function(e) {
                hljs.highlightBlock(e.currentTarget)
            }, !1)
        }
}();



