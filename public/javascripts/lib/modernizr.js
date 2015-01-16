// 01 - modernizr.js

window.Modernizr = function (t, e, n) { // First Level
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

    var u, d, h, p = "2.6.2", f = {}, m = !0, g = e.documentElement, v = "modernizr", y = e.createElement(v), b = y.style, S = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")), E = "Webkit Moz O ms", T = E.split(" "), w = E.toLowerCase().split(" "), _ = {svg: "http://www.w3.org/2000/svg"}, k = {}, L = [], C = L.slice, x = function (t, n, i, s) {
        var o, r, a, l, c = e.createElement("div"), u = e.body, d = u || e.createElement("body");
        if (parseInt(i, 10))
            for (; i--;)
                a = e.createElement("div"), a.id = s ? s[i] : v + (i + 1), c.appendChild(a);
        return o = ["&#173;", '<style id="s', v, '">', t, "</style>"].join(""), c.id = v, (u ? c : d).innerHTML += o, d.appendChild(c), u || (d.style.background = "", d.style.overflow = "hidden", l = g.style.overflow, g.style.overflow = "hidden", g.appendChild(d)), r = n(c, t), u ? c.parentNode.removeChild(c) : (d.parentNode.removeChild(d), g.style.overflow = l), !!r
    }, A = {}.hasOwnProperty;

    h = o(A, "undefined") || o(A.call, "undefined") ? function (t, e) {
        return e in t && o(t.constructor.prototype[e], "undefined")
    } : function (t, e) {
        return A.call(t, e)
    }, Function.prototype.bind || (Function.prototype.bind = function (t) {
        var e = this;
        if ("function" != typeof e)
            throw new TypeError;
        var n = C.call(arguments, 1), i = function () {
            if (this instanceof i) {
                var s = function () {
                };
                s.prototype = e.prototype;
                var o = new s, r = e.apply(o, n.concat(C.call(arguments)));
                return Object(r) === r ? r : o
            }
            return e.apply(t, n.concat(C.call(arguments)))
        };
        return i
    }), k.touch = function () {
        var n;
        return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? n = !0 : x(["@media (", S.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (t) {
            n = 9 === t.offsetTop
        }), n
    }, k.history = function () {
        return !!t.history && !!history.pushState
    }, k.rgba = function () {
        return i("background-color:rgba(150,255,150,.5)"), r(b.backgroundColor, "rgba")
    }, k.backgroundsize = function () {
        return c("backgroundSize")
    }, k.opacity = function () {
        return s("opacity:.55"), /^0.55$/.test(b.opacity)
    }, k.cssanimations = function () {
        return c("animationName")
    }, k.csstransforms = function () {
        return !!c("transform")
    }, k.csstransforms3d = function () {
        var t = !!c("perspective");
        return t && "webkitPerspective" in g.style && x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
            function (e) {
                t = 9 === e.offsetLeft && 3 === e.offsetHeight
            }), t
    }, k.csstransitions = function () {
        return c("transition")
    }, k.localstorage = function () {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0
        } catch (t) {
            return !1
        }
    }, k.applicationcache = function () {
        return !!t.applicationCache
    }, k.svg = function () {
        return !!e.createElementNS && !!e.createElementNS(_.svg, "svg").createSVGRect
    };


    for (var I in k)
        h(k, I) && (d = I.toLowerCase(), f[d] = k[I](), L.push((f[d] ? "" : "no-") + d));
    return f.addTest = function (t, e) {
        if ("object" == typeof t)
            for (var i in t)
                h(t, i) && f.addTest(i, t[i]);
        else {
            if (t = t.toLowerCase(), f[t] !== n)
                return f;
            e = "function" == typeof e ? e() : e, "undefined" != typeof m && m && (g.className += " mz-" + (e ? "" : "no-") + t), f[t] = e
        }
        return f
    }, i(""), y = u = null, f._version = p, f._prefixes = S, f._domPrefixes = w, f._cssomPrefixes = T, f.testProp = function (t) {
        return a([t])
    }, f.testAllProps = c, f.testStyles = x, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (m ? " mz-js mz-" + L.join(" mz-") : ""), f
}(this, this.document),


    function (t, e) {
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
            e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (n) {
                return T.shivMethods ? o(n, t, e) : e.createElem(n)
            }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function (t) {
                return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
            }) + ");return n}")(T, e.frag)
        }

        function l(t) {
            t || (t = e);
            var i = s(t);
            return T.shivCSS && !f && !i.hasCSS && (i.hasCSS = !!n(t, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), m || a(t, i), t
        }

        function c(t) {
            for (var e, n = t.getElementsByTagName("*"), s = n.length, o = RegExp("^(?:" + i().join("|") + ")$", "i"), r = []; s--;)
                e = n[s], o.test(e.nodeName) && r.push(e.applyElement(u(e)));
            return r
        }

        function u(t) {
            for (var e, n = t.attributes, i = n.length, s = t.ownerDocument.createElement(_ + ":" + t.nodeName); i--;)
                e = n[i], e.specified && s.setAttribute(e.nodeName, e.nodeValue);
            return s.style.cssText = t.style.cssText, s
        }

        function d(t) {
            for (var e, n = t.split("{"), s = n.length, o = RegExp("(^|[\\s,>+~])(" + i().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), r = "$1" + _ + "\\:$2"; s--;)
                e = n[s] = n[s].split("}"), e[e.length - 1] = e[e.length - 1].replace(o, r), n[s] = e.join("}");
            return n.join("{")
        }

        function h(t) {
            for (var e = t.length; e--;)
                t[e].removeNode()
        }

        function p(t) {
            function e() {
                clearTimeout(r._removeSheetTimer), i && i.removeNode(!0), i = null
            }

            var i, o, r = s(t), a = t.namespaces, l = t.parentWindow;
            return !k || t.printShived ? t : ("undefined" == typeof a[_] && a.add(_), l.attachEvent("onbeforeprint", function () {
                e();
                for (var s, r, a, l = t.styleSheets, u = [], h = l.length, p = Array(h); h--;)
                    p[h] = l[h];
                for (; a = p.pop();)
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
            }), l.attachEvent("onafterprint", function () {
                h(o), clearTimeout(r._removeSheetTimer), r._removeSheetTimer = setTimeout(e, 500)
            }), t.printShived = !0, t)
        }

        var f, m, g = t.html5 || {}, v = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, y = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i, b = "_html5shiv", S = 0, E = {};
        !function () {
            try {
                var t = e.createElement("a");
                t.innerHTML = "<xyz></xyz>", f = "hidden" in t, m = 1 == t.childNodes.length || function () {
                    e.createElement("a");
                    var t = e.createDocumentFragment();
                    return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
                }()
            } catch (n) {
                f = !0, m = !0
            }
        }();
        var T = {
            elements: g.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: g.shivCSS !== !1,
            supportsUnknownElements: m,
            shivMethods: g.shivMethods !== !1,
            type: "default",
            shivDocument: l,
            createElement: o,
            createDocumentFragment: r
        };
        t.html5 = T, l(e);
        var w = /^$|\b(?:all|print)\b/, _ = "html5shiv", k = !m && function () {
                var n = e.documentElement;
                return "undefined" != typeof e.namespaces && "undefined" != typeof e.parentWindow && "undefined" != typeof n.applyElement && "undefined" != typeof n.removeNode && "undefined" != typeof t.attachEvent
            }();
        T.type += " print", T.shivPrint = p, p(e)
    }(this, document),

    Modernizr.addTest("fullscreen", function () {
        for (var t = 0; t < Modernizr._domPrefixes.length; t++)
            if (document[Modernizr._domPrefixes[t].toLowerCase() + "CancelFullScreen"])
                return !0;
        return !!document.cancelFullScreen || !1
    });