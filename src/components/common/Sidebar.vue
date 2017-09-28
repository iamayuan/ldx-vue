<template>
    <div class="sidebar">
        <aside >
          <!--导航菜单-->
          <el-menu :default-active="$route.path"   
             unique-opened router >
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf&&!item.hidden">
                <template slot="title"><i :class="item.iconCls" v-if='item.iconCls' ></i>{{item.name}}</template>
                <template v-for="(item,index) in item.children" v-if="!item.hidden">
                    <router-link v-if="item.iconCls" :to="item.path">
                      <el-menu-item :index="index+''" >
                        <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                   
                      </el-menu-item>
                    </router-link>
                    
                      <el-submenu :index="index+''" v-else >
                         <template slot="title"><i :class="item.iconCls" v-if='item.iconCls'></i>{{item.name}}111222</template>
                         <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"><router-link  :to="child.path">{{child.name}}</router-link></el-menu-item>
                      </el-submenu>
                    
                 
                   
                </template>
                
                
              </el-submenu>
              

              <router-link v-if="!item.hidden&&item.leaf&&item.children.length>=0" :to="item.path+item.children[0].path">
                <el-menu-item v-if="item.leaf&&item.children.length>=0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.path}}{{item.children[0].name}}ss</el-menu-item>
              </router-link>
            </template>
          </el-menu>
        </aside>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        computed:{
            onRoutes(){
              console.log(this.$route.path.replace('/',''));
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

