/**
 * Created by Administrator on 2017/8/21.
 */
/**
 * 添加对比数据
 */
var addData = require('./index.hbs');
var searchBox = require('../searchBox/searchBox.hbs');
var addDataPopupTel = require('../popupCompany/addInfo.hbs');
var tableDiffRightTr = require('../tableDiff/table-diff-right-tr.hbs');//化学药右边详情模版
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
      $('.add-than-tbody .table').html(tbodyTel(data.addData));
      $('.add-data .goback').on('click', function () {
        $('.content .add-data').hide();
        $('.content  .content-box-main').show();
        $('.popup').hide();
      });
      $('.find-add-than').on('click', function () {
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
              $('.add-than-tbody .table').html(tbodyTel(data.addData));
              loading = false;
            }
          });
        }
      });
      $('.add-than-table .add-than-tbody').on('scroll',function(){
        var _t = $(this);
        if(_t.children('table').height() <= _t.scrollTop()+ _t.height()){
          listProductData.firstResult =(firstResult+1)*maxResult;
          listProductData.maxResult = maxResult;
          if(loading == false){
            loading = true;
            ajaxFn({
              url:'product/listProduct',
              data:listProductData,
              callback:function(res){
                console.log($('.add-than-tbody tr').length , res.total);
                if($('.add-than-tbody tr').length < res.total){
                  firstResult = firstResult + 1;
                  var trData = {};
                  trData.tbody = res.content;
                  $('.add-than-tbody .table').append(tr(trData));
                }else{
                  $('.add-than-tbody .scroll-loading').hide();
                }
                loading = false;
              }
            });
          }
        }
      });
    }
  });
}
/*function addThanInfo() {
  var $tr = $(this).parents('tr');
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
                    var _index = $(parent).find('.table-diff-data-content [data-id='+drugId+']').index();
                    $(parent).find('.table-diff-right .table-diff-data tr').eq(_index).html( tableDiffRightTr(res.content));
                  }
                })
              }
            })
          });
        }
      });
    }
  });
}*/
module.exports = {
  loadAddData:function(drugName){
    addDataFn(drugName);
  }
}