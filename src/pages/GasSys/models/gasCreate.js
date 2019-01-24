// import { message } from 'antd';
import { reducers } from '@/utils/utils';
// import services from '@/services';

const namespace = 'gasCreate';
// const selectState = state => state[namespace];

const defaultFormData = {
  memberName: '', // 会员名
  adminName: '', // 管理员
  adminCard: '', // 管理员身份证
  gsName: '', // 加油站名称
  gsPhone: '', // 加油站电话
  gsContact: '', // 加油站联系人
  gsEmail: '', // 加油站邮箱
  contactPhone: '', // 联系人电话
  // isAdminPhone: '',// 是否同联系人
  areaList: [],
  gsDetailAddress: '', // 油站详细地址
  gsBusinessTime: '', // 油站营业时间
  fileList: [],
  gasFeatureServiceIdList: [], // 特色服务id数组
  gasOilModelList: [], // 油品
};

export default {
  namespace,
  state: {
    formData: {
      ...defaultFormData,
    },
  },

  reducers,

  effects: {
    *create({ payload }, { call }) {
      const { data } = payload;
      const response = yield call(services.gasCreate, data);
      switch (response.code) {
        case '000000':
          message.success('加油站创建成功！');
          break;
        default:
          message.warning(`${response.errMsg}，请稍后重试！`);
          break;
      }
    },
  },
};
