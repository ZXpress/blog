# setState 相关 [](#setstate相关)

## 调用 setState 时，React render 如何工作的 [](#调用setstate时react-render如何工作的)

将 render 分为两个步骤：

1. 虚拟 DOM 渲染：

当 render 方法被调用时，它返回一个新的组件的虚拟 DOM 结构，当调用 setState()时，render 会被再次调用，因为默认情况下 shouldComponentUpdate 总是返回 true，所以默认情况下 React 是没有优化的

2. 原生 DOM 渲染：

React 只会在虚拟 DOM 中修改真实 DOM 节点，而且修改的次数非常少——这是很棒的 React 特性，它优化了真实 DOM 的变化，使 React 变得更快

## setState 是同步还是异步的 [](#setstate-是同步还是异步的)

有时表现出异步,有时表现出同步

1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的
2. setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新

## setState 参数 [](#setstate第二个参数)

setState 第一个参数两种形式：

```js
// 第一个参数为对象
this.setState({
  count: this.state.count + 1
})
```

```js
// 第一个参数为函数，state和props都是最新的值
this.setState((state, props) => {
  return {
    count: state.count + 1
  }
})
```

setState 第二个参数是一个回调函数，是在页面渲染完成之后，即 DOM 渲染完毕之后执行，可以拿到更新后的 state 数据和 DOm，和钩子函数 componentDidUpdate 功能类似

```js
this.setState(
  (state, props) => {
    return {
      count: state.count + 1
    }
  },
  () => {
    console.log('更新后的state' + this.state.count)
  }
)
```
