var worker = new Worker('worker.js', { name: 'worker1' })
worker.postMessage("向worker线程发送消息  hello world")
worker.onmessage = function (e) {
    console.log('接受子线程发送的消息', e.data);
}

// worker.terminate()  // 主线程关闭
worker.postMessage("向hello world")
console.log(window);