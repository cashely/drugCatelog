var searchTel =  require('./../../component/searchBox/searchBox.hbs');
var standardThanTel =  require('./../../component/standardThanSlices/standardThan.hbs');
var tableDiffTel =  require('./../../component/tableDiffSlices/table-diff.hbs');
var tableDiffLeft= require('./../../component/tableDiffSlices/table-diff-left.hbs');
var tableDiffRight= require('./../../component/tableDiffSlices/table-diff-right.hbs');
var tableDetails =  require('./../../component/tableDiffSlices/table-details.hbs');
var ajaxFn =  require('./../../component/ajax');
var data =  require('./slicesData');

var singleData = {
  id:null,
  index:null
};
var firstResult =0,maxResults= 16,firstResultThan =0,maxResultsThan= 16;
var loading = false;
function showThanFn(){
  var _prodName = $('.slices .table-diff-data-content').find('[data-id='+singleData.id+'] td').eq(1).text();
  ajaxFn({
    url: 'zyyp/listMcdZyyp',
    data: {
      prod_name: _prodName
    },
    callback:function(res){
      data.thanData.id = singleData.id;
      data.thanData.tbody = res.content;
      $('.slices .standard-than').html(standardThanTel(data.thanData));
      $('.slices .than-table .select-than').on('click',selectThanFn);
      $('.slices .standard-than').show()
    }
  })
}
//选择标准数据比对
function selectThanFn(){
  ajaxFn({
    url: 'zyyp/saveMatch',
    data: {
      drugId: $('.than-content').data('id'),
      proId: $(this).parents('tr').data('id')
    },
    callback:function(res){
      console.log(res)
    }
  })
}

//查看详情事件
function showDetail(e){
  if(!singleData.id){
    return;
  }
  ajaxFn({
    url: 'zyyp/findMcdZyypById',
    data: {
      id: singleData.id
    },
    callback:function(res){
      var tableDetailsData = res.content;
      $('.slices .table-diff-data-content').find('[data-id='+singleData.id+']').addClass('active').siblings().removeClass('active');
      $('.slices .table-diff-left .table-diff-data').addClass('table-diff-show-detail');
      $('.slices .table-diff-right-all').removeClass('active');
      $('.slices .table-diff-right-single').addClass('active');
      $('.slices .table-details-content-box').html(tableDetails(tableDetailsData));
      e.preventDefault();
    }
  })
}

//取消比对
function cancelThanFn(hptid){
  ajaxFn({
    url: 'mcdProduct30/delMatch',
    data: {
      hptid: hptid
    },
    callback:function(res){
      loadData()
    }
  })
}

function hideDetail(){
  $('.slices .table-diff-left .table-diff-data').removeClass('table-diff-show-detail');
  $('.slices .table-diff-data tr').removeClass('active');
  $('.slices .table-diff-right-all').addClass('active');
  $('.slices .table-diff-right-single').removeClass('active');
}

function loadData(){
  ajaxFn({
    url: 'zyyp/listZyypHisProduct',
    data:{
      drugId: $('.slices .search-box .drug-id').val(),
      drugName: $('.slices .search-box .drug-name').val(),
      specName: $('.slices .search-box .spec-name').val(),
      firstResult: 0,
      maxResults: 16
    },
    callback:function(res){
      data.searchDate.total = res.total;
      data.searchDate.jbywCount = res.content.jbywCount;
      data.searchDate.rsyyCount = res.content.rsyyCount;
      data.searchDate.wbdCount = res.content.wbdCount;
      data.searchDate.wtsjCount = res.content.wtsjCount;
      data.searchDate.ybdCount = res.content.ybdCount;
      data.searchDate.yblbCount = res.content.yblbCount;
      data.diffData.ydata = res.content.rows;
      $(".slices .search-box").html(searchTel(data.searchDate));
      $('.slices .table-diff').html(tableDiffTel(data.diffData));
      $('.slices .search-box .btn').on('click',loadData);
      Fns();
    }
  });
}

function Fns(){
  //滚动事件
  $('.slices .table-diff-right .table-diff-data').on('scroll',function(){
    var _t = $(this);
    if(_t.children('table').height()-_t.scrollTop() <= _t.height()){
      console.log("ss")
      if(loading == false){
        loading = true;
        ajaxFn({
          url: 'zyyp/listZyypHisProduct',
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
            loading = false;
            Fns();
          }
        });
      }
    }
    $('.slices .table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
    $('.slices .table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
  });

  //点击表格数据事件
  $('.slices .table-diff-data tr').on('click',function(){
    var _index = $(this).prevAll().length;
    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
    for(var i=0;i<_tables;i++){
      $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('active').siblings('tr').removeClass('active');
    }
  });

  //鼠标表格悬停事件
  $('.slices .table-diff-data tr').hover(function(){
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

  //显示比对按钮
  $('.slices .table-diff-left .table-diff-data tr').on('mouseover',function(e){
    var _tr = $(this);
    $('.slices .table-diff-bar').css({
      display:'block',
      top:_tr.position().top+_tr.height()-1,
      left:e.pageX-_tr.offset().left
    });
    singleData.id = $(this).attr('data-id');
  });

  $('.slices .table-diff-bar').on('mouseout',function(){
    $('.table-diff-bar').hide();
  });
  $('.slices .table-diff-bar').on('mouseover',function(e){
    $('.slices .table-diff-bar').show();
    e.preventDefault();
  });

  //绑定查看详情事件
  $('.slices .showDetail').on('click',showDetail);
  //切换详情事件
  $('.btn-toggle').on('click',hideDetail);

  //绑定显示比对事件
  $('.slices .showThan').on('click',showThanFn);

  //取消比对
  $('.slices .table-diff-bar .cancel-than').on('click',function(){cancelThanFn(singleData.id)});
}

module.exports = function($this){
  var content = '<div class="content-box active '+$this.data("id")+'"><div class="search-box"></div><div class="table-diff slices-table"></div><div class="standard-than"></div></div>';
  $('.content').append(content);
  loadData()
}