/**
 * Created by Administrator on 2017/8/21.
 */
/**
 * 添加对比数据
 */
var addData = require('./index.hbs');
var searchBox = require('../searchBox/searchBox.hbs');
var tbodyTel = require('./tbody.hbs');
var tr = require('./tr.hbs');
var ajaxFn = require('../ajax');
var data = require('../../page/index/indexData');//化学药数据
var parent = '.'+data.name;
var firstResult =0,maxResult= 16;loading = false;
var listProductData ={};
function addDataFn(drugName){
  $('.add-data').html(addData(data.addData));
  $('.add-search-than .add-drug-name').val(drugName);
  listProductData ={
    firstResult: firstResult,
    maxResult: maxResult,
    drugName: drugName
  };
  ajaxFn({
    url: 'product/listProduct',
    data:listProductData,
    callback: function (res) {
      data.addData.tbody = res.content;
      var _table=  $('.add-than-tbody')[0];
      _table.innerHTML = tbodyTel(data.addData);
      if($('.add-than-tbody tr').length >=  listProductData.maxResult){
        $('.add-than-tbody .scroll-loading').show();
      }else{
        $('.add-than-tbody .scroll-loading').hide();
      }
      $('.add-than-table .add-than-tbody').on('scroll',function(){
        var _t = $(this);
        if(_t.children('table').height() <= _t.scrollTop()+ _t.height()){
          $('.add-than-table .loading-wrap').show();
          listProductData.firstResult =(firstResult+1)*maxResult;
          listProductData.maxResult = maxResult;
          if(loading == false){
            loading = true;
            ajaxFn({
              url:'product/listProduct',
              data:listProductData,
              callback:function(res){
                if($('.add-than-tbody tr').length < res.total){
                  firstResult = firstResult + 1;
                  var trData = {};
                  trData.tbody = res.content;
                  $('.add-than-tbody .table tbody').append(tr(trData));
                }else{
                  $('.add-than-tbody .scroll-loading').hide();
                }
                $('.add-than-table .loading-wrap').hide();
                loading = false;
              }
            });
          }
        }
      });
    }
  });
}
module.exports = {
  loadAddData:function(drugName){
    addDataFn(drugName);
    $(document).on('click','.add-data .goback', function () {
      $('.content .add-data').hide();
      $('.content  .content-box-main').show();
      $('.popup').hide();
    });
    $(document).on('click','.find-add-than', function () {
      $('.add-than-table .loading-wrap').show();
      firstResult=0 ;maxResult=16;
      listProductData = {
        drugName: $('.add-drug-name').val(),
        spec: $('.add-spec').val(),
        manufacturerName: $('.add-manufacturer-name').val(),
        firstResult: firstResult,
        maxResult: maxResult
      };
      if(loading == false){
        loading = true;
        ajaxFn({
          url: 'product/listProduct',
          data: listProductData,
          callback: function (res) {
            $('.add-than-table .loading-wrap').hide();
            data.addData.tbody = res.content;
            var _table=  $('.add-than-tbody')[0];
            _table.innerHTML = tbodyTel(data.addData);
            if($('.add-than-tbody tr').length >=  listProductData.maxResult){
              $('.add-than-tbody .scroll-loading').show();
            }else{
              $('.add-than-tbody .scroll-loading').hide();
            }
            loading = false;
          }
        });
      }
    });
  }
};