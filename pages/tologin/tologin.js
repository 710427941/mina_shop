// pages/tologin/tologin.js
const service = require('../../utils/service.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindGetUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
    app.globalData.userInfo = e.detail.userInfo

    this.register()

  },
  register() {
    console.log(this.data.userInfo)
    var url = 'User/register'
    var params = {
      openid: app.globalData.openid,
      nickname: this.data.userInfo.nickName,
      head: this.data.userInfo.avatarUrl
    }
    var method = 'POST'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        console.log(data)
        wx.navigateBack({
          delta: 1
        })
      }
    }, data => { }, data => { })
  }
})