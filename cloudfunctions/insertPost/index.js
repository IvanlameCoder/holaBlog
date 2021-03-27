// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=wx.cloud.database({env:"ivan-7gxnafvmefab67d6"});
// 云函数入口函数
exports.main = async (event, context) => {
  //获取传过来的数据
  var id=event.id;
  var uID=event.uID;
  var userAvatar=event.userAvatar;
  var picArr=event.picArr;
  var videoTempPath=event.videoTempPath;
  var postContent=event.postContent;
  var tags=event.tags;
  var createTime=event.createTime;
  var likeCount=event.likeCount;
  return await db.collection("postTable").add({
    data:{
      id,
      uID,
      userAvatar,
      picArr,
      videoTempPath,
      postContent,
      tags,
      createTime,
      likeCount,
    }
  }).then(res=>{
    console.log(res.data);
  });
}