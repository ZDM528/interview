// x = 3
// var res = x++ + ++x + ++x * 2 + x-- + x - 10
// console.log(res, x);

var x = function msg () { }
console.log(typeof msg) // undefined


//算法1 将一个数组往后移动K个数  189.旋转数组  力扣
// 解法一：
// var rotate = function (nums, k) {
//     let newA = []
//     for (let i = 0; i < nums.length; i++) {
//         newA[(i + k) % nums.length] = nums[i]
//     }
//     for (let i = 0; i < nums.length; i++) {
//         nums[i]=newA[i]
//     }
// }

// 解法二：
// const reverse = (nums, start, end) => {
//     while (start < end) {
//         const temp = nums[start];
//         nums[start] = nums[end];
//         nums[end] = temp;
//         start += 1;
//         end -= 1;
//     }
// }
// var rotate = function (nums, k) {
//     k %= nums.length;
//     reverse(nums, 0, nums.length - 1);
//     reverse(nums, 0, k - 1);
//     reverse(nums, k, nums.length - 1);
// };


// 算法2  统计字符串中连续出现最多的字符和个数     abcaakjbb  {a:2,b:2}
// 解法一
// function maxCount (str) {
//     let count = new Array(str.length).fill(1)
//     let flag = false
//     let saveIndex
//     let res={}
//     for (let i = 0; i < str.length; i++) {
//         while (str[i] === str[i + 1]) {
//             if (!flag) {
//                 saveIndex = i
//             }
//             count[saveIndex]++
//             i++
//             flag = true
//         }
//         flag = false
//     }

//     let maxCount = Math.max(...count)
//     for (let i = 0; i < count.length; i++) {
//         if(count[i]===maxCount){
//             res[str[i]]=maxCount
//         }
//     }
//     console.log(count)
//     return res
// }

//解法二
// const str = 'abbkejsbcccwqaa';
// function maxCount (str) {
//     const arr = str.match(/(\w)\1+/g);  //https://blog.csdn.net/feinifi/article/details/85053853
//     const maxLen = Math.max(...arr.map(s => s.length));
//     const result = arr.reduce((pre, curr) => {
//         if (curr.length === maxLen) {
//             pre[curr[0]] = curr.length;
//         }
//         return pre;
//     }, {});
//     return result
// }
// console.log(maxCount("abcaakjbb"))

// 算法2  统计字符串中出现最多的字符
function maxNum (str) {
    let arr = str.split("")
    let res = arr.reduce((pre, cur) => {
        if (cur in pre) {
            pre[cur]++
        } else {
            pre[cur] = 1
        }
        return pre
    }, {})

    let max = 0
    let resNum
    for (let key in res) {
        if (res[key] > max) {
            max = res[key]
            resNum = key
        }
    }
    return resNum
}

console.log(maxNum("abbdjiijijiiaaaddddddddddff"))