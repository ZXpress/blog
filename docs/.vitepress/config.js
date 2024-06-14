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
      { text: 'JS', ariaLabel: 'JS', items: [{ text: 'JS', link: '/notes/js/js' }] },
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
          { text: 'errorHandler', link: '/notes/vue/errorHandler' },
          { text: 'defineAsyncComponent', link: '/notes/vue/defineAsyncComponent' }
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
          { text: 'hooks', link: '/notes/react/hooks/useCallBack.md' },
          { text: 'react搭配ts', link: '/notes/react/ts/useState.md' }
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
          items: [{ text: 'JS', link: '/notes/js/js' }]
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
            { text: 'errorHandler', link: '/notes/vue/errorHandler' },
            { text: 'defineAsyncComponent', link: '/notes/vue/defineAsyncComponent' }
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
            {
              text: 'hooks',
              items: [
                { text: 'useCallBack', link: '/notes/react/hooks/useCallBack.md' },
                { text: 'useMemo', link: '/notes/react/hooks/useMemo.md' },
                { text: 'useReducer', link: '/notes/react/hooks/useReducer.md' }
              ]
            },
            {
              text: 'react搭配ts',
              items: [
                { text: 'useState', link: '/notes/react/ts/useState.md' },
                { text: 'useRef', link: '/notes/react/ts/useRef.md' },
                { text: '组件和ts', link: '/notes/react/ts/components-ts.md' }
              ]
            }
          ]
        }
      ]
    }
  }
}
