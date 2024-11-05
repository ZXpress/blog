# 二进制文件转换方法 [](#二进制文件转换方法)

## Blob 对象 [](#blob)

Blob 对象表示一个不可变、原始数据的类文件对象，Blob 表示的不一定是 JavaScript 原生格式的数据，File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件

Blob 对象是包含有只读原始数据的类文件对象。简单来说，Blob 对象就是一个不可修改的二进制文件

### 创建 blob

```js
const blob = new Blob(array, options)
```

需要两个参数：

array：是一个由 ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体

options：可选的 BlobPropertyBag 字典，它可能会指定如下两个属性：

type：默认值为 ""，表示将会被放入到 blob 中的数组内容的 MIME 类型。
endings：默认值为"transparent"，用于指定包含行结束符\n 的字符串如何被写入，不常用

常用的 MIME 类型如下：

|    MIME 类型     |      说明       |
| :--------------: | :-------------: |
|    text/plain    |   纯文本文档    |
|    text/html     |    HTML 文档    |
| text/javascript  | javaScript 文件 |
|     text/css     |    CSS 文件     |
| application/json |    JSON 文件    |
| application/pdf  |    PDF 文件     |
| application/xml  |    XML 文件     |
|    image/jpeg    |    JPEG 图像    |
|    image/png     |    PNG 图像     |
|    image/gif     |    GIF 图像     |
|  image/svg+xml   |    SVG 图像     |
|      audio       |    MP3 文件     |
|      video       |    MP4 文件     |

```js
// 创建一个blob
const blob = new Blob(['Hello World'], { type: 'text/plain' })
console.log(blob.size) // 11
console.log(blob.type) // "text/plain"

// 使用示例：转化为 ULR，并在 iframe 中加载
const iframe = document.getElementsById('iframe')
iframe.src = URL.createObjectURL(blob)
```

### blob 分片

```js
const blob = instanceOfBlob.slice([start [, end [, contentType]]])
```

需要两个参数：

- start：可选，切片起点，默认值为 0
- end：可选，切片结束位置，默认值为 blob.size
- contentType：可选，设置新 blob 的 MIME 类型。如果省略 type，则默认为 blob 的原始值

```js
js 代码解读复制代码// 切片示例：页面上会显示：Hello Wo
const iframe = document.getElementsById("iframe")

const blob = new Blob(["Hello World"], { type: "text/plain" })
const subBlob = blob.slice(0, 8)
iframe.src = URL.createObjectURL(subBlob)
```

## File [](#file)

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap()(en-US), 及 XMLHttpRequest.send() 都能处理 Blob 和 File

以下为 FileReader 的对象方法：

|              方法               |                                                        说明                                                        |
| :-----------------------------: | :----------------------------------------------------------------------------------------------------------------: |
|       FileReader.abort()        |                                   中止读取操作，在返回时，readyState 属性为 DONE                                   |
| FileReader.readAsArrayBuffer()  |           开始读取指定的 Blob 中的内容。完成后，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象           |
| FileReader.readAsBinaryString() |                开始读取指定的 Blob 中的内容。完成后，result 属性中将包含所读取文件的原始二进制数据                 |
|   FileReader.readAsDataURL()    | 开始读取指定的 Blob 中的内容。完成后，result 属性中将包含一个 data: URL 格式的 Base64 字符串以表示所读取文件的内容 |
|     FileReader.readAsText()     |            开始读取指定的 Blob 中的内容，一旦完成，result 属性中将包含一个字符串以表示所读取的文件内容             |

## Base64 [](#base64)

Base64 是一组相似的二进制到文本（binary-to-text）的编码规则。一个常见应用是对二进制数据进行编码，以便将其纳入 dataURL 中

在 JavaScript 中，有两个函数被分别用来处理解码和编码 Base64 字符串：

- atob()：解码通过 Base-64 编码的字符串数据（“atob”应读作“ASCII to binary”）
- btoa()：从二进制数据“字符串”创建一个 Base-64 编码的 ASCII 字符串（“btoa”应读作“binary to ASCII”）

```html
<!-- 读取文件，用 Bse64 展示图片 -->
<!DOCTYPE html>
<html lang="en">
  <body>
    <input type="file" id="input" />
    <img id="img" />

    <script>
      const input = document.getElementById('input')
      const img = document.getElementById('img')

      input.onchange = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          img.src = e.target.result
          console.log(e.target.result)
        }
      }
    </script>
  </body>
</html>
```

<img src="/js/binary.webp" style="zoom:50%" />

## object URL [](#object-url)

Object URL（MDN 定义名称）又称 Blob URL（W3C 定义名称），是 HTML5 中的新标准。它是一个用来表示 File Object 或 Blob Object 的 URL

Blob URL/Object URL 是一种伪协议，允许将 Blob 和 File 对象用作图像、二进制数据下载链接等的 URL 源

```html
<!-- 通过 Object URL 展示和下载图片 -->
<!DOCTYPE html>
<html lang="en">
  <body>
    <input type="file" id="input" />
    <img id="img" />

    <script>
      const input = document.getElementById('input')
      const img = document.getElementById('img')

      input.onchange = (e) => {
        const url = URL.createObjectURL(e.target.files[0])
        img.src = url

        // 实现下载
        const a = document.createElement('a')
        a.href = url
        a.download = 'img'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    </script>
  </body>
</html>
```

<img src="/js/binary1.webp" style="zoom:50%" />

## arrayBuffer [](#arraybuffer)
