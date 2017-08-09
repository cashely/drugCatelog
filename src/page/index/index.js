//index.js-药品目录
var footer =  require('../../component/footer/footer.js');
var header =  require('../../component/header/header.js');
var tabBar =  require('../../component/tabBar/tabBar.js');
var homeTpl =  require('./index.hbs');
var data = {
  header:header,
  footer: footer,
  tabBar:tabBar,
  name: 'home',
  content:"content"
};
var _html  = homeTpl(data);
module.exports = _html;