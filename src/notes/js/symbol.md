# Symbol 数据类型 [](#symbol)

## 介绍 [](#介绍)

没有两个 symbol 的值是相等的

```js
console.log(Symbol() === Symbol()) // false
console.log(Symbol('一碗周') === Symbol('一碗周')) /// false
```

Symbol 可以用作对象的属性名；如果我们拿 Symbol 作为对象的 key，就不会出现属性名命名冲突的情况；使用 Symbol 作为属性名无法使用常规的方式访问，不能被 for...in、for...of、Object.keys()获取，也不能被 Object.getOwnPropertyNames 获取，可以被 Object.getOwnPropertySymbols 和 Reflect.ownKeys 获取

```js
const myName = Symbol('一碗周')

const person = {
  // 值得注意的是使用 Symbol 作为属性名的时候，需要使用计算属性名的方式，即 Symbol 使用 [] 包裹
  [myName]: '一碗周'
}

console.log(person[myName]) // 一碗周
```

## Symbol.for 和 Symbol.keyFor [](#for-keyfor)

Symbol 提供的 for()和 keyFor()用于创建和读取在全局注册的 Symbol，在使用 for()方法是会先查找是否存在，如果存在就创建否则直接返回

```js
let myName = Symbol.for('myName')
let object = {
  [myName]: '一碗周'
}

console.log(object[myName]) // "一碗周"
console.log(myName) // "Symbol(myName)"

let myName2 = Symbol.for('myName')

// 这里的相等是因为 myName2 的 Symbol.for("myName") 已经是创建好的。myName 和 myName2 指向的是同一块内存地址
console.log(myName === myName2) // true

console.log(object[myName2]) // "一碗周"
console.log(myName2) // "Symbol(myName)"

// keyFor用于读取，未读取到返回undefined

console.log(Symbol.keyFor(myName)) // "myName"

console.log(Symbol.keyFor(myName2)) // "myName"

let myName3 = Symbol('myName')

console.log(Symbol.keyFor(myName3)) // undefined
```

## Symbol 使用场景 [](#symbol使用场景)

主要有两个应用场景：作为私有属性和解决属性名冲突

### 作为私有属性

```js
const myName = Symbol('name')
function getObj() {
  const obj = {}
  obj[myName] = '一碗周'
  return obj
}

const obj = getObj()

Object.keys(obj) // []

// 除非有这个 symbol 的引用，否则无法访问该属性
obj[Symbol('name')] // undefined

obj[myName] // '一碗周'
```

### 解决属性名冲突

```js
const name = Symbol('name')
const age = Symbol('age')

const person = {
  [name]: 'John',
  [age]: 30
}

console.log(person[name]) // 输出：John
console.log(person[age]) // 输出：30
```

## Symbol 的优缺点 [](#symbol的优缺点)

### 优点

1. 属性名的唯一性：

Symbol 可以确保属性名的唯一性，避免属性名冲突的问题。即使多个 Symbol 值使用相同的描述符，它们依然是不同的属性名

2. 防止属性被意外访问：

使用 Symbol 作为属性名，可以隐藏属性，使其不容易被意外访问到。这有助于在对象中定义私有属性或内部使用的属性

3. 扩展对象的功能：

通过自定义 Symbol 属性，可以为对象添加自定义行为，如迭代器、比较器等。这样，我们可以更灵活地扩展对象的功能，使其具备更多特定的行为

4. 安全性提升：

Symbol 的属性名不会被常规的属性遍历方法（如 for...in 循环）访问到，可以在一定程度上提升对象的安全性，防止属性被意外修改

### 缺点

1. 无法遍历：

Symbol 作为属性名时，无法通过常规的属性遍历方法（如 for...in 循环）获取到。如果需要遍历对象的属性，就不能使用 Symbol 作为属性名

2. 内存泄漏：

由于 Symbol 创建的属性是唯一的，一旦创建后就无法被销毁或被垃圾回收机制回收。如果大量使用 Symbol 创建属性，可能会造成内存泄漏的问题

3. 可调试性差：

Symbol 属性名在控制台输出时，没有明确的标识，不容易调试和查看对象的具体属性

4. 不可序列化：

Symbol 值不能被 JSON.stringify() 序列化，也不能作为对象的键值传递给其他线程或进程
