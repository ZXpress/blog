# 透传 Attributes [​](#attributes)

透传 attributes 指的是传递给一个组件，却没有被改组件声明为 props 或者 emits 的 attribute 或者`v-on`事件监听器，最常见的例子就是`class`、`style`和`id`

```js
// 子组件MyButton
<template>
    <button>click me</button>
</template>

<style>
    .red{
        color: red
    }
</style>

//父组件
<template>
    <MyButton class="red"></MyButton>
</template>
```

这里 class 被视作透传 attribute，自动透传到子组件根元素上（透传只对根元素有效）
