<template>
<el-row class="login-bg">
    <el-col :span="12">
        <div class="grid-content">
            <div class="logo">
                <img src="../assets/login-logo.png">
                <p>国家电网微信系统管理中心</p>
            </div>
        </div>
    </el-col>
    <el-col :span="12">
        <div class="grid-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
                <el-form-item prop="account">
                    <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-form-item style="width:100%;margin-top:20px">
                   <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
                   <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </el-col>
</el-row>
</template>

<script>
import utils from '@/utils/utils'
import http from '@/utils/http'
import api from '@/api/api'
import NProgress from 'nprogress'
import MenuUtils from '@/utils/MenuUtils'
var routers = []
  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
           account: 'admin',
           checkPass: '123456'
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset() {//重置
        this.$refs.ruleForm.resetFields();
      },
      login(data){
        window.sessionStorage.setItem('user',JSON.stringify(data))
      },
      handleSubmit(ev) {
        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log('account',this.ruleForm.account);
            this.logining = true;
            NProgress.start();
            
            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
            api.post1('/api/login',loginParams)
              .then(function (res) {
                console.log('res1',res);
                /*if(res.data.errcode=='0'){
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.$http.get('/api/open/menu/groups').then(res => {
                      console.log(res);
                      this.login(data);
                      this.$router.addRoutes(routers)
                      this.$router.push({ path: '/main' });
                     // this.pickData(res.data);
                  }).catch(err => {
                    console.log(err)
                  })
                  this.$router.push({ path: '/' });

                }else{
                  console.log(res.data.errmsg);
                };*/
              })
              .catch(function (error) {
               console.log(error);
            });
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style  scoped>
    .login-bg{
        background: url('../assets/login-bg.png') no-repeat top center;
        width:100%;
        height: 100%;
        overflow: hidden;
    }
    .logo {
        width: 414px;
        height: 120px;
        position: absolute;
        left: 60px;
        top: 80px;
        p {
            font-size: 30px;
            text-align: center;
            margin-top: 20px;
        }
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
          margin: 0px auto 40px auto;
          text-align: center;
          color: #505458;
        }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>