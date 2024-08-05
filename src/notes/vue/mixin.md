# 混入 mixin [](#混入mixin)

## 局部混入 [](#局部混入)

定义一个 mixin 对象，有组件 options 的 data、methods 属性

```js
// mixin.js定义
let myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

export default myMixin

// 组件中使用
import myMixin from './mixins'
export default {
    name: 'Home',
    mixins: [myMixin]
}
```

该组件在使用的时候，通过 mixins 属性调用 mixin 对象，混合了 mixin 里面的方法，在自动执行 created 生命钩子，执行 hello 方法

## 全局混入 [](#全局混入)

通过 Vue.mixin()方法

```js
Vue.mixin({
  created: function () {
    console.log('全局混入')
  }
})

import mixin from './mixins'
Vue.mixin(mixin)
```
