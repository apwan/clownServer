// 05 - jquery.payment.js

(function() {
    var t, e, n, i, s, o, r, a, l, c, u, d, h, p, f, m, g, v, y, b = [].slice, S = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t)
                    return e;
            return -1
        };
    t = jQuery, t.payment = {}, t.payment.fn = {}, t.fn.payment = function() {
        var e, n;
        return n = arguments[0], e = 2 <= arguments.length ? b.call(arguments, 1) : [], t.payment.fn[n].apply(this, e)
    }, s = /(\d{1,4})/g, i = [{type: "maestro",pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,format: s,length: [12, 13, 14, 15, 16, 17, 18, 19],cvcLength: [3],luhn: !0}, {type: "dinersclub",pattern: /^(36|38|30[0-5])/,format: s,length: [14],cvcLength: [3],luhn: !0}, {type: "laser",pattern: /^(6706|6771|6709)/,format: s,length: [16, 17, 18, 19],cvcLength: [3],luhn: !0}, {type: "jcb",pattern: /^35/,format: s,length: [16],cvcLength: [3],luhn: !0}, {type: "unionpay",pattern: /^62/,format: s,length: [16, 17, 18, 19],cvcLength: [3],luhn: !1}, {type: "discover",pattern: /^(6011|65|64[4-9]|622)/,format: s,length: [16],cvcLength: [3],luhn: !0}, {type: "mastercard",pattern: /^5[1-5]/,format: s,length: [16],cvcLength: [3],luhn: !0}, {type: "amex",pattern: /^3[47]/,format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,length: [15],cvcLength: [3, 4],luhn: !0}, {type: "visa",pattern: /^4/,format: s,length: [13, 14, 15, 16],cvcLength: [3],luhn: !0}], e = function(t) {
        var e, n, s;
        for (t = (t + "").replace(/\D/g, ""), n = 0, s = i.length; s > n; n++)
            if (e = i[n], e.pattern.test(t))
                return e
    }, n = function(t) {
        var e, n, s;
        for (n = 0, s = i.length; s > n; n++)
            if (e = i[n], e.type === t)
                return e
    }, h = function(t) {
        var e, n, i, s, o, r;
        for (i = !0, s = 0, n = (t + "").split("").reverse(), o = 0, r = n.length; r > o; o++)
            e = n[o], e = parseInt(e, 10), (i = !i) && (e *= 2), e > 9 && (e -= 9), s += e;
        return s % 10 === 0
    }, d = function(t) {
        var e;
        return null != t.prop("selectionStart") && t.prop("selectionStart") !== t.prop("selectionEnd") ? !0 : ("undefined" != typeof document && null !== document && null != (e = document.selection) && "function" == typeof e.createRange ? e.createRange().text : void 0) ? !0 : !1
    }, p = function(e) {
        return setTimeout(function() {
            var n, i;
            return n = t(e.currentTarget), i = n.val(), i = t.payment.formatCardNumber(i), n.val(i)
        })
    }, a = function(n) {
        var i, s, o, r, a, l, c;
        return o = String.fromCharCode(n.which), !/^\d+$/.test(o) || (i = t(n.currentTarget), c = i.val(), s = e(c + o), r = (c.replace(/\D/g, "") + o).length, l = 16, s && (l = s.length[s.length.length - 1]), r >= l || null != i.prop("selectionStart") && i.prop("selectionStart") !== c.length) ? void 0 : (a = s && "amex" === s.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, a.test(c) ? (n.preventDefault(), i.val(c + " " + o)) : a.test(c + o) ? (n.preventDefault(), i.val(c + o + " ")) : void 0)
    }, o = function(e) {
        var n, i;
        return n = t(e.currentTarget), i = n.val(), e.meta || null != n.prop("selectionStart") && n.prop("selectionStart") !== i.length ? void 0 : 8 === e.which && /\s\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\d?$/, ""))) : void 0
    }, l = function(e) {
        var n, i, s;
        return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), s = n.val() + i, /^\d$/.test(s) && "0" !== s && "1" !== s ? (e.preventDefault(), n.val("0" + s + " / ")) : /^\d\d$/.test(s) ? (e.preventDefault(), n.val("" + s + " / ")) : void 0) : void 0
    }, c = function(e) {
        var n, i, s;
        return i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (n = t(e.currentTarget), s = n.val(), /^\d\d$/.test(s) ? n.val("" + s + " / ") : void 0) : void 0
    }, u = function(e) {
        var n, i, s;
        return i = String.fromCharCode(e.which), "/" === i ? (n = t(e.currentTarget), s = n.val(), /^\d$/.test(s) && "0" !== s ? n.val("0" + s + " / ") : void 0) : void 0
    }, r = function(e) {
        var n, i;
        if (!e.meta && (n = t(e.currentTarget), i = n.val(), 8 === e.which && (null == n.prop("selectionStart") || n.prop("selectionStart") === i.length)))
            return /\s\/\s?\d?$/.test(i) ? (e.preventDefault(), n.val(i.replace(/\s\/\s?\d?$/, ""))) : void 0
    }, v = function(t) {
        var e;
        return t.metaKey || t.ctrlKey ? !0 : 32 === t.which ? !1 : 0 === t.which ? !0 : t.which < 33 ? !0 : (e = String.fromCharCode(t.which), !!/[\d\s]/.test(e))
    }, m = function(n) {
        var i, s, o, r;
        return i = t(n.currentTarget), o = String.fromCharCode(n.which), /^\d+$/.test(o) && !d(i) ? (r = (i.val() + o).replace(/\D/g, ""), s = e(r), s ? r.length <= s.length[s.length.length - 1] : r.length <= 16) : void 0
    }, g = function(e) {
        var n, i, s;
        return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) && !d(n) ? (s = n.val() + i, s = s.replace(/\D/g, ""), s.length > 6 ? !1 : void 0) : void 0
    }, f = function(e) {
        var n, i, s;
        return n = t(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) ? (s = n.val() + i, s.length <= 4) : void 0
    }, y = function(e) {
        var n, s, o, r, a;
        return n = t(e.currentTarget), a = n.val(), r = t.payment.cardType(a) || "unknown", n.hasClass(r) ? void 0 : (s = function() {
            var t, e, n;
            for (n = [], t = 0, e = i.length; e > t; t++)
                o = i[t], n.push(o.type);
            return n
        }(), n.removeClass("unknown"), n.removeClass(s.join(" ")), n.addClass(r), n.toggleClass("identified", "unknown" !== r), n.trigger("payment.cardType", r))
    }, t.payment.fn.formatCardCVC = function() {
        return this.payment("restrictNumeric"), this.on("keypress", f), this
    }, t.payment.fn.formatCardExpiry = function() {
        return this.payment("restrictNumeric"), this.on("keypress", g), this.on("keypress", l), this.on("keypress", u), this.on("keypress", c), this.on("keydown", r), this
    }, t.payment.fn.formatCardNumber = function() {
        return this.payment("restrictNumeric"), this.on("keypress", m), this.on("keypress", a), this.on("keydown", o), this.on("keyup", y), this.on("paste", p), this
    }, t.payment.fn.restrictNumeric = function() {
        return this.on("keypress", v), this
    }, t.payment.fn.cardExpiryVal = function() {
        return t.payment.cardExpiryVal(t(this).val())
    }, t.payment.cardExpiryVal = function(t) {
        var e, n, i, s;
        return t = t.replace(/\s/g, ""), s = t.split("/", 2), e = s[0], i = s[1], 2 === (null != i ? i.length : void 0) && /^\d+$/.test(i) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), i = n + i), e = parseInt(e, 10), i = parseInt(i, 10), {month: e,year: i}
    }, t.payment.validateCardNumber = function(t) {
        var n, i;
        return t = (t + "").replace(/\s+|-/g, ""), /^\d+$/.test(t) ? (n = e(t), n ? (i = t.length, S.call(n.length, i) >= 0 && (n.luhn === !1 || h(t))) : !1) : !1
    }, t.payment.validateCardExpiry = function(e, n) {
        var i, s, o, r;
        return "object" == typeof e && "month" in e && (r = e, e = r.month, n = r.year), e && n ? (e = t.trim(e), n = t.trim(n), /^\d+$/.test(e) && /^\d+$/.test(n) && parseInt(e, 10) <= 12 ? (2 === n.length && (o = (new Date).getFullYear(), o = o.toString().slice(0, 2), n = o + n), s = new Date(n, e), i = new Date, s.setMonth(s.getMonth() - 1), s.setMonth(s.getMonth() + 1, 1), s > i) : !1) : !1
    }, t.payment.validateCardCVC = function(e, i) {
        var s, o;
        return e = t.trim(e), /^\d+$/.test(e) ? i ? (s = e.length, S.call(null != (o = n(i)) ? o.cvcLength : void 0, s) >= 0) : e.length >= 3 && e.length <= 4 : !1
    }, t.payment.cardType = function(t) {
        var n;
        return t ? (null != (n = e(t)) ? n.type : void 0) || null : null
    }, t.payment.formatCardNumber = function(t) {
        var n, i, s, o;
        return (n = e(t)) ? (s = n.length[n.length.length - 1], t = t.replace(/\D/g, ""), t = t.slice(0, +s + 1 || 9e9), n.format.global ? null != (o = t.match(n.format)) ? o.join(" ") : void 0 : (i = n.format.exec(t), null != i && i.shift(), null != i ? i.join(" ") : void 0)) : t
    }
}.call(this));


// END of jquery.payment
