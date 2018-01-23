<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 20px;">
            <div  class="form-search">
                <el-button type="primary" @click="handleAddList" >添加菜单</el-button>
                <el-button type="primary" @click="handledetail" >查看菜单池</el-button>
            </div>
        </el-col>

        <!--菜单组列表-->
        <el-table :data="tableData" border v-loading="listLoading"  style="width: 100%" v-if="!ismenushow">
            <el-table-column prop="groupCode" label="编号" width="70" align="center">
            </el-table-column>
            <el-table-column prop="groupName" label="菜单名称" align="center" width="150">
            </el-table-column>
            <el-table-column prop="uri" label="路由地址" align="center">
            </el-table-column>
<!--             <el-table-column prop="componet" label="路由组件"  align="center">
</el-table-column> -->
            <el-table-column prop="isDefault" label="状态" :formatter="formatterColumn" width="70" align="center">
            </el-table-column>
            <el-table-column prop="tag" label="位置" width="70" align="center">
            </el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                     <!-- <el-button type="small" size="small" >添加子菜单</el-button>
                     <el-button type="small" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                     <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    <el-button size="small"  @click="openAdd(scope.$index, scope.row)">添加子菜单</el-button>
                     <el-button size="small"  @click="openEdit(scope.$index, scope.row)">编辑</el-button>
                     <el-button size="small"  type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
                 </template>
            </el-table-column>
        </el-table>
        <!--菜单池列表-->
        <el-table :data="menuPoolData" border style="width: 100%" v-if="ismenushow">
             <el-table-column prop="code" label="编号">
             </el-table-column>
             <el-table-column prop="name" label="姓名">
             </el-table-column>
             <el-table-column prop="uri" label="路由地址">
             </el-table-column>
             <el-table-column label="操作">
               <template slot-scope="scope">
                   <el-button type="small" size="small" @click="handleAddPool()">新增菜单</el-button>
                   <el-button type="small" size="small" @click="handleEditPool(scope.$index, scope.row)">编辑</el-button>
                   <el-button type="danger" size="small" @click="handleDeletePool(scope.$index, scope.row)">删除</el-button>
               </template>
             </el-table-column>
           </el-table>

            <!--编辑弹窗-->
            <el-dialog :title="isAdd?'添加':'编辑'" :visible.sync="dialogFormVisible" :modal-append-to-body="false" size="tiny">
                <el-form :model="formData" :rules="Rule" ref="Form">
                    <el-form-item label="上级级菜单" :label-width="formLabelWidth" prop="parentid">
                        <el-select v-model="formData.parentid" filterable placeholder="请选择或搜索菜单">
                            <el-option key="0" label="≡ 一级菜单 ≡" v-html="'≡ 一级菜单 ≡'" value="0"></el-option>
                            <el-option v-for="item in tableData" :key="item.id" v-html="item.spacer+item.name" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="formData.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限节点" :label-width="formLabelWidth" prop="node">
                        <el-input v-model="formData.node" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="路由规则" :label-width="formLabelWidth" prop="route">
                        <el-input v-model="formData.route" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="组件组件" :label-width="formLabelWidth" prop="view">
                        <el-input v-model="formData.view" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
                        <el-input v-model="formData.icon" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否菜单" :label-width="formLabelWidth" prop="is_menu">
                      <el-switch v-model="formData.is_menu" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="是" off-text="否"></el-switch>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                      <el-switch v-model="formData.status" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="启用" off-text="禁用"></el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" :loading="confirm_btn" @click="isAdd?insert():update()">确 定</el-button>
                </div>
            </el-dialog>

        <!--菜单组编辑界面-->
        <!-- <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="菜单名字" prop="groupName">
                    <el-input v-model="editForm.groupName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序位置" prop="tag">
                    <el-input v-model="editForm.tag" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主键ID" prop="groupCode">
                    <el-input v-model="editForm.groupCode" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog> -->

        <!--菜单组新增界面-->
        <!-- <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                <el-form-item label="菜单池列表">
                    <el-select  placeholder="≡ 一级菜单 ≡" v-model="form.region">
                      <el-option  :label="item.name" :value="item.code" v-for="item in menuPoolData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名字" prop="groupName">
                    <el-input v-model="addForm.groupName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序位置" prop="tag">
                    <el-input v-model="addForm.tag" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
         -->
        <!--菜单池菜单新增界面-->
        <!-- <el-dialog title="新增" v-model="addPoolFormVisible" :close-on-click-modal="false">
            <el-form :model="addPoolForm" label-width="120px" :rules="addPoolFormRules" ref="addPoolForm">
                <el-form-item label="编号" prop="code">
                    <el-input v-model="addPoolForm.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单名字" prop="name">
                    <el-input v-model="addPoolForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="路由地址" prop="uri">
                    <el-input v-model="addPoolForm.uri" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addPoolFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addPoolSubmit" :loading="addPoolLoading">提交</el-button>
            </div>
        </el-dialog> -->


        <!--菜单池菜单编辑界面-->
        <!-- <el-dialog title="编辑" v-model="editPoolFormVisible" :close-on-click-modal="false">
            <el-form :model="editPoolForm" label-width="120px" :rules="editPoolFormRules" ref="editPoolForm">
                <el-form-item label="菜单名字" prop="name">
                    <el-input v-model="editPoolForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="编号" prop="code">
                    <el-input v-model="editPoolForm.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="路由地址" prop="uri">
                    <el-input v-model="editPoolForm.uri" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editPoolFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editPoolSubmit" :loading="editPoolLoading">提交</el-button>
            </div>
        </el-dialog> -->
    </section>
</template>
<style>
.form-search {
    background: #eef1f6;
    height: 60px;
    padding: 20px 20px 0;
    margin-bottom: 10px;
    border-left: 3px solid #20a0ff;
}
</style>
<script>
    import http from '@/utils/http'
    import api from '@/api/api'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                authFormVisible:false,
                formLabelWidth: '100px',
                isAdd:false,
                confirm_btn:false,
                formData: {},//表单数据
                Rule: {//表单验证规则
                    name: [
                      {required:true,message:'请输入菜单名称',trigger:'blur'}
                    ],
                },
                ismenushow:false,//菜单组列表显示
                listLoading: false,//是否加载
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,//编辑界面是否加载
                editFormRules: {
                    groupName: [
                        { required: true, message: '请输入菜单名字', trigger: 'blur' }
                    ],
                    groupCode: [
                        { required: true, message: '请输入菜单ID', trigger: 'blur' }
                    ],
                    tag: [
                        { required:true, message:'请输入排序位置',trigger :'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    groupName: 0,
                    groupCode: 0,
                    tag:0,

                },
                editPoolFormVisible: false,//编辑界面是否显示
                editPoolLoading: false,//编辑界面是否加载
                editPoolFormRules: {
                    name: [
                        { required: true, message: '请输入菜单名字', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入菜单编号', trigger: 'blur' }
                    ],
                    uri: [
                        { required:true, message:'请输入菜单路径',trigger :'blur'}
                    ]
                },
                //编辑界面数据
                editPoolForm: {
                    name: 0,
                    code: 0,
                    uri:0,

                },
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    groupName: [
                        { required: true, message: '请输入菜单组名字', trigger: 'blur' }
                    ],
                    tag: [
                        { required:true, message:'请输入排序位置',trigger :'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    groupName: '',
                    tag:'',
                    menuNodes:[]

                },
                addPoolFormVisible: false,//新增菜单池菜单界面是否显示
                addPoolLoading: false,
                addPoolFormRules: {
                    name: [
                        { required: true, message: '请输入菜单名字', trigger: 'blur' }
                    ],
                    code: [
                        { required:true, message:'请输入编号',trigger :'blur'}
                    ],
                    uri: [
                        { required:true, message:'请输入菜单路径',trigger :'blur'}
                    ]
                },
                //新增界面数据
                addPoolForm: {
                    code: '',
                    name:'',
                    uri:[]

                },
                //表格数据
                tableData:[],
                defaultProps: {children: 'children',label: 'name'},
                menuPoolData:'',
                form:{
                    region:''
                }

            }
        },
        methods:{
            openAdd(index,row){
                this.dialogFormVisible=true;
                this.isAdd=true;
                let pid=row?row.id:'0';
                this.formData={parentid:pid,is_menu:'0',status:'1'};
            },
            openEdit(index, row) {
                    this.dialogFormVisible=true;
                    this.isAdd=false;
                    this.formData=JSON.parse(JSON.stringify(this.$store.state.menu.data[index]));
            },
            getTree(data,id){
                var tree=new Array();
                var i=0;
                data.forEach(function(item,index){
                    if(item.parentid==id){
                        item.children = getTree(data,item.id);
                        tree[i] = item;
                        i++;
                    }
                });
                return tree;
            },

            //初始化菜单
            initMenu:function () {
                this.$http.get('/api/sys/menu/groups').then(res => {
                    console.log('菜单1',res.data.ret.list);
                    this.pickData(res.data.ret.list);
                })
                /*const res = http.get(api.getMenuList, params).then(res => {
                    console.log('菜单',res);
                    if(res.errcode=='0'){
                       this.pickData(res.data);
                    }
                })*/
            },
            //获取菜单池
            getMenupool:function () {
/*                const res = http.get(api.getmenupool, params).then(res => {
                    console.log('菜单池',res);
                    if(res.errcode=='0'){
                       this.menuPoolData = res.data;
                    }
                })*/
              this.$http.get('/api/sys/menu/pools').then(res => {
                  console.log('菜单池',res);
                  this.menuPoolData = res.data.ret.list;
              }).catch(err => {
                console.log(err)
              })

            },
            //整理数据格式
            pickData:function(data){
/*                for(var item1 in data) {
                    //console.log(item1, data[item1]);
                    if(data[item1].children.length>0){
                        var secondArr = data[item1].children;
                        for(var item2 in secondArr) {
                            secondArr[item2].second = true;
                            secondArr[item2].groupCode = secondArr[item2].code;
                            secondArr[item2].groupName = '  ├─ '+secondArr[item2].name;
                            //console.log(item2, secondArr[item2]);
                            data.push(secondArr[item2])
                            if(secondArr[item2].children.length>0){
                                var threeArr= secondArr[item2].children;
                                for(var item3 in threeArr) {
                                    threeArr[item3].third = true;
                                    threeArr[item3].groupCode = threeArr[item3].code;
                                    threeArr[item3].groupName ='  ├─├─ '+threeArr[item3].name;
                                    //console.log(item3, threeArr[item3]);
                                    data.push(threeArr[item3])
                                }

                            
                            }
                        }
                 
                    }
                }*/
                this.tableData = data;
                console.log('tableData',this.tableData)
            },
            //显示菜单组编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示菜单池编辑界面
            handleEditPool: function (index, row) {
                this.editPoolFormVisible = true;
                this.editPoolForm = Object.assign({}, row);
            },
            //删除菜单组菜单
            handleDelete: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let params = { groupCode: row.groupCode };
                    const res = http.get(api.deleteMenu, params)
                    if (res.data) {
                        this.listLoading = false;
                        console.log(res.data)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.initMenu();
                    }
                }).catch(() => {

                });
            },
            //删除菜单池菜单
            handleDeletePool: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let params = { code: row.code };
                    const res = http.get(api.deleteMenuPool, params)
                    if (res.data) {
                        this.listLoading = false;
                        console.log(res.data)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        
                        this.getMenupool();
                    }
                }).catch(() => {

                });
            },
            //提交菜单组编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let params = Object.assign({}, this.editForm);
                            http.post(api.modifyMenu, params).then((res) => {
                                console.log(res)
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.initMenu();
                            });
                        });
                    }
                });
            },
            //提交菜单池编辑
            editPoolSubmit: function () {
                this.$refs.editPoolForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editPoolLoading = true;
                            let params = Object.assign({}, this.editPoolForm);
                            http.post(api.modifyMenuPool, params).then((res) => {
                                console.log(res)
                                this.editPoolLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editPoolForm'].resetFields();
                                this.editPoolFormVisible = false;
                                this.getMenupool();
                            });
                        });
                    }
                });
            },
            //显示菜单组新增界面
            handleAddList: function () {
                this.getMenupool();
                this.ismenushow = true,
                this.addFormVisible = true;
                this.addForm = {
                    tag :0,
                    menuNodes:[]

                };
            },
            //菜单组新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let params = Object.assign({}, this.addForm);
                            http.post(api.createMenu, params).then((res) => {
                                console.log(res)
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.initMenu();
                            });
                        });
                    }
                });
            },
            //显示菜单池新增界面
            handleAddPool: function () {
                this.ismenushow = true,
                this.addPoolFormVisible = true;
                this.addPoolForm = {
                    name :'',
                    code:'',
                    uri:''

                };
            },
            //菜单组新增
            addPoolSubmit: function () {
                this.$refs.addPoolForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addPoolLoading = true;
                            let params = Object.assign({}, this.addPoolForm);
                            http.post(api.createMenuPool, params).then((res) => {
                                console.log(res)
                                this.addPoolLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addPoolForm'].resetFields();
                                this.addPoolFormVisible = false;
                                this.getMenupool();
                            });
                        });
                    }
                });
            },

            //点击查看菜单池
            handledetail:function(){
                this.getMenupool();
                this.ismenushow = true
            },

            //状态改成汉字
            formatterColumn:function(row, column) {
                  switch(row.isDefault){
                      case true:
                      return '是';
                      break;
                      case false:
                      return '否';
                      break;
                      default:
                      return '未知';
                  }
              }

            

        },
        mounted() {
            this.initMenu()
        }
    }

</script>

<style scoped>

</style>