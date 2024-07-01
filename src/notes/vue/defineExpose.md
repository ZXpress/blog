# defineExpose [](#defineExpose)

> vue3 中子组件中明确要暴露出去的属性，通过 ref 获取组件实例后直接通过.value 获取上面的属性和方法，在 vue3.x 的 setup 语法糖中定义的变量默认不会暴露出去，这时使用 definExpose({ })来暴露组件内部属性给父组件使用，在父组件中直接修改子组件的属性，子组件也会相应更新

<img src="../../public/vue/defineExpose.png" style="zoom:50%" />
