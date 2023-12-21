
// function makeFab() {
//     let last = 1, current = 1
//     return function inner() {
//         [current, last] = [current + last, current]
//         return last
//     }
// }
// let fab = makeFab()
// console.log(fab()) // 1console.log(fab()) // 2console.log(fab()) // 3console.log(fab()) 

// function debounce(func, time) {
//     let timer = 0
//     return function (...args) {
//         timer && clearTimeout(timer)
//         timer = setTimeout(() => {
//             timer = 0
//             func.apply(this, args)
//         }, time)
//     }
// }
// input.onkeypress = debounce(function () { console.log(input.value) }, 500)
