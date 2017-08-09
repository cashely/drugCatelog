/**
 * Created by Administrator on 2017/8/8.
 */
var headerTel =  require('./header.hbs');
var data = {
  name: '页面头部'
};
var header = headerTel(data);
module.exports = header;