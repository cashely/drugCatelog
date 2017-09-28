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
      hideLogin();
      location.reload();
      $('.header .login-out').addClass('active').text('注销');
    },
    error:function(res){
      $('.login .msg-error .msg-error-text').text(res.message);
      $('.login .msg-error').show();
    }
  })
});
function hideLogin(){
  $('.login-box').hide();
  $('.login .msg-error').hide();
}
$('.login .popup-close').click(function(){
  hideLogin();
});

$('.login .login-cancel').click(function(){
  hideLogin();
});

$('.login-box .login-shade').click(function(){
  hideLogin();
});
