# my-app(vue2-ElementUI-less)

## 1. 项目准备
### (1). 用到的vscode插件 + 插件库及工具
-   Vue Language Features (Volar)
-   Vue 3 Snippets
-   Vetur
-   WWW.BootCDN.com     //插件库
-   安装vue开发者工具
### (2). 安装ElementUI + 引入
-   npm i element-ui -S
### (3). 安装vue-router
-   npm install vue-router@3
### (5). 创建router文件夹，配置路由器。路由组件文件夹，创建路由组件。

## 2. 页面布局
### (1). 引入el-container组件，设计页面布局
### (2). 引入less
-   npm i less@4.1.2 
-   npm i less-loader@6.0.0
### (3). 创建CommonAside组件，引入el-menu组件，实现左侧导航栏布局
-   给数据分类(有children，无children)， 循环遍历数据
-   添加点击事件，实现路由跳转 (编程式路由 this.$router.push)
    -    当path为/时跳转到/home , 使用redirect重定向。
    -    this.刀route   //当前页面路由
         this.刀router  //全局路由器
    -    多次点击跳转路由时，报error：vigationDuplicated。 为路由跳转添加判断，判断跳转路由是否是当前页面路由


