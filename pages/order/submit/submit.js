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
    amount:0.00
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
      cartIds: this.data.cartIds,
      openid : app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'post'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        console.log(data)
      }
    }, data => { }, data => { })
  }
})