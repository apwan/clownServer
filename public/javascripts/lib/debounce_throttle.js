// debouce_throttle.js

(function(t) {
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
}(jQuery));