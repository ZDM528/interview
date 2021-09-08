// 线性查找，二分查找(有序数组)


// let arr = [3, 5, 7, 88, 99, 99, 99, 300]
// var binaryFind = (arr, value, left, right) => {  //递归
//     if (left > right) return -1
//     let midNum = Math.floor((left + right) / 2)
//     let mid = arr[midNum]
//     if (mid > value) {
//         return binaryFind(arr, value, left, midNum - 1)
//     } else if (mid < value) {
//         return binaryFind(arr, value, midNum + 1, right)
//     } else {
//         let resArr = []
//         let temp = midNum
//         while (arr[temp] === value) {
//             resArr.push(temp)
//             temp--
//         }
//         midNum++
//         while (arr[midNum] === value) {
//             resArr.push(midNum)
//             midNum++
//         }
//         return resArr
//     }
// }

// console.log(binaryFind(arr, 99, 0, arr.length - 1))
// console.log(arr)

// 非递归
let arr = [3, 5, 7, 88, 99, 300]
var binaryFind = (arr, value, left, right) => {
    while (left <= right) {
        let midNum = Math.floor((left + right) / 2)
        let mid = arr[midNum]
        if (mid > value) {
            left = mid - 1
        } else if (mid < value) {
            right = mid + 1
        } else {
            return midNum
        }
    }
}

console.log(binaryFind(arr, 99, 0, arr.length - 1))
