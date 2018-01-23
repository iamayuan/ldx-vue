<template>
  <section class="runone">
    <div class="runone-header">
        <el-form ref="form" :model="runoneForm" >
          <el-form-item label="反馈时间" class="w50">
               <el-date-picker v-model="runoneForm.feedbackTime" type="daterange" range-separator="至" start-placeholder="反馈开始时间" end-placeholder="反馈结束时间" class="w75">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="处理人" class="w50">
             <el-input placeholder="输入处理人"  class="w75" v-model="runoneForm.dealMan"></el-input>
          </el-form-item>
          <el-form-item label="处理状态" class="w50">
            <el-select placeholder="请选择处理状态" class="feedback-select w75" v-model="runoneForm.handleState" clearable >
                <el-option label="未处理" value="0" class="displayB"></el-option>
                <el-option label="处理中" value="1" class="displayB"></el-option>
                <el-option label="已关闭" value="2" class="displayB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="runone-content">
        <el-table 
        :data="tableData" >
            <el-table-column  prop="suggestion" label="意见反馈内容"  width="180" align="center">
            </el-table-column>
            <el-table-column prop="contactName" label="联系人" width="80" align="center">
            </el-table-column>
            <el-table-column prop="handler" label="处理人" width="120" align="center">
            </el-table-column>
            <el-table-column prop="way" label="处理方式" width="120" align="center">
            </el-table-column>
            <el-table-column prop="submitTime" label="反馈时间" width="140" align="center">
            </el-table-column>
            <el-table-column  prop="handleState" label="状态" width="80"  align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template  slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">处理</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleClose(scope.row)">关闭</el-button>
                      <el-button
                      size="small"
                      @click="handleDetail(scope.row)">详情</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="runone-pagin">
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
        <!--处理界面-->
        <el-dialog title="处理界面" :visible.sync="handFormVisible">
            <el-form :model="handForm" label-width="120px" :rules="rules" ref="handForm" >
              <el-form-item  prop="way" label="处理方式" >
                <el-select v-model="handForm.way" placeholder="请选择处理方式">
                  <el-option label="电话处理" value="电话处理"></el-option>
                  <el-option label="上门服务" value="上门服务"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="result" label="处理内容" >
                <el-input type="textarea" v-model="handForm.result"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('handForm')">立即处理</el-button>
                  <el-button @click="resetForm('handForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--详情界面-->
        <el-dialog title="详情" :visible.sync="detailFormVisible">
            
            <el-form :model="detailForm" label-width="120px" >
                <el-form-item label="手机" prop="moblie">
                    <el-input v-model="detailForm.moblie" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="openid" prop="openid">
                    <el-input v-model="detailForm.openid" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="detailForm.nickname" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="反馈内容" prop="suggest">
                    <el-input v-model="detailForm.suggest" auto-complete="off" disabled></el-input>
                </el-form-item>
                  <el-form-item label="附件">
                      <ul class="imgUl clearfix">
                        <li   v-for="item in imglist" >
                          <a :href="item.img" target="_blank">
                            <img v-bind:src="item.img">
                          </a>
                        </li> 

                      </ul>
                  </el-form-item>
            </el-form>

            <p class="hand-line">处理日志</p>
            <el-table  :data="feedbackHandleList" borderstyle="width: 100%">
                <el-table-column prop="result" label="处理结果"  >
                </el-table-column>
                <el-table-column  prop="dateLine" label="操作日期" >
                </el-table-column>
                <el-table-column  prop="handler" label="处理人" >
                </el-table-column>
                <el-table-column prop="way" label="处理方式">
               </el-table-column>
            </el-table>
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
        runoneForm:{
            feedbackTime: '',
            feedbackStart:'',
            feedbackEnd:'',
            dealMan:'',
            handleState:''
        }, 
        handFormVisible: false,//界面是否显示
        handForm: {
            way:'',   
            result:'',
            suggestId:''
        },
        detailFormVisible: false,//界面是否显示
        detailForm: {
            moblie:'',
            suggest:'',
            id:'',
            nickname:'',
            openid:''
        },
        pageNum: 1,//第几页
        total:0,
        perPageNum:20,//每页显示数
        feedbackHandleList:[],
        tableData: [],//表格数据
        imglist:[],
        rules: {
          result: [
            { required: true, message: '处理结果不能为空', trigger: 'blur' }
          ],
          way: [
            { required: true, message: '处理方式不能为空', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      getRunList:function (pageNum,perPageNum) {
        let feedbackTime =this.runoneForm.feedbackTime;
        let params = { 
          dealMan:this.runoneForm.dealMan,
          handleState:this.runoneForm.handleState,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数

        };
        if(feedbackTime!=null&&feedbackTime!=""){
          params.feedbackStart=utils.formatDateTim(feedbackTime[0]);
          params.feedbackEnd=utils.formatDateTim(feedbackTime[1])
        }else{
          params.feedbackStart='';
          params.feedbackEnd=''
        }
        const res = http.get(api.Runone, params).then(res => {
             console.log('列表',res);
             if(res.errcode=='0'){
               this.tableData=res.ret.list;
               this.total=res.ret.totalElements;
               for(var item in this.tableData){
                  //this.tableData[item].submitTime=(this.tableData[item].submitTime).slice(0,10);
                  if(this.tableData[item].handleState=='0'){
                    this.tableData[item].handleState='未处理';
                  }else if(this.tableData[item].handleState=='1'){
                    this.tableData[item].handleState='处理中';
                  }else if(this.tableData[item].handleState=='2'){
                    this.tableData[item].handleState='已关闭';
                  }
                }
            }
 
        })
      },
      getDetail:function(suggestId){
        const res = http.get(api.Runone+'/'+suggestId,'').then(res => {
             console.log('详情',res);
             if(res.errcode=='0'){
                 let userInfo = res.ret.suggestDetailDto;
                 this.detailForm.moblie= userInfo.moblie;
                 this.detailForm.suggest= userInfo.suggest;
                 this.detailForm.nickname= userInfo.nickname;
                 this.detailForm.openid = userInfo.userId;
                 this.feedbackHandleList = res.ret.suggestHandleList;
                 this.imglist = res.ret.imgList;
               }
        })
      },
      getClose:function(suggestId){
        const res = http.patch(api.Runone+'/'+suggestId,'').then(res => {
            console.log('关闭',res);
            let errcode =res.errcode;
            if(errcode=='0'){
             this.$message({
                   message: '关闭成功',
                   type: 'success'
               });
              let pageNum = this.pageNum;
              let perPageNum=this.perPageNum;
              this.getRunList(pageNum,perPageNum);
            }else{
               this.$message({
                   message: errcode,
                   type: 'error'
               });
            }  
            
             
        })
      },
      getHandle:function(suggestId){
        let params = Object.assign({}, this.handForm);
        console.log('params',params);
        const res = http.put(api.Runone, params).then(res => {
             console.log('处理',res);

             this.handFormVisible=false;
             let errcode =res.errcode;
             if(errcode=='0'){
                this.$message({
                    message: '处理成功',
                    type: 'success'
                });
               let pageNum = this.pageNum;
               let perPageNum=this.perPageNum;
               this.getRunList(pageNum,perPageNum);
             }else{
                this.$message({
                    message: errcode,
                    type: 'error'
                });
             } 

        })
      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getRunList(pageNum,val);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getRunList(val,perPageNum);
      },
      handleDetail(val){
        console.log(val);
        this.detailFormVisible=true;
        this.getDetail(val.suggestId);
      },
      handleEdit(val){
        this.handFormVisible=true;
        this.handForm.suggestId=val.suggestId;
      },
      handleClose(val) {
        this.getClose(val.suggestId);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getHandle(this.handForm.suggestId);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getRunList(pageNum,perPageNum);
      }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getRunList(pageNum,perPageNum);
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
