// .vitepress/config.js
export default {
  lang: 'en-US',
  title: 'blog',
  head: [['link', { rel: 'icon', href: '/public/study.png' }]],
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
          { text: '自定义指令', link: '/notes/skills/directives' },
          { text: 'toRef', link: '/notes/skills/toRef' },
          { text: 'expose', link: '/notes/skills/expose' },
          { text: 'vFor', link: '/notes/skills/vFor' }
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
      '/notes/skills/': [
        {
          text: 'Vue',
          items: [
            { text: '自定义指令', link: '/notes/skills/directives' },
            { text: 'toRef', link: '/notes/skills/toRef' },
            { text: 'expose', link: '/notes/skills/expose' },
            { text: 'vFor', link: '/notes/skills/vFor' }
          ]
        }
      ]
    }
  }
}
