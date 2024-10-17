# render [](#render)

## 原理 [](#原理)

render 函数在 react 中有两种形式：

在类组件中，指的是 render 方法：

```js
class Foo extends React.Component {
  render() {
    return <h1> Foo </h1>
  }
}
```

在函数组件中，指的是函数组件本身

```js
function Foo() {
  return <h1> Foo </h1>
}
```

render 中编写的 jsx 通过 babel 编译后转化为 js 格式：

```js
return (
  <div className="cn">
    <Header> hello </Header>
    <div> start </div>
    Right Reserve
  </div>
)

// babel编译后

return React.createElement(
  'div',
  {
    className: 'cn'
  },
  React.createElement(Header, null, 'hello'),
  React.createElement('div', null, 'start'),
  'Right Reserve'
)
```

createElement 接受三个参数：

- type：标签
- attributes：标签属性，若无则为 null
- children：标签的子节点

在 render 过程中，React 将新调用的 render 函数返回的树与旧版本的树进行比较，是决定如何更新 DOM 的必要步骤，然后进行 diff 比较，更新 DOM 树

## 触发时机 [](#触发时机)

render 执行时机主要分成了两部分：

- 类组件调用 setState 修改状态

```js
class Foo extends React.Component {
  state = { count: 0 }

  increment = () => {
    const { count } = this.state

    const newCount = count < 10 ? count + 1 : count

    this.setState({ count: newCount })
  }

  render() {
    const { count } = this.state
    console.log('Foo render')

    return (
      <div>
        <h1> {count} </h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }
}
```

点击按钮，调用 setState 方法，无论 count 是否发生变化，都会打印 Foo render 证明 render 执行了

- 函数组件通过 useState 修改状态

```js
function Foo() {
  const [count, setCount] = useState(0)

  function increment() {
    const newCount = count < 10 ? count + 1 : count
    setCount(newCount)
  }

  console.log('Foo render')

  return (
    <div>
      <h1> {count} </h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

函数组件通过 useState 更新数据，当值不再改变了，就不会触发 render

- 类组件重新渲染

```js
class App extends React.Component {
  state = { name: 'App' }
  render() {
    return (
      <div className="App">
        <Foo />
        <button onClick={() => this.setState({ name: 'App' })}>Change name</button>
      </div>
    )
  }
}

function Foo() {
  console.log('Foo render')

  return (
    <div>
      <h1> Foo </h1>
    </div>
  )
}
```

只要点击了 App 组件内的按钮，不管 Foo 具体实现是什么，都会被重新 render 渲染

- 函数组件重新渲染

```js
function App() {
  const [name, setName] = useState('App')

  return (
    <div className="App">
      <Foo />
      <button onClick={() => setName('aaa')}>{name}</button>
    </div>
  )
}

function Foo() {
  console.log('Foo render')

  return (
    <div>
      <h1> Foo </h1>
    </div>
  )
}
```

使用 useState 更新状态的时候，只有首次会触发 Foo render，后面不会导致 Foo render

## 提高组件渲染效率 [](#提高组件渲染效率)

<a href='/notes/react/performance'>React 性能优化</a>
