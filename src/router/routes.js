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


//所有权限通用路由表
export const constantRouterMap =[
    {
        path: '/login',
        component: Login,
        name: 'login',
    }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {
        path: '',
        component: Vhome,
        name: '活动管理',
        meta: { role: ['admin','super_editor'] }, //页面需要的权限
        children: [
            { 
                path: '/activity',
                component: Activity, 
                name: '活动管理',
                meta: { role: ['admin','super_editor'] }
            },
            {    
                path: '/help',
                component: Help, 
                name: '使用帮助' ,
                meta: { role: ['admin','super_editor'] }
            }
        ]
    },
    {
        path: '',
        component: Vhome,
        name: '数据导出',
        meta: { role: ['admin','super_editor'] }
        children: [
            { 
                path: '/template',
                component: Template,
                name: '模板' ,
                meta: { role: ['admin','super_editor'] }
            }
        ]
    }
];
