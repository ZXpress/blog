# watch [​](#watch)

watch 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数

watch 总共接收三个参数

## 第一个参数 [​](#watch-first)

监听的数据源，来源如下:

- 一个 getter 函数，返回一个值
- 一个 ref()定义的响应式数据
- 一个 reactive()定义的响应式数据
- 以及由以上类型的值组成的数组

## 第二个参数 [​](#watch-second)

是在监听的数据源发生变化时要调用的回调函数。这个回调函数接受三个参数：新值(newValue)、旧值(oldValue)，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求

```js
watch(data, (newValue, OldValue, onCleanup) => {
  console.log('数据变化了', `新值是：${newValue}`, `旧值是${OldValue}`)
  onCleanup(() => {
    console.log('清除副作用')
  })
})
```

当同时监听多个数据源时，回调函数接收两个数组分别对应数据源中的新值和旧值

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

## 第三个参数 [​](#watch-third)

第三个参数是可选参数（options 配置对象），支持以下配置选项

- immediate：在侦听器创建时立即触发回调，第一次调用时旧值是 undefined
- deep：如果数据源时对象，强制深度遍历，（数据源为 reactive 对象会隐式创建一个深层侦听器，且不可通过 {deep: false} 关闭）参考<a href="https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers" target="_blank">深层监听器</a>
- flush：调整回调函数的刷新时机，值有 3 个，'pre' | 'post' | 'sync'（默认是 pre），顺序为 sync、pre、post
  > pre：指定的回调应该在渲染前被调用。post：可以用来将回调推迟到渲染之后的，如果回调需要通过 $refs 访问更新的 DOM 或子组件，那么则使用该值。sync：如果值设置为 sync，一旦值发生了变化，回调将被同步调用，<span style="color:red">它会在 Vue 进行任何更新之前触发</span>（少用，影响性能）
- onTrack/onTrigger：调试侦听器的依赖，当监听项被访问追踪时和更改时触发

```js
// 和computed类似，侦听器也支持onTrack和onTrigger
watch(source, callback, {
  onTrack(e) {
    console.log(e)
    debugger
  },
  onTrigger(e) {
    console.log(e)
    debugger
  }
})
```

- once：回调函数只会运行一次，侦听器将会在回调函数首次运行后停止
