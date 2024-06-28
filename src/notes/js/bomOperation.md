# BOM 操作 [](#bom-operation)

> BOM 的顶级对象是 window

## location [](#location)

> 除了 hash（url 中#后面的字符）外，修改 location 的一个属性，就会导致页面重新加载新的 url，location.reload（），此方法重新刷新当前页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载，如果要强制从服务器中重新加载，传递一个参数 true 即可

## history [](#history)

- history.go()

接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转

```js
history.go('maixaofei.com')
```

> 当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面

```js
history.go(3) //向前跳转三个记录
history.go(-1) //向后跳转一个记录
```

- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数
