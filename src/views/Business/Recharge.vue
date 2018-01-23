<template>
  <section class="recharge">
    <div class="recharge-header">
        <el-form ref="form" :model="rechargeForm" >
          <el-form-item label="充值时间" class="w50">
              <el-date-picker v-model="rechargeForm.reDate" type="daterange" range-separator="至" start-placeholder="充值开始时间" end-placeholder="充值结束日期" class="w75">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="户主" class="w50">
            <el-input placeholder="输入户主"  class="w75" v-model="rechargeForm.consName"></el-input>
          </el-form-item>
          <el-form-item label="户号" class="w50">
            <el-input class="w75" v-model="rechargeForm.consNo" placeholder="输入户号"></el-input>
          </el-form-item>
          <el-form-item label="充值卡号" class="w50">
            <el-input class="w75" v-model="rechargeForm.cardNo" placeholder="输入充值卡号"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="recharge-content">
        <el-table 
        :data="tableData" borderstyle="width: 100%">
            <el-table-column  prop="cosNo" label="户号"  width="120"  align="center">
            </el-table-column>
            <el-table-column prop="cosName" label="户主"  width="90"  align="center">
            </el-table-column>
            <el-table-column  prop="cardNo" label="充值卡号"  width="180"  align="center">
            </el-table-column>
            <el-table-column  prop="rcgDate" label="充值日期"  width="180"  align="center">
            </el-table-column>
            <el-table-column prop="cardAmt" label="充值卡面额"  width="120"  align="center">
            </el-table-column>
            <el-table-column prop="cosBalance" label="账户余额"  width="120"  align="center">
            </el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">查看</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-row class="recharge-pagin">
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
              <el-form-item  prop="cosNo" label="户号" >
                <el-input v-model="detailForm.cosNo" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item prop="cosName" label="户主">
                <el-input v-model="detailForm.cosName" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item  prop="elecAddr" label="用电地址" >
                <el-input v-model="detailForm.elecAddr" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item  prop="cardNo" label="充值卡号" >
                <el-input v-model="detailForm.cardNo" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item prop="cardAmt" label="充值卡面额"  width="180">
                <el-input v-model="detailForm.cardAmt" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item  prop="outTradeCode" label="充值ID" >
                <el-input v-model="detailForm.outTradeCode" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item  prop="rcgDate" label="充值日期"  width="180">
                <el-input v-model="detailForm.rcgDate" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item prop="cosBalance" label="账户余额"  width="180">
                <el-input v-model="detailForm.cosBalance" auto-complete="off" disabled></el-input>
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
        rechargeForm:{
            reDate:'',
            beginDate:'',
            endDate:'',
            consName:'',
            consNo:'',
            cardNo:'',
        }, 
        pageNum: 1,//第几页
        total:0,
        tableData: [],
        perPageNum:20,//每页显示数
        detailFormVisible: false,//界面是否显示
        detailForm: {
            cosNo:'',   
            cosName:'',
            elecAddr:'',
            cardNo:'',
            cardAmt:'',
            outTradeCode:'',
            rcgDate:'',
            cosBalance:'',

        }
      };
    },
    methods: {
      getRechargeList:function (pageNum,perPageNum) {
        let reDate =this.rechargeForm.reDate;
        let params = { 
          consName:this.rechargeForm.consName,
          consNo:this.rechargeForm.consNo,
          cardNo:this.rechargeForm.cardNo,
          pageNum:pageNum,
          perPageNum:perPageNum//每页显示的个数
        };
        if(reDate!=null&&reDate!=""){
          params.beginDate=utils.formatDateTim(reDate[0]);
          params.endDate=utils.formatDateTim(reDate[1])
        }else{
          params.beginDate='';
          params.endDate=''
        }
        const res = http.get(api.Recharge, params).then(res => {
             console.log('列表',res);
             if(res.errcode=='0'){
               this.tableData=res.ret.list;
               this.total=res.ret.totalElements;
            }
        })
      },
      getRechargeDetail:function(outTradeCode){
        const res = http.get(api.Recharge+'/'+outTradeCode, '').then(res => {
             console.log('详情',res);
             if(res.errcode=='0'){
               let userInfo;
               userInfo=res.ret;
               this.detailForm.cosNo= userInfo.cosNo,
               this.detailForm.cosName= userInfo.cosName,
               this.detailForm.elecAddr= userInfo.elecAddr,
               this.detailForm.cardNo= userInfo.cardNo,
               this.detailForm.cardAmt= userInfo.cardAmt,
               this.detailForm.outTradeCode = userInfo.outTradeCode,
               this.detailForm.rcgDate = userInfo.rcgDate,
               this.detailForm.cosBalance = userInfo.cosBalance
            }
        })
      },
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getRechargeList(pageNum,val);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getRechargeList(val,perPageNum);
        console.log(`当前页: ${val}`);
      },
      handleEdit(val){
        console.log(val);
        this.detailFormVisible=true;
        this.getRechargeDetail(val.id);
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getRechargeList(pageNum,perPageNum);
      }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getRechargeList(pageNum,perPageNum);
       
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
