var http = require('./../page/index/indexData').http;//化学药数据;
function ajaxFn(params){
  var callback =  params.callback || function(){};
  var error =  params.error || function(){};
    $.ajax({
      type: params.type || 'POST',
      url: http+params.url,
      data:params.data,
      dataType: 'JSON',
      success: function(res){
        if(res.flag == "S"){
          callback(res);
        }else if(res.flag == "N"){
          $('.login').show();
          $('.header .login-out').removeClass('active').text('登录');
        }else{
          //console.log(res.message);
          error(res);
        }
      }
    });
}
module.exports = ajaxFn;
