var tabBarTel =  require('./tabBar.hbs');
var Fn =  require('../function');
var slices=  require('../../page/index/slices');
var data = require('../indexData');
var slicesData=  require('../../page/index/slicesData');

$('.tabs-box').html(tabBarTel(data.tabsData));//加载切换条

$(function(){
  $('.tabs .tabs-item').on('click',function(e){
    var $_content = $('.content .content-box');
    if ($(this).hasClass("active")) return false;
    $(this).addClass("active").siblings().removeClass("active");
    $_content.removeClass("active");
    switch ($(this).index()){
      case 1 :
        if($('.content').children('.'+slicesData.name).length <= 0){
          slices($(this));
          return;
        }
        $_content.eq($(this).index()).addClass('active');
        break;
      case 2 : $_content.eq($(this).index()).addClass('active');break;
      default: $_content.first().addClass('active');
    }
  });
});
