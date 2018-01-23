'use strict'
import { baseUrl } from '@/config/env'
import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 5000;
//使用自定义配置新建一个 axios 实例
/*var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
});*/
//http 添加请求拦截器 
axios.interceptors.request.use(config => {
  console.log(config);
  // 在发送请求之前做些什么
  return config;
}, error => {
   _.toast("错误的传参", 'fail');
   // 对请求错误做些什么
  return Promise.reject(error)
})
//http  添加响应拦截器 
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // 对响应错误做点什么
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  else{
    console.log(response);
    alert(response.data.errmsg)
  }
/*  return {
    status: -404,
    msg: '网络异常'
  }*/
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (res.data.errcode=='0')) {
    console.log('res',res);
    return res.data
  }

  
}

export default {
  post1 (url, data) {
    return axios({
      method: 'post',
      baseURL:baseUrl ,
      url,
      data:  qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  post (url, data) {
    return axios({
      method: 'post',
      baseURL:baseUrl ,
      url,
      data:  JSON.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; text/plain, */*'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put(url, data) {
    return axios({
      method: 'put',
      baseURL:baseUrl ,
      url,
      data:  JSON.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; text/plain, */*'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  patch(url, data) {
    return axios({
      method: 'patch',
      baseURL:baseUrl ,
      url,
      data:  JSON.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; text/plain, */*'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json, text/plain, */*'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  adelete(url, params) {
    return axios({
      method: 'delete',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json, text/plain, */*'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
