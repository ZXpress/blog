# 内存泄漏情况 [](#memory-leakage)

- 全局不再使用的变量
- 定时器造成的内存泄漏

```js
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);
```

如果 id 为 Node 的元素从 DOM 中移除，该定时器仍会存在，同时，因为回调函数中包含对 someResource 的引用，定时器外面的 someResource 也不会被释放

- 闭包函数：类似定时器情况，维持函数内部局部变量，使其得不到释放
- 事件监听 addEventListener，在不监听的的情况下使用 removeEventListener 取消监听
