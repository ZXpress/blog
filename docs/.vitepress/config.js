// .vitepress/config.js
export default {
  lang: 'en-US',
  title: 'blog',
  description: 'Vite & Vue powered static site generator.',
  srcDir: '../src', // 相对于项目根目录的 markdown 文件所在的文件夹
  outDir: '../dist', // 输出目录
  base: '/',
  cleanUrls: true,

  // 主题相关配置
  themeConfig: {
    logo: '/logo.png',
    siteTitle: "Zcy's Blog",
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML', ariaLabel: 'HTML', items: [{ text: 'HTML', link: '/notes/html/html' }] },
      {
        text: 'CSS',
        ariaLabel: 'CSS',
        items: [
          { text: '隐藏元素方式', link: '/notes/css/display' },
          { text: 'BFC块级格式化上下文', link: '/notes/css/bfc' },
          { text: '元素水平垂直居中', link: '/notes/css/center' },
          { text: 'grid布局', link: '/notes/css/grid' },
          { text: 'css动画', link: '/notes/css/animation' },
          { text: '重绘和回流', link: '/notes/css/render' },
          { text: '响应式设计', link: '/notes/css/responsive' },
          { text: 'CSS三角形', link: '/notes/css/triangle' },
          { text: 'less对比sass', link: '/notes/css/lessOrSass' },
          { text: 'slotted伪类选择器', link: '/notes/css/slotted' }
        ]
      },
      {
        text: 'JS',
        ariaLabel: 'JS',
        items: [
          { text: 'jsAsync异步', link: '/notes/js/asyncReason' },
          { text: 'dataType数据类型', link: '/notes/js/dataType' },
          { text: 'arrayMethod数组方法', link: '/notes/js/arrayMethod' },
          { text: 'strMethod字符串方法', link: '/notes/js/strMethod' },
          { text: 'typeConversion类型转换', link: '/notes/js/typeConversion' },
          { text: 'copy深浅拷贝', link: '/notes/js/copy' },
          { text: 'closure闭包', link: '/notes/js/closure' },
          { text: 'scope作用域', link: '/notes/js/scope' },
          { text: 'eventLoop事件循环', link: '/notes/js/eventLoop' },
          { text: 'includeBlock包含块', link: '/notes/js/includeBlock' },
          { text: 'defineProperty属性描述符', link: '/notes/js/defineProperty' },
          { text: 'endlessLoop线程死循环代码', link: '/notes/js/endlessLoop' },
          { text: 'prototype原型', link: '/notes/js/prototype' },
          { text: 'thisKeyword-this关键字', link: '/notes/js/thisKeyword' },
          { text: 'eventModel事件模型', link: '/notes/js/eventModel' },
          { text: 'new关键字', link: '/notes/js/new' },
          { text: 'apply、call、bind', link: '/notes/js/apply' },
          { text: 'dom操作', link: '/notes/js/domOperation' },
          { text: 'bom操作', link: '/notes/js/bomOperation' },
          { text: 'js垃圾回收机制', link: '/notes/js/rubbishRecovery' },
          { text: '内存泄漏', link: '/notes/js/memoryLeakage' },
          { text: '0.1+0.2不等于0.3解决方法', link: '/notes/js/unequal' },
          { text: '节流和防抖', link: '/notes/js/throttleShake' },
          { text: 'offset和client的区别', link: '/notes/js/offsetClient' },
          { text: 'IntersectionObserver', link: '/notes/js/IntersectionObserver' },
          { text: '封装可复用组件条件', link: '/notes/js/reuseComponents' },
          { text: 'ajax原理', link: '/notes/js/ajax' },
          { text: '跨域的解决方法', link: '/notes/js/crossDomain' },
          { text: 'get和post请求区别', link: '/notes/js/request' },
          { text: 'JS三部分组成', link: '/notes/js/jsConstitute' },
          { text: '定时器最小执行时间', link: '/notes/js/executionTime' },
          { text: 'promise异步', link: '/notes/js/promise' },
          { text: 'symbol数据类型', link: '/notes/js/symbol' },
          { text: '数组扁平化', link: '/notes/js/flat' }
        ]
      },
      {
        text: 'TS',
        ariaLabel: 'TS',
        items: [{ text: 'ts的理解和js的区别', link: '/notes/ts/difference' }]
      },
      {
        text: 'Vue',
        ariaLabel: 'VUE',
        items: [
          { text: '自定义指令', link: '/notes/vue/directives' },
          { text: 'toRef', link: '/notes/vue/toRef' },
          { text: 'expose', link: '/notes/vue/expose' },
          { text: 'vFor', link: '/notes/vue/vFor' },
          { text: 'vue2和vue3挂载全局方法', link: '/notes/vue/prototype' },
          { text: 'watch 和 watchEffect', link: '/notes/vue/watch/watch' },
          { text: 'vPre', link: '/notes/vue/vPre' },
          { text: 'vMemo', link: '/notes/vue/vMemo' },
          { text: 'errorHandler错误监控', link: '/notes/vue/errorHandler' },
          { text: 'defineAsyncComponent组件懒加载', link: '/notes/vue/defineAsyncComponent' },
          { text: 'useSlots', link: '/notes/vue/useSlots' },
          { text: '透传attributes', link: '/notes/vue/attributes' },
          { text: 'router实现原理', link: '/notes/vue/router' },
          { text: 'pushState', link: '/notes/vue/pushState' },
          { text: 'defineExpose', link: '/notes/vue/defineExpose' },
          { text: 'SPA单页面应用优缺点', link: '/notes/vue/singlePage' },
          { text: 'v-show和v-if', link: '/notes/vue/vShowVIf' },
          { text: 'v-if和v-for为什么不建议放在一起', link: '/notes/vue/vIfVFor' },
          { text: 'Vue生命周期', link: '/notes/vue/lifeCycle' },
          { text: 'Vue2中给对象添加新属性页面不刷新原因', link: '/notes/vue/objProperty' },
          { text: 'ES6 proxy', link: '/notes/vue/proxy' },
          { text: 'Vue组件和插件', link: '/notes/vue/componentPlugin' },
          { text: '组件间通信方式', link: '/notes/vue/communication' },
          { text: 'Vue数据双向绑定原理', link: '/notes/vue/binding' },
          { text: 'defineModel', link: '/notes/vue/defineModel' },
          { text: '混入mixin', link: '/notes/vue/mixin' },
          { text: 'keep-alive', link: '/notes/vue/keepAlive' },
          { text: 'Vue常用修饰符', link: '/notes/vue/modifier' },
          { text: '虚拟DOM', link: '/notes/vue/virtualDOM' },
          { text: 'el、template、render、mount的用法', link: '/notes/vue/mount' },
          { text: 'axios取消请求', link: '/notes/vue/cancelToken' },
          { text: 'Vue项目目录结构划分', link: '/notes/vue/directoryStructure' },
          { text: '权限管理', link: '/notes/vue/permission' },
          { text: 'Vue跨域代理', link: '/notes/vue/crossDomain' },
          { text: 'Vue服务器端渲染', link: '/notes/vue/ssr' }
        ]
      },
      {
        text: 'React',
        ariaLabel: 'React',
        items: [
          { text: 'memo', link: '/notes/react/memo' },
          { text: 'forwardRef和useImperativeHandle', link: '/notes/react/forwardRefAndUseImperativeHandle.md' },
          { text: '类组件生命周期', link: '/notes/react/classLifeCycle.md' },
          { text: 'zustand', link: '/notes/react/zustand.md' },
          { text: 'createElement和CloneElement', link: '/notes/react/createElementAndCloneElement.md' },
          { text: 'suspense', link: '/notes/react/suspense.md' },
          { text: 'hooks', link: '/notes/react/hooks/useCallBack.md' },
          { text: 'React搭配ts', link: '/notes/react/ts/useState.md' },
          { text: 'React和Vue的区别', link: '/notes/react/difference.md' },
          { text: 'React工作原理', link: '/notes/react/principle.md' },
          { text: 'setState和useState', link: '/notes/react/state.md' },
          { text: 'useState拿到更新后最新值', link: '/notes/react/latestValue.md' },
          { text: 'React性能优化', link: '/notes/react/performance.md' },
          { text: '什么是jsx', link: '/notes/react/jsx.md' },
          { text: '虚拟DOM中key的作用', link: '/notes/react/key.md' },
          { text: '类组件和函数组件的区别', link: '/notes/react/componentDif.md' },
          { text: 'HOC高阶组件', link: '/notes/react/HOC.md' },
          { text: 'setState相关', link: '/notes/react/setState.md' },
          { text: 'React合成事件和原生事件的区别', link: '/notes/react/eventMechanism.md' },
          { text: 'React中事件绑定方式', link: '/notes/react/eventBind.md' },
          { text: 'React创建ref的的形式', link: '/notes/react/ref.md' },
          { text: 'React中引入css的方式', link: '/notes/react/cssIntroduce.md' },
          { text: 'Redux', link: '/notes/react/redux.md' },
          { text: 'react中render方法的原理', link: '/notes/react/render.md' },
          { text: 'jsx转换为真实DOM的过程', link: '/notes/react/jsxConvert.md' },
          { text: 'React项目中捕获错误', link: '/notes/react/captureError.md' },
          { text: 'React服务器端渲染', link: '/notes/react/ssr' },
          { text: '使用React过程中遇到的问题', link: '/notes/react/questionSum' }
        ]
      },
      {
        text: '框架',
        items: [
          {
            text: 'JS框架',
            items: [
              { text: 'Vue', link: 'https://cn.vuejs.org/' },
              { text: 'React', link: 'https://react.docschina.org/' }
            ]
          },
          {
            text: 'UI框架',
            items: [
              { text: 'Element UI', link: 'https://element.eleme.cn/#/zh-CN' },
              { text: 'Ant Design', link: 'https://ant.design/index-cn' }
            ]
          }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/ZXpress/blog' },
      { text: '关于我', link: '/aboutme' }
    ],
    sidebar: {
      '/notes/html/': [
        {
          text: 'HTML',
          items: [{ text: 'HTML', link: '/notes/html/html' }]
        }
      ],
      '/notes/css/': [
        {
          text: 'CSS',
          items: [
            { text: '隐藏元素方式', link: '/notes/css/display' },
            { text: 'BFC块级格式化上下文', link: '/notes/css/bfc' },
            { text: '元素水平垂直居中', link: '/notes/css/center' },
            { text: 'grid布局', link: '/notes/css/grid' },
            { text: 'css动画', link: '/notes/css/animation' },
            { text: '重绘和回流', link: '/notes/css/render' },
            { text: '响应式设计', link: '/notes/css/responsive' },
            { text: 'CSS三角形', link: '/notes/css/triangle' },
            { text: 'less对比sass', link: '/notes/css/lessOrSass' },
            { text: 'slotted伪类选择器', link: '/notes/css/slotted' }
          ]
        }
      ],
      '/notes/js/': [
        {
          text: 'JS',
          items: [
            { text: 'jsAsync异步', link: '/notes/js/asyncReason' },
            { text: 'dataType数据类型', link: '/notes/js/dataType' },
            { text: 'arrayMethod数组方法', link: '/notes/js/arrayMethod' },
            { text: 'strMethod字符串方法', link: '/notes/js/strMethod' },
            { text: 'typeConversion类型转换', link: '/notes/js/typeConversion' },
            { text: 'copy深浅拷贝', link: '/notes/js/copy' },
            { text: 'closure闭包', link: '/notes/js/closure' },
            { text: 'scope作用域', link: '/notes/js/scope' },
            { text: 'eventLoop事件循环', link: '/notes/js/eventLoop' },
            { text: 'includeBlock包含块', link: '/notes/js/includeBlock' },
            { text: 'defineProperty属性描述符', link: '/notes/js/defineProperty' },
            { text: 'endlessLoop线程死循环代码', link: '/notes/js/endlessLoop' },
            { text: 'prototype原型', link: '/notes/js/prototype' },
            { text: 'thisKeyword-this关键字', link: '/notes/js/thisKeyword' },
            { text: 'eventModel事件模型', link: '/notes/js/eventModel' },
            { text: 'new关键字', link: '/notes/js/new' },
            { text: 'apply、call、bind', link: '/notes/js/apply' },
            { text: 'dom操作', link: '/notes/js/domOperation' },
            { text: 'bom操作', link: '/notes/js/bomOperation' },
            { text: 'js垃圾回收机制', link: '/notes/js/rubbishRecovery' },
            { text: '内存泄漏', link: '/notes/js/memoryLeakage' },
            { text: '0.1+0.2不等于0.3解决方法', link: '/notes/js/unequal' },
            { text: '节流和防抖', link: '/notes/js/throttleShake' },
            { text: 'offset和client的区别', link: '/notes/js/offsetClient' },
            { text: 'IntersectionObserver', link: '/notes/js/IntersectionObserver' },
            { text: '封装可复用组件条件', link: '/notes/js/reuseComponents' },
            { text: 'ajax原理', link: '/notes/js/ajax' },
            { text: '跨域的解决方法', link: '/notes/js/crossDomain' },
            { text: 'get和post请求区别', link: '/notes/js/request' },
            { text: 'JS三部分组成', link: '/notes/js/jsConstitute' },
            { text: '定时器最小执行时间', link: '/notes/js/executionTime' },
            { text: 'promise异步', link: '/notes/js/promise' },
            { text: 'symbol数据类型', link: '/notes/js/symbol' },
            { text: '数组扁平化', link: '/notes/js/flat' }
          ]
        }
      ],
      '/notes/ts/': [
        {
          text: 'TS',
          items: [{ text: 'ts的理解和js的区别', link: '/notes/ts/difference' }]
        }
      ],
      '/notes/vue/': [
        {
          text: 'Vue',
          items: [
            { text: '自定义指令', link: '/notes/vue/directives' },
            { text: 'toRef', link: '/notes/vue/toRef' },
            { text: 'expose', link: '/notes/vue/expose' },
            { text: 'vFor', link: '/notes/vue/vFor' },
            { text: 'vue2和vue3挂载全局方法', link: '/notes/vue/prototype' },
            {
              text: 'watch 和 watchEffect',
              // link: '/notes/vue/watch',
              items: [
                { text: 'watch', link: '/notes/vue/watch/watch' },
                { text: 'watchEffect', link: '/notes/vue/watch/watchEffect' },
                { text: 'watch和watchEffect区别', link: '/notes/vue/watch/difference' }
              ]
            },
            { text: 'vPre', link: '/notes/vue/vPre' },
            { text: 'vMemo', link: '/notes/vue/vMemo' },
            { text: 'errorHandler错误监控', link: '/notes/vue/errorHandler' },
            { text: 'defineAsyncComponent组件懒加载', link: '/notes/vue/defineAsyncComponent' },
            { text: 'useSlots', link: '/notes/vue/useSlots' },
            { text: '透传attributes', link: '/notes/vue/attributes' },
            { text: 'router实现原理', link: '/notes/vue/router' },
            { text: 'pushState', link: '/notes/vue/pushState' },
            { text: 'defineExpose', link: '/notes/vue/defineExpose' },
            { text: 'SPA单页面应用优缺点', link: '/notes/vue/singlePage' },
            { text: 'v-show和v-if', link: '/notes/vue/vShowVIf' },
            { text: 'v-if和v-for为什么不建议放在一起', link: '/notes/vue/vIfVFor' },
            { text: 'Vue生命周期', link: '/notes/vue/lifeCycle' },
            { text: 'Vue2中给对象添加新属性页面不刷新原因', link: '/notes/vue/objProperty' },
            { text: 'ES6 proxy', link: '/notes/vue/proxy' },
            { text: 'Vue组件和插件', link: '/notes/vue/componentPlugin' },
            { text: '组件间通信方式', link: '/notes/vue/communication' },
            { text: 'Vue数据双向绑定原理', link: '/notes/vue/binding' },
            { text: 'defineModel', link: '/notes/vue/defineModel' },
            { text: '混入mixin', link: '/notes/vue/mixin' },
            { text: 'keep-alive', link: '/notes/vue/keepAlive' },
            { text: 'Vue常用修饰符', link: '/notes/vue/modifier' },
            { text: '虚拟DOM', link: '/notes/vue/virtualDOM' },
            { text: 'el、template、render、mount的用法', link: '/notes/vue/mount' },
            { text: 'axios取消请求', link: '/notes/vue/cancelToken' },
            { text: 'Vue项目目录结构划分', link: '/notes/vue/directoryStructure' },
            { text: '权限管理', link: '/notes/vue/permission' },
            { text: 'Vue跨域代理', link: '/notes/vue/crossDomain' },
            { text: 'Vue服务器端渲染', link: '/notes/vue/ssr' }
          ]
        }
      ],
      '/notes/react/': [
        {
          text: 'React',
          ariaLabel: 'React',
          items: [
            { text: 'memo', link: '/notes/react/memo' },
            { text: 'forwardRef和useImperativeHandle', link: '/notes/react/forwardRefAndUseImperativeHandle.md' },
            { text: '类组件生命周期', link: '/notes/react/classLifeCycle.md' },
            { text: 'zustand', link: '/notes/react/zustand.md' },
            { text: 'createElement和CloneElement', link: '/notes/react/createElementAndCloneElement.md' },
            { text: 'suspense', link: '/notes/react/suspense.md' },
            {
              text: 'hooks',
              items: [
                { text: 'hooks的优缺点', link: '/notes/react/hooks/advantage.md' },
                { text: 'useCallBack', link: '/notes/react/hooks/useCallBack.md' },
                { text: 'useMemo', link: '/notes/react/hooks/useMemo.md' },
                { text: 'useReducer', link: '/notes/react/hooks/useReducer.md' },
                { text: 'hooks实现机制', link: '/notes/react/hooks/hooksMechanism.md' },
                { text: 'useEffect和uselayouteffect区别', link: '/notes/react/hooks/useLayoutEffect.md' }
              ]
            },
            {
              text: 'React搭配ts',
              items: [
                { text: 'useState', link: '/notes/react/ts/useState.md' },
                { text: 'useRef', link: '/notes/react/ts/useRef.md' },
                { text: '组件和ts', link: '/notes/react/ts/components-ts.md' }
              ]
            },
            { text: 'React和Vue的区别', link: '/notes/react/difference.md' },
            { text: 'React工作原理', link: '/notes/react/principle.md' },
            { text: 'setState和useState', link: '/notes/react/state.md' },
            { text: 'useState拿到更新后最新值', link: '/notes/react/latestValue.md' },
            { text: 'React性能优化', link: '/notes/react/performance.md' },
            { text: '什么是jsx', link: '/notes/react/jsx.md' },
            { text: '虚拟DOM中key的作用', link: '/notes/react/key.md' },
            { text: '类组件和函数组件的区别', link: '/notes/react/componentDif.md' },
            { text: 'HOC高阶组件', link: '/notes/react/HOC.md' },
            { text: 'setState相关', link: '/notes/react/setState.md' },
            { text: 'React合成事件和原生事件的区别', link: '/notes/react/eventMechanism.md' },
            { text: 'React中事件绑定方式', link: '/notes/react/eventBind.md' },
            { text: 'React创建ref的的形式', link: '/notes/react/ref.md' },
            { text: 'React中引入css的方式', link: '/notes/react/cssIntroduce.md' },
            { text: 'Redux', link: '/notes/react/redux.md' },
            { text: 'react中render方法的原理', link: '/notes/react/render.md' },
            { text: 'jsx转换为真实DOM的过程', link: '/notes/react/jsxConvert.md' },
            { text: 'React项目中捕获错误', link: '/notes/react/captureError.md' },
            { text: 'React服务器端渲染', link: '/notes/react/ssr' },
            { text: '使用React过程中遇到的问题', link: '/notes/react/questionSum' }
          ]
        }
      ]
    }
  }
}
