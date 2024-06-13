# useMemo [​](#useMemo)

作用：它在每次重新渲染的时候能够缓存计算的结果

## 使用场景 [​](#scene)

下面我们的本来的用意是想**基于 count 的变化计算斐波那契数列之和**，但是当我们修改 num 状态的时候，斐波那契求和函数也会被执行，显然是一种浪费

```jsx
import { useState } from 'react'

function fib(n) {
  console.log('斐波那契函数执行了')
  return n <= 0 ? 1 : n * fib(n - 1)
}

function App() {
  const [count, setCount] = useState(0)
  // 计算斐波那契之和
  const sumByCount = fib(count)

  const [num, setNum] = useState(0)

  return (
    <>
      {sum}
      <button onClick={() => setCount(count + 1)}>+count:{count}</button>
      <button onClick={() => setNum(num + 1)}>+num:{num}</button>
    </>
  )
}

export default App
```

## useMemo 缓存计算结果 [​](#cache)

> 思路: 只有 count 发生变化时才重新进行计算

```jsx
import { useMemo, useState } from 'react'

function fib(n) {
  console.log('计算函数执行了')
  if (n < 3) return 1
  return fib(n - 2) + fib(n - 1)
}

function App() {
  const [count, setCount] = useState(0)
  // 计算斐波那契之和
  // const sum = fib(count)
  // 通过useMemo缓存计算结果，只有count发生变化时才重新计算
  const sum = useMemo(() => {
    return fib(count)
  }, [count])

  const [num, setNum] = useState(0)

  return (
    <>
      {sum}
      <button onClick={() => setCount(count + 1)}>+count:{count}</button>
      <button onClick={() => setNum(num + 1)}>+num:{num}</button>
    </>
  )
}

export default App
```
