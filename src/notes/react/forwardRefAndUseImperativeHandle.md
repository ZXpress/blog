# forwardRef 和 useImperativeHandle [​](#forwardRef-useImperativeHandle)

## forwardRef：使用 ref 访问子组件内的 DOM 元素 [​](#forwardRef)

```js
import { forwardRef, useRef } from 'react'

const Son = forwardRef((props, ref) => {
  return <input type="text" ref={ref}></input>
})

function App() {
  const ref = useRef(null)
  const handleClick = () => {
    console.log(ref) // {current: input}
    ref.current.focus()
  }
  return (
    <div className="App">
      <Son ref={ref}></Son>
      <button onClick={handleClick}>focus</button>
    </div>
  )
}

export default App
```

## useImperativeHandle：使用 ref 访问子组件内的方法 [​](#useImperativeHandle)

```js
import { forwardRef, useImperativeHandle, useRef } from 'react'

const Son = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  const focusHandler = () => {
    inputRef.current.focus()
  }
  // 暴露给父组件调用
  useImperativeHandle(ref, () => {
    return {
      focusHandler
    }
  })
  return <input type="text" ref={inputRef}></input>
})

function App() {
  const ref = useRef(null)
  const handleClick = () => {
    console.log(ref)
    ref.current.focusHandler()
  }
  return (
    <div className="App">
      <Son ref={ref}></Son>
      <button onClick={handleClick}>focus</button>
    </div>
  )
}

export default App
```
