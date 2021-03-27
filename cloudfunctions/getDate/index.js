// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
          var time=Date.now();
          var date=new Date(time);
          var year=date.getFullYear();
          //三元表达式 要进行判断的表达式 条件？表达式1:表达式2  如果小于十前面就加上字符串“0”反之则不加
          var month=(date.getMonth()+1<10?"0"+(date.getMonth()+1):(date.getMonth()+1));
          var day=(date.getDate()<10?"0"+(date.getDate()):(date.getDate()));
          var hour=(date.getHours()<10?"0"+(date.getHours()):(date.getHours()));
          var minute=(date.getMinutes()<10?"0"+(date.getMinutes()):(date.getMinutes()));
          var second=(date.getSeconds()<10?"0"+(date.getSeconds()):(date.getSeconds()));
          var careateTime=year+"-"+month+"-"+day+"|"+hour+":"+minute+":"+second;
          return createTime;
}