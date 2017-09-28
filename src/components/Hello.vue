<template>
  <div class="list" >
  <p>hello</p>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      
    }
  },
    mounted(){ 
        //this.fetchData();
        this.loadMore(); 
    },
    methods:{
      fetchData:function(){
        let url = 'https://bird.ioliu.cn/v1/?url=https://api.douban.com/v2/movie/in_theaters?count=10&start=0';
          this.$http.get(url,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              }
          }).then((response) => {
            // success
            console.log(response)
          }, (error) => {
            // error
            console.log('error'+error)
          });
      },loadMore: function() {
        axios.get(API_PROXY+'https://api.douban.com/v2/book/user/alex1504/collections')
        .then(function(res) {
          console.log('success'+res);
          var res1 =JSON.stringify(res);
          console.log(res1+'11112')
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }
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
