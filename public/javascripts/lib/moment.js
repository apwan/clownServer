
// 09 - moment.js

(function(t) {
    function e(t, e) {
        return function(n) {
            return l(t.call(this, n), e)
        }
    }
    function n(t, e) {
        return function(n) {
            return this.lang().ordinal(t.call(this, n), e)
        }
    }
    function i() {
    }
    function s(t) {
        r(this, t)
    }
    function o(t) {
        var e = t.years || t.year || t.y || 0, n = t.months || t.month || t.M || 0, i = t.weeks || t.week || t.w || 0, s = t.days || t.day || t.d || 0, o = t.hours || t.hour || t.h || 0, r = t.minutes || t.minute || t.m || 0, a = t.seconds || t.second || t.s || 0, l = t.milliseconds || t.millisecond || t.ms || 0;
        this._input = t, this._milliseconds = +l + 1e3 * a + 6e4 * r + 36e5 * o, this._days = +s + 7 * i, this._months = +n + 12 * e, this._data = {}, this._bubble()
    }
    function r(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }
    function a(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    }
    function l(t, e) {
        for (var n = t + ""; n.length < e; )
            n = "0" + n;
        return n
    }
    function c(t, e, n, i) {
        var s, o, r = e._milliseconds, a = e._days, l = e._months;
        r && t._d.setTime(+t._d + r * n), (a || l) && (s = t.minute(), o = t.hour()), a && t.date(t.date() + a * n), l && t.month(t.month() + l * n), r && !i && $.updateOffset(t), (a || l) && (t.minute(s), t.hour(o))
    }
    function u(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function d(t, e) {
        var n, i = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), o = 0;
        for (n = 0; i > n; n++)
            ~~t[n] !== ~~e[n] && o++;
        return o + s
    }
    function h(t) {
        return t ? le[t] || t.toLowerCase().replace(/(.)s$/, "$1") : t
    }
    function p(t, e) {
        return e.abbr = t, B[t] || (B[t] = new i), B[t].set(e), B[t]
    }
    function f(t) {
        delete B[t]
    }
    function m(t) {
        if (!t)
            return $.fn._lang;
        if (!B[t] && F)
            try {
                require("./lang/" + t)
            } catch (e) {
                return $.fn._lang
            }
        return B[t] || $.fn._lang
    }
    function g(t) {
        return t.match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }
    function v(t) {
        var e, n, i = t.match(W);
        for (e = 0, n = i.length; n > e; e++)
            i[e] = he[i[e]] ? he[i[e]] : g(i[e]);
        return function(s) {
            var o = "";
            for (e = 0; n > e; e++)
                o += i[e] instanceof Function ? i[e].call(s, t) : i[e];
            return o
        }
    }
    function y(t, e) {
        return e = b(e, t.lang()), ce[e] || (ce[e] = v(e)), ce[e](t)
    }
    function b(t, e) {
        function n(t) {
            return e.longDateFormat(t) || t
        }
        for (var i = 5; i-- && (Y.lastIndex = 0, Y.test(t)); )
            t = t.replace(Y, n);
        return t
    }
    function S(t, e) {
        switch (t) {
            case "DDDD":
                return G;
            case "YYYY":
                return J;
            case "YYYYY":
                return K;
            case "S":
            case "SS":
            case "SSS":
            case "DDD":
                return q;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return Z;
            case "a":
            case "A":
                return m(e._l)._meridiemParse;
            case "X":
                return ee;
            case "Z":
            case "ZZ":
                return Q;
            case "T":
                return te;
            case "MM":
            case "DD":
            case "YY":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
                return X;
            default:
                return new RegExp(t.replace("\\", ""))
        }
    }
    function E(t) {
        var e = (Q.exec(t) || [])[0], n = (e + "").match(oe) || ["-", 0, 0], i = +(60 * n[1]) + ~~n[2];
        return "+" === n[0] ? -i : i
    }
    function T(t, e, n) {
        var i, s = n._a;
        switch (t) {
            case "M":
            case "MM":
                null != e && (s[1] = ~~e - 1);
                break;
            case "MMM":
            case "MMMM":
                i = m(n._l).monthsParse(e), null != i ? s[1] = i : n._isValid = !1;
                break;
            case "D":
            case "DD":
                null != e && (s[2] = ~~e);
                break;
            case "DDD":
            case "DDDD":
                null != e && (s[1] = 0, s[2] = ~~e);
                break;
            case "YY":
                s[0] = ~~e + (~~e > 68 ? 1900 : 2e3);
                break;
            case "YYYY":
            case "YYYYY":
                s[0] = ~~e;
                break;
            case "a":
            case "A":
                n._isPm = m(n._l).isPM(e);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                s[3] = ~~e;
                break;
            case "m":
            case "mm":
                s[4] = ~~e;
                break;
            case "s":
            case "ss":
                s[5] = ~~e;
                break;
            case "S":
            case "SS":
            case "SSS":
                s[6] = ~~(1e3 * ("0." + e));
                break;
            case "X":
                n._d = new Date(1e3 * parseFloat(e));
                break;
            case "Z":
            case "ZZ":
                n._useUTC = !0, n._tzm = E(e)
        }
        null == e && (n._isValid = !1)
    }
    function w(t) {
        var e, n, i, s = [];
        if (!t._d) {
            for (i = k(t), e = 0; 3 > e && null == t._a[e]; ++e)
                t._a[e] = s[e] = i[e];
            for (; 7 > e; e++)
                t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            s[3] += ~~((t._tzm || 0) / 60), s[4] += ~~((t._tzm || 0) % 60), n = new Date(0), t._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), t._d = n
        }
    }
    function _(t) {
        var e = t._i;
        t._d || (t._a = [e.years || e.year || e.y, e.months || e.month || e.M, e.days || e.day || e.d, e.hours || e.hour || e.h, e.minutes || e.minute || e.m, e.seconds || e.second || e.s, e.milliseconds || e.millisecond || e.ms], w(t))
    }
    function k(t) {
        var e = new Date;
        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
    }
    function L(t) {
        var e, n, i, s = m(t._l), o = "" + t._i;
        for (i = b(t._f, s).match(W), t._a = [], e = 0; e < i.length; e++)
            n = (S(i[e], t).exec(o) || [])[0], n && (o = o.slice(o.indexOf(n) + n.length)), he[i[e]] && T(i[e], n, t);
        o && (t._il = o), t._isPm && t._a[3] < 12 && (t._a[3] += 12), t._isPm === !1 && 12 === t._a[3] && (t._a[3] = 0), w(t)
    }
    function C(t) {
        var e, n, i, o, a, l = 99;
        for (o = 0; o < t._f.length; o++)
            e = r({}, t), e._f = t._f[o], L(e), n = new s(e), a = d(e._a, n.toArray()), n._il && (a += n._il.length), l > a && (l = a, i = n);
        r(t, i)
    }
    function x(t) {
        var e, n = t._i, i = ne.exec(n);
        if (i) {
            for (t._f = "YYYY-MM-DD" + (i[2] || " "), e = 0; 4 > e; e++)
                if (se[e][1].exec(n)) {
                    t._f += se[e][0];
                    break
                }
            Q.exec(n) && (t._f += " Z"), L(t)
        } else
            t._d = new Date(n)
    }
    function A(e) {
        var n = e._i, i = z.exec(n);
        n === t ? e._d = new Date : i ? e._d = new Date(+i[1]) : "string" == typeof n ? x(e) : u(n) ? (e._a = n.slice(0), w(e)) : n instanceof Date ? e._d = new Date(+n) : "object" == typeof n ? _(e) : e._d = new Date(n)
    }
    function I(t, e, n, i, s) {
        return s.relativeTime(e || 1, !!n, t, i)
    }
    function D(t, e, n) {
        var i = H(Math.abs(t) / 1e3), s = H(i / 60), o = H(s / 60), r = H(o / 24), a = H(r / 365), l = 45 > i && ["s", i] || 1 === s && ["m"] || 45 > s && ["mm", s] || 1 === o && ["h"] || 22 > o && ["hh", o] || 1 === r && ["d"] || 25 >= r && ["dd", r] || 45 >= r && ["M"] || 345 > r && ["MM", H(r / 30)] || 1 === a && ["y"] || ["yy", a];
        return l[2] = e, l[3] = t > 0, l[4] = n, I.apply({}, l)
    }
    function M(t, e, n) {
        var i, s = n - e, o = n - t.day();
        return o > s && (o -= 7), s - 7 > o && (o += 7), i = $(t).add("d", o), {week: Math.ceil(i.dayOfYear() / 7),year: i.year()}
    }
    function R(t) {
        var e = t._i, n = t._f;
        return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = m().preparse(e)), $.isMoment(e) ? (t = r({}, e), t._d = new Date(+e._d)) : n ? u(n) ? C(t) : L(t) : A(t), new s(t))
    }
    function N(t, e) {
        $.fn[t] = $.fn[t + "s"] = function(t) {
            var n = this._isUTC ? "UTC" : "";
            return null != t ? (this._d["set" + n + e](t), $.updateOffset(this), this) : this._d["get" + n + e]()
        }
    }
    function O(t) {
        $.duration.fn[t] = function() {
            return this._data[t]
        }
    }
    function P(t, e) {
        $.duration.fn["as" + t] = function() {
            return +this / e
        }
    }
    for (var $, j, U = "2.2.1", H = Math.round, B = {}, F = "undefined" != typeof module && module.exports, z = /^\/?Date\((\-?\d+)/i, V = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, W = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, X = /\d\d?/, q = /\d{1,3}/, G = /\d{3}/, J = /\d{1,4}/, K = /[+\-]?\d{1,6}/, Z = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Q = /Z|[\+\-]\d\d:?\d\d/i, te = /T/i, ee = /[\+\-]?\d+(\.\d{1,3})?/, ne = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, ie = "YYYY-MM-DDTHH:mm:ssZ", se = [["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], oe = /([\+\-]|\d\d)/gi, re = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), ae = {Milliseconds: 1,Seconds: 1e3,Minutes: 6e4,Hours: 36e5,Days: 864e5,Months: 2592e6,Years: 31536e6}, le = {ms: "millisecond",s: "second",m: "minute",h: "hour",d: "day",w: "week",W: "isoweek",M: "month",y: "year"}, ce = {}, ue = "DDD w W M D d".split(" "), de = "M D H h m s w W".split(" "), he = {M: function() {
        return this.month() + 1
    },MMM: function(t) {
        return this.lang().monthsShort(this, t)
    },MMMM: function(t) {
        return this.lang().months(this, t)
    },D: function() {
        return this.date()
    },DDD: function() {
        return this.dayOfYear()
    },d: function() {
        return this.day()
    },dd: function(t) {
        return this.lang().weekdaysMin(this, t)
    },ddd: function(t) {
        return this.lang().weekdaysShort(this, t)
    },dddd: function(t) {
        return this.lang().weekdays(this, t)
    },w: function() {
        return this.week()
    },W: function() {
        return this.isoWeek()
    },YY: function() {
        return l(this.year() % 100, 2)
    },YYYY: function() {
        return l(this.year(), 4)
    },YYYYY: function() {
        return l(this.year(), 5)
    },gg: function() {
        return l(this.weekYear() % 100, 2)
    },gggg: function() {
        return this.weekYear()
    },ggggg: function() {
        return l(this.weekYear(), 5)
    },GG: function() {
        return l(this.isoWeekYear() % 100, 2)
    },GGGG: function() {
        return this.isoWeekYear()
    },GGGGG: function() {
        return l(this.isoWeekYear(), 5)
    },e: function() {
        return this.weekday()
    },E: function() {
        return this.isoWeekday()
    },a: function() {
        return this.lang().meridiem(this.hours(), this.minutes(), !0)
    },A: function() {
        return this.lang().meridiem(this.hours(), this.minutes(), !1)
    },H: function() {
        return this.hours()
    },h: function() {
        return this.hours() % 12 || 12
    },m: function() {
        return this.minutes()
    },s: function() {
        return this.seconds()
    },S: function() {
        return ~~(this.milliseconds() / 100)
    },SS: function() {
        return l(~~(this.milliseconds() / 10), 2)
    },SSS: function() {
        return l(this.milliseconds(), 3)
    },Z: function() {
        var t = -this.zone(), e = "+";
        return 0 > t && (t = -t, e = "-"), e + l(~~(t / 60), 2) + ":" + l(~~t % 60, 2)
    },ZZ: function() {
        var t = -this.zone(), e = "+";
        return 0 > t && (t = -t, e = "-"), e + l(~~(10 * t / 6), 4)
    },z: function() {
        return this.zoneAbbr()
    },zz: function() {
        return this.zoneName()
    },X: function() {
        return this.unix()
    }}; ue.length; )
        j = ue.pop(), he[j + "o"] = n(he[j], j);
    for (; de.length; )
        j = de.pop(), he[j + j] = e(he[j], 2);
    for (he.DDDD = e(he.DDD, 3), r(i.prototype, {set: function(t) {
        var e, n;
        for (n in t)
            e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e
    },_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months: function(t) {
        return this._months[t.month()]
    },_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort: function(t) {
        return this._monthsShort[t.month()]
    },monthsParse: function(t) {
        var e, n, i;
        for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
            if (this._monthsParse[e] || (n = $.utc([2e3, e]), i = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[e] = new RegExp(i.replace(".", ""), "i")), this._monthsParse[e].test(t))
                return e
    },_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays: function(t) {
        return this._weekdays[t.day()]
    },_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort: function(t) {
        return this._weekdaysShort[t.day()]
    },_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin: function(t) {
        return this._weekdaysMin[t.day()]
    },weekdaysParse: function(t) {
        var e, n, i;
        for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
            if (this._weekdaysParse[e] || (n = $([2e3, 1]).day(e), i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[e] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[e].test(t))
                return e
    },_longDateFormat: {LT: "h:mm A",L: "MM/DD/YYYY",LL: "MMMM D YYYY",LLL: "MMMM D YYYY LT",LLLL: "dddd, MMMM D YYYY LT"},longDateFormat: function(t) {
        var e = this._longDateFormat[t];
        return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
            return t.slice(1)
        }), this._longDateFormat[t] = e), e
    },isPM: function(t) {
        return "p" === (t + "").toLowerCase().charAt(0)
    },_meridiemParse: /[ap]\.?m?\.?/i,meridiem: function(t, e, n) {
        return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    },_calendar: {sameDay: "[Today at] LT",nextDay: "[Tomorrow at] LT",nextWeek: "dddd [at] LT",lastDay: "[Yesterday at] LT",lastWeek: "[Last] dddd [at] LT",sameElse: "L"},calendar: function(t, e) {
        var n = this._calendar[t];
        return "function" == typeof n ? n.apply(e) : n
    },_relativeTime: {future: "in %s",past: "%s ago",s: "a few seconds",m: "a minute",mm: "%d minutes",h: "an hour",hh: "%d hours",d: "a day",dd: "%d days",M: "a month",MM: "%d months",y: "a year",yy: "%d years"},relativeTime: function(t, e, n, i) {
        var s = this._relativeTime[n];
        return "function" == typeof s ? s(t, e, n, i) : s.replace(/%d/i, t)
    },pastFuture: function(t, e) {
        var n = this._relativeTime[t > 0 ? "future" : "past"];
        return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
    },ordinal: function(t) {
        return this._ordinal.replace("%d", t)
    },_ordinal: "%d",preparse: function(t) {
        return t
    },postformat: function(t) {
        return t
    },week: function(t) {
        return M(t, this._week.dow, this._week.doy).week
    },_week: {dow: 0,doy: 6}}), $ = function(t, e, n) {
        return R({_i: t,_f: e,_l: n,_isUTC: !1})
    }, $.utc = function(t, e, n) {
        return R({_useUTC: !0,_isUTC: !0,_l: n,_i: t,_f: e}).utc()
    }, $.unix = function(t) {
        return $(1e3 * t)
    }, $.duration = function(t, e) {
        var n, i, s = $.isDuration(t), r = "number" == typeof t, a = s ? t._input : r ? {} : t, l = V.exec(t);
        return r ? e ? a[e] = t : a.milliseconds = t : l && (n = "-" === l[1] ? -1 : 1, a = {y: 0,d: ~~l[2] * n,h: ~~l[3] * n,m: ~~l[4] * n,s: ~~l[5] * n,ms: ~~l[6] * n}), i = new o(a), s && t.hasOwnProperty("_lang") && (i._lang = t._lang), i
    }, $.version = U, $.defaultFormat = ie, $.updateOffset = function() {
    }, $.lang = function(t, e) {
        return t ? (t = t.toLowerCase(), t = t.replace("_", "-"), e ? p(t, e) : null === e ? (f(t), t = "en") : B[t] || m(t), void ($.duration.fn._lang = $.fn._lang = m(t))) : $.fn._lang._abbr
    }, $.langData = function(t) {
        return t && t._lang && t._lang._abbr && (t = t._lang._abbr), m(t)
    }, $.isMoment = function(t) {
        return t instanceof s
    }, $.isDuration = function(t) {
        return t instanceof o
    }, r($.fn = s.prototype, {clone: function() {
        return $(this)
    },valueOf: function() {
        return +this._d + 6e4 * (this._offset || 0)
    },unix: function() {
        return Math.floor(+this / 1e3)
    },toString: function() {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    },toDate: function() {
        return this._offset ? new Date(+this) : this._d
    },toISOString: function() {
        return y($(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    },toArray: function() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
    },isValid: function() {
        return null == this._isValid && (this._isValid = this._a ? !d(this._a, (this._isUTC ? $.utc(this._a) : $(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    },invalidAt: function() {
        var t, e = this._a, n = (this._isUTC ? $.utc(this._a) : $(this._a)).toArray();
        for (t = 6; t >= 0 && e[t] === n[t]; --t)
            ;
        return t
    },utc: function() {
        return this.zone(0)
    },local: function() {
        return this.zone(0), this._isUTC = !1, this
    },format: function(t) {
        var e = y(this, t || $.defaultFormat);
        return this.lang().postformat(e)
    },add: function(t, e) {
        var n;
        return n = "string" == typeof t ? $.duration(+e, t) : $.duration(t, e), c(this, n, 1), this
    },subtract: function(t, e) {
        var n;
        return n = "string" == typeof t ? $.duration(+e, t) : $.duration(t, e), c(this, n, -1), this
    },diff: function(t, e, n) {
        var i, s, o = this._isUTC ? $(t).zone(this._offset || 0) : $(t).local(), r = 6e4 * (this.zone() - o.zone());
        return e = h(e), "year" === e || "month" === e ? (i = 432e5 * (this.daysInMonth() + o.daysInMonth()), s = 12 * (this.year() - o.year()) + (this.month() - o.month()), s += (this - $(this).startOf("month") - (o - $(o).startOf("month"))) / i, s -= 6e4 * (this.zone() - $(this).startOf("month").zone() - (o.zone() - $(o).startOf("month").zone())) / i, "year" === e && (s /= 12)) : (i = this - o, s = "second" === e ? i / 1e3 : "minute" === e ? i / 6e4 : "hour" === e ? i / 36e5 : "day" === e ? (i - r) / 864e5 : "week" === e ? (i - r) / 6048e5 : i), n ? s : a(s)
    },from: function(t, e) {
        return $.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
    },fromNow: function(t) {
        return this.from($(), t)
    },calendar: function() {
        var t = this.diff($().zone(this.zone()).startOf("day"), "days", !0), e = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
        return this.format(this.lang().calendar(e, this))
    },isLeapYear: function() {
        var t = this.year();
        return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
    },isDST: function() {
        return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
    },day: function(t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? "string" == typeof t && (t = this.lang().weekdaysParse(t), "number" != typeof t) ? this : this.add({d: t - e}) : e
    },month: function(t) {
        var e, n = this._isUTC ? "UTC" : "";
        return null != t ? "string" == typeof t && (t = this.lang().monthsParse(t), "number" != typeof t) ? this : (e = this.date(), this.date(1), this._d["set" + n + "Month"](t), this.date(Math.min(e, this.daysInMonth())), $.updateOffset(this), this) : this._d["get" + n + "Month"]()
    },startOf: function(t) {
        switch (t = h(t)) {
            case "year":
                this.month(0);
            case "month":
                this.date(1);
            case "week":
            case "isoweek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === t ? this.weekday(0) : "isoweek" === t && this.isoWeekday(1), this
    },endOf: function(t) {
        return t = h(t), this.startOf(t).add("isoweek" === t ? "week" : t, 1).subtract("ms", 1)
    },isAfter: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) > +$(t).startOf(e)
    },isBefore: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) < +$(t).startOf(e)
    },isSame: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) === +$(t).startOf(e)
    },min: function(t) {
        return t = $.apply(null, arguments), this > t ? this : t
    },max: function(t) {
        return t = $.apply(null, arguments), t > this ? this : t
    },zone: function(t) {
        var e = this._offset || 0;
        return null == t ? this._isUTC ? e : this._d.getTimezoneOffset() : ("string" == typeof t && (t = E(t)), Math.abs(t) < 16 && (t = 60 * t), this._offset = t, this._isUTC = !0, e !== t && c(this, $.duration(e - t, "m"), 1, !0), this)
    },zoneAbbr: function() {
        return this._isUTC ? "UTC" : ""
    },zoneName: function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    },hasAlignedHourOffset: function(t) {
        return t = t ? $(t).zone() : 0, 0 === (this.zone() - t) % 60
    },daysInMonth: function() {
        return $.utc([this.year(), this.month() + 1, 0]).date()
    },dayOfYear: function(t) {
        var e = H(($(this).startOf("day") - $(this).startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add("d", t - e)
    },weekYear: function(t) {
        var e = M(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == t ? e : this.add("y", t - e)
    },isoWeekYear: function(t) {
        var e = M(this, 1, 4).year;
        return null == t ? e : this.add("y", t - e)
    },week: function(t) {
        var e = this.lang().week(this);
        return null == t ? e : this.add("d", 7 * (t - e))
    },isoWeek: function(t) {
        var e = M(this, 1, 4).week;
        return null == t ? e : this.add("d", 7 * (t - e))
    },weekday: function(t) {
        var e = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
        return null == t ? e : this.add("d", t - e)
    },isoWeekday: function(t) {
        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
    },get: function(t) {
        return t = h(t), this[t.toLowerCase()]()
    },set: function(t, e) {
        t = h(t), this[t.toLowerCase()](e)
    },lang: function(e) {
        return e === t ? this._lang : (this._lang = m(e), this)
    }}), j = 0; j < re.length; j++)
        N(re[j].toLowerCase().replace(/s$/, ""), re[j]);
    N("year", "FullYear"), $.fn.days = $.fn.day, $.fn.months = $.fn.month, $.fn.weeks = $.fn.week, $.fn.isoWeeks = $.fn.isoWeek, $.fn.toJSON = $.fn.toISOString, r($.duration.fn = o.prototype, {_bubble: function() {
        var t, e, n, i, s = this._milliseconds, o = this._days, r = this._months, l = this._data;
        l.milliseconds = s % 1e3, t = a(s / 1e3), l.seconds = t % 60, e = a(t / 60), l.minutes = e % 60, n = a(e / 60), l.hours = n % 24, o += a(n / 24), l.days = o % 30, r += a(o / 30), l.months = r % 12, i = a(r / 12), l.years = i
    },weeks: function() {
        return a(this.days() / 7)
    },valueOf: function() {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    },humanize: function(t) {
        var e = +this, n = D(e, !t, this.lang());
        return t && (n = this.lang().pastFuture(e, n)), this.lang().postformat(n)
    },add: function(t, e) {
        var n = $.duration(t, e);
        return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
    },subtract: function(t, e) {
        var n = $.duration(t, e);
        return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
    },get: function(t) {
        return t = h(t), this[t.toLowerCase() + "s"]()
    },as: function(t) {
        return t = h(t), this["as" + t.charAt(0).toUpperCase() + t.slice(1) + "s"]()
    },lang: $.fn.lang});
    for (j in ae)
        ae.hasOwnProperty(j) && (P(j, ae[j]), O(j.toLowerCase()));
    P("Weeks", 6048e5), $.duration.fn.asMonths = function() {
        return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, $.lang("en", {ordinal: function(t) {
        var e = t % 10, n = 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
        return t + n
    }}), F && (module.exports = $), "undefined" == typeof ender && (this.moment = $), "function" == typeof define && define.amd && define("moment", [], function() {
        return $
    })
}.call(this));


// END of moment.js

