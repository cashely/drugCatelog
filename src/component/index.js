var searchClassifyTel =  require('./searchBox/searchClassify.hbs');//化学药比对表格搜索分类
var tableDiffTel = require('./tableDiff/table-diff.hbs');//化学药比对表格
var tableDiffLeft = require('./tableDiff/table-diff-left.hbs');//化学药左边单行比对表格
var tableDiffRight = require('./tableDiff/table-diff-right.hbs');//化学药右边单行比对表格
var tableDetails = require('./tableDiff/table-details.hbs');//化学药右边详情模版
var tableDiffRightTr = require('./tableDiff/table-diff-right-tr.hbs');//化学药右边详情模版

var standardThanTbody =  require('./standardThan/standardThanTbody.hbs');//化学药标准表格数据模版
var standardThanTr =  require('./standardThan/standardThanTr.hbs');//化学药标准单行表格数据模版

var Fn = require('./function');
var data =  require('./indexData');//化学药数据
var parent = '.'+data.name;
var firstResult= 0, maxResult= 16, firstResultThan =0,maxResultThan= 16;loading = false;
var loadDataObj={
  parent: parent,
  url: 'mcdProduct30/listHisProduct',
  firstResult: firstResult,
  maxResult: maxResult,
  data: data,
  searchClassifyTel:searchClassifyTel,
  tableDiffTel: tableDiffTel,
  tableDiffLeft:tableDiffLeft,
  tableDiffRight: tableDiffRight,
  cancelUrl: 'mcdProduct30/delMatch',
  cancelThanData:'hptid',
  tableDiffRightTr: tableDiffRightTr,
  downloadUrl:'mcdProduct30/downHisProduct'
};


$(function(){
  Fn.loadData(loadDataObj);//加载化学药数据
  //显示比对详情
  Fn.showDetail({
    parent: parent,
    url: 'mcdProduct30/getHistProductById',
    dataName: 'drugId',
    tableDetails:tableDetails,
    updateValueUrl: 'mcdProduct30/updateHisProductByParmas'
  })
  //显示标准数据
  Fn.showThan({
    parent: parent,
    url: 'mcdProduct30/listMcdProduct',
    dataName: 'prodName',
    inputName:'prodName',
    data: data,
    standardThanTbody: standardThanTbody,
    standardThanTr: standardThanTr,
    firstResultThan: firstResultThan,
    maxResultThan: maxResultThan,
    saveUrl:'mcdProduct30/saveMatch',
    findThanData:['ypid','yjId','prodName','fncName','prodPzwh'],
    selectThanData:'proId',
    addThanFn:1
  },loadDataObj);
  //显示弹窗
    Fn.popupFn({
    parent: parent
  });
  //修改转换比
  Fn.updateConvertRatio({
    parent: parent
  });
});