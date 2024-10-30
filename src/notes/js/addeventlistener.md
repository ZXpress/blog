# addeventlistener 的第三个参数 [](#addeventlistener的第三个参数)

一个指定有关 listener 属性的可选参数对象，可用的选项如下：

- capture：Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发

- once：Boolean，表示 listener 在添加之后最多只调用一次，如果是 true，listener 会在其被调用之后自动移除

- passive：Boolean，设置为 true 时，表示 listener 永远不会调用 preventDefault()，如果 listener 仍然调用了这个函数

- signal：AbortSignal，该 AbortSignal 的 abort()方法被调用时，监听器会被移除

<img src="/js/event.png" style="zoom:50%" />
