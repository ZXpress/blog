# 什么是 JSX [](#什么是jsx)

JSX 是 JavaScript 语法的一种语法扩展，并拥有 JavaScript 的全部功能。你可以将任何的 JavaScript 表达式封装在花括号里，然后将其嵌入到 JSX 中，在编译完成之后，JSX 会被转化为普通的 JavaScript 对象，所以可以在 if 语句和 for 循环内部使用 JSX，将它赋值给变量，当作参数传入，作为返回值也都是允许的。JSX 也可以看成是 React.createElement()的语法糖，它可以被 babel 等工具编译生成 React 元素，也就是虚拟 dom
