# Vue2 中给对象添加新属性页面不刷新的原因 [](#vue中给对象添加新属性页面不刷新的原因)

使用 v-for 遍历`对象`后，点击某个按钮给对象添加新的属性然后打印，数据更新了但是页面没有更新

原因：vue2 是通过 Object.defineProperty 实现数据响应式，原有的属性已为响应式，例如 foo，而新添加的属性没有被设置为响应式

```js
const obj = {}
Object.defineProperty(obj, 'foo', {
        get() {
            console.log(`get foo:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log(`set foo:${newVal}`);
                val = newVal
            }
        }
    })
}
```

解决方法：

- this.$set(obj，index，value)
- Object.assign(newObj，obj1，obj2，...)创建一个新对象，合并原来的对象并赋值给原来的对象
- this.$forceUpdate()只会触发 beforeUpdate 和 updated 这两个钩子函数，不会触发其他的钩子函数，它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件
