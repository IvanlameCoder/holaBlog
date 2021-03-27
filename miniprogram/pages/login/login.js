// pages/login/login.js
const db=wx.cloud.database({env:"ivan-7gxnafvmefab67d6"});
const _=wx.cloud.command;
//定义创建用户信息的时间戳
var createTime=Date.now();
//id传值
let id="";
//调用公共方法里面的传值方法将id作为参数存储
var util=require("../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{}
  },
  //微信一键登录
  wxLogin(){
    // console.log("fuck");
    wx.showModal({
      title:"确定要以微信号登录吗？",
      confirmText:"确定登录",
      cancelText:"不登录",
      success:res=>{
       if (res.confirm) {
          //获得登录微信的用户信息
        wx.getUserInfo({
          lang: "zh_CN",
          success:res=>{
            // console.log(res);
            //获取用户的信息以及签名
            var user=res.userInfo;
            var signature=res.signature;
            // console.log("当前获取的用户信息",user,signature);
            // //生成随机id
            // var UserID=Date.now()+Math.random(0,99999);
            //在数据库里查询
            db.collection("letsTalk").get().
            then(res=>{
             if (res.data.length!=0) {
                 //如果数据库里有数据就查询该用户的数据是否存在
                 db.collection("letsTalk").where({
                   signature:signature
                 }).get({
                   success:res=>{
                    // console.log(res,util.getDate(createTime));
                    if (res.data.length>0) {
                      // console.log("垃圾云开发，数据库里面有了数据");
                      // console.log(res.data[0]._id);
                      util.sendID(res.data[0]._id);
                        //登录成功后跳转
                        wx.switchTab({
                          url: '../index/index',
                        })
                    }else{
                      console.log("里面没有查询到该数据");
                      db.collection("letsTalk").add({
                        data:{
                          user,
                          signature,
                          createTime
                        }
                      }).then(res=>{
                        // console.log(res._id);
                        //登录成功后跳转
                        util.sendID(res._id);
                        wx.switchTab({
                          url: '../index/index',
                        })
                      });
                    }
                   }
                  })
             }
             
            })
          }
        })
       }
      }
    })
  },
  //游客登录
  wxTouristLogin(){
        //销毁当前存储的id；
        wx.removeStorage({
          key: 'userID',
          success:res=>{
            // console.log(res);
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
  
   
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //调用公共函数里面的获取当前日期方法
   util.getDate();
  //  util.randomID();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})