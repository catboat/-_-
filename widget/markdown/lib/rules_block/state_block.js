function t(t, s, i, r, h) {
    var e, n, o, a, p, u, c;
    for (this.src = t, this.parser = s, this.options = i, this.env = r, this.tokens = h, 
    this.bMarks = [], this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, 
    this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, 
    this.level = 0, this.result = "", u = 0, c = !1, o = a = u = 0, p = (n = this.src).length; a < p; a++) {
        if (e = n.charCodeAt(a), !c) {
            if (32 === e) {
                u++;
                continue;
            }
            c = !0;
        }
        10 !== e && a !== p - 1 || (10 !== e && a++, this.bMarks.push(o), this.eMarks.push(a), 
        this.tShift.push(u), c = !1, u = 0, o = a + 1);
    }
    this.bMarks.push(n.length), this.eMarks.push(n.length), this.tShift.push(0), this.lineMax = this.bMarks.length - 1;
}

t.prototype.isEmpty = function(t) {
    return this.bMarks[t] + this.tShift[t] >= this.eMarks[t];
}, t.prototype.skipEmptyLines = function(t) {
    for (var s = this.lineMax; t < s && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++) ;
    return t;
}, t.prototype.skipSpaces = function(t) {
    for (var s = this.src.length; t < s && 32 === this.src.charCodeAt(t); t++) ;
    return t;
}, t.prototype.skipChars = function(t, s) {
    for (var i = this.src.length; t < i && this.src.charCodeAt(t) === s; t++) ;
    return t;
}, t.prototype.skipCharsBack = function(t, s, i) {
    if (t <= i) return t;
    for (;t > i; ) if (s !== this.src.charCodeAt(--t)) return t + 1;
    return t;
}, t.prototype.getLines = function(t, s, i, r) {
    var h, e, n, o, a, p = t;
    if (t >= s) return "";
    if (p + 1 === s) return e = this.bMarks[p] + Math.min(this.tShift[p], i), n = r ? this.eMarks[p] + 1 : this.eMarks[p], 
    this.src.slice(e, n);
    for (o = new Array(s - t), h = 0; p < s; p++, h++) (a = this.tShift[p]) > i && (a = i), 
    a < 0 && (a = 0), e = this.bMarks[p] + a, n = p + 1 < s || r ? this.eMarks[p] + 1 : this.eMarks[p], 
    o[h] = this.src.slice(e, n);
    return o.join("");
}, module.exports = t;