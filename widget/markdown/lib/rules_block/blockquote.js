module.exports = function(e, t, r, s) {
    var a, k, i, l, n, o, p, f, h, b, u, c = e.bMarks[t] + e.tShift[t], M = e.eMarks[t];
    if (c > M) return !1;
    if (62 !== e.src.charCodeAt(c++)) return !1;
    if (e.level >= e.options.maxNesting) return !1;
    if (s) return !0;
    for (32 === e.src.charCodeAt(c) && c++, n = e.blkIndent, e.blkIndent = 0, l = [ e.bMarks[t] ], 
    e.bMarks[t] = c, k = (c = c < M ? e.skipSpaces(c) : c) >= M, i = [ e.tShift[t] ], 
    e.tShift[t] = c - e.bMarks[t], f = e.parser.ruler.getRules("blockquote"), a = t + 1; a < r && (c = e.bMarks[a] + e.tShift[a], 
    M = e.eMarks[a], !(c >= M)); a++) if (62 !== e.src.charCodeAt(c++)) {
        if (k) break;
        for (u = !1, h = 0, b = f.length; h < b; h++) if (f[h](e, a, r, !0)) {
            u = !0;
            break;
        }
        if (u) break;
        l.push(e.bMarks[a]), i.push(e.tShift[a]), e.tShift[a] = -1337;
    } else 32 === e.src.charCodeAt(c) && c++, l.push(e.bMarks[a]), e.bMarks[a] = c, 
    k = (c = c < M ? e.skipSpaces(c) : c) >= M, i.push(e.tShift[a]), e.tShift[a] = c - e.bMarks[a];
    for (o = e.parentType, e.parentType = "blockquote", e.tokens.push({
        type: "blockquote_open",
        lines: p = [ t, 0 ],
        level: e.level++
    }), e.parser.tokenize(e, t, a), e.tokens.push({
        type: "blockquote_close",
        level: --e.level
    }), e.parentType = o, p[1] = e.line, h = 0; h < i.length; h++) e.bMarks[h + t] = l[h], 
    e.tShift[h + t] = i[h];
    return e.blkIndent = n, !0;
};