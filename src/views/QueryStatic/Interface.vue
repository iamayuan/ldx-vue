<template>
  <section class="interface">
    <div class="interface-header">
        <el-form ref="form" :model="interfaceForm" >
          <el-form-item label="统计接口" class="w50">
            <el-select v-model="interfaceForm.api" multiple collapse-tags placeholder="请选择" class="w75">
              <el-option :value="item.names" :label="item.names"  :key="item.key" v-for="item in interfaceList"  class="displayB"> </el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label="统计时间" class="w50">
              <el-date-picker v-model="interfaceForm.Time"   type="daterange" range-separator="至" start-placeholder="统计开始时间" end-placeholder="统计结束日期" class="w75"></el-date-picker>

          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="interface-content">
        <el-col :span="12">
          <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartLine" style="width:100%; height:400px;"></div>
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
        interfaceList:[],
        interfaceForm:{
            api: [],
            Time: '',

        },
        chartLine:null,
        chartPie:null
      };
    },
    methods: {

      getInterfaceList:function () {
        let params = '';
        const res = http.get(api.getInterfaceList, params).then(res => {
              console.log('apiList',res)
              let list =res.ret.list;
              let interfaceList= [];
              for(var item in list){
                var obj = {};
                obj.names = list[item];
                obj.keyindex ='';
                interfaceList[item] = obj

             }
             this.interfaceList=interfaceList;
             this.interfaceForm.api.push(interfaceList[0].names);
             this.interfaceForm.api.push(interfaceList[1].names);
             console.log('api',this.interfaceForm.api);
             this.getinterfaceCount(this.interfaceForm.api,this.interfaceForm.Time);
             

        })
      },
      getinterfaceCount:function (functionName,time) {
        let Time =time;let params={};
        if(Time!=null&&Time!=""){
          params.startTime='2017-11-25';//utils.formatDateTim(Time[0]);//'2017-11-25'
          params.endTime='2017-12-01'//utils.formatDateTim(Time[1])//'2017-12-01'
        }else{
          params.startTime='';
          params.endTime=''
        }
        params.functionName=functionName;
        let chartPieData=[],chartLineData=[],dateData=[];
        let _this = this;
        console.log('params',params);
        const res = http.get(api.getInterfaceCount, params).then(res => {
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
      //折线图
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
      //饼图
      drawPieChart(data) {
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series: [
                  {
                      name: '接口访问',
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
         this.getinterfaceCount(this.interfaceForm.api,this.interfaceForm.Time);
      }
    },

  mounted: function () {
    var date= utils.getWeek();
    var date1= date[0],date2=date[1];
    this.interfaceForm.Time=[new Date(date1), new Date(date2)];
    this.getInterfaceList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
