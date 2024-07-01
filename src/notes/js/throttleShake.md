# 节流和防抖 [](#throttle-shake)

- 节流：n 秒内连续不断的触发某事件，单位时间内只生效一次
- 防抖：n 秒后再执行该事件，若在 n 秒内又被触发，则重新计时

节流实现：

```js
var span = document.getElementById('span')
let timer = null

// fn是你要调用的函数，delay是防抖的时间
function debounce(fn, delay) {
  timer = setTimeout(() => {
    fn()
    timer = null
  }, delay)
}

span.addEventListener('click', () => {
  if (timer) return
  debounce(() => console.log(111), 2000)
})
```

防抖实现：

```js
var span = document.getElementById('span')
let timer = null

// fn是你要调用的函数，delay是防抖的时间
function debounce(fn, delay) {
  timer = setTimeout(() => {
    fn()
  }, delay)
}

span.addEventListener('click', () => {
  clearTimeout(timer)
  debounce(() => console.log(111), 3000)
})
```
