export default {
  /* 身份证格式 */
  IdCard: /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
  /* 车牌号格式 */
  plate: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/,
  /* 轴数 */
  bdV9: /^\d+$/,
  /* 正整数 */
  positiveInteger: /^[1-9]*[1-9][0-9]*$/,
  /* 公司代号 */
  companyCode: /^[0-9a-zA-Z\-_]+$/,
  /* 传真 */
  fax: /^[+]{0,1}(\d){1,3}?([-]?(\d){1,12})+$/,
  /* qq */
  qq: /^[1-9]\d{4,10}$/,
  /* 银行卡号 */
  bankNo: /^(([0-9]{1,100}-[0-9]{1,100}|[0-9]{1,100}))$/,
  /* 北斗代理商编号、北斗代理商名称、终端名称、终端出厂编号、终端卡号、车辆分组编号、车辆分组描述、驾驶员编号、车辆名称、政府平台编号、政府平台名称
      【支持字母、汉字、数字，不超过60个字符】 */
  bdName: /^[0-9a-zA-Z\u0391-\uFFE5]+$/,
  /* 必须是数字 */
  number: /^\d+$/,
  unEmpty: /^\S+$/,
  username: /^[a-z_0-9]{2,16}$/,
  password: /^[a-zA-Z_0-9]{6,32}$/,
  mobPhone: /^0?(13|14|15|16|17|18|19)\d{9}$/,
  captcha: /^\d{4}$/,
  smsVerify: /^\d{4}$/,
  telPhone: /^(\d{3,4}-?\d{7,8})$/,
  phone: /^(\d{3,4}-?\d{7,8})|0?(13|15|18|14|17|19)\d{9}$/,
  phoneCode: /^(\d{4,6})$/,
  personCode: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  bankCard: /^(\d{16}|\d{19})$/,
  integer: /^[0-9][0-9]*$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
  url: /^([a-z]+:\/\/)?([a-z]([a-z0-9-]*\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:[0-9]{1,5})?(\/[a-z0-9_\-.~]+)*(\/([a-z0-9_\-.]*)(\?[a-z0-9+_\-.%=&amp;]*)?)?(#[a-z][a-z0-9_]*)?$/,
  httpUrl: /^(http|https):\/\/([a-z]([a-z0-9-]*\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:[0-9]{1,5})?(\/[a-z0-9_\-.~]+)*(\/([a-z0-9_\-.]*)(\?[a-z0-9+_\-.%=&amp;]*)?)?(#[a-z][a-z0-9_]*)?$/,
};
