# 事件循环 [](#event-loop)

## 消息队列 [](#message-queue)

> 消息队列（将以往的宏任务细分，随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法）
>
> 根据 W3C 的最新解释：
>
> - 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列，在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行
> - 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行
>   https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint

在目前 chrome 的实现中，至少包含了下面的队列：

- 延时队列：用于存放计时器到达后的回调任务，优先级「中」
- 交互队列：用于存放用户操作后产生的事件处理任务，优先级「高」
- 微队列：用户存放需要最快执行的任务，优先级「最高」

添加任务到微队列的主要方式主要是使用 Promise、MutationObserver

```js
// 立即把一个函数添加到微队列
Promise.resolve().then(函数)
```

举例：

```js
setTimeout(() => {
  console.log(1)
}, 0)

Promise.resolve().then(() => {
  console.log(2)
})

console.log(3)

// 结果为：3 2 1
```

```js
function a() {
  console.log(1)
  Promise.resolve().then(() => {
    console.log(2)
  })
}

setTimeout(() => {
  console.log(3)
  Promise.resolve().then(a)
}, 0)

Promise.resolve().then(() => {
  console.log(4)
})

console.log(5)

// 结果为：5 4 3 1 2
```

## JS 事件循环 [](#loop)

> - 事件循环又叫做消息循环，是浏览器渲染主线程的工作方式
> - 在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可
> - 过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式
> - 根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务，但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行

## JS 中的计时器能做到精确计时吗

> 不行
>
> - 计算机硬件没有原子钟，无法做到精确计时
> - 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
> - 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
> - 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差