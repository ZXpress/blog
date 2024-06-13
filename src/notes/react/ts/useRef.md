# useRef [​](#useRef)

> 在 TypeScript 的环境下，`useRef` 函数返回一个`只读` 或者 `可变` 的引用，只读的场景常见于获取真实 dom，可变的场景，常见于缓存一些数据，不跟随组件渲染，下面分俩种情况说明
> <span style="color:red">useRef 返回的数据，在修改时不会触发组件重新渲染</span>

## 获取 dom [​](#dom)

> 获取 DOM 时，通过泛型参数指定具体的 DOM 元素类型即可

```tsx
function Foo() {
  // 尽可能提供一个具体的dom type, 可以帮助我们在用dom属性时有更明确的提示
  // divRef的类型为 RefObject<HTMLDivElement>
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  })

  return <div ref={inputRef}>etc</div>
}
```

## 稳定引用存储器 [​](#storage)

> 当做为可变存储容器使用的时候，可以通过`泛型参数`指定容器存入的数据类型, 在还为存入实际内容时通常把 null 作为初始值，所以依旧可以通过联合类型做指定

```tsx
interface User {
  age: number
}

function App() {
  const timerRef = useRef<number | undefined>(undefined)
  const userRes = useRef<User | null>(null)
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      console.log('测试')
    }, 1000)

    return () => clearInterval(timerRef.current)
  })
  return <div> this is app</div>
}
```
