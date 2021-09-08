//字符串匹配问题
//暴力解法
// let str1 = 'aabbcc 111';
// let str2 = 'bbc';
// function match (str1, str2) {
//     let str1L = str1.length;
//     let str2L = str2.length;
//     let i = 0;
//     let j = 0;
//     while (i < str1L && j < str2L) {
//         if (str1[i] === str2[j]) {
//             i++;
//             j++;
//         } else {
//             i = i - j + 1
//             j = 0
//         }
//     }
//     if (j === str2L) {
//         return i - j
//     }
//     return -1
// }
// console.log(match(str1, str2));
//kmp算法

let str1 = 'accc';
let str2 = 'acacccc';
function kmpNext (str2) {
    let next = []
    next[0] = 0
    for (let i = 1, j = 0; i < str2.length; i++) {
        while (j > 0 && str2[i] !== str2[j]) {
            j = next[j - 1]
        }
        if (str2[i] === str2[j]) {
            j++
        }
        next[i] = j
    }
    return next
}
function match (str1, str2) {
    let next = kmpNext(str2)
    for (let i = 0, j = 0; i < str1.length; i++) {
        while (j > 0 && str1[i] !== str2[j]) {
            j = next[j - 1]
        }
        if (str1[i] === str2[j]) {
            j++
        }
        if (j == str2.length) {
            return i - j + 1
        }
    }
}
console.log(match(str1, str2));


