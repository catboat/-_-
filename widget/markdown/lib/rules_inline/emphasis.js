function e(e) {
    return e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122;
}

function o(o, s) {
    var p, r, n, t = s, l = !0, c = !0, a = o.posMax, i = o.src.charCodeAt(s);
    for (p = s > 0 ? o.src.charCodeAt(s - 1) : -1; t < a && o.src.charCodeAt(t) === i; ) t++;
    return t >= a && (l = !1), (n = t - s) >= 4 ? l = c = !1 : (32 !== (r = t < a ? o.src.charCodeAt(t) : -1) && 10 !== r || (l = !1), 
    32 !== p && 10 !== p || (c = !1), 95 === i && (e(p) && (l = !1), e(r) && (c = !1))), 
    {
        can_open: l,
        can_close: c,
        delims: n
    };
}

module.exports = function(e, s) {
    var p, r, n, t, l, c, a, i = e.posMax, u = e.pos, f = e.src.charCodeAt(u);
    if (95 !== f && 42 !== f) return !1;
    if (s) return !1;
    if (a = o(e, u), p = a.delims, !a.can_open) return e.pos += p, s || (e.pending += e.src.slice(u, e.pos)), 
    !0;
    if (e.level >= e.options.maxNesting) return !1;
    for (e.pos = u + p, c = [ p ]; e.pos < i; ) if (e.src.charCodeAt(e.pos) !== f) e.parser.skipToken(e); else {
        if (a = o(e, e.pos), r = a.delims, a.can_close) {
            for (t = c.pop(), l = r; t !== l; ) {
                if (l < t) {
                    c.push(t - l);
                    break;
                }
                if (l -= t, 0 === c.length) break;
                e.pos += t, t = c.pop();
            }
            if (0 === c.length) {
                p = t, n = !0;
                break;
            }
            e.pos += r;
            continue;
        }
        a.can_open && c.push(r), e.pos += r;
    }
    return n ? (e.posMax = e.pos, e.pos = u + p, s || (2 !== p && 3 !== p || e.push({
        type: "strong_open",
        level: e.level++
    }), 1 !== p && 3 !== p || e.push({
        type: "em_open",
        level: e.level++
    }), e.parser.tokenize(e), 1 !== p && 3 !== p || e.push({
        type: "em_close",
        level: --e.level
    }), 2 !== p && 3 !== p || e.push({
        type: "strong_close",
        level: --e.level
    })), e.pos = e.posMax + p, e.posMax = i, !0) : (e.pos = u, !1);
};