//1. 创建整个应用的路由器
import VueRouter from 'vue-router'

//2. 引入路由组件
import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'

import Login from '../views/Login'
import Cookies from 'js-cookie'

//3. 创建并暴露一个路由器
export default new VueRouter({
// const router =  new VueRouter({
    routes: [
        { 
            path:'/', component: Main, redirect:'/home',        /* redirect 重定向。  当path为/时 ， 跳转到home */
            children: [
                { path:'/home',name:'home', component: Home },      //首页
                { path:'/user',name:'user', component: User },      //用户
                { path:'/mall',name:'mall', component: Mall },      //商品
                { path:'/page1',name:'page1', component: PageOne },      //页面1
                { path:'/page2',name:'page2', component: PageTwo },      //页面2
            ]
        },
        {   
            path:'/login',name:'login', component: Login       //登陆
        }
        
    ]
})


