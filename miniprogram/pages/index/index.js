// pages/index/index.js
const db=wx.cloud.database({env:"ivan-7gxnafvmefab67d6"});
const _=wx.cloud.command;
//调用公共方法
var util=require("../../utils/utils.js");
// //接收传过来的用户 id
let id="";
//调用公共数据
var app=getApp();
//临时图片路径
var tempPicPaths=[];
//循环渲染得到的点赞图片路径以及索引值
var likeImgObj={};
//点赞次数判断 点一次增加点两次取消
var likeClickCountFlag=0;

Page({
  /**
   * 页面的初始数据
   */
  data: {
  // //接收传过来的用户id
  //  uID:"",
  //获取用户数据 
   userData:{},
   //点赞的图片路径
   likeUrl:"../images_Pub/like.png",
   postPicUrl:[],
  likeFlag:0,
  commentDisplay:false,
  flag:"display:none",
  postArr:[],
  currentIndex:null,
  likedCount:0,
  },
  //图片加载
  imgLoad(res){
    // console.log(res);
  }
  ,
  //预览图片
  imgPreview(e){
    // console.log(e.currentTarget.dataset.src);
    // console.log(e);
    let currentUrl=e.currentTarget.dataset.src;
    tempPicPaths.push(currentUrl);
    console.log(tempPicPaths);
    // console.log(currentUrl);
    // console.log(this.data.postPicUrl);
    wx.previewImage({
      current:currentUrl,
      urls:tempPicPaths
    })
    console.log(currentUrl);
  }
  ,
  getData(){
    db.collection("letsTalk").get()
    .then(res=>{
      console.log(res);
    })
  }
  ,
  //点开发表页面
  postFewThings(){
    // console.log("ok");
    this.setData({
      flag:util.openOrNot("display:block")
    })
    // console.log(util.openOrNot());
  }
  ,
  texing(res){
    console.log(res);
  }
  ,
    //关闭发表页面
  closeThePage(){
    this.setData({
      flag:util.openOrNot("display:none")
    })
    
    // console.log(app.globalData.picArr);
    //清空数据
    // console.log(app.globalData.picArr);
    // app.globalData.picArr.splice(0,9);
    // console.log(app.globalData.picArr);
    // console.log(util.openOrNot("display:none"));
  }
  ,
  //评论事件
  commentFunc(res){
  this.setData({
    currentIndex:res.currentTarget.dataset.index
  })
  let monitorHeight=0;
  wx.getSystemInfo({
    success: function(res) {
      // console.log(res.windowWidth);
      // console.log(res.windowHeight);
      monitorHeight=res.windowHeight;
    },
  })
   wx.pageScrollTo({
     duration: 900,
     scrollTop:monitorHeight+50
   })
  }
  ,
  // 点赞事件
  likedHits(res){
    // console.log(res);
     //获取当前的索引值和id
    var {index,id}=res.currentTarget.dataset;
    // console.log(index,id);
    likeClickCountFlag++;
    switch (likeClickCountFlag) {
      case 1:
        wx.showToast({
          title: '点赞成功！',
        })
        wx.cloud.callFunction({
          name:"increaseLikeCount",
          data:{
            id:id,
            num:1
          }
        }).then(res=>{
          var newPostContent=this.data.postArr;
          newPostContent[index].likeCount+=1;
          //重新渲染数据
          this.setData({
            postArr:newPostContent
          })
        })
        break;
      case 2:
        wx.showToast({
          title: '已取消点赞',
          icon:"none"
        })
        
        db.collection("postTable").doc(id).get().then(res=>{
          wx.cloud.callFunction({
          name:"decreaseLikeCount",
          data:{
            id:id,
            originCount:res.data.likeCount
          }
        }).then(res=>{
          var newPostContent=this.data.postArr;
          newPostContent[index].likeCount-=1;
          //重新渲染数据
          this.setData({
            postArr:newPostContent
          })
        })
        })
       
       
        likeClickCountFlag=0;
        break;
      default:
        break;
    }
  


  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
}
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  //收到login后台传过来的id
  //  wx.getStorage({
  //   key: 'userID',
  //   success:res=>{
  //     // console.log(res.data);
  //      id=res.data;
  //     //  console.log(id);
  //     //id非空判断
  //     if (id!=null) {
  //       db.collection("letsTalk").doc(id).get().then(res=>{
  //         //将将初始数据里的userData进行赋值
  //         this.setData({
  //           userData:res.data.user
  //         })
  //         // console.log(res);
  //       })
  //     }
  //   }
  // })  
    //查询所有帖子
    db.collection("postTable").orderBy("_id","desc").get().then(res=>{
      // console.log(res);
      this.setData({
        postArr:res.data,
      })
     
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