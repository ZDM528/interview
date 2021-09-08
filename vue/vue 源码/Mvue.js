
const compileUtil = {
    getVal (expr, vm) {
        return expr.split('.').reduce((pre, cur) => {
            return pre[cur]
        }, vm.$data)
    },
    setVal (expr, vm, inputVal) {
        // console.log(expr);
        return expr.split('.').reduce((pre, cur) => {
            pre[cur] = inputVal
        }, vm.$data)
    },
    getContentVal (expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text (node, expr, vm) { // expr:msg <div v-text='msg'></div> <div v-text="person.name"></div>
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
    html (node, expr, vm) {
        const value = this.getVal(expr, vm)
        // 绑定观察者，监听数据发生变化
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
        // 双向数据绑定
        node.addEventListener('input', e => {
            this.setVal(expr, vm, e.target.value)
        })
        this.updater.modelUpdater(node, value)
    },
    on (node, expr, vm, eventName) {
        let fn = vm.$options && vm.$options.methods[expr]
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    bind (node, expr, vm, eventName) {

    },
    updater: {
        textUpdater (node, value) {
            node.textContent = value
        },
        htmlUpdater (node, value) {
            node.innerHTML = value
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
        // 获取文档碎片对象，放入内存中会减少回流和重绘
        const fragment = this.node2Fragment(this.el)
        this.compile(fragment)
        this.el.appendChild(fragment)
    }
    isElementNode (node) {
        return node.nodeType === 1
    }
    compile (fragment) {
        const childNodes = [...fragment.childNodes]
        childNodes.forEach(child => {
            if (this.isElementNode(child)) {
                // 元素节点
                this.compileElement(child)
            }
            else {
                // 文本节点
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
            if (this.isDirective(name)) { // 是指令 v-text v-html v-model v-on:click
                const [, dirctive] = name.split('-') // text html model  on:click
                const [dirname, eventName] = dirctive.split(':') // text html model on
                compileUtil[dirname](node, value, this.vm, eventName)
                node.removeAttribute("v-" + dirctive)
            }
            else if (this.isEventName(name)) { // @click
                const [, eventName] = name.split('@')
                compileUtil['on'](node, value, this.vm, eventName)
            }
        })
    }
    isDirective (attrName) {
        return attrName.startsWith('v-')
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
    node2Fragment (el) {
        const f = document.createDocumentFragment()
        let firstChild
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }
}

// 使用defineProperty进行数据劫持的缺点：
// 无法检测到对象属性的添加或删除
// 无法检测数组元素的变化，需要进行数组方法的重写(push,pop,shift,unshift,splice,reverse,sort)
// 无法检测数组的长度的修改
class Mvue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options
        if (this.$el) {
            // 实现一个数据观察者,进行数据劫持
            new Observer(this.$data)
            // 实现一个指令编译器
            new Compile(this.$el, this)
            this.proxyData(this.$data)
        }
    }
    proxyData (data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get () {
                    return data[key]
                },
                set (newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}