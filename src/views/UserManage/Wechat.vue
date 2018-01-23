<template>
  <section class="wechat">
    <div class="wechat-header">
        <el-form ref="form" :model="wechatForm" >
          <el-form-item label="关注时间" class="w50">
            <el-date-picker v-model="wechatForm.subscribeTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="取关时间" class="w50">
              <el-date-picker v-model="wechatForm.unTime" type="daterange" range-separator="至" start-placeholder="取关开始日期" end-placeholder="取关结束日期">
               </el-date-picker>
          </el-form-item>
          <el-form-item label="关注状态" class="w50">
                <el-select placeholder="请选择活动区域" class="wechat-select w75" v-model="wechatForm.subscribeState" clearable>
                    <el-option label="已关注" value="1" class="displayB"></el-option>
                    <el-option label="未关注" value="0" class="displayB"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="地区" class="w50">
            <el-input placeholder="输入地区"  class="w75" v-model="wechatForm.city"></el-input>
          </el-form-item>
          <el-form-item label="用户id" class="w50">
            <el-input class="w75" v-model="wechatForm.openId" placeholder="输入用户id"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" class="w50">
            <el-input class="w75" v-model="wechatForm.nickname" placeholder="输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-group floatR">
                
                <el-button type="primary" @click="onQuery">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        
    </div>
    <div class="wechat-content">
        <el-table  :data="tableData" borderstyle="width: 100%">
            <el-table-column type="selection"  width="40" align="center">
            </el-table-column>
            <el-table-column prop="nickname" label="微信昵称"  width="120" align="center">
            </el-table-column>
            <el-table-column prop="id" label="用户id"  width="250" align="center">
            </el-table-column>
            <el-table-column  prop="subscribeTime" label="关注时间"  width="100" align="center">
            </el-table-column>
            <el-table-column prop="unSubscribeTime" label="取关时间"  width="100" align="center">
            </el-table-column>
            <el-table-column prop="city" label="地区"  width="80" align="center">
            </el-table-column>
            <el-table-column prop="subscribeState" label="关注状态"  width="100" align="center">
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
        <el-row class="wechat-pagin">
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
        <el-dialog title="详情"  :visible.sync="detailFormVisible">
            <p class="hand-line">微信用户信息</p>
            <el-form :model="detailForm" label-width="120px" >
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="detailForm.nickname"  disabled></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model="detailForm.sex"  disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="detailForm.mobile"  disabled></el-input>
                </el-form-item>
                <el-form-item label="openID" prop="id">
                    <el-input v-model="detailForm.id"  disabled></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="city">
                    <el-input v-model="detailForm.city"  disabled></el-input>
                </el-form-item>
                <el-form-item label="关注时间" prop="subscribeTime" >
                    <el-input v-model="detailForm.subscribeTime"  disabled></el-input>
                </el-form-item>
                <el-form-item label="取关时间" prop="unSubscribeTime">
                    <el-input v-model="detailForm.unSubscribeTime"  disabled></el-input>
                </el-form-item>
            </el-form>
            <p class="hand-line">该微信用户绑定的户号信息</p>
            <el-table  :data="accountList" borderstyle="width: 100%">
                <el-table-column prop="consNo" label="户号"  >
                </el-table-column>
                <el-table-column  prop="consName" label="户主" >
                </el-table-column>
                <el-table-column  prop="elecAddr" label="用电地址"  >
                </el-table-column>
                <el-table-column prop="selectTime" label="绑定时间" >
                </el-table-column>
            </el-table>
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
        wechatForm:{
            subscribeTime:'',
            subscribeStartTime:'',
            subscribeEndTime:'',
            unTime:'',
            unStartTime: '',
            unEndtime: '',
            subscribeState:'',
            city:'',
            openId:'',
            nickname:'',
            
        }, 
        pageNum: 1,//第几页
        total:0,
        tableData: [],
        accountList:[],
        perPageNum:20,//每页显示数
        detailFormVisible: false,//界面是否显示
        detailForm: {
            nickname:'',
            id:'',
            city:'',
            subscribeTime:'',
            unSubscribeTime:'',
            mobile :'',
            sex:'',

        }
      };
    },
    methods: {
      getUserList:function (pageNum,perPageNum) {
        let subscribeTime =this.wechatForm.subscribeTime;
        let unTime =this.wechatForm.unTime;
        let params={
          subscribeState:this.wechatForm.subscribeState,
          city:this.wechatForm.city,
          openId:this.wechatForm.openId,
          nickname:this.wechatForm.nickname,
          pageNum:pageNum,
          perPageNum:perPageNum
        };
        if(subscribeTime!=null&&subscribeTime!=""){
          params.subscribeStartTime=utils.formatDateTim(subscribeTime[0]);
          params.subscribeEndTime=utils.formatDateTim(subscribeTime[1])
        }else{
          params.subscribeStartTime='';
          params.subscribeEndTime=''
        }
        if(unTime!=null&&unTime!=""){
          params.unStartTime=utils.formatDateTim(unTime[0]);
          params.unEndtime=utils.formatDateTim(unTime[1])
        }else{
          params.unStartTime='';
          params.unEndtime=''
        }
        console.log(params,'params');
        const res = http.get(api.getWechat, params).then(res => {
            console.log('微信用户',res);
            let errcode=res.errcode;
            if(errcode=='0'){
              let tableData = res.ret.list;
              for(var item in tableData){
                tableData[item].subscribeTime=utils.formatDateTim(tableData[item].subscribeTime);
                if(tableData[item].unSubscribeTime){
                  tableData[item].unSubscribeTime=utils.formatDateTim(tableData[item].unSubscribeTime);
                }else{
                  tableData[item].unSubscribeTime='';
                }
                tableData[item].subscribeState=='0'?tableData[item].subscribeState='未关注':tableData[item].subscribeState='已关注';
                tableData[item].sex=='1'?tableData[item].sex='男':tableData[item].sex='女'
              }
              this.tableData=tableData;
              this.total=res.ret.totalElements;
            }  
        })
      },
      getUserDetail:function(openId){
        const res = http.get(api.getWechat+'/'+openId, '').then(res => {
            console.log('详情用户',res);
            let errcode=res.errcode;
            if(errcode=='0'){
               let userInfo;
               userInfo=res.ret.userInfo;
               this.detailForm.nickname= userInfo.nickname,
               this.detailForm.id= userInfo.id,
               this.detailForm.city= userInfo.city,
               this.detailForm.sex=='1'?this.detailForm.sex='男':this.detailForm.sex='女'
               this.detailForm.subscribeTime= userInfo.subscribeTime,
               this.detailForm.unSubscribeTime= userInfo.unSubscribeTime,
               this.detailForm.mobile = userInfo.mobile,
               this.accountList = res.ret.accountList;
           }
        })
      },
      //每页条数
      handleSizeChange(val) {
        let pageNum = this.pageNum;
        this.perPageNum=val;
        this.getUserList(pageNum,val);
      },
      handleCurrentChange(val) {
        let perPageNum=this.perPageNum;
        this.pageNum=val;
        this.getUserList(val,perPageNum);
      },
      handleEdit(val){
        console.log(val);
        this.detailFormVisible=true;
        this.getUserDetail(val.id);
      },
      onSync(val){
        console.log(val);
      },
      onQuery(){
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getUserList(pageNum,perPageNum);
      }

    },
    mounted() {
        let pageNum = this.pageNum;
        let perPageNum=this.perPageNum;
        this.getUserList(pageNum,perPageNum);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
