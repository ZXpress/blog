# js 中类型转换 [](#type-conversion)

## Number 转换 [](#number)

- Number，null 转为数值时，值为 0，undefined 转为数值时，值为 NaN

```js
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0

// 对象：通常转换成NaN(除了只包含单个数值的数组)
Number({ a: 1 }) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

## String 转换 [](#string)

- String 可将任意类型转换为字符串（Boolean 类似）

```js
// 数值：转为相应的字符串
String(1) // "1"

//字符串：转换后还是原来的值
String('a') // "a"

//布尔值：true转为字符串"true"，false转为字符串"false"
String(true) // "true"

//undefined：转为字符串"undefined"
String(undefined) // "undefined"

//null：转为字符串"null"
String(null) // "null"

//对象
String({ a: 1 }) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```
