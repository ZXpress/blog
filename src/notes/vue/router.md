# router 实现原理 [​](#router-principle)

前端路由实现的本质是监听 url 变化，实现方式有两种：Hash 模式和 History 模式，无需刷新页面就能重新加载相应的页面

## hash [​](#hash)

- 通过 hashchange 事件监听路由变化
- 通过 location.hash 跳转路由

## history [​](#history)

- 通过 popstate 事件监听路由变化，但无法监听到 history.pushState() 时的路由变化
- 通过 history.pushState() 和 history.replaceState 跳转路由
