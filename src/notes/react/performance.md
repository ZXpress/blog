# React 性能优化 [](#performance)

## 避免不必要的渲染 [](#避免不必要的渲染)

### 类组件 shouldComponentUpdate

使用 shouldComponentUpdate 生命周期函数，这个方法用来判断是否需要调用 render 方法重新描绘 dom，因为在发生数据变更时，react 会以变更组件为根目录进行重新渲染，为避免父组件更新引起不必要的子组件更新，或者某个组件重新渲染后跟原来其实一样，如果我们能在 shouldComponentUpdate 方法中写出更优化的 dom diff 算法，如加入 state 和 props 没有变化时就不去渲染组件的逻辑判断，则可以省去 diff 操作，避免不必要的渲染，可以极大的提高性能

```js
shouldComponentUpdate(nextProps, nextState){
    //nextProps:表示下一个props
    //nextState:表示下一个state的值
    //组件是否需要更新，需要返回一个布尔值，返回true则更新，返回flase不更新，这是一个关键点
    console.log('shouldComponentUpdate组件是否应该更新，需要返回布尔值',nextProps, nextState)
    return true
}
```

### 函数组件 React.memo

在函数组件中，要防止组件重新渲染可以使用高阶组件 React.memo()，在第二个参数中，通过返回 true 阻止函数组件想渲染，与 shouldComponentUpdate 不同的是，React.memo 不是阻断渲染，而是跳过渲染组件并直接`复用最近一次渲染`的结果，这与 shouldComponentUpdate 是完全不同的
<a href="/notes/react/memo">跳转</a>

## 组件卸载前进行清理操作 [](#组件卸载前进行清理操作)

在组件卸载前清理全局注册事件、定时器

## PureComponent [](#purecomponent)

PureComponent 内部自动实现了 shouldComponentUpdate 钩子，不需要手动比较，纯组件内部通过分别对比前后两次 props 和 state 的值，来决定是否重新渲染组件。内部比较为浅层对比，值类型比较两个值是否相同，引用类型只比较对象的引用地址是否相同

和进行 diff 比较操作相比，浅层比较将消耗更少的性能，diff 操作会重新遍历整颗 virtualDOM 树, 而浅层比较只操作当前组件的 state 和 props

## 组件懒加载 [](#组件懒加载)

### 路由组件懒加载

使用 suspense 和 lazy

```js
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const List = lazy(() => import('./List'))

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
      <Switch>
        <Suspense fallback={<div>Loading</div>}>
          <Route path="/" component={Home} exact />
          <Route path="/list" component={List} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  )
}
export default App
```

### 根据条件进行组件懒加载

```js
import React, { lazy, Suspense } from 'react'

function App() {
  let LazyComponent = null
  if (true) {
    LazyComponent = lazy(() => import('./Home'))
  } else {
    LazyComponent = lazy(() => import('./List'))
  }
  return (
    <Suspense fallback={<div>Loading</div>}>
      <LazyComponent />
    </Suspense>
  )
}
export default App
```

## 使用 Fragmen 避免额外标记 [](#使用fragmen避免额外标记)

多个同级元素必须有一个共同的父级，避免无意义的 div 减轻浏览器渲染引擎的负担，使用 React.Fragment 占位符标记

```js
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <div>message a</div>
      <div>message b</div>
    </Fragment>
  )
}

// 简写
function App() {
  return (
    <>
      <div>message a</div>
      <div>message b</div>
    </>
  )
}
```

## 不要使用内联函数定义 [](#不要使用内联函数定义)

在使用内联函数后, render 方法每次运行时都会创建该函数的新实例, 导致 React 在进行 Virtual DOM 比对时, 新旧函数比对不相等，导致 React 总是为元素绑定新的函数实例, 而旧的函数实例又要交给垃圾回收器处理

```js
import React from 'react'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }
  render() {
    return <input value={this.state.inputValue} onChange={(e) => this.setState({ inputValue: e.target.value })} />
  }
}
```

正确的做法是在组件中单独定义函数, 将函数绑定给事件

```js
import React from 'react'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }
  setInputValue = (e) => {
    this.setState({ inputValue: e.target.value })
  }
  render() {
    return <input value={this.state.inputValue} onChange={this.setInputValue} />
  }
}
```

## 避免使用内联样式属性 [](#避免使用内联样式属性)

当使用内联 style 为元素添加样式时, 内联 style 会被编译为 JavaScript 代码, 通过 JavaScript 代码将样式规则映射到元素的身上, 浏览器就会花费更多的时间执行脚本和渲染 UI, 从而增加了组件的渲染时间

```js
function App() {
  return <div style={{ backgroundColor: 'skyblue' }}>App works</div>
}
```

在上面的组件中, 为元素附加了内联样式, 添加的内联样式为 JavaScript 对象, backgroundColor 需要被转换为等效的 CSS 样式规则, 然后将其应用到元素, 这样涉及到脚本的执行

更好的办法是将 CSS 文件导入样式组件，能通过 CSS 直接做的事情就不要通过 JavaScript 去做，因为 JavaScript 操作 DOM 非常慢
