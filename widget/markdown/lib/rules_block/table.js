function e(e, t) {
    var l = e.bMarks[t] + e.blkIndent, n = e.eMarks[t];
    return e.src.substr(l, n - l);
}

module.exports = function(t, l, n, s) {
    var r, o, p, i, h, u, v, c, f, k, a;
    if (l + 2 > n) return !1;
    if (h = l + 1, t.tShift[h] < t.blkIndent) return !1;
    if ((p = t.bMarks[h] + t.tShift[h]) >= t.eMarks[h]) return !1;
    if (124 !== (r = t.src.charCodeAt(p)) && 45 !== r && 58 !== r) return !1;
    if (o = e(t, l + 1), !/^[-:| ]+$/.test(o)) return !1;
    if ((u = o.split("|")) <= 2) return !1;
    for (c = [], i = 0; i < u.length; i++) {
        if (!(f = u[i].trim())) {
            if (0 === i || i === u.length - 1) continue;
            return !1;
        }
        if (!/^:?-+:?$/.test(f)) return !1;
        58 === f.charCodeAt(f.length - 1) ? c.push(58 === f.charCodeAt(0) ? "center" : "right") : 58 === f.charCodeAt(0) ? c.push("left") : c.push("");
    }
    if (-1 === (o = e(t, l).trim()).indexOf("|")) return !1;
    if (u = o.replace(/^\||\|$/g, "").split("|"), c.length !== u.length) return !1;
    if (s) return !0;
    for (t.tokens.push({
        type: "table_open",
        lines: k = [ l, 0 ],
        level: t.level++
    }), t.tokens.push({
        type: "thead_open",
        lines: [ l, l + 1 ],
        level: t.level++
    }), t.tokens.push({
        type: "tr_open",
        lines: [ l, l + 1 ],
        level: t.level++
    }), i = 0; i < u.length; i++) t.tokens.push({
        type: "th_open",
        align: c[i],
        lines: [ l, l + 1 ],
        level: t.level++
    }), t.tokens.push({
        type: "inline",
        content: u[i].trim(),
        lines: [ l, l + 1 ],
        level: t.level,
        children: []
    }), t.tokens.push({
        type: "th_close",
        level: --t.level
    });
    for (t.tokens.push({
        type: "tr_close",
        level: --t.level
    }), t.tokens.push({
        type: "thead_close",
        level: --t.level
    }), t.tokens.push({
        type: "tbody_open",
        lines: a = [ l + 2, 0 ],
        level: t.level++
    }), h = l + 2; h < n && !(t.tShift[h] < t.blkIndent) && -1 !== (o = e(t, h).trim()).indexOf("|"); h++) {
        for (u = o.replace(/^\||\|$/g, "").split("|"), t.tokens.push({
            type: "tr_open",
            level: t.level++
        }), i = 0; i < u.length; i++) t.tokens.push({
            type: "td_open",
            align: c[i],
            level: t.level++
        }), v = u[i].substring(124 === u[i].charCodeAt(0) ? 1 : 0, 124 === u[i].charCodeAt(u[i].length - 1) ? u[i].length - 1 : u[i].length).trim(), 
        t.tokens.push({
            type: "inline",
            content: v,
            level: t.level,
            children: []
        }), t.tokens.push({
            type: "td_close",
            level: --t.level
        });
        t.tokens.push({
            type: "tr_close",
            level: --t.level
        });
    }
    return t.tokens.push({
        type: "tbody_close",
        level: --t.level
    }), t.tokens.push({
        type: "table_close",
        level: --t.level
    }), k[1] = a[1] = h, t.line = h, !0;
};