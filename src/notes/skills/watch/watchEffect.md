# watchEffect [​](#watchEffect)

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行

## 第一个参数 ​[](#watchEffect-first)

第一个参数是一个要运行的回调函数。这个回调函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求

```js
watchEffect((onCleanup) => {
  onCleanup(() => {
    console.log('清除副作用')
  })
})
```

## 第二个参数 ​[](#watchEffect-second)

第二个参数是一个可选的配置对象，可以用来调整副作用的刷新时机或调试副作用的依赖，配置项有 flush、onTrack、onTrigger

```js
watchEffect(
  (onCleanup) => {
    onCleanup(() => {
      console.log('清除副作用')
    })
  },
  {
    flush: 'post', // sync  \ pre
    onTrack(e) {
      //被追踪为依赖时触发
      console.log(e)
    },
    onTrigger(e) {
      // 所追踪数据更改时触发
      console.log(e)
    }
  }
)
```

## watchPostEffect() ​[](#watchPostEffect)

watchEffect()使用 flush：'post' 选项时的别名

## watchSyncEffect() ​[](#watchSyncEffect)

watchEffect()使用 flush：'sync' 选项时的别名
