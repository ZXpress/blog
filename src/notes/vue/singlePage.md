# SPA 单页面应用的优缺点 [](#single-page)

优点：

- 加快页面响应速度，降低了对服务器的压力
- 更好的用户体验，运行更加流畅

缺点：

- 不利于 SEO 搜索引擎优化（因为爬虫只爬取 HTML 页面中的文本内容，不会执行 JS 代码）

> 解决方法：1.通过 SSR（服务端渲染）来解决，先在服务器端把内容渲染出来，然后返回给浏览器就是纯 HTML 内容了。2.页面静态化，生成静态的 HTML 页面

- 首次渲染速度较慢

## 首屏加载时间

通过监听 DOMContentLoaded 事件获取加载时间

```js
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('first contentful painting')
})
```

## 加载慢的原因

- 网络延迟问题
- 资源文件体积是否过大
- 资源是否重复发送请求加载
- 加载脚本的时候渲染内容堵塞了

## 解决方法

1. 在 vue-router 配置路由的时候采用动态加载路由的形式，把各自的路由文件分别打包，需要的时候才会加载

```js
routes:[
    path: 'Blogs',
    name: 'ShowBlogs',
    component: () => import('./components/ShowBlogs.vue')
]
```

2. 静态资源本地缓存：可以使用 localStorage
3. UI 框架按需加载
4. 组件重复打包

假设 A.js 文件是一个常用的库，现在有多个路由使用了 A.js 文件，这就造成了重复下载

解决方案：在 webpack 的 config 文件中，修改 CommonsChunkPlugin 的配置，minChunks 为 3 表示会把使用 3 次及以上的包抽离出来，放进公共依赖文件，避免了重复加载组件

```js
module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3
    })
  ]
}
```

## 总结

减少首屏渲染时间总的分为两大部分：资源加载优化、页面渲染优化

页面渲染优化：优化 HTML 代码（减少 DOM 数量）、优化 js 和 css 代码（减少重绘重排、减低 CSS 选择器复杂性）、优化动画效果
