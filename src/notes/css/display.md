# 通过 css 隐藏元素的方式 [​](#display-mode)

## display:none [​](#display-none)

特点：元素不可见，不占据空间，无法响应点击事件

## visibility:hidden [​](#visibility-hidden)

特点：元素不可见，占据页面空间，无法响应点击事件

## opacity:0 [​](#opacity-0)

特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

## 设置 width、height 模型属性为 0 [​](#width-height-0)

特点：元素不可见，不占据页面空间，无法响应点击事件

## position:absolute [​](#position-absolute)

特点：元素不可见，不影响页面布局

```css
.hide {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
```

## clip-path [​](#clip-path)

特点：元素不可见，占据页面空间，无法响应点击事件

```css
.hide {
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);
}
```
