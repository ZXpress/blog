# v-if 和 v-for 为什么不建议放在一起 [](#v-if和v-for为什么不建议放在一起)

> v-for 的优先级高于 v-if，每次渲染都是先循环再进行条件判断，带来性能方面的浪费

如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项

```js
computed: {
    items: function() {
      return this.list.filter(function (item) {
        return item.isShow
      })
    }
}
```
