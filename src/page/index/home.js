var searchClassifyTel =  require('./../../component/searchBox/searchClassify.hbs');//化学药比对表格搜索分类
var tableDiffTel = require('./../../component/tableDiff/table-diff.hbs');//化学药比对表格
var tableDiffLeft = require('./../../component/tableDiff/table-diff-left.hbs');//化学药左边单行比对表格
var tableDiffRight = require('./../../component/tableDiff/table-diff-right.hbs');//化学药右边单行比对表格
var tableDetails = require('./../../component/tableDiff/table-details.hbs');//化学药右边详情模版
var tableDiffRightTr = require('./../../component/tableDiff/table-diff-right-tr.hbs');//化学药右边详情模版

var standardThanTbody =  require('./../../component/standardThan/standardThanTbody.hbs');//化学药标准表格数据模版
var standardThanTr =  require('./../../component/standardThan/standardThanTr.hbs');//化学药标准单行表格数据模版

var Fn = require('./../../component/function');
var data =  require('./indexData');//化学药数据
var parent = '.'+data.name;
var firstResult= 0, maxResult= 16,firstResultThan =0,maxResultThan= 16;
var loadingType = 1,loadingThanType=1;
var findThanData ={firstResult:0,maxResult:16};
var loadData;
var loadDataObj={
  parent: parent,
  url: 'mcdProduct30/listHisProduct',
  loadData: loadData,
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
  downloadUrl:'mcdProduct30/downHisProduct',
  ypTypeValue : ['0','1'],
  loadingType:loadingType,
  loadingThanType:loadingThanType,
  //标准数据详情
  detailUrl: 'mcdProduct30/getHistProductById',
  tableDetails:tableDetails,
  dataName: 'drugId',
  updateValueUrl: 'mcdProduct30/updateHisProductByParmas'
};

$(function(){
  Fn.loadData(loadDataObj);//加载化学药数据

  //显示标准数据
  Fn.showThan({
    parent: parent,
    url: 'mcdProduct30/listMcdProduct',
    homeProdName:'prodName',
    homeFncName:'fncName',
    findThanData:findThanData,
    findThanDataName:['ypid','yjId','prodName','fncName','prodPzwh','spec'],
    inputName:'prodName',
    data: data,
    standardThanTbody: standardThanTbody,
    standardThanTr: standardThanTr,
    firstResultThan: firstResultThan,
    maxResultThan: maxResultThan,
    saveUrl:'mcdProduct30/saveMatch',
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
