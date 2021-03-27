// pages/myPage/myPage.js
//定义全局变量id来接收传过来的id
var id="";
//连接数据库
const db=wx.cloud.database({env:"ivan-7gxnafvmefab67d6"});
const _=wx.cloud.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log("ok")
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
//收到login后台传过来的id
wx.getStorage({
  key: 'userID',
  success:res=>{
    // console.log(res.data);
     id=res.data;
    //  console.log(id);
    //id非空判断
    if (id!=null) {
      db.collection("letsTalk").doc(id).get().then(res=>{
        //将将初始数据里的userData进行赋值
        this.setData({
          userData:res.data.user
        })
        //  console.log(id);
      })
    }
  }
}) 
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