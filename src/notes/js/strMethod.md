# 字符串常用方法 [](#str-method)

## 增 [](#add)

- concat 拼接返回新字符串

## 删 [](#delete)

- slice
- substr 第一个参数都是开始索引，<span style="color: red">第二个参数是截取的字符串长度</span>
- substring 第一个参数都是开始索引，<span style="color: red">第二个参数是截取的字符串索引，不包含尾部</span> （同于 slice）

```js
let stringValue = 'hello world'
console.log(stringValue.slice(3)) // "lo world"
console.log(stringValue.substring(3)) // "lo world"
console.log(stringValue.substr(3)) // "lo world"
console.log(stringValue.slice(3, 7)) // "lo w"
console.log(stringValue.substring(3, 7)) // "lo w"
console.log(stringValue.substr(3, 7)) // "lo worl" -> "第二个参数为截取的长度"
```
