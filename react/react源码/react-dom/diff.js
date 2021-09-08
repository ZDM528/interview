import { setAttribute, setComponentProps, createComponent } from '../react-dom/index'

export function diff(dom, vnode, container) {
    // 对比节点的变化
    const ret = diffNode(dom, vnode)
    if (container) {
        container.appendChild(ret)
    }
    return ret
}

export function diffNode(dom, vnode) {
    let out = dom
    if (vnode === undefined || vnode === null || typeof vnode === Boolean) return;
    // 如果 vnode 是字符串
    if (typeof vnode === 'number') vnode = String(vnode)
    if (typeof vnode === 'string') {
        if (dom && dom.nodeType === 3) {  // 文本节点
            if (dom.textContent !== vnode) {
                dom.textContent = vnode
            }
        }
        else {
            out = document.createTextNode(vnode)
            if (dom && dom.parentNode) {
                dom.parentNode.replaceNode(out, dom)
            }
        }
        return out
    }
    if (typeof vnode.tag === 'function') {
        return diffComponent(out, vnode)
    }
    // 非文本
    if (!dom) {
        out = document.createElement(vnode.tag)
    }
    if (vnode.childrens && vnode.childrens.length > 0 || (out.childNodes && out.childNodes.length > 0)) {
        // 对比组件 或者子节点
        diffChildren(out, vnode.childrens)
    }
    diffAttribute(out, vnode)
    return out
}

function diffChildren(dom, vchildren) {  // element diff
    const domChildren = dom.childNodes
    const children = []
    const keyed = {}
    // 将有key的节点（用对象保存）和没有key的节点（用数组保存）分开
    // if (domChildren.length > 0) { }
    if (vchildren && vchildren.length > 0) {
        let min = 0
        let childrenLen = children.length
        let newVchildren = [...vchildren]
        newVchildren.forEach((vchild, i) => {
            const key = vchild.key
            let child
            if (key) {
                if (keyed[key]) {
                    child = keyed[key]
                    keyed[key] = undefined
                }
            }
            else if (childrenLen > min) {
                for (let j = min; j < childrenLen; j++) {
                    let c = children[j]
                    if (c) {
                        child = c
                        children[j] = undefined
                        if (j === childrenLen - 1) childrenLen--
                        if (j === min) min++
                        break
                    }
                }
            }
            // 对比
            child = diffNode(child, vchild)
            // 更新DOM
            const f = domChildren[i]
            if (child && child !== dom && child !== f) {
                // 如果更新前的对应位置为空，说明此节点是新增的
                if (!f) {
                    dom.appendChild(child)
                }
                else if (child === f.nextSibling) {
                    removeNode(f)
                    // 将更新后的节点移动到正确的位置
                }
                else {
                    dom.insertBefore(child, f)
                }
            }
        })
    }
}


function diffAttribute(dom, vnode) {
    // 保存之前的dom的所有属性
    let oldAttrs = {}
    let newAttrs = vnode.attrs
    // dom 是原有的节点对象，vnode虚拟DOM
    let domAttrs = dom.attributes
    let newDomAttrs = [...domAttrs]
    newDomAttrs.forEach(item => {
        oldAttrs[item.name] = item.value
    })
    // 对比，如果原来属性跟新的属性对比，不在新的属性中，则将其移除掉
    for (let key in oldAttrs) {
        if (!(key in newAttrs)) {
            setAttribute(dom, key, undefined)
        }
    }
    // 更新
    for (let key in newAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            setAttribute(dom, key, newAttrs[key])
        }
    }
}

function diffComponent(dom, vnode) {  // component diff
    // 如果组件没有变化，重新设置props
    let comp = dom
    if (comp && comp.constructor === vnode.tag) {
        // 重新设置props
        setComponentProps(comp, vnode.attrs)
        // 赋值 
        dom = comp.base
    }
    else {
        //组件类型发生变化
        if (comp) {
            // 先移除旧的组件
            unmountComponent(comp)
            comp = null
        }
        // 1 创建新的组件
        comp = createComponent(vnode.tag, vnode.attrs)
        // 2 设置组件属性
        setComponentProps(comp, vnode.attrs)
        // 3 给当前挂在Base
        dom = comp.base
    }
    return dom
}

function unmountComponent(comp) {
    removeNode(comp.base)
}
function removeNode(dom) {

}