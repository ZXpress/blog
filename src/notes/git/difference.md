# git 中的 fork、clone、branch 和区别 [](#git中的forkclonebranch和区别)

## fork [](#fork)

当你在 github 发现感兴趣开源项目的时候，可以通过点击 github 仓库中右上角 fork 标识的按钮，如下图：

<img src="/git/fork.png" />

点击这个操作后会将这个仓库的文件、提交历史、issues 和其余东西的仓库复制到自己的 github 仓库中，而你本地仓库是不会存在任何更改

然后你就可以通过 git clone 对你这个复制的远程仓库进行克隆

后续更改任何东西都可以在本地完成，如 git add、git commit 一系列的操作，然后通过 push 命令推到自己的远程仓库

如果希望对方接受你的修改，可以通过发送 pull requests 给对方，如果对方接受。则会将你的修改内容更新到仓库中

## clone [](#clone)

通过 git clone xxx 则能完成远程项目的下载

## branch [](#branch)

可通过 git branch 进行查看当前的分支状态，

如果给了--list，或者没有非选项参数，现有的分支将被列出；当前的分支将以绿色突出显示，并标有星号

以及通过 git branch 创建一个新的分支出来

## 区别 [](#区别)

其三者区别如下：

- fork 只能对代码仓进行操作，且 fork 不属于 git 的命令，通常用于代码仓托管平台的一种“操作”
- clone 是 git 的一种命令，它的作用是将文件从远程代码仓下载到本地，从而形成一个本地代码仓
- branch 特征与 fork 很类似，fork 得到的是一个新的、自己的代码仓，而 branch 得到的是一个代码仓的一个新分支
