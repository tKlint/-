this.a = 1;
exports.b = 2;
exports = {
    c: 3
}


module.exports = {
    d: 5
}

console.log({selft: this, exports, module})
