function s(s) {
    switch (s) {
      case 32:
      case 10:
      case 92:
      case 96:
      case 42:
      case 95:
      case 94:
      case 91:
      case 93:
      case 33:
      case 38:
      case 60:
      case 62:
      case 123:
      case 125:
      case 36:
      case 37:
      case 64:
      case 126:
      case 43:
      case 61:
      case 58:
        return !0;

      default:
        return !1;
    }
}

module.exports = function(e, c) {
    for (var a = e.pos; a < e.posMax && !s(e.src.charCodeAt(a)); ) a++;
    return a !== e.pos && (c || (e.pending += e.src.slice(e.pos, a)), e.pos = a, !0);
};