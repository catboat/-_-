function _() {
    this.__rules__ = [], this.__cache__ = null;
}

_.prototype.__find__ = function(_) {
    for (var e = this.__rules__.length, t = -1; e--; ) if (this.__rules__[++t].name === _) return t;
    return -1;
}, _.prototype.__compile__ = function() {
    var _ = this, e = [ "" ];
    _.__rules__.forEach(function(_) {
        _.enabled && _.alt.forEach(function(_) {
            e.indexOf(_) < 0 && e.push(_);
        });
    }), _.__cache__ = {}, e.forEach(function(e) {
        _.__cache__[e] = [], _.__rules__.forEach(function(t) {
            t.enabled && (e && t.alt.indexOf(e) < 0 || _.__cache__[e].push(t.fn));
        });
    });
}, _.prototype.at = function(_, e, t) {
    var n = this.__find__(_), r = t || {};
    if (-1 === n) throw new Error("Parser rule not found: " + _);
    this.__rules__[n].fn = e, this.__rules__[n].alt = r.alt || [], this.__cache__ = null;
}, _.prototype.before = function(_, e, t, n) {
    var r = this.__find__(_), i = n || {};
    if (-1 === r) throw new Error("Parser rule not found: " + _);
    this.__rules__.splice(r, 0, {
        name: e,
        enabled: !0,
        fn: t,
        alt: i.alt || []
    }), this.__cache__ = null;
}, _.prototype.after = function(_, e, t, n) {
    var r = this.__find__(_), i = n || {};
    if (-1 === r) throw new Error("Parser rule not found: " + _);
    this.__rules__.splice(r + 1, 0, {
        name: e,
        enabled: !0,
        fn: t,
        alt: i.alt || []
    }), this.__cache__ = null;
}, _.prototype.push = function(_, e, t) {
    var n = t || {};
    this.__rules__.push({
        name: _,
        enabled: !0,
        fn: e,
        alt: n.alt || []
    }), this.__cache__ = null;
}, _.prototype.enable = function(_, e) {
    _ = Array.isArray(_) ? _ : [ _ ], e && this.__rules__.forEach(function(_) {
        _.enabled = !1;
    }), _.forEach(function(_) {
        var e = this.__find__(_);
        if (e < 0) throw new Error("Rules manager: invalid rule name " + _);
        this.__rules__[e].enabled = !0;
    }, this), this.__cache__ = null;
}, _.prototype.disable = function(_) {
    (_ = Array.isArray(_) ? _ : [ _ ]).forEach(function(_) {
        var e = this.__find__(_);
        if (e < 0) throw new Error("Rules manager: invalid rule name " + _);
        this.__rules__[e].enabled = !1;
    }, this), this.__cache__ = null;
}, _.prototype.getRules = function(_) {
    return null === this.__cache__ && this.__compile__(), this.__cache__[_] || [];
}, module.exports = _;