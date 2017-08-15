/**
 * Created by Administrator on 2017/8/8.
 */
var tabBarTel =  require('./tabBar.hbs');
var searchTel =  require('../searchBox/searchBox.hbs');
var standardThanTel =  require('../standardThan/standardThan.hbs');
var tableDiffTel =  require('../tableDiffSlices/table-diff.hbs');
var Fn =  require('../function');
var data = {
  name: '页面切换条',
  gly: 'gly',
  content: [
    {text:'化学药／中成药',id:"medicine",active:"active"},
    {text:'中药饮片',id:"slices"},
    {text:'医院制剂',id:"potion"}
  ]
};
$('.tabs-box').html(tabBarTel(data));

$(function(){
  $('.tabs .tabs-item').on('click',function(e){
    var $_content = $('.content .content-box');
    if ($(this).hasClass("active")) return false;
    $(this).addClass("active").siblings().removeClass("active");
    $_content.removeClass("active");
    switch ($(this).index()){
      case 1 :
        $_content.hide() ;
        if($('.content').children('.'+$(this).data('id')).length <= 0){
          var data = {total:11,finish:131, input:[{text:'医院药品ID:'},{text:'药品名称:',inputClass:'drug-name'},{text:'规格/厂家:'},{text:'是否比对:'}]};
          var searchHTMl = '<div class="search-box">'+searchTel(data) +'</div>';
          var ThanData ={
            input:['药品名称:'],
            thead:['药品编码','品种名称','饮片名称', '片型','基药','医保','操作'],
            tbody:[
              ['Y0483-A1-0','何首乌','何首乌','无','否','否','添加'],
              ['Y0483-A1-0','何首乌','何首乌','无','否','否','添加'],
              ['Y0483-A1-0','何首乌','何首乌','无','否','否','添加']
            ]}
          var standardThanHTMl = '<div class="standard-than">'+standardThanTel(ThanData) +'</div>';
          var tableDiffData = {
            tLeftHead:['医院药品ID','药品名称','规格厂家','使用单位','转换比','门诊／住院单位','是否停用','修订时间'],
            tRightHead:['药品编码','品种名称','饮片名称','片型','基药','医保','医保编码'],
            ydata:[{
              id:1,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            },{
              id:2,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            },{
              id:3,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            },{
              id:4,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            },{
              id:5,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            },{
              id:6,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            },{
              id:7,
              yid:'0000007119',
              yypmc:'氯米芬片◆①',
              yggcj:'50mg*10/盒  塞浦路斯麦',
              ysydw:'克',
              yzhb:'10',
              ymzzy:'片，盒，和',
              yty:'否',
              yxdrq:'2016.12.12'
            }],
            bdata:[{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            },{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            },{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            },{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            },{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            },{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            },{
              bbm:'X153818-10',
              blx:'化学药',
              bypmc:'枸橼酸氯米',
              bjx:'素片',
              bgg:'50mg',
              bzhb:'10',
              bqyjc:'1'
            }]
          };
          var tableDiffHTMl='<div class="table-diff">'+tableDiffTel(tableDiffData)+'</div>';
          var content = '<div class="content-box active '+$(this).data("id")+'">'+searchHTMl+tableDiffHTMl+standardThanHTMl +'</div>';
          $('.content').append(content);
          var singleData = {
            id:null,
            index:null
          };
          //滚动事件
          Fn.tableDiffScroll();
          //点击表格数据事件
          Fn.tableDiffClick();
          //鼠标表格悬停事件
          Fn.tableDiffHover();
          //显示比对按钮
          Fn.showDiffBar(singleData);
          //显示比对内容
          Fn.showThan();
          return;
        }
        $_content.eq($(this).index()).show();
        break;
      case 2 : $_content.hide(); $_content.eq($(this).index()).show() ;break;
      default: $_content.hide().first().show();
    }
  });
});
