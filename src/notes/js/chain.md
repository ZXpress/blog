# 可选链操作符`?.` [](#可选链操作符)

`?.`操作符，可以嵌套获取对象的属性值，通过获取对象属性获得的值可能是 undefined 或 null 时，可选链操作符提供了一种方法来简化被连接对象的值访问

```js
const o = {}

// 添加可选链之前
o && o.a && o.a.b && o.a.b.c && o.a.b.c.d

// 添加可选链之后
o?.a?.b?.c?.d
```

使用：

```js
const obj = { a: [1, 2], b() {} }
// 访问数组
obj?.a?.[0]
//使用方法
obj?.b?.()
```
