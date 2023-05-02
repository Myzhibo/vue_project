<template>
    <div class="manage">
        <!-- <button @click="test">测试post</button> -->
        <!-- dialog弹出框 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!-- dialog内容： 用户表单信息 -->
            <el-form ref="myform" :rules="rules" :inline="true" :model="form" label-width="80px">
                <!-- 输入框 -->
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <!-- 下拉框 -->
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 时间选择框 -->
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format = "yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            
            <!-- dialog底部 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增按钮、搜索框 -->
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd">+ 新增</el-button>
            <el-form :model="myInput" :inline="true">
                <el-form-item prop="name"> 
                    <el-input v-model="myInput.name" placeholder="请输入姓名" @input="onSearch"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item> -->
            </el-form>
        </div>
        <div class="common-table">
            <!-- 表格 -->
            <el-table
                stripe
                height = "92%"
                :data="showData"
                style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">   <!--自定义列-->
                        <span style="margin-left: 10px">{{ scope.row.sex === "1" ? '男' : '女'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄"> </el-table-column>
                <el-table-column prop="birth" label="出生日期"></el-table-column>
                <el-table-column prop="birth" label="生日">
                    <template slot-scope="scope">{{ scope.row.birth | mySlice}}</template>
                </el-table-column>
                <el-table-column prop="addr" label="地址"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">   <!--自定义列-->
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>  
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>   
                    </template>
                </el-table-column>
            </el-table>
            <!-- 页码 -->
            <el-pagination
                layout="prev, pager, next"
                :page-size="size"
                :total="total"
                @current-change="handlePage"
            >
            </el-pagination>
            总条数: {{ total }}
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {nanoid} from 'nanoid'
    // import {debounce,throttle} from 'lodash'

    export default {
        name: 'User',
        data() {
            return {
                dialogVisible: false,
                form:{
                    name: '',
                    age: '',
                    sex: '',
                    birth: '',
                    addr: ''
                },
                rules:{
                    name: [
                        { required: true, message: '请输入姓名' }
                    ],
                    age: [
                        { required: true, message: '请输入年龄' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别' }
                    ],
                    birth: [
                        { required: true, message: '请选择出生日期' }
                    ],
                    addr: [
                        { required: true, message: '请输入地址' }
                    ],
                },
                userData: [],
                showData: [],
                dialogType: 0 ,      //0新增新用户弹窗，  1编辑当前用户弹窗
                
                total: 0,    //当前数据总条数
                size :10,    //没页多少行
                firstIndex:0,
                lastIndex:0,

                myInput:{}
            }
        },
        filters:{
            mySlice(value){    
                return value.slice(value.indexOf('-')+1)
            },
        },
        methods: {
            //提交表单
            submit(){
                //判断用户是否通过校验
                this.$refs.myform.validate((valid)=>{  //el-form中 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
                        if(valid){  //通过校验
                            console.log(this.form);      //获取用户输入的表单数据
                            if(this.dialogType === 0){
                                //新增新用户
                                this.form.id = nanoid() 
                                console.log(this.form)
                                let current_data = JSON.parse(localStorage.getItem('userData_local'))
                                current_data.push(this.form)
                                localStorage.setItem('userData_local', JSON.stringify(current_data))

                                //新增后再次获取最新数据刷新列表
                                this.userData = JSON.parse(localStorage.getItem('userData_local'))
                                this.showData = this.userData.slice(this.firstIndex-1,this.lastIndex) //-1是因为数组从0开始。。last不-1是因为slice是[ )这样截取的

                                this.$message({
                                            type: 'success',
                                            message: '新增成功!'
                                });
                            }
                            else if(this.dialogType === 1){
                                //编辑当前  /**bug */
                                console.log(this.form);
                                console.log(this.form.id);
                                console.log(this.form.name);
                                console.log(this.form.addr);
                                /**bug */
                               
                            }

                            this.$refs.myform.resetFields()       //el-form清空表单
                            this.dialogVisible = false          //关闭弹窗
                        }
                        // else{

                        // }
                })
                //重新获取总条数
                this.total = this.userData.length || 0
            },
            //弹窗关闭时触发
            handleClose(){
                this.$refs.myform.resetFields()       //el-form清空表单
                this.dialogVisible = false          //关闭弹窗
            },
            //弹窗关闭时触发
            cancel(){
                this.handleClose()
            },
            //新增
            handleAdd(){
                console.log('点击新增')
                this.dialogType = 0
                this.dialogVisible = true
                this.$nextTick(()=>{
                    this.$refs.myform.resetFields()       //el-form清空表单
                })
            },
            //编辑
            handleEdit(row){
                console.log('点击编辑')
                this.dialogType = 1
                this.dialogVisible = true
                //需要对当前行数据进行深拷贝，否则会出错
                this.form = JSON.parse(JSON.stringify(row)) 
            },
            //删除
            handleDelete(row){
                this.$confirm('是否删除该条记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        //点击确定后删除该条数据
                        // console.log(row.id)
                        let current_data = JSON.parse(localStorage.getItem('userData_local'))
                        // console.log(current_data)
                        let last_data = current_data.filter((item,index)=>{
                                return item.id != row.id
                        })
                        // console.log(last_data)
                        localStorage.removeItem('userData_local')
                        localStorage.setItem('userData_local', JSON.stringify(last_data))
                        //删除后再次获取最新数据刷新列表
                        this.userData = JSON.parse(localStorage.getItem('userData_local'))
                        this.showData = this.userData.slice(this.firstIndex-1,this.lastIndex) //-1是因为数组从0开始。。last不-1是因为slice是[ )这样截取的
                        //如果把本页最后一条删了，则table显示当前最后一页
                        if(this.showData = []){
                            this.showData = this.userData.slice(this.firstIndex-11,this.lastIndex-10)
                        }
                        //重新获取总条数
                        this.total = this.userData.length || 0

                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                });
            },
            /* //测试post
            test(){
                axios.post('api/test1',{
                        name: 'John Doe',
                        age: 30
                    }).then(
                        response => {
                            console.log('test1-success! ', response.data);
                        },
                        error => {console.log('请求失败！', error.message);}
                )
            },
             */
            //选择页码
            handlePage(val){
                // console.log(val)    //获取当前点击的页码
                // console.log(val * this.size -9)    //被点击的页码的 第一行
                this.firstIndex = val * this.size -9
                // console.log(val * this.size)       //被点击的页码的 最后一行
                this.lastIndex = val * this.size
                
                // console.log(this.userData[firstIndex-1])  
                // console.log(this.userData[lastIndex])
                this.showData = this.userData.slice(this.firstIndex-1,this.lastIndex) //-1是因为数组从0开始。。last不-1是因为slice是[ )这样截取的
                console.log(this.showData)
            },
            //列表查询+ lodash包防抖
            onSearch: _.debounce(function (e)  {
                console.log(e);
                this.showData = this.userData.filter((item,index)=>{
                    return item.name.includes(e)
                })
            }, 500)
              

        },
        mounted(){
            //查看localStorage中是否已经存入userData(是否是本浏览器第一次登陆)
            if(localStorage.getItem('userData_local')){
                console.log('userData-success from localStorage! ');
                this.userData = JSON.parse(localStorage.getItem('userData_local'))
                this.showData = this.userData.slice(0,10)
                //获取总条数
                this.total = this.userData.length || 0
                console.log(this.total)
            }else{
                //第一次登陆，从接口获取数据
                axios.get('api/userData').then(
                        response => {
                            console.log('userData-success! ', response.data);
                            this.userData = response.data

                            window.localStorage.setItem('userData_local', JSON.stringify(response.data))
                            
                            this.showData = this.userData.slice(0,10)
                            //获取总条数
                            this.total = this.userData.length || 0
                            console.log(this.total)
                        },
                        error => {console.log('请求失败！', error.message);}
                )
            }
        }

    }
</script>

<style lang="less" scoped>
.manage {
    height: 90%;
    .common-table {
        position: relative;
        height: calc(100%-62px);
        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
            
    }
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.el-pagination .btn-prev, .el-pagination .btn-next {
    background-color: rgb(243,243,243);
}
.el-pager .number{
    background-color: rgb(243,243,243);
}

</style>