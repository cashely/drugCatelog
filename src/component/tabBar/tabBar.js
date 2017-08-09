/**
 * Created by Administrator on 2017/8/8.
 */
var tabBarTel =  require('./tabBar.hbs');
var data = {
  name: '页面头部',
  gly: 'gly',
  time: '2017年8月9日星期三'
};
var tabBar = tabBarTel(data);
module.exports = tabBar;