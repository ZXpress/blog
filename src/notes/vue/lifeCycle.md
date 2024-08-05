# VUE 生命周期 [](#life-ycle)

```js
vue2           ------->      vue3

beforeCreate   -------->      setup(()=>{})
created        -------->      setup(()=>{})
beforeMount    -------->      onBeforeMount(()=>{})
mounted        -------->      onMounted(()=>{})
beforeUpdate   -------->      onBeforeUpdate(()=>{})
updated        -------->      onUpdated(()=>{})
beforeDestroy  -------->      onBeforeUnmount(()=>{})
destroyed      -------->      onUnmounted(()=>{})
activated      -------->      onActivated(()=>{})
deactivated    -------->      onDeactivated(()=>{})
errorCaptured  -------->      onErrorCaptured(()=>{})
```

onErrorCaptured：注册一个钩子，在捕获了后代组件传递的错误时调用

错误可以从以下几个来源捕获：

1. 事件处理器
2. 生命周期钩子
3. setup()函数
4. 侦听器
5. 自定义指令钩子
6. 过渡钩子

这个钩子有三个实参：错误对象(err)、触发该错误的组件实例(vm)，以及一个说明错误来源类型的信息字符串(info)

如果组件的继承链或组件链上存在多个 errorCaptured 钩子，对于同一个错误，这些钩子会被按从底至上的顺序一一调用。这个过程被称为“向上传递”，类似于原生 DOM 事件的冒泡机制

如果 errorCaptured 钩子本身抛出了一个错误，那么这个错误和原来捕获到的错误都将被发送到 app.config.errorHandler

```js
// main.js
app.config.errorHandler = (err, instance, info) => {
  // 处理错误，例如：报告给一个服务
}
```

errorCaptured 钩子可以通过返回 false 来阻止错误继续向上传递，即表示“这个错误已经被处理了，应当被忽略”，它将阻止其他的 errorCaptured 钩子或 app.config.errorHandler 因这个错误而被调用
