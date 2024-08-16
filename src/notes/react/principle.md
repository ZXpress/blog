# React 工作原理 [](#react工作原理)

> React 会通过编译 jsx 语法生成一个虚拟 dom，通过 setState 实现数据驱动视图，当一个组件中的状态改变时，React 会再生成一个新的虚拟 dom，通过 diff 算法来标记虚拟 DOM 中的改变，再将虚拟 dom 应用于真实 dom 中，以发生变更的组件为根目录进行重新渲染
