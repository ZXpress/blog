# useState [​](#useState)

## 简单使用 [​](#basic)

> 简单场景下，可以使用 TS 的自动推断机制，不用特殊编写类型注解，运行良好

```ts
const [val, toggle] = React.useState(false)

// `val` 会被自动推断为布尔类型
// `toggle` 方法调用时只能传入布尔类型
```

## 复杂场景 [​](#complex)

> 复杂数据类型，useState 支持通过`泛型参数`指定初始参数类型以及 setter 函数的入参类型

```ts
type User = {
  name: string
  age: number
}
const [user, setUser] = React.useState<User>({
  name: 'jack',
  age: 18
})
// 执行setUser
setUser(newUser)
// 这里newUser对象只能是User类型
```

## 没有具体默认值 [​](#specific)

> 实际开发时，有些时候 useState 的初始值可能为 null 或者 undefined，按照泛型的写法是不能通过类型校验的，此时可以通过完整的类型联合 null 或者 undefined 类型即可

```ts
type User = {
  name: String
  age: Number
}
const [user, setUser] = React.useState<User>(null)
// 上面会类型错误，因为null并不能分配给User类型

const [user, setUser] = React.useState<User | null>(null)
// 上面既可以在初始值设置为null，同时满足setter函数setUser的参数可以是具体的User类型
```
