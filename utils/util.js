const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 生成随机数
 */

const createNoceStr = function(){
  var randmo = Math.random().toString().substr(2,15)
  return randmo
}

module.exports = {
  formatTime: formatTime,
  randmo: createNoceStr
}
