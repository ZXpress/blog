# Redux [](#redux)

redux 就是一个集中管理的容器，遵循三大基本原则：

- 单一数据源
- state 是只读的
- 使用纯函数来执行修改

## 基本使用 [](#基本使用)

创建一个`store`的公共数据区域

```js
import { createStore, applyMiddleware } from 'redux'

// 参数一：reducer
// 参数二：指定store的初始值
// 参数三：指定中间件
const store = createStore(
  reducer,
  {
    // 要给哪个模块初始值
    login: getTokenInfo()
  },
  composeWithDevTools(applyMiddleware(thunk))
)
```

还需要创建管理数据的区域，就是 reducer，本质是一个函数，接受两个参数`state`，`action`，返回 state

```js
import { SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST, SAVE_CHANNELS } from '../action_types/home'

// 设置默认值
const initValue = {
  userChannels: [],
  allChannels: [],
  // 存储文章列表
  articles: {},
  moreAction: {
    visible: false,
    articleId: ''
  }
}

export default function reducer(state = initValue, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload
      }
    case SAVE_ALL_CHANNELS:
      return {
        ...state,
        allChannels: payload
      }
    case SAVE_ARTICLE_LIST:
      // loadMore为true应该追加数据
      const oldList = state.articles[payload.channelId]?.list
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timestamp: payload.timestamp,
            list: payload.loadMore ? [...oldList, ...payload.list] : payload.list
          }
        }
      }
    case 'home/setMoreAction':
      return {
        ...state,
        moreAction: payload
      }
    default:
      return state
  }
}
```

更改 store 里面的数据通过 dispatch 来派发 action，通常 action 中都会有 type 属性

```js
import request from '@/utils/request'
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/storage'
import { SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST, SAVE_CHANNELS } from '../action_types/home'

// 获取用户频道
export const getUserChannels = () => {
  return async (dispatch, getState) => {
    console.log(getState())
    // 判断用户是否登录
    if (hasToken()) {
      // 请求数据
      const res = await request.get('/user/channels')
      // 将频道数据保存到 Redux
      dispatch(saveUserChannels(res.data.channels))
    } else {
      // 没有登录本地获取频道数据
      const channels = getLocalChannels()
      if (channels) {
        // 有数据
        dispatch(saveUserChannels(channels))
      } else {
        // 没有数据
        // 请求数据
        const res = await request.get('/user/channels')
        // 将频道数据保存到 Redux
        dispatch(saveUserChannels(res.data.channels))
        // 保存到本地
        setLocalChannels(res.data.channels)
      }
    }
  }
}

// 保存用户频道
export const saveUserChannels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload
  }
}

// 获取所有频道
export const getAllChannels = () => {
  return async (dispatch) => {
    // 请求数据
    const res = await request.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

// 保存所有频道
export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload
  }
}

// 删除频道
export const delChannel = (channel) => {
  // 如果用户登录，发请求删除
  // 没有登录，删除本地频道
  // 最终修改redux中频道
  return async (dispatch, getState) => {
    // getState获取redux数据
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      await request({
        method: 'delete',
        url: `/user/channels/${channel.id}`
      })
      // 保存频道数据到redux
      dispatch(saveUserChannels(userChannels.filter((item) => item.id !== channel.id)))
    } else {
      // 没有登录
      // 修改本地和redux
      const result = userChannels.filter((item) => item.id !== channel.id)
      dispatch(saveUserChannels(result))
      setLocalChannels(result)
    }
  }
}

// 添加频道
export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    const channels = [...getState().home.userChannels, channel]
    if (hasToken()) {
      await request({
        method: 'patch',
        url: '/user/channels',
        data: {
          channels: [channel]
        }
      })
      dispatch(saveUserChannels(channels))
    } else {
      dispatch(saveUserChannels(channels))
      setLocalChannels(channels)
    }
  }
}

// 获取文章列表数据
export const getArticleList = (channelId, timestamp, loadMore = false) => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/articles',
      params: {
        channel_id: channelId,
        timestamp: timestamp
      }
    })
    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
        loadMore
      })
    )
  }
}

export const setArticleList = (payload) => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload
  }
}

export const setMoreAction = (payload) => {
  return {
    type: 'home/setMoreAction',
    payload
  }
}

export const unLikeArticle = (articleId) => {
  return async (dispatch, getState) => {
    await request({
      method: 'post',
      url: '/article/dislikes',
      data: {
        target: articleId
      }
    })
  }
}
```

## 总结 [](#总结)

> 注意：reducer 是一个纯函数，不需要直接修改 state，return 返回最新的 state 数据，可以通过 store.subscribe 监听 store 的变化，只要 store 发生变化，回调函数就会被执行
