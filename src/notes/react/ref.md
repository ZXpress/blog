# React 创建 ref 的的形式 [](#react创建ref的的形式)

## 传入字符串 [](#传入字符串)

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref="myref" />
  }
}
```

访问当前节点的方式如下：

```js
this.refs.myref.innerHTML = 'hello'
```

## 传入对象 [](#传入对象)

refs 通过 React.createRef()创建，然后将 ref 属性添加到 React 元素中

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```

当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中访问

```js
const node = this.myRef.current
```

## 传入函数 [](#传入函数)

当 ref 传入为一个函数的时候，在渲染过程中，回调函数参数为所在实例节点，内联函数形式在页面每次 render 的时候会调用两次，第一次返回 null，第二次得到实例节点，可以通过绑定外部函数形式解决

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={(element) => (this.myref = element)} />
  }
}
```

获取 ref 对象只需要通过先前存储的对象即可

```js
const node = this.myref
```

## 传入 hook [](#传入hook)

通过 useRef 创建一个 ref，整体使用方式与 React.createRef 一致

```js
function App(props) {
  const myref = useRef()
  return (
    <>
      <div ref={myref}></div>
    </>
  )
}
```

获取 ref 属性也是通过 hook 对象的 current 属性

```js
const node = myref.current
```
