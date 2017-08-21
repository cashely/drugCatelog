var ajaxFn =  require('./ajax');
var standardThanTel =  require('./standardThan/standardThan.hbs');
var standardThanTbody =  require('./standardThan/standardThanTbody.hbs');
var standardThanTr =  require('./standardThan/standardThanTr.hbs');
var tableDiff = require('./tableDiff/table-diff.hbs');
var tableDetails = require('./tableDiff/table-details.hbs');
var tableDiffLeft = require('./tableDiff/table-diff-left.hbs');
var tableDiffRight = require('./tableDiff/table-diff-right.hbs');
var popupCompanyTal = require('./popupCompany/index.hbs');
var popupRecordTal = require('./popupCompany/record.hbs');
var data =  require('./indexData');
var singleData = {id:null, index:null};
var firstResult =0,maxResults= 16,firstResultThan =0,maxResultsThan= 16;
var loading = false;
//加载表格数据
function loadTable(){
  ajaxFn({
    url: 'mcdProduct30/listHisProduct',
    data:{
      firstResult: 0,
      maxResults: 16
    },
    callback:function(res){
      data.diffData.ydata = res.content.rows;
      $('.table-diff').html(tableDiff(data.diffData));
      eventBinding();
    }
  });
}
//更新转换比
function updateConvertRatio(){
  $('.table-diff-data .convertRatio input').blur(function(){
    var $tr = $(this).parents('tr');
    ajaxFn({
      url: 'mcdProduct30/updateHisProductByParmas',
      data: {
        drugId: $tr.find('.table-diff-drugId').text(),
        colName: $tr.find('td').eq(3).attr('class'),
        colView: $('.table-diff-header th').eq(3).text(),
        aftValue: $(this).val()
      }
    })
  });
}
//更新修改表格字段的值
function updateValueFn(){
  var colView = $(this).prev().text();
  colView = colView.substring(0,colView.length-1);
  ajaxFn({
    url: 'mcdProduct30/updateHisProductByParmas',
    data: {
      drugId: $('.table-diff-right').attr('data-id'),
      colName: $(this).prev().attr('class'),
      colView: colView,
      aftValue: $(this).val()
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
function addUnitFn(){
  var item = '<div class="popup-item"> <input type="text" class="item-input convertRatio" value=""> <select class="item-select unit"> </select>'
  item +=  '<input type="text" class="item-input fConvertRatio" value=""> <select class="item-select last-select formatUnit"> </select> </div>'
  $('.popup-company .popup-content .popup-list').append(item)
}
//取消比对
function cancelThanFn(hptid){
  ajaxFn({
    url: 'mcdProduct30/delMatch',
    data: {
      hptid: hptid
    },
    callback:function(res){
      console.log(res);
      loadTable()
    }
  })
}

//选择标准数据比对
function selectThanFn(){
  ajaxFn({
    url: 'mcdProduct30/saveMatch',
    data: {
      drugId: $('.than-content').data('id'),
      proId: $(this).parents('tr').data('id')
    },
    callback:function(res){
      loadTable()
    }
  })
}

//查找标准比对数据
function findThanFn(){
  ajaxFn({
    url: 'mcdProduct30/listMcdProduct',
    data: {
      ypid: $('.ypid').val(),
      yjId: $('.yj_id').val(),
      prodName: $('.prod_name').val(),
      fncName: $('.fnc_name').val(),
      prodPzwh: $('.prod_pzwh').val()
    },
    callback:function(res){
      var tbodyData = {};
      tbodyData.tbody = res.content;
      $('.standard-than .than-tbody').html(standardThanTbody(tbodyData));
      $('.than-table .select-than').on('click',selectThanFn);
      //$('.add-than').on('click',function(){
      //  $('.content  .content-box-main').hide();
      //  $('.content .add-data').show();
      //});
    }
  })
}

//显示比对按钮
function showDiffBarFn(){
  $(document).on('mouseover','.table-diff-left .table-diff-data tr',function(e){
    var _tr = $(this);
    $('.table-diff-bar').css({
      display:'block',
      top:_tr.position().top+_tr.height()-1,
      left:e.pageX-_tr.offset().left
    });
    singleData.id = $(this).attr('data-id');
  });
  $('.table-diff-bar').on('mouseover',function(e){
    $('.table-diff-bar').show();
    e.preventDefault();
  });
  $(document).on('mouseleave','.table-diff-left',function(){
      $('.table-diff-bar').hide();
  })
}
var tableRightLeft = 0;
//滚动事件
function tableDiffScrollFn(){
  $('.table-diff-right .table-diff-data').on('scroll',function(e){
    $('.table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
    $('.table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
    var _t = $(this);
    if(_t.scrollLeft() != tableRightLeft){
        tableRightLeft = _t.scrollLeft();
        console.log('横向滚动');
        return;
    }

    console.log('竖向滚动');
    if(_t.children('table').height()-_t.scrollTop()+17 <= _t.height()){
      if(loading == false){
        loading = true;
        ajaxFn({
          url: 'mcdProduct30/listHisProduct',
          data:{
            firstResult: (firstResult+1)*maxResults,
            maxResults: maxResults
          },
          callback:function(res){
            firstResult = firstResult + 1;
            var data = {}
            data.ydata = res.content.rows;
            $('.table-diff-left .table-diff-data table tbody').append(tableDiffLeft(data));
            $('.table-diff-right .table-diff-data table tbody').append(tableDiffRight(data));
            eventBinding();
            loading = false;
          }
        });
      }
    }
     //console.log(_t.height()+','+_t.scrollTop()+','+_t.children('table').height());

  });
}

function tableDiffClickFn(){
  //点击表格数据事件
  $('.table-diff-data tr').on('click',function(){
    var _index = $(this).prevAll().length;
    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
    for(var i=0;i<_tables;i++){
      $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('active').siblings('tr').removeClass('active');
    }
  });
}
//鼠标表格悬停事件
function tableDiffHoverFn(){
  $('.table-diff-data tr').hover(function(){
    var _index = $(this).prevAll().length;

    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;

    for(var i=0;i<_tables;i++){
      $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('hover');
    }
  },function(){
    var _index = $(this).prevAll().length;
    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
    for(var i=0;i<_tables;i++){
      $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).removeClass('hover');
    }
  });
}

function thanScrollFn(){
  var _t = $(this);
  if(_t.children('table').height() <= _t.scrollTop()+ _t.height()){
    if(loading == false){
      loading = true;
      ajaxFn({
        url: 'mcdProduct30/listMcdProduct',
        data:{
          firstResult: (firstResultThan+1)*maxResultsThan,
          maxResults: maxResultsThan
        },
        callback:function(res){
          firstResultThan = firstResultThan + 1;
          var tbodyData = {};
          tbodyData.tbody = res.content;
          $('.standard-than .than-tbody .table').append(standardThanTr(tbodyData));
          $('.than-table .select-than').on('click',selectThanFn);
          loading = false;
        }
      });
    }
  }
}
//显示比对事件
function showThan(){
  var _prodName = $('.table-diff-data-content').find('[data-id='+singleData.id+'] td').eq(1).text();
  ajaxFn({
    url: 'mcdProduct30/listMcdProduct',
    data: {
      prod_name: _prodName
    },
    callback:function(res){
      var _index = $('.table-diff-data-content').find('[data-id='+singleData.id+']').index();
      $('.table-diff-data-content table tr').eq(_index).addClass('active').siblings().removeClass('active');
      $('.table-diff-right .table-diff-data table tr').eq(_index).addClass('active').siblings().removeClass('active');
      data.thanData.input = [
        {text:'YPID/品种代码:',inputClass:'ypid'},
        {text:'药交ID:',inputClass:'yj_id'},
        {text:'药品名称/商品名:',inputClass:'prod_name',val: _prodName},
        {text:'生产企业:',inputClass:'fnc_name'},
        {text:'批准文号/注册证号:',inputClass:'prod_pzwh'}
      ];
      data.thanData.id = singleData.id;
      data.thanData.tbody = res.content;
      $('.standard-than').html(standardThanTel(data.thanData));
      $('.standard-than').show();
      document.body.scrollTop=400;
      $('.than-table .select-than').on('click',selectThanFn);
      $('.add-than').on('click',function(){
        $('.content  .content-box-main').hide();
        $('.content .add-data').show();
      });
      //查找标准比对数据
      $('.find-than').on('click',findThanFn);
      $('.than-table .than-tbody').on('scroll',thanScrollFn);
    }
  })
}

function paginationFn(type){
  var detailId = $('.table-diff-right').attr('data-id');
  var trId;
  if( type == 'prev'){
     trId=$('.table-diff-data-content').find('[data-id='+detailId+']').prev().data('id');
  }else{
     trId=$('.table-diff-data-content').find('[data-id='+detailId+']').next().data('id');
  }
  $('.table-diff-right').attr('data-id',trId);
  ajaxFn({
    url: 'mcdProduct30/getHistProductById',
    data: {
      drugId: trId
    },
    callback:function(res){
      var tableDetailsData = res.content;
      $('.table-details-content-box').html(tableDetails(tableDetailsData));
      $('.table-diff-data-content').find('[data-id='+trId+']').addClass('active').siblings().removeClass('active');
    }
  })
}

function showDetailFn(){
  //绑定查看详情事件
  $('#showDetail').on('click',showDetail);
  //查看详情事件
  function showDetail(e){
    if(!singleData.id){
      return;
    }
    ajaxFn({
      url: 'mcdProduct30/getHistProductById',
      data: {
        drugId: singleData.id
      },
      callback:function(res){
        var tableDetailsData = res.content;
        $('.table-diff-right').attr('data-id',singleData.id);
        $('.table-diff-data-content').find('[data-id='+singleData.id+']').addClass('active').siblings().removeClass('active');
        $('.table-diff-left .table-diff-data').addClass('table-diff-show-detail');
        $('.table-diff-right-all').removeClass('active');
        $('.table-diff-right-single').addClass('active');
        $('.table-details-content-box').html(tableDetails(tableDetailsData));
        $('.table-diff-single-content .btn-cancel').on('click',function(){cancelThanFn($('.table-diff-right').data('id'))});
        $('.table-details-content-box .updateValueFn').on('blur',updateValueFn);
        e.preventDefault();
      }
    })
  }
  $('.table-diff-right-single .pagination-prev').on('click',function(){paginationFn('prev')});
  $('.table-diff-right-single .pagination-next').on('click',function(){paginationFn('next')});
  //切换详情事件
  $('.btn-toggle').on('click',hideDetail);
  function hideDetail(e){
    $('.table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
    $('.table-diff-data tr').removeClass('active');
    $('.table-diff-right-all').addClass('active');
    $('.table-diff-right-single').removeClass('active');
  }
}

//弹窗修改门诊／住院单位
function ymzzyPopupFn(){
  console.log(singleData.id);
  var popupTitle = $('.table-diff-data-content').find('[data-id='+singleData.id+'] td').eq(1).text();
  ajaxFn({
    url: 'unitConversion/getListByHisProdId',
    data:{
      hisProdId: singleData.id
    },
    callback:function(res){
      var companyData = {popupTitle: popupTitle,id: singleData.id};
      companyData.content = res.content;
      $('.popup').html(popupCompanyTal(companyData)).show();
      $('.popup-close').on('click',function(){$('.popup').hide()});
      $('.popup-company .add-unit').on('click',addUnitFn);
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

function eventBinding(){
  //显示比对按钮
  showDiffBarFn();
  //滚动事件
  tableDiffScrollFn();
  //点击表格数据事件
  tableDiffClickFn();
  //鼠标表格悬停事件
  tableDiffHoverFn();
  //取消比对
  $('.table-diff-bar .cancel-than').on('click',function(){cancelThanFn(singleData.id)});
  //显示比对内容
  $('.showThan').on('click',showThan);
  //显示详情
  showDetailFn();
  //更新转换比
  updateConvertRatio();
  //弹窗框方法
  $('.ymzzy').on('click',ymzzyPopupFn);
  $('.btn-record').on('click',recordFn);
}

module.exports = {
  eventBinding:function(){
    eventBinding()
  },
  loadTableFn:function(){
    loadTable()
  }
};
