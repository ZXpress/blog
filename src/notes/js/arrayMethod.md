# 数组常用方法 [](#array-method)

## 增 [](#add)

- push 尾部增加
- unshift 头部增加
- splice 传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组
- concat

## 删 [](#delete)

- pop 尾部删除
- shift 头部删除
- splice
- slice 截取字符串，末尾取不到，不会改变原数组

## 查 [](#query)

- indexOf
- includes
- find 查找第一个符合条件的数据

## 排序方法 [](#sort)

- reverse 反转数组
- sort 排序

## 转换方法 [](#conversion)

- join 数组转换为字符串（字符串转化为数组 split）

## 迭代、遍历方法 [](#iteration)

- some 对数组每一项都运行传入的测试函数，如果至少有一项符合条件，则返回 true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
let someResult = numbers.some((item, index, array) => item > 2)
console.log(someResult) // true
```

- every 对数组每一项都运行传入的测试函数，如果所有都符合条件，则返回 true
- forEach
- filter 返回新数组，不会修改原数组
- map 返回新数组，不会修改原数组
