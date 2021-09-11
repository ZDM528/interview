console.log(self.name);
self.onmessage = function (e) {
    console.log(e.data);
}
self.close()  // 关闭子线程