// utils.js
//存储id
function sendID(id){
wx.setStorage({
  data: id,
  key: 'userID',
})
// console.log("公共方法里面的id"+signature);
}
//将时间戳解析成日常格式
function getDate(){
  var time=Date.now();
  var date=new Date(time);
  var year=date.getFullYear();
  //三元表达式 要进行判断的表达式 条件？表达式1:表达式2  如果小于十前面就加上字符串“0”反之则不加
  var month=(date.getMonth()+1<10?"0"+(date.getMonth()+1):(date.getMonth()+1));
  var day=(date.getDate()<10?"0"+(date.getDate()):(date.getDate()));
  var hour=(date.getHours()<10?"0"+(date.getHours()):(date.getHours()));
  var minute=(date.getMinutes()<10?"0"+(date.getMinutes()):(date.getMinutes()));
  var second=(date.getSeconds()<10?"0"+(date.getSeconds()):(date.getSeconds()));
  var createTime=year+"-"+month+"-"+day+"|"+hour+":"+minute+":"+second;
  // console.log(createTime)
  return createTime;
}
//随机id  废弃方法
function randomID(){
  var UserID=Date.now()+Math.random(0,99999)
  return UserID;
}
//打开或者关闭 发表帖子 遮罩层
function openOrNot(flag){
//  console.log(flag);
return flag;

}
//取得发帖内容
function getPostContent(content){

  return content;
}
//传一个颜色样式过去
function sendColor(color){
  return color;
}
function getPath(path){
  console.log(path);
  return path;
}
//清空选中的图片或视频路径
function clearPath(cmd){
  return cmd;
}
//返回路径
function pathReturn(path){
  console.log(path);
  var picArr=path;
  return picArr;
}
module.exports={
  sendID:sendID,
  getDate:getDate,
  randomID:randomID,
  openOrNot:openOrNot,
  getPostContent:getPostContent,
  sendColor:sendColor,
  getPath:getPath,
  pathReturn:pathReturn
}