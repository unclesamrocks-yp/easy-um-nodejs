const reg = new RegExp("\\'d", 'g')

console.log(reg)

const search = 'Some title 5 Some titl12.12.2019e 10sadasda10000000 New product'
const regexp = /\d{2}\.\d{2}\.\d{4}/.test(search)
console.log(regexp)

// console.log(search.match(/\w/g))
