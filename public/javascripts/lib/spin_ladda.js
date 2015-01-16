// 10 - spin.js

(function(t, e) {
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
})),

// ladda.js
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
    });
