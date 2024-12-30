# 前端开发代码规范

## 命名规范

### 项目命名

全部采用小写方式，以中线分割

> 正例：mall-management-system
>
> 反例：mall_management-system / mallManagementSystem

### 目录命名

全部采用小写方式，以中划线分割，有复数结构时，采用复数命名法，缩写不用复数

> 正例：styles/components/images/utils/layouts/demo-styles/demo-scripts/img/doc
>
> 反例：style/demo_scripts/demoStyles/imgs/docs

- VUE 项目中的目录，采用 kebab-case 命名

> 正例：page-one/shopping-car-user-management
>
> 反例：Shopping/UserManagement

### JS、CSS、SCSS、HTML、PNG 文件命名

全部采用小写方式，以中划线分割

> 正例：render-dom.js/signup.css/index.html/company-logo.png
>
> 反例：renderDom.js/UserManagement.html

### 命名严谨性

代码中的明明严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。正确的英文拼写和语法可以让阅读者易于理解，避免歧义

> 正例：henan/luoyang/rmb 等国际通用的名称，可视同英文
>
> 反例：DaZhePromotion【打折】/ getPingfenByName()【评分】/ int 某变量 = 3

杜绝完全不规范的缩写，避免望文不知义

> 反例：AbstractClass 缩写命名为 AbsClass；condition 缩写命名为 condi，此类随意缩写严重降低了代码的可阅读性

### 命名规则 Kebab-case、camelCase、Pascal case

Kebab-case 于 camelCase 的区别

- 单词分隔方式:
  Kebab-case 使用连字符 (-) 分隔单词
  camelCase 使用大小写混合的方式分隔单词

- 大小写:
  Kebab-case 全部使用小写字母
  camelCase 第一个单词首字母小写,其他单词首字母大写

- 适用场景:
  Kebab-case 更适合用于 URL、CSS 类名、文件名等
  camelCase 更适合用于编程语言中的变量名、函数名、类名等

- 可读性:
  Kebab-case 更简洁易读,特别适合在 URL 中使用
  camelCase 可以更清楚地表达单词的边界

Pascal case 于 camelCase 的区别

- 命名方式:
  camelCase 第一个单词首字母小写,其他单词首字母大写
  Pascal case 所有单词首字母都大写

- 适用场景:
  camelCase 更常见于变量名、函数名等编程中
  Pascal case 更常见于类名、命名空间等面向对象编程中

- 可读性:
  Pascal case 每个单词的首字母大写更加突出单词边界,可读性更强
  camelCase 第一个单词首字母小写,可能会稍微降低可读性

## HTML 规范（Vue Template 同样适用）

### 缩进

缩进适用两个空格（一个 tab），嵌套的节点应该缩进

### 语义化标签

HTML5 中新增很多语义化标签，所以优先使用语义化标签

正例：

```html
<header></header>
<footer></footer>
```

反例：

```html
<div>
  <p></p>
</div>
```

以下列举出常见的语义化标签集合：

<img src="/other/label.png" style="zoom:50%" />

### 引号

使用双引号而不是单引号

> 正例：`<div class="box"></div>`
>
> 反例：`<div class='box'></div>`

## CSS 规范

### 命名

- 类名使用小写字母，以中划线分割

- id 采用驼峰式命名

- scss 中的变量、函数、混合、placeholder 采用驼峰式命名

### 选择器

- css 选择器中避免使用标签名

- 使用直接子选择器

很多前端开发人员写选择器链的时候不使用直接子选择器（注：直接子选择器和后代选择器的区别），有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能。如果你是不写很通用的，需要匹配到 DOM 末端的选择器，你应该总是考虑直接子选择器

不推荐：

```css
.content .title {
  font-size: 2rem;
}
```

推荐：

```css
.content > .title {
  font-size: 2rem;
}
```

### 尽量使用缩写属性

不推荐：

```css
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
```

推荐：

```css
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```

### 省略 0 后面的单位

不推荐：

```css
div {
  padding-bottom: 0px;
  margin: 0em;
}
```

推荐：

```css
div {
  padding-bottom: 0;
  margin: 0;
}
```

### 避免使用 ID 选择器及全局标签选择器防止污染全局样式

不推荐：

```css
#header {
  padding-bottom: 0px;
  margin: 0em;
}
```

推荐：

```css
.header {
  padding-bottom: 0px;
  margin: 0em;
}
```

### 避免使用行内样式

避免直接在标签写 style 行内样式，这样样式会很分散不易维护，最好是把样式提取到一个 class 中

正例：

```html
<style>
  .text-red {
    font-size: 18px;
    color: red;
  }
</style>
<body>
  <div class="text-red"></div>
</body>
```

反例：

```html
<body>
  <div style="font-size:18px; color:red;"></div>
</body>
```

### 避免使用!important 优先级

非必要不要使用!important 强制设置优先级最高，滥用出现问题会导致代码难以维护

### 样式属性书写顺序

按照一定的顺序书写样式，可以提高浏览器渲染 dom 性能

```css
.hotel-content {
  /* 1. 定位 */
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  /* 2. 盒子模型 */
  width: 50px;
  height: 50px;
  margin: 10px;
  border: 1px solid black;
  /* 3. 文本 */
  font-size: 18px;
  color: red;
  text-align: center;
  /* 4. 背景 */
  background: #ccc;
  /* 5. 其他 */
  transition: all 0.2s;
}
```

### 样式文件命名

```text
index.css // 一般用于首页建立样式
head.css // 头部样式，当多个页面头部设计风格相同时使用。
base.css // 共用样式。
style.css // 独立页面所使用的样式文件。
global.css // 页面样式基础，全局公用样式，页面中必须包含。
layout.css // 布局、版面样式，公用类型较多时使用，一般用在首页级页面和产品类页面中
module.css // 模块，用于产品类页，也可与其它样式配合使用。
master.css // 主要的样式表
columns.css // 专栏样式
themes.css // 主体样式
forms.css // 表单样式
mend.css // 补丁，基于以上样式进行的私有化修补。
print.css // 打印
```

### 页面结构命名

```text
page         // 代表整个页面，用于最外层。
wrap         // 外套，将所有元素包在一起的一个外围包，用于最外层
wrapper      // 页面外围控制整体布局宽度，用于最外层
container    // 一个整体容器，用于最外层
head|header  // 页头区域，用于头部
nav          // 导航条
content      // 内容，网站中最重要的内容区域，用于网页中部主体
main         // 网站中的主要区域（表示最重要的一块位置），用于中部主体内容
column       // 栏目
sidebar      // 侧栏
foot|footer  // 页尾、页脚。网站一些附加信息放置区域，（或命名为 copyright）用于底部
left|right|center  // 左右中
```

### 导航命名

```text
nav|navbar|navigation|nav-wrapper  // 导航条或导航包，代表横向导航
topnav     // 顶部导航
mainbav    // 主导航
subnav     // 子导航
sidebar    // 边导航
left-sidebar|sidebar-l   // 左导航
right-sidebar|sidebar-r  // 右导航
title      // 标题
summary    // 摘要
menu       // 菜单，区域包含一般的链接和菜单
submenu    // 子菜单
drop       // 下拉
dorp-menu  // 下拉菜单
links      // 链接菜单
```

### 功能命名

```text
logo      // 标记网站logo标志
banner    // 标语、广告条、顶部广告条
login     // 登陆，（例如: 登录表单 form-login）
loginbar  // 登录条
register  // 注册
tool|toolbar    // 工具条
search          // 搜索
searchbar       // 搜索条
searchlnput     // 搜索输入框
shop            // 功能区，表示现在的
icon            // 小图标
label           // 商标
homepage        // 首页
subpage         // 二级页面子页面
hot             // 热门热点
list            // 文章列表，（例如: 新闻列表 list-news）
scroll          // 滚动
tab             // 标签
sitemap         // 网站地图
msg|message     // 提示信息
current         // 当前的
joinus          // 加入
status          // 状态
btn             // 按钮，（例如: 搜索按钮可写成  btn-search）
tips            // 小技巧
note            // 注释
guild           // 指南
arr|arrow       // 标记箭头
service         // 服务
breadcrumb      // (即页面所处位置导航提示）
download        // 下载
vote            // 投票
news            // 新闻
siteinfo        // 网站信息
partner         // 合作伙伴
link|friendlink // 友情链接
copyright       // 版权信息
siteinfoCredits // 信誉
siteinfoLegal   // 法律信息
```

## LESS 规范

### 代码组织

- 将公共 less 文件放置在 style/less/common 文件夹

例如：color.less、common.less

- 按以下顺序组织

1. @import

2. 变量声明

3. 样式声明

```css
@import 'mixins/size.less';
@default-text-color: #333;
.page {
  width: 960px;
  margin: 0 auto;
}
```

### 避免嵌套层级过多

将嵌套深度限制在 3 级，对于超过 4 级的嵌套，给予重新评估。这可以避免出现过于详实的 CSS 选择器，避免大量的嵌套规则，当可读性受到影响时，将之打断。推荐避免出现多于 20 行的嵌套规则出现

不推荐：

```css
.main {
  .title {
    .name {
      color: #fff;
    }
  }
}
```

推荐：

```css
.main-title {
  .name {
    color: #fff;
  }
}
```

## javascript 规范

### 命名

1. 采用小写驼峰命名 lowerCamelCase，代码中的命名均不能以下划线或美元符号结束

2. 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格，必须遵从驼峰形式

正例：

    localValue、getHttpMessage()、inputUserId

其中 method 方法命名必须是动词或者动词+名词形式

正例：

    saveShopCarData、openShopCarInfoDialog

如果是内部使用的私有函数，需要用 `_` 符号作为前缀，写到文件最下面，并按照功能进行分组，写上块注释

```js
/* 格式化内容 */
function _formatText() {}
function _formatMoney() {}

/* 设置日期 */
function _setDate() {}
function _setMonth() {}
```

特此说明，增删改查详情统一使用如下 5 个单词，目的统一各端

```template
add / update / delete / detail / get
附： 函数方法常用的动词:
get 获取/set 设置,
add 增加/remove 删除,
create 创建/destory 销毁,
start 启动/stop 停止,
open 打开/close 关闭,
read 读取/write 写入,
load 载入/save 保存,
begin 开始/end 结束,
backup 备份/restore 恢复,
import 导入/export 导出,
split 分割/merge 合并,
inject 注入/extract 提取,
attach 附着/detach 脱离,
bind 绑定/separate 分离,
view 查看/browse 浏览,
edit 编辑/modify 修改,
select 选取/mark 标记,
copy 复制/paste 粘贴,
undo 撤销/redo 重做,
insert 插入/delete 移除,
add 加入/append 添加,
clean 清理/clear 清除,
index 索引/sort 排序,
find 查找/search 搜索,
increase 增加/decrease 减少,
play 播放/pause 暂停,
launch 启动/run 运行,
compile 编译/execute 执行,
debug 调试/trace 跟踪,
observe 观察/listen 监听,
build 构建/publish 发布,
input 输入/output 输出,
encode 编码/decode 解码,
encrypt 加密/decrypt 解密,
compress 压缩/decompress 解压缩,
pack 打包/unpack 解包,
parse 解析/emit 生成,
connect 连接/disconnect 断开,
send 发送/receive 接收,
download 下载/upload 上传,
refresh 刷新/synchronize 同步,
update 更新/revert 复原,
lock 锁定/unlock 解锁,
check out 签出/check in 签入,
submit 提交/commit 交付,
push 推/pull 拉,
expand 展开/collapse 折叠,
enter 进入/exit 退出,
abort 放弃/quit 离开,
obsolete 废弃/depreciate 废旧,
collect 收集/aggregate 聚集
```

3. 常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长

正例：MAX_STOCK_COUNT

反例：MAX_COUNT

4. 形参命名

形参本身是可以任意定义的，统一是为了更方便地复用/合并代码

<img src="/other/parameter.png" style="zoom:50%" />

### 代码格式

1. 使用两个空格进行缩进

2. 不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以提升可读性

### 字符串

统一使用单引号(‘)，不使用双引号(“)

正例：

```js
let str = 'foo'
let testDiv = '<div id="test"></div>'
```

反例：

```js
let str = 'foo'
let testDiv = "<div id='test'></div>"
```

### 对象声明

1. 使用字面量创还能对象

正例：let user = {}

反例：let user = new Object()

2. 使用字面量来代替对象构造器

正例：

```js
var user = { age: 0, name: 1, city: 3 }
```

反例：

```js
var user = new Object()
user.age = 0
user.name = 0
user.city = 0
```

3. 多个变量声明简写

同时声明多个变量，不需要每个都用 let 起一行声明，可以合并到一起

正例：

```js
let id = 2,
  name = '小红',
  sex = '女',
  age = 18
```

反例：

```js
let id = 2
let name = '小红'
let sex = '女'
let age = 18
```

### 条件判断和循环最多三层

条件判断能使用三目运算符和逻辑运算符解决的，就不要使用条件判断，但是超过三层请抽成函数，并写清楚注释

### this 的转换命名

对上下文 this 的引用只能使用 self 来命名

```js
let self = this
setTimeout(function () {
  self.say()
}, 1000)
```

### 使用可选链 `?.` 操作符

```js
let user = null
// 如果直接取 user.sex 是会报错的，用了可选链后可以不用判断直接取了
console.log(user?.sex)
```

### 简单判断并行函数执行

如果条件较少，条件通过则执行函数，这种可以在单行用 `&&` 符号判断并执行代码

正例：

```js
let div = document.getElementById('div')
div && div.append('child')
```

反例：

```js
let div = document.getElementById('div')
if (div) {
  div.append('child')
}
```

### 提前 return，使判断逻辑简单化

当有比较多判断的情况下，把判断前置，使我们的代码结构更加清晰分明

正例：

```js
function submit() {
  // 校验
  if (!this.listQuery.name) return
  if (!this.listQuery.status) return
  if (!this.listQuery.type) return

  // 校验通过，正常执行代码
  addUser()
}
```

反例：

```js
function submit() {
  // 校验 name
  if (this.listQuery.name) {
    // 校验 status
    if (this.listQuery.status) {
      // 校验 type
      if (this.listQuery.type) {
        // 校验通过，正常执行代码
        addUser()
      }
    }
  }
}
```

## Vue 项目规范

### Vue 编码基础

Vue 项目规范以 Vue 官方规范<a href="https://v2.cn.vuejs.org/v2/style-guide">https://v2.cn.vuejs.org/v2/style-guide</a>中的 A 规范为基础，在其上面进行项目开发

### 组件规范

1. 组件名为多个单词

组件名应该始终是多个单词组成（大于等于 2），且命名规范为 KebabCase 格式。
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的

正例：

```js
export default {
  name: 'TodoItem'
  // ...
}
```

反例：

```js
export default {
  name: 'Todo',
  // ...
}
export default {
  name: 'todo-item',
  // ...
}
```

2. 组件文件名为 pascal-case 格式

正例：

```js
components/
|- my-component.vue
```

反例：

```js
components/
|- myComponent.vue
|- MyComponent.vue
```

3. 基础组件文件名为 base 开头，使用完整单词而不是缩写

正例：

```js
components/
|- base-button.vue
|- base-table.vue
|- base-icon.vue
```

反例：

```js
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

4. 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

正例：

```js
components/
|- todo-list.vue
|- todo-list-item.vue
|- todo-list-item-button.vue
|- user-profile-options.vue （完整单词）
```

反例：

```js
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
|- UProfOpts.vue （使用了缩写）
```

5. 在 Template 模板中使用组件，应使用 PascalCase 模式，并且使用自闭和组件

正例：

```vue
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent />
<Row><table :column="data"/></Row>
```

反例：

```vue
<my-component />
<row><table :column="data"/></row>
```

6. 组件的 data 必须是一个函数

当在组件中使用 data 属性的时候（除了 new Vue 外的任何地方），它的值必须是返回一个对象函数，因为如果直接是一个对象的话，子组件之间的属性值会互相影响

正例：

```js
export default {
  data() {
    return {
      name: 'jack'
    }
  }
}
```

反例：

```js
export default {
  data: {
    name: 'jack'
  }
}
```

7. Prop 定义应该尽量详细

- 必须使用 camelCase 驼峰命名

- 必须指定类型

- 必须加上注释，表明其含义

- 必须加上 required 或者 default，两者二选其一

- 如果有业务需要，必须加上 validator 验证

正例：

```js
 props: {
  // 组件状态，用于控制组件的颜色
   status: {
     type: String,
     required: true,
     validator: function (value) {
       return [
         'succ',
         'info',
         'error'
       ].indexOf(value) !== -1
     }
   },
    // 用户级别，用于显示皇冠个数
   userLevel：{
      type: String,
      required: true
   }
}
```

8. 为组件样式设置作用域

正例：

```js
<template>
  <button class="btn btn-close">X</button>
</template>
<!-- 使用 `scoped` 特性 -->
<style scoped>
  .btn-close {
    background-color: red;
  }
</style>
```

反例：

```js
<template>
  <button class="btn btn-close">X</button>
</template>
<!-- 没有使用 `scoped` 特性 -->
<style>
  .btn-close {
    background-color: red;
  }
</style>
```

9. 如果特性元素较多，应该主动换行

正例：

```template
<MyComponent foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
 />
```

反例：

```js
<MyComponent foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" />
```

### 模板中使用简单的表达式

组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法，复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值，而且计算属性和方法使得代码可以重用

正例：

```js
<template>
  <p>{{ normalizedFullName }}</p>
</template>
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

反例：

```js
<template>
  <p>
       {{
          fullName.split(' ').map(function (word) {
             return word[0].toUpperCase() + word.slice(1)
           }).join(' ')
        }}
  </p>
</template>
```

### 标签顺序保持一致

单文件组件应该总是让标签顺序保持为：

正例：

```js
<template>...</template>
<script>...</script>
<style>...</style>
```

反例：

```js
<template>...</template>
<style>...</style>
<script>...</script>
```

### 必须为 v-for 设置键值 key

### v-show 与 v-if 选择

如果运行时，需要非常频繁地切换，使用 v-show；如果在运行时，条件很少改变使用 v-if

### script 标签内部结构顺序

components > props > data > computed > watch > filter > 钩子函数 > methods

### Vue Router 规范

1. 页面跳转数据传递使用路由参数

页面跳转，例如 A 页面跳转到 B 页面，需要将 A 页面的数据传递到 B 页面，推荐使用 路由参数进行传参，而不是将需要传递的数据保存 vuex，然后在 B 页面取出 vuex 的数据，因为如果在 B 页面刷新会导致 vuex 数据丢失，导致 B 页面无法正常显示数据

正例：

```js
let id = ' 123'
this.$router.push({ name: 'userCenter', query: { id: id } })
```

2. 使用路由懒加载（延迟加载）机制

```js
{
    path: '/uploadAttachment',
    name: 'uploadAttachment',
    meta: {
        title: '上传附件'
    },
    component: () => import('@/view/components/uploadAttachment/index.vue')
}
```

3. router 中的命名规范

path、childrenPoints 命名规范采用 kebab-case 命名规范（尽量 vue 文件的目录结构保持一致，因为目录、文件名都是 kebab-case，这样很方便找到对应的文件），name 命名规范采用 KebabCase 命名规范且和 component 组件名保持一致！（因为要保持 keep-alive 特性，keep-alive 按照 component 的 name 进行缓存，所以两者必须高度保持一致）

```js
// 动态加载
export const reload = [
  {
    path: '/reload',
    name: 'reload',
    component: Main,
    meta: {
      title: '动态加载',
      icon: 'icon iconfont'
    },
    children: [
      {
        path: '/reload/smart-reload-list',
        name: 'SmartReloadList',
        meta: {
          title: 'SmartReload',
          childrenPoints: [
            {
              title: '查询',
              name: 'smart-reload-search'
            },
            {
              title: '执行reload',
              name: 'smart-reload-update'
            },
            {
              title: '查看执行结果',
              name: 'smart-reload-result'
            }
          ]
        },
        component: () => import('@/views/reload/smart-reload/smart-reload-list.vue')
      }
    ]
  }
]
```

4. router 中的 path 命名规范

path 除了采用 kebab-case 命名规范以外，必须以 / 开头，即使是 children 里的 path 也要以 / 开头

目的：

经常有这样的场景：某个页面有问题，要立刻找到这个 vue 文件，如果不用以/开头，path 为 parent 和 children 组成的，可能经常需要在 router 文件里搜索多次才能找到，而如果以/开头，则能立刻搜索到对应的组件

```js
{
    path: '/file',
    name: 'File',
    component: Main,
    meta: {
      title: '文件服务',
      icon: 'ios-cloud-upload'
    },
    children: [
      {
        path: '/file/file-list',
        name: 'FileList',
        component: () => import('@/views/file/file-list.vue')
      },
      {
        path: '/file/file-add',
        name: 'FileAdd',
        component: () => import('@/views/file/file-add.vue')
      },
      {
        path: '/file/file-update',
        name: 'FileUpdate',
        component: () => import('@/views/file/file-update.vue')
      }
    ]
  }
```

### Vue 项目目录规范

目录说明：

目录名按照上面的命名规范，其中 componens 组件用大写驼峰，其余所有目录均使用 kebab-case 命名

```js
src                                  源码目录
|-- api                              所有api接口
|-- assets                           静态资源，images, icons, styles等
|-- components                       公用组件
|-- config                           配置信息
|-- constants                        常量信息，项目所有Enum, 全局常量等
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- datas                            模拟数据，临时存放
|-- lib                              外部引用的插件存放及修改文件
|-- mock                             模拟接口，临时存放
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- themes                           自定义样式主题
|-- views                            视图目录
|   |-- role                                 role模块名
|   |-- |-- role-list.vue                    role列表页面
|   |-- |-- role-add.vue                     role新建页面
|   |-- |-- role-update.vue                  role更新页面
|   |-- |-- index.less                       role模块样式
|   |-- |-- components                       role模块通用组件文件夹
|   |-- employee                             employee模块
```

1. api 目录

文件、变量命名要与后端保持一致。此目录对应后端 API 接口，按照后端一个 controller 一个 api js 文件。若项目较大时，可以按照业务划分子目录，并与后端保持一致。api 中的方法名字要与后端 api url 尽量保持语义高度一致性。
对于 api 中的每个方法要添加注释，注释与后端 swagger 文档保持一致

正例：

后端：EmployeeController.java

```js
/employee/add
/employee/delete/{id}
/employee/update
```

前端：employee.js

```js
// 添加员工
addEmployee: (data) => {
    return postAxios('/employee/add', data)
},
// 更新员工信息
updateEmployee: (data) => {
    return postAxios('/employee/update', data)
},
// 删除员工
deleteEmployee: (employeeId) => {
    return postAxios('/employee/delete/' + employeeId)
},
```

2. assets 目录

assets 为静态资源，里面存放 images、styles、icons 等静态资源，静态资源命名格式 wieldkebab-case

```js
|assets
|-- icons
|-- images
|   |-- background-color.png
|   |-- upload-header.png
|-- styles
```

3. components 目录

此目录按照组件进行目录划分，目录和组件命名为 kebabCase

```js
|components
|-- error-log
|   |-- index.vue
|   |-- index.less
|-- markdown-editor
|   |-- index.vue
|   |-- index.js
|-- kebab-case
```

4. constants 目录

此目录存放项目所有常量，如果常量在 vue 中使用，请使用 vue-enum 插件<a href="https://www.npmjs.com/package/vue-enum">https://www.npmjs.com/package/vue-enum</a>

目录结构：

```js
|constants
|-- index.js
|-- role.js
|-- employee.js
```

例子：employee.js

```js
export const EMPLOYEE_STATUS = {
  NORMAL: {
    value: 1,
    desc: '正常'
  },
  DISABLED: {
    value: 1,
    desc: '禁用'
  },
  DELETED: {
    value: 2,
    desc: '已删除'
  }
}
export const EMPLOYEE_ACCOUNT_TYPE = {
  QQ: {
    value: 1,
    desc: 'QQ登录'
  },
  WECHAT: {
    value: 2,
    desc: '微信登录'
  },
  DINGDING: {
    value: 3,
    desc: '钉钉登录'
  },
  USERNAME: {
    value: 4,
    desc: '用户名密码登录'
  }
}
export default {
  EMPLOYEE_STATUS,
  EMPLOYEE_ACCOUNT_TYPE
}
```

5. views 目录

命名要与后端、router、api 保持一致，components 中组件要使用 PascalCase 规则

```js
|-- views                                    视图目录
|   |-- role                                 role模块名
|   |   |-- role-list.vue                    role列表页面
|   |   |-- role-add.vue                     role新建页面
|   |   |-- role-update.vue                  role更新页面
|   |   |-- index.less                      role模块样式
|   |   |-- components                      role模块通用组件文件夹
|   |   |   |-- role-header.vue             role头部组件
|   |   |   |-- role-modal.vue              role弹出框组件
|   |-- employee                            employee模块
|   |-- behavior-log                        行为日志log模块
|   |-- code-generator                      代码生成器模块
```

6. 注释说明

整理必须加注释的地方：

公共组件使用说明：

- api 目录的接口 js 文件必须加注释
- store 中的 state, mutation, action 等必须加注释
- vue 文件中的 template 必须加注释，若文件较大添加 start end 注释
- vue 文件的 methods，每个 method 必须添加注释
- vue 文件的 data, 非常见单词要加注释

注释规范：

单行注释：

```html
<body>
  <!-- 单行注释 -->
  <div>内容</div>
</body>
```

多行注释：

```html
<body>
  <!-- 
    多行注释
    多行注释
  -->
  <div>内容</div>
</body>
```

块注释：

- 块注释以 `/*` 开头，以 `*/` 结束，前后各空一格
- 块注释用于划分某个块的标记，需要写上块描述

```js
/* 获取列表 */
function getList() {}

/* 新增和修改用户 */
function addUser() {}
function updateUser() {}
```

方法注释：

方法注释以 `/**` 开头，以 `*/` 结束，方法注释要使用注释标签说明方法的参数，返回结果等等内容

```js
/**
 * 获取用户信息
 * @param {Number} id 用户id
 * @returns {Object} 返回用户对象
 */
function getUserInfo(id) {}
```

方法的 `注释标签` 必须要写，以下是常用的标签说明

<img src="/other/describe.png" style="zoom:50%" />

闭合注释：

```html
<body>
  <!-- 注释开头 -->
  <div>内容</div>
  <!-- /注释结束 -->
</body>
```

特殊注释：

用于标注修改、待办等信息，需要写上作者和时间等信息

```css
/* TODO: 标签页样式待补充 by 小红 2022-03-13 18:32 */
/* BUGFIX: 修复标签页的bug by 小红 2022-03-13 18:32 */
.tabs {
}
```

文件注释：

文件注释以 `/**` 开头，以 `*/` 结束

```css
/**
 * css文件描述
 * @author: 小红
 * @update: 2021-04-13 18:32
 */

/* 标签页 */
.tabs {
}
```

### 单文件组件中使用

在单文件组件中用 PascalCase 帕斯卡命名，如果组件中没有内容则需要自闭合标签

```vue
<template>
  <div class="app-container">
    <UserInfo :user-detail="userDetail" />
  </div>
</template>
```

### DOM 模板中使用

在 DOM 模板中需要用 kebab-case 命名，因为是直接在 html 页面中使用，html 是会忽略大小写，并且不能自闭合标签

```html
<html>
  <body>
    <div class="app-container">
      <user-info :user-detail="userDetail"></user-info>
    </div>
  </body>
</html>
```

## 命名规则

### 布尔值命名
