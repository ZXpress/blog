# 0.1+0.2 不等于 0.3 原因及解决方法 [](#unequal)

原因：0.1 和 0.2 都转化成二进制后再进行运算如下

```js
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 +
0.0011001100110011001100110011001100110011001100110011010 =
0.0100110011001100110011001100110011001100110011001100111

// 转成十进制正好是 0.30000000000000004
```

解决方法：parseFloat 和 toFixed 结合

- parseFloat（（0.1+0.2））.toFixed（1） === 0.3
- 使用 Number.EPSILON，Number.EPSILON 等于 2 的-52 次方

```js
/**
 * @description 比较两个值是否相等
 * @param {Number} a
 * @param {Number} b
 * @return 相差小于某个值，返回true，否则返回false
 */
function numberEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}

numberEqual(0.1 + 0.2, 0.3) // true
```
