# React 事件机制 [](#react事件机制)

## React 合成事件和原生事件的区别 [](#react合成事件和原生事件的区别)

- 事件名称命名方式不同

```js
// 原生事件绑定方式
;<button onclick="handleClick()">按钮命名</button>

// React 合成事件绑定方式
const button = <button onClick={handleClick}>按钮命名</button>
```

- 事件处理函数书写不同

```js
// 原生事件 事件处理函数写法
;<button onclick="handleClick()">按钮命名</button>

// React 合成事件 事件处理函数写法
const button = <button onClick={handleClick}>按钮命名</button>
```

## 执行顺序 [](#执行顺序)

```js
import React from 'react'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.parentRef = React.createRef()
    this.childRef = React.createRef()
  }
  componentDidMount() {
    console.log('React componentDidMount！')
    this.parentRef.current?.addEventListener('click', () => {
      console.log('原生事件：父元素 DOM 事件监听！')
    })
    this.childRef.current?.addEventListener('click', () => {
      console.log('原生事件：子元素 DOM 事件监听！')
    })
    document.addEventListener('click', (e) => {
      console.log('原生事件：document DOM 事件监听！')
    })
  }
  parentClickFun = () => {
    console.log('React 事件：父元素事件监听！')
  }
  childClickFun = () => {
    console.log('React 事件：子元素事件监听！')
  }
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    )
  }
}
export default App
```

输出顺序为：

```js
原生事件：子元素 DOM 事件监听！
原生事件：父元素 DOM 事件监听！
React 事件：子元素事件监听！
React 事件：父元素事件监听！
原生事件：document DOM 事件监听！
```

结论：

- React 所有事件都挂载在 document 对象上

- 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件

- 所以会先执行原生事件，然后处理 React 事件

- 最后真正执行 document 上挂载的事件

要阻止不同时间段的冒泡行为，对应使用不同的方法，对应如下：

- 阻止合成事件的冒泡，用 e.stopPropagation()

- 阻止合成事件与最外层 document 上的事件间的冒泡，用 e.nativeEvent.stopImmediatePropagation()

- 阻止合成事件与除最外层 document 上的原生事件上的冒泡，通过判断 e.target 来避免

```js
document.body.addEventListener('click', (e) => {
  if (e.target && e.target.matches('div.code')) {
    return
  }
  this.setState({ active: false })
})
```
