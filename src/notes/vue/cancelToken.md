# 取消请求 [](#cancelToken)

## axios 的 CancelToken 两种使用方式 [](#axios-的-canceltoken-两种使用方式)

```js
// 方式一
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('xxxx', {
  cancelToken: source.token
})
// 取消请求 (请求原因是可选的)
source.cancel('主动取消请求')

// 方式二
const CancelToken = axios.CancelToken
let cancel

axios.get('xxxx', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  })
})
cancel('主动取消请求')
```

## fetch 使用 AbortController [](#fetch使用abortcontroller)

```js
const controller = new AbortController()
const signal = controller.signal
fetch('https://somewhere', { signal })
controller.abort()
```

## xhr 使用 xhr.abort() [](#xhr使用xhrabort)

```js
const xhr = new XMLHttpRequest(),
const method = 'GET',
const url = 'https://developer.mozilla.org/'
xhr.open(method, url, true)

xhr.send()

// 取消发送请求
xhr.abort()
```
