import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(VueRouter)



const router  = new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.path == '/login'){
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(!user && to.path != '/login'){
        next({path:'/login'})
    }else{
        next();
    }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
/*new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  //components: { App }
  render: h => h(App)
}).$mount('#app')*/
