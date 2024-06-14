# defineAsyncComponent 函数实现懒加载组件 [​](#defineAsyncComponent)

defineAsyncComponent 函数接受一个返回 Promise 的加载器函数，如果组件已经被加载，应该调用 resolve 回调，而 reject 回调则表示加载组件失败

```vue
<template>
  <AsyncComp />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // 加载组件
    resolve(/* loaded component */)
  })
})
</script>
```

defineAsyncComponent 高级选项

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Loading from './components/Loading.vue'

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./components/HelloWorld.vue'))
      }, 2000)
    }),

  // 加载异步组件时使用的组件
  loadingComponent: Loading,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  // errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
</script>

<template>
  <div id="App">
    <div>app</div>
    <AsyncComp></AsyncComp>
  </div>
</template>
```

懒加载效果如下所示：

<video autoplay width="320" height="240" loop muted>
  <source src="../../public/vue/asyncComponents.mp4"  type="video/mp4">
</video>
