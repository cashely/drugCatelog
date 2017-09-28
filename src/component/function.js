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
var tableRightLeft = 0,thanTableRightLeft=0;
var addFn= require('./addData/index');

//加载查询统计
function loadsearchClassifyTel(params,res){
  params.data.searchDate.total = res.total;
  params.data.searchDate.xyCount = res.content.xyCount;
  params.data.searchDate.zcyCount = res.content.zcyCount;
  params.data.searchDate.smsCount = res.content.smsCount;
  params.data.searchDate.jbywCount = res.content.jbywCount;
  params.data.searchDate.kjywCount = res.content.kjywCount;
  params.data.searchDate.zcyzsjCount = res.content.zcyzsjCount;
  params.data.searchDate.rsyyCount = res.content.rsyyCount;
  params.data.searchDate.xyzpCount = res.content.xyzpCount;
  params.data.searchDate.tpzjsCount = res.content.tpzjsCount;
  params.data.searchDate.nlyyCount = res.content.nlyyCount;
  params.data.searchDate.ppiCount = res.content.ppiCount;
  params.data.searchDate.jmdfCount = res.content.jmdfCount;
  params.data.searchDate.fzyyCount = res.content.fzyyCount;
  params.data.searchDate.yblbCount = res.content.yblbCount;
  params.data.searchDate.wbdCount = res.content.wbdCount;
  params.data.searchDate.ybdCount = res.content.ybdCount;
  params.data.searchDate.wtsjCount = res.content.wtsjCount;
  params.data.searchDate.ytyCount = res.content.ytyCount;
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
  params.loadingType = 1;
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
     $parent.find('.search-data .'+params.searchType).addClass('active').siblings('a').removeClass('active')
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
      $parent.find('.table-diff').html(params.tableDiffTel(params.data.diffData));
      resizeFn(params);//从新计算表格的高度
      if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length >= params.loadData.maxResult){
        $('.table-diff-header .scroll-loading').show();
      }else{
        $('.table-diff-header .scroll-loading').hide();
      }
      tableDiffScrollFn($parent,params);
    }
  });
}

function tableDiffRequest(params) {
  if (loading == false && params.loadingType) {
    loading = true;
    $(params.parent).find('.table-diff .loading-wrap').show();
    params.loadData.firstResult = (params.firstResult + 1) * params.maxResult;
    params.loadData.maxResult = params.maxResult;
    ajaxFn({
      url: params.url,
      data: params.loadData,
      callback: function (res) {
        if ($(params.parent).find('.table-diff-left .table-diff-data-content tr').length < res.total) {
          params.firstResult = params.firstResult + 1;
          var data = {};
          data.ydata = res.content.rows;
          data.tableNum = params.loadData.firstResult + 1;
          var divWidthArr=[];
          $(params.parent).find('.table-diff-data-content table tr:first td').each(function(i,e){
            divWidthArr.push($(e).find('div').width());
          });
          data.divWidthArr = divWidthArr;
          $(params.parent).find('.table-diff-left .table-diff-data table tbody').append(params.tableDiffLeft(data));
          $(params.parent).find('.table-diff-right .table-diff-data table tbody').append(params.tableDiffRight(data));
          if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length >= res.total){
            params.loadingType = 0;
            $('.table-diff-header .scroll-loading').hide();
          }
          //if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length >= params.loadData.maxResult){
          //  $parent.find('.table-diff-right .table-diff-data').scroll()
          //}
        } else {
          $('.table-diff-header .scroll-loading').hide();
        }
        $(params.parent).find('.table-diff .loading-wrap').hide();
        loading = false;
      }
    });
  }
}
//通用条件搜索
function generalSearch(params,$this,name){
  params.firstResult=0;params.maxResult=16;
  loadChemistryTableFn(params,{name:name,val:$this.find('.text').text()})
}
function bindGeneralSearch(params){
  var _parent = params.parent+' ';
  $(document).on('click',_parent+'.search-data .xy',function(){
    generalSearch(params,$(this),'xy')
  });
  $(document).on('click',_parent+'.search-data .zcy',function(){
    generalSearch(params,$(this),'zcy')
  });
  $(document).on('click',_parent+'.search-data .sms',function(){
    generalSearch(params,$(this),'sms')
  });
  $(document).on('click',_parent+'.search-data .jbyw',function(){
    generalSearch(params,$(this),'jbyw')
  });//搜索基药化学药比对基药
  $(document).on('click',_parent+'.search-data .kjyw',function(){
    generalSearch(params,$(this),'kjyw')
  });
  $(document).on('click',_parent+'.search-data .zcyzsj',function(){
    generalSearch(params,$(this),'zcyzsj')
  });
  $(document).on('click',_parent+'.search-data .rsyy',function(){
    generalSearch(params,$(this),'rsyy')
  });//搜索妊娠用药比对化学药比
  $(document).on('click',_parent+'.search-data .xyzp',function(){
    generalSearch(params,$(this),'xyzp')
  });
  $(document).on('click',_parent+'.search-data .tpzjs',function(){
    generalSearch(params,$(this),'tpzjs')
  });
  $(document).on('click',_parent+'.search-data .ppi',function(){
    generalSearch(params,$(this),'ppi')
  });
  $(document).on('click',_parent+'.search-data .jmdf',function(){
    generalSearch(params,$(this),'jmdf')
  });
  $(document).on('click',_parent+'.search-data .fzyy',function(){
    generalSearch(params,$(this),'fzyy')
  });
  $(document).on('click',_parent+'.search-data .yblb',function(){
    generalSearch(params,$(this),'yblb')
  });
  $(document).on('click',_parent+'.search-data .wbd',function(){
    generalSearch(params,$(this),'wbd')
  });
  $(document).on('click',_parent+'.search-data .ybd',function(){
    generalSearch(params,$(this),'ybd')
  });
  $(document).on('click',_parent+'.search-data .wtsj',function(){
    generalSearch(params,$(this),'wtsj')
  });
  $(document).on('click',_parent+'.search-data .yty',function(){
    generalSearch(params,$(this),'yty')
  });
}
//比对表格滚动事件
function tableDiffScrollFn($parent,params){
    $parent.find('.table-diff-right .table-diff-data').on('scroll',function(e){
      if(isIe6()){
        $('.table-diff-right .table-diff-header-content table').css({marginLeft:-$(this)[0].scrollLeft});
      }else{
        $('.table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
      }
      $('.table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
      var _t = $(this),trHeight = $(this).find('tr:first').height(),trLength = $(this).find('tr').length;
      if(_t.scrollLeft() != tableRightLeft){
        tableRightLeft = _t.scrollLeft();
        //console.log('横向滚动');
        return;
      }
      //console.log('竖向滚动');
      if(trHeight*trLength <=  _t.scrollTop()+ _t.height()){
        tableDiffRequest(params);
      }
    });
    $parent.find('.table-diff-left .table-diff-data').on('scroll',function(e){
      var _t = $(this),trHeight = $(this).find('tr:first').height(),trLength = $(this).find('tr').length;
      if(trHeight*trLength <=  _t.scrollTop()+ _t.height()){
        tableDiffRequest(params);
      }
    });
  $parent.find('.table-diff-right .table-diff-data').scroll()
}
//显示操作条
function showDiffBarFn(params){
  var $parent = $(params.parent);
  $(document).on('contextmenu',params.parent +' .table-diff-left .table-diff-data tr',function(e){
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
      top: e.pageY-_tr.parents('.table-diff-left').offset().top,
      left: e.pageX - _tr.offset().left
    });
    singleData.id = $(this).attr('data-id');
    e.preventDefault();
  });
  $(document).on('mouseleave','.table-diff-left',function(){
      $('.table-diff-bar').hide();
  })
}

//点击表格数据事件
function tableDiffClickFn(params,$this){
  var _index = $this.index();
  var $parent = $(params.parent);
  $('.table-diff-bar').hide();
  if($parent.find('.table-details-content-box').is(':visible')){
    var data={};
    data.drugId = $parent.find('.table-diff-data-content tr').eq(_index).attr('data-id');
    $parent.find('.table-diff-right').attr('data-id',data.drugId);
    loadDetails(params,params.detailUrl,data,data.drugId);//请求详情数据
  }else{
    $('.table-diff-data tr').removeClass('active');
    $this.addClass('active');
    if (!!$this.parents('.table-diff-left').length) {
      $parent.find('.table-diff-right .table-diff-data tr').eq(_index).addClass('active');
    } else {
      $parent.find('.table-diff-left .table-diff-data tr').eq(_index).addClass('active');
    }
    singleData.id = $parent.find('.table-diff-left .table-diff-data tr').eq(_index).attr('data-id');
  }
}

//鼠标表格悬停事件
function tableDiffHoverFn(params){
  $(document).on("mouseover",'.table-diff-data tr',function(){
    var _index = $(this).index();
    $(this).addClass('hover');
    if(!!$(this).parents('.table-diff-left').length){
      $(params.parent).find('.table-diff-right').css({position:'relative'});
      $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).addClass('hover');
    }else{
      $(params.parent).find('.table-diff-left .table-diff-data tr').eq(_index).addClass('hover');
    }
  });
  $(document).on("mouseout",'.table-diff-data tr',function(){
    var _index = $(this).index();
    $(this).removeClass('hover');
    if(!!$(this).parents('.table-diff-left').length){
      $(params.parent).find('.table-diff-right .table-diff-data  tr').eq(_index).removeClass('hover');
    }else{
      $(params.parent).find('.table-diff-left .table-diff-data tr').eq(_index).removeClass('hover');
    }
  });
}

//选择标准数据比对
function selectThanFn(params,$this,loadObj){
  var drugId = $(params.parent).find('.than-content').attr('data-id');
  var selectThanData = {drugId: drugId};
  selectThanData[params.selectThanData]= $this.parents('tr').data('id');
  var promptText = $('.prompt').text();
  $('.prompt').text('比对中...').show();
  ajaxFn({
    url: params.saveUrl,
    data: selectThanData,
    callback:function(res){

      reloadsearchClassifyTel(loadObj);
      var _index = $('.table-diff-data-content').find('[data-id='+drugId+']').index();
      $(params.parent).find('.table-diff-data-content table tr').eq(_index).addClass('active').siblings().removeClass('active');
      $(params.parent).find('.table-diff-right .table-diff-data table tr').eq(_index).addClass('active').siblings().removeClass('active');
      $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(loadObj.tableDiffRightTr(res.content));
      $(document).scrollTop(0);
      if($('.shade').is(':visible')){
        $('.prompt').text('比对成功');
        setTimeout(function () {$('.prompt').hide().text(promptText)}, 800);
      }
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
    url: 'dataDictionary/getDataDictionaryListByCode?code=1',
    type: 'GET',
    callback: function (res) {
      data.minUseUnit = res.content;
      ajaxFn({
        url: 'dataDictionary/getDataDictionaryListByCode?code=2',
        type: 'GET',
        callback: function (res) {
          data.packUnit = res.content;
          ajaxFn({
            url: 'dataDictionary/WARP_NAME?code=WARP_NAME',
            type: 'GET',
            callback: function (res) {
              data.warpName = res.content;
              $('.popup').html(addDataPopupTel(data)).show().find('.popup-shade').show();
              var popupHeight = $('.popup-add-info').height();
              $('.popup-add-info .iframe')[0].innerHTML = '<iframe class="popup-iframe" height="'+popupHeight+'px"></iframe>';
              $('.popup-add-info .popup-close').on('click', function () {
                //$('.popup-add-info').hide()
                $('.popup ').hide().find('.popup-iframe').remove()
              });
              $('.popup-add-info .saveOrUpdate').on('click', function () {
                var  drugId = $('.than-content').attr('data-id');
                ajaxFn({
                  url: 'mcdProduct30Ues/saveOrUpdate',
                  data: {
                    productId: $('.popup-add-info').data('id'),
                    minUseUnit: $('.popup-add-info .minUseUnit').val(),
                    packUnit: $('.popup-add-info .packUnit').val(),
                    warpName: $('.popup-add-info .warpName').val(),
                    convert: $('.popup-add-info .convert').val()
                  },
                  callback: function (res) {
                    ajaxFn({
                      url: 'mcdProduct30/saveMatch',
                      data: {
                        drugId: drugId,
                        proId: res.content.proId
                      },
                      callback: function (res) {
                        $('.popup ').hide().find('.popup-iframe').remove();
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
            }});
        }
      });
    }
  });
}

//显示19位标准数据
function addThan(params,loadObj){
  $('.popup').hide();
  closeShade();
  $(params.parent).find('.content-box-main').hide();
  $(params.parent).find('.add-data').show();
  var prodName = $(params.parent).find('.search-than .prodName').val();
  addFn.loadAddData(prodName);
  $(document).on('click','.add-data .goback', function () {
    $('.content .add-data').hide();
    $('.content  .content-box-main').show();
    $('.popup').hide();
    resizeFn(params)
  });
}
function closeShade(){
  $('.shade').hide();
  $('.prompt').hide().text('保存成功');
  $('.standard-than').hide()
    .find('.than-content').css({height:'auto'})
    .find('.search-than .input-group .input').val('');
}
function closePopup(){
  $('.popup-shade').hide();
  $('.popup').hide();
}
//查找标准比对数据
function findThanFn(params){
  var $parent = $(params.parent);
  params.loadingThanType = 1;
  params.firstResultThan = 0;
  params.maxResultThan = 16;
  params.findThanData.firstResult =  params.firstResultThan;
  params.findThanData.maxResult =  params.maxResultThan;
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
      var _table= $parent.find('.standard-than .than-tbody')[0];
      _table.innerHTML = params.standardThanTbody(tbodyData);
      $parent.find('.standard-than .than-tbody').scrollTop(0);
    }
  })
}
function upThanHeightFn(params,id) {
  if (!id) {return;}
  var $parent = $(params.parent);
  var trHeight = $parent.find('.table-diff-left .table-diff-data tr').first().height();
  var trOffsetHeight = $parent.find('.table-diff-data-content').find('[data-id=' + id + ']').offset().top;
  var thanHeight = $parent.find('.standard-than').height();
  if (trOffsetHeight >= thanHeight) {
    $('.standard-than').css({top: trOffsetHeight - thanHeight + 'px'});
  } else {
    var downHeight = trOffsetHeight + trHeight;
    var trDownHeight = $(window).height() - trOffsetHeight - trHeight;
    if (trDownHeight < thanHeight) {
      $('.standard-than .than-content').css({height: trDownHeight - 60})
    }
    $('.standard-than').css({top: downHeight + 'px'})
  }
}
//显示比对事件
function showThan(params){
  if (!singleData.id) {
    return;
  }
  var singleDataId = singleData.id;
  var $parent = $(params.parent);
  upThanHeightFn(params,singleData.id);
  $('.shade').css({
    //height: $(document).height(),
    //top: -$('.content-box.active').offset().top,
    //left: -22,
    //right: -22
  }).show();
  params.loadingThanType = 1;
  $parent.find('.standard-than').show();
  $parent.find('.than-table .loading-wrap').show();
  var _prodName = $parent.find('.table-diff-data-content [data-id='+singleDataId+']').attr('data-name');
  var _index = $('.table-diff-data-content').find('[data-id='+singleDataId+']').index();
  var promptText = $('.prompt').text();
  $parent.find('.table-diff-data-content table tr').eq(_index).addClass('active').siblings().removeClass('active');
  $parent.find('.table-diff-right .table-diff-data table tr').eq(_index).addClass('active').siblings().removeClass('active');
  if(!!params.homeProdName){//西药
    var _homeFncName = $parent.find('.table-diff-data-content [data-id='+singleDataId+']').attr('data-fncName');
    $parent.find('.search-than .'+params.homeProdName).val(_prodName);
    params.findThanData[params.homeProdName] = _prodName;
    $parent.find('.search-than .'+params.homeFncName).val(_homeFncName);
    params.findThanData[params.homeFncName] = _homeFncName;
    $parent.find('.search-than .spec').val('');
  }
  if(!!params.slicesName){//中药饮片
    $parent.find('.search-than .'+params.slicesName).val(_prodName);
    params.findThanData[params.slicesName] = _prodName;
  }
  $('.prompt').text('加载中...').show();
  ajaxFn({
    url: params.url,
    data: params.findThanData,
    callback:function(res){
      $parent.find('.than-table .loading-wrap').hide();
      params.data.thanData.id = singleDataId;
      params.data.thanData.tbody = res.content;
      $parent.find('.than-content').attr('data-id',singleDataId);
      $parent.find('.standard-than .than-tbody').html(params.standardThanTbody(params.data.thanData));
      if ($('.shade').is(':visible')) {
        $('.prompt').hide().text(promptText);
      }
      //$('.prompt').text('加载成功');
      //setTimeout(function () {$('.prompt').hide().text(promptText)}, 800);
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
    }
  })
}

function isIe6(){
  return /msie 6/i.test(navigator.userAgent);
}
//滚动加载19位标准数据
function thanScrollFn(params,$this){
    if(isIe6()){
      $('.than-table .than-thead table').css({marginLeft:-$this[0].scrollLeft});
    }else{
      $('.than-table .than-thead').scrollLeft($this[0].scrollLeft);
    }
    if($this.scrollLeft() != thanTableRightLeft){
      thanTableRightLeft = $this.scrollLeft();
      return;
    }
  if($this.find('table').height() <= $this.scrollTop()+ $this.height() && $this.find('table').height() > 0){
    if(loading == false && params.loadingThanType){
      loading = true;
      $(params.parent).find('.than-table .loading-wrap').show();
      params.findThanData.firstResult = (params.firstResultThan+1) * params.maxResultThan;
      params.findThanData.maxResult = params.maxResultThan;
      ajaxFn({
        url: params.url,
        data:params.findThanData,
        callback:function(res){
          if($(params.parent).find('.standard-than .than-tbody tr').length < res.total){
            params.firstResultThan = params.firstResultThan + 1;
            var tbodyData = {};
            tbodyData.tbody = res.content;
            $(params.parent).find('.standard-than .than-tbody .table tbody').append(params.standardThanTr(tbodyData));
            if($(params.parent).find('.standard-than .than-tbody tr').length >= res.total){
              params.loadingThanType = 0;
              $(params.parent).find('.standard-than .scroll-loading').hide();
            }
          }else{
            $(params.parent).find('.standard-than .scroll-loading').hide();
          }
          $(params.parent).find('.than-table .loading-wrap').hide();
          loading = false;
        }
      });
    }
  }
}

//隐藏比对数据详情
function hideDetail($parent){
  $parent.find('.table-diff-left').css({overflow:'hidden'});//ie6
  $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
  $('.table-diff-data tr').removeClass('active');
  $('.table-diff-right-all').addClass('active');
  $('.table-diff-right-single').removeClass('active');
  $('.table-diff-right .table-diff-data').scrollTop($('.table-diff-left .table-diff-data')[0].scrollTop);
  $('.popup .popup-record').hide();
  $('.popup .popup-cancel-than').hide();
 }
function promptFn(){
    $('.prompt').show();
    setTimeout(function () {
      if ($('.shade').is(':hidden')) {
        $('.prompt').hide();
      }
    }, 800);
}

//更新转换比
function upInputFn(params) {
  $(document).on('blur', params.parent + ' .upInput', function () {
    var index = $(this).parents('td').index();
    ajaxFn({
      url: 'mcdProduct30/updateHisProductByParmas',
      data: {
        drugId: singleData.id,
        colName: $(this).attr('data-name'),
        colView: $(this).parents('.table-diff-data').prev().find('th').eq(index).find('div').text(),
        aftValue: $(this).val()
      },
      callback: function (res) {
        promptFn();
      }
    });
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
        drugId: singleData.id,
        colName: colName,
        colView: $(this).parents('.table-diff-data').prev().find('th').eq(index).find('div').text(),
        aftValue: aftValue
      },
      callback:function(res){
        if(colName == 'ypType'){
          if(params.ypTypeValue.indexOf(aftValue) == -1){
            $trLeft.remove();
            $trRight.remove();
            if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length >= params.loadData.maxResult){
              $('.table-diff-header .scroll-loading').show();
            }else{
              $('.table-diff-header .scroll-loading').hide();
              tableDiffRequest(params)
            }
            var num = Math.max(aftValue-1,0);
            switch (num){
              case 0:
                loadChemistryTableFn(paramsAll[num]);
                break;
              case 1:
                if(!!paramsAll[num]){
                  loadChemistryTableFn(paramsAll[num]);
                }
                break;
            }
          }
        }
        reloadsearchClassifyTel(params);
        promptFn();
      }
    })
  });
}

//更新修改表格字段的值
function updateValueFn(params){
  $(document).on('blur',params.parent+' .updateValueFn',function(){
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
          if(params.ypTypeValue.indexOf(aftValue) == -1){
            $(params.parent).find('.table-diff-data-content table tr').eq(_index).remove();
            $(params.parent).find('.table-diff-right .table-diff-data  table tr').eq(_index).remove();
            if($(params.parent).find('.table-diff-left .table-diff-data-content tr').length >= params.loadData.maxResult){
              $('.table-diff-header .scroll-loading').show();
            }else{
              $('.table-diff-header .scroll-loading').hide();
              tableDiffRequest(params)
            }
            $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
            $('.table-diff-data tr').removeClass('active');
            $('.table-diff-right-all').addClass('active');
            $('.table-diff-right-single').removeClass('active');
            var num = Math.max(aftValue-1,0);
            switch (num){
              case 0:
                loadChemistryTableFn(paramsAll[num]);
                break;
              case 1:
                if(!!paramsAll[num]){
                  loadChemistryTableFn(paramsAll[num]);
                }
                break;
            }
          }
        }else{
          $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).html(params.tableDiffRightTr(res.content));
        }
        reloadsearchClassifyTel(params);
        promptFn();
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
        promptFn()
      }
    })
  });
}

//请求详情数据
function loadDetails(params,url,data,drugId){
  ajaxFn({
    url: url,
    data: data,
    callback:function(res){
      var tableDetailsData = res.content;
      $(params.parent).find('.table-details-content-box').html(params.tableDetails(tableDetailsData));
      $(params.parent).find('.table-diff-data-content [data-id='+drugId+']').addClass('active').siblings().removeClass('active');
    }
  })
}

function paginationFn(params,type){
  var $parent=$(params.parent),data = {};
  var detailId = $parent.find('.table-diff-right').attr('data-id');
  if(type == 'prev'){
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
  loadDetails(params,params.detailUrl,data,data[params.dataName]);//请求详情数据
}

//查看详情事件
function showDetail(params,e){
  if(!singleData.id){
    return;
  }
  var $parent=$(params.parent),data = {};
  data[params.dataName] = singleData.id;
  ajaxFn({
    url: params.detailUrl,
    data: data,
    callback:function(res){
      var tableDetailsData = res.content;
      $parent.find('.table-diff-right').attr('data-id',singleData.id);
      $parent.find('.table-diff-data-content').find('[data-id='+singleData.id+']').addClass('active').siblings().removeClass('active');
      $parent.find('.table-diff-left .table-diff-data').addClass('table-diff-show-detail');
      $parent.find('.table-diff-right-all').removeClass('active');
      $parent.find('.table-diff-right-single').addClass('active');
      $parent.find('.table-details-content-box').html(params.tableDetails(tableDetailsData));
      $parent.find('.btn-toggle').on('click',function(){hideDetail($parent)}); //切换详情事件
      //e.preventDefault();ie6下显示找不到成员
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
function ymzzyPopupFn(params,$this){
  var $parent = $(params.parent);
  var _tr = $this.parents('tr');
  var hisProdId = _tr.attr('data-id');
  var popupTitle = _tr.find('td').eq(2).text();
  ajaxFn({
    url: 'unitConversion/getListByHisProdId',
    data:{
      hisProdId: hisProdId
    },
    callback:function(res){
      var formatUnit=[],unitArr=[];
       unitArr= _tr.find('.ymzzy').text();
       unitArr = unitArr.replace(/(^\s*)|(\s*$)/g, "").split(",");
    //  for(var i=0;i<res.content.length;i++){
    //      unitArr.push(res.content[i].unit)
    //  }
      formatUnit = _tr.find('.ymzzy').attr('data-minUseUnit');
      var companyData = {popupTitle: popupTitle,id: hisProdId,unitArr:unitArr,formatUnit:formatUnit};
      companyData.content = res.content;
      $('.popup').html(popupCompanyTal(companyData)).show().find('.popup-shade').show();
      var popupHeight = $('.popup-company').height();
      $('.popup-company .iframe')[0].innerHTML = '<iframe class="popup-iframe" height="'+popupHeight+'px"></iframe>';
      $('.popup-close').on('click',function(){$('.popup ').hide().find('.popup-iframe').remove()});
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
      $(res.content).each(function(i,e){
        if($('.table-details-content-box .'+e.colName).next('select').length > 0){
          e.type = 'select'
        }
      });
      recordData.content= res.content;
      $('.popup').html(popupRecordTal(recordData)).show().find('.popup-shade').show();
      var popupHeight = $('.popup-record').height();
      $('.popup-record .iframe')[0].innerHTML = '<iframe class="popup-iframe" height="'+popupHeight+'px"></iframe>';
      $('.popup-close').on('click',function(){$('.popup ').hide().find('.popup-iframe').remove()});
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
      $('.popup').html( popupChannelTal(channelData)).show().find('.popup-shade').show();
      var popupHeight = $('.popup-channel').height();
      $('.popup-channel .iframe')[0].innerHTML = '<iframe class="popup-iframe" height="'+popupHeight+'px"></iframe>';
      $('.popup-close').on('click',function(){$('.popup ').hide().find('.popup-iframe').remove()});
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
      promptFn();
    }
  })
}

//取消比对
function cancelThanPopupFn(params,hptid){
  var _index = $('.table-diff-data-content').find('[data-id='+hptid+']').index();
  var cancelThanData = {};
  cancelThanData[params.cancelThanData] = hptid;
  $('.popup').html(popupCancelThanTal()).show().find('.popup-shade').show();
  var popupHeight = $('.popup-cancel-than').height();
  $('.popup-cancel-than .iframe')[0].innerHTML = '<iframe class="popup-iframe" height="'+popupHeight+'px"></iframe>';
  $('.popup-close').on('click',function(){$('.popup ').hide().find('.popup-iframe').remove()});
  $('.cancel-btn').on('click',function(){$('.popup').hide().find('.popup-iframe').remove()});
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
  downloadUrl+='&xy='+isNull(downloadData.xy);
  downloadUrl+='&zcy='+isNull(downloadData.zcy);
  downloadUrl+='&sms='+isNull(downloadData.sms);
  downloadUrl+='&jbyw='+isNull(downloadData.jbyw);
  downloadUrl+='&kjyw='+isNull(downloadData.kjyw);
  downloadUrl+='&zcyzsj='+isNull(downloadData.zcyzsj);
  downloadUrl+='&rsyy='+isNull(downloadData.rsyy);
  downloadUrl+='&xyzp='+isNull(downloadData.xyzp);
  downloadUrl+='&tpzjs='+isNull(downloadData.tpzjs);
  downloadUrl+='&nlyy='+isNull(downloadData.nlyy);
  downloadUrl+='&ppi='+isNull(downloadData.ppi);
  downloadUrl+='&jmdf='+isNull(downloadData.jmdf);
  downloadUrl+='&fzyy='+isNull(downloadData.fzyy);
  downloadUrl+='&yblb='+isNull(downloadData.yblb);
  downloadUrl+='&ybd='+isNull(downloadData.ybd);
  downloadUrl+='&wbd='+isNull(downloadData.wbd);
  downloadUrl+='&wtsj='+isNull(downloadData.wtsj);
  downloadUrl+='&yty='+isNull(downloadData.yty);
  window.location.href=downloadUrl;
  window.event.returnValue = false;
  return false;
}

function offsetLeftFn(obj){
  var tmp = obj.offsetLeft;
  var val = obj.offsetParent;
  while(val != null){
    tmp += val.offsetLeft;
    val = val.offsetParent;
  }
  return tmp;
}

//说明书
function instructionFn(params,$this){
  var _index = $this.parents('tr').index();
  var _drugId = $(params.parent).find('.table-diff-left .table-diff-data tr').eq(_index).attr('data-id');
  if($this.hasClass('has-instruction')){
    window.open('/hpms/getHisSms?ypmcid='+_drugId)
  }
}

var xx=0,tBar={};
function resetTableFn(params){
  function getLeft(obj) {
    if (obj == null)
      return null;
    var mendingObj = obj;
    var mendingLeft = mendingObj.offsetLeft;
    while (mendingObj != null && mendingObj.offsetParent != null && mendingObj.offsetParent.tagName != "BODY") {
      mendingLeft = mendingLeft + mendingObj.offsetParent.offsetLeft;
      mendingObj = mendingObj.offsetParent;
    }

    return mendingLeft;
  }
  function getTop(obj) {
    if (obj == null)
      return null;
    var mendingObj = obj;
    var mendingTop = mendingObj.offsetTop;
    while (mendingObj != null && mendingObj.offsetParent != null && mendingObj.offsetParent.tagName != "BODY") {
      mendingTop = mendingTop + mendingObj.offsetParent.offsetTop;
      mendingObj = mendingObj.offsetParent;
    }
    return mendingTop;
  }
//获取鼠标的位置
  function getMousePosition(event) {
    var position = {
      MouseX: 0,
      MouseY: 0
    }
    if (event.pageX != undefined) {
      position.MouseX = event.pageX;
      position.MouseY = event.pageY;
    } else {
      var target = EventUtil.getTarget(event);
      position.MouseX = event.offsetX + getLeft(target);
      position.MouseY = event.offsetY + getTop(target);

    }
    return position;
  }
  //获取鼠标的位置
  $(document).on('mousemove',params.parent + ' .table-diff-header', function (e) {
     /*xx = e.originalEvent.x || e.originalEvent.layerX ;*/
    xx=getMousePosition(e).MouseX;//兼容IE6
  });

    $(params.parent).on('mousedown','.table-diff-header th .resize',function(){
    tBar.self= $(this);
    tBar.mouseDown = 1;
    tBar.width = offsetLeftFn($(this)[0]);
    tBar.tdWidth = $(this).parent()[0].offsetWidth;
    tBar.tableWidth=$(params.parent).find('.table-diff .table-diff-left .table-diff-header table').width();
    $(this).css({right: -(xx - tBar.width)});
  });
  $(params.parent).on('mouseup',function(){
    if(tBar.mouseDown){
      tBar.mouseDown = 0;
      tBar.self.css({right: -2});
      var tTh= tBar.self.parent();
      var _index =tTh.index();
      $(params.parent).find('.table-diff-header th .resize').css({background:'transparent'});
      tBar.self.prev().css({width:tBar.tdWidth +(xx - tBar.width)-10});
      $(params.parent).find('.table-diff .table-diff-right').css({marginLeft: tBar.tableWidth+ ((xx - tBar.width))});
      $(params.parent).find('.table-diff .table-diff-left').css({width: tBar.tableWidth+ ((xx - tBar.width))});
      $(params.parent).find('.table-diff .table-diff-left .table-diff-data').css({width: tBar.tableWidth+ ((xx - tBar.width))});
      $(params.parent).find('.table-diff .table-diff-left .table-diff-header').css({width: tBar.tableWidth+ ((xx - tBar.width))});
      $(params.parent).find('.table-diff-data-content table tr').each(function(i,e){
        $(e).find('td').eq(_index).find('div').css({width:tBar.tdWidth +(xx - tBar.width)-10});
      })
    }
  });
  $(params.parent).on('mousemove','.table-diff-header th',function(e){
    $(this).find('.resize').show();
    if(tBar.mouseDown){
      tBar.self.css({right: -(xx - tBar.width)-2});
    }
    e.preventDefault()
  });
  $(params.parent).on('mousemove','.table-diff-header th .resize ',function(){
    if(!tBar.mouseDown){
      $(this).css({background:'#fff'})
    }
  });
  $(params.parent).on('mouseleave','.table-diff-left .table-diff-header th .resize',function(){
    if(!tBar.mouseDown)$(this).css({background:'transparent'})
  });
}
//解决ie7以下JSON.stringify()报错
function ieJson(){
  if (!window.JSON) {
    window.JSON = {
      parse: function(jsonStr) {
        return eval('(' + jsonStr + ')');
      },
      stringify: function(jsonObj) {
        var result = '',
          curVal;
        if (jsonObj === null) {
          return String(jsonObj);
        }
        switch (typeof jsonObj) {
          case 'number':
          case 'boolean':
            return String(jsonObj);
          case 'string':
            return '"' + jsonObj + '"';
          case 'undefined':
          case 'function':
            return undefined;
        }

        switch (Object.prototype.toString.call(jsonObj)) {
          case '[object Array]':
            result += '[';
            for (var i = 0, len = jsonObj.length; i < len; i++) {
              curVal = JSON.stringify(jsonObj[i]);
              result += (curVal === undefined ? null : curVal) + ",";
            }
            if (result !== '[') {
              result = result.slice(0, -1);
            }
            result += ']';
            return result;
          case '[object Date]':
            return '"' + (jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()) + '"';
          case '[object RegExp]':
            return "{}";
          case '[object Object]':
            result += '{';
            for (i in jsonObj) {
              if (jsonObj.hasOwnProperty(i)) {
                curVal = JSON.stringify(jsonObj[i]);
                if (curVal !== undefined) {
                  result += '"' + i + '":' + curVal + ',';
                }
              }
            }
            if (result !== '{') {
              result = result.slice(0, -1);
            }
            result += '}';
            return result;

          case '[object String]':
            return '"' + jsonObj.toString() + '"';
          case '[object Number]':
          case '[object Boolean]':
            return jsonObj.toString();
        }
      }
    };
  }
}

function resizeFn(params){
  var $parent = $(params.parent);
  var _height = $(window).height();
  var tableHeight = _height - $parent.find('.table-diff').offset().top - $('.footer').height() - 10;
  $('.table-diff').css({height:tableHeight});
  $parent.find('.table-diff-left .table-diff-data').height(tableHeight-28);
  $parent.find('.table-diff-right .table-diff-data').height(tableHeight-28);
  $parent.find('.table-diff-single-content').height(tableHeight-28);
  $parent.find('.table-diff-single-content .table-details-content-box').height(tableHeight-108);
  closeShade()
}

var  paramsAll=[],paramsType=[];
ieJson();
module.exports = {
  loadData:function(params){
    var parent = params.parent + ' ';
    var $parent = $(params.parent);

    if (!!params.fn) {
      params.fn();
    }

    if (paramsType.indexOf(params.parent) == -1) {
      paramsType.push(params.parent);
      paramsAll.push(params)
    }

    loadChemistryTableFn(params);//加载数据

    bindGeneralSearch(params);//通用条件搜索

    showDiffBarFn(params);//显示比对按钮

    resetTableFn(params);//拖动表格事件

    $(document).on('click', parent + '.search-top-lf .btn', function () {
      params.firstResult = 0;
      params.maxResult = 16;
      loadChemistryTableFn(params)
    }); //搜索化学药比对

    $(document).on('click', parent + '.search-data .search-all', function () {
      params.firstResult = 0;
      params.maxResult = 16;
      loadChemistryTableFn(params)
    });//关键词-全部

    $(document).on('click', parent + '.table-diff-data tr', function () {
      $(this).css({background:'red'});
      tableDiffClickFn(params, $(this));
    });//点击表格数据事件

    tableDiffHoverFn(params); //鼠标表格悬停事件

    //说明书
    $(document).on('click',parent + '.table-diff-right .instruction',function () {
      instructionFn(params,$(this))
    }); //搜索化学药比对

    //下载表格
    $(document).on('click', parent + '.search-top-rt .download', function () {
      downloadFn(params)
    });

    upSelect(params);//修改表格属性

    updateValueFn(params);//修改详情的属性

    //绑定给药途径
    $(document).on('click', parent + '.adminRouteExclude', function () {
      popupChannelFn(params,$(this))
    });
    //取消比对
    $(document).on('click', parent + '.table-diff-single-content .btn-cancel', function () {
      cancelThanPopupFn(params,$(params.parent).find('.table-diff-right').attr('data-id'))
    });
    $(document).on('click', parent + '.table-diff-bar .cancel-than', function () {
      cancelThanPopupFn(params,singleData.id)
    });
    $(document).on('click','.popup-shade',closePopup);

    if(!!params.detailUrl){
      $(document).on('click', parent + '.showDetail', function (e) {
        showDetail(params, e)
      });//绑定查看详情事件

      $(document).on('click', parent + '.table-diff-right-single .pagination-prev', function () {
        paginationFn(params, 'prev')
      }); //查看详情页面上一条

      $(document).on('click', parent + '.table-diff-right-single .pagination-next', function () {
        paginationFn(params, 'next')
      }); //查看详情页面下一条
    }
    $(window).on('resize',function () {
      if($('.content .add-data').is(':hidden')){
        resizeFn(params)
      }else{
        $('.add-than-table .add-than-tbody tr:first td>div').each(function(i,e){
          $('.add-than-table .than-thead tr:first td>div').eq(i).width($(e).width())
        });
        $('.add-than-table .than-thead tr:first td:last').width($('.add-than-table .add-than-tbody tr:first td:last').width());
        $('.add-than-table .add-than-tbody').height($(window).height()-$('.add-than-table').offset().top- $('.add-than-table .than-thead').height()-$('.footer').height() - 10);
      }
    });
    $(document).on('click','.tabs .tabs-item',function(){
      resizeFn(params)
    });
  },
  showThan:function(params,loadObj){
    var parent = params.parent + ' ';
    if (!!params.standardThanTel) {
      $(params.parent).find('.standard-than').html(params.standardThanTel(params.data.thanData));
    }

    $(document).on('click', parent + '.showThan', function () {
      showThan(params, loadObj)
    });//显示标准数据比对

    $(document).on('click', parent + '.find-than', function () {
      findThanFn(params)
    });//查找30位标准比对数据

    $(params.parent).find('.standard-than .than-tbody').on('scroll',function(){thanScrollFn(params,$(this))}); //滚动加载19位标准数据

    $(document).on('click', parent + '.than-table .select-than', function () {
      selectThanFn(params, $(this), loadObj)
    });//选择标准数据比对

    if (!!params.addThanFn) {
      $(document).on('click', parent + '.add-than', function () {
        addThan(params, loadObj)
      });//查找19位标准数据
    }
    $(document).on('click', '.standard-than .toggle-text', closeShade);

    $(document).on('click', '.add-than-info', function () {
      addThanInfo(params, loadObj, $(this))
    });

    $('.shade').on('click',closeShade);
  },
  popupFn:function(params){
    var parent = params.parent + ' ';
    //弹窗框方法
    $(document).on('click', parent + '.ymzzy', function () {
      ymzzyPopupFn(params, $(this))
    });
    $(document).on('click', parent + '.btn-record', function () {
      recordFn(params)
    });
  },
  updateConvertRatio: function (params) {
    upInputFn(params);//更新输入框
  }
};


function compileAllDrug(){
    var text = $('.prompt').text();
    $('.prompt').text('操作中...').show();
    ajaxFn({
      url: 'mcdProduct30/compileAllDrug',
      callback:function(res){
        $('.prompt').text(text).hide();
      },
      error:function(){
        $('.prompt').text(text).hide();
      }

    })
}
function initCode(){
    var text = $('.prompt').text();
    $('.prompt').text('操作中...').show();
    ajaxFn({
      url: 'mcdProduct30/initCode',
      callback:function(res){
        $('.prompt').text(text).hide();
      },
      error:function(){
        $('.prompt').text(text).hide();
      }
    })
}
$(document).on('click','#initCode',initCode);
$(document).on('click','#compileAllDrug',compileAllDrug);
