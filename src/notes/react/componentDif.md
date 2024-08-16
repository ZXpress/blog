# 类组件和函数组件的区别 [](#componentDif)

## 语法差异 [](#语法差异)

类组件使用 ES6 的 class 语法定义组件，继承自 React.Component，并通过 render 方法返回组件 UI

函数组件是一个 JS 函数，接收 props 作为参数，返回组件 UI

## 状态管理 [](#状态管理)

在 hooks 出来之前，函数组件称为无状态组件，不能保管组件的状态，后来可以通过 useState 管理 state 状态

## 生命周期支持 [](#生命周期支持)

函数组件中不存在生命周期，这是因为这些生命周期函数钩子都继承于 React.Component，可以使用 useEffect 替代，如果在 useEffect 回调函数中 return 一个函数，则会在组件卸载的时候执行，正如 componentWillUnmount

## this 关键字

类组件需要使用 this 关键字访问组件的 props、state，函数组件中无 this

## 性能差异

类组件在实例化时会创建一个组件实例，因此在组件更新时可能会有一些额外的性能开销

函数组件更加轻量，不需要创建组件实例因此某些情况下性能更高，而且更加简洁、灵活
