<template>
  <section class="wechat">
    <div class="wechat-header">
        <el-form ref="form" :model="wechatForm" >
          <el-form-item label="关注时间" class="w50">
            <el-date-picker v-model="wechatForm.subscribeTime" type="daterange" placeholder="选择关注时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="关注状态" class="w50">
                <el-select placeholder="请选择活动区域" class="wechat-select" v-model="wechatForm.subscribeState">
                    <el-option label="已关注" value="0" class="displayB"></el-option>
                    <el-option label="未关注" value="1" class="displayB"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="取关时间" class="w50">
              <el-date-picker v-model="wechatForm.unTime"  type="daterange" placeholder="选择日期范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="地区" class="w50">
            <el-input placeholder="输入地区"  class="displayiB w70" v-model="wechatForm.wechatArea"></el-input>
          </el-form-item>
          <el-form-item label="用户id" class="w50">
            <el-input class="displayiB w70" v-model="wechatForm.wechatId"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" class="w50">
            <el-input class="displayiB w70" v-model="wechatForm.wechatName"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button @click="onExport">导出</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="wechat-content">
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
        <el-row class="wechat-pagin">
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
export default {
    data() {
      return {
        wechatForm:{
            subscribeTime: '',
            unTime: '',
            subscribeState:'',
            wechatArea:'',
            wechatId:'',
            wechatName:'',
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
      fetchData: async function () {
        let params = {
        }
        const res = await http.get(api.right, params)
        if (res) {
          console.log(res)
          //alert('请求成功')
        }
      },fetch(){
        this.$http.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312 ').then((response) => {
            console.log(response+'success');
          })
          .catch(function (error) {
            console.log(error+'error');
          });
      }

    },
    mounted() {
        
        //this.fetchData();
        this.fetch();
        console.log('1');
        
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
