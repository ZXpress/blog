# CSS 变量 variable [](#css-变量variable)

css 变量减少样式重复定义，比如同一个颜色值要在多个地方重复使用，以前通过 less 和 sass 预处理做到，现在 css 变量也可以做到，方便维护，提高可读性

```css
:root {
  --bgcolor: blue;
  --color: red;
}
p {
  color: var(--color);
}
div {
  backgroung-color: var(--bgcolor);
  color: var(--color);
}
```

方便在 js 中使用

```js
// 设置变量
document.getElementById('box').style.setPropertyValue('--color', 'pink')
// 读取变量
doucment.getElementById('box').style.getPropertyValue('--color').trim() //pink
// 删除变量
document.getElementById('box').style.removeProperty('--color')
```
