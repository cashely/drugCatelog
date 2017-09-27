var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,type){
 var text = textFn(value);
 if(type){
  var string = '',data={};
  data.value = value;
  data.text = text;
  data.name = 'ygyy_kjyw_type';
  data.option=[
   {optionName:'无',optionValue:'0'},
   {optionName:'氟喹诺酮类抗菌药物口服剂型',optionValue:'1'},
   {optionName:'深部抗真菌类抗菌药物',optionValue:'2'},
   {optionName:'头霉素类抗菌药物',optionValue:'3'},
   {optionName:'碳青霉烯类抗菌药物注射剂型',optionValue:'4'},
   {optionName:'三代及四代头孢菌素（含复方制剂）类抗菌药物注射剂型',optionValue:'5'},
   {optionName:'氟喹诺酮类抗菌药物注射剂型',optionValue:'6'},
   {optionName:'三代及四代头孢菌素（含复方制剂）类抗菌药物口服剂型',optionValue:'7'}
  ];
  string += opction(data);
  return string;
 }else{
  return text;
 }
}

function textFn(_this){
 if (_this == 0) {
  return "无"
 } else if (_this == 1) {
  return "氟喹诺酮类抗菌药物口服剂型"
 } else if (_this == 2) {
  return "深部抗真菌类抗菌药物"
 }  else if (_this == 3) {
  return "头霉素类抗菌药物"
 } else if (_this == 4) {
  return "碳青霉烯类抗菌药物注射剂型"
 } else if (_this == 5) {
  return "三代及四代头孢菌素（含复方制剂）类抗菌药物注射剂型"
 } else if (_this == 6) {
  return "氟喹诺酮类抗菌药物注射剂型"
 }else if (_this == 7) {
  return "三代及四代头孢菌素（含复方制剂）类抗菌药物口服剂型"
 }else {
  return _this
 }
}