# JS 作用域 [](#scope)

- 作用域分为：全局作用域、函数作用域（局部作用域）、块级作用域（ES6 引入）

> ES6 引入了 let 和 const 关键字，和 var 关键字不同，在大括号中使用 let 和 const 声明的变量存在于块级作用域中，在大括号之外不能访问这些变量

```js
{
  // 块级作用域中的变量
  let greeting = 'Hello World!'
  var lang = 'English'
  console.log(greeting) // Prints 'Hello World!'
}
// 变量 'English'
console.log(lang)
// 报错：Uncaught ReferenceError: greeting is not defined
console.log(greeting)
```

- 词法作用域（静态作用域），变量被创建时就确定好了，而非执行阶段确定的。也就是说我们写好代码时它的作用域就确定了，JavaScript 遵循的就是词法作用域

```js
var a = 2
function foo() {
  console.log(a)
}
function bar() {
  var a = 3
  foo()
}
// 由于JavaScript遵循词法作用域，相同层级的 foo 和 bar 就没有办法访问到彼此块作用域中的变量，所以输出2
bar()
```
