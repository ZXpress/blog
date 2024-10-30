# vue3 内置组件 teleport [](#vue3内置组件-teleport)

它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去

通过 to 属性将 teleport 包裹的代码片段发送到 body 标签下，to 的值可以是一个 css 选择器字符串，也可以是一个 DOM 元素对象

```template
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下”
