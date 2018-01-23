import Home from './views/Home.vue'
import NotFound from './views/404.vue'
import Main from './views/Main.vue'
import Login from '@/views/Login.vue'
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
import Vhome from '@/views/vHome.vue'
import vContent from '@/components/common/Content.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Empoty from '@/components/common/Empoty.vue'
import Intro from '@/components/common/Intro.vue'
import main from '@/components/Hello.vue'
let routes = [
    {
        path: '/main',
        component: main,
        name: 'login'
    },

    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true//定义这个路径，并隐藏
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '',
        component: Vhome,
        name: '活动管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/activity', component: Activity, name: '活动管理',iconCls: 'el-icon-message', leaf: true,children:[] },
            { path: '/help', component: Help, name: '使用帮助' ,iconCls: 'el-icon-message', leaf: true,children:[] }
            ,
            { path: '/headline', component: HeadLine, name: '使用头条' ,iconCls: 'el-icon-message', leaf: true,children:[] }
        ]
    },
    {
        path: '',
        component: Vhome,
        name: '数据导出',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-message',
        children: [
            { path: '/template', component: Template, name: '模板' }
        ]
    },
    {
        path: '',
        component: Vhome,
        name: '用户管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/wechat', component: Wechat, name: '微信账户' ,iconCls: 'el-icon-message', leaf: true,children:[] },
            { path: '/account', component: Account, name: '户号管理',iconCls: 'el-icon-message', leaf: true,children:[] }
        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '业务管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/pay', component: Pay, name: '缴费记录' ,iconCls: 'el-icon-message', leaf: true,children:[] },
            { path: '/recharge', component: Recharge, name: '充值记录',iconCls: 'el-icon-message', leaf: true,children:[] },
            { path: '/feedback', component: FeedBack, name: '意见反馈',iconCls: 'el-icon-message', leaf: true,children:[] },

            { path: '/runone', component: RunOne, name: '只跑一次',iconCls: 'el-icon-message', leaf: true,children:[] }
        ]
    },{
        path: '/',
        component: Vhome,
        name: '查询统计',
        iconCls: 'el-icon-message',
        children: [
            { path: '/page', component: Page, name: '页面访问' ,iconCls: 'el-icon-message', leaf: true,children:[] },
            { path: '/interface', component: Interface, name: '接口访问',iconCls: 'el-icon-message', leaf: true,children:[] },
            { path: '/errorlog', component: Errorlog, name: '错误日志',iconCls: 'el-icon-message', leaf: true,children:[] }
        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {   path: '/', 
                component:  Parameter,
                name: '系统设置' ,
                iconCls: 'el-icon-message',
                children:[{
                    path: '/parameter', 
                    component: Parameter, 
                    name: '参数设置',
                    leaf: true
                },{
                    path: '/activityset', 
                    component: Activityset, 
                    name: '活动设置',
                    leaf: true
                },{
                    path: '/push', 
                    component: Push, 
                    name: '推送设置',
                    leaf: true
                }]
            },
            {
                path: '/electrical', 
                component: Electrical,
                leaf: true,//只有一个节点，下面没有了
                name: '电小二管理',
                iconCls: 'el-icon-message',
                children:[] 
            },
            {   path: '/personnel',
                component:Personnel,
                leaf: true,
                name: '人员管理',
                iconCls: 'el-icon-message',
                children:[] 
            },
            {   path: '/menu',
                component: Menu, 
                leaf: true,
                name: '菜单管理',
                iconCls: 'el-icon-message',
                children:[] 
            },{ path: '/recharge', component: Recharge, name: '充值记录' ,leaf: true,iconCls: 'el-icon-message',
                children:[] },
        ]
    }
];

export default routes;