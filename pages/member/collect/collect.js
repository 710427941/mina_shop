// pages/member/collect/collect.js
const service = require('../../../utils/service.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    domian: app.globalData.domian,
    collectList: [],
    empty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollects(1)
  },
  getCollects(page){
    var url = 'Goods/getCollects'
    var params = { 
      page: page, 
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        app.globalData.login = true
        var collectList = this.data.collectList
        var newCollect = data.info
        if (newCollect.length > 0) {
          for (var i in newCollect) {
            collectList.push(newCollect[i])
          }
          this.setData({ collectList: collectList, empty:false })
          console.log(collectList)
        } else {
          this.setData({ empty: true })
          wx.showToast({
            title: '没有更多记录了',
            icon: 'none'
          })
        }
        
      }else {
        app.globalData.login = false
        wx.showToast({
          title: data.msg,
          icon: 'none'
        })
      }
    
    }, data => { }, data => { })
  },
  deleteGoods(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定取消该收藏吗？',
      success:function(res){
        if (res.confirm) {
          var gid = e.currentTarget.dataset.id
          var url = 'Goods/collectionGoods'
          var params = {
            gid:gid,
            openid: app.globalData.openid,
            token: app.globalData.userInfo.token
          }
          var method = 'post'
          service.service(url, params, method, data => {
            console.log(data)
            if (data.code == 201) {
              console.log(data)
              wx.showToast({
                title: data.message,
                icon: 'success'
              })
              that.setData({ collectList: [], page: 1 })
              that.getCollects(1)
            }
          }, data => { }, data => { })
        }
      }
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