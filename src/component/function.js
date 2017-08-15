module.exports = {
  showDiffBar:function(singleData){
    //显示比对按钮
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
  },
  tableDiffScroll:function(){
    //滚动事件
    $('.table-diff-right .table-diff-data').on('scroll',function(){
      var _t = $(this);
      // console.log(_t.height()+','+_t.scrollTop()+','+_t.children('table').height());
      $('.table-diff-left .table-diff-data').scrollTop($(this)[0].scrollTop);
      $('.table-diff-right .table-diff-header-content').scrollLeft($(this)[0].scrollLeft);
    });
  },
  tableDiffClick:function(){
    //点击表格数据事件
    $('.table-diff-data tr').on('click',function(){
      var _index = $(this).prevAll().length;
      var _tables = $(this).parents('.table-diff').find('.table-diff-data').length;
      for(var i=0;i<_tables;i++){
        $(this).parents('.table-diff').find('.table-diff-data').eq(i).find('table tr').eq(_index).addClass('active').siblings('tr').removeClass('active');
      }
    });
  },
  tableDiffHover:function(){
  //鼠标表格悬停事件
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
  },
  showThan:function(){
    //绑定显示比对事件
    $('.showThan').on('click',showThan);
    //显示比对事件
    function showThan(){
      $('.standard-than').show()
    }
  }
};
