/**
 * 搜索区
 */
var searchBoxTel =  require('./searchBox.hbs');
var data = {
  total: '1234',
  finish: '1029',
  not: '206',
  input:[
    {text:'医院药品ID:'},
    {text:'药品名称:',inputClass:'drug-name'},
    {text:'规格/厂家:'}
  ]
};
$('.search-box').html(searchBoxTel(data));