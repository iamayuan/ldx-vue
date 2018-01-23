<template>
  <section class="activity">
    <div class="activity-header">
        <el-form ref="form" :model="activityForm" >
          <el-form-item label="活动标题" class="w50">
            <el-input placeholder="输入活动标题"  class="w75" v-model="activityForm.title"></el-input>
          </el-form-item>
          <el-form-item label="活动状态" class="w50">
            <el-select placeholder="未开始" class="wechat-select w75" v-model="activityForm.state" clearable>
                <el-option label="未开始" value="0" class="displayB"></el-option>
                <el-option label="已开始" value="1" class="displayB"></el-option>
                <el-option label="已结束" value="2" class="displayB"></el-option>
                <el-option label="已暂停" value="3" class="displayB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" class="w50">
              <el-date-picker v-model="activityForm.actDate" type="daterange" range-separator="至" start-placeholder="活动开始时间" end-placeholder="活动结束时间" class="w75">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="活动区域" class="w50">
              <el-select v-model="activityForm.region" placeholder="请选择活动区域" class="w75" clearable>
                <el-option :label="item.regionName" :value="item.regionCode" v-for="item in regions" :key="item.regionCode"></el-option>
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
    <div class="activity-content">
        <el-table :data="tableData" borderstyle="width: 100%" >
            <el-table-column  prop="activityTitle" label="活动标题" width="140" align="center">
            </el-table-column>
            <el-table-column prop="startDate" label="活动开始时间"  width="120" align="center">
            </el-table-column>
            <el-table-column  prop="endDate" label="活动结束时间"   width="120" align="center">
            </el-table-column>
            <el-table-column  prop="regionName" label="活动区域"   width="180" align="center">
            </el-table-column>
            <el-table-column  prop="remainTime" label="剩余天数"   width="120" align="center">
            </el-table-column>
            <el-table-column  prop="optState" label="活动状态"   width="100" align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleChangeAct(scope.row,'0')" v-if="scope.row.option=='停止'">{{scope.row.option}}</el-button>
                    <el-button
                      size="small"
                      @click="handleChangeAct(scope.row,'1')" v-if="scope.row.option=='开始'">{{scope.row.option}}</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)">删除</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="activity-pagin">
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
        <!--新增活动界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" >
            <el-form :model="addForm" label-width="120px"  ref="addForm" >
                <el-form-item label="活动标题" prop="activityTitle">
                    <el-input v-model="addForm.activityTitle"></el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="activityDesc">
                    <el-input v-model="addForm.activityDesc" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="actDate">
                    <el-date-picker v-model="addForm.actDate" type="daterange" range-separator="至" start-placeholder="活动开始时间" end-placeholder="活动结束时间" >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="活动链接" prop="activityPage">
                    <el-input v-model="addForm.activityPage" ></el-input>
                </el-form-item>
                <el-form-item label="活动图片" >
                    <div class="el-upload el-upload--text">
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                      <input type="file" @change="getFile($event)" class="avatar-input">
                    </div>
                    <div class="imgSrc" v-if="imgPre">  
                      <span style="white-space:pre;"> </span><img :src="imgDataUrl" >  
                    </div>
                </el-form-item>
                 <el-form-item label="活动城市" >
                  <el-checkbox :indeterminate="isIndeterminate" v-model="addForm.checkAll" @change="handleCheckAllChange">浙江省</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="addForm.regions" @change="handleCheckedCitiesChange">
                     <el-checkbox  :label="item" :key="" v-for="item in cityOptions"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
                    <el-button @click="resetForm('addForm')">取消</el-button>
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
        imgDataUrl:'',
        file: '',
        imgPre:false,
        activityForm:{
            actDate:'',
            start: '',
            end: '',
            title:'',
            state:'',
            region:''
        },

        isIndeterminate: true,
        regions:[],
        cityOptions:[],
        rules: {
          activityTitle: [
            { required: true, message: '请输入活动名称' }
          ],
          regions: [
            { type: 'array', required: true, message: '请至少选择一个活动城市', trigger: 'change' }
          ],
          actDate:[
            { type: 'array', required: true,message: '请选择日期范围', trigger: 'change'}
          ],
          activityPage: [
            { required: true, message: '请选择活动链接'}
          ],
          activityDesc: [
            { required: true, message: '请填写活动描述' }
          ]
        },
        pageNum: 1,//第几页
        total:0,
        tableData: [],
        multipleSelection:[],
        perPageNum:20,//每页显示数
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        //新增界面数据
        addForm: {
            activityTitle: '',
            activityDesc:'',
            actDate:'',
            activityPage:'',
            file:'',
            start: '',
            end: '',
            regions:['杭州市'],//默认选中的复选框的值
            checkAll:false
        },
      };
    },
    methods: {
      getFile(event) {
        if(event.target.files.length>0){  
        this.addForm.file = event.target.files[0];  //提交的图片
        console.log(this.file);  
        this.getBase64(event.target,(url)=>{  
            this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片 
            this.imgPre=true; 
        });   
   
        }
      },
      getBase64:function(file,callback){  
          var maxWidth = 640;  
          if(file.files && file.files[0]){  
              var thisFile = file.files[0];  
              if(thisFile.size>2019200){  
                  // mualert.alertBox("图片不能超过800K");  
                  alert("图片不能超过2M");  
                  return  
              };  
              var reader = new FileReader();  
              reader.onload = function(event){  
                  var imgUrl = event.target.result;  
                  var img = new Image();  
                  img.onload = function(){  
                      var canvasId = 'canvasBase64Imgid',  
                      canvas = document.getElementById(canvasId);  
                      if(canvas!=null){document.body.removeChild(canvas);}  
                      var canvas = document.createElement("canvas");  
                      canvas.innerHTML = 'New Canvas';  
                      canvas.setAttribute("id", canvasId);  
                      canvas.style.display='none';  
                      document.body.appendChild(canvas);  
                      canvas.width = this.width;  
                      canvas.height = this.height;  
                      var imageWidth = this.width,   
                      imageHeight = this.height;  
                      if (this.width > maxWidth){  
                          imageWidth = maxWidth;  
                          imageHeight = this.height * maxWidth/this.width;  
                          canvas.width = imageWidth;  
                          canvas.height = imageHeight;  
                      }  
                      var context = canvas.getContext('2d');  
                      context.clearRect(0, 0, imageWidth, imageHeight);  
                      context.drawImage(this, 0, 0, imageWidth, imageHeight);  
                      var base64 = canvas.toDataURL('image/png',1);  
                      var imgbase = base64.substr(22);  
                      callback(imgbase)    
                  }  
                  img.src = imgUrl;  
              }  
              reader.readAsDataURL(file.files[0]);  
          }  //转换成base64
      },
      getActivityList:function (pageNum,perPageNum) {
        let actDate =this.activityForm.actDate;
        let params = { 
          title:this.activityForm.title,
          optState:this.activityForm.state,
          region:this.activityForm.region,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数

        };
        if(actDate!=null&&actDate!=""){
          params.start=utils.formatDateTim(actDate[0]);
          params.end=utils.formatDateTim(actDate[1])
        }else{
          params.start='';
          params.end=''
        }
        const res = http.get(api.Activities, params).then(res => {
             console.log('列表',res);
             if(res.errcode=='0'){
                this.tableData=res.ret.list;
                this.total=res.ret.totalElements;
                for(var item in this.tableData){
                   this.tableData[item].startDate=(this.tableData[item].startDate).slice(0,10);
                   this.tableData[item].endDate=(this.tableData[item].endDate).slice(0,10);
                   if(this.tableData[item].optState=='0'){
                     this.tableData[item].optState='未开始';
                     this.tableData[item].option='';
                   }else if(this.tableData[item].optState=='1'){
                     this.tableData[item].optState='已开始';
                     this.tableData[item].option='停止';
                   }else if(this.tableData[item].optState=='2'){
                     this.tableData[item].optState='已结束';
                     this.tableData[item].option='';
                   }else if(this.tableData[item].optState=='3'){
                     this.tableData[item].optState='已暂停';
                     this.tableData[item].option='开始';
                   }
                 }
             }
             
        })
      },
      queryWidget:function () {
        const res = http.get(api.Regions, '').then(res => {
             console.log('区域',res);
             let widget=res.ret.list;
             this.regions= widget;
             for(let item in widget){
               if(widget[item].regionCode=='330000'){
                  widget.splice(item,1);

               }
               this.cityOptions.push(widget[item].regionName)

             }
        })
      },
      addAct:function(){
        let actDate =this.addForm.actDate;
        let regions= this.pickRegions(this.addForm.regions);
        let params = { 
          activityTitle:this.addForm.activityTitle,
          activityDesc:this.addForm.activityDesc,
          activityPage:this.addForm.activityPage,
          regions:regions
        };
        if(actDate!=null&&actDate!=""){
          params.startDate=utils.formatDateTim(actDate[0]);
          params.endDate=utils.formatDateTim(actDate[1])
        }else{
          params.startDate='';
          params.endDate=''
        }
        let formData = new FormData();

        formData.append('activityDesc', params.activityDesc);
        formData.append('activityTitle', params.activityTitle);
        formData.append('start', params.startDate);
        formData.append('end', params.endDate);
        formData.append('activityPage', params.activityPage);
        formData.append('regions',params.regions);
        formData.append('img', this.addForm.file);
        console.log('formData',formData);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let _this =this;
        this.$http.post('/api/operations/activities', formData, config).then(function (res) {
          console.log(res);
          _this.addFormVisible=false;
          if(res.data.errcode=='0'){
             _this.$message({
                 message: '新增成功',
                 type: 'success'
             });
              let pageNum =  _this.pageNum;
              let perPageNum= _this.perPageNum;
              this.getActivityList(pageNum,perPageNum);
          }else{
             _this.$message({
                 message: errcode,
                 type: 'error'
             });
          }  
        })
        /*const res = http.post(api.Activities, params).then(res => {
            console.log('新增',res);
            this.addFormVisible=false;
            if(errcode=='0'){
               this.$message({
                   message: '新增成功',
                   type: 'success'
               });
                let pageNum = this.pageNum;
                let perPageNum=this.perPageNum;
                this.getActivityList(pageNum,perPageNum);
            }else{
               this.$message({
                   message: errcode,
                   type: 'error'
               });
            }  
        })*/

      },
      deleteAct:function(id){
        const res = http.adelete(api.Activities+'/'+id, '').then(res => {
            console.log('删除',res);
            if(res.errcode=='0'){
               this.$message({
                   message: '删除成功',
                   type: 'success'
               });
                let pageNum = this.pageNum;
                let perPageNum=this.perPageNum;
                this.getActivityList(pageNum,perPageNum);
            }else{
               this.$message({
                   message: errcode,
                   type: 'error'
               });
            }
             
        })
      },
      changeAct:function(id,state){
          const res = http.patch(api.Activities+'/'+id+'?state='+state, '').then(res => {
              console.log('停止',res);
             if(res.errcode=='0'){
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                 let pageNum = this.pageNum;
                 let perPageNum=this.perPageNum;
                 this.getActivityList(pageNum,perPageNum);
             }else{
                this.$message({
                    message: errcode,
                    type: 'error'
                });
             }
               
          })
      },
      handleCheckAllChange(val) {
        this.addForm.regions = val ? this.cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value);
        let checkedCount = value.length;
        this.addForm.checkAll = checkedCount === this.cityOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cityOptions.length;
      },
      pickRegions(data){
          let codeRegionsArr=[];
          let codeRegions='';
          for(let item in data){
              if(data[item]=='杭州市'){
                  codeRegionsArr[item]='330100';
              }
              if(data[item]=='宁波市'){
                  codeRegionsArr[item]='330200';
              }
              if(data[item]=='温州市'){
                  codeRegionsArr[item]='330300';
              }
              if(data[item]=='嘉兴市'){
                  codeRegionsArr[item]='330400';
              }
              if(data[item]=='湖州市'){
                  codeRegionsArr[item]='330500';
              }
              if(data[item]=='绍兴市'){
                  codeRegionsArr[item]='330600';
              }
              if(data[item]=='金华市'){
                  codeRegionsArr[item]='330700';
              }
              if(data[item]=='衢州市'){
                  codeRegionsArr[item]='330800';
              }
              if(data[item]=='舟山市'){
                  codeRegionsArr[item]='330900';
              }
              if(data[item]=='台州市'){
                  codeRegionsArr[item]='331000';
              }
          }
          for(let item in codeRegionsArr){
            codeRegions+=codeRegionsArr[item]+','
          }
          debugger;
          codeRegions.substring(0,codeRegions.length - 1);
          return  codeRegions;

      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getActivityList(pageNum,val);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getActivityList(val,perPageNum);
      },
      handleChangeAct(row,state) {//0  停止;1  开始
        console.log(row);
        let id =row.activityId;
        this.changeAct(id,state);
      },
      handleDelete(row) {
        console.log(row);
        let id =row.activityId;
        this.deleteAct(id);
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getActivityList(pageNum,perPageNum);
      },
      onAdd(){
        this.addFormVisible=true;
        
      },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.addAct();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getActivityList(pageNum,perPageNum);
        this.queryWidget();
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
