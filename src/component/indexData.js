module.exports = {
  name:'chemistryMain',
  searchDate: {
    input:[
      {text:'医院药品ID:',inputClass:'drug-id'},
      {text:'药品名称:',inputClass:'drug-name'},
      {text:'规格/厂家:',inputClass:'spec-name'}
    ]
  },
  diffData: {
    tLeftHead:['医院药品ID','药品名称','规格厂家','转换比','门诊/住院单位','是否停用','修订时间'],
    tRightHead:['药品编码','药品类型','药品名称','剂型','规格','转换比','企业简称','批准文号/注册证号','基药','重点药物监控','营养用药','中成药注射剂','精麻毒放','妊娠用药','抗菌药物','DDD值','给药途径(不计算强度)','是否计算强度','分级','人社分类','药理分类','是否PPI']
  },
  thanData: {
   thead:['YPID','品种代码','药交ID','药品编码', '药品类型','药品名称','商品名','剂型','规格','生产企业','批准文号/注册证号','操作'],
    input:[
      {text:'YPID/品种代码:',inputClass:'ypid'},
      {text:'药交ID:',inputClass:'yj_id'},
      {text:'药品名称/商品名:',inputClass:'prod_name'},
      {text:'生产企业:',inputClass:'fnc_name'},
      {text:'批准文号/注册证号:',inputClass:'prod_pzwh'}
    ]
  },
  tabsData:{
    content: [
      {text:'化学药／中成药',id:"chemistry",active:"active"},
      {text:'中药饮片',id:"slices"},
      {text:'医院制剂',id:"potion"}
    ]
  },
  addData:{
    input:[
      {text:'药品名称:',inputClass:'add-drug-name'},
      {text:'规格:',inputClass:'add-spec'},
      {text:'厂家:',inputClass: 'add-manufacturer-name'}
    ],
    thead:['(19+7)位药品编码','药品名称','商品名', '规格','生产企业','批准文号/注册证号','新增']
  }
};
