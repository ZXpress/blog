# Object.prototype.hasOwnProperty [](#hasownproperty)

hasOwnProperty()方法返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性

```js
const object1 = {}
object1.property1 = 42

console.log(object1.hasOwnProperty('property1'))
// Expected output: true

// null和undefined的值也会返回true
object1.prop = null
object1.hasOwnProperty('prop') // 返回 true——自有属性存在且值为 null

object1.prop = undefined
object1.hasOwnProperty('prop') // 返回 true——自有属性存在且值为 undefined

// toString为继承来的
console.log(object1.hasOwnProperty('toString'))
// Expected output: false

// hasOwnProperty为继承来的
console.log(object1.hasOwnProperty('hasOwnProperty'))
// Expected output: false
```

## 直接属性对比继承属性 [](#直接属性对比继承属性)

`hasOwnProperty` 仅对直接属性返回 true，`in` 运算符对于直接或继承的属性返回 true

```js
const example = {}
example.prop = 'exists'

// `hasOwnProperty` 仅对直接属性返回 true：
example.hasOwnProperty('prop') // 返回 true
example.hasOwnProperty('toString') // 返回 false
example.hasOwnProperty('hasOwnProperty') // 返回 false

// 对于直接或继承的属性，`in` 运算符将返回 true：
'prop' in example // 返回 true
'toString' in example // 返回 true
'hasOwnProperty' in example // 返回 true
```
