function t(t, e, s, i, h) {
    this.src = t, this.env = i, this.options = s, this.parser = e, this.tokens = h, 
    this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", 
    this.pendingLevel = 0, this.cache = [], this.isInLabel = !1, this.linkLevel = 0, 
    this.linkContent = "", this.labelUnmatchedScopes = 0;
}

t.prototype.pushPending = function() {
    this.tokens.push({
        type: "text",
        content: this.pending,
        level: this.pendingLevel
    }), this.pending = "";
}, t.prototype.push = function(t) {
    this.pending && this.pushPending(), this.tokens.push(t), this.pendingLevel = this.level;
}, t.prototype.cacheSet = function(t, e) {
    for (var s = this.cache.length; s <= t; s++) this.cache.push(0);
    this.cache[t] = e;
}, t.prototype.cacheGet = function(t) {
    return t < this.cache.length ? this.cache[t] : 0;
}, module.exports = t;