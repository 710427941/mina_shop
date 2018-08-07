// pages/category/category.js
const service = require('../../utils/service.js')
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    categoryListSub:[],
    domian: app.globalData.domian + 'uploads/',
    randmos: '',
    second_height:0,
    active:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory()
    try {
      var res = wx.getSystemInfoSync()
      this.setData({
        second_height: res.windowHeight
      })
     
    } catch (e) {
      // Do something when catch error
    }
  }, 
  getCategory(id){

    if(id == undefined){
      id=0
    }
    var url = 'Category/index'
    var params = {pid:id}
    var method = 'get'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        this.setData({
          categoryList: data.list,
          categoryListSub: data.sublist
        })
        this.setActive(0)
      }
    }, data => { }, data => { })
  },
  setActive(index){
    var active = []
    for(var i = 0;i<this.data.categoryList;i++){
      active[i]=''
    }
    active[index] = 'active'
    this.setData({
      active:active
    })
  },
  getSubCategory(e){
    var pid = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    this.setActive(index)
    var url = 'Category/index'
    var params = { pid: pid }
    var method = 'get'
    service.service(url, params, method, data => {
      if (data.code == 200) {
        this.setData({
          categoryListSub: data.sublist
        })
      }
    }, data => { }, data => { })
  },
  createRandom() {
    this.setData({
      randmos: util.randmo()
    })
  },
  goList(e){
    var cid = e.currentTarget.dataset.cid
    wx.navigateTo({
      url: '../goods/list/list?cid=' + cid,
    })
  }

})