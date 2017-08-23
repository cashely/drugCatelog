/**
 *页面头部
 */
var headerTel =  require('./header.hbs');
var ajaxFn = require('../ajax');
var data = {
  gly: 'gly',
  headerTime: '2017年8月9日星期三'
};

$('.header').html(headerTel(data));

$('.header .login-out').click(function(){
 if($(this).hasClass('active')){
   ajaxFn({
     url:'logout',
     callback:function(){
       $('.login').hide();
       $('.header .login-out').removeClass('active').text('登录');
     }
   })
 }else{
   $('.login').show();
 }
});
