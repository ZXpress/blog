# Zustand [​](#class)

Zustand 文档[Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)

## 使用示例 [​](#template)

创建 store

```js
import { create } from 'zustand'

// 函数参数必须返回一个对象，对象内部编写状态数据和方法
// set是用来修改数据的专门方法
// set语法: 1.参数是函数，需要用到老数据的场景 2.参数直接是一个对象
const useStore = create((set) => {
  return {
    count: 0,
    inc: () => {
      set((state) => ({ count: state.count + 1 }))
      // set({ count: 100 })
    }
  }
})

export default useStore
```

绑定组件

```jsx
import useStore from './store/useCounterStore.js'

function App() {
  const { count, inc } = useStore()
  return <button onClick={inc}>{count}</button>
}

export default App
```

## 异步支持 [​](#async)

对于异步操作的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后把接口的数据放到 set 函数中返回即可

```js
import { create } from 'zustand'

const URL = 'http://geek.itheima.net/v1_0/channels'

const useStore = create((set) => {
  return {
    count: 0,
    ins: () => {
      return set((state) => ({ count: state.count + 1 }))
    },
    channelList: [],
    fetchChannelList: async () => {
      const res = await fetch(URL)
      const jsonData = await res.json()
      set({ channelList: jsonData.data.channels })
    }
  }
})

export default useStore
```

```jsx
import { useEffect } from 'react'
import useChannelStore from './store/channelStore'

function App() {
  const { channelList, fetchChannelList } = useChannelStore()

  useEffect(() => {
    fetchChannelList()
  }, [fetchChannelList])

  return (
    <ul>
      {channelList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

export default App
```

## 切片模式 [​](#section)

场景：当我们单个 store 比较大的时候，可以采用一种`切片模式`进行模块拆分再组合（拆分为子模块）

```js
import { create } from 'zustand'

// 创建counter相关切片
const createCounterStore = (set) => {
  return {
    count: 0,
    setCount: () => {
      set((state) => ({ count: state.count + 1 }))
    }
  }
}

// 创建channel相关切片
const createChannelStore = (set) => {
  return {
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL)
      const jsonData = await res.json()
      set({ channelList: jsonData.data.channels })
    }
  }
}

// 组合切片(固定写法)
const useStore = create((...a) => ({
  ...createCounterStore(...a),
  ...createChannelStore(...a)
}))
```

组件使用

```jsx
function App() {
  const { count, inc, channelList, fetchChannelList } = useStore()
  return (
    <>
      <button onClick={inc}>{count}</button>
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
```
