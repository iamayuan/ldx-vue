<template>
<aside>
  <!--导航菜单-->
  <el-menu :default-active="$route.path"  @open="handleopen" @close="handleclose" @select="handleselect"
     unique-opened router v-show="!collapsed">
    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
      <el-submenu :index="index+''" v-if="item.children.length>1">
        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
        <template v-for="(value,key) in item.children" >
          <el-menu-item v-if="value.leaf" :index="value.path"><i :class="value.iconCls"></i>
            {{value.name}}
          </el-menu-item>
          <el-submenu v-if="value.children">
            <template slot="title"></i>{{value.name}}</template>
            <template v-for="(val,keys) in value.children" >
              <el-menu-item :index="val.path"><i :class="val.iconCls"></i>
                {{val.name}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        

      </el-submenu>
      <!--只有一个节点-->
      <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
    </template>
  </el-menu>
  
</aside>
</template>

<script>
  export default {
    data() {
      return {
        sysName:'VUEADMIN',
        collapsed:false,
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
      },
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


      },
      //折叠导航栏
      collapse:function(){
        this.collapsed=!this.collapsed;
      },
      showMenu(i,status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>