var tableDiff = require('./table-diff.hbs');
var Fn =  require('../function');
var ajaxFn =  require('../ajax');
var data =  require('../indexData');

//ajaxFn({
//    url: 'mcdProduct30/listHisProduct',
//    data:{
//        firstResult: 1,
//        maxResults: 16
//    },
//    callback:function(res){
//        data.diffData.ydata = res.content.rows;
//        $('.table-diff').html(tableDiff(data.diffData));
//        Fn.eventBinding();
//    }
//});