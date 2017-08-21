var ajaxFn =  require('./ajax');//请求方法
var data =  require('./indexData');//化学药数据
var tableDiff = require('./tableDiff/table-diff.hbs');//化学药比对表格
var unitTel = require('./unit/unit.hbs');//门诊/住院单位
var popupCompanyTal = require('./popupCompany/index.hbs');
var popupRecordTal = require('./popupCompany/record.hbs');
var loading = false;
var singleData = {id:null, index:null};
var $parent = $('.'+data.name);
var tableRightLeft = 0;

//加载化学药数据方法
function loadChemistryTableFn(params,type){
  var $params = $(params.parent);
  var data = {
    drugId:$params.find('.search-box .drug-id').val(),
    drugName:$params.find('.search-box .drug-name').val(),
    specName:$params.find('.search-box .spec-name').val(),
    firstResult: params.firstResult * params.maxResults,
    maxResults: params.maxResults
  };
   if(!!type){
     data[type.name] = type.val;
   }
   ajaxFn({
    url: params.url,
    data: data,
    callback:function(res){
      params.firstResult = params.firstResult + 1;
      params.data.searchDate.total = res.total;
      params.data.searchDate.jbywCount = res.content.jbywCount;
      params.data.searchDate.rsyyCount = res.content.rsyyCount;
      params.data.searchDate.wbdCount = res.content.wbdCount;
      params.data.searchDate.wtsjCount = res.content.wtsjCount;
      params.data.searchDate.ybdCount = res.content.ybdCount;
      params.data.searchDate.yblbCount = res.content.yblbCount;
      $params.find('.search-box .search-data').html(params.searchClassifyTel(params.data.searchDate));
      params.data.diffData.ydata = res.content.rows;
      $params.find('.table-diff').html(params.tableDiffTel(params.data.diffData));
      tableDiffScrollFn($params,params);
    }
  });
}
//比对表格滚动事件
function tableDiffScrollFn($params,params){
    $params.find('.table-diff-right .table-diff-data').on('scroll',function(e){
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
        ajaxFn({
          url: params.url,
          data:{
            firstResult: (params.firstResult+1)*params.maxResults,
            maxResults: params.maxResults
          },
          callback:function(res){
            params.firstResult = params.firstResult + 1;
            var data = {};
            data.ydata = res.content.rows;
            $params.find('.table-diff-left .table-diff-data table tbody').append(params.tableDiffLeft(data));
            $params.find('.table-diff-right .table-diff-data table tbody').append(params.tableDiffRight(data));
            loading = false;
          }
        });
      }
    }
    //$('.table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
    //$('.table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
  })
}

function showDiffBarFn(params){
  $(document).on('mouseover',params.parent +' .table-diff-left .table-diff-data tr',function(e){
    var _tr = $(this);
   $('.table-diff-bar').css({
      display:'block',
      top:_tr.position().top+_tr.height()-1,
      left:e.pageX-_tr.offset().left
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
      var _index = $('.table-diff-data-content').find('[data-id='+drugId+']').index();
      loadChemistryTableFn(loadObj)
    }
  })
}

//显示30位标准数据
function addThan(params){
  $(params.parent).find('.content-box-main').hide();
  $(params.parent).find('.add-data').show();
}
//查找标准比对数据
function findThanFn(params){
  var findThanData ={},$parent = $(params.parent);
   $(params.findThanData).each(function(i,e){
    findThanData[e] = $parent.find('.'+e).val()
  })
  ajaxFn({
    url: params.url,
    data: findThanData,
    callback:function(res){
      var tbodyData = {};
      tbodyData.tbody = res.content;
      $parent.find('.standard-than .than-tbody').html(params.standardThanTbody(tbodyData));
    }
  })
}

//显示比对事件
function showThan(params){
  var  $parent= $(params.parent);
  $parent.find('.standard-than').show();
  var _prodName = $parent.find('.table-diff-data-content [data-id='+singleData.id+']').attr('data-name');
  var data = {};
  data[params.dataName] = _prodName;
  ajaxFn({
    url: params.url,
    data: data,
    callback:function(res){
      var _index = $('.table-diff-data-content').find('[data-id='+singleData.id+']').index();
      $parent.find('.table-diff-data-content table tr').eq(_index).addClass('active').siblings().removeClass('active');
      $parent.find('.table-diff-right .table-diff-data table tr').eq(_index).addClass('active').siblings().removeClass('active');
      params.data.thanData.id = singleData.id;
      params.data.thanData.tbody = res.content;
      $parent.find('.than-content').attr('data-id',singleData.id);
      $parent.find('.standard-than .than-tbody').html(params.standardThanTbody(params.data.thanData));
      $parent.find('.search-than .'+params.inputName).val(_prodName);
      $parent.find('.standard-than .than-tbody').on('scroll',function(){thanScrollFn(params,$(this))}); //滚动加载19位标准数据
    }
  })
}
//滚动加载19位标准数据
function thanScrollFn(params,$this){
  if($this.children('table').height() <= $this.scrollTop()+ $this.height()){
    if(loading == false){
      loading = true;
      ajaxFn({
        url: params.url,
        data:{
          firstResult: (params.firstResultThan+1)*params.maxResultsThan,
          maxResults: params.maxResultsThan
        },
        callback:function(res){
          params.firstResultThan = params.firstResultThan + 1;
          var tbodyData = {};
          tbodyData.tbody = res.content;
          $(params.parent).find('.standard-than .than-tbody tbody').append(params.standardThanTr(tbodyData));
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
function updateConvertRatio(params){
  bindFn(params.parent,'blur','.table-diff-data .convertRatio input',function(){
    var $tr = $(this).parents('tr');
    ajaxFn({
      url: 'mcdProduct30/updateHisProductByParmas',
      data: {
        drugId: $tr.attr('data-id'),
        colName: $tr.find('td').eq(3).attr('class'),
        colView: $('.table-diff-header th').eq(3).text(),
        aftValue: $(this).val()
      }
    })
  });
}

//更新修改表格字段的值
function updateValueFn(params){
  $(params.parent).find('.table-details-content-box .updateValueFn').on('blur',function(){
    var colView = $(this).prev().text();
    colView = colView.substring(0,colView.length-1);
    ajaxFn({
      url: params.updateValueUrl,
      data: {
        drugId: $('.table-diff-right').attr('data-id'),
        colName: $(this).prev().attr('class'),
        colView: colView,
        aftValue: $(this).val()
      }
    })
  });
}

function paginationFn(params,type){
  var $parent=$(params.parent),data = {};
  var detailId = $parent.find('.table-diff-right').attr('data-id');
  if( type == 'prev'){
    data[params.dataName] = $parent.find('.table-diff-data-content').find('[data-id='+detailId+']').prev().data('id');
  }else{
    data[params.dataName] = $parent.find('.table-diff-data-content').find('[data-id='+detailId+']').next().data('id');
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
function showDetail(params,e){
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
        updateValueFn(params);
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
    data: JSON.stringify(arr),
    contentType: "application/json",
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
      var formatUnit=[],unit=[];
      $(res.content.standard).each(function(i,e){
        if(formatUnit.indexOf(e.formatUnit) == -1){
          formatUnit.push(e.formatUnit)
        }
        if(unit.indexOf(e.unit) == -1){
          unit.push(e.unit)
        }
      });
      var companyData = {popupTitle: popupTitle,id: singleData.id};
      companyData.content = res.content;
      $('.popup').html(popupCompanyTal(companyData)).show();
      $('.popup-close').on('click',function(){$('.popup').hide()});
      $('.popup-company .add-unit').on('click',function(){addUnitFn({formatUnit:formatUnit,unit:unit})});
      $('.popup-company .save-unit').on('click',saveUnitFn)
    }
  });
}
//弹窗查看属性修改纪录
function recordFn(){
  var recordData = {popupTitle:'住院单位'};
  $('.popup').html(popupRecordTal(recordData)).show();
  $('.popup-close').on('click',function(){$('.popup').hide()});
}

//取消比对
function cancelThanFn(params,hptid){
  var _index = $('.table-diff-data-content').find('[data-id='+hptid+']').index();
  ajaxFn({
    url: params.cancelUrl,
    data: {
      hptid: hptid
    },
    callback:function(res){
      $(params.parent).find('.table-diff-right .table-diff-data tr').eq(_index).find('td').html('');
      $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
      $('.table-diff-data tr').removeClass('active');
      $('.table-diff-right-all').addClass('active');
      $('.table-diff-right-single').removeClass('active');
    }
  })
}
module.exports = {
  loadData:function(params){
    if(!!params.fn){
      params.fn();
    }
    var $parent =$(params.parent);
    loadChemistryTableFn(params);//加载数据
    showDiffBarFn(params);//显示化学药比对按钮
    bindFn(params.parent,'click','.search-box .btn',function(){
      params.firstResult=0;params.maxResults=16;
      loadChemistryTableFn(params)
    }); //搜索化学药比对
    bindFn(params.parent,'click','.search-data .jbywCount',function(){
      params.firstResult=0;params.maxResults=16;
      loadChemistryTableFn(params,{name:'jbywCount',val:$parent.find('.jbywCount .text').text()})
    }); //搜索基药化学药比对基药
    bindFn(params.parent,'click','.search-data .yblbCount',function(){
      params.firstResult=0;params.maxResults=16;
      loadChemistryTableFn(params,{name:'yblbCount',val:$parent.find('.yblbCount .text').text()})
    }); //搜索医保化学药比对
    bindFn(params.parent,'click','.search-data .wtsjCount',function(){
      params.firstResult=0;params.maxResults=16;
      loadChemistryTableFn(params,{name:'wtsjCount',val:$parent.find('.wtsjCount .text').text()})
    }); //搜索未比对化学药比对
    bindFn(params.parent,'click','.search-data .ybdCount',function(){
      params.firstResult=0;params.maxResults=16;
      loadChemistryTableFn(params,{name:'ybdCount',val:$parent.find('.ybdCount .text').text()})
    }); //搜索问题数据化索化学药比对
    bindFn(params.parent,'click','.search-data .wbdCount',function(){
      params.firstResult=0;params.maxResults=16;
      loadChemistryTableFn(params,{name:'wbdCount',val:$parent.find('.wbdCount .text').text()})
    }); //搜索已比对学药比对
    bindFn(params.parent,'click','.search-data .rsyyCount',function(){loadChemistryTableFn(params,{name:'rsyyCount',val:$parent.find('.rsyyCount .text').text()})}); //搜索妊娠用药比对化学药比
    $(document).on('click',params.parent+' .table-diff-data tr',tableDiffClickFn);//点击表格数据事件
    tableDiffHoverFn(); //鼠标表格悬停事件

    //取消比对
    bindFn(params.parent,'click','.table-diff-single-content .btn-cancel',function(){cancelThanFn(params,$(params.parent).find('.table-diff-right').attr('data-id'))});
    bindFn(params.parent,'click','.table-diff-bar .cancel-than',function(){cancelThanFn(params,singleData.id)});
  },
  showDetail:function(params){
    bindFn(params.parent,'click','.showDetail',function(e){showDetail(params,e)}); //绑定查看详情事件
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
      bindFn(params.parent,'click','.add-than',function(){addThan(params)}); //查找30位标准数据
    }
  },
  popupFn:function(params){
    //弹窗框方法
    bindFn(params.parent,'click','.ymzzy',function(){ymzzyPopupFn(params)});
    bindFn(params.parent,'click','.btn-record',function(){recordFn(params)});
  },
  updateConvertRatio:function(params){
    updateConvertRatio(params);//更新转换比
  }
};