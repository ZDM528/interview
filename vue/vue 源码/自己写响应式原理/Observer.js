class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.oldVal = this.getOldValue()
    }
    update () {
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if (newVal !== this.newVal) {
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



class Dep {
    constructor() {
        this.subs = []
    }
    addSub (watcher) {
        this.subs.push(watcher)
    }
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
        this.observe(value)
        const dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get () {
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