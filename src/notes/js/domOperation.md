# DOM 常见操作 [](#dom-operation)

- insertBefore：把子节点插入到指定位置，子节点会插入到 referenceElement 之前

```js
parentElement.insertBefore(newElement, referenceElement)
```

- setAttribute：在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

```js
const div = document.getElementById('id')
div.setAttribute('class', 'white') //第一个参数属性名，第二个参数属性值
```

- removeChild：删除一个节点，首先要获得该节点本身以及它的父节点，然后调用父节点的 removeChild 把自己删掉
