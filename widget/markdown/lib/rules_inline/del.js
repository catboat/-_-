module.exports = function(r, e) {
    var s, o, p, t, c, n = r.posMax, a = r.pos;
    if (126 !== r.src.charCodeAt(a)) return !1;
    if (e) return !1;
    if (a + 4 >= n) return !1;
    if (126 !== r.src.charCodeAt(a + 1)) return !1;
    if (r.level >= r.options.maxNesting) return !1;
    if (t = a > 0 ? r.src.charCodeAt(a - 1) : -1, c = r.src.charCodeAt(a + 2), 126 === t) return !1;
    if (126 === c) return !1;
    if (32 === c || 10 === c) return !1;
    for (o = a + 2; o < n && 126 === r.src.charCodeAt(o); ) o++;
    if (o > a + 3) return r.pos += o - a, e || (r.pending += r.src.slice(a, o)), !0;
    for (r.pos = a + 2, p = 1; r.pos + 1 < n; ) {
        if (126 === r.src.charCodeAt(r.pos) && 126 === r.src.charCodeAt(r.pos + 1) && (t = r.src.charCodeAt(r.pos - 1), 
        126 !== (c = r.pos + 2 < n ? r.src.charCodeAt(r.pos + 2) : -1) && 126 !== t && (32 !== t && 10 !== t ? p-- : 32 !== c && 10 !== c && p++, 
        p <= 0))) {
            s = !0;
            break;
        }
        r.parser.skipToken(r);
    }
    return s ? (r.posMax = r.pos, r.pos = a + 2, e || (r.push({
        type: "del_open",
        level: r.level++
    }), r.parser.tokenize(r), r.push({
        type: "del_close",
        level: --r.level
    })), r.pos = r.posMax + 2, r.posMax = n, !0) : (r.pos = a, !1);
};