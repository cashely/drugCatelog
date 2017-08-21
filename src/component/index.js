var searchClassifyTel =  require('./searchBox/searchClassify.hbs');//化学药比对表格搜索分类
var tableDiffTel = require('./tableDiff/table-diff.hbs');//化学药比对表格
var tableDiffLeft = require('./tableDiff/table-diff-left.hbs');//化学药左边单行比对表格
var tableDiffRight = require('./tableDiff/table-diff-right.hbs');//化学药右边单行比对表格
var tableDetails = require('./tableDiff/table-details.hbs');//化学药右边详情模版

var standardThanTel =  require('./standardThan/standardThan.hbs'); //化学药标准数据模版
var standardThanTbody =  require('./standardThan/standardThanTbody.hbs');//化学药标准表格数据模版
var standardThanTr =  require('./standardThan/standardThanTr.hbs');//化学药标准单行表格数据模版

var Fn = require('./function');
var data =  require('./indexData');//化学药数据
var parent = '.'+data.name;
var firstResult= 0, maxResults= 16, firstResultThan =0,maxResultsThan= 16;loading = false;
var loadDataObj={
  parent: parent,
  url: 'mcdProduct30/listHisProduct',
  firstResult: firstResult,
  maxResults: maxResults,
  data: data,
  searchClassifyTel:searchClassifyTel,
  tableDiffTel: tableDiffTel,
  tableDiffLeft:tableDiffLeft,
  tableDiffRight: tableDiffRight,
  cancelUrl: 'mcdProduct30/delMatch'
}
$(function(){
  Fn.loadData(loadDataObj);//加载化学药数据
  Fn.showDetail({
    parent: parent,
    url: 'mcdProduct30/getHistProductById',
    dataName: 'drugId',
    tableDetails:tableDetails,
    updateValueUrl: 'mcdProduct30/updateHisProductByParmas'
  })
  Fn.showThan({
    parent: parent,
    url: 'mcdProduct30/listMcdProduct',
    dataName: 'prodName',
    inputName:'prod_name',
    data: data,
    standardThanTbody: standardThanTbody,
    standardThanTr: standardThanTr,
    firstResultThan: firstResultThan,
    maxResultsThan: maxResultsThan,
    saveUrl:'mcdProduct30/saveMatch',
    findThanData:['ypid','yj_id','prod_name','fnc_name','prod_pzwh'],
    selectThanData:'proId',
    addThanFn:1
  },loadDataObj);

    Fn.popupFn({
    parent: parent
  })
  Fn.updateConvertRatio({
    parent: parent
  })
});