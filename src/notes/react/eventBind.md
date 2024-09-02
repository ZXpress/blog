# React 事件绑定方式 [](#react事件绑定方式)

## render 方法中使用 bind [](#render方法中使用bind)

在事件函数后使用.bind(this)将 this 绑定到当前组件中，这种方式在组件每次 render 渲染的时候，都会重新进行 bind 的操作，影响性能

```js
class App extends React.Component {
  handleClick() {
    console.log('this > ', this)
  }
  render() {
    return <div onClick={this.handleClick.bind(this)}>test</div>
  }
}
```

## render 方法中使用箭头函数 [](#render方法中使用箭头函数)

通过 ES6 的上下文来将 this 的指向绑定给当前组件，同样再每一次 render 的时候都会生成新的方法，影响性能

```js
class App extends React.Component {
  handleClick() {
    console.log('this > ', this)
  }
  render() {
    return <div onClick={(e) => this.handleClick(e)}>test</div>
  }
}
```

## constructor 中 bind [](#constructor中bind)

在 constructor 中预先 bind 当前组件，可以避免在 render 操作中重复绑定

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log('this > ', this)
  }
  render() {
    return <div onClick={this.handleClick}>test</div>
  }
}
```

## 定义阶段使用箭头函数绑定 [](#定义阶段使用箭头函数绑定)

跟上述方式三一样，能够避免在 render 操作中重复绑定

```js
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick = () => {
    console.log('this > ', this)
  }
  render() {
    return <div onClick={this.handleClick}>test</div>
  }
}
```

## 区别 [](#区别)

- 编写方面：方式一、方式二写法简单，方式三的编写过于冗杂

- 性能方面：方式一和方式二在每次组件 render 的时候都会生成新的方法实例，性能问题欠缺。若该函数作为属性值传给子组件的时候，都会导致额外的渲染。而方式三、方式四只会生成一个方法实例

综合上述，方式四是最优的事件绑定方式
