// 云函数入口文件
const cloud = require('wx-server-sdk')
const db=cloud.database();
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
  //获取传过来的id
//  return  await event;
    // var id=event.sendId;
    // console.log(id);res
    // return  db.collection("letsTalk")..get();
    return await event;
  
}