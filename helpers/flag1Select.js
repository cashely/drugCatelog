var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,type){
 var text = textFn(value);
 if(type){
  var string = '',data={};
  data.value = value;
  data.text = text;
  data.name = 'flag1';
  data.option=[
   {optionName:'否',optionValue:'0'},
   {optionName:'非限制使用级',optionValue:'1'},
   {optionName:'限制使用级',optionValue:'2'},
   {optionName:'特殊使用级',optionValue:'3'}
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
  return "非限制使用级"
 } else if (_this == 2) {
  return '限制使用级'
 } else if (_this == 3) {
  return '特殊使用级'
 } else {
  return _this
 }
}