<template>
  <section class="Pay">
    <div class="Pay-header">
        <el-form ref="form" :model="payForm" >
          <el-form-item label="支付时间" class="w50 timelabel">
              <el-date-picker v-model="payForm.payDate" type="daterange" range-separator="至" start-placeholder="支付开始时间" end-placeholder="支付结束日期" class="w75">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="户号" class="w50">
                <el-input placeholder="输入户号"  class="w75" v-model="payForm.consNo"></el-input>
          </el-form-item>
          <el-form-item label="户主" class="w50">
            <el-input placeholder="输入户主"  class="w75" v-model="payForm.consName"></el-input>
          </el-form-item>
          <el-form-item label="账单月份" class="w50">
            <el-input placeholder="输入账单月份,格式'201801'"  class="w75" v-model="payForm.billYms"></el-input>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="供电单位" class="w50">
            <el-input class="w75" v-model="payForm.orgName" placeholder="输入供电单位名称" ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="Pay-content">
        <el-table 
        :data="tableData" borderstyle="width: 100%">
            <el-table-column label="户主" prop="consName" width="80" align="center">
            </el-table-column>
            <el-table-column label="户号" prop="consNo"  width="120" align="center">
            </el-table-column>
            <el-table-column label="供电单位" prop="orgName" width="140" align="center">
            </el-table-column>
            <el-table-column label="电量" prop="pq"  width="80" align="center">
            </el-table-column>
            <el-table-column label="电费金额" prop="dfAmts" width="120" align="center">
            </el-table-column>
            <el-table-column label="账单月份" prop="billYms" width="140" align="center">
            </el-table-column>
            <el-table-column label="支付金额" prop="amount" width="120" align="center">
              </el-table-column>  
            <el-table-column label="支付日期" prop="logDate" width="170" align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">查看</el-button>
                  </template>>
            </el-table-column>
        </el-table>
        <el-row class="Pay-pagin">
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
            <el-form :model="detailForm" label-width="120px" >
                <el-form-item label="户号" prop="userId">
                    <el-input v-model="detailForm.userId" auto-complete="off" disabled ></el-input>
                </el-form-item>
                <el-form-item label="户主" prop="consName">
                    <el-input v-model="detailForm.consName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户微信昵称" prop="nickname">
                    <el-input v-model="detailForm.nickname" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="缴费记录Id" prop="outTradeNo">
                    <el-input v-model="detailForm.outTradeNo" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="账单月份" prop="billYms">
                    <el-input v-model="detailForm.billYms" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="电费金额" prop="dfAmts">
                    <el-input v-model="detailForm.dfAmts" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="供电单位" prop="orgName">
                    <el-input v-model="detailForm.orgName" auto-complete="off"  disabled></el-input>
                </el-form-item>
                
                <el-form-item label="用电地址" prop="elecAddr">
                    <el-input v-model="detailForm.elecAddr" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用电区" prop="elecArea">
                    <el-input v-model="detailForm.elecArea" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="elecCity">
                    <el-input v-model="detailForm.elecCity" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="微信openID" prop="userId">
                    <el-input v-model="detailForm.userId" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="电量" prop="pq">
                    <el-input v-model="detailForm.pq" auto-complete="off"  disabled></el-input>
                </el-form-item>
                <el-form-item label="违约金" prop="znjs">
                    <el-input v-model="detailForm.znjs" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="支付金额" prop="amount">
                    <el-input v-model="detailForm.amount" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="支付日期" prop="logDate">
                    <el-input v-model="detailForm.logDate" auto-complete="off" disabled></el-input>
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
        payForm:{
            payDate:'',
            billYms: '',
            consNo: '',
            consName:'',
            payDateStart:'',
            payDateEnd:'',
            orgName:''
        }, 
        pageNum: 1,//默认第一页  第几页
        total:0,
        tableData: [],
        accountList:[],
        perPageNum:20,//默认每页显示20个 显示数
        detailFormVisible: false,//界面是否显示
        detailForm: {
            pq:'',  
            amount:'',  
            orgName:'', 
            logDate:'', 
            znjs:'',
            consName:'',  
            billYms:'',
            dfAmts:'',  
            consNo :'',
            userId:'', 
            elecArea:'',  
            elecCity:'',  
            elecAddr:'',  
            outTradeNo:'',  
            nickname :'',

        }
      };
    },
    methods: {
      getPaymentList:function (pageNum,perPageNum) {
        let payDate =this.payForm.payDate;
        let params = { 
          billYms:this.payForm.billYms,
          consNo:this.payForm.consNo,
          consName:this.payForm.consName,
          orgName:this.payForm.orgName,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数
        };
        if(payDate!=null&&payDate!=""){
          params.payDateStart=utils.formatDateTim(payDate[0]);
          params.payDateEnd=utils.formatDateTim(payDate[1])
        }else{
          params.payDateStart='';
          params.payDateEnd=''
        }
        console.log(params);
        const res = http.get(api.Pays, params).then(res => {
          console.log('列表',res);
          if(res.errcode=='0'){
             this.tableData=res.ret.list;
             this.total=res.ret.totalElements;
          }
        })
      },
      getPaymentDetail:function(outTradeNo){
        const res = http.get(api.Pays+'/'+outTradeNo, '').then(res => {
             console.log('详情',res);
             if(res.errcode=='0'){
                let detailData;
                detailData=res.ret;
                this.detailForm.pq=detailData.pq,  
                this.detailForm.amount=detailData.amount,  
                this.detailForm.orgName=detailData.orgName, 
                this.detailForm.logDate=detailData.logDate, 
                this.detailForm.znjs=detailData.znjs,
                this.detailForm.consName=detailData.consName,  
                this.detailForm.billYms=detailData.billYms,
                this.detailForm.dfAmts=detailData.dfAmts,  
                this.detailForm.consNo =detailData.consNo,
                this.detailForm.userId=detailData.userId, 
                this.detailForm.elecArea=detailData.elecArea,  
                this.detailForm.elecCity=detailData.elecCity,  
                this.detailForm.elecAddr=detailData.elecAddr,  
                this.detailForm.outTradeNo=detailData.outTradeNo,  
                this.detailForm.nickname =detailData.nickname
            }
        })
      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getPaymentList(pageNum,val);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getPaymentList(val,perPageNum);
        console.log(`当前页: ${val}`);
      },
      handleEdit(val) {
        console.log(val);
        this.detailFormVisible=true;
        this.getPaymentDetail(val.outTradeNo);
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getPaymentList(pageNum,perPageNum);
      }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getPaymentList(pageNum,perPageNum);
       
    }
  };
</script>


<style scoped>

</style>
