// pages/cart/cart.js
const service = require('../../utils/service.js')
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty:false,
    carts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  getCarts(){
    var url = 'Cart/cartList'
    var params = {
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        this.setData({ empty: true, carts: data.carts })
        console.log(data)
      }else{
        this.setData({empty: false})
      }
    }, data => { }, data => { })
  },
  clickToHome(){
    wx.navigateTo({
      url: '../index/index'
    })
  }
})