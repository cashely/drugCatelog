var standardThanTel =  require('./standardThan.hbs');
var data =  require('../../page/index/indexData');//化学药数据
$('.'+data.name+' .standard-than').html(standardThanTel(data.thanData));
