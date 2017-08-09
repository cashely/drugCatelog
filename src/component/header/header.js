/**
 *页面头部
 */
var headerTel =  require('./header.hbs');
var data = {
  gly: 'gly',
  time: '2017年8月9日星期三'
};
var header = headerTel(data);
module.exports = header;