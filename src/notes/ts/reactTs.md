# ts 在 react 项目中的应用 [](#ts在react项目中的应用)

## 简介 [](#简介)

单独的使用 TypeScript 并不会导致学习成本很高，但是绝大部分前端开发者的项目都是依赖于框架的

例如与 Vue、React 这些框架结合使用的时候，会有一定的门槛

使用 TypeScript 编写 React 代码，除了需要 TypeScript 这个库之外，还需要安装 @types/react、@types/react-dom

```ts
npm i @types/react -s

npm i @types/react-dom -s
```

至于上述使用 @types 的库的原因在于，目前非常多的 JavaScript 库并没有提供自己关于 TypeScript 的声明文件

所以，ts 并不知道这些库的类型以及对应导出的内容，这里 @types 实际就是社区中的 DefinitelyTyped 库，定义了目前市面上绝大多数的 JavaScript 库的声明

所以下载相关的 JavaScript 对应的 @types 声明时，就能够使用使用该库对应的类型定义

## 使用方式 [](#使用方式)

在编写 react 项目的时候，最常用的组件：

- 无状态组件
- 有状态组件
- 受控组件
