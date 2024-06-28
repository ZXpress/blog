# apply、call、bind 的区别 [](#contrast)

## apply [](#apply)

> apply 第一个参数为 this 的指向，第二个参数是一个数组，改变 this 的指向后原函数会立即执行。当第一个参数为 null 或者 undefined 的时候，默认指向 window（此方法临时改变 this 指向一次）

```js
function fn(...args) {
  console.log(this, args)
}
let obj = {
  myname: '张三'
}

fn.apply(obj, [1, 2]) // 张三, [1,2]     this会变成传入的obj，传入的参数必须是一个数组；
fn(1, 2) // this指向window

fn.apply(null, [1, 2]) // this指向window
fn.apply(undefined, [1, 2]) // this指向window
```

## call [](#call)

> call 方法同 apply，第一个参数也同 apply，后面传入的是一个参数列表

```js
function fn(...args) {
  console.log(this, args)
}
let obj = {
  myname: '张三'
}

fn.call(obj, 1, 2) // 张三,[1,2]   this会变成传入的obj，传入的参数必须是一个数组；
fn(1, 2) // this指向window
```

## bind [](#bind)

> bind 方法类似于 call，但是改变 this 指向后返回一个永久改变 this 指向的函数
