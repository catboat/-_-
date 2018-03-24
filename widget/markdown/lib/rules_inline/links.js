var e = require("../helpers/parse_link_label"), r = require("../helpers/parse_link_destination"), s = require("../helpers/parse_link_title"), l = require("../helpers/normalize_reference");

module.exports = function(t, i) {
    var o, n, c, p, a, u, f, h, v = !1, d = t.pos, k = t.posMax, C = t.pos, A = t.src.charCodeAt(C);
    if (33 !== A) return !1;
    if (v = !0, 91 !== (A = t.src.charCodeAt(++C))) return !1;
    if (t.level >= t.options.maxNesting) return !1;
    if (o = C + 1, (n = e(t, C)) < 0) return !1;
    if ((u = n + 1) < k && 40 === t.src.charCodeAt(u)) {
        for (u++; u < k && (32 === (h = t.src.charCodeAt(u)) || 10 === h); u++) ;
        if (u >= k) return !1;
        for (C = u, r(t, u) ? (p = t.linkContent, u = t.pos) : p = "", C = u; u < k && (32 === (h = t.src.charCodeAt(u)) || 10 === h); u++) ;
        if (u < k && C !== u && s(t, u)) for (a = t.linkContent, u = t.pos; u < k && (32 === (h = t.src.charCodeAt(u)) || 10 === h); u++) ; else a = "";
        if (u >= k || 41 !== t.src.charCodeAt(u)) return t.pos = d, !1;
        u++;
    } else {
        if (t.linkLevel > 0) return !1;
        for (;u < k && (32 === (h = t.src.charCodeAt(u)) || 10 === h); u++) ;
        if (u < k && 91 === t.src.charCodeAt(u) && (C = u + 1, (u = e(t, u)) >= 0 ? c = t.src.slice(C, u++) : u = C - 1), 
        c || (void 0 === c && (u = n + 1), c = t.src.slice(o, n)), !(f = t.env.references[l(c)])) return t.pos = d, 
        !1;
        p = f.href, a = f.title;
    }
    return i || (t.pos = o, t.posMax = n, v ? t.push({
        type: "image",
        src: p,
        title: a,
        alt: t.src.substr(o, n - o),
        level: t.level
    }) : (t.push({
        type: "link_open",
        href: p,
        title: a,
        level: t.level++
    }), t.linkLevel++, t.parser.tokenize(t), t.linkLevel--, t.push({
        type: "link_close",
        level: --t.level
    }))), t.pos = u, t.posMax = k, !0;
};