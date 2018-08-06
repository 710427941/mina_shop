// pages/search/search.js
const service = require('../../utils/service.js')
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    page:1,
    domian: app.globalData.domian + 'uploads/',
    randmos: '',
    goods:[],
    empty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keywords = options.keywords
    if(keywords != ''){
      this.setData({keywords: keywords})
      this.getSearchGoods(keywords,1)
    }else{
      this.setData({empty:true})
    }
    this.createRandom()
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
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.getSearchGoods(this.data.keywords,++this.data.page)
  },
  getSearchGoods(keywords,page){
    var url = 'Goods/search'
    var params = { keywords: keywords,page:page }
    var method = 'get'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        var goods = this.data.goods
        var newGoods = data.info.data
        
        if(newGoods.length>0){
          for (var i in newGoods) {
            goods.push(newGoods[i])
          }
          this.setData({ goods: goods,empty:false})
          console.log(data)
        }else if(goods.length == 0){
          this.setData({ empty: true})
        }
        else{
          wx:wx.showToast({
            title: '没有更新记录了',
            icon: 'none'
          })
        } 
      }
    }, data => { }, data => { })
  },
  createRandom() {
    this.setData({
      randmos: util.randmo()
    })
  },
  search(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  searchGoods() {
    var keywords = this.data.keywords
    this.setData({goods:[],page:1})
    if(keywords != ''){
      this.getSearchGoods(keywords, 1)      
    }
  },
  toGoodsInfo(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goods/detail/detail?id=' + id
    })
  }
})