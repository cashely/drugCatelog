var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,type){
 var text = textFn(value);
 if(type){
  var string = '',data={};
  data.value = value;
  data.text = text;
  data.name = 'kjywType';
  data.option=[
   {optionName:'无',optionValue:'0'},
   {optionName:'四环素类',optionValue:'1'},
   {optionName:'氯霉素类',optionValue:'2'},
   {optionName:'广谱青霉素',optionValue:'3'},
   {optionName:'对青霉素酶不稳定的青霉素类',optionValue:'4'},
   {optionName:'对青霉素酶稳定的青霉素类',optionValue:'5'},
   {optionName:'β-内酰胺酶抑制剂',optionValue:'6'},
   {optionName:'青霉素类复方制剂（β-内酰胺酶抑制剂）',optionValue:'7'},
   {optionName:'第一代头孢菌素类',optionValue:'8'},
   {optionName:'第二代头孢菌素类',optionValue:'9'},
   {optionName:'第三（四）代头孢菌素类',optionValue:'10'},
   {optionName:'其他β内酰胺类',optionValue:'11'},
   {optionName:'碳青霉烯类',optionValue:'12'},
   {optionName:'磺胺类和甲氧苄啶',optionValue:'13'},
   {optionName:'大环内酯类',optionValue:'14'},
   {optionName:'林可酰胺类',optionValue:'15'},
   {optionName:'氨基糖苷类',optionValue:'16'},
   {optionName:'喹诺酮类',optionValue:'17'},
   {optionName:'糖肽类',optionValue:'18'},
   {optionName:'多粘菌素类',optionValue:'19'},
   {optionName:'咪唑衍生物',optionValue:'20'},
   {optionName:'硝基呋喃衍生物',optionValue:'21'},
   {optionName:'其它抗菌药物',optionValue:'22'},
   {optionName:'抗真菌药',optionValue:'23'}
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
  return "四环素类"
 } else if (_this == 2) {
  return '氯霉素类'
 } else if (_this == 3) {
  return '广谱青霉素'
 }else if (_this == 4) {
  return '对青霉素酶不稳定的青霉素类'
 }else if (_this == 5) {
  return '对青霉素酶稳定的青霉素类'
 }else if (_this == 6) {
  return 'β-内酰胺酶抑制剂'
 }else if (_this == 7) {
  return '青霉素类复方制剂（β-内酰胺酶抑制剂）'
 }else if (_this == 8) {
  return '第一代头孢菌素类'
 }else if (_this == 9) {
  return '第二代头孢菌素类'
 }else if (_this == 10) {
  return '第三（四）代头孢菌素类'
 }else if (_this == 11) {
  return '其他β内酰胺类'
 }else if (_this == 12) {
  return '碳青霉烯类'
 }else if (_this == 13) {
  return '磺胺类和甲氧苄啶'
 }else if (_this == 14) {
  return '大环内酯类'
 }else if (_this == 15) {
  return '林可酰胺类'
 }else if (_this == 16) {
  return '氨基糖苷类'
 }else if (_this == 17) {
  return '喹诺酮类'
 }else if (_this == 18) {
  return '糖肽类'
 }else if (_this == 19) {
  return '多粘菌素类'
 }else if (_this == 20) {
  return '咪唑衍生物'
 }else if (_this == 21) {
  return '硝基呋喃衍生物'
 }else if (_this == 22) {
  return '其它抗菌药物'
 }else if (_this == 23) {
  return '抗真菌药'
 }else {
  return _this
 }
}