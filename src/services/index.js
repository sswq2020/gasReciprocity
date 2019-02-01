import axios from 'axios';
import router from 'umi/router';
import { message } from 'antd';
import dict from '@/utils/dict';
import { isMock, hostList } from './mock';

const BASEURL = hostList[ENV];

axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = 30000;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    // Do something with request
    const con = { ...config };
    con.headers['X-Requested-With'] = 'XMLHttpRequest';
    con.headers['X-Auth-Token'] = window.localStorage.getItem('xAuthToken') || '';
    return con;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      window.localStorage.removeItem('xAuthToken');
      window.localStorage.removeItem('authority');
      router.push('/account/login');
      // Promise.reject(new Error(response));
    }
  },
  // Do something with response
  () => {
    message.error('网络错误，请稍后重试！！');
    // Promise.reject(error);
    return new Promise(resolve => {
      resolve({
        code: dict.EXCEPTION,
        mesg: '网络错误',
        timestamp: new Date().getTime(),
        data: null,
      });
    });
  }
  // tools.toast({
  //   position: 'top',
  //   message: '网络错误，请稍后重试！！'
  // });
  // tools.hideProgress();
);

function delEmptyAttr(arg) {
  let rObj = {};
  if (arg && typeof arg === 'object' && !Array.isArray(arg)) {
    const params = Object.assign({}, arg);
    Object.keys(arg).forEach(key => {
      if (
        arg[key] === '' ||
        arg[key] === null ||
        arg[key] === undefined ||
        (Array.isArray(arg[key]) && arg[key].length === 0) ||
        (typeof arg[key] === 'object' && arg[key].length === undefined)
      ) {
        delete params[key];
      }
    });
    rObj = params;
  }

  return rObj;
}

function request({ host = '', version = '', url, params, method = 'get' }) {
  let urlStr = url;
  const methodStr = method.toLowerCase();
  const mock = isMock({ host, version, url, params, method: methodStr });
  const tk = new Date().getTime();

  if (ENV === 'dev' && mock.isMock === true) {
    // console.log(mock.router, mock);
    return new Promise(resolve => {
      resolve(mock.mock);
    });
  }

  return new Promise(resolve => {
    let data = params;
    if (methodStr === 'get') {
      data = { params: { ...delEmptyAttr(params), _: tk } };
    } else {
      urlStr += `?_=${tk}`;
    }
    axios[methodStr](host === '' ? urlStr : `http://${host}${urlStr}`, data)
      .then(response => {
        // TODO 这里做数据的验证
        if (response && response.data) {
          switch (response.data.code) {
            case '550':
              window.localStorage.removeItem('xAuthToken');
              window.localStorage.removeItem('authority');
              router.push('/account/login');
              break;
            default:
              resolve(response.data);
              break;
          }
        }
      })
      .catch(error => Promise.reject(error));
  });
}

export default {
  demoPost(params) {
    return request({
      host: BASEURL,
      url: '/demo',
      method: 'post',
      params,
    });
  },
  queryCurrentUser() {
    return request({
      host: BASEURL,
      url: '/action/public/login/permission',
      method: 'POST',
    });
  },
  login(params) {
    return request({
      host: BASEURL,
      url: '/action/login/doLogin',
      method: 'POST',
      params,
    });
  },
  logout() {
    return request({
      host: BASEURL,
      url: '/action/login/doLogout',
      method: 'POST',
    });
  },
  gasDict() {
    return request({
      host: BASEURL,
      url: '/action/gs/getGasBaseData',
    });
  },
  getSelectData(type) {
    return request({
      host: BASEURL,
      url: '/action/public/sys/dict/itmes/get',
      params: {
        entryCodes: type,
      },
    });
  },
  gasCreate(params) {
    return request({
      host: BASEURL,
      url: '/action/gs/insertGasStationInfo',
      method: 'post',
      params,
    });
  },
  gasEdit(id, params) {
    return request({
      host: BASEURL,
      url: '/action/gs/editGasStationInfo',
      method: 'post',
      params: {
        id,
        ...params,
      },
    });
  },
  gasList(params) {
    return request({
      host: BASEURL,
      url: '/action/gs/queryGasStationInfoPage',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  gasEnable(id) {
    return request({
      host: BASEURL,
      url: '/action/gs/activeGasStationInfo',
      method: 'post',
      params: {
        isBan: '1',
        id,
      },
    });
  },
  gasDisable(id) {
    return request({
      host: BASEURL,
      url: '/action/gs/activeGasStationInfo',
      method: 'post',
      params: {
        isBan: '0',
        id,
      },
    });
  },
  gasDetail(id) {
    return request({
      host: BASEURL,
      url: '/action/gs/selectGasStationInfo',
      // method: 'post',
      params: {
        id,
      },
    });
  },
  serviceList(params) {
    return request({
      host: BASEURL,
      url: '/action/bs/queryFeatureServiceInfoPage',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  serviceCreate(params) {
    return request({
      host: BASEURL,
      url: '/action/bs/insertFeatureServiceInfo',
      method: 'post',
      params,
    });
  },
  serviceEdit(id, params) {
    return request({
      host: BASEURL,
      url: '/action/bs/editFeatureServiceInfo',
      method: 'post',
      params: {
        ...params,
        id,
      },
    });
  },
  serviceEnable(id) {
    return request({
      host: BASEURL,
      url: `/serviceEnable/${id}`,
      params,
    });
  },
  serviceDisable(id) {
    return request({
      host: BASEURL,
      url: `/serviceDisable/${id}`,
      params,
    });
  },
  serviceDelete(id) {
    return request({
      host: BASEURL,
      url: '/action/bs/deleteFeatureServiceInfo',
      method: 'post',
      params: {
        id,
      },
    });
  },
  oilList(params) {
    return request({
      host: BASEURL,
      url: '/action/bs/queryOilModelInfoPage',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  oilCreate(params) {
    return request({
      host: BASEURL,
      url: '/action/bs/insertOilModelInfo',
      method: 'post',
      params,
    });
  },
  oilEdit(id, params) {
    return request({
      host: BASEURL,
      url: '/action/bs/editOilModelInfoInfo',
      method: 'post',
      params: {
        ...params,
        id,
      },
    });
  },
  oilEnable(id) {
    return request({
      host: BASEURL,
      url: '/action/bs/deleteOilModelInfo',
      method: 'post',
      params: {
        id,
        deleted: 1,
      },
    });
  },
  oilDisable(id) {
    return request({
      host: BASEURL,
      url: '/action/bs/deleteOilModelInfo',
      method: 'post',
      params: {
        id,
        deleted: 0,
      },
    });
  },
  oilDeleted(id) {
    return request({
      host: BASEURL,
      url: '/action/bs/deleteOilModelInfo',
      method: 'post',
      params: {
        id,
      },
    });
  },
  oilSetDefault(id) {
    return request({
      host: BASEURL,
      url: '/action/bs/editOilModelInfoInfo',
      method: 'post',
      params: {
        isDefault: 1,
        id,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理端/加油明细查询
   * */
  refuelDetailList(params) {
    return request({
      host: BASEURL,
      url: '/action/jy/queryRefuelingDetailsForGS',
      method: 'post',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理端/调价申请列表
   * */
  priceApplyList(params) {
    return request({
      host: BASEURL,
      url: '/action/gs/gasOilModel/queryGasOilModelPage',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理端/调价历史列表
   * */
  priceHisList(id) {
    return request({
      host: BASEURL,
      url: '/action/gs/gasOilModel/queryGasOilModelHistoryPage',
      params: {
        currentPage: 1,
        pageSize: 5,
        id,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理端/调价申请提交
   * */
  priceApplyUpdate(params) {
    return request({
      host: BASEURL,
      url: '/action/gs/gasOilModel/updateGasOilModel',
      method: 'post',
      params,
    });
  },
  /**
   * @author sswq
   * @description 加油站管理端/票据列表
   * */
  billCheckList(params) {
    return request({
      host: BASEURL,
      url: '/action/sc/receiptBill/getBillCheckList',
      params: {
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理端/开票信息
   * */
  billInfo() {
    return request({
      host: BASEURL,
      url: '/billInfo',
      // params: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   ...params,
      // },
    });
  },
  /**
   * @author sswq
   * @description 票务管理/加油明细查询
   * */
  hlRefuelDetailList(params) {
    return request({
      host: BASEURL,
      url: '/action/jy/queryRefuelingDetailsForHL',
      method: 'post',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 票务管理/收票确认
   * */
  invoiceConfirmList(params) {
    return request({
      host: BASEURL,
      url: '/action/sc/receiptBill/queryReceiptBillPage',
      params: {
        currentPage: 1,
        pageSize: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 票务管理/收票作废
   */
  invoiceDisannul(id) {
    return request({
      host: BASEURL,
      method: 'post',
      url: '/action/sc/receiptBill/updateReceiptBill',
      params: {
        id,
        status: 1,
      },
    });
  },
  /**
   * @author sswq
   * @description 票务管理/新增发票
   */
  invoiceCreate(params) {
    return request({
      host: BASEURL,
      method: 'post',
      url: '/action/sc/receiptBill/insertReceiptBill',
      params,
    });
  },
  /**
   * @author sswq
   * @description 票务管理/根据年月获取应开金额
   */
  getshouldSum(params) {
    return request({
      host: BASEURL,
      url: '/action/sc/receiptBill/getBillCheck',
      params,
    });
  },
  /**
   * @author sswq
   * @description 票务管理/开票收票地址信息查询
   */
  getInvoiceAddress() {
    return request({
      host: BASEURL,
      url: '/action/sc/invoiceAddress/getInvoiceAddress',
    });
  },
  /**
   * @author sswq
   * @description 票务管理/编辑更新开票收票地址信息
   */
  invoiceAddressUpdate(params) {
    return request({
      host: BASEURL,
      url: '/action/sc/invoiceAddress/updateInvoiceAddress',
      method: 'post',
      params,
    });
  },
};
