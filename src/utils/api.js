export default {
  getMenuList:`/sys/menu/groups`,  //获取全部菜单组
  modifyMenu :`/sys/menu/group/update`,//更新菜单组
  createMenu :`/sys/menu/group/create`,//新增菜单组
  deleteMenu :`/sys/menu/group/delete`,//删除菜单组
  getmenupool :`/sys/menupool/all`,//获取菜单池
  createMenuPool:`/sys/menupool/create`,//新增菜单池中的菜单
  modifyMenuPool:`/sys/menupool/update`,//更新菜单池中的菜单
  deleteMenuPool:`/sys/menupool/delete`,//删除菜单池中的菜单
  initTemplate:`/data/excel/options` , //获取导出模板的数据
  exportTemplate:`data/excel/export`,  //导出excel
  getUserList:`/userManage/getUserList`,//查询微信用户列表
  getUserDetail:`/userManage/getUserDetail` ,//查看微信用户详情接口
  getAccountList:`/accountManage/getAccountInfoList`,//查询户号列表
  getAccountDetail:`/accountManage/getAccountInfoDetail` ,//查看户号详情接口
  getPaymentList:`/payment/getPaymentList`,//查询缴费记录列表接口
  getPaymentDetail:`/payment/getPaymentDetail`,//查询缴费记录详情接口
  getRechargeList:`/recharge/getRechargeList?`,//查询充值记录列表接口
  getRechargeDetail:`/recharge/getRechargeDetail`,//查询充值记录详情
  getFeedbackList:`/feedback/getFeedbackList`,//获取意见建议列表接口
  getFeedHandle:`/feedback/getHandle`,//处理意见
  getCloseFeedback:`/feedback/getCloseFeedback`,//关闭意见
  getFeedDetail:`/feedback/getDetail`,//意见详情
  getSuggestList:`/suggest/getSuggestList`,//获取只跑一次列表接口
  getSugHandle:`/suggest/getHandle`,//处理只跑一次
  getCloseSug:`/suggest/getCloseFeedback`,//关闭只跑一次
  getSuggestDetail:`/suggest/getDetail`,//只跑一次详情
  getActivityList:`/activity/list`,//活动列表
  deleteAct:`/activity/delete`,//删除活动
  stopAct:`/activity/stop`,  //停止活动
  startAct:`/activity/start`,//开始活动
  addAct:`/activity/add`,//新增活动
  queryWidget:`/activity/queryWidget`,//获取区域
  getFunctionList:`/count/getFunctionList`,//获取功能列表接口
  getFunctionCount:`/count/getFunctionCount`,//根据时间\页面查询数据接口
  getInterfaceList:`/count/getInterfaceList`,//获取接口列表接口
  getInterfaceCount:`/count/getInterfaceCount`,//根据时间\页面查询数据接口
  getExceptionCount:`/count/getExceptionCount`,//根据时间\页面查询数据接
  requestLogin:`/login`, //登录接口
  eleList:`/dianxiaoer/list`,//电小二
  eleDel:`/dianxiaoer/delete`,//电小二
  eleEdit:`/dianxiaoer/edit`,//新增、编辑电小二
  eleDetail:`/dianxiaoer/detail`,//电小二详情
  guideAll:`/guide/category/all`,
  guideQuery:`/guide/query`,
  guideDetail:`/guide/get`,
  guideEdit:`/guide/edit`,
  guideMod:`/guide/modifyState`,
  guideRemove:`/guide/remove`,
}






