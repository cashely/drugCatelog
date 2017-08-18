/**
 * Created by Administrator on 2017/8/8.
 */
var tabBarTel =  require('./tabBar.hbs');
var Fn =  require('../function');
var slices=  require('../../page/index/slices');
var data = {
  name: '页面切换条',
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
          slices($(this));
          return;
        }
        $_content.eq($(this).index()).show();
        break;
      case 2 : $_content.hide(); $_content.eq($(this).index()).show() ;break;
      default: $_content.hide().first().show();
    }
  });
});
