module.exports = function(_this) {
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
};