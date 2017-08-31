var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,type){
 var text = textFn(value);
 if(type){
  var string = '',data={};
  data.value = value;
  data.text = text;
  data.name = 'pregnancyLevel';
  data.option=[
   {optionName:'否',optionValue:'0'},
   {optionName:'A',optionValue:'1'},
   {optionName:'B',optionValue:'2'},
   {optionName:'C',optionValue:'3'},
   {optionName:'D',optionValue:'4'},
   {optionName:'X',optionValue:'5'}
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
  return "A"
 } else if (_this == 2) {
  return 'B'
 } else if (_this == 3) {
  return 'C'
 }  else if (_this == 3) {
  return 'D'
 } else if (_this == 3) {
  return 'X'
 }else {
  return _this
 }
}