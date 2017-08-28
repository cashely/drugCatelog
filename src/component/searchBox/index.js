/**
 * 搜索区
 */
var searchBoxTel =  require('./searchBox.hbs');
var data =  require('../../page/index/indexData');
var $chemistry = $('.'+data.name);

$chemistry.find('.search-box').html(searchBoxTel(data.searchDate));