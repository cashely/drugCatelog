// 是否停用
module.exports = function(value){
    var string = '<div class="value">';

    if(value == 1){
        string += '是';
    }else{
        string += '否';
    }

    string += '</div><div class="select"><select>';

    if(value == 1){
        string += '<option value=1 selected="selected">是</option><option value=0>否</option>'
    }else{
        string += '<option value=1>是</option><option selected="selected" value=0>否</option>'
    }

    string += '</select></div>';
    return string;
}
