module.exports = function(time) {
//时间戳转换YYYY-MM-DD hh:mm:ss
  var date = new Date(time);
  var Y,M,D,h,m,s;
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  // D = date.getDate() + ' ';
  D = date.getDate();

  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds();
  // var s_times = Y+M+D+h+m+s;
  var s_times = Y+M+D;
  return s_times ;
};
