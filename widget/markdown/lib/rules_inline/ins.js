module.exports = function(r, e) {
    var s, o, p, t, c, n = r.posMax, i = r.pos;
    if (43 !== r.src.charCodeAt(i)) return !1;
    if (e) return !1;
    if (i + 4 >= n) return !1;
    if (43 !== r.src.charCodeAt(i + 1)) return !1;
    if (r.level >= r.options.maxNesting) return !1;
    if (t = i > 0 ? r.src.charCodeAt(i - 1) : -1, c = r.src.charCodeAt(i + 2), 43 === t) return !1;
    if (43 === c) return !1;
    if (32 === c || 10 === c) return !1;
    for (o = i + 2; o < n && 43 === r.src.charCodeAt(o); ) o++;
    if (o !== i + 2) return r.pos += o - i, e || (r.pending += r.src.slice(i, o)), !0;
    for (r.pos = i + 2, p = 1; r.pos + 1 < n; ) {
        if (43 === r.src.charCodeAt(r.pos) && 43 === r.src.charCodeAt(r.pos + 1) && (t = r.src.charCodeAt(r.pos - 1), 
        43 !== (c = r.pos + 2 < n ? r.src.charCodeAt(r.pos + 2) : -1) && 43 !== t && (32 !== t && 10 !== t ? p-- : 32 !== c && 10 !== c && p++, 
        p <= 0))) {
            s = !0;
            break;
        }
        r.parser.skipToken(r);
    }
    return s ? (r.posMax = r.pos, r.pos = i + 2, e || (r.push({
        type: "ins_open",
        level: r.level++
    }), r.parser.tokenize(r), r.push({
        type: "ins_close",
        level: --r.level
    })), r.pos = r.posMax + 2, r.posMax = n, !0) : (r.pos = i, !1);
};