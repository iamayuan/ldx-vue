<template>
  <section class="feedback">
    <div class="feedback-header">
        <el-form ref="form" :model="feedbackForm" >
          <el-form-item label="反馈时间" class="w50">
              <el-date-picker v-model="feedbackForm.feedbackTime"  type="daterange" placeholder="选择日期范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="处理人" class="w50">
            <el-input placeholder="输入处理人"  class="displayiB w70" v-model="feedbackForm.handler"></el-input>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-select placeholder="未处理" class="wechat-select" v-model="feedbackForm.status">
                <el-option label="未处理" value="0" class="displayB"></el-option>
                <el-option label="已处理" value="1" class="displayB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button @click="onExport">导出</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="feedback-content">
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
        <el-row class="feedback-pagin">
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
        feedbackForm:{
            feedbackTime: '',
            handler:'',
            status:''
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
      },
      getWechatPage() {
        /*let para = {
            pageNum:1,
            perPageNum:10
        };
        this.listLoading = true;
        getWechatList(para).then((res) => {
            console.log(res)
        });*/
    /*    let url = 'https://bird.ioliu.cn/v1/?url=https://api.douban.com/v2/movie/in_theaters?count=10&start=0';
          this.$http.get(url).then((response) => {
            // success
            console.log(response.data.subjects)
            this.loading = false;
            console.log(response.data.subjects[0])
            response.data.subjects.forEach(todo=>{
              this.todos.push(todo);
            })
          }, (error) => {
            // error
            console.log('error')
          });*/
      axios.get('http://192.168.253.16:8080/userManage/getUserList?pageNum=1&perPageNum=2&openId=1')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log('error'+response);
        });

      }

    },
    mounted() {
        this.getWechatPage();
        console.log('1');
        console.log(axios)
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
