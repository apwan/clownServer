/**
 * Created by WuYijie on 1/8/15.
 */

// set up io
var io = "undefined" == typeof module ? {} : module.exports;

!function() {
    if (function(t, e) {
        var n = t;
        n.version = "0.9.16", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function(t, i) {
            var s, o, r = n.util.parseUri(t);
            e && e.location && (r.protocol = r.protocol || e.location.protocol.slice(0, -1), r.host = r.host || (e.document ? e.document.domain : e.location.hostname), r.port = r.port || e.location.port), s = n.util.uniqueUri(r);
            var a = {host: r.host,secure: "https" == r.protocol,port: r.port || ("https" == r.protocol ? 443 : 80),query: r.query || ""};
            return n.util.merge(a, i), (a["force new connection"] || !n.sockets[s]) && (o = new n.Socket(a)), !a["force new connection"] && o && (n.sockets[s] = o), o = o || n.sockets[s], o.of(r.path.length > 1 ? r.path : "")
        }
    }("object" == typeof module ? module.exports : this.io = {}, this), 
    function(t, e) {
        var n = t.util = {}, i = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, s = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        n.parseUri = function(t) {
            for (var e = i.exec(t || ""), n = {}, o = 14; o--; )
                n[s[o]] = e[o] || "";
            return n
        }, n.uniqueUri = function(t) {
            var n = t.protocol, i = t.host, s = t.port;
            return "document" in e ? (i = i || document.domain, s = s || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (i = i || "localhost", !s && "https" == n && (s = 443)), (n || "http") + "://" + i + ":" + (s || 80)
        }, n.query = function(t, e) {
            var i = n.chunkQuery(t || ""), s = [];
            n.merge(i, n.chunkQuery(e || ""));
            for (var o in i)
                i.hasOwnProperty(o) && s.push(o + "=" + i[o]);
            return s.length ? "?" + s.join("&") : ""
        }, n.chunkQuery = function(t) {
            for (var e, n = {}, i = t.split("&"), s = 0, o = i.length; o > s; ++s)
                e = i[s].split("="), e[0] && (n[e[0]] = e[1]);
            return n
        };
        var o = !1;
        n.load = function(t) {
            return "document" in e && "complete" === document.readyState || o ? t() : void n.on(e, "load", t, !1)
        }, n.on = function(t, e, n, i) {
            t.attachEvent ? t.attachEvent("on" + e, n) : t.addEventListener && t.addEventListener(e, n, i)
        }, n.request = function(t) {
            if (t && "undefined" != typeof XDomainRequest && !n.ua.hasCORS)
                return new XDomainRequest;
            if ("undefined" != typeof XMLHttpRequest && (!t || n.ua.hasCORS))
                return new XMLHttpRequest;
            if (!t)
                try {
                    return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (e) {
                }
            return null
        }, "undefined" != typeof window && n.load(function() {
            o = !0
        }), n.defer = function(t) {
            return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function() {
                setTimeout(t, 100)
            }) : t()
        }, n.merge = function(t, e, i, s) {
            var o, r = s || [], a = "undefined" == typeof i ? 2 : i;
            for (o in e)
                e.hasOwnProperty(o) && n.indexOf(r, o) < 0 && ("object" == typeof t[o] && a ? n.merge(t[o], e[o], a - 1, r) : (t[o] = e[o], r.push(e[o])));
            return t
        }, n.mixin = function(t, e) {
            n.merge(t.prototype, e.prototype)
        }, n.inherit = function(t, e) {
            function n() {
            }
            n.prototype = e.prototype, t.prototype = new n
        }, n.isArray = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }, n.intersect = function(t, e) {
            for (var i = [], s = t.length > e.length ? t : e, o = t.length > e.length ? e : t, r = 0, a = o.length; a > r; r++)
                ~n.indexOf(s, o[r]) && i.push(o[r]);
            return i
        }, n.indexOf = function(t, e, n) {
            for (var i = t.length, n = 0 > n ? 0 > n + i ? 0 : n + i : n || 0; i > n && t[n] !== e; n++)
                ;
            return n >= i ? -1 : n
        }, n.toArray = function(t) {
            for (var e = [], n = 0, i = t.length; i > n; n++)
                e.push(t[n]);
            return e
        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
            try {
                var t = new XMLHttpRequest
            } catch (e) {
                return !1
            }
            return void 0 != t.withCredentials
        }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
    }("undefined" != typeof io ? io : module.exports, this), 
    function(t, e) {
        function n() {
        }
        t.EventEmitter = n, n.prototype.on = function(t, n) {
            return this.$events || (this.$events = {}), this.$events[t] ? e.util.isArray(this.$events[t]) ? this.$events[t].push(n) : this.$events[t] = [this.$events[t], n] : this.$events[t] = n, this
        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function(t, e) {
            function n() {
                i.removeListener(t, n), e.apply(this, arguments)
            }
            var i = this;
            return n.listener = e, this.on(t, n), this
        }, n.prototype.removeListener = function(t, n) {
            if (this.$events && this.$events[t]) {
                var i = this.$events[t];
                if (e.util.isArray(i)) {
                    for (var s = -1, o = 0, r = i.length; r > o; o++)
                        if (i[o] === n || i[o].listener && i[o].listener === n) {
                            s = o;
                            break
                        }
                    if (0 > s)
                        return this;
                    i.splice(s, 1), i.length || delete this.$events[t]
                } else
                    (i === n || i.listener && i.listener === n) && delete this.$events[t]
            }
            return this
        }, n.prototype.removeAllListeners = function(t) {
            return void 0 === t ? (this.$events = {}, this) : (this.$events && this.$events[t] && (this.$events[t] = null), this)
        }, n.prototype.listeners = function(t) {
            return this.$events || (this.$events = {}), this.$events[t] || (this.$events[t] = []), e.util.isArray(this.$events[t]) || (this.$events[t] = [this.$events[t]]), this.$events[t]
        }, n.prototype.emit = function(t) {
            if (!this.$events)
                return !1;
            var n = this.$events[t];
            if (!n)
                return !1;
            var i = Array.prototype.slice.call(arguments, 1);
            if ("function" == typeof n)
                n.apply(this, i);
            else {
                if (!e.util.isArray(n))
                    return !1;
                for (var s = n.slice(), o = 0, r = s.length; r > o; o++)
                    s[o].apply(this, i)
            }
            return !0
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), 
    function(exports, nativeJSON) {
        function f(t) {
            return 10 > t ? "0" + t : t
        }
        function date(t) {
            return isFinite(t.valueOf()) ? t.getUTCFullYear() + "-" + f(t.getUTCMonth() + 1) + "-" + f(t.getUTCDate()) + "T" + f(t.getUTCHours()) + ":" + f(t.getUTCMinutes()) + ":" + f(t.getUTCSeconds()) + "Z" : null
        }
        function quote(t) {
            return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
                var e = meta[t];
                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + t + '"'
        }
        function str(t, e) {
            var n, i, s, o, r, a = gap, l = e[t];
            switch (l instanceof Date && (l = date(t)), "function" == typeof rep && (l = rep.call(e, t, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l)
                        return "null";
                    if (gap += indent, r = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (o = l.length, n = 0; o > n; n += 1)
                            r[n] = str(n, l) || "null";
                        return s = 0 === r.length ? "[]" : gap ? "[\n" + gap + r.join(",\n" + gap) + "\n" + a + "]" : "[" + r.join(",") + "]", gap = a, s
                    }
                    if (rep && "object" == typeof rep)
                        for (o = rep.length, n = 0; o > n; n += 1)
                            "string" == typeof rep[n] && (i = rep[n], s = str(i, l), s && r.push(quote(i) + (gap ? ": " : ":") + s));
                    else
                        for (i in l)
                            Object.prototype.hasOwnProperty.call(l, i) && (s = str(i, l), s && r.push(quote(i) + (gap ? ": " : ":") + s));
                    return s = 0 === r.length ? "{}" : gap ? "{\n" + gap + r.join(",\n" + gap) + "\n" + a + "}" : "{" + r.join(",") + "}", gap = a, s
            }
        }
        if (nativeJSON && nativeJSON.parse)
            return exports.JSON = {parse: nativeJSON.parse,stringify: nativeJSON.stringify};
        var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b","	": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, rep;
        JSON.stringify = function(t, e, n) {
            var i;
            if (gap = "", indent = "", "number" == typeof n)
                for (i = 0; n > i; i += 1)
                    indent += " ";
            else
                "string" == typeof n && (indent = n);
            if (rep = e, !e || "function" == typeof e || "object" == typeof e && "number" == typeof e.length)
                return str("", {"": t});
            throw new Error("JSON.stringify")
        }, JSON.parse = function(text, reviver) {
            function walk(t, e) {
                var n, i, s = t[e];
                if (s && "object" == typeof s)
                    for (n in s)
                        Object.prototype.hasOwnProperty.call(s, n) && (i = walk(s, n), void 0 !== i ? s[n] = i : delete s[n]);
                return reviver.call(t, e, s)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), 


    function(t, e) {
        var n = t.parser = {}, i = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"], s = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"], o = n.advice = ["reconnect"], r = e.JSON, a = e.util.indexOf;
        n.encodePacket = function(t) {
            var e = a(i, t.type), n = t.id || "", l = t.endpoint || "", c = t.ack, u = null;
            switch (t.type) {
                case "error":
                    var d = t.reason ? a(s, t.reason) : "", h = t.advice ? a(o, t.advice) : "";
                    ("" !== d || "" !== h) && (u = d + ("" !== h ? "+" + h : ""));
                    break;
                case "message":
                    "" !== t.data && (u = t.data);
                    break;
                case "event":
                    var p = {name: t.name};
                    t.args && t.args.length && (p.args = t.args), u = r.stringify(p);
                    break;
                case "json":
                    u = r.stringify(t.data);
                    break;
                case "connect":
                    t.qs && (u = t.qs);
                    break;
                case "ack":
                    u = t.ackId + (t.args && t.args.length ? "+" + r.stringify(t.args) : "")
            }
            var f = [e, n + ("data" == c ? "+" : ""), l];
            return null !== u && void 0 !== u && f.push(u), f.join(":")
        }, n.encodePayload = function(t) {
            var e = "";
            if (1 == t.length)
                return t[0];
            for (var n = 0, i = t.length; i > n; n++) {
                var s = t[n];
                e += "\ufffd" + s.length + "\ufffd" + t[n]
            }
            return e
        };
        var l = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
        n.decodePacket = function(t) {
            var e = t.match(l);
            if (!e)
                return {};
            var n = e[2] || "", t = e[5] || "", a = {type: i[e[1]],endpoint: e[4] || ""};
            switch (n && (a.id = n, a.ack = e[3] ? "data" : !0), a.type) {
                case "error":
                    var e = t.split("+");
                    a.reason = s[e[0]] || "", a.advice = o[e[1]] || "";
                    break;
                case "message":
                    a.data = t || "";
                    break;
                case "event":
                    try {
                        var c = r.parse(t);
                        a.name = c.name, a.args = c.args
                    } catch (u) {
                    }
                    a.args = a.args || [];
                    break;
                case "json":
                    try {
                        a.data = r.parse(t)
                    } catch (u) {
                    }
                    break;
                case "connect":
                    a.qs = t || "";
                    break;
                case "ack":
                    var e = t.match(/^([0-9]+)(\+)?(.*)/);
                    if (e && (a.ackId = e[1], a.args = [], e[3]))
                        try {
                            a.args = e[3] ? r.parse(e[3]) : []
                        } catch (u) {
                        }
                    break;
                case "disconnect":
                case "heartbeat":
            }
            return a
        }, n.decodePayload = function(t) {
            if ("\ufffd" == t.charAt(0)) {
                for (var e = [], i = 1, s = ""; i < t.length; i++)
                    "\ufffd" == t.charAt(i) ? (e.push(n.decodePacket(t.substr(i + 1).substr(0, s))), i += Number(s) + 1, s = "") : s += t.charAt(i);
                return e
            }
            return [n.decodePacket(t)]
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), 
    function(t, e) {
        function n(t, e) {
            this.socket = t, this.sessid = e
        }
        t.Transport = n, e.util.mixin(n, e.EventEmitter), n.prototype.heartbeats = function() {
            return !0
        }, n.prototype.onData = function(t) {
            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== t) {
                var n = e.parser.decodePayload(t);
                if (n && n.length)
                    for (var i = 0, s = n.length; s > i; i++)
                        this.onPacket(n[i])
            }
            return this
        }, n.prototype.onPacket = function(t) {
            return this.socket.setHeartbeatTimeout(), "heartbeat" == t.type ? this.onHeartbeat() : ("connect" == t.type && "" == t.endpoint && this.onConnect(), "error" == t.type && "reconnect" == t.advice && (this.isOpen = !1), this.socket.onPacket(t), this)
        }, n.prototype.setCloseTimeout = function() {
            if (!this.closeTimeout) {
                var t = this;
                this.closeTimeout = setTimeout(function() {
                    t.onDisconnect()
                }, this.socket.closeTimeout)
            }
        }, n.prototype.onDisconnect = function() {
            return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
        }, n.prototype.onConnect = function() {
            return this.socket.onConnect(), this
        }, n.prototype.clearCloseTimeout = function() {
            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
        }, n.prototype.clearTimeouts = function() {
            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
        }, n.prototype.packet = function(t) {
            this.send(e.parser.encodePacket(t))
        }, n.prototype.onHeartbeat = function() {
            this.packet({type: "heartbeat"})
        }, n.prototype.onOpen = function() {
            this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
        }, n.prototype.onClose = function() {
            this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
        }, n.prototype.prepareUrl = function() {
            var t = this.socket.options;
            return this.scheme() + "://" + t.host + ":" + t.port + "/" + t.resource + "/" + e.protocol + "/" + this.name + "/" + this.sessid
        }, n.prototype.ready = function(t, e) {
            e.call(this)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), 


    function(t, e, n) {
        function i(t) {
            if (this.options = {port: 80,secure: !1,document: "document" in n ? document : !1,resource: "socket.io",transports: e.transports,"connect timeout": 1e4,"try multiple transports": !0,reconnect: !0,"reconnection delay": 500,"reconnection limit": 1 / 0,"reopen delay": 3e3,"max reconnection attempts": 10,"sync disconnect on unload": !1,"auto connect": !0,"flash policy port": 10843,manualFlush: !1}, e.util.merge(this.options, t), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || e.util.ua.hasCORS)) {
                var i = this;
                e.util.on(n, "beforeunload", function() {
                    i.disconnectSync()
                }, !1)
            }
            this.options["auto connect"] && this.connect()
        }
        function s() {
        }
        t.Socket = i, e.util.mixin(i, e.EventEmitter), i.prototype.of = function(t) {
            return this.namespaces[t] || (this.namespaces[t] = new e.SocketNamespace(this, t), "" !== t && this.namespaces[t].packet({type: "connect"})), this.namespaces[t]
        }, i.prototype.publish = function() {
            this.emit.apply(this, arguments);
            var t;
            for (var e in this.namespaces)
                this.namespaces.hasOwnProperty(e) && (t = this.of(e), t.$emit.apply(t, arguments))
        }, i.prototype.handshake = function(t) {
            function n(e) {
                e instanceof Error ? (i.connecting = !1, i.onError(e.message)) : t.apply(null, e.split(":"))
            }
            var i = this, o = this.options, r = ["http" + (o.secure ? "s" : "") + ":/", o.host + ":" + o.port, o.resource, e.protocol, e.util.query(this.options.query, "t=" + +new Date)].join("/");
            if (this.isXDomain() && !e.util.ua.hasCORS) {
                var a = document.getElementsByTagName("script")[0], l = document.createElement("script");
                l.src = r + "&jsonp=" + e.j.length, a.parentNode.insertBefore(l, a), e.j.push(function(t) {
                    n(t), l.parentNode.removeChild(l)
                })
            } else {
                var c = e.util.request();
                c.open("GET", r, !0), this.isXDomain() && (c.withCredentials = !0), c.onreadystatechange = function() {
                    4 == c.readyState && (c.onreadystatechange = s, 200 == c.status ? n(c.responseText) : 403 == c.status ? i.onError(c.responseText) : (i.connecting = !1, !i.reconnecting && i.onError(c.responseText)))
                }, c.send(null)
            }
        }, i.prototype.getTransport = function(t) {
            for (var n, i = t || this.transports, s = 0; n = i[s]; s++)
                if (e.Transport[n] && e.Transport[n].check(this) && (!this.isXDomain() || e.Transport[n].xdomainCheck(this)))
                    return new e.Transport[n](this, this.sessionid);
            return null
        }, i.prototype.connect = function(t) {
            if (this.connecting)
                return this;
            var n = this;
            return n.connecting = !0, this.handshake(function(i, s, o, r) {
                function a(t) {
                    return n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(t), n.transport ? void n.transport.ready(n, function() {
                        n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
                            if (!n.connected && (n.connecting = !1, n.options["try multiple transports"])) {
                                for (var t = n.transports; t.length > 0 && t.splice(0, 1)[0] != n.transport.name; )
                                    ;
                                t.length ? a(t) : n.publish("connect_failed")
                            }
                        }, n.options["connect timeout"]))
                    }) : n.publish("connect_failed")
                }
                n.sessionid = i, n.closeTimeout = 1e3 * o, n.heartbeatTimeout = 1e3 * s, n.transports || (n.transports = n.origTransports = r ? e.util.intersect(r.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), a(n.transports), n.once("connect", function() {
                    clearTimeout(n.connectTimeoutTimer), t && "function" == typeof t && t()
                })
            }), this
        }, i.prototype.setHeartbeatTimeout = function() {
            if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                var t = this;
                this.heartbeatTimeoutTimer = setTimeout(function() {
                    t.transport.onClose()
                }, this.heartbeatTimeout)
            }
        }, i.prototype.packet = function(t) {
            return this.connected && !this.doBuffer ? this.transport.packet(t) : this.buffer.push(t), this
        }, i.prototype.setBuffer = function(t) {
            this.doBuffer = t, !t && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
        }, i.prototype.flushBuffer = function() {
            this.transport.payload(this.buffer), this.buffer = []
        }, i.prototype.disconnect = function() {
            return (this.connected || this.connecting) && (this.open && this.of("").packet({type: "disconnect"}), this.onDisconnect("booted")), this
        }, i.prototype.disconnectSync = function() {
            var t = e.util.request(), n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, e.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
            t.open("GET", n, !1), t.send(null), this.onDisconnect("booted")
        }, i.prototype.isXDomain = function() {
            var t = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
            return this.options.host !== n.location.hostname || this.options.port != t
        }, i.prototype.onConnect = function() {
            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
        }, i.prototype.onOpen = function() {
            this.open = !0
        }, i.prototype.onClose = function() {
            this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
        }, i.prototype.onPacket = function(t) {
            this.of(t.endpoint).onPacket(t)
        }, i.prototype.onError = function(t) {
            t && t.advice && "reconnect" === t.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", t && t.reason ? t.reason : t)
        }, i.prototype.onDisconnect = function(t) {
            var e = this.connected, n = this.connecting;
            this.connected = !1, this.connecting = !1, this.open = !1, (e || n) && (this.transport.close(), this.transport.clearTimeouts(), e && (this.publish("disconnect", t), "booted" != t && this.options.reconnect && !this.reconnecting && this.reconnect()))
        }, i.prototype.reconnect = function() {
            function t() {
                if (n.connected) {
                    for (var t in n.namespaces)
                        n.namespaces.hasOwnProperty(t) && "" !== t && n.namespaces[t].packet({type: "connect"});
                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                }
                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", e), n.removeListener("connect", e), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = s
            }
            function e() {
                return n.reconnecting ? n.connected ? t() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(e, 1e3) : void (n.reconnectionAttempts++ >= i ? n.redoTransports ? (n.publish("reconnect_failed"), t()) : (n.on("connect_failed", e), n.options["try multiple transports"] = !0, n.transports = n.origTransports, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < o && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(e, n.reconnectionDelay))) : void 0
            }
            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
            var n = this, i = this.options["max reconnection attempts"], s = this.options["try multiple transports"], o = this.options["reconnection limit"];
            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(e, this.reconnectionDelay), this.on("connect", e)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), 

    function(t, e) {
        function n(t, e) {
            this.socket = t, this.name = e || "", this.flags = {}, this.json = new i(this, "json"), this.ackPackets = 0, this.acks = {}
        }
        function i(t, e) {
            this.namespace = t, this.name = e
        }
        t.SocketNamespace = n, e.util.mixin(n, e.EventEmitter), n.prototype.$emit = e.EventEmitter.prototype.emit, n.prototype.of = function() {
            return this.socket.of.apply(this.socket, arguments)
        }, n.prototype.packet = function(t) {
            return t.endpoint = this.name, this.socket.packet(t), this.flags = {}, this
        }, n.prototype.send = function(t, e) {
            var n = {type: this.flags.json ? "json" : "message",data: t};
            return "function" == typeof e && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = e), this.packet(n)
        }, n.prototype.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1), n = e[e.length - 1], i = {type: "event",name: t};
            return "function" == typeof n && (i.id = ++this.ackPackets, i.ack = "data", this.acks[i.id] = n, e = e.slice(0, e.length - 1)), i.args = e, this.packet(i)
        }, n.prototype.disconnect = function() {
            return "" === this.name ? this.socket.disconnect() : (this.packet({type: "disconnect"}), this.$emit("disconnect")), this
        }, n.prototype.onPacket = function(t) {
            function n() {
                i.packet({type: "ack",args: e.util.toArray(arguments),ackId: t.id})
            }
            var i = this;
            switch (t.type) {
                case "connect":
                    this.$emit("connect");
                    break;
                case "disconnect":
                    "" === this.name ? this.socket.onDisconnect(t.reason || "booted") : this.$emit("disconnect", t.reason);
                    break;
                case "message":
                case "json":
                    var s = ["message", t.data];
                    "data" == t.ack ? s.push(n) : t.ack && this.packet({type: "ack",ackId: t.id}), this.$emit.apply(this, s);
                    break;
                case "event":
                    var s = [t.name].concat(t.args);
                    "data" == t.ack && s.push(n), this.$emit.apply(this, s);
                    break;
                case "ack":
                    this.acks[t.ackId] && (this.acks[t.ackId].apply(this, t.args), delete this.acks[t.ackId]);
                    break;
                case "error":
                    t.advice ? this.socket.onError(t) : "unauthorized" == t.reason ? this.$emit("connect_failed", t.reason) : this.$emit("error", t.reason)
            }
        }, i.prototype.send = function() {
            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
        }, i.prototype.emit = function() {
            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), 

    function(t, e, n) {
        function i() {
            e.Transport.apply(this, arguments)
        }
        t.websocket = i, e.util.inherit(i, e.Transport), i.prototype.name = "websocket", i.prototype.open = function() {
            var t, i = e.util.query(this.socket.options.query), s = this;
            return t || (t = n.MozWebSocket || n.WebSocket), this.websocket = new t(this.prepareUrl() + i), this.websocket.onopen = function() {
                s.onOpen(), s.socket.setBuffer(!1)
            }, this.websocket.onmessage = function(t) {
                s.onData(t.data)
            }, this.websocket.onclose = function() {
                s.onClose(), s.socket.setBuffer(!0)
            }, this.websocket.onerror = function(t) {
                s.onError(t)
            }, this
        }, i.prototype.send = e.util.ua.iDevice ? function(t) {
            var e = this;
            return setTimeout(function() {
                e.websocket.send(t)
            }, 0), this
        } : function(t) {
            return this.websocket.send(t), this
        }, i.prototype.payload = function(t) {
            for (var e = 0, n = t.length; n > e; e++)
                this.packet(t[e]);
            return this
        }, i.prototype.close = function() {
            return this.websocket.close(), this
        }, i.prototype.onError = function(t) {
            this.socket.onError(t)
        }, i.prototype.scheme = function() {
            return this.socket.options.secure ? "wss" : "ws"
        }, i.check = function() {
            return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
        }, i.xdomainCheck = function() {
            return !0
        }, e.transports.push("websocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), 
    function(t, e) {
        function n() {
            e.Transport.websocket.apply(this, arguments)
        }
        t.flashsocket = n, e.util.inherit(n, e.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
            var t = this, n = arguments;
            return WebSocket.__addTask(function() {
                e.Transport.websocket.prototype.open.apply(t, n)
            }), this
        }, n.prototype.send = function() {
            var t = this, n = arguments;
            return WebSocket.__addTask(function() {
                e.Transport.websocket.prototype.send.apply(t, n)
            }), this
        }, n.prototype.close = function() {
            return WebSocket.__tasks.length = 0, e.Transport.websocket.prototype.close.call(this), this
        }, n.prototype.ready = function(t, i) {
            function s() {
                var e = t.options, s = e["flash policy port"], r = ["http" + (e.secure ? "s" : "") + ":/", e.host + ":" + e.port, e.resource, "static/flashsocket", "WebSocketMain" + (t.isXDomain() ? "Insecure" : "") + ".swf"];
                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = r.join("/")), 843 !== s && WebSocket.loadFlashPolicyFile("xmlsocket://" + e.host + ":" + s), WebSocket.__initialize(), n.loaded = !0), i.call(o)
            }
            var o = this;
            return document.body ? s() : void e.util.load(s)
        }, n.check = function() {
            return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
        }, n.xdomainCheck = function() {
            return !0
        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), e.transports.push("flashsocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window)
        

/**

*/



    var swfobject = function() { 
            function t() {
                if (!z) {
                    try {
                        var t = P.getElementsByTagName("body")[0].appendChild(g("span"));
                        t.parentNode.removeChild(t)
                    } catch (e) {
                        return
                    }
                    z = !0;
                    for (var n = U.length, i = 0; n > i; i++)
                        U[i]()
                }
            }
            function e(t) {
                z ? t() : U[U.length] = t
            }
            function n(t) {
                if (typeof O.addEventListener != x)
                    O.addEventListener("load", t, !1);
                else if (typeof P.addEventListener != x)
                    P.addEventListener("load", t, !1);
                else if (typeof O.attachEvent != x)
                    v(O, "onload", t);
                else if ("function" == typeof O.onload) {
                    var e = O.onload;
                    O.onload = function() {
                        e(), t()
                    }
                } else
                    O.onload = t
            }
            function i() {
                j ? s() : o()
            }
            function s() {
                var t = P.getElementsByTagName("body")[0], e = g(A);
                e.setAttribute("type", M);
                var n = t.appendChild(e);
                if (n) {
                    var i = 0;
                    !function() {
                        if (typeof n.GetVariable != x) {
                            var s = n.GetVariable("$version");
                            s && (s = s.split(" ")[1].split(","), Y.pv = [parseInt(s[0], 10), parseInt(s[1], 10), parseInt(s[2], 10)])
                        } else if (10 > i)
                            return i++, void setTimeout(arguments.callee, 10);
                        t.removeChild(e), n = null, o()
                    }()
                } else
                    o()
            }
            function o() {
                var t = H.length;
                if (t > 0)
                    for (var e = 0; t > e; e++) {
                        var n = H[e].id, i = H[e].callbackFn, s = {success: !1,id: n};
                        if (Y.pv[0] > 0) {
                            var o = m(n);
                            if (o)
                                if (!y(H[e].swfVersion) || Y.wk && Y.wk < 312)
                                    if (H[e].expressInstall && a()) {
                                        var u = {};
                                        u.data = H[e].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
                                        for (var d = {}, h = o.getElementsByTagName("param"), p = h.length, f = 0; p > f; f++)
                                            "movie" != h[f].getAttribute("name").toLowerCase() && (d[h[f].getAttribute("name")] = h[f].getAttribute("value"));
                                        l(u, d, n, i)
                                    } else
                                        c(o), i && i(s);
                                else
                                    S(n, !0), i && (s.success = !0, s.ref = r(n), i(s))
                        } else if (S(n, !0), i) {
                            var g = r(n);
                            g && typeof g.SetVariable != x && (s.success = !0, s.ref = g), i(s)
                        }
                    }
            }
            function r(t) {
                var e = null, n = m(t);
                if (n && "OBJECT" == n.nodeName)
                    if (typeof n.SetVariable != x)
                        e = n;
                    else {
                        var i = n.getElementsByTagName(A)[0];
                        i && (e = i)
                    }
                return e
            }
            function a() {
                return !V && y("6.0.65") && (Y.win || Y.mac) && !(Y.wk && Y.wk < 312)
            }
            function l(t, e, n, i) {
                V = !0, _ = i || null, k = {success: !1,id: n};
                var s = m(n);
                if (s) {
                    "OBJECT" == s.nodeName ? (T = u(s), w = null) : (T = s, w = n), t.id = R, (typeof t.width == x || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) && (t.width = "310"), (typeof t.height == x || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) && (t.height = "137"), P.title = P.title.slice(0, 47) + " - Flash Player Installation";
                    var o = Y.ie && Y.win ? ["Active"].concat("").join("X") : "PlugIn", r = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + o + "&MMdoctitle=" + P.title;
                    if (typeof e.flashvars != x ? e.flashvars += "&" + r : e.flashvars = r, Y.ie && Y.win && 4 != s.readyState) {
                        var a = g("div");
                        n += "SWFObjectNew", a.setAttribute("id", n), s.parentNode.insertBefore(a, s), s.style.display = "none", function() {
                            4 == s.readyState ? s.parentNode.removeChild(s) : setTimeout(arguments.callee, 10)
                        }()
                    }
                    d(t, e, n)
                }
            }
            function c(t) {
                if (Y.ie && Y.win && 4 != t.readyState) {
                    var e = g("div");
                    t.parentNode.insertBefore(e, t), e.parentNode.replaceChild(u(t), e), t.style.display = "none", function() {
                        4 == t.readyState ? t.parentNode.removeChild(t) : setTimeout(arguments.callee, 10)
                    }()
                } else
                    t.parentNode.replaceChild(u(t), t)
            }
            function u(t) {
                var e = g("div");
                if (Y.win && Y.ie)
                    e.innerHTML = t.innerHTML;
                else {
                    var n = t.getElementsByTagName(A)[0];
                    if (n) {
                        var i = n.childNodes;
                        if (i)
                            for (var s = i.length, o = 0; s > o; o++)
                                (1 != i[o].nodeType || "PARAM" != i[o].nodeName) && 8 != i[o].nodeType && e.appendChild(i[o].cloneNode(!0))
                    }
                }
                return e
            }
            function d(t, e, n) {
                var i, s = m(n);
                if (Y.wk && Y.wk < 312)
                    return i;
                if (s)
                    if (typeof t.id == x && (t.id = n), Y.ie && Y.win) {
                        var o = "";
                        for (var r in t)
                            t[r] != Object.prototype[r] && ("data" == r.toLowerCase() ? e.movie = t[r] : "styleclass" == r.toLowerCase() ? o += ' class="' + t[r] + '"' : "classid" != r.toLowerCase() && (o += " " + r + '="' + t[r] + '"'));
                        var a = "";
                        for (var l in e)
                            e[l] != Object.prototype[l] && (a += '<param name="' + l + '" value="' + e[l] + '" />');

                        // set object id
                        s.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + o + ">" + a + "</object>", B[B.length] = t.id, i = m(t.id)
                    } else {
                        var c = g(A);
                        c.setAttribute("type", M);
                        for (var u in t)
                            t[u] != Object.prototype[u] && ("styleclass" == u.toLowerCase() ? c.setAttribute("class", t[u]) : "classid" != u.toLowerCase() && c.setAttribute(u, t[u]));
                        for (var d in e)
                            e[d] != Object.prototype[d] && "movie" != d.toLowerCase() && h(c, d, e[d]);
                        s.parentNode.replaceChild(c, s), i = c
                    }
                return i
            }
            function h(t, e, n) {
                var i = g("param");
                i.setAttribute("name", e), i.setAttribute("value", n), t.appendChild(i)
            }
            function p(t) {
                var e = m(t);
                e && "OBJECT" == e.nodeName && (Y.ie && Y.win ? (e.style.display = "none", function() {
                    4 == e.readyState ? f(t) : setTimeout(arguments.callee, 10)
                }()) : e.parentNode.removeChild(e))
            }
            function f(t) {
                var e = m(t);
                if (e) {
                    for (var n in e)
                        "function" == typeof e[n] && (e[n] = null);
                    e.parentNode.removeChild(e)
                }
            }
            function m(t) {
                var e = null;
                try {
                    e = P.getElementById(t)
                } catch (n) {
                }
                return e
            }
            function g(t) {
                return P.createElement(t)
            }
            function v(t, e, n) {
                t.attachEvent(e, n), F[F.length] = [t, e, n]
            }
            function y(t) {
                var e = Y.pv, n = t.split(".");
                return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, e[0] > n[0] || e[0] == n[0] && e[1] > n[1] || e[0] == n[0] && e[1] == n[1] && e[2] >= n[2] ? !0 : !1
            }
            function b(t, e, n, i) {
                if (!Y.ie || !Y.mac) {
                    var s = P.getElementsByTagName("head")[0];
                    if (s) {
                        var o = n && "string" == typeof n ? n : "screen";
                        if (i && (L = null, C = null), !L || C != o) {
                            var r = g("style");
                            r.setAttribute("type", "text/css"), r.setAttribute("media", o), L = s.appendChild(r), Y.ie && Y.win && typeof P.styleSheets != x && P.styleSheets.length > 0 && (L = P.styleSheets[P.styleSheets.length - 1]), C = o
                        }
                        Y.ie && Y.win ? L && typeof L.addRule == A && L.addRule(t, e) : L && typeof P.createTextNode != x && L.appendChild(P.createTextNode(t + " {" + e + "}"))
                    }
                }
            }
            function S(t, e) {
                if (W) {
                    var n = e ? "visible" : "hidden";
                    z && m(t) ? m(t).style.visibility = n : b("#" + t, "visibility:" + n)
                }
            }
            function E(t) {
                var e = /[\\\"<>\.;]/, n = null != e.exec(t);
                return n && typeof encodeURIComponent != x ? encodeURIComponent(t) : t
            }

            {
                var T, w, _, k, L, C, x = "undefined", A = "object", I = "Shockwave Flash", D = "ShockwaveFlash.ShockwaveFlash", M = "application/x-shockwave-flash", R = "SWFObjectExprInst", N = "onreadystatechange", O = window, P = document, $ = navigator, j = !1, U = [i], H = [], B = [], F = [], z = !1, V = !1, W = !0, 
                Y = function() {
                    var t = typeof P.getElementById != x && typeof P.getElementsByTagName != x && typeof P.createElement != x, e = $.userAgent.toLowerCase(), n = $.platform.toLowerCase(), i = /win/.test(n ? n : e), s = /mac/.test(n ? n : e), o = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, r = !1, a = [0, 0, 0], l = null;
                    if (typeof $.plugins != x && typeof $.plugins[I] == A)
                        l = $.plugins[I].description, l && (typeof $.mimeTypes == x || !$.mimeTypes[M] || !!$.mimeTypes[M].enabledPlugin) && (j = !0, r = !1, l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                    else if (typeof O[["Active"].concat("Object").join("X")] != x)
                        try {
                            var c = new (window[["Active"].concat("Object").join("X")])(D);
                            c && (l = c.GetVariable("$version"), l && (r = !0, l = l.split(" ")[1].split(","), a = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)]))
                        } catch (u) {}
                    return {w3: t,pv: a,wk: o,ie: r,win: i,mac: s}
                }();

                !function() {
                    Y.w3 && ((typeof P.readyState != x && "complete" == P.readyState || typeof P.readyState == x && (P.getElementsByTagName("body")[0] || P.body)) && t(), z || (typeof P.addEventListener != x && P.addEventListener("DOMContentLoaded", t, !1), Y.ie && Y.win && (P.attachEvent(N, function() {
                        "complete" == P.readyState && (P.detachEvent(N, arguments.callee), t())
                    }), O == top && function() {
                        if (!z) {
                            try {
                                P.documentElement.doScroll("left")
                            } catch (e) {
                                return void setTimeout(arguments.callee, 0)
                            }
                            t()
                        }
                    }()), Y.wk && function() {
                        return z ? void 0 : /loaded|complete/.test(P.readyState) ? void t() : void setTimeout(arguments.callee, 0)
                    }(), n(t)))
                }(), 
                function() {
                    Y.ie && Y.win && window.attachEvent("onunload", function() {
                        for (var t = F.length, e = 0; t > e; e++)
                            F[e][0].detachEvent(F[e][1], F[e][2]);
                        for (var n = B.length, i = 0; n > i; i++)
                            p(B[i]);
                        for (var s in Y)
                            Y[s] = null;
                        Y = null;
                        for (var o in swfobject)
                            swfobject[o] = null;
                        swfobject = null
                    })
                }()
            }
            return {registerObject: function(t, e, n, i) {
                    if (Y.w3 && t && e) {
                        var s = {};
                        s.id = t, s.swfVersion = e, s.expressInstall = n, s.callbackFn = i, H[H.length] = s, S(t, !1)
                    } else
                        i && i({success: !1,id: t})
                },getObjectById: function(t) {
                    return Y.w3 ? r(t) : void 0
                },embedSWF: function(t, n, i, s, o, r, c, u, h, p) {
                    var f = {success: !1,id: n};
                    Y.w3 && !(Y.wk && Y.wk < 312) && t && n && i && s && o ? (S(n, !1), e(function() {
                        i += "", s += "";
                        var e = {};
                        if (h && typeof h === A)
                            for (var m in h)
                                e[m] = h[m];
                        e.data = t, e.width = i, e.height = s;
                        var g = {};
                        if (u && typeof u === A)
                            for (var v in u)
                                g[v] = u[v];
                        if (c && typeof c === A)
                            for (var b in c)
                                typeof g.flashvars != x ? g.flashvars += "&" + b + "=" + c[b] : g.flashvars = b + "=" + c[b];
                        if (y(o)) {
                            var E = d(e, g, n);
                            e.id == n && S(n, !0), f.success = !0, f.ref = E
                        } else {
                            if (r && a())
                                return e.data = r, void l(e, g, n, p);
                            S(n, !0)
                        }
                        p && p(f)
                    })) : p && p(f)
                },switchOffAutoHideShow: function() {
                    W = !1
                },ua: Y,getFlashPlayerVersion: function() {
                    return {major: Y.pv[0],minor: Y.pv[1],release: Y.pv[2]}
                },hasFlashPlayerVersion: y,createSWF: function(t, e, n) {
                    return Y.w3 ? d(t, e, n) : void 0
                },showExpressInstall: function(t, e, n, i) {
                    Y.w3 && a() && l(t, e, n, i)
                },removeSWF: function(t) {
                    Y.w3 && p(t)
                },createCSS: function(t, e, n, i) {
                    Y.w3 && b(t, e, n, i)
                },addDomLoadEvent: e,addLoadEvent: n,getQueryParamValue: function(t) {
                    var e = P.location.search || P.location.hash;
                    if (e) {
                        if (/\?/.test(e) && (e = e.split("?")[1]), null == t)
                            return E(e);
                        for (var n = e.split("&"), i = 0; i < n.length; i++)
                            if (n[i].substring(0, n[i].indexOf("=")) == t)
                                return E(n[i].substring(n[i].indexOf("=") + 1))
                    }
                    return ""
                },expressInstallCallback: function() {
                    if (V) {
                        var t = m(R);
                        t && T && (t.parentNode.replaceChild(T, t), w && (S(w, !0), Y.ie && Y.win && (T.style.display = "block")), _ && _(k)), V = !1
                    }
                }
            }
        }();  // get swfobject

    !function() {
        if ("undefined" != typeof window && !window.WebSocket) {
            var t = window.console;
            return t && t.log && t.error || (t = {log: function() {},error: function() {}}), 
            swfobject.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && t.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(t, e, n, i, s) {
                var o = this;
                o.__id = WebSocket.__nextId++, WebSocket.__instances[o.__id] = o, o.readyState = WebSocket.CONNECTING, o.bufferedAmount = 0, o.__events = {}, e ? "string" == typeof e && (e = [e]) : e = [], setTimeout(function() {
                    WebSocket.__addTask(function() {
                        WebSocket.__flash.create(o.__id, t, e, n || null, i || 0, s || null)
                    })
                }, 0)
            }, WebSocket.prototype.send = function(t) {
                if (this.readyState == WebSocket.CONNECTING)
                    throw "INVALID_STATE_ERR: Web Socket connection has not been established";
                var e = WebSocket.__flash.send(this.__id, encodeURIComponent(t));
                return 0 > e ? !0 : (this.bufferedAmount += e, !1)
            }, WebSocket.prototype.close = function() {
                this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
            }, WebSocket.prototype.addEventListener = function(t, e) {
                t in this.__events || (this.__events[t] = []), this.__events[t].push(e)
            }, WebSocket.prototype.removeEventListener = function(t, e) {
                if (t in this.__events)
                    for (var n = this.__events[t], i = n.length - 1; i >= 0; --i)
                        if (n[i] === e) {
                            n.splice(i, 1);
                            break
                        }
            }, WebSocket.prototype.dispatchEvent = function(t) {
                for (var e = this.__events[t.type] || [], n = 0; n < e.length; ++n)
                    e[n](t);
                var i = this["on" + t.type];
                i && i(t)
            }, WebSocket.prototype.__handleEvent = function(t) {
                "readyState" in t && (this.readyState = t.readyState), "protocol" in t && (this.protocol = t.protocol);
                var e;
                if ("open" == t.type || "error" == t.type)
                    e = this.__createSimpleEvent(t.type);
                else if ("close" == t.type)
                    e = this.__createSimpleEvent("close");
                else {
                    if ("message" != t.type)
                        throw "unknown event type: " + t.type;
                    var n = decodeURIComponent(t.message);
                    e = this.__createMessageEvent("message", n)
                }
                this.dispatchEvent(e)
            }, WebSocket.prototype.__createSimpleEvent = function(t) {
                if (document.createEvent && window.Event) {
                    var e = document.createEvent("Event");
                    return e.initEvent(t, !1, !1), e
                }
                return {type: t,bubbles: !1,cancelable: !1}
            }, WebSocket.prototype.__createMessageEvent = function(t, e) {
                if (document.createEvent && window.MessageEvent && !window.opera) {
                    var n = document.createEvent("MessageEvent");
                    return n.initMessageEvent("message", !1, !1, e, null, null, window, null), n
                }
                return {type: t,data: e,bubbles: !1,cancelable: !1}
            }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(t) {
                WebSocket.__addTask(function() {
                    WebSocket.__flash.loadManualPolicyFile(t)
                })
            }, WebSocket.__initialize = function() {
                if (!WebSocket.__flash) {
                    if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION)
                        return void t.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                    var e = document.createElement("div");
                    e.id = "webSocketContainer", e.style.position = "absolute", WebSocket.__isFlashLite() ? (e.style.left = "0px", e.style.top = "0px") : (e.style.left = "-100px", e.style.top = "-100px");
                    var n = document.createElement("div");
                    n.id = "webSocketFlash", e.appendChild(n), document.body.appendChild(e), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {hasPriority: !0,swliveconnect: !0,allowScriptAccess: "always"}, null, function(e) {
                        e.success || t.error("[WebSocket] swfobject.embedSWF failed")
                    })
                }
            }, WebSocket.__onFlashInitialized = function() {
                setTimeout(function() {
                    WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                    for (var t = 0; t < WebSocket.__tasks.length; ++t)
                        WebSocket.__tasks[t]();
                    WebSocket.__tasks = []
                }, 0)
            }, WebSocket.__onFlashEvent = function() {
                return setTimeout(function() {
                    try {
                        for (var e = WebSocket.__flash.receiveEvents(), n = 0; n < e.length; ++n)
                            WebSocket.__instances[e[n].webSocketId].__handleEvent(e[n])
                    } catch (i) {
                        t.error(i)
                    }
                }, 0), !0
            }, WebSocket.__log = function(e) {
                t.log(decodeURIComponent(e))
            }, WebSocket.__error = function(e) {
                t.error(decodeURIComponent(e))
            }, WebSocket.__addTask = function(t) {
                WebSocket.__flash ? t() : WebSocket.__tasks.push(t)
            }, WebSocket.__isFlashLite = function() {
                if (!window.navigator || !window.navigator.mimeTypes)
                    return !1;
                var t = window.navigator.mimeTypes["application/x-shockwave-flash"];
                return t && t.enabledPlugin && t.enabledPlugin.filename && t.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
            }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
                WebSocket.__initialize()
            }, !1) : window.attachEvent("onload", function() {
                WebSocket.__initialize()
            })), void 0) : void t.error("Flash Player >= 10.0.0 is required.")
        }
    }(), 

    function(t, e, n) {
        function i(t) {
            t && (e.Transport.apply(this, arguments), this.sendBuffer = [])
        }
        function s() {
        }
        t.XHR = i, e.util.inherit(i, e.Transport), i.prototype.open = function() {
            return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
        }, i.prototype.payload = function(t) {
            for (var n = [], i = 0, s = t.length; s > i; i++)
                n.push(e.parser.encodePacket(t[i]));
            this.send(e.parser.encodePayload(n))
        }, i.prototype.send = function(t) {
            return this.post(t), this
        }, i.prototype.post = function(t) {
            function e() {
                4 == this.readyState && (this.onreadystatechange = s, o.posting = !1, 200 == this.status ? o.socket.setBuffer(!1) : o.onClose())
            }
            function i() {
                this.onload = s, o.socket.setBuffer(!1)
            }
            var o = this;
            this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = i : this.sendXHR.onreadystatechange = e, this.sendXHR.send(t)
        }, i.prototype.close = function() {
            return this.onClose(), this
        }, i.prototype.request = function(t) {
            var n = e.util.request(this.socket.isXDomain()), i = e.util.query(this.socket.options.query, "t=" + +new Date);
            if (n.open(t || "GET", this.prepareUrl() + i, !0), "POST" == t)
                try {
                    n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
                } catch (s) {
                }
            return n
        }, i.prototype.scheme = function() {
            return this.socket.options.secure ? "https" : "http"
        }, i.check = function(t, i) {
            try {
                var s = e.util.request(i), o = n.XDomainRequest && s instanceof XDomainRequest, r = t && t.options && t.options.secure ? "https:" : "http:", a = n.location && r != n.location.protocol;
                if (s && (!o || !a))
                    return !0
            } catch (l) {
            }
            return !1
        }, i.xdomainCheck = function(t) {
            return i.check(t, !0)
        }
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), 
    function(t, e) {
        function n() {
            e.Transport.XHR.apply(this, arguments)
        }
        t.htmlfile = n, e.util.inherit(n, e.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
            this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
            var t = this.doc.createElement("div");
            t.className = "socketio", this.doc.body.appendChild(t), this.iframe = this.doc.createElement("iframe"), t.appendChild(this.iframe);
            var n = this, i = e.util.query(this.socket.options.query, "t=" + +new Date);
            this.iframe.src = this.prepareUrl() + i, e.util.on(window, "unload", function() {
                n.destroy()
            })
        }, n.prototype._ = function(t, e) {
            t = t.replace(/\\\//g, "/"), this.onData(t);
            try {
                var n = e.getElementsByTagName("script")[0];
                n.parentNode.removeChild(n)
            } catch (i) {
            }
        }, n.prototype.destroy = function() {
            if (this.iframe) {
                try {
                    this.iframe.src = "about:blank"
                } catch (t) {
                }
                this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
            }
        }, n.prototype.close = function() {
            return this.destroy(), e.Transport.XHR.prototype.close.call(this)
        }, n.check = function(t) {
            if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window)
                try {
                    var n = new (window[["Active"].concat("Object").join("X")])("htmlfile");
                    return n && e.Transport.XHR.check(t)
                } catch (i) {
                }
            return !1
        }, n.xdomainCheck = function() {
            return !1
        }, e.transports.push("htmlfile")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), 

    function(t, e, n) {
        function i() {
            e.Transport.XHR.apply(this, arguments)
        }
        function s() {
        }
        t["xhr-polling"] = i, e.util.inherit(i, e.Transport.XHR), e.util.merge(i, e.Transport.XHR), i.prototype.name = "xhr-polling", i.prototype.heartbeats = function() {
            return !1
        }, i.prototype.open = function() {
            var t = this;
            return e.Transport.XHR.prototype.open.call(t), !1
        }, i.prototype.get = function() {
            function t() {
                4 == this.readyState && (this.onreadystatechange = s, 200 == this.status ? (o.onData(this.responseText), o.get()) : o.onClose())
            }
            function e() {
                this.onload = s, this.onerror = s, o.retryCounter = 1, o.onData(this.responseText), o.get()
            }
            function i() {
                o.retryCounter++, !o.retryCounter || o.retryCounter > 3 ? o.onClose() : o.get()
            }
            if (this.isOpen) {
                var o = this;
                this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = e, this.xhr.onerror = i) : this.xhr.onreadystatechange = t, this.xhr.send(null)
            }
        }, i.prototype.onClose = function() {
            if (e.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = s;
                try {
                    this.xhr.abort()
                } catch (t) {
                }
                this.xhr = null
            }
        }, i.prototype.ready = function(t, n) {
            var i = this;
            e.util.defer(function() {
                n.call(i)
            })
        }, e.transports.push("xhr-polling")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), 
    function(t, e, n) {
        function i() {
            e.Transport["xhr-polling"].apply(this, arguments), this.index = e.j.length;
            var t = this;
            e.j.push(function(e) {
                t._(e)
            })
        }
        var s = n.document && "MozAppearance" in n.document.documentElement.style;
        t["jsonp-polling"] = i, e.util.inherit(i, e.Transport["xhr-polling"]), i.prototype.name = "jsonp-polling", i.prototype.post = function(t) {
            function n() {
                i(), s.socket.setBuffer(!1)
            }
            function i() {
                s.iframe && s.form.removeChild(s.iframe);
                try {
                    r = document.createElement('<iframe name="' + s.iframeId + '">')
                } catch (t) {
                    r = document.createElement("iframe"), r.name = s.iframeId
                }
                r.id = s.iframeId, s.form.appendChild(r), s.iframe = r
            }
            var s = this, o = e.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
            if (!this.form) {
                var r, a = document.createElement("form"), l = document.createElement("textarea"), c = this.iframeId = "socketio_iframe_" + this.index;
                a.className = "socketio", a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.style.display = "none", a.target = c, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), l.name = "d", a.appendChild(l), document.body.appendChild(a), this.form = a, this.area = l
            }
            this.form.action = this.prepareUrl() + o, i(), this.area.value = e.JSON.stringify(t);
            try {
                this.form.submit()
            } catch (u) {
            }
            this.iframe.attachEvent ? r.onreadystatechange = function() {
                "complete" == s.iframe.readyState && n()
            } : this.iframe.onload = n, this.socket.setBuffer(!0)
        }, i.prototype.get = function() {
            var t = this, n = document.createElement("script"), i = e.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + i, n.onerror = function() {
                t.onClose()
            };
            var o = document.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(n, o), this.script = n, s && setTimeout(function() {
                var t = document.createElement("iframe");
                document.body.appendChild(t), document.body.removeChild(t)
            }, 100)
        }, i.prototype._ = function(t) {
            return this.onData(t), this.isOpen && this.get(), this
        }, i.prototype.ready = function(t, n) {
            var i = this;
            return s ? void e.util.load(function() {
                n.call(i)
            }) : n.call(this)
        }, i.check = function() {
            return "document" in n
        }, i.xdomainCheck = function() {
            return !0
        }, e.transports.push("jsonp-polling")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), 
    "function" == typeof define && define.amd && define([], function() {
        return io
    })
}();

// CryptoJS module
var CryptoJS = CryptoJS || function(t, e) {
    var n = {}, i = n.lib = {}, s = function() {
    }, o = i.Base = {extend: function(t) {
            s.prototype = this;
            var e = new s;
            return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                e.$super.init.apply(this, arguments)
            }), e.init.prototype = e, e.$super = this, e
        },create: function() {
            var t = this.extend();
            return t.init.apply(t, arguments), t
        },init: function() {
        },mixIn: function(t) {
            for (var e in t)
                t.hasOwnProperty(e) && (this[e] = t[e]);
            t.hasOwnProperty("toString") && (this.toString = t.toString)
        },clone: function() {
            return this.init.prototype.extend(this)
        }}, r = i.WordArray = o.extend({init: function(t, n) {
            t = this.words = t || [], this.sigBytes = n != e ? n : 4 * t.length
        },toString: function(t) {
            return (t || l).stringify(this)
        },concat: function(t) {
            var e = this.words, n = t.words, i = this.sigBytes;
            if (t = t.sigBytes, this.clamp(), i % 4)
                for (var s = 0; t > s; s++)
                    e[i + s >>> 2] |= (n[s >>> 2] >>> 24 - 8 * (s % 4) & 255) << 24 - 8 * ((i + s) % 4);
            else if (65535 < n.length)
                for (s = 0; t > s; s += 4)
                    e[i + s >>> 2] = n[s >>> 2];
            else
                e.push.apply(e, n);
            return this.sigBytes += t, this
        },clamp: function() {
            var e = this.words, n = this.sigBytes;
            e[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), e.length = t.ceil(n / 4)
        },clone: function() {
            var t = o.clone.call(this);
            return t.words = this.words.slice(0), t
        },random: function(e) {
            for (var n = [], i = 0; e > i; i += 4)
                n.push(4294967296 * t.random() | 0);
            return new r.init(n, e)
        }}), a = n.enc = {}, l = a.Hex = {stringify: function(t) {
            var e = t.words;
            t = t.sigBytes;
            for (var n = [], i = 0; t > i; i++) {
                var s = e[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
                n.push((s >>> 4).toString(16)), n.push((15 & s).toString(16))
            }
            return n.join("")
        },parse: function(t) {
            for (var e = t.length, n = [], i = 0; e > i; i += 2)
                n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - 4 * (i % 8);
            return new r.init(n, e / 2)
        }}, c = a.Latin1 = {stringify: function(t) {
            var e = t.words;
            t = t.sigBytes;
            for (var n = [], i = 0; t > i; i++)
                n.push(String.fromCharCode(e[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
            return n.join("")
        },parse: function(t) {
            for (var e = t.length, n = [], i = 0; e > i; i++)
                n[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - 8 * (i % 4);
            return new r.init(n, e)
        }}, u = a.Utf8 = {stringify: function(t) {
            try {
                return decodeURIComponent(escape(c.stringify(t)))
            } catch (e) {
                throw Error("Malformed UTF-8 data")
            }
        },parse: function(t) {
            return c.parse(unescape(encodeURIComponent(t)))
        }}, d = i.BufferedBlockAlgorithm = o.extend({reset: function() {
            this._data = new r.init, this._nDataBytes = 0
        },_append: function(t) {
            "string" == typeof t && (t = u.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
        },_process: function(e) {
            var n = this._data, i = n.words, s = n.sigBytes, o = this.blockSize, a = s / (4 * o), a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
            if (e = a * o, s = t.min(4 * e, s), e) {
                for (var l = 0; e > l; l += o)
                    this._doProcessBlock(i, l);
                l = i.splice(0, e), n.sigBytes -= s
            }
            return new r.init(l, s)
        },clone: function() {
            var t = o.clone.call(this);
            return t._data = this._data.clone(), t
        },_minBufferSize: 0});
    i.Hasher = d.extend({cfg: o.extend(),init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset()
        },reset: function() {
            d.reset.call(this), this._doReset()
        },update: function(t) {
            return this._append(t), this._process(), this
        },finalize: function(t) {
            return t && this._append(t), this._doFinalize()
        },blockSize: 16,_createHelper: function(t) {
            return function(e, n) {
                return new t.init(n).finalize(e)
            }
        },_createHmacHelper: function(t) {
            return function(e, n) {
                return new h.HMAC.init(t, n).finalize(e)
            }
        }});
    var h = n.algo = {};
    return n
}(Math);


!function(t) {
    function e(t, e, n, i, s, o, r) {
        return t = t + (e & n | ~e & i) + s + r, (t << o | t >>> 32 - o) + e
    }
    function n(t, e, n, i, s, o, r) {
        return t = t + (e & i | n & ~i) + s + r, (t << o | t >>> 32 - o) + e
    }
    function i(t, e, n, i, s, o, r) {
        return t = t + (e ^ n ^ i) + s + r, (t << o | t >>> 32 - o) + e
    }
    function s(t, e, n, i, s, o, r) {
        return t = t + (n ^ (e | ~i)) + s + r, (t << o | t >>> 32 - o) + e
    }
    for (var o = CryptoJS, r = o.lib, a = r.WordArray, l = r.Hasher, r = o.algo, c = [], u = 0; 64 > u; u++)
        c[u] = 4294967296 * t.abs(t.sin(u + 1)) | 0;
    r = r.MD5 = l.extend({_doReset: function() {
            this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878])
        },_doProcessBlock: function(t, o) {
            for (var r = 0; 16 > r; r++) {
                var a = o + r, l = t[a];
                t[a] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
            }
            var r = this._hash.words, a = t[o + 0], l = t[o + 1], u = t[o + 2], d = t[o + 3], h = t[o + 4], p = t[o + 5], f = t[o + 6], m = t[o + 7], g = t[o + 8], v = t[o + 9], y = t[o + 10], b = t[o + 11], S = t[o + 12], E = t[o + 13], T = t[o + 14], w = t[o + 15], _ = r[0], k = r[1], L = r[2], C = r[3], _ = e(_, k, L, C, a, 7, c[0]), C = e(C, _, k, L, l, 12, c[1]), L = e(L, C, _, k, u, 17, c[2]), k = e(k, L, C, _, d, 22, c[3]), _ = e(_, k, L, C, h, 7, c[4]), C = e(C, _, k, L, p, 12, c[5]), L = e(L, C, _, k, f, 17, c[6]), k = e(k, L, C, _, m, 22, c[7]), _ = e(_, k, L, C, g, 7, c[8]), C = e(C, _, k, L, v, 12, c[9]), L = e(L, C, _, k, y, 17, c[10]), k = e(k, L, C, _, b, 22, c[11]), _ = e(_, k, L, C, S, 7, c[12]), C = e(C, _, k, L, E, 12, c[13]), L = e(L, C, _, k, T, 17, c[14]), k = e(k, L, C, _, w, 22, c[15]), _ = n(_, k, L, C, l, 5, c[16]), C = n(C, _, k, L, f, 9, c[17]), L = n(L, C, _, k, b, 14, c[18]), k = n(k, L, C, _, a, 20, c[19]), _ = n(_, k, L, C, p, 5, c[20]), C = n(C, _, k, L, y, 9, c[21]), L = n(L, C, _, k, w, 14, c[22]), k = n(k, L, C, _, h, 20, c[23]), _ = n(_, k, L, C, v, 5, c[24]), C = n(C, _, k, L, T, 9, c[25]), L = n(L, C, _, k, d, 14, c[26]), k = n(k, L, C, _, g, 20, c[27]), _ = n(_, k, L, C, E, 5, c[28]), C = n(C, _, k, L, u, 9, c[29]), L = n(L, C, _, k, m, 14, c[30]), k = n(k, L, C, _, S, 20, c[31]), _ = i(_, k, L, C, p, 4, c[32]), C = i(C, _, k, L, g, 11, c[33]), L = i(L, C, _, k, b, 16, c[34]), k = i(k, L, C, _, T, 23, c[35]), _ = i(_, k, L, C, l, 4, c[36]), C = i(C, _, k, L, h, 11, c[37]), L = i(L, C, _, k, m, 16, c[38]), k = i(k, L, C, _, y, 23, c[39]), _ = i(_, k, L, C, E, 4, c[40]), C = i(C, _, k, L, a, 11, c[41]), L = i(L, C, _, k, d, 16, c[42]), k = i(k, L, C, _, f, 23, c[43]), _ = i(_, k, L, C, v, 4, c[44]), C = i(C, _, k, L, S, 11, c[45]), L = i(L, C, _, k, w, 16, c[46]), k = i(k, L, C, _, u, 23, c[47]), _ = s(_, k, L, C, a, 6, c[48]), C = s(C, _, k, L, m, 10, c[49]), L = s(L, C, _, k, T, 15, c[50]), k = s(k, L, C, _, p, 21, c[51]), _ = s(_, k, L, C, S, 6, c[52]), C = s(C, _, k, L, d, 10, c[53]), L = s(L, C, _, k, y, 15, c[54]), k = s(k, L, C, _, l, 21, c[55]), _ = s(_, k, L, C, g, 6, c[56]), C = s(C, _, k, L, w, 10, c[57]), L = s(L, C, _, k, f, 15, c[58]), k = s(k, L, C, _, E, 21, c[59]), _ = s(_, k, L, C, h, 6, c[60]), C = s(C, _, k, L, b, 10, c[61]), L = s(L, C, _, k, u, 15, c[62]), k = s(k, L, C, _, v, 21, c[63]);
            r[0] = r[0] + _ | 0, r[1] = r[1] + k | 0, r[2] = r[2] + L | 0, r[3] = r[3] + C | 0
        },_doFinalize: function() {
            var e = this._data, n = e.words, i = 8 * this._nDataBytes, s = 8 * e.sigBytes;
            n[s >>> 5] |= 128 << 24 - s % 32;
            var o = t.floor(i / 4294967296);
            for (n[(s + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[(s + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (n.length + 1), this._process(), e = this._hash, n = e.words, i = 0; 4 > i; i++)
                s = n[i], n[i] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
            return e
        },clone: function() {
            var t = l.clone.call(this);
            return t._hash = this._hash.clone(), t
        }}), o.MD5 = l._createHelper(r), o.HmacMD5 = l._createHmacHelper(r)
}(Math), 



function() {
    function t(t) {
        var n = {r: 0,g: 0,b: 0}, s = 1, r = !1, a = !1;
        return "string" == typeof t && (t = M(t)), "object" == typeof t && (t.hasOwnProperty("r") && t.hasOwnProperty("g") && t.hasOwnProperty("b") ? (n = e(t.r, t.g, t.b), r = !0, a = "%" === String(t.r).substr(-1) ? "prgb" : "rgb") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("v") ? (t.s = A(t.s), t.v = A(t.v), n = o(t.h, t.s, t.v), r = !0, a = "hsv") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("l") && (t.s = A(t.s), t.l = A(t.l), n = i(t.h, t.s, t.l), r = !0, a = "hsl"), t.hasOwnProperty("a") && (s = t.a)), s = T(s), {ok: r,format: t.format || a,r: j(255, U(n.r, 0)),g: j(255, U(n.g, 0)),b: j(255, U(n.b, 0)),a: s}
    }
    function e(t, e, n) {
        return {r: 255 * w(t, 255),g: 255 * w(e, 255),b: 255 * w(n, 255)}
    }
    function n(t, e, n) {
        t = w(t, 255), e = w(e, 255), n = w(n, 255);
        var i, s, o = U(t, e, n), r = j(t, e, n), a = (o + r) / 2;
        if (o == r)
            i = s = 0;
        else {
            var l = o - r;
            switch (s = a > .5 ? l / (2 - o - r) : l / (o + r), o) {
                case t:
                    i = (e - n) / l + (n > e ? 6 : 0);
                    break;
                case e:
                    i = (n - t) / l + 2;
                    break;
                case n:
                    i = (t - e) / l + 4
            }
            i /= 6
        }
        return {h: i,s: s,l: a}
    }
    function i(t, e, n) {
        function i(t, e, n) {
            return 0 > n && (n += 1), n > 1 && (n -= 1), 1 / 6 > n ? t + 6 * (e - t) * n : .5 > n ? e : 2 / 3 > n ? t + (e - t) * (2 / 3 - n) * 6 : t
        }
        var s, o, r;
        if (t = w(t, 360), e = w(e, 100), n = w(n, 100), 0 === e)
            s = o = r = n;
        else {
            var a = .5 > n ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
            s = i(l, a, t + 1 / 3), o = i(l, a, t), r = i(l, a, t - 1 / 3)
        }
        return {r: 255 * s,g: 255 * o,b: 255 * r}
    }
    function s(t, e, n) {
        t = w(t, 255), e = w(e, 255), n = w(n, 255);
        var i, s, o = U(t, e, n), r = j(t, e, n), a = o, l = o - r;
        if (s = 0 === o ? 0 : l / o, o == r)
            i = 0;
        else {
            switch (o) {
                case t:
                    i = (e - n) / l + (n > e ? 6 : 0);
                    break;
                case e:
                    i = (n - t) / l + 2;
                    break;
                case n:
                    i = (t - e) / l + 4
            }
            i /= 6
        }
        return {h: i,s: s,v: a}
    }
    function o(t, e, n) {
        t = 6 * w(t, 360), e = w(e, 100), n = w(n, 100);
        var i = P.floor(t), s = t - i, o = n * (1 - e), r = n * (1 - s * e), a = n * (1 - (1 - s) * e), l = i % 6, c = [n, r, o, o, a, n][l], u = [a, n, n, r, o, o][l], d = [o, o, a, n, n, r][l];
        return {r: 255 * c,g: 255 * u,b: 255 * d}
    }
    function r(t, e, n, i) {
        var s = [x($(t).toString(16)), x($(e).toString(16)), x($(n).toString(16))];
        return i && s[0].charAt(0) == s[0].charAt(1) && s[1].charAt(0) == s[1].charAt(1) && s[2].charAt(0) == s[2].charAt(1) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) : s.join("")
    }
    function a(t, e, n, i) {
        var s = [x(I(i)), x($(t).toString(16)), x($(e).toString(16)), x($(n).toString(16))];
        return s.join("")
    }
    function l(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.s -= e / 100, n.s = _(n.s), B(n)
    }
    function c(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.s += e / 100, n.s = _(n.s), B(n)
    }
    function u(t) {
        return B(t).desaturate(100)
    }
    function d(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.l += e / 100, n.l = _(n.l), B(n)
    }
    function h(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toRgb();
        return n.r = U(0, j(255, n.r - $(255 * -(e / 100)))), n.g = U(0, j(255, n.g - $(255 * -(e / 100)))), n.b = U(0, j(255, n.b - $(255 * -(e / 100)))), B(n)
    }
    function p(t, e) {
        e = 0 === e ? 0 : e || 10;
        var n = B(t).toHsl();
        return n.l -= e / 100, n.l = _(n.l), B(n)
    }
    function f(t, e) {
        var n = B(t).toHsl(), i = ($(n.h) + e) % 360;
        return n.h = 0 > i ? 360 + i : i, B(n)
    }
    function m(t) {
        var e = B(t).toHsl();
        return e.h = (e.h + 180) % 360, B(e)
    }
    function g(t) {
        var e = B(t).toHsl(), n = e.h;
        return [B(t), B({h: (n + 120) % 360,s: e.s,l: e.l}), B({h: (n + 240) % 360,s: e.s,l: e.l})]
    }
    function v(t) {
        var e = B(t).toHsl(), n = e.h;
        return [B(t), B({h: (n + 90) % 360,s: e.s,l: e.l}), B({h: (n + 180) % 360,s: e.s,l: e.l}), B({h: (n + 270) % 360,s: e.s,l: e.l})]
    }
    function y(t) {
        var e = B(t).toHsl(), n = e.h;
        return [B(t), B({h: (n + 72) % 360,s: e.s,l: e.l}), B({h: (n + 216) % 360,s: e.s,l: e.l})]
    }
    function b(t, e, n) {
        e = e || 6, n = n || 30;
        var i = B(t).toHsl(), s = 360 / n, o = [B(t)];
        for (i.h = (i.h - (s * e >> 1) + 720) % 360; --e; )
            i.h = (i.h + s) % 360, o.push(B(i));
        return o
    }
    function S(t, e) {
        e = e || 6;
        for (var n = B(t).toHsv(), i = n.h, s = n.s, o = n.v, r = [], a = 1 / e; e--; )
            r.push(B({h: i,s: s,v: o})), o = (o + a) % 1;
        return r
    }
    function E(t) {
        var e = {};
        for (var n in t)
            t.hasOwnProperty(n) && (e[t[n]] = n);
        return e
    }
    function T(t) {
        return t = parseFloat(t), (isNaN(t) || 0 > t || t > 1) && (t = 1), t
    }
    function w(t, e) {
        L(t) && (t = "100%");
        var n = C(t);
        return t = j(e, U(0, parseFloat(t))), n && (t = parseInt(t * e, 10) / 100), P.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e)
    }
    function _(t) {
        return j(1, U(0, t))
    }
    function k(t) {
        return parseInt(t, 16)
    }
    function L(t) {
        return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
    }
    function C(t) {
        return "string" == typeof t && -1 != t.indexOf("%")
    }
    function x(t) {
        return 1 == t.length ? "0" + t : "" + t
    }
    function A(t) {
        return 1 >= t && (t = 100 * t + "%"), t
    }
    function I(t) {
        return Math.round(255 * parseFloat(t)).toString(16)
    }
    function D(t) {
        return k(t) / 255
    }
    function M(t) {
        t = t.replace(R, "").replace(N, "").toLowerCase();
        var e = !1;
        if (F[t])
            t = F[t], e = !0;
        else if ("transparent" == t)
            return {r: 0,g: 0,b: 0,a: 0,format: "name"};
        var n;
        return (n = V.rgb.exec(t)) ? {r: n[1],g: n[2],b: n[3]} : (n = V.rgba.exec(t)) ? {r: n[1],g: n[2],b: n[3],a: n[4]} : (n = V.hsl.exec(t)) ? {h: n[1],s: n[2],l: n[3]} : (n = V.hsla.exec(t)) ? {h: n[1],s: n[2],l: n[3],a: n[4]} : (n = V.hsv.exec(t)) ? {h: n[1],s: n[2],v: n[3]} : (n = V.hex8.exec(t)) ? {a: D(n[1]),r: k(n[2]),g: k(n[3]),b: k(n[4]),format: e ? "name" : "hex8"} : (n = V.hex6.exec(t)) ? {r: k(n[1]),g: k(n[2]),b: k(n[3]),format: e ? "name" : "hex"} : (n = V.hex3.exec(t)) ? {r: k(n[1] + "" + n[1]),g: k(n[2] + "" + n[2]),b: k(n[3] + "" + n[3]),format: e ? "name" : "hex"} : !1
    }
    var R = /^[\s,#]+/, N = /\s+$/, O = 0, P = Math, $ = P.round, j = P.min, U = P.max, H = P.random, B = function W(e, n) {
        if (e = e ? e : "", n = n || {}, e instanceof W)
            return e;
        if (!(this instanceof W))
            return new W(e, n);
        var i = t(e);
        this._r = i.r, this._g = i.g, this._b = i.b, this._a = i.a, this._roundA = $(100 * this._a) / 100, this._format = n.format || i.format, this._gradientType = n.gradientType, this._r < 1 && (this._r = $(this._r)), this._g < 1 && (this._g = $(this._g)), this._b < 1 && (this._b = $(this._b)), this._ok = i.ok, this._tc_id = O++
    };
    B.prototype = {isDark: function() {
            return this.getBrightness() < 128
        },isLight: function() {
            return !this.isDark()
        },isValid: function() {
            return this._ok
        },getFormat: function() {
            return this._format
        },getAlpha: function() {
            return this._a
        },getBrightness: function() {
            var t = this.toRgb();
            return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3
        },setAlpha: function(t) {
            return this._a = T(t), this._roundA = $(100 * this._a) / 100, this
        },toHsv: function() {
            var t = s(this._r, this._g, this._b);
            return {h: 360 * t.h,s: t.s,v: t.v,a: this._a}
        },toHsvString: function() {
            var t = s(this._r, this._g, this._b), e = $(360 * t.h), n = $(100 * t.s), i = $(100 * t.v);
            return 1 == this._a ? "hsv(" + e + ", " + n + "%, " + i + "%)" : "hsva(" + e + ", " + n + "%, " + i + "%, " + this._roundA + ")"
        },toHsl: function() {
            var t = n(this._r, this._g, this._b);
            return {h: 360 * t.h,s: t.s,l: t.l,a: this._a}
        },toHslString: function() {
            var t = n(this._r, this._g, this._b), e = $(360 * t.h), i = $(100 * t.s), s = $(100 * t.l);
            return 1 == this._a ? "hsl(" + e + ", " + i + "%, " + s + "%)" : "hsla(" + e + ", " + i + "%, " + s + "%, " + this._roundA + ")"
        },toHex: function(t) {
            return r(this._r, this._g, this._b, t)
        },toHexString: function(t) {
            return "#" + this.toHex(t)
        },toHex8: function() {
            return a(this._r, this._g, this._b, this._a)
        },toHex8String: function() {
            return "#" + this.toHex8()
        },toRgb: function() {
            return {r: $(this._r),g: $(this._g),b: $(this._b),a: this._a}
        },toRgbString: function() {
            return 1 == this._a ? "rgb(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ")" : "rgba(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ", " + this._roundA + ")"
        },toPercentageRgb: function() {
            return {r: $(100 * w(this._r, 255)) + "%",g: $(100 * w(this._g, 255)) + "%",b: $(100 * w(this._b, 255)) + "%",a: this._a}
        },toPercentageRgbString: function() {
            return 1 == this._a ? "rgb(" + $(100 * w(this._r, 255)) + "%, " + $(100 * w(this._g, 255)) + "%, " + $(100 * w(this._b, 255)) + "%)" : "rgba(" + $(100 * w(this._r, 255)) + "%, " + $(100 * w(this._g, 255)) + "%, " + $(100 * w(this._b, 255)) + "%, " + this._roundA + ")"
        },toName: function() {
            return 0 === this._a ? "transparent" : this._a < 1 ? !1 : z[r(this._r, this._g, this._b, !0)] || !1
        },toFilter: function(t) {
            var e = "#" + a(this._r, this._g, this._b, this._a), n = e, i = this._gradientType ? "GradientType = 1, " : "";
            if (t) {
                var s = B(t);
                n = s.toHex8String()
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + i + "startColorstr=" + e + ",endColorstr=" + n + ")"
        },toString: function(t) {
            var e = !!t;
            t = t || this._format;
            var n = !1, i = this._a < 1 && this._a >= 0, s = !e && i && ("hex" === t || "hex6" === t || "hex3" === t || "name" === t);
            return s ? "name" === t && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === t && (n = this.toRgbString()), "prgb" === t && (n = this.toPercentageRgbString()), ("hex" === t || "hex6" === t) && (n = this.toHexString()), "hex3" === t && (n = this.toHexString(!0)), "hex8" === t && (n = this.toHex8String()), "name" === t && (n = this.toName()), "hsl" === t && (n = this.toHslString()), "hsv" === t && (n = this.toHsvString()), n || this.toHexString())
        },_applyModification: function(t, e) {
            var n = t.apply(null, [this].concat([].slice.call(e)));
            return this._r = n._r, this._g = n._g, this._b = n._b, this.setAlpha(n._a), this
        },lighten: function() {
            return this._applyModification(d, arguments)
        },brighten: function() {
            return this._applyModification(h, arguments)
        },darken: function() {
            return this._applyModification(p, arguments)
        },desaturate: function() {
            return this._applyModification(l, arguments)
        },saturate: function() {
            return this._applyModification(c, arguments)
        },greyscale: function() {
            return this._applyModification(u, arguments)
        },spin: function() {
            return this._applyModification(f, arguments)
        },_applyCombination: function(t, e) {
            return t.apply(null, [this].concat([].slice.call(e)))
        },analogous: function() {
            return this._applyCombination(b, arguments)
        },complement: function() {
            return this._applyCombination(m, arguments)
        },monochromatic: function() {
            return this._applyCombination(S, arguments)
        },splitcomplement: function() {
            return this._applyCombination(y, arguments)
        },triad: function() {
            return this._applyCombination(g, arguments)
        },tetrad: function() {
            return this._applyCombination(v, arguments)
        }}, B.fromRatio = function(t, e) {
        if ("object" == typeof t) {
            var n = {};
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = "a" === i ? t[i] : A(t[i]));
            t = n
        }
        return B(t, e)
    }, B.equals = function(t, e) {
        return t && e ? B(t).toRgbString() == B(e).toRgbString() : !1
    }, B.random = function() {
        return B.fromRatio({r: H(),g: H(),b: H()})
    }, B.mix = function(t, e, n) {
        n = 0 === n ? 0 : n || 50;
        var i, s = B(t).toRgb(), o = B(e).toRgb(), r = n / 100, a = 2 * r - 1, l = o.a - s.a;
        i = a * l == -1 ? a : (a + l) / (1 + a * l), i = (i + 1) / 2;
        var c = 1 - i, u = {r: o.r * i + s.r * c,g: o.g * i + s.g * c,b: o.b * i + s.b * c,a: o.a * r + s.a * (1 - r)};
        return B(u)
    }, B.readability = function(t, e) {
        var n = B(t), i = B(e), s = n.toRgb(), o = i.toRgb(), r = n.getBrightness(), a = i.getBrightness(), l = Math.max(s.r, o.r) - Math.min(s.r, o.r) + Math.max(s.g, o.g) - Math.min(s.g, o.g) + Math.max(s.b, o.b) - Math.min(s.b, o.b);
        return {brightness: Math.abs(r - a),color: l}
    }, B.isReadable = function(t, e) {
        var n = B.readability(t, e);
        return n.brightness > 125 && n.color > 500
    }, B.mostReadable = function(t, e) {
        for (var n = null, i = 0, s = !1, o = 0; o < e.length; o++) {
            var r = B.readability(t, e[o]), a = r.brightness > 125 && r.color > 500, l = 3 * (r.brightness / 125) + r.color / 500;
            (a && !s || a && s && l > i || !a && !s && l > i) && (s = a, i = l, n = B(e[o]))
        }
        return n
    };
    var F = B.names = {aliceblue: "f0f8ff",antiquewhite: "faebd7",aqua: "0ff",aquamarine: "7fffd4",azure: "f0ffff",beige: "f5f5dc",bisque: "ffe4c4",black: "000",blanchedalmond: "ffebcd",blue: "00f",blueviolet: "8a2be2",brown: "a52a2a",burlywood: "deb887",burntsienna: "ea7e5d",cadetblue: "5f9ea0",chartreuse: "7fff00",chocolate: "d2691e",coral: "ff7f50",cornflowerblue: "6495ed",cornsilk: "fff8dc",crimson: "dc143c",cyan: "0ff",darkblue: "00008b",darkcyan: "008b8b",darkgoldenrod: "b8860b",darkgray: "a9a9a9",darkgreen: "006400",darkgrey: "a9a9a9",darkkhaki: "bdb76b",darkmagenta: "8b008b",darkolivegreen: "556b2f",darkorange: "ff8c00",darkorchid: "9932cc",darkred: "8b0000",darksalmon: "e9967a",darkseagreen: "8fbc8f",darkslateblue: "483d8b",darkslategray: "2f4f4f",darkslategrey: "2f4f4f",darkturquoise: "00ced1",darkviolet: "9400d3",deeppink: "ff1493",deepskyblue: "00bfff",dimgray: "696969",dimgrey: "696969",dodgerblue: "1e90ff",firebrick: "b22222",floralwhite: "fffaf0",forestgreen: "228b22",fuchsia: "f0f",gainsboro: "dcdcdc",ghostwhite: "f8f8ff",gold: "ffd700",goldenrod: "daa520",gray: "808080",green: "008000",greenyellow: "adff2f",grey: "808080",honeydew: "f0fff0",hotpink: "ff69b4",indianred: "cd5c5c",indigo: "4b0082",ivory: "fffff0",khaki: "f0e68c",lavender: "e6e6fa",lavenderblush: "fff0f5",lawngreen: "7cfc00",lemonchiffon: "fffacd",lightblue: "add8e6",lightcoral: "f08080",lightcyan: "e0ffff",lightgoldenrodyellow: "fafad2",lightgray: "d3d3d3",lightgreen: "90ee90",lightgrey: "d3d3d3",lightpink: "ffb6c1",lightsalmon: "ffa07a",lightseagreen: "20b2aa",lightskyblue: "87cefa",lightslategray: "789",lightslategrey: "789",lightsteelblue: "b0c4de",lightyellow: "ffffe0",lime: "0f0",limegreen: "32cd32",linen: "faf0e6",magenta: "f0f",maroon: "800000",mediumaquamarine: "66cdaa",mediumblue: "0000cd",mediumorchid: "ba55d3",mediumpurple: "9370db",mediumseagreen: "3cb371",mediumslateblue: "7b68ee",mediumspringgreen: "00fa9a",mediumturquoise: "48d1cc",mediumvioletred: "c71585",midnightblue: "191970",mintcream: "f5fffa",mistyrose: "ffe4e1",moccasin: "ffe4b5",navajowhite: "ffdead",navy: "000080",oldlace: "fdf5e6",olive: "808000",olivedrab: "6b8e23",orange: "ffa500",orangered: "ff4500",orchid: "da70d6",palegoldenrod: "eee8aa",palegreen: "98fb98",paleturquoise: "afeeee",palevioletred: "db7093",papayawhip: "ffefd5",peachpuff: "ffdab9",peru: "cd853f",pink: "ffc0cb",plum: "dda0dd",powderblue: "b0e0e6",purple: "800080",red: "f00",rosybrown: "bc8f8f",royalblue: "4169e1",saddlebrown: "8b4513",salmon: "fa8072",sandybrown: "f4a460",seagreen: "2e8b57",seashell: "fff5ee",sienna: "a0522d",silver: "c0c0c0",skyblue: "87ceeb",slateblue: "6a5acd",slategray: "708090",slategrey: "708090",snow: "fffafa",springgreen: "00ff7f",steelblue: "4682b4",tan: "d2b48c",teal: "008080",thistle: "d8bfd8",tomato: "ff6347",turquoise: "40e0d0",violet: "ee82ee",wheat: "f5deb3",white: "fff",whitesmoke: "f5f5f5",yellow: "ff0",yellowgreen: "9acd32"}, z = B.hexNames = E(F), V = function() {
        var t = "[-\\+]?\\d+%?", e = "[-\\+]?\\d*\\.\\d+%?", n = "(?:" + e + ")|(?:" + t + ")", i = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?", s = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
        return {rgb: new RegExp("rgb" + i),rgba: new RegExp("rgba" + s),hsl: new RegExp("hsl" + i),hsla: new RegExp("hsla" + s),hsv: new RegExp("hsv" + i),hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}
    }();
    "undefined" != typeof module && module.exports ? module.exports = B : "function" == typeof define && define.amd ? define(function() {
        return B
    }) : window.tinycolor = B
}(), 

function() {
    function t(t) {
        var e = "    ";
        if (isNaN(parseInt(t)))
            e = t;
        else
            switch (t) {
                case 1:
                    e = " ";
                    break;
                case 2:
                    e = "  ";
                    break;
                case 3:
                    e = "   ";
                    break;
                case 4:
                    e = "    ";
                    break;
                case 5:
                    e = "     ";
                    break;
                case 6:
                    e = "      ";
                    break;
                case 7:
                    e = "       ";
                    break;
                case 8:
                    e = "        ";
                    break;
                case 9:
                    e = "         ";
                    break;
                case 10:
                    e = "          ";
                    break;
                case 11:
                    e = "           ";
                    break;
                case 12:
                    e = "            "
            }
        var n = ["\n"];
        for (ix = 0; 100 > ix; ix++)
            n.push(n[ix] + e);
        return n
    }
    function e() {
        this.step = "    ", this.shift = t(this.step)
    }
    function n(t, e) {
        return e - (t.replace(/\(/g, "").length - t.replace(/\)/g, "").length)
    }
    function i(t, e) {
        return t.replace(/\s{1,}/g, " ").replace(/ AND /gi, "~::~" + e + e + "AND ").replace(/ BETWEEN /gi, "~::~" + e + "BETWEEN ").replace(/ CASE /gi, "~::~" + e + "CASE ").replace(/ ELSE /gi, "~::~" + e + "ELSE ").replace(/ END /gi, "~::~" + e + "END ").replace(/ FROM /gi, "~::~FROM ").replace(/ GROUP\s{1,}BY/gi, "~::~GROUP BY ").replace(/ HAVING /gi, "~::~HAVING ").replace(/ IN /gi, " IN ").replace(/ JOIN /gi, "~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /gi, "~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /gi, "~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /gi, "~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /gi, "~::~RIGHT JOIN ").replace(/ ON /gi, "~::~" + e + "ON ").replace(/ OR /gi, "~::~" + e + e + "OR ").replace(/ ORDER\s{1,}BY/gi, "~::~ORDER BY ").replace(/ OVER /gi, "~::~" + e + "OVER ").replace(/\(\s{0,}SELECT /gi, "~::~(SELECT ").replace(/\)\s{0,}SELECT /gi, ")~::~SELECT ").replace(/ THEN /gi, " THEN~::~" + e).replace(/ UNION /gi, "~::~UNION~::~").replace(/ USING /gi, "~::~USING ").replace(/ WHEN /gi, "~::~" + e + "WHEN ").replace(/ WHERE /gi, "~::~WHERE ").replace(/ WITH /gi, "~::~WITH ").replace(/ ALL /gi, " ALL ").replace(/ AS /gi, " AS ").replace(/ ASC /gi, " ASC ").replace(/ DESC /gi, " DESC ").replace(/ DISTINCT /gi, " DISTINCT ").replace(/ EXISTS /gi, " EXISTS ").replace(/ NOT /gi, " NOT ").replace(/ NULL /gi, " NULL ").replace(/ LIKE /gi, " LIKE ").replace(/\s{0,}SELECT /gi, "SELECT ").replace(/\s{0,}UPDATE /gi, "UPDATE ").replace(/ SET /gi, " SET ").replace(/~::~{1,}/g, "~::~").split("~::~")
    }
    e.prototype.xml = function(e, n) {
        var i = e.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split("~::~"), s = i.length, o = !1, r = 0, a = "", l = 0, c = n ? t(n) : this.shift;
        for (l = 0; s > l; l++)
            i[l].search(/<!/) > -1 ? (a += c[r] + i[l], o = !0, (i[l].search(/-->/) > -1 || i[l].search(/\]>/) > -1 || i[l].search(/!DOCTYPE/) > -1) && (o = !1)) : i[l].search(/-->/) > -1 || i[l].search(/\]>/) > -1 ? (a += i[l], o = !1) : /^<\w/.exec(i[l - 1]) && /^<\/\w/.exec(i[l]) && /^<[\w:\-\.\,]+/.exec(i[l - 1]) == /^<\/[\w:\-\.\,]+/.exec(i[l])[0].replace("/", "") ? (a += i[l], o || r--) : i[l].search(/<\w/) > -1 && -1 == i[l].search(/<\//) && -1 == i[l].search(/\/>/) ? a = a += o ? i[l] : c[r++] + i[l] : i[l].search(/<\w/) > -1 && i[l].search(/<\//) > -1 ? a = a += o ? i[l] : c[r] + i[l] : i[l].search(/<\//) > -1 ? a = a += o ? i[l] : c[--r] + i[l] : i[l].search(/\/>/) > -1 ? a = a += o ? i[l] : c[r] + i[l] : a += i[l].search(/<\?/) > -1 ? c[r] + i[l] : i[l].search(/xmlns\:/) > -1 || i[l].search(/xmlns\=/) > -1 ? c[r] + i[l] : i[l];
        return "\n" == a[0] ? a.slice(1) : a
    }, e.prototype.json = function(t, e) {
        var e = e ? e : this.step;
        return "undefined" == typeof JSON ? t : "string" == typeof t ? JSON.stringify(JSON.parse(t), null, e) : "object" == typeof t ? JSON.stringify(t, null, e) : t
    }, e.prototype.css = function(e, n) {
        var i = e.replace(/\s{1,}/g, " ").replace(/\{/g, "{~::~").replace(/\}/g, "~::~}~::~").replace(/\;/g, ";~::~").replace(/\/\*/g, "~::~/*").replace(/\*\//g, "*/~::~").replace(/~::~\s{0,}~::~/g, "~::~").split("~::~"), s = i.length, o = 0, r = "", a = 0, l = n ? t(n) : this.shift;
        for (a = 0; s > a; a++)
            r += /\{/.exec(i[a]) ? l[o++] + i[a] : /\}/.exec(i[a]) ? l[--o] + i[a] : /\*\\/.exec(i[a]) ? l[o] + i[a] : l[o] + i[a];
        return r.replace(/^\n{1,}/, "")
    }, e.prototype.sql = function(e, s) {
        var o = e.replace(/\s{1,}/g, " ").replace(/\'/gi, "~::~'").split("~::~"), r = o.length, a = [], l = 0, c = this.step, u = 0, d = "", h = 0, p = s ? t(s) : this.shift;
        for (h = 0; r > h; h++)
            a = a.concat(h % 2 ? o[h] : i(o[h], c));
        for (r = a.length, h = 0; r > h; h++) {
            u = n(a[h], u), /\s{0,}\s{0,}SELECT\s{0,}/.exec(a[h]) && (a[h] = a[h].replace(/\,/g, ",\n" + c + c)), /\s{0,}\s{0,}SET\s{0,}/.exec(a[h]) && (a[h] = a[h].replace(/\,/g, ",\n" + c + c)), /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(a[h]) ? (l++, d += p[l] + a[h]) : /\'/.exec(a[h]) ? (1 > u && l && l--, d += a[h]) : (d += p[l] + a[h], 1 > u && l && l--)
        }
        return d = d.replace(/^\n{1,}/, "").replace(/\n{1,}/g, "\n")
    }, e.prototype.xmlmin = function(t, e) {
        var n = e ? t : t.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "").replace(/[ \r\n\t]{1,}xmlns/g, " xmlns");
        return n.replace(/>\s{0,}</g, "><")
    }, e.prototype.jsonmin = function(t) {
        return "undefined" == typeof JSON ? t : JSON.stringify(JSON.parse(t), null, 0)
    }, e.prototype.cssmin = function(t, e) {
        var n = e ? t : t.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");
        return n.replace(/\s{1,}/g, " ").replace(/\{\s{1,}/g, "{").replace(/\}\s{1,}/g, "}").replace(/\;\s{1,}/g, ";").replace(/\/\*\s{1,}/g, "/*").replace(/\*\/\s{1,}/g, "*/")
    }, e.prototype.sqlmin = function(t) {
        return t.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")")
    }, window.vkbeautify = new e
}()

