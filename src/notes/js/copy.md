# 浅拷贝、深拷贝 [](#copy)

## 浅拷贝 [](#shallow-copy)

> 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

### Object.assign [](#Object-assign)

```js
const obj = { a: 3, b: 4 }
const target = {}
const newObj = Object.assign(target, obj)
console.log(newObj) // {a:3, b:4}
console.log(newObj === target) // true

// 外层基本类型拷贝基本类型，c为引用类型拷贝内存地址
const obj = { a: 3, b: 4, c: { d: 5 } }
const atrget = {}
const newObj = Object.assign(target, obj)
newObj.c.d = 6
console.log(obj) // {a:3, b:4, c:{d:6}}
```

### slice、concat、拓展运算符[...fxArr]都是返回新数组

```js
const fxArr = ['One', 'Two', 'Three']
const fxArrs = fxArr.slice(0)
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

## 深拷贝 [](#deep-copy)

- lodash 的 cloneDeep
- 扩展运算符：只能实现第一层，多层对象还是浅拷贝
- JSON.stringify() 但是这种方式存在弊端，会忽略 undefined、symbol 和函数

```js
const obj = {
  name: 'A',
  name1: undefined,
  name3: function () {},
  name4: Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj))
console.log(obj2) // {name: "A"}
```

- 递归循环深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
```

```js
const deepClone = (obj) => {
  let res = {}
  if (obj instanceof Array) res = []
  for (const key in obj) {
    let item = obj[key]
    res[key] = typeof item === 'object' && item !== null ? deepClone(item) : item
  }
  return res
}
console.log(deepClone({ a: 3, b: [1, 2, 3] }))
```
