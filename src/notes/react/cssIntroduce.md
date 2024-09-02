# React 中引入 css 的方式 [](#react中引入css的方式)

## 在组件内直接使用 [](#在组件内直接使用)

直接在组件中书写 css 样式，通过 style 属性直接引入

```js
import React, { Component } from "react";

const div1 = {
  width: "300px",
  margin: "30px auto",
  backgroundColor: "#44014C",  //驼峰法
  minHeight: "200px",
  boxSizing: "border-box"
};

class Test extends Component {
  constructor(props, context) {
    super(props);
  }

  render() {
    return (
     <div>
       <div style={div1}>123</div>
       <div style={{backgroundColor:"red"}}>
     </div>
    );
  }
}

export default Test;
```

优点：

- 内联样式, 样式之间不会有冲突
- 可以动态获取当前 state 中的状态

缺点：

- 写法上都需要使用驼峰标识

- 某些样式没有提示

- 大量的样式, 代码混乱

- 某些样式无法编写（比如伪类/伪元素）

## 组件中引入.css 文件 [](#组件中引入css文件)

这种方式存在不好的地方在于样式是全局生效，样式之间会互相影响

```js
import './App.css'
```

## Css module [](#css-module)

1. 把 index.scss 改成 index.module.scss

```css
.list {
  background-color: pink;
  color: red;
}
```

2. 导入样式的时候修改

<span style="color:red">- import './index.scss'</span>

<span style="color:green">+ import styles from './index.module.scss'</span>

3. 使用的时候需要修改

<span style="color:red">- `<div className="list">文章</div>`</span>

<span style="color:green">+ `<div className={styles.list}>文章</div>`</span>

## CSS in JS [](#css-in-js)

CSS in JS 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义

此功能并不是 React 的一部分，而是由第三方库提供：

- styled-components

- emotion

- glamorous

下面主要看看 style-components 的基本使用

本质是通过函数的调用，最终创建出一个组件：

- 这个组件会被自动添加上一个不重复的 class

- styled-components 会给该 class 添加相关的样式

基本使用如下：

创建一个 style.js 文件用于存放样式组件：

```js
export const SelfLink = styled.div`
  height: 50px;
  border: 1px solid red;
  color: yellow;
`

export const SelfButton = styled.div`
  height: 150px;
  width: 150px;
  color: ${(props) => props.color};
  background-image: url(${(props) => props.src});
  background-size: 150px 150px;
`
```

引入样式组件：

```js
import React, { Component } from 'react'

import { SelfLink, SelfButton } from './style'

class Test extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div>
        <SelfLink title="People's Republic of China">app.js</SelfLink>
        <SelfButton color="palevioletred" style={{ color: 'pink' }} src={fist}>
          SelfButton
        </SelfButton>
      </div>
    )
  }
}

export default Test
```
