# 组件中通信方式 [](#组件中通信方式)

## props 传递数据 [](#props)

## this.$emit [](#emit)

## this.$refs.app 获取子组件实例[](#refs)

## EventBus 事件总线，$emit、$on、$ff 销毁 [](#eventbus)

```js
// event-bus.js创建js文件需要时导入
import Vue from 'vue'
export const EventBus = new Vue()

// 在main.js中初始化全局EventBus
// main.js
Vue.prototype.$EventBus = new Vue()
```

## vuex[](#vuex)

## provide、inject[](#provide-inject)

```js
provide(){
    return {
        foo:'foo'
    }
}

inject:['foo'] // 获取到祖先组件传递过来的值
```
