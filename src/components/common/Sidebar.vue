<template>
    <div class="sidebar">
        <aside >
          <!--导航菜单-->
          <el-menu :default-active="$route.path"   
             unique-opened router >
            <template v-for="(item,index) in MenuList">
              <el-submenu :index="index+''" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">{{item.groupName}}22</template>
                <template v-for="(item,index) in item.menuNodes" v-if='!item.hidden'>
                    <el-submenu :index="index+''"  v-if='item.children&&item.children.length>0'>
                          <template  slot="title">{{item.name}}33</template>
                          <template v-for="children in item.children">
                              <el-menu-item :index="index+''" >
                                <template slot="title"></i>{{children.name}}337{{children.uri}}</template>
                              </el-menu-item>
                          </template>
                    </el-submenu>
                    <el-menu-item :index="index+''" v-else >
                      <template slot="title">{{item.name}}33{{item.uri}}</template>
                    </el-menu-item>
                </template>
              </el-submenu>
              

              <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.children[0].path">
                <el-menu-item :index="item.children[0].uri">{{item.children[0].name}}11{{item.children[0].path}}</el-menu-item>
              </router-link>
            </template>
          </el-menu>
        </aside>
    </div>
</template>

<script>
import utils from '@/utils/utils'
import http from '@/utils/http'
import api from '@/api/api'
    export default {
        data() {
            return {
                isCollapse: true,
                show:false,
                MenuList:[{
                    "groupCode": "00", 
                    "groupName": "系统管理", 
                    "tag": 1, 
                    "isDefault": true,
                    "hidden ":false,//是否隐藏
                    "noDropdown":false,//是否有下拉框 
                    "menuNodes": [
                        {
                            "id": "40287d915f4d100b015f4d103d790002", 
                            "code": "0010", 
                            "name": "系统设置", 
                            "uri": null, 
                            "tag": 0, 
                            "isDefault": true,
                            "hidden":true, //是否隐藏
                            "children": [
                                {
                                    "id": "40287d915f4d100b015f4d103dab0003", 
                                    "code": "001001", 
                                    "name": "活动设置", 
                                    "uri": "/sys/act_setting.html", 
                                    "tag": 1, 
                                    "isDefault": true, 
                                    "children": [ ], 
                                    "roleCode": "ROLE_001001"
                                }, 
                                {
                                    "id": "40287d915f4d100b015f4d103ddb0004", 
                                    "code": "001002", 
                                    "name": "参数设置", 
                                    "uri": "/sys/profile_setting.html", 
                                    "tag": 2, 
                                    "isDefault": true, 
                                    "children": [ ], 
                                    "roleCode": "ROLE_001002"
                                }, 
                                {
                                    "id": "40287d915f4d100b015f4d103e020005", 
                                    "code": "001003", 
                                    "name": "推送设置", 
                                    "uri": "/sys/push_setting.html", 
                                    "tag": 3, 
                                    "isDefault": true, 
                                    "children": [ ], 
                                    "roleCode": "ROLE_001003"
                                }
                            ], 
                            "roleCode": "ROLE_0010"
                        }, 
                        {
                            "id": "40287d915f4d100b015f4d103e290006", 
                            "code": "0041", 
                            "name": "菜单管理", 
                            "uri": "/sys/menu.html", 
                            "tag": 4, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_0041",
                            
                        }, 
                        {
                            "id": "40287d915f4d100b015f4d103e520007", 
                            "code": "0031", 
                            "name": "电小二管理", 
                            "uri": "/sys/promote.html", 
                            "tag": 5, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_0031",

                        }, 
                        {
                            "id": "40287d915f4d100b015f4d103e810008", 
                            "code": "0020", 
                            "name": "人员管理", 
                            "uri": null, 
                            "tag": 6, 
                            "isDefault": true, 
                            "children": [
                                {
                                    "id": "40287d915f4d100b015f4d103eaa0009", 
                                    "code": "002001", 
                                    "name": "信息维护", 
                                    "uri": "/sys/user_info.html", 
                                    "tag": 7, 
                                    "isDefault": true, 
                                    "children": [ ], 
                                    "roleCode": "ROLE_002001"
                                }, 
                                {
                                    "id": "40287d915f4d100b015f4d103edb000a", 
                                    "code": "002002", 
                                    "name": "权限维护", 
                                    "uri": "/sys/permission.html", 
                                    "tag": 8, 
                                    "isDefault": true, 
                                    "children": [ ], 
                                    "roleCode": "ROLE_002002"
                                }
                            ], 
                            "roleCode": "ROLE_0020"
                        }
                    ]
                },{
                    "groupCode": "05", 
                    "groupName": "数据导出", 
                    "tag": 6, 
                    "isDefault": true, 
                    "hidden ":false,//是否隐藏
                    "noDropdown":false,//是否有下拉框
                    "menuNodes": [
                        {
                            "id": "40287d915f4d100b015f4d103fc90017", 
                            "code": "0531", 
                            "name": "月报", 
                            "uri": "/excel/weekly.html", 
                            "tag": 23, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_0531"
                        }, 
                        {
                            "id": "40287d915f4d100b015f4d103fef0018", 
                            "code": "0511", 
                            "name": "模版维护", 
                            "uri": "/excel/template.html", 
                            "tag": 21, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_0511"
                        }, 
                        {
                            "id": "40287d915f4d100b015f4d103ff00019", 
                            "code": "0521", 
                            "name": "周报", 
                            "uri": "/excel/monthly.html", 
                            "tag": 22, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_0521"
                        }
                    ]
                },{
                    "groupName": "自述", 
                    "noDropdown":true,//是否有下拉框
                    "path":'/index',
                    "children": [
                        {
                            "name": "自述", 
                            "path": "/wechat",
                            "children": [ ]
                        }
                    ]
                }],
               data1:[{
            "groupCode": "00", 
            "groupName": "系统管理", 
            "tag": 1, 
            "isDefault": true, 
            "menuNodes": [
                {
                    "id": "402888e7606dcda401606dcdd29b0003", 
                    "code": "0010", 
                    "name": "系统设置", 
                    "uri": null, 
                    "tag": 0, 
                    "isDefault": true, 
                    "children": [
                        {
                            "id": "402888e7606dcda401606dcdd2a60004", 
                            "code": "001001", 
                            "name": "活动设置", 
                            "uri": "/sys/act_setting.html", 
                            "tag": 1, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_001001"
                        }, 
                        {
                            "id": "402888e7606dcda401606dcdd30b0005", 
                            "code": "001002", 
                            "name": "参数设置", 
                            "uri": "/sys/profile_setting.html", 
                            "tag": 2, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_001002"
                        }, 
                        {
                            "id": "402888e7606dcda401606dcdd3260006", 
                            "code": "001003", 
                            "name": "推送设置", 
                            "uri": "/sys/push_setting.html", 
                            "tag": 3, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_001003"
                        }
                    ], 
                    "roleCode": "ROLE_0010"
                }, 
                {
                    "id": "402888e7606dcda401606dcdd32d0007", 
                    "code": "0041", 
                    "name": "菜单管理", 
                    "uri": "/sys/menu.html", 
                    "tag": 4, 
                    "isDefault": true, 
                    "children": [ ], 
                    "roleCode": "ROLE_0041"
                }, 
                {
                    "id": "402888e7606dcda401606dcdd3540008", 
                    "code": "0031", 
                    "name": "电小二管理", 
                    "uri": "/sys/promote.html", 
                    "tag": 5, 
                    "isDefault": true, 
                    "children": [ ], 
                    "roleCode": "ROLE_0031"
                }, 
                {
                    "id": "402888e7606dcda401606dcdd3910009", 
                    "code": "0020", 
                    "name": "人员管理", 
                    "uri": null, 
                    "tag": 6, 
                    "isDefault": true, 
                    "children": [
                        {
                            "id": "402888e7606dcda401606dcdd3b5000a", 
                            "code": "002001", 
                            "name": "信息维护", 
                            "uri": "/sys/user_info.html", 
                            "tag": 7, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_002001"
                        }, 
                        {
                            "id": "402888e7606dcda401606dcdd421000b", 
                            "code": "002002", 
                            "name": "权限维护", 
                            "uri": "/sys/permission.html", 
                            "tag": 8, 
                            "isDefault": true, 
                            "children": [ ], 
                            "roleCode": "ROLE_002002"
                        }
                    ], 
                    "roleCode": "ROLE_0020"
                }
            ]
            },{
                "groupCode": "01", 
                "groupName": "用户管理", 
                "tag": 2, 
                "isDefault": true, 
                "menuNodes": [
                    {
                        "id": "402888e7606dcda401606dcdd43d000c", 
                        "code": "0111", 
                        "name": "微信账户", 
                        "uri": "/customer/wx_users.html", 
                        "tag": 9, 
                        "isDefault": true, 
                        "children": [ ], 
                        "roleCode": "ROLE_0111"
                    }, 
                    {
                        "id": "402888e7606dcda401606dcdd43e000d", 
                        "code": "0112", 
                        "name": "户号管理", 
                        "uri": null, 
                        "tag": 10, 
                        "isDefault": true, 
                        "children": [ ], 
                        "roleCode": "ROLE_0112"
                    }
                ]
            }],
               data: [{
                         label: '一级 1',
                         children: [{
                           label: '二级 1-1',
                           children: [{
                             label: '三级 1-1-1'
                           }]
                         }]
                       }, {
                         label: '一级 2',
                         children: [{
                           label: '二级 2-1',
                           children: [{
                             label: '三级 2-1-1'
                           }]
                         }, {
                           label: '二级 2-2',
                           children: [{
                             label: '三级 2-2-1'
                           }]
                         }]
                       }, {
                         label: '一级 3',
                         children: [{
                           label: '二级 3-1',
                           children: [{
                             label: '三级 3-1-1'
                           }]
                         }, {
                           label: '二级 3-2',
                           children: [{
                             label: '三级 3-2-1'
                           }]
                         }]
                       }],
                       defaultProps: {
                         children: 'children',
                         label: 'label'
                       }
            }
        },
        methods: {
           handleNodeClick(data) {
            console.log(data);
          },
          handleOpen(key, keyPath) {
                  console.log(key, keyPath);
                },
                handleClose(key, keyPath) {
                  console.log(key, keyPath);
                },
          getMenu:function(openId){
            this.$http.get('/api/sys/menu/groups').then(res => {
                console.log(res.data);
                this.MenuList = res.data;
            }).catch(err => {
              console.log(err)
            })

          }

          
        },
        mounted() { //完成挂载
         //this.getMenu();
         console.log(this.MenuList);
        }
    }
</script>

