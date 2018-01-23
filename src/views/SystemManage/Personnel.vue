<template>
  <section class="person">
    <div class="person-header">
        <el-form ref="form" :model="personForm" >
          <el-form-item label="姓名" class="w50">
            <el-input placeholder="请输入工作人员姓名"  class="displayiB w70" v-model="personForm.employeeName"></el-input>
          </el-form-item>
          <el-form-item label="工号" class="w50">
            <el-input placeholder="请输入工作人员工号"  class="displayiB w70" v-model="personForm.employeeCode"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="w50" >
                <el-select placeholder="请选择状态" class="person-select w70" v-model="personForm.status" >
                    <el-option label="禁用" value="0" class="displayB"></el-option>
                    <el-option label="启用" value="1" class="displayB"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button type="primary" @click="onAdd">新增</el-button>
            </div>
          </el-form-item>
        </el-form>
    </div>
    <div class="person-content">
        <el-table 
        :data="tableData" >
            <el-table-column  prop="employeeName" label="姓名" align="center" width="180">
            </el-table-column>
            <el-table-column prop="employeeId" label="员工ID" align="center" width="180">
            </el-table-column>
            <el-table-column prop="employeeCode" label="员工编号" align="center" width="180">
            </el-table-column>
            <el-table-column  prop="status" label="状态"  align="center" width="180">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDetail(scope.row)">查看</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="person-pagin">
            <el-col :span="24">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="pageNum"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="perPageNum"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="EditFormVisible" >
            <el-form :model="EditForm" label-width="120px"  ref="EditForm"   >
                <el-form-item label="员工ID" prop="employeeId">
                    <el-input v-model="EditForm.employeeId"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="employeeName">
                    <el-input v-model="EditForm.employeeName" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="EditForm.password" ></el-input>
                </el-form-item>
                <el-form-item label="员工编号" prop="employeeCode">
                    <el-input v-model="EditForm.employeeCode"></el-input>
                </el-form-item>
                <el-form-item label="员工状态" prop="status" >
                    <el-select placeholder="请选择状态" class="person-select" v-model="EditForm.status" style="width:100%;">
                        <el-option label="禁用" value="0" class="displayB"></el-option>
                        <el-option label="启用" value="1" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权菜单列表" >
                  <el-checkbox-group 
                        v-model="EditForm.menuCodes" @change="handleCheckChange">
                        <el-checkbox v-for="menuCode in menuCodes" :label="menuCode.code" :key="menuCode.code">{{menuCode.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="EditsubmitForm('EditForm')">编辑</el-button>
                    <el-button @click="EditresetForm('EditForm')">取消</el-button>
                  </el-form-item>
            </el-form>
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" >
            <el-form :model="addForm" label-width="120px"  ref="addForm"  :rules="ruleAdd" >
                <el-form-item label="员工姓名" prop="employeeName">
                    <el-input v-model="addForm.employeeName" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="员工编号" prop="employeeCode">
                    <el-input v-model="addForm.employeeCode"></el-input>
                </el-form-item>
                <el-form-item label="员工状态" prop="status" >
                    <el-select placeholder="请选择状态" class="person-select" v-model="addForm.status" style="width:100%;">
                        <el-option label="禁用" value="0" class="displayB"></el-option>
                        <el-option label="启用" value="1" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权菜单列表" >
                    <el-checkbox-group 
                        v-model="addForm.menuCodes" @change="handleCheckChange">
                        <el-checkbox v-for="menuCode in menuCodes" :label="menuCode.code" :key="menuCode.code">{{menuCode.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addsubmitForm('addForm')" >确定</el-button>
                    <el-button @click="addresetForm('addForm')">取消</el-button>
                  </el-form-item>
            </el-form>
        </el-dialog>
        <!--详情界面-->
        <el-dialog title="详情" :visible.sync="DetailFormVisible" >
            <el-form :model="DetailForm" label-width="120px"  ref="DetailForm"   >
                <el-form-item label="员工ID" prop="employeeId">
                    <el-input v-model="DetailForm.employeeId"  disabled></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="employeeName">
                    <el-input v-model="DetailForm.employeeName"  disabled></el-input>
                </el-form-item>
                <el-form-item label="员工编号" prop="employeeCode">
                    <el-input v-model="DetailForm.employeeCode" disabled></el-input>
                </el-form-item>
                <el-form-item label="员工状态" prop="status">
                    <el-select placeholder="请选择状态" class="person-select" v-model="DetailForm.status" style="width:100%;" disabled> 
                        <el-option label="禁用" value="0" class="displayB"></el-option>
                        <el-option label="启用" value="1" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权菜单列表" >
                    <el-checkbox-group 
                        v-model="DetailForm.menuCodes" @change="handleCheckChange" disabled>
                        <el-checkbox v-for="menuCode in menuCodes" :label="menuCode.code" :key="menuCode.code">{{menuCode.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
  </section>
</template>

<script>
import utils from '@/utils/utils'
import http from '@/utils/http'
import api from '@/api/api'
export default {
    data() {
      return {
        personForm:{
            employeeName: '',
            employeeCode:'',
            status:''

        }, 
        pageNum: 1,//第几页
        total:0,
        tableData: [],
        perPageNum:20,//每页显示数
        menuCodes:[],
        EditFormVisible: false,//新增界面是否显示
        //编辑界面数据
        EditForm: {
            employeeName:'',  //员工姓名
            employeeId:'',  //员工ID
            status:'',  //状态:0-禁用，1-启用
            employeeCode :'', //员工编号
            menuCodes:[]  //已授权菜单列表
        },
        addFormVisible: false,//新增界面是否显示
        //新增界面数据
        addForm: {
            employeeName:'',  //员工姓名
            password:'',
            status:'',  //状态:0-禁用，1-启用
            employeeCode :'', //员工编号
            menuCodes:[]  //已授权菜单列表
        },
        ruleAdd:{
          employeeName: [
              { required: true, message: '请输入员工姓名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, message: '长度在6个字符以上', trigger: 'blur' }
          ],
          employeeCode: [
              { required:true, message:'请输入员工编号',trigger :'blur'}
          ],
          status: [
              { required:true, message:'请输入员工状态',trigger :'change'}
          ]
        },
        ruleMod:{
          employeeName: [
              { required: true, message: '请输入员工姓名', trigger: 'blur' }
          ],
          employeeCode: [
              { required:true, message:'请输入员工编号',trigger :'blur'}
          ],
          status: [
              { required:true, message:'请输入员工状态',trigger :'change'}
          ]
        },
        DetailFormVisible: false,//新增界面是否显示
        DetailLoading: false,
        //详情界面数据
        DetailForm: {
            employeeName:'',  //员工姓名
            employeeId:'',  //员工ID
            employeeCode :'', //员工编号
            menuCodes:[]  //已授权菜单列表
        },
      };
    },
    methods: {
      getMenu(){
        let params = '';
        this.$http.get('/api/sys/menupool/all').then(res => {
            console.log(res);
            this.menuCodes = res.data;
            for(let item in this.menuCodes){
              if(this.menuCodes[item].name=='管理员'){
                this.menuCodes.splice(item,1)
              }
               
            }
            this.menuCodes = this.menuCodes;
        }).catch(err => {
          console.log(err);
        })
      },
      getPerson(pageNum,perPageNum) {
        let params = { 
          employeeName:this.personForm.employeeName,
          employeeCode:this.personForm.employeeCode,
          status:this.personForm.status,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数

        };
        const res = http.get(api.GetPerson, params).then(res => {
             //console.log(res.data);
             this.tableData=res.ret.list;
             this.total=res.ret.totalElements;
             for(var item in this.tableData){

                if(this.tableData[item].status=='0'){
                  this.tableData[item].status='禁用';
                }else{
                  this.tableData[item].status='启用';
                }
                  
              }
           // console.log(this.tableData);
        })
      },
      getDetail(employeeId) {
        let params = { 
          employeeId:employeeId
        };
        const res = http.get(api.PersonDetail, params).then(res => {
            this.EditForm.employeeName=res.ret.employeeName;
            this.EditForm.employeeId=res.ret.employeeId;
            this.EditForm.status=res.ret.status; 
            this.EditForm.employeeCode=res.ret.employeeCode;
            this.DetailForm.employeeName=res.ret.employeeName; 
            this.DetailForm.employeeId=res.ret.employeeId;
            this.DetailForm.status=res.ret.status;  
            this.DetailForm.employeeCode=res.ret.employeeCode;
            let menuCodes =res.ret.menuCode;
            for(let item in menuCodes){
              this.DetailForm.menuCodes.push(menuCodes[item].code);
            }
            //this.DetailForm.menuCodes=['0111'];
             
        })
      },
      getMod(employeeId) {
        this.$confirm('确认修改吗？', '提示', {}).then(() => {
          let length = this.EditForm.menuCodes.length;let codeArr='';
          if(length>0){
            for(let item in this.EditForm.menuCodes){
              codeArr+=this.EditForm.menuCodes[item]+','
            }
            codeArr=(codeArr.substring(codeArr.length-1)==',')?codeArr.substring(0,codeArr.length-1):codeArr;
          }else{
            codeArr='';
          };
          let EditForm={
            employeeId:this.EditForm.employeeId,
            employeeName:this.EditForm.employeeName,
            password:this.EditForm.password==undefined?'':this.EditForm.password,
            status:this.EditForm.status,  //状态:0-禁用，1-启用
            employeeCode :this.EditForm.employeeCode, //员工编号
            menuCodes:codeArr  //已授权菜单列表
          }
          let params = Object.assign({}, EditForm);
          http.post(api.PersonEdit, params).then((res) => {
            console.log('res',res);
              this.$message({
                  message: '修改成功',
                  type: 'success'
              });
              this.$refs['EditForm'].resetFields();
              this.EditFormVisible = false;
          });
        });

      },
      getAdd() {
        this.$confirm('确认添加吗？', '提示', {}).then(() => {
          let length = this.addForm.menuCodes.length;let codeArr='';
          if(length>0){
            for(let item in this.addForm.menuCodes){
              codeArr+=this.addForm.menuCodes[item]+','
            }
            codeArr=(codeArr.substring(codeArr.length-1)==',')?codeArr.substring(0,codeArr.length-1):codeArr;
          }else{
            codeArr='';
          };
          let addForm={
            employeeName:this.addForm.employeeName,
            password:this.addForm.password,
            status:this.addForm.status,  //状态:0-禁用，1-启用
            employeeCode :this.addForm.employeeCode, //员工编号
            menuCodes:codeArr  //已授权菜单列表
          }
          let params = Object.assign({}, addForm);
          http.post(api.PersonAdd, params).then((res) => {
            console.log('res',res);
              this.addLoading = false;
              this.$message({
                  message: '添加成功',
                  type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
          });
        });
      },
      getDel(loginId,delId) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          let param={
            loginId:loginId,
            delEmployeeId:delId
          }
          let params = Object.assign({}, param);
          http.post(api.PersonDel, params).then((res) => {
            console.log('res',res);
              
          });
        });
      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getPerson(pageNum,val);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getPerson(val,perPageNum);
      },
      handleEdit(row) {
        this.EditFormVisible= true;
        this.getDetail(row.employeeId);
        this.getMenu();
      },
      handleDetail(row) {
        this.DetailFormVisible= true;
        this.getDetail(row.employeeId);
        this.getMenu();
      },
      handleCheckChange(val) {
        console.log(val);
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getPerson(pageNum,perPageNum);
      },
      onAdd(){
        this.addFormVisible=true;
        this.getMenu();
      },
      EditsubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.getMod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      EditresetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addsubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.getAdd();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addresetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },
    mounted() {
      let pageNum = this.pageNum;
      let perPageNum=this.perPageNum;
      this.getPerson(pageNum,perPageNum);   
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
