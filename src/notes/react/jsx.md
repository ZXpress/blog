# 什么是 JSX [](#什么是jsx)

JSX 是 JavaScript 语法的一种语法扩展，并拥有 JavaScript 的全部功能。你可以将任何的 JavaScript 表达式封装在花括号里，然后将其嵌入到 JSX 中，在编译完成之后，JSX 会被转化为普通的 JavaScript 对象，所以可以在 if 语句和 for 循环内部使用 JSX，将它赋值给变量，当作参数传入，作为返回值也都是允许的。JSX 也可以看成是 React.createElement()的语法糖。jsx 代码本身不能被浏览器读取，它可以被 babel、webpack 等工具编译生成 React 元素，也就是虚拟 dom

JSX 可以让你在 JS 中通过 XML 的方式直接声明界面的 DOM 结构

```jsx
// 创建 h1 标签，右边千万不能加引号
const vDom = <h1>Hello World</h1>
// 找到 <div id="root"></div> 节点
const root = document.getElementById('root')
// 把创建的 h1 标签渲染到 root 节点上
ReactDOM.render(vDom, root)
```

上述中，ReactDOM.render() 用于将你创建好的虚拟 DOM 节点插入到某个真实节点上，并渲染到页面上

JSX 实际是一种语法糖，在使用过程中会被 babel 进行编译转化成 React.createElement 执行，返回值也是一个对象，也就是虚拟 DOM

```jsx
const vDom = React.createElement(
  'h1'，
  { className: 'hClass', id: 'hId' },
  'hello world'
)
```

可以看到，JSX 就是为了简化直接调用 React.createElement()方法：

- 第一个参数是标签名，例如 h1、span、table 等

- 第二个参数是个对象，里面存着标签的一些属性，例如 id、class 等

- 第三个参数是节点中的文本
