# promise [](#promise)

Promise 封装了一个异步操作并且可以获取成功或者失败的结果，有三种状态：pending 初始状态、fulfilled 成功状态、rejected 失败状态

状态改变只会有两种情况：pending=>fulfilled，pending=>rejected 一旦发生就不会再变

Promise 原理：构造一个 Promsie 实例，参数为一个函数，函数有两个形参，一个 resolve，一个 reject，执行 resolev 状态变为 fulfilled ，会执行.then 方法该参数是 resolve(res) 返回的结果；执行 reject 状态变为 rejected 会执行 catch 方法，参数为 reject(err) 返回的结果

Promise 链式调用：

```js
const ppp = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('a')
  }, 1000)
})
  .then((res) => {
    console.log('res1', res)
    return new Promise((resolve) => resolve(res + 'a'))
  })
  .then((res) => {
    console.log('res', res)
    return new Promise((resolve) => resolve(res + 'a'))
  })
  .then((res) => {
    console.log('res3', res)
  })
```

简写可以省略 promise 不写，直接返回

```js
const pppp = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('a')
  }, 1000)
})
  .then((res) => {
    return res + 'a'
  })
  .then((res) => {
    return res + 'a'
  })
  .then((res) => {
    console.log('res3', res)
  })
```

## Promise.resolve() [](#promiseresolve)

有时需要将现有对象转为 Promise 对象，Promise.resolve 方法就起到这个作用

```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'))
```

Promise.resolve 等价于下面的写法

```js
Promise.resolve('foo')
// 等价于
new Promise((resolve) => resolve('foo'))
```

Promise.resolve 的参数分为四种情况

### 参数是一个 Promise 实例

如果参数是 Promise 实例，那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例

```js
//如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
function fn(resolve) {
  setTimeout(function () {
    return resolve(123)
  }, 3000)
}
let p0 = new Promise(fn)
let p1 = Promise.resolve(p0)
// 返回为true，返回的 Promise 即是 入参的 Promise 对象。
console.log(p0 === p1)
```

### 参数是一个 thenable 对象

thenable 对象指的是具有 then 方法的对象，比如下面这个对象

```js
let thenable = {
  then: function (resolve, reject) {
    resolve(42)
  }
}
```

Promise.resolve 方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法

ES6 Promises 里提到了 Thenable 这个概念，简单来说它就是一个非常类似 Promise 的东西，最简单的例子就是 jQuery.ajax，它的返回值就是 thenable 对象，但是要谨记，并不是只要实现了 then 方法就一定能作为 Promise 对象来使用

```js
let thenable = {
  then: function (resolve, reject) {
    resolve(42)
  }
}

let p1 = Promise.resolve(thenable)
p1.then(function (value) {
  console.log(value) // 42
})
```

上面代码中，thenable 对象的 then 方法执行后，对象 p1 的状态就变为 resolved，从而立即执行最后那个 then 方法指定的回调函数，输出 42

### 参数不是具有 then 方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 resolved

```JS
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

### 不带有任何参数

Promise.resolve 方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象，所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 Promise.resolve 方法

```js
const p = Promise.resolve()

p.then(function () {
  // ...
})
```

需要注意的是，立即 resolve 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时

```js
setTimeout(function () {
  console.log('three')
}, 0)

Promise.resolve().then(function () {
  console.log('two')
})

console.log('one')

// one
// two
// three
```

上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出

## Promise.reject() [](#promisereject)

与 resolve 不同的是，返回的 promise 对象的状态为 rejected

```js
const p = Promise.reject('出错了')
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
})
// 出错了
```

```js
const thenable = {
  then(resolve, reject) {
    reject('出错了')
  }
}

Promise.reject(thenable).catch((e) => {
  console.log(e === thenable)
})
// true
```

## Promise.race() [](#promiserace)

只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变，那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数

```js
const p = Promise.race([p1, p2, p3])
```

## Promise.any() [](#promiseany)

该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回，只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态

Promise.any()跟 Promise.race()方法很像，只有一点不同，就是 Promise.any()不会因为某个 Promise 变成 rejected 状态而结束，必须等到所有参数 Promise 变成 rejected 状态才会结束
