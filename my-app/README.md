# my-app(vue2 + vue-cli + + vuex + axios + ElementUI + echarts + less)
-    使用【Myzhibo/vue_projectServer】repo下的服务器提供数据
-    服务器设置项目login接口，
     -    账号:admin ,密码: 123         //超级管理员
     -    账号:miniadm ,密码: 123       //mini管理员

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
    -    this.$route   //当前页面路由
         this.$router  //全局路由器
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
          
## 3. 首页
### (1). 使用el-row、el-card、el-table实现主功能区布局(栅格布局实现窗口自适应)
### (2). 引入axios。 连接nodejs服务(使用proxy代理服务)
-    安装: npm install axios
-    官方文档: https://www.axios-http.cn/docs/intro
-    在vue.config中开启代理服务
### (3). 引入echart
-    安装: npm i echarts@5.1.2
-    官方文档: https://echarts.apache.org/handbook/zh/get-started/
### (4). 完成header面包屑，通过面包屑(el-breadcrumb)完成路由切换，引入Vuex完成组件间通信
-    使用mapState获取vuex中state数据
-    /deep/   样式穿刺
### (5). 完成tag，通过tag()完成路由切换，引入Vuex完成组件间通信
-    使用mapMutations调用vuex中的mutation函数
-    实现删除tag后路由的跳转
-    cursor: pointer;            //小手样式

## 4. 用户管理页
### (1). 引入el-dialog完成新增按钮弹窗功能
### (2). 引入el-form完成新增弹窗中的表单
-    Form中表单验证的功能，el-form下rules属性传入约定的验证规则，el-form-item下 prop属性设置为需校验的字段名。
### (3). 引入el-table、MessageBox完成用户信息数据表格展示,服务器引入mockjs生成随机数据,前端将接口收到的数据存入localStorage中进行增删改查
-    localStorage
     -    增 localStorage.setItem('name', 'jack')
             localStorage.setItem('person', JSON.stringify(obj))
     -    删 localStorage.removeItem('name')
     -    改 localStorage.setItem('name', 'jack2')
     -    查 localStorage.getItem('name')
             JSON.parse(localStorage.getItem('person'))
-    配置局部过滤器，filters, 将出生日期过滤成生日
-    引入nanoid， 为新增用户匹配随机id值
-    在新增按钮点击事件函数执行中使用 $nextTick，保证 form的dom 已经渲染成功后，再 对表单进行reset重置
-    实现分页: 假分页（真分页需要多次调用接口拿到部分后台数据，本项目为user模块准备localStorage存储方式，以联系localStorage使用，所以没用使用真分页）
-    实现当本页最后一条被删除后，table显示当前最后一页内的数据
-    实现右上角搜索框,使用lodash包防抖
     -    npm i lodash
     -    onSearch: _.debounce(function (e)  {
                console.log(e);
          }, 500)

## 4. 权限管理
### (1). 登录界面
-    安装cookie ： npm i js-cookie@3.0.1
-    点击登陆后通过Mock随机生成token存入cookie中，之后页面跳转中通过token判断用户是否为登陆状态
-    配置全局路由守卫进行权限管理
### (2). 退出登录
-    右上角退出登录，删除cookie中的token和路由信息menu，跳回登录界面路由
### (3). 动态路由，菜单权限(不同账号显示不同路由菜单)
-    通过login接口获取当前账号路由数据，使用vuex将数据传入CommonAside组件中以进行展示。

