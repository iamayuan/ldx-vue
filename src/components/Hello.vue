<template>
  <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
    mounted(){ 
        More(); 
    },
    methods:{

    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-ul{
  background-color: #fff;
}
.loading{
  width: 100%;
  height:100%;
  position: absolute;
  top: 35%;
  left: 22%;
  z-index:1;
}
.list-li{
  width: 100%;
  border-top: 1px solid #d8d8d8;
}
.list-box{
  padding: 15px 0;
  overflow: hidden;
  position: relative;
}
.list-text-container{
  height: 65px;
  margin-left: 115px;
}
.list-text-container h2{
  font-size: 15px;
  height: 44px;
  line-height: 22px;
  overflow: hidden;
  padding-bottom: 5px;
  color: #4a4a4a;
}
.list-title{
  font-size: 12px;
  color: #9b9b9b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-img{
  width: 86px;
  height: 65px;
  background: no-repeat center;
  background-size: cover;
  float: left;
  margin-left: 15px;
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
