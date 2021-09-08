
import Component from '../react/component'
import { diff, diffNode } from './diff'
const ReactDOM = {
    render
}


function render(vnode, container, dom) {
    // return container.appendChild(_render(vnode))
    return diff(dom, vnode, container)
}

export function createComponent(comp, props) {
    let inst
    // 如果是类组件，则创建实例，返回
    if (comp.prototype && comp.prototype.render) {
        inst = new comp(props)
    } else {
        //如果是函数组件，将函数组件扩展为类组件，方便后面统一管理
        inst = new Component(props)
        inst.constructor = comp
        // 定义render函数
        inst.render = function () {
            return this.constructor(props)
        }
    }
    return inst
}

export function setComponentProps(comp, props) {
    if (!comp.base) {
        if (comp.componentWillMount) {
            comp.componentWillMount()
        }
    }
    else if (comp.componentWillReceiveProps) {
        comp.componentWillReceiveProps()
    }
    comp.props = props
    // 渲染组件
    renderComponent(comp)
}

export function renderComponent(comp) {
    let base
    const renderer = comp.render()
    // 更改的部分
    // base = _render(renderer)
    base = diffNode(comp.base, renderer)
    if (comp.base && comp.componentWillUpdate) {
        comp.componentWillUpdate()
    }
    if (comp.base) {
        if (comp.componentDidUpdate) {
            comp.componentDidUpdate()
        }
    }
    else if (comp.componentDidMount) {
        comp.componentDidMount()
    }
    // 节点替换
    // if (comp.base && comp.base.parentNode) {
    //     comp.base.parentNode.replaceChild(base, comp.base)
    // }
    comp.base = base
}

// 设置属性
export function setAttribute(dom, key, value) {
    if (key === 'className') {
        key = 'class'
        dom[key] = value
    }
    // 如果是事件 onClick onBlur
    if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
    }
    else if (key === 'style') {
        if (!value || typeof value === "string") {
            dom.style.cssText = value || ''
        }
        else if (value && typeof value === 'object') {
            // style={width:20}
            for (let k in value) {
                if (typeof value[key] === 'number') {
                    dom.style[k] = value[k] + 'px'
                }
                else {
                    dom.style[k] = value[k]
                }
            }
        }

    }
    else {
        // 其他属性
        if (key in dom) {
            dom[key] = value || ''
        }
        if (value) {
            dom.setAttribute(key, value)
        }
        else {
            dom.removeAttribute(key)
        }
    }
}
export default ReactDOM