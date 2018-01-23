<template>
  <section class="page">
    <div class="page-header">
        <el-form ref="form" :model="pageForm" >
            <el-form-item  label="统计页面" class="w50" >
              <el-select v-model="pageForm.select" placeholder="请选择" class="w75">
                <el-option :value="item.names" :label="item.names"  :key="item.key" v-for="item in functionList"  class="displayB"> </el-option> 
              </el-select>
            </el-form-item> 
          </el-form-item>
          <el-form-item label="统计时间" class="w50">
              <el-date-picker v-model="pageForm.Time" type="daterange" range-separator="至" start-placeholder="统计开始时间" end-placeholder="统计结束日期" class="w75">
              </el-date-picker>
              
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="page-content">
        <el-col :span="12">
          <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-col>
        
        <el-col :span="8">
          <div id="chartPie1" style="width:100%; height:400px;"></div>
          <div id="chartPie2" style="width:100%; height:400px;"></div>
          <div id="chartPie3" style="width:100%; height:400px;"></div>
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
        functionList:[],
        chartPieData:[],
        pageForm:{
            pages: '',
            Time: '',
            select:''
        }, 
        chartLine: null,
        chartPie: null,
        chartPie1: null,
        chartPie2: null,
        chartPie3: null
      };
    },
    methods: {
      getFunctionList:function () {
        let params = '';
        const res = http.get(api.getFunctionList, params).then(res => {
          console.log('functionnList',res)
             let list =res.ret.list;
             let functionList= [];
             for(var item in list){
                var obj = {};
                obj.names = list[item];
                obj.keyindex ='';
                functionList[item] = obj

             }
             this.functionList=functionList;
             this.pageForm.select=this.functionList[0];
             this.getFunctionCount(functionList[0].names,this.pageForm.Time);
             

        })
      },
      getFunctionCount:function (functionName,time) {
        let Time =time;let params={};
        params.functionName=functionName
        if(Time!=null&&Time!=""){
          params.startTime='2017-11-25';//utils.formatDateTim(Time[0]);
          params.endTime='2017-12-01'//utils.formatDateTim(Time[1])
        }else{
          params.startTime='';
          params.endTime=''
        }
        console.log('params',params);


       const res = http.get(api.getFunctionCount, params).then(res => {
            console.log('列表',res);
            var num1=0,num2=0,num3=0;
            let chartPieData1=[],chartPieData2=[],chartPieData3=[],chartPieData=[],chartLineData=[],dateData=[],chartPieDatas=[],data1=[],data2=[],data3=[];
            var date =res.ret.date;
            var dataList =res.ret.data;
            for(var item in date){
              dateData.push(date[item]);

            }

            for(var item in dataList){
              let num =0;let num1=0;
              let obj={},objl={};
              for(let item1 in dataList[item].data){
                  num+=parseInt(dataList[item].data[item1]);
              }
              obj.name=dataList[item].name,
              obj.value =num;
              objl.name=dataList[item].name,
              objl.data =dataList[item].data;
              objl.type="line";
              chartLineData.push(objl)
              chartPieData.push(obj);
              data1= dataList[0].children;
              data2= dataList[1].children;
              data3= dataList[2].children;
              
              
            }
            console.log(chartLineData);
            for(var pie1 in data1){
                let num1=0;
                let obj1={};
                for(let item1 in data1[pie1].num){
                    num1+=parseInt(data1[pie1].num[item1]);
                }
                obj1.name=data1[pie1].name,
                obj1.value =num1;
                chartPieData1.push(obj1);
            }
            for(var pie2 in data2){
                let num2=0;
                let obj2={};
                for(let item2 in data2[pie2].num){
                    num2+=parseInt(data2[pie2].num[item2]);
                }
                obj2.name=data2[pie2].name,
                obj2.value =num2;
                chartPieData2.push(obj2);
            }
            for(var pie3 in data3){
                let num3=0;
                let obj3={};
                for(let item3 in data3[pie3].num){
                    num3+=parseInt(data3[pie3].num[item3]);
                }
                obj3.name=data3[pie3].name,
                obj3.value =num3;
                chartPieData3.push(obj3);
            }
            //console.log(chartPieData1)
            this.dateData= dateData;
            
            this.drawPieChart(chartPieData);
            this.drawPieChart1(chartPieData1);
            this.drawPieChart2(chartPieData2);
            this.drawPieChart3(chartPieData3);
            this.drawLineChart(chartLineData);


        })
      },
      drawPieChart(data) {
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
              title: {
                  text: '',
                  subtext: '',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item'
              },
              series: [
                  {
                      name: '页面访问',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data:data,
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
      drawLineChart(data) {
          this.chartLine = echarts.init(document.getElementById('chartLine'));
          this.chartLine.setOption({
              title: {
                  text: ''
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: ['浏览器', '操作系统', '终端']
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
     
      drawPieChart1(data) {
          this.chartPie1 = echarts.init(document.getElementById('chartPie1'));
          this.chartPie1.setOption({
              title: {
                  text: '',
                  subtext: '',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['浏览器', '操作系统', '终端']
              },
              series: [
                  {
                      name: '访问来源',
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
      drawPieChart2(data) {
          this.chartPie2 = echarts.init(document.getElementById('chartPie2'));
          this.chartPie2.setOption({
              title: {
                  text: '',
                  subtext: '',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['浏览器', '操作系统', '终端']
              },
              series: [
                  {
                      name: '访问来源',
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
      drawPieChart3(data) {
          this.chartPie3 = echarts.init(document.getElementById('chartPie3'));
          this.chartPie3.setOption({
              title: {
                  text: '',
                  subtext: '',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['浏览器', '操作系统', '终端']
              },
              series: [
                  {
                      name: '访问来源',
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
        this.getFunctionCount(this.pageForm.select,this.pageForm.Time);

      }

    },

	mounted: function () {

     var date= utils.getWeek();
     var date1= date[0],date2=date[1];
     this.pageForm.Time=[new Date(date1), new Date(date2)];
     this.getFunctionList();


	},
	updated: function () {
	    //this.drawCharts()
	}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
