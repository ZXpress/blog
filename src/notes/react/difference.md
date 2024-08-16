# React 和 Vue 的区别 [](#difference)

## 数据绑定 [](#数据绑定)

- vue 是响应式的数据双向绑定（使用 v-model）系统
- react 是单向数据流，没有双向绑定（具体看下方`数据驱动视图`）

## 模板语法 [](#模板语法)

- react 使用 JSX，将标记语言与 JavaScript 逻辑混写

- vue 使用基于 HTML 的模板语法，允许开发者使用纯 HTML、CSS 和 JavaScript

- react 使用 JSX（JavaScript XML），将标记语言与 JavaScript 逻辑混写

## 响应式系统 [](#响应式系统)

- react 通过 setState 和 useState 等 API 显式的触发 UI 更新

- vue 通过其响应式系统自动追踪依赖并在数据变化时更新视图

## 虚拟 dom 区别 [](#虚拟dom)

### 对 dom 的更新策略不同

- vue 通过 Object.defineProperty 把 data 属性的值都转化为监听状态的，当这些被监听的数据的 setter 被调用时，则会`重新执行依赖到这些数据的函数`，使得组件关联更新

- react 需用 setState 和 useState 驱动新的 state 替换旧的 state，当数据改变时以组件为根目录默认全部重新渲染

### diff 算法源码实现不同

- vue 通过跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。 vue 的 diff 算法使用两端对比，边对比边更新 dom

- react 会对虚拟 dom 自顶向下全进行 diff 算法，重新生成新的虚拟 dom 树，新旧虚拟 dom 进行对比，得到 patch 树，再统一操作批量更新 dom（进行 patch 打补丁方式局部更新 dom），react 会以组件为根目录默认全部重新渲染。所以 react 为避免父组件更新引起不必要的子组件更新，可以在 shouldComponentUpdate 做逻辑判断，减少不必要的 render 重新生成虚拟 dom

- vue 比对节点，当节点元素类型相同，但是 className 不同，认为是不同类型元素，删除重建，而 react 会认为是相同类型节点，只是修改节点属性

- 列表对比时，vue 采用从两端到中间的对比方式，而 react 则采用从左到右以此对比的方式。当一个集合，只是把最后一个节点移动到了第一个节点，react 会把前面的节点依次移动，而 vue 只会把最后一个节点移动到第一个

## 数据驱动视图 [](#数据驱动视图)

- vue 数据驱动视图通过 MVVM 模式实现

- react 通过 MVC 模式（M 是 Model 数据部分，V 是 View 视图部分，C 是 Controller 控制器），react 是单向驱动

> react 会根据初始 state(Model)创建一个虚拟 DOM 对象，根据虚拟 dom 生成真实 dom 渲染到页面(View)中。 用户在视图上操作触发使数据变更的事件、react 根据新的数据重新渲染则是发生在控制层(Controller)。而 react 的数据驱动视图则是通过 setState 实现（setState 做了两件事，一件事更新 state，一件是重新引发组件的更新），通过 setState 变更数据后重新调用了一次 render 函数，render 函数会再创建新的虚拟 dom 树， 通过 diff 算法对比后再将发生变更的组件进行重新渲染（变更的组件会作为根目录带动子组件一同渲染，可通过给没有发生数据变化的子组件设置 shouldComponentUpdate 返回 false 来进一步减少不必要的重新渲染）

> react 并没有实现视图驱动数据。react 视图层中的表单内容改变，想要修改数据，需要开发者自己写代码去实现（将表单的 value 属性手动赋值给一个状态值 a，监听表单元素的 change 事件，通过 onChange 获取最新表单内容，再手动修改状态值 a 为其最新表单内容，类似于 Vue 中的 v-model 原理自己手动实现一遍）,因此 react 是“单项驱动”的
