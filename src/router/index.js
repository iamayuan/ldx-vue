import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'
import Electrical from '@/views/SystemManage/Electrical.vue'
import Personnel from '@/views/SystemManage/Personnel.vue'
import Menu from '@/views/SystemManage/Menu.vue'
import Activityset from '@/views/SystemManage/Activity.vue'
import Parameter from '@/views/SystemManage/Parameter.vue'
import Push from '@/views/SystemManage/Push.vue'
import Errorlog from '@/views/QueryStatic/ErrorLog.vue'
import Interface from '@/views/QueryStatic/Interface.vue'
import Page from '@/views/QueryStatic/Page.vue'
import Account from '@/views/UserManage/Account.vue'
import Wechat from '@/views/UserManage/Wechat.vue'
import Template from '@/views/ExportData/Template.vue'
import Weekly from '@/views/ExportData/Weekly.vue'
import Monthly from '@/views/ExportData/Monthly.vue'
import FeedBack from '@/views/Business/FeedBack.vue'
import Pay from '@/views/Business/Pay.vue'
import Recharge from '@/views/Business/Recharge.vue'
import RunOne from '@/views/Business/RunOne.vue'
import Help from '@/views/Operation/Help.vue'
import Activity from '@/views/Operation/Activity.vue'
import HeadLine from '@/views/Operation/HeadLine.vue'
import Networks from '@/views/Operation/Networks.vue'
import Vhome from '@/views/vHome.vue'
import vContent from '@/components/common/Content.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Empoty from '@/components/common/Empoty.vue'
import Intro from '@/components/common/Intro.vue'
import main from '@/components/Hello.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login',
      leaf:true,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      leaf:true,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '主页',
      leaf:false,
      hidden:true,
      children: [
        { path: 'main', component: Main , name: '简述',leaf:true,hidden:true,}
      ]
    },
    {
        path: '/',
        component: Home,
        name: '数据导出',
        leaf:false,
        hidden:true,
        children: [
        { path: 'template', component: Template , name: '模板',leaf:true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '查询统计',
        leaf:false,
        hidden:true,
        children: [
        { path: 'page', component: Page , name: '页面访问',leaf:true},
        { path: 'interface', component: Interface , name: '接口访问',leaf:true},{ path: 'errorlog', component: Errorlog , name: '错误日志',leaf:true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '运营管理',
        leaf:false,
        hidden:true,
        children: [
        { path: 'activity', component: Activity , name: '活动管理',leaf:true},
        { path: 'help', component: Help, name: '使用帮助',leaf:true},{ path: 'headline', component: HeadLine , name: '电力头条',leaf:true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '业务管理',
        leaf:false,
        hidden:true,
        children: [
        { path: 'pay', component: Pay , name: '缴费记录',leaf:true},
        { path: 'recharge', component: Recharge , name: '充值记录',leaf:true},{ path: 'feedback', component: FeedBack , name: '意见反馈',leaf:true},{ path: 'runone', component: RunOne , name: '只跑一次',leaf:true},{ path: 'networks', component: Networks , name: '营业网点',leaf:true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        leaf:false,
        hidden:true,
        children: [
        { path: 'wechat', component: Wechat , name: '微信账户',leaf:true},
        { path: 'account', component: Account , name: '户号管理',leaf:true}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        hidden:true,
        children: [
            {   path: 'Parameterone', 
                name: '系统设置' ,
                children:[{
                    path: 'parameter', 
                    component: Parameter, 
                    name: '参数设置',
                    leaf: true
                },{
                    path: 'activityset', 
                    component: Activityset, 
                    name: '活动设置',
                    leaf: true
                },{
                    path: 'push', 
                    component: Push, 
                    name: '推送设置',
                    leaf: true
                }]
            },
            {
                path: 'electrical', 
                component: Electrical,
                leaf: true,//只有一个节点，下面没有了
                name: '电小二管理'
            },
            {   path: 'personnelone',
                leaf: true,
                name: '人员管理',
                children: [
                { path: 'userInfo', component: Personnel , name: '信息维护',leaf:true},
                { path: 'permission', component: Personnel , name: '权限维护',leaf:true}
                ]
            },
            {   path: '/menu',
                component: Menu, 
                leaf: true,
                name: '菜单管理',
                iconCls: 'el-icon-message',
                children:[] 
            },
            {   path: '/personnel',
                component: Personnel,
                leaf: true,
                name: '人员管理',
                iconCls: 'el-icon-message',
                children:[]
            },
        ]
    }
  ]
})