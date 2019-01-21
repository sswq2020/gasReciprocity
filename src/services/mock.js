import pathToRegexp from 'path-to-regexp';
import mockjs from 'mockjs';

const body = {
  code: '000000', // 状态码
  msg: '成功', // 消息 字符串 可以为空
  timestamp: new Date().getTime(),
  data: {
    // 返回结果 result 必须为对象
  },
};

export const hostList = {
  dev: '192.168.4.16:25084', // 周扬
  test: 'api.demo.com',
  pro: 'api.demo.com',
};
// /api/Internshipexp/internshipexpBy
// const serviceProvider = {
//   id: '@INTEGER()',
//   provinceId: '@INTEGER()',
//   customerServicePhone: regexps.phone,
//   status: '@PICK([0, 1])',
//   name: 'mock@CTITLE(10,16)',
//   province: '@province',
//   createTime: '@DATE("T")',
//   editTime: '@DATE("T")'
// };

const pic = {
  path: '/path/2.png',
  url: '@DATAIMAGE("400x225","mock image")',
};

const currentUser = {
  auth: [
    {
      authority: 'ROLE_admin',
    },
  ],
  username: '@NAME()',
};
const auditor = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  username: 'mock @NAME()',
};

const officer = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  username: 'mock @CNAME()',
  enabled: '@BOOLEAN()',
  type: '@PICK(["GENERAL", "HIGH"])',
};

const app = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  appKey: 'mock @NAME()',
  secret: '@INTEGER(100000,999999)',
  expiredAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  description: '@CTITLE(2,10)',
  createdAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
};

const admin = {
  'id|+1': 'GLY@INTEGER(1000,9999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  username: 'mock @NAME()',
  enabled: '@BOOLEAN()',
  type: '@PICK(["GENERAL", "FACTORY"])',
};

const application = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brandModel: '@CTITLE(2,10)',
  ownerName: '@NAME()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
  auditor,
  app: null,
  machineId: '@INTEGER()',
  remark: '@CTITLE()',
};

const gasLite = {
  'id|+1': 1,
  b: '@INTEGER(13000000000,18999999999)',
  c: 'WBJZ@INTEGER(1000,9999)',
  d: '@CTITLE(2,10)加油站',
  e: '@INTEGER(13000000000,18999999999)',
  f: '@CNAME()',
  g: '@INTEGER(13000000000,18999999999)',
  h: '@EMAIL()',
  i: '@PROVINCE()@CITY()',
  j: '@PICK(["禁用", "正常"])',
  k: '@DATE("yyyy-MM-dd HH:mm:ss")',
  l: '@INTEGER(100000,999999)',
};

const serviceLite = {
  'id|+1': 1,
  b: '//lorempixel.com/64/64/',
  c: '@CTITLE(2,10)服务',
  j: '@PICK(["禁用", "正常"])',
};

const oilLite = {
  oilModelName: '#@INTEGER(0,10)@CTITLE(0,6)油',
  isDefault: '@PICK([0, 1])',
  oilModelDesc: '@CTITLE(10,50)',
  deleted: '@PICK([0, 1])',
};
/**
 * @sswq 加油站管理/加油明细
 */
const refuelDetailList = {
  'id|+1': 1,
  b: '@INTEGER(13000000000,18999999999)', // 会员名
  c: '苏L@INTEGER(1000,9999)', // 车牌号
  d: '0#', // 油品名称
  e: '￥@float(5,8)', // 零售价
  f: '￥@float(5,8)', // 惠龙价
  g: '@INTEGER(10,100)L', // 加油量
  h: '￥@float(400,2000)', // 加油金额
  i: '@DATE("yyyy-MM-dd HH:mm:ss")', // 日期
};

/**
 * @sswq 加油站管理/调价明细列表
 */
const priceApplyList = {
  'id|+1': 1,
  fuelName: '0#(V)', // 油品名称
  b: '￥@float(5,8)/L', // 零售价
  c: '￥@float(5,8)', // 会员折扣(%)
  d: '￥@float(5,8)/L', // 会员价
  e: '￥@float(400,2000)', // 加油金额
};

/**
 * @sswq 加油站管理/票据对账列表
 */
const billCheckList = {
  'id|+1': 1,
  year: '@INTEGER(1,12)', // 月份
  invoiceAmount: '￥@INTEGER(10000,30000)', // 发票金额
};

/**
 * @sswq 加油站管理/开票信息
 */
const billInfo = {
  name: '@CNAME()',
  taxPayerIdNum: '@INTEGER(9382434322324,9982434322324)',
  adress: '@PROVINCE()@CITY()@CTITLE(2,10)@INTEGER(1,100)号',
  tel: '@INTEGER(13000000000,18999999999)',
  bank: '@PROVINCE()银行',
  account: '000@INTEGER(132123,1454356)',
  adress2: '@PROVINCE()@CITY()@CTITLE(2,10)@INTEGER(1,100)号',
  ticketer: '@CNAME()',
  ticketerTel: '@INTEGER(13000000000,18999999999)',
};

/**
 * @sswq 票务管理/收票确认列表
 */
const invoiceConfirmLite = {
  'id|+1': 1,
  a: '@DATE("yyyy-MM")',
  b: '@CTITLE(2,10)加油站',
  c: '@INTEGER(13000000000,18999999999)',
  d: '@PROVINCE()@CITY()@CTITLE(2)石油',
  e: '增值税专用发票',
  f: '@INTEGER(1300,18999)',
  g: '@INTEGER(1300,18999)',
  j: '@PICK(["作废", "正常"])',
};

const licenseList = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  rfid: '@INTEGER(100000,999999)',
  plateNumber: '@INTEGER(100000,999999)',
  createBatchNo: '@INTEGER(100000,999999)',
  produceState: '@PICK(["ALLOCATED", "CREATED", "BINDED","VALID"])',
  machine,
  app: null,
};

const record = {
  'id|+1': 1,
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  ownerName: '@NAME()',
  ownerIdCardNumber: '@INTEGER(130000000000000000,190000000000000000)',
  confirmCode: '@INTEGER(000000,999999)',
  machineId: '@INTEGER()',
  contactPhone: '@INTEGER(13000000000,18999999999)',
};

const recordDetail = {
  id: 'JX@INTEGER(100000,999999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  ownerName: '@NAME()',
  ownerIdCardNumber: '@INTEGER(130000000000000000,190000000000000000)',
  confirmCode: '@INTEGER(000000,999999)',
  machineId: '@INTEGER()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
};

const machinePhotoNoun = {
  rightSide: pic, // 正面
  side45: pic, // 正侧面45度
  side: pic, // 侧面
  backSide: pic, // 背面
};
const machinePhotos = {
  machinePhoto: machinePhotoNoun,
  ownerIdCardPhoto: pic,
  nameplatePhoto: pic,
  mainEngineNoPhoto: pic,
  minorEngineNoPhoto: pic,
  invoicePhoto: pic,
  certificationPhoto: pic,
  drivingLicencePhoto: pic,
};

const machine = {
  id: 'JX@INTEGER(100000,999999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brandModel: '@CTITLE(2,10)',
  ownerName: '@NAME()',
  ownerPhone: '@INTEGER(13000000000,18999999999)',
  auditor,
  app: '@TITLE()',
  machineId: '@INTEGER()',
  remark: '@CTITLE()',
  state: '@PICK(["VERIFIED", "BINDED", "COMPLETED"])',
  certDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  plateNum: '@INTEGER(100000,999999)',
  brand: '@CTITLE(2,10)',
  machineModel: '@CTITLE(2,10)',
  nameplateNumber: 'CAT@INTEGER(100000,999999)DEAKW@INTEGER(10000,99999)',
  weight: '@float(100,999)',
  size: '@float(100,999)',
  enginePower: '@float(100,999)',
  manufacturer: '@CTITLE(10,20)',
  productDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  purchaseDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  buyPrice: '@float(100000,999999)',
  ownerType: '@PICK(["PERSONAL", "PARTNER", "CORPORATE"])',
  contacts: '@NAME()',
  contactsPhone: '@INTEGER(13000000000,18999999999)',
  ownerIdCardNumber: '@INTEGER(321102198000000000,321102198999999999)',
  address: '@PROVINCE()@CITY()',
  mainEngineNo: 'CAT@INTEGER(100000,999999)',
  minorEngineNo: 'CAT@INTEGER(100000,999999)',
  photos: machinePhotos,
};

const applicationDetail = {
  id: 'JX@INTEGER(100000,999999)',
  updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
  category: 'mock @CTITLE(2,10)',
  brand: '@CTITLE(2,10)',
  machineModel: '@CTITLE(2,10)',
  nameplateNumber: 'CAT@INTEGER(100000,999999)DEAKW@INTEGER(10000,99999)',
  weight: '@float(100,999)',
  size: '@float(100,999)',
  enginePower: '@float(100,999)',
  manufacturer: '@CTITLE(10,20)',
  productDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  purchaseDate: '@DATE("yyyy-MM-dd HH:mm:ss")',
  buyPrice: '@float(100000,999999)',
  ownerType: '@PICK(["PERSONAL", "PARTNER", "CORPORATE"])',
  ownerName: '@NAME()',
  contacts: '@NAME()',
  ownerIdCardNumber: '@INTEGER(321102198000000000,321102198999999999)',
  address: '@PROVINCE()@CITY()',
  mainEngineNo: 'CAT@INTEGER(100000,999999)',
  minorEngineNo: 'CAT@INTEGER(100000,999999)',
  remark: '@CTITLE()',
  photos: machinePhotos,
  auditor,
  app: '@TITLE()',
  contactsPhone: '@INTEGER(13000000000,18999999999)',
};
// const internship = {
//   'id|+1': 1,
//   companyname: 'mock GET @CTITLE(2,20)',
//   post: 'mock GET @CTITLE(2,10)',
//   starttime: 1537146097,
//   endtime: 1537146097,
//   jobcontent: 'mock GET @CTITLE(20,100)',
//   uid: 0,
// };
const mockRouterMap = {
  [hostList.dev]: [
    // {
    //   isMock: true, // 对应url的数据mock的开关
    //   method: 'get',
    //   router: '/account',
    //   result() {
    //     return {
    //       ...body,
    //       result: {
    //         name: 'Eric Ma',
    //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    //         userid: '00000001',
    //         email: 'antdesign@alipay.com',
    //         signature: '海纳百川，有容乃大',
    //         title: '交互专家',
    //         group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    //         tags: [
    //           {
    //             key: '0',
    //             label: '很有想法的',
    //           },
    //           {
    //             key: '1',
    //             label: '专注设计',
    //           },
    //           {
    //             key: '2',
    //             label: '辣~',
    //           },
    //           {
    //             key: '3',
    //             label: '大长腿',
    //           },
    //           {
    //             key: '4',
    //             label: '川妹子',
    //           },
    //           {
    //             key: '5',
    //             label: '海纳百川',
    //           },
    //         ],
    //         notifyCount: 12,
    //         country: 'China',
    //         geographic: {
    //           province: {
    //             label: '浙江省',
    //             key: '330000',
    //           },
    //           city: {
    //             label: '杭州市',
    //             key: '330100',
    //           },
    //         },
    //         address: '西湖区工专路 77 号',
    //         phone: '0752-268888888',
    //       },
    //     };
    //   },
    // },
    {
      isMock: true,
      method: 'get',
      router: '/petition',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [application],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/petition/:id',
      result() {
        return {
          ...body,
          result: applicationDetail,
        };
      },
    },
    {
      // isMock: true,
      method: 'get',
      router: '/gas/action/bs/queryOilModelInfoPage',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [gasLite],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/serviceList',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [serviceLite],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/oilList',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [oilLite],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/refuelDetailList',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [refuelDetailList],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/priceApplyList',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [priceApplyList],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/billCheckList',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [billCheckList],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/billInfo',
      result() {
        return {
          ...body,
          data: billInfo,
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/invoiceConfirmList',
      result(params) {
        return {
          ...body,
          data: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [invoiceConfirmLite],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/machine/:id',
      result() {
        return {
          ...body,
          result: machine,
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/plate',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [licenseList],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/cert',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [record],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/cert/:id',
      result() {
        return {
          ...body,
          result: recordDetail,
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/auditor',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [officer],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/auditor/listSelect',
      result() {
        return {
          ...body,
          result: {
            totalPageCount: 1,
            totalItemCount: 1,
            'data|1-10': [officer],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor/:id',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor/enable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: true,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "HIGH"])',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/auditor/disable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: false,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "HIGH"])',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/app',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [app],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/app',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            createdAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/app/listSelect',
      result() {
        return {
          ...body,
          result: {
            totalPageCount: 1,
            totalItemCount: 1,
            'data|1-10': [app],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/app/:id',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 1,
            createdAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/admin',
      result(params) {
        return {
          ...body,
          result: {
            totalPageCount: 100 / params.size,
            totalItemCount: 100,
            'data|1-10': [admin],
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 'GLY@INTEGER(1000,9999)',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'get',
      router: '/admin/home',
      result() {
        return {
          ...body,
          result: {
            ...currentUser,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/login',
      result() {
        return {
          ...body,
          result: {
            'X-Auth-Token': 'd750012e-d037-4df0-b0b8-467f7de9d7c1',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/:id',
      result(params) {
        return {
          ...body,
          result: {
            'id|+1': 'GLY@INTEGER(1000,9999)',
            updatedAt: '@DATE("yyyy-MM-dd HH:mm:ss")',
            enabled: '@BOOLEAN()',
            ...params,
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/enable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: true,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "FACTORY"])',
          },
        };
      },
    },
    {
      isMock: true,
      method: 'post',
      router: '/admin/disable/:id',
      result() {
        return {
          ...body,
          result: {
            enabled: false,
            username: 'mock @NAME()',
            type: '@PICK(["GENERAL", "FACTORY"])',
          },
        };
      },
    },
  ],
};

// host, version, url, params, methodStr
export const isMock = ({ url, method, params = {}, host = '', version = '' }) => {
  let hasMock = {
    isMock: false,
  };
  const path = version !== '' ? `/${version}url` : url;
  const matchList = [];
  if (mockRouterMap[host] !== undefined) {
    for (let i = 0; i < mockRouterMap[host].length; i++) {
      const routerObject = mockRouterMap[host][i];
      if (routerObject.method.toLowerCase() === method.toLowerCase()) {
        const match = pathToRegexp(routerObject.router).exec(path);
        if (match !== null) {
          if (match.length === 1) {
            // 精确匹配
            hasMock = { ...routerObject };
            hasMock.mock = mockjs.mock(routerObject.result(params));
            break;
          } else if (routerObject.isMock === true) {
            // 动态路由
            const hasMockTemp = { ...routerObject };
            hasMockTemp.mock = mockjs.mock(routerObject.result(params));
            matchList.push(hasMockTemp);
          }
        }
      }
    }
  }

  if (hasMock.method === undefined && matchList.length > 0) {
    return matchList[0];
  }
  return hasMock;
};
