// pages/order/submit/submit.js
// pages/member/collect/collect.js
const service = require('../../../utils/service.js')
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartsIds:[],
    amount:0.00,
    cartList:[],
    domian: app.globalData.domian + 'uploads/',
    wxdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      cartsIds: app.globalData.cartsIds,
      amount: app.globalData.amount
    })
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
    this.getCarts()
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
  
  },
  getCarts(){
    var url = 'Cart/getCarts'
    var params = {
      cartsIds: this.data.cartsIds,
      openid : app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'post'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        this.setData({
          cartList:data.info
        })
      }
    }, data => { }, data => { })
  },
  submit(){
    var url = 'Pay/submitOrder'
    var params = {
      cartsIds: this.data.cartsIds,
      amount: this.data.amount,
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'post'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        console.log(data)
        app.globalData.wxdata = data.data.wdata
        app.globalData.order = data.order
        this.pay()
      }
    }, data => { }, data => { })
  },
  pay(){
    
    wx.requestPayment({
      'timeStamp': app.globalData.wxdata.timeStamp + '',
      'nonceStr': app.globalData.wxdata.nonceStr + '',
      'package': app.globalData.wxdata.package + '',
      'signType': 'MD5',
      'paySign': app.globalData.wxdata.sign + '',
      'success': function (res) {
        wx.navigateTo({
          url: '../result/result?stat=1',
        })
      },
      'fail': function (res) {
        wx.navigateTo({
          url: '../result/result?stat=0',
        })
      }
    })
  }
})