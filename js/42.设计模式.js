// 单例模式
const singleton = function (name) {
    this.name = name
    this.instance = null
}

singleton.prototype.getName = function () {
    console.log(this.name)
}

singleton.getInstance = function (name) {
    if (!this.instance) { // 关键语句
        this.instance = new singleton(name)
    }
    return this.instance
}

const a = singleton.getInstance('a') // 通过 getInstance 来获取实例
const b = singleton.getInstance('b')
console.log(a === b)
//发布订阅模式 观察者模式

