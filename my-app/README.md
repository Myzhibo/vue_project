# my-app(vue2 + ElementUI + less + vuex + axios + echarts)
# 使用【Myzhibo/vue_projectServer】repo下的服务器提供数据

## 1. 项目准备
### (1). 用到的vscode插件 + 插件库及工具
-   Vue Language Features (Volar)
-   Vue 3 Snippets
-   Vetur
-   WWW.BootCDN.com     //插件库
-   安装vue开发者工具
### (2). 安装ElementUI + 引入
-   npm i element-ui -S
-   官方文档：https://element.eleme.cn/#/zh-CN
### (3). 安装vue-router
-   npm install vue-router@3
-   官方文档：https://router.vuejs.org/zh
### (5). 创建router文件夹，配置路由器。路由组件文件夹，创建路由组件。

## 2. 页面布局
### (1). 引入el-container组件，设计页面布局
### (2). 引入less
-   npm i less@4.1.2 
-   npm i less-loader@6.0.0
### (3). 创建CommonAside组件，使用el-menu组件，实现左侧导航栏布局
-   给数据分类(有children，无children)， 循环遍历数据
-   添加点击事件，实现路由跳转 (编程式路由 this.$router.push)
    -    当path为/时跳转到/home , 使用redirect重定向。
    -    this.刀route   //当前页面路由
         this.刀router  //全局路由器
    -    解决多次点击跳转路由时，报error：vigationDuplicated。 为路由跳转添加判断，判断跳转路由是否是当前页面路由
### (4). 创建CommonHeader组件，使用el-button、el-dropdown组件，实现头部导航栏布局。 引入Vuex完成组件间通信
-    display: flex;                       /* 弹性布局 */
     justify-content: space-between;      /* 内容两端贴边 */   
     align-items: center;                 /* 垂直居中 */
-    通过Header组件按钮控制Aside组件样式(组件间通信)
     -    安装vuex:   npm i vuex@3
     -    创建store文件夹,创建index.js存储vuex的modules
     -    1. commit调用vuex的mutations中的方法， 当vuex模块开启命名空间(  namespaced: true)时， this.$store.commit('tab/collapseMenu')
          2. 通过计算属性 return this.$store.state.tab.isCollapse使用vuex的state中的数据
### (5). 使用el-row、el-card、el-table实现主功能区布局(栅格布局实现窗口自适应)
### (6). 引入axios。 连接nodejs服务(使用proxy代理服务)
-    安装: npm install axios
-    官方文档: https://www.axios-http.cn/docs/intro
-    在vue.config中开启代理服务
### (7). 引入echart
-    安装: npm i echarts@5.1.2
-    官方文档: https://echarts.apache.org/handbook/zh/get-started/
### (8). 完成header面包屑，通过面包屑(el-breadcrumb)完成路由切换，引入Vuex完成组件间通信
-    使用mapState获取vuex中state数据
-    /deep/   样式穿刺
### (9). 完成tag，通过tag()完成路由切换，引入Vuex完成组件间通信
-    使用mapMutations调用vuex中的mutation函数
-    实现删除tag后路由的跳转
-    cursor: pointer;            //小手样式
