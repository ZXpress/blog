# 闭包 [](#closure)

## 简介 [](#introduce)

> 有权访问另一个函数作用域中的变量的函数，闭包是一个函数

```js
function init() {
  var name = 'Mozilla' // name 是一个被 init 创建的局部变量
  function displayName() {
    // displayName() 是内部函数，一个闭包
    alert(name) // 使用了父函数中声明的变量
  }
  displayName()
}
init()
```

## 使用场景 [](#scene)

> 例如计数器、延迟调用、回调等闭包的应用，其核心思想还是创建私有变量和延长变量的生命周期

- 创建私有变量
- 延长变量的生命周期
- 柯里化函数

```js
function curry(f) {
  // curry(f) 执行柯里化转换
  return function (a) {
    return function (b) {
      return f(a, b)
    }
  }
}

// 用法
function sum(a, b) {
  return a + b
}

let curriedSum = curry(sum)

console.log(curriedSum(1)(2)) // 3
```

> 柯里化更高级的实现，例如 lodash 库的 \_.curry，会返回一个包装器，该包装器允许函数被正常调用或者以偏函数（partial）的方式调用

```js
function sum(a, b) {
  return a + b
}

let curriedSum = _.curry(sum) // 使用来自 lodash 库的 _.curry

alert(curriedSum(1, 2)) // 3，仍可正常调用
alert(curriedSum(1)(2)) // 3，以偏函数的方式调用
```
