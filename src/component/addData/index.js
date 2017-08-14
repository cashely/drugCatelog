/**
 * 添加对比数据
 */
var addData =  require('./index.hbs');
var searchBox = require('../searchBox/searchBox.hbs');

var searchBoxData={
  input:[
    {text:'医院药品ID:'},
    {text:'药品名称:',inputClass:'drug-name'},
    {text:'规格/厂家:'}
  ]
};
var data = {
  searchBox:'<div class="search-box">'+searchBox(searchBoxData)+'</div>'
};

$('.add-data').html(addData(data));

$('.add-data .goback').on('click',function(){
  $('.content .add-data').hide();
  $('.content  .content-box-main').show();
});