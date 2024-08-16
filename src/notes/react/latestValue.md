# useState 拿到更新后最新的值 [](#latest-value)

## 使用 useEffect [](#useEffect)

> 在 useEffect 中书写逻辑，[]中监听 state 改变。在 useEffect 中，组件 dom 已经挂载更新完毕，可以拿到 state 的最新值

```js
import React, { useEffect, useRef, useState } from 'react'

export default function Vendor() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    //需要使用最新值进行的操作
    console.log(count)
  }, [count])

  return (
    <div>
      <p>点击了 {count} 次</p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点我
      </button>
    </div>
  )
}
```

## setXxx 写成回调函数形式 [](#setxxx写成回调函数形式)

> 回调函数中 return 的返回值即最新的 state 值

```js
export default function Vendor() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>点击了 {count} 次</p>
      <button
        onClick={() => {
          setCount((preCount) => {
            console.log('更新前的state' + preCount)
            //const newCount=1000
            const newCount = preCount + 1
            console.log('更新后的state' + newCount)
            return newCount
          })
        }}
      >
        点我
      </button>
    </div>
  )
}
```

## 使用 useRef [](#useRef)

> 利用 useRef 创建的对象在组件更新期间保持引用不变的特性，确保组件每次渲染取到的都是同一个对象

> useRef 对象中 current 属性的值可以改变可以存储任意数据，但是组件更新期间，获取到的是同一个对象（引用不变）

```js
export default function Vendor() {
  const countRef = useRef(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    //组件每次挂载完，countRef.current会存储上最新的值
    countRef.current = count
  }, [count])

  return (
    <div>
      <p>点击了 {count} 次</p>
      <button
        onClick={() => {
          countRef.current = count + 1 //countRef.current不随着组件每次渲染变化，先把新值存在这里
          setCount(count + 1)
          console.log(countRef.current) //使用新值的逻辑
        }}
      >
        点我
      </button>
    </div>
  )
}
```
