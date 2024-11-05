# vue 使用 xlsx、xlsx-style 导出带样式的 excel [](#vue使用xlsxxlsx-style导出带样式的excel)

首先需要安装三个依赖

```sh
npm install xlsx --save
npm install xlsx-style --save
npm install file-saver --save
```

如果需求仅仅是导出普通 excel，则安装 xlsx 即可，仅可以对列宽等进行简单控制

如果需要控制 excel 的样式（颜色、字体、边框、居中等），则还需要安装 xlsx-style 和 file-saver

xlsx-style 顾名思义用来设置 excel 样式，file-saver 用来下载文件（普通 excel 直接用 xlsx 就可以下载，使用 xlsx-style 后必须用 file-saver 才可以下载）

安装后程序报错 Can‘t resolve ‘./cptable‘ in ‘xxx\node_modules_xlsx，解决方法网上搜索即可，在 vue.config.js 中添加

```js
configureWebpack: {
    externals:{
        './cptable': 'var cptable'
    },
}
```

示例如下（支持 element-ui 的多级表头）：

```js
export function exportStyleExcel(refTable, dataList, fileName) {
  // 获取文件名称
  const filename = fileName || getFilePrefix()
  // 获取表格数据
  const params = extractTableHeaders(refTable)

  // 取出头部，对头部信息进行处理
  const originHeader = params.headers

  // 在各个节点追加额外信息
  originHeader.reduce((acc, cur) => acc + sumOfTree(cur), 0)

  // 将树形数据展开，方便和表格数据合并
  const _headerData = dealData(originHeader)
  // 格式化头信息，提取label
  const headerData = _headerData.map((item) => item.map((_item) => _item?.label))
  // 计算头部信息的合并方式
  const merges = doMerges(originHeader, headerData.length)

  // 若方法携带表格数据，则替换使用
  if (dataList) params.dataList = dataList

  const data = getFormatListData(params)
  const exc = XLSX.utils.book_new() // 初始化一个excel文件
  const exc_data = XLSX.utils.aoa_to_sheet([...headerData, ...data]) // 传入数据 , 到excel
  // 为工作表添加单元格合并信息
  exc_data['!merges'] = merges
  // 将文档插入文件并定义名称
  XLSX.utils.book_append_sheet(exc, exc_data, filename)

  // 设置单元格宽度
  exc_data['!cols'] = [
    {
      wpx: 100
    },
    {
      wpx: 100
    },
    {
      wpx: 100
    },
    {
      wpx: 100
    },
    {
      wpx: 100
    },
    {
      wpx: 100
    }
  ]

  // 对A1和A2进行了左右特殊处理，其他居中
  for (const key in exc_data) {
    const target = exc_data[key]
    if (Object.prototype.toString.call(target) === '[object Object]') {
      if (key === 'A1') {
        target.s = {
          alignment: {
            // 对齐方式
            horizontal: 'left', // 水平居中
            vertical: 'center', // 竖直居中
            wrapText: true
          }
        }
      } else if (key === 'A2') {
        target.s = {
          alignment: {
            // 对齐方式
            horizontal: 'right', // 水平居中
            vertical: 'center', // 竖直居中
            wrapText: true
          }
        }
      } else {
        target.s = {
          alignment: {
            // 对齐方式
            horizontal: 'center', // 水平居中
            vertical: 'center', // 竖直居中
            wrapText: true
          }
        }
      }
    }
  }
  // 调用xlsx-style进行写入
  const wbout = XLSXS.write(exc, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  })
  FileSaver.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    filename + '.xlsx'
  )
}
```

示例中用的方法：

```js
// 获取文件名称前缀
function getFilePrefix() {
  // 获取日期信息
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().replace(/^(\d)$/, '0$1')
  const day = date
    .getDate()
    .toString()
    .replace(/^(\d)$/, '0$1')
  const hours = date
    .getHours()
    .toString()
    .replace(/^(\d)$/, '0$1')
  const minutes = date
    .getMinutes()
    .toString()
    .replace(/^(\d)$/, '0$1')
  const seconds = date
    .getSeconds()
    .toString()
    .replace(/^(\d)$/, '0$1')

  // 定义文件名前缀
  const filePrefix = year + '-' + month + '-' + day + '_' + hours + minutes + seconds

  return filePrefix
}

// 提取表格中的表头及数据
function extractTableHeaders(refTable) {
  // 定义表头集合
  const tableHeaders = []
  // 定义数据行单元格合并信息
  let bodySpanInfo = []
  // 获取表格子组件
  const componentChildren = refTable.$children
  // 对子组件进行遍历，取出列元素
  componentChildren.forEach((component) => {
    // 判断若有单元格合并信息
    if (component.spanInfo && component.spanInfo.length > 0) {
      bodySpanInfo = component.spanInfo
    } else if (component.columnConfig) {
      // 否则若为列元素则将列元素添加至集合
      tableHeaders.push(component.columnConfig)
    }
  })
  // 返回后端所需对象
  return {
    headers: tableHeaders,
    dataList: refTable.data ? refTable.data : [],
    bodySpanInfo
  }
}

// 计算当前节点所占单元格个数
function sumOfTree(root) {
  if (!Array.isArray(root.children)) {
    root.leaf = true
    root.colSpan = 1
    return 1
  } else {
    const colSpan = root.children.reduce((acc, cur) => acc + sumOfTree(cur), 0)
    root.colSpan = colSpan
    root.leaf = false
    return colSpan
  }
}

// 展开树形数据为二维数组，若单个字段占据多列，第二到最后一列使用 undefined 占位
function dealData(originData) {
  const result = []
  let deep = 0
  let hasChildrenFlag = true

  // 向数组后填充 count 个 undefined
  function padArrayEndUndefined(arr, count) {
    for (let i = 0; i < count; i++) {
      arr.push(undefined)
    }
  }

  while (hasChildrenFlag) {
    hasChildrenFlag = false
    const dataLayer = []
    // 将已有的元素展开至数组
    if (deep === 0) {
      // 如果当前是第一行，对原始数据进行处理
      originData.forEach((item) => {
        dataLayer.push(item)
        if (item.colSpan > 1) padArrayEndUndefined(dataLayer, item.colSpan - 1)
      })
    } else {
      // 如果当前不是第一行，对上一个进行遍历，取所有元素的children
      for (const parentItem of result[deep - 1]) {
        const currentItem = parentItem?.children ? parentItem.children : dataLayer.every((dataLayerItem) => dataLayerItem === undefined) ? [undefined] : []
        currentItem.forEach((curItemChild) => {
          if (dataLayer.length === result[deep - 1].length) return
          dataLayer.push(curItemChild)
          if (curItemChild?.colSpan && curItemChild.colSpan > 1) {
            padArrayEndUndefined(dataLayer, curItemChild.colSpan - 1)
          }
        })
      }
    }
    // 循环判断下一层是否含有子节点，以改变循环下一层的标志
    dataLayer.forEach((item) => {
      if (item?.children) {
        hasChildrenFlag = true
      }
    })
    result.push(dataLayer)
    deep += 1
  }
  return result
}

// 合并头部单元格
function doMerges(arr, treeDeep) {
  const result = []
  // 处理单个数据
  function dealArrItem(item, leftOffset, topOffset) {
    // 传入所在元素的起始位置
    const itemRange = {
      s: { c: leftOffset, r: topOffset },
      e: {},
      itemLabel: item.label
    }
    // 处理元素的结束位置
    itemRange.e.c = item?.colSpan ? leftOffset + item.colSpan - 1 : leftOffset + 1
    itemRange.e.r = item?.leaf ? treeDeep - 1 : topOffset

    result.push(itemRange)
  }

  // 递归所有树元素
  function getHierarchy(arr, parentCol = 0, parentRow = -1) {
    arr.reduce((acc, cur) => {
      // acc为左侧元素的总和，加上父元素的偏移，得到当前元素的起始位置
      const currentLeftOffset = acc + parentCol
      // 第一层元素的偏移为0，取父元素为-1层
      const currentTopOffset = parentRow + 1
      dealArrItem(cur, currentLeftOffset, currentTopOffset)

      if (cur?.children) {
        getHierarchy(cur.children, currentLeftOffset, currentTopOffset)
      }

      return acc + cur.colSpan
    }, 0)
  }

  getHierarchy(arr)
  return result
}

// 提取数据为列表类型
function getFormatListData(tableObject) {
  const result = []
  const propertys = []
  // 获取最下边一层叶子节点，存储到propertys数组中
  function _getLeaf(root) {
    if (Array.isArray(root.children)) {
      root.children.forEach((item) => {
        _getLeaf(item)
      })
    } else {
      propertys.push(root.property)
    }
  }

  tableObject.headers.forEach((item) => _getLeaf(item))

  if (Array.isArray(tableObject.dataList)) {
    tableObject.dataList.forEach((dataItem) => {
      const dataItemList = []
      propertys.forEach((property) => {
        dataItemList.push(dataItem[property])
      })
      result.push(dataItemList)
    })
  }
  return result
}

// 工具方法
function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
```
