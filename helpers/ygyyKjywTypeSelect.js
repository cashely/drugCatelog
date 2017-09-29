var opction = require('../src/component/select/optionTel.hbs');
// 是否停用
module.exports = function(value){
 var string = '',data={};
 data.value = value;
 data.text = value;
 data.name = 'ygyyKjywType';
 data.option=[
  {optionName:'无',optionValue:'无'},
  {optionName:'氟喹诺酮类抗菌药物口服剂型',optionValue:'氟喹诺酮类抗菌药物口服剂型'},
  {optionName:'抗真菌药',optionValue:'抗真菌药'},
  {optionName:'头霉素类抗菌药物',optionValue:'头霉素类抗菌药物'},
  {optionName:'碳青霉烯类抗菌药物注射剂型',optionValue:'碳青霉烯类抗菌药物注射剂型'},
  {optionName:'三代及四代头孢菌素（含复方制剂）类抗菌药物注射剂型',optionValue:'三代及四代头孢菌素（含复方制剂）类抗菌药物注射剂型'},
  {optionName:'氟喹诺酮类抗菌药物注射剂型',optionValue:'氟喹诺酮类抗菌药物注射剂型'},
  {optionName:'三代及四代头孢菌素（含复方制剂）类抗菌药物口服剂型',optionValue:'三代及四代头孢菌素（含复方制剂）类抗菌药物口服剂型'}
 ];
 string += opction(data);
 return string;
};