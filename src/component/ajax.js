var http = 'http://www.immortalshealth.com/hpms/api/';
function ajaxFn(params){
  var callback =  params.callback || function(){};
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
        }else{
          console.log(res.message)
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
        }else{
          console.log(res.message)
        }
      }
    });
  }
}
module.exports = ajaxFn;
