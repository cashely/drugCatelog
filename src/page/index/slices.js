var searchTel =  require('./../../component/searchBox/searchBox.hbs');

var tableDiffTel =  require('./../../component/tableDiffSlices/table-diff.hbs');
var tableDiffLeft= require('./../../component/tableDiffSlices/table-diff-left.hbs');
var tableDiffRight= require('./../../component/tableDiffSlices/table-diff-right.hbs');
var tableDetails =  require('./../../component/tableDiffSlices/table-details.hbs');

var standardThanTel =  require('./../../component/standardThanSlices/standardThan.hbs');
var standardThanTbody =  require('./../../component/standardThanSlices/standardThanTbody.hbs');
var standardThanTr =  require('./../../component/standardThanSlices/standardThanTr.hbs');
var searchClassifyTel =  require('./../../component/searchBox/searchClassify.hbs');//比对表格搜索分类
var ajaxFn =  require('./../../component/ajax');
var Fn = require('./../../component/function');
var data =  require('./slicesData');
var parent =  '.'+data.name;

//var singleData = {
//  id:null,
//  index:null
//};
var firstResult =0,maxResults= 16,firstResultThan =0,maxResultsThan= 16;
//var loading = false;

module.exports = function($this){
  var content = '<div class="content-box active '+data.name +'"><div class="search-box"></div><div class="table-diff slices-table"></div><div class="standard-than" id="slicesStandardData"></div></div>';
  $('.content').append(content);
  var loadData = {
    parent: parent,
    url: 'zyyp/listZyypHisProduct',
    firstResult: firstResult,
    maxResults: maxResults,
    data: data,
    searchClassifyTel:searchClassifyTel,
    tableDiffTel: tableDiffTel,
    tableDiffLeft:tableDiffLeft,
    tableDiffRight: tableDiffRight,
    cancelUrl:'zyyp/deleteMatch',
    fn:function(){
      $(parent).find(".search-box").html(searchTel(data.searchDate));
    }
  }
  Fn.loadData(loadData);//加载中药饮片数据
  Fn.showDetail({
    parent: parent,
    url: 'mcdProduct30/getHistProductById',
    dataName: 'drugId',
    tableDetails:tableDetails
  });

  Fn.showThan({
    parent: parent,
    url: 'zyyp/listMcdZyyp',
    dataName: 'prod_nam',
    inputName:'name',
    data: data,
    standardThanTbody: standardThanTbody,
    standardThanTel: standardThanTel,
    standardThanTr: standardThanTr,
    firstResultThan: firstResultThan,
    maxResultsThan: maxResultsThan,
    saveUrl:'zyyp/saveMatch',
    findThanData:['name'],
    selectThanData:'zyypId'
  },loadData);
  //弹窗事件
  Fn.popupFn({
    parent: parent
  })
  Fn.updateConvertRatio({
      parent: parent
    })
};