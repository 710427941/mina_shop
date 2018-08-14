// pages/goods/detail/detail.js
const service = require('../../../utils/service.js')
const util = require('../../../utils/util.js')
var WxParse = require('../../../utils/wxParse/wxParse.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0,
    tabClass:['text-active','text-normal'],
    domian: app.globalData.domian + 'uploads/',
    randmos: '',
    detail: [],
    images: [],
    swiperHeight:0,
    goodsNum:1,
    collection:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsId = options.id
    this.getDetail(goodsId)
    try {
      var res = wx.getSystemInfoSync()
      this.setData({
        swiperHeight: res.windowWidth
      })

    } catch (e) {
      // Do something when catch error
    }
      
  },
  getDetail(goodsId){
    var url = 'Goods/detail'
    var params = { id: goodsId, openid: app.globalData.openid}
    var method = 'get'
    service.service(url, params, method, data => {
      if (data.code == 200) { 
       WxParse.wxParse('article', 'html', data.detail.content, this, 0)
        this.setData({
          images: data.images,
          detail: data.detail
        })
        
        if (data.collect == null){
          this.setData({ collection: false})
        }else{
          this.setData({ collection: true })
        }

      }
    }, data => { }, data => { })
  },
  tabClick(e) {
    var index = e.currentTarget.dataset.index
    var className = ['text-normal', 'text-normal']
    className[index] = 'text-active'
    this.setData({ tabClass: className, tab: index })
  },
  bindMin(){
    var num = this.data.goodsNum
    if(num>1){
      num--
      this.setData({ goodsNum:num})
    }else{
      wx.showToast({
        title: '数量不能小于1',
        icon:'none'
      })
    }
  },
  bindAdd(){
    var num = this.data.goodsNum
    num++
    this.setData({ goodsNum: num })
  },
  bindTing(e){
    var num = e.detail.value
    if(num == 0){
      num = 1
    }
    this.setData({goodsNum:num})
  },
  addCollection(e){
    var gid = e.currentTarget.dataset.id
    var url = 'Goods/collectionGoods'
    var params = { 
      gid: gid,
      openid:app.globalData.openid,
      token:app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        wx.showToast({
          title: data.message,
          icon:'successs'
        })
        this.setData({ collection:true})
      }else if(data.code == 201){
        wx.showToast({
          title: data.message,
          icon: 'successs'
        })
        this.setData({ collection:false})
      }
    }, data => { }, data => { })
  },
  addcart(e){
    var gid = e.currentTarget.dataset.gid
    var url = 'Cart/addCart'
    var params = {
      gid: gid,
      goodNum: this.data.goodsNum,
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        app.globalData.login = true
        wx.showToast({
          title: data.message,
          icon: 'successs'
        })
      }else{
        app.globalData.login = false
        wx.showToast({
          title: data.message,
          icon: 'none',
          success:function(){
           wx.switchTab({
             url: '../../member/index/index'
           })
          }
        })
      }
    }, data => { }, data => { })
  },
  addbuy(){
    var url = 'Cart/checkCart'
    var params = {
      goodNum: this.data.goodsNum,
      gid: this.data.detail.id,
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        wx.switchTab({
          url: '../../cart/cart',
        })
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }, data => { }, data => { })
  }
})