module.exports = function(r, e) {
    var s, o, p, t, c, a = r.posMax, n = r.pos;
    if (61 !== r.src.charCodeAt(n)) return !1;
    if (e) return !1;
    if (n + 4 >= a) return !1;
    if (61 !== r.src.charCodeAt(n + 1)) return !1;
    if (r.level >= r.options.maxNesting) return !1;
    if (t = n > 0 ? r.src.charCodeAt(n - 1) : -1, c = r.src.charCodeAt(n + 2), 61 === t) return !1;
    if (61 === c) return !1;
    if (32 === c || 10 === c) return !1;
    for (o = n + 2; o < a && 61 === r.src.charCodeAt(o); ) o++;
    if (o !== n + 2) return r.pos += o - n, e || (r.pending += r.src.slice(n, o)), !0;
    for (r.pos = n + 2, p = 1; r.pos + 1 < a; ) {
        if (61 === r.src.charCodeAt(r.pos) && 61 === r.src.charCodeAt(r.pos + 1) && (t = r.src.charCodeAt(r.pos - 1), 
        61 !== (c = r.pos + 2 < a ? r.src.charCodeAt(r.pos + 2) : -1) && 61 !== t && (32 !== t && 10 !== t ? p-- : 32 !== c && 10 !== c && p++, 
        p <= 0))) {
            s = !0;
            break;
        }
        r.parser.skipToken(r);
    }
    return s ? (r.posMax = r.pos, r.pos = n + 2, e || (r.push({
        type: "mark_open",
        level: r.level++
    }), r.parser.tokenize(r), r.push({
        type: "mark_close",
        level: --r.level
    })), r.pos = r.posMax + 2, r.posMax = a, !0) : (r.pos = n, !1);
};