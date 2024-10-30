# 浏览器中 cookie 有哪些字段 [](#浏览器中cookie有哪些字段)

## Name [](#name)

Cookie 的名称

## Value [](#Value)

Cookie 的值

## Domain [](#Domain)

Cookie 对应的域名，只有来自该域名的请求才会携带这个 Cookie

## Path [](#Path)

Cookie 的路径。只有访问该路径的请求才会携带这个 Cookie

## Expires/Max-Age [](#Expires/Max-Age)

Cookie 的过期时间。如果设置了 Max-Age，Cookie 将在 Max-Age 秒后过期。如果设置了 Expires，Cookie 将在指定的日期/时间过期

## Size [](#Size)

Cookie 的大小

## HttpOnly [](#HttpOnly)

如果此字段被设置，那么通过 JavaScript 等客户端脚本将无法访问此 Cookie。这有助于防止跨站脚本攻击（XSS）

## Secure [](#Secure)

如果此字段被设置，那么这个 Cookie 只会被发送到 HTTPS 协议的服务器

## SameSite [](#SameSite)

这个字段用于防止跨站请求伪造攻击（CSRF）。它有三个可能的值：Strict、Lax 和 None。如果设置为 Strict，Cookie 只会在同站请求中发送。如果设置为 Lax，Cookie 会在同站请求以及部分跨站请求中发送。如果设置为 None，Cookie 会在所有请求中发送

## 设置 cookie [](#设置cookie)

前端使用 document.cookie 属性来读写当前网页的 Cookie，写入的时候，Cookie 的值必须写成 key=value 的形式

```js
// 旧方式
document.cookie = 'a=3'

// 也可以使用新的 API
cookieStore.set('a', 3)
```

### CookieStore.delete()

delete() 方法通过 name 或 options 对象删除 cookie，返回一个删除完成后兑现的 Promise

### CookieStore.get()

get() 方法获通过 name 或 options 对象获取一个 cookie，返回一个兑现为 cookie 详细信息的 Promise

### CookieStore.getAll()

getAll() 方法获取所有匹配的 cookie，返回一个兑现为 cookie 列表的 Promise

### CookieStore.set()

set() 方法通过给定的 name 和 value 或 options 对象设置 cookie，返回一个设置成功后兑现的 Promise
