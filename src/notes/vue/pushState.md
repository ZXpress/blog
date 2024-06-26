# pushState 和 replaceState [​](#pushState-replaceState)

## 简介 [](#introduce)

HTML5 引入了 [history.pushState()](<https://developer.mozilla.org/zh-CN/docs/Web/API/History_API#The_pushState()_method> 'https://developer.mozilla.org/zh-CN/docs/Web/API/History_API#The_pushState()_method') 和 [history.replaceState()](<https://developer.mozilla.org/zh-CN/docs/Web/API/History_API#The_replaceState()_method> 'https://developer.mozilla.org/zh-CN/docs/Web/API/History_API#The_replaceState()_method') 方法，它们分别可以添加和修改历史记录条目。这些方法通常与[window.onpopstate](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowEventHandlers/onpopstate 'https://developer.mozilla.org/zh-CN/docs/Web/API/WindowEventHandlers/onpopstate') 配合使用

## pushState() 方法 [](#pushState)

`pushState()` 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个 URL. 让我们来解释下这三个参数详细内容：

> **状态对象** — 状态对象 state 是一个 JavaScript 对象，通过 pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate 事件就会被触发，且该事件的 state 属性包含该历史记录条目状态对象的副本

> **标题** — 目前忽略这个参数被忽略，但未来可能会用到。传递一个空字符串在这里是安全的，而在将来这是不安全的。二选一的话，你可以为跳转的 state 传递一个短标题

> **URL** — 该参数定义了新的历史 URL 记录。注意，调用 `pushState()` 后浏览器并不会立即加载这个 URL，但可能会在稍后某些情况下加载这个 URL，比如在用户重新打开浏览器时

## replaceState() 方法 [](#replaceState)

`history.replaceState()` 的使用与 `history.pushState()` 非常相似，区别在于 `replaceState()` 是修改了当前的历史记录项而不是新建一个，在浏览器返回的时候不会返回到修改前的 url，<a href='#popstate-事件的例子'>参考下方例子</a>

## popstate 事件 [](#popstate)

每当处于激活状态的历史记录条目发生变化时,`popstate` 事件就会在对应 window 对象上触发。 如果当前处于激活状态的历史记录条目是由`history.pushState()`方法创建，或者由`history.replaceState()`方法修改过的, 则`popstate`事件对象的`state`属性包含了这个历史记录条目的 state 对象的一个拷贝

我们也可以直接在 history 对象上获取`state`，如下：

```js
var currentState = history.state
```

需要注意的是，调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件。 `popstate`事件只会在浏览器某些行为下触发， 比如点击后退、前进按钮(或者在 JavaScript 中调用`history.back()`、`history.forward()`、`history.go()`方法)

## popstate 事件的例子 [](#popstate-example)

假如当前网页地址为 `http://example.com/example.html` ,则运行下述代码后:

```js
window.onpopstate = function (event) {
  alert('location: ' + document.location + ', state: ' + JSON.stringify(event.state))
}
//绑定事件处理函数.
history.pushState({ page: 1 }, 'title 1', '?page=1') //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({ page: 2 }, 'title 2', '?page=2') //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({ page: 3 }, 'title 3', '?page=3') //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back() // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back() // 弹出 "location: http://example.com/example.html, state: null
history.go(2) // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```
