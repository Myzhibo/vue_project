<template>
    <div>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> //beige-->
        <el-menu default-active="1-4-1" 
            class="el-menu-vertical-demo"
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse"      
            background-color="rgb(12,51,87)"         
            text-color="white"
            active-text-color="cornflowerblue"
        >                                         
            <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
            <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
                    <el-menu-item :index="subItem.name" @click="clickMenu(subItem)"> {{ subItem.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>
  

  
<script>
    export default {
        name: 'CommonAside',
        data() {
            return {
                menuData: [
                    {
                        path: '/',
                        name: 'home',
                        label: '首页',
                        icon: 's-home',
                        url: 'Home/Home'
                    },
                    {
                        path: '/mall',
                        name: 'mall',
                        label: '商品管理',
                        icon: 'shopping-bag-1', //'video-play',
                        url: 'MallManage/MallManage'
                    },
                    {
                        path: '/user',
                        name: 'user',
                        label: '用户管理',
                        icon: 'user',
                        url: 'UserManage/UserManage'
                    },
                    {
                        label: '其他',
                        icon: 'location',
                        children: [
                            {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 'setting',
                            url: 'Other/PageOne'
                            },
                            {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 'setting',
                            url: 'Other/PageTwo'
                            }
                        ]
                    },
                ]
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item){         //切换路由
                // console.log(item);
                // console.log(this.$route)  //当前页面路由
                // console.log(this.$router)  //全局路由器
                if(this.$route.path !== item.path &&  !(this.$route.path==='/home'&&item.path==='/')){     //避免vigationDuplicated
                    this.$router.push({
                        path: item.path         /*  /xxx  */
                    })
                }
                //面包屑功能
                this.$store.commit('tab/selectMenu',item)

            },
        },
        computed: {
            //没有子菜单
            noChildren(){
                return this.menuData.filter(item => !item.children )
            },
            //有子菜单
            hasChildren(){
                return this.menuData.filter(item => item.children )
            },
            //通过计算属性，使用vuex的state数据
            isCollapse(){        //  :collapse="isCollapse"   控制展开、收起
                return this.$store.state.tab.isCollapse
            }   

        }
    }
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu{
        border-right: none;
        height: 100vh;   /* 占满页面 */
        h3 {
            color: white;
            text-align: center;
            line-height: 48px;
            // font-size: 16px;
            // font-weight: 400;
        }
    }
</style>