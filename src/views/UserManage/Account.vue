<template>
  <section class="account">
    <div class="account-header">
        <el-form ref="form" :model="accountForm" >
          <el-form-item label="户号" class="w50">
              <el-input placeholder="输入户号"  class="w75" v-model="accountForm.consNo"></el-input>
          </el-form-item>
          <el-form-item label="户主" class="w50">
            <el-input placeholder="输入户主"  class="w75" v-model="accountForm.consName"></el-input>
          </el-form-item>
          <el-form-item label="供电单位" class="w50">
              <el-input placeholder="输入供电单位"  class="w75" v-model="accountForm.orgName"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="account-content">
        <el-table 
        :data="tableData" borderstyle="width: 100%">
            <el-table-column type="selection"  width="40" align="center">
            </el-table-column>
            <el-table-column  prop="id" label="户号"  width="120" align="center">
            </el-table-column>
            <el-table-column prop="consName" label="户主"  width="80" align="center">
            </el-table-column>
            <el-table-column  prop="elecAddr" label="用电地址" width="300"  align="center">
            </el-table-column>
            <el-table-column  prop="orgName" label="供电单位" width="120" align="center">
            </el-table-column>
            <el-table-column  prop="flagPeakValley" label="是否峰谷电" width="140"  align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="small" @click="onSync(scope.row)">同步</el-button>
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">查看</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="account-pagin">
            <el-col :span="24">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="pageNum"
                  :page-sizes="[20, 40, 60, 80,100]"
                  :page-size="perPageNum"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-col>
        </el-row>


        <!--详情界面-->
        <el-dialog title="详情" :visible.sync="detailFormVisible">
            <p class="hand-line">户号信息</p>
            <el-form :model="detailForm" label-width="120px" >
                <el-form-item label="户号" prop="id">
                    <el-input v-model="detailForm.id" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="户主" prop="consName">
                    <el-input v-model="detailForm.consName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用电地址" prop="elecAddr">
                    <el-input v-model="detailForm.elecAddr" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="是否峰谷电用户" prop="flagPeakValley">
                    <el-input v-model="detailForm.flagPeakValley" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="供电单位名称" prop="orgName">
                    <el-input v-model="detailForm.orgName" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-form>
            <p class="hand-line">绑定该户号的微信用户信息</p>
            <el-table  :data="userList" borderstyle="width: 100%">
                <el-table-column prop="nickname" label="微信昵称"  >
                </el-table-column>
                <el-table-column  prop="selectTime" label="绑定时间" >
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
  </section>
</template>

<script>
import http from '@/utils/http'
import api from '@/api/api'
export default {
    data() {
      return {
        accountForm:{
            consNo: '',
            consName: '',
            orgName:''
        }, 
        pageNum: 1,//第几页
        total:0,
        tableData: [],
        tableDataAll:[],
        userList:[],
        perPageNum:20,//每页显示数
        detailFormVisible: false,//界面是否显示
        detailForm: {
            id:'',
            consName:'',
            elecAddr:'',
            flagPeakValley:'',
            orgName:''
        }
        
      };
    },
    methods: {
      getAccountList:function (pageNum,perPageNum) {
        let params = { 
          consNo:this.accountForm.consNo,
          consName:this.accountForm.consName,
          orgName:this.accountForm.orgName,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数
        };
        const res = http.get(api.getAccount, params).then(res => {
             console.log('户号列表',res);
             if(res.errcode=='0'){
                let tableData=res.ret.list;
                for(var item in tableData){
                 tableData[item].flagPeakValley=='0'?tableData[item].flagPeakValley='否':tableData[item].flagPeakValley='是';
               }
               this.tableData=tableData;
               this.total=res.ret.totalElements;
             }
             
          
        })
        
      },
      getAccountDetail:function(consNo){
        const res = http.get(api.getAccount+'/'+consNo, '').then(res => {
            console.log('详情',res);
            if(res.errcode=='0'){
               let userInfo;
               userInfo=res.ret.accountInfo;
               this.detailForm.consName= userInfo.consName,
               this.detailForm.id= userInfo.id,
               this.detailForm.elecAddr= userInfo.elecAddr,
               this.detailForm.orgName= userInfo.orgName,
               this.detailForm.flagPeakValley = (userInfo.flagPeakValley=='0')?'否':'是',
               this.userList = res.ret.userList;
            }
        })
      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getAccountList(pageNum,val);

      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getAccountList(val,perPageNum);
        console.log(`当前页: ${val}`);
      },
      handleEdit(val) {
        this.detailFormVisible=true;
        this.getAccountDetail(val.id);
      },
      onSync(val){
        console.log('同步');
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getAccountList(pageNum,perPageNum);
      }

    },
    mounted() {
      let pageNum = this.pageNum;
      let perPageNum=this.perPageNum;
      this.getAccountList(pageNum,perPageNum);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

