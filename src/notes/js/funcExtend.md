# ES6 函数新增扩展 [](#es6函数新增扩展)

## name 属性 [](#name属性)

返回该函数的函数名

```js
var f = function () {}

// ES5
f.name // ""

// ES6
f.name // "f"
```

如果将一个具名函数赋值给一个变量，则 name 属性都返回这个具名函数原本的名字

```js
const bar = function baz() {}
bar.name // "baz"
```

Function 构造函数返回的函数实例，name 属性的值为 anonymous

```js
new Function().name // "anonymous"
```

bind 返回的函数，name 属性值会加上 bound 前缀

```js
function foo() {}
foo
  .bind({})
  .name(
    // "bound foo"

    function () {}
  )
  .bind({}).name // "bound "
```

## 作用域 [](#作用域)

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

下面例子中，y=x 会形成一个单独作用域，x 没有被定义，所以指向全局变量 x

```js
let x = 1

function f(y = x) {
  // 等同于 let y = x
  let x = 2
  console.log(y)
}

f() // 1
```
