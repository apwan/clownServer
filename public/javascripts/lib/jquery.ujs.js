// 03 - jquery-ujs.js

(function(t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, i = t(document);
    t.rails = n = {linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector: "form",formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector: "input[type=file]",linkDisableSelector: "a[data-disable-with], a[data-disable]",buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",CSRFProtection: function(e) {
        var n = t('meta[name="csrf-token"]').attr("content");
        n && e.setRequestHeader("X-CSRF-Token", n)
    },refreshCSRFTokens: function() {
        var e = t("meta[name=csrf-token]").attr("content"), n = t("meta[name=csrf-param]").attr("content");
        t('form input[name="' + n + '"]').val(e)
    },fire: function(e, n, i) {
        var s = t.Event(n);
        return e.trigger(s, i), s.result !== !1
    },confirm: function(t) {
        return confirm(t)
    },ajax: function(e) {
        return t.ajax(e)
    },href: function(t) {
        return t.attr("href")
    },handleRemote: function(i) {
        var s, o, r, a, l, c, u, d;
        if (n.fire(i, "ajax:before")) {
            if (a = i.data("cross-domain"), l = a === e ? null : a, c = i.data("with-credentials") || null, u = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, i.is("form")) {
                s = i.attr("method"), o = i.attr("action"), r = i.serializeArray();
                var h = i.data("ujs:submit-button");
                h && (r.push(h), i.data("ujs:submit-button", null))
            } else
                i.is(n.inputChangeSelector) ? (s = i.data("method"), o = i.data("url"), r = i.serialize(), i.data("params") && (r = r + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (s = i.data("method") || "get", o = i.data("url"), r = i.serialize(), i.data("params") && (r = r + "&" + i.data("params"))) : (s = i.data("method"), o = n.href(i), r = i.data("params") || null);
            return d = {type: s || "GET",data: r,dataType: u,beforeSend: function(t, s) {
                return s.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + s.accepts.script), n.fire(i, "ajax:beforeSend", [t, s]) ? void i.trigger("ajax:send", t) : !1
            },success: function(t, e, n) {
                i.trigger("ajax:success", [t, e, n])
            },complete: function(t, e) {
                i.trigger("ajax:complete", [t, e])
            },error: function(t, e, n) {
                i.trigger("ajax:error", [t, e, n])
            },crossDomain: l}, c && (d.xhrFields = {withCredentials: c}), o && (d.url = o), n.ajax(d)
        }
        return !1
    },handleMethod: function(i) {
        var s = n.href(i), o = i.data("method"), r = i.attr("target"), a = t("meta[name=csrf-token]").attr("content"), l = t("meta[name=csrf-param]").attr("content"), c = t('<form method="post" action="' + s + '"></form>'), u = '<input name="_method" value="' + o + '" type="hidden" />';
        l !== e && a !== e && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), r && c.attr("target", r), c.hide().append(u).appendTo("body"), c.submit()
    },formElements: function(e, n) {
        return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
    },disableFormElements: function(e) {
        n.formElements(e, n.disableSelector).each(function() {
            n.disableFormElement(t(this))
        })
    },disableFormElement: function(t) {
        var n, i;
        n = t.is("button") ? "html" : "val", i = t.data("disable-with"), t.data("ujs:enable-with", t[n]()), i !== e && t[n](i), t.prop("disabled", !0)
    },enableFormElements: function(e) {
        n.formElements(e, n.enableSelector).each(function() {
            n.enableFormElement(t(this))
        })
    },enableFormElement: function(t) {
        var e = t.is("button") ? "html" : "val";
        t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
    },allowAction: function(t) {
        var e, i = t.data("confirm"), s = !1;
        return i ? (n.fire(t, "confirm") && (s = n.confirm(i), e = n.fire(t, "confirm:complete", [s])), s && e) : !0
    },blankInputs: function(e, n, i) {
        var s, o, r = t(), a = n || "input,textarea", l = e.find(a);
        return l.each(function() {
            if (s = t(this), o = s.is("input[type=checkbox],input[type=radio]") ? s.is(":checked") : s.val(), !o == !i) {
                if (s.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + s.attr("name") + '"]').length)
                    return !0;
                r = r.add(s)
            }
        }), r.length ? r : !1
    },nonBlankInputs: function(t, e) {
        return n.blankInputs(t, e, !0)
    },stopEverything: function(e) {
        return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
    },disableElement: function(t) {
        var i = t.data("disable-with");
        t.data("ujs:enable-with", t.html()), i !== e && t.html(i), t.bind("click.railsDisable", function(t) {
            return n.stopEverything(t)
        })
    },enableElement: function(t) {
        t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
    }}, n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
        t.crossDomain || n.CSRFProtection(i)
    }), i.delegate(n.linkDisableSelector, "ajax:complete", function() {
        n.enableElement(t(this))
    }), i.delegate(n.buttonDisableSelector, "ajax:complete", function() {
        n.enableFormElement(t(this))
    }), i.delegate(n.linkClickSelector, "click.rails", function(i) {
        var s = t(this), o = s.data("method"), r = s.data("params"), a = i.metaKey || i.ctrlKey;
        if (!n.allowAction(s))
            return n.stopEverything(i);
        if (!a && s.is(n.linkDisableSelector) && n.disableElement(s), s.data("remote") !== e) {
            if (a && (!o || "GET" === o) && !r)
                return !0;
            var l = n.handleRemote(s);
            return l === !1 ? n.enableElement(s) : l.error(function() {
                n.enableElement(s)
            }), !1
        }
        return s.data("method") ? (n.handleMethod(s), !1) : void 0
    }), i.delegate(n.buttonClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i))
            return n.stopEverything(e);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var s = n.handleRemote(i);
        return s === !1 ? n.enableFormElement(i) : s.error(function() {
            n.enableFormElement(i)
        }), !1
    }), i.delegate(n.inputChangeSelector, "change.rails", function(e) {
        var i = t(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(e)
    }), i.delegate(n.formSubmitSelector, "submit.rails", function(i) {
        var s, o, r = t(this), a = r.data("remote") !== e;
        if (!n.allowAction(r))
            return n.stopEverything(i);
        if (r.attr("novalidate") == e && (s = n.blankInputs(r, n.requiredInputSelector), s && n.fire(r, "ajax:aborted:required", [s])))
            return n.stopEverything(i);
        if (a) {
            if (o = n.nonBlankInputs(r, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(r)
                }, 13);
                var l = n.fire(r, "ajax:aborted:file", [o]);
                return l || setTimeout(function() {
                    n.enableFormElements(r)
                }, 13), l
            }
            return n.handleRemote(r), !1
        }
        setTimeout(function() {
            n.disableFormElements(r)
        }, 13)
    }), i.delegate(n.formInputClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i))
            return n.stopEverything(e);
        var s = i.attr("name"), o = s ? {name: s,value: i.val()} : null;
        i.closest("form").data("ujs:submit-button", o)
    }), i.delegate(n.formSubmitSelector, "ajax:send.rails", function(e) {
        this == e.target && n.disableFormElements(t(this))
    }), i.delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
        this == e.target && n.enableFormElements(t(this))
    }), t(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery));