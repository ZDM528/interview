// 事件循环机制 异步 任务队列
process.nextTick(function A () {
    console.log(1);
    process.nextTick(function B () { console.log(3); });
});
setImmediate(function A () {
    console.log(1);
    setImmediate(function B () { console.log(2); });
});
setTimeout(function timeout () {
    console.log(4);
}, 10)

process.nextTick(function A () {
    console.log(2);
});