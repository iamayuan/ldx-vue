<template>
  <header>
    <div class="logo">{{sysName}}</div>
    <div class="user-info">
        <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" />您好，{{sysUserName}}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>切换户号</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
        sysName:'浙江电力公众号后台管理系统',
        collapsed:false,
        sysUserName: '超级管理员',
        sysUserAvatar: ''
      }
  },
    methods: {
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });


      }
    },
    mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }

    }
}
</script>
<style scoped>
    header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px!important;
        font-size: 22px;
        line-height: 70px!important;
        color: #fff;
    }
    header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .content {
        background: none repeat scroll 0 0 #ff0000;
        height:100px;
        position: absolute;
        left: 250px;
        right: 0;
        top: 70px;
        bottom: 0;
        width: auto;
        padding: 40px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
</style>
