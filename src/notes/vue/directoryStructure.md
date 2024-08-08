# Vue 项目目录结构划分 [](#directory-structure)

遵循的基本原则：

- 文件夹和文件夹内部文件的语义一致性
- 单一入口/出口
- 就近原则，紧耦合的文件放在一起，以相对路径引用
- 公共的文件以绝对路径从根目录引用

单页面目录结构

```js
project
│  .browserslistrc
│  .env.production
│  .eslintrc.js
│  .gitignore
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  vue.config.js
│  yarn-error.log
│  yarn.lock
│
├─public
│      favicon.ico
│      index.html
│
|-- src
    |-- components
        |-- input
            |-- index.js
            |-- index.module.scss
    |-- pages
        |-- seller
            |-- components
                |-- input
                    |-- index.js
                    |-- index.module.scss
            |-- reducer.js
            |-- saga.js
            |-- index.js
            |-- index.module.scss
        |-- buyer
            |-- index.js
        |-- index.js
```

多页面目录结构

```js
my-vue-test:.
│  .browserslistrc
│  .env.production
│  .eslintrc.js
│  .gitignore
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  vue.config.js
│  yarn-error.log
│  yarn.lock
│
├─public
│      favicon.ico
│      index.html
│
└─src
    ├─apis //接口文件根据页面或实例模块化
    │      index.js
    │      login.js
    │
    ├─components //全局公共组件
    │  └─header
    │          index.less
    │          index.vue
    │
    ├─config //配置（环境变量配置不同passid等）
    │      env.js
    │      index.js
    │
    ├─contant //常量
    │      index.js
    │
    ├─images //图片
    │      logo.png
    │
    ├─pages //多页面vue项目，不同的实例
    │  ├─index //主实例
    │  │  │  index.js
    │  │  │  index.vue
    │  │  │  main.js
    │  │  │  router.js
    │  │  │  store.js
    │  │  │
    │  │  ├─components //业务组件
    │  │  └─pages //此实例中的各个路由
    │  │      ├─amenu
    │  │      │      index.vue
    │  │      │
    │  │      └─bmenu
    │  │              index.vue
    │  │
    │  └─login //另一个实例
    │          index.js
    │          index.vue
    │          main.js
    │
    ├─scripts //包含各种常用配置，工具函数
    │  │  map.js
    │  │
    │  └─utils
    │          helper.js
    │
    ├─store //vuex仓库
    │  │  index.js
    │  │
    │  ├─index
    │  │      actions.js
    │  │      getters.js
    │  │      index.js
    │  │      mutation-types.js
    │  │      mutations.js
    │  │      state.js
    │  │
    │  └─user
    │          actions.js
    │          getters.js
    │          index.js
    │          mutation-types.js
    │          mutations.js
    │          state.js
    │
    └─styles //样式统一配置
        │  components.less
        │
        ├─animation
        │      index.less
        │      slide.less
        │
        ├─base
        │      index.less
        │      style.less
        │      var.less
        │      widget.less
        │
        └─common
                index.less
                reset.less
                style.less
                transition.less
```
