# React.memo 高阶组件（性能优化） [​](#memo)

## 基础使用 [​](#basic)

React 组件更新机制：只要父组件状态更新，子组件就会无条件的一起更新。

memo 作用：记忆组件上一次的渲染结果，只有在 props 变化时重新渲染，在 props 没有变化时复用该结果，避免函数组件不必要的更新

```js
import { memo } from 'react'

const Child1 = memo(({ count }) => {
  console.log('child1更新')
  return <div>Child1组件{count}</div>
})

const Child2 = memo(() => {
  console.log('child2更新')
  return <div>Child2组件</div>
})
```

如果父组件传递的 props 有函数等复杂类型，会让 memo 失效，因为是浅层对比，父组件更新就会重新渲染函数。

> `props` 的比较机制：在使用 memo 缓存组件后，React 会对每个 prop 使用`Object.is`比较新值和旧值，返回 true 表示没有变化

> 如果 prop 是简单类型 `Object.is(3, 3) => true` 没有变化

> 如果 prop 是引用类型 `Object.is([], []) => false` 有变化，React 只专心引用是否变化

## 自定义比较函数 [​](#custom)

> 我们不想通过引用来比较，而是完全比较数组的成员是否完全一致，则可以通过自定义比较函数来实现

```jsx
import React, { useState } from 'react'

// 自定义比较函数
function arePropsEqual(oldProps, newProps) {
  console.log(oldProps, newProps)
  return (
    oldProps.list.length === newProps.list.length &&
    oldProps.list.every((oldItem, index) => {
      const newItem = newProps.list[index]
      console.log(newItem, oldItem)
      return oldItem === newItem
    })
  )
}

const MemoSon = React.memo(function Son() {
  console.log('子组件被重新渲染了')
  return <div>this is span</div>
}, arePropsEqual)

function App() {
  console.log('父组件重新渲染了')
  const [list, setList] = useState([1, 2, 3])
  return (
    <>
      <MemoSon list={list} />
      <button onClick={() => setList([1, 2, 3])}>内容一样{JSON.stringify(list)}</button>
      <button onClick={() => setList([4, 5, 6])}>内容不一样{JSON.stringify(list)}</button>
    </>
  )
}

export default App
```
