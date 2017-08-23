var http = 'http://192.168.1.233:8083/hpms/api/';
function ajaxFn(params){
  var callback =  params.callback || function(){};
  var error =  params.error || function(){};
  if(params.contentType){
    $.ajax({
      type: params.type || 'POST',
      url: http+params.url,
      data:params.data,
      dataType: 'JSON',
      contentType: params.contentType,
      success: function(res){
        if(res.flag == "S"){
          callback(res);
        }else if(res.flag == "N"){
          $('.login').show();
          $('.header .login-out').removeClass('active').text('登录');
        }else{
          error(res);
        }
      }
    });
  }else{
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
          console.log(res.message)
          error(res);
        }
      }
    });
  }
}
module.exports = ajaxFn;
