const a = require('./commonJs');

// console.log(a)

console.log(this === exports)
console.log(this === module.exports)