// 10 - mousetrap.js

(function(t, e) {
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
}(window, document));
