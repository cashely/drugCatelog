/**
 * 添加对比数据
 */
var addData =  require('./index.hbs');
var searchBox = require('../searchBox/searchBox.hbs');
var addDataPopupTel = require('../popupCompany/addInfo.hbs');
var tbodyTel = require('./tbody.hbs');
var ajaxFn =  require('../ajax');
var loadTableFn =  require('../function').loadTableFn;

var searchBoxData={
  input:[
    {text:'药品名称:',inputClass:'add-drug-name'},
    {text:'规格:',inputClass:'add-spec'},
    {text:'厂家:',inputClass: 'add-manufacturer-name'}
  ],
  thead:['(19+7)位药品编码','药品名称','商品名', '规格','生产企业','批准文号/注册证号','新增']
};

ajaxFn({
  url: 'product/listProduct',
  callback:function(res){
    searchBoxData.tbody = res.content;
    var data = {
      searchBox:'<div class="search-box">'+searchBox(searchBoxData)+'</div>'
    };
    $('.add-data').html(addData(searchBoxData));
    $('.add-data .goback').on('click',function(){
      $('.content .add-data').hide();
      $('.content  .content-box-main').show();
    });
    $('.find-add-than').on('click',function(){
      ajaxFn({
        url: 'product/listProduct',
        data: {
          drugName: $('.add-drug-name').val(),
          spec: $('.add-spec').val(),
          manufacturerName: $('.add-manufacturer-name').val()
        },
        callback:function(res){
          var tbodyData={};
          tbodyData.tbody= res.content;
          $('.add-than-tbody').html(tbodyTel(tbodyData));
          $('.add-than-info').on('click',addThanInfo)
        }
      });
    });

    $('.add-than-info').on('click',addThanInfo)
  }
});

function addThanInfo(){
  var $tr = $(this).parents('tr');
  var data = {
    default: {
      id: $tr.data('id'),
      name: $tr.find('.name').text(),
      spec: $tr.find('.spec').text(),
      manufacturerName: $tr.find('.manufacturerName').text(),
      pzwh: $tr.find('.pzwh').text(),
    }
  };
  ajaxFn({
    url: 'dataDictionary/getDataDictionaryListByCode',
    data: {
      code: 1
    },
    callback:function(res){
      data.minUseUnit= res.content;
      ajaxFn({
        url: 'dataDictionary/getDataDictionaryListByCode',
        data: {
          code: 2
        },
        callback:function(res){
          data.packUnit= res.content;
          $('.popup').html(addDataPopupTel(data));
          $('.popup').show();
          $('.popup-add-info .popup-close').on('click',function(){$('.popup-add-info').hide()});
          $('.popup-add-info .saveOrUpdate').on('click',function(){
            ajaxFn({
              url: 'mcdProduct30Ues/saveOrUpdate',
              data: {
                productId: $('.popup-add-info').data('id'),
                minUseUnit: $('.popup-add-info .minUseUnit').val(),
                packUnit: $('.popup-add-info .packUnit').val(),
                convert: $('.popup-add-info .convert').val()
              },
              callback:function(res){
                console.log(res.content);
                ajaxFn({
                  url: 'mcdProduct30/saveMatch',
                  data: {
                    drugId: $('.than-content').data('id'),
                    proId: res.content.proId
                  },
                  callback:function(res){
                    $('.popup').hide();
                    $('.content .add-data').hide();
                    $('.content  .content-box-main').show();
                    loadTableFn()
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