# 组件和 ts [​](#components-ts)

## 为 Props 添加类型 [​](#props-ts)

> props 作为 React 组件的参数入口，添加了类型之后可以限制参数输入以及在使用 props 有良好的类型提示

### 使用 interface 接口 [​](#interface)

```tsx
interface Props {
  className: string
}

export const Button = (props: Props) => {
  const { className } = props
  return <button className={className}>Test</button>
}
```

### 使用自定义类型 Type [​](#type)

```tsx
type Props = {
  className: string
}

export const Button = (props: Props) => {
  const { className } = props
  return <button className={className}>Test</button>
}
```

## 为 Props 的 chidren 属性添加类型 [​](#children-ts)

> children 属性和 props 中其他的属性不同，它是 React 系统中内置的，其它属性我们可以自由控制其类型，children 属性的类型最好由 React 内置的类型提供，兼容多种类型`React.ReactNode`

```tsx
type Props = {
  children: React.ReactNode
}

export const Button = (props: Props) => {
  const { children } = props
  return <button>{children}</button>
}
```

:::warning
说明：React.ReactNode 是一个 React 内置的联合类型，包括 `React.ReactElement` 、`string`、`number` `React.ReactFragment` 、`React.ReactPortal` 、`boolean`、 `null` 、`undefined`
:::

## 为事件 prop 添加类型 [​](#event-ts)

```tsx
// props + ts
type Props = {
  onGetMsg?: (msg: string) => void
}

function Son(props: Props) {
  const { onGetMsg } = props
  const clickHandler = () => {
    onGetMsg?.('this is msg')
  }
  return <button onClick={clickHandler}>sendMsg</button>
}

function App() {
  const getMsgHandler = (msg: string) => {
    console.log(msg)
  }
  return (
    <>
      <Son onGetMsg={(msg) => console.log(msg)} />
      <Son onGetMsg={getMsgHandler} />
    </>
  )
}

export default App
```

## 为事件 handle 添加类型 [​](#handle-ts)

> 为事件回调添加类型约束需要使用 React 内置的泛型函数来做，比如最常见的鼠标点击事件和表单输入事件：

```tsx
function App() {
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value)
  }

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e.target)
  }

  return (
    <>
      <input type="text" onChange={changeHandler} />
      <button onClick={clickHandler}> click me!</button>
    </>
  )
}
```
