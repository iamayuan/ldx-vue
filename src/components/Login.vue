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
        menuList:[],
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
            this.logining = true;
            NProgress.start();
            //根据登录的账号获取菜单
            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };

            const res = http.post1('/login', loginParams).then(res => {
                console.log('登录成功',res)
                 
                 if(res.errcode=='0'){
                   this.logining = false;
                   this.$http.get('/api/open/menu/groups').then(res => {
                       this.logining = false;
                       NProgress.done();
                       console.log(res);
                       this.pickData(res.data);
                   }).catch(err => {
                     console.log(err,)
                   })

                 }else{
                   console.log(res.data.errmsg,);
                 };

            })

            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      pickData(data){
        for(let item in data){
            if(data[item].groupCode=="-99") {
              data.splice(item, 1);
            }
            data[item].path='/menu'+item;
            data[item].component='Home';
            data[item].name=data[item].groupName;
            data[item].iconCls='el-icon-message';
            if(data[item].children.length>0){
                data[item].leaf=false
                let dataMenu =data[item].children;
                for(let item1 in dataMenu){
                    dataMenu[item1].path=dataMenu[item1].uri;
                    dataMenu[item1].component='Main';
                    if(dataMenu[item1].children.length>0){
                        dataMenu[item1].leaf=false;
                        let dataMenuc =dataMenu[item1].children;
                        for(let item2 in dataMenuc){
                          dataMenuc[item2].path=dataMenuc[item2].uri;
                          dataMenuc[item2].component='Main';
                          if(dataMenuc[item2].children.length>0){
                              dataMenuc[item2].leaf=false;
                          }else{
                              dataMenuc[item2].leaf=true;
                          }
                        }
                        
                    }else{
                        dataMenu[item1].leaf=true;
                    }
                    
                }
            }else{
                data[item].leaf=true;
            }
            

        }
        console.log('最后2',data);
        this.login(data);

        this.$router.addRoutes(routers)
        this.$router.push({ path: '/main' });
        
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