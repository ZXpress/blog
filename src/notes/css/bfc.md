# BFC 块级格式化上下文 [​](#BFC)

## 触发条件 [​](#trigger-conditions)

- 根元素，即 HTML 元素
- 浮动元素：float 值为 left、right
- overflow 值不为 visible，为 auto、scroll、hidden
- display 的值为 inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position 的值为 absolute 或 fixed
