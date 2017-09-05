var opction = require('../src/component/select/optionTel.hbs');//门诊/住院单位
// 是否停用
module.exports = function(value,colName,type){
    if (type == 'select') {
        switch (colName) {
            case 'ypType':
                return ypTypeFn(value *1);
            case 'flag4':
                return flag4Fn(value *1);
            case 'flag1':
                return flag1Fn(value*1);
            case 'kjyw':
                return kjywFn(value*1);
            case 'pregnancyLevel':
                return pregnancyLevelFn(value*1);
            case 'jmdf':
                return jmdfFn(value*1);
            case 'yblb':
                return yblbFn(value*1);
            default :
                if(value*1 == 0){
                    return '否';
                }else {
                    return '是';
                }
        }
    }else{
        return value
    }
}

function ypTypeFn(value){
    switch (value) {
        case 0:
           return "西药";
        case 1:
            return "中成药";
        case 2:
            return "中药饮片";
        case 3:
            return "医院制剂";
        case 4:
            return "卫生材料";
    }
}

function flag4Fn(value){
    switch (value) {
        case 0:
            return "否";
        case 1:
            return "国家";
        case 2:
            return "省基";
        case 3:
            return "地基";
    }
}

function flag1Fn(value){
    switch (value) {
        case 0:
            return "无";
        case 1:
            return "非限制使用级";
        case 2:
            return "限制使用级";
        case 3:
            return "特殊使用级";
    }
}

function kjywFn(value){
    switch (value) {
        case 0:
            return "无";
        case 1:
            return "四环素类";
        case 2:
            return "氯霉素类";
        case 3:
            return "广谱青霉素";
        case 4:
            return "对青霉素酶不稳定的青霉素类";
        case 5:
            return "对青霉素酶稳定的青霉素类";
        case 6:
            return "β-内酰胺酶抑制剂";
        case 7:
            return "青霉素类复方制剂（β-内酰胺酶抑制剂）";
        case 8:
            return "第一代头孢菌素类";
        case 9:
            return "第二代头孢菌素类";
        case 10:
            return "第三（四）代头孢菌素类";
        case 11:
            return "其他β内酰胺类";
        case 12:
            return "碳青霉烯类";
        case 13:
            return "磺胺类和甲氧苄啶";
        case 14:
            return "大环内酯类";
        case 15:
            return "林可酰胺类";
        case 16:
            return "氨基糖苷类";
        case 17:
            return "喹诺酮类";
        case 18:
            return "糖肽类";
        case 19:
            return "多粘菌素类";
        case 20:
            return "咪唑衍生物";
        case 21:
            return "硝基呋喃衍生物";
        case 22:
            return "其它抗菌药物";
        case 23:
            return "抗真菌药N";
    }
}

function pregnancyLevelFn(value){
    switch (value) {
        case 0:
            return "否";
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
        case 4:
            return "D";
        case 5:
            return "X";
    }
}
function jmdfFn(value){
    switch (value) {
        case 0:
            return "否";
        case 1:
            return "麻";
        case 2:
            return "毒";
        case 3:
            return "精二";
        case 4:
            return "精一";
    }
}

function yblbFn(value){
    switch (value) {
        case 0:
            return "否";
        case 1:
            return "国家";
        case 2:
            return "省";
        case 3:
            return "地市";
    }
}
