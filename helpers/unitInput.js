module.exports = function (string, arr) {
  if(!!string && string != ''){
    var newArr = [], stringArr = [];
    stringArr = string.split(',');
    $(arr).each(function (i, e) {
      if (e.sign == 0) {
        newArr.push(e.unit)
      }
    });
    $(stringArr).each(function (i, e) {
      if (newArr.indexOf(e) != -1) {
        stringArr[i] = '<span class="color-red">' + e + '</span>'
      }
    });
    stringArr = stringArr.join(",");
    return stringArr
  }
};