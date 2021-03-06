! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length,
            n = ae.type(e);
        return "function" === n || ae.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function r(e, t, n) {
        if (ae.isFunction(t)) return ae.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return ae.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (me.test(t)) return ae.filter(t, e, n);
            t = ae.filter(t, e)
        }
        return ae.grep(e, function(e) {
            return Z.call(t, e) > -1 !== n
        })
    }

    function i(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function a(e) {
        var t = {};
        return ae.each(e.match(we) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function o() {
        K.removeEventListener("DOMContentLoaded", o), e.removeEventListener("load", o), ae.ready()
    }

    function s() {
        this.expando = ae.expando + s.uid++
    }

    function u(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Te, "-$&").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : De.test(n) ? ae.parseJSON(n) : n
                } catch (i) {}
                Ee.set(e, t, n)
            } else n = void 0;
        return n
    }

    function l(e, t, n, r) {
        var i, a = 1,
            o = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return ae.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (ae.cssNumber[t] ? "" : "px"),
            c = (ae.cssNumber[t] || "px" !== l && +u) && Oe.exec(ae.css(e, t));
        if (c && c[3] !== l) {
            l = l || c[3], n = n || [], c = +u || 1;
            do a = a || ".5", c /= a, ae.style(e, t, c + l); while (a !== (a = s() / u) && 1 !== a && --o)
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }

    function c(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && ae.nodeName(e, t) ? ae.merge([e], n) : n
    }

    function f(e, t) {
        for (var n = 0, r = e.length; r > n; n++) Se.set(e[n], "globalEval", !t || Se.get(t[n], "globalEval"))
    }

    function p(e, t, n, r, i) {
        for (var a, o, s, u, l, p, d = t.createDocumentFragment(), h = [], m = 0, g = e.length; g > m; m++)
            if (a = e[m], a || 0 === a)
                if ("object" === ae.type(a)) ae.merge(h, a.nodeType ? [a] : a);
                else if (Fe.test(a)) {
            for (o = o || d.appendChild(t.createElement("div")), s = (Ne.exec(a) || ["", ""])[1].toLowerCase(), u = Ie[s] || Ie._default, o.innerHTML = u[1] + ae.htmlPrefilter(a) + u[2], p = u[0]; p--;) o = o.lastChild;
            ae.merge(h, o.childNodes), o = d.firstChild, o.textContent = ""
        } else h.push(t.createTextNode(a));
        for (d.textContent = "", m = 0; a = h[m++];)
            if (r && ae.inArray(a, r) > -1) i && i.push(a);
            else if (l = ae.contains(a.ownerDocument, a), o = c(d.appendChild(a), "script"), l && f(o), n)
            for (p = 0; a = o[p++];) Le.test(a.type || "") && n.push(a);
        return d
    }

    function d() {
        return !0
    }

    function h() {
        return !1
    }

    function m() {
        try {
            return K.activeElement
        } catch (e) {}
    }

    function g(e, t, n, r, i, a) {
        var o, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) g(e, s, n, r, t[s], a);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = h;
        else if (!i) return e;
        return 1 === a && (o = i, i = function(e) {
            return ae().off(e), o.apply(this, arguments)
        }, i.guid = o.guid || (o.guid = ae.guid++)), e.each(function() {
            ae.event.add(this, t, i, r, n)
        })
    }

    function v(e, t) {
        return ae.nodeName(e, "table") && ae.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function $(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function y(e) {
        var t = Be.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function b(e, t) {
        var n, r, i, a, o, s, u, l;
        if (1 === t.nodeType) {
            if (Se.hasData(e) && (a = Se.access(e), o = Se.set(t, a), l = a.events)) {
                delete o.handle, o.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; r > n; n++) ae.event.add(t, i, l[i][n])
            }
            Ee.hasData(e) && (s = Ee.access(e), u = ae.extend({}, s), Ee.set(t, u))
        }
    }

    function w(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && je.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function x(e, t, n, r) {
        t = J.apply([], t);
        var i, a, o, s, u, l, f = 0,
            d = e.length,
            h = d - 1,
            m = t[0],
            g = ae.isFunction(m);
        if (g || d > 1 && "string" == typeof m && !re.checkClone && _e.test(m)) return e.each(function(i) {
            var a = e.eq(i);
            g && (t[0] = m.call(this, i, a.html())), x(a, t, n, r)
        });
        if (d && (i = p(t, e[0].ownerDocument, !1, e, r), a = i.firstChild, 1 === i.childNodes.length && (i = a), a || r)) {
            for (o = ae.map(c(i, "script"), $), s = o.length; d > f; f++) u = i, f !== h && (u = ae.clone(u, !0, !0), s && ae.merge(o, c(u, "script"))), n.call(e[f], u, f);
            if (s)
                for (l = o[o.length - 1].ownerDocument, ae.map(o, y), f = 0; s > f; f++) u = o[f], Le.test(u.type || "") && !Se.access(u, "globalEval") && ae.contains(l, u) && (u.src ? ae._evalUrl && ae._evalUrl(u.src) : ae.globalEval(u.textContent.replace(ze, "")))
        }
        return e
    }

    function C(e, t, n) {
        for (var r, i = t ? ae.filter(t, e) : e, a = 0; null != (r = i[a]); a++) n || 1 !== r.nodeType || ae.cleanData(c(r)), r.parentNode && (n && ae.contains(r.ownerDocument, r) && f(c(r, "script")), r.parentNode.removeChild(r));
        return e
    }

    function k(e, t) {
        var n = ae(t.createElement(e)).appendTo(t.body),
            r = ae.css(n[0], "display");
        return n.detach(), r
    }

    function S(e) {
        var t = K,
            n = Ye[e];
        return n || (n = k(e, t), "none" !== n && n || (We = (We || ae("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = We[0].contentDocument, t.write(), t.close(), n = k(e, t), We.detach()), Ye[e] = n), n
    }

    function E(e, t, n) {
        var r, i, a, o, s = e.style;
        return n = n || Xe(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== o && void 0 !== o || ae.contains(e.ownerDocument, e) || (o = ae.style(e, t)), n && !re.pixelMarginRight() && Ke.test(o) && Ge.test(t) && (r = s.width, i = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = n.width, s.width = r, s.minWidth = i, s.maxWidth = a), void 0 !== o ? o + "" : o
    }

    function D(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function T(e) {
        if (e in rt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)
            if (e = nt[n] + t, e in rt) return e
    }

    function A(e, t, n) {
        var r = Oe.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function O(e, t, n, r, i) {
        for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2) "margin" === n && (o += ae.css(e, n + Me[a], !0, i)), r ? ("content" === n && (o -= ae.css(e, "padding" + Me[a], !0, i)), "margin" !== n && (o -= ae.css(e, "border" + Me[a] + "Width", !0, i))) : (o += ae.css(e, "padding" + Me[a], !0, i), "padding" !== n && (o += ae.css(e, "border" + Me[a] + "Width", !0, i)));
        return o
    }

    function M(t, n, r) {
        var i = !0,
            a = "width" === n ? t.offsetWidth : t.offsetHeight,
            o = Xe(t),
            s = "border-box" === ae.css(t, "boxSizing", !1, o);
        if (K.msFullscreenElement && e.top !== e && t.getClientRects().length && (a = Math.round(100 * t.getBoundingClientRect()[n])), 0 >= a || null == a) {
            if (a = E(t, n, o), (0 > a || null == a) && (a = t.style[n]), Ke.test(a)) return a;
            i = s && (re.boxSizingReliable() || a === t.style[n]), a = parseFloat(a) || 0
        }
        return a + O(t, n, r || (s ? "border" : "content"), i, o) + "px"
    }

    function P(e, t) {
        for (var n, r, i, a = [], o = 0, s = e.length; s > o; o++) r = e[o], r.style && (a[o] = Se.get(r, "olddisplay"), n = r.style.display, t ? (a[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && Pe(r) && (a[o] = Se.access(r, "olddisplay", S(r.nodeName)))) : (i = Pe(r), "none" === n && i || Se.set(r, "olddisplay", i ? n : ae.css(r, "display"))));
        for (o = 0; s > o; o++) r = e[o], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
        return e
    }

    function j(e, t, n, r, i) {
        return new j.prototype.init(e, t, n, r, i)
    }

    function N() {
        return e.setTimeout(function() {
            it = void 0
        }), it = ae.now()
    }

    function L(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Me[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function I(e, t, n) {
        for (var r, i = (V.tweeners[t] || []).concat(V.tweeners["*"]), a = 0, o = i.length; o > a; a++)
            if (r = i[a].call(n, t, e)) return r
    }

    function F(e, t, n) {
        var r, i, a, o, s, u, l, c, f = this,
            p = {},
            d = e.style,
            h = e.nodeType && Pe(e),
            m = Se.get(e, "fxshow");
        n.queue || (s = ae._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
            s.unqueued || u()
        }), s.unqueued++, f.always(function() {
            f.always(function() {
                s.unqueued--, ae.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = ae.css(e, "display"), c = "none" === l ? Se.get(e, "olddisplay") || S(e.nodeName) : l, "inline" === c && "none" === ae.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function() {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], ot.exec(i)) {
                if (delete t[r], a = a || "toggle" === i, i === (h ? "hide" : "show")) {
                    if ("show" !== i || !m || void 0 === m[r]) continue;
                    h = !0
                }
                p[r] = m && m[r] || ae.style(e, r)
            } else l = void 0;
        if (ae.isEmptyObject(p)) "inline" === ("none" === l ? S(e.nodeName) : l) && (d.display = l);
        else {
            m ? "hidden" in m && (h = m.hidden) : m = Se.access(e, "fxshow", {}), a && (m.hidden = !h), h ? ae(e).show() : f.done(function() {
                ae(e).hide()
            }), f.done(function() {
                var t;
                Se.remove(e, "fxshow");
                for (t in p) ae.style(e, t, p[t])
            });
            for (r in p) o = I(h ? m[r] : 0, r, f), r in m || (m[r] = o.start, h && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function q(e, t) {
        var n, r, i, a, o;
        for (n in e)
            if (r = ae.camelCase(n), i = t[r], a = e[n], ae.isArray(a) && (i = a[1], a = e[n] = a[0]), n !== r && (e[r] = a, delete e[n]), o = ae.cssHooks[r], o && "expand" in o) {
                a = o.expand(a), delete e[r];
                for (n in a) n in e || (e[n] = a[n], t[n] = i)
            } else t[r] = i
    }

    function V(e, t, n) {
        var r, i, a = 0,
            o = V.prefilters.length,
            s = ae.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = it || N(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, a = 1 - r, o = 0, u = l.tweens.length; u > o; o++) l.tweens[o].run(a);
                return s.notifyWith(e, [l, a, n]), 1 > a && u ? n : (s.resolveWith(e, [l]), !1)
            },
            l = s.promise({
                elem: e,
                props: ae.extend({}, t),
                opts: ae.extend(!0, {
                    specialEasing: {},
                    easing: ae.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: it || N(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = ae.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (q(c, l.opts.specialEasing); o > a; a++)
            if (r = V.prefilters[a].call(l, e, c, l.opts)) return ae.isFunction(r.stop) && (ae._queueHooks(l.elem, l.opts.queue).stop = ae.proxy(r.stop, r)), r;
        return ae.map(c, I, l), ae.isFunction(l.opts.start) && l.opts.start.call(e, l), ae.fx.timer(ae.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function R(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function U(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                a = t.toLowerCase().match(we) || [];
            if (ae.isFunction(n))
                for (; r = a[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function H(e, t, n, r) {
        function i(s) {
            var u;
            return a[s] = !0, ae.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || o || a[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
            }), u
        }
        var a = {},
            o = e === St;
        return i(t.dataTypes[0]) || !a["*"] && i("*")
    }

    function _(e, t) {
        var n, r, i = ae.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && ae.extend(!0, e, r), e
    }

    function B(e, t, n) {
        for (var r, i, a, o, s = e.contents, u = e.dataTypes;
            "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) a = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    a = i;
                    break
                }
                o || (o = i)
            }
            a = a || o
        }
        return a ? (a !== u[0] && u.unshift(a), n[a]) : void 0
    }

    function z(e, t, n, r) {
        var i, a, o, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (o in e.converters) l[o.toLowerCase()] = e.converters[o];
        for (a = c.shift(); a;)
            if (e.responseFields[a] && (n[e.responseFields[a]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = a, a = c.shift())
                if ("*" === a) a = u;
                else if ("*" !== u && u !== a) {
            if (o = l[u + " " + a] || l["* " + a], !o)
                for (i in l)
                    if (s = i.split(" "), s[1] === a && (o = l[u + " " + s[0]] || l["* " + s[0]])) {
                        o === !0 ? o = l[i] : l[i] !== !0 && (a = s[0], c.unshift(s[1]));
                        break
                    }
            if (o !== !0)
                if (o && e["throws"]) t = o(t);
                else try {
                    t = o(t)
                } catch (f) {
                    return {
                        state: "parsererror",
                        error: o ? f : "No conversion from " + u + " to " + a
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function W(e, t, n, r) {
        var i;
        if (ae.isArray(t)) ae.each(t, function(t, i) {
            n || At.test(e) ? r(e, i) : W(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== ae.type(t)) r(e, t);
        else
            for (i in t) W(e + "[" + i + "]", t[i], n, r)
    }

    function Y(e) {
        return ae.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var G = [],
        K = e.document,
        X = G.slice,
        J = G.concat,
        Q = G.push,
        Z = G.indexOf,
        ee = {},
        te = ee.toString,
        ne = ee.hasOwnProperty,
        re = {},
        ie = "2.2.1",
        ae = function(e, t) {
            return new ae.fn.init(e, t)
        },
        oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        se = /^-ms-/,
        ue = /-([\da-z])/gi,
        le = function(e, t) {
            return t.toUpperCase()
        };
    ae.fn = ae.prototype = {
        jquery: ie,
        constructor: ae,
        selector: "",
        length: 0,
        toArray: function() {
            return X.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : X.call(this)
        },
        pushStack: function(e) {
            var t = ae.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e) {
            return ae.each(this, e)
        },
        map: function(e) {
            return this.pushStack(ae.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(X.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: Q,
        sort: G.sort,
        splice: G.splice
    }, ae.extend = ae.fn.extend = function() {
        var e, t, n, r, i, a, o = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof o && (l = o, o = arguments[s] || {}, s++), "object" == typeof o || ae.isFunction(o) || (o = {}), s === u && (o = this, s--); u > s; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = o[t], r = e[t], o !== r && (l && r && (ae.isPlainObject(r) || (i = ae.isArray(r))) ? (i ? (i = !1, a = n && ae.isArray(n) ? n : []) : a = n && ae.isPlainObject(n) ? n : {}, o[t] = ae.extend(l, a, r)) : void 0 !== r && (o[t] = r));
        return o
    }, ae.extend({
        expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === ae.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !ae.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isPlainObject: function(e) {
            return "object" !== ae.type(e) || e.nodeType || ae.isWindow(e) ? !1 : e.constructor && !ne.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var t, n = eval;
            e = ae.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(se, "ms-").replace(ue, le)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var r, i = 0;
            if (n(e))
                for (r = e.length; r > i && t.call(e[i], i, e[i]) !== !1; i++);
            else
                for (i in e)
                    if (t.call(e[i], i, e[i]) === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(oe, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? ae.merge(r, "string" == typeof e ? [e] : e) : Q.call(r, e)), r
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : Z.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], a = 0, o = e.length, s = !n; o > a; a++) r = !t(e[a], a), r !== s && i.push(e[a]);
            return i
        },
        map: function(e, t, r) {
            var i, a, o = 0,
                s = [];
            if (n(e))
                for (i = e.length; i > o; o++) a = t(e[o], o, r), null != a && s.push(a);
            else
                for (o in e) a = t(e[o], o, r), null != a && s.push(a);
            return J.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), ae.isFunction(e) ? (r = X.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(X.call(arguments)))
            }, i.guid = e.guid = e.guid || ae.guid++, i) : void 0
        },
        now: Date.now,
        support: re
    }), "function" == typeof Symbol && (ae.fn[Symbol.iterator] = G[Symbol.iterator]), ae.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ee["[object " + t + "]"] = t.toLowerCase()
    });
    var ce = function(e) {
        function t(e, t, n, r) {
            var i, a, o, s, u, l, f, d, h = t && t.ownerDocument,
                m = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m) return n;
            if (!r && ((t ? t.ownerDocument || t : R) !== P && M(t), t = t || P, N)) {
                if (11 !== m && (l = ve.exec(e)))
                    if (i = l[1]) {
                        if (9 === m) {
                            if (!(o = t.getElementById(i))) return n;
                            if (o.id === i) return n.push(o), n
                        } else if (h && (o = h.getElementById(i)) && q(t, o) && o.id === i) return n.push(o), n
                    } else {
                        if (l[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = l[3]) && w.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(i)), n
                    }
                if (w.qsa && !z[e + " "] && (!L || !L.test(e))) {
                    if (1 !== m) h = t, d = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(ye, "\\$&") : t.setAttribute("id", s = V), f = S(e), a = f.length, u = pe.test(s) ? "#" + s : "[id='" + s + "']"; a--;) f[a] = u + " " + p(f[a]);
                        d = f.join(","), h = $e.test(e) && c(t.parentNode) || t
                    }
                    if (d) try {
                        return Q.apply(n, h.querySelectorAll(d)), n
                    } catch (g) {} finally {
                        s === V && t.removeAttribute("id")
                    }
                }
            }
            return D(e.replace(se, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
            var t = [];
            return e
        }

        function r(e) {
            return e[V] = !0, e
        }

        function i(e) {
            var t = P.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function a(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) x.attrHandle[n[r]] = t
        }

        function o(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function l(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var i, a = e([], n.length, t), o = a.length; o--;) n[i = a[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function f() {}

        function p(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function d(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                a = H++;
            return t.first ? function(t, n, a) {
                for (; t = t[r];)
                    if (1 === t.nodeType || i) return e(t, n, a)
            } : function(t, n, o) {
                var s, u, l, c = [U, a];
                if (o) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || i) && e(t, n, o)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || i) {
                            if (l = t[V] || (t[V] = {}), u = l[t.uniqueID] || (l[t.uniqueID] = {}), (s = u[r]) && s[0] === U && s[1] === a) return c[2] = s[2];
                            if (u[r] = c, c[2] = e(t, n, o)) return !0
                        }
            }
        }

        function h(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function m(e, n, r) {
            for (var i = 0, a = n.length; a > i; i++) t(e, n[i], r);
            return r
        }

        function g(e, t, n, r, i) {
            for (var a, o = [], s = 0, u = e.length, l = null != t; u > s; s++)(a = e[s]) && (!n || n(a, r, i)) && (o.push(a), l && t.push(s));
            return o
        }

        function v(e, t, n, i, a, o) {
            return i && !i[V] && (i = v(i)), a && !a[V] && (a = v(a, o)), r(function(r, o, s, u) {
                var l, c, f, p = [],
                    d = [],
                    h = o.length,
                    v = r || m(t || "*", s.nodeType ? [s] : s, []),
                    $ = !e || !r && t ? v : g(v, p, e, s, u),
                    y = n ? a || (r ? e : h || i) ? [] : o : $;
                if (n && n($, y, s, u), i)
                    for (l = g(y, d), i(l, [], s, u), c = l.length; c--;)(f = l[c]) && (y[d[c]] = !($[d[c]] = f));
                if (r) {
                    if (a || e) {
                        if (a) {
                            for (l = [], c = y.length; c--;)(f = y[c]) && l.push($[c] = f);
                            a(null, y = [], l, u)
                        }
                        for (c = y.length; c--;)(f = y[c]) && (l = a ? ee(r, f) : p[c]) > -1 && (r[l] = !(o[l] = f))
                    }
                } else y = g(y === o ? y.splice(h, y.length) : y), a ? a(null, o, y, u) : Q.apply(o, y)
            })
        }

        function $(e) {
            for (var t, n, r, i = e.length, a = x.relative[e[0].type], o = a || x.relative[" "], s = a ? 1 : 0, u = d(function(e) {
                    return e === t
                }, o, !0), l = d(function(e) {
                    return ee(t, e) > -1
                }, o, !0), c = [function(e, n, r) {
                    var i = !a && (r || n !== T) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                    return t = null, i
                }]; i > s; s++)
                if (n = x.relative[e[s].type]) c = [d(h(c), n)];
                else {
                    if (n = x.filter[e[s].type].apply(null, e[s].matches), n[V]) {
                        for (r = ++s; i > r && !x.relative[e[r].type]; r++);
                        return v(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, r > s && $(e.slice(s, r)), i > r && $(e = e.slice(r)), i > r && p(e))
                    }
                    c.push(n)
                }
            return h(c)
        }

        function y(e, n) {
            var i = n.length > 0,
                a = e.length > 0,
                o = function(r, o, s, u, l) {
                    var c, f, p, d = 0,
                        h = "0",
                        m = r && [],
                        v = [],
                        $ = T,
                        y = r || a && x.find.TAG("*", l),
                        b = U += null == $ ? 1 : Math.random() || .1,
                        w = y.length;
                    for (l && (T = o === P || o || l); h !== w && null != (c = y[h]); h++) {
                        if (a && c) {
                            for (f = 0, o || c.ownerDocument === P || (M(c), s = !N); p = e[f++];)
                                if (p(c, o || P, s)) {
                                    u.push(c);
                                    break
                                }
                            l && (U = b)
                        }
                        i && ((c = !p && c) && d--, r && m.push(c))
                    }
                    if (d += h, i && h !== d) {
                        for (f = 0; p = n[f++];) p(m, v, o, s);
                        if (r) {
                            if (d > 0)
                                for (; h--;) m[h] || v[h] || (v[h] = X.call(u));
                            v = g(v)
                        }
                        Q.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                    }
                    return l && (U = b, T = $), m
                };
            return i ? r(o) : o
        }
        var b, w, x, C, k, S, E, D, T, A, O, M, P, j, N, L, I, F, q, V = "sizzle" + 1 * new Date,
            R = e.document,
            U = 0,
            H = 0,
            _ = n(),
            B = n(),
            z = n(),
            W = function(e, t) {
                return e === t && (O = !0), 0
            },
            Y = 1 << 31,
            G = {}.hasOwnProperty,
            K = [],
            X = K.pop,
            J = K.push,
            Q = K.push,
            Z = K.slice,
            ee = function(e, t) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
            ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
            oe = new RegExp(ne + "+", "g"),
            se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ue = new RegExp("^" + ne + "*," + ne + "*"),
            le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            fe = new RegExp(ae),
            pe = new RegExp("^" + re + "$"),
            de = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re + "|[*])"),
                ATTR: new RegExp("^" + ie),
                PSEUDO: new RegExp("^" + ae),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ge = /^[^{]+\{\s*\[native \w/,
            ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            $e = /[+~]/,
            ye = /'|\\/g,
            be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            we = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            xe = function() {
                M()
            };
        try {
            Q.apply(K = Z.call(R.childNodes), R.childNodes), K[R.childNodes.length].nodeType
        } catch (Ce) {
            Q = {
                apply: K.length ? function(e, t) {
                    J.apply(e, Z.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, k = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, M = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : R;
            return r !== P && 9 === r.nodeType && r.documentElement ? (P = r, j = P.documentElement, N = !k(P), (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), w.attributes = i(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = i(function(e) {
                return e.appendChild(P.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = ge.test(P.getElementsByClassName), w.getById = i(function(e) {
                return j.appendChild(e).id = V, !P.getElementsByName || !P.getElementsByName(V).length
            }), w.getById ? (x.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && N) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, x.filter.ID = function(e) {
                var t = e.replace(be, we);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete x.find.ID, x.filter.ID = function(e) {
                var t = e.replace(be, we);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), x.find.TAG = w.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    a = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = a[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return a
            }, x.find.CLASS = w.getElementsByClassName && function(e, t) {
                return "undefined" != typeof t.getElementsByClassName && N ? t.getElementsByClassName(e) : void 0
            }, I = [], L = [], (w.qsa = ge.test(P.querySelectorAll)) && (i(function(e) {
                j.appendChild(e).innerHTML = "<a id='" + V + "'></a><select id='" + V + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + V + "-]").length || L.push("~="), e.querySelectorAll(":checked").length || L.push(":checked"), e.querySelectorAll("a#" + V + "+*").length || L.push(".#.+[+~]")
            }), i(function(e) {
                var t = P.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
            })), (w.matchesSelector = ge.test(F = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && i(function(e) {
                w.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), I.push("!=", ae)
            }), L = L.length && new RegExp(L.join("|")), I = I.length && new RegExp(I.join("|")), t = ge.test(j.compareDocumentPosition), q = t || ge.test(j.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, W = t ? function(e, t) {
                if (e === t) return O = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === P || e.ownerDocument === R && q(R, e) ? -1 : t === P || t.ownerDocument === R && q(R, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return O = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    a = t.parentNode,
                    s = [e],
                    u = [t];
                if (!i || !a) return e === P ? -1 : t === P ? 1 : i ? -1 : a ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                if (i === a) return o(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; s[r] === u[r];) r++;
                return r ? o(s[r], u[r]) : s[r] === R ? -1 : u[r] === R ? 1 : 0
            }, P) : P
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== P && M(e), n = n.replace(ce, "='$1']"), w.matchesSelector && N && !z[n + " "] && (!I || !I.test(n)) && (!L || !L.test(n))) try {
                var r = F.call(e, n);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return t(n, P, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== P && M(e), q(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== P && M(e);
            var n = x.attrHandle[t.toLowerCase()],
                r = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !N) : void 0;
            return void 0 !== r ? r : w.attributes || !N ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (O = !w.detectDuplicates, A = !w.sortStable && e.slice(0), e.sort(W), O) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return A = null, e
        }, C = t.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r++];) n += C(t);
            return n
        }, x = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: de,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(be, we), e[3] = (e[3] || e[4] || e[5] || "").replace(be, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, we).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = _[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && _(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var a = t.attr(i, e);
                        return null == a ? "!=" === n : n ? (a += "", "=" === n ? a === r : "!=" === n ? a !== r : "^=" === n ? r && 0 === a.indexOf(r) : "*=" === n ? r && a.indexOf(r) > -1 : "$=" === n ? r && a.slice(-r.length) === r : "~=" === n ? (" " + a.replace(oe, " ") + " ").indexOf(r) > -1 : "|=" === n ? a === r || a.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var a = "nth" !== e.slice(0, 3),
                        o = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, m = a !== o ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            $ = !u && !s,
                            y = !1;
                        if (g) {
                            if (a) {
                                for (; m;) {
                                    for (p = t; p = p[m];)
                                        if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [o ? g.firstChild : g.lastChild], o && $) {
                                for (p = g, f = p[V] || (p[V] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === U && l[1], y = d && l[2], p = d && g.childNodes[d]; p = ++d && p && p[m] || (y = d = 0) || h.pop();)
                                    if (1 === p.nodeType && ++y && p === t) {
                                        c[e] = [U, d, y];
                                        break
                                    }
                            } else if ($ && (p = t, f = p[V] || (p[V] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === U && l[1], y = d), y === !1)
                                for (;
                                    (p = ++d && p && p[m] || (y = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++y || ($ && (f = p[V] || (p[V] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), c[e] = [U, y]), p !== t)););
                            return y -= i, y === r || y % r === 0 && y / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, a = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return a[V] ? a(n) : a.length > 1 ? (i = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = a(e, n), o = i.length; o--;) r = ee(e, i[o]), e[r] = !(t[r] = i[o])
                    }) : function(e) {
                        return a(e, 0, i)
                    }) : a
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                        n = [],
                        i = E(e.replace(se, "$1"));
                    return i[V] ? r(function(e, t, n, r) {
                        for (var a, o = i(e, null, r, []), s = e.length; s--;)(a = o[s]) && (e[s] = !(t[s] = a))
                    }) : function(e, r, a) {
                        return t[0] = e, i(t, null, a, n), t[0] = null, !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(be, we),
                        function(t) {
                            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                        }
                }),
                lang: r(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, we).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = N ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === j
                },
                focus: function(e) {
                    return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !x.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[b] = s(b);
        for (b in {
                submit: !0,
                reset: !0
            }) x.pseudos[b] = u(b);
        return f.prototype = x.filters = x.pseudos, x.setFilters = new f, S = t.tokenize = function(e, n) {
            var r, i, a, o, s, u, l, c = B[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, u = [], l = x.preFilter; s;) {
                (!r || (i = ue.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(a = [])), r = !1, (i = le.exec(s)) && (r = i.shift(), a.push({
                    value: r,
                    type: i[0].replace(se, " ")
                }), s = s.slice(r.length));
                for (o in x.filter) !(i = de[o].exec(s)) || l[o] && !(i = l[o](i)) || (r = i.shift(), a.push({
                    value: r,
                    type: o,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : B(e, u).slice(0)
        }, E = t.compile = function(e, t) {
            var n, r = [],
                i = [],
                a = z[e + " "];
            if (!a) {
                for (t || (t = S(e)), n = t.length; n--;) a = $(t[n]), a[V] ? r.push(a) : i.push(a);
                a = z(e, y(i, r)), a.selector = e
            }
            return a
        }, D = t.select = function(e, t, n, r) {
            var i, a, o, s, u, l = "function" == typeof e && e,
                f = !r && S(e = l.selector || e);
            if (n = n || [], 1 === f.length) {
                if (a = f[0] = f[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && w.getById && 9 === t.nodeType && N && x.relative[a[1].type]) {
                    if (t = (x.find.ID(o.matches[0].replace(be, we), t) || [])[0], !t) return n;
                    l && (t = t.parentNode), e = e.slice(a.shift().value.length)
                }
                for (i = de.needsContext.test(e) ? 0 : a.length; i-- && (o = a[i], !x.relative[s = o.type]);)
                    if ((u = x.find[s]) && (r = u(o.matches[0].replace(be, we), $e.test(a[0].type) && c(t.parentNode) || t))) {
                        if (a.splice(i, 1), e = r.length && p(a), !e) return Q.apply(n, r), n;
                        break
                    }
            }
            return (l || E(e, f))(r, t, !N, n, !t || $e.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = V.split("").sort(W).join("") === V, w.detectDuplicates = !!O, M(), w.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(P.createElement("div"))
        }), i(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && i(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || a("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function(e) {
            return null == e.getAttribute("disabled")
        }) || a(te, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    ae.find = ce, ae.expr = ce.selectors, ae.expr[":"] = ae.expr.pseudos, ae.uniqueSort = ae.unique = ce.uniqueSort, ae.text = ce.getText, ae.isXMLDoc = ce.isXML, ae.contains = ce.contains;
    var fe = function(e, t, n) {
            for (var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && ae(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        pe = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        de = ae.expr.match.needsContext,
        he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        me = /^.[^:#\[\.,]*$/;
    ae.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ae.find.matchesSelector(r, e) ? [r] : [] : ae.find.matches(e, ae.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, ae.fn.extend({
        find: function(e) {
            var t, n = this.length,
                r = [],
                i = this;
            if ("string" != typeof e) return this.pushStack(ae(e).filter(function() {
                for (t = 0; n > t; t++)
                    if (ae.contains(i[t], this)) return !0
            }));
            for (t = 0; n > t; t++) ae.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? ae.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && de.test(e) ? ae(e) : e || [], !1).length
        }
    });
    var ge, ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        $e = ae.fn.init = function(e, t, n) {
            var r, i;
            if (!e) return this;
            if (n = n || ge, "string" == typeof e) {
                if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ve.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof ae ? t[0] : t, ae.merge(this, ae.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), he.test(r[1]) && ae.isPlainObject(t))
                        for (r in t) ae.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = K.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = K, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ae.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(ae) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ae.makeArray(e, this))
        };
    $e.prototype = ae.fn, ge = ae(K);
    var ye = /^(?:parents|prev(?:Until|All))/,
        be = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ae.fn.extend({
        has: function(e) {
            var t = ae(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (ae.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, a = [], o = de.test(e) || "string" != typeof e ? ae(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && ae.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
            return this.pushStack(a.length > 1 ? ae.uniqueSort(a) : a)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Z.call(ae(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ae.uniqueSort(ae.merge(this.get(), ae(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ae.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return fe(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return fe(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return fe(e, "nextSibling")
        },
        prevAll: function(e) {
            return fe(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return fe(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return fe(e, "previousSibling", n)
        },
        siblings: function(e) {
            return pe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return pe(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || ae.merge([], e.childNodes)
        }
    }, function(e, t) {
        ae.fn[e] = function(n, r) {
            var i = ae.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ae.filter(r, i)), this.length > 1 && (be[e] || ae.uniqueSort(i), ye.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var we = /\S+/g;
    ae.Callbacks = function(e) {
        e = "string" == typeof e ? a(e) : ae.extend({}, e);
        var t, n, r, i, o = [],
            s = [],
            u = -1,
            l = function() {
                for (i = e.once, r = t = !0; s.length; u = -1)
                    for (n = s.shift(); ++u < o.length;) o[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = o.length, n = !1);
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            },
            c = {
                add: function() {
                    return o && (n && !t && (u = o.length - 1, s.push(n)), function r(t) {
                        ae.each(t, function(t, n) {
                            ae.isFunction(n) ? e.unique && c.has(n) || o.push(n) : n && n.length && "string" !== ae.type(n) && r(n)
                        })
                    }(arguments), n && !t && l()), this
                },
                remove: function() {
                    return ae.each(arguments, function(e, t) {
                        for (var n;
                            (n = ae.inArray(t, o, n)) > -1;) o.splice(n, 1), u >= n && u--
                    }), this
                },
                has: function(e) {
                    return e ? ae.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return i = s = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return i = s = [], n || (o = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || l()), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return c
    }, ae.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", ae.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ae.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ae.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return ae.Deferred(function(n) {
                            ae.each(t, function(t, a) {
                                var o = ae.isFunction(e[t]) && e[t];
                                i[a[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && ae.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[a[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? ae.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, ae.each(t, function(e, a) {
                var o = a[2],
                    s = a[3];
                r[a[1]] = o.add, s && o.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[a[0]] = function() {
                    return i[a[0] + "With"](this === i ? r : this, arguments), this
                }, i[a[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t, n, r, i = 0,
                a = X.call(arguments),
                o = a.length,
                s = 1 !== o || e && ae.isFunction(e.promise) ? o : 0,
                u = 1 === s ? e : ae.Deferred(),
                l = function(e, n, r) {
                    return function(i) {
                        n[e] = this, r[e] = arguments.length > 1 ? X.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                    }
                };
            if (o > 1)
                for (t = new Array(o), n = new Array(o), r = new Array(o); o > i; i++) a[i] && ae.isFunction(a[i].promise) ? a[i].promise().progress(l(i, n, t)).done(l(i, r, a)).fail(u.reject) : --s;
            return s || u.resolveWith(r, a), u.promise()
        }
    });
    var xe;
    ae.fn.ready = function(e) {
        return ae.ready.promise().done(e), this
    }, ae.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ae.readyWait++ : ae.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --ae.readyWait : ae.isReady) || (ae.isReady = !0, e !== !0 && --ae.readyWait > 0 || (xe.resolveWith(K, [ae]), ae.fn.triggerHandler && (ae(K).triggerHandler("ready"), ae(K).off("ready"))))
        }
    }), ae.ready.promise = function(t) {
        return xe || (xe = ae.Deferred(), "complete" === K.readyState || "loading" !== K.readyState && !K.documentElement.doScroll ? e.setTimeout(ae.ready) : (K.addEventListener("DOMContentLoaded", o), e.addEventListener("load", o))), xe.promise(t)
    }, ae.ready.promise();
    var Ce = function(e, t, n, r, i, a, o) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === ae.type(n)) {
                i = !0;
                for (s in n) Ce(e, t, s, n[s], !0, a, o)
            } else if (void 0 !== r && (i = !0, ae.isFunction(r) || (o = !0), l && (o ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(ae(e), n)
                })), t))
                for (; u > s; s++) t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : a
        },
        ke = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    s.uid = 1, s.prototype = {
        register: function(e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                value: n,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        },
        cache: function(e) {
            if (!ke(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, ke(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[t] = n;
            else
                for (r in t) i[r] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function(e, t, n) {
            var r;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, ae.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, a = e[this.expando];
            if (void 0 !== a) {
                if (void 0 === t) this.register(e);
                else {
                    ae.isArray(t) ? r = t.concat(t.map(ae.camelCase)) : (i = ae.camelCase(t), t in a ? r = [t, i] : (r = i, r = r in a ? [r] : r.match(we) || [])), n = r.length;
                    for (; n--;) delete a[r[n]]
                }(void 0 === t || ae.isEmptyObject(a)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !ae.isEmptyObject(t)
        }
    };
    var Se = new s,
        Ee = new s,
        De = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Te = /[A-Z]/g;
    ae.extend({
        hasData: function(e) {
            return Ee.hasData(e) || Se.hasData(e)
        },
        data: function(e, t, n) {
            return Ee.access(e, t, n)
        },
        removeData: function(e, t) {
            Ee.remove(e, t)
        },
        _data: function(e, t, n) {
            return Se.access(e, t, n)
        },
        _removeData: function(e, t) {
            Se.remove(e, t)
        }
    }), ae.fn.extend({
        data: function(e, t) {
            var n, r, i, a = this[0],
                o = a && a.attributes;
            if (void 0 === e) {
                if (this.length && (i = Ee.get(a), 1 === a.nodeType && !Se.get(a, "hasDataAttrs"))) {
                    for (n = o.length; n--;) o[n] && (r = o[n].name, 0 === r.indexOf("data-") && (r = ae.camelCase(r.slice(5)), u(a, r, i[r])));
                    Se.set(a, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                Ee.set(this, e)
            }) : Ce(this, function(t) {
                var n, r;
                if (a && void 0 === t) {
                    if (n = Ee.get(a, e) || Ee.get(a, e.replace(Te, "-$&").toLowerCase()), void 0 !== n) return n;
                    if (r = ae.camelCase(e), n = Ee.get(a, r), void 0 !== n) return n;
                    if (n = u(a, r, void 0), void 0 !== n) return n
                } else r = ae.camelCase(e), this.each(function() {
                    var n = Ee.get(this, r);
                    Ee.set(this, r, t), e.indexOf("-") > -1 && void 0 !== n && Ee.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Ee.remove(this, e)
            })
        }
    }), ae.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = Se.get(e, t), n && (!r || ae.isArray(n) ? r = Se.access(e, t, ae.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ae.queue(e, t),
                r = n.length,
                i = n.shift(),
                a = ae._queueHooks(e, t),
                o = function() {
                    ae.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete a.stop, i.call(e, o, a)), !r && a && a.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Se.get(e, n) || Se.access(e, n, {
                empty: ae.Callbacks("once memory").add(function() {
                    Se.remove(e, [t + "queue", n])
                })
            })
        }
    }), ae.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ae.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = ae.queue(this, e, t);
                ae._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ae.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ae.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = ae.Deferred(),
                a = this,
                o = this.length,
                s = function() {
                    --r || i.resolveWith(a, [a])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) n = Se.get(a[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var Ae = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Oe = new RegExp("^(?:([+-])=|)(" + Ae + ")([a-z%]*)$", "i"),
        Me = ["Top", "Right", "Bottom", "Left"],
        Pe = function(e, t) {
            return e = t || e, "none" === ae.css(e, "display") || !ae.contains(e.ownerDocument, e)
        },
        je = /^(?:checkbox|radio)$/i,
        Ne = /<([\w:-]+)/,
        Le = /^$|\/(?:java|ecma)script/i,
        Ie = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ie.optgroup = Ie.option, Ie.tbody = Ie.tfoot = Ie.colgroup = Ie.caption = Ie.thead, Ie.th = Ie.td;
    var Fe = /<|&#?\w+;/;
    ! function() {
        var e = K.createDocumentFragment(),
            t = e.appendChild(K.createElement("div")),
            n = K.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), re.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", re.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var qe = /^key/,
        Ve = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Re = /^([^.]*)(?:\.(.+)|)/;
    ae.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var a, o, s, u, l, c, f, p, d, h, m, g = Se.get(e);
            if (g)
                for (n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = ae.guid++), (u = g.events) || (u = g.events = {}), (o = g.handle) || (o = g.handle = function(t) {
                        return "undefined" != typeof ae && ae.event.triggered !== t.type ? ae.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(we) || [""], l = t.length; l--;) s = Re.exec(t[l]) || [], d = m = s[1], h = (s[2] || "").split(".").sort(), d && (f = ae.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = ae.event.special[d] || {}, c = ae.extend({
                    type: d,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && ae.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, a), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, o) !== !1 || e.addEventListener && e.addEventListener(d, o)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), ae.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var a, o, s, u, l, c, f, p, d, h, m, g = Se.hasData(e) && Se.get(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(we) || [""], l = t.length; l--;)
                    if (s = Re.exec(t[l]) || [], d = m = s[1], h = (s[2] || "").split(".").sort(), d) {
                        for (f = ae.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = a = p.length; a--;) c = p[a], !i && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(a, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        o && !p.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || ae.removeEvent(e, d, g.handle), delete u[d])
                    } else
                        for (d in u) ae.event.remove(e, d + t[l], n, r, !0);
                ae.isEmptyObject(u) && Se.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = ae.event.fix(e);
            var t, n, r, i, a, o = [],
                s = X.call(arguments),
                u = (Se.get(this, "events") || {})[e.type] || [],
                l = ae.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (o = ae.event.handlers.call(this, e, u), t = 0;
                    (i = o[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem, n = 0;
                        (a = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.rnamespace || e.rnamespace.test(a.namespace)) && (e.handleObj = a, e.data = a.data, r = ((ae.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, a, o = [],
                s = t.delegateCount,
                u = e.target;
            if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; u !== this; u = u.parentNode || this)
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                        for (r = [], n = 0; s > n; n++) a = t[n], i = a.selector + " ", void 0 === r[i] && (r[i] = a.needsContext ? ae(i, this).index(u) > -1 : ae.find(i, this, null, [u]).length), r[i] && r.push(a);
                        r.length && o.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return s < t.length && o.push({
                elem: this,
                handlers: t.slice(s)
            }), o
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, a = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[ae.expando]) return e;
            var t, n, r, i = e.type,
                a = e,
                o = this.fixHooks[i];
            for (o || (this.fixHooks[i] = o = Ve.test(i) ? this.mouseHooks : qe.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new ae.Event(a), t = r.length; t--;) n = r[t], e[n] = a[n];
            return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), o.filter ? o.filter(e, a) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== m() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === m() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && ae.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return ae.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, ae.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, ae.Event = function(e, t) {
        return this instanceof ae.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? d : h) : this.type = e, t && ae.extend(this, t), this.timeStamp = e && e.timeStamp || ae.now(), void(this[ae.expando] = !0)) : new ae.Event(e, t)
    }, ae.Event.prototype = {
        constructor: ae.Event,
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = d, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = d, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = d, e && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ae.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        ae.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    a = e.handleObj;
                return (!i || i !== r && !ae.contains(r, i)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ae.fn.extend({
        on: function(e, t, n, r) {
            return g(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return g(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ae(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = h), this.each(function() {
                ae.event.remove(this, e, n, t)
            })
        }
    });
    var Ue = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        He = /<script|<style|<link/i,
        _e = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Be = /^true\/(.*)/,
        ze = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    ae.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ue, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, a, o, s = e.cloneNode(!0),
                u = ae.contains(e.ownerDocument, e);
            if (!(re.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ae.isXMLDoc(e)))
                for (o = c(s), a = c(e), r = 0, i = a.length; i > r; r++) w(a[r], o[r]);
            if (t)
                if (n)
                    for (a = a || c(e), o = o || c(s), r = 0, i = a.length; i > r; r++) b(a[r], o[r]);
                else b(e, s);
            return o = c(s, "script"), o.length > 0 && f(o, !u && c(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, i = ae.event.special, a = 0; void 0 !== (n = e[a]); a++)
                if (ke(n)) {
                    if (t = n[Se.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? ae.event.remove(n, r) : ae.removeEvent(n, r, t.handle);
                        n[Se.expando] = void 0
                    }
                    n[Ee.expando] && (n[Ee.expando] = void 0)
                }
        }
    }), ae.fn.extend({
        domManip: x,
        detach: function(e) {
            return C(this, e, !0)
        },
        remove: function(e) {
            return C(this, e)
        },
        text: function(e) {
            return Ce(this, function(e) {
                return void 0 === e ? ae.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return x(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return x(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return x(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return x(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (ae.cleanData(c(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return ae.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ce(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !He.test(e) && !Ie[(Ne.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = ae.htmlPrefilter(e);
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (ae.cleanData(c(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return x(this, arguments, function(t) {
                var n = this.parentNode;
                ae.inArray(this, e) < 0 && (ae.cleanData(c(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), ae.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ae.fn[e] = function(e) {
            for (var n, r = [], i = ae(e), a = i.length - 1, o = 0; a >= o; o++) n = o === a ? this : this.clone(!0), ae(i[o])[t](n), Q.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var We, Ye = {
            HTML: "block",
            BODY: "block"
        },
        Ge = /^margin/,
        Ke = new RegExp("^(" + Ae + ")(?!px)[a-z%]+$", "i"),
        Xe = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        Je = function(e, t, n, r) {
            var i, a, o = {};
            for (a in t) o[a] = e.style[a], e.style[a] = t[a];
            i = n.apply(e, r || []);
            for (a in t) e.style[a] = o[a];
            return i
        },
        Qe = K.documentElement;
    ! function() {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Qe.appendChild(o);
            var t = e.getComputedStyle(s);
            n = "1%" !== t.top, a = "2px" === t.marginLeft, r = "4px" === t.width, s.style.marginRight = "50%", i = "4px" === t.marginRight, Qe.removeChild(o)
        }
        var n, r, i, a, o = K.createElement("div"),
            s = K.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", re.clearCloneStyle = "content-box" === s.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(s), ae.extend(re, {
            pixelPosition: function() {
                return t(), n
            },
            boxSizingReliable: function() {
                return null == r && t(), r
            },
            pixelMarginRight: function() {
                return null == r && t(), i
            },
            reliableMarginLeft: function() {
                return null == r && t(), a
            },
            reliableMarginRight: function() {
                var t, n = s.appendChild(K.createElement("div"));
                return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Qe.appendChild(o), t = !parseFloat(e.getComputedStyle(n).marginRight), Qe.removeChild(o), s.removeChild(n), t
            }
        }))
    }();
    var Ze = /^(none|table(?!-c[ea]).+)/,
        et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        tt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        nt = ["Webkit", "O", "Moz", "ms"],
        rt = K.createElement("div").style;
    ae.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = E(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, a, o, s = ae.camelCase(t),
                    u = e.style;
                return t = ae.cssProps[s] || (ae.cssProps[s] = T(s) || s), o = ae.cssHooks[t] || ae.cssHooks[s], void 0 === n ? o && "get" in o && void 0 !== (i = o.get(e, !1, r)) ? i : u[t] : (a = typeof n, "string" === a && (i = Oe.exec(n)) && i[1] && (n = l(e, t, i), a = "number"), null != n && n === n && ("number" === a && (n += i && i[3] || (ae.cssNumber[s] ? "" : "px")), re.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), o && "set" in o && void 0 === (n = o.set(e, n, r)) || (u[t] = n)), void 0)
            }
        },
        css: function(e, t, n, r) {
            var i, a, o, s = ae.camelCase(t);
            return t = ae.cssProps[s] || (ae.cssProps[s] = T(s) || s), o = ae.cssHooks[t] || ae.cssHooks[s], o && "get" in o && (i = o.get(e, !0, n)), void 0 === i && (i = E(e, t, r)), "normal" === i && t in tt && (i = tt[t]), "" === n || n ? (a = parseFloat(i), n === !0 || isFinite(a) ? a || 0 : i) : i
        }
    }), ae.each(["height", "width"], function(e, t) {
        ae.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? Ze.test(ae.css(e, "display")) && 0 === e.offsetWidth ? Je(e, et, function() {
                    return M(e, t, r)
                }) : M(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i, a = r && Xe(e),
                    o = r && O(e, t, r, "border-box" === ae.css(e, "boxSizing", !1, a), a);
                return o && (i = Oe.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = ae.css(e, t)), A(e, n, o)
            }
        }
    }), ae.cssHooks.marginLeft = D(re.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(E(e, "marginLeft")) || e.getBoundingClientRect().left - Je(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px" : void 0
    }), ae.cssHooks.marginRight = D(re.reliableMarginRight, function(e, t) {
        return t ? Je(e, {
            display: "inline-block"
        }, E, [e, "marginRight"]) : void 0
    }), ae.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ae.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Me[r] + t] = a[r] || a[r - 2] || a[0];
                return i
            }
        }, Ge.test(e) || (ae.cssHooks[e + t].set = A)
    }), ae.fn.extend({
        css: function(e, t) {
            return Ce(this, function(e, t, n) {
                var r, i, a = {},
                    o = 0;
                if (ae.isArray(t)) {
                    for (r = Xe(e), i = t.length; i > o; o++) a[t[o]] = ae.css(e, t[o], !1, r);
                    return a
                }
                return void 0 !== n ? ae.style(e, t, n) : ae.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return P(this, !0)
        },
        hide: function() {
            return P(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Pe(this) ? ae(this).show() : ae(this).hide()
            })
        }
    }), ae.Tween = j, j.prototype = {
        constructor: j,
        init: function(e, t, n, r, i, a) {
            this.elem = e, this.prop = n, this.easing = i || ae.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = a || (ae.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = j.propHooks[this.prop];
            return e && e.get ? e.get(this) : j.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = j.propHooks[this.prop];
            return this.options.duration ? this.pos = t = ae.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
        }
    }, j.prototype.init.prototype = j.prototype, j.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ae.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                ae.fx.step[e.prop] ? ae.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[ae.cssProps[e.prop]] && !ae.cssHooks[e.prop] ? e.elem[e.prop] = e.now : ae.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ae.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, ae.fx = j.prototype.init, ae.fx.step = {};
    var it, at, ot = /^(?:toggle|show|hide)$/,
        st = /queueHooks$/;
    ae.Animation = ae.extend(V, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return l(n.elem, e, Oe.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                ae.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(we);
                for (var n, r = 0, i = e.length; i > r; r++) n = e[r], V.tweeners[n] = V.tweeners[n] || [], V.tweeners[n].unshift(t)
            },
            prefilters: [F],
            prefilter: function(e, t) {
                t ? V.prefilters.unshift(e) : V.prefilters.push(e)
            }
        }), ae.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? ae.extend({}, e) : {
                complete: n || !n && t || ae.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ae.isFunction(t) && t
            };
            return r.duration = ae.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ae.fx.speeds ? ae.fx.speeds[r.duration] : ae.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                ae.isFunction(r.old) && r.old.call(this), r.queue && ae.dequeue(this, r.queue)
            }, r
        }, ae.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(Pe).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = ae.isEmptyObject(e),
                    a = ae.speed(t, n, r),
                    o = function() {
                        var t = V(this, ae.extend({}, e), a);
                        (i || Se.get(this, "finish")) && t.stop(!0)
                    };
                return o.finish = o, i || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        a = ae.timers,
                        o = Se.get(this);
                    if (i) o[i] && o[i].stop && r(o[i]);
                    else
                        for (i in o) o[i] && o[i].stop && st.test(i) && r(o[i]);
                    for (i = a.length; i--;) a[i].elem !== this || null != e && a[i].queue !== e || (a[i].anim.stop(n), t = !1, a.splice(i, 1));
                    (t || !n) && ae.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = Se.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        a = ae.timers,
                        o = r ? r.length : 0;
                    for (n.finish = !0, ae.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                    for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), ae.each(["toggle", "show", "hide"], function(e, t) {
            var n = ae.fn[t];
            ae.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(L(t, !0), e, r, i)
            }
        }), ae.each({
            slideDown: L("show"),
            slideUp: L("hide"),
            slideToggle: L("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            ae.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), ae.timers = [], ae.fx.tick = function() {
            var e, t = 0,
                n = ae.timers;
            for (it = ae.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || ae.fx.stop(),
                it = void 0
        }, ae.fx.timer = function(e) {
            ae.timers.push(e), e() ? ae.fx.start() : ae.timers.pop()
        }, ae.fx.interval = 13, ae.fx.start = function() {
            at || (at = e.setInterval(ae.fx.tick, ae.fx.interval))
        }, ae.fx.stop = function() {
            e.clearInterval(at), at = null
        }, ae.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ae.fn.delay = function(t, n) {
            return t = ae.fx ? ae.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(i)
                }
            })
        },
        function() {
            var e = K.createElement("input"),
                t = K.createElement("select"),
                n = t.appendChild(K.createElement("option"));
            e.type = "checkbox", re.checkOn = "" !== e.value, re.optSelected = n.selected, t.disabled = !0, re.optDisabled = !n.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", re.radioValue = "t" === e.value
        }();
    var ut, lt = ae.expr.attrHandle;
    ae.fn.extend({
        attr: function(e, t) {
            return Ce(this, ae.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ae.removeAttr(this, e)
            })
        }
    }), ae.extend({
        attr: function(e, t, n) {
            var r, i, a = e.nodeType;
            if (3 !== a && 8 !== a && 2 !== a) return "undefined" == typeof e.getAttribute ? ae.prop(e, t, n) : (1 === a && ae.isXMLDoc(e) || (t = t.toLowerCase(), i = ae.attrHooks[t] || (ae.expr.match.bool.test(t) ? ut : void 0)), void 0 !== n ? null === n ? void ae.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = ae.find.attr(e, t), null == r ? void 0 : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!re.radioValue && "radio" === t && ae.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                a = t && t.match(we);
            if (a && 1 === e.nodeType)
                for (; n = a[i++];) r = ae.propFix[n] || n, ae.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        }
    }), ut = {
        set: function(e, t, n) {
            return t === !1 ? ae.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, ae.each(ae.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = lt[t] || ae.find.attr;
        lt[t] = function(e, t, r) {
            var i, a;
            return r || (a = lt[t], lt[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, lt[t] = a), i
        }
    });
    var ct = /^(?:input|select|textarea|button)$/i,
        ft = /^(?:a|area)$/i;
    ae.fn.extend({
        prop: function(e, t) {
            return Ce(this, ae.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[ae.propFix[e] || e]
            })
        }
    }), ae.extend({
        prop: function(e, t, n) {
            var r, i, a = e.nodeType;
            if (3 !== a && 8 !== a && 2 !== a) return 1 === a && ae.isXMLDoc(e) || (t = ae.propFix[t] || t, i = ae.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ae.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ct.test(e.nodeName) || ft.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), re.optSelected || (ae.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), ae.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ae.propFix[this.toLowerCase()] = this
    });
    var pt = /[\t\r\n\f]/g;
    ae.fn.extend({
        addClass: function(e) {
            var t, n, r, i, a, o, s, u = 0;
            if (ae.isFunction(e)) return this.each(function(t) {
                ae(this).addClass(e.call(this, t, R(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(we) || []; n = this[u++];)
                    if (i = R(n), r = 1 === n.nodeType && (" " + i + " ").replace(pt, " ")) {
                        for (o = 0; a = t[o++];) r.indexOf(" " + a + " ") < 0 && (r += a + " ");
                        s = ae.trim(r), i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, a, o, s, u = 0;
            if (ae.isFunction(e)) return this.each(function(t) {
                ae(this).removeClass(e.call(this, t, R(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(we) || []; n = this[u++];)
                    if (i = R(n), r = 1 === n.nodeType && (" " + i + " ").replace(pt, " ")) {
                        for (o = 0; a = t[o++];)
                            for (; r.indexOf(" " + a + " ") > -1;) r = r.replace(" " + a + " ", " ");
                        s = ae.trim(r), i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ae.isFunction(e) ? this.each(function(n) {
                ae(this).toggleClass(e.call(this, n, R(this), t), t)
            }) : this.each(function() {
                var t, r, i, a;
                if ("string" === n)
                    for (r = 0, i = ae(this), a = e.match(we) || []; t = a[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else(void 0 === e || "boolean" === n) && (t = R(this), t && Se.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Se.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + R(n) + " ").replace(pt, " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var dt = /\r/g;
    ae.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = ae.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, ae(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : ae.isArray(i) && (i = ae.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = ae.valHooks[this.type] || ae.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return t = ae.valHooks[i.type] || ae.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(dt, "") : null == n ? "" : n)
            }
        }
    }), ae.extend({
        valHooks: {
            option: {
                get: function(e) {
                    return ae.trim(e.value)
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || 0 > i, o = a ? null : [], s = a ? i + 1 : r.length, u = 0 > i ? s : a ? i : 0; s > u; u++)
                        if (n = r[u], (n.selected || u === i) && (re.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ae.nodeName(n.parentNode, "optgroup"))) {
                            if (t = ae(n).val(), a) return t;
                            o.push(t)
                        }
                    return o
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, a = ae.makeArray(t), o = i.length; o--;) r = i[o], (r.selected = ae.inArray(ae.valHooks.option.get(r), a) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), a
                }
            }
        }
    }), ae.each(["radio", "checkbox"], function() {
        ae.valHooks[this] = {
            set: function(e, t) {
                return ae.isArray(t) ? e.checked = ae.inArray(ae(e).val(), t) > -1 : void 0
            }
        }, re.checkOn || (ae.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var ht = /^(?:focusinfocus|focusoutblur)$/;
    ae.extend(ae.event, {
        trigger: function(t, n, r, i) {
            var a, o, s, u, l, c, f, p = [r || K],
                d = ne.call(t, "type") ? t.type : t,
                h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
            if (o = s = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !ht.test(d + ae.event.triggered) && (d.indexOf(".") > -1 && (h = d.split("."), d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[ae.expando] ? t : new ae.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : ae.makeArray(n, [t]), f = ae.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !ae.isWindow(r)) {
                    for (u = f.delegateType || d, ht.test(u + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), s = o;
                    s === (r.ownerDocument || K) && p.push(s.defaultView || s.parentWindow || e)
                }
                for (a = 0;
                    (o = p[a++]) && !t.isPropagationStopped();) t.type = a > 1 ? u : f.bindType || d, c = (Se.get(o, "events") || {})[t.type] && Se.get(o, "handle"), c && c.apply(o, n), c = l && o[l], c && c.apply && ke(o) && (t.result = c.apply(o, n), t.result === !1 && t.preventDefault());
                return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !ke(r) || l && ae.isFunction(r[d]) && !ae.isWindow(r) && (s = r[l], s && (r[l] = null), ae.event.triggered = d, r[d](), ae.event.triggered = void 0, s && (r[l] = s)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = ae.extend(new ae.Event, n, {
                type: e,
                isSimulated: !0
            });
            ae.event.trigger(r, null, t), r.isDefaultPrevented() && n.preventDefault()
        }
    }), ae.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                ae.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? ae.event.trigger(e, t, n, !0) : void 0
        }
    }), ae.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ae.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ae.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), re.focusin = "onfocusin" in e, re.focusin || ae.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            ae.event.simulate(t, e.target, ae.event.fix(e))
        };
        ae.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = Se.access(r, t);
                i || r.addEventListener(e, n, !0), Se.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = Se.access(r, t) - 1;
                i ? Se.access(r, t, i) : (r.removeEventListener(e, n, !0), Se.remove(r, t))
            }
        }
    });
    var mt = e.location,
        gt = ae.now(),
        vt = /\?/;
    ae.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, ae.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (r) {
            n = void 0
        }
        return (!n || n.getElementsByTagName("parsererror").length) && ae.error("Invalid XML: " + t), n
    };
    var $t = /#.*$/,
        yt = /([?&])_=[^&]*/,
        bt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        wt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        xt = /^(?:GET|HEAD)$/,
        Ct = /^\/\//,
        kt = {},
        St = {},
        Et = "*/".concat("*"),
        Dt = K.createElement("a");
    Dt.href = mt.href, ae.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: mt.href,
            type: "GET",
            isLocal: wt.test(mt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Et,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ae.parseJSON,
                "text xml": ae.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? _(_(e, ae.ajaxSettings), t) : _(ae.ajaxSettings, e)
        },
        ajaxPrefilter: U(kt),
        ajaxTransport: U(St),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var l, f, $, y, w, C = n;
                2 !== b && (b = 2, u && e.clearTimeout(u), i = void 0, o = s || "", x.readyState = t > 0 ? 4 : 0, l = t >= 200 && 300 > t || 304 === t, r && (y = B(p, x, r)), y = z(p, y, x, l), l ? (p.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (ae.lastModified[a] = w), w = x.getResponseHeader("etag"), w && (ae.etag[a] = w)), 204 === t || "HEAD" === p.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = y.state, f = y.data, $ = y.error, l = !$)) : ($ = C, (t || !C) && (C = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (n || C) + "", l ? m.resolveWith(d, [f, C, x]) : m.rejectWith(d, [x, C, $]), x.statusCode(v), v = void 0, c && h.trigger(l ? "ajaxSuccess" : "ajaxError", [x, p, l ? f : $]), g.fireWith(d, [x, C]), c && (h.trigger("ajaxComplete", [x, p]), --ae.active || ae.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, a, o, s, u, l, c, f, p = ae.ajaxSetup({}, n),
                d = p.context || p,
                h = p.context && (d.nodeType || d.jquery) ? ae(d) : ae.event,
                m = ae.Deferred(),
                g = ae.Callbacks("once memory"),
                v = p.statusCode || {},
                $ = {},
                y = {},
                b = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === b) {
                            if (!s)
                                for (s = {}; t = bt.exec(o);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? o : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, $[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return b || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > b)
                                for (t in e) v[t] = [v[t], e[t]];
                            else x.always(e[x.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || w;
                        return i && i.abort(t), r(0, t), this
                    }
                };
            if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, p.url = ((t || p.url || mt.href) + "").replace($t, "").replace(Ct, mt.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ae.trim(p.dataType || "*").toLowerCase().match(we) || [""], null == p.crossDomain) {
                l = K.createElement("a");
                try {
                    l.href = p.url, l.href = l.href, p.crossDomain = Dt.protocol + "//" + Dt.host != l.protocol + "//" + l.host
                } catch (C) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p.data && (p.data = ae.param(p.data, p.traditional)), H(kt, p, n, x), 2 === b) return x;
            c = ae.event && p.global, c && 0 === ae.active++ && ae.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !xt.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (vt.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = yt.test(a) ? a.replace(yt, "$1_=" + gt++) : a + (vt.test(a) ? "&" : "?") + "_=" + gt++)), p.ifModified && (ae.lastModified[a] && x.setRequestHeader("If-Modified-Since", ae.lastModified[a]), ae.etag[a] && x.setRequestHeader("If-None-Match", ae.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", p.contentType), x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Et + "; q=0.01" : "") : p.accepts["*"]);
            for (f in p.headers) x.setRequestHeader(f, p.headers[f]);
            if (p.beforeSend && (p.beforeSend.call(d, x, p) === !1 || 2 === b)) return x.abort();
            w = "abort";
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[f](p[f]);
            if (i = H(St, p, n, x)) {
                if (x.readyState = 1, c && h.trigger("ajaxSend", [x, p]), 2 === b) return x;
                p.async && p.timeout > 0 && (u = e.setTimeout(function() {
                    x.abort("timeout")
                }, p.timeout));
                try {
                    b = 1, i.send($, r)
                } catch (C) {
                    if (!(2 > b)) throw C;
                    r(-1, C)
                }
            } else r(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return ae.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ae.get(e, void 0, t, "script")
        }
    }), ae.each(["get", "post"], function(e, t) {
        ae[t] = function(e, n, r, i) {
            return ae.isFunction(n) && (i = i || r, r = n, n = void 0), ae.ajax(ae.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, ae.isPlainObject(e) && e))
        }
    }), ae._evalUrl = function(e) {
        return ae.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, ae.fn.extend({
        wrapAll: function(e) {
            var t;
            return ae.isFunction(e) ? this.each(function(t) {
                ae(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = ae(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return ae.isFunction(e) ? this.each(function(t) {
                ae(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = ae(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ae.isFunction(e);
            return this.each(function(n) {
                ae(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ae.nodeName(this, "body") || ae(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ae.expr.filters.hidden = function(e) {
        return !ae.expr.filters.visible(e)
    }, ae.expr.filters.visible = function(e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    };
    var Tt = /%20/g,
        At = /\[\]$/,
        Ot = /\r?\n/g,
        Mt = /^(?:submit|button|image|reset|file)$/i,
        Pt = /^(?:input|select|textarea|keygen)/i;
    ae.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = ae.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = ae.ajaxSettings && ae.ajaxSettings.traditional), ae.isArray(e) || e.jquery && !ae.isPlainObject(e)) ae.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) W(n, e[n], t, i);
        return r.join("&").replace(Tt, "+")
    }, ae.fn.extend({
        serialize: function() {
            return ae.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ae.prop(this, "elements");
                return e ? ae.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ae(this).is(":disabled") && Pt.test(this.nodeName) && !Mt.test(e) && (this.checked || !je.test(e))
            }).map(function(e, t) {
                var n = ae(this).val();
                return null == n ? null : ae.isArray(n) ? ae.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Ot, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Ot, "\r\n")
                }
            }).get()
        }
    }), ae.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var jt = {
            0: 200,
            1223: 204
        },
        Nt = ae.ajaxSettings.xhr();
    re.cors = !!Nt && "withCredentials" in Nt, re.ajax = Nt = !!Nt, ae.ajaxTransport(function(t) {
        var n, r;
        return re.cors || Nt && !t.crossDomain ? {
            send: function(i, a) {
                var o, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (o in t.xhrFields) s[o] = t.xhrFields[o];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (o in i) s.setRequestHeader(o, i[o]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? a(0, "error") : a(s.status, s.statusText) : a(jt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (u) {
                    if (n) throw u
                }
            },
            abort: function() {
                n && n()
            }
        } : void 0
    }), ae.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return ae.globalEval(e), e
            }
        }
    }), ae.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), ae.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = ae("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), K.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Lt = [],
        It = /(=)\?(?=&|$)|\?\?/;
    ae.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Lt.pop() || ae.expando + "_" + gt++;
            return this[e] = !0, e
        }
    }), ae.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, a, o, s = t.jsonp !== !1 && (It.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && It.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = ae.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(It, "$1" + i) : t.jsonp !== !1 && (t.url += (vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return o || ae.error(i + " was not called"), o[0]
        }, t.dataTypes[0] = "json", a = e[i], e[i] = function() {
            o = arguments
        }, r.always(function() {
            void 0 === a ? ae(e).removeProp(i) : e[i] = a, t[i] && (t.jsonpCallback = n.jsonpCallback, Lt.push(i)), o && ae.isFunction(a) && a(o[0]), o = a = void 0
        }), "script") : void 0
    }), re.createHTMLDocument = function() {
        var e = K.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), ae.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || (re.createHTMLDocument ? K.implementation.createHTMLDocument("") : K);
        var r = he.exec(e),
            i = !n && [];
        return r ? [t.createElement(r[1])] : (r = p([e], t, i), i && i.length && ae(i).remove(), ae.merge([], r.childNodes))
    };
    var Ft = ae.fn.load;
    ae.fn.load = function(e, t, n) {
        if ("string" != typeof e && Ft) return Ft.apply(this, arguments);
        var r, i, a, o = this,
            s = e.indexOf(" ");
        return s > -1 && (r = ae.trim(e.slice(s)), e = e.slice(0, s)), ae.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), o.length > 0 && ae.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            a = arguments, o.html(r ? ae("<div>").append(ae.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            o.each(function() {
                n.apply(o, a || [e.responseText, t, e])
            })
        }), this
    }, ae.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ae.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ae.expr.filters.animated = function(e) {
        return ae.grep(ae.timers, function(t) {
            return e === t.elem
        }).length
    }, ae.offset = {
        setOffset: function(e, t, n) {
            var r, i, a, o, s, u, l, c = ae.css(e, "position"),
                f = ae(e),
                p = {};
            "static" === c && (e.style.position = "relative"), s = f.offset(), a = ae.css(e, "top"), u = ae.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (a + u).indexOf("auto") > -1, l ? (r = f.position(), o = r.top, i = r.left) : (o = parseFloat(a) || 0, i = parseFloat(u) || 0), ae.isFunction(t) && (t = t.call(e, n, ae.extend({}, s))), null != t.top && (p.top = t.top - s.top + o), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, ae.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                ae.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0],
                i = {
                    top: 0,
                    left: 0
                },
                a = r && r.ownerDocument;
            if (a) return t = a.documentElement, ae.contains(t, r) ? (i = r.getBoundingClientRect(), n = Y(a), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === ae.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ae.nodeName(e[0], "html") || (r = e.offset()), r.top += ae.css(e[0], "borderTopWidth", !0), r.left += ae.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - ae.css(n, "marginTop", !0),
                    left: t.left - r.left - ae.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === ae.css(e, "position");) e = e.offsetParent;
                return e || Qe
            })
        }
    }), ae.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        ae.fn[e] = function(r) {
            return Ce(this, function(e, r, i) {
                var a = Y(e);
                return void 0 === i ? a ? a[t] : e[r] : void(a ? a.scrollTo(n ? a.pageXOffset : i, n ? i : a.pageYOffset) : e[r] = i)
            }, e, r, arguments.length)
        }
    }), ae.each(["top", "left"], function(e, t) {
        ae.cssHooks[t] = D(re.pixelPosition, function(e, n) {
            return n ? (n = E(e, t), Ke.test(n) ? ae(e).position()[t] + "px" : n) : void 0
        })
    }), ae.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        ae.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            ae.fn[r] = function(r, i) {
                var a = arguments.length && (n || "boolean" != typeof r),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return Ce(this, function(t, n, r) {
                    var i;
                    return ae.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? ae.css(t, n, o) : ae.style(t, n, r, o)
                }, t, a ? r : void 0, a, null)
            }
        })
    }), ae.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        size: function() {
            return this.length
        }
    }), ae.fn.andSelf = ae.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ae
    });
    var qt = e.jQuery,
        Vt = e.$;
    return ae.noConflict = function(t) {
        return e.$ === ae && (e.$ = Vt), t && e.jQuery === ae && (e.jQuery = qt), ae
    }, t || (e.jQuery = e.$ = ae), ae
}),
function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t = t || Error,
            function() {
                var n, r, i = 2,
                    a = arguments,
                    o = a[0],
                    s = "[" + (e ? e + ":" : "") + o + "] ",
                    u = a[1];
                for (s += u.replace(/\{\d+\}/g, function(e) {
                        var t = +e.slice(1, -1),
                            n = t + i;
                        return n < a.length ? be(a[n]) : e
                    }), s += "\nhttp://errors.angularjs.org/1.5.0/" + (e ? e + "/" : "") + o, r = i, n = "?"; r < a.length; r++, n = "&") s += n + "p" + (r - i) + "=" + encodeURIComponent(be(a[r]));
                return new t(s)
            }
    }

    function i(e) {
        if (null == e || T(e)) return !1;
        if (Wr(e) || C(e) || Lr && e instanceof Lr) return !0;
        var t = "length" in Object(e) && e.length;
        return k(t) && (t >= 0 && (t - 1 in e || e instanceof Array) || "function" == typeof e.item)
    }

    function a(e, t, n) {
        var r, o;
        if (e)
            if (E(e))
                for (r in e) "prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r, e);
            else if (Wr(e) || i(e)) {
            var s = "object" != typeof e;
            for (r = 0, o = e.length; o > r; r++)(s || r in e) && t.call(n, e[r], r, e)
        } else if (e.forEach && e.forEach !== a) e.forEach(t, n, e);
        else if (x(e))
            for (r in e) t.call(n, e[r], r, e);
        else if ("function" == typeof e.hasOwnProperty)
            for (r in e) e.hasOwnProperty(r) && t.call(n, e[r], r, e);
        else
            for (r in e) Ar.call(e, r) && t.call(n, e[r], r, e);
        return e
    }

    function o(e, t, n) {
        for (var r = Object.keys(e).sort(), i = 0; i < r.length; i++) t.call(n, e[r[i]], r[i]);
        return r
    }

    function s(e) {
        return function(t, n) {
            e(n, t)
        }
    }

    function u() {
        return ++zr
    }

    function l(e, t) {
        t ? e.$$hashKey = t : delete e.$$hashKey
    }

    function c(e, t, n) {
        for (var r = e.$$hashKey, i = 0, a = t.length; a > i; ++i) {
            var o = t[i];
            if (w(o) || E(o))
                for (var s = Object.keys(o), u = 0, f = s.length; f > u; u++) {
                    var p = s[u],
                        d = o[p];
                    n && w(d) ? S(d) ? e[p] = new Date(d.valueOf()) : D(d) ? e[p] = new RegExp(d) : d.nodeName ? e[p] = d.cloneNode(!0) : F(d) ? e[p] = d.clone() : (w(e[p]) || (e[p] = Wr(d) ? [] : {}), c(e[p], [d], !0)) : e[p] = d
                }
        }
        return l(e, r), e
    }

    function f(e) {
        return c(e, qr.call(arguments, 1), !1)
    }

    function p(e) {
        return c(e, qr.call(arguments, 1), !0)
    }

    function d(e) {
        return parseInt(e, 10)
    }

    function h(e, t) {
        return f(Object.create(e), t)
    }

    function m() {}

    function g(e) {
        return e
    }

    function v(e) {
        return function() {
            return e
        }
    }

    function $(e) {
        return E(e.toString) && e.toString !== Ur
    }

    function y(e) {
        return "undefined" == typeof e
    }

    function b(e) {
        return "undefined" != typeof e
    }

    function w(e) {
        return null !== e && "object" == typeof e
    }

    function x(e) {
        return null !== e && "object" == typeof e && !Hr(e)
    }

    function C(e) {
        return "string" == typeof e
    }

    function k(e) {
        return "number" == typeof e
    }

    function S(e) {
        return "[object Date]" === Ur.call(e)
    }

    function E(e) {
        return "function" == typeof e
    }

    function D(e) {
        return "[object RegExp]" === Ur.call(e)
    }

    function T(e) {
        return e && e.window === e
    }

    function A(e) {
        return e && e.$evalAsync && e.$watch
    }

    function O(e) {
        return "[object File]" === Ur.call(e)
    }

    function M(e) {
        return "[object FormData]" === Ur.call(e)
    }

    function P(e) {
        return "[object Blob]" === Ur.call(e)
    }

    function j(e) {
        return "boolean" == typeof e
    }

    function N(e) {
        return e && E(e.then)
    }

    function L(e) {
        return e && k(e.length) && Yr.test(Ur.call(e))
    }

    function I(e) {
        return "[object ArrayBuffer]" === Ur.call(e)
    }

    function F(e) {
        return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
    }

    function q(e) {
        var t, n = {},
            r = e.split(",");
        for (t = 0; t < r.length; t++) n[r[t]] = !0;
        return n
    }

    function V(e) {
        return Or(e.nodeName || e[0] && e[0].nodeName)
    }

    function R(e, t) {
        var n = e.indexOf(t);
        return n >= 0 && e.splice(n, 1), n
    }

    function U(e, t) {
        function r(e, t) {
            var n, r = t.$$hashKey;
            if (Wr(e))
                for (var a = 0, o = e.length; o > a; a++) t.push(i(e[a]));
            else if (x(e))
                for (n in e) t[n] = i(e[n]);
            else if (e && "function" == typeof e.hasOwnProperty)
                for (n in e) e.hasOwnProperty(n) && (t[n] = i(e[n]));
            else
                for (n in e) Ar.call(e, n) && (t[n] = i(e[n]));
            return l(t, r), t
        }

        function i(e) {
            if (!w(e)) return e;
            var t = s.indexOf(e);
            if (-1 !== t) return u[t];
            if (T(e) || A(e)) throw _r("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
            var i = !1,
                a = o(e);
            return a === n && (a = Wr(e) ? [] : Object.create(Hr(e)), i = !0), s.push(e), u.push(a), i ? r(e, a) : a
        }

        function o(e) {
            switch (Ur.call(e)) {
                case "[object Int8Array]":
                case "[object Int16Array]":
                case "[object Int32Array]":
                case "[object Float32Array]":
                case "[object Float64Array]":
                case "[object Uint8Array]":
                case "[object Uint8ClampedArray]":
                case "[object Uint16Array]":
                case "[object Uint32Array]":
                    return new e.constructor(i(e.buffer));
                case "[object ArrayBuffer]":
                    if (!e.slice) {
                        var t = new ArrayBuffer(e.byteLength);
                        return new Uint8Array(t).set(new Uint8Array(e)), t
                    }
                    return e.slice(0);
                case "[object Boolean]":
                case "[object Number]":
                case "[object String]":
                case "[object Date]":
                    return new e.constructor(e.valueOf());
                case "[object RegExp]":
                    var n = new RegExp(e.source, e.toString().match(/[^\/]*$/)[0]);
                    return n.lastIndex = e.lastIndex, n
            }
            return E(e.cloneNode) ? e.cloneNode(!0) : void 0
        }
        var s = [],
            u = [];
        if (t) {
            if (L(t) || I(t)) throw _r("cpta", "Can't copy! TypedArray destination cannot be mutated.");
            if (e === t) throw _r("cpi", "Can't copy! Source and destination are identical.");
            return Wr(t) ? t.length = 0 : a(t, function(e, n) {
                "$$hashKey" !== n && delete t[n]
            }), s.push(e), u.push(t), r(e, t)
        }
        return i(e)
    }

    function H(e, t) {
        if (Wr(e)) {
            t = t || [];
            for (var n = 0, r = e.length; r > n; n++) t[n] = e[n]
        } else if (w(e)) {
            t = t || {};
            for (var i in e)("$" !== i.charAt(0) || "$" !== i.charAt(1)) && (t[i] = e[i])
        }
        return t || e
    }

    function _(e, t) {
        if (e === t) return !0;
        if (null === e || null === t) return !1;
        if (e !== e && t !== t) return !0;
        var n, r, i, a = typeof e,
            o = typeof t;
        if (a == o && "object" == a) {
            if (!Wr(e)) {
                if (S(e)) return S(t) ? _(e.getTime(), t.getTime()) : !1;
                if (D(e)) return D(t) ? e.toString() == t.toString() : !1;
                if (A(e) || A(t) || T(e) || T(t) || Wr(t) || S(t) || D(t)) return !1;
                i = ve();
                for (r in e)
                    if ("$" !== r.charAt(0) && !E(e[r])) {
                        if (!_(e[r], t[r])) return !1;
                        i[r] = !0
                    }
                for (r in t)
                    if (!(r in i) && "$" !== r.charAt(0) && b(t[r]) && !E(t[r])) return !1;
                return !0
            }
            if (!Wr(t)) return !1;
            if ((n = e.length) == t.length) {
                for (r = 0; n > r; r++)
                    if (!_(e[r], t[r])) return !1;
                return !0
            }
        }
        return !1
    }

    function B(e, t, n) {
        return e.concat(qr.call(t, n))
    }

    function z(e, t) {
        return qr.call(e, t || 0)
    }

    function W(e, t) {
        var n = arguments.length > 2 ? z(arguments, 2) : [];
        return !E(t) || t instanceof RegExp ? t : n.length ? function() {
            return arguments.length ? t.apply(e, B(n, arguments, 0)) : t.apply(e, n)
        } : function() {
            return arguments.length ? t.apply(e, arguments) : t.call(e)
        }
    }

    function Y(e, r) {
        var i = r;
        return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? i = n : T(r) ? i = "$WINDOW" : r && t === r ? i = "$DOCUMENT" : A(r) && (i = "$SCOPE"), i
    }

    function G(e, t) {
        return y(e) ? n : (k(t) || (t = t ? 2 : null), JSON.stringify(e, Y, t))
    }

    function K(e) {
        return C(e) ? JSON.parse(e) : e
    }

    function X(e, t) {
        e = e.replace(Qr, "");
        var n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(n) ? t : n
    }

    function J(e, t) {
        return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
    }

    function Q(e, t, n) {
        n = n ? -1 : 1;
        var r = e.getTimezoneOffset(),
            i = X(t, r);
        return J(e, n * (i - r))
    }

    function Z(e) {
        e = Lr(e).clone();
        try {
            e.empty()
        } catch (t) {}
        var n = Lr("<div>").append(e).html();
        try {
            return e[0].nodeType === ii ? Or(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
                return "<" + Or(t)
            })
        } catch (t) {
            return Or(n)
        }
    }

    function ee(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {}
    }

    function te(e) {
        var t = {};
        return a((e || "").split("&"), function(e) {
            var n, r, i;
            e && (r = e = e.replace(/\+/g, "%20"), n = e.indexOf("="), -1 !== n && (r = e.substring(0, n), i = e.substring(n + 1)), r = ee(r), b(r) && (i = b(i) ? ee(i) : !0, Ar.call(t, r) ? Wr(t[r]) ? t[r].push(i) : t[r] = [t[r], i] : t[r] = i))
        }), t
    }

    function ne(e) {
        var t = [];
        return a(e, function(e, n) {
            Wr(e) ? a(e, function(e) {
                t.push(ie(n, !0) + (e === !0 ? "" : "=" + ie(e, !0)))
            }) : t.push(ie(n, !0) + (e === !0 ? "" : "=" + ie(e, !0)))
        }), t.length ? t.join("&") : ""
    }

    function re(e) {
        return ie(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function ie(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, t ? "%20" : "+")
    }

    function ae(e, t) {
        var n, r, i = Zr.length;
        for (r = 0; i > r; ++r)
            if (n = Zr[r] + t, C(n = e.getAttribute(n))) return n;
        return null
    }

    function oe(e, t) {
        var n, r, i = {};
        a(Zr, function(t) {
            var i = t + "app";
            !n && e.hasAttribute && e.hasAttribute(i) && (n = e, r = e.getAttribute(i))
        }), a(Zr, function(t) {
            var i, a = t + "app";
            !n && (i = e.querySelector("[" + a.replace(":", "\\:") + "]")) && (n = i, r = i.getAttribute(a))
        }), n && (i.strictDi = null !== ae(n, "strict-di"), t(n, r ? [r] : [], i))
    }

    function se(n, r, i) {
        w(i) || (i = {});
        var o = {
            strictDi: !1
        };
        i = f(o, i);
        var s = function() {
                if (n = Lr(n), n.injector()) {
                    var e = n[0] === t ? "document" : Z(n);
                    throw _r("btstrpd", "App Already Bootstrapped with this Element '{0}'", e.replace(/</, "&lt;").replace(/>/, "&gt;"))
                }
                r = r || [], r.unshift(["$provide", function(e) {
                    e.value("$rootElement", n)
                }]), i.debugInfoEnabled && r.push(["$compileProvider", function(e) {
                    e.debugInfoEnabled(!0)
                }]), r.unshift("ng");
                var a = it(r, i.strictDi);
                return a.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(e, t, n, r) {
                    e.$apply(function() {
                        t.data("$injector", r), n(t)(e)
                    })
                }]), a
            },
            u = /^NG_ENABLE_DEBUG_INFO!/,
            l = /^NG_DEFER_BOOTSTRAP!/;
        return e && u.test(e.name) && (i.debugInfoEnabled = !0, e.name = e.name.replace(u, "")), e && !l.test(e.name) ? s() : (e.name = e.name.replace(l, ""), Br.resumeBootstrap = function(e) {
            return a(e, function(e) {
                r.push(e)
            }), s()
        }, void(E(Br.resumeDeferredBootstrap) && Br.resumeDeferredBootstrap()))
    }

    function ue() {
        e.name = "NG_ENABLE_DEBUG_INFO!" + e.name, e.location.reload()
    }

    function le(e) {
        var t = Br.element(e).injector();
        if (!t) throw _r("test", "no injector found for element argument to getTestability");
        return t.get("$$testability")
    }

    function ce(e, t) {
        return t = t || "_", e.replace(ei, function(e, n) {
            return (n ? t : "") + e.toLowerCase()
        })
    }

    function fe() {
        var t;
        if (!ti) {
            var r = Jr();
            Ir = y(r) ? e.jQuery : r ? e[r] : n, Ir && Ir.fn.on ? (Lr = Ir, f(Ir.fn, {
                scope: Ci.scope,
                isolateScope: Ci.isolateScope,
                controller: Ci.controller,
                injector: Ci.injector,
                inheritedData: Ci.inheritedData
            }), t = Ir.cleanData, Ir.cleanData = function(e) {
                for (var n, r, i = 0; null != (r = e[i]); i++) n = Ir._data(r, "events"), n && n.$destroy && Ir(r).triggerHandler("$destroy");
                t(e)
            }) : Lr = Me, Br.element = Lr, ti = !0
        }
    }

    function pe(e, t, n) {
        if (!e) throw _r("areq", "Argument '{0}' is {1}", t || "?", n || "required");
        return e
    }

    function de(e, t, n) {
        return n && Wr(e) && (e = e[e.length - 1]), pe(E(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e
    }

    function he(e, t) {
        if ("hasOwnProperty" === e) throw _r("badname", "hasOwnProperty is not a valid {0} name", t)
    }

    function me(e, t, n) {
        if (!t) return e;
        for (var r, i = t.split("."), a = e, o = i.length, s = 0; o > s; s++) r = i[s], e && (e = (a = e)[r]);
        return !n && E(e) ? W(a, e) : e
    }

    function ge(e) {
        for (var t, n = e[0], r = e[e.length - 1], i = 1; n !== r && (n = n.nextSibling); i++)(t || e[i] !== n) && (t || (t = Lr(qr.call(e, 0, i))),
            t.push(n));
        return t || e
    }

    function ve() {
        return Object.create(null)
    }

    function $e(e) {
        function t(e, t, n) {
            return e[t] || (e[t] = n())
        }
        var n = r("$injector"),
            i = r("ng"),
            a = t(e, "angular", Object);
        return a.$$minErr = a.$$minErr || r, t(a, "module", function() {
            var e = {};
            return function(r, a, o) {
                var s = function(e, t) {
                    if ("hasOwnProperty" === e) throw i("badname", "hasOwnProperty is not a valid {0} name", t)
                };
                return s(r, "module"), a && e.hasOwnProperty(r) && (e[r] = null), t(e, r, function() {
                    function e(e, t, n, r) {
                        return r || (r = i),
                            function() {
                                return r[n || "push"]([e, t, arguments]), c
                            }
                    }

                    function t(e, t) {
                        return function(n, a) {
                            return a && E(a) && (a.$$moduleName = r), i.push([e, t, arguments]), c
                        }
                    }
                    if (!a) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
                    var i = [],
                        s = [],
                        u = [],
                        l = e("$injector", "invoke", "push", s),
                        c = {
                            _invokeQueue: i,
                            _configBlocks: s,
                            _runBlocks: u,
                            requires: a,
                            name: r,
                            provider: t("$provide", "provider"),
                            factory: t("$provide", "factory"),
                            service: t("$provide", "service"),
                            value: e("$provide", "value"),
                            constant: e("$provide", "constant", "unshift"),
                            decorator: t("$provide", "decorator"),
                            animation: t("$animateProvider", "register"),
                            filter: t("$filterProvider", "register"),
                            controller: t("$controllerProvider", "register"),
                            directive: t("$compileProvider", "directive"),
                            component: t("$compileProvider", "component"),
                            config: l,
                            run: function(e) {
                                return u.push(e), this
                            }
                        };
                    return o && l(o), c
                })
            }
        })
    }

    function ye(e) {
        var t = [];
        return JSON.stringify(e, function(e, n) {
            if (n = Y(e, n), w(n)) {
                if (t.indexOf(n) >= 0) return "...";
                t.push(n)
            }
            return n
        })
    }

    function be(e) {
        return "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : y(e) ? "undefined" : "string" != typeof e ? ye(e) : e
    }

    function we(t) {
        f(t, {
            bootstrap: se,
            copy: U,
            extend: f,
            merge: p,
            equals: _,
            element: Lr,
            forEach: a,
            injector: it,
            noop: m,
            bind: W,
            toJson: G,
            fromJson: K,
            identity: g,
            isUndefined: y,
            isDefined: b,
            isString: C,
            isFunction: E,
            isObject: w,
            isNumber: k,
            isElement: F,
            isArray: Wr,
            version: ui,
            isDate: S,
            lowercase: Or,
            uppercase: Mr,
            callbacks: {
                counter: 0
            },
            getTestability: le,
            $$minErr: r,
            $$csp: Xr,
            reloadWithDebugInfo: ue
        }), (Fr = $e(e))("ng", ["ngLocale"], ["$provide", function(e) {
            e.provider({
                $$sanitizeUri: Cn
            }), e.provider("$compile", ht).directive({
                a: Ta,
                input: za,
                textarea: za,
                form: ja,
                script: Uo,
                select: Bo,
                style: Wo,
                option: zo,
                ngBind: Ga,
                ngBindHtml: Xa,
                ngBindTemplate: Ka,
                ngClass: Qa,
                ngClassEven: eo,
                ngClassOdd: Za,
                ngCloak: to,
                ngController: no,
                ngForm: Na,
                ngHide: No,
                ngIf: ao,
                ngInclude: oo,
                ngInit: uo,
                ngNonBindable: So,
                ngPluralize: Ao,
                ngRepeat: Oo,
                ngShow: jo,
                ngStyle: Lo,
                ngSwitch: Io,
                ngSwitchWhen: Fo,
                ngSwitchDefault: qo,
                ngOptions: To,
                ngTransclude: Ro,
                ngModel: xo,
                ngList: lo,
                ngChange: Ja,
                pattern: Go,
                ngPattern: Go,
                required: Yo,
                ngRequired: Yo,
                minlength: Xo,
                ngMinlength: Xo,
                maxlength: Ko,
                ngMaxlength: Ko,
                ngValue: Ya,
                ngModelOptions: ko
            }).directive({
                ngInclude: so
            }).directive(Aa).directive(ro), e.provider({
                $anchorScroll: at,
                $animate: Vi,
                $animateCss: Hi,
                $$animateJs: Fi,
                $$animateQueue: qi,
                $$AnimateRunner: Ui,
                $$animateAsyncRun: Ri,
                $browser: ft,
                $cacheFactory: pt,
                $controller: yt,
                $document: bt,
                $exceptionHandler: wt,
                $filter: Fn,
                $$forceReflow: Yi,
                $interpolate: Lt,
                $interval: It,
                $http: Mt,
                $httpParamSerializer: Ct,
                $httpParamSerializerJQLike: kt,
                $httpBackend: jt,
                $xhrFactory: Pt,
                $location: Xt,
                $log: Jt,
                $parse: vn,
                $rootScope: xn,
                $q: $n,
                $$q: yn,
                $sce: Dn,
                $sceDelegate: En,
                $sniffer: Tn,
                $templateCache: dt,
                $templateRequest: An,
                $$testability: On,
                $timeout: Mn,
                $window: Nn,
                $$rAF: wn,
                $$jqLite: Qe,
                $$HashMap: Di,
                $$cookieReader: In
            })
        }])
    }

    function xe() {
        return ++ci
    }

    function Ce(e) {
        return e.replace(di, function(e, t, n, r) {
            return r ? n.toUpperCase() : n
        }).replace(hi, "Moz$1")
    }

    function ke(e) {
        return !$i.test(e)
    }

    function Se(e) {
        var t = e.nodeType;
        return t === ni || !t || t === oi
    }

    function Ee(e) {
        for (var t in li[e.ng339]) return !0;
        return !1
    }

    function De(e) {
        for (var t = 0, n = e.length; n > t; t++) Le(e[t])
    }

    function Te(e, t) {
        var n, r, i, o, s = t.createDocumentFragment(),
            u = [];
        if (ke(e)) u.push(t.createTextNode(e));
        else {
            for (n = n || s.appendChild(t.createElement("div")), r = (yi.exec(e) || ["", ""])[1].toLowerCase(), i = wi[r] || wi._default, n.innerHTML = i[1] + e.replace(bi, "<$1></$2>") + i[2], o = i[0]; o--;) n = n.lastChild;
            u = B(u, n.childNodes), n = s.firstChild, n.textContent = ""
        }
        return s.textContent = "", s.innerHTML = "", a(u, function(e) {
            s.appendChild(e)
        }), s
    }

    function Ae(e, n) {
        n = n || t;
        var r;
        return (r = vi.exec(e)) ? [n.createElement(r[1])] : (r = Te(e, n)) ? r.childNodes : []
    }

    function Oe(e, t) {
        var n = e.parentNode;
        n && n.replaceChild(t, e), t.appendChild(e)
    }

    function Me(e) {
        if (e instanceof Me) return e;
        var t;
        if (C(e) && (e = Gr(e), t = !0), !(this instanceof Me)) {
            if (t && "<" != e.charAt(0)) throw gi("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new Me(e)
        }
        t ? Ue(this, Ae(e)) : Ue(this, e)
    }

    function Pe(e) {
        return e.cloneNode(!0)
    }

    function je(e, t) {
        if (t || Le(e), e.querySelectorAll)
            for (var n = e.querySelectorAll("*"), r = 0, i = n.length; i > r; r++) Le(n[r])
    }

    function Ne(e, t, n, r) {
        if (b(r)) throw gi("offargs", "jqLite#off() does not support the `selector` argument");
        var i = Ie(e),
            o = i && i.events,
            s = i && i.handle;
        if (s)
            if (t) {
                var u = function(t) {
                    var r = o[t];
                    b(n) && R(r || [], n), b(n) && r && r.length > 0 || (pi(e, t, s), delete o[t])
                };
                a(t.split(" "), function(e) {
                    u(e), mi[e] && u(mi[e])
                })
            } else
                for (t in o) "$destroy" !== t && pi(e, t, s), delete o[t]
    }

    function Le(e, t) {
        var r = e.ng339,
            i = r && li[r];
        if (i) {
            if (t) return void delete i.data[t];
            i.handle && (i.events.$destroy && i.handle({}, "$destroy"), Ne(e)), delete li[r], e.ng339 = n
        }
    }

    function Ie(e, t) {
        var r = e.ng339,
            i = r && li[r];
        return t && !i && (e.ng339 = r = xe(), i = li[r] = {
            events: {},
            data: {},
            handle: n
        }), i
    }

    function Fe(e, t, n) {
        if (Se(e)) {
            var r = b(n),
                i = !r && t && !w(t),
                a = !t,
                o = Ie(e, !i),
                s = o && o.data;
            if (r) s[t] = n;
            else {
                if (a) return s;
                if (i) return s && s[t];
                f(s, t)
            }
        }
    }

    function qe(e, t) {
        return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1
    }

    function Ve(e, t) {
        t && e.setAttribute && a(t.split(" "), function(t) {
            e.setAttribute("class", Gr((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Gr(t) + " ", " ")))
        })
    }

    function Re(e, t) {
        if (t && e.setAttribute) {
            var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            a(t.split(" "), function(e) {
                e = Gr(e), -1 === n.indexOf(" " + e + " ") && (n += e + " ")
            }), e.setAttribute("class", Gr(n))
        }
    }

    function Ue(e, t) {
        if (t)
            if (t.nodeType) e[e.length++] = t;
            else {
                var n = t.length;
                if ("number" == typeof n && t.window !== t) {
                    if (n)
                        for (var r = 0; n > r; r++) e[e.length++] = t[r]
                } else e[e.length++] = t
            }
    }

    function He(e, t) {
        return _e(e, "$" + (t || "ngController") + "Controller")
    }

    function _e(e, t, n) {
        e.nodeType == oi && (e = e.documentElement);
        for (var r = Wr(t) ? t : [t]; e;) {
            for (var i = 0, a = r.length; a > i; i++)
                if (b(n = Lr.data(e, r[i]))) return n;
            e = e.parentNode || e.nodeType === si && e.host
        }
    }

    function Be(e) {
        for (je(e, !0); e.firstChild;) e.removeChild(e.firstChild)
    }

    function ze(e, t) {
        t || je(e);
        var n = e.parentNode;
        n && n.removeChild(e)
    }

    function We(t, n) {
        n = n || e, "complete" === n.document.readyState ? n.setTimeout(t) : Lr(n).on("load", t)
    }

    function Ye(e, t) {
        var n = ki[t.toLowerCase()];
        return n && Si[V(e)] && n
    }

    function Ge(e) {
        return Ei[e]
    }

    function Ke(e, t) {
        var n = function(n, r) {
            n.isDefaultPrevented = function() {
                return n.defaultPrevented
            };
            var i = t[r || n.type],
                a = i ? i.length : 0;
            if (a) {
                if (y(n.immediatePropagationStopped)) {
                    var o = n.stopImmediatePropagation;
                    n.stopImmediatePropagation = function() {
                        n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), o && o.call(n)
                    }
                }
                n.isImmediatePropagationStopped = function() {
                    return n.immediatePropagationStopped === !0
                };
                var s = i.specialHandlerWrapper || Xe;
                a > 1 && (i = H(i));
                for (var u = 0; a > u; u++) n.isImmediatePropagationStopped() || s(e, n, i[u])
            }
        };
        return n.elem = e, n
    }

    function Xe(e, t, n) {
        n.call(e, t)
    }

    function Je(e, t, n) {
        var r = t.relatedTarget;
        (!r || r !== e && !xi.call(e, r)) && n.call(e, t)
    }

    function Qe() {
        this.$get = function() {
            return f(Me, {
                hasClass: function(e, t) {
                    return e.attr && (e = e[0]), qe(e, t)
                },
                addClass: function(e, t) {
                    return e.attr && (e = e[0]), Re(e, t)
                },
                removeClass: function(e, t) {
                    return e.attr && (e = e[0]), Ve(e, t)
                }
            })
        }
    }

    function Ze(e, t) {
        var n = e && e.$$hashKey;
        if (n) return "function" == typeof n && (n = e.$$hashKey()), n;
        var r = typeof e;
        return n = "function" == r || "object" == r && null !== e ? e.$$hashKey = r + ":" + (t || u)() : r + ":" + e
    }

    function et(e, t) {
        if (t) {
            var n = 0;
            this.nextUid = function() {
                return ++n
            }
        }
        a(e, this.put, this)
    }

    function tt(e) {
        var t = e.toString().replace(Pi, ""),
            n = t.match(Ti) || t.match(Ai);
        return n
    }

    function nt(e) {
        var t = tt(e);
        return t ? "function(" + (t[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
    }

    function rt(e, t, n) {
        var r, i, o;
        if ("function" == typeof e) {
            if (!(r = e.$inject)) {
                if (r = [], e.length) {
                    if (t) throw C(n) && n || (n = e.name || nt(e)), ji("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
                    i = tt(e), a(i[1].split(Oi), function(e) {
                        e.replace(Mi, function(e, t, n) {
                            r.push(n)
                        })
                    })
                }
                e.$inject = r
            }
        } else Wr(e) ? (o = e.length - 1, de(e[o], "fn"), r = e.slice(0, o)) : de(e, "fn", !0);
        return r
    }

    function it(e, t) {
        function r(e) {
            return function(t, n) {
                return w(t) ? void a(t, s(e)) : e(t, n)
            }
        }

        function i(e, t) {
            if (he(e, "service"), (E(t) || Wr(t)) && (t = k.instantiate(t)), !t.$get) throw ji("pget", "Provider '{0}' must define $get factory method.", e);
            return x[e + g] = t
        }

        function o(e, t) {
            return function() {
                var n = T.invoke(t, this);
                if (y(n)) throw ji("undef", "Provider '{0}' must return a value from $get factory method.", e);
                return n
            }
        }

        function u(e, t, n) {
            return i(e, {
                $get: n !== !1 ? o(e, t) : t
            })
        }

        function l(e, t) {
            return u(e, ["$injector", function(e) {
                return e.instantiate(t)
            }])
        }

        function c(e, t) {
            return u(e, v(t), !1)
        }

        function f(e, t) {
            he(e, "constant"), x[e] = t, S[e] = t
        }

        function p(e, t) {
            var n = k.get(e + g),
                r = n.$get;
            n.$get = function() {
                var e = T.invoke(r, n);
                return T.invoke(t, null, {
                    $delegate: e
                })
            }
        }

        function d(e) {
            pe(y(e) || Wr(e), "modulesToLoad", "not an array");
            var t, n = [];
            return a(e, function(e) {
                function r(e) {
                    var t, n;
                    for (t = 0, n = e.length; n > t; t++) {
                        var r = e[t],
                            i = k.get(r[0]);
                        i[r[1]].apply(i, r[2])
                    }
                }
                if (!b.get(e)) {
                    b.put(e, !0);
                    try {
                        C(e) ? (t = Fr(e), n = n.concat(d(t.requires)).concat(t._runBlocks), r(t._invokeQueue), r(t._configBlocks)) : E(e) ? n.push(k.invoke(e)) : Wr(e) ? n.push(k.invoke(e)) : de(e, "module")
                    } catch (i) {
                        throw Wr(e) && (e = e[e.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), ji("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, i.stack || i.message || i)
                    }
                }
            }), n
        }

        function h(e, n) {
            function r(t, r) {
                if (e.hasOwnProperty(t)) {
                    if (e[t] === m) throw ji("cdep", "Circular dependency found: {0}", t + " <- " + $.join(" <- "));
                    return e[t]
                }
                try {
                    return $.unshift(t), e[t] = m, e[t] = n(t, r)
                } catch (i) {
                    throw e[t] === m && delete e[t], i
                } finally {
                    $.shift()
                }
            }

            function i(e, n, i) {
                for (var a = [], o = it.$$annotate(e, t, i), s = 0, u = o.length; u > s; s++) {
                    var l = o[s];
                    if ("string" != typeof l) throw ji("itkn", "Incorrect injection token! Expected service name as string, got {0}", l);
                    a.push(n && n.hasOwnProperty(l) ? n[l] : r(l, i))
                }
                return a
            }

            function a(e) {
                return 11 >= Nr ? !1 : "function" == typeof e && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(e))
            }

            function o(e, t, n, r) {
                "string" == typeof n && (r = n, n = null);
                var o = i(e, n, r);
                return Wr(e) && (e = e[e.length - 1]), a(e) ? (o.unshift(null), new(Function.prototype.bind.apply(e, o))) : e.apply(t, o)
            }

            function s(e, t, n) {
                var r = Wr(e) ? e[e.length - 1] : e,
                    a = i(e, t, n);
                return a.unshift(null), new(Function.prototype.bind.apply(r, a))
            }
            return {
                invoke: o,
                instantiate: s,
                get: r,
                annotate: it.$$annotate,
                has: function(t) {
                    return x.hasOwnProperty(t + g) || e.hasOwnProperty(t)
                }
            }
        }
        t = t === !0;
        var m = {},
            g = "Provider",
            $ = [],
            b = new et([], !0),
            x = {
                $provide: {
                    provider: r(i),
                    factory: r(u),
                    service: r(l),
                    value: r(c),
                    constant: r(f),
                    decorator: p
                }
            },
            k = x.$injector = h(x, function(e, t) {
                throw Br.isString(t) && $.push(t), ji("unpr", "Unknown provider: {0}", $.join(" <- "))
            }),
            S = {},
            D = h(S, function(e, t) {
                var r = k.get(e + g, t);
                return T.invoke(r.$get, r, n, e)
            }),
            T = D;
        x["$injector" + g] = {
            $get: v(D)
        };
        var A = d(e);
        return T = D.get("$injector"), T.strictDi = t, a(A, function(e) {
            e && T.invoke(e)
        }), T
    }

    function at() {
        var e = !0;
        this.disableAutoScrolling = function() {
            e = !1
        }, this.$get = ["$window", "$location", "$rootScope", function(t, n, r) {
            function i(e) {
                var t = null;
                return Array.prototype.some.call(e, function(e) {
                    return "a" === V(e) ? (t = e, !0) : void 0
                }), t
            }

            function a() {
                var e = s.yOffset;
                if (E(e)) e = e();
                else if (F(e)) {
                    var n = e[0],
                        r = t.getComputedStyle(n);
                    e = "fixed" !== r.position ? 0 : n.getBoundingClientRect().bottom
                } else k(e) || (e = 0);
                return e
            }

            function o(e) {
                if (e) {
                    e.scrollIntoView();
                    var n = a();
                    if (n) {
                        var r = e.getBoundingClientRect().top;
                        t.scrollBy(0, r - n)
                    }
                } else t.scrollTo(0, 0)
            }

            function s(e) {
                e = C(e) ? e : n.hash();
                var t;
                e ? (t = u.getElementById(e)) ? o(t) : (t = i(u.getElementsByName(e))) ? o(t) : "top" === e && o(null) : o(null)
            }
            var u = t.document;
            return e && r.$watch(function() {
                return n.hash()
            }, function(e, t) {
                (e !== t || "" !== e) && We(function() {
                    r.$evalAsync(s)
                })
            }), s
        }]
    }

    function ot(e, t) {
        return e || t ? e ? t ? (Wr(e) && (e = e.join(" ")), Wr(t) && (t = t.join(" ")), e + " " + t) : e : t : ""
    }

    function st(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (n.nodeType === Li) return n
        }
    }

    function ut(e) {
        C(e) && (e = e.split(" "));
        var t = ve();
        return a(e, function(e) {
            e.length && (t[e] = !0)
        }), t
    }

    function lt(e) {
        return w(e) ? e : {}
    }

    function ct(e, t, n, r) {
        function i(e) {
            try {
                e.apply(null, z(arguments, 1))
            } finally {
                if ($--, 0 === $)
                    for (; b.length;) try {
                        b.pop()()
                    } catch (t) {
                        n.error(t)
                    }
            }
        }

        function o(e) {
            var t = e.indexOf("#");
            return -1 === t ? "" : e.substr(t)
        }

        function s() {
            S = null, l(), c()
        }

        function u() {
            try {
                return d.state
            } catch (e) {}
        }

        function l() {
            w = u(), w = y(w) ? null : w, _(w, T) && (w = T), T = w
        }

        function c() {
            (C !== f.url() || x !== w) && (C = f.url(), x = w, a(E, function(e) {
                e(f.url(), w)
            }))
        }
        var f = this,
            p = (t[0], e.location),
            d = e.history,
            h = e.setTimeout,
            g = e.clearTimeout,
            v = {};
        f.isMock = !1;
        var $ = 0,
            b = [];
        f.$$completeOutstandingRequest = i, f.$$incOutstandingRequestCount = function() {
            $++
        }, f.notifyWhenNoOutstandingRequests = function(e) {
            0 === $ ? e() : b.push(e)
        };
        var w, x, C = p.href,
            k = t.find("base"),
            S = null;
        l(), x = w, f.url = function(t, n, i) {
            if (y(i) && (i = null), p !== e.location && (p = e.location), d !== e.history && (d = e.history), t) {
                var a = x === i;
                if (C === t && (!r.history || a)) return f;
                var s = C && Ut(C) === Ut(t);
                return C = t, x = i, !r.history || s && a ? ((!s || S) && (S = t), n ? p.replace(t) : s ? p.hash = o(t) : p.href = t, p.href !== t && (S = t)) : (d[n ? "replaceState" : "pushState"](i, "", t), l(), x = w), f
            }
            return S || p.href.replace(/%27/g, "'")
        }, f.state = function() {
            return w
        };
        var E = [],
            D = !1,
            T = null;
        f.onUrlChange = function(t) {
            return D || (r.history && Lr(e).on("popstate", s), Lr(e).on("hashchange", s), D = !0), E.push(t), t
        }, f.$$applicationDestroyed = function() {
            Lr(e).off("hashchange popstate", s)
        }, f.$$checkUrlChange = c, f.baseHref = function() {
            var e = k.attr("href");
            return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        }, f.defer = function(e, t) {
            var n;
            return $++, n = h(function() {
                delete v[n], i(e)
            }, t || 0), v[n] = !0, n
        }, f.defer.cancel = function(e) {
            return v[e] ? (delete v[e], g(e), i(m), !0) : !1
        }
    }

    function ft() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(e, t, n, r) {
            return new ct(e, r, t, n)
        }]
    }

    function pt() {
        this.$get = function() {
            function e(e, n) {
                function i(e) {
                    e != p && (d ? d == e && (d = e.n) : d = e, a(e.n, e.p), a(e, p), p = e, p.n = null)
                }

                function a(e, t) {
                    e != t && (e && (e.p = t), t && (t.n = e))
                }
                if (e in t) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
                var o = 0,
                    s = f({}, n, {
                        id: e
                    }),
                    u = ve(),
                    l = n && n.capacity || Number.MAX_VALUE,
                    c = ve(),
                    p = null,
                    d = null;
                return t[e] = {
                    put: function(e, t) {
                        if (!y(t)) {
                            if (l < Number.MAX_VALUE) {
                                var n = c[e] || (c[e] = {
                                    key: e
                                });
                                i(n)
                            }
                            return e in u || o++, u[e] = t, o > l && this.remove(d.key), t
                        }
                    },
                    get: function(e) {
                        if (l < Number.MAX_VALUE) {
                            var t = c[e];
                            if (!t) return;
                            i(t)
                        }
                        return u[e]
                    },
                    remove: function(e) {
                        if (l < Number.MAX_VALUE) {
                            var t = c[e];
                            if (!t) return;
                            t == p && (p = t.p), t == d && (d = t.n), a(t.n, t.p), delete c[e]
                        }
                        e in u && (delete u[e], o--)
                    },
                    removeAll: function() {
                        u = ve(), o = 0, c = ve(), p = d = null
                    },
                    destroy: function() {
                        u = null, s = null, c = null, delete t[e]
                    },
                    info: function() {
                        return f({}, s, {
                            size: o
                        })
                    }
                }
            }
            var t = {};
            return e.info = function() {
                var e = {};
                return a(t, function(t, n) {
                    e[n] = t.info()
                }), e
            }, e.get = function(e) {
                return t[e]
            }, e
        }
    }

    function dt() {
        this.$get = ["$cacheFactory", function(e) {
            return e("templates")
        }]
    }

    function ht(e, r) {
        function i(e, t, n) {
            var r = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/,
                i = {};
            return a(e, function(e, a) {
                var o = e.match(r);
                if (!o) throw _i("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", t, a, e, n ? "controller bindings definition" : "isolate scope definition");
                i[a] = {
                    mode: o[1][0],
                    collection: "*" === o[2],
                    optional: "?" === o[3],
                    attrName: o[4] || a
                }
            }), i
        }

        function o(e, t) {
            var n = {
                isolateScope: null,
                bindToController: null
            };
            if (w(e.scope) && (e.bindToController === !0 ? (n.bindToController = i(e.scope, t, !0), n.isolateScope = {}) : n.isolateScope = i(e.scope, t, !1)), w(e.bindToController) && (n.bindToController = i(e.bindToController, t, !0)), w(n.bindToController)) {
                var r = e.controller,
                    a = e.controllerAs;
                if (!r) throw _i("noctrl", "Cannot bind to controller without directive '{0}'s controller.", t);
                if (!$t(r, a)) throw _i("noident", "Cannot bind to controller without identifier for directive '{0}'.", t)
            }
            return n
        }

        function u(e) {
            var t = e.charAt(0);
            if (!t || t !== Or(t)) throw _i("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", e);
            if (e !== e.trim()) throw _i("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", e)
        }
        var l = {},
            c = "Directive",
            p = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
            d = /(([\w\-]+)(?:\:([^;]+))?;?)/,
            $ = q("ngSrc,ngSrcset,src,srcset"),
            x = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
            k = /^(on[a-z]+|formaction)$/;
        this.directive = function D(t, n) {
            return he(t, "directive"), C(t) ? (u(t), pe(n, "directiveFactory"), l.hasOwnProperty(t) || (l[t] = [], e.factory(t + c, ["$injector", "$exceptionHandler", function(e, n) {
                var r = [];
                return a(l[t], function(i, a) {
                    try {
                        var s = e.invoke(i);
                        E(s) ? s = {
                            compile: v(s)
                        } : !s.compile && s.link && (s.compile = v(s.link)), s.priority = s.priority || 0, s.index = a, s.name = s.name || t, s.require = s.require || s.controller && s.name, s.restrict = s.restrict || "EA";
                        var u = s.$$bindings = o(s, s.name);
                        w(u.isolateScope) && (s.$$isolateBindings = u.isolateScope), s.$$moduleName = i.$$moduleName, r.push(s)
                    } catch (l) {
                        n(l)
                    }
                }), r
            }])), l[t].push(n)) : a(t, s(D)), this
        }, this.component = function(e, t) {
            function n(e) {
                function n(t) {
                    return E(t) || Wr(t) ? function(n, r) {
                        return e.invoke(t, this, {
                            $element: n,
                            $attrs: r
                        })
                    } : t
                }
                var i = t.template || t.templateUrl ? t.template : "";
                return {
                    controller: r,
                    controllerAs: $t(t.controller) || t.controllerAs || "$ctrl",
                    template: n(i),
                    templateUrl: n(t.templateUrl),
                    transclude: t.transclude,
                    scope: {},
                    bindToController: t.bindings || {},
                    restrict: "E",
                    require: t.require
                }
            }
            var r = t.controller || function() {};
            return a(t, function(e, t) {
                "$" === t.charAt(0) && (n[t] = e)
            }), n.$inject = ["$injector"], this.directive(e, n)
        }, this.aHrefSanitizationWhitelist = function(e) {
            return b(e) ? (r.aHrefSanitizationWhitelist(e), this) : r.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function(e) {
            return b(e) ? (r.imgSrcSanitizationWhitelist(e), this) : r.imgSrcSanitizationWhitelist()
        };
        var S = !0;
        this.debugInfoEnabled = function(e) {
            return b(e) ? (S = e, this) : S
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function(e, r, i, o, s, u, v, b, D, T) {
            function O(e, t, n) {
                le.innerHTML = "<span " + t + ">";
                var r = le.firstChild.attributes,
                    i = r[0];
                r.removeNamedItem(i.name), i.value = n, e.attributes.setNamedItem(i)
            }

            function M(e, t) {
                try {
                    e.addClass(t)
                } catch (n) {}
            }

            function P(e, n, r, i, a) {
                e instanceof Lr || (e = Lr(e));
                for (var o = /\S+/, s = 0, u = e.length; u > s; s++) {
                    var l = e[s];
                    l.nodeType === ii && l.nodeValue.match(o) && Oe(l, e[s] = t.createElement("span"))
                }
                var c = L(e, n, e, r, i, a);
                P.$$addScopeClass(e);
                var f = null;
                return function(t, n, r) {
                    pe(t, "scope"), a && a.needsNewScope && (t = t.$parent.$new()), r = r || {};
                    var i = r.parentBoundTranscludeFn,
                        o = r.transcludeControllers,
                        s = r.futureParentElement;
                    i && i.$$boundTransclude && (i = i.$$boundTransclude), f || (f = N(s));
                    var u;
                    if (u = "html" !== f ? Lr(te(f, Lr("<div>").append(e).html())) : n ? Ci.clone.call(e) : e, o)
                        for (var l in o) u.data("$" + l + "Controller", o[l].instance);
                    return P.$$addScopeInfo(u, t), n && n(u, t), c && c(t, u, u, i), u
                }
            }

            function N(e) {
                var t = e && e[0];
                return t && "foreignobject" !== V(t) && Ur.call(t).match(/SVG/) ? "svg" : "html"
            }

            function L(e, t, r, i, a, o) {
                function s(e, r, i, a) {
                    var o, s, u, l, c, f, p, d, g;
                    if (h) {
                        var v = r.length;
                        for (g = new Array(v), c = 0; c < m.length; c += 3) p = m[c], g[p] = r[p]
                    } else g = r;
                    for (c = 0, f = m.length; f > c;) u = g[m[c++]], o = m[c++], s = m[c++], o ? (o.scope ? (l = e.$new(), P.$$addScopeInfo(Lr(u), l)) : l = e, d = o.transcludeOnThisElement ? I(e, o.transclude, a) : !o.templateOnThisElement && a ? a : !a && t ? I(e, t) : null, o(s, l, u, i, d)) : s && s(e, u.childNodes, n, a)
                }
                for (var u, l, c, f, p, d, h, m = [], g = 0; g < e.length; g++) u = new fe, l = F(e[g], [], u, 0 === g ? i : n, a), c = l.length ? B(l, e[g], u, t, r, null, [], [], o) : null, c && c.scope && P.$$addScopeClass(u.$$element), p = c && c.terminal || !(f = e[g].childNodes) || !f.length ? null : L(f, c ? (c.transcludeOnThisElement || !c.templateOnThisElement) && c.transclude : t), (c || p) && (m.push(g, c, p), d = !0, h = h || c), o = null;
                return d ? s : null
            }

            function I(e, t, n) {
                var r = function(r, i, a, o, s) {
                        return r || (r = e.$new(!1, s), r.$$transcluded = !0), t(r, i, {
                            parentBoundTranscludeFn: n,
                            transcludeControllers: a,
                            futureParentElement: o
                        })
                    },
                    i = r.$$slots = ve();
                for (var a in t.$$slots) t.$$slots[a] ? i[a] = I(e, t.$$slots[a], n) : i[a] = null;
                return r
            }

            function F(e, t, n, r, i) {
                var a, o, s = e.nodeType,
                    u = n.$attr;
                switch (s) {
                    case ni:
                        Y(t, mt(V(e)), "E", r, i);
                        for (var l, c, f, h, m, g, v = e.attributes, $ = 0, y = v && v.length; y > $; $++) {
                            var b = !1,
                                x = !1;
                            l = v[$], c = l.name, m = Gr(l.value), h = mt(c), (g = ge.test(h)) && (c = c.replace(Bi, "").substr(8).replace(/_(.)/g, function(e, t) {
                                return t.toUpperCase()
                            }));
                            var k = h.match($e);
                            k && G(k[1]) && (b = c, x = c.substr(0, c.length - 5) + "end", c = c.substr(0, c.length - 6)), f = mt(c.toLowerCase()), u[f] = c, (g || !n.hasOwnProperty(f)) && (n[f] = m, Ye(e, f) && (n[f] = !0)), re(e, t, m, f, g), Y(t, f, "A", r, i, b, x)
                        }
                        if (o = e.className, w(o) && (o = o.animVal), C(o) && "" !== o)
                            for (; a = d.exec(o);) f = mt(a[2]), Y(t, f, "C", r, i) && (n[f] = Gr(a[3])), o = o.substr(a.index + a[0].length);
                        break;
                    case ii:
                        if (11 === Nr)
                            for (; e.parentNode && e.nextSibling && e.nextSibling.nodeType === ii;) e.nodeValue = e.nodeValue + e.nextSibling.nodeValue, e.parentNode.removeChild(e.nextSibling);
                        ee(t, e.nodeValue);
                        break;
                    case ai:
                        try {
                            a = p.exec(e.nodeValue), a && (f = mt(a[1]), Y(t, f, "M", r, i) && (n[f] = Gr(a[2])))
                        } catch (S) {}
                }
                return t.sort(J), t
            }

            function q(e, t, n) {
                var r = [],
                    i = 0;
                if (t && e.hasAttribute && e.hasAttribute(t)) {
                    do {
                        if (!e) throw _i("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
                        e.nodeType == ni && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--), r.push(e), e = e.nextSibling
                    } while (i > 0)
                } else r.push(e);
                return Lr(r)
            }

            function U(e, t, n) {
                return function(r, i, a, o, s) {
                    return i = q(i[0], t, n), e(r, i, a, o, s)
                }
            }

            function H(e, t, n, r, i, a) {
                if (e) return P(t, n, r, i, a);
                var o;
                return function() {
                    return o || (o = P(t, n, r, i, a), t = n = a = null), o.apply(this, arguments)
                }
            }

            function B(e, r, o, s, l, c, p, d, h) {
                function m(e, t, n, r) {
                    e && (n && (e = U(e, n, r)), e.require = b.require, e.directiveName = k, (N === b || b.$$isolateScope) && (e = ae(e, {
                        isolateScope: !0
                    })), p.push(e)), t && (n && (t = U(t, n, r)), t.require = b.require, t.directiveName = k, (N === b || b.$$isolateScope) && (t = ae(t, {
                        isolateScope: !0
                    })), d.push(t))
                }

                function g(e, t, n, r) {
                    var i;
                    if (C(t)) {
                        var o = t.match(x),
                            s = t.substring(o[0].length),
                            u = o[1] || o[3],
                            l = "?" === o[2];
                        if ("^^" === u ? n = n.parent() : (i = r && r[s], i = i && i.instance), !i) {
                            var c = "$" + s + "Controller";
                            i = u ? n.inheritedData(c) : n.data(c)
                        }
                        if (!i && !l) throw _i("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", s, e)
                    } else if (Wr(t)) {
                        i = [];
                        for (var f = 0, p = t.length; p > f; f++) i[f] = g(e, t[f], n, r)
                    } else w(t) && (i = {}, a(t, function(t, a) {
                        i[a] = g(e, t, n, r)
                    }));
                    return i || null
                }

                function v(e, t, n, r, i, a) {
                    var o = ve();
                    for (var s in r) {
                        var l = r[s],
                            c = {
                                $scope: l === N || l.$$isolateScope ? i : a,
                                $element: e,
                                $attrs: t,
                                $transclude: n
                            },
                            f = l.controller;
                        "@" == f && (f = t[l.name]);
                        var p = u(f, c, !0, l.controllerAs);
                        o[l.name] = p, B || e.data("$" + l.name + "Controller", p.instance)
                    }
                    return o
                }

                function $(e, t, i, s, u) {
                    function l(e, t, r, i) {
                        var a;
                        if (A(e) || (i = r, r = t, t = e, e = n), B && (a = x), r || (r = B ? k.parent() : k), !i) return u(e, t, a, r, R);
                        var o = u.$$slots[i];
                        if (o) return o(e, t, a, r, R);
                        if (y(o)) throw _i("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', i, Z(k))
                    }
                    var c, h, m, $, b, x, C, k, S, D, T;
                    r === i ? (S = o, k = o.$$element) : (k = Lr(i), S = new fe(k, o)), b = t, N ? $ = t.$new(!0) : M && (b = t.$parent), u && (C = l, C.$$boundTransclude = u, C.isSlotFilled = function(e) {
                        return !!u.$$slots[e]
                    }), j && (x = v(k, S, C, j, $, t)), N && (P.$$addScopeInfo(k, $, !0, !(L && (L === N || L === N.$$originalDirective))), P.$$addScopeClass(k, !0), $.$$isolateBindings = N.$$isolateBindings, D = se(t, S, $, $.$$isolateBindings, N), D && $.$on("$destroy", D));
                    for (var O in x) {
                        var I = j[O],
                            F = x[O],
                            q = I.$$bindings.bindToController;
                        F.identifier && q && (T = se(b, S, F.instance, q, I));
                        var V = F();
                        V !== F.instance && (F.instance = V, k.data("$" + I.name + "Controller", V), T && T(), T = se(b, S, F.instance, q, I))
                    }
                    for (a(j, function(e, t) {
                            var n = e.require;
                            e.bindToController && !Wr(n) && w(n) && f(x[t].instance, g(t, n, k, x))
                        }), a(x, function(e) {
                            E(e.instance.$onInit) && e.instance.$onInit()
                        }), c = 0, h = p.length; h > c; c++) m = p[c], oe(m, m.isolateScope ? $ : t, k, S, m.require && g(m.directiveName, m.require, k, x), C);
                    var R = t;
                    for (N && (N.template || null === N.templateUrl) && (R = $), e && e(R, i.childNodes, n, u), c = d.length - 1; c >= 0; c--) m = d[c], oe(m, m.isolateScope ? $ : t, k, S, m.require && g(m.directiveName, m.require, k, x), C)
                }
                h = h || {};
                for (var b, k, S, D, T, O = -Number.MAX_VALUE, M = h.newScopeDirective, j = h.controllerDirectives, N = h.newIsolateScopeDirective, L = h.templateDirective, I = h.nonTlbTranscludeDirective, R = !1, _ = !1, B = h.hasElementTranscludeDirective, Y = o.$$element = Lr(r), G = c, J = s, ee = !1, ne = !1, re = 0, ue = e.length; ue > re; re++) {
                    b = e[re];
                    var le = b.$$start,
                        ce = b.$$end;
                    if (le && (Y = q(r, le, ce)), S = n, O > b.priority) break;
                    if ((T = b.scope) && (b.templateUrl || (w(T) ? (Q("new/isolated scope", N || M, b, Y), N = b) : Q("new/isolated scope", N, b, Y)), M = M || b), k = b.name, !ee && (b.replace && (b.templateUrl || b.template) || b.transclude && !b.$$tlb)) {
                        for (var pe, de = re + 1; pe = e[de++];)
                            if (pe.transclude && !pe.$$tlb || pe.replace && (pe.templateUrl || pe.template)) {
                                ne = !0;
                                break
                            }
                        ee = !0
                    }
                    if (!b.templateUrl && b.controller && (T = b.controller, j = j || ve(), Q("'" + k + "' controller", j[k], b, Y), j[k] = b), T = b.transclude)
                        if (R = !0, b.$$tlb || (Q("transclusion", I, b, Y), I = b), "element" == T) B = !0, O = b.priority, S = Y, Y = o.$$element = Lr(t.createComment(" " + k + ": " + o[k] + " ")), r = Y[0], ie(l, z(S), r), J = H(ne, S, s, O, G && G.name, {
                            nonTlbTranscludeDirective: I
                        });
                        else {
                            var he = ve();
                            if (S = Lr(Pe(r)).contents(), w(T)) {
                                S = [];
                                var ge = ve(),
                                    $e = ve();
                                a(T, function(e, t) {
                                    var n = "?" === e.charAt(0);
                                    e = n ? e.substring(1) : e, ge[e] = t, he[t] = null, $e[t] = n
                                }), a(Y.contents(), function(e) {
                                    var t = ge[mt(V(e))];
                                    t ? ($e[t] = !0, he[t] = he[t] || [], he[t].push(e)) : S.push(e)
                                }), a($e, function(e, t) {
                                    if (!e) throw _i("reqslot", "Required transclusion slot `{0}` was not filled.", t)
                                });
                                for (var ye in he) he[ye] && (he[ye] = H(ne, he[ye], s))
                            }
                            Y.empty(), J = H(ne, S, s, n, n, {
                                needsNewScope: b.$$isolateScope || b.$$newScope
                            }), J.$$slots = he
                        }
                    if (b.template)
                        if (_ = !0, Q("template", L, b, Y), L = b, T = E(b.template) ? b.template(Y, o) : b.template, T = me(T), b.replace) {
                            if (G = b, S = ke(T) ? [] : vt(te(b.templateNamespace, Gr(T))), r = S[0], 1 != S.length || r.nodeType !== ni) throw _i("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", k, "");
                            ie(l, Y, r);
                            var be = {
                                    $attr: {}
                                },
                                we = F(r, [], be),
                                xe = e.splice(re + 1, e.length - (re + 1));
                            (N || M) && W(we, N, M), e = e.concat(we).concat(xe), K(o, be), ue = e.length
                        } else Y.html(T);
                    if (b.templateUrl) _ = !0, Q("template", L, b, Y), L = b, b.replace && (G = b), $ = X(e.splice(re, e.length - re), Y, o, l, R && J, p, d, {
                        controllerDirectives: j,
                        newScopeDirective: M !== b && M,
                        newIsolateScopeDirective: N,
                        templateDirective: L,
                        nonTlbTranscludeDirective: I
                    }), ue = e.length;
                    else if (b.compile) try {
                        D = b.compile(Y, o, J), E(D) ? m(null, D, le, ce) : D && m(D.pre, D.post, le, ce)
                    } catch (Ce) {
                        i(Ce, Z(Y))
                    }
                    b.terminal && ($.terminal = !0, O = Math.max(O, b.priority))
                }
                return $.scope = M && M.scope === !0, $.transcludeOnThisElement = R, $.templateOnThisElement = _, $.transclude = J, h.hasElementTranscludeDirective = B, $
            }

            function W(e, t, n) {
                for (var r = 0, i = e.length; i > r; r++) e[r] = h(e[r], {
                    $$isolateScope: t,
                    $$newScope: n
                })
            }

            function Y(t, n, r, a, o, s, u) {
                if (n === o) return null;
                var f = null;
                if (l.hasOwnProperty(n))
                    for (var p, d = e.get(n + c), m = 0, g = d.length; g > m; m++) try {
                        p = d[m], (y(a) || a > p.priority) && -1 != p.restrict.indexOf(r) && (s && (p = h(p, {
                            $$start: s,
                            $$end: u
                        })), t.push(p), f = p)
                    } catch (v) {
                        i(v)
                    }
                return f
            }

            function G(t) {
                if (l.hasOwnProperty(t))
                    for (var n, r = e.get(t + c), i = 0, a = r.length; a > i; i++)
                        if (n = r[i], n.multiElement) return !0;
                return !1
            }

            function K(e, t) {
                var n = t.$attr,
                    r = e.$attr,
                    i = e.$$element;
                a(e, function(r, i) {
                    "$" != i.charAt(0) && (t[i] && t[i] !== r && (r += ("style" === i ? ";" : " ") + t[i]), e.$set(i, r, !0, n[i]))
                }), a(t, function(t, a) {
                    "class" == a ? (M(i, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == a ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == a.charAt(0) || e.hasOwnProperty(a) || (e[a] = t, r[a] = n[a])
                })
            }

            function X(e, t, n, r, i, s, u, l) {
                var c, f, p = [],
                    d = t[0],
                    m = e.shift(),
                    g = h(m, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: m
                    }),
                    v = E(m.templateUrl) ? m.templateUrl(t, n) : m.templateUrl,
                    $ = m.templateNamespace;
                return t.empty(), o(v).then(function(o) {
                        var h, y, b, x;
                        if (o = me(o), m.replace) {
                            if (b = ke(o) ? [] : vt(te($, Gr(o))), h = b[0], 1 != b.length || h.nodeType !== ni) throw _i("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, v);
                            y = {
                                $attr: {}
                            }, ie(r, t, h);
                            var C = F(h, [], y);
                            w(m.scope) && W(C, !0), e = C.concat(e), K(n, y)
                        } else h = d, t.html(o);
                        for (e.unshift(g), c = B(e, h, n, i, t, m, s, u, l), a(r, function(e, n) {
                                e == h && (r[n] = t[0])
                            }), f = L(t[0].childNodes, i); p.length;) {
                            var k = p.shift(),
                                S = p.shift(),
                                E = p.shift(),
                                D = p.shift(),
                                T = t[0];
                            if (!k.$$destroyed) {
                                if (S !== d) {
                                    var A = S.className;
                                    l.hasElementTranscludeDirective && m.replace || (T = Pe(h)), ie(E, Lr(S), T), M(Lr(T), A)
                                }
                                x = c.transcludeOnThisElement ? I(k, c.transclude, D) : D, c(f, k, T, r, x)
                            }
                        }
                        p = null
                    }),
                    function(e, t, n, r, i) {
                        var a = i;
                        t.$$destroyed || (p ? p.push(t, n, r, a) : (c.transcludeOnThisElement && (a = I(t, c.transclude, i)), c(f, t, n, r, a)))
                    }
            }

            function J(e, t) {
                var n = t.priority - e.priority;
                return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
            }

            function Q(e, t, n, r) {
                function i(e) {
                    return e ? " (module: " + e + ")" : ""
                }
                if (t) throw _i("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", t.name, i(t.$$moduleName), n.name, i(n.$$moduleName), e, Z(r))
            }

            function ee(e, t) {
                var n = r(t, !0);
                n && e.push({
                    priority: 0,
                    compile: function(e) {
                        var t = e.parent(),
                            r = !!t.length;
                        return r && P.$$addBindingClass(t),
                            function(e, t) {
                                var i = t.parent();
                                r || P.$$addBindingClass(i), P.$$addBindingInfo(i, n.expressions), e.$watch(n, function(e) {
                                    t[0].nodeValue = e
                                })
                            }
                    }
                })
            }

            function te(e, n) {
                switch (e = Or(e || "html")) {
                    case "svg":
                    case "math":
                        var r = t.createElement("div");
                        return r.innerHTML = "<" + e + ">" + n + "</" + e + ">", r.childNodes[0].childNodes;
                    default:
                        return n
                }
            }

            function ne(e, t) {
                if ("srcdoc" == t) return b.HTML;
                var n = V(e);
                return "xlinkHref" == t || "form" == n && "action" == t || "img" != n && ("src" == t || "ngSrc" == t) ? b.RESOURCE_URL : void 0
            }

            function re(e, t, n, i, a) {
                var o = ne(e, i);
                a = $[i] || a;
                var s = r(n, !0, o, a);
                if (s) {
                    if ("multiple" === i && "select" === V(e)) throw _i("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", Z(e));
                    t.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(e, t, u) {
                                    var l = u.$$observers || (u.$$observers = ve());
                                    if (k.test(i)) throw _i("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    var c = u[i];
                                    c !== n && (s = c && r(c, !0, o, a), n = c), s && (u[i] = s(e), (l[i] || (l[i] = [])).$$inter = !0, (u.$$observers && u.$$observers[i].$$scope || e).$watch(s, function(e, t) {
                                        "class" === i && e != t ? u.$updateClass(e, t) : u.$set(i, e)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function ie(e, n, r) {
                var i, a, o = n[0],
                    s = n.length,
                    u = o.parentNode;
                if (e)
                    for (i = 0, a = e.length; a > i; i++)
                        if (e[i] == o) {
                            e[i++] = r;
                            for (var l = i, c = l + s - 1, f = e.length; f > l; l++, c++) f > c ? e[l] = e[c] : delete e[l];
                            e.length -= s - 1, e.context === o && (e.context = r);
                            break
                        }
                u && u.replaceChild(r, o);
                var p = t.createDocumentFragment();
                for (i = 0; s > i; i++) p.appendChild(n[i]);
                for (Lr.hasData(o) && (Lr.data(r, Lr.data(o)), Lr(o).off("$destroy")), Lr.cleanData(p.querySelectorAll("*")), i = 1; s > i; i++) delete n[i];
                n[0] = r, n.length = 1
            }

            function ae(e, t) {
                return f(function() {
                    return e.apply(null, arguments)
                }, e, t)
            }

            function oe(e, t, n, r, a, o) {
                try {
                    e(t, n, r, a, o)
                } catch (s) {
                    i(s, Z(n))
                }
            }

            function se(e, t, n, i, o) {
                var u = [];
                return a(i, function(i, a) {
                    var l, c, f, p, d, h = i.attrName,
                        g = i.optional,
                        v = i.mode;
                    switch (v) {
                        case "@":
                            g || Ar.call(t, h) || (n[a] = t[h] = void 0), t.$observe(h, function(e) {
                                C(e) && (n[a] = e)
                            }), t.$$observers[h].$$scope = e, l = t[h], C(l) ? n[a] = r(l)(e) : j(l) && (n[a] = l);
                            break;
                        case "=":
                            if (!Ar.call(t, h)) {
                                if (g) break;
                                t[h] = void 0
                            }
                            if (g && !t[h]) break;
                            c = s(t[h]), p = c.literal ? _ : function(e, t) {
                                return e === t || e !== e && t !== t
                            }, f = c.assign || function() {
                                throw l = n[a] = c(e), _i("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", t[h], h, o.name)
                            }, l = n[a] = c(e);
                            var $ = function(t) {
                                return p(t, n[a]) || (p(t, l) ? f(e, t = n[a]) : n[a] = t), l = t
                            };
                            $.$stateful = !0, d = i.collection ? e.$watchCollection(t[h], $) : e.$watch(s(t[h], $), null, c.literal), u.push(d);
                            break;
                        case "<":
                            if (!Ar.call(t, h)) {
                                if (g) break;
                                t[h] = void 0
                            }
                            if (g && !t[h]) break;
                            c = s(t[h]), n[a] = c(e), d = e.$watch(c, function(e) {
                                n[a] = e
                            }, c.literal), u.push(d);
                            break;
                        case "&":
                            if (c = t.hasOwnProperty(h) ? s(t[h]) : m, c === m && g) break;
                            n[a] = function(t) {
                                return c(e, t)
                            }
                    }
                }), u.length && function() {
                    for (var e = 0, t = u.length; t > e; ++e) u[e]()
                }
            }
            var ue = /^\w/,
                le = t.createElement("div"),
                fe = function(e, t) {
                    if (t) {
                        var n, r, i, a = Object.keys(t);
                        for (n = 0, r = a.length; r > n; n++) i = a[n], this[i] = t[i]
                    } else this.$attr = {};
                    this.$$element = e
                };
            fe.prototype = {
                $normalize: mt,
                $addClass: function(e) {
                    e && e.length > 0 && D.addClass(this.$$element, e)
                },
                $removeClass: function(e) {
                    e && e.length > 0 && D.removeClass(this.$$element, e)
                },
                $updateClass: function(e, t) {
                    var n = gt(e, t);
                    n && n.length && D.addClass(this.$$element, n);
                    var r = gt(t, e);
                    r && r.length && D.removeClass(this.$$element, r)
                },
                $set: function(e, t, n, r) {
                    var o, s = this.$$element[0],
                        u = Ye(s, e),
                        l = Ge(e),
                        c = e;
                    if (u ? (this.$$element.prop(e, t), r = u) : l && (this[l] = t, c = l), this[e] = t, r ? this.$attr[e] = r : (r = this.$attr[e], r || (this.$attr[e] = r = ce(e, "-"))), o = V(this.$$element), "a" === o && ("href" === e || "xlinkHref" === e) || "img" === o && "src" === e) this[e] = t = T(t, "src" === e);
                    else if ("img" === o && "srcset" === e) {
                        for (var f = "", p = Gr(t), d = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, h = /\s/.test(p) ? d : /(,)/, m = p.split(h), g = Math.floor(m.length / 2), v = 0; g > v; v++) {
                            var $ = 2 * v;
                            f += T(Gr(m[$]), !0), f += " " + Gr(m[$ + 1])
                        }
                        var b = Gr(m[2 * v]).split(/\s/);
                        f += T(Gr(b[0]), !0), 2 === b.length && (f += " " + Gr(b[1])), this[e] = t = f
                    }
                    n !== !1 && (null === t || y(t) ? this.$$element.removeAttr(r) : ue.test(r) ? this.$$element.attr(r, t) : O(this.$$element[0], r, t));
                    var w = this.$$observers;
                    w && a(w[c], function(e) {
                        try {
                            e(t)
                        } catch (n) {
                            i(n)
                        }
                    })
                },
                $observe: function(e, t) {
                    var n = this,
                        r = n.$$observers || (n.$$observers = ve()),
                        i = r[e] || (r[e] = []);
                    return i.push(t), v.$evalAsync(function() {
                            i.$$inter || !n.hasOwnProperty(e) || y(n[e]) || t(n[e])
                        }),
                        function() {
                            R(i, t)
                        }
                }
            };
            var de = r.startSymbol(),
                he = r.endSymbol(),
                me = "{{" == de && "}}" == he ? g : function(e) {
                    return e.replace(/\{\{/g, de).replace(/}}/g, he)
                },
                ge = /^ngAttr[A-Z]/,
                $e = /^(.+)Start$/;
            return P.$$addBindingInfo = S ? function(e, t) {
                var n = e.data("$binding") || [];
                Wr(t) ? n = n.concat(t) : n.push(t), e.data("$binding", n)
            } : m, P.$$addBindingClass = S ? function(e) {
                M(e, "ng-binding")
            } : m, P.$$addScopeInfo = S ? function(e, t, n, r) {
                var i = n ? r ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                e.data(i, t)
            } : m, P.$$addScopeClass = S ? function(e, t) {
                M(e, t ? "ng-isolate-scope" : "ng-scope")
            } : m, P
        }]
    }

    function mt(e) {
        return Ce(e.replace(Bi, ""))
    }

    function gt(e, t) {
        var n = "",
            r = e.split(/\s+/),
            i = t.split(/\s+/);
        e: for (var a = 0; a < r.length; a++) {
            for (var o = r[a], s = 0; s < i.length; s++)
                if (o == i[s]) continue e;
            n += (n.length > 0 ? " " : "") + o
        }
        return n
    }

    function vt(e) {
        e = Lr(e);
        var t = e.length;
        if (1 >= t) return e;
        for (; t--;) {
            var n = e[t];
            n.nodeType === ai && Vr.call(e, t, 1)
        }
        return e
    }

    function $t(e, t) {
        if (t && C(t)) return t;
        if (C(e)) {
            var n = Wi.exec(e);
            if (n) return n[3]
        }
    }

    function yt() {
        var e = {},
            t = !1;
        this.register = function(t, n) {
            he(t, "controller"), w(t) ? f(e, t) : e[t] = n
        }, this.allowGlobals = function() {
            t = !0
        }, this.$get = ["$injector", "$window", function(i, a) {
            function o(e, t, n, i) {
                if (!e || !w(e.$scope)) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, t);
                e.$scope[t] = n
            }
            return function(r, s, u, l) {
                var c, p, d, h;
                if (u = u === !0, l && C(l) && (h = l), C(r)) {
                    if (p = r.match(Wi), !p) throw zi("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
                    d = p[1], h = h || p[3], r = e.hasOwnProperty(d) ? e[d] : me(s.$scope, d, !0) || (t ? me(a, d, !0) : n), de(r, d, !0)
                }
                if (u) {
                    var m = (Wr(r) ? r[r.length - 1] : r).prototype;
                    c = Object.create(m || null), h && o(s, h, c, d || r.name);
                    var g;
                    return g = f(function() {
                        var e = i.invoke(r, c, s, d);
                        return e !== c && (w(e) || E(e)) && (c = e, h && o(s, h, c, d || r.name)), c
                    }, {
                        instance: c,
                        identifier: h
                    })
                }
                return c = i.instantiate(r, s, d), h && o(s, h, c, d || r.name), c
            }
        }]
    }

    function bt() {
        this.$get = ["$window", function(e) {
            return Lr(e.document)
        }]
    }

    function wt() {
        this.$get = ["$log", function(e) {
            return function(t, n) {
                e.error.apply(e, arguments)
            }
        }]
    }

    function xt(e) {
        return w(e) ? S(e) ? e.toISOString() : G(e) : e
    }

    function Ct() {
        this.$get = function() {
            return function(e) {
                if (!e) return "";
                var t = [];
                return o(e, function(e, n) {
                    null === e || y(e) || (Wr(e) ? a(e, function(e, r) {
                        t.push(ie(n) + "=" + ie(xt(e)))
                    }) : t.push(ie(n) + "=" + ie(xt(e))))
                }), t.join("&")
            }
        }
    }

    function kt() {
        this.$get = function() {
            return function(e) {
                function t(e, r, i) {
                    null === e || y(e) || (Wr(e) ? a(e, function(e, n) {
                        t(e, r + "[" + (w(e) ? n : "") + "]")
                    }) : w(e) && !S(e) ? o(e, function(e, n) {
                        t(e, r + (i ? "" : "[") + n + (i ? "" : "]"))
                    }) : n.push(ie(r) + "=" + ie(xt(e))))
                }
                if (!e) return "";
                var n = [];
                return t(e, "", !0), n.join("&")
            }
        }
    }

    function St(e, t) {
        if (C(e)) {
            var n = e.replace(Qi, "").trim();
            if (n) {
                var r = t("Content-Type");
                (r && 0 === r.indexOf(Gi) || Et(n)) && (e = K(n))
            }
        }
        return e
    }

    function Et(e) {
        var t = e.match(Xi);
        return t && Ji[t[0]].test(e)
    }

    function Dt(e) {
        function t(e, t) {
            e && (r[e] = r[e] ? r[e] + ", " + t : t)
        }
        var n, r = ve();
        return C(e) ? a(e.split("\n"), function(e) {
            n = e.indexOf(":"), t(Or(Gr(e.substr(0, n))), Gr(e.substr(n + 1)))
        }) : w(e) && a(e, function(e, n) {
            t(Or(n), Gr(e))
        }), r
    }

    function Tt(e) {
        var t;
        return function(n) {
            if (t || (t = Dt(e)), n) {
                var r = t[Or(n)];
                return void 0 === r && (r = null), r
            }
            return t
        }
    }

    function At(e, t, n, r) {
        return E(r) ? r(e, t, n) : (a(r, function(r) {
            e = r(e, t, n)
        }), e)
    }

    function Ot(e) {
        return e >= 200 && 300 > e
    }

    function Mt() {
        var e = this.defaults = {
                transformResponse: [St],
                transformRequest: [function(e) {
                    return !w(e) || O(e) || P(e) || M(e) ? e : G(e)
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: H(Ki),
                    put: H(Ki),
                    patch: H(Ki)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                paramSerializer: "$httpParamSerializer"
            },
            t = !1;
        this.useApplyAsync = function(e) {
            return b(e) ? (t = !!e, this) : t
        };
        var i = !0;
        this.useLegacyPromiseExtensions = function(e) {
            return b(e) ? (i = !!e, this) : i
        };
        var o = this.interceptors = [];
        this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(s, u, l, c, p, d) {
            function h(t) {
                function o(e) {
                    var t = f({}, e);
                    return t.data = At(e.data, e.headers, e.status, l.transformResponse), Ot(e.status) ? t : p.reject(t)
                }

                function s(e, t) {
                    var n, r = {};
                    return a(e, function(e, i) {
                        E(e) ? (n = e(t), null != n && (r[i] = n)) : r[i] = e
                    }), r
                }

                function u(t) {
                    var n, r, i, a = e.headers,
                        o = f({}, t.headers);
                    a = f({}, a.common, a[Or(t.method)]);
                    e: for (n in a) {
                        r = Or(n);
                        for (i in o)
                            if (Or(i) === r) continue e;
                        o[n] = a[n]
                    }
                    return s(o, H(t))
                }
                if (!w(t)) throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", t);
                if (!C(t.url)) throw r("$http")("badreq", "Http request configuration url must be a string.  Received: {0}", t.url);
                var l = f({
                    method: "get",
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse,
                    paramSerializer: e.paramSerializer
                }, t);
                l.headers = u(t), l.method = Mr(l.method), l.paramSerializer = C(l.paramSerializer) ? d.get(l.paramSerializer) : l.paramSerializer;
                var c = function(t) {
                        var r = t.headers,
                            i = At(t.data, Tt(r), n, t.transformRequest);
                        return y(i) && a(r, function(e, t) {
                            "content-type" === Or(t) && delete r[t]
                        }), y(t.withCredentials) && !y(e.withCredentials) && (t.withCredentials = e.withCredentials), v(t, i).then(o, o)
                    },
                    h = [c, n],
                    m = p.when(l);
                for (a(k, function(e) {
                        (e.request || e.requestError) && h.unshift(e.request, e.requestError), (e.response || e.responseError) && h.push(e.response, e.responseError)
                    }); h.length;) {
                    var g = h.shift(),
                        $ = h.shift();
                    m = m.then(g, $)
                }
                return i ? (m.success = function(e) {
                    return de(e, "fn"), m.then(function(t) {
                        e(t.data, t.status, t.headers, l)
                    }), m
                }, m.error = function(e) {
                    return de(e, "fn"), m.then(null, function(t) {
                        e(t.data, t.status, t.headers, l)
                    }), m
                }) : (m.success = ea("success"), m.error = ea("error")), m
            }

            function m(e) {
                a(arguments, function(e) {
                    h[e] = function(t, n) {
                        return h(f({}, n || {}, {
                            method: e,
                            url: t
                        }))
                    }
                })
            }

            function g(e) {
                a(arguments, function(e) {
                    h[e] = function(t, n, r) {
                        return h(f({}, r || {}, {
                            method: e,
                            url: t,
                            data: n
                        }))
                    }
                })
            }

            function v(r, i) {
                function a(e, n, r, i) {
                    function a() {
                        o(n, e, r, i)
                    }
                    d && (Ot(e) ? d.put(k, [e, n, Dt(r), i]) : d.remove(k)), t ? c.$applyAsync(a) : (a(), c.$$phase || c.$apply())
                }

                function o(e, t, n, i) {
                    t = t >= -1 ? t : 0, (Ot(t) ? g.resolve : g.reject)({
                        data: e,
                        status: t,
                        headers: Tt(n),
                        config: r,
                        statusText: i
                    })
                }

                function l(e) {
                    o(e.data, e.status, H(e.headers()), e.statusText)
                }

                function f() {
                    var e = h.pendingRequests.indexOf(r); - 1 !== e && h.pendingRequests.splice(e, 1)
                }
                var d, m, g = p.defer(),
                    v = g.promise,
                    C = r.headers,
                    k = $(r.url, r.paramSerializer(r.params));
                if (h.pendingRequests.push(r), v.then(f, f), !r.cache && !e.cache || r.cache === !1 || "GET" !== r.method && "JSONP" !== r.method || (d = w(r.cache) ? r.cache : w(e.cache) ? e.cache : x), d && (m = d.get(k), b(m) ? N(m) ? m.then(l, l) : Wr(m) ? o(m[1], m[0], H(m[2]), m[3]) : o(m, 200, {}, "OK") : d.put(k, v)), y(m)) {
                    var S = jn(r.url) ? u()[r.xsrfCookieName || e.xsrfCookieName] : n;
                    S && (C[r.xsrfHeaderName || e.xsrfHeaderName] = S), s(r.method, k, i, a, C, r.timeout, r.withCredentials, r.responseType)
                }
                return v
            }

            function $(e, t) {
                return t.length > 0 && (e += (-1 == e.indexOf("?") ? "?" : "&") + t), e
            }
            var x = l("$http");
            e.paramSerializer = C(e.paramSerializer) ? d.get(e.paramSerializer) : e.paramSerializer;
            var k = [];
            return a(o, function(e) {
                k.unshift(C(e) ? d.get(e) : d.invoke(e))
            }), h.pendingRequests = [], m("get", "delete", "head", "jsonp"), g("post", "put", "patch"), h.defaults = e, h
        }]
    }

    function Pt() {
        this.$get = function() {
            return function() {
                return new e.XMLHttpRequest
            }
        }
    }

    function jt() {
        this.$get = ["$browser", "$window", "$document", "$xhrFactory", function(e, t, n, r) {
            return Nt(e, r, e.defer, t.angular.callbacks, n[0])
        }]
    }

    function Nt(e, t, n, r, i) {
        function o(e, t, n) {
            var a = i.createElement("script"),
                o = null;
            return a.type = "text/javascript", a.src = e, a.async = !0, o = function(e) {
                pi(a, "load", o), pi(a, "error", o), i.body.removeChild(a), a = null;
                var s = -1,
                    u = "unknown";
                e && ("load" !== e.type || r[t].called || (e = {
                    type: "error"
                }), u = e.type, s = "error" === e.type ? 404 : 200), n && n(s, u)
            }, fi(a, "load", o), fi(a, "error", o), i.body.appendChild(a), o
        }
        return function(i, s, u, l, c, f, p, d) {
            function h() {
                $ && $(), w && w.abort()
            }

            function g(t, r, i, a, o) {
                b(k) && n.cancel(k), $ = w = null, t(r, i, a, o), e.$$completeOutstandingRequest(m)
            }
            if (e.$$incOutstandingRequestCount(), s = s || e.url(), "jsonp" == Or(i)) {
                var v = "_" + (r.counter++).toString(36);
                r[v] = function(e) {
                    r[v].data = e, r[v].called = !0
                };
                var $ = o(s.replace("JSON_CALLBACK", "angular.callbacks." + v), v, function(e, t) {
                    g(l, e, r[v].data, "", t), r[v] = m
                })
            } else {
                var w = t(i, s);
                w.open(i, s, !0), a(c, function(e, t) {
                    b(e) && w.setRequestHeader(t, e)
                }), w.onload = function() {
                    var e = w.statusText || "",
                        t = "response" in w ? w.response : w.responseText,
                        n = 1223 === w.status ? 204 : w.status;
                    0 === n && (n = t ? 200 : "file" == Pn(s).protocol ? 404 : 0), g(l, n, t, w.getAllResponseHeaders(), e)
                };
                var x = function() {
                    g(l, -1, null, null, "")
                };
                if (w.onerror = x, w.onabort = x, p && (w.withCredentials = !0), d) try {
                    w.responseType = d
                } catch (C) {
                    if ("json" !== d) throw C
                }
                w.send(y(u) ? null : u)
            }
            if (f > 0) var k = n(h, f);
            else N(f) && f.then(h)
        }
    }

    function Lt() {
        var e = "{{",
            t = "}}";
        this.startSymbol = function(t) {
            return t ? (e = t, this) : e
        }, this.endSymbol = function(e) {
            return e ? (t = e, this) : t
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(n, r, i) {
            function a(e) {
                return "\\\\\\" + e
            }

            function o(n) {
                return n.replace(d, e).replace(h, t)
            }

            function s(e) {
                if (null == e) return "";
                switch (typeof e) {
                    case "string":
                        break;
                    case "number":
                        e = "" + e;
                        break;
                    default:
                        e = G(e)
                }
                return e
            }

            function u(e, t, n, r) {
                var i;
                return i = e.$watch(function(e) {
                    return i(), r(e)
                }, t, n)
            }

            function l(a, l, d, h) {
                function m(e) {
                    try {
                        return e = P(e), h && !b(e) ? e : s(e)
                    } catch (t) {
                        r(ta.interr(a, t))
                    }
                }
                if (!a.length || -1 === a.indexOf(e)) {
                    var g;
                    if (!l) {
                        var $ = o(a);
                        g = v($), g.exp = a, g.expressions = [], g.$$watchDelegate = u
                    }
                    return g
                }
                h = !!h;
                for (var w, x, C, k = 0, S = [], D = [], T = a.length, A = [], O = []; T > k;) {
                    if (-1 == (w = a.indexOf(e, k)) || -1 == (x = a.indexOf(t, w + c))) {
                        k !== T && A.push(o(a.substring(k)));
                        break
                    }
                    k !== w && A.push(o(a.substring(k, w))), C = a.substring(w + c, x), S.push(C), D.push(n(C, m)), k = x + p, O.push(A.length), A.push("")
                }
                if (d && A.length > 1 && ta.throwNoconcat(a), !l || S.length) {
                    var M = function(e) {
                            for (var t = 0, n = S.length; n > t; t++) {
                                if (h && y(e[t])) return;
                                A[O[t]] = e[t]
                            }
                            return A.join("")
                        },
                        P = function(e) {
                            return d ? i.getTrusted(d, e) : i.valueOf(e)
                        };
                    return f(function(e) {
                        var t = 0,
                            n = S.length,
                            i = new Array(n);
                        try {
                            for (; n > t; t++) i[t] = D[t](e);
                            return M(i)
                        } catch (o) {
                            r(ta.interr(a, o))
                        }
                    }, {
                        exp: a,
                        expressions: S,
                        $$watchDelegate: function(e, t) {
                            var n;
                            return e.$watchGroup(D, function(r, i) {
                                var a = M(r);
                                E(t) && t.call(this, a, r !== i ? n : a, e), n = a
                            })
                        }
                    })
                }
            }
            var c = e.length,
                p = t.length,
                d = new RegExp(e.replace(/./g, a), "g"),
                h = new RegExp(t.replace(/./g, a), "g");
            return l.startSymbol = function() {
                return e
            }, l.endSymbol = function() {
                return t
            }, l
        }]
    }

    function It() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function(e, t, n, r, i) {
            function a(a, s, u, l) {
                function c() {
                    f ? a.apply(null, p) : a(m)
                }
                var f = arguments.length > 4,
                    p = f ? z(arguments, 4) : [],
                    d = t.setInterval,
                    h = t.clearInterval,
                    m = 0,
                    g = b(l) && !l,
                    v = (g ? r : n).defer(),
                    $ = v.promise;
                return u = b(u) ? u : 0, $.$$intervalId = d(function() {
                    g ? i.defer(c) : e.$evalAsync(c), v.notify(m++), u > 0 && m >= u && (v.resolve(m), h($.$$intervalId), delete o[$.$$intervalId]), g || e.$apply()
                }, s), o[$.$$intervalId] = v, $
            }
            var o = {};
            return a.cancel = function(e) {
                return e && e.$$intervalId in o ? (o[e.$$intervalId].reject("canceled"), t.clearInterval(e.$$intervalId), delete o[e.$$intervalId], !0) : !1
            }, a
        }]
    }

    function Ft(e) {
        for (var t = e.split("/"), n = t.length; n--;) t[n] = re(t[n]);
        return t.join("/")
    }

    function qt(e, t) {
        var n = Pn(e);
        t.$$protocol = n.protocol, t.$$host = n.hostname, t.$$port = d(n.port) || ra[n.protocol] || null
    }

    function Vt(e, t) {
        var n = "/" !== e.charAt(0);
        n && (e = "/" + e);
        var r = Pn(e);
        t.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0) ? r.pathname.substring(1) : r.pathname), t.$$search = te(r.search), t.$$hash = decodeURIComponent(r.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
    }

    function Rt(e, t) {
        return 0 === t.indexOf(e) ? t.substr(e.length) : void 0
    }

    function Ut(e) {
        var t = e.indexOf("#");
        return -1 == t ? e : e.substr(0, t)
    }

    function Ht(e) {
        return e.replace(/(#.+)|#$/, "$1")
    }

    function _t(e) {
        return e.substr(0, Ut(e).lastIndexOf("/") + 1)
    }

    function Bt(e) {
        return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
    }

    function zt(e, t, n) {
        this.$$html5 = !0, n = n || "", qt(e, this), this.$$parse = function(e) {
            var n = Rt(t, e);
            if (!C(n)) throw ia("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', e, t);
            Vt(n, this), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function() {
            var e = ne(this.$$search),
                n = this.$$hash ? "#" + re(this.$$hash) : "";
            this.$$url = Ft(this.$$path) + (e ? "?" + e : "") + n, this.$$absUrl = t + this.$$url.substr(1)
        }, this.$$parseLinkUrl = function(r, i) {
            if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
            var a, o, s;
            return b(a = Rt(e, r)) ? (o = a, s = b(a = Rt(n, a)) ? t + (Rt("/", a) || a) : e + o) : b(a = Rt(t, r)) ? s = t + a : t == r + "/" && (s = t), s && this.$$parse(s), !!s
        }
    }

    function Wt(e, t, n) {
        qt(e, this), this.$$parse = function(r) {
            function i(e, t, n) {
                var r, i = /^\/[A-Z]:(\/.*)/;
                return 0 === t.indexOf(n) && (t = t.replace(n, "")), i.exec(t) ? e : (r = i.exec(e), r ? r[1] : e)
            }
            var a, o = Rt(e, r) || Rt(t, r);
            y(o) || "#" !== o.charAt(0) ? this.$$html5 ? a = o : (a = "", y(o) && (e = r, this.replace())) : (a = Rt(n, o), y(a) && (a = o)), Vt(a, this), this.$$path = i(this.$$path, a, e), this.$$compose()
        }, this.$$compose = function() {
            var t = ne(this.$$search),
                r = this.$$hash ? "#" + re(this.$$hash) : "";
            this.$$url = Ft(this.$$path) + (t ? "?" + t : "") + r, this.$$absUrl = e + (this.$$url ? n + this.$$url : "")
        }, this.$$parseLinkUrl = function(t, n) {
            return Ut(e) == Ut(t) ? (this.$$parse(t), !0) : !1
        }
    }

    function Yt(e, t, n) {
        this.$$html5 = !0, Wt.apply(this, arguments), this.$$parseLinkUrl = function(r, i) {
            if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
            var a, o;
            return e == Ut(r) ? a = r : (o = Rt(t, r)) ? a = e + n + o : t === r + "/" && (a = t), a && this.$$parse(a), !!a
        }, this.$$compose = function() {
            var t = ne(this.$$search),
                r = this.$$hash ? "#" + re(this.$$hash) : "";
            this.$$url = Ft(this.$$path) + (t ? "?" + t : "") + r, this.$$absUrl = e + n + this.$$url
        }
    }

    function Gt(e) {
        return function() {
            return this[e]
        }
    }

    function Kt(e, t) {
        return function(n) {
            return y(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
        }
    }

    function Xt() {
        var e = "",
            t = {
                enabled: !1,
                requireBase: !0,
                rewriteLinks: !0
            };
        this.hashPrefix = function(t) {
            return b(t) ? (e = t, this) : e
        }, this.html5Mode = function(e) {
            return j(e) ? (t.enabled = e, this) : w(e) ? (j(e.enabled) && (t.enabled = e.enabled), j(e.requireBase) && (t.requireBase = e.requireBase), j(e.rewriteLinks) && (t.rewriteLinks = e.rewriteLinks), this) : t
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(n, r, i, a, o) {
            function s(e, t, n) {
                var i = l.url(),
                    a = l.$$state;
                try {
                    r.url(e, t, n), l.$$state = r.state()
                } catch (o) {
                    throw l.url(i), l.$$state = a, o
                }
            }

            function u(e, t) {
                n.$broadcast("$locationChangeSuccess", l.absUrl(), e, l.$$state, t)
            }
            var l, c, f, p = r.baseHref(),
                d = r.url();
            if (t.enabled) {
                if (!p && t.requireBase) throw ia("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                f = Bt(d) + (p || "/"), c = i.history ? zt : Yt
            } else f = Ut(d), c = Wt;
            var h = _t(f);
            l = new c(f, h, "#" + e), l.$$parseLinkUrl(d, d), l.$$state = r.state();
            var m = /^\s*(javascript|mailto):/i;
            a.on("click", function(e) {
                if (t.rewriteLinks && !e.ctrlKey && !e.metaKey && !e.shiftKey && 2 != e.which && 2 != e.button) {
                    for (var i = Lr(e.target);
                        "a" !== V(i[0]);)
                        if (i[0] === a[0] || !(i = i.parent())[0]) return;
                    var s = i.prop("href"),
                        u = i.attr("href") || i.attr("xlink:href");
                    w(s) && "[object SVGAnimatedString]" === s.toString() && (s = Pn(s.animVal).href), m.test(s) || !s || i.attr("target") || e.isDefaultPrevented() || l.$$parseLinkUrl(s, u) && (e.preventDefault(), l.absUrl() != r.url() && (n.$apply(), o.angular["ff-684208-preventDefault"] = !0))
                }
            }), Ht(l.absUrl()) != Ht(d) && r.url(l.absUrl(), !0);
            var g = !0;
            return r.onUrlChange(function(e, t) {
                return y(Rt(h, e)) ? void(o.location.href = e) : (n.$evalAsync(function() {
                    var r, i = l.absUrl(),
                        a = l.$$state;
                    e = Ht(e), l.$$parse(e), l.$$state = t, r = n.$broadcast("$locationChangeStart", e, i, t, a).defaultPrevented, l.absUrl() === e && (r ? (l.$$parse(i), l.$$state = a, s(i, !1, a)) : (g = !1, u(i, a)))
                }), void(n.$$phase || n.$digest()))
            }), n.$watch(function() {
                var e = Ht(r.url()),
                    t = Ht(l.absUrl()),
                    a = r.state(),
                    o = l.$$replace,
                    c = e !== t || l.$$html5 && i.history && a !== l.$$state;
                (g || c) && (g = !1, n.$evalAsync(function() {
                    var t = l.absUrl(),
                        r = n.$broadcast("$locationChangeStart", t, e, l.$$state, a).defaultPrevented;
                    l.absUrl() === t && (r ? (l.$$parse(e), l.$$state = a) : (c && s(t, o, a === l.$$state ? null : l.$$state), u(e, a)))
                })), l.$$replace = !1
            }), l
        }]
    }

    function Jt() {
        var e = !0,
            t = this;
        this.debugEnabled = function(t) {
            return b(t) ? (e = t, this) : e
        }, this.$get = ["$window", function(n) {
            function r(e) {
                return e instanceof Error && (e.stack ? e = e.message && -1 === e.stack.indexOf(e.message) ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e
            }

            function i(e) {
                var t = n.console || {},
                    i = t[e] || t.log || m,
                    o = !1;
                try {
                    o = !!i.apply
                } catch (s) {}
                return o ? function() {
                    var e = [];
                    return a(arguments, function(t) {
                        e.push(r(t))
                    }), i.apply(t, e)
                } : function(e, t) {
                    i(e, null == t ? "" : t)
                }
            }
            return {
                log: i("log"),
                info: i("info"),
                warn: i("warn"),
                error: i("error"),
                debug: function() {
                    var n = i("debug");
                    return function() {
                        e && n.apply(t, arguments)
                    }
                }()
            }
        }]
    }

    function Qt(e, t) {
        if ("__defineGetter__" === e || "__defineSetter__" === e || "__lookupGetter__" === e || "__lookupSetter__" === e || "__proto__" === e) throw oa("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", t);
        return e
    }

    function Zt(e) {
        return e + ""
    }

    function en(e, t) {
        if (e) {
            if (e.constructor === e) throw oa("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
            if (e.window === e) throw oa("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
            if (e.children && (e.nodeName || e.prop && e.attr && e.find)) throw oa("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t);
            if (e === Object) throw oa("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", t)
        }
        return e
    }

    function tn(e, t) {
        if (e) {
            if (e.constructor === e) throw oa("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
            if (e === sa || e === ua || e === la) throw oa("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", t)
        }
    }

    function nn(e, t) {
        if (e && (e === 0..constructor || e === (!1).constructor || e === "".constructor || e === {}.constructor || e === [].constructor || e === Function.constructor)) throw oa("isecaf", "Assigning to a constructor is disallowed! Expression: {0}", t)
    }

    function rn(e, t) {
        return "undefined" != typeof e ? e : t
    }

    function an(e, t) {
        return "undefined" == typeof e ? t : "undefined" == typeof t ? e : e + t
    }

    function on(e, t) {
        var n = e(t);
        return !n.$stateful
    }

    function sn(e, t) {
        var n, r;
        switch (e.type) {
            case da.Program:
                n = !0, a(e.body, function(e) {
                    sn(e.expression, t), n = n && e.expression.constant
                }), e.constant = n;
                break;
            case da.Literal:
                e.constant = !0, e.toWatch = [];
                break;
            case da.UnaryExpression:
                sn(e.argument, t), e.constant = e.argument.constant, e.toWatch = e.argument.toWatch;
                break;
            case da.BinaryExpression:
                sn(e.left, t), sn(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.left.toWatch.concat(e.right.toWatch);
                break;
            case da.LogicalExpression:
                sn(e.left, t), sn(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.constant ? [] : [e];
                break;
            case da.ConditionalExpression:
                sn(e.test, t), sn(e.alternate, t), sn(e.consequent, t), e.constant = e.test.constant && e.alternate.constant && e.consequent.constant, e.toWatch = e.constant ? [] : [e];
                break;
            case da.Identifier:
                e.constant = !1, e.toWatch = [e];
                break;
            case da.MemberExpression:
                sn(e.object, t), e.computed && sn(e.property, t), e.constant = e.object.constant && (!e.computed || e.property.constant), e.toWatch = [e];
                break;
            case da.CallExpression:
                n = e.filter ? on(t, e.callee.name) : !1, r = [], a(e.arguments, function(e) {
                    sn(e, t), n = n && e.constant, e.constant || r.push.apply(r, e.toWatch)
                }), e.constant = n, e.toWatch = e.filter && on(t, e.callee.name) ? r : [e];
                break;
            case da.AssignmentExpression:
                sn(e.left, t), sn(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = [e];
                break;
            case da.ArrayExpression:
                n = !0, r = [], a(e.elements, function(e) {
                    sn(e, t), n = n && e.constant, e.constant || r.push.apply(r, e.toWatch)
                }), e.constant = n, e.toWatch = r;
                break;
            case da.ObjectExpression:
                n = !0, r = [], a(e.properties, function(e) {
                    sn(e.value, t), n = n && e.value.constant, e.value.constant || r.push.apply(r, e.value.toWatch)
                }), e.constant = n, e.toWatch = r;
                break;
            case da.ThisExpression:
                e.constant = !1, e.toWatch = [];
                break;
            case da.LocalsExpression:
                e.constant = !1, e.toWatch = []
        }
    }

    function un(e) {
        if (1 == e.length) {
            var t = e[0].expression,
                r = t.toWatch;
            return 1 !== r.length ? r : r[0] !== t ? r : n
        }
    }

    function ln(e) {
        return e.type === da.Identifier || e.type === da.MemberExpression
    }

    function cn(e) {
        return 1 === e.body.length && ln(e.body[0].expression) ? {
            type: da.AssignmentExpression,
            left: e.body[0].expression,
            right: {
                type: da.NGValueParameter
            },
            operator: "="
        } : void 0
    }

    function fn(e) {
        return 0 === e.body.length || 1 === e.body.length && (e.body[0].expression.type === da.Literal || e.body[0].expression.type === da.ArrayExpression || e.body[0].expression.type === da.ObjectExpression)
    }

    function pn(e) {
        return e.constant
    }

    function dn(e, t) {
        this.astBuilder = e, this.$filter = t
    }

    function hn(e, t) {
        this.astBuilder = e, this.$filter = t
    }

    function mn(e) {
        return "constructor" == e
    }

    function gn(e) {
        return E(e.valueOf) ? e.valueOf() : ma.call(e)
    }

    function vn() {
        var e = ve(),
            t = ve();
        this.$get = ["$filter", function(r) {
            function i(n, i, a) {
                var s, d, $;
                switch (a = a || v, typeof n) {
                    case "string":
                        n = n.trim(), $ = n;
                        var y = a ? t : e;
                        if (s = y[$], !s) {
                            ":" === n.charAt(0) && ":" === n.charAt(1) && (d = !0, n = n.substring(2));
                            var b = a ? g : h,
                                w = new pa(b),
                                x = new ha(w, r, b);
                            s = x.parse(n), s.constant ? s.$$watchDelegate = f : d ? s.$$watchDelegate = s.literal ? c : l : s.inputs && (s.$$watchDelegate = u), a && (s = o(s)), y[$] = s
                        }
                        return p(s, i);
                    case "function":
                        return p(n, i);
                    default:
                        return p(m, i)
                }
            }

            function o(e) {
                function t(t, n, r, i) {
                    var a = v;
                    v = !0;
                    try {
                        return e(t, n, r, i)
                    } finally {
                        v = a
                    }
                }
                if (!e) return e;
                t.$$watchDelegate = e.$$watchDelegate, t.assign = o(e.assign), t.constant = e.constant, t.literal = e.literal;
                for (var n = 0; e.inputs && n < e.inputs.length; ++n) e.inputs[n] = o(e.inputs[n]);
                return t.inputs = e.inputs, t
            }

            function s(e, t) {
                return null == e || null == t ? e === t : "object" == typeof e && (e = gn(e), "object" == typeof e) ? !1 : e === t || e !== e && t !== t
            }

            function u(e, t, r, i, a) {
                var o, u = i.inputs;
                if (1 === u.length) {
                    var l = s;
                    return u = u[0], e.$watch(function(e) {
                        var t = u(e);
                        return s(t, l) || (o = i(e, n, n, [t]), l = t && gn(t)), o
                    }, t, r, a)
                }
                for (var c = [], f = [], p = 0, d = u.length; d > p; p++) c[p] = s, f[p] = null;
                return e.$watch(function(e) {
                    for (var t = !1, r = 0, a = u.length; a > r; r++) {
                        var l = u[r](e);
                        (t || (t = !s(l, c[r]))) && (f[r] = l, c[r] = l && gn(l))
                    }
                    return t && (o = i(e, n, n, f)), o
                }, t, r, a)
            }

            function l(e, t, n, r) {
                var i, a;
                return i = e.$watch(function(e) {
                    return r(e)
                }, function(e, n, r) {
                    a = e, E(t) && t.apply(this, arguments), b(e) && r.$$postDigest(function() {
                        b(a) && i()
                    })
                }, n)
            }

            function c(e, t, n, r) {
                function i(e) {
                    var t = !0;
                    return a(e, function(e) {
                        b(e) || (t = !1)
                    }), t
                }
                var o, s;
                return o = e.$watch(function(e) {
                    return r(e)
                }, function(e, n, r) {
                    s = e, E(t) && t.call(this, e, n, r), i(e) && r.$$postDigest(function() {
                        i(s) && o()
                    })
                }, n)
            }

            function f(e, t, n, r) {
                var i;
                return i = e.$watch(function(e) {
                    return i(), r(e)
                }, t, n)
            }

            function p(e, t) {
                if (!t) return e;
                var n = e.$$watchDelegate,
                    r = !1,
                    i = n !== c && n !== l,
                    a = i ? function(n, i, a, o) {
                        var s = r && o ? o[0] : e(n, i, a, o);
                        return t(s, n, i)
                    } : function(n, r, i, a) {
                        var o = e(n, r, i, a),
                            s = t(o, n, r);
                        return b(o) ? s : o
                    };
                return e.$$watchDelegate && e.$$watchDelegate !== u ? a.$$watchDelegate = e.$$watchDelegate : t.$stateful || (a.$$watchDelegate = u, r = !e.inputs, a.inputs = e.inputs ? e.inputs : [e]), a
            }
            var d = Xr().noUnsafeEval,
                h = {
                    csp: d,
                    expensiveChecks: !1
                },
                g = {
                    csp: d,
                    expensiveChecks: !0
                },
                v = !1;
            return i.$$runningExpensiveChecks = function() {
                return v
            }, i
        }]
    }

    function $n() {
        this.$get = ["$rootScope", "$exceptionHandler", function(e, t) {
            return bn(function(t) {
                e.$evalAsync(t)
            }, t)
        }]
    }

    function yn() {
        this.$get = ["$browser", "$exceptionHandler", function(e, t) {
            return bn(function(t) {
                e.defer(t)
            }, t)
        }]
    }

    function bn(e, t) {
        function i() {
            this.$$state = {
                status: 0
            }
        }

        function o(e, t) {
            return function(n) {
                t.call(e, n)
            }
        }

        function s(e) {
            var r, i, a;
            a = e.pending, e.processScheduled = !1, e.pending = n;
            for (var o = 0, s = a.length; s > o; ++o) {
                i = a[o][0], r = a[o][e.status];
                try {
                    E(r) ? i.resolve(r(e.value)) : 1 === e.status ? i.resolve(e.value) : i.reject(e.value)
                } catch (u) {
                    i.reject(u), t(u)
                }
            }
        }

        function u(t) {
            !t.processScheduled && t.pending && (t.processScheduled = !0, e(function() {
                s(t)
            }))
        }

        function l() {
            this.promise = new i
        }

        function c(e) {
            var t = new l,
                n = 0,
                r = Wr(e) ? [] : {};
            return a(e, function(e, i) {
                n++, v(e).then(function(e) {
                    r.hasOwnProperty(i) || (r[i] = e, --n || t.resolve(r))
                }, function(e) {
                    r.hasOwnProperty(i) || t.reject(e)
                })
            }), 0 === n && t.resolve(r), t.promise
        }
        var p = r("$q", TypeError),
            d = function() {
                var e = new l;
                return e.resolve = o(e, e.resolve), e.reject = o(e, e.reject), e.notify = o(e, e.notify), e
            };
        f(i.prototype, {
            then: function(e, t, n) {
                if (y(e) && y(t) && y(n)) return this;
                var r = new l;
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([r, e, t, n]), this.$$state.status > 0 && u(this.$$state), r.promise
            },
            "catch": function(e) {
                return this.then(null, e)
            },
            "finally": function(e, t) {
                return this.then(function(t) {
                    return g(t, !0, e)
                }, function(t) {
                    return g(t, !1, e)
                }, t)
            }
        }), f(l.prototype, {
            resolve: function(e) {
                this.promise.$$state.status || (e === this.promise ? this.$$reject(p("qcycle", "Expected promise to be resolved with value other than itself '{0}'", e)) : this.$$resolve(e))
            },
            $$resolve: function(e) {
                function n(e) {
                    s || (s = !0, a.$$resolve(e))
                }

                function r(e) {
                    s || (s = !0, a.$$reject(e))
                }
                var i, a = this,
                    s = !1;
                try {
                    (w(e) || E(e)) && (i = e && e.then), E(i) ? (this.promise.$$state.status = -1, i.call(e, n, r, o(this, this.notify))) : (this.promise.$$state.value = e, this.promise.$$state.status = 1, u(this.promise.$$state))
                } catch (l) {
                    r(l), t(l)
                }
            },
            reject: function(e) {
                this.promise.$$state.status || this.$$reject(e)
            },
            $$reject: function(e) {
                this.promise.$$state.value = e, this.promise.$$state.status = 2, u(this.promise.$$state)
            },
            notify: function(n) {
                var r = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && r && r.length && e(function() {
                    for (var e, i, a = 0, o = r.length; o > a; a++) {
                        i = r[a][0], e = r[a][3];
                        try {
                            i.notify(E(e) ? e(n) : n)
                        } catch (s) {
                            t(s)
                        }
                    }
                })
            }
        });
        var h = function(e) {
                var t = new l;
                return t.reject(e), t.promise
            },
            m = function(e, t) {
                var n = new l;
                return t ? n.resolve(e) : n.reject(e), n.promise
            },
            g = function(e, t, n) {
                var r = null;
                try {
                    E(n) && (r = n())
                } catch (i) {
                    return m(i, !1)
                }
                return N(r) ? r.then(function() {
                    return m(e, t)
                }, function(e) {
                    return m(e, !1)
                }) : m(e, t)
            },
            v = function(e, t, n, r) {
                var i = new l;
                return i.resolve(e), i.promise.then(t, n, r)
            },
            $ = v,
            b = function(e) {
                function t(e) {
                    r.resolve(e)
                }

                function n(e) {
                    r.reject(e)
                }
                if (!E(e)) throw p("norslvr", "Expected resolverFn, got '{0}'", e);
                var r = new l;
                return e(t, n), r.promise
            };
        return b.prototype = i.prototype, b.defer = d, b.reject = h, b.when = v, b.resolve = $, b.all = c, b
    }

    function wn() {
        this.$get = ["$window", "$timeout", function(e, t) {
            var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame,
                r = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame,
                i = !!n,
                a = i ? function(e) {
                    var t = n(e);
                    return function() {
                        r(t)
                    }
                } : function(e) {
                    var n = t(e, 16.66, !1);
                    return function() {
                        t.cancel(n)
                    }
                };
            return a.supported = i, a
        }]
    }

    function xn() {
        function e(e) {
            function t() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = u(), this.$$ChildScope = null
            }
            return t.prototype = e, t
        }
        var t = 10,
            n = r("$rootScope"),
            o = null,
            s = null;
        this.digestTtl = function(e) {
            return arguments.length && (t = e), t
        }, this.$get = ["$exceptionHandler", "$parse", "$browser", function(r, l, c) {
            function f(e) {
                e.currentScope.$$destroyed = !0
            }

            function p(e) {
                9 === Nr && (e.$$childHead && p(e.$$childHead), e.$$nextSibling && p(e.$$nextSibling)), e.$parent = e.$$nextSibling = e.$$prevSibling = e.$$childHead = e.$$childTail = e.$root = e.$$watchers = null
            }

            function d() {
                this.$id = u(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
            }

            function h(e) {
                if (k.$$phase) throw n("inprog", "{0} already in progress", k.$$phase);
                k.$$phase = e
            }

            function g() {
                k.$$phase = null
            }

            function v(e, t) {
                do e.$$watchersCount += t; while (e = e.$parent)
            }

            function $(e, t, n) {
                do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
            }

            function b() {}

            function x() {
                for (; T.length;) try {
                    T.shift()()
                } catch (e) {
                    r(e)
                }
                s = null
            }

            function C() {
                null === s && (s = c.defer(function() {
                    k.$apply(x)
                }))
            }
            d.prototype = {
                constructor: d,
                $new: function(t, n) {
                    var r;
                    return n = n || this, t ? (r = new d, r.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = e(this)), r = new this.$$ChildScope), r.$parent = n, r.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = r, n.$$childTail = r) : n.$$childHead = n.$$childTail = r, (t || n != this) && r.$on("$destroy", f), r
                },
                $watch: function(e, t, n, r) {
                    var i = l(e);
                    if (i.$$watchDelegate) return i.$$watchDelegate(this, t, n, i, e);
                    var a = this,
                        s = a.$$watchers,
                        u = {
                            fn: t,
                            last: b,
                            get: i,
                            exp: r || e,
                            eq: !!n
                        };
                    return o = null, E(t) || (u.fn = m), s || (s = a.$$watchers = []), s.unshift(u), v(this, 1),
                        function() {
                            R(s, u) >= 0 && v(a, -1), o = null
                        }
                },
                $watchGroup: function(e, t) {
                    function n() {
                        u = !1, l ? (l = !1, t(i, i, s)) : t(i, r, s)
                    }
                    var r = new Array(e.length),
                        i = new Array(e.length),
                        o = [],
                        s = this,
                        u = !1,
                        l = !0;
                    if (!e.length) {
                        var c = !0;
                        return s.$evalAsync(function() {
                                c && t(i, i, s)
                            }),
                            function() {
                                c = !1
                            }
                    }
                    return 1 === e.length ? this.$watch(e[0], function(e, n, a) {
                        i[0] = e, r[0] = n, t(i, e === n ? i : r, a)
                    }) : (a(e, function(e, t) {
                        var a = s.$watch(e, function(e, a) {
                            i[t] = e, r[t] = a, u || (u = !0, s.$evalAsync(n))
                        });
                        o.push(a)
                    }), function() {
                        for (; o.length;) o.shift()()
                    })
                },
                $watchCollection: function(e, t) {
                    function n(e) {
                        a = e;
                        var t, n, r, s, u;
                        if (!y(a)) {
                            if (w(a))
                                if (i(a)) {
                                    o !== d && (o = d, g = o.length = 0, f++), t = a.length, g !== t && (f++, o.length = g = t);
                                    for (var l = 0; t > l; l++) u = o[l], s = a[l], r = u !== u && s !== s, r || u === s || (f++, o[l] = s)
                                } else {
                                    o !== h && (o = h = {}, g = 0, f++), t = 0;
                                    for (n in a) Ar.call(a, n) && (t++, s = a[n], u = o[n], n in o ? (r = u !== u && s !== s, r || u === s || (f++, o[n] = s)) : (g++, o[n] = s, f++));
                                    if (g > t) {
                                        f++;
                                        for (n in o) Ar.call(a, n) || (g--, delete o[n])
                                    }
                                }
                            else o !== a && (o = a, f++);
                            return f
                        }
                    }

                    function r() {
                        if (m ? (m = !1, t(a, a, u)) : t(a, s, u), c)
                            if (w(a))
                                if (i(a)) {
                                    s = new Array(a.length);
                                    for (var e = 0; e < a.length; e++) s[e] = a[e]
                                } else {
                                    s = {};
                                    for (var n in a) Ar.call(a, n) && (s[n] = a[n])
                                }
                        else s = a
                    }
                    n.$stateful = !0;
                    var a, o, s, u = this,
                        c = t.length > 1,
                        f = 0,
                        p = l(e, n),
                        d = [],
                        h = {},
                        m = !0,
                        g = 0;
                    return this.$watch(p, r)
                },
                $digest: function() {
                    var e, i, a, u, l, f, p, d, m, v, $, y, w = t,
                        C = this,
                        T = [];
                    h("$digest"), c.$$checkUrlChange(), this === k && null !== s && (c.defer.cancel(s), x()), o = null;
                    do {
                        for (d = !1, v = C; S.length;) {
                            try {
                                y = S.shift(), y.scope.$eval(y.expression, y.locals)
                            } catch (A) {
                                r(A)
                            }
                            o = null
                        }
                        e: do {
                            if (f = v.$$watchers)
                                for (p = f.length; p--;) try {
                                    if (e = f[p])
                                        if (l = e.get, (i = l(v)) === (a = e.last) || (e.eq ? _(i, a) : "number" == typeof i && "number" == typeof a && isNaN(i) && isNaN(a))) {
                                            if (e === o) {
                                                d = !1;
                                                break e
                                            }
                                        } else d = !0, o = e, e.last = e.eq ? U(i, null) : i, u = e.fn, u(i, a === b ? i : a, v), 5 > w && ($ = 4 - w, T[$] || (T[$] = []), T[$].push({
                                            msg: E(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp,
                                            newVal: i,
                                            oldVal: a
                                        }))
                                } catch (A) {
                                    r(A)
                                }
                            if (!(m = v.$$watchersCount && v.$$childHead || v !== C && v.$$nextSibling))
                                for (; v !== C && !(m = v.$$nextSibling);) v = v.$parent
                        } while (v = m);
                        if ((d || S.length) && !w--) throw g(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", t, T)
                    } while (d || S.length);
                    for (g(); D.length;) try {
                        D.shift()()
                    } catch (A) {
                        r(A)
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var e = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this === k && c.$$applicationDestroyed(), v(this, -this.$$watchersCount);
                        for (var t in this.$$listenerCount) $(this, this.$$listenerCount[t], t);
                        e && e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e && e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = m, this.$on = this.$watch = this.$watchGroup = function() {
                            return m
                        }, this.$$listeners = {}, this.$$nextSibling = null, p(this)
                    }
                },
                $eval: function(e, t) {
                    return l(e)(this, t)
                },
                $evalAsync: function(e, t) {
                    k.$$phase || S.length || c.defer(function() {
                        S.length && k.$digest()
                    }), S.push({
                        scope: this,
                        expression: l(e),
                        locals: t
                    })
                },
                $$postDigest: function(e) {
                    D.push(e)
                },
                $apply: function(e) {
                    try {
                        h("$apply");
                        try {
                            return this.$eval(e)
                        } finally {
                            g()
                        }
                    } catch (t) {
                        r(t)
                    } finally {
                        try {
                            k.$digest()
                        } catch (t) {
                            throw r(t), t
                        }
                    }
                },
                $applyAsync: function(e) {
                    function t() {
                        n.$eval(e)
                    }
                    var n = this;
                    e && T.push(t), e = l(e), C()
                },
                $on: function(e, t) {
                    var n = this.$$listeners[e];
                    n || (this.$$listeners[e] = n = []), n.push(t);
                    var r = this;
                    do r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e]++; while (r = r.$parent);
                    var i = this;
                    return function() {
                        var r = n.indexOf(t); - 1 !== r && (n[r] = null, $(i, 1, e))
                    }
                },
                $emit: function(e, t) {
                    var n, i, a, o = [],
                        s = this,
                        u = !1,
                        l = {
                            name: e,
                            targetScope: s,
                            stopPropagation: function() {
                                u = !0
                            },
                            preventDefault: function() {
                                l.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        },
                        c = B([l], arguments, 1);
                    do {
                        for (n = s.$$listeners[e] || o, l.currentScope = s, i = 0, a = n.length; a > i; i++)
                            if (n[i]) try {
                                n[i].apply(null, c)
                            } catch (f) {
                                r(f)
                            } else n.splice(i, 1), i--, a--;
                        if (u) return l.currentScope = null, l;
                        s = s.$parent
                    } while (s);
                    return l.currentScope = null, l
                },
                $broadcast: function(e, t) {
                    var n = this,
                        i = n,
                        a = n,
                        o = {
                            name: e,
                            targetScope: n,
                            preventDefault: function() {
                                o.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        };
                    if (!n.$$listenerCount[e]) return o;
                    for (var s, u, l, c = B([o], arguments, 1); i = a;) {
                        for (o.currentScope = i, s = i.$$listeners[e] || [], u = 0, l = s.length; l > u; u++)
                            if (s[u]) try {
                                s[u].apply(null, c)
                            } catch (f) {
                                r(f)
                            } else s.splice(u, 1), u--, l--;
                        if (!(a = i.$$listenerCount[e] && i.$$childHead || i !== n && i.$$nextSibling))
                            for (; i !== n && !(a = i.$$nextSibling);) i = i.$parent
                    }
                    return o.currentScope = null, o
                }
            };
            var k = new d,
                S = k.$$asyncQueue = [],
                D = k.$$postDigestQueue = [],
                T = k.$$applyAsyncQueue = [];
            return k
        }]
    }

    function Cn() {
        var e = /^\s*(https?|ftp|mailto|tel|file):/,
            t = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(t) {
            return b(t) ? (e = t, this) : e
        }, this.imgSrcSanitizationWhitelist = function(e) {
            return b(e) ? (t = e, this) : t
        }, this.$get = function() {
            return function(n, r) {
                var i, a = r ? t : e;
                return i = Pn(n).href, "" === i || i.match(a) ? n : "unsafe:" + i
            }
        }
    }

    function kn(e) {
        if ("self" === e) return e;
        if (C(e)) {
            if (e.indexOf("***") > -1) throw ga("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
            return e = Kr(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + e + "$")
        }
        if (D(e)) return new RegExp("^" + e.source + "$");
        throw ga("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function Sn(e) {
        var t = [];
        return b(e) && a(e, function(e) {
            t.push(kn(e))
        }), t
    }

    function En() {
        this.SCE_CONTEXTS = va;
        var e = ["self"],
            t = [];
        this.resourceUrlWhitelist = function(t) {
            return arguments.length && (e = Sn(t)), e
        }, this.resourceUrlBlacklist = function(e) {
            return arguments.length && (t = Sn(e)), t
        }, this.$get = ["$injector", function(n) {
            function r(e, t) {
                return "self" === e ? jn(t) : !!e.exec(t.href)
            }

            function i(n) {
                var i, a, o = Pn(n.toString()),
                    s = !1;
                for (i = 0, a = e.length; a > i; i++)
                    if (r(e[i], o)) {
                        s = !0;
                        break
                    }
                if (s)
                    for (i = 0, a = t.length; a > i; i++)
                        if (r(t[i], o)) {
                            s = !1;
                            break
                        }
                return s
            }

            function a(e) {
                var t = function(e) {
                    this.$$unwrapTrustedValue = function() {
                        return e
                    }
                };
                return e && (t.prototype = new e), t.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }, t.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString()
                }, t
            }

            function o(e, t) {
                var n = f.hasOwnProperty(e) ? f[e] : null;
                if (!n) throw ga("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
                if (null === t || y(t) || "" === t) return t;
                if ("string" != typeof t) throw ga("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
                return new n(t)
            }

            function s(e) {
                return e instanceof c ? e.$$unwrapTrustedValue() : e
            }

            function u(e, t) {
                if (null === t || y(t) || "" === t) return t;
                var n = f.hasOwnProperty(e) ? f[e] : null;
                if (n && t instanceof n) return t.$$unwrapTrustedValue();
                if (e === va.RESOURCE_URL) {
                    if (i(t)) return t;
                    throw ga("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
                }
                if (e === va.HTML) return l(t);
                throw ga("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            var l = function(e) {
                throw ga("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            n.has("$sanitize") && (l = n.get("$sanitize"));
            var c = a(),
                f = {};
            return f[va.HTML] = a(c), f[va.CSS] = a(c), f[va.URL] = a(c), f[va.JS] = a(c), f[va.RESOURCE_URL] = a(f[va.URL]), {
                trustAs: o,
                getTrusted: u,
                valueOf: s
            }
        }]
    }

    function Dn() {
        var e = !0;
        this.enabled = function(t) {
            return arguments.length && (e = !!t), e
        }, this.$get = ["$parse", "$sceDelegate", function(t, n) {
            if (e && 8 > Nr) throw ga("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var r = H(va);
            r.isEnabled = function() {
                return e
            }, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, e || (r.trustAs = r.getTrusted = function(e, t) {
                return t
            }, r.valueOf = g), r.parseAs = function(e, n) {
                var i = t(n);
                return i.literal && i.constant ? i : t(n, function(t) {
                    return r.getTrusted(e, t)
                })
            };
            var i = r.parseAs,
                o = r.getTrusted,
                s = r.trustAs;
            return a(va, function(e, t) {
                var n = Or(t);
                r[Ce("parse_as_" + n)] = function(t) {
                    return i(e, t)
                }, r[Ce("get_trusted_" + n)] = function(t) {
                    return o(e, t)
                }, r[Ce("trust_as_" + n)] = function(t) {
                    return s(e, t)
                }
            }), r
        }]
    }

    function Tn() {
        this.$get = ["$window", "$document", function(e, t) {
            var n, r, i = {},
                a = d((/android (\d+)/.exec(Or((e.navigator || {}).userAgent)) || [])[1]),
                o = /Boxee/i.test((e.navigator || {}).userAgent),
                s = t[0] || {},
                u = /^(Moz|webkit|ms)(?=[A-Z])/,
                l = s.body && s.body.style,
                c = !1,
                f = !1;
            if (l) {
                for (var p in l)
                    if (r = u.exec(p)) {
                        n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
                        break
                    }
                n || (n = "WebkitOpacity" in l && "webkit"), c = !!("transition" in l || n + "Transition" in l), f = !!("animation" in l || n + "Animation" in l), !a || c && f || (c = C(l.webkitTransition), f = C(l.webkitAnimation))
            }
            return {
                history: !(!e.history || !e.history.pushState || 4 > a || o),
                hasEvent: function(e) {
                    if ("input" === e && 11 >= Nr) return !1;
                    if (y(i[e])) {
                        var t = s.createElement("div");
                        i[e] = "on" + e in t
                    }
                    return i[e]
                },
                csp: Xr(),
                vendorPrefix: n,
                transitions: c,
                animations: f,
                android: a
            }
        }]
    }

    function An() {
        var e;
        this.httpOptions = function(t) {
            return t ? (e = t, this) : e
        }, this.$get = ["$templateCache", "$http", "$q", "$sce", function(t, n, r, i) {
            function a(o, s) {
                function u(e) {
                    if (!s) throw _i("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", o, e.status, e.statusText);
                    return r.reject(e)
                }
                a.totalPendingRequests++, C(o) && t.get(o) || (o = i.getTrustedResourceUrl(o));
                var l = n.defaults && n.defaults.transformResponse;
                return Wr(l) ? l = l.filter(function(e) {
                    return e !== St
                }) : l === St && (l = null), n.get(o, f({
                    cache: t,
                    transformResponse: l
                }, e))["finally"](function() {
                    a.totalPendingRequests--
                }).then(function(e) {
                    return t.put(o, e.data), e.data
                }, u)
            }
            return a.totalPendingRequests = 0, a
        }]
    }

    function On() {
        this.$get = ["$rootScope", "$browser", "$location", function(e, t, n) {
            var r = {};
            return r.findBindings = function(e, t, n) {
                var r = e.getElementsByClassName("ng-binding"),
                    i = [];
                return a(r, function(e) {
                    var r = Br.element(e).data("$binding");
                    r && a(r, function(r) {
                        if (n) {
                            var a = new RegExp("(^|\\s)" + Kr(t) + "(\\s|\\||$)");
                            a.test(r) && i.push(e)
                        } else -1 != r.indexOf(t) && i.push(e)
                    })
                }), i
            }, r.findModels = function(e, t, n) {
                for (var r = ["ng-", "data-ng-", "ng\\:"], i = 0; i < r.length; ++i) {
                    var a = n ? "=" : "*=",
                        o = "[" + r[i] + "model" + a + '"' + t + '"]',
                        s = e.querySelectorAll(o);
                    if (s.length) return s
                }
            }, r.getLocation = function() {
                return n.url()
            }, r.setLocation = function(t) {
                t !== n.url() && (n.url(t), e.$digest())
            }, r.whenStable = function(e) {
                t.notifyWhenNoOutstandingRequests(e)
            }, r
        }]
    }

    function Mn() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(e, t, n, r, i) {
            function a(a, s, u) {
                E(a) || (u = s, s = a, a = m);
                var l, c = z(arguments, 3),
                    f = b(u) && !u,
                    p = (f ? r : n).defer(),
                    d = p.promise;
                return l = t.defer(function() {
                    try {
                        p.resolve(a.apply(null, c))
                    } catch (t) {
                        p.reject(t), i(t)
                    } finally {
                        delete o[d.$$timeoutId]
                    }
                    f || e.$apply()
                }, s), d.$$timeoutId = l, o[l] = p, d
            }
            var o = {};
            return a.cancel = function(e) {
                return e && e.$$timeoutId in o ? (o[e.$$timeoutId].reject("canceled"), delete o[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1
            }, a
        }]
    }

    function Pn(e) {
        var t = e;
        return Nr && ($a.setAttribute("href", t), t = $a.href), $a.setAttribute("href", t), {
            href: $a.href,
            protocol: $a.protocol ? $a.protocol.replace(/:$/, "") : "",
            host: $a.host,
            search: $a.search ? $a.search.replace(/^\?/, "") : "",
            hash: $a.hash ? $a.hash.replace(/^#/, "") : "",
            hostname: $a.hostname,
            port: $a.port,
            pathname: "/" === $a.pathname.charAt(0) ? $a.pathname : "/" + $a.pathname
        }
    }

    function jn(e) {
        var t = C(e) ? Pn(e) : e;
        return t.protocol === ya.protocol && t.host === ya.host
    }

    function Nn() {
        this.$get = v(e)
    }

    function Ln(e) {
        function t(e) {
            try {
                return decodeURIComponent(e)
            } catch (t) {
                return e
            }
        }
        var n = e[0] || {},
            r = {},
            i = "";
        return function() {
            var e, a, o, s, u, l = n.cookie || "";
            if (l !== i)
                for (i = l, e = i.split("; "), r = {}, o = 0; o < e.length; o++) a = e[o], s = a.indexOf("="), s > 0 && (u = t(a.substring(0, s)), y(r[u]) && (r[u] = t(a.substring(s + 1))));
            return r
        }
    }

    function In() {
        this.$get = Ln
    }

    function Fn(e) {
        function t(r, i) {
            if (w(r)) {
                var o = {};
                return a(r, function(e, n) {
                    o[n] = t(n, e)
                }), o
            }
            return e.factory(r + n, i)
        }
        var n = "Filter";
        this.register = t, this.$get = ["$injector", function(e) {
            return function(t) {
                return e.get(t + n)
            }
        }], t("currency", Hn), t("date", rr), t("filter", qn), t("json", ir), t("limitTo", ar), t("lowercase", Ea), t("number", _n), t("orderBy", or), t("uppercase", Da)
    }

    function qn() {
        return function(e, t, n) {
            if (!i(e)) {
                if (null == e) return e;
                throw r("filter")("notarray", "Expected array but received: {0}", e)
            }
            var a, o, s = Un(t);
            switch (s) {
                case "function":
                    a = t;
                    break;
                case "boolean":
                case "null":
                case "number":
                case "string":
                    o = !0;
                case "object":
                    a = Vn(t, n, o);
                    break;
                default:
                    return e
            }
            return Array.prototype.filter.call(e, a)
        }
    }

    function Vn(e, t, n) {
        var r, i = w(e) && "$" in e;
        return t === !0 ? t = _ : E(t) || (t = function(e, t) {
            return y(e) ? !1 : null === e || null === t ? e === t : w(t) || w(e) && !$(e) ? !1 : (e = Or("" + e), t = Or("" + t), -1 !== e.indexOf(t))
        }), r = function(r) {
            return i && !w(r) ? Rn(r, e.$, t, !1) : Rn(r, e, t, n)
        }
    }

    function Rn(e, t, n, r, i) {
        var a = Un(e),
            o = Un(t);
        if ("string" === o && "!" === t.charAt(0)) return !Rn(e, t.substring(1), n, r);
        if (Wr(e)) return e.some(function(e) {
            return Rn(e, t, n, r)
        });
        switch (a) {
            case "object":
                var s;
                if (r) {
                    for (s in e)
                        if ("$" !== s.charAt(0) && Rn(e[s], t, n, !0)) return !0;
                    return i ? !1 : Rn(e, t, n, !1)
                }
                if ("object" === o) {
                    for (s in t) {
                        var u = t[s];
                        if (!E(u) && !y(u)) {
                            var l = "$" === s,
                                c = l ? e : e[s];
                            if (!Rn(c, u, n, l, l)) return !1
                        }
                    }
                    return !0
                }
                return n(e, t);
            case "function":
                return !1;
            default:
                return n(e, t)
        }
    }

    function Un(e) {
        return null === e ? "null" : typeof e
    }

    function Hn(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n, r) {
            return y(n) && (n = t.CURRENCY_SYM), y(r) && (r = t.PATTERNS[1].maxFrac), null == e ? e : Wn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, r).replace(/\u00A4/g, n)
        }
    }

    function _n(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n) {
            return null == e ? e : Wn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
        }
    }

    function Bn(e) {
        var t, n, r, i, a, o = 0;
        for ((n = e.indexOf(wa)) > -1 && (e = e.replace(wa, "")), (r = e.search(/e/i)) > 0 ? (0 > n && (n = r), n += +e.slice(r + 1), e = e.substring(0, r)) : 0 > n && (n = e.length), r = 0; e.charAt(r) == xa; r++);
        if (r == (a = e.length)) t = [0], n = 1;
        else {
            for (a--; e.charAt(a) == xa;) a--;
            for (n -= r, t = [], i = 0; a >= r; r++, i++) t[i] = +e.charAt(r)
        }
        return n > ba && (t = t.splice(0, ba - 1), o = n - 1, n = 1), {
            d: t,
            e: o,
            i: n
        }
    }

    function zn(e, t, n, r) {
        var i = e.d,
            a = i.length - e.i;
        t = y(t) ? Math.min(Math.max(n, a), r) : +t;
        var o = t + e.i,
            s = i[o];
        if (o > 0) i.splice(o);
        else {
            e.i = 1, i.length = o = t + 1;
            for (var u = 0; o > u; u++) i[u] = 0
        }
        for (s >= 5 && i[o - 1]++; t > a; a++) i.push(0);
        var l = i.reduceRight(function(e, t, n, r) {
            return t += e, r[n] = t % 10, Math.floor(t / 10)
        }, 0);
        l && (i.unshift(l), e.i++)
    }

    function Wn(e, t, n, r, i) {
        if (!C(e) && !k(e) || isNaN(e)) return "";
        var a, o = !isFinite(e),
            s = !1,
            u = Math.abs(e) + "",
            l = "";
        if (o) l = "∞";
        else {
            a = Bn(u), zn(a, i, t.minFrac, t.maxFrac);
            var c = a.d,
                f = a.i,
                p = a.e,
                d = [];
            for (s = c.reduce(function(e, t) {
                    return e && !t
                }, !0); 0 > f;) c.unshift(0), f++;
            f > 0 ? d = c.splice(f) : (d = c, c = [0]);
            var h = [];
            for (c.length > t.lgSize && h.unshift(c.splice(-t.lgSize).join("")); c.length > t.gSize;) h.unshift(c.splice(-t.gSize).join(""));
            c.length && h.unshift(c.join("")), l = h.join(n), d.length && (l += r + d.join("")), p && (l += "e+" + p)
        }
        return 0 > e && !s ? t.negPre + l + t.negSuf : t.posPre + l + t.posSuf
    }

    function Yn(e, t, n) {
        var r = "";
        for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;) e = xa + e;
        return n && (e = e.substr(e.length - t)), r + e
    }

    function Gn(e, t, n, r) {
        return n = n || 0,
            function(i) {
                var a = i["get" + e]();
                return (n > 0 || a > -n) && (a += n), 0 === a && -12 == n && (a = 12), Yn(a, t, r)
            }
    }

    function Kn(e, t) {
        return function(n, r) {
            var i = n["get" + e](),
                a = Mr(t ? "SHORT" + e : e);
            return r[a][i]
        }
    }

    function Xn(e, t, n) {
        var r = -1 * n,
            i = r >= 0 ? "+" : "";
        return i += Yn(Math[r > 0 ? "floor" : "ceil"](r / 60), 2) + Yn(Math.abs(r % 60), 2)
    }

    function Jn(e) {
        var t = new Date(e, 0, 1).getDay();
        return new Date(e, 0, (4 >= t ? 5 : 12) - t)
    }

    function Qn(e) {
        return new Date(e.getFullYear(), e.getMonth(), e.getDate() + (4 - e.getDay()))
    }

    function Zn(e) {
        return function(t) {
            var n = Jn(t.getFullYear()),
                r = Qn(t),
                i = +r - +n,
                a = 1 + Math.round(i / 6048e5);
            return Yn(a, e)
        }
    }

    function er(e, t) {
        return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
    }

    function tr(e, t) {
        return e.getFullYear() <= 0 ? t.ERAS[0] : t.ERAS[1]
    }

    function nr(e, t) {
        return e.getFullYear() <= 0 ? t.ERANAMES[0] : t.ERANAMES[1]
    }

    function rr(e) {
        function t(e) {
            var t;
            if (t = e.match(n)) {
                var r = new Date(0),
                    i = 0,
                    a = 0,
                    o = t[8] ? r.setUTCFullYear : r.setFullYear,
                    s = t[8] ? r.setUTCHours : r.setHours;
                t[9] && (i = d(t[9] + t[10]), a = d(t[9] + t[11])), o.call(r, d(t[1]), d(t[2]) - 1, d(t[3]));
                var u = d(t[4] || 0) - i,
                    l = d(t[5] || 0) - a,
                    c = d(t[6] || 0),
                    f = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
                return s.call(r, u, l, c, f), r
            }
            return e
        }
        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(n, r, i) {
            var o, s, u = "",
                l = [];
            if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, C(n) && (n = Sa.test(n) ? d(n) : t(n)), k(n) && (n = new Date(n)), !S(n) || !isFinite(n.getTime())) return n;
            for (; r;) s = ka.exec(r), s ? (l = B(l, s, 1), r = l.pop()) : (l.push(r), r = null);
            var c = n.getTimezoneOffset();
            return i && (c = X(i, c), n = Q(n, i, !0)), a(l, function(t) {
                o = Ca[t], u += o ? o(n, e.DATETIME_FORMATS, c) : "''" === t ? "'" : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), u
        }
    }

    function ir() {
        return function(e, t) {
            return y(t) && (t = 2), G(e, t)
        }
    }

    function ar() {
        return function(e, t, n) {
            return t = Math.abs(Number(t)) === 1 / 0 ? Number(t) : d(t), isNaN(t) ? e : (k(e) && (e = e.toString()), Wr(e) || C(e) ? (n = !n || isNaN(n) ? 0 : d(n), n = 0 > n ? Math.max(0, e.length + n) : n, t >= 0 ? e.slice(n, n + t) : 0 === n ? e.slice(t, e.length) : e.slice(Math.max(0, n + t), n)) : e)
        }
    }

    function or(e) {
        function t(t, n) {
            return n = n ? -1 : 1, t.map(function(t) {
                var r = 1,
                    i = g;
                if (E(t)) i = t;
                else if (C(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (r = "-" == t.charAt(0) ? -1 : 1, t = t.substring(1)), "" !== t && (i = e(t), i.constant))) {
                    var a = i();
                    i = function(e) {
                        return e[a]
                    }
                }
                return {
                    get: i,
                    descending: r * n
                }
            })
        }

        function n(e) {
            switch (typeof e) {
                case "number":
                case "boolean":
                case "string":
                    return !0;
                default:
                    return !1
            }
        }

        function a(e, t) {
            return "function" == typeof e.valueOf && (e = e.valueOf(), n(e)) ? e : $(e) && (e = e.toString(), n(e)) ? e : t
        }

        function o(e, t) {
            var n = typeof e;
            return null === e ? (n = "string", e = "null") : "string" === n ? e = e.toLowerCase() : "object" === n && (e = a(e, t)), {
                value: e,
                type: n
            }
        }

        function s(e, t) {
            var n = 0;
            return e.type === t.type ? e.value !== t.value && (n = e.value < t.value ? -1 : 1) : n = e.type < t.type ? -1 : 1, n
        }
        return function(e, n, a) {
            function u(e, t) {
                return {
                    value: e,
                    predicateValues: c.map(function(n) {
                        return o(n.get(e), t)
                    })
                }
            }

            function l(e, t) {
                for (var n = 0, r = 0, i = c.length; i > r && !(n = s(e.predicateValues[r], t.predicateValues[r]) * c[r].descending); ++r);
                return n
            }
            if (null == e) return e;
            if (!i(e)) throw r("orderBy")("notarray", "Expected array but received: {0}", e);
            Wr(n) || (n = [n]), 0 === n.length && (n = ["+"]);
            var c = t(n, a);
            c.push({
                get: function() {
                    return {}
                },
                descending: a ? -1 : 1
            });
            var f = Array.prototype.map.call(e, u);
            return f.sort(l), e = f.map(function(e) {
                return e.value
            })
        }
    }

    function sr(e) {
        return E(e) && (e = {
            link: e
        }), e.restrict = e.restrict || "AC", v(e)
    }

    function ur(e, t) {
        e.$name = t
    }

    function lr(e, t, r, i, o) {
        var s = this,
            u = [];
        s.$error = {}, s.$$success = {}, s.$pending = n, s.$name = o(t.name || t.ngForm || "")(r), s.$dirty = !1, s.$pristine = !0, s.$valid = !0, s.$invalid = !1, s.$submitted = !1, s.$$parentForm = Oa, s.$rollbackViewValue = function() {
            a(u, function(e) {
                e.$rollbackViewValue()
            })
        }, s.$commitViewValue = function() {
            a(u, function(e) {
                e.$commitViewValue()
            })
        }, s.$addControl = function(e) {
            he(e.$name, "input"), u.push(e), e.$name && (s[e.$name] = e), e.$$parentForm = s
        }, s.$$renameControl = function(e, t) {
            var n = e.$name;
            s[n] === e && delete s[n], s[t] = e, e.$name = t
        }, s.$removeControl = function(e) {
            e.$name && s[e.$name] === e && delete s[e.$name], a(s.$pending, function(t, n) {
                s.$setValidity(n, null, e)
            }), a(s.$error, function(t, n) {
                s.$setValidity(n, null, e)
            }), a(s.$$success, function(t, n) {
                s.$setValidity(n, null, e)
            }), R(u, e), e.$$parentForm = Oa
        }, kr({
            ctrl: this,
            $element: e,
            set: function(e, t, n) {
                var r = e[t];
                if (r) {
                    var i = r.indexOf(n); - 1 === i && r.push(n)
                } else e[t] = [n]
            },
            unset: function(e, t, n) {
                var r = e[t];
                r && (R(r, n), 0 === r.length && delete e[t])
            },
            $animate: i
        }), s.$setDirty = function() {
            i.removeClass(e, po), i.addClass(e, ho), s.$dirty = !0, s.$pristine = !1, s.$$parentForm.$setDirty()
        }, s.$setPristine = function() {
            i.setClass(e, po, ho + " " + Ma), s.$dirty = !1, s.$pristine = !0, s.$submitted = !1, a(u, function(e) {
                e.$setPristine()
            })
        }, s.$setUntouched = function() {
            a(u, function(e) {
                e.$setUntouched()
            })
        }, s.$setSubmitted = function() {
            i.addClass(e, Ma), s.$submitted = !0, s.$$parentForm.$setSubmitted()
        }
    }

    function cr(e) {
        e.$formatters.push(function(t) {
            return e.$isEmpty(t) ? t : t.toString()
        })
    }

    function fr(e, t, n, r, i, a) {
        pr(e, t, n, r, i, a), cr(r)
    }

    function pr(e, t, n, r, i, a) {
        var o = Or(t[0].type);
        if (!i.android) {
            var s = !1;
            t.on("compositionstart", function(e) {
                s = !0
            }), t.on("compositionend", function() {
                s = !1, u()
            })
        }
        var u = function(e) {
            if (l && (a.defer.cancel(l), l = null), !s) {
                var i = t.val(),
                    u = e && e.type;
                "password" === o || n.ngTrim && "false" === n.ngTrim || (i = Gr(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, u)
            }
        };
        if (i.hasEvent("input")) t.on("input", u);
        else {
            var l, c = function(e, t, n) {
                l || (l = a.defer(function() {
                    l = null, t && t.value === n || u(e)
                }))
            };
            t.on("keydown", function(e) {
                var t = e.keyCode;
                91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || c(e, this, this.value)
            }), i.hasEvent("paste") && t.on("paste cut", c)
        }
        t.on("change", u), r.$render = function() {
            var e = r.$isEmpty(r.$viewValue) ? "" : r.$viewValue;
            t.val() !== e && t.val(e)
        }
    }

    function dr(e, t) {
        if (S(e)) return e;
        if (C(e)) {
            Ua.lastIndex = 0;
            var n = Ua.exec(e);
            if (n) {
                var r = +n[1],
                    i = +n[2],
                    a = 0,
                    o = 0,
                    s = 0,
                    u = 0,
                    l = Jn(r),
                    c = 7 * (i - 1);
                return t && (a = t.getHours(), o = t.getMinutes(), s = t.getSeconds(), u = t.getMilliseconds()), new Date(r, 0, l.getDate() + c, a, o, s, u)
            }
        }
        return NaN
    }

    function hr(e, t) {
        return function(n, r) {
            var i, o;
            if (S(n)) return n;
            if (C(n)) {
                if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), La.test(n)) return new Date(n);
                if (e.lastIndex = 0, i = e.exec(n)) return i.shift(), o = r ? {
                    yyyy: r.getFullYear(),
                    MM: r.getMonth() + 1,
                    dd: r.getDate(),
                    HH: r.getHours(),
                    mm: r.getMinutes(),
                    ss: r.getSeconds(),
                    sss: r.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, a(i, function(e, n) {
                    n < t.length && (o[t[n]] = +e)
                }), new Date(o.yyyy, o.MM - 1, o.dd, o.HH, o.mm, o.ss || 0, 1e3 * o.sss || 0)
            }
            return NaN
        }
    }

    function mr(e, t, r, i) {
        return function(a, o, s, u, l, c, f) {
            function p(e) {
                return e && !(e.getTime && e.getTime() !== e.getTime())
            }

            function d(e) {
                return b(e) && !S(e) ? r(e) || n : e
            }
            gr(a, o, s, u), pr(a, o, s, u, l, c);
            var h, m = u && u.$options && u.$options.timezone;
            if (u.$$parserName = e, u.$parsers.push(function(e) {
                    if (u.$isEmpty(e)) return null;
                    if (t.test(e)) {
                        var i = r(e, h);
                        return m && (i = Q(i, m)), i
                    }
                    return n
                }), u.$formatters.push(function(e) {
                    if (e && !S(e)) throw bo("datefmt", "Expected `{0}` to be a date", e);
                    return p(e) ? (h = e, h && m && (h = Q(h, m, !0)), f("date")(e, i, m)) : (h = null, "")
                }), b(s.min) || s.ngMin) {
                var g;
                u.$validators.min = function(e) {
                    return !p(e) || y(g) || r(e) >= g
                }, s.$observe("min", function(e) {
                    g = d(e), u.$validate()
                })
            }
            if (b(s.max) || s.ngMax) {
                var v;
                u.$validators.max = function(e) {
                    return !p(e) || y(v) || r(e) <= v
                }, s.$observe("max", function(e) {
                    v = d(e), u.$validate()
                })
            }
        }
    }

    function gr(e, t, r, i) {
        var a = t[0],
            o = i.$$hasNativeValidators = w(a.validity);
        o && i.$parsers.push(function(e) {
            var r = t.prop(Tr) || {};
            return r.badInput || r.typeMismatch ? n : e
        })
    }

    function vr(e, t, r, i, a, o) {
        if (gr(e, t, r, i), pr(e, t, r, i, a, o), i.$$parserName = "number", i.$parsers.push(function(e) {
                return i.$isEmpty(e) ? null : qa.test(e) ? parseFloat(e) : n
            }), i.$formatters.push(function(e) {
                if (!i.$isEmpty(e)) {
                    if (!k(e)) throw bo("numfmt", "Expected `{0}` to be a number", e);
                    e = e.toString()
                }
                return e
            }), b(r.min) || r.ngMin) {
            var s;
            i.$validators.min = function(e) {
                return i.$isEmpty(e) || y(s) || e >= s
            }, r.$observe("min", function(e) {
                b(e) && !k(e) && (e = parseFloat(e, 10)), s = k(e) && !isNaN(e) ? e : n, i.$validate()
            })
        }
        if (b(r.max) || r.ngMax) {
            var u;
            i.$validators.max = function(e) {
                return i.$isEmpty(e) || y(u) || u >= e
            }, r.$observe("max", function(e) {
                b(e) && !k(e) && (e = parseFloat(e, 10)), u = k(e) && !isNaN(e) ? e : n, i.$validate()
            })
        }
    }

    function $r(e, t, n, r, i, a) {
        pr(e, t, n, r, i, a), cr(r), r.$$parserName = "url", r.$validators.url = function(e, t) {
            var n = e || t;
            return r.$isEmpty(n) || Ia.test(n)
        }
    }

    function yr(e, t, n, r, i, a) {
        pr(e, t, n, r, i, a), cr(r), r.$$parserName = "email", r.$validators.email = function(e, t) {
            var n = e || t;
            return r.$isEmpty(n) || Fa.test(n)
        }
    }

    function br(e, t, n, r) {
        y(n.name) && t.attr("name", u());
        var i = function(e) {
            t[0].checked && r.$setViewValue(n.value, e && e.type)
        };
        t.on("click", i), r.$render = function() {
            var e = n.value;
            t[0].checked = e == r.$viewValue
        }, n.$observe("value", r.$render)
    }

    function wr(e, t, n, r, i) {
        var a;
        if (b(r)) {
            if (a = e(r), !a.constant) throw bo("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, r);
            return a(t)
        }
        return i
    }

    function xr(e, t, n, r, i, a, o, s) {
        var u = wr(s, e, "ngTrueValue", n.ngTrueValue, !0),
            l = wr(s, e, "ngFalseValue", n.ngFalseValue, !1),
            c = function(e) {
                r.$setViewValue(t[0].checked, e && e.type)
            };
        t.on("click", c), r.$render = function() {
            t[0].checked = r.$viewValue
        }, r.$isEmpty = function(e) {
            return e === !1
        }, r.$formatters.push(function(e) {
            return _(e, u)
        }), r.$parsers.push(function(e) {
            return e ? u : l
        })
    }

    function Cr(e, t) {
        return e = "ngClass" + e, ["$animate", function(n) {
            function r(e, t) {
                var n = [];
                e: for (var r = 0; r < e.length; r++) {
                    for (var i = e[r], a = 0; a < t.length; a++)
                        if (i == t[a]) continue e;
                    n.push(i)
                }
                return n
            }

            function i(e) {
                var t = [];
                return Wr(e) ? (a(e, function(e) {
                    t = t.concat(i(e))
                }), t) : C(e) ? e.split(" ") : w(e) ? (a(e, function(e, n) {
                    e && (t = t.concat(n.split(" ")))
                }), t) : e
            }
            return {
                restrict: "AC",
                link: function(o, s, u) {
                    function l(e) {
                        var t = f(e, 1);
                        u.$addClass(t)
                    }

                    function c(e) {
                        var t = f(e, -1);
                        u.$removeClass(t)
                    }

                    function f(e, t) {
                        var n = s.data("$classCounts") || ve(),
                            r = [];
                        return a(e, function(e) {
                            (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] === +(t > 0) && r.push(e))
                        }), s.data("$classCounts", n), r.join(" ")
                    }

                    function p(e, t) {
                        var i = r(t, e),
                            a = r(e, t);
                        i = f(i, 1), a = f(a, -1), i && i.length && n.addClass(s, i), a && a.length && n.removeClass(s, a)
                    }

                    function d(e) {
                        if (t === !0 || o.$index % 2 === t) {
                            var n = i(e || []);
                            if (h) {
                                if (!_(e, h)) {
                                    var r = i(h);
                                    p(r, n)
                                }
                            } else l(n)
                        }
                        h = H(e)
                    }
                    var h;
                    o.$watch(u[e], d, !0), u.$observe("class", function(t) {
                        d(o.$eval(u[e]))
                    }), "ngClass" !== e && o.$watch("$index", function(n, r) {
                        var a = 1 & n;
                        if (a !== (1 & r)) {
                            var s = i(o.$eval(u[e]));
                            a === t ? l(s) : c(s)
                        }
                    })
                }
            }
        }]
    }

    function kr(e) {
        function t(e, t, u) {
            y(t) ? r("$pending", e, u) : i("$pending", e, u), j(t) ? t ? (f(s.$error, e, u), c(s.$$success, e, u)) : (c(s.$error, e, u), f(s.$$success, e, u)) : (f(s.$error, e, u), f(s.$$success, e, u)), s.$pending ? (a(vo, !0), s.$valid = s.$invalid = n, o("", null)) : (a(vo, !1), s.$valid = Sr(s.$error), s.$invalid = !s.$valid, o("", s.$valid));
            var l;
            l = s.$pending && s.$pending[e] ? n : s.$error[e] ? !1 : s.$$success[e] ? !0 : null, o(e, l), s.$$parentForm.$setValidity(e, l, s)
        }

        function r(e, t, n) {
            s[e] || (s[e] = {}), c(s[e], t, n)
        }

        function i(e, t, r) {
            s[e] && f(s[e], t, r), Sr(s[e]) && (s[e] = n)
        }

        function a(e, t) {
            t && !l[e] ? (p.addClass(u, e), l[e] = !0) : !t && l[e] && (p.removeClass(u, e), l[e] = !1)
        }

        function o(e, t) {
            e = e ? "-" + ce(e, "-") : "", a(co + e, t === !0), a(fo + e, t === !1)
        }
        var s = e.ctrl,
            u = e.$element,
            l = {},
            c = e.set,
            f = e.unset,
            p = e.$animate;
        l[fo] = !(l[co] = u.hasClass(co)), s.$setValidity = t
    }

    function Sr(e) {
        if (e)
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function Er(e) {
        e[0].hasAttribute("selected") && (e[0].selected = !0)
    }
    var Dr = /^\/(.+)\/([a-z]*)$/,
        Tr = "validity",
        Ar = Object.prototype.hasOwnProperty,
        Or = function(e) {
            return C(e) ? e.toLowerCase() : e
        },
        Mr = function(e) {
            return C(e) ? e.toUpperCase() : e
        },
        Pr = function(e) {
            return C(e) ? e.replace(/[A-Z]/g, function(e) {
                return String.fromCharCode(32 | e.charCodeAt(0))
            }) : e
        },
        jr = function(e) {
            return C(e) ? e.replace(/[a-z]/g, function(e) {
                return String.fromCharCode(-33 & e.charCodeAt(0))
            }) : e
        };
    "i" !== "I".toLowerCase() && (Or = Pr, Mr = jr);
    var Nr, Lr, Ir, Fr, qr = [].slice,
        Vr = [].splice,
        Rr = [].push,
        Ur = Object.prototype.toString,
        Hr = Object.getPrototypeOf,
        _r = r("ng"),
        Br = e.angular || (e.angular = {}),
        zr = 0;
    Nr = t.documentMode, m.$inject = [], g.$inject = [];
    var Wr = Array.isArray,
        Yr = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
        Gr = function(e) {
            return C(e) ? e.trim() : e
        },
        Kr = function(e) {
            return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
        },
        Xr = function() {
            function e() {
                try {
                    return new Function(""), !1
                } catch (e) {
                    return !0
                }
            }
            if (!b(Xr.rules)) {
                var n = t.querySelector("[ng-csp]") || t.querySelector("[data-ng-csp]");
                if (n) {
                    var r = n.getAttribute("ng-csp") || n.getAttribute("data-ng-csp");
                    Xr.rules = {
                        noUnsafeEval: !r || -1 !== r.indexOf("no-unsafe-eval"),
                        noInlineStyle: !r || -1 !== r.indexOf("no-inline-style")
                    }
                } else Xr.rules = {
                    noUnsafeEval: e(),
                    noInlineStyle: !1
                }
            }
            return Xr.rules
        },
        Jr = function() {
            if (b(Jr.name_)) return Jr.name_;
            var e, n, r, i, a = Zr.length;
            for (n = 0; a > n; ++n)
                if (r = Zr[n], e = t.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
                    i = e.getAttribute(r + "jq");
                    break
                }
            return Jr.name_ = i
        },
        Qr = /:/g,
        Zr = ["ng-", "data-ng-", "ng:", "x-ng-"],
        ei = /[A-Z]/g,
        ti = !1,
        ni = 1,
        ri = 2,
        ii = 3,
        ai = 8,
        oi = 9,
        si = 11,
        ui = {
            full: "1.5.0",
            major: 1,
            minor: 5,
            dot: 0,
            codeName: "ennoblement-facilitation"
        };
    Me.expando = "ng339";
    var li = Me.cache = {},
        ci = 1,
        fi = function(e, t, n) {
            e.addEventListener(t, n, !1)
        },
        pi = function(e, t, n) {
            e.removeEventListener(t, n, !1)
        };
    Me._data = function(e) {
        return this.cache[e[this.expando]] || {}
    };
    var di = /([\:\-\_]+(.))/g,
        hi = /^moz([A-Z])/,
        mi = {
            mouseleave: "mouseout",
            mouseenter: "mouseover"
        },
        gi = r("jqLite"),
        vi = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        $i = /<|&#?\w+;/,
        yi = /<([\w:-]+)/,
        bi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        wi = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    wi.optgroup = wi.option, wi.tbody = wi.tfoot = wi.colgroup = wi.caption = wi.thead, wi.th = wi.td;
    var xi = Node.prototype.contains || function(e) {
            return !!(16 & this.compareDocumentPosition(e))
        },
        Ci = Me.prototype = {
            ready: function(n) {
                function r() {
                    i || (i = !0, n())
                }
                var i = !1;
                "complete" === t.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), Me(e).on("load", r))
            },
            toString: function() {
                var e = [];
                return a(this, function(t) {
                    e.push("" + t)
                }), "[" + e.join(", ") + "]"
            },
            eq: function(e) {
                return Lr(e >= 0 ? this[e] : this[this.length + e])
            },
            length: 0,
            push: Rr,
            sort: [].sort,
            splice: [].splice
        },
        ki = {};
    a("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(e) {
        ki[Or(e)] = e
    });
    var Si = {};
    a("input,select,option,textarea,button,form,details".split(","), function(e) {
        Si[e] = !0
    });
    var Ei = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    a({
        data: Fe,
        removeData: Le,
        hasData: Ee,
        cleanData: De
    }, function(e, t) {
        Me[t] = e
    }), a({
        data: Fe,
        inheritedData: _e,
        scope: function(e) {
            return Lr.data(e, "$scope") || _e(e.parentNode || e, ["$isolateScope", "$scope"])
        },
        isolateScope: function(e) {
            return Lr.data(e, "$isolateScope") || Lr.data(e, "$isolateScopeNoTemplate")
        },
        controller: He,
        injector: function(e) {
            return _e(e, "$injector")
        },
        removeAttr: function(e, t) {
            e.removeAttribute(t)
        },
        hasClass: qe,
        css: function(e, t, n) {
            return t = Ce(t), b(n) ? void(e.style[t] = n) : e.style[t]
        },
        attr: function(e, t, r) {
            var i = e.nodeType;
            if (i !== ii && i !== ri && i !== ai) {
                var a = Or(t);
                if (ki[a]) {
                    if (!b(r)) return e[t] || (e.attributes.getNamedItem(t) || m).specified ? a : n;
                    r ? (e[t] = !0, e.setAttribute(t, a)) : (e[t] = !1, e.removeAttribute(a))
                } else if (b(r)) e.setAttribute(t, r);
                else if (e.getAttribute) {
                    var o = e.getAttribute(t, 2);
                    return null === o ? n : o
                }
            }
        },
        prop: function(e, t, n) {
            return b(n) ? void(e[t] = n) : e[t]
        },
        text: function() {
            function e(e, t) {
                if (y(t)) {
                    var n = e.nodeType;
                    return n === ni || n === ii ? e.textContent : ""
                }
                e.textContent = t
            }
            return e.$dv = "", e
        }(),
        val: function(e, t) {
            if (y(t)) {
                if (e.multiple && "select" === V(e)) {
                    var n = [];
                    return a(e.options, function(e) {
                        e.selected && n.push(e.value || e.text)
                    }), 0 === n.length ? null : n
                }
                return e.value
            }
            e.value = t
        },
        html: function(e, t) {
            return y(t) ? e.innerHTML : (je(e, !0), void(e.innerHTML = t))
        },
        empty: Be
    }, function(e, t) {
        Me.prototype[t] = function(t, n) {
            var r, i, a = this.length;
            if (e !== Be && y(2 == e.length && e !== qe && e !== He ? t : n)) {
                if (w(t)) {
                    for (r = 0; a > r; r++)
                        if (e === Fe) e(this[r], t);
                        else
                            for (i in t) e(this[r], i, t[i]);
                    return this
                }
                for (var o = e.$dv, s = y(o) ? Math.min(a, 1) : a, u = 0; s > u; u++) {
                    var l = e(this[u], t, n);
                    o = o ? o + l : l
                }
                return o
            }
            for (r = 0; a > r; r++) e(this[r], t, n);
            return this
        }
    }), a({
        removeData: Le,
        on: function(e, t, r, i) {
            if (b(i)) throw gi("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (Se(e)) {
                var a = Ie(e, !0),
                    o = a.events,
                    s = a.handle;
                s || (s = a.handle = Ke(e, o));
                for (var u = t.indexOf(" ") >= 0 ? t.split(" ") : [t], l = u.length, c = function(t, n, i) {
                        var a = o[t];
                        a || (a = o[t] = [], a.specialHandlerWrapper = n, "$destroy" === t || i || fi(e, t, s)), a.push(r)
                    }; l--;) t = u[l], mi[t] ? (c(mi[t], Je), c(t, n, !0)) : c(t)
            }
        },
        off: Ne,
        one: function(e, t, n) {
            e = Lr(e), e.on(t, function r() {
                e.off(t, n), e.off(t, r)
            }), e.on(t, n)
        },
        replaceWith: function(e, t) {
            var n, r = e.parentNode;
            je(e), a(new Me(t), function(t) {
                n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e), n = t
            })
        },
        children: function(e) {
            var t = [];
            return a(e.childNodes, function(e) {
                e.nodeType === ni && t.push(e)
            }), t
        },
        contents: function(e) {
            return e.contentDocument || e.childNodes || []
        },
        append: function(e, t) {
            var n = e.nodeType;
            if (n === ni || n === si) {
                t = new Me(t);
                for (var r = 0, i = t.length; i > r; r++) {
                    var a = t[r];
                    e.appendChild(a)
                }
            }
        },
        prepend: function(e, t) {
            if (e.nodeType === ni) {
                var n = e.firstChild;
                a(new Me(t), function(t) {
                    e.insertBefore(t, n)
                })
            }
        },
        wrap: function(e, t) {
            Oe(e, Lr(t).eq(0).clone()[0])
        },
        remove: ze,
        detach: function(e) {
            ze(e, !0)
        },
        after: function(e, t) {
            var n = e,
                r = e.parentNode;
            t = new Me(t);
            for (var i = 0, a = t.length; a > i; i++) {
                var o = t[i];
                r.insertBefore(o, n.nextSibling), n = o
            }
        },
        addClass: Re,
        removeClass: Ve,
        toggleClass: function(e, t, n) {
            t && a(t.split(" "), function(t) {
                var r = n;
                y(r) && (r = !qe(e, t)), (r ? Re : Ve)(e, t)
            })
        },
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== si ? t : null
        },
        next: function(e) {
            return e.nextElementSibling
        },
        find: function(e, t) {
            return e.getElementsByTagName ? e.getElementsByTagName(t) : []
        },
        clone: Pe,
        triggerHandler: function(e, t, n) {
            var r, i, o, s = t.type || t,
                u = Ie(e),
                l = u && u.events,
                c = l && l[s];
            c && (r = {
                preventDefault: function() {
                    this.defaultPrevented = !0
                },
                isDefaultPrevented: function() {
                    return this.defaultPrevented === !0
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0
                },
                isImmediatePropagationStopped: function() {
                    return this.immediatePropagationStopped === !0
                },
                stopPropagation: m,
                type: s,
                target: e
            }, t.type && (r = f(r, t)), i = H(c), o = n ? [r].concat(n) : [r], a(i, function(t) {
                r.isImmediatePropagationStopped() || t.apply(e, o)
            }))
        }
    }, function(e, t) {
        Me.prototype[t] = function(t, n, r) {
            for (var i, a = 0, o = this.length; o > a; a++) y(i) ? (i = e(this[a], t, n, r), b(i) && (i = Lr(i))) : Ue(i, e(this[a], t, n, r));
            return b(i) ? i : this
        }, Me.prototype.bind = Me.prototype.on, Me.prototype.unbind = Me.prototype.off
    }), et.prototype = {
        put: function(e, t) {
            this[Ze(e, this.nextUid)] = t
        },
        get: function(e) {
            return this[Ze(e, this.nextUid)]
        },
        remove: function(e) {
            var t = this[e = Ze(e, this.nextUid)];
            return delete this[e], t
        }
    };
    var Di = [function() {
            this.$get = [function() {
                return et
            }]
        }],
        Ti = /^([^\(]+?)=>/,
        Ai = /^[^\(]*\(\s*([^\)]*)\)/m,
        Oi = /,/,
        Mi = /^\s*(_?)(\S+?)\1\s*$/,
        Pi = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        ji = r("$injector");
    it.$$annotate = rt;
    var Ni = r("$animate"),
        Li = 1,
        Ii = "ng-animate",
        Fi = function() {
            this.$get = function() {}
        },
        qi = function() {
            var e = new et,
                t = [];
            this.$get = ["$$AnimateRunner", "$rootScope", function(n, r) {
                function i(e, t, n) {
                    var r = !1;
                    return t && (t = C(t) ? t.split(" ") : Wr(t) ? t : [], a(t, function(t) {
                        t && (r = !0, e[t] = n)
                    })), r
                }

                function o() {
                    a(t, function(t) {
                        var n = e.get(t);
                        if (n) {
                            var r = ut(t.attr("class")),
                                i = "",
                                o = "";
                            a(n, function(e, t) {
                                var n = !!r[t];
                                e !== n && (e ? i += (i.length ? " " : "") + t : o += (o.length ? " " : "") + t)
                            }), a(t, function(e) {
                                i && Re(e, i), o && Ve(e, o)
                            }), e.remove(t)
                        }
                    }), t.length = 0
                }

                function s(n, a, s) {
                    var u = e.get(n) || {},
                        l = i(u, a, !0),
                        c = i(u, s, !1);
                    (l || c) && (e.put(n, u), t.push(n), 1 === t.length && r.$$postDigest(o))
                }
                return {
                    enabled: m,
                    on: m,
                    off: m,
                    pin: m,
                    push: function(e, t, r, i) {
                        i && i(), r = r || {}, r.from && e.css(r.from), r.to && e.css(r.to), (r.addClass || r.removeClass) && s(e, r.addClass, r.removeClass);
                        var a = new n;
                        return a.complete(), a
                    }
                }
            }]
        },
        Vi = ["$provide", function(e) {
            var t = this;
            this.$$registeredAnimations = Object.create(null), this.register = function(n, r) {
                if (n && "." !== n.charAt(0)) throw Ni("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
                var i = n + "-animation";
                t.$$registeredAnimations[n.substr(1)] = i, e.factory(i, r)
            }, this.classNameFilter = function(e) {
                if (1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null, this.$$classNameFilter)) {
                    var t = new RegExp("(\\s+|\\/)" + Ii + "(\\s+|\\/)");
                    if (t.test(this.$$classNameFilter.toString())) throw Ni("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', Ii)
                }
                return this.$$classNameFilter
            }, this.$get = ["$$animateQueue", function(e) {
                function t(e, t, n) {
                    if (n) {
                        var r = st(n);
                        !r || r.parentNode || r.previousElementSibling || (n = null)
                    }
                    n ? n.after(e) : t.prepend(e)
                }
                return {
                    on: e.on,
                    off: e.off,
                    pin: e.pin,
                    enabled: e.enabled,
                    cancel: function(e) {
                        e.end && e.end()
                    },
                    enter: function(n, r, i, a) {
                        return r = r && Lr(r), i = i && Lr(i), r = r || i.parent(), t(n, r, i), e.push(n, "enter", lt(a))
                    },
                    move: function(n, r, i, a) {
                        return r = r && Lr(r), i = i && Lr(i), r = r || i.parent(), t(n, r, i), e.push(n, "move", lt(a))
                    },
                    leave: function(t, n) {
                        return e.push(t, "leave", lt(n), function() {
                            t.remove()
                        })
                    },
                    addClass: function(t, n, r) {
                        return r = lt(r), r.addClass = ot(r.addclass, n), e.push(t, "addClass", r)
                    },
                    removeClass: function(t, n, r) {
                        return r = lt(r), r.removeClass = ot(r.removeClass, n), e.push(t, "removeClass", r)
                    },
                    setClass: function(t, n, r, i) {
                        return i = lt(i), i.addClass = ot(i.addClass, n), i.removeClass = ot(i.removeClass, r), e.push(t, "setClass", i)
                    },
                    animate: function(t, n, r, i, a) {
                        return a = lt(a), a.from = a.from ? f(a.from, n) : n, a.to = a.to ? f(a.to, r) : r, i = i || "ng-inline-animate", a.tempClasses = ot(a.tempClasses, i), e.push(t, "animate", a)
                    }
                }
            }]
        }],
        Ri = function() {
            this.$get = ["$$rAF", function(e) {
                function t(t) {
                    n.push(t), n.length > 1 || e(function() {
                        for (var e = 0; e < n.length; e++) n[e]();
                        n = []
                    })
                }
                var n = [];
                return function() {
                    var e = !1;
                    return t(function() {
                            e = !0
                        }),
                        function(n) {
                            e ? n() : t(n)
                        }
                }
            }]
        },
        Ui = function() {
            this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function(e, t, n, r, i) {
                function o(e) {
                    this.setHost(e);
                    var t = n(),
                        a = function(e) {
                            i(e, 0, !1)
                        };
                    this._doneCallbacks = [], this._tick = function(e) {
                        var n = r[0];
                        n && n.hidden ? a(e) : t(e)
                    }, this._state = 0
                }
                var s = 0,
                    u = 1,
                    l = 2;
                return o.chain = function(e, t) {
                    function n() {
                        return r === e.length ? void t(!0) : void e[r](function(e) {
                            return e === !1 ? void t(!1) : (r++, void n())
                        })
                    }
                    var r = 0;
                    n()
                }, o.all = function(e, t) {
                    function n(n) {
                        i = i && n, ++r === e.length && t(i)
                    }
                    var r = 0,
                        i = !0;
                    a(e, function(e) {
                        e.done(n)
                    })
                }, o.prototype = {
                    setHost: function(e) {
                        this.host = e || {}
                    },
                    done: function(e) {
                        this._state === l ? e() : this._doneCallbacks.push(e)
                    },
                    progress: m,
                    getPromise: function() {
                        if (!this.promise) {
                            var t = this;
                            this.promise = e(function(e, n) {
                                t.done(function(t) {
                                    t === !1 ? n() : e()
                                })
                            })
                        }
                        return this.promise
                    },
                    then: function(e, t) {
                        return this.getPromise().then(e, t)
                    },
                    "catch": function(e) {
                        return this.getPromise()["catch"](e)
                    },
                    "finally": function(e) {
                        return this.getPromise()["finally"](e)
                    },
                    pause: function() {
                        this.host.pause && this.host.pause()
                    },
                    resume: function() {
                        this.host.resume && this.host.resume()
                    },
                    end: function() {
                        this.host.end && this.host.end(), this._resolve(!0)
                    },
                    cancel: function() {
                        this.host.cancel && this.host.cancel(), this._resolve(!1)
                    },
                    complete: function(e) {
                        var t = this;
                        t._state === s && (t._state = u, t._tick(function() {
                            t._resolve(e)
                        }))
                    },
                    _resolve: function(e) {
                        this._state !== l && (a(this._doneCallbacks, function(t) {
                            t(e)
                        }), this._doneCallbacks.length = 0, this._state = l)
                    }
                }, o
            }]
        },
        Hi = function() {
            this.$get = ["$$rAF", "$q", "$$AnimateRunner", function(e, t, n) {
                return function(t, r) {
                    function i() {
                        return e(function() {
                            a(), s || u.complete(), s = !0
                        }), u
                    }

                    function a() {
                        o.addClass && (t.addClass(o.addClass), o.addClass = null), o.removeClass && (t.removeClass(o.removeClass), o.removeClass = null), o.to && (t.css(o.to), o.to = null)
                    }
                    var o = r || {};
                    o.$$prepared || (o = U(o)), o.cleanupStyles && (o.from = o.to = null), o.from && (t.css(o.from), o.from = null);
                    var s, u = new n;
                    return {
                        start: i,
                        end: i
                    }
                }
            }]
        },
        _i = r("$compile");
    ht.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Bi = /^((?:x|data)[\:\-_])/i,
        zi = r("$controller"),
        Wi = /^(\S+)(\s+as\s+([\w$]+))?$/,
        Yi = function() {
            this.$get = ["$document", function(e) {
                return function(t) {
                    return t ? !t.nodeType && t instanceof Lr && (t = t[0]) : t = e[0].body, t.offsetWidth + 1
                }
            }]
        },
        Gi = "application/json",
        Ki = {
            "Content-Type": Gi + ";charset=utf-8"
        },
        Xi = /^\[|^\{(?!\{)/,
        Ji = {
            "[": /]$/,
            "{": /}$/
        },
        Qi = /^\)\]\}',?\n/,
        Zi = r("$http"),
        ea = function(e) {
            return function() {
                throw Zi("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", e)
            }
        },
        ta = Br.$interpolateMinErr = r("$interpolate");
    ta.throwNoconcat = function(e) {
        throw ta("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", e)
    }, ta.interr = function(e, t) {
        return ta("interr", "Can't interpolate: {0}\n{1}", e, t.toString())
    };
    var na = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        ra = {
            http: 80,
            https: 443,
            ftp: 21
        },
        ia = r("$location"),
        aa = {
            $$html5: !1,
            $$replace: !1,
            absUrl: Gt("$$absUrl"),
            url: function(e) {
                if (y(e)) return this.$$url;
                var t = na.exec(e);
                return (t[1] || "" === e) && this.path(decodeURIComponent(t[1])), (t[2] || t[1] || "" === e) && this.search(t[3] || ""), this.hash(t[5] || ""), this
            },
            protocol: Gt("$$protocol"),
            host: Gt("$$host"),
            port: Gt("$$port"),
            path: Kt("$$path", function(e) {
                return e = null !== e ? e.toString() : "", "/" == e.charAt(0) ? e : "/" + e
            }),
            search: function(e, t) {
                switch (arguments.length) {
                    case 0:
                        return this.$$search;
                    case 1:
                        if (C(e) || k(e)) e = e.toString(), this.$$search = te(e);
                        else {
                            if (!w(e)) throw ia("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                            e = U(e, {}), a(e, function(t, n) {
                                null == t && delete e[n]
                            }), this.$$search = e
                        }
                        break;
                    default:
                        y(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t
                }
                return this.$$compose(), this
            },
            hash: Kt("$$hash", function(e) {
                return null !== e ? e.toString() : ""
            }),
            replace: function() {
                return this.$$replace = !0, this
            }
        };
    a([Yt, Wt, zt], function(e) {
        e.prototype = Object.create(aa), e.prototype.state = function(t) {
            if (!arguments.length) return this.$$state;
            if (e !== zt || !this.$$html5) throw ia("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = y(t) ? null : t, this
        }
    });
    var oa = r("$parse"),
        sa = Function.prototype.call,
        ua = Function.prototype.apply,
        la = Function.prototype.bind,
        ca = ve();
    a("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(e) {
        ca[e] = !0
    });
    var fa = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        pa = function(e) {
            this.options = e
        };
    pa.prototype = {
        constructor: pa,
        lex: function(e) {
            for (this.text = e, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                var t = this.text.charAt(this.index);
                if ('"' === t || "'" === t) this.readString(t);
                else if (this.isNumber(t) || "." === t && this.isNumber(this.peek())) this.readNumber();
                else if (this.isIdent(t)) this.readIdent();
                else if (this.is(t, "(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: t
                }), this.index++;
                else if (this.isWhitespace(t)) this.index++;
                else {
                    var n = t + this.peek(),
                        r = n + this.peek(2),
                        i = ca[t],
                        a = ca[n],
                        o = ca[r];
                    if (i || a || o) {
                        var s = o ? r : a ? n : t;
                        this.tokens.push({
                            index: this.index,
                            text: s,
                            operator: !0
                        }), this.index += s.length
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
            }
            return this.tokens
        },
        is: function(e, t) {
            return -1 !== t.indexOf(e)
        },
        peek: function(e) {
            var t = e || 1;
            return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
        },
        isNumber: function(e) {
            return e >= "0" && "9" >= e && "string" == typeof e
        },
        isWhitespace: function(e) {
            return " " === e || "\r" === e || "	" === e || "\n" === e || "" === e || " " === e
        },
        isIdent: function(e) {
            return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
        },
        isExpOperator: function(e) {
            return "-" === e || "+" === e || this.isNumber(e)
        },
        throwError: function(e, t, n) {
            n = n || this.index;
            var r = b(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
            throw oa("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
        },
        readNumber: function() {
            for (var e = "", t = this.index; this.index < this.text.length;) {
                var n = Or(this.text.charAt(this.index));
                if ("." == n || this.isNumber(n)) e += n;
                else {
                    var r = this.peek();
                    if ("e" == n && this.isExpOperator(r)) e += n;
                    else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1)) e += n;
                    else {
                        if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1)) break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            this.tokens.push({
                index: t,
                text: e,
                constant: !0,
                value: Number(e)
            })
        },
        readIdent: function() {
            for (var e = this.index; this.index < this.text.length;) {
                var t = this.text.charAt(this.index);
                if (!this.isIdent(t) && !this.isNumber(t)) break;
                this.index++
            }
            this.tokens.push({
                index: e,
                text: this.text.slice(e, this.index),
                identifier: !0
            })
        },
        readString: function(e) {
            var t = this.index;
            this.index++;
            for (var n = "", r = e, i = !1; this.index < this.text.length;) {
                var a = this.text.charAt(this.index);
                if (r += a, i) {
                    if ("u" === a) {
                        var o = this.text.substring(this.index + 1, this.index + 5);
                        o.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + o + "]"), this.index += 4, n += String.fromCharCode(parseInt(o, 16))
                    } else {
                        var s = fa[a];
                        n += s || a
                    }
                    i = !1
                } else if ("\\" === a) i = !0;
                else {
                    if (a === e) return this.index++, void this.tokens.push({
                        index: t,
                        text: r,
                        constant: !0,
                        value: n
                    });
                    n += a
                }
                this.index++
            }
            this.throwError("Unterminated quote", t)
        }
    };
    var da = function(e, t) {
        this.lexer = e, this.options = t
    };
    da.Program = "Program", da.ExpressionStatement = "ExpressionStatement", da.AssignmentExpression = "AssignmentExpression", da.ConditionalExpression = "ConditionalExpression", da.LogicalExpression = "LogicalExpression", da.BinaryExpression = "BinaryExpression", da.UnaryExpression = "UnaryExpression", da.CallExpression = "CallExpression", da.MemberExpression = "MemberExpression", da.Identifier = "Identifier", da.Literal = "Literal", da.ArrayExpression = "ArrayExpression", da.Property = "Property", da.ObjectExpression = "ObjectExpression", da.ThisExpression = "ThisExpression", da.LocalsExpression = "LocalsExpression", da.NGValueParameter = "NGValueParameter", da.prototype = {
        ast: function(e) {
            this.text = e, this.tokens = this.lexer.lex(e);
            var t = this.program();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), t
        },
        program: function() {
            for (var e = [];;)
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.expressionStatement()), !this.expect(";")) return {
                    type: da.Program,
                    body: e
                }
        },
        expressionStatement: function() {
            return {
                type: da.ExpressionStatement,
                expression: this.filterChain()
            }
        },
        filterChain: function() {
            for (var e, t = this.expression(); e = this.expect("|");) t = this.filter(t);
            return t
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var e = this.ternary();
            return this.expect("=") && (e = {
                type: da.AssignmentExpression,
                left: e,
                right: this.assignment(),
                operator: "="
            }), e
        },
        ternary: function() {
            var e, t, n = this.logicalOR();
            return this.expect("?") && (e = this.expression(), this.consume(":")) ? (t = this.expression(), {
                type: da.ConditionalExpression,
                test: n,
                alternate: e,
                consequent: t
            }) : n
        },
        logicalOR: function() {
            for (var e = this.logicalAND(); this.expect("||");) e = {
                type: da.LogicalExpression,
                operator: "||",
                left: e,
                right: this.logicalAND()
            };
            return e
        },
        logicalAND: function() {
            for (var e = this.equality(); this.expect("&&");) e = {
                type: da.LogicalExpression,
                operator: "&&",
                left: e,
                right: this.equality()
            };
            return e
        },
        equality: function() {
            for (var e, t = this.relational(); e = this.expect("==", "!=", "===", "!==");) t = {
                type: da.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.relational()
            };
            return t
        },
        relational: function() {
            for (var e, t = this.additive(); e = this.expect("<", ">", "<=", ">=");) t = {
                type: da.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.additive()
            };
            return t
        },
        additive: function() {
            for (var e, t = this.multiplicative(); e = this.expect("+", "-");) t = {
                type: da.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.multiplicative()
            };
            return t
        },
        multiplicative: function() {
            for (var e, t = this.unary(); e = this.expect("*", "/", "%");) t = {
                type: da.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.unary()
            };
            return t
        },
        unary: function() {
            var e;
            return (e = this.expect("+", "-", "!")) ? {
                type: da.UnaryExpression,
                operator: e.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary()
        },
        primary: function() {
            var e;
            this.expect("(") ? (e = this.filterChain(), this.consume(")")) : this.expect("[") ? e = this.arrayDeclaration() : this.expect("{") ? e = this.object() : this.constants.hasOwnProperty(this.peek().text) ? e = U(this.constants[this.consume().text]) : this.peek().identifier ? e = this.identifier() : this.peek().constant ? e = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var t; t = this.expect("(", "[", ".");) "(" === t.text ? (e = {
                type: da.CallExpression,
                callee: e,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === t.text ? (e = {
                type: da.MemberExpression,
                object: e,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === t.text ? e = {
                type: da.MemberExpression,
                object: e,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return e
        },
        filter: function(e) {
            for (var t = [e], n = {
                    type: da.CallExpression,
                    callee: this.identifier(),
                    arguments: t,
                    filter: !0
                }; this.expect(":");) t.push(this.expression());
            return n
        },
        parseArguments: function() {
            var e = [];
            if (")" !== this.peekToken().text)
                do e.push(this.expression()); while (this.expect(","));
            return e
        },
        identifier: function() {
            var e = this.consume();
            return e.identifier || this.throwError("is not a valid identifier", e), {
                type: da.Identifier,
                name: e.text
            }
        },
        constant: function() {
            return {
                type: da.Literal,
                value: this.consume().value
            }
        },
        arrayDeclaration: function() {
            var e = [];
            if ("]" !== this.peekToken().text)
                do {
                    if (this.peek("]")) break;
                    e.push(this.expression())
                } while (this.expect(","));
            return this.consume("]"), {
                type: da.ArrayExpression,
                elements: e
            }
        },
        object: function() {
            var e, t = [];
            if ("}" !== this.peekToken().text)
                do {
                    if (this.peek("}")) break;
                    e = {
                        type: da.Property,
                        kind: "init"
                    }, this.peek().constant ? e.key = this.constant() : this.peek().identifier ? e.key = this.identifier() : this.throwError("invalid key", this.peek()), this.consume(":"), e.value = this.expression(), t.push(e)
                } while (this.expect(","));
            return this.consume("}"), {
                type: da.ObjectExpression,
                properties: t
            }
        },
        throwError: function(e, t) {
            throw oa("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
        },
        consume: function(e) {
            if (0 === this.tokens.length) throw oa("ueoe", "Unexpected end of expression: {0}", this.text);
            var t = this.expect(e);
            return t || this.throwError("is unexpected, expecting [" + e + "]", this.peek()), t
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw oa("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function(e, t, n, r) {
            return this.peekAhead(0, e, t, n, r)
        },
        peekAhead: function(e, t, n, r, i) {
            if (this.tokens.length > e) {
                var a = this.tokens[e],
                    o = a.text;
                if (o === t || o === n || o === r || o === i || !t && !n && !r && !i) return a
            }
            return !1
        },
        expect: function(e, t, n, r) {
            var i = this.peek(e, t, n, r);
            return i ? (this.tokens.shift(), i) : !1
        },
        constants: {
            "true": {
                type: da.Literal,
                value: !0
            },
            "false": {
                type: da.Literal,
                value: !1
            },
            "null": {
                type: da.Literal,
                value: null
            },
            undefined: {
                type: da.Literal,
                value: n
            },
            "this": {
                type: da.ThisExpression
            },
            $locals: {
                type: da.LocalsExpression
            }
        }
    }, dn.prototype = {
        compile: function(e, t) {
            var r = this,
                i = this.astBuilder.ast(e);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: t,
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            }, sn(i, r.$filter);
            var o, s = "";
            if (this.stage = "assign", o = cn(i)) {
                this.state.computing = "assign";
                var u = this.nextId();
                this.recurse(o, u), this.return_(u), s = "fn.assign=" + this.generateFunction("assign", "s,v,l")
            }
            var l = un(i.body);
            r.stage = "inputs", a(l, function(e, t) {
                var n = "fn" + t;
                r.state[n] = {
                    vars: [],
                    body: [],
                    own: {}
                }, r.state.computing = n;
                var i = r.nextId();
                r.recurse(e, i), r.return_(i), r.state.inputs.push(n), e.watchId = t
            }), this.state.computing = "fn", this.stage = "main", this.recurse(i);
            var c = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + s + this.watchFns() + "return fn;",
                f = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", c)(this.$filter, Qt, en, tn, Zt, nn, rn, an, e);
            return this.state = this.stage = n, f.literal = fn(i), f.constant = pn(i), f
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var e = [],
                t = this.state.inputs,
                n = this;
            return a(t, function(t) {
                e.push("var " + t + "=" + n.generateFunction(t, "s"))
            }), t.length && e.push("fn.inputs=[" + t.join(",") + "];"), e.join("")
        },
        generateFunction: function(e, t) {
            return "function(" + t + "){" + this.varsPrefix(e) + this.body(e) + "};"
        },
        filterPrefix: function() {
            var e = [],
                t = this;
            return a(this.state.filters, function(n, r) {
                e.push(n + "=$filter(" + t.escape(r) + ")")
            }), e.length ? "var " + e.join(",") + ";" : ""
        },
        varsPrefix: function(e) {
            return this.state[e].vars.length ? "var " + this.state[e].vars.join(",") + ";" : ""
        },
        body: function(e) {
            return this.state[e].body.join("")
        },
        recurse: function(e, t, r, i, o, s) {
            var u, l, c, f, p = this;
            if (i = i || m, !s && b(e.watchId)) return t = t || this.nextId(), void this.if_("i", this.lazyAssign(t, this.computedMember("i", e.watchId)), this.lazyRecurse(e, t, r, i, o, !0));
            switch (e.type) {
                case da.Program:
                    a(e.body, function(t, r) {
                        p.recurse(t.expression, n, n, function(e) {
                            l = e
                        }), r !== e.body.length - 1 ? p.current().body.push(l, ";") : p.return_(l)
                    });
                    break;
                case da.Literal:
                    f = this.escape(e.value), this.assign(t, f), i(f);
                    break;
                case da.UnaryExpression:
                    this.recurse(e.argument, n, n, function(e) {
                        l = e
                    }), f = e.operator + "(" + this.ifDefined(l, 0) + ")", this.assign(t, f), i(f);
                    break;
                case da.BinaryExpression:
                    this.recurse(e.left, n, n, function(e) {
                        u = e
                    }), this.recurse(e.right, n, n, function(e) {
                        l = e
                    }), f = "+" === e.operator ? this.plus(u, l) : "-" === e.operator ? this.ifDefined(u, 0) + e.operator + this.ifDefined(l, 0) : "(" + u + ")" + e.operator + "(" + l + ")", this.assign(t, f), i(f);
                    break;
                case da.LogicalExpression:
                    t = t || this.nextId(), p.recurse(e.left, t), p.if_("&&" === e.operator ? t : p.not(t), p.lazyRecurse(e.right, t)), i(t);
                    break;
                case da.ConditionalExpression:
                    t = t || this.nextId(), p.recurse(e.test, t), p.if_(t, p.lazyRecurse(e.alternate, t), p.lazyRecurse(e.consequent, t)), i(t);
                    break;
                case da.Identifier:
                    t = t || this.nextId(), r && (r.context = "inputs" === p.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", e.name) + "?l:s"), r.computed = !1, r.name = e.name), Qt(e.name), p.if_("inputs" === p.stage || p.not(p.getHasOwnProperty("l", e.name)), function() {
                        p.if_("inputs" === p.stage || "s", function() {
                            o && 1 !== o && p.if_(p.not(p.nonComputedMember("s", e.name)), p.lazyAssign(p.nonComputedMember("s", e.name), "{}")), p.assign(t, p.nonComputedMember("s", e.name))
                        })
                    }, t && p.lazyAssign(t, p.nonComputedMember("l", e.name))), (p.state.expensiveChecks || mn(e.name)) && p.addEnsureSafeObject(t), i(t);
                    break;
                case da.MemberExpression:
                    u = r && (r.context = this.nextId()) || this.nextId(), t = t || this.nextId(), p.recurse(e.object, u, n, function() {
                        p.if_(p.notNull(u), function() {
                            o && 1 !== o && p.addEnsureSafeAssignContext(u), e.computed ? (l = p.nextId(), p.recurse(e.property, l), p.getStringValue(l), p.addEnsureSafeMemberName(l), o && 1 !== o && p.if_(p.not(p.computedMember(u, l)), p.lazyAssign(p.computedMember(u, l), "{}")), f = p.ensureSafeObject(p.computedMember(u, l)), p.assign(t, f), r && (r.computed = !0, r.name = l)) : (Qt(e.property.name), o && 1 !== o && p.if_(p.not(p.nonComputedMember(u, e.property.name)), p.lazyAssign(p.nonComputedMember(u, e.property.name), "{}")), f = p.nonComputedMember(u, e.property.name), (p.state.expensiveChecks || mn(e.property.name)) && (f = p.ensureSafeObject(f)), p.assign(t, f), r && (r.computed = !1, r.name = e.property.name))
                        }, function() {
                            p.assign(t, "undefined")
                        }), i(t)
                    }, !!o);
                    break;
                case da.CallExpression:
                    t = t || this.nextId(), e.filter ? (l = p.filter(e.callee.name), c = [], a(e.arguments, function(e) {
                        var t = p.nextId();
                        p.recurse(e, t), c.push(t)
                    }), f = l + "(" + c.join(",") + ")", p.assign(t, f), i(t)) : (l = p.nextId(), u = {}, c = [], p.recurse(e.callee, l, u, function() {
                        p.if_(p.notNull(l), function() {
                            p.addEnsureSafeFunction(l), a(e.arguments, function(e) {
                                p.recurse(e, p.nextId(), n, function(e) {
                                    c.push(p.ensureSafeObject(e))
                                })
                            }), u.name ? (p.state.expensiveChecks || p.addEnsureSafeObject(u.context), f = p.member(u.context, u.name, u.computed) + "(" + c.join(",") + ")") : f = l + "(" + c.join(",") + ")", f = p.ensureSafeObject(f), p.assign(t, f)
                        }, function() {
                            p.assign(t, "undefined")
                        }), i(t)
                    }));
                    break;
                case da.AssignmentExpression:
                    if (l = this.nextId(), u = {}, !ln(e.left)) throw oa("lval", "Trying to assign a value to a non l-value");
                    this.recurse(e.left, n, u, function() {
                        p.if_(p.notNull(u.context), function() {
                            p.recurse(e.right, l), p.addEnsureSafeObject(p.member(u.context, u.name, u.computed)), p.addEnsureSafeAssignContext(u.context), f = p.member(u.context, u.name, u.computed) + e.operator + l, p.assign(t, f), i(t || f)
                        })
                    }, 1);
                    break;
                case da.ArrayExpression:
                    c = [], a(e.elements, function(e) {
                        p.recurse(e, p.nextId(), n, function(e) {
                            c.push(e)
                        })
                    }), f = "[" + c.join(",") + "]", this.assign(t, f), i(f);
                    break;
                case da.ObjectExpression:
                    c = [], a(e.properties, function(e) {
                        p.recurse(e.value, p.nextId(), n, function(t) {
                            c.push(p.escape(e.key.type === da.Identifier ? e.key.name : "" + e.key.value) + ":" + t)
                        })
                    }), f = "{" + c.join(",") + "}", this.assign(t, f), i(f);
                    break;
                case da.ThisExpression:
                    this.assign(t, "s"), i("s");
                    break;
                case da.LocalsExpression:
                    this.assign(t, "l"), i("l");
                    break;
                case da.NGValueParameter:
                    this.assign(t, "v"), i("v")
            }
        },
        getHasOwnProperty: function(e, t) {
            var n = e + "." + t,
                r = this.current().own;
            return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, e + "&&(" + this.escape(t) + " in " + e + ")")), r[n]
        },
        assign: function(e, t) {
            return e ? (this.current().body.push(e, "=", t, ";"), e) : void 0
        },
        filter: function(e) {
            return this.state.filters.hasOwnProperty(e) || (this.state.filters[e] = this.nextId(!0)), this.state.filters[e]
        },
        ifDefined: function(e, t) {
            return "ifDefined(" + e + "," + this.escape(t) + ")"
        },
        plus: function(e, t) {
            return "plus(" + e + "," + t + ")"
        },
        return_: function(e) {
            this.current().body.push("return ", e, ";")
        },
        if_: function(e, t, n) {
            if (e === !0) t();
            else {
                var r = this.current().body;
                r.push("if(", e, "){"), t(), r.push("}"), n && (r.push("else{"), n(), r.push("}"))
            }
        },
        not: function(e) {
            return "!(" + e + ")"
        },
        notNull: function(e) {
            return e + "!=null"
        },
        nonComputedMember: function(e, t) {
            return e + "." + t
        },
        computedMember: function(e, t) {
            return e + "[" + t + "]"
        },
        member: function(e, t, n) {
            return n ? this.computedMember(e, t) : this.nonComputedMember(e, t)
        },
        addEnsureSafeObject: function(e) {
            this.current().body.push(this.ensureSafeObject(e), ";")
        },
        addEnsureSafeMemberName: function(e) {
            this.current().body.push(this.ensureSafeMemberName(e), ";")
        },
        addEnsureSafeFunction: function(e) {
            this.current().body.push(this.ensureSafeFunction(e), ";")
        },
        addEnsureSafeAssignContext: function(e) {
            this.current().body.push(this.ensureSafeAssignContext(e), ";")
        },
        ensureSafeObject: function(e) {
            return "ensureSafeObject(" + e + ",text)"
        },
        ensureSafeMemberName: function(e) {
            return "ensureSafeMemberName(" + e + ",text)"
        },
        ensureSafeFunction: function(e) {
            return "ensureSafeFunction(" + e + ",text)"
        },
        getStringValue: function(e) {
            this.assign(e, "getStringValue(" + e + ")")
        },
        ensureSafeAssignContext: function(e) {
            return "ensureSafeAssignContext(" + e + ",text)"
        },
        lazyRecurse: function(e, t, n, r, i, a) {
            var o = this;
            return function() {
                o.recurse(e, t, n, r, i, a)
            }
        },
        lazyAssign: function(e, t) {
            var n = this;
            return function() {
                n.assign(e, t)
            }
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        },
        escape: function(e) {
            if (C(e)) return "'" + e.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (k(e)) return e.toString();
            if (e === !0) return "true";
            if (e === !1) return "false";
            if (null === e) return "null";
            if ("undefined" == typeof e) return "undefined";
            throw oa("esc", "IMPOSSIBLE")
        },
        nextId: function(e, t) {
            var n = "v" + this.state.nextId++;
            return e || this.current().vars.push(n + (t ? "=" + t : "")), n
        },
        current: function() {
            return this.state[this.state.computing]
        }
    }, hn.prototype = {
        compile: function(e, t) {
            var n = this,
                r = this.astBuilder.ast(e);
            this.expression = e, this.expensiveChecks = t, sn(r, n.$filter);
            var i, o;
            (i = cn(r)) && (o = this.recurse(i));
            var s, u = un(r.body);
            u && (s = [], a(u, function(e, t) {
                var r = n.recurse(e);
                e.input = r, s.push(r), e.watchId = t
            }));
            var l = [];
            a(r.body, function(e) {
                l.push(n.recurse(e.expression))
            });
            var c = 0 === r.body.length ? function() {} : 1 === r.body.length ? l[0] : function(e, t) {
                var n;
                return a(l, function(r) {
                    n = r(e, t)
                }), n
            };
            return o && (c.assign = function(e, t, n) {
                return o(e, n, t)
            }), s && (c.inputs = s), c.literal = fn(r), c.constant = pn(r), c
        },
        recurse: function(e, t, r) {
            var i, o, s, u = this;
            if (e.input) return this.inputs(e.input, e.watchId);
            switch (e.type) {
                case da.Literal:
                    return this.value(e.value, t);
                case da.UnaryExpression:
                    return o = this.recurse(e.argument), this["unary" + e.operator](o, t);
                case da.BinaryExpression:
                    return i = this.recurse(e.left), o = this.recurse(e.right), this["binary" + e.operator](i, o, t);
                case da.LogicalExpression:
                    return i = this.recurse(e.left), o = this.recurse(e.right), this["binary" + e.operator](i, o, t);
                case da.ConditionalExpression:
                    return this["ternary?:"](this.recurse(e.test), this.recurse(e.alternate), this.recurse(e.consequent), t);
                case da.Identifier:
                    return Qt(e.name, u.expression), u.identifier(e.name, u.expensiveChecks || mn(e.name), t, r, u.expression);
                case da.MemberExpression:
                    return i = this.recurse(e.object, !1, !!r), e.computed || (Qt(e.property.name, u.expression), o = e.property.name), e.computed && (o = this.recurse(e.property)), e.computed ? this.computedMember(i, o, t, r, u.expression) : this.nonComputedMember(i, o, u.expensiveChecks, t, r, u.expression);
                case da.CallExpression:
                    return s = [], a(e.arguments, function(e) {
                        s.push(u.recurse(e))
                    }), e.filter && (o = this.$filter(e.callee.name)), e.filter || (o = this.recurse(e.callee, !0)), e.filter ? function(e, r, i, a) {
                        for (var u = [], l = 0; l < s.length; ++l) u.push(s[l](e, r, i, a));
                        var c = o.apply(n, u, a);
                        return t ? {
                            context: n,
                            name: n,
                            value: c
                        } : c
                    } : function(e, n, r, i) {
                        var a, l = o(e, n, r, i);
                        if (null != l.value) {
                            en(l.context, u.expression), tn(l.value, u.expression);
                            for (var c = [], f = 0; f < s.length; ++f) c.push(en(s[f](e, n, r, i), u.expression));
                            a = en(l.value.apply(l.context, c), u.expression)
                        }
                        return t ? {
                            value: a
                        } : a
                    };
                case da.AssignmentExpression:
                    return i = this.recurse(e.left, !0, 1), o = this.recurse(e.right),
                        function(e, n, r, a) {
                            var s = i(e, n, r, a),
                                l = o(e, n, r, a);
                            return en(s.value, u.expression), nn(s.context), s.context[s.name] = l, t ? {
                                value: l
                            } : l
                        };
                case da.ArrayExpression:
                    return s = [], a(e.elements, function(e) {
                            s.push(u.recurse(e))
                        }),
                        function(e, n, r, i) {
                            for (var a = [], o = 0; o < s.length; ++o) a.push(s[o](e, n, r, i));
                            return t ? {
                                value: a
                            } : a
                        };
                case da.ObjectExpression:
                    return s = [], a(e.properties, function(e) {
                            s.push({
                                key: e.key.type === da.Identifier ? e.key.name : "" + e.key.value,
                                value: u.recurse(e.value)
                            })
                        }),
                        function(e, n, r, i) {
                            for (var a = {}, o = 0; o < s.length; ++o) a[s[o].key] = s[o].value(e, n, r, i);
                            return t ? {
                                value: a
                            } : a
                        };
                case da.ThisExpression:
                    return function(e) {
                        return t ? {
                            value: e
                        } : e
                    };
                case da.LocalsExpression:
                    return function(e, n) {
                        return t ? {
                            value: n
                        } : n
                    };
                case da.NGValueParameter:
                    return function(e, n, r, i) {
                        return t ? {
                            value: r
                        } : r
                    }
            }
        },
        "unary+": function(e, t) {
            return function(n, r, i, a) {
                var o = e(n, r, i, a);
                return o = b(o) ? +o : 0, t ? {
                    value: o
                } : o
            }
        },
        "unary-": function(e, t) {
            return function(n, r, i, a) {
                var o = e(n, r, i, a);
                return o = b(o) ? -o : 0, t ? {
                    value: o
                } : o
            }
        },
        "unary!": function(e, t) {
            return function(n, r, i, a) {
                var o = !e(n, r, i, a);
                return t ? {
                    value: o
                } : o
            }
        },
        "binary+": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o),
                    u = t(r, i, a, o),
                    l = an(s, u);
                return n ? {
                    value: l
                } : l
            }
        },
        "binary-": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o),
                    u = t(r, i, a, o),
                    l = (b(s) ? s : 0) - (b(u) ? u : 0);
                return n ? {
                    value: l
                } : l
            }
        },
        "binary*": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) * t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary/": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) / t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary%": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) % t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary===": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) === t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary!==": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) !== t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary==": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) == t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary!=": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) != t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary<": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) < t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary>": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) > t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary<=": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) <= t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary>=": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) >= t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary&&": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) && t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "binary||": function(e, t, n) {
            return function(r, i, a, o) {
                var s = e(r, i, a, o) || t(r, i, a, o);
                return n ? {
                    value: s
                } : s
            }
        },
        "ternary?:": function(e, t, n, r) {
            return function(i, a, o, s) {
                var u = e(i, a, o, s) ? t(i, a, o, s) : n(i, a, o, s);
                return r ? {
                    value: u
                } : u
            }
        },
        value: function(e, t) {
            return function() {
                return t ? {
                    context: n,
                    name: n,
                    value: e
                } : e
            }
        },
        identifier: function(e, t, r, i, a) {
            return function(o, s, u, l) {
                var c = s && e in s ? s : o;
                i && 1 !== i && c && !c[e] && (c[e] = {});
                var f = c ? c[e] : n;
                return t && en(f, a), r ? {
                    context: c,
                    name: e,
                    value: f
                } : f
            }
        },
        computedMember: function(e, t, n, r, i) {
            return function(a, o, s, u) {
                var l, c, f = e(a, o, s, u);
                return null != f && (l = t(a, o, s, u), l = Zt(l), Qt(l, i), r && 1 !== r && (nn(f), f && !f[l] && (f[l] = {})), c = f[l], en(c, i)), n ? {
                    context: f,
                    name: l,
                    value: c
                } : c
            }
        },
        nonComputedMember: function(e, t, r, i, a, o) {
            return function(s, u, l, c) {
                var f = e(s, u, l, c);
                a && 1 !== a && (nn(f), f && !f[t] && (f[t] = {}));
                var p = null != f ? f[t] : n;
                return (r || mn(t)) && en(p, o), i ? {
                    context: f,
                    name: t,
                    value: p
                } : p
            }
        },
        inputs: function(e, t) {
            return function(n, r, i, a) {
                return a ? a[t] : e(n, r, i)
            }
        }
    };
    var ha = function(e, t, n) {
        this.lexer = e, this.$filter = t, this.options = n, this.ast = new da(this.lexer), this.astCompiler = n.csp ? new hn(this.ast, t) : new dn(this.ast, t)
    };
    ha.prototype = {
        constructor: ha,
        parse: function(e) {
            return this.astCompiler.compile(e, this.options.expensiveChecks)
        }
    };
    var ma = Object.prototype.valueOf,
        ga = r("$sce"),
        va = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        _i = r("$compile"),
        $a = t.createElement("a"),
        ya = Pn(e.location.href);
    Ln.$inject = ["$document"], Fn.$inject = ["$provide"];
    var ba = 22,
        wa = ".",
        xa = "0";
    Hn.$inject = ["$locale"], _n.$inject = ["$locale"];
    var Ca = {
            yyyy: Gn("FullYear", 4),
            yy: Gn("FullYear", 2, 0, !0),
            y: Gn("FullYear", 1),
            MMMM: Kn("Month"),
            MMM: Kn("Month", !0),
            MM: Gn("Month", 2, 1),
            M: Gn("Month", 1, 1),
            dd: Gn("Date", 2),
            d: Gn("Date", 1),
            HH: Gn("Hours", 2),
            H: Gn("Hours", 1),
            hh: Gn("Hours", 2, -12),
            h: Gn("Hours", 1, -12),
            mm: Gn("Minutes", 2),
            m: Gn("Minutes", 1),
            ss: Gn("Seconds", 2),
            s: Gn("Seconds", 1),
            sss: Gn("Milliseconds", 3),
            EEEE: Kn("Day"),
            EEE: Kn("Day", !0),
            a: er,
            Z: Xn,
            ww: Zn(2),
            w: Zn(1),
            G: tr,
            GG: tr,
            GGG: tr,
            GGGG: nr
        },
        ka = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
        Sa = /^\-?\d+$/;
    rr.$inject = ["$locale"];
    var Ea = v(Or),
        Da = v(Mr);
    or.$inject = ["$parse"];
    var Ta = v({
            restrict: "E",
            compile: function(e, t) {
                return t.href || t.xlinkHref ? void 0 : function(e, t) {
                    if ("a" === t[0].nodeName.toLowerCase()) {
                        var n = "[object SVGAnimatedString]" === Ur.call(t.prop("href")) ? "xlink:href" : "href";
                        t.on("click", function(e) {
                            t.attr(n) || e.preventDefault()
                        })
                    }
                }
            }
        }),
        Aa = {};
    a(ki, function(e, t) {
        function n(e, n, i) {
            e.$watch(i[r], function(e) {
                i.$set(t, !!e)
            })
        }
        if ("multiple" != e) {
            var r = mt("ng-" + t),
                i = n;
            "checked" === e && (i = function(e, t, i) {
                i.ngModel !== i[r] && n(e, t, i)
            }), Aa[r] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: i
                }
            }
        }
    }), a(Ei, function(e, t) {
        Aa[t] = function() {
            return {
                priority: 100,
                link: function(e, n, r) {
                    if ("ngPattern" === t && "/" == r.ngPattern.charAt(0)) {
                        var i = r.ngPattern.match(Dr);
                        if (i) return void r.$set("ngPattern", new RegExp(i[1], i[2]))
                    }
                    e.$watch(r[t], function(e) {
                        r.$set(t, e)
                    })
                }
            }
        }
    }), a(["src", "srcset", "href"], function(e) {
        var t = mt("ng-" + e);
        Aa[t] = function() {
            return {
                priority: 99,
                link: function(n, r, i) {
                    var a = e,
                        o = e;
                    "href" === e && "[object SVGAnimatedString]" === Ur.call(r.prop("href")) && (o = "xlinkHref", i.$attr[o] = "xlink:href", a = null), i.$observe(t, function(t) {
                        return t ? (i.$set(o, t), void(Nr && a && r.prop(a, i[o]))) : void("href" === e && i.$set(o, null))
                    })
                }
            }
        }
    });
    var Oa = {
            $addControl: m,
            $$renameControl: ur,
            $removeControl: m,
            $setValidity: m,
            $setDirty: m,
            $setPristine: m,
            $setSubmitted: m
        },
        Ma = "ng-submitted";
    lr.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
    var Pa = function(e) {
            return ["$timeout", "$parse", function(t, r) {
                function i(e) {
                    return "" === e ? r('this[""]').assign : r(e).assign || m
                }
                var a = {
                    name: "form",
                    restrict: e ? "EAC" : "E",
                    require: ["form", "^^?form"],
                    controller: lr,
                    compile: function(r, a) {
                        r.addClass(po).addClass(co);
                        var o = a.name ? "name" : e && a.ngForm ? "ngForm" : !1;
                        return {
                            pre: function(e, r, a, s) {
                                var u = s[0];
                                if (!("action" in a)) {
                                    var l = function(t) {
                                        e.$apply(function() {
                                            u.$commitViewValue(), u.$setSubmitted()
                                        }), t.preventDefault()
                                    };
                                    fi(r[0], "submit", l), r.on("$destroy", function() {
                                        t(function() {
                                            pi(r[0], "submit", l)
                                        }, 0, !1)
                                    })
                                }
                                var c = s[1] || u.$$parentForm;
                                c.$addControl(u);
                                var p = o ? i(u.$name) : m;
                                o && (p(e, u), a.$observe(o, function(t) {
                                    u.$name !== t && (p(e, n), u.$$parentForm.$$renameControl(u, t), (p = i(u.$name))(e, u))
                                })), r.on("$destroy", function() {
                                    u.$$parentForm.$removeControl(u), p(e, n), f(u, Oa)
                                })
                            }
                        }
                    }
                };
                return a
            }]
        },
        ja = Pa(),
        Na = Pa(!0),
        La = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        Ia = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
        Fa = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        qa = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
        Va = /^(\d{4})-(\d{2})-(\d{2})$/,
        Ra = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        Ua = /^(\d{4})-W(\d\d)$/,
        Ha = /^(\d{4})-(\d\d)$/,
        _a = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        Ba = {
            text: fr,
            date: mr("date", Va, hr(Va, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
            "datetime-local": mr("datetimelocal", Ra, hr(Ra, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
            time: mr("time", _a, hr(_a, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
            week: mr("week", Ua, dr, "yyyy-Www"),
            month: mr("month", Ha, hr(Ha, ["yyyy", "MM"]), "yyyy-MM"),
            number: vr,
            url: $r,
            email: yr,
            radio: br,
            checkbox: xr,
            hidden: m,
            button: m,
            submit: m,
            reset: m,
            file: m
        },
        za = ["$browser", "$sniffer", "$filter", "$parse", function(e, t, n, r) {
            return {
                restrict: "E",
                require: ["?ngModel"],
                link: {
                    pre: function(i, a, o, s) {
                        s[0] && (Ba[Or(o.type)] || Ba.text)(i, a, o, s[0], t, e, n, r)
                    }
                }
            }
        }],
        Wa = /^(true|false|\d+)$/,
        Ya = function() {
            return {
                restrict: "A",
                priority: 100,
                compile: function(e, t) {
                    return Wa.test(t.ngValue) ? function(e, t, n) {
                        n.$set("value", e.$eval(n.ngValue))
                    } : function(e, t, n) {
                        e.$watch(n.ngValue, function(e) {
                            n.$set("value", e)
                        })
                    }
                }
            }
        },
        Ga = ["$compile", function(e) {
            return {
                restrict: "AC",
                compile: function(t) {
                    return e.$$addBindingClass(t),
                        function(t, n, r) {
                            e.$$addBindingInfo(n, r.ngBind), n = n[0], t.$watch(r.ngBind, function(e) {
                                n.textContent = y(e) ? "" : e
                            })
                        }
                }
            }
        }],
        Ka = ["$interpolate", "$compile", function(e, t) {
            return {
                compile: function(n) {
                    return t.$$addBindingClass(n),
                        function(n, r, i) {
                            var a = e(r.attr(i.$attr.ngBindTemplate));
                            t.$$addBindingInfo(r, a.expressions), r = r[0], i.$observe("ngBindTemplate", function(e) {
                                r.textContent = y(e) ? "" : e
                            })
                        }
                }
            }
        }],
        Xa = ["$sce", "$parse", "$compile", function(e, t, n) {
            return {
                restrict: "A",
                compile: function(r, i) {
                    var a = t(i.ngBindHtml),
                        o = t(i.ngBindHtml, function(e) {
                            return (e || "").toString()
                        });
                    return n.$$addBindingClass(r),
                        function(t, r, i) {
                            n.$$addBindingInfo(r, i.ngBindHtml), t.$watch(o, function() {
                                r.html(e.getTrustedHtml(a(t)) || "")
                            })
                        }
                }
            }
        }],
        Ja = v({
            restrict: "A",
            require: "ngModel",
            link: function(e, t, n, r) {
                r.$viewChangeListeners.push(function() {
                    e.$eval(n.ngChange)
                })
            }
        }),
        Qa = Cr("", !0),
        Za = Cr("Odd", 0),
        eo = Cr("Even", 1),
        to = sr({
            compile: function(e, t) {
                t.$set("ngCloak", n), e.removeClass("ng-cloak")
            }
        }),
        no = [function() {
            return {
                restrict: "A",
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        ro = {},
        io = {
            blur: !0,
            focus: !0
        };
    a("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(e) {
        var t = mt("ng-" + e);
        ro[t] = ["$parse", "$rootScope", function(n, r) {
            return {
                restrict: "A",
                compile: function(i, a) {
                    var o = n(a[t], null, !0);
                    return function(t, n) {
                        n.on(e, function(n) {
                            var i = function() {
                                o(t, {
                                    $event: n
                                })
                            };
                            io[e] && r.$$phase ? t.$evalAsync(i) : t.$apply(i)
                        })
                    }
                }
            }
        }]
    });
    var ao = ["$animate", function(e) {
            return {
                multiElement: !0,
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function(n, r, i, a, o) {
                    var s, u, l;
                    n.$watch(i.ngIf, function(n) {
                        n ? u || o(function(n, a) {
                            u = a, n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " "), s = {
                                clone: n
                            }, e.enter(n, r.parent(), r)
                        }) : (l && (l.remove(), l = null), u && (u.$destroy(), u = null), s && (l = ge(s.clone), e.leave(l).then(function() {
                            l = null
                        }), s = null))
                    })
                }
            }
        }],
        oo = ["$templateRequest", "$anchorScroll", "$animate", function(e, t, n) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: Br.noop,
                compile: function(r, i) {
                    var a = i.ngInclude || i.src,
                        o = i.onload || "",
                        s = i.autoscroll;
                    return function(r, i, u, l, c) {
                        var f, p, d, h = 0,
                            m = function() {
                                p && (p.remove(), p = null), f && (f.$destroy(), f = null), d && (n.leave(d).then(function() {
                                    p = null
                                }), p = d, d = null)
                            };
                        r.$watch(a, function(a) {
                            var u = function() {
                                    !b(s) || s && !r.$eval(s) || t()
                                },
                                p = ++h;
                            a ? (e(a, !0).then(function(e) {
                                if (!r.$$destroyed && p === h) {
                                    var t = r.$new();
                                    l.template = e;
                                    var s = c(t, function(e) {
                                        m(), n.enter(e, null, i).then(u)
                                    });
                                    f = t, d = s, f.$emit("$includeContentLoaded", a), r.$eval(o)
                                }
                            }, function() {
                                r.$$destroyed || p === h && (m(), r.$emit("$includeContentError", a))
                            }), r.$emit("$includeContentRequested", a)) : (m(), l.template = null)
                        })
                    }
                }
            }
        }],
        so = ["$compile", function(e) {
            return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(n, r, i, a) {
                    return Ur.call(r[0]).match(/SVG/) ? (r.empty(), void e(Te(a.template, t).childNodes)(n, function(e) {
                        r.append(e)
                    }, {
                        futureParentElement: r
                    })) : (r.html(a.template), void e(r.contents())(n))
                }
            }
        }],
        uo = sr({
            priority: 450,
            compile: function() {
                return {
                    pre: function(e, t, n) {
                        e.$eval(n.ngInit)
                    }
                }
            }
        }),
        lo = function() {
            return {
                restrict: "A",
                priority: 100,
                require: "ngModel",
                link: function(e, t, r, i) {
                    var o = t.attr(r.$attr.ngList) || ", ",
                        s = "false" !== r.ngTrim,
                        u = s ? Gr(o) : o,
                        l = function(e) {
                            if (!y(e)) {
                                var t = [];
                                return e && a(e.split(u), function(e) {
                                    e && t.push(s ? Gr(e) : e)
                                }), t
                            }
                        };
                    i.$parsers.push(l), i.$formatters.push(function(e) {
                        return Wr(e) ? e.join(o) : n
                    }), i.$isEmpty = function(e) {
                        return !e || !e.length
                    }
                }
            }
        },
        co = "ng-valid",
        fo = "ng-invalid",
        po = "ng-pristine",
        ho = "ng-dirty",
        mo = "ng-untouched",
        go = "ng-touched",
        vo = "ng-pending",
        $o = "ng-empty",
        yo = "ng-not-empty",
        bo = r("ngModel"),
        wo = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(e, t, r, i, o, s, u, l, c, f) {
            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = n, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = n, this.$name = f(r.name || "", !1)(e), this.$$parentForm = Oa;
            var p, d = o(r.ngModel),
                h = d.assign,
                g = d,
                v = h,
                $ = null,
                w = this;
            this.$$setOptions = function(e) {
                if (w.$options = e, e && e.getterSetter) {
                    var t = o(r.ngModel + "()"),
                        n = o(r.ngModel + "($$$p)");
                    g = function(e) {
                        var n = d(e);
                        return E(n) && (n = t(e)), n
                    }, v = function(e, t) {
                        E(d(e)) ? n(e, {
                            $$$p: w.$modelValue
                        }) : h(e, w.$modelValue)
                    }
                } else if (!d.assign) throw bo("nonassign", "Expression '{0}' is non-assignable. Element: {1}", r.ngModel, Z(i))
            }, this.$render = m, this.$isEmpty = function(e) {
                return y(e) || "" === e || null === e || e !== e
            }, this.$$updateEmptyClasses = function(e) {
                w.$isEmpty(e) ? (s.removeClass(i, yo), s.addClass(i, $o)) : (s.removeClass(i, $o), s.addClass(i, yo))
            };
            var x = 0;
            kr({
                ctrl: this,
                $element: i,
                set: function(e, t) {
                    e[t] = !0
                },
                unset: function(e, t) {
                    delete e[t]
                },
                $animate: s
            }), this.$setPristine = function() {
                w.$dirty = !1, w.$pristine = !0, s.removeClass(i, ho), s.addClass(i, po)
            }, this.$setDirty = function() {
                w.$dirty = !0, w.$pristine = !1, s.removeClass(i, po), s.addClass(i, ho), w.$$parentForm.$setDirty()
            }, this.$setUntouched = function() {
                w.$touched = !1, w.$untouched = !0, s.setClass(i, mo, go)
            }, this.$setTouched = function() {
                w.$touched = !0, w.$untouched = !1, s.setClass(i, go, mo)
            }, this.$rollbackViewValue = function() {
                u.cancel($), w.$viewValue = w.$$lastCommittedViewValue, w.$render()
            }, this.$validate = function() {
                if (!k(w.$modelValue) || !isNaN(w.$modelValue)) {
                    var e = w.$$lastCommittedViewValue,
                        t = w.$$rawModelValue,
                        r = w.$valid,
                        i = w.$modelValue,
                        a = w.$options && w.$options.allowInvalid;
                    w.$$runValidators(t, e, function(e) {
                        a || r === e || (w.$modelValue = e ? t : n, w.$modelValue !== i && w.$$writeModelToScope())
                    })
                }
            }, this.$$runValidators = function(e, t, r) {
                function i() {
                    var e = w.$$parserName || "parse";
                    return y(p) ? (u(e, null), !0) : (p || (a(w.$validators, function(e, t) {
                        u(t, null)
                    }), a(w.$asyncValidators, function(e, t) {
                        u(t, null)
                    })), u(e, p), p)
                }

                function o() {
                    var n = !0;
                    return a(w.$validators, function(r, i) {
                        var a = r(e, t);
                        n = n && a, u(i, a)
                    }), n ? !0 : (a(w.$asyncValidators, function(e, t) {
                        u(t, null)
                    }), !1)
                }

                function s() {
                    var r = [],
                        i = !0;
                    a(w.$asyncValidators, function(a, o) {
                        var s = a(e, t);
                        if (!N(s)) throw bo("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
                        u(o, n), r.push(s.then(function() {
                            u(o, !0)
                        }, function(e) {
                            i = !1, u(o, !1)
                        }))
                    }), r.length ? c.all(r).then(function() {
                        l(i)
                    }, m) : l(!0)
                }

                function u(e, t) {
                    f === x && w.$setValidity(e, t)
                }

                function l(e) {
                    f === x && r(e)
                }
                x++;
                var f = x;
                return i() && o() ? void s() : void l(!1)
            }, this.$commitViewValue = function() {
                var e = w.$viewValue;
                u.cancel($), (w.$$lastCommittedViewValue !== e || "" === e && w.$$hasNativeValidators) && (w.$$updateEmptyClasses(e), w.$$lastCommittedViewValue = e, w.$pristine && this.$setDirty(), this.$$parseAndValidate())
            }, this.$$parseAndValidate = function() {
                function t() {
                    w.$modelValue !== o && w.$$writeModelToScope()
                }
                var r = w.$$lastCommittedViewValue,
                    i = r;
                if (p = y(i) ? n : !0)
                    for (var a = 0; a < w.$parsers.length; a++)
                        if (i = w.$parsers[a](i), y(i)) {
                            p = !1;
                            break
                        }
                k(w.$modelValue) && isNaN(w.$modelValue) && (w.$modelValue = g(e));
                var o = w.$modelValue,
                    s = w.$options && w.$options.allowInvalid;
                w.$$rawModelValue = i, s && (w.$modelValue = i, t()), w.$$runValidators(i, w.$$lastCommittedViewValue, function(e) {
                    s || (w.$modelValue = e ? i : n, t())
                })
            }, this.$$writeModelToScope = function() {
                v(e, w.$modelValue), a(w.$viewChangeListeners, function(e) {
                    try {
                        e()
                    } catch (n) {
                        t(n)
                    }
                })
            }, this.$setViewValue = function(e, t) {
                w.$viewValue = e, (!w.$options || w.$options.updateOnDefault) && w.$$debounceViewValueCommit(t)
            }, this.$$debounceViewValueCommit = function(t) {
                var n, r = 0,
                    i = w.$options;
                i && b(i.debounce) && (n = i.debounce, k(n) ? r = n : k(n[t]) ? r = n[t] : k(n["default"]) && (r = n["default"])), u.cancel($), r ? $ = u(function() {
                    w.$commitViewValue()
                }, r) : l.$$phase ? w.$commitViewValue() : e.$apply(function() {
                    w.$commitViewValue()
                })
            }, e.$watch(function() {
                var t = g(e);
                if (t !== w.$modelValue && (w.$modelValue === w.$modelValue || t === t)) {
                    w.$modelValue = w.$$rawModelValue = t, p = n;
                    for (var r = w.$formatters, i = r.length, a = t; i--;) a = r[i](a);
                    w.$viewValue !== a && (w.$$updateEmptyClasses(a), w.$viewValue = w.$$lastCommittedViewValue = a, w.$render(), w.$$runValidators(t, a, m))
                }
                return t
            })
        }],
        xo = ["$rootScope", function(e) {
            return {
                restrict: "A",
                require: ["ngModel", "^?form", "^?ngModelOptions"],
                controller: wo,
                priority: 1,
                compile: function(t) {
                    return t.addClass(po).addClass(mo).addClass(co), {
                        pre: function(e, t, n, r) {
                            var i = r[0],
                                a = r[1] || i.$$parentForm;
                            i.$$setOptions(r[2] && r[2].$options), a.$addControl(i), n.$observe("name", function(e) {
                                i.$name !== e && i.$$parentForm.$$renameControl(i, e)
                            }), e.$on("$destroy", function() {
                                i.$$parentForm.$removeControl(i)
                            })
                        },
                        post: function(t, n, r, i) {
                            var a = i[0];
                            a.$options && a.$options.updateOn && n.on(a.$options.updateOn, function(e) {
                                a.$$debounceViewValueCommit(e && e.type)
                            }), n.on("blur", function(n) {
                                a.$touched || (e.$$phase ? t.$evalAsync(a.$setTouched) : t.$apply(a.$setTouched))
                            })
                        }
                    }
                }
            }
        }],
        Co = /(\s+|^)default(\s+|$)/,
        ko = function() {
            return {
                restrict: "A",
                controller: ["$scope", "$attrs", function(e, t) {
                    var n = this;
                    this.$options = U(e.$eval(t.ngModelOptions)), b(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Gr(this.$options.updateOn.replace(Co, function() {
                        return n.$options.updateOnDefault = !0, " "
                    }))) : this.$options.updateOnDefault = !0
                }]
            }
        },
        So = sr({
            terminal: !0,
            priority: 1e3
        }),
        Eo = r("ngOptions"),
        Do = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
        To = ["$compile", "$parse", function(e, n) {
            function r(e, t, r) {
                function a(e, t, n, r, i) {
                    this.selectValue = e, this.viewValue = t, this.label = n, this.group = r, this.disabled = i
                }

                function o(e) {
                    var t;
                    if (!l && i(e)) t = e;
                    else {
                        t = [];
                        for (var n in e) e.hasOwnProperty(n) && "$" !== n.charAt(0) && t.push(n)
                    }
                    return t
                }
                var s = e.match(Do);
                if (!s) throw Eo("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", e, Z(t));
                var u = s[5] || s[7],
                    l = s[6],
                    c = / as /.test(s[0]) && s[1],
                    f = s[9],
                    p = n(s[2] ? s[1] : u),
                    d = c && n(c),
                    h = d || p,
                    m = f && n(f),
                    g = f ? function(e, t) {
                        return m(r, t)
                    } : function(e) {
                        return Ze(e)
                    },
                    v = function(e, t) {
                        return g(e, C(e, t))
                    },
                    $ = n(s[2] || s[1]),
                    y = n(s[3] || ""),
                    b = n(s[4] || ""),
                    w = n(s[8]),
                    x = {},
                    C = l ? function(e, t) {
                        return x[l] = t, x[u] = e, x
                    } : function(e) {
                        return x[u] = e, x
                    };
                return {
                    trackBy: f,
                    getTrackByValue: v,
                    getWatchables: n(w, function(e) {
                        var t = [];
                        e = e || [];
                        for (var n = o(e), i = n.length, a = 0; i > a; a++) {
                            var u = e === n ? a : n[a],
                                l = (e[u], C(e[u], u)),
                                c = g(e[u], l);
                            if (t.push(c), s[2] || s[1]) {
                                var f = $(r, l);
                                t.push(f)
                            }
                            if (s[4]) {
                                var p = b(r, l);
                                t.push(p)
                            }
                        }
                        return t
                    }),
                    getOptions: function() {
                        for (var e = [], t = {}, n = w(r) || [], i = o(n), s = i.length, u = 0; s > u; u++) {
                            var l = n === i ? u : i[u],
                                c = n[l],
                                p = C(c, l),
                                d = h(r, p),
                                m = g(d, p),
                                x = $(r, p),
                                k = y(r, p),
                                S = b(r, p),
                                E = new a(m, d, x, k, S);
                            e.push(E), t[m] = E
                        }
                        return {
                            items: e,
                            selectValueMap: t,
                            getOptionFromViewValue: function(e) {
                                return t[v(e)]
                            },
                            getViewValueFromOption: function(e) {
                                return f ? Br.copy(e.viewValue) : e.viewValue
                            }
                        }
                    }
                }
            }

            function o(t, n, i, o) {
                function l(e, t) {
                    e.element = t, t.disabled = e.disabled, e.label !== t.label && (t.label = e.label, t.textContent = e.label), e.value !== t.value && (t.value = e.selectValue)
                }

                function c(e, t, n, r) {
                    var i;
                    return t && Or(t.nodeName) === n ? i = t : (i = r.cloneNode(!1), t ? e.insertBefore(i, t) : e.appendChild(i)), i
                }

                function f(e) {
                    for (var t; e;) t = e.nextSibling, ze(e), e = t
                }

                function p(e) {
                    var t = h && h[0],
                        n = C && C[0];
                    if (t || n)
                        for (; e && (e === t || e === n || e.nodeType === ai || "option" === V(e) && "" === e.value);) e = e.nextSibling;
                    return e
                }

                function d() {
                    var e = k && m.readValue();
                    k = S.getOptions();
                    var t = {},
                        r = n[0].firstChild;
                    if (x && n.prepend(h), r = p(r), k.items.forEach(function(e) {
                            var i, a, o;
                            b(e.group) ? (i = t[e.group], i || (a = c(n[0], r, "optgroup", u), r = a.nextSibling, a.label = e.group, i = t[e.group] = {
                                groupElement: a,
                                currentOptionElement: a.firstChild
                            }), o = c(i.groupElement, i.currentOptionElement, "option", s), l(e, o), i.currentOptionElement = o.nextSibling) : (o = c(n[0], r, "option", s), l(e, o), r = o.nextSibling)
                        }), Object.keys(t).forEach(function(e) {
                            f(t[e].currentOptionElement)
                        }), f(r), g.$render(), !g.$isEmpty(e)) {
                        var i = m.readValue(),
                            a = S.trackBy || v;
                        (a ? _(e, i) : e === i) || (g.$setViewValue(i), g.$render())
                    }
                }
                for (var h, m = o[0], g = o[1], v = i.multiple, $ = 0, y = n.children(), w = y.length; w > $; $++)
                    if ("" === y[$].value) {
                        h = y.eq($);
                        break
                    }
                var x = !!h,
                    C = Lr(s.cloneNode(!1));
                C.val("?");
                var k, S = r(i.ngOptions, n, t),
                    E = function() {
                        x || n.prepend(h), n.val(""), h.prop("selected", !0), h.attr("selected", !0)
                    },
                    D = function() {
                        x || h.remove()
                    },
                    T = function() {
                        n.prepend(C), n.val("?"), C.prop("selected", !0), C.attr("selected", !0)
                    },
                    A = function() {
                        C.remove()
                    };
                v ? (g.$isEmpty = function(e) {
                    return !e || 0 === e.length
                }, m.writeValue = function(e) {
                    k.items.forEach(function(e) {
                        e.element.selected = !1
                    }), e && e.forEach(function(e) {
                        var t = k.getOptionFromViewValue(e);
                        t && !t.disabled && (t.element.selected = !0)
                    })
                }, m.readValue = function() {
                    var e = n.val() || [],
                        t = [];
                    return a(e, function(e) {
                        var n = k.selectValueMap[e];
                        n && !n.disabled && t.push(k.getViewValueFromOption(n))
                    }), t
                }, S.trackBy && t.$watchCollection(function() {
                    return Wr(g.$viewValue) ? g.$viewValue.map(function(e) {
                        return S.getTrackByValue(e)
                    }) : void 0
                }, function() {
                    g.$render()
                })) : (m.writeValue = function(e) {
                    var t = k.getOptionFromViewValue(e);
                    t && !t.disabled ? n[0].value !== t.selectValue && (A(), D(), n[0].value = t.selectValue, t.element.selected = !0, t.element.setAttribute("selected", "selected")) : null === e || x ? (A(), E()) : (D(), T())
                }, m.readValue = function() {
                    var e = k.selectValueMap[n.val()];
                    return e && !e.disabled ? (D(), A(), k.getViewValueFromOption(e)) : null
                }, S.trackBy && t.$watch(function() {
                    return S.getTrackByValue(g.$viewValue)
                }, function() {
                    g.$render()
                })), x ? (h.remove(), e(h)(t), h.removeClass("ng-scope")) : h = Lr(s.cloneNode(!1)), d(), t.$watchCollection(S.getWatchables, d)
            }
            var s = t.createElement("option"),
                u = t.createElement("optgroup");
            return {
                restrict: "A",
                terminal: !0,
                require: ["select", "ngModel"],
                link: {
                    pre: function(e, t, n, r) {
                        r[0].registerOption = m
                    },
                    post: o
                }
            }
        }],
        Ao = ["$locale", "$interpolate", "$log", function(e, t, n) {
            var r = /{}/g,
                i = /^when(Minus)?(.+)$/;
            return {
                link: function(o, s, u) {
                    function l(e) {
                        s.text(e || "")
                    }
                    var c, f = u.count,
                        p = u.$attr.when && s.attr(u.$attr.when),
                        d = u.offset || 0,
                        h = o.$eval(p) || {},
                        g = {},
                        v = t.startSymbol(),
                        $ = t.endSymbol(),
                        b = v + f + "-" + d + $,
                        w = Br.noop;
                    a(u, function(e, t) {
                        var n = i.exec(t);
                        if (n) {
                            var r = (n[1] ? "-" : "") + Or(n[2]);
                            h[r] = s.attr(u.$attr[t])
                        }
                    }), a(h, function(e, n) {
                        g[n] = t(e.replace(r, b))
                    }), o.$watch(f, function(t) {
                        var r = parseFloat(t),
                            i = isNaN(r);
                        if (i || r in h || (r = e.pluralCat(r - d)), r !== c && !(i && k(c) && isNaN(c))) {
                            w();
                            var a = g[r];
                            y(a) ? (null != t && n.debug("ngPluralize: no rule defined for '" + r + "' in " + p), w = m, l()) : w = o.$watch(a, l), c = r
                        }
                    })
                }
            }
        }],
        Oo = ["$parse", "$animate", function(e, o) {
            var s = "$$NG_REMOVED",
                u = r("ngRepeat"),
                l = function(e, t, n, r, i, a, o) {
                    e[n] = r, i && (e[i] = a), e.$index = t, e.$first = 0 === t, e.$last = t === o - 1, e.$middle = !(e.$first || e.$last), e.$odd = !(e.$even = 0 === (1 & t))
                },
                c = function(e) {
                    return e.clone[0]
                },
                f = function(e) {
                    return e.clone[e.clone.length - 1]
                };
            return {
                restrict: "A",
                multiElement: !0,
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                compile: function(r, p) {
                    var d = p.ngRepeat,
                        h = t.createComment(" end ngRepeat: " + d + " "),
                        m = d.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                    if (!m) throw u("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", d);
                    var g = m[1],
                        v = m[2],
                        $ = m[3],
                        y = m[4];
                    if (m = g.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !m) throw u("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", g);
                    var b = m[3] || m[1],
                        w = m[2];
                    if ($ && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test($) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test($))) throw u("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", $);
                    var x, C, k, S, E = {
                        $id: Ze
                    };
                    return y ? x = e(y) : (k = function(e, t) {
                            return Ze(t)
                        }, S = function(e) {
                            return e
                        }),
                        function(e, t, r, p, m) {
                            x && (C = function(t, n, r) {
                                return w && (E[w] = t), E[b] = n, E.$index = r, x(e, E)
                            });
                            var g = ve();
                            e.$watchCollection(v, function(r) {
                                var p, v, y, x, E, D, T, A, O, M, P, j, N = t[0],
                                    L = ve();
                                if ($ && (e[$] = r), i(r)) O = r, A = C || k;
                                else {
                                    A = C || S, O = [];
                                    for (var I in r) Ar.call(r, I) && "$" !== I.charAt(0) && O.push(I)
                                }
                                for (x = O.length, P = new Array(x), p = 0; x > p; p++)
                                    if (E = r === O ? p : O[p], D = r[E], T = A(E, D, p), g[T]) M = g[T], delete g[T], L[T] = M, P[p] = M;
                                    else {
                                        if (L[T]) throw a(P, function(e) {
                                            e && e.scope && (g[e.id] = e)
                                        }), u("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", d, T, D);
                                        P[p] = {
                                            id: T,
                                            scope: n,
                                            clone: n
                                        }, L[T] = !0
                                    }
                                for (var F in g) {
                                    if (M = g[F], j = ge(M.clone), o.leave(j), j[0].parentNode)
                                        for (p = 0, v = j.length; v > p; p++) j[p][s] = !0;
                                    M.scope.$destroy()
                                }
                                for (p = 0; x > p; p++)
                                    if (E = r === O ? p : O[p], D = r[E], M = P[p], M.scope) {
                                        y = N;
                                        do y = y.nextSibling; while (y && y[s]);
                                        c(M) != y && o.move(ge(M.clone), null, Lr(N)), N = f(M), l(M.scope, p, b, D, w, E, x)
                                    } else m(function(e, t) {
                                        M.scope = t;
                                        var n = h.cloneNode(!1);
                                        e[e.length++] = n, o.enter(e, null, Lr(N)), N = n, M.clone = e, L[M.id] = M, l(M.scope, p, b, D, w, E, x)
                                    });
                                g = L
                            })
                        }
                }
            }
        }],
        Mo = "ng-hide",
        Po = "ng-hide-animate",
        jo = ["$animate", function(e) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(t, n, r) {
                    t.$watch(r.ngShow, function(t) {
                        e[t ? "removeClass" : "addClass"](n, Mo, {
                            tempClasses: Po
                        })
                    })
                }
            }
        }],
        No = ["$animate", function(e) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(t, n, r) {
                    t.$watch(r.ngHide, function(t) {
                        e[t ? "addClass" : "removeClass"](n, Mo, {
                            tempClasses: Po
                        })
                    })
                }
            }
        }],
        Lo = sr(function(e, t, n) {
            e.$watch(n.ngStyle, function(e, n) {
                n && e !== n && a(n, function(e, n) {
                    t.css(n, "")
                }), e && t.css(e)
            }, !0)
        }),
        Io = ["$animate", function(e) {
            return {
                require: "ngSwitch",
                controller: ["$scope", function() {
                    this.cases = {}
                }],
                link: function(n, r, i, o) {
                    var s = i.ngSwitch || i.on,
                        u = [],
                        l = [],
                        c = [],
                        f = [],
                        p = function(e, t) {
                            return function() {
                                e.splice(t, 1)
                            }
                        };
                    n.$watch(s, function(n) {
                        var r, i;
                        for (r = 0, i = c.length; i > r; ++r) e.cancel(c[r]);
                        for (c.length = 0, r = 0, i = f.length; i > r; ++r) {
                            var s = ge(l[r].clone);
                            f[r].$destroy();
                            var d = c[r] = e.leave(s);
                            d.then(p(c, r))
                        }
                        l.length = 0, f.length = 0, (u = o.cases["!" + n] || o.cases["?"]) && a(u, function(n) {
                            n.transclude(function(r, i) {
                                f.push(i);
                                var a = n.element;
                                r[r.length++] = t.createComment(" end ngSwitchWhen: ");
                                var o = {
                                    clone: r
                                };
                                l.push(o), e.enter(r, a.parent(), a)
                            })
                        })
                    })
                }
            }
        }],
        Fo = sr({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(e, t, n, r, i) {
                r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
                    transclude: i,
                    element: t
                })
            }
        }),
        qo = sr({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(e, t, n, r, i) {
                r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
                    transclude: i,
                    element: t
                })
            }
        }),
        Vo = r("ngTransclude"),
        Ro = sr({
            restrict: "EAC",
            link: function(e, t, n, r, i) {
                function a(e) {
                    e.length && (t.empty(), t.append(e))
                }
                if (n.ngTransclude === n.$attr.ngTransclude && (n.ngTransclude = ""), !i) throw Vo("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", Z(t));
                var o = n.ngTransclude || n.ngTranscludeSlot;
                i(a, null, o)
            }
        }),
        Uo = ["$templateCache", function(e) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function(t, n) {
                    if ("text/ng-template" == n.type) {
                        var r = n.id,
                            i = t[0].text;
                        e.put(r, i)
                    }
                }
            }
        }],
        Ho = {
            $setViewValue: m,
            $render: m
        },
        _o = ["$element", "$scope", "$attrs", function(e, r, i) {
            var a = this,
                o = new et;
            a.ngModelCtrl = Ho, a.unknownOption = Lr(t.createElement("option")), a.renderUnknownOption = function(t) {
                var n = "? " + Ze(t) + " ?";
                a.unknownOption.val(n), e.prepend(a.unknownOption), e.val(n)
            }, r.$on("$destroy", function() {
                a.renderUnknownOption = m
            }), a.removeUnknownOption = function() {
                a.unknownOption.parent() && a.unknownOption.remove()
            }, a.readValue = function() {
                return a.removeUnknownOption(), e.val()
            }, a.writeValue = function(t) {
                a.hasOption(t) ? (a.removeUnknownOption(), e.val(t), "" === t && a.emptyOption.prop("selected", !0)) : null == t && a.emptyOption ? (a.removeUnknownOption(), e.val("")) : a.renderUnknownOption(t)
            }, a.addOption = function(e, t) {
                if (t[0].nodeType !== ai) {
                    he(e, '"option value"'), "" === e && (a.emptyOption = t);
                    var n = o.get(e) || 0;
                    o.put(e, n + 1), a.ngModelCtrl.$render(), Er(t)
                }
            }, a.removeOption = function(e) {
                var t = o.get(e);
                t && (1 === t ? (o.remove(e), "" === e && (a.emptyOption = n)) : o.put(e, t - 1))
            }, a.hasOption = function(e) {
                return !!o.get(e)
            }, a.registerOption = function(e, t, n, r, i) {
                if (r) {
                    var o;
                    n.$observe("value", function(e) {
                        b(o) && a.removeOption(o), o = e, a.addOption(e, t)
                    })
                } else i ? e.$watch(i, function(e, r) {
                    n.$set("value", e), r !== e && a.removeOption(r), a.addOption(e, t)
                }) : a.addOption(n.value, t);
                t.on("$destroy", function() {
                    a.removeOption(n.value), a.ngModelCtrl.$render()
                })
            }
        }],
        Bo = function() {
            function e(e, t, n, r) {
                var i = r[1];
                if (i) {
                    var o = r[0];
                    if (o.ngModelCtrl = i, t.on("change", function() {
                            e.$apply(function() {
                                i.$setViewValue(o.readValue())
                            })
                        }), n.multiple) {
                        o.readValue = function() {
                            var e = [];
                            return a(t.find("option"), function(t) {
                                t.selected && e.push(t.value)
                            }), e
                        }, o.writeValue = function(e) {
                            var n = new et(e);
                            a(t.find("option"), function(e) {
                                e.selected = b(n.get(e.value))
                            })
                        };
                        var s, u = NaN;
                        e.$watch(function() {
                            u !== i.$viewValue || _(s, i.$viewValue) || (s = H(i.$viewValue), i.$render()), u = i.$viewValue
                        }), i.$isEmpty = function(e) {
                            return !e || 0 === e.length
                        }
                    }
                }
            }

            function t(e, t, n, r) {
                var i = r[1];
                if (i) {
                    var a = r[0];
                    i.$render = function() {
                        a.writeValue(i.$viewValue)
                    }
                }
            }
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: _o,
                priority: 1,
                link: {
                    pre: e,
                    post: t
                }
            }
        },
        zo = ["$interpolate", function(e) {
            return {
                restrict: "E",
                priority: 100,
                compile: function(t, n) {
                    if (b(n.value)) var r = e(n.value, !0);
                    else {
                        var i = e(t.text(), !0);
                        i || n.$set("value", t.text())
                    }
                    return function(e, t, n) {
                        var a = "$selectController",
                            o = t.parent(),
                            s = o.data(a) || o.parent().data(a);
                        s && s.registerOption(e, t, n, r, i)
                    }
                }
            }
        }],
        Wo = v({
            restrict: "E",
            terminal: !1
        }),
        Yo = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, n, r) {
                    r && (n.required = !0, r.$validators.required = function(e, t) {
                        return !n.required || !r.$isEmpty(t)
                    }, n.$observe("required", function() {
                        r.$validate()
                    }))
                }
            }
        },
        Go = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, i, a) {
                    if (a) {
                        var o, s = i.ngPattern || i.pattern;
                        i.$observe("pattern", function(e) {
                            if (C(e) && e.length > 0 && (e = new RegExp("^" + e + "$")), e && !e.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, e, Z(t));
                            o = e || n, a.$validate()
                        }), a.$validators.pattern = function(e, t) {
                            return a.$isEmpty(t) || y(o) || o.test(t)
                        }
                    }
                }
            }
        },
        Ko = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, n, r) {
                    if (r) {
                        var i = -1;
                        n.$observe("maxlength", function(e) {
                            var t = d(e);
                            i = isNaN(t) ? -1 : t, r.$validate()
                        }), r.$validators.maxlength = function(e, t) {
                            return 0 > i || r.$isEmpty(t) || t.length <= i
                        }
                    }
                }
            }
        },
        Xo = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, n, r) {
                    if (r) {
                        var i = 0;
                        n.$observe("minlength", function(e) {
                            i = d(e) || 0, r.$validate()
                        }), r.$validators.minlength = function(e, t) {
                            return r.$isEmpty(t) || t.length >= i
                        }
                    }
                }
            }
        };
    return e.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (fe(), we(Br), Br.module("ngLocale", [], ["$provide", function(e) {
        function t(e) {
            e += "";
            var t = e.indexOf(".");
            return -1 == t ? 0 : e.length - t - 1
        }

        function r(e, r) {
            var i = r;
            n === i && (i = Math.min(t(e), 3));
            var a = Math.pow(10, i),
                o = (e * a | 0) % a;
            return {
                v: i,
                f: o
            }
        }
        var i = {
            ZERO: "zero",
            ONE: "one",
            TWO: "two",
            FEW: "few",
            MANY: "many",
            OTHER: "other"
        };
        e.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: ["AM", "PM"],
                DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                ERANAMES: ["Before Christ", "Anno Domini"],
                ERAS: ["BC", "AD"],
                FIRSTDAYOFWEEK: 6,
                MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                STANDALONEMONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                WEEKENDRANGE: [5, 6],
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                medium: "MMM d, y h:mm:ss a",
                mediumDate: "MMM d, y",
                mediumTime: "h:mm:ss a",
                "short": "M/d/yy h:mm a",
                shortDate: "M/d/yy",
                shortTime: "h:mm a"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "$",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [{
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-¤",
                    negSuf: "",
                    posPre: "¤",
                    posSuf: ""
                }]
            },
            id: "en-us",
            localeID: "en_US",
            pluralCat: function(e, t) {
                var n = 0 | e,
                    a = r(e, t);
                return 1 == n && 0 == a.v ? i.ONE : i.OTHER
            }
        })
    }]), void Lr(t).ready(function() {
        oe(t, se)
    }))
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'),
    function(e, t, n) {
        "use strict";

        function r() {
            function e(e, n) {
                return t.extend(Object.create(e), n)
            }

            function n(e, t) {
                var n = t.caseInsensitiveMatch,
                    r = {
                        originalPath: e,
                        regexp: e
                    },
                    i = r.keys = [];
                return e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(e, t, n, r) {
                    var a = "?" === r ? r : null,
                        o = "*" === r ? r : null;
                    return i.push({
                        name: n,
                        optional: !!a
                    }), t = t || "", "" + (a ? "" : t) + "(?:" + (a ? t : "") + (o && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "")
                }).replace(/([\/$\*])/g, "\\$1"), r.regexp = new RegExp("^" + e + "$", n ? "i" : ""), r
            }
            var r = {};
            this.when = function(e, i) {
                var a = t.copy(i);
                if (t.isUndefined(a.reloadOnSearch) && (a.reloadOnSearch = !0), t.isUndefined(a.caseInsensitiveMatch) && (a.caseInsensitiveMatch = this.caseInsensitiveMatch), r[e] = t.extend(a, e && n(e, a)), e) {
                    var o = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
                    r[o] = t.extend({
                        redirectTo: e
                    }, n(o, a))
                }
                return this
            }, this.caseInsensitiveMatch = !1, this.otherwise = function(e) {
                return "string" == typeof e && (e = {
                    redirectTo: e
                }), this.when(null, e), this
            }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(n, i, a, o, s, l, c) {
                function f(e, t) {
                    var n = t.keys,
                        r = {};
                    if (!t.regexp) return null;
                    var i = t.regexp.exec(e);
                    if (!i) return null;
                    for (var a = 1, o = i.length; o > a; ++a) {
                        var s = n[a - 1],
                            u = i[a];
                        s && u && (r[s.name] = u)
                    }
                    return r
                }

                function p(e) {
                    var r = y.current;
                    g = h(), v = g && r && g.$$route === r.$$route && t.equals(g.pathParams, r.pathParams) && !g.reloadOnSearch && !$, v || !r && !g || n.$broadcast("$routeChangeStart", g, r).defaultPrevented && e && e.preventDefault()
                }

                function d() {
                    var e = y.current,
                        r = g;
                    v ? (e.params = r.params, t.copy(e.params, a), n.$broadcast("$routeUpdate", e)) : (r || e) && ($ = !1, y.current = r, r && r.redirectTo && (t.isString(r.redirectTo) ? i.path(m(r.redirectTo, r.params)).search(r.params).replace() : i.url(r.redirectTo(r.pathParams, i.path(), i.search())).replace()), o.when(r).then(function() {
                        if (r) {
                            var e, n, i = t.extend({}, r.resolve);
                            return t.forEach(i, function(e, n) {
                                i[n] = t.isString(e) ? s.get(e) : s.invoke(e, null, null, n)
                            }), t.isDefined(e = r.template) ? t.isFunction(e) && (e = e(r.params)) : t.isDefined(n = r.templateUrl) && (t.isFunction(n) && (n = n(r.params)), t.isDefined(n) && (r.loadedTemplateUrl = c.valueOf(n), e = l(n))), t.isDefined(e) && (i.$template = e), o.all(i)
                        }
                    }).then(function(i) {
                        r == y.current && (r && (r.locals = i, t.copy(r.params, a)), n.$broadcast("$routeChangeSuccess", r, e))
                    }, function(t) {
                        r == y.current && n.$broadcast("$routeChangeError", r, e, t)
                    }))
                }

                function h() {
                    var n, a;
                    return t.forEach(r, function(r, o) {
                        !a && (n = f(i.path(), r)) && (a = e(r, {
                            params: t.extend({}, i.search(), n),
                            pathParams: n
                        }), a.$$route = r)
                    }), a || r[null] && e(r[null], {
                        params: {},
                        pathParams: {}
                    })
                }

                function m(e, n) {
                    var r = [];
                    return t.forEach((e || "").split(":"), function(e, t) {
                        if (0 === t) r.push(e);
                        else {
                            var i = e.match(/(\w+)(?:[?*])?(.*)/),
                                a = i[1];
                            r.push(n[a]), r.push(i[2] || ""), delete n[a]
                        }
                    }), r.join("")
                }
                var g, v, $ = !1,
                    y = {
                        routes: r,
                        reload: function() {
                            $ = !0;
                            var e = {
                                defaultPrevented: !1,
                                preventDefault: function() {
                                    this.defaultPrevented = !0, $ = !1
                                }
                            };
                            n.$evalAsync(function() {
                                p(e), e.defaultPrevented || d()
                            })
                        },
                        updateParams: function(e) {
                            if (!this.current || !this.current.$$route) throw u("norout", "Tried updating route when with no current route");
                            e = t.extend({}, this.current.params, e), i.path(m(this.current.$$route.originalPath, e)), i.search(e)
                        }
                    };
                return n.$on("$locationChangeStart", p), n.$on("$locationChangeSuccess", d), y
            }]
        }

        function i() {
            this.$get = function() {
                return {}
            }
        }

        function a(e, n, r) {
            return {
                restrict: "ECA",
                terminal: !0,
                priority: 400,
                transclude: "element",
                link: function(i, a, o, s, u) {
                    function l() {
                        d && (r.cancel(d), d = null), f && (f.$destroy(), f = null), p && (d = r.leave(p), d.then(function() {
                            d = null
                        }), p = null)
                    }

                    function c() {
                        var o = e.current && e.current.locals,
                            s = o && o.$template;
                        if (t.isDefined(s)) {
                            var c = i.$new(),
                                d = e.current,
                                g = u(c, function(e) {
                                    r.enter(e, null, p || a).then(function() {
                                        !t.isDefined(h) || h && !i.$eval(h) || n()
                                    }), l()
                                });
                            p = g, f = d.scope = c, f.$emit("$viewContentLoaded"), f.$eval(m)
                        } else l()
                    }
                    var f, p, d, h = o.autoscroll,
                        m = o.onload || "";
                    i.$on("$routeChangeSuccess", c), c()
                }
            }
        }

        function o(e, t, n) {
            return {
                restrict: "ECA",
                priority: -400,
                link: function(r, i) {
                    var a = n.current,
                        o = a.locals;
                    i.html(o.$template);
                    var s = e(i.contents());
                    if (a.controller) {
                        o.$scope = r;
                        var u = t(a.controller, o);
                        a.controllerAs && (r[a.controllerAs] = u), i.data("$ngControllerController", u), i.children().data("$ngControllerController", u)
                    }
                    r[a.resolveAs || "$resolve"] = o, s(r)
                }
            }
        }
        var s = t.module("ngRoute", ["ng"]).provider("$route", r),
            u = t.$$minErr("ngRoute");
        s.provider("$routeParams", i), s.directive("ngView", a), s.directive("ngView", o), a.$inject = ["$route", "$anchorScroll", "$animate"], o.$inject = ["$compile", "$controller", "$route"]
    }(window, window.angular),
    function(e, t, n) {
        "use strict";

        function r(e, n, r) {
            function i(e, r, i) {
                var o, s;
                i = i || {}, s = i.expires, o = t.isDefined(i.path) ? i.path : a, t.isUndefined(r) && (s = "Thu, 01 Jan 1970 00:00:00 GMT", r = ""), t.isString(s) && (s = new Date(s));
                var u = encodeURIComponent(e) + "=" + encodeURIComponent(r);
                u += o ? ";path=" + o : "", u += i.domain ? ";domain=" + i.domain : "", u += s ? ";expires=" + s.toUTCString() : "", u += i.secure ? ";secure" : "";
                var l = u.length + 1;
                return l > 4096 && n.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + l + " > 4096 bytes)!"), u
            }
            var a = r.baseHref(),
                o = e[0];
            return function(e, t, n) {
                o.cookie = i(e, t, n)
            }
        }
        t.module("ngCookies", ["ng"]).provider("$cookies", [function() {
            function e(e) {
                return e ? t.extend({}, r, e) : r
            }
            var r = this.defaults = {};
            this.$get = ["$$cookieReader", "$$cookieWriter", function(r, i) {
                return {
                    get: function(e) {
                        return r()[e]
                    },
                    getObject: function(e) {
                        var n = this.get(e);
                        return n ? t.fromJson(n) : n
                    },
                    getAll: function() {
                        return r()
                    },
                    put: function(t, n, r) {
                        i(t, n, e(r))
                    },
                    putObject: function(e, n, r) {
                        this.put(e, t.toJson(n), r)
                    },
                    remove: function(t, r) {
                        i(t, n, e(r))
                    }
                }
            }]
        }]), t.module("ngCookies").factory("$cookieStore", ["$cookies", function(e) {
            return {
                get: function(t) {
                    return e.getObject(t)
                },
                put: function(t, n) {
                    e.putObject(t, n)
                },
                remove: function(t) {
                    e.remove(t)
                }
            }
        }]), r.$inject = ["$document", "$log", "$browser"], t.module("ngCookies").provider("$$cookieWriter", function() {
            this.$get = r
        })
    }(window, window.angular),
    function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            if (!e) throw me("areq", "Argument '{0}' is {1}", t || "?", n || "required");
            return e
        }

        function i(e, t) {
            return e || t ? e ? t ? (_(e) && (e = e.join(" ")), _(t) && (t = t.join(" ")), e + " " + t) : e : t : ""
        }

        function a(e) {
            var t = {};
            return e && (e.to || e.from) && (t.to = e.to, t.from = e.from), t
        }

        function o(e, t, n) {
            var r = "";
            return e = _(e) ? e : e && B(e) && e.length ? e.split(/\s+/) : [], H(e, function(e, i) {
                e && e.length > 0 && (r += i > 0 ? " " : "", r += n ? t + e : e + t)
            }), r
        }

        function s(e, t) {
            var n = e.indexOf(t);
            t >= 0 && e.splice(n, 1)
        }

        function u(e) {
            if (e instanceof U) switch (e.length) {
                case 0:
                    return [];
                case 1:
                    if (e[0].nodeType === X) return e;
                    break;
                default:
                    return U(l(e))
            }
            return e.nodeType === X ? U(e) : void 0
        }

        function l(e) {
            if (!e[0]) return e;
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (n.nodeType == X) return n
            }
        }

        function c(e, t, n) {
            H(t, function(t) {
                e.addClass(t, n)
            })
        }

        function f(e, t, n) {
            H(t, function(t) {
                e.removeClass(t, n)
            })
        }

        function p(e) {
            return function(t, n) {
                n.addClass && (c(e, t, n.addClass), n.addClass = null), n.removeClass && (f(e, t, n.removeClass), n.removeClass = null)
            }
        }

        function d(e) {
            if (e = e || {}, !e.$$prepared) {
                var t = e.domOperation || q;
                e.domOperation = function() {
                    e.$$domOperationFired = !0, t(), t = q
                }, e.$$prepared = !0
            }
            return e
        }

        function h(e, t) {
            m(e, t), g(e, t)
        }

        function m(e, t) {
            t.from && (e.css(t.from), t.from = null)
        }

        function g(e, t) {
            t.to && (e.css(t.to), t.to = null)
        }

        function v(e, t, n) {
            var r = (t.addClass || "") + " " + (n.addClass || ""),
                i = (t.removeClass || "") + " " + (n.removeClass || ""),
                a = $(e.attr("class"), r, i);
            n.preparationClasses && (t.preparationClasses = S(n.preparationClasses, t.preparationClasses), delete n.preparationClasses);
            var o = t.domOperation !== q ? t.domOperation : null;
            return R(t, n), o && (t.domOperation = o), a.addClass ? t.addClass = a.addClass : t.addClass = null, a.removeClass ? t.removeClass = a.removeClass : t.removeClass = null, t
        }

        function $(e, t, n) {
            function r(e) {
                B(e) && (e = e.split(" "));
                var t = {};
                return H(e, function(e) {
                    e.length && (t[e] = !0)
                }), t
            }
            var i = 1,
                a = -1,
                o = {};
            e = r(e), t = r(t), H(t, function(e, t) {
                o[t] = i
            }), n = r(n), H(n, function(e, t) {
                o[t] = o[t] === i ? null : a
            });
            var s = {
                addClass: "",
                removeClass: ""
            };
            return H(o, function(t, n) {
                var r, o;
                t === i ? (r = "addClass", o = !e[n]) : t === a && (r = "removeClass", o = e[n]), o && (s[r].length && (s[r] += " "), s[r] += n)
            }), s
        }

        function y(e) {
            return e instanceof t.element ? e[0] : e
        }

        function b(e, t, n) {
            var r = "";
            t && (r = o(t, Z, !0)), n.addClass && (r = S(r, o(n.addClass, J))), n.removeClass && (r = S(r, o(n.removeClass, Q))), r.length && (n.preparationClasses = r, e.addClass(r))
        }

        function w(e, t) {
            t.preparationClasses && (e.removeClass(t.preparationClasses), t.preparationClasses = null), t.activeClasses && (e.removeClass(t.activeClasses), t.activeClasses = null)
        }

        function x(e, t) {
            var n = t ? "-" + t + "s" : "";
            return k(e, [de, n]), [de, n]
        }

        function C(e, t) {
            var n = t ? "paused" : "",
                r = I + le;
            return k(e, [r, n]), [r, n]
        }

        function k(e, t) {
            var n = t[0],
                r = t[1];
            e.style[n] = r
        }

        function S(e, t) {
            return e ? t ? e + " " + t : e : t
        }

        function E(e) {
            return [pe, e + "s"]
        }

        function D(e, t) {
            var n = t ? fe : de;
            return [n, e + "s"]
        }

        function T(e, t, n) {
            var r = Object.create(null),
                i = e.getComputedStyle(t) || {};
            return H(n, function(e, t) {
                var n = i[e];
                if (n) {
                    var a = n.charAt(0);
                    ("-" === a || "+" === a || a >= 0) && (n = A(n)), 0 === n && (n = null), r[t] = n
                }
            }), r
        }

        function A(e) {
            var t = 0,
                n = e.split(/\s*,\s*/);
            return H(n, function(e) {
                "s" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), e = parseFloat(e) || 0, t = t ? Math.max(e, t) : e
            }), t
        }

        function O(e) {
            return 0 === e || null != e
        }

        function M(e, t) {
            var n = N,
                r = e + "s";
            return t ? n += ie : r += " linear all", [n, r]
        }

        function P() {
            var e = Object.create(null);
            return {
                flush: function() {
                    e = Object.create(null)
                },
                count: function(t) {
                    var n = e[t];
                    return n ? n.total : 0
                },
                get: function(t) {
                    var n = e[t];
                    return n && n.value
                },
                put: function(t, n) {
                    e[t] ? e[t].total++ : e[t] = {
                        total: 1,
                        value: n
                    }
                }
            }
        }

        function j(e, t, n) {
            H(n, function(n) {
                e[n] = Y(e[n]) ? e[n] : t.style.getPropertyValue(n)
            })
        }
        var N, L, I, F, q = t.noop,
            V = t.copy,
            R = t.extend,
            U = t.element,
            H = t.forEach,
            _ = t.isArray,
            B = t.isString,
            z = t.isObject,
            W = t.isUndefined,
            Y = t.isDefined,
            G = t.isFunction,
            K = t.isElement,
            X = 1,
            J = "-add",
            Q = "-remove",
            Z = "ng-",
            ee = "-active",
            te = "ng-animate",
            ne = "$$ngAnimateChildren",
            re = "";
        W(e.ontransitionend) && Y(e.onwebkittransitionend) ? (re = "-webkit-", N = "WebkitTransition", L = "webkitTransitionEnd transitionend") : (N = "transition", L = "transitionend"), W(e.onanimationend) && Y(e.onwebkitanimationend) ? (re = "-webkit-", I = "WebkitAnimation", F = "webkitAnimationEnd animationend") : (I = "animation", F = "animationend");
        var ie = "Duration",
            ae = "Property",
            oe = "Delay",
            se = "TimingFunction",
            ue = "IterationCount",
            le = "PlayState",
            ce = 9999,
            fe = I + oe,
            pe = I + ie,
            de = N + oe,
            he = N + ie,
            me = t.$$minErr("ng"),
            ge = ["$$rAF", function(e) {
                function t(e) {
                    r = r.concat(e), n()
                }

                function n() {
                    if (r.length) {
                        for (var t = r.shift(), a = 0; a < t.length; a++) t[a]();
                        i || e(function() {
                            i || n()
                        })
                    }
                }
                var r, i;
                return r = t.queue = [], t.waitUntilQuiet = function(t) {
                    i && i(), i = e(function() {
                        i = null, t(), n()
                    })
                }, t
            }],
            ve = [function() {
                return function(e, n, r) {
                    var i = r.ngAnimateChildren;
                    t.isString(i) && 0 === i.length ? n.data(ne, !0) : r.$observe("ngAnimateChildren", function(e) {
                        e = "on" === e || "true" === e, n.data(ne, e)
                    })
                }
            }],
            $e = "$$animateCss",
            ye = 1e3,
            be = 3,
            we = 1.5,
            xe = {
                transitionDuration: he,
                transitionDelay: de,
                transitionProperty: N + ae,
                animationDuration: pe,
                animationDelay: fe,
                animationIterationCount: I + ue
            },
            Ce = {
                transitionDuration: he,
                transitionDelay: de,
                animationDuration: pe,
                animationDelay: fe
            },
            ke = ["$animateProvider", function(e) {
                var t = P(),
                    n = P();
                this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function(e, r, i, u, l, c, f, v) {
                    function $(e, t) {
                        var n = "$$ngAnimateParentKey",
                            r = e.parentNode,
                            i = r[n] || (r[n] = ++R);
                        return i + "-" + e.getAttribute("class") + "-" + t
                    }

                    function b(n, r, i, a) {
                        var o = t.get(i);
                        return o || (o = T(e, n, a), "infinite" === o.animationIterationCount && (o.animationIterationCount = 1)), t.put(i, o), o
                    }

                    function w(i, a, s, u) {
                        var l;
                        if (t.count(s) > 0 && (l = n.get(s), !l)) {
                            var c = o(a, "-stagger");
                            r.addClass(i, c), l = T(e, i, u), l.animationDuration = Math.max(l.animationDuration, 0), l.transitionDuration = Math.max(l.transitionDuration, 0), r.removeClass(i, c), n.put(s, l)
                        }
                        return l || {}
                    }

                    function S(e) {
                        U.push(e), f.waitUntilQuiet(function() {
                            t.flush(), n.flush();
                            for (var e = l(), r = 0; r < U.length; r++) U[r](e);
                            U.length = 0
                        })
                    }

                    function A(e, t, n) {
                        var r = b(e, t, n, xe),
                            i = r.animationDelay,
                            a = r.transitionDelay;
                        return r.maxDelay = i && a ? Math.max(i, a) : i || a, r.maxDuration = Math.max(r.animationDuration * r.animationIterationCount, r.transitionDuration), r
                    }
                    var P = p(r),
                        R = 0,
                        U = [];
                    return function(e, n) {
                        function l() {
                            p()
                        }

                        function f() {
                            p(!0)
                        }

                        function p(t) {
                            Y || K && G || (Y = !0, G = !1, B.$$skipPreparationClasses || r.removeClass(e, xe), r.removeClass(e, Se), C(W, !1), x(W, !1), H(le, function(e) {
                                W.style[e[0]] = ""
                            }), P(e, B), h(e, B), Object.keys(z).length && H(z, function(e, t) {
                                e ? W.style.setProperty(t, e) : W.style.removeProperty(t)
                            }), B.onDone && B.onDone(), de && de.length && e.off(de.join(" "), R), X && X.complete(!t))
                        }

                        function b(e) {
                            Ve.blockTransition && x(W, e), Ve.blockKeyframeAnimation && C(W, !!e)
                        }

                        function T() {
                            return X = new i({
                                end: l,
                                cancel: f
                            }), S(q), p(), {
                                $$willAnimate: !1,
                                start: function() {
                                    return X
                                },
                                end: l
                            }
                        }

                        function R(e) {
                            e.stopPropagation();
                            var t = e.originalEvent || e,
                                n = t.$manualTimeStamp || Date.now(),
                                r = parseFloat(t.elapsedTime.toFixed(be));
                            Math.max(n - ue, 0) >= re && r >= ie && (K = !0, p())
                        }

                        function U() {
                            function t() {
                                if (!Y) {
                                    if (b(!1), H(le, function(e) {
                                            var t = e[0],
                                                n = e[1];
                                            W.style[t] = n
                                        }), P(e, B), r.addClass(e, Se), Ve.recalculateTimingStyles) {
                                        if (ke = W.className + " " + xe, Te = $(W, ke), Fe = A(W, ke, Te), qe = Fe.maxDelay, ne = Math.max(qe, 0), ie = Fe.maxDuration, 0 === ie) return void p();
                                        Ve.hasTransitions = Fe.transitionDuration > 0, Ve.hasAnimations = Fe.animationDuration > 0
                                    }
                                    if (Ve.applyAnimationDelay && (qe = "boolean" != typeof B.delay && O(B.delay) ? parseFloat(B.delay) : qe, ne = Math.max(qe, 0), Fe.animationDelay = qe, Re = D(qe, !0), le.push(Re), W.style[Re[0]] = Re[1]), re = ne * ye, oe = ie * ye, B.easing) {
                                        var t, i = B.easing;
                                        Ve.hasTransitions && (t = N + se, le.push([t, i]), W.style[t] = i), Ve.hasAnimations && (t = I + se, le.push([t, i]), W.style[t] = i)
                                    }
                                    Fe.transitionDuration && de.push(L), Fe.animationDuration && de.push(F), ue = Date.now();
                                    var a = re + we * oe,
                                        o = ue + a,
                                        s = e.data($e) || [],
                                        l = !0;
                                    if (s.length) {
                                        var c = s[0];
                                        l = o > c.expectedEndTime, l ? u.cancel(c.timer) : s.push(p)
                                    }
                                    if (l) {
                                        var f = u(n, a, !1);
                                        s[0] = {
                                            timer: f,
                                            expectedEndTime: o
                                        }, s.push(p), e.data($e, s)
                                    }
                                    de.length && e.on(de.join(" "), R), B.to && (B.cleanupStyles && j(z, W, Object.keys(B.to)), g(e, B))
                                }
                            }

                            function n() {
                                var t = e.data($e);
                                if (t) {
                                    for (var n = 1; n < t.length; n++) t[n]();
                                    e.removeData($e)
                                }
                            }
                            if (!Y) {
                                if (!W.parentNode) return void p();
                                var i = function(e) {
                                        if (K) G && e && (G = !1, p());
                                        else if (G = !e, Fe.animationDuration) {
                                            var t = C(W, G);
                                            G ? le.push(t) : s(le, t)
                                        }
                                    },
                                    a = Le > 0 && (Fe.transitionDuration && 0 === Ae.transitionDuration || Fe.animationDuration && 0 === Ae.animationDuration) && Math.max(Ae.animationDelay, Ae.transitionDelay);
                                a ? u(t, Math.floor(a * Le * ye), !1) : t(), te.resume = function() {
                                    i(!0)
                                }, te.pause = function() {
                                    i(!1)
                                }
                            }
                        }
                        var B = n || {};
                        B.$$prepared || (B = d(V(B)));
                        var z = {},
                            W = y(e);
                        if (!W || !W.parentNode || !v.enabled()) return T();
                        var Y, G, K, X, te, ne, re, ie, oe, ue, le = [],
                            fe = e.attr("class"),
                            pe = a(B),
                            de = [];
                        if (0 === B.duration || !c.animations && !c.transitions) return T();
                        var he = B.event && _(B.event) ? B.event.join(" ") : B.event,
                            me = he && B.structural,
                            ge = "",
                            ve = "";
                        me ? ge = o(he, Z, !0) : he && (ge = he), B.addClass && (ve += o(B.addClass, J)), B.removeClass && (ve.length && (ve += " "), ve += o(B.removeClass, Q)), B.applyClassesEarly && ve.length && P(e, B);
                        var xe = [ge, ve].join(" ").trim(),
                            ke = fe + " " + xe,
                            Se = o(xe, ee),
                            Ee = pe.to && Object.keys(pe.to).length > 0,
                            De = (B.keyframeStyle || "").length > 0;
                        if (!De && !Ee && !xe) return T();
                        var Te, Ae;
                        if (B.stagger > 0) {
                            var Oe = parseFloat(B.stagger);
                            Ae = {
                                transitionDelay: Oe,
                                animationDelay: Oe,
                                transitionDuration: 0,
                                animationDuration: 0
                            }
                        } else Te = $(W, ke), Ae = w(W, xe, Te, Ce);
                        B.$$skipPreparationClasses || r.addClass(e, xe);
                        var Me;
                        if (B.transitionStyle) {
                            var Pe = [N, B.transitionStyle];
                            k(W, Pe), le.push(Pe)
                        }
                        if (B.duration >= 0) {
                            Me = W.style[N].length > 0;
                            var je = M(B.duration, Me);
                            k(W, je), le.push(je)
                        }
                        if (B.keyframeStyle) {
                            var Ne = [I, B.keyframeStyle];
                            k(W, Ne), le.push(Ne)
                        }
                        var Le = Ae ? B.staggerIndex >= 0 ? B.staggerIndex : t.count(Te) : 0,
                            Ie = 0 === Le;
                        Ie && !B.skipBlocking && x(W, ce);
                        var Fe = A(W, ke, Te),
                            qe = Fe.maxDelay;
                        ne = Math.max(qe, 0), ie = Fe.maxDuration;
                        var Ve = {};
                        if (Ve.hasTransitions = Fe.transitionDuration > 0, Ve.hasAnimations = Fe.animationDuration > 0, Ve.hasTransitionAll = Ve.hasTransitions && "all" == Fe.transitionProperty, Ve.applyTransitionDuration = Ee && (Ve.hasTransitions && !Ve.hasTransitionAll || Ve.hasAnimations && !Ve.hasTransitions), Ve.applyAnimationDuration = B.duration && Ve.hasAnimations, Ve.applyTransitionDelay = O(B.delay) && (Ve.applyTransitionDuration || Ve.hasTransitions), Ve.applyAnimationDelay = O(B.delay) && Ve.hasAnimations, Ve.recalculateTimingStyles = ve.length > 0, (Ve.applyTransitionDuration || Ve.applyAnimationDuration) && (ie = B.duration ? parseFloat(B.duration) : ie, Ve.applyTransitionDuration && (Ve.hasTransitions = !0, Fe.transitionDuration = ie, Me = W.style[N + ae].length > 0, le.push(M(ie, Me))), Ve.applyAnimationDuration && (Ve.hasAnimations = !0, Fe.animationDuration = ie, le.push(E(ie)))), 0 === ie && !Ve.recalculateTimingStyles) return T();
                        if (null != B.delay) {
                            var Re;
                            "boolean" != typeof B.delay && (Re = parseFloat(B.delay), ne = Math.max(Re, 0)), Ve.applyTransitionDelay && le.push(D(Re)), Ve.applyAnimationDelay && le.push(D(Re, !0))
                        }
                        return null == B.duration && Fe.transitionDuration > 0 && (Ve.recalculateTimingStyles = Ve.recalculateTimingStyles || Ie), re = ne * ye, oe = ie * ye, B.skipBlocking || (Ve.blockTransition = Fe.transitionDuration > 0, Ve.blockKeyframeAnimation = Fe.animationDuration > 0 && Ae.animationDelay > 0 && 0 === Ae.animationDuration), B.from && (B.cleanupStyles && j(z, W, Object.keys(B.from)), m(e, B)), Ve.blockTransition || Ve.blockKeyframeAnimation ? b(ie) : B.skipBlocking || x(W, !1), {
                            $$willAnimate: !0,
                            end: l,
                            start: function() {
                                return Y ? void 0 : (te = {
                                    end: l,
                                    cancel: f,
                                    resume: null,
                                    pause: null
                                }, X = new i(te), S(U), X)
                            }
                        }
                    }
                }]
            }],
            Se = ["$$animationProvider", function(e) {
                function t(e) {
                    return e.parentNode && 11 === e.parentNode.nodeType
                }
                e.drivers.push("$$animateCssDriver");
                var n = "ng-animate-shim",
                    r = "ng-anchor",
                    i = "ng-anchor-out",
                    a = "ng-anchor-in";
                this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function(e, o, s, u, l, c, f) {
                    function d(e) {
                        return e.replace(/\bng-\S+\b/g, "")
                    }

                    function h(e, t) {
                        return B(e) && (e = e.split(" ")), B(t) && (t = t.split(" ")), e.filter(function(e) {
                            return -1 === t.indexOf(e)
                        }).join(" ")
                    }

                    function m(t, o, u) {
                        function l(e) {
                            var t = {},
                                n = y(e).getBoundingClientRect();
                            return H(["width", "height", "top", "left"], function(e) {
                                var r = n[e];
                                switch (e) {
                                    case "top":
                                        r += $.scrollTop;
                                        break;
                                    case "left":
                                        r += $.scrollLeft
                                }
                                t[e] = Math.floor(r) + "px"
                            }), t
                        }

                        function c() {
                            var t = e(g, {
                                addClass: i,
                                delay: !0,
                                from: l(o)
                            });
                            return t.$$willAnimate ? t : null
                        }

                        function f(e) {
                            return e.attr("class") || ""
                        }

                        function p() {
                            var t = d(f(u)),
                                n = h(t, v),
                                r = h(v, t),
                                o = e(g, {
                                    to: l(u),
                                    addClass: a + " " + n,
                                    removeClass: i + " " + r,
                                    delay: !0
                                });
                            return o.$$willAnimate ? o : null
                        }

                        function m() {
                            g.remove(), o.removeClass(n), u.removeClass(n)
                        }
                        var g = U(y(o).cloneNode(!0)),
                            v = d(f(g));
                        o.addClass(n), u.addClass(n), g.addClass(r), w.append(g);
                        var b, x = c();
                        if (!x && (b = p(), !b)) return m();
                        var C = x || b;
                        return {
                            start: function() {
                                function e() {
                                    n && n.end()
                                }
                                var t, n = C.start();
                                return n.done(function() {
                                    return n = null, !b && (b = p()) ? (n = b.start(), n.done(function() {
                                        n = null, m(), t.complete()
                                    }), n) : (m(), void t.complete())
                                }), t = new s({
                                    end: e,
                                    cancel: e
                                })
                            }
                        }
                    }

                    function g(e, t, n, r) {
                        var i = v(e, q),
                            a = v(t, q),
                            o = [];
                        return H(r, function(e) {
                            var t = e.out,
                                r = e["in"],
                                i = m(n, t, r);
                            i && o.push(i)
                        }), i || a || 0 !== o.length ? {
                            start: function() {
                                function e() {
                                    H(t, function(e) {
                                        e.end()
                                    })
                                }
                                var t = [];
                                i && t.push(i.start()), a && t.push(a.start()), H(o, function(e) {
                                    t.push(e.start())
                                });
                                var n = new s({
                                    end: e,
                                    cancel: e
                                });
                                return s.all(t, function(e) {
                                    n.complete(e)
                                }), n
                            }
                        } : void 0
                    }

                    function v(t) {
                        var n = t.element,
                            r = t.options || {};
                        t.structural && (r.event = t.event, r.structural = !0, r.applyClassesEarly = !0, "leave" === t.event && (r.onDone = r.domOperation)), r.preparationClasses && (r.event = S(r.event, r.preparationClasses));
                        var i = e(n, r);
                        return i.$$willAnimate ? i : null
                    }
                    if (!l.animations && !l.transitions) return q;
                    var $ = f[0].body,
                        b = y(u),
                        w = U(t(b) || $.contains(b) ? b : $);
                    p(c);
                    return function(e) {
                        return e.from && e.to ? g(e.from, e.to, e.classes, e.anchors) : v(e)
                    }
                }]
            }],
            Ee = ["$animateProvider", function(e) {
                this.$get = ["$injector", "$$AnimateRunner", "$$jqLite", function(t, n, r) {
                    function i(n) {
                        n = _(n) ? n : n.split(" ");
                        for (var r = [], i = {}, a = 0; a < n.length; a++) {
                            var o = n[a],
                                s = e.$$registeredAnimations[o];
                            s && !i[o] && (r.push(t.get(s)), i[o] = !0)
                        }
                        return r
                    }
                    var a = p(r);
                    return function(e, t, r, o) {
                        function s() {
                            o.domOperation(), a(e, o)
                        }

                        function u() {
                            p = !0, s(), h(e, o)
                        }

                        function l(e, t, r, i, a) {
                            var o;
                            switch (r) {
                                case "animate":
                                    o = [t, i.from, i.to, a];
                                    break;
                                case "setClass":
                                    o = [t, v, $, a];
                                    break;
                                case "addClass":
                                    o = [t, v, a];
                                    break;
                                case "removeClass":
                                    o = [t, $, a];
                                    break;
                                default:
                                    o = [t, a]
                            }
                            o.push(i);
                            var s = e.apply(e, o);
                            if (s)
                                if (G(s.start) && (s = s.start()), s instanceof n) s.done(a);
                                else if (G(s)) return s;
                            return q
                        }

                        function c(e, t, r, i, a) {
                            var o = [];
                            return H(i, function(i) {
                                var s = i[a];
                                s && o.push(function() {
                                    var i, a, o = !1,
                                        u = function(e) {
                                            o || (o = !0, (a || q)(e), i.complete(!e))
                                        };
                                    return i = new n({
                                        end: function() {
                                            u()
                                        },
                                        cancel: function() {
                                            u(!0)
                                        }
                                    }), a = l(s, e, t, r, function(e) {
                                        var t = e === !1;
                                        u(t)
                                    }), i
                                })
                            }), o
                        }

                        function f(e, t, r, i, a) {
                            var o = c(e, t, r, i, a);
                            if (0 === o.length) {
                                var s, u;
                                "beforeSetClass" === a ? (s = c(e, "removeClass", r, i, "beforeRemoveClass"), u = c(e, "addClass", r, i, "beforeAddClass")) : "setClass" === a && (s = c(e, "removeClass", r, i, "removeClass"), u = c(e, "addClass", r, i, "addClass")), s && (o = o.concat(s)), u && (o = o.concat(u))
                            }
                            if (0 !== o.length) return function(e) {
                                var t = [];
                                return o.length && H(o, function(e) {
                                        t.push(e())
                                    }), t.length ? n.all(t, e) : e(),
                                    function(e) {
                                        H(t, function(t) {
                                            e ? t.cancel() : t.end()
                                        })
                                    }
                            }
                        }
                        var p = !1;
                        3 === arguments.length && z(r) && (o = r, r = null), o = d(o), r || (r = e.attr("class") || "", o.addClass && (r += " " + o.addClass), o.removeClass && (r += " " + o.removeClass));
                        var m, g, v = o.addClass,
                            $ = o.removeClass,
                            y = i(r);
                        if (y.length) {
                            var b, w;
                            "leave" == t ? (w = "leave", b = "afterLeave") : (w = "before" + t.charAt(0).toUpperCase() + t.substr(1), b = t), "enter" !== t && "move" !== t && (m = f(e, t, o, y, w)), g = f(e, t, o, y, b)
                        }
                        if (m || g) {
                            var x;
                            return {
                                $$willAnimate: !0,
                                end: function() {
                                    return x ? x.end() : (u(), x = new n, x.complete(!0)), x
                                },
                                start: function() {
                                    function e(e) {
                                        u(e), x.complete(e)
                                    }

                                    function t(t) {
                                        p || ((r || q)(t), e(t))
                                    }
                                    if (x) return x;
                                    x = new n;
                                    var r, i = [];
                                    return m && i.push(function(e) {
                                        r = m(e)
                                    }), i.length ? i.push(function(e) {
                                        s(), e(!0)
                                    }) : s(), g && i.push(function(e) {
                                        r = g(e)
                                    }), x.setHost({
                                        end: function() {
                                            t()
                                        },
                                        cancel: function() {
                                            t(!0)
                                        }
                                    }), n.chain(i, e), x
                                }
                            }
                        }
                    }
                }]
            }],
            De = ["$$animationProvider", function(e) {
                e.drivers.push("$$animateJsDriver"), this.$get = ["$$animateJs", "$$AnimateRunner", function(e, t) {
                    function n(t) {
                        var n = t.element,
                            r = t.event,
                            i = t.options,
                            a = t.classes;
                        return e(n, r, a, i)
                    }
                    return function(e) {
                        if (e.from && e.to) {
                            var r = n(e.from),
                                i = n(e.to);
                            if (!r && !i) return;
                            return {
                                start: function() {
                                    function e() {
                                        return function() {
                                            H(a, function(e) {
                                                e.end()
                                            })
                                        }
                                    }

                                    function n(e) {
                                        o.complete(e)
                                    }
                                    var a = [];
                                    r && a.push(r.start()), i && a.push(i.start()), t.all(a, n);
                                    var o = new t({
                                        end: e(),
                                        cancel: e()
                                    });
                                    return o
                                }
                            }
                        }
                        return n(e)
                    }
                }]
            }],
            Te = "data-ng-animate",
            Ae = "$ngAnimatePin",
            Oe = ["$animateProvider", function(e) {
                function t(e) {
                    if (!e) return null;
                    var t = e.split(c),
                        n = Object.create(null);
                    return H(t, function(e) {
                        n[e] = !0
                    }), n
                }

                function n(e, n) {
                    if (e && n) {
                        var r = t(n);
                        return e.split(c).some(function(e) {
                            return r[e]
                        })
                    }
                }

                function i(e, t, n, r) {
                    return f[e].some(function(e) {
                        return e(t, n, r)
                    })
                }

                function a(e, t) {
                    e = e || {};
                    var n = (e.addClass || "").length > 0,
                        r = (e.removeClass || "").length > 0;
                    return t ? n && r : n || r
                }
                var o = 1,
                    s = 2,
                    c = " ",
                    f = this.rules = {
                        skip: [],
                        cancel: [],
                        join: []
                    };
                f.join.push(function(e, t, n) {
                    return !t.structural && a(t.options)
                }), f.skip.push(function(e, t, n) {
                    return !t.structural && !a(t.options)
                }), f.skip.push(function(e, t, n) {
                    return "leave" == n.event && t.structural
                }), f.skip.push(function(e, t, n) {
                    return n.structural && n.state === s && !t.structural
                }), f.cancel.push(function(e, t, n) {
                    return n.structural && t.structural
                }), f.cancel.push(function(e, t, n) {
                    return n.state === s && t.structural
                }), f.cancel.push(function(e, t, r) {
                    var i = t.options.addClass,
                        a = t.options.removeClass,
                        o = r.options.addClass,
                        s = r.options.removeClass;
                    return W(i) && W(a) || W(o) && W(s) ? !1 : n(i, s) || n(a, o)
                }), this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function(t, n, c, f, m, g, $, x, C, k) {
                    function S() {
                        var e = !1;
                        return function(t) {
                            e ? t() : n.$$postDigest(function() {
                                e = !0, t()
                            })
                        }
                    }

                    function E(e, t) {
                        return v(e, t, {})
                    }

                    function D(e, t, n) {
                        var r = y(t),
                            i = y(e),
                            a = [],
                            o = q[n];
                        return o && H(o, function(e) {
                            Z.call(e.node, r) ? a.push(e.callback) : "leave" === n && Z.call(e.node, i) && a.push(e.callback)
                        }), a
                    }

                    function T(e, r, l) {
                        function c(n, r, i, a) {
                            T(function() {
                                var n = D(x, e, r);
                                n.length && t(function() {
                                    H(n, function(t) {
                                        t(e, i, a)
                                    })
                                })
                            }), n.progress(r, i, a)
                        }

                        function p(t) {
                            w(e, C), Q(e, C), h(e, C), C.domOperation(), k.complete(!t)
                        }
                        var m, x, C = V(l);
                        e = u(e), e && (m = y(e), x = e.parent()), C = d(C);
                        var k = new $,
                            T = S();
                        if (_(C.addClass) && (C.addClass = C.addClass.join(" ")), C.addClass && !B(C.addClass) && (C.addClass = null), _(C.removeClass) && (C.removeClass = C.removeClass.join(" ")), C.removeClass && !B(C.removeClass) && (C.removeClass = null), C.from && !z(C.from) && (C.from = null), C.to && !z(C.to) && (C.to = null), !m) return p(), k;
                        var M = [m.className, C.addClass, C.removeClass].join(" ");
                        if (!J(M)) return p(), k;
                        var F = ["enter", "move", "leave"].indexOf(r) >= 0,
                            q = !I || f[0].hidden || L.get(m),
                            R = !q && N.get(m) || {},
                            U = !!R.state;
                        if (q || U && R.state == o || (q = !P(e, x, r)), q) return p(), k;
                        F && A(e);
                        var W = {
                            structural: F,
                            element: e,
                            event: r,
                            close: p,
                            options: C,
                            runner: k
                        };
                        if (U) {
                            var Y = i("skip", e, W, R);
                            if (Y) return R.state === s ? (p(), k) : (v(e, R.options, C), R.runner);
                            var G = i("cancel", e, W, R);
                            if (G)
                                if (R.state === s) R.runner.end();
                                else {
                                    if (!R.structural) return v(e, R.options, W.options), R.runner;
                                    R.close()
                                }
                            else {
                                var K = i("join", e, W, R);
                                if (K) {
                                    if (R.state !== s) return b(e, F ? r : null, C), r = W.event = R.event, C = v(e, R.options, W.options), R.runner;
                                    E(e, C)
                                }
                            }
                        } else E(e, C);
                        var X = W.structural;
                        if (X || (X = "animate" === W.event && Object.keys(W.options.to || {}).length > 0 || a(W.options)), !X) return p(), O(e), k;
                        var Z = (R.counter || 0) + 1;
                        return W.counter = Z, j(e, o, W), n.$$postDigest(function() {
                            var t = N.get(m),
                                n = !t;
                            t = t || {};
                            var i = e.parent() || [],
                                o = i.length > 0 && ("animate" === t.event || t.structural || a(t.options));
                            if (n || t.counter !== Z || !o) return n && (Q(e, C), h(e, C)), (n || F && t.event !== r) && (C.domOperation(), k.end()), void(o || O(e));
                            r = !t.structural && a(t.options, !0) ? "setClass" : t.event, j(e, s);
                            var u = g(e, r, t.options);
                            u.done(function(t) {
                                p(!t);
                                var n = N.get(m);
                                n && n.counter === Z && O(y(e)), c(k, r, "close", {})
                            }), k.setHost(u), c(k, r, "start", {})
                        }), k
                    }

                    function A(e) {
                        var t = y(e),
                            n = t.querySelectorAll("[" + Te + "]");
                        H(n, function(e) {
                            var t = parseInt(e.getAttribute(Te)),
                                n = N.get(e);
                            if (n) switch (t) {
                                case s:
                                    n.runner.end();
                                case o:
                                    N.remove(e)
                            }
                        })
                    }

                    function O(e) {
                        var t = y(e);
                        t.removeAttribute(Te), N.remove(t)
                    }

                    function M(e, t) {
                        return y(e) === y(t)
                    }

                    function P(e, t, n) {
                        var r, i = U(f[0].body),
                            a = M(e, i) || "HTML" === e[0].nodeName,
                            o = M(e, c),
                            s = !1,
                            u = L.get(y(e)),
                            l = e.data(Ae);
                        for (l && (t = l); t && t.length;) {
                            o || (o = M(t, c));
                            var p = t[0];
                            if (p.nodeType !== X) break;
                            var d = N.get(p) || {};
                            if (!s) {
                                var h = L.get(p);
                                if (h === !0 && u !== !1) {
                                    u = !0;
                                    break
                                }
                                h === !1 && (u = !1), s = d.structural
                            }
                            if (W(r) || r === !0) {
                                var m = t.data(ne);
                                Y(m) && (r = m)
                            }
                            if (s && r === !1) break;
                            if (a || (a = M(t, i)), a && o) break;
                            t = o || !(l = t.data(Ae)) ? t.parent() : l
                        }
                        var g = (!s || r) && u !== !0;
                        return g && o && a
                    }

                    function j(e, t, n) {
                        n = n || {}, n.state = t;
                        var r = y(e);
                        r.setAttribute(Te, t);
                        var i = N.get(r),
                            a = i ? R(i, n) : n;
                        N.put(r, a)
                    }
                    var N = new m,
                        L = new m,
                        I = null,
                        F = n.$watch(function() {
                            return 0 === x.totalPendingRequests
                        }, function(e) {
                            e && (F(), n.$$postDigest(function() {
                                n.$$postDigest(function() {
                                    null === I && (I = !0)
                                })
                            }))
                        }),
                        q = {},
                        G = e.classNameFilter(),
                        J = G ? function(e) {
                            return G.test(e)
                        } : function() {
                            return !0
                        },
                        Q = p(C),
                        Z = Node.prototype.contains || function(e) {
                            return this === e || !!(16 & this.compareDocumentPosition(e))
                        };
                    return {
                        on: function(e, t, n) {
                            var r = l(t);
                            q[e] = q[e] || [], q[e].push({
                                node: r,
                                callback: n
                            })
                        },
                        off: function(e, t, n) {
                            function r(e, t, n) {
                                var r = l(t);
                                return e.filter(function(e) {
                                    var t = e.node === r && (!n || e.callback === n);
                                    return !t
                                })
                            }
                            var i = q[e];
                            i && (q[e] = 1 === arguments.length ? null : r(i, t, n))
                        },
                        pin: function(e, t) {
                            r(K(e), "element", "not an element"), r(K(t), "parentElement", "not an element"), e.data(Ae, t)
                        },
                        push: function(e, t, n, r) {
                            return n = n || {}, n.domOperation = r, T(e, t, n)
                        },
                        enabled: function(e, t) {
                            var n = arguments.length;
                            if (0 === n) t = !!I;
                            else {
                                var r = K(e);
                                if (r) {
                                    var i = y(e),
                                        a = L.get(i);
                                    1 === n ? t = !a : L.put(i, !t)
                                } else t = I = !!e
                            }
                            return t
                        }
                    }
                }]
            }],
            Me = ["$animateProvider", function(e) {
                function t(e, t) {
                    e.data(s, t)
                }

                function n(e) {
                    e.removeData(s)
                }

                function r(e) {
                    return e.data(s)
                }
                var a = "ng-animate-ref",
                    o = this.drivers = [],
                    s = "$$animationRunner";
                this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", "$$rAFScheduler", function(e, s, u, l, c, f) {
                    function m(e) {
                        function t(e) {
                            if (e.processed) return e;
                            e.processed = !0;
                            var n = e.domNode,
                                r = n.parentNode;
                            a.put(n, e);
                            for (var o; r;) {
                                if (o = a.get(r)) {
                                    o.processed || (o = t(o));
                                    break
                                }
                                r = r.parentNode
                            }
                            return (o || i).children.push(e), e
                        }

                        function n(e) {
                            var t, n = [],
                                r = [];
                            for (t = 0; t < e.children.length; t++) r.push(e.children[t]);
                            var i = r.length,
                                a = 0,
                                o = [];
                            for (t = 0; t < r.length; t++) {
                                var s = r[t];
                                0 >= i && (i = a, a = 0, n.push(o), o = []), o.push(s.fn), s.children.forEach(function(e) {
                                    a++, r.push(e)
                                }), i--
                            }
                            return o.length && n.push(o), n
                        }
                        var r, i = {
                                children: []
                            },
                            a = new c;
                        for (r = 0; r < e.length; r++) {
                            var o = e[r];
                            a.put(o.domNode, e[r] = {
                                domNode: o.domNode,
                                fn: o.fn,
                                children: []
                            })
                        }
                        for (r = 0; r < e.length; r++) t(e[r]);
                        return n(i)
                    }
                    var g = [],
                        v = p(e);
                    return function(c, p, $) {
                        function b(e) {
                            var t = "[" + a + "]",
                                n = e.hasAttribute(a) ? [e] : e.querySelectorAll(t),
                                r = [];
                            return H(n, function(e) {
                                var t = e.getAttribute(a);
                                t && t.length && r.push(e)
                            }), r
                        }

                        function w(e) {
                            var t = [],
                                n = {};
                            H(e, function(e, r) {
                                var i = e.element,
                                    o = y(i),
                                    s = e.event,
                                    u = ["enter", "move"].indexOf(s) >= 0,
                                    l = e.structural ? b(o) : [];
                                if (l.length) {
                                    var c = u ? "to" : "from";
                                    H(l, function(e) {
                                        var t = e.getAttribute(a);
                                        n[t] = n[t] || {}, n[t][c] = {
                                            animationID: r,
                                            element: U(e)
                                        }
                                    })
                                } else t.push(e)
                            });
                            var r = {},
                                i = {};
                            return H(n, function(n, a) {
                                var o = n.from,
                                    s = n.to;
                                if (!o || !s) {
                                    var u = o ? o.animationID : s.animationID,
                                        l = u.toString();
                                    return void(r[l] || (r[l] = !0, t.push(e[u])))
                                }
                                var c = e[o.animationID],
                                    f = e[s.animationID],
                                    p = o.animationID.toString();
                                if (!i[p]) {
                                    var d = i[p] = {
                                        structural: !0,
                                        beforeStart: function() {
                                            c.beforeStart(), f.beforeStart()
                                        },
                                        close: function() {
                                            c.close(), f.close()
                                        },
                                        classes: x(c.classes, f.classes),
                                        from: c,
                                        to: f,
                                        anchors: []
                                    };
                                    d.classes.length ? t.push(d) : (t.push(c), t.push(f))
                                }
                                i[p].anchors.push({
                                    out: o.element,
                                    "in": s.element
                                })
                            }), t
                        }

                        function x(e, t) {
                            e = e.split(" "), t = t.split(" ");
                            for (var n = [], r = 0; r < e.length; r++) {
                                var i = e[r];
                                if ("ng-" !== i.substring(0, 3))
                                    for (var a = 0; a < t.length; a++)
                                        if (i === t[a]) {
                                            n.push(i);
                                            break
                                        }
                            }
                            return n.join(" ")
                        }

                        function C(e) {
                            for (var t = o.length - 1; t >= 0; t--) {
                                var n = o[t];
                                if (u.has(n)) {
                                    var r = u.get(n),
                                        i = r(e);
                                    if (i) return i
                                }
                            }
                        }

                        function k() {
                            c.addClass(te), M && e.addClass(c, M)
                        }

                        function S(e, t) {
                            function n(e) {
                                r(e).setHost(t)
                            }
                            e.from && e.to ? (n(e.from.element), n(e.to.element)) : n(e.element)
                        }

                        function E() {
                            var e = r(c);
                            !e || "leave" === p && $.$$domOperationFired || e.end()
                        }

                        function D(t) {
                            c.off("$destroy", E), n(c), v(c, $), h(c, $), $.domOperation(), M && e.removeClass(c, M), c.removeClass(te), A.complete(!t)
                        }
                        $ = d($);
                        var T = ["enter", "move", "leave"].indexOf(p) >= 0,
                            A = new l({
                                end: function() {
                                    D()
                                },
                                cancel: function() {
                                    D(!0)
                                }
                            });
                        if (!o.length) return D(), A;
                        t(c, A);
                        var O = i(c.attr("class"), i($.addClass, $.removeClass)),
                            M = $.tempClasses;
                        return M && (O += " " + M, $.tempClasses = null), g.push({
                            element: c,
                            classes: O,
                            event: p,
                            structural: T,
                            options: $,
                            beforeStart: k,
                            close: D
                        }), c.on("$destroy", E), g.length > 1 ? A : (s.$$postDigest(function() {
                            var e = [];
                            H(g, function(t) {
                                r(t.element) ? e.push(t) : t.close()
                            }), g.length = 0;
                            var t = w(e),
                                n = [];
                            H(t, function(e) {
                                n.push({
                                    domNode: y(e.from ? e.from.element : e.element),
                                    fn: function() {
                                        e.beforeStart();
                                        var t, n = e.close,
                                            i = e.anchors ? e.from.element || e.to.element : e.element;
                                        if (r(i)) {
                                            var a = C(e);
                                            a && (t = a.start)
                                        }
                                        if (t) {
                                            var o = t();
                                            o.done(function(e) {
                                                n(!e)
                                            }), S(e, o)
                                        } else n()
                                    }
                                })
                            }), f(m(n))
                        }), A)
                    }
                }]
            }];
        t.module("ngAnimate", []).directive("ngAnimateChildren", ve).factory("$$rAFScheduler", ge).provider("$$animateQueue", Oe).provider("$$animation", Me).provider("$animateCss", ke).provider("$$animateCssDriver", Se).provider("$$animateJs", Ee).provider("$$animateJsDriver", De)
    }(window, window.angular),
    function(e, t, n) {
        "use strict";

        function r(e) {
            return t.lowercase(e.nodeName || e[0] && e[0].nodeName)
        }

        function i(e, n) {
            var r = !1,
                i = !1;
            this.ngClickOverrideEnabled = function(a) {
                return t.isDefined(a) ? (a && !i && (i = !0, s.$$moduleName = "ngTouch", n.directive("ngClick", s), e.decorator("ngClickDirective", ["$delegate", function(e) {
                    if (r) e.shift();
                    else
                        for (var t = e.length - 1; t >= 0;) {
                            if ("ngTouch" === e[t].$$moduleName) {
                                e.splice(t, 1);
                                break
                            }
                            t--
                        }
                    return e
                }])), r = a, this) : r
            }, this.$get = function() {
                return {
                    ngClickOverrideEnabled: function() {
                        return r
                    }
                }
            }
        }

        function a(e, n, r) {
            o.directive(e, ["$parse", "$swipe", function(i, a) {
                var o = 75,
                    s = .3,
                    u = 30;
                return function(l, c, f) {
                    function p(e) {
                        if (!d) return !1;
                        var t = Math.abs(e.y - d.y),
                            r = (e.x - d.x) * n;
                        return h && o > t && r > 0 && r > u && s > t / r
                    }
                    var d, h, m = i(f[e]),
                        g = ["touch"];
                    t.isDefined(f.ngSwipeDisableMouse) || g.push("mouse"), a.bind(c, {
                        start: function(e, t) {
                            d = e, h = !0
                        },
                        cancel: function(e) {
                            h = !1
                        },
                        end: function(e, t) {
                            p(e) && l.$apply(function() {
                                c.triggerHandler(r), m(l, {
                                    $event: t
                                })
                            })
                        }
                    }, g)
                }
            }])
        }
        var o = t.module("ngTouch", []);
        o.provider("$touch", i), i.$inject = ["$provide", "$compileProvider"], o.factory("$swipe", [function() {
            function e(e) {
                var t = e.originalEvent || e,
                    n = t.touches && t.touches.length ? t.touches : [t],
                    r = t.changedTouches && t.changedTouches[0] || n[0];
                return {
                    x: r.clientX,
                    y: r.clientY
                }
            }

            function n(e, n) {
                var r = [];
                return t.forEach(e, function(e) {
                    var t = i[e][n];
                    t && r.push(t)
                }), r.join(" ")
            }
            var r = 10,
                i = {
                    mouse: {
                        start: "mousedown",
                        move: "mousemove",
                        end: "mouseup"
                    },
                    touch: {
                        start: "touchstart",
                        move: "touchmove",
                        end: "touchend",
                        cancel: "touchcancel"
                    }
                };
            return {
                bind: function(t, i, a) {
                    var o, s, u, l, c = !1;
                    a = a || ["mouse", "touch"], t.on(n(a, "start"), function(t) {
                        u = e(t), c = !0, o = 0, s = 0, l = u, i.start && i.start(u, t)
                    });
                    var f = n(a, "cancel");
                    f && t.on(f, function(e) {
                        c = !1, i.cancel && i.cancel(e)
                    }), t.on(n(a, "move"), function(t) {
                        if (c && u) {
                            var n = e(t);
                            if (o += Math.abs(n.x - l.x), s += Math.abs(n.y - l.y), l = n, !(r > o && r > s)) return s > o ? (c = !1, void(i.cancel && i.cancel(t))) : (t.preventDefault(), void(i.move && i.move(n, t)))
                        }
                    }), t.on(n(a, "end"), function(t) {
                        c && (c = !1, i.end && i.end(e(t), t))
                    })
                }
            }
        }]);
        var s = ["$parse", "$timeout", "$rootElement", function(e, n, i) {
            function a(e, t, n, r) {
                return Math.abs(e - n) < g && Math.abs(t - r) < g
            }

            function o(e, t, n) {
                for (var r = 0; r < e.length; r += 2)
                    if (a(e[r], e[r + 1], t, n)) return e.splice(r, r + 2), !0;
                return !1
            }

            function s(e) {
                if (!(Date.now() - c > m)) {
                    var t = e.touches && e.touches.length ? e.touches : [e],
                        n = t[0].clientX,
                        i = t[0].clientY;
                    1 > n && 1 > i || p && p[0] === n && p[1] === i || (p && (p = null), "label" === r(e.target) && (p = [n, i]), o(f, n, i) || (e.stopPropagation(), e.preventDefault(), e.target && e.target.blur && e.target.blur()))
                }
            }

            function u(e) {
                var t = e.touches && e.touches.length ? e.touches : [e],
                    r = t[0].clientX,
                    i = t[0].clientY;
                f.push(r, i), n(function() {
                    for (var e = 0; e < f.length; e += 2)
                        if (f[e] == r && f[e + 1] == i) return void f.splice(e, e + 2)
                }, m, !1)
            }

            function l(e, t) {
                f || (i[0].addEventListener("click", s, !0), i[0].addEventListener("touchstart", u, !0), f = []), c = Date.now(), o(f, e, t)
            }
            var c, f, p, d = 750,
                h = 12,
                m = 2500,
                g = 25,
                v = "ng-click-active";
            return function(n, r, i) {
                function a() {
                    p = !1, r.removeClass(v)
                }
                var o, s, u, c, f = e(i.ngClick),
                    p = !1;
                r.on("touchstart", function(e) {
                    p = !0, o = e.target ? e.target : e.srcElement, 3 == o.nodeType && (o = o.parentNode), r.addClass(v), s = Date.now();
                    var t = e.originalEvent || e,
                        n = t.touches && t.touches.length ? t.touches : [t],
                        i = n[0];
                    u = i.clientX, c = i.clientY
                }), r.on("touchcancel", function(e) {
                    a()
                }), r.on("touchend", function(e) {
                    var n = Date.now() - s,
                        f = e.originalEvent || e,
                        m = f.changedTouches && f.changedTouches.length ? f.changedTouches : f.touches && f.touches.length ? f.touches : [f],
                        g = m[0],
                        v = g.clientX,
                        $ = g.clientY,
                        y = Math.sqrt(Math.pow(v - u, 2) + Math.pow($ - c, 2));
                    p && d > n && h > y && (l(v, $), o && o.blur(), t.isDefined(i.disabled) && i.disabled !== !1 || r.triggerHandler("click", [e])), a()
                }), r.onclick = function(e) {}, r.on("click", function(e, t) {
                    n.$apply(function() {
                        f(n, {
                            $event: t || e
                        })
                    })
                }), r.on("mousedown", function(e) {
                    r.addClass(v)
                }), r.on("mousemove mouseup", function(e) {
                    r.removeClass(v)
                })
            }
        }];
        a("ngSwipeLeft", -1, "swipeleft"), a("ngSwipeRight", 1, "swiperight")
    }(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
    function(e, t, n) {
        "use strict";

        function r(e, t) {
            return _(new(_(function() {}, {
                prototype: e
            })), t)
        }

        function i(e) {
            return H(arguments, function(t) {
                t !== e && H(t, function(t, n) {
                    e.hasOwnProperty(n) || (e[n] = t)
                })
            }), e
        }

        function a(e, t) {
            var n = [];
            for (var r in e.path) {
                if (e.path[r] !== t.path[r]) break;
                n.push(e.path[r])
            }
            return n
        }

        function o(e) {
            if (Object.keys) return Object.keys(e);
            var t = [];
            return H(e, function(e, n) {
                t.push(n)
            }), t
        }

        function s(e, t) {
            if (Array.prototype.indexOf) return e.indexOf(t, Number(arguments[2]) || 0);
            var n = e.length >>> 0,
                r = Number(arguments[2]) || 0;
            for (r = 0 > r ? Math.ceil(r) : Math.floor(r), 0 > r && (r += n); n > r; r++)
                if (r in e && e[r] === t) return r;
            return -1
        }

        function u(e, t, n, r) {
            var i, u = a(n, r),
                l = {},
                c = [];
            for (var f in u)
                if (u[f] && u[f].params && (i = o(u[f].params), i.length))
                    for (var p in i) s(c, i[p]) >= 0 || (c.push(i[p]), l[i[p]] = e[i[p]]);
            return _({}, l, t)
        }

        function l(e, t, n) {
            if (!n) {
                n = [];
                for (var r in e) n.push(r)
            }
            for (var i = 0; i < n.length; i++) {
                var a = n[i];
                if (e[a] != t[a]) return !1
            }
            return !0
        }

        function c(e, t) {
            var n = {};
            return H(e, function(e) {
                n[e] = t[e]
            }), n
        }

        function f(e) {
            var t = {},
                n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
            return H(n, function(n) {
                n in e && (t[n] = e[n])
            }), t
        }

        function p(e) {
            var t = {},
                n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
            for (var r in e) - 1 == s(n, r) && (t[r] = e[r]);
            return t
        }

        function d(e, t) {
            var n = U(e),
                r = n ? [] : {};
            return H(e, function(e, i) {
                t(e, i) && (r[n ? r.length : i] = e)
            }), r
        }

        function h(e, t) {
            var n = U(e) ? [] : {};
            return H(e, function(e, r) {
                n[r] = t(e, r)
            }), n
        }

        function m(e, t) {
            var r = 1,
                a = 2,
                u = {},
                l = [],
                c = u,
                f = _(e.when(u), {
                    $$promises: u,
                    $$values: u
                });
            this.study = function(u) {
                function d(e, n) {
                    if ($[n] !== a) {
                        if (v.push(n), $[n] === r) throw v.splice(0, s(v, n)), new Error("Cyclic dependency: " + v.join(" -> "));
                        if ($[n] = r, V(e)) g.push(n, [function() {
                            return t.get(e)
                        }], l);
                        else {
                            var i = t.annotate(e);
                            H(i, function(e) {
                                e !== n && u.hasOwnProperty(e) && d(u[e], e)
                            }), g.push(n, e, i)
                        }
                        v.pop(), $[n] = a
                    }
                }

                function h(e) {
                    return R(e) && e.then && e.$$promises
                }
                if (!R(u)) throw new Error("'invocables' must be an object");
                var m = o(u || {}),
                    g = [],
                    v = [],
                    $ = {};
                return H(u, d), u = v = $ = null,
                    function(r, a, o) {
                        function s() {
                            --b || (w || i(y, a.$$values), v.$$values = y, v.$$promises = v.$$promises || !0, delete v.$$inheritedValues, d.resolve(y))
                        }

                        function u(e) {
                            v.$$failure = e, d.reject(e)
                        }

                        function l(n, i, a) {
                            function l(e) {
                                f.reject(e), u(e)
                            }

                            function c() {
                                if (!F(v.$$failure)) try {
                                    f.resolve(t.invoke(i, o, y)), f.promise.then(function(e) {
                                        y[n] = e, s()
                                    }, l)
                                } catch (e) {
                                    l(e)
                                }
                            }
                            var f = e.defer(),
                                p = 0;
                            H(a, function(e) {
                                $.hasOwnProperty(e) && !r.hasOwnProperty(e) && (p++, $[e].then(function(t) {
                                    y[e] = t, --p || c()
                                }, l))
                            }), p || c(), $[n] = f.promise
                        }
                        if (h(r) && o === n && (o = a, a = r, r = null), r) {
                            if (!R(r)) throw new Error("'locals' must be an object")
                        } else r = c;
                        if (a) {
                            if (!h(a)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                        } else a = f;
                        var d = e.defer(),
                            v = d.promise,
                            $ = v.$$promises = {},
                            y = _({}, r),
                            b = 1 + g.length / 3,
                            w = !1;
                        if (F(a.$$failure)) return u(a.$$failure), v;
                        a.$$inheritedValues && i(y, p(a.$$inheritedValues, m)), _($, a.$$promises), a.$$values ? (w = i(y, p(a.$$values, m)), v.$$inheritedValues = p(a.$$values, m), s()) : (a.$$inheritedValues && (v.$$inheritedValues = p(a.$$inheritedValues, m)), a.then(s, u));
                        for (var x = 0, C = g.length; C > x; x += 3) r.hasOwnProperty(g[x]) ? s() : l(g[x], g[x + 1], g[x + 2]);
                        return v
                    }
            }, this.resolve = function(e, t, n, r) {
                return this.study(e)(t, n, r)
            }
        }

        function g(e, t, n) {
            this.fromConfig = function(e, t, n) {
                return F(e.template) ? this.fromString(e.template, t) : F(e.templateUrl) ? this.fromUrl(e.templateUrl, t) : F(e.templateProvider) ? this.fromProvider(e.templateProvider, t, n) : null
            }, this.fromString = function(e, t) {
                return q(e) ? e(t) : e
            }, this.fromUrl = function(n, r) {
                return q(n) && (n = n(r)), null == n ? null : e.get(n, {
                    cache: t,
                    headers: {
                        Accept: "text/html"
                    }
                }).then(function(e) {
                    return e.data
                })
            }, this.fromProvider = function(e, t, r) {
                return n.invoke(e, null, r || {
                    params: t
                })
            }
        }

        function v(e, t, i) {
            function a(t, n, r, i) {
                if (g.push(t), h[t]) return h[t];
                if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(t)) throw new Error("Invalid parameter name '" + t + "' in pattern '" + e + "'");
                if (m[t]) throw new Error("Duplicate parameter name '" + t + "' in pattern '" + e + "'");
                return m[t] = new W.Param(t, n, r, i), m[t]
            }

            function o(e, t, n, r) {
                var i = ["", ""],
                    a = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
                if (!t) return a;
                switch (n) {
                    case !1:
                        i = ["(", ")" + (r ? "?" : "")];
                        break;
                    case !0:
                        a = a.replace(/\/$/, ""), i = ["(?:/(", ")|/)?"];
                        break;
                    default:
                        i = ["(" + n + "|", ")?"]
                }
                return a + i[0] + t + i[1]
            }

            function s(i, a) {
                var o, s, u, l, c;
                return o = i[2] || i[3], c = t.params[o], u = e.substring(p, i.index), s = a ? i[4] : i[4] || ("*" == i[1] ? ".*" : null),
                    s && (l = W.type(s) || r(W.type("string"), {
                        pattern: new RegExp(s, t.caseInsensitive ? "i" : n)
                    })), {
                        id: o,
                        regexp: s,
                        segment: u,
                        type: l,
                        cfg: c
                    }
            }
            t = _({
                params: {}
            }, R(t) ? t : {});
            var u, l = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                c = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                f = "^",
                p = 0,
                d = this.segments = [],
                h = i ? i.params : {},
                m = this.params = i ? i.params.$$new() : new W.ParamSet,
                g = [];
            this.source = e;
            for (var v, $, y;
                (u = l.exec(e)) && (v = s(u, !1), !(v.segment.indexOf("?") >= 0));) $ = a(v.id, v.type, v.cfg, "path"), f += o(v.segment, $.type.pattern.source, $.squash, $.isOptional), d.push(v.segment), p = l.lastIndex;
            y = e.substring(p);
            var b = y.indexOf("?");
            if (b >= 0) {
                var w = this.sourceSearch = y.substring(b);
                if (y = y.substring(0, b), this.sourcePath = e.substring(0, p + b), w.length > 0)
                    for (p = 0; u = c.exec(w);) v = s(u, !0), $ = a(v.id, v.type, v.cfg, "search"), p = l.lastIndex
            } else this.sourcePath = e, this.sourceSearch = "";
            f += o(y) + (t.strict === !1 ? "/?" : "") + "$", d.push(y), this.regexp = new RegExp(f, t.caseInsensitive ? "i" : n), this.prefix = d[0], this.$$paramNames = g
        }

        function $(e) {
            _(this, e)
        }

        function y() {
            function e(e) {
                return null != e ? e.toString().replace(/~/g, "~~").replace(/\//g, "~2F") : e
            }

            function i(e) {
                return null != e ? e.toString().replace(/~2F/g, "/").replace(/~~/g, "~") : e
            }

            function a() {
                return {
                    strict: m,
                    caseInsensitive: p
                }
            }

            function u(e) {
                return q(e) || U(e) && q(e[e.length - 1])
            }

            function l() {
                for (; x.length;) {
                    var e = x.shift();
                    if (e.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                    t.extend(b[e.name], f.invoke(e.def))
                }
            }

            function c(e) {
                _(this, e || {})
            }
            W = this;
            var f, p = !1,
                m = !0,
                g = !1,
                b = {},
                w = !0,
                x = [],
                C = {
                    string: {
                        encode: e,
                        decode: i,
                        is: function(e) {
                            return null == e || !F(e) || "string" == typeof e
                        },
                        pattern: /[^\/]*/
                    },
                    "int": {
                        encode: e,
                        decode: function(e) {
                            return parseInt(e, 10)
                        },
                        is: function(e) {
                            return F(e) && this.decode(e.toString()) === e
                        },
                        pattern: /\d+/
                    },
                    bool: {
                        encode: function(e) {
                            return e ? 1 : 0
                        },
                        decode: function(e) {
                            return 0 !== parseInt(e, 10)
                        },
                        is: function(e) {
                            return e === !0 || e === !1
                        },
                        pattern: /0|1/
                    },
                    date: {
                        encode: function(e) {
                            return this.is(e) ? [e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2)].join("-") : n
                        },
                        decode: function(e) {
                            if (this.is(e)) return e;
                            var t = this.capture.exec(e);
                            return t ? new Date(t[1], t[2] - 1, t[3]) : n
                        },
                        is: function(e) {
                            return e instanceof Date && !isNaN(e.valueOf())
                        },
                        equals: function(e, t) {
                            return this.is(e) && this.is(t) && e.toISOString() === t.toISOString()
                        },
                        pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                        capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
                    },
                    json: {
                        encode: t.toJson,
                        decode: t.fromJson,
                        is: t.isObject,
                        equals: t.equals,
                        pattern: /[^\/]*/
                    },
                    any: {
                        encode: t.identity,
                        decode: t.identity,
                        equals: t.equals,
                        pattern: /.*/
                    }
                };
            y.$$getDefaultValue = function(e) {
                if (!u(e.value)) return e.value;
                if (!f) throw new Error("Injectable functions cannot be called at configuration time");
                return f.invoke(e.value)
            }, this.caseInsensitive = function(e) {
                return F(e) && (p = e), p
            }, this.strictMode = function(e) {
                return F(e) && (m = e), m
            }, this.defaultSquashPolicy = function(e) {
                if (!F(e)) return g;
                if (e !== !0 && e !== !1 && !V(e)) throw new Error("Invalid squash policy: " + e + ". Valid policies: false, true, arbitrary-string");
                return g = e, e
            }, this.compile = function(e, t) {
                return new v(e, _(a(), t))
            }, this.isMatcher = function(e) {
                if (!R(e)) return !1;
                var t = !0;
                return H(v.prototype, function(n, r) {
                    q(n) && (t = t && F(e[r]) && q(e[r]))
                }), t
            }, this.type = function(e, t, n) {
                if (!F(t)) return b[e];
                if (b.hasOwnProperty(e)) throw new Error("A type named '" + e + "' has already been defined.");
                return b[e] = new $(_({
                    name: e
                }, t)), n && (x.push({
                    name: e,
                    def: n
                }), w || l()), this
            }, H(C, function(e, t) {
                b[t] = new $(_({
                    name: t
                }, e))
            }), b = r(b, {}), this.$get = ["$injector", function(e) {
                return f = e, w = !1, l(), H(C, function(e, t) {
                    b[t] || (b[t] = new $(e))
                }), this
            }], this.Param = function(e, r, i, a) {
                function l(e) {
                    var t = R(e) ? o(e) : [],
                        n = -1 === s(t, "value") && -1 === s(t, "type") && -1 === s(t, "squash") && -1 === s(t, "array");
                    return n && (e = {
                        value: e
                    }), e.$$fn = u(e.value) ? e.value : function() {
                        return e.value
                    }, e
                }

                function c(n, r, i) {
                    if (n.type && r) throw new Error("Param '" + e + "' has two type configurations.");
                    return r ? r : n.type ? t.isString(n.type) ? b[n.type] : n.type instanceof $ ? n.type : new $(n.type) : "config" === i ? b.any : b.string
                }

                function p() {
                    var t = {
                            array: "search" === a ? "auto" : !1
                        },
                        n = e.match(/\[\]$/) ? {
                            array: !0
                        } : {};
                    return _(t, n, i).array
                }

                function m(e, t) {
                    var n = e.squash;
                    if (!t || n === !1) return !1;
                    if (!F(n) || null == n) return g;
                    if (n === !0 || V(n)) return n;
                    throw new Error("Invalid squash policy: '" + n + "'. Valid policies: false, true, or arbitrary string")
                }

                function v(e, t, r, i) {
                    var a, o, u = [{
                        from: "",
                        to: r || t ? n : ""
                    }, {
                        from: null,
                        to: r || t ? n : ""
                    }];
                    return a = U(e.replace) ? e.replace : [], V(i) && a.push({
                        from: i,
                        to: n
                    }), o = h(a, function(e) {
                        return e.from
                    }), d(u, function(e) {
                        return -1 === s(o, e.from)
                    }).concat(a)
                }

                function y() {
                    if (!f) throw new Error("Injectable functions cannot be called at configuration time");
                    var e = f.invoke(i.$$fn);
                    if (null !== e && e !== n && !C.type.is(e)) throw new Error("Default value (" + e + ") for parameter '" + C.id + "' is not an instance of Type (" + C.type.name + ")");
                    return e
                }

                function w(e) {
                    function t(e) {
                        return function(t) {
                            return t.from === e
                        }
                    }

                    function n(e) {
                        var n = h(d(C.replace, t(e)), function(e) {
                            return e.to
                        });
                        return n.length ? n[0] : e
                    }
                    return e = n(e), F(e) ? C.type.$normalize(e) : y()
                }

                function x() {
                    return "{Param:" + e + " " + r + " squash: '" + E + "' optional: " + S + "}"
                }
                var C = this;
                i = l(i), r = c(i, r, a);
                var k = p();
                r = k ? r.$asArray(k, "search" === a) : r, "string" !== r.name || k || "path" !== a || i.value !== n || (i.value = "");
                var S = i.value !== n,
                    E = m(i, S),
                    D = v(i, k, S, E);
                _(this, {
                    id: e,
                    type: r,
                    location: a,
                    array: k,
                    squash: E,
                    replace: D,
                    isOptional: S,
                    value: w,
                    dynamic: n,
                    config: i,
                    toString: x
                })
            }, c.prototype = {
                $$new: function() {
                    return r(this, _(new c, {
                        $$parent: this
                    }))
                },
                $$keys: function() {
                    for (var e = [], t = [], n = this, r = o(c.prototype); n;) t.push(n), n = n.$$parent;
                    return t.reverse(), H(t, function(t) {
                        H(o(t), function(t) {
                            -1 === s(e, t) && -1 === s(r, t) && e.push(t)
                        })
                    }), e
                },
                $$values: function(e) {
                    var t = {},
                        n = this;
                    return H(n.$$keys(), function(r) {
                        t[r] = n[r].value(e && e[r])
                    }), t
                },
                $$equals: function(e, t) {
                    var n = !0,
                        r = this;
                    return H(r.$$keys(), function(i) {
                        var a = e && e[i],
                            o = t && t[i];
                        r[i].type.equals(a, o) || (n = !1)
                    }), n
                },
                $$validates: function(e) {
                    var r, i, a, o, s, u = this.$$keys();
                    for (r = 0; r < u.length && (i = this[u[r]], a = e[u[r]], a !== n && null !== a || !i.isOptional); r++) {
                        if (o = i.type.$normalize(a), !i.type.is(o)) return !1;
                        if (s = i.type.encode(o), t.isString(s) && !i.type.pattern.exec(s)) return !1
                    }
                    return !0
                },
                $$parent: n
            }, this.ParamSet = c
        }

        function b(e, r) {
            function i(e) {
                var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);
                return null != t ? t[1].replace(/\\(.)/g, "$1") : ""
            }

            function a(e, t) {
                return e.replace(/\$(\$|\d{1,2})/, function(e, n) {
                    return t["$" === n ? 0 : Number(n)]
                })
            }

            function o(e, t, n) {
                if (!n) return !1;
                var r = e.invoke(t, t, {
                    $match: n
                });
                return F(r) ? r : !0
            }

            function s(r, i, a, o, s) {
                function p(e, t, n) {
                    return "/" === g ? e : t ? g.slice(0, -1) + e : n ? g.slice(1) + e : e
                }

                function d(e) {
                    function t(e) {
                        var t = e(a, r);
                        return t ? (V(t) && r.replace().url(t), !0) : !1
                    }
                    if (!e || !e.defaultPrevented) {
                        m && r.url() === m;
                        m = n;
                        var i, o = l.length;
                        for (i = 0; o > i; i++)
                            if (t(l[i])) return;
                        c && t(c)
                    }
                }

                function h() {
                    return u = u || i.$on("$locationChangeSuccess", d)
                }
                var m, g = o.baseHref(),
                    v = r.url();
                return f || h(), {
                    sync: function() {
                        d()
                    },
                    listen: function() {
                        return h()
                    },
                    update: function(e) {
                        return e ? void(v = r.url()) : void(r.url() !== v && (r.url(v), r.replace()))
                    },
                    push: function(e, t, i) {
                        var a = e.format(t || {});
                        null !== a && t && t["#"] && (a += "#" + t["#"]), r.url(a), m = i && i.$$avoidResync ? r.url() : n, i && i.replace && r.replace()
                    },
                    href: function(n, i, a) {
                        if (!n.validates(i)) return null;
                        var o = e.html5Mode();
                        t.isObject(o) && (o = o.enabled), o = o && s.history;
                        var u = n.format(i);
                        if (a = a || {}, o || null === u || (u = "#" + e.hashPrefix() + u), null !== u && i && i["#"] && (u += "#" + i["#"]), u = p(u, o, a.absolute), !a.absolute || !u) return u;
                        var l = !o && u ? "/" : "",
                            c = r.port();
                        return c = 80 === c || 443 === c ? "" : ":" + c, [r.protocol(), "://", r.host(), c, l, u].join("")
                    }
                }
            }
            var u, l = [],
                c = null,
                f = !1;
            this.rule = function(e) {
                if (!q(e)) throw new Error("'rule' must be a function");
                return l.push(e), this
            }, this.otherwise = function(e) {
                if (V(e)) {
                    var t = e;
                    e = function() {
                        return t
                    }
                } else if (!q(e)) throw new Error("'rule' must be a function");
                return c = e, this
            }, this.when = function(e, t) {
                var n, s = V(t);
                if (V(e) && (e = r.compile(e)), !s && !q(t) && !U(t)) throw new Error("invalid 'handler' in when()");
                var u = {
                        matcher: function(e, t) {
                            return s && (n = r.compile(t), t = ["$match", function(e) {
                                return n.format(e)
                            }]), _(function(n, r) {
                                return o(n, t, e.exec(r.path(), r.search()))
                            }, {
                                prefix: V(e.prefix) ? e.prefix : ""
                            })
                        },
                        regex: function(e, t) {
                            if (e.global || e.sticky) throw new Error("when() RegExp must not be global or sticky");
                            return s && (n = t, t = ["$match", function(e) {
                                return a(n, e)
                            }]), _(function(n, r) {
                                return o(n, t, e.exec(r.path()))
                            }, {
                                prefix: i(e)
                            })
                        }
                    },
                    l = {
                        matcher: r.isMatcher(e),
                        regex: e instanceof RegExp
                    };
                for (var c in l)
                    if (l[c]) return this.rule(u[c](e, t));
                throw new Error("invalid 'what' in when()")
            }, this.deferIntercept = function(e) {
                e === n && (e = !0), f = e
            }, this.$get = s, s.$inject = ["$location", "$rootScope", "$injector", "$browser", "$sniffer"]
        }

        function w(e, i) {
            function a(e) {
                return 0 === e.indexOf(".") || 0 === e.indexOf("^")
            }

            function p(e, t) {
                if (!e) return n;
                var r = V(e),
                    i = r ? e : e.name,
                    o = a(i);
                if (o) {
                    if (!t) throw new Error("No reference point given for path '" + i + "'");
                    t = p(t);
                    for (var s = i.split("."), u = 0, l = s.length, c = t; l > u; u++)
                        if ("" !== s[u] || 0 !== u) {
                            if ("^" !== s[u]) break;
                            if (!c.parent) throw new Error("Path '" + i + "' not valid for state '" + t.name + "'");
                            c = c.parent
                        } else c = t;
                    s = s.slice(u).join("."), i = c.name + (c.name && s ? "." : "") + s
                }
                var f = S[i];
                return !f || !r && (r || f !== e && f.self !== e) ? n : f
            }

            function d(e, t) {
                E[e] || (E[e] = []), E[e].push(t)
            }

            function m(e) {
                for (var t = E[e] || []; t.length;) g(t.shift())
            }

            function g(t) {
                t = r(t, {
                    self: t,
                    resolve: t.resolve || {},
                    toString: function() {
                        return this.name
                    }
                });
                var n = t.name;
                if (!V(n) || n.indexOf("@") >= 0) throw new Error("State must have a valid name");
                if (S.hasOwnProperty(n)) throw new Error("State '" + n + "' is already defined");
                var i = -1 !== n.indexOf(".") ? n.substring(0, n.lastIndexOf(".")) : V(t.parent) ? t.parent : R(t.parent) && V(t.parent.name) ? t.parent.name : "";
                if (i && !S[i]) return d(i, t.self);
                for (var a in T) q(T[a]) && (t[a] = T[a](t, T.$delegates[a]));
                return S[n] = t, !t[D] && t.url && e.when(t.url, ["$match", "$stateParams", function(e, n) {
                    k.$current.navigable == t && l(e, n) || k.transitionTo(t, e, {
                        inherit: !0,
                        location: !1
                    })
                }]), m(n), t
            }

            function v(e) {
                return e.indexOf("*") > -1
            }

            function $(e) {
                for (var t = e.split("."), n = k.$current.name.split("."), r = 0, i = t.length; i > r; r++) "*" === t[r] && (n[r] = "*");
                return "**" === t[0] && (n = n.slice(s(n, t[1])), n.unshift("**")), "**" === t[t.length - 1] && (n.splice(s(n, t[t.length - 2]) + 1, Number.MAX_VALUE), n.push("**")), t.length != n.length ? !1 : n.join("") === t.join("")
            }

            function y(e, t) {
                return V(e) && !F(t) ? T[e] : q(t) && V(e) ? (T[e] && !T.$delegates[e] && (T.$delegates[e] = T[e]), T[e] = t, this) : this
            }

            function b(e, t) {
                return R(e) ? t = e : t.name = e, g(t), this
            }

            function w(e, i, a, s, f, d, m, g, y) {
                function b(t, n, r, a) {
                    var o = e.$broadcast("$stateNotFound", t, n, r);
                    if (o.defaultPrevented) return m.update(), A;
                    if (!o.retry) return null;
                    if (a.$retry) return m.update(), O;
                    var s = k.transition = i.when(o.retry);
                    return s.then(function() {
                        return s !== k.transition ? E : (t.options.$retry = !0, k.transitionTo(t.to, t.toParams, t.options))
                    }, function() {
                        return A
                    }), m.update(), s
                }

                function w(e, n, r, o, u, l) {
                    function p() {
                        var n = [];
                        return H(e.views, function(r, i) {
                            var o = r.resolve && r.resolve !== e.resolve ? r.resolve : {};
                            o.$template = [function() {
                                return a.load(i, {
                                    view: r,
                                    locals: u.globals,
                                    params: d,
                                    notify: l.notify
                                }) || ""
                            }], n.push(f.resolve(o, u.globals, u.resolve, e).then(function(n) {
                                if (q(r.controllerProvider) || U(r.controllerProvider)) {
                                    var a = t.extend({}, o, u.globals);
                                    n.$$controller = s.invoke(r.controllerProvider, null, a)
                                } else n.$$controller = r.controller;
                                n.$$state = e, n.$$controllerAs = r.controllerAs, u[i] = n
                            }))
                        }), i.all(n).then(function() {
                            return u.globals
                        })
                    }
                    var d = r ? n : c(e.params.$$keys(), n),
                        h = {
                            $stateParams: d
                        };
                    u.resolve = f.resolve(e.resolve, h, u.resolve, e);
                    var m = [u.resolve.then(function(e) {
                        u.globals = e
                    })];
                    return o && m.push(o), i.all(m).then(p).then(function(e) {
                        return u
                    })
                }
                var E = i.reject(new Error("transition superseded")),
                    T = i.reject(new Error("transition prevented")),
                    A = i.reject(new Error("transition aborted")),
                    O = i.reject(new Error("transition failed"));
                return C.locals = {
                    resolve: null,
                    globals: {
                        $stateParams: {}
                    }
                }, k = {
                    params: {},
                    current: C.self,
                    $current: C,
                    transition: null
                }, k.reload = function(e) {
                    return k.transitionTo(k.current, d, {
                        reload: e || !0,
                        inherit: !1,
                        notify: !0
                    })
                }, k.go = function(e, t, n) {
                    return k.transitionTo(e, t, _({
                        inherit: !0,
                        relative: k.$current
                    }, n))
                }, k.transitionTo = function(t, n, a) {
                    n = n || {}, a = _({
                        location: !0,
                        inherit: !1,
                        relative: null,
                        notify: !0,
                        reload: !1,
                        $retry: !1
                    }, a || {});
                    var o, l = k.$current,
                        f = k.params,
                        h = l.path,
                        g = p(t, a.relative),
                        v = n["#"];
                    if (!F(g)) {
                        var $ = {
                                to: t,
                                toParams: n,
                                options: a
                            },
                            y = b($, l.self, f, a);
                        if (y) return y;
                        if (t = $.to, n = $.toParams, a = $.options, g = p(t, a.relative), !F(g)) {
                            if (!a.relative) throw new Error("No such state '" + t + "'");
                            throw new Error("Could not resolve '" + t + "' from state '" + a.relative + "'")
                        }
                    }
                    if (g[D]) throw new Error("Cannot transition to abstract state '" + t + "'");
                    if (a.inherit && (n = u(d, n || {}, k.$current, g)), !g.params.$$validates(n)) return O;
                    n = g.params.$$values(n), t = g;
                    var S = t.path,
                        A = 0,
                        M = S[A],
                        P = C.locals,
                        j = [];
                    if (a.reload) {
                        if (V(a.reload) || R(a.reload)) {
                            if (R(a.reload) && !a.reload.name) throw new Error("Invalid reload state object");
                            var N = a.reload === !0 ? h[0] : p(a.reload);
                            if (a.reload && !N) throw new Error("No such reload state '" + (V(a.reload) ? a.reload : a.reload.name) + "'");
                            for (; M && M === h[A] && M !== N;) P = j[A] = M.locals, A++, M = S[A]
                        }
                    } else
                        for (; M && M === h[A] && M.ownParams.$$equals(n, f);) P = j[A] = M.locals, A++, M = S[A];
                    if (x(t, n, l, f, P, a)) return v && (n["#"] = v), k.params = n, B(k.params, d), B(c(t.params.$$keys(), d), t.locals.globals.$stateParams), a.location && t.navigable && t.navigable.url && (m.push(t.navigable.url, n, {
                        $$avoidResync: !0,
                        replace: "replace" === a.location
                    }), m.update(!0)), k.transition = null, i.when(k.current);
                    if (n = c(t.params.$$keys(), n || {}), v && (n["#"] = v), a.notify && e.$broadcast("$stateChangeStart", t.self, n, l.self, f, a).defaultPrevented) return e.$broadcast("$stateChangeCancel", t.self, n, l.self, f), null == k.transition && m.update(), T;
                    for (var L = i.when(P), I = A; I < S.length; I++, M = S[I]) P = j[I] = r(P), L = w(M, n, M === t, L, P, a);
                    var q = k.transition = L.then(function() {
                        var r, i, o;
                        if (k.transition !== q) return E;
                        for (r = h.length - 1; r >= A; r--) o = h[r], o.self.onExit && s.invoke(o.self.onExit, o.self, o.locals.globals), o.locals = null;
                        for (r = A; r < S.length; r++) i = S[r], i.locals = j[r], i.self.onEnter && s.invoke(i.self.onEnter, i.self, i.locals.globals);
                        return k.transition !== q ? E : (k.$current = t, k.current = t.self, k.params = n, B(k.params, d), k.transition = null, a.location && t.navigable && m.push(t.navigable.url, t.navigable.locals.globals.$stateParams, {
                            $$avoidResync: !0,
                            replace: "replace" === a.location
                        }), a.notify && e.$broadcast("$stateChangeSuccess", t.self, n, l.self, f), m.update(!0), k.current)
                    }, function(r) {
                        return k.transition !== q ? E : (k.transition = null, o = e.$broadcast("$stateChangeError", t.self, n, l.self, f, r), o.defaultPrevented || m.update(), i.reject(r))
                    });
                    return q
                }, k.is = function(e, t, r) {
                    r = _({
                        relative: k.$current
                    }, r || {});
                    var i = p(e, r.relative);
                    return F(i) ? k.$current !== i ? !1 : t ? l(i.params.$$values(t), d) : !0 : n
                }, k.includes = function(e, t, r) {
                    if (r = _({
                            relative: k.$current
                        }, r || {}), V(e) && v(e)) {
                        if (!$(e)) return !1;
                        e = k.$current.name
                    }
                    var i = p(e, r.relative);
                    return F(i) ? F(k.$current.includes[i.name]) ? t ? l(i.params.$$values(t), d, o(t)) : !0 : !1 : n
                }, k.href = function(e, t, r) {
                    r = _({
                        lossy: !0,
                        inherit: !0,
                        absolute: !1,
                        relative: k.$current
                    }, r || {});
                    var i = p(e, r.relative);
                    if (!F(i)) return null;
                    r.inherit && (t = u(d, t || {}, k.$current, i));
                    var a = i && r.lossy ? i.navigable : i;
                    return a && a.url !== n && null !== a.url ? m.href(a.url, c(i.params.$$keys().concat("#"), t || {}), {
                        absolute: r.absolute
                    }) : null
                }, k.get = function(e, t) {
                    if (0 === arguments.length) return h(o(S), function(e) {
                        return S[e].self
                    });
                    var n = p(e, t || k.$current);
                    return n && n.self ? n.self : null
                }, k
            }

            function x(e, t, n, r, i, a) {
                function o(e, t, n) {
                    function r(t) {
                        return "search" != e.params[t].location
                    }
                    var i = e.params.$$keys().filter(r),
                        a = f.apply({}, [e.params].concat(i)),
                        o = new W.ParamSet(a);
                    return o.$$equals(t, n)
                }
                return !a.reload && e === n && (i === n.locals || e.self.reloadOnSearch === !1 && o(n, r, t)) ? !0 : void 0
            }
            var C, k, S = {},
                E = {},
                D = "abstract",
                T = {
                    parent: function(e) {
                        if (F(e.parent) && e.parent) return p(e.parent);
                        var t = /^(.+)\.[^.]+$/.exec(e.name);
                        return t ? p(t[1]) : C
                    },
                    data: function(e) {
                        return e.parent && e.parent.data && (e.data = e.self.data = r(e.parent.data, e.data)), e.data
                    },
                    url: function(e) {
                        var t = e.url,
                            n = {
                                params: e.params || {}
                            };
                        if (V(t)) return "^" == t.charAt(0) ? i.compile(t.substring(1), n) : (e.parent.navigable || C).url.concat(t, n);
                        if (!t || i.isMatcher(t)) return t;
                        throw new Error("Invalid url '" + t + "' in state '" + e + "'")
                    },
                    navigable: function(e) {
                        return e.url ? e : e.parent ? e.parent.navigable : null
                    },
                    ownParams: function(e) {
                        var t = e.url && e.url.params || new W.ParamSet;
                        return H(e.params || {}, function(e, n) {
                            t[n] || (t[n] = new W.Param(n, null, e, "config"))
                        }), t
                    },
                    params: function(e) {
                        var t = f(e.ownParams, e.ownParams.$$keys());
                        return e.parent && e.parent.params ? _(e.parent.params.$$new(), t) : new W.ParamSet
                    },
                    views: function(e) {
                        var t = {};
                        return H(F(e.views) ? e.views : {
                            "": e
                        }, function(n, r) {
                            r.indexOf("@") < 0 && (r += "@" + e.parent.name), t[r] = n
                        }), t
                    },
                    path: function(e) {
                        return e.parent ? e.parent.path.concat(e) : []
                    },
                    includes: function(e) {
                        var t = e.parent ? _({}, e.parent.includes) : {};
                        return t[e.name] = !0, t
                    },
                    $delegates: {}
                };
            C = g({
                name: "",
                url: "^",
                views: null,
                "abstract": !0
            }), C.navigable = null, this.decorator = y, this.state = b, this.$get = w, w.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
        }

        function x() {
            function e(e, t) {
                return {
                    load: function(e, n) {
                        var r, i = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                        return n = _(i, n), n.view && (r = t.fromConfig(n.view, n.params, n.locals)), r
                    }
                }
            }
            this.$get = e, e.$inject = ["$rootScope", "$templateFactory"]
        }

        function C() {
            var e = !1;
            this.useAnchorScroll = function() {
                e = !0
            }, this.$get = ["$anchorScroll", "$timeout", function(t, n) {
                return e ? t : function(e) {
                    return n(function() {
                        e[0].scrollIntoView()
                    }, 0, !1)
                }
            }]
        }

        function k(e, n, r, i) {
            function a() {
                return n.has ? function(e) {
                    return n.has(e) ? n.get(e) : null
                } : function(e) {
                    try {
                        return n.get(e)
                    } catch (t) {
                        return null
                    }
                }
            }

            function o(e, n) {
                function r(e) {
                    return 1 === Y && G >= 4 ? !!l.enabled(e) : 1 === Y && G >= 2 ? !!l.enabled() : !!u
                }
                var i = {
                    enter: function(e, t, n) {
                        t.after(e), n()
                    },
                    leave: function(e, t) {
                        e.remove(), t()
                    }
                };
                if (e.noanimation) return i;
                if (l) return {
                    enter: function(e, n, a) {
                        r(e) ? t.version.minor > 2 ? l.enter(e, null, n).then(a) : l.enter(e, null, n, a) : i.enter(e, n, a)
                    },
                    leave: function(e, n) {
                        r(e) ? t.version.minor > 2 ? l.leave(e).then(n) : l.leave(e, n) : i.leave(e, n)
                    }
                };
                if (u) {
                    var a = u && u(n, e);
                    return {
                        enter: function(e, t, n) {
                            a.enter(e, null, t), n()
                        },
                        leave: function(e, t) {
                            a.leave(e), t()
                        }
                    }
                }
                return i
            }
            var s = a(),
                u = s("$animator"),
                l = s("$animate"),
                c = {
                    restrict: "ECA",
                    terminal: !0,
                    priority: 400,
                    transclude: "element",
                    compile: function(n, a, s) {
                        return function(n, a, u) {
                            function l() {
                                function e() {
                                    t && t.remove(), n && n.$destroy()
                                }
                                var t = f,
                                    n = d;
                                n && (n._willBeDestroyed = !0), p ? (v.leave(p, function() {
                                    e(), f = null
                                }), f = p) : (e(), f = null), p = null, d = null
                            }

                            function c(o) {
                                var c, f = E(n, u, a, i),
                                    $ = f && e.$current && e.$current.locals[f];
                                if ((o || $ !== h) && !n._willBeDestroyed) {
                                    c = n.$new(), h = e.$current.locals[f], c.$emit("$viewContentLoading", f);
                                    var y = s(c, function(e) {
                                        v.enter(e, a, function() {
                                            d && d.$emit("$viewContentAnimationEnded"), (t.isDefined(g) && !g || n.$eval(g)) && r(e)
                                        }), l()
                                    });
                                    p = y, d = c, d.$emit("$viewContentLoaded", f), d.$eval(m)
                                }
                            }
                            var f, p, d, h, m = u.onload || "",
                                g = u.autoscroll,
                                v = o(u, n);
                            n.$on("$stateChangeSuccess", function() {
                                c(!1)
                            }), c(!0)
                        }
                    }
                };
            return c
        }

        function S(e, t, n, r) {
            return {
                restrict: "ECA",
                priority: -400,
                compile: function(i) {
                    var a = i.html();
                    return function(i, o, s) {
                        var u = n.$current,
                            l = E(i, s, o, r),
                            c = u && u.locals[l];
                        if (c) {
                            o.data("$uiView", {
                                name: l,
                                state: c.$$state
                            }), o.html(c.$template ? c.$template : a);
                            var f = e(o.contents());
                            if (c.$$controller) {
                                c.$scope = i, c.$element = o;
                                var p = t(c.$$controller, c);
                                c.$$controllerAs && (i[c.$$controllerAs] = p), o.data("$ngControllerController", p), o.children().data("$ngControllerController", p)
                            }
                            f(i)
                        }
                    }
                }
            }
        }

        function E(e, t, n, r) {
            var i = r(t.uiView || t.name || "")(e),
                a = n.inheritedData("$uiView");
            return i.indexOf("@") >= 0 ? i : i + "@" + (a ? a.state.name : "")
        }

        function D(e, t) {
            var n, r = e.match(/^\s*({[^}]*})\s*$/);
            if (r && (e = t + "(" + r[1] + ")"), n = e.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !n || 4 !== n.length) throw new Error("Invalid state ref '" + e + "'");
            return {
                state: n[1],
                paramExpr: n[3] || null
            }
        }

        function T(e) {
            var t = e.parent().inheritedData("$uiView");
            return t && t.state && t.state.name ? t.state : void 0
        }

        function A(e) {
            var t = "[object SVGAnimatedString]" === Object.prototype.toString.call(e.prop("href")),
                n = "FORM" === e[0].nodeName;
            return {
                attr: n ? "action" : t ? "xlink:href" : "href",
                isAnchor: "A" === e.prop("tagName").toUpperCase(),
                clickable: !n
            }
        }

        function O(e, t, n, r, i) {
            return function(a) {
                var o = a.which || a.button,
                    s = i();
                if (!(o > 1 || a.ctrlKey || a.metaKey || a.shiftKey || e.attr("target"))) {
                    var u = n(function() {
                        t.go(s.state, s.params, s.options)
                    });
                    a.preventDefault();
                    var l = r.isAnchor && !s.href ? 1 : 0;
                    a.preventDefault = function() {
                        l-- <= 0 && n.cancel(u)
                    }
                }
            }
        }

        function M(e, t) {
            return {
                relative: T(e) || t.$current,
                inherit: !0
            }
        }

        function P(e, n) {
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(r, i, a, o) {
                    var s = D(a.uiSref, e.current.name),
                        u = {
                            state: s.state,
                            href: null,
                            params: null
                        },
                        l = A(i),
                        c = o[1] || o[0];
                    u.options = _(M(i, e), a.uiSrefOpts ? r.$eval(a.uiSrefOpts) : {});
                    var f = function(n) {
                        n && (u.params = t.copy(n)), u.href = e.href(s.state, u.params, u.options), c && c.$$addStateInfo(s.state, u.params), null !== u.href && a.$set(l.attr, u.href)
                    };
                    s.paramExpr && (r.$watch(s.paramExpr, function(e) {
                        e !== u.params && f(e)
                    }, !0), u.params = t.copy(r.$eval(s.paramExpr))), f(), l.clickable && i.bind("click", O(i, e, n, l, function() {
                        return u
                    }))
                }
            }
        }

        function j(e, t) {
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(n, r, i, a) {
                    function o(t) {
                        f.state = t[0], f.params = t[1], f.options = t[2], f.href = e.href(f.state, f.params, f.options), u && u.$$addStateInfo(f.state, f.params), f.href && i.$set(s.attr, f.href)
                    }
                    var s = A(r),
                        u = a[1] || a[0],
                        l = [i.uiState, i.uiStateParams || null, i.uiStateOpts || null],
                        c = "[" + l.map(function(e) {
                            return e || "null"
                        }).join(", ") + "]",
                        f = {
                            state: null,
                            params: null,
                            options: null,
                            href: null
                        };
                    n.$watch(c, o, !0), o(n.$eval(c)), s.clickable && r.bind("click", O(r, e, t, s, function() {
                        return f
                    }))
                }
            }
        }

        function N(e, t, n) {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", "$timeout", function(t, r, i, a) {
                    function o(t, n, i) {
                        var a = e.get(t, T(r)),
                            o = s(t, n);
                        m.push({
                            state: a || {
                                name: t
                            },
                            params: n,
                            hash: o
                        }), g[o] = i
                    }

                    function s(e, n) {
                        if (!V(e)) throw new Error("state should be a string");
                        return R(n) ? e + z(n) : (n = t.$eval(n), R(n) ? e + z(n) : e)
                    }

                    function u() {
                        for (var e = 0; e < m.length; e++) f(m[e].state, m[e].params) ? l(r, g[m[e].hash]) : c(r, g[m[e].hash]), p(m[e].state, m[e].params) ? l(r, d) : c(r, d)
                    }

                    function l(e, t) {
                        a(function() {
                            e.addClass(t)
                        })
                    }

                    function c(e, t) {
                        e.removeClass(t)
                    }

                    function f(t, n) {
                        return e.includes(t.name, n)
                    }

                    function p(t, n) {
                        return e.is(t.name, n)
                    }
                    var d, h, m = [],
                        g = {};
                    d = n(i.uiSrefActiveEq || "", !1)(t);
                    try {
                        h = t.$eval(i.uiSrefActive)
                    } catch (v) {}
                    h = h || n(i.uiSrefActive || "", !1)(t), R(h) && H(h, function(n, r) {
                        if (V(n)) {
                            var i = D(n, e.current.name);
                            o(i.state, t.$eval(i.paramExpr), r)
                        }
                    }), this.$$addStateInfo = function(e, t) {
                        R(h) && m.length > 0 || (o(e, t, h), u())
                    }, t.$on("$stateChangeSuccess", u), u()
                }]
            }
        }

        function L(e) {
            var t = function(t, n) {
                return e.is(t, n)
            };
            return t.$stateful = !0, t
        }

        function I(e) {
            var t = function(t, n, r) {
                return e.includes(t, n, r)
            };
            return t.$stateful = !0, t
        }
        var F = t.isDefined,
            q = t.isFunction,
            V = t.isString,
            R = t.isObject,
            U = t.isArray,
            H = t.forEach,
            _ = t.extend,
            B = t.copy,
            z = t.toJson;
        t.module("ui.router.util", ["ng"]), t.module("ui.router.router", ["ui.router.util"]), t.module("ui.router.state", ["ui.router.router", "ui.router.util"]), t.module("ui.router", ["ui.router.state"]), t.module("ui.router.compat", ["ui.router"]), m.$inject = ["$q", "$injector"], t.module("ui.router.util").service("$resolve", m), g.$inject = ["$http", "$templateCache", "$injector"], t.module("ui.router.util").service("$templateFactory", g);
        var W;
        v.prototype.concat = function(e, t) {
            var n = {
                caseInsensitive: W.caseInsensitive(),
                strict: W.strictMode(),
                squash: W.defaultSquashPolicy()
            };
            return new v(this.sourcePath + e + this.sourceSearch, _(n, t), this)
        }, v.prototype.toString = function() {
            return this.source
        }, v.prototype.exec = function(e, t) {
            function n(e) {
                function t(e) {
                    return e.split("").reverse().join("")
                }

                function n(e) {
                    return e.replace(/\\-/g, "-")
                }
                var r = t(e).split(/-(?!\\)/),
                    i = h(r, t);
                return h(i, n).reverse()
            }
            var r = this.regexp.exec(e);
            if (!r) return null;
            t = t || {};
            var i, a, o, s = this.parameters(),
                u = s.length,
                l = this.segments.length - 1,
                c = {};
            if (l !== r.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
            var f, p;
            for (i = 0; l > i; i++) {
                for (o = s[i], f = this.params[o], p = r[i + 1], a = 0; a < f.replace.length; a++) f.replace[a].from === p && (p = f.replace[a].to);
                p && f.array === !0 && (p = n(p)), F(p) && (p = f.type.decode(p)), c[o] = f.value(p)
            }
            for (; u > i; i++) {
                for (o = s[i], c[o] = this.params[o].value(t[o]), f = this.params[o], p = t[o], a = 0; a < f.replace.length; a++) f.replace[a].from === p && (p = f.replace[a].to);
                F(p) && (p = f.type.decode(p)), c[o] = f.value(p)
            }
            return c
        }, v.prototype.parameters = function(e) {
            return F(e) ? this.params[e] || null : this.$$paramNames
        }, v.prototype.validates = function(e) {
            return this.params.$$validates(e)
        }, v.prototype.format = function(e) {
            function t(e) {
                return encodeURIComponent(e).replace(/-/g, function(e) {
                    return "%5C%" + e.charCodeAt(0).toString(16).toUpperCase()
                })
            }
            e = e || {};
            var n = this.segments,
                r = this.parameters(),
                i = this.params;
            if (!this.validates(e)) return null;
            var a, o = !1,
                s = n.length - 1,
                u = r.length,
                l = n[0];
            for (a = 0; u > a; a++) {
                var c = s > a,
                    f = r[a],
                    p = i[f],
                    d = p.value(e[f]),
                    m = p.isOptional && p.type.equals(p.value(), d),
                    g = m ? p.squash : !1,
                    v = p.type.encode(d);
                if (c) {
                    var $ = n[a + 1],
                        y = a + 1 === s;
                    if (g === !1) null != v && (l += U(v) ? h(v, t).join("-") : encodeURIComponent(v)), l += $;
                    else if (g === !0) {
                        var b = l.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                        l += $.match(b)[1]
                    } else V(g) && (l += g + $);
                    y && p.squash === !0 && "/" === l.slice(-1) && (l = l.slice(0, -1))
                } else {
                    if (null == v || m && g !== !1) continue;
                    if (U(v) || (v = [v]), 0 === v.length) continue;
                    v = h(v, encodeURIComponent).join("&" + f + "="), l += (o ? "&" : "?") + (f + "=" + v), o = !0
                }
            }
            return l
        }, $.prototype.is = function(e, t) {
            return !0
        }, $.prototype.encode = function(e, t) {
            return e
        }, $.prototype.decode = function(e, t) {
            return e
        }, $.prototype.equals = function(e, t) {
            return e == t
        }, $.prototype.$subPattern = function() {
            var e = this.pattern.toString();
            return e.substr(1, e.length - 2)
        }, $.prototype.pattern = /.*/, $.prototype.toString = function() {
            return "{Type:" + this.name + "}"
        }, $.prototype.$normalize = function(e) {
            return this.is(e) ? e : this.decode(e)
        }, $.prototype.$asArray = function(e, t) {
            function r(e, t) {
                function r(e, t) {
                    return function() {
                        return e[t].apply(e, arguments)
                    }
                }

                function i(e) {
                    return U(e) ? e : F(e) ? [e] : []
                }

                function a(e) {
                    switch (e.length) {
                        case 0:
                            return n;
                        case 1:
                            return "auto" === t ? e[0] : e;
                        default:
                            return e
                    }
                }

                function o(e) {
                    return !e
                }

                function s(e, t) {
                    return function(n) {
                        if (U(n) && 0 === n.length) return n;
                        n = i(n);
                        var r = h(n, e);
                        return t === !0 ? 0 === d(r, o).length : a(r)
                    }
                }

                function u(e) {
                    return function(t, n) {
                        var r = i(t),
                            a = i(n);
                        if (r.length !== a.length) return !1;
                        for (var o = 0; o < r.length; o++)
                            if (!e(r[o], a[o])) return !1;
                        return !0
                    }
                }
                this.encode = s(r(e, "encode")), this.decode = s(r(e, "decode")), this.is = s(r(e, "is"), !0), this.equals = u(r(e, "equals")), this.pattern = e.pattern, this.$normalize = s(r(e, "$normalize")), this.name = e.name, this.$arrayMode = t
            }
            if (!e) return this;
            if ("auto" === e && !t) throw new Error("'auto' array mode is for query parameters only");
            return new r(this, e)
        }, t.module("ui.router.util").provider("$urlMatcherFactory", y), t.module("ui.router.util").run(["$urlMatcherFactory", function(e) {}]), b.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], t.module("ui.router.router").provider("$urlRouter", b), w.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], t.module("ui.router.state").factory("$stateParams", function() {
            return {}
        }).provider("$state", w), x.$inject = [], t.module("ui.router.state").provider("$view", x), t.module("ui.router.state").provider("$uiViewScroll", C);
        var Y = t.version.major,
            G = t.version.minor;
        k.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"], S.$inject = ["$compile", "$controller", "$state", "$interpolate"], t.module("ui.router.state").directive("uiView", k), t.module("ui.router.state").directive("uiView", S), P.$inject = ["$state", "$timeout"], j.$inject = ["$state", "$timeout"], N.$inject = ["$state", "$stateParams", "$interpolate"], t.module("ui.router.state").directive("uiSref", P).directive("uiSrefActive", N).directive("uiSrefActiveEq", N).directive("uiState", j), L.$inject = ["$state"], I.$inject = ["$state"], t.module("ui.router.state").filter("isState", L).filter("includedByState", I)
    }(window, window.angular),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["angular"], t) : e.hasOwnProperty("angular") ? t(e.angular) : "object" == typeof exports && (module.exports = t(require("angular")))
    }(this, function(e) {
        "use strict";

        function t(t) {
            return function() {
                var n = "ngStorage-";
                this.setKeyPrefix = function(e) {
                    if ("string" != typeof e) throw new TypeError("[ngStorage] - " + t + "Provider.setKeyPrefix() expects a String.");
                    n = e
                };
                var r = e.toJson,
                    i = e.fromJson;
                this.setSerializer = function(e) {
                    if ("function" != typeof e) throw new TypeError("[ngStorage] - " + t + "Provider.setSerializer expects a function.");
                    r = e
                }, this.setDeserializer = function(e) {
                    if ("function" != typeof e) throw new TypeError("[ngStorage] - " + t + "Provider.setDeserializer expects a function.");
                    i = e
                }, this.get = function(e) {
                    return i(window[t].getItem(n + e))
                }, this.set = function(e, i) {
                    return window[t].setItem(n + e, r(i))
                }, this.$get = ["$rootScope", "$window", "$log", "$timeout", "$document", function(a, o, s, u, l) {
                    function c(e) {
                        var t;
                        try {
                            t = o[e]
                        } catch (n) {
                            t = !1
                        }
                        if (t && "localStorage" === e) {
                            var r = "__" + Math.round(1e7 * Math.random());
                            try {
                                localStorage.setItem(r, r), localStorage.removeItem(r)
                            } catch (n) {
                                t = !1
                            }
                        }
                        return t
                    }
                    var f, p, d = n.length,
                        h = c(t) || (s.warn("This browser does not support Web Storage!"), {
                            setItem: e.noop,
                            getItem: e.noop,
                            removeItem: e.noop
                        }),
                        m = {
                            $default: function(t) {
                                for (var n in t) e.isDefined(m[n]) || (m[n] = e.copy(t[n]));
                                return m.$sync(), m
                            },
                            $reset: function(e) {
                                for (var t in m) "$" === t[0] || delete m[t] && h.removeItem(n + t);
                                return m.$default(e)
                            },
                            $sync: function() {
                                for (var e, t = 0, r = h.length; r > t; t++)(e = h.key(t)) && n === e.slice(0, d) && (m[e.slice(d)] = i(h.getItem(e)))
                            },
                            $apply: function() {
                                var t;
                                if (p = null, !e.equals(m, f)) {
                                    t = e.copy(f), e.forEach(m, function(i, a) {
                                        e.isDefined(i) && "$" !== a[0] && (h.setItem(n + a, r(i)), delete t[a])
                                    });
                                    for (var i in t) h.removeItem(n + i);
                                    f = e.copy(m)
                                }
                            }
                        };
                    return m.$sync(), f = e.copy(m), a.$watch(function() {
                        p || (p = u(m.$apply, 100, !1))
                    }), o.addEventListener && o.addEventListener("storage", function(t) {
                        if (t.key) {
                            var r = l[0];
                            r.hasFocus && r.hasFocus() || n !== t.key.slice(0, d) || (t.newValue ? m[t.key.slice(d)] = i(t.newValue) : delete m[t.key.slice(d)], f = e.copy(m), a.$apply())
                        }
                    }), o.addEventListener && o.addEventListener("beforeunload", function() {
                        m.$apply()
                    }), m
                }]
            }
        }
        return e = e && e.module ? e : window.angular, e.module("ngStorage", []).provider("$localStorage", t("localStorage")).provider("$sessionStorage", t("sessionStorage"))
    }), angular.module("ui.utils", ["ui.scroll", "ui.scrollpoint", "ui.event", "ui.mask", "ui.validate", "ui.indeterminate", "ui.uploader"]),
    function() {
        "use strict";
        angular.module("ui.mask", []).value("uiMaskConfig", {
            maskDefinitions: {
                9: /\d/,
                A: /[a-zA-Z]/,
                "*": /[a-zA-Z0-9]/
            },
            clearOnBlur: !0,
            eventsToHandle: ["input", "keyup", "click", "focus"]
        }).directive("uiMask", ["uiMaskConfig", function(e) {
            function t(e) {
                return e === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
            }
            return {
                priority: 100,
                require: "ngModel",
                restrict: "A",
                compile: function() {
                    var n = e;
                    return function(e, r, i, a) {
                        function o(e) {
                            return angular.isDefined(e) ? (b(e), _ ? (p(), d(), !0) : f()) : f()
                        }

                        function s(e) {
                            e && (j = e, _ && r.val(v(g(r.val()))))
                        }

                        function u() {
                            return o(i.uiMask)
                        }

                        function l(e) {
                            return _ ? (I = g(e || ""), q = m(I), a.$setValidity("mask", q), q && I.length ? v(I) : void 0) : e
                        }

                        function c(e) {
                            return _ ? (I = g(e || ""), q = m(I), a.$viewValue = I.length ? v(I) : "", a.$setValidity("mask", q), "" === I && i.required && a.$setValidity("required", !a.$error.required), q ? Y ? a.$viewValue : I : void 0) : e
                        }

                        function f() {
                            return _ = !1, h(), angular.isDefined(z) ? r.attr("placeholder", z) : r.removeAttr("placeholder"), angular.isDefined(W) ? r.attr("maxlength", W) : r.removeAttr("maxlength"), r.val(a.$modelValue), a.$viewValue = a.$modelValue, !1
                        }

                        function p() {
                            I = R = g(a.$modelValue || ""), F = V = v(I), q = m(I), i.maxlength && r.attr("maxlength", 2 * M[M.length - 1]), z || r.attr("placeholder", j);
                            for (var e = a.$modelValue, t = a.$formatters.length; t--;) e = a.$formatters[t](e);
                            a.$viewValue = e || "", a.$render()
                        }

                        function d() {
                            B || (r.bind("blur", w), r.bind("mousedown mouseup", C), r.bind(G.eventsToHandle.join(" "), E), r.bind("paste", S), B = !0)
                        }

                        function h() {
                            B && (r.unbind("blur", w), r.unbind("mousedown", C), r.unbind("mouseup", C), r.unbind("input", E), r.unbind("keyup", E), r.unbind("click", E), r.unbind("focus", E), r.unbind("paste", S), B = !1)
                        }

                        function m(e) {
                            return e.length ? e.length >= L : !0
                        }

                        function g(e) {
                            var t = "",
                                n = P.slice();
                            return e = e.toString(), angular.forEach(N, function(t) {
                                e = e.replace(t, "")
                            }), angular.forEach(e.split(""), function(e) {
                                n.length && n[0].test(e) && (t += e, n.shift())
                            }), t
                        }

                        function v(e) {
                            var t = "",
                                n = M.slice();
                            return angular.forEach(j.split(""), function(r, i) {
                                e.length && i === n[0] ? (t += e.charAt(0) || "_", e = e.substr(1), n.shift()) : t += r
                            }), t
                        }

                        function $(e) {
                            var t, n = angular.isDefined(i.uiMaskPlaceholder) ? i.uiMaskPlaceholder : i.placeholder;
                            return angular.isDefined(n) && n[e] ? n[e] : (t = angular.isDefined(i.uiMaskPlaceholderChar) && i.uiMaskPlaceholderChar ? i.uiMaskPlaceholderChar : "_", "space" === t.toLowerCase() ? " " : t[0])
                        }

                        function y() {
                            return j.replace(/[_]+/g, "_").replace(/([^_]+)([a-zA-Z0-9])([^_])/g, "$1$2_$3").split("_")
                        }

                        function b(e) {
                            var t = 0;
                            if (M = [], P = [], j = "", angular.isString(e)) {
                                L = 0;
                                var n = !1,
                                    r = 0,
                                    i = e.split("");
                                angular.forEach(i, function(e, i) {
                                    G.maskDefinitions[e] ? (M.push(t), j += $(i - r), P.push(G.maskDefinitions[e]), t++, n || L++, n = !1) : "?" === e ? (n = !0, r++) : (j += e, t++)
                                })
                            }
                            M.push(M.slice().pop() + 1), N = y(), _ = M.length > 1 ? !0 : !1
                        }

                        function w() {
                            G.clearOnBlur && (U = 0, H = 0, q && 0 !== I.length || (F = "", r.val(""), e.$apply(function() {
                                a.$viewValue = ""
                            }))), I !== K && x(r[0]), K = I
                        }

                        function x(e) {
                            var t;
                            angular.isFunction(window.Event) && !e.fireEvent ? (t = new Event("change", {
                                view: window,
                                bubbles: !0,
                                cancelable: !1
                            }), e.dispatchEvent(t)) : "createEvent" in document ? (t = document.createEvent("HTMLEvents"), t.initEvent("change", !1, !0), e.dispatchEvent(t)) : e.fireEvent && e.fireEvent("onchange")
                        }

                        function C(e) {
                            "mousedown" === e.type ? r.bind("mouseout", k) : r.unbind("mouseout", k)
                        }

                        function k() {
                            H = O(this), r.unbind("mouseout", k)
                        }

                        function S() {
                            A(this, r.val().length)
                        }

                        function E(t) {
                            t = t || {};
                            var n = t.which,
                                i = t.type;
                            if (16 !== n && 91 !== n) {
                                var o, s = r.val(),
                                    u = V,
                                    l = !1,
                                    c = g(s),
                                    f = R,
                                    p = T(this) || 0,
                                    d = U || 0,
                                    h = p - d,
                                    m = M[0],
                                    $ = M[c.length] || M.slice().shift(),
                                    y = H || 0,
                                    b = O(this) > 0,
                                    w = y > 0,
                                    x = s.length > u.length || y && s.length > u.length - y,
                                    C = s.length < u.length || y && s.length === u.length - y,
                                    k = n >= 37 && 40 >= n && t.shiftKey,
                                    S = 37 === n,
                                    E = 8 === n || "keyup" !== i && C && -1 === h,
                                    P = 46 === n || "keyup" !== i && C && 0 === h && !w,
                                    j = (S || E || "click" === i) && p > m;
                                if (H = O(this), !k && (!b || "click" !== i && "keyup" !== i)) {
                                    if ("input" === i && C && !w && c === f) {
                                        for (; E && p > m && !D(p);) p--;
                                        for (; P && $ > p && -1 === M.indexOf(p);) p++;
                                        var N = M.indexOf(p);
                                        c = c.substring(0, N) + c.substring(N + 1), l = !0
                                    }
                                    for (o = v(c), V = o, R = c, !l && s.length > o.length && (l = !0), r.val(o), l && e.$apply(function() {
                                            a.$setViewValue(c)
                                        }), x && m >= p && (p = m + 1), j && p--, p = p > $ ? $ : m > p ? m : p; !D(p) && p > m && $ > p;) p += j ? -1 : 1;
                                    (j && $ > p || x && !D(d)) && p++, U = p, A(this, p)
                                }
                            }
                        }

                        function D(e) {
                            return M.indexOf(e) > -1
                        }

                        function T(e) {
                            if (!e) return 0;
                            if (void 0 !== e.selectionStart) return e.selectionStart;
                            if (document.selection && t(r[0])) {
                                e.focus();
                                var n = document.selection.createRange();
                                return n.moveStart("character", e.value ? -e.value.length : 0), n.text.length
                            }
                            return 0
                        }

                        function A(e, n) {
                            if (!e) return 0;
                            if (0 !== e.offsetWidth && 0 !== e.offsetHeight)
                                if (e.setSelectionRange) t(r[0]) && (e.focus(), e.setSelectionRange(n, n));
                                else if (e.createTextRange) {
                                var i = e.createTextRange();
                                i.collapse(!0), i.moveEnd("character", n), i.moveStart("character", n), i.select()
                            }
                        }

                        function O(e) {
                            return e ? void 0 !== e.selectionStart ? e.selectionEnd - e.selectionStart : document.selection ? document.selection.createRange().text.length : 0 : 0
                        }
                        var M, P, j, N, L, I, F, q, V, R, U, H, _ = !1,
                            B = !1,
                            z = i.placeholder,
                            W = i.maxlength,
                            Y = !1;
                        i.$observe("modelViewValue", function(e) {
                            "true" === e && (Y = !0)
                        });
                        var G = {};
                        i.uiOptions ? (G = e.$eval("[" + i.uiOptions + "]"), G = angular.isObject(G[0]) ? function(e, t) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (void 0 === t[n] ? t[n] = angular.copy(e[n]) : angular.isObject(t[n]) && !angular.isArray(t[n]) && (t[n] = angular.extend({}, e[n], t[n])));
                            return t
                        }(n, G[0]) : n) : G = n, i.$observe("uiMask", o), angular.isDefined(i.uiMaskPlaceholder) ? i.$observe("uiMaskPlaceholder", s) : i.$observe("placeholder", s), angular.isDefined(i.uiMaskPlaceholderChar) && i.$observe("uiMaskPlaceholderChar", u), a.$formatters.push(l), a.$parsers.push(c);
                        var K = r.val();
                        r.bind("mousedown mouseup", C), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                            if (null === this) throw new TypeError;
                            var t = Object(this),
                                n = t.length >>> 0;
                            if (0 === n) return -1;
                            var r = 0;
                            if (arguments.length > 1 && (r = Number(arguments[1]), r !== r ? r = 0 : 0 !== r && r !== 1 / 0 && r !== -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= n) return -1;
                            for (var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0); n > i; i++)
                                if (i in t && t[i] === e) return i;
                            return -1
                        })
                    }
                }
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("ui.event", []).directive("uiEvent", ["$parse", function(e) {
            return function(t, n, r) {
                var i = t.$eval(r.uiEvent);
                angular.forEach(i, function(r, i) {
                    var a = e(r);
                    n.bind(i, function(e) {
                        var n = Array.prototype.slice.call(arguments);
                        n = n.splice(1), a(t, {
                            $event: e,
                            $params: n
                        }), t.$$phase || t.$apply()
                    })
                })
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("ui.validate", []).directive("uiValidate", ["$$uiValidateApplyWatch", "$$uiValidateApplyWatchCollection", function(e, t) {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(n, r, i, a) {
                    var o, s = n.$eval(i.uiValidate);
                    s && (angular.isString(s) && (s = {
                        validator: s
                    }), angular.forEach(s, function(e, t) {
                        o = function(r, i) {
                            var o = n.$eval(e, {
                                $value: r,
                                $modelValue: r,
                                $viewValue: i,
                                $name: a.$name
                            });
                            return angular.isObject(o) && angular.isFunction(o.then) ? (o.then(function() {
                                a.$setValidity(t, !0)
                            }, function() {
                                a.$setValidity(t, !1)
                            }), !0) : o
                        }, a.$validators[t] = o
                    }), i.uiValidateWatch && e(n, a, n.$eval(i.uiValidateWatch), i.uiValidateWatchObjectEquality), i.uiValidateWatchCollection && t(n, a, n.$eval(i.uiValidateWatchCollection)))
                }
            }
        }]).directive("uiValidateAsync", ["$$uiValidateApplyWatch", "$$uiValidateApplyWatchCollection", "$timeout", "$q", function(e, t, n, r) {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(n, i, a, o) {
                    var s, u = n.$eval(a.uiValidateAsync);
                    u && (angular.isString(u) && (u = {
                        validatorAsync: u
                    }), angular.forEach(u, function(e, t) {
                        s = function(t, i) {
                            var a = n.$eval(e, {
                                $value: t,
                                $modelValue: t,
                                $viewValue: i,
                                $name: o.$name
                            });
                            return angular.isObject(a) && angular.isFunction(a.then) ? a : r(function(e, t) {
                                setTimeout(function() {
                                    a ? e() : t()
                                }, 0)
                            })
                        }, o.$asyncValidators[t] = s
                    }), a.uiValidateWatch && e(n, o, n.$eval(a.uiValidateWatch), a.uiValidateWatchObjectEquality), a.uiValidateWatchCollection && t(n, o, n.$eval(a.uiValidateWatchCollection)))
                }
            }
        }]).service("$$uiValidateApplyWatch", function() {
            return function(e, t, n, r) {
                var i = function() {
                    t.$validate()
                };
                angular.isString(n) ? e.$watch(n, i, r) : angular.isArray(n) ? angular.forEach(n, function(t) {
                    e.$watch(t, i, r)
                }) : angular.isObject(n) && angular.forEach(n, function(t) {
                    angular.isString(t) && e.$watch(t, i, r), angular.isArray(t) && angular.forEach(t, function(t) {
                        e.$watch(t, i, r)
                    })
                })
            }
        }).service("$$uiValidateApplyWatchCollection", function() {
            return function(e, t, n) {
                var r = function() {
                    t.$validate()
                };
                angular.isString(n) ? e.$watchCollection(n, r) : angular.isArray(n) ? angular.forEach(n, function(t) {
                    e.$watchCollection(t, r)
                }) : angular.isObject(n) && angular.forEach(n, function(t) {
                    angular.isString(t) && e.$watchCollection(t, r), angular.isArray(t) && angular.forEach(t, function(t) {
                        e.$watchCollection(t, r)
                    })
                })
            }
        })
    }(),
    function() {
        "use strict";
        angular.module("ui.indeterminate", []).directive("uiIndeterminate", [function() {
            return {
                compile: function(e, t) {
                    return t.type && "checkbox" === t.type.toLowerCase() ? function(e, t, n) {
                        e.$watch(n.uiIndeterminate, function(e) {
                            t[0].indeterminate = !!e
                        })
                    } : angular.noop
                }
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("ui.scrollpoint", []).directive("uiScrollpoint", ["$window", function(e) {
            function t() {
                if (angular.isDefined(e.pageYOffset)) return e.pageYOffset;
                var t = document.compatMode && "BackCompat" !== document.compatMode ? document.documentElement : document.body;
                return t.scrollTop
            }
            return {
                require: "^?uiScrollpointTarget",
                scope: {
                    uiScrollpoint: "@"
                },
                link: function(n, r, i, a) {
                    function o(e) {
                        if (e) {
                            if ("string" == typeof e)
                                if ("-" === e.charAt(0)) c = !1, f = -parseFloat(e.substr(1));
                                else if ("+" === e.charAt(0)) c = !1, f = parseFloat(e.substr(1));
                            else {
                                var t = parseFloat(e);
                                !isNaN(t) && isFinite(t) && (c = !0, f = t)
                            } else if ("number" == typeof e) return void o(e.toString())
                        } else c = !1;
                        l = c ? n.uiScrollpoint : r[0].offsetTop + f
                    }

                    function s() {
                        var e = c ? n.uiScrollpoint : r[0].offsetTop + f,
                            i = a ? p[0].scrollTop : t();
                        !r.hasClass("ui-scrollpoint") && i > e ? (r.addClass("ui-scrollpoint"), l = e) : r.hasClass("ui-scrollpoint") && l > i && r.removeClass("ui-scrollpoint")
                    }

                    function u() {
                        r.removeClass("ui-scrollpoint"), l = c ? n.uiScrollpoint : r[0].offsetTop + f, s()
                    }
                    var l, c = !0,
                        f = 0,
                        p = a && a.$element || angular.element(e);
                    o(n.uiScrollpoint), n.$on("scrollpointShouldReset", u), p.on("scroll", s), s(), n.$on("$destroy", function() {
                        p.off("scroll", s)
                    }), n.$watch("uiScrollpoint", function(e) {
                        o(e), s()
                    })
                }
            }
        }]).directive("uiScrollpointTarget", [function() {
            return {
                controller: ["$element", function(e) {
                    this.$element = e
                }]
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("ui.scroll", []).directive("uiScrollViewport", function() {
            return {
                controller: ["$scope", "$element", function(e, t) {
                    return this.viewport = t, this
                }]
            }
        }).directive("uiScroll", ["$log", "$injector", "$rootScope", "$timeout", "$q", "$parse", function(e, t, n, r, i, a) {
            var o;
            return t.has && t.has("$animate") && (o = t.get("$animate")), {
                require: ["?^uiScrollViewport"],
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                compile: function(s, u, l) {
                    return function(s, u, c, f) {
                        var p, d, h, m, g, v, $, y, b, w, x, C, k, S, E, D, T, A, O, M, P, j, N, L, I, F, q, V, R, U, H, _, B, z, W, Y, G, K, X, J, Q, Z, ee, te, ne, re, ie, ae, oe, se, ue;
                        if (_ = e.debug || e.log, !(B = c.uiScroll.match(/^\s*(\w+)\s+in\s+([\w\.]+)\s*$/))) throw new Error("Expected uiScroll in form of '_item_ in _datasource_' but got ' + $attr.uiScroll + '");
                        if (U = B[1], D = B[2], E = a(D)(s), V = function() {
                                return angular.isObject(E) && angular.isFunction(E.get)
                            }, !V() && (E = t.get(D), !V())) throw new Error(D + " is not a valid datasource");
                        return w = Math.max(3, +c.bufferSize || 10), b = function() {
                            return ae.outerHeight() * Math.max(.1, +c.padding || .1)
                        }, Z = function(e) {
                            var t;
                            return null != (t = e[0].scrollHeight) ? t : e[0].document.documentElement.scrollHeight
                        }, x = null, Q = 0, j = 1, z = 1, y = [], W = [], O = !1, v = !1, q = 1 === angular.version.major && angular.version.minor < 3, X = o ? q ? function(e) {
                            var t;
                            return y.splice(y.indexOf(e), 1), t = i.defer(), o.leave(e.element, function() {
                                return e.scope.$destroy(), t.resolve()
                            }), [t.promise]
                        } : function(e) {
                            return y.splice(y.indexOf(e), 1), [o.leave(e.element).then(function() {
                                return e.scope.$destroy()
                            })]
                        } : function(e) {
                            return y.splice(y.indexOf(e), 1), e.element.remove(), e.scope.$destroy(), []
                        }, N = function(e, t) {
                            return u.after.apply(t, [e]), []
                        }, L = o ? q ? function(e, t) {
                            var n;
                            return n = i.defer(), o.enter(e, u, t, function() {
                                return n.resolve()
                            }), [n.promise]
                        } : function(e, t) {
                            return [o.enter(e, u, t)]
                        } : N, l(s.$new(), function(e, t) {
                            var n, r, i, a, o;
                            if (t.$destroy(), i = e[0].localName, "dl" === i) throw new Error("ui-scroll directive does not support <" + e[0].localName + "> as a repeating tag: " + e[0].outerHTML);
                            return "li" !== i && "tr" !== i && (i = "div"), o = f[0] && f[0].viewport ? f[0].viewport : angular.element(window), o.css({
                                "overflow-y": "auto",
                                display: "block"
                            }), r = function(e) {
                                var t, n, r;
                                switch (e) {
                                    case "tr":
                                        r = angular.element("<table><tr><td><div></div></td></tr></table>"), t = r.find("div"), n = r.find("tr"), n.paddingHeight = function() {
                                            return t.height.apply(t, arguments)
                                        };
                                        break;
                                    default:
                                        n = angular.element("<" + e + "></" + e + ">"), n.paddingHeight = n.height
                                }
                                return n
                            }, a = r(i), u.before(a), n = r(i), u.after(n), s.$on("$destroy", function() {
                                return e.remove()
                            }), x = {
                                viewport: o,
                                topPadding: function() {
                                    return a.paddingHeight.apply(a, arguments)
                                },
                                bottomPadding: function() {
                                    return n.paddingHeight.apply(n, arguments)
                                },
                                bottomDataPos: function() {
                                    return Z(o) - n.paddingHeight()
                                },
                                topDataPos: function() {
                                    return a.paddingHeight()
                                },
                                insertElement: function(e, t) {
                                    return N(e, t || a)
                                },
                                insertElementAnimated: function(e, t) {
                                    return L(e, t || a)
                                }
                            }
                        }), ae = x.viewport, oe = ae.scope() || n, ne = function(e) {
                            return p.topVisible = e.scope[U], p.topVisibleElement = e.element, p.topVisibleScope = e.scope, c.topVisible && a(c.topVisible).assign(oe, p.topVisible), c.topVisibleElement && a(c.topVisibleElement).assign(oe, p.topVisibleElement), c.topVisibleScope && a(c.topVisibleScope).assign(oe, p.topVisibleScope), angular.isFunction(E.topVisible) ? E.topVisible(e) : void 0
                        }, H = function(e) {
                            return p.isLoading = e, c.isLoading && a(c.isLoading).assign(s, e), angular.isFunction(E.loading) ? E.loading(e) : void 0
                        }, K = function(e, t) {
                            var n, r, i, a;
                            for (n = r = i = e, a = t; a >= i ? a > r : r > a; n = a >= i ? ++r : --r) y[n].scope.$destroy(), y[n].element.remove();
                            return y.splice(e, t - e)
                        }, T = function() {
                            return Q++, W = []
                        }, G = function() {
                            return T(), j = 1, z = 1, K(0, y.length), x.topPadding(0), x.bottomPadding(0), O = !1, v = !1, h(Q)
                        }, $ = function() {
                            return ae.scrollTop() + ae.outerHeight()
                        }, re = function() {
                            return ae.scrollTop()
                        }, ee = function() {
                            return !O && x.bottomDataPos() < $() + b()
                        }, k = function() {
                            var e, t, n, r, i, a, o, s, u, l;
                            for (e = 0, s = 0, t = a = u = y.length - 1; 0 >= u ? 0 >= a : a >= 0; t = 0 >= u ? ++a : --a)
                                if (n = y[t], i = n.element.offset().top, o = l !== i, l = i, o && (r = n.element.outerHeight(!0)), x.bottomDataPos() - e - r > $() + b()) o && (e += r), s++, O = !1;
                                else {
                                    if (o) break;
                                    s++
                                }
                            return s > 0 ? (x.bottomPadding(x.bottomPadding() + e), K(y.length - s, y.length), z -= s) : void 0
                        }, te = function() {
                            return !v && x.topDataPos() > re() - b()
                        }, S = function() {
                            var e, t, n, r, i, a, o, s, u;
                            for (u = 0, o = 0, r = 0, i = y.length; i > r; r++)
                                if (e = y[r], n = e.element.offset().top, a = s !== n, s = n, a && (t = e.element.outerHeight(!0)), x.topDataPos() + u + t < re() - b()) a && (u += t), o++, v = !1;
                                else {
                                    if (a) break;
                                    o++
                                }
                            return o > 0 ? (x.topPadding(x.topPadding() + u), K(0, o), j += o) : void 0
                        }, A = function(e, t) {
                            return p.isLoading || H(!0), 1 === W.push(t) ? P(e) : void 0
                        }, I = function(e, t) {
                            var n, r;
                            if (n = s.$new(), n[U] = t, r = {
                                    scope: n
                                }, l(n, function(e) {
                                    return r.element = e
                                }), e % 1 === 0) return r.op = "insert", y.splice(e, 0, r);
                            switch (r.op = e, e) {
                                case "append":
                                    return y.push(r);
                                case "prepend":
                                    return y.unshift(r)
                            }
                        }, R = function(e) {
                            return e.element.height() && e.element[0].offsetParent
                        }, se = function(e) {
                            var t, n, r;
                            if (R(e)) {
                                for (n = 0, r = y.length; r > n; n++) t = y[n], angular.isFunction(t.unregisterVisibilityWatcher) && (t.unregisterVisibilityWatcher(), delete t.unregisterVisibilityWatcher);
                                return h()
                            }
                        }, F = function(e, t) {
                            return x.insertElement(e.element, t), R(e) ? !0 : (e.unregisterVisibilityWatcher = e.scope.$watch(function() {
                                return se(e)
                            }), !1)
                        }, Y = function(e) {
                            var t, n, r, a, o, s, u, l, c, f, p, d, m, g, v, $, b;
                            for (g = [], v = [], $ = [], t = x.bottomDataPos(), r = o = 0, c = y.length; c > o; r = ++o) switch (b = y[r], b.op) {
                                case "prepend":
                                    v.unshift(b);
                                    break;
                                case "append":
                                    u = 0 === r ? F(b) || u : F(b, y[r - 1].element) || u, b.op = "none";
                                    break;
                                case "insert":
                                    g = 0 === r ? g.concat(x.insertElementAnimated(b.element)) : g.concat(x.insertElementAnimated(b.element, y[r - 1].element)), b.op = "none";
                                    break;
                                case "remove":
                                    $.push(b)
                            }
                            for (s = 0, f = $.length; f > s; s++) b = $[s], g = g.concat(X(b));
                            if (x.bottomPadding(Math.max(0, x.bottomPadding() - (x.bottomDataPos() - t))), v.length) {
                                for (t = x.bottomDataPos(), l = 0, p = v.length; p > l; l++) b = v[l], u = F(b) || u, b.op = "none";
                                n = x.bottomDataPos() - t, x.topPadding() >= n ? x.topPadding(x.topPadding() - n) : ae.scrollTop(ae.scrollTop() + n)
                            }
                            for (r = m = 0, d = y.length; d > m; r = ++m) a = y[r], a.scope.$index = j + r;
                            return g.length && i.all(g).then(function() {
                                return h(e)
                            }), u
                        }, C = function() {
                            var e, t, n, r, i, a, o, s, u;
                            for (u = 0, o = [], r = 0, i = y.length; i > r; r++) {
                                if (e = y[r], n = e.element.offset().top, a = s !== n, s = n, a && (t = e.element.outerHeight(!0)), !(a && x.topDataPos() + u + t < re())) {
                                    a && ne(e);
                                    break
                                }
                                o.push(u += t)
                            }
                            return o
                        }, h = function(e) {
                            return r(function() {
                                return Y(e), ee() ? A(e, !0) : te() && A(e, !1), 0 === W.length ? C() : void 0
                            })
                        }, m = function(e) {
                            return r(function() {
                                var t;
                                return t = Y(e), ee() ? t && A(e, !0) : te() && (t || W[0]) && A(e, !1), W.shift(), 0 === W.length ? (H(!1), C()) : P(e)
                            })
                        }, P = function(e) {
                            return W[0] ? y.length && !ee() ? m(e) : E.get(z, w, function(t) {
                                var n, r, i;
                                if (!(e && e !== Q || s.$$destroyed)) {
                                    if (t.length < w && (O = !0, x.bottomPadding(0)), t.length > 0)
                                        for (S(), r = 0, i = t.length; i > r; r++) n = t[r], ++z, I("append", n);
                                    return m(e)
                                }
                            }) : y.length && !te() ? m(e) : E.get(j - w, w, function(t) {
                                var n, r, i;
                                if (!(e && e !== Q || s.$$destroyed)) {
                                    if (t.length < w && (v = !0, x.topPadding(0)), t.length > 0)
                                        for (y.length && k(), n = r = i = t.length - 1; 0 >= i ? 0 >= r : r >= 0; n = 0 >= i ? ++r : --r) --j, I("prepend", t[n]);
                                    return m(e)
                                }
                            })
                        }, J = function() {
                            return n.$$phase || p.isLoading ? void 0 : (h(), s.$apply())
                        }, ue = function(e) {
                            var t, n;
                            return t = ae[0].scrollTop, n = ae[0].scrollHeight - ae[0].clientHeight, 0 === t && !v || t === n && !O ? e.preventDefault() : void 0
                        }, ae.bind("resize", J), ae.bind("scroll", J), ae.bind("mousewheel", ue), s.$watch(E.revision, G), s.$on("$destroy", function() {
                            var e, t, n;
                            for (t = 0, n = y.length; n > t; t++) e = y[t], e.scope.$destroy(), e.element.remove();
                            return ae.unbind("resize", J), ae.unbind("scroll", J), ae.unbind("mousewheel", ue)
                        }), p = {}, p.isLoading = !1, p.reload = G, g = function(e, t) {
                            var n, r, i, a, o, s, u;
                            if (angular.isArray(t)) {
                                for (s = y.indexOf(e) + 1, u = t.reverse(), n = r = 0, a = u.length; a > r; n = ++r) o = u[n], o === e.scope[U] ? (i = !0, s--) : I(s, o);
                                if (!i) return e.op = "remove"
                            }
                        }, p.applyUpdates = function(e, t) {
                            var n, r, i, a, o, s;
                            if (T(), angular.isFunction(e))
                                for (n = y.slice(0), r = i = 0, a = n.length; a > i; r = ++i) s = n[r], g(s, e(s.scope[U], s.scope, s.element));
                            else {
                                if (e % 1 !== 0) throw new Error("applyUpdates - " + e + " is not a valid index");
                                0 <= (o = e - j) && o < y.length && g(y[e - j], t)
                            }
                            return h(Q)
                        }, p.append = function(e) {
                            var t, n, r;
                            for (T(), n = 0, r = e.length; r > n; n++) t = e[n], ++z, I("append", t);
                            return h(Q)
                        }, p.prepend = function(e) {
                            var t, n, r, i;
                            for (T(), i = e.reverse(), n = 0, r = i.length; r > n; n++) t = i[n], --j, I("prepend", t);
                            return h(Q)
                        }, c.adapter && (d = a(c.adapter)(s), d || (a(c.adapter).assign(s, {}), d = a(c.adapter)(s)), angular.extend(d, p), p = d), ie = function(e) {
                            throw new Error(e + " event is no longer supported - use applyUpdates instead")
                        }, M = E.scope ? E.scope.$new() : s.$new(), M.$on("insert.item", function() {
                            return ie("insert")
                        }), M.$on("update.items", function() {
                            return ie("update")
                        }), M.$on("delete.items", function() {
                            return ie("delete")
                        })
                    }
                }
            }
        }])
    }(),
    function() {
        "use strict";

        function e(e) {
            function t(e) {
                for (var t = 0; t < e.length; t++) l.files.push(e[t])
            }

            function n() {
                return l.files
            }

            function r(e) {
                l.options = e;
                for (var t = 0; t < l.files.length && l.activeUploads != l.options.concurrency; t++) l.files[t].active || u(l.files[t], l.options.url, l.options.data)
            }

            function i(e) {
                l.files.splice(l.files.indexOf(e), 1)
            }

            function a() {
                l.files.splice(0, l.files.length)
            }

            function o(e) {
                var t = ["n/a", "bytes", "KiB", "MiB", "GiB", "TB", "PB", "EiB", "ZiB", "YiB"],
                    n = 0 === e ? 0 : +Math.floor(Math.log(e) / Math.log(1024));
                return (e / Math.pow(1024, n)).toFixed(n ? 1 : 0) + " " + t[isNaN(e) ? 0 : n + 1]
            }

            function s(e) {
                return typeof e == typeof Function
            }

            function u(e, t, n) {
                var i, a, u, c = "file";
                if (n = n || {}, l.activeUploads += 1, e.active = !0, i = new window.XMLHttpRequest, n.withCredentials === !0 && (i.withCredentials = !0), a = new window.FormData, i.open("POST", t), i.upload.onloadstart = function() {}, i.upload.onprogress = function(t) {
                        t.lengthComputable && (e.loaded = t.loaded, e.humanSize = o(t.loaded), s(l.options.onProgress) && l.options.onProgress(e))
                    }, i.onload = function() {
                        l.activeUploads -= 1, l.uploadedFiles += 1, r(l.options), s(l.options.onCompleted) && l.options.onCompleted(e, i.responseText, i.status), l.uploadedFiles === l.files.length && (l.uploadedFiles = 0, s(l.options.onCompletedAll) && l.options.onCompletedAll(l.files))
                    }, i.onerror = function(e) {
                        s(l.options.onError) && l.options.onError(e)
                    }, n)
                    for (u in n) n.hasOwnProperty(u) && a.append(u, n[u]);
                return a.append(c, e, e.name), i.send(a), i
            }
            var l = this;
            return l.files = [], l.options = {}, l.activeUploads = 0, l.uploadedFiles = 0, e.info("uiUploader loaded"), {
                addFiles: t,
                getFiles: n,
                files: l.files,
                startUpload: r,
                removeFile: i,
                removeAll: a
            }
        }
        angular.module("ui.uploader", []).service("uiUploader", e), e.$inject = ["$log"]
    }(),
    function(e, t, n) {
        "use strict";

        function r() {
            var e = !1;
            this.$get = ["$$sanitizeUri", function(n) {
                return e && t.extend(C, w),
                    function(e) {
                        var t = [];
                        return o(e, l(t, function(e, t) {
                            return !/^unsafe:/.test(n(e, t))
                        })), t.join("")
                    }
            }], this.enableSvg = function(n) {
                return t.isDefined(n) ? (e = n, this) : e
            }
        }

        function i(e) {
            var n = [],
                r = l(n, t.noop);
            return r.chars(e), n.join("")
        }

        function a(e, n) {
            var r, i = {},
                a = e.split(",");
            for (r = 0; r < a.length; r++) i[n ? t.lowercase(a[r]) : a[r]] = !0;
            return i
        }

        function o(e, t) {
            null === e || e === n ? e = "" : "string" != typeof e && (e = "" + e), f.innerHTML = e;
            var r = 5;
            do {
                if (0 === r) throw p("uinput", "Failed to sanitize html because the input is unstable");
                r--, document.documentMode <= 11 && c(f), e = f.innerHTML, f.innerHTML = e
            } while (e !== f.innerHTML);
            for (var i = f.firstChild; i;) {
                switch (i.nodeType) {
                    case 1:
                        t.start(i.nodeName.toLowerCase(), s(i.attributes));
                        break;
                    case 3:
                        t.chars(i.textContent)
                }
                var a;
                if (!(a = i.firstChild) && (1 == i.nodeType && t.end(i.nodeName.toLowerCase()), a = i.nextSibling, !a))
                    for (; null == a && (i = i.parentNode, i !== f);) a = i.nextSibling, 1 == i.nodeType && t.end(i.nodeName.toLowerCase());
                i = a
            }
            for (; i = f.firstChild;) f.removeChild(i)
        }

        function s(e) {
            for (var t = {}, n = 0, r = e.length; r > n; n++) {
                var i = e[n];
                t[i.name] = i.value
            }
            return t
        }

        function u(e) {
            return e.replace(/&/g, "&amp;").replace(d, function(e) {
                var t = e.charCodeAt(0),
                    n = e.charCodeAt(1);
                return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";"
            }).replace(h, function(e) {
                return "&#" + e.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function l(e, n) {
            var r = !1,
                i = t.bind(e, e.push);
            return {
                start: function(e, a) {
                    e = t.lowercase(e), !r && x[e] && (r = e), r || C[e] !== !0 || (i("<"), i(e), t.forEach(a, function(r, a) {
                        var o = t.lowercase(a),
                            s = "img" === e && "src" === o || "background" === o;
                        D[o] !== !0 || k[o] === !0 && !n(r, s) || (i(" "), i(a), i('="'), i(u(r)), i('"'))
                    }), i(">"))
                },
                end: function(e) {
                    e = t.lowercase(e), r || C[e] !== !0 || m[e] === !0 || (i("</"), i(e), i(">")), e == r && (r = !1)
                },
                chars: function(e) {
                    r || i(u(e))
                }
            }
        }

        function c(e) {
            if (e.nodeType === Node.ELEMENT_NODE)
                for (var t = e.attributes, n = 0, r = t.length; r > n; n++) {
                    var i = t[n],
                        a = i.name.toLowerCase();
                    ("xmlns:ns1" === a || 0 === a.indexOf("ns1:")) && (e.removeAttributeNode(i), n--, r--)
                }
            var o = e.firstChild;
            o && c(o), o = e.nextSibling, o && c(o)
        }
        var f, p = t.$$minErr("$sanitize"),
            d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            h = /([^\#-~ |!])/g,
            m = a("area,br,col,hr,img,wbr"),
            g = a("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
            v = a("rp,rt"),
            $ = t.extend({}, v, g),
            y = t.extend({}, g, a("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),
            b = t.extend({}, v, a("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
            w = a("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
            x = a("script,style"),
            C = t.extend({}, m, y, b, $),
            k = a("background,cite,href,longdesc,src,xlink:href"),
            S = a("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
            E = a("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0),
            D = t.extend({}, k, E, S);
        ! function(e) {
            var t;
            if (!e.document || !e.document.implementation) throw p("noinert", "Can't create an inert html document");
            t = e.document.implementation.createHTMLDocument("inert");
            var n = t.documentElement || t.getDocumentElement(),
                r = n.getElementsByTagName("body");
            if (1 === r.length) f = r[0];
            else {
                var i = t.createElement("html");
                f = t.createElement("body"), i.appendChild(f), t.appendChild(i)
            }
        }(e), t.module("ngSanitize", []).provider("$sanitize", r), t.module("ngSanitize").filter("linky", ["$sanitize", function(e) {
            var n = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
                r = /^mailto:/i,
                a = t.$$minErr("linky"),
                o = t.isString;
            return function(s, u, l) {
                function c(e) {
                    e && g.push(i(e))
                }

                function f(e, n) {
                    var r;
                    if (g.push("<a "), t.isFunction(l) && (l = l(e)), t.isObject(l))
                        for (r in l) g.push(r + '="' + l[r] + '" ');
                    else l = {};
                    !t.isDefined(u) || "target" in l || g.push('target="', u, '" '), g.push('href="', e.replace(/"/g, "&quot;"), '">'), c(n), g.push("</a>")
                }
                if (null == s || "" === s) return s;
                if (!o(s)) throw a("notstring", "Expected string but received: {0}", s);
                for (var p, d, h, m = s, g = []; p = m.match(n);) d = p[0], p[2] || p[4] || (d = (p[3] ? "http://" : "mailto:") + d), h = p.index, c(m.substr(0, h)), f(d, p[0].replace(r, "")), m = m.substring(h + p[0].length);
                return c(m), e(g.join(""))
            }
        }])
    }(window, window.angular),
    function(e, t, n) {
        "use strict";

        function r(e) {
            return null != e && "" !== e && "hasOwnProperty" !== e && s.test("." + e)
        }

        function i(e, i) {
            if (!r(i)) throw o("badmember", 'Dotted member path "@{0}" is invalid.', i);
            for (var a = i.split("."), s = 0, u = a.length; u > s && t.isDefined(e); s++) {
                var l = a[s];
                e = null !== e ? e[l] : n
            }
            return e
        }

        function a(e, n) {
            n = n || {}, t.forEach(n, function(e, t) {
                delete n[t]
            });
            for (var r in e) !e.hasOwnProperty(r) || "$" === r.charAt(0) && "$" === r.charAt(1) || (n[r] = e[r]);
            return n
        }
        var o = t.$$minErr("$resource"),
            s = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
        t.module("ngResource", ["ng"]).provider("$resource", function() {
            var e = /^https?:\/\/[^\/]*/,
                r = this;
            this.defaults = {
                stripTrailingSlashes: !0,
                actions: {
                    get: {
                        method: "GET"
                    },
                    save: {
                        method: "POST"
                    },
                    query: {
                        method: "GET",
                        isArray: !0
                    },
                    remove: {
                        method: "DELETE"
                    },
                    "delete": {
                        method: "DELETE"
                    }
                }
            }, this.$get = ["$http", "$log", "$q", "$timeout", function(s, u, l, c) {
                function f(e) {
                    return p(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
                }

                function p(e, t) {
                    return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
                }

                function d(e, t) {
                    this.template = e, this.defaults = v({}, r.defaults, t), this.urlParams = {}
                }

                function h(e, f, p, b) {
                    function w(e, t) {
                        var n = {};
                        return t = v({}, f, t), g(t, function(t, r) {
                            y(t) && (t = t()), n[r] = t && t.charAt && "@" == t.charAt(0) ? i(e, t.substr(1)) : t
                        }), n
                    }

                    function x(e) {
                        return e.resource
                    }

                    function C(e) {
                        a(e || {}, this)
                    }
                    var k = new d(e, b);
                    return p = v({}, r.defaults.actions, p), C.prototype.toJSON = function() {
                        var e = v({}, this);
                        return delete e.$promise, delete e.$resolved, e
                    }, g(p, function(e, i) {
                        var f = /^(POST|PUT|PATCH)$/i.test(e.method),
                            p = e.timeout,
                            d = t.isDefined(e.cancellable) ? e.cancellable : b && t.isDefined(b.cancellable) ? b.cancellable : r.defaults.cancellable;
                        p && !t.isNumber(p) && (u.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."), delete e.timeout, p = null), C[i] = function(r, u, h, b) {
                            var S, E, D, T = {};
                            switch (arguments.length) {
                                case 4:
                                    D = b, E = h;
                                case 3:
                                case 2:
                                    if (!y(u)) {
                                        T = r, S = u, E = h;
                                        break
                                    }
                                    if (y(r)) {
                                        E = r, D = u;
                                        break
                                    }
                                    E = u, D = h;
                                case 1:
                                    y(r) ? E = r : f ? S = r : T = r;
                                    break;
                                case 0:
                                    break;
                                default:
                                    throw o("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
                            }
                            var A, O, M = this instanceof C,
                                P = M ? S : e.isArray ? [] : new C(S),
                                j = {},
                                N = e.interceptor && e.interceptor.response || x,
                                L = e.interceptor && e.interceptor.responseError || n;
                            g(e, function(e, t) {
                                switch (t) {
                                    default: j[t] = $(e);
                                    break;
                                    case "params":
                                            case "isArray":
                                            case "interceptor":
                                            case "cancellable":
                                }
                            }), !M && d && (A = l.defer(), j.timeout = A.promise, p && (O = c(A.resolve, p))), f && (j.data = S), k.setUrlParams(j, v({}, w(S, e.params || {}), T), e.url);
                            var I = s(j).then(function(n) {
                                var r = n.data;
                                if (r) {
                                    if (t.isArray(r) !== !!e.isArray) throw o("badcfg", "Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})", i, e.isArray ? "array" : "object", t.isArray(r) ? "array" : "object", j.method, j.url);
                                    if (e.isArray) P.length = 0, g(r, function(e) {
                                        "object" == typeof e ? P.push(new C(e)) : P.push(e)
                                    });
                                    else {
                                        var s = P.$promise;
                                        a(r, P), P.$promise = s
                                    }
                                }
                                return n.resource = P, n
                            }, function(e) {
                                return (D || m)(e), l.reject(e)
                            });
                            return I["finally"](function() {
                                P.$resolved = !0, !M && d && (P.$cancelRequest = t.noop, c.cancel(O), A = O = j.timeout = null)
                            }), I = I.then(function(e) {
                                var t = N(e);
                                return (E || m)(t, e.headers), t
                            }, L), M ? I : (P.$promise = I, P.$resolved = !1, d && (P.$cancelRequest = A.resolve), P)
                        }, C.prototype["$" + i] = function(e, t, n) {
                            y(e) && (n = t, t = e, e = {});
                            var r = C[i].call(this, e, this, t, n);
                            return r.$promise || r
                        }
                    }), C.bind = function(t) {
                        return h(e, v({}, f, t), p)
                    }, C
                }
                var m = t.noop,
                    g = t.forEach,
                    v = t.extend,
                    $ = t.copy,
                    y = t.isFunction;
                return d.prototype = {
                    setUrlParams: function(n, r, i) {
                        var a, s, u = this,
                            l = i || u.template,
                            c = "",
                            d = u.urlParams = {};
                        g(l.split(/\W/), function(e) {
                            if ("hasOwnProperty" === e) throw o("badname", "hasOwnProperty is not a valid parameter name.");
                            !new RegExp("^\\d+$").test(e) && e && new RegExp("(^|[^\\\\]):" + e + "(\\W|$)").test(l) && (d[e] = {
                                isQueryParamValue: new RegExp("\\?.*=:" + e + "(?:\\W|$)").test(l)
                            })
                        }), l = l.replace(/\\:/g, ":"), l = l.replace(e, function(e) {
                            return c = e, ""
                        }), r = r || {}, g(u.urlParams, function(e, n) {
                            a = r.hasOwnProperty(n) ? r[n] : u.defaults[n], t.isDefined(a) && null !== a ? (s = e.isQueryParamValue ? p(a, !0) : f(a), l = l.replace(new RegExp(":" + n + "(\\W|$)", "g"), function(e, t) {
                                return s + t
                            })) : l = l.replace(new RegExp("(/?):" + n + "(\\W|$)", "g"), function(e, t, n) {
                                return "/" == n.charAt(0) ? n : t + n
                            })
                        }), u.defaults.stripTrailingSlashes && (l = l.replace(/\/+$/, "") || "/"), l = l.replace(/\/\.(?=\w+($|\?))/, "."), n.url = c + l.replace(/\/\\\./, "/."), g(r, function(e, t) {
                            u.urlParams[t] || (n.params = n.params || {}, n.params[t] = e)
                        })
                    }
                }, h
            }]
        })
    }(window, window.angular),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return t()
        }) : "object" == typeof exports ? module.exports = t() : t()
    }(this, function() {
        function e(e) {
            "use strict";
            var t = e.storageKey(),
                n = e.storage(),
                r = function() {
                    var r = e.preferredLanguage();
                    angular.isString(r) ? e.use(r) : n.put(t, e.use())
                };
            r.displayName = "fallbackFromIncorrectStorageValue", n ? n.get(t) ? e.use(n.get(t))["catch"](r) : r() : angular.isString(e.preferredLanguage()) && e.use(e.preferredLanguage())
        }

        function t() {
            "use strict";
            var e, t, n = null,
                r = !1,
                i = !1;
            t = {
                sanitize: function(e, t) {
                    return "text" === t && (e = o(e)), e
                },
                escape: function(e, t) {
                    return "text" === t && (e = a(e)), e
                },
                sanitizeParameters: function(e, t) {
                    return "params" === t && (e = s(e, o)), e
                },
                escapeParameters: function(e, t) {
                    return "params" === t && (e = s(e, a)), e
                }
            }, t.escaped = t.escapeParameters, this.addStrategy = function(e, n) {
                return t[e] = n, this
            }, this.removeStrategy = function(e) {
                return delete t[e], this
            }, this.useStrategy = function(e) {
                return r = !0, n = e, this
            }, this.$get = ["$injector", "$log", function(a, o) {
                var s = {},
                    u = function(e, n, r) {
                        return angular.forEach(r, function(r) {
                            if (angular.isFunction(r)) e = r(e, n);
                            else if (angular.isFunction(t[r])) e = t[r](e, n);
                            else {
                                if (!angular.isString(t[r])) throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + r + "'");
                                if (!s[t[r]]) try {
                                    s[t[r]] = a.get(t[r])
                                } catch (i) {
                                    throw s[t[r]] = function() {}, new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + r + "'")
                                }
                                e = s[t[r]](e, n)
                            }
                        }), e
                    },
                    l = function() {
                        r || i || (o.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."), i = !0)
                    };
                return a.has("$sanitize") && (e = a.get("$sanitize")), {
                    useStrategy: function(e) {
                        return function(t) {
                            e.useStrategy(t)
                        }
                    }(this),
                    sanitize: function(e, t, r) {
                        if (n || l(), arguments.length < 3 && (r = n), !r) return e;
                        var i = angular.isArray(r) ? r : [r];
                        return u(e, t, i)
                    }
                }
            }];
            var a = function(e) {
                    var t = angular.element("<div></div>");
                    return t.text(e), t.html()
                },
                o = function(t) {
                    if (!e) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");
                    return e(t)
                },
                s = function(e, t, n) {
                    if (angular.isObject(e)) {
                        var r = angular.isArray(e) ? [] : {};
                        if (n) {
                            if (n.indexOf(e) > -1) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object")
                        } else n = [];
                        return n.push(e), angular.forEach(e, function(e, i) {
                            r[i] = s(e, t, n)
                        }), n.splice(-1, 1), r
                    }
                    return angular.isNumber(e) ? e : t(e)
                }
        }

        function n(e, t, n, r) {
            "use strict";
            var i, a, o, s, u, l, c, f, p, d, h, m, g, v, $, y = {},
                b = [],
                w = e,
                x = [],
                C = "translate-cloak",
                k = !1,
                S = !1,
                E = ".",
                D = !1,
                T = 0,
                A = !0,
                O = "default",
                M = {
                    "default": function(e) {
                        return (e || "").split("-").join("_")
                    },
                    java: function(e) {
                        var t = (e || "").split("-").join("_"),
                            n = t.split("_");
                        return n.length > 1 ? n[0].toLowerCase() + "_" + n[1].toUpperCase() : t;
                    },
                    bcp47: function(e) {
                        var t = (e || "").split("_").join("-"),
                            n = t.split("-");
                        return n.length > 1 ? n[0].toLowerCase() + "-" + n[1].toUpperCase() : t
                    }
                },
                P = "2.9.2",
                j = function() {
                    if (angular.isFunction(r.getLocale)) return r.getLocale();
                    var e, n, i = t.$get().navigator,
                        a = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
                    if (angular.isArray(i.languages))
                        for (e = 0; e < i.languages.length; e++)
                            if (n = i.languages[e], n && n.length) return n;
                    for (e = 0; e < a.length; e++)
                        if (n = i[a[e]], n && n.length) return n;
                    return null
                };
            j.displayName = "angular-translate/service: getFirstBrowserLanguage";
            var N = function() {
                var e = j() || "";
                return M[O] && (e = M[O](e)), e
            };
            N.displayName = "angular-translate/service: getLocale";
            var L = function(e, t) {
                    for (var n = 0, r = e.length; r > n; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                I = function() {
                    return this.toString().replace(/^\s+|\s+$/g, "")
                },
                F = function(e) {
                    if (e) {
                        for (var t = [], n = angular.lowercase(e), r = 0, i = b.length; i > r; r++) t.push(angular.lowercase(b[r]));
                        if (L(t, n) > -1) return e;
                        if (a) {
                            var o;
                            for (var s in a) {
                                var u = !1,
                                    l = Object.prototype.hasOwnProperty.call(a, s) && angular.lowercase(s) === angular.lowercase(e);
                                if ("*" === s.slice(-1) && (u = s.slice(0, -1) === e.slice(0, s.length - 1)), (l || u) && (o = a[s], L(t, angular.lowercase(o)) > -1)) return o
                            }
                        }
                        var c = e.split("_");
                        return c.length > 1 && L(t, angular.lowercase(c[0])) > -1 ? c[0] : void 0
                    }
                },
                q = function(e, t) {
                    if (!e && !t) return y;
                    if (e && !t) {
                        if (angular.isString(e)) return y[e]
                    } else angular.isObject(y[e]) || (y[e] = {}), angular.extend(y[e], V(t));
                    return this
                };
            this.translations = q, this.cloakClassName = function(e) {
                return e ? (C = e, this) : C
            }, this.nestedObjectDelimeter = function(e) {
                return e ? (E = e, this) : E
            };
            var V = function(e, t, n, r) {
                var i, a, o, s;
                t || (t = []), n || (n = {});
                for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (s = e[i], angular.isObject(s) ? V(s, t.concat(i), n, i) : (a = t.length ? "" + t.join(E) + E + i : i, t.length && i === r && (o = "" + t.join(E), n[o] = "@:" + a), n[a] = s));
                return n
            };
            V.displayName = "flatObject", this.addInterpolation = function(e) {
                return x.push(e), this
            }, this.useMessageFormatInterpolation = function() {
                return this.useInterpolation("$translateMessageFormatInterpolation")
            }, this.useInterpolation = function(e) {
                return d = e, this
            }, this.useSanitizeValueStrategy = function(e) {
                return n.useStrategy(e), this
            }, this.preferredLanguage = function(e) {
                return e ? (R(e), this) : i
            };
            var R = function(e) {
                return e && (i = e), i
            };
            this.translationNotFoundIndicator = function(e) {
                return this.translationNotFoundIndicatorLeft(e), this.translationNotFoundIndicatorRight(e), this
            }, this.translationNotFoundIndicatorLeft = function(e) {
                return e ? (g = e, this) : g
            }, this.translationNotFoundIndicatorRight = function(e) {
                return e ? (v = e, this) : v
            }, this.fallbackLanguage = function(e) {
                return U(e), this
            };
            var U = function(e) {
                return e ? (angular.isString(e) ? (s = !0, o = [e]) : angular.isArray(e) && (s = !1, o = e), angular.isString(i) && L(o, i) < 0 && o.push(i), this) : s ? o[0] : o
            };
            this.use = function(e) {
                if (e) {
                    if (!y[e] && !h) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + e + "'");
                    return u = e, this
                }
                return u
            };
            var H = function(e) {
                return e ? (w = e, this) : f ? f + w : w
            };
            this.storageKey = H, this.useUrlLoader = function(e, t) {
                return this.useLoader("$translateUrlLoader", angular.extend({
                    url: e
                }, t))
            }, this.useStaticFilesLoader = function(e) {
                return this.useLoader("$translateStaticFilesLoader", e)
            }, this.useLoader = function(e, t) {
                return h = e, m = t || {}, this
            }, this.useLocalStorage = function() {
                return this.useStorage("$translateLocalStorage")
            }, this.useCookieStorage = function() {
                return this.useStorage("$translateCookieStorage")
            }, this.useStorage = function(e) {
                return c = e, this
            }, this.storagePrefix = function(e) {
                return e ? (f = e, this) : e
            }, this.useMissingTranslationHandlerLog = function() {
                return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
            }, this.useMissingTranslationHandler = function(e) {
                return p = e, this
            }, this.usePostCompiling = function(e) {
                return k = !!e, this
            }, this.forceAsyncReload = function(e) {
                return S = !!e, this
            }, this.uniformLanguageTag = function(e) {
                return e ? angular.isString(e) && (e = {
                    standard: e
                }) : e = {}, O = e.standard, this
            }, this.determinePreferredLanguage = function(e) {
                var t = e && angular.isFunction(e) ? e() : N();
                return i = b.length ? F(t) || t : t, this
            }, this.registerAvailableLanguageKeys = function(e, t) {
                return e ? (b = e, t && (a = t), this) : b
            }, this.useLoaderCache = function(e) {
                return e === !1 ? $ = void 0 : e === !0 ? $ = !0 : "undefined" == typeof e ? $ = "$translationCache" : e && ($ = e), this
            }, this.directivePriority = function(e) {
                return void 0 === e ? T : (T = e, this)
            }, this.statefulFilter = function(e) {
                return void 0 === e ? A : (A = e, this)
            }, this.$get = ["$log", "$injector", "$rootScope", "$q", function(e, t, n, r) {
                var a, f, b, O = t.get(d || "$translateDefaultInterpolation"),
                    M = !1,
                    j = {},
                    N = {},
                    _ = function(e, t, n, s, l) {
                        var p = l && l !== u ? F(l) || l : u;
                        if (angular.isArray(e)) {
                            var d = function(e) {
                                for (var i = {}, a = [], o = function(e) {
                                        var a = r.defer(),
                                            o = function(t) {
                                                i[e] = t, a.resolve([e, t])
                                            };
                                        return _(e, t, n, s, l).then(o, o), a.promise
                                    }, u = 0, c = e.length; c > u; u++) a.push(o(e[u]));
                                return r.all(a).then(function() {
                                    return i
                                })
                            };
                            return d(e)
                        }
                        var h = r.defer();
                        e && (e = I.apply(e));
                        var m = function() {
                            var e = i ? N[i] : N[p];
                            if (f = 0, c && !e) {
                                var t = a.get(w);
                                if (e = N[t], o && o.length) {
                                    var n = L(o, t);
                                    f = 0 === n ? 1 : 0, L(o, i) < 0 && o.push(i)
                                }
                            }
                            return e
                        }();
                        if (m) {
                            var g = function() {
                                l || (p = u), ne(e, t, n, s, p).then(h.resolve, h.reject)
                            };
                            g.displayName = "promiseResolved", m["finally"](g)
                        } else ne(e, t, n, s, p).then(h.resolve, h.reject);
                        return h.promise
                    },
                    B = function(e) {
                        return g && (e = [g, e].join(" ")), v && (e = [e, v].join(" ")), e
                    },
                    z = function(e) {
                        u = e, c && a.put(_.storageKey(), u), n.$emit("$translateChangeSuccess", {
                            language: e
                        }), O.setLocale(u);
                        var t = function(e, t) {
                            j[t].setLocale(u)
                        };
                        t.displayName = "eachInterpolatorLocaleSetter", angular.forEach(j, t), n.$emit("$translateChangeEnd", {
                            language: e
                        })
                    },
                    W = function(e) {
                        if (!e) throw "No language key specified for loading.";
                        var i = r.defer();
                        n.$emit("$translateLoadingStart", {
                            language: e
                        }), M = !0;
                        var a = $;
                        "string" == typeof a && (a = t.get(a));
                        var o = angular.extend({}, m, {
                                key: e,
                                $http: angular.extend({}, {
                                    cache: a
                                }, m.$http)
                            }),
                            s = function(t) {
                                var r = {};
                                n.$emit("$translateLoadingSuccess", {
                                    language: e
                                }), angular.isArray(t) ? angular.forEach(t, function(e) {
                                    angular.extend(r, V(e))
                                }) : angular.extend(r, V(t)), M = !1, i.resolve({
                                    key: e,
                                    table: r
                                }), n.$emit("$translateLoadingEnd", {
                                    language: e
                                })
                            };
                        s.displayName = "onLoaderSuccess";
                        var u = function(e) {
                            n.$emit("$translateLoadingError", {
                                language: e
                            }), i.reject(e), n.$emit("$translateLoadingEnd", {
                                language: e
                            })
                        };
                        return u.displayName = "onLoaderError", t.get(h)(o).then(s, u), i.promise
                    };
                if (c && (a = t.get(c), !a.get || !a.put)) throw new Error("Couldn't use storage '" + c + "', missing get() or put() method!");
                if (x.length) {
                    var Y = function(e) {
                        var n = t.get(e);
                        n.setLocale(i || u), j[n.getInterpolationIdentifier()] = n
                    };
                    Y.displayName = "interpolationFactoryAdder", angular.forEach(x, Y)
                }
                var G = function(e) {
                        var t = r.defer();
                        if (Object.prototype.hasOwnProperty.call(y, e)) t.resolve(y[e]);
                        else if (N[e]) {
                            var n = function(e) {
                                q(e.key, e.table), t.resolve(e.table)
                            };
                            n.displayName = "translationTableResolver", N[e].then(n, t.reject)
                        } else t.reject();
                        return t.promise
                    },
                    K = function(e, t, n, i) {
                        var a = r.defer(),
                            o = function(r) {
                                if (Object.prototype.hasOwnProperty.call(r, t)) {
                                    i.setLocale(e);
                                    var o = r[t];
                                    "@:" === o.substr(0, 2) ? K(e, o.substr(2), n, i).then(a.resolve, a.reject) : a.resolve(i.interpolate(r[t], n)), i.setLocale(u)
                                } else a.reject()
                            };
                        return o.displayName = "fallbackTranslationResolver", G(e).then(o, a.reject), a.promise
                    },
                    X = function(e, t, n, r) {
                        var i, a = y[e];
                        if (a && Object.prototype.hasOwnProperty.call(a, t)) {
                            if (r.setLocale(e), i = r.interpolate(a[t], n), "@:" === i.substr(0, 2)) return X(e, i.substr(2), n, r);
                            r.setLocale(u)
                        }
                        return i
                    },
                    J = function(e, n) {
                        if (p) {
                            var r = t.get(p)(e, u, n);
                            return void 0 !== r ? r : e
                        }
                        return e
                    },
                    Q = function(e, t, n, i, a) {
                        var s = r.defer();
                        if (e < o.length) {
                            var u = o[e];
                            K(u, t, n, i).then(s.resolve, function() {
                                Q(e + 1, t, n, i, a).then(s.resolve)
                            })
                        } else a ? s.resolve(a) : s.resolve(J(t, n));
                        return s.promise
                    },
                    Z = function(e, t, n, r) {
                        var i;
                        if (e < o.length) {
                            var a = o[e];
                            i = X(a, t, n, r), i || (i = Z(e + 1, t, n, r))
                        }
                        return i
                    },
                    ee = function(e, t, n, r) {
                        return Q(b > 0 ? b : f, e, t, n, r)
                    },
                    te = function(e, t, n) {
                        return Z(b > 0 ? b : f, e, t, n)
                    },
                    ne = function(e, t, n, i, a) {
                        var s = r.defer(),
                            u = a ? y[a] : y,
                            l = n ? j[n] : O;
                        if (u && Object.prototype.hasOwnProperty.call(u, e)) {
                            var c = u[e];
                            "@:" === c.substr(0, 2) ? _(c.substr(2), t, n, i, a).then(s.resolve, s.reject) : s.resolve(l.interpolate(c, t))
                        } else {
                            var f;
                            p && !M && (f = J(e, t)), a && o && o.length ? ee(e, t, l, i).then(function(e) {
                                s.resolve(e)
                            }, function(e) {
                                s.reject(B(e))
                            }) : p && !M && f ? i ? s.resolve(i) : s.resolve(f) : i ? s.resolve(i) : s.reject(B(e))
                        }
                        return s.promise
                    },
                    re = function(e, t, n, r) {
                        var i, a = r ? y[r] : y,
                            s = O;
                        if (j && Object.prototype.hasOwnProperty.call(j, n) && (s = j[n]), a && Object.prototype.hasOwnProperty.call(a, e)) {
                            var u = a[e];
                            i = "@:" === u.substr(0, 2) ? re(u.substr(2), t, n, r) : s.interpolate(u, t)
                        } else {
                            var l;
                            p && !M && (l = J(e, t)), r && o && o.length ? (f = 0, i = te(e, t, s)) : i = p && !M && l ? l : B(e)
                        }
                        return i
                    },
                    ie = function(e) {
                        l === e && (l = void 0), N[e] = void 0
                    };
                _.preferredLanguage = function(e) {
                    return e && R(e), i
                }, _.cloakClassName = function() {
                    return C
                }, _.nestedObjectDelimeter = function() {
                    return E
                }, _.fallbackLanguage = function(e) {
                    if (void 0 !== e && null !== e) {
                        if (U(e), h && o && o.length)
                            for (var t = 0, n = o.length; n > t; t++) N[o[t]] || (N[o[t]] = W(o[t]));
                        _.use(_.use())
                    }
                    return s ? o[0] : o
                }, _.useFallbackLanguage = function(e) {
                    if (void 0 !== e && null !== e)
                        if (e) {
                            var t = L(o, e);
                            t > -1 && (b = t)
                        } else b = 0
                }, _.proposedLanguage = function() {
                    return l
                }, _.storage = function() {
                    return a
                }, _.negotiateLocale = F, _.use = function(e) {
                    if (!e) return u;
                    var t = r.defer();
                    n.$emit("$translateChangeStart", {
                        language: e
                    });
                    var i = F(e);
                    return i && (e = i), !S && y[e] || !h || N[e] ? N[e] ? N[e].then(function(e) {
                        return u || z(e.key), t.resolve(e.key), e
                    }, function(e) {
                        return !u && o && o.length > 0 ? _.use(o[0]).then(t.resolve, t.reject) : t.reject(e)
                    }) : (t.resolve(e), z(e)) : (l = e, N[e] = W(e).then(function(n) {
                        return q(n.key, n.table), t.resolve(n.key), l === e && z(n.key), n
                    }, function(e) {
                        return n.$emit("$translateChangeError", {
                            language: e
                        }), t.reject(e), n.$emit("$translateChangeEnd", {
                            language: e
                        }), r.reject(e)
                    }), N[e]["finally"](function() {
                        ie(e)
                    })), t.promise
                }, _.storageKey = function() {
                    return H()
                }, _.isPostCompilingEnabled = function() {
                    return k
                }, _.isForceAsyncReloadEnabled = function() {
                    return S
                }, _.refresh = function(e) {
                    function t() {
                        a.resolve(), n.$emit("$translateRefreshEnd", {
                            language: e
                        })
                    }

                    function i() {
                        a.reject(), n.$emit("$translateRefreshEnd", {
                            language: e
                        })
                    }
                    if (!h) throw new Error("Couldn't refresh translation table, no loader registered!");
                    var a = r.defer();
                    if (n.$emit("$translateRefreshStart", {
                            language: e
                        }), e)
                        if (y[e]) {
                            var s = function(n) {
                                q(n.key, n.table), e === u && z(u), t()
                            };
                            s.displayName = "refreshPostProcessor", W(e).then(s, i)
                        } else i();
                    else {
                        var l = [],
                            c = {};
                        if (o && o.length)
                            for (var f = 0, p = o.length; p > f; f++) l.push(W(o[f])), c[o[f]] = !0;
                        u && !c[u] && l.push(W(u));
                        var d = function(e) {
                            y = {}, angular.forEach(e, function(e) {
                                q(e.key, e.table)
                            }), u && z(u), t()
                        };
                        d.displayName = "refreshPostProcessor", r.all(l).then(d, i)
                    }
                    return a.promise
                }, _.instant = function(e, t, n, r) {
                    var a = r && r !== u ? F(r) || r : u;
                    if (null === e || angular.isUndefined(e)) return e;
                    if (angular.isArray(e)) {
                        for (var s = {}, l = 0, c = e.length; c > l; l++) s[e[l]] = _.instant(e[l], t, n, r);
                        return s
                    }
                    if (angular.isString(e) && e.length < 1) return e;
                    e && (e = I.apply(e));
                    var f, d = [];
                    i && d.push(i), a && d.push(a), o && o.length && (d = d.concat(o));
                    for (var h = 0, m = d.length; m > h; h++) {
                        var $ = d[h];
                        if (y[$] && "undefined" != typeof y[$][e] && (f = re(e, t, n, a)), "undefined" != typeof f) break
                    }
                    return f || "" === f || (g || v ? f = B(e) : (f = O.interpolate(e, t), p && !M && (f = J(e, t)))), f
                }, _.versionInfo = function() {
                    return P
                }, _.loaderCache = function() {
                    return $
                }, _.directivePriority = function() {
                    return T
                }, _.statefulFilter = function() {
                    return A
                }, _.isReady = function() {
                    return D
                };
                var ae = r.defer();
                ae.promise.then(function() {
                    D = !0
                }), _.onReady = function(e) {
                    var t = r.defer();
                    return angular.isFunction(e) && t.promise.then(e), D ? t.resolve() : ae.promise.then(t.resolve), t.promise
                };
                var oe = n.$on("$translateReady", function() {
                        ae.resolve(), oe(), oe = null
                    }),
                    se = n.$on("$translateChangeEnd", function() {
                        ae.resolve(), se(), se = null
                    });
                if (h) {
                    if (angular.equals(y, {}) && _.use() && _.use(_.use()), o && o.length)
                        for (var ue = function(e) {
                                return q(e.key, e.table), n.$emit("$translateChangeEnd", {
                                    language: e.key
                                }), e
                            }, le = 0, ce = o.length; ce > le; le++) {
                            var fe = o[le];
                            (S || !y[fe]) && (N[fe] = W(fe).then(ue))
                        }
                } else n.$emit("$translateReady", {
                    language: _.use()
                });
                return _
            }]
        }

        function r(e, t) {
            "use strict";
            var n, r = {},
                i = "default";
            return r.setLocale = function(e) {
                n = e
            }, r.getInterpolationIdentifier = function() {
                return i
            }, r.useSanitizeValueStrategy = function(e) {
                return t.useStrategy(e), this
            }, r.interpolate = function(n, r) {
                r = r || {}, r = t.sanitize(r, "params");
                var i = e(n)(r);
                return i = t.sanitize(i, "text")
            }, r
        }

        function i(e, t, n, r, i, o) {
            "use strict";
            var s = function() {
                return this.toString().replace(/^\s+|\s+$/g, "")
            };
            return {
                restrict: "AE",
                scope: !0,
                priority: e.directivePriority(),
                compile: function(t, u) {
                    var l = u.translateValues ? u.translateValues : void 0,
                        c = u.translateInterpolation ? u.translateInterpolation : void 0,
                        f = t[0].outerHTML.match(/translate-value-+/i),
                        p = "^(.*)(" + n.startSymbol() + ".*" + n.endSymbol() + ")(.*)",
                        d = "^(.*)" + n.startSymbol() + "(.*)" + n.endSymbol() + "(.*)";
                    return function(t, h, m) {
                        t.interpolateParams = {}, t.preText = "", t.postText = "", t.translateNamespace = a(t);
                        var g = {},
                            v = function(e, n, r) {
                                if (n.translateValues && angular.extend(e, i(n.translateValues)(t.$parent)), f)
                                    for (var a in r)
                                        if (Object.prototype.hasOwnProperty.call(n, a) && "translateValue" === a.substr(0, 14) && "translateValues" !== a) {
                                            var o = angular.lowercase(a.substr(14, 1)) + a.substr(15);
                                            e[o] = r[a]
                                        }
                            },
                            $ = function(e) {
                                if (angular.isFunction($._unwatchOld) && ($._unwatchOld(), $._unwatchOld = void 0), angular.equals(e, "") || !angular.isDefined(e)) {
                                    var r = s.apply(h.text()),
                                        i = r.match(p);
                                    if (angular.isArray(i)) {
                                        t.preText = i[1], t.postText = i[3], g.translate = n(i[2])(t.$parent);
                                        var a = r.match(d);
                                        angular.isArray(a) && a[2] && a[2].length && ($._unwatchOld = t.$watch(a[2], function(e) {
                                            g.translate = e, k()
                                        }))
                                    } else g.translate = r ? r : void 0
                                } else g.translate = e;
                                k()
                            },
                            y = function(e) {
                                m.$observe(e, function(t) {
                                    g[e] = t, k()
                                })
                            };
                        v(t.interpolateParams, m, u);
                        var b = !0;
                        m.$observe("translate", function(e) {
                            "undefined" == typeof e ? $("") : "" === e && b || (g.translate = e, k()), b = !1
                        });
                        for (var w in m) m.hasOwnProperty(w) && "translateAttr" === w.substr(0, 13) && y(w);
                        if (m.$observe("translateDefault", function(e) {
                                t.defaultText = e, k()
                            }), l && m.$observe("translateValues", function(e) {
                                e && t.$parent.$watch(function() {
                                    angular.extend(t.interpolateParams, i(e)(t.$parent))
                                })
                            }), f) {
                            var x = function(e) {
                                m.$observe(e, function(n) {
                                    var r = angular.lowercase(e.substr(14, 1)) + e.substr(15);
                                    t.interpolateParams[r] = n
                                })
                            };
                            for (var C in m) Object.prototype.hasOwnProperty.call(m, C) && "translateValue" === C.substr(0, 14) && "translateValues" !== C && x(C)
                        }
                        var k = function() {
                                for (var e in g) g.hasOwnProperty(e) && void 0 !== g[e] && S(e, g[e], t, t.interpolateParams, t.defaultText, t.translateNamespace)
                            },
                            S = function(t, n, r, i, a, o) {
                                n ? (o && "." === n.charAt(0) && (n = o + n), e(n, i, c, a, r.translateLanguage).then(function(e) {
                                    E(e, r, !0, t)
                                }, function(e) {
                                    E(e, r, !1, t)
                                })) : E(n, r, !1, t)
                            },
                            E = function(t, n, i, a) {
                                if ("translate" === a) {
                                    i || "undefined" == typeof n.defaultText || (t = n.defaultText), h.empty().append(n.preText + t + n.postText);
                                    var o = e.isPostCompilingEnabled(),
                                        s = "undefined" != typeof u.translateCompile,
                                        l = s && "false" !== u.translateCompile;
                                    (o && !s || l) && r(h.contents())(n)
                                } else {
                                    i || "undefined" == typeof n.defaultText || (t = n.defaultText);
                                    var c = m.$attr[a];
                                    "data-" === c.substr(0, 5) && (c = c.substr(5)), c = c.substr(15), h.attr(c, t)
                                }
                            };
                        (l || f || m.translateDefault) && t.$watch("interpolateParams", k, !0), t.$watch("translateLanguage", k);
                        var D = o.$on("$translateChangeSuccess", k);
                        h.text().length ? $(m.translate ? m.translate : "") : m.translate && $(m.translate), k(), t.$on("$destroy", D)
                    }
                }
            }
        }

        function a(e) {
            "use strict";
            return e.translateNamespace ? e.translateNamespace : e.$parent ? a(e.$parent) : void 0
        }

        function o(e, t) {
            "use strict";
            return {
                compile: function(n) {
                    var r = function() {
                            n.addClass(e.cloakClassName())
                        },
                        i = function() {
                            n.removeClass(e.cloakClassName())
                        };
                    return e.onReady(function() {
                            i()
                        }), r(),
                        function(n, a, o) {
                            o.translateCloak && o.translateCloak.length && (o.$observe("translateCloak", function(t) {
                                e(t).then(i, r)
                            }), t.$on("$translateChangeSuccess", function() {
                                e(o.translateCloak).then(i, r)
                            }))
                        }
                }
            }
        }

        function s() {
            "use strict";
            return {
                restrict: "A",
                scope: !0,
                compile: function() {
                    return {
                        pre: function(e, t, n) {
                            e.translateNamespace = a(e), e.translateNamespace && "." === n.translateNamespace.charAt(0) ? e.translateNamespace += n.translateNamespace : e.translateNamespace = n.translateNamespace
                        }
                    }
                }
            }
        }

        function a(e) {
            "use strict";
            return e.translateNamespace ? e.translateNamespace : e.$parent ? a(e.$parent) : void 0
        }

        function u() {
            "use strict";
            return {
                restrict: "A",
                scope: !0,
                compile: function() {
                    return function(e, t, n) {
                        n.$observe("translateLanguage", function(t) {
                            e.translateLanguage = t
                        })
                    }
                }
            }
        }

        function l(e, t) {
            "use strict";
            var n = function(n, r, i, a) {
                return angular.isObject(r) || (r = e(r)(this)), t.instant(n, r, i, a)
            };
            return t.statefulFilter() && (n.$stateful = !0), n
        }

        function c(e) {
            "use strict";
            return e("translations")
        }
        return angular.module("pascalprecht.translate", ["ng"]).run(e), e.$inject = ["$translate"], e.displayName = "runTranslate", angular.module("pascalprecht.translate").provider("$translateSanitization", t), angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider", {}).provider("$translate", n), n.$inject = ["$STORAGE_KEY", "$windowProvider", "$translateSanitizationProvider", "pascalprechtTranslateOverrider"], n.displayName = "displayName", angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", r), r.$inject = ["$interpolate", "$translateSanitization"], r.displayName = "$translateDefaultInterpolation", angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", i), i.$inject = ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope"], i.displayName = "translateDirective", angular.module("pascalprecht.translate").directive("translateCloak", o), o.$inject = ["$translate", "$rootScope"], o.displayName = "translateCloakDirective", angular.module("pascalprecht.translate").directive("translateNamespace", s), s.displayName = "translateNamespaceDirective", angular.module("pascalprecht.translate").directive("translateLanguage", u), u.displayName = "translateLanguageDirective", angular.module("pascalprecht.translate").filter("translate", l), l.$inject = ["$parse", "$translate"], l.displayName = "translateFilterFactory", angular.module("pascalprecht.translate").factory("$translationCache", c), c.$inject = ["$cacheFactory"], c.displayName = "$translationCache", "pascalprecht.translate"
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return t()
        }) : "object" == typeof exports ? module.exports = t() : t()
    }(this, function() {
        function e(e, t) {
            "use strict";
            return function(n) {
                if (!n || !n.url) throw new Error("Couldn't use urlLoader since no url is given!");
                var r = {};
                return r[n.queryParameter || "lang"] = n.key, t(angular.extend({
                    url: n.url,
                    params: r,
                    method: "GET"
                }, n.$http)).then(function(e) {
                    return e.data
                }, function() {
                    return e.reject(n.key)
                })
            }
        }
        return angular.module("pascalprecht.translate").factory("$translateUrlLoader", e), e.$inject = ["$q", "$http"], e.displayName = "$translateUrlLoader", "pascalprecht.translate"
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return t()
        }) : "object" == typeof exports ? module.exports = t() : t()
    }(this, function() {
        function e(e, t) {
            "use strict";
            return function(n) {
                if (!(n && (angular.isArray(n.files) || angular.isString(n.prefix) && angular.isString(n.suffix)))) throw new Error("Couldn't load static files, no files and prefix or suffix specified!");
                n.files || (n.files = [{
                    prefix: n.prefix,
                    suffix: n.suffix
                }]);
                for (var r = function(r) {
                        if (!r || !angular.isString(r.prefix) || !angular.isString(r.suffix)) throw new Error("Couldn't load static file, no prefix or suffix specified!");
                        return t(angular.extend({
                            url: [r.prefix, n.key, r.suffix].join(""),
                            method: "GET",
                            params: ""
                        }, n.$http)).then(function(e) {
                            return e.data
                        }, function() {
                            return e.reject(n.key)
                        })
                    }, i = [], a = n.files.length, o = 0; a > o; o++) i.push(r({
                    prefix: n.files[o].prefix,
                    key: n.key,
                    suffix: n.files[o].suffix
                }));
                return e.all(i).then(function(e) {
                    for (var t = e.length, n = {}, r = 0; t > r; r++)
                        for (var i in e[r]) n[i] = e[r][i];
                    return n
                })
            }
        }
        return angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader", e), e.$inject = ["$q", "$http"], e.displayName = "$translateStaticFilesLoader", "pascalprecht.translate"
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return t()
        }) : "object" == typeof exports ? module.exports = t() : t()
    }(this, function() {
        function e(e, t) {
            "use strict";
            var n = function() {
                    var t;
                    return {
                        get: function(n) {
                            return t || (t = e.localStorage.getItem(n)), t
                        },
                        set: function(n, r) {
                            t = r, e.localStorage.setItem(n, r)
                        },
                        put: function(n, r) {
                            t = r, e.localStorage.setItem(n, r)
                        }
                    }
                }(),
                r = "localStorage" in e;
            if (r) {
                var i = "pascalprecht.translate.storageTest";
                try {
                    null !== e.localStorage ? (e.localStorage.setItem(i, "foo"), e.localStorage.removeItem(i), r = !0) : r = !1
                } catch (a) {
                    r = !1
                }
            }
            var o = r ? n : t;
            return o
        }
        return angular.module("pascalprecht.translate").factory("$translateLocalStorage", e), e.$inject = ["$window", "$translateCookieStorage"], e.displayName = "$translateLocalStorageFactory", "pascalprecht.translate"
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return t()
        }) : "object" == typeof exports ? module.exports = t() : t()
    }(this, function() {
        function e(e) {
            "use strict";
            var t = {
                get: function(t) {
                    return e.get(t)
                },
                set: function(t, n) {
                    e.put(t, n)
                },
                put: function(t, n) {
                    e.put(t, n)
                }
            };
            return t
        }
        return angular.module("pascalprecht.translate").factory("$translateCookieStorage", e), e.$inject = ["$cookieStore"], e.displayName = "$translateCookieStorage", "pascalprecht.translate"
    }),
    function(e, t) {
        "use strict";
        var n = ["ng", "oc.lazyLoad"],
            r = {},
            i = [],
            a = [],
            o = [],
            s = [],
            u = e.noop,
            l = {},
            c = [],
            f = e.module("oc.lazyLoad", ["ng"]);
        f.provider("$ocLazyLoad", ["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$injector", "$animateProvider", function(f, p, m, g, v, $) {
            function y(t, r, i) {
                if (r) {
                    var a, s, f, p = [];
                    for (a = r.length - 1; a >= 0; a--)
                        if (s = r[a], e.isString(s) || (s = x(s)), s && -1 === c.indexOf(s) && (!k[s] || -1 !== o.indexOf(s))) {
                            var d = -1 === n.indexOf(s);
                            if (f = h(s), d && (n.push(s), y(t, f.requires, i)), f._runBlocks.length > 0)
                                for (l[s] = []; f._runBlocks.length > 0;) l[s].push(f._runBlocks.shift());
                            e.isDefined(l[s]) && (d || i.rerun) && (p = p.concat(l[s])), w(t, f._invokeQueue, s, i.reconfig), w(t, f._configBlocks, s, i.reconfig), u(d ? "ocLazyLoad.moduleLoaded" : "ocLazyLoad.moduleReloaded", s), r.pop(), c.push(s)
                        }
                    var m = t.getInstanceInjector();
                    e.forEach(p, function(e) {
                        m.invoke(e)
                    })
                }
            }

            function b(t, n) {
                function i(t, n) {
                    var r, i = !0;
                    return n.length && (r = a(t), e.forEach(n, function(e) {
                        i = i && a(e) !== r
                    })), i
                }

                function a(t) {
                    return e.isArray(t) ? M(t.toString()) : e.isObject(t) ? M(O(t)) : e.isDefined(t) && null !== t ? M(t.toString()) : t
                }
                var o = t[2][0],
                    s = t[1],
                    l = !1;
                e.isUndefined(r[n]) && (r[n] = {}), e.isUndefined(r[n][s]) && (r[n][s] = {});
                var c = function(e, t) {
                    r[n][s].hasOwnProperty(e) || (r[n][s][e] = []), i(t, r[n][s][e]) && (l = !0, r[n][s][e].push(t), u("ocLazyLoad.componentLoaded", [n, s, e]))
                };
                if (e.isString(o)) c(o, t[2][1]);
                else {
                    if (!e.isObject(o)) return !1;
                    e.forEach(o, function(t, n) {
                        e.isString(t) ? c(t, o[1]) : c(n, t)
                    })
                }
                return l
            }

            function w(t, n, r, a) {
                if (n) {
                    var o, s, u, l;
                    for (o = 0, s = n.length; s > o; o++)
                        if (u = n[o], e.isArray(u)) {
                            if (null !== t) {
                                if (!t.hasOwnProperty(u[0])) throw new Error("unsupported provider " + u[0]);
                                l = t[u[0]]
                            }
                            var c = b(u, r);
                            if ("invoke" !== u[1]) c && e.isDefined(l) && l[u[1]].apply(l, u[2]);
                            else {
                                var f = function(t) {
                                    var n = i.indexOf(r + "-" + t);
                                    (-1 === n || a) && (-1 === n && i.push(r + "-" + t), e.isDefined(l) && l[u[1]].apply(l, u[2]))
                                };
                                if (e.isFunction(u[2][0])) f(u[2][0]);
                                else if (e.isArray(u[2][0]))
                                    for (var p = 0, d = u[2][0].length; d > p; p++) e.isFunction(u[2][0][p]) && f(u[2][0][p])
                            }
                        }
                }
            }

            function x(t) {
                var n = null;
                return e.isString(t) ? n = t : e.isObject(t) && t.hasOwnProperty("name") && e.isString(t.name) && (n = t.name), n
            }

            function C(t) {
                if (!e.isString(t)) return !1;
                try {
                    return h(t)
                } catch (n) {
                    if (/No module/.test(n) || n.message.indexOf("$injector:nomod") > -1) return !1
                }
            }
            var k = {},
                S = {
                    $controllerProvider: f,
                    $compileProvider: m,
                    $filterProvider: g,
                    $provide: p,
                    $injector: v,
                    $animateProvider: $
                },
                E = !1,
                D = !1,
                T = [],
                A = {};
            T.push = function(e) {
                -1 === this.indexOf(e) && Array.prototype.push.apply(this, arguments)
            }, this.config = function(t) {
                e.isDefined(t.modules) && (e.isArray(t.modules) ? e.forEach(t.modules, function(e) {
                    k[e.name] = e
                }) : k[t.modules.name] = t.modules), e.isDefined(t.debug) && (E = t.debug), e.isDefined(t.events) && (D = t.events)
            }, this._init = function(r) {
                if (0 === a.length) {
                    var i = [r],
                        o = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
                        u = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/,
                        l = function(e) {
                            return e && i.push(e)
                        };
                    e.forEach(o, function(t) {
                        o[t] = !0, l(document.getElementById(t)), t = t.replace(":", "\\:"), "undefined" != typeof r[0] && r[0].querySelectorAll && (e.forEach(r[0].querySelectorAll("." + t), l), e.forEach(r[0].querySelectorAll("." + t + "\\:"), l), e.forEach(r[0].querySelectorAll("[" + t + "]"), l))
                    }), e.forEach(i, function(t) {
                        if (0 === a.length) {
                            var n = " " + r.className + " ",
                                i = u.exec(n);
                            i ? a.push((i[2] || "").replace(/\s+/g, ",")) : e.forEach(t.attributes, function(e) {
                                0 === a.length && o[e.name] && a.push(e.value)
                            })
                        }
                    })
                }
                0 !== a.length || (t.jasmine || t.mocha) && e.isDefined(e.mock) || console.error("No module found during bootstrap, unable to init ocLazyLoad. You should always use the ng-app directive or angular.boostrap when you use ocLazyLoad.");
                var c = function f(t) {
                    if (-1 === n.indexOf(t)) {
                        n.push(t);
                        var r = e.module(t);
                        w(null, r._invokeQueue, t), w(null, r._configBlocks, t), e.forEach(r.requires, f)
                    }
                };
                e.forEach(a, function(e) {
                    c(e)
                }), a = [], s.pop()
            };
            var O = function(t) {
                    try {
                        return JSON.stringify(t)
                    } catch (n) {
                        var r = [];
                        return JSON.stringify(t, function(t, n) {
                            if (e.isObject(n) && null !== n) {
                                if (-1 !== r.indexOf(n)) return;
                                r.push(n)
                            }
                            return n
                        })
                    }
                },
                M = function(e) {
                    var t, n, r, i = 0;
                    if (0 == e.length) return i;
                    for (t = 0, r = e.length; r > t; t++) n = e.charCodeAt(t), i = (i << 5) - i + n, i |= 0;
                    return i
                };
            this.$get = ["$log", "$rootElement", "$rootScope", "$cacheFactory", "$q", function(t, i, o, l, f) {
                function p(e) {
                    var n = f.defer();
                    return t.error(e.message), n.reject(e), n.promise
                }
                var m, g = l("ocLazyLoad");
                return E || (t = {}, t.error = e.noop, t.warn = e.noop, t.info = e.noop), S.getInstanceInjector = function() {
                    return m ? m : m = i.data("$injector") || e.injector()
                }, u = function(e, n) {
                    D && o.$broadcast(e, n), E && t.info(e, n)
                }, {
                    _broadcast: u,
                    _$log: t,
                    _getFilesCache: function() {
                        return g
                    },
                    toggleWatch: function(e) {
                        e ? s.push(!0) : s.pop()
                    },
                    getModuleConfig: function(t) {
                        if (!e.isString(t)) throw new Error("You need to give the name of the module to get");
                        return k[t] ? e.copy(k[t]) : null
                    },
                    setModuleConfig: function(t) {
                        if (!e.isObject(t)) throw new Error("You need to give the module config object to set");
                        return k[t.name] = t, t
                    },
                    getModules: function() {
                        return n
                    },
                    isLoaded: function(t) {
                        var r = function(e) {
                            var t = n.indexOf(e) > -1;
                            return t || (t = !!C(e)), t
                        };
                        if (e.isString(t) && (t = [t]), e.isArray(t)) {
                            var i, a;
                            for (i = 0, a = t.length; a > i; i++)
                                if (!r(t[i])) return !1;
                            return !0
                        }
                        throw new Error("You need to define the module(s) name(s)")
                    },
                    _getModuleName: x,
                    _getModule: function(e) {
                        try {
                            return h(e)
                        } catch (t) {
                            throw (/No module/.test(t) || t.message.indexOf("$injector:nomod") > -1) && (t.message = 'The module "' + O(e) + '" that you are trying to load does not exist. ' + t.message), t
                        }
                    },
                    moduleExists: C,
                    _loadDependencies: function(t, n) {
                        var r, i, a, o = [],
                            s = this;
                        if (t = s._getModuleName(t), null === t) return f.when();
                        try {
                            r = s._getModule(t)
                        } catch (u) {
                            return p(u)
                        }
                        return i = s.getRequires(r), e.forEach(i, function(r) {
                            if (e.isString(r)) {
                                var i = s.getModuleConfig(r);
                                if (null === i) return void T.push(r);
                                r = i, i.name = void 0
                            }
                            if (s.moduleExists(r.name)) return a = r.files.filter(function(e) {
                                return s.getModuleConfig(r.name).files.indexOf(e) < 0
                            }), 0 !== a.length && s._$log.warn('Module "', t, '" attempted to redefine configuration for dependency. "', r.name, '"\n Additional Files Loaded:', a), e.isDefined(s.filesLoader) ? void o.push(s.filesLoader(r, n).then(function() {
                                return s._loadDependencies(r)
                            })) : p(new Error("Error: New dependencies need to be loaded from external files (" + r.files + "), but no loader has been defined."));
                            if (e.isArray(r)) {
                                var u = [];
                                e.forEach(r, function(e) {
                                    var t = s.getModuleConfig(e);
                                    null === t ? u.push(e) : t.files && (u = u.concat(t.files))
                                }), u.length > 0 && (r = {
                                    files: u
                                })
                            } else e.isObject(r) && r.hasOwnProperty("name") && r.name && (s.setModuleConfig(r), T.push(r.name));
                            if (e.isDefined(r.files) && 0 !== r.files.length) {
                                if (!e.isDefined(s.filesLoader)) return p(new Error('Error: the module "' + r.name + '" is defined in external files (' + r.files + "), but no loader has been defined."));
                                o.push(s.filesLoader(r, n).then(function() {
                                    return s._loadDependencies(r)
                                }))
                            }
                        }), f.all(o)
                    },
                    inject: function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                            r = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
                            i = this,
                            o = f.defer();
                        if (e.isDefined(t) && null !== t) {
                            if (e.isArray(t)) {
                                var s = [];
                                return e.forEach(t, function(e) {
                                    s.push(i.inject(e, n, r))
                                }), f.all(s)
                            }
                            i._addToLoadList(i._getModuleName(t), !0, r)
                        }
                        if (a.length > 0) {
                            var u = a.slice(),
                                l = function p(e) {
                                    T.push(e), A[e] = o.promise, i._loadDependencies(e, n).then(function() {
                                        try {
                                            c = [], y(S, T, n)
                                        } catch (e) {
                                            return i._$log.error(e.message), void o.reject(e)
                                        }
                                        a.length > 0 ? p(a.shift()) : o.resolve(u)
                                    }, function(e) {
                                        o.reject(e)
                                    })
                                };
                            l(a.shift())
                        } else {
                            if (n && n.name && A[n.name]) return A[n.name];
                            o.resolve()
                        }
                        return o.promise
                    },
                    getRequires: function(t) {
                        var r = [];
                        return e.forEach(t.requires, function(e) {
                            -1 === n.indexOf(e) && r.push(e)
                        }), r
                    },
                    _invokeQueue: w,
                    _registerInvokeList: b,
                    _register: y,
                    _addToLoadList: d,
                    _unregister: function(t) {
                        e.isDefined(t) && e.isArray(t) && e.forEach(t, function(e) {
                            r[e] = void 0
                        })
                    }
                }
            }], this._init(e.element(t.document))
        }]);
        var p = e.bootstrap;
        e.bootstrap = function(t, n, r) {
            return e.forEach(n.slice(), function(e) {
                d(e, !0, !0)
            }), p(t, n, r)
        };
        var d = function(t, n, r) {
                (s.length > 0 || n) && e.isString(t) && -1 === a.indexOf(t) && (a.push(t), r && o.push(t))
            },
            h = e.module;
        e.module = function(e, t, n) {
            return d(e, !1, !0), h(e, t, n)
        }, "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "oc.lazyLoad")
    }(angular, window),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").directive("ocLazyLoad", ["$ocLazyLoad", "$compile", "$animate", "$parse", "$timeout", function(t, n, r, i, a) {
            return {
                restrict: "A",
                terminal: !0,
                priority: 1e3,
                compile: function(a, o) {
                    var s = a[0].innerHTML;
                    return a.html(""),
                        function(a, o, u) {
                            var l = i(u.ocLazyLoad);
                            a.$watch(function() {
                                return l(a) || u.ocLazyLoad
                            }, function(i) {
                                e.isDefined(i) && t.load(i).then(function() {
                                    r.enter(s, o), n(o.contents())(a)
                                })
                            }, !0)
                        }
                }
            }
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", "$window", "$interval", function(t, n, r, i) {
                var a = !1,
                    o = !1,
                    s = r.document.getElementsByTagName("head")[0] || r.document.getElementsByTagName("body")[0];
                return t.buildElement = function(u, l, c) {
                    var f, p, d = n.defer(),
                        h = t._getFilesCache(),
                        m = function(e) {
                            var t = (new Date).getTime();
                            return e.indexOf("?") >= 0 ? "&" === e.substring(0, e.length - 1) ? e + "_dc=" + t : e + "&_dc=" + t : e + "?_dc=" + t
                        };
                    switch (e.isUndefined(h.get(l)) && h.put(l, d.promise), u) {
                        case "css":
                            f = r.document.createElement("link"), f.type = "text/css", f.rel = "stylesheet", f.href = c.cache === !1 ? m(l) : l;
                            break;
                        case "js":
                            f = r.document.createElement("script"), f.src = c.cache === !1 ? m(l) : l;
                            break;
                        default:
                            h.remove(l), d.reject(new Error('Requested type "' + u + '" is not known. Could not inject "' + l + '"'))
                    }
                    f.onload = f.onreadystatechange = function(e) {
                        f.readyState && !/^c|loade/.test(f.readyState) || p || (f.onload = f.onreadystatechange = null, p = 1, t._broadcast("ocLazyLoad.fileLoaded", l), d.resolve())
                    }, f.onerror = function() {
                        h.remove(l), d.reject(new Error("Unable to load " + l))
                    }, f.async = c.serie ? 0 : 1;
                    var g = s.lastChild;
                    if (c.insertBefore) {
                        var v = e.element(e.isDefined(window.jQuery) ? c.insertBefore : document.querySelector(c.insertBefore));
                        v && v.length > 0 && (g = v[0])
                    }
                    if (g.parentNode.insertBefore(f, g), "css" == u) {
                        if (!a) {
                            var $ = r.navigator.userAgent.toLowerCase();
                            if (/iP(hone|od|ad)/.test(r.navigator.platform)) {
                                var y = r.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                                    b = parseFloat([parseInt(y[1], 10), parseInt(y[2], 10), parseInt(y[3] || 0, 10)].join("."));
                                o = 6 > b
                            } else if ($.indexOf("android") > -1) {
                                var w = parseFloat($.slice($.indexOf("android") + 8));
                                o = 4.4 > w
                            } else if ($.indexOf("safari") > -1) {
                                var x = $.match(/version\/([\.\d]+)/i);
                                o = x && x[1] && parseFloat(x[1]) < 6
                            }
                        }
                        if (o) var C = 1e3,
                            k = i(function() {
                                try {
                                    f.sheet.cssRules, i.cancel(k), f.onload()
                                } catch (e) {
                                    --C <= 0 && f.onerror()
                                }
                            }, 20)
                    }
                    return d.promise
                }, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", function(t, n) {
                return t.filesLoader = function(r) {
                    var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        a = [],
                        o = [],
                        s = [],
                        u = [],
                        l = null,
                        c = t._getFilesCache();
                    t.toggleWatch(!0), e.extend(i, r);
                    var f = function(n) {
                        var r, f = null;
                        if (e.isObject(n) && (f = n.type, n = n.path), l = c.get(n), e.isUndefined(l) || i.cache === !1) {
                            if (null !== (r = /^(css|less|html|htm|js)?(?=!)/.exec(n)) && (f = r[1], n = n.substr(r[1].length + 1, n.length)), !f)
                                if (null !== (r = /[.](css|less|html|htm|js)?((\?|#).*)?$/.exec(n))) f = r[1];
                                else {
                                    if (t.jsLoader.hasOwnProperty("ocLazyLoadLoader") || !t.jsLoader.hasOwnProperty("requirejs")) return void t._$log.error("File type could not be determined. " + n);
                                    f = "js"
                                }
                                "css" !== f && "less" !== f || -1 !== a.indexOf(n) ? "html" !== f && "htm" !== f || -1 !== o.indexOf(n) ? "js" === f || -1 === s.indexOf(n) ? s.push(n) : t._$log.error("File type is not valid. " + n) : o.push(n) : a.push(n)
                        } else l && u.push(l)
                    };
                    if (i.serie ? f(i.files.shift()) : e.forEach(i.files, function(e) {
                            f(e)
                        }), a.length > 0) {
                        var p = n.defer();
                        t.cssLoader(a, function(n) {
                            e.isDefined(n) && t.cssLoader.hasOwnProperty("ocLazyLoadLoader") ? (t._$log.error(n), p.reject(n)) : p.resolve()
                        }, i), u.push(p.promise)
                    }
                    if (o.length > 0) {
                        var d = n.defer();
                        t.templatesLoader(o, function(n) {
                            e.isDefined(n) && t.templatesLoader.hasOwnProperty("ocLazyLoadLoader") ? (t._$log.error(n), d.reject(n)) : d.resolve()
                        }, i), u.push(d.promise)
                    }
                    if (s.length > 0) {
                        var h = n.defer();
                        t.jsLoader(s, function(n) {
                            e.isDefined(n) && (t.jsLoader.hasOwnProperty("ocLazyLoadLoader") || t.jsLoader.hasOwnProperty("requirejs")) ? (t._$log.error(n), h.reject(n)) : h.resolve()
                        }, i), u.push(h.promise)
                    }
                    if (0 === u.length) {
                        var m = n.defer(),
                            g = "Error: no file to load has been found, if you're trying to load an existing module you should use the 'inject' method instead of 'load'.";
                        return t._$log.error(g), m.reject(g), m.promise
                    }
                    return i.serie && i.files.length > 0 ? n.all(u).then(function() {
                        return t.filesLoader(r, i)
                    }) : n.all(u)["finally"](function(e) {
                        return t.toggleWatch(!1), e
                    })
                }, t.load = function(r) {
                    var i, a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        o = this,
                        s = null,
                        u = [],
                        l = n.defer(),
                        c = e.copy(r),
                        f = e.copy(a);
                    if (e.isArray(c)) return e.forEach(c, function(e) {
                        u.push(o.load(e, f))
                    }), n.all(u).then(function(e) {
                        l.resolve(e)
                    }, function(e) {
                        l.reject(e)
                    }), l.promise;
                    if (e.isString(c) ? (s = o.getModuleConfig(c), s || (s = {
                            files: [c]
                        })) : e.isObject(c) && (s = e.isDefined(c.path) && e.isDefined(c.type) ? {
                            files: [c]
                        } : o.setModuleConfig(c)), null === s) {
                        var p = o._getModuleName(c);
                        return i = 'Module "' + (p || "unknown") + '" is not configured, cannot load.', t._$log.error(i), l.reject(new Error(i)), l.promise
                    }
                    e.isDefined(s.template) && (e.isUndefined(s.files) && (s.files = []), e.isString(s.template) ? s.files.push(s.template) : e.isArray(s.template) && s.files.concat(s.template));
                    var d = e.extend({}, f, s);
                    return e.isUndefined(s.files) && e.isDefined(s.name) && t.moduleExists(s.name) ? t.inject(s.name, d, !0) : (t.filesLoader(s, d).then(function() {
                        t.inject(null, d).then(function(e) {
                            l.resolve(e)
                        }, function(e) {
                            l.reject(e)
                        })
                    }, function(e) {
                        l.reject(e)
                    }), l.promise)
                }, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", function(t, n) {
                return t.cssLoader = function(r, i, a) {
                    var o = [];
                    e.forEach(r, function(e) {
                        o.push(t.buildElement("css", e, a))
                    }), n.all(o).then(function() {
                        i()
                    }, function(e) {
                        i(e)
                    })
                }, t.cssLoader.ocLazyLoadLoader = !0, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", function(t, n) {
                return t.jsLoader = function(r, i, a) {
                    var o = [];
                    e.forEach(r, function(e) {
                        o.push(t.buildElement("js", e, a))
                    }), n.all(o).then(function() {
                        i()
                    }, function(e) {
                        i(e)
                    })
                }, t.jsLoader.ocLazyLoadLoader = !0, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$templateCache", "$q", "$http", function(t, n, r, i) {
                return t.templatesLoader = function(a, o, s) {
                    var u = [],
                        l = t._getFilesCache();
                    return e.forEach(a, function(t) {
                        var a = r.defer();
                        u.push(a.promise), i.get(t, s).success(function(r) {
                            e.isString(r) && r.length > 0 && e.forEach(e.element(r), function(e) {
                                "SCRIPT" === e.nodeName && "text/ng-template" === e.type && n.put(e.id, e.innerHTML)
                            }), e.isUndefined(l.get(t)) && l.put(t, !0), a.resolve()
                        }).error(function(e) {
                            a.reject(new Error('Unable to load template file "' + t + '": ' + e))
                        })
                    }), r.all(u).then(function() {
                        o()
                    }, function(e) {
                        o(e)
                    })
                }, t.templatesLoader.ocLazyLoadLoader = !0, t
            }])
        }])
    }(angular), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var n;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var r = Object(this),
            i = r.length >>> 0;
        if (0 === i) return -1;
        var a = +t || 0;
        if (Math.abs(a) === 1 / 0 && (a = 0), a >= i) return -1;
        for (n = Math.max(a >= 0 ? a : i - Math.abs(a), 0); i > n;) {
            if (n in r && r[n] === e) return n;
            n++
        }
        return -1
    }), angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.debounce", "ui.bootstrap.dropdown", "ui.bootstrap.stackedMap", "ui.bootstrap.modal", "ui.bootstrap.paging", "ui.bootstrap.pager", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["uib/template/accordion/accordion-group.html", "uib/template/accordion/accordion.html", "uib/template/alert/alert.html", "uib/template/carousel/carousel.html", "uib/template/carousel/slide.html", "uib/template/datepicker/datepicker.html", "uib/template/datepicker/day.html", "uib/template/datepicker/month.html", "uib/template/datepicker/popup.html", "uib/template/datepicker/year.html", "uib/template/modal/backdrop.html", "uib/template/modal/window.html", "uib/template/pager/pager.html", "uib/template/pagination/pagination.html", "uib/template/tooltip/tooltip-html-popup.html", "uib/template/tooltip/tooltip-popup.html", "uib/template/tooltip/tooltip-template-popup.html", "uib/template/popover/popover-html.html", "uib/template/popover/popover-template.html", "uib/template/popover/popover.html", "uib/template/progressbar/bar.html", "uib/template/progressbar/progress.html", "uib/template/progressbar/progressbar.html", "uib/template/rating/rating.html", "uib/template/tabs/tab.html", "uib/template/tabs/tabset.html", "uib/template/timepicker/timepicker.html", "uib/template/typeahead/typeahead-match.html", "uib/template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.collapse", []).directive("uibCollapse", ["$animate", "$q", "$parse", "$injector", function(e, t, n, r) {
        var i = r.has("$animateCss") ? r.get("$animateCss") : null;
        return {
            link: function(r, a, o) {
                function s() {
                    a.hasClass("collapse") && a.hasClass("in") || t.resolve(f(r)).then(function() {
                        a.removeClass("collapse").addClass("collapsing").attr("aria-expanded", !0).attr("aria-hidden", !1), i ? i(a, {
                            addClass: "in",
                            easing: "ease",
                            to: {
                                height: a[0].scrollHeight + "px"
                            }
                        }).start()["finally"](u) : e.addClass(a, "in", {
                            to: {
                                height: a[0].scrollHeight + "px"
                            }
                        }).then(u)
                    })
                }

                function u() {
                    a.removeClass("collapsing").addClass("collapse").css({
                        height: "auto"
                    }), p(r)
                }

                function l() {
                    return a.hasClass("collapse") || a.hasClass("in") ? void t.resolve(d(r)).then(function() {
                        a.css({
                            height: a[0].scrollHeight + "px"
                        }).removeClass("collapse").addClass("collapsing").attr("aria-expanded", !1).attr("aria-hidden", !0), i ? i(a, {
                            removeClass: "in",
                            to: {
                                height: "0"
                            }
                        }).start()["finally"](c) : e.removeClass(a, "in", {
                            to: {
                                height: "0"
                            }
                        }).then(c)
                    }) : c()
                }

                function c() {
                    a.css({
                        height: "0"
                    }), a.removeClass("collapsing").addClass("collapse"), h(r)
                }
                var f = n(o.expanding),
                    p = n(o.expanded),
                    d = n(o.collapsing),
                    h = n(o.collapsed);
                r.$eval(o.uibCollapse) || a.addClass("in").addClass("collapse").attr("aria-expanded", !0).attr("aria-hidden", !1).css({
                    height: "auto"
                }), r.$watch(o.uibCollapse, function(e) {
                    e ? l() : s()
                })
            }
        }
    }]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("uibAccordionConfig", {
        closeOthers: !0
    }).controller("UibAccordionController", ["$scope", "$attrs", "uibAccordionConfig", function(e, t, n) {
        this.groups = [], this.closeOthers = function(r) {
            var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
            i && angular.forEach(this.groups, function(e) {
                e !== r && (e.isOpen = !1)
            })
        }, this.addGroup = function(e) {
            var t = this;
            this.groups.push(e), e.$on("$destroy", function(n) {
                t.removeGroup(e)
            })
        }, this.removeGroup = function(e) {
            var t = this.groups.indexOf(e); - 1 !== t && this.groups.splice(t, 1)
        }
    }]).directive("uibAccordion", function() {
        return {
            controller: "UibAccordionController",
            controllerAs: "accordion",
            transclude: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/accordion/accordion.html"
            }
        }
    }).directive("uibAccordionGroup", function() {
        return {
            require: "^uibAccordion",
            transclude: !0,
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/accordion/accordion-group.html"
            },
            scope: {
                heading: "@",
                isOpen: "=?",
                isDisabled: "=?"
            },
            controller: function() {
                this.setHeading = function(e) {
                    this.heading = e
                }
            },
            link: function(e, t, n, r) {
                r.addGroup(e), e.openClass = n.openClass || "panel-open", e.panelClass = n.panelClass || "panel-default", e.$watch("isOpen", function(n) {
                    t.toggleClass(e.openClass, !!n), n && r.closeOthers(e)
                }), e.toggleOpen = function(t) {
                    e.isDisabled || t && 32 !== t.which || (e.isOpen = !e.isOpen)
                };
                var i = "accordiongroup-" + e.$id + "-" + Math.floor(1e4 * Math.random());
                e.headingId = i + "-tab", e.panelId = i + "-panel"
            }
        }
    }).directive("uibAccordionHeading", function() {
        return {
            transclude: !0,
            template: "",
            replace: !0,
            require: "^uibAccordionGroup",
            link: function(e, t, n, r, i) {
                r.setHeading(i(e, angular.noop))
            }
        }
    }).directive("uibAccordionTransclude", function() {
        return {
            require: "^uibAccordionGroup",
            link: function(e, t, n, r) {
                e.$watch(function() {
                    return r[n.uibAccordionTransclude]
                }, function(e) {
                    e && (t.find("span").html(""), t.find("span").append(e))
                })
            }
        }
    }), angular.module("ui.bootstrap.alert", []).controller("UibAlertController", ["$scope", "$attrs", "$interpolate", "$timeout", function(e, t, n, r) {
        e.closeable = !!t.close;
        var i = angular.isDefined(t.dismissOnTimeout) ? n(t.dismissOnTimeout)(e.$parent) : null;
        i && r(function() {
            e.close()
        }, parseInt(i, 10))
    }]).directive("uibAlert", function() {
        return {
            controller: "UibAlertController",
            controllerAs: "alert",
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/alert/alert.html"
            },
            transclude: !0,
            replace: !0,
            scope: {
                type: "@",
                close: "&"
            }
        }
    }), angular.module("ui.bootstrap.buttons", []).constant("uibButtonConfig", {
        activeClass: "active",
        toggleEvent: "click"
    }).controller("UibButtonsController", ["uibButtonConfig", function(e) {
        this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
    }]).directive("uibBtnRadio", ["$parse", function(e) {
        return {
            require: ["uibBtnRadio", "ngModel"],
            controller: "UibButtonsController",
            controllerAs: "buttons",
            link: function(t, n, r, i) {
                var a = i[0],
                    o = i[1],
                    s = e(r.uibUncheckable);
                n.find("input").css({
                    display: "none"
                }), o.$render = function() {
                    n.toggleClass(a.activeClass, angular.equals(o.$modelValue, t.$eval(r.uibBtnRadio)))
                }, n.on(a.toggleEvent, function() {
                    if (!r.disabled) {
                        var e = n.hasClass(a.activeClass);
                        (!e || angular.isDefined(r.uncheckable)) && t.$apply(function() {
                            o.$setViewValue(e ? null : t.$eval(r.uibBtnRadio)), o.$render()
                        })
                    }
                }), r.uibUncheckable && t.$watch(s, function(e) {
                    r.$set("uncheckable", e ? "" : null)
                })
            }
        }
    }]).directive("uibBtnCheckbox", function() {
        return {
            require: ["uibBtnCheckbox", "ngModel"],
            controller: "UibButtonsController",
            controllerAs: "button",
            link: function(e, t, n, r) {
                function i() {
                    return o(n.btnCheckboxTrue, !0)
                }

                function a() {
                    return o(n.btnCheckboxFalse, !1)
                }

                function o(t, n) {
                    return angular.isDefined(t) ? e.$eval(t) : n
                }
                var s = r[0],
                    u = r[1];
                t.find("input").css({
                    display: "none"
                }), u.$render = function() {
                    t.toggleClass(s.activeClass, angular.equals(u.$modelValue, i()))
                }, t.on(s.toggleEvent, function() {
                    n.disabled || e.$apply(function() {
                        u.$setViewValue(t.hasClass(s.activeClass) ? a() : i()), u.$render()
                    })
                })
            }
        }
    }), angular.module("ui.bootstrap.carousel", []).controller("UibCarouselController", ["$scope", "$element", "$interval", "$timeout", "$animate", function(e, t, n, r, i) {
        function a() {
            for (; $.length;) $.shift()
        }

        function o(e) {
            if (angular.isUndefined(m[e].index)) return m[e];
            for (var t = 0, n = m.length; n > t; ++t)
                if (m[t].index === e) return m[t]
        }

        function s(n, r, o) {
            y || (angular.extend(n, {
                direction: o,
                active: !0
            }), angular.extend(h.currentSlide || {}, {
                direction: o,
                active: !1
            }), i.enabled(t) && !e.$currentTransition && n.$element && h.slides.length > 1 && (n.$element.data(g, n.direction), h.currentSlide && h.currentSlide.$element && h.currentSlide.$element.data(g, n.direction), e.$currentTransition = !0, i.on("addClass", n.$element, function(t, n) {
                if ("close" === n && (e.$currentTransition = null, i.off("addClass", t), $.length)) {
                    var r = $.pop(),
                        o = e.indexOfSlide(r),
                        u = o > h.getCurrentIndex() ? "next" : "prev";
                    a(), s(r, o, u)
                }
            })), h.currentSlide = n, v = r, c())
        }

        function u() {
            p && (n.cancel(p), p = null)
        }

        function l(t) {
            t.length || (e.$currentTransition = null, a())
        }

        function c() {
            u();
            var t = +e.interval;
            !isNaN(t) && t > 0 && (p = n(f, t))
        }

        function f() {
            var t = +e.interval;
            d && !isNaN(t) && t > 0 && m.length ? e.next() : e.pause()
        }
        var p, d, h = this,
            m = h.slides = e.slides = [],
            g = "uib-slideDirection",
            v = -1,
            $ = [];
        h.currentSlide = null;
        var y = !1;
        h.addSlide = function(t, n) {
            t.$element = n, m.push(t), 1 === m.length || t.active ? (e.$currentTransition && (e.$currentTransition = null), h.select(m[m.length - 1]), 1 === m.length && e.play()) : t.active = !1
        }, h.getCurrentIndex = function() {
            return h.currentSlide && angular.isDefined(h.currentSlide.index) ? +h.currentSlide.index : v
        }, h.next = e.next = function() {
            var t = (h.getCurrentIndex() + 1) % m.length;
            return 0 === t && e.noWrap() ? void e.pause() : h.select(o(t), "next")
        }, h.prev = e.prev = function() {
            var t = h.getCurrentIndex() - 1 < 0 ? m.length - 1 : h.getCurrentIndex() - 1;
            return e.noWrap() && t === m.length - 1 ? void e.pause() : h.select(o(t), "prev")
        }, h.removeSlide = function(e) {
            angular.isDefined(e.index) && m.sort(function(e, t) {
                return +e.index > +t.index
            });
            var t = $.indexOf(e); - 1 !== t && $.splice(t, 1);
            var n = m.indexOf(e);
            m.splice(n, 1), r(function() {
                m.length > 0 && e.active ? n >= m.length ? h.select(m[n - 1]) : h.select(m[n]) : v > n && v--
            }), 0 === m.length && (h.currentSlide = null, a())
        }, h.select = e.select = function(t, n) {
            var r = e.indexOfSlide(t);
            void 0 === n && (n = r > h.getCurrentIndex() ? "next" : "prev"), t && t !== h.currentSlide && !e.$currentTransition ? s(t, r, n) : t && t !== h.currentSlide && e.$currentTransition && ($.push(t), t.active = !1)
        }, e.indexOfSlide = function(e) {
            return angular.isDefined(e.index) ? +e.index : m.indexOf(e)
        }, e.isActive = function(e) {
            return h.currentSlide === e
        }, e.pause = function() {
            e.noPause || (d = !1, u())
        }, e.play = function() {
            d || (d = !0, c())
        }, e.$on("$destroy", function() {
            y = !0, u()
        }), e.$watch("noTransition", function(e) {
            i.enabled(t, !e)
        }), e.$watch("interval", c), e.$watchCollection("slides", l)
    }]).directive("uibCarousel", function() {
        return {
            transclude: !0,
            replace: !0,
            controller: "UibCarouselController",
            controllerAs: "carousel",
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/carousel/carousel.html"
            },
            scope: {
                interval: "=",
                noTransition: "=",
                noPause: "=",
                noWrap: "&"
            }
        }
    }).directive("uibSlide", function() {
        return {
            require: "^uibCarousel",
            transclude: !0,
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/carousel/slide.html"
            },
            scope: {
                active: "=?",
                actual: "=?",
                index: "=?"
            },
            link: function(e, t, n, r) {
                r.addSlide(e, t), e.$on("$destroy", function() {
                    r.removeSlide(e)
                }), e.$watch("active", function(t) {
                    t && r.select(e)
                })
            }
        }
    }).animation(".item", ["$animateCss", function(e) {
        function t(e, t, n) {
            e.removeClass(t), n && n()
        }
        var n = "uib-slideDirection";
        return {
            beforeAddClass: function(r, i, a) {
                if ("active" === i) {
                    var o = !1,
                        s = r.data(n),
                        u = "next" === s ? "left" : "right",
                        l = t.bind(this, r, u + " " + s, a);
                    return r.addClass(s), e(r, {
                            addClass: u
                        }).start().done(l),
                        function() {
                            o = !0
                        }
                }
                a()
            },
            beforeRemoveClass: function(r, i, a) {
                if ("active" === i) {
                    var o = !1,
                        s = r.data(n),
                        u = "next" === s ? "left" : "right",
                        l = t.bind(this, r, u, a);
                    return e(r, {
                            addClass: u
                        }).start().done(l),
                        function() {
                            o = !0
                        }
                }
                a()
            }
        }
    }]), angular.module("ui.bootstrap.dateparser", []).service("uibDateParser", ["$log", "$locale", "dateFilter", "orderByFilter", function(e, t, n, r) {
        function i(e, t) {
            var n = [],
                i = e.split(""),
                a = e.indexOf("'");
            if (a > -1) {
                var o = !1;
                e = e.split("");
                for (var s = a; s < e.length; s++) o ? ("'" === e[s] && (s + 1 < e.length && "'" === e[s + 1] ? (e[s + 1] = "$", i[s + 1] = "") : (i[s] = "", o = !1)), e[s] = "$") : "'" === e[s] && (e[s] = "$", i[s] = "", o = !0);
                e = e.join("")
            }
            return angular.forEach(d, function(r) {
                var a = e.indexOf(r.key);
                if (a > -1) {
                    e = e.split(""), i[a] = "(" + r.regex + ")", e[a] = "$";
                    for (var o = a + 1, s = a + r.key.length; s > o; o++) i[o] = "", e[o] = "$";
                    e = e.join(""), n.push({
                        index: a,
                        key: r.key,
                        apply: r[t],
                        matcher: r.regex
                    })
                }
            }), {
                regex: new RegExp("^" + i.join("") + "$"),
                map: r(n, "index")
            }
        }

        function a(e, t, n) {
            return 1 > n ? !1 : 1 === t && n > 28 ? 29 === n && (e % 4 === 0 && e % 100 !== 0 || e % 400 === 0) : 3 === t || 5 === t || 8 === t || 10 === t ? 31 > n : !0
        }

        function o(e) {
            return parseInt(e, 10)
        }

        function s(e, t) {
            return e && t ? f(e, t) : e
        }

        function u(e, t) {
            return e && t ? f(e, t, !0) : e
        }

        function l(e, t) {
            var n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
            return isNaN(n) ? t : n
        }

        function c(e, t) {
            return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
        }

        function f(e, t, n) {
            n = n ? -1 : 1;
            var r = l(t, e.getTimezoneOffset());
            return c(e, n * (r - e.getTimezoneOffset()))
        }
        var p, d, h = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
        this.init = function() {
            p = t.id, this.parsers = {}, this.formatters = {}, d = [{
                key: "yyyy",
                regex: "\\d{4}",
                apply: function(e) {
                    this.year = +e
                },
                formatter: function(e) {
                    var t = new Date;
                    return t.setFullYear(Math.abs(e.getFullYear())), n(t, "yyyy")
                }
            }, {
                key: "yy",
                regex: "\\d{2}",
                apply: function(e) {
                    this.year = +e + 2e3
                },
                formatter: function(e) {
                    var t = new Date;
                    return t.setFullYear(Math.abs(e.getFullYear())), n(t, "yy")
                }
            }, {
                key: "y",
                regex: "\\d{1,4}",
                apply: function(e) {
                    this.year = +e
                },
                formatter: function(e) {
                    var t = new Date;
                    return t.setFullYear(Math.abs(e.getFullYear())), n(t, "y")
                }
            }, {
                key: "M!",
                regex: "0?[1-9]|1[0-2]",
                apply: function(e) {
                    this.month = e - 1
                },
                formatter: function(e) {
                    var t = e.getMonth();
                    return /^[0-9]$/.test(t) ? n(e, "MM") : n(e, "M")
                }
            }, {
                key: "MMMM",
                regex: t.DATETIME_FORMATS.MONTH.join("|"),
                apply: function(e) {
                    this.month = t.DATETIME_FORMATS.MONTH.indexOf(e)
                },
                formatter: function(e) {
                    return n(e, "MMMM")
                }
            }, {
                key: "MMM",
                regex: t.DATETIME_FORMATS.SHORTMONTH.join("|"),
                apply: function(e) {
                    this.month = t.DATETIME_FORMATS.SHORTMONTH.indexOf(e)
                },
                formatter: function(e) {
                    return n(e, "MMM")
                }
            }, {
                key: "MM",
                regex: "0[1-9]|1[0-2]",
                apply: function(e) {
                    this.month = e - 1
                },
                formatter: function(e) {
                    return n(e, "MM")
                }
            }, {
                key: "M",
                regex: "[1-9]|1[0-2]",
                apply: function(e) {
                    this.month = e - 1
                },
                formatter: function(e) {
                    return n(e, "M")
                }
            }, {
                key: "d!",
                regex: "[0-2]?[0-9]{1}|3[0-1]{1}",
                apply: function(e) {
                    this.date = +e
                },
                formatter: function(e) {
                    var t = e.getDate();
                    return /^[1-9]$/.test(t) ? n(e, "dd") : n(e, "d")
                }
            }, {
                key: "dd",
                regex: "[0-2][0-9]{1}|3[0-1]{1}",
                apply: function(e) {
                    this.date = +e
                },
                formatter: function(e) {
                    return n(e, "dd")
                }
            }, {
                key: "d",
                regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
                apply: function(e) {
                    this.date = +e
                },
                formatter: function(e) {
                    return n(e, "d")
                }
            }, {
                key: "EEEE",
                regex: t.DATETIME_FORMATS.DAY.join("|"),
                formatter: function(e) {
                    return n(e, "EEEE")
                }
            }, {
                key: "EEE",
                regex: t.DATETIME_FORMATS.SHORTDAY.join("|"),
                formatter: function(e) {
                    return n(e, "EEE")
                }
            }, {
                key: "HH",
                regex: "(?:0|1)[0-9]|2[0-3]",
                apply: function(e) {
                    this.hours = +e
                },
                formatter: function(e) {
                    return n(e, "HH")
                }
            }, {
                key: "hh",
                regex: "0[0-9]|1[0-2]",
                apply: function(e) {
                    this.hours = +e
                },
                formatter: function(e) {
                    return n(e, "hh")
                }
            }, {
                key: "H",
                regex: "1?[0-9]|2[0-3]",
                apply: function(e) {
                    this.hours = +e
                },
                formatter: function(e) {
                    return n(e, "H")
                }
            }, {
                key: "h",
                regex: "[0-9]|1[0-2]",
                apply: function(e) {
                    this.hours = +e
                },
                formatter: function(e) {
                    return n(e, "h")
                }
            }, {
                key: "mm",
                regex: "[0-5][0-9]",
                apply: function(e) {
                    this.minutes = +e
                },
                formatter: function(e) {
                    return n(e, "mm")
                }
            }, {
                key: "m",
                regex: "[0-9]|[1-5][0-9]",
                apply: function(e) {
                    this.minutes = +e
                },
                formatter: function(e) {
                    return n(e, "m")
                }
            }, {
                key: "sss",
                regex: "[0-9][0-9][0-9]",
                apply: function(e) {
                    this.milliseconds = +e
                },
                formatter: function(e) {
                    return n(e, "sss")
                }
            }, {
                key: "ss",
                regex: "[0-5][0-9]",
                apply: function(e) {
                    this.seconds = +e
                },
                formatter: function(e) {
                    return n(e, "ss")
                }
            }, {
                key: "s",
                regex: "[0-9]|[1-5][0-9]",
                apply: function(e) {
                    this.seconds = +e
                },
                formatter: function(e) {
                    return n(e, "s")
                }
            }, {
                key: "a",
                regex: t.DATETIME_FORMATS.AMPMS.join("|"),
                apply: function(e) {
                    12 === this.hours && (this.hours = 0), "PM" === e && (this.hours += 12)
                },
                formatter: function(e) {
                    return n(e, "a")
                }
            }, {
                key: "Z",
                regex: "[+-]\\d{4}",
                apply: function(e) {
                    var t = e.match(/([+-])(\d{2})(\d{2})/),
                        n = t[1],
                        r = t[2],
                        i = t[3];
                    this.hours += o(n + r), this.minutes += o(n + i)
                },
                formatter: function(e) {
                    return n(e, "Z")
                }
            }, {
                key: "ww",
                regex: "[0-4][0-9]|5[0-3]",
                formatter: function(e) {
                    return n(e, "ww")
                }
            }, {
                key: "w",
                regex: "[0-9]|[1-4][0-9]|5[0-3]",
                formatter: function(e) {
                    return n(e, "w")
                }
            }, {
                key: "GGGG",
                regex: t.DATETIME_FORMATS.ERANAMES.join("|").replace(/\s/g, "\\s"),
                formatter: function(e) {
                    return n(e, "GGGG")
                }
            }, {
                key: "GGG",
                regex: t.DATETIME_FORMATS.ERAS.join("|"),
                formatter: function(e) {
                    return n(e, "GGG")
                }
            }, {
                key: "GG",
                regex: t.DATETIME_FORMATS.ERAS.join("|"),
                formatter: function(e) {
                    return n(e, "GG")
                }
            }, {
                key: "G",
                regex: t.DATETIME_FORMATS.ERAS.join("|"),
                formatter: function(e) {
                    return n(e, "G")
                }
            }]
        }, this.init(), this.filter = function(e, n) {
            if (!angular.isDate(e) || isNaN(e) || !n) return "";
            n = t.DATETIME_FORMATS[n] || n, t.id !== p && this.init(), this.formatters[n] || (this.formatters[n] = i(n, "formatter"));
            var r = this.formatters[n],
                a = r.map,
                o = n;
            return a.reduce(function(t, n, r) {
                var i = o.match(new RegExp("(.*)" + n.key));
                return i && angular.isString(i[1]) && (t += i[1], o = o.replace(i[1] + n.key, "")), n.apply ? t + n.apply.call(null, e) : t
            }, "")
        }, this.parse = function(n, r, o) {
            if (!angular.isString(n) || !r) return n;
            r = t.DATETIME_FORMATS[r] || r, r = r.replace(h, "\\$&"), t.id !== p && this.init(), this.parsers[r] || (this.parsers[r] = i(r, "apply"));
            var s = this.parsers[r],
                u = s.regex,
                l = s.map,
                c = n.match(u),
                f = !1;
            if (c && c.length) {
                var d, m;
                angular.isDate(o) && !isNaN(o.getTime()) ? d = {
                    year: o.getFullYear(),
                    month: o.getMonth(),
                    date: o.getDate(),
                    hours: o.getHours(),
                    minutes: o.getMinutes(),
                    seconds: o.getSeconds(),
                    milliseconds: o.getMilliseconds()
                } : (o && e.warn("dateparser:", "baseDate is not a valid date"), d = {
                    year: 1900,
                    month: 0,
                    date: 1,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                });
                for (var g = 1, v = c.length; v > g; g++) {
                    var $ = l[g - 1];
                    "Z" === $.matcher && (f = !0), $.apply && $.apply.call(d, c[g])
                }
                var y = f ? Date.prototype.setUTCFullYear : Date.prototype.setFullYear,
                    b = f ? Date.prototype.setUTCHours : Date.prototype.setHours;
                return a(d.year, d.month, d.date) && (!angular.isDate(o) || isNaN(o.getTime()) || f ? (m = new Date(0), y.call(m, d.year, d.month, d.date), b.call(m, d.hours || 0, d.minutes || 0, d.seconds || 0, d.milliseconds || 0)) : (m = new Date(o), y.call(m, d.year, d.month, d.date), b.call(m, d.hours, d.minutes, d.seconds, d.milliseconds))), m
            }
        }, this.toTimezone = s, this.fromTimezone = u, this.timezoneToOffset = l, this.addDateMinutes = c, this.convertTimezoneToLocal = f
    }]), angular.module("ui.bootstrap.isClass", []).directive("uibIsClass", ["$animate", function(e) {
        var t = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/,
            n = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;
        return {
            restrict: "A",
            compile: function(r, i) {
                function a(e, t, n) {
                    u.push(e), l.push({
                        scope: e,
                        element: t
                    }), h.forEach(function(t, n) {
                        o(t, e)
                    }), e.$on("$destroy", s)
                }

                function o(t, r) {
                    var i = t.match(n),
                        a = r.$eval(i[1]),
                        o = i[2],
                        s = c[t];
                    if (!s) {
                        var u = function(t) {
                            var n = null;
                            l.some(function(e) {
                                var r = e.scope.$eval(p);
                                return r === t ? (n = e, !0) : void 0
                            }), s.lastActivated !== n && (s.lastActivated && e.removeClass(s.lastActivated.element, a), n && e.addClass(n.element, a), s.lastActivated = n)
                        };
                        c[t] = s = {
                            lastActivated: null,
                            scope: r,
                            watchFn: u,
                            compareWithExp: o,
                            watcher: r.$watch(o, u)
                        }
                    }
                    s.watchFn(r.$eval(o))
                }

                function s(e) {
                    var t = e.targetScope,
                        n = u.indexOf(t);
                    if (u.splice(n, 1), l.splice(n, 1), u.length) {
                        var r = u[0];
                        angular.forEach(c, function(e) {
                            e.scope === t && (e.watcher = r.$watch(e.compareWithExp, e.watchFn), e.scope = r)
                        })
                    } else c = {}
                }
                var u = [],
                    l = [],
                    c = {},
                    f = i.uibIsClass.match(t),
                    p = f[2],
                    d = f[1],
                    h = d.split(",");
                return a
            }
        }
    }]), angular.module("ui.bootstrap.position", []).factory("$uibPosition", ["$document", "$window", function(e, t) {
        var n, r = {
                normal: /(auto|scroll)/,
                hidden: /(auto|scroll|hidden)/
            },
            i = {
                auto: /\s?auto?\s?/i,
                primary: /^(top|bottom|left|right)$/,
                secondary: /^(top|bottom|left|right|center)$/,
                vertical: /^(top|bottom)$/
            };
        return {
            getRawNode: function(e) {
                return e[0] || e
            },
            parseStyle: function(e) {
                return e = parseFloat(e), isFinite(e) ? e : 0
            },
            offsetParent: function(n) {
                function r(e) {
                    return "static" === (t.getComputedStyle(e).position || "static")
                }
                n = this.getRawNode(n);
                for (var i = n.offsetParent || e[0].documentElement; i && i !== e[0].documentElement && r(i);) i = i.offsetParent;
                return i || e[0].documentElement
            },
            scrollbarWidth: function() {
                if (angular.isUndefined(n)) {
                    var t = angular.element('<div style="position: absolute; top: -9999px; width: 50px; height: 50px; overflow: scroll;"></div>');
                    e.find("body").append(t), n = t[0].offsetWidth - t[0].clientWidth, n = isFinite(n) ? n : 0, t.remove()
                }
                return n
            },
            scrollParent: function(n, i) {
                n = this.getRawNode(n);
                var a = i ? r.hidden : r.normal,
                    o = e[0].documentElement,
                    s = t.getComputedStyle(n),
                    u = "absolute" === s.position,
                    l = n.parentElement || o;
                if (l === o || "fixed" === s.position) return o;
                for (; l.parentElement && l !== o;) {
                    var c = t.getComputedStyle(l);
                    if (u && "static" !== c.position && (u = !1), !u && a.test(c.overflow + c.overflowY + c.overflowX)) break;
                    l = l.parentElement
                }
                return l
            },
            position: function(n, r) {
                n = this.getRawNode(n);
                var i = this.offset(n);
                if (r) {
                    var a = t.getComputedStyle(n);
                    i.top -= this.parseStyle(a.marginTop), i.left -= this.parseStyle(a.marginLeft)
                }
                var o = this.offsetParent(n),
                    s = {
                        top: 0,
                        left: 0
                    };
                return o !== e[0].documentElement && (s = this.offset(o), s.top += o.clientTop - o.scrollTop, s.left += o.clientLeft - o.scrollLeft), {
                    width: Math.round(angular.isNumber(i.width) ? i.width : n.offsetWidth),
                    height: Math.round(angular.isNumber(i.height) ? i.height : n.offsetHeight),
                    top: Math.round(i.top - s.top),
                    left: Math.round(i.left - s.left)
                }
            },
            offset: function(n) {
                n = this.getRawNode(n);
                var r = n.getBoundingClientRect();
                return {
                    width: Math.round(angular.isNumber(r.width) ? r.width : n.offsetWidth),
                    height: Math.round(angular.isNumber(r.height) ? r.height : n.offsetHeight),
                    top: Math.round(r.top + (t.pageYOffset || e[0].documentElement.scrollTop)),
                    left: Math.round(r.left + (t.pageXOffset || e[0].documentElement.scrollLeft))
                }
            },
            viewportOffset: function(n, r, i) {
                n = this.getRawNode(n), i = i !== !1 ? !0 : !1;
                var a = n.getBoundingClientRect(),
                    o = {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    },
                    s = r ? e[0].documentElement : this.scrollParent(n),
                    u = s.getBoundingClientRect();
                if (o.top = u.top + s.clientTop, o.left = u.left + s.clientLeft, s === e[0].documentElement && (o.top += t.pageYOffset, o.left += t.pageXOffset), o.bottom = o.top + s.clientHeight, o.right = o.left + s.clientWidth, i) {
                    var l = t.getComputedStyle(s);
                    o.top += this.parseStyle(l.paddingTop), o.bottom -= this.parseStyle(l.paddingBottom), o.left += this.parseStyle(l.paddingLeft), o.right -= this.parseStyle(l.paddingRight)
                }
                return {
                    top: Math.round(a.top - o.top),
                    bottom: Math.round(o.bottom - a.bottom),
                    left: Math.round(a.left - o.left),
                    right: Math.round(o.right - a.right)
                }
            },
            parsePlacement: function(e) {
                var t = i.auto.test(e);
                return t && (e = e.replace(i.auto, "")), e = e.split("-"), e[0] = e[0] || "top", i.primary.test(e[0]) || (e[0] = "top"), e[1] = e[1] || "center", i.secondary.test(e[1]) || (e[1] = "center"), t ? e[2] = !0 : e[2] = !1, e
            },
            positionElements: function(e, n, r, a) {
                e = this.getRawNode(e), n = this.getRawNode(n);
                var o = angular.isDefined(n.offsetWidth) ? n.offsetWidth : n.prop("offsetWidth"),
                    s = angular.isDefined(n.offsetHeight) ? n.offsetHeight : n.prop("offsetHeight");
                r = this.parsePlacement(r);
                var u = a ? this.offset(e) : this.position(e),
                    l = {
                        top: 0,
                        left: 0,
                        placement: ""
                    };
                if (r[2]) {
                    var c = this.viewportOffset(e),
                        f = t.getComputedStyle(n),
                        p = {
                            width: o + Math.round(Math.abs(this.parseStyle(f.marginLeft) + this.parseStyle(f.marginRight))),
                            height: s + Math.round(Math.abs(this.parseStyle(f.marginTop) + this.parseStyle(f.marginBottom)))
                        };
                    if (r[0] = "top" === r[0] && p.height > c.top && p.height <= c.bottom ? "bottom" : "bottom" === r[0] && p.height > c.bottom && p.height <= c.top ? "top" : "left" === r[0] && p.width > c.left && p.width <= c.right ? "right" : "right" === r[0] && p.width > c.right && p.width <= c.left ? "left" : r[0], r[1] = "top" === r[1] && p.height - u.height > c.bottom && p.height - u.height <= c.top ? "bottom" : "bottom" === r[1] && p.height - u.height > c.top && p.height - u.height <= c.bottom ? "top" : "left" === r[1] && p.width - u.width > c.right && p.width - u.width <= c.left ? "right" : "right" === r[1] && p.width - u.width > c.left && p.width - u.width <= c.right ? "left" : r[1], "center" === r[1])
                        if (i.vertical.test(r[0])) {
                            var d = u.width / 2 - o / 2;
                            c.left + d < 0 && p.width - u.width <= c.right ? r[1] = "left" : c.right + d < 0 && p.width - u.width <= c.left && (r[1] = "right")
                        } else {
                            var h = u.height / 2 - p.height / 2;
                            c.top + h < 0 && p.height - u.height <= c.bottom ? r[1] = "top" : c.bottom + h < 0 && p.height - u.height <= c.top && (r[1] = "bottom")
                        }
                }
                switch (r[0]) {
                    case "top":
                        l.top = u.top - s;
                        break;
                    case "bottom":
                        l.top = u.top + u.height;
                        break;
                    case "left":
                        l.left = u.left - o;
                        break;
                    case "right":
                        l.left = u.left + u.width
                }
                switch (r[1]) {
                    case "top":
                        l.top = u.top;
                        break;
                    case "bottom":
                        l.top = u.top + u.height - s;
                        break;
                    case "left":
                        l.left = u.left;
                        break;
                    case "right":
                        l.left = u.left + u.width - o;
                        break;
                    case "center":
                        i.vertical.test(r[0]) ? l.left = u.left + u.width / 2 - o / 2 : l.top = u.top + u.height / 2 - s / 2
                }
                return l.top = Math.round(l.top), l.left = Math.round(l.left), l.placement = "center" === r[1] ? r[0] : r[0] + "-" + r[1], l
            },
            positionArrow: function(e, n) {
                e = this.getRawNode(e);
                var r = e.querySelector(".tooltip-inner, .popover-inner");
                if (r) {
                    var a = angular.element(r).hasClass("tooltip-inner"),
                        o = a ? e.querySelector(".tooltip-arrow") : e.querySelector(".arrow");
                    if (o) {
                        if (n = this.parsePlacement(n), "center" === n[1]) return void angular.element(o).css({
                            top: "",
                            bottom: "",
                            right: "",
                            left: "",
                            margin: ""
                        });
                        var s = "border-" + n[0] + "-width",
                            u = t.getComputedStyle(o)[s],
                            l = "border-";
                        l += i.vertical.test(n[0]) ? n[0] + "-" + n[1] : n[1] + "-" + n[0], l += "-radius";
                        var c = t.getComputedStyle(a ? r : e)[l],
                            f = {
                                top: "auto",
                                bottom: "auto",
                                left: "auto",
                                right: "auto",
                                margin: 0
                            };
                        switch (n[0]) {
                            case "top":
                                f.bottom = a ? "0" : "-" + u;
                                break;
                            case "bottom":
                                f.top = a ? "0" : "-" + u;
                                break;
                            case "left":
                                f.right = a ? "0" : "-" + u;
                                break;
                            case "right":
                                f.left = a ? "0" : "-" + u
                        }
                        f[n[1]] = c, angular.element(o).css(f)
                    }
                }
            }
        }
    }]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.position"]).value("$datepickerSuppressError", !1).constant("uibDatepickerConfig", {
        datepickerMode: "day",
        formatDay: "dd",
        formatMonth: "MMMM",
        formatYear: "yyyy",
        formatDayHeader: "EEE",
        formatDayTitle: "MMMM yyyy",
        formatMonthTitle: "yyyy",
        maxDate: null,
        maxMode: "year",
        minDate: null,
        minMode: "day",
        ngModelOptions: {},
        shortcutPropagation: !1,
        showWeeks: !0,
        yearColumns: 5,
        yearRows: 4
    }).controller("UibDatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$locale", "$log", "dateFilter", "uibDatepickerConfig", "$datepickerSuppressError", "uibDateParser", function(e, t, n, r, i, a, o, s, u, l) {
        var c = this,
            f = {
                $setViewValue: angular.noop
            },
            p = {},
            d = [];
        this.modes = ["day", "month", "year"], t.datepickerOptions ? angular.forEach(["formatDay", "formatDayHeader", "formatDayTitle", "formatMonth", "formatMonthTitle", "formatYear", "initDate", "maxDate", "maxMode", "minDate", "minMode", "showWeeks", "shortcutPropagation", "startingDay", "yearColumns", "yearRows"], function(t) {
            switch (t) {
                case "formatDay":
                case "formatDayHeader":
                case "formatDayTitle":
                case "formatMonth":
                case "formatMonthTitle":
                case "formatYear":
                    c[t] = angular.isDefined(e.datepickerOptions[t]) ? r(e.datepickerOptions[t])(e.$parent) : s[t];
                    break;
                case "showWeeks":
                case "shortcutPropagation":
                case "yearColumns":
                case "yearRows":
                    c[t] = angular.isDefined(e.datepickerOptions[t]) ? e.datepickerOptions[t] : s[t];
                    break;
                case "startingDay":
                    angular.isDefined(e.datepickerOptions.startingDay) ? c.startingDay = e.datepickerOptions.startingDay : angular.isNumber(s.startingDay) ? c.startingDay = s.startingDay : c.startingDay = (i.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
                    break;
                case "maxDate":
                case "minDate":
                    e.datepickerOptions[t] ? e.$watch(function() {
                        return e.datepickerOptions[t]
                    }, function(e) {
                        e ? angular.isDate(e) ? c[t] = l.fromTimezone(new Date(e), p.timezone) : c[t] = new Date(o(e, "medium")) : c[t] = null, c.refreshView()
                    }) : c[t] = s[t] ? l.fromTimezone(new Date(s[t]), p.timezone) : null;
                    break;
                case "maxMode":
                case "minMode":
                    e.datepickerOptions[t] ? e.$watch(function() {
                        return e.datepickerOptions[t]
                    }, function(n) {
                        c[t] = e[t] = angular.isDefined(n) ? n : datepickerOptions[t], ("minMode" === t && c.modes.indexOf(e.datepickerMode) < c.modes.indexOf(c[t]) || "maxMode" === t && c.modes.indexOf(e.datepickerMode) > c.modes.indexOf(c[t])) && (e.datepickerMode = c[t])
                    }) : c[t] = e[t] = s[t] || null;
                    break;
                case "initDate":
                    e.datepickerOptions.initDate ? (this.activeDate = l.fromTimezone(e.datepickerOptions.initDate, p.timezone) || new Date, e.$watch(function() {
                        return e.datepickerOptions.initDate
                    }, function(e) {
                        e && (f.$isEmpty(f.$modelValue) || f.$invalid) && (c.activeDate = l.fromTimezone(e, p.timezone), c.refreshView())
                    })) : this.activeDate = new Date
            }
        }) : (angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle"], function(n) {
            c[n] = angular.isDefined(t[n]) ? r(t[n])(e.$parent) : s[n]
        }), angular.forEach(["showWeeks", "yearRows", "yearColumns", "shortcutPropagation"], function(n) {
            c[n] = angular.isDefined(t[n]) ? e.$parent.$eval(t[n]) : s[n]
        }), angular.isDefined(t.startingDay) ? c.startingDay = e.$parent.$eval(t.startingDay) : angular.isNumber(s.startingDay) ? c.startingDay = s.startingDay : c.startingDay = (i.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7, angular.forEach(["minDate", "maxDate"], function(n) {
            t[n] ? d.push(e.$parent.$watch(t[n], function(e) {
                e ? angular.isDate(e) ? c[n] = l.fromTimezone(new Date(e), p.timezone) : c[n] = new Date(o(e, "medium")) : c[n] = null, c.refreshView()
            })) : c[n] = s[n] ? l.fromTimezone(new Date(s[n]), p.timezone) : null
        }), angular.forEach(["minMode", "maxMode"], function(n) {
            t[n] ? d.push(e.$parent.$watch(t[n], function(r) {
                c[n] = e[n] = angular.isDefined(r) ? r : t[n], ("minMode" === n && c.modes.indexOf(e.datepickerMode) < c.modes.indexOf(c[n]) || "maxMode" === n && c.modes.indexOf(e.datepickerMode) > c.modes.indexOf(c[n])) && (e.datepickerMode = c[n]);
            })) : c[n] = e[n] = s[n] || null
        }), angular.isDefined(t.initDate) ? (this.activeDate = l.fromTimezone(e.$parent.$eval(t.initDate), p.timezone) || new Date, d.push(e.$parent.$watch(t.initDate, function(e) {
            e && (f.$isEmpty(f.$modelValue) || f.$invalid) && (c.activeDate = l.fromTimezone(e, p.timezone), c.refreshView())
        }))) : this.activeDate = new Date), e.datepickerMode = e.datepickerMode || s.datepickerMode, e.uniqueId = "datepicker-" + e.$id + "-" + Math.floor(1e4 * Math.random()), e.disabled = angular.isDefined(t.disabled) || !1, angular.isDefined(t.ngDisabled) && d.push(e.$parent.$watch(t.ngDisabled, function(t) {
            e.disabled = t, c.refreshView()
        })), e.isActive = function(t) {
            return 0 === c.compare(t.date, c.activeDate) ? (e.activeDateId = t.uid, !0) : !1
        }, this.init = function(e) {
            f = e, p = e.$options || s.ngModelOptions, f.$modelValue && (this.activeDate = f.$modelValue), f.$render = function() {
                c.render()
            }
        }, this.render = function() {
            if (f.$viewValue) {
                var e = new Date(f.$viewValue),
                    t = !isNaN(e);
                t ? this.activeDate = l.fromTimezone(e, p.timezone) : u || a.error('Datepicker directive: "ng-model" value must be a Date object')
            }
            this.refreshView()
        }, this.refreshView = function() {
            if (this.element) {
                e.selectedDt = null, this._refreshView(), e.activeDt && (e.activeDateId = e.activeDt.uid);
                var t = f.$viewValue ? new Date(f.$viewValue) : null;
                t = l.fromTimezone(t, p.timezone), f.$setValidity("dateDisabled", !t || this.element && !this.isDisabled(t))
            }
        }, this.createDateObject = function(t, n) {
            var r = f.$viewValue ? new Date(f.$viewValue) : null;
            r = l.fromTimezone(r, p.timezone);
            var i = {
                date: t,
                label: l.filter(t, n),
                selected: r && 0 === this.compare(t, r),
                disabled: this.isDisabled(t),
                current: 0 === this.compare(t, new Date),
                customClass: this.customClass(t) || null
            };
            return r && 0 === this.compare(t, r) && (e.selectedDt = i), c.activeDate && 0 === this.compare(i.date, c.activeDate) && (e.activeDt = i), i
        }, this.isDisabled = function(n) {
            return e.disabled || this.minDate && this.compare(n, this.minDate) < 0 || this.maxDate && this.compare(n, this.maxDate) > 0 || t.dateDisabled && e.dateDisabled({
                date: n,
                mode: e.datepickerMode
            })
        }, this.customClass = function(t) {
            return e.customClass({
                date: t,
                mode: e.datepickerMode
            })
        }, this.split = function(e, t) {
            for (var n = []; e.length > 0;) n.push(e.splice(0, t));
            return n
        }, e.select = function(t) {
            if (e.datepickerMode === c.minMode) {
                var n = f.$viewValue ? l.fromTimezone(new Date(f.$viewValue), p.timezone) : new Date(0, 0, 0, 0, 0, 0, 0);
                n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), n = l.toTimezone(n, p.timezone), f.$setViewValue(n), f.$render()
            } else c.activeDate = t, e.datepickerMode = c.modes[c.modes.indexOf(e.datepickerMode) - 1]
        }, e.move = function(e) {
            var t = c.activeDate.getFullYear() + e * (c.step.years || 0),
                n = c.activeDate.getMonth() + e * (c.step.months || 0);
            c.activeDate.setFullYear(t, n, 1), c.refreshView()
        }, e.toggleMode = function(t) {
            t = t || 1, e.datepickerMode === c.maxMode && 1 === t || e.datepickerMode === c.minMode && -1 === t || (e.datepickerMode = c.modes[c.modes.indexOf(e.datepickerMode) + t])
        }, e.keys = {
            13: "enter",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
        var h = function() {
            c.element[0].focus()
        };
        e.$on("uib:datepicker.focus", h), e.keydown = function(t) {
            var n = e.keys[t.which];
            if (n && !t.shiftKey && !t.altKey && !e.disabled)
                if (t.preventDefault(), c.shortcutPropagation || t.stopPropagation(), "enter" === n || "space" === n) {
                    if (c.isDisabled(c.activeDate)) return;
                    e.select(c.activeDate)
                } else !t.ctrlKey || "up" !== n && "down" !== n ? (c.handleKeyDown(n, t), c.refreshView()) : e.toggleMode("up" === n ? 1 : -1)
        }, e.$on("$destroy", function() {
            for (; d.length;) d.shift()()
        })
    }]).controller("UibDaypickerController", ["$scope", "$element", "dateFilter", function(e, t, n) {
        function r(e, t) {
            return 1 !== t || e % 4 !== 0 || e % 100 === 0 && e % 400 !== 0 ? a[t] : 29
        }

        function i(e) {
            var t = new Date(e);
            t.setDate(t.getDate() + 4 - (t.getDay() || 7));
            var n = t.getTime();
            return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
        }
        var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.step = {
            months: 1
        }, this.element = t, this.init = function(t) {
            angular.extend(t, this), e.showWeeks = t.showWeeks, t.refreshView()
        }, this.getDates = function(e, t) {
            for (var n, r = new Array(t), i = new Date(e), a = 0; t > a;) n = new Date(i), r[a++] = n, i.setDate(i.getDate() + 1);
            return r
        }, this._refreshView = function() {
            var t = this.activeDate.getFullYear(),
                r = this.activeDate.getMonth(),
                a = new Date(this.activeDate);
            a.setFullYear(t, r, 1);
            var o = this.startingDay - a.getDay(),
                s = o > 0 ? 7 - o : -o,
                u = new Date(a);
            s > 0 && u.setDate(-s + 1);
            for (var l = this.getDates(u, 42), c = 0; 42 > c; c++) l[c] = angular.extend(this.createDateObject(l[c], this.formatDay), {
                secondary: l[c].getMonth() !== r,
                uid: e.uniqueId + "-" + c
            });
            e.labels = new Array(7);
            for (var f = 0; 7 > f; f++) e.labels[f] = {
                abbr: n(l[f].date, this.formatDayHeader),
                full: n(l[f].date, "EEEE")
            };
            if (e.title = n(this.activeDate, this.formatDayTitle), e.rows = this.split(l, 7), e.showWeeks) {
                e.weekNumbers = [];
                for (var p = (11 - this.startingDay) % 7, d = e.rows.length, h = 0; d > h; h++) e.weekNumbers.push(i(e.rows[h][p].date))
            }
        }, this.compare = function(e, t) {
            var n = new Date(e.getFullYear(), e.getMonth(), e.getDate()),
                r = new Date(t.getFullYear(), t.getMonth(), t.getDate());
            return n.setFullYear(e.getFullYear()), r.setFullYear(t.getFullYear()), n - r
        }, this.handleKeyDown = function(e, t) {
            var n = this.activeDate.getDate();
            if ("left" === e) n -= 1;
            else if ("up" === e) n -= 7;
            else if ("right" === e) n += 1;
            else if ("down" === e) n += 7;
            else if ("pageup" === e || "pagedown" === e) {
                var i = this.activeDate.getMonth() + ("pageup" === e ? -1 : 1);
                this.activeDate.setMonth(i, 1), n = Math.min(r(this.activeDate.getFullYear(), this.activeDate.getMonth()), n)
            } else "home" === e ? n = 1 : "end" === e && (n = r(this.activeDate.getFullYear(), this.activeDate.getMonth()));
            this.activeDate.setDate(n)
        }
    }]).controller("UibMonthpickerController", ["$scope", "$element", "dateFilter", function(e, t, n) {
        this.step = {
            years: 1
        }, this.element = t, this.init = function(e) {
            angular.extend(e, this), e.refreshView()
        }, this._refreshView = function() {
            for (var t, r = new Array(12), i = this.activeDate.getFullYear(), a = 0; 12 > a; a++) t = new Date(this.activeDate), t.setFullYear(i, a, 1), r[a] = angular.extend(this.createDateObject(t, this.formatMonth), {
                uid: e.uniqueId + "-" + a
            });
            e.title = n(this.activeDate, this.formatMonthTitle), e.rows = this.split(r, 3)
        }, this.compare = function(e, t) {
            var n = new Date(e.getFullYear(), e.getMonth()),
                r = new Date(t.getFullYear(), t.getMonth());
            return n.setFullYear(e.getFullYear()), r.setFullYear(t.getFullYear()), n - r
        }, this.handleKeyDown = function(e, t) {
            var n = this.activeDate.getMonth();
            if ("left" === e) n -= 1;
            else if ("up" === e) n -= 3;
            else if ("right" === e) n += 1;
            else if ("down" === e) n += 3;
            else if ("pageup" === e || "pagedown" === e) {
                var r = this.activeDate.getFullYear() + ("pageup" === e ? -1 : 1);
                this.activeDate.setFullYear(r)
            } else "home" === e ? n = 0 : "end" === e && (n = 11);
            this.activeDate.setMonth(n)
        }
    }]).controller("UibYearpickerController", ["$scope", "$element", "dateFilter", function(e, t, n) {
        function r(e) {
            return parseInt((e - 1) / a, 10) * a + 1
        }
        var i, a;
        this.element = t, this.yearpickerInit = function() {
            i = this.yearColumns, a = this.yearRows * i, this.step = {
                years: a
            }
        }, this._refreshView = function() {
            for (var t, n = new Array(a), o = 0, s = r(this.activeDate.getFullYear()); a > o; o++) t = new Date(this.activeDate), t.setFullYear(s + o, 0, 1), n[o] = angular.extend(this.createDateObject(t, this.formatYear), {
                uid: e.uniqueId + "-" + o
            });
            e.title = [n[0].label, n[a - 1].label].join(" - "), e.rows = this.split(n, i), e.columns = i
        }, this.compare = function(e, t) {
            return e.getFullYear() - t.getFullYear()
        }, this.handleKeyDown = function(e, t) {
            var n = this.activeDate.getFullYear();
            "left" === e ? n -= 1 : "up" === e ? n -= i : "right" === e ? n += 1 : "down" === e ? n += i : "pageup" === e || "pagedown" === e ? n += ("pageup" === e ? -1 : 1) * a : "home" === e ? n = r(this.activeDate.getFullYear()) : "end" === e && (n = r(this.activeDate.getFullYear()) + a - 1), this.activeDate.setFullYear(n)
        }
    }]).directive("uibDatepicker", function() {
        return {
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/datepicker/datepicker.html"
            },
            scope: {
                datepickerMode: "=?",
                datepickerOptions: "=?",
                dateDisabled: "&",
                customClass: "&",
                shortcutPropagation: "&?"
            },
            require: ["uibDatepicker", "^ngModel"],
            controller: "UibDatepickerController",
            controllerAs: "datepicker",
            link: function(e, t, n, r) {
                var i = r[0],
                    a = r[1];
                i.init(a)
            }
        }
    }).directive("uibDaypicker", function() {
        return {
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/datepicker/day.html"
            },
            require: ["^uibDatepicker", "uibDaypicker"],
            controller: "UibDaypickerController",
            link: function(e, t, n, r) {
                var i = r[0],
                    a = r[1];
                a.init(i)
            }
        }
    }).directive("uibMonthpicker", function() {
        return {
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/datepicker/month.html"
            },
            require: ["^uibDatepicker", "uibMonthpicker"],
            controller: "UibMonthpickerController",
            link: function(e, t, n, r) {
                var i = r[0],
                    a = r[1];
                a.init(i)
            }
        }
    }).directive("uibYearpicker", function() {
        return {
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/datepicker/year.html"
            },
            require: ["^uibDatepicker", "uibYearpicker"],
            controller: "UibYearpickerController",
            link: function(e, t, n, r) {
                var i = r[0];
                angular.extend(i, r[1]), i.yearpickerInit(), i.refreshView()
            }
        }
    }).constant("uibDatepickerPopupConfig", {
        altInputFormats: [],
        appendToBody: !1,
        clearText: "Clear",
        closeOnDateSelection: !0,
        closeText: "Done",
        currentText: "Today",
        datepickerPopup: "yyyy-MM-dd",
        datepickerPopupTemplateUrl: "uib/template/datepicker/popup.html",
        datepickerTemplateUrl: "uib/template/datepicker/datepicker.html",
        html5Types: {
            date: "yyyy-MM-dd",
            "datetime-local": "yyyy-MM-ddTHH:mm:ss.sss",
            month: "yyyy-MM"
        },
        onOpenFocus: !0,
        showButtonBar: !0
    }).controller("UibDatepickerPopupController", ["$scope", "$element", "$attrs", "$compile", "$parse", "$document", "$rootScope", "$uibPosition", "dateFilter", "uibDateParser", "uibDatepickerPopupConfig", "$timeout", "uibDatepickerConfig", function(e, t, n, r, i, a, o, s, u, l, c, f, p) {
        function d(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }

        function h(t) {
            var n = l.parse(t, y, e.date);
            if (isNaN(n))
                for (var r = 0; r < O.length; r++)
                    if (n = l.parse(t, O[r], e.date), !isNaN(n)) return n;
            return n
        }

        function m(e) {
            if (angular.isNumber(e) && (e = new Date(e)), !e) return null;
            if (angular.isDate(e) && !isNaN(e)) return e;
            if (angular.isString(e)) {
                var t = h(e);
                if (!isNaN(t)) return l.toTimezone(t, T.timezone)
            }
            return D.$options && D.$options.allowInvalid ? e : void 0
        }

        function g(e, t) {
            var r = e || t;
            return n.ngRequired || r ? (angular.isNumber(r) && (r = new Date(r)), r ? angular.isDate(r) && !isNaN(r) ? !0 : angular.isString(r) ? !isNaN(h(t)) : !1 : !0) : !0
        }

        function v(n) {
            if (e.isOpen || !e.disabled) {
                var r = A[0],
                    i = t[0].contains(n.target),
                    a = void 0 !== r.contains && r.contains(n.target);
                !e.isOpen || i || a || e.$apply(function() {
                    e.isOpen = !1
                })
            }
        }

        function $(n) {
            27 === n.which && e.isOpen ? (n.preventDefault(), n.stopPropagation(), e.$apply(function() {
                e.isOpen = !1
            }), t[0].focus()) : 40 !== n.which || e.isOpen || (n.preventDefault(), n.stopPropagation(), e.$apply(function() {
                e.isOpen = !0
            }))
        }
        var y, b, w, x, C, k, S, E, D, T, A, O, M = {},
            P = !1,
            j = [];
        e.watchData = {}, this.init = function(s) {
            if (D = s, T = s.$options || p.ngModelOptions, b = angular.isDefined(n.closeOnDateSelection) ? e.$parent.$eval(n.closeOnDateSelection) : c.closeOnDateSelection, w = angular.isDefined(n.datepickerAppendToBody) ? e.$parent.$eval(n.datepickerAppendToBody) : c.appendToBody, x = angular.isDefined(n.onOpenFocus) ? e.$parent.$eval(n.onOpenFocus) : c.onOpenFocus, C = angular.isDefined(n.datepickerPopupTemplateUrl) ? n.datepickerPopupTemplateUrl : c.datepickerPopupTemplateUrl, k = angular.isDefined(n.datepickerTemplateUrl) ? n.datepickerTemplateUrl : c.datepickerTemplateUrl, O = angular.isDefined(n.altInputFormats) ? e.$parent.$eval(n.altInputFormats) : c.altInputFormats, e.showButtonBar = angular.isDefined(n.showButtonBar) ? e.$parent.$eval(n.showButtonBar) : c.showButtonBar, c.html5Types[n.type] ? (y = c.html5Types[n.type], P = !0) : (y = n.uibDatepickerPopup || c.datepickerPopup, n.$observe("uibDatepickerPopup", function(e, t) {
                    var n = e || c.datepickerPopup;
                    if (n !== y && (y = n, D.$modelValue = null, !y)) throw new Error("uibDatepickerPopup must have a date format specified.")
                })), !y) throw new Error("uibDatepickerPopup must have a date format specified.");
            if (P && n.uibDatepickerPopup) throw new Error("HTML5 date input types do not support custom formats.");
            S = angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"), e.ngModelOptions = angular.copy(T), e.ngModelOptions.timezone = null, S.attr({
                "ng-model": "date",
                "ng-model-options": "ngModelOptions",
                "ng-change": "dateSelection(date)",
                "template-url": C
            }), E = angular.element(S.children()[0]), E.attr("template-url", k), P && "month" === n.type && (E.attr("datepicker-mode", '"month"'), E.attr("min-mode", "month")), e.datepickerOptions && angular.forEach(e.datepickerOptions, function(e, t) {
                -1 === ["minDate", "maxDate", "minMode", "maxMode", "initDate", "datepickerMode"].indexOf(t) ? E.attr(d(t), e) : E.attr(d(t), "datepickerOptions." + t)
            }), angular.forEach(["minMode", "maxMode", "datepickerMode", "shortcutPropagation"], function(t) {
                if (n[t]) {
                    var r = i(n[t]),
                        a = {
                            get: function() {
                                return r(e.$parent)
                            }
                        };
                    if (E.attr(d(t), "watchData." + t), "datepickerMode" === t) {
                        var o = r.assign;
                        a.set = function(t) {
                            o(e.$parent, t)
                        }
                    }
                    Object.defineProperty(e.watchData, t, a)
                }
            }), angular.forEach(["minDate", "maxDate", "initDate"], function(t) {
                if (n[t]) {
                    var r = i(n[t]);
                    j.push(e.$parent.$watch(r, function(n) {
                        "minDate" === t || "maxDate" === t ? (null === n ? M[t] = null : angular.isDate(n) ? M[t] = l.fromTimezone(new Date(n), T.timezone) : M[t] = new Date(u(n, "medium")), e.watchData[t] = null === n ? null : M[t]) : e.watchData[t] = l.fromTimezone(new Date(n), T.timezone)
                    })), E.attr(d(t), "watchData." + t)
                }
            }), n.dateDisabled && E.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "showWeeks", "startingDay", "yearRows", "yearColumns"], function(e) {
                angular.isDefined(n[e]) && E.attr(d(e), n[e])
            }), n.customClass && E.attr("custom-class", "customClass({ date: date, mode: mode })"), P ? D.$formatters.push(function(t) {
                return e.date = l.fromTimezone(t, T.timezone), t
            }) : (D.$$parserName = "date", D.$validators.date = g, D.$parsers.unshift(m), D.$formatters.push(function(t) {
                return D.$isEmpty(t) ? (e.date = t, t) : (e.date = l.fromTimezone(t, T.timezone), angular.isNumber(e.date) && (e.date = new Date(e.date)), l.filter(e.date, y))
            })), D.$viewChangeListeners.push(function() {
                e.date = h(D.$viewValue)
            }), t.on("keydown", $), A = r(S)(e), S.remove(), w ? a.find("body").append(A) : t.after(A), e.$on("$destroy", function() {
                for (e.isOpen === !0 && (o.$$phase || e.$apply(function() {
                        e.isOpen = !1
                    })), A.remove(), t.off("keydown", $), a.off("click", v); j.length;) j.shift()()
            })
        }, e.getText = function(t) {
            return e[t + "Text"] || c[t + "Text"]
        }, e.isDisabled = function(t) {
            return "today" === t && (t = new Date), e.watchData.minDate && e.compare(t, M.minDate) < 0 || e.watchData.maxDate && e.compare(t, M.maxDate) > 0
        }, e.compare = function(e, t) {
            return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
        }, e.dateSelection = function(n) {
            angular.isDefined(n) && (e.date = n);
            var r = e.date ? l.filter(e.date, y) : null;
            t.val(r), D.$setViewValue(r), b && (e.isOpen = !1, t[0].focus())
        }, e.keydown = function(n) {
            27 === n.which && (n.stopPropagation(), e.isOpen = !1, t[0].focus())
        }, e.select = function(t) {
            if ("today" === t) {
                var n = new Date;
                angular.isDate(e.date) ? (t = new Date(e.date), t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate())) : t = new Date(n.setHours(0, 0, 0, 0))
            }
            e.dateSelection(t)
        }, e.close = function() {
            e.isOpen = !1, t[0].focus()
        }, e.disabled = angular.isDefined(n.disabled) || !1, n.ngDisabled && j.push(e.$parent.$watch(i(n.ngDisabled), function(t) {
            e.disabled = t
        })), e.$watch("isOpen", function(n) {
            n ? e.disabled ? e.isOpen = !1 : (e.position = w ? s.offset(t) : s.position(t), e.position.top = e.position.top + t.prop("offsetHeight"), f(function() {
                x && e.$broadcast("uib:datepicker.focus"), a.on("click", v)
            }, 0, !1)) : a.off("click", v)
        })
    }]).directive("uibDatepickerPopup", function() {
        return {
            require: ["ngModel", "uibDatepickerPopup"],
            controller: "UibDatepickerPopupController",
            scope: {
                datepickerOptions: "=?",
                isOpen: "=?",
                currentText: "@",
                clearText: "@",
                closeText: "@",
                dateDisabled: "&",
                customClass: "&"
            },
            link: function(e, t, n, r) {
                var i = r[0],
                    a = r[1];
                a.init(i)
            }
        }
    }).directive("uibDatepickerPopupWrap", function() {
        return {
            replace: !0,
            transclude: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/datepicker/popup.html"
            }
        }
    }), angular.module("ui.bootstrap.debounce", []).factory("$$debounce", ["$timeout", function(e) {
        return function(t, n) {
            var r;
            return function() {
                var i = this,
                    a = Array.prototype.slice.call(arguments);
                r && e.cancel(r), r = e(function() {
                    t.apply(i, a)
                }, n)
            }
        }
    }]), angular.module("ui.bootstrap.dropdown", ["ui.bootstrap.position"]).constant("uibDropdownConfig", {
        appendToOpenClass: "uib-dropdown-open",
        openClass: "open"
    }).service("uibDropdownService", ["$document", "$rootScope", function(e, t) {
        var n = null;
        this.open = function(t) {
            n || (e.on("click", r), e.on("keydown", i)), n && n !== t && (n.isOpen = !1), n = t
        }, this.close = function(t) {
            n === t && (n = null, e.off("click", r), e.off("keydown", i))
        };
        var r = function(e) {
                if (n && !(e && "disabled" === n.getAutoClose() || e && 3 === e.which)) {
                    var r = n.getToggleElement();
                    if (!(e && r && r[0].contains(e.target))) {
                        var i = n.getDropdownElement();
                        e && "outsideClick" === n.getAutoClose() && i && i[0].contains(e.target) || (n.isOpen = !1, t.$$phase || n.$apply())
                    }
                }
            },
            i = function(e) {
                27 === e.which ? (n.focusToggleElement(), r()) : n.isKeynavEnabled() && -1 !== [38, 40].indexOf(e.which) && n.isOpen && (e.preventDefault(), e.stopPropagation(), n.focusDropdownEntry(e.which))
            }
    }]).controller("UibDropdownController", ["$scope", "$element", "$attrs", "$parse", "uibDropdownConfig", "uibDropdownService", "$animate", "$uibPosition", "$document", "$compile", "$templateRequest", function(e, t, n, r, i, a, o, s, u, l, c) {
        var f, p, d = this,
            h = e.$new(),
            m = i.appendToOpenClass,
            g = i.openClass,
            v = angular.noop,
            $ = n.onToggle ? r(n.onToggle) : angular.noop,
            y = !1,
            b = null,
            w = !1,
            x = u.find("body");
        t.addClass("dropdown"), this.init = function() {
            if (n.isOpen && (p = r(n.isOpen), v = p.assign, e.$watch(p, function(e) {
                    h.isOpen = !!e
                })), angular.isDefined(n.dropdownAppendTo)) {
                var i = r(n.dropdownAppendTo)(h);
                i && (b = angular.element(i))
            }
            y = angular.isDefined(n.dropdownAppendToBody), w = angular.isDefined(n.keyboardNav), y && !b && (b = x), b && d.dropdownMenu && (b.append(d.dropdownMenu), t.on("$destroy", function() {
                d.dropdownMenu.remove()
            }))
        }, this.toggle = function(e) {
            return h.isOpen = arguments.length ? !!e : !h.isOpen
        }, this.isOpen = function() {
            return h.isOpen
        }, h.getToggleElement = function() {
            return d.toggleElement
        }, h.getAutoClose = function() {
            return n.autoClose || "always"
        }, h.getElement = function() {
            return t
        }, h.isKeynavEnabled = function() {
            return w
        }, h.focusDropdownEntry = function(e) {
            var n = d.dropdownMenu ? angular.element(d.dropdownMenu).find("a") : t.find("ul").eq(0).find("a");
            switch (e) {
                case 40:
                    angular.isNumber(d.selectedOption) ? d.selectedOption = d.selectedOption === n.length - 1 ? d.selectedOption : d.selectedOption + 1 : d.selectedOption = 0;
                    break;
                case 38:
                    angular.isNumber(d.selectedOption) ? d.selectedOption = 0 === d.selectedOption ? 0 : d.selectedOption - 1 : d.selectedOption = n.length - 1
            }
            n[d.selectedOption].focus()
        }, h.getDropdownElement = function() {
            return d.dropdownMenu
        }, h.focusToggleElement = function() {
            d.toggleElement && d.toggleElement[0].focus()
        }, h.$watch("isOpen", function(n, r) {
            if (b && d.dropdownMenu) {
                var i, u, p = s.positionElements(t, d.dropdownMenu, "bottom-left", !0);
                if (i = {
                        top: p.top + "px",
                        display: n ? "block" : "none"
                    }, u = d.dropdownMenu.hasClass("dropdown-menu-right"), u ? (i.left = "auto", i.right = window.innerWidth - (p.left + t.prop("offsetWidth")) + "px") : (i.left = p.left + "px", i.right = "auto"), !y) {
                    var w = s.offset(b);
                    i.top = p.top - w.top + "px", u ? i.right = window.innerWidth - (p.left - w.left + t.prop("offsetWidth")) + "px" : i.left = p.left - w.left + "px"
                }
                d.dropdownMenu.css(i)
            }
            var x = b ? b : t;
            if (o[n ? "addClass" : "removeClass"](x, b ? m : g).then(function() {
                    angular.isDefined(n) && n !== r && $(e, {
                        open: !!n
                    })
                }), n) d.dropdownMenuTemplateUrl && c(d.dropdownMenuTemplateUrl).then(function(e) {
                f = h.$new(), l(e.trim())(f, function(e) {
                    var t = e;
                    d.dropdownMenu.replaceWith(t), d.dropdownMenu = t
                })
            }), h.focusToggleElement(), a.open(h);
            else {
                if (d.dropdownMenuTemplateUrl) {
                    f && f.$destroy();
                    var C = angular.element('<ul class="dropdown-menu"></ul>');
                    d.dropdownMenu.replaceWith(C), d.dropdownMenu = C
                }
                a.close(h), d.selectedOption = null
            }
            angular.isFunction(v) && v(e, n)
        }), e.$on("$locationChangeSuccess", function() {
            "disabled" !== h.getAutoClose() && (h.isOpen = !1)
        })
    }]).directive("uibDropdown", function() {
        return {
            controller: "UibDropdownController",
            link: function(e, t, n, r) {
                r.init()
            }
        }
    }).directive("uibDropdownMenu", function() {
        return {
            restrict: "A",
            require: "?^uibDropdown",
            link: function(e, t, n, r) {
                if (r && !angular.isDefined(n.dropdownNested)) {
                    t.addClass("dropdown-menu");
                    var i = n.templateUrl;
                    i && (r.dropdownMenuTemplateUrl = i), r.dropdownMenu || (r.dropdownMenu = t)
                }
            }
        }
    }).directive("uibDropdownToggle", function() {
        return {
            require: "?^uibDropdown",
            link: function(e, t, n, r) {
                if (r) {
                    t.addClass("dropdown-toggle"), r.toggleElement = t;
                    var i = function(i) {
                        i.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function() {
                            r.toggle()
                        })
                    };
                    t.bind("click", i), t.attr({
                        "aria-haspopup": !0,
                        "aria-expanded": !1
                    }), e.$watch(r.isOpen, function(e) {
                        t.attr("aria-expanded", !!e)
                    }), e.$on("$destroy", function() {
                        t.unbind("click", i)
                    })
                }
            }
        }
    }), angular.module("ui.bootstrap.stackedMap", []).factory("$$stackedMap", function() {
        return {
            createNew: function() {
                var e = [];
                return {
                    add: function(t, n) {
                        e.push({
                            key: t,
                            value: n
                        })
                    },
                    get: function(t) {
                        for (var n = 0; n < e.length; n++)
                            if (t === e[n].key) return e[n]
                    },
                    keys: function() {
                        for (var t = [], n = 0; n < e.length; n++) t.push(e[n].key);
                        return t
                    },
                    top: function() {
                        return e[e.length - 1]
                    },
                    remove: function(t) {
                        for (var n = -1, r = 0; r < e.length; r++)
                            if (t === e[r].key) {
                                n = r;
                                break
                            }
                        return e.splice(n, 1)[0]
                    },
                    removeTop: function() {
                        return e.splice(e.length - 1, 1)[0]
                    },
                    length: function() {
                        return e.length
                    }
                }
            }
        }
    }), angular.module("ui.bootstrap.modal", ["ui.bootstrap.stackedMap"]).factory("$$multiMap", function() {
        return {
            createNew: function() {
                var e = {};
                return {
                    entries: function() {
                        return Object.keys(e).map(function(t) {
                            return {
                                key: t,
                                value: e[t]
                            }
                        })
                    },
                    get: function(t) {
                        return e[t]
                    },
                    hasKey: function(t) {
                        return !!e[t]
                    },
                    keys: function() {
                        return Object.keys(e)
                    },
                    put: function(t, n) {
                        e[t] || (e[t] = []), e[t].push(n)
                    },
                    remove: function(t, n) {
                        var r = e[t];
                        if (r) {
                            var i = r.indexOf(n); - 1 !== i && r.splice(i, 1), r.length || delete e[t]
                        }
                    }
                }
            }
        }
    }).provider("$uibResolve", function() {
        var e = this;
        this.resolver = null, this.setResolver = function(e) {
            this.resolver = e
        }, this.$get = ["$injector", "$q", function(t, n) {
            var r = e.resolver ? t.get(e.resolver) : null;
            return {
                resolve: function(e, i, a, o) {
                    if (r) return r.resolve(e, i, a, o);
                    var s = [];
                    return angular.forEach(e, function(e) {
                        angular.isFunction(e) || angular.isArray(e) ? s.push(n.resolve(t.invoke(e))) : angular.isString(e) ? s.push(n.resolve(t.get(e))) : s.push(n.resolve(e))
                    }), n.all(s).then(function(t) {
                        var n = {},
                            r = 0;
                        return angular.forEach(e, function(e, i) {
                            n[i] = t[r++]
                        }), n
                    })
                }
            }
        }]
    }).directive("uibModalBackdrop", ["$animateCss", "$injector", "$uibModalStack", function(e, t, n) {
        function r(t, r, i) {
            i.modalInClass && (e(r, {
                addClass: i.modalInClass
            }).start(), t.$on(n.NOW_CLOSING_EVENT, function(n, a) {
                var o = a();
                t.modalOptions.animation ? e(r, {
                    removeClass: i.modalInClass
                }).start().then(o) : o()
            }))
        }
        return {
            replace: !0,
            templateUrl: "uib/template/modal/backdrop.html",
            compile: function(e, t) {
                return e.addClass(t.backdropClass), r
            }
        }
    }]).directive("uibModalWindow", ["$uibModalStack", "$q", "$animate", "$animateCss", "$document", function(e, t, n, r, i) {
        return {
            scope: {
                index: "@"
            },
            replace: !0,
            transclude: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/modal/window.html"
            },
            link: function(a, o, s) {
                o.addClass(s.windowClass || ""), o.addClass(s.windowTopClass || ""), a.size = s.size, a.close = function(t) {
                    var n = e.getTop();
                    n && n.value.backdrop && "static" !== n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
                }, o.on("click", a.close), a.$isRendered = !0;
                var u = t.defer();
                s.$observe("modalRender", function(e) {
                    "true" === e && u.resolve()
                }), u.promise.then(function() {
                    var u = null;
                    s.modalInClass && (u = r(o, {
                        addClass: s.modalInClass
                    }).start(), a.$on(e.NOW_CLOSING_EVENT, function(e, t) {
                        var i = t();
                        r ? r(o, {
                            removeClass: s.modalInClass
                        }).start().then(i) : n.removeClass(o, s.modalInClass).then(i)
                    })), t.when(u).then(function() {
                        if (!i[0].activeElement || !o[0].contains(i[0].activeElement)) {
                            var e = o[0].querySelector("[autofocus]");
                            e ? e.focus() : o[0].focus()
                        }
                    });
                    var l = e.getTop();
                    l && e.modalRendered(l.key)
                })
            }
        }
    }]).directive("uibModalAnimationClass", function() {
        return {
            compile: function(e, t) {
                t.modalAnimation && e.addClass(t.uibModalAnimationClass)
            }
        }
    }).directive("uibModalTransclude", function() {
        return {
            link: function(e, t, n, r, i) {
                i(e.$parent, function(e) {
                    t.empty(), t.append(e)
                })
            }
        }
    }).factory("$uibModalStack", ["$animate", "$animateCss", "$document", "$compile", "$rootScope", "$q", "$$multiMap", "$$stackedMap", function(e, t, n, r, i, a, o, s) {
        function u() {
            for (var e = -1, t = y.keys(), n = 0; n < t.length; n++) y.get(t[n]).value.backdrop && (e = n);
            return e
        }

        function l(e, t) {
            var n = y.get(e).value,
                r = n.appendTo;
            y.remove(e), p(n.modalDomEl, n.modalScope, function() {
                var t = n.openedClass || $;
                b.remove(t, e), r.toggleClass(t, b.hasKey(t)), c(!0)
            }, n.closedDeferred), f(), t && t.focus ? t.focus() : r.focus && r.focus()
        }

        function c(e) {
            var t;
            y.length() > 0 && (t = y.top().value, t.modalDomEl.toggleClass(t.windowTopClass || "", e))
        }

        function f() {
            if (m && -1 === u()) {
                var e = g;
                p(m, g, function() {
                    e = null
                }), m = void 0, g = void 0
            }
        }

        function p(e, n, r, i) {
            function o() {
                o.done || (o.done = !0, t(e, {
                    event: "leave"
                }).start().then(function() {
                    e.remove(), i && i.resolve()
                }), n.$destroy(), r && r())
            }
            var s, u = null,
                l = function() {
                    return s || (s = a.defer(), u = s.promise),
                        function() {
                            s.resolve()
                        }
                };
            return n.$broadcast(w.NOW_CLOSING_EVENT, l), a.when(u).then(o)
        }

        function d(e) {
            if (e.isDefaultPrevented()) return e;
            var t = y.top();
            if (t) switch (e.which) {
                case 27:
                    t.value.keyboard && (e.preventDefault(), i.$apply(function() {
                        w.dismiss(t.key, "escape key press")
                    }));
                    break;
                case 9:
                    w.loadFocusElementList(t);
                    var n = !1;
                    e.shiftKey ? (w.isFocusInFirstItem(e) || w.isModalFocused(e, t)) && (n = w.focusLastFocusableElement()) : w.isFocusInLastItem(e) && (n = w.focusFirstFocusableElement()), n && (e.preventDefault(), e.stopPropagation())
            }
        }

        function h(e, t, n) {
            return !e.value.modalScope.$broadcast("modal.closing", t, n).defaultPrevented
        }
        var m, g, v, $ = "modal-open",
            y = s.createNew(),
            b = o.createNew(),
            w = {
                NOW_CLOSING_EVENT: "modal.stack.now-closing"
            },
            x = 0,
            C = "a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";
        return i.$watch(u, function(e) {
            g && (g.index = e)
        }), n.on("keydown", d), i.$on("$destroy", function() {
            n.off("keydown", d)
        }), w.open = function(t, a) {
            var o = n[0].activeElement,
                s = a.openedClass || $;
            c(!1), y.add(t, {
                deferred: a.deferred,
                renderDeferred: a.renderDeferred,
                closedDeferred: a.closedDeferred,
                modalScope: a.scope,
                backdrop: a.backdrop,
                keyboard: a.keyboard,
                openedClass: a.openedClass,
                windowTopClass: a.windowTopClass,
                animation: a.animation,
                appendTo: a.appendTo
            }), b.put(s, t);
            var l = a.appendTo,
                f = u();
            if (!l.length) throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");
            f >= 0 && !m && (g = i.$new(!0), g.modalOptions = a, g.index = f, m = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'), m.attr("backdrop-class", a.backdropClass), a.animation && m.attr("modal-animation", "true"), r(m)(g), e.enter(m, l));
            var p = angular.element('<div uib-modal-window="modal-window"></div>');
            p.attr({
                "template-url": a.windowTemplateUrl,
                "window-class": a.windowClass,
                "window-top-class": a.windowTopClass,
                size: a.size,
                index: y.length() - 1,
                animate: "animate"
            }).html(a.content), a.animation && p.attr("modal-animation", "true"), e.enter(r(p)(a.scope), l).then(function() {
                e.addClass(l, s)
            }), y.top().value.modalDomEl = p, y.top().value.modalOpener = o, w.clearFocusListCache()
        }, w.close = function(e, t) {
            var n = y.get(e);
            return n && h(n, t, !0) ? (n.value.modalScope.$$uibDestructionScheduled = !0, n.value.deferred.resolve(t), l(e, n.value.modalOpener), !0) : !n
        }, w.dismiss = function(e, t) {
            var n = y.get(e);
            return n && h(n, t, !1) ? (n.value.modalScope.$$uibDestructionScheduled = !0, n.value.deferred.reject(t), l(e, n.value.modalOpener), !0) : !n
        }, w.dismissAll = function(e) {
            for (var t = this.getTop(); t && this.dismiss(t.key, e);) t = this.getTop()
        }, w.getTop = function() {
            return y.top()
        }, w.modalRendered = function(e) {
            var t = y.get(e);
            t && t.value.renderDeferred.resolve()
        }, w.focusFirstFocusableElement = function() {
            return v.length > 0 ? (v[0].focus(), !0) : !1
        }, w.focusLastFocusableElement = function() {
            return v.length > 0 ? (v[v.length - 1].focus(), !0) : !1
        }, w.isModalFocused = function(e, t) {
            if (e && t) {
                var n = t.value.modalDomEl;
                if (n && n.length) return (e.target || e.srcElement) === n[0]
            }
            return !1
        }, w.isFocusInFirstItem = function(e) {
            return v.length > 0 ? (e.target || e.srcElement) === v[0] : !1
        }, w.isFocusInLastItem = function(e) {
            return v.length > 0 ? (e.target || e.srcElement) === v[v.length - 1] : !1
        }, w.clearFocusListCache = function() {
            v = [], x = 0
        }, w.loadFocusElementList = function(e) {
            if ((void 0 === v || !v.length) && e) {
                var t = e.value.modalDomEl;
                t && t.length && (v = t[0].querySelectorAll(C))
            }
        }, w
    }]).provider("$uibModal", function() {
        var e = {
            options: {
                animation: !0,
                backdrop: !0,
                keyboard: !0
            },
            $get: ["$rootScope", "$q", "$document", "$templateRequest", "$controller", "$uibResolve", "$uibModalStack", function(t, n, r, i, a, o, s) {
                function u(e) {
                    return e.template ? n.when(e.template) : i(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl)
                }
                var l = {},
                    c = null;
                return l.getPromiseChain = function() {
                    return c
                }, l.open = function(i) {
                    function l() {
                        return v
                    }
                    var f = n.defer(),
                        p = n.defer(),
                        d = n.defer(),
                        h = n.defer(),
                        m = {
                            result: f.promise,
                            opened: p.promise,
                            closed: d.promise,
                            rendered: h.promise,
                            close: function(e) {
                                return s.close(m, e)
                            },
                            dismiss: function(e) {
                                return s.dismiss(m, e)
                            }
                        };
                    if (i = angular.extend({}, e.options, i), i.resolve = i.resolve || {}, i.appendTo = i.appendTo || r.find("body").eq(0), !i.template && !i.templateUrl) throw new Error("One of template or templateUrl options is required.");
                    var g, v = n.all([u(i), o.resolve(i.resolve, {}, null, null)]);
                    return g = c = n.all([c]).then(l, l).then(function(e) {
                        var n = i.scope || t,
                            r = n.$new();
                        r.$close = m.close, r.$dismiss = m.dismiss, r.$on("$destroy", function() {
                            r.$$uibDestructionScheduled || r.$dismiss("$uibUnscheduledDestruction")
                        });
                        var o, u = {};
                        i.controller && (u.$scope = r, u.$uibModalInstance = m, angular.forEach(e[1], function(e, t) {
                            u[t] = e
                        }), o = a(i.controller, u), i.controllerAs && (i.bindToController && (o.$close = r.$close, o.$dismiss = r.$dismiss, angular.extend(o, n)), r[i.controllerAs] = o)), s.open(m, {
                            scope: r,
                            deferred: f,
                            renderDeferred: h,
                            closedDeferred: d,
                            content: e[0],
                            animation: i.animation,
                            backdrop: i.backdrop,
                            keyboard: i.keyboard,
                            backdropClass: i.backdropClass,
                            windowTopClass: i.windowTopClass,
                            windowClass: i.windowClass,
                            windowTemplateUrl: i.windowTemplateUrl,
                            size: i.size,
                            openedClass: i.openedClass,
                            appendTo: i.appendTo
                        }), p.resolve(!0)
                    }, function(e) {
                        p.reject(e), f.reject(e)
                    })["finally"](function() {
                        c === g && (c = null)
                    }), m
                }, l
            }]
        };
        return e
    }), angular.module("ui.bootstrap.paging", []).factory("uibPaging", ["$parse", function(e) {
        return {
            create: function(t, n, r) {
                t.setNumPages = r.numPages ? e(r.numPages).assign : angular.noop, t.ngModelCtrl = {
                    $setViewValue: angular.noop
                }, t._watchers = [], t.init = function(i, a) {
                    t.ngModelCtrl = i, t.config = a, i.$render = function() {
                        t.render()
                    }, r.itemsPerPage ? t._watchers.push(n.$parent.$watch(e(r.itemsPerPage), function(e) {
                        t.itemsPerPage = parseInt(e, 10), n.totalPages = t.calculateTotalPages(), t.updatePage()
                    })) : t.itemsPerPage = a.itemsPerPage, n.$watch("totalItems", function(e, r) {
                        (angular.isDefined(e) || e !== r) && (n.totalPages = t.calculateTotalPages(), t.updatePage())
                    })
                }, t.calculateTotalPages = function() {
                    var e = t.itemsPerPage < 1 ? 1 : Math.ceil(n.totalItems / t.itemsPerPage);
                    return Math.max(e || 0, 1)
                }, t.render = function() {
                    n.page = parseInt(t.ngModelCtrl.$viewValue, 10) || 1
                }, n.selectPage = function(e, r) {
                    r && r.preventDefault();
                    var i = !n.ngDisabled || !r;
                    i && n.page !== e && e > 0 && e <= n.totalPages && (r && r.target && r.target.blur(), t.ngModelCtrl.$setViewValue(e), t.ngModelCtrl.$render())
                }, n.getText = function(e) {
                    return n[e + "Text"] || t.config[e + "Text"]
                }, n.noPrevious = function() {
                    return 1 === n.page
                }, n.noNext = function() {
                    return n.page === n.totalPages
                }, t.updatePage = function() {
                    t.setNumPages(n.$parent, n.totalPages), n.page > n.totalPages ? n.selectPage(n.totalPages) : t.ngModelCtrl.$render()
                }, n.$on("$destroy", function() {
                    for (; t._watchers.length;) t._watchers.shift()()
                })
            }
        }
    }]), angular.module("ui.bootstrap.pager", ["ui.bootstrap.paging"]).controller("UibPagerController", ["$scope", "$attrs", "uibPaging", "uibPagerConfig", function(e, t, n, r) {
        e.align = angular.isDefined(t.align) ? e.$parent.$eval(t.align) : r.align, n.create(this, e, t)
    }]).constant("uibPagerConfig", {
        itemsPerPage: 10,
        previousText: "« Previous",
        nextText: "Next »",
        align: !0
    }).directive("uibPager", ["uibPagerConfig", function(e) {
        return {
            scope: {
                totalItems: "=",
                previousText: "@",
                nextText: "@",
                ngDisabled: "="
            },
            require: ["uibPager", "?ngModel"],
            controller: "UibPagerController",
            controllerAs: "pager",
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/pager/pager.html"
            },
            replace: !0,
            link: function(t, n, r, i) {
                var a = i[0],
                    o = i[1];
                o && a.init(o, e)
            }
        }
    }]), angular.module("ui.bootstrap.pagination", ["ui.bootstrap.paging"]).controller("UibPaginationController", ["$scope", "$attrs", "$parse", "uibPaging", "uibPaginationConfig", function(e, t, n, r, i) {
        function a(e, t, n) {
            return {
                number: e,
                text: t,
                active: n
            }
        }

        function o(e, t) {
            var n = [],
                r = 1,
                i = t,
                o = angular.isDefined(u) && t > u;
            o && (l ? (r = Math.max(e - Math.floor(u / 2), 1), i = r + u - 1, i > t && (i = t, r = i - u + 1)) : (r = (Math.ceil(e / u) - 1) * u + 1, i = Math.min(r + u - 1, t)));
            for (var s = r; i >= s; s++) {
                var p = a(s, s, s === e);
                n.push(p)
            }
            if (o && u > 0 && (!l || c || f)) {
                if (r > 1) {
                    if (!f || r > 3) {
                        var d = a(r - 1, "...", !1);
                        n.unshift(d)
                    }
                    if (f) {
                        if (3 === r) {
                            var h = a(2, "2", !1);
                            n.unshift(h)
                        }
                        var m = a(1, "1", !1);
                        n.unshift(m)
                    }
                }
                if (t > i) {
                    if (!f || t - 2 > i) {
                        var g = a(i + 1, "...", !1);
                        n.push(g)
                    }
                    if (f) {
                        if (i === t - 2) {
                            var v = a(t - 1, t - 1, !1);
                            n.push(v)
                        }
                        var $ = a(t, t, !1);
                        n.push($)
                    }
                }
            }
            return n
        }
        var s = this,
            u = angular.isDefined(t.maxSize) ? e.$parent.$eval(t.maxSize) : i.maxSize,
            l = angular.isDefined(t.rotate) ? e.$parent.$eval(t.rotate) : i.rotate,
            c = angular.isDefined(t.forceEllipses) ? e.$parent.$eval(t.forceEllipses) : i.forceEllipses,
            f = angular.isDefined(t.boundaryLinkNumbers) ? e.$parent.$eval(t.boundaryLinkNumbers) : i.boundaryLinkNumbers;
        e.boundaryLinks = angular.isDefined(t.boundaryLinks) ? e.$parent.$eval(t.boundaryLinks) : i.boundaryLinks, e.directionLinks = angular.isDefined(t.directionLinks) ? e.$parent.$eval(t.directionLinks) : i.directionLinks, r.create(this, e, t), t.maxSize && s._watchers.push(e.$parent.$watch(n(t.maxSize), function(e) {
            u = parseInt(e, 10), s.render()
        }));
        var p = this.render;
        this.render = function() {
            p(), e.page > 0 && e.page <= e.totalPages && (e.pages = o(e.page, e.totalPages))
        }
    }]).constant("uibPaginationConfig", {
        itemsPerPage: 10,
        boundaryLinks: !1,
        boundaryLinkNumbers: !1,
        directionLinks: !0,
        firstText: "First",
        previousText: "Previous",
        nextText: "Next",
        lastText: "Last",
        rotate: !0,
        forceEllipses: !1
    }).directive("uibPagination", ["$parse", "uibPaginationConfig", function(e, t) {
        return {
            scope: {
                totalItems: "=",
                firstText: "@",
                previousText: "@",
                nextText: "@",
                lastText: "@",
                ngDisabled: "="
            },
            require: ["uibPagination", "?ngModel"],
            controller: "UibPaginationController",
            controllerAs: "pagination",
            templateUrl: function(e, t) {
                return t.templateUrl || "uib/template/pagination/pagination.html"
            },
            replace: !0,
            link: function(e, n, r, i) {
                var a = i[0],
                    o = i[1];
                o && a.init(o, t)
            }
        }
    }]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.stackedMap"]).provider("$uibTooltip", function() {
        function e(e) {
            var t = /[A-Z]/g,
                n = "-";
            return e.replace(t, function(e, t) {
                return (t ? n : "") + e.toLowerCase()
            })
        }
        var t = {
                placement: "top",
                placementClassPrefix: "",
                animation: !0,
                popupDelay: 0,
                popupCloseDelay: 0,
                useContentExp: !1
            },
            n = {
                mouseenter: "mouseleave",
                click: "click",
                outsideClick: "outsideClick",
                focus: "blur",
                none: ""
            },
            r = {};
        this.options = function(e) {
            angular.extend(r, e)
        }, this.setTriggers = function(e) {
            angular.extend(n, e)
        }, this.$get = ["$window", "$compile", "$timeout", "$document", "$uibPosition", "$interpolate", "$rootScope", "$parse", "$$stackedMap", function(i, a, o, s, u, l, c, f, p) {
            function d(e) {
                if (27 === e.which) {
                    var t = h.top();
                    t && (t.value.close(), h.removeTop(), t = null)
                }
            }
            var h = p.createNew();
            return s.on("keypress", d), c.$on("$destroy", function() {
                    s.off("keypress", d)
                }),
                function(i, c, p, d) {
                    function m(e) {
                        var t = (e || d.trigger || p).split(" "),
                            r = t.map(function(e) {
                                return n[e] || e
                            });
                        return {
                            show: t,
                            hide: r
                        }
                    }
                    d = angular.extend({}, t, r, d);
                    var g = e(i),
                        v = l.startSymbol(),
                        $ = l.endSymbol(),
                        y = "<div " + g + '-popup title="' + v + "title" + $ + '" ' + (d.useContentExp ? 'content-exp="contentExp()" ' : 'content="' + v + "content" + $ + '" ') + 'placement="' + v + "placement" + $ + '" popup-class="' + v + "popupClass" + $ + '" animation="animation" is-open="isOpen"origin-scope="origScope" style="visibility: hidden; display: block; top: -9999px; left: -9999px;"></div>';
                    return {
                        compile: function(e, t) {
                            var n = a(y);
                            return function(e, t, r, a) {
                                function l() {
                                    q.isOpen ? g() : p()
                                }

                                function p() {
                                    (!F || e.$eval(r[c + "Enable"])) && (b(), C(), q.popupDelay ? P || (P = o(v, q.popupDelay, !1)) : v())
                                }

                                function g() {
                                    $(), q.popupCloseDelay ? j || (j = o(y, q.popupCloseDelay, !1)) : y()
                                }

                                function v() {
                                    return $(), b(), q.content ? (w(), void q.$evalAsync(function() {
                                        q.isOpen = !0, k(!0), _()
                                    })) : angular.noop
                                }

                                function $() {
                                    P && (o.cancel(P), P = null), N && (o.cancel(N), N = null)
                                }

                                function y() {
                                    q && q.$evalAsync(function() {
                                        q && (q.isOpen = !1, k(!1), q.animation ? M || (M = o(x, 150, !1)) : x())
                                    })
                                }

                                function b() {
                                    j && (o.cancel(j), j = null), M && (o.cancel(M), M = null)
                                }

                                function w() {
                                    A || (O = q.$new(), A = n(O, function(e) {
                                        L ? s.find("body").append(e) : t.after(e)
                                    }), S())
                                }

                                function x() {
                                    $(), b(), E(), A && (A.remove(), A = null), O && (O.$destroy(), O = null)
                                }

                                function C() {
                                    q.title = r[c + "Title"], U ? q.content = U(e) : q.content = r[i], q.popupClass = r[c + "Class"], q.placement = angular.isDefined(r[c + "Placement"]) ? r[c + "Placement"] : d.placement;
                                    var t = parseInt(r[c + "PopupDelay"], 10),
                                        n = parseInt(r[c + "PopupCloseDelay"], 10);
                                    q.popupDelay = isNaN(t) ? d.popupDelay : t, q.popupCloseDelay = isNaN(n) ? d.popupCloseDelay : n
                                }

                                function k(t) {
                                    R && angular.isFunction(R.assign) && R.assign(e, t)
                                }

                                function S() {
                                    H.length = 0, U ? (H.push(e.$watch(U, function(e) {
                                        q.content = e, !e && q.isOpen && y()
                                    })), H.push(O.$watch(function() {
                                        V || (V = !0, O.$$postDigest(function() {
                                            V = !1, q && q.isOpen && _()
                                        }))
                                    }))) : H.push(r.$observe(i, function(e) {
                                        q.content = e, !e && q.isOpen ? y() : _()
                                    })), H.push(r.$observe(c + "Title", function(e) {
                                        q.title = e, q.isOpen && _()
                                    })), H.push(r.$observe(c + "Placement", function(e) {
                                        q.placement = e ? e : d.placement, q.isOpen && _()
                                    }))
                                }

                                function E() {
                                    H.length && (angular.forEach(H, function(e) {
                                        e()
                                    }), H.length = 0)
                                }

                                function D(e) {
                                    q && q.isOpen && A && (t[0].contains(e.target) || A[0].contains(e.target) || g())
                                }

                                function T() {
                                    var e = r[c + "Trigger"];
                                    B(), I = m(e), "none" !== I.show && I.show.forEach(function(e, n) {
                                        "outsideClick" === e ? (t.on("click", l), s.on("click", D)) : e === I.hide[n] ? t.on(e, l) : e && (t.on(e, p), t.on(I.hide[n], g)), t.on("keypress", function(e) {
                                            27 === e.which && g()
                                        })
                                    })
                                }
                                var A, O, M, P, j, N, L = angular.isDefined(d.appendToBody) ? d.appendToBody : !1,
                                    I = m(void 0),
                                    F = angular.isDefined(r[c + "Enable"]),
                                    q = e.$new(!0),
                                    V = !1,
                                    R = angular.isDefined(r[c + "IsOpen"]) ? f(r[c + "IsOpen"]) : !1,
                                    U = d.useContentExp ? f(r[i]) : !1,
                                    H = [],
                                    _ = function() {
                                        A && A.html() && (N || (N = o(function() {
                                            A.css({
                                                top: 0,
                                                left: 0
                                            });
                                            var e = u.positionElements(t, A, q.placement, L);
                                            A.css({
                                                top: e.top + "px",
                                                left: e.left + "px",
                                                visibility: "visible"
                                            }), d.placementClassPrefix && A.removeClass("top bottom left right"), A.removeClass(d.placementClassPrefix + "top " + d.placementClassPrefix + "top-left " + d.placementClassPrefix + "top-right " + d.placementClassPrefix + "bottom " + d.placementClassPrefix + "bottom-left " + d.placementClassPrefix + "bottom-right " + d.placementClassPrefix + "left " + d.placementClassPrefix + "left-top " + d.placementClassPrefix + "left-bottom " + d.placementClassPrefix + "right " + d.placementClassPrefix + "right-top " + d.placementClassPrefix + "right-bottom");
                                            var n = e.placement.split("-");
                                            A.addClass(n[0] + " " + d.placementClassPrefix + e.placement), u.positionArrow(A, e.placement), N = null
                                        }, 0, !1)))
                                    };
                                q.origScope = e, q.isOpen = !1, h.add(q, {
                                    close: y
                                }), q.contentExp = function() {
                                    return q.content
                                }, r.$observe("disabled", function(e) {
                                    e && $(), e && q.isOpen && y()
                                }), R && e.$watch(R, function(e) {
                                    q && !e === q.isOpen && l()
                                });
                                var B = function() {
                                    I.show.forEach(function(e) {
                                        "outsideClick" === e ? t.off("click", l) : (t.off(e, p), t.off(e, l))
                                    }), I.hide.forEach(function(e) {
                                        "outsideClick" === e ? s.off("click", D) : t.off(e, g)
                                    })
                                };
                                T();
                                var z = e.$eval(r[c + "Animation"]);
                                q.animation = angular.isDefined(z) ? !!z : d.animation;
                                var W, Y = c + "AppendToBody";
                                W = Y in r && void 0 === r[Y] ? !0 : e.$eval(r[Y]), L = angular.isDefined(W) ? W : L, e.$on("$destroy", function() {
                                    B(), x(), h.remove(q), q = null
                                })
                            }
                        }
                    }
                }
        }]
    }).directive("uibTooltipTemplateTransclude", ["$animate", "$sce", "$compile", "$templateRequest", function(e, t, n, r) {
        return {
            link: function(i, a, o) {
                var s, u, l, c = i.$eval(o.tooltipTemplateTranscludeScope),
                    f = 0,
                    p = function() {
                        u && (u.remove(), u = null), s && (s.$destroy(), s = null), l && (e.leave(l).then(function() {
                            u = null
                        }), u = l, l = null)
                    };
                i.$watch(t.parseAsResourceUrl(o.uibTooltipTemplateTransclude), function(t) {
                    var o = ++f;
                    t ? (r(t, !0).then(function(r) {
                        if (o === f) {
                            var i = c.$new(),
                                u = r,
                                d = n(u)(i, function(t) {
                                    p(), e.enter(t, a)
                                });
                            s = i, l = d, s.$emit("$includeContentLoaded", t)
                        }
                    }, function() {
                        o === f && (p(), i.$emit("$includeContentError", t))
                    }), i.$emit("$includeContentRequested", t)) : p()
                }), i.$on("$destroy", p)
            }
        }
    }]).directive("uibTooltipClasses", ["$uibPosition", function(e) {
        return {
            restrict: "A",
            link: function(t, n, r) {
                if (t.placement) {
                    var i = e.parsePlacement(t.placement);
                    n.addClass(i[0])
                } else n.addClass("top");
                t.popupClass && n.addClass(t.popupClass), t.animation() && n.addClass(r.tooltipAnimationClass)
            }
        }
    }]).directive("uibTooltipPopup", function() {
        return {
            replace: !0,
            scope: {
                content: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "uib/template/tooltip/tooltip-popup.html"
        }
    }).directive("uibTooltip", ["$uibTooltip", function(e) {
        return e("uibTooltip", "tooltip", "mouseenter")
    }]).directive("uibTooltipTemplatePopup", function() {
        return {
            replace: !0,
            scope: {
                contentExp: "&",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&",
                originScope: "&"
            },
            templateUrl: "uib/template/tooltip/tooltip-template-popup.html"
        }
    }).directive("uibTooltipTemplate", ["$uibTooltip", function(e) {
        return e("uibTooltipTemplate", "tooltip", "mouseenter", {
            useContentExp: !0
        })
    }]).directive("uibTooltipHtmlPopup", function() {
        return {
            replace: !0,
            scope: {
                contentExp: "&",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "uib/template/tooltip/tooltip-html-popup.html"
        }
    }).directive("uibTooltipHtml", ["$uibTooltip", function(e) {
        return e("uibTooltipHtml", "tooltip", "mouseenter", {
            useContentExp: !0
        })
    }]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup", function() {
        return {
            replace: !0,
            scope: {
                title: "@",
                contentExp: "&",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&",
                originScope: "&"
            },
            templateUrl: "uib/template/popover/popover-template.html"
        }
    }).directive("uibPopoverTemplate", ["$uibTooltip", function(e) {
        return e("uibPopoverTemplate", "popover", "click", {
            useContentExp: !0
        })
    }]).directive("uibPopoverHtmlPopup", function() {
        return {
            replace: !0,
            scope: {
                contentExp: "&",
                title: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "uib/template/popover/popover-html.html"
        }
    }).directive("uibPopoverHtml", ["$uibTooltip", function(e) {
        return e("uibPopoverHtml", "popover", "click", {
            useContentExp: !0
        })
    }]).directive("uibPopoverPopup", function() {
        return {
            replace: !0,
            scope: {
                title: "@",
                content: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "uib/template/popover/popover.html"
        }
    }).directive("uibPopover", ["$uibTooltip", function(e) {
        return e("uibPopover", "popover", "click")
    }]), angular.module("ui.bootstrap.progressbar", []).constant("uibProgressConfig", {
        animate: !0,
        max: 100
    }).controller("UibProgressController", ["$scope", "$attrs", "uibProgressConfig", function(e, t, n) {
        var r = this,
            i = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
        this.bars = [], e.max = angular.isDefined(e.max) ? e.max : n.max, this.addBar = function(t, n, a) {
            i || n.css({
                transition: "none"
            }), this.bars.push(t), t.max = e.max, t.title = a && angular.isDefined(a.title) ? a.title : "progressbar", t.$watch("value", function(e) {
                t.recalculatePercentage()
            }), t.recalculatePercentage = function() {
                var e = r.bars.reduce(function(e, t) {
                    return t.percent = +(100 * t.value / t.max).toFixed(2), e + t.percent
                }, 0);
                e > 100 && (t.percent -= e - 100)
            }, t.$on("$destroy", function() {
                n = null, r.removeBar(t)
            })
        }, this.removeBar = function(e) {
            this.bars.splice(this.bars.indexOf(e), 1), this.bars.forEach(function(e) {
                e.recalculatePercentage()
            })
        }, e.$watch("max", function(t) {
            r.bars.forEach(function(t) {
                t.max = e.max, t.recalculatePercentage()
            })
        })
    }]).directive("uibProgress", function() {
        return {
            replace: !0,
            transclude: !0,
            controller: "UibProgressController",
            require: "uibProgress",
            scope: {
                max: "=?"
            },
            templateUrl: "uib/template/progressbar/progress.html"
        }
    }).directive("uibBar", function() {
        return {
            replace: !0,
            transclude: !0,
            require: "^uibProgress",
            scope: {
                value: "=",
                type: "@"
            },
            templateUrl: "uib/template/progressbar/bar.html",
            link: function(e, t, n, r) {
                r.addBar(e, t, n)
            }
        }
    }).directive("uibProgressbar", function() {
        return {
            replace: !0,
            transclude: !0,
            controller: "UibProgressController",
            scope: {
                value: "=",
                max: "=?",
                type: "@"
            },
            templateUrl: "uib/template/progressbar/progressbar.html",
            link: function(e, t, n, r) {
                r.addBar(e, angular.element(t.children()[0]), {
                    title: n.title
                })
            }
        }
    }), angular.module("ui.bootstrap.rating", []).constant("uibRatingConfig", {
        max: 5,
        stateOn: null,
        stateOff: null,
        titles: ["one", "two", "three", "four", "five"]
    }).controller("UibRatingController", ["$scope", "$attrs", "uibRatingConfig", function(e, t, n) {
        var r = {
            $setViewValue: angular.noop
        };
        this.init = function(i) {
            r = i, r.$render = this.render, r.$formatters.push(function(e) {
                return angular.isNumber(e) && e << 0 !== e && (e = Math.round(e)), e
            }), this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : n.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : n.stateOff;
            var a = angular.isDefined(t.titles) ? e.$parent.$eval(t.titles) : n.titles;
            this.titles = angular.isArray(a) && a.length > 0 ? a : n.titles;
            var o = angular.isDefined(t.ratingStates) ? e.$parent.$eval(t.ratingStates) : new Array(angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max);
            e.range = this.buildTemplateObjects(o)
        }, this.buildTemplateObjects = function(e) {
            for (var t = 0, n = e.length; n > t; t++) e[t] = angular.extend({
                index: t
            }, {
                stateOn: this.stateOn,
                stateOff: this.stateOff,
                title: this.getTitle(t)
            }, e[t]);
            return e
        }, this.getTitle = function(e) {
            return e >= this.titles.length ? e + 1 : this.titles[e]
        }, e.rate = function(t) {
            !e.readonly && t >= 0 && t <= e.range.length && (r.$setViewValue(r.$viewValue === t ? 0 : t), r.$render())
        }, e.enter = function(t) {
            e.readonly || (e.value = t), e.onHover({
                value: t
            })
        }, e.reset = function() {
            e.value = r.$viewValue, e.onLeave()
        }, e.onKeydown = function(t) {
            /(37|38|39|40)/.test(t.which) && (t.preventDefault(), t.stopPropagation(), e.rate(e.value + (38 === t.which || 39 === t.which ? 1 : -1)))
        }, this.render = function() {
            e.value = r.$viewValue
        }
    }]).directive("uibRating", function() {
        return {
            require: ["uibRating", "ngModel"],
            scope: {
                readonly: "=?",
                onHover: "&",
                onLeave: "&"
            },
            controller: "UibRatingController",
            templateUrl: "uib/template/rating/rating.html",
            replace: !0,
            link: function(e, t, n, r) {
                var i = r[0],
                    a = r[1];
                i.init(a)
            }
        }
    }), angular.module("ui.bootstrap.tabs", []).controller("UibTabsetController", ["$scope", function(e) {
        var t = this,
            n = t.tabs = e.tabs = [];
        t.select = function(e) {
            angular.forEach(n, function(t) {
                t.active && t !== e && (t.active = !1, t.onDeselect(), e.selectCalled = !1)
            }), e.active = !0, e.selectCalled || (e.onSelect(), e.selectCalled = !0)
        }, t.addTab = function(e) {
            n.push(e), 1 === n.length && e.active !== !1 ? e.active = !0 : e.active ? t.select(e) : e.active = !1
        }, t.removeTab = function(e) {
            var i = n.indexOf(e);
            if (e.active && n.length > 1 && !r) {
                var a = i === n.length - 1 ? i - 1 : i + 1;
                t.select(n[a])
            }
            n.splice(i, 1)
        };
        var r;
        e.$on("$destroy", function() {
            r = !0
        })
    }]).directive("uibTabset", function() {
        return {
            transclude: !0,
            replace: !0,
            scope: {
                type: "@"
            },
            controller: "UibTabsetController",
            templateUrl: "uib/template/tabs/tabset.html",
            link: function(e, t, n) {
                e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1, e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1
            }
        }
    }).directive("uibTab", ["$parse", function(e) {
        return {
            require: "^uibTabset",
            replace: !0,
            templateUrl: "uib/template/tabs/tab.html",
            transclude: !0,
            scope: {
                active: "=?",
                heading: "@",
                onSelect: "&select",
                onDeselect: "&deselect"
            },
            controller: function() {},
            controllerAs: "tab",
            link: function(t, n, r, i, a) {
                t.$watch("active", function(e) {
                    e && i.select(t)
                }), t.disabled = !1, r.disable && t.$parent.$watch(e(r.disable), function(e) {
                    t.disabled = !!e
                }), t.select = function() {
                    t.disabled || (t.active = !0)
                }, i.addTab(t), t.$on("$destroy", function() {
                    i.removeTab(t)
                }), t.$transcludeFn = a
            }
        }
    }]).directive("uibTabHeadingTransclude", function() {
        return {
            restrict: "A",
            require: "^uibTab",
            link: function(e, t) {
                e.$watch("headingElement", function(e) {
                    e && (t.html(""), t.append(e))
                })
            }
        }
    }).directive("uibTabContentTransclude", function() {
        function e(e) {
            return e.tagName && (e.hasAttribute("uib-tab-heading") || e.hasAttribute("data-uib-tab-heading") || e.hasAttribute("x-uib-tab-heading") || "uib-tab-heading" === e.tagName.toLowerCase() || "data-uib-tab-heading" === e.tagName.toLowerCase() || "x-uib-tab-heading" === e.tagName.toLowerCase())
        }
        return {
            restrict: "A",
            require: "^uibTabset",
            link: function(t, n, r) {
                var i = t.$eval(r.uibTabContentTransclude);
                i.$transcludeFn(i.$parent, function(t) {
                    angular.forEach(t, function(t) {
                        e(t) ? i.headingElement = t : n.append(t)
                    })
                })
            }
        }
    }), angular.module("ui.bootstrap.timepicker", []).constant("uibTimepickerConfig", {
        hourStep: 1,
        minuteStep: 1,
        secondStep: 1,
        showMeridian: !0,
        showSeconds: !1,
        meridians: null,
        readonlyInput: !1,
        mousewheel: !0,
        arrowkeys: !0,
        showSpinners: !0,
        templateUrl: "uib/template/timepicker/timepicker.html"
    }).controller("UibTimepickerController", ["$scope", "$element", "$attrs", "$parse", "$log", "$locale", "uibTimepickerConfig", function(e, t, n, r, i, a, o) {
        function s() {
            var t = +e.hours,
                n = e.showMeridian ? t > 0 && 13 > t : t >= 0 && 24 > t;
            return n ? (e.showMeridian && (12 === t && (t = 0), e.meridian === b[1] && (t += 12)), t) : void 0
        }

        function u() {
            var t = +e.minutes;
            return t >= 0 && 60 > t ? t : void 0
        }

        function l() {
            var t = +e.seconds;
            return t >= 0 && 60 > t ? t : void 0
        }

        function c(e) {
            return null === e ? "" : angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e.toString()
        }

        function f(e) {
            p(), y.$setViewValue(new Date(v)), d(e)
        }

        function p() {
            y.$setValidity("time", !0), e.invalidHours = !1, e.invalidMinutes = !1, e.invalidSeconds = !1
        }

        function d(t) {
            if (y.$modelValue) {
                var n = v.getHours(),
                    r = v.getMinutes(),
                    i = v.getSeconds();
                e.showMeridian && (n = 0 === n || 12 === n ? 12 : n % 12), e.hours = "h" === t ? n : c(n), "m" !== t && (e.minutes = c(r)), e.meridian = v.getHours() < 12 ? b[0] : b[1], "s" !== t && (e.seconds = c(i)), e.meridian = v.getHours() < 12 ? b[0] : b[1]
            } else e.hours = null, e.minutes = null, e.seconds = null, e.meridian = b[0]
        }

        function h(e) {
            v = g(v, e), f()
        }

        function m(e, t) {
            return g(e, 60 * t)
        }

        function g(e, t) {
            var n = new Date(e.getTime() + 1e3 * t),
                r = new Date(e);
            return r.setHours(n.getHours(), n.getMinutes(), n.getSeconds()), r
        }
        var v = new Date,
            $ = [],
            y = {
                $setViewValue: angular.noop
            },
            b = angular.isDefined(n.meridians) ? e.$parent.$eval(n.meridians) : o.meridians || a.DATETIME_FORMATS.AMPMS;
        e.tabindex = angular.isDefined(n.tabindex) ? n.tabindex : 0, t.removeAttr("tabindex"), this.init = function(t, r) {
            y = t, y.$render = this.render, y.$formatters.unshift(function(e) {
                return e ? new Date(e) : null
            });
            var i = r.eq(0),
                a = r.eq(1),
                s = r.eq(2),
                u = angular.isDefined(n.mousewheel) ? e.$parent.$eval(n.mousewheel) : o.mousewheel;
            u && this.setupMousewheelEvents(i, a, s);
            var l = angular.isDefined(n.arrowkeys) ? e.$parent.$eval(n.arrowkeys) : o.arrowkeys;
            l && this.setupArrowkeyEvents(i, a, s), e.readonlyInput = angular.isDefined(n.readonlyInput) ? e.$parent.$eval(n.readonlyInput) : o.readonlyInput, this.setupInputEvents(i, a, s)
        };
        var w = o.hourStep;
        n.hourStep && $.push(e.$parent.$watch(r(n.hourStep), function(e) {
            w = +e
        }));
        var x = o.minuteStep;
        n.minuteStep && $.push(e.$parent.$watch(r(n.minuteStep), function(e) {
            x = +e
        }));
        var C;
        $.push(e.$parent.$watch(r(n.min), function(e) {
            var t = new Date(e);
            C = isNaN(t) ? void 0 : t
        }));
        var k;
        $.push(e.$parent.$watch(r(n.max), function(e) {
            var t = new Date(e);
            k = isNaN(t) ? void 0 : t
        }));
        var S = !1;
        n.ngDisabled && $.push(e.$parent.$watch(r(n.ngDisabled), function(e) {
            S = e
        })), e.noIncrementHours = function() {
            var e = m(v, 60 * w);
            return S || e > k || v > e && C > e
        }, e.noDecrementHours = function() {
            var e = m(v, 60 * -w);
            return S || C > e || e > v && e > k
        }, e.noIncrementMinutes = function() {
            var e = m(v, x);
            return S || e > k || v > e && C > e
        }, e.noDecrementMinutes = function() {
            var e = m(v, -x);
            return S || C > e || e > v && e > k
        }, e.noIncrementSeconds = function() {
            var e = g(v, E);
            return S || e > k || v > e && C > e
        }, e.noDecrementSeconds = function() {
            var e = g(v, -E);
            return S || C > e || e > v && e > k
        }, e.noToggleMeridian = function() {
            return v.getHours() < 12 ? S || m(v, 720) > k : S || m(v, -720) < C
        };
        var E = o.secondStep;
        n.secondStep && $.push(e.$parent.$watch(r(n.secondStep), function(e) {
            E = +e
        })), e.showSeconds = o.showSeconds, n.showSeconds && $.push(e.$parent.$watch(r(n.showSeconds), function(t) {
            e.showSeconds = !!t
        })), e.showMeridian = o.showMeridian, n.showMeridian && $.push(e.$parent.$watch(r(n.showMeridian), function(t) {
            if (e.showMeridian = !!t, y.$error.time) {
                var n = s(),
                    r = u();
                angular.isDefined(n) && angular.isDefined(r) && (v.setHours(n), f())
            } else d()
        })), this.setupMousewheelEvents = function(t, n, r) {
            var i = function(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                return e.detail || t > 0
            };
            t.bind("mousewheel wheel", function(t) {
                S || e.$apply(i(t) ? e.incrementHours() : e.decrementHours()), t.preventDefault()
            }), n.bind("mousewheel wheel", function(t) {
                S || e.$apply(i(t) ? e.incrementMinutes() : e.decrementMinutes()), t.preventDefault()
            }), r.bind("mousewheel wheel", function(t) {
                S || e.$apply(i(t) ? e.incrementSeconds() : e.decrementSeconds()), t.preventDefault()
            })
        }, this.setupArrowkeyEvents = function(t, n, r) {
            t.bind("keydown", function(t) {
                S || (38 === t.which ? (t.preventDefault(), e.incrementHours(), e.$apply()) : 40 === t.which && (t.preventDefault(), e.decrementHours(), e.$apply()))
            }), n.bind("keydown", function(t) {
                S || (38 === t.which ? (t.preventDefault(), e.incrementMinutes(), e.$apply()) : 40 === t.which && (t.preventDefault(), e.decrementMinutes(), e.$apply()))
            }), r.bind("keydown", function(t) {
                S || (38 === t.which ? (t.preventDefault(), e.incrementSeconds(), e.$apply()) : 40 === t.which && (t.preventDefault(), e.decrementSeconds(), e.$apply()))
            })
        }, this.setupInputEvents = function(t, n, r) {
            if (e.readonlyInput) return e.updateHours = angular.noop, e.updateMinutes = angular.noop, void(e.updateSeconds = angular.noop);
            var i = function(t, n, r) {
                y.$setViewValue(null), y.$setValidity("time", !1), angular.isDefined(t) && (e.invalidHours = t), angular.isDefined(n) && (e.invalidMinutes = n), angular.isDefined(r) && (e.invalidSeconds = r)
            };
            e.updateHours = function() {
                var e = s(),
                    t = u();
                y.$setDirty(), angular.isDefined(e) && angular.isDefined(t) ? (v.setHours(e), v.setMinutes(t), C > v || v > k ? i(!0) : f("h")) : i(!0)
            }, t.bind("blur", function(t) {
                y.$setTouched(), null === e.hours || "" === e.hours ? i(!0) : !e.invalidHours && e.hours < 10 && e.$apply(function() {
                    e.hours = c(e.hours)
                })
            }), e.updateMinutes = function() {
                var e = u(),
                    t = s();
                y.$setDirty(), angular.isDefined(e) && angular.isDefined(t) ? (v.setHours(t), v.setMinutes(e), C > v || v > k ? i(void 0, !0) : f("m")) : i(void 0, !0)
            }, n.bind("blur", function(t) {
                y.$setTouched(), null === e.minutes ? i(void 0, !0) : !e.invalidMinutes && e.minutes < 10 && e.$apply(function() {
                    e.minutes = c(e.minutes)
                })
            }), e.updateSeconds = function() {
                var e = l();
                y.$setDirty(), angular.isDefined(e) ? (v.setSeconds(e), f("s")) : i(void 0, void 0, !0)
            }, r.bind("blur", function(t) {
                !e.invalidSeconds && e.seconds < 10 && e.$apply(function() {
                    e.seconds = c(e.seconds)
                })
            })
        }, this.render = function() {
            var t = y.$viewValue;
            isNaN(t) ? (y.$setValidity("time", !1), i.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (t && (v = t), C > v || v > k ? (y.$setValidity("time", !1), e.invalidHours = !0, e.invalidMinutes = !0) : p(), d())
        }, e.showSpinners = angular.isDefined(n.showSpinners) ? e.$parent.$eval(n.showSpinners) : o.showSpinners, e.incrementHours = function() {
            e.noIncrementHours() || h(60 * w * 60)
        }, e.decrementHours = function() {
            e.noDecrementHours() || h(60 * -w * 60)
        }, e.incrementMinutes = function() {
            e.noIncrementMinutes() || h(60 * x)
        }, e.decrementMinutes = function() {
            e.noDecrementMinutes() || h(60 * -x)
        }, e.incrementSeconds = function() {
            e.noIncrementSeconds() || h(E)
        }, e.decrementSeconds = function() {
            e.noDecrementSeconds() || h(-E)
        }, e.toggleMeridian = function() {
            var t = u(),
                n = s();
            e.noToggleMeridian() || (angular.isDefined(t) && angular.isDefined(n) ? h(720 * (v.getHours() < 12 ? 60 : -60)) : e.meridian = e.meridian === b[0] ? b[1] : b[0])
        }, e.blur = function() {
            y.$setTouched()
        }, e.$on("$destroy", function() {
            for (; $.length;) $.shift()()
        })
    }]).directive("uibTimepicker", ["uibTimepickerConfig", function(e) {
        return {
            require: ["uibTimepicker", "?^ngModel"],
            controller: "UibTimepickerController",
            controllerAs: "timepicker",
            replace: !0,
            scope: {},
            templateUrl: function(t, n) {
                return n.templateUrl || e.templateUrl
            },
            link: function(e, t, n, r) {
                var i = r[0],
                    a = r[1];
                a && i.init(a, t.find("input"))
            }
        }
    }]), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.debounce", "ui.bootstrap.position"]).factory("uibTypeaheadParser", ["$parse", function(e) {
        var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
        return {
            parse: function(n) {
                var r = n.match(t);
                if (!r) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
                return {
                    itemName: r[3],
                    source: e(r[4]),
                    viewMapper: e(r[2] || r[1]),
                    modelMapper: e(r[1])
                }
            }
        }
    }]).controller("UibTypeaheadController", ["$scope", "$element", "$attrs", "$compile", "$parse", "$q", "$timeout", "$document", "$window", "$rootScope", "$$debounce", "$uibPosition", "uibTypeaheadParser", function(e, t, n, r, i, a, o, s, u, l, c, f, p) {
        function d() {
            V.moveInProgress || (V.moveInProgress = !0, V.$digest()), X()
        }

        function h() {
            V.position = A ? f.offset(t) : f.position(t), V.position.top += t.prop("offsetHeight")
        }
        var m, g, v = [9, 13, 27, 38, 40],
            $ = 200,
            y = e.$eval(n.typeaheadMinLength);
        y || 0 === y || (y = 1);
        var b = e.$eval(n.typeaheadWaitMs) || 0,
            w = e.$eval(n.typeaheadEditable) !== !1;
        e.$watch(n.typeaheadEditable, function(e) {
            w = e !== !1
        });
        var x, C, k = i(n.typeaheadLoading).assign || angular.noop,
            S = i(n.typeaheadOnSelect),
            E = angular.isDefined(n.typeaheadSelectOnBlur) ? e.$eval(n.typeaheadSelectOnBlur) : !1,
            D = i(n.typeaheadNoResults).assign || angular.noop,
            T = n.typeaheadInputFormatter ? i(n.typeaheadInputFormatter) : void 0,
            A = n.typeaheadAppendToBody ? e.$eval(n.typeaheadAppendToBody) : !1,
            O = n.typeaheadAppendTo ? e.$eval(n.typeaheadAppendTo) : null,
            M = e.$eval(n.typeaheadFocusFirst) !== !1,
            P = n.typeaheadSelectOnExact ? e.$eval(n.typeaheadSelectOnExact) : !1,
            j = i(n.typeaheadIsOpen).assign || angular.noop,
            N = e.$eval(n.typeaheadShowHint) || !1,
            L = i(n.ngModel),
            I = i(n.ngModel + "($$$p)"),
            F = function(t, n) {
                return angular.isFunction(L(e)) && g && g.$options && g.$options.getterSetter ? I(t, {
                    $$$p: n
                }) : L.assign(t, n)
            },
            q = p.parse(n.uibTypeahead),
            V = e.$new(),
            R = e.$on("$destroy", function() {
                V.$destroy()
            });
        V.$on("$destroy", R);
        var U = "typeahead-" + V.$id + "-" + Math.floor(1e4 * Math.random());
        t.attr({
            "aria-autocomplete": "list",
            "aria-expanded": !1,
            "aria-owns": U
        });
        var H, _;
        N && (H = angular.element("<div></div>"), H.css("position", "relative"), t.after(H), _ = t.clone(), _.attr("placeholder", ""), _.val(""), _.css({
            position: "absolute",
            top: "0px",
            left: "0px",
            "border-color": "transparent",
            "box-shadow": "none",
            opacity: 1,
            background: "none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",
            color: "#999"
        }), t.css({
            position: "relative",
            "vertical-align": "top",
            "background-color": "transparent"
        }), H.append(_), _.after(t));
        var B = angular.element("<div uib-typeahead-popup></div>");
        B.attr({
            id: U,
            matches: "matches",
            active: "activeIdx",
            select: "select(activeIdx, evt)",
            "move-in-progress": "moveInProgress",
            query: "query",
            position: "position",
            "assign-is-open": "assignIsOpen(isOpen)",
            debounce: "debounceUpdate"
        }), angular.isDefined(n.typeaheadTemplateUrl) && B.attr("template-url", n.typeaheadTemplateUrl), angular.isDefined(n.typeaheadPopupTemplateUrl) && B.attr("popup-template-url", n.typeaheadPopupTemplateUrl);
        var z = function() {
                N && _.val("")
            },
            W = function() {
                V.matches = [], V.activeIdx = -1, t.attr("aria-expanded", !1), z()
            },
            Y = function(e) {
                return U + "-option-" + e
            };
        V.$watch("activeIdx", function(e) {
            0 > e ? t.removeAttr("aria-activedescendant") : t.attr("aria-activedescendant", Y(e))
        });
        var G = function(e, t) {
                return V.matches.length > t && e ? e.toUpperCase() === V.matches[t].label.toUpperCase() : !1
            },
            K = function(n, r) {
                var i = {
                    $viewValue: n
                };
                k(e, !0), D(e, !1), a.when(q.source(e, i)).then(function(a) {
                    var o = n === m.$viewValue;
                    if (o && x)
                        if (a && a.length > 0) {
                            V.activeIdx = M ? 0 : -1, D(e, !1), V.matches.length = 0;
                            for (var s = 0; s < a.length; s++) i[q.itemName] = a[s], V.matches.push({
                                id: Y(s),
                                label: q.viewMapper(V, i),
                                model: a[s]
                            });
                            if (V.query = n, h(), t.attr("aria-expanded", !0), P && 1 === V.matches.length && G(n, 0) && (angular.isNumber(V.debounceUpdate) || angular.isObject(V.debounceUpdate) ? c(function() {
                                    V.select(0, r)
                                }, angular.isNumber(V.debounceUpdate) ? V.debounceUpdate : V.debounceUpdate["default"]) : V.select(0, r)), N) {
                                var u = V.matches[0].label;
                                angular.isString(n) && n.length > 0 && u.slice(0, n.length).toUpperCase() === n.toUpperCase() ? _.val(n + u.slice(n.length)) : _.val("")
                            }
                        } else W(), D(e, !0);
                    o && k(e, !1)
                }, function() {
                    W(), k(e, !1), D(e, !0)
                })
            };
        A && (angular.element(u).on("resize", d), s.find("body").on("scroll", d));
        var X = c(function() {
            V.matches.length && h(), V.moveInProgress = !1
        }, $);
        V.moveInProgress = !1, V.query = void 0;
        var J, Q = function(e) {
                J = o(function() {
                    K(e)
                }, b)
            },
            Z = function() {
                J && o.cancel(J)
            };
        W(), V.assignIsOpen = function(t) {
            j(e, t)
        }, V.select = function(r, i) {
            var a, s, u = {};
            C = !0, u[q.itemName] = s = V.matches[r].model, a = q.modelMapper(e, u), F(e, a), m.$setValidity("editable", !0), m.$setValidity("parse", !0), S(e, {
                $item: s,
                $model: a,
                $label: q.viewMapper(e, u),
                $event: i
            }), W(), V.$eval(n.typeaheadFocusOnSelect) !== !1 && o(function() {
                t[0].focus()
            }, 0, !1)
        }, t.on("keydown", function(e) {
            if (0 !== V.matches.length && -1 !== v.indexOf(e.which)) {
                if (-1 === V.activeIdx && (9 === e.which || 13 === e.which)) return W(), void V.$digest();
                e.preventDefault();
                var t;
                switch (e.which) {
                    case 9:
                    case 13:
                        V.$apply(function() {
                            angular.isNumber(V.debounceUpdate) || angular.isObject(V.debounceUpdate) ? c(function() {
                                V.select(V.activeIdx, e)
                            }, angular.isNumber(V.debounceUpdate) ? V.debounceUpdate : V.debounceUpdate["default"]) : V.select(V.activeIdx, e)
                        });
                        break;
                    case 27:
                        e.stopPropagation(), W(), V.$digest();
                        break;
                    case 38:
                        V.activeIdx = (V.activeIdx > 0 ? V.activeIdx : V.matches.length) - 1, V.$digest(), t = B.find("li")[V.activeIdx], t.parentNode.scrollTop = t.offsetTop;
                        break;
                    case 40:
                        V.activeIdx = (V.activeIdx + 1) % V.matches.length, V.$digest(), t = B.find("li")[V.activeIdx], t.parentNode.scrollTop = t.offsetTop
                }
            }
        }), t.bind("focus", function(e) {
            x = !0, 0 !== y || m.$viewValue || o(function() {
                K(m.$viewValue, e)
            }, 0)
        }), t.bind("blur", function(e) {
            E && V.matches.length && -1 !== V.activeIdx && !C && (C = !0, V.$apply(function() {
                angular.isObject(V.debounceUpdate) && angular.isNumber(V.debounceUpdate.blur) ? c(function() {
                    V.select(V.activeIdx, e)
                }, V.debounceUpdate.blur) : V.select(V.activeIdx, e)
            })), !w && m.$error.editable && (m.$viewValue = "", t.val("")), x = !1, C = !1
        });
        var ee = function(e) {
            t[0] !== e.target && 3 !== e.which && 0 !== V.matches.length && (W(), l.$$phase || V.$digest())
        };
        s.on("click", ee), e.$on("$destroy", function() {
            s.off("click", ee), (A || O) && te.remove(), A && (angular.element(u).off("resize", d), s.find("body").off("scroll", d)), B.remove(), N && H.remove()
        });
        var te = r(B)(V);
        A ? s.find("body").append(te) : O ? angular.element(O).eq(0).append(te) : t.after(te), this.init = function(t, n) {
            m = t, g = n, V.debounceUpdate = m.$options && i(m.$options.debounce)(e), m.$parsers.unshift(function(t) {
                return x = !0, 0 === y || t && t.length >= y ? b > 0 ? (Z(), Q(t)) : K(t) : (k(e, !1), Z(), W()), w ? t : t ? void m.$setValidity("editable", !1) : (m.$setValidity("editable", !0), null)
            }), m.$formatters.push(function(t) {
                var n, r, i = {};
                return w || m.$setValidity("editable", !0), T ? (i.$model = t, T(e, i)) : (i[q.itemName] = t, n = q.viewMapper(e, i), i[q.itemName] = void 0, r = q.viewMapper(e, i), n !== r ? n : t)
            })
        }
    }]).directive("uibTypeahead", function() {
        return {
            controller: "UibTypeaheadController",
            require: ["ngModel", "^?ngModelOptions", "uibTypeahead"],
            link: function(e, t, n, r) {
                r[2].init(r[0], r[1])
            }
        }
    }).directive("uibTypeaheadPopup", ["$$debounce", function(e) {
        return {
            scope: {
                matches: "=",
                query: "=",
                active: "=",
                position: "&",
                moveInProgress: "=",
                select: "&",
                assignIsOpen: "&",
                debounce: "&"
            },
            replace: !0,
            templateUrl: function(e, t) {
                return t.popupTemplateUrl || "uib/template/typeahead/typeahead-popup.html"
            },
            link: function(t, n, r) {
                t.templateUrl = r.templateUrl, t.isOpen = function() {
                    var e = t.matches.length > 0;
                    return t.assignIsOpen({
                        isOpen: e
                    }), e
                }, t.isActive = function(e) {
                    return t.active === e
                }, t.selectActive = function(e) {
                    t.active = e
                }, t.selectMatch = function(n, r) {
                    var i = t.debounce();
                    angular.isNumber(i) || angular.isObject(i) ? e(function() {
                        t.select({
                            activeIdx: n,
                            evt: r
                        })
                    }, angular.isNumber(i) ? i : i["default"]) : t.select({
                        activeIdx: n,
                        evt: r
                    })
                }
            }
        }
    }]).directive("uibTypeaheadMatch", ["$templateRequest", "$compile", "$parse", function(e, t, n) {
        return {
            scope: {
                index: "=",
                match: "=",
                query: "="
            },
            link: function(r, i, a) {
                var o = n(a.templateUrl)(r.$parent) || "uib/template/typeahead/typeahead-match.html";
                e(o).then(function(e) {
                    var n = angular.element(e.trim());
                    i.replaceWith(n), t(n)(r)
                })
            }
        }
    }]).filter("uibTypeaheadHighlight", ["$sce", "$injector", "$log", function(e, t, n) {
        function r(e) {
            return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        }

        function i(e) {
            return /<.*>/g.test(e)
        }
        var a;
        return a = t.has("$sanitize"),
            function(t, o) {
                return !a && i(t) && n.warn("Unsafe use of typeahead please use ngSanitize"), t = o ? ("" + t).replace(new RegExp(r(o), "gi"), "<strong>$&</strong>") : t, a || (t = e.trustAsHtml(t)), t
            }
    }]), angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/accordion/accordion-group.html", '<div class="panel" ng-class="panelClass || \'panel-default\'">\n  <div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n    <h4 class="panel-title">\n      <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n    <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n');
    }]), angular.module("uib/template/accordion/accordion.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/accordion/accordion.html", '<div role="tablist" class="panel-group" ng-transclude></div>')
    }]), angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissible\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
    }]), angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n  <div class="carousel-inner" ng-transclude></div>\n  <a role="button" href class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n    <span class="sr-only">previous</span>\n  </a>\n  <a role="button" href class="right carousel-control" ng-click="next()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n    <span class="sr-only">next</span>\n  </a>\n  <ol class="carousel-indicators" ng-show="slides.length > 1">\n    <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n      <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n    </li>\n  </ol>\n</div>')
    }]), angular.module("uib/template/carousel/slide.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/carousel/slide.html", '<div ng-class="{\n    \'active\': active\n  }" class="item text-center" ng-transclude></div>\n')
    }]), angular.module("uib/template/datepicker/datepicker.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/datepicker/datepicker.html", '<div class="uib-datepicker" ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <uib-daypicker ng-switch-when="day" tabindex="0"></uib-daypicker>\n  <uib-monthpicker ng-switch-when="month" tabindex="0"></uib-monthpicker>\n  <uib-yearpicker ng-switch-when="year" tabindex="0"></uib-yearpicker>\n</div>')
    }]), angular.module("uib/template/datepicker/day.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/datepicker/day.html", '<table class="uib-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-weeks" ng-repeat="row in rows track by $index">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default btn-sm"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("uib/template/datepicker/month.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/datepicker/month.html", '<table class="uib-monthpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-months" ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("uib/template/datepicker/popup.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/datepicker/popup.html", '<div>\n  <ul class="uib-datepicker-popup dropdown-menu" dropdown-nested ng-if="isOpen" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n    <li ng-transclude></li>\n    <li ng-if="showButtonBar" class="uib-button-bar">\n    <span class="btn-group pull-left">\n      <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n      <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n    </span>\n      <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close()">{{ getText(\'close\') }}</button>\n    </li>\n  </ul>\n</div>\n')
    }]), angular.module("uib/template/datepicker/year.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/datepicker/year.html", '<table class="uib-yearpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::columns - 2}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-years" ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("uib/template/modal/backdrop.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/modal/backdrop.html", '<div class="modal-backdrop"\n     uib-modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
    }]), angular.module("uib/template/modal/window.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/modal/window.html", '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    uib-modal-animation-class="fade"\n    modal-in-class="in"\n    ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">\n    <div class="modal-dialog {{size ? \'modal-\' + size : \'\'}}"><div class="modal-content" uib-modal-transclude></div></div>\n</div>\n')
    }]), angular.module("uib/template/pager/pager.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/pager/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>\n')
    }]), angular.module("uib/template/pagination/pagination.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)">{{::getText(\'first\')}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)">{{::getText(\'last\')}}</a></li>\n</ul>\n')
    }]), angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/tooltip/tooltip-html-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n</div>\n')
    }]), angular.module("uib/template/tooltip/tooltip-popup.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/tooltip/tooltip-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
    }]), angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/tooltip/tooltip-template-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner"\n    uib-tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')
    }]), angular.module("uib/template/popover/popover-html.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/popover/popover-html.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind-html="contentExp()"></div>\n  </div>\n</div>\n')
    }]), angular.module("uib/template/popover/popover-template.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/popover/popover-template.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content"\n        uib-tooltip-template-transclude="contentExp()"\n        tooltip-template-transclude-scope="originScope()"></div>\n  </div>\n</div>\n')
    }]), angular.module("uib/template/popover/popover.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/popover/popover.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
    }]), angular.module("uib/template/progressbar/bar.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n')
    }]), angular.module("uib/template/progressbar/progress.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/progressbar/progress.html", '<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>')
    }]), angular.module("uib/template/progressbar/progressbar.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n')
    }]), angular.module("uib/template/rating/rating.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}" aria-valuetext="{{r.title}}"></i>\n</span>\n')
    }]), angular.module("uib/template/tabs/tab.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}" class="uib-tab">\n  <a href ng-click="select()" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n')
    }]), angular.module("uib/template/tabs/tabset.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
    }]), angular.module("uib/template/timepicker/timepicker.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/timepicker/timepicker.html", '<table class="uib-timepicker">\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-increment hours"><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-increment minutes"><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-increment seconds"><a ng-click="incrementSeconds()" ng-class="{disabled: noIncrementSeconds()}" class="btn btn-link" ng-disabled="noIncrementSeconds()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group uib-time hours" ng-class="{\'has-error\': invalidHours}">\n        <input style="width:50px;" type="text" placeholder="HH" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementHours()" ng-blur="blur()">\n      </td>\n      <td class="uib-separator">:</td>\n      <td class="form-group uib-time minutes" ng-class="{\'has-error\': invalidMinutes}">\n        <input style="width:50px;" type="text" placeholder="MM" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementMinutes()" ng-blur="blur()">\n      </td>\n      <td ng-show="showSeconds" class="uib-separator">:</td>\n      <td class="form-group uib-time seconds" ng-class="{\'has-error\': invalidSeconds}" ng-show="showSeconds">\n        <input style="width:50px;" type="text" placeholder="SS" ng-model="seconds" ng-change="updateSeconds()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementSeconds()" ng-blur="blur()">\n      </td>\n      <td ng-show="showMeridian" class="uib-time am-pm"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-decrement hours"><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-decrement minutes"><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-decrement seconds"><a ng-click="decrementSeconds()" ng-class="{disabled: noDecrementSeconds()}" class="btn btn-link" ng-disabled="noDecrementSeconds()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("uib/template/typeahead/typeahead-match.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/typeahead/typeahead-match.html", '<a href\n   tabindex="-1"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n')
    }]), angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function(e) {
        e.put("uib/template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
    }]), angular.module("ui.bootstrap.carousel").run(function() {
        !angular.$$csp().noInlineStyle && angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>')
    }), angular.module("ui.bootstrap.datepicker").run(function() {
        !angular.$$csp().noInlineStyle && angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-datepicker-popup.dropdown-menu{display:block;}.uib-button-bar{padding:10px 9px 2px;}</style>')
    }), angular.module("ui.bootstrap.timepicker").run(function() {
        !angular.$$csp().noInlineStyle && angular.element(document).find("head").prepend('<style type="text/css">.uib-time input{width:50px;}</style>')
    }), angular.module("ui.bootstrap.typeahead").run(function() {
        !angular.$$csp().noInlineStyle && angular.element(document).find("head").prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>')
    }),
    function() {
        "use strict";
        angular.module("angular-loading-bar", ["cfp.loadingBarInterceptor"]), angular.module("chieffancypants.loadingBar", ["cfp.loadingBarInterceptor"]), angular.module("cfp.loadingBarInterceptor", ["cfp.loadingBar"]).config(["$httpProvider", function(e) {
            var t = ["$q", "$cacheFactory", "$timeout", "$rootScope", "$log", "cfpLoadingBar", function(t, n, r, i, a, o) {
                function s() {
                    r.cancel(l), o.complete(), f = 0, c = 0
                }

                function u(t) {
                    var r, i = n.get("$http"),
                        a = e.defaults;
                    !t.cache && !a.cache || t.cache === !1 || "GET" !== t.method && "JSONP" !== t.method || (r = angular.isObject(t.cache) ? t.cache : angular.isObject(a.cache) ? a.cache : i);
                    var o = void 0 !== r ? void 0 !== r.get(t.url) : !1;
                    return void 0 !== t.cached && o !== t.cached ? t.cached : (t.cached = o, o)
                }
                var l, c = 0,
                    f = 0,
                    p = o.latencyThreshold;
                return {
                    request: function(e) {
                        return e.ignoreLoadingBar || u(e) || (i.$broadcast("cfpLoadingBar:loading", {
                            url: e.url
                        }), 0 === c && (l = r(function() {
                            o.start()
                        }, p)), c++, o.set(f / c)), e
                    },
                    response: function(e) {
                        return e && e.config ? (e.config.ignoreLoadingBar || u(e.config) || (f++, i.$broadcast("cfpLoadingBar:loaded", {
                            url: e.config.url,
                            result: e
                        }), f >= c ? s() : o.set(f / c)), e) : (a.error("Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"), e)
                    },
                    responseError: function(e) {
                        return e && e.config ? (e.config.ignoreLoadingBar || u(e.config) || (f++, i.$broadcast("cfpLoadingBar:loaded", {
                            url: e.config.url,
                            result: e
                        }), f >= c ? s() : o.set(f / c)), t.reject(e)) : (a.error("Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"), t.reject(e))
                    }
                }
            }];
            e.interceptors.push(t)
        }]), angular.module("cfp.loadingBar", []).provider("cfpLoadingBar", function() {
            this.autoIncrement = !0, this.includeSpinner = !0, this.includeBar = !0, this.latencyThreshold = 100, this.startSize = .02, this.parentSelector = "body", this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>', this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>', this.$get = ["$injector", "$document", "$timeout", "$rootScope", function(e, t, n, r) {
                function i() {
                    c || (c = e.get("$animate"));
                    var i = t.find(d).eq(0);
                    n.cancel(p), v || (r.$broadcast("cfpLoadingBar:started"), v = !0, w && c.enter(h, i, angular.element(i[0].lastChild)), b && c.enter(g, i, angular.element(i[0].lastChild)), a(x))
                }

                function a(e) {
                    if (v) {
                        var t = 100 * e + "%";
                        m.css("width", t), $ = e, y && (n.cancel(f), f = n(function() {
                            o()
                        }, 250))
                    }
                }

                function o() {
                    if (!(s() >= 1)) {
                        var e = 0,
                            t = s();
                        e = t >= 0 && .25 > t ? (3 * Math.random() + 3) / 100 : t >= .25 && .65 > t ? 3 * Math.random() / 100 : t >= .65 && .9 > t ? 2 * Math.random() / 100 : t >= .9 && .99 > t ? .005 : 0;
                        var n = s() + e;
                        a(n)
                    }
                }

                function s() {
                    return $
                }

                function u() {
                    $ = 0, v = !1
                }

                function l() {
                    c || (c = e.get("$animate")), r.$broadcast("cfpLoadingBar:completed"), a(1), n.cancel(p), p = n(function() {
                        var e = c.leave(h, u);
                        e && e.then && e.then(u), c.leave(g)
                    }, 500)
                }
                var c, f, p, d = this.parentSelector,
                    h = angular.element(this.loadingBarTemplate),
                    m = h.find("div").eq(0),
                    g = angular.element(this.spinnerTemplate),
                    v = !1,
                    $ = 0,
                    y = this.autoIncrement,
                    b = this.includeSpinner,
                    w = this.includeBar,
                    x = this.startSize;
                return {
                    start: i,
                    set: a,
                    status: s,
                    inc: o,
                    complete: l,
                    autoIncrement: this.autoIncrement,
                    includeSpinner: this.includeSpinner,
                    latencyThreshold: this.latencyThreshold,
                    parentSelector: this.parentSelector,
                    startSize: this.startSize
                }
            }]
        })
    }(),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], function(t) {
            return e(t)
        }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = e(require("jquery")) : e(window.jQuery)
    }(function(e) {
        "use strict";

        function t(e) {
            void 0 === e && (e = window.navigator.userAgent), e = e.toLowerCase();
            var t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
                n = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(windows phone)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || [],
                r = {},
                i = {
                    browser: t[5] || t[3] || t[1] || "",
                    version: t[2] || t[4] || "0",
                    versionNumber: t[4] || t[2] || "0",
                    platform: n[0] || ""
                };
            if (i.browser && (r[i.browser] = !0, r.version = i.version, r.versionNumber = parseInt(i.versionNumber, 10)), i.platform && (r[i.platform] = !0), (r.android || r.bb || r.blackberry || r.ipad || r.iphone || r.ipod || r.kindle || r.playbook || r.silk || r["windows phone"]) && (r.mobile = !0), (r.cros || r.mac || r.linux || r.win) && (r.desktop = !0), (r.chrome || r.opr || r.safari) && (r.webkit = !0), r.rv || r.edge) {
                var a = "msie";
                i.browser = a, r[a] = !0
            }
            if (r.safari && r.blackberry) {
                var o = "blackberry";
                i.browser = o, r[o] = !0
            }
            if (r.safari && r.playbook) {
                var s = "playbook";
                i.browser = s, r[s] = !0
            }
            if (r.bb) {
                var u = "blackberry";
                i.browser = u, r[u] = !0
            }
            if (r.opr) {
                var l = "opera";
                i.browser = l, r[l] = !0
            }
            if (r.safari && r.android) {
                var c = "android";
                i.browser = c, r[c] = !0
            }
            if (r.safari && r.kindle) {
                var f = "kindle";
                i.browser = f, r[f] = !0
            }
            if (r.safari && r.silk) {
                var p = "silk";
                i.browser = p, r[p] = !0
            }
            return r.name = i.browser, r.platform = i.platform, r
        }
        return window.jQBrowser = t(window.navigator.userAgent), window.jQBrowser.uaMatch = t, e && (e.browser = window.jQBrowser), window.jQBrowser
    }),
    function(e) {
        "use strict";
        angular.module("tmh.dynamicLocale", []).config(["$provide", function(e) {
            function t(e) {
                return e.$stateful = !0, e
            }
            e.decorator("dateFilter", ["$delegate", t]), e.decorator("numberFilter", ["$delegate", t]), e.decorator("currencyFilter", ["$delegate", t])
        }]).constant("tmhDynamicLocale.STORAGE_KEY", "tmhDynamicLocale.locale").provider("tmhDynamicLocale", ["tmhDynamicLocale.STORAGE_KEY", function(e) {
            function t(e, t, n, r) {
                var i = document.createElement("script"),
                    a = document.getElementsByTagName("body")[0],
                    o = !1;
                i.type = "text/javascript", i.readyState ? i.onreadystatechange = function() {
                    ("complete" === i.readyState || "loaded" === i.readyState) && (i.onreadystatechange = null, r(function() {
                        o || (o = !0, a.removeChild(i), t())
                    }, 30, !1))
                } : (i.onload = function() {
                    o || (o = !0, a.removeChild(i), t())
                }, i.onerror = function() {
                    o || (o = !0, a.removeChild(i), n())
                }), i.src = e, i.async = !1, a.appendChild(i)
            }

            function n(e, n, r, o, s, c, f) {
                function p(e, t) {
                    a === r && (angular.forEach(e, function(n, r) {
                        t[r] ? angular.isArray(t[r]) && (e[r].length = t[r].length) : delete e[r]
                    }), angular.forEach(t, function(n, r) {
                        angular.isArray(t[r]) || angular.isObject(t[r]) ? (e[r] || (e[r] = angular.isArray(t[r]) ? [] : {}), p(e[r], t[r])) : e[r] = t[r]
                    }))
                }
                if (l[r]) return l[r];
                var d, h = s.defer();
                return r === a ? h.resolve(n) : (d = c.get(r)) ? (a = r, o.$evalAsync(function() {
                    p(n, d), o.$broadcast("$localeChangeSuccess", r, n), i.put(u, r), h.resolve(n)
                })) : (a = r, l[r] = h.promise, t(e, function() {
                    var e = angular.injector(["ngLocale"]),
                        t = e.get("$locale");
                    p(n, t), c.put(r, t), delete l[r], o.$apply(function() {
                        o.$broadcast("$localeChangeSuccess", r, n), i.put(u, r), h.resolve(n)
                    })
                }, function() {
                    delete l[r], o.$apply(function() {
                        a === r && (a = n.id), o.$broadcast("$localeChangeError", r), h.reject(r)
                    })
                }, f)), h.promise
            }
            var r, i, a, o = "angular/i18n/angular-locale_{{locale}}.js",
                s = "tmhDynamicLocaleStorageCache",
                u = e,
                l = {};
            this.localeLocationPattern = function(e) {
                return e ? (o = e, this) : o
            }, this.useStorage = function(e) {
                s = e
            }, this.useCookieStorage = function() {
                this.useStorage("$cookieStore")
            }, this.defaultLocale = function(e) {
                r = e
            }, this.storageKey = function(e) {
                return e ? (u = e, this) : u
            }, this.$get = ["$rootScope", "$injector", "$interpolate", "$locale", "$q", "tmhDynamicLocaleCache", "$timeout", function(e, t, l, c, f, p, d) {
                var h = l(o);
                return i = t.get(s), e.$evalAsync(function() {
                    var t;
                    (t = i.get(u) || r) && n(h({
                        locale: t
                    }), c, t, e, f, p, d)
                }), {
                    set: function(t) {
                        return n(h({
                            locale: t
                        }), c, t, e, f, p, d)
                    },
                    get: function() {
                        return a
                    }
                }
            }]
        }]).provider("tmhDynamicLocaleCache", function() {
            this.$get = ["$cacheFactory", function(e) {
                return e("tmh.dynamicLocales")
            }]
        }).provider("tmhDynamicLocaleStorageCache", function() {
            this.$get = ["$cacheFactory", function(e) {
                return e("tmh.dynamicLocales.store")
            }]
        }).run(["tmhDynamicLocale", angular.noop])
    }(window), window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var e = window.styleMedia || window.media;
        if (!e) {
            var t = document.createElement("style"),
                n = document.getElementsByTagName("script")[0],
                r = null;
            t.type = "text/css", t.id = "matchmediajs-test", n.parentNode.insertBefore(t, n), r = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, e = {
                matchMedium: function(e) {
                    var n = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                    return t.styleSheet ? t.styleSheet.cssText = n : t.textContent = n, "1px" === r.width
                }
            }
        }
        return function(t) {
            return {
                matches: e.matchMedium(t || "all"),
                media: t || "all"
            }
        }
    }());