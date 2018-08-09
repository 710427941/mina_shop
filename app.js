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
          const that = this
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data:{
              appid:APPID,
              secret:APPSECRET,
              grant_type:'authorization_code',
              js_code: res.code
            },
            method:'GET',
            header: {'content-type': 'application/json'},
            success:function(response){
              if (response.data.openid != null && response.data.openid != undefined) {
                that.globalData.openid = response.data.openid
                that.getUser()
              }
            },
            fail:function(error){
              console.log('获取用openId失败')
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
          var params = {code:res.code,openid:that.globalData.openid}
          var method = 'POST'
          service.service(url, params, method, data => {
            if (data.code == 200) {
              that.globalData.userInfo = data.data
              that.globalData.login = true
              console.log(data)
            }else if(data.code == 400){
              wx.showToast({
                title: '授权跳转中...',
                icon:'loading',
                success:function(res){
                  wx.navigateTo({
                    url: '../tologin/tologin',
                  })
                }
              })
            }else{
              that.globalData.login = false
              wx.showToast({
                title: data.message,
                icon:'none',
                duration:2000
              })
            }
          }, data => { }, data => { })
        }
      }
    })
  },
  globalData: {
    domian:'http://mina_shop.cc:9906/',
    userInfo: null,
    openid:'',
    login:false
  }
})