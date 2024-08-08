# Vue 常用修饰符 [](#vue常用修饰符)

事件修饰符

- stop：阻止冒泡，相当于 event.stopPropagation
- prevent：阻止事件默认行为，相当于 event.preventDefault
- self：只有当 event.target 是当前元素自身时触发处理函数
- capture：使事件触发从包含这个元素的顶层开始往下触发
- native：监听原生事件，只有 click、mouseenter 这种用
