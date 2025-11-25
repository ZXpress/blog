# 自定义指令 [​](#custom-directives)

## Vue2 自定义指令 [](#vue2-introduction)

### 组件局部注册

```vue
<template>
  <div>
    <input type="text" v-focus="123" />
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      // 自定义指令的名字
      // 下面每个方法都是一个钩子函数
      // el代表 当前绑定的dom元素
      bind: (el, binding) => {
        el.value = 56 // 可以赋值 不能使用方法
        console.log('bind:只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。')
      },
      inserted: (el, binding) => {
        el.focus() // 可以使用方法
        console.log('inserted:被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。')
      },
      update: (el, binding) => {
        console.log('update:被绑定元素所在模板更新时调用,模板还没更新完成')
      },
      componentUpdated: (el, binding) => {
        console.log('componentUpdated:指令所在组件的 VNode 及其子 VNode 全部更新后调用。')
      },
      unbind: (el, binding) => {
        console.log('unbind:只调用一次，指令与元素解绑时调用。')
      }
    }
  }
}
</script>
```

### 全局注册

```js
Vue.directive('focus', {
  inserted: function (el, bind) {
    el.focus()
    console.log(el, bind)
  }
})
```

### 插件形式

```js
export default {
  install(Vue) {
    Vue.directive('focus', {
      inserted: function (el, bind) {
        el.focus()
        console.log(el, bind)
      }
    })
  }
}

//main.js
import directive from './views/directive'
Vue.use(directive)
```

### 应用场景：表单防止重复提交

event.stopImmediatePropagation()：如果多个事件监听器被附加到相同元素的相同事件类型上，如果在其中一个事件监听器中执行 stopImmediatePropagation() ，那么剩下的事件监听器都不会被调用

```js
// 1.设置v-throttle自定义指令
Vue.directive('throttle', {
  bind: (el, binding) => {
    let throttleTime = binding.value; // 节流时间
    if (!throttleTime) { // 用户若不设置节流时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
// 2.为button标签设置v-throttle自定义指令
<button @click="sayHello" v-throttle>提交</button>
```

## Vue3 自定义指令 [](#vue3-introduction)

包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。下面是一个自定义指令的例子，当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // 在模板中启用 v-focus
    focus
  }
}
```

<script setup>
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<input class="input" v-focus />

<style>
.input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 5px
}
</style>

假设你还未点击页面中的其他地方，那么上面这个 input 元素应该会被自动聚焦。该指令比 `autofocus` attribute 更有用，因为它不仅仅可以在页面加载完成后生效，还可以在 Vue 动态插入元素后生效。

在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令。在上面的例子中，`vFocus` 即可以在模板中以 `v-focus` 的形式使用。

在没有使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

和组件类似，自定义指令在模板中使用前必须先注册。在上面的例子中，我们使用 `directives` 选项完成了指令的局部注册。

将一个自定义指令全局注册到应用层级也是一种常见的做法：

```js
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

注意：

只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。其他情况下应该尽可能地使用 `v-bind` 这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好。

### 插件形式

```js
export default {
  install(app) {
    app.directive('test', {
      mounted(el, binding) {
        console.log(el, binding)
      }
    })
  }
}
```

### 指令钩子 [​](#directive-hooks)

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

#### 钩子参数 [​](#hook-arguments)

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。

  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。

- `vnode`：代表绑定元素的底层 VNode。
- `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

举例来说，像下面这样使用指令：

```html
<div v-example:foo.bar="baz"></div>
```

`binding` 参数会是一个这样的对象：

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

和内置指令类似，自定义指令的参数也可以是动态的。举例来说：

```html
<div v-example:[arg]="value"></div>
```

这里指令的参数会基于组件的 `arg` 数据属性响应式地更新。

注意：

除了 `el` 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) attribute 实现。

### 简化形式 [​](#function-shorthand)

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

### 对象字面量 [​](#object-literals)

如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。别忘了，指令也可以接收任何合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

### 在组件上使用 [​](#usage-on-components)

不推荐

不推荐在组件上使用自定义指令，当组件具有多个根节点时可能会出现预期外的行为。

当在组件上使用自定义指令时，它会始终应用于组件的根节点，和[透传 attributes](https://cn.vuejs.org/guide/components/attrs.html) 类似。

```html
<MyComponent v-demo="test" />
```

```html
<!-- MyComponent 的模板 -->

<div>
  <!-- v-demo 指令会被应用在此处 -->
  <span>My component content</span>
</div>
```

需要注意的是组件可能含有多个根节点。当应用到一个多根组件时，指令将会被忽略且抛出一个警告。和 attribute 不同，指令不能通过 `v-bind="$attrs"` 来传递给一个不同的元素。

## Vue2 和 Vue3 中的区别 [](#vue2和vue3中的区别)

vue2 中绑定的钩子函数为

- bind - 指令绑定到元素后发生。只发生一次
- inserted - 元素插入父 DOM 后发生
- update - 当元素更新，但子元素尚未更新时，将调用此钩子
- componentUpdated - 一旦组件和子级被更新，就会调用这个钩子
- unbind - 一旦指令被移除，就会调用这个钩子。也只调用一次

vue3 中

- bind → beforeMount
- inserted → mounted (vue3 中使用的 mounted)
- beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
- componentUpdated → updated
- beforeUnmount：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
- unbind -> unmounted
