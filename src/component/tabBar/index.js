/**
 * Created by Administrator on 2017/8/8.
 */
var tabBarTel =  require('./tabBar.hbs');
var searchTel =  require('../searchBox/searchBox.hbs');
var standardThanTel =  require('../standardThan/standardThan.hbs');
var data = {
  name: '页面切换条',
  gly: 'gly',
  content: [
    {text:'化学药／中成药',id:"medicine",active:"active"},
    {text:'中药饮片',id:"slices"},
    {text:'医院制剂',id:"potion"}
  ]
};
$('.tabs-box').html(tabBarTel(data));

$(function(){
  $('.tabs .tabs-item').on('click',function(e){
    var $_content = $('.content .content-box');
    if ($(this).hasClass("active")) return false;
    $(this).addClass("active").siblings().removeClass("active");
    $_content.removeClass("active");
    switch ($(this).index()){
      case 1 :
        $_content.hide() ;
        if($('.content').children('.'+$(this).data('id')).length <= 0){
          var data = { input:[{text:'医院药品ID:'},{text:'药品名称:',inputClass:'drug-name'},{text:' 规格/厂家:'}]};
          var searchHTMl = '<div class="search-box">'+searchTel(data) +'</div>';
          var standardThanHTMl = '<div class="standard-than">'+standardThanTel(data) +'</div>';
          $('.content').append('<div class="content-box active '+$(this).data("id")+'">'+searchHTMl+standardThanHTMl +'</div>');
          return;
        }
        $_content.eq($(this).index()).show();
        break;
      case 2 : $_content.hide(); $_content.eq($(this).index()).show() ;break;
      default: $_content.hide().first().show();
    }
  });
});
