import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded',function () {
        FastClick.attach(document.body)
    }, false)
}

function modifileRootRem() {
    const root = window.document.documentElement
    const fontSize = parseFloat(root.style.fontSize)
    const finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue('font-size'))
    if (finalFontSize === fontSize) return
    root.style.fontSize = `${fontSize + (fontSize - finalFontSize)}px`
}

function screenWidth () {
    return window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
}

// 计算跟的font-size
const flexBox = () => {
    // 获取浏览器窗口宽度
    const width = screenWidth()
    // 按照750设计稿，比例为100
    let fontSize = width / 7.5
    document.documentElement.style.fontSize = `${fontSize}px`
    modifileRootRem()
}
export default flexBox
