<template>
    <div >
        <el-alert v-if="NoServer" title="未连接服务器" type="error" show-icon/>

        <el-row>
            <!--左侧-->
            <el-col :span="8" style="padding-right: 10px;">
                <!-- user -->
                <el-card class="box-card">
                    <div class="user">
                        <img src="../assets/imgggg.jpg" alt="user">
                        <div class="user-info">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登陆的时间: <span>2023-01-01</span></p>
                        <p>上次登陆的地点: <span>大连</span></p>
                    </div>
                    
                </el-card>
                <!-- table -->
                <el-card style="margin-top: 20px;height: 480px;">
                    <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                        <el-table-column v-for="(val,key) in tableLabel" :key="key"
                            :prop="key"
                            :label="val"
                            >
                        </el-table-column>
                        <!-- <el-table-column 
                            prop="name"
                            label="语言"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="todayUse"
                            label="今日热度"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="monthUse"
                            label="本月热度">
                        </el-table-column>
                        <el-table-column
                            prop="totalUse"
                            label="总热度">
                        </el-table-column> -->
                    </el-table>
                </el-card>
            </el-col>

            <!--右侧-->
            <el-col :span="16" style="padding-left: 10px;">
                <!-- num -->
                <div  class="num">
                    <el-card  v-for="item in countData" :key="item.name" :body-style="{ display:'flex' , padding: 0}">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                        <div class="detail">
                            <p class="price">￥{{ item.value }}</p>
                            <p class="desc">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <!-- 折线图 -->
                <el-card style="height: 280px;">
                    
                </el-card>
                <div class="graph">
                <!-- 柱状图 -->
                    <el-card></el-card>
                    <el-card></el-card>
                <!-- 饼图 -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Home',
        data(){
            return {
                NoServer: false,
                tableData:[],
                tableLabel:{
                    name: '商品',
                    todayUse: '今日销量',
                    monthUse: '本月销量',
                    totalUse: '总销量'
                },
                countData:[]
            }
        },
        mounted() {
            axios.get('http://localhost:8081/api/tableData').then(  //这个端口号(8081)取决于web运行在哪个端口下
                    response => {
                        console.log('tableData-success! ', response.data);
                        this.tableData = response.data
                    },
                    error => {console.log('请求失败！', error.message);
                                this.NoServer = true }
            ),
            axios.get('api/countData').then(                        //可以不写端口号
                    response => {
                        console.log('countData-success! ', response.data);
                        this.countData = response.data
                    },error => {console.log('请求失败！', error.message);}
            )
        },
    }
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
.user-info {
    .name{
        font-size: 32px;
        margin-bottom: 10px;
    }
    .access {
        color: #999999;
    }
}
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span {
            margin-left: 60px;
            color: #666666;
        }
    }
}

.num {
    display: flex;
    flex-wrap : wrap;       //换行
    justify-content: space-between;
    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 48%;
        height: 280px;
    }
}
</style>