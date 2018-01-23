<template>
  <section class="help">
    <div class="help-header">

        <el-form ref="form" :model="helpForm" >
            <el-form-item label="标题" class="w50">
            <el-input placeholder="输入使用帮助标题"  class="w75" v-model="helpForm.title"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="w50">
            <el-select placeholder="未发布" class="wechat-select w75" v-model="helpForm.state" clearable >
                <el-option label="已发布" value="1" class="displayB"></el-option>
                <el-option label="未发布" value="2" class="displayB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" class="w50">
              <el-date-picker v-model="helpForm.actDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" class="w75">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="所属类" class="w50">
                <el-cascader
                  :options="options"
                  @change="handleItemChange"
                  v-model="helpForm.selectedOptions"
                clearable  class="w75"></el-cascader>
           </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button type="primary" @click="onAdd">添加</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="help-content">
        <el-table 
        :data="tableData">
            <el-table-column  prop="title" label="标题"  width="400" align="center">
            </el-table-column>
            <el-table-column prop="categoryId" label="所属类"  width="100" align="center">
            </el-table-column>
            <el-table-column  prop="updateTime" label="发布时间"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="state" label="状态"  width="100" align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope" >
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)" disabled v-if="scope.row.state=='已发布'">编辑</el-button>
                     <el-button
                      size="small"
                      @click="handleEdit(scope.row)" v-if="scope.row.state=='未发布'">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)" disabled v-if="scope.row.state=='已发布'">删除</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)"  v-if="scope.row.state=='未发布'">删除</el-button>
  
                    <el-button
                      size="small"
                      @click="handlePub(scope.row)" v-if="scope.row.option=='发布'">{{scope.row.option}}</el-button>
                    <el-button
                      size="small"
                      @click="handleCancel(scope.row)" v-if="scope.row.option=='撤销'">{{scope.row.option}}</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="help-pagin">
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
        <el-dialog title="编辑" :visible.sync="EditFormVisible" >
            <el-form :model="EditForm" label-width="50px"  ref="EditForm"  :rules="rulesm" >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="EditForm.title"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="selectedOptions">
                    <el-cascader
                      :options="options"
                      @change="handleItemChange"
                      v-model="EditForm.selectedOptions"
                    ></el-cascader>
                </el-form-item>
                <!--使用编辑器-->
                <el-form-item label="内容" prop="detail">
                    <div class="edit_container">
                        <quill-editor v-model="EditForm.detail"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption"
                            @ready="onEditorReady($event)">
                        </quill-editor>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('EditForm')">确定</el-button>
                    <el-button @click="resetForm('EditForm')">取消</el-button>
                  </el-form-item>
            </el-form>
            
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" >
            <el-form :model="addForm" label-width="50px"  ref="addForm"  :rules="rules" >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="selectedOptions">
                    <el-cascader
                      :options="options"
                      @change="handleItemChange"  v-model="addForm.selectedOptions"
                    ></el-cascader>
                </el-form-item>
                <!--使用编辑器-->
                <el-form-item label="内容" prop="detail">
                    <div class="edit_container">
                        <quill-editor v-model="addForm.detail"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption"
                            @ready="onEditorReady($event)">
                        </quill-editor>
                    </div>
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
import utils from '@/utils/utils'
import http from '@/utils/http'
import api from '@/api/api'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
export default {
    data() {
      return {
        editorOption: {
              
        },
        helpForm:{
            title:'',
            state:'',
            selectedOptions:[],
            actDate:''
        }, 
        pageNum: 1,//第几页
        total:0,
        multipleSelection:[],
        perPageNum:20,//每页显示数
        options: [],//所属类分级器
        //表单验证
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          selectedOptions:[
            {required:true, message:'请选择所属类',trigger:'change'}
          ],
          detail: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
        rulesm: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          selectedOptions:[
            {required:true, message:'请选择所属类',trigger:'change'}
          ],
          detail: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
        options1:[],
        options2:[],
        tableData: [],
        EditFormVisible: false,//新增界面是否显示
        //新增界面数据
        EditForm: {
            title: '',
            categoryId:'',
            detail:'',
            contentRef: '',
            id: '',
            selectedOptions:[]
        },
        addFormVisible: false,//新增界面是否显示
        //新增界面数据
        addForm: {
            title: '',
            categoryId:'',
            detail:'',
            selectedOptions:[]
        },
      };
    },
    components: {
    //使用编辑器
      quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },

    methods: {
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        submit(){
              console.log(this.content);
              this.$message.success('提交成功！');
        },
        guideAll:function () {
          let params='';
          const res = http.get(api.Category, params).then(res => {
               console.log('all',res);
               let business = res.ret.business;
               let guide = res.ret.guide;
               for(let item in  business){
                let obj={};
                obj.label = business[item].name;
                obj.id = business[item].id;
                obj.category = business[item].category;
                obj.value = business[item].id;
                this.options1.push(obj);
               }
               for(let item in  guide){
                let obj={};
                obj.label = guide[item].name;
                obj.id = guide[item].id;
                obj.category = guide[item].category;
                obj.value =  guide[item].id;
                this.options2.push(obj);
               }
               this.options.push({value: 2,label:'常见问题',children:this.options1});
               this.options.push({value: 1,label:'业务指南',children:this.options2});
          })
        },
        guideQuery:function (pageNum,perPageNum) {
          let actDate =this.helpForm.actDate;
          let category = this.helpForm.selectedOptions;
          let params = {
            title:this.helpForm.title,
            state:this.helpForm.state,
            firstCategory:(category[0]==undefined)?'':category[0],
            secondCategory:(category[1]==undefined)?'':category[1],
            page:pageNum,
            size:perPageNum//每页显示的个数
          };
          if(actDate!=null&&actDate!=""){
            params.publishTimeBegin=utils.formatDateTim(actDate[0]);
            params.publishTimeEnd=utils.formatDateTim(actDate[1])
          }else{
            params.publishTimeBegin='';
            params.publishTimeEnd=''
          }
          const res = http.get(api.guideQuery, params).then(res => {
               console.log('列表',res);
               if(res.errcode=='0'){
                  this.tableData=res.ret.list;
                  this.total=res.ret.totalElements;
                  for(let item in this.tableData){
                   if(this.tableData[item].state==1){
                     this.tableData[item].state="已发布";
                     this.tableData[item].option='撤销';
                   }else{
                     this.tableData[item].state="未发布";
                     this.tableData[item].option='发布';
                   }
                   this.tableData[item].updateTime=utils.formatDateTim(this.tableData[item].updateTime)
                  }
               }
               
          })
        },
        guideDetail:function (id) {
          const res = http.get(api.guideQuery+'/'+id, '').then(res => {
               console.log('详情',res);
               let content = res.ret.content;
               this.EditForm.detail=content;
          })
        },
        guideEdit:function () {
          let params={
            id:this.EditForm.id,
            title:this.EditForm.title,
            categoryId:this.EditForm.selectedOptions[1],
            detail:this.EditForm.detail
          };
          const res = http.post(api.guideEdit, params).then(res => { 
               console.log('编辑',res);
               this.EditFormVisible=false;
               let errcode =res.data.errcode;
               if(errcode=='0'){
                  this.$message({
                      message: '编辑成功',
                      type: 'success'
                  });
                  let pageNum = this.pageNum;
                  let perPageNum=this.perPageNum;
                  this.guideQuery(pageNum,perPageNum);
               }else{
                  this.$message({
                      message: errcode,
                      type: 'error'
                  });
               }
               
          })
        },
        guideAdd:function () {
          let params={
            title:this.addForm.title,
            categoryId:this.addForm.selectedOptions[1],
            detail:this.addForm.detail
          };
          let params1 = Object.assign({}, this.addForm);
          const res = http.post(api.guideQuery, params).then(res => {
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
                  this.guideQuery(pageNum,perPageNum);
               }else{
                  this.$message({
                      message: errcode,
                      type: 'error'
                  });
               }
          })
        },
        guideDele:function (id) {
          const res = http.adelete(api.guideQuery+'/'+id, '').then(res => {
            console.log('删除',res);
            if(res.errcode=='0'){
              this.$message({
                  message: '删除成功',
                  type: 'success'
              });
              let pageNum = this.pageNum;
              let perPageNum=this.perPageNum;
              this.guideQuery(pageNum,perPageNum);
            }
          })
        },

        guideChangeState:function (id,state) {
            let params={
              guideId:id,
              state:state
            }
         const res = http.put(api.guideQuery, params).then(res => { 
            console.log('操作',res);
            if(res.errcode=='0'){
              this.$message({
                  message: '操作成功',
                  type: 'success'
              });
              let pageNum = this.pageNum;
              let perPageNum=this.perPageNum;
              this.guideQuery(pageNum,perPageNum);
            }  
          })
        },
        handleItemChange(val) {
          console.log('active item:', val);
          this.helpForm.classArr=val;
        },

        handleSizeChange(val) {
          let pageNum = this.pageNum;
          this.perPageNum=val;
          this.guideQuery(pageNum,val);
        },
        handleCurrentChange(val) {
          let perPageNum=this.perPageNum;
          this.pageNum=val;
          this.guideQuery(val,perPageNum);
        },
        handleEdit(row) {
          console.log(row);
          this.EditFormVisible=true;
          this.EditForm.title=row.title;
          this.EditForm.id =row.id;
          this.EditForm.contentRef = row.contentRef;
          console.log(this.EditForm.contentRef);
          if((row.categoryId).indexOf('2')>-1){
            this.EditForm.selectedOptions[0]=2;
          }else{
            this.EditForm.selectedOptions[0]=1;
          }
          this.EditForm.selectedOptions[1]= row.categoryId;
          
          this.guideDetail(this.EditForm.id);
        },
        handleDelete(row) {
          console.log( row);
          this.guideDele(row.id);
        },
        handleCancel(row){
          console.log('row',row);
          this.guideChangeState(row.id,2);
        },
        handlePub(row){
          this.guideChangeState(row.id,1);
        },
        onQuery(){
          let pageNum = this.pageNum;
          let perPageNum=this.perPageNum;
          this.guideQuery(pageNum,perPageNum);
        },
        onAdd(){
          this.addFormVisible=true;
        
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('submit!');
              let contentRef=this.EditForm.contentRef;
              this.guideEdit(contentRef);
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
              console.log('submit!');
              this.guideAdd();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        addresetForm(formName) {
          this.$refs[formName].resetFields();
        },
        onExport(){
          console.log(`导出`);
        }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.guideAll();
        this.guideQuery(pageNum,perPageNum);
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
