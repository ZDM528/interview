console.log(4399 + '2');  // 43992 数字转化为字符串
console.log('11' > '2');  // false  转换为ascii，比较第一个数字 1 <2  '11'<'2
console.log(222 < '30');  // false 222<30
// 1、纯字符串比较，转换成ASCII码在进行比较
// 2、纯数字和数字字符串相比较，则将字符串数字隐式转换成数字再进行比较
// 3、纯数字和非数字字符串比较，都返回false 
console.log('0' == true) //false  true 1 false 0 将字符串'0'转为0相当于false 0==false
console.log(0 == true) // false

// <!DOCTYPE>对大小写不敏感，doctype也可，非html标签元素，渲染

// DOMContenLoaded 先于load执行
// dom文件加载的步骤为：
// 1,解析HTML结构。
// 2,DOM树构建完成。//DOMContentLoaded
// 3,加载外部脚本和样式表文件。
// 4,解析并执行脚本代码。
// 5,加载图片等外部文件。
// 6,页面加载完毕。//load

function fun () {
    var a = 1
    let b = 2
    {
        let b = 3
        var c = 4
        let b = 5
        console.log(a, b)
    }
}
fun()

// vue混入