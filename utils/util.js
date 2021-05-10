
var ossAliyuncs = "http://soupu.oss-cn-shanghai.aliyuncs.com";

function formatTime(date) {
var year = date.getFullYear() //获取年
var month = date.getMonth() + 1 //获取月
var day = date.getDate() //获取日

var hour = date.getHours() //获取小时
var minute = date.getMinutes() //获取分钟
var second = date.getSeconds() //获取秒

return [year, month, day].map(formatNumber).join('-') + '' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
var year = date.getFullYear()
var month = date.getMonth() + 1
var day = date.getDate()

return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
n = n.toString()
return n[1] ? n :'0' + n
}

module.exports = {
formatTime: formatTime,
formatDate: formatDate,
ossAliyuncs: ossAliyuncs
}