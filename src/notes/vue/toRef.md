# toRef 默认值 [​](#toRef)

toRef 的双向 ref ，与源属性同步

```js
const state = reactive({
  foo: 1,
  bar: 2
})
// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')
// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2
// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```
