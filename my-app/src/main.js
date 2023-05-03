import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui'              //引入ElementUI 组件库
import 'element-ui/lib/theme-chalk/index.css'   //引入ElementUI css库
Vue.use(ElementUI)                                //使用ElementUi插件

import VueRouter from 'vue-router'              //引入路由组件库
import router from './router/index'             //引入路由配置index
Vue.use(VueRouter)                                //使用VueRouter插件

import store from './store'                     //引入vuex配置index

import Cookies from 'js-cookie'
//配置导航守卫
//全局前置
router.beforeEach((to, from, next) => {
  //判断token是否存在
  const token = Cookies.get('token')
  if( to.name!=='login' && !token ){      //未登录，跳转至登录页
      next({name:'login'})
  }else if( to.name==='login' && token){  //登陆中，跳转首页
      next({name:'home'})
} else{
      next()
  }
})

new Vue({
  render: h => h(App),
  router,                                       //挂载路由
  store                                         //挂载vuex
}).$mount('#app')