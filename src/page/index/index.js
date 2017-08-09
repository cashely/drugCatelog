//index.js-药品目录
var footer =  require('../../component/footer/footer.js');
var header =  require('../../component/header/header.js');
var homeTpl =  require('./index.hbs');
var data = {
  header:header,
  footer: footer,
  name: 'home',
  content:"content"
};
var _html  = homeTpl(data);
module.exports = _html;