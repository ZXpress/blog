# v-pre 跳过该元素及其所有子元素的编译 [​](#v-pre)

元素内具有 v-pre，所有 Vue 模板语法都会被保留并按原样渲染。最常见的用例就是显示原始双大括号标签及内容

```vue
// 未加v-pre显示Hello world
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello world')
</script>

<template>
  <div class="app">
    <span>{{ msg }}</span>
  </div>
</template>
```

```vue
// 加v-pre显示{{ msg }}
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello world')
</script>

<template>
  <div class="app">
    <span v-pre>{{ msg }}</span>
  </div>
</template>
```
