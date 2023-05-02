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
                            label="商品"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="todayUse"
                            label="今日销量"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="monthUse"
                            label="本月销量">
                        </el-table-column>
                        <el-table-column
                            prop="totalUse"
                            label="总销量">
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
                    <div style="height: 280px;width: auto " ref="echarts1">   <!--ref: vue中获取DOM节点,类似原生Js中的id -->
                    </div>
                </el-card>
                <!-- 柱状图 --> <!-- 饼图 -->
                <div class="graph">
                    <el-card>
                        <div ref="echarts2" style="height: 260px;width: auto;"></div>
                    </el-card>
                    <el-card>
                        <div ref="echarts3" style="height: 260px;width: auto;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import * as echarts from 'echarts'
    
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
          //axios.get('http://localhost:8081/api/tableData').then(  //这个端口号(8081)取决于web运行在哪个端口下
            axios.get('api/tableData').then(                         //可以不写端口号
                    response => {
                        console.log('tableData-success! ', response.data);
                        this.tableData = response.data

                            // 初始化echarts2实例
                            const echarts3 = echarts.init(this.$refs.echarts3)
                            const mydata = []
                            this.tableData.forEach((item,index)=>{
                                let a ={value: item['todayUse'],
                                        name: item['name']}
                                mydata.push(a)
                            })
                            // console.log(mydata)
                            let echarts2_option = {
                                tooltip:{trigger:"item"},
                                series: [{
                                    type: 'pie',
                                    data: mydata,
                                    radius: '50%'
                                    }]
                            };
                            // 渲染echarts3
                            echarts3.setOption(echarts2_option);

                    
                    },
                    error => {console.log('请求失败！', error.message);
                                this.NoServer = true     //打开服务器未连接的提示
                    }
            )
            axios.get('api/countData').then(                        
                    response => {
                        console.log('countData-success! ', response.data);
                        this.countData = response.data
                    },error => {console.log('请求失败！', error.message);}
            )
            axios.get('api/lineData').then(  
                response => {
                    console.log('lineData-success! ', response.data);

                    // 初始化echarts实例
                    const echarts1 = echarts.init(this.$refs.echarts1)
                    // 指定图表配置项和数据
                        let echarts1_option = {}
                        echarts1_option.title = {text: '本年销量'}
                        echarts1_option.tooltip = {},
                        echarts1_option.xAxis = {data: ['春','夏','秋','冬']}
                        echarts1_option.legend = {}
                        echarts1_option.yAxis = {},
                        echarts1_option.series = []
                        let myLegend = []
                        response.data.forEach((item,index)=>{
                            // console.log(item)
                            let mySeries = {}
                            mySeries.name = item['name']
                            mySeries.type = 'line'
                            mySeries.data = [item['spring'],item['summer'],item['autumn'],item['winter']]
                            echarts1_option.series.push(mySeries)
                            
                            myLegend.push(item['name'])
                            echarts1_option.legend.data = myLegend
                        })
                    // 渲染echarts
                    echarts1.setOption(echarts1_option);
                },
                error => {console.log('请求失败！', error.message);
                            this.NoServer = true     //打开服务器未连接的提示
                }
            )
            axios.get('api/barData').then(                       
                    response => {
                        console.log('barData-success! ', response.data);
                    
                    // 初始化echarts2实例
                    const echarts2 = echarts.init(this.$refs.echarts2)
                    // 指定图表配置项和数据
                        const xAxis = []
                        response.data.forEach((item,index)=>{
                            xAxis.push(item['date'])
                        })
                        let echarts2_option = {}
                        let newUser_data = []
                        let activeUser_data = []

                        echarts2_option.xAxis = {data: xAxis}
                        echarts2_option.legend = {data: ['新用户','活跃用户']}
                        echarts2_option.yAxis = {}
                        echarts2_option.tooltip = {},
                        echarts2_option.series = [{
                            name: '新用户',
                            type: 'bar',
                            data: newUser_data
                            },
                            {
                            name: '活跃用户',
                            type: 'bar',
                            data: activeUser_data
                            }
                        ]
                        // series: [{
                        //     name: '销量',
                        //     type: 'bar',
                        //     data: [5, 20, 36, 10, 10, 20]
                        //     }]
                        response.data.forEach((item,index)=>{
                            let mySeries = {}
                            newUser_data.push(item['newUser'])
                            activeUser_data.push(item['activeUser'])
                            
                            echarts2_option.series.push(mySeries)

                        })
                    // 渲染echarts2
                    echarts2.setOption(echarts2_option);



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