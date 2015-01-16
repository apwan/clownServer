// 06 - jquery mobile

(function(t, e, n) {
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
}));