# useLayoutEffect 和 useEffect 的区别 [](#useLayoutEffect)

## 执行时机 [](#执行时机)

- useEffect 是在所有 DOM 变更之后，浏览器绘制完成之后异步执行，不会阻塞浏览器的绘制
- useLayoutEffect 是在所有 DOM 变更之后，浏览器绘制之前同步执行，会阻塞浏览器的绘制

## 使用场景 [](#使用场景)

一般推荐默认使用 useEffect，只有在涉及到需要在布局渲染阶段同步执行的 DOM 操作或有严格的顺序要求时，才使用 useLayoutEffect，由于 useLayoutEffect 会在绘制前执行，如果操作耗时过长，可能会导致用户感觉到卡顿。因此，除非必要，否则建议优先使用 useEffect
