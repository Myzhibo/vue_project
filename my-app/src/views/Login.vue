<template>
  <div>
    <el-form class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">系统登陆</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登陆</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import  Mock from 'mockjs';
    import  Cookie from 'js-cookie';
    import axios from 'axios';

    export default {
        name : 'Login',
        data(){
          return {
              form:{
                username:'',
                password:''
              },
              rules:{
                username:[
                  {required:true , trigger:'blur', message:'请输入用户名'}
                ],
                password:[
                  {required:true , trigger:'blur', message:'请输入密码'}
                ],
              }
          }
        },
        methods:{
          //登录
          submit(){
              //token信息
              const token = Mock.Random.guid()
              //请求登录接口
              axios.post('api/login',{username : this.form.username,
                  password: this.form.password}).then(
                response=>{
                    console.log('login-success! ', response.data);
                    if(response.data){
                        this.$message({message:'登陆成功', type: 'success'})
                        //1. 将token信息存入cookie,通过token判断用户是否为登陆状态。将用户名信息存入localStorage
                        Cookie.set('token',token)
                        localStorage.setItem('info', JSON.stringify({username : this.form.username}))
                        //2. 动态获取路由(不同账号，可看见的路由权限不同)
                        this.$store.commit('tab/setMenu',response.data) //设置CommonAside组件的menuData值

                        //3. 跳转到首页
                        this.$router.push('/home')

                    }else{
                        this.$message.error('账户名或密码错误')
                    }
                },
                error=>{
                  console.log('请求失败!', error.message)
                }
              )

          }
        }
    }
</script>

<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    text-align: center;
   .login_title{
      margin-bottom: 10px;
      color: #505458;
    }
}
</style>