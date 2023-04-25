<template>
    <div >
        <el-container>
        <el-aside width="200px">
            <common-aside />                    <!-- CommonAside 写进标签 common-aside-->
        </el-aside>         
        <el-container>
            <el-header>
                <common-header/>                <!-- CommonHeader 写进标签 common-header-->
            </el-header>
            <el-main>
                <router-view></router-view>                         <!-- 当前组件下的路由展示区 -->
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
    import CommonAside from '../components/CommonAside.vue';
    import CommonHeader from '../components/CommonHeader.vue';
    export default {
        name : 'Main',
        components: {
            CommonAside,CommonHeader
        }
    }
</script>

<style scoped>
    .el-header{
        padding: 0;
    }
</style>