# 让 Chrome 支持小于 12px 的文字方式 [](#让chrome支持小于12px的文字方式)

Chrome 中文版浏览器会默认设定页面的最小字号是 12px，英文版没有限制，原由是 Chrome 团队认为汉字小于 12px 就会增加识别难度

- 中文版浏览器

与网页语言无关，取决于用户在 Chrome 的设置里（chrome://settings/languages）把哪种语言设置为默认显示语言

- 系统级最小字号

浏览器默认设定页面的最小字号，用户可以前往 chrome://settings/fonts 根据需求更改

而我们在实际项目中，不能奢求用户更改浏览器设置

## 解决方法 [](#解决方法)

常见的解决方法有：

- zoom
- -webkit-transform:scale()
- -webkit-text-size-adjust:none

### zoom

示例如下：

```js
<style type="text/css">
    .span1{
        font-size: 12px;
        display: inline-block;
        zoom: 0.8;
    }
    .span2{
        display: inline-block;
        font-size: 12px;
    }
</style>
<body>
    <span class="span1">测试10px</span>
    <span class="span2">测试12px</span>
</body>
```

### -webkit-transform:scale()
