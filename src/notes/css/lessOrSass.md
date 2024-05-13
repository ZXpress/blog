# less 和 sass 的区别 [​](#difference)

## 变量 [​](#variable)

- less 声明的变量以@开头，sass 声明以$开头

```less
@red: #c00;

strong {
  color: @red;
}
```

```scss
$red: #c00;

strong {
  color: $red;
}
```

## 作用域 [​](#scope)

- less 的作用域跟 javascript 十分的相似，首先会查找局部定义的变量，如果没有找到，会像冒泡一样，一级一级往上查找，直到根为止

```less
@color: black;
.scoped {
  @bg: blue;
  @color: white;
  color: @color;
  background-color: @bg;
}
.unscoped {
  color: @color;
}
```

编译后：

```css
.scoped {
  color: white; /*白色（调用了局部变量）*/
  background-color: blue;
}
.unscoped {
  color: black; /*黑色（调用了全局变量）*/
}
```

- sass 不存在全局作用域，相同的变量名，后面的会覆盖前面定义的

```scss
$color: black;
.scoped {
  $bg: blue;
  $color: white;
  color: $color;
  background-color: $bg;
}
.unscoped {
  color: $color;
}
```

编译后：

```css
.scoped {
  color: white; /*是白色*/
  background-color: blue;
}
.unscoped {
  color: white; /*白色（无全局变量概念）*/
}
```

## 混入 [​](#interfuse)

- 在 less 中，混合的用法是指将定义好的 ClassA 中引入另一个已经定义的 Class，也能使用够传递参数，参数变量为@声明

```less
.alert {
  font-weight: 700;
}

.highlight(@color: red) {
  font-size: 1.2em;
  color: @color;
}

.heads-up {
  .alert;
  .highlight(red);
}
```

编译后：

```css
.alert {
  font-weight: 700;
}
.heads-up {
  font-weight: 700;
  font-size: 1.2em;
  color: red;
}
```
