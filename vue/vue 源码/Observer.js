class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先把旧值保存起来
        this.oldVal = this.getOldValue()
    }
    update () {
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if (newVal !== this.newVal) {
            console.log(this.cb);
            this.cb(newVal)
        }
    }
    getOldValue () {
        Dep.target = this
        const oldVal = compileUtil.getVal(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
}

// 发布订阅模式
// 将每一个watch实例储存在数组中 订阅
// 当有数据发生变动时，依次执行subs数组中的watcher实例   发布
class Dep {
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub (watcher) {
        this.subs.push(watcher)
    }
    // 通知观察者去更新
    notify () {
        this.subs.forEach(w => w.update())
    }
}
class Observer {
    constructor(data) {
        this.observe(data)
    }
    observe (data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive (data, key, value) {
        // 递归遍历
        this.observe(value)
        const dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get () {
                console.log(value);
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                this.observe(newVal)
                if (newVal !== value) {
                    value = newVal
                }
                dep.notify()
            }
        })
    }
}


