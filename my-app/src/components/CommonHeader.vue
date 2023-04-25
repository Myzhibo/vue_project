<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="mii"></el-button>
            <!-- 面包屑 -->
            <span class="text">首页</span> 
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/imgggg.jpg" alt="user">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CommonHeader'
    }
</script>

<style lang="less" scoped>
    .header-container {
        padding-left: 20px;
        background-color: white; 
        box-shadow: 2px 2px 5px rgb(202, 201, 201);
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    }
</style>