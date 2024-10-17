# React 中项目捕获错误 [](#react项目捕获错误)

## 错误边界 [](#错误边界)

为了解决出现的错误导致整个应用崩溃的问题，react16 引用了错误边界新的概念

错误边界是一种 react 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误

形成错误边界组件的两个条件：

- 使用了 static getDerivedStateFromError()
- 使用了 componentDidCatch()

抛出错误后，请使用 static getDerivedStateFromError()渲染备用 UI，使用 componentDidCatch()打印错误信息

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

// 然后就可以把组件放在错误边界组件的下面

;<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

下面这些情况无法捕获到异常：

- 事件处理
- 异步代码
- 服务端渲染
- 自身跑出来的错误

对于错误边界无法捕获的异常，如事件处理过程中发生问题并不会捕获到，是因为其不会在渲染期间触发，并不会导致渲染时候问题，这种情况可以使用 js 的 try...catch...语法

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    try {
      // 执行操作，如有错误则会抛出
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <button onClick={this.handleClick}>Click Me</button>
  }
}
```

除此之外还可以通过监听 onerror 事件

```js
window.addEventListener('error', function(event) { ... })
```
