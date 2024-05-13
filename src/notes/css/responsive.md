# 响应式设计 [​](#responsive)

## 描述 [​](#describe)

实现方式：

- 媒体查询
- 百分比
- vw/vh
- rem

## rem 使用 [​](#rem)

rem 和媒体查询结合使用

```css
@media screen and (max-width: 414px) {
  html {
    font-size: 18px;
  }
}

@media screen and (max-width: 375px) {
  html {
    font-size: 16px;
  }
}

@media screen and (max-width: 320px) {
  html {
    font-size: 12px;
  }
}
```

为了更准确监听设备可视窗口变化，我们可以在 css 之前插入 script 标签，无论设备可视窗口如何变化，始终设置 rem 为 width 的 1/10，实现了百分比布局，内容如下：

```javascript
//动态为根元素设置字体大小
function init() {
  // 获取屏幕宽度
  var width = document.documentElement.clientWidth
  // 设置根元素字体大小。此时为宽的10等分
  document.documentElement.style.fontSize = width / 10 + 'px'
}

//首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)
```
