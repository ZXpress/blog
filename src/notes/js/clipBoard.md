# 复制粘贴和剪切板 clipBoard API [](#clipboard-api)

通过 clipBoard API 可以获取剪切板中内容，但需要获取到 `clipBoard-read` 的权限

```js
// 是否能够有读取剪贴板的权限
// result.state == "granted" || result.state == "prompt"
const result = await navigator.permissions.query({ name: 'clipboard-read' })

// 获取剪贴板内容
async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText()
    console.log('Pasted content: ', text)
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err)
  }
}

// 将文本复制到剪贴板
async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText('hello world222')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
```

> 注：该方法在 devtools 中不生效

## 禁止复制 [](#禁止复制)

有 CSS 和 JS 两种方法禁止复制

使用 CSS 如下：

```css
 {
  user-select: none;
}
```

使用 JS 如下，监听 selectstart 事件，禁止选中：

当用户选中一片区域时，将触发 selectstart 事件，Selection API 将会选中一片区域。禁止选中区域即可实现页面文本不可复制。

```js
document.body.onselectstart = (e) => {
  e.preventDefault()
}

document.body.oncopy = (e) => {
  e.preventDefault()
}
```

## 监听复制 [](#监听复制)

在 HTML 元素上

```html
<input oncopy="cb" />
```

在 JS 中获取具体元素

```js
document.querySelector('p').oncopy = cb
document.oncopy = cb

document.querySelector('p').addEventListener('copy', cb)
document.addEventListener('copy', cb)
```
