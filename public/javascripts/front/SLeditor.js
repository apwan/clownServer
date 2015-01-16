/*
 * Created by WuYijie on 1/8/15.
 */


/*
 * SL Editor
 */

SL("editor.blocks").Base = Class.extend({
    init: function (e, t) {
        this.type = e, this.pairings = [], this.plugins = [], this.options = $.extend({
            contentElementType: "div",
            aspectRatio: 0,
            minWidth: 30,
            minHeight: 30,
            horizontalResizing: !0,
            verticalResizing: !0,
            keyboardConsumer: !1
        }, t), this.options.element && (this.domElement = $(this.options.element), this.contentElement = this.domElement.find(".sl-block-content")), this.setup(), this.validateProperties(), this.render(), this.bind(), this.format(), this.paint(), this.transform = new SL.editor.blocks.behavior.Transform(this)
    }, setup: function () {
        this.removed = new signals.Signal, this.dragStarted = new signals.Signal, this.dragUpdated = new signals.Signal, this.dragEnded = new signals.Signal, this.propertyChanged = new signals.Signal, this.focused = !1, this.moved = !1, this.mouseDownCursor = {
            x: 0,
            y: 0
        }, this.mouseDownMeasurements = null, this.properties = {
            style: {
                opacity: {
                    type: "number",
                    decimals: 2,
                    minValue: 0,
                    maxValue: 1,
                    defaultValue: 1
                },
                padding: {type: "number", unit: "px", decimals: 0, minValue: 0, maxValue: 100, defaultValue: 0},
                color: {computed: !0},
                "background-color": {computed: !0},
                "border-color": {computed: !0, getter: this.getBorderColor.bind(this)},
                "border-style": {
                    defaultValue: "none",
                    options: [{value: "solid", title: "Solid"}, {value: "dashed", title: "Dashed"}, {
                        value: "dotted",
                        title: "Dotted"
                    }]
                },
                "border-width": {type: "number", unit: "px", decimals: 0, minValue: 0, maxValue: 200, defaultValue: 0},
                "border-radius": {type: "number", unit: "px", decimals: 0, minValue: 0, maxValue: 200, defaultValue: 0},
                "text-align": {
                    options: [{value: "left", icon: "alignleft"}, {
                        value: "center",
                        icon: "aligncenter"
                    }, {value: "right", icon: "alignright"}, {value: "justify", icon: "alignjustify"}]
                },
                "font-size": {type: "number", unit: "%", minValue: 6, maxValue: 500, defaultValue: 100},
                "line-height": {type: "number", unit: "%", minValue: 0, maxValue: 300, defaultValue: 100},
                "z-index": {
                    type: "number",
                    minValue: 0,
                    maxValue: 1e3,
                    setter: this.setZ.bind(this),
                    getter: this.getZ.bind(this)
                }
            },
            attribute: {
                "class": {
                    type: "string",
                    setter: this.setClassName.bind(this),
                    getter: this.getClassName.bind(this)
                }
            }
        }
    }, validateProperties: function () {
        for (var e in this.properties) {
            var t = this.properties[e];
            for (var i in this.properties[e]) {
                var n = t[i], o = [];
                "number" === n.type && ("number" != typeof n.minValue && o.push("must have minValue"), "number" != typeof n.maxValue && o.push("must have maxValue"), "number" != typeof n.decimals && (n.decimals = 0), "string" != typeof n.unit && (n.unit = "")), o.length && console.warn('Malformed property "' + e + "." + i + '"', o)
            }
        }
    }, render: function () {
        this.domElement || (this.domElement = $("<div>"), this.domElement.addClass("sl-block"), this.contentElement = $("<" + this.options.contentElementType + ">").appendTo(this.domElement), this.contentElement.addClass("sl-block-content")), this.domElement.attr("data-block-type", this.type), this.domElement.data("block-instance", this)
    }, bind: function () {
        this.onClick = this.onClick.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onKeyDown = this.onKeyDown.bind(this), this.onKeyUp = this.onKeyUp.bind(this), this.onDoubleClick = this.onDoubleClick.bind(this), this.syncTransformVisibility = this.syncTransformVisibility.bind(this), this.domElement.on("vclick", this.onClick), this.domElement.on("vmousedown", this.onMouseDown), SL.editor.controllers.Blocks.focusChanged.add(this.syncTransformVisibility)
    }, format: function () {
        this.options.horizontalResizing === !1 && this.domElement.css("width", "auto"), this.options.verticalResizing === !1 && this.domElement.css("height", "auto")
    }, setDefaults: function () {
        this.domElement.css({"min-width": this.options.minWidth, "min-height": this.options.minHeight})
    }, setID: function (e) {
        this.domElement.attr("data-block-id", e)
    }, getID: function () {
        return this.domElement.attr("data-block-id")
    }, hasID: function () {
        return !!this.getID()
    }, appendTo: function (e) {
        this.domElement.appendTo(e)
    }, detach: function () {
        this.domElement.detach()
    }, focus: function () {
        this.focused || (this.focused = !0, this.domElement.addClass("is-focused"), this.syncTransformVisibility(), $(document).on("keydown", this.onKeyDown), $(document).on("keyup", this.onKeyUp))
    }, blur: function () {
        this.focused && (this.focused = !1, this.domElement.removeClass("is-focused"), this.syncTransformVisibility(), this.hidePaddingHint(), $(document).off("keydown", this.onKeyDown), $(document).off("keyup", this.onKeyUp))
    }, plug: function (e) {
        this.hasPlugin(e) ? console.log("Plugin is already plugged.") : this.plugins.push(new e(this))
    }, unplug: function (e) {
        for (var t = 0; t < this.plugins.length; t++) {
            var i = this.plugins[t];
            i instanceof e && (i.destroy(), this.plugins.splice(t, 1))
        }
    }, hasPlugin: function (e) {
        return this.plugins.some(function (t) {
            return t instanceof e
        })
    }, isFocused: function () {
        return this.focused
    }, showPaddingHint: function (e) {
        var t = this.get("style.padding");
        if (t > 0) {
            var i = this.domElement.find(".sl-block-padding-hint");
            0 === i.length && (i = $('<div class="editing-ui sl-block-overlay sl-block-padding-hint">'), i.appendTo(this.domElement));
            var n = this.measure(), o = n.height, r = n.width, s = Math.round(r / 2), a = Math.round(o / 2), l = Math.round(t), c = Math.round(r - t), h = Math.round(o - t), d = Math.round(t), u = i.find("canvas");
            0 === u.length && (u = $("<canvas>").appendTo(i)), u.attr({width: r, height: o});
            var p = u.get(0).getContext("2d");
            p.clearRect(0, 0, r, o), p.fillStyle = "rgba(17, 188, 231, 0.1)", p.fillRect(0, 0, r, o), p.clearRect(d, l, r - 2 * t, o - 2 * t), p.fillStyle = "rgba(17, 188, 231, 0.6)", p.fillRect(d, l, r - 2 * t, 1), p.fillRect(c, l, 1, o - 2 * t), p.fillRect(d, h, r - 2 * t, 1), p.fillRect(d, l, 1, o - 2 * t), p.fillRect(s - 1, 0, 1, t), p.fillRect(s - 1, h, 1, t), p.fillRect(0, a - 1, t, 1), p.fillRect(c, a - 1, t, 1), this.syncZ(), clearTimeout(this.hintPaddingTimeout), "number" == typeof e && (this.hintPaddingTimeout = setTimeout(this.hidePaddingHint.bind(this), e))
        } else
            this.hidePaddingHint()
    }, hidePaddingHint: function () {
        clearTimeout(this.hintPaddingTimeout), this.domElement.find(".sl-block-padding-hint").remove()
    }, set: function (e, t) {
        if ("string" == typeof e) {
            var i = e;
            e = {}, e[i] = t
        }
        var n = [];
        for (var o in e)
            if (e.hasOwnProperty(o)) {
                var r = this.getPropertySettings(o);
                if (r) {
                    var s = o.split("."), a = e[o], l = a, c = "function" == typeof r.targetElement ? r.targetElement() : this.contentElement;
                    r.unit && (a += r.unit), r.setter ? r.setter.call(null, a) : "style" === s[0] ? "undefined" != typeof r.defaultValue && r.defaultValue === l ? c.css(s[1], "") : c.css(s[1], a) : "attribute" === s[0] && c.attr(s[1], a), n.push(o)
                } else
                    console.log("Property not found:", o)
            }
        n.length && this.propertyChanged.dispatch(n)
    }, get: function (e) {
        var t = this.getPropertySettings(e);
        if (t) {
            var i, n = e.split("."), o = "function" == typeof t.targetElement ? t.targetElement() : this.contentElement;
            if (o && o.length)
                if (t.getter)
                    i = t.getter.call(this);
                else if ("style" === n[0]) {
                    var r = n[1].replace(/-(\w)/g, function (e, t) {
                        return t.toUpperCase()
                    });
                    i = t.computed ? o.css(r) : o.get(0).style[r]
                } else if ("attribute" === n[0] && (i = o.attr(n[1]), "string" == typeof i)) {
                    if ("null" === i)
                        return null;
                    if ("true" === i)
                        return !0;
                    if ("false" === i)
                        return !1;
                    if (i.match(/^\d+$/))
                        return parseFloat(i)
                }
            return "number" === t.type && (i = parseFloat(i)), "undefined" !== t.defaultValue && ("number" === t.type ? isNaN(i) && (i = t.defaultValue) : i || (i = t.defaultValue)), i
        }
        return void console.log("Property not found:", e)
    }, unset: function (e) {
        "string" == typeof e && (e = [e]);
        var t = [];
        e.forEach(function (e) {
            var i = this.getPropertySettings(e);
            if (i) {
                var n = e.split("."), o = "function" == typeof i.targetElement ? i.targetElement() : this.contentElement;
                "style" === n[0] ? o.css(n[1], "") : "attribute" === n[0] && o.removeAttr(n[1]), t.push(e)
            }
        }.bind(this)), t.length && this.propertyChanged.dispatch(t)
    }, isset: function (e) {
        var t = this.getPropertySettings(e);
        if (t) {
            if (t.checker)
                return t.call();
            var i = this.get(e);
            if (i && i !== t.defaultValue)
                return !0
        }
        return !1
    }, getPropertySettings: function (e) {
        if ("string" == typeof e) {
            e = e.split(".");
            var t = e[0], i = e[1], n = this.properties[t] ? this.properties[t][i] : null;
            if (n)
                return n;
            console.log("Property not found:", e)
        }
        return null
    }, getPropertyDefault: function (e) {
        var t = this.getPropertySettings(e);
        return t ? t.defaultValue : null
    }, setZ: function (e) {
        this.contentElement.css("z-index", e), this.domElement.find(".sl-block-overlay").css("z-index", e)
    }, getZ: function () {
        var e = parseInt(this.contentElement.css("z-index"), 10);
        return isNaN(e) ? -1 : e
    }, syncZ: function () {
        this.domElement.find(".sl-block-overlay").css("z-index", this.getZ())
    }, setClassName: function (e) {
        e = e.replace(/\s{2,}/g, " "), e = e.replace(/[^a-zA-Z0-9-_\s]*/gi, ""), e = e.trim(), this.contentElement.attr("class", "sl-block-content" + (e ? " " + e : ""))
    }, getClassName: function () {
        var e = this.contentElement.attr("class");
        return e = e.split(" ").map(function (e) {
            return e = e.trim(), (/^(sl\-|cke\_)/gi.test(e) || "visible" === e) && (e = ""), e
        }).join(" "), e = e.replace(/\s{2,}/g, " "), e = e.trim()
    }, getBorderColor: function () {
        return this.contentElement.css("border-top-color")
    }, getAspectRatio: function () {
        return this.options.aspectRatio
    }, hasAspectRatio: function () {
        return this.getAspectRatio() > 0
    }, syncAspectRatio: function () {
        if (this.hasAspectRatio()) {
            var e = this.measure();
            this.resize({width: e.width, height: e.height, center: !0})
        }
    }, syncTransformVisibility: function () {
        this.isFocused() ? this.transform.show() : this.transform.hide()
    }, showPlaceholder: function () {
        0 === this.domElement.find(".sl-block-placeholder").length && this.domElement.append('<div class="editing-ui sl-block-overlay sl-block-placeholder">')
    }, hidePlaceholder: function () {
        this.domElement.find(".sl-block-placeholder").remove()
    }, paint: function () {
        this.isEmpty() ? this.showPlaceholder() : this.hidePlaceholder(), this.syncZ()
    }, isEmpty: function () {
        return !1
    }, isEditingText: function () {
        return !1
    }, getToolbarOptions: function () {
        return SL.editor.controllers.Blocks.getCurrentBlocks().length > 1 ? [SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.BlockDepth, SL.editor.components.toolbars.options.BlockActions] : [SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.BlockActions]
    }, changeContentElementType: function (e) {
        this.contentElement.changeElementType(e), this.contentElement = this.domElement.find(".sl-block-content")
    }, move: function (e, t, i) {
        if (i && i.isOffset)
            this.domElement.css({left: "+=" + e, top: "+=" + t});
        else {
            var n = {};
            "number" == typeof e && (n.left = Math.round(e)), "number" == typeof t && (n.top = Math.round(t)), this.domElement.css(n)
        }
    }, moveToCenter: function () {
        var e = this.measure(), t = SL.view.getSlideSize();
        this.move((t.width - e.width) / 2, (t.height - e.height) / 2)
    }, resize: function (e) {
        e = e || {};
        var t;
        t = this.transform.isResizing() ? this.transform.getState().originalMeasurements : this.measure(), "number" == typeof e.top && (e.height = t.bottom - e.top, e.direction = "n"), "number" == typeof e.left && (e.width = t.right - e.left, e.direction = "w"), "number" == typeof e.right && (e.width = e.right - t.x), "number" == typeof e.bottom && (e.height = e.bottom - t.y);
        var i = Math.max(e.width, this.options.minWidth), n = Math.max(e.height, this.options.minHeight);
        if (this.transform.isResizingProportionally()) {
            var o = t.width / t.height;
            /s|n/.test(e.direction) ? i = n * o : n = i / o
        }
        if (this.hasAspectRatio()) {
            var r = this.getAspectRatio();
            e.direction ? /s|n/.test(e.direction) ? i = n * r : n = i / r : this.getAspectRatio() < 1 ? i = n * r : n = i / r
        }
        if (this.domElement.css({
                width: this.options.horizontalResizing ? i : "auto",
                height: this.options.verticalResizing ? n : "auto"
            }), this.transform.isResizingCentered() || e.center) {
            var s = this.measure();
            this.domElement.css({left: t.x + (t.width - s.width) / 2, top: t.y + (t.height - s.height) / 2})
        } else
            e.direction && (/n/.test(e.direction) && this.domElement.css("top", t.bottom - n), /w/.test(e.direction) && this.domElement.css("left", t.right - i), 1 === e.direction.length && (/n|s/.test(e.direction) ? this.domElement.css("left", t.x + (t.width - i) / 2) : /e|w/.test(e.direction) && this.domElement.css("top", t.y + (t.height - n) / 2)));
        this.transform.isResizing() && !this.transform.isResizingCentered() && (/n/.test(this.transform.getState().direction) && this.domElement.css("top", t.bottom - n), /e/.test(this.transform.getState().direction) && this.domElement.css("left", t.x), /s/.test(this.transform.getState().direction) && this.domElement.css("top", t.y), /w/.test(this.transform.getState().direction) && this.domElement.css("left", t.right - i))
    }, measure: function () {
        var e = this.domElement.get(0), t = {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: this.domElement.outerWidth(),
            height: this.domElement.outerHeight()
        };
        return t.right = t.x + t.width, t.bottom = t.y + t.height, t
    }, runIntro: function () {
        this.domElement.addClass("intro-start"), setTimeout(function () {
            this.domElement.removeClass("intro-start").addClass("intro-end"), setTimeout(function () {
                this.domElement.removeClass("intro-end")
            }.bind(this), 500)
        }.bind(this), 1)
    }, pair: function (e, t) {
        this.pairings.push({block: e, direction: t})
    }, unpair: function () {
        this.pairings.length = 0
    }, syncPairs: function () {
        this.pairings.forEach(function (e) {
            e.block.syncPairs()
        })
    }, destroy: function () {
        this.destroyed = !0, SL.editor.controllers.Blocks.focusChanged.remove(this.syncTransformVisibility), this.removed.dispatch(), this.removed.dispose(), this.dragStarted.dispose(), this.dragUpdated.dispose(), this.dragEnded.dispose(), this.propertyChanged.dispose(), this.transform.destroy(), this.domElement.off("vclick", this.onClick), this.domElement.off("vmousedown", this.onMouseDown), this.domElement.data("block-instance", null), this.domElement.remove()
    }, onClick: function (e) {
        SL.view.isEditing() && this.hasPlugin(SL.editor.blocks.plugin.Link) && this.isLinked() && e.preventDefault()
    }, onMouseDown: function (e) {
        return !SL.view.isEditing() || $(e.target).closest(".sl-block-transform .anchor").length > 0 ? !0 : void (this.isEditingText() || (e.preventDefault(), SL.editor.controllers.Blocks.focus(this, e.shiftKey), $("input:focus, textarea:focus").blur(), $(document).on("vmousemove", this.onMouseMove), $(document).on("vmouseup", this.onMouseUp), this.moved = !1, this.mouseDownCursor.x = e.clientX, this.mouseDownCursor.y = e.clientY, this.dragTargets = SL.editor.controllers.Blocks.getFocusedBlocks().map(function (e) {
            return {block: e, origin: e.measure(!0)}
        })))
    }, onMouseMove: function (e) {
        var t = this.moved || Math.abs(this.mouseDownCursor.x - e.clientX) > 1 || Math.abs(this.mouseDownCursor.y - e.clientY) > 1;
        t && (e.preventDefault(), this.dragTargets.forEach(function (t) {
            t.block.move(t.origin.x + (e.clientX - this.mouseDownCursor.x), t.origin.y + (e.clientY - this.mouseDownCursor.y))
        }.bind(this)), this.moved === !1 && SL.editor.controllers.Guides.start(SL.editor.controllers.Blocks.getFocusedBlocks()), SL.editor.controllers.Guides.sync(), this.moved = !0)
    }, onMouseUp: function (e) {
        if (e.preventDefault(), $(document).off("vmousemove", this.onMouseMove), $(document).off("vmouseup", this.onMouseUp), SL.editor.controllers.Guides.stop(), !this.moved) {
            "number" != typeof this.lastMouseUpTime && (this.lastMouseUpTime = 0, this.lastDoubleClickTime = 0);
            var t = Date.now(), i = 400;
            t - this.lastMouseUpTime < i && (t - this.lastDoubleClickTime > i && this.onDoubleClick(e), this.lastDoubleClickTime = t), this.lastMouseUpTime = t
        }
    }, onDoubleClick: function () {
    }, onKeyDown: function () {
    }, onKeyUp: function () {
    }
}),
    SL("editor.blocks.behavior").Transform = Class.extend({
        ANCHOR_SIZE: 16, init: function (e) {
            this.block = e, this.state = {
                direction: null,
                centered: !1,
                proportional: !1,
                originalMeasurements: null,
                originalCursorPosition: {x: 0, y: 0}
            }, this.render(), this.bind()
        }, render: function () {
            this.domElement = $('<div class="sl-block-transform editing-ui">'), this.domElement.attr({
                "data-horizontal": this.block.options.horizontalResizing,
                "data-vertical": this.block.options.verticalResizing
            }), this.anchors = {}, this.anchors.n = $('<div class="anchor" data-direction="n">').appendTo(this.domElement), this.anchors.e = $('<div class="anchor" data-direction="e">').appendTo(this.domElement), this.anchors.s = $('<div class="anchor" data-direction="s">').appendTo(this.domElement), this.anchors.w = $('<div class="anchor" data-direction="w">').appendTo(this.domElement), this.anchors.nw = $('<div class="anchor" data-direction="nw">').appendTo(this.domElement), this.anchors.ne = $('<div class="anchor" data-direction="ne">').appendTo(this.domElement), this.anchors.se = $('<div class="anchor" data-direction="se">').appendTo(this.domElement), this.anchors.sw = $('<div class="anchor" data-direction="sw">').appendTo(this.domElement)
        }, bind: function () {
            this.onMouseDown = this.onMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.resizeStarted = new signals.Signal, this.resizeEnded = new signals.Signal;
            for (var e in this.anchors)
                this.anchors[e].on("vmousedown", this.onMouseDown)
        }, show: function () {
            0 === this.domElement.parent().length && (this.domElement.appendTo(this.block.domElement), this.domElement.addClass("visible"))
        }, hide: function () {
            this.domElement.detach(), this.domElement.removeClass("visible")
        }, destroy: function () {
            this.domElement.remove()
        }, isResizing: function () {
            return !!this.state.direction
        }, isResizingCentered: function () {
            return this.isResizing() && this.state.centered
        }, isResizingProportionally: function () {
            return this.isResizing() && this.state.proportional
        }, getState: function () {
            return this.state
        }, onMouseDown: function (e) {
            e.preventDefault(), this.state.direction = $(e.currentTarget).attr("data-direction"), this.state.direction && ($(document).on("vmousemove", this.onMouseMove), $(document).on("vmouseup", this.onMouseUp), this.moved = !1, this.state.originalCursorPosition.x = e.clientX, this.state.originalCursorPosition.y = e.clientY, this.state.originalMeasurements = this.block.measure(!0))
        }, onMouseMove: function (e) {
            e.preventDefault(), this.moved || (this.resizeStarted.dispatch(this), SL.editor.controllers.Guides.start([this.block], {
                action: "resize",
                direction: this.state.direction
            })), this.moved = !0;
            var t = e.clientX - this.state.originalCursorPosition.x, i = e.clientY - this.state.originalCursorPosition.y;
            e.altKey && (t *= 2, i *= 2);
            var n = "", o = "";
            switch (this.state.direction) {
                case "e":
                    n = Math.max(this.state.originalMeasurements.width + t, 1);
                    break;
                case "w":
                    n = Math.max(this.state.originalMeasurements.width - t, 1);
                    break;
                case "s":
                    o = Math.max(this.state.originalMeasurements.height + i, 1);
                    break;
                case "n":
                    o = Math.max(this.state.originalMeasurements.height - i, 1);
                    break;
                case "nw":
                    n = Math.max(this.state.originalMeasurements.width - t, 1), o = Math.max(this.state.originalMeasurements.height - i, 1);
                    break;
                case "ne":
                    n = Math.max(this.state.originalMeasurements.width + t, 1), o = Math.max(this.state.originalMeasurements.height - i, 1);
                    break;
                case "se":
                    n = Math.max(this.state.originalMeasurements.width + t, 1), o = Math.max(this.state.originalMeasurements.height + i, 1);
                    break;
                case "sw":
                    n = Math.max(this.state.originalMeasurements.width - t, 1), o = Math.max(this.state.originalMeasurements.height + i, 1)
            }
            this.block.hasAspectRatio() ? ("" === n && (n = this.state.originalMeasurements.width * (o / this.state.originalMeasurements.height)), "" === o && (o = this.state.originalMeasurements.height * (n / this.state.originalMeasurements.width))) : ("" === n && (n = this.state.originalMeasurements.width), "" === o && (o = this.state.originalMeasurements.height)), this.state.centered = e.altKey, this.state.proportional = e.shiftKey, this.block.resize({
                width: n,
                height: o,
                direction: this.state.direction
            }), SL.editor.controllers.Guides.sync()
        }, onMouseUp: function (e) {
            e.preventDefault(), $(document).off("vmousemove", this.onMouseMove), $(document).off("vmouseup", this.onMouseUp), SL.editor.controllers.Guides.stop(), this.moved && this.resizeEnded.dispatch(this), this.state.direction = null, this.state.centered = null, this.state.proportional = null
        }
    }),

    SL("editor.blocks").Code = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("code", e), this.editingRequested = new signals.Signal
        }, setup: function () {
            this._super(), this.properties.code = {
                value: {
                    setter: this.setCode.bind(this),
                    getter: this.getCode.bind(this)
                },
                language: {
                    defaultValue: "none",
                    setter: this.setCodeLanguage.bind(this),
                    getter: this.getCodeLanguage.bind(this),
                    options: [{value: "none", title: "Automatic"}, {
                        value: "actionscript",
                        title: "ActionScript"
                    }, {value: "apache", title: "Apache"}, {value: "applescript", title: "AppleScript"}, {
                        value: "bash",
                        title: "Bash"
                    }, {value: "clojure", title: "Clojure"}, {value: "coffeescript", title: "CoffeeScript"}, {
                        value: "cpp",
                        title: "C++"
                    }, {value: "cs", title: "C#"}, {value: "css", title: "CSS"}, {
                        value: "diff",
                        title: "Diff"
                    }, {value: "django", title: "Django "}, {value: "dos", title: "DOS"}, {
                        value: "erlang",
                        title: "Erlang"
                    }, {value: "fsharp", title: "F#"}, {value: "glsl", title: "GLSL"}, {
                        value: "go",
                        title: "Go"
                    }, {value: "haml", title: "Haml"}, {value: "handlebars", title: "Handlebars"}, {
                        value: "haskell",
                        title: "Haskell"
                    }, {value: "xml", title: "HTML"}, {value: "http", title: "HTTP"}, {
                        value: "ini",
                        title: "Ini file"
                    }, {value: "java", title: "Java"}, {value: "javascript", title: "JavaScript"}, {
                        value: "json",
                        title: "JSON"
                    }, {value: "lisp", title: "Lisp"}, {value: "livecodeserver", title: "LiveCode Server"}, {
                        value: "lua",
                        title: "Lua"
                    }, {value: "makefile", title: "Makefile"}, {
                        value: "markdown",
                        title: "Markdown"
                    }, {value: "mathematica", title: "Mathematica"}, {value: "matlab", title: "Matlab"}, {
                        value: "nginx",
                        title: "nginx"
                    }, {value: "objectivec", title: "Objective C"}, {value: "perl", title: "Perl"}, {
                        value: "php",
                        title: "PHP"
                    }, {value: "python", title: "Python"}, {value: "ruby", title: "Ruby"}, {
                        value: "scala",
                        title: "Scala"
                    }, {value: "scss", title: "SCSS"}, {value: "smalltalk", title: "SmallTalk"}, {
                        value: "sql",
                        title: "SQL"
                    }, {value: "tex", title: "TeX"}, {value: "vbnet", title: "VB.NET"}, {
                        value: "vbscript",
                        title: "VBScript"
                    }, {value: "vim", title: "vim"}, {value: "xml", title: "XML"}]
                }
            }
        }, paint: function () {
            if (this.domElement.find(".sl-block-placeholder, .sl-block-content-preview").remove(), this.isEmpty())
                this.showPlaceholder();
            else {
                var e = $('<div class="editing-ui sl-block-content-preview visible-in-preview">').appendTo(this.contentElement), t = this.getPreElement().clone().appendTo(e);
                hljs.highlightBlock(t.get(0))
            }
            this.syncZ()
        }, setDefaults: function () {
            this._super(), this.resize({width: 500, height: 300})
        }, setCode: function (e) {
            this.getCodeElement().html(SL.util.escapeHTMLEntities(e)), this.paint()
        }, getCode: function () {
            return SL.util.unescapeHTMLEntities(this.getCodeElement().html())
        }, setCodeLanguage: function (e) {
            this.getPreElement().attr("class", e), this.paint()
        }, getCodeLanguage: function () {
            var e = this.getPreElement().attr("class") || "";
            return e = e.replace(/hljs/gi, ""), e = e.trim()
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.Code, SL.editor.components.toolbars.options.CodeLanguage, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS].concat(this._super())
        }, getPreElement: function () {
            var e = this.contentElement.find(">pre");
            return 0 === e.length && (e = $("<pre><code></code></pre>").appendTo(this.contentElement)), e
        }, getCodeElement: function () {
            var e = this.getPreElement(), t = e.find(">code");
            return 0 === t.length && (t = $("<code>").appendTo(e)), t
        }, isEmpty: function () {
            return !this.isset("code.value")
        }, onDoubleClick: function (e) {
            this._super(e), this.editingRequested.dispatch()
        }, onKeyDown: function (e) {
            this._super(e), 13 !== e.keyCode || SL.util.isTypingEvent(e) || (this.editingRequested.dispatch(), e.preventDefault())
        }
    }),
    SL("editor.blocks").Iframe = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("iframe", e), this.editingRequested = new signals.Signal, this.paint()
        }, setup: function () {
            this._super(), this.setIframeURL = this.setIframeURL.bind(this), this.getIframeURL = this.getIframeURL.bind(this), this.setIframeURL = $.debounce(this.setIframeURL, 400), this.properties.iframe = {
                src: {
                    setter: this.setIframeURL,
                    getter: this.getIframeURL
                }
            }
        }, paint: function () {
            this._super.apply(this, arguments);
            var e = this.getIframeURL(), t = window.location.protocol;
            "https:" === t && e && /^http:/gi.test(e) ? 0 === this.domElement.find(".sl-block-overlay-message").length && this.domElement.append(['<div class="editing-ui sl-block-overlay sl-block-overlay-message below-content vcenter">', '<div class="vcenter-target">Cannot display non-HTTPS iframe while in the editor.</div>', "</div>"].join("")) : this.domElement.find(".sl-block-overlay-message").remove()
        }, setDefaults: function () {
            this._super(), this.resize({width: 360, height: 300})
        }, getIframeURL: function () {
            return this.getIframeElement().attr("src")
        }, setIframeURL: function (e) {
            e !== this.get("iframe.src") && this.getIframeElement().attr("src", e), this.paint()
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.IframeSRC, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS].concat(this._super())
        }, getIframeElement: function () {
            var e = this.contentElement.find("iframe");
            return 0 === e.length && (e = $("<iframe>").appendTo(this.contentElement)), e.attr({
                webkitallowfullscreen: "",
                mozallowfullscreen: "",
                allowfullscreen: "",
                sandbox: "allow-forms allow-scripts allow-popups allow-same-origin allow-pointer-lock"
            }), e
        }, isEmpty: function () {
            return !this.isset("iframe.src")
        }, onDoubleClick: function (e) {
            this._super(e), this.editingRequested.dispatch()
        }, onKeyDown: function (e) {
            this._super(e), 13 !== e.keyCode || SL.util.isTypingEvent(e) || (this.editingRequested.dispatch(), e.preventDefault())
        }
    }),






    SL("editor.blocks").Image = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("image", e), this.plug(SL.editor.blocks.plugin.Link), this.uploader = new SL.helpers.ImageUploader,
                this.uploader.succeeded.add(this.onUploadSuccess.bind(this)), this.uploader.failed.add(this.onUploadError.bind(this)),
                this.uploadStateChanged = new signals.Signal
        }, setup: function () {
            this._super(), this.properties.image = {
                src: {
                    setter: this.setImageURL.bind(this),
                    getter: this.getImageURL.bind(this)
                }
            }
        }, bind: function () {
            this._super(), this.domElement.on("dblclick", this.onDoubleClick.bind(this))
        }, setDefaults: function () {
            this._super(), this.resize({width: 360, height: 300})
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.Image, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.Link].concat(this._super())
        }, setImageURL: function (e) {
            var t = this.contentElement.find("img");
            0 === t.length ? (t = $('<img src="' + e + '">'), t.css("visibility", "hidden"), t.appendTo(this.contentElement)) : t.attr("src", e), t.off("load").on("load", function () {
                t.css("visibility", "visible"), this.syncAspectRatio(), this.paint()
            }.bind(this))
        }, getImageURL: function () {
            return this.contentElement.find("img").attr("src")
        }, isUploading: function () {
            return !(!this.uploader || !this.uploader.isUploading())
        }, hasImage: function () {
            var e = this.get("image.src");
            return !!("string" == typeof e && e.length > 0)
        }, isLoaded: function () {
            var e = this.getNaturalSize(!0);
            return e && e.width > 0 && e.height > 0
        }, getNaturalSize: function (e) {
            var t = this.contentElement.find("img");
            if (t.length) {
                var i = {};
                if (!e && (i.width = parseInt(t.attr("data-natural-width"), 10), i.height = parseInt(t.attr("data-natural-height"), 10), i.width && i.height))
                    return i;
                if (i.width = t.get(0).naturalWidth, i.height = t.get(0).naturalHeight, i.width && i.height)
                    return t.attr({"data-natural-width": i.width, "data-natural-height": i.height}), i
            }
            return null
        }, getAspectRatio: function (e) {
            var t = this.getNaturalSize(e);
            return t ? t.width / t.height : this._super()
        }, syncAspectRatio: function () {
            var e = this.getNaturalSize(!0);
            if (e) {
                var t = this.measure();
                this.resize({width: t.width, height: t.height, center: !0})
            }
        }, paint: function () {
            this.domElement.find(".sl-block-placeholder, .image-progress").remove(), this.isUploading() ? (this.domElement.append(['<div class="editing-ui sl-block-overlay image-progress">', '<span class="spinner centered"></span>', "</div>"].join("")), SL.util.html.generateSpinners()) : this.hasImage() || this.showPlaceholder(), this.syncZ()
        }, upload: function (e, t) {
            this.uploader.upload(e, t), this.paint(), this.uploadStateChanged.dispatch()
        }, clear: function () {
            this.contentElement.find("img").remove(), this.paint(), this.uploadStateChanged.dispatch()
        }, destroy: function () {
            this.uploader.destroy(), this.uploadStateChanged.dispose(), this._super()
        }, onUploadSuccess: function (e) {
            this.set("image.src", e), this.uploadStateChanged.dispatch()
        }, onUploadError: function () {
            SL.notify("An error occurred while uploading your image.", "negative"), this.paint(), this.uploadStateChanged.dispatch()
        }, onDoubleClick: function () {
            this.syncAspectRatio(), this.paint()
        }
    }),
    SL("editor.blocks").Math = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("math", $.extend(e, {
                horizontalResizing: !1,
                verticalResizing: !1
            })), this.editingRequested = new signals.Signal
        }, setup: function () {
            this._super(), this.properties.math = {
                value: {
                    setter: this.setValue.bind(this),
                    getter: this.getValue.bind(this)
                }
            }
        }, paint: function () {
            if (this.domElement.find(".sl-block-placeholder, .sl-block-content-preview, .sl-block-overlay-warning").remove(), this.isEmpty())
                this.domElement.addClass("is-empty"), this.showPlaceholder(), this.getMathOutputElement().empty();
            else
                try {
                    this.domElement.removeClass("is-empty"), katex.render(this.getMathInputElement().text(), this.getMathOutputElement().get(0))
                } catch (e) {
                    this.domElement.addClass("is-empty"), this.domElement.append(['<div class="editing-ui sl-block-overlay sl-block-overlay-warning vcenter">', '<div class="vcenter-target">', '<span class="icon i-info" data-tooltip="' + e.message + '" data-tooltip-maxwidth="500"></span>', "An error occurred while parsing your equation.", "</div>", "</div>"].join(""))
                }
            this.syncZ()
        }, setDefaults: function () {
            this._super()
        }, setValue: function (e) {
            this.getMathInputElement().html(e), this.paint()
        }, getValue: function () {
            return this.getMathInputElement().text()
        }, getMathInputElement: function () {
            var e = this.contentElement.find(".math-input");
            return 0 === e.length && (e = $('<div class="math-input"></div>').appendTo(this.contentElement)), e
        }, getMathOutputElement: function () {
            var e = this.contentElement.find(".math-output");
            return 0 === e.length && (e = $('<div class="math-output"></div>').appendTo(this.contentElement)), e
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.MathInput, SL.editor.components.toolbars.options.MathSize, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.MathColor, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS].concat(this._super())
        }, isEmpty: function () {
            return !this.isset("math.value")
        }, onDoubleClick: function (e) {
            this._super(e), this.editingRequested.dispatch()
        }, onKeyDown: function (e) {
            this._super(e), 13 !== e.keyCode || SL.util.isTypingEvent(e) || (this.editingRequested.dispatch(), e.preventDefault())
        }
    }),
    SL("editor.blocks.plugin").HTML = Class.extend({
        init: function (e) {
            this.block = e, this.block.editHTML = function () {
                var e = new SL.components.TextEditor({type: "html", value: this.contentElement.html()});
                e.saved.add(function (e) {
                    this.setCustomHTML(e)
                }.bind(this))
            }.bind(e), this.block.setCustomHTML = function (e) {
                this.contentElement.attr("data-has-custom-html", ""), this.contentElement.html(e)
            }.bind(e), this.block.hasCustomHTML = function () {
                return this.contentElement.get(0).hasAttribute("data-has-custom-html")
            }.bind(e)
        }, destroy: function () {
            delete this.block.editHTML, delete this.block.setCustomHTML, delete this.block.hasCustomHTML
        }
    }),
    SL("editor.blocks.plugin").Link = Class.extend({
        init: function (e) {
            this.block = e, this.block.setLinkURL = function (e) {
                "string" == typeof e ? (this.isLinked() === !1 && this.changeContentElementType("a"), this.contentElement.attr("href", e), this.contentElement.attr("target", "_blank"), /^#\/\d/.test(e) && this.contentElement.removeAttr("target")) : (this.contentElement.removeAttr("target"), this.changeContentElementType(this.options.contentElementType))
            }.bind(e), this.block.getLinkURL = function () {
                return this.contentElement.attr("href")
            }.bind(e), this.block.isLinked = function () {
                return this.contentElement.is("a")
            }.bind(e), this.block.properties.link = {
                href: {
                    setter: this.block.setLinkURL,
                    getter: this.block.getLinkURL,
                    checker: this.block.isLinked
                }
            }
        }, destroy: function () {
            delete this.block.properties.link, delete this.block.setLinkURL, delete this.block.getLinkURL, delete this.block.isLinked
        }
    }),
    SL("editor.blocks").Shape = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("shape", $.extend({minWidth: 4, minHeight: 4}, e)), this.plug(SL.editor.blocks.plugin.Link)
        }, setup: function () {
            this._super(), this.properties.attribute["data-shape-type"] = {
                defaultValue: "rect",
                options: [{value: "rect"}, {value: "circle"}, {value: "diamond"}, {value: "octagon"}, {value: "triangle-up"}, {value: "triangle-down"}, {value: "triangle-left"}, {value: "triangle-right"}, {value: "arrow-up"}, {value: "arrow-down"}, {value: "arrow-left"}, {value: "arrow-right"}]
            };
            for (var e in SL.util.svg.SYMBOLS)
                this.properties.attribute["data-shape-type"].options.push({value: "symbol-" + e});
            this.properties.attribute["data-shape-stretch"] = {defaultValue: !1}, this.properties.attribute["data-shape-fill-color"] = {defaultValue: "#000000"}, this.properties.attribute["data-shape-stroke-color"] = {}, this.properties.attribute["data-shape-stroke-width"] = {
                type: "number",
                decimals: 0,
                minValue: 1,
                maxValue: 50,
                defaultValue: 0
            }
        }, bind: function () {
            this._super(), this.propertyChanged.add(this.onPropertyChanged.bind(this))
        }, setDefaults: function () {
            this._super(), this.resize({
                width: 300,
                height: 300
            }), this.set("attribute.data-shape-type", this.getPropertyDefault("attribute.data-shape-type")), this.set("attribute.data-shape-fill-color", this.getPropertyDefault("attribute.data-shape-fill-color")), this.set("attribute.data-shape-stretch", this.getPropertyDefault("attribute.data-shape-stretch"))
        }, paint: function () {
            var e = this.get("attribute.data-shape-type"), t = this.get("attribute.data-shape-fill-color"), i = this.get("attribute.data-shape-stroke-color"), n = this.get("attribute.data-shape-stroke-width"), o = this.get("attribute.data-shape-stretch"), r = this.domElement.width(), s = this.domElement.height();
            o || (r = s = Math.min(r, s));
            var a = SL.editor.blocks.Shape.shapeFromType(e, r, s);
            if (a) {
                var l = this.hasStroke(), c = this.supportsStroke(a), h = this.getSVGElement();
                if (h.setAttribute("width", "100%"), h.setAttribute("height", "100%"), h.setAttribute("preserveAspectRatio", o ? "none" : "xMidYMid"), h.innerHTML = "", c && l) {
                    var d = SL.util.string.uniqueID("shape-mask-"), u = document.createElementNS(SL.util.svg.NAMESPACE, "defs"), p = document.createElementNS(SL.util.svg.NAMESPACE, "clipPath");
                    p.setAttribute("id", d), p.appendChild($(a).clone().get(0)), u.appendChild(p), h.appendChild(u), a.setAttribute("clip-path", "url(#" + d + ")")
                }
                a.setAttribute("class", "shape-element"), t && a.setAttribute("fill", t), c && i && a.setAttribute("stroke", i), c && n && a.setAttribute("stroke-width", 2 * n), h.appendChild(a);
                var g = SL.util.svg.boundingBox(a);
                h.setAttribute("viewBox", [Math.round(g.x) || 0, Math.round(g.y) || 0, Math.round(g.width) || 32, Math.round(g.height) || 32].join(" "))
            }
        }, resize: function () {
            this._super.apply(this, arguments), this.paint()
        }, toggleStroke: function () {
            this.hasStroke() ? this.unset(["attribute.data-shape-stroke-color", "attribute.data-shape-stroke-width"]) : this.set({
                "attribute.data-shape-stroke-color": "#000000",
                "attribute.data-shape-stroke-width": 1
            }), this.paint()
        }, hasStroke: function () {
            return this.isset("attribute.data-shape-stroke-color") || this.isset("attribute.data-shape-stroke-width")
        }, supportsStroke: function (e) {
            return $(e || this.getSVGShapeElement()).is("rect, circle, ellipse, polygon")
        }, getSVGElement: function () {
            var e = this.contentElement.find("svg").get(0);
            return e || (e = document.createElementNS(SL.util.svg.NAMESPACE, "svg"), e.setAttribute("xmlns", SL.util.svg.NAMESPACE), e.setAttribute("version", "1.1"), this.contentElement.append(e)), e
        }, getSVGShapeElement: function () {
            return $(this.getSVGElement().querySelector(".shape-element"))
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.ShapeType, SL.editor.components.toolbars.options.ShapeStretch, SL.editor.components.toolbars.options.ShapeFillColor, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderSVG, SL.editor.components.toolbars.groups.Link].concat(this._super())
        }, onPropertyChanged: function () {
            this.paint()
        }
    }),
    SL.editor.blocks.Shape.shapeFromType = function (e, t, i) {
        return t = t || 32, i = i || 32, /^symbol\-/.test(e) ? SL.util.svg.symbol(e.replace(/^symbol\-/, "")) : "rect" === e ? SL.util.svg.rect(t, i) : "circle" === e ? SL.util.svg.ellipse(t, i) : "diamond" === e ? SL.util.svg.polygon(t, i, 4) : "octagon" === e ? SL.util.svg.polygon(t, i, 8) : "triangle-up" === e ? SL.util.svg.triangleUp(t, i) : "triangle-down" === e ? SL.util.svg.triangleDown(t, i) : "triangle-left" === e ? SL.util.svg.triangleLeft(t, i) : "triangle-right" === e ? SL.util.svg.triangleRight(t, i) : "arrow-up" === e ? SL.util.svg.arrowUp(t, i) : "arrow-down" === e ? SL.util.svg.arrowDown(t, i) : "arrow-left" === e ? SL.util.svg.arrowLeft(t, i) : "arrow-right" === e ? SL.util.svg.arrowRight(t, i) : void 0
    },
    SL("editor.blocks").Snippet = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("snippet", $.extend({}, e)), this.plug(SL.editor.blocks.plugin.HTML)
        }, bind: function () {
            this._super(), this.onEditingKeyUp = this.onEditingKeyUp.bind(this), this.onEditingKeyDown = this.onEditingKeyDown.bind(this), this.onEditingInput = this.onEditingInput.bind(this)
        }, blur: function () {
            this._super(), this.disableEditing()
        }, setDefaults: function () {
            this._super(), this.resize({
                width: SL.editor.blocks.Snippet.DEFAULT_WIDTH,
                height: SL.editor.blocks.Snippet.DEFAULT_HEIGHT
            })
        }, resizeToFitContent: function () {
            this.domElement.css("width", "auto");
            var e = Math.min(this.domElement.outerWidth(), SL.view.getSlideSize().width);
            (0 === e || isNaN(e)) && (e = SL.editor.blocks.Snippet.DEFAULT_WIDTH), this.domElement.css("width", e), this.domElement.css("height", "auto");
            var t = Math.min(this.domElement.outerHeight(), SL.view.getSlideSize().height);
            (0 === t || isNaN(t)) && (t = SL.editor.blocks.Snippet.DEFAULT_HEIGHT), this.domElement.css("height", t)
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.TextAlign, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.TextColor, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS].concat(this._super())
        }, enableEditing: function () {
            this.isEditingText() || (this.contentElement.attr("contenteditable", ""), this.domElement.addClass("is-editing"), this.contentElement.on("keyup", this.onEditingKeyUp), this.contentElement.on("keydown", this.onEditingKeyDown), this.contentElement.on("input", this.onEditingInput), this.editor = CKEDITOR.inline(this.contentElement.get(0), {allowedContent: !0}), this.editor.on("instanceReady", function () {
                this.editor.focus();
                var e = this.editor.createRange();
                e.moveToElementEditEnd(this.editor.editable()), e.select()
            }.bind(this)))
        }, disableEditing: function () {
            this.contentElement.removeAttr("contenteditable").blur(), this.domElement.removeClass("is-editing"), this.contentElement.off("keyup", this.onEditingKeyUp), this.contentElement.off("keydown", this.onEditingKeyDown), this.contentElement.off("input", this.onEditingInput), this.editor && (this.editor.destroy(), this.editor = null)
        }, isEditingText: function () {
            return this.domElement.hasClass("is-editing")
        }, onDoubleClick: function (e) {
            this._super(e), SL.view.isEditing() && this.enableEditing()
        }, onKeyDown: function (e) {
            this._super(e), 13 === e.keyCode ? this.isEditingText() || SL.util.isTypingEvent(e) ? e.metaKey && this.disableEditing() : (e.preventDefault(), this.enableEditing()) : 27 === e.keyCode && (e.preventDefault(), this.disableEditing())
        }, onEditingKeyUp: function () {
            SL.editor.controllers.Blocks.afterBlockTextInput()
        }, onEditingKeyDown: function () {
            SL.editor.controllers.Blocks.afterBlockTextInput()
        }, onEditingInput: function () {
            setTimeout(function () {
                SL.editor.controllers.Blocks.afterBlockTextInput()
            }, 1)
        }
    }),
    SL.editor.blocks.Snippet.DEFAULT_WIDTH = 300,
    SL.editor.blocks.Snippet.DEFAULT_HEIGHT = 300,
    SL("editor.blocks").Text = SL.editor.blocks.Base.extend({
        init: function (e) {
            this._super("text", $.extend({
                verticalResizing: !1,
                placeholderTag: "p",
                placeholderText: "Text"
            }, e)), this.plug(SL.editor.blocks.plugin.HTML), this.readDefaultContent(), this.injectDefaultContent()
        }, bind: function () {
            this._super(), this.onEditingKeyUp = this.onEditingKeyUp.bind(this), this.onEditingKeyDown = this.onEditingKeyDown.bind(this), this.onEditingInput = this.onEditingInput.bind(this), this.onEditingFocusOut = this.onEditingFocusOut.bind(this), this.propertyChanged.add(this.syncPairs.bind(this))
        }, blur: function () {
            this._super(), this.isEditingText() && this.disableEditing()
        }, setDefaults: function () {
            this._super(), this.resize({width: SL.editor.blocks.Text.DEFAULT_WIDTH})
        }, readDefaultContent: function () {
            this.contentElement.attr("data-placeholder-tag") ? this.options.placeholderTag = this.contentElement.attr("data-placeholder-tag") : this.contentElement.attr("data-placeholder-tag", this.options.placeholderTag), this.contentElement.attr("data-placeholder-text") ? this.options.placeholderText = this.contentElement.attr("data-placeholder-text") : this.contentElement.attr("data-placeholder-text", this.options.placeholderText)
        }, injectDefaultContent: function () {
            var e = this.getDefaultContent();
            "" === this.contentElement.text().trim() && e && (this.hasPlugin(SL.editor.blocks.plugin.HTML) && this.hasCustomHTML() || this.contentElement.html(e))
        }, clearDefaultContent: function () {
            this.contentElement.html().trim() === this.getDefaultContent() && this.contentElement.html(this.getDefaultContent(!0))
        }, getDefaultContent: function (e) {
            return this.options.placeholderTag && this.options.placeholderText ? e ? "<" + this.options.placeholderTag + ">&nbsp;</" + this.options.placeholderTag + ">" : "<" + this.options.placeholderTag + ">" + this.options.placeholderText + "</" + this.options.placeholderTag + ">" : ""
        }, externalizeLinks: function () {
            this.contentElement.find('a:not([target="_blank"])').each(function (e, t) {
                t.setAttribute("target", "_blank")
            })
        }, resize: function () {
            this._super.apply(this, arguments), this.syncPairs()
        }, getToolbarOptions: function () {
            return [SL.editor.components.toolbars.options.TextAlign, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.TextColor, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS].concat(this._super())
        }, focus: function () {
            this._super(), SL.editor.controllers.Blocks.discoverBlockPairs()
        }, enableEditing: function () {
            if (!this.isEditingText()) {
                this.contentElement.attr("contenteditable", ""), this.domElement.addClass("is-editing"), this.contentElement.on("keyup", this.onEditingKeyUp), this.contentElement.on("keydown", this.onEditingKeyDown), this.contentElement.on("input", this.onEditingInput), this.contentElement.on("focusout", this.onEditingFocusOut), this.clearDefaultContent();
                var e = {};
                SL.editor.controllers.Capabilities.isTouchEditor() && (this.contentElement.focus(), e.toolbar = [["Format"], ["NumberedList", "BulletedList", "-", "Blockquote"]], window.scrollTo(0, Math.max(this.contentElement.offset().top - 60, 0))), this.hasPlugin(SL.editor.blocks.plugin.HTML) && this.hasCustomHTML() && (e.allowedContent = !0), e.contentsLangDirection = SLConfig.deck.rtl === !0 ? "rtl" : "ui";
                var t = SL.view.getCurrentTheme();
                if (t && t.hasPalette()) {
                    var i = t.get("palette");
                    i = i.join(","), i = i.replace(/#/g, ""), e.colorButton_colors = i
                }
                this.editor = CKEDITOR.inline(this.contentElement.get(0), e), this.editor.on("instanceReady", function () {
                    this.contentElement.html(this.contentElement.html().trim()), this.editor.focus();
                    var e = this.editor.createRange();
                    e.moveToElementEditEnd(this.editor.editable()), e.select()
                }.bind(this))
            }
        }, disableEditing: function () {
            this.contentElement.removeAttr("contenteditable").blur(), this.domElement.removeClass("is-editing"), this.contentElement.off("keyup", this.onEditingKeyUp), this.contentElement.off("keydown", this.onEditingKeyDown), this.contentElement.off("input", this.onEditingInput), this.contentElement.off("focusout", this.onEditingFocusOut), this.externalizeLinks(), this.injectDefaultContent(), this.editor && (this.editor.destroy(), this.editor = null)
        }, syncPairs: function () {
            if (!this.destroyed) {
                var e = this.measure();
                this.pairings.forEach(function (t) {
                    "bottom" === t.direction && t.block.move(null, e.bottom)
                }), this._super()
            }
        }, isEditingText: function () {
            return this.domElement.hasClass("is-editing")
        }, onDoubleClick: function (e) {
            this._super(e), SL.view.isEditing() && this.enableEditing()
        }, onKeyDown: function (e) {
            this._super(e), 13 === e.keyCode ? this.isEditingText() || SL.util.isTypingEvent(e) ? e.metaKey && this.disableEditing() : (e.preventDefault(), this.enableEditing()) : 27 === e.keyCode && (e.preventDefault(), this.disableEditing())
        }, onEditingKeyUp: function () {
            this.syncPairs(), SL.editor.controllers.Blocks.afterBlockTextInput()
        }, onEditingKeyDown: function () {
            SL.editor.controllers.Blocks.afterBlockTextInput()
        }, onEditingInput: function () {
            setTimeout(function () {
                SL.editor.controllers.Blocks.afterBlockTextInput()
            }, 1)
        }, onEditingFocusOut: function () {
            SL.editor.controllers.Capabilities.isTouchEditor() && setTimeout(function () {
                this.isEditingText() && 0 === $(document.activeElement).closest(".cke").length && this.disableEditing()
            }.bind(this), 1)
        }
    }),
    SL.editor.blocks.Text.DEFAULT_WIDTH = 600,
    SL("editor.components").Colorpicker = Class.extend({
        init: function (e) {
            this.editor = e, this.render(), this.bind()
        }, render: function () {
            this.domElement = $('<div class="sl-colorpicker">'), this.arrowElement = $('<div class="sl-colorpicker-arrow">').appendTo(this.domElement), this.apiElement = $('<div class="sl-colorpicker-api">').appendTo(this.domElement)
        }, bind: function () {
            this.onChooseClicked = this.onChooseClicked.bind(this), this.onResetClicked = this.onResetClicked.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this)
        }, renderColorpicker: function () {
            this.hasRenderedColorPicker || (this.hasRenderedColorPicker = !0, this.apiElement.spectrum({
                flat: !0,
                showInput: !0,
                showButtons: !1,
                showInitial: !0,
                showPalette: !0,
                showPaletteOnly: !0,
                togglePaletteOnly: !0,
                showSelectionPalette: !0,
                hideAfterPaletteSelect: !0,
                maxSelectionSize: 10,
                togglePaletteMoreText: "More options",
                togglePaletteLessText: "Less options",
                preferredFormat: "hex",
                localStorageKey: "sl-colors",
                className: "sl-colorpicker-spectrum",
                move: function (e) {
                    this.config.changeCallback(this.config.alpha ? e.toRgbString() : e.toHexString(), !0)
                }.bind(this),
                change: function (e) {
                    this.config.changeCallback(this.config.alpha ? e.toRgbString() : e.toHexString(), !0)
                }.bind(this),
                hide: function () {
                    this.hide()
                }.bind(this)
            })), this.domElement.find(".sl-colorpicker-buttons").remove(), this.domElement.append(['<div class="sl-colorpicker-buttons">', '<button class="sl-colorpicker-reset button s outline">' + this.config.resetText + "</button>", '<button class="sl-colorpicker-choose button s grey">' + this.config.chooseText + "</button>", "</div>"].join("")), this.domElement.find(".sl-colorpicker-reset").on("click", this.onResetClicked), this.domElement.find(".sl-colorpicker-choose").on("click", this.onChooseClicked), this.apiElement.spectrum("option", "palette", this.getColorPalettePresets(this.config.alpha)), this.apiElement.spectrum("option", "showAlpha", !!this.config.alpha), this.apiElement.spectrum("option", "cancelText", this.config.cancelText), this.apiElement.spectrum("option", "cancelClassName", this.config.cancelClassName), this.apiElement.spectrum("option", "chooseText", this.config.chooseText), this.apiElement.spectrum("option", "chooseClassName", this.config.chooseClassName), this.config.color && this.apiElement.spectrum("set", this.config.color), this.apiElement.spectrum("reflow")
        }, layout: function () {
            var e = 10, t = 6, i = this.domElement.outerWidth(), n = this.domElement.outerHeight(), o = this.config.anchor.offset(), r = this.config.anchor.outerWidth(), s = this.config.anchor.outerHeight(), a = o.left + this.config.offsetX, l = o.top + this.config.offsetY;
            switch (this.config.alignment) {
                case "t":
                    a += (r - i) / 2, l -= n + e;
                    break;
                case "b":
                    a += (r - i) / 2, l += s + e;
                    break;
                case "l":
                    a -= i + e, l += (s - n) / 2;
                    break;
                case "r":
                    a += r + e, l += (s - n) / 2
            }
            switch (a = Math.min(Math.max(a, e), window.innerWidth - i - e), l = Math.min(Math.max(l, e), window.innerHeight - n - e), this.config.alignment) {
                case "t":
                    arrowX = o.left - a + r / 2, arrowY = n;
                    break;
                case "b":
                    arrowX = o.left - a + r / 2, arrowY = -t;
                    break;
                case "l":
                    arrowX = i, arrowY = o.top - l + s / 2;
                    break;
                case "r":
                    arrowX = -t, arrowY = o.top - l + s / 2
            }
            this.domElement.css({left: a, top: l}), this.arrowElement.css({
                left: arrowX,
                top: arrowY
            }), this.domElement.attr("data-alignment", this.config.alignment)
        }, show: function (e) {
            if (!e.anchor)
                throw "Can not show color picker without anchor.";
            this.domElement.appendTo(document.body), this.config = $.extend({
                alignment: "l",
                offsetX: 0,
                offsetY: 0,
                alpha: !1,
                resetText: "Use default",
                chooseText: "Done",
                resetCallback: function () {
                },
                changeCallback: function () {
                },
                hiddenCallback: function () {
                }
            }, e), this.renderColorpicker(), this.layout(), $(window).on("resize", this.onWindowResize), $(document).on("mousedown", this.onDocumentMouseDown)
        }, hide: function () {
            this.saveCurrentColorToPalette(), this.domElement.detach(), $(window).off("resize", this.onWindowResize), $(document).off("mousedown", this.onDocumentMouseDown)
        }, toggle: function (e) {
            this.isVisible() ? this.hide() : this.show(e)
        }, isVisible: function () {
            return this.domElement.parent().length > 0
        }, setColor: function (e) {
            this.apiElement.spectrum("set", e), this.apiElement.spectrum("reflow")
        }, getColor: function () {
            return this.apiElement.spectrum("get")
        }, saveCurrentColorToPalette: function () {
            this.apiElement.spectrum("saveCurrentSelection")
        }, getColorPalettePresets: function (e) {
            if (this.hasCustomPalette())
                return [SL.view.getCurrentTheme().get("palette")];
            var t = ["rgb(0, 0, 0)", "rgb(34, 34, 34)", "rgb(68, 68, 68)", "rgb(102, 102, 102)", "rgb(136, 136, 136)", "rgb(170, 170, 170)", "rgb(204, 204, 204)", "rgb(238, 238, 238)", "rgb(255, 255, 255)"], i = ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(168, 39, 107)"], n = ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"];
            return e && t.push("transparent"), [t, i, n]
        }, hasCustomPalette: function () {
            var e = SL.view.getCurrentTheme();
            return e && e.hasPalette()
        }, destroy: function () {
            this.domElement.remove()
        }, onResetClicked: function (e) {
            this.config.resetCallback(), this.hide(), e.preventDefault()
        }, onChooseClicked: function (e) {
            this.saveCurrentColorToPalette(), this.hide(), e.preventDefault()
        }, onDocumentMouseDown: function (e) {
            var t = $(e.target);
            0 === t.closest(this.domElement).length && 0 === t.closest(this.config.anchor).length && this.hide()
        }, onWindowResize: function () {
            this.layout()
        }
    }),
    SL("editor.components").Sidebar = Class.extend({
        init: function (e) {
            this.options = e || {}, this.sidebarElement = $(".sidebar"), this.sidebarPrimary = this.sidebarElement.find(".primary"), this.sidebarSecondary = this.sidebarElement.find(".secondary"), this.sidebarHeader = this.sidebarElement.find(".global-header"), this.sidebarScrollShadowTop = this.sidebarElement.find(".scroll-shadow-top"), this.sidebarScrollShadowBottom = this.sidebarElement.find(".scroll-shadow-bottom"), this.panelElement = $(".sidebar-panel"), this.saveButton = this.sidebarElement.find(".button.save"), this.previewButton = this.sidebarElement.find(".button.preview"), this.undoButton = this.sidebarElement.find(".button.undo"), this.exportButton = this.sidebarElement.find(".button.export"), this.importButton = this.sidebarElement.find(".button.import"), this.publishButton = this.sidebarElement.find(".button.publish"), this.settingsButton = this.sidebarElement.find(".button.settings"), this.revisionsButton = this.sidebarElement.find(".button.revisions"), this.arrangeButton = this.sidebarElement.find(".button.arrange"), this.styleButton = this.sidebarElement.find(".button.style"), this.shareButton = this.sidebarElement.find(".button.share"), this.previewButton && this.previewButton.attr("data-tooltip", "Preview (" + SL.util.getMetaKeyName() + " + F)"), this.undoButton && this.undoButton.attr("data-tooltip", "Undo (" + SL.util.getMetaKeyName() + " + Z)"), this.currentPanel = null, this.createSignals(), this.render(), this.bind(), this.layout(), this.updatePublishButton(), this.updateUndoButton()
        }, bind: function () {
            this.saveButton.on("vclick", this.onSaveClicked.bind(this)), this.previewButton && this.previewButton.on("vclick", this.onPreviewClicked.bind(this)), this.undoButton && this.undoButton.on("vclick", this.onUndoClicked.bind(this)), this.exportButton && this.exportButton.on("vclick", this.onExportClicked.bind(this)), this.importButton && this.importButton.on("vclick", this.onImportClicked.bind(this)), this.settingsButton.on("vclick", this.onSettingsClicked.bind(this)), this.revisionsButton.on("vclick", this.onRevisionsClicked.bind(this)), this.publishButton.on("vclick", this.onPublishClicked.bind(this)), this.arrangeButton.on("vclick", this.onArrangeClicked.bind(this)), this.styleButton.on("vclick", this.onStyleClicked.bind(this)), this.shareButton.on("vclick", this.onShareClicked.bind(this)), this.panelElement.on("vclick", this.onPanelElementClicked.bind(this)), this.sidebarSecondary.on("scroll", this.layout.bind(this)), this.settingsPanel.onclose.add(this.close.bind(this)), this.exportPanel.onclose.add(this.close.bind(this)), this.importPanel.onclose.add(this.close.bind(this)), this.revisionsPanel.onclose.add(this.close.bind(this)), this.stylePanel.onclose.add(this.close.bind(this)), this.sharePanel.onclose.add(this.close.bind(this)), $(window).on("resize", this.layout.bind(this)), SL.editor.controllers.History.changed.add(this.updateUndoButton.bind(this))
        }, createSignals: function () {
            this.saveClicked = new signals.Signal, this.previewClicked = new signals.Signal
        }, render: function () {
            this.revisionsPanel = new SL.editor.components.sidebar.Revisions, this.settingsPanel = new SL.editor.components.sidebar.Settings, this.exportPanel = new SL.editor.components.sidebar.Export, this.importPanel = new SL.editor.components.sidebar.Import, this.stylePanel = new SL.editor.components.sidebar.Style, this.sharePanel = new SL.editor.components.sidebar.Share, this.renderMoreOptions()
        }, renderMoreOptions: function () {
            this.moreOptionsElement = this.sidebarElement.find(".more-options"), this.moreOptions = new SL.components.Menu({
                anchor: this.moreOptionsElement, anchorSpacing: 10, alignment: "r", showOnHover: !0, options: [{
                    label: "Present", icon: "play", callback: function () {
                        SL.analytics.trackEditor("Sidebar: Present"), window.open(SL.routes.DECK_LIVE(SLConfig.deck.user.username, SLConfig.deck.slug))
                    }.bind(this)
                }, {
                    label: "Duplicate", icon: "fork", callback: function () {
                        SL.analytics.trackEditor("Sidebar: Duplicate deck"), SL.editor.controllers.API.forkDeck()
                    }.bind(this)
                }, {
                    label: "Delete", icon: "trash-fill", callback: function () {
                        SL.analytics.trackEditor("Sidebar: Delete deck"), SL.editor.controllers.API.deleteDeck()
                    }.bind(this)
                }]
            })
        }, layout: function () {
            var e = window.innerHeight - (this.sidebarPrimary.outerHeight(!0) + this.sidebarHeader.outerHeight(!0));
            this.sidebarSecondary.css("max-height", e);
            var t = this.sidebarSecondary.scrollTop(), i = this.sidebarSecondary.prop("scrollHeight"), n = this.sidebarSecondary.outerHeight(), o = i > n, r = t / (i - n);
            this.sidebarScrollShadowBottom.css({
                opacity: o ? 1 - r : 0,
                bottom: this.sidebarHeader.outerHeight()
            }), this.sidebarScrollShadowTop.css({opacity: o ? r : 0, top: this.sidebarSecondary.offset().top})
        }, open: function (e) {
            switch (this.currentPanel && this.currentPanel.close(), SL.editor.controllers.Mode.clear(), e) {
                case "settings":
                    this.currentPanel = this.settingsPanel;
                    break;
                case "export":
                    this.currentPanel = this.exportPanel;
                    break;
                case "import":
                    this.currentPanel = this.importPanel;
                    break;
                case "style":
                    this.currentPanel = this.stylePanel;
                    break;
                case "revisions":
                    this.currentPanel = this.revisionsPanel;
                    break;
                case "share":
                    this.currentPanel = this.sharePanel
            }
            this.setActiveButton(e), this.currentPanel.open(), this.panelElement.addClass("visible"), SL.analytics.trackEditor("Open panel", e)
        }, close: function (e) {
            this.currentPanel && (e === !0 && this.currentPanel.save(), this.currentPanel.close()), this.setActiveButton(null), this.panelElement.removeClass("visible")
        }, toggle: function (e) {
            this.isExpanded(e) ? this.close() : this.open(e)
        }, setActiveButton: function (e) {
            e ? (this.sidebarElement.addClass("has-active-panel"), this.sidebarSecondary.find(".active").removeClass("active"), this.sidebarSecondary.find(".button." + e).addClass("active")) : (this.sidebarElement.removeClass("has-active-panel"), this.sidebarSecondary.find(".active").removeClass("active"))
        }, isExpanded: function (e) {
            return e ? this.panelElement.find("." + e).hasClass("visible") : this.panelElement.hasClass("visible")
        }, updateSaveButton: function (e, t) {
            this.saveButton.attr({"class": "button save " + (e || ""), "data-tooltip": t || ""})
        }, updatePublishButton: function () {
            var e = this.publishButton.find(".icon");
            SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? e.removeClass("i-unlock-stroke").addClass("i-lock-stroke") : SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? e.removeClass("i-lock-stroke").addClass("i-unlock-stroke") : SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_ALL && e.removeClass("i-lock-stroke").addClass("i-unlock-stroke"), SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_SELF || SL.util.user.isPro() ? this.publishButton.attr("data-tooltip", "Visibility") : this.publishButton.attr("data-tooltip", "You need a Pro account to<br>make decks private.")
        }, updateArrangeButton: function (e) {
            this.setActiveButton("arranging" === e ? "arrange" : null)
        }, updateUndoButton: function () {
            this.undoButton && this.undoButton.toggleClass("disabled", !SL.editor.controllers.History.canUndo())
        }, onSaveClicked: function (e) {
            e.preventDefault(), this.saveClicked.dispatch()
        }, onPreviewClicked: function (e) {
            e.preventDefault(), this.previewClicked.dispatch()
        }, onUndoClicked: function (e) {
            e.preventDefault(), SL.editor.controllers.History.undo({ignoreMode: !0}), SL.analytics.trackEditor("Undo clicked")
        }, onExportClicked: function () {
            var e = $(".reveal .slides").children().map(function () {
                var e = $(this).clone();
                return e.find("section").add(e).each(function () {
                    var e = $.map(this.attributes, function (e) {
                        return e.name
                    }), t = $(this);
                    $.each(e, function (e, i) {
                        t.removeAttr(i)
                    })
                }), e.wrap("<div>").parent().html()
            }).toArray().join("");
            return e = '<div class="slides">' + e + "</div>", $(".sidebar .export textarea").text(SL.util.html.indent(e)), this.toggle("export"), !1
        }, onImportClicked: function () {
            return this.toggle("import"), !1
        }, onArrangeClicked: function () {
            return this.close(), SL.editor.controllers.Mode.toggle("arrange"), !1
        }, onSettingsClicked: function () {
            return this.toggle("settings"), !1
        }, onRevisionsClicked: function () {
            return this.toggle("revisions"), !1
        }, onStyleClicked: function () {
            return this.toggle("style"), !1
        }, onShareClicked: function () {
            return this.toggle("share"), !1
        }, onPublishClicked: function (e) {
            if (e.preventDefault(), SL.util.user.isPro() || SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_SELF) {
                var t = [];
                t.push({
                    html: SL.locale.get("DECK_VISIBILITY_CHANGE_SELF"),
                    selected: SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_SELF,
                    callback: function () {
                        SLConfig.deck.visibility = SL.models.Deck.VISIBILITY_SELF, SL.view.saveVisibility(), this.updatePublishButton(), SL.analytics.trackEditor("Visibility changed", "self")
                    }.bind(this)
                }), SL.current_user.isEnterprise() && t.push({
                    html: SL.locale.get("DECK_VISIBILITY_CHANGE_TEAM"),
                    selected: SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_TEAM,
                    className: "divider",
                    callback: function () {
                        SLConfig.deck.visibility = SL.models.Deck.VISIBILITY_TEAM, SL.view.saveVisibility(), this.updatePublishButton(), SL.analytics.trackEditor("Visibility changed", "team")
                    }.bind(this)
                }), t.push({
                    html: SL.locale.get("DECK_VISIBILITY_CHANGE_ALL"),
                    selected: SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_ALL,
                    callback: function () {
                        SLConfig.deck.visibility = SL.models.Deck.VISIBILITY_ALL, SL.view.saveVisibility(), this.updatePublishButton(), SL.analytics.trackEditor("Visibility changed", "all")
                    }.bind(this)
                }), SL.prompt({
                    anchor: this.publishButton,
                    alignment: "r",
                    type: "select",
                    data: t
                }), SL.analytics.trackEditor("Visibility menu opened", SLConfig.deck.visibility)
            } else
                window.open("/pricing"), SL.analytics.trackEditor("Click upgrade link", "visibility button")
        }, onPanelElementClicked: function (e) {
            e.target == this.panelElement.get(0) && this.close()
        }
    }),
    SL("editor.components.sidebar").Base = Class.extend({
        init: function () {
            this.saved = !1, this.onWindowResize = this.onWindowResize.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), this.onSaveClicked = this.onSaveClicked.bind(this), this.onCancelClicked = this.onCancelClicked.bind(this), this.onCloseClicked = this.onCloseClicked.bind(this), this.bind(), this.createSignals()
        }, bind: function () {
            this.domElement.find(".save").on("click", this.onSaveClicked), this.domElement.find(".cancel").on("click", this.onCancelClicked), this.domElement.find(".close").on("click", this.onCloseClicked)
        }, createSignals: function () {
            this.onclose = new signals.Signal
        }, buffer: function () {
            this.config = JSON.parse(JSON.stringify(SLConfig))
        }, open: function () {
            this.saved = !1, this.domElement.addClass("visible"), this.layout(), $(window).on("resize", this.onWindowResize), $(document).on("keydown", this.onDocumentKeyDown)
        }, close: function () {
            this.domElement.removeClass("visible"), $(window).off("resize", this.onWindowResize), $(document).off("keydown", this.onDocumentKeyDown), this.saved === !1 && this.revert()
        }, layout: function () {
            var e = this.domElement.find(".panel-body"), t = this.domElement.find(".panel-footer");
            if (e.length && t.length) {
                var i = e.get(0).scrollHeight, n = t.outerHeight(!0) + parseInt(t.css("margin-top"), 10);
                this.domElement.toggleClass("overflowing", i > window.innerHeight - n)
            }
        }, revert: function () {
            this.buffer(), this.updateSelection(), this.applySelection()
        }, save: function () {
            return this.saved = !0, !0
        }, updateSelection: function () {
        }, applySelection: function () {
        }, onSaveClicked: function () {
            this.save() && this.onclose.dispatch()
        }, onCancelClicked: function () {
            this.onclose.dispatch()
        }, onCloseClicked: function () {
            this.onclose.dispatch()
        }, onDocumentKeyDown: function () {
        }, onWindowResize: function () {
            this.layout()
        }
    }),
    SL("editor.components.sidebar").Export = SL.editor.components.sidebar.Base.extend({
        init: function () {
            this.domElement = $(".sidebar-panel .export"), this.htmlOutputElement = this.domElement.find(".deck-html-contents"), this.cssOutputElement = this.domElement.find(".deck-css-contents"), this.downloadRevealElement = this.domElement.find(".section.download-reveal"), this.downloadPDFElement = this.domElement.find(".section.download-pdf"), this.downloadPDFButton = this.domElement.find(".download-pdf-button"), this.downloadPDFButtonLabel = this.domElement.find(".download-pdf-button .label"), this.downloadPDFButtonLabel.length && (this.downloadPDFButtonLoader = Ladda.create(this.downloadPDFButton.get(0))), this.downloadHTMLButton = this.domElement.find(".download-html-button"), this.dropboxElement = this.domElement.find(".section.dropbox"), this.dropboxContents = this.dropboxElement.find(".contents"), this.dropboxPollGoal = null, this.pdfExportId = null, this.onDropboxPoll = this.onDropboxPoll.bind(this), this.onDropboxPollTimeout = this.onDropboxPollTimeout.bind(this), this.dropboxPollJob = new SL.helpers.PollJob({
                interval: 2e3,
                timeout: 3e5
            }), this.dropboxPollJob.polled.add(this.onDropboxPoll), this.dropboxPollJob.ended.add(this.onDropboxPollTimeout), this.onPDFExportPoll = this.onPDFExportPoll.bind(this), this.onPDFExportPollTimeout = this.onPDFExportPollTimeout.bind(this), this.pdfPollJob = new SL.helpers.PollJob({
                interval: 1e3,
                timeout: 18e4
            }), this.pdfPollJob.polled.add(this.onPDFExportPoll), this.pdfPollJob.ended.add(this.onPDFExportPollTimeout), this._super(), this.updatePDFExportButton()
        }, bind: function () {
            this._super(), this.downloadHTMLButton && this.downloadHTMLButton.on("click", this.onDownloadHTMLClicked.bind(this)), this.downloadPDFButton && this.downloadPDFButton.on("click", this.onDownloadPDFClicked.bind(this)), this.htmlOutputElement && this.htmlOutputElement.on("click", this.onHTMLOutputClicked.bind(this)), this.cssOutputElement && this.cssOutputElement.on("click", this.onCSSOutputClicked.bind(this)), this.domElement.find(".upgrade-button").on("click", function () {
                SL.analytics.trackEditor("Click upgrade link", "export panel")
            })
        }, open: function () {
            this._super(), this.syncRevealExport(), this.checkDropboxStatus(), this.pdfPollJob.stop()
        }, close: function () {
            this._super(), this.dropboxStatusXHR && this.dropboxStatusXHR.abort(), this.dropboxPollJob.stop(), this.dropboxPollGoal = null
        }, syncRevealExport: function () {
            if (SL.view.isDeveloperMode()) {
                if (this.downloadRevealElement.show(), this.htmlOutputElement.length) {
                    var e = SL.view.getCurrentTheme(), t = "theme-font-" + e.get("font"), i = "theme-color-" + e.get("color"), n = ['<div class="' + t + " " + i + '" style="width: 100%; height: 100%;">', '<div class="reveal">', '<div class="slides">', SL.editor.controllers.Serialize.getDeckAsString({
                        removeSlideIds: !0,
                        removeBlockIds: !0,
                        removeTextPlaceholders: !0
                    }), "</div>", "</div>", "</div>"].join("");
                    this.htmlOutputElement.val(SL.util.html.indent(n))
                }
                this.cssOutputElement.length && (this.cssOutputElement.val("Loading..."), $.ajax({
                    url: SL.config.ASSET_URLS["offline-v2.css"],
                    context: this
                }).fail(function () {
                    this.cssOutputElement.val("Failed to load CSS...")
                }).done(function (e) {
                    this.cssOutputElement.val(["<style>", e, "</style>"].join("\n"))
                }))
            } else
                this.downloadRevealElement.hide()
        }, checkDropboxStatus: function () {
            0 !== this.dropboxElement.length && (this.dropboxStatusXHR && this.dropboxStatusXHR.abort(), this.dropboxStatusXHR = $.get(SL.config.AJAX_SERVICES_USER).done(function (e) {
                var t = "string" == typeof this.dropboxPollGoal;
                e && e.dropbox_connected ? (this.dropboxContents.html('<p>Your changes are automatically synced with Dropbox. Press the button below if you wish to disconnect.</p><button class="button negative disconnect-dropbox l">Disconnect</button>'), this.dropboxContents.find("button").on("click", this.onDropboxDisconnectClicked.bind(this)), t && "connected" === this.dropboxPollGoal && (this.dropboxPollJob.stop(), this.dropboxPollGoal = null, $.ajax({
                    type: "POST",
                    url: SL.config.AJAX_DROPBOX_SYNC_DECK(SLConfig.deck.id),
                    data: {}
                })), this.layout()) : (this.dropboxContents.html('<p>Connect with Dropbox to automatically sync your work. Presentations in your Dropbox folder can be viewed offline.</p><button class="button connect-dropbox l">Connect Dropbox</button>'), this.dropboxContents.find("button").on("click", this.onDropboxConnectClicked.bind(this)), t && "disconnected" === this.dropboxPollGoal && (this.dropboxPollJob.stop(), this.dropboxPollGoal = null), this.layout()), this.dropboxStatusXHR = null
            }.bind(this)))
        }, startPDFExport: function () {
            this.pdfExportXHR && this.pdfExportXHR.abort(), this.pdfExportXHR = $.post(SL.config.AJAX_PDF_EXPORT_START(SLConfig.deck.id)).done(function (e) {
                this.pdfExportId = e.id, this.pdfExportXHR = null, this.pdfPollJob.start()
            }.bind(this)).fail(function () {
                this.updatePDFExportButton(!1), SL.notify(SL.locale.get("EXPORT_PDF_ERROR"), "negative")
            }.bind(this))
        }, updatePDFExportButton: function (e) {
            e ? (this.downloadPDFButtonLabel.text(SL.locale.get("EXPORT_PDF_BUTTON_WORKING")), this.downloadPDFButtonLoader && this.downloadPDFButtonLoader.start()) : (this.downloadPDFButtonLabel.text(SL.locale.get("EXPORT_PDF_BUTTON")), this.downloadPDFButtonLoader && this.downloadPDFButtonLoader.stop())
        }, showPreviousPDF: function (e) {
            if ("string" == typeof e && e.length) {
                this.previousPDFElement && (this.previousPDFElement.remove(), this.previousPDFElement = null);
                var t = (SLConfig.deck.slug || "deck") + ".pdf";
                this.previousPDFElement = $('<p class="previous-pdf">Recent: <a href="' + e + '" download="' + t + '" target="_blank">' + t + "</a></p>").appendTo(this.downloadPDFElement), this.layout()
            }
        }, hidePreviousPDF: function () {
            this.previousPDFElement && (this.previousPDFElement.remove(), this.previousPDFElement = null, this.layout())
        }, onDownloadHTMLClicked: function () {
            window.open(SL.config.AJAX_EXPORT_DECK(SLConfig.deck.user.username, SLConfig.deck.slug || SLConfig.deck.id)), SL.analytics.trackEditor("Download as HTML")
        }, onDownloadPDFClicked: function () {
            this.updatePDFExportButton(!0), this.startPDFExport(), SL.analytics.trackEditor("Download as PDF")
        }, onDropboxConnectClicked: function () {
            this.dropboxPollGoal = "connected", this.dropboxPollJob.start(), SL.util.openPopupWindow(SL.config.AJAX_DROPBOX_CONNECT, "Sync with Dropbox", 1024, 650)
        }, onDropboxDisconnectClicked: function () {
            this.dropboxPollGoal = "disconnected", this.dropboxPollJob.start(), window.open(SL.config.AJAX_DROPBOX_DISCONNECT)
        }, onDropboxPoll: function () {
            this.checkDropboxStatus()
        }, onDropboxPollTimeout: function () {
        }, onPDFExportPoll: function () {
            this.pdfStatusXHR && this.pdfStatusXHR.abort(), this.pdfStatusXHR = $.get(SL.config.AJAX_PDF_EXPORT_STATUS(SLConfig.deck.id, this.pdfExportId)).done(function (e) {
                if ("string" == typeof e.url && e.url.length) {
                    var t = $('<iframe style="display: none;">');
                    t.appendTo(document.body), t.attr("src", e.url), setTimeout(t.remove, 1e3), this.showPreviousPDF(e.url), this.updatePDFExportButton(!1), this.pdfPollJob.stop()
                }
            }.bind(this))
        }, onPDFExportPollTimeout: function () {
            this.updatePDFExportButton(!1), SL.notify(SL.locale.get("EXPORT_PDF_ERROR"), "negative")
        }, onHTMLOutputClicked: function () {
            this.htmlOutputElement.select()
        }, onCSSOutputClicked: function () {
            this.cssOutputElement.select()
        }
    }),
    SL("editor.components.sidebar").ImportFile = Class.extend({
        init: function (e) {
            this.panel = e, this.importCompleted = new signals.Signal, this.render(), this.bind(), this.reset(), SL.editor.controllers.Stream.connect()
        }, render: function () {
            this.domElement = $(".sidebar-panel .import .import-from-file"), this.browseButton = this.domElement.find(".import-browse-button")
        }, bind: function () {
            this.onFileInputChange = this.onFileInputChange.bind(this), this.onSocketMessage = this.onSocketMessage.bind(this)
        }, reset: function () {
            this.hideOverlay(), this.stopTimeout(), this.createFileInput()
        }, createFileInput: function () {
            this.browseFileInput && (this.browseFileInput.remove(), this.browseFileInput.off("change", this.onFileInputChange)), this.browseButton.off("click"), this.browseButton.removeClass("disabled"), this.browseButton.text("Select PDF file"), this.browseFileInput = $('<input class="file-input" type="file">').appendTo(this.browseButton), this.browseFileInput.on("change", this.onFileInputChange)
        }, onFileInputChange: function (e) {
            e.preventDefault(), SL.analytics.trackEditor("Import PDF/PPT", "file selected");
            var t = this.browseFileInput.get(0).files[0];
            if (t) {
                var i = t.name || "untitled";
                i = i.trim(), i = i.replace(/\s/g, "-").replace(/[^a-zA-Z0-9-_\.]*/g, ""), $.ajax({
                    type: "POST",
                    url: SL.config.AJAX_PDF_IMPORT_NEW,
                    data: {deck_id: SLConfig.deck.id, filename: i},
                    context: this
                }).fail(function () {
                    SL.notify("Failed to upload, please try again", "negative")
                }).done(function (e) {
                    this.uploadFile(e.id, e.upload_url)
                })
            } else
                SL.notify("Failed to upload, please try again", "negative")
        }, uploadFile: function (e, t) {
            var i = this.browseFileInput.get(0).files[0];
            if (!i || !i.type.match(/pdf/))
                return SL.notify("Only PDF files, please"), void this.createFileInput();
            if ("number" == typeof i.size && i.size / 1024 > SL.config.MAX_IMPORT_UPLOAD_SIZE.maxsize)
                return SL.notify("No more than " + Math.round(MAX_IMPORT_UPLOAD_SIZE / 1e3) + "mb please", "negative"), void this.createFileInput();
            if ("string" != typeof t || t.length < 3)
                return SL.notify("Invalid upload URL, try reopening the imports page", "negative"), void this.createFileInput();
            SL.analytics.trackEditor("Import PDF/PPT", "upload started"), this.enterProcessingState();
            var n = new SL.helpers.FileUploader({file: i, method: "PUT", external: !0, service: t, timeout: 6e4});
            n.succeeded.add(function () {
                n.destroy(), this.createFileInput(), this.startTimeout(), SL.analytics.trackEditor("Import PDF/PPT", "upload complete"), $.ajax({
                    type: "PUT",
                    url: SL.config.AJAX_PDF_IMPORT_UPLOADED(e),
                    data: {"import": {upload_complete: !0}},
                    context: this
                }).fail(function () {
                    this.hideOverlay(), SL.notify("An error occurred while processing your file", "negative")
                }).done(function () {
                    SL.analytics.trackEditor("Import PDF/PPT", "upload_complete sent")
                })
            }.bind(this)), n.failed.add(function () {
                n.destroy(), this.createFileInput(), this.hideOverlay(), SL.notify("An error occurred while uploading your file", "negative")
            }.bind(this)), n.upload()
        }, showOverlay: function (e, t) {
            this.overlay || (this.overlay = $('<div class="import-overlay">').appendTo(document.body), this.overlayInner = $('<div class="import-overlay-inner">').appendTo(this.overlay), this.overlayHeader = $('<div class="import-overlay-header">').appendTo(this.overlayInner), this.overlayBody = $('<div class="import-overlay-body">').appendTo(this.overlayInner), this.overlayFooter = $('<div class="import-overlay-footer">').appendTo(this.overlayInner), SL.editor.controllers.Stream.get().messageReceived.add(this.onSocketMessage), setTimeout(function () {
                this.overlay.addClass("visible")
            }.bind(this), 1)), this.overlayInner.attr("data-state", e), this.overlayHeader.html("<h3>" + t + "</h3>"), this.overlayBody.empty(), this.overlayFooter.empty()
        }, hideOverlay: function () {
            this.overlay && (this.overlay.remove(), this.overlay = null, this.stopTimeout(), SL.editor.controllers.Stream.get().messageReceived.remove(this.onSocketMessage))
        }, enterProcessingState: function () {
            this.showOverlay("processing", "Processing"), this.overlayBody.html(['<div class="progress">', '<div class="progress-text">Uploading</div>', '<div class="progress-spinner spinner" data-spinner-color="#333"></div>', '<div class="progress-inner">', '<div class="progress-text">Uploading</div>', "</div>", "</div>"].join("")), SL.util.html.generateSpinners()
        }, enterFinishedState: function (e) {
            if (SL.analytics.trackEditor("Import PDF/PPT", "import complete"), this.stopTimeout(), e.output && e.output.length > 0) {
                this.showOverlay("finished", "Finished"), this.overlayBody.html(['<p>The following <strong><span class="slide-count"></span> slides</strong> will be added.</p>', '<div class="preview"></div>', '<div class="options">', '<div class="sl-checkbox outline">', '<input id="import-append-checkbox" value="" type="checkbox">', '<label for="import-append-checkbox" data-tooltip="Append the imported slides after the existing slides instead of replacing them." data-tooltip-maxwidth="300" data-tooltip-delay="500">Append slides</label>', "</div>", "</div>"].join("")), this.overlayFooter.html(['<button class="button l outline cancel-button">Cancel</button>', '<button class="button l positive confirm-button">Import</button>'].join(""));
                var t = this.overlayBody.find(".preview"), i = function () {
                    this.overlayBody.find(".slide-count").text(t.find(".preview-slide").not(".excluded").length)
                }.bind(this);
                e.output.forEach(function (e) {
                    var n = $('<div class="preview-slide">');
                    n.attr({
                        "data-background-image": e,
                        "data-background-image-original": e
                    }), n.appendTo(t), n.on("click", function () {
                        n.hasClass("excluded") ? n.removeClass("excluded").html("") : n.addClass("excluded").html('<div class="preview-slide-excluded-overlay"><span class="icon i-denied"></span></div>'), i()
                    }.bind(this))
                }.bind(this)), t.on("scroll", this.loadVisiblePreviewThumbs.bind(this)), this.loadVisiblePreviewThumbs(), i()
            } else
                this.showOverlay("finished-error", "Unexpected Error"), this.overlayBody.html("No slides were returned from the server."), this.overlayFooter.html('<button class="button l outline cancel-button">Close</button>');
            this.overlayFooter.find(".cancel-button").on("click", function () {
                this.hideOverlay()
            }.bind(this)), this.overlayFooter.find(".confirm-button").on("click", function () {
                var e = t.find(".preview-slide").not(".excluded").map(function () {
                    return '<section data-background-image="' + $(this).attr("data-background-image-original") + '" data-background-size="contain"></section>'
                }), i = this.overlayBody.find("#import-append-checkbox").is(":checked");
                SL.editor.controllers.Markup.importSlides(e, !i), i || (SLConfig.deck.background_transition = "none", Reveal.configure({backgroundTransition: SLConfig.deck.background_transition})), this.hideOverlay(), this.importCompleted.dispatch()
            }.bind(this))
        }, loadVisiblePreviewThumbs: function () {
            var e = this.overlayBody.find(".preview");
            if (e.length) {
                var t = e.scrollTop(), i = t + e.outerHeight(), n = e.find(".preview-slide").first().outerHeight();
                e.find(".preview-slide").not(".loaded").each(function (e, o) {
                    var r = o.offsetTop, s = r + n;
                    s > t && i > r && (o = $(o), o.css("background-image", "url(" + o.attr("data-background-image") + ")"), o.addClass("loaded"))
                })
            }
        }, startTimeout: function () {
            clearTimeout(this.importTimeout), this.importTimeout = setTimeout(function () {
                SL.notify("Timed out while trying to import. Please try again.", "negative"), this.hideOverlay()
            }.bind(this), SL.config.IMPORT_SOCKET_TIMEOUT)
        }, stopTimeout: function () {
            clearTimeout(this.importTimeout)
        }, onSocketMessage: function (e) {
            if (e) {
                var t = e.type.split(":")[0], i = e.type.split(":")[1];
                "import" === t && ("complete" === i ? this.enterFinishedState(e) : (this.startTimeout(), this.overlayBody.find(".progress-text").text(e.message), this.overlayBody.find(".progress-inner").css("width", 100 * e.progress + "%")))
            }
        }
    }),
    SL("editor.components.sidebar").ImportReveal = Class.extend({
        init: function (e) {
            this.panel = e, this.domElement = $(".sidebar-panel .import .import-from-reveal"), this.importInput = this.domElement.find(".import-input"), this.importStatus = this.domElement.find(".import-status"), this.importStatusText = this.domElement.find(".import-status .text"), this.importStatusIcon = this.domElement.find(".import-status .icon"), this.importStatusProceed = this.domElement.find(".import-status .proceed"), this.importCompleted = new signals.Signal, this.bind()
        }, bind: function () {
            this.importInput.on("input", this.onInputChange.bind(this)), this.importStatusProceed.on("click", this.onImportConfirmed.bind(this))
        }, reset: function () {
            this.importInput.val(""), this.importStatus.removeClass("visible")
        }, validate: function () {
            var e, t, i = $.trim(this.importInput.val());
            if (i.length > 2) {
                try {
                    e = $(i)
                } catch (n) {
                    t = "Failed to read HTML, make sure it's valid"
                }
                if (e && (e = e.not("meta, script, link, style"), e.find("meta, script, link, style").remove(), e.is(".slides") && (e = $("<div>").append(e)), 0 === e.find(".slides>section").length && (t = "Couldn't find any sections inside of .slides"), 0 === e.find(".slides").length && (t = "Couldn't find a .slides container")), this.importStatus.addClass("visible"), !t) {
                    var o = e.find(".slides section").length;
                    return this.importStatus.attr("data-state", "success"), this.importStatusText.html("Ready to import <strong>" + o + "</strong> slides."), this.importStatusIcon.removeClass("i-bolt").addClass("i-checkmark"), e.find(".slides>section")
                }
                this.importStatus.attr("data-state", "error"), this.importStatusText.html(t), this.importStatusIcon.removeClass("i-checkmark").addClass("i-bolt")
            } else
                this.importStatus.removeClass("visible");
            return null
        }, onInputChange: function () {
            this.validate()
        }, onImportConfirmed: function (e) {
            var t = this.validate();
            t && t.length && SL.prompt({
                anchor: $(e.currentTarget),
                title: SL.locale.get("DECK_IMPORT_HTML_CONFIRM"),
                type: "select",
                data: [{html: "<h3>Cancel</h3>"}, {
                    html: "<h3>Import</h3>", selected: !0, className: "positive", callback: function () {
                        SL.editor.controllers.Markup.importSlides(t, !0), this.reset(), this.importCompleted.dispatch()
                    }.bind(this)
                }]
            })
        }
    }),
    SL("editor.components.sidebar").Import = SL.editor.components.sidebar.Base.extend({
        init: function () {
            this.domElement = $(".sidebar-panel .import"), this._super()
        }, setupFileImport: function () {
            this.importFile ? this.importFile.reset() : (this.importFile = new SL.editor.components.sidebar.ImportFile(this), this.importFile.importCompleted.add(this.onImportCompleted.bind(this)))
        }, setupRevealImport: function () {
            this.importReveal ? this.importReveal.reset() : (this.importReveal = new SL.editor.components.sidebar.ImportReveal(this), this.importReveal.importCompleted.add(this.onImportCompleted.bind(this)))
        }, open: function () {
            SL.view.isNewDeck() ? SL.view.save(function () {
                this.setupFileImport()
            }.bind(this)) : this.setupFileImport(), this.setupRevealImport(), this._super()
        }, close: function () {
            this._super()
        }, onImportCompleted: function () {
            this.close(), this.onclose.dispatch()
        }
    }),
    SL("editor.components.sidebar").Revisions = SL.editor.components.sidebar.Base.extend({
        init: function () {
            this.domElement = $(".sidebar-panel .revisions"), this.listElement = this.domElement.find(".version-list"), this.panelBody = this.domElement.find(".panel-body"), this._super()
        }, bind: function () {
            this._super(), this.onPanelScroll = this.onPanelScroll.bind(this), this.onPanelScroll = $.debounce(this.onPanelScroll, 200)
        }, reset: function () {
            this.loadedAllPages = !1, this.loading = !1, this.page = 1, this.listElement.empty(), this.domElement.attr("data-state", "loading")
        }, open: function () {
            this.reset(), clearTimeout(this.loadTimeout), this.loadTimeout = setTimeout(this.load.bind(this), 500), this.panelBody.on("scroll", this.onPanelScroll), this._super()
        }, close: function () {
            this._super(), clearTimeout(this.loadTimeout), this.panelBody.off("scroll", this.onPanelScroll)
        }, load: function () {
            this.loading || this.loadedAllPages || (this.loading = !0, $.ajax({
                url: SL.config.AJAX_GET_DECK_VERSIONS(SLConfig.deck.id, this.page),
                data: {page: this.page},
                context: this
            }).done(function (e) {
                this.addVersions(e.results), this.layout(), 0 === e.results.length && (this.loadedAllPages = !0)
            }).fail(function () {
                SL.notify(SL.locale.get("GENERIC_ERROR")), this.domElement.attr("data-state", "error"), this.layout()
            }).always(function () {
                this.loading = !1, this.page += 1
            }))
        }, addVersions: function (e) {
            e.forEach(this.addVersion.bind(this)), this.listElement.find("li").length > 0 ? this.domElement.attr("data-state", "populated") : this.domElement.attr("data-state", "empty")
        }, addVersion: function (e) {
            var t = $("<li>").appendTo(this.listElement), i = $('<span class="text">').appendTo(t);
            i.append(moment(e.created_at).format("MMM DD, hh:mm a")), i.append(' <span class="de-em">(' + moment(e.created_at).fromNow() + ")</span>");
            var n = $('<div class="actions">').appendTo(t), o = $('<button class="button outline restore" data-tooltip="Restore" data-tooltip-delay="500"><span class="icon i-undo"></button>').appendTo(n);
            o.on("click", this.onRestoreClicked.bind(this, e, o));
            var r = $('<a class="button outline preview" data-tooltip="Preview" data-tooltip-delay="500"><span class="icon i-eye"></span></a>').appendTo(n);
            r.attr({
                href: SL.config.AJAX_PREVIEW_DECK_VERSION(SLConfig.deck.user.username, SLConfig.deck.slug || SLConfig.deck.id, e.content_uuid),
                target: "_blank"
            }), r.on("click", this.onPreviewClicked.bind(this, e, r))
        }, onPreviewClicked: function (e, t, i) {
            {
                var n = t.attr("href"), o = $("<span>"), r = ($('<a href="' + n + '" target="_blank" class="button outline l">Open in new tab</a>').appendTo(o), $('<button class="button grey negative restore l">Restore</button>').appendTo(o));
                $('<button class="button grey close l">Close</button>').appendTo(o)
            }
            r.on("click", this.onRestoreClicked.bind(this, e, r)), SL.modal.open("preview-deck", {
                src: n,
                footer: o
            }), SL.analytics.trackEditor("Revision preview"), i.preventDefault()
        }, onRestoreClicked: function (e, t, i) {
            SL.prompt({
                anchor: $(i.currentTarget),
                title: SL.locale.get("DECK_RESTORE_CONFIRM", {time: moment(e.created_at).fromNow()}),
                type: "select",
                data: [{html: "<h3>Cancel</h3>"}, {
                    html: "<h3>Restore</h3>",
                    selected: !0,
                    className: "negative",
                    callback: this.onRestoreConfirmed.bind(this, e, t)
                }]
            }), i.preventDefault()
        }, onRestoreConfirmed: function (e) {
            SL.analytics.trackEditor("Revision restore"), SL.helpers.PageLoader.show("Restoring..."), $.ajax({
                type: "post",
                url: SL.config.AJAX_RESTORE_DECK_VERSION(SLConfig.deck.id, e.id),
                data: e,
                context: this
            }).done(function (e) {
                e && "string" == typeof e.slug ? window.location = SL.routes.DECK_EDIT(SLConfig.deck.user.username, e.slug || SLConfig.deck.id) : window.location.reload()
            }).fail(function () {
                SL.notify(SL.locale.get("GENERIC_ERROR")), this.layout(), SL.helpers.PageLoader.hide()
            })
        }, onPanelScroll: function () {
            var e = this.panelBody.scrollTop(), t = this.panelBody.prop("scrollHeight"), i = this.panelBody.outerHeight(), n = e / (t - i);
            n > .8 && this.load()
        }
    }),
    SL("editor.components.sidebar").Settings = SL.editor.components.sidebar.Base.extend({
        init: function () {
            this.domElement = $(".sidebar-panel .settings"), this.rtlToggle = this.domElement.find('.sl-checkbox input[value="rtl"]'), this.loopToggle = this.domElement.find('.sl-checkbox input[value="should_loop"]'), this.commentsEnabledToggle = this.domElement.find('.sl-checkbox input[value="comments_enabled"]'), this.forkingEnabledToggle = this.domElement.find('.sl-checkbox input[value="forking_enabled"]'), this.titleInput = this.domElement.find("#deck-input-title"), this.descriptionInput = this.domElement.find("#deck-input-description"), this.slug = this.domElement.find(".slug"), this.slugInput = this.domElement.find("#deck-input-slug"), this.slugPrefix = this.domElement.find(".slug .text-prefix"), this.autoSlideInput = this.domElement.find("#deck-input-autoslide"), this.renderAutoSlideOptions(), this._super()
        }, renderAutoSlideOptions: function () {
            var e = '<option value="0">Off</option>';
            SL.config.AUTO_SLIDE_OPTIONS.forEach(function (t) {
                e += '<option value="' + 1e3 * t + '">' + t + " seconds</option>"
            }), this.autoSlideInput.html(e)
        }, bind: function () {
            this._super(), this.domElement.find(".sl-checkbox input").on("change", this.onToggleChange.bind(this)), this.titleInput.on("input", this.onTitleInput.bind(this)), this.slugInput.on("input", this.onSlugInput.bind(this)), this.slugInput.on("focus", this.onSlugFocus.bind(this)), this.slugInput.on("blur", this.onSlugBlur.bind(this)), this.descriptionInput.on("keypress", this.onDescriptionKeyPress.bind(this))
        }, open: function () {
            this._super(), this.buffer(), this.updateSelection(), this.titleInput.val(SL.util.unescapeHTMLEntities(this.config.deck.title || "")), this.slugInput.val(this.config.deck.slug), this.descriptionInput.val(SL.util.unescapeHTMLEntities(this.config.deck.description || "")), this.autoSlideInput.val(this.config.deck.auto_slide_interval || 0), this.slugPrefix.text(window.location.host + "/" + SLConfig.current_user.username + "/"), this.slugInput.css("padding-left", this.slugPrefix.position().left + this.slugPrefix.width())
        }, close: function () {
            this._super()
        }, save: function () {
            var e = this.titleInput.val(), t = this.slugInput.val(), i = this.descriptionInput.val();
            return e ? t ? (this._super(), SLConfig.deck.title = e, SLConfig.deck.description = i ? i.replace(/\n/g, " ") : "", SLConfig.deck.slug = t, SLConfig.deck.rtl = this.rtlToggle.is(":checked"), SLConfig.deck.should_loop = this.loopToggle.is(":checked"), SLConfig.deck.comments_enabled = this.commentsEnabledToggle.is(":checked"), SLConfig.deck.forking_enabled = this.forkingEnabledToggle.is(":checked"), SLConfig.deck.auto_slide_interval = parseInt(this.autoSlideInput.val(), 10) || 0, SLConfig.deck.dirty = !0, SL.analytics.trackEditor("Deck.edit: Setting saved"), $("html").toggleClass("rtl", SLConfig.deck.rtl), !0) : (SL.notify(SL.locale.get("DECK_EDIT_INVALID_SLUG"), "negative"), !1) : (SL.notify(SL.locale.get("DECK_EDIT_INVALID_TITLE"), "negative"), !1)
        }, updateSelection: function () {
            this.rtlToggle.prop("checked", this.config.deck.rtl), this.loopToggle.prop("checked", this.config.deck.should_loop), this.commentsEnabledToggle.prop("checked", this.config.deck.comments_enabled), this.forkingEnabledToggle.prop("checked", this.config.deck.forking_enabled)
        }, applySelection: function () {
            Reveal.configure({rtl: this.rtlToggle.is(":checked"), loop: this.loopToggle.is(":checked")})
        }, generateSlug: function () {
            if (this.deckIsPrivate() && this.slugIsUnchanged() || this.slugWasManuallyCleared) {
                var e = this.titleInput.val(), t = SL.util.string.slug(e);
                this.slugInput.val(t)
            }
        }, deckIsPrivate: function () {
            return SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_SELF
        }, slugIsUnchanged: function () {
            return (SLConfig.deck.slug || "") === (SL.util.string.slug(SLConfig.deck.title) || "")
        }, onToggleChange: function () {
            this.applySelection()
        }, onTitleInput: function () {
            this.generateSlug()
        }, onDescriptionKeyPress: function (e) {
            return 13 == e.keyCode ? !1 : void 0
        }, onSlugInput: function () {
            this.slugWasManuallyCleared = "" === this.slugInput.val()
        }, onSlugFocus: function () {
            this.deckIsPrivate() || SL.tooltip.show("Changing the URL of your deck will break existing links to it.", {
                anchor: this.slugInput,
                alignment: "r",
                maxwidth: 220
            })
        }, onSlugBlur: function () {
            SL.tooltip.hide(), this.slugInput.val(SL.util.string.slug(this.slugInput.val()))
        }
    }),
    SL("editor.components.sidebar").Share = SL.editor.components.sidebar.Base.extend({
        init: function () {
            this.domElement = $(".sidebar-panel .share"), this.sharer = new SL.components.DeckSharer("light"), this.sharer.appendTo(this.domElement.find(".contents")), this._super()
        }, open: function () {
            this._super(), this.sharer.render(SLConfig.deck), this.domElement.find(".url input").addClass("xl")
        }
    }),
    SL("editor.components.sidebar").Style = SL.editor.components.sidebar.Base.extend({
        init: function () {
            this.domElement = $(".sidebar-panel .style"), this._super()
        }, bind: function () {
            this._super(), this.domElement.find(".edit-style").on("click", this.onAdvancedStylesCLicked.bind(this))
        }, scroll: function () {
            this.domElement.find(".panel-body").scrollTop(0), $(".page-wrapper").scrollTop(0)
        }, open: function () {
            this._super(), this.themeoptions ? this.themeoptions.populate(SL.models.Theme.fromDeck(SLConfig.deck)) : (this.themeoptions = new SL.components.ThemeOptions({
                center: !1,
                rollingLinks: !1,
                fonts: SL.config.THEME_FONTS,
                colors: SL.config.THEME_COLORS,
                themes: SL.current_user.getThemes(),
                model: SL.models.Theme.fromDeck(SLConfig.deck),
                container: this.domElement.find(".panel-body")
            }), this.themeoptions.changed.add(this.onThemeOptionsChanged.bind(this))), this.scroll(), this.layout()
        }, close: function () {
            this._super()
        }, revert: function () {
            this._super(), SL.helpers.ThemeController.paint(SL.view.getCurrentTheme(), {center: !1, js: !1})
        }, save: function () {
            var e = SL.view.getCurrentTheme(), t = this.themeoptions.getTheme(), i = e.get("id") == t.get("id"), n = (e.get("js") || "") == (t.get("js") || "");
            return i || n ? (this._super(), this.saveData(), !0) : (this.promptReload(), !1)
        }, saveData: function () {
            var e = this.themeoptions.getTheme();
            SLConfig.deck.dirty = !0, SLConfig.deck.theme_id = e.get("id"), SLConfig.deck.theme_font = e.get("font"), SLConfig.deck.theme_color = e.get("color"), SLConfig.deck.center = e.get("center"), SLConfig.deck.rolling_links = e.get("rolling_links"), SLConfig.deck.transition = e.get("transition"), SLConfig.deck.background_transition = e.get("background_transition"), Reveal.configure({
                center: !1,
                rolling_links: SLConfig.deck.rolling_links,
                transition: SLConfig.deck.transition,
                backgroundTransition: SLConfig.deck.background_transition
            }), SL.editor.controllers.Thumbnail.invalidate(), SL.editor.controllers.Contrast.sync(), SL.view.onThemeChanged()
        }, promptReload: function () {
            SL.prompt({
                anchor: this.domElement.find(".save"),
                title: "The editor needs to reload to apply your changes.",
                alignment: "t",
                type: "select",
                data: [{html: "<h3>Cancel</h3>"}, {
                    html: "<h3>Continue</h3>",
                    className: "positive",
                    callback: this.saveAndReload.bind(this)
                }]
            })
        }, saveAndReload: function () {
            this.saveData(), SL.view.save(function () {
                window.location.reload()
            }), SL.prompt({
                anchor: this.domElement.find(".save"),
                title: 'Saving and reloading...<div class="spinner centered-horizontally"></div>',
                alignment: "t",
                optional: !1,
                options: []
            }), SL.util.html.generateSpinners()
        }, onAdvancedStylesCLicked: function () {
            SL.analytics.trackEditor("Open CSS editor"), SL.editor.controllers.Mode.change("css")
        }, onThemeOptionsChanged: function () {
            this.layout(), SL.editor.controllers.Grid.refresh()
        }
    }),
    SL("editor.components").SlideOptions = Class.extend({
        init: function (e, t) {
            this.editor = e, this.options = $.extend({
                removeSlide: !0,
                backgroundColor: !0,
                backgroundImage: !0,
                customClasses: !0,
                fragment: !0,
                notes: !0,
                html: !0
            }, t), this.render(), this.bind()
        }, render: function () {
            this.domElement = $('<div class="slide-options"></div>').appendTo($(".projector")), this.listElement = $("<ul></ul>").appendTo(this.domElement), this.renderOptions()
        }, configure: function (e) {
            this.options = $.extend(this.options, e), this.renderOptions()
        }, renderOptions: function () {
            this.removeSlideElement && this.removeSlideElement.remove(), this.backgroundColorElement && this.backgroundColorElement.remove(), this.backgroundImageElement && this.backgroundImageElement.remove(), this.backgroundImageMenu && this.backgroundImageMenu.remove(), this.customClassesElement && this.customClassesElement.remove(), this.fragmentElement && this.fragmentElement.remove(), this.notesElement && this.notesElement.remove(), this.htmlElement && this.htmlElement.remove(), this.options.removeSlide && (this.removeSlideElement = this.renderOption("remove-slide", "i-trash-stroke", "Remove current slide"), this.removeSlideElement.on("vclick", this.onRemoveSlideClicked.bind(this))), this.options.backgroundColor && (this.backgroundColorElement = this.renderOption("background", "i-droplet", "Slide background color"), this.backgroundColorElement.on("vclick", this.onBackgroundColorClicked.bind(this))), this.options.backgroundImage && (this.backgroundImageElement = this.renderOption("background-image", "i-image", "Slide background image"), this.renderBackgroundImageMenu(), this.backgroundImageElement.on("vclick", this.onBackgroundImageClicked.bind(this)), this.backgroundImageMenu.find(".background-size").on("change", this.onBackgroundImageSizeChanged.bind(this)), this.backgroundImageMenu.find(".remove-background").on("click", this.onBackgroundImageRemoveClicked.bind(this))), this.options.customClasses && (this.customClassesElement = this.renderOption("custom-classes", "i-star", "Slide classes"), this.customClassesElement.on("vclick", this.onCustomClassesClicked.bind(this)), this.syncCustomClasses()), this.options.fragment && (this.fragmentElement = this.renderOption("fragment", "i-bolt", "Create fragments<br>(SHIFT + ALT + F)"), this.fragmentElement.on("vclick", this.onFragmentClicked.bind(this))), this.options.notes && (this.notesElement = this.renderOption("notes", "i-book-alt2", "Speaker notes<br>(SHIFT + ALT + N)"), this.notesElement.on("vclick", this.onNotesClicked.bind(this))), this.options.html && (this.htmlElement = this.renderOption("html", "i-file-xml", "Edit HTML<br>(SHIFT + ALT + H)"), this.htmlElement.on("vclick", this.onHTMLClicked.bind(this)))
        }, renderOption: function (e, t, i) {
            var n = $('<li><span class="icon ' + t + '"></span></li>');
            return n.attr({
                "class": e,
                "data-tooltip": i,
                "data-tooltip-alignment": "l"
            }), n.appendTo(this.listElement), n
        }, renderBackgroundImageMenu: function () {
            this.backgroundImageMenu = $('<div class="background-image-menu">').appendTo(this.domElement), this.backgroundImageInner = $('<div class="inner"></div>').appendTo(this.backgroundImageMenu);
            var e = $('<div class="upload-input"></div>').appendTo(this.backgroundImageInner);
            e.append('<span class="icon i-cloud-upload"></span>'), e.append('<span class="label">Upload image</span>');
            var t = $('<div class="upload-progress"></div>').appendTo(this.backgroundImageInner);
            t.append('<span class="spinner centered"></span>'), t.append('<span class="label">Uploading...</span>'), SL.util.html.generateSpinners();
            var i = $('<div class="upload-output"></div>').appendTo(this.backgroundImageInner);
            i.append('<div class="thumbnail"></div>');
            var n = $('<div class="background-image-options"></div>').appendTo(i);
            n.append(['<select class="sl-select white background-size">', '<option value="cover">Stretch</option>', '<option value="contain">Fit</option>', '<option value="initial">Original</option>', "</select>"].join("")), n.append('<button class="button remove-background">Remove</button>'), this.renderBackgroundImageMenuInput()
        }, renderBackgroundImageMenuInput: function () {
            this.backgroundImageMenu.find(".upload-input .file-input").remove(), this.backgroundImageMenu.find(".upload-input").append('<input class="file-input" type="file">'), this.backgroundImageFileInput = this.backgroundImageMenu.find(".file-input"), this.backgroundImageFileInput.on("change", this.onBackgroundImageFileInputChanged.bind(this)), SL.editor.controllers.Capabilities.isTouchEditor() && this.backgroundImageFileInput.on("touchstart", function (e) {
                e.preventDefault(), $(e.target).click()
            })
        }, bind: function () {
            this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this), $(document).on("mousedown touchstart", this.onDocumentMouseDown)
        }, collapse: function () {
            this.hideOpenPanels()
        }, hideOpenPanels: function () {
            this.backgroundColorMenu && this.hideBackgroundColorMenu(), this.backgroundImageMenu && this.hideBackgroundImageMenu()
        }, hasOpenPanel: function () {
            return this.backgroundColorMenu && this.backgroundColorMenu.hasClass("show") || this.backgroundImageMenu && this.backgroundImageMenu.hasClass("show")
        }, showOverflowWarning: function () {
            this.overflowWarning || SL.editor.controllers.Capabilities.isTouchEditor() || (this.overflowWarning = $('<div class="overflow-warning"><span class="icon i-info"></span></div>'), this.overflowWarning.attr({
                "class": "overflow-warning",
                "data-tooltip": "Please keep content inside of the dotted outline. Content placed outside may not be visible on all display sizes.",
                "data-tooltip-maxwidth": 300,
                "data-tooltip-alignment": "l"
            })), 0 === this.overflowWarning.parent().length && this.overflowWarning.appendTo(this.domElement)
        }, hideOverflowWarning: function () {
            this.overflowWarning && this.overflowWarning.remove()
        }, syncRemoveSlide: function () {
            this.removeSlideElement && this.removeSlideElement.toggleClass("disabled", $(".reveal .slides section").length < 2)
        }, syncCustomClasses: function () {
            var e = this.editor.getCurrentTheme();
            if (e) {
                var t = SL.util.string.getCustomClassesFromLESS(e.get("less"));
                this.customClassesElement.toggleClass("disabled", 0 === t.length)
            }
        }, syncBackgroundImageMenu: function () {
            var e = $(Reveal.getCurrentSlide()), t = e.attr("data-background-image"), i = e.attr("data-background-size"), n = this.backgroundImageMenu.find(".upload-output .thumbnail"), o = this.backgroundImageMenu.find(".upload-output .background-size");
            "string" == typeof t && t.length ? (n.css({
                "background-image": 'url("' + t + '")',
                "background-repeat": "no-repeat",
                "background-size": "cover"
            }), o.val(i || "cover"), this.backgroundImageMenu.attr("data-state", "uploaded")) : this.fileUploader ? (n.css("background-image", "none"), this.backgroundImageMenu.attr("data-state", "uploading")) : (n.css("background-image", "none"), this.backgroundImageMenu.attr("data-state", ""))
        }, triggerBackgroundImage: function () {
            $(Reveal.getCurrentSlide).focus(), this.backgroundImageMenu.addClass("show")
        }, triggerNotes: function () {
            if (!this.notesPrompt) {
                SL.util.deck.generateIdentifiers();
                var e = $(Reveal.getCurrentSlide()).attr("data-id"), t = SL.config.SPEAKER_NOTES_MAXLENGTH;
                this.notesPrompt = SL.prompt({
                    anchor: this.notesElement,
                    alignment: "l",
                    title: "Speaker Notes",
                    type: "input",
                    confirmLabel: "Save",
                    data: {
                        value: SLConfig.deck.notes[e],
                        placeholder: "Plain text, max " + t + " characters...",
                        multiline: !0,
                        maxlength: t,
                        confirmBeforeDiscard: !0
                    }
                }), this.notesPrompt.confirmed.add(function (t) {
                    SLConfig.deck.notes[e] = t, SLConfig.deck.dirty = !0, SL.analytics.trackEditor("Saved notes")
                }), this.notesPrompt.destroyed.add(function () {
                    this.notesPrompt = null
                }.bind(this))
            }
        }, triggerHTML: function () {
            var e = SL.editor.controllers.Serialize.getSlideAsString(Reveal.getCurrentSlide(), {
                inner: !0,
                exclude: ".math-output"
            }), t = new SL.components.TextEditor({type: "html", value: SL.util.html.indent(e)});
            t.saved.add(function (e) {
                SL.editor.controllers.Markup.writeHTMLToCurrentSlide(e)
            }.bind(this)), SL.analytics.trackEditor("Edit per-slide HTML")
        }, triggerCustomClasses: function () {
            if (!this.customClassesPrompt) {
                var e = this.editor.getCurrentTheme();
                if (e) {
                    var t = SL.util.string.getCustomClassesFromLESS(e.get("less"));
                    if (t.length) {
                        var i = $(Reveal.getCurrentSlide()), n = t.map(function (e) {
                            return {
                                value: e, selected: i.hasClass(e), callback: function (e) {
                                    i.toggleClass(e), Reveal.sync()
                                }
                            }
                        });
                        this.customClassesPrompt = SL.prompt({
                            anchor: this.customClassesElement,
                            alignment: "l",
                            title: "Slide classes",
                            type: "list",
                            data: n,
                            multiselect: !0,
                            optional: !0
                        }), this.customClassesPrompt.destroyed.add(function () {
                            this.customClassesPrompt = null
                        }.bind(this))
                    }
                }
            }
        }, hideBackgroundColorMenu: function () {
            SL.view.colorpicker.hide()
        }, hideBackgroundImageMenu: function () {
            this.backgroundImageMenu.removeClass("show")
        }, setBackgroundColor: function (e) {
            Reveal.getCurrentSlide().setAttribute("data-background-color", e), Reveal.sync(), SL.editor.controllers.Contrast.sync()
        }, clearBackgroundColor: function () {
            Reveal.getCurrentSlide().removeAttribute("data-background-color"), Reveal.sync(), SL.editor.controllers.Contrast.sync()
        }, onRemoveSlideClicked: function (e) {
            SL.editor.controllers.Blocks.blur(), SL.prompt({
                anchor: $(e.currentTarget),
                title: SL.locale.get("DECK_DELETE_SLIDE_CONFIRM"),
                alignment: "l",
                type: "select",
                data: [{html: "<h3>Cancel</h3>"}, {
                    html: "<h3>Remove</h3>", selected: !0, className: "negative", callback: function () {
                        SL.editor.controllers.Markup.removeCurrentSlide()
                    }.bind(this)
                }]
            }), e.preventDefault()
        }, onFragmentClicked: function (e) {
            e.preventDefault(), SL.editor.controllers.Mode.change("fragment")
        }, onBackgroundColorClicked: function (e) {
            e.preventDefault(), this.hideBackgroundImageMenu();
            var t = {
                anchor: this.backgroundColorElement,
                alignment: "l",
                alpha: !1,
                changeCallback: this.setBackgroundColor.bind(this),
                resetCallback: this.clearBackgroundColor.bind(this)
            }, i = Reveal.getCurrentSlide();
            i.hasAttribute("data-background-color") && (t.color = i.getAttribute("data-background-color")), SL.view.colorpicker.toggle(t), SL.analytics.trackEditor("Toggle background color menu")
        }, onBackgroundImageClicked: function (e) {
            e.preventDefault(), this.syncBackgroundImageMenu(), this.hideBackgroundColorMenu();
            var t = 144, i = 36;
            this.backgroundImageMenu.toggleClass("show").addClass("immediate"), this.backgroundImageMenu.css("top", this.backgroundImageElement.position().top - (t - i) / 2), setTimeout(function () {
                this.backgroundImageMenu.removeClass("immediate")
            }.bind(this), 1), SL.analytics.trackEditor("Toggle background image menu")
        }, onBackgroundImageRemoveClicked: function (e) {
            Reveal.getCurrentSlide().removeAttribute("data-background-image"), Reveal.sync(), this.syncBackgroundImageMenu(), SL.analytics.trackEditor("Remove background image"), e.preventDefault()
        }, onBackgroundImageSizeChanged: function () {
            var e = this.backgroundImageMenu.find(".background-size");
            Reveal.getCurrentSlide().setAttribute("data-background-size", e.val()), Reveal.sync(), this.syncBackgroundImageMenu()
        }, onBackgroundImageFileInputChanged: function (e) {
            var t = Reveal.getCurrentSlide(), i = Reveal.getIndices(t), n = this.backgroundImageFileInput.get(0).files[0];
            return this.triggerBackgroundImage(), n && n.type.match(/image.*/) ? "number" == typeof n.size && n.size / 1024 > SL.config.MAX_IMAGE_UPLOAD_SIZE ? void SL.notify("No more than " + Math.round(SL.config.MAX_IMAGE_UPLOAD_SIZE / 1024) + "mb please", "negative") : (this.fileUploader = new SL.helpers.FileUploader({
                file: n,
                service: SL.config.AJAX_IMAGE_UPLOAD,
                timeout: 6e4
            }), this.syncBackgroundImageMenu(), this.fileUploader.succeeded.add(function (e) {
                this.fileUploader.destroy(), this.fileUploader = null, e && "string" == typeof e.url ? (t.setAttribute("data-background-image", e.url), Reveal.sync()) : SL.notify("An error occurred while uploading your image.", "negative"), this.syncBackgroundImageMenu(), i && 0 === i.h && 0 === i.v && SL.editor.controllers.Thumbnail.generate(), this.renderBackgroundImageMenuInput()
            }.bind(this)), this.fileUploader.failed.add(function () {
                this.fileUploader.destroy(), this.fileUploader = null, SL.notify("An error occurred while uploading your image.", "negative"), this.syncBackgroundImageMenu(), this.renderBackgroundImageMenuInput()
            }.bind(this)), this.fileUploader.upload(), void e.preventDefault()) : void SL.notify("Only image files, please")
        }, onHTMLClicked: function (e) {
            e.preventDefault(), SL.editor.controllers.Blocks.blur(), this.triggerHTML()
        }, onNotesClicked: function (e) {
            e.preventDefault(), this.triggerNotes()
        }, onCustomClassesClicked: function (e) {
            e.preventDefault(), this.triggerCustomClasses()
        }, onDocumentMouseDown: function (e) {
            var t = $(e.target);
            0 === t.parents(".slide-options").length && this.collapse()
        }
    }),
    SL("editor.components").Toolbars = Class.extend({
        init: function (e) {
            this.editor = e, this.stack = [], this.render(), this.show(), this.push(new SL.editor.components.toolbars.Add)
        }, render: function () {
            this.domElement = $('<div class="toolbars">').appendTo(document.body), this.innerElement = $('<div class="toolbars-inner">').appendTo(this.domElement), this.scrollerElement = $('<div class="toolbars-scroller">').appendTo(this.innerElement), this.footerElement = $('<div class="toolbars-footer"></div>').appendTo(this.domElement), this.footerElement.append('<div class="label" data-tooltip="You are using the new Slides editor (beta).<br>During beta you still have the option of using our old editor, see your account settings." data-tooltip-maxwidth="300">BETA</div>'), SL.editor.controllers.Capabilities.isTouchEditor() || (this.footerElement.append('<div class="option editor-settings" data-tooltip="Editor settings"><span class="icon i-equalizer"></span></div>'), this.footerElement.find(".option.editor-settings").on("click", this.onSettingsClicked))
        }, show: function () {
            this.domElement.addClass("visible")
        }, hide: function () {
            this.domElement.removeClass("visible")
        }, push: function (e) {
            this.stack.push(e), e.appendTo(this.scrollerElement), this.layout()
        }, pop: function () {
            this.stack.length > 1 && this.stack.pop().destroyAfter(1e3), this.layout()
        }, get: function (e) {
            return this.stack[this.stack.length - 1 + (e || 0)]
        }, clear: function () {
            for (; this.stack.length > 1;)
                this.stack.pop().destroyAfter(1e3);
            this.layout()
        }, sync: function () {
            this.stack.forEach(function (e) {
                e.sync()
            })
        }, layout: function () {
            for (var e = 0, t = 0, i = this.stack.length; i > t; t++) {
                var n = this.stack[t];
                n.move(e, null), e += n.measure().width, i - 1 > t && n.collapse()
            }
            var o = this.get(), r = o.measure();
            this.domElement.find(".toolbar").removeClass("visible"), o.domElement.addClass("visible");
            var s = "translateX(" + -Math.round(r.x) + "px)";
            this.scrollerElement.css({"-webkit-transform": s, "-moz-transform": s, "-ms-transform": s, transform: s})
        }, getToolbarMeasurements: function () {
            var e = this.innerElement.position(), t = {
                x: e.left,
                y: e.top,
                width: this.innerElement.width(),
                height: this.innerElement.height()
            };
            return t.bottom = t.y + t.height, t.right = t.x + t.width, t
        }, hasOpenPanel: function () {
            return this.stack.some(function (e) {
                return e.hasOpenPanel()
            })
        }, collapse: function () {
            this.stack.forEach(function (e) {
                e.collapse()
            })
        }, onSettingsClicked: function (e) {
            this.settingsPrompt = SL.prompt({
                anchor: e.currentTarget,
                type: "custom",
                title: "Editor Settings",
                className: "editor-settings",
                html: ['<div class="editor-option sl-checkbox outline white">', '<input id="editor-settings-grid" type="checkbox">', '<label for="editor-settings-grid" data-tooltip="Display a grid behind the slide to help with alignment." data-tooltip-delay="500" data-tooltip-alignment="r" data-tooltip-maxwidth="220">Grid</label>', "</div>", '<div class="editor-option sl-checkbox outline white">', '<input id="editor-settings-snap" type="checkbox">', '<label for="editor-settings-snap" data-tooltip="Snap dragged blocks to the grid, slide edges and other blocks." data-tooltip-delay="500" data-tooltip-alignment="r" data-tooltip-maxwidth="220">Snap</label>', "</div>", '<div class="editor-option sl-checkbox outline white">', '<input id="editor-settings-developer-mode" type="checkbox">', '<label for="editor-settings-developer-mode" data-tooltip="Turn on developer-friendly features:<br>- Per slide HTML editor.<br>- Access to full deck HTML, for exporting to reveal.js.<br>- Add class names to any focused block. Makes it easy to target content with custom CSS." data-tooltip-delay="500" data-tooltip-alignment="r" data-tooltip-maxwidth="340">Developer mode</label>', "</div>"].join("")
            });
            var t = this.settingsPrompt.getDOMElement().find("#editor-settings-grid");
            t.prop("checked", SL.current_user.settings.get("editor_grid")), t.on("change", function (e) {
                SL.current_user.settings.set("editor_grid", e.currentTarget.checked), SL.current_user.settings.save(["editor_grid"]), SL.editor.controllers.Grid.refresh(), SL.analytics.trackEditor("Toggle Grid")
            });
            var i = this.settingsPrompt.getDOMElement().find("#editor-settings-snap");
            i.prop("checked", SL.current_user.settings.get("editor_snap")), i.on("change", function (e) {
                SL.current_user.settings.set("editor_snap", e.currentTarget.checked), SL.current_user.settings.save(["editor_snap"]), SL.analytics.trackEditor("Toggle Snap")
            });
            var n = this.settingsPrompt.getDOMElement().find("#editor-settings-developer-mode");
            n.prop("checked", SL.current_user.settings.get("developer_mode")), n.on("change", function (e) {
                SL.current_user.settings.set("developer_mode", e.currentTarget.checked), SL.current_user.settings.save(["developer_mode"]), SL.view.slideOptions.configure({html: e.currentTarget.checked}), SL.analytics.trackEditor("Toggle Developer Mode")
            })
        }
    }),
    SL("editor.components.toolbars").Base = Class.extend({
        init: function () {
            this.render()
        }, render: function () {
            this.domElement = $('<div class="toolbar">'), this.listElement = $('<div class="toolbar-list">').appendTo(this.domElement)
        }, appendTo: function (e) {
            this.domElement.appendTo(e)
        }, collapse: function () {
            this.getAllOptions().forEach(function (e) {
                "object" == typeof e.panel && e.panel.hide()
            })
        }, sync: function () {
            this.getAllOptions().forEach(function (e) {
                "function" == typeof e.sync && e.sync()
            })
        }, move: function (e, t) {
            this.domElement.css({left: e, top: t})
        }, measure: function () {
            var e = this.domElement.position();
            return {x: e.left, y: e.top, width: this.domElement.outerWidth(), height: this.domElement.outerHeight()}
        }, hasOpenPanel: function () {
            return this.getAllOptions().some(function (e) {
                return !("object" != typeof e.panel || !e.panel.isVisible())
            })
        }, getAllOptions: function () {
            var e = [];
            return "object" == typeof this.options && this.options.length && (e = e.concat(this.options), this.options.forEach(function (t) {
                "object" == typeof t.options && t.options.length && (e = e.concat(t.options))
            })), e
        }, destroyAfter: function (e) {
            this.collapse(), clearTimeout(this.destroyTimeout), "number" == typeof e && (this.destroyTimeout = setTimeout(this.destroy.bind(this), e))
        }, destroy: function () {
            this.domElement.remove()
        }
    }),
    SL("editor.components.toolbars").AddSnippet = SL.editor.components.toolbars.Base.extend({
        init: function () {
            this._super()
        }, render: function () {
            this._super(), this.domElement.attr("data-type", "add"), this.sync()
        }, sync: function () {
            this._super();
            var e = SL.view.getCurrentTheme();
            if (e) {
                var t = e.get("snippets");
                t && !t.isEmpty() && t.forEach(function (e) {
                    var t = $('<div class="toolbar-add-snippet-option">');
                    t.text(e.get("title")), t.appendTo(this.listElement), t.on("vclick", this.onSnippetClicked.bind(this, e))
                }.bind(this))
            }
        }, insert: function (e, t) {
            SL.editor.controllers.Blocks.add({
                type: "snippet", slide: e, afterInit: function (e) {
                    e.setCustomHTML(t), e.resizeToFitContent()
                }
            })
        }, onSnippetClicked: function (e) {
            var t = $(Reveal.getCurrentSlide());
            if (e.templateHasVariables())
                SL.modal.open("insert-snippet", {
                    snippet: e, callback: function (e) {
                        this.insert(t, e)
                    }.bind(this)
                });
            else {
                var i = e.get("template").replace(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG, "");
                this.insert(t, i)
            }
        }
    }),
    SL("editor.components.toolbars").Add = SL.editor.components.toolbars.Base.extend({
        init: function () {
            this._super()
        }, render: function () {
            this._super(), this.domElement.attr("data-type", "add"), SL.config.BLOCKS.forEach(function (e) {
                if (!e.hidden) {
                    var t = $(['<div class="toolbar-add-block-option" data-block-type="' + e.type + '">', '<span class="toolbar-add-block-option-icon icon i-' + e.icon + '"></span>', '<span class="toolbar-add-block-option-label">' + e.label + "</span>", "</div>"].join(""));
                    this.bindOption(t, e), t.appendTo(this.listElement)
                }
            }.bind(this)), this.renderSnippets()
        }, renderSnippets: function () {
            this.snippetsOptions = $(['<div class="toolbar-add-block-option">', '<span class="toolbar-add-block-option-icon icon i-document-alt-stroke"></span>', '<span class="toolbar-add-block-option-label">Snippet</span>', "</div>"].join("")), this.snippetsOptions.on("vclick", function () {
                SL.view.toolbars.push(new SL.editor.components.toolbars.AddSnippet)
            }.bind(this))
        }, sync: function () {
            this._super();
            var e = SL.view.getCurrentTheme();
            e && e.get("snippets") && !e.get("snippets").isEmpty() ? this.snippetsOptions.appendTo(this.listElement) : this.snippetsOptions.detach()
        }, bindOption: function (e, t) {
            function i() {
                l || (SL.editor.controllers.Blocks.add({type: t.type}), SL.analytics.trackEditor("Insert block", t.type))
            }

            function n(e) {
                a = !0, l = !1, s = e.clientX, $(document).on("mousemove", o), $(document).on("mouseup", r), e.preventDefault()
            }

            function o(e) {
                if (a && !l && e.clientX - s > 10) {
                    l = !0;
                    var i = SL.editor.controllers.Blocks.add({
                        type: t.type,
                        silent: !0,
                        center: !1
                    }), n = $(".reveal .slides").offset(), o = i.measure();
                    i.move(e.clientX - n.left - o.width / 2, e.clientY - n.top - o.height / 2), i.onMouseDown(e), SL.analytics.trackEditor("Insert block via drag", t.type)
                }
                e.preventDefault()
            }

            function r() {
                $(document).off("mousemove", o), $(document).off("mouseup", r), a = !1, l = !1
            }

            var s = 0, a = !1, l = !1;
            e.on("vclick", i), SL.editor.controllers.Capabilities.isTouchEditor() || e.on("mousedown", n)
        }
    }),
    SL("editor.components.toolbars").EditMultiple = SL.editor.components.toolbars.Base.extend({
        init: function () {
            this.options = [], this._super()
        }, render: function () {
            this._super(), this.domElement.attr("data-type", "edit-multiple"), [SL.editor.components.toolbars.options.BlockAlignHorizontal, SL.editor.components.toolbars.options.BlockAlignVertical, SL.editor.components.toolbars.options.BlockDepth, SL.editor.components.toolbars.options.BlockActions].forEach(this.renderOption.bind(this))
        }, renderOption: function (e) {
            var t = new e(SL.editor.controllers.Blocks.getFocusedBlocks()[0]);
            t.appendTo(this.listElement), this.options.push(t)
        }, destroy: function () {
            for (; this.options.length;)
                this.options.pop().destroy();
            this._super()
        }
    }),
    SL("editor.components.toolbars").Edit = SL.editor.components.toolbars.Base.extend({
        init: function (e) {
            this.block = e, this.options = [], this._super()
        }, render: function () {
            this._super(), this.domElement.attr("data-type", "edit"), this.block.getToolbarOptions().forEach(this.renderOption.bind(this)), SL.current_user.isPro() && SL.view.isDeveloperMode() && this.renderOption(SL.editor.components.toolbars.options.ClassName)
        }, renderOption: function (e) {
            var t = new e(this.block);
            t.appendTo(this.listElement), t.changed && t.changed.add(this.sync.bind(this)), this.options.push(t)
        }, appendTo: function () {
            this._super.apply(this, arguments), this.sync()
        }, destroy: function () {
            for (; this.options.length;)
                this.options.pop().destroy();
            this._super()
        }
    }),
    SL("editor.components.toolbars.groups").Base = Class.extend({
        init: function (e, t) {
            this.block = e, this.config = $.extend({
                label: "Group",
                items: []
            }, t), this.options = [], this.render(), this.bind()
        }, render: function () {
            this.domElement = $('<div class="toolbar-option toolbar-group">'), this.config.type && this.domElement.attr("data-group-type", this.config.type), this.triggerElement = $('<div class="toolbar-group-trigger">').appendTo(this.domElement), this.triggerElement.append('<span class="label">' + this.config.label + "</span>"), this.triggerElement.append('<span class="checkbox icon i-checkmark"></span>'), this.optionsElement = $('<div class="toolbar-group-options">').appendTo(this.domElement), this.optionsInnerElement = $('<div class="toolbar-group-options-inner">').appendTo(this.optionsElement), this.config.items.forEach(this.renderOption.bind(this))
        }, renderOption: function (e) {
            var t = new e(this.block);
            t.appendTo(this.optionsInnerElement), this.options.push(t)
        }, bind: function () {
            this.domElement.find(".toolbar-group-trigger").on("vclick", this.onClicked.bind(this))
        }, appendTo: function (e) {
            this.domElement.appendTo(e)
        }, sync: function () {
            this.expand()
        }, trigger: function () {
        }, expand: function () {
            this.domElement.addClass("expanded"), this.optionsElement.height(this.optionsInnerElement.prop("scrollHeight") + 2), this.options.forEach(function (e) {
                "function" == typeof e.readFromBlock && e.readFromBlock()
            })
        }, collapse: function () {
            this.domElement.removeClass("expanded"), this.optionsElement.height(0)
        }, isExpanded: function () {
            return this.domElement.hasClass("expanded")
        }, onClicked: function (e) {
            e.preventDefault(), this.trigger()
        }, destroy: function () {
            for (; this.options.length;)
                this.options.pop().destroy();
            this.domElement.remove()
        }
    }),
    SL("editor.components.toolbars.groups").BorderCSS = SL.editor.components.toolbars.groups.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "border-css",
                label: "Border",
                items: [SL.editor.components.toolbars.options.BorderStyle, SL.editor.components.toolbars.options.BorderWidth, SL.editor.components.toolbars.options.BorderRadius, SL.editor.components.toolbars.options.BorderColor]
            }, t))
        }, sync: function () {
            var e = this.block.get("style.border-style");
            e && "none" !== e ? this.expand() : this.collapse()
        }, trigger: function () {
            this.block.isset("style.border-style") ? (this.block.unset("style.border-style"), this.block.unset("style.border-radius")) : (this.block.set("style.border-style", "solid"), this.block.isset("style.border-width") || this.block.set("style.border-width", 1), this.block.isset("style.border-color") || this.block.set("style.border-color", "#000000")), this.sync()
        }
    }),
    SL("editor.components.toolbars.groups").BorderSVG = SL.editor.components.toolbars.groups.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "border-svg",
                label: "Border",
                items: [SL.editor.components.toolbars.options.ShapeStrokeWidth, SL.editor.components.toolbars.options.ShapeStrokeColor]
            }, t))
        }, sync: function () {
            this.block.supportsStroke() ? (this.domElement.show(), this.block.hasStroke() ? (this.expand(), this.options.forEach(function (e) {
                e.readFromBlock()
            })) : this.collapse()) : this.domElement.hide()
        }, trigger: function () {
            this.block.toggleStroke(), this.sync()
        }
    }),
    SL("editor.components.toolbars.groups").Link = SL.editor.components.toolbars.groups.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "link",
                label: "link",
                items: [SL.editor.components.toolbars.options.LinkURL]
            }, t))
        }, sync: function () {
            this.block.isLinked() ? this.expand() : this.collapse()
        }, trigger: function () {
            this.block.setLinkURL(this.block.isLinked() ? null : ""), this.sync(), this.isExpanded() && !SL.editor.controllers.Capabilities.isTouchEditor() && this.options && this.options[0] && "function" == typeof this.options[0].focus && setTimeout(function () {
                this.options[0].focus()
            }.bind(this), 200)
        }
    }),

// toolbars.options
    SL("editor.components.toolbars.options").Base = Class.extend({
        init: function (e, t) {
            this.block = e, this.config = t || {}, this.property = this.getPropertySettings(), this.render(), this.bind()
        }, render: function () {
            if (this.domElement = $('<div class="toolbar-option">'), this.config.type && this.domElement.attr("data-option-type", this.config.type), this.config.tooltip && this.domElement.attr({
                    "data-tooltip": this.config.tooltip,
                    "data-tooltip-delay": 1e3,
                    "data-tooltip-maxwidth": 200
                }), this.config.label && (this.domElement.append('<h4 class="toolbar-option-label">' + this.config.label + "</h4>"), this.config.helpTooltip)) {
                var e;
                e = $(this.config.helpTooltipLink ? '<a class="toolbar-option-help" href="' + this.config.helpTooltipLink + '" target="_blank">' : '<div class="toolbar-option-help">'), e.attr({
                    "data-tooltip": this.config.helpTooltip,
                    "data-tooltip-alignment": "r",
                    "data-tooltip-maxwidth": 240
                }), e.html("?"), e.appendTo(this.domElement.find(".toolbar-option-label"))
            }
        }, bind: function () {
            this.config.shortcut && Mousetrap.bind(this.config.shortcut, function (e) {
                e.preventDefault(), this.trigger()
            }.bind(this)), this.domElement.on("vclick", this.onClicked.bind(this))
        }, appendTo: function (e) {
            this.domElement.appendTo(e)
        }, destroy: function () {
            this.domElement.remove()
        }, getPropertySettings: function () {
            return this.block && "string" == typeof this.config.property ? this.block.getPropertySettings(this.config.property) : null
        }, onClicked: function (e) {
            $(e.target).is(".toolbar-option-help") || e.preventDefault()
        }
    }),
    SL("editor.components.toolbars.options").Value = SL.editor.components.toolbars.options.Base.extend({
        init: function (e, t) {
            this._super(e, t), this.changed = new signals.Signal, this.value = this.getDefaultValue()
        }, appendTo: function (e) {
            this._super(e), this.readFromBlock()
        }, readFromBlock: function () {
            this.setValue(this.block.get(this.config.property))
        }, writeToBlock: function () {
            this.block.set(this.config.property, this.getValue())
        }, setValue: function (e, t) {
            this.value = e, t && (this.writeToBlock(), this.changed.dispatch(this.value))
        }, getValue: function () {
            return this.value
        }, getDefaultValue: function () {
            return this.block.getPropertyDefault(this.config.property)
        }, getUnit: function () {
            return this.property.unit ? this.property.unit : ""
        }, destroy: function () {
            this.changed.dispose(), this._super()
        }
    }),
    SL("editor.components.toolbars.options").Button = SL.editor.components.toolbars.options.Base.extend({
        init: function (e, t) {
            this._super(e, t)
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-button"), (this.config.title || this.config.icon) && (this.domElement.addClass("has-title"), this.titleElement = $('<div class="toolbar-option-title vcenter">').appendTo(this.domElement), this.config.title ? this.titleElement.html('<span class="title vcenter-target">' + this.config.title + "</span>") : this.config.icon && (this.domElement.addClass("is-icon"), this.titleElement.html('<span class="icon i-' + this.config.icon + ' vcenter-target"></span>'), this.config.activeIcon && (this.domElement.addClass("has-active-state"), this.activeElement = $('<div class="toolbar-option-title vcenter active">').appendTo(this.domElement), this.activeElement.html('<span class="icon i-' + this.config.activeIcon + ' vcenter-target"></span>'))))
        }
    }),
    SL("editor.components.toolbars.options").Checkbox = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "checkbox"}, t))
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-checkbox"), this.checkboxElement = $('<span class="checkbox icon i-checkmark">'), this.checkboxElement.appendTo(this.domElement)
        }, setValue: function (e, t) {
            this.domElement.toggleClass("checked", e), this._super(e, t)
        }, getValue: function () {
            return this.domElement.hasClass("checked")
        }, onClicked: function (e) {
            this._super(e), this.setValue(!this.getValue(), !0)
        }
    }),
    SL("editor.components.toolbars.options").Color = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "color", alpha: !1}, t))
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-color"), this.triggerElement = $('<div class="toolbar-color-trigger">'), this.triggerElement.appendTo(this.domElement), this.triggerInnerElement = $('<div class="toolbar-color-trigger-inner">'), this.triggerInnerElement.appendTo(this.triggerElement), this.resetElement = $('<div class="toolbar-color-reset icon i-undo" data-tooltip="Use default color" data-tooltip-delay="500">'), this.resetElement.appendTo(this.triggerElement)
        }, bind: function () {
            this._super(), this.triggerInnerElement.on("vclick", this.onTriggerClicked.bind(this)), this.resetElement.on("vclick", this.onResetClicked.bind(this))
        }, readFromBlock: function () {
            this._super(), this.syncTriggerUI()
        }, setValue: function (e, t) {
            this._super(e, t), this.syncTriggerUI()
        }, syncTriggerUI: function () {
            this.triggerElement.toggleClass("transparent", tinycolor(this.value).getAlpha() < 1), this.triggerInnerElement.css("background-color", this.value)
        }, getColorpickerConfig: function () {
            return {
                anchor: this.triggerElement,
                alignment: "r",
                alpha: this.config.alpha,
                color: this.getValue(),
                changeCallback: this.setValue.bind(this),
                resetCallback: this.onResetClicked.bind(this)
            }
        }, onPanelShown: function () {
            this.readFromBlock(), this.domElement.addClass("is-active")
        }, onPanelHidden: function () {
            this.pickerWrapper.spectrum("saveCurrentSelection"), this.domElement.removeClass("is-active")
        }, onTriggerClicked: function () {
            SL.view.colorpicker.toggle(this.getColorpickerConfig())
        }, onResetClicked: function () {
            this.setValue(this.getDefaultValue() || "", !0), this.readFromBlock(), SL.view.colorpicker.hide()
        }, destroy: function () {
            this._super()
        }
    }),
    SL("editor.components.toolbars.options").Multi = SL.editor.components.toolbars.options.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "multi", items: []}, t))
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-multi"), this.domElement.attr("data-number-of-items", this.config.items.length), this.innerElement = $('<div class="toolbar-multi-inner">').appendTo(this.domElement), this.config.items.forEach(function (e) {
                var t = $(['<div class="toolbar-multi-item" data-value="' + e.value + '">', e.icon ? '<span class="icon i-' + e.icon + '"></span>' : e.title, "</div>"].join(""));
                e.tooltip && t.attr("data-tooltip", e.tooltip), t.appendTo(this.innerElement)
            }.bind(this))
        }, bind: function () {
            this._super(), this.domElement.find(".toolbar-multi-item").on("vclick", this.onListItemClicked.bind(this))
        }, trigger: function () {
        }, onListItemClicked: function (e) {
            var t = $(e.currentTarget).attr("data-value");
            t && this.trigger(t)
        }
    }),
    SL("editor.components.toolbars.options").Radio = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "radio", items: []}, t))
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-radio"), this.domElement.attr("data-number-of-items", this.config.items.length), this.innerElement = $('<div class="toolbar-radio-inner">').appendTo(this.domElement), this.config.items.forEach(function (e) {
                this.innerElement.append(['<div class="toolbar-radio-item" data-value="' + e.value + '">', e.icon ? '<span class="icon i-' + e.icon + '"></span>' : e.title, "</div>"].join(""))
            }.bind(this))
        }, bind: function () {
            this._super(), this.domElement.find(".toolbar-radio-item").on("vclick", this.onListItemClicked.bind(this))
        }, setValue: function (e, t) {
            this.hasValue(e) && (this.domElement.find(".toolbar-radio-item").removeClass("selected"), this.domElement.find('.toolbar-radio-item[data-value="' + e + '"]').first().addClass("selected"), this._super(e, t))
        }, hasValue: function (e) {
            return this.config.items.some(function (t) {
                return t.value === e
            })
        }, onListItemClicked: function (e) {
            var t = $(e.currentTarget).attr("data-value");
            t && this.setValue(t, !0)
        }
    }),
    SL("editor.components.toolbars.options").Range = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "range"}, t))
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-range"), this.rangeElement = $('<div class="range">'), this.rangeElement.appendTo(this.domElement), this.rangeProgressElement = $('<div class="range-progress">').appendTo(this.rangeElement), this.rangeNumericElement = $('<div class="range-numeric">').appendTo(this.rangeElement)
        }, bind: function () {
            this._super(), this.changed = new signals.Signal, this.onMouseDown = this.onMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.rangeElement.on("vmousedown", this.onMouseDown)
        }, setValue: function (e, t) {
            e = Math.max(Math.min(e, this.property.maxValue), this.property.minValue), this.rangeProgressElement.css("width", this.valueToPercent(e) + "%"), this._super(e, t), this.rangeNumericElement.text(this.getValue().toFixed(this.property.decimals) + this.getUnit())
        }, getValue: function () {
            var e = this.percentToValue(parseInt(this.rangeProgressElement.get(0).style.width, 10)), t = Math.pow(10, this.property.decimals);
            return Math.round(e * t) / t
        }, valueToPercent: function (e) {
            var t = (e - this.property.minValue) / (this.property.maxValue - this.property.minValue) * 100;
            return Math.max(Math.min(t, 100), 0)
        }, percentToValue: function (e) {
            return this.property.minValue + e / 100 * (this.property.maxValue - this.property.minValue)
        }, onMouseDown: function (e) {
            e.preventDefault(), $(document).on("vmousemove", this.onMouseMove), $(document).on("vmouseup", this.onMouseUp), this.onMouseMove(e), this.rangeElement.addClass("is-scrubbing")
        }, onMouseMove: function (e) {
            var t = e.clientX - this.rangeElement.offset().left;
            this.setValue(this.percentToValue(t / this.rangeElement.width() * 100), !0), this.writeToBlock(), this.changed.dispatch(this.getValue())
        }, onMouseUp: function () {
            $(document).off("vmousemove", this.onMouseMove), $(document).off("vmouseup", this.onMouseUp), this.rangeElement.removeClass("is-scrubbing")
        }
    }),
    SL("editor.components.toolbars.options").Select = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "select",
                panelType: "select",
                panelWidth: "auto",
                panelHeight: "auto",
                panelMaxHeight: 300,
                value: 0,
                items: []
            }, t)), this.keySearchString = "", this.keySearchTimeout
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-select"), this.triggerElement = $('<div class="toolbar-select-trigger">'), this.triggerElement.appendTo(this.domElement)
        }, renderPanel: function () {
            this.panel = new SL.editor.components.toolbars.util.Panel({
                type: this.config.panelType,
                anchor: this.triggerElement,
                keydown: this.onKeyDown.bind(this),
                maxHeight: this.config.panelMaxHeight,
                width: this.config.panelWidth,
                height: this.config.panelHeight
            }), this.panel.shown.add(this.onPanelShown.bind(this)), this.config.items.forEach(this.renderItem.bind(this)), this.getListElements().on("vclick", this.onListItemClicked.bind(this))
        }, renderItem: function (e) {
            this.panel.contentElement.append('<div class="toolbar-select-item" data-value="' + e.value + '">' + (e.title || e.value) + "</div>")
        }, setValue: function (e, t) {
            this.hasValue(e) && (this._super(e, t), this.displaySelectedValue(), this.getListElements().removeClass("selected"), this.getListElements().filter('[data-value="' + this.value + '"]').first().addClass("selected")), t && this.panel && this.panel.hide()
        }, hasValue: function (e) {
            return this.config.items.some(function (t) {
                return t.value === e
            })
        }, displaySelectedValue: function () {
            this.triggerElement.text(this.getTitleByValue(this.value))
        }, clearFocus: function () {
            this.getListElements().removeClass("focused")
        }, focusDefault: function () {
            var e = this.getListElements(), t = e.filter(".focused"), i = e.filter(".selected");
            0 === t.length && (i.length ? i.addClass("focused") : e.first().addClass("focused"))
        }, focusItem: function (e) {
            e && e.length && (this.getListElements().removeClass("focused"), e.addClass("focused")), this.scrollIntoView()
        }, focusStep: function (e) {
            this.focusDefault();
            var t = this.getListElements().filter(".focused");
            this.focusItem(0 > e ? t.prev() : t.next()), this.scrollIntoView()
        }, focusByTitle: function (e) {
            var t = this.getListElements().filter(function (t, i) {
                return 0 === i.textContent.toLowerCase().indexOf(e.toLowerCase())
            });
            t.length && this.focusItem(t.first())
        }, scrollIntoView: function () {
            var e = this.getListElements(), t = e.filter(".focused"), i = e.filter(".selected");
            t.length ? SL.util.dom.scrollIntoViewIfNeeded(t.get(0)) : i.length && SL.util.dom.scrollIntoViewIfNeeded(i.get(0))
        }, getTitleByValue: function (e) {
            var t = null;
            return this.config.items.forEach(function (i) {
                i.value === e && (t = i.title)
            }), t
        }, getDefaultValue: function () {
            return this.config.items[0].value
        }, getListElements: function () {
            return this.panel ? this.panel.contentElement.find(".toolbar-select-item") : $()
        }, onListItemClicked: function (e) {
            var t = $(e.currentTarget).attr("data-value");
            t && this.setValue(t, !0)
        }, onPanelShown: function () {
            this.getListElements().removeClass("selected"), this.getListElements().filter('[data-value="' + this.getValue() + '"]').first().addClass("selected"), this.scrollIntoView(), this.clearFocus()
        }, onClicked: function (e) {
            this._super(e), this.panel ? this.panel.toggle() : (this.renderPanel(), this.panel.show())
        }, onKeyDown: function (e) {
            if (38 === e.keyCode || 9 === e.keyCode && e.shiftKey)
                this.focusStep(-1);
            else if (40 === e.keyCode || 9 === e.keyCode)
                this.focusStep(1);
            else if (13 === e.keyCode) {
                var t = this.getListElements().filter(".focused").attr("data-value");
                t && this.setValue(t, !0)
            } else if (27 === e.keyCode)
                this.panel.hide();
            else {
                var i = String.fromCharCode(e.keyCode);
                i.match(/[A-Z0-9#\+]/i) && (clearTimeout(this.keySearchTimeout), this.keySearchTimeout = setTimeout(function () {
                    this.keySearchString = ""
                }.bind(this), 500), this.keySearchString += i, this.focusByTitle(this.keySearchString))
            }
            return !1
        }, destroy: function () {
            this.panel && (this.panel.destroy(), this.panel = null), this._super()
        }
    }),
    SL("editor.components.toolbars.options").Stepper = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "stepper"}, t)), this.valueRange = this.property.maxValue - this.property.minValue, this.valuePerPixel = this.valueRange < 1 ? this.valueRange / 200 : 1, this.changing = !1, this.mouseDownValue = 0, this.mouseDownX = 0
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-stepper"), this.stepperElement = $('<div class="stepper">'), this.stepperElement.appendTo(this.domElement), this.numberInput = $('<input type="text" class="stepper-number">').appendTo(this.stepperElement)
        }, bind: function () {
            this._super(), this.changed = new signals.Signal, this.onMouseDown = this.onMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.stepperElement.on("vmousedown", this.onMouseDown), this.numberInput.on("input", this.onInput.bind(this)), this.numberInput.on("keydown", this.onInputKeyDown.bind(this)), this.numberInput.on("focus", this.onInputFocused.bind(this)), this.numberInput.on("blur", this.onInputBlurred.bind(this))
        }, setValue: function (e, t, i) {
            this.value = Math.max(Math.min(e, this.property.maxValue), this.property.minValue), this.value = this.roundValue(this.value), i || this.numberInput.val(this.value + (this.property.unit ? this.property.unit : "")), this._super(this.value, t)
        }, roundValue: function (e) {
            var t = Math.pow(10, this.property.decimals);
            return Math.round(e * t) / t
        }, isChanging: function () {
            return this.changing
        }, onChangeStart: function () {
            this.changing = !0
        }, onChangeEnd: function () {
            this.changing = !1
        }, onMouseDown: function (e) {
            this.numberInput.is(":focus") || e.preventDefault(), $(document).on("vmousemove", this.onMouseMove), $(document).on("vmouseup", this.onMouseUp), this.mouseDownX = e.clientX, this.mouseDownValue = this.getValue(), this.onChangeStart()
        }, onMouseMove: function (e) {
            this.stepperElement.addClass("is-scrubbing");
            var t = e.clientX - this.mouseDownX;
            this.setValue(this.mouseDownValue + t * this.valuePerPixel, !0), this.writeToBlock(), this.changed.dispatch(this.getValue())
        }, onMouseUp: function (e) {
            $(document).off("vmousemove", this.onMouseMove), $(document).off("vmouseup", this.onMouseUp), this.stepperElement.hasClass("is-scrubbing") === !1 ? this.onClick(e) : this.onChangeEnd(), this.stepperElement.removeClass("is-scrubbing")
        }, onClick: function () {
            this.numberInput.focus()
        }, onInput: function () {
            this.setValue(parseFloat(this.numberInput.val()), !0, !0), this.writeToBlock()
        }, onInputKeyDown: function (e) {
            var t = 0;
            38 === e.keyCode ? t = this.valuePerPixel : 40 === e.keyCode && (t = -this.valuePerPixel), t && (e.shiftKey && (t *= 10), this.setValue(this.getValue() + t, !0), this.writeToBlock(), e.preventDefault())
        }, onInputFocused: function () {
            this.onChangeStart()
        }, onInputBlurred: function () {
            this.onChangeEnd(), this.setValue(this.getValue(), !0)
        }
    }),
    SL("editor.components.toolbars.options").Text = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "text", multiline: !1, expandable: !1, maxlength: 255, placeholder: ""}, t))
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-text"), this.config.multiline ? (this.inputElement = $("<textarea></textarea>"), this.config.expandable && (this.expandElement = $('<div class="expand-button icon i-fullscreen"></div>'), this.expandElement.appendTo(this.domElement))) : this.inputElement = $("<input />"), this.inputElement.attr({
                "class": "toolbar-text-input",
                maxlength: this.config.maxlength,
                placeholder: this.config.placeholder
            }), this.inputElement.appendTo(this.domElement)
        }, bind: function () {
            this._super(), this.inputElement.on("input", this.onInputChange.bind(this)), this.expandElement && this.expandElement.on("vclick", this.onExpandClicked.bind(this))
        }, focus: function () {
            this.inputElement.focus()
        }, expand: function () {
            this.editor || (this.editor = new SL.components.TextEditor({
                type: "code",
                value: this.getValue()
            }), this.editor.saved.add(function (e) {
                this.setValue(e), this.writeToBlock(), this.editor = null
            }.bind(this)), this.editor.canceled.add(function () {
                this.editor = null
            }.bind(this)))
        }, destroy: function () {
            this.editor && (this.editor.destroy(), this.editor = null), this._super()
        }, setValue: function (e) {
            this.inputElement.val(e), this._super(e)
        }, getValue: function () {
            return this.inputElement.val()
        }, onInputChange: function () {
            this.writeToBlock()
        }, onExpandClicked: function () {
            this.expand()
        }
    }),
    SL("editor.components.toolbars.options").Toggle = SL.editor.components.toolbars.options.Value.extend({
        init: function (e, t) {
            this._super(e, t)
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-toggle")
        }, bind: function () {
            this._super()
        }, setValue: function (e, t) {
            this.domElement.attr("data-value", e), this._super(e, t)
        }, onClicked: function (e) {
            e.preventDefault(), this.setValue(!this.getValue(), !0)
        }
    }),
    SL("editor.components.toolbars.options").Back = SL.editor.components.toolbars.options.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "back", icon: "arrow-up", tooltip: "Go back"}, t))
        }, onClicked: function (e) {
            this._super(e), SL.view.toolbars.pop()
        }
    }),
    SL("editor.components.toolbars.options").BackgroundColor = SL.editor.components.toolbars.options.Color.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "background-color",
                label: "Background Color",
                property: "style.background-color",
                alpha: !0
            }, t))
        }, getColorpickerConfig: function () {
            var e = this._super.apply(this, arguments), t = tinycolor(this.getValue()).toRgb();
            return 0 === t.r && 0 === t.g && 0 === t.b && 0 === t.a && (e.color = "#000000"), e
        }
    }),
    SL("editor.components.toolbars.options").BlockActions = SL.editor.components.toolbars.options.Multi.extend({
        init: function (e, t) {
            var i = [{value: "duplicate", icon: "new-window", tooltip: "Duplicate"}, {
                value: "delete",
                icon: "trash-fill",
                tooltip: "Delete"
            }];
            e && e.options.horizontalResizing && e.options.verticalResizing && i.unshift({
                value: "expand",
                icon: "fullscreen",
                tooltip: "Maximize"
            }), e && e.hasPlugin(SL.editor.blocks.plugin.HTML) && i.unshift({
                value: "html",
                icon: "file-xml",
                tooltip: "Edit HTML"
            }), this._super(e, $.extend({type: "block-actions", label: "Actions", items: i}, t))
        }, trigger: function (e) {
            var t = SL.editor.controllers.Blocks.getFocusedBlocks();
            "html" === e ? (t[0].editHTML(), SL.analytics.trackEditor("Toolbar: Edit HTML")) : "expand" === e ? (t.forEach(function (e) {
                e.resize({width: SL.config.SLIDE_WIDTH, height: SL.config.SLIDE_HEIGHT}), e.moveToCenter()
            }), SL.analytics.trackEditor("Toolbar: Expand block")) : "duplicate" === e ? (SL.editor.controllers.Blocks.copy(), SL.editor.controllers.Blocks.paste(), SL.analytics.trackEditor("Toolbar: Duplicate block")) : "delete" === e && (t.forEach(function (e) {
                e.destroy()
            }), SL.analytics.trackEditor("Toolbar: Delete block"))
        }
    }),
    SL("editor.components.toolbars.options").BlockAlignHorizontal = SL.editor.components.toolbars.options.Multi.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "block-align-horizontal",
                label: "Alignment",
                items: [{value: "left", icon: "alignleftedges"}, {
                    value: "horizontal-center",
                    icon: "alignhorizontalcenters"
                }, {value: "right", icon: "alignrightedges"}]
            }, t))
        }, trigger: function (e) {
            this._super(e), SL.editor.controllers.Blocks.align(SL.editor.controllers.Blocks.getFocusedBlocks(), e)
        }
    }),
    SL("editor.components.toolbars.options").BlockAlignVertical = SL.editor.components.toolbars.options.Multi.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "block-align-vertical",
                items: [{value: "top", icon: "aligntopedges"}, {
                    value: "vertical-center",
                    icon: "alignverticalcenters"
                }, {value: "bottom", icon: "alignbottomedges"}]
            }, t))
        }, trigger: function (e) {
            this._super(e), SL.editor.controllers.Blocks.align(SL.editor.controllers.Blocks.getFocusedBlocks(), e)
        }
    }),
    SL("editor.components.toolbars.options").BlockDepth = SL.editor.components.toolbars.options.Multi.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "block-depth",
                label: "Depth",
                items: [{value: "back", icon: "arrow-down", tooltip: "Move to back"}, {
                    value: "front",
                    icon: "arrow-up",
                    tooltip: "Move to front"
                }]
            }, t))
        }, trigger: function (e) {
            "front" === e ? SL.editor.controllers.Blocks.moveBlocksToDepth(SL.editor.controllers.Blocks.getFocusedBlocks(), 1e4) : "back" === e && SL.editor.controllers.Blocks.moveBlocksToDepth(SL.editor.controllers.Blocks.getFocusedBlocks(), 0)
        }
    }),
    SL("editor.components.toolbars.options").BorderColor = SL.editor.components.toolbars.options.Color.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "border-color", label: "Color", property: "style.border-color"}, t))
        }
    }),
    SL("editor.components.toolbars.options").BorderRadius = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "border-radius", label: "Radius", property: "style.border-radius"}, t))
        }
    }),
    SL("editor.components.toolbars.options").BorderStyle = SL.editor.components.toolbars.options.Select.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "border-style",
                label: "Style",
                property: "style.border-style",
                items: e.getPropertySettings("style.border-style").options
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").BorderWidth = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "border-width", label: "Width", property: "style.border-width"}, t))
        }
    }),
    SL("editor.components.toolbars.options").ClassName = SL.editor.components.toolbars.options.Text.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "class-name",
                label: "Class name",
                property: "attribute.class",
                helpTooltip: "Adds a class name to the underlying HTML element. Useful when trying to target elements with custom CSS."
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").CodeLanguage = SL.editor.components.toolbars.options.Select.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "code-language",
                label: "Language",
                property: "code.language",
                items: e.getPropertySettings("code.language").options,
                panelMaxHeight: 400
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").Code = SL.editor.components.toolbars.options.Text.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "code",
                label: "Code",
                property: "code.value",
                placeholder: "Paste code to syntax highlight...",
                multiline: !0,
                expandable: !0,
                maxlength: 1e7
            }, t))
        }, bind: function () {
            this._super(), this.block && (this.onEditingRequested = this.onEditingRequested.bind(this), this.block.editingRequested.add(this.onEditingRequested))
        }, destroy: function () {
            this.block && this.block.editingRequested.remove(this.onEditingRequested), this._super()
        }, onEditingRequested: function () {
            this.expand()
        }
    }),
    SL("editor.components.toolbars.options").Divider = SL.editor.components.toolbars.options.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "divider"}, t)), this.domElement.addClass("toolbar-divider")
        }
    }),
    SL("editor.components.toolbars.options").HTML = SL.editor.components.toolbars.options.Button.extend({
        init: function (e, t) {
            this._super(e, $.extend({title: "Edit HTML", property: "html.value"}, t))
        }, onClicked: function (e) {
            this._super(e), this.block.editHTML()
        }
    }),
    SL("editor.components.toolbars.options").IframeSRC = SL.editor.components.toolbars.options.Text.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "iframe-src",
                label: "Iframe Source",
                property: "iframe.src",
                placeholder: "URL or <iframe>...",
                multiline: !0,
                maxlength: 2e3
            }, t))
        }, bind: function () {
            this._super(), this.block && (this.onEditingRequested = this.onEditingRequested.bind(this), this.block.editingRequested.add(this.onEditingRequested))
        }, destroy: function () {
            this.block && this.block.editingRequested.remove(this.onEditingRequested), this._super()
        }, writeToBlock: function () {
            var e = this.getValue().trim();
            SL.util.string.URL_REGEX.test(e) ? this.block.set(this.config.property, e) : this.block.set(this.config.property, "")
        }, onInputChange: function () {
            var e = this.getValue();
            if (/<iframe/gi.test(e))
                try {
                    this.setValue($(e).attr("src"))
                } catch (t) {
                }
            this.writeToBlock()
        }, onEditingRequested: function () {
            this.focus()
        }
    }),
    SL("editor.components.toolbars.options").Image = SL.editor.components.toolbars.options.Base.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "image", labe: "Image"}, t)), this.syncUI()
        }, render: function () {
            this._super(), this.domElement.addClass("toolbar-image"), this.innerElement = $('<div class="toolbar-image-inner">').appendTo(this.domElement), this.placeholderElement = $('<div class="toolbar-image-placeholder">').appendTo(this.innerElement), this.labelElement = $('<div class="toolbar-image-label">Upload</div>').appendTo(this.innerElement), this.urlElement = $('<div class="toolbar-image-url icon i-link"></div>').appendTo(this.innerElement), this.spinnerElement = $(['<div class="toolbar-image-progress">', '<span class="spinner centered"></span>', "</div>"].join("")).appendTo(this.innerElement), this.renderFileInput()
        }, renderFileInput: function () {
            this.fileInput && this.fileInput.remove(), this.fileInput = $('<input class="toolbar-image-input" type="file">'), this.fileInput.on("change", this.onFileInputChange.bind(this)), this.fileInput.appendTo(this.innerElement), SL.editor.controllers.Capabilities.isTouchEditor() && this.fileInput.on("touchstart", function (e) {
                e.preventDefault(), $(e.target).click()
            })
        }, bind: function () {
            this._super(), this.block.uploadStateChanged.add(this.syncUI.bind(this)), this.urlElement.on("vclick", this.onEditURLClicked.bind(this))
        }, syncUI: function () {
            if (this.block.hasImage()) {
                var e = this.block.get("image.src");
                this.innerElement.css("background-image", "url(" + e + ")", ""), this.placeholderElement.hide(), this.urlElement.toggle(0 !== e.search(SL.config.S3_HOST))
            } else
                this.innerElement.css("background-image", ""), this.placeholderElement.show(), this.urlElement.show();
            this.block.isUploading() ? (this.spinnerElement.show(), SL.util.html.generateSpinners()) : this.spinnerElement.hide()
        }, onFileInputChange: function () {
            var e = this.fileInput.get(0).files[0];
            e && this.block.upload(e)
        }, onClicked: function () {
        }, onEditURLClicked: function (e) {
            e.preventDefault();
            var t = SL.prompt({
                anchor: this.urlElement,
                title: "Image URL",
                type: "input",
                confirmLabel: "Save",
                alignment: "r",
                data: {value: this.block.get("image.src"), placeholder: "http://...", width: 400}
            });
            t.confirmed.add(function (e) {
                this.block.set("image.src", e), this.syncUI()
            }.bind(this))
        }
    }),
    SL("editor.components.toolbars.options").LineHeight = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "line-height", label: "Line Height", property: "style.line-height"}, t))
        }
    }),
    SL("editor.components.toolbars.options").LinkURL = SL.editor.components.toolbars.options.Text.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "link-url", property: "link.href", placeholder: "http://"}, t))
        }, writeToBlock: function () {
            var e = this.getValue().trim();
            SL.util.string.URL_REGEX.test(e) || /^#\/\d/.test(e) ? this.block.set(this.config.property, e) : this.block.set(this.config.property, "")
        }
    }),
    SL("editor.components.toolbars.options").MathColor = SL.editor.components.toolbars.options.Color.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "math-color", label: "Color", property: "style.color"}, t))
        }
    }),
    SL("editor.components.toolbars.options").MathInput = SL.editor.components.toolbars.options.Text.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "math",
                label: 'Math <span style="text-transform: none;">(TeX)</span>',
                property: "math.value",
                placeholder: "Paste or type TeX...",
                helpTooltip: "This block is used to display math formulae. Math is written using TeX. Click for more info.",
                helpTooltipLink: "http://help.slides.com/knowledgebase/articles/446424",
                multiline: !0,
                expandable: !0,
                maxlength: 1e7
            }, t))
        }, bind: function () {
            this._super(), this.block && (this.onEditingRequested = this.onEditingRequested.bind(this), this.block.editingRequested.add(this.onEditingRequested))
        }, destroy: function () {
            this.block && this.block.editingRequested.remove(this.onEditingRequested), this._super()
        }, onEditingRequested: function () {
            this.expand()
        }
    }),
    SL("editor.components.toolbars.options").MathSize = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "text-size", label: "Scale", property: "style.font-size"}, t))
        }, setValue: function () {
            if (this._super.apply(this, arguments), this.measurementsBeforeResize) {
                var e = this.block.measure(), t = this.measurementsBeforeResize.x + (this.measurementsBeforeResize.width - e.width) / 2, i = this.measurementsBeforeResize.y + (this.measurementsBeforeResize.height - e.height) / 2;
                isNaN(t) || isNaN(i) || this.block.move(t, i)
            }
        }, onChangeStart: function () {
            this.measurementsBeforeResize = this.block.measure(), this._super.apply(this, arguments)
        }, onChangeEnd: function () {
            this.measurementsBeforeResize = null, this._super.apply(this, arguments)
        }
    }),
    SL("editor.components.toolbars.options").Opacity = SL.editor.components.toolbars.options.Range.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "opacity", label: "Opacity", property: "style.opacity"}, t))
        }
    }),
    SL("editor.components.toolbars.options").Padding = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "padding", label: "Padding", property: "style.padding"}, t))
        }, syncPaddingHint: function () {
            this.isChanging() ? this.block.showPaddingHint() : this.block.hidePaddingHint()
        }, writeToBlock: function () {
            this._super.apply(this, arguments), this.syncPaddingHint()
        }, onMouseMove: function () {
            this._super.apply(this, arguments), this.syncPaddingHint()
        }, onMouseUp: function () {
            this._super.apply(this, arguments), this.syncPaddingHint()
        }, onInputFocused: function () {
            this._super.apply(this, arguments), this.syncPaddingHint()
        }, onInputBlurred: function () {
            this._super.apply(this, arguments), this.syncPaddingHint()
        }
    }),
    SL("editor.components.toolbars.options").ShapeFillColor = SL.editor.components.toolbars.options.Color.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "shape-fill-color",
                label: "Color",
                property: "attribute.data-shape-fill-color",
                alpha: !0
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").ShapeStretch = SL.editor.components.toolbars.options.Checkbox.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "shape-stretch",
                label: "Stretch to Fill",
                property: "attribute.data-shape-stretch"
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").ShapeStrokeColor = SL.editor.components.toolbars.options.Color.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "shape-stroke-color",
                label: "Color",
                property: "attribute.data-shape-stroke-color"
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").ShapeStrokeWidth = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "shape-stroke-width",
                label: "Width",
                property: "attribute.data-shape-stroke-width"
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").ShapeType = SL.editor.components.toolbars.options.Select.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "shape-type",
                panelType: "shape-type",
                panelWidth: 246,
                panelMaxHeight: 430,
                label: "Shape",
                property: "attribute.data-shape-type",
                items: e.getPropertySettings("attribute.data-shape-type").options
            }, t))
        }, renderPanel: function () {
            this._super.apply(this, arguments), this.renderAttribution()
        }, renderItem: function (e) {
            var t = 32, i = 32, n = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
            n.setAttribute("xmlns", SL.util.svg.NAMESPACE), n.setAttribute("version", "1.1"), n.setAttribute("width", t), n.setAttribute("height", i), n.setAttribute("preserveAspectRatio", "xMidYMid");
            var o = SL.editor.blocks.Shape.shapeFromType(e.value);
            o.setAttribute("fill", "#333333"), n.appendChild(o);
            var r = $('<div class="toolbar-select-item" data-value="' + e.value + '">');
            r.append(n), r.appendTo(this.panel.contentElement);
            var s = SL.util.svg.boundingBox(o);
            n.setAttribute("viewBox", [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" "))
        }, renderAttribution: function () {
            var e = $('<div class="toolbar-select-attribution">');
            e.html('<a href="/about#credits" target="_blank">Icons from IcoMoon</a>'), e.appendTo(this.panel.contentElement)
        }, displaySelectedValue: function () {
            var e = 32, t = 32, i = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
            i.setAttribute("xmlns", SL.util.svg.NAMESPACE), i.setAttribute("version", "1.1"), i.setAttribute("width", e), i.setAttribute("height", t), i.setAttribute("preserveAspectRatio", "xMidYMid");
            var n = SL.editor.blocks.Shape.shapeFromType(this.value, e, t);
            n.setAttribute("fill", "#ffffff"), i.appendChild(n), this.triggerElement.find("svg").remove(), this.triggerElement.append(i);
            var o = SL.util.svg.boundingBox(n);
            i.setAttribute("viewBox", [Math.round(o.x) || 0, Math.round(o.y) || 0, Math.round(o.width) || 32, Math.round(o.height) || 32].join(" "))
        }
    }),
    SL("editor.components.toolbars.options").TextAlign = SL.editor.components.toolbars.options.Radio.extend({
        init: function (e, t) {
            this._super(e, $.extend({
                type: "text-align",
                label: "Text Alignment",
                property: "style.text-align",
                items: e.getPropertySettings("style.text-align").options
            }, t))
        }
    }),
    SL("editor.components.toolbars.options").TextColor = SL.editor.components.toolbars.options.Color.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "text-color", label: "Text Color", property: "style.color"}, t))
        }
    }),
    SL("editor.components.toolbars.options").TextSize = SL.editor.components.toolbars.options.Stepper.extend({
        init: function (e, t) {
            this._super(e, $.extend({type: "text-size", label: "Text Scale", property: "style.font-size"}, t))
        }
    }),

// utils

    SL("editor.components.toolbars.util").Panel = Class.extend({
        init: function (e) {
            this.options = $.extend({
                width: "auto",
                height: "auto",
                maxHeight: "none",
                keydown: !1,
                offsetX: 0,
                offsetY: 0
            }, e), this.render(), this.bind(), SL.editor.components.toolbars.util.Panel.INSTANCES.push(this)
        }, render: function () {
            this.domElement = $('<div class="toolbar-panel">'), this.contentElement = $('<div class="toolbar-panel-content">').appendTo(this.domElement), this.arrowElement = $('<div class="toolbar-panel-arrow">').appendTo(this.domElement), this.contentElement.css({
                width: this.options.width,
                height: this.options.height,
                maxHeight: this.options.maxHeight
            }), this.domElement.attr("data-anchor-alignment", this.options.anchorAlignment), "string" == typeof this.options.type && this.domElement.attr("data-panel-type", this.options.type), "number" == typeof this.options.height && this.domElement.css("overflow", "auto")
        }, bind: function () {
            this.shown = new signals.Signal, this.hidden = new signals.Signal, this.isVisible = this.isVisible.bind(this), this.onDocumentClick = this.onDocumentClick.bind(this)
        }, show: function () {
            SL.editor.components.toolbars.util.Panel.INSTANCES.forEach(function (e) {
                e !== this && e.isVisible() && e.hide()
            }), this.domElement.appendTo(SL.view.toolbars.domElement), this.layout(), this.shown.dispatch(), "function" == typeof this.options.keydown && SL.keyboard.keydown(this.options.keydown), $(document).on("click", this.onDocumentClick)
        }, hide: function () {
            this.domElement.detach(), this.hidden.dispatch(), SL.keyboard.release(this.options.keydown)
        }, toggle: function () {
            this.isVisible() ? this.hide() : this.show()
        }, isVisible: function () {
            return this.domElement.parent().length > 0
        }, layout: function () {
            if (this.options.anchor && "auto" === this.options.width && this.domElement.width(this.options.anchor.outerWidth()), this.options.anchor) {
                var e = this.options.anchor.offset(), t = this.options.anchor.outerWidth(), i = this.options.anchor.outerHeight(), n = 6, o = e.left - this.domElement.parent().offset().left + this.options.offsetX + t, r = e.top + this.options.offsetY;
                r = Math.max(r, n), r = Math.min(r, window.innerHeight - this.domElement.outerHeight() - n);
                var s = e.top - r + i / 2;
                this.domElement.css({left: o, top: r}), this.arrowElement.css({top: s})
            }
        }, getContentElement: function () {
            return this.contentElement
        }, onDocumentClick: function (e) {
            var t = $(e.target);
            0 === t.closest(this.options.anchor).length && 0 === t.closest(this.domElement).length && this.hide()
        }, destroy: function () {
            $(document).off("click", this.onDocumentClick);
            for (var e = 0; e < SL.editor.components.toolbars.util.Panel.INSTANCES.length; e++)
                SL.editor.components.toolbars.util.Panel.INSTANCES[e] === this && SL.editor.components.toolbars.util.Panel.INSTANCES.splice(e, 1);
            SL.keyboard.release(this.options.keydown), this.shown.dispose(), this.hidden.dispose(), this.domElement.remove()
        }
    }),
    SL.editor.components.toolbars.util.Panel.INSTANCES = [],


// Editor Controllers     
    SL("editor.controllers").API = {
        forkDeck: function () {
            SL.helpers.PageLoader.show("Duplicating..."), $.ajax({
                type: "POST",
                url: SL.config.AJAX_FORK_DECK(SLConfig.deck.id),
                context: this
            }).done(function (e) {
                e && e.deck && "string" == typeof e.deck.slug ? window.location = SL.routes.DECK_EDIT(SL.current_user.get("username"), e.deck.slug) : (SL.helpers.PageLoader.hide(), SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"))
            }).fail(function () {
                SL.helpers.PageLoader.hide(), SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
            })
        }, deleteDeck: function () {
            SL.prompt({
                title: "Are you sure you want to delete this deck?<br>This cannot be undone.",
                type: "select",
                data: [{html: "<h3>Cancel</h3>"}, {
                    html: "<h3>Delete</h3>", selected: !0, className: "negative", callback: function () {
                        SL.helpers.PageLoader.show("Deleting..."), $.ajax({
                            type: "DELETE",
                            url: SL.config.AJAX_UPDATE_DECK(SLConfig.deck.id),
                            data: {},
                            context: this
                        }).done(function () {
                            window.location = SL.current_user.getProfileURL()
                        }).fail(function () {
                            SL.notify(SL.locale.get("DECK_DELETE_ERROR"), "negative"), SL.helpers.PageLoader.hide()
                        })
                    }.bind(this)
                }]
            })
        }
    },
    SL("editor.controllers").Blocks = {
        init: function (e) {
            this.editor = e, this.clipboard = [], this.clipboardAction = null, this.focusChanged = new signals.Signal, this.bind()
        }, bind: function () {
            this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this), this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this), this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), this.onTextEditingTouchMove = this.onTextEditingTouchMove.bind(this), this.onTextEditingTouchEnd = this.onTextEditingTouchEnd.bind(this), $(document).on("vmousedown", this.onDocumentMouseDown), $(document).on("keydown", this.onDocumentKeyDown)
        }, sync: function (e) {
            $(e || Reveal.getCurrentSlide()).find(".sl-block").each(function (e, t) {
                var i = $(t);
                i.data("block-instance") || this.add({type: i.attr("data-block-type"), element: i})
            }.bind(this))
        }, add: function (e) {
            "undefined" == typeof e.slide && (e.slide = Reveal.getCurrentSlide()), "undefined" == typeof e.silent && (e.silent = !1), "undefined" == typeof e.center && (e.center = !0);
            var t = SL.config.BLOCKS.getByProperties({type: e.type});
            if (t) {
                var i;
                return e.element ? (i = new SL.editor.blocks[t.factory]({element: e.element}), e.element.data("block-instance", i), 0 === e.element.parent().length && i.appendTo(e.slide)) : (i = new SL.editor.blocks[t.factory](e.blockOptions), i.appendTo(e.slide), i.setDefaults(), e.afterInit && "function" == typeof e.afterInit && e.afterInit(i), e.width && i.resize({width: e.width}), e.height && i.resize({height: e.height}), this.place(i, {
                    skipIntro: e.silent,
                    center: e.center
                }), ("number" == typeof e.x || "number" == typeof e.y) && i.move(e.x, e.y), e.silent || SL.editor.controllers.Blocks.focus(i)), i.hasID() === !1 && i.setID(this.generateID(i)), i.removed.add(function () {
                    i.isFocused() && SL.editor.controllers.Blocks.blur()
                }), i
            }
        }, generateID: function (e) {
            return this.uniqueBlockCount = this.uniqueBlockCount ? this.uniqueBlockCount + 1 : 1, CryptoJS.MD5("block-" + e.type + "-" + this.uniqueBlockCount + "-" + Date.now() + "-" + Math.round(1e9 * Math.random())).toString()
        }, place: function (e, t) {
            t = t || {}, SL.editor.controllers.Blocks.moveBlocksToDepth([e], Number.MAX_VALUE), t.center && e.moveToCenter(), t.skipIntro || e.runIntro()
        }, focus: function (e, t, i) {
            "undefined" == typeof t && (t = !1), "undefined" == typeof i && (i = !0), e && e.nodeName && (e = $(e).data("block-instance")), e && "function" == typeof e.focus && (t ? e.isFocused() ? e.isFocused() && i && e.blur() : e.focus() : e.isFocused() || (this.blur(), e.focus()), this.afterFocusChange())
        }, blur: function (e) {
            (e || this.getFocusedBlocks()).forEach(function (e) {
                e.blur()
            }), this.afterFocusChange()
        }, blurBlocksBySlide: function (e) {
            $(e).find(".sl-block").each(function () {
                var e = $(this).data("block-instance");
                e && e.blur()
            }), this.afterFocusChange()
        }, afterFocusChange: function () {
            var e = this.getFocusedBlocks();
            1 === e.length && e[0].getToolbarOptions().length ? this.editor.toolbars.get().block !== e[0] && this.editor.toolbars.push(new SL.editor.components.toolbars.Edit(e[0])) : e.length > 1 ? this.editor.toolbars.get() instanceof SL.editor.components.toolbars.EditMultiple || (this.editor.toolbars.clear(), this.editor.toolbars.push(new SL.editor.components.toolbars.EditMultiple)) : this.editor.toolbars.clear(), this.focusChanged.dispatch()
        }, afterBlockTextInput: function () {
            $(".reveal-viewport").scrollLeft(0).scrollTop(0)
        }, copy: function () {
            this.clipboardAction = "copy";
            var e = this.getFocusedBlocks();
            e.length && (this.clipboard.length = 0, e.forEach(function (e) {
                this.clipboard.push({block: e, measurements: e.measure()})
            }.bind(this)), SL.analytics.trackEditor("Copy block"))
        }, cut: function () {
            this.clipboardAction = "cut";
            var e = this.getFocusedBlocks();
            e.length && (this.clipboard.length = 0, e.forEach(function (e) {
                this.clipboard.push({block: e, measurements: e.measure()}), e.blur(), e.detach()
            }.bind(this)), SL.editor.controllers.Blocks.blur(), SL.analytics.trackEditor("Cut block"))
        }, paste: function () {
            var e = $(Reveal.getCurrentSlide()), t = 15;
            if (this.clipboard.length && e.length) {
                this.blur();
                var i = [];
                this.clipboard.forEach(function (e) {
                    var n = e.block.domElement.clone(), o = JSON.parse(JSON.stringify(e.measurements));
                    if (n.removeAttr("data-block-id"), n.find(">.editing-ui").remove(), "copy" === this.clipboardAction)
                        for (; this.getBlocksByMeasurements(o).length;)
                            o.x += t, o.y += t, o.right && (o.right += t), o.bottom && (o.bottom += t);
                    var r = this.add({type: n.attr("data-block-type"), element: n});
                    r.move(o.x, o.y), this.focus(r, !0), i.push(r)
                }.bind(this)), i.sort(function (e, t) {
                    return e.get("style.z-index") - t.get("style.z-index")
                }), i.forEach(function (e) {
                    SL.editor.controllers.Blocks.moveBlocksToDepth([e], Number.MAX_VALUE)
                }), SL.analytics.trackEditor("Paste block")
            }
        }, getClipboard: function () {
            return this.clipboard
        }, align: function (e, t) {
            var i = this.getCombinedBounds(e);
            "left" === t ? e.forEach(function (e) {
                e.move(i.x)
            }) : "horizontal-center" === t ? e.forEach(function (e) {
                e.move(i.x + (i.width - e.measure().width) / 2)
            }) : "right" === t ? e.forEach(function (e) {
                e.move(i.right - e.measure().width)
            }) : "top" === t ? e.forEach(function (e) {
                e.move(null, i.y)
            }) : "vertical-center" === t ? e.forEach(function (e) {
                e.move(null, i.y + (i.height - e.measure().height) / 2)
            }) : "bottom" === t && e.forEach(function (e) {
                e.move(null, i.bottom - e.measure().height)
            })
        }, discoverBlockPairs: function () {
            var e = this.getCurrentBlocks(), t = SL.editor.controllers.Blocks.getAdjacentBlocks(e);
            e.forEach(function (e) {
                e.unpair()
            }), t.forEach(function (e) {
                "bottom" !== e.relationship || "text" !== e.blockA.type && "html" !== e.blockA.type || e.blockA.pair(e.blockB, "bottom")
            })
        }, moveBlocksToDepth: function (e, t) {
            var i = this.getCurrentBlocks();
            i.sort(function (e, t) {
                return e.get("style.z-index") - t.get("style.z-index")
            });
            var n = 10;
            t = Math.min(Math.max(t, 0), i.length + n), i.forEach(function (e) {
                n === t && (n += 1), e.set("style.z-index", n), n += 1
            }), e.forEach(function (e) {
                e.set("style.z-index", t)
            })
        }, getCombinedBounds: function (e) {
            var t = {y: Number.MAX_VALUE, right: 0, bottom: 0, x: Number.MAX_VALUE};
            return e.forEach(function (e) {
                var i = e.measure();
                t.x = Math.min(t.x, i.x), t.y = Math.min(t.y, i.y), t.right = Math.max(t.right, i.right), t.bottom = Math.max(t.bottom, i.bottom)
            }.bind(this)), t.width = t.right - t.x, t.height = t.bottom - t.y, t
        }, getFocusedBlocks: function () {
            var e = [];
            return this.getCurrentBlocks().forEach(function (t) {
                t.isFocused() && e.push(t)
            }), e
        }, getCurrentBlocks: function () {
            SL.editor.controllers.Blocks.sync();
            var e = [];
            return $(Reveal.getCurrentSlide()).find(".sl-block").each(function () {
                var t = $(this).data("block-instance");
                t && e.push(t)
            }), e
        }, getBlocksByMeasurements: function (e) {
            var t = [];
            return this.getCurrentBlocks().forEach(function (i) {
                var n = i.measure(), o = !0;
                for (var r in e)
                    e.hasOwnProperty(r) && e[r] !== n[r] && (o = !1);
                o && t.push(i)
            }), t
        }, getAdjacentBlocks: function (e) {
            var t = [], e = e || this.getCurrentBlocks();
            return e.forEach(function (i) {
                t = t.concat(SL.editor.controllers.Blocks.getAdjacentBlocksTo(i, e))
            }), t
        }, getAdjacentBlocksTo: function (e, t) {
            var i = 4, n = [], t = t || this.getCurrentBlocks(), o = e.measure();
            return t.forEach(function (t) {
                var r = t.measure(), s = SL.util.trig.intersection(o, r);
                s.height > 0 && (Math.abs(o.x - r.right) < i ? n.push({
                    relationship: "left",
                    blockA: e,
                    blockB: t
                }) : Math.abs(o.right - r.x) < i && n.push({
                    relationship: "right",
                    blockA: e,
                    blockB: t
                })), s.width > 0 && (Math.abs(o.y - r.bottom) < i ? n.push({
                    relationship: "top",
                    blockA: e,
                    blockB: t
                }) : Math.abs(o.bottom - r.y) < i && n.push({relationship: "bottom", blockA: e, blockB: t}))
            }), n
        }, onDocumentMouseDown: function (e) {
            if (SL.view.isEditing() === !1)
                return !0;
            var t = $(e.target).closest(".reveal").length > 0;
            if (isRevealControls = $(e.target).closest(".reveal .controls").length > 0, isBlock = $(e.target).closest(".sl-block").length > 0, isToolbar = $(e.target).closest(".toolbars").length > 0, !t || isBlock || isRevealControls)
                isToolbar && this.getFocusedBlocks().forEach(function (e) {
                    "function" == typeof e.disableEditing && e.disableEditing()
                });
            else {
                if (SL.editor.controllers.Capabilities.isTouchEditor()) {
                    var i = this.getFocusedBlocks().some(function (e) {
                        return e.isEditingText()
                    });
                    if (i)
                        return this.touchMouseStart = {
                            x: e.clientX,
                            y: e.clientY
                        }, this.touchMouseMoved = !1, $(document).on("vmousemove", this.onTextEditingTouchMove), $(document).on("vmouseup", this.onTextEditingTouchEnd), !0
                }
                e.shiftKey || (SL.editor.controllers.Blocks.blur(), $(document.activeElement).blur()), e.preventDefault(), SL.editor.controllers.Selection.start(e.clientX, e.clientY), $(document).on("vmousemove", this.onDocumentMouseMove), $(document).on("vmouseup", this.onDocumentMouseUp)
            }
        }, onDocumentMouseMove: function (e) {
            SL.editor.controllers.Selection.sync(e.clientX, e.clientY)
        }, onDocumentMouseUp: function () {
            SL.editor.controllers.Selection.stop(), $(document).off("vmousemove", this.onDocumentMouseMove), $(document).off("vmouseup", this.onDocumentMouseUp)
        }, onTextEditingTouchMove: function (e) {
            (e.clientX !== this.touchMouseStart.x || e.clientY !== this.touchMouseStart.y) && (this.touchMouseMoved = !0)
        }, onTextEditingTouchEnd: function () {
            this.touchMouseMoved || SL.editor.controllers.Blocks.blur(), $(document).off("vmousemove", this.onTextEditingTouchMove), $(document).off("vmouseup", this.onTextEditingTouchEnd)
        }, onDocumentKeyDown: function (e) {
            if (SL.view.isEditing() === !1)
                return !0;
            if (SL.util.isTypingEvent(e))
                return !0;
            var t = this.editor.sidebar.isExpanded();
            if (!t) {
                var i = e.metaKey || e.ctrlKey, n = this.getFocusedBlocks();
                if (37 === e.keyCode || 38 === e.keyCode || 39 === e.keyCode || 40 === e.keyCode && n.length) {
                    var o = e.shiftKey ? 10 : 1, r = 0, s = 0;
                    switch (e.keyCode) {
                        case 37:
                            r = -o;
                            break;
                        case 39:
                            r = o;
                            break;
                        case 38:
                            s = -o;
                            break;
                        case 40:
                            s = o
                    }
                    n.forEach(function (e) {
                        e.move(r, s, {isOffset: !0})
                    })
                } else
                    8 !== e.keyCode && 46 !== e.keyCode || !n.length ? i && !e.shiftKey && 65 === e.keyCode ? (this.getCurrentBlocks().forEach(function (e) {
                        SL.editor.controllers.Blocks.focus(e, !0, !1)
                    }), e.preventDefault()) : i && !e.shiftKey && 67 === e.keyCode && n.length ? (SL.editor.controllers.Blocks.copy(), e.preventDefault()) : i && !e.shiftKey && 88 === e.keyCode && n.length ? (SL.editor.controllers.Blocks.cut(), e.preventDefault()) : i && !e.shiftKey && 86 === e.keyCode && SL.editor.controllers.Blocks.getClipboard().length > 0 && (SL.editor.controllers.Blocks.paste(), e.preventDefault()) : (n.forEach(function (e) {
                        e.destroy()
                    }), e.preventDefault())
            }
        }
    },
    SL("editor.controllers").Capabilities = {
        TOUCH_EDITOR: !1, TOUCH_EDITOR_SMALL: !1,
        init: function () {
            return SL.util.device.supportedByEditor() ? (SL.editor.controllers.Capabilities.TOUCH_EDITOR = /ipad|iphone|ipod|android/gi.test(navigator.userAgent) && !!("ontouchstart" in window), SL.editor.controllers.Capabilities.TOUCH_EDITOR_SMALL = SL.editor.controllers.Capabilities.TOUCH_EDITOR && window.innerWidth > 0 && window.innerWidth < 1e3, SL.editor.controllers.Capabilities.TOUCH_EDITOR && ($("html").addClass("touch-editor"), SL.editor.controllers.Capabilities.TOUCH_EDITOR_SMALL && $("html").addClass("touch-editor-small")), !0) : ($(document.body).append('<div class="not-supported"><h2>Not Supported</h2><p>The Slides editor doesn\'t currently support the browser you\'re using. Please consider changing to a different browser, such as <a href="https://www.google.com/chrome">Google Chrome</a> or <a href="https://www.mozilla.org/firefox/">Firefox</a>.</p><a class="skip" href="#">Continue anyway</a></div>'), $(".not-supported .skip").on("click", function () {
                $(".not-supported").remove()
            }), !1)
        }, isTouchEditor: function () {
            return SL.editor.controllers.Capabilities.TOUCH_EDITOR
        }, isTouchEditorSmall: function () {
            return SL.editor.controllers.Capabilities.TOUCH_EDITOR_SMALL
        }
    },
    SL("editor.controllers").Contrast = {
        init: function () {
            this.contrast = -1, this.sync = this.sync.bind(this), this.bind(), this.sync()
        }, bind: function () {
            this.changed = new signals.Signal, Reveal.addEventListener("ready", this.sync), Reveal.addEventListener("slidechanged", function () {
                setTimeout(this.sync, 1)
            }.bind(this))
        }, sync: function () {
            var e = SL.util.deck.getBackgroundContrast();
            e !== this.contrast && (this.contrast = e, $("html").attr("data-deck-contrast", Math.round(10 * e)), this.changed.dispatch(this.contrast))
        }, get: function () {
            return -1 === this.contrast && this.sync(), this.contrast
        }
    },
    SL("editor.controllers").Grid = {
        init: function () {
            this.color = "rgba(150, 150, 150, 0.2)", this.paint = this.paint.bind(this), this.bind(), this.render(), setTimeout(function () {
                SL.editor.controllers.Grid.show()
            }, 1)
        }, render: function () {
            this.domElement = $('<div class="sl-block-grid">'), this.canvasElement = $('<canvas class="sl-block-grid-inner">').appendTo(this.domElement)
        }, bind: function () {
            SL.editor.controllers.Contrast.changed.add(this.onContrastChange.bind(this))
        }, show: function () {
            this.isEnabled() && (this.domElement.appendTo($(".projector .reveal")), this.setContrast(SL.editor.controllers.Contrast.get()), this.paint(), $(window).on("resize", this.paint))
        }, hide: function () {
            this.domElement.remove(), $(window).off("resize", this.paint)
        }, paint: function () {
            var e = SL.util.getRevealSlideBounds(SL.editor.controllers.Markup.getCurrentSlide(), !0), t = e.width, i = e.height, n = this.getRows(), o = this.getCols(), r = Math.round(t / o), s = Math.round(i / n), a = SL.view.getSlideSize({scaled: !0}), l = (window.innerWidth - SL.view.getSidebarWidth() - a.width) / 2, c = (window.innerHeight - a.height) / 2;
            this.canvasElement.css({left: Math.max(l, 10), top: Math.max(c, 10)}), this.canvasElement.attr({
                width: t,
                height: i
            });
            var h = this.canvasElement.get(0).getContext("2d");
            h.clearRect(0, 0, t, i);
            for (var d = 1; o > d; d++)
                h.fillStyle = this.color, h.fillRect(Math.floor(d * r), 0, 1, i);
            for (var u = 1; n > u; u++)
                h.fillStyle = this.color, h.fillRect(0, Math.floor(u * s), t, 1)
        }, refresh: function () {
            this.isEnabled() ? this.show() : this.hide()
        }, getRows: function () {
            return 10
        }, getCols: function () {
            return 12
        }, setContrast: function (e) {
            this.color = .15 > e ? "rgba(255, 255, 255, 0.10)" : .45 > e ? "rgba(255, 255, 255, 0.15)" : .85 > e ? "rgba(255, 255, 255, 0.20)" : "rgba(150, 150, 150, 0.20)"
        }, isEnabled: function () {
            return SL.editor.controllers.Capabilities.isTouchEditor() ? !1 : SL.current_user.settings.get("editor_grid")
        }, onContrastChange: function (e) {
            this.setContrast(e), this.isEnabled() && this.paint()
        }
    },
    SL("editor.controllers").Guides = {
        init: function () {
            this.guides = {h: [], v: []}, this.render()
        }, render: function () {
            this.domElement = $('<div class="sl-block-guides editing-ui">')
        }, start: function (e, t) {
            if (this.isEnabled() !== !1) {
                if (this.slideBounds = SL.view.getSlideSize(), this.slideBounds.x = 0, this.slideBounds.y = 0, this.domElement.appendTo(SL.editor.controllers.Markup.getCurrentSlide()), this.allBlocks = SL.editor.controllers.Blocks.getCurrentBlocks(), this.targetBlocks = e, this.gridLines = [], SL.editor.controllers.Grid.isEnabled()) {
                    for (var i = SL.editor.controllers.Grid.getCols(), n = SL.editor.controllers.Grid.getRows(), o = this.slideBounds.width / i, r = this.slideBounds.height / n, s = 1; i > s; s++)
                        this.gridLines.push(this.getCenterEdge({
                            x: s * o,
                            y: 0,
                            width: 0,
                            height: this.slideBounds.height
                        }, "grid-col-" + s, "horizontal"));
                    for (var a = 1; n > a; a++)
                        this.gridLines.push(this.getCenterEdge({
                            x: 0,
                            y: a * r,
                            width: this.slideBounds.width,
                            height: 0
                        }, "grid-row-" + a, "vertical"))
                }
                var l = SL.editor.controllers.Blocks.getCombinedBounds(this.targetBlocks);
                this.targetBlocks.forEach(function (e) {
                    var t = e.measure();
                    e._guideOffsetX = t.x - l.x, e._guideOffsetY = t.y - l.y
                }), this.options = $.extend({snap: !0, action: "move", threshold: 6}, t)
            }
        }, stop: function () {
            this.domElement.remove(), this.clearGuideElements(), this.targetBlocks = []
        }, sync: function () {
            this.isEnabled() !== !1 && this.targetBlocks.length && (this.options.snap ? (this.findGuides(this.options.threshold), this.enforceGuides(), this.findGuides(1), this.renderGuides()) : (this.findGuides(this.options.threshold), this.renderGuides()))
        }, findGuides: function (e) {
            this.guides.h.length = 0, this.guides.v.length = 0;
            var t = SL.editor.controllers.Blocks.getCombinedBounds(this.targetBlocks), i = this.getEdges(t, "target-bounds", "resize" === this.options.action);
            this.allBlocks.forEach(function (t) {
                -1 === this.targetBlocks.indexOf(t) && this.compageEdges(i, this.getEdges(t.measure(), t.getID()), e)
            }.bind(this)), this.gridLines.forEach(function (t) {
                this.compageEdges(i, t, e)
            }.bind(this)), this.compageEdges(i, this.getEdges(this.slideBounds, "slide-bounds"), e), this.guides.h.sort(function (e, t) {
                return e.distance - t.distance
            }), this.guides.v.sort(function (e, t) {
                return e.distance - t.distance
            })
        }, compageEdges: function (e, t, i) {
            var n;
            e.h.forEach(function (e) {
                t.h.forEach(function (t) {
                    n = Math.abs(e.x - t.x), i > n && this.guides.h.push({distance: n, targetEdge: e, compareEdge: t})
                }.bind(this))
            }.bind(this)), e.v.forEach(function (e) {
                t.v.forEach(function (t) {
                    n = Math.abs(e.y - t.y), i > n && this.guides.v.push({distance: n, targetEdge: e, compareEdge: t})
                }.bind(this))
            }.bind(this))
        }, enforceGuides: function () {
            if ("resize" === this.options.action) {
                var e = this.targetBlocks[0];
                if (e.transform.isResizingCentered())
                    return;
                var t = {n: 0, e: 0, s: 0, w: 0, hc: 0, vc: 0};
                this.guides.h = this.guides.h.filter(function (e) {
                    return 1 === ++t[e.targetEdge.direction]
                }), this.guides.v = this.guides.v.filter(function (e) {
                    return 1 === ++t[e.targetEdge.direction]
                }), this.guides.h.forEach(function (t) {
                    /w|e/.test(this.options.direction) && this.options.direction.indexOf(t.targetEdge.direction) > -1 && (/w/.test(t.targetEdge.direction) ? e.resize({
                        left: t.compareEdge.x,
                        direction: t.targetEdge.direction
                    }) : /e/.test(t.targetEdge.direction) && e.resize({
                        right: t.compareEdge.x,
                        direction: t.targetEdge.direction
                    }))
                }.bind(this)), this.guides.v.forEach(function (t) {
                    /n|s/.test(this.options.direction) && this.options.direction.indexOf(t.targetEdge.direction) > -1 && (/n/.test(t.targetEdge.direction) ? e.resize({
                        top: t.compareEdge.y,
                        direction: t.targetEdge.direction
                    }) : /s/.test(t.targetEdge.direction) && e.resize({
                        bottom: t.compareEdge.y,
                        direction: t.targetEdge.direction
                    }))
                }.bind(this))
            } else
                this.guides.h.splice(1), this.guides.v.splice(1), this.guides.h.forEach(function (e) {
                    this.targetBlocks.forEach(function (t) {
                        t.move(e.compareEdge.x + e.targetEdge.offset + t._guideOffsetX)
                    }.bind(this))
                }.bind(this)), this.guides.v.forEach(function (e) {
                    this.targetBlocks.forEach(function (t) {
                        t.move(null, e.compareEdge.y + e.targetEdge.offset + t._guideOffsetY)
                    }.bind(this))
                }.bind(this))
        }, renderGuides: function () {
            var e = [], t = SL.editor.controllers.Blocks.getCombinedBounds(this.targetBlocks);
            this.guides.h.forEach(function (i) {
                e.push(this.renderGuide(i, t))
            }.bind(this)), this.guides.v.forEach(function (i) {
                e.push(this.renderGuide(i, t))
            }.bind(this)), this.clearGuideElements(e)
        }, renderGuide: function (e, t) {
            var i = e.targetEdge, n = e.compareEdge, o = $('[data-guide-id="' + n.id + '"]');
            0 === o.length && (o = $('<div data-guide-id="' + n.id + '">').appendTo(this.domElement), setTimeout(function () {
                o.addClass("show")
            }, 1));
            var r = {
                top: Math.min(n.bounds.y, t.y),
                right: Math.max(n.bounds.x + n.bounds.width, t.x + t.width),
                bottom: Math.max(n.bounds.y + n.bounds.height, t.y + t.height),
                left: Math.min(n.bounds.x, t.x)
            };
            if ("number" == typeof n.y) {
                var s = "s" === i.direction ? -1 : 0;
                o.addClass("guide-h"), o.css({top: Math.floor(n.y + s), left: r.left, width: r.right - r.left})
            } else {
                var a = "e" === i.direction ? -1 : 0;
                o.addClass("guide-v"), o.css({left: Math.floor(n.x + a), top: r.top, height: r.bottom - r.top})
            }
            return n.id
        }, getEdges: function (e, t, i) {
            var n = {
                h: [{id: t + "-h1", bounds: e, x: e.x, offset: 0, direction: "w"}, {
                    id: t + "-h2",
                    bounds: e,
                    x: e.x + e.width / 2,
                    offset: -e.width / 2,
                    direction: "hc"
                }, {id: t + "-h3", bounds: e, x: e.x + e.width, offset: -e.width, direction: "e"}],
                v: [{id: t + "-v1", bounds: e, y: e.y, offset: 0, direction: "n"}, {
                    id: t + "-v2",
                    bounds: e,
                    y: e.y + e.height / 2,
                    offset: -e.height / 2,
                    direction: "vc"
                }, {id: t + "-v3", bounds: e, y: e.y + e.height, offset: -e.height, direction: "s"}]
            };
            return i === !0 && (n.h.splice(1, 1), n.v.splice(1, 1)), n
        }, getCenterEdge: function (e, t, i) {
            var n = {h: [], v: []};
            return "vertical" === i ? n.v.push({
                id: t + "-v2",
                bounds: e,
                y: e.y + e.height / 2,
                offset: -e.height / 2,
                direction: t
            }) : n.h.push({id: t + "-h2", bounds: e, x: e.x + e.width / 2, offset: -e.width / 2, direction: t}), n
        }, clearGuideElements: function (e) {
            var t = this.domElement.find(".guide-v, .guide-h");
            e && e.length && (t = t.filter(function (t, i) {
                return -1 === e.indexOf(i.getAttribute("data-guide-id"))
            })), t.remove()
        }, isEnabled: function () {
            return SL.editor.controllers.Capabilities.isTouchEditor() ? !0 : SL.current_user.settings.get("editor_snap")
        }
    },
    SL("editor.controllers").History = {
        MAX_SIZE: 100, MAX_FREQUENCY: 1500, MODE_RESTING: 1, MODE_UNDOING: 2, MODE_REDOING: 3,
        init: function () {
            this.past = [], this.future = [], this.mode = SL.editor.controllers.History.MODE_RESTING, this.lastPushTime = -1, this.changed = new signals.Signal, this.undid = new signals.Signal, this.redid = new signals.Signal
        }, push: function (e, t) {
            t = t || {};
            var i = Date.now();
            if (i - this.lastPushTime > SL.editor.controllers.History.MAX_FREQUENCY || t.skipTimeLimit) {
                this.lastPushTime = Date.now();
                var n = {data: e, indices: Reveal.getIndices()};
                n.focusedBlocks = SL.editor.controllers.Blocks.getFocusedBlocks().map(function (e) {
                    return e.getID()
                });
                var o = SL.editor.controllers.Mode.get();
                o && (n.mode = o.id);
                var r = this.past[this.past.length - 1], s = this.future[this.future.length - 1];
                for (r && n.data === r.data || s && n.data === s.data || (this.future.length && this.past.push(this.future.pop()), this.future.length = 0, this.past.push(n), this.mode = SL.editor.controllers.History.MODE_RESTING, this.changed.dispatch()); this.past.length > SL.editor.controllers.History.MAX_SIZE;)
                    this.past.shift()
            }
        }, undo: function (e) {
            e = e || {};
            var t = this.past.pop();
            return t && this.mode !== SL.editor.controllers.History.MODE_UNDOING && (this.future.push(t), t = this.past.pop()), t && (this.mode = SL.editor.controllers.History.MODE_UNDOING, this.future.push(t), this.lastPushTime = Date.now(), e.ignoreMode && (t = JSON.parse(JSON.stringify(t)), t.mode = null), this.undid.dispatch(t), this.changed.dispatch()), t
        }, redo: function (e) {
            e = e || {};
            var t = this.future.pop();
            return t && this.mode !== SL.editor.controllers.History.MODE_REDOING && (this.past.push(t), t = this.future.pop()), t && (this.mode = SL.editor.controllers.History.MODE_REDOING, this.past.push(t), this.lastPushTime = Date.now(), e.ignoreMode && (t = JSON.parse(JSON.stringify(t)), t.mode = null), this.redid.dispatch(t), this.changed.dispatch()), t
        }, canUndo: function () {
            return this.past.length > 1 || 1 === this.past.length && this.deckHasChanged()
        }, canRedo: function () {
            return this.future.length > 0
        }, deckHasChanged: function () {
            return this.past[this.past.length - 1].data !== SL.editor.controllers.Serialize.getDeckAsString()
        }
    },
    SL("editor.controllers").Markup = {
        init: function (e) {
            this.editor = e
        }, getCurrentSlide: function () {
            return $(Reveal.getCurrentSlide())
        }, getCurrentHorizontalSlide: function () {
            var e = $(Reveal.getCurrentSlide());
            return e.parent("section.stack").length && (e = e.parent("section.stack")), e
        }, getFocusedSlide: function () {
            return $(".reveal .slides .present[contenteditable]:focus")
        }, addHorizontalSlide: function (e) {
            e = e || "<section></section>";
            var t = SLConfig.deck.rtl ? "past" : "future", i = $(e);
            return i.is("section") ? (SL.editor.controllers.Blocks.blur(), i.addClass(t), i.insertAfter(this.getCurrentHorizontalSlide()), Reveal.slide(), Reveal.sync(), SL.editor.controllers.Blocks.sync(), SLConfig.deck.rtl ? setTimeout(Reveal.navigateLeft, 1) : setTimeout(Reveal.navigateRight, 1), SL.templates.layoutTemplate(i), this.afterSlideAddedOrRemovedChanged(), i) : void 0
        }, addVerticalSlide: function (e) {
            e = e || "<section></section>";
            var t = this.getCurrentHorizontalSlide();
            t.hasClass("stack") || (t = t.wrap('<section class="present">').parent(), t.addClass("stack"));
            var i = $(e);
            if (i.is("section")) {
                var n = Reveal.getIndices();
                SL.editor.controllers.Blocks.blur(), i.addClass("future");
                var o = t.find("section.present");
                return o.length ? i.insertAfter(o) : t.append(i), Reveal.slide(n.h, n.v), SL.editor.controllers.Blocks.sync(), this.editor.navigateToSlide(i.get(0)), this.editor.navigateToSlide(i.get(0)), Reveal.sync(), SL.templates.layoutTemplate(i), this.afterSlideAddedOrRemovedChanged(), i
            }
        }, replaceCurrentSlide: function (e) {
            e = e || "<section></section>";
            var t = SL.editor.controllers.Markup.getCurrentSlide(), i = $(e);
            return i.is("section") ? (i.addClass("present"), t.replaceWith(i), Reveal.slide(), Reveal.sync(), SL.editor.controllers.Blocks.sync(), SL.templates.layoutTemplate(i), i) : void 0
        }, mergeHorizontalSlides: function (e, t) {
            e.length && t.length && (stack = e.wrap('<section class="present">').parent(), stack.addClass("stack"), stack.append(t), SL.editor.controllers.Blocks.sync(), Reveal.sync())
        }, unwrapEmptyStacks: function () {
            $(".reveal .slides section.stack").each(function () {
                var e = $(this);
                1 === e.find(">section").length && e.find(">section").first().unwrap()
            })
        }, removeCurrentSlide: function () {
            var e = Reveal.getIndices();
            $(".reveal .slides .present .present").remove().length > 0 ? 1 === $(".reveal .slides .present>section").length && $(".reveal .slides .present>section:eq(0)").unwrap() : $(".reveal .slides>section").length > 1 && $(".reveal .slides>.present").remove(), Reveal.slide(e.h, e.v), Reveal.sync(), this.afterSlideAddedOrRemovedChanged(), SL.analytics.trackEditor("Remove slide")
        }, writeHTMLToCurrentSlide: function (e) {
            Reveal.getCurrentSlide().innerHTML = e, SL.util.html.trimCode(Reveal.getCurrentSlide()), SL.editor.controllers.Blocks.sync(), SL.editor.controllers.Blocks.discoverBlockPairs()
        }, importSlides: function (e, t) {
            if (e = $(e), e && e.length) {
                var i = $(".reveal .slides");
                t && i.empty(), e.each(function (e, t) {
                    this.importSlide(t, i)
                }.bind(this)), Reveal.sync(), Reveal.slide(0, 0), SL.editor.controllers.Blocks.sync(), this.afterSlideAddedOrRemovedChanged()
            }
        }, importSlide: function (e, t) {
            if (e = $(e), t = $(t), t.append(e), e.css("display", "block"), e.find(">section").length)
                e.find(">section").each(function (t, i) {
                    this.importSlide(i, e)
                }.bind(this));
            else {
                var i = [], n = [];
                e.children().each(function () {
                    var e = $(this);
                    if (e.is(".sl-block"))
                        i.push(e.remove().prop("outerHTML"));
                    else if ("absolute" === e.css("position")) {
                        var t = e.position(), o = {width: e.outerWidth(), x: t.left, y: t.top};
                        e.css({
                            position: "relative",
                            top: "",
                            right: "",
                            bottom: "",
                            left: ""
                        }), o.html = e.prop("outerHTML"), n.push(o), e.remove()
                    }
                }), n.push({html: e.html(), width: SL.config.SLIDE_WIDTH}), e.empty(), n.forEach(function (t) {
                    if (t.html.trim().length > 0) {
                        SL.editor.controllers.Blocks.add({
                            type: "text",
                            slide: e,
                            silent: !0,
                            width: t.width,
                            x: t.x,
                            y: t.y,
                            afterInit: function (e) {
                                e.setCustomHTML(t.html)
                            }
                        })
                    }
                }), i.forEach(function (t) {
                    e.append(t)
                })
            }
            e.css("display", "")
        }, afterSlideAddedOrRemovedChanged: function () {
            SL.view.slideOptions.syncRemoveSlide()
        }
    },
    SL("editor.controllers").Media = {
        init: function () {
            this.bind(), this.setupDragAndDrop(), this.setupPasteFromClipboard()
        }, bind: function () {
            $(".reveal").delegate("section.present[contenteditable] img", "click", function () {
                if ("function" == typeof window.getSelection && "function" == typeof document.createRange) {
                    var e = window.getSelection(), t = document.createRange();
                    t.selectNode(this), e.removeAllRanges()
                }
                e.addRange(t)
            }), SL.components.Resizer.delegateOnHover($(".reveal"), "section.present[contenteditable] img", {preserveAspectRatio: !0}), SL.components.Resizer.delegateOnHover($(".reveal"), "section.present[contenteditable] video", {preserveAspectRatio: !0}), SL.components.Resizer.delegateOnHover($(".reveal"), "section.present[contenteditable] iframe", {
                preserveAspectRatio: !1,
                useOverlay: !0
            })
        }, setupDragAndDrop: function () {
            var e = $(document.documentElement), t = !1;
            $(document.body).append('<div class="drag-and-drop-instructions"></div>'), e.on("dragstart", function () {
                t = !0
            }), e.on("dragover dragenter", function () {
                return t ? void 0 : (e.addClass("drag-and-drop-over"), !1)
            }), e.on("dragleave", function () {
                return t ? void 0 : (e.removeClass("drag-and-drop-over"), !1)
            }), e.on("drop", function (i) {
                if (!t) {
                    i.stopPropagation(), i.preventDefault(), e.removeClass("drag-and-drop-over");
                    var n = SL.editor.controllers.Blocks.add({
                        type: "image",
                        slide: $(SL.editor.controllers.Markup.getCurrentSlide())
                    });
                    return n.upload(i.originalEvent.dataTransfer.files[0]), !1
                }
                t = !1
            })
        }, setupPasteFromClipboard: function () {
            $(document).on("paste", function () {
                setTimeout(function () {
                    $("img[src^=webkit-fake-url]").remove()
                }, 1)
            }), $(document).pasteImageReader(function (e) {
                e && e.file && e.dataURL && this.uploadImageBlob(e.file, "pasted-from-clipboard.png")
            }.bind(this))
        }, uploadImageBlob: function (e, t) {
            if (e && t && e.type.match(/image.*/)) {
                var i = SL.editor.controllers.Blocks.add({
                    type: "image",
                    slide: $(SL.editor.controllers.Markup.getCurrentSlide())
                });
                i.upload(e, t)
            }
        }
    },
    SL("editor.controllers").Migration = {
        init: function () {
            this.migrateEditorSettings()
        }, migrateEditorSettings: function () {
            var e = "editorSnap", t = "editorGrid", i = SL.settings.getValue(t), n = SL.settings.getValue(e);
            ("boolean" == typeof i || "boolean" == typeof n) && (SL.settings.removeValue([t, e]), SL.current_user.settings.set("editor_grid", i), SL.current_user.settings.set("editor_snap", n), SL.current_user.settings.save(["editor_grid", "editor_snap"]))
        }
    },
    SL("editor.controllers").Mode = {
        init: function (e, t) {
            this.editor = e, this.modes = t, this.modeActivated = new signals.Signal, this.modeDeactivated = new signals.Signal;
            for (var i in this.modes)
                this.modes[i].activated.add(this.onModeActivated.bind(this, i)), this.modes[i].deactivated.add(this.onModeDeactivated.bind(this, i))
        }, clear: function () {
            var e = this.get($("html").attr("data-mode"));
            e && e.isActive() && e.deactivate()
        }, change: function (e) {
            this.clear();
            var t = this.get(e);
            t && t.activate()
        }, toggle: function (e) {
            var t = this.get(e);
            if (t && t.isActive())
                t.deactivate();
            else if (t) {
                var i = $("html").attr("data-mode");
                i && i !== e && (currentMode = this.get(i), currentMode && currentMode.isActive() && currentMode.deactivate()), t.activate()
            }
        }, get: function (e) {
            return e || (e = $("html").attr("data-mode")), this.modes[e] ? this.modes[e] : null
        }, onModeActivated: function (e) {
            this.modeActivated.dispatch(e)
        }, onModeDeactivated: function (e) {
            this.modeDeactivated.dispatch(e)
        }
    },
    SL("editor.controllers").Onboarding = {
        init: function (e) {
            this.onKeyDown = this.onKeyDown.bind(this), this.onTutorialSkipped = this.onTutorialSkipped.bind(this), this.onTutorialFinished = this.onTutorialFinished.bind(this), SL.util.getQuery().tutorial ? this.start() : SL.current_user.get("editor_tutorial_completed") || !e.isNewDeck() || SL.util.device.IS_PHONE || SL.util.device.IS_TABLET || this.start()
        }, start: function () {
            SL.keyboard.keydown(this.onKeyDown), this.tutorial = new SL.components.Tutorial({
                context: this,
                steps: [this.step0, this.step1, this.step2, this.step3, this.step4, this.step5, this.step6, this.step7]
            }), this.tutorial.skipped.add(this.onTutorialSkipped.bind(this)), this.tutorial.finished.add(this.onTutorialFinished.bind(this)), this.tutorial.step(0)
        }, stop: function () {
            $.ajax({
                url: SL.config.AJAX_UPDATE_USER,
                type: "PUT",
                context: this,
                data: {user: {editor_tutorial_completed: !0}}
            }), SL.keyboard.release(this.onKeyDown), this.tutorial.destroy()
        }, onKeyDown: function (e) {
            return 27 === e.keyCode ? (this.stop(), !1) : !0
        }, onTutorialSkipped: function () {
            this.stop(), SL.analytics.trackEditor("Onboarding skipped")
        }, onTutorialFinished: function () {
            var e = $(".sl-templates");
            e.length && e.data("instance") && (e.css("background", ""), e.data("instance").hide()), this.stop(), SL.analytics.trackEditor("Onboarding finished")
        }, step0: {
            forwards: function () {
                var e = "<h3>Meet the new Slides</h3><p>Click <b>Next</b> to take a quick tour of the new Slides editor.</p>";
                SL.current_user.isEnterprise() || (e += '<p class="de-emphasize">While we\'re in beta you can still use the <a href="' + SL.routes.DECK_NEW(SL.current_user.get("username")) + '?version=1">old editor</a>.</p>'), this.tutorial.message(e, {
                    anchor: $(".sl-tutorial-controls-inner"),
                    alignment: "t",
                    maxWidth: 450
                })
            }
        }, step1: {
            forwards: function () {
                var e;
                e = SL.current_user.isPro() || SL.current_user.isEnterprise() ? "<h3>Top Level Options</h3><p>Set the <b>presentation title, privacy, theme and arrange slides</b> from here. You can also manage importing and exporting</p>" : "<h3>Top Level Options</h3><p>Set the <b>presentation title, privacy, theme and arrange slides</b> from here.</p>", this.tutorial.cutout($(".sidebar")), this.tutorial.message(e, {
                    anchor: $(".sidebar"),
                    alignment: "r"
                })
            }, backwards: function () {
                this.tutorial.clearCutout(), this.tutorial.clearMessage()
            }
        }, step2: {
            forwards: function () {
                this.tutorial.cutout($(".toolbars")), this.tutorial.message("<h3>Add New Content</h3><p>Click on any of these to add a <b>block</b> of content to the current slide.</p>", {
                    anchor: $(".toolbars"),
                    alignment: "r"
                })
            }, backwards: function () {
                this.tutorial.clearCutout(), this.tutorial.clearMessage()
            }
        }, step3: {
            forwards: function () {
                this.tutorial.cutout($(".sl-block")), this.tutorial.message("<h3>Example Text Block</h3><p>Single-click to focus or double-click to edit text.</p>", {
                    anchor: $(".sl-block"),
                    alignment: "b"
                })
            }, backwards: function () {
                this.tutorial.clearCutout(), this.tutorial.clearMessage()
            }
        }, step4: {
            forwards: function () {
                this.tutorial.cutout($(".toolbars")), this.tutorial.message("<h3>Block Options</h3><p>Options for the selected block. For text blocks this includes <b>alignment, color, size</b> and more.</p>", {
                    anchor: $(".toolbars"),
                    alignment: "r"
                }), SL.editor.controllers.Blocks.focus(SL.editor.controllers.Blocks.getCurrentBlocks()[0])
            }, backwards: function () {
                this.tutorial.clearCutout(), this.tutorial.clearMessage(), SL.editor.controllers.Blocks.blur()
            }
        }, step5: {
            forwards: function () {
                SL.editor.controllers.Blocks.blur(), this.tutorial.cutout($(".slide-options"), {padding: 4}), this.tutorial.message("<h3>Slide Options</h3><p>Options for the current slide, such as <b>background color/image and speaker notes</b>.</p>", {
                    anchor: $(".slide-options"),
                    alignment: "l"
                })
            }, backwards: function () {
                this.tutorial.clearCutout(), this.tutorial.clearMessage()
            }
        }, step6: {
            forwards: function () {
                this.tutorial.cutout($(".add-horizontal-slide"), {padding: 4}), this.tutorial.message("<h3>Adding a Slide</h3><p>Click the plus button to add a new slide.</p>", {
                    anchor: $(".add-horizontal-slide"),
                    alignment: "l"
                })
            }, backwards: function () {
                this.tutorial.clearCutout(), this.tutorial.clearMessage()
            }
        }, step7: {
            forwards: function () {
                $(".add-horizontal-slide").click(), $(".sl-templates").css("background", "transparent"), this.tutorial.cutout($(".sl-templates-inner")), this.tutorial.message('<h3>Choose a Template</h3><p>When adding a new slide you get to choose from templates. You can save your own templates in the "User" tab.</p>', {
                    anchor: $(".sl-templates-inner"),
                    alignment: "l"
                })
            }, backwards: function () {
                var e = $(".sl-templates");
                e.length && (e.css("background", ""), e.data("instance").hide()), this.tutorial.clearCutout(), this.tutorial.clearMessage()
            }
        }
    },
    SL("editor.controllers").Selection = {
        init: function () {
            this.domElement = $('<div class="sl-block-selection editing-ui">')
        }, start: function (e, t) {
            var i = $(".projector");
            this.domElement.appendTo(i);
            var n = i.offset();
            this.offsetX = -n.left, this.offsetY = -n.top, this.startX = e + this.offsetX, this.startY = t + this.offsetY;
            var o = SL.editor.controllers.Markup.getCurrentSlide();
            this.slideBounds = SL.util.getRevealSlideBounds(o, !0), this.sync(e, t)
        }, sync: function (e, t) {
            var i = {width: e + this.offsetX - this.startX, height: t + this.offsetY - this.startY};
            i.x = this.startX + Math.min(i.width, 0), i.y = this.startY + Math.min(i.height, 0), i.width = Math.abs(i.width), i.height = Math.abs(i.height), this.domElement.css({
                left: i.x,
                top: i.y,
                width: i.width,
                height: i.height
            }), i.x -= this.slideBounds.x, i.y -= this.slideBounds.y, i.x *= SL.util.getRevealCounterScale(), i.y *= SL.util.getRevealCounterScale(), i.width *= SL.util.getRevealCounterScale(), i.height *= SL.util.getRevealCounterScale(), SL.editor.controllers.Blocks.getCurrentBlocks().forEach(function (e) {
                SL.util.trig.intersects(e.measure(), i) ? SL.editor.controllers.Blocks.focus(e, !0, !1) : SL.editor.controllers.Blocks.blur([e])
            }.bind(this))
        }, stop: function () {
            this.domElement.remove()
        }
    },
    SL("editor.controllers").Serialize = {
        getDeckAsString: function (e) {
            var t = SL.util.html.muteSources($(".reveal .slides").html()), i = $("<div>").html(t);
            i.find("section").each(function (t, i) {
                this.formatSlideForSave(i, e)
            }.bind(this));
            var n = SL.util.html.unmuteSources(i.html());
            return n = SL.util.string.trim(n)
        }, getSlideAsString: function (e, t) {
            t = $.extend({inner: !1}, t), e = $(e), e.find("section").length && (e = e.find("section").first());
            var i = SL.util.html.muteSources(e.prop("outerHTML"));
            e = $(i), this.formatSlideForSave(e, t);
            var n = SL.util.html.unmuteSources(e.prop(t.inner ? "innerHTML" : "outerHTML"));
            return n
        }, getFirstSlideAsString: function (e) {
            return this.getSlideAsString($(".reveal .slides section").first(), e)
        }, formatSlideForSave: function (e, t) {
            return t = $.extend({
                exclude: null,
                templatize: !1,
                removeSlideIds: !1,
                removeBlockIds: !1,
                removeTextPlaceholders: !1
            }, t), e = $(e), (t.templatize || t.removeSlideIds) && e.removeAttr("data-id"), (t.templatize || t.removeBlockIds) && e.find("[data-block-id]").removeAttr("data-block-id"), t.removeTextPlaceholders && (e.find("[data-placeholder-tag]").removeAttr("data-placeholder-tag"), e.find("[data-placeholder-text]").removeAttr("data-placeholder-text")), t.exclude && e.find(t.exclude).remove(), SL.util.html.removeAttributes(e, function (e) {
                return /(style|contenteditable|hidden|aria-hidden|data\-index\-.|data\-previous\-indexv)/gi.test(e)
            }), SL.util.html.trimCode(e), e.removeClass("past present future disabled overflowing"), "" === e.attr("class") && e.get(0).removeAttribute("class"), e.find(".fragment").removeClass("visible"), e.find("iframe[" + SL.util.html.ATTR_SRC_SILENCED + "]").each(function () {
                this.setAttribute("data-src", this.getAttribute(SL.util.html.ATTR_SRC_SILENCED)), this.removeAttribute(SL.util.html.ATTR_SRC_SILENCED)
            }), e.find(".navigate-up, .navigate-right, .navigate-down, .navigate-left, .navigate-next, .navigate-prev").removeClass("enabled"), e.find(".editing-ui").remove(), e.find('[src="' + skriv.actions.image.PLACEHOLDER + '"]').remove(), e.find('[href="' + skriv.actions.link.PLACEHOLDER + '"]').each(function () {
                $(this).replaceWith(this.childNodes)
            }), e.find("*:not(iframe)").contents().each(function () {
                8 === this.nodeType && $(this).remove()
            }), e.find("a[data-cke-saved-href]").each(function () {
                this.removeAttribute("data-cke-saved-href")
            }), e.find(".sl-block, .sl-block-content").each(function (e, t) {
                t = $(t), SL.util.html.removeClasses(t, function (e) {
                    return /(is\-focused|is\-editing|visible|^cke_)/gi.test(e)
                }), SL.util.html.removeAttributes(t, function (e) {
                    return /(contenteditable|tabindex|spellcheck|role|title|aria\-.)/gi.test(e)
                })
            }), e
        }
    },
// sessions
    SL("editor.controllers").Session = {
        init: function () {
            this.hasLoggedOut = !1, this.loginInterval = setInterval(this.checkLogin.bind(this), SL.config.LOGIN_STATUS_INTERVAL)
        }, checkLogin: function (e) {
            (SL.view.hasUnsavedChanges() && !SL.modal.isOpen("no-session") || e) && $.get(SL.config.AJAX_CHECK_STATUS).done(function (e) {
                e && e.user_signed_in ? this.onLoggedIn() : this.onLoggedOut()
            }.bind(this))
        }, onLoggedIn: function () {
            this.hasLoggedOut && (this.hasLoggedOut = !1, SL.modal.close())
        }, onLoggedOut: function () {
            SL.editor.controllers.Mode.get("arrange").isActive() || this.hasLoggedOut || (this.hasLoggedOut = !0, SL.modal.open("no-session"))
        }
    },
    SL("editor.controllers").Stream = {
        connect: function () {
            this.stream || (this.stream = new SL.helpers.StreamEditor({deckID: SLConfig.deck.id}), this.stream.connect())
        }, get: function () {
            return this.stream || this.connect(), this.stream
        }
    },
    SL("editor.controllers").Thumbnail = {
        init: function () {
            this.invalidated = !1
        }, generate: function () {
            $.ajax({type: "POST", url: SL.config.AJAX_THUMBNAIL_DECK(SLConfig.deck.id)}), this.invalidated = !1
        }, invalidate: function () {
            this.invalidated = !0
        }, isInvalidated: function () {
            return this.invalidated
        }
    },
    SL("editor.controllers").URL = {
        init: function () {
            setTimeout(this.read.bind(this), 1)
        }, read: function () {
            var e = SL.util.getQuery();
            e.panel && SL.view.sidebar.open(e.panel)
        }, write: function () {
            window.history && "function" == typeof window.history.replaceState && window.history.replaceState(null, SLConfig.deck.title, SL.routes.DECK_EDIT(SLConfig.deck.user.username, SLConfig.deck.slug))
        }
    },
    SL("editor").Editor = SL.views.Base.extend({
    init: function () {
        this._super(), SL.editor.controllers.Capabilities.init(), SLConfig.deck.theme_font = SLConfig.deck.theme_font || SL.config.DEFAULT_THEME_FONT, SLConfig.deck.theme_color = SLConfig.deck.theme_color || SL.config.DEFAULT_THEME_COLOR, SLConfig.deck.transition = SLConfig.deck.transition || SL.config.DEFAULT_THEME_TRANSITION, SLConfig.deck.background_transition = SLConfig.deck.background_transition || SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION, SLConfig.deck.visibility = SLConfig.deck.visibility || SL.models.Deck.VISIBILITY_ALL, this.addHorizontalSlideButton = $(".add-horizontal-slide"), this.addVerticalSlideButton = $(".add-vertical-slide"), this.previewControlsExit = $(".preview-controls-exit"), this.flags = {
            editing: !0,
            saving: !1,
            unsaved: !1,
            newDeck: !SLConfig.deck.id
        }, this.isNewDeck() && SL.current_user.hasDefaultTheme() && (SLConfig.deck.theme_id = SL.current_user.getDefaultTheme().get("id")), this.savedDeck = JSON.parse(JSON.stringify(SLConfig.deck)), this.setupControllers(), this.setupComponents(), this.setupReveal(), this.setupTheme(), this.setupWYSIWYG(), this.setupDefaultContent(), this.preloadWYSIWYG(), this.changeInterval = setInterval(this.checkChanges.bind(this), SL.config.UNSAVED_CHANGES_INTERVAL), this.saveInterval = setInterval(this.checkAutoSave.bind(this), SL.config.AUTOSAVE_INTERVAL), $("html").toggleClass("is-new", this.isNewDeck()), $("html").toggleClass("rtl", SLConfig.deck.rtl), this.bind(), this.layout(), this.enableEditing(), $("html").addClass("editor-loaded-successfully"), setTimeout(function () {
            SLConfig.deck.data = SL.editor.controllers.Serialize.getDeckAsString(), this.firstSlideData = SL.editor.controllers.Serialize.getFirstSlideAsString(), this.toolbars.sync()
        }.bind(this), 1)
    }, setupControllers: function () {
        SL.editor.controllers.Onboarding.init(this), SL.editor.controllers.Contrast.init(this), SL.editor.controllers.Blocks.init(this), SL.editor.controllers.Media.init(this), SL.editor.controllers.History.init(this), SL.editor.controllers.Markup.init(this), SL.editor.controllers.Migration.init(this), SL.editor.controllers.Session.init(this), SL.editor.controllers.Selection.init(this), SL.editor.controllers.Guides.init(this), SL.editor.controllers.Grid.init(this), SL.editor.controllers.URL.init(this), SL.editor.controllers.Mode.init(this, {
            css: new SL.editor.modes.CSS(this),
            arrange: new SL.editor.modes.Arrange(this),
            preview: new SL.editor.modes.Preview(this),
            fragment: new SL.editor.modes.Fragment(this)
        }), SL.editor.controllers.Mode.modeActivated.add(function () {
            SL.editor.controllers.Blocks.blur()
        }.bind(this)), SL.editor.controllers.Mode.modeDeactivated.add(function () {
            Reveal.configure({minScale: SL.editor.controllers.Capabilities.isTouchEditor() ? .4 : 1}), setTimeout(Reveal.layout, 1), this.layout(), SL.editor.controllers.Grid.refresh()
        }.bind(this))
    }, setupComponents: function () {
        this.sidebar = new SL.editor.components.Sidebar, this.toolbars = new SL.editor.components.Toolbars(this), this.colorpicker = new SL.editor.components.Colorpicker, this.slideOptions = new SL.editor.components.SlideOptions(this, {
            html: this.isDeveloperMode(),
            fragment: !SL.editor.controllers.Capabilities.isTouchEditorSmall()
        }), this.slideOptions.syncRemoveSlide(), this.templates = new SL.components.Templates
    }, setupReveal: function () {
        var e = {
            controls: !0,
            progress: !1,
            history: !1,
            center: !1,
            touch: !1,
            fragments: !1,
            help: !1,
            pause: !1,
            mouseWheel: !1,
            rollingLinks: !1,
            margin: .16,
            minScale: 1,
            maxScale: 1,
            keyboard: {27: null, 70: null},
            keyboardCondition: function () {
                return SL.editor.controllers.Mode.get("preview").isActive() || 0 === SL.editor.controllers.Blocks.getFocusedBlocks().length && !this.sidebar.isExpanded()
            }.bind(this),
            rtl: SLConfig.deck.rtl,
            loop: SLConfig.deck.should_loop,
            transition: SLConfig.deck.transition,
            backgroundTransition: SLConfig.deck.background_transition
        };
        SL.editor.controllers.Capabilities.isTouchEditor() && (e.margin = .05, e.minScale = .4), SL.editor.controllers.Capabilities.isTouchEditorSmall() && (e.margin = .12), Reveal.initialize(e), Reveal.addEventListener("ready", function () {
            this.addHorizontalSlideButton.addClass("show"), this.addVerticalSlideButton.addClass("show"), SL.editor.controllers.Blocks.sync(), SL.editor.controllers.Blocks.discoverBlockPairs()
        }.bind(this)), Reveal.addEventListener("slidechanged", function (e) {
            e.previousSlide && SL.editor.controllers.Blocks.blurBlocksBySlide(e.previousSlide), SL.editor.controllers.Blocks.sync(), SL.editor.controllers.Blocks.discoverBlockPairs(), this.checkOverflow()
        }.bind(this))
    }, setupTheme: function () {
        var e = SL.current_user.getThemes().getByProperties({id: SLConfig.deck.theme_id});
        e ? (SLConfig.deck.transition = e.get("transition"), SLConfig.deck.backgroundTransition = e.get("background_transition")) : e = SL.models.Theme.fromDeck(SLConfig.deck), SL.helpers.ThemeController.paint(e, {center: !1}), this.syncPageBackground()
    }, setupWYSIWYG: function () {
        CKEDITOR.on("dialogDefinition", function (e) {
            e.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE
        }), CKEDITOR.on("instanceReady", function (e) {
            e.editor.on("paste", function (e) {
                e.data && "html" === e.data.type && (e.data.dataValue = e.data.dataValue.replace(/(font\-size|line\-height):\s?\d+(px|em|pt|%)?;/gi, ""))
            }, null, null, 9)
        }), CKEDITOR.disableAutoInline = !0, CKEDITOR.config.floatSpaceDockedOffsetY = 1, CKEDITOR.config.title = !1
    }, preloadWYSIWYG: function () {
        var e = $("<p>").hide().appendTo(document.body), t = CKEDITOR.inline(e.get(0));
        t.on("instanceReady", function () {
            t.destroy(), e.remove()
        }.bind(this))
    }, setupDefaultContent: function () {
        this.isNewDeck() && SL.editor.controllers.Markup.replaceCurrentSlide(SL.templates.getNewDeckTemplate().get("html"))
    }, bind: function () {
        $(document).on("keydown", this.onDocumentKeyDown.bind(this)), $(window).on("keyup", this.onWindowKeyUp.bind(this)), $(window).on("beforeunload", this.onWindowBeforeUnload.bind(this)), $(window).on("resize", this.onWindowResize.bind(this)), this.addHorizontalSlideButton.on("vclick", this.onAddHorizontalSlideClicked.bind(this)), this.addVerticalSlideButton.on("vclick", this.onAddVerticalSlideClicked.bind(this)), this.previewControlsExit.on("vclick", this.onExitPreviewClicked.bind(this)), this.sidebar.saveClicked.add(this.save.bind(this)), this.sidebar.previewClicked.add(this.onEnterPreviewClicked.bind(this)), this.onUndoOrRedo = this.onUndoOrRedo.bind(this), SL.editor.controllers.History.undid.add(this.onUndoOrRedo), SL.editor.controllers.History.redid.add(this.onUndoOrRedo)
    }, layout: function () {
        var e = this.getSlideSize({scaled: !0}), t = window.innerWidth - this.getSidebarWidth(), i = window.innerHeight, n = {
            left: (t + e.width) / 2,
            top: (i - e.height) / 2,
            marginLeft: 0,
            marginTop: 0
        };
        n.left = Math.min(n.left, t - this.slideOptions.domElement.width()), n.top = Math.max(n.top, 0), this.slideOptions.domElement.css(n)
    }, checkChanges: function () {
        if (!this.isSaving()) {
            var e = SL.editor.controllers.Serialize.getDeckAsString();
            SL.pointer.isDown() || SL.editor.controllers.History.push(e);
            var t = e !== SLConfig.deck.data, i = SLConfig.deck.dirty;
            this.flags.unsaved = !(!t && !i), this.hasUnsavedChanges() ? this.sidebar.updateSaveButton("disabled", "Click to save") : this.sidebar.updateSaveButton("disabled is-saved", "Latest changes are saved")
        }
        this.checkOverflow()
    }, checkAutoSave: function () {
        this.hasUnsavedChanges() && !SL.pointer.isDown() && this.save()
    }, checkOverflow: function () {
        var e = 0, t = SL.editor.controllers.Blocks.getCombinedBounds(SL.editor.controllers.Blocks.getCurrentBlocks());
        t.y < -e || t.x < -e || t.right > SL.config.SLIDE_WIDTH + e || t.bottom > SL.config.SLIDE_HEIGHT + e ? (SL.editor.controllers.Markup.getCurrentSlide().addClass("overflowing"), this.slideOptions.showOverflowWarning()) : (SL.editor.controllers.Markup.getCurrentSlide().removeClass("overflowing"), this.slideOptions.hideOverflowWarning())
    }, save: function (e) {
        this.isSaving() || (this.flags.saving = !0, this.sidebar.updateSaveButton("disabled is-saving", "Saving changes"), this.isNewDeck() ? this.createDeck(e) : this.updateDeck(e))
    }, getSaveData: function (e) {
        var t = {
            deck: {
                title: SL.util.unescapeHTMLEntities((SLConfig.deck.title || "").substr(0, SL.config.DECK_TITLE_MAXLENGTH)),
                description: SL.util.unescapeHTMLEntities(SLConfig.deck.description),
                data: SL.util.string.trim(e),
                css_input: SLConfig.deck.css_input,
                css_output: SLConfig.deck.css_output,
                comments_enabled: SLConfig.deck.comments_enabled,
                forking_enabled: SLConfig.deck.forking_enabled,
                auto_slide_interval: SLConfig.deck.auto_slide_interval,
                transition: SLConfig.deck.transition,
                background_transition: SLConfig.deck.background_transition,
                theme_font: SLConfig.deck.theme_font,
                theme_color: SLConfig.deck.theme_color,
                should_loop: SLConfig.deck.should_loop,
                rtl: SLConfig.deck.rtl,
                notes: JSON.stringify(SLConfig.deck.notes),
                rolling_links: !1,
                center: !1
            }, version: SL.editor.Editor.VERSION
        };
        return SLConfig.deck.slug !== this.savedDeck.slug && (t.deck.custom_slug = SLConfig.deck.slug), SL.current_user.hasThemes() && (t.deck.theme_id = SLConfig.deck.theme_id), t
    }, createDeck: function (e) {
        var t = SL.editor.controllers.Serialize.getDeckAsString(), i = SLConfig.deck.title;
        if (!i) {
            var n = $(Reveal.getSlide(0)).find("h1").text().trim();
            n && /^(untitled|title\stext)$/gi.test(n) === !1 && (SLConfig.deck.title = n.substr(0, SL.config.DECK_TITLE_MAXLENGTH))
        }
        var o = {
            type: "POST",
            url: SL.config.AJAX_CREATE_DECK(SLConfig.current_user.username),
            context: this,
            data: this.getSaveData(t)
        };
        $.ajax(o).done(function (i) {
            $.extend(SLConfig.deck, i), SLConfig.deck.data = t, SLConfig.deck.dirty = !1, $("html").removeClass("is-new"), this.flags.newDeck = !1, SL.editor.controllers.URL.write(), SL.editor.controllers.Thumbnail.generate(), this.onSaveSuccess(e, i)
        }).fail(function (t) {
            this.onSaveError(e, t)
        }).always(function () {
            this.onSaveFinished(e)
        })
    }, updateDeck: function (e) {
        var t = SL.editor.controllers.Serialize.getDeckAsString(), i = {
            type: "PUT",
            url: SL.config.AJAX_UPDATE_DECK(this.savedDeck ? this.savedDeck.id : SLConfig.deck.id),
            context: this,
            data: this.getSaveData(t)
        };
        $.ajax(i).done(function (i) {
            i && i.deck && i.deck.slug && (SLConfig.deck.slug = i.deck.slug, SL.editor.controllers.URL.write()), SLConfig.deck.data = t, SLConfig.deck.dirty = !1;
            var n = SL.editor.controllers.Serialize.getFirstSlideAsString();
            (this.firstSlideData !== n || SL.editor.controllers.Thumbnail.isInvalidated()) && (this.firstSlideData = n, SL.editor.controllers.Thumbnail.generate()), this.onSaveSuccess(e, i)
        }).fail(function (t) {
            this.onSaveError(e, t)
        }).always(function () {
            this.onSaveFinished(e)
        })
    }, onSaveSuccess: function (e, t) {
        this.savedDeck = JSON.parse(JSON.stringify(SLConfig.deck)), t && t.deck && t.deck.sanitize_messages && t.deck.sanitize_messages.length && SL.notify(t.deck.sanitize_messages[0], "negative"), e && e.apply(null, [!0])
    }, onSaveError: function (e, t) {
        401 === t.status && SL.editor.controllers.Session.checkLogin(), SL.notify(SL.locale.get("DECK_SAVE_ERROR"), "negative"), e && e.apply(null, [!1])
    }, onSaveFinished: function () {
        this.flags.saving = !1, this.checkChanges(), $("html").addClass("editor-saved-successfully")
    }, saveVisibility: function (e) {
        if (this.isNewDeck())
            return this.save(this.saveVisibility.bind(this, e)), !1;
        var t = {
            type: "POST",
            url: SL.config.AJAX_PUBLISH_DECK(SLConfig.deck.id),
            context: this,
            data: {visibility: SLConfig.deck.visibility}
        };
        $.ajax(t).done(function (e) {
            $("html").attr("data-visibility", SLConfig.deck.visibility), e.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_SELF")) : e.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_TEAM")) : e.deck.visibility === SL.models.Deck.VISIBILITY_ALL && SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ALL")), this.sidebar.updatePublishButton()
        }).fail(function () {
            this.sidebar.updatePublishButton(), SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative")
        })
    }, navigateToSlide: function (e) {
        if (e) {
            var t = Reveal.getIndices(e);
            setTimeout(function () {
                Reveal.slide(t.h, t.v)
            }, 1)
        }
    }, enableEditing: function () {
        this.flags.editing = !0, $("html").addClass("is-editing")
    }, disableEditing: function () {
        this.flags.editing = !1, $("html").removeClass("is-editing")
    }, syncPageBackground: function () {
        $("html, body").css("background-color", SL.util.deck.getBackgroundColor())
    }, getCurrentTheme: function () {
        var e = SL.current_user.getThemes().getByProperties({id: SLConfig.deck.theme_id});
        return e || (e = SL.models.Theme.fromDeck(SLConfig.deck)), e
    }, getSlideSize: function (e) {
        var t = Reveal.getConfig(), i = 1;
        return e && e.scaled && (i = Reveal.getScale()), {width: t.width * i, height: t.height * i}
    }, getSidebarWidth: function () {
        return 240
    }, isDeveloperMode: function () {
        return SL.current_user.settings.get("developer_mode") && !SL.editor.controllers.Capabilities.isTouchEditor()
    }, isEditing: function () {
        return this.flags.editing
    }, isSaving: function () {
        return this.flags.saving
    }, isNewDeck: function () {
        return this.flags.newDeck
    }, hasUnsavedChanges: function () {
        return this.flags.unsaved
    }, onThemeChanged: function () {
        this.toolbars.sync(), this.slideOptions.syncCustomClasses(), this.syncPageBackground()
    }, onUserInput: function () {
        clearInterval(this.saveInterval), this.saveInterval = setInterval(this.checkAutoSave.bind(this), SL.config.AUTOSAVE_INTERVAL)
    }, onAddHorizontalSlideClicked: function (e) {
        e.preventDefault(), e.shiftKey ? SL.editor.controllers.Markup.addHorizontalSlide() : this.templates.show({
            anchor: this.addHorizontalSlideButton, alignment: SLConfig.deck.rtl ? "l" : "r", callback: function (e) {
                SL.editor.controllers.Markup.addHorizontalSlide(e)
            }
        })
    }, onAddVerticalSlideClicked: function (e) {
        e.preventDefault(), e.shiftKey ? SL.editor.controllers.Markup.addVerticalSlide() : this.templates.show({
            anchor: this.addVerticalSlideButton, alignment: "b", callback: function (e) {
                SL.editor.controllers.Markup.addVerticalSlide(e)
            }
        })
    }, onEnterPreviewClicked: function () {
        SL.editor.controllers.Mode.change("preview")
    }, onExitPreviewClicked: function (e) {
        e.preventDefault(), SL.editor.controllers.Mode.clear()
    }, onWindowKeyUp: function () {
        this.onUserInput()
    }, onDocumentKeyDown: function (e) {
        if (27 === e.keyCode) {
            var t = $("input:focus, textarea:focus, [contenteditable]:focus"), i = $(Reveal.getCurrentSlide()), n = SL.editor.controllers.Mode.get();
            if (n && n.isActive() && "css" === n.getID())
                return;
            if (SL.modal.isOpen())
                return;
            t && t.length ? t.blur() : this.sidebar.isExpanded() ? this.sidebar.close() : this.colorpicker.isVisible() ? this.colorpicker.hide() : this.slideOptions.hasOpenPanel() ? this.slideOptions.collapse() : this.toolbars.hasOpenPanel() ? this.toolbars.collapse() : SL.editor.controllers.Blocks.getFocusedBlocks().length ? SL.editor.controllers.Blocks.blur() : n && n.isActive() && /(absolute|fragment|preview)/gi.test(n.getID()) ? (n.deactivate(), /(absolute|fragment)/gi.test(n.getID()) && i.focus()) : Reveal.toggleOverview()
        } else {
            if (SL.util.isTypingEvent(e))
                return !0;
            var o = this.sidebar.isExpanded(), r = e.metaKey || e.ctrlKey;
            8 === e.keyCode ? e.preventDefault() : r && 83 === e.keyCode ? (this.hasUnsavedChanges() && this.save(), e.preventDefault()) : !o && r && 89 === e.keyCode ? (SL.editor.controllers.History.redo(), e.preventDefault()) : !o && r && e.shiftKey && 90 === e.keyCode ? (SL.editor.controllers.History.redo(), e.preventDefault()) : !o && r && 90 === e.keyCode ? (SL.editor.controllers.History.undo(), e.preventDefault()) : o || !r || e.shiftKey || 70 !== e.keyCode ? !o && e.shiftKey && e.altKey && 70 === e.keyCode ? (SL.editor.controllers.Mode.toggle("fragment"), e.preventDefault()) : !o && e.shiftKey && e.altKey && 78 === e.keyCode ? (this.slideOptions.triggerNotes(), e.preventDefault()) : !o && e.shiftKey && e.altKey && 72 === e.keyCode && (this.slideOptions.triggerHTML(), e.preventDefault()) : (SL.editor.controllers.Mode.toggle("preview"), e.preventDefault())
        }
    }, onWindowBeforeUnload: function () {
        return this.hasUnsavedChanges() ? SL.locale.get("LEAVE_UNSAVED_DECK") : void 0
    }, onWindowResize: function () {
        Reveal.layout(), this.layout()
    }, onUndoOrRedo: function (e) {
        SL.util.skipCSSTransitions($("html"), 100), SL.editor.controllers.Mode.clear(), SL.editor.controllers.Blocks.blur(), $(".reveal .slides").html(e.data), Reveal.sync(), Reveal.slide(e.indices.h, e.indices.v), this.slideOptions.syncRemoveSlide(), SL.editor.controllers.Blocks.sync();
        var t = SL.editor.controllers.Mode.get(e.mode);
        t ? t.activate() : e.focusedBlocks && e.focusedBlocks.length && SL.editor.controllers.Blocks.getCurrentBlocks().forEach(function (t) {
            e.focusedBlocks.forEach(function (e) {
                t.getID() === e && SL.editor.controllers.Blocks.focus(t, !0)
            })
        })
    }
}),
    SL.editor.Editor.VERSION = 2,
    SL("editor.modes").Base = Class.extend({
    init: function (e, t) {
        this.id = t, this.editor = e, this.active = !1, this.activated = new signals.Signal, this.deactivated = new signals.Signal, this.onSlideChanged = this.onSlideChanged.bind(this), this.render(), this.bind()
    }, bind: function () {
    }, render: function () {
    }, activate: function () {
        this.active = !0, $("html").attr("data-mode", this.id).addClass("hide-projector-overlays"), this.deactivateOnSlideChange && Reveal.addEventListener("slidechanged", this.onSlideChanged), this.activated.dispatch()
    }, deactivate: function () {
        this.active = !1, $("html").removeAttr("data-mode").removeClass("hide-projector-overlays"), this.deactivateOnSlideChange && Reveal.removeEventListener("slidechanged", this.onSlideChanged), this.deactivated.dispatch()
    }, toggle: function () {
        this.isActive() ? this.deactivate() : this.activate()
    }, isActive: function () {
        return this.active
    }, getID: function () {
        return this.id
    }, onSlideChanged: function () {
        this.deactivate()
    }
}),
    SL("editor.modes").Arrange = SL.editor.modes.Base.extend({
    init: function (e) {
        this._super(e, "arrange")
    }, bind: function () {
        Reveal.addEventListener("overviewshown", this.onRevealOverviewShown.bind(this)), Reveal.addEventListener("overviewhidden", this.onRevealOverviewHidden.bind(this))
    }, activate: function (e) {
        this.active = !0, e || Reveal.toggleOverview(!0), this.editor.disableEditing(), this.editor.sidebar.updateArrangeButton("arranging");
        var t = ['<div class="arrange-controls editing-ui">', '<div class="move-left i-arrow-left-alt1"></div>', '<div class="move-right i-arrow-right-alt1"></div>', '<div class="move-up i-arrow-up-alt1"></div>', '<div class="move-down i-arrow-down-alt1"></div>', '<div class="merge-left i-previous" data-tooltip-delay="500"></div>', '<div class="merge-right i-next" data-tooltip-delay="500"></div>', "</div>"].join("");
        $(".reveal .slides section:not(.stack)").append(t).addClass("disabled"), $(".reveal .slides section.stack").each(function (e, t) {
            0 === $(t).find(".present").length && $(t).find("section").first().addClass("present")
        }), $(".reveal .slides section .arrange-controls").on("click", this.onControlsClicked.bind(this)), $(".reveal .slides section .move-left").on("click", this.onMoveSlideLeft.bind(this)), $(".reveal .slides section .move-right").on("click", this.onMoveSlideRight.bind(this)), $(".reveal .slides section .move-up").on("click", this.onMoveSlideUp.bind(this)), $(".reveal .slides section .move-down").on("click", this.onMoveSlideDown.bind(this)), $(".reveal .slides section .merge-left").on("click", this.onMergeLeft.bind(this)), $(".reveal .slides section .merge-right").on("click", this.onMergeRight.bind(this)), this.syncControls(), SL.analytics.trackEditor("Arrange mode"), $(document.activeElement).blur(), this._super()
    }, deactivate: function (e) {
        this.active = !1, e || Reveal.toggleOverview(!1), this.editor.enableEditing(), this.editor.sidebar.updateArrangeButton(), $(".reveal .slides section:not(.stack)").removeClass("disabled"), $(".reveal .slides section .arrange-controls").remove(), this._super()
    }, syncControls: function () {
    }, onRevealOverviewShown: function () {
        this.isActive() || (SL.editor.controllers.Mode.clear(), this.activate(!0))
    }, onRevealOverviewHidden: function () {
        this.isActive() && this.deactivate(!0)
    }, onControlsClicked: function (e) {
        $(e.target).hasClass("arrange-controls") && $(e.target).parent("section").removeClass("disabled").trigger("click")
    }, onMoveSlideLeft: function (e) {
        var t = $(e.target).parents("section").first();
        t.parents("section.stack").length && (t = t.parents("section.stack"));
        var i = t.prev();
        t.length && i.length && (t.after(i), Reveal.slide(t.index()), Reveal.slide(t.index()), Reveal.toggleOverview(!0), Reveal.sync(), this.syncControls())
    }, onMoveSlideRight: function (e) {
        var t = $(e.target).parents("section").first();
        t.parents("section.stack").length && (t = t.parents("section.stack"));
        var i = t.next();
        t.length && i.length && (t.before(i), Reveal.slide(t.index()), Reveal.slide(t.index()), Reveal.toggleOverview(!0), Reveal.sync(), this.syncControls())
    }, onMoveSlideUp: function (e) {
        var t = $(e.target).parents("section").first(), i = t.prev();
        t.length && i.length && (t.after(i), Reveal.slide(t.parents("section.stack").index(), t.index()), Reveal.slide(t.parents("section.stack").index(), t.index()), Reveal.toggleOverview(!0), Reveal.sync(), this.syncControls())
    }, onMoveSlideDown: function (e) {
        var t = $(e.target).parents("section").first(), i = t.next();
        t.length && i.length && (t.before(i), Reveal.slide(t.parents("section.stack").index(), t.index()), Reveal.slide(t.parents("section.stack").index(), t.index()), Reveal.toggleOverview(!0), Reveal.sync(), this.syncControls())
    }, onMergeLeft: function (e) {
        var t = $(e.target).parents("section").first(), i = t.prev();
        if (t.parents("section.stack").prev().length && (i = t.parents("section.stack").prev()), t.length) {
            t.parents("section.stack").length ? t.insertBefore(t.parents("section.stack")) : i.is("section.stack") ? i.prepend(t) : SL.editor.controllers.Markup.mergeHorizontalSlides(i, t), SL.editor.controllers.Markup.unwrapEmptyStacks();
            var n = Reveal.getIndices(t.get(0));
            Reveal.slide(n.h, n.v), Reveal.slide(n.h, n.v), Reveal.toggleOverview(!0), Reveal.sync(), this.syncControls()
        }
    }, onMergeRight: function (e) {
        var t = $(e.target).parents("section").first(), i = t.next();
        if (t.parents("section.stack").next().length && (i = t.parents("section.stack").next()), t.length) {
            t.parents("section.stack").length ? t.insertAfter(t.parents("section.stack")) : i.is("section.stack") ? i.prepend(t) : SL.editor.controllers.Markup.mergeHorizontalSlides(i, t), SL.editor.controllers.Markup.unwrapEmptyStacks();
            var n = Reveal.getIndices(t.get(0));
            Reveal.slide(n.h, n.v), Reveal.slide(n.h, n.v), Reveal.toggleOverview(!0), Reveal.sync(), this.syncControls()
        }
    }
}),
    SL("editor.modes").CSS = SL.editor.modes.Base.extend({
    init: function (e) {
        this.userCSSInput = $("#user-css-input"), this.userCSSOutput = $("#user-css-output"), this.parseTimeout = -1, this.userCSSInput.length && (SLConfig.deck.css_input = this.userCSSInput.html() || void 0), this.userCSSOutput.length && (SLConfig.deck.css_output = this.userCSSOutput.html() || void 0), this._super(e, "css")
    }, render: function () {
        this.domElement = $('<div class="css-editor">').appendTo(document.body), this.headerElemenet = $("<header>").appendTo(this.domElement), this.headerElemenet.append('<p>Enter custom styles using LESS or plain CSS. All selectors are prefixed with .reveal on save. <a href="http://help.slides.com/knowledgebase/articles/253052-css-editor-pro-" target="_blank">Find out more and see examples.</a></p>'), this.contentsElement = $('<div class="contents">').appendTo(this.domElement), this.contentsElement.append('<div id="ace-less" class="editor"></div>'), this.errorElement = $('<div class="error">').appendTo(this.contentsElement), this.footerElement = $("<footer>").appendTo(this.domElement), this.cancelButton = $('<button class="button cancel negative grey xl">Cancel</button>').appendTo(this.footerElement), this.saveButton = $('<button class="button save positive xl">OK</button>').appendTo(this.footerElement)
    }, renderEditor: function () {
        if (!this.cssEditor) {
            try {
                this.cssEditor = ace.edit("ace-less"), this.cssEditor.setTheme("ace/theme/monokai"), this.cssEditor.setDisplayIndentGuides(!0), this.cssEditor.setShowPrintMargin(!1), this.cssEditor.getSession().setMode("ace/mode/less")
            } catch (e) {
                console.log("An error occurred while initializing the Ace editor.")
            }
            this.cssEditor.env.editor.on("change", this.onInputChange.bind(this))
        }
    }, bind: function () {
        this.cancelButton.on("click", this.onCancelClicked.bind(this)), this.saveButton.on("click", this.onSaveClicked.bind(this))
    }, activate: function () {
        this.renderEditor(), this.editor.disableEditing(), this.editor.sidebar.close(!0), this.domElement.addClass("visible"), this.savedCSSInput = SLConfig.deck.css_input, this.savedCSSOutput = SLConfig.deck.css_output, this.currentCSSInput = SLConfig.deck.css_input, this.errorElement.text("").removeClass("visible"), this.cssEditor.env.document.setValue(SLConfig.deck.css_input), this.cssEditor.focus(), Reveal.configure({minScale: .4}), setTimeout(Reveal.layout, 1), this._super()
    }, deactivate: function () {
        this.editor.enableEditing(), this.domElement.removeClass("visible"), this._super()
    }, saveAndClose: function () {
        this.compile(function (e) {
            SLConfig.deck.css_input = this.cssEditor.env.document.getValue(), SLConfig.deck.css_output = e, SLConfig.deck.dirty = !0, SL.editor.controllers.Thumbnail.generate(), this.deactivate()
        }.bind(this), function () {
            SL.notify("Please fix all errors before saving.", "negative")
        }.bind(this))
    }, compile: function (e, t) {
        this.cssParser || (this.cssParser = new less.Parser);
        var i = this.cssEditor.env.document.getValue();
        this.cssParser.parse(".reveal { " + i + " }", function (i, n) {
            if (i)
                this.errorElement.addClass("visible"), this.errorElement.html(i.message), t && t.call(null, i), this.cssParser = new less.Parser;
            else {
                this.errorElement.removeClass("visible");
                var o = n.toCSS(), r = "";
                o = o.replace(/@import url\(["'\s]*(http:|https:)?\/\/(.*)\);?/gi, function (e) {
                    return r += e + "\n", ""
                }), o = r + o, this.userCSSOutput.html(o), e && e.call(null, o)
            }
        }.bind(this)), this.currentCSSInput = i
    }, discard: function () {
        SLConfig.deck.css_input = this.savedCSSInput, SLConfig.deck.css_output = this.savedCSSOutput, this.userCSSOutput.html(SLConfig.deck.css_output || "")
    }, onInputChange: function () {
        clearTimeout(this.parseTimeout), this.parseTimeout = setTimeout(this.compile.bind(this), 500)
    }, onCancelClicked: function (e) {
        this.currentCSSInput !== this.savedCSSInput ? SL.prompt({
            anchor: $(e.currentTarget),
            title: "You will lose all unsaved changes.",
            alignment: "t",
            type: "select",
            data: [{html: "<h3>Cancel</h3>"}, {
                html: "<h3>Continue</h3>", className: "negative", callback: function () {
                    this.discard(), this.deactivate()
                }.bind(this)
            }]
        }) : (this.discard(), this.deactivate())
    }, onSaveClicked: function () {
        this.saveAndClose()
    }
}),
    SL("editor.modes").Fragment = SL.editor.modes.Base.extend({
    init: function (e) {
        this.deactivateOnSlideChange = !0, this._super(e, "fragment"), this.onFragmentMouseDown = this.onFragmentMouseDown.bind(this)
    }, render: function () {
        this._super();
        var e = "Fragments are invisible until stepped through when you present. Preview to see them in action. The numbers that appear on top of each fragment indicate the order they will appear in.";
        this.toolbar = $('<div class="mode-toolbar mode-toolbar-fragment"><div class="inner"><p class="description">Click on elements to turn them into <u data-tooltip="' + e + '" data-tooltip-alignment="b" data-tooltip-maxwidth="355">fragments</u>.</p><button class="button grey done">Done</button></div></div>').appendTo($(".projector"))
    }, bind: function () {
        this._super(), this.toolbar.find(".done").on("vclick", this.deactivate.bind(this))
    }, activate: function () {
        if (!this.isActive()) {
            var e = SL.editor.controllers.Capabilities.isTouchEditor(), t = $(Reveal.getCurrentSlide());
            this.overlays = $('<div class="fragment-overlay editing-ui">').appendTo(t), t.find(".sl-block-content").each(function (t, i) {
                i = $(i);
                var n = i.is("img, video, iframe");
                if (!(i.hasClass("editing-ui") || "" === i.get(0).innerHTML && !n || 1 === i.children().length && i.children().first().is("br") && !/\w/i.test(i.text()))) {
                    var o = i.find(">ul>li, >ol>li");
                    o.length > 0 && (i = i.add(o)), i.each(function (t, i) {
                        var n = $('<div class="editing-ui fragment-overlay-item"><div class="inner"><div class="controls-item move-down icon i-arrow-down"></div><div class="controls-item index" data-tooltip="This number represents the order in which the fragment will appear relative to other fragments." data-tooltip-alignment="r" data-tooltip-delay="500" data-tooltip-maxwidth="230"></div><div class="controls-item move-up icon i-arrow-up"></div></div></div>');
                        n.data("target-element", $(i)), e && n.addClass("show-without-hover"), this.overlays.append(n)
                    }.bind(this))
                }
            }.bind(this)), this.overlays.find(".fragment-overlay-item").on("vmousedown", this.onFragmentMouseDown), this.editor.disableEditing(), this.editor.slideOptions.collapse(), this.syncOverlays(), SL.analytics.trackEditor("Fragment mode"), this._super()
        }
    }, deactivate: function () {
        this.isActive() && (this.overlays.find(".fragment-overlay-item").off(), this.overlays.off().remove(), this.overlays = null, this.editor.enableEditing(), this._super())
    }, syncOverlays: function () {
        this.overlays.find(".fragment-overlay-item").each(function (e, t) {
            var i = $(t), n = i.data("target-element"), o = SL.util.getRevealElementOffset(n, !0), r = n.css("z-index"), s = n.parents(".sl-block-content").first();
            s.length && (r = s.css("z-index")), i.css({
                left: o.x,
                top: o.y,
                width: n.outerWidth(!0),
                height: n.outerHeight(!0),
                zIndex: r
            }), i.toggleClass("is-active", n.hasClass("fragment")), i.toggleClass("is-hidden", n.parents(".fragment").length > 0);
            var a = i.find(".index");
            a.length && a.html(n.attr("data-fragment-index"))
        });
        var e = $(Reveal.getCurrentSlide());
        this.overlays.attr("data-fragments-total", e.find(".fragment").length)
    }, toggleFragment: function (e) {
        e.hasClass("fragment") ? e.removeClass("fragment").removeAttr("data-fragment-index") : (e.addClass("fragment"), e.find(".fragment").removeClass("fragment").removeAttr("data-fragment-index"), e.parents(".fragment").removeClass("fragment").removeAttr("data-fragment-index")), Reveal.sync(), this.syncOverlays()
    }, changeFragmentIndex: function (e, t) {
        var i = this.overlays.find(".fragment-overlay-item"), n = parseInt(e.attr("data-fragment-index"), 10);
        n = isNaN(n) ? 0 : n, n += t, n = Math.max(Math.min(n, i.length + 1), 0), e.attr("data-fragment-index", n), this.syncOverlays()
    }, flattenFragmentIndices: function () {
        var e = this.overlays.find(".fragment-overlay-item");
        e.sort(function (e, t) {
            var i = parseInt(e.getAttribute("data-fragment-index"), 10), n = parseInt(t.getAttribute("data-fragment-index"), 10);
            return i = isNaN(i) ? -1 : i, n = isNaN(n) ? -1 : n, i - n
        }), e.each(function (e, t) {
            $(t).data("target-element").attr("data-fragment-index", e)
        }.bind(this))
    }, onFragmentMouseDown: function (e) {
        var t = $(e.currentTarget), i = t.data("target-element");
        return $(e.target).closest(".move-up").length ? this.changeFragmentIndex(i, 1) : $(e.target).closest(".move-down").length ? this.changeFragmentIndex(i, -1) : i && i.length && this.toggleFragment(i), !1
    }
}),
    SL("editor.modes").Preview = SL.editor.modes.Base.extend({
    init: function (e) {
        this._super(e, "preview"), $(".preview-controls-external").on("click", function () {
            SL.analytics.trackEditor("Open external preview")
        })
    }, activate: function () {
        Reveal.isOverview() && Reveal.toggleOverview(!1), this.editor.disableEditing(), this.editor.sidebar.close(), SL.analytics.trackEditor("Preview mode"), this._super(), Reveal.configure({
            progress: !0,
            overview: !1,
            touch: !0,
            fragments: !0,
            center: !1,
            autoSlide: SLConfig.deck.auto_slide_interval || 0
        });
        var e = Reveal.getIndices();
        Reveal.slide(e.h, e.v, -1), $(document.activeElement).blur(), "string" == typeof SLConfig.deck.slug && SLConfig.deck.slug.length > 0 ? $(".preview-controls-external").show().attr("href", SL.routes.DECK_LIVE(SLConfig.deck.user.username, SLConfig.deck.slug)) : $(".preview-controls-external").hide()
    }, deactivate: function () {
        this.editor.syncPageBackground(), this.editor.enableEditing(), this._super(), Reveal.configure({
            progress: !1,
            overview: !0,
            touch: !1,
            center: !1,
            fragments: !1,
            autoSlide: 0
        }), SL.util.layoutReveal(500)
    }
}),



/**
 * Test
 **/

SL("editor").Tests = {
    run: function () {
        var e = this.testOnboarding(), t = this.testBlocks();
        e && t && $("html").addClass("editor-tested-successfully")
    }, testOnboarding: function () {
        for (; SL.editor.controllers.Onboarding.tutorial.hasNextStep();)
            SL.editor.controllers.Onboarding.tutorial.next();
        return SL.editor.controllers.Onboarding.tutorial.next(), !0
    }, testBlocks: function () {
        var e = SL.editor.controllers.Blocks.add({type: "text"});
        e.destroy();
        var t = SL.editor.controllers.Blocks.add({type: "image"});
        t.destroy();
        var i = SL.editor.controllers.Blocks.add({type: "shape"});
        return i.move(100, 100), i.resize({width: 100, height: 100}), i.destroy(), !0
    }
};
