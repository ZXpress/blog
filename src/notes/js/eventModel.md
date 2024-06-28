# 事件模型 [](#event-model)

事件模型分为三种：

- 原始事件模型
- 标准事件模型
- IE 事件模型（基本不用）

## 原始事件模型 [](#original-event)

> 只支持冒泡不支持捕获，同一种类型的事件只能绑定一次，后绑定的会覆盖前面
>
> 事件绑定监听函数比较简单, 有两种方式

- HTML 代码中绑定

```js
<input type="button" onclick="fun()">
```

- 通过 js 绑定

```js
var btn = document.getElementById('.btn')
btn.onclick = fun
```

## 标准事件模型 [](#standard-event)

> 三个阶段：事件捕获阶段、事件处理阶段、事件冒泡阶段
>
> 绑定方式：第三个参数用于指定是否在捕获阶段进行处理，默认为 false

```js
addEventListener(eventType, handler, useCapture)
```
