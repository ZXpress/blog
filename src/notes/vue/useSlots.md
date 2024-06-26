# useSlots [​](#useSlots)

通过 useSlots 获取插槽，并通过插槽控制模板渲染（也可以直接在模板中通过$slots 获取）

```vue
<template>
  <footer v-if="showFooter">
    <h3>来自底层的仰望</h3>
    <slot name="footer"></slot>
  </footer>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

const showFooter = () => {
  return !!slots.footer
}
</script>
```
