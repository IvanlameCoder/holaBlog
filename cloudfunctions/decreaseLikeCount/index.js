// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database({env:"ivan-7gxnafvmefab67d6"})
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  var id=event.id;
  var originCount=event.originCount;
  return await db.collection("postTable").doc(id).update({
    data:{
      likeCount:originCount-=1
    }
  })

}