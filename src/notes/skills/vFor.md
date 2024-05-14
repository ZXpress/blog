# v-for 对不同数据的解构 [​](#v-for)

## 对数组进行解构 [​](#v-for-arr)

```vue
<div class="app">
    <ul>
      <li v-for="(item, index) in ['vue2','vue3','javascript','typescript']" :key="index">
        {{ index }}:{{ item }}
      </li>
    </ul>
</div>
```

运行结果：

- 0:vue2
- 1:vue3
- 2:javascript
- 3:typescript

## 对对象进行解构 [​](#v-for-obj)

对对象进行解构时可以获取键值对及索引

```vue
<div class="app">
    <ul>
      <li v-for="(value, key, index) in {name: 'zcy', age: '25', job: '前端开发'}" :key="key">
        {{ index }}:{{ key }}:{{ value }}
      </li>
    </ul>
</div>
```

运行结果：

- 0:name:zcy
- 1:age:25
- 2:job:前端开发

## 对字符串进行解构 [​](#v-for-str)

```vue
<div class="app">
    <ul>
      <li v-for="char in 'Hello'">
        {{ char }}
      </li>
    </ul>
</div>
```

运行结果：

- H
- e
- l
- l
- o
