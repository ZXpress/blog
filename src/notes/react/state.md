# setState 和 useState [](#setstate-usestate)

## 参数 [](#参数)

- setState：接受一个对象或函数作为更新器，并且可以有一个回调函数的第二个参数来获取最新的状态值

- useState：只接受一个初始状态的值，并返回一个包含当前状态和一个更新状态的函数的数组

## 同步异步问题 [](#同步异步问题)

- setState：通常是异步的，但在原生事件处理函数或 setTimeout 等函数中表现为同步

- useState：虽然更新状态的函数是同步执行的，但由于 React 的调度机制，更新后的状态不会立即可用，表现为异步更新 set 后无法立刻拿到值

## 合并状态 [](#合并状态)

- setState：自动进行浅合并，这意味着设置的状态会与当前状态合并

- useState：不自动合并，需要手动处理状态合并

## 获取最新状态 [](#获取最新状态)

- setState：可以通过将回调函数作为第二个参数来获取最新的状态值

- useState：由于没有提供回调，通常配合 useEffect 使用来响应状态变化

对于复杂的状态逻辑，考虑使用 useReducer 来代替 useState 管理状态，这有助于处理更复杂的状态逻辑和变更历史
