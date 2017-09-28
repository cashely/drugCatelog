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
      $('.login-box').hide();
      location.reload();
      $('.header .login-out').addClass('active').text('注销');
    }
  })
});

$('.login .popup-close').click(function(){
  $('.login-box').hide()
});

$('.login .login-cancel').click(function(){
  $('.login-box').hide();
});

$('.login-box .login-shade').click(function(){
  $('.login-box').hide()
});
