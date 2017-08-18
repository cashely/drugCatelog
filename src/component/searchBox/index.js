/**
 * 搜索区
 */
var searchBoxTel =  require('./searchBox.hbs');
var tableDiff = require('../tableDiff/table-diff.hbs');
var ajaxFn =  require('../ajax');
var Fn =  require('../function');
var data =  require('../indexData');
function loadData(){
  ajaxFn({
    url: 'mcdProduct30/listHisProduct',
    data:{
      drugId: $('.search-box .drug-id').val(),
      drugName: $('.search-box .drug-name').val(),
      specName: $('.search-box .spec-name').val(),
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
      $('.search-box').html(searchBoxTel(data.searchDate));
      data.diffData.ydata = res.content.rows;
      $('.table-diff').html(tableDiff(data.diffData));
      $('.search-box .btn').on('click',loadData);
      Fn.eventBinding();
    }
  });
}
loadData();
