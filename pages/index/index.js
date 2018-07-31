//index.js
//获取应用实例
const service = require('../../utils/service.js')
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    domian: app.globalData.domian + 'uploads/',
    randmos:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadIndex()
    this.createRandom()
  },
  loadIndex:function(){
    var url = 'Index/index'
    var params = {}
    var method = 'get'
    service.service(url,params,method,data=>{
      if(data.code == 200 && data.result){
        this.setData({
          banner:data.result
        })
      }
    }, data => { }, data => { })
  },
  createRandom:function(){
    this.setData({
      randmos: util.randmo()
    })
  }, 
  search:function(e){
    console.log(e)
  },
  searchGoods:function(){
    
  }
})