//1. 创建整个应用的路由器
import VueRouter from 'vue-router'

//2. 引入路由组件
import Home from '../views/Home'
import User from '../views/User'

//3. 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {path:'/home', component: Home},
        {path:'/user', component: User}
    ]
})