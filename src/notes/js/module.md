# ES6 中的 module 模块 [](#es6中的module模块)

## 介绍 [](#介绍)

为什么要模块化

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

模块化机制：

- CommonJs (典型代表：node.js 早期)
- AMD (典型代表：require.js)
- CMD (典型代表：sea.js)

### AMD

Asynchronous ModuleDefinition（AMD），异步模块定义，采用异步方式加载模块。所有依赖模块的语句，都定义在一个回调函数中，等到模块加载完成之后，这个回调函数才会运行

代表库为 require.js

```js
/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: 'js/lib',
  paths: {
    jquery: 'jquery.min', //实际路径为js/lib/jquery.min.js
    underscore: 'underscore.min'
  }
})
// 执行基本操作
require(['jquery', 'underscore'], function ($, _) {
  // some code here
})
```

### CommonJs

CommonJS 是一套 Javascript 模块规范，用于服务端

```js
// a.js
module.exports = { foo, bar }

// b.js
const { foo, bar } = require('./a.js')
```

其有如下特点：

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块是同步加载的，即只有加载完成，才能执行后面的操作
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
- require 返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值

既然存在了 AMD 以及 CommonJs 机制，ES6 的 Module 又有什么不一样？

ES6 在语言标准的层面上，实现了 Module，即模块功能，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案

CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性

```js
// CommonJS模块
let { stat, exists, readfile } = require('fs')

// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile
```

ES6 设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

```js
// ES6模块
import { stat, exists, readFile } from 'fs'
```

上述代码，只加载 3 个方法，其他方法不加载，即 ES6 可以在编译时就完成模块加载

由于编译加载，使得静态分析成为可能。包括现在流行的 typeScript 也是依靠静态分析实现功能

## 使用 [](#使用)

### 动态加载

允许您仅在需要时动态加载模块，而不必预先加载所有模块，这存在明显的性能优势

这个新功能允许您将 import()作为函数调用，将其作为参数传递给模块的路径。 它返回一个 promise，它用一个模块对象来实现，让你可以访问该对象的导出

```js
import('/modules/myModule.mjs').then((module) => {
  // Do something with the module.
})
```

### 复合写法

如果在一个模块之中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起

```js
export { foo, bar } from 'my_module'

// 可以简单理解为
import { foo, bar } from 'my_module'
export { foo, bar }
```

同理能够搭配 `as`、`*`搭配使用
