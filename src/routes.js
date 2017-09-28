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
        name: 'login',
        hidden: true//定义这个路径，并隐藏
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
        name: '',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-message',
        children: [
            { path: '/intro', component: Intro, name: '自述' }
        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '查询统计',
        iconCls: 'el-icon-message',
        children: [
            { path: '/page', component: Page, name: '页面访问' ,iconCls: 'el-icon-message',},
            { path: '/interface', component: Interface, name: '接口访问',iconCls: 'el-icon-message',},
            { path: '/errorlog', component: Errorlog, name: '错误日志',iconCls: 'el-icon-message', }
        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {   path: '/', 
                component: Vhome,
                name: '系统设置' ,
                children:[{
                    path: '/parameter', 
                    component: Parameter, 
                    name: '参数设置',
                    hidden:true,//隐藏
                },{
                    path: '/activityset', 
                    component: Activityset, 
                    name: '活动设置',
                    path: '/push', 
                    component: Push, 
                    name: '推送设置'
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
            }
        ]
    },
    {
        path: '/',
        component:Vhome,
        name: '用户管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/wechat', component: Wechat, name: '微信账号',leaf: true,iconCls: 'el-icon-message' },
            { path: '/account', component: Account, name: '户号管理' ,leaf: true,iconCls: 'el-icon-message'}

        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '数据导出',
        iconCls: 'el-icon-message',
        children: [
            { path: '/template', component: Template, name: '模板维护',leaf: true, },
            { path: '/weekly', component: Weekly, name: '周报' ,leaf: true,},
            { path: '/monthly', component: Monthly, name: '月报' ,leaf: true,}

        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '业务管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/pay', component: Pay, name: '缴费记录',leaf: true},
            { path: '/recharge', component: Recharge, name: '充值记录' ,leaf: true},
            { path: '/feedback', component: FeedBack, name: '意见反馈' ,leaf: true},
            { path: '/runone', component: RunOne, name: '只跑一次' ,leaf: true}

        ]
    },
    {
        path: '/',
        component: Vhome,
        name: '运营管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/help', component: Help, name: '使用帮助',leaf: true},
            { path: '/activity', component: Activity, name: '活动管理' ,leaf: true},
            { path: '/headline', component: HeadLine, name: '电力头条' ,leaf: true}

        ]
    }
];

export default routes;