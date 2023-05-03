<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMunu" icon="el-icon-menu" size="mii" style="margin-right: 20px;"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="text">首页</span>  -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="i in tabsList" :key="i.path" :to="{ path: i.path }">{{ i.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/imgggg.jpg" alt="user">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import  Cookie from 'js-cookie';

    export default {
        name: 'CommonHeader',
        data() {
            return {}
        },
        methods:{
            handleMunu(){
                // this.$store.commit('collapseMenu')  //未开启命名空间
                this.$store.commit('tab/collapseMenu')  //开启命名空间
            },
            handleClick(command){
                if(command === "logout"){
                    //清除cookie中的token、menu
                    Cookie.remove('token')
                    Cookie.remove('menu')
                    //跳回登录界面
                    this.$router.push('/login')
                }
            }
            
        },
        computed:{
            // ...mapState({
            //     tags: state => state.tab.tabsList
            // })
                  
            ...mapState('tab',['tabsList']),
            // ...mapState('personOption', ['personList']), 
        },
    }
</script>

<style lang="less" scoped>
    .header-container {
        padding-left: 20px;
        background-color: white; 
        box-shadow: 2px 2px 5px rgb(202, 201, 201);
        height: 60px;
        display: flex;                       /* 弹性布局 */
        justify-content: space-between;      /* 内容两端对齐 */   
        align-items: center;                 /* 垂直居中 */
        .text{
            // color: #fff;
            font-size: 14px;
            margin-left: 10px;
        }
        .r-content{
            .user {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .l-content{
            display: flex;
            align-items: center;
            /deep/.el-breadcrumb__item{
                .el-breadcrumb__inner{
                    font-weight: normal;
                    &.is-link{
                        color: #666;
                    }
                }
                &:last-child{
                    .el-breadcrumb__inner{
                        color: black;
                        font-weight: 600;
                    }
                }
            }
        }
    }
</style>