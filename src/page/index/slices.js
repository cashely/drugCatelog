var searchTel =  require('./../../component/searchBox/searchBox.hbs');

var tableDiffTel =  require('./../../component/tableDiffSlices/table-diff.hbs');
var tableDiffLeft= require('./../../component/tableDiffSlices/table-diff-left.hbs');
var tableDiffRight= require('./../../component/tableDiffSlices/table-diff-right.hbs');
var tableDetails =  require('./../../component/tableDiffSlices/table-details.hbs');
var tableDiffRightTr =  require('./../../component/tableDiffSlices/table-diff-right-tr.hbs');

var standardThanTel =  require('./../../component/standardThanSlices/standardThan.hbs');
var standardThanTbody =  require('./../../component/standardThanSlices/standardThanTbody.hbs');
var standardThanTr =  require('./../../component/standardThanSlices/standardThanTr.hbs');
var searchClassifyTel =  require('./../../component/searchBox/searchClassify.hbs');//比对表格搜索分类

var Fn = require('./../../component/function');
var data =  require('./slicesData');
var parent =  '.'+data.name;
var loadingType= 1,loadingThanType=1;
var loadData;
var firstResult =0,maxResult= 16,firstResultThan =0,maxResultThan= 16;
var findThanData ={firstResult:0,maxResult:16};
module.exports = function(){
  var content = '<div class="content-box active '+data.name +'"><div class="search-box"></div><div class="table-diff"></div><div class="standard-than" id="slicesStandardData"></div></div>';
  $('.content').append(content);

  var loadData = {
    parent: parent,
    url: 'zyyp/listZyypHisProduct',
    loadData: loadData,
    firstResult: firstResult,
    maxResult: maxResult,
    data: data,
    searchClassifyTel:searchClassifyTel,
    tableDiffTel: tableDiffTel,
    tableDiffLeft:tableDiffLeft,
    tableDiffRight: tableDiffRight,
    cancelUrl:'zyyp/deleteMatch',
    cancelThanData: 'drugId',
    tableDiffRightTr: tableDiffRightTr,
    downloadUrl:'mcdProduct30/downHisProductZyyp',
    ypTypeValue : ['2'],
    fn:function(){
      $(parent).find(".search-box").html(searchTel(data.searchDate));
    },
    loadingType:loadingType,
    loadingThanType:loadingThanType
  };
  Fn.loadData(loadData);//加载中药饮片数据

  Fn.showThan({
    parent: parent,
    url: 'zyyp/listMcdZyyp',
    slicesName: 'name',
    inputName:'name',
    data: data,
    standardThanTbody: standardThanTbody,
    standardThanTel: standardThanTel,
    standardThanTr: standardThanTr,
    firstResultThan: firstResultThan,
    maxResultThan: maxResultThan,
    findThanData: findThanData,
    findThanDataName:['name'],
    saveUrl:'zyyp/saveMatch',
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