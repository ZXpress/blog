# css 动画 [​](#animation)

## transition [​](#transition)

实现渐变动画 display:none <-> display:block 不能使用过渡

属性如下：

- property:填写需要变化的 css 属性

- duration:完成过渡效果需要的时间单位(s 或者 ms)

- timing-function:完成效果的速度曲线

- delay: 动画效果的延迟触发时间

  其中 timing-function 的值有如下：

  |     值      |            描述            |
  | :---------: | :------------------------: |
  |   linear    |            匀速            |
  |    ease     |       从慢到快再到慢       |
  |   ease-in   |          慢慢变快          |
  |  ease-out   |          慢慢变慢          |
  | ease-in-out | 先变快再到慢，渐显渐隐效果 |

## animation [​](#keyframes)

自定义动画 @keyframes names{}
