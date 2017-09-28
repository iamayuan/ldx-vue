/*import axios from 'axios';

let host = '';

export const requestLogin = params => { return axios.post(`${host}/login`, params).then(res => res.data); };

export const getMenuList = params => { return axios.get(`${host}/sys/menu/groups`, { params: params }); };

export const editMenu = params => { return axios.post(`${host}/sys/menu/group/update`, { params: params }); };

export const createMenu = params => { return axios.post(`${host}/sys/menu/group/create`, { params: params }); };

export const deleteMenu = params => { return axios.post(`${host}/sys/menu/group/delete`, { params: params }); };*/
import axios from 'axios';


let base = '';
//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
//获取菜单组列表
export const getMenuList = params => { return axios.get(`${base}/sys/menu/groups`, { params: params }); };
//编辑菜单组列表
export const editMenuList = params => { return axios.post(`${base}/sys/menu/group/update`, { params: params }); };
//新建菜单组列表
export const createMenuList = params => { return axios.post(`${base}/sys/menu/group/create`, { params: params }); };
//删除菜单组列表
export const deleteMenuList = params => { return axios.post(`${base}/sys/menu/group/delete`, { params: params }); }
//创建菜单
export const createMenu = params => { return axios.post(`${base}/sys/menu/create`, { params: params }); };
//删除菜单
export const deleteMenu = params => { return axios.post(`${base}/sys/menu/delete`, { params: params }); };
//更新菜单
export const updateMenu = params => { return axios.post(`${base}/sys/menu/update`, { params: params }); };
//获取菜单池
export const allMenuPool = params => { return axios.post(`${base}/sys/menupool/all`, { params: params }); };
//新增菜单池中的菜单
export const createMenuPool = params => { return axios.post(`${base}/sys/menupool/create`, { params: params }); };
//更新菜单池中的菜单
export const updateMenuPool = params => { return axios.post(`${base}/sys/menupool/update`, { params: params }); };
//删除菜单池中的菜单
export const deleteMenuPool = params => { return axios.post(`${base}/sys/menupool/delete`, { params: params }); };
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };



export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

/*-----微信用户-----*/

//查询微信用户列表接口
export const  getWechatList = params => { return axios.get(`${base}/userManage/getUserList`, { params: params }); };

export const  getDou = params => { return axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312', { params: params }); };
