# v-show 和 v-if [](#v-show和v-if的区别)

## v-show 和 v-if 区别 [](#v-show和v-if区别)

1. v-show 隐藏是为该元素添加 display：none，dom 元素依旧还在，v-if 是将整个 dom 元素添加或者删除
2. v-show 由 false 变为 true 的时候不会触发组件的生命周期，v-if 由 false 变为 true 的时候，触发组件的 beforeCreate、created、beforeMount、mounted 钩子，由 true 变为 false 的时候触发组件的 beforeDestory、destoryed 方法
3. v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗

## v-show 和 v-if 原理 [](#v-show和v-if原理)

- v-show：不管初始条件是什么，元素总是会被渲染，有 transition 就执行 transition，没有就直接设置 display 属性
- v-if：返回一个 node 节点，render 函数通过表达式的值来决定是否生成 DOM
