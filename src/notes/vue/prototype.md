# vue2 和 vue3 挂载全局方法 [​](#prototype)

## vue2 [​](#vue2)

```js
// main.js文件中引入构造函数，并且挂载在构造函数上
import Vue from 'vue'
Vue.prototype.$axios = axios
// 全局调用
this.axios()
```

## vue3 [​](#vue3)

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

app.config.globalProperties.$axios = axios

// 全局调用
import { getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
proxy.$axios()
```
