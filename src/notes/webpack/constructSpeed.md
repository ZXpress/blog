# 提高 webpack 构建速度 [](#提高webpack构建速度)

## 提高 [](#提高)

常见的提升构建速度的手段有如下：

- 优化 loader 配置
- 合理使用 resolve.extensions
- 优化 resolve.modules
- 优化 resolve.alias
- 使用 DLLPlugin 插件
- 使用 cache-loader
- terser 启动多线程
- 合理使用 sourceMap

### 优化 loader 配置

在使用 loader 时，可以通过配置 include、exclude、test 属性来匹配文件，接触 include、exclude 规定哪些匹配应用 loader

如采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：

```js
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
```

### 合理使用 resolve.extensions

在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库， resolve 可以帮助 webpack 从每个 require/import 语句中，找到需要引入到合适的模块代码

通过 resolve.extensions 是解析到文件时自动添加拓展名，默认情况如下：

```js
module.exports = {
    ...
    extensions:[".warm",".mjs",".js",".json"]
}
```

当我们引入文件的时候，若没有文件后缀名，则会根据数组内的值依次查找

当我们配置的时候，则不要随便把所有后缀都写在里面，这会调用多次文件的查找，这样就会减慢打包速度

### 优化 resolve.modules

resolve.modules 用于配置 webpack 去哪些目录下寻找第三方模块。默认值为`['node_modules']`，所以默认会从 node_modules 中查找文件 当安装的第三方模块都放在项目根目录下的 ./node_modules 目录下时，所以可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：

```js
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  }
}
```

### 优化 resolve.alias

alias 给一些常用的路径起一个别名，特别当我们的项目目录结构比较深的时候，一个文件的路径可能是`./../../`的形式

通过配置 alias 以减少查找过程

```js
module.exports = {
    ...
    resolve:{
        alias:{
            "@":path.resolve(__dirname,'./src')
        }
    }
}
```

### 使用 cache-loader

在一些性能开销较大的 loader 之前添加 cache-loader，以将结果缓存到磁盘里，显著提升二次构建速度

保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src')
      }
    ]
  }
}
```

### terser 启动多线程

使用多进程并行运行来提高构建速度

```js
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  }
}
```

### 合理使用 sourceMap

打包生成 sourceMap 的时候，如果信息越详细，打包速度就会越慢。对应属性取值如下所示：

<img src="/webpack/construct1.png" style="zoom:50%" />
