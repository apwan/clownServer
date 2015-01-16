// 04 - jquery.easing.js


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
    });

// END of jquery.easing plugin
