var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,type){
    var text = textFn(value);
    if(type){
        var string = '',data={};
        data.value = value;
        data.text = text;
        data.name = 'ypType';
        data.option=[
            {optionName:'西药',optionValue:'0'},
            {optionName:'中成药',optionValue:'1'},
            {optionName:'中药饮片',optionValue:'2'},
            {optionName:'医院制剂',optionValue:'3'},
            {optionName:'卫生材料',optionValue:'4'}
        ];
        string += opction(data);
        return string;
    }else{
        return text;
    }
}

function textFn(_this){
    if(_this == 0){
        return "西药"
    }else if(_this == 1){
        return "中成药"
    }else if(_this == 2){
        return '中药饮片'
    }else if(_this == 3){
        return '医院制剂'
    }else if(_this == 4){
        return '卫生材料'
    }else{
        return _this
    }
}