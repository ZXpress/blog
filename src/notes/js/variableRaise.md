# variableRaise 变量提升和函数提升 [](#variableraise变量提升)

var 存在变量提升，而 const 和 let 存在暂时性死区（TDZ），在 TDZ 内，变量已经被声明但未初始化，任何对该变量的访问都会抛出错误

```js
console.log(b) // ReferenceError: Cannot access 'b' before initialization
let b = 1
```

## var 存在变量提升，即变量可以在声明前使用，值为 undefined

如果使用关键字 var 声明一个变量，那么这个变量就属于当前的函数作用域，如果声明是发生在任何函数外的顶层声明，那么这个变量就属于全局作用域

```js
var a = 1 //此处声明的变量a为全局变量
function foo() {
  var a = 2 //此处声明的变量a为函数foo的局部变量
  console.log(a) //2
}
foo()
console.log(a) //1如果在声明变量时，省略 var 的话，该变量就会变成全局变量，如全局作用域中存在该变量，就会更新其值。如：
```

```js
var a = 1 //此处声明的变量a为全局变量
function foo() {
  a = 2 //此处的变量a也是全局变量
  console.log(a) //2
}
foo()
console.log(a) //2
```

```js
console.log(a) //undefined
var a = 1

//等价于
var a
consloe.log(a) //undefined
a = 1
```

## let 和 const

### let 声明存在暂时性死区（TDZ）

let 声明的变量不会在作用域中被提升；在 let 声明之前的执行瞬间被称为”暂时性死区“，会抛出 ReferenceError 错误

```js
let a = 1
console.log(a) //1
console.log(b) //Uncaught ReferenceError: b is not defined
let b = 2
```

### 全局声明

使用 let 在全局作用域中声明的变量不会成为 window 对象的属性，var 声明的变量则会

```js
var name = 'Matt'
console.log(window.name) //'Matt'
```

```js
let age = 'Matt'
console.log(window.name) //undefined
```

### for 循环中的 let 声明

用 var 声明，for 循环定义的迭代变量会渗透到循环体外部，而 let 声明则不会

```js
for (var i = 0; i < 5; i++) {
  //循环逻辑
}
console.log(i) //5
```

```js
for (let i = 0; i < 5; i++) {
  //循环逻辑
}
console.log(i) //ReferenceError
```

var 和 let 在 for 循环中的区别

```js
//在循环退出时，迭代变量保存的是导致循环退出的值。
for (var i = 0; i < 10; i++) {
  console.log(i) //0  1  2  3  4  5  6  7  8 9
  setTimeout(function () {
    // 同步注册回调函数到 异步的 宏任务队列。
    console.log(i) // 执行此代码时，同步代码for循环已经执行完成
  }, 1000)
}
//先输出 0  1  2  3  4  5  6  7  8 9
//最后输出
//10   共10个
```

```js
// let声明迭代遍历时，JavaScript引擎会在后台为每个迭代循环声明一个新的得带遍历，每个setTimeout引用的都是不同的变量实例。
for (let i = 0; i < 10; i++) {
  console.log(i); //0  1  2  3  4  5  6  7  8 9
  setTimeout(function() {
    console.log(i);    //  i 是循环体内局部作用域，不受外界影响。
  }, 1000);
}
//先输出 0  1  2  3  4  5  6  7  8 9
// 输出结果：
0  1  2  3  4  5  6  7  8 9
```

var 是在全局范围有效，所以执行 setTimeout 里的函数时，先是在函数内部寻找 index 变量，没有找到，所以去外层找，找到！这时 index 已经执行完循环，所以值为 10;

而 let 则是声明在 for 循环的内部的，每一次 for 循环，一个 block 上下文，每次 for 循环都建立如下 block

```js
{
  let index = 0
  setTimeout(function () {
    console.log(index)
  }, 10)
}
```

另外，for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域，下面代码正确运行，输出了 3 次 love，这表明函数内部的变量 i 与循环变量 i 不在同一个作用域，有各自单独的作用域

```js
for (let i = 0; i < 3; i++) {
  let i = 'love'
  console.log(i)
}
// love
// love
// love
```

### const

const 除了具有 let 的上述特点外；还具备一个特点，声明变量时必须同时初始化变量，一旦定义后，就不能修改，即 const 声明的为常量

## 函数提升

函数声明会被提升，但是函数表达式却不会被提升；在 js 中函数提升优先级会高于变量提升

```js
var a = true
foo()

function foo() {
  if (a) {
    var a = 10
  }
  console.log(a)
}
//等价于
function foo() {
  var a
  if (a) {
    a = 10
  }
  console.log(a) // undefined
}
var a
a = true
foo()
```

```js
console.log(v1)
var v1 = 100
function foo() {
  console.log(v1)
  var v1 = 200
  console.log(v1)
}
foo()
console.log(v1)
//执行结果
//undefined
//undefined
//200
//100
```
