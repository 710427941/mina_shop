// pages/goods/list/list.js
const service = require('../../../utils/service.js')
const util = require('../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 0,
    page: 1,
    domian: app.globalData.domian + 'uploads/',
    randmos: '',
    goods: [],
    empty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.cid
    if (cid != '') {
      this.setData({ cid: cid })
      this.getGoods(cid, 1)
    } else {
      this.setData({ empty: true })
    }
    this.createRandom()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.setData({ goods: [], page: 1 })
    this.getGoods(this.data.cid, 1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.getGoods(this.data.cid, ++this.data.page)
  },
  createRandom() {
    this.setData({
      randmos: util.randmo()
    })
  },
  getGoods(cid,page){
    var url = 'Goods/goodsList'
    var params = { cid: cid, page: page }
    var method = 'get'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        var goods = this.data.goods
        var newGoods = data.info.data

        if (newGoods.length > 0) {
          for (var i in newGoods) {
            goods.push(newGoods[i])
          }
          this.setData({ goods: goods, empty: false })
          console.log(data)
        } else if (goods.length == 0) {
          this.setData({ empty: true })
        }
        else {
          wx: wx.showToast({
            title: '没有更新记录了',
            icon: 'none'
          })
        }
        wx.stopPullDownRefresh()
      }
    }, data => { }, data => { })
  },
  toGoodsInfo(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})