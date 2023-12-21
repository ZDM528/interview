// 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
// 回文字符串 是正着读和倒过来读一样的字符串。
// 子字符串 是字符串中的由连续字符组成的一个序列。
// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

// var countSubstrings = function (s) {
//     const n = s.length;
//     const dp = new Array(n).fill(0).map(() => new Array(n).fill(true));
//     let count = 0;
//     for (let i = n - 1; i >= 0; i--) {
//         for (let j = i; j < n; j++) {
//             if (i == j) {
//                 dp[i][j] = true;
//                 count++;
//             } else if (s[i] == s[j] && j - i > 1 && dp[i + 1][j - 1]) {
//                 dp[i][j] = true;
//                 count++;
//             } else if (j - i == 1 && s[i] == s[j]) {
//                 dp[i][j] = true;
//                 count++;
//             }
//         }
//     }
//     return count;
// };

// var countSubstrings = function (s) {
//     const n = s.length;
//     const dp = new Array(n).fill(0).map(() => new Array(n).fill(true));
//     let count = 0;
//     for (let i = n - 1; i >= 0; i--) {
//         for (let j = i+1; j < n; j++) {
//             if (s[i] == s[j] && j - i > 1 && dp[i + 1][j - 1]) {
//                 dp[i][j] = true;
//                 count++;
//             } else if (j - i == 1 && s[i] == s[j]) {
//                 dp[i][j] = true;
//                 count++;
//             }
//         }
//     }
//     return count + n;
// };


// var countSubstrings = function (s) {
//     const n = s.length;
//     let count = 0;
//     for (let i = 0; i < 2 * n - 1; i++) {
//         let left = i / 2;
//         let right = i / 2 + i % 2;
//         while (left >= 0 && right < n && s[left] == s[right]) {
//             left--
//             right++;
//             count++;
//         }
//     }

//     return count;
// };
// console.log(countSubstrings("aaa"));

var isHuiwen = function (s) {
    // s = s.toUpperCase()
    let reg = /[^a-zA-Z0-9]/g;
    let newS = s.replace(reg, '').toLowerCase()
    const n = newS.length;
    const delta = (n + 1) % 2;
    const start = Math.floor(n / 2);
    let left = start;
    let right = start - delta;
    while (newS[left] == newS[right] && left >= 0 && right < n) {
        if (left == 0) {
            return true;
        }
        left--;
        right++;
    }
    return false;

}

console.log(isHuiwen(",,1111"))



//https://leetcode.cn/problems/palindromic-substrings/solutions/379987/hui-wen-zi-chuan-by-leetcode-solution/