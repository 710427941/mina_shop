//app.js
const service = require('utils/service.js')
const APPID = 'wx27bc7841e3a39bdd'
const APPSECRET = 'a321d9bd4c5c65b42d830ce57e13a855'
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          var that = this
          var url = 'User/getOpenid'
          var params = {
            appid: APPID,
            secret: APPSECRET,
            grant_type: 'authorization_code',
            js_code: res.code
          }
          var method = 'post'
          service.service(url, params, method, data => {
            if (data.code == 200) {
              that.globalData.openid = data.result

              wx.getUserInfo({
                success: function (successData) {
                  //用户信息进行赋值
                  // console.log(data)
                  that.globalData.userInfo = successData.userInfo
                  //获取数据库用户信息，类似于用户登录功能
                  that.getUser()
                },
                fail: function (failData) {
                  console.log('用户拒绝授权')
                }
              })
            } else {
              console.log('获取用户openId失败')
            }
          }, data => { }, data => { })
           
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUser(){
    wx.login({
      success:res=>{
        if(res.code){
          var that = this
          var url = 'User/getUser'
          var params = {code:res.code,openid:this.globalData.openid}
          var method = 'POST'
          service.service(url, params, method, data => {
            if (data.code == 200) {
              that.globalData.userInfo = data.data
              that.globalData.login = true

            }else if(data.code == 400){
              that.register()
            }else{
              that.globalData.login = false
              wx.showToast({
                title: '请重新登录',
                icon:'none',
                duration:2000
              })
            }
          }, data => { }, data => { })
        }
      }
    })
  },
  // 用户注册
  register: function () {
    var url = 'User/register'
    var method = 'POST'
    var params = {
      openid: this.globalData.openid,
      nickname: this.globalData.userInfo.nickName,
      head: this.globalData.userInfo.avatarUrl
    }
    service.service(url, params, method, data => {
      if (data.code == 200) {
        this.globalData.userInfo = data.data
        this.globalData.login = true
      } else {
        this.globalData.login = false
      }
    }, data => { }, data => { })
  },
  globalData: {
    domian:'http://mina_shop.cc:9906/',
    userInfo: null,
    openid:'',
    login:false,
    cartsIds:'',
    amount:0.00
  }
})