var footerTel =  require('./footer.hbs');
var data = {
  name: '页面底部'
};

$('.footer').html(footerTel(data));
