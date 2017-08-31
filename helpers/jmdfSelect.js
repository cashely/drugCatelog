var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,type){
 var text = textFn(value);
 if(type){
  var string = '',data={};
  data.value = value;
  data.text = text;
  data.name = 'jmdf';
  data.option=[
   {optionName:'否',optionValue:'0'},
   {optionName:'麻',optionValue:'1'},
   {optionName:'毒',optionValue:'2'},
   {optionName:'精二',optionValue:'3'},
   {optionName:'精一',optionValue:'4'}
  ];
  string += opction(data);
  return string;
 }else{
  return text;
 }
}

function textFn(_this){
 if (_this == 0) {
  return "否"
 } else if (_this == 1) {
  return "麻"
 } else if (_this == 2) {
  return '毒'
 } else if (_this == 3) {
  return '精二'
 }  else if (_this == 3) {
  return '精一'
 }else {
  return _this
 }
}