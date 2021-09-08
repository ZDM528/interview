import Component from '../react/component'


const React = {
    createElement
}

function createElement(tag, attrs, ...childrens) {
    attrs = attrs || {}
    return {
        tag,
        attrs,
        childrens,
        key: attrs.key || null
    }
}

export default {
    createElement,
    Component
}