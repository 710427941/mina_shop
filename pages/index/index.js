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
    banner: [],
    ad: [],
    goods:[],
    domian: app.globalData.domian + 'uploads/',
    randmos: '',
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadIndex()
    this.createRandom()
  },
  loadIndex() {
    var url = 'Index/index'
    var params = {}
    var method = 'get'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        this.setData({
          banner: data.banner,
          ad:data.ad,
          goods:data.goods
        })
      }
    }, data => {}, data => {})
  },

  createRandom() {
    this.setData({
      randmos: util.randmo()
    })
  },
  search(e) {
    this.setData({
      keywords :e.detail.value
    })
  },
  searchGoods() {
    var keywords = this.data.keywords
    if(keywords != ''){
      wx.navigateTo({
        url: '../search/search?keywords=' + keywords
      })
    }
  },
  toDetail(e){
    var id = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../goods/detail/detail?id=' + id
    })
  }
})