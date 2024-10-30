# localStorage 和 sessionStorage 的区别 [](#localstorage和sessionstorage的区别)

## 作用域不同 [](#作用域不同)

sessionStorage 的作用域限定在当前会话（当前浏览器标签页或窗口），而 localStorage 的作用域是永久的，数据在不同会话（遵循同源策略）之间共享

## 生命周期不同 [](#生命周期不同)

sessionStorage 的数据在会话结束时被清除，即当用户关闭浏览器标签页或窗口时，sessionStorage 中的数据会被删除，而 localStorage 的数据是持久化的，除非被显式清除，否则会一直保存在客户端

sessionStorage 是当前浏览器 tab 页有效，只要当前浏览器的标签关闭，sessionStorage 中的数据就会被清空，无需整个浏览器关闭

## 存储容量不同 [](#存储容量不同)

sessionStorage 的存储容量通常比 localStorage 小，一般来说，sessionStorage 的容量限制在 5MB 左右，而 localStorage 的容量限制通常在 5MB 到 10MB 之间，不同浏览器可能会有所不同

## 数据共享不同 [](#数据共享不同)

sessionStorage 的数据在同一个浏览器标签页或窗口中共享，但不会跨标签页或窗口共享。而 localStorage 的数据在同一个域名下的所有标签页和窗口中共享

关于 sessionStorage 的问题：

浏览器打开了两个标签，访问相同的 URL，在其中一个页面点击按钮清空 sessionStorage ，会对另外一个标签的 sessionStorage 有影响吗？

答案是不会。

在浏览器中，每个标签页都有自己独立的 `sessionStorage` 对象，用于存储会话级别的数据。如果你在一个标签页中执行了清空 `sessionStorage` 的操作，它只会清空当前标签页的 `sessionStorage`，不会对其他标签页的 `sessionStorage` 产生直接影响

当你在一个标签页中清空了 `sessionStorage`，其他标签页中的 `sessionStorage` 数据将保持不变，不会被自动清空。每个标签页都有自己独立的存储空间，它们之间是相互隔离的

如果是 localStorage ，则会有影响。因为 localStorage 遵循浏览器的同源策略（Same Origin Policy）

同源策略是一种安全机制，用于限制不同源（Origin）的网页之间的交互，以防止恶意网页访问其他网页的数据。 在同源策略中，两个网页只有在协议、主机和端口都相同的情况下，两个网页才被认为是同源的

对于 `localStorage`，它的同源策略是基于域名的。只有当两个网页具有相同的协议、主机和端口时，它们才能访问相同的 `localStorage` 数据。如果网页的域名不同，即使在同一个浏览器中打开，它们也无法访问彼此的 `localStorage` 数据

这种同源策略的限制是出于安全考虑。通过限制不同源网页之间的交互，可以防止恶意网页窃取用户的敏感数据或进行其他恶意行为
