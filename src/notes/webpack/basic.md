# webpack 基础介绍 [](#webpack基础介绍)

## 解决的问题 [](#解决的问题)

现代前端开发已经变得十分的复杂，所以我们开发过程中会遇到如下的问题：

- 需要通过模块化的方式来开发
- 使用一些高级的特性来加快我们的开发效率或者安全性，比如通过 ES6+- TypeScript 开发脚本逻辑，通过 sass、less 等方式来编写 css 样式代码
- 监听文件的变化来并且反映到浏览器上，提高开发的效率
- JavaScript 代码需要模块化，HTML 和 CSS 这些资源文件也会面临需要被模- 化的问题
- 开发完成后我们还需要将代码进行压缩、合并以及其他相关的优化

而 webpack 恰巧可以解决以上问题

## 简介 [](#简介)

webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具

- 静态模块

这里的静态模块指的是开发阶段，可以被 webpack 直接引用的资源（可以直接被获取打包进 bundle.js 的资源）

当 webpack 处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限 js 文件），并生成一个或多个 bundle

<img src="/webpack/basic.png" />

webpack 的能力：

编译代码能力，提高效率，解决浏览器兼容问题

<img src="/webpack/basic1.png" style="zoom:50%" />

模块整合能力，提高性能，可维护性，解决浏览器频繁请求文件的问题

<img src="/webpack/basic2.png" style="zoom:50%" />

万物皆可模块能力，项目维护性增强，支持不同种类的前端模块类型，统一的模块化方案，所有资源文件的加载都可以通过代码控制

<img src="/webpack/basic3.png" style="zoom:50%" />