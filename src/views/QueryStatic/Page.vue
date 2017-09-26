<template>
  <section class="page">
    <div class="page-header">
        <el-form ref="form" :model="pageForm" >
          <el-form-item label="统计页面" class="w50">
            <el-select placeholder="缴费充值" class="page-select" v-model="pageForm.pages">
                <el-option label="缴费充值" value="0" class="displayB"></el-option>
                <el-option label="未关注" value="1" class="displayB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计时间" class="w50">
              <el-date-picker v-model="pageForm.Time"  type="date" placeholder="选择日期"></el-date-picker>
              <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="page-content">
        <el-col :span="12">
          <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="8">
          <div id="chartPie1" style="width:100%; height:400px;"></div>
          <div id="chartPie2" style="width:100%; height:400px;"></div>
          <div id="chartPie3" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="16">
        <el-table 
        :data="tableData" borderstyle="width: 100%":default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column type="selection"  width="55">
            </el-table-column>
            <el-table-column  prop="date" label="日期" sortable width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable width="180">
            </el-table-column>
            <el-table-column  prop="address" label="地址"  sortable :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
            </el-table-column>
        </el-table>
            <el-row class="page-pagin">
                <el-col :span="24">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="100"
                      layout="sizes, prev, pager, next"
                      :total="50">
                    </el-pagination>
                </el-col>
        </el-row>
        </el-col>
        
    </div>
  </section>
</template>


<script>
import echarts from 'echarts'
export default {
    data() {
      return {
        pageForm:{
            pages: '',
            Time: ''
        }, 
        currentPage: 1,
        chartLine: null,
        chartPie: null,
        chartPie1: null,
        chartPie2: null,
        chartPie3: null,
        tableData: [{
                 date: '2016-05-02',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1518 弄'
               }, {
                 date: '2016-05-04',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1517 弄'
               }, {
                 date: '2016-05-01',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1519 弄'
               }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
               }]
      };
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      drawLineChart() {
          this.chartLine = echarts.init(document.getElementById('chartLine'));
          this.chartLine.setOption({
              title: {
                  text: 'Line Chart'
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: ['邮件营销', '联盟广告', '搜索引擎']
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
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              yAxis: {
                  type: 'value'
              },
              series: [
                  {
                      name: '邮件营销',
                      type: 'line',
                      stack: '总量',
                      data: [120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                      name: '联盟广告',
                      type: 'line',
                      stack: '总量',
                      data: [220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                      name: '搜索引擎',
                      type: 'line',
                      stack: '总量',
                      data: [820, 932, 901, 934, 1290, 1330, 1320]
                  }
              ]
          });
      },
      drawPieChart() {
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
              title: {
                  text: 'Pie Chart',
                  subtext: '纯属虚构',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data: [
                          { value: 335, name: '直接访问' },
                          { value: 310, name: '邮件营销' },
                          { value: 234, name: '联盟广告' },
                          { value: 135, name: '视频广告' },
                          { value: 1548, name: '搜索引擎' }
                      ],
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
      drawPieChart1() {
          this.chartPie = echarts.init(document.getElementById('chartPie1'));
          this.chartPie.setOption({
              title: {
                  text: 'Pie Chart',
                  subtext: '纯属虚构',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data: [
                          { value: 335, name: '直接访问' },
                          { value: 310, name: '邮件营销' },
                          { value: 234, name: '联盟广告' },
                          { value: 135, name: '视频广告' },
                          { value: 1548, name: '搜索引擎' }
                      ],
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
      drawPieChart2() {
          this.chartPie = echarts.init(document.getElementById('chartPie2'));
          this.chartPie.setOption({
              title: {
                  text: 'Pie Chart',
                  subtext: '纯属虚构',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data: [
                          { value: 335, name: '直接访问' },
                          { value: 310, name: '邮件营销' },
                          { value: 234, name: '联盟广告' },
                          { value: 135, name: '视频广告' },
                          { value: 1548, name: '搜索引擎' }
                      ],
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
      drawPieChart3() {
          this.chartPie = echarts.init(document.getElementById('chartPie3'));
          this.chartPie.setOption({
              title: {
                  text: 'Pie Chart',
                  subtext: '纯属虚构',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '60%'],
                      data: [
                          { value: 335, name: '直接访问' },
                          { value: 310, name: '邮件营销' },
                          { value: 234, name: '联盟广告' },
                          { value: 135, name: '视频广告' },
                          { value: 1548, name: '搜索引擎' }
                      ],
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      onQuery(){
        console.log(`查询`);
      },
      drawCharts() {
          this.drawLineChart()
          this.drawPieChart()
          this.drawPieChart1()
          this.drawPieChart2()
          this.drawPieChart3()
      }
    },

	mounted: function () {
	    this.drawCharts()
	},
	updated: function () {
	    this.drawCharts()
	}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
