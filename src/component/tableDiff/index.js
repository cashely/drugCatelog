var tableDiff = require('./table-diff.hbs');
var data = {
    ydata:[{
        id:1,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:2,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:3,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:4,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:5,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:6,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:7,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    },{
        id:8,
        yid:'abc1',
        yypmc:'abc1',
        yggcj:'abc1',
        yzhb:'abc1',
        ymzzy:'abc1',
        yty:'abc1',
        yxdrq:'abc1'
    }],
    bdata:[{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    },{
        bbm:'abc',
        blx:'abc',
        bypmc:'abc',
        bjx:'abc',
        bgg:'abc',
        bzhb:'abc',
        bqyjc:'abc',
        bpzwh:'abc',
        bjy:'abc',
        bzdjkyw:'abc',
        byyyy:'abc',
        bzcyzsj:'abc',
        bjmdf:'abc',
        brsyy:'abc',
        bkjyw:'abc',
        bddd:'abc',
        bgytj:'abc',
        bjsqd:'abc',
        bfj:'abc',
        brsfl:'abc',
        bylfl:'abc',
        bppi:'abc'
    }]
};
var singleData = {
    id:null,
    index:null
}

$('.table-diff').html(tableDiff(data));
$('.table-diff-right .table-diff-data').on('scroll',function(){
    var _t = $(this);
    // console.log(_t.height()+','+_t.scrollTop()+','+_t.children('table').height());
    $('.table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
    $('.table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
});
$('.table-diff-data tr').on('click',function(){
    var _index = $(this).prevAll().length;
    var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
    for(var i=0;i<_tables;i++){
        $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('active').siblings('tr').removeClass('active');
    }
});
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
$('.table-diff-left .table-diff-data tr').on('mouseover',function(e){
    var _tr = $(this);
    $('.table-diff-bar').css({
        display:'block',
        top:_tr.position().top+_tr.height()-1,
        left:e.pageX-_tr.offset().left
    });
    singleData.id = $(this).attr('data-id');
});
$('.table-diff-bar').on('mouseout',function(){
    $('.table-diff-bar').hide();
});
$('.table-diff-bar').on('mouseover',function(e){
    $('.table-diff-bar').show();
    e.preventDefault();
});
$('#showDetail').on('click',showDetail);

function showDetail(e){
    console.log(singleData);
    if(!singleData.id){
        return;
    }
    $('.table-diff-left .table-diff-data').toggleClass('table-diff-show-detail');
    $('.table-diff-right-all').toggleClass('active');
    $('.table-diff-right-single').toggleClass('active');
    e.preventDefault();
}
//绑定比对
$('#showThan').on('click',showThan);

function showThan(){
    $('.standard-than').show()
}
