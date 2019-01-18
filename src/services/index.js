import axios from 'axios';
// import router from 'umi/router';
import { message } from 'antd';
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
      switch (response.data.code) {
        case 200:
          message.warning('没有权限');
          break;
        default:
          return response;
      }
    } else {
      Promise.reject(new Error());
    }
  },
  // Do something with response
  error => {
    message.error('网络错误，请稍后重试！！');
    Promise.reject(error);
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
        resolve(response.data);
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
      url: '/admin/home',
    });
  },
  login(params) {
    return request({
      host: BASEURL,
      url: '/admin/login',
      method: 'POST',
      params,
    });
  },
  logout() {
    return request({
      host: BASEURL,
      url: '/admin/logout',
    });
  },
  gasList(params) {
    return request({
      host: BASEURL,
      url: '/gasList',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  serviceList(params) {
    return request({
      host: BASEURL,
      url: '/serviceList',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  oilList(params) {
    return request({
      host: BASEURL,
      url: '/oilList',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理/加油明细列表
   * */
  refuelDetailList(params) {
    return request({
      host: BASEURL,
      url: '/refuelDetailList',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理/调价申请列表
   * */
  priceApplyList(params) {
    return request({
      host: BASEURL,
      url: '/priceApplyList',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },

  /**
   * @author sswq
   * @description 加油站管理/票据列表
   * */
  billCheckList(params) {
    return request({
      host: BASEURL,
      url: '/billCheckList',
      params: {
        page: 1,
        size: 10,
        ...params,
      },
    });
  },
  /**
   * @author sswq
   * @description 加油站管理/开票信息
   * */
  billInfo() {
    return request({
      host: BASEURL,
      url: '/billInfo',
      // params: {
      //   page: 1,
      //   size: 10,
      //   ...params,
      // },
    });
  },
};
