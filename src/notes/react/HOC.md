# 高阶组件（HOC） [](#高阶组件hoc)

实际上是一个函数，以 with 开头，接收要包装的组件，返回增强后的组件，通常用于在组件之间复用逻辑、修改 props、条件渲染以及为组件提供额外功能

定义高阶组件

```js
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>
    } else {
      return <WrappedComponent {...props} />
    }
  }
}

export default withLoading
```

使用高阶组件

```js
import React from 'react'
import withLoading from './withLoading'

function DataList({ data }) {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

const DataListWithLoading = withLoading(DataList)

export default DataListWithLoading
```

```js
import React, { useState, useEffect } from 'react'
import DataListWithLoading from './DataListWithLoading'

function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Data List</h1>
      <DataListWithLoading data={data} isLoading={isLoading} />
    </div>
  )
}

export default App
```
