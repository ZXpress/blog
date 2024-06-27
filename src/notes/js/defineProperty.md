# 对象属性描述符 [](#defineProperty)

> Object.defineProperty() 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象

```js
// 设置属性描述符
Object.defineProperty(obj, 'a', {
  value: 10,
  writable: false, // 不可重写
  enumerable: false, // 不可遍历
  configurable: false // 不可再修改描述符本身
})

Object.defineProperty(obj, 'a', {
  // 读取器getter
  get: () => {
    return 123
  }

  // 设置器 setter
  set: ()=>{
    throw new Error('正在给a这个属性设置值')
  }
})
```
