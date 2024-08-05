# defineModel 配合 v-model 实现数据双向绑定 [](#definemodel配合v-model实现数据双向绑定)

## vue3.4 以前的双向绑定 [](#vue3.4以前的双向绑定)

> v-model 只是一个语法糖，实际就是给组件定义了 modelValue 属性和监听 update:modelValue 事件，所以我们以前要实现数据双向绑定需要给子组件定义一个 modelValue 属性，并且在子组件内要更新 modelValue 值时需要 emit 出去一个 update:modelValue 事件，将新的值作为第二个字段传出去

```vue
<!-- 父组件代码 -->
<template>
  <CommonInput v-model="inputValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<!-- 子组件代码 -->
<template>
  <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>

<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
```

## 使用 defineModel 实现数据双向绑定 [](#使用definemodel实现数据双向绑定)

### demo

```vue
<!-- 父组件 -->
<template>
  <CommonInput v-model="inputValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<!-- 子组件 -->
<template>
  <input v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel()
model.value = 'xxx'
</script>
```

```vue
<template>
  <CommonInput v-model:inputValue="inputValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<!-- 子组件 -->
<template>
  <input v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel('inputValue')
model.value = 'xxx'
</script>
```

> 在上面的例子中我们直接将 defineModel 的返回值使用 v-model 绑定到 input 输入框上面，无需定义 modelValue 属性和监听 update:modelValue 事件，代码更加简洁。defineModel 的返回值是一个 ref，我们可以在子组件中修改 model 变量的值，并且父组件中的 inputValue 变量的值也会同步更新，这样就可以实现双向绑定

## 实现原理 [](#实现原理)

> defineModel 其实就是在子组件内定义了一个叫 model 的 ref 变量和 modelValue 的 props，并且 watch 了 props 中的 modelValue，当 props 中的 modelValue 的值改变后会同步更新 model 变量的值，并且当在子组件内改变 model 变量的值后会抛出 update:modelValue 事件，父组件收到这个事件后就会更新父组件中对应的变量值

```vue
<template>
  <input v-model="model" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const model = ref()

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue
  }
)
watch(model, () => {
  emit('update:modelValue', model.value)
})
</script>
```

## defineModel 定义 type、default 等 [](#definemodel定义typedefault等)

> 既然 defineModel 是声明了一个 prop，那同样也可以定义 prop 的 type、default、required 和 validator，用法和 prop 一样

```js
const model = defineModel({ type: String, default: '20' })
```

## defineModel 使用内置修饰符和自定义修饰符[](#definemodel使用内置修饰符和自定义修饰符)

如果要使用系统内置的修饰符比如 trim，父组件的写法还是和之前是一样的，子组件也无需做任何修改

```template
<CommonInput v-model.trim="inputValue" />
```

defineModel 也支持自定义修饰符，比如我们要实现一个将输入框的字母全部变成大写的 uppercase 自定义修饰符，同时也需要使用内置的 trim 修饰符

我们的父组件代码如下：

```template
<CommonInput v-model.trim.uppercase="inputValue" />
```

子组件代码如下：

```vue
<template>
  <input v-model="modelValue" />
</template>

<script setup lang="ts">
const [modelValue, modelModifiers] = defineModel({
  // get我们这里不需要
  set(value) {
    if (modelModifiers.uppercase) {
      return value?.toUpperCase()
    }
  }
})
</script>
```

这时我们给 defineModel 传进去的第一个参数就是包含 get 和 set 方法的对象，当对 modelValue 变量进行读操作时会走到 get 方法里面去，当对 modelValue 变量进行写操作时会走到 set 方法里面去

defineModel 的返回值也可以解构成两个变量，第一个变量就是我们前面几个例子的 ref 对象，用于给 v-model 绑定。第二个变量是一个对象，里面包含了有哪些修饰符，在这里我们有 trim 和 uppercase 两个修饰符，所以 modelModifiers 的值为

```js
{
  trim: true,
  uppercase: true
}
```
