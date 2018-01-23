<template>
  <section class="error">
    <div class="error-header">
        <el-form ref="form" :model="errorForm" >
          <el-form-item label="接口编码" class="w50">
            <el-select v-model="errorForm.code" multiple collapse-tags placeholder="请选择" class="w75" >
              <el-option :value="item.names" :label="item.names"  :key="item.key" v-for="item in errorList"  class="displayB"> </el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label="统计时间" class="w50">
              <el-date-picker v-model="errorForm.Time"   type="daterange" range-separator="至" start-placeholder="统计开始时间" end-placeholder="统计结束日期" class="w75"></el-date-picker>
          </el-form-item>
          <el-form-item label="入参" class="w50">
               <el-input placeholder="请输入入参包含字符"  class="w75" v-model="errorForm.inParam"></el-input>
          </el-form-item>
          <el-form-item label="出参" class="w50">
              <el-input placeholder="请输入出参包含字符"  class="w75" v-model="errorForm.outParam"></el-input>
              
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="error-content">
        <el-col :span="12">
          <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-col>        
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
        dateData:[],
        errorList:[],
        errorForm:{
            code: [],
            Time: '',
            inParam:'',
            outParam:'',
        }, 
        chartLine: null,
        chartPie: null
      };
    },
    methods: {
      getInterfaceList:function () {
        const res = http.get(api.getInterfaceList, '').then(res => {
            console.log('interfaceList',res);
             let list =res.ret.list;
             let errorList= [];
             for(var item in list){
                var obj = {};
                obj.names = list[item];
                obj.keyindex ='';
                errorList[item] = obj

             }
             this.errorList=errorList;
             this.getExceptionCount(this.errorForm.code,this.errorForm.Time);
             

        })
      },
      getExceptionCount:function (functionName,time) {
        let Time =time;let params={};
        if(functionName.length!=0){
          params.functionName=functionName
        }
        if(Time!=null&&Time!=""){
          params.startTime=utils.formatDateTim(Time[0]);//2017-11-25'
          params.endTime=utils.formatDateTim(Time[1])//'2017-12-01'
        }else{
          params.startTime='';
          params.endTime=''
        }
        if(this.errorForm.inParam!=''){
          params.inParam= '%'+this.errorForm.inParam+'%'
        }
        if(this.errorForm.outParam!=''){
           outParam:'%'+this.errorForm.outParam+'%'
        }
        
        let chartPieData=[],chartLineData=[],dateData=[];
        let _this = this;
        const res = http.get(api.getExceptionCount, params).then(res => {
             console.log('列表',res);
             let pieData = res.ret.list;
             for(let item in pieData){
               let num=0;
               let obj={};
               let obj1={};
               for(let item1 in pieData[item].num){
                 num+=parseInt(pieData[item].num[item1]);
               }
               for(let item2 in pieData[item].dataTime){
                 dateData.push(pieData[item].dataTime[item2]);
               }
               obj.name=pieData[item].name,
               obj.value =num;
               obj1.name=pieData[item].name,
               obj1.data =pieData[item].num;
               obj1.type="line";
               chartPieData.push(obj);
               chartLineData.push(obj1);
               console.log(chartLineData)
             }
             _this.dateData= dateData;
             _this.drawPieChart(chartPieData);
             _this.drawLineChart(chartLineData);
        })


      },
      drawLineChart(data) {
          this.chartLine = echarts.init(document.getElementById('chartLine'));
          this.chartLine.setOption({
              title: {
                  text: ''
              },
              tooltip: {
                  trigger: 'axis'
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: this.dateData
              },
              yAxis: {
                  type: 'value'
              },
              series: data
          });
      },
      drawPieChart(data) {
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series: [
                  {
                      name: '错误日志',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data: data,
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          });
      },
      onQuery(){
        this.getExceptionCount(this.errorForm.code,this.errorForm.Time);
      }
    },

  mounted: function () {
    var date= utils.getWeek();
    var date1= date[0],date2=date[1];
    this.errorForm.Time=[new Date(date1), new Date(date2)];
    this.getInterfaceList();

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
