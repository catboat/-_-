function e(e, t) {
    var n, l, i = e.bMarks[t] + e.tShift[t], r = e.eMarks[t];
    return i >= r ? -1 : 126 !== (l = e.src.charCodeAt(i++)) && 58 !== l ? -1 : (n = e.skipSpaces(i), 
    i === n ? -1 : n >= r ? -1 : n);
}

function t(e, t) {
    var n, l, i = e.level + 2;
    for (n = t + 2, l = e.tokens.length - 2; n < l; n++) e.tokens[n].level === i && "paragraph_open" === e.tokens[n].type && (e.tokens[n + 2].tight = !0, 
    e.tokens[n].tight = !0, n += 2);
}

module.exports = function(n, l, i, r) {
    var s, k, p, o, d, f, h, a, b, v, u, y, c, I;
    if (r) return !(n.ddIndent < 0) && e(n, l) >= 0;
    if (h = l + 1, n.isEmpty(h) && ++h > i) return !1;
    if (n.tShift[h] < n.blkIndent) return !1;
    if ((s = e(n, h)) < 0) return !1;
    if (n.level >= n.options.maxNesting) return !1;
    f = n.tokens.length, n.tokens.push({
        type: "dl_open",
        lines: d = [ l, 0 ],
        level: n.level++
    }), p = l, k = h;
    e: for (;;) {
        for (I = !0, c = !1, n.tokens.push({
            type: "dt_open",
            lines: [ p, p ],
            level: n.level++
        }), n.tokens.push({
            type: "inline",
            content: n.getLines(p, p + 1, n.blkIndent, !1).trim(),
            level: n.level + 1,
            lines: [ p, p ],
            children: []
        }), n.tokens.push({
            type: "dt_close",
            level: --n.level
        }); ;) {
            if (n.tokens.push({
                type: "dd_open",
                lines: o = [ h, 0 ],
                level: n.level++
            }), y = n.tight, b = n.ddIndent, a = n.blkIndent, u = n.tShift[k], v = n.parentType, 
            n.blkIndent = n.ddIndent = n.tShift[k] + 2, n.tShift[k] = s - n.bMarks[k], n.tight = !0, 
            n.parentType = "deflist", n.parser.tokenize(n, k, i, !0), n.tight && !c || (I = !1), 
            c = n.line - k > 1 && n.isEmpty(n.line - 1), n.tShift[k] = u, n.tight = y, n.parentType = v, 
            n.blkIndent = a, n.ddIndent = b, n.tokens.push({
                type: "dd_close",
                level: --n.level
            }), o[1] = h = n.line, h >= i) break e;
            if (n.tShift[h] < n.blkIndent) break e;
            if ((s = e(n, h)) < 0) break;
            k = h;
        }
        if (h >= i) break;
        if (p = h, n.isEmpty(p)) break;
        if (n.tShift[p] < n.blkIndent) break;
        if ((k = p + 1) >= i) break;
        if (n.isEmpty(k) && k++, k >= i) break;
        if (n.tShift[k] < n.blkIndent) break;
        if ((s = e(n, k)) < 0) break;
    }
    return n.tokens.push({
        type: "dl_close",
        level: --n.level
    }), d[1] = h, n.line = h, I && t(n, f), !0;
};