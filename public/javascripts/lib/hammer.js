// 11 - hammer.js

(function(t, e, n, i) {
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


}(window, document, "Hammer"));
