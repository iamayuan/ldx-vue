<template>
  <section class="headline">
    <div class="headline-header">
        <el-form ref="form" :model="headlineForm" >
          <el-form-item label="标题" class="w50">
            <el-input placeholder="输入文章标题"  class="w75" v-model="headlineForm.title"></el-input>
          </el-form-item>
          <el-form-item label="作者" class="w50">
            <el-input placeholder="输入文章作者"  class="w75" v-model="headlineForm.author"></el-input>
          </el-form-item>
          <el-form-item label="标签" class="w50">
            <el-select placeholder="请选择标签" class="wechat-select w75"  v-model="headlineForm.articleTag" clearable>
                <el-option label="未打标签" value="0" class="displayB"></el-option>
                <el-option label="精华" value="1" class="displayB"></el-option>
                <el-option label="热点" value="2" class="displayB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" class="w50">
              <el-date-picker v-model="headlineForm.actDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" class="w75">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="所属类" class="w50">
                <el-select v-model="headlineForm.articleType" multiple placeholder="请选择所属类" class="w75">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button type="primary" @click="handleEditTag" >编辑标签</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>

    <div class="headline-content">
        <el-table 
        :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column
                 type="selection"
                 width="55">
            </el-table-column>
            <el-table-column  prop="title" label="标题"  width="300" align="center">
            </el-table-column>
            <el-table-column prop="author" label="作者"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="sendTime" label="发布时间"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="articleTag" label="标签"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="articleType" label="类别"  width="120" align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope" >
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleEditType(scope.row)" >编辑类型</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="headline-pagin">
            <el-col :span="24">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="pageNum"
                  :page-sizes="[20, 40, 60, 80,100]"
                  :page-size="perPageNum"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--编辑界面1-->
        <el-dialog title="编辑类型" :visible.sync="EditTypeFormVisible" >
            <el-form :model="EditTypeForm" label-width="50px"  ref="EditTypeForm" :rules="ruleType" clearable>
                <el-form-item label="类别" prop="articleType">
                    <el-select v-model="EditTypeForm.articleType" multiple placeholder="请选择" style="width:100%;" >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="EditTypesubmitForm('EditTypeForm')">确定</el-button>
                    <el-button @click="EditTyperesetForm('EditTypeForm')">取消</el-button>
                  </el-form-item>
            </el-form>
            
        </el-dialog>
        <!--编辑界面2-->
        <el-dialog title="编辑标签" :visible.sync="EditTagFormVisible" >
            <el-form :model="EditTagForm" label-width="50px"  ref="EditTagForm"  :rules="ruleTag" >
                <el-form-item label="标签" prop="articleTag">
                  <el-select placeholder="请选择" class="wechat-select"  v-model="EditTagForm.articleTag"  style="width:100%;" clearable>
                      <el-option label="未打标签" value="0" class="displayB"></el-option>
                      <el-option label="精华" value="1" class="displayB"></el-option>
                      <el-option label="热点" value="2" class="displayB"></el-option>
                  </el-select>
                </el-form-item>
        
                <el-form-item>
                    <el-button type="primary" @click="EditTagsubmitForm('EditTagForm')">确定</el-button>
                    <el-button @click="EditTagresetForm('EditTagForm')">取消</el-button>
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
        options: [{
          value: "0",
          label: '暂无类别'
        }, {
          value: "1",
          label: '推荐阅读'
        }, {
          value: "2",
          label: '服务咨询'
        }, {
          value: "3",
          label: '电力科普'
        }],
        headlineForm:{
            title:'',
            articleTag:'',
            author:'',
            actDate:'',
            articleType:[]
        },

        pageNum: 1,//第几页
        total:0,
        multipleSelection: [],
        perPageNum:20,//每页显示数
        //表单验证
        ruleType: {
          articleType:[
            {required:true, message:'类型不能为空',trigger:'change'}
          ]
        },
        ruleTag: {
          articleTag:[
            {required:true, message:'标签不能为空',trigger:'change'}
          ]
        },
        tableData: [],
        EditTypeFormVisible: false,//编辑类型界面是否显示
        //编辑界面数据
        EditTypeForm: {
            articleType:[],
            id:''
        },
        EditTagFormVisible: false,//新增界面是否显示
        //编辑标签界面数据
        EditTagForm: {
            articleTag:''
        },
      };
    },

    methods: {
        getArticle(pageNum,perPageNum) { 
          let actDate =this.headlineForm.actDate;let articleTypeArr='';
          let length = this.headlineForm.articleType.length;
          if(length>0){
            for(let item in this.headlineForm.articleType){
              articleTypeArr+=this.headlineForm.articleType[item]+','
            }
            articleTypeArr=(articleTypeArr.substring(articleTypeArr.length-1)==',')?articleTypeArr.substring(0,articleTypeArr.length-1):articleTypeArr;
          }else{
            articleTypeArr='';
          };
          let params = { 
            title:this.headlineForm.title,
            author:this.headlineForm.author,
            articleType:articleTypeArr,
            articleTag:this.headlineForm.articleTag,
            pageNum:pageNum,
            perPageNum:perPageNum//每页显示的个数

          };

          if(actDate!=null&&actDate!=""){
            params.startTime=utils.formatDateTim(actDate[0]);
            params.endTime=utils.formatDateTim(actDate[1])
          }else{
            params.startTime='';
            params.endTime=''
          }
          console.log('params',params);
          const res = http.get(api.getHeadlines, params).then(res => {
              console.log('列表',res);
               this.tableData=res.ret.list;
               this.total=res.ret.totalElements;
               for(let item in this.tableData){
                if(this.tableData[item].articleType==0){
                  this.tableData[item].articleType="暂无类别";
                }else if(this.tableData[item].articleType==1){
                  this.tableData[item].articleType="推荐阅读";
                }else if(this.tableData[item].articleType==1){
                  this.tableData[item].articleType="服务咨询";
                }else{
                  this.tableData[item].articleType="电力科普";
                }
                if(this.tableData[item].articleTag==0){
                  this.tableData[item].articleTag="未打标签";
                }else if(this.tableData[item].articleTag==1){
                  this.tableData[item].articleTag="精华";
                }else{
                  this.tableData[item].articleTag="热点";
                }
                this.tableData[item].sendTime=utils.formatDateTim(this.tableData[item].sendTime.time)
              }
          })
        },
        ArtModtype(contenRef) {

          let length = this.EditTypeForm.articleType.length;let articleTypeArr='';
          if(length>0){
            for(let item in this.EditTypeForm.articleType){
              articleTypeArr+=this.EditTypeForm.articleType[item]+','
            }
            articleTypeArr=(articleTypeArr.substring(articleTypeArr.length-1)==',')?articleTypeArr.substring(0,articleTypeArr.length-1):articleTypeArr;
          }else{
            articleTypeArr='';
          };
          let params={
            id:this.EditTypeForm.id,
            tag:articleTypeArr
          };
          console.log(params);
          const res = http.patch(api.getHeadlinesType, params).then(res => { 
               console.log('编辑类型',res);
               this.EditTypeFormVisible=false;
               let errcode =res.errcode;
               if(errcode=='0'){
                  this.$message({
                      message: '编辑成功',
                      type: 'success'
                  });
                  let pageNum = this.pageNum;
                  let perPageNum=this.perPageNum;
                  this.getArticle(pageNum,perPageNum);
               }else{
                  this.$message({
                      message: errcode,
                      type: 'error'
                  });
               }
               
          })
        },
        ArtModtag(ids,tag) {//编辑标签
          let idArr=[];
          for(let item in ids){
            idArr.push(ids[item].uuid)
          };
          let params={
            ids:idArr,
            tag:tag
          };
          const res = http.patch(api.getHeadlinesTag, params).then(res => { 
               console.log('编辑标签',res);
               this.EditTagFormVisible=false;
               let errcode =res.errcode;
               if(errcode=='0'){
                  this.$message({
                      message: '编辑成功',
                      type: 'success'
                  });
                  let pageNum = this.pageNum;
                  let perPageNum=this.perPageNum;
                  this.getArticle(pageNum,perPageNum);
               }else{
                  this.$message({
                      message: errcode,
                      type: 'error'
                  });
               }
               
          })
        },
        handleEditTag() {
          let length= this.multipleSelection.length;let articleTagArr='';
           if (length>0) {
            console.log('yes');
            console.log(this.multipleSelection);
            this.EditTagFormVisible=true;
           } else {
              console.log('no');
              this.$message({
                message: '请先选择一个头条',
                type: 'warning'
              });
           }
         },
        handleSelectionChange(val) {
           this.multipleSelection = val;
           console.log(val);
        },
        handleSizeChange(val) {
          let pageNum = this.pageNum;
          this.perPageNum=val;
          this.getArticle(pageNum,val);
        },
        handleCurrentChange(val) {
          let perPageNum=this.perPageNum;
          this.pageNum=val;
          this.getArticle(val,perPageNum);
        },
        handleEditType(row) {
          console.log(row,row.title);
          this.EditTypeFormVisible=true;
          this.EditTypeForm.id =row.uuid;
          
        },
        onQuery(){
          let pageNum = this.pageNum;
          let perPageNum=this.perPageNum;
          this.getArticle(pageNum,perPageNum);
        },
        EditTypesubmitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('submit!');
              this.ArtModtype();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        EditTyperesetForm(formName) {
          this.$refs[formName].resetFields();
        },
        EditTagsubmitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('submit!');  
              this.ArtModtag(this.multipleSelection,this.EditTagForm.articleTag);
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        EditTagresetForm(formName) {
          this.$refs[formName].resetFields();
        }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getArticle(pageNum,perPageNum);       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
