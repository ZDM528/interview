const compileUtil = {
    getVal (expr, vm) {
        return expr.split(".").reduce((pre, cur) => {
            return pre[cur]
        }, vm.$data)
    },
    setVal (expr, vm, inputVal) {
        return expr.split(".").reduce((pre, cur) => {
            pre[cur] = inputVal
        }, vm.$data)
    },
    getContentVal (expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    html (node, expr, vm) {
        const value = this.getVal(expr, vm)
        new Watcher(vm, expr, newVal => {
            this.updater.htmlUpdater(node, newVal)
        })
        this.updater.htmlUpdater(node, value)
    },
    model (node, expr, vm) {
        const value = this.getVal(expr, vm)
        new Watcher(vm, expr, newVal => {
            this.updater.modelUpdater(node, newVal)
        })
        node.addEventListener("input", e => {
            this.setVal(expr, vm, e.target.value)
        })
        this.updater.modelUpdater(node, value)
    },
    text (node, expr, vm) {
        let value;
        if (expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watcher(vm, args[1], newVal => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm))
                })
                return this.getVal(args[1], vm)
            })
        }
        else {
            value = this.getVal(expr, vm)
        }
        this.updater.textUpdater(node, value)
    },
    on (node, expr, vm, eventName) {
        let fn = vm.$options && vm.$options.methods[expr]
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    updater: {
        htmlUpdater (node, value) {
            node.innerHTML = value
        },
        textUpdater (node, value) {
            node.textContent = value
        },
        modelUpdater (node, value) {
            node.value = value
        }
    }
}


class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        const fragment = this.nodeFragment(this.el)
        this.compile(fragment)
        this.el.appendChild(fragment)
    }
    compile (fragment) {
        const childNodes = [...fragment.childNodes]
        childNodes.forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child)
            } else {
                this.compileText(child)
            }
            if (child.childNodes && child.childNodes.length) {
                this.compile(child)
            }
        })
    }
    compileElement (node) {
        const attributes = [...node.attributes]
        attributes.forEach(attr => {
            const { name, value } = attr
            if (this.isDirective(name)) {
                const [, directive] = name.split("-")
                const [dirname, eventName] = directive.split(":")
                compileUtil[dirname](node, value, this.vm, eventName)
                node.removeAttribute("v-" + directive)
            } else if (this.isEventName(name)) {
                const [, eventName] = name.split('@')
                compileUtil['on'](node, value, this.vm, eventName)
            }
        })
    }
    isDirective (attrName) {
        return attrName.startsWith("v-")
    }
    isEventName (attrName) {
        return attrName.startsWith("@")
    }
    compileText (node) {
        const content = node.textContent
        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm)
        }
    }
    isElementNode (node) {
        return node.nodeType === 1
    }
    nodeFragment (el) {
        const f = document.createDocumentFragment()
        let firstChild
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f

    }
}

class Vue {
    constructor(option) {
        this.$data = option.data
        this.$el = option.el
        this.$options = option
        if (this.$el) {
            new Observer(this.$data)
            new Compile(this.$el, this)
            this.proxyData(this.$data)
        }
    }
    proxyData (data) {
        Object.keys(data).map(key => {
            Object.defineProperty(this, key, {
                get () {
                    return data[key]
                },
                set (val) {
                    data[key] = val
                }
            })
        })
    }
}


let arr = [{
    id: 1,
    time: 1,
    pid: 0
}, {
    id: 2,
    time: 2,
    pid: 1
}, {
    id: 3,
    time: 3,
    pid: 2
}]
function minTime (arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        let maxTime = arr[i].pid.time;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].pid === arr[j].pid && maxTime < arr[j].pid.time) {
                maxTime = arr[j].pid.time;
            }
        }
    }
}

minTime(arr);