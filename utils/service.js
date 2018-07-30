

const service = (url,params,method,successsCallback,errorCallback,completeCallback)=>{
  wx.request({
    url: getApp().globalData.domian + 'index.php/api/' + url,
    data: params || {},
    method: method || 'get',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if(res.statusCode == 200){
        successsCallback(res.data)
      }else{
        errorCallback(res)
      }
    },
    fail:function(res){
      errorCallback(err)
    },
    complete:function(res){
      completeCallback(res)
    }
  })
}
module.exports = {
  service: service
}