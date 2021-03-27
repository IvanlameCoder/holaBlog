// components/postTexing/postTexing.js
//连接数据库
const db=wx.cloud.database({env:"ivan-7gxnafvmefab67d6"});
const _=db.command;
const util=require("../../utils/utils.js");
//调用公共数据
const app=getApp();
//定义一个全局变量id
var id="";
//存用户的头像
var userAvatar="";
//定义上传路径数组变量
var filePath=[];
//定义一个变量存储路径
let pathTemp=[];
//定义一个视频路径
var videoTempPath="";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //图片路径
    postPicUrl:[
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/town.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/master.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/greycar.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/film.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/ferrari F40.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/crush.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/Castle.png",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/astronauts.jpg",
      // "cloud://ivan-7gxnafvmefab67d6.6976-ivan-7gxnafvmefab67d6-1305156452/117d3430e924b8996699921962061d950a7bf634.jpg"
     ]
     ,
     //发帖内容
     postContent:""
     ,
     //用户id
     userID:"",
     //标签
     tags:[],
     //字数统计
     wordsCount:0,
     //最大字数后颜色样式变为红色
     maxWords:"",
     //视频封面
     previewVideoSrc:"",
     flag:"display:none",
     autoFocus:false,
     picArr:[],
     cloudPathPic:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    blurArea(res){
      // // console.log("ok");
      // console.log(res);
      // // this.setData({
      // //   autoFocus:true
      // // });
      // res.currentTarget.offsetTop=25;
      // res.currentTarget.offsetLeft=38;
      // console.log(res.target);
      // console.log(res);
    },
    //清空全部
    cancelAll(){
      // console.log("cnm");
      this.setData({
        postContent:"",
        flag:"display:none",
        tags:[],
        previewVideoSrc:"",
        wordsCount:0,
        postPicUrl:""
      })
      pathTemp=[];
      filePath=[];
      videoTempPath=[];
    }
    ,
    texing(res){
      this.setData({
        postContent:res.detail.value,
        wordsCount:res.detail.cursor
      })
      if (this.data.wordsCount==200) {
        this.setData({
          maxWords:"color:red;"
        })
      }else{
        this.setData({
          maxWords:"color:#8d91d6;"
        })
      }
      // console.log(res.detail.cursor);
    },
    imgPreview(e){
      // console.log(e.currentTarget.dataset.src);
      // console.log(e);
      let currentUrl=e.currentTarget.dataset.src;
      // console.log(currentUrl);
      // console.log(this.data.postPicUrl);
      wx.previewImage({
        current:currentUrl,
        urls: this.data.postPicUrl,
      })
    },
    cbChange(res){
      // console.log(res);
      this.setData({
        tags:res.detail.value
      })
    //  console.log(tags);
    }
    ,
    confirm(){
     wx.showModal({
       cancelColor: 'red',
       content:"确定要发帖吗？",
       cancelText:"确定",
       cancelText:"取消",
       confirmColor:"tomato",
       confirmColor:"cornflowerblue",
       success:res=>{
         if (res.confirm) {
          //  console.log(pathTemp,this.data.tags);
          if (this.data.tags.length==0) {
            wx.showToast({
              title: "是不是忘了什么？"
            })
          }
          else{
            wx.getStorage({
              key: 'userID',
              success:res=>{
                //获取上传的图片路径数组
                // console.log(picArr);
                // this.cloudPath(this.data.postPicUrl);
                // console.log(this.data.cloudPathPic);
                // console.log(this.cloudPath(this.data.postPicUrl));
                // console.log(this.data.postPicUrl);
                // console.log(this.data.postPicUrl);
            
                this.cloudPath(this.data.postPicUrl);
                console.log(app.globalData.photoArr);
                this.cloudVideoPath(videoTempPath);
                // console.log(res);
                //给id赋值为当前用户的id
                var createTime=Date.now();
                util.getDate(createTime);
                id=res.data;
                //查询用户的Avatar，太占用资源了。很蠢的方法
                db.collection("letsTalk").doc(id).get().then(res=>{
                // console.log(res.data.user.avatarUrl);
                 userAvatar=res.data.user.avatarUrl;
                 //现已查到id，图片路径，标签，内容，创建时间，还需要昵称，评论我的，我的回复要怎么实现，以及展示和视频上传
                 var likeCount=0;
                 var postContent=this.data.postContent;
                 var tags=this.data.tags;
                 var uID=Math.random(1,999);
                let picArr=app.globalData.photoArr;
                  
                db.collection("postTable").add({
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
                  console.log(picArr);
                });
                
             

                })
              },
              fail:err=>{
                wx.showToast({
                  title: '尚未登陆',
                })
                wx.navigateTo({
                  url: '../../pages/login/login',
                })
              }
            })
          }
         }else{
         
         }
       }
     })
    }
    ,
    cloudPath(path){
      // console.log(path);
      // console.log(picArr);
      let randString="";
     path.forEach(function(item,index){
      randString=Math.floor(Math.random() * 1000000).toString()+item.match(/\.[^.]+?$/)[0].toLocaleLowerCase();
      // console.log(index);
      // console.log(item);
      // console.log(randString);
      wx.cloud.uploadFile({
        filePath:item,
        cloudPath:"pics/"+randString,
      }).then(res=>{
        // console.log(res.fileID);
      //  app.globalData.photoArr.push(res.fileID);
      app.globalData.photoArr.push(res.fileID);
      }).catch(err=>{console.log(res.fileID)});
     })
    }
    ,
    //判断文件格式 搬来的
    recognizeType(url) {
      //后缀获取
      let suffix = '';
      // 获取类型结果
      let result = '';
      // 分割url的“.”
      const flieArr = url.split('.');
      // 获取分割后数组最后一项就是后缀
      suffix = flieArr[flieArr.length - 1];
      if (suffix != "") {
        suffix = suffix.toLocaleLowerCase();
        // 图片格式
        const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif',"mp4","avi","mkv"]
        // 进行图片匹配
        result = imglist.find(function (item) {
          return item === suffix
        })
        // console.log(result);
        return result
      }
    }
    ,
    upLoadPic(){
     wx.chooseImage({
      count: 9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:res=>{
        console.log(res.tempFilePaths);
        //将临时的图片路径给初始数据postPicUrl进行展示
        this.setData({
          postPicUrl:res.tempFilePaths
        })
 
      },
      fail:res=>{
        console.log(res);
      }
     })
    },
    upLoadVideo(){
      //清空上一次的数组
      picArr=[];
      pathTemp=[];
      filePath=[];
      this.setData({
        postPicUrl:[]
      })
      // console.log("ok");
      wx.chooseVideo({
        sourceType:["album","camera"],
        camera:"front",
        compressed:true,
        maxDuration:"60",
        success:res=>{
          let size = parseFloat(res.size/1024/1024).toFixed(1)
          console.log(size);
          let overSize=size-25;
          if (size>25) {
            wx.showToast({
              title: '文件超出'+overSize+'M',
              success:res=>{
                this.setData({
                  previewVideoSrc:""
                })
              }
            })
          }else{
            // console.log(res);
            console.log(res.tempFilePath);
            app.globalData.tempVideoPath=res.tempFilePath;
            this.setData({
              flag:util.openOrNot("display:block"),
              previewVideoSrc: app.globalData.tempVideoPath,
            })
            //存到一个临时路径变量里，将其添加到数据库
            // videoTempPath=res.tempFilePath;
            videoTempPath.push(res.fileID);
            // console.log(videoTempPath);
           
          }
        }
      })
    },
    cloudVideoPath(path){
      // console.log(path);
      //判断文件类型
    var videoType=  this.recognizeType(path);
    // console.log(videoType);
    wx.cloud.uploadFile({
        cloudPath:"video/"+Date.now()+Math.random(1,999999)*100+"."+videoType,
        filePath: path,
      }).then(res=>{
        wx.showToast({
          title: '上传成功',
          icon:"success"
        })
        // console.log(res.fileID);
      })
      
    },
   
  }
})
