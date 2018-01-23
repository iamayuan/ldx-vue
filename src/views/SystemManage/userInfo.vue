<template>
  <section class="electrical">
    <div class="electrical-header">
        <el-form ref="form" :model="electricalForm" >
          <el-form-item label="姓名" class="w50">
            <el-input placeholder="请输入推广人员姓名"  class="w75" v-model="electricalForm.name"></el-input>
          </el-form-item>
          <el-form-item label="机构" class="w50">
            <el-input placeholder="请输入推广人员所在机构"  class="w75" v-model="electricalForm.orgNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号" class="w50">
            <el-input placeholder="请输入推广人员手机号"  class="w75" v-model="electricalForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="职工状态"  class="w50">
                <el-select placeholder="请选择" class="electrical-select w75" v-model="electricalForm.identityType" clearable>
                    <el-option label="正式员工" value="01" class="displayB"></el-option>
                    <el-option label="临时员工" value="02" class="displayB"></el-option>
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
    <div class="electrical-content">
        <el-table 
        :data="tableData" >
            <el-table-column  prop="name" label="姓名" align="center" width="80">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width="180">
            </el-table-column>
            <el-table-column  prop="orgNo" label="所在机构"  align="center" width="180">
            </el-table-column>
            <el-table-column  prop="identityType" label="职工状态"  align="center" width="180">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)">删除</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="electrical-pagin">
            <el-col :span="24">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="pageNum"
                  :page-sizes="[20, 40, 60, 80 ,100]"
                  :page-size="perPageNum"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="handFormVisible">

            <el-form :model="handForm" label-width="120px"  ref="handForm" :rules="rulesM">

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="handForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="handForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在机构" prop="orgNo">
                    <el-input v-model="handForm.orgNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职工状态" prop="identityType" >
                    <el-select placeholder="请选择"  v-model="handForm.identityType" style="width:100%;">
                      <el-option label="正式员工" value="01" class="displayB"></el-option>
                      <el-option label="临时员工" value="02" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('handForm')">编辑</el-button>
                  <el-button @click="resetForm('handForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible">
            <el-form :model="addForm" label-width="120px"  ref="addForm" :rules="rulesA">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在机构" prop="orgNo">
                    <el-input v-model="addForm.orgNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职工状态" prop="identityType">
                    <el-select placeholder="请选择"  v-model="addForm.identityType" style="width:100%;">
                      <el-option label="正式员工" value="01" class="displayB"></el-option>
                      <el-option label="临时员工" value="02" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addsubmitForm('addForm')">确定</el-button>
                  <el-button @click="addresetForm('addForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
import utils from '@/utils/utils'
import http from '@/utils/http'
import api from '@/api/api'
export default {
    data() {
      return {
        electricalForm:{
            name: '',
            identityType:'',
            mobile:'',
            orgNo:''
        }, 
        pageNum: 1,//第几页
        total:0,
        tableData: [],
        tableDataAll:[],
        userList:[],
        perPageNum:20,//每页显示数
        handFormVisible: false,//界面是否显示
        handForm: {
          id:'',
          name :'',
          mobile :'',
          orgNo :'',
          identityType:'',
        },
        rulesM: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          orgNo: [
            { required: true, message: '所在机构不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' }
          ],
          identityType: [
            { required: true, message: '职工状态不能为空', trigger: 'change'}
          ]
        },
        rulesA: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          orgNo: [
            { required: true, message: '所在机构不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' }
          ],
          identityType: [
            { required: true, message: '职工状态不能为空', trigger: 'change'}
          ]
        },
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        //新增界面数据
        addForm: {
            id:'',
            name :'',
            mobile :'',
            orgNo :'',
            identityType:'',
        },
      };
    },
    methods: {
      getEleList:function (pageNum,perPageNum) {

        let params = { 
          name:this.electricalForm.name,
          mobile:this.electricalForm.mobile,
          orgNo:this.electricalForm.orgNo,
          identityType:this.electricalForm.identityType,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数
        };
        const res = http.get(api.getPromoters, params).then(res => {
             console.log(api.getPromoters,'api2');
             if(res.errcode=='0'){
               this.tableData=res.ret.list;
               for(var item in this.tableData){
                 this.tableData[item].identityType=='01'?this.tableData[item].identityType='正式':this.tableData[item].identityType='临时';
               }

               this.total=res.ret.totalElements;
             }

          
        })
        
      },
      getDetail:function(promoterInfoId){
        const res = http.get(api.getPromoters+'/'+promoterInfoId, '').then(res => {
             console.log('详情',res);
             if(res.errcode=='0'){
               let userInfo=res.ret;
               this.handForm.mobile= userInfo.mobile,
               this.handForm.name= userInfo.name,
               this.handForm.orgNo= userInfo.orgNo,
               this.handForm.identityType = userInfo.identityType
              }else{
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
             }
        })
      },
      getDelete:function(promoterInfoId){
        const res = http.adelete(api.getPromoters+'/'+promoterInfoId, '').then(res => {
             console.log('删除',res);
             if(res.errcode=="0"){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                let pageNum = this.pageNum;
                let perPageNum=this.perPageNum;
                this.getEleList(pageNum,perPageNum);
             }else{
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
             }
        })
      },
      getAdd:function(){
        let params = { 
          name:this.addForm.name,
          mobile:this.addForm.mobile,
          orgNo:this.addForm.orgNo,
          identityType:this.addForm.identityType
        };
        const res = http.put(api.getPromoters, params).then(res => {
             console.log('新增',res);
             this.addFormVisible=false;
             if(res.errcode=="0"){
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.addresetForm('addForm');
                let pageNum = this.pageNum;
                let perPageNum=this.perPageNum;
                this.getEleList(pageNum,perPageNum);
             }else{
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
             }
        })
      },
      getMod:function(promoterInfoId){
        let params = { 
          promoterInfoId:promoterInfoId,
          name:this.handForm.name,
          mobile:this.handForm.mobile,
          orgNo:this.handForm.orgNo,
          identityType:this.handForm.identityType

        };
        const res = http.patch(api.getPromoters, params).then(res => {
             console.log('编辑',res);
             this.handFormVisible=false;
             if(res.errcode=="0"){
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
                let pageNum = this.pageNum;
                let perPageNum=this.perPageNum;
                this.getEleList(pageNum,perPageNum);
             }else{
                this.$message({
                  message: res.errmsg,
                  type: 'error'
                });
             }

        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getMod(this.handForm.id);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addsubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAdd();

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addresetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getEleList(pageNum,val);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getEleList(val,perPageNum);
        console.log(`当前页: ${val}`);
      },
      handleEdit(val) {
        this.handFormVisible=true;
        this.handForm.id=val.promoterInfoId;
        this.getDetail(this.handForm.id);
        console.log(val);
      },
      handleDelete(val) {
        console.log(val);
        this.getDelete(val.promoterInfoId);
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getEleList(pageNum,perPageNum);
      },
      onExport(){
        console.log(`导出`);
      },
      onAdd(){
        this.addFormVisible=true;
        
      }

    },
    mounted() {
      let pageNum = this.pageNum;
      let perPageNum=this.perPageNum;
      this.getEleList(pageNum,perPageNum);
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
