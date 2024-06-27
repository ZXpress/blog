# js 数据类型 [​](#data-type)

## 基本数据类型、复杂数据类型（8 种） [​](#dataType-describe)

> 基本数据类型 Boolean、null、undefined、Number、String、Symbol、BigInt
>
> 复杂数据类型 Object，包括 Object、Array、Function

## 常用判断数据类型的方式 [​](#mode)

### <span style="color:red">typeof</span> [​](#typeof)

- `基础数据类型除了null其余返回对应的字符串，引用数据类型只有function会被识别，其余返回object`
- 注意`console`、`null`、`NaN`、`document.all` 的判断

```js
console.log(typeof 123) // "number"
console.log(typeof 'hello') // "string"
console.log(typeof true) // "boolean"
console.log(typeof undefined) // "undefined"
console.log(typeof null) // "object"
console.log(typeof Symbol(1)) // "symbol"
console.log(typeof {}) // "object"
console.log(typeof []) // "object"
console.log(typeof function () {}) // "function"
console.log(typeof console) // "object"
console.log(typeof console.log) // "function"
console.log(typeof null) // "object"
console.log(typeof NaN) // "number"
console.log(typeof document.all) // "undefined"
```

### <span style="color:red">instanceof</span> [](#instanceof)

- 语法：`obj instanceof Type` 判断 obj 是不是 Type 类的实例，`只可用来判断引用数据类型`
- 实现思路：Type 的原型对象是否是 obj 的原型链上的某个对象
- 注意：右操作数必须是`函数`或者 `class`

```js
const arr = [1, 2, 3]
console.log(arr instanceof Array) // true
console.log(arr instanceof Object) // true

const obj = { name: '云牧', age: 18 }
console.log(obj instanceof Object) // true
console.log(obj instanceof Array) // false
```

手写 instanceof

```js
function myInstanceof(Fn, obj) {
  // 获取该函数显示原型
  const prototype = Fn.prototype
  // 获取obj的隐式原型
  let proto = obj.__proto__
  // 遍历原型链
  while (proto) {
    // 检测原型是否相等
    if (proto === prototype) {
      return true
    }
    // 如果不等于则继续往深处查找
    proto = proto.__proto__
  }
  return false
}
```

判断通过 new 实例化的对象，可用来判断基础数据类型

```js
// 定义构造函数
let Car = function () {}
let benz = new Car()
benz instanceof Car // true
let car = new String('xxx')
car instanceof String // true
// 正常无法判断基础数据类型
let str = 'xxx'
str instanceof String // false
```

### <span style="color:red">constructor</span> [](#constructor)

- constructor 指向创建该实例对象的构造函数
- 注意 null 和 undefined 没有 constructor，以及 constructor 可以被改写，不太可靠

```js
const arr = [1, 2, 3]
console.log(arr.constructor === Array) // true

const obj = { name: 'zcy', age: 18 }
console.log(obj.constructor === Object) // true

String.prototype.constructor = function fn() {
  return {}
}

// constructor 可以被改写
console.log('zcy'.constructor) // [Function: fn]
```

### <span style="color:red">isxxx</span> [](#isxxx)

#### isPrototypeof [](#isPrototypeof)

- 用于判断一个对象是否为另一个对象的原型
- prototypeObj.isPrototypeOf(object)，如果 prototypeObj 是 object 的原型对象，isPrototypeOf 方法返回 true，否则返回 false
- 功能基本等同于 instanceof
- 注意：isPrototypeOf 方法只能用于判断对象类型，不能用于判断基本数据类型。如果 prototypeObj 不是一个对象，isPrototypeOf 方法会抛出 TypeError 异常

#### getPrototypeOf [](#getPrototypeOf)

返回一个对象的原型，只能用于判断对象类型（等同于 `arr.__proto__`）

```js
const obj = { name: '云牧', age: 18 }
const arr = [1, 2, 3]

const proto1 = Object.getPrototypeOf(obj)
console.log(proto1 === obj.__proto__) // true
console.log(proto1.isPrototypeOf(obj)) // true

const proto2 = Object.getPrototypeOf(arr)
console.log(proto2.isPrototypeOf(arr)) // true

console.log(Object.isPrototypeOf({})) // false
console.log(Object.prototype.isPrototypeOf({})) // true
// 期望左操作数是一个原型，{} 原型链能找到 Object.prototype

console.log(Object.getPrototypeOf(obj) === Object.prototype) // true
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true
```

#### Array.isArray [](#isArray)

判断一个对象是否为数组

#### Number.isNaN [](#isNaN)

判断一个值是否为 NaN

#### Number.isFinite [](#isFinite)

判断一个值是否为有限数

```js
console.log(Array.isArray([1, 2, 3])) // true
console.log(Array.isArray({})) // false
console.log(Number.isNaN(NaN)) // true
console.log(Number.isNaN(123)) // false
console.log(Number.isNaN('hello')) // false
console.log(Number.isFinite(123)) // true
console.log(Number.isFinite('hello')) // false
console.log(Number.isFinite(Infinity)) // false
```

注意：isNaN 和 Number.isNaN

```js
// 如果非数字，隐式转换传入结果如果是 NaN，就返回 true，反之返回 false
console.log(isNaN(NaN)) // true
console.log(isNaN({})) // true

console.log(Number.isNaN(NaN)) // true
console.log(Number.isNaN({})) // false
```

### <span style="color:red">Object.prototype.toString</span> [](#toString)

- 利用函数动态 this 的特性

```js
Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call('hello') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call(function () {}) // "[object Function]"
// 注意的是，Object.prototype.toString.call 方法返回的字符串格式为 "[object 类型]"

// 封装
function typeOf(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

// 测试
console.log(typeOf(1)) // Number
console.log(typeOf('1')) // String
console.log(typeOf(true)) // Boolean
console.log(typeOf(null)) // Null
console.log(typeOf(undefined)) // Undefined
console.log(typeOf(Symbol(1))) // Symbol
console.log(typeOf({})) // Object
console.log(typeOf([])) // Array
console.log(typeOf(function () {})) // Function
console.log(typeOf(new Date())) // Date
console.log(typeOf(new RegExp())) // RegExp
```

### <span style="color:red">Symbol.toStringTag</span> [](#toStringTag)

- 原理：Object.prototype.toString 会读取该值
- 适用场景：检测自定义类型
- 注意事项：兼容性

```js
class MyArray {
  get [Symbol.toStringTag]() {
    return 'MyArray'
  }
}

const arr = new MyArray()
console.log(Object.prototype.toString.call(arr)) // [object MyArray]
```

## 总结 [](#summary)

- void 0 始终返回 undefined，void 后面接任意值都是返回 undefined，这是为了兼容 IE，因为在 IE 中 undefined 值可以被改写

| 方法                | 基础数据类型 | 引用类型 | 注意事项                       |
| ------------------- | ------------ | -------- | ------------------------------ |
| typeof              | √            | ×        | NaN、object、document.all      |
| constructor         | √ 部分       | √        | 可以被改写                     |
| instanceof          | ×            | √        | 多窗口，右边构造函数或者 class |
| isPrototypeof       | ×            | √        | 小心 null 和 undefined         |
| toString            | √            | √        | 小心内置原型                   |
| Symbol.toString Tag | ×            | √        | 识别自定义对象                 |
