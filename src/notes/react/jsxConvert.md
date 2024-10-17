# jsx 转换为真实 DOM 的过程 [](#jsx转换为真实dom的过程)

## 实例 [](#实例)

jsx 通过 babel 最终转换成 React.createElement 这种形式：

```js
;<div>
  <img src="avatar.png" className="profile" />
  <Hello />
</div>

// 会被babel转换成如下

React.createElement(
  'div',
  null,
  React.createElement('img', {
    src: 'avatar.png',
    className: 'profile'
  }),
  React.createElement(Hello, null)
)
```

在转换过程中，babel 在编译时会判断 jsx 中组件的首字母：

- 当首字母为小写时，其被认定为原生 DOM 标签，createELement 的第一个变量被编译为字符串

- 当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象

## 过程 [](#过程)

在 react 中，节点大致可以分为四个类别：

- 原生标签节点，type 是字符串，如 div、span
- 文本节点，type 就没有，这里是 TEXT
- 函数组件，type 是函数名
- 类组件，type 是类名
