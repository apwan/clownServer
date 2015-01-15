/**
 * Created by WuYijie on 1/8/15.
 */


window.SL = function(t) { // GLOBAL: SL
    t = t.split(".");
    for (var e = SL; t.length; ) {
        var n = t.shift();
        e[n] || (e[n] = {}), e = e[n]
    }
    return e
}, 

$(function() {
    function init() {
        envDetect(), SL.settings.init(), SL.keyboard.init(), SL.pointer.init(), SL.warnings.init(), 
        "undefined" == typeof SLConfig && (window.SLConfig = {}), 
        config(),
        s()
    }
    // detect device
    function envDetect() {
        var t = $("html");
        t.addClass("loaded"), SL.util.device.HAS_TOUCH && t.addClass("touch"), SL.util.device.isChrome() ? t.addClass("ua-chrome") : SL.util.device.isSafari() ? t.addClass("ua-safari") : SL.util.device.isIE() && t.addClass("ua-ie")
    }
    // Initiating SL with SLConfig
    function config() {
        "object" == typeof window.SLConfig && (
            SLConfig.deck && !SLConfig.deck.notes && (SLConfig.deck.notes = {}), 
            SL.current_user = new SL.models.User(SLConfig.current_user), 
            "object" == typeof SLConfig.deck && (SL.current_deck = new SL.models.Deck(SLConfig.deck)), 
            "object" == typeof SLConfig.team && (SL.current_team = new SL.models.Team(SLConfig.team))
        )
    }
    
    function s() {
        var t = $("html");
        // short for consecutive if/elseif's
        SL.util.hideAddressBar(), 
        t.hasClass("home index") && (SL.view = new SL.views.home.Index), SL.view = t.hasClass("home explore") ? new SL.views.home.Explore : t.hasClass("users show") ? new SL.views.users.Show : t.hasClass("decks show") ? new SL.views.decks.Show : t.hasClass("decks edit") ? new SL.editor.Editor : t.hasClass("decks edit-requires-upgrade") ? new SL.views.decks.EditRequiresUpgrade : t.hasClass("decks embed") ? new SL.views.decks.Embed : t.is(".decks.live-client") ? new SL.views.decks.LiveClient : t.is(".decks.live-server") ? new SL.views.decks.LiveServer : t.hasClass("decks speaker") ? new SL.views.decks.Speaker : t.hasClass("decks fullscreen") ? new SL.views.decks.Fullscreen : t.hasClass("teams-subscriptions-show") ? new SL.views.teams.subscriptions.Show : t.hasClass("registrations") && (t.hasClass("edit") || 
        t.hasClass("update")) ? new SL.views.devise.Edit : t.hasClass("registrations") || t.hasClass("team_registrations") || t.hasClass("sessions") || t.hasClass("passwords") ? new SL.views.devise.All : t.hasClass("subscriptions new") || 
        t.hasClass("subscriptions edit") ? new SL.views.subscriptions.New : t.hasClass("subscriptions show") ? new SL.views.subscriptions.Show : t.hasClass("subscriptions edit_period") ? new SL.views.subscriptions.EditPeriod : t.hasClass("teams-signup") ? new SL.views.teams.New : t.hasClass("teams edit") ? new SL.views.teams.teams.Edit : t.hasClass("teams edit_members") ? new SL.views.teams.teams.EditMembers : t.hasClass("teams show") ? new SL.views.teams.teams.Show : t.hasClass("themes edit") ? new SL.views.themes.Edit : t.hasClass("themes preview") ? new SL.views.themes.Preview : t.hasClass("pricing") ? new SL.views.statik.Pricing : t.hasClass("static") ? new SL.views.statik.All : new SL.views.Base, 
        Placement.sync()
    }
    setTimeout(init, 1)
}), 

/**
*  SL Models
*/
SL("models").Collection = Class.extend({
    init: function(t, e) {
        if (this.data = t || [], this.factory = e, this.changed = new signals.Signal, "function" == typeof this.factory) {
            var n = this.data;
            this.data = [];
            for (var i = 0, s = n.length; s > i; i++) {
                var o = n[i];
                this.data.push(o instanceof this.factory ? n[i] : new this.factory(n[i]))
            }
        }
    },find: function(t) {
        for (var e = 0, n = this.data.length; n > e; e++) {
            var i = this.data[e];
            if (i === t)
                return e
        }
        return -1
    },findByProperties: function(t) {
        for (var e = 0, n = this.data.length; n > e; e++) {
            var i = this.data[e], s = !0;
            for (var o in t)
                t.hasOwnProperty(o) && ("function" == typeof i.get ? i.get(o) != t[o] && (s = !1) : i[o] != t[o] && (s = !1));
            if (s)
                return e
        }
        return -1
    },getByProperties: function(t) {
        return this.data[this.findByProperties(t)]
    },remove: function(t) {
        for (var e, n = 0; n < this.data.length; n++)
            this.data[n] === t && (e = this.data.splice(n, 1), n--);
        e && this.changed.dispatch()
    },removeByProperties: function(t) {
        for (var e, n = this.findByProperties(t), i = 0; -1 !== n && i++ < 1e3; )
            e = this.data.splice(n, 1), n = this.findByProperties(t);
        e && this.changed.dispatch()
    },removeByIndex: function(t) {
        var e = this.data.splice(t, 1);
        return this.changed.dispatch(), e
    },create: function(t, e) {
        if (e = $.extend({prepend: !1}, e), "function" == typeof this.factory) {
            var n = new this.factory(t);
            return e.prepend ? this.unshift(n) : this.push(n), this.changed.dispatch(), n
        }
    },clear: function() {
        this.data.length = 0, this.changed.dispatch()
    },swap: function(t, e) {
        var n = "number" == typeof t && t >= 0 && t < this.size(), i = "number" == typeof e && e >= 0 && e < this.size();
        if (n && i) {
            var s = this.data[t], o = this.data[e];
            this.data[t] = o, this.data[e] = s
        }
        this.changed.dispatch()
    },shiftLeft: function(t) {
        "number" == typeof t && t > 0 && this.swap(t, t - 1)
    },shiftRight: function(t) {
        "number" == typeof t && t < this.size() - 1 && this.swap(t, t + 1)
    },at: function(t) {
        return this.data[t]
    },first: function() {
        return this.at(0)
    },last: function() {
        return this.at(this.size() - 1)
    },size: function() {
        return this.data.length
    },isEmpty: function() {
        return 0 === this.size()
    },getUniqueName: function(t, e) {
        var n = t, i = {};
        i[e] = n;
        for (var s = 2; this.get(i); )
            n = t + " " + s, i[e] = n, s += 1;
        return n
    },toJSON: function() {
        return this.map(function(t) {
            return "function" == typeof t.toJSON ? t.toJSON() : t
        })
    },destroy: function() {
        this.changed.dispose(), this.data = null
    },unshift: function(t) {
        return this.data.unshift(t)
    },push: function(t) {
        return this.data.push(t)
    },pop: function() {
        return this.data.pop()
    },map: function(t) {
        return this.data.map(t)
    },forEach: function(t) {
        return this.data.forEach(t)
    }}), 

SL("models").Model = Class.extend({
    init: function(t) {
        this.data = t || {}
    },set: function(t, e) {
        this.data[t] = e
    },get: function(t) {
        if ("string" == typeof t && /\./.test(t)) {
            for (var e = t.split("."), n = this.data; e.length && n; )
                t = e.shift(), n = n[t];
            return n
        }
        return this.data[t]
    },has: function(t) {
        var e = this.get(t);
        return !!e || e === !1 || 0 === e
    },toJSON: function() {
        return JSON.parse(JSON.stringify(this.data))
    }
}), 

SL("models").Customer = SL.models.Model.extend({
    init: function(t) {
        this._super(t)
    },isTrial: function() {
        return "trialing" === this.get("subscription.status")
    },hasActiveSubscription: function() {
        return !this.get("subscription.cancel_at_period_end")
    },getNextInvoiceDate: function() {
        return this.get("next_charge")
    },getNextInvoiceSum: function() {
        return (parseFloat(this.get("next_charge_amount")) / 100).toFixed(2)
    },clone: function() {
        return new SL.models.Customer(JSON.parse(JSON.stringify(this.data)))
    }
}), 

SL("models").Deck = SL.models.Model.extend({
    init: function(t) {
        this.data = t || {}, $.extend(this, this.data), this.user_settings = new SL.models.UserSettings(this.data.user.settings)
    },isPro: function() {
        return this.data.user ? !!this.data.user.pro : !1
    },isPrivate: function() {
        var t = SL.current_deck.get("visibility");
        return t === SL.models.Deck.VISIBILITY_SELF || t === SL.models.Deck.VISIBILITY_TEAM
    },getAbsoluteURL: function(t) {
        var e = document.location.protocol + "//" + document.location.host + SL.routes.DECK(this.get("user").username, this.get("slug"));
        return t && (e += "/" + t), e
    },getTokenedAbsoluteURL: function(t) {
        var e = this.getAbsoluteURL(t);
        return this.isPrivate() && (e += "?token=" + this.get("access_token")), e
    },clone: function() {
        return new SL.models.Deck(JSON.parse(JSON.stringify(this.data)))
    }
}), 

SL("models").Deck.VISIBILITY_SELF = "self", 
SL("models").Deck.VISIBILITY_TEAM = "team", 
SL("models").Deck.VISIBILITY_ALL = "all", 

SL("models").Team = SL.models.Model.extend({
    init: function(t) {
        if (this._super(t), "object" == typeof this.data.themes)
            for (var e = 0, n = this.data.themes.length; n > e; e++)
                this.data.themes[e] = new SL.models.Theme(this.data.themes[e]);
        this.set("themes", new SL.models.Collection(this.data.themes))
    },hasThemes: function() {
        var t = this.get("themes");
        return t && t.size() > 0
    },clone: function() {
        return new SL.models.Team(JSON.parse(JSON.stringify(this.data)))
    }
}), 

SL("models").Template = SL.models.Model.extend({
    init: function(t) {
        this._super(t)
    }
}), 

SL("models").ThemeSnippet = SL.models.Model.extend({
    init: function(t) {
        this._super(t), this.has("title") || this.set("title", ""), this.has("template") || this.set("template", "")
    },templatize: function(t) {
        var e = this.get("template");
        return e && (e = e.split(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG).join(""), t.forEach(function(t) {
            e = e.replace(t.string, t.value || t.defaultValue)
        })), e
    },getTemplateVariables: function() {
        var t = this.get("template");
        if (t) {
            t = t.split(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG).join("");
            var e = t.match(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_REGEX);
            if (e)
                return e = e.map(function(t) {
                    var e = t.split(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_DIVIDER), n = {string: t,label: e[0] || "",defaultValue: e[1] || ""};
                    return n.label = n.label.trim(), n.defaultValue = n.defaultValue.trim(), n.label = n.label.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_OPENER, ""), n.label = n.label.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_CLOSER, ""), n.defaultValue = n.defaultValue.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_OPENER, ""), n.defaultValue = n.defaultValue.replace(SL.models.ThemeSnippet.TEMPLATE_VARIABLE_CLOSER, ""), n
                })
        }
        return []
    },templateHasVariables: function() {
        return this.getTemplateVariables().length > 0
    },templateHasSelection: function() {
        var t = this.get("template");
        return t ? t.indexOf(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG) > -1 : !1
    },isEmpty: function() {
        return !this.get("title") && !this.get("template")
    }
}), 

SL.models.ThemeSnippet.TEMPLATE_VARIABLE_OPENER = "{{", 
SL.models.ThemeSnippet.TEMPLATE_VARIABLE_CLOSER = "}}", 
SL.models.ThemeSnippet.TEMPLATE_VARIABLE_DIVIDER = "::", 
SL.models.ThemeSnippet.TEMPLATE_VARIABLE_REGEX = /\{\{.*?\}\}/gi, 
SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG = "{{selection}}", 

SL("models").Theme = SL.models.Model.extend({
    init: function(t) {
        if (this._super(t), this.has("name") || this.set("name", "Untitled"), this.has("font") || this.set("font", SL.config.DEFAULT_THEME_FONT), this.has("color") || this.set("color", SL.config.DEFAULT_THEME_COLOR), this.has("transition") || this.set("transition", SL.config.DEFAULT_THEME_TRANSITION), this.has("background_transition") || this.set("background_transition", SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION), "string" == typeof this.data.snippets && this.data.snippets.length > 0)
            try {
                this.data.snippets = JSON.parse(this.data.snippets)
            } catch (e) {
                console.warn("Malformed snippets JSON")
            }
        this.set("snippets", new SL.models.Collection(this.data.snippets, SL.models.ThemeSnippet)), "string" == typeof this.data.palette && this.data.palette.length > 0 ? (this.data.palette = this.data.palette.split(","), this.data.palette = this.data.palette.map(function(t) {
            return t.trim()
        })) : this.data.palette = []
    },hasThumbnail: function() {
        return !!this.get("thumbnail_url")
    },hasJavaScript: function() {
        return !!this.get("js")
    },hasPalette: function() {
        return this.get("palette").length > 0
    },isTransitionDeprecated: function() {
        var t = this.get("transition");
        return SL.config.THEME_TRANSITIONS.some(function(e) {
            return e.id === t && e.deprecated === !0
        })
    },isBackgroundTransitionDeprecated: function() {
        var t = this.get("background_transition");
        return SL.config.THEME_BACKGROUND_TRANSITIONS.some(function(e) {
            return e.id === t && e.deprecated === !0
        })
    },clone: function() {
        return new SL.models.Theme(JSON.parse(JSON.stringify(this.toJSON())))
    },toJSON: function() {
        return {id: this.get("id"),name: this.get("name"),center: this.get("center"),rolling_links: this.get("rolling_links"),font: this.get("font"),color: this.get("color"),transition: this.get("transition"),background_transition: this.get("background_transition"),html: this.get("html"),less: this.get("less"),css: this.get("css"),js: this.get("js"),snippets: JSON.stringify(this.get("snippets").toJSON()),palette: this.get("palette").join(",")}
    }}),
SL("models").Theme.fromDeck = function(t) {
    return new SL.models.Theme({id: t.theme_id,name: "",center: t.center,rolling_links: t.rolling_links,font: t.theme_font,color: t.theme_color,transition: t.transition,background_transition: t.background_transition,snippets: "",palette: []})
}, 

SL("models").UserSettings = SL.models.Model.extend({
    init: function(t) {
        this._super(t), this.has("present_controls") || this.set("present_controls", SL.config.PRESENT_CONTROLS_DEFAULT), this.has("present_upsizing") || this.set("present_upsizing", SL.config.PRESENT_UPSIZING_DEFAULT)
    },save: function(t) {
        var e = {user_settings: {}};
        return t ? t.forEach(function(t) {
            e.user_settings[t] = this.get(t)
        }.bind(this)) : e.user_settings = this.toJSON(), $.ajax({url: SL.config.AJAX_UPDATE_USER_SETTINGS,type: "PUT",data: e})
    },clone: function() {
        return new SL.models.UserSettings(JSON.parse(JSON.stringify(this.data)))
    }
}), 

SL("models").User = Class.extend({
    init: function(t) {
        this.data = t || {}, $.extend(this, this.data), this.settings = new SL.models.UserSettings(this.data.settings)
    },isPro: function() {
        return !!this.pro
    },isEnterprise: function() {
        return !!this.enterprise
    },isEnterpriseManager: function() {
        return !!this.enterprise_manager
    },get: function(t) {
        return this[t]
    },set: function(t, e) {
        this[t] = e
    },has: function(t) {
        var e = this.get(t);
        return !!e || e === !1 || 0 === e
    },hasThemes: function() {
        return SL.current_team ? SL.current_team.hasThemes() : void 0
    },getThemes: function() {
        return SL.current_team ? SL.current_team.get("themes") : new SL.models.Collection
    },hasDefaultTheme: function() {
        return !!this.getDefaultTheme()
    },getDefaultTheme: function() {
        var t = this.getThemes();
        return t.getByProperties(SL.current_team ? {id: SL.current_team.get("default_theme_id")} : {id: this.default_theme_id})
    },getProfileURL: function() {
        return "/" + this.username
    }
}), 

/*  END of MODELS */

/**
* SL Utility & Helper
*/

SL.util = {
    getQuery: function() {
        var t = {};
        return location.search.replace(/[A-Z0-9]+?=([\w%]*)/gi, function(e) {
            t[e.split("=").shift()] = unescape(e.split("=").pop())
        }), t
    },getMetaKeyName: function() {
        return SL.util.device.isOSX() ? "&#8984" : "CTRL"
    },escapeHTMLEntities: function(t) {
        return t = t || "", t = t.split("<").join("&lt;"), t = t.split(">").join("&gt;")
    },unescapeHTMLEntities: function(t) {
        var e = document.createElement("div");
        e.innerHTML = t || "";
        var n = 0 === e.childNodes.length ? "" : e.childNodes[0].nodeValue;
        return n || ""
    },toArray: function(t) {
        for (var e = [], n = 0, i = t.length; i > n; n++)
            e.push(t[n]);
        return e
    },skipCSSTransitions: function(t, e) {
        t = $(t ? t : "html");
        var n = typeof t.get(0);
        ("undefined" === n || "number" === n) && console.warn("Bad target for skipCSSTransitions."), t.addClass("no-transition"), setTimeout(function() {
            t.removeClass("no-transition")
        }, e || 1)
    },setupReveal: function(t) {
        if ("undefined" != typeof Reveal) {
            var e = {controls: !0,progress: !0,history: !1,mouseWheel: !1,margin: .05,autoSlideStoppable: !0,dependencies: [{src: SL.config.ASSET_URLS["reveal-plugins/markdown/marked.js"],condition: function() {
                            return !!document.querySelector(".reveal [data-markdown]")
                        }}, {src: SL.config.ASSET_URLS["reveal-plugins/markdown/markdown.js"],condition: function() {
                            return !!document.querySelector(".reveal [data-markdown]")
                        }}, {src: SL.config.ASSET_URLS["reveal-plugins/highlight/highlight.js"],async: !0,condition: function() {
                            return !!document.querySelector(".reveal pre code")
                        },callback: function() {
                            hljs.initHighlightingOnLoad()
                        }}]};
            if (SLConfig && SLConfig.deck && (e.autoSlide = SLConfig.deck.auto_slide_interval || 0, e.rollingLinks = SLConfig.deck.rolling_links, e.center = SLConfig.deck.center, e.loop = SLConfig.deck.should_loop, e.rtl = SLConfig.deck.rtl, e.transition = SLConfig.deck.transition || "default", e.backgroundTransition = SLConfig.deck.background_transition), 
                $.extend(e, t), 
                // Reveal listener
                Reveal.initialize(e), Reveal.addEventListener("ready", function() {
                window.STATUS = window.STATUS || {}, window.STATUS.REVEAL_IS_READY = !0, $("html").addClass("reveal-is-ready")
            }), t && t.openLinksInTabs && this.openLinksInTabs($(".reveal .slides")), t && t.trackEvents && Reveal.isReady() && Reveal.getTotalSlides() > 2) {
                var n = [];
                Reveal.addEventListener("slidechanged", function() {
                    var t = Reveal.getProgress();
                    t >= .5 && !n[0] && (n[0] = !0, SL.analytics.trackPresenting("Presentation progress: 50%")), t >= 1 && !n[1] && (n[1] = !0, SL.analytics.trackPresenting("Presentation progress: 100%"))
                })
            }
            SL.util.deck.injectNotes()
        }
    },openLinksInTabs: function(t) {
        t && t.find("a").each(function() {
            var t = $(this), e = t.attr("href");
            // regex  /gi = global, case-insensitive, /m=multi-line
            /^#/gi.test(e) === !0 ? t.removeAttr("target") : /http|www/gi.test(e) ? t.attr("target", "_blank") : t.attr("target", "_top")
        })
    },openPopupWindow: function(t, e, n, i) {
        var s = screen.width / 2 - n / 2, o = screen.height / 2 - i / 2;
        return window.open(t, e, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + n + ", height=" + i + ", top=" + o + ", left=" + s)
    },layoutReveal: function(t, e) {
        if (clearInterval(this.revealLayoutInterval), clearTimeout(this.revealLayoutTimeout), 1 === arguments.length)
            this.revealLayoutTimeout = setTimeout(Reveal.layout, t);
        else {
            if (2 !== arguments.length)
                throw "Illegal arguments, expected (duration[, fps])";
            this.revealLayoutInterval = setInterval(Reveal.layout, e), this.revealLayoutTimeout = setTimeout(function() {
                clearInterval(this.revealLayoutInterval)
            }.bind(this), t)
        }
    },getRevealSlideBounds: function(t, e) {
        t = t || SL.editor.controllers.Markup.getCurrentSlide();
        var n = t.offset(), i = Reveal.getScale(), s = n.left * i, o = n.top * i;
        if (e) {
            var r = $(".projector").offset();
            r && (s -= r.left, o -= r.top)
        }
        return {x: s,y: o,width: t.outerWidth() * i,height: t.outerHeight() * i}
    },getRevealSlidesBounds: function(t) {
        var e = $(".reveal .slides"), n = e.offset(), i = Reveal.getScale(), s = n.left * i, o = n.top * i;
        if (t) {
            // adjust projector
            var r = $(".projector").offset();
            r && (s -= r.left, o -= r.top)
        }
        return {x: s,y: o,width: e.outerWidth() * i,height: e.outerHeight() * i}
    },getRevealElementOffset: function(t, e) {
        t = $(t);
        var n = {x: 0,y: 0};
        if (t.parents("section").length)
            for (; t.length && !t.is("section"); )
                n.x += t.get(0).offsetLeft, n.y += t.get(0).offsetTop, e && (n.x -= parseInt(t.css("margin-left"), 10), n.y -= parseInt(t.css("margin-top"), 10)), t = $(t.get(0).offsetParent);
        return n
    },getRevealElementGlobalOffset: function(t) {
        var e = $(t), n = e.closest(".reveal"), i = {x: 0,y: 0};
        if (e.length && n.length) {
            var s = Reveal.getConfig(), o = Reveal.getScale(), r = n.get(0).getBoundingClientRect(), a = {x: r.left + r.width / 2,y: r.top + r.height / 2}, l = s.width * o, c = s.height * o;
            i.x = a.x - l / 2, i.y = a.y - c / 2;
            var u = e.closest(".slides section");
            u.length && (i.y -= u.scrollTop() * o);
            var d = SL.util.getRevealElementOffset(e);
            i.x += d.x * o, i.y += d.y * o
        }
        return i
    },getRevealCounterScale: function() {
        return window.Reveal ? 2 - Reveal.getScale() : 1
    },globalToRevealCoordinate: function(t, e) {
        var n = SL.util.getRevealSlideBounds(), i = SL.util.getRevealCounterScale();
        return {x: (t - n.x) * i,y: (e - n.y) * i}
    },globalToProjectorCoordinate: function(t, e) {
        var n = {x: t,y: e}, i = $(".projector").offset();
        return i && (n.x -= i.left, n.y -= i.top), n
    },hideAddressBar: function() {
        if (SL.util.device.IS_PHONE && !/crios/gi.test(navigator.userAgent)) {
            var t = function() {
                setTimeout(function() {
                    window.scrollTo(0, 1)
                }, 10)
            };
            $(window).on("orientationchange", function() {
                t()
            }), t()
        }
    },callback: function() {
        "function" == typeof arguments[0] && arguments[0].apply(null, [].slice.call(arguments, 1))
    },getPlaceholderImage: function(t) {
        var e = "";
        return t && "function" == typeof window.btoa && (e = window.btoa(Math.random().toString()).replace(/=/g, "")), "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" + e
    },isTypingEvent: function(t) {
        return $(t.target).is('input:not([type="file"]), textarea, [contenteditable]')
    }
}, 

SL.util.user = {
    isLoggedIn: function() {
        return "object" == typeof SLConfig && "object" == typeof SLConfig.current_user
    },isPro: function() {
        return SL.util.user.isLoggedIn() ? SLConfig.current_user.pro : null
    },isEnterprise: function() {
        return SL.util.user.isLoggedIn() ? SLConfig.current_user.enterprise : null
    }
}, 

SL.util.device = {
    HAS_TOUCH: !!("ontouchstart" in window),IS_PHONE: /iphone|ipod|android|windows\sphone/gi.test(navigator.userAgent),IS_TABLET: /ipad/gi.test(navigator.userAgent),
    isOSX: function() {
        return /Mac OS X/.test(navigator.userAgent)
    },isIE: function() {
        return /MSIE\s[0-9]/gi.test(navigator.userAgent) || /Trident\/7.0;(.*)rv:\d\d/.test(navigator.userAgent)
    },isChrome: function() {
        return /chrome/gi.test(navigator.userAgent)
    },isSafari: function() {
        return /safari/gi.test(navigator.userAgent) && !SL.util.device.isChrome()
    },isSafariDesktop: function() {
        return SL.util.device.isSafari() && !SL.util.device.isChrome() && !SL.util.device.IS_PHONE && !SL.util.device.IS_TABLET
    },isOpera: function() {
        return !!window.opera
    },isPhantomJS: function() {
        return /PhantomJS/gi.test(navigator.userAgent)
    },supportedByEditor: function() {
        return Modernizr.history && Modernizr.csstransforms && !SL.util.device.isOpera()
    }},

SL.util.trig = {
    distanceBetween: function(t, e) {
        var n = t.x - e.x, i = t.y - e.y;
        return Math.sqrt(n * n + i * i)
    },intersection: function(t, e) {
        return {width: Math.max(0, Math.min(t.x + t.width, e.x + e.width) - Math.max(t.x, e.x)),height: Math.max(0, Math.min(t.y + t.height, e.y + e.height) - Math.max(t.y, e.y))}
    },intersects: function(t, e, n) {
        "undefined" == typeof n && (n = 0);
        var i = SL.util.trig.intersection(t, e);
        return i.width > t.width * n && i.height > t.height * n
    }
}, 
SL.util.string = {URL_REGEX: /((https?\:\/\/)|(www\.)|(\/\/))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,SCRIPT_TAG_REGEX: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,uniqueIDCount: 0,
    uniqueID: function(t) {
        return SL.util.string.uniqueIDCount += 1, (t || "") + SL.util.string.uniqueIDCount + "-" + Date.now()
    },slug: function(t) {
        return "string" == typeof t ? (t = SL.util.string.trim(t), t = t.toLowerCase(), t = t.replace(/-/g, " "), t = t.replace(/[^\w\s]/g, ""), t = t.replace(/\s{2,}/g, " "), t = t.replace(/\s/g, "-")) : ""
    },trim: function(t) {
        return SL.util.string.trimRight(SL.util.string.trimLeft(t))
    },trimLeft: function(t) {
        return "string" == typeof t ? t.replace(/^\s+/, "") : ""
    },trimRight: function(t) {
        return "string" == typeof t ? t.replace(/\s+$/, "") : ""
    },linkify: function(t) {
        return t && (t = t.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(t) {
            var e = t;
            return e.match("^https?://") || (e = "http://" + e), '<a href="' + e + '">' + t + "</a>"
        })), t
    },pluralize: function(t, e, n) {
        return n ? t + e : t
    },getCustomClassesFromLESS: function(t) {
        var e = (t || "").match(/\/\/=[a-z0-9-_ \t]{2,}(?=\n)?/gi);
        return e ? e.map(function(t) {
            return t = t.replace("//=", ""), t = t.trim(), t = t.toLowerCase(), t = t.replace(/\s/g, "-")
        }) : []
    }
}, 
SL.util.validate = {
    name: function() {
        return []
    },slug: function(t) {
        t = t || "";
        var e = [];
        return t.length < 2 && e.push("At least 2 characters"), /\s/gi.test(t) && e.push("No spaces please"), /^[\w-_]+$/gi.test(t) || e.push("Can only contain: A-Z, 0-9, - and _"), e
    },username: function(t) {
        return SL.util.validate.slug(t)
    },team_slug: function(t) {
        return SL.util.validate.slug(t)
    },password: function(t) {
        t = t || "";
        var e = [];
        return t.length < 6 && e.push("At least 6 characters"), e
    },email: function(t) {
        t = t || "";
        var e = [];
        return /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$/gi.test(t) || e.push("Please enter a valid email"), e
    },twitterhandle: function(t) {
        t = t || "";
        var e = [];
        return t.length > 15 && e.push("15 characters max"), /\s/gi.test(t) && e.push("No spaces please"), /^[\w-_]+$/gi.test(t) || e.push("Can only contain: A-Z, 0-9 and _"), e
    },url: function(t) {
        t = t || "";
        var e = [];
        return t.length < 4 && e.push("Please enter a valid URL"), /\s/gi.test(t) && e.push("No spaces please"), e
    },decktitle: function(t) {
        t = t || "";
        var e = [];
        return 0 === t.length && e.push("Can not be empty"), e
    },deckslug: function(t) {
        t = t || "";
        var e = [];
        return 0 === t.length && e.push("Can not be empty"), e
    },google_analytics_id: function(t) {
        t = t || "";
        var e = [];
        return /\bUA-\d{4,20}-\d{1,10}\b/gi.test(t) || e.push("Please enter a valid ID"), e
    },none: function() {
        return []
    }}, 
SL.util.dom = {
    scrollIntoViewIfNeeded: function(t) {
        t && ("function" == typeof t.scrollIntoViewIfNeeded ? t.scrollIntoViewIfNeeded.apply(t, [].slice.call(arguments, 1)) : "function" == typeof t.scrollIntoView && t.scrollIntoView())
    },insertCSRF: function(t, e) {
        "undefined" == typeof e && (e = $('meta[name="csrf-token"]').attr("content")), e && (t.find('input[name="authenticity_token"]').remove(), t.append('<input name="authenticity_token" type="hidden" value="' + e + '" />'))
    }
}, 
SL.util.html = {
    indent: function(t) {
        var e = vkbeautify.xml(t);
        return e = e.replace(/<pre>[\n\r\t\s]+<code/gi, "<pre><code"), e = e.replace(/<\/code>[\n\r\t\s]+<\/pre>/gi, "</code></pre>")
    },ATTR_SRC_NORMAL: "src",ATTR_SRC_SILENCED: "data-silenced-src",ATTR_SRC_NORMAL_REGEX: " src=",ATTR_SRC_SILENCED_REGEX: " data-silenced-src=",muteSources: function(t) {
        return (t || "").replace(new RegExp(SL.util.html.ATTR_SRC_NORMAL_REGEX, "gi"), SL.util.html.ATTR_SRC_SILENCED_REGEX)
    },unmuteSources: function(t) {
        return (t || "").replace(new RegExp(SL.util.html.ATTR_SRC_SILENCED_REGEX, "gi"), SL.util.html.ATTR_SRC_NORMAL_REGEX)
    },trimCode: function(t) {
        $(t).find("pre code").each(function() {
            var t = $(this).parent("pre"), e = t.html(), n = $.trim(e);
            e !== n && t.html(n)
        })
    },removeAttributes: function(t, e) {
        t = $(t);
        var n = $.map(t.get(0).attributes, function(t) {
            return t.name
        });
        "function" == typeof e && (n = n.filter(e)), $.each(n, function(e, n) {
            t.removeAttr(n)
        })
    },removeClasses: function(t, e) {
        if (t = $(t), "function" == typeof e) {
            var n = (t.attr("class") || "").split(" ").filter(e);
            t.removeClass(n.join(" "))
        } else
            t.attr("class", "")
    },findScriptTags: function(t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = SL.util.toArray(e.getElementsByTagName("script"));
        return n.map(function(t) {
            return t.outerHTML
        })
    },removeScriptTags: function(t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = SL.util.toArray(e.getElementsByTagName("script"));
        return n.forEach(function(t) {
            t.parentNode.removeChild(t)
        }), e.innerHTML
    },createSpinner: function(t) {
        return t = $.extend({lines: 12,radius: 8,length: 6,width: 3,color: "#fff",zIndex: "auto",left: "0",top: "0",className: ""}, t), new Spinner(t)
    },generateSpinners: function() {
        $(".spinner").each(function(t, e) {
            if (e.hasAttribute("data-spinner-state") === !1) {
                e.setAttribute("data-spinner-state", "spinning");
                var n = {};
                e.hasAttribute("data-spinner-color") && (n.color = e.getAttribute("data-spinner-color")), e.hasAttribute("data-spinner-lines") && (n.lines = parseInt(e.getAttribute("data-spinner-lines"), 10)), e.hasAttribute("data-spinner-width") && (n.width = parseInt(e.getAttribute("data-spinner-width"), 10)), e.hasAttribute("data-spinner-radius") && (n.radius = parseInt(e.getAttribute("data-spinner-radius"), 10)), e.hasAttribute("data-spinner-length") && (n.length = parseInt(e.getAttribute("data-spinner-length"), 10));
                var i = SL.util.html.createSpinner(n);
                i.spin(e)
            }
        })
    },createDeckThumbnail: function(t) {
        // thumbnail here!
        var t = {DECK_URL: t.user.username + "/" + t.slug,DECK_VIEWS: "number" == typeof t.view_count ? t.view_count : "N/A",DECK_THUMB_URL: t.thumbnail_url || SL.config.DEFAULT_DECK_THUMBNAIL,USER_URL: "/" + t.user.username,USER_NAME: t.user.name || t.user.username,USER_THUMB_URL: t.user.thumbnail_url || SL.config.DEFAULT_USER_THUMBNAIL}, e = SL.config.DECK_THUMBNAIL_TEMPLATE;
        for (var n in t)
            e = e.replace("{{" + n + "}}", t[n]);
        return $(e)
    }},
SL.util.deck = {
    idCounter: 1,sortInjectedStyles: function() {
    var t = $("head");
    $("#theme-css-output").appendTo(t), $("#user-css-output").appendTo(t)
},generateIdentifiers: function() {
    $(".reveal .slides section").each(function() {
        (this.hasAttribute("data-id") === !1 || 0 === this.getAttribute("data-id").length) && this.setAttribute("data-id", CryptoJS.MD5(["slide", SL.current_user.get("id"), SL.current_deck.get("id"), Date.now(), SL.util.deck.idCounter++].join("-")).toString())
    })
},injectNotes: function() {
    SLConfig.deck && SLConfig.deck.notes && [].forEach.call(document.querySelectorAll(".reveal .slides section"), function(t) {
        var e = SLConfig.deck.notes[t.getAttribute("data-id")];
        e && "string" == typeof e && t.setAttribute("data-notes", e)
    })
},getBackgroundColor: function() {
    var t = $(".reveal-viewport");
    if (t.length) {
        var e = t.css("background-color");
        if (window.Reveal && window.Reveal.isReady()) {
            var n = window.Reveal.getIndices(), i = window.Reveal.getSlideBackground(n.h, n.v);
            if (i) {
                var s = i.style.backgroundColor;
                s && window.tinycolor(s).getAlpha() > 0 && (e = s)
            }
        }
        if (e)
            return e
    }
    return "#ffffff"
},getBackgroundContrast: function() {
    return SL.util.color.getContrast(SL.util.deck.getBackgroundColor())
},getBackgroundBrightness: function() {
    return SL.util.color.getBrightness(SL.util.deck.getBackgroundColor())
}
},

SL.util.color = {
    getContrast: function(t) {
        var e = window.tinycolor(t).toRgb(), n = (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
        return n / 255
    },getBrightness: function(t) {
        var e = window.tinycolor(t).toRgb(), n = e.r / 255 * .3 + e.g / 255 * .59 + (e.b / 255 + .11);
        return n / 2
    }
}, 

SL.util.anim = {
    collapseListItem: function(t, e, n) {
        t = $(t), t.addClass("no-transition"), t.css({overflow: "hidden"}), t.animate({opacity: 0,height: 0,minHeight: 0,paddingTop: 0,paddingBottom: 0,marginTop: 0,marginBottom: 0}, {duration: n || 500,complete: e})
    }
}, 
    
SL.util.selection = {
    moveCursorToEnd: function(t) {
        if (t) {
            t.focus();
            var e = document.createRange();
            e.selectNodeContents(t), e.collapse(!1), selection = window.getSelection(), selection.removeAllRanges(), selection.addRange(e)
        }
    },selectText: function(t) {
        var e, n;
        document.body.createTextRange ? (e = document.body.createTextRange(), e.moveToElementText(t), e.select()) : window.getSelection && (n = window.getSelection(), e = document.createRange(), e.selectNodeContents(t), n.removeAllRanges(), n.addRange(e))
    },getSelectedElement: function() {
        var t = window.getSelection();
        return t && t.anchorNode ? t.anchorNode.parentNode : null
    },getSelectedTags: function() {
        var t = SL.util.selection.getSelectedElement(), e = [];
        if (t)
            for (; t; )
                e.push(t.nodeName.toLowerCase()), t = t.parentNode;
        return e
    },getSelectedHTML: function() {
        var t;
        if (document.selection && document.selection.createRange)
            return t = document.selection.createRange(), t.htmlText;
        if (window.getSelection) {
            var e = window.getSelection();
            if (e.rangeCount > 0) {
                t = e.getRangeAt(0);
                var n = t.cloneContents(), i = document.createElement("div");
                return i.appendChild(n), i.innerHTML
            }
        }
        return ""
    }
}, 


"undefined" != typeof window.Spinner && "undefined" != typeof SL.util && SL.util.html.generateSpinners(), 



SL.analytics = {
    CATEGORY_OTHER: "other",CATEGORY_EDITOR: "editor",CATEGORY_THEMING: "theming",CATEGORY_PRESENTING: "presenting",
    _track: function(t, e, n) {
        "undefined" != typeof window.ga && ga("send", "event", t, e, n)
    },track: function(t, e) {
        this._track(SL.analytics.CATEGORY_OTHER, t, e)
    },trackEditor: function(t, e) {
        this._track(SL.analytics.CATEGORY_EDITOR, t, e)
    },trackTheming: function(t, e) {
        this._track(SL.analytics.CATEGORY_THEMING, t, e)
    },trackPresenting: function(t, e) {
        this._track(SL.analytics.CATEGORY_PRESENTING, t, e)
    }
}, 

// IMPORTANT configurations

SL.config = {
    SLIDE_WIDTH: 960,SLIDE_HEIGHT: 700,LOGIN_STATUS_INTERVAL: 6e4,UNSAVED_CHANGES_INTERVAL: 1500,AUTOSAVE_INTERVAL: 4e3,DECK_TITLE_MAXLENGTH: 200,SPEAKER_NOTES_MAXLENGTH: 300,MAX_IMAGE_UPLOAD_SIZE: 1e4,MAX_IMPORT_UPLOAD_SIZE: 1e5,IMPORT_SOCKET_TIMEOUT: 24e4,PRESENT_CONTROLS_DEFAULT: !0,PRESENT_UPSIZING_DEFAULT: !0,PRESENT_UPSIZING_MAX_SCALE: 10,DEFAULT_THEME_COLOR: "white-blue",DEFAULT_THEME_FONT: "montserrat",DEFAULT_THEME_TRANSITION: "slide",DEFAULT_THEME_BACKGROUND_TRANSITION: "slide",AUTO_SLIDE_OPTIONS: [2, 4, 6, 8, 10, 15, 20, 30, 40],
    THEME_COLORS: [{id: "white-blue"}, {id: "black-blue"}, {id: "sand-blue"}, {id: "beige-brown"}, {id: "sky-blue"}, {id: "silver-green"}, {id: "silver-blue"}, {id: "grey-blue"}, {id: "black-mint"}, {id: "black-orange"}, {id: "blue-yellow"}, {id: "forest-yellow"}, {id: "yellow-black"}, {id: "cobalt-orange"}, {id: "asphalt-orange"}, {id: "mint-beige"}, {id: "sea-yellow"}, {id: "coral-blue"}],
    THEME_FONTS: [{id: "montserrat",title: "Montserrat"}, {id: "league",title: "League"}, {id: "opensans",title: "Open Sans"}, {id: "josefine",title: "Josefine"}, {id: "palatino",title: "Palatino"}, {id: "news",title: "News"}, {id: "helvetica",title: "Helvetica"}, {id: "asul",title: "Asul"}, {id: "merriweather",title: "Merriweather"}, {id: "sketch",title: "Sketch"}, {id: "quicksand",title: "Quicksand"}, {id: "overpass",title: "Overpass"}],
    THEME_TRANSITIONS: [{id: "slide",title: "Slide"}, {id: "linear",title: "Linear",deprecated: !0}, {id: "fade",title: "Fade"}, {id: "none",title: "None"}, {id: "default",title: "Default"}, {id: "concave",title: "Concave"}, {id: "zoom",title: "Zoom"}, {id: "cube",title: "Cube",deprecated: !0}, {id: "page",title: "Page",deprecated: !0}],THEME_BACKGROUND_TRANSITIONS: [{id: "slide",title: "Slide"}, {id: "fade",title: "Fade"}, {id: "none",title: "None"}, {id: "convex",title: "Convex"}, {id: "concave",title: "Concave"}, {id: "zoom",title: "Zoom"}],
    BLOCKS: new SL.models.Collection([{type: "text",factory: "Text",label: "Text",icon: "type"}, {type: "image",factory: "Image",label: "Image",icon: "picture"}, {type: "shape",factory: "Shape",label: "Shape",icon: "shapes"}, {type: "iframe",factory: "Iframe",label: "Iframe",icon: "browser"}, {type: "code",factory: "Code",label: "Code",icon: "file-css"}, {type: "math",factory: "Math",label: "Math",icon: "divide"}, {type: "snippet",factory: "Snippet",label: "snippet",icon: "file-xml",hidden: !0}]),
    DEFAULT_DECK_THUMBNAIL: "/images/default-deck-thumbnail.png",DEFAULT_USER_THUMBNAIL: "/images/default-profile-picture.png",
    DECK_THUMBNAIL_TEMPLATE: ['<li class="deck-thumbnail">', '<div class="deck-image" style="background-image: url({{DECK_THUMB_URL}})">', '<a class="deck-link" href="{{DECK_URL}}"></a>', "</div>", '<footer class="deck-details">', '<a class="author" href="{{USER_URL}}">', '<span class="picture" style="background-image: url({{USER_THUMB_URL}})"></span>', '<span class="name">{{USER_NAME}}</span>', "</a>", '<div class="stats">', '<div>{{DECK_VIEWS}}<span class="icon i-eye"></span></div>', "</div>", "</footer>", "</li>"].join(""),
    AJAX_SEARCH: "/ajax/search.json",AJAX_SEARCH_ORGANIZATION: "/ajax/team/search.json",
    AJAX_CREATE_DECK: function() {
        return "/ajax/decks.json"
    },AJAX_UPDATE_DECK: function(t) {
        return "/ajax/" + t + ".json"
    },AJAX_PUBLISH_DECK: function(t) {
        return "/ajax/" + t + "/publish.json"
    },AJAX_GET_DECK_VERSIONS: function(t) {
        return "/ajax/" + t + "/revisions.json"
    },AJAX_PREVIEW_DECK_VERSION: function(t, e, n) {
        return "/" + t + "/" + e + "/preview?revision=" + n
    },AJAX_RESTORE_DECK_VERSION: function(t, e) {
        return "/ajax/" + t + "/revisions/" + e + "/restore.json"
    },AJAX_EXPORT_DECK: function(t, e) {
        return "/" + t + "/" + e + "/export"
    },AJAX_THUMBNAIL_DECK: function(t) {
        return "/ajax/" + t + "/thumbnails.json"
    },AJAX_FORK_DECK: function(t) {
        return "/ajax/" + t + "/fork.json"
    },AJAX_KUDO_DECK: function(t) {
        return "/ajax/" + t + "/kudos/kudo.json"
    },AJAX_UNKUDO_DECK: function(t) {
        return "/ajax/" + t + "/kudos/unkudo.json"
    },AJAX_PDF_EXPORT_START: function(t) {
        return "/ajax/" + t + "/exports.json"
    },AJAX_PDF_EXPORT_LIST: function(t) {
        return "/ajax/" + t + "/exports.json"
    },AJAX_PDF_EXPORT_STATUS: function(t, e) {
        return "/ajax/" + t + "/exports/" + e + ".json"
    },AJAX_PDF_IMPORT_NEW: "/ajax/imports.json",AJAX_PDF_IMPORT_UPLOADED: function(t) {
        return "/ajax/imports/" + t + ".json"
    },
    AJAX_DROPBOX_CONNECT: "/settings/dropbox/authorize",AJAX_DROPBOX_DISCONNECT: "https://www.dropbox.com/account/security#apps",
    AJAX_DROPBOX_SYNC_DECK: function(t) {
        return "/ajax/" + t + "/export.json"
    },AJAX_UPDATE_ORGANIZATION: "/ajax/team.json",AJAX_LOOKUP_ORGANIZATION: "/ajax/team/lookup.json",AJAX_ORGANIZATION_MEMBERS_LIST: "/ajax/team/users.json",AJAX_ORGANIZATION_MEMBER_CREATE: "/ajax/team/users.json",AJAX_ORGANIZATION_MEMBER_DELETE: function(t) {
        return "/ajax/team/users/" + t + ".json"
    },AJAX_ORGANIZATION_MEMBER_WELCOME: function(t) {
        return "/ajax/team/users/" + t + "/welcome.json"
    },AJAX_THEMES_LIST: "/ajax/themes.json",AJAX_THEMES_CREATE: "/ajax/themes.json",
    AJAX_THEMES_UPDATE: function(t) {
        return "/ajax/themes/" + t + ".json"
    },AJAX_THEMES_DELETE: function(t) {
        return "/ajax/themes/" + t + ".json"
    },AJAX_SLIDE_TEMPLATES_LIST: "/ajax/slide_templates.json",AJAX_SLIDE_TEMPLATES_CREATE: "/ajax/slide_templates.json",AJAX_SLIDE_TEMPLATES_UPDATE: function(t) {
        return "/ajax/slide_templates/" + t + ".json"
    },AJAX_SLIDE_TEMPLATES_DELETE: function(t) {
        return "/ajax/slide_templates/" + t + ".json"
    },AJAX_TEAM_SLIDE_TEMPLATES_LIST: "/ajax/team/slide_templates.json",AJAX_TEAM_SLIDE_TEMPLATES_CREATE: "/ajax/team/slide_templates.json",AJAX_TEAM_SLIDE_TEMPLATES_UPDATE: function(t) {
        return "/ajax/team/slide_templates/" + t + ".json"
    },AJAX_TEAM_SLIDE_TEMPLATES_DELETE: function(t) {
        return "/ajax/team/slide_templates/" + t + ".json"
    },AJAX_GET_USER: function(t) {
        return "/ajax/users/" + t + ".json"
    },AJAX_LOOKUP_USER: "/ajax/users/lookup.json",AJAX_SERVICES_USER: "/ajax/users/services.json",AJAX_UPDATE_USER: "/users.json",AJAX_GET_USER_SETTINGS: "/ajax/user_settings.json",AJAX_UPDATE_USER_SETTINGS: "/ajax/user_settings.json",AJAX_SUBSCRIPTIONS: "/subscriptions",AJAX_SUBSCRIPTIONS_STATUS: "/account/details.json",
    AJAX_SUBSCRIPTIONS_PRINT_RECEIPT: function(t) {
        return "/account/receipts/" + t
    },
    AJAX_TEAMS_CREATE: "/teams.json",AJAX_CHECK_STATUS: "/ajax/status.json",AJAX_IMAGE_UPLOAD: "/ajax/media.json",STREAM_ENGINE_HOST: window.location.protocol + "//stream.slides.com",STREAM_ENGINE_LIVE_NAMESPACE: "live",STREAM_ENGINE_EDITOR_NAMESPACE: "editor",
    S3_HOST: "https://s3.amazonaws.com/media-p.slid.es",
    ASSET_URLS: {"offline-v2.css": "./offline-v2.css","homepage-background.jpg": "./homepage-background.jpg","reveal-plugins/markdown/marked.js": "./marked.js","reveal-plugins/markdown/markdown.js": "./markdown.js","reveal-plugins/highlight/highlight.js": "./highlight.js"}
},

SL.config.V1 = {DEFAULT_THEME_COLOR: "grey-blue",DEFAULT_THEME_FONT: "league",DEFAULT_THEME_TRANSITION: "linear",DEFAULT_THEME_BACKGROUND_TRANSITION: "fade",
    THEME_COLORS: [{id: "grey-blue"}, {id: "black-mint"}, {id: "black-orange"}, {id: "forest-yellow"}, {id: "lila-yellow"}, {id: "asphalt-orange"}, {id: "sky-blue"}, {id: "beige-brown"}, {id: "sand-grey"}, {id: "silver-green"}, {id: "silver-blue"}, {id: "cobalt-orange"}, {id: "white-blue"}, {id: "mint-beige"}, {id: "sea-yellow"}, {id: "coral-blue"}],
    THEME_FONTS: [{id: "league",title: "League"}, {id: "opensans",title: "Open Sans"}, {id: "josefine",title: "Josefine"}, {id: "palatino",title: "Palatino"}, {id: "news",title: "News"}, {id: "montserrat",title: "Montserrat"}, {id: "helvetica",title: "Helvetica"}, {id: "asul",title: "Asul"}, {id: "merriweather",title: "Merriweather"}, {id: "sketch",title: "Sketch"}, {id: "quicksand",title: "Quicksand"}, {id: "overpass",title: "Overpass"}]
}, 
// key bindings
SL.keyboard = {
    init: function() {
        this.keyupConsumers = new SL.models.Collection, this.keydownConsumers = new SL.models.Collection, $(document).on("keydown", this.onDocumentKeyDown.bind(this)), $(document).on("keyup", this.onDocumentKeyUp.bind(this))
    },keydown: function(t) {
        this.keydownConsumers.push(t)
    },keyup: function(t) {
        this.keyupConsumers.push(t)
    },release: function(t) {
        this.keydownConsumers.remove(t), this.keyupConsumers.remove(t)
    },onDocumentKeyDown: function(t) {
        var e = !1;
        return this.keydownConsumers.forEach(function(n) {
            n(t) || (e = !0)
        }), e ? (t.preventDefault(), t.stopImmediatePropagation(), !1) : void 0
    },onDocumentKeyUp: function(t) {
        var e = !1;
        return this.keyupConsumers.forEach(function(n) {
            n(t) || (e = !0)
        }), e ? (t.preventDefault(), t.stopImmediatePropagation(), !1) : void 0
    }
}, 


SL.locale = {
    GENERIC_ERROR: ["Oops, something went wrong", "We ran into an unexpected error", "Something's wong, can you try that again?"],
    WARN_UNSAVED_CHANGES: "You have unsaved changes, save first?",CLOSE: "Close",PREVIOUS: "Previous",NEXT: "Next",
    DECK_SAVE_SUCCESS: "Saved successfully",DECK_SAVE_ERROR: "Failed to save",NEW_SLIDE_TITLE: "Title",LEAVE_UNSAVED_DECK: "You will lose your unsaved changes.",LEAVE_UNSAVED_THEME: "You will lose your unsaved changes.",REMOVE_PRO_CONFIRM: "After the end of the current billing cycle your account will be downgraded from Pro to the Free plan.",REMOVE_PRO_SUCCESS: "Subscription canceled",
    DECK_RESTORE_CONFIRM: "Are you sure you want to revert to this version from {#time}?",DECK_DELETE_CONFIRM: 'Are you sure you want to delete "{#title}"?',DECK_DELETE_SUCCESS: "Deck deleted",DECK_DELETE_ERROR: "Failed to delete",DECK_VISIBILITY_CHANGE_SELF: '<div><span class="icon i-lock-stroke"></span></div><h3>Private</h3><p>Only visible to you</p>',DECK_VISIBILITY_CHANGE_TEAM: '<div><span class="icon i-users"></span></div><h3>Internal</h3><p>Visible to your team</p>',DECK_VISIBILITY_CHANGE_ALL: '<div><span class="icon i-globe"></span></div><h3>Public</h3><p>Visible to the world</p>',DECK_VISIBILITY_CHANGED_SELF: "Your deck is now private",DECK_VISIBILITY_CHANGED_TEAM: "Your deck is now internal",DECK_VISIBILITY_CHANGED_ALL: "Your deck is now public",DECK_VISIBILITY_CHANGED_ERROR: "Failed to change visibility",DECK_EDIT_INVALID_TITLE: "Please enter a valid title",DECK_EDIT_INVALID_SLUG: "Please enter a valid URL",DECK_DELETE_SLIDE_CONFIRM: "Are you sure you want to remove this slide?",DECK_IMPORT_HTML_CONFIRM: "All existing content will be replaced, continue?",EXPORT_PDF_BUTTON: "Download PDF",EXPORT_PDF_BUTTON_WORKING: "Creating PDF...",EXPORT_PDF_ERROR: "An error occured while exporting your PDF.",DECKSHARER_URL_TITLE: "Link",DECKSHARER_EMBED_TITLE: "Embed",DECKSHARER_PRIVATE_URL_NOTICE: 'This deck is private but can be shared using the secret link above. To publicly share or embed your deck, please publish it first.',
    FORM_ERROR_REQUIRED: "Required",FORM_ERROR_USERNAME_TAKEN: ["That one's already taken :(", "Sorry, that's taken too"],FORM_ERROR_ORGANIZATION_SLUG_TAKEN: ["That one's already taken :(", "Sorry, that's taken too"],BILLING_DETAILS_ERROR: "An error occured while fetching your billing details, please try again.",BILLING_DETAILS_NOHISTORY: "You haven't made any payments yet.",
    THEME_CREATE: "New theme",THEME_CREATE_ERROR: "Failed to create theme",THEME_SAVE_SUCCESS: "Theme saved",THEME_SAVE_ERROR: "Failed to save theme",THEME_REMOVE_CONFIRM: "Are you sure you want to delete this theme?",THEME_REMOVE_SUCCESS: "Theme removed successfully",THEME_REMOVE_ERROR: "Failed to remove theme",THEME_LIST_LOAD_ERROR: "Failed to load themes",THEME_LIST_EMPTY: 'You haven\'t created any themes yet. <a href="#" class="create-theme-button">Create one now</a>.',THEME_CSS_DESCRIPTION: "This editor supports LESS or plain CSS input. All selectors are prefixed with .reveal when saved to avoid style spillover.",THEME_HTML_DESCRIPTION: "HTML is inserted into the presentation container, meaning it lives separately from individual slides. This makes it great for things like a company logo which is constantly visible on top of the presentation.",THEME_JS_DESCRIPTION: "Scripts will be executed when a deck that uses this theme is loaded.",THEME_DEFAULT_SAVE_SUCCESS: "Default theme was changed",THEME_DEFAULT_SAVE_ERROR: "Failed to change default theme",THEME_DELETE_TOOLTIP: "Delete",THEME_EDIT_TOOLTIP: "Edit",THEME_MAKE_DEFAULT_TOOLTIP: "Make this the default theme",THEME_IS_DEFAULT_TOOLTIP: "This is the default theme",THEME_SNIPPET_DELETE_CONFIRM: "Are you sure you want to delete this snippet?",
    TEMPLATE_LOAD_ERROR: "Failed to load slide templates",TEMPLATE_CREATE_ERROR: "Failed to save template",TEMPLATE_DELETE_CONFIRM: "Are you sure you want to delete this template?",
    ORG_USERS_REMOVE_CONFIRM: 'Delete "{#name}" and all of their decks?',ORG_USERS_REMOVE_SUCCESS: "User removed successfully",ORG_USERS_REMOVE_ERROR: "Failed to remove user",ORG_USERS_INVITE_SEND_SUCCESS: "Invite email sent",ORG_USERS_INVITE_SEND_ERROR: "Failed to send invite email",ORG_USERS_LIST_EMPTY: "Couldn't find any members of this team.",ORG_USERS_LIST_LOAD_ERROR: "Failed to load user list",
    SEARCH_PAGINATION_PAGE: "Page",SEARCH_NO_RESULTS_FOR: 'No results for "{#term}"',SEARCH_SERVER_ERROR: "Failed to fetch search results",SEARCH_NO_TERM_ERROR: "Please enter a search term",
    counter: {},
    get: function(t, e) {
        var n = SL.locale[t];
        if ("object" == typeof n && n.length && (this.counter[t] = "number" == typeof this.counter[t] ? (this.counter[t] + 1) % n.length : 0, n = n[this.counter[t]]), "object" == typeof e)
            for (var i in e)
                n = n.replace("{#" + i + "}", e[i]);
        return "string" == typeof n ? n : ""
    }
}, 
function(t) { // t = window,  imediately
    var e = {};
    e.sync = function() {
        $("[data-placement]").each(function() {
            var t = $(this), n = t.attr("data-placement");
            "function" == typeof e[n] ? e[n](t) : console.log('No matching layout found for "' + n + '"')
        })
    }, e.hcenter = function(t) {
        var e = t.parent();
        e && t.css("left", (e.width() - t.outerWidth()) / 2)
    }, e.vcenter = function(t) {
        var e = t.parent();
        e && t.css("top", (e.height() - t.outerHeight()) / 2)
    }, e.center = function(t) {
        var e = t.parent();
        if (e) {
            var n = e.width(), i = e.height(), s = t.outerWidth(), o = t.outerHeight();
            t.css({left: (n - s) / 2,top: (i - o) / 2})
        }
    }, e.sync(), $(t).on("resize", e.sync), t.Placement = e
}(window), 


SL.pointer = {
    down: !1,downTimeout: -1,
    init: function() {
        $(document).on("mousedown", this.onMouseDown.bind(this)), $(document).on("mouseleave", this.onMouseLeave.bind(this)), $(document).on("mouseup", this.onMouseUp.bind(this))
    },isDown: function() {
        return this.down
    },onMouseDown: function() {
        clearTimeout(this.downTimeout), this.down = !0, this.downTimeout = setTimeout(function() {
            this.down = !1
        }.bind(this), 3e4)
    },onMouseLeave: function() {
        clearTimeout(this.downTimeout), this.down = !1
    },onMouseUp: function() {
        clearTimeout(this.downTimeout), this.down = !1
    }},
    SL.routes = {PRICING: "/pricing",SIGN_IN: "/users/sign_in",SIGN_OUT: "/users/sign_out",SUBSCRIPTIONS_NEW: "/account/upgrade",SUBSCRIPTIONS_EDIT_CARD: "/account/update_billing",SUBSCRIPTIONS_EDIT_PERIOD: "/account/update_billing_period",USER: function(t) {
        return "/" + t
    },USER_EDIT: "/users/edit",DECK: function(t, e) {
        return "/" + t + "/" + e
    },DECK_NEW: function(t) {
        return "/" + t + "/new"
    },DECK_EDIT: function(t, e) {
        return "/" + t + "/" + e + "/edit"
    },DECK_EMBED: function(t, e) {
        return "/" + t + "/" + e + "/embed"
    },DECK_LIVE: function(t, e) {
        return "/" + t + "/" + e + "/live"
    },THEME_EDITOR: "/themes",BILLING_DETAILS: "/account/billing"},
    SL.settings = {STORAGE_KEY: "slides-settings",STORAGE_VERSION: 1,EDITOR_AUTO_HIDE: "editorAutoHide",EDITOR_AUTO_SAVE: "editorAutoSave",
    init: function() {
        this.settings = {version: this.STORAGE_VERSION}, this.changed = new signals.Signal, this.restore()
    },setDefaults: function() {
        "undefined" == typeof this.settings[this.EDITOR_AUTO_HIDE] && (this.settings[this.EDITOR_AUTO_HIDE] = !1), "undefined" == typeof this.settings[this.EDITOR_AUTO_SAVE] && (this.settings[this.EDITOR_AUTO_SAVE] = !0)
    },setValue: function(t, e) {
        "object" == typeof t ? $.extend(this.settings, t) : this.settings[t] = e, this.save(), this.changed.dispatch([t])
    },getValue: function(t) {
        return this.settings[t]
    },removeValue: function(t) {
        "object" == typeof t && t.length ? t.forEach(function(t) {
            delete this.settings[t]
        }.bind(this)) : delete this.settings[t], this.save(), this.changed.dispatch([t])
    },restore: function() {
        if (Modernizr.localstorage) {
            var t = localStorage.getItem(this.STORAGE_KEY);
            if (t) {
                var e = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
                e && e.version === this.STORAGE_VERSION ? (this.settings = e, this.setDefaults(), this.changed.dispatch()) : (this.setDefaults(), this.save())
            }
        }
        this.setDefaults()
    },save: function() {
        Modernizr.localstorage && localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings))
    }
}, 
SL.templates = {
    NEW_DECK_TEMPLATE: {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 250px;">', '<div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">', "<h1>Title Text</h1>", "</div>", "</div>", "</section>"].join("")},
    DEFAULT_TEMPLATES_DUPLICATE_INDEX: 1,DEFAULT_TEMPLATES: 
    [{label: "Blank",html: ""}, {label: "Duplicate",html: ""}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 270px;">', '<div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">', "<h1>Title Text</h1>", "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px;">', '<div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">', "<h1>Title Text</h1>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 255px;" data-layout-method="belowPreviousBlock">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle">', "<h2>Subtitle</h2>", "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 264px;" data-layout-method="belowPreviousBlock">', '<div class="sl-block-content">', "<ul>", "<li>Bullet One</li>", "<li>Bullet Two</li>", "<li>Bullet Three</li>", "</ul>", "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 49px; top: 106px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 49px; top: 200px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis." style="text-align: left;">', "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis.</p>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 499px; top: 106px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 410px; left: 499px; top: 200px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis." style="text-align: left;">', "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna odio, aliquam vulputate faucibus id, elementum lobortis felis. Mauris urna dolor, placerat ac sagittis quis.</p>", "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 900px; left: 30px; top: 58px; height: auto;">', '<div class="sl-block-content" data-placeholder-tag="h1" style="font-size: 200%; text-align: left;">', "<h1>One<br>Two<br>Three</h1>", "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 79px; top: 50px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="image" style="width: 700px; height: 475px; left: 129px; top: 144px;">', '<div class="sl-block-content">', '<div class="editing-ui sl-block-overlay sl-block-placeholder"></div>', "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="text" style="width: 430px; left: 23px; top: 87px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">', "<h2>Title Text</h2>", "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 430px; left: 23px; top: 161px;" data-layout-method="belowPreviousBlock">', '<div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec metus justo. Aliquam erat volutpat." style="z-index: 13; text-align: left;">', "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec metus justo. Aliquam erat volutpat.</p>", "</div>", "</div>", '<div class="sl-block" data-block-type="image" style="width: 454px; height: 641px; left: 479px; top: 29px;">', '<div class="sl-block-content">', '<div class="editing-ui sl-block-overlay sl-block-placeholder"></div>', "</div>", "</div>", "</section>"].join("")}, 
    {html: ["<section>", '<div class="sl-block" data-block-type="image" style="width: 700px; height: 475px; left: 130px; top: 65px;">', '<div class="sl-block-content">', '<div class="editing-ui sl-block-overlay sl-block-placeholder"></div>', "</div>", "</div>", '<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 575px;">', '<div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">', "<h2>Title Text</h2>", "</div>", "</div>", "</section>"].join("")}
    ],
    LAYOUT_METHODS: {belowPreviousBlock: function(t, e) {
            var n = e.prev().get(0);
            n && e.css("top", n.offsetTop + n.offsetHeight)
        }
    },getNewDeckTemplate: function() {
        return new SL.models.Template(SL.templates.NEW_DECK_TEMPLATE)
    },getDefaultTemplates: function() {
        return new SL.models.Collection(SL.templates.DEFAULT_TEMPLATES, SL.models.Template)
    },
    userTemplatesLoaded: !1,userTemplatesLoading: !1,userTemplatesCallbacks: [],
    getUserTemplates: function(t) {
        t = t || function() {
        }, 
        SL.templates.userTemplatesLoading === !1 && SL.templates.userTemplatesLoaded === !1 ? (
        SL.templates.userTemplatesLoading = !0, SL.templates.userTemplatesCallbacks.push(t), 
            $.ajax({type: "GET",url: SL.config.AJAX_SLIDE_TEMPLATES_LIST,context: this
            }).
            done(function(t) {
               SL.templates.userTemplates = new SL.models.Collection(t.results, SL.models.Template), 
               SL.templates.userTemplatesLoaded = !0, 
               SL.templates.userTemplatesLoading = !1, 
               SL.templates.userTemplatesCallbacks.forEach(function(t) {
                t.call(null, SL.templates.userTemplates)}), 
               SL.templates.userTemplatesCallbacks.length = 0
            }).
            fail(function() {
               SL.templates.userTemplatesLoading = !1, 
               SL.notify(SL.locale.get("TEMPLATE_LOAD_ERROR"), "negative")
            })
        ) : SL.templates.userTemplatesLoading ? SL.templates.userTemplatesCallbacks.push(t) : t.call(null, SL.templates.userTemplates)
    },
    teamTemplatesLoaded: !1,teamTemplatesLoading: !1,teamTemplatesCallbacks: [],
    getTeamTemplates: function(t) {
        SL.current_user.isEnterprise() && (t = t || function() {
        }, SL.templates.teamTemplatesLoading === !1 && SL.templates.teamTemplatesLoaded === !1 ? (SL.templates.teamTemplatesLoading = !0, SL.templates.teamTemplatesCallbacks.push(t), 
            $.ajax({type: "GET",url: SL.config.AJAX_TEAM_SLIDE_TEMPLATES_LIST,context: this}).
            done(function(t) {
            SL.templates.teamTemplates = new SL.models.Collection(t.results, SL.models.Template), SL.templates.teamTemplatesLoaded = !0, SL.templates.teamTemplatesLoading = !1, SL.templates.teamTemplatesCallbacks.forEach(function(t) {
                t.call(null, SL.templates.teamTemplates)
            }), SL.templates.teamTemplatesCallbacks.length = 0
            }).fail(function() {
            SL.templates.teamTemplatesLoading = !1, SL.notify(SL.locale.get("TEMPLATE_LOAD_ERROR"), "negative")
        })) : SL.templates.teamTemplatesLoading ? SL.templates.teamTemplatesCallbacks.push(t) : t.call(null, SL.templates.teamTemplates))
    },layoutTemplate: function(t, e) {
        t.find(".sl-block").each(function(n, i) {
            i = $(i);
            var s = i.attr("data-layout-method");
            s && "function" == typeof SL.templates.LAYOUT_METHODS[s] && (e || i.removeAttr("data-layout-method"), SL.templates.LAYOUT_METHODS[s](t, i))
        })
    },templatize: function(t, e) {
        t = $(t), e = $.extend({placeholderText: !1,zIndex: !0}, e);
        var n = SL.editor.controllers.Serialize.getSlideAsString(t, {templatize: !0,inner: !0}), i = $("<section>" + n + "</section>");
        return i.children().each(function(t, n) {
            n = $(n), n.css({"min-width": "","min-height": ""});
            var i = n.find(".sl-block-content");
            if (e.placeholderText && "text" === n.attr("data-block-type") && 1 === i.children().length) {
                var s = $(i.children()[0]);
                s.is("h1, h2") ? (s.html("Title Text"), i.attr("data-placeholder-text", "Title Text")) : s.is("p") && i.attr("data-placeholder-text", s.text().trim())
            }
            e.zIndex === !1 && i.css("z-index", "")
        }), ["class", "data-autoslide", "data-transition", "data-transition-speed", "data-background", "data-background-color", "data-background-image", "data-background-size"].forEach(function(e) {
            t.attr(e) && i.attr(e, t.attr(e))
        }), i.removeClass("past present future"), i.prop("outerHTML").trim()
    }
}, 

SL.util.svg = {NAMESPACE: "http://www.w3.org/2000/svg",
   SYMBOLS: {
    happy: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM16 18.711c3.623 0 7.070-0.963 10-2.654-0.455 5.576-4.785 9.942-10 9.942-5.215 0-9.544-4.371-10-9.947 2.93 1.691 6.377 2.658 10 2.658zM8 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3zM20 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3z"></path>',smiley: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM22.003 19.602l2.573 1.544c-1.749 2.908-4.935 4.855-8.576 4.855s-6.827-1.946-8.576-4.855l2.573-1.544c1.224 2.036 3.454 3.398 6.003 3.398s4.779-1.362 6.003-3.398z"></path>',wondering: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM23.304 18.801l0.703 2.399-13.656 4-0.703-2.399zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',sad: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM9.997 24.398l-2.573-1.544c1.749-2.908 4.935-4.855 8.576-4.855 3.641 0 6.827 1.946 8.576 4.855l-2.573 1.544c-1.224-2.036-3.454-3.398-6.003-3.398-2.549 0-4.779 1.362-6.003 3.398z"></path>',"checkmark-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM13.52 23.383l-7.362-7.363 2.828-2.828 4.533 4.535 9.617-9.617 2.828 2.828-12.444 12.445z"></path>',"plus-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM24 18h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"></path>',"minus-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM24 18h-16v-4h16v4z"></path>',"x-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM23.914 21.086l-2.828 2.828-5.086-5.086-5.086 5.086-2.828-2.828 5.086-5.086-5.086-5.086 2.828-2.828 5.086 5.086 5.086-5.086 2.828 2.828-5.086 5.086 5.086 5.086z"></path>',
    denied: '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM16 4c2.59 0 4.973 0.844 6.934 2.242l-16.696 16.688c-1.398-1.961-2.238-4.344-2.238-6.93 0-6.617 5.383-12 12-12zM16 28c-2.59 0-4.973-0.844-6.934-2.242l16.696-16.688c1.398 1.961 2.238 4.344 2.238 6.93 0 6.617-5.383 12-12 12z"></path>',clock: '<path d="M16 4c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zM16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16v0zM21.422 18.578l-3.422-3.426v-7.152h-4.023v7.992c0 0.602 0.277 1.121 0.695 1.492l3.922 3.922 2.828-2.828z"></path>',"heart-stroke": '<path d="M23.113 6c2.457 0 4.492 1.82 4.836 4.188l-11.945 13.718-11.953-13.718c0.344-2.368 2.379-4.188 4.836-4.188 2.016 0 3.855 2.164 3.855 2.164l3.258 3.461 3.258-3.461c0 0 1.84-2.164 3.855-2.164zM23.113 2c-2.984 0-5.5 1.578-7.113 3.844-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891v0z"></path>',"heart-fill": '<path d="M16 5.844c-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891-2.984 0-5.5 1.578-7.113 3.844z"></path>',home: '<path d="M16 0l-16 16h4v16h24v-16h4l-16-16zM24 28h-6v-6h-4v6h-6v-14.344l8-5.656 8 5.656v14.344z"></path>',pin: '<path d="M17.070 2.93c-3.906-3.906-10.234-3.906-14.141 0-3.906 3.904-3.906 10.238 0 14.14 0.001 0 7.071 6.93 7.071 14.93 0-8 7.070-14.93 7.070-14.93 3.907-3.902 3.907-10.236 0-14.14zM10 14c-2.211 0-4-1.789-4-4s1.789-4 4-4 4 1.789 4 4-1.789 4-4 4z"></path>',
    user: '<path d="M12 16c-6.625 0-12 5.375-12 12 0 2.211 1.789 4 4 4h16c2.211 0 4-1.789 4-4 0-6.625-5.375-12-12-12zM6 6c0-3.314 2.686-6 6-6s6 2.686 6 6c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6z"></path>',
    mail: '<path d="M15.996 15.457l16.004-7.539v-3.918h-32v3.906zM16.004 19.879l-16.004-7.559v15.68h32v-15.656z"></path>',star: '<path d="M22.137 19.625l9.863-7.625h-12l-4-12-4 12h-12l9.875 7.594-3.875 12.406 10.016-7.68 9.992 7.68z"></path>',bolt: '<path d="M32 0l-24 16 6 4-14 12 24-12-6-4z"></path>',
    sun: '<path d="M16.001 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 7.999-3.582 7.999-8s-3.581-8-7.999-8v0zM14 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM4 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM2 14c1.105 0 2 0.895 2 2 0 1.107-0.895 2-2 2s-2-0.893-2-2c0-1.105 0.895-2 2-2zM4 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM14 30c0-1.109 0.895-2 2-2 1.108 0 2 0.891 2 2 0 1.102-0.892 2-2 2-1.105 0-2-0.898-2-2zM24 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM30 18c-1.104 0-2-0.896-2-2 0-1.107 0.896-2 2-2s2 0.893 2 2c0 1.104-0.896 2-2 2zM24 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',moon: '<path d="M24.633 22.184c-8.188 0-14.82-6.637-14.82-14.82 0-2.695 0.773-5.188 2.031-7.363-6.824 1.968-11.844 8.187-11.844 15.644 0 9.031 7.32 16.355 16.352 16.355 7.457 0 13.68-5.023 15.648-11.844-2.18 1.254-4.672 2.028-7.367 2.028z"></path>',cloud: '<path d="M24 10c-0.379 0-0.738 0.061-1.102 0.111-1.394-2.465-3.972-4.111-6.898-4.111-2.988 0-5.566 1.666-6.941 4.1-0.352-0.047-0.704-0.1-1.059-0.1-4.41 0-8 3.588-8 8 0 4.414 3.59 8 8 8h16c4.41 0 8-3.586 8-8 0-4.412-3.59-8-8-8zM24 22h-16c-2.207 0-4-1.797-4-4 0-2.193 1.941-3.885 4.004-3.945 0.008 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.929 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.793-4 4-4s4 1.795 4 4c0 2.203-1.793 4-4 4z"></path>',
    rain: '<path d="M23.998 6c-0.375 0-0.733 0.061-1.103 0.111-1.389-2.465-3.969-4.111-6.895-4.111-2.987 0-5.565 1.666-6.94 4.1-0.353-0.047-0.705-0.1-1.060-0.1-4.41 0-8 3.588-8 8s3.59 8 8 8h15.998c4.414 0 8-3.588 8-8s-3.586-8-8-8zM23.998 18h-15.998c-2.207 0-4-1.795-4-4 0-2.193 1.941-3.885 4.004-3.945 0.009 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.928 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.795-4 3.998-4 2.211 0 4 1.795 4 4s-1.789 4-4 4zM3.281 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.438-2.719 5.438-2.719-1.969 4.688-2.719 5.438zM11.285 29.438c-0.75 0.75-1.965 0.75-2.719 0-0.75-0.75-0.75-1.969 0-2.719 0.754-0.75 5.438-2.719 5.438-2.719s-1.965 4.688-2.719 5.438zM19.28 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.437-2.719 5.437-2.719-1.968 4.688-2.718 5.438z"></path>',
    umbrella: '<path d="M16 0c-8.82 0-16 7.178-16 16h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5v10c0 1.102-0.895 2-2 2-1.102 0-2-0.898-2-2h-4c0 3.309 2.695 6 6 6 3.312 0 6-2.691 6-6v-10c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.498 0.674 1.498 1.5h4c0-0.826 0.68-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-8.822-7.172-16-15.998-16z"></path>',
    eye: '<path d="M16 4c-8.836 0-16 11.844-16 11.844s7.164 12.156 16 12.156 16-12.156 16-12.156-7.164-11.844-16-11.844zM16 24c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4z"></path>',ribbon: '<path d="M8 20c-1.41 0-2.742-0.289-4-0.736v12.736l4-4 4 4v-12.736c-1.258 0.447-2.59 0.736-4 0.736zM0 8c0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8-4.418 0-8-3.582-8-8z"></path>',iphone: '<path d="M16 0h-8c-4.418 0-8 3.582-8 8v16c0 4.418 3.582 8 8 8h8c4.418 0 8-3.582 8-8v-16c0-4.418-3.582-8-8-8zM12 30.062c-1.139 0-2.062-0.922-2.062-2.062s0.924-2.062 2.062-2.062 2.062 0.922 2.062 2.062-0.923 2.062-2.062 2.062zM20 24h-16v-16c0-2.203 1.795-4 4-4h8c2.203 0 4 1.797 4 4v16z"></path>',camera: '<path d="M16 20c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4zM28 8l-3.289-6.643c-0.27-0.789-1.016-1.357-1.899-1.357h-5.492c-0.893 0-1.646 0.582-1.904 1.385l-3.412 6.615h-8.004c-2.209 0-4 1.791-4 4v20h32v-20c0-2.209-1.789-4-4-4zM6 16c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM20 28c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>',cog: '<path d="M32 17.969v-4l-4.781-1.992c-0.133-0.375-0.273-0.738-0.445-1.094l1.93-4.805-2.829-2.828-4.762 1.961c-0.363-0.176-0.734-0.324-1.117-0.461l-2.027-4.75h-4l-1.977 4.734c-0.398 0.141-0.781 0.289-1.16 0.469l-4.754-1.91-2.828 2.828 1.938 4.711c-0.188 0.387-0.34 0.781-0.485 1.188l-4.703 2.011v4l4.707 1.961c0.145 0.406 0.301 0.801 0.488 1.188l-1.902 4.742 2.828 2.828 4.723-1.945c0.379 0.18 0.766 0.324 1.164 0.461l2.023 4.734h4l1.98-4.758c0.379-0.141 0.754-0.289 1.113-0.461l4.797 1.922 2.828-2.828-1.969-4.773c0.168-0.359 0.305-0.723 0.438-1.094l4.782-2.039zM15.969 22c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"></path>',
    lock: '<path d="M14 0c-5.508 0-9.996 4.484-9.996 10v2h-4.004v14c0 3.309 2.691 6 6 6h12c3.309 0 6-2.691 6-6v-16c0-5.516-4.488-10-10-10zM11.996 24c-1.101 0-1.996-0.895-1.996-2s0.895-2 1.996-2c1.105 0 2 0.895 2 2s-0.894 2-2 2zM20 12h-11.996v-2c0-3.309 2.691-6 5.996-6 3.309 0 6 2.691 6 6v2z"></path>',unlock: '<path d="M14.004 0c-5.516 0-9.996 4.484-9.996 10h3.996c0-3.309 2.688-6 6-6 3.305 0 5.996 2.691 5.996 6v2h-20v14c0 3.309 2.695 6 6 6h12c3.305 0 6-2.691 6-6v-16c0-5.516-4.488-10-9.996-10zM12 24c-1.102 0-2-0.895-2-2s0.898-2 2-2c1.109 0 2 0.895 2 2s-0.891 2-2 2z"></path>',fork: '<path d="M20 0v3.875c0 1.602-0.625 3.109-1.754 4.238l-11.316 11.254c-1.789 1.785-2.774 4.129-2.883 6.633h-4.047l6 6 6-6h-3.957c0.105-1.438 0.684-2.773 1.711-3.805l11.316-11.25c1.891-1.89 2.93-4.398 2.93-7.070v-3.875h-4zM23.953 26c-0.109-2.504-1.098-4.848-2.887-6.641l-2.23-2.215-2.836 2.821 2.242 2.23c1.031 1.027 1.609 2.367 1.715 3.805h-3.957l6 6 6-6h-4.047z"></path>',paperclip: '<path d="M17.293 15.292l-2.829-2.829-4 4c-1.953 1.953-1.953 5.119 0 7.071 1.953 1.953 5.118 1.953 7.071 0l10.122-9.879c3.123-3.124 3.123-8.188 0-11.313-3.125-3.124-8.19-3.124-11.313 0l-11.121 10.88c-4.296 4.295-4.296 11.26 0 15.557 4.296 4.296 11.261 4.296 15.556 0l6-6-2.829-2.829-5.999 6c-2.733 2.732-7.166 2.732-9.9 0-2.733-2.732-2.733-7.166 0-9.899l11.121-10.881c1.562-1.562 4.095-1.562 5.656 0 1.563 1.563 1.563 4.097 0 5.657l-10.121 9.879c-0.391 0.391-1.023 0.391-1.414 0s-0.391-1.023 0-1.414l4-4z"></path>',
    facebook: '<path d="M17.996 32h-5.996v-16h-4v-5.514l4-0.002-0.007-3.248c0-4.498 1.22-7.236 6.519-7.236h4.412v5.515h-2.757c-2.064 0-2.163 0.771-2.163 2.209l-0.008 2.76h4.959l-0.584 5.514-4.37 0.002-0.004 16z"></path>',twitter: '<path d="M32 6.076c-1.177 0.522-2.443 0.875-3.771 1.034 1.355-0.813 2.396-2.099 2.887-3.632-1.269 0.752-2.674 1.299-4.169 1.593-1.198-1.276-2.904-2.073-4.792-2.073-3.626 0-6.565 2.939-6.565 6.565 0 0.515 0.058 1.016 0.17 1.496-5.456-0.274-10.294-2.888-13.532-6.86-0.565 0.97-0.889 2.097-0.889 3.301 0 2.278 1.159 4.287 2.921 5.465-1.076-0.034-2.088-0.329-2.974-0.821-0.001 0.027-0.001 0.055-0.001 0.083 0 3.181 2.263 5.834 5.266 6.437-0.551 0.15-1.131 0.23-1.73 0.23-0.423 0-0.834-0.041-1.235-0.118 0.835 2.608 3.26 4.506 6.133 4.559-2.247 1.761-5.078 2.81-8.154 2.81-0.53 0-1.052-0.031-1.566-0.092 2.905 1.863 6.356 2.95 10.064 2.95 12.076 0 18.679-10.004 18.679-18.68 0-0.285-0.006-0.568-0.019-0.849 1.283-0.926 2.396-2.082 3.276-3.398z"></path>',earth: '<path d="M27.314 4.686c3.022 3.022 4.686 7.040 4.686 11.314s-1.664 8.292-4.686 11.314c-3.022 3.022-7.040 4.686-11.314 4.686s-8.292-1.664-11.314-4.686c-3.022-3.022-4.686-7.040-4.686-11.314s1.664-8.292 4.686-11.314c3.022-3.022 7.040-4.686 11.314-4.686s8.292 1.664 11.314 4.686zM25.899 25.9c1.971-1.971 3.281-4.425 3.821-7.096-0.421 0.62-0.824 0.85-1.073-0.538-0.257-2.262-2.335-0.817-3.641-1.621-1.375 0.927-4.466-1.802-3.941 1.276 0.81 1.388 4.375-1.858 2.598 1.079-1.134 2.050-4.145 6.592-3.753 8.946 0.049 3.43-3.504 0.715-4.729-0.422-0.824-2.279-0.281-6.262-2.434-7.378-2.338-0.102-4.344-0.314-5.25-2.927-0.545-1.87 0.58-4.653 2.584-5.083 2.933-1.843 3.98 2.158 6.731 2.232 0.854-0.894 3.182-1.178 3.375-2.18-1.805-0.318 2.29-1.517-0.173-2.199-1.358 0.16-2.234 1.409-1.512 2.467-2.632 0.614-2.717-3.809-5.247-2.414-0.064 2.206-4.132 0.715-1.407 0.268 0.936-0.409-1.527-1.594-0.196-1.379 0.654-0.036 2.854-0.807 2.259-1.325 1.225-0.761 2.255 1.822 3.454-0.059 0.866-1.446-0.363-1.713-1.448-0.98-0.612-0.685 1.080-2.165 2.573-2.804 0.497-0.213 0.973-0.329 1.336-0.296 0.752 0.868 2.142 1.019 2.215-0.104-1.862-0.892-3.915-1.363-6.040-1.363-3.051 0-5.952 0.969-8.353 2.762 0.645 0.296 1.012 0.664 0.39 1.134-0.483 1.439-2.443 3.371-4.163 3.098-0.893 1.54-1.482 3.238-1.733 5.017 1.441 0.477 1.773 1.42 1.464 1.736-0.734 0.64-1.185 1.548-1.418 2.541 0.469 2.87 1.818 5.515 3.915 7.612 2.644 2.644 6.16 4.1 9.899 4.1s7.255-1.456 9.899-4.1z"></path>',
    globe: '<path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z"></path>',"thin-arrow-up": '<path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>',"thin-arrow-down": '<path d="M4.586 19.414l10 10c0.781 0.781 2.047 0.781 2.828 0l10-10c0.781-0.781 0.781-2.047 0-2.828s-2.047-0.781-2.828 0l-6.586 6.586v-19.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v19.172l-6.586-6.586c-0.391-0.39-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586c-0.781 0.781-0.781 2.047 0 2.828z"></path>',"thin-arrow-up-left": '<path d="M4 18c0 1.105 0.895 2 2 2s2-0.895 2-2v-7.172l16.586 16.586c0.781 0.781 2.047 0.781 2.828 0 0.391-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414l-16.586-16.586h7.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-14v14z"></path>',"thin-arrow-up-right": '<path d="M26.001 4c-0 0-0.001 0-0.001 0h-11.999c-1.105 0-2 0.895-2 2s0.895 2 2 2h7.172l-16.586 16.586c-0.781 0.781-0.781 2.047 0 2.828 0.391 0.391 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586l16.586-16.586v7.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-14h-1.999z"></path>',"thin-arrow-left": '<path d="M12.586 4.586l-10 10c-0.781 0.781-0.781 2.047 0 2.828l10 10c0.781 0.781 2.047 0.781 2.828 0s0.781-2.047 0-2.828l-6.586-6.586h19.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-19.172l6.586-6.586c0.39-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414c-0.781-0.781-2.047-0.781-2.828 0z"></path>',"thin-arrow-right": '<path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>',"thin-arrow-down-left": '<path d="M18 28c1.105 0 2-0.895 2-2s-0.895-2-2-2h-7.172l16.586-16.586c0.781-0.781 0.781-2.047 0-2.828-0.391-0.391-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586l-16.586 16.586v-7.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v14h14z"></path>',"thin-arrow-down-right": '<path d="M28 14c0-1.105-0.895-2-2-2s-2 0.895-2 2v7.172l-16.586-16.586c-0.781-0.781-2.047-0.781-2.828 0-0.391 0.391-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414l16.586 16.586h-7.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h14v-14z"></path>'
    },boundingBox: function(t) {
        var e;
        if ($(t).parents("body").length)
            e = t.getBBox();
        else {
            var n = t.parentNode, i = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
            i.setAttribute("width", "0"), i.setAttribute("height", "0"), i.setAttribute("style", "visibility: hidden; position: absolute; left: 0; top: 0;"), i.appendChild(t), document.body.appendChild(i), e = t.getBBox(), n ? n.appendChild(t) : i.removeChild(t), document.body.removeChild(i)
        }
        return e
    },pointsToPolygon: function(t) {
        for (var e = []; t.length >= 2; )
            e.push(t.shift() + "," + t.shift());
        return e.join(" ")
    },rect: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "rect");
        return n.setAttribute("width", t), n.setAttribute("height", e), n
    },ellipse: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "ellipse");
        return n.setAttribute("rx", t / 2), n.setAttribute("ry", e / 2), n.setAttribute("cx", t / 2), n.setAttribute("cy", e / 2), n
    },triangleUp: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([t / 2, 0, t, e, 0, e])), n
    },triangleDown: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([0, 0, t, 0, t / 2, e])), n
    },triangleLeft: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([0, e / 2, t, 0, t, e])), n
    },triangleRight: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([t, e / 2, 0, e, 0, 0])), n
    },arrowUp: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([.5 * t, 0, t, .5 * e, .7 * t, .5 * e, .7 * t, e, .3 * t, e, .3 * t, .5 * e, 0, .5 * e, .5 * t, 0])), n
    },arrowDown: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([.5 * t, e, t, .5 * e, .7 * t, .5 * e, .7 * t, 0, .3 * t, 0, .3 * t, .5 * e, 0, .5 * e, .5 * t, e])), n
    },arrowLeft: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([t, .3 * e, .5 * t, .3 * e, .5 * t, 0, 0, .5 * e, .5 * t, e, .5 * t, .7 * e, t, .7 * e, t, .3 * e])), n
    },arrowRight: function(t, e) {
        var n = document.createElementNS(SL.util.svg.NAMESPACE, "polygon");
        return n.setAttribute("points", SL.util.svg.pointsToPolygon([0, .3 * e, .5 * t, .3 * e, .5 * t, 0, t, .5 * e, .5 * t, e, .5 * t, .7 * e, 0, .7 * e])), n
    },polygon: function(t, e, n) {
        var i = document.createElementNS(SL.util.svg.NAMESPACE, "polygon"), s = [];
        if (3 === n)
            s = [t / 2, 0, t, e, 0, e];
        else if (n > 3)
            for (var o = t / 2, r = e / 2, a = 0; n > a; a++) {
                var l = o + o * Math.cos(2 * Math.PI * a / n), c = r + r * Math.sin(2 * Math.PI * a / n);
                l = Math.round(10 * l) / 10, c = Math.round(10 * c) / 10, s.push(l), s.push(c)
            }
        return i.setAttribute("points", SL.util.svg.pointsToPolygon(s)), i
    },symbol: function(t) {
        var e = document.createElementNS(SL.util.svg.NAMESPACE, "g"), n = SL.util.svg.SYMBOLS[t];
        return n && (e.innerSVG = SL.util.svg.SYMBOLS[t]), e
    }
}, 


SL.warnings = {
    STORAGE_KEY: "slides-last-warning-id",MESSAGE_ID: 23,
    init: function() {
        this.showMessage()
    },showMessage: function() {
        if (this.hasMessage() && !this.hasExpired() && SL.util.user.isLoggedIn() && Modernizr.localstorage) {
            var t = parseInt(localStorage.getItem(this.STORAGE_KEY), 10) || 0;
            if (t < this.MESSAGE_ID) {
                var e = SL.notify(this.MESSAGE_TEXT, {autoHide: !1});
                e.destroyed.add(this.hideMessage.bind(this))
            }
        }
    },hideMessage: function() {
        Modernizr.localstorage && localStorage.setItem(this.STORAGE_KEY, this.MESSAGE_ID)
    },hasMessage: function() {
        return !!this.MESSAGE_TEXT
    },hasExpired: function() {
        return this.MESSAGE_EXPIRY ? moment().diff(moment(this.MESSAGE_EXPIRY)) > 0 : !1
    }
}, 


// For file upload!!
SL("helpers").FileUploader = Class.extend({
    init: function(t) {
        if (this.options = $.extend({external: !1,method: "POST"}, t), "undefined" == typeof this.options.file || "undefined" == typeof this.options.service)
            throw "File and service must be defined for FileUploader task.";
        this.timeout = -1, this.uploading = !1, this.onUploadSuccess = this.onUploadSuccess.bind(this), this.onUploadProgress = this.onUploadProgress.bind(this), this.onUploadError = this.onUploadError.bind(this), this.failed = new signals.Signal, this.succeeded = new signals.Signal, this.progressed = new signals.Signal
    },upload: function() {
        this.uploading = !0, clearTimeout(this.timeout), "number" == typeof this.options.timeout && (this.timeout = setTimeout(this.onUploadError, this.options.timeout));
        var t = new FormData;
        this.options.filename ? t.append("file", this.options.file, this.options.filename) : t.append("file", this.options.file);
        var e = this.options.csrf || document.querySelector('meta[name="csrf-token"]');
        e && !this.options.external && t.append("authenticity_token", e.getAttribute("content")), this.xhr = new XMLHttpRequest, this.xhr.onload = function() {
            if (this.options.external === !0)
                this.onUploadSuccess();
            else {
                try {
                    var t = JSON.parse(this.xhr.responseText)
                } catch (e) {
                    return this.onUploadError()
                }
                this.onUploadSuccess(t)
            }
        }.bind(this), this.xhr.onerror = this.onUploadError, this.xhr.upload.onprogress = this.onUploadProgress, this.xhr.open(this.options.method, this.options.service, !0), this.xhr.send(t)
    },isUploading: function() {
        return this.uploading
    },onUploadSuccess: function(t) {
        clearTimeout(this.timeout), this.uploading = !1, this.succeeded.dispatch(t)
    },onUploadProgress: function(t) {
        t.lengthComputable && this.progressed.dispatch(t.loaded / t.total)
    },onUploadError: function() {
        clearTimeout(this.timeout), this.uploading = !1, this.failed.dispatch()
    },destroy: function() {
        clearTimeout(this.timeout);
        var t = function() {
        };
        this.xhr.onload = t, this.xhr.onerror = t, this.xhr.upload.onprogress = t, this.xhr.abort(), this.succeeded.dispose(), this.progressed.dispose(), this.failed.dispose()
    }
}), 

SL.helpers.Fullscreen = {
    enter: function(t) {
        t = t || document.body;
        var e = t.requestFullScreen || t.webkitRequestFullscreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen;
        e && e.apply(t)
    },exit: function() {
        var t = document.exitFullscreen || document.msCancelFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
        t && t.apply(document)
    },toggle: function() {
        SL.helpers.Fullscreen.isActive() ? SL.helpers.Fullscreen.exit() : SL.helpers.Fullscreen.enter()
    },isEnabled: function() {
        return !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled)
    },isActive: function() {
        return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)
    }
}, 

SL("helpers").ImageUploader = Class.extend({
    init: function(t) {
        this.options = $.extend({service: SL.config.AJAX_IMAGE_UPLOAD,timeout: 9e4}, t), this.onUploadSuccess = this.onUploadSuccess.bind(this), this.onUploadProgress = this.onUploadProgress.bind(this), this.onUploadError = this.onUploadError.bind(this), this.progressed = new signals.Signal, this.succeeded = new signals.Signal, this.failed = new signals.Signal
    },upload: function(t, e) {
        return t && t.type.match(/image.*/) ? "number" == typeof t.size && t.size / 1024 > SL.config.MAX_IMAGE_UPLOAD_SIZE.maxsize ? void SL.notify("No more than " + Math.round(MAX_IMAGE_UPLOAD_SIZE / 1e3) + "mb please", "negative") : (this.fileUploader && this.fileUploader.destroy(), this.fileUploader = new SL.helpers.FileUploader({file: t,filename: e || this.options.filename,service: this.options.service,timeout: this.options.timeout}), this.fileUploader.succeeded.add(this.onUploadSuccess), this.fileUploader.progressed.add(this.onUploadProgress), this.fileUploader.failed.add(this.onUploadError), void this.fileUploader.upload()) : void SL.notify("Only image files, please")
    },isUploading: function() {
        return !(!this.fileUploader || !this.fileUploader.isUploading())
    },onUploadSuccess: function(t) {
        t && "string" == typeof t.url ? this.succeeded.dispatch(t.url) : this.failed.dispatch(), this.fileUploader.destroy(), this.fileUploader = null
    },onUploadProgress: function(t) {
        this.progressed.dispatch(t)
    },onUploadError: function() {
        this.failed.dispatch(), this.fileUploader.destroy(), this.fileUploader = null
    },destroy: function() {
        this.succeeded.dispose(), this.progressed.dispose(), this.failed.dispose(), this.fileUploader && this.fileUploader.destroy()
    }
}), 
SL.helpers.PageLoader = {
    show: function(t) {
        var e = $(".page-loader");
        0 === e.length && (e = $(['<div class="page-loader">', '<div class="page-loader-inner">', '<p class="page-loader-message"></p>', '<div class="page-loader-spinner spinner"></div>', "</div>", "</div>"].join("")).appendTo(document.body)), t && e.find(".page-loader-message").html(t), e.addClass("visible")
    },hide: function() {
        $(".page-loader").removeClass("visible")
    }
}, 
SL("helpers").PollJob = Class.extend({
    init: function(t) {
        this.options = $.extend({interval: 1e3,timeout: Number.MAX_VALUE,retries: Number.MAX_VALUE}, t), this.interval = -1, this.running = !1, this.poll = this.poll.bind(this), this.ended = new signals.Signal, this.polled = new signals.Signal
    },start: function() {
        this.running = !0, this.pollStart = Date.now(), this.pollTimes = 0, clearInterval(this.interval), this.interval = setInterval(this.poll, this.options.interval)
    },stop: function() {
        this.running = !1, clearInterval(this.interval)
    },poll: function() {
        this.pollTimes++, Date.now() - this.pollStart > this.options.timeout || this.pollTimes > this.options.retries ? (this.stop(), this.ended.dispatch()) : this.polled.dispatch()
    }
}), 
SL("helpers").StreamEditor = Class.extend({
    init: function(t) {
        this.options = $.extend({}, t), this.statusChanged = new signals.Signal, this.messageReceived = new signals.Signal, this.socketIsDisconnected = !1, this.debugMode = !!SL.util.getQuery().debug
    },connect: function() {
        var t = SL.config.STREAM_ENGINE_HOST + "/" + SL.config.STREAM_ENGINE_EDITOR_NAMESPACE;
        this.log("socket connected", t), this.socket = io.connect(t), this.socket.on("connect", this.onSocketConnected.bind(this)), this.socket.on("disconnect", this.onSocketDisconnected.bind(this)), this.socket.on("message", this.onSocketMessage.bind(this))
    },log: function() {
        if (this.debugMode && "function" == typeof console.log.apply) {
            var t = ["Stream:"].concat(Array.prototype.slice.call(arguments));
            console.log.apply(console, t)
        }
    },setStatus: function(t) {
        this.status !== t && (this.status = t, this.statusChanged.dispatch(this.status))
    },onSocketMessage: function(t) {
        try {
            var e = JSON.parse(t.data);
            this.messageReceived.dispatch(e)
        } catch (n) {
            this.log("unable to parse streamed socket message as JSON.")
        }
        this.setStatus(SL.helpers.StreamEditor.STATUS_NONE)
    },onSocketConnected: function() {
        this.socket.emit("subscribe", {deck_id: this.options.deckID}), this.socketIsDisconnected === !0 && (this.socketIsDisconnected = !1, this.log("socket connection regained"), this.setStatus(SL.helpers.StreamEditor.STATUS_NONE))
    },onSocketDisconnected: function() {
        this.socketIsDisconnected === !1 && (this.socketIsDisconnected = !0, this.log("socket connection lost"), this.setStatus(SL.helpers.StreamEditor.STATUS_CONNECTION_LOST))
    }
}), 
SL.helpers.StreamEditor.STATUS_NONE = "",
SL.helpers.StreamEditor.STATUS_CONNECTION_LOST = "connection_lost",
SL("helpers").StreamLive = Class.extend({
    init: function(t) {
        this.options = $.extend({reveal: window.Reveal,subscriber: !0,publisher: !1,publisherID: Date.now() + "-" + Math.round(1e6 * Math.random()),deckID: SL.current_deck.get("id")}, t), this.ready = new signals.Signal, this.stateChanged = new signals.Signal, this.statusChanged = new signals.Signal, this.subscribersChanged = new signals.Signal, this.socketIsDisconnected = !1, this.debugMode = !!SL.util.getQuery().debug
    },connect: function() {
        this.options.publisher ? this.setupPublisher() : this.setupSubscriber()
    },setupPublisher: function() {
        this.publish = this.publish.bind(this), this.publishable = !0, this.options.reveal.addEventListener("slidechanged", this.publish), this.options.reveal.addEventListener("fragmentshown", this.publish), this.options.reveal.addEventListener("fragmenthidden", this.publish), this.options.reveal.addEventListener("overviewshown", this.publish), this.options.reveal.addEventListener("overviewhidden", this.publish), this.options.reveal.addEventListener("paused", this.publish), this.options.reveal.addEventListener("resumed", this.publish), $.ajax({url: "/ajax/" + this.options.deckID + "/stream.json",type: "GET",context: this}).done(function(t) {
            this.log("found existing stream"), this.setState(JSON.parse(t.state), !0), this.setupSocket(), this.ready.dispatch()
        }).error(function() {
            this.log("no existing stream, publishing state"), this.publish(function() {
                this.setupSocket(), this.ready.dispatch()
            }.bind(this))
        })
    },setupSubscriber: function() {
        $.ajax({url: "/ajax/" + this.options.deckID + "/stream.json",type: "GET",context: this}).done(function(t) {
            this.log("found existing stream"), this.setStatus(SL.helpers.StreamLive.STATUS_NONE), this.setState(JSON.parse(t.state), !0), this.setupSocket(), this.ready.dispatch()
        }).error(function() {
            this.retryStartTime = Date.now(), this.setStatus(SL.helpers.StreamLive.STATUS_WAITING_FOR_PUBLISHER), this.log("no existing stream, retrying in " + SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL / 1e3 + "s"), setTimeout(this.setupSubscriber.bind(this), SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL)
        })
    },setupSocket: function() {
        if (this.options.subscriber) {
            var t = SL.config.STREAM_ENGINE_HOST + "/" + SL.config.STREAM_ENGINE_LIVE_NAMESPACE;
            this.log("socket connected", t), this.socket = io.connect(t), this.socket.on("connect", this.onSocketConnected.bind(this)), this.socket.on("disconnect", this.onSocketDisconnected.bind(this)), this.socket.on("message", this.onSocketStateMessage.bind(this)), this.socket.on("subscribers", this.onSocketSubscribersMessage.bind(this))
        }
    },publish: function(t, e) {
        if (this.publishable) {
            var n = this.options.reveal.getState();
            n.publisher_id = this.options.publisherID, n = $.extend(n, e), this.log("publish", n.publisher_id), $.ajax({url: "/ajax/" + this.options.deckID + "/stream.json",type: "PUT",data: {state: JSON.stringify(n)},success: t})
        }
    },log: function() {
        if (this.debugMode && "function" == typeof console.log.apply) {
            var t = "Stream (" + (this.options.publisher ? "publisher" : "subscriber") + "):", e = [t].concat(Array.prototype.slice.call(arguments));
            console.log.apply(console, e)
        }
    },setState: function(t, e) {
        this.publishable = !1, e && $(".reveal").addClass("no-transition"), this.options.reveal.setState(t), this.stateChanged.dispatch(t), setTimeout(function() {
            this.publishable = !0, e && $(".reveal").removeClass("no-transition")
        }.bind(this), 1)
    },setStatus: function(t) {
        this.status !== t && (this.status = t, this.statusChanged.dispatch(this.status))
    },getRetryStartTime: function() {
        return this.retryStartTime
    },isPublisher: function() {
        return this.options.publisher
    },onSocketStateMessage: function(t) {
        try {
            var e = JSON.parse(t.data);
            e.publisher_id != this.options.publisherID && (this.log("sync", "from: " + e.publisher_id, "to: " + this.options.publisherID), this.setState(e))
        } catch (n) {
            this.log("unable to parse streamed deck state as JSON.")
        }
        this.setStatus(SL.helpers.StreamLive.STATUS_NONE)
    },onSocketSubscribersMessage: function(t) {
        this.subscribersChanged.dispatch(t.subscribers)
    },onSocketConnected: function() {
        this.socket.emit("subscribe", {deck_id: this.options.deckID,publisher: this.options.publisher}), this.socketIsDisconnected === !0 && (this.socketIsDisconnected = !1, this.log("socket connection regained"), this.setStatus(SL.helpers.StreamLive.STATUS_NONE))
    },onSocketDisconnected: function() {
        this.socketIsDisconnected === !1 && (this.socketIsDisconnected = !0, this.log("socket connection lost"), this.setStatus(SL.helpers.StreamLive.STATUS_CONNECTION_LOST))
    }
}), 
SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL = 2e4,
SL.helpers.StreamLive.STATUS_NONE = "",
SL.helpers.StreamLive.STATUS_CONNECTION_LOST = "connection_lost",
SL.helpers.StreamLive.STATUS_WAITING_FOR_PUBLISHER = "waiting_for_publisher",
// reveal theme control
SL.helpers.ThemeController = {
    paint: function(t, e) {
        e = e || {};
        var n = $(".reveal-viewport");
        if (0 === n.length || "undefined" == typeof window.Reveal)
            return !1;
        if (this.cleanup(), n.addClass("theme-font-" + t.get("font")), n.addClass("theme-color-" + t.get("color")), Reveal.configure($.extend({center: t.get("center"),rolling_links: t.get("rolling_links"),transition: t.get("transition"),backgroundTransition: t.get("background_transition")}, e)), t.get("html")) {
            var i = $("#theme-html-output");
            i.length ? i.html(t.get("html")) : $(".reveal").append('<div id="theme-html-output">' + t.get("html") + "</div>")
        } else
            $("#theme-html-output").remove();
        if (t.get("css")) {
            var s = $("#theme-css-output");
            s.length ? s.html(t.get("css")) : $("head").append('<style id="theme-css-output">' + t.get("css") + "</style>")
        } else
            $("#theme-css-output").remove();
        if (e.js !== !1)
            if (t.get("js")) {
                var o = $("#theme-js-output");
                o.text() !== t.get("js") && (o.remove(), $("body").append('<script id="theme-js-output">' + t.get("js") + "</script>"))
            } else
                $("#theme-js-output").remove();
        SL.util.deck.sortInjectedStyles()
    },cleanup: function() {
        var t = $(".reveal-viewport"), e = $(".reveal");
        t.attr("class", t.attr("class").replace(/theme\-(font|color)\-([a-z0-9-])*/gi, "")), SL.config.THEME_TRANSITIONS.forEach(function(t) {
            e.removeClass(t.id)
        })
    }},
SL("components").DeckSharer = Class.extend({
    DEFAULT_WIDTH: 576,DEFAULT_HEIGHT: 420,
    init: function(t) {
        this.theme = t, this.onLinkOutputMouseDown = this.onLinkOutputMouseDown.bind(this), this.onEmbedOutputMouseDown = this.onEmbedOutputMouseDown.bind(this), this.onStyleChanged = this.onStyleChanged.bind(this), this.onSizeChanged = this.onSizeChanged.bind(this), this.width = this.DEFAULT_WIDTH, this.height = this.DEFAULT_HEIGHT, this.style = "", this.domElement = $("<div>").addClass("decksharer")
    },build: function() {
        this.domElement.empty(), this.domElement.append(['<div class="url">', "<h3>" + SL.locale.get("DECKSHARER_URL_TITLE") + "</h3>", '<input type="text" name="url" readonly="readonly" class="input-field" />', "</div>"].join("")), this.linkOutputElement = this.domElement.find(".url input"), this.linkOutputElement.on("mousedown", this.onLinkOutputMouseDown);
        var t = '<option value="dark" selected>Dark</option><option value="light">Light</option>';
        SL.current_user.isPro() && (t += '<option value="hidden">Hidden</option>'), this.domElement.append(['<div class="embed sl-form">', "<h3>" + SL.locale.get("DECKSHARER_EMBED_TITLE") + "</h3>", '<div class="options">', '<div class="option">', "<label>Width:</label>", '<input type="text" name="width" maxlength="4" class="input-field" />', "</div>", '<div class="option">', "<label>Height:</label>", '<input type="text" name="height" maxlength="4" class="input-field" />', "</div>", '<div class="option">', "<label>Footer style:</label>", '<select class="sl-select l" name="style">', t, "</select>", "</div>", "</div>", '<textarea name="output" readonly="readonly"></textarea>', "</div>"].join("")), this.embedStyleElement = this.domElement.find(".embed .options select[name=style]"), this.embedWidthElement = this.domElement.find(".embed .options input[name=width]"), this.embedHeightElement = this.domElement.find(".embed .options input[name=height]"), this.embedOutputElement = this.domElement.find(".embed textarea"), this.embedStyleElement.on("change", this.onStyleChanged), this.embedWidthElement.on("input", this.onSizeChanged), this.embedHeightElement.on("input", this.onSizeChanged), this.embedOutputElement.on("mousedown", this.onEmbedOutputMouseDown), this.embedWidthElement.val(this.width), this.embedHeightElement.val(this.height), this.isPrivate && this.domElement.append(['<div class="note">', '<p class="note-inner">', SL.locale.get("DECKSHARER_PRIVATE_URL_NOTICE"), "</p>", "</div>"].join(""))
    },render: function(t) {
        if (t && "string" != typeof t.slug || "string" != typeof t.user.username)
            throw "Must specify username and slug of deck to embed.";
        this.data = t, this.isPrivate = "string" == typeof this.data.access_token && (this.data.visibility === SL.models.Deck.VISIBILITY_SELF || this.data.visibility === SL.models.Deck.VISIBILITY_TEAM), this.build(), this.generate()
    },appendTo: function(t) {
        $(t).append(this.domElement)
    },prependTo: function(t) {
        $(t).prepend(this.domElement)
    },generate: function() {
        var t = this.getDeckURL(), e = this.getDeckURL(!0) + "/embed", n = [];
        this.isPrivate && this.data.access_token && n.push("token=" + this.data.access_token), t += n.length ? "?" + n.join("&") : "", "string" == typeof this.style && this.style.length > 0 && n.push("style=" + this.style), e += n.length ? "?" + n.join("&") : "";
        var i = '<iframe src="' + e + '" width="' + this.width + '" height="' + this.height + '" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        this.embedOutputElement && this.embedOutputElement.text(i), this.linkOutputElement && this.linkOutputElement.val(t)
    },getDeckURL: function(t) {
        var e = this.data.slug || this.data.id, n = t ? "" : "http:";
        return n + "//" + document.location.host + SL.routes.DECK(this.data.user.username, e)
    },onEmbedOutputMouseDown: function(t) {
        t.preventDefault(), this.embedOutputElement.focus().select()
    },onLinkOutputMouseDown: function(t) {
        t.preventDefault(), this.linkOutputElement.focus().select()
    },onSizeChanged: function() {
        this.width = parseInt(this.embedWidthElement.val(), 10) || 1, this.height = parseInt(this.embedHeightElement.val(), 10) || 1, this.generate()
    },onStyleChanged: function() {
        this.style = this.embedStyleElement.val(), this.generate()
    }}),
SL("components.form").Scripts = Class.extend({
    init: function(t) {
        this.domElement = $(t), this.render(), this.readValues(), this.renderList()
    },render: function() {
        this.valueElement = this.domElement.find(".value-holder"), this.listElement = $('<ul class="list">'), this.listElement.delegate("li .remove", "click", this.onListItemRemove.bind(this)), this.listElement.appendTo(this.domElement), this.inputWrapper = $('<div class="input-wrapper"></div>').appendTo(this.domElement), this.inputElement = $('<input type="text" placeholder="https://...">'), this.inputElement.on("keyup", this.onInputKeyUp.bind(this)), this.inputElement.appendTo(this.inputWrapper), this.submitElement = $('<div class="button outline">Add</div>'), this.submitElement.on("click", this.submitInput.bind(this)), this.submitElement.appendTo(this.inputWrapper), this.domElement.parents("form").first().on("submit", this.onFormSubmit.bind(this))
    },renderList: function() {
        this.listElement.empty(), this.values.forEach(function(t) {
            this.listElement.append(['<li class="list-item" data-value="' + t + '">', t, '<span class="icon i-x remove"></span>', "</li>"].join(""))
        }.bind(this))
    },formatValues: function() {
        for (var t = 0; t < this.values.length; t++)
            this.values[t] = SL.util.string.trim(this.values[t]), "" === this.values[t] && this.values.splice(t, 1)
    },readValues: function() {
        this.values = (this.valueElement.val() || "").split(","), this.formatValues()
    },writeValues: function() {
        this.formatValues(), this.valueElement.val(this.values.join(","))
    },addValue: function(t) {
        return t = t || "", 0 === t.search(/https\:\/\//gi) ? (this.values.push(t), this.renderList(), this.writeValues(), !0) : 0 === t.search(/http\:\/\//gi) ? (SL.notify("Script must be loaded via HTTPS", "negative"), !1) : (SL.notify("Please enter a valid script URL", "negative"), !1)
    },removeValue: function(t) {
        if ("string" == typeof t)
            for (var e = 0; e < this.values.length; e++)
                this.values[e] === t && this.values.splice(e, 1);
        else
            "number" == typeof t && this.values.splice(t, 1);
        this.renderList(), this.writeValues()
    },submitInput: function() {
        this.addValue(this.inputElement.val()) && this.inputElement.val("")
    },onListItemRemove: function(t) {
        var e = $(t.target).parent().index();
        "number" == typeof e && this.removeValue(e)
    },onInputKeyUp: function(t) {
        13 === t.keyCode && this.submitInput()
    },onFormSubmit: function(t) {
        return this.inputElement.is(":focus") ? (t.preventDefault(), !1) : void 0
    }}),
SL("components").FormUnit = Class.extend({
    init: function(t) {
        this.domElement = $(t), this.inputElement = this.domElement.find("input"), this.errorElement = $('<div class="error">'), this.errorIcon = $('<span class="icon">!</span>').appendTo(this.errorElement), this.errorMessage = $('<p class="message">!</p>').appendTo(this.errorElement), this.validateType = this.domElement.attr("data-validate"), this.validateTimeout = -1, this.originalValue = this.inputElement.val(), this.originalError = this.domElement.attr("data-error-message"), this.asyncValidatedValue = null, this.clientErrors = [], this.serverErrors = [], this.inputElement.on("input", this.onInput.bind(this)), this.inputElement.on("change", this.onInputChange.bind(this)), this.inputElement.on("focus", this.onInputFocus.bind(this)), this.inputElement.on("blur", this.onInputBlur.bind(this)), this.inputElement.on("invalid", this.onInputInvalid.bind(this)), this.domElement.parents("form").first().on("submit", this.onFormSubmit.bind(this)), this.originalError && (this.domElement.removeClass("hidden"), this.validate(), this.inputElement.focus()), this.domElement.data("controller", this)
    },validate: function(t) {
        clearTimeout(this.validateTimeout);
        var e = this.inputElement.val();
        if ("string" != typeof e)
            return this.serverErrors = [], this.clientErrors = [], void this.render();
        if (e === this.originalValue && (this.originalValue || "password" === this.validateType) && this.originalError)
            this.clientErrors = [this.originalError];
        else if (e.length) {
            var n = SL.util.validate[this.validateType];
            "function" == typeof n ? this.clientErrors = n(e) : console.log('Could not find validation method of type "' + this.validateType + '"')
        } else
            this.clientErrors = [], t && this.isRequired() && this.clientErrors.push(SL.locale.FORM_ERROR_REQUIRED);
        return this.validateAsync(), this.render(), 0 === this.clientErrors.length && 0 === this.serverErrors.length
    },validateAsync: function() {
        if ("username" === this.validateType) {
            var t = SLConfig && SLConfig.current_user ? SLConfig.current_user.username : "", e = this.inputElement.val();
            0 === SL.util.validate.username(e).length && (t && e === t ? (this.asyncValidatedValue = t, this.serverErrors = []) : e !== this.asyncValidatedValue && $.ajax({url: SL.config.AJAX_LOOKUP_USER,type: "GET",data: {id: e},context: this,statusCode: {204: function() {
                        this.serverErrors = [SL.locale.get("FORM_ERROR_USERNAME_TAKEN")]
                    },404: function() {
                        this.serverErrors = []
                    }}}).complete(function() {
                this.render(), this.asyncValidatedValue = e
            }))
        } else if ("team_slug" === this.validateType) {
            var n = SL.current_team ? SL.current_team.get("slug") : "", i = this.inputElement.val();
            0 === SL.util.validate.team_slug(i).length && (n && i === n ? (this.asyncValidatedValue = n, this.serverErrors = []) : i !== this.asyncValidatedValue && $.ajax({url: SL.config.AJAX_LOOKUP_ORGANIZATION,type: "GET",data: {id: i},context: this,statusCode: {204: function() {
                        this.serverErrors = [SL.locale.get("FORM_ERROR_ORGANIZATION_SLUG_TAKEN")]
                    },404: function() {
                        this.serverErrors = []
                    }}}).complete(function() {
                this.render(), this.asyncValidatedValue = i
            }))
        }
    },render: function() {
        var t = this.serverErrors.concat(this.clientErrors);
        t.length ? (this.domElement.addClass("has-error"), this.errorElement.appendTo(this.domElement), this.errorMessage.text(t[0]), setTimeout(function() {
            this.errorElement.addClass("visible")
        }.bind(this), 1)) : (this.domElement.removeClass("has-error"), this.errorElement.removeClass("visible").remove())
    },format: function() {
        if ("username" === this.validateType || "team_slug" === this.validateType) {
            var t = this.inputElement.val();
            t && this.inputElement.val(this.inputElement.val().toLowerCase())
        }
        if ("url" === this.validateType) {
            var t = this.inputElement.val();
            /^http(s?):\/\//gi.test(t) === !1 && this.inputElement.val("http://" + t)
        }
    },focus: function() {
        this.inputElement.focus()
    },beforeSubmit: function() {
        return this.validate(!0), this.clientErrors.length > 0 || this.serverErrors.length > 0 ? (this.focus(), !1) : !0
    },renderImage: function() {
        var t = this.inputElement.get(0);
        if (t.files && t.files[0]) {
            var e = new FileReader;
            e.onload = function(t) {
                var e = this.domElement.find("img"), n = t.target.result;
                e.length ? e.attr("src", n) : $('<img src="' + n + '">').appendTo(this.domElement.find(".image-uploader"))
            }.bind(this), e.readAsDataURL(t.files[0])
        }
    },isRequired: function() {
        return !this.domElement.hasClass("hidden") && this.domElement.is("[data-required]")
    },isUnchanged: function() {
        return this.inputElement.val() === this.originalValue
    },onInput: function() {
        if (clearTimeout(this.validateTimeout), !SL.util.device.IS_PHONE && !SL.util.device.IS_TABLET) {
            var t = 600;
            (this.clientErrors.length || this.serverErrors.length) && (t = 300), this.validateTimeout = setTimeout(this.validate.bind(this), t)
        }
    },onInputChange: function(t) {
        this.domElement.hasClass("image") && this.renderImage(t.target), this.validate()
    },onInputFocus: function() {
        this.domElement.addClass("focused")
    },onInputBlur: function() {
        this.format(), this.domElement.removeClass("focused")
    },onInputInvalid: function(t) {
        return this.beforeSubmit(t)
    },onFormSubmit: function(t) {
        return this.beforeSubmit(t) === !1 ? (t.preventDefault(), !1) : void 0
    }}),
SL("components").Header = Class.extend({
        init: function() {
        this.domElement = $(".global-header"), this.render(), this.bind()
    },render: function() {
        var t = this.domElement.find(".profile-button .nav-item-anchor"), e = [{label: "Profile",icon: "home",url: SL.routes.USER(SL.current_user.get("username"))}, {label: "New deck",icon: "plus",url: SL.routes.DECK_NEW(SL.current_user.get("username"))}];
        SL.current_user.isEnterpriseManager() && e.push({label: "Themes",icon: "brush",url: SL.routes.THEME_EDITOR}), e.push({label: "Settings",icon: "cog",url: SL.routes.USER_EDIT}), SL.current_user.isPro() && !SL.current_user.isEnterprise() ? e.push({label: "Billing",icon: "credit",url: SL.routes.BILLING_DETAILS}) : SL.current_user.isEnterprise() || e.push({label: "Upgrade",icon: "star",url: SL.routes.PRICING}), e.push({label: "Sign out",icon: "exit",url: SL.routes.SIGN_OUT,attributes: {rel: "nofollow","data-method": "delete"}}), this.dropdown = new SL.components.Menu({anchor: t,anchorSpacing: 10,alignment: "auto",minWidth: 160,showOnHover: !0,options: e})
    },bind: function() {
        this.domElement.find(".logo-animation").on("contextmenu", function() {
            return window.location.href = "/about#logo", !1
        }), this.domElement.hasClass("show-on-scroll") && ($(document).on("mousemove", this.onDocumentMouseMove.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this)))
    },onWindowScroll: function() {
        this.isScrolledDown = $(window).scrollTop() > 30, this.domElement.toggleClass("show", this.isScrolledDown)
    },onDocumentMouseMove: function(t) {
        if (!this.isScrolledDown) {
            var e = t.clientY;
            e > 0 && (20 > e && !this.isMouseOver ? (this.domElement.addClass("show"), this.isMouseOver = !0) : e > 80 && this.isMouseOver && 0 === $(t.target).parents(".global-header").length && (this.domElement.removeClass("show"), this.isMouseOver = !1))
        }
    }
}), 

/**
*  SL Reusable Components
*
*/
SL("components").Kudos = function() {
    function t() {
        $("[data-kudos-value][data-kudos-id]").each(function(t, e) {
            var n = e.getAttribute("data-kudos-id");
            n && !r[n] && (r[n] = e.getAttribute("data-kudos-value"))
        }.bind(this)), $(".kudos-trigger[data-kudos-id]").on("click", function(t) {
            var i = t.currentTarget;
            "true" === i.getAttribute("data-kudoed-by-user") ? n(i.getAttribute("data-kudos-id")) : e(i.getAttribute("data-kudos-id"))
        }.bind(this))
    }
    function e(t) {
        i(t), $.ajax({type: "POST",url: SL.config.AJAX_KUDO_DECK(t),context: this}).fail(function() {
            s(t), SL.notify(SL.locale.get("GENERIC_ERROR"))
        })
    }
    function n(t) {
        s(t), $.ajax({type: "DELETE",url: SL.config.AJAX_UNKUDO_DECK(t),context: this}).fail(function() {
            i(t), SL.notify(SL.locale.get("GENERIC_ERROR"))
        })
    }
    function i(t) {
        var e = $('.kudos-trigger[data-kudos-id="' + t + '"]');
        e.attr("data-kudoed-by-user", "true"), r[t]++, o(t, r[t]);
        var n = e.find(".kudos-icon");
        n.length && (n.removeClass("bounce"), setTimeout(function() {
            n.addClass("bounce")
        }, 1))
    }
    function s(t) {
        var e = $('.kudos-trigger[data-kudos-id="' + t + '"]');
        e.attr("data-kudoed-by-user", "false"), r[t]--, o(t, r[t]), e.find(".kudos-icon").removeClass("bounce")
    }
    function o(t, e) {
        "number" == typeof r[t] && ("number" == typeof e && (r[t] = e), e = Math.max(r[t], 0), $("[data-kudos-id][data-kudos-value]").each(function(t, n) {
            n.setAttribute("data-kudos-value", e)
        }))
    }
    var r = {};
    t()
}(), 
SL("components").Menu = Class.extend({
    init: function(t) {
        this.config = $.extend({alignment: "auto",anchorSpacing: 10,minWidth: 0,offsetX: 0,offsetY: 0,options: [],showOnHover: !1}, t), this.config.anchor = $(this.config.anchor), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.layout = this.layout.bind(this), this.toggle = this.toggle.bind(this), this.onMouseOver = this.onMouseOver.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this), this.onDocumentKeydown = this.onDocumentKeydown.bind(this), this.destroyed = new signals.Signal, this.render(), this.renderList(), this.config.anchor.length && (/(iphone|ipod|ipad|android|windows\sphone)/gi.test(navigator.userAgent) ? (this.config.anchor.addClass("menu-show-on-touch"), this.config.anchor.on("touchstart pointerdown", function(t) {
            t.preventDefault(), this.toggle()
        }.bind(this)), this.config.anchor.on("click", function(t) {
            t.preventDefault()
        }.bind(this))) : (this.config.showOnHover && (this.config.anchor.on("mouseover", this.onMouseOver), this.config.anchor.is(":hover") && this.onMouseOver()), this.config.anchor.on("click", this.toggle)))
    },render: function() {
        this.domElement = $('<div class="sl-menu">'), this.listElement = $('<div class="sl-menu-list">').appendTo(this.domElement), this.arrowElement = $('<div class="sl-menu-arrow">').appendTo(this.domElement), this.hitareaElement = $('<div class="sl-menu-hitarea">').appendTo(this.domElement), this.listElement.css("minWidth", this.config.minWidth + "px")
    },renderList: function() {
        this.config.options.forEach(function(t) {
            var e;
            e = $("string" == typeof t.url ? '<a class="sl-menu-item" href="' + t.url + '">' : '<div class="sl-menu-item">'), e.html('<span class="label">' + t.label + "</span>"), e.data("callback", t.callback), e.appendTo(this.listElement), e.on("click", function(t) {
                var e = $(t.currentTarget).data("callback");
                "function" == typeof e && e.apply(null), this.hide()
            }.bind(this)), t.icon && e.append('<span class="icon i-' + t.icon + '"></span>'), t.attributes && e.attr(t.attributes)
        }.bind(this)), this.listElement.find(".sl-menu-item:not(:last-child)").after('<div class="sl-menu-divider">')
    },bind: function() {
        $(window).on("resize scroll", this.layout), $(document).on("keydown", this.onDocumentKeydown), $(document).on("mousedown touchstart pointerdown", this.onDocumentMouseDown)
    },unbind: function() {
        $(window).off("resize scroll", this.layout), $(document).off("keydown", this.onDocumentKeydown), $(document).off("mousedown touchstart pointerdown", this.onDocumentMouseDown)
    },layout: function() {
        if (this.config.anchor.length) {
            var t = this.config.anchor.offset(), e = this.config.anchorSpacing, n = this.config.alignment, i = $(window).scrollLeft(), s = $(window).scrollTop(), o = t.left + this.config.offsetX, r = t.top + this.config.offsetY, a = this.config.anchor.outerWidth(), l = this.config.anchor.outerHeight(), c = this.domElement.outerWidth(), u = this.domElement.outerHeight(), d = c / 2, h = c / 2, p = 8;
            switch ("auto" === n && (n = t.top - (u + e + p) < s ? "b" : "t"), this.domElement.attr("data-alignment", n), n) {
                case "t":
                    o += (a - c) / 2, r -= u + e;
                    break;
                case "b":
                    o += (a - c) / 2, r += l + e;
                    break;
                case "l":
                    o -= c + e, r += (l - u) / 2;
                    break;
                case "r":
                    o += a + e, r += (l - u) / 2
            }
            switch (o = Math.min(Math.max(o, i + e), window.innerWidth + i - c - e), r = Math.min(Math.max(r, s + e), window.innerHeight + s - u - e), n) {
                case "t":
                    d = t.left - o + a / 2, h = u;
                    break;
                case "b":
                    d = t.left - o + a / 2, h = -p;
                    break;
                case "l":
                    d = c, h = t.top - r + l / 2;
                    break;
                case "r":
                    d = -p, h = t.top - r + l / 2
            }
            this.domElement.css({left: o,top: r}), this.arrowElement.css({left: d,top: h}), this.hitareaElement.css({top: -e,right: -e,bottom: -e,left: -e})
        }
    },focus: function(t) {
        var e = this.listElement.find(".focus");
        if (e.length) {
            var n = t > 0 ? e.nextAll(".sl-menu-item").first() : e.prevAll(".sl-menu-item").first();
            n.length && (e.removeClass("focus"), n.addClass("focus"))
        } else
            this.listElement.find(".sl-menu-item").first().addClass("focus")
    },show: function() {
        this.domElement.removeClass("visible").appendTo(document.body), setTimeout(function() {
            this.domElement.addClass("visible")
        }.bind(this), 1), this.config.anchor.addClass("menu-is-open"), this.layout(), this.bind()
    },hide: function() {
        this.listElement.find(".focus").removeClass("focus"), this.config.anchor.removeClass("menu-is-open"), this.domElement.detach(), this.unbind(), $(document).off("mousemove", this.onDocumentMouseMove), this.isMouseOver = !1, clearTimeout(this.hideTimeout)
    },toggle: function() {
        this.isVisible() ? this.hide() : this.show()
    },isVisible: function() {
        return this.domElement.parent().length > 0
    },destroy: function() {
        this.destroyed.dispatch(), this.destroyed.dispose(), this.domElement.remove(), this.unbind(), this.config.anchor.off("click", this.toggle), this.config.anchor.off("hover", this.toggle)
    },onDocumentKeydown: function(t) {
        if (27 === t.keyCode && (this.hide(), t.preventDefault()), 13 === t.keyCode) {
            var e = this.listElement.find(".focus");
            e.length && (e.trigger("click"), t.preventDefault())
        } else
            38 === t.keyCode ? (this.focus(-1), t.preventDefault()) : 40 === t.keyCode ? (this.focus(1), t.preventDefault()) : 9 === t.keyCode && t.shiftKey ? (this.focus(-1), t.preventDefault()) : 9 === t.keyCode && (this.focus(1), t.preventDefault())
    },onMouseOver: function() {
        this.isMouseOver || ($(document).on("mousemove", this.onDocumentMouseMove), this.hideTimeout = -1, this.isMouseOver = !0, this.show())
    },onDocumentMouseMove: function(t) {
        var e = $(t.target);
        0 === e.closest(this.domElement).length && 0 === e.closest(this.config.anchor).length ? -1 === this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(this.hide, 150)) : this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = -1)
    },onDocumentMouseDown: function(t) {
        var e = $(t.target);
        this.isVisible() && 0 === e.closest(this.domElement).length && 0 === e.closest(this.config.anchor).length && this.hide()
    }}),
SL("components").Meter = Class.extend({
        init: function(t) {
        this.domElement = $(t), this.labelElement = $('<div class="label">').appendTo(this.domElement), this.progressElement = $('<div class="progress">').appendTo(this.domElement), this.read(), this.paint(), window.m = this
    },read: function() {
        switch (this.unit = "", this.type = this.domElement.attr("data-type"), this.value = parseInt(this.domElement.attr("data-value"), 10) || 0, this.total = parseInt(this.domElement.attr("data-total"), 10) || 0, this.type) {
            case "storage":
                var t = 1024, e = 1024 * t, n = 1024 * e;
                this.value < e && this.total < e && (this.value = Math.round(this.value / t), this.total = Math.round(this.total / t), this.unit = "KB"), this.value < n && this.total < n ? (this.value = Math.round(this.value / e), this.total = Math.round(this.total / e), this.unit = "MB") : (this.value = (this.value / n).toFixed(2), this.total = (this.total / n).toFixed(2), this.unit = "GB")
        }
    },paint: function() {
        var t = Math.min(Math.max(this.value / this.total, 0), 1) || 0;
        this.labelElement.text(this.value + " / " + this.total + " " + this.unit), this.progressElement.width(100 * t + "%"), 0 === this.total ? this.domElement.attr("data-state", "invalid") : t > .9 ? this.domElement.attr("data-state", "negative") : t > .7 ? this.domElement.attr("data-state", "warning") : this.domElement.attr("data-state", "positive")
    }
}), 


SL.modal = function() {
    function t() {
        $(['<div class="inner edit-html">', "<h3>Edit HTML</h3>", '<div id="ace-html" class="editor"></div>', "<footer>", '<button class="button grey negative close xl">Cancel</button>', '<button class="button save-changes xl">OK</button>', "</footer>", "</div>"].join("")).appendTo(a);
        this.htmlEditor && "function" == typeof this.htmlEditor.destroy && (this.htmlEditor.destroy(), this.htmlEditor = null);
        try {
            SL.htmlEditor = ace.edit("ace-html"), SL.htmlEditor.setTheme("ace/theme/monokai"), SL.htmlEditor.setDisplayIndentGuides(!0), SL.htmlEditor.setShowPrintMargin(!1), SL.htmlEditor.getSession().setMode("ace/mode/html")
        } catch (t) {
            console.log("An error occurred while initializing the Ace editor.")
        }
        var e = SL.editor.controllers.Serialize.getSlideAsString(Reveal.getCurrentSlide(), {inner: !0,exclude: ".math-output"});
        SL.htmlEditor.env.document.setValue(SL.util.html.indent(e)), SL.htmlEditor.focus(), a.find(".save-changes").on("click", function() {
            SL.editor.controllers.Markup.writeHTMLToCurrentSlide(SL.htmlEditor.env.document.getValue()), SL.modal.close()
        })
    }
    function e() {
        $(['<div class="inner no-session">', "<h3>Session Expired</h3>", "<p>You are no longer signed in to Slides. This can happen when you leave the editor idle for too long, log out in a different tab or go offline. To continue please:</p>", "<ol>", '<li><a href="' + SL.routes.SIGN_IN + '" target="_blank">Sign in</a> to Slides from another browser tab.</li>', "<li>Come back to this tab and press the 'Retry' button.</li>", "</ol>", "<footer>", '<button class="button outline negative close l">Ignore</button>', '<button class="button retry l">Retry</button>', "</footer>", "</div>"].join("")).appendTo(a);
        a.find(".retry").on("click", function() {
            SL.editor.controllers.Session.checkLogin(!0)
        })
    }
    function n(t) {
        var e = $(['<div class="inner share-deck">', "<footer>", '<button class="button xl done close">Done</button>', "</footer>", "</div>"].join("")).appendTo(a);
        controller = new SL.components.DeckSharer, controller.prependTo(e), e.data("decksharer", controller), controller.render(t)
    }
    function i(t) {
        var e = $(['<div class="inner preview-deck">', '<div class="spinner centered"></div>', '<div class="deck"></div>', "<footer></footer>", "</div>"].join("")).appendTo(a), n = e.find(".deck").empty(), i = e.find("footer").empty();
        e.addClass("loading"), SL.util.html.generateSpinners();
        var s = $("<iframe>", {src: t.src,load: function() {
                e.removeClass("loading")
            }});
        s.appendTo(n), i.append(t.footer ? t.footer : '<button class="button close l">Close</button>')
    }
    function s(t) {
        var e = $(['<div class="inner insert-snippet">', '<h3>Insert: "' + t.snippet.get("title") + '"</h3>', '<div class="variables sl-form"></div>', "<footer>", '<button class="button outline close l">Cancel</button>', '<button class="button insert l">Insert</button>', "</footer>", "</div>"].join("")).appendTo(a), n = a.find(".insert"), i = t.snippet.getTemplateVariables(), s = e.find(".variables");
        i.forEach(function(t) {
            var e = $(['<div class="unit">', "<label>" + t.label + "</label>", '<input type="text" value="' + t.defaultValue + '">', "</div>"].join("")).appendTo(s);
            e.find("input").data("variable", t), e.find("input").on("keydown", function(t) {
                13 === t.keyCode && n.trigger("click")
            })
        }), setTimeout(function() {
            e.find("input").first().focus()
        }, 1), n.on("click", function() {
            s.find("input").each(function(t, e) {
                e = $(e), e.data("variable").value = e.val()
            }), t.callback(t.snippet.templatize(i)), SL.modal.close()
        })
    }
    function o() {
        var t = a.find(".preview-deck");
        t.find(".deck iframe").attr("src", ""), t.find(".deck").empty(), t.find("footer").empty()
    }
    function r() {
        var t = a.find(">.inner");
        t.css({left: Math.max((window.innerWidth - t.outerWidth()) / 2, 10),top: Math.max((window.innerHeight - t.outerHeight()) / 2, 10)})
    }
    var a = $('<div id="modal">').appendTo(document.body), l = $('<div id="modal-cover">').appendTo(document.body), c = $('<div id="modal-background">').appendTo(document.body), u = null, d = null;
    // add event listeners
    return $(document).on("keyup", function(t) {
        27 === t.keyCode && SL.modal.isOpen() && SL.modal.close()
    }), a.add(l).on("click", function(t) {
        t.target === this && SL.modal.close()
    }), a.on("click", ".close", function() {
        SL.modal.close()
    }), 
    {open: function(o, l) {
            switch (a.find(">.inner").remove(), u = o, o) {
                case "edit-html":
                    t(l);
                    break;
                case "no-session":
                    e(l);
                    break;
                case "share-deck":
                    n(l);
                    break;
                case "preview-deck":
                    i(l);
                    break;
                case "insert-snippet":
                    s(l)
            }
            $("html").addClass("modal-open"), clearTimeout(d), c.show(), a.find(">.inner").removeClass("visible"), a.find("." + o).addClass("visible"), $(window).on("resize", r), r()
        },close: function() {
            $("html").removeClass("modal-open"), a.find(".save-changes").off(), a.find(".discard-changes").off(), d = setTimeout(function() {
                switch (c.hide(), a.find(">.inner").removeClass("visible"), u) {
                    case "preview-deck":
                        o()
                }
            }, 400), $(window).off("resize", r)
        },isOpen: function(t) {
            var e = $("html").hasClass("modal-open");
            return e && t && (e = a.find("." + t).hasClass("visible")), e
        }}
}(), // running imediately



SL.notify = function(t, e) {
    function n() {
        i(), a = setTimeout(function() {
            o.addClass("no-transition").fadeOut(600, s)
        }, e.duration)
    }
    function i() {
        clearTimeout(a), o.stop().css("opacity", "")
    }
    function s() {
        clearTimeout(a), o.remove(), r.dispatch()
    }
    0 === $(".sl-notifications").length && $(document.body).append('<div class="sl-notifications"></div>'), $(".sl-notifications>p").last().html() === t && $(".sl-notifications>p").last().remove(), "string" == typeof e && (e = {type: e}), e = $.extend({type: "",duration: 2500 + 15 * t.length,autoHide: !0}, e), "negative" === e.type && (e.duration = 1.5 * e.duration);
    var o = $("<p>").html(t).addClass(e.type).appendTo($(".sl-notifications")).on("click", s);
    e.autoHide && (o.on("mouseover", i), o.on("mouseout", n));
    var r = new signals.Signal, a = -1;
    return setTimeout(function() {
        o.addClass("show"), e.autoHide && n()
    }, 1), {domElement: o,destroy: s,destroyed: r}
}, 


SL("components").Prompt = Class.extend({
    init: function(t) {
        this.config = $.extend({type: "custom",data: null,anchor: null,title: null,optional: !0,alignment: "auto",offsetX: 0,offsetY: 0,className: null,confirmLabel: "OK",cancelLabel: "Cancel"}, t), this.onBackgroundClicked = this.onBackgroundClicked.bind(this), this.onDocumentKeydown = this.onDocumentKeydown.bind(this), this.onPromptCancelClick = this.onPromptCancelClick.bind(this), this.onPromptConfirmClick = this.onPromptConfirmClick.bind(this), this.onInputChanged = this.onInputChanged.bind(this), this.layout = this.layout.bind(this), this.confirmed = new signals.Signal, this.canceled = new signals.Signal, this.destroyed = new signals.Signal, this.render()
    },render: function() {
        this.domElement = $('<div class="sl-prompt" data-type="' + this.config.type + '">'), this.innerElement = $('<div class="inner">').appendTo(this.domElement), this.arrowElement = $('<div class="arrow">').appendTo(this.innerElement), this.config.title && (this.titleElement = $('<h3 class="title">').html(this.config.title).appendTo(this.innerElement)), this.config.className && this.domElement.addClass(this.config.className), this.config.html && this.innerElement.append(this.config.html), "select" === this.config.type ? this.renderSelect() : "list" === this.config.type ? (this.renderList(), this.renderButtons(!this.config.multiselect, this.config.multiselect)) : "input" === this.config.type && (this.renderInput(), this.renderButtons())
    },renderSelect: function() {
        this.config.data.forEach(function(t) {
            var e = $('<a class="item button outline l">').html(t.html);
            e.data("callback", t.callback), e.appendTo(this.innerElement), e.on("vclick", function(t) {
                var e = $(t.currentTarget).data("callback");
                "function" == typeof e && e.apply(null), this.destroy(), t.preventDefault()
            }.bind(this)), t.focused === !0 && e.addClass("focus"), t.selected === !0 && e.addClass("selected"), "string" == typeof t.className && e.addClass(t.className)
        }.bind(this)), this.domElement.attr("data-length", this.config.data.length)
    },renderList: function() {
        this.listElement = $('<div class="list">').appendTo(this.innerElement), this.config.data.forEach(function(t) {
            var e = $('<div class="item">');
            e.html('<span class="title">' + (t.title ? t.title : t.value) + '</span><span class="checkmark icon i-checkmark"></span>'), e.data({callback: t.callback,value: t.value}), e.appendTo(this.listElement), e.on("click", function(t) {
                var e = $(t.currentTarget), n = e.data("callback"), i = e.data("value");
                this.config.multiselect && e.toggleClass("selected"), "function" == typeof n && n.apply(null, [i, e.hasClass("selected")]), this.config.multiselect || (this.confirmed.dispatch(i), this.destroy())
            }.bind(this)), t.focused === !0 && e.addClass("focus"), t.selected === !0 && e.addClass("selected"), "string" == typeof t.className && e.addClass(t.className)
        }.bind(this))
    },renderInput: function() {
        this.config.data.multiline === !0 ? this.inputElement = $('<textarea cols="40" rows="8">') : (this.inputElement = $('<input type="text">'), "number" == typeof this.config.data.width && this.inputElement.css("width", this.config.data.width)), this.config.data.value && this.inputElement.val(this.config.data.value), this.config.data.placeholder && this.inputElement.attr("placeholder", this.config.data.placeholder), this.config.data.maxlength && this.inputElement.attr("maxlength", this.config.data.maxlength), this.inputWrapperElement = $('<div class="input-wrapper">').append(this.inputElement), this.inputWrapperElement.appendTo(this.innerElement), this.onInputChanged()
    },renderButtons: function(t, e) {
        this.footerElement = $('<div class="footer">').appendTo(this.innerElement), !e && this.config.optional && this.config.cancelLabel && this.footerElement.append('<button class="button l outline white prompt-cancel">' + this.config.cancelLabel + "</button>"), !t && this.config.confirmLabel && this.footerElement.append('<button class="button l prompt-confirm">' + this.config.confirmLabel + "</button>")
    },bind: function() {
        $(window).on("resize", this.layout), $(document).on("keydown", this.onDocumentKeydown), this.domElement.on("vclick", this.onBackgroundClicked), "hidden" !== $("html").css("overflow") && $(window).on("scroll", this.layout), this.domElement.find(".prompt-cancel").on("vclick", this.onPromptCancelClick), this.domElement.find(".prompt-confirm").on("vclick", this.onPromptConfirmClick), this.inputElement && this.inputElement.on("input", this.onInputChanged)
    },unbind: function() {
        $(window).off("resize scroll", this.layout), $(document).off("keydown", this.onDocumentKeydown), this.domElement.off("vclick", this.onBackgroundClicked), this.domElement.find(".prompt-cancel").off("vclick", this.onPromptCancelClick), this.domElement.find(".prompt-confirm").off("vclick", this.onPromptConfirmClick), this.inputElement && this.inputElement.off("input", this.onInputChanged)
    },layout: function() {
        var t = this.innerElement.outerWidth(), e = this.innerElement.outerHeight(), n = $(this.config.anchor);
        if (n.length) {
            var i = n.offset(), s = 15, o = this.config.alignment, r = $(window).scrollLeft(), a = $(window).scrollTop(), l = i.left - $(window).scrollLeft(), c = i.top - $(window).scrollTop();
            l += this.config.offsetX, c += this.config.offsetY;
            var u = n.outerWidth(), d = n.outerHeight(), h = t / 2, p = t / 2, f = 8;
            switch ("auto" === o && (o = i.top - (e + s + f) < a ? "b" : "t"), this.domElement.attr("data-alignment", o), o) {
                case "t":
                    l += (u - t) / 2, c -= e + s;
                    break;
                case "b":
                    l += (u - t) / 2, c += d + s;
                    break;
                case "l":
                    l -= t + s, c += (d - e) / 2;
                    break;
                case "r":
                    l += u + s, c += (d - e) / 2
            }
            switch (l = Math.min(Math.max(l, s), window.innerWidth - t - s), c = Math.min(Math.max(c, s), window.innerHeight - e - s), o) {
                case "t":
                    h = i.left - l - r + u / 2, p = e;
                    break;
                case "b":
                    h = i.left - l - r + u / 2, p = -f;
                    break;
                case "l":
                    h = t, p = i.top - c - a + d / 2;
                    break;
                case "r":
                    h = -f, p = i.top - c - a + d / 2
            }
            this.innerElement.css({left: l,top: c}), this.arrowElement.css({left: h,top: p}).show()
        } else
            this.innerElement.css({left: Math.round((window.innerWidth - t) / 2),top: Math.round(.4 * (window.innerHeight - e))}), this.arrowElement.hide()
    },focus: function(t) {
        var e = this.innerElement.find(".focus");
        if (e.length || (e = this.innerElement.find(".selected")), e.length) {
            var n = t > 0 ? e.next(".item") : e.prev(".item");
            n.length && (e.removeClass("focus"), n.addClass("focus"))
        } else
            this.innerElement.find(".item").first().addClass("focus")
    },show: function() {
        var t = $(this.config.anchor);
        t.length && t.addClass("focus"), this.domElement.removeClass("visible").appendTo(document.body), setTimeout(function() {
            this.domElement.addClass("visible")
        }.bind(this), 1), this.layout(), this.bind(), this.inputElement && this.inputElement.focus()
    },hide: function() {
        var t = $(this.config.anchor);
        t.length && t.removeClass("focus"), this.domElement.detach(), this.unbind()
    },getValue: function() {
        var t = void 0;
        return "input" === this.config.type && (t = this.inputElement.val()), t
    },getDOMElement: function() {
        return this.domElement
    },cancel: function() {
        if ("input" === this.config.type && this.config.data.confirmBeforeDiscard) {
            var t = this.config.data.value || "", e = this.getValue() || "";
            e !== t ? SL.prompt({title: "Discard unsaved changes?",type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Discard</h3>",selected: !0,className: "negative",callback: function() {
                            this.canceled.dispatch(this.getValue()), this.destroy()
                        }.bind(this)}]}) : (this.canceled.dispatch(this.getValue()), this.destroy())
        } else
            this.canceled.dispatch(this.getValue()), this.destroy()
    },destroy: function() {
        this.destroyed.dispatch(), this.destroyed.dispose();
        var t = $(this.config.anchor);
        t.length && t.removeClass("focus"), this.domElement.remove(), this.unbind(), this.confirmed.dispose(), this.canceled.dispose()
    },onBackgroundClicked: function(t) {
        this.config.optional && $(t.target).is(this.domElement) && (this.cancel(), t.preventDefault())
    },onPromptCancelClick: function(t) {
        this.cancel(), t.preventDefault()
    },onPromptConfirmClick: function(t) {
        this.confirmed.dispatch(this.getValue()), this.destroy(), t.preventDefault()
    },onDocumentKeydown: function(t) {
        if (27 === t.keyCode && (this.config.optional && this.cancel(), t.preventDefault()), "select" === this.config.type || "list" === this.config.type)
            if (13 === t.keyCode) {
                var e = this.innerElement.find(".focus");
                0 === e.length && (e = this.innerElement.find(".selected")), e.length && (e.trigger("click"), t.preventDefault())
            } else
                37 === t.keyCode || 38 === t.keyCode ? (this.focus(-1), t.preventDefault()) : 39 === t.keyCode || 40 === t.keyCode ? (this.focus(1), t.preventDefault()) : 9 === t.keyCode && t.shiftKey ? (this.focus(-1), t.preventDefault()) : 9 === t.keyCode && (this.focus(1), t.preventDefault());
        "input" === this.config.type && (13 !== t.keyCode || this.config.data.multiline || this.onPromptConfirmClick(t))
    },onInputChanged: function() {
        if (this.config.data.maxlength) {
            var t = this.inputWrapperElement.find(".input-status");
            0 === t.length && (t = $('<div class="input-status">').appendTo(this.inputWrapperElement));
            var e = this.inputElement.val().length, n = this.config.data.maxlength;
            t.text(e + "/" + n), t.toggleClass("negative", e > .95 * n)
        }
    }}),
    SL.prompt = function(t) {
    var e = new SL.components.Prompt(t);
    return e.show(), e
}, 

SL("components").Resizer = Class.extend({
    init: function(t, e) {
        this.domElement = $(t), this.revealElement = this.domElement.closest(".reveal"), this.options = $.extend({padding: 10,preserveAspectRatio: !1,useOverlay: !1}, e), this.mouse = {x: 0,y: 0}, this.mouseStart = {x: 0,y: 0}, this.origin = {x: 0,y: 0,width: 0,height: 0}, this.resizing = !1, this.domElement.length ? (this.onAnchorMouseDown = this.onAnchorMouseDown.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this), this.onElementDrop = this.onElementDrop.bind(this), this.layout = this.layout.bind(this), this.build(), this.bind(), this.layout()) : console.warn("Resizer: invalid resize target.")
    },build: function() {
        this.options.useOverlay && (this.overlay = $('<div class="editing-ui resizer-overlay"></div>').appendTo(document.body).hide()), this.anchorN = $('<div class="editing-ui resizer-anchor" data-direction="n"></div>').appendTo(document.body), this.anchorE = $('<div class="editing-ui resizer-anchor" data-direction="e"></div>').appendTo(document.body), this.anchorS = $('<div class="editing-ui resizer-anchor" data-direction="s"></div>').appendTo(document.body), this.anchorW = $('<div class="editing-ui resizer-anchor" data-direction="w"></div>').appendTo(document.body)
    },bind: function() {
        this.resizeStarted = new signals.Signal, this.resizeUpdated = new signals.Signal, this.resizeEnded = new signals.Signal, this.getAnchors().on("mousedown", this.onAnchorMouseDown), this.revealElement.on("drop", this.onElementDrop), $(document).on("keyup", this.layout), $(document).on("mouseup", this.layout), $(document).on("mousewheel", this.layout), $(document).on("DOMMouseScroll", this.layout), $(window).on("resize", this.layout)
    },layout: function() {
        if (!this.destroyIfDetached()) {
            var t = SL.util.getRevealElementGlobalOffset(this.domElement), e = Reveal.getScale(), n = parseInt(this.domElement.css("margin-right"), 10);
            marginBottom = parseInt(this.domElement.css("margin-bottom"), 10);
            var i = t.x - this.options.padding, s = t.y - this.options.padding, o = (this.domElement.width() + n) * e + 2 * this.options.padding;
            height = (this.domElement.height() + marginBottom) * e + 2 * this.options.padding;
            var r = -this.anchorN.outerWidth() / 2;
            this.anchorN.css({left: i + o / 2 + r,top: s + r}), this.anchorE.css({left: i + o + r,top: s + height / 2 + r}), this.anchorS.css({left: i + o / 2 + r,top: s + height + r}), this.anchorW.css({left: i + r,top: s + height / 2 + r}), this.overlay && this.overlay.css({left: i,top: s,width: o,height: height})
        }
    },show: function() {
        this.getAnchors().addClass("visible"), this.layout()
    },hide: function() {
        this.getAnchors().removeClass("visible")
    },destroyIfDetached: function() {
        return 0 === this.domElement.closest("body").length ? (this.destroy(), !0) : !1
    },getOptions: function() {
        return this.options
    },getAnchors: function() {
        return this.anchorN.add(this.anchorE).add(this.anchorS).add(this.anchorW)
    },isResizing: function() {
        return !!this.resizing
    },isDestroyed: function() {
        return !!this.destroyed
    },onAnchorMouseDown: function(t) {
        var e = $(t.target).attr("data-direction");
        if (e) {
            t.preventDefault(), this.resizeDirection = e, this.mouseStart.x = t.clientX, this.mouseStart.y = t.clientY;
            var n = SL.util.getRevealElementOffset(this.domElement);
            this.origin.x = n.x, this.origin.y = n.y, this.origin.width = this.domElement.width(), this.origin.height = this.domElement.height(), this.overlay && this.overlay.show(), this.resizing = !0, $(document).on("mousemove", this.onDocumentMouseMove), $(document).on("mouseup", this.onDocumentMouseUp), this.resizeStarted.dispatch()
        }
    },onDocumentMouseMove: function(t) {
        if (!this.destroyIfDetached() && (this.mouse.x = t.clientX, this.mouse.y = t.clientY, this.resizing)) {
            var e = Reveal.getScale(), n = (this.mouse.x - this.mouseStart.x) / e, i = (this.mouse.y - this.mouseStart.y) / e, s = "", o = "";
            switch (this.resizeDirection) {
                case "e":
                    s = Math.max(this.origin.width + n, 1);
                    break;
                case "w":
                    s = Math.max(this.origin.width - n, 1);
                    break;
                case "s":
                    o = Math.max(this.origin.height + i, 1);
                    break;
                case "n":
                    o = Math.max(this.origin.height - i, 1)
            }
            if (this.options.preserveAspectRatio ? ("" === s && (s = this.origin.width * (o / this.origin.height)), "" === o && (o = this.origin.height * (s / this.origin.width))) : ("" === s && (s = this.domElement.css("width")), "" === o && (o = this.domElement.css("height"))), "absolute" === this.domElement.css("position") && ("n" === this.resizeDirection || "w" === this.resizeDirection))
                switch (this.resizeDirection) {
                    case "w":
                        this.domElement.css("left", Math.round(this.origin.x + n));
                        break;
                    case "n":
                        this.domElement.css("top", Math.round(this.origin.y + i))
                }
            this.domElement.css({width: s ? s : "",height: o ? o : "",maxHeight: "none",maxWidth: "none"}), this.layout(), this.resizeUpdated.dispatch()
        }
    },onDocumentMouseUp: function() {
        this.resizing = !1, $(document).off("mousemove", this.onDocumentMouseMove), $(document).off("mouseup", this.onDocumentMouseUp), this.overlay && this.overlay.hide(), this.resizeEnded.dispatch()
    },onElementDrop: function() {
        setTimeout(this.layout, 1)
    },destroy: function() {
        this.destroyed || (this.destroyed = !0, this.resizeStarted.dispose(), this.resizeUpdated.dispose(), this.resizeEnded.dispose(), $(document).off("mousemove", this.onDocumentMouseMove), $(document).off("mouseup", this.onDocumentMouseUp), $(document).off("keyup", this.layout), $(document).off("mouseup", this.layout), $(document).off("mousewheel", this.layout), $(document).off("DOMMouseScroll", this.layout), $(window).off("resize", this.layout), this.revealElement.off("drop", this.onElementDrop), this.getAnchors().off("mousedown", this.onAnchorMouseDown), this.anchorN.remove(), this.anchorE.remove(), this.anchorS.remove(), this.anchorW.remove(), this.overlay && this.overlay.remove())
    }
}), 

SL.components.Resizer.delegateOnHover = function(t, e, n) {
    function i() {
        c && (c.destroy(), c = null, $(document).off("mousemove", r), $(document).off("mouseup", a))
    }
    function s(t, e) {
        if (c && c.isResizing())
            return !1;
        if (c && u && !u.is(t) && i(), !c) {
            var s = {};
            $.extend(s, n), $.extend(s, e), u = $(t), c = new SL.components.Resizer(u, s), c.resizeUpdated.add(l), c.show(), $(document).on("mousemove", r), $(document).on("mouseup", a)
        }
    }
    function o(t) {
        var e = $(t.currentTarget), n = null;
        e.data("resizer-options") && (n = e.data("resizer-options")), e.data("target-element") && (e = e.data("target-element")), s(e, n)
    }
    function r(t) {
        if (c)
            if (c.isDestroyed())
                i();
            else if (!c.isResizing()) {
                var e = Reveal.getScale(), n = SL.util.getRevealElementGlobalOffset(u), s = 3 * c.getOptions().padding, o = {top: n.y - s,right: n.x + u.outerWidth(!0) * e + s,bottom: n.y + u.outerHeight(!0) * e + s,left: n.x - s};
                (t.clientX < o.left || t.clientX > o.right || t.clientY < o.top || t.clientY > o.bottom) && i()
            }
    }
    function a(t) {
        setTimeout(function() {
            r(t)
        }, 1)
    }
    function l() {
        d.dispatch(u)
    }
    t.delegate(e, "mouseover", o);
    var c = null, u = null, d = new signals.Signal;
    return {show: s,updated: d,layout: function() {
            c && c.layout()
        },destroy: function() {
            i(), d.dispose(), t.undelegate(e, "mouseover", o)
        }}
}, 

SL("components").ScrollShadow = Class.extend({
    init: function(t) {
        this.options = $.extend({threshold: 20,shadowSize: 10}, t), this.bind(), this.render(), this.layout()
    },bind: function() {
        this.layout = this.layout.bind(this), this.sync = this.sync.bind(this), $(window).on("resize", this.layout), this.options.contentElement.on("scroll", this.sync)
    },render: function() {
        this.shadowTop = $('<div class="sl-scroll-shadow-top">').appendTo(this.options.parentElement), this.shadowBottom = $('<div class="sl-scroll-shadow-bottom">').appendTo(this.options.parentElement), this.shadowTop.height(this.options.shadowSize), this.shadowBottom.height(this.options.shadowSize)
    },layout: function() {
        var t = this.options.parentElement.height(), e = this.options.footerElement ? this.options.footerElement.outerHeight() : 0, n = this.options.headerElement ? this.options.headerElement.outerHeight() : 0;
        (this.options.footerElement || this.options.headerElement) && this.options.contentElement.css("height", t - e - n), this.sync()
    },sync: function() {
        var t = this.options.footerElement ? this.options.footerElement.outerHeight() : 0, e = this.options.headerElement ? this.options.headerElement.outerHeight() : 0, n = this.options.contentElement.scrollTop(), i = this.options.contentElement.prop("scrollHeight"), s = this.options.contentElement.outerHeight(), o = i > s + this.options.threshold, r = n / (i - s);
        this.shadowTop.css({opacity: o ? r : 0,top: e}), this.shadowBottom.css({opacity: o ? 1 - r : 0,bottom: t})
    },destroy: function() {
        $(window).off("resize", this.layout), this.options.contentElement.off("scroll", this.sync), this.options = null
}}), 
SL("components").Search = Class.extend({
    init: function(t) {
        this.config = t, this.searchForm = $(".search .search-form"), this.searchFormInput = this.searchForm.find(".search-term"), this.searchFormSubmit = this.searchForm.find(".search-submit"), this.searchResults = $(".search .search-results"), this.searchResultsHeader = this.searchResults.find("header"), this.searchResultsTitle = this.searchResults.find(".search-results-title"), this.searchResultsSorting = this.searchResults.find(".search-results-sorting"), this.searchResultsList = this.searchResults.find("ul"), this.searchFormLoader = Ladda.create(this.searchFormSubmit.get(0)), this.bind(), this.checkQuery()
    },bind: function() {
        this.searchForm.on("submit", this.onSearchFormSubmit.bind(this)), this.searchResultsSorting.find("input[type=radio]").on("click", this.onSearchSortingChange.bind(this))
    },checkQuery: function() {
        var t = SL.util.getQuery();
        t.search && !this.searchFormInput.val() && (this.searchFormInput.val(t.search), t.page ? this.search(t.search, parseInt(t.page, 10)) : this.search(t.search))
    },renderSearchResults: function(t) {
        if ($(".search").removeClass("empty"), this.searchResults.show(), this.searchResultsList.empty(), this.renderSearchPagination(t), t.results && t.results.length) {
            this.searchResultsTitle.text(t.total + " " + SL.util.string.pluralize("result", "s", t.total > 1) + ' for "' + this.searchTerm + '"');
            for (var e = 0, n = t.results.length; n > e; e++)
                this.searchResultsList.append(SL.util.html.createDeckThumbnail(t.results[e]))
        } else
            this.searchResultsTitle.text(t.error || SL.locale.get("SEARCH_NO_RESULTS_FOR", {term: this.searchTerm}))
    },renderSearchPagination: function(t) {
        "undefined" == typeof t.decks_per_page && (t.decks_per_page = 8);
        var e = Math.ceil(t.total / t.decks_per_page);
        this.searchPagination && this.searchPagination.remove(), e > 1 && (this.searchPagination = $('<div class="search-results-pagination"></div>').appendTo(this.searchResultsHeader), this.searchPagination.append('<span class="page">' + SL.locale.get("SEARCH_PAGINATION_PAGE") + " " + this.searchPage + "/" + e + "</span>"), this.searchPage > 1 && this.searchPagination.append('<button class="button outline previous">' + SL.locale.get("PREVIOUS") + "</button>"), this.searchPagination.append('<button class="button outline next">' + SL.locale.get("NEXT") + "</button>"), this.searchPagination.find("button.previous").on("click", function() {
            this.search(this.searchTerm, Math.max(this.searchPage - 1, 1))
        }.bind(this)), this.searchPagination.find("button.next").on("click", function() {
            this.search(this.searchTerm, Math.min(this.searchPage + 1, e))
        }.bind(this)))
    },search: function(t, e, n) {
        if (this.searchTerm = t || this.searchFormInput.val(), this.searchPage = e || 1, this.searchSort = n || this.searchSort, window.history && "function" == typeof window.history.replaceState) {
            var i = "?search=" + escape(this.searchTerm);
            e > 1 && (i += "&page=" + e), window.history.replaceState(null, null, "/explore" + i)
        }
        this.searchSort || (this.searchSort = this.searchResultsSorting.find("input[type=radio]:checked").val()), this.searchResultsSorting.find("input[type=radio]").prop("checked", !1), this.searchResultsSorting.find("input[type=radio][value=" + this.searchSort + "]").prop("checked", !0), this.searchTerm ? (this.searchFormLoader.start(), $.ajax({type: "GET",url: this.config.url,context: this,data: {q: this.searchTerm,page: this.searchPage,sort: this.searchSort}}).done(function(t) {
            this.renderSearchResults(t)
        }).fail(function() {
            this.renderSearchResults({error: SL.locale.get("SEARCH_SERVER_ERROR")})
        }).always(function() {
            this.searchFormLoader.stop()
        })) : SL.notify(SL.locale.get("SEARCH_NO_TERM_ERROR"))
    },sort: function(t) {
        this.search(this.searchTerm, this.searchPage, t)
    },onSearchFormSubmit: function(t) {
        return this.search(), t.preventDefault(), !1
    },onSearchSortingChange: function() {
        this.sort(this.searchResultsSorting.find("input[type=radio]:checked").val())
    }}), 
SL("components").TemplatesPage = Class.extend({
    init: function(t) {
        this.options = t || {}, this.templateSelected = new signals.Signal, this.render()
    },render: function() {
        this.domElement = $('<div class="page" data-page-id="' + this.options.id + '">'), this.bodyElement = $('<div class="page-body">').appendTo(this.domElement), this.isEditable() && (this.domElement.addClass("has-footer"), this.footerElement = $('<div class="page-footer">').appendTo(this.domElement), this.addTemplateButton = $(['<div class="add-new-template ladda-button" data-style="zoom-out" data-spinner-color="#222" data-spinner-size="32">', '<span class="icon i-plus"></span>', "<span>Save current slide</span>", "</div>"].join("")), this.addTemplateButton.appendTo(this.footerElement), this.addTemplateButton.on("click", this.onTemplateCreateClicked.bind(this)), this.addTemplateButtonLoader = Ladda.create(this.addTemplateButton.get(0))), this.options.templates.forEach(this.renderTemplate.bind(this))
    },renderTemplate: function(t, e) {
        e = $.extend({prepend: !1}, e);
        var n = $('<div class="template-item">');
        n.html(['<div class="template-item-thumb themed">', '<div class="template-item-thumb-content reveal">', '<div class="slides">', t.get("html"), "</div>", '<div class="backgrounds"></div>', "</div>", "</div>"].join("")), n.data("data-template", t), n.on("vclick", this.onTemplateSelected.bind(this, n)), t.get("label") && n.append('<span class="template-item-label">' + t.get("label") + "</span>"), e.replaceTemplateAt ? this.bodyElement.find(".template-item").eq(e.replaceTemplateAt).replaceWith(n) : e.prepend ? this.bodyElement.prepend(n) : this.bodyElement.append(n);
        var i = n.find("section").attr("data-background-color"), s = n.find("section").attr("data-background-image"), o = n.find("section").attr("data-background-size"), r = $('<div class="slide-background present template-item-thumb-background">');
        if (r.addClass(n.find(".template-item-thumb .reveal section").attr("class")), r.appendTo(n.find(".template-item-thumb .reveal>.backgrounds")), (i || s) && (i && r.css("background-color", i), s && r.css("background-image", 'url("' + s + '")'), o && r.css("background-size", o)), this.isEditable()) {
            var a = $('<div class="template-item-delete"><span class="icon i-trash-stroke"></span></div>');
            a.attr("data-tooltip", "Delete this template"), a.on("vclick", this.onTemplateDeleteClicked.bind(this, n)), a.appendTo(n)
        }
    },refresh: function() {
        if (this.isDefaultTemplates()) {
            var t = SL.templates.DEFAULT_TEMPLATES_DUPLICATE_INDEX, e = this.options.templates.at(t);
            e && (e.set("html", SL.templates.templatize(Reveal.getCurrentSlide())), this.renderTemplate(e, {replaceTemplateAt: t}))
        }
        var n = SL.view.getCurrentTheme(), i = this.bodyElement.find(".template-item");
        if (i.length)
            i.each(function(t, e) {
                var i = $(e).find(".template-item-thumb");
                i.attr("class", i.attr("class").replace(/theme\-(font|color)\-([a-z0-9-])*/gi, "")), i.addClass("theme-font-" + n.get("font")), i.addClass("theme-color-" + n.get("color")), SL.templates.layoutTemplate(i.find("section"), !0)
            }), this.bodyElement.find(".placeholder").remove();
        else {
            var s = "You haven't saved any custom templates yet.";
            this.isTeamTemplates() && (s = "All templates that you save here will be made available to everyone in your team."), this.bodyElement.html('<p class="placeholder">' + s + "</p>")
        }
    },appendTo: function(t) {
        this.domElement.appendTo(t)
    },isEditable: function() {
        return this.isUserTemplates() || this.isTeamTemplates() && SL.current_user.isEnterpriseManager()
    },isDefaultTemplates: function() {
        return "default" === this.options.id
    },isUserTemplates: function() {
        return "user" === this.options.id
    },isTeamTemplates: function() {
        return "team" === this.options.id
    },onTemplateSelected: function(t, e) {
        e.preventDefault(), this.templateSelected.dispatch(t.data("data-template"))
    },onTemplateDeleteClicked: function(t, e) {
        return e.preventDefault(), SL.prompt({anchor: $(e.target),title: SL.locale.get("TEMPLATE_DELETE_CONFIRM"),type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        var e = t.data("data-template"), n = SL.config.AJAX_SLIDE_TEMPLATES_DELETE(e.get("id"));
                        this.isTeamTemplates() && (n = SL.config.AJAX_TEAM_SLIDE_TEMPLATES_DELETE(e.get("id"))), $.ajax({type: "DELETE",url: n,context: this}).done(function() {
                            t.remove(), this.refresh()
                        })
                    }.bind(this)}]}), !1
    },onTemplateCreateClicked: function() {
        var t = SL.config.AJAX_SLIDE_TEMPLATES_CREATE;
        this.isTeamTemplates() && (t = SL.config.AJAX_TEAM_SLIDE_TEMPLATES_CREATE);
        var e = SL.templates.templatize(Reveal.getCurrentSlide());
        return this.addTemplateButtonLoader.start(), $.ajax({type: "POST",url: t,context: this,data: {slide_template: {html: e}}}).done(function(t) {
            var e = this.options.templates.create(t, {prepend: !0});
            this.renderTemplate(e, {prepend: !0}), this.refresh(), this.addTemplateButtonLoader.stop(), SL.analytics.trackEditor(this.isTeamTemplates() ? "Saved team template" : "Saved user template")
        }).fail(function() {
            this.addTemplateButtonLoader.stop(), SL.notify(SL.locale.get("TEMPLATE_CREATE_ERROR"), "negative")
        }), !1
    }}), 
SL("components").Templates = Class.extend({
    init: function(t) {
        this.options = $.extend({alignment: "",width: 450,height: 730,arrowSize: 8}, t), this.pages = [], SL.templates.getUserTemplates(), SL.templates.getTeamTemplates(), this.render(), this.bind()
    },render: function() {
        this.domElement = $('<div class="sl-templates">'), this.innerElement = $('<div class="sl-templates-inner">').appendTo(this.domElement), this.headerElement = $('<div class="sl-templates-header">').appendTo(this.innerElement), this.bodyElement = $('<div class="sl-templates-body">').appendTo(this.innerElement), this.domElement.data("instance", this)
    },renderTemplates: function() {
        this.pages = [], this.headerElement.empty(), this.bodyElement.empty();
        {
            var t = SL.templates.getDefaultTemplates();
            SL.templates.getTeamTemplates()
        }
        this.renderPage("default", "Default", t), SL.templates.getUserTemplates(function(t) {
            this.renderPage("user", "User", t)
        }.bind(this)), SL.templates.getTeamTemplates(function(t) {
            (SL.current_user.isEnterpriseManager() || !t.isEmpty()) && this.renderPage("team", "Team", t)
        }.bind(this))
    },renderPage: function(t, e, n) {
        var i = $('<div class="page-tab" data-page-id="' + t + '">' + e + "</div>");
        i.on("vclick", function() {
            this.showPage(t), SL.analytics.trackEditor("Slide templates tab clicked", t)
        }.bind(this)), i.appendTo(this.headerElement);
        var s = new SL.components.TemplatesPage({id: t,templates: n});
        s.templateSelected.add(this.onTemplateSelected.bind(this)), s.appendTo(this.bodyElement), this.pages.push(s), this.domElement.attr("data-pages-total", this.pages.length), this.showPage("default")
    },showPage: function(t) {
        this.bodyElement.find(".page").removeClass("past present future"), this.bodyElement.find('.page[data-page-id="' + t + '"]').addClass("present"), this.bodyElement.find('.page[data-page-id="' + t + '"]').prevAll().addClass("past"), this.bodyElement.find('.page[data-page-id="' + t + '"]').nextAll().addClass("future"), this.headerElement.find(".page-tab").removeClass("selected"), this.headerElement.find('.page-tab[data-page-id="' + t + '"]').addClass("selected")
    },refreshPages: function() {
        this.pages.forEach(function(t) {
            t.refresh()
        })
    },bind: function() {
        this.layout = this.layout.bind(this), this.onKeyDown = this.onKeyDown.bind(this), this.onClicked = this.onClicked.bind(this), this.domElement.on("vclick", this.onClicked)
    },layout: function() {
        var t = 10, e = this.domElement.outerWidth(), n = this.domElement.outerHeight(), i = this.options.width, s = this.options.height, o = {};
        i = Math.min(i, n - 2 * t), s = Math.min(s, n - 2 * t), this.options.anchor && (o.left = this.options.anchor.offset().left, o.top = this.options.anchor.offset().top, o.width = this.options.anchor.outerWidth(), o.height = this.options.anchor.outerHeight(), o.right = o.left + o.width, o.bottom = o.top + o.height);
        var r, a;
        this.options.anchor && "r" === this.options.alignment ? (i = Math.min(i, o.left - 2 * t), r = o.left - i - this.options.arrowSize - t, a = o.top + o.height / 2 - s / 2) : this.options.anchor && "b" === this.options.alignment ? (s = Math.min(s, o.top - 2 * t), r = o.left + o.width / 2 - i / 2, a = o.top - s - this.options.arrowSize - t) : this.options.anchor && "l" === this.options.alignment ? (i = Math.min(i, e - o.right - 2 * t), r = o.right + this.options.arrowSize + t, a = o.top + o.height / 2 - s / 2) : (r = (e - i) / 2, a = (n - s) / 2), this.innerElement.css({width: i,height: s,left: r,top: a})
    },show: function(t) {
        this.options = $.extend(this.options, t), 0 === this.pages.length && this.renderTemplates(), this.domElement.attr("data-alignment", this.options.alignment), this.domElement.appendTo(document.body), $(window).on("resize", this.layout), SL.keyboard.keydown(this.onKeyDown), this.refreshPages(), this.layout()
    },hide: function() {
        this.domElement.detach(), $(window).off("resize", this.layout), SL.keyboard.release(this.onKeyDown)
    },onTemplateSelected: function(t) {
        this.options.callback && (this.hide(), this.options.callback(t.get("html")))
    },onKeyDown: function(t) {
        return 27 === t.keyCode ? (this.hide(), !1) : !0
    },onClicked: function(t) {
        $(t.target).is(this.domElement) && (t.preventDefault(), this.hide())
    },destroy: function() {
        $(window).off("resize", this.layout), SL.keyboard.release(this.onKeyDown), this.domElement.remove()
    }}),
SL("components").TextEditor = Class.extend({
        init: function(t) {
        this.options = $.extend({type: "",value: ""}, t), this.saved = new signals.Signal, this.canceled = new signals.Signal, this.render(), this.bind(), this.originalValue = this.options.value || "", "string" == typeof this.options.value && this.setValue(this.options.value), SL.editor.controllers.Capabilities.isTouchEditor() || this.focusInput()
    },render: function() {
        this.domElement = $('<div class="sl-text-editor">').appendTo(document.body), this.innerElement = $('<div class="sl-text-editor-inner">').appendTo(this.domElement), this.domElement.attr("data-type", this.options.type), "html" === this.options.type ? this.renderHTMLInput() : this.renderTextInput(), this.footerElement = $(['<div class="sl-text-editor-footer">', '<button class="button l outline white cancel-button">Cancel</button>', '<button class="button l positive save-button">Save</button>', "</div>"].join("")).appendTo(this.innerElement), setTimeout(function() {
            this.domElement.addClass("visible")
        }.bind(this), 1)
    },renderTextInput: function() {
        this.inputElement = $('<textarea class="sl-text-editor-input">').appendTo(this.innerElement), "code" === this.options.type && this.inputElement.tabby({tabString: "    "})
    },renderHTMLInput: function() {
        this.inputElement = $('<div class="editor sl-text-editor-input">').appendTo(this.innerElement), this.codeEditor && "function" == typeof this.codeEditor.destroy && (this.codeEditor.destroy(), this.codeEditor = null);
        try {
            this.codeEditor = ace.edit(this.inputElement.get(0)), this.codeEditor.setTheme("ace/theme/monokai"), this.codeEditor.setDisplayIndentGuides(!0), this.codeEditor.setShowPrintMargin(!1), this.codeEditor.getSession().setMode("ace/mode/html")
        } catch (t) {
            console.log("An error occurred while initializing the Ace editor.")
        }
    },bind: function() {
        this.footerElement.find(".save-button").on("click", this.save.bind(this)), this.footerElement.find(".cancel-button").on("click", this.cancel.bind(this)), this.onKeyDown = this.onKeyDown.bind(this), SL.keyboard.keydown(this.onKeyDown), this.onBackgroundClicked = this.onBackgroundClicked.bind(this), this.domElement.on("vclick", this.onBackgroundClicked)
    },save: function() {
        this.saved.dispatch(this.getValue()), this.destroy()
    },cancel: function() {
        var t = this.originalValue || "", e = this.getValue() || "";
        e !== t ? this.cancelPrompt || (this.cancelPrompt = SL.prompt({title: "Discard unsaved changes?",type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Discard</h3>",selected: !0,className: "negative",callback: function() {
                        this.canceled.dispatch(), this.destroy()
                    }.bind(this)}]}), this.cancelPrompt.destroyed.add(function() {
            this.cancelPrompt = null
        }.bind(this))) : (this.canceled.dispatch(), this.destroy())
    },focusInput: function() {
        this.codeEditor ? this.codeEditor.focus() : this.inputElement.focus()
    },setValue: function(t) {
        this.originalValue = t || "", this.codeEditor ? this.codeEditor.env.document.setValue(t) : this.inputElement.val(t)
    },getValue: function() {
        return this.codeEditor ? this.codeEditor.env.document.getValue() : this.inputElement.val()
    },onBackgroundClicked: function(t) {
        $(t.target).is(this.domElement) && (this.cancel(), t.preventDefault())
    },onKeyDown: function(t) {
        return 27 === t.keyCode ? (this.cancel(), !1) : (t.metaKey || t.ctrlKey) && 83 === t.keyCode ? (this.save(), !1) : !0
    },destroy: function() {
        this.saved.dispose(), this.canceled.dispose(), SL.keyboard.release(this.onKeyDown), this.domElement.remove()
    }}),
SL("components").ThemeOptions = Class.extend({
        init: function(t) {
        if (!t.container)
            throw "Cannot build theme options without container";
        if (!t.model)
            throw "Cannot build theme options without model";
        this.config = $.extend({center: !0,rollingLinks: !0,colors: SL.config.THEME_COLORS,fonts: SL.config.THEME_FONTS,transitions: SL.config.THEME_TRANSITIONS,backgroundTransitions: SL.config.THEME_BACKGROUND_TRANSITIONS}, t), this.theme = t.model, this.changed = new signals.Signal, this.render(), this.updateSelection(), this.toggleDeprecatedOptions(), this.scroll()
    },render: function() {
        this.domElement = $('<div class="sl-themeoptions">').appendTo(this.config.container), "string" == typeof this.config.className && this.domElement.addClass(this.config.className), this.config.themes && this.renderThemes(), (this.config.center || this.config.rollingLinks) && this.renderOptions(), this.config.colors && this.renderColors(), this.config.fonts && this.renderFonts(), this.config.transitions && this.renderTransitions(), this.config.backgroundTransitions && this.renderBackgroundTransitions()
    },renderThemes: function() {
        if (this.config.themes && !this.config.themes.isEmpty()) {
            var t = $('<div class="section selector theme"><h3>Theme</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
            e.append(['<li data-theme="" class="custom">', '<span class="thumb-icon icon i-equalizer"></span>', '<span class="thumb-label">Custom</span>', "</li>"].join("")), this.config.themes.forEach(function(t) {
                var n = $('<li data-theme="' + t.get("id") + '"><span class="thumb-label" title="' + t.get("name") + '">' + t.get("name") + "</span></li>").appendTo(e);
                t.hasThumbnail() && n.css("background-image", 'url("' + t.get("thumbnail_url") + '")')
            }), this.domElement.find(".theme li").on("vclick", this.onThemeClicked.bind(this))
        }
    },renderOptions: function() {
        var t = $('<div class="section options"><h3>Options</h3></div>').appendTo(this.domElement), e = $('<div class="options"></div>').appendTo(t);
        this.config.center && (e.append('<div class="unit sl-checkbox outline"><input id="theme-center" value="center" type="checkbox"><label for="theme-center" data-tooltip="Center slide contents vertically (not visible while editing)" data-tooltip-maxwidth="220" data-tooltip-delay="500">Vertical centering</label></div>'), t.find("#theme-center").on("change", this.onOptionChanged.bind(this))), this.config.rollingLinks && (e.append('<div class="unit sl-checkbox outline"><input id="theme-rolling_links" value="rolling_links" type="checkbox"><label for="theme-rolling_links" data-tooltip="Use a 3D hover effect on links" data-tooltip-maxwidth="220" data-tooltip-delay="500">Rolling links</label></div>'), t.find("#theme-rolling_links").on("change", this.onOptionChanged.bind(this)))
    },renderColors: function() {
        var t = $('<div class="section selector color"><h3>Color</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
        this.config.colors.forEach(function(t) {
            var n = $('<li data-color="' + t.id + '"><div class="theme-body-color-block"></div><div class="theme-link-color-block"></div></li>');
            n.addClass("theme-color-" + t.id), n.addClass("themed"), n.appendTo(e), t.tooltip && n.attr({"data-tooltip": t.tooltip,"data-tooltip-delay": 250,"data-tooltip-maxwidth": 300}), !SL.current_user.isPro() && t.pro && n.attr("data-pro", "true")
        }.bind(this)), this.domElement.find(".color li").on("vclick", this.onColorClicked.bind(this))
    },renderFonts: function() {
        var t = $('<div class="section selector font"><h3>Typography</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
        this.config.fonts.forEach(function(t) {
            var n = $('<li data-font="' + t.id + '" data-name="' + t.title + '"><div class="themed"><h1>' + t.title + "</h1><a>Type</a></div></li>");
            n.addClass("theme-font-" + t.id), n.appendTo(e), t.tooltip && n.attr({"data-tooltip": t.tooltip,"data-tooltip-delay": 250,"data-tooltip-maxwidth": 300})
        }.bind(this)), this.domElement.find(".font li").on("vclick", this.onFontClicked.bind(this))
    },renderTransitions: function() {
        var t = $('<div class="section selector transition"><h3>Transition</h3><ul></ul></div>').appendTo(this.domElement), e = t.find("ul");
        this.config.transitions.forEach(function(t) {
            var n = $('<li data-transition="' + t.id + '"></li>').appendTo(e);
            t.deprecated === !0 && n.addClass("deprecated")
        }.bind(this)), this.domElement.find(".transition li").on("vclick", this.onTransitionClicked.bind(this))
    },renderBackgroundTransitions: function() {
        var t = $('<div class="section selector background-transition"></div>').appendTo(this.domElement);
        t.append('<h3>Background Transition <span class="icon i-info info-icon" data-tooltip="Background transitions apply when navigating to or from a slide that has a background image or color." data-tooltip-maxwidth="250"></span></h3>'), t.append("<ul>");
        var e = t.find("ul");
        this.config.backgroundTransitions.forEach(function(t) {
            var n = $('<li data-background-transition="' + t.id + '"></li>').appendTo(e);
            t.deprecated === !0 && n.addClass("deprecated")
        }.bind(this)), this.domElement.find(".background-transition li").on("vclick", this.onBackgroundTransitionClicked.bind(this))
    },populate: function(t) {
        t && (this.theme = t, this.updateSelection(), this.toggleDeprecatedOptions(), this.scroll())
    },scroll: function() {
        var t = this.domElement.find(".background-transition li.selected").get(0), e = this.domElement.find(".transition li.selected").get(0), n = this.domElement.find(".color li.selected").get(0), i = this.domElement.find(".font li.selected").get(0);
        SL.util.dom.scrollIntoViewIfNeeded(t, !0), SL.util.dom.scrollIntoViewIfNeeded(e, !0), SL.util.dom.scrollIntoViewIfNeeded(n, !0), SL.util.dom.scrollIntoViewIfNeeded(i, !0), this.domElement.scrollTop(0)
    },updateSelection: function() {
        this.config.themes && !this.config.themes.isEmpty() && this.domElement.toggleClass("using-theme", this.theme.has("id")), this.config.center && this.domElement.find("#theme-center").prop("checked", 1 == this.theme.get("center")), this.config.rollingLinks && this.domElement.find("#theme-rolling_links").prop("checked", 1 == this.theme.get("rolling_links")), this.domElement.find(".theme li").removeClass("selected"), this.domElement.find(".theme li[data-theme=" + this.theme.get("id") + "]").addClass("selected"), 0 !== this.domElement.find(".theme li.selected").length || this.theme.has("id") || this.domElement.find('.theme li[data-theme=""]').addClass("selected"), this.domElement.find(".color li").removeClass("selected"), this.domElement.find(".color li[data-color=" + this.theme.get("color") + "]").addClass("selected"), this.domElement.find(".font li").removeClass("selected"), this.domElement.find(".font li[data-font=" + this.theme.get("font") + "]").addClass("selected"), this.domElement.find(".font li").each(function(t, e) {
            SL.util.html.removeClasses(e, function(t) {
                return t.match(/^theme\-color\-/gi)
            }), $(e).addClass("theme-color-" + this.theme.get("color"))
        }.bind(this)), this.domElement.find(".transition li").removeClass("selected"), this.domElement.find(".transition li[data-transition=" + this.theme.get("transition") + "]").addClass("selected"), this.domElement.find(".background-transition li").removeClass("selected"), this.domElement.find(".background-transition li[data-background-transition=" + this.theme.get("background_transition") + "]").addClass("selected")
    },applySelection: function() {
        SL.helpers.ThemeController.paint(this.theme, {center: !1,js: !1})
    },toggleDeprecatedOptions: function() {
        this.domElement.find(".transition .deprecated").toggle(this.theme.isTransitionDeprecated()), this.domElement.find(".background-transition .deprecated").toggle(this.theme.isBackgroundTransitionDeprecated())
    },getTheme: function() {
        return this.theme
    },onThemeClicked: function(t) {
        var e = $(t.currentTarget).data("theme");
        if (e) {
            var n = this.config.themes.getByProperties({id: e});
            n ? this.theme = n.clone() : SL.notify("Could not find theme data", "negative")
        } else
            this.theme.set("id", null), this.theme.set("js", null), this.theme.set("css", null), this.theme.set("less", null), this.theme.set("html", null);
        this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Theme option selected"), this.changed.dispatch()
    },onOptionChanged: function() {
        this.theme.set("center", this.domElement.find("#theme-center").is(":checked")), this.theme.set("rolling_links", this.domElement.find("#theme-rolling_links").is(":checked")), this.updateSelection(), this.applySelection(), this.changed.dispatch()
    },onColorClicked: function(t) {
        return t.preventDefault(), $(t.currentTarget).is("[data-pro]") ? void window.open("/pricing") : (this.theme.set("color", $(t.currentTarget).data("color")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Color option selected", this.theme.get("color")), void this.changed.dispatch())
    },onFontClicked: function(t) {
        t.preventDefault(), this.theme.set("font", $(t.currentTarget).data("font")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Font option selected", this.theme.get("font")), this.changed.dispatch()
    },onTransitionClicked: function(t) {
        t.preventDefault(), this.theme.set("transition", $(t.currentTarget).data("transition")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Transition option selected", this.theme.get("transition")), this.changed.dispatch()
    },onBackgroundTransitionClicked: function(t) {
        t.preventDefault(), this.theme.set("background_transition", $(t.currentTarget).data("background-transition")), this.updateSelection(), this.applySelection(), SL.analytics.trackTheming("Background transition option selected", this.theme.get("background_transition")), this.changed.dispatch()
    },destroy: function() {
        this.changed.dispose(), this.domElement.remove(), this.theme = null, this.config = null
    }}), 

SL.tooltip = function() {
    function t() {
        r = $("<div>").addClass("sl-tooltip"), a = $('<p class="sl-tooltip-inner">').appendTo(r), l = $('<div class="sl-tooltip-arrow">').appendTo(r), c = $('<div class="sl-tooltip-arrow-fill">').appendTo(l), e()
    }
    function e() {
        i = i.bind(this), $(document).on("keydown, mousedown", function() {
            SL.tooltip.hide()
        }), SL.util.device.IS_PHONE || SL.util.device.IS_TABLET || ($(document.body).delegate("[data-tooltip]", "mouseenter", function(t) {
            var e = $(t.currentTarget);
            if (!e.is("[no-tooltip]")) {
                var i = e.attr("data-tooltip"), s = e.attr("data-tooltip-delay"), o = e.attr("data-tooltip-align"), r = e.attr("data-tooltip-alignment"), a = e.attr("data-tooltip-maxwidth"), l = e.attr("data-tooltip-maxheight"), c = e.attr("data-tooltip-ox"), u = e.attr("data-tooltip-oy"), d = e.attr("data-tooltip-x"), h = e.attr("data-tooltip-y");
                if (i) {
                    var p = {anchor: e,align: o,alignment: r,delay: parseInt(s, 10),maxwidth: parseInt(a, 10),maxheight: parseInt(l, 10)};
                    c && (p.ox = parseFloat(c)), u && (p.oy = parseFloat(u)), d && h && (p.x = parseFloat(d), p.y = parseFloat(h), p.anchor = null), n(i, p)
                }
            }
        }), $(document.body).delegate("[data-tooltip]", "mouseleave", s))
    }
    function n(t, e) {
        if (!SL.util.device.IS_PHONE && !SL.util.device.IS_TABLET) {
            u = e || {}, clearTimeout(p);
            var s = Date.now() - f;
            if ("number" == typeof u.delay && s > 500)
                return p = setTimeout(n.bind(this, t, u), u.delay), void delete u.delay;
            r.css("opacity", 0), r.appendTo(document.body), a.html(t), r.css("max-width", u.maxwidth ? u.maxwidth : null), r.css("max-height", u.maxheight ? u.maxheight : null), u.align && r.css("text-align", u.align), i(), r.stop(!0, !0).animate({opacity: 1}, {duration: 150}), $(window).on("resize scroll", i)
        }
    }
    function i() {
        var t = $(u.anchor);
        if (t.length) {
            var e = u.alignment || "auto", n = 10, i = $(window).scrollLeft(), s = $(window).scrollTop(), o = t.offset();
            o.x = o.left, o.y = o.top, u.anchor.parents(".reveal .slides").length && "undefined" != typeof window.Reveal && (o = SL.util.getRevealElementGlobalOffset(u.anchor));
            var c = t.outerWidth(), p = t.outerHeight(), f = a.outerWidth(), m = a.outerHeight(), g = o.x - $(window).scrollLeft(), v = o.y - $(window).scrollTop(), y = f / 2, b = m / 2;
            switch ("number" == typeof u.ox && (g += u.ox), "number" == typeof u.oy && (v += u.oy), "auto" === e && (e = o.y - (m + n + d) < s ? "b" : "t"), e) {
                case "t":
                    g += (c - f) / 2, v -= m + d + h;
                    break;
                case "b":
                    g += (c - f) / 2, v += p + d + h;
                    break;
                case "l":
                    g -= f + d + h, v += (p - m) / 2;
                    break;
                case "r":
                    g += c + d + h, v += (p - m) / 2
            }
            g = Math.min(Math.max(g, n), window.innerWidth - f - n), v = Math.min(Math.max(v, n), window.innerHeight - m - n);
            var S = d + 3;
            switch (e) {
                case "t":
                    y = o.x - g - i + c / 2, b = m, y = Math.min(Math.max(y, S), f - S);
                    break;
                case "b":
                    y = o.x - g - i + c / 2, b = -d, y = Math.min(Math.max(y, S), f - S);
                    break;
                case "l":
                    y = f, b = o.y - v - s + p / 2, b = Math.min(Math.max(b, S), m - S);
                    break;
                case "r":
                    y = -d, b = o.y - v - s + p / 2, b = Math.min(Math.max(b, S), m - S)
            }
            l.css({left: Math.round(y),top: Math.round(b)}), r.css({left: Math.round(g),top: Math.round(v)}).attr("data-alignment", e)
        }
    }
    function s() {
        o() && (f = Date.now()), clearTimeout(p), r.remove().stop(!0, !0), $(window).off("resize scroll", i)
    }
    function o() {
        return r.parent().length > 0
    }
    var r, a, l, c, u, d = 6, h = 4, p = -1, f = -1;
    return t(), {show: function(t, e) {
            n(t, e)
        },hide: function() {
            s()
        },anchorTo: function(t, e, n) {
            var i = {};
            "undefined" != typeof e && (i["data-tooltip"] = e), "number" == typeof n.delay && (i["data-tooltip-delay"] = n.delay), "string" == typeof n.alignment && (i["data-tooltip-alignment"] = n.alignment), $(t).attr(i)
        }}
}(), 
SL("components").Tutorial = Class.extend({
    init: function(t) {
        this.options = $.extend({steps: []}, t), this.options.steps.forEach(function(t) {
            "undefined" == typeof t.backwards && (t.backwards = function() {
            }), "undefined" == typeof t.forwards && (t.forwards = function() {
            })
        }), this.skipped = new signals.Signal, this.finished = new signals.Signal, this.index = -1, this.render(), this.bind(), this.layout(), this.paint(), this.controlsButtons.css("width", this.controlsButtons.outerWidth() + 10)
    },render: function() {
        this.domElement = $('<div class="sl-tutorial">'), this.domElement.appendTo(document.body), this.canvas = $('<canvas class="sl-tutorial-canvas">'), this.canvas.appendTo(this.domElement), this.canvas = this.canvas.get(0), this.context = this.canvas.getContext("2d"), this.controls = $('<div class="sl-tutorial-controls">'), this.controls.appendTo(this.domElement), this.controlsInner = $('<div class="sl-tutorial-controls-inner">'), this.controlsInner.appendTo(this.controls), this.renderPagination(), this.controlsButtons = $('<div class="sl-tutorial-buttons">'), this.controlsButtons.appendTo(this.controlsInner), this.nextButton = $('<button class="button no-transition positive l sl-tutorial-next">Next</button>'), this.nextButton.appendTo(this.controlsButtons), this.skipButton = $('<button class="button no-transition outline white l sl-tutorial-skip">Skip tutorial</button>'), this.skipButton.appendTo(this.controlsButtons), this.messageElement = $('<div class="sl-tutorial-message no-transition">').hide(), this.messageElement.appendTo(this.domElement)
    },renderPagination: function() {
        this.pagination = $('<div class="sl-tutorial-pagination">'), this.pagination.appendTo(this.controlsInner), this.options.steps.forEach(function(t, e) {
            $('<li class="sl-tutorial-pagination-number">').appendTo(this.pagination).on("click", this.step.bind(this, e))
        }.bind(this))
    },updatePagination: function() {
        this.pagination.find(".sl-tutorial-pagination-number").each(function(t, e) {
            e = $(e), e.toggleClass("past", t < this.index), e.toggleClass("present", t === this.index), e.toggleClass("future", t > this.index)
        }.bind(this))
    },bind: function() {
        this.onKeyDown = this.onKeyDown.bind(this), this.onSkipClicked = this.onSkipClicked.bind(this), this.onWindowResize = this.onWindowResize.bind(this), SL.keyboard.keydown(this.onKeyDown), this.skipButton.on("click", this.onSkipClicked), this.nextButton.on("click", this.next.bind(this)), $(window).on("resize", this.onWindowResize)
    },prev: function() {
        this.step(Math.max(this.index - 1, 0))
    },next: function() {
        this.index + 1 >= this.options.steps.length ? (this.finished.dispatch(), this.destroy()) : this.step(Math.min(this.index + 1, this.options.steps.length - 1))
    },step: function(t) {
        if (this.index < t) {
            for (; this.index < t; )
                this.index += 1, this.options.steps[this.index].forwards.call(this.options.context);
            this.index + 1 === this.options.steps.length && (this.skipButton.hide(), this.nextButton.text("Get started"), this.domElement.addClass("last-step"))
        } else if (this.index > t) {
            for (this.index + 1 === this.options.steps.length && (this.skipButton.show(), this.nextButton.text("Next"), this.domElement.removeClass("last-step")); this.index > t; )
                this.options.steps[this.index].backwards.call(this.options.context), this.index -= 1;
            this.options.steps[this.index].forwards.call(this.options.context)
        }
        this.updatePagination()
    },layout: function() {
        this.width = window.innerWidth, this.height = window.innerHeight;
        if (this.cutoutElement) {
            var t = this.cutoutElement.offset();
            this.cutoutRect = {x: t.left - this.cutoutPadding,y: t.top - this.cutoutPadding,width: this.cutoutElement.outerWidth() + 2 * this.cutoutPadding,height: this.cutoutElement.outerHeight() + 2 * this.cutoutPadding}
        }
        if (this.messageElement.is(":visible")) {
            var e = 20, n = this.messageElement.outerWidth(), i = this.messageElement.outerHeight(), s = {left: (window.innerWidth - n) / 2,top: (window.innerHeight - i) / 2};
            if (this.messageOptions.anchor && this.messageOptions.alignment) {
                var o = this.messageOptions.anchor.offset(), r = this.messageOptions.anchor.outerWidth(), a = this.messageOptions.anchor.outerHeight();
                switch (this.messageOptions.alignment) {
                    case "t":
                        s.left = o.left + (r - n) / 2, s.top = o.top - i - e;
                        break;
                    case "r":
                        s.left = o.left + r + e, s.top = o.top + (a - i) / 2;
                        break;
                    case "b":
                        s.left = o.left + (r - n) / 2, s.top = o.top + a + e;
                        break;
                    case "l":
                        s.left = o.left - n - e, s.top = o.top + (a - i) / 2
                }
            }
            var l = "translate(" + Math.round(s.left) + "px," + Math.round(s.top) + "px)";
            this.messageElement.css({"-webkit-transform": l,"-moz-transform": l,"-ms-transform": l,transform: l}), setTimeout(function() {
                this.messageElement.removeClass("no-transition")
            }.bind(this), 1)
        }
    },paint: function() {
        this.canvas.width = this.width, this.canvas.height = this.height, this.context.clearRect(0, 0, this.width, this.height), this.context.fillStyle = "rgba( 0, 0, 0, 0.7 )", this.context.fillRect(0, 0, this.width, this.height), this.cutoutElement && (this.context.clearRect(this.cutoutRect.x, this.cutoutRect.y, this.cutoutRect.width, this.cutoutRect.height), this.context.strokeStyle = "#ddd", this.context.lineWidth = 1, this.context.strokeRect(this.cutoutRect.x + .5, this.cutoutRect.y + .5, this.cutoutRect.width - 1, this.cutoutRect.height - 1))
    },cutout: function(t, e) {
        e = e || {}, this.cutoutElement = t, this.cutoutPadding = e.padding || 0, this.layout(), this.paint()
    },clearCutout: function() {
        this.cutoutElement = null, this.cutoutPadding = 0, this.paint()
    },message: function(t, e) {
        this.messageOptions = $.extend({maxWidth: 320,alignment: ""}, e), this.messageElement.html(t).show(), this.messageElement.css("max-width", this.messageOptions.maxWidth), this.messageElement.attr("data-alignment", this.messageOptions.alignment), this.layout(), this.paint()
    },clearMessage: function() {
        this.messageElement.hide(), this.messageOptions = {}
    },hasNextStep: function() {
        return this.index + 1 < this.options.steps.length
    },destroy: function() {
        this.destroyed || (this.destroyed = !0, $(window).off("resize", this.onWindowResize), this.skipped.dispose(), this.finished.dispose(), SL.keyboard.release(this.onKeyDown), this.domElement.fadeOut(400, this.domElement.remove))
    },onKeyDown: function(t) {
        return 37 === t.keyCode || 8 === t.keyCode ? this.prev() : (39 === t.keyCode || 32 === t.keyCode) && this.next(), !1
    },onSkipClicked: function() {
        this.skipped.dispatch(), this.destroy()
    },onWindowResize: function() {
        this.layout(), this.paint()
    }}),
    SL("views").Base = Class.extend({
        init: function() {
        this.header = new SL.components.Header, this.setupAce(), this.handleLogos(), this.handleOutlines(), this.handleFeedback(), this.handleWindowClose(), this.handleAutoRefresh(), this.parseTimes(), this.parseLinks(), this.parseMeters(), this.parseSpinners(), this.parseNotifications(), this.parseScrollLinks(), setInterval(this.parseTimes.bind(this), 12e4)
    },setupAce: function() {
        "object" == typeof window.ace && "object" == typeof window.ace.config && "function" == typeof window.ace.config.set && ace.config.set("workerPath", "/assets")
    },handleLogos: function() {
        setTimeout(function() {
            $(".logo-animation").addClass("open")
        }, 600)
    },handleOutlines: function() {
        var t = $("<style>").appendTo("head").get(0), e = function(e) {
            t.styleSheet ? t.styleSheet.cssText = e : t.innerHTML = e
        };
        $(document).on("mousedown", function() {
            e("a, button, .sl-select, .sl-checkbox label, .radio label { outline: none !important; }")
        }), $(document).on("keydown", function() {
            e("")
        })
    },handleFeedback: function() {
        $("html").on("click", "[data-feedback-mode]", function(t) {
            var e = $(this), n = {target: this,mode: e.attr("data-feedback-mode") || "contact",position: e.attr("data-feedback-position") || "top",screenshot_enabled: e.attr("data-feedback-screenshot_enabled") || "true",smartvote_enabled: e.attr("data-feedback-smartvote-enabled") || "true",ticket_custom_fields: {}};
            SL.current_deck && (n.ticket_custom_fields["Deck ID"] = SL.current_deck.get("id"), n.ticket_custom_fields["Deck Slug"] = SL.current_deck.get("slug"), n.ticket_custom_fields["Deck Version"] = SL.current_deck.get("version"), n.ticket_custom_fields["Deck Font"] = SL.current_deck.get("theme_font"), n.ticket_custom_fields["Deck Color"] = SL.current_deck.get("theme_color"), n.ticket_custom_fields["Deck Transition"] = SL.current_deck.get("transition"), n.ticket_custom_fields["Deck Background Transition"] = SL.current_deck.get("backgroundTransition"));
            var i = e.attr("data-feedback-type");
            i && i.length && (n.ticket_custom_fields.Type = i);
            var s = e.attr("data-feedback-contact-title");
            s && s.length && (n.contact_title = s), UserVoice.push(["show", n]), t.preventDefault()
        })
    },handleWindowClose: function() {
        var t = SL.util.getQuery();
        if (t && t.autoclose && window.opener) {
            var e = parseInt(t.autoclose, 10) || 0;
            setTimeout(function() {
                try {
                    window.close()
                } catch (t) {
                }
            }, e)
        }
    },handleAutoRefresh: function() {
        var t = SL.util.getQuery();
        if (t && t.autoRefresh) {
            var e = parseInt(t.autoRefresh, 10);
            !isNaN(e) && e > 0 && setTimeout(function() {
                window.location.reload()
            }, e)
        }
    },parseTimes: function() {
        $("time.ago").each(function() {
            var t = $(this).attr("datetime");
            t && $(this).text(moment.utc(t).fromNow())
        }), $("time.date").each(function() {
            var t = $(this).attr("datetime");
            t && $(this).text(moment.utc(t).format("MMM Do, YYYY"))
        })
    },parseLinks: function() {
        $(".linkify").each(function() {
            $(this).html(SL.util.string.linkify($(this).text()))
        })
    },parseMeters: function() {
        $(".sl-meter").each(function() {
            new SL.components.Meter($(this))
        })
    },parseSpinners: function() {
        SL.util.html.generateSpinners()
    },parseNotifications: function() {
        var t = $(".flash-notification");
        t.length && SL.notify(t.remove().text(), t.attr("data-notification-type"))
    },parseScrollLinks: function() {
        $(document).delegate("a[data-scroll-to]", "click", function(t) {
            var e = t.currentTarget, n = $(e.getAttribute("href")), i = parseInt(e.getAttribute("data-scroll-to-offset"), 10), s = parseInt(e.getAttribute("data-scroll-to-duration"), 10);
            isNaN(i) && (i = -20), isNaN(s) && (s = 1e3), n.length && $("html, body").animate({scrollTop: n.offset().top + i}, s), t.preventDefault()
        })
    }}),
    SL("views.decks").EditRequiresUpgrade = SL.views.Base.extend({
            init: function() {
        this._super(), this.makePublicButton = $(".make-deck-public").first(), this.makePublicButton.on("click", this.onMakePublicClicked.bind(this)), this.makePublicLoader = Ladda.create(this.makePublicButton.get(0))
    },makeDeckPublic: function() {
        var t = {type: "POST",url: SL.config.AJAX_PUBLISH_DECK(SL.current_deck.get("id")),context: this,data: {visibility: SL.models.Deck.VISIBILITY_ALL}};
        this.makePublicLoader.start(), $.ajax(t).done(function() {
            window.location = SL.routes.DECK_EDIT(SL.current_user.get("username"), SL.current_deck.get("slug"))
        }).fail(function() {
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative"), this.makePublicLoader.stop()
        })
    },onMakePublicClicked: function(t) {
        t.preventDefault(), this.makeDeckPublic()
    }}),
    SL("views.decks").Embed = SL.views.Base.extend({
        init: function() {
        this._super(), this.footerElement = $(".embed-footer"), this.revealElement = $(".reveal"), SL.util.setupReveal({embedded: !0,openLinksInTabs: !0,trackEvents: !0}), $(window).on("resize", this.layout.bind(this)), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", this.layout.bind(this)), this.footerElement.find(".fullscreen").on("click", this.onFullScreenClicked.bind(this));
        var t = SL.util.getQuery().style;
        "hidden" !== t || SL.current_deck.isPro() || (t = null), t && $("html").attr("data-embed-style", t), Modernizr.fullscreen === !1 && this.footerElement.find(".fullscreen").hide(), this.layout()
    },layout: function() {
        this.revealElement.height(this.footerElement.is(":visible") ? window.innerHeight - $(".embed-footer").height() : "100%"), Reveal.layout()
    },onFullScreenClicked: function() {
        var t = $("html").get(0);
        return t ? (SL.helpers.Fullscreen.enter(t), !1) : void 0
    }}),
    SL("views.decks").Fullscreen = SL.views.Base.extend({
        init: function() {
        this._super(), SL.util.setupReveal({history: !navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi),openLinksInTabs: !0,trackEvents: !0})
    }}),
    SL("views.decks").LiveClient = SL.views.Base.extend({
        init: function() {
        this._super(), SL.util.setupReveal({touch: !1,history: !1,keyboard: !1,controls: !1,progress: !1,autoSlide: 0,openLinksInTabs: !0,trackEvents: !0}), this.stream = new SL.helpers.StreamLive, this.stream.ready.add(this.onStreamReady.bind(this)), this.stream.stateChanged.add(this.onStreamStateChanged.bind(this)), this.stream.statusChanged.add(this.onStreamStatusChanged.bind(this)), this.render(), this.bind(), this.setPresentControls(SL.current_deck.user_settings.get("present_controls")), this.setPresentUpsizing(SL.current_deck.user_settings.get("present_upsizing")), this.stream.connect()
    },render: function() {
        var t = SL.current_deck.get("user"), e = SL.routes.DECK(t.username, SL.current_deck.get("slug")), n = t.thumbnail_url;
        this.summaryBubble = $(['<a class="summary-bubble" href="' + e + '" target="_blank">', '<div class="summary-bubble-picture" style="background-image: url(' + n + ')"></div>', '<div class="summary-bubble-content"></div>', "</a>"].join("")).appendTo(document.body), this.summaryBubbleContent = this.summaryBubble.find(".summary-bubble-content"), this.renderUserSummary()
    },renderUserSummary: function() {
        var t = SL.current_deck.get("user");
        this.summaryBubbleContent.html(["<h4>" + SL.current_deck.get("title") + "</h4>", "<p>By " + (t.name || t.username) + "</p>"].join(""))
    },renderWaitingSummary: function() {
        this.summaryBubbleContent.html(["<h4>Waiting for presenter</h4>", '<p class="retry-status"></p>'].join("")), this.summaryBubbleRetryStatus = this.summaryBubbleContent.find(".retry-status")
    },renderConnectionLostSummary: function() {
        this.summaryBubbleContent.html(["<h4>Connection lost</h4>", "<p>Attempting to reconnect</p>"].join(""))
    },startUpdatingTimer: function() {
        var t = function() {
            if (this.summaryBubbleRetryStatus && this.summaryBubbleRetryStatus.length) {
                var t = Date.now() - this.stream.getRetryStartTime(), e = Math.ceil((SL.helpers.StreamLive.CONNECTION_RETRY_INTERVAL - t) / 1e3);
                this.summaryBubbleRetryStatus.text(isNaN(e) ? "Retrying" : e > 0 ? "Retrying in " + e + "s" : "Retrying now")
            }
        }.bind(this);
        clearInterval(this.updateTimerInterval), this.updateTimerInterval = setInterval(t, 100), t()
    },stopUpdatingTimer: function() {
        clearInterval(this.updateTimerInterval)
    },bind: function() {
        this.summaryBubble.on("mouseover", this.expandSummary.bind(this)), this.summaryBubble.on("mouseout", this.collapseSummary.bind(this))
    },expandSummary: function(t) {
        clearTimeout(this.collapseSummaryTimeout);
        var e = window.innerWidth - (this.summaryBubbleContent.find("h4, p").offset().left + 40);
        e = Math.min(e, 400), this.summaryBubbleContent.find("h4, p").css("max-width", e), this.summaryBubble.width(this.summaryBubble.height() + this.summaryBubbleContent.outerWidth()), "number" == typeof t && (this.collapseSummaryTimeout = setTimeout(this.collapseSummary.bind(this), t))
    },expandSummaryError: function() {
        this.summaryBubbleError = !0, this.expandSummary()
    },collapseSummary: function() {
        this.summaryBubbleError || (clearTimeout(this.collapseSummaryTimeout), this.summaryBubble.width(this.summaryBubble.height()))
    },setPresentControls: function(t) {
        "boolean" != typeof t && (upsizing = SL.config.PRESENT_CONTROLS_DEFAULT), this.summaryBubble.toggle(t)
    },setPresentUpsizing: function(t) {
        "boolean" != typeof t && (upsizing = SL.config.PRESENT_UPSIZING_DEFAULT), Reveal.configure({maxScale: t ? SL.config.PRESENT_UPSIZING_MAX_SCALE : 1})
    },onStreamReady: function() {
        this.expandSummary(5e3)
    },onStreamStateChanged: function(t) {
        t && "boolean" == typeof t.present_controls && this.setPresentControls(t.present_controls), t && "boolean" == typeof t.present_upsizing && this.setPresentUpsizing(t.present_upsizing)
    },onStreamStatusChanged: function(t) {
        t === SL.helpers.StreamLive.STATUS_WAITING_FOR_PUBLISHER ? (this.renderWaitingSummary(), this.expandSummaryError(), this.startUpdatingTimer()) : t === SL.helpers.StreamLive.STATUS_CONNECTION_LOST ? (this.renderConnectionLostSummary(), this.expandSummaryError(), this.stopUpdatingTimer()) : (this.summaryBubbleError = !1, this.renderUserSummary(), this.stopUpdatingTimer())
    }}),
    SL("views.decks").LiveServer = SL.views.Base.extend({
        init: function() {
        this._super(), SL.util.setupReveal({history: !0,openLinksInTabs: !0,controls: SL.current_user.settings.get("present_controls"),progress: SL.current_user.settings.get("present_controls"),maxScale: SL.current_user.settings.get("present_upsizing") ? SL.config.PRESENT_UPSIZING_MAX_SCALE : 1}), this.stream = new SL.helpers.StreamLive({publisher: !0}), this.stream.connect(), this.render()
    },render: function() {
        var t = SL.current_deck.getTokenedAbsoluteURL("live"), e = SL.current_deck.getTokenedAbsoluteURL("speaker"), n = "http://help.slides.com/knowledgebase/articles/333924", i = "http://help.slides.com/knowledgebase/articles/333923";
        this.presentationControls = $(['<aside class="presentation-controls">', '<div class="presentation-controls-content">', "<h2>Presentation Controls</h2>", '<div class="presentation-controls-section">', "<h2>Speaker View</h2>", '<p>The control panel for your presentation. Includes speaker notes, an upcoming slide preview and more. It can be used as a remote control when opened from a mobile device. <a href="' + i + '" target="_blank">Learn more.</a></p>', '<a class="button l outline" href="' + e + '" target="_blank">Open speaker view</a>', "</div>", '<div class="presentation-controls-section">', "<h2>Present Live</h2>", '<p>Share this link with your audience to have them follow along with the presentation in real-time. <a href="' + n + '" target="_blank">Learn more.</a></p>', '<input class="live-view-url input-field" type="text" value="' + t + '" readonly />', "</div>", '<div class="presentation-controls-section sl-form">', "<h2>Options</h2>", '<div class="sl-checkbox outline fullscreen-toggle">', '<input id="fullscreen-checkbox" type="checkbox">', '<label for="fullscreen-checkbox">Fullscreen</label>', "</div>", '<div class="sl-checkbox outline controls-toggle" data-tooltip="Hide the presentation control arrows and progress bar." data-tooltip-alignment="r" data-tooltip-delay="500" data-tooltip-maxwidth="250">', '<input id="controls-checkbox" type="checkbox">', '<label for="controls-checkbox">Hide controls</label>', "</div>", '<div class="sl-checkbox outline upsizing-toggle" data-tooltip="Your content is automatically scaled up to fill as much of the browser window as possible. This option disables that scaling and favors the original authored at size." data-tooltip-alignment="r" data-tooltip-delay="500" data-tooltip-maxwidth="300">', '<input id="upsizing-checkbox" type="checkbox">', '<label for="upsizing-checkbox">Disable upsizing</label>', "</div>", "</div>", "</div>", '<footer class="presentation-controls-footer">', '<button class="button xl positive start-presentation">Start presentation</button>', "</footer>", "</aside>"].join("")).appendTo(document.body), this.presentationControlsScrollShadow = new SL.components.ScrollShadow({parentElement: this.presentationControls,contentElement: this.presentationControls.find(".presentation-controls-content"),footerElement: this.presentationControls.find(".presentation-controls-footer")}), this.presentationControls.find(".live-view-url").on("mousedown", this.onLiveURLMouseDown.bind(this)), this.presentationControls.find(".fullscreen-toggle").on("click", this.onFullscreenToggled.bind(this)), this.presentationControls.find(".controls-toggle").on("click", this.onControlsToggled.bind(this)), this.presentationControls.find(".upsizing-toggle").on("click", this.onUpsizingToggled.bind(this)), this.presentationControls.find(".button.start-presentation").on("click", this.onStartPresentationClicked.bind(this)), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", this.onFullscreenChange.bind(this)), this.syncPresentationControls()
    },syncPresentationControls: function() {
        this.presentationControls.find(".fullscreen-toggle input").prop("checked", SL.helpers.Fullscreen.isActive()), this.presentationControls.find(".controls-toggle input").prop("checked", !SL.current_user.settings.get("present_controls")), this.presentationControls.find(".upsizing-toggle input").prop("checked", !SL.current_user.settings.get("present_upsizing"))
    },showStatus: function(t) {
        this.statusElement ? this.statusElement.find(".stream-status-message").html(t) : this.statusElement = $(['<div class="stream-status">', '<p class="stream-status-message">' + t + "</p>", "</div>"].join("")).appendTo(document.body)
    },clearStatus: function() {
        this.statusElement && (this.statusElement.remove(), this.statusElement = null)
    },savePresentOption: function(t) {
        this.xhrRequests = this.xhrRequests || {}, this.xhrRequests[t] && this.xhrRequests[t].abort();
        var e = {url: SL.config.AJAX_UPDATE_USER_SETTINGS,type: "PUT",context: this,data: {user_settings: {}}};
        e.data.user_settings[t] = SL.current_user.settings.get(t), this.xhrRequests[t] = $.ajax(e).always(function() {
            this.xhrRequests[t] = null
        })
    },onLiveURLMouseDown: function(t) {
        $(t.target).focus().select(), t.preventDefault()
    },onControlsToggled: function(t) {
        t.preventDefault();
        var e = !Reveal.getConfig().controls;
        SL.current_user.settings.set("present_controls", e), Reveal.configure({controls: e,progress: e}), this.syncPresentationControls(), this.savePresentOption("present_controls"), this.stream.publish(null, {present_controls: e})
    },onUpsizingToggled: function(t) {
        t.preventDefault();
        var e = Reveal.getConfig().maxScale <= 1;
        SL.current_user.settings.set("present_upsizing", e), Reveal.configure({maxScale: e ? SL.config.PRESENT_UPSIZING_MAX_SCALE : 1}), this.syncPresentationControls(), this.savePresentOption("present_upsizing"), this.stream.publish(null, {present_upsizing: e})
    },onFullscreenToggled: function(t) {
        t.preventDefault(), SL.helpers.Fullscreen.toggle()
    },onFullscreenChange: function() {
        this.syncPresentationControls(), Reveal.layout()
    },onStartPresentationClicked: function() {
        $("html").addClass("presentation-started")
    }}), 

/** 
*  SL Views
*
*/
SL("views.decks").Show = SL.views.Base.extend({
    init: function() {
        this._super(), this.summaryBubble = $(".summary-bubble"), SL.util.setupReveal({history: !0,embedded: !0,pause: !1,margin: .1,openLinksInTabs: !0,trackEvents: !0}), this.setupDisqus(), this.showSummaryTimeout = setTimeout(this.showSummary.bind(this), 1e3), this.hideSummaryTimeout = setTimeout(this.hideSummary.bind(this), 8e3), $("header .deck-promotion").length && $("header").addClass("extra-wide"), Modernizr.fullscreen === !1 && $(".deck-options .fullscreen-button").hide(), this.bind(), this.layout()
    },bind: function() {
        this.editButton = $(".deck-options .edit-button"), this.editButtonOriginalLink = this.editButton.attr("href"), $(".deck-options .fork-button").on("click", this.onForkClicked.bind(this)), $(".deck-options .share-button").on("click", this.onShareClicked.bind(this)), $(".deck-options .comment-button").on("click", this.onCommentsClicked.bind(this)), $(".deck-options .fullscreen-button").on("click", this.onFullScreenClicked.bind(this)), this.visibilityButton = $(".deck-options .visibility-button"), this.visibilityButton.on("click", this.onVisibilityClicked.bind(this)), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", Reveal.layout), this.onWindowScroll = $.debounce(this.onWindowScroll, 200), $(window).on("resize", this.layout.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this)), this.hideSummary = this.hideSummary.bind(this), 
        Reveal.addEventListener("slidechanged", this.onSlideChanged.bind(this)), Reveal.addEventListener("fragmentshown", this.hideSummary), Reveal.addEventListener("fragmenthidden", this.hideSummary), this.summaryBubble.on("click", this.hideSummary)
    },
    // no need for this comment module
    setupDisqus: function() {
        if ($("#disqus_thread").length) {
            {
                var t = window.disqus_shortname = "slidesapp";
                window.disqus_identifier = SLConfig.deck.id
            }
            !function() {
                var e = document.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = "//" + t + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(e)
            }()
        } else
            $(".options .comment-button").hide()
    },showSummary: function() {
        this.summaryBubble && this.summaryBubble.addClass("visible")
    },hideSummary: function() {
        this.summaryBubble && (this.summaryBubble.removeClass("visible"), this.summaryBubble.on("transitionend", function() {
            $(this).remove()
        }), this.summaryBubble = null)
    },layout: function() {
        this.summaryBubble && this.summaryBubble.css("left", (window.innerWidth - this.summaryBubble.width()) / 2);
        var t = $(".reveal .playback"), e = $(".deck-kudos"), n = {opacity: 1};
        e.length && t.length && (n.marginLeft = t.offset().left + t.outerWidth() - 10), e.css(n)
    },saveVisibility: function(t) {
        var e = {type: "POST",url: SL.config.AJAX_PUBLISH_DECK(SL.current_deck.get("id")),context: this,data: {visibility: t}};
        $.ajax(e).done(function(t) {
            t.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_SELF")) : t.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_TEAM")) : t.deck.visibility === SL.models.Deck.VISIBILITY_ALL && SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ALL")), "string" == typeof t.deck.slug && SL.current_deck.set("slug", t.deck.slug), "string" == typeof t.deck.visibility && SL.current_deck.set("visibility", t.deck.visibility)
        }).fail(function() {
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative")
        })
    },onShareClicked: function() {
        return "undefined" != typeof SLConfig && "string" == typeof SLConfig.deck.user.username && "string" == typeof SLConfig.deck.slug ? SL.modal.open("share-deck", SLConfig.deck) : SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"), SL.analytics.trackPresenting("Share clicked"), !1
    },onCommentsClicked: function() {
        SL.analytics.trackPresenting("Comments clicked")
    },onFullScreenClicked: function() {
        var t = $(".reveal-viewport").get(0);
        return t ? (SL.helpers.Fullscreen.enter(t), !1) : void SL.analytics.trackPresenting("Fullscreen clicked")
    },onForkClicked: function() {
        return SL.analytics.trackPresenting("Fork clicked"), $.ajax({type: "POST",url: SL.config.AJAX_FORK_DECK(SLConfig.deck.id),context: this}).done(function() {
            window.location = SL.current_user.getProfileURL()
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        }), !1
    },onVisibilityClicked: function(t) {
        t.preventDefault();
        var e = SL.current_deck.get("visibility"), n = [];
        n.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_SELF"),selected: e === SL.models.Deck.VISIBILITY_SELF,callback: function() {
                this.saveVisibility(SL.models.Deck.VISIBILITY_SELF), SL.analytics.trackPresenting("Visibility changed", "self")
            }.bind(this)}), SL.current_user.isEnterprise() && n.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_TEAM"),selected: e === SL.models.Deck.VISIBILITY_TEAM,className: "divider",callback: function() {
                this.saveVisibility(SL.models.Deck.VISIBILITY_TEAM), SL.analytics.trackPresenting("Visibility changed", "team")
            }.bind(this)}), n.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_ALL"),selected: e === SL.models.Deck.VISIBILITY_ALL,callback: function() {
                this.saveVisibility(SL.models.Deck.VISIBILITY_ALL), SL.analytics.trackPresenting("Visibility changed", "all")
            }.bind(this)}), SL.prompt({anchor: $(t.currentTarget),type: "select",data: n}), SL.analytics.trackPresenting("Visibility menu opened")
    },onSlideChanged: function(t) {
        this.hideSummary();
        var e = "#";
        t.indexh && (e += "/" + t.indexh, t.indexv && (e += "/" + t.indexv)), this.editButton.attr("href", this.editButtonOriginalLink + e)
    },onWindowScroll: function() {
        $(window).scrollTop() > 10 && this.hideSummary()
    }}), 

SL("views.decks").Speaker = SL.views.Base.extend({
    init: function() {
        this._super(), this.notesElement = $(".speaker-controls .notes"), this.notesValue = $(".speaker-controls .notes .value"), this.timeElement = $(".speaker-controls .time"), this.timeTimerValue = $(".speaker-controls .time .timer-value"), this.timeClockValue = $(".speaker-controls .time .clock-value"), this.subscribersElement = $(".speaker-controls .subscribers"), this.subscribersValue = $(".speaker-controls .subscribers .subscribers-value"), this.currentElement = $(".current-slide"), this.upcomingElement = $(".upcoming-slide"), this.upcomingFrame = $(".upcoming-slide iframe"), this.upcomingFrame.length ? (this.upcomingFrame.on("load", this.onUpcomingFrameLoaded.bind(this)), this.upcomingFrame.attr("src", this.upcomingFrame.attr("data-src"))) : this.setup(), SL.helpers.PageLoader.show()
    },setup: function() {
        Reveal.addEventListener("ready", function() {
            this.currentReveal = window.Reveal, this.currentReveal.addEventListener("slidechanged", this.onCurrentSlideChanged.bind(this)), this.currentReveal.addEventListener("fragmentshown", this.onCurrentFragmentChanged.bind(this)), this.currentReveal.addEventListener("fragmenthidden", this.onCurrentFragmentChanged.bind(this)), this.currentReveal.addEventListener("paused", this.onCurrentPaused.bind(this)), this.currentReveal.addEventListener("resumed", this.onCurrentResumed.bind(this)), this.upcomingFrame.length && (this.upcomingReveal = this.upcomingFrame.get(0).contentWindow.Reveal, this.upcomingReveal.configure({history: !1,controls: !1,progress: !1,overview: !1,autoSlide: 0,transition: "none",backgroundTransition: "none"}), this.upcomingReveal.addEventListener("slidechanged", this.onUpcomingSlideChanged.bind(this)), this.upcomingFrame.get(0).contentWindow.document.body.className += " no-transition"), this.setupTimer(), this.setupTouch(), this.stream = new SL.helpers.StreamLive({reveal: this.currentReveal,publisher: !0}), this.stream.ready.add(this.onStreamReady.bind(this)), this.stream.subscribersChanged.add(this.onStreamSubscribersChange.bind(this)), this.stream.connect()
        }.bind(this)), SL.util.setupReveal({touch: !1,history: !1,autoSlide: 0,openLinksInTabs: !0})
    },setupTouch: function() {
        if ($("html").hasClass("speaker-mobile") && (SL.util.device.HAS_TOUCH || window.navigator.pointerEnabled)) {
            this.touchControls = $(['<div class="touch-controls">', '<div class="touch-controls-content">', '<span class="status">', "Tap or Swipe to change slide", "</span>", '<span class="slide-number"></span>', "</div>", '<div class="touch-controls-progress"></div>', "</div>"].join("")).appendTo(document.body), this.touchControlsProgress = this.touchControls.find(".touch-controls-progress"), this.touchControlsSlideNumber = this.touchControls.find(".slide-number"), this.touchControlsStatus = this.touchControls.find(".status"), setTimeout(function() {
                this.touchControls.addClass("visible")
            }.bind(this), 1e3);
            var t = new Hammer(document.body);
            t.get("swipe").set({direction: Hammer.DIRECTION_ALL}), t.get("press").set({threshold: 1e3}), t.on("swipe", function(t) {
                switch (t.direction) {
                    case Hammer.DIRECTION_LEFT:
                        this.currentReveal.right(), this.showTouchStatus("Next slide");
                        break;
                    case Hammer.DIRECTION_RIGHT:
                        this.currentReveal.left(), this.showTouchStatus("Previous slide");
                        break;
                    case Hammer.DIRECTION_UP:
                        this.currentReveal.down(), this.showTouchStatus("Next vertical slide");
                        break;
                    case Hammer.DIRECTION_DOWN:
                        this.currentReveal.up(), this.showTouchStatus("Previous vertical slide")
                }
            }.bind(this)), t.on("tap", function() {
                this.currentReveal.next(), this.showTouchStatus("Next slide")
            }.bind(this)), t.on("press", function() {
                this.currentReveal.isPaused() && (this.currentReveal.togglePause(!1), this.showTouchStatus("Resumed"))
            }.bind(this))
        }
    },setupTimer: function() {
        this.timeTimerValue.on("click", this.restartTimer.bind(this)), this.restartTimer(), setInterval(this.syncTimer.bind(this), 1e3)
    },restartTimer: function() {
        this.startTime = Date.now(), this.syncTimer()
    },sync: function() {
        setTimeout(function() {
            this.syncUpcomingSlide(), this.syncTouchControls(), this.syncNotes(), this.syncTimer()
        }.bind(this), 1)
    },syncTimer: function() {
        var t = moment();
        this.timeClockValue.html(t.format("hh:mm") + ' <span class="dim">' + t.format("A") + "<span>"), t.hour(0).minute(0).second((Date.now() - this.startTime) / 1e3);
        var e = t.format("HH") + ":", n = t.format("mm") + ":", i = t.format("ss");
        "00:" === e && (e = '<span class="dim">' + e + "</span>", "00:" === n && (n = '<span class="dim">' + n + "</span>")), this.timeTimerValue.html(e + n + i)
    },syncUpcomingSlide: function() {
        if (this.upcomingReveal) {
            var t = this.currentReveal.getIndices();
            this.upcomingReveal.slide(t.h, t.v, t.f), this.upcomingReveal.next()
        }
    },syncNotes: function() {
        var t = $(this.currentReveal.getCurrentSlide()).attr("data-notes") || "";
        t ? (this.notesElement.show(), this.notesValue.text(t), this.notesElement.removeAttr("data-note-length"), t.length < .2 * SL.config.SPEAKER_NOTES_MAXLENGTH ? this.notesElement.attr("data-note-length", "short") : t.length > .7 * SL.config.SPEAKER_NOTES_MAXLENGTH && this.notesElement.attr("data-note-length", "long")) : this.notesElement.hide()
    },syncTouchControls: function() {
        if (this.touchControls) {
            var t = this.currentReveal.getProgress();
            this.touchControlsProgress.css({"-webkit-transform": "scale(" + t + ", 1)","-moz-transform": "scale(" + t + ", 1)","-ms-transform": "scale(" + t + ", 1)",transform: "scale(" + t + ", 1)"});
            var e = $(".reveal .slides section:not(.stack)").length, n = this.currentReveal.getIndices().h + this.currentReveal.getIndices().v;
            n += $(".reveal .slides>section.present").prevAll("section").find(">section:gt(0)").length, n += 1, this.touchControlsSlideNumber.html(n + "/" + e)
        }
    },showTouchStatus: function(t) {
        clearTimeout(this.touchControlsStatusTimeout);
        var e = this.currentReveal && this.currentReveal.isPaused();
        e && (t = "Paused (tap+hold to resume)"), this.touchControlsStatus && (this.touchControlsStatus.text(t).removeClass("hidden"), e || (this.touchControlsStatusTimeout = setTimeout(function() {
            this.touchControlsStatus.addClass("hidden")
        }.bind(this), 1e3)))
    },onUpcomingFrameLoaded: function() {
        this.setup()
    },onStreamReady: function() {
        SL.helpers.PageLoader.hide(), this.sync()
    },onStreamSubscribersChange: function(t) {
        "number" == typeof this.subscriberCount && (this.subscribersValue.removeClass("flash green flash-red"), t > this.subscriberCount ? setTimeout(function() {
            this.subscribersValue.addClass("flash-green")
        }.bind(this), 1) : t < this.subscriberCount && setTimeout(function() {
            this.subscribersValue.addClass("flash-red")
        }.bind(this), 1)), this.subscriberCount = t, this.subscriberCount > 0 ? (this.subscribersValue.html('<span class="icon i-eye"></span>' + t), this.subscribersElement.addClass("visible")) : this.subscribersElement.removeClass("visible")
    },onCurrentSlideChanged: function() {
        this.sync()
    },onCurrentFragmentChanged: function() {
        this.sync()
    },onCurrentPaused: function() {
        this.pausedInstructions || (this.pausedInstructions = $('<h3 class="message-overlay">Paused. Press the "B" key to resume.</h3>'), this.pausedInstructions.appendTo(this.currentElement), this.pausedInstructions.addClass("visible"))
    },onCurrentResumed: function() {
        this.pausedInstructions && (this.pausedInstructions.remove(), this.pausedInstructions = null)
    },onUpcomingSlideChanged: function() {
    }}),
    SL("views.devise").All = SL.views.Base.extend({
        init: function() {
        this._super(), this.setupForm()
    },setupForm: function() {
        if (this.formElement = $("form"), this.formElement.length) {
            this.formElement.find(".unit[data-validate]").each(function(t, e) {
                new SL.components.FormUnit(e)
            });
            var t = this.formElement.find("button[type=submit]");
            t.length && this.formElement.on("submit", function(e) {
                if (!e.isDefaultPrevented())
                    if ($(".g-recaptcha").length && "undefined" != typeof window.grecaptcha && "function" == typeof window.grecaptcha.getResponse) {
                        if (!grecaptcha.getResponse())
                            return SL.notify("Please answer the reCAPTCHA to prove you're not a robot"), e.preventDefault(), !1
                    } else
                        Ladda.create(t.get(0)).start()
            }.bind(this))
        }
    }
}), 

SL("views.devise").Edit = SL.views.devise.All.extend({
    init: function() {
        this._super(), $(".delete-account-toggle").on("click", this.onDeleteAccountToggleClicked.bind(this)), $(".delete-profile-photo").on("click", this.onDeleteProfilePhotoClicked.bind(this)), $("#user_email").on("change keyup", this.onEmailChanged.bind(this)), $("#user_password").on("change keyup", this.onNewPasswordChanged.bind(this)), this.undoAutoFill()
    },undoAutoFill: function() {
        if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0)
            var t = window.setInterval(function() {
                var e = $("input:-webkit-autofill");
                e.length > 0 && (window.clearInterval(t), e.each(function() {
                    var t = $(this).clone(!0, !0);
                    t.is("[type=password]") && t.val(""), $(this).after(t).remove();
                    var e = t.parent(".unit");
                    e.length && new SL.components.FormUnit(e)
                }))
            }, 20)
    },updatePasswordVerification: function() {
        var t = $("#user_email").parents(".unit"), e = $("#user_password").parents(".unit"), n = $("#user_current_password").parents(".unit"), i = t.data("controller"), s = e.data("controller");
        i && s && i.isUnchanged() && s.isUnchanged() ? (n.removeAttr("data-required"), n.addClass("hidden")) : (n.attr("data-required", "true"), n.removeClass("hidden"))
    },onDeleteAccountToggleClicked: function(t) {
        t.preventDefault(), $(".delete-account").toggleClass("visible")
    },onDeleteProfilePhotoClicked: function(t) {
        t.preventDefault(), $.ajax({url: SL.config.AJAX_UPDATE_USER,type: "PUT",context: this,data: {user: {profile_photo: ""}}}).done(function() {
            $(".photo-editor").attr("data-photo-type", "gravatar")
        }).fail(function() {
            SL.notify("An error occured while saving", "negative")
        })
    },onEmailChanged: function() {
        this.updatePasswordVerification()
    },onNewPasswordChanged: function() {
        this.updatePasswordVerification()
    }}), 
SL("views.home").Explore = SL.views.Base.extend({
    init: function() {
        this._super(), new SL.components.Search({url: SL.config.AJAX_SEARCH})
    }}), 
SL("views.home").Index = SL.views.Base.extend({
    MARQUEE_MIN_HEIGHT: 600,
    init: function() {
        this._super(), this.sharingElement = $(".marquee .sharing"), this.learnMoreButton = $(".marquee .description-cta-secondary"), this.scrollPromotion = $(".marquee .scroll-promotion"), this.scrollPromotionArrow = $(".marquee .scroll-promotion-arrow"), this.backgroundElement = $(".marquee .marquee-background"), this.setupBackground(), this.setupVideo(), this.bind(), this.startScrollPromotion()
    },setupBackground: function() {
        this.backgroundImage = $("<img>", {src: SL.config.ASSET_URLS["homepage-background.jpg"],load: this.onBackgroundLoaded.bind(this)})
    },setupVideo: function() {
        (SL.util.device.IS_PHONE || SL.util.device.IS_TABLET) && $(".features .features-item-figure").each(function() {
            var t = $(this), e = t.find(".image-wrapper"), n = t.find(".video-wrapper");
            n.length && (n.find("video").prop("controls", !0), n.appendTo(t), e.appendTo(t), t.addClass("manually-triggered"), t.find(".browser-frame").remove(), t.find(".browser-content").remove())
        }), $(".features video").each(function(t, e) {
            var n = "";
            e = $(e), e.find("span[data-src]").each(function(t, e) {
                e = $(e), n += '<source src="' + e.attr("data-src") + '" type="' + e.attr("data-type") + '">'
            }), n && e.html(n)
        })
    },bind: function() {
        this.sharingElement.on("mouseover", this.onSharingMouseOver.bind(this)), this.learnMoreButton.on("click", this.onLearnMoreClicked.bind(this)), this.scrollPromotion.on("click", this.onLearnMoreClicked.bind(this)), this.scrollPromotionArrow.on("mouseover", this.onScrollPromotionOver.bind(this)), SL.util.device.IS_PHONE || SL.util.device.IS_TABLET || (this.updateFeatureAnimations = $.debounce(this.updateFeatureAnimations, 300), $(window).on("resize", this.onWindowResize.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this))), this.trackScrolling = $.throttle(this.trackScrolling, 500), $(window).on("scroll", this.trackScrolling.bind(this))
    },trackScrolling: function() {
        this.scrollTracking = this.scrollTracking || {};
        var t = $(window).scrollTop(), e = window.innerHeight, n = $(document).height(), i = Math.max(Math.min(t / (n - e), 1), 0);
        i > .1 && !this.scrollTracking[.1] && (this.scrollTracking[.1] = !0, SL.analytics.track("Home: Scrolled", "10%")), i > .5 && !this.scrollTracking[.5] && (this.scrollTracking[.5] = !0, SL.analytics.track("Home: Scrolled", "50%")), i > .95 && !this.scrollTracking[.95] && (this.scrollTracking[.95] = !0, SL.analytics.track("Home: Scrolled", "100%"))
    },updateFeatureAnimations: function() {
        var t, e = $(window).scrollTop(), n = Number.MAX_VALUE;
        $(".features .features-item .video-wrapper, .features .features-item .animation-wrapper").each(function(i, s) {
            s = $(s);
            var o = s.offset().top, r = o - e;
            r > -100 && 500 > r && n > r && (n = r, t = s)
        }), this.activeFeature && !this.activeFeature.is(t) && this.stopFeatureAnimation(), t && !t.hasClass("playing") && (this.activeFeature = t, this.startFeatureAnimation())
    },startFeatureAnimation: function() {
        if (this.activeFeature.addClass("playing"), this.activeFeature.is(".video-wrapper"))
            this.activeFeature.find("video").get(0).play();
        else if (this.activeFeature.is(".animation-wrapper")) {
            var t = parseInt(this.activeFeature.attr("data-animation-steps"), 10), e = parseInt(this.activeFeature.attr("data-animation-duration"), 10), n = 1;
            this.activeFeature.attr("data-animation-step", n), this.activeFeatureInterval = setInterval(function() {
                n += 1, n = n > t ? 1 : n, this.activeFeature.attr("data-animation-step", n)
            }.bind(this), e / t)
        }
        SL.analytics.track("Home: Start feature animation")
    },stopFeatureAnimation: function() {
        this.activeFeature.removeClass("playing"), this.activeFeature.removeAttr("data-animation-step"), clearInterval(this.activeFeatureInterval), this.activeFeature.is(".video-wrapper") && this.activeFeature.find("video").get(0).pause()
    },startScrollPromotion: function() {
        clearInterval(this.scrollPromotionInterval), this.scrollPromotionInterval = setInterval(this.promoteScrolling.bind(this), 2500)
    },stopScrollPromotion: function() {
        clearInterval(this.scrollPromotionInterval), this.scrollPromotionInterval = null
    },promoteScrolling: function() {
        this.scrollPromotionArrow.removeClass("bounce"), setTimeout(function() {
            this.scrollPromotionArrow.addClass("bounce")
        }.bind(this), 1)
    },onScrollPromotionOver: function() {
        this.stopScrollPromotion()
    },onBackgroundLoaded: function() {
        this.backgroundElement.css("background-image", "url(" + this.backgroundImage.attr("src") + ")").addClass("show")
    },onSharingMouseOver: function() {
        this.sharingElement.hasClass("parsed") || (this.sharingElement.addClass("parsed"), this.sharingElement.html('<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fslidesapp&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=20&amp" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:20px;" allowTransparency="true"></iframe><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://slides.com" data-text="Create, present and share beautiful presentations with @slidesapp" data-count="horizontal" data-related="slidesapp"></a>'), !function(t, e, n) {
            var i, s = t.getElementsByTagName(e)[0];
            t.getElementById(n) || (i = t.createElement(e), i.id = n, i.src = "//platform.twitter.com/widgets.js", s.parentNode.insertBefore(i, s))
        }(document, "script", "twitter-wjs"))
    },onLearnMoreClicked: function() {
        SL.analytics.track("Home: Learn more clicked"), this.stopScrollPromotion()
    },onWindowResize: function() {
        this.updateFeatureAnimations()
    },onWindowScroll: function() {
        this.updateFeatureAnimations(), this.scrollPromotionInterval && this.stopScrollPromotion(), this.trackScrolling()
    }}), 
SL("views.statik").All = SL.views.Base.extend({
    init: function() {
        this._super(), $("img.click-to-expand").on("click", function() {
            $(this).toggleClass("expanded")
        })
    }}), 
SL("views.statik").Pricing = SL.views.statik.All.extend({
    init: function() {
        this._super(), $(".tier").each(this.setupTier.bind(this))
    },setupTier: function(t, e) {
        var e = $(e), n = e.find(".cta a");
        n.length && !n.hasClass("disabled") && (e.on("click", function(t) {
            t.preventDefault(), window.location = n.attr("href")
        }), e.on("mouseenter", function() {
            e.addClass("hover")
        }), e.on("mouseleave", function() {
            e.removeClass("hover")
        }))
    }}), 
SL("views.subscriptions").EditPeriod = SL.views.Base.extend({
    init: function() {
        this._super(), Ladda.bind($("#payment-form button[type=submit]").get(0))
    }}), 
SL("views.subscriptions").New = SL.views.Base.extend({
    init: function() {
        this._super(), this.onFormSubmit = this.onFormSubmit.bind(this), this.onStripeResponse = this.onStripeResponse.bind(this), this.formElement = $("#payment-form"), this.formElement.on("submit", this.onFormSubmit), this.formSubmitButton = this.formElement.find("button[type=submit]"), this.formSubmitLoader = Ladda.create(this.formSubmitButton.get(0)), $("#stripe-card-number").payment("formatCardNumber"), $("#stripe-card-cvc").payment("formatCardCVC"), $("#stripe-month").payment("restrictNumeric"), $("#stripe-year").payment("restrictNumeric"), SL.util.device.supportedByEditor() || $(".column").prepend("<section class=\"critical-error\"><h2>Not supported</h2><p>It looks like you're using a browser which isn't suported by the Slides editor. Please make sure to try the editor before upgrading.</p></section>"), $("html").hasClass("subscriptions new") && ($('input[name="subscription[billing_period]"]').on("change", this.syncSubmitButton.bind(this)), this.syncSubmitButton())
    },syncSubmitButton: function() {
        var t = this.formElement.find('input[name="subscription[billing_period]"]:checked'), e = t.attr("data-period-value"), n = t.attr("data-dollar-value"), i = this.formElement.find(".devise-note");
        0 === i.length && (i = $('<div class="devise-note">').insertAfter(this.formElement.find(".actions"))), e && n ? i.html("You are starting a <strong>" + e + "</strong> subscription and will be charged <strong>$" + n + "</strong> today.") : i.remove()
    },onFormSubmit: function(t) {
        return this.formSubmitLoader.start(), Stripe.createToken(this.formElement, this.onStripeResponse), t.preventDefault(), !1
    },onStripeResponse: function(t, e) {
        if (e.error)
            SL.notify(e.error.message, "negative"), this.formSubmitLoader.stop();
        else {
            var n = e.id;
            this.formElement.find('input[name="subscription[token]"]').remove(), this.formElement.append($('<input type="hidden" name="subscription[token]" />').val(n)), this.formElement.get(0).submit()
        }
    }}), 
SL("views.subscriptions").Show = SL.views.Base.extend({DOTTED_CARD_PREFIX: "&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; ",
    init: function() {
        this._super(), this.strings = {CONFIRM_UNSUBSCRIBE_ACTION: "Unsubscribe",CONFIRM_UNSUBSCRIBE_DESCRIPTION: SL.locale.get("REMOVE_PRO_CONFIRM")}, this.load()
    },bindLadda: function() {
        $(".column section .ladda-button").each(function(t, e) {
            e = $(e), e.data("ladda") || e.data("ladda", Ladda.create(e.get(0)))
        })
    },load: function() {
        $.ajax({url: SL.config.AJAX_SUBSCRIPTIONS_STATUS,type: "GET",context: this}).done(this.onDataLoaded).fail(this.onDataFailed)
    },onDataLoaded: function(t) {
        this.data = new SL.models.Customer(t.customer), this.render()
    },onDataFailed: function() {
        $(".billing-loader").text(SL.locale.get("BILLING_DETAILS_ERROR"))
    },render: function() {
        $(".billing-loader").remove(), this.renderDetails(), this.renderHistory(), (!SL.current_user.isEnterprise() || SL.current_user.billing_address) && this.renderAddress(), this.bindLadda()
    },renderDetails: function() {
        var t = $('<section class="billing-details"><h2>Billing details</h2></section>').appendTo(".billing-wrapper"), e = this.data.hasActiveSubscription();
        if (e) {
            if (t.append('<div class="field status"><span class="label">Status</span><span class="value">Active</span></div>'), this.data.has("active_card") && t.append('<div class="field card"><span class="label">Card</span><span class="value">' + this.DOTTED_CARD_PREFIX + this.data.get("active_card.last4") + "</span></div>"), this.data.has("subscription")) {
                var n = moment.unix(this.data.getNextInvoiceDate()).format("MMMM Do, YYYY"), i = "$" + this.data.getNextInvoiceSum();
                t.append('<div class="field payment-cycle"><span class="label">Next invoice</span><span class="value">' + i + " on " + n + "</span></div>")
            }
            t.append('<footer class="actions"><a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_CARD + '">Change credit card</a><button class="button s negative outline cancel-subscription ladda-button" data-style="expand-right" data-spinner-color="#222">' + this.strings.CONFIRM_UNSUBSCRIBE_ACTION + "</button></footer>"), this.data.get("can_change_period") && t.find(".actions").prepend('<a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_PERIOD + '">Change billing period</a>')
        } else {
            var s = moment.unix(this.data.get("subscription.current_period_end")).format("MMM Do, YYYY");
            t.append('<div class="field status"><span class="label">Status</span><span class="value">Pro until ' + s + "</span></div>"), t.append('<footer class="actions"><a class="button s outline positive" href="' + SL.routes.SUBSCRIPTIONS_NEW + '">Return to Pro</a></footer>')
        }
        this.cancelButton = $(".billing-details .cancel-subscription"), this.cancelButton.length && (this.cancelButton.on("click", this.onCancelSubscriptionClicked.bind(this)), this.cancelLoader = Ladda.create(this.cancelButton.get(0)))
    },renderHistory: function() {
        var t = $(['<section class="billing-history">', "<h2>Receipts</h2>", '<table class="sl-table"></table>', "</section>"].join("")).appendTo(".billing-wrapper"), e = t.find("table");
        if (this.data.get("can_toggle_notifications") === !0) {
            t.append(['<div class="sl-checkbox outline">', '<input type="checkbox" id="receipt-notifications">', '<label for="receipt-notifications">Send receipts via email</label>', "</div>"].join(""));
            var n = t.find("#receipt-notifications");
            n.on("change", this.onEmailNotificationChanged.bind(this)), SL.current_user.notify_on_receipt && n.prop("checked", !0)
        }
        e.html(["<tr>", '<th class="amount">Amount</th>', '<th class="date">Date</th>', '<th class="card">Card</th>', '<th class="download">PDF</th>', "</tr>"].join(""));
        var i = this.data.get("charges");
        i && i.length ? i.forEach(function(t) {
            var n = $(['<tr data-charge-id="' + t.id + '">', '<td class="amount">$' + (t.amount / 100).toFixed(2) + "</td>", '<td class="date">' + moment.unix(t.created).format("DD-MM-YYYY") + "</td>", '<td class="card">' + this.DOTTED_CARD_PREFIX + t.card.last4 + "</td>", '<td class="download">', '<form action="' + SL.config.AJAX_SUBSCRIPTIONS_PRINT_RECEIPT(t.id) + '" method="post">', '<button type="submit" class="button outline ladda-button download-button" data-style="slide-right" data-spinner-color="#222">', '<span class="icon i-download"></span>', "</button>", "</form>", "</td>", "</tr>"].join(""));
            n.appendTo(e), SL.util.dom.insertCSRF(n.find(".download form"))
        }.bind(this)) : e.replaceWith("<p>" + SL.locale.get("BILLING_DETAILS_NOHISTORY") + "</p>")
    },renderAddress: function() {
        var t = $(['<section class="billing-address">', "<h2>Billing address</h2>", '<div class="sl-form">', '<div class="unit">', '<p class="unit-description">If you wish to include a billing address on your receipts please enter it below.</p>', '<textarea class="billing-address-input" rows="4" maxlength="100">', SL.current_user.billing_address || "", "</textarea>", "</div>", '<div class="footer">', '<button class="button l positive billing-address-save">Save</button>', "</div>", "</div>", "</section>"].join("")).appendTo(".billing-wrapper");
        this.addressInputField = t.find(".billing-address-input"), this.addressSaveButton = t.find(".billing-address-save"), this.addressInputField.on("change keyup mouseup", this.checkAddress.bind(this)), this.addressSaveButton.on("click", this.saveAddress.bind(this)), this.checkAddress()
    },checkAddress: function() {
        this.addressInputField.val() === (SL.current_user.billing_address || "") ? this.addressSaveButton.hide() : this.addressSaveButton.show()
    },saveAddress: function() {
        this.billingAddressXHR && this.billingAddressXHR.abort();
        var t = this.addressInputField.val() || "";
        this.billingAddressXHR = $.ajax({url: SL.config.AJAX_UPDATE_USER,type: "PUT",context: this,data: {user: {billing_address: t}}}).done(function() {
            SL.current_user.billing_address = t, SL.notify("Billing address saved")
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        }).always(function() {
            this.billingAddressXHR = null, this.checkAddress()
        })
    },onCancelSubscriptionClicked: function(t) {
        SL.prompt({anchor: $(t.currentTarget),title: this.strings.CONFIRM_UNSUBSCRIBE_DESCRIPTION,type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Confirm</h3>",selected: !0,className: "negative",callback: function() {
                        this.cancelLoader.start(), $.ajax({url: SL.config.AJAX_SUBSCRIPTIONS,type: "DELETE",context: this}).done(this.onCancelSubscriptionSuccess).fail(this.onCancelSubscriptionError)
                    }.bind(this)}]})
    },onCancelSubscriptionSuccess: function() {
        SL.notify(SL.locale.get("REMOVE_PRO_SUCCESS")), window.location.reload()
    },onCancelSubscriptionError: function() {
        SL.notify(SL.locale.get("GENERIC_ERROR")), this.cancelLoader.stop()
    },onEmailNotificationChanged: function(t) {
        this.emailNotificationXHR && this.emailNotificationXHR.abort(), this.emailNotificationXHR = $.ajax({url: SL.config.AJAX_UPDATE_USER,type: "PUT",context: this,data: {user: {notify_on_receipt: $(t.currentTarget).is(":checked")}}}).done(function() {
            SL.notify("Notification change saved")
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        }).always(function() {
            this.emailNotificationXHR = null
        })
    }}), 
SL("views.teams").New = SL.views.Base.extend({
    init: function() {
        this._super(), this.formElement = $("#payment-form"), this.formSubmitButton = this.formElement.find("button[type=submit]"), this.formSubmitLoader = Ladda.create(this.formSubmitButton.get(0)), this.bind(), this.summarize()
    },bind: function() {
        this.summarize = this.summarize.bind(this), this.formElement.on("keydown", this.onFormKeyDown.bind(this)), this.formSubmitButton.on("click", this.onFormSubmitClicked.bind(this)), this.formElement.find("#team-name").on("input", this.onTeamNameChange.bind(this)), this.formElement.find('input[name="billing-period"]').on("change", this.summarize), $("#stripe-card-number").payment("formatCardNumber"), $("#stripe-card-cvc").payment("formatCardCVC"), $("#stripe-month").payment("restrictNumeric"), $("#stripe-year").payment("restrictNumeric"), this.formElement.find(".unit[data-validate], .unit[data-required]").each(function(t, e) {
            $(e).data("unit", new SL.components.FormUnit(e))
        })
    },summarize: function() {
        var t = this.formElement.find(".purchase-summary"), e = t.find(".message"), n = "monthly" === this.formElement.find('input[name="billing-period"]:checked').val(), i = {period: n ? "month" : "year",cost: "$" + (n ? 14 : 140)};
        e.html(["You are starting a <strong>30 day free trial</strong>. If you cancel anytime in that period you will not be charged at all.", "<br><br>After the trial you will begin paying <strong>" + i.cost + " per " + i.period + "</strong> for each team member."].join(""))
    },validate: function() {
        var t = !0;
        return this.formElement.find(".unit[data-validate], .unit[data-required]").each(function(e, n) {
            var i = $(n).data("unit");
            i.validate(!0) === !1 && (t && i.focus(), t = !1)
        }), t
    },captureData: function() {
        this.formData = {team: {name: this.formElement.find("#team-name").val(),slug: this.formElement.find("#team-slug").val()},user: {username: this.formElement.find("#user-name").val(),email: this.formElement.find("#user-email").val(),password: this.formElement.find("#user-password").val()},subscription: {billing_period: this.formElement.find('input[name="billing-period"]:checked').val()}}
    },submitToStripe: function() {
        this.validate() && (this.captureData(), this.formSubmitLoader.start(), Stripe.createToken(this.formElement, this.onStripeResponse.bind(this)))
    },submitToApp: function(t) {
        this.formData.subscription.token = t, $.ajax({type: "POST",url: SL.config.AJAX_TEAMS_CREATE,data: JSON.stringify(this.formData),dataType: "json",context: this,contentType: "application/json"}).done(function(t) {
            window.location = t.team && "string" == typeof t.team.root_url ? window.location.protocol + "//" + t.team.root_url : window.location.protocol + "//" + this.formData.team.slug + "." + window.location.host
        }).fail(function(t) {
            var e = JSON.parse(t.responseText);
            e && e.user && e.user.email && e.user.email.length ? SL.notify("Email error: " + e.user.email[0], "negative") : SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"), this.formSubmitLoader.stop()
        })
    },onStripeResponse: function(t, e) {
        e.error ? (SL.notify(e.error.message, "negative"), this.formSubmitLoader.stop()) : this.submitToApp(e.id)
    },onFormKeyDown: function(t) {
        return 13 === t.keyCode ? (this.submitToStripe(), t.preventDefault(), !1) : void 0
    },onFormSubmitClicked: function(t) {
        return this.submitToStripe(), t.preventDefault(), !1
    },onTeamNameChange: function() {
        var t = this.formElement.find("#team-name"), e = this.formElement.find("#team-slug");
        e.val(SL.util.string.slug(t.val()));
        var n = e.data("unit");
        n && n.validate()
    }}),
    SL("views.teams.subscriptions").Show = SL.views.subscriptions.Show.extend({
        init: function() {
        this._super()
    },render: function() {
        this.data.isTrial() ? (this.strings.CONFIRM_UNSUBSCRIBE_ACTION = "Delete my team", this.strings.CONFIRM_UNSUBSCRIBE_DESCRIPTION = "Your trial will be canceled immediately and this team will no longer be accessible.") : (this.strings.CONFIRM_UNSUBSCRIBE_ACTION = "End subscription", this.strings.CONFIRM_UNSUBSCRIBE_DESCRIPTION = "Your subscription will be terminated and this team will be inaccessible after the end of the current billing cycle."), this._super()
    },renderDetails: function() {
        var t = $('<section class="billing-details"><h2>Billing details</h2></section>').appendTo(".billing-wrapper"), e = this.data.hasActiveSubscription(), n = this.data.isTrial();
        if (e) {
            if (t.append(n ? '<div class="field status"><span class="label">Status</span><span class="value">Trial</span></div>' : '<div class="field status"><span class="label">Status</span><span class="value">Active</span></div>'), SL.current_team.has("user_count") && t.append('<div class="field active-users"><span class="label" data-tooltip="The current number of users that you have invited to the team." data-tooltip-maxwidth="260">Team members</span><span class="value">' + SL.current_team.get("user_count") + "</span></div>"), this.data.has("subscription.period") && t.append('<div class="field period"><span class="label">Billing period</span><span class="value">' + ("year" === this.data.get("subscription.period") ? "Yearly" : "Monthly") + "</span></div>"), this.data.has("active_card") && t.append('<div class="field card"><span class="label">Card</span><span class="value">' + this.DOTTED_CARD_PREFIX + this.data.get("active_card.last4") + "</span></div>"), this.data.has("subscription")) {
                var i = moment.unix(this.data.getNextInvoiceDate()).format("MMMM Do, YYYY"), s = n ? "First invoice" : "Next invoice", o = "$" + this.data.getNextInvoiceSum();
                t.append('<div class="field payment-cycle"><span class="label">' + s + '</span><span class="value">' + o + " on " + i + "</span></div>")
            }
            t.append('<footer class="actions"><a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_CARD + '">Change credit card</a><button class="button s negative outline cancel-subscription ladda-button" data-style="expand-right" data-spinner-color="#222">' + this.strings.CONFIRM_UNSUBSCRIBE_ACTION + "</button></footer>"), this.data.get("can_change_period") && t.find(".actions").prepend('<a class="button s outline" href="' + SL.routes.SUBSCRIPTIONS_EDIT_PERIOD + '">Change billing period</a>')
        } else {
            var r = moment.unix(this.data.get("subscription.current_period_end")).format("MMM Do, YYYY");
            t.append('<div class="field status"><span class="label">Status</span><span class="value">Canceled, available until ' + r + "</span></div>")
        }
        this.cancelButton = $(".billing-details .cancel-subscription"), this.cancelButton.length && (this.cancelButton.on("click", this.onCancelSubscriptionClicked.bind(this)), this.cancelLoader = Ladda.create(this.cancelButton.get(0)))
    },onCancelSubscriptionSuccess: function() {
        SL.notify("Subscription canceled"), window.location = "http://clown.scoreur.net"
    }}),
    SL("views.teams.teams").Edit = SL.views.Base.extend({
        init: function() {
        this._super(), this.render()
    },render: function() {
        if (this.formElement = $("form"), this.formElement.length) {
            this.formElement.find(".unit[data-factory]").each(function(t, e) {
                var n = null;
                $(e).attr("data-factory").split(".").forEach(function(t) {
                    n = n ? n[t] : window[t]
                }), "function" == typeof n && new n(e)
            }), this.formElement.find(".unit[data-validate]:not([data-factory])").each(function(t, e) {
                new SL.components.FormUnit(e)
            });
            var t = this.formElement.find("button[type=submit]");
            if (t.length) {
                var e = Ladda.create(t.get(0));
                this.formElement.on("submit", function(t) {
                    t.isDefaultPrevented() || e.start()
                }.bind(this))
            }
        }
    }
}), 
SL("views.teams.teams").EditMembers = SL.views.Base.extend({
    init: function() {
        this._super(), this.domElement = $("section.users"), this.load()
    },bindLadda: function() {
        $(".column section .ladda-button").each(function(t, e) {
            e = $(e), e.data("ladda") || e.data("ladda", Ladda.create(e.get(0)))
        })
    },load: function() {
        $.ajax({type: "GET",url: SL.config.AJAX_ORGANIZATION_MEMBERS_LIST,context: this}).done(function(t) {
            this.userData = new SL.models.Collection, this.userLimit = t.max, t.results.forEach(function(t) {
                this.userData.push(new SL.models.User(t))
            }.bind(this))
        }).fail(function() {
            SL.notify(SL.locale.get("ORG_USERS_LIST_LOAD_ERROR"), "negative")
        }).always(this.render)
    },render: function() {
        var t = this.domElement.find(".contents");
        t.empty(), this.renderTable(t), this.renderInviteForm(t), this.syncInviteForm()
    },renderTable: function(t) {
        if (this.userData.isEmpty())
            t.html('<p class="empty-notice">' + SL.locale.get("ORG_USERS_LIST_EMPTY") + "</p>");
        else {
            var e = $('<table class="sl-table">').appendTo(t);
            e.append('<tr><th class="name">Name</th><th class="username">Username</th><th class="email">Email</th><th class="actions">Actions</th></tr>'), this.userData.forEach(this.renderUser.bind(this))
        }
    },renderInviteForm: function(t) {
        var e = $('<form class="create-user-form"><h4>Add a user to this team</h4><div class="unit text" data-validate="email" data-required><input type="text" placeholder="Email" name="email" size="35"></div><div class="unit text" data-validate="username" data-required><input type="text" placeholder="Username" name="username"></div><button type="submit" class="button positive l ladda-button create-user" data-style="zoom-out">Add</button></form>').appendTo(t), n = e.find("[name=email]"), i = e.find("[name=username]");
        e.find(".unit[data-validate]").each(function(t, e) {
            new SL.components.FormUnit(e)
        }), e.on("submit", function(t) {
            return this.createUser(), t.preventDefault(), !1
        }.bind(this)), n.on("blur", function() {
            var t = n.val(), e = i.val();
            e || 0 !== SL.util.validate.email(t).length || i.val(SL.util.string.slug(t.slice(0, t.indexOf("@"))))
        }.bind(this)), this.bindLadda()
    },renderUser: function(t) {
        var e = $("<tr>"), n = '<div class="avatar" style="background-image: url(' + t.thumbnail_url + ')"></div>';
        if (e.append("<td>" + n + (t.name || "N/A") + "</td>"), e.append('<td><a href="/' + t.username + '" target="_blank">' + t.username + "</a></td>"), e.append("<td>" + t.email + "</td>"), SL.current_user.username && SL.current_user.username !== t.username) {
            var i = $("<td>");
            i.append('<button class="button outline ladda-button remove-user" data-style="zoom-out" data-spinner-color="#222" data-tooltip="Remove this user from the team"><span class="i-trash-stroke"></span></button>'), t.registered || (i.append('<button class="button outline ladda-button welcome-user" data-style="zoom-out" data-spinner-color="#222" data-tooltip="Re-send invite email"><span class="i-mail"></span></button>'), e.addClass("disabled")), e.append(i), e.find(".welcome-user").on("click", function(n) {
                this.welcomeUser(n, t, e)
            }.bind(this)), e.find(".remove-user").on("click", function(n) {
                this.removeUser(n, t, e)
            }.bind(this))
        } else
            e.append("<td></td>");
        e.appendTo(this.domElement.find("table")), this.bindLadda()
    },syncInviteForm: function() {
        $(".team-is-full-notice").remove(), this.isTeamFull() && $(".create-user-form").append('<div class="team-is-full-notice"><h4>This team is full</h4><p>To add new members please <a href="mailto:support@slides.com" data-feedback-mode="contact" data-feedback-screenshot_enabled="false">contact support</a>.</p></div>')
    },createUser: function() {
        if (this.isTeamFull())
            return SL.notify("Your team is full, please contact support"), !1;
        var t = $(".create-user-form"), e = t.find("button.create-user").data("ladda");
        e && e.start(), $.ajax({type: "POST",url: SL.config.AJAX_ORGANIZATION_MEMBER_CREATE,data: {user: {email: t.find("[name=email]").val(),username: t.find("[name=username]").val()}},dataType: "json",context: this}).done(function(n) {
            var i = new SL.models.User(n);
            this.userData.isEmpty() ? (this.userData.push(i), this.render()) : (this.userData.push(i), this.renderUser(i)), t.find("[name=email]").val(""), t.find("[name=username]").val(""), this.syncInviteForm(), e && e.stop(), SL.notify(SL.locale.get("ORG_USERS_INVITE_SEND_SUCCESS"))
        }).fail(function(t) {
            t = $.parseJSON(t.responseText) || {}, e && e.stop(), "object" == typeof t.email && t.email.length ? SL.notify("Email error: " + t.email[0], "negative") : "object" == typeof t.username && t.username.length ? SL.notify("Username error: " + t.username[0], "negative") : SL.notify("Failed to add user", "negative")
        })
    },removeUser: function(t, e, n) {
        SL.prompt({anchor: $(t.currentTarget),title: SL.locale.get("ORG_USERS_REMOVE_CONFIRM", {name: e.name || e.username}),type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        var t = n.find(".remove-user").data("ladda");
                        t && t.start(), $.ajax({type: "DELETE",url: SL.config.AJAX_ORGANIZATION_MEMBER_DELETE(e.id),context: this}).done(function() {
                            n.remove(), this.userData.removeByProperties({id: e.id}), this.syncInviteForm(), t && t.stop(), SL.notify(SL.locale.get("ORG_USERS_REMOVE_SUCCESS"))
                        }).fail(function() {
                            t && t.stop(), SL.notify(SL.locale.get("ORG_USERS_REMOVE_ERROR"), "negative")
                        })
                    }.bind(this)}]})
    },welcomeUser: function(t, e, n) {
        var i = n.find(".welcome-user").data("ladda");
        i && i.start(), $.ajax({type: "POST",url: SL.config.AJAX_ORGANIZATION_MEMBER_WELCOME(e.id),context: this}).done(function() {
            i && i.stop(), SL.notify(SL.locale.get("ORG_USERS_INVITE_SEND_SUCCESS"))
        }).fail(function() {
            i && i.stop(), SL.notify(SL.locale.get("ORG_USERS_INVITE_SEND_ERROR"), "negative")
        })
    },isTeamFull: function() {
        return this.userLimit > 0 && this.userData.size() >= this.userLimit
    }}),
SL("views.teams.teams").Show = SL.views.Base.extend({
    init: function() {
        this._super(), new SL.components.Search({url: SL.config.AJAX_SEARCH_ORGANIZATION})
    }}),
SL("views.themes").Edit = SL.views.Base.extend({
    init: function() {
        this._super(), this.themeData = new SL.models.Collection, this.listElement = $(".theme-list"), this.editorElement = $(".theme-editor"), this.editorInnerElement = $(".theme-editor-inner"), this.VERSION = parseInt($(".theme-editor").attr("data-editor-version"), 10), this.load(), this.bindLadda(), this.setupPreview(), $("body").on("click", ".create-theme-button", this.onCreateThemeClicked.bind(this)), $(window).on("beforeunload", this.onWindowBeforeUnload.bind(this))
    },bindLadda: function() {
        $(".page-wrapper .ladda-button").each(function(t, e) {
            e = $(e), e.data("ladda") || e.data("ladda", Ladda.create(e.get(0)))
        })
    },setupPreview: function() {
        this.previewFrame = $(".preview .preview-frame"), this.previewReloader = $(".preview .preview-reloader"), this.previewReloader.on("click", this.reloadPreview.bind(this)), window.addEventListener("message", function(t) {
            t.data && "theme-preview-ready" === t.data.type && this.refreshPreview()
        }.bind(this))
    },load: function() {
        SL.helpers.PageLoader.show("Loading themes..."), $.ajax({type: "GET",url: SL.config.AJAX_THEMES_LIST,context: this}).done(function(t) {
            this.themeData.clear(), t.results.forEach(function(t) {
                this.themeData.push(new SL.models.Theme(t))
            }.bind(this))
        }).fail(function() {
            SL.notify(SL.locale.get("THEME_LIST_LOAD_ERROR"), "negative")
        }).always(function() {
            this.renderList(), SL.helpers.PageLoader.hide()
        })
    },renderList: function() {
        this.listElement.empty(), this.themeData.isEmpty() ? this.listElement.html('<p class="theme-list-empty">' + SL.locale.get("THEME_LIST_EMPTY") + "</p>") : (this.themeData.forEach(this.renderListItem.bind(this)), SL.view.parseTimes()), this.updateListDefault()
    },renderListItem: function(t) {
        var e = this.listElement.find('[data-theme-id="' + t.get("id") + '"]');
        if (e.length ? e.find(".theme-list-item-title").text(t.get("name")).attr("title", t.get("name")) : (e = $(['<div class="theme-list-item" data-theme-id="' + t.get("id") + '">', '<div class="theme-list-item-thumbnail"></div>', '<h2 class="theme-list-item-title" title="' + t.get("name") + '">' + t.get("name") + "</h2>", '<div class="theme-list-item-metadata">', '<div class="theme-list-item-metadata-field">Created <time class="date" datetime="' + t.get("created_at") + '"></time></div>', '<div class="theme-list-item-metadata-field">Updated <time class="ago" datetime="' + t.get("updated_at") + '"></time></div>', "</div>", '<div class="theme-list-item-controls">', '<button class="button outline l delete" data-tooltip="' + SL.locale.get("THEME_DELETE_TOOLTIP") + '">', '<span class="icon i-trash-stroke"></span>', "</button>", '<button class="button outline l edit" data-tooltip="' + SL.locale.get("THEME_EDIT_TOOLTIP") + '">', '<span class="icon i-pen-alt2"></span>', "</button>", '<button class="button outline l default" data-tooltip="' + SL.locale.get("THEME_MAKE_DEFAULT_TOOLTIP") + '">', '<span class="icon i-checkmark"></span>', "</button>", "</div>", "</div>"].join("")), e.prependTo(this.listElement)), t.hasThumbnail()) {
            var n = t.get("thumbnail_url");
            e.find(".theme-list-item-thumbnail").css("background-image", 'url("' + n + '")').attr("data-thumb-url", n)
        }
        return e.off("click").on("click", function(n) {
            $(n.target).closest(".theme-list-item-controls .delete").length ? this.removeTheme(t, null, $(n.target).closest(".theme-list-item-controls .delete")) : $(n.target).closest(".theme-list-item-controls .default").length ? e.hasClass("default") ? this.unmakeDefaultTheme() : this.makeDefaultTheme(t) : this.editTheme(t)
        }.bind(this)), e
    },refreshListItemThumb: function(t) {
        if (t && t.length) {
            var e = t.find(".theme-list-item-thumbnail"), n = e.attr("data-thumb-url");
            n && (n = n + "?" + Math.round(1e4 * Math.random()), e.css("background-image", 'url("' + n + '")'))
        }
    },updateListDefault: function() {
        this.listElement.find(".theme-list-item").each(function(t, e) {
            e = $(e), e.toggleClass("default", e.attr("data-theme-id") == SL.current_team.get("default_theme_id")), e.find(".theme-list-item-controls .default").attr("data-tooltip", SL.locale.get(e.hasClass("default") ? "THEME_IS_DEFAULT_TOOLTIP" : "THEME_MAKE_DEFAULT_TOOLTIP"))
        })
    },editTheme: function(t) {
        if (this.panel)
            return this.panel.close(function() {
                this.editTheme(t)
            }.bind(this)), !1;
        $("html").addClass("panel-open");
        var e = {};
        e = 1 === this.VERSION ? {colors: SL.config.V1.THEME_COLORS,fonts: SL.config.V1.THEME_FONTS,center: !0,rollingLinks: !0} : {colors: SL.config.THEME_COLORS,fonts: SL.config.THEME_FONTS,center: !1,rollingLinks: !1}, this.panel = new SL.views.themes.edit.Panel(this, t, e), this.panel.destroyed.add(function() {
            this.setSelectedListItem(null), $("html").removeClass("panel-open"), this.panel = null
        }.bind(this)), this.setSelectedListItem(t), this.bindLadda()
    },createTheme: function() {
        $.ajax({type: "POST",url: SL.config.AJAX_THEMES_CREATE,data: {theme: {font: SL.config.DEFAULT_THEME_FONT,color: SL.config.DEFAULT_THEME_COLOR,transition: SL.config.DEFAULT_THEME_TRANSITION,background_transition: SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION}},context: this}).done(function(t) {
            var e = new SL.models.Theme(t);
            this.themeData.isEmpty() ? (this.themeData.push(e), this.renderList(), this.makeDefaultTheme(e, null, !0)) : (this.themeData.push(e), this.renderListItem(e), SL.view.parseTimes()), this.editTheme(e)
        }).fail(function() {
            SL.notify(SL.locale.get("THEME_CREATE_ERROR"), "negative")
        })
    },saveTheme: function(t, e) {
        $.ajax({type: "PUT",url: SL.config.AJAX_THEMES_UPDATE(t.get("id")),data: {theme: t.toJSON()},context: this}).done(function(t) {
            var n = this.renderListItem(new SL.models.Theme(t));
            SL.view.parseTimes(), t && t.sanitize_messages && t.sanitize_messages.length ? SL.notify(t.sanitize_messages[0], "negative") : SL.notify(SL.locale.get("THEME_SAVE_SUCCESS")), SL.util.callback(e), setTimeout(function() {
                this.refreshListItemThumb(n)
            }.bind(this), 2500), setTimeout(function() {
                this.refreshListItemThumb(n)
            }.bind(this), 5e3)
        }).fail(function() {
            SL.notify(SL.locale.get("THEME_SAVE_ERROR"), "negative")
        })
    },removeTheme: function(t, e, n) {
        var i = this.getListItem(t);
        SL.prompt({anchor: n,title: SL.locale.get("THEME_REMOVE_CONFIRM"),type: "select",offsetX: 15,data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        var n = t.get("id");
                        $.ajax({type: "DELETE",url: SL.config.AJAX_THEMES_DELETE(n),context: this}).done(function() {
                            SL.util.anim.collapseListItem(i, function() {
                                i.remove()
                            }), SL.util.callback(e), this.themeData.removeByProperties({id: n}), this.panel && this.panel.getTheme().get("id") === n && this.panel.destroy(), SL.notify(SL.locale.get("THEME_REMOVE_SUCCESS"))
                        }).fail(function() {
                            SL.notify(SL.locale.get("THEME_REMOVE_ERROR"), "negative")
                        })
                    }.bind(this)}]})
    },makeDefaultTheme: function(t, e, n) {
        $.ajax({type: "PUT",url: SL.config.AJAX_UPDATE_ORGANIZATION,data: {team: {default_theme_id: t.get("id")}},context: this}).done(function() {
            SL.current_team.set("default_theme_id", t.get("id")), this.updateListDefault(), n || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_SUCCESS")), SL.util.callback(e)
        }).fail(function() {
            n || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_ERROR"), "negative")
        })
    },unmakeDefaultTheme: function(t, e) {
        $.ajax({type: "PUT",url: SL.config.AJAX_UPDATE_ORGANIZATION,data: {team: {default_theme_id: null}},context: this}).done(function() {
            SL.current_team.set("default_theme_id", null), this.updateListDefault(), e || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_SUCCESS")), SL.util.callback(t)
        }).fail(function() {
            e || SL.notify(SL.locale.get("THEME_DEFAULT_SAVE_ERROR"), "negative")
        })
    },getListItem: function(t) {
        return this.listElement.find('[data-theme-id="' + (t ? t.get("id") : null) + '"]')
    },setSelectedListItem: function(t) {
        this.listElement.find(".theme-list-item").removeClass("selected");
        var e = this.getListItem(t);
        e.length && e.addClass("selected")
    },refreshPreview: function(t) {
        t = t || this.previewTheme;
        var e = this.getPreviewWindow();
        e && t && (e.SL && e.SL.helpers && e.SL.helpers.ThemeController.paint(t, {center: 1 === this.VERSION}), this.previewTheme = t)
    },reloadPreview: function() {
        var t = this.getPreviewWindow();
        t && t.location.reload()
    },getPreviewWindow: function() {
        return this.previewFrame.length ? this.previewFrame.get(0).contentWindow : null
    },onWindowBeforeUnload: function() {
        return this.panel && this.panel.hasUnsavedChanges() ? SL.locale.get("LEAVE_UNSAVED_THEME") : void 0
    },onCreateThemeClicked: function(t) {
        t.preventDefault(), this.createTheme()
    }}),
SL("views.themes.edit.pages").Palette = Class.extend({
    init: function(t, e) {
        this.editor = t, this.theme = e, this.changed = new signals.Signal, this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this), this.onListItemDelete = this.onListItemDelete.bind(this), this.onListItemMouseDown = this.onListItemMouseDown.bind(this), this.render(), this.bind()
    },render: function() {
        this.domElement = $('<div class="page" data-page-id="palette">'), this.domElement.html(['<div class="page-header">', "<h4>Color Palette</h4>", '<p>Replace the default color options that we offer throughout the deck editor with your own custom color palette. <a class="documentation-link" href="#">More info</a></p>', '<div class="documentation">', "<p>A color picker component appears in multiple places inside of the deck editor, such as when setting text or slide background color. Inside of that color picker we display a preset color palette. If you define a custom color palette here anyone using this theme will see your custom palette instead of our defaults.</p>", "<h5>Reset</h5>", "<p>If no custom colors are added here we'll show our default palette. Colors can be deleted by clicking the trash icon that appears when hovering over them with your mouse pointer.</p>", "<h5>Rearrange</h5>", "<p>Drag and drop colors in your palette to change their order.</p>", "</div>", "</div>", '<div class="page-body">', '<div class="palette-picker">', '<div class="palette-picker-api"></div>', "</div>", '<ul class="palette-list"></ul>', "</div>"].join("")), this.innerElement = this.domElement.find(".page-body"), this.pickerElement = this.domElement.find(".palette-picker"), this.pickerAPIElement = this.domElement.find(".palette-picker-api"), this.listElement = this.domElement.find(".palette-list"), this.documentationLinkElement = this.domElement.find(".page-header .documentation-link"), this.documentationElement = this.domElement.find(".page-header .documentation"), this.documentationElement.hide(), this.renderPicker(), this.renderList(), this.checkIfEmpty()
    },renderPicker: function() {
        this.pickerAPIElement.spectrum({flat: !0,showInput: !0,showButtons: !1,showInitial: !1,showPalette: !1,showSelectionPalette: !1,preferredFormat: "hex",className: "palette-picker-spectrum",move: function(t) {
                this.setPreviewColor(t.toHexString())
            }.bind(this),change: function(t) {
                this.setPreviewColor(t.toHexString())
            }.bind(this)}), this.domElement.find(".palette-picker-spectrum .sp-input-container").append('<div class="palette-picker-save-button"><span class="icon i-plus"></span>Save color</div>'), this.pickerSaveButton = this.domElement.find(".palette-picker-save-button")
    },renderList: function() {
        this.listElement.empty(), this.theme.get("palette").forEach(this.renderListItem.bind(this))
    },renderListItem: function(t) {
        var e = $('<li class="palette-list-item sl-form">');
        return e.data("color", t), e.html(['<div class="palette-list-item-color"></div>', '<div class="palette-list-item-label">' + t + "</div>", '<div class="palette-list-item-delete"><span class="icon i-trash-stroke"></span></div>'].join("")), e.appendTo(this.listElement), e.toggleClass("is-light", tinycolor(t).isLight()), e.find(".palette-list-item-color").css("background-color", t), e.find(".palette-list-item-delete").on("click", this.onListItemDelete), e.on("mousedown", this.onListItemMouseDown), e
    },bind: function() {
        this.documentationLinkElement.on("click", this.onDocumentationLinkClicked.bind(this)), this.pickerSaveButton.on("click", this.onSaveButtonClicked.bind(this))
    },appendTo: function(t) {
        this.domElement.appendTo(t)
    },setPreviewColor: function(t) {
        this.pickerSaveButton.css({color: tinycolor(t).isLight() ? "#222222" : "#ffffff",backgroundColor: t})
    },checkIfEmpty: function() {
        0 === this.listElement.find(".palette-list-item").length ? this.listElement.append('<span class="palette-list-empty">No custom colors have been added</span>') : this.listElement.find(".palette-list-empty").remove()
    },refresh: function() {
        this.pickerAPIElement.spectrum("set", "#000000"), this.pickerAPIElement.spectrum("reflow"), this.setPreviewColor("#000000")
    },persist: function() {
        var t = this.listElement.find(".palette-list-item:not(.element)").map(function() {
            return $(this).data("color")
        }).toArray();
        this.theme.set("palette", t), this.checkIfEmpty(), this.changed.dispatch()
    },destroy: function() {
        this.changed.dispose(), this.listElement.find(".palette-list-item").off(), this.editor = null, this.theme = null
    },onDocumentationLinkClicked: function(t) {
        t.preventDefault(), this.documentationElement.toggle(), this.documentationLinkElement.text(this.documentationElement.is(":visible") ? "Less info" : "More info")
    },onSaveButtonClicked: function() {
        var t = this.renderListItem(this.pickerAPIElement.spectrum("get"));
        this.listElement.prepend(t), this.persist()
    },onListItemDelete: function(t) {
        var e = $(t.target).closest(".palette-list-item");
        e.length ? (e.remove(), this.persist()) : SL.notify("An error occured while deleting this color")
    },onListItemMouseDown: function(t) {
        var e = $(t.currentTarget);
        e.length && e.is(".palette-list-item") && 0 === $(t.target).closest(".palette-list-item-delete").length && (this.dragTarget = e, this.dragGhost = e.clone().appendTo(this.listElement), this.dragGhost.addClass("drag-ghost"), this.dragTarget.addClass("drag-target"), this.dragOffsetX = t.clientX - this.dragTarget.offset().left, this.dragOffsetY = t.clientY - this.dragTarget.offset().top, this.listOffsetX = this.listElement.offset().left, this.listOffsetY = this.listElement.offset().top, this.listWidth = this.listElement.width(), this.listHeight = this.listElement.height(), this.listItemSize = this.dragTarget.outerHeight(), this.listItemCols = Math.floor(this.listWidth / this.listItemSize), $(document).on("mousemove", this.onDocumentMouseMove), $(document).on("mouseup", this.onDocumentMouseUp), this.onDocumentMouseMove(t))
    },onDocumentMouseMove: function(t) {
        t.preventDefault();
        var e = this.listElement.find(".palette-list-item"), n = t.clientX - this.listOffsetX - this.dragOffsetX, i = t.clientY - this.listOffsetY - this.dragOffsetY;
        n = Math.max(Math.min(n, this.listWidth - this.listItemSize), 0), i = Math.max(Math.min(i, this.listHeight - this.listItemSize), 0), this.dragGhost.css({left: n,top: i});
        var s = Math.round(n / this.listItemSize), o = Math.round(i / this.listItemSize);
        s = Math.max(Math.min(s, this.listItemCols), 0), o = Math.max(Math.min(o, e.length), 0);
        var r = o * this.listItemCols + s, a = $(e[r]);
        a.is(this.dragTarget) || (this.dragTarget.index() > r ? a.before(this.dragTarget) : a.after(this.dragTarget))
    },onDocumentMouseUp: function() {
        this.dragTarget.removeClass("drag-target"), this.dragGhost.remove(), $(document).off("mousemove", this.onDocumentMouseMove), $(document).off("mouseup", this.onDocumentMouseUp), this.persist()
    }}),
SL("views.themes.edit.pages").Snippets = Class.extend({
    init: function(t, e) {
        this.editor = t, this.theme = e, this.changed = new signals.Signal, this.render(), this.bind(), this.syncMoveButtons()
    },render: function() {
        this.domElement = $('<div class="page" data-page-id="snippets">'), this.domElement.html(['<div class="page-header">', "<h4>Snippets</h4>", '<p>Snippets are small HTML templates that your team members can use as building blocks when creating decks. These templates can contain placeholder variables that are filled out at the time of insertion. <a class="documentation-link" href="#">More info</a></p>', '<div class="documentation">', "<p>Each snippet consist of two values; title and template. The title is what we'll show your teammates so try to keep it descriptive. The template is where you enter your custom HTML.</p>", "<h5>Variables</h5>", "<p>If you add placeholder variables inside of your templates the user will be prompted to fill them out. The syntax for variables is as follows:</p>", "<pre><code>{{Label Value}}</code></pre>", "<p>The string between the opening and closing brackets is considered the variable name. This name is shown when the snippet is inserted so that the author knows what value you're expecting.</p>", "<p>It's possible to define default values for variables. To do so you'll need to delimit your variable name and default value by two colon characters as shown below.</p>", "<pre><code>{{Label Value::Default value}}</code></pre>", "<h5>Example</h5>", "<p>Here's a basic example template that shows how you could create a snippet for images with captions.</p>", "<pre><code>", '&lt;div class="image-with-caption"&gt;\n', '  &lt;img src="{{Image URL}}"&gt;\n', "  &lt;p&gt;{{Caption::Untitled}}&lt;/p&gt;\n", "&lt;/div&gt;", "</code></pre>", "</div>", "</div>", '<div class="page-body">', '<ul class="snippet-list"></ul>', '<ul class="snippet-controls snippet-list-item sl-form">', '<div class="add-button-wrapper">', '<button class="button l add-button">Add Snippet <span class="icon i-plus"></span></button>', "</div>", '<div class="unit text">', "<label>Title</label>", '<input class="title-value" maxlength="200" type="text" readonly>', "</div>", '<div class="unit text">', "<label>Template</label>", '<textarea class="template-value" rows="4" readonly></textarea>', "</div>", "</ul>", "</div>"].join("")), this.innerElement = this.domElement.find(".page-body"), this.listElement = this.domElement.find(".snippet-list"), this.controlsElement = this.domElement.find(".snippet-controls"), this.addButton = this.domElement.find(".snippet-controls .add-button-wrapper"), this.documentationLinkElement = this.domElement.find(".page-header .documentation-link"), this.documentationElement = this.domElement.find(".page-header .documentation"), this.documentationElement.hide(), this.renderList()
    },renderList: function() {
        this.listElement.empty(), this.theme.get("snippets").forEach(this.renderListItem.bind(this))
    },renderListItem: function(t) {
        var e = $('<li class="snippet-list-item sl-form">');
        return e.html(['<div class="unit text">', "<label>Title</label>", '<input class="title-value" maxlength="200" value="' + t.get("title") + '" type="text" spellcheck="false">', "</div>", '<div class="unit text">', "<label>Template</label>", '<textarea class="template-value" rows="4" spellcheck="false">' + t.get("template") + "</textarea>", '<div class="status" data-tooltip="" data-tooltip-maxwidth="400" data-tooltip-align="left"><span class="icon i-info"></span></div>', "</div>", '<div class="snippet-list-item-footer">', '<button class="button outline delete-button" data-tooltip="Delete" data-tooltip-delay="1000"><snap class="icon i-trash-stroke"></snap></button>', '<button class="button outline preview-button" data-tooltip="Preview" data-tooltip-delay="1000"><snap class="icon i-eye"></snap></button>', '<button class="button outline move-up-button" data-tooltip="Move Up" data-tooltip-delay="1000"><snap class="icon i-arrow-up"></snap></button>', '<button class="button outline move-down-button" data-tooltip="Move Down" data-tooltip-delay="1000"><snap class="icon i-arrow-down"></snap></button>', "</div>"].join("")), e.appendTo(this.listElement), e.data("model", t), e.find("input, textarea").on("input", this.onSnippetChange.bind(this)), e.find("input, textarea").on("focus", this.onSnippetFocused.bind(this)), e.find(".delete-button").on("click", this.onSnippetDelete.bind(this)), e.find(".preview-button").on("click", this.onSnippetFocused.bind(this)), e.find(".move-up-button").on("click", this.onSnippetMoveUp.bind(this)), e.find(".move-down-button").on("click", this.onSnippetMoveDown.bind(this)), this.validateSnippet(e), e
    },bind: function() {
        this.addButton.on("click", this.addSnippet.bind(this)), this.documentationLinkElement.on("click", this.onDocumentationLinkClicked.bind(this))
    },appendTo: function(t) {
        this.domElement.appendTo(t), this.listElement.find(".snippet-list-item").each(function(t, e) {
            this.layoutSnippet($(e))
        }.bind(this))
    },addSnippet: function() {
        var t = this.theme.get("snippets").create(), e = this.renderListItem(t);
        e.data("model", t), e.find("input").first().focus(), setTimeout(function() {
            var t = this.domElement.prop("scrollHeight");
            t -= this.domElement.outerHeight(!0), t -= this.controlsElement.outerHeight(!0), this.domElement.scrollTop(t)
        }.bind(this), 1), this.changed.dispatch(), this.syncMoveButtons()
    },layoutSnippet: function(t) {
        var e = t.find(".template-value");
        e.attr("rows", 4);
        var n = parseFloat(e.css("line-height")), i = e.prop("scrollHeight"), s = e.prop("clientHeight");
        i > s && e.attr("rows", Math.min(Math.ceil(i / n), 10))
    },validateSnippet: function(t) {
        var e = t.data("model"), n = [], i = [], s = e.templateHasVariables(), o = e.templateHasSelection();
        if (s && o)
            i.push("Templates can not mix variables and selection tags.");
        else if (s) {
            var r = e.getTemplateVariables();
            n.push("Found " + r.length + " variables:"), r.forEach(function(t) {
                n.push(t.defaultValue ? "- " + t.label + " (default: " + t.defaultValue + ")" : "- " + t.label)
            })
        }
        i.length ? t.find(".status").addClass("negative").show().attr("data-tooltip", i.join("<br>")) : n.length ? t.find(".status").removeClass("negative").show().attr("data-tooltip", n.join("<br>")) : t.find(".status").removeClass("negative").hide()
    },previewSnippet: function(t) {
        var e = this.editor.getPreviewWindow(), n = e.$("#snippet-slide");
        0 === n.length && (n = $('<section id="snippet-slide">').appendTo(e.$(".reveal .slides"))), n.html(['<div class="sl-block" data-block-type="html" style="width: 100%; left: 0; top: 0; height: auto;">', '<div class="sl-block-content">', t.templatize(t.getTemplateVariables()), "</div>", "</div>"].join("")), e.SL.util.skipCSSTransitions(), e.Reveal.sync(), e.Reveal.slide(n.index())
    },syncSnippetOrder: function() {
        var t = this.listElement.find(".snippet-list-item"), e = this.theme.get("snippets");
        t.sort(function(t, n) {
            var i = e.find($(t).data("model")), s = e.find($(n).data("model"));
            return i - s
        }.bind(this)), t.each(function(t, e) {
            this.listElement.append(e)
        }.bind(this)), this.syncMoveButtons()
    },syncMoveButtons: function() {
        this.listElement.find(".snippet-list-item").each(function(t, e) {
            e = $(e), e.find(".move-up-button").toggleClass("disabled", e.is(":first-child")), e.find(".move-down-button").toggleClass("disabled", e.is(":last-child"))
        })
    },destroy: function() {
        this.changed.dispose(), this.listElement.find(".snippet-list-item").off().removeData("model");
        var t = this.editor.getPreviewWindow();
        t.$("#snippet-slide").remove(), t.Reveal.sync(), t.Reveal.slide(0), this.editor = null, this.theme = null
    },onDocumentationLinkClicked: function(t) {
        t.preventDefault(), this.documentationElement.toggle(), this.documentationLinkElement.text(this.documentationElement.is(":visible") ? "Less info" : "More info")
    },onSnippetFocused: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        e.length && this.previewSnippet(e.data("model"))
    },onSnippetChange: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.find(".title-value").val(), i = e.find(".template-value").val(), s = SL.util.html.findScriptTags(i);
            if (s.length > 0)
                return SL.notify("Scripts are not allowed. Please remove all script tags for this snippet to save.", "negative"), !1;
            var o = e.data("model");
            o.set("title", n), o.set("template", i), this.layoutSnippet(e), this.validateSnippet(e), this.previewSnippet(o), this.changed.dispatch()
        }
    },onSnippetDelete: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.data("model");
            n ? SL.prompt({anchor: $(t.currentTarget),title: SL.locale.get("THEME_SNIPPET_DELETE_CONFIRM"),type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Remove</h3>",selected: !0,className: "negative",callback: function() {
                            SL.util.anim.collapseListItem(e, function() {
                                e.remove(), this.syncMoveButtons()
                            }.bind(this));
                            var t = this.theme.get("snippets");
                            t.remove(e.data("model")), this.changed.dispatch()
                        }.bind(this)}]}) : SL.notify("An error occured while deleting this snippet")
        } else
            SL.notify("An error occured while deleting this snippet")
    },onSnippetMoveUp: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.data("model");
            if (n) {
                var i = this.theme.get("snippets");
                i.shiftLeft(i.find(n)), this.changed.dispatch(), this.syncSnippetOrder()
            }
        }
    },onSnippetMoveDown: function(t) {
        var e = $(t.target).closest(".snippet-list-item");
        if (e.length) {
            var n = e.data("model");
            if (n) {
                var i = this.theme.get("snippets");
                i.shiftRight(i.find(n)), this.changed.dispatch(), this.syncSnippetOrder()
            }
        }
    }}), 

SL("views.themes.edit").Panel = Class.extend({
    PAGES: [{name: "Settings",id: "settings",factory: "renderSettings"}, {name: "CSS",id: "css",factory: "renderCSS"}, {name: "HTML",id: "html",factory: "renderHTML"}, 
    {name: "JS",id: "js",factory: "renderJS",condition: function() {
                return SL.current_team.get("allow_scripts")
            }
    }, {name: "Palette",id: "palette",factory: "renderPalette",condition: function() {
                return this.editor.VERSION > 1
            }
    }, {name: "Snippets",id: "snippets",factory: "renderSnippets"}],init: function(t, e, n) {
        this.editor = t, this.theme = e.clone(), this.themeOptionsConfig = n, this.previewTimeout = -1, this.destroyed = new signals.Signal, this.updatePreview = this.updatePreview.bind(this), this.paintPreview = this.paintPreview.bind(this), this.render(), this.bind(), this.showPage("settings"), this.paintPreview(), this.savedJSON = JSON.stringify(this.theme.toJSON()), this.checkUnsavedChanges()
    },render: function() {
        this.domElement = $('<div class="panel">'), this.domElement.appendTo(this.editor.editorInnerElement), this.pagesElement = $('<div class="pages">'), this.pagesElement.appendTo(this.domElement), this.renderHeader(), this.renderPages()
    },renderHeader: function() {
        this.headerElement = $('<header class="panel-header">').appendTo(this.domElement), this.tabsElement = $('<div class="page-tabs">').appendTo(this.headerElement), this.cancelButton = $('<button class="button l grey cancel-button">Close</button>').appendTo(this.headerElement), this.saveButton = $('<button class="button l positive save-button ladda-button" data-style="zoom-out">Save</button>').appendTo(this.headerElement), this.onSaveClicked = this.onSaveClicked.bind(this), this.onCancelClicked = this.onCancelClicked.bind(this), this.saveButton.on("click", this.onSaveClicked), this.cancelButton.on("click", this.onCancelClicked)
    },renderPages: function() {
        this.PAGES.forEach(function(t) {
            ("function" != typeof t.condition || t.condition.call(this)) && ($('<button class="page-tab" data-page-id="' + t.id + '">' + t.name + "</button>").on("click", this.showPage.bind(this, t.id)).appendTo(this.tabsElement), this[t.factory]())
        }.bind(this))
    },renderSettings: function() {
        this.settingsElement = $('<div class="page sl-form" data-page-id="settings">').appendTo(this.pagesElement), this.settingsElement.append('<div class="unit name" data-required><label for="">Name</label><input id="theme-name" placeholder="Theme name" type="text" value="' + (this.theme.get("name") || "Untitled") + '"></div>'), this.settingsElement.find("#theme-name").on("change", this.paintPreview), this.settingsElement.find("#theme-name").on("input", this.onNameInputChanged.bind(this)), this.renderThemeOptions()
    },renderThemeOptions: function() {
        var t = $.extend(this.themeOptionsConfig, {model: this.theme,container: this.settingsElement});
        "no-color" !== t.colors[t.colors.length - 1].id && t.colors.push({id: "no-color",tooltip: "Specifies as few color styles as possible, useful if you want to write custom CSS from the ground up."}), "no-font" !== t.fonts[t.fonts.length - 1].id && t.fonts.push({id: "no-font",title: "None",tooltip: "Specifies as few typographic styles as possible, useful if you want to write custom CSS from the ground up."}), this.themeOptions = new SL.components.ThemeOptions(t), this.themeOptions.changed.add(this.paintPreview)
    },renderCSS: function() {
        this.cssElement = $('<div class="page" data-page-id="css">').appendTo(this.pagesElement), this.cssElement.append('<div class="editor-wrapper"><div id="ace-less" class="editor"></div><div class="error"></div><div class="info" data-tooltip="' + SL.locale.get("THEME_CSS_DESCRIPTION") + '" data-tooltip-maxwidth="300" data-tooltip-align="left"><span class="icon i-info"></span></div></div>'), this.cssErrorElement = this.cssElement.find(".error");
        try {
            this.cssEditor = ace.edit("ace-less"), this.cssEditor.setTheme("ace/theme/monokai"), this.cssEditor.setDisplayIndentGuides(!0), this.cssEditor.setShowPrintMargin(!1), this.cssEditor.getSession().setMode("ace/mode/less"), this.cssEditor.env.document.setValue(this.theme.get("less") || ""), this.cssEditor.env.editor.on("change", this.onCSSInputChanged.bind(this)), this.syncCSS()
        } catch (t) {
            console.log("An error occurred while initializing the Ace CSS editor.")
        }
    },syncCSS: function() {
        var t, e = SL.util.string.getCustomClassesFromLESS(this.cssEditor.env.document.getValue());
        t = e.length ? "Found custom slide classes:<br>- " + e.join("<br>- ") + "<br><br>" + SL.locale.get("THEME_CSS_DESCRIPTION") : SL.locale.get("THEME_CSS_DESCRIPTION"), this.cssElement.find(".info").toggleClass("positive", e.length > 0), this.cssElement.find(".info").attr("data-tooltip", t)
    },renderHTML: function() {
        this.htmlElement = $('<div class="page" data-page-id="html">').appendTo(this.pagesElement), this.htmlElement.append('<div class="editor-wrapper"><div id="ace-html" class="editor"></div>', '<div class="info" data-tooltip="' + SL.locale.get("THEME_HTML_DESCRIPTION") + '" data-tooltip-maxwidth="300" data-tooltip-align="left"><span class="icon i-info"></span></div></div>');
        try {
            this.htmlEditor = ace.edit("ace-html"), this.htmlEditor.setTheme("ace/theme/monokai"), this.htmlEditor.setDisplayIndentGuides(!0), this.htmlEditor.setShowPrintMargin(!1), this.htmlEditor.getSession().setMode("ace/mode/html"), this.htmlEditor.env.document.setValue(this.theme.get("html") || ""), this.htmlEditor.env.editor.on("change", this.onHTMLInputChanged.bind(this))
        } catch (t) {
            console.log("An error occurred while initializing the Ace HTML editor.")
        }
    },renderJS: function() {
        this.jsElement = $('<div class="page" data-page-id="js">').appendTo(this.pagesElement), this.jsElement.append('<div class="editor-wrapper"><div id="ace-js" class="editor"></div>', '<div class="info" data-tooltip="' + SL.locale.get("THEME_JS_DESCRIPTION") + '" data-tooltip-maxwidth="300" data-tooltip-align="left"><span class="icon i-info"></span></div></div>');
        try {
            this.jsEditor = ace.edit("ace-js"), this.jsEditor.setTheme("ace/theme/monokai"), this.jsEditor.setDisplayIndentGuides(!0), this.jsEditor.setShowPrintMargin(!1), this.jsEditor.getSession().setMode("ace/mode/javascript"), this.jsEditor.env.document.setValue(this.theme.get("js") || ""), this.jsEditor.env.editor.on("change", this.onJSInputChanged.bind(this))
        } catch (t) {
            console.log("An error occurred while initializing the Ace JS editor.")
        }
    },renderPalette: function() {
        this.palette = new SL.views.themes.edit.pages.Palette(this.editor, this.theme), this.palette.appendTo(this.pagesElement), this.palette.changed.add(this.checkUnsavedChanges.bind(this))
    },renderSnippets: function() {
        this.snippets = new SL.views.themes.edit.pages.Snippets(this.editor, this.theme), this.snippets.appendTo(this.pagesElement), this.snippets.changed.add(this.checkUnsavedChanges.bind(this))
    },bind: function() {
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), $(document).on("keydown", this.onDocumentKeyDown)
    },showPage: function(t) {
        this.domElement.find(".page").removeClass("past present future"), this.domElement.find('.page[data-page-id="' + t + '"]').addClass("present"), this.domElement.find('.page[data-page-id="' + t + '"]').prevAll().addClass("past"), this.domElement.find('.page[data-page-id="' + t + '"]').nextAll().addClass("future"), this.domElement.find(".panel-header .page-tab").removeClass("selected"), this.domElement.find('.panel-header .page-tab[data-page-id="' + t + '"]').addClass("selected"), "css" === t && this.cssEditor ? this.cssEditor.focus() : "html" === t && this.htmlEditor ? this.htmlEditor.focus() : "js" === t && this.jsEditor ? this.jsEditor.focus() : "palette" === t && this.palette && this.palette.refresh(), 
        setTimeout(function() {
            this.domElement.find(".page").addClass("transition")
        }.bind(this), 1), this.resetScrollPosition()
    },resetScrollPosition: function() {
        this.domElement.scrollLeft(0).scrollTop(0), this.settingsElement.scrollLeft(0).scrollTop(0)
    },updatePreview: function(t) {
        "number" != typeof t && (t = 250), clearTimeout(this.previewTimeout), this.previewTimeout = setTimeout(function() {
            this.paintPreview()
        }.bind(this), t)
    },paintPreview: function() {
        this.preprocess(function() {
            this.editor.refreshPreview(this.theme)
        }.bind(this), function() {
            this.editor.refreshPreview(this.theme)
        }.bind(this))
    },preprocess: function(t, e) {
        this.theme.set("name", this.domElement.find("#theme-name").val()), this.cssEditor && this.theme.set("less", this.cssEditor.env.document.getValue()), this.htmlEditor && this.theme.set("html", this.htmlEditor.env.document.getValue()), this.jsEditor && this.theme.set("js", this.jsEditor.env.document.getValue()), this.cssParser || (this.cssParser = new less.Parser);
        var n = this.cssEditor.env.document.getValue();
        n ? this.cssParser.parse(".reveal { " + n + " }", function(i, s) {
            if (i)
                this.cssErrorElement.addClass("visible"), this.cssErrorElement.html(i.message), SL.util.callback(e, i);
            else {
                this.cssErrorElement.removeClass("visible");
                try {
                    var o = s.toCSS()
                } catch (r) {
                    console.log(r)
                }
                if (o) {
                    var a = "";
                    o = o.replace(/@import url\(["'\s]*(http:|https:)?\/\/(.*)\);?/gi, function(t) {
                        return a += t + "\n", ""
                    }), o = a + o, this.theme.set("less", n), this.theme.set("css", o), SL.util.callback(t)
                } else
                    SL.util.callback(e)
            }
            this.checkUnsavedChanges()
        }.bind(this)) : (this.theme.set("less", ""), this.theme.set("css", ""), SL.util.callback(t)), this.checkUnsavedChanges()
    },hasUnsavedChanges: function() {
        return this.savedJSON !== JSON.stringify(this.theme.toJSON())
    },checkUnsavedChanges: function() {
        this.domElement.toggleClass("has-unsaved-changes", this.hasUnsavedChanges())
    },save: function(t) {
        var e = this.saveButton.data("ladda");
        e && e.start(), this.preprocess(function() {
            this.savedJSON = JSON.stringify(this.theme.toJSON()), this.editor.saveTheme(this.theme, function() {
                e && e.stop(), SL.util.callback(t)
            }.bind(this))
        }.bind(this), function() {
            SL.notify("Please fix all CSS errors before saving", "negative"), e && e.stop()
        }.bind(this))
    },close: function(t) {
        this.hasUnsavedChanges() ? SL.prompt({anchor: this.cancelButton,title: SL.locale.get("WARN_UNSAVED_CHANGES"),alignment: "b",type: "select",data: [{html: "<h3>Cancel</h3>"}, {html: "<h3>Discard</h3>",className: "divider",callback: function() {
                        this.destroy(), SL.util.callback(t)
                    }.bind(this)}, {html: "<h3>Save</h3>",className: "positive",selected: !0,callback: function() {
                        SL.util.callback(t), this.save(this.destroy.bind(this))
                    }.bind(this)}]}) : (this.destroy(), SL.util.callback(t))
    },getTheme: function() {
        return this.theme
    },onCSSInputChanged: function() {
        this.syncCSS(), this.updatePreview()
    },onHTMLInputChanged: function() {
        this.updatePreview()
    },onJSInputChanged: function() {
        this.updatePreview(1e3)
    },onNameInputChanged: function() {
        this.theme.set("name", this.domElement.find("#theme-name").val()), this.checkUnsavedChanges()
    },onSaveClicked: function() {
        this.save()
    },onCancelClicked: function() {
        this.close()
    },onDocumentKeyDown: function(t) {
        (t.metaKey || t.ctrlKey) && 83 === t.keyCode && (this.hasUnsavedChanges() && this.save(), t.preventDefault())
    },destroy: function() {
        this.isDestroyed || (this.isDestroyed = !0, clearTimeout(this.previewTimeout), this.destroyed.dispatch(), this.destroyed.dispose(), $(document).off("keydown", this.onDocumentKeyDown), setTimeout(function() {
            this.cssEditor && (this.cssEditor.destroy(), this.cssEditor = null), this.htmlEditor && (this.htmlEditor.destroy(), this.htmlEditor = null), this.jsEditor && (this.jsEditor.destroy(), this.jsEditor = null), this.palette && (this.palette.destroy(), this.palette = null), this.snippets && (this.snippets.destroy(), this.snippets = null), this.themeOptions.destroy(), this.domElement.remove()
        }.bind(this), 500))
    }}), 

SL("views.themes").Preview = SL.views.Base.extend({
    init: function() {
        this._super(), SL.util.setupReveal({openLinksInTabs: !0}), window.parent !== window.self && window.parent.postMessage({type: "theme-preview-ready"}, window.location.origin)
}}), 
SL("views.users").Show = SL.views.Base.extend({
    init: function() {
        this._super(), $(".decks .deck").each(function(t, e) {
            e = $(e), e.find(".edit").on("vclick", this.onEditClicked.bind(this, e)), e.find(".share").on("vclick", this.onShareClicked.bind(this, e)), e.find(".fork").on("vclick", this.onForkClicked.bind(this, e)), e.find(".clone").on("vclick", this.onCloneClicked.bind(this, e)), e.find(".delete").on("vclick", this.onDeleteClicked.bind(this, e)), e.find(".lock-icon").on("vclick", this.onVisibilityClicked.bind(this, e)), e.find(".visibility").on("vclick", this.onVisibilityClicked.bind(this, e)), e.hasClass("is-owner") && (e.find(".deck-title-value").attr({"data-tooltip": "Click to edit","data-tooltip-alignment": "l","data-tooltip-delay": 200}), e.find(".deck-title-value").on("click", this.onDeckTitleClicked.bind(this, e)), e.find(".deck-description-value").attr({"data-tooltip": "Click to edit","data-tooltip-alignment": "l","data-tooltip-delay": 200}), e.find(".deck-description-value").on("click", this.onDeckDescriptionClicked.bind(this, e)))
        }.bind(this)), $(".decks .deck .ladda-button").each(function(t, e) {
            $(e).data("ladda", Ladda.create(e))
        }), SL.util.device.IS_PHONE && $("html").addClass("is-mobile-phone"), this.showAnnouncement()
    },showAnnouncement: function() {
        if (Modernizr.localstorage && SL.current_user.isEnterpriseManager() && SL.current_team && SL.current_team.get("beta_new_editor") === !1) {
            var t = "slides-team-has-seen-new-editor-announcement";
            if (!localStorage.getItem(t)) {
                var e = $(['<section class="announcement">', "<h3>New Editor</h3>", '<p>We have released a new and greatly improved presentation editor. Have a look at the <a href="http://slides.com/news/new-editor/" target="_blank">demo presentation</a> for a quick overview.</p>', "<p>To enable the new editor, please visit the team settings page.</p>", '<a class="button positive" href="/edit#beta-features">Team settings</a>', '<a class="button grey dismiss-button">Dismiss</a>', "</section>"].join(""));
                e.find(".dismiss-button").on("click", function() {
                    e.remove(), localStorage.setItem(t, "completed")
                }), $(".main section").first().before(e)
            }
        }
    },getDeckData: function(t) {
        return {user: {username: t.attr("data-username")},id: t.attr("data-id"),slug: t.attr("data-slug"),title: t.attr("data-title"),access_token: t.attr("data-access_token"),visibility: t.attr("data-visibility")}
    },saveVisibility: function(t, e) {
        var n = this.getDeckData(t), i = {type: "POST",url: SL.config.AJAX_PUBLISH_DECK(n.id),context: this,data: {visibility: e}}, s = t.find(".visibility").data("ladda");
        s && s.start(), $.ajax(i).done(function(e) {
            e.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_SELF")) : e.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_TEAM")) : e.deck.visibility === SL.models.Deck.VISIBILITY_ALL && SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ALL")), "string" == typeof e.deck.slug && t.attr("data-slug", e.deck.slug), "string" == typeof e.deck.visibility && t.attr("data-visibility", e.deck.visibility)
        }).fail(function() {
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative")
        }).always(function() {
            s && s.stop(), t.removeClass("hover")
        })
    },cloneDeck: function(t, e) {
        var n = this.getDeckData(t);
        t.addClass("hover");
        var i = t.find(".clone.ladda-button").data("ladda");
        i && i.start(), $.ajax({type: "POST",url: SL.config.AJAX_FORK_DECK(n.id),context: this}).done(function() {
            SL.util.callback(e)
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"), i && i.stop(), t.removeClass("hover")
        })
    },onEditClicked: function(t, e) {
        e.preventDefault(), window.location = t.attr("data-url") + "/edit"
    },onDeleteClicked: function(t, e) {
        e.preventDefault(), t.addClass("hover");
        var n = this.getDeckData(t), i = SL.prompt({anchor: $(e.currentTarget),title: SL.locale.get("DECK_DELETE_CONFIRM", {title: n.title}),type: "select",data: [{html: "<h3>Cancel</h3>",callback: function() {
                        t.removeClass("hover")
                    }.bind(this)}, {html: "<h3>Delete</h3>",selected: !0,className: "negative",callback: function() {
                        t.find(".details .status").text("Deleting...");
                        var e = t.find(".delete.ladda-button").data("ladda");
                        e && e.start(), $.ajax({type: "DELETE",url: SL.config.AJAX_UPDATE_DECK(n.id),data: {},context: this}).done(function() {
                            SL.util.anim.collapseListItem(t, function() {
                                e && e.stop(), t.remove()
                            }.bind(this)), SL.notify(SL.locale.get("DECK_DELETE_SUCCESS"))
                        }).fail(function() {
                            SL.notify(SL.locale.get("DECK_DELETE_ERROR"), "negative"), e && e.stop()
                        }).always(function() {
                            t.removeClass("hover")
                        })
                    }.bind(this)}]});
        i.canceled.add(function() {
            t.removeClass("hover")
        }), SL.analytics.track("User.show: Delete deck")
    },onVisibilityClicked: function(t, e) {
        e.preventDefault(), t.addClass("hover");
        var n = this.getDeckData(t), i = [];
        i.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_SELF"),selected: n.visibility === SL.models.Deck.VISIBILITY_SELF,callback: function() {
                this.saveVisibility(t, SL.models.Deck.VISIBILITY_SELF), SL.analytics.track("User.show: Visibility changed", "self")
            }.bind(this)}), SL.current_user.isEnterprise() && i.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_TEAM"),selected: n.visibility === SL.models.Deck.VISIBILITY_TEAM,className: "divider",callback: function() {
                this.saveVisibility(t, SL.models.Deck.VISIBILITY_TEAM), SL.analytics.track("User.show: Visibility changed", "team")
            }.bind(this)}), i.push({html: SL.locale.get("DECK_VISIBILITY_CHANGE_ALL"),selected: n.visibility === SL.models.Deck.VISIBILITY_ALL,callback: function() {
                this.saveVisibility(t, SL.models.Deck.VISIBILITY_ALL), SL.analytics.track("User.show: Visibility changed", "all")
            }.bind(this)});
        var s = SL.prompt({anchor: $(e.currentTarget),type: "select",data: i});
        s.canceled.add(function() {
            t.removeClass("hover")
        }), SL.analytics.track("User.show: Visibility menu opened")
    },onShareClicked: function(t, e) {
        e.preventDefault();
        var n = this.getDeckData(t);
        return "string" != typeof n.user.username || "string" != typeof n.slug && "string" != typeof n.id ? SL.notify(SL.locale.get("GENERIC_ERROR"), "negative") : SL.modal.open("share-deck", n), !1
    },onCloneClicked: function(t, e) {
        return e.preventDefault(), this.cloneDeck(t, function() {
            window.location.reload()
        }), !1
    },onForkClicked: function(t, e) {
        return e.preventDefault(), this.cloneDeck(t, function() {
            window.location = SL.current_user.getProfileURL()
        }), !1
    },onDeckTitleClicked: function(t) {
        var e = t.find(".deck-title-value"), n = SL.prompt({anchor: e,title: "Edit deck title",type: "input",confirmLabel: "Save",data: {value: e.text(),placeholder: "Deck title...",maxlength: SL.config.DECK_TITLE_MAXLENGTH,width: 400,confirmBeforeDiscard: !0}});
        return n.confirmed.add(function(n) {
            n && "" !== n.trim() ? (e.text(n), $.ajax({url: SL.config.AJAX_UPDATE_DECK(this.getDeckData(t).id),
                type: "PUT",context: this,data: {deck: {title: n}}}).fail(function() {
                SL.notify("An error occured while saving your deck title", "negative")
            })) : SL.notify("Title can't be empty", "negative")
        }.bind(this)), !1
    },onDeckDescriptionClicked: function(t) {
        var e = t.find(".deck-description-value"), n = SL.prompt({anchor: e,title: "Edit deck description",type: "input",confirmLabel: "Save",data: {value: e.text(),placeholder: "A short description of this deck...",multiline: !0,confirmBeforeDiscard: !0}});
        return n.confirmed.add(function(n) {
            e.text(n), $.ajax({url: SL.config.AJAX_UPDATE_DECK(this.getDeckData(t).id),type: "PUT",context: this,data: {deck: {description: n}}}).fail(function() {
                SL.notify("An error occured while saving your deck description", "negative")
            })
        }.bind(this)), !1
    }});