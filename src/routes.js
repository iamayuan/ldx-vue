import Home from './views/Home.vue'
import NotFound from './views/404.vue'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import Electrical from './views/SystemManage/Electrical.vue'
import Personnel from './views/SystemManage/Personnel.vue'
import Menu from './views/SystemManage/Menu.vue'
import Activity from './views/SystemManage/Activity.vue'
import Parameter from './views/SystemManage/Parameter.vue'
import Push from './views/SystemManage/Push.vue'
import Errorlog from './views/QueryStatic/ErrorLog.vue'
import Interface from './views/QueryStatic/Interface.vue'
import Page from './views/QueryStatic/Page.vue'
import Account from './views/UserManage/Account.vue'
import Wechat from './views/UserManage/Wechat.vue'
import Template from './views/ExportData/Template.vue'
import Weekly from './views/ExportData/Weekly.vue'
import Vhome from './views/vHome.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/vhome',
        component: Vhome,
        name: '404',
        hidden: true
    },

    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {   path: '/home', 
                component: Home,
                name: '系统设置' ,
                children:[{
                    path: '/parameter', 
                    component: Parameter, 
                    name: '参数设置',
                },{
                    path: '/activity', 
                    component: Activity, 
                    name: '活动设置',
                },{
                    path: '/push', 
                    component: Push, 
                    name: '推送设置',
                }]
            },
            {
                path: '/electrical', 
                component: Electrical,
                leaf: true,//只有一个节点，下面没有了
                name: '电小二管理' 
            },
            {   path: '/personnel',
                component:Personnel,
                leaf: true,
                name: '人员管理'
            },
            {   path: '/menu',
                component: Menu, 
                leaf: true,
                name: '菜单管理'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '查询统计',
        iconCls: 'el-icon-message',
        children: [
            { path: '/page', component: Page, name: '页面访问',leaf: true },
            { path: '/interface', component: Interface, name: '接口访问',leaf: true},
            { path: '/errorlog', component: Errorlog, name: '错误日志',leaf: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/wechat', component: Wechat, name: '微信账号',leaf: true, },
            { path: '/account', component: Account, name: '户号管理' ,leaf: true,}

        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据导出',
        iconCls: 'el-icon-message',
        children: [
            { path: '/template', component: Template, name: '模板维护',leaf: true, },
            { path: '/weekly', component: Weekly, name: '周报' ,leaf: true,}

        ]
    },
/*    {
        path: '/',
        component: Home,
        name: '单个管理',
        iconCls: 'el-icon-message',
        leaf: true,//只有一个节点
        children: [
            { path: '/account', component: Account, name: '微信账号',leaf: true, }

        ]
    },*/
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;