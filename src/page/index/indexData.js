module.exports = {
  name:'chemistryMain',
  http: 'http://192.168.1.233:8083/hpms/api/',
  searchDate: {
    input:[
      {text:'医院药品ID:',inputClass:'drug-id'},
      {text:'药品名称:',inputClass:'drug-name'},
      {text:'规格/厂家:',inputClass:'spec-name'}
    ],
    showRsyyCount: 1
  },
  diffData: {
    tLeftHead:['医院药品ID','药品名称','规格厂家','转换比','门诊/住院单位','是否停用','修订时间'],
    tRightHead: [
      '药品编码', '药品类型', '药品名称', '剂型', '规格', '转换比', '企业简称', '批准文号/注册证号',
      '说明书', '说明书版本', '基药', '抗菌药物', 'DDD值(mg)', '抗菌药物分类', '是否计算强度', '给药途径(不计算强度)',
      '中成药注射剂', '妊娠用药', '血液制品', '糖皮质激素', '能量用药', '营养用药', 'PPI（质子泵抑制剂)',
      '精麻毒放', '重点药物监控','医保','医保编码', 'YPID','品种代码','人社分类', '药理分类'
    ]
  },
  thanData: {
   thead:[
     'YPID','品种代码','药交ID','药品编码', '药品类型','药品名称',
     '商品名','剂型','规格', '生产企业','批准文号/注册证号','操作'
   ],
    input:[
      {text:'YPID/品种代码:',inputClass:'ypid'},
      {text:'药交ID:',inputClass:'yjId'},
      {text:'药品名称/商品名:',inputClass:'prodName'},
      {text:'生产企业:',inputClass:'fncName'},
      {text:'批准文号/注册证号:',inputClass:'prodPzwh'}
    ]
  },
  tabsData:{
    content: [
      {text:'西药／中成药',id:"chemistry",active:"active"},
      {text:'中药饮片',id:"slices"},
      {text:'医院制剂',id:"potion"}
    ]
  },
  addData:{
    input:[
      {text:'药品名称:',inputClass:'add-drug-name'},
      {text:'规格:',inputClass:'add-spec'},
      {text:'生产企业:',inputClass: 'add-manufacturer-name'}
    ],
    thead:['(19+7)位药品编码','药品名称','商品名', '规格','生产企业','批准文号/注册证号','操作']
  }
};
