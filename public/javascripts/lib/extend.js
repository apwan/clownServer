(function(t) {
    t.fn.changeElementType = function(e) {
        var n = {};
        t.each(this[0].attributes, function(t, e) {
            n[e.nodeName] = e.nodeValue
        }), this.replaceWith(function() {
            return t("<" + e + "/>", n).append(t(this).contents())
        })
    }
}(jQuery)),


// Class.extend

function() {
        var t = !1, e = /xyz/.test(function() {
        }) ? /\b_super\b/ : /.*/;

        this.Class = function() {// declaration
        },
        Class.extend = function(n) {
            function subr() {
                !t && this.init && this.init.apply(this, arguments)
            }
            var supr = this.prototype;
            t = !0;
            var o = new this;
            t = !1;
            for (var r in n)
                o[r] = "function" == typeof n[r] && "function" == typeof supr[r] && e.test(n[r]) ? function(t, e) {
                    return function() {
                        var n = this._super;
                        this._super = supr[t];
                        var i = e.apply(this, arguments);
                        return this._super = n, i
                    }
                }(r, n[r]) : n[r];
            return subr.prototype = o, subr.constructor = subr, subr.extend = arguments.callee, subr
        }
}();