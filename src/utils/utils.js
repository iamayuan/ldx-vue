'use strict'

//格式化日期
function getzf (num) {  
    if(parseInt(num) < 10){  
        num = '0'+num;  
    }  
    return num;  
}



export default {
  formatDateTim(inputTime) {//格式化时间    yy-mm-dd 
      var date = new Date(inputTime);  
      var y = date.getFullYear();    
      var m = date.getMonth() + 1;    
      m = m < 10 ? ('0' + m) : m;    
      var d = date.getDate();    
      d = d < 10 ? ('0' + d) : d;     
      return y + '-' + m + '-' + d;    
  },
  formatDateTim1(inputTime) {//格式化时间    yymm
      var date = new Date(inputTime);  
      var y = date.getFullYear();    
      var m = date.getMonth() + 1;    
      m = m < 10 ? ('0' + m) : m;    
      var d = date.getDate();    
      d = d < 10 ? ('0' + d) : d;     
      return y + m   
  },
  getWeek(){//获取当前时间以及前一周
    var week=[];
    var nowdate = new Date();
    var y = nowdate.getFullYear();
    var m = nowdate.getMonth()+1;
    var d = nowdate.getDate();
    var formatnowdate = y+'-'+m+'-'+d;
    
    //获取系统前一周的时间
    var oneweekdate = new Date(nowdate-7*24*3600*1000);
    var y = oneweekdate.getFullYear();
    var m = oneweekdate.getMonth()+1;
    var d = oneweekdate.getDate();
    var formatwdate = y+'-'+m+'-'+d;
    week.push(oneweekdate);
    week.push(nowdate);
    return week
  },
  unique(arr,removeAll){//去重
    arr.sort(function(a,b){return a-b});//先排序
    var s=arr.join(',')+',';
    arr= s.replace(/(\d+,)\1+/g,removeAll?'':'$1').replace(/,$/,'').split(',');
    for(var i=0;i<arr.length;i++)arr[i]=parseInt(arr[i],10);//重新转为数字
    return arr
  }
  
}
