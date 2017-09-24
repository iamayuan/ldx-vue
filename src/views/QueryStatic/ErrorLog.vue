<template>
  <div class="hello">
    <label>关注时间</label>
    <el-input></el-input>
    <label>关注时间</label>
    <el-input></el-input>
    <label>地区</label>
    <el-input></el-input>
    <label>用户id</label>
    <el-input></el-input>
    <label>用户昵称</label>
    <el-input></el-input>
    <el-button>查询</el-button>
    <el-button>导出</el-button>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column
              type="selection"
              width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>
      <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
      <div class="block">
        <span class="demonstration">调整每页显示条数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
      return {
        value6: '',
        value7: '',
        chartLine: null,
        chartPie: null,
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
      drawCharts() {
          this.drawLineChart()
          this.drawPieChart()
      },
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
