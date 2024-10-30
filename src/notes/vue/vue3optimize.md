# vue3 的设计目标和优化 [](#vue3-的设计目标和优化)

## vue3 优化概括 [](#vue3优化概括)

### 更小

Vue3 移除一些不常用的 API

引入 tree-shaking，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了

### 更快

主要体现在编译方面：

- diff 算法优化
- 静态提升
- 事件监听缓存
- SSR 优化

### 更友好

vue3 在兼顾 vue2 的 options API 的同时还推出了 composition API，大大增加了代码的逻辑组织和代码复用能力，同时，VUE3 是基于 typescipt 编写的，可以享受到自动的类型定义提示

这里代码简单演示下：

存在一个获取鼠标位置的函数

```js
import { toRefs, reactive } from 'vue'
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  const update = (e) => {
    state.x = e.pageX
    state.y = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return toRefs(state)
}
```

我们只需要调用这个函数，即可获取 x、y 的坐标，完全不用关注实现过程

## 优化方案 [](#优化方案)

vue3 从很多层面做了优化，可以分为三个方面：

- 源码
- 性能
- 语法 API

### 源码

源码可以从两个层面展开：

- 源码管理
- TypeScript

#### 源码管理

vue3 整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages 目录下面不同的子目录中

> Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。Monorepo 提倡了开放、透明、共享的组织文化，这种方法已经被很多大型公司广泛使用，如 Google、Facebook 和 Microsoft 等

<img src="/vue/optimize.png" style="zoom:50%" />

这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性

#### TypeScript

Vue3 是基于 typeScript 编写的，提供了更好的类型检查，能支持复杂的类型推导

### 性能

vue3 性能优化方面：

- 体积优化
- 编译优化
- 数据劫持优化

#### 数据劫持优化

在 vue2 中，数据劫持是通过 Object.defineProperty，这个 API 有一些缺陷，并不能检测对象属性的添加和删除

```js
Object.defineProperty(data, 'a', {
  get() {
    // track
  },
  set() {
    // trigger
  }
})
```

尽管 Vue 为了解决这个问题提供了 set 和 delete 实例方法，但是对于用户来说，还是增加了一定的心智负担

同时在面对嵌套层级比较深的情况下，就存在性能问题

```js
default {
  data: {
    a: {
      b: {
          c: {
          d: 1
        }
      }
    }
  }
}
```

相比之下，vue3 是通过 proxy 监听整个对象，那么对于删除还是监听当然也能监听到

同时 Proxy 并不能监听到内部深层次的对象变化，而 Vue3 的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归

### 语法 API

这里说的就是 composition API，其两大显著的优化：

- 优化逻辑组织
- 优化逻辑复用

#### 逻辑组织

一张图，我们可以很直观地感受到 Composition API 在逻辑组织方面的优势

<img src="/vue/optimize1.png" style="zoom:50%" />

相同功能的代码编写在一块，而不像 options API 那样，各个功能的代码混成一块

#### 逻辑复用

在 vue2 中，我们是通过 mixin 实现功能混合，如果多个 mixin 混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰

而通过 composition 这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可

获取鼠标位置的例子：

```js
import { toRefs, reactive, onUnmounted, onMounted } from 'vue'
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  const update = (e) => {
    state.x = e.pageX
    state.y = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return toRefs(state)
}
```

组件使用

```js
import useMousePosition from './mouse'
export default {
  setup() {
    const { x, y } = useMousePosition()
    return { x, y }
  }
}
```

可以看到，整个数据来源清晰了，即使去编写更多的 hook 函数，也不会出现命名冲突的问题
