var ajaxFn =  require('./ajax');//请求方法
var http = require('./../page/index/indexData').http;
var data =  require('./../page/index/indexData');//化学药数据
var unitTel = require('./unit/unit.hbs');//门诊/住院单位
var popupCompanyTal = require('./popupCompany/index.hbs');
var popupCancelThanTal = require('./popupCompany/cancelThan.hbs');
var popupRecordTal = require('./popupCompany/record.hbs');
var popupChannelTal = require('./popupCompany/popupChannelTal.hbs');
var addDataPopupTel = require('./popupCompany/addInfo.hbs');
var loading = false;
var singleData = {id:null, index:null};
var addData = require('./addData/index.hbs');
var $parent = $('.'+data.name);
var tableRightLeft = 0;
var addFn= require('./addData/index');

//加载查询统计
function loadsearchClassifyTel(params,res){
  //params.firstResult = params.firstResult + 1;
  params.data.searchDate.total = res.total;
  params.data.searchDate.jbywCount = res.content.jbywCount;
  params.data.searchDate.rsyyCount = res.content.rsyyCount;
  params.data.searchDate.wbdCount = res.content.wbdCount;
  params.data.searchDate.wtsjCount = res.content.wtsjCount;
  params.data.searchDate.ybdCount = res.content.ybdCount;
  params.data.searchDate.yblbCount = res.content.yblbCount;
  $(params.parent).find('.search-box .search-data').html(params.searchClassifyTel(params.data.searchDate));
}

//重新加载查询统计
function reloadsearchClassifyTel(params){
  var reloadData ={};
  $.extend(reloadData,params.loadData);
  reloadData[params.searchType] = null;
  ajaxFn({
    url: params.url,
    data: reloadData,
    callback:function(res){
      loadsearchClassifyTel(params,res);
    }
  });
}

//加载化学药数据方法
function loadChemistryTableFn(params,type){
  var $parent = $(params.parent);
  $parent.find('.table-diff .loading-wrap').show();
  params.loadData = {
    drugId:$parent.find('.search-box .drug-id').val(),
    drugName:$parent.find('.search-box .drug-name').val(),
    specName:$parent.find('.search-box .spec-name').val(),
    firstResult: params.firstResult * params.maxResult,
    maxResult: params.maxResult
  };
   if(!!type){
     params.searchType = type.name;
     params.loadData[params.searchType] = type.val;
   }
  ajaxFn({
    url: params.url,
    data: params.loadData,
    callback:function(res){
      if(!type){
        loadsearchClassifyTel(params,res);
      }
      $parent.find('.table-diff .loading-wrap').hide();
      params.data.diffData.ydata = res.content.rows;
      if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length >= params.loadData.maxResult){
        $('.table-diff-header .scroll-loading').show();
      }else{
        $('.table-diff-header .scroll-loading').hide();
      }
      $parent.find('.table-diff').html(params.tableDiffTel(params.data.diffData));
      tableDiffScrollFn($parent,params);
    }
  });
}

//比对表格滚动事件
function tableDiffScrollFn($parent,params){
    $parent.find('.table-diff-right .table-diff-data').on('scroll',function(e){
      $('.table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
      $('.table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
      var _t = $(this),trHeight = $(this).find('tr:first').height(),trLength = $(this).find('tr').length;
      if(_t.scrollLeft() != tableRightLeft){
        tableRightLeft = _t.scrollLeft();
        console.log('横向滚动');
        return;
      }
        console.log('竖向滚动');
      if(trHeight*trLength <=  _t.scrollTop()+ _t.height()){
        if(loading == false){
          loading = true;
          params.loadData.firstResult = (params.firstResult+1)*params.maxResult;
          params.loadData.maxResult = params.maxResult;
          ajaxFn({
            url: params.url,
            data:params.loadData,
            callback:function(res){
              if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length < res.total){
                params.firstResult = params.firstResult + 1;
                var data = {};
                data.ydata = res.content.rows;
                data.tableNum = params.loadData.firstResult;
                $(params.parent).find('.table-diff-left .table-diff-data table tbody').append(params.tableDiffLeft(data));
                $(params.parent).find('.table-diff-right .table-diff-data table tbody').append(params.tableDiffRight(data));
              }else{
                $('.table-diff-header .scroll-loading').hide();
              }
              loading = false;
            }
          });
        }
      }
    })
    //$parent.find('.table-diff-left .table-diff-data').on('scroll',function(e){
    //  $parent.find('.table-diff-right .table-diff-data').scrollTop($(this)[0].scrollTop);
    //})

    $parent.find('.table-diff-left .table-diff-data').on('scroll',function(e){
        $parent.find('.table-diff-right').scrollTop($(this).scrollTop);
    })
}

function showDiffBarFn(params){
  var $parent = $(params.parent);
  $(document).on('mouseover',params.parent +' .table-diff-left .table-diff-data tr',function(e){
    var _tr = $(this);
    var _index = _tr.index();
    var trRigth = $(params.parent).find('.table-diff-right .table-diff-data table tr').eq(_index);
    if(trRigth.find('.codePro > div').text() == ''){
      $('.table-diff-bar .cancel-than').hide().prev().hide()
    }else{
      $('.table-diff-bar .cancel-than').show().prev().show()
    }
    $('.table-diff-bar').css({
      display: 'block',
      top: _tr.position().top + _tr.height() - 1,
      left: e.pageX - _tr.offset().left
    });
    singleData.id = $(this).attr('data-id');
  });
  $parent.find('.table-diff-bar').on('mouseover',function(e){
      $('.table-diff-bar').show();
      e.preventDefault();
  });
  $(document).on('mouseleave','.table-diff-left',function(){
      $('.table-diff-bar').hide();
  })
}

function bindFn(parent,event,className,fn){
  $(document).on(event,parent+' '+className,fn);
}

//点击表格数据事件
function tableDiffClickFn(){
  var _index = $(this).prevAll().length;
  var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
  for(var i=0;i<_tables;i++){
    $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('active').siblings('tr').removeClass('active');
  }
}

//鼠标表格悬停事件
function tableDiffHoverFn(){
  $(document).on("mouseover",'.table-diff-data tr',function(){
    var _index = $(this).prevAll().length;
    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
    for(var i=0;i<_tables;i++){
      $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('hover');
    }
  });
  $(document).on("mouseout",'.table-diff-data tr',function(){
    var _index = $(this).prevAll().length;
    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
    for(var i=0;i<_tables;i++){
      $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).removeClass('hover');
    }
  });
}

//选择标准数据比对
function selectThanFn(params,$this,loadObj){
  var drugId = $(params.parent).find('.than-content').attr('data-id');
  var selectThanData = {drugId: drugId};
  selectThanData[params.selectThanData]= $this.parents('tr').data('id');
  ajaxFn({
    url: params.saveUrl,
    data: selectThanData,
    callback:function(res){
      reloadsearchClassifyTel(loadObj);
      var _index = $('.table-diff-data-content').find('[data-id='+drugId+']').index();
      $(params.parent).find('.table-diff-data-content table tr').eq(_index).addClass('active').siblings().removeClass('active');
      $(params.parent).find('.table-diff-right .table-diff-data table tr').eq(_index).addClass('active').siblings().removeClass('active');
      $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(loadObj.tableDiffRightTr(res.content));
      $(document).scrollTop(0)
    },
    error:function(res){
      alert(res.message);
    }
  })
}

function addThanInfo(params,loadObj,$this) {
  var $tr = $this.parents('tr');
  var data = {
    default: {
      id: $tr.data('id'),
      name: $tr.find('.name').text(),
      spec: $tr.find('.spec').text(),
      manufacturerName: $tr.find('.manufacturerName').text(),
      pzwh: $tr.find('.pzwh').text()
    }
  };
  ajaxFn({
    url: 'dataDictionary/getDataDictionaryListByCode',
    data: {
      code: 1
    },
    callback: function (res) {
      data.minUseUnit = res.content;
      ajaxFn({
        url: 'dataDictionary/getDataDictionaryListByCode',
        data: {
          code: 2
        },
        callback: function (res) {
          data.packUnit = res.content;
          $('.popup').html(addDataPopupTel(data));
          $('.popup').show();
          $('.popup-add-info .popup-close').on('click', function () {
            $('.popup-add-info').hide()
          });
          $('.popup-add-info .saveOrUpdate').on('click', function () {
            var  drugId = $('.than-content').attr('data-id');
            ajaxFn({
              url: 'mcdProduct30Ues/saveOrUpdate',
              data: {
                productId: $('.popup-add-info').data('id'),
                minUseUnit: $('.popup-add-info .minUseUnit').val(),
                packUnit: $('.popup-add-info .packUnit').val(),
                convert: $('.popup-add-info .convert').val()
              },
              callback: function (res) {
                console.log(res.content);
                ajaxFn({
                  url: 'mcdProduct30/saveMatch',
                  data: {
                    drugId: drugId,
                    proId: res.content.proId
                  },
                  callback: function (res) {
                    $('.popup').hide();
                    $('.content .add-data').hide();
                    $('.content  .content-box-main').show();
                    var _index = $(params.parent).find('.table-diff-data-content [data-id='+drugId+']').index();
                    reloadsearchClassifyTel(loadObj);
                    $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(loadObj.tableDiffRightTr(res.content));
                  }
                })
              }
            })
          });
        }
      });
    }
  });
}

//显示19位标准数据
function addThan(params,loadObj){
  $('.popup').hide();
  $(params.parent).find('.content-box-main').hide();
  $(params.parent).find('.add-data').show();
  var prodName = $(params.parent).find('.search-than .prodName').val();
  addFn.loadAddData(prodName);
}

//查找标准比对数据
function findThanFn(params){
  var $parent = $(params.parent);
  params.firstResultThan = 0;
  params.maxResultThan = 16;
  params.findThanData.firstResult =  params.firstResultThan;
  params.findThanData.maxResult =  params.maxResultThan;
  console.log(params.findThanData,'findThanFn');
   $(params.findThanDataName).each(function(i,e){
     params.findThanData[e] = $parent.find('.'+e).val()
  });
  $parent.find('.than-table .loading-wrap').show();
  ajaxFn({
    url: params.url,
    data: params.findThanData,
    callback:function(res){
      if(res.content.length >=  params.findThanData.maxResult){
        $(params.parent).find('.standard-than .scroll-loading').show();
      }else{
        $(params.parent).find('.standard-than .scroll-loading').hide();
      }
      var tbodyData = {};
      $parent.find('.than-table .loading-wrap').hide();
      tbodyData.tbody = res.content;
      $parent.find('.standard-than .than-tbody .table').html(params.standardThanTbody(tbodyData));
      $parent.find('.standard-than .than-tbody').scrollTop(0);
    }
  })
}
//显示比对事件
function showThan(params){
  if(!singleData.id){
    return;
  }
  if($('.standard-than .than-content:hidden')){
    $('.standard-than .than-content').show()
  }
  var singleDataId = singleData.id;
  var  $parent= $(params.parent);
  $parent.find('.standard-than').show();
  $parent.find('.than-table .loading-wrap').show();
  var _prodName = $parent.find('.table-diff-data-content [data-id='+singleDataId+']').attr('data-name');
  var _index = $('.table-diff-data-content').find('[data-id='+singleDataId+']').index();
  $parent.find('.table-diff-data-content table tr').eq(_index).addClass('active').siblings().removeClass('active');
  $parent.find('.table-diff-right .table-diff-data table tr').eq(_index).addClass('active').siblings().removeClass('active');
  if(!!params.homeProdName){//西药
    var _homeFncName = $parent.find('.table-diff-data-content [data-id='+singleDataId+']').attr('data-fncName');
    $parent.find('.search-than .'+params.homeProdName).val(_prodName);
    params.findThanData[params.homeProdName] = _prodName;
    $parent.find('.search-than .'+params.homeFncName).val(_homeFncName);
    params.findThanData[params.homeFncName] = _homeFncName;
  }
  if(!!params.slicesName){//中药饮片
    $parent.find('.search-than .'+params.slicesName).val(_prodName);
    params.findThanData[params.slicesName] = _prodName;
  }
  ajaxFn({
    url: params.url,
    data: params.findThanData,
    callback:function(res){
      $parent.find('.than-table .loading-wrap').hide();
      params.data.thanData.id = singleDataId;
      params.data.thanData.tbody = res.content;
      $parent.find('.than-content').attr('data-id',singleDataId);
      $parent.find('.standard-than .than-tbody .table').html(params.standardThanTbody(params.data.thanData));
      if($(params.parent).find('.standard-than .than-tbody tr').length >=  params.findThanData.maxResult){
        $(params.parent).find('.standard-than .scroll-loading').show();
      }else{
        $(params.parent).find('.standard-than .scroll-loading').hide();
      }
      if(!!params.homeProdName){//西药
        $parent.find('.search-than .'+params.homeProdName).val(_prodName);
        $parent.find('.search-than .'+params.homeFncName).val(_homeFncName);
      }
      if(!!params.slicesName){//中药饮片
        $parent.find('.search-than .'+params.slicesName).val(_prodName);
      }
      $parent.find('.standard-than .than-tbody').on('scroll',function(){thanScrollFn(params,$(this))}); //滚动加载19位标准数据
    }
  })
}
//滚动加载19位标准数据
function thanScrollFn(params,$this){
   if($this.children('table').height() <= $this.scrollTop()+ $this.height() && $this.children('table').height() > 0){
    if(loading == false){
      loading = true;
      params.findThanData.firstResult = (params.firstResultThan+1) * params.maxResultThan;
      params.findThanData.maxResult = params.maxResultThan;
      console.log(params.firstResultThan);
      ajaxFn({
        url: params.url,
        data:params.findThanData,
        callback:function(res){
          if($(params.parent).find('.standard-than .than-tbody tr').length < res.total){
            params.firstResultThan = params.firstResultThan + 1;
            var tbodyData = {};
            tbodyData.tbody = res.content;
            $(params.parent).find('.standard-than .than-tbody .table').append(params.standardThanTr(tbodyData));
          }else{
            $(params.parent).find('.standard-than .scroll-loading').hide();
          }
          loading = false;
        }
      });
    }
  }
}
//隐藏比对数据详情
function hideDetail(e){
  $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
  $('.table-diff-data tr').removeClass('active');
  $('.table-diff-right-all').addClass('active');
  $('.table-diff-right-single').removeClass('active');
 }

//更新转换比
function upInputFn(params){
  bindFn(params.parent,'blur','.upInput',function(){
    var $tr = $('.table-diff-data-content .active'),index=$(this).parents('td').index();
    ajaxFn({
      url: 'mcdProduct30/updateHisProductByParmas',
      data: {
        drugId: $tr.attr('data-id'),
        colName: $(this).attr('data-name'),
        colView: $(this).parents('.table-diff-data').prev().find('th').eq(index).text(),
        aftValue: $(this).val()
      },
      callback:function(res){
        $(params.parent).find('.prompt').show();
        setTimeout(function () { $(params.parent).find('.prompt').fadeOut(); }, 2000);
      }
    })
  });
}
function upSelect(params){
  $(document).on('blur',params.parent+' .upSelect',function(){
    var $trLeft = $(params.parent).find('.table-diff-data-content .active');
    var $trRight = $(params.parent).find('.table-diff-right .table-diff-data .active');
    var index=$(this).parents('td').index();
    var colName = $(this).attr('data-name'),aftValue = $(this).val();
    $(this).parent().prev().html($(this).find("option:selected").text());
    ajaxFn({
      url:'mcdProduct30/updateHisProductByParmas',
      data: {
        drugId: $trLeft.attr('data-id'),
        colName: colName,
        colView: $(this).parents('.table-diff-data').prev().find('th').eq(index).text(),
        aftValue: aftValue
      },
      callback:function(res){
        if(colName == 'ypType'){
          if(params.ypTypeValue.indexOf(aftValue) == -1){
            $trLeft.remove();
            $trRight.remove();
          }
        }
        reloadsearchClassifyTel(params);
        $(params.parent).find('.prompt').show();
        setTimeout(function () { $(params.parent).find('.prompt').fadeOut(); }, 2000);
      }
    })
  });
}
//更新修改表格字段的值
function updateValueFn(params,loadObj){
  $(params.parent).find('.updateValueFn').on('blur',function(){
    var colView = $(this).prev().text();
    colView = colView.substring(0,colView.length-1);
    var colName = $(this).prev().attr('class');
    var aftValue = $(this).val();
    var drugId = $('.table-diff-right').attr('data-id');
    ajaxFn({
      url: params.updateValueUrl,
      data: {
        drugId: drugId,
        colName:colName,
        colView: colView,
        aftValue: aftValue
      },
      callback:function(res){
        var _index = $('.table-diff-data-content').find('[data-id='+drugId+']').index();
        if(colName == 'ypType'){
          if(loadObj.ypTypeValue.indexOf(aftValue) == -1){
            $(params.parent).find('.table-diff-data-content table tr').eq(_index).remove();
            $(params.parent).find('.table-diff-right .table-diff-data  table tr').eq(_index).remove();
            $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
            $('.table-diff-data tr').removeClass('active');
            $('.table-diff-right-all').addClass('active');
            $('.table-diff-right-single').removeClass('active');
          }
        }else{
          $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(loadObj.tableDiffRightTr(res.content));
        }
        reloadsearchClassifyTel(loadObj);
        $(params.parent).find('.prompt').show();
        setTimeout(function () { $(params.parent).find('.prompt').fadeOut(); }, 2000);
      }
    })
  });
  $(params.parent).find('.upInputFn').on('blur',function(){
    var colView = $(this).prev().text();
    colView = colView.substring(0,colView.length-1);
    var aftValue = $(this).val();
    var drugId = $('.table-diff-right').attr('data-id');
    var colName = $(this).prev().attr('data-name');
    ajaxFn({
      url: params.updateValueUrl,
      data: {
        drugId: drugId,
        colName: colName,
        colView: colView,
        aftValue: aftValue
      },
      callback:function(res){
        var _index = $('.table-diff-data-content').find('[data-id='+drugId+']').index();
        $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(loadObj.tableDiffRightTr(res.content));
        reloadsearchClassifyTel(loadObj);
        $(params.parent).find('.prompt').show();
        setTimeout(function () { $(params.parent).find('.prompt').fadeOut(); }, 2000);
      }
    })
  });
}

function paginationFn(params,type){
  var $parent=$(params.parent),data = {};
  var detailId = $parent.find('.table-diff-right').attr('data-id');
  if( type == 'prev'){
    var prevEle = $parent.find('.table-diff-data-content').find('[data-id='+detailId+']').prev();
    if(prevEle.length == 0){
      return
    }
    data[params.dataName] = prevEle.data('id');
  }else{
    var nextEle = $parent.find('.table-diff-data-content').find('[data-id='+detailId+']').next();
    if(nextEle.length == 0){
      return
    }
    data[params.dataName] = nextEle.data('id');
  }
  $parent.find('.table-diff-right').attr('data-id',data[params.dataName]);
  ajaxFn({
    url: params.url,
    data: data,
    callback:function(res){
      var tableDetailsData = res.content;
      $parent.find('.table-details-content-box').html(params.tableDetails(tableDetailsData));
      $parent.find('.table-diff-data-content [data-id='+data[params.dataName]+']').addClass('active').siblings().removeClass('active');
    }
  })
}

//查看详情事件
function showDetail(params,e,loadObj){
  if(!singleData.id){
    return;
  }
  var $parent=$(params.parent),data = {};
  data[params.dataName] = singleData.id;
  ajaxFn({
    url: params.url,
    data: data,
    callback:function(res){
      var tableDetailsData = res.content;
      $parent.find('.table-diff-right').attr('data-id',singleData.id);
      $parent.find('.table-diff-data-content').find('[data-id='+singleData.id+']').addClass('active').siblings().removeClass('active');
      $parent.find('.table-diff-left .table-diff-data').addClass('table-diff-show-detail');
      $parent.find('.table-diff-right-all').removeClass('active');
      $parent.find('.table-diff-right-single').addClass('active');
      $parent.find('.table-details-content-box').html(params.tableDetails(tableDetailsData));
      $parent.find('.btn-toggle').on('click',hideDetail); //切换详情事件
      if(!!params.updateValueUrl){
        updateValueFn(params,loadObj);
      }
      e.preventDefault();
    }
  })
}
//保存门诊/住院单位
function saveUnitFn(){
  var arr = [];
  $('.popup-company .unstandard').each(function(i,e){
    var obj = {};
    obj.id = $(e).attr('data-id');
    obj.hisProdId = $('.popup .popup-company').data('id');
    obj.formatUnit =$(e).find('.formatUnit').val();
    obj.unit = $(e).find('.unit').val();
    obj.convertRatio =$(e).find(' .convertRatio').val();
    obj.fConvertRatio =$(e).find('.fConvertRatio').val();
    arr.push(obj)
  });
  ajaxFn({
    url: 'unitConversion/saveOrUpdateUnitConversion',
    data: {
      drugId: $('.popup .popup-company').data('id'),
      unitConversions:JSON.stringify(arr)
    },
    callback:function(res){
      $('.popup').hide()
    }
  });
}
//新增门诊/住院单位
function addUnitFn(unitData){
   $('.popup-company .popup-content .popup-list').append(unitTel(unitData))
}
//弹窗修改门诊／住院单位
function ymzzyPopupFn(params){
  var $parent = $(params.parent);
  var popupTitle = $parent.find('.table-diff-data-content [data-id='+singleData.id+'] td').eq(1).text();
  ajaxFn({
    url: 'unitConversion/getListByHisProdId',
    data:{
      hisProdId: singleData.id
    },
    callback:function(res){
      var formatUnit=[],unitArr=[];
      unitArr= $parent.find('.table-diff-data-content [data-id='+singleData.id+']').find('.ymzzy').text();
      unitArr = unitArr.replace(/(^\s*)|(\s*$)/g, "").split(",");
      formatUnit = $parent.find('.table-diff-data-content [data-id='+singleData.id+']').find('.ymzzy').attr('data-minUseUnit');
      var companyData = {popupTitle: popupTitle,id: singleData.id,unitArr:unitArr,formatUnit:formatUnit};
      companyData.content = res.content;
      $('.popup').html(popupCompanyTal(companyData)).show();
      $('.popup-close').on('click',function(){$('.popup').hide()});
      $('.popup-company .add-unit').on('click',function(){addUnitFn({formatUnit:formatUnit,unitArr:unitArr})});
      $('.popup-company .save-unit').on('click',saveUnitFn)
    }
  });
}
//弹窗查看属性修改纪录
function recordFn(params){
  ajaxFn({
    url: 'sysUpdateLog/getListLogsByKeyvalue',
    data:{
      keyValue: $(params.parent).find('.table-diff-right').attr('data-id')
    },
    callback:function(res){
      var recordData ={};
      recordData.content= res.content;
      $('.popup').html(popupRecordTal(recordData)).show();
      $('.popup-close').on('click',function(){$('.popup').hide()});
    }
  })
}
//弹窗给药途径不计算强度
function popupChannelFn(params,$this){
  var $parent = $(params.parent);
  var _drugId = $parent.find('.table-diff-right').attr('data-id');
  if($parent.find('.table-diff-right-single').is(':hidden')){
    var index = $this.parents('tr').index();
    _drugId = $parent.find('.table-diff-left .table-diff-data tr').eq(index).attr('data-id')
  }
  ajaxFn({
    url: 'mcdProduct30/getRouteTree',
    data:{
      drugId: _drugId
    },
    callback:function(res){
      var channelData={};
      channelData.tree = res.content;
      $('.popup').html( popupChannelTal(channelData)).show();
      $('.popup-close').on('click',function(){$('.popup').hide()});
      $('.channel-name').on('click',function(){
        if($(this).hasClass('tree-active')){
          $(this).removeClass('tree-active').siblings('.sub-channel').hide();
          return;
        }
        $(this).addClass('tree-active').siblings('.sub-channel').show()
      });
      $('.channel-checkbox').on('click',function(){
        if($(this).is(':checked')){
          if($(this).siblings('.sub-channel')){
            $(this).parent('li').find('.sub-channel .channel-checkbox').prop("checked",true);
          }
        }else{
          $(this).parents('.sub-channel').siblings('.channel-checkbox').prop("checked",false);
          $(this).parent('li').find('.sub-channel .channel-checkbox').prop("checked",false);
        }
      });
      $('.save-channel').on('click',function(){
        saveChannelFn(params,$this,_drugId)
      });
    }
  })
}

function saveChannelFn(params,$this,_drugId){
  var arr=[],textArr=[];
  var _index = $('.table-diff-data-content').find('[data-id='+_drugId+']').index();
  $('.popup-channel .channel-checkbox:checked').each(function(i,e){
    arr.push($(e).attr('data-id'));
    textArr.push($(e).next().text())
  });
  textArr = textArr.join(',');
  if($(params.parent).find('.table-diff-right-single').is(':hidden')){
    $this.find('div').text(textArr);
  }else{
    $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).find('.adminRouteExclude div').text(textArr);
    $(params.parent).find('.table-details-content-box .adminRouteExclude').text(textArr);
  }
  ajaxFn({
    url: 'mcdProduct30/updateMcdP30Adminroute',
    data: {
      drugId: _drugId,
      routeIds: JSON.stringify(arr),
      names: textArr
    },
    contentType: "application/json",
    callback:function(res){
      $('.popup').hide();
      $(params.parent).find('.prompt').show();
      setTimeout(function () {$(params.parent).find('.prompt').fadeOut();}, 2000);
    }
  })
}
//取消比对
function cancelThanPopupFn(params,hptid){
  var _index = $('.table-diff-data-content').find('[data-id='+hptid+']').index();
  var cancelThanData = {};
  cancelThanData[params.cancelThanData] = hptid;
  $('.popup').html(popupCancelThanTal()).show();
  $('.popup-close').on('click',function(){$('.popup').hide()});
  $('.cancel-btn').on('click',function(){$('.popup').hide()});
  $('.popup .cancel-than-btn').on('click',function(){
    cancelThanFn(params,cancelThanData,_index)
  })
}
function cancelThanFn(params,cancelThanData,_index){
  ajaxFn({
    url: params.cancelUrl,
    data: cancelThanData,
    callback:function(res){
      $('.popup').hide();
      reloadsearchClassifyTel(params);
      if(!!res.content){
        $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(params.tableDiffRightTr(res.content));
      }
      $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
      $('.table-diff-data tr').removeClass('active');
      $('.table-diff-right-all').addClass('active');
      $('.table-diff-right-single').removeClass('active');
    }
  })
}
function isNull(_this){
  if(!!_this && typeof _this != undefined ){
    return _this;
  }
  return '';
}
//下载
function downloadFn(params){
  var downloadData = params.loadData;
  var downloadUrl=http;
  downloadUrl+= params.downloadUrl;
  downloadUrl+='?drugId='+isNull(downloadData.drugId);
  downloadUrl+='&drugName='+isNull(downloadData.drugName);
  downloadUrl+='&specName='+isNull(downloadData.specName);
  downloadUrl+='&jbyw='+isNull(downloadData.jbyw);
  downloadUrl+='&yblb='+isNull(downloadData.yblb);
  downloadUrl+='&wtsj='+isNull(downloadData.wtsj);
  downloadUrl+='&ybd='+isNull(downloadData.ybd);
  downloadUrl+='&wbd='+isNull(downloadData.wbd);
  downloadUrl+='&rsyy='+isNull(downloadData.rsyy);
  window.location.href=downloadUrl;
}

module.exports = {
  loadData:function(params){
    if(!!params.fn){
      params.fn();
    }
    var $parent =$(params.parent);

    loadChemistryTableFn(params);//加载数据

    showDiffBarFn(params);//显示比对按钮

    bindFn(params.parent,'click','.search-box .btn',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params)
    }); //搜索化学药比对
    bindFn(params.parent,'click','.search-data .jbywCount',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params,{name:'jbyw',val:$parent.find('.jbywCount .text').text()})
    }); //搜索基药化学药比对基药
    bindFn(params.parent,'click','.search-data .yblbCount',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params,{name:'yblb',val:$parent.find('.yblbCount .text').text()})
    }); //搜索医保化学药比对
    bindFn(params.parent,'click','.search-data .wtsjCount',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params,{name:'wtsj',val:$parent.find('.wtsjCount .text').text()})
    }); //搜索未比对化学药比对
    bindFn(params.parent,'click','.search-data .ybdCount',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params,{name:'ybd',val:$parent.find('.ybdCount .text').text()})
    }); //搜索问题数据化索化学药比对
    bindFn(params.parent,'click','.search-data .wbdCount',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params,{name:'wbd',val:$parent.find('.wbdCount .text').text()})
    }); //搜索已比对学药比对
    bindFn(params.parent,'click','.search-data .rsyyCount',function(){
      params.firstResult=0;params.maxResult=16;
      loadChemistryTableFn(params,{name:'rsyy',val:$parent.find('.rsyyCount .text').text()})
    }); //搜索妊娠用药比对化学药比

    $(document).on('click',params.parent+' .table-diff-data tr',tableDiffClickFn);//点击表格数据事件

    tableDiffHoverFn(); //鼠标表格悬停事件

    //下载表格
    bindFn(params.parent,'click','.search-data .download',function(){downloadFn(params)});
    //修改表格属性
    upSelect(params);
    //绑定给药途径
    bindFn(params.parent,'click','.adminRouteExclude',function(){popupChannelFn(params,$(this))});
    //取消比对
    bindFn(params.parent,'click','.table-diff-single-content .btn-cancel',function(){cancelThanPopupFn(params,$(params.parent).find('.table-diff-right').attr('data-id'))});
    bindFn(params.parent,'click','.table-diff-bar .cancel-than',function(){cancelThanPopupFn(params,singleData.id)});
  },
  showDetail:function(params,loadObj){
    bindFn(params.parent,'click','.showDetail',function(e){showDetail(params,e,loadObj)}); //绑定查看详情事件
    //查看详情页面上一条和下一条
    bindFn(params.parent,'click','.table-diff-right-single .pagination-prev',function(){paginationFn(params,'prev')});
    bindFn(params.parent,'click','.table-diff-right-single .pagination-next',function(){paginationFn(params,'next')});
  },
  showThan:function(params,loadObj){
    if(!!params.standardThanTel){
      $(params.parent).find('.standard-than').html(params.standardThanTel(params.data.thanData));
    }
    bindFn(params.parent,'click','.showThan',function(){showThan(params,loadObj)}); //显示标准数据比对
    bindFn(params.parent,'click','.find-than',function(){findThanFn(params)}); //查找30位标准比对数据
    bindFn(params.parent,'click','.than-table .select-than',function(){selectThanFn(params,$(this),loadObj)});//选择标准数据比对
    if(!!params.addThanFn){
      bindFn(params.parent,'click','.add-than',function(){addThan(params,loadObj)}); //查找19位标准数据
    }
    $(document).on('click','.add-than-info', function(){addThanInfo(params,loadObj,$(this))});
  },
  popupFn:function(params){
    //弹窗框方法
    bindFn(params.parent,'click','.ymzzy',function(){ymzzyPopupFn(params)});
    bindFn(params.parent,'click','.btn-record',function(){recordFn(params)});
  },
  updateConvertRatio:function(params){
    upInputFn(params);//更新输入框
  }
};
