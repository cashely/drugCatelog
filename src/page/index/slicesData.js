module.exports = {
  name:'slicesMain',
  searchDate: {
    input:[
      {text:'医院药品ID:',inputClass:'drug-id'},
      {text:'药品名称:',inputClass:'drug-name'},
      {text:'规格/厂家:',inputClass:'spec-name'}
      ],
    showRsyyCount: 0
  },
  diffData: {
    tLeftHead:['医院药品ID','药品名称','规格厂家','转换比','门诊／住院单位','是否停用','修订时间'],
    tRightHead:['药品编码','药品类型','最小使用单位','最小包装单位','整散比','品种名称','饮片名称','片型','基药','医保','医保编码']
  },
 thanData: {
   input:[ {text:'药品名称:',inputClass:'name'}],
   thead:['药品编码','品种名称','饮片名称', '片型','基药','医保','操作']
 }
};
