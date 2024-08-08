# axios 取消请求 [](#cancelToken)

CancelToken 两种方式

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
