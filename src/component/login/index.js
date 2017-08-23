/**
 *页面头部
 */
var loginTel =  require('./login.hbs');
var ajaxFn = require('../ajax');
$('.login-box').html(loginTel());

$('.login .login-btn').click(function(){
  ajaxFn({
    url:'login',
    data:{
      userName:$('.login .userName').val(),
      password:$('.login .password').val()
    },
    callback:function(){
      $('.login').hide();
      $('.header .login-out').addClass('active').text('注销');
    }
  })
});

$('.login .popup-close').click(function(){
  $('.login').hide()
});

$('.login .login-cancel').click(function(){
  $('.login').hide();
});
