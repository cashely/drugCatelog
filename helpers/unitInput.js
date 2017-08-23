module.exports = function(arr) {
 var newArr=[];
 $(arr).each(function(i,e){
  if(e.sign == 0){
   newArr.push('<span class="color-red">'+ e.unit+'</span>')
  }else{
   newArr.push('<span>'+ e.unit+'</span>')
  }
 });
 newArr = newArr.join(",");
 return newArr
};