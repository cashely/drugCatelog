/**
 *页面头部
 */
var headerTel =  require('./header.hbs');
var data = {
  gly: 'gly',
  time: '2017年8月9日星期三'
};

$('#header').html(headerTel(data));

setTimeout(function(){
    data.gly = 'gly2';
    $('.header').html(headerTel(data));
},2000);
