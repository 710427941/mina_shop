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
    carts:[],
    domian: app.globalData.domian + 'uploads/',
    randmos: '',
    selectAllStatus:true,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createRandom()
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
        this.sum()
      }else{
        this.setData({empty: false})
      }
    }, data => { }, data => { })
  },
  sum() {
    var carts = this.data.carts
    var total = 0
    for (var i = 0; i < carts.length; i++) {
      if(carts[i].selected == 1){
        total += carts[i].price * carts[i].num
      }
    }
    this.setData({ total: total })
  },
  selectBox(e){
    var index = e.currentTarget.dataset.index
    var carts = this.data.carts
    carts[index].selected = !carts[index].selected
    this.setData({carts:carts})
    this.sum()
    this.updataSelect(carts[index].id, carts[index].selected)

  },
  updataSelect(id, selected){
    var url = 'Cart/updataSelect'
    var params = {
      id:id,
      selected: selected,
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
    }, data => { }, data => { })
  },
  clickToHome(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  createRandom() {
    this.setData({
      randmos: util.randmo()
    })
  },
  selectAll(){
    
    var selectAllStatus = !this.data.selectAllStatus
    var carts = this.data.carts

    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus
    }

    this.setData({ carts: carts, selectAllStatus: selectAllStatus})
    this.updateSelectAll(selectAllStatus)
  },
  updateSelectAll(selectAllStatus){
    if (selectAllStatus) {
      selectAllStatus = 1
    } else {
      selectAllStatus = 0
    }
    var url = 'Cart/updateSelectAll'
    var params = {
      selected: selectAllStatus,
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
    }, data => { }, data => { })
  },
  bindTing(e){
    var num = e.detail.value
    var index =  e.currentTarget.dataset.index
    var carts = this.data.carts
    carts[index].num = num 
    this.setData({carts:carts})
    this.updateNum(carts[index].id, carts[index].num)
    if(carts[index].selected == 1){
      this.sum()
    }
  },
  updateNum(id,num){
    var url = 'Cart/updateNum'
    var params = {
      id: id,
      num: num,
      openid: app.globalData.openid,
      token: app.globalData.userInfo.token
    }
    var method = 'POST'
    service.service(url, params, method, data => {
    }, data => { }, data => { })
  },
  bindMin(e){
    var index = e.currentTarget.dataset.index
    var carts = this.data.carts
    var num = carts[index].num
    if (num > 1) {
      num--
      carts[index].num = num
      this.setData({ carts: carts })
      this.updateNum(carts[index].id,num)
      if(carts[index].selected == 1){
        this.sum()
      }
    } else {
      wx.showToast({
        title: '数量不能小于1',
        icon: 'none'
      })
    }
  },
  bindAdd(e){
    var index = e.currentTarget.dataset.index
    var carts = this.data.carts
    var num = carts[index].num
    num++
    carts[index].num = num
    this.setData({ carts: carts })
    this.updateNum(carts[index].id, num)
    if (carts[index].selected == 1) {
      this.sum()
    }
  },
  binDelete(e){
    var that = this
    wx.showModal({
      title: '警告',
      content: '确认要删除商品吗',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          var url = 'Cart/binDelete'
          var params = {
            id: id,
            openid: app.globalData.openid,
            token: app.globalData.userInfo.token
          }
          var method = 'POST'
          service.service(url, params, method, data => {
            if(data.code == 200){
              that.getCarts()
            }
          }, data => { }, data => { })
        }
      }
    })
  },
  topay(){
    
    var carts = this.data.carts
    if(carts.length<=0){
      wx.showToast({
        title: '请先勾选商品',
        icon:'none'
      })
      return
    }else{
      var cartsIds = []
      for(var i = 0; i<carts.length; i++){
        if(carts[i].selected){
          cartsIds.push(carts[i].id)
        }
      }
    }
    cartsIds = cartsIds.join(',')
    app.globalData.cartsIds = cartsIds
    app.globalData.amount = this.data.total
    wx.navigateTo({url:'../order/submit/submit'})
  }
})