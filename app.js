//app.js
const APPID = 'wx27bc7841e3a39bdd'
const APPSECRET = 'a321d9bd4c5c65b42d830ce57e13a855'
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
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
              console.log(response);
            },
            fail:function(error){
              console.log('获取用openId失败')
            }
          })
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
  globalData: {
    domian:'http://mina_shop.cc:9906/',
    userInfo: null
  }
})