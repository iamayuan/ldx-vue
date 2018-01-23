<template>
  <section class="Month">
    <div class="Month-header">
        <el-form ref="form" :model="MonthForm" >
          <el-form-item label="月报时间">
            <el-date-picker v-model="MonthForm.Time" type="daterange" placeholder="选择关注时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="月报地市" >
              <el-input placeholder="输入地区"  v-model="MonthForm.MonthArea" class="w70"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="Month-content">
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
                  <template slot-scope="scope">
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
        <el-row class="Month-pagin">
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
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        MonthForm:{
            Time:'',
            MonthArea:''
        }, 
        currentPage: 1,
        tableData: [{
                 date: '2016-05-02',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1518 弄'
               }, {
                 date: '2016-05-04',
                 name: '小王虎',
                 address: '上海市普陀区金沙江路 1517 弄'
               }, {
                 date: '2016-05-01',
                 name: '王虎小',
                 address: '上海市普陀区金沙江路 1519 弄'
               }, {
                 date: '2016-05-03',
                 name: '虎小王',
                 address: '上海市普陀区金沙江路 1516 弄'
               }]
      };
    },
    methods: {
      formatter(row, column) {
        return row.address;
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
      onExport(){
        console.log(`导出`);
      }

    },
    mounted() {
        //this.getWechatPage();
        console.log('1');
        console.log(axios)
       
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

