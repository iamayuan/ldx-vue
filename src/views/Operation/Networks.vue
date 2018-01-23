<template>
  <section class="Net">
    <div class="Net-header">
        <el-form ref="form" :model="NetForm" >
            <el-form-item label="网点名称" class="w50">
              <el-input placeholder="输入网点名称"  class="displayiB w70" v-model="NetForm.networkName"></el-input>
            </el-form-item>
            <el-form-item label="电话" class="w50">
              <el-input placeholder="输入电话"  class="displayiB w70" v-model="NetForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="供电单位" class="w50">
              <el-input placeholder="输入供电单位"  class="displayiB w70" v-model="NetForm.orgNo"></el-input>
            </el-form-item>
            <el-form-item label="网点地址" class="w50">
              <el-input placeholder="输入网点地址"  class="displayiB w70" v-model="NetForm.networkAddress"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button type="primary" @click="onAdd">添加</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="Net-content">
        <el-table 
        :data="tableData">
            <el-table-column  prop="networkName" label="网点名称"  width="120" align="center">
            </el-table-column>
            <el-table-column prop="telephone" label="电话"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="networkAddress" label="网点地址"  width="320" align="center">
            </el-table-column>
            <el-table-column  prop="orgNo" label="供电单位"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="timeRange" label="营业时间"  width="180" align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope" >
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)" >编辑</el-button>
                    <el-button
                      size="small"
                      @click="handleDetail(scope.row)" >查看</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)" >删除</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="Net-pagin">
            <el-col :span="24">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="pageNum"
                  :page-sizes="[20,40,60,80,100]"
                  :page-size="perPageNum"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="EditFormVisible" >
            <el-form :model="EditForm" label-width="120px"  ref="EditForm" :rules="rulesEdit">
                <el-form-item label="网点id" prop="networkId">
                    <el-input v-model="EditForm.networkId"></el-input>
                </el-form-item>
                <el-form-item label="网点编号" prop="networkNo">
                    <el-input v-model="EditForm.networkNo"></el-input>
                </el-form-item>
                <el-form-item label="网点名称" prop="networkName">
                    <el-input v-model="EditForm.networkName"></el-input>
                </el-form-item>
                <el-form-item label="供电单位" prop="orgNo">
                    <el-input v-model="EditForm.orgNo"></el-input>
                </el-form-item>
                <el-form-item label="网点地址" prop="networkAddress">
                    <el-input v-model="EditForm.networkAddress"></el-input>
                </el-form-item>
                <el-form-item label="网点电话" prop="telephone">
                    <el-input v-model="EditForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="状态值" >
                    <el-select placeholder="请选择状态值" class="wechat-select" v-model="EditForm.status" style="width:100%;">
                        <el-option label="备用" value="01" class="displayB"></el-option>
                        <el-option label="启用" value="02" class="displayB"></el-option>
                        <el-option label="停用" value="03" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业厅类型" >
                  <el-select placeholder="请选择营业厅类型" class="wechat-select " v-model="EditForm.hallType" style="width:100%;">
                      <el-option label="智能营业厅" value="01" class="displayB"></el-option>
                      <el-option label="普通营业厅" value="02" class="displayB"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="经营范围" prop="businessRange">
                    <el-input v-model="EditForm.businessRange"></el-input>
                </el-form-item>
                <el-form-item label="地市" prop="networkCity">
                    <el-input v-model="EditForm.networkCity"></el-input>
                </el-form-item>
                <el-form-item label="行政区域" prop="networkArea">
                    <el-input v-model="EditForm.networkArea"></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="xNo">
                    <el-input v-model="EditForm.xNo"></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="yNo">
                    <el-input v-model="EditForm.yNo"></el-input>
                </el-form-item>
                <el-form-item label="营业时间" prop="timeRange">
                    <el-input v-model="EditForm.timeRange"></el-input>
                </el-form-item>
                <el-form-item label="经停的公交路线" prop="busStation">
                    <el-input v-model="EditForm.busStation"></el-input>
                </el-form-item>
                <el-form-item label="业务受理窗口数" prop="busiWinNo">
                    <el-input v-model="EditForm.busiWinNo"></el-input>
                </el-form-item>
                <el-form-item label="缴费营业窗口数" prop="amtWinNo">
                    <el-input v-model="EditForm.amtWinNo"></el-input>
                </el-form-item>
                <el-form-item label="自助终端数量" prop="autosetNo">
                    <el-input v-model="EditForm.autosetNo"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('EditForm')">确定</el-button>
                    <el-button @click="resetForm('EditForm')">取消</el-button>
                  </el-form-item>
            </el-form>
            
        </el-dialog>
        <!--详情界面-->
        <el-dialog title="详情" :visible.sync="detailFormVisible" >
            <el-form :model="detailForm" label-width="120px"  ref="detailForm" >
                <el-form-item label="网点id" prop="networkId">
                    <el-input v-model="detailForm.networkId" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点编号" prop="networkNo">
                    <el-input v-model="detailForm.networkNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="供电单位" prop="orgNo">
                    <el-input v-model="detailForm.orgNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点名称" prop="networkName">
                    <el-input v-model="detailForm.networkName" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点地址" prop="networkAddress">
                    <el-input v-model="detailForm.networkAddress" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点电话" prop="telephone">
                    <el-input v-model="detailForm.telephone" disabled></el-input>
                </el-form-item>
                <el-form-item label="状态值" >
                    <el-select placeholder="请选择状态值" class="wechat-select " v-model="detailForm.status" style="width:100%;" disabled>
                        <el-option label="备用" value="01" class="displayB"></el-option>
                        <el-option label="启用" value="02" class="displayB"></el-option>
                        <el-option label="停用" value="03" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业厅类型" >
                  <el-select placeholder="请选择营业厅类型" class="wechat-select" v-model="detailForm.hallType" style="width:100%;" disabled>
                      <el-option label="智能营业厅" value="01" class="displayB"></el-option>
                      <el-option label="普通营业厅" value="02" class="displayB"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="经营范围" prop="businessRange">
                    <el-input v-model="detailForm.businessRange"disabled></el-input>
                </el-form-item>
                <el-form-item label="地市" prop="networkCity">
                    <el-input v-model="detailForm.networkCity"disabled></el-input>
                </el-form-item>
                <el-form-item label="行政区域" prop="networkArea">
                    <el-input v-model="detailForm.networkArea"disabled></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="xNo">
                    <el-input v-model="detailForm.xNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="yNo">
                    <el-input v-model="detailForm.yNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="营业时间" prop="timeRange">
                    <el-input v-model="detailForm.timeRange" disabled></el-input>
                </el-form-item>
                <el-form-item label="经停的公交路线" prop="busStation">
                    <el-input v-model="detailForm.busStation" disabled></el-input>
                </el-form-item>
                <el-form-item label="业务受理窗口数" prop="busiWinNo">
                    <el-input v-model="detailForm.busiWinNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="缴费营业窗口数" prop="amtWinNo">
                    <el-input v-model="detailForm.amtWinNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="自助终端数量" prop="autosetNo">
                    <el-input v-model="detailForm.autosetNo" disabled></el-input>
                </el-form-item>
                

            </el-form>
            
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" >
            <el-form :model="addForm" label-width="120px"  ref="addForm" :rules="rulesAdd">
                <el-form-item label="网点id" prop="networkId">
                    <el-input v-model="addForm.networkId"></el-input>
                </el-form-item>
                <el-form-item label="网点编号" prop="networkNo">
                    <el-input v-model="addForm.networkNo"></el-input>
                </el-form-item>
                <el-form-item label="网点名称" prop="networkName">
                    <el-input v-model="addForm.networkName"></el-input>
                </el-form-item>
                <el-form-item label="供电单位" prop="orgNo">
                    <el-input v-model="addForm.orgNo"></el-input>
                </el-form-item>
                <el-form-item label="网点地址" prop="networkAddress">
                    <el-input v-model="addForm.networkAddress"></el-input>
                </el-form-item>
                <el-form-item label="网点电话" prop="telephone">
                    <el-input v-model="addForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="状态值" >
                    <el-select placeholder="请选择状态值" class="wechat-select" v-model="addForm.status" style="width:100%;">
                        <el-option label="备用" value="01" class="displayB"></el-option>
                        <el-option label="启用" value="02" class="displayB"></el-option>
                        <el-option label="停用" value="03" class="displayB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业厅类型" >
                  <el-select placeholder="请选择营业厅类型" class="wechat-select " v-model="addForm.hallType" style="width:100%;">
                      <el-option label="智能营业厅" value="01" class="displayB"></el-option>
                      <el-option label="普通营业厅" value="02" class="displayB"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="经营范围" prop="businessRange">
                    <el-input v-model="addForm.businessRange"></el-input>
                </el-form-item>
                <el-form-item label="地市" prop="networkCity">
                    <el-input v-model="addForm.networkCity"></el-input>
                </el-form-item>
                <el-form-item label="行政区域" prop="networkArea">
                    <el-input v-model="addForm.networkArea"></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="xNo">
                    <el-input v-model="addForm.xNo"></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="yNo">
                    <el-input v-model="addForm.yNo"></el-input>
                </el-form-item>
                <el-form-item label="营业时间" prop="timeRange">
                    <el-input v-model="addForm.timeRange"></el-input>
                </el-form-item>
                <el-form-item label="经停的公交路线" prop="busStation">
                    <el-input v-model="addForm.busStation"></el-input>
                </el-form-item>
                <el-form-item label="业务受理窗口数" prop="busiWinNo">
                    <el-input v-model="addForm.busiWinNo"></el-input>
                </el-form-item>
                <el-form-item label="缴费营业窗口数" prop="amtWinNo">
                    <el-input v-model="addForm.amtWinNo"></el-input>
                </el-form-item>
                <el-form-item label="自助终端数量" prop="autosetNo">
                    <el-input v-model="addForm.autosetNo"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="AddsubmitForm('addForm')">确定</el-button>
                    <el-button @click="AddresetForm('addForm')">取消</el-button>
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
        NetForm:{
            networkName:'',
            telephone:'',
            orgNo:'',
            networkAddress:''
        }, 
        pageNum: 1,//第几页
        total:0,
        multipleSelection:[],
        perPageNum:20,//每页显示数
        options: [],//所属类分级器
        //表单验证
        rulesEdit: {
          networkId: [
            {required: true, message: '请输入网点id', trigger: 'blur'}
          ],
          networkName: [
            {required: true, message: '请输入网点名称', trigger: 'blur'}
          ],
          status:[
            {required:true, message:'请选择状态值',trigger:'change'}
          ],
          networkAddress: [
            {required: true, message: '请输入网点地址', trigger: 'blur'}
          ],
          telephone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          orgNo: [
            {required: true, message: '请输入供电单位', trigger: 'blur'}
          ],
          xNo: [
            {required: true, message: '请输入经度', trigger: 'blur'}
          ],
          yNo: [
            {required: true, message: '请输入纬度', trigger: 'blur'}
          ],
          timeRange: [
            {required: true, message: '请输入营业时间', trigger: 'blur'}
          ],
          hallType:[
            {required:true, message:'请选择营业厅类型',trigger:'change'}
          ]
        },
        rulesAdd: {
          networkName: [
            {required: true, message: '请输入网点名称', trigger: 'blur'}
          ],
          status:[
            {required:true, message:'请选择状态值',trigger:'change'}
          ],
          networkAddress: [
            {required: true, message: '请输入网点地址', trigger: 'blur'}
          ],
          telephone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          orgNo: [
            {required: true, message: '请输入供电单位', trigger: 'blur'}
          ],
          xNo: [
            {required: true, message: '请输入经度', trigger: 'blur'}
          ],
          yNo: [
            {required: true, message: '请输入纬度', trigger: 'blur'}
          ],
          timeRange: [
            {required: true, message: '请输入营业时间', trigger: 'blur'}
          ],
          hallType:[
            {required:true, message:'请选择营业厅类型',trigger:'change'}
          ]
        },
        options1:[],
        options2:[],
        tableData: [],
        EditFormVisible: false,//编辑界面是否显示
        //编辑界面数据
        EditForm: {
            networkId:'',
            channelId:'1',
            networkNo:'', 
            networkName:'',
            networkCity:'',
            networkArea:'',
            networkAddress:'', 
            telephone:'',
            status:'',
            businessRange:'',
            orgNo:'',
            networkCity:'',
            networkArea:'',
            xNo:'',
            yNo:'',
            hoursFlag:'',
            timeRange:'', 
            busStation:'', 
            busiWinNo:'', 
            amtWinNo:'',  
            autosetNo:'', 
            hallType:''
        },
        detailFormVisible: false,//编辑界面是否显示
        //编辑界面数据
        detailForm: {
            networkId:'',
            channelId:'1',
            networkNo:'', 
            networkName:'',
            networkCity:'',
            networkArea:'',
            networkAddress:'', 
            telephone:'',
            status:'',
            businessRange:'',
            orgNo:'',
            networkCity:'',
            networkArea:'',
            xNo:'',
            yNo:'',
            hoursFlag:'',
            timeRange:'', 
            busStation:'', 
            busiWinNo:'', 
            amtWinNo:'',  
            autosetNo:'', 
            hallType:''
        },
        addFormVisible: false,//新增界面是否显示
        //新增界面数据
        addForm: {
            networkId:'',
            channelId:'1',
            networkNo:'', 
            networkName:'',
            networkCity:'',
            networkArea:'',
            networkAddress:'', 
            telephone:'',
            status:'',
            businessRange:'',
            orgNo:'',
            networkCity:'',
            networkArea:'',
            xNo:'',
            yNo:'',
            hoursFlag:'',
            timeRange:'', 
            busStation:'', 
            busiWinNo:'', 
            amtWinNo:'',  
            autosetNo:'', 
            hallType:''
        },
      };
    },

    methods: {
        NetworkList:function () {
          let params = { 
              networkName:this.NetForm.networkName,
              telephone:this.NetForm.telephone,
              orgNo:this.NetForm.orgNo,
              networkAddress:this.NetForm.networkAddress

          };
          const res = http.get(api.Networks, params).then(res => {
               //console.log(res);
              this.tableData=res.ret.list;
              this.total=res.ret.totalElements;
          })
        },
        NetworkDetail:function (networkId) {
          const res = http.get(api.Networks+'/'+networkId, '').then(res => {
              console.log(res);
              let result = res.ret;
              this.EditForm.networkId=result.networkId;
              this.EditForm.networkNo=result.networkNo; 
              this.EditForm.networkName=result.networkName;
              this.EditForm.networkCity=result.networkCity;
              this.EditForm.networkArea=result.networkArea;
              this.EditForm.networkAddress=result.networkAddress; 
              this.EditForm.telephone=result.telephone;
              this.EditForm.status=result.status;
              this.EditForm.businessRange=result.businessRange;
              this.EditForm.orgNo=result.orgNo;
              this.EditForm.networkCity=result.networkCity;
              this.EditForm.networkArea=result.networkArea;
              this.EditForm.netAddress=result.netAddress;
              this.EditForm.xNo=result.xNo;
              this.EditForm.yNo=result.yNo;
              this.EditForm.timeRange=result.timeRange; 
              this.EditForm.busStation=result.busStation; 
              this.EditForm.busiWinNo=result.busiWinNo; 
              this.EditForm.amtWinNo=result.amtWinNo;  
              this.EditForm.autosetNo=result.autosetNo; 
              this.EditForm.hallType=result.hallType;
              this.detailForm.networkId=result.networkId;
              this.detailForm.networkNo=result.networkNo; 
              this.detailForm.networkName=result.networkName;
              this.detailForm.networkCity=result.networkCity;
              this.detailForm.networkArea=result.networkArea;
              this.detailForm.networkAddress=result.networkAddress; 
              this.detailForm.telephone=result.telephone;
              this.detailForm.status=result.status;
              this.detailForm.businessRange=result.businessRange;
              this.detailForm.orgNo=result.orgNo;
              this.detailForm.networkCity=result.networkCity;
              this.detailForm.networkArea=result.networkArea;
              this.detailForm.netAddress=result.netAddress;
              this.detailForm.xNo=result.xNo;
              this.detailForm.yNo=result.yNo;
              this.detailForm.timeRange=result.timeRange; 
              this.detailForm.busStation=result.busStation; 
              this.detailForm.busiWinNo=result.busiWinNo; 
              this.detailForm.amtWinNo=result.amtWinNo;  
              this.detailForm.autosetNo=result.autosetNo; 
              this.detailForm.hallType=result.hallType
          })
        },
        NetworkEdit:function () {
          let params = Object.assign({}, this.EditForm);
          const res = http.patch(api.Networks, params).then(res => { 
               console.log('编辑',res);
               this.EditFormVisible=false;
               let errcode =res.errcode;
               if(errcode=='0'){
                  this.$message({
                      message: '编辑成功',
                      type: 'success'
                  });
                  let pageNum = this.pageNum;
                  let perPageNum=this.perPageNum;
                  this.NetworkList(pageNum,perPageNum);
               }else{
                  this.$message({
                      message: errcode,
                      type: 'error'
                  });
               }
               
          })
        },
        NetworkAdd:function () {

        /*let params ={
          channelId:'1',
          networkNo:'',
          networkName:'测试网点名称' ,
          networkAddress:'网点地址',
          telephone:'0518-23444567',
          status:"01",
          businessRange:'',
          orgNo:'341000',
          xNo:'112.23',
          yNo:'23.3',
          hoursFlag:"01",
          busStation:'',
          busiWinNo:'',
          amtWinNo:'',
          autosetNo:'',
          timeRange:'周一到周五',
          hallType:'01',
          networkCity:'330500',  
          networkArea:'330523'
        }
*/        let params = Object.assign({}, this.addForm);
          console.log('params',params);
          const res = http.put(api.Networks, params).then(res => { 
               console.log('新增',res);
               this.addFormVisible=false;
               let errcode =res.errcode;
               if(errcode=='0'){
                  this.$message({
                      message: '新增成功',
                      type: 'success'
                  });
                  let pageNum = this.pageNum;
                  let perPageNum=this.perPageNum;
                  this.NetworkList(pageNum,perPageNum);
               }else{
                  this.$message({
                      message: errcode,
                      type: 'error'
                  });
               }
          })
        },
        NetworkDele:function (networkId) {
          const res = http.adelete(api.Networks+'/'+networkId, '').then(res => {
            console.log('删除',res);
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            let pageNum = this.pageNum;
            let perPageNum=this.perPageNum;
            this.NetworkList(pageNum,perPageNum);
             
          })
        },
        handleSizeChange(val) {
          let pageNum = this.pageNum;
          this.perPageNum=val;
          this.NetworkList(pageNum,val);
        },
        handleCurrentChange(val) {
          let perPageNum=this.perPageNum;
          this.pageNum=val;
          this.NetworkList(val,perPageNum);
        },
        handleEdit(row) {
          console.log(row.networkId);
          this.EditFormVisible=true;
          this.NetworkDetail(row.networkId);
        },
        handleDetail(row) {
          console.log(row.networkId);
          this.detailFormVisible=true;
          this.NetworkDetail(row.networkId);
        },
        handleDelete(row) {
          console.log( row);
          this.NetworkDele(row.networkId);
        },
        onQuery(){
          let pageNum = this.pageNum;
          let perPageNum=this.perPageNum;
          this.NetworkList(pageNum,perPageNum);
        },
        onAdd(){
          this.addFormVisible=true;
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('submit!');
              this.NetworkEdit();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        AddsubmitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('submit!');
              this.NetworkAdd();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        AddresetForm(formName) {
          this.$refs[formName].resetFields();
        },


    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.NetworkList(pageNum,perPageNum);

       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
