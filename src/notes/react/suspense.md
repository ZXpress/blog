# suspense [​](#suspense)

suspense 搭配 lazy 使用

```jsx
import { Suspense, lazy } from 'react'
const Hello = lazy(() => import('./components/hello'))
function Home() {
  return (
    <div>
      <button>Home</button>
      <Suspense fallback={<p>Loading component...</p>}>
        <Hello></Hello>
      </Suspense>
    </div>
  )
}
export default Home
```
