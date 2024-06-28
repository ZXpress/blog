# this 关键字指向 [](#this-keyword)

> this 的指向和函数在哪里定义无关，和如何调用有关

## this 的四种绑定方式 [](#binding-method)

### 默认绑定

> 当函数独立调用时，this 默认绑定 window

```js
// 1、直接调用
function foo() {
  console.log(this)
}
foo()

// 2、对象中的函数
var obj1 = {
  foo: foo
}
var fn1 = obj1.foo
fn1()

// 3、被全局变量引用
var obj2 = {
  bar: function () {
    console.log(this)
  }
}
var fn2 = obj2.bar
fn2()

// 4、函数嵌套调用
function foo1() {
  console.log('foo1', this)
}
function foo2() {
  console.log('foo2', this)
  foo1()
}
function foo3() {
  console.log('foo3', this)
  foo2()
}
foo3()

// 5、通过闭包调用
var obj2 = {
  bar: function () {
    return function () {
      console.log(this)
    }
  }
}
obj2.bar()()
```

执行结果如下：

<img src="../../public/js/defaultBinding.png" />

> 以上五种调用方式全都属于默认绑定，因为他们最终都是单独的对函数进行调用

### 隐式绑定

> 调用的对象内部有对函数的引用

```js
function foo() {
  console.log(this)
}

var obj1 = {
  name: 'obj1',
  foo: foo
}
obj1.foo()

var obj2 = {
  name: 'obj2',
  bar: function () {
    console.log(this)
  }
}
obj2.bar()

var obj3 = {
  name: 'obj3',
  baz: obj2.bar
}
obj3.baz()
```

以上代码执行结果为：

<img src="../../public/js/implicit.png" />

> 以上三种都属于隐式绑定，他们都是通过对象调用，this 就指向了该对象

### 显示绑定

> 不希望在对象内部包含这个函数的引用，但又希望通过对象强制调用，使用 call/apply/bind 进行显式绑定

```js
function foo() {
  console.log(this)
}
var obj = {
  name: 'obj1'
}

foo.call(obj)
foo.apply(obj)
foo.call('xxx')
```

以上代码的执行结果为

<img src="../../public/js/explicit.png" />

> foo 函数直接调用 this 应该指向 window，这里通过 call/apply 来改变了 this 的指向

### new 绑定

> 通过 new 关键字来创建构造函数的实例，绑定 this

- 通过构建函数 new 关键字生成一个实例对象，此时 this 指向这个实例对象

```js
function test() {
  this.x = 1
}

var obj = new test()
obj.x // 1
```

- new 过程遇到 return 一个对象，此时 this 指向为返回的对象

```js
function fn() {
  this.user = 'xxx'
  return {}
}
var a = new fn()
console.log(a.user) //undefined
```

- 如果返回一个简单类型的时候，则 this 指向实例对象（返回 null 也是）

```js
function fn() {
  this.user = 'xxx'
  return 1 / null
}
var a = new fn()
console.log(a.user) //xxx
```

## this 绑定的优先级 [](#priority)

### 隐式绑定高于默认绑定

```js
function foo() {
  console.log(this)
}

var obj = {
  name: 'obj',
  foo: foo
}
obj.foo()
```

以上代码执行结果为：

<img src="../../public/js/priority1.png" />

> foo 函数默认绑定 window 对象，当同时存在隐式绑定和默认绑定时，隐式绑定优先级高于默认绑定

### 显示绑定高于隐式绑定

```js
// 案例一
var user = {
  name: 'user',
  foo: function () {
    console.log(this)
  }
}
user.foo.call('kiki')

// 案例二
function foo() {
  console.log(this)
}
var obj = {
  name: 'obj',
  foo: foo.bind('aclie')
}
obj.foo()
```

以上代码执行结果为：

<img src="../../public/js/priority2.png" />

> 如果隐式绑定优先级更高的话，this 的指向应该都为对象，但根据以上执行结果得知 this 绑定为显示绑定的结果，所以当同时存在隐式绑定和显示绑定时，显示绑定的优先级高于隐式绑定

### new 高于隐式绑定

```js
var user = {
  name: 'lisa',
  foo: function () {
    console.log(this)
  }
}
new user.foo()
```

以上代码执行结果为：

<img src="../../public/js/priority3.png" />

> 当同时存在于 new 关键字绑定和隐式绑定时，this 绑定了 foo 构造函数，所以 new 关键字的优先级高于隐式绑定

### new 高于显式绑定

```js
function bar() {
  console.log(this)
}
var fn = bar.bind('hello')
new fn()
```

以上代码执行结果为：

<img src="../../public/js/priority4.png" />

> 当同时存在于 new 关键字绑定和显示绑定时，this 绑定了 bar 构造函数，所以 new 关键字的优先级高于显示绑定

综上，以上四种绑定的优先级顺序为：

> <div style="color:red">new关键字 > 显式绑定 > 隐式绑定 > 默认绑定</div>

## 特殊绑定 [](#special)

### 忽略显示绑定

> 当显示绑定的值为 null/undefined 时，this 直接绑定 window

```js
var user = {
  name: 'alice',
  foo: function () {
    console.log(this)
  }
}
user.foo()
user.foo.call(null)
user.foo.apply(undefined)
```

以上代码执行结果如下：

<img src="../../public/js/special1.png" />

### 间接函数引用

```js
var obj1 = {
  name: 'obj1',
  foo: function () {
    console.log(this)
  }
}
var obj2 = {
  name: 'obj2'
}
obj2.baz = obj1.foo
obj2.baz()
;(obj2.bar = obj1.foo)()
```

以上代码执行结果为：

<img src="../../public/js/special2.png" />

> 两种方式所绑定的 this 不同，第二种方式进行了赋值调用，实际上是间接函数引用，（obj2.bar = obj1.foo）这里返回了赋值的结果，再加上一个小括号，就直接调用赋值的结果函数

### 箭头函数

> 箭头函数是不绑定 this 的，它的 this 来源于上级作用域

```js
var user = {
  name: 'kiki',
  foo: () => {
    console.log('箭头函数中的this', this)
  }
}
user.foo()
```

> 这里调用 foo 函数，因为箭头函数不绑定 this，所以去 foo 函数的上级查找 this，找到了全局对象 window

## 函数内 this 指向 [](#function)

| 调用方式     | this 指向                                  |
| ------------ | ------------------------------------------ |
| 普通函数调用 | window                                     |
| 构造函数调用 | 实例对象，原型对象里面的方法也指向实例对象 |
| 对象方法调用 | 该方法所属对象                             |
| 事件绑定方法 | 绑定事件对象                               |
| 定时器函数   | window                                     |
| 立即执行函数 | window                                     |

## 面试题 [](#interview)

### 考察间接函数引用

```js
var name = 'window'
var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  }
}
function sayName() {
  var sss = person.sayName
  sss()
  person.sayName()
  person.sayName()
  ;(b = person.sayName)()
}
sayName()
```

- 变量 sss 被 person.sayName 方法赋值，执行 sss 函数，此时是独立函数调用，this 指向全局 window，全局中变量 name 被绑定到了 window 中，所以 this.name 为"window"
- person.sayName() 为隐式绑定，this 指向 person 对象，所以 this.name 为 person.name，即"person"
- (person.sayName)() 与前一个本质是一样的，隐式绑定，this 指向 person 对象，所以 this.name 为 person.name，即"person"
- (b = person.sayName)() 是间接函数引用，person.sayName 赋值给 b 变量，而小括号括起来的代表赋值的结果，this 指向 window，this.name 为 window.name，即"window"

所以执行结果为：

- window
- person
- person
- window

### 定义对象时是不产生作用域的

```js
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person2 = { name: 'person2' }

person1.foo1()
person1.foo1.call(person2)

person1.foo2()
person1.foo2.call(person2)

person1.foo3()()
person1.foo3.call(person2)()
person1.foo3().call(person2)

person1.foo4()()
person1.foo4.call(person2)()
person1.foo4().call(person2)
```

调用过程分析：

1. foo1 函数

- person1.foo1() 隐式绑定，this 指向 person1，this.name 为 person1.name，即 "person1"
- person1.foo1.call(person2) 隐式绑定+显示绑定 person2，显示绑定优先级更高，所以 this 指向 person2，this.name 为 person2.name，即 "person2"

2. foo2 函数

- person1.foo2() 隐式绑定，箭头函数没有自己的 this，所以向上层作用域查找，找到了全局 window（person1 是对象，定义它的时候不产生作用域），全局变量 name 被绑定到了 window 中，this.name 为 window.name，即 "window"
- person1.foo2.call(person) 隐式绑定+显示绑定，但是 箭头函数不绑定 this，这里的显示绑定无效，没有自己的 this，向上层作用域查找，找到全局 window，this.name 为 window.name，即 "window"

3. foo3 函数

- person1.foo3()() 这里相当于执行 person1.foo()的返回函数，这里是独立函数调用，this 指向全局 window，this.name 为 window.name，即 "window"
- person1.foo3.call(person2)() 这里通过 call 改变的是 foo3 函数中 this 的指向，但最终执行的是 foo3 函数返回的闭包，闭包作为独立函数调用，this 仍然指向全局 window，this.name 为 window.name，即'window"
- person1.foo3().call(person2) 这里将 foo3 函数返回的闭包显示绑定了 person2 对象，this 指向 person2，this.name 为 person2.name，即"person2"

4. foo4 函数

- person1.foo4()() 执行 person1.foo()的返回值，返回的闭包是箭头函数没有 this 的，向上层作用域查找，找到了 foo4 函数，foo4 的 this 指向 person1，所以闭包的 this 也指向 person1，thiss.name 为 person1.name，即 "person1"
- person1.foo4.call(person2)() 返回的闭包没有 this，向上层作用域找到了 foo4 函数，foo4 函数的 this 通过显示绑定变成了 person2，所以闭包的 this 也指向 person2，this.name 为 person2.name，即"person2"
- person1.foo4().call(person) 返回的闭包是箭头函数，无法通过 call 进行显示绑定，直接向上级作用域查找，找到 foo4 函数，foo4 的 this 指向 person1，所以闭包的 this 指向 person1，this.name 为 person1.name，即"person1"

代码的执行结果如下：

- person1
- person1
- window
- window
- window
- window
- person2
- person1
- person2
- person1

### 构造函数中定义函数，该函数的上级作用域是构造函数

```js
var name = 'window'
function Person(name) {
  this.name = name
  ;(this.foo1 = function () {
    console.log(this.name)
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name)
      }
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name)
      }
    })
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1()
person1.foo1.call(person2)

person1.foo2()
person1.foo2.call(person2)

person1.foo3()()
person1.foo3.call(person2)()
person1.foo3().call(person2)

person1.foo4()()
person1.foo4.call(person2)()
person1.foo4().call(person2)
```

调用分析过程：

1. foo1 函数

- person1.foo1() 隐式绑定，this 指向 person1，person1 创建实例时传入 name 为 person1，所以 this.name 为 person1
- person1.foo1.call(person2) 隐式绑定+显示绑定，显示绑定优先级更高，绑定 person2，person2 创建实例时传入的 name 为 person2，所以 this.name 为 person2

2. foo2 函数

- person1.foo2() 隐式绑定，但 foo2 是箭头函数，没有自己的 this，向上层作用域查找，找到了 Person 构造函数，此时 this 是指向 person1 这个对象的，而 person1 实例化时传入的 name 为 person1，所以 this.name 为 person1
- person1.foo2.call(person2) 隐式绑定+显式绑定，但 foo2 是箭头函数，不绑定 this，所以 this 仍然需要向上层作用域查找，找到 Person 构造函数，this 指向 person1 对象，所以 this.name 为 person1

3. foo3 函数

- person1.foo3()() 执行 person1.foo3 的返回值，返回的函数是独立调用，this 指向 window，全局的 name 变量被绑定到 window 中，this.name 为 window.name，即 "window"
- person1.foo3.call(person2)() 显式绑定更改的是 foo3 函数的 this，最终执行的是 foo3 函数的返回值，仍然是函数的独立调用，所以 this 指向 window，this.name 为 window.name，即 "window"
- person1.foo3().call(person2) foo3 函数的返回函数通过显示绑定将 this 绑定到了 person2 中，person2 创建实例时传入的 name 为 person2，所以 this.name 为 person2

4. foo4 函数

- person1.foo4()() 执行 foo4 函数的返回值，返回函数为箭头函数，没有 this，所以向上层作用域查找，找到 foo4 函数的 this 指向 person1，所以箭头函数的 this 也指向 person1，所以 this.name 为 person1
- person1.foo4.call(person2)() foo4 通过显示绑定将 this 绑定成了 person2，返回的函数为箭头函数，this 与父级作用域 foo4 一致，所以箭头函数的 this 也指向 person2，所以 this.name 为 person2
- person1.foo4().call(person2) foo4 函数的返回值为箭头函数，不绑定 this，这里显示绑定无效，向上级作用域查找 this，找到 foo4 函数，this 指向 person1

执行结果如下：

- person1
- person2
- person1
- person1
- window
- window
- person2
- person1
- person2
- person1

### 区分作用域

```js
var name = 'window'
function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()
person1.obj.foo1.call(person2)()
person1.obj.foo1().call(person2)
person1.obj.foo2()()
person1.obj.foo2.call(person2)()
person1.obj.foo2().call(person2)
```

1. foo1 函数

- person1.obj.foo1()() 执行 foo1 函数的返回函数，此时该函数为独立函数调用，this 指向 window，全局变量 name 被添加到 window 中，这里的 this.name 指向 window.name，即 "window"
- person1.obj.foo1.call(person2)() 这里显示绑定改变 foo1 中 this 的指向，但最终执行的是 foo1 函数的返回值，返回函数作为独立函数调用，this 仍然指向 window，所以 this.name 为 window.name，即 "window"
- person1.obj.foo1().call(person2) 这里通过显示绑定更改 foo1 函数的返回函数中 this 的指向， 所以该函数 this 指向 person2，而 person2 在实例化的时候传入 name 值为 person2，所以 this.name 为 person2

2. foo2 函数

- person1.obj.foo2()() 执行 foo2 的返回函数，此时该函数为独立函数调用，但它自己没有 this，要向上级作用域查找，找到 foo2 函数的 this 指向 obj，所以该函数的 this 也指向 obj，this.name 为 obj.name，即 "obj"
- person1.obj.foo2.call(person2)() 执行 foo2 的返回函数，此时该函数为独立函数调用，但它自己没有 this，要向上级作用域查找，foo2 函数的 this 通过显示绑定变成 person2，所以该函数的 this 也为 person2，而 person2 在实例化的时候传入 name 值为 person2，所以 this.name 为 person2
- person1.obj.foo2().call(person2) foo2 的返回函数为箭头函数，不绑定 this，显式绑定无效，也没有自己的 this，要向上级作用域查找，找到 foo2 函数的 this 指向 obj，所以该函数的 this 也指向 obj，this.name 为 obj.name，即 "obj"

所以执行结果为：

- window
- window
- person2
- obj
- person2
- obj
