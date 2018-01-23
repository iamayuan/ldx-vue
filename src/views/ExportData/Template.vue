<template>
  <section class="template">
    <div class="template-content">
        <!--id选择界面-->
        <el-table :data="templateData" borderstyle="width: 100%" >
            <el-table-column  prop="name" label="模板名称" >
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleExport(scope.row)">导出</el-button>
                  </template>
            </el-table-column>
        </el-table>

        <!--模板-->
        <el-dialog title="模板" :visible.sync="templateVisible"  @close='closeDialog'>
          <el-form ref="templateForm" :model="templateForm" label-width="130px" >
            <el-form-item  v-for="(item,index) in templatelabel":label="item.name" v-if="item.values!=null" :key="item">
              <el-select v-model="item.keyindex" placeholder="请选择"  style="width: 100%;"  @change="chooseTemValue(item.keyindex)" >
                <el-option :value="item.value" :label="item.name" v-for="(item,index) in item.values" :key="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" v-if="templatetimeshow" >
                <el-date-picker v-model="templateForm.Time"   type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width:100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('templateForm')">导出</el-button>
              <el-button @click="resetForm('templateForm')">取消</el-button>
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
        templateData:[{//模板数据
          name: '年报',
          id: '001'
        },{
            name: '周报',
            id:'002'
        },{
            name: '月报',
            id:'003'
        }],
        
        templatekey:[],
        templatelabel:[],//模板数据
        templatetimeshow:false,//模板时间
        templatekeyindex:[],
        templateVisible:false,//模板是否显示
        templateForm: {
          id:'',
          Time:'',
          region: '',
          startdate: '',
          enddate:''
        }

      }
    },
    methods: {
      //关闭弹窗
      closeDialog(){
        this.templatelabel=[];
        this.templatekey=[];
        alert('关闭我的人是傻蛋！');
      },
      //导出
      onExport(id) {
        let param =[];
        let Time = this.templateForm.Time;
        console.log('time'+Time);
        for(var item in this.templatekey){
          if(this.templatekey[item].key=='startdate'||this.templatekey[item].key=='startTime'){
            this.templatekey[item].keyindex = utils.formatDateTim(Time[0]);
          }
          if(this.templatekey[item].key=='enddate'||this.templatekey[item].key=='endTime'){
            this.templatekey[item].keyindex = utils.formatDateTim(Time[1]);
          }
          var obj ={};
          obj.index = this.templatekey[item].index;
          obj.key = this.templatekey[item].key;
          obj.value = this.templatekey[item].keyindex;
          param[item] = obj;
 
        }
        for(var i=0;i<param.length;i++){
            for(var j=0;j<param.length;j++){
                if(param[i].key==param[j].key){
                    param[j].value=param[i].value;
                }
            }
        }

        let data = param;
        /*let params={
          id:id
        }*/
        //const res = http.get(api.initTemplate, params).then(res => {
        this.$http.post('/api/data/excel/export?id='+id, data).then(res => {
            //console.log(res);
            this.templateVisible=false;
            this.$message({
                message: '导出成功',
                type: 'success'
            });
            window.open('http://localhost:8099/data/excel/download/' + res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      chooseTemValue(value){
         console.log(value);
      },
      //根据id显示模板
      initTempleate:function (id) {
        let params = {
          id:id
        };
        const res = http.get(api.initTemplate, params).then(res => {
             this.pickData(res);      
        }).catch(err => {
          //console.log(err)
        })
      },
      pickData:function (data){
        console.log(data);
        var newData =[];
        for(var item in data) {
            if(data[item].options.length>0){
                var secondArr= data[item].options;
                for(var item1 in secondArr) {
                    secondArr[item1].keyindex ='';
                    secondArr[item1].index = data[item].index;
                    this.templatekey.push(secondArr[item1]);
                    this.templatelabel.push(secondArr[item1]);
                    let associatesArr = secondArr[item1].associates;
                    if(associatesArr.length>0){
                      for(let item2 in associatesArr){
                        var obj ={};
                        obj.index = associatesArr[item2];
                        obj.key = secondArr[item1].key;
                        obj.value = secondArr[item1].values;
                        obj.keyindex ='';
                        this.templatekey.push(obj)
                      } 
                    }
                    if(secondArr[item1].key=='startdate'||secondArr[item1].key=='startTime'){
                      this.templatetimeshow=true
                    }
                    
                  
                }

            
            }
        }
        console.log(this.templatekey)
        console.log(this.templatelabel)
      },
      handleExport(row) {
        this.templateVisible=true;
        this.templateForm.id=row.id;
        this.initTempleate(row.id);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            //let id = this.templateForm.id;
            //this.onExport(id);
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
    mounted(){
      
    }
  }
</script>


