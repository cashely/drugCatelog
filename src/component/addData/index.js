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
  ],
  thead:['国管平台ID','省采购平台ID','药品编码', '药品类型','药品名称','商品名','剂型','规格','生产企业','批准文号/注册证号','人社分类','药理分类','操作'],
  tbody:[
    ['114040080106','138571','X120100-100101-A6','化学药','甲泼尼龙片','尤金','素片','4mg*24片/盒','天津天药药','国药准字H2002022','系统性激素制','内分泌系统','选择'],
    ['114040080106','138571','X120100-100101-A6','化学药','甲泼尼龙片','尤金','素片','4mg*24片/盒','天津天药药','国药准字H2002022','系统性激素制','内分泌系统','选择'],
    ['114040080106','138571','X120100-100101-A6','化学药','甲泼尼龙片','尤金','素片','4mg*24片/盒','天津天药药','国药准字H2002022','系统性激素制','内分泌系统','选择']
  ]
};
var data = {
  searchBox:'<div class="search-box">'+searchBox(searchBoxData)+'</div>'
};

$('.add-data').html(addData(searchBoxData));

$('.add-data .goback').on('click',function(){
  $('.content .add-data').hide();
  $('.content  .content-box-main').show();
});