# 主线程死循环指定时间的 js 代码 [](#endless-loop)

```js
function delay(duration) {
  const start = Date.now()
  while (Date.now() - start < duration) {}
}
```
