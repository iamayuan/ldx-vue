export default {
  //系统管理模块
  

  getDymMenu:`/open/menu/groups`,

  getMenuList:`/sys/menu/groups`,  //获取全部菜单组
  modifyMenu :`/sys/menu/group/update`,//更新菜单组
  createMenu :`/sys/menu/group/create`,//新增菜单组
  deleteMenu :`/sys/menu/group/delete`,//删除菜单组
  getmenupool :`/sys/menupool/all`,//获取菜单池
  createMenuPool:`/sys/menupool/create`,//新增菜单池中的菜单
  modifyMenuPool:`/sys/menupool/update`,//更新菜单池中的菜单
  deleteMenuPool:`/sys/menupool/delete`,//删除菜单池中的菜单
  getPromoters:`/sys/promoters`,//电小二

  //数据导出模块
  initTemplate:`/data/excel/options` , //获取导出模板的数据
  exportTemplate:`data/excel/export`,  //导出excel
 


  //用户管理模块-
  getWechat:`/customer/users`,//微信账号
  getAccount:`/customer/accounts`,//户号管理
  
  //业务管理
  Pays:`/bs/pays`,//查询缴费记录列表接口
  Recharge:`/bs/recharges`,//查询充值记录
  Feedbacks:`/bs/feedBacks`,//意见反馈
  Runone:`/bs/suggest`,//只跑一次

  //查询统计模块
  getFunctionList:`/stat/view/names`,//获取功能列表接口
  getFunctionCount:`/stat/view/content`,//根据时间\页面查询数据接口
  getInterfaceList:`/stat/api/names`,//获取接口列表接口
  getInterfaceCount:`/stat/api/content`,//根据时间\页面查询数据接口
  getExceptionCount:`/stat/apiexception/content`,//根据时间\页面查询数据接
  //运营管理模块
  Activities:`/operations/activities`, //活动管理
  Regions:`/operations/activity/regions`,  //获取活动区域
  Category:`/operations/guide/category`,//查询使用指南分类
  guideQuery:`/operations/guide`,//使用帮助
  getHeadlines:`/operations/article`,//电力头条
  getHeadlinesType:`/operations/article/type`,
  getHeadlinesTag:`/operations/article/tag`,
  Networks:`/operations/salesNetworks`,//营业网点列表

 










  requestLogin:`/login`, //登录接口


  GetPerson:`/employee/list`,
  PersonDetail:`/employee/byId`,
  PersonAdd:`/employee/add`,
  PersonEdit:`/employee/edit`,
  PersonDel:`/employee/del`
}






