# useCallBack [​](#useCallBack)

在组件多次重新渲染的时候缓存函数，保持引用稳定。
下方例子中 memo 缓存的 Input 组件，因为 prop 为函数复杂类型，父组件更新子组件同步更新，使用 useCallBack 缓存函数后子组件不再更新

```js
import { memo, useCallback, useState } from 'react'

const Input = memo(function Input({ onChange }) {
  console.log('子组件重新渲染了')
  return <input type="text" onChange={(e) => onChange(e.target.value)}></input>
})

function App() {
  // 传给子组件的函数
  const changeHandler = useCallback((value) => console.log(value), [])
  // 触发父组件重新渲染的函数
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      {/* 把函数作为prop传给子组件 */}
      <Input onChange={changeHandler}></Input>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
```
