for (var r = [], e = 0; e < 256; e++) r.push(0);

"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
    r[e.charCodeAt(0)] = 1;
}), module.exports = function(e, o) {
    var s, t = e.pos, c = e.posMax;
    if (92 !== e.src.charCodeAt(t)) return !1;
    if (++t < c) {
        if ((s = e.src.charCodeAt(t)) < 256 && 0 !== r[s]) return o || (e.pending += e.src[t]), 
        e.pos += 2, !0;
        if (10 === s) {
            for (o || e.push({
                type: "hardbreak",
                level: e.level
            }), t++; t < c && 32 === e.src.charCodeAt(t); ) t++;
            return e.pos = t, !0;
        }
    }
    return o || (e.pending += "\\"), e.pos++, !0;
};